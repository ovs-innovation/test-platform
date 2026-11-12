import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = './backend/scripts/alcohols_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scale = 2.0;

async function crop(pageNum, x, y, w, h, fileName) {
  const pagePath = `./backend/scripts/alcohols_pages/page_${pageNum}.png`;
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
  // Q2: Metamers options
  await crop(2, 34, 350, 480, 200, 'q2_diag.png');

  // Q3: Match List I with List II
  await crop(3, 34, 100, 480, 205, 'q3_diag.png');

  // Q5: Reaction sequence
  await crop(3, 34, 480, 480, 75, 'q5_diag.png');

  // Q8: Reaction sequence and options
  await crop(5, 34, 87, 480, 450, 'q8_diag.png');

  // Q9: Reaction and options
  await crop(6, 34, 87, 480, 450, 'q9_diag.png');

  // Q10: Reaction and options
  await crop(7, 34, 87, 480, 420, 'q10_diag.png');

  // Q11: Dehydration options
  await crop(8, 34, 87, 480, 320, 'q11_diag.png');

  // Q12: Match reagents
  await crop(9, 34, 87, 480, 250, 'q12_diag.png');

  // Q13: Reaction sequences
  await crop(9, 34, 341, 480, 360, 'q13_diag.png');

  // Q16: Substituted phenols options
  await crop(11, 34, 87, 480, 490, 'q16_diag.png');

  // Q17: Reaction sequence
  await crop(11, 34, 586, 480, 180, 'q17_diag.png');

  // Q18: Anisole options
  await crop(12, 34, 87, 480, 420, 'q18_diag.png');

  // Q20: Reaction sequence and options
  await crop(13, 34, 87, 480, 300, 'q20_diag.png');

  // Q21: Cumene intermediate
  await crop(14, 34, 87, 480, 500, 'q21_diag.png');

  // Q23: Reaction
  await crop(15, 34, 202, 480, 120, 'q23_diag.png');

  // Q25: Sequence P, Q, R
  await crop(17, 34, 87, 480, 540, 'q25_diag.png');

  // Q27: Acidic phenols options
  await crop(18, 34, 87, 480, 380, 'q27_diag.png');

  // Q28: Reaction diagram
  await crop(19, 34, 87, 480, 130, 'q28_diag.png');

  // Q31: Reaction diagram
  await crop(20, 34, 87, 480, 170, 'q31_diag.png');

  // Q35: Reaction scheme
  await crop(21, 34, 87, 480, 150, 'q35_diag.png');

  // Q36: Options ethers
  await crop(22, 34, 87, 480, 460, 'q36_diag.png');

  // Q38: Reaction sequence
  await crop(23, 34, 87, 480, 130, 'q38_diag.png');

  // Q39: Reaction sequence and options
  await crop(24, 34, 87, 480, 520, 'q39_diag.png');

  // Q42: Compounds (i) to (iv)
  await crop(25, 34, 479, 480, 240, 'q42_diag.png');

  // Q43: Match List I and II
  await crop(26, 34, 87, 480, 300, 'q43_diag.png');

  // Q45: Acidic nature options
  await crop(27, 34, 87, 480, 350, 'q45_diag.png');

  // Q46: Phenol reaction sequence
  await crop(27, 34, 586, 480, 150, 'q46_diag.png');

  // Q47: Periodic acid reaction
  await crop(28, 34, 87, 480, 300, 'q47_diag.png');

  // Q48: Reaction sequence
  await crop(28, 34, 406, 480, 180, 'q48_diag.png');

  // Q49: Ether cleavage
  await crop(29, 34, 87, 480, 480, 'q49_diag.png');

  // Q61: Reaction with oxirane
  await crop(33, 34, 87, 480, 180, 'q61_diag.png');

  // Q64: Options
  await crop(33, 34, 540, 480, 140, 'q64_diag.png');

  console.log('All crops completed successfully!');
}

main().catch(console.error);

