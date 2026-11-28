/**
 * Chemistry Formatter Utility
 * Deterministic code-based formatter that preserves chemical formulas, scientific notation,
 * subscripts, superscripts, charges, crystal field notation, and physical chemistry equations.
 * Converts chemical formulas into KaTeX without modifying educational text or semantics.
 */

// Common chemical formulas and their LaTeX representations
const COMMON_COMPOUNDS = [
  // Inorganic acids and bases
  { pattern: /\bH2SO4\b/g, replacement: '$\\text{H}_2\\text{SO}_4$' },
  { pattern: /\bH2SO3\b/g, replacement: '$\\text{H}_2\\text{SO}_3$' },
  { pattern: /\bHNO3\b/g, replacement: '$\\text{HNO}_3$' },
  { pattern: /\bHNO2\b/g, replacement: '$\\text{HNO}_2$' },
  { pattern: /\bH3PO4\b/g, replacement: '$\\text{H}_3\\text{PO}_4$' },
  { pattern: /\bH3PO3\b/g, replacement: '$\\text{H}_3\\text{PO}_3$' },
  { pattern: /\bH3PO2\b/g, replacement: '$\\text{H}_3\\text{PO}_2$' },
  { pattern: /\bHClO4\b/g, replacement: '$\\text{HClO}_4$' },
  { pattern: /\bHClO3\b/g, replacement: '$\\text{HClO}_3$' },
  { pattern: /\bHClO2\b/g, replacement: '$\\text{HClO}_2$' },
  { pattern: /\bHOCl\b|\bHClO\b/g, replacement: '$\\text{HOCl}$' },
  { pattern: /\bNaOH\b/g, replacement: '$\\text{NaOH}$' },
  { pattern: /\bKOH\b/g, replacement: '$\\text{KOH}$' },
  { pattern: /\bCa\(OH\)2\b/g, replacement: '$\\text{Ca(OH)}_2$' },
  { pattern: /\bMg\(OH\)2\b/g, replacement: '$\\text{Mg(OH)}_2$' },
  { pattern: /\bAl\(OH\)3\b/g, replacement: '$\\text{Al(OH)}_3$' },
  { pattern: /\bNH4OH\b/g, replacement: '$\\text{NH}_4\\text{OH}$' },

  // Salts & Inorganics
  { pattern: /\bKMnO4\b/g, replacement: '$\\text{KMnO}_4$' },
  { pattern: /\bK2Cr2O7\b/g, replacement: '$\\text{K}_2\\text{Cr}_2\\text{O}_7$' },
  { pattern: /\bNa2Cr2O7\b/g, replacement: '$\\text{Na}_2\\text{Cr}_2\\text{O}_7$' },
  { pattern: /\bNa2CO3\b/g, replacement: '$\\text{Na}_2\\text{CO}_3$' },
  { pattern: /\bNaHCO3\b/g, replacement: '$\\text{NaHCO}_3$' },
  { pattern: /\bCaCO3\b/g, replacement: '$\\text{CaCO}_3$' },
  { pattern: /\bNa2SO4\b/g, replacement: '$\\text{Na}_2\\text{SO}_4$' },
  { pattern: /\bK2SO4\b/g, replacement: '$\\text{K}_2\\text{SO}_4$' },
  { pattern: /\bMgSO4\b/g, replacement: '$\\text{MgSO}_4$' },
  { pattern: /\bBaSO4\b/g, replacement: '$\\text{BaSO}_4$' },
  { pattern: /\bCuSO4\b/g, replacement: '$\\text{CuSO}_4$' },
  { pattern: /\bFeSO4\b/g, replacement: '$\\text{FeSO}_4$' },
  { pattern: /\bFe2\(SO4\)3\b/g, replacement: '$\\text{Fe}_2(\\text{SO}_4)_3$' },
  { pattern: /\bAl2\(SO4\)3\b/g, replacement: '$\\text{Al}_2(\\text{SO}_4)_3$' },
  { pattern: /\bAgNO3\b/g, replacement: '$\\text{AgNO}_3$' },
  { pattern: /\bAgCl\b/g, replacement: '$\\text{AgCl}$' },
  { pattern: /\bAgBr\b/g, replacement: '$\\text{AgBr}$' },
  { pattern: /\bAgI\b/g, replacement: '$\\text{AgI}$' },
  { pattern: /\bBaCl2\b/g, replacement: '$\\text{BaCl}_2$' },
  { pattern: /\bCaCl2\b/g, replacement: '$\\text{CaCl}_2$' },
  { pattern: /\bMgCl2\b/g, replacement: '$\\text{MgCl}_2$' },
  { pattern: /\bNaCl\b/g, replacement: '$\\text{NaCl}$' },
  { pattern: /\bKCl\b/g, replacement: '$\\text{KCl}$' },
  { pattern: /\bNH4Cl\b/g, replacement: '$\\text{NH}_4\\text{Cl}$' },
  { pattern: /\b\(NH4\)2SO4\b/g, replacement: '$(\\text{NH}_4)_2\\text{SO}_4$' },

  // Gases & simple molecules
  { pattern: /\bCO2\b/g, replacement: '$\\text{CO}_2$' },
  { pattern: /\bSO2\b/g, replacement: '$\\text{SO}_2$' },
  { pattern: /\bSO3\b/g, replacement: '$\\text{SO}_3$' },
  { pattern: /\bNO2\b/g, replacement: '$\\text{NO}_2$' },
  { pattern: /\bN2O4\b/g, replacement: '$\\text{N}_2\\text{O}_4$' },
  { pattern: /\bN2O5\b/g, replacement: '$\\text{N}_2\\text{O}_5$' },
  { pattern: /\bN2O\b/g, replacement: '$\\text{N}_2\\text{O}$' },
  { pattern: /\bNH3\b/g, replacement: '$\\text{NH}_3$' },
  { pattern: /\bPH3\b/g, replacement: '$\\text{PH}_3$' },
  { pattern: /\bAsH3\b/g, replacement: '$\\text{AsH}_3$' },
  { pattern: /\bSbH3\b/g, replacement: '$\\text{SbH}_3$' },
  { pattern: /\bBiH3\b/g, replacement: '$\\text{BiH}_3$' },
  { pattern: /\bH2O2\b/g, replacement: '$\\text{H}_2\\text{O}_2$' },
  { pattern: /\bH2O\b/g, replacement: '$\\text{H}_2\\text{O}$' },
  { pattern: /\bH2S\b/g, replacement: '$\\text{H}_2\\text{S}$' },
  { pattern: /\bH2Se\b/g, replacement: '$\\text{H}_2\\text{Se}$' },
  { pattern: /\bH2Te\b/g, replacement: '$\\text{H}_2\\text{Te}$' },
  { pattern: /\bO3\b/g, replacement: '$\\text{O}_3$' },
  { pattern: /\bP4\b/g, replacement: '$\\text{P}_4$' },
  { pattern: /\bS8\b/g, replacement: '$\\text{S}_8$' },
  { pattern: /\bPCl5\b/g, replacement: '$\\text{PCl}_5$' },
  { pattern: /\bPCl3\b/g, replacement: '$\\text{PCl}_3$' },
  { pattern: /\bSF6\b/g, replacement: '$\\text{SF}_6$' },
  { pattern: /\bSF4\b/g, replacement: '$\\text{SF}_4$' },
  { pattern: /\bXeF2\b/g, replacement: '$\\text{XeF}_2$' },
  { pattern: /\bXeF4\b/g, replacement: '$\\text{XeF}_4$' },
  { pattern: /\bXeF6\b/g, replacement: '$\\text{XeF}_6$' },
  { pattern: /\bXeOF4\b/g, replacement: '$\\text{XeOF}_4$' },
  { pattern: /\bXeO3\b/g, replacement: '$\\text{XeO}_3$' },

  // Organics
  { pattern: /\bCH4\b/g, replacement: '$\\text{CH}_4$' },
  { pattern: /\bC2H6\b/g, replacement: '$\\text{C}_2\\text{H}_6$' },
  { pattern: /\bC2H4\b/g, replacement: '$\\text{C}_2\\text{H}_4$' },
  { pattern: /\bC2H2\b/g, replacement: '$\\text{C}_2\\text{H}_2$' },
  { pattern: /\bC6H6\b/g, replacement: '$\\text{C}_6\\text{H}_6$' },
  { pattern: /\bC6H5OH\b/g, replacement: '$\\text{C}_6\\text{H}_5\\text{OH}$' },
  { pattern: /\bC6H5NH2\b/g, replacement: '$\\text{C}_6\\text{H}_5\\text{NH}_2$' },
  { pattern: /\bC6H12O6\b/g, replacement: '$\\text{C}_6\\text{H}_{12}\\text{O}_6$' },
  { pattern: /\bC12H22O11\b/g, replacement: '$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$' },
  { pattern: /\bCH3OH\b/g, replacement: '$\\text{CH}_3\\text{OH}$' },
  { pattern: /\bC2H5OH\b/g, replacement: '$\\text{C}_2\\text{H}_5\\text{OH}$' },
  { pattern: /\bCH3COOH\b/g, replacement: '$\\text{CH}_3\\text{COOH}$' },
  { pattern: /\bHCOOH\b/g, replacement: '$\\text{HCOOH}$' },
  { pattern: /\bCH3CHO\b/g, replacement: '$\\text{CH}_3\\text{CHO}$' },
  { pattern: /\bCH3COCH3\b/g, replacement: '$\\text{CH}_3\\text{COCH}_3$' },
  { pattern: /\bCHCl3\b/g, replacement: '$\\text{CHCl}_3$' },
  { pattern: /\bCCl4\b/g, replacement: '$\\text{CCl}_4$' },
];

