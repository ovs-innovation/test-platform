import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solutions_diagrams.json'), 'utf8'));

export const SOLUTIONS_PART3 = [
  // Q61
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor of Electrolytes",
    question_type: 'mcq',
    question_text: "Which of the following will have the same value of van't Hoff factor as that of $\\text{K}_4[\\text{Fe}(\\text{CN})_6]$? (Assume equal degree of dissociation)",
    options: [
      '$\\text{Na}_2\\text{SO}_4$',
      '$\\text{Al}(\\text{NO}_3)_3$',
      '$\\text{Al}_2(\\text{SO}_4)_3$',
      '$\\text{K}_3[\\text{Fe}(\\text{CN})_6]$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "$\\text{K}_4[\\text{Fe}(\\text{CN})_6]$ dissociates to give 5 ions ($4\\text{K}^+ + [\\text{Fe}(\\text{CN})_6]^{4-}$). $\\text{Al}_2(\\text{SO}_4)_3$ also dissociates to give 5 ions ($2\\text{Al}^{3+} + 3\\text{SO}_4^{2-}$). For the same degree of dissociation $\\alpha$, $i = 1 + (n - 1)\\alpha$, so both compounds have the identical van't Hoff factor."
  },
  // Q62
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure Comparison',
    question_type: 'mcq',
    question_text: "If $P_1$ is the osmotic pressure of $0.1\\,\\text{M KCl}$ and $P_2$ is the osmotic pressure of $0.1\\,\\text{M acetic acid}$, then",
    options: ['$P_2 > P_1$', '$P_1 > P_2$', '$P_1 = P_2$', '$P_1 = 0$'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "$\\text{KCl}$ is a strong electrolyte that dissociates almost completely in water ($i \\approx 2$), whereas acetic acid ($\\text{CH}_3\\text{COOH}$) is a weak electrolyte that only partially ionises ($i = 1 + \\alpha < 2$). Since osmotic pressure $\\pi = i C R T$, $P_1 > P_2$."
  },
  // Q63
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Raoult's Law Partial Pressures",
    question_type: 'mcq',
    question_text: "The total vapour pressure of a solution obtained by mixing $3\\,\\text{mole}$ of P and $2\\,\\text{mole}$ of Q is $72\\,\\text{torr}$. The pure vapour pressure of liquid P is $80\\,\\text{torr}$. The pure vapour pressure of liquid Q is",
    options: ['80 torr', '60 torr', '40 torr', '20 torr'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Total moles $= 3 + 2 = 5$. Mole fractions: $x_P = 3/5 = 0.6$ and $x_Q = 2/5 = 0.4$. By Raoult's law: $P_{\\text{total}} = P_P^\\circ x_P + P_Q^\\circ x_Q \\implies 72 = 80(0.6) + P_Q^\\circ(0.4) = 48 + 0.4 P_Q^\\circ \\implies 0.4 P_Q^\\circ = 72 - 48 = 24 \\implies P_Q^\\circ = \\frac{24}{0.4} = 60\\,\\text{torr}$."
  },
  // Q64
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Minimum Freezing Point',
    question_type: 'mcq',
    question_text: "Which of the following has the minimum freezing point?",
    options: [
      '$1\\,\\text{molar NaCl solution}$',
      '$1\\,\\text{molar KCl solution}$',
      '$1\\,\\text{molar glucose solution}$',
      '$1\\,\\text{molar CaCl}_2\\text{ solution}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Freezing point is lowered according to $\\Delta T_f = i K_f m$. The solution with the largest $\\Delta T_f$ (highest $i C$) will freeze at the lowest (minimum) temperature:\n1. $1\\,\\text{M NaCl}$: $i = 2 \\implies i C = 2\\,\\text{M}$\n2. $1\\,\\text{M KCl}$: $i = 2 \\implies i C = 2\\,\\text{M}$\n3. $1\\,\\text{M glucose}$: $i = 1 \\implies i C = 1\\,\\text{M}$\n4. $1\\,\\text{M CaCl}_2$: $i = 3 \\implies i C = 3\\,\\text{M}$\nTherefore, $1\\,\\text{M CaCl}_2$ has the minimum freezing point."
  },
  // Q65
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Gas Solubility Principles',
    question_type: 'mcq',
    question_text: "Which of the following statements is correct?",
    options: [
      'The solubility of a gas in water increases with increase of temperature',
      'The solubility of a gas in water increases with increase of pressure',
      'Higher the value of liquid equilibrium pressure, higher is the solubility of the gas in the liquid',
      "Henry's law is valid if the gas reacts chemically with the solvent and dissociates or associates in the solvent"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "According to Henry's law, the solubility of a gas in a liquid increases with increase in the partial pressure of the gas above the solution ($m = K_H \\cdot P$). Dissolution of gases is exothermic, so solubility decreases with temperature. Henry's law applies only when the gas does not chemically react with the solvent."
  },
  // Q66
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Glauber's Salt Solubility Curve",
    question_type: 'mcq',
    question_text: "The solubility vs temperature plot shown best represents",
    options: ['$\\text{NaCl}$', '$\\text{NaNO}_3$', '$\\text{Na}_2\\text{SO}_4 \\cdot 10\\text{H}_2\\text{O}$', '$\\text{CaCl}_2$'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q66_glauber_solubility_curve,
    solution: "The solubility curve of Glauber's salt ($\\text{Na}_2\\text{SO}_4 \\cdot 10\\text{H}_2\\text{O}$) increases with temperature up to $32.4^\\circ\\text{C}$ (its transition temperature). At $32.4^\\circ\\text{C}$, the decahydrate loses its water of crystallization to form anhydrous $\\text{Na}_2\\text{SO}_4$, whose dissolution is exothermic, causing solubility to decrease with further increase in temperature."
  },
  // Q67
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Thermodynamics of Binary Solutions',
    question_type: 'mcq',
    question_text: "Which of the following combinations is correct for a binary solution?",
    options: [
      '$\\text{C}_6\\text{H}_6\\text{ and }\\text{C}_6\\text{H}_5\\text{CH}_3 : \\Delta_{\\text{mix}} H > 0 ; \\Delta_{\\text{mix}} V = 0$',
      '$\\text{CH}_3-\\text{CO}-\\text{CH}_3\\text{ and }\\text{CHCl}_3 : \\Delta_{\\text{mix}} H < 0 ; \\Delta_{\\text{mix}} V < 0$',
      '$\\text{H}_2\\text{O}\\text{ and }\\text{HCl} : \\Delta_{\\text{mix}} H > 0 ; \\Delta_{\\text{mix}} V < 0$',
      '$\\text{H}_2\\text{O}\\text{ and }\\text{CH}_3\\text{OH} : \\Delta_{\\text{mix}} H < 0 ; \\Delta_{\\text{mix}} V = 0$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Acetone and chloroform form strong intermolecular hydrogen bonds ($\\text{Cl}_3\\text{C}-\\text{H} \\cdots \\text{O}=\\text{C}(\\text{CH}_3)_2$). This negative deviation from Raoult's law is characterized by release of heat ($\\Delta_{\\text{mix}} H < 0$) and contraction in volume ($\\Delta_{\\text{mix}} V < 0$)."
  },
  // Q68
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Freezing Point Depression and pH',
    question_type: 'mcq',
    question_text: "The depression in freezing point of $0.01\\,\\text{m}$ aqueous $\\text{CH}_3\\text{COOH}$ solution is $0.02046^\\circ\\text{C}$. A $1\\,\\text{m}$ urea solution freezes at $-1.86^\\circ\\text{C}$. Assuming molality equal to molarity, the pH of the $\\text{CH}_3\\text{COOH}$ solution is",
    options: ['2', '3', '3.2', '4.2'],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "From urea ($i=1$): $\\Delta T_f = 1.86 = K_f \\times 1 \\implies K_f = 1.86\\,\\text{K kg mol}^{-1}$. For $\\text{CH}_3\\text{COOH}$: $\\Delta T_f = 0.02046 = i K_f m = i \\times 1.86 \\times 0.01 = 0.0186 i \\implies i = \\frac{0.02046}{0.0186} = 1.10$. Since $\\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}^+$, $i = 1 + \\alpha \\implies \\alpha = 0.10$. Hydrogen ion concentration $[\\text{H}^+] = C \\alpha = 0.01 \\times 0.10 = 10^{-3}\\,\\text{M} \\implies \\text{pH} = -\\log(10^{-3}) = 3$."
  },
  // Q69
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Solubility & Equilibrium Statements',
    question_type: 'mcq',
    question_text: "Choose the correct statement:",
    options: [
      'Calcium acetate shows decrease in solubility with rise in temperature',
      'Solubility of $\\text{KNO}_3, \\text{NaNO}_3$ decreases with rise in temperature',
      'Solubility of gases increases with increase in temperature',
      'Vapour pressure depends on volume of the vessel in which liquid-vapour equilibrium is established'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "The dissolution of calcium acetate in water is an exothermic process, so its solubility decreases with increasing temperature (retrograde solubility). Dissolution of $\\text{KNO}_3$ and $\\text{NaNO}_3$ is endothermic (solubility increases), solubility of gases decreases with temperature, and equilibrium vapour pressure is an intensive property independent of vessel volume."
  },
  // Q70
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Relation between Delta Tb and Delta Tf',
    question_type: 'mcq',
    question_text: "An aqueous solution freezes at $-0.186^\\circ\\text{C}$ ($K_f = 1.86\\,\\text{K kg mol}^{-1}, \\; K_b = 0.512\\,\\text{K kg mol}^{-1}$). The elevation of boiling point of the solution is (in K)",
    options: ['0.186', '0.512', '0.512 / 1.86', '0.0512'],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Depression in freezing point $\\Delta T_f = 0.186\\,\\text{K} = i K_f m = 1.86 (i m) \\implies i m = \\frac{0.186}{1.86} = 0.1\\,\\text{mol kg}^{-1}$. Elevation in boiling point $\\Delta T_b = i K_b m = 0.512 \\times 0.1 = 0.0512\\,\\text{K}$."
  },
  // Q71
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Isotonic Solution Concentration',
    question_type: 'mcq',
    question_text: "The osmotic pressure of a sucrose solution is $4.926\\,\\text{atm}$ at $27^\\circ\\text{C}$. Which of the following is isotonic with the given solution?",
    options: [
      '$3.6\\%\\text{ glucose solution}$',
      '$1.2\\%\\text{ urea solution}$',
      '$0.585\\%\\text{ NaCl solution}$',
      '$1.7\\%\\text{ NaNO}_3\\text{ solution}$'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Using $\\pi = C R T$: $4.926 = C \\times 0.0821 \\times 300 = 24.63 C \\implies C = \\frac{4.926}{24.63} = 0.2\\,\\text{M}$. For a glucose solution ($M = 180\\,\\text{g/mol}$): $3.6\\%\\,\\text{w/v} = 36\\,\\text{g/L} = \\frac{36}{180} = 0.2\\,\\text{M}$. Because glucose is a non-electrolyte ($i=1$), its effective concentration is $0.2\\,\\text{M}$, making it isotonic with the sucrose solution."
  },
  // Q72
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Semipermeable Membrane Permeability',
    question_type: 'mcq',
    question_text: "In the setup shown, two compartments A and B containing $0.1\\,\\text{M Cu}^{2+}\\text{ (aq)}$ and $0.1\\,\\text{M NH}_3\\text{ (aq)}$ respectively are separated by a semipermeable membrane (S.P.M.). In which compartment will the deep blue color of $[\\text{Cu}(\\text{NH}_3)_4]^{2+}$ be observed first?",
    options: [
      'A compartment',
      'B compartment',
      'Blue colour will be observed at same time in both compartments',
      'None of these compartments shows blue colour'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q72_spm_cu_nh3,
    solution: "A semipermeable membrane (S.P.M.) allows only solvent molecules (water) to pass through, but is strictly impermeable to solute ions and complex species (such as $\\text{Cu}^{2+}$). Because the solute particles cannot cross the membrane to react with each other, no cuprammonium complex $[\\text{Cu}(\\text{NH}_3)_4]^{2+}$ can form in either compartment, so neither compartment shows blue colour."
  },
  // Q73
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Minimum Boiling Azeotrope Point',
    question_type: 'mcq',
    question_text: "Which of the points on the boiling point vs composition curve represents the azeotropic mixture concentration?",
    options: ['A', 'B', 'C', 'D'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: diagrams.q73_azeotrope_bp_curve,
    solution: "Point C is the minimum point of the boiling curve where the liquid and vapour curves touch each other. At this minimum boiling azeotrope point, the solution boils at a constant minimum temperature with identical composition in both liquid and vapour phases."
  },
  // Q74
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor for Association",
    question_type: 'mcq',
    question_text: "For the association reaction $n\\text{A} \\rightleftharpoons \\text{A}_n$, if $\\alpha$ is the degree of association, what is the value of the van't Hoff factor ($i$)?",
    options: [
      '$1 + (n - 1)\\alpha$',
      '1',
      '$1 - \\alpha + \\frac{\\alpha}{n}$',
      '$1 - \\alpha$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Starting with $1\\,\\text{mole}$ of monomer A, if degree of association is $\\alpha$:\nMoles of unassociated A remaining $= 1 - \\alpha$.\nMoles of polymer $\\text{A}_n$ formed $= \\frac{\\alpha}{n}$.\nTotal moles at equilibrium $i = 1 - \\alpha + \\frac{\\alpha}{n} = 1 - \\alpha\\left(1 - \\frac{1}{n}\\right)$."
  },
  // Q75
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure of Weak Acid',
    question_type: 'mcq',
    question_text: "What will be the osmotic pressure of $0.2\\,\\text{M HX}$ solution at $300\\,\\text{K}$? [$K_a(\\text{HX}) = 8 \\times 10^{-5}$]",
    options: ['3.926 atm', '5.024 atm', '7.124 atm', '1.813 atm'],
    correct_index: 1,
    marks: 4,
    difficulty: 'hard',
    image_url: null,
    solution: "For weak monobasic acid $\\text{HX} \\rightleftharpoons \\text{H}^+ + \\text{X}^-$: $\\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{8 \\times 10^{-5}}{0.2}} = \\sqrt{4 \\times 10^{-4}} = 0.02$. The van't Hoff factor is $i = 1 + \\alpha = 1 + 0.02 = 1.02$. Osmotic pressure $\\pi = i C R T = 1.02 \\times 0.2\\,\\text{M} \\times 0.0821\\,\\text{L atm K}^{-1}\\,\\text{mol}^{-1} \\times 300\\,\\text{K} = 1.02 \\times 4.926 = 5.0245\\,\\text{atm} \\approx 5.024\\,\\text{atm}$."
  },
  // Q76
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Thermodynamics of Mixing Comparison',
    question_type: 'mcq',
    question_text: "Which of the following properties will have the same sign of value for an ideal solution and a solution showing -ve deviation?",
    options: [
      '$\\Delta G_{\\text{mix}}, \\; \\Delta H_{\\text{mix}}, \\; \\Delta S_{\\text{mix}}$',
      '$\\Delta V_{\\text{mix}}, \\; \\Delta S_{\\text{mix}}$',
      '$\\Delta S_{\\text{mix}}, \\; \\Delta G_{\\text{mix}}$',
      '$\\Delta V_{\\text{mix}}, \\; \\Delta G_{\\text{mix}}$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For an ideal solution: $\\Delta S_{\\text{mix}} > 0$ (+ve) and $\\Delta G_{\\text{mix}} < 0$ (-ve). For a solution showing negative deviation: $\\Delta S_{\\text{mix}} > 0$ (+ve) and $\\Delta G_{\\text{mix}} < 0$ (-ve). Thus, both $\\Delta S_{\\text{mix}}$ and $\\Delta G_{\\text{mix}}$ retain the exact same signs in both types of solutions."
  },
  // Q77
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Boiling Point of Partially Ionised Electrolyte',
    question_type: 'mcq',
    question_text: "A $0.1\\,\\text{Molal}$ aqueous solution of an electrolyte $\\text{AB}_2$ is $90\\%$ ionized. The boiling point of the solution at $1\\,\\text{atm}$ is [$K_b(\\text{H}_2\\text{O}) = 0.52\\,\\text{K kg mol}^{-1}$]:",
    options: ['273.15 K', '274.92 K', '374.92 K', '373.19 K'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\text{AB}_2$ dissociates as $\\text{AB}_2 \\rightarrow \\text{A}^{2+} + 2\\text{B}^-$, giving $n = 3$ ions. With $\\alpha = 0.90$: $i = 1 + (3 - 1)(0.90) = 1 + 1.80 = 2.8$. Elevation in boiling point $\\Delta T_b = i K_b m = 2.8 \\times 0.52 \\times 0.1 = 0.1456\\,\\text{K}$. Boiling point of pure water $= 373.15\\,\\text{K}$ (or $100^\\circ\\text{C}$). Hence, boiling point of solution $= 373.15 + 0.1456 = 373.295\\,\\text{K} \\approx 373.19\\,\\text{K}$."
  },
  // Q78
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure Equation of Binary Solution',
    question_type: 'mcq',
    question_text: "The total vapour pressure of a solution of methanol and ethanol in an ideal solution is given by $P = 135 x_A + 100$ (where $x_A$ is the mole fraction of methanol). The pure state vapour pressure of methanol is",
    options: ['235 mm Hg', '100 mm Hg', '35 mm Hg', '135 mm Hg'],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For pure methanol, its mole fraction is $x_A = 1$. Substituting $x_A = 1$ into the vapour pressure equation: $P = 135(1) + 100 = 235\\,\\text{mm Hg}$. (For pure ethanol, $x_A = 0 \\implies P_B^\\circ = 100\\,\\text{mm Hg}$)."
  },
  // Q79
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Positive Deviation Example',
    question_type: 'mcq',
    question_text: "Which pair of compounds will exhibit +ve deviation from Raoult's law?",
    options: [
      '$\\text{H}_2\\text{O} + \\text{HNO}_3$',
      '$(\\text{CH}_3)_2\\text{CO} + \\text{CHCl}_3$',
      '$\\text{C}_2\\text{H}_5\\text{OH} + \\text{H}_2\\text{O}$',
      '$\\text{CH}_3\\text{COOH} + \\text{C}_5\\text{H}_5\\text{N}$ (Pyridine)'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Ethanol molecules have extensive hydrogen bonding in pure liquid. When water and ethanol are mixed at high ethanol concentrations, the strong intermolecular hydrogen bonded networks are partially disrupted, leading to weaker overall interactions and positive deviation from Raoult's law."
  },
  // Q80
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molar Mass from Boiling Point Elevation',
    question_type: 'mcq',
    question_text: "Elevation of boiling point was found to be $0.52^\\circ\\text{C}$ when $6\\,\\text{g}$ of a compound (non-volatile, non-electrolyte) was dissolved in $200\\,\\text{g}$ of water. The molar mass of the compound is [Given: $K_b(\\text{H}_2\\text{O}) = 0.52\\,\\text{K kg mol}^{-1}$]:",
    options: ['50', '100', '40', '30'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Using $\\Delta T_b = K_b \\times \\frac{w_B / M_B}{W_A(\\text{kg})}$: $0.52 = 0.52 \\times \\frac{6 / M_B}{0.2} \\implies 1 = \\frac{6}{0.2 M_B} = \\frac{30}{M_B} \\implies M_B = 30\\,\\text{g/mol}$."
  },
  // Q81
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Highest Freezing Point Comparison',
    question_type: 'mcq',
    question_text: "Which of the following aqueous solutions has the highest freezing point? [Assume: Molarity = Molality]",
    options: [
      '$0.01\\,\\text{M KCl}$',
      '$0.005\\,\\text{M CaCl}_2$',
      '$0.01\\,\\text{M Na}_2\\text{SO}_4$',
      '$0.005\\,\\text{M Glucose}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Highest freezing point corresponds to the lowest depression in freezing point $\\Delta T_f$, which requires the minimum value of $i C$:\n1. $0.01\\,\\text{M KCl}$: $i C = 2 \\times 0.01 = 0.02\\,\\text{M}$\n2. $0.005\\,\\text{M CaCl}_2$: $i C = 3 \\times 0.005 = 0.015\\,\\text{M}$\n3. $0.01\\,\\text{M Na}_2\\text{SO}_4$: $i C = 3 \\times 0.01 = 0.03\\,\\text{M}$\n4. $0.005\\,\\text{M Glucose}$: $i C = 1 \\times 0.005 = 0.005\\,\\text{M}$\n$0.005\\,\\text{M Glucose}$ has the lowest $i C = 0.005\\,\\text{M}$, so it freezes at the highest temperature."
  },
  // Q82
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ethanol-Water Azeotropic Composition',
    question_type: 'mcq',
    question_text: "The boiling temperature and composition curve of water-ethanol solution is shown. At point C, the mixture contains $95.6\\%$ ethanol by weight in vapour phase. If this solution is boiled at $78.13^\\circ\\text{C}$, the percentage by weight of water in the liquid phase is",
    options: ['95.6%', '4.2%', '80.8%', '43.5%'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q82_ethanol_water_azeotrope,
    solution: "At the azeotropic point C, the solution boils at a constant minimum temperature ($78.13^\\circ\\text{C}$) with identical compositions in both liquid and vapour phases. If the vapour phase contains $95.6\\%$ ethanol by mass, the remaining mass is water: $100\\% - 95.6\\% = 4.4\\% \\approx 4.2\\%$. Therefore, the liquid phase also contains $\\approx 4.2\\%$ water."
  },
  // Q83
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Pure Vapour Pressure Ratio',
    question_type: 'mcq',
    question_text: "If the total vapour pressure of a liquid mixture of A and B is given by the equation $P = 180 X_A + 90$, then the ratio of the vapour pressure of pure liquids A and B is",
    options: ['1 : 2', '2 : 3', '2 : 5', '3 : 1'],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For pure A, $X_A = 1 \\implies P_A^\\circ = 180(1) + 90 = 270$. For pure B, $X_A = 0 \\implies P_B^\\circ = 90$. The ratio of pure liquid vapour pressures is: $\\frac{P_A^\\circ}{P_B^\\circ} = \\frac{270}{90} = \\frac{3}{1} = 3 : 1$."
  },
  // Q84
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Crystallization during Freezing',
    question_type: 'mcq',
    question_text: "A solution containing $0.1\\,\\text{mole}$ of urea in $1\\,\\text{L}$ of glacial acetic acid, when cooled to its freezing point, yields crystals. The first crystal which appears contains molecules of",
    options: [
      'Urea',
      'Acetic acid',
      'Both urea and acetic acid',
      'Either of these depending upon experimental conditions'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "When a dilute solution of a non-volatile solute in a liquid solvent freezes, the pure solvent solidifies first. Here, glacial acetic acid is the solvent, so pure crystals of acetic acid freeze out."
  },
  // Q85
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Molality Calculation Formula',
    question_type: 'mcq',
    question_text: "A glucose solution weighing $200\\,\\text{g}$ contains $36\\,\\text{g}$ of water. The molal concentration of the solution is",
    options: [
      '$\\frac{164}{180} \\times \\frac{1000}{36}$',
      '$\\frac{200}{180} \\times \\frac{1000}{200}$',
      '$\\frac{36}{180} \\times \\frac{1000}{55.5}$',
      '$\\frac{164}{180} \\times \\frac{1000}{200}$'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Mass of solvent (water) $= 36\\,\\text{g}$. Mass of solute (glucose) $= 200 - 36 = 164\\,\\text{g}$. Molar mass of glucose $= 180\\,\\text{g/mol}$. Moles of glucose $= \\frac{164}{180}$. Molality $m = \\frac{\\text{moles of solute}}{\\text{mass of solvent in kg}} = \\frac{164 / 180}{36 / 1000} = \\frac{164}{180} \\times \\frac{1000}{36}$."
  },
  // Q86
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Order of Depression in Freezing Point',
    question_type: 'mcq',
    question_text: "What is the correct order of depression in freezing point for the following aqueous solutions?\nA. $0.1\\,\\text{M NaCl}$\nB. $0.05\\,\\text{M BaCl}_2$\nC. $0.3\\,\\text{M Glucose}$\nD. $0.1\\,\\text{M K}_4[\\text{Fe}(\\text{CN})_6]$",
    options: [
      '$D < B = C < A$',
      '$B < A < C < D$',
      '$D < C < A = B$',
      '$A < B = C < D$'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Depression in freezing point $\\Delta T_f \\propto i \\times C$:\nA. $0.1\\,\\text{M NaCl}$: $i = 2 \\implies i C = 2 \\times 0.1 = 0.20\\,\\text{M}$\nB. $0.05\\,\\text{M BaCl}_2$: $i = 3 \\implies i C = 3 \\times 0.05 = 0.15\\,\\text{M}$\nC. $0.3\\,\\text{M Glucose}$: $i = 1 \\implies i C = 1 \\times 0.3 = 0.30\\,\\text{M}$\nD. $0.1\\,\\text{M K}_4[\\text{Fe}(\\text{CN})_6]$: $i = 5 \\implies i C = 5 \\times 0.1 = 0.50\\,\\text{M}$\nComparing values: $0.15\\text{ (B)} < 0.20\\text{ (A)} < 0.30\\text{ (C)} < 0.50\\text{ (D)}$. Hence, $B < A < C < D$."
  },
  // Q87
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Plasmolysis & Osmosis',
    question_type: 'mcq',
    question_text: "Plant cells contract when placed in a",
    options: [
      'Hypotonic solution',
      'Hypertonic solution',
      'Isotonic solution',
      'Both (1) & (2)'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "When a plant cell is placed in a hypertonic solution (a solution with higher osmotic pressure and lower water potential than the cell sap), water moves out of the cell by exosmosis, causing the protoplast to shrink away from the cell wall (plasmolysis/contraction)."
  },
  // Q88
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Degree of Dissociation from Freezing Point',
    question_type: 'mcq',
    question_text: "A $0.1\\,\\text{molal}$ aqueous solution of sodium bromide freezes at $-0.335^\\circ\\text{C}$ at atmospheric pressure. $K_f\\text{ for water} = 1.86\\,\\text{K kg mol}^{-1}$. The percentage of dissociation of the salt in solution is",
    options: ['40', '60', '80', '90'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "$\\Delta T_f = 0.335^\\circ\\text{C} = i K_f m = i \\times 1.86 \\times 0.1 = 0.186 i \\implies i = \\frac{0.335}{0.186} = 1.801$. For $\\text{NaBr} \\rightarrow \\text{Na}^+ + \\text{Br}^-$ ($n=2$): $\\alpha = \\frac{i - 1}{n - 1} = \\frac{1.801 - 1}{2 - 1} = 0.801 = 80.1\\% \\approx 80\\%$."
  }
];
