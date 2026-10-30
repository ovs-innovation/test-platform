import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

dotenv.config();

const BASE_DIR = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';
const BACKEND_UPLOADS = path.resolve('uploads/motion_straight_line');
const FRONTEND_UPLOADS = path.resolve('../frontend/public/uploads/motion_straight_line');

fs.mkdirSync(BACKEND_UPLOADS, { recursive: true });
fs.mkdirSync(FRONTEND_UPLOADS, { recursive: true });

const CROPS = [
  {
    qNum: 105,
    file: 'media_1793352361434_60956bd1.png',
    extract: { left: 20, top: 40, width: 140, height: 75 }
  },
  {
    qNum: 120,
    file: 'media_1793352338814_54fc4497.png',
    extract: { left: 50, top: 155, width: 90, height: 65 }
  },
  {
    qNum: 128,
    file: 'media_1793352338814_54fc4497.png',
    extract: { left: 185, top: 380, width: 160, height: 65 }
  },
  {
    qNum: 179,
    file: 'media_1793352300793_123177ff.jpg',
    extract: { left: 10, top: 35, width: 155, height: 260 }
  },
  {
    qNum: 209,
    file: 'media_1793352266180_4f7d7240.png',
    extract: { left: 10, top: 250, width: 160, height: 205 }
  }
];

export async function cropAndUploadMotionDiagrams() {
  console.log('--- Cropping & Uploading Motion in Straight Line Diagrams ---');
  const urls = {};

  for (const item of CROPS) {
    const srcPath = path.join(BASE_DIR, item.file);
    const filename = `motion_q${item.qNum}.png`;
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
        folder: 'test_platform/motion_straight_line',
        public_id: `motion_q${item.qNum}`
      });

      const finalUrl = cRes.secure_url || cRes.url || `/uploads/motion_straight_line/${filename}`;
      urls[item.qNum] = finalUrl;
      console.log(`[Q${item.qNum}] Uploaded: ${finalUrl}`);
    } catch (err) {
      console.warn(`[Q${item.qNum}] Crop/upload warning:`, err.message);
      urls[item.qNum] = `/uploads/motion_straight_line/${filename}`;
    }
  }

  fs.writeFileSync('motion_diagrams_map.json', JSON.stringify(urls, null, 2));
  console.log('Saved motion_diagrams_map.json');
  return urls;
}

if (process.argv[1].endsWith('crop_and_upload_motion_diagrams.mjs')) {
  cropAndUploadMotionDiagrams().catch(console.error);
}

