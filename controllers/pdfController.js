import PDF from "../models/PDF.js";
import fs from "fs"
import path from "path";

// Upload PDF
const uploadPDF = async (req, res, next) => {
  try {
    const { title } = req.body;
    const newPDF = new PDF({
      title,
      filePath: req.file.path,
    });
    const uploadedPDF = await newPDF.save();
    return res.json(uploadedPDF)
  } catch (error) {
    next(error)
  }
};

// Get all PDFs
const getAllPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find();
    res.status(200).json({ pdfs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
};

const servePDF = async (req, res, next) => {
  try {
    const { pdfId } = req.params;

    // Fetch the PDF document from the database by its ID
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    const filePath = pdf.filePath;

    // Ensure the file exists before sending it
    if (!fs.existsSync(filePath)) {
      return next(new Error("Invalid Path"));
    }

    const resolvedPath = path.resolve(filePath);

    // Send the file as a download
    res.sendFile(resolvedPath, (err) => {
      if (err) {
        next(err); // Forward the error to the next middleware
      }
    });
  } catch (err) {
    next(err); // Forward error to the error handler
  }
};

export { uploadPDF, getAllPDFs, servePDF }