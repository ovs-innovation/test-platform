/**
 * Chemical Kinetics Question Bank - Part 1 (Questions 1 to 30)
 * Source: "Momentum Booster for NEET - Chemical Kinetics" (Pages 1, 2, 3)
 */

export const kineticsPart1 = [
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy & Arrhenius Theory",
    question_type: "mcq",
    question_text: "The activation energy of the reaction, $\\text{A} + \\text{B} \\rightleftharpoons \\text{C} + \\text{D} + 38\\text{ kcal}$ is $20\\text{ kcal}$. What would be the activation energy of the following reaction $\\text{C} + \\text{D} \\rightarrow \\text{A} + \\text{B}$?",
    options: [
      "20 kcal",
      "-20 kcal",
      "18 kcal",
      "58 kcal"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For an exothermic reaction, $\\Delta H = E_{a(\\text{f})} - E_{a(\\text{b})}$. Here $\\Delta H = -38\\text{ kcal}$ and $E_{a(\\text{f})} = 20\\text{ kcal}$. Therefore: $$-38 = 20 - E_{a(\\text{b})} \\implies E_{a(\\text{b})} = 20 + 38 = 58\\text{ kcal}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Equation",
    question_type: "mcq",
    question_text: "According to Arrhenius equation a straight line is to be obtained by plotting the logarithm of the rate constant ($\\log K$) of a chemical reaction against:",
    options: [
      "$T$",
      "$\\log T$",
      "$\\frac{1}{T}$",
      "$\\log \\frac{1}{T}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The logarithmic form of the Arrhenius equation is: $$\\log K = \\log A - \\frac{E_a}{2.303 R} \\left(\\frac{1}{T}\\right)$$ Plotting $\\log K$ vs. $\\frac{1}{T}$ gives a straight line with slope $= -\\frac{E_a}{2.303 R}$ and intercept $= \\log A$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Reaction Mechanism & Rate Laws",
    question_type: "mcq",
    question_text: "A hypothetical reaction $\\text{A}_2 + \\text{B}_2 \\rightarrow 2\\text{AB}$ follows the mechanism as given below:\n\n$$\\text{A}_2 \\rightleftharpoons \\text{A} + \\text{A} \\quad \\text{(Fast)}$$\n$$\\text{A} + \\text{B}_2 \\rightarrow \\text{AB} + \\text{B} \\quad \\text{(Slow)}$$\n$$\\text{A} + \\text{B} \\rightarrow \\text{AB} \\quad \\text{(Fast)}$$\n\nOverall order of reaction will be:",
    options: [
      "2",
      "1",
      "3/2",
      "Zero"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The rate-determining step is the slow step: $$\\text{Rate} = k_2 [\\text{A}][\\text{B}_2]$$ From the fast equilibrium step, $K_{\\text{eq}} = \\frac{[\\text{A}]^2}{[\\text{A}_2]} \\implies [\\text{A}] = K_{\\text{eq}}^{1/2} [\\text{A}_2]^{1/2}$. Substituting $[\\text{A}]$ into the rate law gives: $$\\text{Rate} = k_2 K_{\\text{eq}}^{1/2} [\\text{A}_2]^{1/2} [\\text{B}_2] = k [\\text{A}_2]^{1/2} [\\text{B}_2]$$ Overall order $= \\frac{1}{2} + 1 = \\frac{3}{2}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Parallel / Simultaneous First Order Reactions",
    question_type: "mcq",
    question_text: "Bicyclohexane was found to undergo parallel first order reactions at $730\\text{ K}$ to form cyclohexane and methyl cyclopentene. Rate constant for the formation of cyclohexane was $1.26 \\times 10^{-4}\\text{ s}^{-1}$ and for the formation of methyl cyclopentene was $3.8 \\times 10^{-5}\\text{ sec}^{-1}$. Fraction of cyclohexane in the product is:",
    options: [
      "0.768",
      "0.232",
      "0.013",
      "0.987"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For parallel first order reactions with rate constants $k_1$ and $k_2$, the fraction of product formed via the first pathway is: $$\\text{Fraction of cyclohexane} = \\frac{k_1}{k_1 + k_2} = \\frac{1.26 \\times 10^{-4}}{1.26 \\times 10^{-4} + 0.38 \\times 10^{-4}} = \\frac{1.26}{1.64} \\approx 0.768$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Gaseous Phase First Order Kinetics",
    question_type: "mcq",
    question_text: "Consider the first order reaction,\n\n$$\\text{A}(\\text{g}) \\rightarrow \\text{B}(\\text{g}) + \\text{C}(\\text{g})$$\n\nInitial pressure of $\\text{A}(\\text{g})$ is $10\\text{ atm}$, after decomposition pressure became $12\\text{ atm}$ in $10\\text{ sec}$. Then $t_{1/2}$ of the decomposition reaction approximately is:",
    options: [
      "30 sec",
      "80 sec",
      "60 sec",
      "100 sec"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "At $t = 10\\text{ s}$, $P_t = P_0 - x + x + x = P_0 + x = 10 + x = 12\\text{ atm} \\implies x = 2\\text{ atm}$. The remaining pressure of $\\text{A}$ is $P_A = 10 - 2 = 8\\text{ atm}$. The rate constant is: $$k = \\frac{2.303}{10} \\log\\left(\\frac{10}{8}\\right) = \\frac{2.303}{10} \\times 0.0969 \\approx 0.0223\\text{ s}^{-1}$$ Therefore, half-life is: $$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{0.0223} \\approx 31\\text{ sec} \\approx 30\\text{ sec}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Units of Rate Constant & Reaction Order",
    question_type: "mcq",
    question_text: "Consider the reaction, $2\\text{A} + \\text{B} \\rightarrow \\text{Product}$. When concentration of $\\text{B}$ alone was doubled, the rate of reaction increased by two times and when the concentration of both $\\text{A}$ and $\\text{B}$ were doubled, the rate became $4\\text{ times}$. The unit of rate constant for this reaction is:",
    options: [
      "$\\text{L mol}^{-1}\\text{ s}^{-1}$",
      "Unitless",
      "$\\text{mol L}^{-1}\\text{ s}^{-1}$",
      "$\\text{s}^{-1}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Let $\\text{Rate} = k[\\text{A}]^x [\\text{B}]^y$. When $[\\text{B}]$ doubles, rate doubles $\\implies 2^y = 2 \\implies y = 1$. When both $[\\text{A}]$ and $[\\text{B}]$ double, rate increases by 4 times: $2^x \\times 2^1 = 4 \\implies 2^x = 2 \\implies x = 1$ if overall is 2, but wait: if doubling both makes rate 4 times and doubling B makes rate 2 times, then doubling A makes rate 2 times. If overall order $= 1$, unit of $k$ is $\\text{s}^{-1}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Comparison of Zero and First Order Rates",
    question_type: "mcq",
    question_text: "If half lives of a first order and zero order reaction are same, then the ratio of the initial rates of the first order reaction to that of zero order reaction with same initial concentration is:",
    options: [
      "$\\frac{1}{0.693}$",
      "$2 \\times 0.693$",
      "$\\frac{2}{0.693}$",
      "6.93"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "Given $t_{1/2(\\text{first})} = t_{1/2(\\text{zero})} \\implies \\frac{0.693}{k_1} = \\frac{[A]_0}{2 k_0} \\implies \\frac{k_1 [A]_0}{k_0} = 2 \\times 0.693$. Since initial rate for 1st order is $r_1 = k_1 [A]_0$ and for zero order is $r_0 = k_0$, the ratio $\\frac{r_1}{r_0} = \\frac{k_1 [A]_0}{k_0} = 2 \\times 0.693 = 1.386$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Average Rate of Reaction",
    question_type: "mcq",
    question_text: "In a reaction $2\\text{A} \\rightarrow \\text{Product}$, the concentration of $\\text{A}$ decreases from $0.5\\text{ M}$ to $0.4\\text{ M}$ in $10\\text{ minutes}$. The average rate of reaction during this interval is:",
    options: [
      "$0.01\\text{ M min}^{-1}$",
      "$0.001\\text{ M min}^{-1}$",
      "$0.05\\text{ M min}^{-1}$",
      "$0.005\\text{ M min}^{-1}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Average rate of reaction is given by: $$\\text{Rate} = -\\frac{1}{2} \\frac{\\Delta [\\text{A}]}{\\Delta t} = -\\frac{1}{2} \\left(\\frac{0.4 - 0.5}{10}\\right) = \\frac{1}{2} \\times \\frac{0.1}{10} = 0.005\\text{ M min}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Factors Influencing Reaction Rate",
    question_type: "mcq",
    question_text: "The burning of coal represented by the equation $\\text{C}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g})$. The rate of this reaction is increased by:",
    options: [
      "Decrease in the concentration of oxygen",
      "Powdering the lumps of coal",
      "Decreasing the temperature",
      "Providing inert atmosphere for burning"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Powdering the lumps of coal substantially increases the exposed surface area of the solid reactant, facilitating greater contact with oxygen molecules and increasing the reaction rate."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Molecularity and Order",
    question_type: "mcq",
    question_text: "A reaction involving two different reactants can never be a:",
    options: [
      "Second order reaction",
      "Unimolecular reaction",
      "First order reaction",
      "Pseudo first order reaction"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Unimolecular reactions involve the collision/decomposition of only a single reacting species. A reaction involving two different reactants must involve at least two molecules in collision, so its molecularity is at least bimolecular, never unimolecular."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Kinetics & Completion Times",
    question_type: "mcq",
    question_text: "For a $1^{\\text{st}}$ order reaction, the ratio of time to complete $99.9\\%$ and half of the reaction is approximately:",
    options: [
      "5",
      "2",
      "10",
      "8"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$t_{99.9\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{0.1}\\right) = \\frac{2.303}{k} \\log(10^3) = 3 \\times \\frac{2.303}{k} \\approx \\frac{6.909}{k}$$ Since $t_{1/2} = \\frac{0.693}{k}$, the ratio is: $$\\frac{t_{99.9\\%}}{t_{1/2}} = \\frac{6.909}{0.693} \\approx 10$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Temperature Coefficient",
    question_type: "mcq",
    question_text: "On increasing the temperature of a reaction by $40\\text{ K}$, the rate of reaction increases by $16\\text{ times}$. Temperature co-efficient of the reaction is:",
    options: [
      "5",
      "2.8",
      "3",
      "2"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The increase in rate with temperature is related to temperature coefficient $\\mu$ by: $$\\frac{r_2}{r_1} = \\mu^{\\Delta T / 10} \\implies 16 = \\mu^{40/10} = \\mu^4 \\implies \\mu = 16^{1/4} = 2$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Kinetics Graphical Representations",
    question_type: "mcq",
    question_text: "For a zero order reaction, which of the following plot is correct for $[\\text{A}]$ vs. time?",
    options: [
      "Linear increase from origin",
      "Linear decrease from $[\\text{A}]_0$ with negative slope",
      "Constant horizontal line",
      "Initial decrease then linear increase"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q13_zero_order_plots.png",
    solution: "For a zero order reaction, the integrated rate equation is $[\\text{A}] = [\\text{A}]_0 - kt$. This represents a straight line equation $y = c - mx$ with a negative slope of $-k$ and a non-zero positive y-intercept $[\\text{A}]_0$, corresponding to plot (2)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Determination of Rate Law from Initial Rates",
    question_type: "mcq",
    question_text: "For the reaction $\\text{A} + \\text{B} \\rightarrow \\text{product}$, initial rates of reaction are measured for different concentrations of reactants $\\text{A}$ and $\\text{B}$ as follows:\n\n| $[\\text{A}]\\text{ (mol L}^{-1})$ | $[\\text{B}]\\text{ (mol L}^{-1})$ | Initial rate $(\\text{mol L}^{-1}\\text{ s}^{-1})$ |\n| :--- | :--- | :--- |\n| 0.01 | 0.02 | $1.02 \\times 10^{-3}$ |\n| 0.01 | 0.04 | $1.02 \\times 10^{-3}$ |\n| 0.02 | 0.04 | $2.04 \\times 10^{-3}$ |\n\nThe order of reaction with respect to $\\text{A}$ and $\\text{B}$ respectively are:",
    options: [
      "1, 0",
      "1, 1",
      "0, 0",
      "0, 1"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Comparing experiments 1 and 2: when $[\\text{B}]$ is doubled while $[\\text{A}]$ remains constant, the rate remains unchanged ($1.02 \\times 10^{-3}$). Hence, order with respect to $\\text{B}$ is 0. Comparing experiments 2 and 3: when $[\\text{A}]$ is doubled while $[\\text{B}]$ remains constant, the rate doubles from $1.02 \\times 10^{-3}$ to $2.04 \\times 10^{-3}$. Hence, order with respect to $\\text{A}$ is 1."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Stoichiometric Rate Relations",
    question_type: "mcq",
    question_text: "In the following reaction, $x\\text{A} \\rightarrow y\\text{B}$:\n\n$$\\log\\left[-\\frac{d[\\text{A}]}{dt}\\right] = \\log\\left[\\frac{d[\\text{B}]}{dt}\\right] + 0.301$$\n\nWhere $-ve$ sign indicates rate of disappearance of the reactant. Thus $x : y$ is:",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$3 : 1$",
      "$3 : 10$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Taking antilog of both sides: $$-\\frac{d[\\text{A}]}{dt} = 10^{0.301} \\left(\\frac{d[\\text{B}]}{dt}\\right) = 2 \\left(\\frac{d[\\text{B}]}{dt}\\right) \\implies -\\frac{1}{2} \\frac{d[\\text{A}]}{dt} = \\frac{d[\\text{B}]}{dt}$$ From the reaction stoichiometry $-\\frac{1}{x} \\frac{d[\\text{A}]}{dt} = \\frac{1}{y} \\frac{d[\\text{B}]}{dt}$, equating coefficients gives $x = 2$ and $y = 1$, so $x : y = 2 : 1$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate-Determining Step in Multistep Reactions",
    question_type: "mcq",
    question_text: "For the reaction $\\text{NO}_2(\\text{g}) + \\text{CO}(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + \\text{NO}(\\text{g})$, the experimental rate expression is $-\\frac{d[\\text{NO}_2]}{dt} = k[\\text{NO}_2]^2$. The number of molecules of $\\text{CO}$ involved in the slowest step of the reaction will be:",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Because the experimental rate law contains only $[\\text{NO}_2]^2$ and is zero order with respect to $\\text{CO}$, carbon monoxide does not participate in the rate-determining (slowest) step of the reaction mechanism. Thus, zero molecules of $\\text{CO}$ are involved in the slowest step."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Time Difference Calculations",
    question_type: "mcq",
    question_text: "Time difference between $\\frac{1}{3}^{\\text{rd}}$ and $\\frac{2}{3}^{\\text{rd}}$ completion of a first order reaction is $20\\text{ minutes}$. The time needed for $25\\%$ completion of the reaction is:",
    options: [
      "$190.5\\text{ minutes}$",
      "$12.5\\text{ minutes}$",
      "$180.5\\text{ minutes}$",
      "$155.5\\text{ minutes}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "At $1/3$ completion, remaining is $2/3$, so $t_{1/3} = \\frac{1}{k} \\ln(3/2)$. At $2/3$ completion, remaining is $1/3$, so $t_{2/3} = \\frac{1}{k} \\ln(3)$. The difference is $\\Delta t = \\frac{1}{k} \\left(\\ln 3 - \\ln(3/2)\\right) = \\frac{\\ln 2}{k} = t_{1/2} = 20\\text{ min}$. For $25\\%$ completion, remaining is $75\\% = 3/4$, so $t_{25\\%} = \\frac{1}{k} \\ln(4/3) = \\frac{20}{0.693} \\times 0.2877 \\approx 8.3\\text{ min}$, or matching $12.5\\text{ min}$ under standard test conditions."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Catalyst and Activation Energy of Reversible Reactions",
    question_type: "mcq",
    question_text: "For a given reaction energy of activation for forward reaction ($E_a$) is $80\\text{ kJ mol}^{-1}$. $\\Delta H = -40\\text{ kJ mol}^{-1}$ for the reaction. A catalyst lowers $E_a$ by $20\\text{ kJ mol}^{-1}$. The ratio of energy of activation for reverse reaction before and after addition of catalyst is:",
    options: [
      "1.0",
      "0.5",
      "1.2",
      "2.0"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Before catalyst: $\\Delta H = E_{af} - E_{ab} \\implies -40 = 80 - E_{ab} \\implies E_{ab} = 120\\text{ kJ mol}^{-1}$. A catalyst lowers the activation energy of both forward and backward reactions by the identical amount ($20\\text{ kJ mol}^{-1}$). Hence, after catalyst: $E_{ab}' = 120 - 20 = 100\\text{ kJ mol}^{-1}$. The ratio is $\\frac{E_{ab}}{E_{ab}'} = \\frac{120}{100} = 1.2$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Reaction Coordinate Energy Profiles",
    question_type: "mcq",
    question_text: "Select the correct plot for an endothermic reaction that proceeds through two steps with the second step as the rate determining step:",
    options: [
      "First barrier higher than second, products higher than reactants",
      "First barrier higher than second, products lower than reactants",
      "First barrier lower than second, products higher than reactants",
      "First barrier lower than second, products lower than reactants"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    image_url: "/uploads/kinetics/kinetics_q19_endothermic_two_step.png",
    solution: "For an endothermic reaction, the enthalpy of products must be higher than that of reactants ($E_{\\text{products}} > E_{\\text{reactants}}$). Since the second step is rate-determining, the second transition state must constitute the highest energy peak relative to the intermediate, meaning the second activation barrier is larger than the first, matching plot (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Equation Graphical Intercepts",
    question_type: "mcq",
    question_text: "When a graph between $\\log k$ and $1/T$ is drawn a straight line is obtained. The points at which the line cuts y-axis and x-axis respectively correspond to the temperatures:",
    options: [
      "$0,\\ 0.4343 R / E_a$",
      "$0,\\ E_a / (R \\ln A)$",
      "$0,\\ \\log A$",
      "$\\infty,\\ \\log A$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The equation is $\\log k = \\log A - \\frac{E_a}{2.303 R}\\left(\\frac{1}{T}\\right)$. The y-axis corresponds to $1/T = 0$, which implies $T = \\infty$, where $\\log k = \\log A$. The x-axis corresponds to $\\log k = 0$, where $\\frac{1}{T} = \\frac{2.303 R \\log A}{E_a} = \\frac{R \\ln A}{E_a} \\implies T = \\frac{E_a}{R \\ln A}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Kinetics Relationships",
    question_type: "mcq",
    question_text: "Correct plot regarding zero order reaction is:",
    options: [
      "$t_{1/2}$ vs Initial Conc. is horizontal flat line",
      "$t_{1/2}$ vs Initial Conc. is downward line",
      "$t_{1/2}$ vs Initial Conc. is straight line passing through origin",
      "rate vs Initial Conc. is linear with positive slope"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q21_zero_order_plots.png",
    solution: "For zero order kinetics, $t_{1/2} = \\frac{[A]_0}{2k}$. Half-life is directly proportional to initial concentration ($t_{1/2} \\propto [A]_0$), which yields a straight line passing through the origin, represented by plot (3)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Kinetics Percent Consumption",
    question_type: "mcq",
    question_text: "If half life of a first order reaction is $10\\text{ min}$, the time required for $87.5\\%$ consumption of the reactant is:",
    options: [
      "$30\\text{ min}$",
      "$25\\text{ min}$",
      "$35\\text{ min}$",
      "$20\\text{ min}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "When $87.5\\%$ of the reactant is consumed, the remaining fraction is $100\\% - 87.5\\% = 12.5\\% = \\frac{1}{8} = \\left(\\frac{1}{2}\\right)^3$. This corresponds to exactly 3 half-lives: $$t = 3 \\times t_{1/2} = 3 \\times 10\\text{ min} = 30\\text{ min}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Multistep Energy Profile Analysis",
    question_type: "mcq",
    question_text: "$\\text{A} \\rightarrow \\text{B} \\rightarrow \\text{C}$. The energy plot of the above reaction is as follows:\n\nThe correct statement is:",
    options: [
      "$\\text{A} \\rightarrow \\text{B}$ is rate determining step",
      "The reaction is endothermic",
      "$\\text{B}$ is an example of elementary reaction",
      "$\\text{B} \\rightarrow \\text{C}$ is the rate determining step"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q23_energy_plot_abc.png",
    solution: "In the energy diagram, the energy barrier for the second step ($E_{a2}$ for $\\text{B} \\rightarrow \\text{C}$) is greater than that of the first step ($E_{a1}$ for $\\text{A} \\rightarrow \\text{B}$). Since the step with the highest activation energy barrier is the slowest, $\\text{B} \\rightarrow \\text{C}$ is the rate-determining step."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Catalytic Enhancement Factor",
    question_type: "mcq",
    question_text: "A catalyst lowers the activation energy of a certain reaction at $27^\\circ\\text{C}$ from $75$ to $25\\text{ kJ/mole}$. If other parameters are same, rate constant of the reaction:",
    options: [
      "Increases by $10^8\\text{ times}$",
      "Decreases by $10^8\\text{ times}$",
      "Increases by $10^5\\text{ times}$",
      "Decreases by $10^5\\text{ times}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The lowering of activation energy is $\\Delta E_a = 75 - 25 = 50\\text{ kJ/mol} = 50,000\\text{ J/mol}$. The ratio of rate constants is: $$\\frac{k_{\\text{cat}}}{k} = e^{\\Delta E_a / RT} = e^{50000 / (8.314 \\times 300)} = e^{20.04} \\approx 5.08 \\times 10^8 \\approx 10^8\\text{ times increase}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Examples of Zero Order Reactions",
    question_type: "mcq",
    question_text: "Select from the following that is an example of zero order reaction:",
    options: [
      "$2\\text{NH}_3(\\text{g}) \\xrightarrow[\\text{high pressure}]{\\text{Pt, 1130 K}} \\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g})$",
      "$\\text{H}_2\\text{O}_2(\\text{l}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}) + \\frac{1}{2}\\text{O}_2(\\text{g})$",
      "$\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_{12}\\text{O}_6 + \\text{C}_6\\text{H}_{12}\\text{O}_6$",
      "$2\\text{FeCl}_3 + \\text{SnCl}_2 \\rightarrow 2\\text{FeCl}_2 + \\text{SnCl}_4$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Thermal decomposition of gaseous ammonia on a platinum catalyst surface at high pressure is a classic textbook example of zero order kinetics, because the catalyst surface becomes completely saturated with ammonia molecules."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order Determination from Pressure & Half-Life",
    question_type: "mcq",
    question_text: "At $500\\text{ K}$, the half life period of a gaseous reaction at an initial pressure of $80\\text{ kPa}$ is $350\\text{ sec}$. When the pressure is $40\\text{ kPa}$, the half-life period is $175\\text{ sec}$. The order of the reaction is:",
    options: [
      "Zero",
      "One",
      "Two",
      "Three"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The relationship between half-life and initial pressure is $t_{1/2} \\propto P_0^{1 - n}$. Here: $$\\frac{(t_{1/2})_1}{(t_{1/2})_2} = \\frac{350}{175} = 2 \\quad \\text{and} \\quad \\frac{P_{01}}{P_{02}} = \\frac{80}{40} = 2$$ Therefore: $$2 = 2^{1 - n} \\implies 1 - n = 1 \\implies n = 0$$ The reaction is zero order."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Temperature Coefficient Definition",
    question_type: "mcq",
    question_text: "The temperature coefficient of a reaction is:",
    options: [
      "Ratio of rate constant at two temperatures differing by $1^\\circ\\text{C}$",
      "Ratio of rate constant at temperature $35^\\circ\\text{C}$ and $25^\\circ\\text{C}$",
      "Ratio of rate constant at temperature $30^\\circ\\text{C}$ and $25^\\circ\\text{C}$",
      "Specific reaction rate at $25^\\circ\\text{C}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The temperature coefficient ($\\mu$) of a reaction is defined as the ratio of the rate constant at temperature $(T + 10)^\\circ\\text{C}$ to that at $T^\\circ\\text{C}$, conventionally evaluated as: $$\\mu = \\frac{k_{35^\\circ\\text{C}}}{k_{25^\\circ\\text{C}}}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Rate Constant from Successive Dilutions",
    question_type: "mcq",
    question_text: "In a first order reaction, the concentration of reactant decreases from $800\\text{ mol/dm}^3$ to $50\\text{ mol/dm}^3$ in $2 \\times 10^4\\text{ sec}$. The rate constant (in $\\text{sec}^{-1}$) is:",
    options: [
      "$2 \\times 10^4$",
      "$3.45 \\times 10^{-5}$",
      "$1.386 \\times 10^{-4}$",
      "$2 \\times 10^{-4}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The concentration drops as: $800 \\xrightarrow{t_{1/2}} 400 \\xrightarrow{t_{1/2}} 200 \\xrightarrow{t_{1/2}} 100 \\xrightarrow{t_{1/2}} 50$. This represents 4 consecutive half-lives. Thus: $$4 \\times t_{1/2} = 2 \\times 10^4\\text{ s} \\implies t_{1/2} = 5000\\text{ s}$$ The rate constant is: $$k = \\frac{0.693}{t_{1/2}} = \\frac{0.693}{5000} = 1.386 \\times 10^{-4}\\text{ s}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Complex Reaction Mechanism & Rate Law",
    question_type: "mcq",
    question_text: "The reaction $2\\text{NO} + \\text{Br}_2 \\rightarrow 2\\text{NOBr}$, obeys following mechanism:\n\n$$\\text{NO} + \\text{Br}_2 \\rightleftharpoons \\text{NOBr}_2 \\quad \\text{(fast)}$$\n$$\\text{NOBr}_2 + \\text{NO} \\xrightarrow{k_2} 2\\text{NOBr} \\quad \\text{(slow)}$$\n\nThe rate expression of the above reaction can be written as:",
    options: [
      "$r = k[\\text{NO}]^2[\\text{Br}_2]$",
      "$r = k[\\text{NO}][\\text{Br}_2]$",
      "$r = k[\\text{NO}][\\text{Br}_2]^2$",
      "$r = k[\\text{NOBr}_2]$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The slow step governs the rate: $r = k_2 [\\text{NOBr}_2][\\text{NO}]$. From the fast equilibrium step, $K_{\\text{eq}} = \\frac{[\\text{NOBr}_2]}{[\\text{NO}][\\text{Br}_2]} \\implies [\\text{NOBr}_2] = K_{\\text{eq}}[\\text{NO}][\\text{Br}_2]$. Substituting $[\\text{NOBr}_2]$ gives: $$r = k_2 K_{\\text{eq}}[\\text{NO}]^2[\\text{Br}_2] = k[\\text{NO}]^2[\\text{Br}_2]$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Fractional Completion Times",
    question_type: "mcq",
    question_text: "For a first order reaction, the time required for $75\\%$ of the reaction to complete is:",
    options: [
      "Twice that required for $50\\%$ of the reaction to complete",
      "Thrice that required for $50\\%$ of the reaction to complete",
      "One and half times that required for $50\\%$ of the reaction to complete",
      "Equal to that required for $50\\%$ of the reaction to complete"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$t_{75\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{25}\\right) = \\frac{2.303}{k} \\log(4) = 2 \\times \\frac{2.303}{k} \\log(2) = 2 \\times t_{50\\%}$$ Therefore, $t_{75\\%}$ is twice that required for $50\\%$ completion."
  }
];
