import express from "express";
import { uploadPDF, getAllPDFs, servePDF } from "../controllers/pdfController.js";
import { upload, validatePDFId } from "../middleware/uploadPDFMiddleware.js";
import { adminGuard, authGuard } from "../middleware/authMiddleware.js";

const router = express.Router();

// Upload route for POST
router.post("/upload", authGuard, adminGuard, upload.single("pdf"), uploadPDF);

// Fetch all PDFs route for GET
router.get("/", getAllPDFs);

router.get("/:pdfId", validatePDFId, servePDF);


export default router;
