import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'hydro_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'hydro_jee_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bounding box specs for Part 4 diagram questions
// Page dimensions: 1224 x 1584
const PART4_DIAGRAM_SPECS = [
  // Q181: Page 94
  { id: 'q181_diagram', page: 94, l: 0.12, t: 0.35, w: 0.76, h: 0.28 },
  // Q182: Page 95
  { id: 'q182_diagram', page: 95, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q183: Page 95
  { id: 'q183_diagram', page: 95, l: 0.12, t: 0.30, w: 0.68, h: 0.18 },
  // Q185: Page 96
  { id: 'q185_diagram', page: 96, l: 0.12, t: 0.38, w: 0.68, h: 0.15 },
  // Q186: Page 97
  { id: 'q186_diagram', page: 97, l: 0.12, t: 0.02, w: 0.76, h: 0.30 },
  // Q195: Page 101
  { id: 'q195_diagram', page: 101, l: 0.12, t: 0.15, w: 0.72, h: 0.20 },
  // Q196: Page 102
  { id: 'q196_diagram', page: 102, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q197: Page 102
  { id: 'q197_diagram', page: 102, l: 0.12, t: 0.32, w: 0.72, h: 0.22 },
  // Q198: Page 103
  { id: 'q198_diagram', page: 103, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q199: Page 104
  { id: 'q199_diagram', page: 104, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q200: Page 104
  { id: 'q200_diagram', page: 104, l: 0.12, t: 0.32, w: 0.72, h: 0.22 },
  // Q202: Page 105
  { id: 'q202_diagram', page: 105, l: 0.12, t: 0.35, w: 0.72, h: 0.24 },
  // Q205: Page 106
  { id: 'q205_diagram', page: 106, l: 0.12, t: 0.28, w: 0.72, h: 0.24 },
  // Q206: Page 107
  { id: 'q206_diagram', page: 107, l: 0.12, t: 0.02, w: 0.76, h: 0.30 },
  // Q208: Page 108
  { id: 'q208_diagram', page: 108, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q209: Page 109
  { id: 'q209_diagram', page: 109, l: 0.12, t: 0.02, w: 0.72, h: 0.25 },
  // Q214: Page 112
  { id: 'q214_diagram', page: 112, l: 0.12, t: 0.02, w: 0.72, h: 0.25 },
  // Q217: Page 114
  { id: 'q217_diagram', page: 114, l: 0.12, t: 0.02, w: 0.72, h: 0.20 },
  // Q219: Page 115
  { id: 'q219_diagram', page: 115, l: 0.12, t: 0.02, w: 0.72, h: 0.24 },
  // Q220: Page 115
  { id: 'q220_diagram', page: 115, l: 0.12, t: 0.30, w: 0.72, h: 0.22 },
  // Q221: Page 116
  { id: 'q221_diagram', page: 116, l: 0.12, t: 0.02, w: 0.72, h: 0.18 },
  // Q222: Page 116
  { id: 'q222_diagram', page: 116, l: 0.12, t: 0.28, w: 0.72, h: 0.22 },
  // Q223: Page 117
  { id: 'q223_diagram', page: 117, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q224: Page 117
  { id: 'q224_diagram', page: 117, l: 0.12, t: 0.28, w: 0.72, h: 0.22 },
  // Q226: Page 118
  { id: 'q226_diagram', page: 118, l: 0.12, t: 0.28, w: 0.72, h: 0.18 },
  // Q228: Page 120
  { id: 'q228_diagram', page: 120, l: 0.12, t: 0.02, w: 0.68, h: 0.16 },
  // Q230: Page 121
  { id: 'q230_diagram', page: 121, l: 0.12, t: 0.02, w: 0.76, h: 0.30 },
  // Q231: Page 122
  { id: 'q231_diagram', page: 122, l: 0.12, t: 0.02, w: 0.72, h: 0.25 },
  // Q232: Page 123
  { id: 'q232_diagram', page: 123, l: 0.12, t: 0.02, w: 0.72, h: 0.18 },
  // Q233: Page 124
  { id: 'q233_diagram', page: 124, l: 0.12, t: 0.02, w: 0.72, h: 0.20 },
  // Q234: Page 125
  { id: 'q234_diagram', page: 125, l: 0.12, t: 0.02, w: 0.72, h: 0.24 },
  // Q235: Page 126
  { id: 'q235_diagram', page: 126, l: 0.12, t: 0.02, w: 0.72, h: 0.16 },
  // Q237: Page 127
  { id: 'q237_diagram', page: 127, l: 0.12, t: 0.28, w: 0.72, h: 0.22 }
];

async function main() {
  console.log(`Cropping ${PART4_DIAGRAM_SPECS.length} Part 4 diagrams...`);
  const pageCache = {};

  for (const spec of PART4_DIAGRAM_SPECS) {
    const pageNumStr = String(spec.page).padStart(3, '0');
    const pageFile = path.resolve(PAGES_DIR, `page_${pageNumStr}.png`);
    if (!fs.existsSync(pageFile)) {
      console.error(`Page file not found: ${pageFile}`);
      continue;
    }

    if (!pageCache[spec.page]) {
      pageCache[spec.page] = await loadImage(pageFile);
    }
    const img = pageCache[spec.page];
    const width = img.width;
    const height = img.height;

    const cropX = Math.round(spec.l * width);
    const cropY = Math.round(spec.t * height);
    const cropW = Math.round(spec.w * width);
    const cropH = Math.round(spec.h * height);

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const outPath = path.resolve(OUT_DIR, `${spec.id}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped: ${spec.id}.png (${cropW}x${cropH})`);
  }
  console.log('Finished cropping Part 4 diagrams!');
}

main().catch(console.error);
