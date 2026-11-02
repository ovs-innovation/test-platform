import sharp from 'sharp';
import path from 'path';

const baseDir = path.resolve('uploads/bonding');
const outDir = path.resolve(baseDir, 'diagrams');

async function finalize() {
  // 1. Q7: 4 TBP structures of PCl3F2
  await sharp(path.join(baseDir, 'pages/page_01.png'))
    .extract({ left: 740, top: 290, width: 590, height: 490 })
    .toFile(path.join(outDir, 'q7_diagram.png'));

  // 2. Q47: Orbital combinations forming bonding molecular orbital
  await sharp(path.join(baseDir, 'pages/page_37.png'))
    .extract({ left: 740, top: 1540, width: 590, height: 350 })
    .toFile(path.join(outDir, 'q47_diagram.png'));

  // 3. Q86: Chlorobenzene isomers
  await sharp(path.join(baseDir, 'pages/page_40.png'))
    .extract({ left: 730, top: 130, width: 600, height: 310 })
    .toFile(path.join(outDir, 'q86_diagram.png'));

  // 4. Q98: Orbital overlaps (+ -)
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 50, top: 880, width: 540, height: 160 })
    .toFile(path.join(outDir, 'q98_diagram.png'));

  // 5. Q100: Chlorotoluene isomers (already nicely stitched into crop_q100.png)
  const p1 = await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 40, top: 1380, width: 620, height: 340 })
    .toBuffer();
  const p2 = await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 710, top: 50, width: 620, height: 300 })
    .toBuffer();
  await sharp({
    create: {
      width: 620,
      height: 640,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
  .composite([
    { input: p1, top: 0, left: 0 },
    { input: p2, top: 340, left: 0 }
  ])
  .toFile(path.join(outDir, 'q100_diagram.png'));

  // 6. Q115: Dibromobenzene isomers
  await sharp(path.join(baseDir, 'pages/page_42.png'))
    .extract({ left: 740, top: 180, width: 450, height: 440 })
    .toFile(path.join(outDir, 'q115_diagram.png'));

  // 7. Q120: Dichlorobenzene isomers
  await sharp(path.join(baseDir, 'pages/page_43.png'))
    .extract({ left: 50, top: 180, width: 620, height: 210 })
    .toFile(path.join(outDir, 'q120_diagram.png'));

  // 8. Q278: Orbital contour
  await sharp(path.join(baseDir, 'pages/page_52.png'))
    .extract({ left: 810, top: 1250, width: 330, height: 250 })
    .toFile(path.join(outDir, 'q278_diagram.png'));

  console.log('Final diagrams created successfully!');
}

finalize().catch(console.error);

