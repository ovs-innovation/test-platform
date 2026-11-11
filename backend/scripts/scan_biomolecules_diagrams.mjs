import fs from 'fs';
import path from 'path';
import { loadImage } from '@napi-rs/canvas';

// Check which slices have substantial graphical content or large vertical space without matching text lines
const textItems = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_text_items.json', 'utf8'));

async function scanDiagrams() {
  const suspected = [];
  for (let q = 1; q <= 81; q++) {
    const text = textItems[q] || '';
    // Look for keywords indicating structures or diagrams, e.g. "structure", "configuration", "compound", "given below", "following", etc.
    const isSuspect = /structure|configuration|formula|following compound|isomers|Fischer|Haworth|represented|shown|peptide|following reaction/i.test(text);
    const imgPath = `./backend/scripts/biomolecules_q_slices/q_${q}.png`;
    const img = await loadImage(imgPath);
    const height = img.height;
    
    // Also if height is large (> 400) or text has missing options (e.g. options are (A) (B) (C) (D) but with little text)
    suspected.push({
      q,
      height,
      textLength: text.length,
      ratio: height / Math.max(1, text.length),
      isSuspect
    });
  }

  suspected.sort((a,b) => b.ratio - a.ratio);
  console.log('Top suspected questions with diagrams (high height/text ratio):');
  for (const s of suspected.slice(0, 20)) {
    console.log(`Q${s.q}: height=${s.height}, textLen=${s.textLength}, ratio=${s.ratio.toFixed(2)}, isSuspect=${s.isSuspect}`);
  }
}

scanDiagrams().catch(console.error);
