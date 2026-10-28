import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('scripts/microbes_pages');

const mapping = [
  // Page 68-69: Q1 to Q19
  { name: 'microbes_p68_69.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793195063503.png' },
  // Page 70-71: Q43 to Q67 (media_1793195225682 or media_1793195129185 or others)
  // Let's check which media was page 70-71:
  // In previous script:
  // media_1793195225682 was rotated to page_76_77.png, which displayed page 70-71!
  { name: 'microbes_p70_71.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793195225682.png' },
  // Page 72-73: Q68 to Q93 (was media_1793195181333, rotated to page_74_75.png)
  { name: 'microbes_p72_73.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793195181333.png' },
  // Page 74-75: Q94 to Q116 (was media_1793195167106, rotated to page_72_73.png)
  { name: 'microbes_p74_75.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793195167106.png' },
  // Page 76-77: Q117 to Q119 + AR Q1-29 (was media_1793195129185, rotated to page_70_71.png)
  { name: 'microbes_p76_77.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793195129185.png' },
];

async function main() {
  for (const m of mapping) {
    const dest = path.join(outDir, m.name);
    await sharp(m.src).rotate(270).toFile(dest);
    console.log(`Saved ${m.name}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
