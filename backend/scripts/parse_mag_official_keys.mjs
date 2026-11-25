import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseKeys() {
  const worker = await createWorker('eng');
  
  const page203Path = path.resolve(__dirname, 'mag_jee_pages/page_203.png');
  const page204Path = path.resolve(__dirname, 'mag_jee_pages/page_204.png');

  console.log('Recognizing page 203...');
  const { data: { text: text203 } } = await worker.recognize(page203Path);
  console.log('Recognizing page 204...');
  const { data: { text: text204 } } = await worker.recognize(page204Path);

  await worker.terminate();

  console.log('=== PAGE 203 TEXT ===\n', text203);
  console.log('=== PAGE 204 TEXT ===\n', text204);

  fs.writeFileSync(path.resolve(__dirname, 'mag_keys_raw.txt'), text203 + '\n' + text204);
}

parseKeys().catch(console.error);
