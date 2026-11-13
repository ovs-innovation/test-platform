import sharp from 'sharp';

async function scanDiagramBounds(page, yMin, yMax, xMin = 60, xMax = 700) {
  const input = `./scripts/neural_rendered_pages/page_${page}.png`;
  const img = sharp(input);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  // Print row by row dark pixel count (R < 150, G < 150, B < 150)
  const rowCounts = [];
  for (let y = yMin; y <= yMax; y++) {
    let count = 0;
    for (let x = xMin; x <= xMax; x++) {
      const idx = (y * info.width + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Dark pixel (not white/light grey watermark)
      if (r < 150 && g < 150 && b < 150) {
        count++;
      }
    }
    rowCounts.push({ y, count });
  }

  // Find gaps (rows where count is 0)
  return rowCounts;
}

async function main() {
  console.log('--- Page 6 Q18 (y 470 to 880) ---');
  const q18 = await scanDiagramBounds(6, 470, 880);
  const q18Gaps = q18.filter(r => r.count === 0).map(r => r.y);
  console.log('Q18 gaps near top:', q18Gaps.filter(y => y < 550));
  console.log('Q18 gaps near bottom:', q18Gaps.filter(y => y > 800));

  console.log('--- Page 6 Q19 (y 1000 to 1420) ---');
  const q19 = await scanDiagramBounds(6, 1000, 1420);
  const q19Gaps = q19.filter(r => r.count === 0).map(r => r.y);
  console.log('Q19 gaps near top:', q19Gaps.filter(y => y < 1070));
  console.log('Q19 gaps near bottom:', q19Gaps.filter(y => y > 1350));

  console.log('--- Page 7 Q21 (y 340 to 800) ---');
  const q21 = await scanDiagramBounds(7, 340, 800);
  const q21Gaps = q21.filter(r => r.count === 0).map(r => r.y);
  console.log('Q21 gaps near top:', q21Gaps.filter(y => y < 450));
  console.log('Q21 gaps near bottom:', q21Gaps.filter(y => y > 730));

  console.log('--- Page 16 Q66 (y 680 to 1130) ---');
  const q66 = await scanDiagramBounds(16, 680, 1130);
  const q66Gaps = q66.filter(r => r.count === 0).map(r => r.y);
  console.log('Q66 gaps near top:', q66Gaps.filter(y => y < 770));
  console.log('Q66 gaps near bottom:', q66Gaps.filter(y => y > 1050));

  console.log('--- Page 18 Q71 (y 210 to 600) ---');
  const q71 = await scanDiagramBounds(18, 210, 600);
  const q71Gaps = q71.filter(r => r.count === 0).map(r => r.y);
  console.log('Q71 gaps near top:', q71Gaps.filter(y => y < 290));
  console.log('Q71 gaps near bottom:', q71Gaps.filter(y => y > 500));
}

main().catch(console.error);

