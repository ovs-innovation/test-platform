import { cropDiagram } from './crop_solids_diagrams.mjs';

const DIAGRAM_CONFIGS = [
  { qNum: 5, page: 2, box: { x: 0.15, y: 0.47, w: 0.50, h: 0.22 } },
  { qNum: 8, page: 4, box: { x: 0.65, y: 0.03, w: 0.30, h: 0.28 } },
  { qNum: 11, page: 7, box: { x: 0.38, y: 0.06, w: 0.35, h: 0.25 } },
  { qNum: 14, page: 8, box: { x: 0.13, y: 0.49, w: 0.42, h: 0.26 } },
  { qNum: 17, page: 11, box: { x: 0.28, y: 0.09, w: 0.25, h: 0.44 } },
  { qNum: 20, page: 13, box: { x: 0.12, y: 0.09, w: 0.36, h: 0.13 } },
  { qNum: 27, page: 17, box: { x: 0.15, y: 0.17, w: 0.75, h: 0.20 } },
  { qNum: 41, page: 26, box: { x: 0.22, y: 0.08, w: 0.30, h: 0.25 } },
  { qNum: 42, page: 27, box: { x: 0.50, y: 0.10, w: 0.27, h: 0.25 } },
  { qNum: 47, page: 29, box: { x: 0.28, y: 0.06, w: 0.45, h: 0.22 } },
  { qNum: 53, page: 32, box: { x: 0.18, y: 0.11, w: 0.35, h: 0.28 } },
  { qNum: 61, page: 36, box: { x: 0.15, y: 0.15, w: 0.75, h: 0.54 } },
  { qNum: 70, page: 43, box: { x: 0.14, y: 0.10, w: 0.55, h: 0.46 } },
  { qNum: 80, page: 52, box: { x: 0.18, y: 0.09, w: 0.65, h: 0.35 } },
  { qNum: 83, page: 54, box: { x: 0.22, y: 0.11, w: 0.45, h: 0.35 } },
  { qNum: 90, page: 59, box: { x: 0.60, y: 0.10, w: 0.28, h: 0.14 } },
  { qNum: 101, page: 67, box: { x: 0.13, y: 0.06, w: 0.77, h: 0.44 } },
  { qNum: 107, page: 73, box: { x: 0.14, y: 0.10, w: 0.25, h: 0.32 } },
  { qNum: 113, page: 79, box: { x: 0.12, y: 0.09, w: 0.75, h: 0.56 } }
];

async function run() {
  console.log(`Starting crop of ${DIAGRAM_CONFIGS.length} question diagrams...`);
  const results = {};

  for (const item of DIAGRAM_CONFIGS) {
    const url = await cropDiagram(item.page, item.qNum, item.box);
    results[item.qNum] = url;
  }

  console.log('\nAll diagrams cropped successfully!');
  console.log(JSON.stringify(results, null, 2));
}

run().catch(err => {
  console.error('Cropping failed:', err);
  process.exit(1);
});
