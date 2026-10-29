import sharp from 'sharp';
import fs from 'fs';

const outDir = 'c:/Users/rs004/OneDrive/Desktop/test-platform/frontend/public/uploads/oscillations';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const crops = [
  { name: 'osc_q16.png', page: 'scripts/oscillations_pages/page_1_rot270.png', box: { left: 495, top: 335, width: 145, height: 42 } },
  { name: 'osc_q17.png', page: 'scripts/oscillations_pages/page_2_rot270.png', box: { left: 20, top: 82, width: 140, height: 60 } },
  { name: 'osc_q22.png', page: 'scripts/oscillations_pages/page_2_rot270.png', box: { left: 175, top: 45, width: 135, height: 68 } },
  { name: 'osc_q29.png', page: 'scripts/oscillations_pages/page_2_rot270.png', box: { left: 320, top: 260, width: 165, height: 100 } },
  { name: 'osc_q31.png', page: 'scripts/oscillations_pages/page_2_rot270.png', box: { left: 480, top: 40, width: 155, height: 100 } },
  { name: 'osc_q37.png', page: 'scripts/oscillations_pages/page_3_rot270.png', box: { left: 55, top: 120, width: 85, height: 50 } },
  { name: 'osc_q38.png', page: 'scripts/oscillations_pages/page_3_rot270.png', box: { left: 15, top: 220, width: 150, height: 195 } },
  { name: 'osc_q40.png', page: 'scripts/oscillations_pages/page_3_rot270.png', box: { left: 175, top: 145, width: 140, height: 65 } },
  { name: 'osc_q50.png', page: 'scripts/oscillations_pages/page_3_rot270.png', box: { left: 495, top: 45, width: 140, height: 60 } },
  { name: 'osc_q55.png', page: 'scripts/oscillations_pages/page_4_rot270.png', box: { left: 10, top: 45, width: 150, height: 85 } },
  { name: 'osc_q57.png', page: 'scripts/oscillations_pages/page_4_rot270.png', box: { left: 45, top: 215, width: 105, height: 60 } },
  { name: 'osc_q59.png', page: 'scripts/oscillations_pages/page_4_rot270.png', box: { left: 180, top: 38, width: 130, height: 42 } },
  { name: 'osc_q61.png', page: 'scripts/oscillations_pages/page_4_rot270.png', box: { left: 175, top: 240, width: 100, height: 170 } },
  { name: 'osc_q67.png', page: 'scripts/oscillations_pages/page_4_rot270.png', box: { left: 495, top: 45, width: 140, height: 68 } },
  { name: 'osc_q71.png', page: 'scripts/oscillations_pages/page_5_rot270.png', box: { left: 20, top: 48, width: 150, height: 135 } },
  { name: 'osc_q85.png', page: 'scripts/oscillations_pages/page_5_rot270.png', box: { left: 500, top: 45, width: 115, height: 75 } },
  { name: 'osc_q88.png', page: 'scripts/oscillations_pages/page_5_rot270.png', box: { left: 470, top: 282, width: 155, height: 50 } }
];

async function run() {
  for (const item of crops) {
    try {
      await sharp(item.page)
        .extract(item.box)
        .toFile(`${outDir}/${item.name}`);
      console.log(`Cropped ${item.name}`);
    } catch (err) {
      console.error(`Error on ${item.name}:`, err.message);
    }
  }
}
run();
