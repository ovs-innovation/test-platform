/**
 * Chemical Kinetics Question Bank - Part 4 (Questions 113 to 134)
 * Source: "Momentum Booster for NEET - Chemical Kinetics" (Pages 9 and 10)
 */

export const kineticsPart4 = [
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Time to Reduce to One-Tenth",
    question_type: "mcq",
    question_text: "Gaseous $\\text{N}_2\\text{O}_5$ decomposes according to the following equation:\n\n$$\\text{N}_2\\text{O}_5(\\text{g}) \\rightarrow 2\\text{NO}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g})$$\n\nThe experimental rate law is $-\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = k[\\text{N}_2\\text{O}_5]$. At a certain temperature the rate constant is $k = 5 \\times 10^{-4}\\text{ s}^{-1}$. In how many seconds will the concentration of $\\text{N}_2\\text{O}_5$ decrease to one-tenth of its initial value?",
    options: [
      "$2 \\times 10^3\\text{ s}$",
      "$4.6 \\times 10^3\\text{ s}$",
      "$2.1 \\times 10^3\\text{ s}$",
      "$1.4 \\times 10^3\\text{ s}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For a first order reaction: $$t = \\frac{2.303}{k} \\log\\left(\\frac{[\\text{N}_2\\text{O}_5]_0}{[\\text{N}_2\\text{O}_5]_t}\\right) = \\frac{2.303}{5 \\times 10^{-4}} \\log(10) = \\frac{2.303}{5 \\times 10^{-4}} \\times 1 = 4606\\text{ s} \\approx 4.6 \\times 10^3\\text{ s}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Mechanism with Intermediate Equilibrium",
    question_type: "mcq",
    question_text: "Nitrogen monoxide $\\text{NO}$, reacts with ozone $\\text{O}_3$, to produce $\\text{NO}_2$ and $\\text{O}_2$:\n\n$$\\text{NO}(\\text{g}) + \\text{O}_3(\\text{g}) \\rightarrow \\text{NO}_2(\\text{g}) + \\text{O}_2(\\text{g})$$\n\nConsider the following mechanism for the reaction:\n$$\\text{a. } \\text{O}_3(\\text{g}) \\rightleftharpoons \\text{O}_2(\\text{g}) + \\text{O}(\\text{g}) \\quad (\\text{fast})$$\n$$\\text{b. } \\text{NO}(\\text{g}) + \\text{O}(\\text{g}) \\rightarrow \\text{NO}_2(\\text{g}) \\quad (\\text{slow})$$\n\nWhich one of the following rate laws would be consistent with the mechanism proposed above?",
    options: [
      "$\\text{Rate} = k[\\text{NO}][\\text{O}_3][\\text{O}_2]$",
      "$\\text{Rate} = k[\\text{NO}][\\text{O}_3][\\text{O}_2]^{-1}$",
      "$\\text{Rate} = k[\\text{NO}]$",
      "$\\text{Rate} = k[\\text{NO}][\\text{O}_3]$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "The rate of reaction is dictated by the slow step: $$\\text{Rate} = k_2 [\\text{NO}][\\text{O}]$$ From the fast pre-equilibrium step: $$K_{\\text{eq}} = \\frac{[\\text{O}_2][\\text{O}]}{[\\text{O}_3]} \\implies [\\text{O}] = K_{\\text{eq}} \\frac{[\\text{O}_3]}{[\\text{O}_2]}$$ Substituting $[\\text{O}]$ into the rate law gives: $$\\text{Rate} = k_2 K_{\\text{eq}} [\\text{NO}][\\text{O}_3][\\text{O}_2]^{-1} = k[\\text{NO}][\\text{O}_3][\\text{O}_2]^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Comparative First Order Decomposition Ratios",
    question_type: "mcq",
    question_text: "$\\text{A}$ and $\\text{B}$ are two different chemical species undergoing first order decomposition with rate constants $k_1$ and $k_2$ which are in the ratio of $3 : 2$ respectively. If the initial concentration of $\\text{A}$ and $\\text{B}$ were in the ratio $[\\text{A}]_0 : [\\text{B}]_0 = 3 : 2$. What would be the ratio of $[\\text{A}] : [\\text{B}]$ after three half-lives of $\\text{A}$?",
    options: [
      "$1 : 1$",
      "$3 : 4$",
      "$1 : 2$",
      "$2 : 1$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "Let $t_{1/2(\\text{A})} = t_1$. After $3 t_1$, concentration of $\\text{A}$ remaining is: $[\\text{A}] = [\\text{A}]_0 (1/2)^3 = \\frac{3}{8}$. Since $k_1 / k_2 = 3/2$, we have $t_{1/2(\\text{B})} = \\frac{k_1}{k_2} t_{1/2(\\text{A})} = \\frac{3}{2} t_1 = 1.5 t_1$. The time elapsed $3 t_1$ corresponds to $\\frac{3 t_1}{1.5 t_1} = 2$ half-lives of $\\text{B}$. Thus, concentration of $\\text{B}$ remaining is: $[\\text{B}] = [\\text{B}]_0 (1/2)^2 = \\frac{2}{4} = \\frac{1}{2}$. The ratio is: $$\\frac{[\\text{A}]}{[\\text{B}]} = \\frac{3/8}{1/2} = \\frac{3}{4} = 3 : 4$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Concentration Remaining Over Time",
    question_type: "mcq",
    question_text: "For the zero order reaction, $\\text{A} \\rightarrow 2\\text{B}$, the rate constant is $2 \\times 10^{-4}\\text{ M min}^{-1}$. The reaction is started with $10\\text{ M}$ of $\\text{A}$. What will be concentration of $\\text{A}$ after 2 days?",
    options: [
      "$7.56\\text{ M}$",
      "$3.10\\text{ M}$",
      "$8.500\\text{ M}$",
      "$9.424\\text{ M}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Total elapsed time in minutes is: $$t = 2\\text{ days} \\times 24\\text{ hr/day} \\times 60\\text{ min/hr} = 2880\\text{ minutes}$$ For zero order: $$[\\text{A}] = [\\text{A}]_0 - kt = 10 - (2 \\times 10^{-4} \\times 2880) = 10 - 0.576 = 9.424\\text{ M}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "General Stoichiometric Gaseous Rate Constant",
    question_type: "mcq",
    question_text: "For a given first order gaseous reaction, if initial pressure is $P_0$ and after $t$ minutes total pressure becomes $P$, then the rate constant $K$ is:\n\n$$\\text{A}(\\text{g}) \\rightarrow n\\text{B}(\\text{g})$$",
    options: [
      "$K = \\frac{1}{t} \\ln\\left(\\frac{P_0}{P - P_0}\\right)$",
      "$K = \\frac{1}{t} \\ln\\left(\\frac{P_0}{P_0 - nP}\\right)$",
      "$K = \\frac{1}{t} \\ln\\left[\\frac{(n-1)P_0}{nP_0 - P}\\right]$",
      "$K = \\frac{2.303}{t} \\log\\left[\\frac{P_0}{(n-1)P - P_0}\\right]$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: "At time $t$: $P_A = P_0 - x$ and $P_B = nx$. Total pressure $P = (P_0 - x) + nx = P_0 + (n - 1)x \\implies x = \\frac{P - P_0}{n - 1}$. Substituting $x$ gives: $$P_A = P_0 - \\frac{P - P_0}{n - 1} = \\frac{(n - 1)P_0 - P + P_0}{n - 1} = \\frac{nP_0 - P}{n - 1}$$ Hence: $$K = \\frac{1}{t} \\ln\\left(\\frac{P_0}{P_A}\\right) = \\frac{1}{t} \\ln\\left[\\frac{(n - 1)P_0}{nP_0 - P}\\right]$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Second Order Half-Life Expression",
    question_type: "mcq",
    question_text: "For the reaction, $2\\text{A} \\rightarrow \\text{Product}$, the rate law is $\\text{rate} = k[\\text{A}]^2$. Half-life of reaction is given by:",
    options: [
      "$t_{1/2} = \\frac{1}{k[\\text{A}]_0}$",
      "$t_{1/2} = \\frac{1}{2k[\\text{A}]_0}$",
      "$t_{1/2} = \\frac{0.693}{k}$",
      "$t_{1/2} = \\frac{[\\text{A}]_0}{2k}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For a second order reaction following $-\\frac{d[A]}{dt} = k[A]^2$, integrating gives $\\frac{1}{[A]} - \\frac{1}{[A]_0} = kt$. Setting $[A] = [A]_0 / 2$ yields: $$\\frac{2}{[A]_0} - \\frac{1}{[A]_0} = k t_{1/2} \\implies t_{1/2} = \\frac{1}{k[A]_0}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Zero Order Complete Consumption Time",
    question_type: "mcq",
    question_text: "For a zero order reaction the initial amount of reactant is $100\\text{ g}$ and its half life is $20\\text{ minute}$. The amount of reactant left after $40\\text{ minute}$ will be:",
    options: [
      "$25\\text{ g}$",
      "$20\\text{ g}$",
      "$12.5\\text{ g}$",
      "$0\\text{ g}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "In zero order kinetics, equal amounts of reactant react in equal time intervals. In the first $20\\text{ min}$ (half-life), $50\\text{ g}$ is consumed, leaving $50\\text{ g}$. In the next $20\\text{ min}$, the remaining $50\\text{ g}$ is completely consumed. Thus, after $40\\text{ min}$ ($t_{100\\%} = 2 \\times t_{1/2}$), $0\\text{ g}$ remains."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Rate Constant from Half-Life",
    question_type: "mcq",
    question_text: "The half-life of a first order reaction is $69.3\\text{ seconds}$. The value of the rate constant of the reaction is:",
    options: [
      "$10\\text{ s}^{-1}$",
      "$0.1\\text{ s}^{-1}$",
      "$0.01\\text{ s}^{-1}$",
      "$0.001\\text{ s}^{-1}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$k = \\frac{0.693}{t_{1/2}} = \\frac{0.693}{69.3\\text{ s}} = 0.01\\text{ s}^{-1}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "90% Completion Time in Terms of Half-Life",
    question_type: "mcq",
    question_text: "The time of completion of $90\\%$ of a $1^{\\text{st}}$ order reaction is approx:",
    options: [
      "1.1 times that of half life",
      "2.2 times that of half life",
      "3.3 times that of half life",
      "4.4 times that of half life"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$t_{90\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{10}\\right) = \\frac{2.303}{k} \\times 1$$ Since $t_{1/2} = \\frac{0.693}{k}$: $$\\frac{t_{90\\%}}{t_{1/2}} = \\frac{2.303}{0.693} \\approx 3.32\\text{ times}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Arrhenius Pre-exponential Factor Significance",
    question_type: "mcq",
    question_text: "In Arrhenius's equation $K = A e^{-E_a/RT}$, $A$ may be termed as the rate constant at:",
    options: [
      "Very low temperature",
      "The boiling temperature",
      "Zero activation energy",
      "Very high activation energy"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "When the activation energy $E_a = 0$ (or at infinite temperature $T \\rightarrow \\infty$), the exponential term $e^{-E_a/RT} = e^0 = 1$. Under this condition, $K = A$. Hence, $A$ represents the rate constant when activation energy is zero."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "99.9% Completion Time",
    question_type: "mcq",
    question_text: "Time required for completion of $99.9\\%$ is _____ times of half life of the first order reaction:",
    options: [
      "2",
      "4",
      "10",
      "1"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "$$t_{99.9\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{0.1}\\right) = \\frac{2.303}{k} \\log(1000) = 3 \\times \\frac{2.303}{k} \\approx 10 \\times \\frac{0.693}{k} = 10 \\times t_{1/2}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Interconversion Between 87.5% and 99.9% Completion",
    question_type: "mcq",
    question_text: "$87.5\\%$ of a first order reaction is completed in $40\\text{ minute}$. The time in which $99.9\\%$ of the reaction will be completed is:",
    options: [
      "$120\\text{ minute}$",
      "$80\\text{ minute}$",
      "$160\\text{ minute}$",
      "$133.3\\text{ minute}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "$87.5\\%$ completion corresponds to 3 half-lives ($1 - (1/2)^3 = 7/8 = 87.5\\%$): $$3 \\times t_{1/2} = 40\\text{ min} \\implies t_{1/2} = \\frac{40}{3}\\text{ min}$$ Completion of $99.9\\%$ requires 10 half-lives: $$t_{99.9\\%} = 10 \\times t_{1/2} = 10 \\times \\frac{40}{3} = \\frac{400}{3} \\approx 133.3\\text{ minutes}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Catalyst Invariance of Enthalpy",
    question_type: "mcq",
    question_text: "Select the correct statement:",
    options: [
      "Molecularity of the reaction can be zero or fractional",
      "We always determine order of reaction from balanced chemical equation",
      "The enthalpy of reaction remains constant in the presence of catalyst",
      "All collisions of reactant molecules lead to product formation"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "A catalyst accelerates both forward and reverse reaction rates by identical factors without shifting equilibrium position or changing the enthalpy of reaction ($\\Delta H$)."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order 100% Completion Concept",
    question_type: "mcq",
    question_text: "Choose the incorrect statement:",
    options: [
      "Catalyst alters the rate of reaction by changing $E_a$",
      "$e^{-E_a/RT}$ is fraction of molecules with energy equal or greater than $E_a$",
      "3/4th of a first order reaction is half of the $t_{100\\%}$",
      "All of these"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "A first order reaction exponentially decays asymptotically and theoretically takes infinite time ($t_{100\\%} = \\infty$) to go to completion. Therefore, speaking of 'half of $t_{100\\%}$' is fundamentally incorrect."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Units of Rate Constant for Zero Order Gaseous Decomposition",
    question_type: "mcq",
    question_text: "The following chemical reaction is of zero order at high pressure:\n\n$$2\\text{NH}_3(\\text{g}) \\xrightarrow[\\text{Pt catalyst}]{\\text{1130 K}} \\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g})$$\n\nChoose the correct option(s) for the reaction:",
    options: [
      "Rate of reaction is proportional to the concentration of $\\text{NH}_3$",
      "Unit of rate constant is $\\text{mol L}^{-1}\\text{ s}^{-1}$",
      "Half-life of the reaction is independent of concentration of $\\text{NH}_3$",
      "All are correct"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "For a zero order reaction, $\\text{Rate} = k$. The unit of $k$ is identical to the unit of rate, which is $\\text{mol L}^{-1}\\text{ s}^{-1}$. Half-life is directly proportional to initial concentration ($t_{1/2} = [A]_0/2k$), not independent."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Time for Complete Completion of First Order",
    question_type: "mcq",
    question_text: "A first order reaction is $30\\%$ completed in $30\\text{ minute}$. How much time will it require for $100\\%$ completion?",
    options: [
      "$100\\text{ minute}$",
      "$50\\text{ minute}$",
      "$60\\text{ minute}$",
      "Infinite"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "For a first order reaction, $t = \\frac{2.303}{k} \\log\\left(\\frac{a}{a - x}\\right)$. For $100\\%$ completion, $x = a$, which gives $a - x = 0$ and $\\log(a / 0) = \\log(\\infty) = \\infty$. First-order reactions require infinite time for complete $100\\%$ consumption."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Complex Redox Stoichiometric Rate Relationships",
    question_type: "mcq",
    question_text: "Consider the following chemical reaction:\n\n$$5\\text{Br}^-(\\text{aq}) + \\text{BrO}_3^-(\\text{aq}) + 6\\text{H}^+(\\text{aq}) \\rightarrow 3\\text{Br}_2(\\text{aq}) + 3\\text{H}_2\\text{O}(\\text{l})$$\n\nChoose the correct expression:",
    options: [
      "$\\frac{\\Delta[\\text{Br}^-]}{\\Delta t} = -\\frac{5}{3}\\frac{\\Delta[\\text{Br}_2]}{\\Delta t}$",
      "$\\frac{\\Delta[\\text{BrO}_3^-]}{\\Delta t} = -\\frac{1}{3}\\frac{\\Delta[\\text{Br}_2]}{\\Delta t}$",
      "$\\frac{\\Delta[\\text{H}^+]}{\\Delta t} = \\frac{6}{5}\\frac{\\Delta[\\text{Br}^-]}{\\Delta t}$",
      "$\\frac{\\Delta[\\text{Br}_2]}{\\Delta t} = \\frac{3}{5}\\frac{\\Delta[\\text{H}^+]}{\\Delta t}$"
    ],
    correct_index: 1,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Reaction rate is written as: $$\\text{Rate} = -\\frac{1}{5}\\frac{\\Delta[\\text{Br}^-]}{\\Delta t} = -\\frac{\\Delta[\\text{BrO}_3^-]}{\\Delta t} = -\\frac{1}{6}\\frac{\\Delta[\\text{H}^+]}{\\Delta t} = +\\frac{1}{3}\\frac{\\Delta[\\text{Br}_2]}{\\Delta t}$$ Equating the rate of disappearance of $\\text{BrO}_3^-$ with rate of appearance of $\\text{Br}_2$: $$-\\frac{\\Delta[\\text{BrO}_3^-]}{\\Delta t} = \\frac{1}{3}\\frac{\\Delta[\\text{Br}_2]}{\\Delta t} \\implies \\frac{\\Delta[\\text{BrO}_3^-]}{\\Delta t} = -\\frac{1}{3}\\frac{\\Delta[\\text{Br}_2]}{\\Delta t}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Complex Reactions and Molecularity Properties",
    question_type: "mcq",
    question_text: "Consider the following statements regarding complex reaction:\nI. A complex reaction proceeds through elementary steps.\nII. The molecularity of reaction is the sum of molecularity of each step.\nIII. Order of a complex reaction is determined by the slowest step in its mechanism.\n\nChoose the correct statement(s):",
    options: [
      "I & III",
      "I, II & III",
      "Only I",
      "II & III"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Statement I is correct because complex reactions are sequences of elementary steps. Statement III is correct because the slowest elementary step is the rate-determining step. Statement II is false: molecularity has no meaning for overall complex reactions and is never obtained by summing step molecularities."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Threshold Energy Concept",
    question_type: "mcq",
    question_text: "The threshold energy of a chemical reaction depends upon:",
    options: [
      "Nature of reacting species",
      "Temperature",
      "Concentration of species",
      "Number of collision per unit time or collision frequency"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Threshold energy is the minimum energy that colliding reactant molecules must possess to produce an effective chemical reaction. It is an intrinsic property determined exclusively by the chemical nature of the reacting species."
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "First Order Residual Mass Calculation",
    question_type: "mcq",
    question_text: "If in a first order reaction $160\\text{ gm}$ of reactant becomes $80\\text{ gm}$ in $6.93\\text{ hrs}$, then what will be weight left after $23.03\\text{ hours}$?",
    options: [
      "$10\\text{ g}$",
      "$20\\text{ g}$",
      "$30\\text{ g}$",
      "$16\\text{ g}$"
    ],
    correct_index: 3,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "From half life: $t_{1/2} = 6.93\\text{ hrs} \\implies k = \\frac{0.693}{6.93} = 0.1\\text{ hr}^{-1}$. Now using first-order equation for $t = 23.03\\text{ hrs}$: $$k t = 0.1 \\times 23.03 = 2.303 = 2.303 \\log\\left(\\frac{160}{w}\\right) \\implies \\log\\left(\\frac{160}{w}\\right) = 1 \\implies \\frac{160}{w} = 10 \\implies w = 16\\text{ g}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Half-Life from Quarter Remaining Time",
    question_type: "mcq",
    question_text: "Time taken to reduce the concentration of a first order reaction to $1/4^{\\text{th}}$ of initial concentration is $20\\text{ minute}$. Its half life is:",
    options: [
      "$10\\text{ minute}$",
      "$60\\text{ minute}$",
      "$120\\text{ minute}$",
      "$40\\text{ minute}$"
    ],
    correct_index: 0,
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Reduction to $1/4 = (1/2)^2$ corresponds to exactly 2 half-lives: $$2 \\times t_{1/2} = 20\\text{ min} \\implies t_{1/2} = 10\\text{ minutes}$$"
  },
  {
    category: "Chemistry",
    subject: "Chemistry",
    chapter: "Chemical Kinetics",
    topic: "Units of Rate Constant for Fractional Order",
    question_type: "mcq",
    question_text: "For the reaction:\n\n$$\\text{CH}_3\\text{OCH}_3(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g}) + \\text{H}_2(\\text{g}) + \\text{CO}(\\text{g})$$\n\nThe rate of reaction is given as $R = k(p_{\\text{CH}_3\\text{OCH}_3})^{3/2}$ in a closed vessel. If pressure is expressed in terms of bar and time in minutes then the units of rate constant ($k$) should be:",
    options: [
      "$\\text{bar}^{1/2}\\text{ min}^{-1}$",
      "$\\text{bar}^{1/2}\\text{ min}$",
      "$\\text{bar}^{-1/2}\\text{ min}^{-1}$",
      "$\\text{bar}^{-3/2}\\text{ min}^{-1}$"
    ],
    correct_index: 2,
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "General unit of rate constant for reaction of order $n$ in terms of pressure is: $$\\text{Unit of } k = (\\text{pressure})^{1 - n} (\\text{time})^{-1}$$ For $n = 3/2$: $$\\text{Unit of } k = \\text{bar}^{1 - 3/2} \\text{min}^{-1} = \\text{bar}^{-1/2}\\text{ min}^{-1}$$"
  }
];
