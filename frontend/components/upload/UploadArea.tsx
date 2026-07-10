"use client";

import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "@/constants/upload";

interface UploadAreaProps {
  onFileAccepted: (file: File) => void;
  onFileRejected: (message: string) => void;
}

export default function UploadArea({
  onFileAccepted,
  onFileRejected,
}: UploadAreaProps) {
  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[]
  ) => {
    if (fileRejections.length > 0) {
      onFileRejected(fileRejections[0].errors[0].message);
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileAccepted(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
      accept: ACCEPTED_FILE_TYPES,
    });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 transition-all duration-300 ${
        isDragActive
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
  );
}