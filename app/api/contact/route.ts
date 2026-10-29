import { NextResponse } from "next/server";
import { profile } from "@/content/profile";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Resend's unverified/sandbox mode only allows delivery to the exact email
// address the Resend account was signed up with — not the public contact
// address in profile.ts. CONTACT_TO_EMAIL overrides where notifications
// actually land; once a domain is bought and verified with Resend, remove
// the override and this falls back to the public address.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || profile.email;

// Must match the options in components/home/contact-form.tsx.
const SUBJECTS: Record<string, string> = {
  "full-time": "Full-time role",
  contract: "Contract or freelance",
  other: "Something else",
};

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 };

const HOUR = 60 * 60 * 1000;

// Only messages that are about to be sent count. Each visitor gets a few an
// hour, and the daily cap holds even when addresses are faked, so a flood
// can't fill the inbox or use up the Resend quota.
const perVisitor = createRateLimiter({ limit: 5, windowMs: HOUR });
const perDay = createRateLimiter({ limit: 20, windowMs: 24 * HOUR });

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown> | null;
  try {
    body = await request.json();
  } catch {
    body = null;
  }
  // `null` is valid JSON too, so a body that parses can still have no fields.
  if (!body) {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const subjectKey = typeof body.subject === "string" ? body.subject : "";
  const subject = SUBJECTS[subjectKey] ?? SUBJECTS.other;
  // Honeypot: a field real visitors never see or fill in (hidden via CSS).
  // Bots that auto-fill every input tend to fill it — if it's non-empty,
  // pretend success without actually sending anything.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in every field." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json(
      { ok: false, error: "One of the fields is too long." },
      { status: 400 },
    );
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { ok: false, error: "The contact form isn't configured yet." },
      { status: 500 },
    );
  }

  // Visitor first, so someone already blocked doesn't use up the daily cap.
  const retryAfterMs = perVisitor(clientIp(request.headers)) || perDay("all");
  if (retryAfterMs) {
    return NextResponse.json(
      { ok: false, error: "Too many messages right now. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `${subject}: new message from ${name} (via portfolio site)`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    }),
  });

  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    console.error("Resend API error:", emailResponse.status, details);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
