import { createWorker } from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectTsv(pageName, filterKeywords) {
  const worker = await createWorker('eng');
  const res = await worker.recognize(path.resolve(__dirname, 'periodicity_pages', pageName));
  await worker.terminate();

  console.log(`=== ${pageName} ===`);
  const lines = res.data.tsv.split('\n');
  const header = lines[0].split('\t');
  
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split('\t');
    if (cols.length >= 12) {
      const text = cols[11]?.trim();
      const left = parseInt(cols[6], 10);
      const top = parseInt(cols[7], 10);
      const width = parseInt(cols[8], 10);
      const height = parseInt(cols[9], 10);
      
      if (text && filterKeywords.some(kw => text.toLowerCase().includes(kw.toLowerCase()))) {
        console.log(`Found "${text}" at x=${left}, y=${top}, w=${width}, h=${height}`);
      }
    }
  }
}

async function run() {
  await inspectTsv('page_015.png', ['Size', 'decreases', 'increases', '64.']);
  await inspectTsv('page_027.png', ['Penetrating', 'stability', '108.', 'Mg']);
  await inspectTsv('page_036.png', ['Group', 'Period', '134.']);
  await inspectTsv('page_045.png', ['CCl4', 'electropositive', '165.']);
}

run().catch(console.error);
