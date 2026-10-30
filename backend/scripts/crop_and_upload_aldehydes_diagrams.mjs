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

// Diagram cropping specs [ { qNum, file, extract: { left, top, width, height } } ]
const CROPS = [
  // Image 1: media_1793348503228_c9187648.png (333 x 446)
  { qNum: 2, file: 'media_1793348503228_c9187648.png', extract: { left: 5, top: 180, width: 155, height: 85 } },
  { qNum: 4, file: 'media_1793348503228_c9187648.png', extract: { left: 165, top: 160, width: 165, height: 75 } },
  { qNum: 6, file: 'media_1793348503228_c9187648.png', extract: { left: 165, top: 220, width: 165, height: 95 } },
  { qNum: 7, file: 'media_1793348503228_c9187648.png', extract: { left: 165, top: 315, width: 165, height: 115 } },

  // Image 2: media_1793348524423_2c93be46.png (567 x 441)
  { qNum: 8, file: 'media_1793348524423_2c93be46.png', extract: { left: 45, top: 15, width: 145, height: 95 } },
  { qNum: 10, file: 'media_1793348524423_2c93be46.png', extract: { left: 45, top: 150, width: 145, height: 95 } },
  { qNum: 11, file: 'media_1793348524423_2c93be46.png', extract: { left: 45, top: 250, width: 145, height: 70 } },
  { qNum: 12, file: 'media_1793348524423_2c93be46.png', extract: { left: 45, top: 320, width: 145, height: 95 } },
  { qNum: 13, file: 'media_1793348524423_2c93be46.png', extract: { left: 195, top: 50, width: 175, height: 65 } },
  { qNum: 15, file: 'media_1793348524423_2c93be46.png', extract: { left: 195, top: 165, width: 175, height: 75 } },
  { qNum: 16, file: 'media_1793348524423_2c93be46.png', extract: { left: 195, top: 245, width: 175, height: 85 } },
  { qNum: 21, file: 'media_1793348524423_2c93be46.png', extract: { left: 385, top: 95, width: 175, height: 85 } },
  { qNum: 22, file: 'media_1793348524423_2c93be46.png', extract: { left: 385, top: 180, width: 175, height: 60 } },
  { qNum: 26, file: 'media_1793348524423_2c93be46.png', extract: { left: 385, top: 355, width: 175, height: 65 } },

  // Image 3: media_1793348544533_ad1d4a3e.jpg (448 x 672)
  { qNum: 29, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 10, top: 140, width: 180, height: 45 } },
  { qNum: 40, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 240, top: 10, width: 190, height: 65 } },
  { qNum: 41, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 240, top: 75, width: 190, height: 60 } },
  { qNum: 43, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 240, top: 175, width: 190, height: 55 } },
  { qNum: 45, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 10, top: 345, width: 190, height: 55 } },
  { qNum: 47, file: 'media_1793348544533_ad1d4a3e.jpg', extract: { left: 10, top: 440, width: 190, height: 80 } },

  // Image 4: media_1793348558800_680b29c5.png (452 x 683)
  { qNum: 71, file: 'media_1793348558800_680b29c5.png', extract: { left: 10, top: 140, width: 180, height: 75 } },
  { qNum: 73, file: 'media_1793348558800_680b29c5.png', extract: { left: 10, top: 235, width: 180, height: 50 } },
  { qNum: 82, file: 'media_1793348558800_680b29c5.png', extract: { left: 240, top: 70, width: 190, height: 45 } },
  { qNum: 89, file: 'media_1793348558800_680b29c5.png', extract: { left: 10, top: 400, width: 190, height: 50 } },
  { qNum: 90, file: 'media_1793348558800_680b29c5.png', extract: { left: 10, top: 455, width: 190, height: 55 } },
  { qNum: 100, file: 'media_1793348558800_680b29c5.png', extract: { left: 240, top: 410, width: 190, height: 45 } },
  { qNum: 102, file: 'media_1793348558800_680b29c5.png', extract: { left: 240, top: 460, width: 190, height: 50 } },
  { qNum: 106, file: 'media_1793348558800_680b29c5.png', extract: { left: 240, top: 570, width: 190, height: 60 } }
];

export async function cropAndUploadDiagrams() {
  console.log('--- Cropping and Uploading Aldehydes Diagrams ---');
  const uploadedUrls = {};

  for (const item of CROPS) {
    const srcPath = path.join(BASE_DIR, item.file);
    const filename = `aldehydes_q${item.qNum}.png`;
    const backPath = path.join(BACKEND_UPLOADS, filename);
    const frontPath = path.join(FRONTEND_UPLOADS, filename);

    try {
      // Ensure dimensions are within bounds
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

      // Upload to Cloudinary
      const cRes = await uploadImageToCloudinary(backPath, {
        folder: 'test_platform/aldehydes',
        public_id: `aldehydes_q${item.qNum}`
      });

      const chosenUrl = cRes.secure_url || cRes.url || `/uploads/aldehydes/${filename}`;
      uploadedUrls[item.qNum] = chosenUrl;
      console.log(`[Q${item.qNum}] Diagram cropped & uploaded: ${chosenUrl}`);
    } catch (err) {
      console.warn(`[Q${item.qNum}] Warning cropping diagram:`, err.message);
      uploadedUrls[item.qNum] = `/uploads/aldehydes/${filename}`;
    }
  }

  // Save map of URLs
  fs.writeFileSync('diagrams_map.json', JSON.stringify(uploadedUrls, null, 2));
  console.log('Saved diagrams_map.json');
  return uploadedUrls;
}

if (process.argv[1].endsWith('crop_and_upload_aldehydes_diagrams.mjs')) {
  cropAndUploadDiagrams().catch(console.error);
}
