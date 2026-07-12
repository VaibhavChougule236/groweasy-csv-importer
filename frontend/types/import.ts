export interface CRMLead {
  created_at: string;
  name: string;
  email: string;
  country_code: string;
  mobile_without_country_code: string;
  company: string;
  city: string;
  state: string;
  country: string;
  lead_owner: string;
  crm_status: string;
  crm_note: string;
  data_source: string;
  possession_time: string;
  description: string;
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  imported: number;
  skipped: number;
  processingTime: string;
}

export interface SkippedRecord {
  rowNumber: number;
  reason: string;
  record: Record<string, unknown>;
}

export interface ImportResult {
  summary: ImportSummary;
  imported: CRMLead[];
  skipped: SkippedRecord[];
}