export function parseGeminiJson<T>(text: string): T {
  if (!text?.trim()) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");

  if (start === -1) {
    throw new Error("No JSON object found.");
  }

  let braceCount = 0;
  let end = -1;

  for (let i = start; i < cleaned.length; i++) {
    if (cleaned[i] === "{") braceCount++;
    if (cleaned[i] === "}") braceCount--;

    if (braceCount === 0) {
      end = i;
      break;
    }
  }

  if (end === -1) {
    throw new Error("Incomplete JSON object.");
  }

  const json = cleaned.substring(start, end + 1);

  try {
    return JSON.parse(json) as T;
  } catch (err) {
    console.error("Failed JSON:");
    console.error(json);
    throw err;
  }
}