/**
 * Formats question statements and prompts into clean, structured line-by-line text.
 * Prevents statement-based questions, Assertion-Reason, and Match Lists from collapsing into run-on paragraphs.
 */
export function formatQuestionStructure(text) {
  if (!text || typeof text !== 'string') return text || '';
  let s = text.trim();

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
