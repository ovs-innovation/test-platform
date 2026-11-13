import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));

for (const b of blocks) {
  const fullText = b.rawLines.join('\n');
  const optAIdx = fullText.indexOf('(A)');
  const optBIdx = fullText.indexOf('(B)');
  const optCIdx = fullText.indexOf('(C)');
  const optDIdx = fullText.indexOf('(D)');

  if (optAIdx !== -1 && optBIdx !== -1 && optCIdx !== -1 && optDIdx !== -1) {
    const optA = fullText.substring(optAIdx + 3, optBIdx).trim();
    const optB = fullText.substring(optBIdx + 3, optCIdx).trim();
    const optC = fullText.substring(optCIdx + 3, optDIdx).trim();
    const optD = fullText.substring(optDIdx + 3).trim();

    if (!optA || !optB || !optC || !optD || optA.length < 2 || optB.length < 2 || optC.length < 2 || optD.length < 2) {
      console.log(`Q${b.qNum} has short/empty option:`, { optA, optB, optC, optD });
    }
  }
}
