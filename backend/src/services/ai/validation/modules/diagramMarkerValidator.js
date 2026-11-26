/**
 * Module 9: Diagram Marker Validation
 * Validates diagram asset reference markers:
 * - All required markers e.g. ['A', 'B', 'X', 'Y', '1', '2'] exist in diagram
 * - Markers are visible within SVG bounds / viewBox
 * - Markers are neutral pointers and DO NOT leak solutions or highlight answers
 */

import { FORBIDDEN_ANSWER_PATTERNS } from '../diagram/diagramConfig.js';

export function extractExpectedMarkersFromText(text = '') {
  const markers = new Set();

  // Pattern: "labeled (as)? [X]" or "marked (as)? [X]" or "point [X]" or "branch [X]"
  const markerMatches = [
    ...text.matchAll(/\b(?:labeled|labelled|marked|indicated|designated)\s+(?:as\s+)?[\(\[]?([A-Za-z0-9]{1,3})[\)\]]?/gi),
    ...text.matchAll(/\b(?:point|region|part|component|arrow|structure)\s+[\(\[]?([A-Za-z0-9]{1,3})[\)\]]?/gi),
    ...text.matchAll(/\b(?:terminal|junction|branch|resistor)\s+([A-Za-z0-9]{1,3})\b/gi),
  ];

  for (const m of markerMatches) {
    if (m[1]) {
      const val = m[1].trim();
      // Skip common English short words
      if (!['in', 'on', 'at', 'to', 'of', 'by', 'is', 'the'].includes(val.toLowerCase())) {
        markers.add(val);
      }
    }
  }

  return Array.from(markers);
}

export function validateDiagramMarkers(question = {}, options = {}) {
  const errors = [];
  const warnings = [];

  const hasDiagram = Boolean(
    question.has_diagram ||
    question.content_type === 'diagram' ||
    question.content_type === 'graph' ||
    question.diagram_svg ||
    question.image_url
  );

  // If question does not have a diagram, pass cleanly
  if (!hasDiagram) {
    return {
      module: 'diagram_markers',
      isValid: true,
      errors: [],
      warnings: [],
      score: 100,
      expectedMarkers: [],
      foundMarkers: [],
      markersVisible: true,
      noAnswerLeaks: true,
    };
  }

  const svgCode = String(question.diagram_svg || question.diagram_metadata?.diagram_svg || options.svgCode || '').trim();
  const explicitMarkers = Array.isArray(question.diagram_metadata?.markers)
    ? question.diagram_metadata.markers
    : Array.isArray(options.expectedMarkers)
      ? options.expectedMarkers
      : [];

  const textDerivedMarkers = extractExpectedMarkersFromText(question.question_text || '');
  const expectedMarkers = Array.from(new Set([...explicitMarkers, ...textDerivedMarkers]));

  let foundMarkers = [];
  let missingMarkers = [];
  let markersVisible = true;
  let noAnswerLeaks = true;

  // 1. Check for answer leaks in SVG or diagram text
  if (svgCode) {
    for (const pat of FORBIDDEN_ANSWER_PATTERNS) {
      const match = svgCode.match(pat);
      if (match) {
        noAnswerLeaks = false;
        errors.push(`CRITICAL SECURITY LEAK: Diagram contains forbidden solution text "${match[0]}". Question diagrams must remain strictly neutral.`);
        break;
      }
    }

    // 2. Marker existence in SVG
    for (const marker of expectedMarkers) {
      const markerRegex = new RegExp(`>\\s*${escapeRegex(marker)}\\s*<`, 'i');
      if (markerRegex.test(svgCode)) {
        foundMarkers.push(marker);
      } else {
        missingMarkers.push(marker);
      }
    }

    // 3. Marker visibility (check that markers are inside <svg> and not outside viewBox)
    const viewBoxMatch = svgCode.match(/viewBox=["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*["']/i);
    if (viewBoxMatch) {
      const [_, minX, minY, width, height] = viewBoxMatch.map(Number);
      // Check <text> tags with x/y coordinates
      const textTagMatches = svgCode.matchAll(/<text[^>]*\bx=["']?([-\d.]+)["']?[^>]*\by=["']?([-\d.]+)["']?[^>]*>(.*?)<\/text>/gis);
      for (const tMatch of textTagMatches) {
        const x = parseFloat(tMatch[1]);
        const y = parseFloat(tMatch[2]);
        if (!isNaN(x) && !isNaN(y)) {
          if (x < minX - 10 || x > minX + width + 10 || y < minY - 10 || y > minY + height + 10) {
            warnings.push(`Marker text "${tMatch[3].trim()}" has coordinates (x=${x}, y=${y}) lying outside SVG viewBox bounds.`);
            markersVisible = false;
          }
        }
      }
    }

    if (missingMarkers.length > 0 && expectedMarkers.length > 0) {
      warnings.push(`Diagram is missing expected reference markers referenced in question: ${missingMarkers.join(', ')}.`);
    }
  } else {
    // If diagram is an image URL instead of SVG
    if (!question.image_url) {
      warnings.push('Diagram question is missing SVG payload or image asset URL.');
    }
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 80 : 100) : 0;

  return {
    module: 'diagram_markers',
    isValid,
    errors,
    warnings,
    score,
    expectedMarkers,
    foundMarkers,
    missingMarkers,
    markersVisible,
    noAnswerLeaks,
  };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
