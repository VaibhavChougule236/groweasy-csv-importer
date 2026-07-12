export function parseGeminiJson<T>(text: string): T {
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let cleaned = text.trim();

  cleaned = cleaned.replace(/```json/gi, "");
  cleaned = cleaned.replace(/```/g, "");

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("No valid JSON found in Gemini response.");
  }

  cleaned = cleaned.substring(start, end + 1);

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error("Failed to parse Gemini JSON.");
  }
}