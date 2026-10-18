
export const NEET_SUBJECTS = ['Physics', 'Chemistry', 'Botany', 'Zoology'];

/**
 * Checks whether an assessment follows the NEET UG pattern based on test_type, title, syllabus,
 * or question count (180 questions).
 */
export function isNeetTest(assessment = {}, questions = []) {
  const type = String(assessment.test_type || '').toUpperCase();
  const title = String(assessment.title || assessment.test_name || '').toUpperCase();
  const syllabus = String(assessment.syllabus || '').toUpperCase();

  if (type.includes('NEET') || title.includes('NEET') || syllabus.includes('NEET')) {
    return true;
  }

  // Also check if question count is 180 with standard subjects
  const qCount = questions.length || assessment.total_questions || 0;
  if (qCount === 180) {
    return true;
  }

  return false;
}

/**
 * Normalizes subject names into standard NEET subjects: 'Physics', 'Chemistry', 'Botany', 'Zoology'.
 */
export function normalizeNeetSubject(name = '') {
  if (!name || typeof name !== 'string') return null;
  const lower = name.toLowerCase().trim();

  if (lower.includes('phys')) return 'Physics';
  if (lower.includes('chem')) return 'Chemistry';
  if (lower.includes('botan')) return 'Botany';
  if (lower.includes('zool')) return 'Zoology';
  if (lower.includes('bio')) {
    return 'Biology';
  }
  return null;
}

export function resolveQuestionNeetMeta(q = {}, index = 0, totalQuestions = 180) {
  const actualTotal = Number(q.totalQuestions || q.total_questions || totalQuestions || 180);
  const pos = Number(q.position || q.question_number || q.questionNumber || (index + 1));

  // 1. Check explicit tags on question if present
  let explicitSubject = normalizeNeetSubject(q.subject || q.subject_name || q.bank_category);
  let explicitSection = null;

  const sectionRaw = String(q.section || q.section_name || q.section_letter || '').toUpperCase().trim();
  if (sectionRaw.includes('SECTION D') || sectionRaw.endsWith(' D') || sectionRaw === 'D' || sectionRaw.includes('SEC D') || sectionRaw.includes('SEC-D')) {
    explicitSection = 'D';
  } else if (sectionRaw.includes('SECTION C') || sectionRaw.endsWith(' C') || sectionRaw === 'C' || sectionRaw.includes('SEC C') || sectionRaw.includes('SEC-C')) {
    explicitSection = 'C';
  } else if (sectionRaw.includes('SECTION B') || sectionRaw.endsWith(' B') || sectionRaw === 'B' || sectionRaw.includes('SEC B') || sectionRaw.includes('SEC-B')) {
    explicitSection = 'B';
  } else if (sectionRaw.includes('SECTION A') || sectionRaw.endsWith(' A') || sectionRaw === 'A' || sectionRaw.includes('SEC A') || sectionRaw.includes('SEC-A')) {
    explicitSection = 'A';
  }

  // If explicit subject is Biology, handle sub-split into Botany and Zoology
  let bioSplitSubject = null;
  if (explicitSubject === 'Biology') {
    const bioIdx = (q.subjectQuestionIndex !== undefined) ? Number(q.subjectQuestionIndex) :
                   (q.subject_index !== undefined) ? Number(q.subject_index) :
                   (q.bioIndex !== undefined) ? Number(q.bioIndex) : null;
    const totalBio = Number(q.totalSubjectQuestions || q.total_bio || 90);
    if (bioIdx !== null) {
      bioSplitSubject = (bioIdx < Math.floor(totalBio / 2)) ? 'Botany' : 'Zoology';
    }
  }

  // Standard NEET 180-question paper layout:
  // Section-A: Physics (1-45), Section-B: Chemistry (46-90), Section-C: Botany (91-135), Section-D: Zoology (136-180)
  let fallbackSubject = 'Physics';
  let fallbackSection = 'A';
  let subjectQNum = pos;

  if (pos >= 1 && pos <= 45) {
    fallbackSubject = 'Physics';
    fallbackSection = 'A';
    subjectQNum = pos;
  } else if (pos >= 46 && pos <= 90) {
    fallbackSubject = 'Chemistry';
    fallbackSection = 'B';
    subjectQNum = pos - 45;
  } else if (pos >= 91 && pos <= 135) {
    fallbackSubject = 'Botany';
    fallbackSection = 'C';
    subjectQNum = pos - 90;
  } else if (pos >= 136 && pos <= 180) {
    fallbackSubject = 'Zoology';
    fallbackSection = 'D';
    subjectQNum = pos - 135;
  } else {
    // If questions exceed 180, distribute appropriately
    subjectQNum = pos;
  }

  let finalSubject = bioSplitSubject || explicitSubject;
  if (!finalSubject || finalSubject === 'Biology') {
    finalSubject = fallbackSubject;
  }

  const finalSection = explicitSection || (finalSubject === 'Botany' ? 'C' : (finalSubject === 'Zoology' ? 'D' : (finalSubject === 'Chemistry' ? 'B' : fallbackSection)));

  return {
    subject: finalSubject,
    section: finalSection,
    sectionTag: `Section-${finalSection}`,
    subjectQuestionNumber: subjectQNum,
    overallQuestionNumber: pos,
    isSectionB: finalSection === 'B',
  };
}

