/**
 * Strips running page headers, footers, divider lines, watermarks,
 * and page numbers (e.g. "EDVEDUM ACADEMY | AIETS NEET 2027 | UT-01 4", "Page 12", etc.)
 */
export function stripHeadersAndFooters(text) {
  if (!text || typeof text !== 'string') return text || '';
  const sanitized = text.replace(/\0/g, '');
  const trimmed = sanitized.trim();
  // Fast path: Pure numbers (e.g. "3", "18", "9", "6", "0", "-5", "2.5"), short values with units ("16 N", "10 m/s"),
  // chemical formulas ("CO2", "H2O"), or short option strings (<= 3 characters) are legitimate content, never page headers.
  if (/^[-+]?\d+(?:\.\d+)?(?:\s*[a-zA-Z%°\/^µΩ]+)?$/.test(trimmed) || trimmed.length <= 3) {
    return trimmed;
  }

  let s = sanitized.replace(/\r\n/g, '\n');

  const fullLineHeaderRegex = /^(?:EDVEDUM(?:\s*ACADEMY)?|AIETS(?:\s*NEET)?(?:\s*\d{4})?|\bUT-\d+\b|JEE[\s\-]*Main[\s\-]*(?:20\d\d)?(?:\s*Solved\s*Papers)?(?:\s*P\s*W)?|Scan\s+for\s+Video\s+Solutions?|JEE-MAIN\s*PAPER\b[^\n]*|(?:[A-Za-z0-9&.'\-]+\s+)?(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH|EDUCATION|TEST\s*SERIES)\b[^\n]*?[\|•·–—][^\n]*|[-_—–=]{3,}|SPACE\s+FOR\s+ROUGH\s+WORK|ROUGH\s+WORK|Page\s*\d+(?:\s*(?:of|\/)\s*\d+)?|[-–—]{1,2}\s*\d{1,3}\s*[-–—]{1,2})\s*(?:\d{1,3})?$/i;

  const lines = s.split('\n');
  const cleanedLines = [];
  for (const line of lines) {
    if (fullLineHeaderRegex.test(line.trim())) {
      continue;
    }
    cleanedLines.push(line);
  }
  s = cleanedLines.join('\n');

  // Trailing inline header/footer text at the end of an option or question statement
  s = s.replace(
    /\s+(?:[\|•·–—]\s*)?(?:EDVEDUM(?:\s*ACADEMY)?|AIETS(?:\s*NEET)?(?:\s*\d{4})?|\bUT-\d+\b|(?:[A-Za-z0-9&.'\-]+\s+)?(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH)|JEE[\s\-]*Main)[^\n]*?(?:\s+\d{1,3})?\s*$/gi,
    ''
  );

  // Clean trailing page number if separated by 4 or more spaces at the very end of a multi-word line
  if (/\S+\s+\S+/.test(s)) {
    s = s.replace(/\s{4,}\d{1,3}\s*$/g, '');
  }

  const result = s.trim();
  // Safe fallback: If stripping accidentally emptied a string that had content, preserve original trimmed
  return (!result && trimmed) ? trimmed : result;
}

/**
 * Ensures LaTeX formulas and mathematical commands without dollar delimiters are properly wrapped in $...$
 * so KaTeX can render them reliably.
 */
export function ensureLatexDelimiters(text) {
  if (!text || typeof text !== 'string') return text || '';
  const sanitized = text.replace(/\0/g, '');

  // If the whole string is already enclosed in $...$ or $$...$$ or \[...\], leave as is
  const trimmed = sanitized.trim();
  if (
    (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length >= 2) ||
    (trimmed.startsWith('\\[') && trimmed.endsWith('\\]')) ||
    (trimmed.startsWith('\\(') && trimmed.endsWith('\\)'))
  ) {
    return sanitized;
  }

  // Split text by existing LaTeX blocks ($...$, $$...$$, \(...\), \[...\])
  const blockRegex = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$[^\$\n]+?\$|\\\(.+?\\\))/g;
  const segments = [];
  let lastIdx = 0;
  let match;

  while ((match = blockRegex.exec(sanitized)) !== null) {
    if (match.index > lastIdx) {
      segments.push({ isDelimited: false, text: sanitized.slice(lastIdx, match.index) });
    }
    segments.push({ isDelimited: true, text: match[0] });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < sanitized.length) {
    segments.push({ isDelimited: false, text: sanitized.slice(lastIdx) });
  }

  const mathPattern = /(?:\\begin\{(?:bmatrix|pmatrix|vmatrix|Vmatrix|matrix|cases|array)\}[\s\S]*?\\end\{(?:bmatrix|pmatrix|vmatrix|Vmatrix|matrix|cases|array)\}|\\frac\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|\\binom\s*\{[^{}]*\}\s*\{[^{}]*\}|\\sqrt(?:\s*\[[^\]]*\])?\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}|\\lim_\{\s*[^{}]*\s*\}(?:\s+[a-zA-Z0-9\(\)]+)?|\\lim_[a-zA-Z0-9\\]+(?:\s+[a-zA-Z0-9\(\)]+)?|\\(?:int|oint|sum|prod)(?:_\{\s*[^{}]*\s*\}|_[a-zA-Z0-9\\]+)?(?:\^\{\s*[^{}]*\s*\}|\^[a-zA-Z0-9\\]+)?|\\(?:vec|hat|tilde|bar|dot|ddot|mathbf)\s*(?:\{[^{}]*\}|[a-zA-Z])|\\(?:alpha|beta|gamma|delta|epsilon|zeta|eta|theta|iota|kappa|lambda|mu|nu|xi|pi|rho|sigma|tau|upsilon|phi|chi|psi|omega|infty|partial|nabla|pm|mp|times|div|cdot|leq|geq|neq|approx|equiv|in|subset|cap|cup|forall|exists)\b)/g;

  const processed = segments.map((seg) => {
    if (seg.isDelimited) return seg.text;
    return seg.text.replace(mathPattern, (m) => `$${m.trim()}$`);
  });

  return processed.join('');
}

/**
 * Formats question statements and prompts into clean, structured line-by-line text.
 * Prevents statement-based questions, Assertion-Reason, and Match Lists from collapsing into run-on paragraphs.
 */
export function formatQuestionStructure(text) {
  if (!text || typeof text !== 'string') return text || '';
  let s = stripHeadersAndFooters(text).replace(/\0/g, '').trim();

  // Normalize Windows line breaks
  s = s.replace(/\r\n/g, '\n');

  // Safeguard Markdown table blocks (| ... |) so regexes do not break table rows
  const tableBlocks = [];
  if (s.includes('|')) {
    s = s.replace(/((?:^[ \t]*\|[^\n]+\|[ \t]*(?:\n|$))+)/gm, (match) => {
      tableBlocks.push(match);
      return `\n__TABLE_BLOCK_${tableBlocks.length - 1}__\n`;
    });
  }

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

  s = ensureLatexDelimiters(s);

  // Restore safeguarded table blocks
  if (tableBlocks.length > 0) {
    tableBlocks.forEach((tb, i) => {
      s = s.replace(`__TABLE_BLOCK_${i}__`, tb.trim());
    });
  }

  return s.replace(/\n{3,}/g, '\n\n').trim();
}
