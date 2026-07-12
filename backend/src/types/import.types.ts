import { CRMLead } from "./crm.types";

export interface SkippedRecord {
  rowNumber: number;
  reason: string;
  record: Record<string, unknown>;
}

export interface ImportSummary {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  imported: number;
  skipped: number;
  processingTime: string;
}

export interface ImportResult {
  summary: ImportSummary;
  imported: CRMLead[];
  skipped: SkippedRecord[];
}