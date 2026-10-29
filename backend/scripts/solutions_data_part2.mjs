import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solutions_diagrams.json'), 'utf8'));

export const SOLUTIONS_PART2 = [
  // Q31
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Boiling Point Comparison',
    question_type: 'mcq',
    question_text: "Which of the following aqueous solutions has the highest boiling point?",
    options: [
      '$0.02\\,\\text{M NaCl}$',
      '$0.05\\,\\text{M sucrose}$',
      '$0.005\\,\\text{M CaCl}_2$',
      '$0.02\\,\\text{M Ca(NO}_3)_2$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Elevation in boiling point $\\Delta T_b \\propto i \\times C$:\n1. $0.02\\,\\text{M NaCl}$: $i = 2 \\implies i C = 0.04\\,\\text{M}$\n2. $0.05\\,\\text{M sucrose}$: $i = 1 \\implies i C = 0.05\\,\\text{M}$\n3. $0.005\\,\\text{M CaCl}_2$: $i = 3 \\implies i C = 0.015\\,\\text{M}$\n4. $0.02\\,\\text{M Ca(NO}_3)_2$: $i = 3 \\implies i C = 0.06\\,\\text{M}$\nSince $0.02\\,\\text{M Ca(NO}_3)_2$ produces the highest effective concentration of dissolved ions ($0.06\\,\\text{M}$), it has the highest boiling point."
  },
  // Q32
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Coordination Complex Freezing Point',
    question_type: 'mcq',
    question_text: "A complex is represented as $\\text{CoCl}_3\\cdot x\\text{NH}_3$. Its $0.1\\,\\text{molar}$ solution in water shows a melting point of $-0.558^\\circ\\text{C}$ ($K_f\\text{ of H}_2\\text{O} = 1.86\\,\\text{K molality}^{-1}$). Assuming 100% ionisation of the complex and coordination number of Co is 6, the formula of the complex is",
    options: [
      '$[\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3$',
      '$[\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2$',
      '$[\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]\\text{Cl}$',
      'All of these'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Depression in freezing point $\\Delta T_f = 0 - (-0.558) = 0.558^\\circ\\text{C}$. Using $\\Delta T_f = i K_f m$: $0.558 = i \\times 1.86 \\times 0.1 \\implies i = \\frac{0.558}{0.186} = 3$. A van't Hoff factor $i = 3$ indicates that each molecule of the complex produces 3 ions upon ionization. With coordination number 6, the formulation $[\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2 \\rightarrow [\\text{Co}(\\text{NH}_3)_5\\text{Cl}]^{2+} + 2\\text{Cl}^-$ produces exactly 3 ions."
  },
  // Q33
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Positive Deviation Enthalpy',
    question_type: 'mcq',
    question_text: "For a positive deviation solution, enthalpy change of mixing is",
    options: ['$\\Delta H = 0$', '$\\Delta H > 0$', '$\\Delta H < 0$', 'All of these'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "In solutions showing positive deviation from Raoult's law, intermolecular forces between solute and solvent molecules (A-B) are weaker than those between pure components (A-A and B-B). Heat is absorbed to separate the stronger original interactions, making the process endothermic: $\\Delta H_{\\text{mix}} > 0$."
  },
  // Q34
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ice Separation on Freezing',
    question_type: 'mcq',
    question_text: "The amount of ice that will separate out on cooling a solution containing $50\\,\\text{g}$ ethylene glycol in $200\\,\\text{g}$ water to $-9.3^\\circ\\text{C}$ will be ($K_f\\text{ water} = 1.86\\,\\text{K kg mol}^{-1}$)",
    options: ['38.7 g', '3.87 g', '83.7 g', '8.37 g'],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Molar mass of ethylene glycol ($\\text{C}_2\\text{H}_6\\text{O}_2$) $= 62\\,\\text{g/mol}$. Moles of solute $= 50 / 62 = 0.8065\\,\\text{mol}$. At $-9.3^\\circ\\text{C}$, $\\Delta T_f = 9.3\\,\\text{K}$. Using $\\Delta T_f = K_f \\times \\frac{n_{\\text{solute}}}{W_{\\text{solvent}}(\\text{kg})}$: $9.3 = 1.86 \\times \\frac{0.8065}{W} \\implies W = \\frac{1.86 \\times 0.8065}{9.3} = 0.1613\\,\\text{kg} = 161.3\\,\\text{g}$. Mass of ice separated $= 200\\,\\text{g} - 161.3\\,\\text{g} = 38.7\\,\\text{g}$."
  },
  // Q35
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure & Temperature',
    question_type: 'mcq',
    question_text: "The temperature at which a $10\\%\\,\\text{aqueous solution (w/v)}$ of glucose will exhibit an osmotic pressure of $16.4\\,\\text{atm}$ is [$R = 0.082\\,\\text{dm}^3\\,\\text{atm K}^{-1}\\,\\text{mol}^{-1}$]",
    options: ['360 K', '180 K', '90 K', '300 K'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$10\\%\\,\\text{w/v} = 10\\,\\text{g glucose in } 100\\,\\text{mL} = 100\\,\\text{g/L}$. Molar concentration $C = 100 / 180 = \\frac{5}{9}\\,\\text{M}$. Using van't Hoff formula $\\pi = C R T$: $16.4 = \\frac{5}{9} \\times 0.082 \\times T \\implies T = \\frac{16.4 \\times 9}{5 \\times 0.082} = \\frac{147.6}{0.41} = 360\\,\\text{K}$."
  },
  // Q36
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Reduction in Vapour Pressure',
    question_type: 'mcq',
    question_text: "Find the amount of urea that should be dissolved in $100\\,\\text{g}$ of water in order to reduce its vapour pressure by $25\\%$.",
    options: ['83.33 g', '111.11 g', '18.51 g', '45 g'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Reduction of vapour pressure by $25\\%$ means $\\frac{P^\\circ - P}{P^\\circ} = 0.25$, so $P / P^\\circ = 0.75$. By Raoult's law: $\\frac{P^\\circ - P}{P} = \\frac{n_{\\text{urea}}}{n_{\\text{water}}} \\implies \\frac{0.25}{0.75} = \\frac{1}{3} = \\frac{w / 60}{100 / 18}$. Solving for $w$: $w = \\frac{1}{3} \\times \\frac{100}{18} \\times 60 = \\frac{6000}{54} = 111.11\\,\\text{g}$."
  },
  // Q37
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Equimolar Ideal Solution Vapour Pressure',
    question_type: 'mcq',
    question_text: "At $40^\\circ\\text{C}$, the vapour pressures of pure liquids benzene and toluene are $160\\,\\text{mm Hg}$ and $60\\,\\text{mm Hg}$ respectively. At the same temperature, the vapour pressure of an equimolar solution of the two liquids, assuming ideal behavior, should be",
    options: ['140 mm Hg', '110 mm Hg', '220 mm Hg', '100 mm Hg'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For an equimolar solution, mole fractions are $x_{\\text{benzene}} = x_{\\text{toluene}} = 0.5$. By Raoult's law: $P_{\\text{total}} = P_A^\\circ x_A + P_B^\\circ x_B = 160 \\times 0.5 + 60 \\times 0.5 = 80 + 30 = 110\\,\\text{mm Hg}$."
  },
  // Q38
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law Solubility Calculation",
    question_type: 'mcq',
    question_text: "$K_H$ for $\\text{H}_2\\text{ (g) / water}$ system is $5.34 \\times 10^7\\,\\text{torr}$. If the partial pressure of $\\text{H}_2$ over a solution at $25^\\circ\\text{C}$ is $760\\,\\text{torr}$, then determine the solubility of hydrogen. Assume density of $\\text{H}_2\\text{O}$ and solution are the same.",
    options: [
      '$6.4 \\times 10^{-3}\\,\\text{mol L}^{-1}$',
      '$7.89 \\times 10^{-4}\\,\\text{mol L}^{-1}$',
      '$5.9 \\times 10^{-2}\\,\\text{mol L}^{-1}$',
      '$8.9 \\times 10^{-4}\\,\\text{mol L}^{-1}$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "According to Henry's law: $x_{\\text{H}_2} = \\frac{P}{K_H} = \\frac{760}{5.34 \\times 10^7} = 1.423 \\times 10^{-5}$. In $1\\,\\text{L}$ of water ($1000\\,\\text{g}$), moles of water $= 1000 / 18 = 55.55\\,\\text{mol}$. The solubility in moles per litre is: $n_{\\text{H}_2} = x_{\\text{H}_2} \\times n_{\\text{water}} = 1.423 \\times 10^{-5} \\times 55.55 = 7.89 \\times 10^{-4}\\,\\text{mol L}^{-1}$."
  },
  // Q39
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molal Elevation of Boiling Point',
    question_type: 'mcq',
    question_text: "An aqueous solution of glucose boils at $100.01^\\circ\\text{C}$. The molal elevation constant of water is $0.5\\,\\text{K kg mol}^{-1}$. Find the number of moles of glucose in $100\\,\\text{g}$ water.",
    options: [
      '$1 \\times 10^2\\,\\text{mole}$',
      '$1 \\times 10^{-2}\\,\\text{mole}$',
      '$2 \\times 10^{-3}\\,\\text{mole}$',
      '$3 \\times 10^{-4}\\,\\text{mole}$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Boiling point elevation $\\Delta T_b = 100.01 - 100.00 = 0.01^\\circ\\text{C} = 0.01\\,\\text{K}$. Using $\\Delta T_b = K_b \\times m$: $0.01 = 0.5 \\times m \\implies m = 0.02\\,\\text{mol/kg}$. In $100\\,\\text{g}$ ($0.1\\,\\text{kg}$) of water: $\\text{moles of glucose} = m \\times 0.1\\,\\text{kg} = 0.02 \\times 0.1 = 0.002 = 2 \\times 10^{-3}\\,\\text{mole}$."
  },
  // Q40
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure & Normality',
    question_type: 'mcq',
    question_text: "Select from the following the one that has the highest osmotic pressure:",
    options: [
      '$0.1\\,\\text{N urea}$',
      '$0.1\\,\\text{N NaCl}$',
      '$0.1\\,\\text{N Na}_2\\text{SO}_4$',
      '$0.1\\,\\text{N Na}_3\\text{PO}_4$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Osmotic pressure $\\pi = i C R T$. Converting normality $N$ to molarity $C = N / n$-factor:\n1. Urea: $n=1 \\implies C = 0.1\\,\\text{M}, i = 1 \\implies i C = 0.1\\,\\text{M}$\n2. $\\text{NaCl}$: $n=1 \\implies C = 0.1\\,\\text{M}, i = 2 \\implies i C = 2 \\times 0.1 = 0.2\\,\\text{M}$\n3. $\\text{Na}_2\\text{SO}_4$: $n=2 \\implies C = 0.05\\,\\text{M}, i = 3 \\implies i C = 3 \\times 0.05 = 0.15\\,\\text{M}$\n4. $\\text{Na}_3\\text{PO}_4$: $n=3 \\implies C = 0.0333\\,\\text{M}, i = 4 \\implies i C = 4 \\times 0.0333 = 0.133\\,\\text{M}$\nThus, $0.1\\,\\text{N NaCl}$ has the highest $i C = 0.2\\,\\text{M}$ and highest osmotic pressure."
  },
  // Q41
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Mole Fractions from Relative Lowering',
    question_type: 'mcq',
    question_text: "For a solution containing a non-volatile, non-electrolytic solute the relative lowering in vapour pressure is $0.2$. If total number of moles present in the solution is $5$, then which of the following is correct?",
    options: [
      'Mol fraction of solvent, $X_{\\text{solvent}} = 0.8$',
      'Mol fraction of solute, $X_{\\text{solute}} = 0.8$',
      'Number of moles of solute = 4',
      'Number of moles of solvent = 2'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Relative lowering of vapour pressure equals mole fraction of solute: $\\frac{\\Delta P}{P^\\circ} = X_{\\text{solute}} = 0.2$. Therefore, mole fraction of solvent $X_{\\text{solvent}} = 1 - 0.2 = 0.8$. Total moles $= 5$, so moles of solvent $= 0.8 \\times 5 = 4$ and moles of solute $= 0.2 \\times 5 = 1$."
  },
  // Q42
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Phase Mole Fraction',
    question_type: 'mcq',
    question_text: "Two pure liquids A and B have vapour pressures in the ratio $1 : 3$. The mol fraction of 'A' in vapour phase, when A and B are mixed in $1 : 3$ molar ratio in a solution, will be",
    options: ['0.1', '0.2', '0.3', '0.5'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Let $P_A^\\circ = P$ and $P_B^\\circ = 3P$. In liquid phase: $x_A = 1/4$ and $x_B = 3/4$. Partial pressures: $P_A = P_A^\\circ x_A = P \\times (1/4) = P/4$, and $P_B = P_B^\\circ x_B = 3P \\times (3/4) = 9P/4$. Total pressure $P_{\\text{total}} = P/4 + 9P/4 = 10P/4$. Mole fraction of A in vapour phase is: $y_A = \\frac{P_A}{P_{\\text{total}}} = \\frac{P/4}{10P/4} = \\frac{1}{10} = 0.1$."
  },
  // Q43
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Raoult's Law Partial Pressure Plot",
    question_type: 'mcq',
    question_text: "Consider the graph depicting the variation of total vapour pressure and vapour pressure of components of a solution with mol fraction. Which of the following is correct regarding the plot?",
    options: [
      'A is more volatile than B',
      'B will be more in liquid phase starting from equal mole fractions of A and B',
      '$AD = BD + CD$',
      '$AD = BC = CD$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q43_vp_mol_fraction_graph,
    solution: "In the Raoult's law plot, segment AD represents total vapour pressure $P_{\\text{total}}$ at the chosen composition, segment BD represents partial vapour pressure $P_B$, and segment CD represents partial vapour pressure $P_A$. According to Dalton's law of partial pressures: $P_{\\text{total}} = P_A + P_B$, which geometrically translates to $AD = BD + CD$."
  },
  // Q44
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law Mol/L Solubility",
    question_type: 'mcq',
    question_text: "A gas exerts a partial pressure of $0.2\\,\\text{atm}$ on water. The Henry's law constant is $10^4\\,\\text{atm}$. The solubility of the gas in mol per litre will be approximately",
    options: [
      '$2.75 \\times 10^{-5}$',
      '$1.1 \\times 10^{-3}$',
      '$1.1 \\times 10^{-4}$',
      '$2.75 \\times 10^{-4}$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Mole fraction of gas $x = \\frac{P}{K_H} = \\frac{0.2}{10^4} = 2 \\times 10^{-5}$. In $1\\,\\text{L}$ of water, moles of water $= 1000 / 18 = 55.55\\,\\text{mol}$. Solubility in moles per litre $= 2 \\times 10^{-5} \\times 55.55 = 1.11 \\times 10^{-3}\\,\\text{mol L}^{-1}$."
  },
  // Q45
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Solubility & Temperature of KNO3',
    question_type: 'mcq',
    question_text: "If a saturated solution of potassium nitrate is heated",
    options: [
      'It becomes unsaturated',
      'It becomes super saturated',
      'It remains saturated',
      'Crystallization occurs'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "The dissolution of potassium nitrate ($\\text{KNO}_3$) in water is an endothermic process ($\\Delta H_{\\text{sol}} > 0$). According to Le Chatelier's principle, increasing temperature increases its solubility. Thus, a solution that is saturated at lower temperature can dissolve more solute at higher temperature, becoming unsaturated."
  },
  // Q46
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ideal Solution Mixing Properties',
    question_type: 'mcq',
    question_text: "If an ideal solution is produced by mixing components A and B, then which of the following is correct?",
    options: [
      '$\\Delta G_{\\text{mix}} = 0$',
      '$\\Delta H_{\\text{mix}} = 0$',
      '$\\Delta G_{\\text{mix}} = 0, \\; \\Delta S_{\\text{mix}} = 0$',
      '$\\Delta S_{\\text{mix}} = 0$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For an ideal solution, intermolecular attractions between A-A, B-B, and A-B are identical. Hence, no heat is evolved or absorbed upon mixing: $\\Delta H_{\\text{mix}} = 0$. (Meanwhile, $\\Delta V_{\\text{mix}} = 0$, $\\Delta S_{\\text{mix}} > 0$, and $\\Delta G_{\\text{mix}} < 0$)."
  },
  // Q47
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Endothermic Mixing in Solutions',
    question_type: 'mcq',
    question_text: "For which of the following binary mixtures is $\\Delta H_{\\text{mix}} > 0$?",
    options: [
      '$\\text{C}_6\\text{H}_5\\text{Cl} + \\text{C}_6\\text{H}_5\\text{Br}$',
      '$\\text{C}_2\\text{H}_5\\text{OH} + \\text{CH}_3\\text{COCH}_3$',
      '$\\text{H}_2\\text{O} + \\text{HNO}_3$',
      '$\\text{CHCl}_3 + \\text{CH}_3\\text{COCH}_3$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\Delta H_{\\text{mix}} > 0$ characterizes positive deviation from Raoult's law. In a mixture of ethanol and acetone, acetone molecules get between hydrogen-bonded ethanol molecules and disrupt hydrogen bonding, absorbing heat ($\\Delta H_{\\text{mix}} > 0$)."
  },
  // Q48
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'HCl and Water Azeotrope',
    question_type: 'mcq',
    question_text: "For a mixture of $\\text{HCl}$ and water, the following statements are written:\n(a) The solution exhibits negative deviation from Raoult's law\n(b) The solution boils at a temperature higher than those of either component\n(c) The solution is an example of maximum boiling azeotrope\n\nThe correct statement(s) is/are",
    options: ['(a) and (b)', '(c) only', '(a) and (c)', '(a), (b) and (c)'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\text{HCl}$ and $\\text{H}_2\\text{O}$ form strong hydronium and chloride associations, showing strong negative deviation from Raoult's law. They form a maximum boiling azeotrope ($20.2\\%\\,\\text{HCl}$) that boils at $108.5^\\circ\\text{C}$, which is higher than the boiling points of both pure components. Thus, (a), (b), and (c) are all correct."
  },
  // Q49
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ebullioscopic Constant Elevation',
    question_type: 'mcq',
    question_text: "The ebullioscopic constant for a solvent is $0.5\\,\\text{K kg mol}^{-1}$. The boiling point of a solution containing $0.05\\,\\text{mole}$ of a non-volatile, non-electrolytic solute in $0.25\\,\\text{kg}$ solvent will increase by",
    options: ['10 K', '1 K', '0.1 K', '100 K'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Molality $m = \\frac{0.05\\,\\text{mol}}{0.25\\,\\text{kg}} = 0.2\\,\\text{mol kg}^{-1}$. Elevation in boiling point $\\Delta T_b = K_b \\times m = 0.5\\,\\text{K kg mol}^{-1} \\times 0.2\\,\\text{mol kg}^{-1} = 0.1\\,\\text{K}$."
  },
  // Q50
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Freezing Point Comparison',
    question_type: 'mcq',
    question_text: "Which of the following solutions will have the highest freezing point?",
    options: [
      '$0.1\\,\\text{M KCl}$',
      '$0.1\\,\\text{M BaCl}_2$',
      '$0.1\\,\\text{M FeCl}_3$',
      '$0.1\\,\\text{M Fe}_2(\\text{SO}_4)_3$'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Freezing point is $T_f = T_f^\\circ - \\Delta T_f$. The highest freezing point corresponds to the lowest depression in freezing point $\\Delta T_f$, which occurs at the lowest effective concentration $i C$:\n1. $0.1\\,\\text{M KCl}$: $i = 2 \\implies i C = 0.2\\,\\text{M}$\n2. $0.1\\,\\text{M BaCl}_2$: $i = 3 \\implies i C = 0.3\\,\\text{M}$\n3. $0.1\\,\\text{M FeCl}_3$: $i = 4 \\implies i C = 0.4\\,\\text{M}$\n4. $0.1\\,\\text{M Fe}_2(\\text{SO}_4)_3$: $i = 5 \\implies i C = 0.5\\,\\text{M}$\n$0.1\\,\\text{M KCl}$ has the lowest $i C = 0.2\\,\\text{M}$ and therefore the highest freezing point."
  },
  // Q51
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Direction of Osmosis',
    question_type: 'mcq',
    question_text: "In case of osmosis, solvent moves from",
    options: [
      'Higher vapour pressure region to lower vapour pressure region',
      'Higher concentration to lower concentration',
      'Lower vapour pressure region to higher vapour pressure region',
      'Higher osmotic pressure region to lower osmotic pressure region'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "A pure solvent or dilute solution has a higher vapour pressure and chemical potential than a concentrated solution. During osmosis, solvent molecules spontaneously migrate from the region of higher vapour pressure (lower solute concentration) to the region of lower vapour pressure (higher solute concentration)."
  },
  // Q52
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure with Solute Ratio',
    question_type: 'mcq',
    question_text: "The vapour pressure of a solution of a non-volatile solute B in solvent A mixed in $2 : 5$ molar ratio is $250\\,\\text{mm Hg}$. Considering ideality, calculate the vapour pressure of a solution prepared by mixing B and A in the ratio $3 : 4$.",
    options: ['200 mm of Hg', '300 mm of Hg', '150 mm of Hg', '375 mm of Hg'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "In the first solution: $x_{A,1} = \\frac{5}{2 + 5} = \\frac{5}{7}$. By Raoult's law: $P_1 = P_A^\\circ x_{A,1} \\implies 250 = P_A^\\circ \\left(\\frac{5}{7}\\right) \\implies P_A^\\circ = 350\\,\\text{mm Hg}$. In the second solution (B:A = 3:4): $x_{A,2} = \\frac{4}{3 + 4} = \\frac{4}{7}$. The new vapour pressure is: $P_2 = P_A^\\circ x_{A,2} = 350 \\times \\frac{4}{7} = 200\\,\\text{mm Hg}$."
  },
  // Q53
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Volatile Mixture Vapour Phase Fraction',
    question_type: 'mcq',
    question_text: "An equimolar solution of two volatile liquids A ($M = 150\\,\\text{g mol}^{-1}$) and B ($M = 200\\,\\text{g mol}^{-1}$) has vapour pressure $500\\,\\text{torr}$. If the vapour pressure of pure B is $400\\,\\text{torr}$, the mol fraction of component A in vapour phase is",
    options: ['0.5', '0.6', '0.3', '0.4'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For an equimolar solution: $x_A = x_B = 0.5$. $P_{\\text{total}} = P_A^\\circ x_A + P_B^\\circ x_B \\implies 500 = 0.5 P_A^\\circ + 0.5(400) = 0.5 P_A^\\circ + 200 \\implies 0.5 P_A^\\circ = 300 \\implies P_A^\\circ = 600\\,\\text{torr}$. The partial pressure of A is $P_A = 600 \\times 0.5 = 300\\,\\text{torr}$. Vapour phase mole fraction: $y_A = \\frac{P_A}{P_{\\text{total}}} = \\frac{300}{500} = 0.6$."
  },
  // Q54
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Validity of Henry's Law",
    question_type: 'mcq',
    question_text: "Which of the following is true with respect to Henry's law?",
    options: [
      "With increase in pressure of the gas, its solubility increases",
      'It is obeyed by gases at low temperature and high pressure',
      'With increase in temperature the value of Henry law constant decreases',
      'All of these'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "According to Henry's law, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas above the liquid ($m \\propto P$). Henry's law is obeyed at low pressure and moderate/high temperature (ideal gas behavior), and $K_H$ increases with temperature."
  },
  // Q55
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Negative Deviation Thermodynamic Criteria',
    question_type: 'mcq',
    question_text: "For a solution with negative deviations from Raoult's law, which of the following is true?",
    options: [
      '$\\Delta G_{\\text{mix}} < 0, \\; \\Delta S_{\\text{mix}} > 0$',
      '$\\Delta H_{\\text{mix}} < 0, \\; \\Delta V_{\\text{mix}} < 0$',
      '$\\Delta G_{\\text{mix}} = 0, \\; \\Delta S_{\\text{mix}} < 0$',
      'Both (1) and (2)'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For negative deviation: stronger A-B interactions result in an exothermic mixing process ($\\Delta H_{\\text{mix}} < 0$) and contraction in total volume ($\\Delta V_{\\text{mix}} < 0$). Furthermore, since dissolution is a spontaneous mixing process, $\\Delta G_{\\text{mix}} < 0$ and $\\Delta S_{\\text{mix}} > 0$. Hence both (1) and (2) are true."
  },
  // Q56
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Examples of Negative Deviation',
    question_type: 'mcq',
    question_text: "Which of the following binary solutions exhibits negative deviations from Raoult's law?",
    options: [
      'Acetone + Ethanol',
      'Pyridine + Acetic acid',
      'Acetone + Carbon disulphide',
      'Cyclohexane + Ethanol'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Pyridine is a Lewis base and acetic acid is a proton donor. Upon mixing, strong intermolecular hydrogen bonding and acid-base interaction occur between pyridine and acetic acid molecules, leading to negative deviation from Raoult's law."
  },
  // Q57
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Boiling Point of Maximum Azeotrope',
    question_type: 'mcq',
    question_text: "The boiling point of an azeotropic mixture of $\\text{HNO}_3$ and $\\text{H}_2\\text{O}$ is (if B.P of $\\text{HNO}_3$ is $x$ and B.P of $\\text{H}_2\\text{O}$ is $y$):",
    options: ['Greater than $y$', '$\\frac{x + y}{2}$', 'Less than $x$', '$\\frac{y + x}{3}$'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\text{HNO}_3$ and $\\text{H}_2\\text{O}$ show negative deviation and form a maximum boiling azeotrope. A maximum boiling azeotrope boils at a temperature higher than the boiling points of both individual pure components. Since water boils at $y = 100^\\circ\\text{C}$ and nitric acid boils at $x = 86^\\circ\\text{C}$ while the azeotrope boils at $120.5^\\circ\\text{C}$, the B.P. is greater than $y$."
  },
  // Q58
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Polymer Formula from Freezing Point',
    question_type: 'mcq',
    question_text: "An element 'X' exists as a polymer $X_n$. When $3.2\\,\\text{g}$ of X is dissolved in $200\\,\\text{g}$ of a solvent ($K_f = 5\\,\\text{K kg mol}^{-1}$), the freezing point is lowered by $0.125^\\circ\\text{C}$. The molecular formula of $X_n$ is (Atomic wt of X = 80):",
    options: ['$X_2$', '$X_4$', '$X_8$', '$X_6$'],
    correct_index: 2,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "Using $\\Delta T_f = K_f \\times \\frac{w / M}{W_{\\text{solvent}}(\\text{kg})}$: $0.125 = 5 \\times \\frac{3.2 / M}{0.2} = \\frac{16}{0.2 M} = \\frac{80}{M} \\implies M = \\frac{80}{0.125} = 640\\,\\text{g/mol}$. The formula is $X_n$, so $n \\times 80 = 640 \\implies n = 8$. The molecular formula is $X_8$."
  },
  // Q59
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Isotonic Molecular Mass Determination',
    question_type: 'mcq',
    question_text: "A $5.25\\%\\,\\text{w/v}$ solution of an unknown solute is isotonic with a $1.5\\%\\,\\text{w/v}$ solution of urea at constant temperature and in the same solvent. Assuming equal densities of both solutions, calculate the molecular mass of the unknown solute.",
    options: ['90', '105', '115', '210'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Isotonic solutions have equal osmotic pressures, and for non-electrolytes at the same temperature, equal molar concentrations: $C_1 = C_2 \\implies \\frac{5.25\\,\\text{g} / M_{\\text{unknown}}}{100\\,\\text{mL}} = \\frac{1.5\\,\\text{g} / 60}{100\\,\\text{mL}} \\implies \\frac{5.25}{M_{\\text{unknown}}} = \\frac{1.5}{60} \\implies M_{\\text{unknown}} = \\frac{5.25 \\times 60}{1.5} = 210\\,\\text{g/mol}$."
  },
  // Q60
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Principles Statements',
    question_type: 'mcq',
    question_text: "Which one is/are correct?\nStatement I : Molar mass of polymer is determined by osmotic pressure method.\nStatement II : Mixture of $\\text{CCl}_4 + \\text{Toluene}$ is a positive deviation solution.\nStatement III : During formation of positive deviation solution heat is absorbed.\nStatement IV : Upon addition of $\\text{I}_2(s)$ in aqueous $\\text{KI}$ solution, B.P. increases.",
    options: ['I, II, IV only', 'II, III', 'I, II, III only', 'I, II, III, IV'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Statement I is correct: Osmotic pressure produces measurable values even at very low molar concentrations of macromolecules/polymers. Statement II is correct: $\\text{CCl}_4 + \\text{toluene}$ shows positive deviation. Statement III is correct: Positive deviation involves endothermic mixing ($\\Delta H_{\\text{mix}} > 0$). Statement IV is incorrect because $\\text{KI} + \\text{I}_2 \\rightleftharpoons \\text{KI}_3$ forms the triiodide ion without increasing the net count of particles. Thus, statements I, II, and III only are correct."
  }
];
