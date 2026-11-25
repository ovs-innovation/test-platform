import { ALL_BASIC_CHEM_QUESTIONS } from './basic_chem_jee_pyq_questions_data.mjs';
import { ALL_PERIODICITY_QUESTIONS } from './periodicity_jee_pyq_questions_data.mjs';
import { ALL_PBLOCK_JEE_PYQ_QUESTIONS } from './pblock_jee_pyq_questions_data.mjs';
import { ALL_CHEMEQ_JEE_PYQ_QUESTIONS } from './chemeq_jee_pyq_questions_data.mjs';
import { ALL_REDOX_JEE_PYQ_QUESTIONS } from './redox_jee_pyq_questions_data.mjs';
import { ALL_IONIC_JEE_PYQ_QUESTIONS } from './ionic_jee_pyq_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

const CHAPTERS_TO_SYNC = [
  {
    name: 'Some Basic Concepts of Chemistry',
    chapterId: 95,
    questions: ALL_BASIC_CHEM_QUESTIONS
  },
  {
    name: 'Classification of Elements and Periodicity in Properties',
    chapterId: 94,
    questions: ALL_PERIODICITY_QUESTIONS
  },
  {
    name: 'The p-Block Elements (Gr. 13 & 14)',
    chapterId: 247,
    questions: ALL_PBLOCK_JEE_PYQ_QUESTIONS
  },
  {
    name: 'Chemical Equilibrium',
    chapterId: 11,
    questions: ALL_CHEMEQ_JEE_PYQ_QUESTIONS
  },
  {
    name: 'Redox Reactions',
    chapterId: 185,
    questions: ALL_REDOX_JEE_PYQ_QUESTIONS
  },
  {
    name: 'Ionic Equilibrium',
    chapterId: 13,
    questions: ALL_IONIC_JEE_PYQ_QUESTIONS
  }
];

async function syncAll() {
  console.log('=== AUTHENTICATING WITH EDVEDUM.COM ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  if (!loginRes.ok) {
    throw new Error(`Login failed: ${await loginRes.text()}`);
  }
  const { token } = await loginRes.json();
  console.log('Authentication successful.');

  const subjectId = 6; // Chemistry

  for (const chapterInfo of CHAPTERS_TO_SYNC) {
    console.log(`\n============================================================`);
    console.log(`Syncing "${chapterInfo.name}" (Live Chapter ID: ${chapterInfo.chapterId})`);
    console.log(`Questions to upload: ${chapterInfo.questions.length}`);
    console.log(`============================================================`);

    const BATCH_SIZE = 10;
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < chapterInfo.questions.length; i += BATCH_SIZE) {
      const batch = chapterInfo.questions.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (q) => {
        const isNum = q.question_type === 'numerical' || (q.numeric_answer !== null && q.numeric_answer !== undefined);

        let optionsPayload;
        let correctIndexPayload;
        let correctIndicesPayload;
        let numericAnswerPayload;

        if (isNum) {
          optionsPayload = [];
          correctIndexPayload = null;
          correctIndicesPayload = [];
          numericAnswerPayload = Number(q.numeric_answer);
        } else {
          optionsPayload = (q.options || []).map((t, idx) => ({
            id: ['A', 'B', 'C', 'D'][idx] || String(idx),
            text: String(t).trim()
          }));
          correctIndexPayload = q.correct_option !== undefined && q.correct_option !== null ? Number(q.correct_option) : 0;
          correctIndicesPayload = [correctIndexPayload];
          numericAnswerPayload = null;
        }

        const payload = {
          category: 'Chemistry',
          subject: 'Chemistry',
          subject_id: subjectId,
          chapter: chapterInfo.name,
          chapter_id: chapterInfo.chapterId,
          topic: chapterInfo.name,
          question_type: isNum ? 'numerical' : 'mcq',
          question_text: q.question_text || q.question,
          options: optionsPayload,
          correct_index: correctIndexPayload,
          correct_indices: correctIndicesPayload,
          numeric_answer: numericAnswerPayload,
          numerical_tolerance: 0,
          marks: q.marks || 4,
          negative_marks: isNum ? 0 : 1,
          difficulty: q.difficulty || 'medium',
          image_url: q.image_url || null,
          solution_image_url: q.solution_image_url || null,
          solution: q.solution || null,
          exam_type: 'JEE',
          status: 'active'
        };

        try {
          const res = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
          if (!res.ok) {
            const err = await res.text();
            throw new Error(`HTTP ${res.status}: ${err}`);
          }
          successCount++;
        } catch (err) {
          console.error(`Failed Q${q.qNum} in ${chapterInfo.name}:`, err.message);
          failCount++;
        }
      }));

      if ((i + BATCH_SIZE) % 50 === 0 || i + BATCH_SIZE >= chapterInfo.questions.length) {
        console.log(`Progress [${chapterInfo.name}]: ${Math.min(i + BATCH_SIZE, chapterInfo.questions.length)}/${chapterInfo.questions.length} uploaded...`);
      }
    }

    console.log(`Completed "${chapterInfo.name}". Success: ${successCount}, Failed: ${failCount}`);
  }

  // Final verification across all Chemistry JEE questions
  console.log(`\n=== FINAL LIVE VERIFICATION ===`);
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalData = await finalRes.json();
  const allLive = finalData.questions || [];
  console.log(`Total Live Chemistry JEE Questions: ${allLive.length}`);

  const countsByChapter = {};
  for (const q of allLive) {
    const ch = q.chapter || q.chapter_name || `ID_${q.chapter_id}`;
    countsByChapter[ch] = (countsByChapter[ch] || 0) + 1;
  }
  console.log('Live Chemistry JEE questions by chapter:');
  console.table(countsByChapter);
}

syncAll().catch(console.error);
