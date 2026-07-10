interface PreviewSummaryProps {
  rows: number;
  columns: number;
  fileName: string;
}

export default function PreviewSummary({
  rows,
  columns,
  fileName,
}: PreviewSummaryProps) {
  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        CSV Summary
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div>
          <p className="text-sm text-slate-500">
            File
          </p>

          <p className="font-medium">
            {fileName}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Rows
          </p>

          <p className="font-medium">
            {rows}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Columns
          </p>

          <p className="font-medium">
            {columns}
          </p>
        </div>

      </div>
    </div>
  );
}