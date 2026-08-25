/**
 * Parses raw text extracted from a test question paper PDF
 * Returns an array of formatted question objects:
 * [{ question_text, options, correct_index, marks, bank_category, solution, needs_review, review_reason }]
 */
export function parsePdfQuestions(text) {
  if (!text || typeof text !== 'string') return [];

  // Normalize line breaks and clean whitespace
  const cleanText = text.replace(/\r\n/g, '\n');

  // Separate Question Paper and Answer Key parts if present at the end
  let questionPaperPart = cleanText;
  let answerKeyPart = '';

  const headerRegex = /(?:\n\s*|\n?\s*)(?:Answer\s*Key(?:\s*&(?:amp;)?\s*(?:Explanations|Solutions))?|Answers\s*&(?:amp;)?\s*Explanations|Solutions\s*&(?:amp;)?\s*Explanations|ANSWER\s*KEY)(?:\s*\n|\s*:)/i;
  const answerKeyMatch = cleanText.match(headerRegex);

  if (answerKeyMatch && answerKeyMatch.index > 100) {
    questionPaperPart = cleanText.substring(0, answerKeyMatch.index);
    answerKeyPart = cleanText.substring(answerKeyMatch.index);
  }

  // Split into raw blocks by Q1, Q2, Q3 ... or 1., 2., 3.
  const blocks = questionPaperPart.split(/(?=\n\s*(?:Q|Question\s*)?\d+[\.\)\:]\s+)/gi);

  const questions = [];

  for (const block of blocks) {
    const qMatch = block.match(/^\s*(?:Q|Question\s*)?(\d+)[\.\)\:]\s*([\s\S]+)/i);
    if (!qMatch) continue;

    const qNum = parseInt(qMatch[1], 10);
    const body = qMatch[2].trim();

    // Extract Subject Category if present: e.g. (Physics), (Chemistry), (Biology)
    let category = 'General';
    const catMatch = body.match(/\(([A-Za-z\s]+)\)/);
    if (catMatch && ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Maths'].includes(catMatch[1].trim())) {
      category = catMatch[1].trim();
    }

    // Extract Marks if present: e.g. Marks: +4 / -1 or Marks: 4
    let marks = 4;
    const marksMatch = body.match(/Marks:\s*\+?(\d+)/i);
    if (marksMatch) {
      marks = parseInt(marksMatch[1], 10);
    }

    // Check for Inline Answer & Solution/Explanation (e.g., "Answer: B — I = V/R = 10/(4+6) = 1 A" or "Ans: B")
    let inlineCorrectIndex = 0;
    let inlineSolution = '';
    const inlineAnsMatch = body.match(/(?:Answer|Ans|Correct\s*Answer):\s*(?:\(|\[)?([A-D])(?:\)|\])?\s*(?:[—\-:\s]+(.*))?/i);
    if (inlineAnsMatch) {
      const letter = inlineAnsMatch[1].toUpperCase();
      inlineCorrectIndex = letter.charCodeAt(0) - 65;
      if (inlineAnsMatch[2]) {
        inlineSolution = inlineAnsMatch[2].trim();
      }
    }

    // Clean body text by stripping inline Answer lines before option parsing
    const cleanBodyForOptions = body.replace(/(?:^|\n)\s*(?:Answer|Ans|Correct\s*Answer):\s*[^\n]+/gi, '');

    // Attempt to extract options (A), (B), (C), (D) or A), B), C), D) or A., B., C., D.
    const options = [];
    let mainText = cleanBodyForOptions;

    // 1. Try matching (A)... (B)... (C)... (D)... or A)... B)... C)... D)...
    const inlineOptMatches = [...cleanBodyForOptions.matchAll(/(?:\(|\[|\n\s*|^)([A-D])(?:\)|\]|\.|\:)\s*([^(\n]+)/gi)];
    if (inlineOptMatches.length >= 2) {
      const firstIndex = cleanBodyForOptions.search(/(?:\(|\[|\n\s*)([A-D])(?:\)|\]|\.|\:)\s*/i);
      if (firstIndex !== -1) {
        mainText = cleanBodyForOptions.substring(0, firstIndex).trim();
      }
      for (const m of inlineOptMatches) {
        let optText = m[2].replace(/Marks:\s*[^\n]+/gi, '').trim();
        const correctMatch = optText.match(/(\d|[A-D])\s*Correct\s*Answer/i);
        if (correctMatch) {
          const val = correctMatch[1].toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(val)) {
            inlineCorrectIndex = val.charCodeAt(0) - 65;
          } else if (['1', '2', '3', '4'].includes(val)) {
            inlineCorrectIndex = parseInt(val, 10) - 1;
          }
        }
        optText = optText.replace(/(?:Answer|Ans|Correct\s*Answer):\s*[^\n]+/gi, '');
        optText = optText.replace(/\d*\s*Correct\s*(?:Answer|Option|Ans)?/gi, '').trim();
        if (optText && !options.includes(optText)) {
          options.push(optText);
        }
      }
    }

    // 2. Fallback to multiline options matching
    if (options.length < 2) {
      const firstOptIndex = cleanBodyForOptions.search(/(?:^|\n)\s*(?:\([A-D]\)|[A-D][\.\)])\s*/i);
      if (firstOptIndex !== -1) {
        mainText = cleanBodyForOptions.substring(0, firstOptIndex).trim();
        const optionsBlock = cleanBodyForOptions.substring(firstOptIndex);
        const optMatches = optionsBlock.matchAll(/(?:^|\n)\s*(?:\(([A-D])\)|([A-D])[\.\)])\s*([^\n]+)/gi);
        for (const m of optMatches) {
          let t = m[3].trim();
          const correctMatch = t.match(/(\d|[A-D])\s*Correct\s*Answer/i);
          if (correctMatch) {
            const val = correctMatch[1].toUpperCase();
            if (['A', 'B', 'C', 'D'].includes(val)) {
              inlineCorrectIndex = val.charCodeAt(0) - 65;
            } else if (['1', '2', '3', '4'].includes(val)) {
              inlineCorrectIndex = parseInt(val, 10) - 1;
            }
          }
          t = t.replace(/(?:Answer|Ans|Correct\s*Answer):\s*[^\n]+/gi, '');
          t = t.replace(/\d*\s*Correct\s*(?:Answer|Option|Ans)?/gi, '').trim();
          if (t && !options.includes(t)) options.push(t);
        }
      }
    }

    // Clean question text (strip embedded Marks/Time lines and leading subject tag)
    let cleanQText = mainText
      .replace(/Marks:\s*[^\n]+/gi, '')
      .replace(/Time:\s*[^\n]+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    cleanQText = cleanQText.replace(/^\(([A-Za-z\s]+)\)\s*/, '');

    // Instead of silent fake fallbacks like "First Choice Option", flag for review if < 2 options parsed
    const hasValidOptions = options.length >= 2;
    const needsReview = !hasValidOptions;
    const finalOptions = hasValidOptions ? options : [
      '[Needs Review] Option A',
      '[Needs Review] Option B',
      '[Needs Review] Option C',
      '[Needs Review] Option D'
    ];

    if (cleanQText) {
      questions.push({
        num: qNum,
        question_text: cleanQText,
        options: finalOptions,
        correct_index: inlineCorrectIndex,
        marks,
        bank_category: category,
        solution: inlineSolution,
        needs_review: needsReview,
        review_reason: needsReview ? `Question ${qNum}: Option text could not be automatically separated. Please review manually.` : null
      });
    }
  }

  // Parse Answer Key & Explanations if available at end of document
  if (answerKeyPart && questions.length > 0) {
    const solutionBlocks = answerKeyPart.split(/(?=\n?\s*(?:Q|Question\s*)?\d+[\.\)])/gi);
    let currentCategory = 'General';
    let qIndexCounter = 0;

    for (const sBlock of solutionBlocks) {
      const sMatch = sBlock.match(/^\s*(?:Q|Question\s*)?(\d+)[\.\)]\s*([\s\S]+)/i);
      if (!sMatch) continue;

      const qNum = parseInt(sMatch[1], 10);
      const sBody = sMatch[2].trim();

      const catMatch = sBody.match(/\(([A-Za-z\s]+)\)/);
      if (catMatch && ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Maths'].includes(catMatch[1].trim())) {
        currentCategory = catMatch[1].trim();
      }

      const ansMatch = sBody.match(/(?:Correct Answer|Answer|Ans):\s*(?:\(|\[)?([A-D])(?:\)|\])?/i);
      const expMatch = sBody.match(/(?:Explanation|Solution):\s*([^\n]+)/i);

      let targetQ = questions.find(q => q.num === qNum && q.bank_category === currentCategory && !q.matchedKey);
      if (!targetQ) {
        targetQ = questions.find(q => q.num === qNum && !q.matchedKey);
      }
      if (!targetQ && qIndexCounter < questions.length) {
        targetQ = questions[qIndexCounter];
      }

      if (targetQ) {
        targetQ.matchedKey = true;
        if (ansMatch) {
          const letter = ansMatch[1].toUpperCase();
          const charCode = letter.charCodeAt(0) - 65;
          if (charCode >= 0 && charCode < targetQ.options.length) {
            targetQ.correct_index = charCode;
          }
        }
        if (expMatch) {
          targetQ.solution = expMatch[1].trim();
        }
      }
      qIndexCounter++;
    }
  }

  return questions;
}

/**
 * Standalone Answer Key Parser for extracted PDF / raw text.
 * Returns an object mapping question number (1, 2, 3...) to correct_index (0=A, 1=B, 2=C, 3=D).
 */
export function parseAnswerKeyOnly(text) {
  if (!text || typeof text !== 'string') return {};

  const keyMap = {};

  const matches = text.matchAll(/(?:Q|Question\s*)?(\d+)[\.\)\:\-\s]+\s*(?:\(|\[)?([A-D1-4])(?:\)|\])?/gi);
  for (const m of matches) {
    const qNum = parseInt(m[1], 10);
    const ansChar = m[2].toUpperCase();
    let correctIndex = -1;

    if (['A', 'B', 'C', 'D'].includes(ansChar)) {
      correctIndex = ansChar.charCodeAt(0) - 65;
    } else if (['1', '2', '3', '4'].includes(ansChar)) {
      correctIndex = parseInt(ansChar, 10) - 1;
    }

    if (qNum > 0 && correctIndex >= 0) {
      keyMap[qNum] = correctIndex;
    }
  }

  return keyMap;
}
