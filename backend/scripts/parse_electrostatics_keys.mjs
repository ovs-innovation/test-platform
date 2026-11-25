import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseKeys() {
  const pagePath = path.resolve(__dirname, 'electrostatics_pages/page_171.png');
  console.log('OCR on Answer Key Page 171...');
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(pagePath);
  await worker.terminate();

  console.log('--- RAW OCR OF PAGE 171 ---');
  console.log(text);
  fs.writeFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), text);
}

parseKeys().catch(console.error);
