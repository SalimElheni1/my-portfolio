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
// Give up on Resend after this long, rather than leave the visitor waiting.
const RESEND_TIMEOUT_MS = 10_000;

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

  // The name goes into the email's subject line, so line breaks and other
  // control characters become plain spaces.
  const name = typeof body.name === "string" ? body.name.replace(/[\s\p{Cc}]+/gu, " ").trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const subjectKey = typeof body.subject === "string" ? body.subject : "";
  // hasOwn, so keys every object inherits (like "constructor") aren't taken for subjects.
  const subject = Object.hasOwn(SUBJECTS, subjectKey) ? SUBJECTS[subjectKey] : SUBJECTS.other;
  // Honeypot: a field real visitors never see or fill in (hidden via CSS).
  // Bots that auto-fill every input tend to fill it — if it's non-empty,
  // pretend success without actually sending anything.
  const honeypot = typeof body.hp_field === "string" ? body.hp_field.trim() : "";

  if (honeypot) {
    // Logged, so a real message caught here by mistake doesn't vanish without a trace.
    console.warn("Contact form honeypot was filled in; message discarded.");
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
  const visitor = clientIp(request.headers);
  const retryAfterMs = perVisitor.hit(visitor) || perDay.hit("all");
  if (retryAfterMs) {
    return NextResponse.json(
      { ok: false, error: "Too many messages right now. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } },
    );
  }

  let emailResponse: Response | undefined;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
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
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch (error) {
    // Resend couldn't be reached, or didn't answer in time.
    console.error("Resend request failed:", error);
  }

  if (!emailResponse?.ok) {
    if (emailResponse) {
      const details = await emailResponse.text().catch(() => "");
      console.error("Resend API error:", emailResponse.status, details);
    }
    // Nothing was sent, so it doesn't count: otherwise a Resend outage would
    // lock visitors out after a few retries.
    perVisitor.release(visitor);
    perDay.release("all");
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
