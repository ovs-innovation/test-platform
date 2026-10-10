import path from 'path';
import fs from 'fs';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadImageToCloudinary } from '../services/cloudinaryService.js';

/**
 * POST /api/upload/image
 * Uploads an image (Base64 string or URL) to Cloudinary and returns CDN URL.
 */
export const uploadImage = asyncHandler(async (req, res) => {
  const { image, folder = 'edvedum/institutions' } = req.body;

  if (!image) {
    throw ApiError.badRequest('No image data or file provided for upload.');
  }

  const uploadResult = await uploadImageToCloudinary(image, { folder });

  res.json({
    success: true,
    url: uploadResult.secure_url || uploadResult.url,
    public_id: uploadResult.public_id,
    is_fallback: Boolean(uploadResult.is_fallback),
    message: uploadResult.is_fallback
      ? 'Cloudinary environment variables not set; saved as local data URI.'
      : 'Image uploaded successfully to Cloudinary CDN.',
  });
});

/**
 * POST /api/upload/brochure
 * Uploads a brochure/syllabus PDF or document safely to server storage (/uploads/documents).
 * Avoids third-party CDN 401 Unauthorized delivery blocks on PDF files.
 */
export const uploadBrochure = asyncHandler(async (req, res) => {
  const { file, file_base64, file_name = 'brochure.pdf' } = req.body;
  const fileData = file_base64 || file;

  if (!fileData) {
    throw ApiError.badRequest('No file data provided for brochure upload.');
  }

  const { saveUploadedFile } = await import('../middleware/upload.js');
  const finalUrl = await saveUploadedFile(fileData, file_name, 'brochure');

  res.json({
    success: true,
    url: finalUrl,
    file_name,
    storage: 'local',
    message: 'Brochure uploaded successfully',
  });
});

/**
 * POST /api/upload/ebook
 * Uploads an eBook / notes PDF safely to server storage (/uploads/documents and /public/ebooks).
 */
export const uploadEbook = asyncHandler(async (req, res) => {
  const { file, file_base64, file_name = 'ebook.pdf' } = req.body;
  const fileData = file_base64 || file;

  if (!fileData) {
    throw ApiError.badRequest('No file data provided for eBook upload.');
  }

  const { saveUploadedFile } = await import('../middleware/upload.js');
  const finalUrl = await saveUploadedFile(fileData, file_name, 'ebook');

  // Also sync a copy to public/ebooks with sanitized name for legacy /ebooks/... references
  try {
    const cleanBase64 = String(fileData).replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const safeName = path.basename(file_name).replace(/[^a-zA-Z0-9._-]/g, '_');
    const ebooksDir = path.resolve('public/ebooks');
    if (!fs.existsSync(ebooksDir)) fs.mkdirSync(ebooksDir, { recursive: true });
    fs.writeFileSync(path.join(ebooksDir, safeName), buffer);
  } catch (copyErr) {
    console.warn('[uploadEbook] Secondary copy to public/ebooks warning:', copyErr.message);
  }

  res.json({
    success: true,
    url: finalUrl,
    file_name,
    storage: 'local',
    message: 'eBook PDF uploaded successfully',
  });
});