const BOTANY_REGEX = /plant|botan|algae|riccia|bryophyte|pteridophyte|selaginella|salvinia|gymnosperm|angiosperm|homosporous|flower|stomata|guard cell|leaves|mesophyll|cambium|vascular bundle|stem|dicot|monocot|morphology|androecium|mustard|vexillary|aestivation|solanaceae|potato|cereal|china rose|family|apocarpous|biological classification|archaebacteria|eubacteria|fungus|fungi|deuteromycetes|virus|viroid|prion|lichen|dinoflagellate|protist|living world|taxonomic|taxonomy|binomial|chloroplast|cell wall|photosynthesis/i;

/**
 * Normalizes an assessment's questions and sections to strictly enforce standard NEET UG layout:
 * - Section-A: Physics (Questions 1 to 45)
 * - Section-B: Chemistry (Questions 46 to 90)
 * - Section-C: Botany (Questions 91 to 135)
 * - Section-D: Zoology (Questions 136 to 180)
 */
export function normalizeNeetAssessmentPayload(assessment = {}, questions = [], sections = []) {
  if (!Array.isArray(questions) || questions.length !== 180) {
    return { questions, sections };
  }

  const isNeet = isNeetTest(assessment, questions);
  if (!isNeet) {
    return { questions, sections };
  }

  const physics = [];
  const chemistry = [];
  const botany = [];
  const zoology = [];
  const biology = [];
  const unassigned = [];

  for (let idx = 0; idx < questions.length; idx++) {
    const q = questions[idx];
    const rawSubj = q.subject || q.bank_category || (q.section_name) || '';
    const norm = normalizeNeetSubject(rawSubj);
    const origNum = Number(q.original_question_number || (q.extraction_meta && q.extraction_meta.original_question_number) || 0);
    const pos = Number(q.position || idx + 1);

    if (norm === 'Physics' || (origNum >= 91 && origNum <= 135 && !norm) || (pos >= 91 && pos <= 135 && !norm && idx >= 90 && idx <= 134)) {
      physics.push(q);
    } else if (norm === 'Chemistry' || (origNum >= 136 && origNum <= 180 && !norm) || (pos >= 136 && pos <= 180 && !norm && idx >= 135 && idx <= 179)) {
      chemistry.push(q);
    } else if (norm === 'Botany') {
      botany.push(q);
    } else if (norm === 'Zoology') {
      zoology.push(q);
    } else if (norm === 'Biology' || (origNum >= 1 && origNum <= 90)) {
      biology.push(q);
    } else {
      unassigned.push(q);
    }
  }

  // Pool biology questions together
  const allBio = [...botany, ...zoology, ...biology];

  let finalBotany = [];
  let finalZoology = [];

  if (allBio.length === 90) {
    const botList = [];
    const zooList = [];

    for (const q of allBio) {
      const text = `${q.topic || ''} ${q.chapter || ''} ${q.question_text || ''}`;
      const isExplicitBotany = normalizeNeetSubject(q.subject) === 'Botany';
      const matchesBotany = BOTANY_REGEX.test(text);

      if (isExplicitBotany || matchesBotany) {
        if (botList.length < 45) {
          botList.push(q);
        } else {
          zooList.push(q);
        }
      } else {
        zooList.push(q);
      }
    }

    while (botList.length < 45 && zooList.length > 45) {
      botList.push(zooList.shift());
    }

    finalBotany = botList;
    finalZoology = zooList;
  } else {
    // If exact 90 wasn't partitioned, balance as evenly as possible
    finalBotany = botany;
    finalZoology = zoology;
    for (const q of biology) {
      if (finalBotany.length < 45) finalBotany.push(q);
      else finalZoology.push(q);
    }
  }

  // Fill physics and chemistry from unassigned if necessary
  while (physics.length < 45 && unassigned.length > 0) physics.push(unassigned.shift());
  while (chemistry.length < 45 && unassigned.length > 0) chemistry.push(unassigned.shift());

  // Only apply standard sequence if all 4 subjects have 45 questions each
  if (physics.length !== 45 || chemistry.length !== 45 || finalBotany.length !== 45 || finalZoology.length !== 45) {
    return { questions, sections };
  }

  // Match existing section IDs if available
  const secMap = {};
  if (Array.isArray(sections)) {
    for (const s of sections) {
      const name = String(s.name || '').toLowerCase();
      if (name.includes('phys')) secMap.Physics = s.id;
      else if (name.includes('chem')) secMap.Chemistry = s.id;
      else if (name.includes('botan')) secMap.Botany = s.id;
      else if (name.includes('zool')) secMap.Zoology = s.id;
    }
  }

  const normalizedSections = [
    { id: secMap.Physics || 'sec-phy', assessment_id: assessment.id, name: 'Section-A: Physics', position: 1, section_type: 'technical_mcq', total_questions: 45 },
    { id: secMap.Chemistry || 'sec-chem', assessment_id: assessment.id, name: 'Section-B: Chemistry', position: 2, section_type: 'technical_mcq', total_questions: 45 },
    { id: secMap.Botany || 'sec-bot', assessment_id: assessment.id, name: 'Section-C: Botany', position: 3, section_type: 'technical_mcq', total_questions: 45 },
    { id: secMap.Zoology || 'sec-zoo', assessment_id: assessment.id, name: 'Section-D: Zoology', position: 4, section_type: 'technical_mcq', total_questions: 45 },
  ];

  const normalizedQuestions = [];

  // 1. Physics: 1 to 45
  physics.forEach((q, idx) => {
    normalizedQuestions.push({
      ...q,
      position: idx + 1,
      subject: 'Physics',
      bank_category: 'Physics',
      section: 'A',
      sectionTag: 'Section-A',
      section_id: secMap.Physics || q.section_id || 'sec-phy',
      questionNumber: idx + 1,
      overallQuestionNumber: idx + 1,
      is_neet: true,
      is_section_b: false,
    });
  });

  // 2. Chemistry: 46 to 90
  chemistry.forEach((q, idx) => {
    normalizedQuestions.push({
      ...q,
      position: 46 + idx,
      subject: 'Chemistry',
      bank_category: 'Chemistry',
      section: 'B',
      sectionTag: 'Section-B',
      section_id: secMap.Chemistry || q.section_id || 'sec-chem',
      questionNumber: idx + 1,
      overallQuestionNumber: 46 + idx,
      is_neet: true,
      is_section_b: true,
    });
  });

  // 3. Botany: 91 to 135
  finalBotany.forEach((q, idx) => {
    normalizedQuestions.push({
      ...q,
      position: 91 + idx,
      subject: 'Botany',
      bank_category: 'Botany',
      section: 'C',
      sectionTag: 'Section-C',
      section_id: secMap.Botany || q.section_id || 'sec-bot',
      questionNumber: idx + 1,
      overallQuestionNumber: 91 + idx,
      is_neet: true,
      is_section_b: false,
    });
  });

  // 4. Zoology: 136 to 180
  finalZoology.forEach((q, idx) => {
    normalizedQuestions.push({
      ...q,
      position: 136 + idx,
      subject: 'Zoology',
      bank_category: 'Zoology',
      section: 'D',
      sectionTag: 'Section-D',
      section_id: secMap.Zoology || q.section_id || 'sec-zoo',
      questionNumber: idx + 1,
      overallQuestionNumber: 136 + idx,
      is_neet: true,
      is_section_b: false,
    });
  });

  return {
    questions: normalizedQuestions,
    sections: normalizedSections,
  };
}

