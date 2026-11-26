import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseDir = process.cwd().endsWith('backend') ? path.resolve('scripts') : path.resolve('backend/scripts');
const pagesDir = path.join(baseDir, 'electrochem_pages');
const outDir = path.join(baseDir, 'electrochem_diagrams');
fs.mkdirSync(outDir, { recursive: true });

const diagrams = [
  { id: 'q20_table', page: 4, left: 270, top: 1250, width: 680, height: 140 },
  { id: 'q78_graphs', page: 27, left: 270, top: 40, width: 680, height: 420 },
  { id: 'q79_structures', page: 27, left: 270, top: 1000, width: 680, height: 260 },
  { id: 'q91_cell_apparatus', page: 32, left: 260, top: 510, width: 700, height: 410 },
  { id: 'q94_graph', page: 33, left: 270, top: 720, width: 680, height: 210 },
  { id: 'q116_match_table', page: 42, left: 270, top: 30, width: 680, height: 80 },
  { id: 'q138_match_table', page: 49, left: 270, top: 30, width: 680, height: 140 },
  { id: 'q142_titration_curves', page: 52, left: 270, top: 40, width: 680, height: 380 },
  { id: 'q146_graph', page: 54, left: 270, top: 40, width: 680, height: 360 },
  { id: 'q164_battery', page: 62, left: 270, top: 40, width: 680, height: 160 },
  { id: 'q167_graph', page: 64, left: 270, top: 50, width: 680, height: 150 },
  { id: 'q189_cell', page: 70, left: 270, top: 50, width: 680, height: 150 },
  { id: 'q194_graph', page: 72, left: 270, top: 40, width: 680, height: 210 },
  { id: 'q195_match_table', page: 72, left: 270, top: 480, width: 680, height: 190 },
  { id: 'q199_latimer_diagram', page: 73, left: 270, top: 480, width: 680, height: 60 },
  { id: 'q203_graph', page: 75, left: 270, top: 40, width: 680, height: 290 },
  { id: 'q207_graph', page: 76, left: 270, top: 760, width: 680, height: 130 },
  { id: 'q209_match_table', page: 77, left: 270, top: 620, width: 680, height: 160 },
  { id: 'q214_titration_curve', page: 79, left: 270, top: 40, width: 680, height: 360 },
  { id: 'q217_cell_apparatus', page: 80, left: 270, top: 600, width: 680, height: 350 },
  { id: 'q223_daniell_plots', page: 83, left: 270, top: 40, width: 680, height: 390 },
  { id: 'q228_concentration_cell', page: 86, left: 270, top: 40, width: 680, height: 470 },
  { id: 'q233_table', page: 88, left: 270, top: 370, width: 680, height: 150 },
  { id: 'q240_graph', page: 95, left: 270, top: 40, width: 680, height: 100 }
];

for (const d of diagrams) {
  const pageFile = path.join(pagesDir, `page_${String(d.page).padStart(3, '0')}.png`);
  const outFile = path.join(outDir, `${d.id}.png`);
  await sharp(pageFile)
    .extract({ left: d.left, top: d.top, width: d.width, height: d.height })
    .toFile(outFile);
  console.log(`Cropped ${d.id}.png`);
}
console.log('All diagrams successfully cropped.');
