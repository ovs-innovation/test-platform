import dotenv from 'dotenv';
import { resolveChemistryStandardChapter } from '../src/utils/chapterResolver.js';
dotenv.config({ path: 'backend/.env' });

async function verify() {
  const tokenRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData?.data?.token || tokenData?.token;

  const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const list = data?.questions || data?.data?.questions || [];

  console.log(`Fetched ${list.length} total questions in Chemistry from Live API.`);

  // Simulate getQuestionChapter exactly as defined in QuestionBank.jsx
  function getQuestionChapter(q) {
    if (!q) return 'General';

    // Chemistry: Periodic Table (187 questions: 171 MCQ + 16 AR)
    if (
      (Number(q.id) >= 14591 && Number(q.id) <= 14777) ||
      Number(q.chapter_id) === 155 ||
      (Number(q.id) >= 6061 && Number(q.id) <= 6247 && (Number(q.chapter_id) === 155 || /periodic/i.test(q.chapter || ''))) ||
      /^\s*(classification of elements(\s*and\s*periodicity\s*in\s*properties)?|periodic\s*table|periodicity)\s*$/i.test(q.chapter_name || '') ||
      /^\s*(classification of elements(\s*and\s*periodicity\s*in\s*properties)?|periodic\s*table|periodicity)\s*$/i.test(q.chapter || '')
    ) {
      return 'Periodic Table';
    }

    // Chemistry: Solutions
    if (
      Number(q.chapter_id) === 37 ||
      Number(q.chapter_id) === 150 ||
      /^\s*solutions?\s*$/i.test(q.chapter_name || '') ||
      /^\s*solutions?\s*$/i.test(q.chapter || '')
    ) {
      return 'Solutions';
    }

    // Chemistry: Biomolecules
    if (
      Number(q.chapter_id) === 36 ||
      Number(q.chapter_id) === 133 ||
      /^\s*biomolecules?\s*$/i.test(q.chapter_name || '') ||
      /^\s*biomolecules?\s*$/i.test(q.chapter || '')
    ) {
      return 'Biomolecules';
    }

    // Chemistry: Electrochemistry
    if (
      Number(q.chapter_id) === 15 ||
      /^\s*electrochemistry\s*$/i.test(q.chapter_name || '') ||
      /^\s*electrochemistry\s*$/i.test(q.chapter || '')
    ) {
      return 'Electrochemistry';
    }

    // Chemistry: Chemical Kinetics
    if (
      Number(q.chapter_id) === 14 ||
      /^\s*chemical kinetics\s*$/i.test(q.chapter_name || '') ||
      /^\s*chemical kinetics\s*$/i.test(q.chapter || '')
    ) {
      return 'Chemical Kinetics';
    }

    // Chemistry: Haloalkanes and Haloarenes
    if (
      Number(q.chapter_id) === 34 ||
      /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter_name || '') ||
      /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter || '')
    ) {
      return 'Haloalkanes and Haloarenes';
    }

    // Chemistry: The d- and f-Block Elements
    if (
      Number(q.chapter_id) === 204 ||
      /^\s*the d- and f-block elements\s*$/i.test(q.chapter_name || '') ||
      /^\s*the d- and f-block elements\s*$/i.test(q.chapter || '')
    ) {
      return 'The d- and f-Block Elements';
    }

    // Chemistry: Some Basic Concepts of Chemistry (130 questions only)
    if (
      (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
      (Number(q.chapter_id) === 127 && Number(q.id) >= 5504 && Number(q.id) <= 5640) ||
      Number(q.chapter_id) === 95
    ) {
      return 'Some Basic Concepts of Chemistry';
    }

    // Chemistry: Structure of Atom (156 questions: 140 MCQs + 16 AR)
    if (
      (Number(q.id) >= 14171 && Number(q.id) <= 14326) ||
      (Number(q.chapter_id) === 77 && Number(q.id) >= 5641 && Number(q.id) <= 5796) ||
      Number(q.chapter_id) === 96 ||
      /^\s*structure of atom(s)?\s*$/i.test(q.chapter_name || '') ||
      /^\s*structure of atom(s)?\s*$/i.test(q.chapter || '')
    ) {
      return 'Structure of Atom';
    }

    // Chemistry: Periodic Table (187 questions: 171 MCQ + 16 AR)
    if (
      (Number(q.id) >= 14591 && Number(q.id) <= 14777) ||
      Number(q.chapter_id) === 155 ||
      (Number(q.id) >= 6061 && Number(q.id) <= 6247 && (Number(q.chapter_id) === 155 || /periodic/i.test(q.chapter || ''))) ||
      /^\s*(classification of elements(\s*and\s*periodicity\s*in\s*properties)?|periodic\s*table|periodicity)\s*$/i.test(q.chapter_name || '') ||
      /^\s*(classification of elements(\s*and\s*periodicity\s*in\s*properties)?|periodic\s*table|periodicity)\s*$/i.test(q.chapter || '')
    ) {
      return 'Periodic Table';
    }

    // Chemistry: Equilibrium (264 questions: 239 MCQ + 25 AR)
    if (
      (Number(q.id) >= 14327 && Number(q.id) <= 14590) ||
      (Number(q.chapter_id) === 73 && Number(q.id) >= 5797 && Number(q.id) <= 6060) ||
      Number(q.chapter_id) === 146 ||
      /^\s*(chemical\s*(&|and)?\s*ionic\s*)?equilibrium\s*$/i.test(q.chapter_name || '') ||
      /^\s*(chemical\s*(&|and)?\s*ionic\s*)?equilibrium\s*$/i.test(q.chapter || '')
    ) {
      return 'Equilibrium';
    }

    return resolveChemistryStandardChapter(q.chapter, q.topic, q.question_text, q.id);
  }

  const map = {};
  for (const q of list) {
    const ch = getQuestionChapter(q);
    if (!map[ch]) map[ch] = { mcq: 0, ar: 0, total: 0 };
    if (q.question_type === 'assertion_reason') {
      map[ch].ar++;
    } else {
      map[ch].mcq++;
    }
    map[ch].total++;
  }

  console.log('\n=== Live Chemistry Chapter Breakdown in Frontend QuestionBank ===');
  for (const [ch, counts] of Object.entries(map).sort()) {
    console.log(`- ${ch}: Total=${counts.total} (MCQ=${counts.mcq}, AR=${counts.ar})`);
  }
}

verify().catch(console.error);
