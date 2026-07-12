import api from "@/api/axios";

import { ApiResponse } from "@/types/api";
import { ImportResult } from "@/types/import";

export async function importCsv(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ApiResponse<ImportResult>>(
    "/import/process",
    formData
  );

  return response.data;
}