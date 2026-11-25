import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cleanPhysicsProse } from './clean_physics_prose.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'exact_408_page_map.json'), 'utf8'));
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_official_keys.json'), 'utf8'));
const diags = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_clean_diagram_urls.json'), 'utf8'));

// Function to split options from a block of text
function parseOptions(text) {
  // Look for lines or text containing [A], [B], [C], [D] or (A), (B), (C), (D) or 1), 2), 3), 4)
  // Let's test standard patterns:
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Find where options start
  let optStartIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^[\[\(\{]?(?:A|[13]|CP|OEY|€|4|18|\{Al|LA\))[\.\:\)\}\]\s]/i.test(lines[i])) {
      optStartIdx = i;
      break;
    }
  }
  
  if (optStartIdx === -1) return null;
  
  // Gather option lines up to "Answer" or "Sol"
  const optLines = [];
  for (let i = optStartIdx; i < lines.length; i++) {
    if (/(?:ans|answer|solution|sol\.|\bKVL\b|\bUsing\b)\s*[\:\=]/i.test(lines[i])) break;
    optLines.push(lines[i]);
  }
  
  return optLines;
}

console.log('Options parser helper ready.');
