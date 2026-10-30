import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

dotenv.config();

const BASE_DIR = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';
const BACKEND_UPLOADS = path.resolve('uploads/aldehydes');
const FRONTEND_UPLOADS = path.resolve('../frontend/public/uploads/aldehydes');

fs.mkdirSync(BACKEND_UPLOADS, { recursive: true });
fs.mkdirSync(FRONTEND_UPLOADS, { recursive: true });

const CROPS = [
  // Image 4: media_1793350858330_409f3bf4.png (358 x 482)
  { qNum: 226, file: 'media_1793350858330_409f3bf4.png', extract: { left: 10, top: 55, width: 170, height: 110 } },
  { qNum: 228, file: 'media_1793350858330_409f3bf4.png', extract: { left: 10, top: 200, width: 170, height: 80 } },
  { qNum: 232, file: 'media_1793350858330_409f3bf4.png', extract: { left: 180, top: 110, width: 170, height: 65 } },
  { qNum: 234, file: 'media_1793350858330_409f3bf4.png', extract: { left: 180, top: 220, width: 170, height: 160 } },

  // Image 1: media_1793350807003_a653c14d.jpg (388 x 511)
  { qNum: 252, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 10, top: 5, width: 180, height: 60 } },
  { qNum: 253, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 10, top: 70, width: 180, height: 75 } },
  { qNum: 254, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 10, top: 190, width: 180, height: 175 } },
  { qNum: 255, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 10, top: 370, width: 180, height: 130 } },
  { qNum: 256, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 200, top: 90, width: 180, height: 155 } },
  { qNum: 258, file: 'media_1793350807003_a653c14d.jpg', extract: { left: 200, top: 375, width: 180, height: 130 } },

  // Image 2: media_1793350829072_ed934c92.png (162 x 253)
  { qNum: 261, file: 'media_1793350829072_ed934c92.png', extract: { left: 20, top: 140, width: 125, height: 45 } },

  // Image 3: media_1793350837792_25aaed50.png (382 x 242)
  { qNum: 268, file: 'media_1793350837792_25aaed50.png', extract: { left: 200, top: 85, width: 175, height: 75 } }
];

export async function cropAndUploadAdditionalDiagrams() {
  console.log('--- Cropping & Uploading Additional 29 Questions Diagrams ---');
  const urls = {};

  for (const item of CROPS) {
    const srcPath = path.join(BASE_DIR, item.file);
    const filename = `aldehydes_q${item.qNum}.png`;
    const backPath = path.join(BACKEND_UPLOADS, filename);
    const frontPath = path.join(FRONTEND_UPLOADS, filename);

    try {
      const meta = await sharp(srcPath).metadata();
      const left = Math.max(0, Math.min(item.extract.left, meta.width - 10));
      const top = Math.max(0, Math.min(item.extract.top, meta.height - 10));
      const width = Math.min(item.extract.width, meta.width - left);
      const height = Math.min(item.extract.height, meta.height - top);

      await sharp(srcPath)
        .extract({ left, top, width, height })
        .resize({ width: Math.max(width * 2, 400), withoutEnlargement: false })
        .sharpen()
        .toFile(backPath);

      fs.copyFileSync(backPath, frontPath);

      const cRes = await uploadImageToCloudinary(backPath, {
        folder: 'test_platform/aldehydes',
        public_id: `aldehydes_q${item.qNum}`
      });

      const finalUrl = cRes.secure_url || cRes.url || `/uploads/aldehydes/${filename}`;
      urls[item.qNum] = finalUrl;
      console.log(`[Q${item.qNum}] Uploaded: ${finalUrl}`);
    } catch (err) {
      console.warn(`[Q${item.qNum}] Crop/upload warning:`, err.message);
      urls[item.qNum] = `/uploads/aldehydes/${filename}`;
    }
  }

  // Save map
  fs.writeFileSync('additional_diagrams_map.json', JSON.stringify(urls, null, 2));
  console.log('Saved additional_diagrams_map.json');
  return urls;
}

if (process.argv[1].endsWith('crop_and_upload_additional_diagrams.mjs')) {
  cropAndUploadAdditionalDiagrams().catch(console.error);
}
