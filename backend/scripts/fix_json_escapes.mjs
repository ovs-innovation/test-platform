import fs from 'fs';
import path from 'path';

const files = [
  'backend/scripts/laws_of_motion/lom_part1.json',
  'backend/scripts/laws_of_motion/lom_part2.json',
  'backend/scripts/laws_of_motion/lom_part3.json',
  'backend/scripts/laws_of_motion/lom_part4.json'
];

for (const file of files) {
  const p = path.resolve(file);
  let raw = fs.readFileSync(p, 'utf8');

  // Replace LaTeX backslashes:
  // Any backslash that is not followed by " or \
  // Note: in raw JSON, \" is quote, \\ is backslash.
  // But if there is \sqrt, \Delta, \times, \theta, \alpha, \beta, \vec, \sin, \cos, \tan, \cot, \text, \le, \ge, \pm, \approx, \int, \frac, etc.
  // We need to double the backslash.
  let fixed = '';
  let inString = false;
  let i = 0;
  while (i < raw.length) {
    const ch = raw[i];
    if (ch === '"' && (i === 0 || raw[i - 1] !== '\\' || (i >= 2 && raw[i - 2] === '\\' && raw[i - 1] === '\\'))) {
      inString = !inString;
      fixed += ch;
      i++;
    } else if (inString && ch === '\\') {
      const next = raw[i + 1];
      // Check if this is a legitimate JSON escape sequence:
      // \" or \\ or \/ or \b or \f or \r
      // Note: \n or \t might have been intended as literal newline/tab, BUT in LaTeX:
      // \nu, \tau, \tan, \theta, \times, \text, \to, etc. starts with \t or \n!
      // If next is 't' followed by 'ext', 'heta', 'an', 'imes', 'o', 'au': it's LaTeX!
      const rest = raw.slice(i + 1, i + 8);
      const isLatexT = /^t(ext|heta|an|imes|o|au)/.test(rest);
      const isLatexN = /^n(u|abla|eg)/.test(rest);

      if (next === '"' || next === '\\') {
        fixed += ch + next;
        i += 2;
      } else if (next === 'n' && !isLatexN) {
        fixed += ch + next;
        i += 2;
      } else if (next === 'r') {
        fixed += ch + next;
        i += 2;
      } else {
        // It's a LaTeX backslash, so escape it as \\
        fixed += '\\\\';
        i++;
      }
    } else {
      fixed += ch;
      i++;
    }
  }

  try {
    const parsed = JSON.parse(fixed);
    fs.writeFileSync(p, JSON.stringify(parsed, null, 2));
    console.log(`Successfully fixed and formatted ${file} (${parsed.length} questions)`);
  } catch (err) {
    console.error(`Error in ${file}:`, err.message);
    // Find approximate location
    const match = err.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1]);
      console.log('Snippet around error:', fixed.slice(Math.max(0, pos - 40), pos + 40));
    }
  }
}
