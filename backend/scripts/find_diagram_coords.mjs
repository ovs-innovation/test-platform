import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('uploads/bonding');
const outDir = path.resolve(baseDir, 'diagrams');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Let's inspect pages where diagrams are located.
// Page width is 1400. In two-column layout:
// col1: left: 40, width: 640
// col2: left: 700, width: 660

// Diagram Q7: page_01.png, top-right (col2). Q7: "The structure of PCl3F2 is"
// Options (1), (2), (3), (4) with 4 TBP Lewis structures.
// Let's test crop for Q7
async function testCrops() {
  const p1Meta = await sharp(path.join(baseDir, 'pages/page_01.png')).metadata();
  console.log('page_01:', p1Meta.width, p1Meta.height);

  // Let's crop candidate region for Q7
  // On page_01, header is at top, Q7 is at top of col2
  await sharp(path.join(baseDir, 'pages/page_01.png'))
    .extract({ left: 700, top: 180, width: 660, height: 480 })
    .toFile(path.join(outDir, 'test_q7.png'));

  // Q47: page_37.png, col2 near bottom
  const p37Meta = await sharp(path.join(baseDir, 'pages/page_37.png')).metadata();
  console.log('page_37:', p37Meta.width, p37Meta.height);
  await sharp(path.join(baseDir, 'pages/page_37.png'))
    .extract({ left: 700, top: 1200, width: 660, height: 650 })
    .toFile(path.join(outDir, 'test_q47.png'));

  // Q86: page_40.png, col2
  const p40Meta = await sharp(path.join(baseDir, 'pages/page_40.png')).metadata();
  console.log('page_40:', p40Meta.width, p40Meta.height);
  await sharp(path.join(baseDir, 'pages/page_40.png'))
    .extract({ left: 700, top: 400, width: 660, height: 600 })
    .toFile(path.join(outDir, 'test_q86.png'));

  // Q98 & Q100: page_41.png
  const p41Meta = await sharp(path.join(baseDir, 'pages/page_41.png')).metadata();
  console.log('page_41:', p41Meta.width, p41Meta.height);
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 40, top: 600, width: 650, height: 700 })
    .toFile(path.join(outDir, 'test_q98_100_col1.png'));
  await sharp(path.join(baseDir, 'pages/page_41.png'))
    .extract({ left: 700, top: 150, width: 660, height: 500 })
    .toFile(path.join(outDir, 'test_q100_col2.png'));

  // Q115: page_42.png, col2
  const p42Meta = await sharp(path.join(baseDir, 'pages/page_42.png')).metadata();
  console.log('page_42:', p42Meta.width, p42Meta.height);
  await sharp(path.join(baseDir, 'pages/page_42.png'))
    .extract({ left: 700, top: 600, width: 660, height: 600 })
    .toFile(path.join(outDir, 'test_q115.png'));

  // Q120: page_43.png, col1
  const p43Meta = await sharp(path.join(baseDir, 'pages/page_43.png')).metadata();
  console.log('page_43:', p43Meta.width, p43Meta.height);
  await sharp(path.join(baseDir, 'pages/page_43.png'))
    .extract({ left: 40, top: 150, width: 650, height: 500 })
    .toFile(path.join(outDir, 'test_q120.png'));

  // Q278: page_52.png, col2
  const p52Meta = await sharp(path.join(baseDir, 'pages/page_52.png')).metadata();
  console.log('page_52:', p52Meta.width, p52Meta.height);
  await sharp(path.join(baseDir, 'pages/page_52.png'))
    .extract({ left: 700, top: 1100, width: 660, height: 600 })
    .toFile(path.join(outDir, 'test_q278.png'));

  console.log('Test crops done!');
}

testCrops().catch(console.error);

