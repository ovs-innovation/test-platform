import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794377569383_a03a5c85.pdf';

// List of all questions with diagrams
const type1 = [
  1, 2, 3, 6, 7, 8, 10, 12, 13, 19, 20, 22, 25, 33, 35, 36,
  38, 40, 42, 43, 44, 45, 46, 47, 49, 51, 54, 55, 56, 58, 59,
  63, 65, 66, 71, 74, 75, 76, 77, 92, 95, 97, 107, 112, 116,
  126, 128, 130, 139
];

const type2 = [
  4, 15, 28, 30, 41, 48, 60, 78, 88, 99, 110, 118
];

const allTargetQs = [...type1, ...type2].sort((a, b) => a - b);

async function findBounds() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const positions = JSON.parse(fs.readFileSync('backend/scripts/semi_q_positions.json', 'utf8'));

  const specs = [];

  for (const t of allTargetQs) {
    const qPos = positions.find(p => p.qNum === t);
    const page = await doc.getPage(qPos.page);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    const nextQ = positions.find(p => p.page === qPos.page && p.qNum > t);
    const maxY = nextQ ? nextQ.rawY - 50 : 1550;

    const itemsInQ = [];
    for (const item of textContent.items) {
      const [,, , , tx, ty] = item.transform;
      const [x, y] = viewport.convertToViewportPoint(tx, ty);
      if (y >= qPos.rawY - 45 && y <= maxY) {
        itemsInQ.push({
          str: item.str,
          x: Math.round(x),
          y: Math.round(y),
          w: Math.round(item.width * 2),
          h: Math.round(item.height * 2)
        });
      }
    }

    itemsInQ.sort((a, b) => a.y - b.y);

    let textEndY = qPos.rawY;
    let optStartY = maxY;

    const isType2 = type2.includes(t);

    for (const it of itemsInQ) {
      const str = it.str.trim();
      if (!isType2 && (str.startsWith('(A)') || str === '(A)') && it.y > qPos.rawY + 40) {
        if (it.y < optStartY) optStartY = it.y;
      } else if (!str.includes('Open solution') && str.length > 0) {
        if (isType2) {
          // For type 2, question text ends before (A)
          if ((str.startsWith('(A)') || str === '(A)') && it.y > qPos.rawY + 30) {
            // text ended
          } else if (textEndY < it.y && !str.startsWith('(')) {
            textEndY = Math.max(textEndY, it.y);
          }
        } else {
          if (it.y < optStartY) {
            textEndY = Math.max(textEndY, it.y);
          }
        }
      }
    }

    const yMin = textEndY + 10;
    const yMax = isType2 ? maxY : optStartY - 10;

    specs.push({
      q: t,
      id: `semi_q${t}_diagram`,
      page: qPos.page,
      type: isType2 ? 'options_included' : 'prompt_diagram',
      yMin: Math.round(yMin),
      yMax: Math.round(yMax),
      xMin: 60,
      xMax: 1100
    });
  }

  console.log(`Computed specs for ${specs.length} diagrams.`);
  fs.writeFileSync('backend/scripts/semi_diagram_specs.json', JSON.stringify(specs, null, 2));
}

findBounds().catch(console.error);

