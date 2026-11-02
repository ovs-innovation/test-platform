import sharp from 'sharp';

async function cropRightColQ47() {
  const p53Path = 'backend/uploads/bio/pages/page53_highres.png';
  const meta = await sharp(p53Path).metadata();
  
  // Right column starts around left = 480, top = 780 to 1280
  const left = Math.round(meta.width * 0.48);
  const width = meta.width - left;
  const top = Math.round(meta.height * 0.74);
  const height = Math.round(meta.height * 0.23);

  await sharp(p53Path)
    .extract({ left, top, width, height })
    .toFile('backend/uploads/bio/diagrams/bio_q47_diagram.png');
  console.log('Saved bio_q47_diagram.png');
}

cropRightColQ47().catch(console.error);

