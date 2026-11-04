import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGES = {
  img1: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694321045_4e13bde7.png',
  img2: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694344487_6914b068.jpg',
  img3: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694360756_1595a1d1.jpg',
  img4: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694375869_e1e12c16.png',
  img5: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694395907_cde93be9.jpg'
};

const OUT_DIR = path.join(__dirname, 'animal_pages');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sliceAll() {
  console.log('Slicing Animal Kingdom & Non-Chordates pages...');

  // Image 1: Single page (Page 337)
  await sharp(IMAGES.img1)
    .toFile(path.join(OUT_DIR, 'page_337.png'));
  console.log('Saved page_337.png');

  // Images 2 to 5: 2x2 grids
  const gridConfigs = [
    { key: 'img2', startPage: 338 },
    { key: 'img3', startPage: 342 },
    { key: 'img4', startPage: 346 },
    { key: 'img5', startPage: 350 }
  ];

  for (const g of gridConfigs) {
    const filePath = IMAGES[g.key];
    const meta = await sharp(filePath).metadata();
    const halfW = Math.floor(meta.width / 2);
    const halfH = Math.floor(meta.height / 2);

    // Top-Left (startPage)
    await sharp(filePath)
      .extract({ left: 0, top: 0, width: halfW, height: halfH })
      .toFile(path.join(OUT_DIR, `page_${g.startPage}.png`));

    // Top-Right (startPage + 1)
    await sharp(filePath)
      .extract({ left: halfW, top: 0, width: meta.width - halfW, height: halfH })
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 1}.png`));

    // Bottom-Left (startPage + 2)
    await sharp(filePath)
      .extract({ left: 0, top: halfH, width: halfW, height: meta.height - halfH })
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 2}.png`));

    // Bottom-Right (startPage + 3)
    await sharp(filePath)
      .extract({ left: halfW, top: halfH, width: meta.width - halfW, height: meta.height - halfH })
      .toFile(path.join(OUT_DIR, `page_${g.startPage + 3}.png`));

    console.log(`Sliced ${g.key} -> Pages ${g.startPage}, ${g.startPage + 1}, ${g.startPage + 2}, ${g.startPage + 3}`);
  }

  // Slice each page into 2 columns
  for (let p = 337; p <= 353; p++) {
    const pagePath = path.join(OUT_DIR, `page_${p}.png`);
    const pm = await sharp(pagePath).metadata();
    const colW = Math.floor(pm.width / 2);

    await sharp(pagePath)
      .extract({ left: 0, top: 0, width: colW, height: pm.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c1.png`));

    await sharp(pagePath)
      .extract({ left: colW, top: 0, width: pm.width - colW, height: pm.height })
      .toFile(path.join(OUT_DIR, `page_${p}_c2.png`));
  }

  console.log('All 17 pages (337 to 353) and 34 columns sliced successfully!');
}

sliceAll().catch(console.error);

