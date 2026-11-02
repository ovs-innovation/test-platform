import sharp from 'sharp';
import fs from 'fs';

async function main() {
  const meta = await sharp('backend/uploads/structural_organisation/pages_hires2/p199_c2.png').metadata();
  console.log('p199_c2 size:', meta.width, meta.height);

  // Let's crop q13-q16, q17-q19, q20-q23
  await sharp('backend/uploads/structural_organisation/pages_hires2/p199_c2.png')
    .extract({ left: 10, top: 0, width: meta.width - 20, height: 600 })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p199_part1.png');

  await sharp('backend/uploads/structural_organisation/pages_hires2/p199_c2.png')
    .extract({ left: 10, top: 580, width: meta.width - 20, height: 600 })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p199_part2.png');

  await sharp('backend/uploads/structural_organisation/pages_hires2/p199_c2.png')
    .extract({ left: 10, top: 1160, width: meta.width - 20, height: meta.height - 1160 })
    .toFile('backend/uploads/structural_organisation/pages_hires2/p199_part3.png');

  console.log('Cropped 3 parts!');
}

main().catch(console.error);

