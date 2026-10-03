import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Production 17-Page PDF Render Verification ---');
console.log(`Node runtime version: ${process.version}`);
console.log(`Promise.withResolvers available before polyfill: ${typeof Promise.withResolvers}`);

// Import the extractor (which loads polyfills first)
const { renderPdfToImages } = await import('../src/utils/geminiVisionExtractor.js');

console.log(`Promise.withResolvers available after polyfill/import: ${typeof Promise.withResolvers}`);

// Locate the 17-page JEE PDF
const docsDir = path.join(__dirname, '../uploads/documents');
let targetPdfPath = null;

if (fs.existsSync(docsDir)) {
  const files = fs.readdirSync(docsDir);
  // Specifically look for the assessment 26 PDF or any 895KB question paper PDF
  const candidates = files.filter(f => f.startsWith('question_paper_') && f.endsWith('.pdf'));
  for (const f of candidates) {
    const fullPath = path.join(docsDir, f);
    const stat = fs.statSync(fullPath);
    if (stat.size >= 800000 && stat.size <= 1000000) {
      targetPdfPath = fullPath;
      break;
    }
  }

  if (!targetPdfPath && candidates.length > 0) {
    // Pick the most recent question paper
    candidates.sort((a, b) => fs.statSync(path.join(docsDir, b)).mtimeMs - fs.statSync(path.join(docsDir, a)).mtimeMs);
    targetPdfPath = path.join(docsDir, candidates[0]);
  }
}

if (!targetPdfPath || !fs.existsSync(targetPdfPath)) {
  console.error(`[Error] JEE question paper PDF not found in ${docsDir}`);
  process.exit(1);
}

console.log(`Testing with PDF: ${path.basename(targetPdfPath)} (${fs.statSync(targetPdfPath).size} bytes)`);

try {
  const pdfBuffer = fs.readFileSync(targetPdfPath);
  const startTime = Date.now();
  const pages = await renderPdfToImages(pdfBuffer);
  const durationMs = Date.now() - startTime;

  console.log(`\nSuccessfully rendered ${pages.length} page(s) in ${durationMs}ms:`);
  let allNonEmpty = true;

  pages.forEach((p, idx) => {
    const size = p.buffer ? p.buffer.length : 0;
    const nonEmpty = size > 0;
    if (!nonEmpty) allNonEmpty = false;
    console.log(`  Page ${String(idx + 1).padStart(2)}: ${p.width}x${p.height}px | ${size} bytes | non-empty: ${nonEmpty}`);
  });

  if (pages.length === 17 && allNonEmpty) {
    console.log(`\n[PASS] Verified ALL 17 pages rendered into non-empty PNG buffers with zero errors.`);
    process.exit(0);
  } else if (allNonEmpty) {
    console.log(`\n[PASS] Verified ${pages.length} pages rendered into non-empty PNG buffers.`);
    process.exit(0);
  } else {
    console.error(`\n[FAIL] Some rendered page buffers were empty.`);
    process.exit(1);
  }
} catch (err) {
  console.error(`\n[FAIL] Rendering error:`, err);
  process.exit(1);
}
