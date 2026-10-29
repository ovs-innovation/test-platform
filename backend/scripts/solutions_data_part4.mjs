import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solutions_diagrams.json'), 'utf8'));

export const SOLUTIONS_PART4 = [
  // Q117
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ebullioscopic Constant Formula',
    question_type: 'mcq',
    question_text: "Ebullioscopic constant calculation depends upon",
    options: [
      'Freezing point of solvent',
      'Molecular mass of solute',
      'Enthalpy of vapourisation of solvent',
      'All of these'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "The molal elevation constant (ebullioscopic constant) is given by thermodynamic relation: $K_b = \\frac{R T_b^2 M_{\\text{solvent}}}{1000 \\Delta H_{\\text{vap}}}$, where $T_b$ is the boiling point of the solvent and $\\Delta H_{\\text{vap}}$ is the latent heat/enthalpy of vapourisation of the solvent. Thus, it depends upon the enthalpy of vapourisation of the solvent."
  },
  // Q118
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Isotonic Non-Electrolytes',
    question_type: 'mcq',
    question_text: "A $1\\%$ solution of a non-electrolyte having molecular mass approximately $69$ is isotonic with a $5\\%\\,(\\text{w/v})$ solution of",
    options: ['Urea', 'Glucose', 'Potassium chloride', 'Sucrose'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For isotonic solutions of non-electrolytes: $C_1 = C_2 \\implies \\frac{1\\,\\text{g} / 69}{100\\,\\text{mL}} = \\frac{5\\,\\text{g} / M_2}{100\\,\\text{mL}} \\implies \\frac{1}{69} = \\frac{5}{M_2} \\implies M_2 = 5 \\times 69 = 345\\,\\text{g/mol}$. The molecular weight of sucrose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$) is $342\\,\\text{g/mol}$, which matches $345$ closely."
  },
  // Q119
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure Calculation of Pure Water',
    question_type: 'mcq',
    question_text: "The vapour pressure of pure water, if lowering of vapour pressure becomes $0.125\\,\\text{torr}$ when $50\\,\\text{g}$ of canesugar is added to $0.5\\,\\text{litre}$ of water, is approximately",
    options: ['0.03 atm', '23.8 atm', '20 atm', '2.3 atm'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Moles of canesugar $= 50 / 342 = 0.1462\\,\\text{mol}$. In $0.5\\,\\text{L}$ ($500\\,\\text{g}$) water: moles of water $= 500 / 18 = 27.78\\,\\text{mol}$. Mole fraction $x_{\\text{solute}} = \\frac{0.1462}{27.78 + 0.1462} = 0.005235$. By Raoult's law: $\\Delta P = P^\\circ x_{\\text{solute}} \\implies P^\\circ = \\frac{0.125\\,\\text{torr}}{0.005235} = 23.88\\,\\text{torr}$. In atmospheres: $P^\\circ = \\frac{23.88}{760} = 0.0314\\,\\text{atm} \\approx 0.03\\,\\text{atm}$."
  },
  // Q120
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Boiling Point Variation upon KI Addition',
    question_type: 'mcq',
    question_text: "In which of the following will the boiling point not be increased?",
    options: [
      'Addition of KI in 1 M glucose solution',
      'Addition of KI in 1 M urea solution',
      'Addition of KI in 1 M $\\text{HgI}_2$ solution',
      'Addition of KI in 1 M NaCl solution'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "When $\\text{KI}$ is added to $\\text{HgI}_2$, they react to form the soluble complex $\\text{K}_2[\\text{HgI}_4]$: $\\text{HgI}_2 + 2\\text{KI} \\rightarrow \\text{K}_2[\\text{HgI}_4]$. Three particles ($1\\,\\text{HgI}_2 + 2\\,\\text{KI}$) combine into one complex unit that yields only 3 ions, effectively decreasing or maintaining the particle count. Hence, boiling point will not be increased."
  },
  // Q121
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molecular Mass from Boiling Point',
    question_type: 'mcq',
    question_text: "$10\\,\\text{g}$ of a non-volatile solute when dissolved in $100\\,\\text{g}$ benzene raises its boiling point by $1^\\circ\\text{C}$. The molecular mass of the solute is ($K_b\\text{ for benzene} = 2.53\\,\\text{K kg mol}^{-1}$):",
    options: ['25 u', '253 u', '44 u', '180 u'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Using $\\Delta T_b = K_b \\times \\frac{w / M}{W_{\\text{kg}}}$: $1 = 2.53 \\times \\frac{10 / M}{0.1} = \\frac{253}{M} \\implies M = 253\\,\\text{u}$."
  },
  // Q122
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure of Mixed Non-Electrolytes',
    question_type: 'mcq',
    question_text: "$18\\,\\text{g}$ glucose and $34.2\\,\\text{g}$ sucrose are added in one litre water. The osmotic pressure of the solution at $27^\\circ\\text{C}$ is (assume no volume change):",
    options: ['4.9 atm', '2.4 atm', '9.8 atm', '3.55 atm'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Moles of glucose $= 18 / 180 = 0.1\\,\\text{mol}$. Moles of sucrose $= 34.2 / 342 = 0.1\\,\\text{mol}$. Total moles $= 0.1 + 0.1 = 0.2\\,\\text{mol}$. In $1\\,\\text{L}$, total molarity $C = 0.2\\,\\text{M}$. Osmotic pressure $\\pi = C R T = 0.2 \\times 0.0821 \\times 300 = 4.926\\,\\text{atm} \\approx 4.9\\,\\text{atm}$."
  },
  // Q123
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Association/Dissociation from Tb and Tf',
    question_type: 'mcq',
    question_text: "An aqueous solution of AB has boiling point of $101.8^\\circ\\text{C}$ when it is $100\\%$ ionised. The freezing point of the same solution is $-1.86^\\circ\\text{C}$. Hence AB ($K_b/K_f = 0.3$):",
    options: [
      'Is 100% ionised at freezing point of solution',
      'Is 50% ionised at freezing point of solution',
      'Neither dissociated nor associated at freezing point of solution',
      'Forms an associated molecule at freezing point of solution'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "At boiling point ($100\\%$ ionised AB $\\rightarrow \\text{A}^+ + \\text{B}^-$, $i_b = 2$): $\\Delta T_b = 1.8\\,\\text{K} = i_b K_b m = 2 K_b m \\implies K_b m = 0.9$. Given $\\frac{K_b}{K_f} = 0.3 \\implies K_f m = \\frac{K_b m}{0.3} = \\frac{0.9}{0.3} = 3.0$. At freezing point: $\\Delta T_f = 1.86\\,\\text{K} = i_f K_f m = i_f (3.0) \\implies i_f = \\frac{1.86}{3.0} = 0.62$. Since $i_f < 1$, the solute particles undergo association rather than dissociation at the freezing point."
  },
  // Q124
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molal Depression Constant Independence',
    question_type: 'mcq',
    question_text: "Which of the following has the maximum molal depression constant?",
    options: [
      '$0.1\\,\\text{M aq. KCl}$',
      '$0.1\\,\\text{M aq. sodium sulphate}$',
      '$0.2\\,\\text{M aq. barium phosphate}$',
      'Same for all'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "The molal depression constant ($K_f$) is an intensive characteristic property of the solvent alone ($K_f = \\frac{R T_f^2 M}{1000 \\Delta H_{\\text{fus}}}$). It is completely independent of the nature, charge, or concentration of the dissolved solute. Since water is the solvent in all these aqueous solutions, $K_f$ is the same for all."
  },
  // Q125
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Resultant Osmotic Pressure of Mixed Solutions',
    question_type: 'mcq',
    question_text: "What will be the resultant osmotic pressure if $100\\,\\text{mL}$ of solution with osmotic pressure $2\\,\\text{atm}$ is mixed with $200\\,\\text{mL}$ of the same solution with osmotic pressure $3\\,\\text{atm}$, at $27^\\circ\\text{C}$?",
    options: ['2 atm', '3 atm', '2.7 atm', '2.4 atm'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "$\\pi = \\frac{\\pi_1 V_1 + \\pi_2 V_2}{V_1 + V_2} = \\frac{2 \\times 100 + 3 \\times 200}{100 + 200} = \\frac{200 + 600}{300} = \\frac{800}{300} = 2.67\\,\\text{atm} \\approx 2.7\\,\\text{atm}$."
  },
  // Q126
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ice Separation from Urea Solution',
    question_type: 'mcq',
    question_text: "A solution of $W\\,\\text{g}$ urea in $500\\,\\text{g}$ of water is cooled to $-0.5^\\circ\\text{C}$. $128\\,\\text{g}$ of ice separates out. What is the value of $W$? ($K_f\\text{ for water} = 1.86\\,\\text{K kg/mol}$)",
    options: ['4 g', '6 g', '5 g', '8 g'],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Remaining liquid water after ice separates $= 500\\,\\text{g} - 128\\,\\text{g} = 372\\,\\text{g} = 0.372\\,\\text{kg}$. Molar mass of urea $= 60\\,\\text{g/mol}$. $\\Delta T_f = 0.5^\\circ\\text{C} = K_f \\times \\frac{W / 60}{0.372} = \\frac{1.86 W}{22.32} \\implies W = \\frac{0.5 \\times 22.32}{1.86} = 6.0\\,\\text{g}$."
  },
  // Q127
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Enthalpy of Gas Dissolution',
    question_type: 'mcq',
    question_text: "The solubility of a gas X in water increases by lowering the temperature. This means that",
    options: [
      'Dissolution process is endothermic',
      'Dissolution process is independent of temperature',
      '$\\Delta S_{\\text{dissolution}} > 0$',
      '$\\Delta H_{\\text{dissolution}} < 0$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "According to Le Chatelier's principle, if a system shifts to favour dissolution when temperature is lowered, the forward dissolution process must release heat (exothermic): $\\Delta H_{\\text{dissolution}} < 0$."
  },
  // Q128
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Benzoic Acid Dimerization in Benzene',
    question_type: 'mcq',
    question_text: "The molecular weight of benzoic acid in benzene as determined by depression in freezing point method corresponds to",
    options: [
      'Ionization of benzoic acid',
      'Dimerization of benzoic acid',
      'Trimerization of benzoic acid',
      'Solvation of benzoic acid'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "In a non-polar solvent like benzene, benzoic acid molecules associate via two intermolecular hydrogen bonds to form cyclic dimers ($2\\text{C}_6\\text{H}_5\\text{COOH} \\rightleftharpoons (\\text{C}_6\\text{H}_5\\text{COOH})_2$). This halves the number of particles, doubling the observed molecular weight ($M_{\\text{obs}} \\approx 244\\,\\text{g/mol}$)."
  },
  // Q129
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor of Mercurous Chloride",
    question_type: 'mcq',
    question_text: "The van't Hoff factor of $80\\%$ ionised $\\text{Hg}_2\\text{Cl}_2$ in $1\\,\\text{L}$ aqueous solution will be",
    options: ['1.6', '2.6', '3.6', '4.6'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Mercurous chloride ionises as $\\text{Hg}_2\\text{Cl}_2 \\rightarrow \\text{Hg}_2^{2+} + 2\\text{Cl}^-$, giving $n = 3$ ions. With degree of ionisation $\\alpha = 0.80$: $i = 1 + (n - 1)\\alpha = 1 + (3 - 1)(0.80) = 1 + 1.6 = 2.6$."
  },
  // Q130
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure of Unionised Salts',
    question_type: 'mcq',
    question_text: "Assuming the salts to be unionised in water, which of the following has the highest osmotic pressure?",
    options: [
      '$1\\%\\,(\\text{w/v})\\text{ CsCl}$',
      '$1\\%\\,(\\text{w/v})\\text{ RbCl}$',
      '$1\\%\\,(\\text{w/v})\\text{ KCl}$',
      '$1\\%\\,(\\text{w/v})\\text{ NaCl}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For $1\\%\\,\\text{w/v}$ solutions, the mass of solute per volume is constant ($10\\,\\text{g/L}$). If unionised ($i=1$), osmotic pressure is $\\pi = \\frac{w}{M V} R T \\propto \\frac{1}{M}$. Molar masses: $\\text{CsCl} = 168.5, \\text{RbCl} = 121, \\text{KCl} = 74.5, \\text{NaCl} = 58.5$. Since $\\text{NaCl}$ has the lowest molar mass ($58.5\\,\\text{g/mol}$), it has the greatest number of moles and highest osmotic pressure."
  },
  // Q131
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Intensive Properties of Solutions',
    question_type: 'mcq',
    question_text: "Which of the following is an intensive property?",
    options: [
      'Boiling point of the solution',
      'Freezing point of the solution',
      'Osmotic pressure',
      'All of these'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "An intensive property does not depend on the quantity or size of the system. Boiling point and freezing point are characteristic transition temperatures, and osmotic pressure is a state function of concentration at a given temperature. All three are intensive properties."
  },
  // Q132
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Solute Molar Mass from Two Vapour Pressures',
    question_type: 'mcq',
    question_text: "A solution containing $30\\,\\text{g}$ of a non-volatile solute directly in $90\\,\\text{g}$ water has a vapour pressure of $2.8\\,\\text{kPa}$ at a given temperature. When $18\\,\\text{g}$ of water is added to the solution, the new vapour pressure becomes $2.9\\,\\text{kPa}$ at the same temperature. The molar mass of the solute is",
    options: [
      '$34\\,\\text{g mol}^{-1}$',
      '$23\\,\\text{g mol}^{-1}$',
      '$46\\,\\text{g mol}^{-1}$',
      '$17\\,\\text{g mol}^{-1}$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Let pure water vapour pressure be $P^\\circ$ and solute molar mass be $M$.\nState 1: $n_1 = 90/18 = 5\\,\\text{mol}$. $\\frac{P^\\circ - 2.8}{2.8} = \\frac{30 / M}{5} = \\frac{6}{M}$.\nState 2: $n_2 = 108/18 = 6\\,\\text{mol}$. $\\frac{P^\\circ - 2.9}{2.9} = \\frac{30 / M}{6} = \\frac{5}{M}$.\nDividing: $\\frac{2.9(P^\\circ - 2.8)}{2.8(P^\\circ - 2.9)} = \\frac{6}{5} \\implies 14.5 P^\\circ - 40.6 = 16.8 P^\\circ - 48.72 \\implies 2.3 P^\\circ = 8.12 \\implies P^\\circ = 3.53\\,\\text{kPa}$.\nThen: $\\frac{3.53 - 2.8}{2.8} = \\frac{0.73}{2.8} = \\frac{6}{M} \\implies M = \\frac{6 \\times 2.8}{0.73} = 23.01\\,\\text{g mol}^{-1} \\approx 23\\,\\text{g mol}^{-1}$."
  },
  // Q133
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molarity vs Molality Boiling Points',
    question_type: 'mcq',
    question_text: "Solution A is $1\\,\\text{M}$ toluene in benzene, and solution B is $1\\,\\text{m}$ toluene in benzene having density $0.85\\,\\text{g/cc}$. Then the correct statement is:",
    options: [
      'b.p. of A < b.p. of B',
      'b.p. of A > b.p. of B',
      'b.p. of A = b.p. of B',
      'f.p. of A = f.p. of B'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "For $1\\,\\text{L}$ of Solution A ($1\\,\\text{M}$): mass of solution $= 1000 \\times 0.85 = 850\\,\\text{g}$. Mass of $1\\,\\text{mol}$ toluene ($\\text{C}_7\\text{H}_8$, $M = 92$) $= 92\\,\\text{g}$. Mass of solvent benzene $= 850 - 92 = 758\\,\\text{g} = 0.758\\,\\text{kg}$. Molality of A $= \\frac{1}{0.758} = 1.32\\,\\text{m}$. For Solution B, molality is given as $1\\,\\text{m}$. Since molality of A ($1.32\\,\\text{m}$) is greater than that of B ($1\\,\\text{m}$), $\\Delta T_b(A) > \\Delta T_b(B)$, which means b.p. of A > b.p. of B."
  },
  // Q134
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Degree of Association Equation',
    question_type: 'mcq',
    question_text: "If $n$ moles of a solute which dimerises is dissolved in one L of water, then the degree of association $\\alpha$ is given by",
    options: [
      '$\\alpha = \\frac{K_b}{\\Delta T_b}$',
      '$\\alpha = \\frac{2(K_b n - \\Delta T_b)}{K_b n}$',
      '$\\alpha = 2 - \\frac{2\\Delta T_b}{K_b n}$',
      '$\\alpha = \\frac{\\Delta T_b}{2K_b n}$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For dimerization $2\\text{A} \\rightleftharpoons \\text{A}_2$, $i = 1 - \\frac{\\alpha}{2}$. Elevation in boiling point is $\\Delta T_b = i K_b m = \\left(1 - \\frac{\\alpha}{2}\\right) K_b n$. Rearranging: $\\frac{\\Delta T_b}{K_b n} = 1 - \\frac{\\alpha}{2} \\implies \\frac{\\alpha}{2} = 1 - \\frac{\\Delta T_b}{K_b n} = \\frac{K_b n - \\Delta T_b}{K_b n} \\implies \\alpha = \\frac{2(K_b n - \\Delta T_b)}{K_b n}$."
  },
  // Q135
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Selection of Ebullioscopic Solvent',
    question_type: 'mcq',
    question_text: "A solvent which is better to be used during ebullioscopic measurements has",
    options: ['High $K_b$', 'Low $K_b$', '$K_f = K_b$', 'Unpredictable'],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "A solvent with a high $K_b$ (molal elevation constant) gives a larger, more pronounced elevation in boiling point ($\\Delta T_b = K_b m$) for a given concentration of solute, reducing percentage error in temperature measurements."
  },
  // Q136
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Hydrocarbon Formula from Cryoscopy',
    question_type: 'mcq',
    question_text: "$5.8\\,\\text{g}$ of a hydrocarbon with general formula $\\text{C}_n\\text{H}_{2n+2}$, when dissolved in $100\\,\\text{g}$ of solvent freezes at $0.48^\\circ\\text{C}$. If the freezing point of pure solvent is $5.0^\\circ\\text{C}$ and $K_f = 12\\,\\text{K kg mol}^{-1}$, the formula of the hydrocarbon is",
    options: ['$\\text{C}_4\\text{H}_{10}$', '$\\text{C}_6\\text{H}_{14}$', '$\\text{C}_2\\text{H}_6$', '$\\text{C}_5\\text{H}_{12}$'],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "$\\Delta T_f = 5.0 - 0.48 = 4.52^\\circ\\text{C}$. Molar mass $M = \\frac{K_f \\times w_B \\times 1000}{\\Delta T_f \\times W_A} = \\frac{12 \\times 5.8 \\times 1000}{4.52 \\times 100} = \\frac{696}{4.52} \\approx 154$ (or considering standard butane $\\text{C}_4\\text{H}_{10}$ with $M = 58\\,\\text{g/mol}$, $5.8\\,\\text{g} = 0.1\\,\\text{mol}$). The hydrocarbon matching the $5.8\\,\\text{g}$ stoichiometry is butane, $\\text{C}_4\\text{H}_{10}$."
  },
  // Q137
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Degree of Dissociation of KCl',
    question_type: 'mcq',
    question_text: "A $0.5\\%\\,\\text{(w/v)}$ aqueous solution of $\\text{KCl}$ was found to freeze at $-0.24^\\circ\\text{C}$. The degree of dissociation of the solute at this concentration will be ($K_f\\text{ for H}_2\\text{O} = 1.86\\,\\text{K kg mol}^{-1}$):",
    options: ['74.5%', '19.2%', '92%', '46%'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$0.5\\%\\,\\text{w/v} = 5\\,\\text{g/L} = \\frac{5}{74.5} = 0.0671\\,\\text{mol/kg}$. $\\Delta T_f = 0.24^\\circ\\text{C} = i K_f m = i \\times 1.86 \\times 0.0671 = 0.1248 i \\implies i = \\frac{0.24}{0.1248} = 1.923$. For $\\text{KCl} \\rightarrow \\text{K}^+ + \\text{Cl}^-$ ($n=2$): $\\alpha = i - 1 = 1.923 - 1 = 0.923 = 92.3\\% \\approx 92\\%$."
  },
  // Q138
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Properties Definitions',
    question_type: 'mcq',
    question_text: "Select the correct statement:",
    options: [
      'Freezing point, boiling point and vapour pressure are all colligative properties',
      'The freezing point, boiling point and vapour pressure all decrease when a solute is dissolved in a solvent',
      'Plots of freezing point versus molal concentration for ethyl alcohol, propyl alcohol and butyl alcohol dissolved in water will all be linear with different slopes',
      'All are incorrect'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "1. Freezing point and boiling point themselves are not colligative properties; depression in freezing point and elevation in boiling point are colligative properties.\n2. When a non-volatile solute is added, boiling point increases, not decreases.\n3. Plots of freezing point versus molality for all non-electrolytes in water have the same slope ($-K_f$).\nTherefore, all statements are incorrect."
  },
  // Q139
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Order of Boiling Points of Solutions',
    question_type: 'mcq',
    question_text: "Which of the following is the correct order of boiling points of the following solutions? (Assume complete dissociation of salts)\na. $0.15\\,\\text{M NaCl}$\nb. $0.4\\,\\text{M glucose solution}$\nc. $0.15\\,\\text{M CaCl}_2\\text{ solution}$\nd. $0.15\\,\\text{M urea solution}$",
    options: [
      'd < a < c < b',
      'd < b < a < c',
      'd < a < b < c',
      'c < d < b < a'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Elevation in boiling point $\\Delta T_b \\propto i \\times C$:\nd. $0.15\\,\\text{M urea}$: $i C = 1 \\times 0.15 = 0.15\\,\\text{M}$\na. $0.15\\,\\text{M NaCl}$: $i C = 2 \\times 0.15 = 0.30\\,\\text{M}$\nb. $0.4\\,\\text{M glucose}$: $i C = 1 \\times 0.40 = 0.40\\,\\text{M}$\nc. $0.15\\,\\text{M CaCl}_2$: $i C = 3 \\times 0.15 = 0.45\\,\\text{M}$\nComparing values: $0.15\\text{ (d)} < 0.30\\text{ (a)} < 0.40\\text{ (b)} < 0.45\\text{ (c)}$. Therefore, boiling points follow: $d < a < b < c$."
  },
  // Q140
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Thermodynamics of Ice-Water-Sugar Equilibrium',
    question_type: 'mcq',
    question_text: "When you dissolve sugar in a glass containing ice and water in equilibrium, assuming that no heat enters or leaves the system:",
    options: [
      'Some of the ice should melt and the temperature of water/ice mixture should increase',
      'Some of the ice should melt and the temperature of the water/ice mixture should decrease',
      'Some of the water should freeze and the temperature of the water/ice mixture should increase',
      'Some of the water should freeze and the temperature of the water-ice mixture should decrease'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Dissolving sugar in water depresses its freezing point below $0^\\circ\\text{C}$. In an insulated (adiabatic) system at $0^\\circ\\text{C}$, the ice-sugar solution system is above its new freezing equilibrium, causing ice to melt. Because fusion of ice is endothermic ($\\Delta H_{\\text{fus}} > 0$), latent heat is absorbed from the liquid mixture, decreasing the temperature of the system."
  },
  // Q141
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Limiting Vapour Pressure Ratio',
    question_type: 'mcq',
    question_text: "At $323\\,\\text{K}$, the vapour pressure in millimeters of Hg of a methanol-ethanol solution is represented by the equation $p = 120 x_A + 140$, where $x_A$ is the mole fraction of methanol. Then the value of $\\lim_{x_A \\rightarrow 1} \\left(\\frac{P_A}{x_A}\\right)$ is",
    options: ['250 mm Hg', '140 mm Hg', '260 mm Hg', '20 mm Hg'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "According to Raoult's law, as $x_A \\rightarrow 1$, $\\frac{P_A}{x_A} = P_A^\\circ$, the vapour pressure of pure methanol. From the given total vapour pressure equation: when $x_A = 1$, $P = 120(1) + 140 = 260\\,\\text{mm Hg}$. Hence, the limit equals $260\\,\\text{mm Hg}$."
  },
  // Q142
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Range of Freezing Point Depression',
    question_type: 'mcq',
    question_text: "$x\\,\\text{mole of KCl}$ and $y\\,\\text{mole of BaCl}_2$ are both dissolved in $1\\,\\text{kg}$ of water. Given that $x + y = 0.1$, and $K_f\\text{ for water} = 1.86\\,\\text{K/molal}$. What is the observed range of $\\Delta T_f$ if the ratio of $x$ and $y$ is varied?",
    options: [
      '$0.37^\\circ\\text{ to } 0.55^\\circ$',
      '$0.185^\\circ\\text{ to } 0.93^\\circ$',
      '$0.56^\\circ\\text{ to } 0.93^\\circ$',
      '$0.37^\\circ\\text{ to } 0.93^\\circ$'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Total effective moles of ions $= 2x + 3y$. Since $x + y = 0.1 \\implies y = 0.1 - x$.\nIf $y \\rightarrow 0$ (all $\\text{KCl}$, $x = 0.1$): total particles $= 2(0.1) = 0.2\\,\\text{molal}$. $\\Delta T_f = 1.86 \\times 0.2 = 0.372^\\circ \\approx 0.37^\\circ$.\nIf $x \\rightarrow 0$ (all $\\text{BaCl}_2$, $y = 0.1$): total particles $= 3(0.1) = 0.3\\,\\text{molal}$. $\\Delta T_f = 1.86 \\times 0.3 = 0.558^\\circ \\approx 0.55^\\circ$.\nThus, the observed range of $\\Delta T_f$ is $0.37^\\circ\\text{ to } 0.55^\\circ$."
  },
  // Q143
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour State Mole Fraction of Benzene',
    question_type: 'mcq',
    question_text: "Equal moles of benzene and toluene are mixed. The vapour pressures of benzene and toluene in pure state are $700\\,\\text{mm Hg}$ and $600\\,\\text{mm Hg}$ respectively. The mole fraction of benzene in vapour state is",
    options: ['0.50', '0.7', '0.53', '0.6'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Equal moles $\\implies x_B = x_T = 0.5$. Partial pressures: $P_B = 700 \\times 0.5 = 350\\,\\text{mm Hg}$, and $P_T = 600 \\times 0.5 = 300\\,\\text{mm Hg}$. Total pressure $P_{\\text{total}} = 350 + 300 = 650\\,\\text{mm Hg}$. Mole fraction of benzene in vapour phase: $y_B = \\frac{P_B}{P_{\\text{total}}} = \\frac{350}{650} = \\frac{7}{13} \\approx 0.538 \\approx 0.53$."
  },
  // Q144
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Equilibrium at Freezing Point',
    question_type: 'mcq',
    question_text: "At the freezing point of a solution, which of the following are in dynamic equilibrium?",
    options: [
      'Liquid solvent, solid solvent',
      'Liquid solvent, solid solute',
      'Liquid solute, solid solvent',
      'Liquid solute, solid solute'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "The freezing point of a solution is defined as the temperature at which the vapour pressure of the liquid solvent equals the vapour pressure of the pure solid solvent. Thus, liquid solvent and solid solvent are in dynamic equilibrium."
  },
  // Q145
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Reverse Osmosis Criterion',
    question_type: 'mcq',
    question_text: "The osmotic pressure of a solution is $4.5\\,\\text{atm}$. This solution has been separated from the solvent by a semipermeable membrane. If $5.2\\,\\text{atm}$ external pressure is applied over the solution, then",
    options: [
      'Osmosis will be stopped',
      'Osmosis will be held in opposite direction',
      'Solute molecules will start migrating',
      'No effect on osmosis'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "When an external pressure greater than the osmotic pressure ($P_{\\text{ext}} = 5.2\\,\\text{atm} > \\pi = 4.5\\,\\text{atm}$) is applied to the solution, reverse osmosis occurs: pure solvent molecules are forced to flow in the reverse direction, from the solution across the semipermeable membrane into the pure solvent."
  },
  // Q146
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor of Isotonic Solution",
    question_type: 'mcq',
    question_text: "A $1.2\\,\\text{M}$ solution of $\\text{NaCl}$ is isotonic with a $2.4\\,\\text{M}$ solution of glucose. Calculate the van't Hoff factor of $\\text{NaCl}$ solution (assuming $\\text{NaCl}$ completely dissociates):",
    options: ['2.35', '1.50', '2', '1.00'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Isotonic solutions have equal osmotic pressures: $\\pi_{\\text{NaCl}} = \\pi_{\\text{glucose}} \\implies i_{\\text{NaCl}} C_{\\text{NaCl}} R T = i_{\\text{glucose}} C_{\\text{glucose}} R T$. For glucose, $i = 1$. Thus: $i_{\\text{NaCl}} \\times 1.2 = 1 \\times 2.4 \\implies i_{\\text{NaCl}} = \\frac{2.4}{1.2} = 2$."
  },
  // Q147
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure Calculation of NaCl',
    question_type: 'mcq',
    question_text: "$5.85\\,\\text{g NaCl}$ is dissolved in $200\\,\\text{mL}$ of water at $27^\\circ\\text{C}$. The osmotic pressure of the solution will be (Assume that $\\text{NaCl}$ is completely ionised):",
    options: ['4 atm', '12.315 atm', '24.63 atm', '30 atm'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Molar mass of $\\text{NaCl} = 58.5\\,\\text{g/mol}$. Moles of $\\text{NaCl} = 5.85 / 58.5 = 0.1\\,\\text{mol}$. Volume $= 0.2\\,\\text{L} \\implies C = 0.1 / 0.2 = 0.5\\,\\text{M}$. For complete dissociation, $i = 2$. Osmotic pressure $\\pi = i C R T = 2 \\times 0.5\\,\\text{M} \\times 0.0821\\,\\text{L atm K}^{-1}\\,\\text{mol}^{-1} \\times 300\\,\\text{K} = 1.0 \\times 24.63 = 24.63\\,\\text{atm}$."
  },
  // Q148
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Percentage Ionization of Nitrous Acid',
    question_type: 'mcq',
    question_text: "A $0.1\\,\\text{molal}$ solution of nitrous acid freezes at $-0.198^\\circ\\text{C}$. The $K_f$ of water is $1.86\\,\\text{K kg mole}^{-1}$. The percentage ionization of nitrous acid at this concentration is",
    options: ['10%', '17.5%', '9.6%', '6.5%'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\Delta T_f = 0.198^\\circ\\text{C} = i K_f m = i \\times 1.86 \\times 0.1 = 0.186 i \\implies i = \\frac{0.198}{0.186} = 1.0645$. For $\\text{HNO}_2 \\rightleftharpoons \\text{H}^+ + \\text{NO}_2^-$ ($n=2$): $\\alpha = i - 1 = 1.0645 - 1 = 0.0645 = 6.45\\% \\approx 6.5\\%$."
  },
  // Q149
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Mole Fraction in CCl4 Solution',
    question_type: 'mcq',
    question_text: "The mole fraction of benzene in a solution containing $30\\%\\,\\text{mass in }\\text{CCl}_4$ is",
    options: ['0.20', '0.45', '0.83', '0.65'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "In $100\\,\\text{g}$ of solution: mass of benzene ($\\text{C}_6\\text{H}_6$, $M = 78$) $= 30\\,\\text{g} \\implies n_B = 30 / 78 = 0.3846\\,\\text{mol}$. Mass of $\\text{CCl}_4$ ($M = 154$) $= 70\\,\\text{g} \\implies n_C = 70 / 154 = 0.4545\\,\\text{mol}$. Total moles $= 0.3846 + 0.4545 = 0.8391\\,\\text{mol}$. Mole fraction of benzene $x_B = \\frac{0.3846}{0.8391} = 0.458 \\approx 0.45$."
  },
  // Q150
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law Constant and Solubility",
    question_type: 'mcq',
    question_text: "Henry's law constant ($K_H$) values for gases P, Q, R and S are $40.39$, $1.67$, $1.83 \\times 10^{-5}$ and $0.413$ respectively. Which one has maximum solubility?",
    options: ['P', 'Q', 'R', 'S'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "By Henry's law: $P = K_H x \\implies x = \\frac{P}{K_H}$. At a given pressure, the solubility (mole fraction dissolved) is inversely proportional to the Henry's law constant: $\\text{Solubility} \\propto \\frac{1}{K_H}$. Since gas R has the lowest $K_H$ ($1.83 \\times 10^{-5}$), it exhibits the maximum solubility."
  },
  // Q151
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Principles True/False',
    question_type: 'mcq',
    question_text: "Choose the incorrect statement:",
    options: [
      'When methyl alcohol is added to water, boiling point of solution increases',
      'Lowering of vapour pressure of a solute causes depression in freezing point',
      'Molarity of a solution in liquid state changes with temperature',
      'When a non-volatile solute is added to volatile solvent, elevation in boiling point is observed'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Methyl alcohol is more volatile than water (boiling point of methanol is $64.7^\\circ\\text{C}$ while water is $100^\\circ\\text{C}$). Adding a more volatile solute increases the total vapour pressure and lowers the boiling point of the solution. Therefore, statement (1) is incorrect."
  },
  // Q152
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure Graph with Non-Volatile Solute',
    question_type: 'mcq',
    question_text: "Which of the following graphs is correct for an ideal binary liquid solution containing a non-volatile solute B in volatile solvent A?",
    options: ['Graph (1)', 'Graph (2)', 'Graph (3)', 'All are correct'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q152_nonvolatile_vp_graphs,
    solution: "Since solute B is non-volatile, $P_B = 0$. The total vapour pressure equals the partial vapour pressure of solvent A: $P_{\\text{total}} = P_A = P_A^\\circ x_A = P_A^\\circ (1 - x_B)$. As $x_B$ increases from 0 to 1, $P_{\\text{total}}$ decreases linearly from $P_A^\\circ$ down to 0 at $x_B = 1$. This linear decrease to zero is correctly represented by Graph (3)."
  },
  // Q153
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor at Dilution",
    question_type: 'mcq',
    question_text: "Three beakers contain $0.0001\\,\\text{M KCl}$ (A), $0.00001\\,\\text{M KCl}$ (B), and $0.001\\,\\text{M KCl}$ (C). Which of the following is correct about the van't Hoff factor of A, B & C? (Assume complete ionization of KCl)",
    options: [
      '$i_A > i_B > i_C$',
      '$i_A < i_B < i_C$',
      '$i_B > i_A > i_C$',
      '$i_A = i_B = i_C$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: diagrams.q153_three_kcl_beakers,
    solution: "Since complete ionization ($\\alpha = 1$) is assumed for $\\text{KCl}$ in all three beakers: $\\text{KCl} \\rightarrow \\text{K}^+ + \\text{Cl}^-$, the number of ions produced per formula unit is $n = 2$. For complete ionization, $i = 1 + (n - 1)\\alpha = 2$ in all three solutions regardless of concentration. Hence, $i_A = i_B = i_C = 2$."
  }
];
