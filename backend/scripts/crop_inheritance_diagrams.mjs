import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = './backend/scripts/inheritance_rendered_pages';
const outputDir = './backend/scripts/inheritance_diagrams';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// All coordinates in canvas pixel space (width 1190, height 1684)
const crops = [
  {
    qNum: 10,
    page: 4,
    rect: { left: 60, top: 685, width: 550, height: 380 }
  },
  {
    qNum: 34,
    page: 11,
    rect: { left: 60, top: 435, width: 900, height: 900 }
  },
  {
    qNum: 40,
    page: 13,
    rect: { left: 60, top: 225, width: 950, height: 680 }
  },
  {
    qNum: 86,
    page: 22,
    rect: { left: 60, top: 855, width: 950, height: 330 }
  },
  {
    qNum: 106,
    page: 26,
    rect: { left: 60, top: 575, width: 650, height: 300 }
  },
  {
    qNum: 117,
    page: 28,
    rect: { left: 60, top: 865, width: 950, height: 285 }
  },
  {
    qNum: 121,
    page: 29,
    rect: { left: 60, top: 750, width: 950, height: 465 }
  },
  {
    qNum: 129,
    page: 31,
    rect: { left: 60, top: 510, width: 950, height: 350 }
  }
];

async function main() {
  for (const c of crops) {
    const srcPath = path.join(inputDir, `page_${c.page}.png`);
    const outPath = path.join(outputDir, `q_${c.qNum}.png`);

    await sharp(srcPath)
      .extract(c.rect)
      .trim()
      .toFile(outPath);

    const meta = await sharp(outPath).metadata();
    console.log(`Cropped Q${c.qNum} (Page ${c.page}) -> ${outPath} (${meta.width}x${meta.height})`);
  }
}

main().catch(console.error);
