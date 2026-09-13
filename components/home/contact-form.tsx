"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "submitting" | "success" | "error";

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
      <p role="status" className="max-w-md text-base text-foreground">
        Thanks — your message is on its way. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5" noValidate>
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
          required
          maxLength={100}
          disabled={status === "submitting"}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
          required
          maxLength={200}
          disabled={status === "submitting"}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
          className="resize-y rounded-lg border border-border bg-surface px-4 py-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {errorMessage} Or email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center rounded-full bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-85 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
