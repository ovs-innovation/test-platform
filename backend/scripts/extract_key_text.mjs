import fs from 'fs';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795538740502_db6ca06c.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [251, 252]) {
    console.log(`\n================ PAGE ${pageNum} ================`);
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    const items = content.items.map(it => ({ str: it.str.trim(), x: Math.round(it.transform[4]), y: Math.round(it.transform[5]) })).filter(it => it.str.length > 0);
    console.log(`Total items on page ${pageNum}:`, items.length);
    console.log(items.slice(0, 40).map(i => `${i.str} (${i.x},${i.y})`).join(' | '));
    fs.writeFileSync(`backend/scripts/ray_key_items_p${pageNum}.json`, JSON.stringify(items, null, 2));
  }
}

main().catch(console.error);
