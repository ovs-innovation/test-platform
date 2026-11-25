import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlsMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'fluids_diagram_urls.json'), 'utf8'));

const parts = [
  'clean_fluids_part1.mjs',
  'clean_fluids_part2.mjs',
  'clean_fluids_part3.mjs',
  'clean_fluids_part4.mjs'
];

for (const part of parts) {
  const filePath = path.join(__dirname, part);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any fluids_pyq image_url with the fresh URL or null
  // Let's parse each question object
  const partVarMatch = content.match(/export const (FLUIDS_PART\d) = (\[[\s\S]*\]);/);
  if (!partVarMatch) {
    console.warn(`Could not parse ${part}`);
    continue;
  }
  const varName = partVarMatch[1];
  const list = JSON.parse(partVarMatch[2]);

  let updatedCount = 0;
  for (const q of list) {
    const key = `q${q.qNum}_diagram.png`;
    if (urlsMap[key]) {
      q.image_url = urlsMap[key];
      updatedCount++;
    } else {
      q.image_url = null;
    }
  }

  const newContent = `// Mechanical Properties of Fluids - JEE Physics PYQ - ${varName}\nexport const ${varName} = ${JSON.stringify(list, null, 2)};\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated ${part} (${varName}): ${list.length} questions, ${updatedCount} with diagrams.`);
}
console.log('All fluids parts updated with fresh diagram URLs!');
