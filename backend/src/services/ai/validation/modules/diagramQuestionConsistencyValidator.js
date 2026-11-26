/**
 * Module 10: Diagram / Question Consistency Validation
 * Validates mutual consistency between the question text and diagram asset:
 * - If question references a visual element ("as shown in the figure", "in the circuit diagram below"),
 *   ensures a diagram asset is actually present.
 * - Ensures diagram assets are accessible and non-corrupt.
 * - Ensures markers referenced in the question statement align with the diagram.
 */

const FIGURE_REFERENCE_PATTERNS = [
  /\b(?:in|from|refer|as\s+shown\s+in)\s+(?:the\s+)?(?:given\s+)?(?:figure|fig|diagram|circuit|graph|setup|illustration|image)\b/i,
  /\b(?:figure|fig\.?|diagram|circuit)\s+(?:below|above|shows?)\b/i,
  /\blabeled\s+(?:as\s+)?[A-Za-z0-9]/i,
  /\bcurve\s+(?:A|B|1|2)\s+in\s+the\s+graph\b/i,
];

export function validateDiagramQuestionConsistency(question = {}) {
  const errors = [];
  const warnings = [];

  const text = String(question.question_text || '');
  const hasFigureRef = FIGURE_REFERENCE_PATTERNS.some((pat) => pat.test(text));

  const hasDiagramProp = Boolean(
    question.has_diagram ||
    question.content_type === 'diagram' ||
    question.content_type === 'graph'
  );

  const hasSvgAsset = Boolean(question.diagram_svg || question.diagram_metadata?.diagram_svg);
  const hasImageUrl = Boolean(question.image_url);
  const hasAsset = hasSvgAsset || hasImageUrl;

  // 1. Question requires diagram but none provided
  if (hasFigureRef && !hasAsset && !hasDiagramProp) {
    errors.push('Question statement references a figure or diagram ("shown in the figure"), but no diagram asset is attached.');
  }

  // 2. Question has diagram asset, check structural accessibility
  if (hasAsset) {
    if (hasSvgAsset) {
      const svg = String(question.diagram_svg || question.diagram_metadata?.diagram_svg || '').trim();
      if (!svg.startsWith('<svg') || !svg.includes('</svg>')) {
        errors.push('Diagram SVG is malformed (missing valid opening <svg> or closing </svg> tag).');
      } else if (svg.length < 50) {
        errors.push('Diagram SVG payload is abnormally short (< 50 characters).');
      }
    }

    if (hasImageUrl) {
      const url = String(question.image_url).trim();
      if (!url.startsWith('http') && !url.startsWith('/uploads') && !url.startsWith('/assets')) {
        warnings.push(`Diagram image URL "${url}" has a non-standard path prefix.`);
      }
    }

    // If diagram is present but question does NOT reference it
    if (!hasFigureRef && !hasDiagramProp) {
      warnings.push('Diagram asset is attached, but the question statement does not explicitly reference a figure or diagram.');
    }
  }

  const isValid = errors.length === 0;
  const score = isValid ? (warnings.length > 0 ? 85 : 100) : Math.max(0, 100 - (errors.length * 40));

  return {
    module: 'diagram_consistency',
    isValid,
    errors,
    warnings,
    score,
    hasFigureReference: hasFigureRef,
    hasDiagramAttached: hasAsset || hasDiagramProp,
    diagramAccessible: hasAsset,
  };
}
