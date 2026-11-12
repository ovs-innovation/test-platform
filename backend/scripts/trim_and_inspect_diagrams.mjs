import sharp from 'sharp';

async function check() {
  for (const q of [58, 60, 62]) {
    const meta = await sharp(`./backend/scripts/structural_org_diagrams/q_${q}.png`).metadata();
    console.log(`q_${q} meta:`, meta.width, meta.height);
  }
}

check().catch(console.error);
