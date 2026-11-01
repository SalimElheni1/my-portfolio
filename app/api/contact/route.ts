import { NextResponse } from "next/server";
import { profile } from "@/content/profile";
import {
  CONTACT_MAX_LENGTHS,
  contactSubjectLabel,
  isValidEmail,
} from "@/lib/contact";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { readJsonBody } from "@/lib/request-body";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

// Where notifications land. The public contact address in profile.ts is the
// sensible default; set CONTACT_TO_EMAIL to send them elsewhere instead.
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || profile.email;

// The Resend sender. mail.salimelhani.tn is verified in Resend, so any
// address on that subdomain can send. Set CONTACT_FROM_EMAIL to override it,
// e.g. onboarding@resend.dev while the domain is still unverified.
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio <contact@mail.salimelhani.tn>";

// A real message is a few KB at most. nginx caps bodies too (see
// deploy/nginx/portfolio.conf); this catches requests that reach the app
// directly, including chunked ones with no Content-Length to check.
const MAX_BODY_BYTES = 16 * 1024;

const HOUR = 60 * 60 * 1000;
// Give up on Resend after this long, rather than leave the visitor waiting.
const RESEND_TIMEOUT_MS = 10_000;

// Only messages that are about to be sent count. Each visitor gets a few an
// hour, and the daily cap holds even when addresses are faked, so a flood
// can't fill the inbox or use up the Resend quota.
const perVisitor = createRateLimiter({ limit: 5, windowMs: HOUR });
const perDay = createRateLimiter({ limit: 20, windowMs: 24 * HOUR });

function fail(error: string, status: number, init?: ResponseInit) {
  return NextResponse.json({ ok: false, error }, { ...init, status });
}

function tooMany(retryAfterMs: number) {
  return fail("Too many messages right now. Please try again later.", 429, {
    headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) },
  });
}

/**
 * Browsers always send Origin on a POST, and a page on another site can't
 * fake it, so a mismatch with the Host it was sent to means another site is
 * submitting the form through its visitors' browsers. Requests without
 * Origin (curl, scripts) aren't cross-site and still face the rate limits.
 */
function isCrossSite(headers: Headers): boolean {
  const origin = headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== headers.get("host");
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  if (isCrossSite(request.headers)) {
    return fail("Invalid request.", 403);
  }
  // Only JSON: a text/plain or form POST is a "simple" request that any site
  // can send cross-origin without a CORS preflight.
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return fail("Invalid request.", 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return fail("Invalid request.", 413);
  }

  // Read with a cap rather than `request.json()`: a chunked body has no
  // Content-Length, so the check above can't stop it from buffering.
  const parsed = await readJsonBody(request, MAX_BODY_BYTES);
  if (!parsed.ok) {
    return fail("Invalid request.", parsed.reason === "too-large" ? 413 : 400);
  }
  // `null` is valid JSON too, so a body that parses can still have no fields.
  if (!parsed.value || typeof parsed.value !== "object") {
    return fail("Invalid request.", 400);
  }
  const body = parsed.value as Record<string, unknown>;

  // The name goes into the email's subject line, so line breaks and other
  // control characters become plain spaces.
  const name =
    typeof body.name === "string"
      ? body.name.replace(/[\s\p{Cc}]+/gu, " ").trim()
      : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const subject = contactSubjectLabel(body.subject);
  // Honeypot: a field real visitors never see or fill in (hidden via CSS).
  // Bots that auto-fill every input tend to fill it — if it's non-empty,
  // pretend success without actually sending anything.
  const honeypot =
    typeof body.hp_field === "string" ? body.hp_field.trim() : "";

  if (honeypot) {
    // Logged, so a real message caught here by mistake doesn't vanish without a trace.
    console.warn("Contact form honeypot was filled in; message discarded.");
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return fail("Please fill in every field.", 400);
  }
  // Lengths before the email check, so no pattern ever runs on a huge value.
  if (
    name.length > CONTACT_MAX_LENGTHS.name ||
    email.length > CONTACT_MAX_LENGTHS.email ||
    message.length > CONTACT_MAX_LENGTHS.message
  ) {
    return fail("One of the fields is too long.", 400);
  }
  if (!isValidEmail(email)) {
    return fail("That email address doesn't look right.", 400);
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return fail("The contact form isn't configured yet.", 500);
  }

  // Visitor first, so someone already blocked doesn't use up the daily cap.
  const visitor = clientIp(request.headers);
  const visitorRetryAfterMs = perVisitor.hit(visitor);
  if (visitorRetryAfterMs) return tooMany(visitorRetryAfterMs);
  const dailyRetryAfterMs = perDay.hit("all");
  if (dailyRetryAfterMs) {
    // The message wasn't sent, so give the visitor their hourly slot back.
    perVisitor.release(visitor);
    return tooMany(dailyRetryAfterMs);
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
        from: CONTACT_FROM_EMAIL,
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
    return fail("Something went wrong sending your message.", 502);
  }

  return NextResponse.json({ ok: true });
}
