import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

async function testPage() {
  const f = 'backend/uploads/bio/pages/img1_top_left.png';
  // Upscale x3 with sharpening and grayscale
  const enhanced = 'backend/uploads/bio/pages/img1_top_left_enhanced.png';
  await sharp(f)
    .resize(484 * 3, 682 * 3, { kernel: 'lanczos3' })
    .grayscale()
    .normalize()
    .sharpen({ sigma: 1.5 })
    .toFile(enhanced);

  const worker = await createWorker('eng');
  const res = await worker.recognize(enhanced);
  console.log('=== OCR ENHANCED PAGE 50 ===');
  console.log(res.data.text);
  await worker.terminate();
}

testPage().catch(console.error);

