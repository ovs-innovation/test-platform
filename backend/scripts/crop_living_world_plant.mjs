import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from '../src/services/cloudinaryService.js';

dotenv.config();

const SRC = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793358744171_60af082d.png';
const OUT_DIR = path.resolve('uploads/living_world');
const FRONTEND_DIR = path.resolve('../frontend/public/uploads/living_world');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(FRONTEND_DIR, { recursive: true });

async function main() {
  const cropBox = { left: 28, top: 10, width: 48, height: 63 };
  const outPath = path.join(OUT_DIR, 'living_world_plant_q145.png');
  const frontendPath = path.join(FRONTEND_DIR, 'living_world_plant_q145.png');

  await sharp(SRC)
    .extract(cropBox)
    .toFile(outPath);

  fs.copyFileSync(outPath, frontendPath);
  console.log('Saved cropped diagram to:', outPath);

  // Upload to Cloudinary
  try {
    const cloudRes = await uploadImageToCloudinary(outPath, 'edvedum_botany/living_world', 'living_world_plant_q145_perfect');
    const finalUrl = cloudRes?.secure_url || cloudRes?.url;
    console.log('Cloudinary URL:', finalUrl);
    fs.writeFileSync('living_world_diagram_url.json', JSON.stringify({ url: finalUrl }, null, 2));
  } catch (err) {
    console.error('Cloudinary upload warning:', err.message);
    const localUrl = '/uploads/living_world/living_world_plant_q145.png';
    fs.writeFileSync('living_world_diagram_url.json', JSON.stringify({ url: localUrl }, null, 2));
  }
}

main().catch(console.error);
