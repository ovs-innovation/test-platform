import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw171 = fs.readFileSync(path.resolve(__dirname, 'electrostatics_page171_raw.txt'), 'utf8');
const lines171 = raw171.split('\n').filter(l => l.trim() && !l.includes('Answer key'));

console.log(`Processing ${lines171.length} lines (should be 50 lines)...`);

const parsedGrid = [];

for (let lineIdx = 0; lineIdx < lines171.length; lineIdx++) {
  const line = lines171[lineIdx].trim();
  const startQ = lineIdx * 6 + 1;
  
  // Normalize spacing around dots: "105. 48" -> "105.48", "57. A" -> "57.A"
  const normalized = line.replace(/(\d+)\.\s+([A-Za-z0-9]+)/g, '$1.$2');
  const tokens = normalized.split(/\s+/).filter(Boolean);
  
  console.log(`Line ${lineIdx + 1} (Q${startQ}..Q${startQ + 5}) [${tokens.length} items]: ${tokens.join(' | ')}`);
  parsedGrid.push({ lineIdx, startQ, tokens, raw: line });
}

fs.writeFileSync(path.resolve(__dirname, 'electrostatics_parsed_grid.json'), JSON.stringify(parsedGrid, null, 2));
