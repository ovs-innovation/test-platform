export const allChemEqQuestions = [
  {
    question_number: 1,
    exam_name: "NEET",
    year: 2026,
    question_text: "Given below are certain reactions. Identify the reaction for which $K_p \\neq K_c$.",
    options: [
      "$\\text{H}_2\\text{O}(\\text{g}) + \\text{CO}(\\text{g}) \\rightleftharpoons \\text{H}_2(\\text{g}) + \\text{CO}_2(\\text{g})$",
      "$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g})$",
      "$\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g})$",
      "$\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g})$"
    ],
    correct_option: "B",
    solution_text: "The relationship between $K_p$ and $K_c$ is given by:\n$$K_p = K_c(RT)^{\\Delta n_g}$$\nwhere $\\Delta n_g = (\\text{moles of gaseous products}) - (\\text{moles of gaseous reactants})$.\n- For reaction (A): $\\Delta n_g = (1 + 1) - (1 + 1) = 0 \\implies K_p = K_c$\n- For reaction (B): $\\Delta n_g = 2 - (1 + 3) = -2 \\neq 0 \\implies K_p \\neq K_c$\n- For reaction (C): $\\Delta n_g = 2 - (1 + 1) = 0 \\implies K_p = K_c$\n- For reaction (D): $\\Delta n_g = 2 - (1 + 1) = 0 \\implies K_p = K_c$\nTherefore, for $\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g})$, $K_p \\neq K_c$."
  },
  {
    question_number: 2,
    exam_name: "NEET",
    year: 2025,
    question_text: "For the reaction $\\text{A}(\\text{g}) \\rightleftharpoons 2\\text{B}(\\text{g})$, the backward reaction rate constant is higher than the forward reaction rate constant by a factor of $2500$, at $1000\\text{ K}$.\n[Given : $R = 0.0831\\text{ L atm mol}^{-1}\\text{ K}^{-1}$]\n$K_p$ for the reaction at $1000\\text{ K}$ is",
    options: [
      "0.033",
      "0.021",
      "83.1",
      "2.077 x 10^5"
    ],
    correct_option: "A",
    solution_text: "Given that the backward rate constant $k_b$ is higher than the forward rate constant $k_f$ by a factor of $2500$:\n$$k_b = 2500 \\, k_f \\implies K_c = \\frac{k_f}{k_b} = \\frac{1}{2500} = 4 \\times 10^{-4}\\text{ mol L}^{-1}$$\nFor the reaction $\\text{A}(\\text{g}) \\rightleftharpoons 2\\text{B}(\\text{g})$:\n$$\\Delta n_g = 2 - 1 = 1$$\nThe relation between $K_p$ and $K_c$ is:\n$$K_p = K_c(RT)^{\\Delta n_g}$$\n$$K_p = (4 \\times 10^{-4}) \\times (0.0831 \\times 1000)^1 = 4 \\times 10^{-4} \\times 83.1 = 0.03324 \\approx 0.033$$"
  },
  {
    question_number: 3,
    exam_name: "NEET",
    year: 2025,
    question_text: "Higher yield of $\\text{NO}$ in $\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g})$ can be obtained at [$\\Delta H \\text{ of the reaction} = +180.7\\text{ kJ mol}^{-1}$]\nA. Higher temperature\nB. Lower temperature\nC. Higher concentration of $\\text{N}_2$\nD. Higher concentration of $\\text{O}_2$\nChoose the correct answer from the options given below :",
    options: [
      "B, C, D only",
      "A, C, D only",
      "A, D only",
      "B, C only"
    ],
    correct_option: "B",
    solution_text: "For the reaction:\n$$\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g}), \\quad \\Delta H = +180.7\\text{ kJ mol}^{-1}$$\nAccording to Le Chatelier's principle:\n1. The reaction is endothermic ($\\Delta H > 0$). An increase in temperature shifts the equilibrium in the forward direction (A).\n2. Increasing the concentration of reactants ($\\text{N}_2$ and $\\text{O}_2$) shifts the equilibrium in the forward direction, favoring the formation of $\\text{NO}$ (C and D).\nTherefore, a higher yield of $\\text{NO}$ is obtained at higher temperature, higher concentration of $\\text{N}_2$, and higher concentration of $\\text{O}_2$ (A, C, D only)."
  },
  {
    question_number: 4,
    exam_name: "NEET (Re-Examination)",
    year: 2024,
    question_text: "At a given temperature and pressure, the equilibrium constant values for the equilibria are given below:\n$$3\\text{A}_2 + \\text{B}_2 \\rightleftharpoons 2\\text{A}_3\\text{B}, \\quad K_1$$\n$$\\text{A}_3\\text{B} \\rightleftharpoons \\frac{3}{2}\\text{A}_2 + \\frac{1}{2}\\text{B}_2, \\quad K_2$$\nThe relation between $K_1$ and $K_2$ is :",
    options: [
      "$K_1^2 = 2 K_2$",
      "$K_2 = \\frac{K_1}{2}$",
      "$K_1 = \\frac{1}{\\sqrt{K_2}}$",
      "$K_2 = \\frac{1}{\\sqrt{K_1}}$"
    ],
    correct_option: "D",
    solution_text: "Given:\n$$3\\text{A}_2 + \\text{B}_2 \\rightleftharpoons 2\\text{A}_3\\text{B}, \\quad K_1 = \\frac{[\\text{A}_3\\text{B}]^2}{[\\text{A}_2]^3 [\\text{B}_2]}$$\nReversing this reaction gives:\n$$2\\text{A}_3\\text{B} \\rightleftharpoons 3\\text{A}_2 + \\text{B}_2, \\quad K' = \\frac{1}{K_1}$$\nDividing the stoichiometric coefficients by 2 (or multiplying by $1/2$):\n$$\\text{A}_3\\text{B} \\rightleftharpoons \\frac{3}{2}\\text{A}_2 + \\frac{1}{2}\\text{B}_2, \\quad K_2 = (K')^{1/2} = \\left(\\frac{1}{K_1}\\right)^{1/2} = \\frac{1}{\\sqrt{K_1}}$$"
  },
  {
    question_number: 5,
    exam_name: "NEET (Re-Examination)",
    year: 2024,
    question_text: "For the reaction in equilibrium\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g}), \\quad \\Delta H = -Q$$\nReaction is favoured in forward direction by:",
    options: [
      "use of catalyst",
      "decreasing concentration of $\\text{N}_2$",
      "low pressure, high temperature and high concentration of ammonia",
      "high pressure, low temperature and higher concentration of $\\text{H}_2$"
    ],
    correct_option: "D",
    solution_text: "For Haber's synthesis of ammonia:\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g}), \\quad \\Delta H = -Q < 0$$\n1. The reaction is exothermic ($\\Delta H < 0$). Low temperature favors the forward reaction.\n2. $\\Delta n_g = 2 - (1 + 3) = -2 < 0$. High pressure shifts the equilibrium towards fewer moles of gas, i.e., in the forward direction.\n3. Increasing the concentration of reactants (such as $\\text{H}_2$) shifts the equilibrium forward.\nThus, high pressure, low temperature, and higher concentration of $\\text{H}_2$ favor the forward direction."
  },
  {
    question_number: 6,
    exam_name: "NEET",
    year: 2024,
    question_text: "In which of the following equilibria, $K_p$ and $K_c$ are NOT equal?",
    options: [
      "$\\text{PCl}_5(\\text{g}) \\rightleftharpoons \\text{PCl}_3(\\text{g}) + \\text{Cl}_2(\\text{g})$",
      "$\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g})$",
      "$\\text{CO}(\\text{g}) + \\text{H}_2\\text{O}(\\text{g}) \\rightleftharpoons \\text{CO}_2(\\text{g}) + \\text{H}_2(\\text{g})$",
      "$2\\text{BrCl}(\\text{g}) \\rightleftharpoons \\text{Br}_2(\\text{g}) + \\text{Cl}_2(\\text{g})$"
    ],
    correct_option: "A",
    solution_text: "The relation between $K_p$ and $K_c$ is $K_p = K_c(RT)^{\\Delta n_g}$. When $\\Delta n_g = 0$, $K_p = K_c$.\n- In (A): $\\Delta n_g = (1 + 1) - 1 = 1 \\neq 0 \\implies K_p \\neq K_c$\n- In (B): $\\Delta n_g = 2 - (1 + 1) = 0 \\implies K_p = K_c$\n- In (C): $\\Delta n_g = (1 + 1) - (1 + 1) = 0 \\implies K_p = K_c$\n- In (D): $\\Delta n_g = (1 + 1) - 2 = 0 \\implies K_p = K_c$\nTherefore, in (A), $K_p$ and $K_c$ are not equal."
  },
  {
    question_number: 7,
    exam_name: "NEET",
    year: 2024,
    question_text: "For the reaction $2\\text{A} \\rightleftharpoons \\text{B} + \\text{C}$, $K_c = 4 \\times 10^{-3}$. At a given time, the composition of reaction mixture is: $[\\text{A}] = [\\text{B}] = [\\text{C}] = 2 \\times 10^{-3}\\text{ M}$. Then, which of the following is correct?",
    options: [
      "Reaction is at equilibrium.",
      "Reaction has a tendency to go in forward direction.",
      "Reaction has a tendency to go in backward direction.",
      "Reaction has gone to completion in forward direction."
    ],
    correct_option: "C",
    solution_text: "The reaction quotient ($Q_c$) is given by:\n$$Q_c = \\frac{[\\text{B}][\\text{C}]}{[\\text{A}]^2}$$\nSubstituting the given concentrations:\n$$Q_c = \\frac{(2 \\times 10^{-3})(2 \\times 10^{-3})}{(2 \\times 10^{-3})^2} = 1$$\nGiven $K_c = 4 \\times 10^{-3} = 0.004$.\nSince $Q_c > K_c$, the reaction is not at equilibrium and will proceed in the backward (reverse) direction to establish equilibrium."
  },
  {
    question_number: 8,
    exam_name: "NEET",
    year: 2024,
    question_text: "Consider the following reaction in a sealed vessel at equilibrium with concentrations of $\\text{N}_2 = 3.0 \\times 10^{-3}\\text{ M}$, $\\text{O}_2 = 4.2 \\times 10^{-3}\\text{ M}$ and $\\text{NO} = 2.8 \\times 10^{-3}\\text{ M}$.\n$$2\\text{NO}(\\text{g}) \\rightleftharpoons \\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g})$$\nIf $0.1\\text{ mol L}^{-1}$ of $\\text{NO}(\\text{g})$ is taken in a closed vessel, what will be degree of dissociation ($\\alpha$) of $\\text{NO}(\\text{g})$ at equilibrium?",
    options: [
      "0.00889",
      "0.0889",
      "0.8889",
      "0.717"
    ],
    correct_option: "D",
    solution_text: "First, determine $K_c$ from the initial equilibrium concentrations:\n$$K_c = \\frac{[\\text{N}_2][\\text{O}_2]}{[\\text{NO}]^2} = \\frac{(3.0 \\times 10^{-3})(4.2 \\times 10^{-3})}{(2.8 \\times 10^{-3})^2} = \\frac{12.6 \\times 10^{-6}}{7.84 \\times 10^{-6}} = 1.607$$\nNow, for $2\\text{NO}(\\text{g}) \\rightleftharpoons \\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g})$ starting with $[\text{NO}]_0 = C = 0.1\\text{ M}$:\nAt equilibrium:\n$$[\\text{NO}] = C(1 - \\alpha)$$\n$$[\\text{N}_2] = \\frac{C\\alpha}{2}, \\quad [\\text{O}_2] = \\frac{C\\alpha}{2}$$\n$$K_c = \\frac{(\\frac{C\\alpha}{2})(\\frac{C\\alpha}{2})}{[C(1 - \\alpha)]^2} = \\frac{\\alpha^2}{4(1 - \\alpha)^2} = 1.607$$\nTaking square root on both sides:\n$$\\frac{\\alpha}{2(1 - \\alpha)} = \\sqrt{1.607} = 1.2677$$\n$$\\alpha = 2.5354(1 - \\alpha) = 2.5354 - 2.5354\\alpha$$\n$$3.5354\\alpha = 2.5354 \\implies \\alpha = \\frac{2.5354}{3.5354} \\approx 0.717$$"
  },
  {
    question_number: 9,
    exam_name: "NEET Phase 2",
    year: 2022,
    question_text: "$K_p$ for the following reaction is $3.0$ at $1000\\text{ K}$.\n$$\\text{CO}_2(\\text{g}) + \\text{C}(\\text{s}) \\rightleftharpoons 2\\text{CO}(\\text{g})$$\nWhat will be the value of $K_c$ for the reaction at the same temperature?\n(Given : $R = 0.083\\text{ L bar K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "3.6",
      "0.36",
      "$3.6 \\times 10^{-2}$",
      "$3.6 \\times 10^{-3}$"
    ],
    correct_option: "C",
    solution_text: "For the reaction:\n$$\\text{CO}_2(\\text{g}) + \\text{C}(\\text{s}) \\rightleftharpoons 2\\text{CO}(\\text{g})$$\nCarbon is a pure solid, so only gaseous species count towards $\\Delta n_g$:\n$$\\Delta n_g = 2 - 1 = 1$$\nThe relation between $K_p$ and $K_c$ is:\n$$K_p = K_c(RT)^{\\Delta n_g} \\implies K_c = \\frac{K_p}{(RT)^{\\Delta n_g}}$$\n$$K_c = \\frac{3.0}{(0.083 \\times 1000)^1} = \\frac{3.0}{83} = 0.03614 \\approx 3.6 \\times 10^{-2}$$"
  },
  {
    question_number: 10,
    exam_name: "NEET Phase 1",
    year: 2022,
    question_text: "$$3\\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{O}_3(\\text{g})$$\nfor the above reaction at $298\\text{ K}$, $K_c$ is found to be $3.0 \\times 10^{-59}$. If the concentration of $\\text{O}_2$ at equilibrium is $0.040\\text{ M}$ then concentration of $\\text{O}_3$ in $\\text{M}$ is",
    options: [
      "$4.38 \\times 10^{-32}$",
      "$1.9 \\times 10^{-63}$",
      "$2.4 \\times 10^{31}$",
      "$1.2 \\times 10^{21}$"
    ],
    correct_option: "A",
    solution_text: "For the equilibrium $3\\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{O}_3(\\text{g})$:\n$$K_c = \\frac{[\\text{O}_3]^2}{[\\text{O}_2]^3}$$\n$$[\\text{O}_3]^2 = K_c \\cdot [\\text{O}_2]^3$$\nGiven $K_c = 3.0 \\times 10^{-59}$ and $[\\text{O}_2] = 0.040\\text{ M} = 4.0 \\times 10^{-2}\\text{ M}$:\n$$[\\text{O}_3]^2 = (3.0 \\times 10^{-59}) \\times (4.0 \\times 10^{-2})^3 = (3.0 \\times 10^{-59}) \\times (64 \\times 10^{-6}) = 192 \\times 10^{-65} = 19.2 \\times 10^{-64}$$\n$$[\\text{O}_3] = \\sqrt{19.2 \\times 10^{-64}} \\approx 4.38 \\times 10^{-32}\\text{ M}$$"
  },
  {
    question_number: 11,
    exam_name: "NEET",
    year: 2018,
    question_text: "Which one of the following conditions will favour maximum formation of the product in the reaction\n$$\\text{A}_2(\\text{g}) + \\text{B}_2(\\text{g}) \\rightleftharpoons \\text{X}_2(\\text{g}), \\quad \\Delta_r H = -X\\text{ kJ} \\; ?$$",
    options: [
      "Low temperature and high pressure",
      "Low temperature and low pressure",
      "High temperature and high pressure",
      "High temperature and low pressure"
    ],
    correct_option: "A",
    solution_text: "For the reaction:\n$$\\text{A}_2(\\text{g}) + \\text{B}_2(\\text{g}) \\rightleftharpoons \\text{X}_2(\\text{g}), \\quad \\Delta_r H = -X\\text{ kJ}$$\n1. $\\Delta_r H < 0$ (exothermic reaction). By Le Chatelier's principle, lowering the temperature favors the exothermic forward reaction.\n2. $\\Delta n_g = 1 - (1 + 1) = -1 < 0$ (moles of gaseous products are fewer than reactants). Increasing pressure shifts the equilibrium in the direction of fewer moles of gas, i.e., in the forward direction.\nTherefore, low temperature and high pressure will favor maximum formation of product."
  },
  {
    question_number: 12,
    exam_name: "NEET",
    year: 2017,
    question_text: "The equilibrium constants of the following are\n$$\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3; \\quad K_1$$\n$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO}; \\quad K_2$$\n$$\\text{H}_2 + \\frac{1}{2}\\text{O}_2 \\rightleftharpoons \\text{H}_2\\text{O}; \\quad K_3$$\nThe equilibrium constant ($K$) of the reaction :\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O} \\quad \\text{will be}$$",
    options: [
      "$K_2 K_3^3 / K_1$",
      "$K_2 K_3 / K_1$",
      "$K_2^3 K_3 / K_1$",
      "$K_1 K_3^3 / K_2$"
    ],
    correct_option: "A",
    solution_text: "Target reaction:\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O}$$\nWe can obtain the target reaction by combining the given equations:\n1. Reversing reaction 1:\n$$2\\text{NH}_3 \\rightleftharpoons \\text{N}_2 + 3\\text{H}_2, \\quad K'_1 = \\frac{1}{K_1}$$\n2. Taking reaction 2 as it is:\n$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO}, \\quad K_2$$\n3. Multiplying reaction 3 by 3:\n$$3\\text{H}_2 + \\frac{3}{2}\\text{O}_2 \\rightleftharpoons 3\\text{H}_2\\text{O}, \\quad K'_3 = K_3^3$$\nAdding these three reactions:\n$$2\\text{NH}_3 + \\left(\\text{O}_2 + \\frac{3}{2}\\text{O}_2\\right) \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O}$$\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O}$$\nThe overall equilibrium constant is the product of individual constants:\n$$K = K'_1 \\times K_2 \\times K'_3 = \\frac{1}{K_1} \\times K_2 \\times K_3^3 = \\frac{K_2 K_3^3}{K_1}$$"
  },
  {
    question_number: 13,
    exam_name: "NEET",
    year: 2017,
    question_text: "A $20\\text{ litre}$ container at $400\\text{ K}$ contains $\\text{CO}_2(\\text{g})$ at pressure $0.4\\text{ atm}$ and an excess of $\\text{SrO}$ (neglect the volume of solid $\\text{SrO}$). The volume of the container is now decreased by moving the movable piston fitted in the container. The maximum volume of the container, when pressure of $\\text{CO}_2$ attains its maximum value, will be\n(Given that : $\\text{SrCO}_3(\\text{s}) \\rightleftharpoons \\text{SrO}(\\text{s}) + \\text{CO}_2(\\text{g}), \\; K_p = 1.6\\text{ atm}$)",
    options: [
      "10 litre",
      "4 litre",
      "2 litre",
      "5 litre"
    ],
    correct_option: "D",
    solution_text: "For the heterogeneous equilibrium:\n$$\\text{SrCO}_3(\\text{s}) \\rightleftharpoons \\text{SrO}(\\text{s}) + \\text{CO}_2(\\text{g})$$\n$$K_p = P_{\\text{CO}_2} = 1.6\\text{ atm}$$\nThe maximum pressure that $\\text{CO}_2$ gas can exert at this temperature is $1.6\\text{ atm}$.\nBefore decomposition begins or solid $\\text{SrCO}_3$ precipitates, $\\text{CO}_2$ behaves as an ideal gas at constant temperature:\n$$P_1 V_1 = P_2 V_2$$\nGiven $P_1 = 0.4\\text{ atm}$, $V_1 = 20\\text{ L}$, and maximum pressure $P_2 = 1.6\\text{ atm}$:\n$$0.4 \\times 20 = 1.6 \\times V_2$$\n$$8 = 1.6 V_2 \\implies V_2 = \\frac{8}{1.6} = 5\\text{ L}$$\nThus, the maximum volume at which the pressure of $\\text{CO}_2$ reaches its maximum value ($1.6\\text{ atm}$) is $5\\text{ L}$."
  },
  {
    question_number: 14,
    exam_name: "NEET Phase 1",
    year: 2016,
    question_text: "Consider the following liquid-vapour equilibrium.\n$$\\text{Liquid} \\rightleftharpoons \\text{Vapour}$$\nWhich of the following relations is correct ?",
    options: [
      "$\\frac{d\\ln P}{dT^2} = \\frac{-\\Delta H_v}{T^2}$",
      "$\\frac{d\\ln P}{dT} = \\frac{\\Delta H_v}{RT^2}$",
      "$\\frac{d\\ln G}{dT^2} = \\frac{\\Delta H_v}{RT^2}$",
      "$\\frac{d\\ln P}{dT} = \\frac{-\\Delta H_v}{RT}$"
    ],
    correct_option: "B",
    solution_text: "The Clausius-Clapeyron equation describes the temperature dependence of vapour pressure in liquid-vapour equilibrium:\n$$\\frac{d\\ln P}{dT} = \\frac{\\Delta H_v}{RT^2}$$\nwhere $\\Delta H_v$ is the enthalpy of vaporization and $R$ is the universal gas constant."
  },
  {
    question_number: 15,
    exam_name: "AIPMT",
    year: 2015,
    question_text: "If the equilibrium constant for\n$$\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g})$$\nis $K$, the equilibrium constant for\n$$\\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightleftharpoons \\text{NO}(\\text{g})$$\nwill be",
    options: [
      "$\\frac{1}{2} K$",
      "$K$",
      "$K^2$",
      "$K^{1/2}$"
    ],
    correct_option: "D",
    solution_text: "For the reaction:\n$$\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g}), \\quad K = \\frac{[\\text{NO}]^2}{[\\text{N}_2][\\text{O}_2]}$$\nWhen a chemical equation is multiplied by a factor $n$, the new equilibrium constant becomes $K' = K^n$.\nHere, the reaction is multiplied by $n = 1/2$:\n$$\\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightleftharpoons \\text{NO}(\\text{g}), \\quad K' = \\frac{[\\text{NO}]}{[\\text{N}_2]^{1/2} [\\text{O}_2]^{1/2}} = K^{1/2}$$"
  },
  {
    question_number: 16,
    exam_name: "AIPMT Cancelled Paper",
    year: 2015,
    question_text: "Which of the following statements is correct for a reversible process in a state of equilibrium?",
    options: [
      "$\\Delta G^\\circ = -2.30 RT \\log K$",
      "$\\Delta G^\\circ = 2.30 RT \\log K$",
      "$\\Delta G = -2.30 RT \\log K$",
      "$\\Delta G = 2.30 RT \\log K$"
    ],
    correct_option: "A",
    solution_text: "The thermodynamic criterion for equilibrium in a reversible process is $\\Delta G = 0$.\nThe relation between Gibbs free energy and reaction quotient is:\n$$\\Delta G = \\Delta G^\\circ + RT \\ln Q$$\nAt equilibrium, $\\Delta G = 0$ and $Q = K$:\n$$0 = \\Delta G^\\circ + RT \\ln K \\implies \\Delta G^\\circ = -RT \\ln K = -2.303 RT \\log K$$"
  },
  {
    question_number: 17,
    exam_name: "AIPMT Cancelled Paper",
    year: 2015,
    question_text: "If the value of equilibrium constant for a particular reaction is $1.6 \\times 10^{12}$, then at equilibrium the system will contain",
    options: [
      "mostly products",
      "similar amounts of reactants and products",
      "all reactants",
      "mostly reactants."
    ],
    correct_option: "A",
    solution_text: "The magnitude of the equilibrium constant indicates the extent of a reaction:\n- If $K > 10^3$, products predominate over reactants substantially. If $K$ is very large (e.g., $1.6 \\times 10^{12}$), the reaction proceeds almost to completion.\nTherefore, at equilibrium, the system will contain mostly products."
  },
  {
    question_number: 18,
    exam_name: "AIPMT",
    year: 2014,
    question_text: "For the reversible reaction,\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g}) + \\text{heat}$$\nThe equilibrium shifts in forward direction",
    options: [
      "by increasing the concentration of $\\text{NH}_3(\\text{g})$",
      "by decreasing the pressure",
      "by decreasing the concentrations of $\\text{N}_2(\\text{g})$ and $\\text{H}_2(\\text{g})$",
      "by increasing pressure and decreasing temperature."
    ],
    correct_option: "D",
    solution_text: "According to Le Chatelier's principle for the equilibrium:\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g}) + \\text{heat}$$\n1. The reaction is exothermic (releases heat). Decreasing temperature favors the forward reaction.\n2. The reaction proceeds with a decrease in the number of gaseous moles ($4 \\rightarrow 2$). Increasing pressure shifts the equilibrium towards fewer moles, i.e., in the forward direction.\nTherefore, increasing pressure and decreasing temperature shifts the equilibrium in the forward direction."
  },
  {
    question_number: 19,
    exam_name: "AIPMT",
    year: 2014,
    question_text: "For a given exothermic reaction, $K_p$ and $K'_p$ are the equilibrium constants at temperatures $T_1$ and $T_2$ ($T_2 > T_1$), respectively. Assuming that heat of reaction is constant in temperature range between $T_1$ and $T_2$, it is readily observed that",
    options: [
      "$K_p > K'_p$",
      "$K_p < K'_p$",
      "$K_p = K'_p$",
      "$K_p = \\frac{1}{K'_p}$"
    ],
    correct_option: "A",
    solution_text: "From the van 't Hoff equation:\n$$\\log\\left(\\frac{K'_p}{K_p}\\right) = \\frac{\\Delta H}{2.303 R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right)$$\nFor an exothermic reaction, $\\Delta H < 0$.\nSince $T_2 > T_1$, $\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right) > 0$.\nTherefore, $\\log\\left(\\frac{K'_p}{K_p}\\right) < 0 \\implies \\frac{K'_p}{K_p} < 1 \\implies K'_p < K_p$, or $K_p > K'_p$."
  },
  {
    question_number: 20,
    exam_name: "AIPMT Mains",
    year: 2012,
    question_text: "Given that the equilibrium constant for the reaction,\n$$2\\text{SO}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{SO}_3(\\text{g})$$\nhas a value of $278$ at a particular temperature. What is the value of the equilibrium constant for the following reaction at the same temperature ?\n$$\\text{SO}_3(\\text{g}) \\rightleftharpoons \\text{SO}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g})$$",
    options: [
      "$1.8 \\times 10^{-3}$",
      "$3.6 \\times 10^{-3}$",
      "$6.0 \\times 10^{-2}$",
      "$1.3 \\times 10^{-5}$"
    ],
    correct_option: "C",
    solution_text: "Given reaction:\n$$2\\text{SO}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{SO}_3(\\text{g}), \\quad K = 278$$\nTarget reaction:\n$$\\text{SO}_3(\\text{g}) \\rightleftharpoons \\text{SO}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g})$$\nThe target reaction is obtained by reversing the given reaction and multiplying by $1/2$:\n$$K' = \\left(\\frac{1}{K}\\right)^{1/2} = \\frac{1}{\\sqrt{278}} = \\frac{1}{16.673} \\approx 0.05997 \\approx 6.0 \\times 10^{-2}$$"
  },
  {
    question_number: 21,
    exam_name: "AIPMT Mains",
    year: 2012,
    question_text: "Given the reaction between 2 gases represented by $\\text{A}_2$ and $\\text{B}_2$ to give the compound $\\text{AB}(\\text{g})$,\n$$\\text{A}_2(\\text{g}) + \\text{B}_2(\\text{g}) \\rightleftharpoons 2\\text{AB}(\\text{g})$$\nAt equilibrium, the concentration of\n$\\text{A}_2 = 3.0 \\times 10^{-3}\\text{ M}$, of $\\text{B}_2 = 4.2 \\times 10^{-3}\\text{ M}$, of $\\text{AB} = 2.8 \\times 10^{-3}\\text{ M}$\nIf the reaction takes place in a sealed vessel at $527^\\circ\\text{C}$, then the value of $K_c$ will be",
    options: [
      "2.0",
      "1.9",
      "0.62",
      "4.5"
    ],
    correct_option: "C",
    solution_text: "For the reaction:\n$$\\text{A}_2(\\text{g}) + \\text{B}_2(\\text{g}) \\rightleftharpoons 2\\text{AB}(\\text{g})$$\n$$K_c = \\frac{[\\text{AB}]^2}{[\\text{A}_2][\\text{B}_2]}$$\nSubstituting the given equilibrium concentrations:\n$$K_c = \\frac{(2.8 \\times 10^{-3})^2}{(3.0 \\times 10^{-3})(4.2 \\times 10^{-3})} = \\frac{7.84 \\times 10^{-6}}{12.6 \\times 10^{-6}} = \\frac{7.84}{12.6} \\approx 0.622$$"
  },
  {
    question_number: 22,
    exam_name: "AIPMT Prelims",
    year: 2011,
    question_text: "The value of $\\Delta H$ for the reaction\n$$\\text{X}_2(\\text{g}) + 4\\text{Y}_2(\\text{g}) \\rightleftharpoons 2\\text{XY}_4(\\text{g})$$\nis less than zero. Formation of $\\text{XY}_4(\\text{g})$ will be favoured at",
    options: [
      "high temperature and high pressure",
      "low pressure and low temperature",
      "high temperature and low pressure",
      "high pressure and low temperature"
    ],
    correct_option: "D",
    solution_text: "Given $\\Delta H < 0$ (exothermic reaction) and:\n$$\\Delta n_g = 2 - (1 + 4) = -3 < 0$$\nBy Le Chatelier's principle:\n- Because the forward reaction is exothermic, it is favored by low temperature.\n- Because the forward reaction results in a decrease in the number of gaseous moles ($5 \\rightarrow 2$), it is favored by high pressure.\nTherefore, formation of $\\text{XY}_4(\\text{g})$ is favoured at high pressure and low temperature."
  },
  {
    question_number: 23,
    exam_name: "AIPMT Prelims",
    year: 2011,
    question_text: "For the reaction, $\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g})$, the equilibrium constant is $K_1$. The equilibrium constant is $K_2$ for the reaction,\n$$2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}_2(\\text{g})$$\nWhat is $K$ for the reaction,\n$$\\text{NO}_2(\\text{g}) \\rightleftharpoons \\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g})$$",
    options: [
      "$\\frac{1}{2 K_1 K_2}$",
      "$\\frac{1}{4 K_1 K_2}$",
      "$\\left[\\frac{1}{K_1 K_2}\\right]^{1/2}$",
      "$\\frac{1}{K_1 K_2}$"
    ],
    correct_option: "C",
    solution_text: "Adding reaction 1 and reaction 2:\n1. $\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO} \\quad (K_1)$\n2. $2\\text{NO} + \\text{O}_2 \\rightleftharpoons 2\\text{NO}_2 \\quad (K_2)$\nNet reaction:\n$$\\text{N}_2 + 2\\text{O}_2 \\rightleftharpoons 2\\text{NO}_2, \\quad K_3 = K_1 K_2$$\nReversing and dividing by 2:\n$$\\text{NO}_2(\\text{g}) \\rightleftharpoons \\frac{1}{2}\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g})$$\n$$K = \\left(\\frac{1}{K_3}\\right)^{1/2} = \\left[\\frac{1}{K_1 K_2}\\right]^{1/2}$$"
  },
  {
    question_number: 24,
    exam_name: "AIPMT Mains",
    year: 2010,
    question_text: "The reaction,\n$$2\\text{A}(\\text{g}) + \\text{B}(\\text{g}) \\rightleftharpoons 3\\text{C}(\\text{g}) + \\text{D}(\\text{g})$$\nis begun with the concentrations of $\\text{A}$ and $\\text{B}$ both at an initial value of $1.00\\text{ M}$. When equilibrium is reached, the concentration of $\\text{D}$ is measured and found to be $0.25\\text{ M}$. The value for the equilibrium constant for this reaction is given by the expression",
    options: [
      "$[(0.75)^3 (0.25)] \\div [(1.00)^2 (1.00)]$",
      "$[(0.75)^3 (0.25)] \\div [(0.50)^2 (0.75)]$",
      "$[(0.75)^3 (0.25)] \\div [(0.50)^2 (0.25)]$",
      "$[(0.75)^3 (0.25)] \\div [(0.75)^2 (0.25)]$"
    ],
    correct_option: "B",
    solution_text: "Set up the ICE table:\n$$\\begin{array}{lcccc}\n& 2\\text{A}(\\text{g}) & + & \\text{B}(\\text{g}) & \\rightleftharpoons & 3\\text{C}(\\text{g}) & + & \\text{D}(\\text{g}) \\\\\n\\text{Initial (M)} & 1.00 & & 1.00 & & 0 & & 0 \\\\\n\\text{Change (M)} & -2x & & -x & & +3x & & +x \\\\\n\\text{Equilibrium (M)} & 1.00 - 2x & & 1.00 - x & & 3x & & x\n\\end{array}$$\nGiven $[\\text{D}] = x = 0.25\\text{ M}$:\n$$[\\text{A}] = 1.00 - 2(0.25) = 0.50\\text{ M}$$\n$$[\\text{B}] = 1.00 - 0.25 = 0.75\\text{ M}$$\n$$[\\text{C}] = 3(0.25) = 0.75\\text{ M}$$\n$$[\\text{D}] = 0.25\\text{ M}$$\n$$K_c = \\frac{[\\text{C}]^3 [\\text{D}]}{[\\text{A}]^2 [\\text{B}]} = \\frac{[(0.75)^3 (0.25)]}{[(0.50)^2 (0.75)]}$$"
  },
  {
    question_number: 25,
    exam_name: "AIPMT Prelims",
    year: 2010,
    question_text: "In which of the following equilibrium $K_c$ and $K_p$ are not equal?",
    options: [
      "$2\\text{NO}(\\text{g}) \\rightleftharpoons \\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g})$",
      "$\\text{SO}_2(\\text{g}) + \\text{NO}_2(\\text{g}) \\rightleftharpoons \\text{SO}_3(\\text{g}) + \\text{NO}(\\text{g})$",
      "$\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g})$",
      "$2\\text{C}(\\text{s}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{CO}_2(\\text{g})$"
    ],
    correct_option: "D",
    solution_text: "$K_p = K_c(RT)^{\\Delta n_g}$. $K_p = K_c$ only when $\\Delta n_g = 0$.\n- In (A): $\\Delta n_g = 2 - 2 = 0 \\implies K_p = K_c$\n- In (B): $\\Delta n_g = 2 - 2 = 0 \\implies K_p = K_c$\n- In (C): $\\Delta n_g = 2 - 2 = 0 \\implies K_p = K_c$\n- In (D): Carbon is solid, so $\\Delta n_g = 2 - 1 = 1 \\neq 0 \\implies K_p \\neq K_c$.\nThus, in reaction (D), $K_c$ and $K_p$ are not equal."
  },
  {
    question_number: 26,
    exam_name: "AIPMT",
    year: 2009,
    question_text: "The dissociation constants for acetic acid and $\\text{HCN}$ at $25^\\circ\\text{C}$ are $1.5 \\times 10^{-5}$ and $4.5 \\times 10^{-10}$ respectively. The equilibrium constant for the equilibrium\n$$\\text{CN}^- + \\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{HCN} + \\text{CH}_3\\text{COO}^-$$\nwould be",
    options: [
      "$3.0 \\times 10^{-5}$",
      "$3.0 \\times 10^{-4}$",
      "$3.0 \\times 10^4$",
      "$3.0 \\times 10^5$"
    ],
    correct_option: "C",
    solution_text: "For the equilibrium:\n$$\\text{CN}^- + \\text{CH}_3\\text{COOH} \\rightleftharpoons \\text{HCN} + \\text{CH}_3\\text{COO}^-$$\n$$K = \\frac{[\\text{HCN}][\\text{CH}_3\\text{COO}^-]}{[\\text{CN}^-][\\text{CH}_3\\text{COOH}]}$$\nMultiplying and dividing by $[\\text{H}^+]$:\n$$K = \\frac{[\\text{H}^+][\\text{CH}_3\\text{COO}^-]}{[\\text{CH}_3\\text{COOH}]} \\times \\frac{[\\text{HCN}]}{[\\text{H}^+][\\text{CN}^-]} = \\frac{K_a(\\text{CH}_3\\text{COOH})}{K_a(\\text{HCN})}$$\n$$K = \\frac{1.5 \\times 10^{-5}}{4.5 \\times 10^{-10}} = \\frac{1}{3} \\times 10^5 = 0.333 \\times 10^5 = 3.33 \\times 10^4 \\approx 3.0 \\times 10^4$$"
  },
  {
    question_number: 27,
    exam_name: "AIPMT",
    year: 2008,
    question_text: "The dissociation equilibrium of a gas $\\text{AB}_2$ can be represented as :\n$$2\\text{AB}_2(\\text{g}) \\rightleftharpoons 2\\text{AB}(\\text{g}) + \\text{B}_2(\\text{g})$$\nThe degree of dissociation is $x$ and is small compared to 1. The expression relating the degree of dissociation ($x$) with equilibrium constant $K_p$ and total pressure $P$ is",
    options: [
      "$(2K_p/P)^{1/2}$",
      "$(K_p/P)$",
      "$(2K_p/P)$",
      "$(2K_p/P)^{1/3}$"
    ],
    correct_option: "D",
    solution_text: "For the dissociation:\n$$2\\text{AB}_2(\\text{g}) \\rightleftharpoons 2\\text{AB}(\\text{g}) + \\text{B}_2(\\text{g})$$\nInitial moles: $1, 0, 0$\nAt equilibrium: $1 - x, x, \\frac{x}{2}$\nTotal moles at equilibrium $= 1 - x + x + \\frac{x}{2} = 1 + \\frac{x}{2} \\approx 1$ (since $x \\ll 1$).\nPartial pressures:\n$$p_{\\text{AB}_2} = \\frac{1 - x}{1} P \\approx P$$\n$$p_{\\text{AB}} = \\frac{x}{1} P = xP$$\n$$p_{\\text{B}_2} = \\frac{x/2}{1} P = \\frac{xP}{2}$$\n$$K_p = \\frac{p_{\\text{AB}}^2 \\cdot p_{\\text{B}_2}}{p_{\\text{AB}_2}^2} = \\frac{(xP)^2 \\cdot (xP/2)}{P^2} = \\frac{x^3 P^3}{2P^2} = \\frac{x^3 P}{2}$$\n$$x^3 = \\frac{2K_p}{P} \\implies x = \\left(\\frac{2K_p}{P}\\right)^{1/3}$$"
  },
  {
    question_number: 28,
    exam_name: "AIPMT",
    year: 2008,
    question_text: "The value of equilibrium constant of the reaction\n$$\\text{HI}(\\text{g}) \\rightleftharpoons \\frac{1}{2}\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{I}_2(\\text{g})$$\nis $8.0$. The equilibrium constant of the reaction\n$$\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g})$$\nwill be",
    options: [
      "16",
      "1/8",
      "1/16",
      "1/64"
    ],
    correct_option: "D",
    solution_text: "Given:\n$$\\text{HI}(\\text{g}) \\rightleftharpoons \\frac{1}{2}\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{I}_2(\\text{g}), \\quad K = 8.0$$\nReversing the reaction:\n$$\\frac{1}{2}\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{I}_2(\\text{g}) \\rightleftharpoons \\text{HI}(\\text{g}), \\quad K' = \\frac{1}{K} = \\frac{1}{8.0}$$\nMultiplying the entire equation by 2:\n$$\\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g}) \\rightleftharpoons 2\\text{HI}(\\text{g}), \\quad K'' = (K')^2 = \\left(\\frac{1}{8.0}\\right)^2 = \\frac{1}{64}$$"
  },
  {
    question_number: 29,
    exam_name: "AIPMT",
    year: 2008,
    question_text: "The values of $K_p$ for the reactions,\n$$\\text{X} \\rightleftharpoons \\text{Y} + \\text{Z} \\quad \\dots (\\text{i})$$\n$$\\text{A} \\rightleftharpoons 2\\text{B} \\quad \\dots (\\text{ii})$$\nare in the ratio $9 : 1$. If degree of dissociation of $\\text{X}$ and $\\text{A}$ be equal, then total pressure at equilibrium (i) and (ii) are in the ratio",
    options: [
      "36 : 1",
      "1 : 1",
      "3 : 1",
      "1 : 9"
    ],
    correct_option: "A",
    solution_text: "1. For $\\text{X} \\rightleftharpoons \\text{Y} + \\text{Z}$:\nInitial moles: $1, 0, 0$. At equilibrium: $1-\\alpha, \\alpha, \\alpha$.\nTotal moles $= 1 + \\alpha$.\n$$K_{p1} = \\frac{p_Y p_Z}{p_X} = \\frac{(\\frac{\\alpha}{1+\\alpha} P_1)(\\frac{\\alpha}{1+\\alpha} P_1)}{\\frac{1-\\alpha}{1+\\alpha} P_1} = \\frac{\\alpha^2 P_1}{1 - \\alpha^2}$$\n\n2. For $\\text{A} \\rightleftharpoons 2\\text{B}$:\nInitial moles: $1, 0$. At equilibrium: $1-\\alpha, 2\\alpha$.\nTotal moles $= 1 + \\alpha$.\n$$K_{p2} = \\frac{p_B^2}{p_A} = \\frac{(\\frac{2\\alpha}{1+\\alpha} P_2)^2}{\\frac{1-\\alpha}{1+\\alpha} P_2} = \\frac{4\\alpha^2 P_2}{1 - \\alpha^2}$$\n\nTaking the ratio:\n$$\\frac{K_{p1}}{K_{p2}} = \\frac{\\frac{\\alpha^2 P_1}{1 - \\alpha^2}}{\\frac{4\\alpha^2 P_2}{1 - \\alpha^2}} = \\frac{P_1}{4P_2}$$\nGiven $\\frac{K_{p1}}{K_{p2}} = \\frac{9}{1}$:\n$$\\frac{P_1}{4P_2} = 9 \\implies \\frac{P_1}{P_2} = 36 : 1$$"
  },
  {
    question_number: 30,
    exam_name: "AIPMT",
    year: 2007,
    question_text: "The equilibrium constants of the following are\n$$\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3; \\quad K_1$$\n$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO}; \\quad K_2$$\n$$\\text{H}_2 + \\frac{1}{2}\\text{O}_2 \\rightleftharpoons \\text{H}_2\\text{O}; \\quad K_3$$\nThe equilibrium constant ($K$) of the reaction :\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O} \\quad \\text{will be}$$",
    options: [
      "$K_2 K_3^3 / K_1$",
      "$K_2 K_3 / K_1$",
      "$K_2^3 K_3 / K_1$",
      "$K_1 K_3^3 / K_2$"
    ],
    correct_option: "A",
    solution_text: "Target reaction:\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O}$$\nObtained by:\n- Reversing Reaction 1: $2\\text{NH}_3 \\rightleftharpoons \\text{N}_2 + 3\\text{H}_2$ ($K'_1 = 1/K_1$)\n- Keeping Reaction 2: $\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO}$ ($K_2$)\n- Multiplying Reaction 3 by 3: $3\\text{H}_2 + \\frac{3}{2}\\text{O}_2 \\rightleftharpoons 3\\text{H}_2\\text{O}$ ($K'_3 = K_3^3$)\nSumming all three yields the target reaction:\n$$K = K'_1 \\times K_2 \\times K'_3 = \\frac{K_2 K_3^3}{K_1}$$"
  },
  {
    question_number: 31,
    exam_name: "AIPMT",
    year: 2006,
    question_text: "For the reaction :\n$$\\text{CH}_4(\\text{g}) + 2\\text{O}_2(\\text{g}) \\rightleftharpoons \\text{CO}_2(\\text{g}) + 2\\text{H}_2\\text{O}(\\text{l}),$$\n$$\\Delta H_r = -170.8\\text{ kJ mol}^{-1}.$$\nWhich of the following statements is not true?",
    options: [
      "The reaction is exothermic.",
      "At equilibrium, the concentrations of $\\text{CO}_2(\\text{g})$ and $\\text{H}_2\\text{O}(\\text{l})$ are not equal.",
      "The equilibrium constant for the reaction is given by $K_p = \\frac{[\\text{CO}_2]}{[\\text{CH}_4][\\text{O}_2]}$",
      "Addition of $\\text{CH}_4(\\text{g})$ or $\\text{O}_2(\\text{g})$ at equilibrium will cause a shift to the right."
    ],
    correct_option: "C",
    solution_text: "Statement (C) is incorrect because:\n1. $K_p$ must be expressed in terms of partial pressures ($P_i$), not molar concentrations $[\\dots]$.\n2. The power of $[\text{O}_2]$ should be 2 according to the stoichiometry of $2\\text{O}_2$.\n3. $\\text{H}_2\\text{O}(\\text{l})$ is in liquid state so it does not appear in $K_p$.\nThe correct expression for $K_p$ is $K_p = \\frac{P_{\\text{CO}_2}}{P_{\\text{CH}_4} P_{\\text{O}_2}^2}$. Hence statement (C) is false."
  },
  {
    question_number: 32,
    exam_name: "AIPMT",
    year: 2005,
    question_text: "Equilibrium constants $K_1$ and $K_2$ for the following equilibria:\n$$\\text{NO}(\\text{g}) + \\frac{1}{2}\\text{O}_2 \\xrightarrow{K_1} \\text{NO}_2(\\text{g}) \\quad \\text{and}$$\n$$2\\text{NO}_2(\\text{g}) \\xrightarrow{K_2} 2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g})$$\nare related as",
    options: [
      "$K_2 = 1/K_1^2$",
      "$K_2 = K_1^2$",
      "$K_2 = 1/K_1$",
      "$K_2 = K_1/2$"
    ],
    correct_option: "A",
    solution_text: "Given:\n$$\\text{NO}(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightleftharpoons \\text{NO}_2(\\text{g}), \\quad K_1 = \\frac{[\\text{NO}_2]}{[\\text{NO}][\\text{O}_2]^{1/2}}$$\nSecond reaction:\n$$2\\text{NO}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g}) + \\text{O}_2(\\text{g}), \\quad K_2 = \\frac{[\\text{NO}]^2 [\\text{O}_2]}{[\\text{NO}_2]^2}$$\nComparing the two expressions:\n$$K_2 = \\left(\\frac{1}{K_1}\\right)^2 = \\frac{1}{K_1^2}$$"
  },
  {
    question_number: 33,
    exam_name: "AIPMT",
    year: 2003,
    question_text: "The equilibrium constants of the following are\n$$\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3; \\quad K_1$$\n$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO}; \\quad K_2$$\n$$\\text{H}_2 + \\frac{1}{2}\\text{O}_2 \\rightleftharpoons \\text{H}_2\\text{O}; \\quad K_3$$\nThe equilibrium constant ($K$) of the reaction :\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O} \\quad \\text{will be}$$",
    options: [
      "$K_2 K_3^3 / K_1$",
      "$K_2 K_3 / K_1$",
      "$K_2^3 K_3 / K_1$",
      "$K_1 K_3^3 / K_2$"
    ],
    correct_option: "A",
    solution_text: "Reversing reaction 1, taking reaction 2, and multiplying reaction 3 by 3:\n$$2\\text{NH}_3 \\rightleftharpoons \\text{N}_2 + 3\\text{H}_2 \\quad \\left(K'_1 = \\frac{1}{K_1}\\right)$$\n$$\\text{N}_2 + \\text{O}_2 \\rightleftharpoons 2\\text{NO} \\quad (K_2)$$\n$$3\\text{H}_2 + \\frac{3}{2}\\text{O}_2 \\rightleftharpoons 3\\text{H}_2\\text{O} \\quad (K_3^3)$$\nAdding these gives:\n$$2\\text{NH}_3 + \\frac{5}{2}\\text{O}_2 \\rightleftharpoons 2\\text{NO} + 3\\text{H}_2\\text{O}$$\n$$K = \\frac{K_2 K_3^3}{K_1}$$"
  },
  {
    question_number: 34,
    exam_name: "AIPMT",
    year: 2003,
    question_text: "The reaction quotient ($Q$) for the reaction\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g})$$\nis given by $Q = \\frac{[\\text{NH}_3]^2}{[\\text{N}_2][\\text{H}_2]^3}$.\nThe reaction will proceed from right to left if",
    options: [
      "$Q = K_c$",
      "$Q < K_c$",
      "$Q > K_c$",
      "$Q = 0$"
    ],
    correct_option: "C",
    solution_text: "The direction of reaction depends on the comparison between $Q$ and $K_c$:\n- If $Q < K_c$, reaction proceeds from left to right (forward direction).\n- If $Q = K_c$, reaction is at equilibrium.\n- If $Q > K_c$, products are in excess of equilibrium concentrations, so the reaction proceeds from right to left (backward direction) to re-establish equilibrium."
  },
  {
    question_number: 35,
    exam_name: "AIPMT",
    year: 2002,
    question_text: "Reaction $\\text{BaO}_2(\\text{s}) \\rightleftharpoons \\text{BaO}(\\text{s}) + \\text{O}_2(\\text{g}); \\; \\Delta H = +\\text{ve}$. In equilibrium condition, pressure of $\\text{O}_2$ depends on",
    options: [
      "increase mass of $\\text{BaO}_2$",
      "increase mass of $\\text{BaO}$",
      "increase temperature on equilibrium",
      "increase mass of $\\text{BaO}_2$ and $\\text{BaO}$ both."
    ],
    correct_option: "C",
    solution_text: "For the reaction $\\text{BaO}_2(\\text{s}) \\rightleftharpoons \\text{BaO}(\\text{s}) + \\text{O}_2(\\text{g})$:\n$$K_p = P_{\\text{O}_2}$$\nBecause $\\text{BaO}_2$ and $\\text{BaO}$ are pure solids, their active masses are unity and changing their amounts does not alter $P_{\\text{O}_2}$.\nSince the reaction is endothermic ($\\Delta H > 0$), increasing the temperature increases $K_p$, which increases the equilibrium pressure of $\\text{O}_2$."
  },
  {
    question_number: 36,
    exam_name: "AIPMT",
    year: 2000,
    question_text: "For any reversible reaction, if we increase concentration of the reactants, then effect on equilibrium constant",
    options: [
      "depends on amount of concentration",
      "unchanged",
      "decrease",
      "increase"
    ],
    correct_option: "B",
    solution_text: "The equilibrium constant ($K$) for a given chemical reaction is a thermodynamic property that depends solely on temperature. Changing the concentrations of reactants or products shifts the equilibrium position according to Le Chatelier's principle, but the value of the equilibrium constant remains unchanged."
  },
  {
    question_number: 37,
    exam_name: "AIPMT",
    year: 2000,
    question_text: "Equilibrium constant $K_p$ for following reaction\n$$\\text{MgCO}_3(\\text{s}) \\rightleftharpoons \\text{MgO}(\\text{s}) + \\text{CO}_2(\\text{g})$$",
    options: [
      "$K_p = P_{\\text{CO}_2}$",
      "$K_p = P_{\\text{CO}_2} \\times \\frac{P_{\\text{CO}_2} \\times P_{\\text{MgO}}}{P_{\\text{MgCO}_3}}$",
      "$K_p = \\frac{P_{\\text{CO}_2} + P_{\\text{MgO}}}{P_{\\text{MgCO}_3}}$",
      "$K_p = \\frac{P_{\\text{MgCO}_3}}{P_{\\text{CO}_2} + P_{\\text{MgO}}}$"
    ],
    correct_option: "A",
    solution_text: "For the heterogeneous equilibrium:\n$$\\text{MgCO}_3(\\text{s}) \\rightleftharpoons \\text{MgO}(\\text{s}) + \\text{CO}_2(\\text{g})$$\nSince $\\text{MgCO}_3(\\text{s})$ and $\\text{MgO}(\\text{s})$ are pure solids, their partial pressures / activities are taken as unity ($1$):\n$$K_p = P_{\\text{CO}_2}$$"
  },
  {
    question_number: 38,
    exam_name: "AIPMT",
    year: 1998,
    question_text: "If $K_1$ and $K_2$ are the respective equilibrium constants for the two reactions\n$$\\text{XeF}_6(\\text{g}) + \\text{H}_2\\text{O}(\\text{g}) \\rightleftharpoons \\text{XeOF}_4(\\text{g}) + 2\\text{HF}(\\text{g})$$\n$$\\text{XeO}_4(\\text{g}) + \\text{XeF}_6(\\text{g}) \\rightleftharpoons \\text{XeOF}_4(\\text{g}) + \\text{XeO}_3\\text{F}_2(\\text{g})$$\nthe equilibrium constant of the reaction\n$$\\text{XeO}_4(\\text{g}) + 2\\text{HF}(\\text{g}) \\rightleftharpoons \\text{XeO}_3\\text{F}_2(\\text{g}) + \\text{H}_2\\text{O}(\\text{g})$$\nwill be",
    options: [
      "$K_1/(K_2)^2$",
      "$K_1 \\cdot K_2$",
      "$K_1/K_2$",
      "$K_2/K_1$"
    ],
    correct_option: "D",
    solution_text: "Given:\n1. $\\text{XeF}_6 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{XeOF}_4 + 2\\text{HF}, \\quad K_1 = \\frac{[\\text{XeOF}_4][\\text{HF}]^2}{[\\text{XeF}_6][\\text{H}_2\\text{O}]}$\n2. $\\text{XeO}_4 + \\text{XeF}_6 \\rightleftharpoons \\text{XeOF}_4 + \\text{XeO}_3\\text{F}_2, \\quad K_2 = \\frac{[\\text{XeOF}_4][\\text{XeO}_3\\text{F}_2]}{[\\text{XeO}_4][\\text{XeF}_6]}$\nTarget reaction:\n$$\\text{XeO}_4 + 2\\text{HF} \\rightleftharpoons \\text{XeO}_3\\text{F}_2 + \\text{H}_2\\text{O}, \\quad K = \\frac{[\\text{XeO}_3\\text{F}_2][\\text{H}_2\\text{O}]}{[\\text{XeO}_4][\\text{HF}]^2}$$\nDividing expression 2 by expression 1:\n$$\\frac{K_2}{K_1} = \\frac{\\frac{[\\text{XeOF}_4][\\text{XeO}_3\\text{F}_2]}{[\\text{XeO}_4][\\text{XeF}_6]}}{\\frac{[\\text{XeOF}_4][\\text{HF}]^2}{[\\text{XeF}_6][\\text{H}_2\\text{O}]}} = \\frac{[\\text{XeO}_3\\text{F}_2][\\text{H}_2\\text{O}]}{[\\text{XeO}_4][\\text{HF}]^2} = K$$\nTherefore, $K = \\frac{K_2}{K_1}$."
  },
  {
    question_number: 39,
    exam_name: "AIPMT",
    year: 1996,
    question_text: "The equilibrium constant for the reaction $\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$ is $K$, then the equilibrium constant for the equilibrium $2\\text{NH}_3 \\rightleftharpoons \\text{N}_2 + 3\\text{H}_2$ is",
    options: [
      "$\\sqrt{K}$",
      "$\\sqrt{\\frac{1}{K}}$",
      "$\\frac{1}{K}$",
      "$\\frac{1}{K^2}$"
    ],
    correct_option: "C",
    solution_text: "If a reversible reaction is reversed, its equilibrium constant is the reciprocal of the original equilibrium constant:\n$$K' = \\frac{1}{K}$$"
  },
  {
    question_number: 40,
    exam_name: "AIPMT",
    year: 1996,
    question_text: "If $\\alpha$ is dissociation constant, then the total number of moles for the reaction, $2\\text{HI} \\rightarrow \\text{H}_2 + \\text{I}_2$ will be",
    options: [
      "1",
      "$1 - \\alpha$",
      "2",
      "$2 - \\alpha$"
    ],
    correct_option: "C",
    solution_text: "For the dissociation reaction starting with 2 moles of $\\text{HI}$:\n$$2\\text{HI} \\rightleftharpoons \\text{H}_2 + \\text{I}_2$$\nInitial moles: $2, 0, 0$\nMoles dissociated: $2\\alpha$\nAt equilibrium:\n- Moles of $\\text{HI} = 2 - 2\\alpha = 2(1 - \\alpha)$\n- Moles of $\\text{H}_2 = \\alpha$\n- Moles of $\\text{I}_2 = \\alpha$\nTotal moles at equilibrium $= 2(1 - \\alpha) + \\alpha + \\alpha = 2 - 2\\alpha + 2\\alpha = 2$."
  },
  {
    question_number: 41,
    exam_name: "AIPMT",
    year: 1995,
    question_text: "Standard state Gibbs free energy change for isomerization reaction $\\text{cis-2-pentene} \\rightleftharpoons \\text{trans-2-pentene}$ is $-3.67\\text{ kJ/mol}$ at $400\\text{ K}$. If more $\\text{trans-2-pentene}$ is added to the reaction vessel, then",
    options: [
      "equilibrium remains unaffected",
      "equilibrium is shifted in the forward direction",
      "more cis-2-pentene is formed",
      "additional trans-2-pentene is formed."
    ],
    correct_option: "C",
    solution_text: "According to Le Chatelier's principle, if additional product (trans-2-pentene) is introduced into an equilibrium mixture, the system responds by shifting in the reverse (backward) direction to consume the added species, thereby forming more reactant (cis-2-pentene)."
  },
  {
    question_number: 42,
    exam_name: "AIPMT",
    year: 1995,
    question_text: "In liquid-gas equilibrium, the pressure of vapours above the liquid is constant at",
    options: [
      "constant temperature",
      "low temperature",
      "high temperature",
      "none of these."
    ],
    correct_option: "A",
    solution_text: "For a dynamic equilibrium between a liquid and its vapour, the vapour pressure depends only on the temperature and the nature of the liquid. At a constant temperature, the rates of evaporation and condensation are equal, and the vapour pressure remains constant."
  },
  {
    question_number: 43,
    exam_name: "AIPMT",
    year: 1993,
    question_text: "According to Le Chatelier's principle, adding heat to a solid and liquid in equilibrium will cause the",
    options: [
      "temperature to increase",
      "temperature to decrease",
      "amount of liquid to decrease",
      "amount of solid to decrease."
    ],
    correct_option: "D",
    solution_text: "The melting process (fusion) is endothermic:\n$$\\text{Solid} + \\text{heat} \\rightleftharpoons \\text{Liquid}$$\nAccording to Le Chatelier's principle, adding heat will shift the equilibrium in the direction that absorbs heat (the forward endothermic direction). As a result, more solid melts into liquid, causing the amount of solid to decrease."
  },
  {
    question_number: 44,
    exam_name: "AIPMT",
    year: 1992,
    question_text: "Which one of the following information can be obtained on the basis of Le Chatelier principle?",
    options: [
      "Dissociation constant of a weak acid",
      "Entropy change in a reaction",
      "Equilibrium constant of a chemical reaction",
      "Shift in equilibrium position on changing value of a constraint"
    ],
    correct_option: "D",
    solution_text: "Le Chatelier's principle is a qualitative rule stating that if a constraint (such as a change in concentration, pressure, or temperature) is applied to a system at equilibrium, the system will adjust itself to minimize that constraint. Therefore, it provides information about the shift in equilibrium position on changing the value of a constraint."
  },
  {
    question_number: 45,
    exam_name: "AIPMT",
    year: 1989,
    question_text: "$K_1$ and $K_2$ are equilibrium constant for reactions (i) and (ii)\n$$\\text{N}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightleftharpoons 2\\text{NO}(\\text{g}) \\quad \\dots (\\text{i})$$\n$$\\text{NO}(\\text{g}) \\rightleftharpoons \\frac{1}{2}\\text{N}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\quad \\dots (\\text{ii})$$",
    options: [
      "$K_1 = \\left(\\frac{1}{K_2}\\right)^2$",
      "$K_1 = K_2^2$",
      "$K_1 = \\frac{1}{K_2}$",
      "$K_1 = (K_2)^0$"
    ],
    correct_option: "A",
    solution_text: "From reaction (i):\n$$K_1 = \\frac{[\\text{NO}]^2}{[\\text{N}_2][\\text{O}_2]}$$\nFrom reaction (ii):\n$$K_2 = \\frac{[\\text{N}_2]^{1/2} [\\text{O}_2]^{1/2}}{[\\text{NO}]}$$\nTaking the reciprocal of $K_2$ and squaring it:\n$$\\left(\\frac{1}{K_2}\\right)^2 = \\left(\\frac{[\\text{NO}]}{[\\text{N}_2]^{1/2} [\\text{O}_2]^{1/2}}\\right)^2 = \\frac{[\\text{NO}]^2}{[\\text{N}_2][\\text{O}_2]} = K_1$$\nTherefore, $K_1 = \\left(\\frac{1}{K_2}\\right)^2$."
  }
];

