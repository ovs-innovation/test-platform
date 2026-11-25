import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectWords() {
  const worker = await createWorker('eng');
  
  for (const pageNum of [251, 252]) {
    const imgPath = path.resolve(__dirname, `ray_jee_pages/page_${pageNum}.png`);
    const ret = await worker.recognize(imgPath);
    const words = ret.data.words.map(w => ({
      text: w.text,
      bbox: w.bbox
    }));

    console.log(`Found ${words.length} words on page ${pageNum}.`);
    fs.writeFileSync(
      path.resolve(__dirname, `ray_key_words_${pageNum}.json`),
      JSON.stringify(words, null, 2)
    );
  }

  await worker.terminate();
}

inspectWords().catch(console.error);
