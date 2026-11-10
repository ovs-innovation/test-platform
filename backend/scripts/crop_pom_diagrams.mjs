import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const pagesDir = 'backend/scripts/pom_pages';
const outDir = 'backend/scripts/pom_diagrams';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const CROPS = [
  // Q1 (Page 2): horizontal pipe
  { name: 'pom_q1_diagram.png', page: 2, x: 67.5, y: 442.5, w: 595.5, h: 175.5, pad: 5 },

  // Q2 (Page 3): 4 graph options
  { name: 'pom_q2_opt_a.png', page: 3, x: 105.0, y: 292.5, w: 255.0, h: 216.0, pad: 5 },
  { name: 'pom_q2_opt_b.png', page: 3, x: 105.0, y: 514.5, w: 250.5, h: 216.0, pad: 5 },
  { name: 'pom_q2_opt_c.png', page: 3, x: 105.0, y: 736.5, w: 246.0, h: 216.0, pad: 5 },
  { name: 'pom_q2_opt_d.png', page: 3, x: 105.0, y: 958.5, w: 255.0, h: 216.0, pad: 5 },

  // Q5 (Page 4): tank meniscus
  { name: 'pom_q5_diagram.png', page: 4, x: 67.5, y: 1003.5, w: 511.5, h: 351.0, pad: 5 },

  // Q6 (Page 5): non-uniform tube XY
  { name: 'pom_q6_diagram.png', page: 5, x: 67.5, y: 289.5, w: 523.5, h: 352.5, pad: 5 },

  // Q18 (Page 7): speed vs time curves
  { name: 'pom_q18_diagram.png', page: 7, x: 67.5, y: 475.5, w: 420.0, h: 351.0, pad: 5 },

  // Q27 (Page 9): U tube water & oil
  { name: 'pom_q27_diagram.png', page: 9, x: 67.5, y: 792.0, w: 511.5, h: 351.0, pad: 5 },

  // Q37 (Page 11): U tube level difference
  { name: 'pom_q37_diagram.png', page: 11, x: 67.5, y: 768.0, w: 478.5, h: 351.0, pad: 5 },

  // Q51 (Page 14): wires with weights
  { name: 'pom_q51_diagram.png', page: 14, x: 67.5, y: 475.5, w: 211.5, h: 351.0, pad: 5 },

  // Q57 (Page 16): 4 heating curve options
  { name: 'pom_q57_opt_a.png', page: 16, x: 105.0, y: 262.5, w: 247.5, h: 214.5, pad: 5 },
  { name: 'pom_q57_opt_b.png', page: 16, x: 105.0, y: 484.5, w: 244.5, h: 214.5, pad: 5 },
  { name: 'pom_q57_opt_c.png', page: 16, x: 105.0, y: 706.5, w: 262.5, h: 216.0, pad: 5 },
  { name: 'pom_q57_opt_d.png', page: 16, x: 105.0, y: 928.5, w: 244.5, h: 216.0, pad: 5 },
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
