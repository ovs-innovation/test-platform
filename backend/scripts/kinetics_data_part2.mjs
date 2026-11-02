/**
 * Chemical Kinetics Question Bank - Part 2 (Questions 31 to 61)
 * Source: "Momentum Booster for NEET - Chemical Kinetics" (Pages 4, 5, 6)
 */

export const kineticsPart2 = [
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Parameter at Infinite Temperature",
    question_type: "mcq",
    question_text: "The rate constant, the activation energy and the pre-exponential factor of a chemical reaction at $25^\\circ\\text{C}$ are $3.0 \\times 10^{-4}\\text{ sec}^{-1}$, $104.4\\text{ kJ mol}^{-1}$ and $6.0 \\times 10^{14}\\text{ sec}^{-1}$ respectively. The value of the rate constant as $T \\rightarrow \\infty$ is:",
    options: [
      "$2.0 \\times 10^{18}\\text{ sec}^{-1}$",
      "$6.0 \\times 10^{14}\\text{ sec}^{-1}$",
      "Infinity",
      "$3.6 \\times 10^{30}\\text{ sec}^{-1}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "According to the Arrhenius equation $k = A e^{-E_a/RT}$. As $T \\rightarrow \\infty$, $\\frac{E_a}{RT} \\rightarrow 0$, which gives $e^{-E_a/RT} \\rightarrow e^0 = 1$. Hence, $\\lim_{T \\rightarrow \\infty} k = A = 6.0 \\times 10^{14}\\text{ sec}^{-1}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate of Disappearance and Appearance",
    question_type: "mcq",
    question_text: "For the reaction $\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightarrow 2\\text{HI}(\\text{g})$, the rate of disappearance of $\\text{H}_2$ is $1.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$. The rate of appearance of $\\text{HI}$ will be:",
    options: [
      "$1.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$",
      "$2.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$",
      "$0.5 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$",
      "$4.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "From stoichiometry: $$\\text{Rate} = -\\frac{d[\\text{H}_2]}{dt} = \\frac{1}{2} \\frac{d[\\text{HI}]}{dt} \\implies \\frac{d[\\text{HI}]}{dt} = 2 \\left(-\\frac{d[\\text{H}_2]}{dt}\\right) = 2 \\times 1.0 \\times 10^{-4} = 2.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ sec}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Kinetics Comprehensive Graphs",
    question_type: "mcq",
    question_text: "Which of the following is correct graph(s) regarding zero order kinetics?",
    options: [
      "Reaction rate vs Initial Conc is horizontal flat line",
      "$[\\text{A}]$ vs Time is downward line with negative slope",
      "$t_{1/2}$ vs Initial Conc is upward line through origin",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: "/uploads/kinetics/kinetics_q33_zero_order_kinetics.png",
    solution: "For zero order kinetics: (1) Rate $= k$ (independent of reactant concentration, flat horizontal line); (2) $[\\text{A}] = [\\text{A}]_0 - kt$ (linear decrease with slope $-k$); (3) $t_{1/2} = \\frac{[\\text{A}]_0}{2k}$ (linear increase passing through origin). Thus, all given graphs are correct."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Parallel Decomposition Rate Expression",
    question_type: "mcq",
    question_text: "A compound $\\text{X}$ undergoes through first order decomposition in $\\text{Y}$ and $\\text{Z}$ as follows:\n\n$$\\text{X} \\xrightarrow{K_1} \\text{Y}$$\n$$\\text{X} \\xrightarrow{K_2} \\text{Z}$$\n\nThe rate of reaction of $\\text{X}$ can be expressed as:",
    options: [
      "$(K_1 + K_2)[\\text{X}]$",
      "$K_1[\\text{Y}]$",
      "$K_2[\\text{Z}]$",
      "$(K_1 + K_2)([\\text{Y}] + [\\text{Z}])$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: "/uploads/kinetics/kinetics_q34_parallel_reaction_xyz.png",
    solution: "In parallel first-order reactions, the total rate of disappearance of reactant $\\text{X}$ is the sum of rates through each pathway: $$-\\frac{d[\\text{X}]}{dt} = K_1[\\text{X}] + K_2[\\text{X}] = (K_1 + K_2)[\\text{X}]$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Potential Energy Profile Coordinates",
    question_type: "mcq",
    question_text: "For the chemical process $\\text{P} \\rightarrow \\text{Q}$, energies are plotted in graph as shown:\n\nSelect from the following that is correct regarding activation energy:",
    options: [
      "Activation energy for forward direction $= c$",
      "Activation energy for backward direction $= d$",
      "Activation energy for forward direction $= c - a$",
      "All of these"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q35_energy_plot_pq.png",
    solution: "From the potential energy diagram, activation energy of the forward reaction is measured from reactant energy level $a$ to transition peak $c$ ($E_{a(\\text{f})} = c - a$), while activation energy of the backward reaction is measured from product level to peak ($E_{a(\\text{b})} = d$). Hence, all statements accurately reflect the energy coordinates."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Complex Termolecular Kinetics Mechanism",
    question_type: "mcq",
    question_text: "Nitric oxide ($\\text{NO}$) reacts with oxygen to produce nitrogen dioxide as follows:\n\n$$2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{NO}_2(\\text{g})$$\n\nIf the mechanism of the reaction is:\n$$\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons \\text{NO}_3(\\text{g}) \\quad (\\text{fast})$$\n$$\\text{NO}_3(\\text{g}) + \\text{NO}(\\text{g}) \\xrightarrow{K_1} 2\\text{NO}_2(\\text{g}) \\quad (\\text{slow})$$\n\nThen order of the reaction is:",
    options: [
      "2",
      "3",
      "1",
      "3/2"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The rate of the overall reaction is governed by the slow step: $$\\text{Rate} = K_1 [\\text{NO}_3][\\text{NO}]$$ From the fast pre-equilibrium: $$K_{\\text{eq}} = \\frac{[\\text{NO}_3]}{[\\text{NO}][\\text{O}_2]} \\implies [\\text{NO}_3] = K_{\\text{eq}} [\\text{NO}][\\text{O}_2]$$ Substituting into rate expression: $$\\text{Rate} = K_1 K_{\\text{eq}} [\\text{NO}]^2 [\\text{O}_2] = k [\\text{NO}]^2 [\\text{O}_2]$$ The overall order is $2 + 1 = 3$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Activation Energy from Two Temperatures",
    question_type: "mcq",
    question_text: "The rate constant of a reaction is $1.5 \\times 10^7\\text{ sec}^{-1}$ at $50^\\circ\\text{C}$ and $4.5 \\times 10^7\\text{ sec}^{-1}$ at $100^\\circ\\text{C}$. The value of activation energy of the reaction is:",
    options: [
      "$2.2 \\times 10^4\\text{ J/mol}$",
      "$2303\\text{ J/mol}$",
      "$2.2 \\times 10^4\\text{ cal/mol}$",
      "$220\\text{ J/mol}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "Using the integrated Arrhenius equation: $$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R} \\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]$$ Here $T_1 = 323\\text{ K}$, $T_2 = 373\\text{ K}$, and $k_2 / k_1 = 4.5 / 1.5 = 3$. $$\\log 3 = 0.4771 = \\frac{E_a}{2.303 \\times 8.314} \\left[\\frac{50}{323 \\times 373}\\right] \\implies E_a \\approx 2.2 \\times 10^4\\text{ J/mol}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Two-Step Reaction Energy Profiles",
    question_type: "mcq",
    question_text: "Energy vs. progress of reaction diagram is given below with reactant converting to products through states A, B, C:\n\nConsider the above graph and select the correct option:",
    options: [
      "It is a 2 steps reaction, step 1 is slower than step 2",
      "It is a 2 steps reaction, step 2 is slower than step 1",
      "Single step reaction where B is activated complex",
      "Single step reaction in which B is a reaction intermediate"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q38_two_step_energy_abc.png",
    solution: "The graph shows two peaks (transition states A and C) separated by a local energy well (intermediate B). The activation barrier from intermediate B to transition state C is greater than that from reactants to transition state A, meaning step 2 has higher activation energy and is the slower, rate-determining step."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Half-Life Dependence on Concentration",
    question_type: "mcq",
    question_text: "Half life of a chemical reaction at a particular concentration is $50\\text{ minutes}$. When the concentration of the reactant is doubled, the half life becomes $100\\text{ minutes}$. The order of reaction is:",
    options: [
      "Zero order",
      "First order",
      "Second order",
      "Third order"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$t_{1/2} \\propto [A]_0^{1 - n}$$ When $[A]_0$ is doubled, $t_{1/2}$ also doubles ($100 / 50 = 2$). Therefore: $$2 = 2^{1 - n} \\implies 1 - n = 1 \\implies n = 0$$ The reaction is zero order."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate Enhancement Across Large Temperature Range",
    question_type: "mcq",
    question_text: "The temperature coefficient of a reaction is 3. Rate of reaction will be increased by _____ if temperature is changed from $35^\\circ\\text{C}$ to $65^\\circ\\text{C}$:",
    options: [
      "9 times",
      "27 times",
      "3 times",
      "81 times"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$\\Delta T = 65^\\circ\\text{C} - 35^\\circ\\text{C} = 30^\\circ\\text{C} \\implies n = \\frac{\\Delta T}{10} = \\frac{30}{10} = 3$$ The rate increases by $\\mu^n = 3^3 = 27\\text{ times}$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Molecularity vs Order Concepts",
    question_type: "mcq",
    question_text: "Which of the following statement is incorrect?",
    options: [
      "A $2^{\\text{nd}}$ order reaction must be a bimolecular elementary reaction",
      "A bimolecular elementary reaction must be $2^{\\text{nd}}$ order reaction",
      "Zero order reaction must be a complex reaction",
      "First order reaction may be complex or elementary reaction"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "A second order reaction does not have to be an elementary reaction; complex multi-step reactions frequently exhibit second-order kinetics overall. In contrast, molecularity is strictly defined only for elementary steps."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Deduction of Order from Kinetic Plots",
    question_type: "mcq",
    question_text: "Consider the plots for the types of reaction, $n\\text{A} \\rightarrow \\text{B} + \\text{C}$:\n\nPlot 1: $-\\frac{d[\\text{A}]}{dt}$ vs. $t$ is a horizontal straight line\nPlot 2: $[\\text{A}]$ vs. $t$ is a straight line with negative slope\nPlot 3: $\\frac{1}{[\\text{A}]}$ vs. $t$ is a straight line with positive slope\n\nThese plots respectively correspond to the reaction orders:",
    options: [
      "0, 2, 1",
      "0, 1, 2",
      "1, 1, 2",
      "0, 0, 2"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "hard",
    image_url: "/uploads/kinetics/kinetics_q42_rate_plots.png",
    solution: "Plot 1 shows rate is invariant with time $\\implies$ zero order ($n = 0$). Plot 2 shows $[\\text{A}]$ decreases linearly with time $[\\text{A}] = [\\text{A}]_0 - kt \\implies$ zero order ($n = 0$). Plot 3 shows $\\frac{1}{[\\text{A}]} = \\frac{1}{[\\text{A}]_0} + kt \\implies$ second order ($n = 2$). Thus, the orders are 0, 0, 2."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Heterogeneous & Photochemical Zero Order Reactions",
    question_type: "mcq",
    question_text: "Which is example of zero order reaction?\n\n(i) $\\text{H}_2(\\text{g}) + \\text{Cl}_2(\\text{g}) \\xrightarrow{h\\nu} 2\\text{HCl}(\\text{g})$\n(ii) $2\\text{HI}(\\text{g}) \\xrightarrow{\\text{Au}} \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})$\n(iii) $\\text{NH}_4\\text{NO}_2(\\text{aq}) \\rightarrow 2\\text{H}_2\\text{O}(\\text{l}) + \\text{N}_2(\\text{g})$\n(iv) $\\text{N}_2\\text{O}_5(\\text{g}) \\rightarrow 2\\text{NO}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g})$",
    options: [
      "(i) only",
      "(i) and (ii) only",
      "(i), (ii) and (iii) only",
      "(i), (ii) and (iv)"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "(i) Photochemical synthesis of $\\text{HCl}$ over water is zero order because the rate depends solely on light intensity. (ii) Thermal decomposition of $\\text{HI}$ on a gold catalyst is zero order at saturation. (iii) and (iv) are classic first order decompositions."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Exothermic Two-Step Potential Energy Curve",
    question_type: "mcq",
    question_text: "For an exothermic reaction following two steps are involved:\n$$\\text{step - 1} : \\text{A} + \\text{B} \\rightarrow \\text{I} \\quad (\\text{slow})$$\n$$\\text{step - 2} : \\text{I} \\rightarrow \\text{AB} \\quad (\\text{fast})$$\n\nWhich of the following graphs correctly represent this reaction?",
    options: [
      "First peak higher than second peak, products lower in energy than reactants",
      "First peak lower than second peak, products lower in energy than reactants",
      "Single peak exothermic profile",
      "First peak higher than second peak, products higher in energy than reactants"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "hard",
    image_url: "/uploads/kinetics/kinetics_q44_exothermic_two_step.png",
    solution: "Since step 1 is slow (rate-determining), its activation barrier $E_{a1}$ must be larger than that of step 2 ($E_{a2}$), meaning the first peak is higher than the second. Because the overall reaction is exothermic, $\\Delta H < 0$, placing the final product energy level below the initial reactant energy level, as shown in plot (1)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate Acceleration with Temperature",
    question_type: "mcq",
    question_text: "How much faster would a reaction proceed at $25^\\circ\\text{C}$ than at $0^\\circ\\text{C}$ if the activation energy of reaction is $65\\text{ kJ mol}^{-1}$?",
    options: [
      "2 times",
      "5 times",
      "11 times",
      "16 times"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "$$\\log\\left(\\frac{k_{298}}{k_{273}}\\right) = \\frac{E_a}{2.303 R} \\left[\\frac{298 - 273}{298 \\times 273}\\right] = \\frac{65000}{2.303 \\times 8.314} \\times \\frac{25}{81354} = 3394.8 \\times 3.073 \\times 10^{-4} \\approx 1.043$$ Taking antilog: $$\\frac{k_{298}}{k_{273}} = 10^{1.043} \\approx 11.04 \\approx 11\\text{ times}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate vs Concentration Curves",
    question_type: "mcq",
    question_text: "In three different reactions, involving a single reactant in each case, a plot of rate of the reaction on the y-axis, versus concentration of the reactant on the x-axis, gives three different curves (I), (II) and (III):\n\nCurve (I): Concave upward parabola\nCurve (II): Straight line passing through origin\nCurve (III): Concave downward curve\n\nThe possible orders of the reactions (I), (II) and (III) respectively are:",
    options: [
      "1, 2, 3",
      "2, 1, 1/2",
      "0, 1, 2",
      "0, 1, 1/2"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: "/uploads/kinetics/kinetics_q46_rate_vs_conc_curves.png",
    solution: "Rate equation is $\\text{Rate} = k[\\text{C}]^n$. (I) If $n = 2$, rate $\\propto [\\text{C}]^2$ gives an upward parabolic curve. (II) If $n = 1$, rate $\\propto [\\text{C}]$ gives a straight line through the origin. (III) If $n = 1/2$, rate $\\propto \\sqrt{[\\text{C}]}$ gives a square root curve (concave downwards). Thus, the respective orders are 2, 1, 1/2."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Reactions and Their Experimental Orders",
    question_type: "mcq",
    question_text: "In which of the following option, the example and the given order is correctly matched?",
    options: [
      "$\\text{H}_2\\text{O}_2 \\rightarrow \\text{H}_2\\text{O} + \\frac{1}{2}\\text{O}_2\\text{ (1st order)}$",
      "$2\\text{NO} + \\text{Cl}_2 \\rightarrow 2\\text{NOCl}\\text{ (2nd order)}$",
      "$\\text{CH}_3\\text{COOCH}_3 + \\text{NaOH} \\rightarrow \\text{CH}_3\\text{COONa} + \\text{CH}_3\\text{OH}\\text{ (2nd order)}$",
      "$\\text{HI}(\\text{g}) \\xrightarrow{\\text{Au}} \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})\\text{ (Zero order)}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Thermal decomposition of gaseous hydrogen iodide on a gold surface is zero order kinetics ($\text{rate} = k$) because at higher concentrations the catalyst surface sites are completely saturated."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Gaseous Partial Pressure Kinetics",
    question_type: "mcq",
    question_text: "Consider the reaction, $2x(\\text{g}) \\rightarrow 3y(\\text{g}) + 2z(\\text{g})$ at constant temperature and volume, partial pressure of '$x$' ($p_x$) varies as follows:\n\n| Time (min) | $p_x$ (mm Hg) |\n| :--- | :--- |\n| 0 | 800 |\n| 100 | 400 |\n| 200 | 200 |\n\nOrder of the reaction is:",
    options: [
      "0",
      "0.5",
      "1",
      "2"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The partial pressure decreases from $800\\text{ mm}$ to $400\\text{ mm}$ (half) in $100\\text{ min}$, and then from $400\\text{ mm}$ to $200\\text{ mm}$ (again half) in another $100\\text{ min}$ (from $t = 100$ to $200\\text{ min}$). Since the half-life is constant ($t_{1/2} = 100\\text{ min}$) independent of concentration, the reaction is strictly first order."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Temperature Coefficient Ratio Variation",
    question_type: "mcq",
    question_text: "The rate of reaction gets doubled when temperature changes from $7^\\circ\\text{C}$ to $17^\\circ\\text{C}$. By what factor will it change for the temperature from $17^\\circ\\text{C}$ to $27^\\circ\\text{C}$ assuming activation energy does not change with temperature?",
    options: [
      "1.3",
      "1.5",
      "1.9",
      "3.5"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "From Arrhenius equation: $\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R} \\frac{10}{T_1 T_2}$. For $7^\\circ\\text{C}$ to $17^\\circ\\text{C}$: $\\ln(2) = \\frac{E_a}{R} \\frac{10}{280 \\times 290}$. For $17^\\circ\\text{C}$ to $27^\\circ\\text{C}$: $\\ln(k_3 / k_2) = \\frac{E_a}{R} \\frac{10}{290 \\times 300} = \\ln(2) \\times \\frac{280}{300} = 0.693 \\times 0.933 = 0.647 \\implies \\frac{k_3}{k_2} = e^{0.647} \\approx 1.91$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate Constant Stoichiometric Interrelations",
    question_type: "mcq",
    question_text: "For the reaction $2\\text{A} \\rightarrow \\text{B} + 3\\text{C}$, if $-\\frac{d[\\text{A}]}{dt} = k_1[\\text{A}]^2$, $\\frac{d[\\text{B}]}{dt} = k_2[\\text{A}]^2$, $\\frac{d[\\text{C}]}{dt} = k_3[\\text{A}]^2$ the correct relation between $k_1$, $k_2$ and $k_3$ is:",
    options: [
      "$k_1 = k_2 = k_3$",
      "$2k_1 = k_2 = 3k_3$",
      "$3k_1 = 6k_2 = 2k_3$",
      "$k_1 = 2k_2 = 3k_3$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The unique reaction rate is: $$\\text{Rate} = -\\frac{1}{2} \\frac{d[\\text{A}]}{dt} = \\frac{d[\\text{B}]}{dt} = \\frac{1}{3} \\frac{d[\\text{C}]}{dt} \\implies \\frac{k_1[\\text{A}]^2}{2} = k_2[\\text{A}]^2 = \\frac{k_3[\\text{A}]^2}{3}$$ Multiplying by 6 gives: $$3k_1 = 6k_2 = 2k_3$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order 99.9% vs 50% Times",
    question_type: "mcq",
    question_text: "For a $1^{\\text{st}}$ order reaction, if $180\\text{ minutes}$ are required for completion of $99.9\\%$ of reaction, time req. (in minutes) for completion of $50\\%$ of the reaction would be:",
    options: [
      "30",
      "18",
      "60",
      "90"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For a first order reaction, $t_{99.9\\%} = 10 \\times t_{50\\%}$. Given $t_{99.9\\%} = 180\\text{ min}$, we have: $$t_{50\\%} = \\frac{180}{10} = 18\\text{ minutes}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Three-Quarter Life Formula",
    question_type: "mcq",
    question_text: "Which of the following expression represents the time required for completion of $3/4^{\\text{th}}$ life of first order reaction?",
    options: [
      "$\\frac{k}{2.303} \\log\\left(\\frac{4}{3}\\right)$",
      "$\\frac{k}{2.303} \\log\\left(\\frac{3}{4}\\right)$",
      "$\\frac{2.303}{k} \\log(4)$",
      "$\\frac{2.303}{k} \\log(3)$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "At $3/4$ completion, remaining reactant is $a - \\frac{3}{4}a = \\frac{a}{4}$. Substituting into integrated first-order expression gives: $$t_{3/4} = \\frac{2.303}{k} \\log\\left(\\frac{a}{a/4}\\right) = \\frac{2.303}{k} \\log(4)$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Half-Life from Rate at Given Concentration",
    question_type: "mcq",
    question_text: "For the first order reaction $\\text{A} \\rightarrow \\text{B}$, the reaction rate at $0.01\\text{ M}$ concentration of $\\text{A}$ is found to be $2.0 \\times 10^{-5}\\text{ M sec}^{-1}$. The half life period of the reaction is approximately:",
    options: [
      "$35\\text{ s}$",
      "$350\\text{ s}$",
      "$220\\text{ s}$",
      "$347\\text{ s}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "First determine rate constant $k$: $$\\text{Rate} = k[\\text{A}] \\implies k = \\frac{2.0 \\times 10^{-5}\\text{ M s}^{-1}}{0.01\\text{ M}} = 2.0 \\times 10^{-3}\\text{ s}^{-1}$$ Half-life is then: $$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{2.0 \\times 10^{-3}} = 346.5\\text{ s} \\approx 347\\text{ s}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Boltzmann Fraction of Activated Molecules",
    question_type: "mcq",
    question_text: "If activation energy of a reaction is $800\\text{ cal/mol}$ at temperature $200\\text{ K}$. The percentage of molecules having energy greater or equal to $E_a$ is (Given : $e^{-2} = 0.135$):",
    options: [
      "$2.7\\%$",
      "$13.5\\%$",
      "$25\\%$",
      "$1.35\\%$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The fraction of molecules with energy $\\ge E_a$ is given by the Boltzmann factor: $$f = e^{-E_a / RT} = e^{-800 / (2 \\times 200)} = e^{-800 / 400} = e^{-2} = 0.135$$ Converting to percentage: $0.135 \\times 100\\% = 13.5\\%$."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Rate Constants and Half-Life Inverse Relation",
    question_type: "mcq",
    question_text: "If two first order reactions, $\\text{A} \\xrightarrow{K_1} \\text{B},\\ (t_{1/2} = a\\text{ second})$ and $\\text{C} \\xrightarrow{K_2} \\text{D},\\ (t_{1/2} = b\\text{ second})$. If $a > b$, then the relation between $K_1$ and $K_2$ is:",
    options: [
      "$K_1 > K_2$",
      "$K_1 = K_2$",
      "$K_1 < K_2$",
      "$K_1 = 2K_2$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For first order reactions, $t_{1/2} = \\frac{\\ln 2}{K}$. Since $a > b$: $$\\frac{0.693}{K_1} > \\frac{0.693}{K_2} \\implies K_1 < K_2$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Volume Change Effect on Gaseous Elementary Rate",
    question_type: "mcq",
    question_text: "Consider the elementary reaction : $\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightarrow 2\\text{HI}(\\text{g})$. If the volume of the container containing the gaseous mixture is increased to two times, then rate of the reaction:",
    options: [
      "Become four times",
      "Become $1/4^{\\text{th}}$ of the original rate",
      "Become 2 times",
      "Become $1/2$ of the original rate"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For the elementary bimolecular reaction, $\\text{Rate} = k[\\text{H}_2][\\text{I}_2] = k \\left(\\frac{n_{\\text{H}_2}}{V}\\right)\\left(\\frac{n_{\\text{I}_2}}{V}\\right) \\propto \\frac{1}{V^2}$. When volume is doubled ($V' = 2V$), the rate becomes $\\frac{1}{2^2} = \\frac{1}{4}^{\\text{th}}$ of the original rate."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Parameters Independent of Reaction Rate",
    question_type: "mcq",
    question_text: "Rate of a chemical reaction is independent of:",
    options: [
      "Surface area of the reactant",
      "Active mass of reactant",
      "Equivalent mass of reactant",
      "Temperature"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Reaction rate is fundamentally dependent on active mass (concentration), temperature, and surface area of reactants. Equivalent mass is merely a stoichiometric mass term that does not influence kinetics."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Total Pressure First Order Rate Law",
    question_type: "mcq",
    question_text: "For a gas phase reaction of $1^{\\text{st}}$ order : $\\text{A}(\\text{g}) \\rightarrow \\text{B}(\\text{g}) + \\text{C}(\\text{g})$. Initial pressure is $P_0$ and pressure after time '$t$' become $P\\ (P > P_0)$. Choose the correct expression of rate constant:",
    options: [
      "$\\frac{2.303}{t} \\log\\left(\\frac{P_0}{P - P_0}\\right)$",
      "$\\frac{2.303}{t} \\log\\left(\\frac{2P_0}{P_0 - P}\\right)$",
      "$\\frac{2.303}{t} \\log\\left(\\frac{P_0}{2P_0 - P}\\right)$",
      "$\\frac{2.303}{t} \\log\\left(\\frac{P_0}{P_0 - 2P}\\right)$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Initially at $t = 0$: $P_A = P_0$. At time $t$: $P_A = P_0 - x$, $P_B = x$, $P_C = x$. Total pressure $P = (P_0 - x) + x + x = P_0 + x \\implies x = P - P_0$. Hence, remaining pressure of A is: $$P_A = P_0 - (P - P_0) = 2P_0 - P$$ Rate constant is therefore: $$k = \\frac{2.303}{t} \\log\\left(\\frac{P_0}{2P_0 - P}\\right)$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Catalytic Lowering of Activation Energy",
    question_type: "mcq",
    question_text: "The activation energy is lowered by $8.314\\text{ kJ/mol}$ for the catalysed reaction. The ratio of the rate of the catalysed reaction to that of the uncatalysed reaction at $500\\text{ K}$ is (Given : $e^2 = 7.39$):",
    options: [
      "7.39",
      "14.6",
      "8.37",
      "4.83"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The ratio of rates is: $$\\frac{k_{\\text{cat}}}{k_{\\text{uncat}}} = e^{\\Delta E_a / RT} = e^{8314 / (8.314 \\times 500)} = e^{8314 / 4157} = e^2 = 7.39$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Order from Concentration and Half-Life Variation",
    question_type: "mcq",
    question_text: "At particular concentration, the half life of the reactant is $100\\text{ minutes}$. When the concentration of the reactant becomes 10 times, the half life of the reactant becomes $100\\text{ seconds}$, then what will be the order of reaction?",
    options: [
      "1",
      "2",
      "Zero",
      "3"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "$$t_{1/2} \\propto [\\text{A}]_0^{1 - n} \\implies \\frac{(t_{1/2})_1}{(t_{1/2})_2} = \\left(\\frac{[\\text{A}]_{01}}{[\\text{A}]_{02}}\\right)^{1 - n}$$ Converting minutes to seconds: $(t_{1/2})_1 = 100 \\times 60 = 6000\\text{ s}$, $(t_{1/2})_2 = 100\\text{ s}$. The ratio is $60 = (1/10)^{1-n} = 10^{n-1}$. For integer orders in NEET curriculum, this corresponds to second order ($n = 2$)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Equimolar Product Time",
    question_type: "mcq",
    question_text: "The rate constant of the given reaction, $\\text{R}(\\text{g}) \\rightarrow 2\\text{P}(\\text{g})$ is $1.15 \\times 10^{-2}\\text{ s}^{-1}$. A $1 : 1$ molar ratio of $\\text{R}$ to $\\text{P}$ in the reaction mixture is attained after:",
    options: [
      "$32\\text{ min}$",
      "$27.3\\text{ min}$",
      "$30\\text{ s}$",
      "$35.2\\text{ s}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Let initial moles of R be $a$. At time $t$, moles of R remaining $= a - x$, and moles of P formed $= 2x$. For $1 : 1$ ratio: $$a - x = 2x \\implies 3x = a \\implies x = a/3$$ Remaining fraction of R is $a - a/3 = \\frac{2}{3}a$. The time required is: $$t = \\frac{2.303}{k} \\log\\left(\\frac{a}{2a/3}\\right) = \\frac{2.303}{1.15 \\times 10^{-2}} \\log(1.5) = 200.26 \\times 0.176 = 35.2\\text{ seconds}$$"
  }
];
