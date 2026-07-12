import { CsvRecord } from "../types/crm.types";
import { EnrichmentResponse } from "../types/enrichment.types";

export function mergeEnrichment(
  records: CsvRecord[],
  enrichment: EnrichmentResponse
): CsvRecord[] {

  return records.map((record, index) => ({
    ...record,
    ...enrichment.records[index],
  }));
}