import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import path from 'path';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795079372246_fb530dbf.png';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795079401081_a5fe965f.png';

async function main() {
  const m1 = await sharp(img1).metadata();
  const m2 = await sharp(img2).metadata();
  console.log('Image 1 size:', m1.width, 'x', m1.height);
  console.log('Image 2 size:', m2.width, 'x', m2.height);

  // In Image 1, the center column has the questions (roughly x: 250 to 800)
  // Let's crop a few vertical slices and OCR them
  const worker = await createWorker('eng');
  
  // Crop middle 50% width of image 1
  const crop1Buf = await sharp(img1)
    .extract({ left: Math.round(m1.width * 0.2), top: 0, width: Math.round(m1.width * 0.6), height: m1.height })
    .toBuffer();
  
  const ocr1 = await worker.recognize(crop1Buf);
  console.log('=== SCREENSHOT 1 OCR (Middle Column) ===');
  console.log(ocr1.data.text);

  const crop2Buf = await sharp(img2)
    .extract({ left: Math.round(m2.width * 0.2), top: 0, width: Math.round(m2.width * 0.6), height: m2.height })
    .toBuffer();
  
  const ocr2 = await worker.recognize(crop2Buf);
  console.log('=== SCREENSHOT 2 OCR (Middle Column) ===');
  console.log(ocr2.data.text);

  await worker.terminate();
}

main().catch(console.error);
