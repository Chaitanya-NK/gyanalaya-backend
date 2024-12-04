import express from "express";
import { uploadPDF, getAllPDFs, servePDF } from "../controllers/pdfController.js";
import { upload, validatePDFId } from "../middleware/uploadPDFMiddleware.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload route for POST
router.post("/pdf/upload", authGuard, adminGuard, upload.single("pdf"), uploadPDF);

// Fetch all PDFs route for GET
router.get("/pdf", getAllPDFs);

router.get("/pdf/:pdfId", validatePDFId, servePDF);


export default router;
