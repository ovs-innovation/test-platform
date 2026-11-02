import sharp from 'sharp';
import fs from 'fs';

async function sliceQuestions() {
  const meta80 = await sharp('backend/uploads/bio/pages_hires/page80.png').metadata();
  const meta81 = await sharp('backend/uploads/bio/pages_hires/page81.png').metadata();

  const outDir = 'backend/uploads/bio/slices';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Page 80 left column: 0 to midX
  const mid80 = Math.floor(meta80.width / 2);
  const mid81 = Math.floor(meta81.width / 2);

  // Let's slice Page 80 Left in 4 vertical parts
  const h80 = meta80.height;
  const step80 = Math.floor(h80 / 4);
  for (let i = 0; i < 4; i++) {
    await sharp('backend/uploads/bio/pages_hires/page80.png')
      .extract({ left: 0, top: i * step80, width: mid80, height: Math.min(step80 + 50, h80 - i * step80) })
      .toFile(`${outDir}/p80_col1_part${i+1}.png`);
      
    await sharp('backend/uploads/bio/pages_hires/page80.png')
      .extract({ left: mid80, top: i * step80, width: meta80.width - mid80, height: Math.min(step80 + 50, h80 - i * step80) })
      .toFile(`${outDir}/p80_col2_part${i+1}.png`);
  }

  // Page 81
  const h81 = meta81.height;
  const step81 = Math.floor(h81 / 4);
  for (let i = 0; i < 4; i++) {
    await sharp('backend/uploads/bio/pages_hires/page81.png')
      .extract({ left: 0, top: i * step81, width: mid81, height: Math.min(step81 + 50, h81 - i * step81) })
      .toFile(`${outDir}/p81_col1_part${i+1}.png`);
      
    await sharp('backend/uploads/bio/pages_hires/page81.png')
      .extract({ left: mid81, top: i * step81, width: meta81.width - mid81, height: Math.min(step81 + 50, h81 - i * step81) })
      .toFile(`${outDir}/p81_col2_part${i+1}.png`);
  }

  console.log('Slices saved successfully');
}

sliceQuestions().catch(console.error);

