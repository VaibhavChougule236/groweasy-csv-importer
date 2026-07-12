import { CsvRecord } from "../types/crm.types";

export function buildPrompt(records: CsvRecord[]): string {
  return `
You are an expert CRM data extraction AI.

Your task is to intelligently transform CSV records into GrowEasy CRM lead records.

The input CSV can contain ANY column names, ANY order, and ANY structure.

You must infer the correct mapping.

---------------------------------------
OUTPUT REQUIREMENTS
---------------------------------------

Return ONLY valid JSON.

Do NOT include:

- Markdown
- Triple backticks
- Explanations
- Notes
- Comments

Return ONLY this JSON object:

{
  "imported": [
    {
      "created_at": "",
      "name": "",
      "email": "",
      "country_code": "",
      "mobile_without_country_code": "",
      "company": "",
      "city": "",
      "state": "",
      "country": "",
      "lead_owner": "",
      "crm_status": "",
      "crm_note": "",
      "data_source": "",
      "possession_time": "",
      "description": ""
    }
  ],
  "skipped": []
}

---------------------------------------
FIELD MAPPING
---------------------------------------

Identify fields even if headers differ.

Examples:

Name:
full_name
customer
client
person
lead

Email:
email
mail
email_address

Phone:
phone
mobile
contact
telephone
cell

Company:
company
organization
firm
business

Lead Owner:
owner
assigned_to
sales_person

Status:
status
lead_status
crm_status

City:
city
town

State:
state
province

Country:
country
nation

Notes:
remark
comment
feedback
description
note

---------------------------------------
CRM STATUS
---------------------------------------

Only use:

GOOD_LEAD_FOLLOW_UP

DID_NOT_CONNECT

BAD_LEAD

SALE_DONE

Infer the closest value.

---------------------------------------
DATA SOURCE
---------------------------------------

Only use:

leads_on_demand
meridian_tower
eden_park
varah_swamy
sarjapur_plots

If unsure return "".

---------------------------------------
EMAILS
---------------------------------------

If multiple emails exist:

Use the first email.

Append remaining emails inside crm_note.

---------------------------------------
MOBILE NUMBERS
---------------------------------------

If multiple mobile numbers exist:

Use the first.

Append remaining numbers inside crm_note.

---------------------------------------
PHONE
---------------------------------------

Extract:

country_code

Example:

+91

and

mobile_without_country_code

---------------------------------------
SKIP RULE
---------------------------------------

Skip records that contain BOTH:

No email

AND

No mobile number

Add skipped records into skipped[].

---------------------------------------
DATES
---------------------------------------

Return created_at in ISO format whenever possible.

---------------------------------------
EMPTY VALUES
---------------------------------------

If a field cannot be identified,

return "".

Never invent data.

---------------------------------------
INPUT RECORDS
---------------------------------------

${JSON.stringify(records, null, 2)}
`;
}