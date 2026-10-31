import sharp from 'sharp';
import fs from 'fs';

const imgPaths = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456829636_aafb7671.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456851797_1e003f66.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456869867_0d85ebf8.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456890528_584030a9.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg',
];

async function inspect() {
  for (let i = 0; i < imgPaths.length; i++) {
    const p = imgPaths[i];
    const meta = await sharp(p).metadata();
    console.log(`Image ${i+1}: ${meta.width}x${meta.height}, format: ${meta.format}, size: ${fs.statSync(p).size}`);
  }
}

inspect().catch(console.error);
