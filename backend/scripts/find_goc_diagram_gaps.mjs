import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const positions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_q_positions.json'), 'utf8'));
const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_pdf_items.json'), 'utf8'));

// Filter out noise items like "Open solution" or right-sidebar items
function isValidContentItem(it) {
  if (it.x > 950) return false; // Open solution or right sidebar
  if (/^Open solution$/i.test(it.str.trim())) return false;
  return true;
}

const diagramAnalysis = [];

for (let q = 1; q <= 337; q++) {
  const pos = positions.find(p => p.qNum === q);
  const pNum = pos.pageNum;
  const nextPos = positions.find(p => p.pageNum === pNum && p.y > pos.y);
  const yEnd = nextPos ? nextPos.y : 1530;

  const qItems = items
    .filter(it => it.pageNum === pNum && it.y >= pos.y - 5 && it.y < yEnd && isValidContentItem(it))
    .sort((a,b) => a.y - b.y);

  // Group items by line (items within 10px vertically)
  const lines = [];
  for (const it of qItems) {
    const existing = lines.find(l => Math.abs(l.y - it.y) < 10);
    if (existing) {
      existing.items.push(it);
      existing.str += ' ' + it.str;
    } else {
      lines.push({ y: it.y, items: [it], str: it.str });
    }
  }
  lines.sort((a,b) => a.y - b.y);

  // Find gaps between lines > 55px
  const largeGaps = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const gap = lines[i+1].y - lines[i].y;
    if (gap > 55) {
      largeGaps.push({
        yTop: Math.round(lines[i].y + 20),
        yBottom: Math.round(lines[i+1].y - 5),
        gap: Math.round(gap),
        afterText: lines[i].str.slice(0, 30),
        beforeText: lines[i+1].str.slice(0, 30)
      });
    }
  }

  // Also check gap after last line before yEnd if numerical or if options ended high
  const lastLine = lines[lines.length - 1];
  if (lastLine && (yEnd - lastLine.y) > 100) {
    largeGaps.push({
      yTop: Math.round(lastLine.y + 20),
      yBottom: Math.round(yEnd - 10),
      gap: Math.round(yEnd - lastLine.y),
      afterText: lastLine.str.slice(0, 30),
      beforeText: '[END OF Q]'
    });
  }

  if (largeGaps.length > 0) {
    diagramAnalysis.push({
      qNum: q,
      pageNum: pNum,
      gapCount: largeGaps.length,
      largeGaps
    });
  }
}

console.log(`Questions with gaps > 55px: ${diagramAnalysis.length} / 337`);
console.log('Sample gaps:', JSON.stringify(diagramAnalysis.slice(0, 5), null, 2));
fs.writeFileSync(path.resolve(__dirname, 'goc_diagram_gaps.json'), JSON.stringify(diagramAnalysis, null, 2));
