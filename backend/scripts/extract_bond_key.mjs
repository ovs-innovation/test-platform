import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794398158580_62817da2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const key = {};

  for (const pageNum of [35, 36]) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const strings = textContent.items.map(i => i.str.trim()).filter(s => s.length > 0);

    for (let i = 0; i < strings.length; i++) {
      const match = strings[i].match(/^(\d+)\.$/);
      if (match) {
        const qNum = parseInt(match[1], 10);
        let ans = strings[i + 1];
        // Handle answers with commas like "A," "D" or "A, D"
        if (ans) {
          if (strings[i + 2] && (ans.endsWith(',') || strings[i + 2].match(/^[A-D]$/))) {
            ans = ans + ' ' + strings[i + 2];
          }
          ans = ans.replace(/\s+/g, ' ').trim();
        }
        key[qNum] = ans;
      }
    }
  }

  console.log(`Parsed ${Object.keys(key).length} keys:`);
  console.log(JSON.stringify(key, null, 2));

  fs.writeFileSync('backend/scripts/bond_official_key.json', JSON.stringify(key, null, 2));
  console.log('Saved to backend/scripts/bond_official_key.json');
}

main().catch(console.error);
