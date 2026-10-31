import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'backend/uploads/structural_organisation/pages_hires';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function extractPages() {
  // Image 1: 261 x 692 (split vertically into 2 pages)
  const img1Path = basePath + 'media_1793449701423_5e8cabaf.png';
  const m1 = await sharp(img1Path).metadata();
  const midY1 = Math.floor(m1.height * 0.49);

  await sharp(img1Path)
    .extract({ left: 0, top: 0, width: m1.width, height: midY1 })
    .resize(m1.width * 4, midY1 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_169.png'));
  console.log('Saved page_169.png');

  await sharp(img1Path)
    .extract({ left: 0, top: midY1, width: m1.width, height: m1.height - midY1 })
    .resize(m1.width * 4, (m1.height - midY1) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_170.png'));
  console.log('Saved page_170.png');

  // Image 2: 490 x 662 (single page: page 171)
  const img2Path = basePath + 'media_1793449722478_45adc100.png';
  const m2 = await sharp(img2Path).metadata();
  await sharp(img2Path)
    .resize(m2.width * 3, m2.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_171.png'));
  console.log('Saved page_171.png');

  // Image 3: 486 x 672 (2x2 grid: pages 172, 173, 174, 175)
  const img3Path = basePath + 'media_1793449750716_b81bca44.png';
  const m3 = await sharp(img3Path).metadata();
  const midX3 = Math.floor(m3.width / 2);
  const midY3 = Math.floor(m3.height / 2);

  // Top-left: 172
  await sharp(img3Path)
    .extract({ left: 0, top: 0, width: midX3, height: midY3 })
    .resize(midX3 * 4, midY3 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_172.png'));
  // Top-right: 173
  await sharp(img3Path)
    .extract({ left: midX3, top: 0, width: m3.width - midX3, height: midY3 })
    .resize((m3.width - midX3) * 4, midY3 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_173.png'));
  // Bottom-left: 174
  await sharp(img3Path)
    .extract({ left: 0, top: midY3, width: midX3, height: m3.height - midY3 })
    .resize(midX3 * 4, (m3.height - midY3) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_174.png'));
  // Bottom-right: 175
  await sharp(img3Path)
    .extract({ left: midX3, top: midY3, width: m3.width - midX3, height: m3.height - midY3 })
    .resize((m3.width - midX3) * 4, (m3.height - midY3) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_175.png'));
  console.log('Saved pages 172-175');

  // Image 4: 487 x 692 (2x2 grid: pages 176, 177, 178, 179)
  const img4Path = basePath + 'media_1793449763764_52974251.jpg';
  const m4 = await sharp(img4Path).metadata();
  const midX4 = Math.floor(m4.width / 2);
  const midY4 = Math.floor(m4.height / 2);

  // Top-left: 176
  await sharp(img4Path)
    .extract({ left: 0, top: 0, width: midX4, height: midY4 })
    .resize(midX4 * 4, midY4 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_176.png'));
  // Top-right: 177
  await sharp(img4Path)
    .extract({ left: midX4, top: 0, width: m4.width - midX4, height: midY4 })
    .resize((m4.width - midX4) * 4, midY4 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_177.png'));
  // Bottom-left: 178
  await sharp(img4Path)
    .extract({ left: 0, top: midY4, width: midX4, height: m4.height - midY4 })
    .resize(midX4 * 4, (m4.height - midY4) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_178.png'));
  // Bottom-right: 179
  await sharp(img4Path)
    .extract({ left: midX4, top: midY4, width: m4.width - midX4, height: m4.height - midY4 })
    .resize((m4.width - midX4) * 4, (m4.height - midY4) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_179.png'));
  console.log('Saved pages 176-179');

  // Image 5: 481 x 677 (2x2 grid: pages 180, 181, 182, 183)
  const img5Path = basePath + 'media_1793449784666_82513a90.png';
  const m5 = await sharp(img5Path).metadata();
  const midX5 = Math.floor(m5.width / 2);
  const midY5 = Math.floor(m5.height / 2);

  // Top-left: 180
  await sharp(img5Path)
    .extract({ left: 0, top: 0, width: midX5, height: midY5 })
    .resize(midX5 * 4, midY5 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_180.png'));
  // Top-right: 181
  await sharp(img5Path)
    .extract({ left: midX5, top: 0, width: m5.width - midX5, height: midY5 })
    .resize((m5.width - midX5) * 4, midY5 * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_181.png'));
  // Bottom-left: 182
  await sharp(img5Path)
    .extract({ left: 0, top: midY5, width: midX5, height: m5.height - midY5 })
    .resize(midX5 * 4, (m5.height - midY5) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_182.png'));
  // Bottom-right: 183
  await sharp(img5Path)
    .extract({ left: midX5, top: midY5, width: m5.width - midX5, height: m5.height - midY5 })
    .resize((m5.width - midX5) * 4, (m5.height - midY5) * 4, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_183.png'));
  console.log('Saved pages 180-183');
}

extractPages().catch(console.error);
