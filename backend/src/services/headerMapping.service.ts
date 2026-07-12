import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";
import { buildHeaderMappingPrompt } from "../prompts/headerMapping.prompt";
import { parseGeminiJson } from "../utils/jsonParser";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function mapHeaders(
  headers: string[]
): Promise<Record<string, string>> {

  const prompt = buildHeaderMappingPrompt(headers);

  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return parseGeminiJson<Record<string, string>>(
    response.text ?? ""
  );
}