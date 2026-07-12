import { CsvRecord } from "../types/crm.types";
import { extractPhone } from "../utils/phone";
import { normalizeEmail } from "../utils/email";
import { normalizeDate } from "../utils/date";

export function validateRecords(
    records: CsvRecord[]
): CsvRecord[] {
    return records
        .map((record) => {
            const email = normalizeEmail(record.email ?? "");

            const phone = extractPhone(
                record.mobile_without_country_code ?? ""
            );

            return {
                ...record,

                email,

                country_code: phone.country_code,

                mobile_without_country_code:
                    phone.mobile_without_country_code,

                created_at: normalizeDate(
                    record.created_at ?? ""
                ),
            };
        })
        .filter((record) => {
            return (
                record.email ||
                record.mobile_without_country_code
            );
        });
}