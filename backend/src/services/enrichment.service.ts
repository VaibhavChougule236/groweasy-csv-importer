import { GoogleGenAI } from "@google/genai";

import { env } from "../config/env";

import { buildEnrichmentPrompt } from "../prompts/enrichment.prompt";

import { CsvRecord } from "../types/crm.types";
import { EnrichmentResponse } from "../types/enrichment.types";

import { parseGeminiJson } from "../utils/jsonParser";

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export async function enrichRecords(
  records: CsvRecord[]
): Promise<EnrichmentResponse> {

  const prompt = buildEnrichmentPrompt(records);

  const response = await ai.models.generateContent({
    model: env.GEMINI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return parseGeminiJson<EnrichmentResponse>(
    response.text ?? ""
  );
}