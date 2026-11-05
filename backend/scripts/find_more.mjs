import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/statistics_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

const targets = [48, 58, 59, 70, 87];

for (const t of targets) {
  console.log(`\n=================== SEARCHING FOR Q${t} ===================`);
  for (let i = 0; i < pages.length - 1; i++) {
    const p = pages[i];
    // Check if the page contains the number followed by a period or text
    if (p.text.includes(`${t}.`) || p.text.includes(`${t} `) || p.text.includes(`${t}•`) || p.text.includes(`${t}\n`)) {
      // Find lines that have this
      const lines = p.text.split('\n');
      for (const line of lines) {
        if (line.match(new RegExp(`(?:^|\\s)${t}(?:\\.|\\s|\\•|\\))`, 'g'))) {
          console.log(`P${p.page}: ${line.slice(0, 100)}`);
          // also show nearby answer
          const ansMatch = p.text.match(/ANSWER:\s*([^\n\r]+)/i);
          if (ansMatch) console.log(`   Page Ans: ${ansMatch[0]}`);
        }
      }
    }
  }
}

