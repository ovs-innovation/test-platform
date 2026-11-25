import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'atom_jee_pages');
const OUT_DIR = path.resolve(__dirname, 'atom_jee_diagrams');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Bounding box specs (l, t, w, h are fractions of 1224x1584)
const DIAGRAM_SPECS = [
  // Q57: Page 27, graph of v_bar vs 1/n1^2
  { id: 'q57_diagram', page: 27, l: 0.15, t: 0.12, w: 0.45, h: 0.19 },
  // Q59: Page 29, 4 photoelectric effect graphs A, B, C, D
  { id: 'q59_diagram', page: 29, l: 0.12, t: 0.08, w: 0.76, h: 0.22 },
  // Q69: Page 36, psi^2 vs r and 4*pi*r^2*R^2 vs r plots
  { id: 'q69_diagram', page: 36, l: 0.15, t: 0.10, w: 0.70, h: 0.22 },
  // Q71: Page 38, |psi|^2 vs r plot
  { id: 'q71_diagram', page: 38, l: 0.15, t: 0.04, w: 0.50, h: 0.18 },
  // Q73: Page 40, Psi(x) vs x wave function
  { id: 'q73_diagram', page: 40, l: 0.15, t: 0.04, w: 0.55, h: 0.18 },
  // Q79: Page 44, Black body, photoelectric, absorption spectra graphs
  { id: 'q79_diagram', page: 44, l: 0.12, t: 0.04, w: 0.78, h: 0.24 },
  // Q87: Page 48, probability density curves
  { id: 'q87_diagram', page: 48, l: 0.15, t: 0.10, w: 0.65, h: 0.20 },
  // Q90: Page 50, radial distribution function for 3s
  { id: 'q90_diagram', page: 50, l: 0.15, t: 0.10, w: 0.55, h: 0.20 },
  // Q111: Page 62, orbital box diagram of Ge
  { id: 'q111_diagram', page: 62, l: 0.15, t: 0.08, w: 0.70, h: 0.18 },
  // Q127: Page 70, psi^2 vs r plot for 2s
  { id: 'q127_diagram', page: 70, l: 0.15, t: 0.08, w: 0.65, h: 0.22 },
  // Q140: Page 81, Moseley plot nu^n vs Z
  { id: 'q140_diagram', page: 81, l: 0.15, t: 0.08, w: 0.45, h: 0.20 },
  // Q141: Page 82, Black body radiation spectrum
  { id: 'q141_diagram', page: 82, l: 0.15, t: 0.06, w: 0.55, h: 0.22 },
  // Q143: Page 85, orbital shapes 2px, 2py, 2pz, dx2-y2, dz2
  { id: 'q143_diagram', page: 85, l: 0.15, t: 0.06, w: 0.70, h: 0.18 },
  // Q156: Page 96, Moseley's plots
  { id: 'q156_diagram', page: 96, l: 0.12, t: 0.06, w: 0.76, h: 0.24 },
  // Q159: Page 99, energy transition diagram
  { id: 'q159_diagram', page: 99, l: 0.15, t: 0.08, w: 0.45, h: 0.20 },
  // Q162: Page 101, probability density curves
  { id: 'q162_diagram', page: 101, l: 0.15, t: 0.08, w: 0.50, h: 0.20 },
  // Q177: Page 108, de-Broglie graphs lambda vs p
  { id: 'q177_diagram', page: 108, l: 0.12, t: 0.06, w: 0.76, h: 0.22 },
  // Q185: Page 111, electromagnetic wave diagram
  { id: 'q185_diagram', page: 111, l: 0.15, t: 0.06, w: 0.60, h: 0.18 },
  // Q194: Page 116, Moseley plots sqrt(nu) vs Z
  { id: 'q194_diagram', page: 116, l: 0.12, t: 0.06, w: 0.76, h: 0.22 },
  // Q200: Page 119, E vs Z plots
  { id: 'q200_diagram', page: 119, l: 0.12, t: 0.06, w: 0.76, h: 0.22 },
  // Q203: Page 121, boundary surface diagram
  { id: 'q203_diagram', page: 121, l: 0.15, t: 0.08, w: 0.50, h: 0.18 },
  // Q208: Page 124, visible spectrum color bar
  { id: 'q208_diagram', page: 124, l: 0.15, t: 0.04, w: 0.65, h: 0.12 },
  // Q223: Page 137, wave function & probability density curves
  { id: 'q223_diagram', page: 137, l: 0.12, t: 0.04, w: 0.76, h: 0.30 },
  // Q224: Page 138, accelerated charged particles apparatus
  { id: 'q224_diagram', page: 138, l: 0.15, t: 0.18, w: 0.60, h: 0.22 }
];

async function cropAll() {
  console.log(`Cropping ${DIAGRAM_SPECS.length} diagrams...`);
  for (const spec of DIAGRAM_SPECS) {
    const pagePadded = String(spec.page).padStart(3, '0');
    const pagePath = path.join(PAGES_DIR, `page_${pagePadded}.png`);
    if (!fs.existsSync(pagePath)) {
      console.error(`Page not found: ${pagePath}`);
      continue;
    }

    const img = await loadImage(pagePath);
    const W = img.width;
    const H = img.height;

    const cropX = Math.round(spec.l * W);
    const cropY = Math.round(spec.t * H);
    const cropW = Math.round(spec.w * W);
    const cropH = Math.round(spec.h * H);

    const canvas = createCanvas(cropW, cropH);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    const outPath = path.join(OUT_DIR, `${spec.id}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped ${spec.id} from page ${spec.page} -> ${outPath}`);
  }
  console.log('Finished cropping diagrams!');
}

cropAll().catch(console.error);
