import {v2 as cloudinary} from "cloudinary";
import PDF from "../models/PDF.js";

// Upload PDF
const uploadPDF = async (req, res, next) => {
    try {
        const { title } = req.body;

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Upload the PDF to Cloudinary
        cloudinary.uploader.upload(req.file.path, { resource_type: "raw" }, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Error uploading PDF to Cloudinary", error });
            }

            const newPDF = new PDF({
                title,
                filePath: result.secure_url,  // Store the Cloudinary URL
                cloudinaryId: result.public_id // Store the Cloudinary public_id
            });

            const uploadedPDF = await newPDF.save();
            return res.status(201).json(uploadedPDF);
        });
    } catch (error) {
        next(error);
    }
};

// Get all PDFs
const getAllPDFs = async (req, res) => {
    try {
        const pdfs = await PDF.find();
        res.status(200).json({ pdfs });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch PDFs", error });
    }
};

// Delete a PDF
const deletePDF = async (req, res) => {
    try {
        const { pdfId } = req.params;
        
        // Find the PDF document by ID
        const pdf = await PDF.findById(pdfId);

        if (!pdf) {
            return res.status(404).json({ message: "PDF not found" });
        }

        // Delete the file from Cloudinary
        cloudinary.uploader.destroy(pdf.cloudinaryId, async (error, result) => {
            if (error) {
                return res.status(500).json({ message: "Error deleting PDF from Cloudinary", error });
            }

            // Delete the PDF document from the database
            await PDF.findByIdAndDelete(pdfId);
            return res.status(200).json({ message: "PDF deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting PDF", error });
    }
};

export { uploadPDF, getAllPDFs, deletePDF };
