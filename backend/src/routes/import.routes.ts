import { Router } from "express";
import { upload } from "../config/multer";
import { processImport } from "../controllers/import.controller";

const router = Router();

router.post(
  "/process",
  upload.single("file"),
  processImport
);

export default router;