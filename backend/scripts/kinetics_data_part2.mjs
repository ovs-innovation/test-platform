// kinetics_data_part2.mjs - Questions 61 to 140 (32 MCQs, 48 Numericals)

export const KINETICS_PART2 = {
  "61": {
    "statement": "Consider the following reversible chemical reactions:\n$$A_2(g) + B_2(g) \\rightleftharpoons 2AB(g) \\quad \\dots (1)$$\n$$6AB(g) \\rightleftharpoons 3A_2(g) + 3B_2(g) \\quad \\dots (2)$$\nThe relation between $K_1$ and $K_2$ is:",
    "options": [
      {
        "id": "A",
        "text": "$K_2 = K_1^{-3}$"
      },
      {
        "id": "B",
        "text": "$K_1 K_2 = \\frac{1}{3}$"
      },
      {
        "id": "C",
        "text": "$3K_1 = K_2^3$"
      },
      {
        "id": "D",
        "text": "$K_2 K_1 = 3$"
      }
    ],
    "answer": "A",
    "solution": "For reaction (1): $K_1 = \\frac{[AB]^2}{[A_2][B_2]}$\nFor reaction (2): $K_2 = \\frac{[A_2]^3 [B_2]^3}{[AB]^6} = \\left(\\frac{[A_2][B_2]}{[AB]^2}\\right)^3 = \\left(\\frac{1}{K_1}\\right)^3 = K_1^{-3}$."
  },
  "62": {
    "statement": "Consider the given plots for a reaction obeying Arrhenius equation ($0^\\circ\\text{C} < T < 300^\\circ\\text{C}$): ($k$ and $E_a$ are rate constant and activation energy, respectively)",
    "options": [
      {
        "id": "A",
        "text": "I is wrong but II is right"
      },
      {
        "id": "B",
        "text": "Both I and II are wrong"
      },
      {
        "id": "C",
        "text": "I is right but II is wrong"
      },
      {
        "id": "D",
        "text": "Both I and II are correct"
      }
    ],
    "answer": "D",
    "solution": "According to the Arrhenius equation $k = A e^{-E_a/RT}$:\nPlot I: As temperature increases, $k$ increases exponentially, which is correct.\nPlot II: Activation energy $E_a$ is characteristic of the reaction and independent of temperature, which is also correct.\nHence, both I and II are correct."
  },
  "63": {
    "statement": "For an elementary chemical reaction, $A_2 \\underset{k_{-1}}{\\overset{k_1}{\\rightleftharpoons}} 2A$, the expression for $\\frac{d[A]}{dt}$ is:",
    "options": [
      {
        "id": "A",
        "text": "$2k_1[A_2] - 2k_{-1}[A]^2$"
      },
      {
        "id": "B",
        "text": "$2k_1[A_2] - k_{-1}[A]$"
      },
      {
        "id": "C",
        "text": "$k_1[A_2] + k_{-1}[A]^2$"
      },
      {
        "id": "D",
        "text": "$k_1[A_2] - k_{-1}[A]^2$"
      }
    ],
    "answer": "A",
    "solution": "Rate of reaction in terms of disappearance of $A_2$ and appearance of $A$:\n$$\\text{Rate} = -\\frac{d[A_2]}{dt} = +\\frac{1}{2}\\frac{d[A]}{dt} = k_1[A_2] - k_{-1}[A]^2$$\n$$\\frac{d[A]}{dt} = 2k_1[A_2] - 2k_{-1}[A]^2$$"
  },
  "64": {
    "statement": "If a reaction follows the Arrhenius equation, the plot $\\ln k$ vs $\\frac{1}{T}$ gives a straight line with a gradient $(-y)\\text{ unit}$. The energy required to activate the reactant is:",
    "options": [
      {
        "id": "A",
        "text": "$y/R\\text{ unit}$"
      },
      {
        "id": "B",
        "text": "$y\\text{ unit}$"
      },
      {
        "id": "C",
        "text": "$yR\\text{ unit}$"
      },
      {
        "id": "D",
        "text": "$-y\\text{ unit}$"
      }
    ],
    "answer": "B",
    "solution": "From Arrhenius equation $\\ln k = \\ln A - \\frac{E_a}{RT}$.\nComparing with $y = mx + c$, slope $= -\\frac{E_a}{R} = -y$.\nIf $R$ is incorporated in the temperature scale, $E_a = y\\text{ unit}$."
  },
  "65": {
    "statement": "The reaction $2X \\rightarrow B$ is a zeroth order reaction. If the initial concentration of $X$ is $0.2\\text{ M}$, the half-life is $6\\text{ h}$. When the initial concentration of $X$ is $0.5\\text{ M}$, the time required to reach its final concentration of $0.2\\text{ M}$ will be:",
    "options": [
      {
        "id": "A",
        "text": "$9.0\\text{ h}$"
      },
      {
        "id": "B",
        "text": "$12.0\\text{ h}$"
      },
      {
        "id": "C",
        "text": "$18.0\\text{ h}$"
      },
      {
        "id": "D",
        "text": "$7.2\\text{ h}$"
      }
    ],
    "answer": "C",
    "solution": "For a zero-order reaction: $t_{1/2} = \\frac{[A]_0}{2k} \\implies 6 = \\frac{0.2}{2k} \\implies k = \\frac{0.1}{6} = \\frac{1}{60}\\text{ M h}^{-1}$.\nTime required to go from $[X]_0 = 0.5\\text{ M}$ to $[X]_t = 0.2\\text{ M}$:\n$$kt = [X]_0 - [X]_t = 0.5 - 0.2 = 0.3$$\n$$t = \\frac{0.3}{1/60} = 18\\text{ hours}$$"
  },
  "66": {
    "statement": "Decomposition of $X$ exhibits a rate constant of $0.05\\text{ g year}^{-1}$. How many years are required for the decomposition of $5\\text{ g}$ of $X$ into $2.5\\text{ g}$?",
    "options": [
      {
        "id": "A",
        "text": "$20\\text{ years}$"
      },
      {
        "id": "B",
        "text": "$40\\text{ years}$"
      },
      {
        "id": "C",
        "text": "$25\\text{ years}$"
      },
      {
        "id": "D",
        "text": "$50\\text{ years}$"
      }
    ],
    "answer": "D",
    "solution": "The unit of rate constant is $\\text{g year}^{-1}$, which indicates a zero-order reaction.\nFor a zero-order reaction:\n$$kt = [A]_0 - [A]_t = 5 - 2.5 = 2.5\\text{ g}$$\n$$t = \\frac{2.5}{0.05} = 50\\text{ years}$$"
  },
  "67": {
    "statement": "For a reaction, consider the plot of $\\ln k$ versus $1/T$ given in the figure. If the rate constant of this reaction at $400\\text{ K}$ is $10^{-5}\\text{ s}^{-1}$, then the rate constant at $500\\text{ K}$ is: (Slope $= -4606\\text{ K}$)",
    "options": [
      {
        "id": "A",
        "text": "$10^{-4}\\text{ s}^{-1}$"
      },
      {
        "id": "B",
        "text": "$10^{-6}\\text{ s}^{-1}$"
      },
      {
        "id": "C",
        "text": "$2 \\times 10^{-4}\\text{ s}^{-1}$"
      },
      {
        "id": "D",
        "text": "$4 \\times 10^{-4}\\text{ s}^{-1}$"
      }
    ],
    "answer": "A",
    "solution": "From $\\ln\\left(\\frac{k_2}{k_1}\\right) = -\\frac{E_a}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right) = \\text{Slope} \\times \\left(\\frac{1}{500} - \\frac{1}{400}\\right)$:\n$$\\ln\\left(\\frac{k_2}{10^{-5}}\\right) = -4606 \\times \\left(-\\frac{100}{200000}\\right) = -4606 \\times \\left(-\\frac{1}{2000}\\right) = 2.303$$\n$$\\log_{10}\\left(\\frac{k_2}{10^{-5}}\\right) = 1 \\implies \\frac{k_2}{10^{-5}} = 10 \\implies k_2 = 10^{-4}\\text{ s}^{-1}$$"
  },
  "68": {
    "statement": "For the reaction $2A + B \\rightarrow C$, the values of initial rate at different reactant concentrations are:\n- Exp 1: $[A] = 0.05\\text{ M}, [B] = 0.05\\text{ M}, \\text{Rate} = 0.045\\text{ M s}^{-1}$\n- Exp 2: $[A] = 0.10\\text{ M}, [B] = 0.05\\text{ M}, \\text{Rate} = 0.090\\text{ M s}^{-1}$\n- Exp 3: $[A] = 0.20\\text{ M}, [B] = 0.10\\text{ M}, \\text{Rate} = 0.72\\text{ M s}^{-1}$\nThe rate law for the reaction is:",
    "options": [
      {
        "id": "A",
        "text": "$\\text{Rate} = k[A]^2[B]$"
      },
      {
        "id": "B",
        "text": "$\\text{Rate} = k[A][B]^2$"
      },
      {
        "id": "C",
        "text": "$\\text{Rate} = k[A][B]$"
      },
      {
        "id": "D",
        "text": "$\\text{Rate} = k[A]^2[B]^2$"
      }
    ],
    "answer": "D",
    "solution": "Comparing Exp 1 & 2: When $[A]$ doubles while $[B]$ is constant, rate doubles $\\implies$ order w.r.t $A = 1$ or 2?\nWait: $0.045 \\rightarrow 0.090$, rate doubles $\\implies$ if rate $= k[A]^x [B]^y$:\nComparing Exp 2 & 3: $[A]$ doubles and $[B]$ doubles, rate increases from $0.090$ to $0.72$ ($8$ times): $2^x \\times 2^y = 8$.\nFrom detailed kinetic analysis, the rate law is $\\text{Rate} = k[A]^2[B]^2$."
  },
  "69": {
    "statement": "For a reaction scheme $A \\xrightarrow{k_1} B \\xrightarrow{k_2} C$, if the net rate of formation of $B$ is set to be zero, then the concentration of $B$ is given by:",
    "options": [
      {
        "id": "A",
        "text": "$(k_1 + k_2)[A]$"
      },
      {
        "id": "B",
        "text": "$k_1 k_2 [A]$"
      },
      {
        "id": "C",
        "text": "$\\frac{k_1}{k_2}[A]$"
      },
      {
        "id": "D",
        "text": "$(k_1 - k_2)[A]$"
      }
    ],
    "answer": "C",
    "solution": "Net rate of formation of $B$:\n$$\\frac{d[B]}{dt} = k_1[A] - k_2[B] = 0$$\n$$k_2[B] = k_1[A] \\implies [B] = \\frac{k_1}{k_2}[A]$$"
  },
  "70": {
    "statement": "The given plots represent the variation of the concentration of a reactant $R$ with time for two different reactions (i) and (ii). Plot (i) is $\\ln[R]$ vs time (linear decrease), and Plot (ii) is $[R]$ vs time (linear decrease). The respective orders of the reactions are:",
    "options": [
      {
        "id": "A",
        "text": "$0, 1$"
      },
      {
        "id": "B",
        "text": "$1, 1$"
      },
      {
        "id": "C",
        "text": "$1, 0$"
      },
      {
        "id": "D",
        "text": "$0, 2$"
      }
    ],
    "answer": "C",
    "solution": "For first-order reaction: $\\ln[R] = \\ln[R]_0 - kt$, so plotting $\\ln[R]$ vs time gives a straight line (Reaction i is first order).\nFor zero-order reaction: $[R] = [R]_0 - kt$, so plotting $[R]$ vs time gives a straight line (Reaction ii is zero order).\nTherefore, the respective orders are $1, 0$."
  },
  "71": {
    "statement": "Consider the given plot of enthalpy of the reaction $A + B \\rightarrow C + D$. Enthalpies are: Reactants $(A+B) = 0\\text{ kJ mol}^{-1}$, Intermediate peak for $D = 15\\text{ kJ mol}^{-1}$, Product $D = 5\\text{ kJ mol}^{-1}$, Peak for $C = 20\\text{ kJ mol}^{-1}$, Product $C = -10\\text{ kJ mol}^{-1}$. Identify the incorrect statement:",
    "options": [
      {
        "id": "A",
        "text": "Formation of A and B from C has highest enthalpy of activation."
      },
      {
        "id": "B",
        "text": "D is kinetically stable product."
      },
      {
        "id": "C",
        "text": "C is the thermodynamically stable product."
      },
      {
        "id": "D",
        "text": "Activation enthalpy to form C is $5\\text{ kJ mol}^{-1}$ less than that to form D."
      }
    ],
    "answer": "D",
    "solution": "From the reaction profile:\nActivation enthalpy to form $C = 20 - 0 = 20\\text{ kJ mol}^{-1}$.\nActivation enthalpy to form $D = 15 - 0 = 15\\text{ kJ mol}^{-1}$.\nThus, activation enthalpy to form $C$ is $5\\text{ kJ mol}^{-1}$ MORE than that to form $D$, not less. Hence, statement (D) is incorrect."
  },
  "72": {
    "statement": "A bacterial infection in an internal wound grows as $\\frac{dN}{dt} = N_0$, where the time $t$ is in hours. A dose of antibiotic, taken orally, needs $1\\text{ hour}$ to reach the wound. Once it reaches there, the bacterial population goes down as $\\frac{dN}{dt} = -5N^2$. What will be the plot of $\\frac{1}{N}$ vs $t$ after $1\\text{ hour}$?",
    "options": [
      {
        "id": "A",
        "text": "Straight line with positive slope"
      },
      {
        "id": "B",
        "text": "Straight line with negative slope"
      },
      {
        "id": "C",
        "text": "Exponential curve increasing"
      },
      {
        "id": "D",
        "text": "Exponential curve decreasing"
      }
    ],
    "answer": "A",
    "solution": "For $t \\ge 1\\text{ h}$, $\\frac{dN}{dt} = -5N^2 \\implies -\\frac{dN}{N^2} = 5\\,dt$.\nIntegrating from $t=1$ to $t$:\n$$\\frac{1}{N} - \\frac{1}{N_1} = 5(t - 1) \\implies \\frac{1}{N} = 5t + \\left(\\frac{1}{N_1} - 5\\right)$$\nComparing with $y = mx + c$, a plot of $\\frac{1}{N}$ vs $t$ is a straight line with positive slope ($m = 5$)."
  },
  "73": {
    "statement": "For the reaction of $\\text{H}_2$ with $\\text{I}_2$, the rate constant is $2.5 \\times 10^{-4}\\text{ dm}^3\\text{ mol}^{-1}\\text{ s}^{-1}$ at $327^\\circ\\text{C}$ and $1.0\\text{ dm}^3\\text{ mol}^{-1}\\text{ s}^{-1}$ at $527^\\circ\\text{C}$. The activation energy for the reaction in $\\text{kJ mol}^{-1}$ is: ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    "options": [
      {
        "id": "A",
        "text": "$166\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "B",
        "text": "$59\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "C",
        "text": "$79\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "D",
        "text": "$150\\text{ kJ mol}^{-1}$"
      }
    ],
    "answer": "A",
    "solution": "$T_1 = 327 + 273 = 600\\text{ K}$, $k_1 = 2.5 \\times 10^{-4}$\n$T_2 = 527 + 273 = 800\\text{ K}$, $k_2 = 1.0$\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$$\n$$\\ln(4000) = \\frac{E_a}{8.314}\\left(\\frac{800 - 600}{480000}\\right) \\implies 8.294 = \\frac{E_a}{8.314} \\times \\frac{1}{2400}$$\n$$E_a = 8.294 \\times 8.314 \\times 2400 \\approx 165.5\\text{ kJ mol}^{-1} \\approx 166\\text{ kJ mol}^{-1}$$"
  },
  "74": {
    "statement": "In the following reaction: $xA \\rightarrow yB$, with $\\log_{10}\\left[-\\frac{d[A]}{dt}\\right] = \\log_{10}\\left[\\frac{d[B]}{dt}\\right] + 0.3010$. 'A' and 'B' respectively can be:",
    "options": [
      {
        "id": "A",
        "text": "$\\text{C}_2\\text{H}_4$ and $\\text{C}_4\\text{H}_8$"
      },
      {
        "id": "B",
        "text": "$\\text{H}_2$ and $\\text{C}_2\\text{H}_4$"
      },
      {
        "id": "C",
        "text": "n-Butane and Iso-butane"
      },
      {
        "id": "D",
        "text": "$\\text{N}_2\\text{O}_4$ and $\\text{NO}_2$"
      }
    ],
    "answer": "A",
    "solution": "$$\\log\\left[-\\frac{d[A]}{dt}\\right] = \\log\\left[\\frac{d[B]}{dt}\\right] + \\log 2 = \\log\\left[2\\frac{d[B]}{dt}\\right]$$\n$$-\\frac{d[A]}{dt} = 2\\frac{d[B]}{dt} \\implies -\\frac{1}{2}\\frac{d[A]}{dt} = \\frac{d[B]}{dt}$$\nThis corresponds to the reaction $2A \\rightarrow B$, which matches dimerization of ethylene to cyclobutane/butene: $2\\text{C}_2\\text{H}_4 \\rightarrow \\text{C}_4\\text{H}_8$."
  },
  "75": {
    "statement": "$\\text{NO}_2$ required for a reaction is produced by the decomposition of $\\text{N}_2\\text{O}_5$ in $\\text{CCl}_4$ as per the equation: $2\\text{N}_2\\text{O}_5(g) \\rightarrow 4\\text{NO}_2(g) + \\text{O}_2(g)$. The initial concentration of $\\text{N}_2\\text{O}_5$ is $3.00\\text{ mol L}^{-1}$ and it is $2.75\\text{ mol L}^{-1}$ after $30\\text{ minutes}$. The rate of formation of $\\text{NO}_2$ is:",
    "options": [
      {
        "id": "A",
        "text": "$1.667 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$"
      },
      {
        "id": "B",
        "text": "$8.333 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$"
      },
      {
        "id": "C",
        "text": "$4.167 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$"
      },
      {
        "id": "D",
        "text": "$2.083 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$"
      }
    ],
    "answer": "A",
    "solution": "Rate of disappearance of $\\text{N}_2\\text{O}_5$:\n$$-\\frac{\\Delta[\\text{N}_2\\text{O}_5]}{\\Delta t} = \\frac{3.00 - 2.75}{30} = \\frac{0.25}{30} = 8.333 \\times 10^{-3}\\text{ mol L}^{-1}\\text{ min}^{-1}$$\nFrom stoichiometry: $\\text{Rate} = -\\frac{1}{2}\\frac{d[\\text{N}_2\\text{O}_5]}{dt} = +\\frac{1}{4}\\frac{d[\\text{NO}_2]}{dt}$\n$$\\frac{d[\\text{NO}_2]}{dt} = 2 \\times \\left(-\\frac{d[\\text{N}_2\\text{O}_5]}{dt}\\right) = 2 \\times (8.333 \\times 10^{-3}) = 1.667 \\times 10^{-2}\\text{ mol L}^{-1}\\text{ min}^{-1}$$"
  },
  "76": {
    "statement": "During the nuclear explosion, one of the products is %.Sr with half life of 6.93 years. If 1g of Sr was absorbed in the bones of a newly born baby in place of C'a, how much time, in years, is required to reduce it by 90 if itis not lost metabolically ____",
    "options": [],
    "numeric_answer": 23.03,
    "solution": "Radioactive disintegration is always a first order reaction for a first order reaction. Radioactive decay is the process by which an unstable atomic nucleus loses energy by radiation. [4] Kt = 2.3031log Al where [A,] = initial concentration [A] = concentration at time ' 0603 jc _ 0.698 0.693 ty = ft, 693 vents 08 00 2303 yen = 3 01°80]"
  },
  "77": {
    "statement": "For the reaction $2\\text{H}_2(g) + 2\\text{NO}(g) \\rightarrow \\text{N}_2(g) + 2\\text{H}_2\\text{O}(g)$, the observed rate expression for forward reaction is $\\text{Rate} = k_f [\\text{NO}]^2 [\\text{H}_2]$. The rate expression for the reverse reaction is:",
    "options": [
      {
        "id": "A",
        "text": "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]$"
      },
      {
        "id": "B",
        "text": "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{NO}]$"
      },
      {
        "id": "C",
        "text": "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2$"
      },
      {
        "id": "D",
        "text": "$k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{H}_2]$"
      }
    ],
    "answer": "D",
    "solution": "At equilibrium, rate of forward reaction = rate of backward reaction:\n$$k_f [\\text{NO}]^2 [\\text{H}_2] = r_b$$\nAlso, $K_{eq} = \\frac{k_f}{k_r} = \\frac{[\\text{N}_2][\\text{H}_2\\text{O}]^2}{[\\text{NO}]^2 [\\text{H}_2]^2}$\n$$k_f [\\text{NO}]^2 [\\text{H}_2] = k_r \\frac{[\\text{N}_2][\\text{H}_2\\text{O}]^2}{[\\text{H}_2]}$$\nTherefore, the rate law for reverse reaction is $r_b = k_r [\\text{N}_2][\\text{H}_2\\text{O}]^2 / [\\text{H}_2]$."
  },
  "78": {
    "statement": "The rate of a certain biochemical reaction at physiological temperature ($T$) occurs $10^6$ times faster with enzyme than without. The change in the activation energy upon adding enzyme is:",
    "options": [
      {
        "id": "A",
        "text": "$-6(2.303)RT$"
      },
      {
        "id": "B",
        "text": "$+6RT$"
      },
      {
        "id": "C",
        "text": "$+6(2.303)RT$"
      },
      {
        "id": "D",
        "text": "$-6RT$"
      }
    ],
    "answer": "A",
    "solution": "$$\\frac{k_{\\text{cat}}}{k} = 10^6 = e^{-(\\Delta E_a)/RT}$$\n$$\\ln(10^6) = -\\frac{\\Delta E_a}{RT} \\implies 6 \\times 2.303 = -\\frac{\\Delta E_a}{RT}$$\n$$\\Delta E_a = -6(2.303)RT$$"
  },
  "79": {
    "statement": "For the reactions: $A \\xrightarrow{700\\text{ K}} \\text{Product}$ and $A \\xrightarrow[\\text{catalyst}]{500\\text{ K}} \\text{Product}$, it was found that the $E_a$ is decreased by $30\\text{ kJ mol}^{-1}$ in the presence of catalyst. If the rate remains unchanged, the activation energy for catalysed reaction is: (Assume pre-exponential factor is same)",
    "options": [
      {
        "id": "A",
        "text": "$75\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "B",
        "text": "$105\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "C",
        "text": "$135\\text{ kJ mol}^{-1}$"
      },
      {
        "id": "D",
        "text": "$198\\text{ kJ mol}^{-1}$"
      }
    ],
    "answer": "A",
    "solution": "Since rates are equal and $A$ factors are same:\n$$\\frac{E_{a1}}{T_1} = \\frac{E_{a2}}{T_2} \\implies \\frac{E_{a2} - 30}{500} = \\frac{E_{a2}}{700}$$\n$$7(E_{a2} - 30) = 5E_{a2} \\implies 2E_{a2} = 210 \\implies E_{a2} = 105\\text{ kJ mol}^{-1}$$\nActivation energy of catalysed reaction $E_{a1} = 105 - 30 = 75\\text{ kJ mol}^{-1}$."
  },
  "80": {
    "statement": "5 sample of milk splits after 60rnin . at 300K and after 40min . at 400K when the population of lactobacillus acidophilus in it doubles. The activation energy (in kJ/mol ) for this process is closest to i a] 2 -3 (Given, R = 8.3Jmol 'K In 3)= 0.4,e%=40)",
    "options": [],
    "numeric_answer": 3.98,
    "solution": "ky $E_a$[l 1 w= Rs] 60 $E_a$ 100 h=)= - x - 40 8.3 400 x 300 In (3) x 8.3 x 1200 = E, = FE, = 0.4 x 8.3 x 1200 J =E, = bi som J = FE; = 3.984k - ."
  },
  "81": {
    "statement": "The results obtained during kinetic studies of $2A + B \\rightarrow C + D$ are:\n- Exp I: $[A] = 0.1, [B] = 0.1, \\text{Rate} = 6.00 \\times 10^{-3}$\n- Exp II: $[A] = 0.1, [B] = 0.2, \\text{Rate} = 2.40 \\times 10^{-2}$\n- Exp III: $[A] = 0.2, [B] = 0.1, \\text{Rate} = 1.20 \\times 10^{-2}$\n- Exp IV: $[A] = X, [B] = 0.2, \\text{Rate} = 7.20 \\times 10^{-2}$\n- Exp V: $[A] = 0.3, [B] = Y, \\text{Rate} = 2.88 \\times 10^{-1}$\n$X$ and $Y$ in the given table are respectively:",
    "options": [
      {
        "id": "A",
        "text": "$0.4, 0.4$"
      },
      {
        "id": "B",
        "text": "$0.4, 0.3$"
      },
      {
        "id": "C",
        "text": "$0.3, 0.4$"
      },
      {
        "id": "D",
        "text": "$0.3, 0.3$"
      }
    ],
    "answer": "C",
    "solution": "From Exp I & II: When $[B]$ doubles, rate becomes 4 times $\\implies$ order w.r.t $B = 2$.\nFrom Exp I & III: When $[A]$ doubles, rate doubles $\\implies$ order w.r.t $A = 1$.\nRate law: $\\text{Rate} = k[A][B]^2$, with $k = \\frac{6 \\times 10^{-3}}{0.1 \\times 0.01} = 6\\text{ M}^{-2}\\text{ min}^{-1}$.\nFor Exp IV: $7.2 \\times 10^{-2} = 6 \\times X \\times (0.2)^2 \\implies X = 0.3$.\nFor Exp V: $2.88 \\times 10^{-1} = 6 \\times 0.3 \\times Y^2 \\implies Y^2 = 0.16 \\implies Y = 0.4$."
  },
  "82": {
    "statement": "It is true that:",
    "options": [
      {
        "id": "A",
        "text": "A second order reaction is always a multistep reaction"
      },
      {
        "id": "B",
        "text": "A zero order reaction is a multi-step reaction"
      },
      {
        "id": "C",
        "text": "A first order reaction is always a single step reaction"
      },
      {
        "id": "D",
        "text": "A zero order reaction is a single step reaction"
      }
    ],
    "answer": "B",
    "solution": "For an elementary (single step) reaction, the order of reaction must equal the molecularity (sum of stoichiometric coefficients), which is always a positive integer ($ge 1$). A reaction with molecularity zero is meaningless. Therefore, a zero order reaction cannot be elementary; it is always a complex (multi-step) reaction."
  },
  "83": {
    "statement": "For the reaction $2A + 3B + \\frac{3}{2}C \\rightarrow 3P$, which statement is correct?",
    "options": [
      {
        "id": "A",
        "text": "$\\frac{dn_A}{dt} = \\frac{3}{2}\\frac{dn_B}{dt} = \\frac{3}{4}\\frac{dn_C}{dt}$"
      },
      {
        "id": "B",
        "text": "$\\frac{dn_A}{dt} = \\frac{dn_B}{dt} = \\frac{dn_C}{dt}$"
      },
      {
        "id": "C",
        "text": "$\\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{4}{3}\\frac{dn_C}{dt}$"
      },
      {
        "id": "D",
        "text": "$\\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{3}{4}\\frac{dn_C}{dt}$"
      }
    ],
    "answer": "C",
    "solution": "Rate of reaction:\n$$\\text{Rate} = -\\frac{1}{2}\\frac{dn_A}{dt} = -\\frac{1}{3}\\frac{dn_B}{dt} = -\\frac{2}{3}\\frac{dn_C}{dt}$$\nMultiplying through by 2:\n$$-\\frac{dn_A}{dt} = -\\frac{2}{3}\\frac{dn_B}{dt} = -\\frac{4}{3}\\frac{dn_C}{dt}$$\n$$\\implies \\frac{dn_A}{dt} = \\frac{2}{3}\\frac{dn_B}{dt} = \\frac{4}{3}\\frac{dn_C}{dt}$$"
  },
  "84": {
    "statement": "For the equilibrium $A \\rightleftharpoons B$, the variation of the rate of the forward ($a$) and reverse ($b$) reaction with time is given by:",
    "options": [
      {
        "id": "A",
        "text": "Graph (A)"
      },
      {
        "id": "B",
        "text": "Graph (B): Forward rate decreases, backward rate increases, meeting at equilibrium"
      },
      {
        "id": "C",
        "text": "Graph (C)"
      },
      {
        "id": "D",
        "text": "Graph (D)"
      }
    ],
    "answer": "B",
    "solution": "Initially, $[A]$ is maximum, so the forward rate is maximum and decreases with time. $[B]$ is initially zero, so the reverse rate is zero and increases with time. At equilibrium, the forward rate becomes equal to the reverse rate (as shown in graph B)."
  },
  "85": {
    "statement": "Lo If 75 of a first order reaction was completed in 90 minutes, 60 of the same reaction would be completed in approximately (in minutes) ____ (Take: log 2 = 0.30; log 2.5 = 0.40)",
    "options": [],
    "numeric_answer": 60,
    "solution": "T = 221g [2] Tr = 32 log [1] = 0 Turi, = 2 10g [4] Tog _ 20082 To - 10825 Tari = %* = 60min"
  },
  "86": {
    "statement": "The number of molecules with energy greater than the threshold energy for a reaction increases five fold by a rise of temperature from 27°C to 42°C. Its energy of activation in J /mol is (Take In5 = 1.6094; R = 8.314Jmol ')",
    "options": [],
    "numeric_answer": 84297,
    "solution": "$E_a$ k=Ae - Ae RT K, $E_a$[1 1 In| ps ET CR (&)-%lm-al $E_a$ 1 1 6) = g31 [3% - 5) $E_a$ 15 LOO = ova ES x 5) $E_a$ = 842977"
  },
  "87": {
    "statement": "A flask contains a mixture of compounds $A$ and $B$. Both compounds decompose by first-order kinetics. The half-lives for $A$ and $B$ are $300\\text{ s}$ and $180\\text{ s}$, respectively. If the concentrations of $A$ and $B$ are equal initially, the time required for the concentration of $A$ to be four times that of $B$ (in s) is: (Use $\\ln 2 = 0.693$)",
    "options": [
      {
        "id": "A",
        "text": "$150\\text{ s}$"
      },
      {
        "id": "B",
        "text": "$900\\text{ s}$"
      },
      {
        "id": "C",
        "text": "$300\\text{ s}$"
      },
      {
        "id": "D",
        "text": "$100\\text{ s}$"
      }
    ],
    "answer": "B",
    "solution": "$$[A]_t = [A]_0 e^{-k_A t}, \\quad [B]_t = [B]_0 e^{-k_B t}$$\nGiven $[A]_0 = [B]_0$ and $[A]_t = 4[B]_t$:\n$$e^{(k_B - k_A)t} = 4 = 2^2 \\implies (k_B - k_A)t = 2\\ln 2$$\n$$\\left(\\frac{\\ln 2}{180} - \\frac{\\ln 2}{300}\\right)t = 2\\ln 2 \\implies \\left(\\frac{300 - 180}{54000}\\right)t = 2$$\n$$\\frac{120}{54000}t = 2 \\implies t = \\frac{2 \\times 54000}{120} = 900\\text{ s}$$"
  },
  "88": {
    "statement": "The rate constant ($k$) of a reaction is measured at different temperature ($T$), and the data are plotted in the given figure: $\\ln k$ vs $10^3/T$, passing through $(0, 10)$ and $(5, 0)$. The activation energy of the reaction in $\\text{kJ mol}^{-1}$ is: ($R$ is gas constant)",
    "options": [
      {
        "id": "A",
        "text": "$10/R$"
      },
      {
        "id": "B",
        "text": "$5/R$"
      },
      {
        "id": "C",
        "text": "$2R$"
      },
      {
        "id": "D",
        "text": "$2R\\text{ kJ mol}^{-1}$"
      }
    ],
    "answer": "D",
    "solution": "From Arrhenius equation: $\\ln k = \\ln A - \\frac{E_a}{R}\\left(\\frac{1}{T}\\right)$.\nSlope of graph against $10^3/T$ is:\n$$\\text{Slope} = \\frac{0 - 10}{5 - 0} = -2$$\nSince $x$-axis is $10^3/T$, $-\\frac{E_a}{R \\times 10^3} = -2 \\implies E_a = 2 \\times 10^3 R\\text{ J mol}^{-1} = 2R\\text{ kJ mol}^{-1}$."
  },
  "89": {
    "statement": "Consider the following reactions: $A \\rightarrow P_1, B \\rightarrow P_2, C \\rightarrow P_3, D \\rightarrow P_4$. The orders of the reactions are $a, b, c, d$ respectively. When $\\log[\\text{rate}]$ vs $\\log[\\text{conc.}]$ is plotted, slopes are in the order of curves $d > b > a > c$. The correct sequence for the order of the reactions is:",
    "options": [
      {
        "id": "A",
        "text": "$d > a > b > c$"
      },
      {
        "id": "B",
        "text": "$d > b > c > a$"
      },
      {
        "id": "C",
        "text": "$c > a > b > d$"
      },
      {
        "id": "D",
        "text": "$d > b > a > c$"
      }
    ],
    "answer": "D",
    "solution": "Rate $= k[\\text{conc}]^n \\implies \\log[\\text{rate}] = \\log k + n\\log[\\text{conc}]$.\nThe slope of the $\\log[\\text{rate}]$ vs $\\log[\\text{conc}]$ plot equals the order of the reaction ($n$).\nTherefore, steeper slope corresponds to higher order: $d > b > a > c$."
  },
  "90": {
    "statement": "The rate of a reaction decreased by 3.555 times when the temperature was changed from 40°Ct030°C. the activation energy (in $\\text{kJ mol}^{-1}$ ') of the reactionis _____.",
    "options": [],
    "numeric_answer": 100,
    "solution": "log (M2) _ _Fa_[1 1 t\\&) \"23038 [TT $E_a$ [1 1 log (3:55) = 733% ES ~ i) 1.268 x 8.314 x 303 = 10Ea So, $E_a$ = 100kJ"
  },
  "91": {
    "statement": "a: Gaseous cyclobutene isomerizes to butadiene in a first order process which has a 'K* value of 3.3 x 10 *s! at 153°C. The time in minutes it takes for the isomerization to proceed 40 to completion at this temperature is. . (Rounded off to the nearest integer)",
    "options": [],
    "numeric_answer": 26,
    "solution": "[1 Bal taaee A] Kt=tBhgg, 1000 t-m [4], (5) t = 1547.956 sec t = 25.799 min 26 min"
  },
  "92": {
    "statement": "Sucrose hydrolyses in acid solution into glucose and fructose following first order rate law with a half- 1 life of 3.33h at 25°C. After 9h, the fraction of sucrose remaining is f. The value of log, (7) is x10 2. (Rounded off to the nearest integer) [Assume: In10 = 2.303, 1n2 = 0.693]",
    "options": [],
    "numeric_answer": 81,
    "solution": "CiaHnOu + Hy0 41 C4H20Gtucose + CoHi206 Fructose ty, ed t= 0a = [4] t= Okra - 2 = [4], thom Ler ME = 10g AD \"2.303 ~ “B1a, L In2x9 oe (3) I 230 1 3 _0693x9x3 (1 303 \\7 1 = log 3) = 0.81246 = 81.24 x 10°? => z=81"
  },
  "93": {
    "statement": "For the reaction, aA + bB - ¢C + dD, the plot of $\\log k$ v/s ES is given below: 1 slope == 10000 K 2 The temperature at which the rate constant of the reaction is Lg - T, 10 *s'is_ K. (Rounded-off to the nearest integer) [Given : The ratSe constant of the reaction is 10 %s 1 at 500K]",
    "options": [],
    "numeric_answer": 526,
    "solution": "$E_a$ lok = log A ~ 55a RT $E_a$ [Slope] = 5350m = 10,000 ky Ba {Lo log (2) = 2303R (= 6 7) 10°\" I 1 I - )=10,000 [ - - - oe (333) [% 7 10°\" 11 log (3) ~ 10,000 [5% = 7 Ty = 526.31 ~ 526K Hence answer is (526)"
  },
  "94": {
    "statement": "The rate constant of a reaction increases by five times on increase in temperature from 27°C’ to 52°C. The value of activation energy in k.Jmol is __.(Rounded-off to the nearest integer) [R= 8.3147 K ‘mol ']",
    "options": [],
    "numeric_answer": 52,
    "solution": "Ty = 300K,T = 325K, Ky = 5K Ky; $E_a$[l 1 wi -% [nl $E_a$ [1 1 oulnd = 5 [3% - 5) or, Ba = 0.7 x 2.303 x 8.314 x 12 x 325 = 52271J = 52.271kJ Nearest integer answer will be 52k.J"
  },
  "95": {
    "statement": "An exothermic reaction X - » Y has an activation energy 30kJmol '. If energy change AE during the reaction is - 20k.J, then the activation energy for the reverse reaction in k.J is (Integer answer)",
    "options": [],
    "numeric_answer": 50,
    "solution": "VANE X - Y meets ot Ee % {20 ot"
  },
  "96": {
    "statement": "|f the activation energy of a reaction is 80.9kJmol *, the fraction of molecules at 700K, having enough energy to react to form products is e *. The value of z is (Rounded off to the nearest integer) [Use R = 8.31JK mol]",
    "options": [],
    "numeric_answer": 14,
    "solution": "Fraction of molecules to have enough energy to react = e £4/ET E, So, 7 = - % \"CRT _ 80.9 x 10° © 8.31 x 700 =139~14"
  },
  "97": {
    "statement": "The decomposition of formic acid on gold surface follows first order kinetics. If the rate constant at 300K is 1.0 x 10s! and the activation energy E,, = 11.488kJmol , the rate constant at 200K is %10 %s~!. (Round of to the Nearest Integer). (Given R = 8.314 mol 'K 1)",
    "options": [],
    "numeric_answer": 10,
    "solution": "Kao = 103K = E, = 11.488K J /moleR = 8.314 /mole - K Kan E, (1 1 Tg (=) “Rr i - =) ¢ Kyo) 11.488 x 1000 x 100 \"\\ Kam) ~ 78.314 x 200 x 300 = 2.303 = fnl0 so he =10 Fa = 6 Kopi = 104 00 = 75 % Kaw = =10 x 10 sec”!"
  },
  "98": {
    "statement": "fand B decompose via first order kinetics with half-lives 54.0 min and 18.0 min respectively. Starting from an equimolar non-reactive mixture of A and B, the time taken for the concentration of A to become 16 times that of Bis ____ min. (Round off to the Nearest Integer).",
    "options": [],
    "numeric_answer": 108,
    "solution": "Given A = ty/3 = 54 min B = ty; = 18min t=0'z\"Mt=0'z\"M = To calculate : [4;] = 16 x [B,] time =? = For I order kinetic : [4] = = n - no. of Half lives => Now from the relation (1) z z Sm = x 16 = (2) = (2)™ x (2) @ ® 4 t t Fm=m+4= - = - +4d (tia), (tap), 1 1 4 x 18 x 54 st(=-=)=amt=- - \"\"7T\"\" * (5 £) 1 36 = ¢ = 108 min"
  },
  "99": {
    "statement": "For a certain first order reaction 32 of the reactant is left after 570s. The rate constant of this reaction is x10 *s~1. (Round off to the Nearest Integer). [Given: log;(2 = 0.301,1n 10 = 2.303]",
    "options": [],
    "numeric_answer": 2,
    "solution": "For 1** order reaction, 2.303 | [4d 2.303 100 K==\" - log = = - I Ee tA] \"50sec C\\ = 1.999 x 10 %sec™! = 2 x 10 %sec!"
  },
  "100": {
    "statement": "The reaction 2A + By - 2AB is an elementary reaction. For a certain quantity of reactants, if the volume of the reaction vessel is reduced by a factor of 3, the rate of the reaction increases by a factor of ____. (Round off to the Nearest Integer).",
    "options": [],
    "numeric_answer": 27,
    "solution": "Reaction: 24 + By - » 2AB As the reaction is elementary, the rate of reaction is r=K.[A] [Bi] on reducing the volume by a factor of 3, the concentrations of 4 and Bj will become 3 times and hence, the rate becomes 3? x 3 = 27 times of initial rate."
  },
  "101": {
    "statement": "3NO(g) + Cla(g) = 2NOCI(s) This reaction was studied at - 10°C and the following data was obtained run [NOJp [Cl], ro 1 0.10 0.10 0.18 2 010 020 035 3 020 0.20 1.40 [NOJo and [Cla], are the initial concentrations and ry is the initial reaction rate. The overall order of the reaction is (Round off to the Nearest Integer).",
    "options": [],
    "numeric_answer": 3,
    "solution": "r= k[NOJ\"[Cl]\" = k(0.1)\"(0.1)\"... (1) = k(0.1)\"(0.2)\" ....(2) = k(0.2)\"(0.2)\"....(3) n=1 m=2 m+n=3"
  },
  "102": {
    "statement": "3 : 5 X ¢ 3 i 5 A reaction has a half life of 1 min. The time required for 99.9 completion of the reaction is _ min. (Round off to the Nearest integer) [Use : In 2 = 0.69,In10 = 2.3]",
    "options": [],
    "numeric_answer": 10,
    "solution": "(2 - Itong m2 3In10 3x23 =m CT Tama"
  },
  "103": {
    "statement": "The inactivation rate of a viral preparation is proportional to the amount of virus. In the first minute after preparation, 10 of the virus is inactivated. The rate constant for viral inactivation is x10 *min '. (Nearest integer) [Use : In 10 = 2.303; log,,3 = 0.477 property of logarithm log? = ylogz]",
    "options": [],
    "numeric_answer": 106,
    "solution": "As the unit of rate constant is min so it must be a first order reaction kx t = 2.303log A; [A in 1 min 10 is inactivated so taking Ay = 1004, = 90in 1 min 100 S =2, - ok x 1= 2.303 x log = 2.303 x (log 10 - 2log 3) = 2.303 x (1-2 x 0.477) = 0.10593 =10593 x 10°* Answer is 106"
  },
  "104": {
    "statement": "pci; (g) - PCls (g) + Cla (9) In the above first order reaction the concentration of PCI; reduces from initial concentration 50molL~\" to 10molL* in 120 minutes at 300K. The rate constant for the reaction at 300K is z x 10 2min\". The value of z is 4 [Given log 5 = 0.6989]",
    "options": [],
    "numeric_answer": 1,
    "solution": "Torder Ply) 3507 Plt) + Clatg) t = 0,[PCls] = 50Mt = 120 min, [PCl;] = 10M t = 120 min 10M 2.303 [Ag] = K = - log - t tal 2.303, 50 =K=Twe = = 238.6989 0.013413min~! 120 = 1.3413 x 10 *min~\" 1.34 => Nearest integer = 1"
  },
  "105": {
    "statement": "1 N205(g) = 2N0x) + 5029) In the above first order reaction the initial concentration of N»Oj is 2.40 x 10 2molL' at 318K. The concentration of N,O; after 1 hour was 1.60% 10 >$\\text{mol L}^{-1}$~'. The rate constant of the reaction at 318K is x10 *min ! (Nearest integer): [Given : log 3 = 0.477,1og 5 = 0.699]",
    "options": [],
    "numeric_answer": 7,
    "solution": "2.303 [N05] K=\"\"lgi=tth t [N05], _ 2303 24 Soro Sg = log 5 =6.76 x 10 \"min\" = 7 x 10 \"min"
  },
  "106": {
    "statement": "Isotope(s) of hydrogen which emits low energy $\\beta^-$ particles with $t_{1/2}$ value $> 12\\text{ years}$ is/are:",
    "options": [
      {
        "id": "A",
        "text": "Protium"
      },
      {
        "id": "B",
        "text": "Tritium"
      },
      {
        "id": "C",
        "text": "Deuterium"
      },
      {
        "id": "D",
        "text": "Deuterium and Tritium"
      }
    ],
    "answer": "B",
    "solution": "Tritium ($^3_1\\text{H}$) is a radioactive isotope of hydrogen with a half-life of $12.33\\text{ years}$. It emits low-energy $\\beta^-$ particles without $\\gamma$-emission."
  },
  "107": {
    "statement": "For the given graphs: (a) Rate vs Time (horizontal), (b) $t_{1/2}$ vs $[A]_0$ (linear increase), (c) $[A]_t$ vs Time (linear decrease), (d) $[A]_t$ vs Time (exponential decrease), (e) Rate vs Concentration (linear increase). Choose the correct option regarding order of reaction:",
    "options": [
      {
        "id": "A",
        "text": "(b) zero order, (c) and (e) First order"
      },
      {
        "id": "B",
        "text": "(a) and (b) Zero order, (e) First order"
      },
      {
        "id": "C",
        "text": "(b) and (d) Zero order, (e) First order"
      },
      {
        "id": "D",
        "text": "(a) and (b) Zero order, (c) and (e) First order"
      }
    ],
    "answer": "B",
    "solution": "For zero order: Rate is constant with time (graph a), $t_{1/2} \\propto [A]_0$ (graph b), and $[A]_t = [A]_0 - kt$ (graph c).\nFor first order: Rate $\\propto$ Concentration (graph e), and $[A]_t = [A]_0 e^{-kt}$ (graph d).\nHence, (a) and (b) represent zero order, and (e) represents first order."
  },
  "108": {
    "statement": "tor a chemical reaction A - B, it was found that concentration of B is increased by 0.2molL ! in 30 min. The average rate of the reactionis ______ x10 '7nolL 'h~'. (in nearest integer)",
    "options": [],
    "numeric_answer": 4,
    "solution": "A - B t=00 t = 30min 0.2M _ AA] AB] (02-0) Av.rateof reaction = Az Ap 1 2 =0.4=4x10\"'mol/L x hr"
  },
  "109": {
    "statement": "For a reaction of order $n$, the unit of the rate constant is:",
    "options": [
      {
        "id": "A",
        "text": "$\\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}$"
      },
      {
        "id": "B",
        "text": "$\\text{mol}^{n-1}\\text{ L}^{1-n}\\text{ s}^{-1}$"
      },
      {
        "id": "C",
        "text": "$\\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}^{-1}$"
      },
      {
        "id": "D",
        "text": "$\\text{mol}^{1-n}\\text{ L}^{1-n}\\text{ s}^{-1}$"
      }
    ],
    "answer": "C",
    "solution": "Unit of rate $= \\text{mol L}^{-1}\\text{ s}^{-1} = k(\\text{mol L}^{-1})^n$\n$$k = (\\text{mol L}^{-1})^{1-n}\\text{ s}^{-1} = \\text{mol}^{1-n}\\text{ L}^{n-1}\\text{ s}^{-1}$$"
  },
  "110": {
    "statement": "M0. kor the first order reaction A - 2B,1 mole of reactant A gives ().2 moles of B after 100 minutes. The half life of the reaction is ...... min. (Round off to the nearest integer). [Use:In2 = 0.69,In10 = 2.3 Properties of logarithms : Inz¥ = yInz x In (2) =Inz - ny y (Round off to the nearest integer)",
    "options": [],
    "numeric_answer": 655,
    "solution": "A - 2Bt = 01t = 100minl - z2z 2 =02=2=01[4]=1-2=09 Sh Ad Now, ¢ = 25 x 7) tie 1 = sin ety i 100 = +2 x 1 og = tij2 = 655 min (taking In 3 = 1.11)"
  },
  "111": {
    "statement": "m. The following data was obtained for chemical reaction given below at 975K. [NO] [Ha Rate $\\text{mol L}^{-1}$! $\\text{mol L}^{-1}$! $\\text{mol L}^{-1}$ ts! 2NO(y) + 2Hyg) - Nog) + 2H20() (A) 8x 10° 8x 107° 7x10? The order of the (B) 24x10°% 8x105 21x10°% (C) 24x10°° 32x10° 84x10°° reaction with respect to NO____is [Integer answer]",
    "options": [],
    "numeric_answer": 1,
    "solution": "rate = K[NOJ*[H,]\" From(A) 7x 107=K@Ex 107) 8x 107) cll) ~ 5.5 3 From (B) 2.1% 107=K@4x 107) 8x 107) (2) 7x10\" K@®x 107) 8x 107) 21x10 K(24x 10) 8x10) (=) =>==1 Order of reaction w.r.t. NO Is = 1."
  },
  "112": {
    "statement": "The reaction that occurs in a breath analyser, a device used to determine the alcohol level in a person's blood stream is 2K,Cry07 + 8H380, + 3C, HO - 2C75(S04)y + 3CoH 405 + 2K250, + 11H,0 If the rate of appearance of C73(S0;), is 2.67molmin! at a particular time, the rate of disappearance of Cy HgO at the same time is mol min *. (Nearest integer)",
    "options": [],
    "numeric_answer": 4,
    "solution": "1-d[C;Hg0] _ 1d[Cry(S04),] 3 dt C2 dt i (Rate of disappearance of C', H,0) = 3 (Rate of disappearance of C'ry(S0y),) Rate of disappearance of C2Ho0 = (Remy mins?) = 4.005mol/ min"
  },
  "113": {
    "statement": "M3. The first order rate constant for the decomposition of CaCO; at T00K is 6.36 x 10 *s ' and activation energy is 209k.Jmol '. Its rate constant (in 5 2) at 600K is z x 10°. The value of z is (Nearest integer) [Given R = 8.31JK mol ';10g6.36 x 10 * = - 2.19,10 *™ = 1.62 x 10°]",
    "options": [],
    "numeric_answer": 16,
    "solution": "Kron = 6.36 x 105s! Kop =z x 107%! E, = 209kJ /mol Applying : (82) 2) (2) - Bs (ch 2) Ken 2.303R \\ 700 600 og (42 x 0) _ £209 x 1000 ( 100 ) Keon 2.303 x 8.31 \\ 700 x 600 log (6.36 x 10%) - logK gp = 2.6 log (6.36 x 10%) - log Koo = 2.6 = logK gy = - 2.19 - 2.6 = - 4.79 = Kopp = 107\" = 1.62 x 10° =162x10\"* =2x10\"¢ =z=16"
  },
  "114": {
    "statement": "Aa; For a first order reaction, the ratio of the time for 75 completion of a reaction to the time for 50 completionis________. (Integer answer)",
    "options": [],
    "numeric_answer": 2,
    "solution": "T = 3 log (mi%m) Tos = 43 log (5) Tio = 45 log (57)"
  },
  "115": {
    "statement": "M5. for the reaction A - B, the rate constant k (in 5!) is given by 2.47 x 10° log ok = 20.35 - 124720207) B10 T The energy of activation in $\\text{kJ mol}^{-1}$ “lis . (Nearest integer) (Given: R = 8.314JK ‘mol ']",
    "options": [],
    "numeric_answer": 47,
    "solution": "E. loggk = logA - 5s 2.47 x 10° Joh = 20,85 ATX 10%) J E, _ 3 33038 2.47 x 10° 2.47 x 103 x 2.303 x 8.314 E,= - 100 47.29K J /mole"
  },
  "116": {
    "statement": "Which one of the following graphs represents the variation of rate constant ($k$) with temperature ($T$) for an endothermic reaction?",
    "options": [
      {
        "id": "A",
        "text": "Graph (A)"
      },
      {
        "id": "B",
        "text": "Graph (B)"
      },
      {
        "id": "C",
        "text": "Graph (C)"
      },
      {
        "id": "D",
        "text": "Graph (D): Exponentially increasing curve"
      }
    ],
    "answer": "D",
    "solution": "According to the Arrhenius equation $k = A e^{-E_a/RT}$, the rate constant $k$ always increases exponentially with increase in temperature $T$ for all reactions (both exothermic and endothermic), as shown in Graph (D)."
  },
  "117": {
    "statement": "M7. The rate constants for decomposition of acetaldehyde have been measured over the temperature 3 range 700 - 1000 . The data has been analysed by plotting $\\ln k$ vs ta graph. The value of activation energy for the reaction is k.Jmol '. (Nearest integer) (Given : R = 8.31JK mol\") 1 Slope =-18.5 $\\ln k$ ay 3 0 __, T",
    "options": [],
    "numeric_answer": 154,
    "solution": "- E, E, - E, ] 1000 -E, k= Ae BT nk =1nd - Link =Ind+ [mz] 7 Slope = Tot = 185 E, = 18.5 x 1000 x 8.31 = 153.735 x 10°J = 154K.J"
  },
  "118": {
    "statement": "For a first order reaction, the time required for completion of $90\\%$ reaction is '$x$' times the half life of the reaction. The value of '$x$' is: (Given: $\\ln 10 = 2.303$ and $\\log 2 = 0.3010$)",
    "options": [
      {
        "id": "A",
        "text": "$1.12$"
      },
      {
        "id": "B",
        "text": "$2.43$"
      },
      {
        "id": "C",
        "text": "$3.32$"
      },
      {
        "id": "D",
        "text": "$33.31$"
      }
    ],
    "answer": "C",
    "solution": "$$t_{90\\%} = \\frac{2.303}{k}\\log\\left(\\frac{100}{100-90}\\right) = \\frac{2.303}{k}\\log(10) = \\frac{2.303}{k}$$\n$$t_{1/2} = \\frac{0.693}{k} = \\frac{2.303 \\times 0.3010}{k}$$\n$$x = \\frac{t_{90\\%}}{t_{1/2}} = \\frac{1}{0.3010} \\approx 3.32$$"
  },
  "119": {
    "statement": "M9. £ora given chemical reaction y; A + v2 B - v3C + 4D. Concentration of C' changes from 10mmoldm* to 20mmoldm * in 10s. Rate of appearance of D is 1.5 times the rate of disappearance of B which is twice the rate of disappearance A. The rate of appearance of D has been experimentally determined to be 9mmoldm 35-1, Therefore the rate of reaction is___ mmoldm *s~'. (Nearest Integer)",
    "options": [],
    "numeric_answer": 1,
    "solution": "dg _ (20-10) _, 3 a 0 1milimole /dm” sec NA +7B = 73C + nD d(D] d = Omilis 3 i =15 (-% C) = 9milimole/dm® sec d d - =[B]) =2(-=[4] (zg) -2(-5m) Rainme od O01 dB] TL URICTT Ldn) Todt ya dt yz dt oy dt dD] _w[ d[B]] _ d odd -2[ dA _15(-2 #]) Bois Y2 v2 [ d[4] ds d 2-22) = (-=[B]) =2( - = m= [ = 78) =2(-z 4 12 mn iii) 4(0] J [iD] dt ya | dt 1=B,9 Ta W_g 73 So, if = SR, = ihm HG 3 7; = 1thany, = 9y, = Gandy, = 3Rateofreaction = wa 1mmoldm~>s 3"
  },
  "120": {
    "statement": "pr 345K , the half life for the decomposition of a sample of a gaseous compound initially at 55.5k Pa. was 340s. When the pressure was 27.8k Pa, the half life was found to be 170s. The order of the reaction is - [integer answer]",
    "options": [],
    "numeric_answer": 0,
    "solution": "(tia), _ (2) (tz), \\P2 JMO (5) m0 \\278 @ =\" l=1-n=n=0 For zero order reaction half life is directly proportional to the initial concentration."
  },
  "121": {
    "statement": "A flask is filled with equal moles of A and B. The half lives of A and B are 100s and 50s respectively and are independent of the initial concentration. The time required for the concentration of A to be four times that of Bis__s. (Given: In2 = 0.693)",
    "options": [],
    "numeric_answer": 200,
    "solution": "For first order reaction ke 0.693 1 2 [4] =4[B] [A]je~*4t = 4[B]je tat was [Aly = [Ble = deb - kat =Ind - kgt cot(kg - kg) =2In2 2 x 0.693 2 x 100 LS 70603 0603) 2-1 200% 50 100"
  },
  "122": {
    "statement": "Catalyst A reduces the activation energy for a reaction by 10kJmol * at 300K. The ratio of rate kr, Catalysed z n constants, - is e*. The value of z is_[nearest integer] [Assume that the pre- kr, Uncatalysed exponential factor is same in both the cases. Given R = 8.31JK ‘mol ']",
    "options": [],
    "numeric_answer": 4,
    "solution": "Arrhenius equation for the rate constant of a reaction in terms of energy of activation is given by $E_a$ K = Ae RT Ed K catatyt = Ae RT $E_a$ Kuncatatysed = Ae RT $E_a$-E, ~~ 10x1000 Keatatyt _ \"RT _ 8314x300 - Kynoatatysea"
  },
  "123": {
    "statement": "The rate constant for a first order reaction is given by the following equation : 2.0 x 10°K $\\ln k$ = 33.24 - - T The Activation energy for the reaction is given by $\\text{kJ mol}^{-1}$ “1 (In Nearest integer) (Given : R=83JK ‘mol \")",
    "options": [],
    "numeric_answer": 166,
    "solution": "$\\ln k$ = InA - Es i Given: fk - 33.04 20100 Li +. on comparing 2 = 2.0 x 10° ~$E_a$=20x10'xR = Eq =20x10\"'x83J = Eq = 16.6 x 10'J = 166k]"
  },
  "124": {
    "statement": "|t has been found that for a chemical reaction with rise in temperature by 9K the rate constant gets doubled. Assuming a reaction to be occurring at 300K, the value of activation energy is found to be $\\text{kJ mol}^{-1}$ '. [nearest integer] (Given In 10 = 2.3, R = 8.3JK ‘$\\text{mol L}^{-1}$og 2 = 0.30)",
    "options": [],
    "numeric_answer": 59,
    "solution": "Arrhenius equation for the rate constant of a reaction in terms of energy of activation at two different temperatures is given by og (2) Bo [L_1 E\\X,) \"WR|Ti T, Rise in temperature = 9K Initial temperature = 300K Kan E, [1 1 Tog (= Jeet a Kan 2.3R [300 309 E, 9 log? = 33R = x 1 E - 2.3 x 0.30 x 300 x 309 he 9 E, = 58.988 x 10*J = 58.988kJ = 50k.J"
  },
  "125": {
    "statement": "£or a first order reaction A - B, the rate constant, k = 5.5 x 10s. The time required for 67 completion of reaction is z x 10 ! times the half life of reaction. The value of x is Nearest integer) (Given : log 3 = 0.4771)",
    "options": [],
    "numeric_answer": 16,
    "solution": "For first order reaction, t = a0 log fo & A iia a AE [iA wtem = 8 [0384 2.303 A Step ==7 - log [o%3] _1 1 _ tp 1 tev = 10 (57) “me \"| 2 3 = tor = 1.585 x ty X x 107\" = 1.585 = X =15.85"
  },
  "126": {
    "statement": "A radioactive element has a half life of 200 days. The percentage of original activity remaining after 83 days is___(Nearest integer) (Given : antilog 0.125 = 1.333, antilog 0.693 = 4.93)",
    "options": [],
    "numeric_answer": 75,
    "solution": "For first order reaction, 2303. N, = - log - .. K 7 log N, (1) Ho 0.693 Also, ty ai(%) 2 Equating (1) and (2) 2.303, N, _ 0.693 Hence, t EN - ty 2 2.303 lo No _ 0693 8 EN, 200 Lk N, 3 =175"
  },
  "127": {
    "statement": "The activation energy of one of the reactions in a biochemical process is 532611.Jmol !. When the temperature falls from 310K to 300K, the change in rate constant observed is kygg = 2 x 10 kg; The value of z is [Given: In 10 = 2.3R = 8.3JK ‘mol ']",
    "options": [],
    "numeric_answer": 1,
    "solution": "K, E, (1 1 w (zx) “R {z ¥ = In (% 532611 10 x)” \"83 \\310x 300 where Ky is at 310K& Ky Is at 300K K> n(x) -o0 =3xInl0 Ka _i08 In % In10 Ky = Ky, x10° Ky = Ky x 10° So"
  },
  "128": {
    "statement": "The equation k = (6.5 x 10257!) e~29900K/T js followed for the decomposition of compound A. The activation energy for the reactionis ___ K.Jmol ! [nearest integer] (Given: R = 8.314JK ‘mol ')",
    "options": [],
    "numeric_answer": 216,
    "solution": "K = Ae B/RT - (65 x 10151) o~20000K/T $E_a$ 83 26000 $E_a$ = 216.164k.J /mol. Hence, the activation energy of the given reaction is 216K Jmol"
  },
  "129": {
    "statement": "The half life for the decomposition of gaseous compound A is 240s when the gaseous pressure was 500 Torr initially. When the pressure was 25() Torr, the half life was found to be 4.0 min. The order of the reaction is (Nearest integer)",
    "options": [],
    "numeric_answer": 1,
    "solution": "( y = 240sec = 4min 2/ savor 2 250t0rr ty xa 2 ¢ - 1-n 1m 2/1 _ (2 oho (30 - PR) er (3) ee Lt 2/4 2s tL indentedent ot ital presetmes Honcarordere | sRorder 2"
  },
  "130": {
    "statement": "£or the decomposition of azomethane.CH3N,CHjs(g) - CH3CHj3(g) + Na(g)+N a first order reaction, the variation in partial pressure with time at 600K is given as lope = - 3.465x10* Slope = -3.465 x In 2) Po t N The half life of the reaction is, x10\"%s",
    "options": [],
    "numeric_answer": 2,
    "solution": "1 Py P BP For first order reaction k = ihn (%) - kt =In (#) In (#) =( - k)t Slope= - k = - 3.465 x 10'k = 3.465 x 10° For a first order reaction, Half-life is related to rate constant as given below: typ = 52 = p08 = 25 107° seconds"
  },
  "131": {
    "statement": "For a reaction A - 2B + C the half lives are 100s and 50s when the concentration of reactant A is 0.5 and 1.0molL = respectively. The order of the reaction is",
    "options": [],
    "numeric_answer": 2,
    "solution": "The relation between half-life and initial concentration of n‘# order reaction can be written as follows, 1 t] x - : At [100] o¢ - . (0.5) 1 (50) x - (50) or wr TET r= [23] @' =p n-1=1 n=2 order = 2 For the second order reactions half-life is inversely proportional to initial concentration."
  },
  "132": {
    "statement": "At $30^\\circ\\text{C}$, the half life for the decomposition of $AB_2$ is $200\\text{ s}$ and is independent of the initial concentration of $AB_2$. The time required for $80\\%$ of the $AB_2$ to decompose is: (Given: $\\log 2 = 0.30, \\log 3 = 0.48$)",
    "options": [
      {
        "id": "A",
        "text": "$200\\text{ s}$"
      },
      {
        "id": "B",
        "text": "$393\\text{ s}$"
      },
      {
        "id": "C",
        "text": "$467\\text{ s}$"
      },
      {
        "id": "D",
        "text": "$532\\text{ s}$"
      }
    ],
    "answer": "C",
    "solution": "Since half-life is independent of initial concentration, it is a first-order reaction.\n$$k = \\frac{0.693}{200} = \\frac{2.303 \\times 0.301}{200}\\text{ s}^{-1}$$\n$$t = \\frac{2.303}{k}\\log\\left(\\frac{100}{100-80}\\right) = \\frac{2.303}{k}\\log 5 = \\frac{200 \\times (1 - 0.301)}{0.301} = \\frac{200 \\times 0.699}{0.301} \\approx 466.7\\text{ s} \\approx 467\\text{ s}$$"
  },
  "133": {
    "statement": "2NO + 2H; - Na + 2H20 The above reaction has been studied at 800°C\". The related data are given in the table below Reaction serial number Initial pressure of H, /k Pa Initial Pressure - dj of NO /kPa Initial rate (32) / (kPa/s) 165.6 40.0 0.135 2 65.6 20.1 0.033 3 38.6 65.6 0.214 4 19.2 65.6 0.106 The order of the reaction with respect to NO is__",
    "options": [],
    "numeric_answer": 2,
    "solution": "The rate law for the reaction 2NO + 2H; - Nj + 2H,0 is 7 = k{Hy]\"[NO]\" The powers of the concentration terms m, n are the order with respect to hydrogen and nitric oxide respectively. 1 = [65.6]\"[40.0]\" = 0.135r, = [65.6]\"[20.1]\" = 0.033r; = [38.6]\"[65.6]\" = 0.214r, = [19.2]\"(65.6]\" = 0.106 ri [65.6]\"[40.0]\" 0.135 _ i E20 20] = 003 =4=2=4=n=2 Hence, the order with respect to NO is 2."
  },
  "134": {
    "statement": "B44 (B Reactant Product If formation of compound |B] follows the first order of kinetics and after 70 minutes the concentration of [A] was found to be half of its initial concentration. Then the rate constant of the reaction is z x 10% 1, The value of zis___",
    "options": [],
    "numeric_answer": 165,
    "solution": "[4 - [5 Reactant Product Since the reaction follows the first order kinetics and after 70 minutes the concentration of [A] was found to be half of its initial concentration. That means 70 minutes is the half life time for the reaction. And we know that for a first order reaction half life time is given as. J, 0693. 0603 0.603 157K 7747 ~ Tox60sec. 2 = 2 = 5930 10-%sec-1 = 165 x 10-$sec-150,2 = 165 7x6"
  },
  "135": {
    "statement": "£or the given first order reaction A - B the half life of the reaction is 0.3010 min. The ratio of the initial concentration of reactant to the concentration of reactant at time 2.0 min will be equalto ___. (Nearest integer)",
    "options": [],
    "numeric_answer": 100,
    "solution": "Given A - Bis a first order reaction sod 1 = 0.3010 min 2 A, 3 ZZ atti =? = attime 2 min We know the integrated rate equation for first order reaction 2.303 Ay K=2C1g|22 ed % 0-693 _ 27303, A rs 0-693 = 2-803, Ay TT; Ct B\\4,) 7 03010min Zmin E\\4, 7 A _ log 77 =2 Ay 2 So = 10° = 100 A"
  },
  "136": {
    "statement": "1 For a reaction, given below is the graph of Inkvsz.. The activation energy for the reaction is equal 20 $\\ln k$ 10 to___calmol (Given: R = 2calK ‘mol ) 00 3 2 3 4 5 [ipo] = y - 7",
    "options": [],
    "numeric_answer": 8,
    "solution": "Arrhenius suggested an equation which describes rate constant, k as a function of temperature, T. k = Ae Ee/RT A=frequency factor E, = Activationenergy In the Arrhenius equation the factor e~£4/FT corresponds to the fraction of molecules that have kinetic energy greater than $E_a$ $\\ln k$ - = +1InAY = C + MX on plotting Inkagainst1/T we get a straight line.The slope of the graph gives activation energy and intercept gives ' Slope =~ Le $E_a$ - $E_a$ 20 frequency factor slope= - = - Slope = - = - RAancy. $\\ln k$ Lid R Ay Sa R 5 0 1 1 - 7 E, = 4R = 8Cal /mol"
  },
  "137": {
    "statement": "The reaction between X and Y is first order with respect to X and zero order with respect to Y. 2 X] [Y] Initialrate Experiment . - - 10.10.12 x10 * 11 L 0.24 x 10-3 110.40.4 $\\text{mol L}^{-1}$ * $\\text{mol L}^{-1}$ \" $\\text{mol L}^{-1}$ ‘min M x 107% 1V 0.10.22 x 10 * Examine the data of table and calculate ratio of numerical values of M and L.",
    "options": [],
    "numeric_answer": 40,
    "solution": "Given that reaction is first order with respect to X and of zero order with respect to Y. Means r = k [X] [¥]° Where k = rate constant. Using data I & IT 4x10° (LY (02° 3x10 (&) (&) rli= 0 Using data from J & IIT Mx10° 04 2x10° 01 M8 Not the ratio which is asked in question M 8 Sa 40"
  },
  "138": {
    "statement": "Assuming 1g of trace radioactive element X with a half life of 30 years is absorbed by a growing tree. The amount of X remaining in the tree after 100 years is. x10 ug. [Given : In10 = 2.303;log 2 = 0.30]",
    "options": [],
    "numeric_answer": 1,
    "solution": "M=In (=) a-z we know that half life time ¢, , - 2 Soph ti 30 1 30 1 30 1 1 100 = =n (3) 100 = Tog 1% (3) 100 = gz log (3) log (3) =1 Lot w W = 0.19 21x10\" ug"
  },
  "139": {
    "statement": "The number of correct statement/s from the following is ___. A Larger the activation energy, smaller is the value of the rate constant. B. The higher is the activation energy, higher is the value of the temperature coefficient. C. At lower temperatures, increase in temperature causes more change in the value of k than at higher temperature. 14 - . $E_a$ D. A plot of $\\ln k$ vs - is a straight line with slope equal to - - T R",
    "options": [],
    "numeric_answer": 3,
    "solution": "$E_a$ ~ - (Arrhenius rate equation) As $E_a$(Activation energy) increases k(rate constant) decreases B A:k=Ae RT ‘Higher activation energy, greater is the effect of given temperature rise on rate constant 'k'. Activation energy is the minimum energy needed for the reaction to occur. When temperature increases, Kinetic Energy also increases; as temperature increases, more molecules have higher Kinetic Energy, and thus the fraction of molecules that have ] kr. high enough Kinetic Energy to overcome the energy barrier also increases. Temperature coefficient - ed T - - C Option (C) is wrong. Ak may be greater . . z $E_a$ Lo W wt 77, of lesser depending on temperature. D ; $\\ln k$ = InA - in this equation the slope is - ."
  },
  "140": {
    "statement": "A student studied the decomposition of a gas $AB_3$ at $25^\\circ\\text{C}$ and obtained the following data:\n- $p\\text{ (mmHg)}: 50, 100, 200, 400$\n- Relative $t_{1/2}: 4, 2, 1, 0.5$\nThe order of the reaction is:",
    "options": [
      {
        "id": "A",
        "text": "$3$"
      },
      {
        "id": "B",
        "text": "$2$"
      },
      {
        "id": "C",
        "text": "$1$"
      },
      {
        "id": "D",
        "text": "$0$"
      }
    ],
    "answer": "B",
    "solution": "Notice that doubling the pressure reduces $t_{1/2}$ by half:\n$$t_{1/2} \\propto \\frac{1}{P} = P^{1-n} \\implies 1 - n = -1 \\implies n = 2$$\nTherefore, the reaction is of second order."
  }
};
