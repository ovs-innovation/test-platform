import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUT_DIR = './backend/uploads/organic_chemistry';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  // Page 2: Q1 diagram (between y=180 and y=430, x=50 to 550)
  const p2 = await loadImage('./backend/scripts/organic_pages/page_2.png');
  const crop = (img, x, y, w, h, outFile) => {
    const c = createCanvas(w, h);
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    fs.writeFileSync(path.join(OUT_DIR, outFile), c.toBuffer('image/png'));
    console.log(`Saved ${outFile} (${w}x${h})`);
  };

  // Q1 question diagram
  crop(p2, 60, 180, 520, 240, 'q1_diag.png');

  // Page 3: Q5 and Q7
  const p3 = await loadImage('./backend/scripts/organic_pages/page_3.png');
  // Q5 compound diagram (y=280 to 450, x=60 to 520)
  crop(p3, 60, 280, 500, 160, 'q5_diag.png');
  // Q7 compounds I, II, III (y=670 to 860, x=60 to 550)
  crop(p3, 60, 670, 500, 190, 'q7_diag.png');

  // Page 5: Q11 question diagram
  const p5 = await loadImage('./backend/scripts/organic_pages/page_5.png');
  crop(p5, 60, 140, 400, 240, 'q11_diag.png');

  // Page 6: Q15 options A, B, C, D
  const p6 = await loadImage('./backend/scripts/organic_pages/page_6.png');
  crop(p6, 60, 240, 480, 140, 'q15_opt_a.png');
  crop(p6, 60, 390, 480, 140, 'q15_opt_b.png');
  crop(p6, 60, 530, 480, 140, 'q15_opt_c.png');
  crop(p6, 60, 670, 480, 140, 'q15_opt_d.png');

  // Page 8: Q19 options A, B, C, D
  const p8 = await loadImage('./backend/scripts/organic_pages/page_8.png');
  crop(p8, 60, 130, 450, 140, 'q19_opt_a.png');
  crop(p8, 60, 270, 450, 140, 'q19_opt_b.png');
  crop(p8, 60, 410, 450, 140, 'q19_opt_c.png');
  crop(p8, 60, 550, 450, 140, 'q19_opt_d.png');

  // Page 10: Q24 question diagram (species i to vii)
  const p10 = await loadImage('./backend/scripts/organic_pages/page_10.png');
  crop(p10, 60, 140, 350, 240, 'q24_diag.png');

  // Page 11: Q27 options A, B, C, D
  const p11 = await loadImage('./backend/scripts/organic_pages/page_11.png');
  crop(p11, 60, 140, 300, 140, 'q27_opt_a.png');
  crop(p11, 60, 280, 300, 140, 'q27_opt_b.png');
  crop(p11, 60, 420, 300, 140, 'q27_opt_c.png');
  crop(p11, 60, 560, 300, 140, 'q27_opt_d.png');

  // Page 12: Q28 options A, B, C, D
  const p12 = await loadImage('./backend/scripts/organic_pages/page_12.png');
  crop(p12, 60, 140, 250, 140, 'q28_opt_a.png');
  crop(p12, 60, 280, 250, 140, 'q28_opt_b.png');
  crop(p12, 60, 420, 250, 140, 'q28_opt_c.png');
  crop(p12, 60, 560, 250, 140, 'q28_opt_d.png');

  // Page 13: Q30 options A, B, C, D
  const p13 = await loadImage('./backend/scripts/organic_pages/page_13.png');
  crop(p13, 60, 150, 220, 160, 'q30_opt_a.png');
  crop(p13, 60, 310, 220, 160, 'q30_opt_b.png');
  crop(p13, 60, 470, 220, 160, 'q30_opt_c.png');
  crop(p13, 60, 630, 450, 160, 'q30_opt_d.png');

  // Page 14: Q31 question diagram
  const p14 = await loadImage('./backend/scripts/organic_pages/page_14.png');
  crop(p14, 60, 140, 550, 200, 'q31_diag.png');

  // Page 15: Q33 options A, B, C, D
  const p15 = await loadImage('./backend/scripts/organic_pages/page_15.png');
  crop(p15, 60, 130, 350, 150, 'q33_opt_a.png');
  crop(p15, 60, 290, 350, 150, 'q33_opt_b.png');
  crop(p15, 60, 450, 350, 150, 'q33_opt_c.png');
  crop(p15, 60, 610, 350, 150, 'q33_opt_d.png');
}

main().catch(console.error);

