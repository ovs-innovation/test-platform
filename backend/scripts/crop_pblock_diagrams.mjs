import sharp from 'sharp';
import fs from 'fs';

const pagesDir = './scripts/pblock_pages/';
const uploadsDir = './backend/uploads/pblock/';
const publicUploadsDir = '../frontend/public/uploads/pblock/';

async function fineTune() {
  // Q1: Structure of perchloric acid is: (1), (2), (3), (4)
  await sharp(pagesDir + 'pblock_page1_q1_12.png')
    .extract({ left: 5, top: 48, width: 135, height: 74 })
    .toFile(uploadsDir + 'pblock_q1_perchloric_acid.png');
  fs.copyFileSync(uploadsDir + 'pblock_q1_perchloric_acid.png', publicUploadsDir + 'pblock_q1_perchloric_acid.png');

  // Q95: Which of the following is correct structure of S2Cl2? (1), (2), (3), (4)
  await sharp(pagesDir + 'pblock_page6_q81_100.png')
    .extract({ left: 130, top: 162, width: 122, height: 32 })
    .toFile(uploadsDir + 'pblock_q95_s2cl2_structures.png');
  fs.copyFileSync(uploadsDir + 'pblock_q95_s2cl2_structures.png', publicUploadsDir + 'pblock_q95_s2cl2_structures.png');

  console.log('Fine-tuned crops for Q1 and Q95!');
}

fineTune().catch(console.error);
