/**
 * Chemical Kinetics Question Bank - Part 3 (Questions 72 to 93)
 * Source: "Momentum Booster for NEET - Chemical Kinetics" (Pages 7 and 8)
 */

export const kineticsPart3 = [
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Units of Rate Constant from Experimental Observations",
    question_type: "mcq",
    question_text: "For a particular reaction, $2\\text{A} + \\text{B} \\rightarrow \\text{Products}$, it is seen that when the concentration of only $\\text{B}$ is doubled, the half-life did not change but when the concentration of only $\\text{A}$ is doubled the rate of reaction increased by two times. The unit of rate constant for this reaction would be:",
    options: [
      "$\\text{mol L}^{-1}\\text{ s}^{-1}$",
      "$\\text{s}^{-1}$",
      "$\\text{L mol}^{-1}\\text{ s}^{-1}$",
      "Unitless"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. For reactant $\\text{B}$, half-life is independent of concentration $\\implies$ reaction is first order with respect to $\\text{B}$ ($y = 1$).\n2. For reactant $\\text{A}$, doubling concentration doubles the rate $\\implies$ reaction is first order with respect to $\\text{A}$ ($x = 1$).\n3. The overall order is $n = 1 + 1 = 2$. For a second order reaction, unit of $k = (\\text{mol L}^{-1})^{1 - 2}\\text{ s}^{-1} = \\text{L mol}^{-1}\\text{ s}^{-1}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order Determination from Half-Life Graphical Plot",
    question_type: "mcq",
    question_text: "A graph is plotted between half life and concentration:\n\nA straight line passing through origin is obtained when $t_{1/2}$ is plotted against $\\frac{1}{a^2}$. The order of the reaction will be:",
    options: [
      "3",
      "1",
      "2",
      "0"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    image_url: "/uploads/kinetics/kinetics_q73_t_half_vs_conc.png",
    solution: "General formula for half life is $t_{1/2} \\propto \\frac{1}{a^{n - 1}}$. When $t_{1/2}$ is directly proportional to $\\frac{1}{a^2}$, we have $n - 1 = 2 \\implies n = 3$. Hence, the reaction is of third order."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "75% Completion vs Half Life",
    question_type: "mcq",
    question_text: "For a first order kinetics, the time required for $75\\%$ completion is _____ of its half life:",
    options: [
      "$\\frac{3}{4}\\text{th}$",
      "Twice",
      "Half",
      "$\\frac{3}{2}\\text{th}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For first order kinetics, $75\\%$ completion means $1/4^{\\text{th}}$ remains, which requires exactly 2 half lives: $t_{75\\%} = 2 \\times t_{1/2}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Thermodynamic Functions in Catalysis",
    question_type: "mcq",
    question_text: "Which of the following remains unchanged when a catalyst is added?",
    options: [
      "Enthalpy of reaction",
      "Activation energy",
      "Rate constant",
      "Reaction rate"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "A catalyst provides an alternate reaction pathway with lower activation energy, thereby increasing rate constant and reaction rate. However, the initial and final states are unaffected, so thermodynamic state functions like enthalpy of reaction ($\\Delta H$), internal energy change ($\\Delta U$), and free energy change ($\\Delta G$) remain completely unchanged."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Specific Reaction Rate Invariance",
    question_type: "mcq",
    question_text: "In a second order kinetics, the volume of reaction vessel is halved at constant temperature, the specific reaction rate:",
    options: [
      "Remains constant",
      "Increases by 4 times",
      "Becomes one fourth of initial",
      "Increases but less than 4 times"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The specific reaction rate is simply the rate constant $k$. The rate constant is characteristic of the reaction and depends strictly on temperature and catalyst. Halving the volume changes reactant concentrations and increases reaction rate, but the specific reaction rate ($k$) remains constant."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate of Disappearance in Gaseous Decomposition",
    question_type: "mcq",
    question_text: "The reaction, $\\text{A}_2(\\text{g}) \\rightarrow \\text{B}(\\text{g}) + \\frac{1}{2} \\text{C}(\\text{g})$ shows increase in pressure from $100\\text{ mm}$ to $120\\text{ mm}$ in $5\\text{ minutes}$. The rate of disappearance of $\\text{A}_2$ is:",
    options: [
      "$4\\text{ mm min}^{-1}$",
      "$8\\text{ mm min}^{-1}$",
      "$16\\text{ mm min}^{-1}$",
      "$2\\text{ mm min}^{-1}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "At $t = 0$: $P_{\\text{A}_2} = 100\\text{ mm}$. At $t = 5\\text{ min}$: $P_t = (100 - x) + x + 0.5x = 100 + 0.5x = 120\\text{ mm} \\implies 0.5x = 20 \\implies x = 40\\text{ mm}$. The rate of disappearance of $\\text{A}_2$ is: $$\\text{Rate} = \\frac{\\Delta P_{\\text{A}_2}}{\\Delta t} = \\frac{x}{\\Delta t} = \\frac{40\\text{ mm}}{5\\text{ min}} = 8\\text{ mm min}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "pH Effect on Acid-Catalyzed Reactions",
    question_type: "mcq",
    question_text: "The rate expression for a reaction is $R = K[\\text{H}^+][\\text{A}]$. If $\\text{pH}$ is increased by one, the reaction rate is:",
    options: [
      "Increased by 10 times",
      "Decreased by 10 times",
      "Increased by 2 times",
      "Constant"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Since $\\text{pH} = -\\log[\\text{H}^+]$, an increase in $\\text{pH}$ by 1 unit corresponds to a 10-fold decrease in $[\\text{H}^+]$: $[\\text{H}^+]' = \\frac{[\\text{H}^+]}{10}$. Since the rate is first-order in $[\\text{H}^+]$, the reaction rate decreases by 10 times."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate Constant from Fractional Decay",
    question_type: "mcq",
    question_text: "The decomposition of a substance 'R' takes place according to first order kinetics. Its initial concentration is reduced to $\\frac{1}{8}\\text{th}$ in $24\\text{ s}$. The rate constant of the reaction is:",
    options: [
      "$\\frac{1}{24}\\text{ s}^{-1}$",
      "$\\frac{0.69}{16}\\text{ s}^{-1}$",
      "$\\frac{\\ln 2}{8}\\text{ s}^{-1}$",
      "$\\frac{1}{8}\\text{ s}^{-1}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "A reduction to $\\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3$ requires 3 half-lives. Therefore: $$3 \\times t_{1/2} = 24\\text{ s} \\implies t_{1/2} = 8\\text{ s}$$ The first order rate constant is: $$k = \\frac{\\ln 2}{t_{1/2}} = \\frac{\\ln 2}{8}\\text{ s}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Temperature Effect on Endothermic and Exothermic Rates",
    question_type: "mcq",
    question_text: "The two reactions are given below:\n$$\\text{A} \\rightarrow \\text{B} + \\text{energy}$$\n$$\\text{C} + \\text{energy} \\rightarrow \\text{D}$$\n\nIf the temperature is increased, then what is the effect on reaction rates of both reactions?",
    options: [
      "Both rates are increased",
      "Both rates are decreased",
      "In $\\text{A} \\rightarrow \\text{B}$, the rate is decreased and in $\\text{C} \\rightarrow \\text{D}$, the rate is increased",
      "In $\\text{A} \\rightarrow \\text{B}$, the rate is increased and in $\\text{C} \\rightarrow \\text{D}$, the rate is decreased"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "According to collision theory and Arrhenius equation $k = A e^{-E_a/RT}$, increasing temperature increases the kinetic energy and collision frequency of reacting molecules, thereby increasing the fraction of collisions exceeding activation energy. Thus, the rate constant and reaction rate increase with temperature for both exothermic and endothermic reactions."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy from Arrhenius Linear Form",
    question_type: "mcq",
    question_text: "For study of chemical kinetics, following relationship is observed:\n\n$$\\ln K (\\text{sec}^{-1}) = 10.4 - \\frac{830}{T}$$\n\nThe activation energy (in $\\text{cal}$) of the reaction will be:",
    options: [
      "$2.303 \\times 8.314 \\times 830$",
      "$2.303 \\times 2 \\times 830$",
      "$8.314 \\times 830$",
      "$2 \\times 830$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Comparing with Arrhenius equation in natural logarithmic form $\\ln K = \\ln A - \\frac{E_a}{RT}$: $$\\frac{E_a}{R} = 830 \\implies E_a = 830 \\times R$$ In calorie units, $R \\approx 2\\text{ cal mol}^{-1}\\text{ K}^{-1}$. Hence, $E_a = 2 \\times 830 = 1660\\text{ cal}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order from Multiple Variable Variations",
    question_type: "mcq",
    question_text: "For a gas phase reaction, following rate law is observed:\n\n$$r = k[\\text{A}]^x[\\text{B}]^y$$\n\nWhen conc. of $\\text{A}$ & $\\text{B}$ both become double the rate is increased by 8 times and when volume of container is tripled the rate is decreased by 27 times the values of $x$ and $y$ are respectively:",
    options: [
      "2, 0",
      "1, 2",
      "1, 0",
      "2, 3"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. When both $[\\text{A}]$ and $[\\text{B}]$ double, rate increases by 8 times: $2^x \\cdot 2^y = 2^{x+y} = 8 = 2^3 \\implies x + y = 3$.\n2. When volume is tripled, concentrations become $1/3$, and rate decreases by 27 times: $(1/3)^{x+y} = (1/3)^3 = 1/27$, confirming overall order is 3.\n3. Among the options with $x + y = 3$, $x = 1, y = 2$ is the valid solution."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Parallel Competitive Reactions Yield Fraction",
    question_type: "mcq",
    question_text: "In the given reaction:\n\n$$\\text{Phenol} \\xrightarrow{\\text{HNO}_3/\\text{H}_2\\text{SO}_4} \\text{o-nitrophenol } (K_1) + \\text{p-nitrophenol } (K_2)$$\n\nThe fraction of p-nitrophenol in overall amount of product will be:",
    options: [
      "$\\frac{K_1}{K_2}$",
      "$\\frac{K_2 + K_1}{K_2}$",
      "$\\frac{K_1 + K_2}{K_2}$",
      "$\\frac{K_2}{K_1 + K_2}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: "/uploads/kinetics/kinetics_q83_phenol_nitration.png",
    solution: "In simultaneous parallel first-order reactions sharing a common reactant, the fraction of any product formed is the ratio of its formation rate constant to the total sum of rate constants: $$\\text{Fraction of p-nitrophenol} = \\frac{K_2}{K_1 + K_2}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Factors Affecting Specific Rate Constant",
    question_type: "mcq",
    question_text: "The value of rate constant depends on:",
    options: [
      "Presence of catalyst",
      "Temperature",
      "Change in concentration of reactants",
      "Both (1) & (2)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The rate constant $k$ is independent of reactant or product concentrations, but changes with temperature (as governed by the Arrhenius equation) and in the presence of a catalyst (which alters activation energy)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Third Order Kinetics Formulations",
    question_type: "mcq",
    question_text: "For a third order kinetics, which of the following relationship is incorrect?",
    options: [
      "$t_{1/2} \\propto \\frac{1}{[\\text{conc}]^2}$",
      "$t \\propto [\\text{conc}]^2$",
      "$K$ is independent of concentration",
      "All of these"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For $n^{\\text{th}}$ order kinetics, $t_{1/2} \\propto \\frac{1}{a^{n-1}}$. For third order ($n = 3$), $t_{1/2} \\propto \\frac{1}{a^2}$. Statement (2) $t \\propto [\\text{conc}]^2$ is fundamentally incorrect as time required is inversely proportional to square of concentration."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Successive Time Intervals First Order Decomposition",
    question_type: "mcq",
    question_text: "A substance 'A' is $20\\%$ decomposed in $1\\text{ hr}$ following $1^{\\text{st}}$ order kinetics. The percentage of 'A' left after $2\\text{ hr}$ will be:",
    options: [
      "$80\\%$",
      "$64\\%$",
      "$51.2\\%$",
      "$28\\%$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "After 1 hour, $80\\%$ of the initial substance remains ($[A]_1 = 0.8 [A]_0$). In the next 1 hour, another $20\\%$ of the remaining amount decomposes, leaving $80\\%$ of $[A]_1$: $$[A]_2 = 0.8 \\times 80\\% = 64\\%$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy Calculation from Enthalpy",
    question_type: "mcq",
    question_text: "In an exothermic reaction $\\text{A} \\rightarrow \\text{B}$, the activation energy of reverse reaction is three times that of forward reaction. If enthalpy of the reaction is $-60\\text{ kJ mol}^{-1}$, the activation energy of the reverse reaction is:",
    options: [
      "$120\\text{ kJ mol}^{-1}$",
      "$40\\text{ kJ mol}^{-1}$",
      "$90\\text{ kJ mol}^{-1}$",
      "$180\\text{ kJ mol}^{-1}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Given $\\Delta H = -60\\text{ kJ mol}^{-1}$ and $E_{ab} = 3 E_{af}$. Since $\\Delta H = E_{af} - E_{ab}$: $$-60 = E_{af} - 3 E_{af} = -2 E_{af} \\implies E_{af} = 30\\text{ kJ mol}^{-1}$$ Therefore, activation energy of reverse reaction is: $$E_{ab} = 3 \\times 30 = 90\\text{ kJ mol}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Titrimetric First Order Rate Constant",
    question_type: "mcq",
    question_text: "Decomposition of $\\text{H}_2\\text{O}_2$ is a first order reaction. To determine the rate of reaction initially $10\\text{ ml}$ of standard $\\text{KMnO}_4$ solution are required and after $10\\text{ min}$, $5\\text{ ml}$ of $\\text{KMnO}_4$ solution are required, the rate constant will be:",
    options: [
      "$0.03\\text{ min}^{-1}$",
      "$0.0693\\text{ min}^{-1}$",
      "$0.6\\text{ min}^{-1}$",
      "$0.015\\text{ min}^{-1}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The volume of $\\text{KMnO}_4$ consumed is directly proportional to the undecomposed concentration of $\\text{H}_2\\text{O}_2$. Since the volume halved from $10\\text{ ml}$ to $5\\text{ ml}$ in $10\\text{ min}$, the half-life is $t_{1/2} = 10\\text{ min}$. The rate constant is: $$k = \\frac{0.693}{t_{1/2}} = \\frac{0.693}{10} = 0.0693\\text{ min}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Linear Graphical Tests",
    question_type: "mcq",
    question_text: "Which of the following graphs represents first order reaction?\n\nGraph I: $[\\text{A}]$ vs $t$ linear decreasing\nGraph II: $\\log [\\text{A}]$ vs $t$ linear decreasing\nGraph III: $t_{1/2}$ vs initial concentration flat line\nGraph IV: $\\text{Rate}$ vs $[\\text{A}]$ linear increasing through origin",
    options: [
      "I & IV",
      "I, II & III",
      "II & IV",
      "II, III & IV"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q89_first_order_graphs.png",
    solution: "For first order reaction: (II) $\\log [\\text{A}] = \\log [\\text{A}]_0 - \\frac{k}{2.303}t$ is a downward straight line; (III) $t_{1/2} = \\frac{0.693}{k}$ is constant and independent of initial concentration (flat line); (IV) $\\text{Rate} = k[\\text{A}]$ is a straight line through the origin. Graph I is zero order. Hence, II, III & IV represent first order kinetics."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "KMnO4 Titration Rate Expression",
    question_type: "mcq",
    question_text: "Kinetics of decomposition of $\\text{H}_2\\text{O}_2$ is studied by volumetric measurement of concentration by standard $\\text{KMnO}_4$ solution at different time interval. If $20\\text{ ml}$ of $0.2\\text{ M KMnO}_4$ is required initially and after $10\\text{ minutes}$ $10\\text{ ml}$ of $0.2\\text{ M KMnO}_4$ is required then rate constant $-\\frac{d[\\text{H}_2\\text{O}_2]}{dt} = k[\\text{H}_2\\text{O}_2]$ is:",
    options: [
      "$\\frac{2.303}{10} \\log(1)$",
      "$\\frac{2.303}{10} \\log(2)$",
      "$\\frac{2.303}{10} \\log(3)$",
      "$\\frac{2.303}{10} \\log(4)$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Using the integrated rate equation $k = \\frac{2.303}{t} \\log\\left(\\frac{V_0}{V_t}\\right)$, substituting $V_0 = 20\\text{ ml}$, $V_t = 10\\text{ ml}$ and $t = 10\\text{ min}$ yields: $$k = \\frac{2.303}{10} \\log\\left(\\frac{20}{10}\\right) = \\frac{2.303}{10} \\log(2)$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Coupled Concentration and Temperature Variation",
    question_type: "mcq",
    question_text: "In a first order kinetics, if the concentration of reactant is halved and temperature is lowered by $20^\\circ\\text{C}$ from initial, the reaction rate will be (given temperature coefficient equal to 2):",
    options: [
      "Unaltered",
      "Twice of initial",
      "8 times of initial",
      "$1/8\\text{ times of initial}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "1. Because the reaction is first-order, halving the reactant concentration scales the rate by $\\frac{1}{2}$.\n2. Lowering temperature by $20^\\circ\\text{C}$ with temperature coefficient 2 reduces the rate constant by $2^{20/10} = 2^2 = 4$ times (i.e. scaled by $\\frac{1}{4}$).\n3. Overall rate becomes $\\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}^{\\text{th}}$ of the initial rate."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Heterogeneous Platinum Decomposition",
    question_type: "mcq",
    question_text: "For decomposition of ammonia on platinum surface:\n(1) Half life period is dependent on concentration\n(2) $K = \\frac{0.693}{t_{1/2}} \\log \\frac{a}{a-x}$\n(3) Rate is equal to $k[\\text{NH}_3]^0$\n(4) Both (1) & (3)",
    options: [
      "Half life period is dependent on concentration",
      "$K = \\frac{0.693}{t_{1/2}} \\log \\frac{a}{a-x}$",
      "Rate is equal to $k[\\text{NH}_3]^0$",
      "Both (1) & (3)"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Decomposition of ammonia on a platinum surface at high pressure is a zero-order reaction. For zero order: $\\text{Rate} = k[\\text{NH}_3]^0 = k$, and $t_{1/2} = \\frac{[A]_0}{2k}$ (which is directly proportional to initial concentration). Hence, both statements (1) and (3) are correct."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Radioactive Decay First Order Half-Life Calculations",
    question_type: "mcq",
    question_text: "$5\\text{ g}$ radioactive substance is taken in $1\\text{ L}$ flask. How much substance will be left after $100\\text{ days}$? (Half life of substance is $25\\text{ days}$):",
    options: [
      "$2.5\\text{ g}$",
      "$1.5\\text{ g}$",
      "$0.625\\text{ g}$",
      "$0.3125\\text{ g}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Number of elapsed half-lives is $n = \\frac{\\text{Total time}}{t_{1/2}} = \\frac{100\\text{ days}}{25\\text{ days}} = 4$. The remaining amount is: $$N = N_0 \\left(\\frac{1}{2}\\right)^n = 5\\text{ g} \\times \\left(\\frac{1}{2}\\right)^4 = \\frac{5}{16} = 0.3125\\text{ g}$$"
  }
];
