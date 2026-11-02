import { createWorker } from 'tesseract.js';
import fs from 'fs';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png'
];

async function main() {
  const dir = 'backend/uploads/breathing';
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

