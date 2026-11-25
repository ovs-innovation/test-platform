import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));

// Helper to format math and chemical formulas
function formatKaTeX(str) {
  if (!str) return '';
  let s = str;
  // Common cleanups
  s = s.replace(/([0-9\.\-]+)\s*x\s*10\^?([0-9\-]+)/gi, '$$1 \\times 10^{$2}$$');
  s = s.replace(/([0-9\.\-]+)\s*x\s*10\s*([0-9\-]+)/gi, '$$1 \\times 10^{$2}$$');
  s = s.replace(/\bms\^?(-[0-9]+)\b/gi, '\\text{ ms}^{$1}');
  s = s.replace(/\bms~1\b/gi, '\\text{ ms}^{-1}');
  s = s.replace(/\bms~2\b/gi, '\\text{ ms}^{-2}');
  s = s.replace(/\bkgmol~1\b/gi, '\\text{ kg mol}^{-1}');
  s = s.replace(/\bkJmol\s*~?1\b/gi, '\\text{ kJ mol}^{-1}');
  s = s.replace(/\bJmol\s*~?1\b/gi, '\\text{ J mol}^{-1}');
  return s;
}

console.log('Builder setup ready.');
