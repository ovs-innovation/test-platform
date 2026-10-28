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
  // Page 3: Q1 - Q7 (Right side of page 3)
  {
    page: 'pdf1_p3.png',
    start: 1,
    end: 7,
    name: 'ch9_p3_q1_7',
    type: 'mcq',
    extra: 'Under Chapter 9 "Ray Optics and Optical Instruments" Section A, extract questions 1 to 7 located at the right side of the page.'
  },

  // Page 4: Q8 - Q26
  { page: 'pdf1_p4.png', start: 8, end: 14, name: 'ch9_p4_q8_14', type: 'mcq' },
  { page: 'pdf1_p4.png', start: 15, end: 20, name: 'ch9_p4_q15_20', type: 'mcq' },
  { page: 'pdf1_p4.png', start: 21, end: 26, name: 'ch9_p4_q21_26', type: 'mcq' },

  // Page 5: Q27 - Q44
  { page: 'pdf1_p5.png', start: 27, end: 32, name: 'ch9_p5_q27_32', type: 'mcq' },
  { page: 'pdf1_p5.png', start: 33, end: 38, name: 'ch9_p5_q33_38', type: 'mcq' },
  { page: 'pdf1_p5.png', start: 39, end: 44, name: 'ch9_p5_q39_44', type: 'mcq' },

  // Page 6: Q45 - Q64
  { page: 'pdf1_p6.png', start: 45, end: 51, name: 'ch9_p6_q45_51', type: 'mcq' },
  { page: 'pdf1_p6.png', start: 52, end: 58, name: 'ch9_p6_q52_58', type: 'mcq' },
  { page: 'pdf1_p6.png', start: 59, end: 64, name: 'ch9_p6_q59_64', type: 'mcq' },

  // Page 7: Q65 - Q84
  { page: 'pdf1_p7.png', start: 65, end: 71, name: 'ch9_p7_q65_71', type: 'mcq' },
  { page: 'pdf1_p7.png', start: 72, end: 78, name: 'ch9_p7_q72_78', type: 'mcq' },
  { page: 'pdf1_p7.png', start: 79, end: 84, name: 'ch9_p7_q79_84', type: 'mcq' },

  // Page 8: Q85 - Q110
  { page: 'pdf1_p8.png', start: 85, end: 91, name: 'ch9_p8_q85_91', type: 'mcq' },
  { page: 'pdf1_p8.png', start: 92, end: 97, name: 'ch9_p8_q92_97', type: 'mcq' },
  { page: 'pdf1_p8.png', start: 98, end: 104, name: 'ch9_p8_q98_104', type: 'mcq' },
  { page: 'pdf1_p8.png', start: 105, end: 110, name: 'ch9_p8_q105_110', type: 'mcq' },

  // Page 9: Q111 - Q133
  { page: 'pdf1_p9.png', start: 111, end: 118, name: 'ch9_p9_q111_118', type: 'mcq' },
  { page: 'pdf1_p9.png', start: 119, end: 126, name: 'ch9_p9_q119_126', type: 'mcq' },
  { page: 'pdf1_p9.png', start: 127, end: 133, name: 'ch9_p9_q127_133', type: 'mcq' },

  // Page 10: Q134 - Q156
  { page: 'pdf1_p10.png', start: 134, end: 141, name: 'ch9_p10_q134_141', type: 'mcq' },
  { page: 'pdf1_p10.png', start: 142, end: 149, name: 'ch9_p10_q142_149', type: 'mcq' },
  { page: 'pdf1_p10.png', start: 150, end: 156, name: 'ch9_p10_q150_156', type: 'mcq' },

  // Page 11: Q157 - Q177
  { page: 'pdf1_p11.png', start: 157, end: 163, name: 'ch9_p11_q157_163', type: 'mcq' },
  { page: 'pdf1_p11.png', start: 164, end: 170, name: 'ch9_p11_q164_170', type: 'mcq' },
  { page: 'pdf1_p11.png', start: 171, end: 174, name: 'ch9_p11_q171_174', type: 'mcq' },
  { page: 'pdf1_p11.png', start: 175, end: 177, name: 'ch9_p11_q175_177', type: 'mcq' },

  // Page 12: Q178 - Q194
  { page: 'pdf1_p12.png', start: 178, end: 182, name: 'ch9_p12_q178_182', type: 'mcq' },
  { page: 'pdf1_p12.png', start: 183, end: 188, name: 'ch9_p12_q183_188', type: 'mcq' },
  { page: 'pdf1_p12.png', start: 189, end: 194, name: 'ch9_p12_q189_194', type: 'mcq' },

  // Page 13: Q195 - Q212
  { page: 'pdf1_p13.png', start: 195, end: 200, name: 'ch9_p13_q195_200', type: 'mcq' },
  { page: 'pdf1_p13.png', start: 201, end: 206, name: 'ch9_p13_q201_206', type: 'mcq' },
  { page: 'pdf1_p13.png', start: 207, end: 212, name: 'ch9_p13_q207_212', type: 'mcq' },

  // PDF 2 Page 1: Q213 - Q237
  { page: 'pdf2_p1.png', start: 213, end: 218, name: 'ch9_p14_q213_218', type: 'mcq' },
  { page: 'pdf2_p1.png', start: 219, end: 224, name: 'ch9_p14_q219_224', type: 'mcq' },
  { page: 'pdf2_p1.png', start: 225, end: 230, name: 'ch9_p14_q225_230', type: 'mcq' },
  { page: 'pdf2_p1.png', start: 231, end: 237, name: 'ch9_p14_q231_237', type: 'mcq' },

  // PDF 2 Page 2: Q238 - Q246 & Section B AR Q1 - Q17
  { page: 'pdf2_p2.png', start: 238, end: 242, name: 'ch9_p15_q238_242', type: 'mcq' },
  { page: 'pdf2_p2.png', start: 243, end: 246, name: 'ch9_p15_q243_246', type: 'mcq' },
  {
    page: 'pdf2_p2.png',
    start: 1,
    end: 6,
    name: 'ch9_p15_ar_q1_6',
    type: 'assertion_reason',
    extra: 'Under SECTION - B Assertion - Reason Type Questions, extract questions 1 to 6.'
  },
  {
    page: 'pdf2_p2.png',
    start: 7,
    end: 12,
    name: 'ch9_p15_ar_q7_12',
    type: 'assertion_reason',
    extra: 'Under SECTION - B Assertion - Reason Type Questions, extract questions 7 to 12.'
  },
  {
    page: 'pdf2_p2.png',
    start: 13,
    end: 17,
    name: 'ch9_p15_ar_q13_17',
    type: 'assertion_reason',
    extra: 'Under SECTION - B Assertion - Reason Type Questions, extract questions 13 to 17.'
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

  const prompt = `You are an expert NEET Physics faculty preparing interactive CBT practice questions based on the physics problems numbered ${start} to ${end} in this worksheet for the chapter "Ray Optics and Optical Instruments".
Rephrase each question clearly and academically with standard LaTeX while preserving all numerical values, equations, physics concepts, diagrams, and option choices.
${extra}

For EACH question from ${start} to ${end}:
1. "question_number": integer
2. "question_type": "${type === 'assertion_reason' ? 'assertion_reason' : 'single_choice'}"
3. "question_text": The complete question statement. Use clean LaTeX formatting enclosed in $...$ for all math, variables, equations, vectors, units, and symbols (e.g. $\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$, $\\delta = (\\mu - 1)A$, $20\\text{ cm}$, etc.).
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
7. "correct_index": integer 0, 1, 2, or 3 (0 for (1), 1 for (2), 2 for (3), 3 for (4)). Solve carefully using geometrical optics formulas to determine the mathematically correct option.
8. "difficulty": "easy", "medium", or "hard"
9. "topic": Specific physics subtopic (e.g. "Reflection & Mirrors", "Refraction at Plane Surfaces", "Total Internal Reflection & Critical Angle", "Prism Formula & Dispersion", "Refraction at Spherical Surfaces & Lenses", "Optical Instruments (Microscope, Telescope, Eye)")
10. "has_diagram": boolean - true if the question has a diagram/figure/circuit.
11. "diagram_description": string or null
12. "solution": A concise, clear derivation justifying the answer (1-2 lines max).

Output ONLY a valid JSON array of objects. Return raw JSON, no markdown wrapper.`;

  let attempts = 4;
  while (attempts > 0) {
    try {
      const currentTemp = 0.35 + (4 - attempts) * 0.05;
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
          temperature: currentTemp,
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
      console.error(`Attempt failed for ${name} (attempts left: ${attempts - 1}):`, err.message);
      attempts--;
      if (attempts === 0) throw err;
      await new Promise(r => setTimeout(r, 2500));
    }
  }
}

async function main() {
  console.log('=== Starting Extraction for Chapter 9: Ray Optics and Optical Instruments ===');
  let allCh9 = [];
  for (const chunk of CHUNKS) {
    const questions = await extractChunk(chunk);
    allCh9 = allCh9.concat(questions);
    await new Promise(r => setTimeout(r, 800));
  }

  const combinedPath = path.resolve(outDir, 'ch9_ray_optics_all.json');
  fs.writeFileSync(combinedPath, JSON.stringify(allCh9, null, 2), 'utf-8');
  console.log(`\n🎉 Chapter 9 Complete! Total extracted questions: ${allCh9.length}`);
  console.log(`Saved to ${combinedPath}`);
}

main().catch(console.error);
