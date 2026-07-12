export function buildHeaderMappingPrompt(
  headers: string[]
): string {
  return `
You are an expert data mapping AI.

Your task is to map CSV column names into GrowEasy CRM fields.

Return ONLY JSON.

CRM Fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:

- Return only JSON.
- Do not explain.
- Ignore columns that cannot be mapped.
- Map only when reasonably confident.

Example:

Input:

[
 "Full Name",
 "Mail",
 "Phone Number",
 "Company Name",
 "Town"
]

Output:

{
 "Full Name":"name",
 "Mail":"email",
 "Phone Number":"mobile_without_country_code",
 "Company Name":"company",
 "Town":"city"
}

Headers:

${JSON.stringify(headers)}
`;
}