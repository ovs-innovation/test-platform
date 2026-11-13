import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const OUT_DIR = './backend/uploads/organic_chemistry';
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  const crop = (img, x, y, w, h, outFile) => {
    const c = createCanvas(w, h);
    const ctx = c.getContext('2d');
    ctx.drawImage(img, x, y, w, h, 0, 0, w, h);
    fs.writeFileSync(path.join(OUT_DIR, outFile), c.toBuffer('image/png'));
    console.log(`Saved ${outFile} (${w}x${h})`);
  };

  // Page 35: Q72 options A, B, C, D
  const p35 = await loadImage('./backend/scripts/organic_pages/page_35.png');
  crop(p35, 60, 240, 480, 210, 'q72_opt_a.png');
  crop(p35, 60, 460, 480, 210, 'q72_opt_b.png');
  crop(p35, 60, 680, 480, 210, 'q72_opt_c.png');
  crop(p35, 60, 900, 480, 210, 'q72_opt_d.png');

  // Page 36: Q73 question diagram
  const p36 = await loadImage('./backend/scripts/organic_pages/page_36.png');
  crop(p36, 60, 220, 480, 400, 'q73_diag.png');

  // Page 37: Q77 options A, B, C, D
  const p37 = await loadImage('./backend/scripts/organic_pages/page_37.png');
  crop(p37, 60, 240, 480, 210, 'q77_opt_a.png');
  crop(p37, 60, 460, 480, 210, 'q77_opt_b.png');
  crop(p37, 60, 680, 480, 210, 'q77_opt_c.png');
  crop(p37, 60, 900, 480, 210, 'q77_opt_d.png');

  // Page 38: Q78 options A, B, C, D
  const p38 = await loadImage('./backend/scripts/organic_pages/page_38.png');
  crop(p38, 60, 240, 480, 210, 'q78_opt_a.png');
  crop(p38, 60, 460, 480, 210, 'q78_opt_b.png');
  crop(p38, 60, 680, 480, 210, 'q78_opt_c.png');
  crop(p38, 60, 900, 480, 210, 'q78_opt_d.png');

  // Page 39: Q79 options A, B, C, D
  const p39 = await loadImage('./backend/scripts/organic_pages/page_39.png');
  crop(p39, 60, 240, 480, 210, 'q79_opt_a.png');
  crop(p39, 60, 460, 480, 210, 'q79_opt_b.png');
  crop(p39, 60, 680, 480, 210, 'q79_opt_c.png');
  crop(p39, 60, 900, 480, 210, 'q79_opt_d.png');

  // Page 40: Q81 question diagram
  const p40 = await loadImage('./backend/scripts/organic_pages/page_40.png');
  crop(p40, 60, 220, 480, 230, 'q81_diag.png');

  // Page 41: Q82 options A, B, C, D
  const p41 = await loadImage('./backend/scripts/organic_pages/page_41.png');
  crop(p41, 60, 240, 480, 210, 'q82_opt_a.png');
  crop(p41, 60, 460, 480, 210, 'q82_opt_b.png');
  crop(p41, 60, 680, 480, 210, 'q82_opt_c.png');
  crop(p41, 60, 900, 480, 210, 'q82_opt_d.png');

  // Page 42: Q83 question diagram
  const p42 = await loadImage('./backend/scripts/organic_pages/page_42.png');
  crop(p42, 60, 220, 480, 270, 'q83_diag.png');

  // Page 43: Q88 question diagram
  const p43 = await loadImage('./backend/scripts/organic_pages/page_43.png');
  crop(p43, 60, 220, 480, 260, 'q88_diag.png');

  // Page 44: Q89 options A, B, C, D
  const p44 = await loadImage('./backend/scripts/organic_pages/page_44.png');
  crop(p44, 60, 240, 480, 210, 'q89_opt_a.png');
  crop(p44, 60, 460, 480, 210, 'q89_opt_b.png');
  crop(p44, 60, 680, 480, 210, 'q89_opt_c.png');
  crop(p44, 60, 900, 480, 210, 'q89_opt_d.png');

  // Page 45: Q90 question diagram
  const p45 = await loadImage('./backend/scripts/organic_pages/page_45.png');
  crop(p45, 60, 220, 400, 300, 'q90_diag.png');

  // Page 46: Q94 question diagram
  const p46 = await loadImage('./backend/scripts/organic_pages/page_46.png');
  crop(p46, 60, 640, 480, 250, 'q94_diag.png');

  // Page 47: Q95 question diagram
  const p47 = await loadImage('./backend/scripts/organic_pages/page_47.png');
  crop(p47, 60, 220, 480, 370, 'q95_diag.png');

  // Page 48: Q97 options A, B, C, D
  const p48 = await loadImage('./backend/scripts/organic_pages/page_48.png');
  crop(p48, 60, 240, 480, 210, 'q97_opt_a.png');
  crop(p48, 60, 460, 480, 210, 'q97_opt_b.png');
  crop(p48, 60, 680, 480, 210, 'q97_opt_c.png');
  crop(p48, 60, 900, 480, 210, 'q97_opt_d.png');

  // Page 49: Q100 options A, B, C, D
  const p49 = await loadImage('./backend/scripts/organic_pages/page_49.png');
  crop(p49, 60, 430, 480, 210, 'q100_opt_a.png');
  crop(p49, 60, 650, 480, 210, 'q100_opt_b.png');
  crop(p49, 60, 870, 480, 210, 'q100_opt_c.png');
  crop(p49, 60, 1090, 480, 210, 'q100_opt_d.png');

  // Page 50: Q102 question diagram
  const p50 = await loadImage('./backend/scripts/organic_pages/page_50.png');
  crop(p50, 60, 470, 480, 330, 'q102_diag.png');

  console.log('Finished cropping Part 3 diagrams.');
}

main().catch(console.error);

