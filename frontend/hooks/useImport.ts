"use client";

import { useState } from "react";

import { importCsv } from "@/services/import.service";

import { ImportResult } from "@/types/import";

export function useImport() {
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<ImportResult | null>(null);

  const [error, setError] = useState("");

  async function startImport(file: File) {
    try {
      setLoading(true);
      setError("");

      const response = await importCsv(file);

      setResult(response.data);

      return response.data;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to import CSV."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  function resetImport() {
    setResult(null);
    setError("");
  }

  return {
    loading,
    result,
    error,
    startImport,
    resetImport,
  };
}