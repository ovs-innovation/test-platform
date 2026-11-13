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

  // Page 17: Q39 options A, B, C, D
  const p17 = await loadImage('./backend/scripts/organic_pages/page_17.png');
  crop(p17, 60, 240, 480, 210, 'q39_opt_a.png');
  crop(p17, 60, 460, 480, 210, 'q39_opt_b.png');
  crop(p17, 60, 680, 480, 210, 'q39_opt_c.png');
  crop(p17, 60, 900, 480, 210, 'q39_opt_d.png');

  // Page 18: Q40 options A, B, C, D
  const p18 = await loadImage('./backend/scripts/organic_pages/page_18.png');
  crop(p18, 60, 240, 480, 210, 'q40_opt_a.png');
  crop(p18, 60, 460, 480, 210, 'q40_opt_b.png');
  crop(p18, 60, 680, 480, 210, 'q40_opt_c.png');
  crop(p18, 60, 900, 480, 210, 'q40_opt_d.png');

  // Page 19: Q44 question diagram
  const p19 = await loadImage('./backend/scripts/organic_pages/page_19.png');
  crop(p19, 60, 780, 480, 320, 'q44_diag.png');

  // Page 20: Q46 structures I, II, III
  const p20 = await loadImage('./backend/scripts/organic_pages/page_20.png');
  crop(p20, 60, 220, 480, 260, 'q46_diag.png');

  // Page 21: Q47 options A, B, C, D
  const p21 = await loadImage('./backend/scripts/organic_pages/page_21.png');
  crop(p21, 60, 240, 480, 210, 'q47_opt_a.png');
  crop(p21, 60, 460, 480, 210, 'q47_opt_b.png');
  crop(p21, 60, 680, 480, 210, 'q47_opt_c.png');
  crop(p21, 60, 900, 480, 210, 'q47_opt_d.png');

  // Page 22: Q51 question diagram
  const p22 = await loadImage('./backend/scripts/organic_pages/page_22.png');
  crop(p22, 60, 1060, 480, 320, 'q51_diag.png');

  // Page 23: Q52 question diagram
  const p23 = await loadImage('./backend/scripts/organic_pages/page_23.png');
  crop(p23, 60, 200, 480, 380, 'q52_diag.png');

  // Page 24: Q53 options A, B, C, D
  const p24 = await loadImage('./backend/scripts/organic_pages/page_24.png');
  crop(p24, 60, 280, 480, 210, 'q53_opt_a.png');
  crop(p24, 60, 500, 480, 210, 'q53_opt_b.png');
  crop(p24, 60, 720, 480, 210, 'q53_opt_c.png');
  crop(p24, 60, 940, 480, 210, 'q53_opt_d.png');

  // Page 25: Q55 question diagram
  const p25 = await loadImage('./backend/scripts/organic_pages/page_25.png');
  crop(p25, 60, 200, 480, 310, 'q55_diag.png');
  // Q56 enolic form diagram
  crop(p25, 60, 630, 480, 170, 'q56_diag.png');

  // Page 26: Q57 options A, B, C, D
  const p26 = await loadImage('./backend/scripts/organic_pages/page_26.png');
  crop(p26, 60, 280, 480, 210, 'q57_opt_a.png');
  crop(p26, 60, 500, 480, 210, 'q57_opt_b.png');
  crop(p26, 60, 720, 480, 210, 'q57_opt_c.png');
  crop(p26, 60, 940, 480, 210, 'q57_opt_d.png');

  // Page 27: Q60 diagram
  const p27 = await loadImage('./backend/scripts/organic_pages/page_27.png');
  crop(p27, 60, 760, 400, 280, 'q60_diag.png');

  // Page 29: Q62 options A, B, C, D
  const p29 = await loadImage('./backend/scripts/organic_pages/page_29.png');
  crop(p29, 60, 240, 480, 210, 'q62_opt_a.png');
  crop(p29, 60, 460, 480, 210, 'q62_opt_b.png');
  crop(p29, 60, 680, 480, 210, 'q62_opt_c.png');
  crop(p29, 60, 900, 480, 210, 'q62_opt_d.png');

  // Page 30: Q63 diagram (Newman/Sawhorse projections)
  const p30 = await loadImage('./backend/scripts/organic_pages/page_30.png');
  crop(p30, 60, 200, 480, 300, 'q63_diag.png');
  // Q64 radical structure
  crop(p30, 60, 710, 480, 350, 'q64_diag.png');

  // Page 31: Q65 options A, B, C, D
  const p31 = await loadImage('./backend/scripts/organic_pages/page_31.png');
  crop(p31, 60, 240, 480, 140, 'q65_opt_a.png');
  crop(p31, 60, 390, 480, 210, 'q65_opt_b.png');
  crop(p31, 60, 610, 480, 210, 'q65_opt_c.png');
  crop(p31, 60, 830, 480, 210, 'q65_opt_d.png');

  // Page 32: Q66 options A, B, C, D
  const p32 = await loadImage('./backend/scripts/organic_pages/page_32.png');
  crop(p32, 60, 240, 480, 210, 'q66_opt_a.png');
  crop(p32, 60, 460, 480, 210, 'q66_opt_b.png');
  crop(p32, 60, 680, 480, 210, 'q66_opt_c.png');
  crop(p32, 60, 900, 480, 210, 'q66_opt_d.png');

  // Page 34: Q70 question diagram
  const p34 = await loadImage('./backend/scripts/organic_pages/page_34.png');
  crop(p34, 60, 230, 480, 340, 'q70_diag.png');

  console.log('Finished cropping Part 2 diagrams.');
}

main().catch(console.error);
