import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'thermo_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'thermo_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bounding box definitions relative to page width and height (w=1224, h=1584)
const DIAGRAMS = [
  { id: 'q58_q_diagram', page: 20, l: 0.20, t: 0.04, w: 0.60, h: 0.32 },
  { id: 'q60_q_diagram', page: 21, l: 0.55, t: 0.25, w: 0.20, h: 0.10 },
  { id: 'q64_q_diagram', page: 23, l: 0.20, t: 0.06, w: 0.60, h: 0.32 },
  { id: 'q71_q_diagram', page: 27, l: 0.20, t: 0.03, w: 0.58, h: 0.25 },
  { id: 'q72_q_diagram', page: 28, l: 0.20, t: 0.02, w: 0.55, h: 0.30 },
  { id: 'q86_q_diagram', page: 33, l: 0.20, t: 0.59, w: 0.50, h: 0.26 },
  { id: 'q88_sol_diagram', page: 34, l: 0.20, t: 0.33, w: 0.62, h: 0.28 },
  { id: 'q113_sol_diagram', page: 41, l: 0.20, t: 0.46, w: 0.62, h: 0.21 },
  { id: 'q116_q_diagram', page: 42, l: 0.20, t: 0.31, w: 0.35, h: 0.17 },
  { id: 'q141_q_diagram', page: 50, l: 0.20, t: 0.33, w: 0.65, h: 0.40 },
  { id: 'q152_q_diagram', page: 55, l: 0.20, t: 0.04, w: 0.62, h: 0.40 },
  { id: 'q164_q_diagram', page: 59, l: 0.20, t: 0.66, w: 0.60, h: 0.14 },
  { id: 'q170_q_diagram', page: 62, l: 0.20, t: 0.08, w: 0.55, h: 0.32 },
  { id: 'q183_q_diagram', page: 66, l: 0.20, t: 0.53, w: 0.25, h: 0.20 },
  { id: 'q193_sol_diagram', page: 69, l: 0.20, t: 0.70, w: 0.40, h: 0.18 },
  { id: 'q199_sol_diagram', page: 71, l: 0.20, t: 0.62, w: 0.40, h: 0.16 },
  { id: 'q200_sol_diagram', page: 72, l: 0.20, t: 0.15, w: 0.60, h: 0.13 },
  { id: 'q201_q_diagram', page: 72, l: 0.20, t: 0.32, w: 0.60, h: 0.14 },
  { id: 'q205_q_diagram', page: 73, l: 0.20, t: 0.50, w: 0.55, h: 0.18 },
  { id: 'q206_sol_diagram', page: 75, l: 0.20, t: 0.02, w: 0.60, h: 0.96 },
  { id: 'q207_q_diagram', page: 76, l: 0.20, t: 0.05, w: 0.60, h: 0.17 },
  { id: 'q208_q_diagram', page: 76, l: 0.20, t: 0.55, w: 0.60, h: 0.20 },
  { id: 'q209_sol_diagram', page: 77, l: 0.20, t: 0.14, w: 0.45, h: 0.18 },
  { id: 'q210_q_diagram', page: 77, l: 0.20, t: 0.34, w: 0.40, h: 0.24 },
  { id: 'q216_sol_diagram', page: 80, l: 0.20, t: 0.18, w: 0.45, h: 0.20 },
  { id: 'q218_sol_diagram', page: 80, l: 0.20, t: 0.74, w: 0.45, h: 0.17 },
  { id: 'q220_q_diagram', page: 82, l: 0.20, t: 0.04, w: 0.45, h: 0.07 },
  { id: 'q221_sol_diagram', page: 83, l: 0.20, t: 0.20, w: 0.45, h: 0.18 },
  { id: 'q223_q_diagram', page: 84, l: 0.20, t: 0.03, w: 0.60, h: 0.39 },
  { id: 'q230_q_diagram', page: 88, l: 0.20, t: 0.13, w: 0.55, h: 0.20 }
];

async function cropAll() {
  console.log(`Cropping ${DIAGRAMS.length} diagrams...`);
  for (const item of DIAGRAMS) {
    const pStr = String(item.page).padStart(3, '0');
    const pageFile = path.join(PAGES_DIR, `page_${pStr}.png`);
    const meta = await sharp(pageFile).metadata();

    const left = Math.round(meta.width * item.l);
    const top = Math.round(meta.height * item.t);
    const width = Math.round(meta.width * item.w);
    const height = Math.round(meta.height * item.h);

    const outPath = path.join(OUT_DIR, `${item.id}.png`);
    await sharp(pageFile)
      .extract({ left, top, width, height })
      .toFile(outPath);
    console.log(`Cropped ${item.id} from page ${item.page}`);
  }
  console.log('All diagrams cropped successfully!');
}

cropAll().catch(console.error);
