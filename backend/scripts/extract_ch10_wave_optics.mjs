import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { sanitizeJson } from './jsonSanitizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pagesDir = path.resolve(__dirname, '../pdf_rendered_pages');
const outDir = path.resolve(__dirname, 'extracted_chapters');
fs.mkdirSync(outDir, { recursive: true });

const CHUNKS = [
  // Page 3: Q1 - Q24
  { page: 'pdf2_p3.png', start: 1, end: 6, name: 'ch10_p3_q1_6', type: 'mcq' },
  { page: 'pdf2_p3.png', start: 7, end: 12, name: 'ch10_p3_q7_12', type: 'mcq' },
  { page: 'pdf2_p3.png', start: 13, end: 18, name: 'ch10_p3_q13_18', type: 'mcq' },
  { page: 'pdf2_p3.png', start: 19, end: 24, name: 'ch10_p3_q19_24', type: 'mcq' },

  // Page 4: Q25 - Q52
  { page: 'pdf2_p4.png', start: 25, end: 31, name: 'ch10_p4_q25_31', type: 'mcq' },
  { page: 'pdf2_p4.png', start: 32, end: 38, name: 'ch10_p4_q32_38', type: 'mcq' },
  { page: 'pdf2_p4.png', start: 39, end: 45, name: 'ch10_p4_q39_45', type: 'mcq' },
  { page: 'pdf2_p4.png', start: 46, end: 52, name: 'ch10_p4_q46_52', type: 'mcq' },

  // Page 5: Q53 - Q75
  { page: 'pdf2_p5.png', start: 53, end: 58, name: 'ch10_p5_q53_58', type: 'mcq' },
  { page: 'pdf2_p5.png', start: 59, end: 64, name: 'ch10_p5_q59_64', type: 'mcq' },
  { page: 'pdf2_p5.png', start: 65, end: 70, name: 'ch10_p5_q65_70', type: 'mcq' },
  { page: 'pdf2_p5.png', start: 71, end: 75, name: 'ch10_p5_q71_75', type: 'mcq' },

  // Page 6: Q76 - Q94 & Section B AR Q1 - Q4
  { page: 'pdf2_p6.png', start: 76, end: 82, name: 'ch10_p6_q76_82', type: 'mcq' },
  { page: 'pdf2_p6.png', start: 83, end: 88, name: 'ch10_p6_q83_88', type: 'mcq' },
  { page: 'pdf2_p6.png', start: 89, end: 94, name: 'ch10_p6_q89_94', type: 'mcq' },
  {
    page: 'pdf2_p6.png',
    start: 1,
    end: 4,
    name: 'ch10_p6_ar_q1_4',
    type: 'assertion_reason',
    extra: 'Under SECTION - B Assertion - Reason Type Questions, extract questions 1 to 4.'
  },

  // Page 7: Section B AR Q5 - Q15
  {
    page: 'pdf2_p7.png',
    start: 5,
    end: 10,
    name: 'ch10_p7_ar_q5_10',
    type: 'assertion_reason',
    extra: 'Extract Section B Assertion - Reason Type Questions 5 to 10 (at the top/left of the page before Chapter 11 starts).'
  },
  {
    page: 'pdf2_p7.png',
    start: 11,
    end: 15,
    name: 'ch10_p7_ar_q11_15',
    type: 'assertion_reason',
    extra: 'Extract Section B Assertion - Reason Type Questions 11 to 15 (at the top/left of the page before Chapter 11 starts).'
  }
];

async function extractChunk(chunk) {
  const { page, start, end, name, type, extra = '' } = chunk;
  const outPath = path.resolve(outDir, `${name}.json`);
  if (fs.existsSync(outPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(outPath, 'utf-8'));
      if (Array.isArray(existing) && existing.length > 0) {
        console.log(`Skipping existing ${name}.json (${existing.length} questions)`);
        return existing;
      }
    } catch (_) {}
  }

  console.log(`Extracting ${name}: Questions ${start} to ${end} from ${page}...`);
  const imagePath = path.resolve(pagesDir, page);
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const prompt = `You are an expert NEET Physics faculty preparing interactive CBT practice questions based on the physics problems numbered ${start} to ${end} in this worksheet for the chapter "Wave Optics".
Rephrase each question clearly and academically with standard LaTeX while preserving all numerical values, equations, physics concepts, diagrams, and option choices.
${extra}

For EACH question from ${start} to ${end}:
1. "question_number": integer
2. "question_type": "${type === 'assertion_reason' ? 'assertion_reason' : 'single_choice'}"
3. "question_text": The complete question statement. Use clean LaTeX formatting enclosed in $...$ for all math, variables, equations, vectors, units, and symbols (e.g. $\\lambda = 6000\\text{ \\AA}$, $I = I_0\\cos^2\\frac{\\phi}{2}$, $\\beta = \\frac{\\lambda D}{d}$, etc.).
4. "assertion_text": ${type === 'assertion_reason' ? 'The exact Assertion statement A: ...' : 'null'}
5. "reason_text": ${type === 'assertion_reason' ? 'The exact Reason statement R: ...' : 'null'}
6. "options": Array of exactly 4 strings for options (1), (2), (3), (4). Format mathematical expressions with LaTeX $...$.
   ${type === 'assertion_reason' ? `For assertion-reason questions, standard options are:
   [
     "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
     "Both Assertion and Reason are true but Reason is not the correct explanation of Assertion",
     "Assertion is true but Reason is false",
     "Both Assertion and Reason are false"
   ]` : ''}
7. "correct_index": integer 0, 1, 2, or 3 (0 for (1), 1 for (2), 2 for (3), 3 for (4)). Solve carefully using standard wave optics formulas to determine the mathematically correct option.
8. "difficulty": "easy", "medium", or "hard"
9. "topic": Specific physics subtopic (e.g. "Huygens' Principle & Wavefronts", "Interference of Light & YDSE", "Diffraction of Light", "Polarisation of Light", "Brewster's Law & Malus' Law", "Resolving Power & Optical Instruments")
10. "has_diagram": boolean - true if the question has a diagram/figure/graph.
11. "diagram_description": string or null
12. "solution": A concise, clear step-by-step derivation justifying the answer (2-4 lines).

Output ONLY a valid JSON array of objects. Return raw JSON, no markdown wrapper.`;

  let attempts = 3;
  while (attempts > 0) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { inlineData: { data: base64Image, mimeType: 'image/png' } },
              { text: prompt },
            ],
          },
        ],
        config: {
          temperature: 0.4,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
        },
      });

      const rawText = (response?.text || '').trim();
      const parsed = sanitizeJson(rawText);
      fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2), 'utf-8');
      console.log(`Saved ${name}.json (${parsed.length} questions extracted)`);
      return parsed;
    } catch (err) {
      console.error(`Attempt failed for ${name}:`, err.message);
      attempts--;
      if (attempts === 0) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function main() {
  console.log('=== Starting Extraction for Chapter 10: Wave Optics ===');
  let allCh10 = [];
  for (const chunk of CHUNKS) {
    const questions = await extractChunk(chunk);
    allCh10 = allCh10.concat(questions);
    await new Promise(r => setTimeout(r, 1000));
  }

  const combinedPath = path.resolve(outDir, 'ch10_wave_optics_all.json');
  fs.writeFileSync(combinedPath, JSON.stringify(allCh10, null, 2), 'utf-8');
  console.log(`\n🎉 Chapter 10 Complete! Total extracted questions: ${allCh10.length}`);
  console.log(`Saved to ${combinedPath}`);
}

main().catch(console.error);
