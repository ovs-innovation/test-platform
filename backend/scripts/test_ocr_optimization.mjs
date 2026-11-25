import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testOptimizations() {
  const imgPath = path.resolve(__dirname, 'test_p70_header.png');
  const img = await loadImage(imgPath);

  const worker = await createWorker('eng');

  // Test 1: Baseline raw
  const resRaw = await worker.recognize(imgPath);
  console.log('1. Baseline Raw:\n', resRaw.data.text.trim());

  // Test 2: PSM 6 (single uniform block of text)
  await worker.setParameters({ tessedit_pageseg_mode: '6' });
  const resPsm6 = await worker.recognize(imgPath);
  console.log('\n2. PSM 6:\n', resPsm6.data.text.trim());

  // Test 3: Upscaled 2x + Contrast stretch
  const scale = 2.0;
  const canvas = createCanvas(Math.round(img.width * scale), Math.round(img.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;

  // Find min and max intensity for contrast stretching
  let min = 255, max = 0;
  for (let i = 0; i < d.length; i += 4) {
    const gray = d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114;
    if (gray < min) min = gray;
    if (gray > max) max = gray;
  }

  // Contrast stretch and sharpen
  for (let i = 0; i < d.length; i += 4) {
    let gray = d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114;
    let stretched = ((gray - min) / (max - min)) * 255;
    // Binarize with threshold
    let val = stretched < 140 ? 0 : 255;
    d[i] = val;
    d[i+1] = val;
    d[i+2] = val;
  }
  ctx.putImageData(imgData, 0, 0);

  const processedBuf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.resolve(__dirname, 'test_p70_processed.png'), processedBuf);

  await worker.setParameters({ tessedit_pageseg_mode: '6' });
  const resProc = await worker.recognize(processedBuf);
  console.log('\n3. Upscaled 2x + Stretched + PSM 6:\n', resProc.data.text.trim());

  // Test 4: Grayscale with slight blur to remove JPEG compression block artifacts
  const canvas4 = createCanvas(canvas.width, canvas.height);
  const ctx4 = canvas4.getContext('2d');
  ctx4.drawImage(img, 0, 0, canvas4.width, canvas4.height);
  const d4 = ctx4.getImageData(0, 0, canvas4.width, canvas4.height);
  for (let i = 0; i < d4.data.length; i += 4) {
    const g = d4.data[i] * 0.299 + d4.data[i+1] * 0.587 + d4.data[i+2] * 0.114;
    // Gamma correction to darken text
    const gamma = Math.pow(g / 255, 1.8) * 255;
    d4.data[i] = gamma;
    d4.data[i+1] = gamma;
    d4.data[i+2] = gamma;
  }
  ctx4.putImageData(d4, 0, 0);
  const resGamma = await worker.recognize(canvas4.toBuffer('image/png'));
  console.log('\n4. Upscaled 2x + Gamma 1.8 + PSM 6:\n', resGamma.data.text.trim());

  await worker.terminate();
}

testOptimizations().catch(console.error);
