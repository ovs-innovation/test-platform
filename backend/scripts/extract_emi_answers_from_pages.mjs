import fs from 'fs';

const cache = JSON.parse(fs.readFileSync('backend/scripts/emi_jee_ocr_cache.json', 'utf8'));

// Search for ANSWER: in all pages 1 to 143
const pageAnswers = [];

for (let p = 1; p <= 143; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const ansMatch = line.match(/^ANSWER\s*:\s*([A-Za-z0-9\.\-\/]+)/i);
    if (ansMatch) {
      pageAnswers.push({
        page: p,
        lineIndex: i,
        raw: line,
        ans: ansMatch[1].toUpperCase()
      });
    }
  }
}

console.log(`Found ${pageAnswers.length} ANSWER: markers across pages 1..143`);
if (pageAnswers.length > 0) {
  console.log('First 15 answers:', pageAnswers.slice(0, 15));
  console.log('Last 15 answers:', pageAnswers.slice(-15));
}
