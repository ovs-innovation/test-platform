import fs from 'fs';

const blocks = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_raw_blocks.json', 'utf8'));

for (const b of blocks) {
  const fullText = b.rawLines.join(' ');
  // Check for Cry/cry formatting
  if (/cry/i.test(fullText)) {
    // Check if cry has weird characters
  }
  // Check for any dashes with nothing before it
  const match = fullText.match(/\s+-\d/);
  if (match) {
    console.log(`Q${b.qNum} has dash pattern:`, fullText.substring(match.index - 10, match.index + 20));
  }
}