/**
 * Checks whether a candidate attempted a question.
 */
function isAttemptedAnswer(ans, qType = 'mcq') {
  if (!ans) return false;
  if (ans.selected_index !== undefined && ans.selected_index !== null) return true;
  if (Array.isArray(ans.selected_indices) && ans.selected_indices.length > 0) return true;
  if (ans.numeric_answer !== undefined && ans.numeric_answer !== null && ans.numeric_answer !== '') return true;
  return false;
}

/**
 * Checks if a response matches correct answer.
 */
export function checkIsCorrect(q, ans) {
  const type = q.question_type || 'mcq';
  if (type === 'mcq' || type === 'single_choice' || type === 'assertion_reason') {
    return ans?.selected_index === q.correct_index;
  }
  if (type === 'multi_select') {
    const userSel = Array.isArray(ans?.selected_indices) ? ans.selected_indices : (ans?.selected_index != null ? [ans.selected_index] : []);
    const correctSel = Array.isArray(q.correct_indices) ? q.correct_indices : (q.correct_index != null ? [q.correct_index] : []);
    if (userSel.length !== correctSel.length) return false;
    const sortedUser = [...userSel].sort((a, b) => a - b);
    const sortedCorr = [...correctSel].sort((a, b) => a - b);
    return sortedUser.every((v, i) => v === sortedCorr[i]);
  }
  if (type === 'integer') {
    if (ans?.numeric_answer == null) return false;
    const userVal = Number(ans.numeric_answer);
    const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
    const meta = typeof q.extraction_meta === 'string'
      ? (() => { try { return JSON.parse(q.extraction_meta); } catch { return null; } })()
      : q.extraction_meta;
    const accepted = (
      Array.isArray(q.accepted_answers) ? q.accepted_answers :
      Array.isArray(q.acceptedAnswers) ? q.acceptedAnswers :
      Array.isArray(meta?.acceptedAnswers) ? meta.acceptedAnswers :
      (targetVal !== null ? [targetVal] : [])
    ).map(Number);
    return accepted.length > 0 && accepted.some((acc) => Math.round(userVal) === Math.round(acc));
  }
  if (type === 'numerical') {
    if (ans?.numeric_answer == null) return false;
    const userVal = Number(ans.numeric_answer);
    const targetVal = q.numeric_answer != null ? Number(q.numeric_answer) : null;
    const tol = Number(q.numerical_tolerance) || 0.01;
    const meta = typeof q.extraction_meta === 'string'
      ? (() => { try { return JSON.parse(q.extraction_meta); } catch { return null; } })()
      : q.extraction_meta;
    const accepted = (
      Array.isArray(q.accepted_answers) ? q.accepted_answers :
      Array.isArray(q.acceptedAnswers) ? q.acceptedAnswers :
      Array.isArray(meta?.acceptedAnswers) ? meta.acceptedAnswers :
      (targetVal !== null ? [targetVal] : [])
    ).map(Number);
    return accepted.length > 0 && accepted.some((acc) => Math.abs(userVal - acc) <= tol);
  }
  return false;
}

