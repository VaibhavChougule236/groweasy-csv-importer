"use client";

import WorkflowStepper from "@/components/workflow/WorkflowStepper";
import UploadBox from "@/components/upload/UploadBox";

export default function ImportPage() {
  return (
    <section className="space-y-8">
      <WorkflowStepper currentStep={1} />

      <UploadBox />
    </section>
  );
}