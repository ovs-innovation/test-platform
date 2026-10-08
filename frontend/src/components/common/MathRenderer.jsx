import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { formatQuestionStructure } from '../../lib/questionFormatter.js';

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
    return (
      <span className={displayMode ? "block my-1 text-center font-mono text-sm" : "inline font-mono text-sm"}>
        ${math}$
      </span>
    );
  }

  return (
    <span
      className={displayMode ? "block my-2 text-center overflow-x-auto py-1" : "inline-block px-0.5 align-baseline"}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

/**
 * Parses and renders inline LaTeX math expressions inside a given string
 */
function RenderInlineMathText({ text, className = '' }) {
  const tokens = useMemo(() => {
    if (!text) return [];
    if (!text.includes('$') && !text.includes('\\(') && !text.includes('\\[')) {
      return [{ type: 'text', value: text }];
    }

    const regex = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\$[^\$\n]+?\$|\\\(.+?\\\))/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
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

    if (lastIndex < text.length) {
      parts.push({ type: 'text', value: text.slice(lastIndex) });
    }

    return parts;
  }, [text]);

  if (!tokens.length) return null;

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

/**
 * Universal MathRenderer component that parses:
 * - Markdown tables (| Header 1 | Header 2 |) with full cell styling
 * - Block math: $$...$$ or \[...\]
 * - Inline math: $...$ or \(...\)
 * - Plain text around formulas
 */
export default function MathRenderer({ text, className = '' }) {
  const content = useMemo(() => {
    if (text == null || text === '') return '';
    let raw = text;
    if (typeof raw === 'object') {
      raw = raw.text ?? raw.title ?? raw.value ?? '';
    }
    return formatQuestionStructure(String(raw));
  }, [text]);

  // Split content into regular text blocks and markdown table blocks
  const blocks = useMemo(() => {
    if (!content) return [];
    if (!content.includes('|')) {
      return [{ type: 'text', content }];
    }

    const lines = content.split('\n');
    const result = [];
    let currentTextLines = [];
    let currentTableLines = [];
    let inTable = false;

    const isTableLine = (line) => {
      const trimmed = line.trim();
      return trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length >= 3;
    };

    const isDelimiterLine = (line) => {
      const trimmed = line.trim();
      return /^\s*\|?\s*[:\-]+(?:\s*\|\s*[:\-]+)+\s*\|?\s*$/.test(trimmed);
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (isTableLine(line)) {
        if (!inTable) {
          // Check if this line is followed by a delimiter or next line is table
          const nextLine = lines[i + 1];
          if (nextLine && (isDelimiterLine(nextLine) || isTableLine(nextLine))) {
            if (currentTextLines.length > 0) {
              result.push({ type: 'text', content: currentTextLines.join('\n') });
              currentTextLines = [];
            }
            inTable = true;
            currentTableLines.push(line);
          } else {
            currentTextLines.push(line);
          }
        } else {
          currentTableLines.push(line);
        }
      } else {
        if (inTable) {
          result.push({ type: 'table', lines: currentTableLines });
          currentTableLines = [];
          inTable = false;
        }
        currentTextLines.push(line);
      }
    }

    if (inTable && currentTableLines.length > 0) {
      result.push({ type: 'table', lines: currentTableLines });
    } else if (currentTextLines.length > 0) {
      result.push({ type: 'text', content: currentTextLines.join('\n') });
    }

    return result;
  }, [content]);

  if (text == null || text === '') return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {blocks.map((block, bIdx) => {
        if (block.type === 'table') {
          const rawLines = block.lines;
          if (rawLines.length < 2) {
            return (
              <div key={bIdx} className="whitespace-pre-line">
                <RenderInlineMathText text={rawLines.join('\n')} />
              </div>
            );
          }

          // Header is first line
          const headerCells = rawLines[0]
            .split('|')
            .map((c) => c.trim())
            .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

          // Find delimiter index (usually index 1)
          let startIndex = 1;
          if (/^\s*\|?\s*[:\-]+(?:\s*\|\s*[:\-]+)+\s*\|?\s*$/.test(rawLines[1].trim())) {
            startIndex = 2;
          }

          const bodyRows = rawLines.slice(startIndex).map((rowLine) =>
            rowLine
              .split('|')
              .map((c) => c.trim())
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
          ).filter((row) => row.length > 0);

          return (
            <div key={bIdx} className="my-2.5 overflow-x-auto">
              <table className="w-full max-w-2xl text-xs text-left border-collapse border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden shadow-xs">
                {headerCells.length > 0 && (
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-b border-slate-300 dark:border-slate-700">
                      {headerCells.map((th, thIdx) => (
                        <th key={thIdx} className="px-3.5 py-2 border-r border-slate-300 dark:border-slate-700 last:border-r-0">
                          <RenderInlineMathText text={th} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
                  {bodyRows.map((rowCells, rIdx) => (
                    <tr
                      key={rIdx}
                      className={
                        rIdx % 2 === 0
                          ? 'bg-white dark:bg-slate-900/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors'
                          : 'bg-slate-50/70 dark:bg-slate-800/25 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors'
                      }
                    >
                      {rowCells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3.5 py-2 text-slate-800 dark:text-slate-200 border-r border-slate-200/80 dark:border-slate-700/60 last:border-r-0 align-top"
                        >
                          <RenderInlineMathText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return (
          <div key={bIdx} className="whitespace-pre-line">
            <RenderInlineMathText text={block.content} />
          </div>
        );
      })}
    </div>
  );
}
