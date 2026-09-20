"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "rounded-sm border border-border-strong bg-sunken px-4 py-2.5 font-body text-heading transition-colors placeholder:text-disabled hover:border-muted focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="rounded-md border border-success bg-success-wash px-5 py-4 text-base text-heading">
        Thanks — your message is on its way. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot: invisible to real visitors, hidden from screen readers and
          keyboard tab order. Bots that auto-fill every field tend to fill
          this one, which flags the submission as spam server-side. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          disabled={status === "submitting"}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={200}
          disabled={status === "submitting"}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          disabled={status === "submitting"}
          className={`resize-y ${fieldClassName}`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-error">
          {errorMessage} Or email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center rounded-md border border-accent bg-accent px-6 py-3 font-display text-base font-medium text-on-accent transition-colors hover:border-accent-bright hover:bg-accent-bright active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
