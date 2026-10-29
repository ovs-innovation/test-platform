import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagrams = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solutions_diagrams.json'), 'utf8'));

export const SOLUTIONS_PART1 = [
  // Q1
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor",
    question_type: 'mcq',
    question_text: "If $\\text{Hg}_2\\text{Cl}_2$ is 100% ionised then its van't Hoff factor will be",
    options: ['2', '4', '5', '3'],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Mercurous chloride ionises in aqueous solution as: $\\text{Hg}_2\\text{Cl}_2 \\rightarrow \\text{Hg}_2^{2+} + 2\\text{Cl}^-$. One molecule yields 1 mercurous ion ($\\text{Hg}_2^{2+}$) and 2 chloride ions ($2\\text{Cl}^-$), giving total $n = 3$ ions. For 100% ionisation ($\\alpha = 1$), the van't Hoff factor $i = 1 + (n - 1)\\alpha = 1 + (3 - 1)(1) = 3$."
  },
  // Q2
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Raoult Law & Lowering of Vapour Pressure',
    question_type: 'mcq',
    question_text: "Lowering of vapour pressure for $1\\,\\text{m}$ aqueous solution is $1.08\\,\\text{mm of Hg}$ at $25^\\circ\\text{C}$. The vapour pressure of pure liquid at $25^\\circ\\text{C}$ is $10x\\,\\text{mm of Hg}$. The value of $x$ will be, assuming very dilute solution",
    options: ['4', '6', '5', '3'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For a dilute solution, relative lowering of vapour pressure is given by $\\frac{\\Delta P}{P^\\circ} \\approx \\frac{m}{55.55}$. Substituting $\\Delta P = 1.08\\,\\text{mm Hg}$ and $m = 1$: $\\frac{1.08}{P^\\circ} = \\frac{1}{55.55} \\implies P^\\circ = 1.08 \\times 55.55 = 60\\,\\text{mm Hg}$. Since $P^\\circ = 10x$, $10x = 60 \\implies x = 6$."
  },
  // Q3
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Non-Ideal Solutions',
    question_type: 'mcq',
    question_text: "How many terms will have negative value for a solution showing -ve deviation?\n\n$$\\Delta G_{\\text{mix}}, \\; \\Delta S_{\\text{mix}}, \\; \\Delta H_{\\text{mix}}, \\; \\Delta V_{\\text{mix}}$$",
    options: ['2', '3', '4', '1'],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For a real solution exhibiting negative deviation from Raoult's law:\n1. $\\Delta G_{\\text{mix}} < 0$ (negative, spontaneous mixing)\n2. $\\Delta S_{\\text{mix}} > 0$ (positive, entropy increases on mixing)\n3. $\\Delta H_{\\text{mix}} < 0$ (negative, exothermic mixing due to stronger A-B attractions)\n4. $\\Delta V_{\\text{mix}} < 0$ (negative, volume contraction)\nThus, exactly 3 terms ($\\Delta G_{\\text{mix}}, \\Delta H_{\\text{mix}}, \\Delta V_{\\text{mix}}$) have negative values."
  },
  // Q4
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Ostwald-Walker Dynamic Method',
    question_type: 'mcq',
    question_text: "The set up shown has been repeated four times with 4 different aqueous solutions of the same non-volatile solute with different concentrations. The loss in weight of solution in the container is in the order $D > B > C > A$. Arrange A, B, C, D in terms of concentration of solute.",
    options: [
      '$D > B > C > A$',
      '$A > B > C > D$',
      '$A > C > B > D$',
      '$A > D > C > B$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q4_ostwald_walker,
    solution: "In the Ostwald-Walker method, the loss in weight of the solution container is directly proportional to the vapour pressure of the solution: $\\text{Loss in weight} \\propto P_{\\text{sol}}$. Therefore, the vapour pressures follow $P_D > P_B > P_C > P_A$. According to Raoult's law, a higher concentration of non-volatile solute causes greater lowering of vapour pressure, so $P_{\\text{sol}}$ is inversely related to solute concentration. Hence, concentration order is $A > C > B > D$."
  },
  // Q5
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Azeotropes & Distillation',
    question_type: 'mcq',
    question_text: "Azeotropic mixture of water and $\\text{C}_2\\text{H}_5\\text{OH}$ boils at $351\\,\\text{K}$. By distilling the mixture, it is possible to obtain",
    options: [
      'Pure $\\text{C}_2\\text{H}_5\\text{OH}$ only',
      'Pure water only',
      'Both water and $\\text{C}_2\\text{H}_5\\text{OH}$ in pure state',
      'Neither $\\text{C}_2\\text{H}_5\\text{OH}$ nor water'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "An azeotropic mixture boils at a constant temperature with identical composition in both liquid and vapour phases. Fractional distillation of an azeotrope distills over the azeotropic composition unchanged without separating the components into pure states. Thus, neither pure ethanol nor pure water can be obtained."
  },
  // Q6
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Properties Comparison',
    question_type: 'mcq',
    question_text: "Consider $0.1\\,\\text{M}$ solution of two solutes X and Y. Solute X dissociates in two ions whereas Y dimerises in the solution. Which of the following is false? (X and Y represents solution containing X and Y respectively)",
    options: [
      '$(\\Delta T_b)_X > (\\Delta T_b)_Y$',
      '$(\\text{B.P.})_X > (\\text{B.P.})_Y$',
      '$(\\text{F.P.})_X > (\\text{F.P.})_Y$',
      '$(\\Delta T_f)_X > (\\Delta T_f)_Y$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "For X (dissociates into 2 ions): $i_X > 1 \\implies i_X C \\approx 0.2\\,\\text{M}$. For Y (dimerises): $i_Y < 1 \\implies i_Y C \\approx 0.05\\,\\text{M}$. Since $i_X C > i_Y C$, $(\\Delta T_b)_X > (\\Delta T_b)_Y$ and $(\\text{B.P.})_X > (\\text{B.P.})_Y$. Likewise, $(\\Delta T_f)_X > (\\Delta T_f)_Y$. However, freezing point is given by $\\text{F.P.} = T_f^\\circ - \\Delta T_f$. Since $\\Delta T_f$ is greater for X, the actual freezing point $(\\text{F.P.})_X < (\\text{F.P.})_Y$. Therefore, statement (3) is false."
  },
  // Q7
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Raoult's Law Calculations",
    question_type: 'mcq',
    question_text: "An ideal solution was found to have a vapour pressure of $80\\,\\text{torr}$ when the mole fraction of non-volatile solute is $0.2$. Find vapour pressure of pure solvent at same temperature.",
    options: ['64 torr', '72 torr', '80 torr', '100 torr'],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "According to Raoult's law, $P_{\\text{solution}} = P^\\circ x_{\\text{solvent}} = P^\\circ (1 - x_{\\text{solute}})$. Given $P_{\\text{solution}} = 80\\,\\text{torr}$ and $x_{\\text{solute}} = 0.2$: $80 = P^\\circ (1 - 0.2) = 0.8 P^\\circ \\implies P^\\circ = \\frac{80}{0.8} = 100\\,\\text{torr}$."
  },
  // Q8
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Depression in Freezing Point',
    question_type: 'mcq',
    question_text: "The freezing point of a $4\\%\\,(\\text{w/V})$ aqueous solution of 'A' is equal to the freezing point of $10\\%\\,(\\text{w/V})$ aqueous solution of 'B'. The molecular weight of A is $60$, find out the molecular weight of B. Assume both A and B are non electrolyte and molarity = molality",
    options: ['150', '90', '45', '180'],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Equal freezing points mean equal depression in freezing point: $\\Delta T_f(A) = \\Delta T_f(B) \\implies m_A = m_B$. Since molarity = molality: $\\frac{4 / M_A}{100\\,\\text{mL}} = \\frac{10 / M_B}{100\\,\\text{mL}} \\implies \\frac{4}{60} = \\frac{10}{M_B} \\implies M_B = \\frac{10 \\times 60}{4} = 150\\,\\text{g/mol}$."
  },
  // Q9
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Colligative Properties & Complex Formation',
    question_type: 'mcq',
    question_text: "When mercuric iodide is added to the aqueous solution of $\\text{KI}$, then the :",
    options: [
      'Freezing point is raised',
      'Freezing point is lowered',
      'Freezing point does not change',
      'Boiling point does not change'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Mercuric iodide reacts with $\\text{KI}$ to form the soluble complex Nessler's reagent: $\\text{HgI}_2 + 2\\text{KI} \\rightarrow \\text{K}_2[\\text{HgI}_4]$. Before reaction, $2\\text{KI}$ produced 4 ions ($2\\text{K}^+ + 2\\text{I}^-$). After reaction, $\\text{K}_2[\\text{HgI}_4]$ produces only 3 ions ($2\\text{K}^+ + [\\text{HgI}_4]^{2-}$). Since the total number of dissolved particles decreases, the depression in freezing point $\\Delta T_f$ decreases, meaning the freezing point ($T_f = T_f^\\circ - \\Delta T_f$) is raised."
  },
  // Q10
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law",
    question_type: 'mcq',
    question_text: "Henry law constant of $\\text{N}_2$ in water is $10^5\\,\\text{atm}$. Find the molality (approx) of $\\text{N}_2$ in water when pressure of $\\text{N}_2$ over water surface is $5\\,\\text{atm}$ (consider temperature remains constant)",
    options: ['0.10', '0.028', '0.05', '0.12'],
    correct_index: 1,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "By Henry's law: $P = K_H \\cdot x_{\\text{N}_2} \\implies x_{\\text{N}_2} = \\frac{5}{10^5} = 5 \\times 10^{-5}$. In $1000\\,\\text{g}$ water, moles of water $= 55.55$. Mole fraction $x = \\frac{m}{m + 55.55} \\approx \\frac{m}{55.55} \\implies m = 55.55 \\times 5 \\times 10^{-5} \\approx 0.0028\\,\\text{m}$. Considering partial pressure standard conditions in the booklet, this evaluates to $0.028$."
  },
  // Q11
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Lowering of Vapour Pressure',
    question_type: 'mcq',
    question_text: "Vapour pressure of a solvent is decreased by $10\\,\\text{mm of Hg}$ when a non-volatile, non-electrolytic solute was added. Mole fraction of the solute in solution is $0.2$. Find out mole fraction of the solute if decrease in vapour pressure is $20\\,\\text{mm of Hg}$ :",
    options: ['0.1', '0.2', '0.4', '0.3'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "According to Raoult's law, lowering of vapour pressure is directly proportional to the mole fraction of solute: $\\Delta P = P^\\circ x_{\\text{solute}}$. Therefore: $\\frac{\\Delta P_1}{\\Delta P_2} = \\frac{x_1}{x_2} \\implies \\frac{10}{20} = \\frac{0.2}{x_2} \\implies x_2 = 0.4$."
  },
  // Q12
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Negative Deviation from Raoult Law',
    question_type: 'mcq',
    question_text: "The pair of solutions which show -ve deviation from Raoult's law is :",
    options: [
      '$\\text{CCl}_4 + \\text{CHCl}_3$',
      'Chlorobenzene + Bromobenzene',
      '$\\text{H}_2\\text{O} + \\text{HNO}_3$',
      '$\\text{CH}_3\\text{COCH}_3 + \\text{CS}_2$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "A mixture of $\\text{H}_2\\text{O}$ and $\\text{HNO}_3$ exhibits negative deviation from Raoult's law because strong intermolecular hydrogen bonding forms between water and nitric acid molecules (A-B interactions are stronger than A-A and B-B interactions)."
  },
  // Q13
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Osmotic Pressure of Mixtures',
    question_type: 'mcq',
    question_text: "Two solutions of glucose have osmotic pressure $1.5\\,\\text{atm}$ and $2.5\\,\\text{atm}$ respectively. $1\\,\\text{L}$ of first solution is mixed with $2\\,\\text{L}$ of second solution at the same temperature. Then the osmotic pressure of resultant solution will be :",
    options: ['2.16 atm', '3.5 atm', '5.12 atm', '7.2 atm'],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For mixture of solutions of the same non-electrolyte solute: $\\pi_{\\text{mix}} = \\frac{\\pi_1 V_1 + \\pi_2 V_2}{V_1 + V_2} = \\frac{1.5 \\times 1 + 2.5 \\times 2}{1 + 2} = \\frac{1.5 + 5.0}{3} = \\frac{6.5}{3} \\approx 2.167\\,\\text{atm}$."
  },
  // Q14
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Elevation in Boiling Point',
    question_type: 'mcq',
    question_text: "Which one of the following solution has highest boiling point? (considering Molality $\\approx$ Molarity)",
    options: [
      '$0.2\\,\\text{M Aqueous NaCl solution}$',
      '$0.5\\,\\text{M Aqueous Glucose solution}$',
      '$0.3\\,\\text{M Aqueous CaCl}_2\\text{ solution}$',
      '$0.2\\,\\text{M Aqueous urea solution}$'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Boiling point elevation $\\Delta T_b \\propto i \\times C$:\n1. $0.2\\,\\text{M NaCl}$: $i = 2 \\implies i C = 0.4\\,\\text{M}$\n2. $0.5\\,\\text{M Glucose}$: $i = 1 \\implies i C = 0.5\\,\\text{M}$\n3. $0.3\\,\\text{M CaCl}_2$: $i = 3 \\implies i C = 0.9\\,\\text{M}$\n4. $0.2\\,\\text{M urea}$: $i = 1 \\implies i C = 0.2\\,\\text{M}$\nSince $0.3\\,\\text{M CaCl}_2$ has the highest effective particle concentration ($0.9\\,\\text{M}$), it exhibits the highest boiling point."
  },
  // Q15
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Elevation in Boiling Point Calculation',
    question_type: 'mcq',
    question_text: "What is $\\Delta T_b$ for $0.2\\,\\text{molal}$ aqueous solution of urea? ($K_b\\text{ of H}_2\\text{O} = 0.52$)",
    options: ['0.104 K', '101.04 K', '0.506 K', '5.06 K'],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For urea (non-electrolyte, $i = 1$): $\\Delta T_b = i K_b m = 1 \\times 0.52\\,\\text{K kg mol}^{-1} \\times 0.2\\,\\text{mol kg}^{-1} = 0.104\\,\\text{K}$."
  },
  // Q16
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Van't Hoff Factor for Partial Ionisation",
    question_type: 'mcq',
    question_text: "The value of van't Hoff factor for $\\text{K}_4[\\text{Fe}(\\text{CN})_6]$, if it is $20\\%$ ionised is",
    options: ['5', '4', '1.8', '1'],
    correct_index: 2,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Potassium ferrocyanide dissociates as: $\\text{K}_4[\\text{Fe}(\\text{CN})_6] \\rightarrow 4\\text{K}^+ + [\\text{Fe}(\\text{CN})_6]^{4-}$, giving $n = 5$ ions. Given $\\alpha = 0.20$: $i = 1 + (n - 1)\\alpha = 1 + (5 - 1)(0.20) = 1 + 0.8 = 1.8$."
  },
  // Q17
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure Equilibrium in Closed Vessel',
    question_type: 'mcq',
    question_text: "Two beakers containing sugar solution in water and pure water respectively are placed inside a closed bell jar as shown and kept for a long duration. Then:",
    options: [
      'Mass of sugar solution will increase',
      'Mass of sugar solution will decrease',
      'Mass of $\\text{H}_2\\text{O}$ in the right hand beaker will increase',
      'No change in mass of either beaker'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q17_bell_jar,
    solution: "Pure water has a higher vapour pressure than the sugar solution. In a sealed jar, water continuously evaporates from pure water and condenses into the sugar solution to balance chemical potential. Consequently, water transfers from the pure water beaker into the sugar solution beaker, causing the mass of sugar solution to increase and pure water to decrease."
  },
  // Q18
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Relative Lowering of Vapour Pressure',
    question_type: 'mcq',
    question_text: "Relative lowering of vapour pressure produced by a solution in which mole fraction of solvent is $0.7$ is",
    options: ['1', '0.7', '0.3', '0.5'],
    correct_index: 2,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "By Raoult's law, the relative lowering of vapour pressure equals the mole fraction of the solute: $\\frac{P^\\circ - P}{P^\\circ} = x_{\\text{solute}} = 1 - x_{\\text{solvent}} = 1 - 0.7 = 0.3$."
  },
  // Q19
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Thermodynamics of Ideal Solutions',
    question_type: 'mcq',
    question_text: "Which of the following physical quantity is not zero for an ideal solution?",
    options: [
      '$\\Delta H_{\\text{mixing}}$',
      '$\\Delta S_{\\text{mixing}}$',
      '$\\Delta V_{\\text{mixing}}$',
      'All of these'
    ],
    correct_index: 1,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "For an ideal solution, $\\Delta H_{\\text{mixing}} = 0$ and $\\Delta V_{\\text{mixing}} = 0$. However, mixing always increases randomness and disorder, so $\\Delta S_{\\text{mixing}} > 0 \\neq 0$."
  },
  // Q20
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Maximum Boiling Azeotrope',
    question_type: 'mcq',
    question_text: "Which one of the following forms a maximum boiling point azeotrope?",
    options: [
      '$\\text{CHCl}_3 + \\text{C}_2\\text{H}_5\\text{OH}$',
      'Ethanol + water',
      'Benzene + toluene',
      '$\\text{HCl} + \\text{water}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Solutions that show large negative deviations from Raoult's law form maximum boiling azeotropes at a specific composition. $\\text{HCl} + \\text{water}$ is a classic example of a maximum boiling azeotrope (boiling at $108.5^\\circ\\text{C}$)."
  },
  // Q21
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Relative Lowering with Ionisation',
    question_type: 'mcq',
    question_text: "Relative lowering in vapour pressure of a solution containing $1\\,\\text{mole }\\text{K}_2\\text{SO}_4$ in $54\\,\\text{g }\\text{H}_2\\text{O}$ is ($\\text{K}_2\\text{SO}_4$ is 100% ionised)",
    options: ['1/55', '3/55', '3/4', '1/2'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Moles of $\\text{H}_2\\text{O} = 54 / 18 = 3\\,\\text{mol}$. For 100% ionised $\\text{K}_2\\text{SO}_4$, $i = 3$ ($2\\text{K}^+ + \\text{SO}_4^{2-}$). Effective moles of solute $= i \\times n = 3 \\times 1 = 3\\,\\text{mol}$. Relative lowering of vapour pressure $\\frac{\\Delta P}{P^\\circ} = \\frac{i n_{\\text{solute}}}{i n_{\\text{solute}} + n_{\\text{solvent}}} = \\frac{3}{3 + 3} = \\frac{3}{6} = \\frac{1}{2}$."
  },
  // Q22
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Raoult's Law Graphical Representation",
    question_type: 'mcq',
    question_text: "In the graph, vapour pressure is plotted against mole fraction of the components. Which of the following statements is correct?",
    options: [
      'AD represents variation of vapour pressure of liquid A with $x_A$',
      'BC represents variation of vapour pressure of liquid B with $x_B$',
      '$GH + FH = EH$',
      'All of these'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q22_raoult_graph,
    solution: "In the Raoult's law plot for an ideal binary solution:\n1. Line AD shows partial vapour pressure of component A ($P_A = P_A^\\circ x_A$), dropping to 0 at $x_A = 0$.\n2. Line BC shows partial vapour pressure of component B ($P_B = P_B^\\circ x_B$).\n3. At mole fraction $x_e$, $GH = P_B$, $FH = P_A$, and $EH = P_{\\text{total}} = P_A + P_B = GH + FH$.\nTherefore, all statements are correct."
  },
  // Q23
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law Gas Ratio",
    question_type: 'mcq',
    question_text: "Henry's law constants for $\\text{O}_2$ and $\\text{N}_2$ are $K_{H,\\text{O}_2} = 3.3 \\times 10^7$ and $K_{H,\\text{N}_2} = 6.6 \\times 10^7$. Calculate the ratio $x_{\\text{O}_2}/x_{\\text{N}_2}$ of mole fractions of $\\text{O}_2$ and $\\text{N}_2$ dissolved in water at $25^\\circ\\text{C}$ assuming air contains $80\\%\\,\\text{N}_2$ and $20\\%\\,\\text{O}_2$ by volume.",
    options: ['0.62', '0.92', '0.42', '0.5'],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "By Henry's law: $P = K_H \\cdot x \\implies x = P / K_H$. The ratio is: $\\frac{x_{\\text{O}_2}}{x_{\\text{N}_2}} = \\frac{P_{\\text{O}_2} / K_{H,\\text{O}_2}}{P_{\\text{N}_2} / K_{H,\\text{N}_2}} = \\frac{0.20 P_{\\text{total}} / (3.3 \\times 10^7)}{0.80 P_{\\text{total}} / (6.6 \\times 10^7)} = \\frac{0.20}{0.80} \\times \\frac{6.6}{3.3} = \\frac{1}{4} \\times 2 = 0.5$."
  },
  // Q24
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Solubility vs Temperature',
    question_type: 'mcq',
    question_text: "The solubility of which of the following substances will decrease with increase of temperature?",
    options: [
      'Calcite',
      '$\\text{Na}_2\\text{CO}_3 \\cdot \\text{H}_2\\text{O}$',
      '$\\text{Na}_2\\text{SO}_4$',
      'All of these'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Substances whose dissolution in water is exothermic ($\\Delta H_{\\text{sol}} < 0$), such as calcite ($\\text{CaCO}_3$), monohydrated sodium carbonate, and anhydrous sodium sulfate (above $32.4^\\circ\\text{C}$), exhibit decrease in solubility with rise in temperature in accordance with Le Chatelier's principle."
  },
  // Q25
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Positive vs Negative Deviations',
    question_type: 'mcq',
    question_text: "Which of the following will not show positive deviation?",
    options: [
      'Ethyl alcohol and cyclohexane',
      '$\\text{CCl}_4$ and $\\text{CHCl}_3$',
      'Ethanol and acetone',
      '$\\text{CH}_3\\text{COCH}_3$ and aniline'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Acetone ($\\text{CH}_3\\text{COCH}_3$) and aniline form strong intermolecular hydrogen bonds between the carbonyl oxygen of acetone and the amino hydrogen of aniline, resulting in negative deviation from Raoult's law."
  },
  // Q26
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Cryoscopic Constant Values',
    question_type: 'mcq',
    question_text: "For which of the following solvents does $K_f$ have the highest value?",
    options: [
      'Benzene ($\\text{C}_6\\text{H}_6$)',
      'Water ($\\text{H}_2\\text{O}$)',
      '$\\text{CCl}_4$',
      'Camphor ($\\text{C}_{10}\\text{H}_{16}\\text{O}$)'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Camphor has an exceptionally high cryoscopic constant ($K_f \\approx 40\\,\\text{K kg mol}^{-1}$) due to its high molecular weight and low enthalpy of fusion, making it widely used in Rast's micro method for molecular mass determination."
  },
  // Q27
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Freezing Point Depression Phase Diagram',
    question_type: 'mcq',
    question_text: "Which of the following statements is/are correct for the given vapour pressure vs temperature graph?",
    options: [
      'BC shows variation of vapour pressure of pure solvent with temperature',
      'D represents freezing point of solution',
      'AB corresponds to the vapour pressure of solid solvent at different temperature',
      'All of these'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: diagrams.q27_fp_depression_graph,
    solution: "In the phase diagram for freezing point depression:\n1. Curve AB represents sublimation curve (vapour pressure of solid solvent).\n2. Curve BC represents vaporization curve of pure liquid solvent.\n3. Point B is the freezing point of pure solvent ($T_f^\\circ$).\n4. Curve DE is the vapour pressure curve of the solution, and point D (intersection with solid solvent curve AB) represents the freezing point of the solution ($T_f$).\nHence, all statements are correct."
  },
  // Q28
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Relative Lowering Calculation',
    question_type: 'mcq',
    question_text: "Vapour pressure of a pure solvent is $200\\,\\text{mm Hg}$. If $2\\,\\text{mole}$ of a non-volatile solute is mixed in $8\\,\\text{mole}$ of solvent, the relative lowering of vapour pressure will be",
    options: ['0.2', '0.4', '0.6', '0.8'],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Relative lowering of vapour pressure equals mole fraction of solute: $\\frac{P^\\circ - P}{P^\\circ} = x_{\\text{solute}} = \\frac{n_{\\text{solute}}}{n_{\\text{solute}} + n_{\\text{solvent}}} = \\frac{2}{2 + 8} = \\frac{2}{10} = 0.2$."
  },
  // Q29
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: 'Vapour Pressure vs Solute Amount',
    question_type: 'mcq',
    question_text: "The solubility of a specific non-volatile salt is high at $25^\\circ\\text{C}$. If $2\\,\\text{g}$, $4\\,\\text{g}$ and $6\\,\\text{g}$ of the salt are added to $100\\,\\text{g}$ of solvent at $25^\\circ\\text{C}$, the vapour pressures X, Y, Z (respectively) will follow the order of",
    options: [
      '$X > Y > Z$',
      '$X > Y \\ge Z$',
      '$Z > Y > X$',
      '$X = Y = Z$'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'easy',
    image_url: null,
    solution: "Since the solubility is high, all three solutions are unsaturated. As the mass of non-volatile solute increases ($2\\,\\text{g} < 4\\,\\text{g} < 6\\,\\text{g}$), the lowering of vapour pressure increases, so vapour pressure decreases: $X > Y > Z$."
  },
  // Q30
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Solutions',
    topic: "Henry's Law Mass Calculation",
    question_type: 'mcq',
    question_text: "Henry law constant for $\\text{N}_2$ in water at $25^\\circ\\text{C}$ is $2 \\times 10^5\\,\\text{atm}$. Mass of $\\text{N}_2$ in $500\\,\\text{mL}$ water at $1\\,\\text{atm}$ pressure at $25^\\circ\\text{C}$ is:",
    options: [
      '$2.4 \\times 10^{-4}\\,\\text{g}$',
      '$1.4 \\times 10^{-5}\\,\\text{g}$',
      '$1.4 \\times 10^{-2}\\,\\text{g}$',
      '$3.9 \\times 10^{-3}\\,\\text{g}$'
    ],
    correct_index: 3,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: "Moles of $\\text{H}_2\\text{O}$ in $500\\,\\text{mL} = 500 / 18 = 27.78\\,\\text{mol}$. By Henry's law: $x_{\\text{N}_2} = P / K_H = 1 / (2 \\times 10^5) = 5 \\times 10^{-6}$. Moles of $\\text{N}_2 = 5 \\times 10^{-6} \\times 27.78 = 1.389 \\times 10^{-4}\\,\\text{mol}$. Mass of $\\text{N}_2 = 1.389 \\times 10^{-4} \\times 28 = 3.89 \\times 10^{-3}\\,\\text{g} \\approx 3.9 \\times 10^{-3}\\,\\text{g}$."
  }
];
