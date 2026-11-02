import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'backend/uploads/structural_organisation/pages_hires2';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const basePath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/';

async function splitSheets() {
  // 1. Pages 192 & 193 from media_1793452210534_f99b13f6.jpg
  const img1 = basePath + 'media_1793452210534_f99b13f6.jpg';
  const m1 = await sharp(img1).metadata();
  const midX1 = Math.floor(m1.width * 0.49);

  await sharp(img1)
    .extract({ left: 0, top: 0, width: midX1, height: m1.height })
    .resize(midX1 * 3, m1.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_192.png'));

  await sharp(img1)
    .extract({ left: midX1, top: 0, width: m1.width - midX1, height: m1.height })
    .resize((m1.width - midX1) * 3, m1.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_193.png'));
  console.log('Saved page_192.png and page_193.png');

  // 2. Pages 194 & 195 from media_1793452196796_428f3b20.png
  const img2 = basePath + 'media_1793452196796_428f3b20.png';
  const m2 = await sharp(img2).metadata();
  const midX2 = Math.floor(m2.width * 0.49);

  await sharp(img2)
    .extract({ left: 0, top: 0, width: midX2, height: m2.height })
    .resize(midX2 * 3, m2.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_194.png'));

  await sharp(img2)
    .extract({ left: midX2, top: 0, width: m2.width - midX2, height: m2.height })
    .resize((m2.width - midX2) * 3, m2.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_195.png'));
  console.log('Saved page_194.png and page_195.png');

  // 3. Pages 198 & 199 from media_1793452226900_96046d93.png
  const img3 = basePath + 'media_1793452226900_96046d93.png';
  const m3 = await sharp(img3).metadata();
  const midX3 = Math.floor(m3.width * 0.495);

  await sharp(img3)
    .extract({ left: 0, top: 0, width: midX3, height: m3.height })
    .resize(midX3 * 3, m3.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_198.png'));

  await sharp(img3)
    .extract({ left: midX3, top: 0, width: m3.width - midX3, height: m3.height })
    .resize((m3.width - midX3) * 3, m3.height * 3, { kernel: 'lanczos3' })
    .toFile(path.join(outDir, 'page_199.png'));
  console.log('Saved page_198.png and page_199.png');
}

splitSheets().catch(console.error);

