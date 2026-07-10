"use client";

import { useCallback, useState } from "react";
import Papa from "papaparse";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants/upload";
import { CsvPreview } from "@/types/csv";
import PreviewTable from "@/components/preview/PreviewTable";
import PreviewSummary from "@/components/preview/PreviewSummary";
import Button from "@/components/common/Button";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CsvPreview | null>(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setError("");
      setPreview(null);

      if (fileRejections.length > 0) {
        setSelectedFile(null);
        setError(fileRejections[0].errors[0].message);
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      setSelectedFile(file);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,

        complete: (results) => {
          setPreview({
            headers: results.meta.fields ?? [],
            rows: results.data as any[],
          });
        },

        error: () => {
          setError("Failed to parse CSV file.");
        },
      });
    },
    []
  );

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
    accept: ACCEPTED_FILE_TYPES,
  });

  const handleConfirmImport = async () => {

    setIsProcessing(true);

    // Backend API call will go here later

    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);

  };

  return (
    <div className="mx-auto max-w-5xl">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 transition-all duration-300 ${isDragActive
            ? "border-blue-600 bg-blue-50"
            : "border-slate-300 bg-white hover:border-blue-500"
          }`}
      >
        <input {...getInputProps()} />

        <UploadCloud
          size={60}
          className="mx-auto text-blue-600"
        />

        <h2 className="mt-5 text-center text-2xl font-semibold text-slate-800">
          Upload CSV File
        </h2>

        <p className="mt-2 text-center text-slate-500">
          Drag & Drop your CSV here
        </p>

        <p className="text-center text-slate-400">
          or click to browse
        </p>

        <p className="mt-4 text-center text-sm text-slate-400">
          Maximum Size: 10 MB
        </p>
      </div>

      {selectedFile && (
        <div className="mt-6 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className="text-green-600" />

            <div>
              <h3 className="font-medium">{selectedFile.name}</h3>

              <p className="text-sm text-slate-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={removeFile}
            className="rounded-full p-2 transition hover:bg-red-100"
          >
            <X className="text-red-600" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {preview && (
        <PreviewTable preview={preview} />
      )}

      {preview && selectedFile && (
        <>
          <PreviewSummary
            fileName={selectedFile.name}
            rows={preview.rows.length}
            columns={preview.headers.length}
          />

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleConfirmImport}
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