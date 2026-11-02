import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function main() {
  const f5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png';
  const m5 = await sharp(f5).metadata();

  // Bottom right of f5 is Page 241
  await sharp(f5)
    .extract({
      left: Math.floor(m5.width / 2),
      top: Math.floor(m5.height / 2),
      width: Math.floor(m5.width / 2),
      height: Math.floor(m5.height / 2)
    })
    .resize({ width: 1400 })
    .toFile('backend/uploads/breathing/page_241_true.png');

  const meta241 = await sharp('backend/uploads/breathing/page_241_true.png').metadata();
  console.log('page_241_true size:', meta241.width, meta241.height);

  // Right column of Page 241 is Section B AR
  await sharp('backend/uploads/breathing/page_241_true.png')
    .extract({
      left: Math.floor(meta241.width * 0.45),
      top: 0,
      width: Math.floor(meta241.width * 0.55),
      height: meta241.height
    })
    .toFile('backend/uploads/breathing/page_241_section_b.png');

  const worker = await createWorker('eng');
  const res = await worker.recognize('backend/uploads/breathing/page_241_section_b.png');
  console.log('=== SECTION B AR QUESTIONS ===');
  console.log(res.data.text);
  await worker.terminate();
}

main().catch(console.error);
