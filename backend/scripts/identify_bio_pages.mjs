import fs from 'fs';
import { createWorker } from 'tesseract.js';

const pageFiles = [
  'backend/uploads/bio/pages/img1_top_left.png',
  'backend/uploads/bio/pages/img1_top_right.png',
  'backend/uploads/bio/pages/img1_bottom_left.png',
  'backend/uploads/bio/pages/img1_bottom_right.png',

  'backend/uploads/bio/pages/img2_top_left.png',
  'backend/uploads/bio/pages/img2_top_right.png',
  'backend/uploads/bio/pages/img2_bottom_left.png',
  'backend/uploads/bio/pages/img2_bottom_right.png',

  'backend/uploads/bio/pages/img3_top_left.png',
  'backend/uploads/bio/pages/img3_top_right.png',
  'backend/uploads/bio/pages/img3_bottom_left.png',
  'backend/uploads/bio/pages/img3_bottom_right.png',

  'backend/uploads/bio/pages/img4_top_left.png',
  'backend/uploads/bio/pages/img4_top_right.png',
  'backend/uploads/bio/pages/img4_bottom_left.png',
  'backend/uploads/bio/pages/img4_bottom_right.png',

  'backend/uploads/bio/pages/img5_left.png',
  'backend/uploads/bio/pages/img5_right.png',
];

async function identifyPages() {
  const worker = await createWorker('eng');

  for (const pf of pageFiles) {
    const { data: { text } } = await worker.recognize(pf);
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const topLines = lines.slice(0, 5).join(' | ');
    // Find numbers followed by a dot or question mark
    const qNums = (text.match(/(?:^|\n)\s*(\d{1,3})\s*[\.\)]/g) || []).map(m => parseInt(m.replace(/[^\d]/g, ''), 10)).filter(n => n > 0 && n < 500);
    const minQ = qNums.length > 0 ? Math.min(...qNums) : 'none';
    const maxQ = qNums.length > 0 ? Math.max(...qNums) : 'none';
    console.log(`[${pf.split('/').pop()}] Qs: ${minQ}..${maxQ} (detected ${qNums.length} Q numbers). Top: ${topLines.slice(0, 80)}`);
  }

  await worker.terminate();
}

identifyPages().catch(console.error);
