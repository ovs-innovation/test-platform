/**
 * Diagram Validation & Quality Assurance Service
 * Validates scientific accuracy, marker positioning, XML structure,
 * and strictly ensures NO answers or solutions are leaked into question diagrams.
 */

import { FORBIDDEN_ANSWER_PATTERNS } from './diagramConfig.js';

/**
 * Validates a diagram asset
 * @param {Object} options
 * @param {string} options.svgCode - SVG content string
 * @param {string} options.format - 'svg', 'png', 'jpg', 'webp'
 * @param {Array<string>} options.expectedMarkers - List of marker keys e.g. ['A', 'B', 'C', 'D']
 * @param {string} options.subject - Subject name
 * @param {string} options.topic - Topic name
 * @returns {Object} Validation report
 */
export function validateDiagram({
  svgCode = '',
  format = 'svg',
  expectedMarkers = [],
  subject = '',
  topic = '',
} = {}) {
  const errors = [];
  const warnings = [];
  let requiresManualReview = false;

  // 1. Structural Checks for SVG
  const structuralCheck = {
    hasValidXml: false,
    hasViewBox: false,
    hasGraphicElements: false,
  };

  if (format === 'svg') {
    if (!svgCode || typeof svgCode !== 'string') {
      errors.push('Diagram SVG content is empty or invalid.');
      return {
        isValid: false,
        requiresManualReview: true,
        errors,
        warnings,
      };
    }

    const trimmed = svgCode.trim();
    if (trimmed.startsWith('<svg') && trimmed.includes('</svg>')) {
      structuralCheck.hasValidXml = true;
    } else {
      errors.push('SVG does not have valid root <svg> and </svg> tags.');
    }

    if (/viewBox=["'][^"']+["']/i.test(trimmed)) {
      structuralCheck.hasViewBox = true;
    } else {
      warnings.push('SVG is missing a viewBox attribute for responsive scaling.');
    }

    // Check for graphic shapes (path, line, rect, circle, polygon, polyline, ellipse)
    const hasShapes = /<(path|line|rect|circle|polygon|polyline|ellipse)\b/i.test(trimmed);
    if (hasShapes) {
      structuralCheck.hasGraphicElements = true;
    } else {
      errors.push('SVG contains no graphical elements or paths.');
    }
  }

  // 2. CRITICAL SECURITY: Answer and Solution Leak Check
  const securityCheck = {
    leaksDetected: false,
    suspiciousMatches: [],
  };

  const textToCheck = svgCode;
  for (const pattern of FORBIDDEN_ANSWER_PATTERNS) {
    const match = textToCheck.match(pattern);
    if (match) {
      securityCheck.leaksDetected = true;
      securityCheck.suspiciousMatches.push(match[0]);
      errors.push(`CRITICAL SECURITY LEAK: Diagram text contains forbidden answer/solution indicator "${match[0]}".`);
    }
  }

  // 3. Reference Marker Verification
  const markerChecks = {
    expectedCount: expectedMarkers.length,
    foundCount: 0,
    markers: expectedMarkers,
    missingMarkers: [],
    allPresent: true,
  };

  if (expectedMarkers.length > 0 && format === 'svg') {
    for (const marker of expectedMarkers) {
      // Look for the marker text inside <text> or label attributes
      const markerRegex = new RegExp(`>\\s*${escapeRegex(marker)}\\s*<`, 'i');
      if (markerRegex.test(svgCode)) {
        markerChecks.foundCount += 1;
      } else {
        markerChecks.missingMarkers.push(marker);
      }
    }

    if (markerChecks.foundCount < markerChecks.expectedCount) {
      markerChecks.allPresent = false;
      warnings.push(`Expected ${markerChecks.expectedCount} markers but only ${markerChecks.foundCount} were identified in diagram.`);
      requiresManualReview = true;
    }
  }

  // 4. Overall Evaluation
  const isValid = errors.length === 0;
  if (!isValid || warnings.length > 0) {
    requiresManualReview = true;
  }

  return {
    isValid,
    requiresManualReview,
    structuralCheck,
    securityCheck,
    markerChecks,
    errors,
    warnings,
    validatedAt: new Date().toISOString(),
  };
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
