import sharp from 'sharp';
import Tesseract from 'tesseract.js';
import path from 'path';

async function processPage(pageNum, file) {
  const meta = await sharp(file).metadata();
  const midX = Math.floor(meta.width / 2);
  
  // Left column
  const leftBuf = await sharp(file)
    .extract({ left: 0, top: 0, width: midX, height: meta.height })
    .grayscale()
    .normalize()
    .toBuffer();
    
  // Right column
  const rightBuf = await sharp(file)
    .extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height })
    .grayscale()
    .normalize()
    .toBuffer();

  console.log(`\n=================== PAGE ${pageNum} LEFT ===================`);
  const leftRes = await Tesseract.recognize(leftBuf, 'eng');
  console.log(leftRes.data.text);

  console.log(`\n=================== PAGE ${pageNum} RIGHT ===================`);
  const rightRes = await Tesseract.recognize(rightBuf, 'eng');
  console.log(rightRes.data.text);
}

async function run() {
  await processPage(80, path.resolve('backend/uploads/bio/pages_hires/page80.png'));
  await processPage(81, path.resolve('backend/uploads/bio/pages_hires/page81.png'));
}

run();

