// "use client";

// import { useState } from "react";
// import Papa from "papaparse";
// import { CsvPreview } from "@/types/csv";

// export function useCsvUpload() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<CsvPreview | null>(null);
//   const [error, setError] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const uploadFile = (file: File) => {
//     setError("");

//     setSelectedFile(file);

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,

//       complete: (results) => {
//         setPreview({
//           headers: results.meta.fields ?? [],
//           rows: results.data as any[],
//         });
//       },

//       error: () => {
//         setError("Unable to parse CSV.");
//       },
//     });
//   };

//   const handleRejectedFile = (message: string) => {
//     setSelectedFile(null);
//     setPreview(null);
//     setError(message);
//   };

//   const removeFile = () => {
//     setSelectedFile(null);
//     setPreview(null);
//     setError("");
//   };

//   const confirmImport = async () => {
//     setIsProcessing(true);

//     // Backend integration later

//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     setIsProcessing(false);
//   };

//   return {
//     selectedFile,
//     preview,
//     error,
//     isProcessing,

//     uploadFile,
//     handleRejectedFile,
//     removeFile,
//     confirmImport,
//   };
// }


"use client";

import { useState } from "react";
import Papa from "papaparse";

import { CsvPreview } from "@/types/csv";

export function useCsvUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [preview, setPreview] =
    useState<CsvPreview | null>(null);

  const [error, setError] = useState("");

  function uploadFile(file: File) {
    setError("");

    setSelectedFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        setPreview({
          headers: results.meta.fields ?? [],
          rows: results.data as Record<string, string>[],
        });
      },

      error: () => {
        setError("Unable to parse CSV.");
      },
    });
  }

  function handleRejectedFile(message: string) {
    setSelectedFile(null);
    setPreview(null);
    setError(message);
  }

  function removeFile() {
    setSelectedFile(null);
    setPreview(null);
    setError("");
  }

  return {
    selectedFile,
    preview,
    error,

    uploadFile,
    handleRejectedFile,
    removeFile,
  };
}