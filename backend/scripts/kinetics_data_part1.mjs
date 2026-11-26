// kinetics_data_part1.mjs - Questions 1 to 60 (All MCQs)

export const KINETICS_PART1 = {
  // Q1
  1: {
    statement: "The integrated rate equation is $kt = \\ln C_0 - \\ln C_t$. The straight line graph is obtained by plotting:",
    options: [
      { id: 'A', text: "time vs $\\ln C_t$" },
      { id: 'B', text: "$\\frac{1}{t} \\text{ vs } C_t$" },
      { id: 'C', text: "time vs $C_t$" },
      { id: 'D', text: "$\\frac{1}{t} \\text{ vs } \\frac{1}{C_t}$" }
    ],
    answer: 'A',
    solution: "From the integrated rate equation for a first order reaction:\n$$\\ln C_t = -kt + \\ln C_0$$\nComparing with $y = mx + c$, plotting $\\ln C_t$ vs time ($t$) gives a straight line with slope $-k$ and intercept $\\ln C_0$."
  },

  // Q2
  2: {
    statement: "The differential rate law for the reaction $\\text{H}_2 + \\text{I}_2 \\rightarrow 2\\text{HI}$ is:",
    options: [
      { id: 'A', text: "$-\\frac{d[\\text{H}_2]}{dt} = -\\frac{d[\\text{I}_2]}{dt} = -\\frac{d[\\text{HI}]}{dt}$" },
      { id: 'B', text: "$-\\frac{d[\\text{H}_2]}{dt} = -\\frac{d[\\text{I}_2]}{dt} = \\frac{1}{2}\\frac{d[\\text{HI}]}{dt}$" },
      { id: 'C', text: "$-\\frac{d[\\text{H}_2]}{dt} = -\\frac{d[\\text{I}_2]}{dt} = -\\frac{1}{2}\\frac{d[\\text{HI}]}{dt}$" },
      { id: 'D', text: "$-\\frac{d[\\text{H}_2]}{dt} = -\\frac{d[\\text{I}_2]}{dt} = 2\\frac{d[\\text{HI}]}{dt}$" }
    ],
    answer: 'B',
    solution: "For the reaction $\\text{H}_2 + \\text{I}_2 \\rightarrow 2\\text{HI}$, the rate of reaction in terms of rates of disappearance and appearance is:\n$$\\text{Rate} = -\\frac{d[\\text{H}_2]}{dt} = -\\frac{d[\\text{I}_2]}{dt} = +\\frac{1}{2}\\frac{d[\\text{HI}]}{dt}$$"
  },

  // Q3
  3: {
    statement: "For the reaction $A + 2B \\rightarrow C$, the rate is given by $R = [A][B]^2$. Then the overall order of the reaction is:",
    options: [
      { id: 'A', text: "3" },
      { id: 'B', text: "6" },
      { id: 'C', text: "5" },
      { id: 'D', text: "7" }
    ],
    answer: 'A',
    solution: "The overall order of reaction is the sum of powers of the concentration terms in the rate law expression:\n$$\\text{Order} = 1 + 2 = 3$$"
  },

  // Q4
  4: {
    statement: "Units of rate constant of first and zero order reactions in terms of molarity $\\text{M}$ unit are respectively:",
    options: [
      { id: 'A', text: "$\\text{s}^{-1},\\ \\text{M s}^{-1}$" },
      { id: 'B', text: "$\\text{s}^{-1},\\ \\text{M}$" },
      { id: 'C', text: "$\\text{M s}^{-1},\\ \\text{s}^{-1}$" },
      { id: 'D', text: "$\\text{M},\\ \\text{s}^{-1}$" }
    ],
    answer: 'A',
    solution: "The unit of rate constant is given by $(\\text{M})^{1-n} \\text{s}^{-1}$:\n- For first order ($n=1$): $(\\text{M})^0 \\text{s}^{-1} = \\text{s}^{-1}$\n- For zero order ($n=0$): $(\\text{M})^1 \\text{s}^{-1} = \\text{M s}^{-1}$"
  },

  // Q5
  5: {
    statement: "If the half-life of a substance is $5\\text{ years}$, then the total amount of substance left after $15\\text{ years}$, when the initial amount is $64\\text{ grams}$, is:",
    options: [
      { id: 'A', text: "$16\\text{ grams}$" },
      { id: 'B', text: "$2\\text{ grams}$" },
      { id: 'C', text: "$32\\text{ grams}$" },
      { id: 'D', text: "$8\\text{ grams}$" }
    ],
    answer: 'D',
    solution: "Number of half-lives $n = \\frac{15}{5} = 3$.\nAmount remaining:\n$$N = \\frac{N_0}{2^n} = \\frac{64}{2^3} = \\frac{64}{8} = 8\\text{ grams}$$"
  },

  // Q6
  6: {
    statement: "The formation of gas at the surface of tungsten due to adsorption is a reaction of order:",
    options: [
      { id: 'A', text: "0" },
      { id: 'B', text: "1" },
      { id: 'C', text: "2" },
      { id: 'D', text: "insufficient data" }
    ],
    answer: 'A',
    solution: "Heterogeneous catalytic decomposition at metallic surfaces (e.g. decomposition of $\\text{NH}_3$ on hot tungsten at high pressure) follows zero-order kinetics because the surface is completely saturated with adsorbed gas molecules."
  },

  // Q7
  7: {
    statement: "For the reaction system $2\\text{NO}(g) + \\text{O}_2(g) \\rightleftharpoons 2\\text{NO}_2(g)$, the volume is suddenly reduced to half its value by increasing the pressure on it. If the reaction is of first order with respect to $\\text{O}_2$ and second order with respect to $\\text{NO}$, the rate of reaction will:",
    options: [
      { id: 'A', text: "diminish to one-eighth of its initial value" },
      { id: 'B', text: "increase to eight times of its initial value" },
      { id: 'C', text: "increase to four times of its initial value" },
      { id: 'D', text: "diminish to one-fourth of its initial value" }
    ],
    answer: 'B',
    solution: "Rate law: $r = k[\\text{NO}]^2[\\text{O}_2]$.\nWhen volume is halved, concentrations double:\n$$r' = k(2[\\text{NO}])^2(2[\\text{O}_2]) = 8k[\\text{NO}]^2[\\text{O}_2] = 8r$$"
  },

  // Q8
  8: {
    statement: "The rate law for a reaction between substances A and B is given by $\\text{Rate} = k[A]^n[B]^m$. On doubling the concentration of A and halving the concentration of B, the ratio of the new rate to the earlier rate of reaction will be:",
    options: [
      { id: 'A', text: "$(m+n)$" },
      { id: 'B', text: "$(n-m)$" },
      { id: 'C', text: "$2^{n-m}$" },
      { id: 'D', text: "$2^{m-n}$" }
    ],
    answer: 'C',
    solution: "$$\\text{Rate}_1 = k[A]^n[B]^m$$\n$$\\text{Rate}_2 = k(2[A])^n\\left(\\frac{1}{2}[B]\\right)^m = 2^n \\cdot 2^{-m} k[A]^n[B]^m = 2^{n-m} \\text{Rate}_1$$\n$$\\frac{\\text{Rate}_2}{\\text{Rate}_1} = 2^{n-m}$$"
  },

  // Q9
  9: {
    statement: "The half-life of a radioactive isotope is three hours. If the initial mass of the isotope were $256\\text{ g}$, the mass of it remaining undecayed after $18\\text{ hours}$ would be:",
    options: [
      { id: 'A', text: "$8\\text{ g}$" },
      { id: 'B', text: "$128\\text{ g}$" },
      { id: 'C', text: "$16\\text{ g}$" },
      { id: 'D', text: "$4\\text{ g}$" }
    ],
    answer: 'D',
    solution: "Number of half-lives $n = \\frac{18}{3} = 6$.\nAmount remaining:\n$$N = \\frac{256}{2^6} = \\frac{256}{64} = 4\\text{ g}$$"
  },

  // Q10
  10: {
    statement: "In respect of the equation $k = A e^{-E_a/RT}$ in chemical kinetics, which one of the following statements is correct?",
    options: [
      { id: 'A', text: "$A$ is adsorption factor" },
      { id: 'B', text: "$E_a$ is energy of activation" },
      { id: 'C', text: "$R$ is Rydberg's constant" },
      { id: 'D', text: "$k$ is equilibrium constant" }
    ],
    answer: 'B',
    solution: "In the Arrhenius equation $k = A e^{-E_a/RT}$:\n- $k$ is the rate constant\n- $A$ is the pre-exponential / frequency factor\n- $E_a$ is the activation energy\n- $R$ is the universal gas constant\n- $T$ is temperature in Kelvin\nTherefore, statement (B) is correct."
  },

  // Q11
  11: {
    statement: "The rate equation for the reaction $2A + B \\rightarrow C$ is found to be: $\\text{rate} = k[A][B]$. The correct statement in relation to this reaction is that the:",
    options: [
      { id: 'A', text: "unit of $k$ must be $\\text{s}^{-1}$" },
      { id: 'B', text: "value of $k$ is independent of the initial concentration of A and B" },
      { id: 'C', text: "rate of formation of C is twice the rate of disappearance of A" },
      { id: 'D', text: "$t_{1/2}$ is a constant" }
    ],
    answer: 'B',
    solution: "The rate constant $k$ depends only on temperature and catalyst, and is strictly independent of the initial concentrations of reactants. For this second-order reaction ($1+1=2$), $t_{1/2}$ depends on concentration and the unit of $k$ is $\\text{L mol}^{-1}\\text{ s}^{-1}$."
  },

  // Q12
  12: {
    statement: "The half-life of a radioisotope is four hours. If the initial mass of the isotope was $200\\text{ g}$, the mass remaining after $24\\text{ hours}$ undecayed is:",
    options: [
      { id: 'A', text: "$1.042\\text{ g}$" },
      { id: 'B', text: "$4.167\\text{ g}$" },
      { id: 'C', text: "$3.125\\text{ g}$" },
      { id: 'D', text: "$5.084\\text{ g}$" }
    ],
    answer: 'C',
    solution: "Number of half-lives $n = \\frac{24}{4} = 6$.\nMass remaining:\n$$N = \\frac{200}{2^6} = \\frac{200}{64} = 3.125\\text{ g}$$"
  },

  // Q13
  13: {
    statement: "In a first order reaction, the concentration of the reactant decreases from $0.8\\text{ M}$ to $0.4\\text{ M}$ in $15\\text{ minutes}$. The time taken for the concentration to change from $0.1\\text{ M}$ to $0.025\\text{ M}$ is:",
    options: [
      { id: 'A', text: "$30\\text{ minutes}$" },
      { id: 'B', text: "$60\\text{ minutes}$" },
      { id: 'C', text: "$7.5\\text{ minutes}$" },
      { id: 'D', text: "$15\\text{ minutes}$" }
    ],
    answer: 'A',
    solution: "From $0.8\\text{ M}$ to $0.4\\text{ M}$ is one half-life ($t_{1/2} = 15\\text{ min}$).\nTo change from $0.1\\text{ M}$ to $0.025\\text{ M}$ requires two half-lives:\n$$0.1\\text{ M} \\xrightarrow{15\\text{ min}} 0.05\\text{ M} \\xrightarrow{15\\text{ min}} 0.025\\text{ M}$$\n$$\\text{Total time} = 2 \\times 15 = 30\\text{ minutes}$$"
  },

  // Q14
  14: {
    statement: "A reaction involving two different reactants can never be:",
    options: [
      { id: 'A', text: "Unimolecular reaction" },
      { id: 'B', text: "First order reaction" },
      { id: 'C', text: "Second order reaction" },
      { id: 'D', text: "Bimolecular reaction" }
    ],
    answer: 'A',
    solution: "Molecularity is the number of reacting species taking part in an elementary chemical reaction. If two different reactants are involved, molecularity must be at least 2 (bimolecular). It can never be unimolecular."
  },

  // Q15
  15: {
    statement: "$t_{1/4}$ can be taken as the time taken for the concentration of a reactant to drop to $3/4$ of its initial value. If the rate constant for a first order reaction is $k$, the $t_{1/4}$ can be written as:",
    options: [
      { id: 'A', text: "$0.10/k$" },
      { id: 'B', text: "$0.29/k$" },
      { id: 'C', text: "$0.60/k$" },
      { id: 'D', text: "$0.75/k$" }
    ],
    answer: 'B',
    solution: "For first order reaction:\n$$t_{1/4} = \\frac{2.303}{k} \\log\\left(\\frac{[A]_0}{\\frac{3}{4}[A]_0}\\right) = \\frac{2.303}{k} \\log\\left(\\frac{4}{3}\\right) = \\frac{2.303}{k} \\times (0.602 - 0.477) = \\frac{2.303 \\times 0.125}{k} = \\frac{0.288}{k} \\approx \\frac{0.29}{k}$$"
  },

  // Q16
  16: {
    statement: "Consider an endothermic reaction, $X \\rightarrow Y$ with activation energies $E_b$ and $E_f$ for the backward and forward reactions, respectively. In general:",
    options: [
      { id: 'A', text: "$E_b < E_f$" },
      { id: 'B', text: "$E_b > E_f$" },
      { id: 'C', text: "$E_b = E_f$" },
      { id: 'D', text: "There is no definite relation between $E_b$ and $E_f$" }
    ],
    answer: 'A',
    solution: "For an endothermic reaction, $\\Delta H = E_f - E_b > 0$. Hence, $E_f > E_b$ or $E_b < E_f$."
  },

  // Q17
  17: {
    statement: "The following mechanism has been proposed for the reaction of $\\text{NO}$ with $\\text{Br}_2$ to form $\\text{NOBr}$:\n$$\\text{NO}(g) + \\text{Br}_2(g) \\rightleftharpoons \\text{NOBr}_2(g)\\quad (\\text{fast})$$\n$$\\text{NOBr}_2(g) + \\text{NO}(g) \\rightarrow 2\\text{NOBr}(g)\\quad (\\text{slow})$$\nIf the second step is the rate determining step, the order of the reaction with respect to $\\text{NO}(g)$ is:",
    options: [
      { id: 'A', text: "1" },
      { id: 'B', text: "0" },
      { id: 'C', text: "3" },
      { id: 'D', text: "2" }
    ],
    answer: 'D',
    solution: "Rate $= k[\\text{NOBr}_2][\\text{NO}]$.\nFrom fast equilibrium: $K_{eq} = \\frac{[\\text{NOBr}_2]}{[\\text{NO}][\\text{Br}_2]} \\implies [\\text{NOBr}_2] = K_{eq}[\\text{NO}][\\text{Br}_2]$.\nSubstituting into rate law:\n$$\\text{Rate} = k K_{eq} [\\text{NO}]^2 [\\text{Br}_2] = k' [\\text{NO}]^2 [\\text{Br}_2]$$\nThus, order with respect to $\\text{NO}$ is 2."
  },

  // Q18
  18: {
    statement: "A reaction was found to be second order with respect to the concentration of carbon monoxide. If the concentration of carbon monoxide is doubled, with everything else kept the same, the rate of reaction will:",
    options: [
      { id: 'A', text: "remain unchanged" },
      { id: 'B', text: "triple" },
      { id: 'C', text: "increase by a factor of 4" },
      { id: 'D', text: "double" }
    ],
    answer: 'C',
    solution: "Rate $\\propto [\\text{CO}]^2$. Doubling $[\\text{CO}]$ increases rate by $2^2 = 4$ times."
  },

  // Q19
  19: {
    statement: "Rate of a reaction can be expressed by Arrhenius equation as: $k = A e^{-E_a/RT}$. In this equation, $E_a$ represents:",
    options: [
      { id: 'A', text: "the energy above which all the colliding molecules will react" },
      { id: 'B', text: "the energy below which colliding molecules will not react" },
      { id: 'C', text: "the total energy of the reacting molecules at temperature $T$" },
      { id: 'D', text: "the fraction of molecules with energy greater than the activation energy of the reaction" }
    ],
    answer: 'B',
    solution: "Activation energy ($E_a$) is the minimum excess energy required by reactant molecules to undergo effective collisions and transform into products. Molecules with kinetic energy below $E_a$ cannot react upon colliding."
  },

  // Q20
  20: {
    statement: "Consider the reaction $2A + B \\rightarrow \\text{Products}$. When concentration of $B$ alone was doubled, the half-life did not change. When the concentration of $A$ alone was doubled, the rate increased by two times. The unit of rate constant for this reaction is:",
    options: [
      { id: 'A', text: "$\\text{L mol}^{-1}\\text{ s}^{-1}$" },
      { id: 'B', text: "no unit" },
      { id: 'C', text: "$\\text{mol L}^{-1}\\text{ s}^{-1}$" },
      { id: 'D', text: "$\\text{s}^{-1}$" }
    ],
    answer: 'A',
    solution: "Since $t_{1/2}$ of B is independent of $[B]$, order w.r.t B is 1.\nSince rate doubles when $[A]$ is doubled, order w.r.t A is 1.\nOverall order $= 1 + 1 = 2$.\nUnit of second order rate constant is $\\text{L mol}^{-1}\\text{ s}^{-1}$."
  },

  // Q21
  21: {
    statement: "A radioactive element gets spilled over the floor of a room. Its half-life period is 30 days. If the initial activity will be 10 times the permissible value, after how many days will it be safe to enter the room?",
    options: [
      { id: 'A', text: "1000 days" },
      { id: 'B', text: "300 days" },
      { id: 'C', text: "10 days" },
      { id: 'D', text: "100 days" }
    ],
    answer: 'D',
    solution: "$$\\frac{A_0}{A} = 10$$\n$$t = \\frac{2.303}{k} \\log(10) = \\frac{2.303 \\times t_{1/2}}{0.693} = \\frac{2.303 \\times 30}{0.693} \\approx 100\\text{ days}$$"
  },

  // Q22
  22: {
    statement: "The energies of activation for forward and reverse reactions for $A_2 + B_2 \\rightleftharpoons 2AB$ are $180\\text{ kJ mol}^{-1}$ and $200\\text{ kJ mol}^{-1}$ respectively. The presence of catalyst lowers the activation energy of both reactions by $100\\text{ kJ mol}^{-1}$. The enthalpy change of the reaction ($A_2 + B_2 \\rightarrow 2AB$) in the presence of catalyst will be (in $\\text{kJ mol}^{-1}$):",
    options: [
      { id: 'A', text: "$300$" },
      { id: 'B', text: "$120$" },
      { id: 'C', text: "$280$" },
      { id: 'D', text: "$-20$" }
    ],
    answer: 'D',
    solution: "A catalyst lowers $E_{af}$ and $E_{ab}$ by the exact same amount. Therefore, $\\Delta H$ remains unchanged:\n$$\\Delta H = E_{af} - E_{ab} = 180 - 200 = -20\\text{ kJ mol}^{-1}$$"
  },

  // Q23
  23: {
    statement: "For a reaction $3A \\rightarrow 2B$, rate of disappearance of $A$ is related to the rate of appearance of $B$ by the expression:",
    options: [
      { id: 'A', text: "$-\\frac{d[A]}{dt} = -\\frac{1}{2}\\frac{d[B]}{dt}$" },
      { id: 'B', text: "$-\\frac{d[A]}{dt} = \\frac{3}{2}\\frac{d[B]}{dt}$" },
      { id: 'C', text: "$-\\frac{d[A]}{dt} = -\\frac{d[B]}{dt}$" },
      { id: 'D', text: "$-\\frac{d[A]}{dt} = \\frac{2}{3}\\frac{d[B]}{dt}$" }
    ],
    answer: 'B',
    solution: "$$-\\frac{1}{3}\\frac{d[A]}{dt} = +\\frac{1}{2}\\frac{d[B]}{dt} \\implies -\\frac{d[A]}{dt} = \\frac{3}{2}\\frac{d[B]}{dt}$$"
  },

  // Q24
  24: {
    statement: "The half-life period of a first order chemical reaction is $6.93\\text{ minutes}$. The time required for the completion of $99\\%$ of the chemical reaction will be ($[\\log 2 = 0.301]$):",
    options: [
      { id: 'A', text: "$230.3\\text{ minutes}$" },
      { id: 'B', text: "$23.03\\text{ minutes}$" },
      { id: 'C', text: "$46.06\\text{ minutes}$" },
      { id: 'D', text: "$460.6\\text{ minutes}$" }
    ],
    answer: 'C',
    solution: "$$k = \\frac{0.693}{t_{1/2}} = \\frac{0.693}{6.93} = 0.1\\text{ min}^{-1}$$\n$$t_{99\\%} = \\frac{2.303}{k} \\log\\left(\\frac{100}{100 - 99}\\right) = \\frac{2.303}{0.1} \\log(100) = 23.03 \\times 2 = 46.06\\text{ minutes}$$"
  },

  // Q25
  25: {
    statement: "Consider the reaction: $\\text{Cl}_2(aq) + \\text{H}_2\\text{S}(aq) \\rightarrow \\text{S}(s) + 2\\text{H}^+(aq) + 2\\text{Cl}^-(aq)$. The rate equation is: $\\text{rate} = k[\\text{Cl}_2][\\text{H}_2\\text{S}]$. Which of these mechanisms is/are consistent with this rate equation?\n\n(A) $\\text{Cl}_2 + \\text{H}_2\\text{S} \\rightarrow \\text{H}^+ + \\text{Cl}^- + \\text{Cl}^+ + \\text{HS}^-\\ (\\text{slow})$;\n$\\text{Cl}^+ + \\text{HS}^- \\rightarrow \\text{H}^+ + \\text{Cl}^- + \\text{S}\\ (\\text{fast})$\n\n(B) $\\text{H}_2\\text{S} \\rightleftharpoons \\text{H}^+ + \\text{HS}^-\\ (\\text{fast equilibrium})$;\n$\\text{Cl}_2 + \\text{HS}^- \\rightarrow 2\\text{Cl}^- + \\text{H}^+ + \\text{S}\\ (\\text{slow})$",
    options: [
      { id: 'A', text: "B only" },
      { id: 'B', text: "Both A and B" },
      { id: 'C', text: "Neither A nor B" },
      { id: 'D', text: "A only" }
    ],
    answer: 'D',
    solution: "For mechanism (A), the slow step is bimolecular with reactants $\\text{Cl}_2$ and $\\text{H}_2\\text{S}$, giving $\\text{rate} = k[\\text{Cl}_2][\\text{H}_2\\text{S}]$, which matches experimental rate law. Mechanism (B) yields $\\text{rate} = k'[\\text{Cl}_2][\\text{H}_2\\text{S}]/[\\text{H}^+]$, which does not match."
  },

  // Q26
  26: {
    statement: "The time for half-life period of a certain reaction $A \\rightarrow \\text{products}$ is $1\\text{ hour}$. When the initial concentration of reactant $A$ is $2.0\\text{ mol L}^{-1}$, how much time does it take for its concentration to come from $0.50$ to $0.25\\text{ mol L}^{-1}$ if it is a zero order reaction?",
    options: [
      { id: 'A', text: "$4\\text{ h}$" },
      { id: 'B', text: "$0.5\\text{ h}$" },
      { id: 'C', text: "$0.25\\text{ h}$" },
      { id: 'D', text: "$1\\text{ h}$" }
    ],
    answer: 'C',
    solution: "For a zero order reaction:\n$$t_{1/2} = \\frac{[A]_0}{2k} \\implies 1 = \\frac{2.0}{2k} \\implies k = 1.0\\text{ mol L}^{-1}\\text{ h}^{-1}$$\nTime taken from $0.50$ to $0.25\\text{ mol L}^{-1}$:\n$$t = \\frac{[A]_1 - [A]_2}{k} = \\frac{0.50 - 0.25}{1.0} = 0.25\\text{ hour}$$"
  },

  // Q27
  27: {
    statement: "The rate of a chemical reaction doubles for every $10^\\circ\\text{C}$ rise of temperature. If the temperature is raised by $50^\\circ\\text{C}$, the rate of the reaction increases by about:",
    options: [
      { id: 'A', text: "24 times" },
      { id: 'B', text: "32 times" },
      { id: 'C', text: "64 times" },
      { id: 'D', text: "10 times" }
    ],
    answer: 'B',
    solution: "$$\\frac{r_2}{r_1} = 2^{\\Delta T / 10} = 2^{50/10} = 2^5 = 32\\text{ times}$$"
  },

  // Q28
  28: {
    statement: "For a first order reaction $A \\rightarrow \\text{products}$, the concentration of $A$ changes from $0.1\\text{ M}$ to $0.025\\text{ M}$ in $40\\text{ minutes}$. The rate of reaction when the concentration of $A$ is $0.01\\text{ M}$ is:",
    options: [
      { id: 'A', text: "$1.73 \\times 10^{-5}\\text{ M min}^{-1}$" },
      { id: 'B', text: "$3.47 \\times 10^{-4}\\text{ M min}^{-1}$" },
      { id: 'C', text: "$3.47 \\times 10^{-5}\\text{ M min}^{-1}$" },
      { id: 'D', text: "$1.73 \\times 10^{-4}\\text{ M min}^{-1}$" }
    ],
    answer: 'B',
    solution: "$$0.1\\text{ M} \\rightarrow 0.05\\text{ M} \\rightarrow 0.025\\text{ M} \\implies 2 t_{1/2} = 40\\text{ min} \\implies t_{1/2} = 20\\text{ min}$$\n$$k = \\frac{0.693}{20} = 0.03465\\text{ min}^{-1}$$\n$$\\text{Rate} = k[A] = 0.03465 \\times 0.01 = 3.47 \\times 10^{-4}\\text{ M min}^{-1}$$"
  },

  // Q29
  29: {
    statement: "Reaction rate between two substances A and B is expressed as: $\\text{rate} = k[A]^n[B]^m$. If concentration of A is doubled and concentration of B is halved, the ratio of new rate to earlier rate will be:",
    options: [
      { id: 'A', text: "$2^{n+m}$" },
      { id: 'B', text: "$2^{m-n}$" },
      { id: 'C', text: "$2^{n-m}$" },
      { id: 'D', text: "$2^{-(n+m)}$" }
    ],
    answer: 'C',
    solution: "$$\\frac{r'}{r} = \\frac{k(2[A])^n\\left(\\frac{1}{2}[B]\\right)^m}{k[A]^n[B]^m} = 2^n \\cdot 2^{-m} = 2^{n-m}$$"
  },

  // Q30
  30: {
    statement: "In a chemical reaction $A$ is converted into $B$. The rates of reaction, starting with initial concentrations of $A$ as $0.01\\text{ M}$ and $0.02\\text{ M}$ are $1.2 \\times 10^{-4}\\text{ M s}^{-1}$ and $4.8 \\times 10^{-4}\\text{ M s}^{-1}$ respectively. The order of reaction with respect to $A$ is:",
    options: [
      { id: 'A', text: "0" },
      { id: 'B', text: "1.5" },
      { id: 'C', text: "1" },
      { id: 'D', text: "2" }
    ],
    answer: 'D',
    solution: "$$\\frac{r_2}{r_1} = \\frac{4.8 \\times 10^{-4}}{1.2 \\times 10^{-4}} = 4$$\n$$\\frac{[A]_2}{[A]_1} = \\frac{0.02}{0.01} = 2$$\n$$4 = 2^n \\implies n = 2$$"
  },

  // Q31
  31: {
    statement: "For a reaction $A \\rightarrow \\text{Products}$, a plot of $\\log t_{1/2}$ versus $\\log a_0$ is shown in the figure. If initial concentration of $A$ is represented by $a_0$, the order of the reaction is:",
    options: [
      { id: 'A', text: "one" },
      { id: 'B', text: "zero" },
      { id: 'C', text: "two" },
      { id: 'D', text: "three" }
    ],
    answer: 'B',
    solution: "$$t_{1/2} \\propto a_0^{1-n} \\implies \\log t_{1/2} = (1-n)\\log a_0 + \\text{constant}$$\nFrom the plot, slope $= \\tan(45^\\circ) = 1$. Thus, $1 - n = 1 \\implies n = 0$ (zero order)."
  },

  // Q32
  32: {
    statement: "The activation energy for a reaction which doubles the rate when the temperature is raised from $298\\text{ K}$ to $308\\text{ K}$ is ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$):",
    options: [
      { id: 'A', text: "$59.2\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$39.2\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$52.9\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$29.5\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'C',
    solution: "$$\\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left[\\frac{T_2 - T_1}{T_1 T_2}\\right]$$\n$$\\log(2) = \\frac{E_a}{2.303 \\times 8.314}\\left[\\frac{10}{298 \\times 308}\\right] \\implies E_a \\approx 52.9\\text{ kJ mol}^{-1}$$"
  },

  // Q33
  33: {
    statement: "The rate of a reaction doubles when its temperature changes from $300\\text{ K}$ to $310\\text{ K}$. Activation energy of such a reaction will be ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\log 2 = 0.301$):",
    options: [
      { id: 'A', text: "$58.5\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$60.5\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$53.6\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$48.6\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'C',
    solution: "$$E_a = \\frac{2.303 \\times R \\times T_1 \\times T_2}{T_2 - T_1} \\log\\left(\\frac{k_2}{k_1}\\right) = \\frac{2.303 \\times 8.314 \\times 300 \\times 310}{10} \\times 0.301 = 53598\\text{ J} \\approx 53.6\\text{ kJ mol}^{-1}$$"
  },

  // Q34
  34: {
    statement: "The instantaneous rate of disappearance of $\\text{MnO}_4^-$ ion in the following reaction is $4.56 \\times 10^{-3}\\text{ M s}^{-1}$:\n$$2\\text{MnO}_4^- + 10\\text{I}^- + 16\\text{H}^+ \\rightarrow 2\\text{Mn}^{2+} + 5\\text{I}_2 + 8\\text{H}_2\\text{O}$$\nThe rate of appearance of $\\text{I}_2$ is:",
    options: [
      { id: 'A', text: "$4.56 \\times 10^{-3}\\text{ M s}^{-1}$" },
      { id: 'B', text: "$1.14 \\times 10^{-2}\\text{ M s}^{-1}$" },
      { id: 'C', text: "$1.14 \\times 10^{-3}\\text{ M s}^{-1}$" },
      { id: 'D', text: "$5.7 \\times 10^{-3}\\text{ M s}^{-1}$" }
    ],
    answer: 'B',
    solution: "$$-\\frac{1}{2}\\frac{d[\\text{MnO}_4^-]}{dt} = +\\frac{1}{5}\\frac{d[\\text{I}_2]}{dt}$$\n$$\\frac{d[\\text{I}_2]}{dt} = \\frac{5}{2} \\left(-\\frac{d[\\text{MnO}_4^-]}{dt}\\right) = \\frac{5}{2} \\times (4.56 \\times 10^{-3}) = 1.14 \\times 10^{-2}\\text{ M s}^{-1}$$"
  },

  // Q35
  35: {
    statement: "The reaction $X \\rightarrow Y$ is an exothermic reaction. Activation energy of the reaction for $X$ into $Y$ is $150\\text{ kJ mol}^{-1}$. Enthalpy of reaction is $-135\\text{ kJ mol}^{-1}$. The activation energy for the reverse reaction, $Y \\rightarrow X$ will be:",
    options: [
      { id: 'A', text: "$280\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$285\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$270\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$15\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'B',
    solution: "$$\\Delta H = E_{af} - E_{ab} \\implies -135 = 150 - E_{ab} \\implies E_{ab} = 150 + 135 = 285\\text{ kJ mol}^{-1}$$"
  },

  // Q36
  36: {
    statement: "The rate constant of a zero order reaction is $2.0 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ s}^{-1}$. If the concentration of reactant after $25\\text{ seconds}$ is $0.5\\text{ M}$, what is the initial concentration?",
    options: [
      { id: 'A', text: "$0.5\\text{ M}$" },
      { id: 'B', text: "$1.25\\text{ M}$" },
      { id: 'C', text: "$12.5\\text{ M}$" },
      { id: 'D', text: "$1.0\\text{ M}$" }
    ],
    answer: 'D',
    solution: "For zero order reaction: $[A]_t = [A]_0 - kt$.\n$$0.5 = [A]_0 - (2.0 \\times 10^{-2} \\times 25) \\implies [A]_0 = 0.5 + 0.5 = 1.0\\text{ M}$$"
  },

  // Q37
  37: {
    statement: "A radioactive isotope having a half-life period of $3\\text{ days}$ was received after $12\\text{ days}$. If $3\\text{ g}$ of the isotope is left in the container, what would be the initial mass of the isotope?",
    options: [
      { id: 'A', text: "$12\\text{ g}$" },
      { id: 'B', text: "$36\\text{ g}$" },
      { id: 'C', text: "$48\\text{ g}$" },
      { id: 'D', text: "$24\\text{ g}$" }
    ],
    answer: 'C',
    solution: "Number of half-lives $n = \\frac{12}{3} = 4$.\n$$N_0 = N \\times 2^n = 3 \\times 2^4 = 3 \\times 16 = 48\\text{ g}$$"
  },

  // Q38
  38: {
    statement: "For the reaction $2A + B \\rightarrow C + D$, the following kinetic data were obtained in three separate experiments at $298\\text{ K}$:\n\n| Exp | $[A]$ (M) | $[B]$ (M) | Initial rate of formation of C ($\\text{mol L}^{-1}\\text{ s}^{-1}$) |\n| :--- | :---: | :---: | :---: |\n| 1 | 0.1 | 0.1 | $1.2 \\times 10^{-3}$ |\n| 2 | 0.1 | 0.2 | $1.2 \\times 10^{-3}$ |\n| 3 | 0.2 | 0.1 | $2.4 \\times 10^{-3}$ |\n\nThe rate law for the formation of C is:",
    options: [
      { id: 'A', text: "$\\frac{d[C]}{dt} = k[A]^2[B]$" },
      { id: 'B', text: "$\\frac{d[C]}{dt} = k[A][B]^2$" },
      { id: 'C', text: "$\\frac{d[C]}{dt} = k[A]^2$" },
      { id: 'D', text: "$\\frac{d[C]}{dt} = k[A]$" }
    ],
    answer: 'D',
    solution: "Comparing Exp 1 and 2: $[B]$ doubles while $[A]$ is constant, rate remains $1.2 \\times 10^{-3} \\implies$ order w.r.t $B$ is 0.\nComparing Exp 1 and 3: $[A]$ doubles while $[B]$ is constant, rate doubles $\\implies$ order w.r.t $A$ is 1.\n$$\\text{Rate} = k[A]$$"
  },

  // Q39
  39: {
    statement: "The half-life period of a first-order reaction is $15\\text{ minutes}$. The amount of substance left after one hour will be:",
    options: [
      { id: 'A', text: "$\\frac{1}{16}$ of the original amount" },
      { id: 'B', text: "$\\frac{1}{4}$ of the original amount" },
      { id: 'C', text: "$\\frac{1}{8}$ of the original amount" },
      { id: 'D', text: "$\\frac{1}{32}$ of the original amount" }
    ],
    answer: 'A',
    solution: "Time elapsed $= 60\\text{ minutes}$. Number of half-lives $n = \\frac{60}{15} = 4$.\n$$\\text{Fraction remaining} = \\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$$"
  },

  // Q40
  40: {
    statement: "In the reaction of formation of sulphur trioxide by contact process $2\\text{SO}_2 + \\text{O}_2 \\rightarrow 2\\text{SO}_3$, the rate of reaction was measured as $\\frac{d[\\text{SO}_3]}{dt} = 2.5 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$. The rate of reaction in terms of $[\\text{SO}_2]$ in $\\text{mol L}^{-1}\\text{ s}^{-1}$ will be:",
    options: [
      { id: 'A', text: "$-1.25 \\times 10^{-4}$" },
      { id: 'B', text: "$-2.50 \\times 10^{-4}$" },
      { id: 'C', text: "$-3.75 \\times 10^{-4}$" },
      { id: 'D', text: "$-5.00 \\times 10^{-4}$" }
    ],
    answer: 'B',
    solution: "$$-\\frac{1}{2}\\frac{d[\\text{SO}_2]}{dt} = +\\frac{1}{2}\\frac{d[\\text{SO}_3]}{dt} \\implies -\\frac{d[\\text{SO}_2]}{dt} = \\frac{d[\\text{SO}_3]}{dt} = 2.50 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ s}^{-1}$$"
  },

  // Q41
  41: {
    statement: "For the reaction $2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2$, the rate equation can be expressed in two ways:\n$$-\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = k[\\text{N}_2\\text{O}_5]\\quad \\text{and}\\quad +\\frac{d[\\text{NO}_2]}{dt} = k'[\\text{N}_2\\text{O}_5]$$\n$k$ and $k'$ are related as:",
    options: [
      { id: 'A', text: "$k = k'$" },
      { id: 'B', text: "$k' = 2k$" },
      { id: 'C', text: "$k = 2k'$" },
      { id: 'D', text: "$k' = 4k$" }
    ],
    answer: 'B',
    solution: "$$\\text{Rate} = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = +\\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt}$$\n$$\\frac{1}{2}(k[\\text{N}_2\\text{O}_5]) = \\frac{1}{4}(k'[\\text{N}_2\\text{O}_5]) \\implies \\frac{k}{2} = \\frac{k'}{4} \\implies k' = 2k$$"
  },

  // Q42
  42: {
    statement: "The rate coefficient ($k$) for a particular reaction is $1.3 \\times 10^{-4}\\text{ M}^{-1}\\text{ s}^{-1}$ at $100^\\circ\\text{C}$, and $1.3 \\times 10^{-3}\\text{ M}^{-1}\\text{ s}^{-1}$ at $150^\\circ\\text{C}$. What is the energy of activation ($E_a$) (in $\\text{kJ mol}^{-1}$) for this reaction? ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$):",
    options: [
      { id: 'A', text: "$18$" },
      { id: 'B', text: "$60$" },
      { id: 'C', text: "$99$" },
      { id: 'D', text: "$132$" }
    ],
    answer: 'B',
    solution: "$$T_1 = 373\\text{ K},\\ T_2 = 423\\text{ K}$$\n$$\\log\\left(\\frac{1.3 \\times 10^{-3}}{1.3 \\times 10^{-4}}\\right) = \\log(10) = 1 = \\frac{E_a}{2.303 \\times 8.314} \\left[\\frac{423 - 373}{373 \\times 423}\\right]$$\n$$E_a = \\frac{19.147 \\times 373 \\times 423}{50} \\approx 60400\\text{ J mol}^{-1} \\approx 60\\text{ kJ mol}^{-1}$$"
  },

  // Q43
  43: {
    statement: "For the reaction $3A + 2B \\rightarrow C + D$, the differential rate law can be written as:",
    options: [
      { id: 'A', text: "$-\\frac{1}{3}\\frac{d[A]}{dt} = -\\frac{d[C]}{dt} = k[A]^n[B]^m$" },
      { id: 'B', text: "$-\\frac{1}{3}\\frac{d[A]}{dt} = +\\frac{d[C]}{dt} = k[A]^n[B]^m$" },
      { id: 'C', text: "$-\\frac{1}{3}\\frac{d[A]}{dt} = +\\frac{d[C]}{dt}$" },
      { id: 'D', text: "$-\\frac{d[A]}{dt} = +\\frac{d[C]}{dt} = k[A][B]$" }
    ],
    answer: 'B',
    solution: "The rate of reaction is given by:\n$$\\text{Rate} = -\\frac{1}{3}\\frac{d[A]}{dt} = -\\frac{1}{2}\\frac{d[B]}{dt} = +\\frac{d[C]}{dt} = +\\frac{d[D]}{dt} = k[A]^n[B]^m$$"
  },

  // Q44
  44: {
    statement: "Higher order ($> 3$) reactions are rare due to:",
    options: [
      { id: 'A', text: "Loss of active species on collision" },
      { id: 'B', text: "Low probability of simultaneous collision of all the reacting species" },
      { id: 'C', text: "Increase in entropy and activation energy as more molecules are involved" },
      { id: 'D', text: "Shifting of equilibrium towards reactants due to elastic collisions" }
    ],
    answer: 'B',
    solution: "The probability of more than three molecules colliding simultaneously with proper orientation and sufficient energy is extremely low, making reactions of order greater than three very rare."
  },

  // Q45
  45: {
    statement: "The reaction $2\\text{N}_2\\text{O}_5(g) \\rightarrow 4\\text{NO}_2(g) + \\text{O}_2(g)$ follows first order kinetics. The pressure of a vessel containing only $\\text{N}_2\\text{O}_5$ was found to increase from $50\\text{ mm Hg}$ to $87.5\\text{ mm Hg}$ in $30\\text{ min}$. The pressure exerted by the gases after $60\\text{ min}$ will be (assume constant temperature):",
    options: [
      { id: 'A', text: "$106.25\\text{ mm Hg}$" },
      { id: 'B', text: "$125\\text{ mm Hg}$" },
      { id: 'C', text: "$116.25\\text{ mm Hg}$" },
      { id: 'D', text: "$150\\text{ mm Hg}$" }
    ],
    answer: 'A',
    solution: "Let initial pressure be $P_0 = 50\\text{ mm Hg}$.\n$$2\\text{N}_2\\text{O}_5(g) \\rightarrow 4\\text{NO}_2(g) + \\text{O}_2(g)$$\nAt time $t$: $P_t = P_0 + \\frac{3}{2}x$.\nAt $t = 30\\text{ min}$: $50 + 1.5x = 87.5 \\implies 1.5x = 37.5 \\implies x = 25\\text{ mm Hg}$.\n$\\text{N}_2\\text{O}_5$ remaining at $30\\text{ min} = P_0 - x = 25 = P_0 / 2 \\implies t_{1/2} = 30\\text{ min}$.\nAt $t = 60\\text{ min}$ ($2 t_{1/2}$), $\\text{N}_2\\text{O}_5$ remaining $= P_0 / 4 = 12.5 \\implies x' = 37.5\\text{ mm Hg}$.\n$$P_{60} = 50 + 1.5(37.5) = 50 + 56.25 = 106.25\\text{ mm Hg}$$"
  },

  // Q46
  46: {
    statement: "For $A + 2B \\rightarrow C$, the rate equation for the reaction is given as $\\text{Rate} = k[A][B]$. If the concentration of $A$ is kept the same but that of $B$ is doubled, what will happen to the rate itself?",
    options: [
      { id: 'A', text: "Doubled" },
      { id: 'B', text: "Halved" },
      { id: 'C', text: "The same" },
      { id: 'D', text: "Quadrupled" }
    ],
    answer: 'A',
    solution: "Since rate is first order with respect to $B$ (power 1 in rate law), doubling $[B]$ doubles the reaction rate."
  },

  // Q47
  47: {
    statement: "For the equilibrium $A(g) \\rightleftharpoons B(g)$, $\\Delta H = -40\\text{ kJ mol}^{-1}$. If the ratio of the activation energies of the forward ($E_f$) and reverse ($E_b$) reactions is $\\frac{2}{3}$, then:",
    options: [
      { id: 'A', text: "$E_f = 30\\text{ kJ mol}^{-1},\\ E_b = 70\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$E_f = 70\\text{ kJ mol}^{-1},\\ E_b = 30\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$E_f = 80\\text{ kJ mol}^{-1},\\ E_b = 120\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$E_f = 60\\text{ kJ mol}^{-1},\\ E_b = 100\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'C',
    solution: "$$\\Delta H = E_f - E_b = -40$$\n$$\\frac{E_f}{E_b} = \\frac{2}{3} \\implies E_f = \\frac{2}{3}E_b$$\n$$\\frac{2}{3}E_b - E_b = -40 \\implies -\\frac{1}{3}E_b = -40 \\implies E_b = 120\\text{ kJ mol}^{-1}$$\n$$E_f = \\frac{2}{3}(120) = 80\\text{ kJ mol}^{-1}$$"
  },

  // Q48
  48: {
    statement: "Decomposition of $\\text{H}_2\\text{O}_2$ follows a first order reaction. In fifty minutes the concentration of $\\text{H}_2\\text{O}_2$ decreases from $0.5\\text{ M}$ to $0.125\\text{ M}$. When the concentration of $\\text{H}_2\\text{O}_2$ reaches $0.05\\text{ M}$, the rate of formation of $\\text{O}_2$ will be:\n$$2\\text{H}_2\\text{O}_2 \\rightarrow 2\\text{H}_2\\text{O} + \\text{O}_2$$",
    options: [
      { id: 'A', text: "$2.66\\text{ L min}^{-1} \\text{ at STP}$" },
      { id: 'B', text: "$1.34 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$" },
      { id: 'C', text: "$6.93 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$" },
      { id: 'D', text: "$6.93 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ min}^{-1}$" }
    ],
    answer: 'D',
    solution: "$$0.5\\text{ M} \\rightarrow 0.25\\text{ M} \\rightarrow 0.125\\text{ M} \\implies 2 t_{1/2} = 50\\text{ min} \\implies t_{1/2} = 25\\text{ min}$$\n$$k = \\frac{0.693}{25} = 0.02772\\text{ min}^{-1}$$\n$$\\text{Rate of disappearance of } \\text{H}_2\\text{O}_2 = k[\\text{H}_2\\text{O}_2] = 0.02772 \\times 0.05 = 1.386 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$$\n$$\\text{Rate of formation of } \\text{O}_2 = \\frac{1}{2} \\left(-\\frac{d[\\text{H}_2\\text{O}_2]}{dt}\\right) = \\frac{1.386 \\times 10^{-3}}{2} = 6.93 \\times 10^{-4}\\text{ mol L}^{-1}\\text{ min}^{-1}$$"
  },

  // Q49
  49: {
    statement: "The reaction of ozone with oxygen atoms in the presence of chlorine atoms can occur by a two step process:\n$$\\text{O}_3(g) + \\text{Cl}^\\bullet(g) \\rightarrow \\text{O}_2(g) + \\text{ClO}^\\bullet(g);\\ k_1 = 5.2 \\times 10^9\\text{ L mol}^{-1}\\text{ s}^{-1}$$\n$$\\text{ClO}^\\bullet(g) + \\text{O}^\\bullet(g) \\rightarrow \\text{O}_2(g) + \\text{Cl}^\\bullet(g);\\ k_2 = 2.6 \\times 10^{10}\\text{ L mol}^{-1}\\text{ s}^{-1}$$\nThe closest rate constant for the overall reaction $\\text{O}_3(g) + \\text{O}^\\bullet(g) \\rightarrow 2\\text{O}_2(g)$ is:",
    options: [
      { id: 'A', text: "$1.4 \\times 10^{10}\\text{ L mol}^{-1}\\text{ s}^{-1}$" },
      { id: 'B', text: "$3.1 \\times 10^9\\text{ L mol}^{-1}\\text{ s}^{-1}$" },
      { id: 'C', text: "$5.2 \\times 10^9\\text{ L mol}^{-1}\\text{ s}^{-1}$" },
      { id: 'D', text: "$2.6 \\times 10^{10}\\text{ L mol}^{-1}\\text{ s}^{-1}$" }
    ],
    answer: 'C',
    solution: "The first step has a lower rate constant ($k_1 < k_2$), making it the rate-determining step. Hence the rate constant of the overall reaction is governed by $k_1 = 5.2 \\times 10^9\\text{ L mol}^{-1}\\text{ s}^{-1}$."
  },

  // Q50
  50: {
    statement: "The rate law for the reaction below is given by the expression $k[A][B]$:\n$$A + B \\rightarrow \\text{Product}$$\nIf the concentration of B is increased from $0.1$ to $0.3\\text{ mol}$, keeping the value of A at $0.1\\text{ mol}$, the rate constant will be:",
    options: [
      { id: 'A', text: "$3k$" },
      { id: 'B', text: "$9k$" },
      { id: 'C', text: "$k/3$" },
      { id: 'D', text: "$k$" }
    ],
    answer: 'D',
    solution: "The rate constant $k$ is an intrinsic characteristic of a reaction at a given temperature and does NOT depend on the concentrations of reactants. Therefore, the rate constant remains $k$."
  },

  // Q51
  51: {
    statement: "Two reactions $R_1$ and $R_2$ have identical pre-exponential factors. The activation energy of $R_1$ is more than $R_2$ by $10\\text{ kJ mol}^{-1}$. If $k_1$ and $k_2$ are the rate constants for reactions $R_1$ and $R_2$ respectively at $300\\text{ K}$, then $\\ln(k_2 / k_1)$ is equal to ($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$):",
    options: [
      { id: 'A', text: "$10$" },
      { id: 'B', text: "$5$" },
      { id: 'C', text: "$4$" },
      { id: 'D', text: "$8$" }
    ],
    answer: 'C',
    solution: "$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_{a1} - E_{a2}}{RT} = \\frac{10000}{8.314 \\times 300} = \\frac{10000}{2494.2} \\approx 4$$"
  },

  // Q52
  52: {
    statement: "The rate of a reaction A doubles on increasing the temperature from $300\\text{ K}$ to $310\\text{ K}$. By how much should the temperature of reaction B be increased from $300\\text{ K}$ so that its rate doubles, if the activation energy of reaction B is twice that of reaction A?",
    options: [
      { id: 'A', text: "$4.92\\text{ K}$" },
      { id: 'B', text: "$9.84\\text{ K}$" },
      { id: 'C', text: "$19.67\\text{ K}$" },
      { id: 'D', text: "$2.45\\text{ K}$" }
    ],
    answer: 'A',
    solution: "$$\\ln(2) = \\frac{E_{aA}}{R} \\left(\\frac{10}{300 \\times 310}\\right)$$\nFor reaction B with $E_{aB} = 2 E_{aA}$:\n$$\\ln(2) = \\frac{2 E_{aA}}{R} \\left(\\frac{\\Delta T}{300 \\times (300 + \\Delta T)}\\right)$$\nEquating:\n$$\\frac{10}{300 \\times 310} = \\frac{2 \\Delta T}{300 \\times (300 + \\Delta T)} \\implies \\Delta T \\approx 4.92\\text{ K}$$"
  },

  // Q53
  53: {
    statement: "The rate of a reaction quadruples when the temperature changes from $300\\text{ K}$ to $310\\text{ K}$. The activation energy of this reaction is ($R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$, $\\ln 2 = 0.693$):",
    options: [
      { id: 'A', text: "$53.6\\text{ kJ mol}^{-1}$" },
      { id: 'B', text: "$214.4\\text{ kJ mol}^{-1}$" },
      { id: 'C', text: "$107.2\\text{ kJ mol}^{-1}$" },
      { id: 'D', text: "$53.7\\text{ kJ mol}^{-1}$" }
    ],
    answer: 'C',
    solution: "$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\ln(4) = 2 \\times 0.693 = 1.386$$\n$$E_a = \\frac{1.386 \\times 8.314 \\times 300 \\times 310}{10} \\approx 107.2\\text{ kJ mol}^{-1}$$"
  },

  // Q54
  54: {
    statement: "At $518^\\circ\\text{C}$, the rate of decomposition of a sample of gaseous acetaldehyde, initially at a pressure of $363\\text{ Torr}$ was $1.00\\text{ Torr s}^{-1}$ when $5\\%$ had reacted and $0.50\\text{ Torr s}^{-1}$ when $33\\%$ had reacted. The order of the reaction is:",
    options: [
      { id: 'A', text: "0" },
      { id: 'B', text: "2" },
      { id: 'C', text: "3" },
      { id: 'D', text: "1" }
    ],
    answer: 'B',
    solution: "Remaining pressure:\n$P_1 = 363 \\times 0.95 = 344.85\\text{ Torr}$, $r_1 = 1.00\\text{ Torr s}^{-1}$\n$P_2 = 363 \\times 0.67 = 243.21\\text{ Torr}$, $r_2 = 0.50\\text{ Torr s}^{-1}$\n$$\\frac{r_1}{r_2} = \\left(\\frac{P_1}{P_2}\\right)^n \\implies 2 = \\left(\\frac{345}{243}\\right)^n = (1.414)^n = (\\sqrt{2})^n = 2^{n/2} \\implies n/2 = 1 \\implies n = 2$$"
  },

  // Q55
  55: {
    statement: "$\\text{N}_2\\text{O}_5$ decomposes to $\\text{NO}_2$ and $\\text{O}_2$ following first order kinetics. After $50\\text{ minutes}$, the pressure inside the vessel increases from $50\\text{ mm Hg}$ to $87.5\\text{ mm Hg}$. The pressure of the gaseous mixture after $100\\text{ minutes}$ at constant temperature will be:",
    options: [
      { id: 'A', text: "$136.25\\text{ mm Hg}$" },
      { id: 'B', text: "$106.25\\text{ mm Hg}$" },
      { id: 'C', text: "$175.0\\text{ mm Hg}$" },
      { id: 'D', text: "$116.25\\text{ mm Hg}$" }
    ],
    answer: 'B',
    solution: "At $t = 50\\text{ min}$, $\\text{N}_2\\text{O}_5$ remaining is $25\\text{ mm Hg} = P_0 / 2 \\implies t_{1/2} = 50\\text{ min}$.\nAt $t = 100\\text{ min}$ ($2 t_{1/2}$), $\\text{N}_2\\text{O}_5$ reacted is $50 - 12.5 = 37.5\\text{ mm Hg}$.\n$$P_{\\text{total}} = P_0 + 1.5 x = 50 + 1.5(37.5) = 106.25\\text{ mm Hg}$$"
  },

  // Q56
  56: {
    statement: "$\\text{N}_2\\text{O}_5$ decomposes to $\\text{NO}_2$ and $\\text{O}_2$ and follows first order kinetics. After $50\\text{ minutes}$, the pressure inside the vessel increases from $50\\text{ mm Hg}$ to $87.5\\text{ mm Hg}$. The pressure of the gaseous mixture after $100\\text{ minutes}$ at constant temperature will be:",
    options: [
      { id: 'A', text: "$136.25\\text{ mm Hg}$" },
      { id: 'B', text: "$106.25\\text{ mm Hg}$" },
      { id: 'C', text: "$175.0\\text{ mm Hg}$" },
      { id: 'D', text: "$116.25\\text{ mm Hg}$" }
    ],
    answer: 'B',
    solution: "Identical to Q55: Total pressure after $100\\text{ min}$ is $106.25\\text{ mm Hg}$."
  },

  // Q57
  57: {
    statement: "For a first order reaction $A \\rightarrow P$, $t_{1/2}$ (half-life) is $10\\text{ days}$. The time required for $\\frac{1}{4}$ conversion of $A$ (in days) is ($\\ln 2 = 0.693$, $\\ln 3 = 1.1$):",
    options: [
      { id: 'A', text: "$3.5$" },
      { id: 'B', text: "$5.5$" },
      { id: 'C', text: "$4.1$" },
      { id: 'D', text: "$2.5$" }
    ],
    answer: 'C',
    solution: "When $\\frac{1}{4}$ has reacted, $\\frac{3}{4}$ remains:\n$$t = \\frac{2.303}{k} \\log\\left(\\frac{4}{3}\\right) = \\frac{10}{0.693} (2 \\times 0.693 - 1.1) = \\frac{10}{0.693} (1.386 - 1.1) = \\frac{10 \\times 0.286}{0.693} \\approx 4.1\\text{ days}$$"
  },

  // Q58
  58: {
    statement: "If $50\\%$ of a reaction occurs in $100\\text{ seconds}$ and $75\\%$ of the reaction occurs in $200\\text{ seconds}$, the order of this reaction is:",
    options: [
      { id: 'A', text: "2" },
      { id: 'B', text: "3" },
      { id: 'C', text: "Zero" },
      { id: 'D', text: "1" }
    ],
    answer: 'D',
    solution: "For a first order reaction, $t_{75\\%} = 2 \\times t_{50\\%}$. Here $200\\text{ s} = 2 \\times 100\\text{ s}$, which satisfies first order kinetics ($n=1$)."
  },

  // Q59
  59: {
    statement: "The following results were obtained during kinetic studies of the reaction $2A + B \\rightarrow \\text{product}$:\n\n| Exp | $[A]$ ($\\text{mol L}^{-1}$) | $[B]$ ($\\text{mol L}^{-1}$) | Initial rate ($\\text{mol L}^{-1}\\text{ min}^{-1}$) |\n| :--- | :---: | :---: | :---: |\n| 1 | 0.10 | 0.20 | $6.93 \\times 10^{-3}$ |\n| 2 | 0.10 | 0.25 | $6.93 \\times 10^{-3}$ |\n| 3 | 0.20 | 0.30 | $1.386 \\times 10^{-2}$ |\n\nThe time (in minutes) required to consume half of A is:",
    options: [
      { id: 'A', text: "$100$" },
      { id: 'B', text: "$10$" },
      { id: 'C', text: "$5$" },
      { id: 'D', text: "$1$" }
    ],
    answer: 'B',
    solution: "Comparing Exp 1 and 2: rate is independent of $[B]$ (order w.r.t $B$ is 0).\nComparing Exp 1 and 3: rate doubles when $[A]$ doubles (order w.r.t $A$ is 1).\n$$\\text{Rate} = k[A] \\implies 6.93 \\times 10^{-3} = k(0.10) \\implies k = 6.93 \\times 10^{-2}\\text{ min}^{-1}$$\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{0.693}{6.93 \\times 10^{-2}} = 10\\text{ minutes}$$"
  },

  // Q60
  60: {
    statement: "For the reaction $2A + B \\rightarrow \\text{products}$, when the concentration of $A$ and $B$ both were doubled, the rate increased from $0.3\\text{ mol L}^{-1}\\text{ s}^{-1}$ to $2.4\\text{ mol L}^{-1}\\text{ s}^{-1}$. When the concentration of $A$ alone is doubled, the rate increased from $0.3\\text{ mol L}^{-1}\\text{ s}^{-1}$ to $0.6\\text{ mol L}^{-1}\\text{ s}^{-1}$. Which one of the following statements is correct?",
    options: [
      { id: 'A', text: "Order of the reaction with respect to B is 2" },
      { id: 'B', text: "Total order of the reaction is 4" },
      { id: 'C', text: "Order of the reaction with respect to A is 2" },
      { id: 'D', text: "Order of the reaction with respect to B is 1" }
    ],
    answer: 'A',
    solution: "When $[A]$ is doubled alone, rate doubles from $0.3$ to $0.6 \\implies$ order w.r.t $A$ is 1.\nWhen both $[A]$ and $[B]$ are doubled, rate increases by $\\frac{2.4}{0.3} = 8 = 2^1 \\times 2^y \\implies 2^y = 4 \\implies y = 2$.\nThus, order with respect to B is 2."
  }
};