// Coordination complexes
const COMPLEX_PATTERNS = [
  { pattern: /\[Fe\(CN\)6\]\s*(?:4-|4\s*-\s*|\^\{?4-\}?)/g, replacement: '$[\\text{Fe}(\\text{CN})_6]^{4-}$' },
  { pattern: /\[Fe\(CN\)6\]\s*(?:3-|3\s*-\s*|\^\{?3-\}?)/g, replacement: '$[\\text{Fe}(\\text{CN})_6]^{3-}$' },
  { pattern: /\[Co\(NH3\)6\]\s*(?:3\+|3\s*\+\s*|\^\{?3\+\}?)/g, replacement: '$[\\text{Co}(\\text{NH}_3)_6]^{3+}$' },
  { pattern: /\[Co\(NH3\)5Cl\]Cl2/g, replacement: '$[\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2$' },
  { pattern: /\[Co\(NH3\)4Cl2\]Cl/g, replacement: '$[\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]\\text{Cl}$' },
  { pattern: /\[Ni\(CO\)4\]/g, replacement: '$[\\text{Ni}(\\text{CO})_4]$' },
  { pattern: /\[Ni\(CN\)4\]\s*(?:2-|2\s*-\s*|\^\{?2-\}?)/g, replacement: '$[\\text{Ni}(\\text{CN})_4]^{2-}$' },
  { pattern: /\[NiCl4\]\s*(?:2-|2\s*-\s*|\^\{?2-\}?)/g, replacement: '$[\\text{NiCl}_4]^{2-}$' },
  { pattern: /\[Pt\(NH3\)2Cl2\]/g, replacement: '$[\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]$' },
  { pattern: /\[Cr\(H2O\)6\]\s*(?:3\+|3\s*\+\s*|\^\{?3\+\}?)/g, replacement: '$[\\text{Cr}(\\text{H}_2\\text{O})_6]^{3+}$' },
  { pattern: /\[Fe\(H2O\)6\]\s*(?:2\+|2\s*\+\s*|\^\{?2\+\}?)/g, replacement: '$[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$' },
  { pattern: /\[Fe\(H2O\)6\]\s*(?:3\+|3\s*\+\s*|\^\{?3\+\}?)/g, replacement: '$[\\text{Fe}(\\text{H}_2\\text{O})_6]^{3+}$' },
  { pattern: /\[Co\(en\)3\]\s*(?:3\+|3\s*\+\s*|\^\{?3\+\}?)/g, replacement: '$[\\text{Co}(\\text{en})_3]^{3+}$' },
  { pattern: /K4\[Fe\(CN\)6\]/g, replacement: '$\\text{K}_4[\\text{Fe}(\\text{CN})_6]$' },
  { pattern: /K3\[Fe\(CN\)6\]/g, replacement: '$\\text{K}_3[\\text{Fe}(\\text{CN})_6]$' },
];

