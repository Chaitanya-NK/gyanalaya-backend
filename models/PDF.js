import mongoose from "mongoose";

const PDFSchema = new mongoose.Schema(
    {
        title: String,
        filePath: String,
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const PDF = mongoose.model("PDF", PDFSchema);
export default PDF;
