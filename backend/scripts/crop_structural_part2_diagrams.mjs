import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'backend/uploads/structural_organisation/diagrams2';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pagesDir = 'backend/uploads/structural_organisation/pages_hires2';

async function cropDiagrams() {
  // 1. Q245 (page_194.png): left column around 45% - 58% y
  const m194 = await sharp(path.join(pagesDir, 'page_194.png')).metadata();
  await sharp(path.join(pagesDir, 'page_194.png'))
    .extract({
      left: Math.floor(m194.width * 0.16),
      top: Math.floor(m194.height * 0.44),
      width: Math.floor(m194.width * 0.32),
      height: Math.floor(m194.height * 0.15)
    })
    .toFile(path.join(outDir, 'zoo_q245_gonapophysis.png'));
  console.log('Saved zoo_q245_gonapophysis.png');

  // 2. Q257 (page_195.png): right column around 30% - 60% y
  const m195 = await sharp(path.join(pagesDir, 'page_195.png')).metadata();
  await sharp(path.join(pagesDir, 'page_195.png'))
    .extract({
      left: Math.floor(m195.width * 0.58),
      top: Math.floor(m195.height * 0.31),
      width: Math.floor(m195.width * 0.38),
      height: Math.floor(m195.height * 0.25)
    })
    .toFile(path.join(outDir, 'zoo_q257_circulatory.png'));
  console.log('Saved zoo_q257_circulatory.png');

  // 3. Q272 (page_198.png): left column around 21% - 44% y
  const m198 = await sharp(path.join(pagesDir, 'page_198.png')).metadata();
  await sharp(path.join(pagesDir, 'page_198.png'))
    .extract({
      left: Math.floor(m198.width * 0.15),
      top: Math.floor(m198.height * 0.21),
      width: Math.floor(m198.width * 0.34),
      height: Math.floor(m198.height * 0.23)
    })
    .toFile(path.join(outDir, 'zoo_q272_mouthparts.png'));
  console.log('Saved zoo_q272_mouthparts.png');

  // 4. Q276 (page_198.png): right column around 5% - 21% y
  await sharp(path.join(pagesDir, 'page_198.png'))
    .extract({
      left: Math.floor(m198.width * 0.65),
      top: Math.floor(m198.height * 0.05),
      width: Math.floor(m198.width * 0.32),
      height: Math.floor(m198.height * 0.16)
    })
    .toFile(path.join(outDir, 'zoo_q276_repro.png'));
  console.log('Saved zoo_q276_repro.png');
}

cropDiagrams().catch(console.error);
