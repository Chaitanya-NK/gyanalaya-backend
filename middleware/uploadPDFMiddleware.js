import multer from "multer";
import path from "path";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

const validatePDFId = (req, res, next) => {
  const { pdfId } = req.params;

  if (!pdfId) {
    return res.status(400).json({ message: "PDF ID is required" });
  }

  // Further validation logic can go here if needed
  next();
};


export { upload, validatePDFId }