// Physical chemistry and crystal field theory notation
const PHYSICAL_CHEM_NOTATION = [
  // Colligative & Solutions
  { pattern: /(?:Δ|Delta|\\Delta)\s*Tf\b/gi, replacement: '$\\Delta T_f$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*Tb\b/gi, replacement: '$\\Delta T_b$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*P\b/gi, replacement: '$\\Delta P$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*H(?:_vap|\s*vap)\b/gi, replacement: '$\\Delta H_{\\text{vap}}$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*H(?:_fus|\s*fus)\b/gi, replacement: '$\\Delta H_{\\text{fus}}$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*H\b/gi, replacement: '$\\Delta H$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*G\b/gi, replacement: '$\\Delta G$' },
  { pattern: /(?:Δ|Delta|\\Delta)\s*S\b/gi, replacement: '$\\Delta S$' },
  { pattern: /\bKf\b/g, replacement: '$K_f$' },
  { pattern: /\bKb\b/g, replacement: '$K_b$' },
  { pattern: /\bKH\b/g, replacement: '$K_H$' },
  { pattern: /\bKw\b/g, replacement: '$K_w$' },
  { pattern: /\bKa\b/g, replacement: '$K_a$' },
  { pattern: /\bKp\b/g, replacement: '$K_p$' },
  { pattern: /\bKc\b/g, replacement: '$K_c$' },
  { pattern: /\bpKa\b/g, replacement: '$\\text{p}K_a$' },
  { pattern: /\bpKb\b/g, replacement: '$\\text{p}K_b$' },
  { pattern: /\b(pH|pOH)\b/g, replacement: (m) => `$\\text{${m}}$` },
  { pattern: /(?:pi|π)\s*=\s*iCRT/gi, replacement: '$\\pi = iCRT$' },
  { pattern: /(?:pi|π)\s*=\s*CRT/gi, replacement: '$\\pi = CRT$' },

  // Kinetics
  { pattern: /\b(?:t1\/2|t_1\/2)\b/gi, replacement: '$t_{1/2}$' },
  { pattern: /\b(?:t3\/4|t_3\/4)\b/gi, replacement: '$t_{3/4}$' },
  { pattern: /\b(?:t1\/4|t_1\/4)\b/gi, replacement: '$t_{1/4}$' },
  { pattern: /\bEa\b(?=\s*(?:value|is|of|\=|\/))/gi, replacement: '$E_a$' },
  { pattern: /\bk\s*=\s*Ae\^\(-Ea\/RT\)/gi, replacement: '$k = A e^{-E_a/RT}$' },
  { pattern: /\bk\s*=\s*A\s*e\^\{?-E_?a\/RT\}?/gi, replacement: '$k = A e^{-E_a/RT}$' },

  // Orbitals & CFT
  { pattern: /\bA_o\b/g, replacement: '$\\Delta_o$' },
  { pattern: /\bA_t\b/g, replacement: '$\\Delta_t$' },
  { pattern: /\bDelta_o\b/g, replacement: '$\\Delta_o$' },
  { pattern: /\bDelta_t\b/g, replacement: '$\\Delta_t$' },
  { pattern: /\bt2g\b/gi, replacement: '$t_{2g}$' },
  { pattern: /\beg\b(?=\s*(?:and|orbital|level|set|\^|\d|system))/gi, replacement: '$e_g$' },
  { pattern: /\bd2sp3\b/gi, replacement: '$d^2sp^3$' },
  { pattern: /\bsp3d2\b/gi, replacement: '$sp^3d^2$' },
  { pattern: /\bdsp2\b/gi, replacement: '$dsp^2$' },
  { pattern: /\bsp3d\b/gi, replacement: '$sp^3d$' },
  { pattern: /\bsp3\b/gi, replacement: '$sp^3$' },
  { pattern: /\bsp2\b/gi, replacement: '$sp^2$' },
  { pattern: /\bBM\b/g, replacement: '\\text{BM}' },

  // Units
  { pattern: /\bK\s*kg\s*mol[-–—\^]?1\b/gi, replacement: '$\\text{K kg mol}^{-1}$' },
  { pattern: /\bmol\s*kg[-–—\^]?1\b/gi, replacement: '$\\text{mol kg}^{-1}$' },
  { pattern: /\bmol\s*L[-–—\^]?1\b/gi, replacement: '$\\text{mol L}^{-1}$' },
  { pattern: /\bg\s*mol[-–—\^]?1\b/gi, replacement: '$\\text{g mol}^{-1}$' },
  { pattern: /\bL\s*mol[-–—\^]?1\s*s[-–—\^]?1\b/gi, replacement: '$\\text{L mol}^{-1}\\text{ s}^{-1}$' },
  { pattern: /\bs[-–—\^]1\b/gi, replacement: '$\\text{s}^{-1}$' },
  { pattern: /\b10\^([-\+]?\d+)\b/g, replacement: (m, exp) => `$10^{${exp}}$` },
];

