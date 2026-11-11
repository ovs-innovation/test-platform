export const kineticsPyqPart3 = [
  {
    question_number: 61,
    question_text: "If $60\\%$ of a first order reaction was completed in 60 minutes, $50\\%$ of the same reaction would be completed in approximately\n($\\log 4 = 0.60$, $\\log 5 = 0.69$)",
    options: [
      "45 minutes",
      "60 minutes",
      "40 minutes",
      "50 minutes"
    ],
    correct_option: "A",
    solution_text: "For a first order reaction:\n$$k = \\frac{2.303}{t} \\log\\left(\\frac{100}{100 - x}\\right)$$\nFor $60\\%$ completion in 60 minutes ($a - x = 40$):\n$$k = \\frac{2.303}{60} \\log\\left(\\frac{100}{40}\\right) = \\frac{2.303}{60} \\log(2.5) = \\frac{2.303}{60} (\\log 5 - \\log 2)$$\nSince $\\log 4 = 2 \\log 2 = 0.60 \\implies \\log 2 = 0.30$, and $\\log 5 = 0.69$:\n$$\\log(2.5) = 0.69 - 0.30 = 0.39$$\n$$k = \\frac{2.303}{60} \\times 0.39 = \\frac{0.898}{60} = 0.01497\\text{ min}^{-1}$$\nFor $50\\%$ completion ($t_{1/2}$):\n$$t_{50\\%} = \\frac{0.693}{k} = \\frac{2.303 \\times \\log 2}{k} = \\frac{2.303 \\times 0.30}{0.01497} = \\frac{0.6909}{0.01497} \\approx 46.15\\text{ min} \\approx 45\\text{ minutes}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 62,
    question_text: "In a first-order reaction $A \\rightarrow B$, if $k$ is rate constant and initial concentration of the reactant A is $0.5\\text{ M}$, then the half-life is",
    options: [
      "\\frac{\\log 2}{k}",
      "\\frac{\\log 2}{k\\sqrt{0.5}}",
      "\\frac{\\ln 2}{k}",
      "\\frac{0.693}{0.5k}"
    ],
    correct_option: "C",
    solution_text: "For a first-order reaction, the half-life is given by:\n$$t_{1/2} = \\frac{\\ln 2}{k}$$\nIt is independent of the initial concentration of reactant A. Hence, the correct option is (C)."
  },
  {
    question_number: 63,
    question_text: "The reaction of hydrogen and iodine monochloride is given as :\n$$\\text{H}_{2(g)} + 2\\text{ICl}_{(g)} \\rightarrow 2\\text{HCl}_{(g)} + \\text{I}_{2(g)}$$\nThis reaction is of first order with respect to $\\text{H}_{2(g)}$ and $\\text{ICl}_{(g)}$, following mechanisms were proposed.\nMechanism A :\n$$\\text{H}_{2(g)} + 2\\text{ICl}_{(g)} \\rightarrow 2\\text{HCl}_{(g)} + \\text{I}_{2(g)}$$\nMechanism B :\n$$\\text{H}_{2(g)} + \\text{ICl}_{(g)} \\rightarrow \\text{HCl}_{(g)} + \\text{HI}_{(g)}\\text{ ; slow}$$\n$$\\text{HI}_{(g)} + \\text{ICl}_{(g)} \\rightarrow \\text{HCl}_{(g)} + \\text{I}_{2(g)}\\text{ ; fast}$$\nWhich of the above mechanism(s) can be consistent with the given information about the reaction?",
    options: [
      "A and B both",
      "Neither A nor B",
      "A only",
      "B only"
    ],
    correct_option: "D",
    solution_text: "For Mechanism A (single elementary termolecular step):\n$$\\text{Rate} = k[\\text{H}_2][\\text{ICl}]^2$$\nwhich gives second order with respect to $\\text{ICl}$, contradicting the experimental observation.\nFor Mechanism B, the slow step is the rate-determining step:\n$$\\text{Rate} = k[\\text{H}_2][\\text{ICl}]$$\nThis is first order with respect to both $\\text{H}_2$ and $\\text{ICl}$, which fully matches the experimental rate law. Hence, only Mechanism B is consistent (Option D)."
  },
  {
    question_number: 64,
    question_text: "Consider the reaction : $\\text{N}_{2(g)} + 3\\text{H}_{2(g)} \\rightarrow 2\\text{NH}_{3(g)}$\nThe equality relationship between $\\frac{d[\\text{NH}_3]}{dt}$ and $-\\frac{d[\\text{H}_2]}{dt}$ is",
    options: [
      "\\frac{d[\\text{NH}_3]}{dt} = -\\frac{d[\\text{H}_2]}{dt}",
      "\\frac{d[\\text{NH}_3]}{dt} = -\\frac{1}{3}\\frac{d[\\text{H}_2]}{dt}",
      "+\\frac{d[\\text{NH}_3]}{dt} = -\\frac{2}{3}\\frac{d[\\text{H}_2]}{dt}",
      "+\\frac{d[\\text{NH}_3]}{dt} = -\\frac{3}{2}\\frac{d[\\text{H}_2]}{dt}"
    ],
    correct_option: "C",
    solution_text: "The rate of reaction is given by:\n$$\\text{Rate} = -\\frac{1}{3}\\frac{d[\\text{H}_2]}{dt} = +\\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}$$\nMultiplying both sides by 2:\n$$\\frac{d[\\text{NH}_3]}{dt} = -\\frac{2}{3}\\frac{d[\\text{H}_2]}{dt}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 65,
    question_text: "For the reaction, $2A + B \\rightarrow 3C + D$, which of the following does not express the reaction rate?",
    options: [
      "-\\frac{d[A]}{2dt}",
      "-\\frac{d[C]}{3dt}",
      "-\\frac{d[B]}{dt}",
      "\\frac{d[D]}{dt}"
    ],
    correct_option: "B",
    solution_text: "Since C is a product, its concentration increases with time. Therefore, the rate of appearance of C must have a positive sign:\n$$\\text{Rate} = +\\frac{1}{3}\\frac{d[C]}{dt}$$\nExpression (B) has a negative sign ($-\\frac{d[C]}{3dt}$), which is incorrect for a product. Hence, option (B) does not express the reaction rate."
  },
  {
    question_number: 66,
    question_text: "The rate of reaction between two reactants A and B decreases by a factor of 4 if the concentration of reactant B is doubled. The order of this reaction with respect to reactant B is",
    options: [
      "2",
      "-2",
      "1",
      "-1"
    ],
    correct_option: "B",
    solution_text: "Let $\\text{Rate} \\propto [B]^y$.\nWhen $[B]$ is doubled, the rate decreases by a factor of 4 (i.e. becomes $\\frac{1}{4}$):\n$$2^y = \\frac{1}{4} = 2^{-2} \\implies y = -2$$\nThus, the order of the reaction with respect to reactant B is $-2$ (Option B)."
  },
  {
    question_number: 67,
    question_text: "For a first order reaction $A \\rightarrow B$ the reaction rate at reactant concentration of $0.01\\text{ M}$ is found to be $2.0 \\times 10^{-5}\\text{ mol L}^{-1}\\text{ s}^{-1}$. The half-life period of the reaction is",
    options: [
      "30 s",
      "220 s",
      "300 s",
      "347 s"
    ],
    correct_option: "D",
    solution_text: "For a first order reaction, $\\text{Rate} = k[A]$:\n$$k = \\frac{\\text{Rate}}{[A]} = \\frac{2.0 \\times 10^{-5}\\text{ mol L}^{-1}\\text{ s}^{-1}}{0.01\\text{ mol L}^{-1}} = 2.0 \\times 10^{-3}\\text{ s}^{-1}$$\nThe half-life period is:\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{2.0 \\times 10^{-3}\\text{ s}^{-1}} = 346.5\\text{ s} \\approx 347\\text{ s}$$\nHence, the correct option is (D)."
  },
  {
    question_number: 68,
    question_text: "The rate of a first order reaction is $1.5 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$ at $0.5\\text{ M}$ concentration of the reactant. The half-life of the reaction is",
    options: [
      "0.383 min",
      "23.1 min",
      "8.73 min",
      "7.53 min"
    ],
    correct_option: "B",
    solution_text: "For a first order reaction, $\\text{Rate} = k[A]$:\n$$k = \\frac{\\text{Rate}}{[A]} = \\frac{1.5 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}}{0.5\\text{ mol L}^{-1}} = 3.0 \\times 10^{-2}\\text{ min}^{-1}$$\nThe half-life is:\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{3.0 \\times 10^{-2}\\text{ min}^{-1}} = 23.1\\text{ min}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 69,
    question_text: "The temperature dependence of rate constant ($k$) of a chemical reaction is written in terms of Arrhenius equation, $k = A \\cdot e^{-E^*/RT}$. Activation energy ($E^*$) of the reaction can be calculated by plotting",
    options: [
      "k\\text{ vs }T",
      "k\\text{ vs }\\frac{1}{\\log T}",
      "\\log k\\text{ vs }\\frac{1}{T}",
      "\\log k\\text{ vs }\\frac{1}{\\log T}"
    ],
    correct_option: "C",
    solution_text: "Taking logarithm of the Arrhenius equation:\n$$\\log_{10} k = \\log_{10} A - \\frac{E^*}{2.303 R}\\left(\\frac{1}{T}\\right)$$\nPlotting $\\log k$ vs $\\frac{1}{T}$ gives a straight line with slope $= -\\frac{E^*}{2.303 R}$, from which activation energy $E^*$ can be calculated as $E^* = -2.303 R \\times \\text{slope}$. Hence, option (C) is correct."
  },
  {
    question_number: 70,
    question_text: "If the rate of the reaction is equal to the rate constant, the order of the reaction is",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correct_option: "A",
    solution_text: "For an $n$-th order reaction, $\\text{Rate} = k[A]^n$.\nIf $\\text{Rate} = k$, then $[A]^n = 1$, which is valid for any concentration when $n = 0$.\nHence, the order of the reaction is zero (Option A)."
  },
  {
    question_number: 71,
    question_text: "The reaction $A \\rightarrow B$ follows first order kinetics. The time taken for $0.8\\text{ mole}$ of A to produce $0.6\\text{ mole}$ of B is 1 hour. What is the time taken for conversion of $0.9\\text{ mole}$ of A to produce $0.675\\text{ mole}$ of B?",
    options: [
      "1 hour",
      "0.5 hour",
      "0.25 hour",
      "2 hours"
    ],
    correct_option: "A",
    solution_text: "For the first case:\nFraction converted $= \\frac{0.6}{0.8} = 0.75 = 75\\%$.\nRemaining fraction $= 1 - 0.75 = 0.25 = 25\\%$.\nFor the second case:\nFraction converted $= \\frac{0.675}{0.9} = 0.75 = 75\\%$.\nRemaining fraction $= 1 - 0.75 = 0.25 = 25\\%$.\nIn first-order kinetics, the time required to complete a given fraction/percentage of reaction is independent of the initial amount. Since both cases require $75\\%$ conversion, the time required for both is identical, i.e., 1 hour (Option A)."
  },
  {
    question_number: 72,
    question_text: "The activation energy for a simple chemical reaction $A \\rightleftharpoons B$ is $E_a$ in forward direction. The activation energy for reverse reaction",
    options: [
      "is negative of E_a",
      "is always less than E_a",
      "can be less than or more than E_a",
      "is always double of E_a"
    ],
    correct_option: "C",
    solution_text: "The relationship between enthalpy of reaction and activation energies is:\n$$\\Delta H = E_{a(\\text{forward})} - E_{a(\\text{reverse})}$$\n- For an exothermic reaction ($\\Delta H < 0$), $E_{a(\\text{reverse})} > E_{a(\\text{forward})}$.\n- For an endothermic reaction ($\\Delta H > 0$), $E_{a(\\text{reverse})} < E_{a(\\text{forward})}$.\nTherefore, the activation energy for the reverse reaction can be less than or more than $E_a$ (Option C)."
  },
  {
    question_number: 73,
    question_text: "$$2A \\rightarrow B + C$$\nIt would be a zero order reaction when",
    options: [
      "the rate of reaction is proportional to square of concentration of A",
      "The rate of reaction remains same at any concentration of A",
      "the rate remains unchanged at any concentration of B and C",
      "the rate of reaction doubles if concentrations of B is increased to double."
    ],
    correct_option: "B",
    solution_text: "For a zero-order reaction, $\\text{Rate} = k[A]^0 = k$.\nThe rate is independent of the reactant concentration and remains constant regardless of the concentration of A. Hence, option (B) is correct."
  },
  {
    question_number: 74,
    question_text: "$$3A \\rightarrow 2B$$\nrate of reaction $+\\frac{d[B]}{dt}$ is equal to",
    options: [
      "-\\frac{3}{2}\\frac{d[A]}{dt}",
      "-\\frac{2}{3}\\frac{d[A]}{dt}",
      "-\\frac{1}{3}\\frac{d[A]}{dt}",
      "+2\\frac{d[A]}{dt}"
    ],
    correct_option: "B",
    solution_text: "For the reaction $3A \\rightarrow 2B$, the rate of reaction is:\n$$\\text{Rate} = -\\frac{1}{3}\\frac{d[A]}{dt} = +\\frac{1}{2}\\frac{d[B]}{dt}$$\nMultiplying both sides by 2:\n$$+\\frac{d[B]}{dt} = -\\frac{2}{3}\\frac{d[A]}{dt}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 75,
    question_text: "When a bio-chemical reaction is carried out in laboratory, outside the human body in absence of enzyme, then rate of reaction obtained is $10^{-6}$ times, the activation energy of reaction in the presence of enzyme is",
    options: [
      "6/RT",
      "P is required",
      "different from E_a obtained in laboratory",
      "can't say anything."
    ],
    correct_option: "C",
    solution_text: "Enzymes are biocatalysts that significantly lower the activation energy of biochemical reactions, enabling them to occur much faster inside the body compared to uncatalyzed reactions in the laboratory. Therefore, the activation energy in the presence of enzyme is different from (and substantially lower than) the activation energy obtained in the laboratory in the absence of enzyme (Option C)."
  },
  {
    question_number: 76,
    question_text: "For the reaction;\n$$2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2$$\nrate and rate constant are $1.02 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$ and $3.4 \\times 10^{-5}\\text{ sec}^{-1}$ respectively, then concentration of $\\text{N}_2\\text{O}_5$ at that time will be",
    options: [
      "1.732 M",
      "3 M",
      "1.02 \\times 10^{-4} M",
      "3.4 \\times 10^5 M"
    ],
    correct_option: "B",
    solution_text: "Since the unit of rate constant is $\\text{s}^{-1}$, the decomposition of $\\text{N}_2\\text{O}_5$ follows first-order kinetics:\n$$\\text{Rate} = k[\\text{N}_2\\text{O}_5]$$\n$$[\\text{N}_2\\text{O}_5] = \\frac{\\text{Rate}}{k} = \\frac{1.02 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}}{3.4 \\times 10^{-5}\\text{ s}^{-1}} = \\frac{10.2 \\times 10^{-5}}{3.4 \\times 10^{-5}} = 3\\text{ M}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 77,
    question_text: "For the reaction $\\text{H}^+ + \\text{BrO}_3^- + 3\\text{Br}^- \\rightarrow 5\\text{Br}_2 + \\text{H}_2\\text{O}$\nwhich of the following relation correctly represents the consumption and formation of products.",
    options: [
      "\\frac{d[\\text{Br}^-]}{dt} = -\\frac{3}{5}\\frac{d[\\text{Br}_2]}{dt}",
      "\\frac{d[\\text{Br}^-]}{dt} = \\frac{3}{5}\\frac{d[\\text{Br}_2]}{dt}",
      "\\frac{d[\\text{Br}^-]}{dt} = -\\frac{5}{3}\\frac{d[\\text{Br}_2]}{dt}",
      "\\frac{d[\\text{Br}^-]}{dt} = \\frac{5}{3}\\frac{d[\\text{Br}_2]}{dt}"
    ],
    correct_option: "A",
    solution_text: "From the stoichiometry of the reaction:\n$$\\text{Rate} = -\\frac{1}{3}\\frac{d[\\text{Br}^-]}{dt} = +\\frac{1}{5}\\frac{d[\\text{Br}_2]}{dt}$$\nMultiplying both sides by $-3$:\n$$\\frac{d[\\text{Br}^-]}{dt} = -\\frac{3}{5}\\frac{d[\\text{Br}_2]}{dt}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 78,
    question_text: "For a first-order reaction, the half-life period is independent of",
    options: [
      "initial concentration",
      "cube root of initial concentration",
      "first power of final concentration",
      "square root of final concentration"
    ],
    correct_option: "A",
    solution_text: "For a first-order reaction:\n$$t_{1/2} = \\frac{0.693}{k}$$\nThe half-life period depends only on the rate constant $k$ and is completely independent of the initial concentration of the reactant (Option A)."
  },
  {
    question_number: 79,
    question_text: "Activation energy of a chemical reaction can be determined by",
    options: [
      "evaluating rate constant at standard temperature",
      "evaluating velocities of reaction at two different temperatures",
      "evaluating rate constants at two different temperatures",
      "changing concentration of reactants"
    ],
    correct_option: "C",
    solution_text: "According to the integrated Arrhenius equation:\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$\nActivation energy $E_a$ is determined by measuring the rate constants $k_1$ and $k_2$ at two different temperatures $T_1$ and $T_2$ (Option C)."
  },
  {
    question_number: 80,
    question_text: "The experimental data for the reaction, $2A + B_2 \\rightarrow 2AB$ is\n\n| Experiment | $[A]$ | $[B_2]$ | Rate ($\\text{mole s}^{-1}$) |\n| :--- | :--- | :--- | :--- |\n| 1 | 0.50 | 0.50 | $1.6 \\times 10^{-4}$ |\n| 2 | 0.50 | 1.00 | $3.2 \\times 10^{-4}$ |\n| 3 | 1.00 | 1.00 | $3.2 \\times 10^{-4}$ |\n\nThe rate equation for the above data is",
    options: [
      "\\text{Rate} = k[A]^2[B_2]^2",
      "\\text{Rate} = k[A]^2[B_2]",
      "\\text{Rate} = k[B_2]",
      "\\text{Rate} = k[B_2]^2"
    ],
    correct_option: "C",
    solution_text: "Let the rate law be $\\text{Rate} = k[A]^x[B_2]^y$.\n1. From experiments 1 and 2, when $[A]$ is kept constant at $0.50\\text{ M}$ and $[B_2]$ is doubled from $0.50$ to $1.00\\text{ M}$, rate doubles:\n$$\\frac{3.2 \\times 10^{-4}}{1.6 \\times 10^{-4}} = 2 = 2^y \\implies y = 1$$\n2. From experiments 2 and 3, when $[B_2]$ is kept constant at $1.00\\text{ M}$ and $[A]$ is doubled from $0.50$ to $1.00\\text{ M}$, rate remains unchanged ($3.2 \\times 10^{-4}$):\n$$\\frac{3.2 \\times 10^{-4}}{3.2 \\times 10^{-4}} = 1 = 2^x \\implies x = 0$$\nTherefore, the rate law is $\\text{Rate} = k[A]^0[B_2]^1 = k[B_2]$ (Option C)."
  },
  {
    question_number: 81,
    question_text: "For the reaction $\\text{H}_{2(g)} + \\text{I}_{2(g)} \\rightleftharpoons 2\\text{HI}_{(g)}$, the rate of reaction is expressed as",
    options: [
      "\\frac{\\Delta[\\text{H}_2]}{\\Delta t} = \\frac{1}{2}\\frac{\\Delta[\\text{I}_2]}{\\Delta t} = -\\frac{\\Delta[\\text{HI}]}{\\Delta t}",
      "-\\frac{\\Delta[\\text{I}_2]}{\\Delta t} = -\\frac{\\Delta[\\text{H}_2]}{\\Delta t} = \\frac{1}{2}\\frac{\\Delta[\\text{HI}]}{\\Delta t}",
      "\\frac{\\Delta[\\text{I}_2]}{\\Delta t} = \\frac{\\Delta[\\text{H}_2]}{\\Delta t} = \\frac{\\Delta[\\text{HI}]}{2\\Delta t}",
      "\\text{none of these}"
    ],
    correct_option: "B",
    solution_text: "For the reaction $\\text{H}_{2(g)} + \\text{I}_{2(g)} \\rightleftharpoons 2\\text{HI}_{(g)}$, the rate of reaction is defined as:\n$$\\text{Rate} = -\\frac{\\Delta[\\text{H}_2]}{\\Delta t} = -\\frac{\\Delta[\\text{I}_2]}{\\Delta t} = +\\frac{1}{2}\\frac{\\Delta[\\text{HI}]}{\\Delta t}$$\nOption (B) correctly expresses this equality."
  },
  {
    question_number: 82,
    question_text: "The given reaction,\n$$2\\text{FeCl}_3 + \\text{SnCl}_2 \\rightarrow 2\\text{FeCl}_2 + \\text{SnCl}_4$$\nis an example of",
    options: [
      "third order reaction",
      "first order reaction",
      "second order reaction",
      "none of these"
    ],
    correct_option: "A",
    solution_text: "The reaction between ferric chloride and stannous chloride:\n$$2\\text{Fe}^{3+} + \\text{Sn}^{2+} \\rightarrow 2\\text{Fe}^{2+} + \\text{Sn}^{4+}$$\nhas an experimental rate law of $\\text{Rate} = k[\\text{FeCl}_3]^2[\\text{SnCl}_2]^1$, making it a third-order reaction (order $= 2 + 1 = 3$). Hence, option (A) is correct."
  },
  {
    question_number: 83,
    question_text: "A chemical reaction is catalyzed by a catalyst X. Hence X",
    options: [
      "reduces enthalpy of the reaction",
      "does not affect equilibrium constant of reaction",
      "decreases rate constant of the reaction",
      "increases activation energy of the reaction."
    ],
    correct_option: "B",
    solution_text: "A catalyst speeds up both the forward and reverse reactions equally by lowering the activation energy barrier by the same amount. Since $K_{eq} = \\frac{k_f}{k_b}$, the equilibrium constant is completely unaffected by the catalyst. It also does not alter the enthalpy ($\\Delta H$) of the reaction. Hence, option (B) is correct."
  },
  {
    question_number: 84,
    question_text: "The data for the reaction $A + B \\rightarrow C$, is\n\n| Exp. | $[A]_0$ | $[B]_0$ | Initial rate |\n| :--- | :--- | :--- | :--- |\n| 1 | 0.012 | 0.035 | 0.10 |\n| 2 | 0.024 | 0.070 | 0.80 |\n| 3 | 0.024 | 0.035 | 0.10 |\n| 4 | 0.012 | 0.070 | 0.80 |\n\nThe rate law corresponds to the above data is",
    options: [
      "\\text{Rate} = k[A][B]^3",
      "\\text{Rate} = k[A]^2[B]^2",
      "\\text{Rate} = k[B]^3",
      "\\text{Rate} = k[B]^4"
    ],
    correct_option: "C",
    solution_text: "Let the rate equation be $\\text{Rate} = k[A]^x[B]^y$.\n1. From experiments 1 and 3, when $[B]_0$ is constant at $0.035$ and $[A]_0$ doubles from $0.012$ to $0.024$, the rate remains $0.10$:\n$$\\frac{0.10}{0.10} = 1 = 2^x \\implies x = 0$$\n2. From experiments 1 and 4, when $[A]_0$ is constant at $0.012$ and $[B]_0$ doubles from $0.035$ to $0.070$, the rate increases from $0.10$ to $0.80$ (an 8-fold increase):\n$$\\frac{0.80}{0.10} = 8 = 2^y \\implies 2^y = 2^3 \\implies y = 3$$\nTherefore, the rate law is $\\text{Rate} = k[A]^0[B]^3 = k[B]^3$ (Option C)."
  },
  {
    question_number: 85,
    question_text: "Activation energy ($E_a$) and rate constants ($k_1$ and $k_2$) of a chemical reaction at two different temperatures ($T_1$ and $T_2$) are related by",
    options: [
      "\\ln\\frac{k_2}{k_1} = -\\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)",
      "\\ln\\frac{k_2}{k_1} = -\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)",
      "\\ln\\frac{k_2}{k_1} = -\\frac{E_a}{R}\\left(\\frac{1}{T_1} + \\frac{1}{T_2}\\right)",
      "\\ln\\frac{k_2}{k_1} = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)"
    ],
    correct_option: "B, D",
    solution_text: "From the Arrhenius equation at two temperatures:\n$$\\ln k_1 = \\ln A - \\frac{E_a}{RT_1}$$\n$$\\ln k_2 = \\ln A - \\frac{E_a}{RT_2}$$\nSubtracting the first equation from the second:\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = -\\frac{E_a}{RT_2} - \\left(-\\frac{E_a}{RT_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$$\nThis matches Option (D).\nFactoring out the minus sign:\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = -\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right)$$\nThis matches Option (B).\nBoth (B) and (D) are mathematically equivalent and correct expressions."
  }
];
