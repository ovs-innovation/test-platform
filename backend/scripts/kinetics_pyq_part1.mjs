export const kineticsPyqPart1 = [
  {
    question_number: 1,
    question_text: "For an elementary chemical reaction, the Arrhenius plot is given below.\n\n![Arrhenius Plot](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400832/edvedum/questions/chemical_kinetics/kinetics_q1_diagram.png)\n\nIf the energy of activation is $6.64\\text{ kJ mol}^{-1}$ and $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$, the temperature at which the rate constant becomes $e^2\\text{ min}^{-1}$, is",
    options: [
      "250 K",
      "125 K",
      "150 K",
      "200 K"
    ],
    correct_option: "D",
    solution_text: "From the Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{RT}$$\nFrom the given plot of $\\ln k$ vs $1/T$, the intercept on the $y$-axis (when $1/T = 0$) is $\\ln A = 6$.\nWhen $k = e^2$, we have $\\ln k = 2$.\nSubstitute into the equation:\n$$2 = 6 - \\frac{E_a}{RT} \\implies \\frac{E_a}{RT} = 4$$\n$$T = \\frac{E_a}{4R} = \\frac{6640\\text{ J mol}^{-1}}{4 \\times 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}} = \\frac{6640}{33.2} = 200\\text{ K}$$\nHence, the correct option is (D)."
  },
  {
    question_number: 2,
    question_text: "$2A \\xrightarrow{k} B$ is a zero-order reaction, where $k = 1.0\\text{ mol L}^{-1}\\text{ min}^{-1}$. If the initial concentration of $A$ is $2\\text{ M}$, then the time taken to complete $75\\%$ of the reaction will be",
    options: [
      "2.0 min",
      "1.5 min",
      "0.75 min",
      "1.0 min"
    ],
    correct_option: "C",
    solution_text: "For the reaction $2A \\rightarrow B$, the rate of disappearance of $A$ is:\n$$-\\frac{1}{2} \\frac{d[A]}{dt} = k \\implies -\\frac{d[A]}{dt} = 2k$$\nIntegrating for a zero-order reaction:\n$$[A]_0 - [A]_t = 2k \\cdot t$$\nAmount of $A$ reacted at $75\\%$ completion is:\n$$[A]_0 - [A]_t = 0.75 \\times [A]_0 = 0.75 \\times 2\\text{ M} = 1.5\\text{ M}$$\nTherefore:\n$$1.5 = 2 \\times (1.0) \\times t \\implies t = \\frac{1.5}{2} = 0.75\\text{ min}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 3,
    question_text: "Match List I with List II :\n\n| List-I (Order of reaction) | List-II (Unit of rate constant) |\n| :--- | :--- |\n| A. Zero order | I. $\\text{mol}^{-1}\\text{ L s}^{-1}$ |\n| B. First order | II. $\\text{mol}^{-2}\\text{ L}^2\\text{ s}^{-1}$ |\n| C. Second order | III. $\\text{s}^{-1}$ |\n| D. Third order | IV. $\\text{mol L}^{-1}\\text{ s}^{-1}$ |\n\nChoose the correct answer from the options given below :",
    options: [
      "A-IV, B-II, C-I, D-III",
      "A-IV, B-III, C-I, D-II",
      "A-IV, B-III, C-II, D-I",
      "A-I, B-II, C-III, D-IV"
    ],
    correct_option: "B",
    solution_text: "The general unit of rate constant $k$ for an $n$-th order reaction is $(\\text{mol L}^{-1})^{1-n}\\text{ s}^{-1}$:\n- Zero order ($n=0$): $\\text{mol L}^{-1}\\text{ s}^{-1}$ $\\rightarrow$ A-IV\n- First order ($n=1$): $\\text{s}^{-1}$ $\\rightarrow$ B-III\n- Second order ($n=2$): $\\text{mol}^{-1}\\text{ L s}^{-1}$ $\\rightarrow$ C-I\n- Third order ($n=3$): $\\text{mol}^{-2}\\text{ L}^2\\text{ s}^{-1}$ $\\rightarrow$ D-II\nThus, the correct match is A-IV, B-III, C-I, D-II, corresponding to option (B)."
  },
  {
    question_number: 4,
    question_text: "For a certain reaction $R \\rightarrow \\text{Product}$, the plot of concentration $[R]$ vs time has a negative slope as shown.\n\n![Concentration vs Time](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400837/edvedum/questions/chemical_kinetics/kinetics_q4_diagram.png)\n\nThe order of reaction is :",
    options: [
      "0",
      "1",
      "2",
      "2.5"
    ],
    correct_option: "A",
    solution_text: "For a zero-order reaction:\n$$[R] = [R]_0 - kt$$\nPlotting $[R]$ vs $t$ gives a straight line with $y$-intercept $[R]_0$ and negative slope equal to $-k$. Hence, the order of the reaction is 0 (Option A)."
  },
  {
    question_number: 5,
    question_text: "Given below is an expression for the rate constant of a first-order reaction occurring at a certain temperature, $T\\text{ (K)}$.\n$$\\ln k = 14.34 - \\frac{1.25 \\times 10^4}{T}$$\nThe energy of activation in $\\text{kcal mol}^{-1}$ for the reaction is :\n(Given: $k$ is in $\\text{s}^{-1}$, $R = 1.987\\text{ cal mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "24.84",
      "14.34",
      "18.63",
      "12.42"
    ],
    correct_option: "A",
    solution_text: "Comparing with the logarithmic Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{RT}$$\nWe have:\n$$\\frac{E_a}{RT} = \\frac{1.25 \\times 10^4}{T} \\implies E_a = 1.25 \\times 10^4 \\times R$$\nGiven $R = 1.987\\text{ cal mol}^{-1}\\text{ K}^{-1} \\approx 1.987 \\times 10^{-3}\\text{ kcal mol}^{-1}\\text{ K}^{-1}$:\n$$E_a = 1.25 \\times 10^4 \\times 1.987 \\times 10^{-3}\\text{ kcal mol}^{-1} = 12.5 \\times 1.987 = 24.8375 \\approx 24.84\\text{ kcal mol}^{-1}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 6,
    question_text: "If the rate constant of a reaction is $0.03\\text{ s}^{-1}$, how much time does it take for $7.2\\text{ mol L}^{-1}$ concentration of the reactant to get reduced to $0.9\\text{ mol L}^{-1}$? (Given: $\\log 2 = 0.301$)",
    options: [
      "210 s",
      "21.0 s",
      "69.3 s",
      "23.1 s"
    ],
    correct_option: "C",
    solution_text: "Since the unit of rate constant is $\\text{s}^{-1}$, the reaction is of first order.\nFor a first-order reaction:\n$$t = \\frac{2.303}{k} \\log\\left(\\frac{[A]_0}{[A]_t}\\right)$$\nGiven $[A]_0 = 7.2\\text{ mol L}^{-1}$, $[A]_t = 0.9\\text{ mol L}^{-1}$, and $k = 0.03\\text{ s}^{-1}$:\n$$\\frac{[A]_0}{[A]_t} = \\frac{7.2}{0.9} = 8 = 2^3$$\n$$\\log 8 = 3 \\log 2 = 3 \\times 0.3010 = 0.9030$$\n$$t = \\frac{2.303}{0.03} \\times 0.9030 = \\frac{2.0796}{0.03} = 69.32\\text{ s} \\approx 69.3\\text{ s}$$\nAlternatively, reduction from $7.2$ to $0.9$ takes 3 half-lives ($7.2 \\rightarrow 3.6 \\rightarrow 1.8 \\rightarrow 0.9$):\n$$t = 3 \\times t_{1/2} = 3 \\times \\frac{0.693}{0.03} = 3 \\times 23.1 = 69.3\\text{ s}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 7,
    question_text: "If the half-life ($t_{1/2}$) for a first order reaction is 1 minute, then the time required for $99.9\\%$ completion of the reaction is closest to :",
    options: [
      "5 minutes",
      "10 minutes",
      "2 minutes",
      "4 minutes"
    ],
    correct_option: "B",
    solution_text: "For a first-order reaction:\n$$t_{99.9\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{100 - 99.9}\\right) = \\frac{2.303}{k} \\log(10^3) = \\frac{2.303 \\times 3}{k} = \\frac{6.909}{k}$$\nSince $t_{1/2} = \\frac{0.693}{k} = 1\\text{ min}$:\n$$t_{99.9\\%} = \\frac{6.909}{0.693} \\times t_{1/2} \\approx 10 \\times t_{1/2} = 10 \\times 1\\text{ min} = 10\\text{ minutes}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 8,
    question_text: "Following data is for a reaction between reactants A and B :\n\n| Rate ($\\text{mol L}^{-1}\\text{ s}^{-1}$) | $[A]$ | $[B]$ |\n| :--- | :--- | :--- |\n| $2 \\times 10^{-3}$ | $0.1\\text{ M}$ | $0.1\\text{ M}$ |\n| $4 \\times 10^{-3}$ | $0.2\\text{ M}$ | $0.1\\text{ M}$ |\n| $1.6 \\times 10^{-2}$ | $0.2\\text{ M}$ | $0.2\\text{ M}$ |\n\nThe order of the reaction with respect to A and B, respectively, are",
    options: [
      "1, 0",
      "0, 1",
      "1, 2",
      "2, 1"
    ],
    correct_option: "C",
    solution_text: "Let the rate law be $\\text{Rate} = k[A]^x[B]^y$.\nFrom experiments 1 and 2, when $[B]$ is kept constant at $0.1\\text{ M}$ and $[A]$ is doubled from $0.1\\text{ M}$ to $0.2\\text{ M}$:\n$$\\frac{\\text{Rate}_2}{\\text{Rate}_1} = \\frac{4 \\times 10^{-3}}{2 \\times 10^{-3}} = 2 = \\left(\\frac{0.2}{0.1}\\right)^x = 2^x \\implies x = 1$$\nFrom experiments 2 and 3, when $[A]$ is kept constant at $0.2\\text{ M}$ and $[B]$ is doubled from $0.1\\text{ M}$ to $0.2\\text{ M}$:\n$$\\frac{\\text{Rate}_3}{\\text{Rate}_2} = \\frac{1.6 \\times 10^{-2}}{4 \\times 10^{-3}} = \\frac{16 \\times 10^{-3}}{4 \\times 10^{-3}} = 4 = \\left(\\frac{0.2}{0.1}\\right)^y = 2^y \\implies y = 2$$\nThus, the order with respect to A is 1 and with respect to B is 2. Hence, the correct option is (C)."
  },
  {
    question_number: 9,
    question_text: "Which of the following plot represents the variation of $\\ln k$ versus $\\frac{1}{T}$ in accordance with Arrhenius equation?",
    options: [
      "![Plot A](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400838/edvedum/questions/chemical_kinetics/kinetics_q9_opt_a.png)",
      "![Plot B](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400839/edvedum/questions/chemical_kinetics/kinetics_q9_opt_b.png)",
      "![Plot C](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400841/edvedum/questions/chemical_kinetics/kinetics_q9_opt_c.png)",
      "![Plot D](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400843/edvedum/questions/chemical_kinetics/kinetics_q9_opt_d.png)"
    ],
    correct_option: "C",
    solution_text: "According to the Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$$\nThis is of the form $y = c + mx$, where:\n- $y = \\ln k$\n- $x = 1/T$\n- $\\text{Slope } m = -\\frac{E_a}{R}$ (negative constant slope)\n- Intercept $c = \\ln A$ (positive intercept on $y$-axis)\nA plot of $\\ln k$ vs $1/T$ is a straight line having a negative slope decreasing from left to right as shown in plot (C)."
  },
  {
    question_number: 10,
    question_text: "Rate constants of a reaction at $500\\text{ K}$ and $700\\text{ K}$ are $0.04\\text{ s}^{-1}$ and $0.14\\text{ s}^{-1}$, respectively; then, activation energy of the reaction is :\n(Given: $\\log 3.5 = 0.5441$, $R = 8.31\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "182310 J",
      "18500 J",
      "18219 J",
      "18030 J"
    ],
    correct_option: "C",
    solution_text: "Using the Arrhenius formula:\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$\n$$\\frac{k_2}{k_1} = \\frac{0.14}{0.04} = 3.5$$\nGiven $\\log 3.5 = 0.5441$:\n$$0.5441 = \\frac{E_a}{2.303 \\times 8.31} \\left(\\frac{700 - 500}{500 \\times 700}\\right)$$\n$$0.5441 = \\frac{E_a}{19.138} \\left(\\frac{200}{350000}\\right) = \\frac{E_a}{19.138} \\left(\\frac{1}{1750}\\right)$$\n$$E_a = 0.5441 \\times 19.138 \\times 1750 = 18223.8 \\approx 18219\\text{ J}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 11,
    question_text: "Activation energy of any chemical reaction can be calculated if one knows the value of",
    options: [
      "rate constant at standard temperature",
      "probability of collision",
      "orientation of reactant molecules during collision",
      "rate constant at two different temperatures"
    ],
    correct_option: "D",
    solution_text: "According to the integrated Arrhenius equation:\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$$\nIf the rate constants $k_1$ and $k_2$ at two different temperatures $T_1$ and $T_2$ are known, the activation energy $E_a$ can be determined. Hence, option (D) is correct."
  },
  {
    question_number: 12,
    question_text: "Which plot of $\\ln k$ vs $\\frac{1}{T}$ is consistent with Arrhenius equation?",
    options: [
      "![Plot A](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400826/edvedum/questions/chemical_kinetics/kinetics_q12_opt_a.png)",
      "![Plot B](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400827/edvedum/questions/chemical_kinetics/kinetics_q12_opt_b.png)",
      "![Plot C](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400828/edvedum/questions/chemical_kinetics/kinetics_q12_opt_c.png)",
      "![Plot D](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400829/edvedum/questions/chemical_kinetics/kinetics_q12_opt_d.png)"
    ],
    correct_option: "D",
    solution_text: "According to Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{RT}$$\nComparing with $y = mx + c$, where $y = \\ln k$ and $x = 1/T$, the graph is a straight line with a negative slope $\\left(-\\frac{E_a}{R}\\right)$ and an intercept equal to $\\ln A$. Plot (D) shows a straight line sloping downward as $1/T$ increases. Hence, option (D) is correct."
  },
  {
    question_number: 13,
    question_text: "The rate of a reaction quadruples when temperature changes from $27^\\circ\\text{C}$ to $57^\\circ\\text{C}$. Calculate the energy of activation.\nGiven $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\log 4 = 0.6021$",
    options: [
      "38.04 kJ/mol",
      "380.4 kJ/mol",
      "3.80 kJ/mol",
      "3804 kJ/mol"
    ],
    correct_option: "A",
    solution_text: "$T_1 = 27 + 273 = 300\\text{ K}$, $T_2 = 57 + 273 = 330\\text{ K}$, and $k_2/k_1 = 4$.\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$\n$$\\log 4 = \\frac{E_a}{2.303 \\times 8.314}\\left(\\frac{330 - 300}{300 \\times 330}\\right)$$\n$$0.6021 = \\frac{E_a}{19.147}\\left(\\frac{30}{99000}\\right) = \\frac{E_a}{19.147} \\times \\frac{1}{3300}$$\n$$E_a = 0.6021 \\times 19.147 \\times 3300 = 38044\\text{ J/mol} = 38.04\\text{ kJ/mol}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 14,
    question_text: "For a reaction $3A \\rightarrow 2B$\nThe average rate of appearance of B is given by $\\frac{\\Delta[B]}{\\Delta t}$. The correct relation between the average rate of appearance of B with the average rate of disappearance of A is given in option :",
    options: [
      "-\\frac{\\Delta[A]}{\\Delta t}",
      "-\\frac{3\\Delta[A]}{2\\Delta t}",
      "-\\frac{2\\Delta[A]}{3\\Delta t}",
      "\\frac{\\Delta[A]}{\\Delta t}"
    ],
    correct_option: "C",
    solution_text: "For the reaction $3A \\rightarrow 2B$, the rate of reaction is expressed as:\n$$\\text{Rate} = -\\frac{1}{3}\\frac{\\Delta[A]}{\\Delta t} = +\\frac{1}{2}\\frac{\\Delta[B]}{\\Delta t}$$\nMultiplying both sides by 2:\n$$\\frac{\\Delta[B]}{\\Delta t} = -\\frac{2}{3}\\frac{\\Delta[A]}{\\Delta t}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 15,
    question_text: "The correct option for the rate law that corresponds to overall first order reaction is",
    options: [
      "\\text{Rate} = k[A]^0[B]^2",
      "\\text{Rate} = k[A][B]",
      "\\text{Rate} = k[A]^{1/2}[B]^2",
      "\\text{Rate} = k[A]^{-1/2}[B]^{3/2}"
    ],
    correct_option: "D",
    solution_text: "The overall order of a reaction is the sum of powers of the concentration terms in the rate law:\n- Option (A): $0 + 2 = 2$ (second order)\n- Option (B): $1 + 1 = 2$ (second order)\n- Option (C): $\\frac{1}{2} + 2 = 2.5$\n- Option (D): $-\\frac{1}{2} + \\frac{3}{2} = \\frac{2}{2} = 1$ (first order)\nHence, option (D) corresponds to an overall first-order reaction."
  },
  {
    question_number: 16,
    question_text: "For a certain reaction, the rate $= k[A]^2[B]$, when the initial concentration of A is tripled keeping concentration of B constant, the initial rate would",
    options: [
      "increase by a factor of six",
      "increase by a factor of nine",
      "increase by a factor of three",
      "decrease by a factor of nine"
    ],
    correct_option: "B",
    solution_text: "Given rate law: $R_1 = k[A]^2[B]$.\nWhen concentration of A is tripled, $[A'] = 3[A]$ while $[B]$ remains constant:\n$$R_2 = k(3[A])^2[B] = 9k[A]^2[B] = 9 R_1$$\nThus, the rate increases by a factor of nine. Hence, the correct option is (B)."
  },
  {
    question_number: 17,
    question_text: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A : A reaction can have zero activation energy.\nReason R : The minimum extra amount of energy absorbed by reactant molecules so that their energy becomes equal to threshold value, is called activation energy.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are true and R is the correct explanation of A."
    ],
    correct_option: "C",
    solution_text: "Assertion A is false: Chemical reactions always require some activation energy ($E_a > 0$) for breaking existing bonds; radical recombinations may have negligible activation energy, but according to standard kinetics criteria, a true chemical reaction cannot have zero activation energy.\nReason R is true: Activation energy is indeed defined as the minimum additional amount of energy absorbed by reactant molecules so that their energy becomes equal to the threshold energy value.\nHence, Assertion A is false and Reason R is true (Option C)."
  },
  {
    question_number: 18,
    question_text: "The half life of a first order reaction is 2000 years. If the concentration after 8000 years is $0.02\\text{ M}$, then the initial concentration was :",
    options: [
      "0.04 M",
      "0.16 M",
      "0.32 M",
      "0.08 M"
    ],
    correct_option: "C",
    solution_text: "Number of half-lives elapsed in 8000 years:\n$$n = \\frac{t}{t_{1/2}} = \\frac{8000}{2000} = 4$$\nThe concentration after $n$ half-lives is:\n$$[A] = \\frac{[A]_0}{2^n} \\implies 0.02 = \\frac{[A]_0}{2^4} = \\frac{[A]_0}{16}$$\n$$[A]_0 = 0.02 \\times 16 = 0.32\\text{ M}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 19,
    question_text: "For a chemical reaction\n$$4A + 3B \\rightarrow 6C + 9D$$\nRate of formation of C is $6 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$ and rate of disappearance of A is $4 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$. The rate of reaction and amount of B consumed in interval of 10 seconds, respectively will be :",
    options: [
      "10 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }30 \\times 10^{-2}\\text{ mol L}^{-1}",
      "1 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }30 \\times 10^{-2}\\text{ mol L}^{-1}",
      "10 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }10 \\times 10^{-2}\\text{ mol L}^{-1}",
      "1 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }10 \\times 10^{-2}\\text{ mol L}^{-1}"
    ],
    correct_option: "B",
    solution_text: "The rate of reaction is given by:\n$$\\text{Rate} = -\\frac{1}{4}\\frac{d[A]}{dt} = -\\frac{1}{3}\\frac{d[B]}{dt} = \\frac{1}{6}\\frac{d[C]}{dt} = \\frac{1}{9}\\frac{d[D]}{dt}$$\nGiven $\\frac{d[C]}{dt} = 6 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$:\n$$\\text{Rate} = \\frac{1}{6}(6 \\times 10^{-2}) = 1 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nRate of disappearance of B is:\n$$-\\frac{d[B]}{dt} = 3 \\times \\text{Rate} = 3 \\times (1 \\times 10^{-2}) = 3 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nIn an interval of 10 seconds, amount of B consumed is:\n$$\\Delta[B] = 3 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1} \\times 10\\text{ s} = 30 \\times 10^{-2}\\text{ mol L}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 20,
    question_text: "The given graph is a representation of kinetics of a reaction\n\n![Kinetics Graph](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400833/edvedum/questions/chemical_kinetics/kinetics_q20_diagram.png)\n\nThe $y$ and $x$ axes for zero and first order reactions, respectively are",
    options: [
      "zero order (y = concentration and x = time), first order (y = t_{1/2} and x = concentration)",
      "zero order (y = concentration and x = time), first order (y = rate constant and x = concentration)",
      "zero order (y = rate and x = concentration), first order (y = t_{1/2} and x = concentration)",
      "zero order (y = rate and x = concentration), first order (y = rate and x = t_{1/2})"
    ],
    correct_option: "C",
    solution_text: "The graph shows a horizontal straight line parallel to the $x$-axis, meaning $y$ is independent of $x$:\n- For a zero-order reaction: $\\text{Rate} = k[A]^0 = k$. The rate is independent of reactant concentration, so $y = \\text{rate}$ and $x = \\text{concentration}$.\n- For a first-order reaction: $t_{1/2} = \\frac{0.693}{k}$. The half-life is independent of initial concentration, so $y = t_{1/2}$ and $x = \\text{concentration}$.\nHence, option (C) correctly matches both."
  },
  {
    question_number: 21,
    question_text: "For a first order reaction $A \\rightarrow \\text{Products}$, initial concentration of A is $0.1\\text{ M}$, which becomes $0.001\\text{ M}$ after 5 minutes. Rate constant for the reaction in $\\text{min}^{-1}$ is",
    options: [
      "1.3818",
      "0.9212",
      "0.4606",
      "0.2303"
    ],
    correct_option: "B",
    solution_text: "For a first order reaction:\n$$k = \\frac{2.303}{t}\\log\\left(\\frac{[A]_0}{[A]_t}\\right)$$\nGiven $[A]_0 = 0.1\\text{ M}$, $[A]_t = 0.001\\text{ M}$, and $t = 5\\text{ min}$:\n$$\\frac{[A]_0}{[A]_t} = \\frac{0.1}{0.001} = 100 = 10^2$$\n$$k = \\frac{2.303}{5} \\log(10^2) = \\frac{2.303 \\times 2}{5} = \\frac{4.606}{5} = 0.9212\\text{ min}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 22,
    question_text: "For a reaction, $A \\rightarrow B$, enthalpy of reaction is $-4.2\\text{ kJ mol}^{-1}$ and enthalpy of activation is $9.6\\text{ kJ mol}^{-1}$. The correct potential energy profile for the reaction is shown in option.",
    options: [
      "![Profile A](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400834/edvedum/questions/chemical_kinetics/kinetics_q22_opt_a.png)",
      "![Profile B](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400835/edvedum/questions/chemical_kinetics/kinetics_q22_opt_b.png)",
      "![Profile C](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400835/edvedum/questions/chemical_kinetics/kinetics_q22_opt_c.png)",
      "![Profile D](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794400836/edvedum/questions/chemical_kinetics/kinetics_q22_opt_d.png)"
    ],
    correct_option: "B",
    solution_text: "Since $\\Delta H = -4.2\\text{ kJ mol}^{-1} < 0$, the reaction is exothermic, meaning the energy of product $B$ is lower than the energy of reactant $A$ ($H_B < H_A$).\nThe activation energy is positive ($E_a = 9.6\\text{ kJ mol}^{-1}$), requiring a barrier above reactant $A$.\nIn profile (B), the energy of reactant A rises over a transition barrier and descends to a product B level that lies below reactant A, representing an exothermic reaction. Hence, option (B) is correct."
  },
  {
    question_number: 23,
    question_text: "The slope of Arrhenius plot ($\\ln k$ vs $1/T$) of first order reaction is $-5 \\times 10^3\\text{ K}$. The value of $E_a$ of the reaction is. Choose the correct option for your answer.\n[Given $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$]",
    options: [
      "-83 kJ mol^{-1}",
      "41.5 kJ mol^{-1}",
      "83.0 kJ mol^{-1}",
      "166 kJ mol^{-1}"
    ],
    correct_option: "B",
    solution_text: "According to the Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$$\n$$\\text{Slope} = -\\frac{E_a}{R}$$\nGiven $\\text{Slope} = -5 \\times 10^3\\text{ K}$:\n$$-\\frac{E_a}{R} = -5 \\times 10^3\\text{ K} \\implies E_a = 5 \\times 10^3 \\times 8.314\\text{ J mol}^{-1} = 41570\\text{ J mol}^{-1} = 41.57\\text{ kJ mol}^{-1} \\approx 41.5\\text{ kJ mol}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 24,
    question_text: "The half-life for a zero order reaction having $0.02\\text{ M}$ initial concentration of reactant is $100\\text{ s}$. The rate constant (in $\\text{mol L}^{-1}\\text{ s}^{-1}$) for the reaction is",
    options: [
      "1.0 \\times 10^{-2}",
      "1.0 \\times 10^{-4}",
      "2.0 \\times 10^{-4}",
      "2.0 \\times 10^{-3}"
    ],
    correct_option: "B",
    solution_text: "For a zero-order reaction:\n$$t_{1/2} = \\frac{[A]_0}{2k}$$\n$$k = \\frac{[A]_0}{2 t_{1/2}} = \\frac{0.02\\text{ mol L}^{-1}}{2 \\times 100\\text{ s}} = \\frac{0.02}{200} = 1.0 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 25,
    question_text: "In collision theory of chemical reaction, $Z_{AB}$ represents",
    options: [
      "the fraction of molecules with energies equal to E_a",
      "the fraction of molecules with energies greater than E_a",
      "the collision frequency of reactants, A and B",
      "steric factor"
    ],
    correct_option: "C",
    solution_text: "In collision theory rate expression:\n$$\\text{Rate} = Z_{AB} e^{-E_a/RT}$$\nwhere $Z_{AB}$ represents the collision frequency (number of collisions per second per unit volume of the reaction mixture) between reactants A and B. Hence, the correct option is (C)."
  },
  {
    question_number: 26,
    question_text: "An increase in the concentration of the reactants of a reaction leads to change in :",
    options: [
      "heat of reaction",
      "threshold energy",
      "collision frequency",
      "activation energy"
    ],
    correct_option: "C",
    solution_text: "Increasing the concentration of reactants increases the number of reacting molecules per unit volume, which directly increases the number of collisions per unit time per unit volume (collision frequency). It does not alter activation energy, threshold energy, or heat of reaction. Hence, the correct option is (C)."
  },
  {
    question_number: 27,
    question_text: "The rate constant for a first order reaction is $4.606 \\times 10^{-3}\\text{ s}^{-1}$. The time required to reduce $2.0\\text{ g}$ of the reactant to $0.2\\text{ g}$ is :",
    options: [
      "200 s",
      "500 s",
      "1000 s",
      "100 s"
    ],
    correct_option: "B",
    solution_text: "For a first-order reaction:\n$$t = \\frac{2.303}{k} \\log\\left(\\frac{[A]_0}{[A]_t}\\right)$$\n$$t = \\frac{2.303}{4.606 \\times 10^{-3}} \\log\\left(\\frac{2.0}{0.2}\\right) = \\frac{1}{2 \\times 10^{-3}} \\log(10) = \\frac{1000}{2} \\times 1 = 500\\text{ s}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 28,
    question_text: "A first order reaction has a rate constant of $2.303 \\times 10^{-3}\\text{ s}^{-1}$. The time required for $40\\text{ g}$ of this reactant to reduce to $10\\text{ g}$ will be\n[Given that $\\log_{10} 2 = 0.3010$]",
    options: [
      "602 s",
      "230.3 s",
      "301 s",
      "2000 s"
    ],
    correct_option: "A",
    solution_text: "For a first-order reaction:\n$$t = \\frac{2.303}{k} \\log\\left(\\frac{a}{a - x}\\right)$$\n$$t = \\frac{2.303}{2.303 \\times 10^{-3}} \\log\\left(\\frac{40}{10}\\right) = 1000 \\times \\log 4 = 1000 \\times (2 \\times 0.3010) = 602\\text{ s}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 29,
    question_text: "For a reaction, activation energy $E_a = 0$ and the rate constant at $200\\text{ K}$ is $1.6 \\times 10^6\\text{ s}^{-1}$. The rate constant at $400\\text{ K}$ will be\n[Given that gas constant, $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$]",
    options: [
      "3.2 \\times 10^6\\text{ s}^{-1}",
      "3.2 \\times 10^4\\text{ s}^{-1}",
      "1.6 \\times 10^6\\text{ s}^{-1}",
      "1.6 \\times 10^3\\text{ s}^{-1}"
    ],
    correct_option: "C",
    solution_text: "From Arrhenius equation:\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$\nWhen $E_a = 0$:\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = 0 \\implies \\frac{k_2}{k_1} = 1 \\implies k_2 = k_1 = 1.6 \\times 10^6\\text{ s}^{-1}$$\nHence, the rate constant is temperature-independent when $E_a = 0$. The correct option is (C)."
  },
  {
    question_number: 30,
    question_text: "If the rate constant for a first order reaction is $k$, the time ($t$) required for the completion of $99\\%$ of the reaction is given by :",
    options: [
      "t = \\frac{4.606}{k}",
      "t = \\frac{2.303}{k}",
      "t = \\frac{0.693}{k}",
      "t = \\frac{6.909}{k}"
    ],
    correct_option: "A",
    solution_text: "For a first order reaction:\n$$t = \\frac{2.303}{k}\\log\\left(\\frac{[A]_0}{[A]_t}\\right)$$\nFor $99\\%$ completion, $[A]_t = 100 - 99 = 1\\%$ of $[A]_0$:\n$$t_{99\\%} = \\frac{2.303}{k}\\log\\left(\\frac{100}{1}\\right) = \\frac{2.303}{k} \\log(10^2) = \\frac{2.303 \\times 2}{k} = \\frac{4.606}{k}$$\nHence, the correct option is (A)."
  }
];
