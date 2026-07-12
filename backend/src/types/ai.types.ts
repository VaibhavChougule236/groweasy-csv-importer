import { CRMLead } from "./crm.types";

export interface AIResponse {
  imported: CRMLead[];
  skipped: CRMLead[];
}