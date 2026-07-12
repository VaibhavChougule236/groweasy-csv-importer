export function normalizeDate(date: string): string {
  if (!date) return "";

  const parsed = new Date(date);

  if (isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toISOString();
}