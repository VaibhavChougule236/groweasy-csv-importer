"use client";

import PreviewSummary from "./PreviewSummary";
import PreviewTable from "./PreviewTable";

import { CsvPreview } from "@/types/csv";

interface PreviewSectionProps {
  preview: CsvPreview;
  file: File | null;

  loading: boolean;

  onImport: () => void;
}

export default function PreviewSection({
  preview,
  file,
  loading,
  onImport,
}: PreviewSectionProps) {
  return (
    <section className="space-y-6">

      <PreviewSummary
        fileName={file?.name ?? ""}
        rows={preview.rows.length}
        columns={preview.headers.length}
      />

      <PreviewTable
        preview={preview}
      />

      <div className="flex justify-end">

        <button
          onClick={onImport}
          disabled={loading}
          className="
            rounded-xl
            bg-blue-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-slate-400
          "
        >
          {loading
            ? "Processing..."
            : "Confirm Import"}
        </button>

      </div>

    </section>
  );
}