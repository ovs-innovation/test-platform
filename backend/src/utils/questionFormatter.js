/**
 * Strips running page headers, footers, divider lines, watermarks,
 * and page numbers (e.g. "EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4", "Page 12", etc.)
 */
export function stripHeadersAndFooters(text) {
  if (!text || typeof text !== 'string') return text || '';

  let s = text.replace(/\r\n/g, '\n');

  // Strip page divider lines (e.g. "_______", "-------", "═══════")
  s = s.replace(/(?:^|\n)\s*[-_—–=]{3,}\s*(?:\n|$)/g, '\n');

  // Strip rough work headers
  s = s.replace(/(?:^|\n)\s*(?:SPACE\s+FOR\s+ROUGH\s+WORK|ROUGH\s+WORK)\s*(?:\n|$)/gi, '\n');

  // 1. Full-line headers / footers with pipe (|), bullet (•), dash (–), or colon separators
  // Only matches lines that START with the institute name or exam code (avoid matching options or question text)
  // e.g. "EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4"
  s = s.replace(
    /(?:^|\n)\s*(?:(?:EDVEDUM|AIETS|AIATS|AITS|ALLEN|AAKASH|FIITJEE|RESONANCE|NTA|NEET|JEE|\bUT-\d+\b)\b|(?:[A-Za-z0-9&.'\-]+\s+)?(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH|EDUCATION|TEST\s*SERIES)\b)[^\n]*?[\|•·–—][^\n]*(?:\s+\d{1,3})?\s*(?:\n|$)/gi,
    '\n'
  );

  // 2. Full-line institute / exam / test series headers without pipes
  // e.g. "EDVEDUM ACADEMY", "AIETS NEET 2027", "UT-01"
  s = s.replace(
    /(?:^|\n)\s*(?:EDVEDUM(?:\s*ACADEMY)?|AIETS(?:\s*NEET)?(?:\s*\d{4})?|\bUT-\d+\b)(?:\s+\d{1,3})?\s*(?:\n|$)/gi,
    '\n'
  );

  // 3. Full-line standalone page numbers or "Page X of Y"
  s = s.replace(/(?:^|\n)\s*(?:Page\s*\d+(?:\s*(?:of|\/)\s*\d+)?|\b[-–—\s]*\d{1,3}[-–—\s]*$)\s*(?:\n|$)/gi, '\n');

  // 4. Trailing inline header/footer text at the end of an option or question statement
  // e.g. "16 N EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4" -> "16 N"
  // e.g. "16 N | AIETS NEET 2027 | UT-01" -> "16 N"
  s = s.replace(
    /\s+(?:[\|•·–—]\s*)?(?:EDVEDUM(?:\s*ACADEMY)?|AIETS(?:\s*NEET)?(?:\s*\d{4})?|\bUT-\d+\b|\b(?:[A-Za-z0-9&.'\-]+\s+)?(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH)\b)[^\n]*?(?:\s+\d{1,3})?\s*$/gi,
    ''
  );

  // 5. Clean trailing page number if separated by 2 or more spaces at the very end of string (e.g. "16 N    4")
  s = s.replace(/\s{2,}\d{1,3}\s*$/g, '');

  return s.trim();
}

/**
 * Formats question statements and prompts into clean, structured line-by-line text.
 * Prevents statement-based questions, Assertion-Reason, and Match Lists from collapsing into run-on paragraphs.
 */
export function formatQuestionStructure(text) {
  if (!text || typeof text !== 'string') return text || '';
  let s = stripHeadersAndFooters(text).trim();

  // Normalize Windows line breaks
  s = s.replace(/\r\n/g, '\n');

  // Insert newline before Statement I, Statement II, Statement 1, Statement 2, Statement (A), etc.
  s = s.replace(/([^\n])\s*(Statement\s+(?:[IVX\d]+|\([A-Za-z0-9]+\)|[A-E])\s*[:\-])/gi, '$1\n$2');
  s = s.replace(/([^\n])\s*(Statement\s*\([A-Za-z0-9]+\)\s*[:\-])/gi, '$1\n$2');

  // Insert newline before Assertion (A), Reason (R)
  s = s.replace(/([^\n])\s*(Assertion\s*(?:\([A-Za-z0-9]\))?\s*[:\-])/gi, '$1\n$2');
  s = s.replace(/([^\n])\s*(Reason\s*(?:\([A-Za-z0-9]\))?\s*[:\-])/gi, '$1\n$2');

  // Insert newline before List-I, List-II, Column-I, Column-II
  s = s.replace(/([^\n])\s*((?:List|Column)\s*[-–—]?\s*(?:[IVX\d]+|[A-Za-z])\s*[:\-])/gi, '$1\n$2');

  // Insert newline before sub-statement bullet letters: A., B., C., D., E. (e.g. "to : A. hold...", "B. hold...")
  s = s.replace(/([^\n])(?:\s+|:\s*)([A-E]\.\s+[A-Za-z])/g, '$1\n$2');

  // Insert newline before Roman numeral sub-statements: I., II., III., IV. (e.g. in List II)
  s = s.replace(/(?<!\b(?:Statement|List|Column))\s+((?:[IVX]+|\([IVX]+\))[\.\:]\s+[A-Za-z])/gi, '\n$1');

  // Insert newline before closing prompt: "In the light of the above statements, choose...", "Choose the correct answer..."
  s = s.replace(/([^\n])\s*(In\s+(?:the\s+)?light\s+of\s+(?:the\s+)?above\s+statements?[^:\n]*[:,]?\s*(?:choose\b[\s\S]*?[,:]?)?)/gi, '$1\n$2');
  s = s.replace(/(?<!\b(?:statements?|above|below)[,:]?)\s+(Choose\s+the\s+(?:correct|most\s+appropriate|incorrect)\s+(?:answer|statement|option)s?\b)/gi, '\n$1');

  return s.replace(/\n{3,}/g, '\n\n').trim();
}
