import fs from 'fs';

const base = JSON.parse(fs.readFileSync('backend/scripts/gravitation_base_records.json', 'utf8'));
const parsed = JSON.parse(fs.readFileSync('backend/scripts/gravitation_parsed_initial.json', 'utf8'));

console.log('Base is Array?', Array.isArray(base), 'Length:', base.length || Object.keys(base).length);
console.log('Parsed is Array?', Array.isArray(parsed), 'Length:', parsed.length || Object.keys(parsed).length);

// Print keys of parsed:
const pKeys = Object.keys(parsed);
console.log('First 5 entries of parsed:');
for (let i = 0; i < 5; i++) {
  const item = parsed[pKeys[i]];
  console.log(`[Key ${pKeys[i]}] qNum: ${item.qNum}, exam: ${item.exam}, options: ${JSON.stringify(item.options)}, correct_option: ${item.correct_option}, numeric: ${item.numeric_answer}, img: ${item.image_url}`);
  console.log('   Question preview:', (item.question || '').slice(0, 100));
}
