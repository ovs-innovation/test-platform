import sharp from 'sharp';

async function check() {
  const meta = await sharp('./backend/scripts/animal_kingdom_diagrams/q_81.png').metadata();
  console.log('q_81 meta:', meta.width, meta.height);
}
check().catch(console.error);

