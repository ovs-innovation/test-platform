// Solutions PYQ - Part 2 (Q26 - Q50)

export const part2Questions = [
  {
    question_number: 26,
    question_text: "The boiling point of $0.2\\text{ mol kg}^{-1}$ solution of $\\text{X}$ in water is greater than equimolal solution of $\\text{Y}$ in water. Which one of the following statements is true in this case?",
    options: [
      "Molecular mass of X is less than the molecular mass of Y.",
      "Y is undergoing dissociation in water while X undergoes no change.",
      "X is undergoing dissociation in water.",
      "Molecular mass of X is greater than the molecular mass of Y."
    ],
    correct_option: "C",
    explanation: "Elevation in boiling point is given by:\n$$\\Delta T_b = i \\cdot K_b \\cdot m$$\nSince the solutions are equimolal ($m = 0.2\\text{ mol kg}^{-1}$) in the same solvent (water):\n$$\\Delta T_b \\propto i$$\nGiven that the boiling point of solution of $\\text{X}$ is greater than that of $\\text{Y}$, it implies $\\Delta T_b(\\text{X}) > \\Delta T_b(\\text{Y}) \\implies i_X > i_Y$.\nThis indicates that $\\text{X}$ is undergoing dissociation into a greater number of particles in water."
  },
  {
    question_number: 27,
    question_text: "Which one of the following electrolytes has the same value of van't Hoff factor ($i$) as that of $\\text{Al}_2(\\text{SO}_4)_3$ (if all are $100\\%$ ionised)?",
    options: [
      "$\\text{Al(NO}_3)_3$",
      "$\\text{K}_4[\\text{Fe(CN)}_6]$",
      "$\\text{K}_2\\text{SO}_4$",
      "$\\text{K}_3[\\text{Fe(CN)}_6]$"
    ],
    correct_option: "B",
    explanation: "For $100\\%$ ionisation, the van 't Hoff factor $i$ equals the total number of ions produced per formula unit ($n$):\n- For $\\text{Al}_2(\\text{SO}_4)_3$: $\\text{Al}_2(\\text{SO}_4)_3 \\rightarrow 2\\text{Al}^{3+} + 3\\text{SO}_4^{2-} \\implies n = 2 + 3 = 5$\n- For $\\text{Al(NO}_3)_3$: $n = 1 + 3 = 4$\n- For $\\text{K}_4[\\text{Fe(CN)}_6]$: $\\text{K}_4[\\text{Fe(CN)}_6] \\rightarrow 4\\text{K}^+ + [\\text{Fe(CN)}_6]^{4-} \\implies n = 4 + 1 = 5$\n- For $\\text{K}_2\\text{SO}_4$: $n = 2 + 1 = 3$\n- For $\\text{K}_3[\\text{Fe(CN)}_6]$: $n = 3 + 1 = 4$\n\nHence, $\\text{K}_4[\\text{Fe(CN)}_6]$ has $i = 5$, identical to $\\text{Al}_2(\\text{SO}_4)_3$."
  },
  {
    question_number: 28,
    question_text: "Which of them is not equal to zero for an ideal solution?",
    options: [
      "$\\Delta V_{\\text{mix}}$",
      "$\\Delta P = P_{\\text{observed}} - P_{\\text{Raoult}}$",
      "$\\Delta H_{\\text{mix}}$",
      "$\\Delta S_{\\text{mix}}$"
    ],
    correct_option: "D",
    explanation: "For an ideal binary solution:\n1. $\\Delta V_{\\text{mix}} = 0$\n2. $\\Delta H_{\\text{mix}} = 0$\n3. $\\Delta P = P_{\\text{observed}} - P_{\\text{Raoult}} = 0$\n4. Mixing is a spontaneous disordering process, so the entropy of mixing is always strictly positive:\n$$\\Delta S_{\\text{mix}} > 0$$\nTherefore, $\\Delta S_{\\text{mix}}$ is not equal to zero."
  },
  {
    question_number: 29,
    question_text: "Of the following $0.10\\text{ m}$ aqueous solutions, which one will exhibit the largest freezing point depression?",
    options: [
      "$\\text{KCl}$",
      "$\\text{C}_6\\text{H}_{12}\\text{O}_6$",
      "$\\text{Al}_2(\\text{SO}_4)_3$",
      "$\\text{K}_2\\text{SO}_4$"
    ],
    correct_option: "C",
    explanation: "Depression in freezing point is given by:\n$$\\Delta T_f = i \\cdot K_f \\cdot m$$\nAt constant molality ($m = 0.10\\text{ m}$), $\\Delta T_f \\propto i$:\n- For glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$): $i = 1 \\implies \\Delta T_f \\propto 0.10$\n- For $\\text{KCl}$: $i = 2 \\implies \\Delta T_f \\propto 0.20$\n- For $\\text{K}_2\\text{SO}_4$: $i = 3 \\implies \\Delta T_f \\propto 0.30$\n- For $\\text{Al}_2(\\text{SO}_4)_3$: $i = 5 \\implies \\Delta T_f \\propto 0.50$\n\n$\\text{Al}_2(\\text{SO}_4)_3$ produces the greatest number of particles per formula unit ($i = 5$), and thus exhibits the largest depression in freezing point."
  },
  {
    question_number: 30,
    question_text: "Which condition is not satisfied by an ideal solution?",
    options: [
      "$\\Delta_{\\text{mix}} V = 0$",
      "$\\Delta_{\\text{mix}} S = 0$",
      "Obeyance to Raoult's Law",
      "$\\Delta_{\\text{mix}} H = 0$"
    ],
    correct_option: "B",
    explanation: "For an ideal solution:\n- It obeys Raoult's law at all concentrations and temperatures.\n- $\\Delta_{\\text{mix}} H = 0$\n- $\\Delta_{\\text{mix}} V = 0$\n- However, the entropy of mixing is always positive, $\\Delta_{\\text{mix}} S > 0$. The condition $\\Delta_{\\text{mix}} S = 0$ is NOT satisfied."
  },
  {
    question_number: 31,
    question_text: "Vapour pressure of chloroform ($\\text{CHCl}_3$) and dichloromethane ($\\text{CH}_2\\text{Cl}_2$) at $25^\\circ\\text{C}$ are $200\\text{ mm Hg}$ and $41.5\\text{ mm Hg}$ respectively. Vapour pressure of the solution obtained by mixing $25.5\\text{ g}$ of $\\text{CHCl}_3$ and $40\\text{ g}$ of $\\text{CH}_2\\text{Cl}_2$ at the same temperature will be:\n(Molecular mass of $\\text{CHCl}_3 = 119.5\\text{ u}$ and molecular mass of $\\text{CH}_2\\text{Cl}_2 = 85\\text{ u}$)",
    options: [
      "$173.9\\text{ mm Hg}$",
      "$615.0\\text{ mm Hg}$",
      "$90.6\\text{ mm Hg}$",
      "$285.5\\text{ mm Hg}$"
    ],
    correct_option: "C",
    explanation: "1. Moles of chloroform ($\\text{CHCl}_3$):\n$$n_1 = \\frac{25.5}{119.5} \\approx 0.2134\\text{ mol}$$\n\n2. Moles of dichloromethane ($\\text{CH}_2\\text{Cl}_2$):\n$$n_2 = \\frac{40}{85} \\approx 0.4706\\text{ mol}$$\n\n3. Total moles:\n$$n_{\\text{total}} = 0.2134 + 0.4706 = 0.6840\\text{ mol}$$\n\n4. Mole fractions:\n$$x_1 = \\frac{0.2134}{0.6840} \\approx 0.312, \\quad x_2 = \\frac{0.4706}{0.6840} \\approx 0.688$$\n\n5. Total vapour pressure by Raoult's law:\n$$P_{\\text{total}} = x_1 P_1^\\circ + x_2 P_2^\\circ = (0.312 \\times 200) + (0.688 \\times 41.5)$$\n$$= 62.4 + 28.552 = 90.952\\text{ mm Hg} \\approx 90.6\\text{ mm Hg}$$"
  },
  {
    question_number: 32,
    question_text: "$p_A$ and $p_B$ are the vapour pressure of pure liquid components, $A$ and $B$, respectively of an ideal binary solution. If $x_A$ represents the mole fraction of component $A$, the total pressure of the solution will be:",
    options: [
      "$p_A + x_A(p_B - p_A)$",
      "$p_A + x_A(p_A - p_B)$",
      "$p_B + x_A(p_B - p_A)$",
      "$p_B + x_A(p_A - p_B)$"
    ],
    correct_option: "D",
    explanation: "According to Raoult's law for an ideal binary solution:\n$$P_{\\text{total}} = P_A + P_B = x_A p_A + x_B p_B$$\nSince $x_A + x_B = 1 \\implies x_B = 1 - x_A$:\n$$P_{\\text{total}} = x_A p_A + (1 - x_A) p_B = x_A p_A + p_B - x_A p_B$$\n$$P_{\\text{total}} = p_B + x_A(p_A - p_B)$$"
  },
  {
    question_number: 33,
    question_text: "A $0.1\\text{ molal}$ aqueous solution of a weak acid is $30\\%$ ionized. If $K_f$ for water is $1.86^\\circ\\text{C/m}$, the freezing point of the solution will be:",
    options: [
      "$-0.18^\\circ\\text{C}$",
      "$-0.54^\\circ\\text{C}$",
      "$-0.36^\\circ\\text{C}$",
      "$-0.24^\\circ\\text{C}$"
    ],
    correct_option: "D",
    explanation: "For a weak monobasic acid $\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-$ ($n = 2$):\n$$i = 1 + (n - 1)\\alpha = 1 + (2 - 1)(0.30) = 1.3$$\n\nDepression in freezing point:\n$$\\Delta T_f = i \\cdot K_f \\cdot m = 1.3 \\times 1.86 \\times 0.1 = 0.2418^\\circ\\text{C} \\approx 0.24^\\circ\\text{C}$$\n\nFreezing point of the solution:\n$$T_f = T_f^\\circ - \\Delta T_f = 0^\\circ\\text{C} - 0.24^\\circ\\text{C} = -0.24^\\circ\\text{C}$$"
  },
  {
    question_number: 34,
    question_text: "$200\\text{ mL}$ of an aqueous solution of a protein contains its $1.26\\text{ g}$. The osmotic pressure of this solution at $300\\text{ K}$ is found to be $2.57 \\times 10^{-3}\\text{ bar}$. The molar mass of protein will be ($R = 0.083\\text{ L bar mol}^{-1}\\text{ K}^{-1}$):",
    options: [
      "$51022\\text{ g mol}^{-1}$",
      "$122044\\text{ g mol}^{-1}$",
      "$31011\\text{ g mol}^{-1}$",
      "$61038\\text{ g mol}^{-1}$"
    ],
    correct_option: "D",
    explanation: "Using the formula for osmotic pressure:\n$$\\Pi = \\frac{w}{M \\cdot V} R T \\implies M = \\frac{w \\cdot R \\cdot T}{\\Pi \\cdot V}$$\nGiven:\n- $w = 1.26\\text{ g}$\n- $V = 200\\text{ mL} = 0.200\\text{ L}$\n- $T = 300\\text{ K}$\n- $\\Pi = 2.57 \\times 10^{-3}\\text{ bar}$\n- $R = 0.083\\text{ L bar mol}^{-1}\\text{ K}^{-1}$\n\n$$M = \\frac{1.26 \\times 0.083 \\times 300}{2.57 \\times 10^{-3} \\times 0.200} = \\frac{31.374}{5.14 \\times 10^{-4}} \\approx 61038.9\\text{ g mol}^{-1} \\approx 61038\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 35,
    question_text: "The freezing point depression constant for water is $-1.86^\\circ\\text{C m}^{-1}$. If $5.00\\text{ g Na}_2\\text{SO}_4$ is dissolved in $45.0\\text{ g H}_2\\text{O}$, the freezing point is changed by $-3.82^\\circ\\text{C}$. Calculate the van't Hoff factor for $\\text{Na}_2\\text{SO}_4$.",
    options: [
      "2.05",
      "2.63",
      "3.11",
      "0.381"
    ],
    correct_option: "B",
    explanation: "Given:\n- Mass of $\\text{Na}_2\\text{SO}_4$, $w_2 = 5.00\\text{ g}$\n- Molar mass of $\\text{Na}_2\\text{SO}_4 = (23 \\times 2) + 32 + (16 \\times 4) = 142\\text{ g mol}^{-1}$\n- Mass of solvent $\\text{H}_2\\text{O}$, $w_1 = 45.0\\text{ g}$\n- $\\Delta T_f = 3.82^\\circ\\text{C}$\n- $K_f = 1.86^\\circ\\text{C m}^{-1}$\n\nMolality of solution:\n$$m = \\frac{w_2 \\times 1000}{M_2 \\times w_1} = \\frac{5.00 \\times 1000}{142 \\times 45.0} = \\frac{5000}{6390} \\approx 0.78247\\text{ m}$$\n\nUsing $\\Delta T_f = i \\cdot K_f \\cdot m$:\n$$i = \\frac{\\Delta T_f}{K_f \\cdot m} = \\frac{3.82}{1.86 \\times 0.78247} = \\frac{3.82}{1.4554} \\approx 2.625 \\approx 2.63$$"
  },
  {
    question_number: 36,
    question_text: "The van't Hoff factor $i$ for a compound which undergoes dissociation in one solvent and association in other solvent is respectively:",
    options: [
      "less than one and greater than one",
      "less than one and less than one",
      "greater than one and less than one",
      "greater than one and greater than one."
    ],
    correct_option: "C",
    explanation: "- When a solute dissociates into ions, the total number of particles increases, so the observed colligative property is greater than normal, meaning $i > 1$.\n- When a solute undergoes association (e.g., dimerization of carboxylic acids in benzene), the total number of particles decreases, so $i < 1$.\n\nHence, $i$ is greater than one and less than one, respectively."
  },
  {
    question_number: 37,
    question_text: "An aqueous solution is $1.00\\text{ molal}$ in $\\text{KI}$. Which change will cause the vapour pressure of the solution to increase?",
    options: [
      "Addition of $\\text{NaCl}$",
      "Addition of $\\text{Na}_2\\text{SO}_4$",
      "Addition of $1.00\\text{ molal KI}$",
      "Addition of water"
    ],
    correct_option: "D",
    explanation: "According to Raoult's law:\n$$P_{\\text{solution}} = x_{\\text{solvent}} P^\\circ$$\nTo increase the vapour pressure of the solution, the mole fraction of the solvent ($x_{\\text{solvent}}$) must increase.\n- Adding more non-volatile solutes ($\\text{NaCl}, \\text{Na}_2\\text{SO}_4, \\text{KI}$) will increase solute particles and further lower the vapour pressure.\n- Adding water (solvent) dilutes the solution, increases $x_{\\text{solvent}}$, and therefore causes the vapour pressure of the solution to increase."
  },
  {
    question_number: 38,
    question_text: "A solution of sucrose (molar mass $= 342\\text{ g mol}^{-1}$) has been prepared by dissolving $68.5\\text{ g}$ of sucrose in $1000\\text{ g}$ of water. The freezing point of the solution obtained will be ($K_f\\text{ for water} = 1.86\\text{ K kg mol}^{-1}$):",
    options: [
      "$-0.372^\\circ\\text{C}$",
      "$-0.520^\\circ\\text{C}$",
      "$+0.372^\\circ\\text{C}$",
      "$-0.570^\\circ\\text{C}$"
    ],
    correct_option: "A",
    explanation: "Moles of sucrose:\n$$n = \\frac{68.5}{342} = 0.20\\text{ mol}$$\nSince $1000\\text{ g}$ of water is used as solvent, the molality is:\n$$m = 0.20\\text{ mol kg}^{-1}$$\n\nDepression in freezing point for sucrose (non-electrolyte, $i = 1$):\n$$\\Delta T_f = K_f \\cdot m = 1.86 \\times 0.20 = 0.372^\\circ\\text{C}$$\n\nFreezing point of the solution:\n$$T_f = T_f^\\circ - \\Delta T_f = 0^\\circ\\text{C} - 0.372^\\circ\\text{C} = -0.372^\\circ\\text{C}$$"
  },
  {
    question_number: 39,
    question_text: "A $0.0020\\text{ m}$ aqueous solution of an ionic compound $[\\text{Co(NH}_3)_5(\\text{NO}_2)]\\text{Cl}$ freezes at $-0.00732^\\circ\\text{C}$. Number of moles of ions which $1\\text{ mol}$ of ionic compound produces on being dissolved in water will be ($K_f = 1.86^\\circ\\text{C/m}$):",
    options: [
      "3",
      "4",
      "1",
      "2"
    ],
    correct_option: "D",
    explanation: "Given:\n- Molality $m = 0.0020\\text{ m}$\n- Observed depression in freezing point $\\Delta T_f = 0.00732^\\circ\\text{C}$\n- $K_f = 1.86^\\circ\\text{C/m}$\n\nUsing $\\Delta T_f = i \\cdot K_f \\cdot m$:\n$$i = \\frac{\\Delta T_f}{K_f \\cdot m} = \\frac{0.00732}{1.86 \\times 0.0020} = \\frac{0.00732}{0.00372} \\approx 1.968 \\approx 2$$\n\nSince $i = 2$, $1\\text{ mol}$ of the ionic compound produces $2\\text{ moles of ions}$ in water (viz. $[\\text{Co(NH}_3)_5(\\text{NO}_2)]^+$ and $\\text{Cl}^-$)."
  },
  {
    question_number: 40,
    question_text: "$0.5\\text{ molal}$ aqueous solution of a weak acid ($\\text{HX}$) is $20\\%$ ionised. If $K_f$ for water is $1.86\\text{ K kg mol}^{-1}$, the lowering in freezing point of the solution is:",
    options: [
      "0.56 K",
      "1.12 K",
      "-0.56 K",
      "-1.12 K"
    ],
    correct_option: "B",
    explanation: "For the dissociation $\\text{HX} \\rightleftharpoons \\text{H}^+ + \\text{X}^-$ ($n = 2$):\n$$i = 1 + (n - 1)\\alpha = 1 + (2 - 1)(0.20) = 1.20$$\n\nLowering in freezing point:\n$$\\Delta T_f = i \\cdot K_f \\cdot m = 1.20 \\times 1.86 \\times 0.5 = 1.116\\text{ K} \\approx 1.12\\text{ K}$$"
  },
  {
    question_number: 41,
    question_text: "During osmosis, flow of water through a semipermeable membrane is:",
    options: [
      "from solution having lower concentration only",
      "from solution having higher concentration only",
      "from both sides of semipermeable membrane with equal flow rates",
      "from both sides of semipermeable membrane with unequal flow rates."
    ],
    correct_option: "D",
    explanation: "At the microscopic level, solvent (water) molecules cross the semipermeable membrane in both directions simultaneously. However, because the chemical potential (escaping tendency) of solvent molecules is higher in the dilute solution than in the concentrated solution, the rate of solvent flow from the dilute to the concentrated side is greater than in the reverse direction. Thus, water flows from both sides with unequal flow rates, creating a net solvent transport towards the more concentrated solution."
  },
  {
    question_number: 42,
    question_text: "A solution of acetone in ethanol:",
    options: [
      "obeys Raoult's law",
      "shows a negative deviation from Raoult's law",
      "shows a positive deviation from Raoult's law",
      "behaves like a near ideal solution."
    ],
    correct_option: "C",
    explanation: "In pure ethanol, molecules are strongly held together by intermolecular hydrogen bonds. When acetone is added, acetone molecules occupy spaces between ethanol molecules and partially break the existing hydrogen-bonded network. Consequently, the solute-solvent ($A-B$) intermolecular forces are weaker than the solvent-solvent ($A-A$) forces, increasing the escaping tendency of the liquid molecules and causing positive deviation from Raoult's law."
  },
  {
    question_number: 43,
    question_text: "$1.00\\text{ g}$ of a non-electrolyte solute (molar mass $250\\text{ g mol}^{-1}$) was dissolved in $51.2\\text{ g}$ of benzene. If the freezing point depression constant, $K_f$ of benzene is $5.12\\text{ K kg mol}^{-1}$, the freezing point of benzene will be lowered by:",
    options: [
      "0.2 K",
      "0.4 K",
      "0.3 K",
      "0.5 K"
    ],
    correct_option: "B",
    explanation: "Molality of the solution:\n$$m = \\frac{w_2 \\times 1000}{M_2 \\times w_1} = \\frac{1.00 \\times 1000}{250 \\times 51.2} = \\frac{1000}{12800} = 0.078125\\text{ m}$$\n\nDepression in freezing point:\n$$\\Delta T_f = K_f \\cdot m = 5.12 \\times 0.078125 = 0.40\\text{ K}$$"
  },
  {
    question_number: 44,
    question_text: "A solution containing $10\\text{ g per dm}^3$ of urea (molecular mass $= 60\\text{ g mol}^{-1}$) is isotonic with a $5\\%$ solution of a nonvolatile solute. The molecular mass of this nonvolatile solute is:",
    options: [
      "$200\\text{ g mol}^{-1}$",
      "$250\\text{ g mol}^{-1}$",
      "$300\\text{ g mol}^{-1}$",
      "$350\\text{ g mol}^{-1}$"
    ],
    correct_option: "C",
    explanation: "Two non-electrolyte solutions are isotonic when they have equal molar concentrations ($C_1 = C_2$):\n1. For urea solution:\n$$C_1 = \\frac{10\\text{ g dm}^{-3}}{60\\text{ g mol}^{-1}} = \\frac{1}{6}\\text{ mol dm}^{-3}$$\n\n2. For $5\\%$ solution of non-volatile solute ($5\\text{ g}$ per $100\\text{ mL} = 50\\text{ g per dm}^3$):\n$$C_2 = \\frac{50}{M_2}$$\n\nEquating $C_1 = C_2$:\n$$\\frac{1}{6} = \\frac{50}{M_2} \\implies M_2 = 50 \\times 6 = 300\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 45,
    question_text: "The vapour pressure of two liquids $\\text{P}$ and $\\text{Q}$ are $80$ and $60\\text{ torr}$, respectively. The total vapour pressure of solution obtained by mixing $3\\text{ mole of P}$ and $2\\text{ mole of Q}$ would be:",
    options: [
      "72 torr",
      "140 torr",
      "68 torr",
      "20 torr"
    ],
    correct_option: "A",
    explanation: "Total moles $= 3 + 2 = 5\\text{ moles}$.\nMole fractions:\n$$x_P = \\frac{3}{5} = 0.6, \\quad x_Q = \\frac{2}{5} = 0.4$$\n\nApplying Raoult's law:\n$$P_{\\text{total}} = x_P P_P^\\circ + x_Q P_Q^\\circ = (0.6 \\times 80) + (0.4 \\times 60) = 48 + 24 = 72\\text{ torr}$$"
  },
  {
    question_number: 46,
    question_text: "A solution has a $1 : 4$ mole ratio of pentane to hexane. The vapour pressures of the pure hydrocarbons at $20^\\circ\\text{C}$ are $440\\text{ mm Hg}$ for pentane and $120\\text{ mm Hg}$ for hexane. The mole fraction of pentane in the vapour phase would be:",
    options: [
      "0.200",
      "0.549",
      "0.786",
      "0.478"
    ],
    correct_option: "D",
    explanation: "In liquid phase:\n$$x_{\\text{pentane}} = \\frac{1}{1 + 4} = 0.20, \\quad x_{\\text{hexane}} = \\frac{4}{1 + 4} = 0.80$$\n\nPartial vapour pressures:\n$$P_{\\text{pentane}} = x_{\\text{pentane}} P_{\\text{pentane}}^\\circ = 0.20 \\times 440 = 88\\text{ mm Hg}$$\n$$P_{\\text{hexane}} = x_{\\text{hexane}} P_{\\text{hexane}}^\\circ = 0.80 \\times 120 = 96\\text{ mm Hg}$$\nTotal vapour pressure:\n$$P_{\\text{total}} = 88 + 96 = 184\\text{ mm Hg}$$\n\nMole fraction of pentane in vapour phase ($y_{\\text{pentane}}$):\n$$y_{\\text{pentane}} = \\frac{P_{\\text{pentane}}}{P_{\\text{total}}} = \\frac{88}{184} \\approx 0.47826 \\approx 0.478$$"
  },
  {
    question_number: 47,
    question_text: "A solution of urea (mol. mass $56\\text{ g mol}^{-1}$) boils at $100.18^\\circ\\text{C}$ at the atmospheric pressure. If $K_f$ and $K_b$ for water are $1.86$ and $0.512\\text{ K kg mol}^{-1}$ respectively, the above solution will freeze at:",
    options: [
      "$0.654^\\circ\\text{C}$",
      "$-0.654^\\circ\\text{C}$",
      "$6.54^\\circ\\text{C}$",
      "$-6.54^\\circ\\text{C}$"
    ],
    correct_option: "B",
    explanation: "Elevation in boiling point:\n$$\\Delta T_b = 100.18^\\circ\\text{C} - 100.00^\\circ\\text{C} = 0.18^\\circ\\text{C}$$\nUsing $\\Delta T_b = K_b \\cdot m$ and $\\Delta T_f = K_f \\cdot m$:\n$$\\frac{\\Delta T_f}{\\Delta T_b} = \\frac{K_f}{K_b} \\implies \\Delta T_f = \\Delta T_b \\times \\frac{K_f}{K_b}$$\n$$\\Delta T_f = 0.18 \\times \\frac{1.86}{0.512} = \\frac{0.3348}{0.512} \\approx 0.6539^\\circ\\text{C} \\approx 0.654^\\circ\\text{C}$$\n\nFreezing point of the solution:\n$$T_f = 0^\\circ\\text{C} - \\Delta T_f = -0.654^\\circ\\text{C}$$"
  },
  {
    question_number: 48,
    question_text: "Camphor is often used in molecular mass determination because:",
    options: [
      "it is readily available",
      "it has a very high cryoscopic constant",
      "it is volatile",
      "it is solvent for organic substances"
    ],
    correct_option: "B",
    explanation: "In Rast's method of determining molecular mass, camphor is chosen as the solvent because it has an exceptionally high cryoscopic constant ($K_f \\approx 40\\text{ K kg mol}^{-1}$). This causes a very large and easily measurable depression in freezing point even for very dilute solutions of solute, minimizing experimental error."
  },
  {
    question_number: 49,
    question_text: "A solution containing components A and B follows Raoult's law:",
    options: [
      "A - B attraction force is greater than A - A and B - B",
      "A - B attraction force is less than A - A and B - B",
      "A - B attraction force remains same as A - A and B - B",
      "volume of solution is different from sum of volume of solute and solvent."
    ],
    correct_option: "C",
    explanation: "A solution obeys Raoult's law (i.e. is an ideal solution) when the intermolecular attractive forces between unlike molecules ($A-B$) are equal in magnitude to the intermolecular attractive forces between like molecules ($A-A$ and $B-B$)."
  },
  {
    question_number: 50,
    question_text: "A solution contains non volatile solute of molecular mass $M_2$. Which of the following can be used to calculate the molecular mass of solute in terms of osmotic pressure?",
    options: [
      "$M_2 = \\left(\\frac{m_2}{\\pi}\\right) V R T$",
      "$M_2 = \\left(\\frac{m_2}{V}\\right) \\frac{R T}{\\pi}$",
      "$M_2 = \\left(\\frac{m_2}{V}\\right) \\pi R T$",
      "$M_2 = \\left(\\frac{m_2}{\\pi}\\right) \\frac{V}{R T}$"
    ],
    correct_option: "B",
    explanation: "Osmotic pressure is given by:\n$$\\pi = C R T = \\frac{n_2}{V} R T = \\frac{m_2}{M_2 V} R T$$\nRearranging for molecular mass $M_2$:\n$$M_2 = \\left(\\frac{m_2}{V}\\right) \\frac{R T}{\\pi}$$\nwhere $m_2$ is the mass of the solute dissolved in volume $V$."
  }
];