/**
 * NEET Scoring Engine
 * 
 * Rules:
 * 1. For each of the 4 subjects (Physics, Chemistry, Botany, Zoology):
 *    - Section A (35 questions): evaluate all attempted questions (+4, -1, 0).
 *    - Section B (15 questions): sort attempted questions by position/question number,
 *      STRICTLY evaluate only the first 10 attempted questions (+4, -1, 0).
 *      Any attempted questions beyond the first 10 are ignored (marked as excess/uncounted).
 * 2. Max achievable marks = 720 across 180 evaluated questions.
 */
export function evaluateNeetAttempt({
  questions = [],
  answers = [],
  negEnabled = true,
  negPenalty = 1,
}) {
  const ansMap = new Map(answers.map((a) => [a.question_id, a]));

  const hasSecB = questions.some((q, idx) => {
    const meta = resolveQuestionNeetMeta(q, idx, questions.length);
    return meta.isSectionB;
  });

  if (!hasSecB || questions.length === 180) {
    let totalMarksObtained = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnattempted = 0;
    const evaluatedQuestionsMap = new Map();
    const subjectStats = {};
    for (const s of NEET_SUBJECTS) {
      subjectStats[s] = {
        subject: s,
        totalQuestions: 0,
        totalMarks: 0,
        marksObtained: 0,
        attempted: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
      };
    }

    questions.forEach((q, idx) => {
      const meta = resolveQuestionNeetMeta(q, idx, questions.length);
      const subj = meta.subject || 'General';
      if (!subjectStats[subj]) {
        subjectStats[subj] = {
          subject: subj,
          totalQuestions: 0,
          totalMarks: 0,
          marksObtained: 0,
          attempted: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
        };
      }
      const st = subjectStats[subj];
      st.totalQuestions++;
      st.totalMarks += (q.marks || 4);

      const ans = ansMap.get(q.id);
      const isAtt = isAttemptedAnswer(ans, q.question_type);
      if (!isAtt) {
        st.unattempted++;
        totalUnattempted++;
        evaluatedQuestionsMap.set(q.id, {
          evaluated: true,
          isSectionB: false,
          isExcess: false,
          isAttempted: false,
          isCorrect: false,
          marksObtained: 0,
        });
      } else {
        st.attempted++;
        const correct = checkIsCorrect(q, ans);
        if (correct) {
          st.correct++;
          const m = q.marks || 4;
          st.marksObtained += m;
          totalCorrect++;
          totalMarksObtained += m;
          evaluatedQuestionsMap.set(q.id, {
            evaluated: true,
            isSectionB: false,
            isExcess: false,
            isAttempted: true,
            isCorrect: true,
            marksObtained: m,
          });
        } else {
          st.incorrect++;
          const penalty = negEnabled ? negPenalty : 0;
          st.marksObtained -= penalty;
          totalWrong++;
          totalMarksObtained -= penalty;
          evaluatedQuestionsMap.set(q.id, {
            evaluated: true,
            isSectionB: false,
            isExcess: false,
            isAttempted: true,
            isCorrect: false,
            marksObtained: -penalty,
          });
        }
      }
    });

    const finalMarksObtained = Math.max(0, Number(totalMarksObtained.toFixed(2)));
    const maxMarks = 720;
    const percentage = Number(((finalMarksObtained / maxMarks) * 100).toFixed(2));

    return {
      isNeet: true,
      totalMarks: maxMarks,
      marksObtained: finalMarksObtained,
      percentage,
      correctCount: totalCorrect,
      wrongCount: totalWrong,
      unattemptedCount: totalUnattempted,
      evaluatedQuestionsCount: questions.length,
      subjectResults: subjectStats,
      evaluatedQuestionsMap,
    };
  }

  // Group questions by subject and section
  const subjectGroups = {
    Physics: { A: [], B: [] },
    Chemistry: { A: [], B: [] },
    Botany: { A: [], B: [] },
    Zoology: { A: [], B: [] },
  };

  const otherQuestions = [];

  questions.forEach((q, idx) => {
    const meta = resolveQuestionNeetMeta(q, idx, questions.length);
    const subj = meta.subject;
    const sec = meta.section;

    const item = {
      ...q,
      neetMeta: meta,
      answer: ansMap.get(q.id) || null,
      isAttempted: isAttemptedAnswer(ansMap.get(q.id), q.question_type),
    };

    if (subjectGroups[subj] && (sec === 'A' || sec === 'B')) {
      subjectGroups[subj][sec].push(item);
    } else {
      otherQuestions.push(item);
    }
  });

  let totalMarksObtained = 0;
  let totalCorrect = 0;
  let totalWrong = 0;
  let totalUnattempted = 0;
  let totalEvaluatedCount = 0;

  const subjectResults = {};
  const evaluatedQuestionsMap = new Map(); // question_id -> evaluation details

  for (const subj of NEET_SUBJECTS) {
    const secA = subjectGroups[subj].A;
    const secB = subjectGroups[subj].B;

    let secAMarks = 0;
    let secACorrect = 0;
    let secAWrong = 0;
    let secAUnattempted = 0;

    // Section A: evaluate all 35 questions
    for (const item of secA) {
      totalEvaluatedCount++;
      if (!item.isAttempted) {
        secAUnattempted++;
        totalUnattempted++;
        evaluatedQuestionsMap.set(item.id, {
          evaluated: true,
          isSectionB: false,
          isExcess: false,
          isAttempted: false,
          isCorrect: false,
          marksObtained: 0,
        });
      } else {
        const correct = checkIsCorrect(item, item.answer);
        if (correct) {
          secACorrect++;
          secAMarks += (item.marks || 4);
          totalCorrect++;
          totalMarksObtained += (item.marks || 4);
          evaluatedQuestionsMap.set(item.id, {
            evaluated: true,
            isSectionB: false,
            isExcess: false,
            isAttempted: true,
            isCorrect: true,
            marksObtained: item.marks || 4,
          });
        } else {
          secAWrong++;
          const penalty = negEnabled ? negPenalty : 0;
          secAMarks -= penalty;
          totalWrong++;
          totalMarksObtained -= penalty;
          evaluatedQuestionsMap.set(item.id, {
            evaluated: true,
            isSectionB: false,
            isExcess: false,
            isAttempted: true,
            isCorrect: false,
            marksObtained: -penalty,
          });
        }
      }
    }

    // Section B: Sort by question position/number
    secB.sort((a, b) => (a.position || 0) - (b.position || 0));

    let secBMarks = 0;
    let secBCorrect = 0;
    let secBWrong = 0;
    let secBUnattempted = 0;
    let secBAttemptedCount = 0;
    let evaluatedSecBCount = 0;

    for (const item of secB) {
      if (!item.isAttempted) {
        evaluatedQuestionsMap.set(item.id, {
          evaluated: false,
          isSectionB: true,
          isExcess: false,
          isAttempted: false,
          isCorrect: false,
          marksObtained: 0,
        });
      } else {
        secBAttemptedCount++;
        if (evaluatedSecBCount < 10) {
          // One of the first 10 attempted questions -> evaluate
          evaluatedSecBCount++;
          totalEvaluatedCount++;
          const correct = checkIsCorrect(item, item.answer);
          if (correct) {
            secBCorrect++;
            secBMarks += (item.marks || 4);
            totalCorrect++;
            totalMarksObtained += (item.marks || 4);
            evaluatedQuestionsMap.set(item.id, {
              evaluated: true,
              isSectionB: true,
              isExcess: false,
              isAttempted: true,
              isCorrect: true,
              marksObtained: item.marks || 4,
            });
          } else {
            secBWrong++;
            const penalty = negEnabled ? negPenalty : 0;
            secBMarks -= penalty;
            totalWrong++;
            totalMarksObtained -= penalty;
            evaluatedQuestionsMap.set(item.id, {
              evaluated: true,
              isSectionB: true,
              isExcess: false,
              isAttempted: true,
              isCorrect: false,
              marksObtained: -penalty,
            });
          }
        } else {
          // Excess attempt beyond 10 -> IGNORE
          evaluatedQuestionsMap.set(item.id, {
            evaluated: false,
            isSectionB: true,
            isExcess: true,
            isAttempted: true,
            isCorrect: checkIsCorrect(item, item.answer),
            marksObtained: 0,
            excessNotice: 'Question exceeded the 10-attempt limit for Section B and was not evaluated.',
          });
        }
      }
    }

    // Unattempted quota for Section B out of 10
    secBUnattempted = Math.max(0, 10 - evaluatedSecBCount);
    totalUnattempted += secBUnattempted;

    subjectResults[subj] = {
      subject: subj,
      totalMarks: 180,
      marksObtained: Math.max(0, Number((secAMarks + secBMarks).toFixed(2))),
      totalEvaluated: secA.length + evaluatedSecBCount, // Max 45
      sectionA: {
        maxMarks: 140,
        totalQuestions: secA.length || 35,
        attempted: secACorrect + secAWrong,
        correct: secACorrect,
        incorrect: secAWrong,
        unattempted: secAUnattempted,
        marks: Number(secAMarks.toFixed(2)),
      },
      sectionB: {
        maxMarks: 40,
        totalQuestions: secB.length || 15,
        maxAttemptAllowed: 10,
        totalAttempted: secBAttemptedCount,
        evaluatedAttempted: evaluatedSecBCount,
        correct: secBCorrect,
        incorrect: secBWrong,
        unattempted: secBUnattempted,
        marks: Number(secBMarks.toFixed(2)),
      },
    };
  }

  // Handle any other questions if test had non-standard items
  for (const item of otherQuestions) {
    if (item.isAttempted) {
      const correct = checkIsCorrect(item, item.answer);
      if (correct) {
        totalCorrect++;
        totalMarksObtained += (item.marks || 4);
      } else {
        totalWrong++;
        if (negEnabled) totalMarksObtained -= negPenalty;
      }
    } else {
      totalUnattempted++;
    }
  }

  const finalMarksObtained = Math.max(0, Number(totalMarksObtained.toFixed(2)));
  const maxMarks = 720;
  const percentage = Number(((finalMarksObtained / maxMarks) * 100).toFixed(2));

  return {
    isNeet: true,
    totalMarks: maxMarks,
    marksObtained: finalMarksObtained,
    percentage,
    correctCount: totalCorrect,
    wrongCount: totalWrong,
    unattemptedCount: totalUnattempted,
    evaluatedQuestionsCount: Math.min(180, totalEvaluatedCount),
    subjectResults,
    evaluatedQuestionsMap,
  };
}

