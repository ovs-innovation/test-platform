import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Tesseract from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runOCR() {
  const slicesDir = path.resolve(__dirname, 'mole_q_slices');
  const outFile = path.resolve(__dirname, 'mole_ocr.json');

  let results = {};
  if (fs.existsSync(outFile)) {
    try {
      results = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    } catch {}
  }

  console.log('Starting parallel OCR on 84 question slices...');
  const scheduler = Tesseract.createScheduler();
  const worker1 = await Tesseract.createWorker('eng');
  const worker2 = await Tesseract.createWorker('eng');
  const worker3 = await Tesseract.createWorker('eng');
  const worker4 = await Tesseract.createWorker('eng');
  scheduler.addWorker(worker1);
  scheduler.addWorker(worker2);
  scheduler.addWorker(worker3);
  scheduler.addWorker(worker4);

  const jobs = [];
  for (let qNum = 1; qNum <= 84; qNum++) {
    if (results[qNum]) continue;
    const slicePath = path.join(slicesDir, `q_${qNum}.png`);
    if (!fs.existsSync(slicePath)) continue;

    jobs.push(
      scheduler.addJob('recognize', slicePath).then(out => {
        results[qNum] = out.data.text;
        console.log(`OCR done for Q${qNum}`);
      }).catch(err => {
        console.error(`Error OCR Q${qNum}:`, err.message);
      })
    );
  }

  await Promise.all(jobs);
  await scheduler.terminate();

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved all ${Object.keys(results).length} OCR results to ${outFile}`);
}

runOCR().catch(console.error);
