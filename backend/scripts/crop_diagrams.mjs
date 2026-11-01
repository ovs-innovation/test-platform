import sharp from 'sharp';

async function main() {
  const crops = [
    { id: 'q30', page: 13, left: 30, top: 250, width: 500, height: 180 },
    { id: 'q40', page: 22, left: 0, top: 190, width: 780, height: 260 },
    { id: 'q48', page: 29, left: 30, top: 200, width: 620, height: 340 },
    { id: 'q57', page: 35, left: 170, top: 215, width: 615, height: 575 },
    { id: 'q61', page: 37, left: 100, top: 650, width: 620, height: 320 },
    { id: 'q64', page: 39, left: 35, top: 165, width: 560, height: 320 },
    { id: 'q71', page: 44, left: 30, top: 220, width: 750, height: 430 },
  ];

  for (const c of crops) {
    const inputPath = `scripts/complex_pages/page_${c.page}.png`;
    const outputPath = `scripts/complex_pages/diagram_${c.id}.png`;
    await sharp(inputPath)
      .extract({ left: c.left, top: c.top, width: c.width, height: c.height })
      .toFile(outputPath);
    console.log(`Cropped ${c.id}`);
  }
}

main().catch(console.error);
