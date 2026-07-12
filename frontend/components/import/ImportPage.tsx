"use client";

import WorkflowStepper from "../workflow/WorkflowStepper";
import UploadSection from "../upload/UploadSection";
import PreviewSection from "../preview/PreviewSection";
import ResultSection from "../result/ResultSection";

import { useCsvUpload } from "@/hooks/useCsvUpload";
import { useImport } from "@/hooks/useImport";

export default function ImportPage() {
  const upload = useCsvUpload();

  const importer = useImport();

  let currentStep = 1;

  if (upload.preview) currentStep = 2;

  if (importer.loading) currentStep = 3;

  if (importer.result) currentStep = 4;

  async function handleImport() {
    if (!upload.selectedFile) return;

    await importer.startImport(upload.selectedFile);
  }

  return (
    <section className="space-y-8">

      <WorkflowStepper currentStep={currentStep} />

      <UploadSection upload={upload} />

      {upload.preview && (
        <PreviewSection
          preview={upload.preview}
          file={upload.selectedFile}
          loading={importer.loading}
          onImport={handleImport}
        />
      )}

      {importer.result && (
        <ResultSection
          result={importer.result}
        />
      )}

    </section>
  );
}