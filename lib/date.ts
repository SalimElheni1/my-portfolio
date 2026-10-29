/**
 * Floors to whole years elapsed since `startDateISO`, so the figure only
 * advances once a full year has actually passed (never rounds up).
 *
 * Works in UTC: a date-only ISO string like "2022-06-01" is UTC midnight, so
 * reading it in local time would land on 31 May anywhere west of UTC.
 */
export function getYearsSince(startDateISO: string, now: Date = new Date()): number {
  const start = new Date(startDateISO);
  let years = now.getUTCFullYear() - start.getUTCFullYear();
  const hasHadAnniversaryThisYear =
    now.getUTCMonth() > start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() >= start.getUTCDate());
  if (!hasHadAnniversaryThisYear) years -= 1;
  return years;
}

export function formatYearsExperience(startDateISO: string, now: Date = new Date()): string {
  return `${getYearsSince(startDateISO, now)}+ years`;
}
