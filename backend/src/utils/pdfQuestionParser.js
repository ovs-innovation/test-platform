/**
 * Parses raw text extracted from a test question paper PDF
 * Returns an array of formatted question objects:
 * [{ question_text, options, correct_index, marks, bank_category, solution }]
 */
export function parsePdfQuestions(text) {
  if (!text || typeof text !== 'string') return [];

  // Normalize line breaks and clean whitespace
  const cleanText = text.replace(/\r\n/g, '\n');

  // Separate Question Paper and Answer Key parts if present
  let questionPaperPart = cleanText;
  let answerKeyPart = '';

  const headerRegex = /(?:\n\s*|\n?\s*)(?:Answer\s*Key(?:\s*&(?:amp;)?\s*(?:Explanations|Solutions))?|Answers\s*&(?:amp;)?\s*Explanations|Solutions\s*&(?:amp;)?\s*Explanations|ANSWER\s*KEY)(?:\s*\n|\s*:)/i;
  const answerKeyMatch = cleanText.match(headerRegex);

  if (answerKeyMatch && answerKeyMatch.index > 100) {
    questionPaperPart = cleanText.substring(0, answerKeyMatch.index);
    answerKeyPart = cleanText.substring(answerKeyMatch.index);
  }

  // Split into raw blocks by Q1, Q2, Q3 ... or 1., 2., 3.
  const blocks = questionPaperPart.split(/(?=\n?\s*(?:Q|Question\s*)?\d+[\.\)\:]\s+)/gi);

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

    // Attempt to extract options (A), (B), (C), (D) or A., B., C., D.
    const options = [];
    let mainText = body;

    // 1. Try matching (A)... (B)... (C)... (D)...
    const inlineOptMatches = [...body.matchAll(/(?:\(|\[|\s|^)([A-D])(?:\)|\]|\.|\:)\s*([^(\n]+)/gi)];
    if (inlineOptMatches.length >= 2) {
      const firstIndex = body.search(/(?:\(|\[|\n\s*)([A-D])(?:\)|\]|\.|\:)\s*/i);
      if (firstIndex !== -1) {
        mainText = body.substring(0, firstIndex).trim();
      }
      for (const m of inlineOptMatches) {
        const optText = m[2].replace(/Marks:\s*[^\n]+/gi, '').trim();
        if (optText && !options.includes(optText)) {
          options.push(optText);
        }
      }
    }

    // 2. Fallback to multiline options matching
    if (options.length < 2) {
      const firstOptIndex = body.search(/(?:^|\n)\s*(?:\([A-D]\)|[A-D][\.\)])\s*/i);
      if (firstOptIndex !== -1) {
        mainText = body.substring(0, firstOptIndex).trim();
        const optionsBlock = body.substring(firstOptIndex);
        const optMatches = optionsBlock.matchAll(/(?:^|\n)\s*(?:\(([A-D])\)|([A-D])[\.\)])\s*([^\n]+)/gi);
        for (const m of optMatches) {
          const t = m[3].trim();
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

    // Ensure options array has at least 4 options
    const finalOptions = options.length >= 2 ? options : [
      '(A) First Choice Option',
      '(B) Second Choice Option',
      '(C) Third Choice Option',
      '(D) Fourth Choice Option'
    ];

    if (cleanQText) {
      questions.push({
        num: qNum,
        question_text: cleanQText,
        options: finalOptions,
        correct_index: 0,
        marks,
        bank_category: category,
        solution: ''
      });
    }
  }

  // Parse Answer Key & Explanations if available
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
