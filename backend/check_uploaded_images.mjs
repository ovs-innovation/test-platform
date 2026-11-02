import sharp from 'sharp';
import fs from 'fs';

const files = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793348503228_c9187648.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793348524423_2c93be46.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793348544533_ad1d4a3e.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793348558800_680b29c5.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793348577773_fc252afd.png'
];

async function main() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const exists = fs.existsSync(f);
    if (!exists) {
      console.log(`[${i + 1}] NOT FOUND: ${f}`);
      continue;
    }
    const meta = await sharp(f).metadata();
    console.log(`[Image ${i + 1}] ${meta.width}x${meta.height}, format: ${meta.format}, size: ${(fs.statSync(f).size / 1024).toFixed(1)} KB`);
  }
}

main().catch(console.error);

