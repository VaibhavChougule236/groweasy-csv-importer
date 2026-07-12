export interface EnrichmentRecord {
  crm_status: string;
  crm_note: string;
  data_source: string;
  description: string;
}

export interface EnrichmentResponse {
  records: EnrichmentRecord[];
}