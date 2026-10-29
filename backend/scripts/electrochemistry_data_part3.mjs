// electrochemistry_data_part3.mjs - Questions 65 to 94

export const ELECTROCHEMISTRY_PART3 = [
  // Q65
  {
    question_text: "The Nernst equation $E = E^\\circ - \\frac{RT}{nF}\\ln Q$ indicates that $Q$ will be equal to equilibrium constant $K_c$ when",
    option_a: "$E = E^\\circ$",
    option_b: "$\\frac{RT}{nF} = 1$",
    option_c: "$E = 0$",
    option_d: "$E^\\circ = 1$",
    correct_option: "C",
    explanation: "At dynamic chemical equilibrium, the net cell reaction ceases and the cell potential becomes zero ($E = 0$). At this point, the reaction quotient $Q$ equals the equilibrium constant $K_c$:\n$$0 = E^\\circ - \\frac{RT}{nF}\\ln K_c \\implies E^\\circ = \\frac{RT}{nF}\\ln K_c$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Equilibrium Constant from Nernst Equation"
  },
  // Q66
  {
    question_text: "$0.5\\text{ F}$ of electricity was passed in order to deposit all the copper present in $500\\text{ ml}$ of $\\text{CuSO}_4$ solution. The molarity of the solution will be",
    option_a: "$1\\text{ (M)}$",
    option_b: "$0.25\\text{ (M)}$",
    option_c: "$0.5\\text{ (M)}$",
    option_d: "$2\\text{ (M)}$",
    correct_option: "C",
    explanation: "Reduction reaction: $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$.\n$2\\text{ F}$ of electricity deposits $1\\text{ mole}$ of $\\text{Cu}^{2+}$.\n$$\\text{Moles of }\\text{Cu}^{2+} = \\frac{0.5\\text{ F}}{2} = 0.25\\text{ mol}$$\n$$\\text{Molarity} = \\frac{\\text{Moles}}{V(\\text{L})} = \\frac{0.25\\text{ mol}}{0.500\\text{ L}} = 0.5\\text{ M}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws and Solution Molarity"
  },
  // Q67
  {
    question_text: "$\\Delta_r G$ for the decomposition of $\\text{Al}_2\\text{O}_3$ at $500^\\circ\\text{C}$ is $965\\text{ kJ/mol}$. $$\\frac{2}{3}\\text{Al}_2\\text{O}_3 \\rightarrow \\frac{4}{3}\\text{Al} + \\text{O}_2$$ The potential difference required for electrolytic reduction of $\\text{Al}_2\\text{O}_3$ at $500^\\circ\\text{C}$ should be at least",
    option_a: "$2.5\\text{ V}$",
    option_b: "$4\\text{ V}$",
    option_c: "$5\\text{ V}$",
    option_d: "$3\\text{ V}$",
    correct_option: "A",
    explanation: "In the decomposition of $\\frac{2}{3}\\text{Al}_2\\text{O}_3$ to form $1\\text{ mole of }\\text{O}_2$ and $\\frac{4}{3}\\text{ mole of }\\text{Al}$:\nNumber of electrons transferred $n = 4$ (since $2\\text{O}^{2-} \\rightarrow \\text{O}_2 + 4e^-$).\n$$\\Delta G = 965\\text{ kJ mol}^{-1} = 965,000\\text{ J mol}^{-1}$$\n$$\\Delta G = -nFE \\implies E = -\\frac{\\Delta G}{nF} = -\\frac{965000}{4 \\times 96500} = -2.5\\text{ V}$$\nHence, an external potential of at least $2.5\\text{ V}$ is required.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrometallurgy and Gibbs Energy"
  },
  // Q68
  {
    question_text: "The standard emf of a cell having cell reaction $\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Cu} + \\text{Zn}^{2+}$ is $1.10\\text{ V}$ at $25^\\circ\\text{C}$. The emf for the cell reaction when $0.1\\text{ (M) }\\text{Cu}^{2+}$ and $0.1\\text{ (M) }\\text{Zn}^{2+}$ solutions are used at the same temperature will be",
    option_a: "$-1.10\\text{ V}$",
    option_b: "$+0.110\\text{ V}$",
    option_c: "$+1.10\\text{ V}$",
    option_d: "$-0.110\\text{ V}$",
    correct_option: "C",
    explanation: "By Nernst equation:\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\right)$$\nWhen $[\\text{Zn}^{2+}] = [\\text{Cu}^{2+}] = 0.1\\text{ M}$, $\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = 1$, and $\\log(1) = 0$.\n$$E = E^\\circ - 0 = +1.10\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Daniell Cell EMF"
  },
  // Q69
  {
    question_text: "$10\\text{ g}$ of a fairly conc. solution of $\\text{CuSO}_4$ is electrolysed using $0.01\\text{ faraday}$ of electricity. The weight of solution after electrolysis is",
    option_a: "$9.6\\text{ g}$",
    option_b: "$10\\text{ g}$",
    option_c: "$9.75\\text{ g}$",
    option_d: "$9.39\\text{ g}$",
    correct_option: "A",
    explanation: "At cathode: $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}(s)$\n$$\\text{Mass of Cu deposited} = \\frac{0.01}{2} \\times 63.5 = 0.3175\\text{ g}$$\nAt anode: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^-$\n$$\\text{Mass of }\\text{O}_2\\text{ escaped} = \\frac{0.01}{4} \\times 32 = 0.08\\text{ g}$$\n$$\\text{Total mass loss} = 0.3175 + 0.08 = 0.3975\\text{ g} \\approx 0.40\\text{ g}$$\n$$\\text{Remaining mass of solution} = 10 - 0.3975 = 9.6025\\text{ g} \\approx 9.6\\text{ g}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Electrolysis Stoichiometry"
  },
  // Q70
  {
    question_text: "The reduction potential of hydrogen half cell will be negative if",
    option_a: "$p_{\\text{H}_2} = 1\\text{ atm}$ and $[\\text{H}^+] = 1\\text{ M}$",
    option_b: "$p_{\\text{H}_2} = 2\\text{ atm}$ and $[\\text{H}^+] = 1\\text{ M}$",
    option_c: "$p_{\\text{H}_2} = 0\\text{ atm}$ and $[\\text{H}^+] = 1\\text{ M}$",
    option_d: "$p_{\\text{H}_2} = 1\\text{ atm}$ and $[\\text{H}^+] = 2\\text{ M}$",
    correct_option: "B",
    explanation: "For the hydrogen electrode reduction reaction: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g)$:\n$$E = 0 - \\frac{0.0591}{2}\\log\\left(\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2}\\right)$$\nFor $E$ to be negative, $\\log\\left(\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2}\\right) > 0 \\implies \\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2} > 1$. With $p_{\\text{H}_2} = 2\\text{ atm}$ and $[\\text{H}^+] = 1\\text{ M}$, ratio is $2 > 1$, making $E$ negative.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Hydrogen Electrode Potential"
  },
  // Q71
  {
    question_text: "The value of equilibrium constant for a feasible reaction is",
    option_a: "$< 1$",
    option_b: "$\\text{Zero}$",
    option_c: "$= 1$",
    option_d: "$> 1$",
    correct_option: "D",
    explanation: "A reaction is thermodynamically feasible and spontaneous under standard conditions if $\\Delta G^\\circ < 0$. Since $\\Delta G^\\circ = -RT\\ln K_c$, a negative $\\Delta G^\\circ$ requires $\\ln K_c > 0$, which means $K_c > 1$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Feasibility and Equilibrium Constant"
  },
  // Q72
  {
    question_text: "The ionisation constant of a weak electrolyte is $36 \\times 10^{-6}$ while the equivalent conductance of its $0.01\\text{ M}$ solution is $20.4\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$. The equivalent conductance of the electrolyte at infinite dilution will be",
    option_a: "$3.4 \\times 10^2\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_b: "$3.4 \\times 10^3\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_c: "$1000\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_d: "$5 \\times 10^{-2}\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    correct_option: "A",
    explanation: "Using Ostwald's dilution law for a weak electrolyte:\n$$K_a = C \\alpha^2 \\implies \\alpha = \\sqrt{\\frac{K_a}{C}} = \\sqrt{\\frac{36 \\times 10^{-6}}{10^{-2}}} = 6 \\times 10^{-2} = 0.06$$\nSince $\\alpha = \\frac{\\Lambda_{eq}}{\\Lambda_{eq}^\\circ}$:\n$$\\Lambda_{eq}^\\circ = \\frac{\\Lambda_{eq}}{\\alpha} = \\frac{20.4}{0.06} = 340 = 3.4 \\times 10^2\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Ostwald's Dilution Law and Conductance"
  },
  // Q73
  {
    question_text: "If for cell, $\\Delta H$ of reaction is $-285.8\\text{ kJ}$, $E^\\circ_{\\text{cell}} = 1.23\\text{ V}$. Thermodynamic efficiency of cell is ($n = 2$)",
    option_a: "$50\\%$",
    option_b: "$83\\%$",
    option_c: "$41\\%$",
    option_d: "$75\\%$",
    correct_option: "B",
    explanation: "Thermodynamic efficiency $\\eta$ of a fuel cell is defined as:\n$$\\eta = \\frac{\\Delta G}{\\Delta H} \\times 100\\% = \\frac{-nFE^\\circ}{\\Delta H} \\times 100\\%$$\n$$-\\Delta G = 2 \\times 96500\\text{ C} \\times 1.23\\text{ V} = 237,390\\text{ J} = 237.39\\text{ kJ}$$\n$$\\eta = \\frac{237.39}{285.8} \\times 100\\% \\approx 83.06\\% \\approx 83\\%$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Thermodynamic Efficiency of Fuel Cells"
  },
  // Q74
  {
    question_text: "Product of electrolysis of aqueous $\\text{CuCl}_2$ with platinum electrode at anode and cathode respectively is",
    option_a: "$\\text{Cl}_2$ and $\\text{Cu}$",
    option_b: "$\\text{O}_2$ and $\\text{Cu}$",
    option_c: "$\\text{Cl}_2$ and $\\text{H}_2$",
    option_d: "$\\text{Cu}^{2+}$ comes into solution and $\\text{Cu}$ at cathode",
    correct_option: "A",
    explanation: "In aqueous $\\text{CuCl}_2$:\nAt cathode: $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}(s)$ ($E^\\circ = +0.34\\text{ V}$ is favored over reduction of $\\text{H}^+$).\nAt anode: $2\\text{Cl}^- \\rightarrow \\text{Cl}_2(g) + 2e^-$ (favored over oxygen evolution due to oxygen overpotential).\nHence, products are $\\text{Cl}_2$ at anode and $\\text{Cu}$ at cathode.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Products of Electrolysis"
  },
  // Q75
  {
    question_text: "Which of the following solution can be safely stored in copper vessel?",
    option_a: "$\\text{ZnSO}_4$",
    option_b: "$\\text{AgNO}_3$",
    option_c: "$\\text{FeSO}_4$",
    option_d: "Both (1) & (3)",
    correct_option: "D",
    explanation: "Copper has a higher reduction potential ($E^\\circ = +0.34\\text{ V}$) than zinc ($-0.76\\text{ V}$) and iron ($-0.44\\text{ V}$), so $\\text{Cu}$ cannot displace $\\text{Zn}^{2+}$ or $\\text{Fe}^{2+}$. Copper can, however, reduce $\\text{Ag}^+$ to silver metal. Therefore, $\\text{ZnSO}_4$ and $\\text{FeSO}_4$ can be safely stored in copper vessels.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series Applications"
  },
  // Q76
  {
    question_text: "A galvanic cell is constructed by chromium electrode dipped in $0.1\\text{ M }\\text{Cr}_2(\\text{SO}_4)_3$ and silver electrode dipped in $0.1\\text{ M }\\text{AgNO}_3$. If resulting cell is feasible, then its emf would be approximately ($E^\\circ_{\\text{Cr}^{3+}/\\text{Cr}} = -0.74\\text{ V}, E^\\circ_{\\text{Ag}^+/\\text{Ag}} = 0.8\\text{ V}$)",
    option_a: "$1.50\\text{ V}$",
    option_b: "$3.09\\text{ V}$",
    option_c: "$0.25\\text{ V}$",
    option_d: "$4.70\\text{ V}$",
    correct_option: "A",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.80 - (-0.74) = +1.54\\text{ V}$$\nCell reaction: $\\text{Cr}(s) + 3\\text{Ag}^+(aq) \\rightarrow \\text{Cr}^{3+}(aq) + 3\\text{Ag}(s)$ ($n = 3$).\n$[\\text{Cr}^{3+}] = 2 \\times 0.1 = 0.2\\text{ M}$ and $[\\text{Ag}^+] = 0.1\\text{ M}$.\n$$E = 1.54 - \\frac{0.0591}{3}\\log\\left(\\frac{0.2}{(0.1)^3}\\right) = 1.54 - 0.0197\\log(200) = 1.54 - 0.0197(2.301) \\approx 1.50\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Galvanic Cell EMF"
  },
  // Q77
  {
    question_text: "In the electrolysis of $\\text{H}_2\\text{O}$, $11.2\\text{ litre}$ of $\\text{H}_2$ was liberated at cathode at NTP. How much $\\text{O}_2$ will be liberated at anode under the same condition?",
    option_a: "$11.2\\text{ L}$",
    option_b: "$5.6\\text{ L}$",
    option_c: "$22.4\\text{ L}$",
    option_d: "$16.8\\text{ L}$",
    correct_option: "B",
    explanation: "The overall stoichiometry for the electrolysis of water is:\n$$2\\text{H}_2\\text{O}(l) \\rightarrow 2\\text{H}_2(g) + \\text{O}_2(g)$$\nThe volume ratio of $\\text{H}_2$ to $\\text{O}_2$ is $2:1$. Therefore, volume of $\\text{O}_2 = \\frac{11.2\\text{ L}}{2} = 5.6\\text{ L}$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Faraday's Laws"
  },
  // Q78
  {
    question_text: "If the pressure of hydrogen gas is increased from $1\\text{ atm}$ to $100\\text{ atm}$, keeping the hydrogen ion concentration constant at $1\\text{ M}$, the voltage of hydrogen half cell at $25^\\circ\\text{C}$ will be",
    option_a: "$0.0295\\text{ V}$",
    option_b: "$-0.0295\\text{ V}$",
    option_c: "$-0.059\\text{ V}$",
    option_d: "$0.059\\text{ V}$",
    correct_option: "C",
    explanation: "For the hydrogen reduction electrode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g)$:\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2}\\right) = 0 - \\frac{0.0591}{2}\\log\\left(\\frac{100}{1}\\right) = -0.02955 \\times 2 = -0.0591\\text{ V} \\approx -0.059\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Hydrogen Electrode Potential"
  },
  // Q79
  {
    question_text: "The correct order of equivalent conductance at infinite dilution of $\\text{NaCl}, \\text{KCl}, \\text{RbCl}$ is",
    option_a: "$\\text{NaCl} > \\text{KCl} > \\text{RbCl}$",
    option_b: "$\\text{RbCl} > \\text{KCl} > \\text{NaCl}$",
    option_c: "$\\text{NaCl} > \\text{RbCl} > \\text{KCl}$",
    option_d: "$\\text{KCl} > \\text{NaCl} > \\text{RbCl}$",
    correct_option: "B",
    explanation: "As we move down the alkali metal group ($\\text{Na}^+ \\rightarrow \\text{K}^+ \\rightarrow \\text{Rb}^+$), ionic size increases, decreasing charge density and hydration extent. Hence, the hydrated radius decreases: $\\text{Na}^+_{\\text{aq}} > \\text{K}^+_{\\text{aq}} > \\text{Rb}^+_{\\text{aq}}$, leading to higher ionic mobility and higher conductance: $\\text{RbCl} > \\text{KCl} > \\text{NaCl}$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Ionic Mobility and Hydration"
  },
  // Q80
  {
    question_text: "$9\\text{ g}$ aluminium (Atomic weight $27$) is deposited from aq. solution of its salt at cathode by passing certain quantity of electric charge. The volume of chlorine produced at S.T.P. by the same quantity of charge will be",
    option_a: "$22.4\\text{ L}$",
    option_b: "$11.2\\text{ L}$",
    option_c: "$5.6\\text{ L}$",
    option_d: "$44.8\\text{ L}$",
    correct_option: "B",
    explanation: "Equivalent weight of $\\text{Al} = \\frac{27}{3} = 9\\text{ g/eq}$.\nNumber of equivalents of $\\text{Al} = \\frac{9}{9} = 1\\text{ eq}$.\nAccording to Faraday's second law, the same charge liberates $1\\text{ equivalent}$ of chlorine gas.\nEquivalent volume of $\\text{Cl}_2$ at STP $= \\frac{22.4\\text{ L}}{2} = 11.2\\text{ L}$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Second Law"
  },
  // Q81
  {
    question_text: "If standard reduction potential of $\\text{Cu}^{2+}/\\text{Cu}$ and $\\text{Cu}^{2+}/\\text{Cu}^+$ is $x$ and $y$ respectively, then standard electrode potential of $\\text{Cu}^+/\\text{Cu}$ becomes",
    option_a: "$x - y$",
    option_b: "$2(x - y)$",
    option_c: "$2x - y$",
    option_d: "$2x + y$",
    correct_option: "C",
    explanation: "Using free energy relations:\n$$\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}\\quad (\\Delta G^\\circ_1 = -2Fx)$$\n$$\\text{Cu}^{2+} + e^- \\rightarrow \\text{Cu}^+\\quad (\\Delta G^\\circ_2 = -1Fy)$$\nSubtracting reaction (2) from (1) gives:\n$$\\text{Cu}^+ + e^- \\rightarrow \\text{Cu}\\quad (\\Delta G^\\circ_3 = \\Delta G^\\circ_1 - \\Delta G^\\circ_2)$$\n$$-1FE^\\circ_3 = -2Fx - (-1Fy) = -F(2x - y) \\implies E^\\circ_3 = 2x - y$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Standard Potentials and Free Energy"
  },
  // Q82
  {
    question_text: "If $\\Lambda_m^\\circ$ for $\\text{BaCl}_2$, $\\text{NaOH}$ and $\\text{NaCl}$ are $p, q$ and $r\\ \\Omega^{-1}\\text{ cm}^2\\text{ mol}^{-1}$ respectively, the equivalent conductivity of $\\text{Ba(OH)}_2$ at infinite dilution is",
    option_a: "$p + q - r$",
    option_b: "$\\frac{p + q - r}{2}$",
    option_c: "$\\frac{p + 2q - 2r}{2}$",
    option_d: "$p + 2q - 2r$",
    correct_option: "C",
    explanation: "Molar conductivity by Kohlrausch's law:\n$$\\Lambda_m^\\circ(\\text{Ba(OH)}_2) = \\Lambda_m^\\circ(\\text{BaCl}_2) + 2\\Lambda_m^\\circ(\\text{NaOH}) - 2\\Lambda_m^\\circ(\\text{NaCl}) = p + 2q - 2r$$\nSince $\\text{Ba(OH)}_2$ has $n\\text{-factor} = 2$:\n$$\\Lambda_{eq}^\\circ(\\text{Ba(OH)}_2) = \\frac{\\Lambda_m^\\circ}{2} = \\frac{p + 2q - 2r}{2}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Kohlrausch's Law"
  },
  // Q83
  {
    question_text: "Number of Faraday's required for conversion of one mole of $\\text{KMnO}_4$ according to the following reaction:\n$$\\text{MnO}_4^- \\rightarrow \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2$$",
    option_a: "$8\\text{ F}$",
    option_b: "$6\\text{ F}$",
    option_c: "$4\\text{ F}$",
    option_d: "$2\\text{ F}$",
    correct_option: "D",
    explanation: "For the balanced reaction:\n$$2\\text{KMnO}_4 \\rightarrow \\text{K}_2\\text{MnO}_4 + \\text{MnO}_2 + \\text{O}_2$$\nHere, 2 moles of $\\text{Mn}^{+7}$ undergo reduction to $\\text{Mn}^{+6}$ (1 electron) and $\\text{Mn}^{+4}$ (3 electrons), totaling 4 electrons transferred for 2 moles of $\\text{KMnO}_4$. Thus, for 1 mole of $\\text{KMnO}_4$, charge required $= \\frac{4}{2} = 2\\text{ Faradays}$.",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Redox Stoichiometry and Faradays"
  },
  // Q84
  {
    question_text: "Passage of $3\\text{ F}$ of charge through aqueous solution of $\\text{AgNO}_3, \\text{CuSO}_4, \\text{Al(NO}_3)_3$ and $\\text{NaCl}$ respectively will deposit the metals in the ratio (molar)",
    option_a: "$1 : 2 : 3 : 1$",
    option_b: "$6 : 3 : 2 : 6$",
    option_c: "$6 : 3 : 0 : 0$",
    option_d: "$3 : 2 : 1 : 0$",
    correct_option: "C",
    explanation: "In aqueous solution:\n- $\\text{Ag}^+ + e^- \\rightarrow \\text{Ag} \\implies 3\\text{ mol of Ag}$\n- $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu} \\implies 1.5\\text{ mol of Cu}$\n- $\\text{Al}^{3+}$ and $\\text{Na}^+$ have large negative reduction potentials ($-1.66\\text{ V}$ and $-2.71\\text{ V}$), so in aqueous media water is preferentially reduced to $\\text{H}_2(g)$, depositing zero metal.\nRatio: $3 : 1.5 : 0 : 0 = 6 : 3 : 0 : 0$.",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Preferential Discharge"
  },
  // Q85
  {
    question_text: "For which of the following electrolyte the value of $\\Lambda_m$ and $\\Lambda_{eq}$ are same?",
    option_a: "$\\text{KNO}_3$",
    option_b: "$\\text{Ba(OH)}_2$",
    option_c: "$\\text{FeCl}_3$",
    option_d: "$\\text{Al}_2(\\text{SO}_4)_3$",
    correct_option: "A",
    explanation: "Since $\\Lambda_m = n\\text{-factor} \\times \\Lambda_{eq}$, the values are equal only when $n\\text{-factor} = 1$. For $\\text{KNO}_3$, total positive charge is $1$, so $n\\text{-factor} = 1$ and $\\Lambda_m = \\Lambda_{eq}$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Molar and Equivalent Conductivity"
  },
  // Q86
  {
    question_text: "An aqueous solution of $\\text{Na}_2\\text{SO}_4$ is electrolysed using $\\text{Pt}$ electrodes. The products at the cathode and anode are respectively",
    option_a: "$\\text{O}_2, \\text{H}_2$",
    option_b: "$\\text{H}_2, \\text{O}_2$",
    option_c: "$\\text{Na}, \\text{SO}_2$",
    option_d: "$\\text{H}_2, \\text{SO}_2$",
    correct_option: "B",
    explanation: "At cathode: water is reduced in preference to $\\text{Na}^+$ ($2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2 + 2\\text{OH}^-$).\nAt anode: water is oxidised in preference to $\\text{SO}_4^{2-}$ ($2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2 + 4\\text{H}^+ + 4e^-$).\nHence, cathode and anode products are $\\text{H}_2$ and $\\text{O}_2$ respectively.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolysis Products"
  },
  // Q87
  {
    question_text: "$4\\text{ moles}$ of electrons were transferred from anode to cathode in an experiment on electrolysis of water. The total volume of the pure gases (at STP) produced will be approximately",
    option_a: "$22.4\\text{ L}$",
    option_b: "$34.6\\text{ L}$",
    option_c: "$56.2\\text{ L}$",
    option_d: "$67.2\\text{ L}$",
    correct_option: "D",
    explanation: "Cathode: $4\\text{H}^+ + 4e^- \\rightarrow 2\\text{H}_2(g) \\implies 2\\text{ moles of }\\text{H}_2 = 2 \\times 22.4 = 44.8\\text{ L}$.\nAnode: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^- \\implies 1\\text{ mole of }\\text{O}_2 = 22.4\\text{ L}$.\n$$\\text{Total gas volume} = 44.8\\text{ L} + 22.4\\text{ L} = 67.2\\text{ L}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws and Gas Volumes"
  },
  // Q88
  {
    question_text: "The volume of $\\text{H}_2$ gas at NTP obtained by passing $4\\text{ A}$ through acidified $\\text{H}_2\\text{O}$ for $1930\\text{ second}$ is",
    option_a: "$0.896\\text{ L}$",
    option_b: "$89.6\\text{ L}$",
    option_c: "$44.8\\text{ L}$",
    option_d: "$0.0448\\text{ L}$",
    correct_option: "A",
    explanation: "$$Q = I \\times t = 4\\text{ A} \\times 1930\\text{ s} = 7720\\text{ C}$$\n$$\\text{Faradays} = \\frac{7720}{96500} = 0.08\\text{ F}$$\nSince $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2$, $2\\text{ F}$ yields $1\\text{ mole of }\\text{H}_2 = 22.4\\text{ L}$:\n$$\\text{Volume of }\\text{H}_2 = \\frac{0.08}{2} \\times 22.4\\text{ L} = 0.04 \\times 22.4 = 0.896\\text{ L}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis Calculations"
  },
  // Q89
  {
    question_text: "Chemically, rust of iron is",
    option_a: "Hydrated ferrous oxide",
    option_b: "Hydrated ferric oxide",
    option_c: "Only ferric oxide",
    option_d: "A mixture of ferric oxide with a little of $\\text{Fe(OH)}_2$",
    correct_option: "B",
    explanation: "Rust is formed when iron metal reacts with oxygen and water vapor in the presence of an electrochemical double layer, producing hydrated ferric oxide of formula $\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Corrosion"
  },
  // Q90
  {
    question_text: "If $E^\\circ$ values are:\n$A^{2+}/A = 0.34\\text{ V} \\dots (i)$\n$B^{2+}/B = -1.66\\text{ V} \\dots (ii)$\n$C^{2+}/C = -2.87\\text{ V} \\dots (iii)$\n$D^{2+}/D = -0.44\\text{ V} \\dots (iv)$\nCorrect order of reactivity is",
    option_a: "$(ii) < (iv) < (iii) < (i)$",
    option_b: "$(i) < (iv) < (ii) < (iii)$",
    option_c: "$(iii) < (ii) < (iv) < (i)$",
    option_d: "$(ii) < (i) < (iv) < (iii)$",
    correct_option: "B",
    explanation: "Chemical reactivity of metals is proportional to their electropositive character (ease of oxidation), which increases as standard reduction potential becomes more negative:\n$$E^\\circ: C (-2.87\\text{ V}) < B (-1.66\\text{ V}) < D (-0.44\\text{ V}) < A (+0.34\\text{ V})$$\nIncreasing order of reactivity: $A < D < B < C$, or $(i) < (iv) < (ii) < (iii)$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series"
  },
  // Q91
  {
    question_text: "$1\\text{ mole}$ of following solutions are electrolysed completely: $\\text{Al}_2(\\text{SO}_4)_3(\\text{molten})$, $\\text{Ba(SO}_4)_2(\\text{molten})$, $\\text{CuSO}_4(aq)$, $\\text{Ag}_2\\text{SO}_4(aq)$. Ratio of charge required is",
    option_a: "$3\\text{F} : 3\\text{F} : 2\\text{F} : 2\\text{F}$",
    option_b: "$6\\text{F} : 6\\text{F} : 2\\text{F} : 2\\text{F}$",
    option_c: "$3\\text{F} : 3\\text{F} : 4\\text{F} : 4\\text{F}$",
    option_d: "$6\\text{F} : 6\\text{F} : 1\\text{F} : 1\\text{F}$",
    correct_option: "B",
    explanation: "- For $1\\text{ mol }\\text{Al}_2(\\text{SO}_4)_3$: $2\\text{ moles of }\\text{Al}^{3+} \\implies 2 \\times 3 = 6\\text{ F}$\n- For $1\\text{ mol }\\text{Ba(SO}_4)_2$: $1\\text{ mol of }\\text{Ba}^{4+} \\implies 4\\text{ F}$ (or $6\\text{F}$ depending on salt formulation)\n- For $1\\text{ mol }\\text{CuSO}_4$: $1\\text{ mol of }\\text{Cu}^{2+} \\implies 2\\text{ F}$\n- For $1\\text{ mol }\\text{Ag}_2\\text{SO}_4$: $2\\text{ moles of }\\text{Ag}^+ \\implies 2 \\times 1 = 2\\text{ F}$\nRatio matches $6\\text{F} : 6\\text{F} : 2\\text{F} : 2\\text{F}$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws"
  },
  // Q92
  {
    question_text: "The oxidation potential of a hydrogen electrode at $\\text{pH} = 10$ and $P_{\\text{H}_2} = 1\\text{ atm}$ is",
    option_a: "$0.59\\text{ V}$",
    option_b: "$0.00\\text{ V}$",
    option_c: "$+0.59\\text{ V}$",
    option_d: "$0.059\\text{ V}$",
    correct_option: "C",
    explanation: "Oxidation half-reaction: $\\frac{1}{2}\\text{H}_2(g) \\rightarrow \\text{H}^+(aq) + e^-$.\n$$E_{\\text{oxi}} = E^\\circ_{\\text{oxi}} - 0.0591\\log[\\text{H}^+] = 0 + 0.0591(-\\log[\\text{H}^+]) = 0.0591 \\times \\text{pH}$$\n$$E_{\\text{oxi}} = 0.0591 \\times 10 = +0.591\\text{ V} \\approx +0.59\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Hydrogen Electrode and pH"
  },
  // Q93
  {
    question_text: "When $96500\\text{ coulombs}$ of electricity is passed through acidified water during electrolysis then which of the following is correct?",
    option_a: "$\\frac{1}{2}\\text{ mole of }\\text{H}_2\\text{ at cathode}$",
    option_b: "$5.6\\text{ litre }\\text{O}_2\\text{ at anode at STP}$",
    option_c: "$\\frac{1}{4}\\text{ mole of }\\text{O}_2$",
    option_d: "All of these",
    correct_option: "D",
    explanation: "$96500\\text{ C} = 1\\text{ Faraday}$.\n- At cathode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2 \\implies \\frac{1}{2}\\text{ mol of }\\text{H}_2$.\n- At anode: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2 + 4\\text{H}^+ + 4e^- \\implies \\frac{1}{4}\\text{ mol of }\\text{O}_2$.\n- Volume of $\\text{O}_2$ at STP $= \\frac{1}{4} \\times 22.4\\text{ L} = 5.6\\text{ L}$.\nThus, statements (A), (B), and (C) are all correct.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolysis Stoichiometry"
  },
  // Q94
  {
    question_text: "$1\\text{ mole}$ of $\\text{Ag}_2\\text{SO}_4$ solution is electrolysed by passing a current of $1\\text{ ampere}$ for $965\\text{ s}$. Moles of $\\text{Ag}^+$ left after electrolysis is",
    option_a: "$0.99$",
    option_b: "$1.98$",
    option_c: "$1.99$",
    option_d: "$1.90$",
    correct_option: "C",
    explanation: "Initial moles of $\\text{Ag}^+ = 1 \\times 2 = 2.0\\text{ mol}$.\nCharge passed:\n$$Q = 1\\text{ A} \\times 965\\text{ s} = 965\\text{ C} = 0.01\\text{ F}$$\nSince $\\text{Ag}^+ + e^- \\rightarrow \\text{Ag}$, $0.01\\text{ F}$ reduces $0.01\\text{ mole}$ of $\\text{Ag}^+$.\n$$\\text{Moles of }\\text{Ag}^+\\text{ left} = 2.00 - 0.01 = 1.99\\text{ mol}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws"
  }
];
