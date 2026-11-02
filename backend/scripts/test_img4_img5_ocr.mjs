import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg';
const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg';

async function check() {
  const langPath = 'c:/Users/rs004/OneDrive/Desktop/test-platform';
  const worker = await createWorker('eng', 1, { langPath, cachePath: langPath });

  console.log('Recognizing img4...');
  const res4 = await worker.recognize(img4);
  console.log('--- IMG4 OCR (sample 500 chars) ---');
  console.log(res4.data.text.slice(0, 500));

  console.log('Recognizing img5...');
  const res5 = await worker.recognize(img5);
  console.log('--- IMG5 OCR (sample 500 chars) ---');
  console.log(res5.data.text.slice(0, 500));

  await worker.terminate();
}

check().catch(console.error);

