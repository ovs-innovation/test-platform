import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const positions = JSON.parse(fs.readFileSync('backend/scripts/mag_matter_q_positions.json', 'utf8'));
const outDir = 'backend/scripts/mag_matter_q_slices';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function cropSlices() {
  const pageMeta = {};

  for (let i = 0; i < positions.length; i++) {
    const q = positions[i];
    const pageNum = q.page;
    const pagePath = `backend/scripts/mag_matter_pages/page_${pageNum}.png`;

    if (!pageMeta[pageNum]) {
      const meta = await sharp(pagePath).metadata();
      pageMeta[pageNum] = meta;
    }

    const imgHeight = pageMeta[pageNum].height;
    const imgWidth = pageMeta[pageNum].width;

    const top = Math.max(0, Math.round(q.rawY - 25));
    let bottom;
    if (i + 1 < positions.length && positions[i + 1].page === pageNum) {
      bottom = Math.round(positions[i + 1].rawY - 25);
    } else {
      bottom = imgHeight - 120; // avoid footer
    }

    const height = Math.max(50, bottom - top);
    const slicePath = path.join(outDir, `q_${q.qNum}.png`);

    await sharp(pagePath)
      .extract({
        left: 0,
        top: top,
        width: imgWidth,
        height: height
      })
      .toFile(slicePath);

    console.log(`Cropped Q${q.qNum} (p${pageNum}, y: ${top}->${bottom}, h: ${height})`);
  }
}

cropSlices().catch(console.error);
