import { CsvRecord } from "../types/crm.types";

export function normalizeRecords(
  records: CsvRecord[],
  mapping: Record<string, string>
): CsvRecord[] {
  return records.map((record) => {
    const normalized: CsvRecord = {};

    for (const [originalKey, value] of Object.entries(record)) {
      const mappedKey = mapping[originalKey];

      if (mappedKey) {
        normalized[mappedKey] = value?.trim() ?? "";
      }
    }

    return normalized;
  });
}