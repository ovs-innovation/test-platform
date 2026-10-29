import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDirs = [
  '../frontend/public/uploads/oscillations',
  'uploads/oscillations'
];

for (const d of outDirs) {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
}

async function crop(srcFile, rect, outName) {
  const meta = await sharp(srcFile).metadata();
  const left = Math.max(0, Math.min(rect.left, meta.width - 1));
  const top = Math.max(0, Math.min(rect.top, meta.height - 1));
  const width = Math.min(rect.width, meta.width - left);
  const height = Math.min(rect.height, meta.height - top);

  const buf = await sharp(srcFile)
    .extract({ left, top, width, height })
    .png()
    .toBuffer();

  for (const d of outDirs) {
    fs.writeFileSync(path.join(d, outName), buf);
  }
  console.log(`Saved ${outName} (${width}x${height})`);
}

async function main() {
  // Page 258: p258_261_tl.png (width: 233, height: 333)
  // Q94 diagram (left col): y ~ 110-140, x ~ 10-110
  await crop('scripts/new_slices/p258_261_tl.png', { left: 10, top: 110, width: 100, height: 30 }, 'osc_q94.png');
  // Q96 diagram (right col): y ~ 20-55, x ~ 130-220
  await crop('scripts/new_slices/p258_261_tl.png', { left: 125, top: 18, width: 95, height: 42 }, 'osc_q96.png');
  // Q99 diagram (right col): y ~ 175-235, x ~ 118-228
  await crop('scripts/new_slices/p258_261_tl.png', { left: 118, top: 175, width: 112, height: 60 }, 'osc_q99.png');

  // Page 259: p258_261_tr.png (width: 234, height: 333)
  // Q106 diagram (right col): y ~ 65-115, x ~ 135-215
  await crop('scripts/new_slices/p258_261_tr.png', { left: 135, top: 60, width: 85, height: 55 }, 'osc_q106.png');
  // Q108 diagram (right col): y ~ 170-225, x ~ 130-225
  await crop('scripts/new_slices/p258_261_tr.png', { left: 130, top: 170, width: 98, height: 55 }, 'osc_q108.png');

  // Page 260: p258_261_bl.png (width: 233, height: 334)
  // Q109 diagram (left col): y ~ 45-90, x ~ 30-100
  await crop('scripts/new_slices/p258_261_bl.png', { left: 35, top: 45, width: 65, height: 45 }, 'osc_q109.png');
  // Q110 diagram (left col): y ~ 180-230, x ~ 25-105
  await crop('scripts/new_slices/p258_261_bl.png', { left: 25, top: 180, width: 80, height: 50 }, 'osc_q110.png');
  // Q111 diagram (right col top): y ~ 15-90, x ~ 140-195
  await crop('scripts/new_slices/p258_261_bl.png', { left: 140, top: 15, width: 55, height: 75 }, 'osc_q111.png');
  // Q112 diagram (right col mid): y ~ 135-165, x ~ 125-215
  await crop('scripts/new_slices/p258_261_bl.png', { left: 125, top: 135, width: 90, height: 32 }, 'osc_q112.png');

  // Page 261: p258_261_br.png (width: 234, height: 334)
  // Q116 diagram (left col): y ~ 85-145, x ~ 30-110
  await crop('scripts/new_slices/p258_261_br.png', { left: 30, top: 85, width: 80, height: 60 }, 'osc_q116.png');
  // Q118 diagram (right col): y ~ 130-165, x ~ 140-210
  await crop('scripts/new_slices/p258_261_br.png', { left: 140, top: 130, width: 75, height: 35 }, 'osc_q118.png');
  // Q119 diagram (right col): y ~ 230-280, x ~ 130-220
  await crop('scripts/new_slices/p258_261_br.png', { left: 130, top: 230, width: 90, height: 50 }, 'osc_q119.png');

  // Page 264: p264_265_left.png (width: 233, height: 327)
  // Q135 diagram (left col): y ~ 85-130, x ~ 25-115
  await crop('scripts/new_slices/p264_265_left.png', { left: 25, top: 85, width: 90, height: 45 }, 'osc_q135.png');
  // Q136 diagram (left col): y ~ 170-205, x ~ 25-115
  await crop('scripts/new_slices/p264_265_left.png', { left: 25, top: 170, width: 90, height: 35 }, 'osc_q136.png');
  // Q137 diagram (left col): y ~ 260-310, x ~ 25-115
  await crop('scripts/new_slices/p264_265_left.png', { left: 25, top: 260, width: 90, height: 50 }, 'osc_q137.png');
  // Q138 diagram (right col): y ~ 45-120, x ~ 145-200
  await crop('scripts/new_slices/p264_265_left.png', { left: 145, top: 45, width: 55, height: 75 }, 'osc_q138.png');

  // Page 265: p264_265_right.png (width: 234, height: 327)
  // Q141 diagram (left col): y ~ 65-115, x ~ 35-100
  await crop('scripts/new_slices/p264_265_right.png', { left: 35, top: 65, width: 65, height: 50 }, 'osc_q141.png');
  // Q144 diagram (left col): y ~ 265-310, x ~ 20-110
  await crop('scripts/new_slices/p264_265_right.png', { left: 20, top: 265, width: 90, height: 45 }, 'osc_q144.png');
  // Q145 diagram (right col): y ~ 65-130, x ~ 140-195
  await crop('scripts/new_slices/p264_265_right.png', { left: 140, top: 65, width: 55, height: 65 }, 'osc_q145.png');

  // Page 266: p266_267_left.png (width: 233, height: 330)
  // Q151 diagram (left col): y ~ 160-210, x ~ 30-105
  await crop('scripts/new_slices/p266_267_left.png', { left: 30, top: 160, width: 75, height: 50 }, 'osc_q151.png');
  // Q157 diagram (right col): y ~ 240-295, x ~ 135-220
  await crop('scripts/new_slices/p266_267_left.png', { left: 135, top: 240, width: 85, height: 55 }, 'osc_q157.png');

  // Page 267: p266_267_right.png (width: 234, height: 330)
  // Q159 diagram (left col): y ~ 80-160, x ~ 35-105
  await crop('scripts/new_slices/p266_267_right.png', { left: 35, top: 80, width: 70, height: 80 }, 'osc_q159.png');

  // Page 268: p268_271_tl.png (width: 231, height: 333)
  // Q171 diagram (left col): y ~ 215-295, x ~ 15-115
  await crop('scripts/new_slices/p268_271_tl.png', { left: 15, top: 215, width: 100, height: 80 }, 'osc_q171.png');

  // Page 270: p268_271_bl.png (width: 231, height: 333)
  // Q193 diagram (right col): y ~ 20-60, x ~ 140-205
  await crop('scripts/new_slices/p268_271_bl.png', { left: 140, top: 20, width: 65, height: 40 }, 'osc_q193.png');

  console.log('All crops completed successfully!');
}

main().catch(console.error);
