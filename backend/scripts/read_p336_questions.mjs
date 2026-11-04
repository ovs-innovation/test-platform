import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793693010864_538af32b.png';

async function readQuestions() {
  const meta = await sharp(IMG2).metadata();
  const halfW = Math.floor(meta.width / 2);

  // Column 1 (Left): Questions 8 to 15
  // Let's divide Column 1 into 8 slices
  console.log('=== COLUMN 1 (Questions 8 to 15) ===');
  const sliceH1 = Math.floor(meta.height / 8);
  for (let i = 0; i < 8; i++) {
    const top = i * sliceH1;
    const h = (i === 7) ? (meta.height - top) : sliceH1;
    const buf = await sharp(IMG2)
      .extract({ left: 0, top, width: halfW, height: h })
      .resize(800, 300, { kernel: 'lanczos3' })
      .greyscale()
      .linear(2.0, -45)
      .sharpen()
      .toBuffer();
    const res = await Tesseract.recognize(buf, 'eng');
    console.log(`[Q${i + 8} slice]:\n${res.data.text.trim()}\n`);
  }

  // Column 2 (Right): Questions 16 to 25
  console.log('=== COLUMN 2 (Questions 16 to 25) ===');
  const sliceH2 = Math.floor(meta.height / 10);
  for (let i = 0; i < 10; i++) {
    const top = i * sliceH2;
    const h = (i === 9) ? (meta.height - top) : sliceH2;
    const buf = await sharp(IMG2)
      .extract({ left: halfW, top, width: meta.width - halfW, height: h })
      .resize(800, 300, { kernel: 'lanczos3' })
      .greyscale()
      .linear(2.0, -45)
      .sharpen()
      .toBuffer();
    const res = await Tesseract.recognize(buf, 'eng');
    console.log(`[Q${i + 16} slice]:\n${res.data.text.trim()}\n`);
  }
}

readQuestions().catch(console.error);

