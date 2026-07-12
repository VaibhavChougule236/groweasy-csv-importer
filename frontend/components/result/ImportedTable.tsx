"use client";

import { CRMLead } from "@/types/import";

interface Props {
  records: CRMLead[];
}

export default function ImportedTable({
  records,
}: Props) {
  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Imported Records
        </h2>
      </div>

      <div className="max-h-[500px] overflow-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">Name</th>

              <th className="px-4 py-3 text-left">Email</th>

              <th className="px-4 py-3 text-left">Mobile</th>

              <th className="px-4 py-3 text-left">Company</th>

              <th className="px-4 py-3 text-left">City</th>

              <th className="px-4 py-3 text-left">Country</th>

              <th className="px-4 py-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {records.map((record, index) => (

              <tr
                key={index}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-4 py-3">
                  {record.name}
                </td>

                <td className="px-4 py-3">
                  {record.email}
                </td>

                <td className="px-4 py-3">
                  {record.mobile_without_country_code}
                </td>

                <td className="px-4 py-3">
                  {record.company}
                </td>

                <td className="px-4 py-3">
                  {record.city}
                </td>

                <td className="px-4 py-3">
                  {record.country}
                </td>

                <td className="px-4 py-3">
                  {record.crm_status || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}