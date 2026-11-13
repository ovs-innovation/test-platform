import sharp from 'sharp';

async function trimQ81() {
  const trimmed = await sharp('./backend/scripts/animal_kingdom_diagrams/q_81.png')
    .trim()
    .toFile('./backend/scripts/animal_kingdom_diagrams/q_81_trimmed.png');
  console.log('Trimmed metadata:', trimmed);
}

trimQ81().catch(console.error);

