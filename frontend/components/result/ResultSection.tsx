"use client";

import ImportStats from "./ImportStats";
import ImportedTable from "./ImportedTable";
import SkippedTable from "./SkippedTable";

import { ImportResult } from "@/types/import";

interface Props {
  result: ImportResult;
}

export default function ResultSection({
  result,
}: Props) {
  return (
    <section className="space-y-8">

      <ImportStats
        imported={result.summary.imported}
        skipped={result.summary.skipped}
      />

      <div className="rounded-xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Import Summary
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          <SummaryCard
            title="Rows"
            value={result.summary.totalRows}
          />

          <SummaryCard
            title="Valid"
            value={result.summary.validRows}
          />

          <SummaryCard
            title="Invalid"
            value={result.summary.invalidRows}
          />

          <SummaryCard
            title="Imported"
            value={result.summary.imported}
          />

          <SummaryCard
            title="Skipped"
            value={result.summary.skipped}
          />

          <SummaryCard
            title="Time"
            value={result.summary.processingTime}
          />

        </div>

      </div>

      <ImportedTable
        records={result.imported}
      />

      <SkippedTable
        records={result.skipped}
      />

    </section>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold">
        {value}
      </h3>

    </div>
  );
}