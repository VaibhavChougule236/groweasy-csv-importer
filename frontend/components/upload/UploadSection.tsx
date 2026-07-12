"use client";

import UploadArea from "./UploadArea";
import FileInfo from "./FileInfo";
import ErrorMessage from "./ErrorMessage";

interface UploadSectionProps {
  upload: any;
}

export default function UploadSection({
  upload,
}: UploadSectionProps) {
  return (
    <section className="space-y-6">
      <UploadArea
        onFileAccepted={upload.uploadFile}
        onFileRejected={upload.handleRejectedFile}
      />

      {upload.selectedFile && (
        <FileInfo
          file={upload.selectedFile}
          onRemove={upload.removeFile}
        />
      )}

      {upload.error && (
        <ErrorMessage
          message={upload.error}
        />
      )}
    </section>
  );
}