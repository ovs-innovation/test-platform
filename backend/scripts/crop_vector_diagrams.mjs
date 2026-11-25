import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function trimCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      // non-white pixel
      if (r < 235 || g < 235 || b < 235) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) return canvas;

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(canvas.width - 1, maxX + pad);
  maxY = Math.min(canvas.height - 1, maxY + pad);

  const trimW = maxX - minX + 1;
  const trimH = maxY - minY + 1;
  const outCanvas = createCanvas(trimW, trimH);
  const outCtx = outCanvas.getContext('2d');
  outCtx.fillStyle = '#ffffff';
  outCtx.fillRect(0, 0, trimW, trimH);
  outCtx.drawImage(canvas, minX, minY, trimW, trimH, 0, 0, trimW, trimH);
  return outCanvas;
}

// Diagram definitions from the rendered 1308x1668 pages
const DIAGRAM_CROPS = [
  // Page 2:
  // Q17 (Forces on axes)
  { q_num: 17, page: 'page_02.png', x: 190, y: 280, w: 320, h: 220, name: 'q17_forces_axes.png' },
  // Q29 (Triangle vectors A, B, C)
  { q_num: 29, page: 'page_02.png', x: 800, y: 310, w: 320, h: 180, name: 'q29_triangle_vectors.png' },
  // Q30 (Match List-II 4 triangles)
  { q_num: 30, page: 'page_02.png', x: 740, y: 500, w: 480, h: 320, name: 'q30_match_triangles.png' },

  // Page 3:
  // Q40 (Forces 5N at 60 deg)
  { q_num: 40, page: 'page_03.png', x: 230, y: 630, w: 260, h: 200, name: 'q40_forces_60deg.png' },
  // Q42 (Three forces F1, F2, F3 & Column-II arrows)
  { q_num: 42, page: 'page_03.png', x: 670, y: 100, w: 560, h: 420, name: 'q42_forces_match_directions.png' },
  // Q43 (Four option diagrams for A + B = R)
  { q_num: 43, page: 'page_03.png', x: 670, y: 470, w: 560, h: 220, name: 'q43_vector_addition_options.png' },

  // Page 4:
  // Q50 (Forces 2F, 2F, F at 120 deg)
  { q_num: 50, page: 'page_04.png', x: 180, y: 240, w: 320, h: 200, name: 'q50_forces_120deg.png' },
  // Q51 (Three forces 4N, 1N, 2N)
  { q_num: 51, page: 'page_04.png', x: 190, y: 420, w: 320, h: 180, name: 'q51_three_forces.png' },
  // Q53 (Path ABCD)
  { q_num: 53, page: 'page_04.png', x: 200, y: 650, w: 320, h: 240, name: 'q53_path_abcd.png' },
  // Q54 (Six vectors a through f)
  { q_num: 54, page: 'page_04.png', x: 800, y: 120, w: 320, h: 180, name: 'q54_six_vectors.png' },
  // Q60 (Circle with OA, OB, OC at 45 deg)
  { q_num: 60, page: 'page_04.png', x: 800, y: 540, w: 300, h: 220, name: 'q60_vectors_circle.png' },

  // Page 5:
  // Q64 (Triangle with A, B, R at 30, 60, 90 deg)
  { q_num: 64, page: 'page_05.png', x: 190, y: 320, w: 320, h: 210, name: 'q64_triangle_30_60.png' },
  // Q72 (Diagram with P, Q, R, S)
  { q_num: 72, page: 'page_05.png', x: 800, y: 300, w: 300, h: 170, name: 'q72_quadrilateral_pqrs.png' },

  // Page 6:
  // Q78 (Triangle OPQ with midpoint R)
  { q_num: 78, page: 'page_06.png', x: 190, y: 170, w: 320, h: 190, name: 'q78_triangle_midpoint_r.png' },

  // Page 7:
  // Q103 (Lami's Theorem OA, W, 30N)
  { q_num: 103, page: 'page_07.png', x: 780, y: 680, w: 340, h: 220, name: 'q103_lamis_theorem.png' },

  // Page 8:
  // Q104 (Forces at 45 deg F1=50, F2=50, F3)
  { q_num: 104, page: 'page_08.png', x: 170, y: 90, w: 340, h: 220, name: 'q104_equilibrium_forces.png' },
  // Q109 (Perpendicular vectors A and B)
  { q_num: 109, page: 'page_08.png', x: 180, y: 540, w: 260, h: 160, name: 'q109_orthogonal_vectors.png' },

  // Page 10 (Answer Key Solution Diagrams):
  // Q24
  { q_num: 24, page: 'page_10.png', x: 260, y: 280, w: 360, h: 120, name: 'q24_solution_vectors.png' },
  // Q25
  { q_num: 25, page: 'page_10.png', x: 620, y: 280, w: 180, h: 130, name: 'q25_solution_vector.png' },
  // Q26
  { q_num: 26, page: 'page_10.png', x: 800, y: 280, w: 220, h: 130, name: 'q26_solution_vector.png' },
  // Q27
  { q_num: 27, page: 'page_10.png', x: 100, y: 370, w: 220, h: 140, name: 'q27_solution_vector.png' }
];

async function main() {
  const pagesDir = path.resolve(__dirname, 'vector_pdf_pages');
  const outDir = path.resolve(__dirname, '../uploads/physics_vector');
  const frontendDir = path.resolve(__dirname, '../../frontend/public/uploads/physics_vector');

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(frontendDir, { recursive: true });

  const pageCache = {};

  for (const item of DIAGRAM_CROPS) {
    if (!pageCache[item.page]) {
      pageCache[item.page] = await loadImage(path.join(pagesDir, item.page));
    }
    const pageImg = pageCache[item.page];
    const canvas = createCanvas(item.w, item.h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, item.x, item.y, item.w, item.h, 0, 0, item.w, item.h);

    const trimmed = trimCanvas(canvas);
    const buf = trimmed.toBuffer('image/png');

    fs.writeFileSync(path.join(outDir, item.name), buf);
    fs.writeFileSync(path.join(frontendDir, item.name), buf);
    console.log(`Cropped Q${item.q_num}: ${item.name} (${trimmed.width}x${trimmed.height})`);
  }
  console.log(`\nSuccessfully cropped all ${DIAGRAM_CROPS.length} diagrams!`);
}

main().catch(console.error);
