import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectWords() {
  const worker = await createWorker('eng');
  
  const imgPath = path.resolve(__dirname, 'mag_jee_pages/page_203.png');
  const ret = await worker.recognize(imgPath);
  const words = ret.data.words.map(w => ({
    text: w.text,
    bbox: w.bbox
  }));

  console.log(`Found ${words.length} words on page 203.`);
  fs.writeFileSync(
    path.resolve(__dirname, 'mag_key_words_203.json'),
    JSON.stringify(words, null, 2)
  );

  await worker.terminate();
}

inspectWords().catch(console.error);
