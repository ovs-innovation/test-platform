import sharp from 'sharp';
import fs from 'fs';

const img1 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456829636_aafb7671.jpg';
const img2 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456851797_1e003f66.jpg';
const img3 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456869867_0d85ebf8.jpg';
const img4 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456890528_584030a9.jpg';
const img5 = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793456908656_d8b28cf3.jpg';

async function slice() {
  const outDir = 'backend/uploads/body_fluids/pages_clean';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // img1: 1 page (Page 1: Q1 to Q7)
  await sharp(img1).resize({ width: 1400 }).toFile(`${outDir}/page_001.png`);

  // img2: 2 pages (Left: Page 244, Right: Page 245)
  const meta2 = await sharp(img2).metadata();
  const mid2 = Math.floor(meta2.width / 2);
  await sharp(img2).extract({ left: 0, top: 0, width: mid2, height: meta2.height }).resize({ width: 1400 }).toFile(`${outDir}/page_244.png`);
  await sharp(img2).extract({ left: mid2, top: 0, width: meta2.width - mid2, height: meta2.height }).resize({ width: 1400 }).toFile(`${outDir}/page_245.png`);

  // img3: 2 pages (Left: Page 246, Right: Page 247)
  const meta3 = await sharp(img3).metadata();
  const mid3 = Math.floor(meta3.width / 2);
  await sharp(img3).extract({ left: 0, top: 0, width: mid3, height: meta3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_246.png`);
  await sharp(img3).extract({ left: mid3, top: 0, width: meta3.width - mid3, height: meta3.height }).resize({ width: 1400 }).toFile(`${outDir}/page_247.png`);

  // img4: 4 quadrants
  const meta4 = await sharp(img4).metadata();
  const midX4 = Math.floor(meta4.width / 2);
  const midY4 = Math.floor(meta4.height / 2);
  await sharp(img4).extract({ left: 0, top: 0, width: midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_248.png`);
  await sharp(img4).extract({ left: midX4, top: 0, width: meta4.width - midX4, height: midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_249.png`);
  await sharp(img4).extract({ left: 0, top: midY4, width: midX4, height: meta4.height - midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_250.png`);
  await sharp(img4).extract({ left: midX4, top: midY4, width: meta4.width - midX4, height: meta4.height - midY4 }).resize({ width: 1400 }).toFile(`${outDir}/page_251.png`);

  // img5: check layout
  const meta5 = await sharp(img5).metadata();
  console.log('Image 5 dimensions:', meta5.width, meta5.height);
  // Just save full img5 for now to inspect
  await sharp(img5).resize({ width: 1400 }).toFile(`${outDir}/img5_full.png`);

  console.log('Sliced pages saved to', outDir);
}

slice().catch(console.error);
