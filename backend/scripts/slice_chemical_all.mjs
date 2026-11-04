import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGES = {
  img1: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689671083_077beaf5.png',
  img2: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689690510_62326720.jpg',
  img3: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689934833_c9c37bac.jpg',
  img4: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689947541_f79ba2b6.png',
  img5: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793689988274_c316d297.jpg'
};

const OUT_DIR = path.join(__dirname, 'chemical_pages');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sliceAll() {
  console.log('Slicing all 18 pages of Chemical Coordination and Integration...');

  // 1. Image 1 (Pages 314 & 315) - horizontal 2-page spread
  const meta1 = await sharp(IMAGES.img1).metadata();
  const halfW1 = Math.floor(meta1.width / 2);
  
  // Page 314 (Left)
  await sharp(IMAGES.img1)
    .extract({ left: 0, top: 0, width: halfW1, height: meta1.height })
    .resize(1500, 2100)
    .toFile(path.join(OUT_DIR, 'page_314.png'));
  
  // Page 315 (Right)
  await sharp(IMAGES.img1)
    .extract({ left: halfW1, top: 0, width: meta1.width - halfW1, height: meta1.height })
    .resize(1500, 2100)
    .toFile(path.join(OUT_DIR, 'page_315.png'));

  console.log('Sliced Image 1 -> Pages 314, 315');

  // 2. Images 2 to 5 (4 pages each in 2x2 grid)
  const gridImages = [
    { key: 'img2', startPage: 316 },
    { key: 'img3', startPage: 320 },
    { key: 'img4', startPage: 324 },
    { key: 'img5', startPage: 328 }
  ];

  for (const g of gridImages) {
    const filePath = IMAGES[g.key];
    const meta = await sharp(filePath).metadata();
    const halfW = Math.floor(meta.width / 2);
    const halfH = Math.floor(meta.height / 2);

    // Top-Left (startPage)
    await sharp(filePath)
      .extract({ left: 0, top: 0, width: halfW, height: halfH })
      .resize(1500, 2100)
      .toFile(path.join(OUT_DIR, `page_${g.startPage}.png`));

    // Top-Right (startPage + 1)
    await sharp(filePath)
      .extract({ left: halfW, top: 0, width: meta.width - halfW, height: halfH })
      .resize(1500, 2100)
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 1}.png`));

    // Bottom-Left (startPage + 2)
    await sharp(filePath)
      .extract({ left: 0, top: halfH, width: halfW, height: meta.height - halfH })
      .resize(1500, 2100)
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 2}.png`));

    // Bottom-Right (startPage + 3)
    await sharp(filePath)
      .extract({ left: halfW, top: halfH, width: meta.width - halfW, height: meta.height - halfH })
      .resize(1500, 2100)
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 3}.png`));

    console.log(`Sliced ${g.key} -> Pages ${g.startPage}, ${g.startPage + 1}, ${g.startPage + 2}, ${g.startPage + 3}`);
  }

  // Now slice each of the 18 pages into Column 1 and Column 2
  for (let p = 314; p <= 331; p++) {
    const pagePath = path.join(OUT_DIR, `page_${p}.png`);
    const pageMeta = await sharp(pagePath).metadata();
    const colW = Math.floor(pageMeta.width / 2);

    await sharp(pagePath)
      .extract({ left: 0, top: 0, width: colW, height: pageMeta.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c1.png`));

    await sharp(pagePath)
      .extract({ left: colW, top: 0, width: pageMeta.width - colW, height: pageMeta.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c2.png`));
  }

  console.log('All 18 pages and 36 columns sliced successfully!');
}

sliceAll().catch(console.error);

