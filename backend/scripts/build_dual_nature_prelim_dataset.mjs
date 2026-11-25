import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));
const linearText = fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_linear.txt'), 'utf8');

// Questions with diagrams
const diagramMap = {
  13: diagramUrls['dual_nature_q13_diagram.png'],
  14: diagramUrls['dual_nature_q14_diagram.png'],
  15: diagramUrls['dual_nature_q15_diagram.png'],
  27: diagramUrls['dual_nature_q27_diagram.png'],
  35: diagramUrls['dual_nature_q35_diagram.png'],
  62: diagramUrls['dual_nature_q62_diagram.png'],
  75: diagramUrls['dual_nature_q75_diagram.png'],
  76: diagramUrls['dual_nature_q76_diagram.png'],
  153: diagramUrls['dual_nature_q153_diagram.png'],
  164: diagramUrls['dual_nature_q164_diagram.png'],
  172: diagramUrls['dual_nature_q172_diagram.png'],
  195: diagramUrls['dual_nature_q195_diagram.png'],
  210: diagramUrls['dual_nature_q210_diagram.png']
};

console.log('Diagram mapping initialized for 13 questions.');

// Helper to clean KaTeX math
function cleanKaTeX(str) {
  if (!str) return '';
  let s = str.trim();
  // Remove AcadXL header / footer artifacts
  s = s.replace(/AcadXL™[\s\S]*?ACADXL\s*-\s*EDUCATION\s*WITH\s*DISCIPLINE/gi, '');
  s = s.replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com[^\n]*/gi, '');
  s = s.replace(/Dual Nature of Matter\s*—\s*JEE[^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*-\d+\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*1\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/ANSWER\s*:\s*[A-D0-9\.\-]+/gi, '');

  // Standard KaTeX substitutions
  s = s.replace(/(\d+)\s*x\s*10\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\^([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\s*\^\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/\b([hvcmeEkKVpP])\^(\d+)/g, '$1^{$2}');
  s = s.replace(/10\s*\*\s*(\d+)/g, '10^{$1}');
  s = s.replace(/10\s*\^([–\-\+−]?\d+)/g, '10^{$1}');
  s = s.replace(/([0-9])\s*eV\b/gi, '$1\\text{ eV}');
  s = s.replace(/([0-9])\s*nm\b/gi, '$1\\text{ nm}');
  s = s.replace(/([0-9])\s*m\/s\b/gi, '$1\\text{ m/s}');
  s = s.replace(/([0-9])\s*J\.?s\b/gi, '$1\\text{ J}\\cdot\\text{s}');
  s = s.replace(/([0-9])\s*kg\b/gi, '$1\\text{ kg}');
  s = s.replace(/([0-9])\s*V\b/g, '$1\\text{ V}');
  s = s.replace(/([0-9])\s*Hz\b/g, '$1\\text{ Hz}');
  s = s.replace(/([0-9])\s*Å\b/g, '$1\\text{ \\AA}');
  s = s.replace(/\bA\s*°/g, '\\text{\\AA}');
  s = s.replace(/\\text\{ \\AA\}/g, '\\text{\\AA}');
  s = s.replace(/\bde\s*-\s*Broglie\b/gi, 'de Broglie');
  s = s.replace(/\bdeBroglie\b/gi, 'de Broglie');
  s = s.replace(/photo\s*-\s*electric/gi, 'photoelectric');
  s = s.replace(/photo\s*-\s*electrons/gi, 'photoelectrons');
  s = s.replace(/photo\s*-\s*cathode/gi, 'photocathode');
  s = s.replace(/\bV_\{?0\}?\b/g, 'V_0');
  s = s.replace(/\bK_\{?max\}?\b/g, 'K_{\\max}');
  s = s.replace(/\bE_\{?k\}?\b/g, 'E_k');
  s = s.replace(/--+/g, '—');
  return s.trim();
}

// Write prelim parser
fs.writeFileSync(path.resolve(__dirname, 'dual_nature_prelim_helper.mjs'), '// Helper ready\n');
console.log('Dual nature prelim setup complete.');
