import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PAGES_DIR = path.resolve(__dirname, 'mag_jee_pages');
const pagesText = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// We want to detect which pages have diagrams.
// A diagram region typically has connected components of dark pixels outside standard text line heights,
// or keywords like "figure", "shown", "diagram", "circuit", "graph"
async function detectDiagramPages() {
  const candidates = [];

  for (let p = 1; p <= 202; p++) {
    const text = pagesText[String(p)] || '';
    const hasKw = /(?:figure|shown|diagram|circuit|graph|loop\b.*subtend)/i.test(text);
    
    // Check image for large non-text whitespace gaps with graphic content
    const pPad = String(p).padStart(3, '0');
    const pPath = path.join(PAGES_DIR, `page_${pPad}.png`);
    if (!fs.existsSync(pPath)) continue;

    candidates.push({ p, hasKw, textSnippet: text.slice(0, 120).replace(/\n/g, ' ') });
  }

  console.log(`Scanned 202 pages. Found candidates.`);
  fs.writeFileSync(path.resolve(__dirname, 'mag_diagram_candidates.json'), JSON.stringify(candidates, null, 2));
}

detectDiagramPages().catch(console.error);
