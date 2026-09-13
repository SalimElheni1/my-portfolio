import { NextResponse } from "next/server";
import { profile } from "@/content/profile";

// Route Handlers only ever run on the server, so this is a safe place to
// read a secret. It must be set in the deployment environment (and in
// .env.local for local dev) — see .env.example.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const MAX_LENGTHS = { name: 100, email: 200, message: 5000 };

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  // Honeypot: a field real visitors never see or fill in (hidden via CSS).
  // Bots that auto-fill every input tend to fill it — if it's non-empty,
  // pretend success without actually sending anything.
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Please fill in every field." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "That email address doesn't look right." }, { status: 400 });
  }
  if (
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { ok: false, error: "The contact form isn't configured yet. Please email directly instead." },
      { status: 500 },
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
      to: [profile.email],
      reply_to: email,
      subject: `New message from ${name} (via portfolio site)`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!emailResponse.ok) {
    const details = await emailResponse.text();
    console.error("Resend API error:", emailResponse.status, details);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please email directly instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
