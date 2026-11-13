// Solutions PYQ - Part 1 (Q1 - Q25)

export const part1Questions = [
  {
    question_number: 1,
    question_text: "Consider the following statements about the solutions formed by mixing two liquids:\n\nA. An ideal solution thus formed obeys Raoult's law throughout the composition range.\nB. Mixture of chloroform and acetone shows negative deviation from Raoult's law.\nC. Mixture of aniline and phenol shows positive deviation from Raoult's law.\n\nChoose the correct statements from the options given below:",
    options: [
      "A and C only",
      "A and B only",
      "B and C only",
      "A only"
    ],
    correct_option: "B",
    explanation: "- Statement A: By definition, an ideal solution obeys Raoult's law over the entire range of concentrations. (True)\n- Statement B: Chloroform and acetone form strong intermolecular hydrogen bonding ($\\,\\text{Cl}_3\\text{C}-\\text{H}\\cdots\\text{O}=\\text{C}(\\text{CH}_3)_2\\,$), making $A-B$ interactions stronger than $A-A$ and $B-B$ interactions. Thus, it shows negative deviation from Raoult's law. (True)\n- Statement C: Phenol and aniline form intermolecular hydrogen bonds between the phenolic proton and the nitrogen lone pair of aniline, making $A-B$ interactions stronger than individual interactions; therefore, it shows negative deviation, not positive deviation. (False)\n\nHence, only statements A and B are correct."
  },
  {
    question_number: 2,
    question_text: "Assertion A: For an ideal solution formed by mixing liquids $\\text{P}$ and $\\text{Q}$, $\\Delta_{\\text{mix}} H = 0$ and $\\Delta_{\\text{mix}} V = 0$.\nReason R: No interactions occur between $\\text{P}$ and $\\text{Q}$.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "A is not correct but R is correct",
      "Both A and R are correct and R is the correct explanation of A",
      "Both A and R are correct but R is NOT the correct explanation of A",
      "A is correct but R is not correct"
    ],
    correct_option: "D",
    explanation: "- Assertion A is correct: For an ideal solution, the change in enthalpy on mixing ($\\Delta_{\\text{mix}} H = 0$) and the change in volume on mixing ($\\Delta_{\\text{mix}} V = 0$) are both zero.\n- Reason R is incorrect: Interactions do occur between $\\text{P}$ and $\\text{Q}$, but the intermolecular attractive forces between $\\text{P}-\\text{Q}$ are equal in magnitude to the $\\text{P}-\\text{P}$ and $\\text{Q}-\\text{Q}$ attractive forces, rather than nonexistent.\n\nTherefore, A is correct but R is not correct."
  },
  {
    question_number: 3,
    question_text: "Identify the correct statements:\n\n(A) The molality of $2.5\\text{ g}$ of ethanoic acid (Molar mass : $60\\text{ g mol}^{-1}$) in $75\\text{ g}$ of benzene solution is $0.556\\text{ m}$.\n(B) The molarity of a solution containing $5\\text{ g}$ of $\\text{NaOH}$ (molar mass : $40\\text{ g mol}^{-1}$) in $450\\text{ mL}$ of solution is $0.278\\text{ M}$ at $298\\text{ K}$.\n(C) Aquatic species are more comfortable in cold water.\n(D) The solubility of gas increases with decrease in pressure.\n(E) For a binary mixture of $\\text{A}$ and $\\text{B}$, the number of moles of $\\text{A}$ and $\\text{B}$ are $n_A$ and $n_B$ respectively. The mole fraction of $\\text{B}$ will be $x_B = \\frac{n_A}{n_A + n_B}$.\n\nChoose the correct answer from the options given below:",
    options: [
      "A, B and C only",
      "A and B only",
      "A and C only",
      "A, D and E only"
    ],
    correct_option: "A",
    explanation: "- (A): Moles of ethanoic acid $= \\frac{2.5}{60} = 0.04167\\text{ mol}$. Molality $m = \\frac{0.04167}{0.075\\text{ kg}} = 0.556\\text{ m}$. (Correct)\n- (B): Moles of $\\text{NaOH} = \\frac{5}{40} = 0.125\\text{ mol}$. Molarity $M = \\frac{0.125}{0.450\\text{ L}} = 0.278\\text{ M}$. (Correct)\n- (C): According to Henry's law, gas solubility increases with decrease in temperature, so dissolved oxygen is higher in cold water, making aquatic species more comfortable. (Correct)\n- (D): Solubility of gas increases with increase in pressure ($p = K_H x$), so (D) is incorrect.\n- (E): Mole fraction of $\\text{B}$ is $x_B = \\frac{n_B}{n_A + n_B}$, not $\\frac{n_A}{n_A + n_B}$, so (E) is incorrect.\n\nThus, statements A, B and C only are correct."
  },
  {
    question_number: 4,
    question_text: "Mixture of chloroform and acetone forms a solution with negative deviation from Raoult's law due to:",
    options: [
      "Increase in escaping tendency of molecules of each component.",
      "Formation of hydrogen bonding between acetone and chloroform",
      "Stronger intermolecular forces between chloroform molecules than those between chloroform and acetone molecules.",
      "Repulsive forces."
    ],
    correct_option: "B",
    explanation: "When chloroform ($\\text{CHCl}_3$) and acetone ($\\text{CH}_3\\text{COCH}_3$) are mixed, intermolecular hydrogen bonding develops between the carbonyl oxygen of acetone and the acidic hydrogen of chloroform:\n$$\\text{Cl}_3\\text{C}-\\text{H} \\cdots \\text{O}=\\text{C}(\\text{CH}_3)_2$$\nThis new $A-B$ interaction is stronger than the original $A-A$ and $B-B$ interactions, decreasing the escaping tendency of the molecules and leading to a negative deviation from Raoult's law."
  },
  {
    question_number: 5,
    question_text: "Match List-I with List-II:\n\n$$\\begin{array}{|l|l|l|l|}\n\\hline\n& \\textbf{List - I (Example)} & & \\textbf{List - II (Type of Solution)} \\\\\n\\hline\n\\text{A} & \\text{Humidity} & \\text{I} & \\text{Solid in solid} \\\\\n\\text{B} & \\text{Alloys} & \\text{II} & \\text{Liquid in gas} \\\\\n\\text{C} & \\text{Amalgams} & \\text{III} & \\text{Solid in gas} \\\\\n\\text{D} & \\text{Smoke} & \\text{IV} & \\text{Liquid in solid} \\\\\n\\hline\n\\end{array}$$\n\nChoose the correct answer from the options given below:",
    options: [
      "A-III, B-I, C-IV, D-II",
      "A-III, B-II, C-I, D-IV",
      "A-II, B-IV, C-I, D-III",
      "A-II, B-I, C-IV, D-III"
    ],
    correct_option: "D",
    explanation: "- A. Humidity: Water vapour in air $\\rightarrow$ Liquid in gas (II)\n- B. Alloys (e.g. brass, bronze): Solid dissolved in solid $\\rightarrow$ Solid in solid (I)\n- C. Amalgams (e.g. sodium amalgam): Mercury (liquid) in sodium (solid) $\\rightarrow$ Liquid in solid (IV)\n- D. Smoke: Carbon/dust particles in air $\\rightarrow$ Solid in gas (III)\n\nHence, the correct matching is A-II, B-I, C-IV, D-III."
  },
  {
    question_number: 6,
    question_text: "$5\\text{ moles}$ of liquid $\\text{X}$ and $10\\text{ moles}$ of liquid $\\text{Y}$ make a solution having a vapour pressure of $70\\text{ torr}$. The vapour pressures of pure $\\text{X}$ and $\\text{Y}$ are $63\\text{ torr}$ and $78\\text{ torr}$ respectively. Which of the following is true regarding the described solution?",
    options: [
      "The solution is ideal.",
      "The solution has volume greater than the sum of individual volumes.",
      "The solution shows positive deviation.",
      "The solution shows negative deviation."
    ],
    correct_option: "D",
    explanation: "Total moles $= 5 + 10 = 15\\text{ moles}$.\nMole fractions:\n$$x_X = \\frac{5}{15} = \\frac{1}{3}, \\quad x_Y = \\frac{10}{15} = \\frac{2}{3}$$\n\nIdeal vapour pressure calculated by Raoult's law:\n$$P_{\\text{ideal}} = x_X P_X^\\circ + x_Y P_Y^\\circ = \\left(\\frac{1}{3} \\times 63\\right) + \\left(\\frac{2}{3} \\times 78\\right) = 21 + 52 = 73\\text{ torr}$$\n\nObserved vapour pressure:\n$$P_{\\text{obs}} = 70\\text{ torr}$$\nSince $P_{\\text{obs}} < P_{\\text{ideal}}$ ($70 < 73$), the solution exhibits negative deviation from Raoult's law."
  },
  {
    question_number: 7,
    question_text: "Mass of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) required to be dissolved to prepare one litre of its solution which is isotonic with $15\\text{ g L}^{-1}$ solution of urea ($\\text{NH}_2\\text{CONH}_2$) is (Given: Molar mass in $\\text{g mol}^{-1} \\; \\text{C}:12, \\text{H}:1, \\text{O}:16, \\text{N}:14$):",
    options: [
      "55 g",
      "15 g",
      "30 g",
      "45 g"
    ],
    correct_option: "D",
    explanation: "For two isotonic non-electrolyte solutions at the same temperature:\n$$\\Pi_1 = \\Pi_2 \\implies C_1 = C_2$$\n$$\\frac{w_{\\text{glucose}}}{M_{\\text{glucose}} \\times V} = \\frac{w_{\\text{urea}}}{M_{\\text{urea}} \\times V}$$\n\nMolar masses:\n- $M_{\\text{urea}} = 14 \\times 2 + 1 \\times 4 + 12 + 16 = 60\\text{ g mol}^{-1}$\n- $M_{\\text{glucose}} = 12 \\times 6 + 1 \\times 12 + 16 \\times 6 = 180\\text{ g mol}^{-1}$\n\nGiven concentration of urea $= 15\\text{ g L}^{-1}$:\n$$\\frac{w_{\\text{glucose}}}{180} = \\frac{15}{60} = 0.25$$\n$$w_{\\text{glucose}} = 0.25 \\times 180 = 45\\text{ g}$$"
  },
  {
    question_number: 8,
    question_text: "The Henry's law constant ($K_H$) values of three gases (A, B, C) in water are $145$, $2 \\times 10^{-5}$ and $35\\text{ kbar}$ respectively. The solubility of these gases in water follows the order:",
    options: [
      "B > A > C",
      "B > C > A",
      "A > C > B",
      "A > B > C"
    ],
    correct_option: "B",
    explanation: "According to Henry's law:\n$$p = K_H \\cdot x \\implies x = \\frac{p}{K_H}$$\nAt a given pressure, solubility ($x$) is inversely proportional to Henry's law constant ($K_H$):\n$$\\text{Solubility} \\propto \\frac{1}{K_H}$$\n\nGiven values:\n- $K_H(B) = 2 \\times 10^{-5}\\text{ kbar}$ (lowest $K_H \\implies$ highest solubility)\n- $K_H(C) = 35\\text{ kbar}$\n- $K_H(A) = 145\\text{ kbar}$ (highest $K_H \\implies$ lowest solubility)\n\nTherefore, the solubility order is: $\\text{B} > \\text{C} > \\text{A}$."
  },
  {
    question_number: 9,
    question_text: "The plot of osmotic pressure ($\\Pi$) vs concentration ($\\text{mol L}^{-1}$) for a solution gives a straight line with slope $25.73\\text{ L bar mol}^{-1}$. The temperature at which the osmotic pressure measurement is done is (Use $R = 0.083\\text{ L bar mol}^{-1}\\text{ K}^{-1}$):",
    options: [
      "$37^\\circ\\text{C}$",
      "$310^\\circ\\text{C}$",
      "$25.73^\\circ\\text{C}$",
      "$12.05^\\circ\\text{C}$"
    ],
    correct_option: "A",
    explanation: "According to van 't Hoff equation for osmotic pressure:\n$$\\Pi = C R T$$\nA plot of $\\Pi$ against $C$ is a straight line passing through the origin with slope:\n$$\\text{Slope} = R T$$\nGiven $\\text{Slope} = 25.73\\text{ L bar mol}^{-1}$ and $R = 0.083\\text{ L bar mol}^{-1}\\text{ K}^{-1}$:\n$$T = \\frac{\\text{Slope}}{R} = \\frac{25.73}{0.083} = 310\\text{ K}$$\n\nConverting to Celsius:\n$$T = 310 - 273 = 37^\\circ\\text{C}$$"
  },
  {
    question_number: 10,
    question_text: "Which amongst the following aqueous solution of electrolytes will have minimum elevation in boiling point? Choose the correct option :-",
    options: [
      "$0.05\\text{ M NaCl}$",
      "$0.1\\text{ M KCl}$",
      "$0.1\\text{ M MgSO}_4$",
      "$1\\text{ M NaCl}$"
    ],
    correct_option: "A",
    explanation: "Elevation in boiling point is given by:\n$$\\Delta T_b = i \\cdot K_b \\cdot m \\propto i \\times C$$\nCalculating $i \\times C$ for each option:\n- (A) $0.05\\text{ M NaCl}$: $i = 2 \\implies i \\times C = 2 \\times 0.05 = 0.10\\text{ M}$\n- (B) $0.1\\text{ M KCl}$: $i = 2 \\implies i \\times C = 2 \\times 0.1 = 0.20\\text{ M}$\n- (C) $0.1\\text{ M MgSO}_4$: $i = 2 \\implies i \\times C = 2 \\times 0.1 = 0.20\\text{ M}$\n- (D) $1\\text{ M NaCl}$: $i = 2 \\implies i \\times C = 2 \\times 1 = 2.0\\text{ M}$\n\nSince $0.05\\text{ M NaCl}$ has the lowest effective particle concentration ($0.10\\text{ M}$), it will exhibit the minimum elevation in boiling point."
  },
  {
    question_number: 11,
    question_text: "$K_H$ value for some gases at the same temperature '$T$' are given:\n\n$$\\begin{array}{|l|l|}\n\\hline\n\\textbf{Gas} & \\mathbf{K_H /\\text{ kbar}} \\\\\n\\hline\n\\text{Ar} & 40.3 \\\\\n\\text{CO}_2 & 1.67 \\\\\n\\text{HCHO} & 1.83 \\times 10^{-5} \\\\\n\\text{CH}_4 & 0.413 \\\\\n\\hline\n\\end{array}$$\n\nwhere $K_H$ is Henry's Law constant in water. The order of their solubility in water is:",
    options: [
      "$\\text{HCHO} < \\text{CH}_4 < \\text{CO}_2 < \\text{Ar}$",
      "$\\text{Ar} < \\text{CO}_2 < \\text{CH}_4 < \\text{HCHO}$",
      "$\\text{Ar} < \\text{CH}_4 < \\text{CO}_2 < \\text{HCHO}$",
      "$\\text{HCHO} < \\text{CO}_2 < \\text{CH}_4 < \\text{Ar}$"
    ],
    correct_option: "B",
    explanation: "According to Henry's law, gas solubility is inversely proportional to $K_H$:\n$$\\text{Solubility} \\propto \\frac{1}{K_H}$$\nArranging the gases in order of increasing $K_H$ values:\n$$\\text{HCHO} (1.83 \\times 10^{-5}) < \\text{CH}_4 (0.413) < \\text{CO}_2 (1.67) < \\text{Ar} (40.3)$$\n\nTherefore, solubility in water follows the reverse order (lowest $K_H$ is most soluble):\n$$\\text{Ar} < \\text{CO}_2 < \\text{CH}_4 < \\text{HCHO}$$"
  },
  {
    question_number: 12,
    question_text: "The following solutions were prepared by dissolving $10\\text{ g}$ of glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$) in $250\\text{ ml}$ of water ($P_1$), $10\\text{ g}$ of urea ($\\text{CH}_4\\text{N}_2\\text{O}$) in $250\\text{ ml}$ of water ($P_2$) and $10\\text{ g}$ of sucrose ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$) in $250\\text{ ml}$ of water ($P_3$). The right option for the decreasing order of osmotic pressure of these solutions is:",
    options: [
      "$P_3 > P_1 > P_2$",
      "$P_2 > P_1 > P_3$",
      "$P_1 > P_2 > P_3$",
      "$P_2 > P_3 > P_1$"
    ],
    correct_option: "B",
    explanation: "Osmotic pressure $\\Pi = \\frac{w}{M \\cdot V} R T \\propto \\frac{1}{M}$ for equal mass $w$ dissolved in the same volume $V$.\n\nMolar masses:\n- Urea: $M = 60\\text{ g mol}^{-1} \\implies n = \\frac{10}{60} = 0.167\\text{ mol}$\n- Glucose: $M = 180\\text{ g mol}^{-1} \\implies n = \\frac{10}{180} = 0.056\\text{ mol}$\n- Sucrose: $M = 342\\text{ g mol}^{-1} \\implies n = \\frac{10}{342} = 0.029\\text{ mol}$\n\nSince $n_2 > n_1 > n_3$, the decreasing order of osmotic pressure is:\n$$P_2 > P_1 > P_3$$"
  },
  {
    question_number: 13,
    question_text: "The correct option for the value of vapour pressure of a solution at $45^\\circ\\text{C}$ with benzene to octane in molar ratio $3 : 2$ is:\n[At $45^\\circ\\text{C}$ vapour pressure of benzene is $280\\text{ mm Hg}$ and that of octane is $420\\text{ mm Hg}$. Assume Ideal gas]",
    options: [
      "$350\\text{ mm of Hg}$",
      "$160\\text{ mm of Hg}$",
      "$168\\text{ mm of Hg}$",
      "$336\\text{ mm of Hg}$"
    ],
    correct_option: "D",
    explanation: "Given molar ratio of benzene to octane is $3 : 2$:\n$$x_{\\text{benzene}} = \\frac{3}{3 + 2} = \\frac{3}{5} = 0.6$$\n$$x_{\\text{octane}} = \\frac{2}{3 + 2} = \\frac{2}{5} = 0.4$$\n\nAccording to Raoult's law:\n$$P_{\\text{total}} = x_{\\text{benzene}} P_{\\text{benzene}}^\\circ + x_{\\text{octane}} P_{\\text{octane}}^\\circ$$\n$$P_{\\text{total}} = (0.6 \\times 280) + (0.4 \\times 420) = 168 + 168 = 336\\text{ mm of Hg}$$"
  },
  {
    question_number: 14,
    question_text: "If $8\\text{ g}$ of a non-electrolyte solute is dissolved in $114\\text{ g}$ of n-octane to reduce its vapour pressure to $80\\%$, the molar mass (in $\\text{g mol}^{-1}$) of the solute is:\n[Given that molar mass of n-octane is $114\\text{ g mol}^{-1}$]",
    options: [
      "20",
      "40",
      "60",
      "80"
    ],
    correct_option: "B",
    explanation: "Let the vapour pressure of pure n-octane be $P^\\circ$.\nAfter adding solute, vapour pressure $P_s = 0.80 P^\\circ$.\nRelative lowering of vapour pressure:\n$$\\frac{P^\\circ - P_s}{P_s} = \\frac{n_{\\text{solute}}}{n_{\\text{solvent}}}$$\n$$\\frac{P^\\circ - 0.80 P^\\circ}{0.80 P^\\circ} = \\frac{w_2 / M_2}{w_1 / M_1}$$\n$$\\frac{0.20}{0.80} = \\frac{1}{4} = \\frac{8 / M_2}{114 / 114} = \\frac{8}{M_2}$$\n$$M_2 = 8 \\times 4 = 40\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 15,
    question_text: "Isotonic solutions have same:",
    options: [
      "boiling temperature",
      "vapour pressure",
      "freezing temperature",
      "osmotic pressure"
    ],
    correct_option: "D",
    explanation: "Solutions that exert the same osmotic pressure across a semipermeable membrane at a given temperature are defined as isotonic solutions ($\\Pi_1 = \\Pi_2$)."
  },
  {
    question_number: 16,
    question_text: "The freezing point depression constant ($K_f$) of benzene is $5.12\\text{ K kg mol}^{-1}$. The freezing point depression for the solution of molality $0.078\\text{ m}$ containing a non-electrolyte solute in benzene is rounded off upto two decimal places:",
    options: [
      "0.80 K",
      "0.40 K",
      "0.60 K",
      "0.20 K"
    ],
    correct_option: "B",
    explanation: "Depression in freezing point for a non-electrolyte ($i = 1$) is:\n$$\\Delta T_f = K_f \\cdot m$$\nGiven $K_f = 5.12\\text{ K kg mol}^{-1}$ and $m = 0.078\\text{ m}$:\n$$\\Delta T_f = 5.12 \\times 0.078 = 0.39936\\text{ K} \\approx 0.40\\text{ K}$$"
  },
  {
    question_number: 17,
    question_text: "The mixture which shows positive deviation from Raoult's law is:",
    options: [
      "Benzene + Toluene",
      "Acetone + Chloroform",
      "Chloroethane + Bromoethane",
      "Ethanol + Acetone"
    ],
    correct_option: "D",
    explanation: "- Benzene + Toluene and Chloroethane + Bromoethane form nearly ideal solutions.\n- Acetone + Chloroform forms hydrogen bonding between unlike molecules, exhibiting negative deviation from Raoult's law.\n- In pure ethanol, molecules are held by extensive hydrogen bonding. When acetone is added, acetone molecules get between ethanol molecules and break some of the hydrogen bonds. Consequently, $A-B$ attractive interactions become weaker than $A-A$ interactions, causing positive deviation from Raoult's law."
  },
  {
    question_number: 18,
    question_text: "Which of the following statements is correct regarding a solution of two components A and B exhibiting positive deviation from ideal behaviour?",
    options: [
      "Intermolecular attractive forces between A-A and B-B are equal to those between A-B.",
      "Intermolecular attractive forces between A-A and B-B are stronger than those between A-B.",
      "$\\Delta_{\\text{mix}} H = 0$ at constant T and P.",
      "$\\Delta_{\\text{mix}} V = 0$ at constant T and P."
    ],
    correct_option: "B",
    explanation: "For solutions exhibiting positive deviation from Raoult's law:\n1. The intermolecular attractive forces between solute-solvent ($A-B$) are weaker than the attractive forces between solvent-solvent ($A-A$) and solute-solute ($B-B$).\n2. The escaping tendency of molecules increases, so observed vapour pressure is higher than predicted by Raoult's law.\n3. $\\Delta_{\\text{mix}} H > 0$ (endothermic) and $\\Delta_{\\text{mix}} V > 0$.\n\nHence, statement (B) is correct."
  },
  {
    question_number: 19,
    question_text: "For an ideal solution, the correct option is:",
    options: [
      "$\\Delta_{\\text{mix}} H = 0$ at constant T and P",
      "$\\Delta_{\\text{mix}} G = 0$ at constant T and P",
      "$\\Delta_{\\text{mix}} S = 0$ at constant T and P",
      "$\\Delta_{\\text{mix}} V \\neq 0$ at constant T and P"
    ],
    correct_option: "A",
    explanation: "For an ideal solution:\n- $\\Delta_{\\text{mix}} H = 0$\n- $\\Delta_{\\text{mix}} V = 0$\n- $\\Delta_{\\text{mix}} S > 0$ (mixing is a spontaneous disordering process)\n- $\\Delta_{\\text{mix}} G < 0$ (spontaneous process, $\\Delta G = \\Delta H - T\\Delta S = -T\\Delta S < 0$)\n\nTherefore, the only correct option is $\\Delta_{\\text{mix}} H = 0$ at constant T and P."
  },
  {
    question_number: 20,
    question_text: "The mixture that forms maximum boiling azeotrope is:",
    options: [
      "Ethanol + Water",
      "Acetone + Carbon disulphide",
      "Heptane + Octane",
      "Water + Nitric acid"
    ],
    correct_option: "D",
    explanation: "Solutions showing large negative deviations from Raoult's law form maximum boiling azeotropes at a specific composition because their vapour pressure is lower than that of either component, meaning the boiling point is higher than that of either component.\nNitric acid + Water forms a classic maximum boiling azeotrope (approx. $68\\% \\; \\text{HNO}_3$ and $32\\% \\; \\text{H}_2\\text{O}$ by mass, boiling at $393.5\\text{ K}$).\nEthanol + Water and Acetone + $\\text{CS}_2$ show positive deviations and form minimum boiling azeotropes."
  },
  {
    question_number: 21,
    question_text: "If molality of the dilute solution is doubled, the value of molal depression constant ($K_f$) will be:",
    options: [
      "halved",
      "tripled",
      "unchanged",
      "doubled."
    ],
    correct_option: "C",
    explanation: "The molal depression constant ($K_f$) is a characteristic property of the solvent only:\n$$K_f = \\frac{R \\cdot M \\cdot T_f^2}{1000 \\cdot \\Delta_{\\text{fus}} H}$$\nIt depends solely on the nature of the solvent and is independent of the molality or concentration of the solute. Hence, doubling the molality leaves $K_f$ unchanged."
  },
  {
    question_number: 22,
    question_text: "The van't Hoff factor ($i$) for a dilute aqueous solution of the strong electrolyte barium hydroxide is:",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_option: "D",
    explanation: "Barium hydroxide, $\\text{Ba(OH)}_2$, is a strong electrolyte that completely dissociates in dilute aqueous solution:\n$$\\text{Ba(OH)}_2 \\rightarrow \\text{Ba}^{2+} + 2\\text{OH}^-$$\nSince 1 mole of $\\text{Ba(OH)}_2$ yields 3 moles of ions (1 mole of $\\text{Ba}^{2+}$ and 2 moles of $\\text{OH}^-$), the van 't Hoff factor is:\n$$i = 1 + (n - 1)\\alpha = 1 + (3 - 1)(1) = 3$$"
  },
  {
    question_number: 23,
    question_text: "Which one of the following is incorrect for ideal solution?",
    options: [
      "$\\Delta H_{\\text{mix}} = 0$",
      "$\\Delta U_{\\text{mix}} = 0$",
      "$\\Delta P = P_{\\text{obs}} - P_{\\text{calculated by Raoult's law}} = 0$",
      "$\\Delta G_{\\text{mix}} = 0$"
    ],
    correct_option: "D",
    explanation: "Mixing of two liquids to form a solution is a spontaneous process, so the change in Gibbs free energy of mixing must be negative:\n$$\\Delta G_{\\text{mix}} = \\Delta H_{\\text{mix}} - T \\Delta S_{\\text{mix}} < 0$$\nSince for an ideal solution $\\Delta H_{\\text{mix}} = 0$ and $\\Delta S_{\\text{mix}} > 0$:\n$$\\Delta G_{\\text{mix}} = -T \\Delta S_{\\text{mix}} < 0$$\nTherefore, $\\Delta G_{\\text{mix}} = 0$ is incorrect."
  },
  {
    question_number: 24,
    question_text: "Which of the following statements about the composition of the vapour over an ideal $1 : 1$ molar mixture of benzene and toluene is correct? Assume that the temperature is constant at $25^\\circ\\text{C}$.\n(Given, vapour pressure data at $25^\\circ\\text{C}$, benzene $= 12.8\\text{ kPa}$, toluene $= 3.85\\text{ kPa}$)",
    options: [
      "The vapour will contain equal amounts of benzene and toluene.",
      "Not enough information is given to make a prediction.",
      "The vapour will contain a higher percentage of benzene.",
      "The vapour will contain a higher percentage of toluene"
    ],
    correct_option: "C",
    explanation: "For an ideal equimolar mixture ($x_B = x_T = 0.5$):\n$$P_B = x_B P_B^\\circ = 0.5 \\times 12.8 = 6.4\\text{ kPa}$$\n$$P_T = x_T P_T^\\circ = 0.5 \\times 3.85 = 1.925\\text{ kPa}$$\nTotal vapour pressure $P = 6.4 + 1.925 = 8.325\\text{ kPa}$.\n\nMole fraction of benzene in the vapour phase:\n$$y_B = \\frac{P_B}{P} = \\frac{6.4}{8.325} \\approx 0.7687 \\quad (76.9\\%)$$\nMole fraction of toluene in vapour phase:\n$$y_T = \\frac{1.925}{8.325} \\approx 0.2313 \\quad (23.1\\%)$$\nAccording to Konovalov's rule, the vapour phase is richer in the more volatile component (benzene). Hence, the vapour will contain a higher percentage of benzene."
  },
  {
    question_number: 25,
    question_text: "At $100^\\circ\\text{C}$ the vapour pressure of a solution of $6.5\\text{ g}$ of a solute in $100\\text{ g}$ water is $732\\text{ mm}$. If $K_b = 0.52$, the boiling point of this solution will be:",
    options: [
      "$102^\\circ\\text{C}$",
      "$103^\\circ\\text{C}$",
      "$101^\\circ\\text{C}$",
      "$100^\\circ\\text{C}$"
    ],
    correct_option: "C",
    explanation: "At $100^\\circ\\text{C}$, the vapour pressure of pure water is $P^\\circ = 760\\text{ mm Hg}$.\nGiven vapour pressure of solution $P_s = 732\\text{ mm Hg}$.\nUsing relative lowering of vapour pressure:\n$$\\frac{P^\\circ - P_s}{P_s} = \\frac{n_{\\text{solute}}}{n_{\\text{solvent}}} = \\frac{w_2 / M_2}{w_1 / M_1}$$\n$$\\frac{760 - 732}{732} = \\frac{28}{732} = \\frac{6.5 / M_2}{100 / 18}$$\n$$M_2 = \\frac{6.5 \\times 18 \\times 732}{100 \\times 28} = \\frac{85644}{2800} \\approx 30.6\\text{ g mol}^{-1}$$\n\nNow, calculate elevation in boiling point:\n$$\\Delta T_b = K_b \\times m = K_b \\times \\frac{w_2 \\times 1000}{M_2 \\times w_1} = 0.52 \\times \\frac{6.5 \\times 1000}{30.6 \\times 100} \\approx 0.52 \\times 2.124 \\approx 1.10^\\circ\\text{C}$$\n\nBoiling point of solution:\n$$T_b = 100^\\circ\\text{C} + 1.10^\\circ\\text{C} \\approx 101.1^\\circ\\text{C} \\approx 101^\\circ\\text{C}$$"
  }
];

