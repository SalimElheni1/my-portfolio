"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "w-full rounded-[5px] border border-line bg-input px-3.5 font-body text-[15px] text-ink transition-colors placeholder:text-disabled hover:border-border-strong focus:border-accent-ink disabled:opacity-60";

const labelClassName =
  "font-mono text-[11px] font-medium uppercase leading-4 tracking-[0.06em] text-muted";

const subjects = [
  { value: "full-time", label: "Full-time role" },
  { value: "contract", label: "Contract or freelance" },
  { value: "other", label: "Something else" },
];

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
        setErrorMessage(
          result.error || "Something went wrong. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="rounded-[5px] border border-green px-5 py-4 text-[15px] text-ink"
      >
        Thanks — your message is on its way. I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
      {/* Honeypot: invisible to real visitors, hidden from screen readers and
          keyboard tab order. Bots that auto-fill every field tend to fill
          this one, which flags the submission as spam server-side. Its name
          and label avoid words like "company" that browsers autofill, since
          autoComplete="off" alone doesn't stop them. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="hp_field">Leave this field empty</label>
        <input
          type="text"
          id="hp_field"
          name="hp_field"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap gap-x-3.5 gap-y-3.5">
        <div className="flex flex-[1_1_150px] flex-col gap-1.5">
          <label htmlFor="name" className={labelClassName}>
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
            className={`${fieldClassName} h-[46px]`}
          />
        </div>
        <div className="flex flex-[1_1_150px] flex-col gap-1.5">
          <label htmlFor="email" className={labelClassName}>
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
            className={`${fieldClassName} h-[46px]`}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className={labelClassName}>
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue="full-time"
          disabled={status === "submitting"}
          className={`${fieldClassName} h-[46px]`}
        >
          {subjects.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={5000}
          disabled={status === "submitting"}
          className={`${fieldClassName} resize-y py-3 leading-[1.55]`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm leading-5 text-error">
          {errorMessage} Or email me directly at{" "}
          <a
            href={`mailto:${profile.email}`}
            className="underline underline-offset-2"
          >
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-[46px] items-center self-start rounded-lg bg-accent px-[26px] font-display text-[15px] font-semibold text-on-accent transition-colors hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
