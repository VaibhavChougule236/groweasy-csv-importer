"use client";

import { CsvPreview } from "@/types/csv";

interface PreviewTableProps {
  preview: CsvPreview;
}

export default function PreviewTable({
  preview,
}: PreviewTableProps) {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-auto max-h-[500px]">
        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 bg-slate-100">

            <tr>
              {preview.headers.map((header) => (
                <th
                  key={header}
                  className="border-b px-4 py-3 text-left text-sm font-semibold whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>

          </thead>

          <tbody>

            {preview.rows.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50"
              >
                {preview.headers.map((header) => (
                  <td
                    key={header}
                    className="border-b px-4 py-3 text-sm whitespace-nowrap"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}