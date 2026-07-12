import validator from "validator";

export function normalizeEmail(email: string): string {
  if (!email) return "";

  const cleaned = email.trim().toLowerCase();

  if (!validator.isEmail(cleaned)) {
    return "";
  }

  return cleaned;
}