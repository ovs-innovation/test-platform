import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/inheritance_pages_dump.json', 'utf8'));

// Scale is 2.0. Page height is 841.92 pt * 2 = 1683.84 px
const PAGE_HEIGHT = 841.92;
const SCALE = 2.0;

function ptToCanvasY(ptY) {
  return Math.round((PAGE_HEIGHT - ptY) * SCALE);
}

const diagramSpecs = [
  { qNum: 10, page: 4, topText: 'generation.', bottomText: '(A)' },
  { qNum: 34, page: 11, topText: 'analysis?', bottomText: 'Keep practising' },
  { qNum: 40, page: 13, topText: 'Pedigree analysis:', bottomText: 'Q41.' },
  { qNum: 86, page: 22, topText: 'given pedigree.', bottomText: '(A) X-linked' },
  { qNum: 106, page: 26, topText: 'this pattern ?', bottomText: '(A) Haemophilia' },
  { qNum: 117, page: 28, topText: 'character –', bottomText: '(A) The trait' },
  { qNum: 121, page: 29, topText: 'is correct –', bottomText: 'Q122.' },
  { qNum: 129, page: 31, topText: 'What does it show ?', bottomText: '(A) Inheritance' }
];

for (const spec of diagramSpecs) {
  const p = pages.find(x => x.page === spec.page);
  const topItem = p.items.find(i => i.str.includes(spec.topText));
  const bottomItem = p.items.find(i => i.str.includes(spec.bottomText));

  const topY = topItem ? ptToCanvasY(topItem.y) : null;
  const bottomY = bottomItem ? ptToCanvasY(bottomItem.y) : null;

  console.log(`Q${spec.qNum} (Page ${spec.page}): topY = ${topY}, bottomY = ${bottomY}, height = ${bottomY - topY}`);
}

