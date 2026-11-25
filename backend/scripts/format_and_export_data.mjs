import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), 'utf8'));

// Clean Q1
data[0].question_text = 'If a charge q is placed at the centre of the line joining two equal charges Q such that the system is in equilibrium then the value of q is:';
data[0].options = ['Q/2', '-Q/2', 'Q/4', '-Q/4'];

// Write JSON
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), JSON.stringify(data, null, 2));

// Write .mjs with proper newlines
const mjsContent = `// 300 JEE Main Electrostatics PYQ Questions\nexport const ELECTROSTATICS_JEE_QUESTIONS = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_jee_questions_data.mjs'), mjsContent);

console.log('Successfully formatted and exported electrostatics_jee_questions_data.mjs');
