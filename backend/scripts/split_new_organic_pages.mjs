import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = 'scripts/organic_pages_batch2';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function split() {
  // 1. Image 1 (610x421) -> Page 132 (left), Page 133 (right)
  const img1 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597141891_4776150e.png');
  const m1 = await img1.metadata();
  const midX1 = Math.round(m1.width / 2);
  await img1.clone().extract({ left: 0, top: 0, width: midX1, height: m1.height }).png().toFile(path.join(OUT_DIR, 'page_132.png'));
  await img1.clone().extract({ left: midX1, top: 0, width: m1.width - midX1, height: m1.height }).png().toFile(path.join(OUT_DIR, 'page_133.png'));

  // 2. Image 2 (477x672) -> 4 pages: 2x2 grid
  // Top: page_134 (left), page_135 (right)
  // Bottom: page_136 (left), page_137 (right)
  const img2 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597163820_99aa9546.png');
  const m2 = await img2.metadata();
  const midX2 = Math.round(m2.width / 2);
  const midY2 = Math.round(m2.height / 2);
  await img2.clone().extract({ left: 0, top: 0, width: midX2, height: midY2 }).png().toFile(path.join(OUT_DIR, 'page_134.png'));
  await img2.clone().extract({ left: midX2, top: 0, width: m2.width - midX2, height: midY2 }).png().toFile(path.join(OUT_DIR, 'page_135.png'));
  await img2.clone().extract({ left: 0, top: midY2, width: midX2, height: m2.height - midY2 }).png().toFile(path.join(OUT_DIR, 'page_136.png'));
  await img2.clone().extract({ left: midX2, top: midY2, width: m2.width - midX2, height: m2.height - midY2 }).png().toFile(path.join(OUT_DIR, 'page_137.png'));

  // 3. Image 3 (470x322) -> Page 138 (left), Page 139 (right)
  const img3 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597176605_3435a789.png');
  const m3 = await img3.metadata();
  const midX3 = Math.round(m3.width / 2);
  await img3.clone().extract({ left: 0, top: 0, width: midX3, height: m3.height }).png().toFile(path.join(OUT_DIR, 'page_138.png'));
  await img3.clone().extract({ left: midX3, top: 0, width: m3.width - midX3, height: m3.height }).png().toFile(path.join(OUT_DIR, 'page_139.png'));

  // 4. Image 4 (470x333) -> Page 144 (left), Page 145 (right)
  const img4 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597192952_cc163d89.png');
  const m4 = await img4.metadata();
  const midX4 = Math.round(m4.width / 2);
  await img4.clone().extract({ left: 0, top: 0, width: midX4, height: m4.height }).png().toFile(path.join(OUT_DIR, 'page_144.png'));
  await img4.clone().extract({ left: midX4, top: 0, width: m4.width - midX4, height: m4.height }).png().toFile(path.join(OUT_DIR, 'page_145.png'));

  // 5. Image 5 (370x313) -> Page 148 (Section B AR questions 6 to 15)
  const img5 = sharp('C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793597222445_3e25c98e.jpg');
  await img5.clone().png().toFile(path.join(OUT_DIR, 'page_148.png'));

  console.log('Successfully split all pages into scripts/organic_pages_batch2/');
}

split().catch(console.error);

