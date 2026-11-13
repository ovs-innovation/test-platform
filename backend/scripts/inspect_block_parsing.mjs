import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_official_keys.json', 'utf8'));

let perfectCount = 0;
const issues = [];

function parseOptions(rawLines) {
  const fullText = rawLines.join('\n');

  // Option regex matching (A) ... (B) ... (C) ... (D) ...
  // Or (1) ... (2) ... (3) ... (4) ...
  let optMatches = [...fullText.matchAll(/(?:\(([A-D1-4])\)|(?<!\w)([A-D1-4])\))\s*([^\n\(\)]+)/g)];

  // More robust approach: find option markers
  // Let's test standard pattern:
  const optMarkers = ['(A)', '(B)', '(C)', '(D)'];
  const numMarkers = ['(1)', '(2)', '(3)', '(4)'];

  // Check if (1)..(4) or (A)..(D) is used
  let usedMarkers = optMarkers;
  let firstMarkerIdx = fullText.indexOf('(A)');
  if (firstMarkerIdx === -1) {
    firstMarkerIdx = fullText.indexOf('(1)');
    if (firstMarkerIdx !== -1) {
      usedMarkers = numMarkers;
    }
  }

  return { firstMarkerIdx, usedMarkers };
}

for (const b of blocks) {
  const { firstMarkerIdx, usedMarkers } = parseOptions(b.rawLines);
  if (firstMarkerIdx === -1) {
    issues.push({ qNum: b.qNum, reason: 'No option markers found', lines: b.rawLines });
  } else {
    // Check if all 4 markers exist
    const fullText = b.rawLines.join(' ');
    const allFound = usedMarkers.every(m => fullText.includes(m));
    if (!allFound) {
      issues.push({ qNum: b.qNum, reason: 'Not all 4 markers found', usedMarkers, lines: b.rawLines });
    } else {
      perfectCount++;
    }
  }
}

console.log(`Perfect blocks: ${perfectCount} / ${blocks.length}`);
if (issues.length > 0) {
  console.log(`Issues (${issues.length}):`, JSON.stringify(issues, null, 2));
}

