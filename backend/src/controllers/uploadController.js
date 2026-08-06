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
