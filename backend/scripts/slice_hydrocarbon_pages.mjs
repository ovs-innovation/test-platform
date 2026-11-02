import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('backend/scripts/hydrocarbons_pages');
const colsDir = path.resolve('backend/scripts/hydrocarbons_pages/cols');
const uploadsDir = path.resolve('frontend/public/uploads/hydrocarbons');

for (const d of [outDir, colsDir, uploadsDir]) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598252727_f7a9b605.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598270819_c1fe1174.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598292408_0507d4ba.jpg',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598347977_d06c03d3.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793598395901_beb85611.png'
];

async function sliceAll() {
  console.log('--- Slicing Image 1 (Single Page, Q1-Q6) ---');
  // img 1: 402x477
  // col 1: x: 0 to 200, col 2: x: 200 to 402
  const img1 = sharp(images[0]);
  const m1 = await img1.metadata();
  await sharp(images[0]).extract({ left: 0, top: 0, width: Math.floor(m1.width * 0.5), height: m1.height })
    .resize(Math.floor(m1.width * 0.5) * 3)
    .toFile(path.join(colsDir, 'img1_col1.png'));
  await sharp(images[0]).extract({ left: Math.floor(m1.width * 0.48), top: 0, width: Math.ceil(m1.width * 0.52), height: m1.height })
    .resize(Math.ceil(m1.width * 0.52) * 3)
    .toFile(path.join(colsDir, 'img1_col2.png'));

  console.log('--- Slicing Image 2 (Page 150 & 151) ---');
  // img 2: 797x571
  const m2 = await sharp(images[1]).metadata();
  const halfW2 = Math.floor(m2.width / 2);
  // P150
  await sharp(images[1]).extract({ left: 0, top: 0, width: halfW2, height: m2.height })
    .toFile(path.join(outDir, 'p150.png'));
  // P151
  await sharp(images[1]).extract({ left: halfW2, top: 0, width: m2.width - halfW2, height: m2.height })
    .toFile(path.join(outDir, 'p151.png'));

  // Slices for P150 cols
  await sharp(path.join(outDir, 'p150.png')).extract({ left: 0, top: 0, width: Math.floor(halfW2 * 0.51), height: m2.height })
    .resize(Math.floor(halfW2 * 0.51) * 3).toFile(path.join(colsDir, 'p150_col1.png'));
  await sharp(path.join(outDir, 'p150.png')).extract({ left: Math.floor(halfW2 * 0.49), top: 0, width: Math.ceil(halfW2 * 0.51), height: m2.height })
    .resize(Math.ceil(halfW2 * 0.51) * 3).toFile(path.join(colsDir, 'p150_col2.png'));

  // Slices for P151 cols
  const p151W = m2.width - halfW2;
  await sharp(path.join(outDir, 'p151.png')).extract({ left: 0, top: 0, width: Math.floor(p151W * 0.51), height: m2.height })
    .resize(Math.floor(p151W * 0.51) * 3).toFile(path.join(colsDir, 'p151_col1.png'));
  await sharp(path.join(outDir, 'p151.png')).extract({ left: Math.floor(p151W * 0.49), top: 0, width: Math.ceil(p151W * 0.51), height: m2.height })
    .resize(Math.ceil(p151W * 0.51) * 3).toFile(path.join(colsDir, 'p151_col2.png'));

  console.log('--- Slicing Image 3 (Page 152 & 153) ---');
  // img 3: 783x557
  const m3 = await sharp(images[2]).metadata();
  const halfW3 = Math.floor(m3.width / 2);
  // P152
  await sharp(images[2]).extract({ left: 0, top: 0, width: halfW3, height: m3.height })
    .toFile(path.join(outDir, 'p152.png'));
  // P153
  await sharp(images[2]).extract({ left: halfW3, top: 0, width: m3.width - halfW3, height: m3.height })
    .toFile(path.join(outDir, 'p153.png'));

  // P152 cols
  await sharp(path.join(outDir, 'p152.png')).extract({ left: 0, top: 0, width: Math.floor(halfW3 * 0.51), height: m3.height })
    .resize(Math.floor(halfW3 * 0.51) * 3).toFile(path.join(colsDir, 'p152_col1.png'));
  await sharp(path.join(outDir, 'p152.png')).extract({ left: Math.floor(halfW3 * 0.49), top: 0, width: Math.ceil(halfW3 * 0.51), height: m3.height })
    .resize(Math.ceil(halfW3 * 0.51) * 3).toFile(path.join(colsDir, 'p152_col2.png'));

  // P153 cols
  const p153W = m3.width - halfW3;
  await sharp(path.join(outDir, 'p153.png')).extract({ left: 0, top: 0, width: Math.floor(p153W * 0.51), height: m3.height })
    .resize(Math.floor(p153W * 0.51) * 3).toFile(path.join(colsDir, 'p153_col1.png'));
  await sharp(path.join(outDir, 'p153.png')).extract({ left: Math.floor(p153W * 0.49), top: 0, width: Math.ceil(p153W * 0.51), height: m3.height })
    .resize(Math.ceil(p153W * 0.51) * 3).toFile(path.join(colsDir, 'p153_col2.png'));

  console.log('--- Slicing Image 4 (4 Pages: 154, 155, 156, 157) ---');
  // img 4: 465x672
  const m4 = await sharp(images[3]).metadata();
  const midX4 = Math.floor(m4.width / 2);
  const midY4 = Math.floor(m4.height / 2);

  // Top Left: P154
  await sharp(images[3]).extract({ left: 0, top: 0, width: midX4, height: midY4 })
    .resize(midX4 * 3).toFile(path.join(outDir, 'p154.png'));
  // Top Right: P155
  await sharp(images[3]).extract({ left: midX4, top: 0, width: m4.width - midX4, height: midY4 })
    .resize((m4.width - midX4) * 3).toFile(path.join(outDir, 'p155.png'));
  // Bottom Left: P156
  await sharp(images[3]).extract({ left: 0, top: midY4, width: midX4, height: m4.height - midY4 })
    .resize(midX4 * 3).toFile(path.join(outDir, 'p156.png'));
  // Bottom Right: P157
  await sharp(images[3]).extract({ left: midX4, top: midY4, width: m4.width - midX4, height: m4.height - midY4 })
    .resize((m4.width - midX4) * 3).toFile(path.join(outDir, 'p157.png'));

  console.log('--- Slicing Image 5 (Page 166 & 167) ---');
  // img 5: 810x577
  const m5 = await sharp(images[4]).metadata();
  const halfW5 = Math.floor(m5.width / 2);
  // P166
  await sharp(images[4]).extract({ left: 0, top: 0, width: halfW5, height: m5.height })
    .toFile(path.join(outDir, 'p166.png'));
  // P167
  await sharp(images[4]).extract({ left: halfW5, top: 0, width: m5.width - halfW5, height: m5.height })
    .toFile(path.join(outDir, 'p167.png'));

  // P166 cols
  await sharp(path.join(outDir, 'p166.png')).extract({ left: 0, top: 0, width: Math.floor(halfW5 * 0.51), height: m5.height })
    .resize(Math.floor(halfW5 * 0.51) * 3).toFile(path.join(colsDir, 'p166_col1.png'));
  await sharp(path.join(outDir, 'p166.png')).extract({ left: Math.floor(halfW5 * 0.49), top: 0, width: Math.ceil(halfW5 * 0.51), height: m5.height })
    .resize(Math.ceil(halfW5 * 0.51) * 3).toFile(path.join(colsDir, 'p166_col2.png'));

  // P167 cols
  const p167W = m5.width - halfW5;
  await sharp(path.join(outDir, 'p167.png')).extract({ left: 0, top: 0, width: Math.floor(p167W * 0.51), height: m5.height })
    .resize(Math.floor(p167W * 0.51) * 3).toFile(path.join(colsDir, 'p167_col1.png'));
  await sharp(path.join(outDir, 'p167.png')).extract({ left: Math.floor(p167W * 0.49), top: 0, width: Math.ceil(p167W * 0.51), height: m5.height })
    .resize(Math.ceil(p167W * 0.51) * 3).toFile(path.join(colsDir, 'p167_col2.png'));

  console.log('Done slicing all pages and columns!');
}

sliceAll().catch(console.error);

