import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

async function ocrPage(pageName) {
  const pPath = `backend/uploads/bio/pages_hires/${pageName}`;
  const meta = await sharp(pPath).metadata();
  const midX = Math.round(meta.width / 2);

  const col1Path = `backend/uploads/bio/pages_hires/${pageName}_col1.png`;
  const col2Path = `backend/uploads/bio/pages_hires/${pageName}_col2.png`;

  await sharp(pPath)
    .extract({ left: 0, top: 0, width: midX, height: meta.height })
    .grayscale()
    .normalize()
    .sharpen({ sigma: 1.5 })
    .toFile(col1Path);

  await sharp(pPath)
    .extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height })
    .grayscale()
    .normalize()
    .sharpen({ sigma: 1.5 })
    .toFile(col2Path);

  const worker = await createWorker('eng');
  const r1 = await worker.recognize(col1Path);
  const r2 = await worker.recognize(col2Path);
  await worker.terminate();

  fs.unlinkSync(col1Path);
  fs.unlinkSync(col2Path);

  return { col1: r1.data.text, col2: r2.data.text };
}

async function main() {
  const pages = ['page56.png', 'page57.png', 'page58.png'];
  for (const p of pages) {
    console.log(`\n=================== ${p} ===================`);
    const { col1, col2 } = await ocrPage(p);
    console.log('--- COL 1 ---');
    console.log(col1);
    console.log('--- COL 2 ---');
    console.log(col2);
  }
}

main().catch(console.error);
