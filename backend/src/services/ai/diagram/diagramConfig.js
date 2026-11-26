/**
 * AI Diagram Generation Configuration & Taxonomies
 * Covers NEET and JEE competitive examination diagram standards.
 */

export const SUPPORTED_SUBJECTS = {
  BIOLOGY: 'Biology',
  PHYSICS: 'Physics',
  CHEMISTRY: 'Chemistry',
  MATHEMATICS: 'Mathematics',
};

export const DIAGRAM_CATEGORIES = {
  [SUPPORTED_SUBJECTS.BIOLOGY]: [
    'human_anatomy',
    'plant_anatomy',
    'cell_structure',
    'tissue_histology',
    'biological_process',
    'genetics_pedigree',
  ],
  [SUPPORTED_SUBJECTS.PHYSICS]: [
    'electric_circuit',
    'ray_optics',
    'wave_optics',
    'mechanics_fbd',
    'thermodynamics_pv',
    'physics_graph',
    'experimental_setup',
  ],
  [SUPPORTED_SUBJECTS.CHEMISTRY]: [
    'molecular_structure',
    'chemical_bonding',
    'reaction_diagram',
    'orbital_representation',
    'coordination_complex',
    'electrochemical_cell',
  ],
  [SUPPORTED_SUBJECTS.MATHEMATICS]: [
    'coordinate_geometry',
    'conic_sections',
    'curve_sketching',
    'geometric_construction',
    'vector_3d',
    'area_under_curve',
  ],
};

export const STANDARD_MARKER_SETS = {
  LETTERS: ['A', 'B', 'C', 'D'],
  VARIABLES: ['X', 'Y', 'Z', 'W'],
  PARENTHESES: ['(1)', '(2)', '(3)', '(4)'],
  ROMAN: ['I', 'II', 'III', 'IV'],
  POINTS: ['P', 'Q', 'R', 'S'],
};

export const DEFAULT_CANVAS_CONFIG = {
  width: 600,
  height: 400,
  viewBox: '0 0 600 400',
  backgroundColor: '#ffffff',
  primaryStroke: '#0f172a',
  secondaryStroke: '#475569',
  strokeWidth: 2,
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontSize: 14,
  markerBg: '#2563eb',
  markerTextColor: '#ffffff',
};

/**
 * Strict regex detecting answer or solution leaks in question diagrams.
 * Examination diagrams must ONLY show question references, never answers!
 */
export const FORBIDDEN_ANSWER_PATTERNS = [
  /\banswer\s*[:=]/i,
  /\bcorrect\s*(option|answer|choice)?\b/i,
  /\bsolution\s*[:=]/i,
  /\bhence\b/i,
  /\btherefore\b/i,
  /\bresult\s*[:=]/i,
  /\boption\s*([a-d]|[1-4])\s*is\s*correct\b/i,
  /\bthis\s*is\s*the\s*correct\b/i,
  /\bkey\s*[:=]/i,
];
