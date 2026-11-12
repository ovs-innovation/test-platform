import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = './backend/scripts/nitrogen_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scale = 2.0;

async function crop(pageNum, x, y, w, h, fileName) {
  const pagePath = `./backend/scripts/nitrogen_pages/page_${pageNum}.png`;
  const img = await loadImage(pagePath);

  const sx = Math.max(0, Math.round(x * scale));
  const sy = Math.max(0, Math.round(y * scale));
  const sw = Math.min(img.width - sx, Math.round(w * scale));
  const sh = Math.min(img.height - sy, Math.round(h * scale));

  const canvas = createCanvas(sw, sh);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  const outFile = path.join(outDir, fileName);
  fs.writeFileSync(outFile, canvas.toBuffer('image/png'));
  console.log(`Cropped: ${fileName} (${sw}x${sh})`);
}

async function main() {
  // Q1: Grignard reaction with aniline
  await crop(2, 34, 140, 480, 520, 'q1_diag.png');

  // Q3: Reactions A, B, C, D to aniline
  await crop(3, 34, 380, 480, 240, 'q3_diag.png');

  // Q5: Reactions
  await crop(4, 34, 110, 480, 100, 'q5_diag.png');

  // Q6: Reaction sequence
  await crop(4, 34, 330, 480, 80, 'q6_diag.png');

  // Q7: Reaction sequence
  await crop(4, 34, 530, 480, 70, 'q7_diag.png');

  // Q10: Reaction sequence and options
  await crop(6, 34, 100, 480, 560, 'q10_diag.png');

  // Q11: Reaction sequence and options
  await crop(7, 34, 100, 480, 440, 'q11_diag.png');

  // Q14: Reaction sequence
  await crop(8, 34, 350, 480, 75, 'q14_diag.png');

  // Q16: Reaction and options
  await crop(9, 34, 100, 480, 560, 'q16_diag.png');

  // Q18: Reaction and options
  await crop(11, 34, 100, 480, 560, 'q18_diag.png');

  // Q21: Reaction and options
  await crop(13, 34, 100, 480, 560, 'q21_diag.png');

  // Q22: Hinsberg amine options
  await crop(14, 34, 130, 480, 480, 'q22_diag.png');

  // Q23: Tribromoaniline deamination
  await crop(15, 34, 130, 480, 230, 'q23_diag.png');

  // Q25: Amine options
  await crop(16, 34, 130, 480, 480, 'q25_diag.png');

  // Q26: Amine options
  await crop(17, 34, 130, 480, 450, 'q26_diag.png');

  // Q28: Phthalic acid reaction and options
  await crop(18, 34, 100, 480, 560, 'q28_diag.png');

  // Q30: Aniline, nitroaniline, toluidine
  await crop(19, 34, 280, 480, 200, 'q30_diag.png');

  // Q32: Nitro-compounds options
  await crop(20, 34, 130, 480, 480, 'q32_diag.png');

  // Q33: Compound A options
  await crop(21, 34, 160, 480, 480, 'q33_diag.png');

  // Q36: Schotten-Baumann reaction
  await crop(22, 34, 430, 480, 100, 'q36_diag.png');

  // Q40: Coupling reaction and options
  await crop(24, 34, 120, 480, 560, 'q40_diag.png');

  // Q43: Reaction (A)
  await crop(25, 34, 380, 480, 60, 'q43_diag.png');

  // Q45: Reaction
  await crop(26, 34, 130, 480, 220, 'q45_diag.png');

  // Q46: Structure (A)
  await crop(26, 34, 530, 480, 160, 'q46_diag.png');

  // Q47: Most basic compounds options
  await crop(27, 34, 130, 480, 500, 'q47_diag.png');

  // Q48: m-bromobenzoic acid reaction and options
  await crop(28, 34, 130, 480, 540, 'q48_diag.png');

  // Q49: Nitrobenzene reduction and options
  await crop(29, 34, 130, 480, 540, 'q49_diag.png');

  // Q52: Reaction and options
  await crop(31, 34, 130, 480, 540, 'q52_diag.png');

  // Q54: Reaction and options
  await crop(32, 34, 230, 480, 480, 'q54_diag.png');

  // Q55: Reaction and options
  await crop(33, 34, 130, 480, 540, 'q55_diag.png');

  // Q59: Reaction
  await crop(34, 34, 450, 480, 90, 'q59_diag.png');

  // Q60: Reaction and options
  await crop(35, 34, 130, 480, 540, 'q60_diag.png');

  // Q61: Reaction and options
  await crop(36, 34, 130, 480, 540, 'q61_diag.png');

  // Q62: Reaction and options
  await crop(37, 34, 120, 480, 540, 'q62_diag.png');

  // Q63: Intermediates
  await crop(38, 34, 130, 480, 80, 'q63_diag.png');

  // Q64: Reaction and options
  await crop(39, 34, 110, 480, 450, 'q64_diag.png');

  // Q69: Options
  await crop(40, 34, 400, 480, 320, 'q69_diag.png');

  console.log('Finished cropping all nitrogen diagrams!');
}

main().catch(console.error);

