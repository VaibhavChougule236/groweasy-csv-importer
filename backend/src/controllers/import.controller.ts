import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

export const processImport = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
    }

    return res.status(200).json(
      successResponse("File uploaded successfully.", {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
      })
    );
  }
);