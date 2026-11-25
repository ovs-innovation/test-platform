import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Search for questions and find figure mentions
const figureKeywords = ['shown in the figure', 'as shown in figure', 'shown below', 'figure shows', 'in the figure', 'following figure', 'given figure', 'represented by', 'variation of', 'graph shows', 'graph represents', 'plot of', 'shown in fig'];

const figureMentions = [];

for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  const lower = text.toLowerCase();
  for (const kw of figureKeywords) {
    if (lower.includes(kw)) {
      figureMentions.push({ page: p, keyword: kw, snippet: text.slice(Math.max(0, lower.indexOf(kw) - 100), lower.indexOf(kw) + 150).replace(/\n/g, ' ') });
      break;
    }
  }
}

console.log(`Found ${figureMentions.length} pages mentioning figures/graphs:`);
for (const m of figureMentions) {
  console.log(`Page ${m.page} [${m.keyword}]: ${m.snippet}`);
}

fs.writeFileSync(path.resolve(__dirname, 'gravitation_figure_mentions.json'), JSON.stringify(figureMentions, null, 2));
