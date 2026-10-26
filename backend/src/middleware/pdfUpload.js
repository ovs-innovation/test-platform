import fs from 'fs';
import path from 'path';
import os from 'os';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { env } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary directory for streaming large PDF uploads directly to disk
export const tempUploadDir = path.resolve(__dirname, '../../uploads/temp');
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}

// Multer Disk Storage to eliminate V8 heap memory pressure on large files (up to 100 MB)
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(tempUploadDir)) {
      fs.mkdirSync(tempUploadDir, { recursive: true });
    }
    cb(null, tempUploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.pdf';
    const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    cb(null, `pdf_upload_${uniqueSuffix}${ext}`);
  },
});

// File filter strictly allowing only PDF files
const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.pdf'];
  const allowedMimes = ['application/pdf', 'application/x-pdf', 'application/acrobat', 'applications/vnd.pdf', 'text/pdf', 'text/x-pdf'];

  if (!allowedExts.includes(ext)) {
    const err = new Error(`Invalid file type: ${ext || 'unknown'}. Only PDF files (.pdf) are allowed.`);
    err.code = 'INVALID_FILE_TYPE';
    return cb(err, false);
  }

  // Check MIME type if provided
  if (file.mimetype && !allowedMimes.includes(file.mimetype.toLowerCase()) && file.mimetype !== 'application/octet-stream') {
    const err = new Error(`Invalid MIME type: ${file.mimetype}. Only application/pdf is allowed.`);
    err.code = 'INVALID_FILE_TYPE';
    return cb(err, false);
  }

  cb(null, true);
};

const maxBytes = env.maxPdfUploadBytes || 100 * 1024 * 1024;

const upload = multer({
  storage,
  limits: {
    fileSize: maxBytes,
    files: 2, // question paper + optional answer key
  },
  fileFilter,
});

const uploadFields = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'question_paper', maxCount: 1 },
  { name: 'answer_key', maxCount: 1 },
]);

/**
 * Validates the magic bytes (%PDF-) of a file on disk or in a buffer to prevent
 * renamed executables/scripts from bypassing extension checks.
 */
export async function verifyPdfMagicBytes(filePathOrBuffer) {
  try {
    let header;
    if (Buffer.isBuffer(filePathOrBuffer)) {
      header = filePathOrBuffer.subarray(0, 5).toString('ascii');
    } else if (typeof filePathOrBuffer === 'string') {
      const fd = await fs.promises.open(filePathOrBuffer, 'r');
      const buf = Buffer.alloc(5);
      await fd.read(buf, 0, 5, 0);
      await fd.close();
      header = buf.toString('ascii');
    } else {
      return false;
    }
    return header.startsWith('%PDF-');
  } catch {
    return false;
  }
}

/**
 * Safely removes temporary disk files associated with the upload request
 */
export async function cleanupUploadedFiles(req) {
  if (!req) return;
  const filesToClean = [];

  if (req.file) {
    filesToClean.push(req.file.path);
  }

  if (req.files) {
    if (Array.isArray(req.files)) {
      req.files.forEach((f) => filesToClean.push(f.path));
    } else if (typeof req.files === 'object') {
      Object.values(req.files).forEach((arr) => {
        if (Array.isArray(arr)) {
          arr.forEach((f) => filesToClean.push(f.path));
        }
      });
    }
  }

  for (const filePath of filesToClean) {
    if (filePath) {
      try {
        if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }
      } catch (err) {
        console.warn('[pdfUpload] Warning: Failed to cleanup temp file:', filePath, err.message);
      }
    }
  }
}

/**
 * Express middleware for question bank PDF upload.
 * Supports both multipart/form-data and legacy JSON payloads,
 * handling HTTP 413 and invalid file types gracefully.
 */
export function questionBankPdfUpload(req, res, next) {
  const isMultipart = req.is('multipart/form-data');
  if (!isMultipart) {
    // Pass through to allow JSON payloads (file_base64)
    return next();
  }

  const currentMaxBytes = env.maxPdfUploadBytes || 100 * 1024 * 1024;
  const activeUpload = multer({
    storage,
    limits: {
      fileSize: currentMaxBytes,
      files: 2, // question paper + optional answer key
    },
    fileFilter,
  }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'question_paper', maxCount: 1 },
    { name: 'answer_key', maxCount: 1 },
  ]);

  activeUpload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({
            success: false,
            code: 'PAYLOAD_TOO_LARGE',
            message: `PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`,
          });
        }
        return res.status(400).json({
          success: false,
          code: 'UPLOAD_ERROR',
          message: err.message,
        });
      }

      if (err.code === 'INVALID_FILE_TYPE') {
        return res.status(400).json({
          success: false,
          code: 'INVALID_FILE_TYPE',
          message: err.message,
        });
      }

      return res.status(400).json({
        success: false,
        code: 'BAD_REQUEST',
        message: err.message || 'File upload error',
      });
    }

    next();
  });
}

export const pdfUploadMiddleware = questionBankPdfUpload;

