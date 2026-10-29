import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDirs = [
  '../frontend/public/uploads/oscillations',
  'uploads/oscillations'
];

async function crop(src, leftRatio, topRatio, widthRatio, heightRatio, outName) {
  const meta = await sharp(src).metadata();
  const left = Math.round(meta.width * leftRatio);
  const top = Math.round(meta.height * topRatio);
  const width = Math.round(meta.width * widthRatio);
  const height = Math.round(meta.height * heightRatio);

  const buf = await sharp(src)
    .extract({ left, top, width, height })
    .png()
    .toBuffer();

  for (const d of outDirs) {
    fs.writeFileSync(path.join(d, outName), buf);
  }
}

async function main() {
  // Page 258:
  await crop('scripts/new_slices/p258_261_tl.png', 0.08, 0.64, 0.40, 0.08, 'osc_q94.png');
  await crop('scripts/new_slices/p258_261_tl.png', 0.55, 0.08, 0.40, 0.10, 'osc_q96.png');
  await crop('scripts/new_slices/p258_261_tl.png', 0.52, 0.71, 0.46, 0.20, 'osc_q99.png');

  // Page 259:
  await crop('scripts/new_slices/p258_261_tr.png', 0.62, 0.15, 0.32, 0.15, 'osc_q106.png');
  await crop('scripts/new_slices/p258_261_tr.png', 0.54, 0.69, 0.44, 0.16, 'osc_q108.png');

  // Page 260:
  await crop('scripts/new_slices/p258_261_bl.png', 0.18, 0.14, 0.25, 0.12, 'osc_q109.png');
  await crop('scripts/new_slices/p258_261_bl.png', 0.12, 0.55, 0.35, 0.14, 'osc_q110.png');
  await crop('scripts/new_slices/p258_261_bl.png', 0.65, 0.04, 0.23, 0.22, 'osc_q111.png');
  await crop('scripts/new_slices/p258_261_bl.png', 0.55, 0.41, 0.38, 0.09, 'osc_q112.png');

  // Page 261:
  await crop('scripts/new_slices/p258_261_br.png', 0.18, 0.27, 0.28, 0.16, 'osc_q116.png');
  await crop('scripts/new_slices/p258_261_br.png', 0.60, 0.39, 0.32, 0.10, 'osc_q118.png');
  await crop('scripts/new_slices/p258_261_br.png', 0.55, 0.70, 0.40, 0.14, 'osc_q119.png');

  // Page 264:
  await crop('scripts/new_slices/p264_265_left.png', 0.10, 0.28, 0.40, 0.12, 'osc_q135.png');
  await crop('scripts/new_slices/p264_265_left.png', 0.12, 0.54, 0.38, 0.09, 'osc_q136.png');
  await crop('scripts/new_slices/p264_265_left.png', 0.10, 0.81, 0.40, 0.14, 'osc_q137.png');
  await crop('scripts/new_slices/p264_265_left.png', 0.65, 0.14, 0.22, 0.21, 'osc_q138.png');

  // Page 265:
  await crop('scripts/new_slices/p264_265_right.png', 0.20, 0.20, 0.25, 0.15, 'osc_q141.png');
  await crop('scripts/new_slices/p264_265_right.png', 0.12, 0.83, 0.38, 0.12, 'osc_q144.png');
  await crop('scripts/new_slices/p264_265_right.png', 0.62, 0.21, 0.24, 0.18, 'osc_q145.png');

  // Page 266:
  await crop('scripts/new_slices/p266_267_left.png', 0.15, 0.50, 0.32, 0.15, 'osc_q151.png');
  await crop('scripts/new_slices/p266_267_left.png', 0.58, 0.74, 0.38, 0.16, 'osc_q157.png');

  // Page 267:
  await crop('scripts/new_slices/p266_267_right.png', 0.17, 0.25, 0.26, 0.22, 'osc_q159.png');

  // Page 268:
  await crop('scripts/new_slices/p268_271_tl.png', 0.08, 0.67, 0.40, 0.22, 'osc_q171.png');

  // Page 270:
  await crop('scripts/new_slices/p268_271_bl.png', 0.60, 0.06, 0.28, 0.12, 'osc_q193.png');

  console.log('Recropped all 24 diagrams cleanly!');
}

main().catch(console.error);
