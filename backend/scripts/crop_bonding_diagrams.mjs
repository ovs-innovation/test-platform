import sharp from 'sharp';
import path from 'path';

const baseDir = path.resolve('uploads/bonding');
const outDir = path.resolve(baseDir, 'diagrams');

async function cropRefined() {
  // Q7: page_01
  await sharp(path.join(baseDir, 'pages/page_01.png'))
    .extract({ left: 710, top: 250, width: 650, height: 570 })
    .toFile(path.join(outDir, 'crop_q7.png'));

  // Q47: page_37
  await sharp(path.join(baseDir, 'pages/page_37.png'))
    .extract({ left: 710, top: 1510, width: 640, height: 450 })
    .toFile(path.join(outDir, 'crop_q47.png'));

  // Q86: page_40
  await sharp(path.join(baseDir, 'pages/page_40.png'))
    .extract({ left: 700, top: 130, width: 650, height: 320 })
    .toFile(path.join(outDir, 'crop_q86.png'));

  // Q98: page_41
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 50, top: 830, width: 550, height: 180 })
    .toFile(path.join(outDir, 'crop_q98.png'));

  // Q100: page_41 col1 bottom & col2 top
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 40, top: 1720, width: 650, height: 200 })
    .toFile(path.join(outDir, 'crop_q100_p1.png'));
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 700, top: 130, width: 650, height: 350 })
    .toFile(path.join(outDir, 'crop_q100_p2.png'));

  // Q115: page_42 col2
  await sharp(path.join(baseDir, 'pages/page_42.png'))
    .extract({ left: 700, top: 220, width: 650, height: 420 })
    .toFile(path.join(outDir, 'crop_q115.png'));

  // Q120: page_43 col1
  await sharp(path.join(baseDir, 'pages/page_43.png'))
    .extract({ left: 40, top: 130, width: 650, height: 260 })
    .toFile(path.join(outDir, 'crop_q120.png'));

  // Q278: page_52 col2
  await sharp(path.join(baseDir, 'pages/page_52.png'))
    .extract({ left: 800, top: 1240, width: 360, height: 270 })
    .toFile(path.join(outDir, 'crop_q278.png'));

  console.log('Refined crops generated!');
}

cropRefined().catch(console.error);

