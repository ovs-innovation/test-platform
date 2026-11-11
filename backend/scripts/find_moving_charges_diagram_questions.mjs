import fs from 'fs';
import { loadImage } from '@napi-rs/canvas';

// List of questions that have diagrams based on visual inspection
const CANDIDATE_DIAGRAM_QS = [1, 4, 12, 20, 21, 27, 28, 32, 36, 39, 42, 49, 50, 62, 68, 77, 89];

async function checkSlices() {
  for (const qNum of CANDIDATE_DIAGRAM_QS) {
    const img = await loadImage(`backend/scripts/moving_charges_q_slices/q_${qNum}.png`);
    console.log(`Q${qNum}: slice dimensions ${img.width}x${img.height}`);
  }
}

checkSlices().catch(console.error);
