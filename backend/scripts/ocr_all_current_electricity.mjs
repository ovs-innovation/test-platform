import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Tesseract from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runOCR() {
  const slicesDir = path.resolve(__dirname, 'current_electricity_q_slices');
  const outFile = path.resolve(__dirname, 'current_electricity_ocr.json');
  
  let results = {};
  if (fs.existsSync(outFile)) {
    try {
      results = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    } catch {}
  }

  console.log('Starting OCR on 173 question slices...');
  const scheduler = Tesseract.createScheduler();
  const worker1 = await Tesseract.createWorker('eng');
  const worker2 = await Tesseract.createWorker('eng');
  scheduler.addWorker(worker1);
  scheduler.addWorker(worker2);

  const jobs = [];
  for (let q = 1; q <= 173; q++) {
    if (results[`Q${q}`]) continue; // skip already processed if any
    const imgPath = path.join(slicesDir, `q_${q}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`Slice missing: ${imgPath}`);
      continue;
    }
    jobs.push({ q, imgPath });
  }

  console.log(`Remaining jobs to run: ${jobs.length}`);

  const tasks = jobs.map(async ({ q, imgPath }) => {
    const res = await scheduler.addJob('recognize', imgPath);
    results[`Q${q}`] = res.data.text;
    if (q % 20 === 0 || q === 173) {
      console.log(`Q${q} OCR complete.`);
    }
  });

  await Promise.all(tasks);
  await scheduler.terminate();

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`Saved ${Object.keys(results).length} OCR results to ${outFile}`);
}

runOCR().catch(console.error);

