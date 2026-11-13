import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = './backend/scripts/aldehydes_diagrams';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const scale = 2.0;

async function crop(pageNum, x, y, w, h, fileName) {
  const pagePath = `./backend/scripts/aldehydes_pages/page_${pageNum}.png`;
  if (!fs.existsSync(pagePath)) {
    console.warn(`Page file not found: ${pagePath}`);
    return;
  }
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
  await crop(2, 34, 150, 480, 160, 'q1_diag.png');
  await crop(3, 34, 110, 480, 560, 'q2_diag.png');
  await crop(4, 34, 120, 480, 100, 'q3_diag.png');
  await crop(5, 34, 160, 480, 430, 'q4_diag.png');
  await crop(6, 34, 130, 480, 100, 'q6_diag.png');
  await crop(7, 34, 110, 480, 560, 'q8_diag.png');
  await crop(8, 34, 150, 480, 140, 'q9_diag.png');
  await crop(8, 34, 410, 480, 70, 'q10_diag.png');
  await crop(9, 34, 120, 480, 460, 'q12_diag.png');
  await crop(10, 34, 120, 480, 560, 'q13_diag.png');
  await crop(11, 34, 260, 480, 130, 'q15_diag.png');
  await crop(11, 34, 470, 480, 120, 'q16_diag.png');
  await crop(12, 34, 120, 480, 560, 'q18_diag.png');
  await crop(13, 34, 120, 480, 560, 'q19_diag.png');
  await crop(14, 34, 120, 480, 560, 'q20_diag.png');
  await crop(15, 34, 120, 480, 560, 'q21_diag.png');
  await crop(16, 34, 120, 480, 560, 'q22_diag.png');
  await crop(17, 34, 130, 480, 160, 'q23_diag.png');
  await crop(17, 34, 690, 480, 85, 'q24_diag.png');
  await crop(18, 34, 120, 480, 560, 'q25_diag.png');
  await crop(20, 34, 130, 480, 530, 'q27_diag.png');
  await crop(22, 34, 140, 480, 460, 'q31_diag.png');
  await crop(22, 34, 750, 480, 80, 'q32_diag.png');
  await crop(23, 34, 110, 480, 60, 'q33_diag.png');
  await crop(23, 34, 290, 480, 230, 'q34_diag.png');
  await crop(24, 34, 150, 480, 520, 'q35_diag.png');
  await crop(25, 34, 140, 480, 530, 'q36_diag.png');
  await crop(26, 34, 140, 480, 140, 'q37_diag.png');
  await crop(27, 34, 150, 480, 530, 'q38_diag.png');
  await crop(28, 34, 150, 480, 530, 'q39_diag.png');
  await crop(29, 34, 360, 480, 400, 'q42_diag.png');
  await crop(30, 34, 310, 480, 440, 'q44_diag.png');
  await crop(31, 34, 130, 480, 130, 'q45_diag.png');
  await crop(31, 34, 530, 480, 120, 'q46_diag.png');
  await crop(32, 34, 140, 480, 540, 'q47_diag.png');
  await crop(34, 34, 140, 480, 530, 'q52_diag.png');
  await crop(35, 34, 140, 480, 170, 'q53_diag.png');
  await crop(36, 34, 140, 480, 520, 'q55_diag.png');
  await crop(37, 34, 130, 480, 490, 'q56_diag.png');
  await crop(38, 34, 140, 480, 220, 'q57_diag.png');
  await crop(38, 34, 690, 480, 110, 'q59_diag.png');
  await crop(40, 34, 160, 480, 520, 'q62_diag.png');
  await crop(41, 34, 170, 480, 510, 'q63_diag.png');
  await crop(42, 34, 450, 480, 100, 'q65_diag.png');
  await crop(42, 34, 740, 480, 80, 'q66_diag.png');
  await crop(43, 34, 150, 480, 390, 'q67_diag.png');
  await crop(44, 34, 140, 480, 510, 'q69_diag.png');
  await crop(45, 34, 140, 480, 530, 'q70_diag.png');
  await crop(46, 34, 360, 480, 400, 'q73_diag.png');
  await crop(47, 34, 140, 480, 270, 'q74_diag.png');
  await crop(48, 34, 160, 480, 520, 'q77_diag.png');
  await crop(49, 34, 370, 480, 110, 'q80_diag.png');
  await crop(49, 34, 580, 480, 200, 'q81_diag.png');
  await crop(50, 34, 440, 480, 100, 'q84_diag.png');
  await crop(50, 34, 680, 480, 80, 'q85_diag.png');
  await crop(52, 34, 160, 480, 510, 'q87_diag.png');
  await crop(53, 34, 150, 480, 520, 'q88_diag.png');
  await crop(55, 34, 140, 480, 520, 'q92_diag.png');
  await crop(56, 34, 140, 480, 520, 'q93_diag.png');
  await crop(57, 34, 140, 480, 300, 'q94_diag.png');
  await crop(58, 34, 120, 480, 550, 'q95_diag.png');
  await crop(59, 34, 120, 480, 90, 'q96_diag.png');
  await crop(59, 34, 380, 480, 110, 'q97_diag.png');
  await crop(60, 34, 130, 480, 300, 'q100_diag.png');
  await crop(61, 34, 140, 480, 440, 'q104_diag.png');
  await crop(64, 34, 130, 480, 520, 'q118_diag.png');
  await crop(66, 34, 550, 480, 50, 'q131_diag.png');
  await crop(67, 34, 120, 480, 200, 'q132_diag.png');
  await crop(67, 34, 470, 480, 130, 'q133_diag.png');

  console.log('All diagrams cropped successfully!');
}

main().catch(console.error);

