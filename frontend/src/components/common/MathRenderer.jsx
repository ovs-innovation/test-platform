import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Render an individual LaTeX math formula using KaTeX
 */
function KaTeXFormula({ math, displayMode = false }) {
  const renderedHtml = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math.trim(), {
        displayMode,
        throwOnError: false,
        output: 'html',
      });
    } catch (_) {
      return null;
    }
  }, [math, displayMode]);

  if (!renderedHtml) {
    return <span className={displayMode ? "block my-1 text-center font-mono text-sm" : "inline font-mono text-sm"}>${math}$</span>;
  }

  return (
    <span
      className={displayMode ? "block my-2 text-center overflow-x-auto py-1" : "inline-block px-0.5 align-baseline"}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

/**
 * Universal MathRenderer component that parses text containing LaTeX:
 * - Block math: $$...$$ or \[...\]
 * - Inline math: $...$ or \(...\)
 * - Plain text around formulas
 */
export default function MathRenderer({ text, className = '' }) {
  if (text == null || text === '') return null;
  const content = String(text);

  // If there are no math delimiters at all, render text directly for performance
  if (!content.includes('$') && !content.includes('\\(') && !content.includes('\\[')) {
    return <span className={className}>{content}</span>;
  }

  // Regex to split by LaTeX delimiters:
  // 1. $$...$$ (Display Math)
  // 2. \[...\] (Display Math)
  // 3. $...$ (Inline Math)
  // 4. \(...\) (Inline Math)
  const tokens = useMemo(() => {
    const regex = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$[^\$\n]+?\$|\\\(.+?\\\))/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: content.slice(lastIndex, match.index) });
      }

      const raw = match[0];
      if (raw.startsWith('$$') && raw.endsWith('$$') && raw.length >= 4) {
        parts.push({ type: 'math-display', value: raw.slice(2, -2) });
      } else if (raw.startsWith('\\[') && raw.endsWith('\\]') && raw.length >= 4) {
        parts.push({ type: 'math-display', value: raw.slice(2, -2) });
      } else if (raw.startsWith('$') && raw.endsWith('$') && raw.length >= 2) {
        parts.push({ type: 'math-inline', value: raw.slice(1, -1) });
      } else if (raw.startsWith('\\(') && raw.endsWith('\\)') && raw.length >= 4) {
        parts.push({ type: 'math-inline', value: raw.slice(2, -2) });
      } else {
        parts.push({ type: 'text', value: raw });
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', value: content.slice(lastIndex) });
    }

    return parts;
  }, [content]);

  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        if (token.type === 'math-display') {
          return <KaTeXFormula key={idx} math={token.value} displayMode={true} />;
        }
        if (token.type === 'math-inline') {
          return <KaTeXFormula key={idx} math={token.value} displayMode={false} />;
        }
        return <React.Fragment key={idx}>{token.value}</React.Fragment>;
      })}
    </span>
  );
}
