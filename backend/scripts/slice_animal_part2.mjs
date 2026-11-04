import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';
const OUT_DIR = 'backend/scripts/animal_pages_part2';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function sliceAll() {
  const gridImages = [
    { file: 'media_1793696712230_9c073fba.jpg', pages: [354, 355, 356, 357] },
    { file: 'media_1793696729697_476e3bce.png', pages: [358, 359, 360, 361] },
    { file: 'media_1793696753218_55d9f9ae.png', pages: [362, 363, 364, 365] },
    { file: 'media_1793696773045_28ad2ece.jpg', pages: [366, 367, 368, 369] }
  ];

  for (const item of gridImages) {
    const filePath = path.join(basePath, item.file);
    const meta = await sharp(filePath).metadata();
    const midX = Math.floor(meta.width / 2);
    const midY = Math.floor(meta.height / 2);

    // Top-Left
    await sharp(filePath)
      .extract({ left: 0, top: 0, width: midX, height: midY })
      .toFile(path.join(OUT_DIR, `page_${item.pages[0]}.png`));

    // Top-Right
    await sharp(filePath)
      .extract({ left: midX, top: 0, width: meta.width - midX, height: midY })
      .toFile(path.join(OUT_DIR, `page_${item.pages[1]}.png`));

    // Bottom-Left
    await sharp(filePath)
      .extract({ left: 0, top: midY, width: midX, height: meta.height - midY })
      .toFile(path.join(OUT_DIR, `page_${item.pages[2]}.png`));

    // Bottom-Right
    await sharp(filePath)
      .extract({ left: midX, top: midY, width: meta.width - midX, height: meta.height - midY })
      .toFile(path.join(OUT_DIR, `page_${item.pages[3]}.png`));

    console.log(`Sliced ${item.file} -> Pages ${item.pages.join(', ')}`);
  }

  // Image 5: 1x2 side-by-side (Page 380, Page 381)
  const img5Path = path.join(basePath, 'media_1793696808315_54077879.png');
  const meta5 = await sharp(img5Path).metadata();
  const midX5 = Math.floor(meta5.width / 2);

  await sharp(img5Path)
    .extract({ left: 0, top: 0, width: midX5, height: meta5.height })
    .toFile(path.join(OUT_DIR, `page_380.png`));

  await sharp(img5Path)
    .extract({ left: midX5, top: 0, width: meta5.width - midX5, height: meta5.height })
    .toFile(path.join(OUT_DIR, `page_381.png`));

  console.log(`Sliced media_1793696808315_54077879.png -> Pages 380, 381`);

  // Now slice each page into 2 columns for clear reading/OCR
  const allPages = [
    354, 355, 356, 357,
    358, 359, 360, 361,
    362, 363, 364, 365,
    366, 367, 368, 369,
    380, 381
  ];

  for (const p of allPages) {
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

  console.log(`Successfully sliced all 18 pages and 36 columns!`);
}

sliceAll().catch(console.error);

