import { CsvRecord } from "../types/crm.types";

export function buildEnrichmentPrompt(records: CsvRecord[]): string {
  return `
You are an AI CRM enrichment assistant.

You will receive records that are already normalized.

Do NOT modify:

- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- created_at
- lead_owner

Your task is ONLY to determine:

crm_status
crm_note
data_source
description

Rules:

crm_status must be one of:

GOOD_LEAD_FOLLOW_UP
DID_NOT_CONNECT
BAD_LEAD
SALE_DONE

data_source must be one of:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

If uncertain return "".

Return ONLY JSON.

Format:

{
  "records":[
    {
      "crm_status":"",
      "crm_note":"",
      "data_source":"",
      "description":""
    }
  ]
}

Records:

${JSON.stringify(records, null, 2)}
`;
}