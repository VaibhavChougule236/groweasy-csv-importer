import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { buildPrompt } from "../prompts/crm.prompt";
import { CsvRecord } from "../types/crm.types";
import { AIResponse } from "../types/ai.types";
import { parseGeminiJson } from "../utils/jsonParser";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function processBatch(
  records: CsvRecord[]
): Promise<AIResponse> {
  const prompt = buildPrompt(records);

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const parsed = parseGeminiJson(text) as AIResponse;

  return parsed;
}