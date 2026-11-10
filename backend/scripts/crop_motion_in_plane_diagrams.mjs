import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = './backend/uploads/motion_in_plane';
const frontDir = './frontend/public/uploads/motion_in_plane';
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(frontDir, { recursive: true });

async function cropAll() {
  // Q4: Page 2. Projectile diagram with A, B, C, 60 deg
  await sharp('./backend/scripts/motion_in_plane_pages/page_2.png')
    .extract({ left: 40, top: 1140, width: 560, height: 260 })
    .toFile(`${outDir}/q4_diagram.png`);

  // Q15: Page 5. Vector triangle PQR
  await sharp('./backend/scripts/motion_in_plane_pages/page_5.png')
    .extract({ left: 60, top: 270, width: 340, height: 320 })
    .toFile(`${outDir}/q15_diagram.png`);

  // Q17: Page 6. Circle with radius R, 30 deg, a
  await sharp('./backend/scripts/motion_in_plane_pages/page_6.png')
    .extract({ left: 60, top: 245, width: 380, height: 430 })
    .toFile(`${outDir}/q17_diagram.png`);

  // Q27: Page 8. Trajectory A to B with X, Y
  await sharp('./backend/scripts/motion_in_plane_pages/page_8.png')
    .extract({ left: 60, top: 735, width: 440, height: 380 })
    .toFile(`${outDir}/q27_diagram.png`);

  // Q37: Page 10. Six vectors a, b, c, d, e, f
  await sharp('./backend/scripts/motion_in_plane_pages/page_10.png')
    .extract({ left: 50, top: 690, width: 540, height: 380 })
    .toFile(`${outDir}/q37_diagram.png`);

  // Q56: Page 14. Sliding rod AB on rails with alpha = 60 deg
  await sharp('./backend/scripts/motion_in_plane_pages/page_14.png')
    .extract({ left: 60, top: 245, width: 570, height: 345 })
    .toFile(`${outDir}/q56_diagram.png`);

  // Copy all to frontend
  for (const f of fs.readdirSync(outDir)) {
    fs.copyFileSync(path.join(outDir, f), path.join(frontDir, f));
  }

  console.log('Motion in plane diagrams cropped cleanly!');
}

cropAll().catch(console.error);
