import { createWorker } from 'tesseract.js';
import path from 'path';

const img = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542152309_e4ebb8aa.png';

async function test() {
  console.log('Initializing worker with local langPath...');
  const langPath = 'c:/Users/rs004/OneDrive/Desktop/test-platform';
  const worker = await createWorker('eng', 1, {
    langPath: langPath,
    cachePath: langPath
  });
  console.log('Worker ready, recognizing...');
  const res = await worker.recognize(img);
  console.log('--- OCR Result Image 1 ---');
  console.log(res.data.text);
  await worker.terminate();
}

test().catch(console.error);
