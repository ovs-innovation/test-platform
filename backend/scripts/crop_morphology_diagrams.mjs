import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = './backend/scripts/morphology_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// All coordinates are in unscaled points (or scale 2.0 pixels)
// Our rendered images are already 2x (width ~ 1190, height ~ 1684)
// So we can crop directly from the 2x images using pixel coordinates!

async function crop(pageNum, x, y, w, h, fileName) {
  const pagePath = `./backend/scripts/morphology_pages/page_${pageNum}.png`;
  if (!fs.existsSync(pagePath)) {
    console.warn(`Page file not found: ${pagePath}`);
    return;
  }
  const img = await loadImage(pagePath);

  const sx = Math.max(0, Math.round(x));
  const sy = Math.max(0, Math.round(y));
  const sw = Math.min(img.width - sx, Math.round(w));
  const sh = Math.min(img.height - sy, Math.round(h));

  const canvas = createCanvas(sw, sh);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  const outFile = path.join(outDir, fileName);
  fs.writeFileSync(outFile, canvas.toBuffer('image/png'));
  console.log(`Cropped: ${fileName} (${sw}x${sh}) from page_${pageNum}.png`);
}

async function main() {
  // Page 3: Q5 (y: 160 to 1120, x: 50 to 1130)
  await crop(3, 50, 160, 1080, 970, 'q5_diag.png');

  // Page 6: Q15 (y: 330 to 810) - Seed diagram
  await crop(6, 50, 330, 1080, 480, 'q15_diag.png');

  // Page 6: Q16 (y: 870 to 1350) - Flower ovary position figures (a) and (b)
  await crop(6, 50, 870, 1080, 480, 'q16_diag.png');

  // Page 9: Q26 (y: 670 to 1120) - Floral diagram of family
  await crop(9, 50, 670, 1080, 450, 'q26_diag.png');

  // Page 11: Q31 (y: 160 to 630) - Match Column-I with Column-II
  await crop(11, 50, 160, 1080, 470, 'q31_diag.png');

  // Page 12: Q32 (y: 160 to 1120) - Liliaceae floral formula options
  await crop(12, 50, 160, 1080, 960, 'q32_diag.png');

  // Page 17: Q62 (y: 160 to 480) - Floral formula in question
  await crop(17, 50, 160, 1080, 320, 'q62_diag.png');

  // Page 21: Q86 (y: 160 to 1150) - Dianthus placentation options
  await crop(21, 50, 160, 1080, 990, 'q86_diag.png');

  // Page 23: Q91 (y: 160 to 1150) - Chilli floral formula options
  await crop(23, 50, 160, 1080, 990, 'q91_diag.png');

  // Page 24: Q95 (y: 340 to 1250) - Soyabean floral formula options
  await crop(24, 50, 340, 1080, 910, 'q95_diag.png');

  // Page 25: Q96 (y: 160 to 1000) - Statements with floral formulas
  await crop(25, 50, 160, 1080, 840, 'q96_diag.png');

  // Page 26: Q97 (y: 160 to 1070) - Cotton petal aestivation options
  await crop(26, 50, 160, 1080, 910, 'q97_diag.png');

  // Page 28: Q107 (y: 160 to 510) - Floral formula question
  await crop(28, 50, 160, 1080, 350, 'q107_diag.png');

  // Page 34: Q146 (y: 160 to 1150) - Tomato/tobacco floral formula options
  await crop(34, 50, 160, 1080, 990, 'q146_diag.png');

  // Page 35: Q153 (y: 850 to 1110) - Floral formula question
  await crop(35, 50, 850, 1080, 260, 'q153_diag.png');

  // Page 37: Q159 (y: 160 to 1150) - Floral formula options
  await crop(37, 50, 160, 1080, 990, 'q159_diag.png');
}

main().catch(console.error);
