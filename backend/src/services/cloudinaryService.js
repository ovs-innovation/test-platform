import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';

function getCloudinaryInstance() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || env.cloudinary?.cloudName;
  const apiKey = process.env.CLOUDINARY_API_KEY || env.cloudinary?.apiKey;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || env.cloudinary?.apiSecret;
  const cloudinaryUrl = process.env.CLOUDINARY_URL || env.cloudinary?.url;

  if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return true;
  } else if (cloudinaryUrl) {
    cloudinary.config({
      cloudinary_url: cloudinaryUrl,
      secure: true,
    });
    return true;
  }
  return false;
}

/**
 * Uploads an image (Base64 data URI, file buffer, or HTTP URL) to Cloudinary.
 * If Cloudinary credentials are not configured, returns the fileInput as fallback.
 * 
 * @param {string} fileInput - Base64 Data URL (e.g. data:image/png;base64,...), URL, or local file path
 * @param {object} customOptions - Custom Cloudinary upload options (e.g. folder, public_id)
 * @returns {Promise<{ url: string, secure_url: string, public_id: string, format?: string }>}
 */
export const uploadImageToCloudinary = async (fileInput, customOptions = {}) => {
  if (!fileInput) {
    throw new Error('No image file or data URI provided for upload.');
  }

  const isConfigured = getCloudinaryInstance();

  if (!isConfigured) {
    console.warn('[Cloudinary Service] Cloudinary credentials not found in env. Returning raw data/URL.');
    return {
      url: fileInput,
      secure_url: fileInput,
      public_id: `local_${Date.now()}`,
      is_fallback: true,
    };
  }

  try {
    const uploadOptions = {
      folder: 'edvedum/institutions',
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
      transformation: [{ width: 1000, height: 1000, crop: 'limit', quality: 'auto' }],
      ...customOptions,
    };

    const result = await cloudinary.uploader.upload(fileInput, uploadOptions);

    return {
      url: result.secure_url || result.url,
      secure_url: result.secure_url || result.url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    };
  } catch (error) {
    console.error('[Cloudinary Upload Error]', error);
    throw new Error(error.message || 'Failed to upload image to Cloudinary');
  }
};

/**
 * Helper to process an image string (e.g., logo_url).
 * If it's a Base64 string (`data:image/...`), it uploads it to Cloudinary and returns the CDN HTTPS URL.
 * If it's already an HTTP URL or empty, it returns it directly.
 * 
 * @param {string} imageInput
 * @param {string} folder
 * @returns {Promise<string>} - The final Cloudinary CDN HTTPS URL or original URL
 */
export const processAndUploadImage = async (imageInput, folder = 'edvedum/institutions') => {
  if (!imageInput) return '';

  // If it's a Base64 data URI, upload to Cloudinary
  if (typeof imageInput === 'string' && imageInput.startsWith('data:image/')) {
    try {
      const res = await uploadImageToCloudinary(imageInput, { folder });
      return res.secure_url || res.url;
    } catch (err) {
      console.error('[Cloudinary Upload Error]', err?.message || err);
      return imageInput;
    }
  }

  // Already a CDN or external HTTP URL
  return imageInput;
};

/**
 * Deletes an image from Cloudinary by its public_id.
 * 
 * @param {string} publicId
 */
export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId || publicId.startsWith('local_')) return null;
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('[Cloudinary Delete Error]', error);
    return null;
  }
};

export default {
  uploadImageToCloudinary,
  processAndUploadImage,
  deleteImageFromCloudinary,
};
