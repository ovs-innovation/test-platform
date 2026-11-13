import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));

for (const b of blocks) {
  const fullText = b.rawLines.join('\n');
  const optAIdx = fullText.indexOf('(A)');
  const optBIdx = fullText.indexOf('(B)');
  const optCIdx = fullText.indexOf('(C)');
  const optDIdx = fullText.indexOf('(D)');

  if (optAIdx === -1 || optBIdx === -1 || optCIdx === -1 || optDIdx === -1) {
    console.log(`Q${b.qNum} does NOT have standard (A)..(D) markers:`);
    console.log(b.rawLines.join('\n'));
  }
}

