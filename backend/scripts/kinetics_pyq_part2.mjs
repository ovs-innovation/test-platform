export const kineticsPyqPart2 = [
  {
    question_number: 31,
    question_text: "For the chemical reaction\n$$\\text{N}_{2(g)} + 3\\text{H}_{2(g)} \\rightleftharpoons 2\\text{NH}_{3(g)}$$\nthe correct option is :",
    options: [
      "-\\frac{d[\\text{N}_2]}{dt} = 2\\frac{d[\\text{NH}_3]}{dt}",
      "-\\frac{d[\\text{N}_2]}{dt} = \\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}",
      "3\\frac{d[\\text{H}_2]}{dt} = 2\\frac{d[\\text{NH}_3]}{dt}",
      "-\\frac{1}{3}\\frac{d[\\text{H}_2]}{dt} = -\\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}"
    ],
    correct_option: "B",
    solution_text: "The rate of reaction in terms of disappearance of reactants and appearance of products is:\n$$\\text{Rate} = -\\frac{d[\\text{N}_2]}{dt} = -\\frac{1}{3}\\frac{d[\\text{H}_2]}{dt} = +\\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}$$\nEquating the rate with respect to $\\text{N}_2$ and $\\text{NH}_3$:\n$$-\\frac{d[\\text{N}_2]}{dt} = \\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 32,
    question_text: "The correct difference between first and second order reactions is that",
    options: [
      "the rate of a first-order reaction does not depend on reactant concentrations; the rate of a second-order reaction does depend on reactant concentrations",
      "the half-life of a first-order reaction does not depend on [A]_0; the half-life of a second order reaction does depend on [A]_0",
      "a first-order reaction can be catalysed; a second-order reaction cannot be catalysed",
      "the rate of a first-order reaction does depend on reactant concentrations; the rate of a second-order reaction does not depend on reactant concentrations"
    ],
    correct_option: "B",
    solution_text: "For a first-order reaction: $t_{1/2} = \\frac{0.693}{k}$, which is completely independent of initial reactant concentration $[A]_0$.\nFor a second-order reaction: $t_{1/2} = \\frac{1}{k[A]_0}$, which depends inversely on the initial concentration $[A]_0$.\nHence, option (B) represents the correct difference."
  },
  {
    question_number: 33,
    question_text: "When initial concentration of the reactant is doubled, the half-life period of a zero order reaction",
    options: [
      "is halved",
      "is doubled",
      "is tripled",
      "remains unchanged."
    ],
    correct_option: "B",
    solution_text: "For a zero-order reaction:\n$$t_{1/2} = \\frac{[A]_0}{2k}$$\nThus, the half-life period is directly proportional to initial concentration ($t_{1/2} \\propto [A]_0$). When initial concentration is doubled, its half-life period is also doubled (Option B)."
  },
  {
    question_number: 34,
    question_text: "Mechanism of a hypothetical reaction\n$$X_2 + Y_2 \\rightarrow 2XY$$\nis given below :\n(i) $X_2 \\rightleftharpoons X + X$ (fast)\n(ii) $X + Y_2 \\rightarrow XY + Y$ (slow)\n(iii) $X + Y \\rightarrow XY$ (fast)\nThe overall order of the reaction will be",
    options: [
      "2",
      "0",
      "1.5",
      "1"
    ],
    correct_option: "C",
    solution_text: "The rate-determining step is the slow step (step ii):\n$$\\text{Rate} = k[X][Y_2]$$\nFrom the fast pre-equilibrium step (step i):\n$$K_{eq} = \\frac{[X]^2}{[X_2]} \\implies [X] = K_{eq}^{1/2} [X_2]^{1/2}$$\nSubstituting $[X]$ into the rate law:\n$$\\text{Rate} = k K_{eq}^{1/2} [X_2]^{1/2}[Y_2] = k'[X_2]^{1/2}[Y_2]^1$$\nOverall order of the reaction is $\\frac{1}{2} + 1 = 1.5$ (Option C)."
  },
  {
    question_number: 35,
    question_text: "A first order reaction has a specific reaction rate of $10^{-2}\\text{ sec}^{-1}$. How much time will it take for $20\\text{ g}$ of the reactant to reduce to $5\\text{ g}$?",
    options: [
      "138.6 sec",
      "346.5 sec",
      "693.0 sec",
      "238.6 sec"
    ],
    correct_option: "A",
    solution_text: "Reduction from $20\\text{ g}$ to $5\\text{ g}$ represents two half-lives ($20\\text{ g} \\rightarrow 10\\text{ g} \\rightarrow 5\\text{ g}$):\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{10^{-2}\\text{ s}^{-1}} = 69.3\\text{ s}$$\n$$t = 2 \\times t_{1/2} = 2 \\times 69.3\\text{ s} = 138.6\\text{ s}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 36,
    question_text: "The decomposition of phosphine ($\\text{PH}_3$) on tungsten at low pressure is a first-order reaction. It is because the",
    options: [
      "rate is proportional to the surface coverage",
      "rate is inversely proportional to the surface coverage",
      "rate is independent of the surface coverage",
      "rate of decomposition is very slow."
    ],
    correct_option: "A",
    solution_text: "At low pressure, the surface coverage of tungsten by phosphine molecules is very low and directly proportional to the partial pressure of phosphine (fractional surface coverage $\\theta \\propto p$). Therefore, the rate of decomposition is directly proportional to the surface coverage, making it a first-order reaction (Option A). At high pressure, the surface becomes completely saturated ($\\\\theta \\approx 1$), making the reaction zero-order."
  },
  {
    question_number: 37,
    question_text: "The rate of first-order reaction is $0.04\\text{ mol L}^{-1}\\text{ s}^{-1}$ at 10 seconds and $0.03\\text{ mol L}^{-1}\\text{ s}^{-1}$ at 20 seconds after initiation of the reaction. The half-life period of the reaction is",
    options: [
      "44.1 s",
      "54.1 s",
      "24.1 s",
      "34.1 s"
    ],
    correct_option: "C",
    solution_text: "For a first-order reaction, rate is proportional to concentration ($\\text{Rate} = k[A]$):\n$$\\frac{R_1}{R_2} = \\frac{[A]_1}{[A]_2}$$\n$$k = \\frac{2.303}{t_2 - t_1} \\log\\left(\\frac{R_1}{R_2}\\right) = \\frac{2.303}{20 - 10} \\log\\left(\\frac{0.04}{0.03}\\right) = \\frac{2.303}{10} \\log(1.333)$$\n$$k = 0.2303 \\times 0.1249 = 0.02877\\text{ s}^{-1}$$\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{0.02877} \\approx 24.08\\text{ s} \\approx 24.1\\text{ s}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 38,
    question_text: "The addition of a catalyst during a chemical reaction alters which of the following quantities?",
    options: [
      "Enthalpy",
      "Activation energy",
      "Entropy",
      "Internal energy"
    ],
    correct_option: "B",
    solution_text: "A catalyst provides an alternative reaction pathway having lower activation energy. It does not alter state functions such as enthalpy ($\\Delta H$), internal energy ($\\Delta U$), Gibbs free energy ($\\Delta G$), or entropy ($\\Delta S$). Hence, option (B) is correct."
  },
  {
    question_number: 39,
    question_text: "The rate constant of the reaction $A \\rightarrow B$ is $0.6 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$. If the concentration of A is $5\\text{ M}$, then concentration of B after 20 minutes is",
    options: [
      "3.60 M",
      "0.36 M",
      "0.72 M",
      "1.08 M"
    ],
    correct_option: "C",
    solution_text: "From the unit of rate constant ($\\text{mol L}^{-1}\\text{ s}^{-1}$), the reaction is of zero order.\nFor a zero-order reaction $A \\rightarrow B$:\n$$[B] = k \\cdot t$$\nGiven $k = 0.6 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$ and $t = 20\\text{ minutes} = 20 \\times 60 = 1200\\text{ seconds}$:\n$$[B] = (0.6 \\times 10^{-3}) \\times 1200 = 0.72\\text{ M}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 40,
    question_text: "The activation energy of a reaction can be determined from the slope of which of the following graphs?",
    options: [
      "\\ln k\\text{ vs. }\\frac{1}{T}",
      "\\frac{T}{\\ln k}\\text{ vs. }\\frac{1}{T}",
      "\\ln k\\text{ vs. }T",
      "\\frac{\\ln k}{T}\\text{ vs. }T"
    ],
    correct_option: "A",
    solution_text: "According to the Arrhenius equation:\n$$\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$$\nPlotting $\\ln k$ vs $\\frac{1}{T}$ yields a straight line with slope $= -\\frac{E_a}{R}$, from which activation energy $E_a$ is directly calculated as $E_a = -\\text{slope} \\times R$. Hence, option (A) is correct."
  },
  {
    question_number: 41,
    question_text: "When initial concentration of a reactant is doubled in a reaction, its half-life period is not affected. The order of the reaction is",
    options: [
      "second",
      "more than zero but less than first",
      "zero",
      "first."
    ],
    correct_option: "D",
    solution_text: "In general, for an $n$-th order reaction, half-life varies as $t_{1/2} \\propto \\frac{1}{[A]_0^{n-1}}$.\nWhen $n = 1$, $t_{1/2} \\propto [A]_0^0$, meaning the half-life period is independent of initial concentration ($t_{1/2} = \\frac{0.693}{k}$). Hence, the reaction is of first order (Option D)."
  },
  {
    question_number: 42,
    question_text: "For a reaction between A and B the order with respect to A is 2 and the other with respect to B is 3. The concentrations of both A and B are doubled, the rate will increase by a factor of",
    options: [
      "12",
      "16",
      "32",
      "10"
    ],
    correct_option: "C",
    solution_text: "The rate law is $\\text{Rate}_1 = k[A]^2[B]^3$.\nWhen the concentrations of both A and B are doubled:\n$$\\text{Rate}_2 = k(2[A])^2(2[B])^3 = k(4[A]^2)(8[B]^3) = 32 \\cdot k[A]^2[B]^3 = 32\\text{ Rate}_1$$\nThus, the rate increases by a factor of 32 (Option C)."
  },
  {
    question_number: 43,
    question_text: "A reaction is $50\\%$ complete in 2 hours and $75\\%$ complete in 4 hours. The order of reaction is",
    options: [
      "1",
      "2",
      "3",
      "0"
    ],
    correct_option: "A",
    solution_text: "$t_{50\\%} = t_{1/2} = 2\\text{ hours}$.\nIn 4 hours (which is $2 \\times t_{1/2}$), the remaining amount is $(1/2)^2 = 1/4 = 25\\%$, so $75\\%$ of the reaction has completed.\nSince $t_{75\\%} = 2 \\times t_{50\\%}$, the reaction follows first-order kinetics (Option A)."
  },
  {
    question_number: 44,
    question_text: "What is the activation energy for a reaction if its rate doubles when the temperature is raised from $20^\\circ\\text{C}$ to $35^\\circ\\text{C}$?\n($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "34.7 kJ mol^{-1}",
      "15.1 kJ mol^{-1}",
      "342 kJ mol^{-1}",
      "269 kJ mol^{-1}"
    ],
    correct_option: "A",
    solution_text: "$T_1 = 20 + 273 = 293\\text{ K}$, $T_2 = 35 + 273 = 308\\text{ K}$, and $k_2/k_1 = 2$.\n$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$$\n$$\\log 2 = \\frac{E_a}{2.303 \\times 8.314} \\left(\\frac{308 - 293}{293 \\times 308}\\right)$$\n$$0.3010 = \\frac{E_a}{19.147}\\left(\\frac{15}{90244}\\right)$$\n$$E_a = \\frac{0.3010 \\times 19.147 \\times 90244}{15} = \\frac{520092}{15} \\approx 34673\\text{ J mol}^{-1} \\approx 34.7\\text{ kJ mol}^{-1}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 45,
    question_text: "In a reaction, $A + B \\rightarrow \\text{product}$, rate is doubled when the concentration of B is doubled, and rate increases by a factor of 8 when the concentration of both the reactants (A and B) are doubled, rate law for the reaction can be written as",
    options: [
      "\\text{rate} = k[A][B]^2",
      "\\text{rate} = k[A]^2[B]^2",
      "\\text{rate} = k[A][B]",
      "\\text{rate} = k[A]^2[B]"
    ],
    correct_option: "D",
    solution_text: "Let $\\text{rate} = k[A]^x[B]^y$.\nWhen $[B]$ is doubled with $[A]$ constant, rate doubles:\n$$2^y = 2 \\implies y = 1$$\nWhen both $[A]$ and $[B]$ are doubled, rate increases by a factor of 8:\n$$2^x \\cdot 2^y = 8 \\implies 2^x \\cdot 2^1 = 8 \\implies 2^x = 4 = 2^2 \\implies x = 2$$\nTherefore, the rate law is $\\text{rate} = k[A]^2[B]$ (Option D)."
  },
  {
    question_number: 46,
    question_text: "In a zero-order reaction, for every $10^\\circ\\text{C}$ rise of temperature, the rate is doubled. If the temperature is increased from $10^\\circ\\text{C}$ to $100^\\circ\\text{C}$, the rate of the reaction will become",
    options: [
      "256 times",
      "512 times",
      "64 times",
      "128 times"
    ],
    correct_option: "B",
    solution_text: "Temperature rise $\\Delta T = 100^\\circ\\text{C} - 10^\\circ\\text{C} = 90^\\circ\\text{C}$.\nNumber of $10^\\circ\\text{C}$ increments is $n = \\frac{\\Delta T}{10} = \\frac{90}{10} = 9$.\nWith temperature coefficient $= 2$, the new rate becomes:\n$$2^n = 2^9 = 512\\text{ times}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 47,
    question_text: "The rate of the reaction : $2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2$\ncan be written in three ways.\n$$-\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = k[\\text{N}_2\\text{O}_5]$$\n$$\\frac{d[\\text{NO}_2]}{dt} = k'[\\text{N}_2\\text{O}_5]$$\n$$\\frac{d[\\text{O}_2]}{dt} = k''[\\text{N}_2\\text{O}_5]$$\nThe relationship between $k$ and $k'$ and between $k$ and $k''$ are",
    options: [
      "k' = 2k; k'' = k",
      "k' = 2k; k'' = k/2",
      "k' = 2k; k'' = 2k",
      "k' = k; k'' = k"
    ],
    correct_option: "B",
    solution_text: "For the reaction $2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2$:\n$$\\text{Rate} = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = \\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt} = \\frac{d[\\text{O}_2]}{dt}$$\nSubstituting the given rate expressions:\n$$\\frac{1}{2} k[\\text{N}_2\\text{O}_5] = \\frac{1}{4} k'[\\text{N}_2\\text{O}_5] = k''[\\text{N}_2\\text{O}_5]$$\n$$\\frac{k}{2} = \\frac{k'}{4} = k''$$\nFrom $\\frac{k}{2} = \\frac{k'}{4} \\implies k' = 2k$.\nFrom $\\frac{k}{2} = k'' \\implies k'' = \\frac{k}{2}$.\nHence, the correct option is (B)."
  },
  {
    question_number: 48,
    question_text: "The unit of rate constant for a zero order reaction is",
    options: [
      "mol L^{-1} s^{-1}",
      "L mol^{-1} s^{-1}",
      "L^2 mol^{-2} s^{-1}",
      "s^{-1}"
    ],
    correct_option: "A",
    solution_text: "For a zero-order reaction, $\\text{Rate} = k[A]^0 = k$.\nSince rate is change in concentration per unit time:\n$$\\text{Unit of } k = \\text{Unit of Rate} = \\text{mol L}^{-1}\\text{ s}^{-1}$$\nHence, the correct option is (A)."
  },
  {
    question_number: 49,
    question_text: "The half-life of a substance in a certain enzyme-catalysed reaction is $138\\text{ s}$. The time required for the concentration of the substance to fall from $1.28\\text{ mg L}^{-1}$ to $0.04\\text{ mg L}^{-1}$ is",
    options: [
      "414 s",
      "552 s",
      "690 s",
      "276 s"
    ],
    correct_option: "C",
    solution_text: "Enzyme reactions follow first-order kinetics at low substrate concentrations.\nRatio of initial to final concentration:\n$$\\frac{[A]_0}{[A]_t} = \\frac{1.28}{0.04} = 32 = 2^5$$\nThus, 5 half-lives are required for this reduction ($1.28 \\rightarrow 0.64 \\rightarrow 0.32 \\rightarrow 0.16 \\rightarrow 0.08 \\rightarrow 0.04$):\n$$t = 5 \\times t_{1/2} = 5 \\times 138\\text{ s} = 690\\text{ s}$$\nHence, the correct option is (C)."
  },
  {
    question_number: 50,
    question_text: "Which one of the following statements for the order of a reaction is incorrect?",
    options: [
      "Order can be determined only experimentally.",
      "Order is not influenced by stoichiometric coefficient of the reactants.",
      "Order of a reaction is sum of power to the concentration terms of reactants to express the rate of reaction.",
      "Order of reaction is always whole number."
    ],
    correct_option: "D",
    solution_text: "Statement (D) is incorrect: The order of a reaction can be zero, positive, negative, integer, or fractional (e.g. decomposition of acetaldehyde has order 1.5). It is not always a whole number."
  },
  {
    question_number: 51,
    question_text: "The rate of the reaction, $2\\text{NO} + \\text{Cl}_2 \\rightarrow 2\\text{NOCl}$ is given by the rate equation $\\text{rate} = k[\\text{NO}]^2[\\text{Cl}_2]$. The value of the rate constant can be increased by",
    options: [
      "increasing the temperature",
      "increasing the concentration of NO",
      "increasing the concentration of the Cl_2",
      "doing all of these."
    ],
    correct_option: "A",
    solution_text: "The rate constant $k$ is independent of the concentrations of reactants and products. It depends only on temperature and the presence of a catalyst. According to Arrhenius equation, increasing temperature increases the value of the rate constant $k$. Hence, option (A) is correct."
  },
  {
    question_number: 52,
    question_text: "For an endothermic reaction, energy of activation is $E_a$ and enthalpy of reaction is $\\Delta H$ (both of these in $\\text{kJ/mol}$). Minimum value of $E_a$ will be",
    options: [
      "less than \\Delta H",
      "equal to \\Delta H",
      "more than \\Delta H",
      "equal to zero"
    ],
    correct_option: "C",
    solution_text: "For an endothermic reaction, $\\Delta H = E_{a(f)} - E_{a(b)} > 0$, which gives $E_{a(f)} = \\Delta H + E_{a(b)}$.\nSince the activation energy of the reverse reaction $E_{a(b)}$ must be greater than zero, $E_a$ (forward) must be strictly greater than $\\Delta H$ ($E_a > \\Delta H$). Hence, the minimum value of $E_a$ must be more than $\\Delta H$ (Option C)."
  },
  {
    question_number: 53,
    question_text: "For the reaction $\\text{N}_2\\text{O}_{5(g)} \\rightarrow 2\\text{NO}_{2(g)} + \\frac{1}{2}\\text{O}_{2(g)}$\nthe value of rate of disappearance of $\\text{N}_2\\text{O}_5$ is given as $6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$. The rate of formation of $\\text{NO}_2$ and $\\text{O}_2$ is given respectively as",
    options: [
      "6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "1.25 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }3.125 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }3.125 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "1.25 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}\\text{ and }6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}"
    ],
    correct_option: "B",
    solution_text: "From the stoichiometry of the reaction:\n$$\\text{Rate} = -\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = +\\frac{1}{2}\\frac{d[\\text{NO}_2]}{dt} = +2\\frac{d[\\text{O}_2]}{dt}$$\nGiven $-\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = 6.25 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$:\n$$\\frac{d[\\text{NO}_2]}{dt} = 2 \\times \\left(-\\frac{d[\\text{N}_2\\text{O}_5]}{dt}\\right) = 2 \\times (6.25 \\times 10^{-3}) = 1.25 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\n$$\\frac{d[\\text{O}_2]}{dt} = \\frac{1}{2} \\times \\left(-\\frac{d[\\text{N}_2\\text{O}_5]}{dt}\\right) = \\frac{1}{2} \\times (6.25 \\times 10^{-3}) = 3.125 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 54,
    question_text: "During the kinetic study of the reaction, $2A + B \\rightarrow C + D$, following results were obtained\n\n| Run | $[A]/\\text{mol L}^{-1}$ | $[B]/\\text{mol L}^{-1}$ | Initial rate of formation of $D/\\text{mol L}^{-1}\\text{ min}^{-1}$ |\n| :--- | :--- | :--- | :--- |\n| I. | 0.1 | 0.1 | $6.0 \\times 10^{-3}$ |\n| II. | 0.3 | 0.2 | $7.2 \\times 10^{-2}$ |\n| III. | 0.3 | 0.4 | $2.88 \\times 10^{-1}$ |\n| IV. | 0.4 | 0.1 | $2.40 \\times 10^{-2}$ |\n\nBased on the above data which one of the following is correct?",
    options: [
      "\\text{Rate} = k[A]^2[B]",
      "\\text{Rate} = k[A][B]",
      "\\text{Rate} = k[A]^2[B]^2",
      "\\text{Rate} = k[A][B]^2"
    ],
    correct_option: "D",
    solution_text: "Let the rate equation be $\\text{Rate} = k[A]^x[B]^y$.\nComparing runs I and IV (where $[B] = 0.1$ is constant):\n$$\\frac{\\text{Rate}_{IV}}{\\text{Rate}_I} = \\frac{2.40 \\times 10^{-2}}{6.0 \\times 10^{-3}} = 4 = \\left(\\frac{0.4}{0.1}\\right)^x = 4^x \\implies x = 1$$\nComparing runs II and III (where $[A] = 0.3$ is constant):\n$$\\frac{\\text{Rate}_{III}}{\\text{Rate}_{II}} = \\frac{2.88 \\times 10^{-1}}{7.2 \\times 10^{-2}} = \\frac{0.288}{0.072} = 4 = \\left(\\frac{0.4}{0.2}\\right)^y = 2^y \\implies y = 2$$\nTherefore, the rate law is $\\text{Rate} = k[A][B]^2$ (Option D)."
  },
  {
    question_number: 55,
    question_text: "For the reaction, $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$, if $\\frac{d[\\text{NH}_3]}{dt} = 2 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$, the value of $-\\frac{d[\\text{H}_2]}{dt}$ would be",
    options: [
      "4 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "6 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "1 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}",
      "3 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}"
    ],
    correct_option: "D",
    solution_text: "For the reaction $\\text{N}_2 + 3\\text{H}_2 \\rightarrow 2\\text{NH}_3$:\n$$-\\frac{1}{3}\\frac{d[\\text{H}_2]}{dt} = +\\frac{1}{2}\\frac{d[\\text{NH}_3]}{dt}$$\n$$-\\frac{d[\\text{H}_2]}{dt} = \\frac{3}{2}\\frac{d[\\text{NH}_3]}{dt} = \\frac{3}{2} \\times (2 \\times 10^{-4}) = 3 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$$\nHence, the correct option is (D)."
  },
  {
    question_number: 56,
    question_text: "In the reaction,\n$$\\text{BrO}_{3(aq)}^- + 5\\text{Br}_{(aq)}^- + 6\\text{H}^+ \\rightarrow 3\\text{Br}_{2(l)} + 3\\text{H}_2\\text{O}_{(l)}$$\nThe rate of appearance of bromine ($\\text{Br}_2$) is related to rate of disappearance of bromide ions as",
    options: [
      "\\frac{d[\\text{Br}_2]}{dt} = -\\frac{5}{3}\\frac{d[\\text{Br}^-]}{dt}",
      "\\frac{d[\\text{Br}_2]}{dt} = \\frac{5}{3}\\frac{d[\\text{Br}^-]}{dt}",
      "\\frac{d[\\text{Br}_2]}{dt} = \\frac{3}{5}\\frac{d[\\text{Br}^-]}{dt}",
      "\\frac{d[\\text{Br}_2]}{dt} = -\\frac{3}{5}\\frac{d[\\text{Br}^-]}{dt}"
    ],
    correct_option: "D",
    solution_text: "From the stoichiometric relationship of the reaction:\n$$\\text{Rate} = -\\frac{1}{5}\\frac{d[\\text{Br}^-]}{dt} = +\\frac{1}{3}\\frac{d[\\text{Br}_2]}{dt}$$\nMultiplying both sides by 3:\n$$\\frac{d[\\text{Br}_2]}{dt} = -\\frac{3}{5}\\frac{d[\\text{Br}^-]}{dt}$$\nHence, option (D) is correct."
  },
  {
    question_number: 57,
    question_text: "Half-life period of a first order reaction is 1386 seconds. The specific rate constant of the reaction is",
    options: [
      "0.5 \\times 10^{-2}\\text{ s}^{-1}",
      "0.5 \\times 10^{-3}\\text{ s}^{-1}",
      "5.0 \\times 10^{-2}\\text{ s}^{-1}",
      "5.0 \\times 10^{-3}\\text{ s}^{-1}"
    ],
    correct_option: "B",
    solution_text: "For a first-order reaction:\n$$k = \\frac{\\ln 2}{t_{1/2}} = \\frac{0.693}{1386\\text{ s}} = \\frac{693}{1386 \\times 1000} = \\frac{1}{2 \\times 1000} = 0.5 \\times 10^{-3}\\text{ s}^{-1}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 58,
    question_text: "For the reaction $A + B \\rightarrow \\text{products}$, it is observed that\n(i) on doubling the initial concentration of A only, the rate of reaction is also doubled and\n(ii) on doubling the initial concentration of both A and B, there is a change by a factor of 8 in the rate of the reaction.\nThe rate of this reaction is given by",
    options: [
      "\\text{rate} = k[A]^2 [B]^2",
      "\\text{rate} = k[A] [B]^2",
      "\\text{rate} = k[A] [B]",
      "\\text{rate} = k[A]^2 [B]"
    ],
    correct_option: "B",
    solution_text: "Let the rate equation be $\\text{rate} = k[A]^x[B]^y$.\n(i) When $[A]$ is doubled keeping $[B]$ constant, rate doubles:\n$$2^x = 2 \\implies x = 1$$\n(ii) When both $[A]$ and $[B]$ are doubled, rate increases 8-fold:\n$$2^x \\cdot 2^y = 8 \\implies 2^1 \\cdot 2^y = 8 \\implies 2^y = 4 = 2^2 \\implies y = 2$$\nTherefore, $\\text{rate} = k[A][B]^2$ (Option B)."
  },
  {
    question_number: 59,
    question_text: "The rate constants $k_1$ and $k_2$ for two different reactions are $10^{16} e^{-2000/T}$ and $10^{15} e^{-1000/T}$, respectively.\nThe temperature at which $k_1 = k_2$ is",
    options: [
      "2000 K",
      "\\frac{1000}{2.303} K",
      "1000 K",
      "\\frac{2000}{2.303} K"
    ],
    correct_option: "B",
    solution_text: "Equating the two rate constants:\n$$10^{16} e^{-2000/T} = 10^{15} e^{-1000/T}$$\n$$10 \\cdot e^{-2000/T} = e^{-1000/T}$$\n$$10 = \\frac{e^{-1000/T}}{e^{-2000/T}} = e^{(-1000 + 2000)/T} = e^{1000/T}$$\nTaking natural logarithm on both sides:\n$$\\ln 10 = \\frac{1000}{T}$$\n$$2.303 \\log_{10} 10 = \\frac{1000}{T} \\implies 2.303 = \\frac{1000}{T}$$\n$$T = \\frac{1000}{2.303}\\text{ K}$$\nHence, the correct option is (B)."
  },
  {
    question_number: 60,
    question_text: "The bromination of acetone that occurs in acid solution is represented by this equation.\n$$\\text{CH}_3\\text{COCH}_{3(aq)} + \\text{Br}_{2(aq)} \\rightarrow \\text{CH}_3\\text{COCH}_2\\text{Br}_{(aq)} + \\text{H}^+_{(aq)} + \\text{Br}^-_{(aq)}$$\nThese kinetic data were obtained for given reaction concentrations.\n\n| Initial concentrations, M | | | Initial rate, disappearance of $\\text{Br}_2$, $\\text{M s}^{-1}$ |\n| :--- | :--- | :--- | :--- |\n| $[\\text{CH}_3\\text{COCH}_3]$ | $[\\text{Br}_2]$ | $[\\text{H}^+]$ | |\n| 0.30 | 0.05 | 0.05 | $5.7 \\times 10^{-5}$ |\n| 0.30 | 0.10 | 0.05 | $5.7 \\times 10^{-5}$ |\n| 0.30 | 0.10 | 0.10 | $1.2 \\times 10^{-4}$ |\n| 0.40 | 0.05 | 0.20 | $3.1 \\times 10^{-4}$ |\n\nBased on these data, the rate equation is",
    options: [
      "\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3][\\text{Br}_2][\\text{H}^+]^2",
      "\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3][\\text{Br}_2][\\text{H}^+]",
      "\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3][\\text{H}^+]",
      "\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3][\\text{Br}_2]"
    ],
    correct_option: "C",
    solution_text: "Let $\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3]^x [\\text{Br}_2]^y [\\text{H}^+]^z$.\n1. From experiments 1 and 2, when $[\\text{Br}_2]$ is doubled while $[\\text{CH}_3\\text{COCH}_3]$ and $[\\text{H}^+]$ are constant, the rate remains unchanged ($5.7 \\times 10^{-5}$):\n$$2^y = 1 = 2^0 \\implies y = 0$$\n2. From experiments 2 and 3, when $[\\text{H}^+]$ is doubled while others are constant, the rate doubles ($5.7 \\times 10^{-5} \\rightarrow 1.2 \\times 10^{-4} \\approx 1.14 \\times 10^{-4}$):\n$$2^z = 2 \\implies z = 1$$\n3. From experiments 1 and 4:\n$$\\frac{\\text{Rate}_4}{\\text{Rate}_1} = \\frac{3.1 \\times 10^{-4}}{5.7 \\times 10^{-5}} \\approx 5.44 = \\left(\\frac{0.40}{0.30}\\right)^x \\left(\\frac{0.20}{0.05}\\right)^1 = \\left(\\frac{4}{3}\\right)^x \\times 4$$\n$$\\left(\\frac{4}{3}\\right)^x = \\frac{5.44}{4} = 1.36 \\approx \\frac{4}{3} \\implies x = 1$$\nTherefore, the rate law is $\\text{Rate} = k[\\text{CH}_3\\text{COCH}_3][\\text{H}^+]$ (Option C)."
  }
];

