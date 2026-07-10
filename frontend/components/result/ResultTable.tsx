import { CRMLead } from "@/types/crm";

interface Props {
  title: string;
  data: CRMLead[];
}

export default function ResultTable({
  title,
  data,
}: Props) {
  if (data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className="mt-8 rounded-xl border bg-white shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="max-h-[450px] overflow-auto">
        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-100">

            <tr>

              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-semibold"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((lead, index) => (
              <tr
                key={index}
                className="border-t hover:bg-slate-50"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 text-sm whitespace-nowrap"
                  >
                    {lead[header as keyof CRMLead]}
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