/**
 * Floors to whole years elapsed since `startDateISO`, so the figure only
 * advances once a full year has actually passed (never rounds up).
 */
export function getYearsSince(startDateISO: string, now: Date = new Date()): number {
  const start = new Date(startDateISO);
  let years = now.getFullYear() - start.getFullYear();
  const hasHadAnniversaryThisYear =
    now.getMonth() > start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());
  if (!hasHadAnniversaryThisYear) years -= 1;
  return years;
}

export function formatYearsExperience(startDateISO: string, now: Date = new Date()): string {
  return `${getYearsSince(startDateISO, now)}+ years`;
}
