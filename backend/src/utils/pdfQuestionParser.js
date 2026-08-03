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

  // Look for dedicated Answer Key section header (must not trigger on top header title text)
  const headerRegex = /(?:\n\s*|\n?\s*)(?:Answer\s*Key(?:\s*&(?:amp;)?\s*(?:Explanations|Solutions))?|Answers\s*&(?:amp;)?\s*Explanations|Solutions\s*&(?:amp;)?\s*Explanations|ANSWER\s*KEY)(?:\s*\n|\s*:)/i;
  const answerKeyMatch = cleanText.match(headerRegex);

  if (answerKeyMatch && answerKeyMatch.index > 100) {
    questionPaperPart = cleanText.substring(0, answerKeyMatch.index);
    answerKeyPart = cleanText.substring(answerKeyMatch.index);
  }

  // Split into raw blocks by Q1, Q2, Q3 ... or 1., 2., 3.
  const blocks = questionPaperPart.split(/(?=\n?\s*(?:Q|Question\s*)?\d+[\.\)])/gi);

  const questions = [];

  for (const block of blocks) {
    const qMatch = block.match(/^\s*(?:Q|Question\s*)?(\d+)[\.\)]\s*([\s\S]+)/i);
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

    // Separate question text and options block
    const firstOptIndex = body.search(/(?:^|\n)\s*[A-D][\.\)]\s*/i);
    let mainText = body;
    const options = [];

    if (firstOptIndex !== -1) {
      mainText = body.substring(0, firstOptIndex).trim();
      const optionsBlock = body.substring(firstOptIndex);

      const optMatches = optionsBlock.matchAll(/(?:^|\n)\s*([A-D])[\.\)]\s*([^\n]+)/gi);
      for (const m of optMatches) {
        options.push(m[2].trim());
      }
    }

    // Clean question text (strip embedded Marks/Time lines and leading subject tag)
    let cleanQText = mainText
      .replace(/Marks:\s*[^\n]+/gi, '')
      .replace(/Time:\s*[^\n]+/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    cleanQText = cleanQText.replace(/^\(([A-Za-z\s]+)\)\s*/, '');

    if (cleanQText && options.length >= 2) {
      questions.push({
        num: qNum,
        question_text: cleanQText,
        options,
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

      const ansMatch = sBody.match(/(?:Correct Answer|Answer):\s*([A-D])/i);
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
