import { stripHeadersAndFooters } from './questionFormatter.js';

/**
 * Parses raw text extracted from a test question paper PDF
 * Returns an array of formatted question objects:
 * [{ question_text, options, correct_index, marks, bank_category, solution, needs_review, review_reason }]
 */
export function parsePdfQuestions(text) {
  if (!text || typeof text !== 'string') return [];

  // Normalize line breaks, clean whitespace, and strip running page headers/footers
  const cleanText = stripHeadersAndFooters(text.replace(/\r\n/g, '\n'));

  // Separate Question Paper and Answer Key parts if present at the end
  let questionPaperPart = cleanText;
  let answerKeyPart = '';

  const headerRegex = /(?:\n\s*|\n?\s*)(?:Answer\s*Key(?:\s*&(?:amp;)?\s*(?:Explanations|Solutions))?|Answers\s*&(?:amp;)?\s*Explanations|Solutions\s*&(?:amp;)?\s*Explanations|HINTS\s*&(?:amp;)?\s*SOLUTIONS|ANSWER\s*KEY|HINTS\s*\|\s*SOLUTIONS|EXPLANATIONS|SOLUTIONS)(?:\s*\n|\s*:)/i;
  const answerKeyMatch = cleanText.match(headerRegex);

  if (answerKeyMatch && answerKeyMatch.index > 50) {
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
        inlineSolution = stripHeadersAndFooters(inlineAnsMatch[2].trim());
      }
    }

    // Clean body text by stripping inline Answer lines before option parsing
    const cleanBodyForOptions = body.replace(/(?:^|\n)\s*(?:Answer|Ans|Correct\s*Answer):\s*[^\n]+/gi, '');

    // Attempt to extract options (A), (B), (C), (D) or A), B), C), D) or A., B., C., D.
    const options = [];
    let mainText = cleanBodyForOptions;

    // 1. Try matching (A)... (B)... (C)... (D)... or A)... B)... C)... D)... or (1)... (2)... (3)... (4)...
    const inlineOptMatches = [...cleanBodyForOptions.matchAll(/(?:\(|\[|\n\s*|^|\s{2,})([A-Da-d1-4])(?:\)|\]|\.|\:)\s*([^(\n\[\]]+)/gi)];
    if (inlineOptMatches.length >= 2) {
      const firstIndex = cleanBodyForOptions.search(/(?:\(|\[|\n\s*|^|\s{2,})([A-Da-d1-4])(?:\)|\]|\.|\:)\s*/i);
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
        const cleaned = stripHeadersAndFooters(optText) || optText;
        if (cleaned && !options.includes(cleaned)) {
          options.push(cleaned);
        }
      }
    }

    // 2. Fallback to multiline options matching
    if (options.length < 2) {
      const firstOptIndex = cleanBodyForOptions.search(/(?:^|\n)\s*(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)])\s*/i);
      if (firstOptIndex !== -1) {
        mainText = cleanBodyForOptions.substring(0, firstOptIndex).trim();
        const optionsBlock = cleanBodyForOptions.substring(firstOptIndex);
        const optMatches = optionsBlock.matchAll(/(?:^|\n)\s*(?:\(([A-Da-d1-4])\)|([A-Da-d1-4])[\.\)])\s*([^\n]+)/gi);
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
          const cleaned = stripHeadersAndFooters(t) || t;
          if (cleaned && !options.includes(cleaned)) options.push(cleaned);
        }
      }
    }

    // Extract Chapter/Topic if present: e.g. [Animal Kingdom], [Current Electricity], Chapter: Electrostatics, Topic: Kinematics
    let chapter = null;
    const bracketMatch = body.match(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/);
    if (bracketMatch) {
      chapter = bracketMatch[1].trim();
    } else {
      const chMatch = body.match(/(?:Chapter|Topic|Unit)\s*[:\-]\s*([A-Za-z0-9\s,&'\-\/]{2,80})(?:\n|$)/i);
      if (chMatch) {
        chapter = chMatch[1].trim();
      }
    }

    // Clean question text (strip embedded Marks/Time lines, leading subject tag, chapter tags, and running headers/footers)
    let cleanQText = stripHeadersAndFooters(
      mainText
        .replace(/Marks:\s*[^\n]+/gi, '')
        .replace(/Time:\s*[^\n]+/gi, '')
        .replace(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
    );

    cleanQText = cleanQText.replace(/^\(([A-Za-z\s]+)\)\s*/, '');

    // Instead of silent fake fallbacks like "First Choice Option", flag for review if < 2 options parsed
    const hasValidOptions = options.length >= 2;
    const needsReview = !hasValidOptions;
    let finalOptions = [...options];
    if (finalOptions.length === 0) {
      finalOptions = [
        '[Needs Review] Option A',
        '[Needs Review] Option B',
        '[Needs Review] Option C',
        '[Needs Review] Option D',
      ];
    } else if (finalOptions.length < 4) {
      while (finalOptions.length < 4) {
        finalOptions.push(`[Needs Review] Option ${String.fromCharCode(65 + finalOptions.length)}`);
      }
    }

    const finalQuestionText = cleanQText || body.split('\n')[0].trim() || `Question ${qNum}`;

    questions.push({
      num: qNum,
      question_text: finalQuestionText,
      options: finalOptions,
      correct_index: inlineCorrectIndex,
      marks,
      bank_category: category,
      chapter: chapter || null,
      topic: chapter || null,
      solution: inlineSolution,
      needs_review: needsReview,
      review_reason: needsReview ? `Question ${qNum}: Option text could not be automatically separated. Please review manually.` : null
    });
  }

  // Parse Answer Key & Explanations if available at end of document
  if (answerKeyPart && questions.length > 0) {
    const { answerKeyMap, solutionsMap, chaptersMap } = parseAnswerKeyAndSolutions(answerKeyPart);

    for (const q of questions) {
      if (answerKeyMap[q.num] !== undefined) {
        q.correct_index = answerKeyMap[q.num];
      }
      if (solutionsMap[q.num]) {
        q.solution = solutionsMap[q.num];
      }
      if (chaptersMap[q.num]) {
        q.chapter = chaptersMap[q.num];
        q.topic = chaptersMap[q.num];
      }
    }
  }

  // Also parse any Question vs Topic mapping grid in the entire document (e.g., 'Q. No. | Topic Name')
  const docTopicGrid = parseTopicGrid(cleanText);
  if (Object.keys(docTopicGrid).length > 0) {
    for (const q of questions) {
      if (docTopicGrid[q.num]) {
        q.chapter = docTopicGrid[q.num];
        q.topic = docTopicGrid[q.num];
      }
    }
  }

  return questions;
}

/**
 * Extracts Answer Key mappings, Explanations/Solutions, and Chapter/Topic tags
 * from standalone Answer Key & Hints/Solutions text or PDF sections.
 * Returns: { answerKeyMap, solutionsMap, chaptersMap, topicGridMap }
 */
export function parseAnswerKeyAndSolutions(text) {
  if (!text || typeof text !== 'string') return { answerKeyMap: {}, solutionsMap: {}, chaptersMap: {}, topicGridMap: {} };

  const answerKeyMap = parseAnswerKeyOnly(text);
  const solutionsMap = {};
  const chaptersMap = {};

  const cleanText = text.replace(/\r\n/g, '\n');

  // Also parse any question-topic grid tables inside the text
  const topicGrid = parseTopicGrid(cleanText);
  Object.assign(chaptersMap, topicGrid);
  const solutionBlocks = cleanText.split(/(?=(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*)?\d{1,3}[\.\)\:\-]\s*)/gi);

  for (const sBlock of solutionBlocks) {
    const sMatch = sBlock.match(/(?:^|\n)\s*(?:Q(?:uestion)?\.?\s*)?(\d{1,3})[\.\)\:\-]\s*([\s\S]+)/i);
    if (!sMatch) continue;

    const qNum = parseInt(sMatch[1], 10);
    const sBody = sMatch[2].trim();

    // Check for chapter or topic tag in this solution block (e.g., [Current Electricity], Chapter: Animal Kingdom)
    const bMatch = sBody.match(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/);
    if (bMatch) {
      chaptersMap[qNum] = bMatch[1].trim();
    } else {
      const chMatch = sBody.match(/(?:Chapter|Topic|Unit)\s*[:\-]\s*([A-Za-z0-9\s,&'\-\/]{2,80})(?:\n|$)/i);
      if (chMatch) {
        chaptersMap[qNum] = chMatch[1].trim();
      }
    }

    // Skip single-letter lines like "A" or "1. A" if they are just answer keys
    if (/^[A-D1-4]\s*$/i.test(sBody)) continue;

    // Check if the solution block has an answer letter like "(B)" or "(3)" or "Ans: B" or "Option 2"
    if (answerKeyMap[qNum] === undefined) {
      const ansMatch = sBody.match(/(?:(?:Correct\s*Answer|Answer|Ans|Option)\s*[:\.\-–—]\s*[\(\[]?([A-Da-d1-4])[\)\]]?(?![a-zA-Z0-9])|^[\(\[]([A-Da-d1-4])[\)\]]|^([A-Da-d1-4])\s*[\.\:\-](?![a-zA-Z0-9]))/i);
      if (ansMatch) {
        const rawLetter = ansMatch[1] || ansMatch[2] || ansMatch[3];
        if (rawLetter) {
          const letter = rawLetter.toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(letter)) {
            answerKeyMap[qNum] = letter.charCodeAt(0) - 65;
          } else if (['1', '2', '3', '4'].includes(letter)) {
            answerKeyMap[qNum] = parseInt(letter, 10) - 1;
          }
        }
      }
    }

    let expText = '';
    const expMatch = sBody.match(/(?:Explanation|Solution|Sol|Hint):\s*([\s\S]+)/i);
    if (expMatch) {
      expText = expMatch[1].trim();
    } else {
      expText = sBody
        .replace(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/g, '')
        .replace(/(?:Chapter|Topic|Unit)\s*[:\-]\s*[^\n]+(?:\n|$)/gi, '')
        .replace(/^\s*(?:Correct\s*Answer|Answer|Ans|Option)\s*[:\.\-–—]?\s*[\(\[]?[A-Da-d1-4][\)\]]?\s*[:\.\-–—]?\s*/i, '')
        .replace(/^\s*[\(\[][A-Da-d1-4][\)\]]\s*[:\.\-–—]?\s*/i, '')
        .replace(/^\s*[A-Da-d1-4]\s*[\.\:\-]\s*/i, '')
        .trim();
    }

    expText = stripHeadersAndFooters(expText);

    if (expText && expText.length > 2 && !/^[A-D1-4]$/i.test(expText)) {
      solutionsMap[qNum] = expText;
    }
  }

  return { answerKeyMap, solutionsMap, chaptersMap, topicGridMap: chaptersMap };
}

/**
 * Standalone Answer Key Parser for extracted PDF / raw text.
 * Returns an object mapping question number (1, 2, 3...) to correct_index (0=A, 1=B, 2=C, 3=D).
 */
export function parseAnswerKeyOnly(text) {
  if (!text || typeof text !== 'string') return {};

  const keyMap = {};

  // Pattern 1: Delimited format e.g. "1. A", "1: B", "1 - (C)", "Q1. D", "1 (4)", "1. (2)", "10. (1):The", "16. (1):"
  const delimitedMatches = text.matchAll(/(?:^|[\n\r;|\t])[ \t]*(?:Q(?:uestion)?\.?[ \t]*)?(\d{1,3})[ \t]*(?:[\.\)\:\-\–\—][ \t]*|[ \t]+)(?:(?:Ans(?:wer)?|Option)?[ \t]*[:\.\-–—]?[ \t]*)?[\(\[]?[ \t]*([A-Da-d1-4])[ \t]*[\)\]]?(?:[ \t]*[:\.\-–—])?(?=[ \t\r\n\(\$]|$|[A-Za-z])/gi);
  for (const m of delimitedMatches) {
    const qNum = parseInt(m[1], 10);
    const ansChar = m[2].toUpperCase();
    let correctIndex = -1;

    if (['A', 'B', 'C', 'D'].includes(ansChar)) {
      correctIndex = ansChar.charCodeAt(0) - 65;
    } else if (['1', '2', '3', '4'].includes(ansChar)) {
      correctIndex = parseInt(ansChar, 10) - 1;
    }

    if (qNum > 0 && correctIndex >= 0 && keyMap[qNum] === undefined) {
      keyMap[qNum] = correctIndex;
    }
  }

  // Pattern 2: Explicit answer key format e.g. "Question 1 : Answer (B)" or "Q1: Ans C"
  const explicitMatches = text.matchAll(/\b(?:Q(?:uestion)?\.?\s*)?(\d{1,3})\s*[:\.\-–—]?\s*(?:Correct\s*Answer|Answer|Ans|Option)\s*[:\.\-–—]?\s*[\(\[]?\s*([A-Da-d1-4])\s*[\)\]]?(?![a-zA-Z0-9])/gi);
  for (const m of explicitMatches) {
    const qNum = parseInt(m[1], 10);
    const ansChar = m[2].toUpperCase();
    let correctIndex = -1;

    if (['A', 'B', 'C', 'D'].includes(ansChar)) {
      correctIndex = ansChar.charCodeAt(0) - 65;
    } else if (['1', '2', '3', '4'].includes(ansChar)) {
      correctIndex = parseInt(ansChar, 10) - 1;
    }

    if (qNum > 0 && correctIndex >= 0 && keyMap[qNum] === undefined) {
      keyMap[qNum] = correctIndex;
    }
  }

  return keyMap;
}

/**
 * Parses question-to-topic mapping tables (e.g., "Q. No. | Topic Name", "Question No. | Topic", etc.)
 * Handles both single-column and multi-column side-by-side tables.
 * Returns a map: { [qNum]: topicName }
 */
export function parseTopicGrid(text) {
  if (!text || typeof text !== 'string') return {};
  const topicMap = {};

  const cleanText = text.replace(/\r\n/g, '\n');
  const lines = cleanText.split('\n');

  let inTopicGrid = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Detect header of topic grid table
    if (/(?:Q(?:uestion)?\.?\s*No\.?|Question)\s*(?:[\t\|,]|\s{2,})\s*(?:Topic(?:\s*Name)?|Chapter(?:\s*Name)?|Unit)/i.test(line)) {
      inTopicGrid = true;
      continue;
    }

    // If another major section starts, leave topic grid
    if (inTopicGrid && /^(?:SECTION|PART|INSTRUCTIONS|TEST|QUESTION\s*PAPER)\b/i.test(line)) {
      inTopicGrid = false;
      continue;
    }

    // Match row pattern(s): e.g. "1   Physics & Measurement", "1 | Physics & Measurement"
    // Also matches multiple columns on same line: "1  Physics & Measurement    61  Some Basic Concepts"
    const rowMatches = [...line.matchAll(/(?:^|[\t\|]|\s{2,})(?:Q\.?\s*)?(\d{1,3})\s*(?:[\t\|:\-]\s*|\s{2,})([A-Za-z0-9&'\-\/,()]+(?:\s[A-Za-z0-9&'\-\/,()]+)*)/g)];
    if (rowMatches.length > 0) {
      for (const match of rowMatches) {
        const qNum = parseInt(match[1], 10);
        const topic = match[2].trim();
        // Ignore single-character option letters, marks, or headers
        if (
          qNum > 0 &&
          topic.length >= 3 &&
          !/^[A-D1-4]$/i.test(topic) &&
          !/^(?:Marks|Time|Page|Section|Question|Topic|Q\.?\s*No)\b/i.test(topic)
        ) {
          topicMap[qNum] = topic;
        }
      }
    }
  }

  return topicMap;
}