// Common OCR typo corrections for chemistry terms
const OCR_CORRECTIONS = [
  [/\bchramium\b/gi, 'chromium'],
  [/\bjons\b/gi, 'ions'],
  [/\bjon\b/gi, 'ion'],
  [/\bfarms\b/gi, 'forms'],
  [/\bsclutions\b/gi, 'solutions'],
  [/\bsclution\b/gi, 'solution'],
  [/\bbicdogical\b/gi, 'biological'],
  [/\bcahat\b/gi, 'cobalt'],
  [/\befectren\b/gi, 'electron'],
  [/\belectrans\b/gi, 'electrons'],
  [/\bmagnatic\b/gi, 'magnetic'],
  [/\bdiamagnatic\b/gi, 'diamagnetic'],
  [/\bparamagnatic\b/gi, 'paramagnetic'],
  [/\btatrahedral\b/gi, 'tetrahedral'],
  [/\boctahedrat\b/gi, 'octahedral'],
  [/\bgacmetry\b/gi, 'geometry'],
  [/\bgeomeiry\b/gi, 'geometry'],
  [/\bcyanocobatamin\b/gi, 'cyanocobalamin'],
  [/\bcarrect\b/gi, 'correct'],
  [/\bincarrect\b/gi, 'incorrect'],
  [/\bcalchm\b/gi, 'calcium'],
  [/\biran\b/gi, 'iron'],
  [/\bamang\b/gi, 'among'],
  [/\bfellowing\b/gi, 'following'],
];

