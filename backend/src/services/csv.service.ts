import fs from "fs";
import csv from "csv-parser";

import { CsvRecord } from "../types/crm.types";

export async function parseCsv(
  filePath: string
): Promise<CsvRecord[]> {
  return new Promise((resolve, reject) => {
    const records: CsvRecord[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", reject);
  });
}