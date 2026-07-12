import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { buildPrompt } from "../prompts/crm.prompt";
import { CsvRecord } from "../types/crm.types";
import { AIResponse } from "../types/ai.types";
import { parseGeminiJson } from "../utils/jsonParser";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

// export async function processBatch(
//   records: CsvRecord[]
// ): Promise<AIResponse> {
//   try {
//     const prompt = buildPrompt(records);

//     console.log(`Sending ${records.length} records to Gemini...`);

//     const response = await ai.models.generateContent({
//       model: env.GEMINI_MODEL,
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//       },
//     });

//     const text = response.text;

//     if (!text) {
//       throw new Error("Gemini returned an empty response.");
//     }

//     console.log("Gemini response received.");

//     return parseGeminiJson<AIResponse>(text);
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     throw error;
//   }
// }

export async function processBatch(
  records: CsvRecord[]
): Promise<AIResponse> {
  const prompt = buildPrompt(records);

  console.log(`Sending ${records.length} records to Gemini...`);

  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: env.GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          maxOutputTokens: 8192,
          temperature: 0,
        },
      });

      const text = response.text;

      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      console.log("Gemini response received.");

      return parseGeminiJson<AIResponse>(text);
    } catch (error: any) {
      if (
        (error?.status === 429 || error?.status === 503) &&
        attempt < MAX_RETRIES
      ) {
        console.log(
          `Retry ${attempt}/${MAX_RETRIES} after Gemini error (${error.status})...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * attempt)
        );

        continue;
      }

      console.error("Gemini Error:", error);
      throw error;
    }
  }

  throw new Error("Unexpected retry failure.");
}