"use client";

import { SkippedRecord } from "@/types/import";

interface Props {
  records: SkippedRecord[];
}

export default function SkippedTable({
  records,
}: Props) {

  if (records.length === 0) {
    return (
      <div className="mt-8 rounded-xl border bg-green-50 p-6">

        <h2 className="text-xl font-semibold text-green-700">
          Skipped Records
        </h2>

        <p className="mt-3 text-green-600">
          ✅ No records were skipped.
        </p>

      </div>
    );
  }

  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">

      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Skipped Records
        </h2>
      </div>

      <div className="overflow-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Row
              </th>

              <th className="px-4 py-3 text-left">
                Reason
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((record, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="px-4 py-3">
                  {record.rowNumber}
                </td>

                <td className="px-4 py-3">
                  {record.reason}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}