import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const worker = await createWorker('eng');
  const imgPath = path.resolve(__dirname, `ray_jee_pages/page_252.png`);
  const ret = await worker.recognize(imgPath);
  console.log('ret.data keys:', Object.keys(ret.data));
  await worker.terminate();
}

main().catch(console.error);
