import { createWorker } from 'tesseract.js';
import fs from 'fs';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456829636_aafb7671.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456851797_1e003f66.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456869867_0d85ebf8.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456890528_584030a9.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg'
];

async function main() {
  const dir = 'backend/uploads/body_fluids/ocr_raw';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const worker = await createWorker('eng');

  for (let i = 0; i < images.length; i++) {
    console.log(`Running OCR on image ${i + 1}...`);
    const res = await worker.recognize(images[i]);
    fs.writeFileSync(`${dir}/img${i + 1}_ocr.txt`, res.data.text);
    console.log(`Saved img${i + 1}_ocr.txt (${res.data.text.length} chars)`);
  }

  await worker.terminate();
  console.log('All OCR done!');
}

main().catch(console.error);
