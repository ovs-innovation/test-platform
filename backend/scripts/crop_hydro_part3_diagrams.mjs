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

// Bounding box specs for Part 3 diagram questions
// Page dimensions: 1224 x 1584
const PART3_DIAGRAM_SPECS = [
  // Q121: Page 60
  { id: 'q121_diagram', page: 60, l: 0.12, t: 0.02, w: 0.75, h: 0.22 },
  // Q123: Page 61
  { id: 'q123_diagram', page: 61, l: 0.12, t: 0.02, w: 0.60, h: 0.14 },
  // Q124: Page 61
  { id: 'q124_diagram', page: 61, l: 0.12, t: 0.22, w: 0.76, h: 0.24 },
  // Q125: Page 62
  { id: 'q125_diagram', page: 62, l: 0.12, t: 0.02, w: 0.72, h: 0.28 },
  // Q126: Page 63
  { id: 'q126_diagram', page: 63, l: 0.12, t: 0.04, w: 0.72, h: 0.24 },
  // Q127: Page 64
  { id: 'q127_diagram', page: 64, l: 0.12, t: 0.04, w: 0.75, h: 0.25 },
  // Q128: Page 65
  { id: 'q128_diagram', page: 65, l: 0.12, t: 0.02, w: 0.75, h: 0.26 },
  // Q130: Page 66
  { id: 'q130_diagram', page: 66, l: 0.12, t: 0.38, w: 0.75, h: 0.18 },
  // Q132: Page 67
  { id: 'q132_diagram', page: 67, l: 0.12, t: 0.30, w: 0.76, h: 0.28 },
  // Q134: Page 68
  { id: 'q134_diagram', page: 68, l: 0.12, t: 0.22, w: 0.76, h: 0.26 },
  // Q135: Page 69
  { id: 'q135_diagram', page: 69, l: 0.12, t: 0.02, w: 0.72, h: 0.28 },
  // Q138: Page 71
  { id: 'q138_diagram', page: 71, l: 0.12, t: 0.02, w: 0.75, h: 0.16 },
  // Q139: Page 71
  { id: 'q139_diagram', page: 71, l: 0.12, t: 0.40, w: 0.75, h: 0.15 },
  // Q142: Page 73
  { id: 'q142_diagram', page: 73, l: 0.12, t: 0.02, w: 0.76, h: 0.20 },
  // Q144: Page 74
  { id: 'q144_diagram', page: 74, l: 0.12, t: 0.03, w: 0.72, h: 0.24 },
  // Q145: Page 75
  { id: 'q145_diagram', page: 75, l: 0.12, t: 0.02, w: 0.70, h: 0.14 },
  // Q149: Page 77
  { id: 'q149_diagram', page: 77, l: 0.12, t: 0.02, w: 0.76, h: 0.24 },
  // Q150: Page 78
  { id: 'q150_diagram', page: 78, l: 0.12, t: 0.02, w: 0.65, h: 0.12 },
  // Q153: Page 79
  { id: 'q153_diagram', page: 79, l: 0.12, t: 0.18, w: 0.70, h: 0.14 },
  // Q154: Page 80
  { id: 'q154_diagram', page: 80, l: 0.12, t: 0.02, w: 0.72, h: 0.24 },
  // Q158: Page 82
  { id: 'q158_diagram', page: 82, l: 0.12, t: 0.02, w: 0.76, h: 0.22 },
  // Q160: Page 83
  { id: 'q160_diagram', page: 83, l: 0.12, t: 0.02, w: 0.72, h: 0.20 },
  // Q161: Page 83
  { id: 'q161_diagram', page: 83, l: 0.12, t: 0.24, w: 0.72, h: 0.24 },
  // Q163: Page 84
  { id: 'q163_diagram', page: 84, l: 0.12, t: 0.24, w: 0.72, h: 0.18 },
  // Q164: Page 85
  { id: 'q164_diagram', page: 85, l: 0.12, t: 0.02, w: 0.72, h: 0.26 },
  // Q165: Page 85
  { id: 'q165_diagram', page: 85, l: 0.12, t: 0.44, w: 0.65, h: 0.15 },
  // Q166: Page 86
  { id: 'q166_diagram', page: 86, l: 0.12, t: 0.02, w: 0.72, h: 0.25 },
  // Q167: Page 87
  { id: 'q167_diagram', page: 87, l: 0.12, t: 0.02, w: 0.76, h: 0.30 },
  // Q168: Page 88
  { id: 'q168_diagram', page: 88, l: 0.12, t: 0.02, w: 0.72, h: 0.22 },
  // Q170: Page 89
  { id: 'q170_diagram', page: 89, l: 0.12, t: 0.02, w: 0.72, h: 0.20 },
  // Q171: Page 89
  { id: 'q171_diagram', page: 89, l: 0.12, t: 0.28, w: 0.76, h: 0.28 },
  // Q175: Page 91
  { id: 'q175_diagram', page: 91, l: 0.12, t: 0.24, w: 0.72, h: 0.25 },
  // Q176: Page 92
  { id: 'q176_diagram', page: 92, l: 0.12, t: 0.02, w: 0.76, h: 0.28 },
  // Q177: Page 93
  { id: 'q177_diagram', page: 93, l: 0.12, t: 0.02, w: 0.70, h: 0.18 },
  // Q178: Page 93
  { id: 'q178_diagram', page: 93, l: 0.12, t: 0.30, w: 0.70, h: 0.12 },
  // Q180: Page 94
  { id: 'q180_diagram', page: 94, l: 0.12, t: 0.02, w: 0.72, h: 0.16 }
];

async function main() {
  console.log(`Cropping ${PART3_DIAGRAM_SPECS.length} Part 3 diagrams...`);
  const pageCache = {};

  for (const spec of PART3_DIAGRAM_SPECS) {
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
  console.log('Finished cropping Part 3 diagrams!');
}

main().catch(console.error);
