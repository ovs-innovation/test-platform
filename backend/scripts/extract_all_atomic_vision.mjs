import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const cacheFile = 'scripts/atomic_vision_extracted.json';

let extractedCache = {};
if (fs.existsSync(cacheFile)) {
  try {
    extractedCache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  } catch (e) {
    extractedCache = {};
  }
}

async function extractPage(pageNum, retries = 3) {
  if (extractedCache[pageNum] && extractedCache[pageNum].length > 0) {
    return extractedCache[pageNum];
  }

  const imgPath = `scripts/atomic_jee_pages/page_${String(pageNum).padStart(3, '0')}.png`;
  if (!fs.existsSync(imgPath)) return [];

  const imgBuffer = fs.readFileSync(imgPath);
  const base64Data = imgBuffer.toString('base64');

  const prompt = `You are an expert physics teacher and document transcriber.
Examine this page from a JEE Main Atomic Physics PYQ document.
Extract all questions on this page.
For each question, provide:
- question_number: integer (e.g. 1, 2, ...)
- question_text: exact question text with clean LaTeX math notation ($...$ or $$...$$). Do NOT include "(A)", "(B)", etc. inside question_text.
- options: array of 4 strings (with clean LaTeX math) if MCQ, or empty array [] if numerical question
- answer: the letter (A, B, C, D) or numeric value stated under ANSWER:
- solution: the worked solution text with clean LaTeX math

Return ONLY valid JSON array:
[
  {
    "question_number": 1,
    "question_text": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "C",
    "solution": "..."
  }
]`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: 'image/png',
                  data: base64Data
                }
              }
            ]
          }
        ]
      });

      let text = response.text || '';
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        extractedCache[pageNum] = parsed;
        fs.writeFileSync(cacheFile, JSON.stringify(extractedCache, null, 2));
        console.log(`Page ${pageNum} OK (${parsed.length} questions: ${parsed.map(q => q.question_number).join(', ')})`);
        return parsed;
      }
    } catch (err) {
      console.warn(`Page ${pageNum} attempt ${attempt} failed: ${err.message}`);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    }
  }
  return [];
}

async function run() {
  console.log('Starting parallel extraction of pages 1 to 84...');
  const CONCURRENCY = 4;
  const pages = Array.from({ length: 84 }, (_, i) => i + 1);

  for (let i = 0; i < pages.length; i += CONCURRENCY) {
    const chunk = pages.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(p => extractPage(p)));
  }

  console.log('All pages extracted!');
}

run().catch(console.error);
