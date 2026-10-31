import sharp from 'sharp';
import fs from 'fs';

const cleanDir = 'uploads/morphology/pages_clean';
if (!fs.existsSync(cleanDir)) fs.mkdirSync(cleanDir, { recursive: true });

const sheets = [
  { file: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464637722_899f7a12.png', prefix: 'sheet1' },
  { file: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464663094_06b64088.png', prefix: 'sheet2' },
  { file: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464678067_87b95fa7.png', prefix: 'sheet3' },
  { file: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793464705657_8d337e8c.jpg', prefix: 'sheet4' }
];

async function extractPages() {
  for (const s of sheets) {
    const meta = await sharp(s.file).metadata();
    console.log(`${s.prefix}: ${meta.width}x${meta.height}`);
    const midX = Math.floor(meta.width / 2);
    const midY = Math.floor(meta.height / 2);

    await sharp(s.file).extract({ left: 0, top: 0, width: midX, height: midY }).resize({ width: 1400 }).toFile(`${cleanDir}/${s.prefix}_tl.png`);
    await sharp(s.file).extract({ left: midX, top: 0, width: meta.width - midX, height: midY }).resize({ width: 1400 }).toFile(`${cleanDir}/${s.prefix}_tr.png`);
    await sharp(s.file).extract({ left: 0, top: midY, width: midX, height: meta.height - midY }).resize({ width: 1400 }).toFile(`${cleanDir}/${s.prefix}_bl.png`);
    await sharp(s.file).extract({ left: midX, top: midY, width: meta.width - midX, height: meta.height - midY }).resize({ width: 1400 }).toFile(`${cleanDir}/${s.prefix}_br.png`);
    console.log(`Extracted 4 quadrants for ${s.prefix}`);
  }
  console.log('All 16 pages extracted successfully!');
}

extractPages().catch(err => {
  console.error(err);
  process.exit(1);
});
