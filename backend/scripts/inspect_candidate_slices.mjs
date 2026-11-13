import fs from 'fs';
import { loadImage } from '@napi-rs/canvas';

const candidateQs = [2, 7, 11, 38, 63, 77, 85, 96, 118];

async function inspectCandidates() {
  for (const q of candidateQs) {
    const imgPath = `backend/scripts/dn_q_slices/q_${q}.png`;
    if (fs.existsSync(imgPath)) {
      const img = await loadImage(imgPath);
      console.log(`Q${q}: width=${img.width}, height=${img.height}`);
    }
  }
}

inspectCandidates().catch(console.error);

