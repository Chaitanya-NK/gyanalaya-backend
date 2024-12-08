import express from "express";
import { uploadPDF, getAllPDFs, deletePDF } from "../controllers/pdfController.js";
import { upload } from "../middleware/uploadPDFMiddleware.js";
import { authGuard, adminGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload route for POST
router.post("/upload", authGuard, adminGuard, upload.single("pdf"), uploadPDF);

// Fetch all PDFs route for GET
router.get("/", getAllPDFs);

// Delete a PDF route for DELETE
router.delete("/:pdfId", authGuard, adminGuard, deletePDF);

export default router;
