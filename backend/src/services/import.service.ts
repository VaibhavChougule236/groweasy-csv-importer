import fs from "fs/promises";

import { parseCsv } from "./csv.service";
import { processBatch } from "./ai.service";

import { createBatches } from "../utils/batch";

import { ImportResult } from "../types/import.types";

const BATCH_SIZE = 20;

export async function processCsvImport(
  filePath: string
): Promise<ImportResult> {

  const startTime = Date.now();

  try {

    const records = await parseCsv(filePath);

    const totalRows = records.length;

    if (totalRows === 0) {

      return {
        summary: {
          totalRows: 0,
          validRows: 0,
          invalidRows: 0,
          imported: 0,
          skipped: 0,
          processingTime: "0 sec",
        },
        imported: [],
        skipped: [],
      };

    }

    const batches = createBatches(records, BATCH_SIZE);

    const imported: any[] = [];
    const skipped: any[] = [];

    for (const batch of batches) {

      const result = await processBatch(batch);

      imported.push(...result.imported);
      skipped.push(...result.skipped);

    }

    const processingTime =
      ((Date.now() - startTime) / 1000).toFixed(2) + " sec";

    return {

      summary: {
        totalRows,
        validRows: imported.length,
        invalidRows: skipped.length,
        imported: imported.length,
        skipped: skipped.length,
        processingTime,
      },

      imported,

      skipped,

    };

  } finally {

    await fs.unlink(filePath).catch(() => {});

  }

}