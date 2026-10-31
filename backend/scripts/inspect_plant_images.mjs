import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446775190_043a64cd.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446802913_9faaa970.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446826049_70074155.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793446844509_43667850.jpg'
];

async function inspectImages() {
  for (let i = 0; i < files.length; i++) {
    const meta = await sharp(files[i]).metadata();
    console.log(`Image ${i+1}: ${meta.width}x${meta.height}, format=${meta.format}`);
  }
}

inspectImages().catch(console.error);
