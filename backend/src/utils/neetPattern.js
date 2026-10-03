
export const NEET_SUBJECTS = ['Physics', 'Chemistry', 'Botany', 'Zoology'];

/**
 * Checks whether an assessment follows the NEET UG pattern based on test_type, title, syllabus,
 * or question count (200 questions).
 */
export function isNeetTest(assessment = {}, questions = []) {
  const type = String(assessment.test_type || '').toUpperCase();
  const title = String(assessment.title || assessment.test_name || '').toUpperCase();
  const syllabus = String(assessment.syllabus || '').toUpperCase();

  if (type.includes('NEET') || title.includes('NEET') || syllabus.includes('NEET')) {
    return true;
  }

  // Also check if question count is 200 or close to 200 with standard subjects
  const qCount = questions.length || assessment.total_questions || 0;
  if (qCount === 200 || qCount === 180) {
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

export function resolveQuestionNeetMeta(q = {}, index = 0, totalQuestions = 200) {
  const pos = Number(q.position || index + 1);

  // 1. Check explicit tags on question if present
  let explicitSubject = normalizeNeetSubject(q.subject || q.subject_name || q.bank_category);
  let explicitSection = null;

  const sectionRaw = String(q.section || q.section_name || q.section_letter || '').toUpperCase().trim();
  if (sectionRaw.includes('SECTION B') || sectionRaw.endsWith(' B') || sectionRaw === 'B' || sectionRaw.includes('SEC B') || sectionRaw.includes('SEC-B')) {
    explicitSection = 'B';
  } else if (sectionRaw.includes('SECTION A') || sectionRaw.endsWith(' A') || sectionRaw === 'A' || sectionRaw.includes('SEC A') || sectionRaw.includes('SEC-A')) {
    explicitSection = 'A';
  }

  // If 180-question paper:
  // Standard NEET paper layout (e.g. AIETS 2027): Biology (90 Qs, 1-90), Physics (45 Qs, 91-135), Chemistry (45 Qs, 136-180)
  if (totalQuestions === 180) {
    let fallbackSubject = 'Biology';
    let subjectQNum = pos;

    // Check if the paper follows Biology first (Q1 is Biology) or Physics first
    const isBioFirst = explicitSubject === 'Biology' ||
      pos <= 90 ||
      String(q.bank_category || '').toLowerCase().includes('bio') ||
      String(q.subject || '').toLowerCase().includes('bio');

    if (isBioFirst) {
      if (pos >= 1 && pos <= 90) {
        fallbackSubject = 'Biology';
        subjectQNum = pos;
      } else if (pos >= 91 && pos <= 135) {
        fallbackSubject = 'Physics';
        subjectQNum = pos - 90;
      } else if (pos >= 136 && pos <= 180) {
        fallbackSubject = 'Chemistry';
        subjectQNum = pos - 135;
      }
    } else {
      if (pos >= 1 && pos <= 45) {
        fallbackSubject = 'Physics';
        subjectQNum = pos;
      } else if (pos >= 46 && pos <= 90) {
        fallbackSubject = 'Chemistry';
        subjectQNum = pos - 45;
      } else if (pos >= 91 && pos <= 180) {
        fallbackSubject = 'Biology';
        subjectQNum = pos - 90;
      }
    }

    const finalSubject = explicitSubject || fallbackSubject;
    return {
      subject: finalSubject,
      section: explicitSection || null,
      subjectQuestionNumber: subjectQNum,
      overallQuestionNumber: pos,
      isSectionB: explicitSection === 'B',
    };
  }

  // 2. Default to standard NEET 200 sequential mapping if 200 questions or pos in 1..200
  let fallbackSubject = 'Physics';
  let fallbackSection = 'A';
  let subjectQNum = pos;

  if (pos >= 1 && pos <= 50) {
    fallbackSubject = 'Physics';
    fallbackSection = pos <= 35 ? 'A' : 'B';
    subjectQNum = pos;
  } else if (pos >= 51 && pos <= 100) {
    fallbackSubject = 'Chemistry';
    fallbackSection = pos <= 85 ? 'A' : 'B';
    subjectQNum = pos - 50;
  } else if (pos >= 101 && pos <= 150) {
    fallbackSubject = 'Botany';
    fallbackSection = pos <= 135 ? 'A' : 'B';
    subjectQNum = pos - 100;
  } else if (pos >= 151 && pos <= 200) {
    fallbackSubject = 'Zoology';
    fallbackSection = pos <= 185 ? 'A' : 'B';
    subjectQNum = pos - 150;
  }

  // If explicit subject is provided and not generic
  const finalSubject = explicitSubject || fallbackSubject;
  const finalSection = explicitSection || fallbackSection;

  return {
    subject: finalSubject,
    section: finalSection,
    subjectQuestionNumber: subjectQNum,
    overallQuestionNumber: pos,
    isSectionB: finalSection === 'B',
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
