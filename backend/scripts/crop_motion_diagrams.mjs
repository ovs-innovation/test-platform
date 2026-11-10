import sharp from 'sharp';
import fs from 'fs';

const outDir = './uploads/motion_in_straight_line';

async function cropAllRefined() {
  // Q2: Page 2. Just the graphs A, B, C, D, E
  await sharp('./scripts/motion_straight_line_pages/page_2.png')
    .extract({ left: 60, top: 495, width: 620, height: 440 })
    .toFile(`${outDir}/q2_diagram.png`);

  // Q7: Page 4. The velocity-time plot and acceleration-time graphs
  await sharp('./scripts/motion_straight_line_pages/page_4.png')
    .extract({ left: 50, top: 130, width: 630, height: 1350 })
    .toFile(`${outDir}/q7_diagram.png`);

  // Q11: Page 6. Graphs for A, B, C, D
  await sharp('./scripts/motion_straight_line_pages/page_6.png')
    .extract({ left: 50, top: 140, width: 440, height: 950 })
    .toFile(`${outDir}/q11_diagram.png`);

  // Q13: Page 7. Diagram of displacement-time graph with 30 and 45 deg
  await sharp('./scripts/motion_straight_line_pages/page_7.png')
    .extract({ left: 45, top: 250, width: 440, height: 350 })
    .toFile(`${outDir}/q13_diagram.png`);

  // Q35: Page 11. Distance-time curve
  await sharp('./scripts/motion_straight_line_pages/page_11.png')
    .extract({ left: 55, top: 240, width: 500, height: 360 })
    .toFile(`${outDir}/q35_diagram.png`);

  // Q57: Page 15. Displacement-time curve
  await sharp('./scripts/motion_straight_line_pages/page_15.png')
    .extract({ left: 40, top: 250, width: 600, height: 260 })
    .toFile(`${outDir}/q57_diagram.png`);

  // Q59: Page 16. Curves A, B, C, D
  await sharp('./scripts/motion_straight_line_pages/page_16.png')
    .extract({ left: 50, top: 140, width: 340, height: 940 })
    .toFile(`${outDir}/q59_diagram.png`);

  console.log('Refined crops saved!');
}

cropAllRefined().catch(console.error);