/**
 * NEET Score to Rank Predictor Table
 * Directly mapped according to standard National NEET UG percentile / rank distribution benchmarks:
 * - 672–720: 1–10
 * - 650–671: 11–100
 * - 630–649: 101–500
 * - 616–629: 501–1,000
 * - 571–615: 1,001–5,000
 * - 542–570: 5,001–10,000
 * - 528–541: 10,001–20,000
 * - 515–527: 20,001–30,000
 * - 496–514: 30,001–50,000
 * - 465–495: 50,001–1,00,000
 * - 424–464: 1,00,001–2,00,000
 * - Below 424: Above 2,00,000
 */
export const NEET_RANK_TABLE = [
  { minScore: 672, maxScore: 720, minRank: 1, maxRank: 10, rangeDisplay: '1–10' },
  { minScore: 650, maxScore: 671, minRank: 11, maxRank: 100, rangeDisplay: '11–100' },
  { minScore: 630, maxScore: 649, minRank: 101, maxRank: 500, rangeDisplay: '101–500' },
  { minScore: 616, maxScore: 629, minRank: 501, maxRank: 1000, rangeDisplay: '501–1,000' },
  { minScore: 571, maxScore: 615, minRank: 1001, maxRank: 5000, rangeDisplay: '1,001–5,000' },
  { minScore: 542, maxScore: 570, minRank: 5001, maxRank: 10000, rangeDisplay: '5,001–10,000' },
  { minScore: 528, maxScore: 541, minRank: 10001, maxRank: 20000, rangeDisplay: '10,001–20,000' },
  { minScore: 515, maxScore: 527, minRank: 20001, maxRank: 30000, rangeDisplay: '20,001–30,000' },
  { minScore: 496, maxScore: 514, minRank: 30001, maxRank: 50000, rangeDisplay: '30,001–50,000' },
  { minScore: 465, maxScore: 495, minRank: 50001, maxRank: 100000, rangeDisplay: '50,001–1,00,000' },
  { minScore: 424, maxScore: 464, minRank: 100001, maxRank: 200000, rangeDisplay: '1,00,001–2,00,000' },
  { minScore: -180, maxScore: 423, minRank: 200001, maxRank: 2000000, rangeDisplay: 'Above 2,00,000' },
];

