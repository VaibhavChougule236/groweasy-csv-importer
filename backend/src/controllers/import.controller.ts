import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

import { processCsvImport } from "../services/import.service";

export const processImport = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
    }

    const result = await processCsvImport(req.file.path);

    return res.json(
      successResponse(
        "CSV imported successfully.",
        result
      )
    );

  }
);