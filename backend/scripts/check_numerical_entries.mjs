import fs from 'fs';

const ocrRaw = fs.readFileSync('backend/scripts/binomial_theorem_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(ocrRaw);
const key = JSON.parse(fs.readFileSync('backend/scripts/official_answer_key_binomial_theorem.json', 'utf8'));

// For all non-ABCD answers in key, let's verify if they are really numerical or an MCQ
const suspicious = [];

for (let i = 1; i <= 260; i++) {
  const ans = key[i];
  if (!['A', 'B', 'C', 'D'].includes(ans)) {
    // Check if question i has (A), (B), (C), (D) in its text
    suspicious.push({ q: i, ans });
  }
}

console.log(`Checking ${suspicious.length} numerical entries...`);

for (const s of suspicious) {
  // Find which page question s.q is on
  // Search for "s.q." or ANSWER around it
  let foundPage = null;
  let ansOnPage = null;
  let isMcqOnPage = false;

  for (let p = 1; p <= 168; p++) {
    const text = pages.find(x => x.page === p).text;
    const re = new RegExp(`(?:^|\\n|\\s)${s.q}\\.\\s+`, 'i');
    if (re.test(text)) {
      foundPage = p;
      if (/\(A\)[\s\S]{1,50}\(B\)[\s\S]{1,50}\(C\)/i.test(text)) {
        isMcqOnPage = true;
      }
      const ansMatch = text.match(/ANSWER[:\s\-\*\+\=]+([A-D]|\d+)/i);
      if (ansMatch) {
        ansOnPage = ansMatch[1].toUpperCase();
      }
      break;
    }
  }
  console.log(`Q${s.q}: key says "${s.ans}", on page ${foundPage}: isMcq=${isMcqOnPage}, pageAns=${ansOnPage}`);
}