/**
 * Predicts NEET All India Rank (AIR), rank range, and percentile from marks obtained.
 * @param {number|string} scoreVal
 * @returns {{
 *   rank: number,
 *   rank_range: string,
 *   predicted_rank_range: string,
 *   percentile: number,
 *   minRank: number,
 *   maxRank: number
 * }}
 */
export function predictNeetRank(scoreVal) {
  const s = Math.round(Number(scoreVal) || 0);

  if (s >= 720) {
    return {
      rank: 1,
      rank_range: '1–10',
      predicted_rank_range: '1–10',
      rangeDisplay: '1–10',
      percentile: 99.99,
      minRank: 1,
      maxRank: 10,
    };
  }

  for (const bracket of NEET_RANK_TABLE) {
    if (s >= bracket.minScore && s <= bracket.maxScore) {
      let rankNumber;
      if (bracket.rangeDisplay === 'Above 2,00,000') {
        const clamped = Math.max(0, Math.min(423, s));
        const fraction = (423 - clamped) / 423;
        rankNumber = Math.round(200001 + fraction * (1800000 - 200001));
      } else {
        const span = bracket.maxScore - bracket.minScore;
        const fraction = span > 0 ? (bracket.maxScore - s) / span : 0;
        rankNumber = Math.round(bracket.minRank + fraction * (bracket.maxRank - bracket.minRank));
      }
      rankNumber = Math.min(bracket.maxRank, Math.max(bracket.minRank, rankNumber));

      let percentile;
      if (s <= 0) {
        percentile = 0.00;
      } else {
        const rawPct = ((2000000 - rankNumber) / 2000000) * 100;
        percentile = Number(Math.max(0.01, Math.min(99.99, rawPct)).toFixed(2));
      }

      return {
        rank: rankNumber,
        rank_range: bracket.rangeDisplay,
        predicted_rank_range: bracket.rangeDisplay,
        rangeDisplay: bracket.rangeDisplay,
        percentile,
        minRank: bracket.minRank,
        maxRank: bracket.maxRank,
      };
    }
  }

  return {
    rank: 2000000,
    rank_range: 'Above 2,00,000',
    predicted_rank_range: 'Above 2,00,000',
    rangeDisplay: 'Above 2,00,000',
    percentile: 0.00,
    minRank: 200001,
    maxRank: 2000000,
  };
}

