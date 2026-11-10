import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pagesDir = 'backend/scripts/oscillations_pages';
const outDir = 'backend/scripts/oscillations_diagrams';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const CROPS = [
  // Q3 (Page 3): 4 options
  { name: 'osc_q3_opt_a.png', page: 3, x: 105.0, y: 262.5, w: 375.0, h: 214.5, pad: 5 },
  { name: 'osc_q3_opt_b.png', page: 3, x: 105.0, y: 484.5, w: 387.0, h: 214.5, pad: 5 },
  { name: 'osc_q3_opt_c.png', page: 3, x: 105.0, y: 706.5, w: 381.0, h: 216.0, pad: 5 },
  { name: 'osc_q3_opt_d.png', page: 3, x: 105.0, y: 928.5, w: 369.0, h: 216.0, pad: 5 },

  // Q6 (Page 4): 4 options
  { name: 'osc_q6_opt_a.png', page: 4, x: 105.0, y: 531.0, w: 331.5, h: 214.5, pad: 5 },
  { name: 'osc_q6_opt_b.png', page: 4, x: 105.0, y: 753.0, w: 339.0, h: 214.5, pad: 5 },
  { name: 'osc_q6_opt_c.png', page: 4, x: 105.0, y: 975.0, w: 333.0, h: 216.0, pad: 5 },
  { name: 'osc_q6_opt_d.png', page: 4, x: 105.0, y: 1197.0, w: 343.5, h: 216.0, pad: 5 },

  // Q13 (Page 6): x-t graph
  { name: 'osc_q13_diagram.png', page: 6, x: 67.5, y: 259.5, w: 531.0, h: 351.0, pad: 5 },

  // Q14 (Page 7 & 8): 4 graphs in List-I
  { name: 'osc_q14_graph_a.png', page: 7, x: 129.0, y: 312.0, w: 412.5, h: 250.5, pad: 5 },
  { name: 'osc_q14_graph_b.png', page: 7, x: 129.0, y: 592.5, w: 405.0, h: 351.0, pad: 5 },
  { name: 'osc_q14_graph_c.png', page: 7, x: 129.0, y: 973.5, w: 412.5, h: 331.5, pad: 5 },
  { name: 'osc_q14_graph_d.png', page: 8, x: 129.0, y: 217.5, w: 390.0, h: 351.0, pad: 5 },

  // Q22 (Page 10): circular trajectory
  { name: 'osc_q22_diagram.png', page: 10, x: 67.5, y: 259.5, w: 387.0, h: 351.0, pad: 5 },

  // Q32 (Page 13): 4 options
  { name: 'osc_q32_opt_a.png', page: 13, x: 105.0, y: 414.0, w: 357.0, h: 216.0, pad: 5 },
  { name: 'osc_q32_opt_b.png', page: 13, x: 105.0, y: 636.0, w: 355.5, h: 216.0, pad: 5 },
  { name: 'osc_q32_opt_c.png', page: 13, x: 105.0, y: 859.5, w: 372.0, h: 214.5, pad: 5 },
  { name: 'osc_q32_opt_d.png', page: 13, x: 105.0, y: 1081.5, w: 370.5, h: 214.5, pad: 5 },

  // Q35 (Page 15 & 16): potential well diagram + 4 options
  { name: 'osc_q35_diagram.png', page: 15, x: 67.5, y: 319.5, w: 552.0, h: 312.0, pad: 5 },
  { name: 'osc_q35_opt_a.png', page: 15, x: 105.0, y: 643.5, w: 385.5, h: 216.0, pad: 5 },
  { name: 'osc_q35_opt_b.png', page: 15, x: 105.0, y: 865.5, w: 411.0, h: 216.0, pad: 5 },
  { name: 'osc_q35_opt_c.png', page: 15, x: 105.0, y: 1087.5, w: 399.0, h: 216.0, pad: 5 },
  { name: 'osc_q35_opt_d.png', page: 16, x: 105.0, y: 133.5, w: 397.5, h: 216.0, pad: 5 },

  // Q44 (Page 18): spring on pan
  { name: 'osc_q44_diagram.png', page: 18, x: 67.5, y: 415.5, w: 277.5, h: 351.0, pad: 5 },

  // Q53 (Page 20): 4 options
  { name: 'osc_q53_opt_a.png', page: 20, x: 105.0, y: 267.0, w: 279.0, h: 216.0, pad: 5 },
  { name: 'osc_q53_opt_b.png', page: 20, x: 105.0, y: 489.0, w: 297.0, h: 216.0, pad: 5 },
  { name: 'osc_q53_opt_c.png', page: 20, x: 105.0, y: 711.0, w: 337.5, h: 216.0, pad: 5 },
  { name: 'osc_q53_opt_d.png', page: 20, x: 105.0, y: 934.5, w: 342.0, h: 214.5, pad: 5 },

  // Q57 (Page 21): parallel springs
  { name: 'osc_q57_diagram.png', page: 21, x: 67.5, y: 691.5, w: 361.5, h: 351.0, pad: 5 },

  // Q66 (Page 23): quadrant / circle
  { name: 'osc_q66_diagram.png', page: 23, x: 67.5, y: 504.0, w: 508.5, h: 351.0, pad: 5 },

  // Q68 (Page 24): pendulum arc
  { name: 'osc_q68_diagram.png', page: 24, x: 67.5, y: 259.5, w: 595.5, h: 349.5, pad: 5 }
];

async function cropAll() {
  for (const c of CROPS) {
    const pagePath = path.join(pagesDir, `page_${c.page}.png`);
    const img = await loadImage(pagePath);

    const pad = c.pad || 0;
    const sx = Math.max(0, Math.floor(c.x - pad));
    const sy = Math.max(0, Math.floor(c.y - pad));
    const sw = Math.min(img.width - sx, Math.ceil(c.w + pad * 2));
    const sh = Math.min(img.height - sy, Math.ceil(c.h + pad * 2));

    const canvas = createCanvas(sw, sh);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    const outPath = path.join(outDir, c.name);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped ${c.name} (${sw}x${sh}) -> ${outPath}`);
  }
  console.log('All diagrams successfully cropped!');
}

cropAll().catch(console.error);

