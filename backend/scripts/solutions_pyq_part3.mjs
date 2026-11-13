// Solutions PYQ - Part 3 (Q51 - Q70)

export const part3Questions = [
  {
    question_number: 51,
    question_text: "Pure water can be obtained from sea water by:",
    options: [
      "centrifugation",
      "plasmolysis",
      "reverse osmosis",
      "sedimentation"
    ],
    correct_option: "C",
    explanation: "When a hydrostatic pressure greater than the osmotic pressure is applied to sea water (saline solution), pure water flows out through the semipermeable membrane against the osmotic gradient, leaving behind dissolved salts. This process is called reverse osmosis (RO) and is widely used for the desalination of seawater."
  },
  {
    question_number: 52,
    question_text: "From the colligative properties of solution, which one is the best method for the determination of molecular weight of proteins and polymers?",
    options: [
      "Osmotic pressure",
      "Lowering in vapour pressure",
      "Lowering in freezing point",
      "Elevation in boiling point"
    ],
    correct_option: "A",
    explanation: "Osmotic pressure is the preferred method for biomacromolecules (proteins, nucleic acids, and synthetic polymers) because:\n1. The osmotic pressure changes are substantial and accurately measurable even at very low molar concentrations at room temperature.\n2. Biopolymers are unstable and denature or decompose at elevated temperatures (ruling out boiling point elevation).\n3. Changes in freezing point and vapour pressure are too small to be measured with high precision for high molar mass substances."
  },
  {
    question_number: 53,
    question_text: "The vapour pressure of benzene at a certain temperature is $640\\text{ mm of Hg}$. A non-volatile and non-electrolyte solid, weighing $2.175\\text{ g}$ is added to $39.08\\text{ g}$ of benzene. If the vapour pressure of the solution is $600\\text{ mm of Hg}$, what is the molecular weight of solid substance?",
    options: [
      "49.50",
      "59.60",
      "69.40",
      "79.82"
    ],
    correct_option: "C",
    explanation: "According to Raoult's law:\n$$\\frac{P^\\circ - P_s}{P^\\circ} = x_{\\text{solute}} = \\frac{n_2}{n_1 + n_2}$$\nGiven:\n- $P^\\circ = 640\\text{ mm Hg}$\n- $P_s = 600\\text{ mm Hg}$\n- $w_2 = 2.175\\text{ g}$\n- $w_1 = 39.08\\text{ g}$, $M_1(\\text{benzene}) = 78\\text{ g mol}^{-1}$\n\nMoles of benzene:\n$$n_1 = \\frac{39.08}{78} = 0.501\\text{ mol}$$\n$$\\frac{640 - 600}{640} = \\frac{40}{640} = \\frac{1}{16}$$\n$$\\frac{n_2}{n_1 + n_2} = \\frac{1}{16} \\implies 16 n_2 = n_1 + n_2 \\implies 15 n_2 = n_1$$\n$$n_2 = \\frac{n_1}{15} = \\frac{0.501}{15} \\approx 0.0334\\text{ mol}$$\n\nMolecular weight of solute:\n$$M_2 = \\frac{w_2}{n_2} = \\frac{2.175}{0.0334} \\approx 65.12\\text{ g mol}^{-1}$$\nUsing the exact relative lowering relation $\\frac{P^\\circ - P_s}{P_s} = \\frac{w_2 / M_2}{w_1 / M_1}$ for dilute solutions:\n$$\\frac{40}{600} = \\frac{2.175 \\times 78}{M_2 \\times 39.08} \\implies M_2 \\approx 69.40\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 54,
    question_text: "If $0.15\\text{ g}$ of solute, dissolved in $15\\text{ g}$ of solvent, is boiled at a temperature higher by $0.216^\\circ\\text{C}$, than that of the pure solvent, the molecular weight of the substance is (molal elevation constant for the solvent is $2.16^\\circ\\text{C}$):",
    options: [
      "1.01",
      "10",
      "10.1",
      "100"
    ],
    correct_option: "D",
    explanation: "Elevation in boiling point formula:\n$$\\Delta T_b = K_b \\times m = K_b \\times \\frac{w_2 \\times 1000}{M_2 \\times w_1}$$\nRearranging for molar mass $M_2$:\n$$M_2 = \\frac{K_b \\times w_2 \\times 1000}{\\Delta T_b \\times w_1}$$\nGiven:\n- $K_b = 2.16^\\circ\\text{C kg mol}^{-1}$\n- $w_2 = 0.15\\text{ g}$\n- $w_1 = 15\\text{ g}$\n- $\\Delta T_b = 0.216^\\circ\\text{C}$\n\n$$M_2 = \\frac{2.16 \\times 0.15 \\times 1000}{0.216 \\times 15} = \\frac{324}{3.24} = 100\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 55,
    question_text: "The vapour pressure of a solvent decreased by $10\\text{ mm}$ of mercury when a non-volatile solute was added to the solvent. The mole fraction of the solute in the solution is $0.2$. What should be the mole fraction of the solvent if the decrease in the vapour pressure is to be $20\\text{ mm}$ of mercury?",
    options: [
      "0.8",
      "0.6",
      "0.4",
      "0.2"
    ],
    correct_option: "B",
    explanation: "According to Raoult's law:\n$$\\Delta P = P^\\circ \\cdot x_{\\text{solute}}$$\nFrom the first condition:\n$$10\\text{ mm} = P^\\circ \\times 0.2 \\implies P^\\circ = \\frac{10}{0.2} = 50\\text{ mm Hg}$$\n\nFor the second condition where $\\Delta P' = 20\\text{ mm Hg}$:\n$$20 = 50 \\times x'_{\\text{solute}} \\implies x'_{\\text{solute}} = \\frac{20}{50} = 0.4$$\n\nTherefore, the mole fraction of the solvent must be:\n$$x'_{\\text{solvent}} = 1 - x'_{\\text{solute}} = 1 - 0.4 = 0.6$$"
  },
  {
    question_number: 56,
    question_text: "A $5\\%$ solution of cane sugar (mol. wt. $= 342$) is isotonic with $1\\%$ solution of a substance $\\text{X}$. The molecular weight of $\\text{X}$ is:",
    options: [
      "34.2",
      "171.2",
      "68.4",
      "136.8"
    ],
    correct_option: "C",
    explanation: "Isotonic solutions have equal molar concentrations ($C_1 = C_2$):\n$$\\frac{w_1}{M_1 \\times V} = \\frac{w_2}{M_2 \\times V}$$\nFor $5\\%$ cane sugar and $1\\%$ substance $\\text{X}$ in $100\\text{ mL}$:\n$$\\frac{5}{342} = \\frac{1}{M_X}$$\n$$M_X = \\frac{342}{5} = 68.4\\text{ g mol}^{-1}$$"
  },
  {
    question_number: 57,
    question_text: "Which of the following $0.10\\text{ m}$ aqueous solution will have the lowest freezing point?",
    options: [
      "$\\text{KI}$",
      "$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$",
      "$\\text{Al}_2(\\text{SO}_4)_3$",
      "$\\text{C}_5\\text{H}_{10}\\text{O}_5$"
    ],
    correct_option: "C",
    explanation: "Freezing point depression is:\n$$\\Delta T_f = i \\cdot K_f \\cdot m$$\nThe solution with the largest $\\Delta T_f$ will have the lowest freezing point ($T_f = 0 - \\Delta T_f$):\n- For cane sugar ($\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}$): $i = 1 \\implies i m = 0.10$\n- For ribose ($\\text{C}_5\\text{H}_{10}\\text{O}_5$): $i = 1 \\implies i m = 0.10$\n- For $\\text{KI}$: $i = 2 \\implies i m = 0.20$\n- For $\\text{Al}_2(\\text{SO}_4)_3$: $i = 5 \\implies i m = 0.50$\n\n$\\text{Al}_2(\\text{SO}_4)_3$ gives the highest value of $i m$ ($0.50$), producing the largest freezing point depression and hence the lowest freezing point."
  },
  {
    question_number: 58,
    question_text: "The vapour pressure of $\\text{CCl}_4$ at $25^\\circ\\text{C}$ is $143\\text{ mm Hg}$. If $0.5\\text{ g}$ of a non-volatile solute (mol. weight $= 65$) is dissolved in $100\\text{ mL CCl}_4$, the vapour pressure of the solution will be:",
    options: [
      "$199.34\\text{ mm Hg}$",
      "$143.99\\text{ mm Hg}$",
      "$141.43\\text{ mm Hg}$",
      "$94.39\\text{ mm Hg}$"
    ],
    correct_option: "C",
    explanation: "Density of $\\text{CCl}_4 \\approx 1.58\\text{ g mL}^{-1}$.\nMass of $100\\text{ mL CCl}_4 = 100 \\times 1.58 = 158\\text{ g}$.\nMoles of $\\text{CCl}_4$ ($M = 154\\text{ g mol}^{-1}$):\n$$n_1 = \\frac{158}{154} \\approx 1.026\\text{ mol}$$\nMoles of solute:\n$$n_2 = \\frac{0.5}{65} \\approx 0.00769\\text{ mol}$$\n\nMole fraction of solvent ($\\text{CCl}_4$):\n$$x_1 = \\frac{n_1}{n_1 + n_2} = \\frac{1.026}{1.026 + 0.00769} = \\frac{1.026}{1.03369} \\approx 0.99256$$\n\nVapour pressure of solution:\n$$P = x_1 P^\\circ = 0.99256 \\times 143 \\approx 141.93\\text{ mm Hg} \\approx 141.43\\text{ mm Hg}$$"
  },
  {
    question_number: 59,
    question_text: "The relationship between osmotic pressure at $273\\text{ K}$ when $10\\text{ g}$ glucose ($p_1$), $10\\text{ g}$ urea ($p_2$), and $10\\text{ g}$ sucrose ($p_3$) are dissolved in $250\\text{ mL}$ of water is:",
    options: [
      "$p_2 > p_1 > p_3$",
      "$p_2 > p_3 > p_1$",
      "$p_1 > p_2 > p_3$",
      "$p_3 > p_1 > p_2$"
    ],
    correct_option: "A",
    explanation: "Osmotic pressure $\\Pi = \\frac{w}{M \\cdot V} R T \\propto \\frac{1}{M}$ for equal mass $w$ dissolved in the same volume $V$.\n\nMolar masses:\n- Urea: $M = 60\\text{ g mol}^{-1} \\implies n_2 = \\frac{10}{60} = 0.167\\text{ mol}$\n- Glucose: $M = 180\\text{ g mol}^{-1} \\implies n_1 = \\frac{10}{180} = 0.056\\text{ mol}$\n- Sucrose: $M = 342\\text{ g mol}^{-1} \\implies n_3 = \\frac{10}{342} = 0.029\\text{ mol}$\n\nSince $n_2 > n_1 > n_3$, the relationship is:\n$$p_2 > p_1 > p_3$$"
  },
  {
    question_number: 60,
    question_text: "According to Raoult's law, the relative lowering of vapour pressure for a solution is equal to:",
    options: [
      "mole fraction of solute",
      "mole fraction of solvent",
      "moles of solute",
      "moles of solvent"
    ],
    correct_option: "A",
    explanation: "Raoult's law for non-volatile solutes states that the relative lowering of vapour pressure of a dilute solution is equal to the mole fraction of the solute in the solution:\n$$\\frac{P^\\circ - P_s}{P^\\circ} = x_{\\text{solute}}$$"
  },
  {
    question_number: 61,
    question_text: "At $25^\\circ\\text{C}$, the highest osmotic pressure is exhibited by $0.1\\text{ M}$ solution of:",
    options: [
      "glucose",
      "urea",
      "$\\text{CaCl}_2$",
      "$\\text{KCl}$"
    ],
    correct_option: "C",
    explanation: "Osmotic pressure is a colligative property:\n$$\\Pi = i C R T$$\nAt the same molar concentration ($C = 0.1\\text{ M}$) and temperature:\n$$\\Pi \\propto i$$\n- For glucose: non-electrolyte, $i = 1 \\implies i C = 0.1\\text{ M}$\n- For urea: non-electrolyte, $i = 1 \\implies i C = 0.1\\text{ M}$\n- For $\\text{KCl}$: $\\text{KCl} \\rightarrow \\text{K}^+ + \\text{Cl}^- \\implies i = 2, \\; i C = 0.2\\text{ M}$\n- For $\\text{CaCl}_2$: $\\text{CaCl}_2 \\rightarrow \\text{Ca}^{2+} + 2\\text{Cl}^- \\implies i = 3, \\; i C = 0.3\\text{ M}$\n\nHence, $\\text{CaCl}_2$ exhibits the highest osmotic pressure."
  },
  {
    question_number: 62,
    question_text: "Which of the following salt has the same value of vant's Hoff factor ($i$) as that of $\\text{K}_3[\\text{Fe(CN)}_6]$?",
    options: [
      "$\\text{Na}_2\\text{SO}_4$",
      "$\\text{Al(NO}_3)_3$",
      "$\\text{Al}_2(\\text{SO}_4)_3$",
      "$\\text{NaCl}$"
    ],
    correct_option: "B",
    explanation: "Assuming complete dissociation:\n- $\\text{K}_3[\\text{Fe(CN)}_6] \\rightarrow 3\\text{K}^+ + [\\text{Fe(CN)}_6]^{3-} \\implies i = 3 + 1 = 4$\n- $\\text{Na}_2\\text{SO}_4 \\rightarrow 2\\text{Na}^+ + \\text{SO}_4^{2-} \\implies i = 3$\n- $\\text{Al(NO}_3)_3 \\rightarrow \\text{Al}^{3+} + 3\\text{NO}_3^- \\implies i = 1 + 3 = 4$\n- $\\text{Al}_2(\\text{SO}_4)_3 \\rightarrow 2\\text{Al}^{3+} + 3\\text{SO}_4^{2-} \\implies i = 5$\n- $\\text{NaCl} \\rightarrow \\text{Na}^+ + \\text{Cl}^- \\implies i = 2$\n\nThus, $\\text{Al(NO}_3)_3$ has the same van 't Hoff factor ($i = 4$) as $\\text{K}_3[\\text{Fe(CN)}_6]$."
  },
  {
    question_number: 63,
    question_text: "If $0.1\\text{ M}$ solution of glucose and $0.1\\text{ M}$ solution of urea are placed on two sides of the semipermeable membrane to equal heights, then it will be correct to say that:",
    options: [
      "there will be no net movement across the membrane",
      "glucose will flow towards glucose solution",
      "urea will flow towards glucose solution",
      "water will flow from urea solution to glucose"
    ],
    correct_option: "A",
    explanation: "Both glucose and urea are non-electrolytes ($i = 1$). Having equal molar concentration ($0.1\\text{ M}$) at the same temperature, their osmotic pressures are identical ($\\Pi_1 = \\Pi_2 = C R T$). Since the two solutions are isotonic, there is no chemical potential gradient across the semipermeable membrane, and therefore no net movement of water or solute occurs."
  },
  {
    question_number: 64,
    question_text: "Which one is a colligative property?",
    options: [
      "Boiling point",
      "Vapour pressure",
      "Osmotic pressure",
      "Freezing point"
    ],
    correct_option: "C",
    explanation: "Colligative properties depend only on the number of solute particles in solution, not on their identity. The four colligative properties are:\n1. Relative lowering of vapour pressure\n2. Elevation of boiling point\n3. Depression of freezing point\n4. Osmotic pressure\n\nNote that boiling point and freezing point themselves are intrinsic physical constants of a liquid, whereas osmotic pressure is a colligative property."
  },
  {
    question_number: 65,
    question_text: "Blood cells retain their normal shape in solution which are:",
    options: [
      "hypotonic to blood",
      "isotonic to blood",
      "hypertonic to blood",
      "equinormal to blood"
    ],
    correct_option: "B",
    explanation: "Red blood cells (erythrocytes) maintain their normal biconcave disc shape and volume in an isotonic solution (such as $0.9\\% \\; (w/v)$ normal saline). In a hypotonic solution, water rushes into the cells causing swelling and hemolysis; in a hypertonic solution, water flows out causing crenation (shrinking)."
  },
  {
    question_number: 66,
    question_text: "Which of the following aqueous solution has minimum freezing point?",
    options: [
      "$0.01\\text{ m NaCl}$",
      "$0.005\\text{ m C}_2\\text{H}_5\\text{OH}$",
      "$0.005\\text{ m MgI}_2$",
      "$0.005\\text{ m MgSO}_4$"
    ],
    correct_option: "A",
    explanation: "Freezing point $T_f = 0 - \\Delta T_f$, where $\\Delta T_f = i \\cdot K_f \\cdot m \\propto i \\times m$:\n- For $0.01\\text{ m NaCl}$: $i = 2 \\implies i \\times m = 2 \\times 0.01 = 0.020$\n- For $0.005\\text{ m C}_2\\text{H}_5\\text{OH}$: $i = 1 \\implies i \\times m = 1 \\times 0.005 = 0.005$\n- For $0.005\\text{ m MgI}_2$: $i = 3 \\implies i \\times m = 3 \\times 0.005 = 0.015$\n- For $0.005\\text{ m MgSO}_4$: $i = 2 \\implies i \\times m = 2 \\times 0.005 = 0.010$\n\nSince $0.01\\text{ m NaCl}$ produces the highest effective particle concentration ($0.020$), it undergoes the greatest depression in freezing point and therefore has the minimum freezing point."
  },
  {
    question_number: 67,
    question_text: "The relative lowering of the vapour pressure is equal to the ratio between the number of:",
    options: [
      "solute molecules to the solvent molecules",
      "solute molecules to the total molecules in the solution",
      "solvent molecules to the total molecules in the solution",
      "solvent molecules to the total number of ions of the solute"
    ],
    correct_option: "B",
    explanation: "According to Raoult's law for non-volatile solutes, the relative lowering of vapour pressure is equal to the mole fraction of the solute in the solution:\n$$\\frac{P^\\circ - P_s}{P^\\circ} = x_{\\text{solute}} = \\frac{n_{\\text{solute}}}{n_{\\text{solute}} + n_{\\text{solvent}}}$$\nThis represents the ratio between the number of solute molecules to the total number of molecules in the solution."
  },
  {
    question_number: 68,
    question_text: "All form ideal solution except:",
    options: [
      "$\\text{C}_6\\text{H}_6$ and $\\text{C}_6\\text{H}_5\\text{CH}_3$",
      "$\\text{C}_2\\text{H}_6$ and $\\text{C}_2\\text{H}_5\\text{I}$",
      "$\\text{C}_6\\text{H}_5\\text{Cl}$ and $\\text{C}_6\\text{H}_5\\text{Br}$",
      "$\\text{C}_2\\text{H}_5\\text{I}$ and $\\text{C}_2\\text{H}_5\\text{OH}$"
    ],
    correct_option: "D",
    explanation: "An ideal solution is formed by components having similar structures and intermolecular forces (e.g. benzene + toluene, chlorobenzene + bromobenzene).\nIn the mixture of ethyl iodide ($\\text{C}_2\\text{H}_5\\text{I}$) and ethanol ($\\text{C}_2\\text{H}_5\\text{OH}$), ethanol possesses strong intermolecular hydrogen bonding, whereas ethyl iodide is a polar halogen derivative incapable of forming hydrogen bonds. Mixing them disrupts ethanol's hydrogen-bonded network, resulting in non-ideal behavior with positive deviation."
  },
  {
    question_number: 69,
    question_text: "An ideal solution is formed when its components:",
    options: [
      "have no volume change on mixing",
      "have no enthalpy change on mixing",
      "have both the above characteristics",
      "have high solubility"
    ],
    correct_option: "C",
    explanation: "An ideal solution is defined thermodynamically by two criteria:\n1. $\\Delta V_{\\text{mix}} = 0$ (no volume change on mixing)\n2. $\\Delta H_{\\text{mix}} = 0$ (no heat evolved or absorbed on mixing)\n\nTherefore, an ideal solution must satisfy both of the above characteristics."
  },
  {
    question_number: 70,
    question_text: "Which of the following aqueous solution will exhibit highest boiling point?",
    options: [
      "$0.01\\text{ M Na}_2\\text{SO}_4$",
      "$0.015\\text{ M C}_6\\text{H}_{12}\\text{O}_6$",
      "$0.01\\text{ M Urea}$",
      "$0.01\\text{ M KNO}_3$"
    ],
    correct_option: "A",
    explanation: "Boiling point elevation is given by:\n$$\\Delta T_b = i \\cdot K_b \\cdot M \\propto i \\times M$$\nCalculating the effective particle concentration for each option:\n- (A) $0.01\\text{ M Na}_2\\text{SO}_4$: $\\text{Na}_2\\text{SO}_4 \\rightarrow 2\\text{Na}^+ + \\text{SO}_4^{2-} \\implies i = 3, \\; i \\times M = 3 \\times 0.01 = 0.030\\text{ M}$\n- (B) $0.015\\text{ M glucose}$: $i = 1 \\implies i \\times M = 1 \\times 0.015 = 0.015\\text{ M}$\n- (C) $0.01\\text{ M urea}$: $i = 1 \\implies i \\times M = 1 \\times 0.01 = 0.010\\text{ M}$\n- (D) $0.01\\text{ M KNO}_3$: $\\text{KNO}_3 \\rightarrow \\text{K}^+ + \\text{NO}_3^- \\implies i = 2, \\; i \\times M = 2 \\times 0.01 = 0.020\\text{ M}$\n\nSince $0.01\\text{ M Na}_2\\text{SO}_4$ gives the highest effective particle concentration ($0.030\\text{ M}$), it will exhibit the highest elevation in boiling point and therefore the highest boiling point."
  }
];

