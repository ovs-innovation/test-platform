import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);

const p169 = pages.find(p => p.page === 169);

const linesWithCoords = p169.lines.map((l, idx) => {
  const wList = Array.isArray(l.Words) ? l.Words : (l.Words ? [l.Words] : []);
  const minX = Math.min(...wList.map(w => w.X));
  const minY = Math.min(...wList.map(w => w.Y));
  return { idx, text: l.Text, x: minX, y: minY };
});

// Group by columns: let's see distribution of X
linesWithCoords.sort((a, b) => a.x - b.x || a.y - b.y);

// Find X clusters
const xClusters = [];
for (const item of linesWithCoords) {
  let cluster = xClusters.find(c => Math.abs(c.x - item.x) < 50);
  if (!cluster) {
    cluster = { x: item.x, items: [] };
    xClusters.push(cluster);
  }
  cluster.items.push(item);
}

console.log(`Found ${xClusters.length} X-clusters (columns):`);
xClusters.forEach((c, idx) => {
  console.log(`Column ${idx} (X ~ ${Math.round(c.x)}): ${c.items.length} lines`);
  c.items.sort((a, b) => a.y - b.y);
  console.log(`  First 5: ${c.items.slice(0, 5).map(it => it.text).join(' | ')}`);
  console.log(`  Last 5: ${c.items.slice(-5).map(it => it.text).join(' | ')}`);
});