/**
 * Format chemical text, preserving formulas and converting to KaTeX math where appropriate.
 * @param {string} text - Raw input text
 * @returns {string} - Cleaned text with proper chemical formulas in KaTeX
 */
export function formatChemicalFormulas(text) {
  if (!text || typeof text !== 'string') return text || '';
  let s = text.replace(/\0/g, '');

  // 1. OCR corrections
  for (const [pattern, replacement] of OCR_CORRECTIONS) {
    s = s.replace(pattern, replacement);
  }

  // 2. Protect existing LaTeX blocks ($...$ or $$...$$) from being double-wrapped
  const mathSegments = [];
  s = s.replace(/(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$)/g, (match) => {
    mathSegments.push(match);
    return `__MATH_SEGMENT_${mathSegments.length - 1}__`;
  });

  // 3. Coordination complexes
  for (const item of COMPLEX_PATTERNS) {
    s = s.replace(item.pattern, item.replacement);
  }

  // 4. Common chemical compounds
  for (const item of COMMON_COMPOUNDS) {
    s = s.replace(item.pattern, item.replacement);
  }

  // 5. Physical chemistry and kinetics notation
  for (const item of PHYSICAL_CHEM_NOTATION) {
    if (typeof item.replacement === 'function') {
      s = s.replace(item.pattern, item.replacement);
    } else {
      s = s.replace(item.pattern, item.replacement);
    }
  }

  // 6. Generic ions like SO4 2-, SO4^2-, NO3-, PO4 3-, NH4+, Cl-, Na+, K+
  s = s.replace(/\b([A-Z][a-z]?\d*(?:\([A-Z][a-z]?\d*\)\d*)?)\s*\^\s*\{?([1-4]?[\+\-])\}?/g, '$\\text{$1}^{$2}$');
  s = s.replace(/\b(SO4|CO3|PO4|NO3|OH|NH4|H3O|Fe|Cu|Zn|Al|Ca|Mg|Na|K|Cl|Br|I)\s+([1-4]?[\+\-])\b/g, '$\\text{$1}^{$2}$');

  // 7. Equilibrium arrows (<=>, <==>, <->, ->)
  s = s.replace(/\s*<={1,2}>\s*/g, ' $\\rightleftharpoons$ ');
  s = s.replace(/\s*<->\s*/g, ' $\\leftrightarrow$ ');
  s = s.replace(/\s*->\s*/g, ' $\\rightarrow$ ');

  // 8. Clean consecutive math markers: e.g. $\text{H}_2\text{O}$ and $\text{CO}_2$ -> ensure valid boundaries
  s = s.replace(/\$\s*\$/g, ' ');
  s = s.replace(/(\\text\{BM\})+/g, '\\text{BM}');
  s = s.replace(/\$\s*\\text\{BM\}\s*\$/g, '$\\text{BM}$');

  // 9. Restore protected math segments
  if (mathSegments.length > 0) {
    mathSegments.forEach((seg, i) => {
      s = s.replace(`__MATH_SEGMENT_${i}__`, seg);
    });
  }

  return s.trim();
}
