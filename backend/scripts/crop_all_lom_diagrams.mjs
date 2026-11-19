import { createCanvas, loadImage } from '../node_modules/@napi-rs/canvas/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'lom_pages');
const baseOutDir = path.resolve(__dirname, '../uploads/lom_pyq');
if (!fs.existsSync(baseOutDir)) {
  fs.mkdirSync(baseOutDir, { recursive: true });
}

function autoTrimCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imgData;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Non-white pixel
      if (a > 30 && (r < 235 || g < 235 || b < 235)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX <= minX || maxY <= minY) return null;

  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(width, maxX + pad);
  maxY = Math.min(height, maxY + pad);

  const cropW = Math.max(10, maxX - minX);
  const cropH = Math.max(10, maxY - minY);

  const trimmedCanvas = createCanvas(cropW, cropH);
  const trimmedCtx = trimmedCanvas.getContext('2d');
  trimmedCtx.fillStyle = '#FFFFFF';
  trimmedCtx.fillRect(0, 0, cropW, cropH);
  trimmedCtx.drawImage(canvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);

  return trimmedCanvas;
}

// Bounding box configs for Laws of Motion diagram questions
// { p: pageNumber, box: { x, y, w, h } } normalized to [0..1]
const DIAGRAM_CONFIGS = {
  1: { p: 1, box: { x: 0.15, y: 0.38, w: 0.70, h: 0.14 } }, // 3 blocks pulled by F
  4: { p: 2, box: { x: 0.20, y: 0.32, w: 0.60, h: 0.16 } }, // pulley rope hook C
  10: { p: 4, box: { x: 0.60, y: 0.40, w: 0.35, h: 0.18 } }, // triangle of forces
  14: { p: 6, box: { x: 0.65, y: 0.05, w: 0.30, h: 0.20 } }, // block against wall
  15: { p: 6, box: { x: 0.20, y: 0.55, w: 0.60, h: 0.22 } }, // two masses over pulley
  19: { p: 8, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.20 } }, // block on inclined plane
  28: { p: 12, box: { x: 0.15, y: 0.10, w: 0.70, h: 0.25 } }, // two inclined planes 30 and 60
  29: { p: 13, box: { x: 0.05, y: 0.08, w: 0.90, h: 0.32 } }, // v-t option curves
  33: { p: 16, box: { x: 0.20, y: 0.05, w: 0.60, h: 0.22 } }, // block diagram
  38: { p: 19, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.24 } }, // mass on platform
  40: { p: 20, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.24 } }, // inclined plane varying mu
  46: { p: 24, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.28 } }, // blocks A and B against wall
  47: { p: 25, box: { x: 0.10, y: 0.08, w: 0.80, h: 0.22 } }, // beads on rod
  48: { p: 26, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.22 } }, // rough track PQR
  49: { p: 27, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.22 } }, // block diagram
  52: { p: 29, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.26 } }, // rods pivot
  53: { p: 30, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.22 } }, // pulley with m1 and m2
  56: { p: 32, box: { x: 0.15, y: 0.05, w: 0.70, h: 0.25 } }, // inclined plane
  57: { p: 33, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.22 } }, // rough inclined plane
  59: { p: 35, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // platform accelerating upwards
  62: { p: 38, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block on rough inclined plane
  64: { p: 40, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // blocks A and B on table
  65: { p: 41, box: { x: 0.10, y: 0.08, w: 0.80, h: 0.26 } }, // case A pushed, case B pulled
  68: { p: 44, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // cubical box on rough floor
  69: { p: 45, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block on table
  75: { p: 49, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.22 } }, // pulley system
  78: { p: 51, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.24 } }, // two masses fixed by spring
  79: { p: 52, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // inclined plane in electric field
  80: { p: 53, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // frame rods AB and AC
  81: { p: 54, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block pulled at angle theta
  83: { p: 55, box: { x: 0.20, y: 0.50, w: 0.60, h: 0.24 } }, // block diagram
  84: { p: 56, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block on incline
  85: { p: 57, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block pulled
  88: { p: 60, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.24 } }, // block on incline
  91: { p: 61, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.24 } }, // bodies m1 and m2
  94: { p: 62, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.24 } }, // blocks m1 and m2
  95: { p: 63, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // boxes 2kg and 8kg with pulleys
  101: { p: 66, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // block on wooden wedge
  106: { p: 71, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // block on smooth inclined plane
  108: { p: 73, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.25 } }, // 10 balls connected by string
  109: { p: 74, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.28 } }, // pulley arrangement masses m1,m2,m3,m4
  110: { p: 75, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // two blocks m and M on table
  113: { p: 77, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // hanging mass M and 4M
  115: { p: 79, box: { x: 0.15, y: 0.45, w: 0.70, h: 0.24 } }, // pulley system
  117: { p: 80, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // block 40kg slides over surface
  118: { p: 81, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // four forces at point P
  119: { p: 82, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // free body diagram 4 forces
  121: { p: 84, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // three masses M, m1, m2
  122: { p: 85, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // masses M1 and M2 over pulley
  127: { p: 89, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // metal chain on pulley
  128: { p: 90, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // bodies m1 and m2 on double incline
  130: { p: 92, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // double inclined surface pulley P
  131: { p: 93, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // block on 45 deg incline
  136: { p: 97, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.28 } }, // momentum-time curve p-t
  137: { p: 99, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // 70kg garden roller pushed at 30 deg
  140: { p: 101, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // block 10kg pulled at 30 deg
  141: { p: 102, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.25 } }, // mass m attached to two springs
  148: { p: 105, box: { x: 0.15, y: 0.50, w: 0.70, h: 0.25 } }, // blocks on surface
  149: { p: 106, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.25 } }, // blocks A, B, C pulled by 80N
  151: { p: 107, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // doubly inclined plane
  152: { p: 108, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // light string over fixed pulley
  153: { p: 109, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // block 5kg on rough incline
  154: { p: 110, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.26 } }, // block and trolley system
  157: { p: 112, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.26 } }, // pulley blocks
  159: { p: 113, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.28 } }, // M1, M2, M3 ropes 1, 2, 3
  160: { p: 114, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // blocks on incline
  161: { p: 114, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.25 } }, // block diagram
  166: { p: 117, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.26 } }, // string over smooth pulley
  169: { p: 119, box: { x: 0.20, y: 0.05, w: 0.60, h: 0.25 } }, // body suspended by 2 strings 60 and 30
  177: { p: 123, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.25 } }, // block on incline
  179: { p: 124, box: { x: 0.20, y: 0.45, w: 0.60, h: 0.25 } }, // block diagram
  181: { p: 126, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.25 } }, // block on incline moving left
  184: { p: 129, box: { x: 0.20, y: 0.12, w: 0.60, h: 0.25 } }, // wedge Y 10kg with block X 2kg
  185: { p: 131, box: { x: 0.20, y: 0.08, w: 0.60, h: 0.28 } }, // three masses m1, m2, m3 on pulley
  187: { p: 134, box: { x: 0.15, y: 0.08, w: 0.70, h: 0.28 } }, // blocks P and Q on cube S
};

async function cropAllDiagrams() {
  console.log(`Cropping ${Object.keys(DIAGRAM_CONFIGS).length} diagrams...`);
  const diagramsMap = {};

  for (const [qStr, conf] of Object.entries(DIAGRAM_CONFIGS)) {
    const qNum = parseInt(qStr);
    const pStr = String(conf.p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pStr}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`Page ${conf.p} image not found`);
      continue;
    }

    const img = await loadImage(imgPath);
    const cropX = Math.round(img.width * conf.box.x);
    const cropY = Math.round(img.height * conf.box.y);
    const cropW = Math.round(img.width * conf.box.w);
    const cropH = Math.round(img.height * conf.box.h);

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const trimmed = autoTrimCanvas(canvas);
    if (!trimmed) {
      console.warn(`Trim returned empty for Q${qNum}`);
      continue;
    }

    const qDir = path.join(baseOutDir, `q${qNum}`);
    if (!fs.existsSync(qDir)) fs.mkdirSync(qDir, { recursive: true });

    const outPath = path.join(qDir, 'question-diagram.png');
    fs.writeFileSync(outPath, trimmed.toBuffer('image/png'));
    diagramsMap[qNum] = `/uploads/lom_pyq/q${qNum}/question-diagram.png`;
  }

  const mapFile = path.join(__dirname, 'lom_diagrams.json');
  fs.writeFileSync(mapFile, JSON.stringify(diagramsMap, null, 2), 'utf8');
  console.log(`Saved ${Object.keys(diagramsMap).length} diagrams to ${mapFile}`);
}

cropAllDiagrams().catch(console.error);
