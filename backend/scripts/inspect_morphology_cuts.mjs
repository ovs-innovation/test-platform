import sharp from 'sharp';
import fs from 'fs';

const pageDir = 'uploads/morphology/pages';
const colDir = 'uploads/morphology/columns';
if (!fs.existsSync(colDir)) fs.mkdirSync(colDir, { recursive: true });

async function splitPage(pageName) {
  const filePath = `${pageDir}/${pageName}.png`;
  const m = await sharp(filePath).metadata();
  const midX = Math.floor(m.width / 2);

  await sharp(filePath).extract({ left: 0, top: 0, width: midX, height: m.height }).toFile(`${colDir}/${pageName}_col1.png`);
  await sharp(filePath).extract({ left: midX, top: 0, width: m.width - midX, height: m.height }).toFile(`${colDir}/${pageName}_col2.png`);
  console.log(`Split ${pageName} into col1 and col2`);
}

async function run() {
  const pages = ['page_01', 'page_84', 'page_85', 'page_86', 'page_87', 'page_90', 'page_91', 'page_104', 'page_105_ar'];
  for (const p of pages) {
    await splitPage(p);
  }
}

run().catch(console.error);
