import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.join(__dirname, 'kinetics_tsv_cache.json'), 'utf8'));

// All 235 question starts
const starts = [];
for (let p = 1; p <= 135; p++) {
  const lines = cache[p]?.lines || [];
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx];
    if (l.left >= 140 && l.left <= 165) {
      if (p === 1 && l.top < 250) continue;
      starts.push({ qNum: starts.length + 1, page: p, lineIdx: idx, top: l.top, left: l.left, text: l.text });
    }
  }
}

const outDir = path.resolve(__dirname, 'kinetics_diagrams');
fs.mkdirSync(outDir, { recursive: true });

// Specific diagram bounding box definitions or automatic boundary finder
// For each question, we define the crop box: [left, top, right, bottom]
// Page dimensions are 1224 x 1584.
const DIAGRAM_SPECS = {
  31: { page: 11, top: 110, bottom: 440, left: 160, right: 1060 }, // plot of log(t1/2) vs log(a)
  62: { page: 31, top: 100, bottom: 620, left: 160, right: 1060 }, // plots for Arrhenius
  67: { page: 34, top: 70, bottom: 380, left: 160, right: 1060 },  // plot of ln k vs 1/T
  70: { page: 37, top: 70, bottom: 370, left: 160, right: 1060 },  // concentration vs time plots
  71: { page: 38, top: 70, bottom: 280, left: 160, right: 1060 },  // enthalpy plot (reaction profile)
  84: { page: 45, top: 90, bottom: 480, left: 160, right: 1060 },  // equilibrium rate plots (A, B, C, D)
  88: { page: 47, top: 80, bottom: 350, left: 160, right: 1060 },  // ln k vs 1/T graph
  93: { page: 50, top: 100, bottom: 430, left: 160, right: 1060 }, // plot of log k vs 1/T
  107: { page: 56, top: 60, bottom: 460, left: 160, right: 1060 }, // (a), (b), (c), (d), (e) graphs
  116: { page: 61, top: 100, bottom: 720, left: 160, right: 1060 },// graphs representing endothermic reaction (A, B, C, D)
  117: { page: 62, top: 70, bottom: 520, left: 160, right: 1060 }, // acetaldehyde rate constants table/graph
  136: { page: 72, top: 60, bottom: 420, left: 160, right: 1060 }, // graph of ln k vs 1/T
  143: { page: 77, top: 80, bottom: 330, left: 160, right: 1060 }, // rate of formation of product plot
  151: { page: 82, top: 90, bottom: 620, left: 160, right: 1060 }, // reaction profile graphs (A, B, C, D)
  154: { page: 84, top: 120, bottom: 450, left: 160, right: 1060 },// reaction coordinate diagram
  156: { page: 85, top: 35, bottom: 660, left: 160, right: 1060 }, // reaction profile with/without catalyst (A, B, C, D)
  183: { page: 99, top: 620, bottom: 820, left: 240, right: 980 }, // Statement II concentration vs time plot
  187: { page: 101, top: 30, bottom: 200, left: 160, right: 1060 },// activated complex reaction coordinate figure
  189: { page: 102, top: 40, bottom: 540, left: 160, right: 1060 },// which graph most appropriately represents (A, B, C, D)
  190: { page: 103, top: 100, bottom: 450, left: 160, right: 1060 },// Statement I t1/2 vs [A] graph
  192: { page: 105, top: 80, bottom: 380, left: 160, right: 1060 }, // t1/2 vs [R]0 plot and statements
  194: { page: 106, top: 110, bottom: 700, left: 160, right: 1060 },// bacterial growth curves (A, B, C, D)
  197: { page: 108, top: 50, bottom: 330, left: 160, right: 1060 }, // t1/2 vs 1/[A]0 plot
  198: { page: 109, top: 70, bottom: 660, left: 160, right: 1060 }, // plot of rate vs [A]
  199: { page: 110, top: 110, bottom: 600, left: 160, right: 1060 },// reaction mechanism coordinate plots (A, B, C, D)
  205: { page: 113, top: 80, bottom: 510, left: 160, right: 1060 }, // log k vs 1/T for three reactions I, II, III
  207: { page: 115, top: 200, bottom: 680, left: 160, right: 1060 },// Before/After graphs (A, B, C, D)
  216: { page: 120, top: 70, bottom: 400, left: 160, right: 1060 }, // decomposition curves
  217: { page: 120, top: 460, bottom: 1030, left: 160, right: 1060 },// initial phase of reaction table/plot
  228: { page: 129, top: 40, bottom: 330, left: 160, right: 1060 }, // variation of reactant concentration with time graph
  232: { page: 133, top: 40, bottom: 520, left: 160, right: 1060 }, // Arrhenius plot for decomposition
  235: { page: 135, top: 60, bottom: 430, left: 160, right: 1060 }  // Statements and log k vs 1/T plot
};

async function main() {
  console.log('Cropping all defined diagrams...');
  const results = {};

  for (const [qStr, spec] of Object.entries(DIAGRAM_SPECS)) {
    const qNum = parseInt(qStr);
    const pageNum = spec.page;
    const pageImgPath = path.join(__dirname, 'kinetics_pages', `page_${String(pageNum).padStart(3, '0')}.png`);
    if (!fs.existsSync(pageImgPath)) {
      console.error(`Page not found: ${pageImgPath}`);
      continue;
    }

    const img = await loadImage(pageImgPath);
    const width = spec.right - spec.left;
    const height = spec.bottom - spec.top;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, spec.left, spec.top, width, height, 0, 0, width, height);

    const outPath = path.join(outDir, `q${qNum}_diagram.png`);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(outPath, buf);
    console.log(`Saved Q${qNum} diagram: ${outPath} (${width}x${height}, ${buf.length} bytes)`);
    results[qNum] = `q${qNum}_diagram.png`;
  }

  console.log(`Successfully cropped ${Object.keys(results).length} diagrams.`);
}

main().catch(console.error);
