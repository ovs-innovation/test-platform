import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'jee_pblock_pages');
const outDir = path.resolve(__dirname, 'pblock_diagrams');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Page dimension is 918 x 1188
// Let's define the initial bounding boxes [x, y, w, h] based on visual examination of the 51 pages
const diagramDefs = [
  // Page 2: Q6 diborane structure (solution box)
  { id: 'q6_diagram', page: 2, box: [100, 665, 230, 95] },
  // Page 3: Q8 CaC2 structure (solution box)
  { id: 'q8_diagram', page: 3, box: [115, 135, 185, 95] },
  // Page 3: Q9 SiO2 network (solution box)
  { id: 'q9_diagram', page: 3, box: [115, 470, 260, 150] },
  // Page 4: Q11 Silicone polymer reaction
  { id: 'q11_diagram', page: 4, box: [120, 185, 710, 205] },
  // Page 9: Q23 BCl3-NH3 adduct
  { id: 'q23_diagram', page: 9, box: [110, 210, 480, 110] },
  // Page 10: Q25 Structure of diborane
  { id: 'q25_diagram', page: 10, box: [115, 200, 400, 125] },
  // Page 13: Q33 P4 molecule
  { id: 'q33_diagram', page: 13, box: [120, 210, 580, 335] },
  // Page 16: Q39 Al2O3 leaching flowchart
  { id: 'q39_diagram', page: 16, box: [115, 205, 730, 420] },
  // Page 17: Q40 Diborane angles
  { id: 'q40_diagram', page: 17, box: [115, 215, 430, 150] },
  // Page 18: Q43 C60 structure
  { id: 'q43_diagram', page: 18, box: [110, 650, 300, 160] },
  // Page 19: Q44 Diborane orbitals
  { id: 'q44_diagram', page: 19, box: [115, 345, 490, 135] },
  // Page 20: Q47 BF3 back bonding
  { id: 'q47_diagram', page: 20, box: [115, 175, 415, 150] },
  // Page 21: Q48 Diborane 3C-2e bond
  { id: 'q48_diagram', page: 21, box: [100, 380, 720, 520] },
  // Page 22: Q49 N2O4 planar structure
  { id: 'q49_diagram', page: 22, box: [305, 335, 220, 155] },
  // Page 24: Q54 BH3-NMe3 adduct
  { id: 'q54_diagram', page: 24, box: [115, 565, 210, 130] },
  // Page 26: Q56 Boric acid hydration reaction
  { id: 'q56_diagram', page: 26, box: [110, 435, 735, 400] },
  // Page 30: Q63 Boric acid network in solid phase
  { id: 'q63_diagram', page: 30, box: [115, 185, 385, 290] },
  // Page 31: Q64 Phenomenon of back bonding in BF3
  { id: 'q64_diagram', page: 31, box: [115, 225, 715, 405] },
  // Page 32: Q66 BeCl2 structures
  { id: 'q66_diagram', page: 32, box: [115, 425, 725, 295] },
  // Page 34: Q71 [BF4]- tetrahedral
  { id: 'q71_diagram', page: 34, box: [115, 485, 250, 190] },
  // Page 41: Q85 Melting point table
  { id: 'q85_diagram', page: 41, box: [115, 550, 220, 315] },
];

async function cropAll() {
  for (const def of diagramDefs) {
    const pad = String(def.page).padStart(3, '0');
    const pageImgPath = path.join(pagesDir, `page_${pad}.png`);
    if (!fs.existsSync(pageImgPath)) {
      console.error(`Page image missing: ${pageImgPath}`);
      continue;
    }
    const pageImg = await loadImage(pageImgPath);
    const [x, y, w, h] = def.box;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(pageImg, x, y, w, h, 0, 0, w, h);

    const outPath = path.join(outDir, `${def.id}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Cropped ${def.id} (${w}x${h}) from Page ${def.page}`);
  }
}

cropAll().catch(console.error);
