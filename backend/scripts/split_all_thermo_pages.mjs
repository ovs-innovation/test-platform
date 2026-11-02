import sharp from 'sharp';
import fs from 'fs';

const outDir = 'backend/scripts/thermo_pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function splitAll() {
  // 1. Image 1: Single page (Page 55)
  // media_1793542152309_e4ebb8aa.png (472 x 548)
  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542152309_e4ebb8aa.png')
    .toFile(`${outDir}/page_55.png`);
  console.log('Saved page_55.png');

  // 2. Image 2: 2x2 collage (487 x 680)
  // Top-Left: Page 56, Top-Right: Page 57, Bottom-Left: Page 58, Bottom-Right: Page 59
  const meta2 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg').metadata();
  const midX2 = Math.floor(meta2.width / 2);
  const midY2 = Math.floor(meta2.height / 2);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg')
    .extract({ left: 0, top: 0, width: midX2, height: midY2 })
    .toFile(`${outDir}/page_56.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg')
    .extract({ left: midX2, top: 0, width: meta2.width - midX2, height: midY2 })
    .toFile(`${outDir}/page_57.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg')
    .extract({ left: 0, top: midY2, width: midX2, height: meta2.height - midY2 })
    .toFile(`${outDir}/page_58.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg')
    .extract({ left: midX2, top: midY2, width: meta2.width - midX2, height: meta2.height - midY2 })
    .toFile(`${outDir}/page_59.png`);
  console.log('Saved pages 56, 57, 58, 59');

  // 3. Image 3: 2x2 collage (482 x 682)
  // Top-Left: Page 60, Top-Right: Page 61, Bottom-Left: Page 62, Bottom-Right: Page 63
  const meta3 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg').metadata();
  const midX3 = Math.floor(meta3.width / 2);
  const midY3 = Math.floor(meta3.height / 2);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg')
    .extract({ left: 0, top: 0, width: midX3, height: midY3 })
    .toFile(`${outDir}/page_60.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg')
    .extract({ left: midX3, top: 0, width: meta3.width - midX3, height: midY3 })
    .toFile(`${outDir}/page_61.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg')
    .extract({ left: 0, top: midY3, width: midX3, height: meta3.height - midY3 })
    .toFile(`${outDir}/page_62.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg')
    .extract({ left: midX3, top: midY3, width: meta3.width - midX3, height: meta3.height - midY3 })
    .toFile(`${outDir}/page_63.png`);
  console.log('Saved pages 60, 61, 62, 63');

  // 4. Image 4: Side-by-side 2 pages (667 x 455)
  // Left: Page 64, Right: Page 65
  const meta4 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg').metadata();
  const midX4 = Math.floor(meta4.width / 2);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg')
    .extract({ left: 0, top: 0, width: midX4, height: meta4.height })
    .toFile(`${outDir}/page_64.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg')
    .extract({ left: midX4, top: 0, width: meta4.width - midX4, height: meta4.height })
    .toFile(`${outDir}/page_65.png`);
  console.log('Saved pages 64, 65');

  // 5. Image 5: Side-by-side 2 pages (667 x 437)
  // Left: Page 72, Right: Page 73
  const meta5 = await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg').metadata();
  const midX5 = Math.floor(meta5.width / 2);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg')
    .extract({ left: 0, top: 0, width: midX5, height: meta5.height })
    .toFile(`${outDir}/page_72.png`);

  await sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg')
    .extract({ left: midX5, top: 0, width: meta5.width - midX5, height: meta5.height })
    .toFile(`${outDir}/page_73.png`);
  console.log('Saved pages 72, 73');
}

splitAll().catch(console.error);

