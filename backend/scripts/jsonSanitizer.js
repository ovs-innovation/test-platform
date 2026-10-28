export function sanitizeJson(raw) {
  let text = raw.trim();
  if (text.startsWith('```json')) {
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (text.startsWith('```')) {
    text = text.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  // 1. Fast path: try standard parse first
  try {
    return JSON.parse(text);
  } catch (_) {
    // continue to repair
  }

  // 2. State-machine based character repair
  let fixed = '';
  let inString = false;
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (!inString) {
      if (ch === '"') {
        inString = true;
      }
      fixed += ch;
      i++;
    } else {
      // Inside a string
      if (ch === '"') {
        inString = false;
        fixed += ch;
        i++;
      } else if (ch === '\\') {
        const next = text[i + 1];

        // Valid JSON escape sequences:
        // \"  \\  \/  \b  \f  \n  \r  \t
        // \uXXXX (4 hex digits)
        if (next === '"' || next === '\\' || next === '/' || next === 'b' || next === 'f' || next === 'r') {
          fixed += ch + next;
          i += 2;
        } else if (next === 'n') {
          // In LaTeX, check if \nu or \nabla or \neg
          const rest = text.slice(i + 1, i + 8);
          if (/^n(u|abla|eg)/i.test(rest)) {
            // It's LaTeX \nu etc., escape the backslash: \\nu
            fixed += '\\\\n';
            i += 2;
          } else {
            fixed += '\\n';
            i += 2;
          }
        } else if (next === 't') {
          // In LaTeX, check if \text, \theta, \tan, \times, \tau, \to
          const rest = text.slice(i + 1, i + 8);
          if (/^t(ext|heta|an|imes|au|o)/i.test(rest)) {
            fixed += '\\\\t';
            i += 2;
          } else {
            fixed += '\\t';
            i += 2;
          }
        } else if (next === 'u' && /^[0-9a-fA-F]{4}/.test(text.slice(i + 2, i + 6))) {
          // Valid unicode escape \uXXXX
          fixed += text.slice(i, i + 6);
          i += 6;
        } else {
          // Any other backslash is a LaTeX command (e.g. \sqrt, \alpha, \frac, \mu, \pm)
          // Escape the backslash so JSON sees \\
          fixed += '\\\\';
          i++;
        }
      } else if (ch === '\n') {
        // Raw newline inside string -> replace with escaped \n
        fixed += '\\n';
        i++;
      } else if (ch === '\r') {
        i++;
      } else if (ch === '\t') {
        fixed += '\\t';
        i++;
      } else {
        fixed += ch;
        i++;
      }
    }
  }

  try {
    return JSON.parse(fixed);
  } catch (err) {
    // Fallback: If still failing, try regex replacement of backslashes
    try {
      const fallback = text.replace(/\\([^"\\\/bfnrtu])/g, '\\\\$1');
      return JSON.parse(fallback);
    } catch (_) {
      throw err;
    }
  }
}
