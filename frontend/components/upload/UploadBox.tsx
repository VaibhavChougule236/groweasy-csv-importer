"use client";

import UploadArea from "./UploadArea";
import FileInfo from "./FileInfo";

import PreviewTable from "@/components/preview/PreviewTable";
import PreviewSummary from "@/components/preview/PreviewSummary";
import Button from "@/components/common/Button";

import { useCsvUpload } from "@/hooks/useCsvUpload";

export default function UploadBox() {
  const {
    selectedFile,
    preview,
    error,
    isProcessing,
    uploadFile,
    handleRejectedFile,
    removeFile,
    confirmImport,
  } = useCsvUpload();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <UploadArea
        onFileAccepted={uploadFile}
        onFileRejected={handleRejectedFile}
      />

      {selectedFile && (
        <FileInfo
          file={selectedFile}
          onRemove={removeFile}
        />
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {preview && (
        <>
          <PreviewSummary
            fileName={selectedFile!.name}
            rows={preview.rows.length}
            columns={preview.headers.length}
          />

          <PreviewTable preview={preview} />

          <div className="flex justify-end">
            <Button
              onClick={confirmImport}
              disabled={isProcessing}
            >
              {isProcessing
                ? "Processing..."
                : "Confirm Import"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}