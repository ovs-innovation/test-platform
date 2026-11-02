import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const worker = await createWorker('eng');
  const f5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png';
  const m = await sharp(f5).metadata();

  // Crop the right half of f5, from top: Math.floor(m.height * 0.45) to bottom
  const b = await sharp(f5)
    .extract({
      left: Math.floor(m.width * 0.50),
      top: Math.floor(m.height * 0.40),
      width: Math.floor(m.width * 0.50),
      height: Math.floor(m.height * 0.60)
    })
    .resize({ width: 1400 })
    .toFile('backend/uploads/breathing/p241_full_right.png');

  console.log('=== P241 FULL RIGHT ===');
  console.log((await worker.recognize('backend/uploads/breathing/p241_full_right.png')).data.text);

  await worker.terminate();
}

main().catch(console.error);

