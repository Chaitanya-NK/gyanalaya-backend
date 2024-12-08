import mongoose from "mongoose";

const PDFSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        filePath: {
            type: String,  // Store the Cloudinary URL
            required: true
        },
        cloudinaryId: {
            type: String,  // Store Cloudinary public_id (optional)
            required: true
        }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const PDF = mongoose.model("PDF", PDFSchema);
export default PDF;
