import sharp from 'sharp';
import fs from 'fs';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png'
];

async function main() {
  if (!fs.existsSync('backend/uploads/breathing')) {
    fs.mkdirSync('backend/uploads/breathing', { recursive: true });
  }

  for (let i = 0; i < images.length; i++) {
    const imgPath = images[i];
    const meta = await sharp(imgPath).metadata();
    console.log(`Image ${i + 1}: ${meta.width} x ${meta.height}`);
  }
}

main().catch(console.error);

