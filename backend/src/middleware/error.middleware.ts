import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", error);

  if (error.status === 503) {
    return res.status(503).json({
      success: false,
      message:
        "Gemini AI is temporarily unavailable. Please try again shortly.",
    });
  }

  if (error.status === 404) {
    return res.status(404).json({
      success: false,
      message: "Requested AI model was not found.",
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
}