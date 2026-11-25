export const THERMO_PART1 = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "The heat required to raise the temperature of body by $1\\text{ K}$ is called :",
    options: [
      "specific heat",
      "thermal capacity",
      "water equivalent",
      "none of these"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The heat required to raise the temperature of the entire body by $1\\text{ K}$ (or $1^\\circ\\text{C}$) is defined as its thermal capacity (or heat capacity).\nSpecific heat is the heat required per unit mass ($1\\text{ g}$ or $1\\text{ kg}$), whereas thermal capacity refers to the entire body."
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "If an endothermic reaction is non-spontaneous at freezing point of water and becomes feasible at its boiling point, then :",
    options: [
      "$\\Delta H$ is $-\\text{ve}$, $\\Delta S$ is $+\\text{ve}$",
      "$\\Delta H$ and $\\Delta S$ both are $+\\text{ve}$",
      "$\\Delta H$ and $\\Delta S$ both are $-\\text{ve}$",
      "$\\Delta H$ is $+\\text{ve}$, $\\Delta S$ is $-\\text{ve}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Given that the reaction is endothermic, $\\Delta H > 0$ ($+\\text{ve}$).\nFor spontaneity, $\\Delta G = \\Delta H - T\\Delta S < 0$.\nAt low temperature (freezing point of water, $273\\text{ K}$), the reaction is non-spontaneous ($\\Delta G > 0$), meaning $\\Delta H > T\\Delta S$.\nAt higher temperature (boiling point of water, $373\\text{ K}$), it becomes feasible ($\\Delta G < 0$), which requires $T\\Delta S > \\Delta H$.\nThis transition can only occur if $\\Delta S$ is positive ($+\\text{ve}$).\nHence, both $\\Delta H$ and $\\Delta S$ are positive ($+\\text{ve}$)."
  },
  {
    qNum: 3,
    exam: "JEE Main 2002",
    question: "A heat engine absorbs heat $Q_1$ at temperature $T_1$ and heat $Q_2$ at temperature $T_2$. Work done by the engine is $J(Q_1 + Q_2)$. This data :",
    options: [
      "violates $1^{\\text{st}}$ law of thermodynamics",
      "violates $1^{\\text{st}}$ law of thermodynamics if $Q_1$ is $-\\text{ve}$",
      "violates $1^{\\text{st}}$ law of thermodynamics if $Q_2$ is $-\\text{ve}$",
      "does not violate $1^{\\text{st}}$ law of thermodynamics"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to the first law of thermodynamics, for a cyclic process operating a heat engine, all absorbed heat cannot be fully converted into work without some losses or heat rejection to the sink in accordance with the second law, and the work done cannot simply be equal to total heat without accounting for the energy conservation and system limits: $W = Q_1 + Q_2$ assumes 100% conversion if both are positive or without proper sign convention of energy balance, violating the foundational formulations."
  },
  {
    qNum: 4,
    exam: "JEE Main 2002",
    question: "The internal energy change when a system goes from state A to B is $40\\text{ kJ/mole}$. If the system goes from A to B by a reversible path and returns to state A by an irreversible path what would be the net change in internal energy?",
    options: [
      "$40\\text{ kJ}$",
      "$-40\\text{ kJ}$",
      "$\\text{zero}$",
      "$>40\\text{ kJ}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Internal energy ($U$) is a state function. For any cyclic process that returns to the original initial state (here $\\text{A} \\rightarrow \\text{B} \\rightarrow \\text{A}$):\n$$\\Delta U_{\\text{cycle}} = \\Delta U_{\\text{A}\\rightarrow\\text{B}} + \\Delta U_{\\text{B}\\rightarrow\\text{A}} = 0$$\nRegardless of whether the forward or return paths are reversible or irreversible, the net change in internal energy is always zero."
  },
  {
    qNum: 5,
    exam: "JEE Main 2003",
    question: "The enthalpy change for a reaction does not depend upon :",
    options: [
      "use of different reactants for the same product",
      "the nature of intermediate reaction steps",
      "the differences in initial or final temperatures of involved substances",
      "the physical states of reactants and products"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Enthalpy ($H$) is a state function. According to Hess's law of constant heat summation, the total enthalpy change for a chemical reaction depends only on the initial and final states of the system, and is independent of the intermediate steps or pathway taken."
  },
  {
    qNum: 6,
    exam: "JEE Main 2004",
    question: "If at $298\\text{ K}$ the bond energies of $\\text{C}-\\text{H}$, $\\text{C}-\\text{C}$, $\\text{C}=\\text{C}$ and $\\text{H}-\\text{H}$ bonds are respectively $414$, $347$, $615$ and $435\\text{ kJ mol}^{-1}$, the value of enthalpy change for the reaction $\\text{H}_2\\text{C}=\\text{CH}_2(\\text{g}) + \\text{H}_2(\\text{g}) \\rightarrow \\text{H}_3\\text{C}-\\text{CH}_3(\\text{g})$ at $298\\text{ K}$ will be :",
    options: [
      "$-250\\text{ kJ}$",
      "$+125\\text{ kJ}$",
      "$-125\\text{ kJ}$",
      "$+250\\text{ kJ}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The reaction is:\n$$\\text{CH}_2=\\text{CH}_2(\\text{g}) + \\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_3-\\text{CH}_3(\\text{g})$$\nEnthalpy change in terms of bond energies is:\n$$\\Delta H = \\sum \\text{B.E. (reactants)} - \\sum \\text{B.E. (products)}$$\n$$\\Delta H = [1\\times\\text{B.E.}(\\text{C}=\\text{C}) + 4\\times\\text{B.E.}(\\text{C}-\\text{H}) + 1\\times\\text{B.E.}(\\text{H}-\\text{H})] - [1\\times\\text{B.E.}(\\text{C}-\\text{C}) + 6\\times\\text{B.E.}(\\text{C}-\\text{H})]$$\n$$\\Delta H = \\text{B.E.}(\\text{C}=\\text{C}) + \\text{B.E.}(\\text{H}-\\text{H}) - \\text{B.E.}(\\text{C}-\\text{C}) - 2\\times\\text{B.E.}(\\text{C}-\\text{H})$$\nSubstituting the values:\n$$\\Delta H = 615 + 435 - 347 - 2(414) = 1050 - 347 - 828 = 1050 - 1175 = -125\\text{ kJ}$$"
  },
  {
    qNum: 7,
    exam: "JEE Main 2004",
    question: "In an irreversible process taking place at constant $T$ and $P$ and in which only pressure-volume work is being done, the change in Gibbs free energy ($dG$) and change in entropy ($dS$), satisfy the criteria :",
    options: [
      "$(dS)_{V,E} > 0, (dG)_{T,P} < 0$",
      "$(dS)_{V,E} = 0, (dG)_{T,P} = 0$",
      "$(dS)_{V,E} = 0, (dG)_{T,P} > 0$",
      "$(dS)_{V,E} < 0, (dG)_{T,P} < 0$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For a spontaneous, irreversible process:\n1. At constant $T$ and $P$: $(dG)_{T,P} < 0$.\n2. At constant $V$ and internal energy $E$ (isolated system): $(dS)_{V,E} > 0$.\nHence, $(dS)_{V,E} > 0$ and $(dG)_{T,P} < 0$ satisfy the spontaneity criteria."
  },
  {
    qNum: 8,
    exam: "JEE Main 2004",
    question: "An ideal gas expands in volume from $1 \\times 10^{-3}\\text{ m}^3$ to $1 \\times 10^{-2}\\text{ m}^3$ at $300\\text{ K}$ against a constant pressure of $1 \\times 10^5\\text{ N m}^{-2}$. The work done is :",
    options: [
      "$-900\\text{ J}$",
      "$-900\\text{ kJ}$",
      "$270\\text{ kJ}$",
      "$+900\\text{ kJ}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Work done in irreversible expansion against constant external pressure:\n$$w = -P_{\\text{ext}}\\Delta V = -P_{\\text{ext}}(V_2 - V_1)$$\n$$w = - (1 \\times 10^5\\text{ N m}^{-2})(1 \\times 10^{-2}\\text{ m}^3 - 1 \\times 10^{-3}\\text{ m}^3)$$\n$$w = -10^5 \\times (0.01 - 0.001) = -10^5 \\times 0.009 = -900\\text{ J}$$"
  },
  {
    qNum: 9,
    exam: "JEE Main 2004",
    question: "The enthalpies of combustion of carbon and carbon monoxide are $-393.5$ and $-283\\text{ kJ mol}^{-1}$ respectively. The enthalpy of formation of carbon monoxide per mole is :",
    options: [
      "$110.5\\text{ kJ}$",
      "$-110.5\\text{ kJ}$",
      "$-676.5\\text{ kJ}$",
      "$676.5\\text{ kJ}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Given:\n(1) $\\text{C}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g})$, $\\Delta H_1 = -393.5\\text{ kJ mol}^{-1}$\n(2) $\\text{CO}(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g})$, $\\Delta H_2 = -283\\text{ kJ mol}^{-1}$\n\nThe formation reaction of $\\text{CO}(\\text{g})$ is:\n$$\\text{C}(\\text{s}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}(\\text{g})$$\nSubtracting equation (2) from equation (1):\n$$\\Delta H_f = \\Delta H_1 - \\Delta H_2 = -393.5 - (-283) = -110.5\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 10,
    exam: "JEE Main 2005",
    question: "Consider the reaction: $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$ carried out at constant temperature and pressure. If $\\Delta H$ and $\\Delta U$ are the enthalpy and internal energy changes for the reaction, which of the following expressions is true?",
    options: [
      "$\\Delta H = 0$",
      "$\\Delta H = \\Delta U$",
      "$\\Delta H < \\Delta U$",
      "$\\Delta H > \\Delta U$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "We know that:\n$$\\Delta H = \\Delta U + \\Delta n_g RT$$\nFor the reaction $\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightarrow 2\\text{NH}_3(\\text{g})$:\n$$\\Delta n_g = 2 - (1 + 3) = -2$$\nTherefore:\n$$\\Delta H = \\Delta U - 2RT$$\nSince $2RT > 0$, it follows that:\n$$\\Delta H < \\Delta U$$"
  },
  {
    qNum: 11,
    exam: "JEE Main 2005",
    question: "If the bond dissociation energies of $\\text{XY}$, $\\text{X}_2$ and $\\text{Y}_2$ (all diatomic molecules) are in the ratio of $1 : 1 : 0.5$ and $\\Delta H_f$ for the formation of $\\text{XY}$ is $-200\\text{ kJ mole}^{-1}$. The bond dissociation energy of $\\text{X}_2$ will be :",
    options: [
      "$100\\text{ kJ mol}^{-1}$",
      "$200\\text{ kJ mol}^{-1}$",
      "$300\\text{ kJ mol}^{-1}$",
      "$800\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 3, // D (None of these in original options which equals 800)
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Let the bond dissociation energy of $\\text{X}_2$ be $a\\text{ kJ mol}^{-1}$.\nThen B.E. of $\\text{XY} = a$ and B.E. of $\\text{Y}_2 = 0.5a$.\nThe formation reaction of $\\text{XY}$ is:\n$$\\frac{1}{2}\\text{X}_2 + \\frac{1}{2}\\text{Y}_2 \\rightarrow \\text{XY}$$\n$$\\Delta H_f = \\frac{1}{2}\\text{B.E.}(\\text{X}_2) + \\frac{1}{2}\\text{B.E.}(\\text{Y}_2) - \\text{B.E.}(\\text{XY})$$\n$$-200 = \\frac{1}{2}(a) + \\frac{1}{2}(0.5a) - a = 0.5a + 0.25a - a = -0.25a$$\n$$-0.25a = -200 \\implies a = \\frac{200}{0.25} = 800\\text{ kJ mol}^{-1}$$\nSince $800\\text{ kJ mol}^{-1}$ is not among 100, 200, 300, the correct answer is None of these (Option D)."
  },
  {
    qNum: 12,
    exam: "JEE Main 2006",
    question: "$(\\Delta H - \\Delta U)$ for the formation of carbon monoxide (CO) from its elements at $298\\text{ K}$ is : ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$-1238.78\\text{ J mol}^{-1}$",
      "$1238.78\\text{ J mol}^{-1}$",
      "$-2477.57\\text{ J mol}^{-1}$",
      "$2477.57\\text{ J mol}^{-1}$"
    ],
    correct_option: 0, // A - wait, let's check: C(s) + 1/2 O2(g) -> CO(g) => \Delta n_g = 1 - 0.5 = +0.5. Wait! Official key is A: -1238.78 J/mol.
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the formation of $\\text{CO}$ from its elements:\n$$\\text{C}(\\text{s}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}(\\text{g})$$\n$$\\Delta n_g = 1 - \\frac{1}{2} = 0.5$$\n$$\\Delta H - \\Delta U = \\Delta n_g RT = 0.5 \\times 8.314 \\times 298 = 1238.78\\text{ J mol}^{-1}$$\nNote: By the official answer key, option (A) $-1238.78\\text{ J mol}^{-1}$ is the designated key."
  },
  {
    qNum: 13,
    exam: "JEE Main 2006",
    question: "An ideal gas is allowed to expand both reversibly and irreversibly in an isolated system. If $T_i$ is the initial temperature and $T_f$ is the final temperature, which of the following statements is correct?",
    options: [
      "$(T_f)_{\\text{irrev}} > (T_f)_{\\text{rev}}$",
      "$T_f > T_i$ for reversible process but $T_f = T_i$ for irreversible process",
      "$(T_f)_{\\text{rev}} = (T_f)_{\\text{irrev}}$",
      "$T_f = T_i$ for both reversible and irreversible processes"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "In an isolated system, $q = 0$ (adiabatic process).\nFrom the first law of thermodynamics, $\\Delta U = w$.\nFor expansion, work is done by the gas ($w < 0$), so $\\Delta U < 0$ and temperature decreases ($T_f < T_i$).\nIn a reversible adiabatic expansion, maximum work is done by the system ($|w_{\\text{rev}}| > |w_{\\text{irrev}}|$).\nThus, more internal energy is lost in the reversible process than in the irreversible process, leading to a greater temperature drop in the reversible case:\n$$(T_f)_{\\text{irrev}} > (T_f)_{\\text{rev}}$$"
  },
  {
    qNum: 14,
    exam: "JEE Main 2006",
    question: "The enthalpy changes for the following processes are listed below :\n$$\\text{Cl}_2(\\text{g}) \\rightarrow 2\\text{Cl}(\\text{g}), \\quad 242.3\\text{ kJ mol}^{-1}$$\n$$\\text{I}_2(\\text{g}) \\rightarrow 2\\text{I}(\\text{g}), \\quad 151.0\\text{ kJ mol}^{-1}$$\n$$\\text{ICl}(\\text{g}) \\rightarrow \\text{I}(\\text{g}) + \\text{Cl}(\\text{g}), \\quad 211.3\\text{ kJ mol}^{-1}$$\n$$\\text{I}_2(\\text{s}) \\rightarrow \\text{I}_2(\\text{g}), \\quad 62.76\\text{ kJ mol}^{-1}$$\nGiven that the standard states for iodine and chlorine are $\\text{I}_2(\\text{s})$ and $\\text{Cl}_2(\\text{g})$, the standard enthalpy of formation for $\\text{ICl}(\\text{g})$ is :",
    options: [
      "$-14.6\\text{ kJ mol}^{-1}$",
      "$-16.8\\text{ kJ mol}^{-1}$",
      "$+16.8\\text{ kJ mol}^{-1}$",
      "$+244.8\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The formation reaction of $\\text{ICl}(\\text{g})$ from standard states is:\n$$\\frac{1}{2}\\text{I}_2(\\text{s}) + \\frac{1}{2}\\text{Cl}_2(\\text{g}) \\rightarrow \\text{ICl}(\\text{g})$$\n$$\\Delta H_f^\\circ = \\frac{1}{2}\\Delta H_{\\text{sub}}(\\text{I}_2) + \\frac{1}{2}\\text{B.E.}(\\text{I}_2) + \\frac{1}{2}\\text{B.E.}(\\text{Cl}_2) - \\text{B.E.}(\\text{ICl})$$\n$$\\Delta H_f^\\circ = \\frac{1}{2}(62.76) + \\frac{1}{2}(151.0) + \\frac{1}{2}(242.3) - 211.3$$\n$$\\Delta H_f^\\circ = 31.38 + 75.5 + 121.15 - 211.3 = 228.03 - 211.3 = +16.73\\text{ kJ mol}^{-1} \\approx +16.8\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 15,
    exam: "JEE Main 2006",
    question: "The standard enthalpy of formation ($\\Delta H_f^\\circ$) at $298\\text{ K}$ for methane, $\\text{CH}_4(\\text{g})$, is $-74.8\\text{ kJ mol}^{-1}$. The additional information required to determine the average energy for $\\text{C}-\\text{H}$ bond formation would be :",
    options: [
      "the dissociation energy of $\\text{H}_2$ and enthalpy of sublimation of carbon",
      "latent heat of vaporization of methane",
      "the first four ionization energies of carbon and electron gain enthalpy of hydrogen",
      "the dissociation energy of hydrogen molecule, $\\text{H}_2$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The formation of methane from its elements is:\n$$\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g})$$\nIn terms of bond and atomization energies:\n$$\\Delta H_f^\\circ = \\Delta H_{\\text{sub}}(\\text{C}) + 2\\Delta H_{\\text{diss}}(\\text{H}_2) - 4\\times\\text{B.E.}(\\text{C}-\\text{H})$$\nTo calculate the average bond energy of the $\\text{C}-\\text{H}$ bond, we need:\n1. Enthalpy of sublimation of carbon, $\\Delta H_{\\text{sub}}(\\text{C})$\n2. Bond dissociation energy of $\\text{H}_2$\nHence, option (A) is correct."
  },
  {
    qNum: 16,
    exam: "JEE Main 2007",
    question: "Assuming that water vapour is an ideal gas, the internal energy change ($\\Delta U$) when $1\\text{ mol}$ of water is vapourised at $1\\text{ bar}$ pressure and $100^\\circ\\text{C}$, (Given: Molar enthalpy of vapourization of water at $1\\text{ bar}$ and $373\\text{ K} = 41\\text{ kJ mol}^{-1}$ and $R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$) will be :",
    options: [
      "$4.100\\text{ kJ mol}^{-1}$",
      "$3.7904\\text{ kJ mol}^{-1}$",
      "$37.904\\text{ kJ mol}^{-1}$",
      "$41.00\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the vaporization of water:\n$$\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{H}_2\\text{O}(\\text{g})$$\n$$\\Delta n_g = 1 - 0 = 1$$\n$$\\Delta H = \\Delta U + \\Delta n_g RT \\implies \\Delta U = \\Delta H - \\Delta n_g RT$$\n$$\\Delta U = 41\\text{ kJ mol}^{-1} - (1 \\times 8.3 \\times 10^{-3}\\text{ kJ mol}^{-1}\\text{ K}^{-1} \\times 373\\text{ K})$$\n$$\\Delta U = 41 - 3.0959 = 37.904\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 17,
    exam: "JEE Main 2007",
    question: "In conversion of lime-stone to lime, $\\text{CaCO}_3(\\text{s}) \\rightarrow \\text{CaO}(\\text{s}) + \\text{CO}_2(\\text{g})$ the values of $\\Delta H^\\circ$ and $\\Delta S^\\circ$ are $+179.1\\text{ kJ mol}^{-1}$ and $160.2\\text{ J K}^{-1}\\text{ mol}^{-1}$ respectively at $298\\text{ K}$ and $1\\text{ bar}$. Assuming that $\\Delta H^\\circ$ and $\\Delta S^\\circ$ do not change with temperature, the temperature above which conversion of limestone to lime will be spontaneous is :",
    options: [
      "$1008\\text{ K}$",
      "$1200\\text{ K}$",
      "$845\\text{ K}$",
      "$1118\\text{ K}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "At equilibrium, $\\Delta G^\\circ = 0$:\n$$\\Delta H^\\circ - T\\Delta S^\\circ = 0 \\implies T = \\frac{\\Delta H^\\circ}{\\Delta S^\\circ}$$\n$$T = \\frac{179.1 \\times 10^3\\text{ J mol}^{-1}}{160.2\\text{ J K}^{-1}\\text{ mol}^{-1}} = 1117.98\\text{ K} \\approx 1118\\text{ K}$$\nAbove $1118\\text{ K}$, $T\\Delta S^\\circ > \\Delta H^\\circ$, so $\\Delta G^\\circ < 0$ and the reaction becomes spontaneous."
  },
  {
    qNum: 18,
    exam: "JEE Main 2008",
    question: "Identify the correct statement regarding a spontaneous process :",
    options: [
      "For a spontaneous process in an isolated system, the change in entropy is positive",
      "Endothermic processes are never spontaneous",
      "Exothermic processes are always spontaneous",
      "Lowering of energy in the reaction process is the only criterion for spontaneity"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to the second law of thermodynamics, for an isolated system ($q = 0$), the entropy change for any spontaneous process must be positive: $\\Delta S_{\\text{isolated}} > 0$."
  },
  {
    qNum: 19,
    exam: "JEE Main 2008",
    question: "Oxidising power of chlorine in aqueous solution can be determined by the parameters indicated below :\n$$\\frac{1}{2}\\text{Cl}_2(\\text{g}) \\xrightarrow{\\frac{1}{2}\\Delta_{\\text{diss}}H^\\circ} \\text{Cl}(\\text{g}) \\xrightarrow{\\Delta_{\\text{eg}}H^\\circ} \\text{Cl}^-(\\text{g}) \\xrightarrow{\\Delta_{\\text{hyd}}H^\\circ} \\text{Cl}^-(\\text{aq})$$\nThe energy involved in the conversion of $\\frac{1}{2}\\text{Cl}_2(\\text{g})$ to $\\text{Cl}^-(\\text{aq})$ (using the data: $\\Delta_{\\text{diss}}H_{\\text{Cl}_2}^\\circ = 240\\text{ kJ mol}^{-1}$, $\\Delta_{\\text{eg}}H_{\\text{Cl}}^\\circ = -349\\text{ kJ mol}^{-1}$, $\\Delta_{\\text{hyd}}H_{\\text{Cl}^-}^\\circ = -381\\text{ kJ mol}^{-1}$) will be :",
    options: [
      "$+152\\text{ kJ mol}^{-1}$",
      "$-610\\text{ kJ mol}^{-1}$",
      "$-850\\text{ kJ mol}^{-1}$",
      "$+120\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The overall enthalpy change is the sum of the individual steps:\n$$\\Delta H = \\frac{1}{2}\\Delta_{\\text{diss}}H^\\circ(\\text{Cl}_2) + \\Delta_{\\text{eg}}H^\\circ(\\text{Cl}) + \\Delta_{\\text{hyd}}H^\\circ(\\text{Cl}^-)$$\n$$\\Delta H = \\frac{1}{2}(240) + (-349) + (-381)$$\n$$\\Delta H = 120 - 349 - 381 = -610\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 20,
    exam: "JEE Main 2008",
    question: "Standard entropy of $\\text{X}_2$, $\\text{Y}_2$ and $\\text{XY}_3$ are $60$, $40$ and $50\\text{ J K}^{-1}\\text{ mol}^{-1}$, respectively. For the reaction:\n$$\\frac{1}{2}\\text{X}_2 + \\frac{3}{2}\\text{Y}_2 \\rightleftharpoons \\text{XY}_3, \\quad \\Delta H = -30\\text{ kJ}$$\nTo be at equilibrium, the temperature will be :",
    options: [
      "$1250\\text{ K}$",
      "$500\\text{ K}$",
      "$750\\text{ K}$",
      "$1000\\text{ K}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Calculate $\\Delta S^\\circ$ for the reaction:\n$$\\Delta S^\\circ = S^\\circ(\\text{XY}_3) - \\left[\\frac{1}{2}S^\\circ(\\text{X}_2) + \\frac{3}{2}S^\\circ(\\text{Y}_2)\\right]$$\n$$\\Delta S^\\circ = 50 - \\left[\\frac{1}{2}(60) + \\frac{3}{2}(40)\\right] = 50 - [30 + 60] = 50 - 90 = -40\\text{ J K}^{-1}\\text{ mol}^{-1}$$\nAt equilibrium, $\\Delta G = 0 \\implies \\Delta H = T\\Delta S$:\n$$T = \\frac{\\Delta H}{\\Delta S} = \\frac{-30 \\times 10^3\\text{ J}}{-40\\text{ J K}^{-1}} = 750\\text{ K}$$"
  },
  {
    qNum: 21,
    exam: "JEE Main 2009",
    question: "On the basis of the following thermochemical data: ($\\Delta_f H^\\circ(\\text{H}^+, \\text{aq}) = 0$)\n(1) $\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{H}^+(\\text{aq}) + \\text{OH}^-(\\text{aq}); \\quad \\Delta H = 57.32\\text{ kJ}$\n(2) $\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}); \\quad \\Delta H = -286.20\\text{ kJ}$\nThe value of enthalpy of formation of $\\text{OH}^-$ ion at $25^\\circ\\text{C}$ is :",
    options: [
      "$-19.88\\text{ kJ}$",
      "$-228.88\\text{ kJ}$",
      "$+228.88\\text{ kJ}$",
      "$-343.52\\text{ kJ}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Adding reactions (1) and (2):\n$$\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}^+(\\text{aq}) + \\text{OH}^-(\\text{aq})$$\n$$\\Delta H = -286.20 + 57.32 = -228.88\\text{ kJ}$$\nSince $\\Delta_f H^\\circ(\\text{H}^+, \\text{aq}) = 0$:\n$$\\Delta_f H^\\circ(\\text{OH}^-, \\text{aq}) = -228.88\\text{ kJ}$$"
  },
  {
    qNum: 22,
    exam: "JEE Main 2010",
    question: "The energy required to break one mole of $\\text{Cl}-\\text{Cl}$ bonds in $\\text{Cl}_2$ is $242\\text{ kJ mol}^{-1}$. The longest wavelength of light capable of breaking a single $\\text{Cl}-\\text{Cl}$ bond is : ($c = 3 \\times 10^8\\text{ m s}^{-1}$, $N_A = 6.02 \\times 10^{23}\\text{ mol}^{-1}$, $h = 6.626 \\times 10^{-34}\\text{ J s}$)",
    options: [
      "$594\\text{ nm}$",
      "$640\\text{ nm}$",
      "$700\\text{ nm}$",
      "$494\\text{ nm}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Energy required to break one bond:\n$$E = \\frac{242 \\times 10^3\\text{ J mol}^{-1}}{6.023 \\times 10^{23}\\text{ mol}^{-1}} = 4.018 \\times 10^{-19}\\text{ J}$$\n$$E = \\frac{hc}{\\lambda} \\implies \\lambda = \\frac{hc}{E}$$\n$$\\lambda = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{4.018 \\times 10^{-19}} = 4.947 \\times 10^{-7}\\text{ m} = 494\\text{ nm}$$"
  },
  {
    qNum: 23,
    exam: "JEE Main 2010",
    question: "The standard enthalpy of formation of $\\text{NH}_3$ is $-46.0\\text{ kJ mol}^{-1}$. If the enthalpy of formation of $\\text{H}$ from its atoms is $-436\\text{ kJ mol}^{-1}$ and that of $\\text{N}$ is $-712\\text{ kJ mol}^{-1}$, the average bond enthalpy of $\\text{N}-\\text{H}$ bond in $\\text{NH}_3$ is :",
    options: [
      "$-964\\text{ kJ mol}^{-1}$",
      "$+352\\text{ kJ mol}^{-1}$",
      "$+1056\\text{ kJ mol}^{-1}$",
      "$-1102\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The formation reaction is:\n$$\\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{3}{2}\\text{H}_2(\\text{g}) \\rightarrow \\text{NH}_3(\\text{g}), \\quad \\Delta H_f = -46.0\\text{ kJ mol}^{-1}$$\nBond dissociation energy of $\\text{N}_2 = 712\\text{ kJ mol}^{-1}$, and for $\\text{H}_2 = 436\\text{ kJ mol}^{-1}$.\n$$\\Delta H_f = \\frac{1}{2}\\text{B.E.}(\\text{N}_2) + \\frac{3}{2}\\text{B.E.}(\\text{H}_2) - 3\\times\\text{B.E.}(\\text{N}-\\text{H})$$\n$$-46.0 = \\frac{1}{2}(712) + \\frac{3}{2}(436) - 3\\times\\text{B.E.}(\\text{N}-\\text{H})$$\n$$-46.0 = 356 + 654 - 3\\times\\text{B.E.}(\\text{N}-\\text{H})$$\n$$3\\times\\text{B.E.}(\\text{N}-\\text{H}) = 1010 + 46.0 = 1056\\text{ kJ mol}^{-1}$$\n$$\\text{B.E.}(\\text{N}-\\text{H}) = \\frac{1056}{3} = +352\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 24,
    exam: "JEE Main 2010",
    question: "For a particular reversible reaction at temperature $T$, $\\Delta H$ and $\\Delta S$ were found to be both $+\\text{ve}$. If $T_e$ is the temperature at equilibrium, the reaction would be spontaneous when :",
    options: [
      "$T_e > T$",
      "$T > T_e$",
      "$T_e$ is $5$ times $T$",
      "$T = T_e$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "At equilibrium, $\\Delta G = 0 \\implies T_e = \\frac{\\Delta H}{\\Delta S}$.\nFor spontaneity, $\\Delta G = \\Delta H - T\\Delta S < 0$.\nSince both $\\Delta H$ and $\\Delta S$ are positive, this requires:\n$$T\\Delta S > \\Delta H \\implies T > \\frac{\\Delta H}{\\Delta S} = T_e$$\nTherefore, the reaction is spontaneous when $T > T_e$."
  },
  {
    qNum: 25,
    exam: "JEE Main 2010",
    question: "The entropy change involved in the isothermal reversible expansion of $2\\text{ moles}$ of an ideal gas from a volume of $10\\text{ dm}^3$ to a volume of $100\\text{ dm}^3$ at $27^\\circ\\text{C}$ is :",
    options: [
      "$35.8\\text{ J mol}^{-1}\\text{ K}^{-1}$",
      "$32.3\\text{ J mol}^{-1}\\text{ K}^{-1}$",
      "$42.3\\text{ J mol}^{-1}\\text{ K}^{-1}$",
      "$38.3\\text{ J mol}^{-1}\\text{ K}^{-1}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For isothermal reversible expansion of an ideal gas:\n$$\\Delta S = nR \\ln\\left(\\frac{V_2}{V_1}\\right) = 2.303 \\times nR \\log_{10}\\left(\\frac{V_2}{V_1}\\right)$$\nFor $n = 2\\text{ moles}$:\n$$\\Delta S = 2.303 \\times 2 \\times 8.314 \\times \\log_{10}\\left(\\frac{100}{10}\\right)$$\n$$\\Delta S = 4.606 \\times 8.314 \\times 1 = 38.3\\text{ J K}^{-1}$$"
  },
  {
    qNum: 26,
    exam: "JEE Main 2012 (Online)",
    question: "The incorrect expression among the following is :",
    options: [
      "$\\frac{\\Delta G_{\\text{system}}}{\\Delta S_{\\text{total}}} = -T$",
      "In isothermal process, $w_{\\text{reversible}} = -nRT\\ln\\frac{V_f}{V_i}$",
      "$\\ln K = \\frac{\\Delta H^\\circ - T\\Delta S^\\circ}{RT}$",
      "$K = e^{-\\Delta G^\\circ / RT}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "We know that $\\Delta G^\\circ = -RT \\ln K$, so:\n$$\\ln K = -\\frac{\\Delta G^\\circ}{RT} = -\\frac{\\Delta H^\\circ - T\\Delta S^\\circ}{RT} = \\frac{T\\Delta S^\\circ - \\Delta H^\\circ}{RT}$$\nThus, expression (C) gives the wrong sign and is incorrect."
  },
  {
    qNum: 27,
    exam: "JEE Main 2012 (07 May)",
    question: "The electron affinity of chlorine is $3.7\\text{ eV}$. $1\\text{ gram}$ of chlorine is completely converted to $\\text{Cl}^-$ ion in a gaseous state. ($1\\text{ eV} = 23.06\\text{ kcal mol}^{-1}$). Energy released in the process is :",
    options: [
      "$4.8\\text{ kcal}$",
      "$7.2\\text{ kcal}$",
      "$8.2\\text{ kcal}$",
      "$2.4\\text{ kcal}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Energy released per mole of chlorine atoms:\n$$E = 3.7 \\times 23.06\\text{ kcal mol}^{-1} = 85.322\\text{ kcal mol}^{-1}$$\nNumber of moles in $1\\text{ g}$ of atomic chlorine:\n$$n = \\frac{1}{35.5}\\text{ mol}$$\nTotal energy released:\n$$E_{\\text{total}} = \\frac{1}{35.5} \\times 85.322 \\approx 2.4\\text{ kcal}$$"
  },
  {
    qNum: 28,
    exam: "JEE Main 2012 (07 May)",
    question: "The entropy of a sample of a certain substance increases by $0.836\\text{ J K}^{-1}$ on adding reversibly $0.3344\\text{ J}$ of heat at constant temperature. The temperature of the sample is :",
    options: [
      "$2.5\\text{ K}$",
      "$0.34\\text{ K}$",
      "$0.016\\text{ K}$",
      "$0.4\\text{ K}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "From the definition of entropy change:\n$$\\Delta S = \\frac{q_{\\text{rev}}}{T} \\implies T = \\frac{q_{\\text{rev}}}{\\Delta S}$$\n$$T = \\frac{0.3344\\text{ J}}{0.836\\text{ J K}^{-1}} = 0.4\\text{ K}$$"
  },
  {
    qNum: 29,
    exam: "JEE Main 2012 (12 May)",
    question: "The difference between the reaction enthalpy change ($\\Delta_r H$) and reaction internal energy change ($\\Delta_r U$) for the reaction:\n$$2\\text{C}_6\\text{H}_6(\\text{l}) + 15\\text{O}_2(\\text{g}) \\rightarrow 12\\text{CO}_2(\\text{g}) + 6\\text{H}_2\\text{O}(\\text{l})$$\nat $300\\text{ K}$ is : ($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$0\\text{ J mol}^{-1}$",
      "$2490\\text{ J mol}^{-1}$",
      "$-2490\\text{ J mol}^{-1}$",
      "$-7482\\text{ J mol}^{-1}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the reaction:\n$$2\\text{C}_6\\text{H}_6(\\text{l}) + 15\\text{O}_2(\\text{g}) \\rightarrow 12\\text{CO}_2(\\text{g}) + 6\\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta n_g = n_g(\\text{products}) - n_g(\\text{reactants}) = 12 - 15 = -3$$\n$$\\Delta_r H - \\Delta_r U = \\Delta n_g RT = -3 \\times 8.314 \\times 300 = -7482.6\\text{ J mol}^{-1} \\approx -7482\\text{ J mol}^{-1}$$"
  },
  {
    qNum: 30,
    exam: "JEE Main 2012 (19 May)",
    question: "The enthalpy of neutralisation of $\\text{NH}_4\\text{OH}$ with $\\text{HCl}$ is $-51.46\\text{ kJ mol}^{-1}$ and the enthalpy of neutralisation of $\\text{NaOH}$ with $\\text{HCl}$ is $-55.90\\text{ kJ mol}^{-1}$. The enthalpy of ionisation of $\\text{NH}_4\\text{OH}$ is :",
    options: [
      "$-107.36\\text{ kJ mol}^{-1}$",
      "$-4.44\\text{ kJ mol}^{-1}$",
      "$+107.36\\text{ kJ mol}^{-1}$",
      "$+4.44\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Enthalpy of neutralisation of weak base ($\\text{NH}_4\\text{OH}$) with strong acid ($\\text{HCl}$):\n$$\\Delta H_{\\text{neut}} = \\Delta H_{\\text{ion}}(\\text{NH}_4\\text{OH}) + \\Delta H_{\\text{neut}}(\\text{strong acid/base})$$\n$$-51.46 = \\Delta H_{\\text{ion}}(\\text{NH}_4\\text{OH}) + (-55.90)$$\n$$\\Delta H_{\\text{ion}}(\\text{NH}_4\\text{OH}) = -51.46 + 55.90 = +4.44\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 31,
    exam: "JEE Main 2012 (26 May)",
    question: "One mole of an ideal gas is expanded isothermally and reversibly to half of its initial pressure. $\\Delta S$ for the process in $\\text{J K}^{-1}\\text{ mol}^{-1}$ is : [$\\ln 2 = 0.693$ and $R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$]",
    options: [
      "$6.76$",
      "$5.76$",
      "$10.76$",
      "$5.03$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For isothermal reversible expansion of $1\\text{ mol}$ of an ideal gas:\n$$\\Delta S = R \\ln\\left(\\frac{P_1}{P_2}\\right)$$\nGiven $P_2 = \\frac{1}{2}P_1$, so $\\frac{P_1}{P_2} = 2$:\n$$\\Delta S = 8.314 \\times \\ln 2 = 8.314 \\times 0.693 = 5.76\\text{ J K}^{-1}\\text{ mol}^{-1}$$"
  },
  {
    qNum: 32,
    exam: "JEE Main 2012 (07 Apr)",
    question: "A piston filled with $0.04\\text{ mol}$ of an ideal gas expands reversibly from $50.0\\text{ mL}$ to $375\\text{ mL}$ at a constant temperature of $37.0^\\circ\\text{C}$. As it does so, it absorbs $208\\text{ J}$ of heat. The values of $q$ and $w$ for the process will be : ($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$, $\\ln 7.5 = 2.01$)",
    options: [
      "$q = -208\\text{ J}, w = +208\\text{ J}$",
      "$q = +208\\text{ J}, w = +208\\text{ J}$",
      "$q = +208\\text{ J}, w = -208\\text{ J}$",
      "$q = -208\\text{ J}, w = -208\\text{ J}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Since temperature is constant ($37.0^\\circ\\text{C}$), the process is isothermal.\nFor an ideal gas in an isothermal process, $\\Delta U = 0$.\nFrom the first law of thermodynamics:\n$$\\Delta U = q + w = 0 \\implies q = -w$$\nSince heat is absorbed by the system, $q = +208\\text{ J}$.\nTherefore, $w = -q = -208\\text{ J}$ (work done by the system during expansion)."
  },
  {
    qNum: 33,
    exam: "JEE Main 2013 (09 Apr)",
    question: "Given:\n$$\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}); \\quad \\Delta H_{298\\text{ K}}^\\circ = -285.9\\text{ kJ mol}^{-1}$$\n$$\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{g}); \\quad \\Delta H_{298\\text{ K}}^\\circ = -241.8\\text{ kJ mol}^{-1}$$\nThe molar enthalpy of vapourisation of water will be :",
    options: [
      "$+44.1\\text{ kJ mol}^{-1}$",
      "$+93.0\\text{ kJ mol}^{-1}$",
      "$-44.1\\text{ kJ mol}^{-1}$",
      "$+527.7\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The vaporization reaction is:\n$$\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{H}_2\\text{O}(\\text{g})$$\nSubtracting the first equation from the second equation:\n$$\\Delta H_{\\text{vap}} = \\Delta H_2 - \\Delta H_1 = -241.8 - (-285.9) = +44.1\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 34,
    exam: "JEE Main 2013 (22 Apr)",
    question: "Given the following thermochemical data:\n$$\\text{Li}(\\text{s}) \\rightarrow \\text{Li}(\\text{g}), \\quad 161\\text{ kJ mol}^{-1}$$\n$$\\text{Li}(\\text{g}) \\rightarrow \\text{Li}^+(\\text{g}), \\quad 520\\text{ kJ mol}^{-1}$$\n$$\\frac{1}{2}\\text{F}_2(\\text{g}) \\rightarrow \\text{F}(\\text{g}), \\quad 77\\text{ kJ mol}^{-1}$$\n$$\\text{F}(\\text{g}) + e^- \\rightarrow \\text{F}^-(\\text{g}), \\quad \\Delta_{\\text{eg}}H$$\n$$\\text{Li}^+(\\text{g}) + \\text{F}^-(\\text{g}) \\rightarrow \\text{LiF}(\\text{s}), \\quad -1047\\text{ kJ mol}^{-1}$$\n$$\\text{Li}(\\text{s}) + \\frac{1}{2}\\text{F}_2(\\text{g}) \\rightarrow \\text{LiF}(\\text{s}), \\quad -617\\text{ kJ mol}^{-1}$$\nBased on the data provided, the value of electron gain enthalpy of fluorine would be :",
    options: [
      "$-300\\text{ kJ mol}^{-1}$",
      "$-350\\text{ kJ mol}^{-1}$",
      "$-328\\text{ kJ mol}^{-1}$",
      "$+328\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Using the Born-Haber cycle:\n$$\\Delta H_f^\\circ = \\Delta H_{\\text{sub}}(\\text{Li}) + \\text{I.E.}(\\text{Li}) + \\frac{1}{2}\\Delta H_{\\text{diss}}(\\text{F}_2) + \\Delta_{\\text{eg}}H(\\text{F}) + \\text{L.E.}(\\text{LiF})$$\n$$-617 = 161 + 520 + 77 + \\Delta_{\\text{eg}}H + (-1047)$$\n$$-617 = 758 - 1047 + \\Delta_{\\text{eg}}H$$\n$$-617 = -289 + \\Delta_{\\text{eg}}H$$\n$$\\Delta_{\\text{eg}}H = -617 + 289 = -328\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 35,
    exam: "JEE Main 2013 (23 Apr)",
    question: "Given:\n$$\\text{Li}(\\text{s}) \\rightarrow \\text{Li}(\\text{g}), \\quad 161\\text{ kJ}$$\n$$\\text{Li}(\\text{g}) \\rightarrow \\text{Li}^+(\\text{g}), \\quad 520\\text{ kJ}$$\n$$\\frac{1}{2}\\text{F}_2(\\text{g}) \\rightarrow \\text{F}(\\text{g}), \\quad 77\\text{ kJ}$$\n$$\\text{F}(\\text{g}) + e^- \\rightarrow \\text{F}^-(\\text{g}), \\quad \\text{Electron gain enthalpy}$$\n$$\\text{Li}^+(\\text{g}) + \\text{F}^-(\\text{g}) \\rightarrow \\text{LiF}(\\text{s}), \\quad -1047\\text{ kJ}$$\n$$\\text{Li}(\\text{s}) + \\frac{1}{2}\\text{F}_2(\\text{g}) \\rightarrow \\text{LiF}(\\text{s}), \\quad -617\\text{ kJ}$$\nBased on data provided, the value of electron gain enthalpy of fluorine would be :",
    options: [
      "$-300\\text{ kJ mol}^{-1}$",
      "$-350\\text{ kJ mol}^{-1}$",
      "$-328\\text{ kJ mol}^{-1}$",
      "$-228\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Applying Hess's law to the Born-Haber cycle:\n$$\\Delta H_f^\\circ = \\Delta H_{\\text{sub}} + \\text{I.E.} + \\frac{1}{2}\\text{B.E.} + \\Delta_{\\text{eg}}H + U$$\n$$-617 = 161 + 520 + 77 + \\Delta_{\\text{eg}}H - 1047$$\n$$-617 = -289 + \\Delta_{\\text{eg}}H$$\n$$\\Delta_{\\text{eg}}H = -617 + 289 = -328\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 36,
    exam: "JEE Main 2013 (23 Apr)",
    question: "Which of the following statements/relationships is not correct in thermodynamic changes?",
    options: [
      "$\\Delta U = 0$ (isothermal reversible expansion of an ideal gas)",
      "$w = -nRT\\ln\\frac{V_2}{V_1}$ (isothermal reversible expansion of an ideal gas)",
      "$w = -nRT\\ln\\frac{P_2}{P_1}$ (isothermal reversible expansion of an ideal gas)",
      "For a system of constant volume, heat involved directly changes to internal energy"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For isothermal reversible expansion of an ideal gas:\nSince $P_1 V_1 = P_2 V_2 \\implies \\frac{V_2}{V_1} = \\frac{P_1}{P_2}$, the work is:\n$$w = -nRT\\ln\\left(\\frac{V_2}{V_1}\\right) = -nRT\\ln\\left(\\frac{P_1}{P_2}\\right)$$\nOption (C) incorrectly writes $w = -nRT\\ln\\left(\\frac{P_2}{P_1}\\right)$, so it is the incorrect relationship."
  },
  {
    qNum: 37,
    exam: "JEE Main 2013 (25 Apr)",
    question: "Given that: (i) $\\Delta H_f^\\circ$ of $\\text{N}_2\\text{O}$ is $82\\text{ kJ mol}^{-1}$, (ii) Bond energies of $\\text{N}\\equiv\\text{N}$, $\\text{N}=\\text{N}$, $\\text{O}=\\text{O}$ and $\\text{N}=\\text{O}$ are $946$, $418$, $498$ and $607\\text{ kJ mol}^{-1}$ respectively. The resonance energy of $\\text{N}_2\\text{O}$ is :",
    options: [
      "$-88\\text{ kJ}$",
      "$-66\\text{ kJ}$",
      "$-8.8\\text{ kJ}$",
      "$-6.6\\text{ kJ}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The formation reaction is:\n$$\\text{N}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{N}=\\text{N}=\\text{O}(\\text{g})$$\nTheoretical enthalpy of formation:\n$$\\Delta H_{\\text{calc}} = [\\text{B.E.}(\\text{N}\\equiv\\text{N}) + \\frac{1}{2}\\text{B.E.}(\\text{O}=\\text{O})] - [\\text{B.E.}(\\text{N}=\\text{N}) + \\text{B.E.}(\\text{N}=\\text{O})]$$\n$$\\Delta H_{\\text{calc}} = [946 + \\frac{1}{2}(498)] - [418 + 607] = [946 + 249] - 1025 = 1195 - 1025 = 170\\text{ kJ mol}^{-1}$$\n$$\\text{Resonance energy} = \\Delta H_{\\text{actual}} - \\Delta H_{\\text{calc}} = 82 - 170 = -88\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 38,
    exam: "JEE Main 2013 (25 Apr)",
    question: "In which of the following exothermic reactions, the heat liberated per mole is the highest?",
    options: [
      "$\\text{CaO} + \\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2$",
      "$\\text{SrO} + \\text{H}_2\\text{O} \\rightarrow \\text{Sr(OH)}_2$",
      "$\\text{BaO} + \\text{H}_2\\text{O} \\rightarrow \\text{Ba(OH)}_2$",
      "$\\text{MgO} + \\text{H}_2\\text{O} \\rightarrow \\text{Mg(OH)}_2$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The slaking of quicklime ($\\text{CaO} + \\text{H}_2\\text{O} \\rightarrow \\text{Ca(OH)}_2$) is a highly exothermic process with a very large negative enthalpy of reaction (approximately $-65\\text{ kJ mol}^{-1}$), having the highest heat liberation among the alkaline earth metal oxides due to optimal hydration energy and lattice stability."
  },
  {
    qNum: 39,
    exam: "JEE Main 2014",
    question: "For complete combustion of ethanol,\n$$\\text{C}_2\\text{H}_5\\text{OH}(\\text{l}) + 3\\text{O}_2(\\text{g}) \\rightarrow 2\\text{CO}_2(\\text{g}) + 3\\text{H}_2\\text{O}(\\text{l})$$\nthe amount of heat produced as measured in bomb calorimeter, is $1364.47\\text{ kJ mol}^{-1}$ at $25^\\circ\\text{C}$. Assuming ideality the Enthalpy of combustion, $\\Delta H_c$, for the reaction will be : ($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$-1366.95\\text{ kJ mol}^{-1}$",
      "$-1361.95\\text{ kJ mol}^{-1}$",
      "$-1460.50\\text{ kJ mol}^{-1}$",
      "$-1350.50\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Heat measured in a bomb calorimeter is at constant volume, so $\\Delta U_c = -1364.47\\text{ kJ mol}^{-1}$.\n$$\\Delta n_g = 2 - 3 = -1$$\n$$\\Delta H_c = \\Delta U_c + \\Delta n_g RT$$\n$$\\Delta H_c = -1364.47 + (-1 \\times 8.314 \\times 10^{-3} \\times 298)$$\n$$\\Delta H_c = -1364.47 - 2.478 = -1366.95\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 40,
    exam: "JEE Main 2014",
    question: "The standard enthalpy of formation of $\\text{NH}_3$ is $-46.0\\text{ kJ mol}^{-1}$. If bond enthalpy of $\\text{H}_2$ is $436\\text{ kJ mol}^{-1}$ and that of $\\text{N}_2$ is $712\\text{ kJ mol}^{-1}$, the average bond enthalpy of $\\text{N}-\\text{H}$ bond in $\\text{NH}_3$ is :",
    options: [
      "$-964\\text{ kJ mol}^{-1}$",
      "$-1102\\text{ kJ mol}^{-1}$",
      "$1056\\text{ kJ mol}^{-1}$",
      "$352\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the formation of $\\text{NH}_3$:\n$$\\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{3}{2}\\text{H}_2(\\text{g}) \\rightarrow \\text{NH}_3(\\text{g}), \\quad \\Delta H_f = -46.0\\text{ kJ mol}^{-1}$$\n$$\\Delta H_f = \\left[\\frac{1}{2}\\text{B.E.}(\\text{N}_2) + \\frac{3}{2}\\text{B.E.}(\\text{H}_2)\\right] - 3\\times\\text{B.E.}(\\text{N}-\\text{H})$$\n$$-46.0 = \\frac{1}{2}(712) + \\frac{3}{2}(436) - 3\\times\\text{B.E.}(\\text{N}-\\text{H})$$\n$$3\\times\\text{B.E.}(\\text{N}-\\text{H}) = 356 + 654 + 46 = 1056\\text{ kJ mol}^{-1}$$\n$$\\text{B.E.}(\\text{N}-\\text{H}) = \\frac{1056}{3} = 352\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 41,
    exam: "JEE Main 2014 (11 Apr)",
    question: "The molar heat capacity ($C_p$) of $\\text{CD}_2\\text{O}$ is $10\\text{ cal K}^{-1}\\text{ mol}^{-1}$ at $1000\\text{ K}$. The change in entropy associated with cooling of $32\\text{ g}$ of $\\text{CD}_2\\text{O}$ vapour from $1000\\text{ K}$ to $100\\text{ K}$ at constant pressure will be : ($D = \\text{deuterium}$, atomic mass $= 2\\text{ u}$)",
    options: [
      "$23.03\\text{ cal deg}^{-1}$",
      "$-23.03\\text{ cal deg}^{-1}$",
      "$5.303\\text{ cal deg}^{-1}$",
      "$-5.303\\text{ cal deg}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Molar mass of $\\text{CD}_2\\text{O} = 12 + 2(2) + 16 = 32\\text{ g mol}^{-1}$.\nNumber of moles $n = \\frac{32\\text{ g}}{32\\text{ g mol}^{-1}} = 1\\text{ mol}$.\nAt constant pressure, entropy change is:\n$$\\Delta S = n C_p \\ln\\left(\\frac{T_2}{T_1}\\right) = 2.303 \\times n C_p \\log_{10}\\left(\\frac{T_2}{T_1}\\right)$$\n$$\\Delta S = 2.303 \\times 1 \\times 10 \\times \\log_{10}\\left(\\frac{100}{1000}\\right)$$\n$$\\Delta S = 23.03 \\times (-1) = -23.03\\text{ cal deg}^{-1}$$"
  },
  {
    qNum: 42,
    exam: "JEE Main 2014 (12 Apr)",
    question: "The standard enthalpy of formation ($\\Delta_f H_{298}^\\circ$) for methane, $\\text{CH}_4$ is $-74.9\\text{ kJ mol}^{-1}$. In order to calculate the average energy given out in the formation of a $\\text{C}-\\text{H}$ bond from this it is necessary to know which one of the following?",
    options: [
      "The dissociation energy of the hydrogen molecule, $\\text{H}_2$, and enthalpy of sublimation of carbon (graphite)",
      "The first four ionisation energies of carbon",
      "The dissociation energy of $\\text{H}_2$ only",
      "The first four ionisation energies of carbon and electron affinity of hydrogen"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the formation of methane:\n$$\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g})$$\n$$\\Delta_f H^\\circ = \\Delta H_{\\text{sub}}(\\text{C}) + 2\\times\\text{B.E.}(\\text{H}_2) - 4\\times\\text{B.E.}(\\text{C}-\\text{H})$$\nTo find the $\\text{C}-\\text{H}$ bond energy, we require both the dissociation energy of $\\text{H}_2$ and the sublimation enthalpy of carbon (graphite)."
  },
  {
    qNum: 43,
    exam: "JEE Main 2014 (12 Apr)",
    question: "The standard entropies ($S^\\circ$) of the following substances are:\n$$\\text{CH}_4(\\text{g}) = 186.2\\text{ J K}^{-1}\\text{ mol}^{-1}$$\n$$\\text{O}_2(\\text{g}) = 205.2\\text{ J K}^{-1}\\text{ mol}^{-1}$$\n$$\\text{CO}_2(\\text{g}) = 213.6\\text{ J K}^{-1}\\text{ mol}^{-1}$$\n$$\\text{H}_2\\text{O}(\\text{l}) = 69.9\\text{ J K}^{-1}\\text{ mol}^{-1}$$\nThe entropy change ($\\Delta S^\\circ$) for the reaction $\\text{CH}_4(\\text{g}) + 2\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + 2\\text{H}_2\\text{O}(\\text{l})$ is :",
    options: [
      "$-312.5\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$-242.8\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$-108.1\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$-37.6\\text{ J K}^{-1}\\text{ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Entropy change for the reaction is:\n$$\\Delta S^\\circ = \\sum S^\\circ(\\text{products}) - \\sum S^\\circ(\\text{reactants})$$\n$$\\Delta S^\\circ = [S^\\circ(\\text{CO}_2) + 2 S^\\circ(\\text{H}_2\\text{O})] - [S^\\circ(\\text{CH}_4) + 2 S^\\circ(\\text{O}_2)]$$\n$$\\Delta S^\\circ = [213.6 + 2(69.9)] - [186.2 + 2(205.2)]$$\n$$\\Delta S^\\circ = [213.6 + 139.8] - [186.2 + 410.4] = 353.4 - 596.6 = -243.2\\text{ J K}^{-1}\\text{ mol}^{-1} \\approx -242.8\\text{ J K}^{-1}\\text{ mol}^{-1}$$"
  },
  {
    qNum: 44,
    exam: "JEE Main 2015 (04 Apr)",
    question: "The following reaction is performed at $298\\text{ K}$ :\n$$2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}_2(\\text{g})$$\nThe standard free energy of formation of $\\text{NO}(\\text{g})$ is $86.6\\text{ kJ mol}^{-1}$ at $298\\text{ K}$. What is the standard free energy of formation of $\\text{NO}_2(\\text{g})$ at $298\\text{ K}$? ($K_p = 1.6 \\times 10^{12}$)",
    options: [
      "$0.5[2 \\times 86,600 - R(298)\\ln(1.6 \\times 10^{12})]$",
      "$R(298)\\ln(1.6 \\times 10^{12}) - 86,600$",
      "$86,600 + R(298)\\ln(1.6 \\times 10^{12})$",
      "$86,600 - \\frac{R(298)\\ln(1.6 \\times 10^{12})}{2}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "We know that $\\Delta_r G^\\circ = -RT\\ln K_p = -R(298)\\ln(1.6 \\times 10^{12})$.\nAlso:\n$$\\Delta_r G^\\circ = 2\\Delta_f G^\\circ(\\text{NO}_2) - [2\\Delta_f G^\\circ(\\text{NO}) + \\Delta_f G^\\circ(\\text{O}_2)]$$\n$$-R(298)\\ln(1.6 \\times 10^{12}) = 2\\Delta_f G^\\circ(\\text{NO}_2) - 2(86,600)$$\n$$2\\Delta_f G^\\circ(\\text{NO}_2) = 2(86,600) - R(298)\\ln(1.6 \\times 10^{12})$$\n$$\\Delta_f G^\\circ(\\text{NO}_2) = 0.5[2 \\times 86,600 - R(298)\\ln(1.6 \\times 10^{12})]$$"
  },
  {
    qNum: 45,
    exam: "JEE Main 2015 (10 Apr)",
    question: "The heat of atomization of methane and ethane are $360\\text{ kJ mol}^{-1}$ and $620\\text{ kJ mol}^{-1}$, respectively. The longest wavelength of light capable of breaking the $\\text{C}-\\text{C}$ bond is : (Avogadro's number $= 6.023 \\times 10^{23}$, $h = 6.62 \\times 10^{-34}\\text{ J s}$, $c = 3 \\times 10^8\\text{ m s}^{-1}$)",
    options: [
      "$2.48 \\times 10^4\\text{ nm}$",
      "$1.49 \\times 10^4\\text{ nm}$",
      "$2.48 \\times 10^3\\text{ nm}$",
      "$1.49 \\times 10^3\\text{ nm}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "In $\\text{CH}_4$, $4\\times\\text{B.E.}(\\text{C}-\\text{H}) = 360\\text{ kJ mol}^{-1} \\implies \\text{B.E.}(\\text{C}-\\text{H}) = 90\\text{ kJ mol}^{-1}$.\nIn $\\text{C}_2\\text{H}_6$, $\\text{B.E.}(\\text{C}-\\text{C}) + 6\\times\\text{B.E.}(\\text{C}-\\text{H}) = 620\\text{ kJ mol}^{-1}$:\n$$\\text{B.E.}(\\text{C}-\\text{C}) = 620 - 6(90) = 620 - 540 = 80\\text{ kJ mol}^{-1}$$\nEnergy required per bond:\n$$E = \\frac{80 \\times 10^3\\text{ J}}{6.023 \\times 10^{23}} = 1.328 \\times 10^{-19}\\text{ J}$$\n$$\\lambda = \\frac{hc}{E} = \\frac{6.62 \\times 10^{-34} \\times 3 \\times 10^8}{1.328 \\times 10^{-19}} = 1.495 \\times 10^{-6}\\text{ m} = 1495\\text{ nm} \\approx 1.49 \\times 10^3\\text{ nm}$$"
  },
  {
    qNum: 46,
    exam: "JEE Main 2015 (11 Apr)",
    question: "The increase of pressure on ice $\\rightleftharpoons$ water system at constant temperature will lead to :",
    options: [
      "A decrease in the entropy of the system",
      "An increase in the Gibbs energy of the system",
      "A shift of the equilibrium in the forward direction",
      "No effect on the equilibrium"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to Le Chatelier's principle, an increase in pressure favours the phase with higher density (smaller volume).\nSince the density of water is greater than the density of ice (volume of liquid water < volume of ice):\n$$\\text{Ice}(\\text{s}) \\rightleftharpoons \\text{Water}(\\text{l})$$\nIncreasing pressure shifts the equilibrium in the forward direction (more ice melts to liquid water)."
  },
  {
    qNum: 47,
    exam: "JEE Main 2016 (03 Apr)",
    question: "The heats of combustion of carbon and carbon monoxide are $-393.5$ and $-283.5\\text{ kJ mol}^{-1}$ respectively. The heat of formation (in $\\text{kJ}$) of carbon monoxide per mole is :",
    options: [
      "$676.5$",
      "$-110$",
      "$-110.5$",
      "$-676.5$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Given:\n$$\\text{C}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}), \\quad \\Delta H_1 = -393.5\\text{ kJ mol}^{-1}$$\n$$\\text{CO}(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}), \\quad \\Delta H_2 = -283.5\\text{ kJ mol}^{-1}$$\nThe formation reaction of $\\text{CO}$ is:\n$$\\text{C}(\\text{s}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}(\\text{g})$$\n$$\\Delta H_f = \\Delta H_1 - \\Delta H_2 = -393.5 - (-283.5) = -110\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 48,
    exam: "JEE Main 2016 (09 Apr)",
    question: "A reaction at $1\\text{ bar}$ is non-spontaneous at low temperature but becomes spontaneous at high temperature. Identify the correct statement about the reaction among the following :",
    options: [
      "$\\Delta H$ is negative while $\\Delta S$ is positive",
      "Both $\\Delta H$ and $\\Delta S$ are negative",
      "$\\Delta H$ is positive while $\\Delta S$ is negative",
      "Both $\\Delta H$ and $\\Delta S$ are positive"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For spontaneity, $\\Delta G = \\Delta H - T\\Delta S < 0$.\nIf $\\Delta H > 0$ and $\\Delta S > 0$:\n- At low $T$, $\\Delta H > T\\Delta S \\implies \\Delta G > 0$ (non-spontaneous).\n- At high $T$, $T\\Delta S > \\Delta H \\implies \\Delta G < 0$ (spontaneous).\nHence, both $\\Delta H$ and $\\Delta S$ must be positive."
  },
  {
    qNum: 49,
    exam: "JEE Main 2016 (09 Apr)",
    question: "For the reaction,\n$$\\text{A}(\\text{g}) + \\text{B}(\\text{g}) \\rightleftharpoons \\text{C}(\\text{g}) + \\text{D}(\\text{g})$$\n$\\Delta H^\\circ$ and $\\Delta S^\\circ$ are, respectively, $-29.8\\text{ kJ mol}^{-1}$ and $-0.100\\text{ kJ K}^{-1}\\text{ mol}^{-1}$ at $298\\text{ K}$. The equilibrium constant for the reaction at $298\\text{ K}$ is :",
    options: [
      "$1.0 \\times 10^{-10}$",
      "$10$",
      "$1$",
      "$1.0 \\times 10^{10}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Standard Gibbs free energy change:\n$$\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$$\n$$\\Delta G^\\circ = -29.8\\text{ kJ mol}^{-1} - [298\\text{ K} \\times (-0.100\\text{ kJ K}^{-1}\\text{ mol}^{-1})]$$\n$$\\Delta G^\\circ = -29.8 + 29.8 = 0$$\nSince $\\Delta G^\\circ = -RT\\ln K = 0$:\n$$\\ln K = 0 \\implies K = 1$$"
  },
  {
    qNum: 50,
    exam: "JEE Main 2016 (10 Apr)",
    question: "If $100\\text{ mole}$ of $\\text{H}_2\\text{O}_2$ decompose at $1\\text{ bar}$ and $300\\text{ K}$, the work done (in $\\text{kJ}$) by one mole of $\\text{O}_2(\\text{g})$ as it expands against $1\\text{ bar}$ pressure is :\n$$2\\text{H}_2\\text{O}_2(\\text{l}) \\rightarrow 2\\text{H}_2\\text{O}(\\text{l}) + \\text{O}_2(\\text{g}) \\quad (R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1})$$",
    options: [
      "$2.49$",
      "$498.00$",
      "$249.00$",
      "$62.25$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For $1\\text{ mole}$ of $\\text{O}_2(\\text{g})$ produced and expanding against constant pressure:\n$$w = P\\Delta V = nRT$$\nFor $n = 1\\text{ mol}$, $T = 300\\text{ K}$, and $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$:\n$$w = 1 \\times 8.3 \\times 300 = 2490\\text{ J} = 2.49\\text{ kJ}$$\n(For $50\\text{ moles}$ formed from $100\\text{ mol}$ $\\text{H}_2\\text{O}_2$, the work per mole of $\\text{O}_2$ is $2.49\\text{ kJ}$)."
  }
];
