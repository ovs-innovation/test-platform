import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const files = [
  'media_1793449701423_5e8cabaf.png',
  'media_1793449722478_45adc100.png',
  'media_1793449750716_b81bca44.png',
  'media_1793449763764_52974251.jpg',
  'media_1793449784666_82513a90.png'
];

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';
const outDir = 'backend/uploads/structural_organisation/pages/';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function analyzeLayout() {
  // Let's inspect each image
  for (let idx = 0; idx < files.length; idx++) {
    const file = files[idx];
    const img = sharp(basePath + file);
    const meta = await img.metadata();
    console.log(`Image ${idx + 1}: ${meta.width} x ${meta.height}`);
  }
}
analyzeLayout().catch(console.error);

