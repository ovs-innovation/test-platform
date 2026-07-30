import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ApiError } from '../utils/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads/documents');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/**
 * Utility to save uploaded Base64 or Buffer files to disk safely
 */
export const saveUploadedFile = (fileBase64, originalName = 'document.pdf', category = 'doc') => {
  if (!fileBase64) {
    throw ApiError.badRequest('No file data provided');
  }

  let buffer;
  if (Buffer.isBuffer(fileBase64)) {
    buffer = fileBase64;
  } else if (typeof fileBase64 === 'string') {
    // Strip data URL header if present (e.g. data:application/pdf;base64,...)
    const cleanBase64 = fileBase64.replace(/^data:[^;]+;base64,/, '');
    buffer = Buffer.from(cleanBase64, 'base64');
  } else {
    throw ApiError.badRequest('Invalid file format');
  }

  // Size limit check (20 MB)
  if (buffer.length > 20 * 1024 * 1024) {
    throw ApiError.badRequest('File size exceeds 20MB limit');
  }

  // File extension validation
  const ext = path.extname(originalName).toLowerCase() || '.pdf';
  const allowedExts = ['.pdf', '.png', '.jpg', '.jpeg', '.doc', '.docx', '.csv'];
  if (!allowedExts.includes(ext)) {
    throw ApiError.badRequest(`File extension ${ext} is not allowed`);
  }

  const sanitizedName = `${category}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
  const filePath = path.join(uploadDir, sanitizedName);

  fs.writeFileSync(filePath, buffer);

  // Return accessible URL path
  return `/uploads/documents/${sanitizedName}`;
};
