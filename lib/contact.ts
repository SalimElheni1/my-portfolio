/** Contact-form rules shared by the form (components/home/contact-form.tsx) and its API route. */

export const CONTACT_SUBJECTS = [
  { value: "full-time", label: "Full-time role" },
  { value: "contract", label: "Contract or freelance" },
  { value: "other", label: "Something else" },
] as const;

export const CONTACT_MAX_LENGTHS = { name: 100, email: 200, message: 5000 } as const;

/** The label for a submitted subject value; anything unknown counts as "Something else". */
export function contactSubjectLabel(value: unknown): string {
  const match = CONTACT_SUBJECTS.find((subject) => subject.value === value);
  return (match ?? CONTACT_SUBJECTS[CONTACT_SUBJECTS.length - 1]).label;
}

/**
 * Domain labels can't contain ".", so every character can only match one
 * way and the check takes linear time. A looser pattern like
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/ backtracks quadratically: a 100 KB address
 * froze the whole server for seconds.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/** Length first, so the pattern never even sees an oversized value. */
export function isValidEmail(value: string): boolean {
  return value.length <= CONTACT_MAX_LENGTHS.email && EMAIL_PATTERN.test(value);
}
