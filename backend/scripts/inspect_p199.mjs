import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

async function main() {
  const meta199 = await sharp('backend/uploads/structural_organisation/pages_hires2/page_199.png').metadata();
  
  // Crop columns for 199
  await sharp('backend/uploads/structural_organisation/pages_hires2/page_199.png')
    .extract({ left: 0, top: 0, width: Math.floor(meta199.width * 0.50), height: meta199.height })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p199_c1.png');

  await sharp('backend/uploads/structural_organisation/pages_hires2/page_199.png')
    .extract({ left: Math.floor(meta199.width * 0.50), top: 0, width: Math.floor(meta199.width * 0.50), height: meta199.height })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p199_c2.png');

  const meta198 = await sharp('backend/uploads/structural_organisation/pages_hires2/page_198.png').metadata();
  await sharp('backend/uploads/structural_organisation/pages_hires2/page_198.png')
    .extract({ left: Math.floor(meta198.width * 0.50), top: Math.floor(meta198.height * 0.40), width: Math.floor(meta198.width * 0.50), height: Math.floor(meta198.height * 0.60) })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p198_ar.png');

  const worker = await createWorker('eng');
  
  console.log('Recognizing p198 AR...');
  const res198 = await worker.recognize('backend/uploads/structural_organisation/pages_hires2/p198_ar.png');
  fs.writeFileSync('backend/uploads/structural_organisation/pages_hires2/p198_ar.txt', res198.data.text);

  console.log('Recognizing p199 col 1...');
  const res199_1 = await worker.recognize('backend/uploads/structural_organisation/pages_hires2/p199_c1.png');
  fs.writeFileSync('backend/uploads/structural_organisation/pages_hires2/p199_c1.txt', res199_1.data.text);

  console.log('Recognizing p199 col 2...');
  const res199_2 = await worker.recognize('backend/uploads/structural_organisation/pages_hires2/p199_c2.png');
  fs.writeFileSync('backend/uploads/structural_organisation/pages_hires2/p199_c2.txt', res199_2.data.text);

  await worker.terminate();
  console.log('Completed OCR extraction!');
}

main().catch(console.error);
