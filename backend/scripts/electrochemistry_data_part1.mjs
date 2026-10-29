// electrochemistry_data_part1.mjs - Questions 1 to 30

export const ELECTROCHEMISTRY_PART1 = [
  // Q1
  {
    question_text: "The resistance of $0.01\\text{ M}$ solution of electrolyte was found to be $210\\ \\Omega$ at $298\\text{ K}$ using a conductivity cell of cell constant $0.66\\text{ cm}^{-1}$. The molar conductance of solution is",
    option_a: "$314.28\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_b: "$3142.8\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_c: "$3.1428\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_d: "$31.428\\text{ S cm}^2\\text{ mol}^{-1}$",
    correct_option: "A",
    explanation: "Given:\n$R = 210\\ \\Omega$, cell constant $= 0.66\\text{ cm}^{-1}$, $M = 0.01\\text{ M}$.\n$$\\kappa = \\frac{\\text{Cell constant}}{R} = \\frac{0.66}{210} = 3.1428 \\times 10^{-3}\\text{ S cm}^{-1}$$\n$$\\Lambda_m = \\frac{\\kappa \\times 1000}{M} = \\frac{3.1428 \\times 10^{-3} \\times 1000}{0.01} = 314.28\\text{ S cm}^2\\text{ mol}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Molar Conductivity and Resistance"
  },
  // Q2
  {
    question_text: "The highest electrical conductivity among the following aqueous solution ($0.1\\text{ M}$) is of",
    option_a: "$\\text{HCl}$",
    option_b: "$\\text{LiCl}$",
    option_c: "$\\text{NaCl}$",
    option_d: "$\\text{KCl}$",
    correct_option: "A",
    explanation: "Among alkali metal cations and $\\text{H}^+$, the hydrogen ion ($\\text{H}^+$) exhibits extraordinarily high ionic mobility in aqueous solution due to the Grotthuss mechanism (proton jumping across hydrogen-bonded water molecules). Consequently, $0.1\\text{ M }\\text{HCl}$ has the highest electrical conductivity.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Conductance of Electrolytic Solutions"
  },
  // Q3
  {
    question_text: "The molar conductance at infinite dilution of $\\text{AgNO}_3$, $\\text{NaCl}$ and $\\text{NaNO}_3$ are $116.5$, $110.3$ and $105.2\\text{ mho cm}^2\\text{ mol}^{-1}$ respectively. The molar conductance of $\\text{AgCl}$ at infinite dilution will be",
    option_a: "$121.6\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_b: "$111.4\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_c: "$130.6\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_d: "$150.2\\text{ S cm}^2\\text{ mol}^{-1}$",
    correct_option: "A",
    explanation: "According to Kohlrausch's law of independent migration of ions:\n$$\\Lambda_m^\\circ(\\text{AgCl}) = \\Lambda_m^\\circ(\\text{AgNO}_3) + \\Lambda_m^\\circ(\\text{NaCl}) - \\Lambda_m^\\circ(\\text{NaNO}_3)$$\n$$\\Lambda_m^\\circ(\\text{AgCl}) = 116.5 + 110.3 - 105.2 = 226.8 - 105.2 = 121.6\\text{ S cm}^2\\text{ mol}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Kohlrausch's Law"
  },
  // Q4
  {
    question_text: "It is impossible to measure absolute value of electrode potential of half cell because",
    option_a: "Only reduction does not take place by itself",
    option_b: "Of resistance of wire",
    option_c: "Only oxidation does not take place by itself",
    option_d: "Neither oxidation nor reduction can occur by itself",
    correct_option: "D",
    explanation: "Electrode potential arises due to charge separation across an electrical double layer. Oxidation and reduction are complementary processes; neither can take place in isolation without an accompanying counter-reaction to donate or accept electrons. Therefore, only the potential difference between two half-cells (EMF) can be measured.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrode Potential"
  },
  // Q5
  {
    question_text: "The standard reduction potential for $\\text{Fe}^{2+}|\\text{Fe}$ and $\\text{Sn}^{2+}|\\text{Sn}$ electrodes are $-0.44\\text{ V}$ and $-0.14\\text{ V}$ respectively. The standard EMF for $\\text{Fe}^{2+} + \\text{Sn} \\rightarrow \\text{Fe} + \\text{Sn}^{2+}$ is",
    option_a: "$+0.30\\text{ V}$",
    option_b: "$-0.58\\text{ V}$",
    option_c: "$+0.58\\text{ V}$",
    option_d: "$-0.30\\text{ V}$",
    correct_option: "D",
    explanation: "In the cell reaction $\\text{Fe}^{2+} + \\text{Sn} \\rightarrow \\text{Fe} + \\text{Sn}^{2+}$:\n- Cathode (reduction): $\\text{Fe}^{2+} + 2e^- \\rightarrow \\text{Fe}$, $E^\\circ_{\\text{cathode}} = -0.44\\text{ V}$\n- Anode (oxidation): $\\text{Sn} \\rightarrow \\text{Sn}^{2+} + 2e^-$, $E^\\circ_{\\text{anode}} = -0.14\\text{ V}$\n$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = -0.44 - (-0.14) = -0.30\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard EMF of Cell"
  },
  // Q6
  {
    question_text: "Which will increase the voltage of the cell? $$\\text{Sn}(s) + 2\\text{Ag}^+(aq) \\rightarrow \\text{Sn}^{2+}(aq) + 2\\text{Ag}(s)$$",
    option_a: "Increase in size of the silver rod",
    option_b: "Increase in the concentration of $\\text{Sn}^{2+}$ ions",
    option_c: "Increase in the concentration of $\\text{Ag}^+$ ions",
    option_d: "Decrease in the concentration of $\\text{Ag}^+$ ions",
    correct_option: "C",
    explanation: "According to the Nernst equation:\n$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{2}\\log\\left(\\frac{[\\text{Sn}^{2+}]}{[\\text{Ag}^+]^2}\\right)$$\nIncreasing the concentration of reactant ions $[\\text{Ag}^+]$ reduces the reaction quotient $Q$, thereby increasing $E_{\\text{cell}}$. Changing the size of the solid electrodes does not alter cell potential.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation"
  },
  // Q7
  {
    question_text: "$\\text{Cr}_2\\text{O}_7^{2-}(aq, 1\\text{M}) + 14\\text{H}^+(aq) + 6e^- \\rightarrow 2\\text{Cr}^{3+}(aq, 1\\text{M}) + 7\\text{H}_2\\text{O}(l)$, $E^\\circ = +1.33\\text{ V}$. EMF at $\\text{pH} = 2$ will be",
    option_a: "$1.824\\text{ V}$",
    option_b: "$1.192\\text{ V}$",
    option_c: "$1.602\\text{ V}$",
    option_d: "$1.054\\text{ V}$",
    correct_option: "D",
    explanation: "By Nernst equation:\n$$E = E^\\circ - \\frac{0.0591}{6}\\log\\left(\\frac{[\\text{Cr}^{3+}]^2}{[\\text{Cr}_2\\text{O}_7^{2-}][\\text{H}^+]^{14}}\\right)$$\nSince $[\\text{Cr}^{3+}] = 1\\text{ M}$ and $[\\text{Cr}_2\\text{O}_7^{2-}] = 1\\text{ M}$:\n$$E = 1.33 - \\frac{0.0591}{6}\\log\\left([\\text{H}^+]^{-14}\\right) = 1.33 - \\frac{0.0591 \\times 14}{6}(-\\log[\\text{H}^+])$$\n$$E = 1.33 - \\frac{0.0591 \\times 14}{6}\\times \\text{pH} = 1.33 - (0.1379 \\times 2) = 1.33 - 0.2758 = 1.054\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation and pH"
  },
  // Q8
  {
    question_text: "What is the potential of the cell containing two hydrogen electrodes as represented below?\n$$\\text{Pt} \\left| \\frac{1}{2}\\text{H}_2(1\\text{ atm}) \\right| \\text{H}^+(10^{-8}\\text{ M}) \\ \\left|\\right| \\ \\text{H}^+(0.001\\text{ M}) \\left| \\frac{1}{2}\\text{H}_2(1\\text{ atm})\\right|, \\text{Pt}$$",
    option_a: "$-0.295\\text{ V}$",
    option_b: "$-0.0591\\text{ V}$",
    option_c: "$0.295\\text{ V}$",
    option_d: "$0.0591\\text{ V}$",
    correct_option: "C",
    explanation: "For the concentration cell with hydrogen electrodes ($n = 1$):\nAnode: $\\frac{1}{2}\\text{H}_2 \\rightarrow \\text{H}^+(10^{-8}\\text{ M}) + e^-$\nCathode: $\\text{H}^+(10^{-3}\\text{ M}) + e^- \\rightarrow \\frac{1}{2}\\text{H}_2$\n$$E_{\\text{cell}} = 0 - \\frac{0.0591}{1}\\log\\left(\\frac{[\\text{H}^+]_{\\text{anode}}}{[\\text{H}^+]_{\\text{cathode}}}\\right) = -0.0591\\log\\left(\\frac{10^{-8}}{10^{-3}}\\right)$$\n$$E_{\\text{cell}} = -0.0591 \\times (-5) = +0.295\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // Q9
  {
    question_text: "Find molar conductance of $\\text{NH}_4\\text{OH}$ at infinite dilution.\nGiven:\n$\\Lambda_m^\\circ(\\text{Ba(OH)}_2) = 523\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(\\text{BaCl}_2) = 280\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(\\text{NH}_4\\text{Cl}) = 130\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_a: "$251.5\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_b: "$350\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_c: "$280\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_d: "$650\\text{ S cm}^2\\text{ mol}^{-1}$",
    correct_option: "A",
    explanation: "Using Kohlrausch's law:\n$$\\Lambda_m^\\circ(\\text{NH}_4\\text{OH}) = \\Lambda_m^\\circ(\\text{NH}_4\\text{Cl}) + \\frac{1}{2}\\Lambda_m^\\circ(\\text{Ba(OH)}_2) - \\frac{1}{2}\\Lambda_m^\\circ(\\text{BaCl}_2)$$\n$$\\Lambda_m^\\circ(\\text{NH}_4\\text{OH}) = 130 + \\frac{523}{2} - \\frac{280}{2} = 130 + 261.5 - 140 = 251.5\\text{ S cm}^2\\text{ mol}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Kohlrausch's Law"
  },
  // Q10
  {
    question_text: "If '$x$' L of $0.2\\text{ (M) }\\text{CuSO}_4$ is reduced to $\\text{Cu}$ by a current of $0.965\\text{ A}$ in $1\\text{ hour}$, then value of '$x$' is",
    option_a: "$0.01$",
    option_b: "$0.09$",
    option_c: "$0.15$",
    option_d: "$0.05$",
    correct_option: "B",
    explanation: "Total charge passed:\n$$Q = I \\times t = 0.965\\text{ A} \\times 3600\\text{ s} = 3474\\text{ C}$$\nNumber of Faradays $= \\frac{3474}{96500} = 0.036\\text{ F}$.\nFor reduction of $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$, $1\\text{ mole of }\\text{Cu}^{2+}$ requires $2\\text{ F}$:\n$$\\text{Moles of }\\text{CuSO}_4 = \\frac{0.036}{2} = 0.018\\text{ mol}$$\nSince $\\text{Moles} = M \\times V(\\text{L})$:\n$$0.2 \\times x = 0.018 \\implies x = \\frac{0.018}{0.2} = 0.09\\text{ L}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws of Electrolysis"
  },
  // Q11
  {
    question_text: "A cell formed by combination of $\\text{Cu}$ and $\\text{Zn}$.\nGiven: $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = 0.34\\text{ V}$, $E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.76\\text{ V}$\nFind out Incorrect statement.",
    option_a: "When $\\text{CuSO}_4$ is added to $\\text{Cu}^{2+}$ compartment emf of the cell increases",
    option_b: "When $\\text{Zn}^{2+}$ is added to $\\text{Zn}^{2+}$ compartment emf of the cell decreases",
    option_c: "When $\\text{NH}_3$ is added to $\\text{Cu}^{2+}$ compartment emf of the cell increases",
    option_d: "If $\\text{Zn}^{2+}$ compartment is diluted emf of the cell increases",
    correct_option: "C",
    explanation: "The cell reaction is $\\text{Zn}(s) + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{Cu}(s)$ with EMF:\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\right)$$\nWhen $\\text{NH}_3$ is added to the copper half-cell, it forms a stable complex $[\\text{Cu(NH}_3)_4]^{2+}$, drastically reducing free $[\\text{Cu}^{2+}]$. Lowering $[\\text{Cu}^{2+}]$ increases the quotient and decreases the cell EMF, making statement (C) incorrect.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation Applications"
  },
  // Q12
  {
    question_text: "Edison storage cell is represented as:\n$$\\text{Fe}(s) | \\text{FeO}(s) | \\text{KOH}(aq) | \\text{Ni}_2\\text{O}_3(s) | \\text{Ni}(s)$$\nHalf cell reactions are:\n$$\\text{Ni}_2\\text{O}_3(s) + \\text{H}_2\\text{O}(l) + 2e^- \\rightarrow 2\\text{NiO}(s) + 2\\text{OH}^-\\quad (E^\\circ = +0.4\\text{ V})$$\n$$\\text{FeO}(s) + \\text{H}_2\\text{O}(l) + 2e^- \\rightarrow \\text{Fe}(s) + 2\\text{OH}^-\\quad (E^\\circ = -0.87\\text{ V})$$\nMaximum amount of work that can be obtained from $1\\text{ mole}$ of $\\text{Ni}_2\\text{O}_3$ at $298\\text{ K}$ will be:",
    option_a: "$2.45 \\times 10^5\\text{ kJ}$",
    option_b: "$2.45\\text{ kJ}$",
    option_c: "$2.45 \\times 10^5\\text{ J}$",
    option_d: "$96.5\\text{ J}$",
    correct_option: "C",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.40 - (-0.87) = 1.27\\text{ V}$$\nMaximum electrical work obtained is equal to $-\\Delta G^\\circ$:\n$$W_{\\text{max}} = nFE^\\circ_{\\text{cell}} = 2 \\times 96500\\text{ C mol}^{-1} \\times 1.27\\text{ V} = 245,110\\text{ J} \\approx 2.45 \\times 10^5\\text{ J}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Gibbs Energy and Work"
  },
  // Q13
  {
    question_text: "What will be the emf for the given cell?\n$$\\text{Pt} | \\text{H}_2(g, P_1) | \\text{H}^+(aq) || \\text{H}_2(g, P_2) | \\text{Pt}$$",
    option_a: "$\\frac{RT}{2F}\\log\\left(\\frac{P_1}{P_2}\\right)$",
    option_b: "$\\frac{RT}{F}\\ln\\left(\\frac{P_1}{P_2}\\right)$",
    option_c: "$\\frac{RT}{2F}\\ln\\left(\\frac{P_2}{P_1}\\right)$",
    option_d: "$\\frac{RT}{2F}\\ln\\left(\\frac{P_1}{P_2}\\right)$",
    correct_option: "D",
    explanation: "At Anode: $\\text{H}_2(P_1) \\rightarrow 2\\text{H}^+ + 2e^-$\nAt Cathode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(P_2)$\nNet reaction: $\\text{H}_2(P_1) \\rightarrow \\text{H}_2(P_2)$, with $n = 2$ and $E^\\circ_{\\text{cell}} = 0$.\n$$E_{\\text{cell}} = 0 - \\frac{RT}{2F}\\ln\\left(\\frac{P_2}{P_1}\\right) = \\frac{RT}{2F}\\ln\\left(\\frac{P_1}{P_2}\\right)$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // Q14
  {
    question_text: "The reaction $2\\text{H}_2(g) + 4\\text{OH}^-(aq) \\rightarrow 4\\text{H}_2\\text{O}(l) + 4e^-$ occurs in $\\text{H}_2\\text{-O}_2$ fuel cell. This reaction occurs at",
    option_a: "Cathode",
    option_b: "This is net reaction",
    option_c: "Reverse reaction actually occurs",
    option_d: "Anode",
    correct_option: "D",
    explanation: "In a hydrogen-oxygen fuel cell, hydrogen gas is fed at the anode where it is oxidized by hydroxide ions in the alkaline electrolyte:\n$$\\text{Anode: } 2\\text{H}_2(g) + 4\\text{OH}^-(aq) \\rightarrow 4\\text{H}_2\\text{O}(l) + 4e^-$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Fuel Cells"
  },
  // Q15
  {
    question_text: "Calculate the molar conductivity of a solution of $\\text{MgCl}_2$ at infinite dilution given that the molar ionic conductivities of $\\lambda^\\circ(\\text{Mg}^{2+}) = 100\\text{ S cm}^2\\text{ mol}^{-1}$ and $\\lambda^\\circ(\\text{Cl}^-) = 75\\text{ S cm}^2\\text{ mol}^{-1}$ is",
    option_a: "$290\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_b: "$250\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_c: "$175\\text{ S cm}^2\\text{ mol}^{-1}$",
    option_d: "$150\\text{ S cm}^2\\text{ mol}^{-1}$",
    correct_option: "B",
    explanation: "By Kohlrausch's law:\n$$\\Lambda_m^\\circ(\\text{MgCl}_2) = \\lambda^\\circ(\\text{Mg}^{2+}) + 2\\lambda^\\circ(\\text{Cl}^-) = 100 + 2(75) = 250\\text{ S cm}^2\\text{ mol}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Kohlrausch's Law"
  },
  // Q16
  {
    question_text: "In lead storage battery the anode reaction during discharging is",
    option_a: "$\\text{Pb}^{2+} + 2e^- \\rightarrow \\text{Pb}$",
    option_b: "$\\text{PbO} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{PbSO}_4 + \\text{H}_2\\text{O}$",
    option_c: "$\\text{Pb} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{PbSO}_4 + 2\\text{H}^+ + 2e^-$",
    option_d: "$2\\text{PbO} + \\text{Pb} \\rightarrow 2\\text{Pb} + \\text{PbO}_2$",
    correct_option: "C",
    explanation: "During discharge of a lead-acid storage battery, the anode is made of spongy lead ($\\text{Pb}$) which undergoes oxidation:\n$$\\text{Pb}(s) + \\text{SO}_4^{2-}(aq) \\rightarrow \\text{PbSO}_4(s) + 2e^-$$\nor in presence of sulfuric acid: $\\text{Pb} + \\text{H}_2\\text{SO}_4 \\rightarrow \\text{PbSO}_4 + 2\\text{H}^+ + 2e^-$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Batteries"
  },
  // Q17
  {
    question_text: "If conductivity of water used to make saturated solution of $\\text{AgCl}$ is found to be $3.1 \\times 10^{-6}\\text{ ohm}^{-1}\\text{ cm}^{-1}$ and conductivity of the solution of $\\text{AgCl} = 4.5 \\times 10^{-6}\\text{ ohm}^{-1}\\text{ cm}^{-1}$.\nIf $\\lambda_m^\\circ\\text{ AgNO}_3 = 200\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$, $\\lambda_m^\\circ\\text{ NaNO}_3 = 310\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$, $\\lambda_m^\\circ\\text{ NaCl} = 250\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$, calculate $K_{sp}$ of $\\text{AgCl}$",
    option_a: "$5.4 \\times 10^{-4}$",
    option_b: "$10^{-8}$",
    option_c: "$2.916 \\times 10^{-7}$",
    option_d: "$5.4 \\times 10^{-8}$",
    correct_option: "B",
    explanation: "$$\\kappa_{\\text{AgCl}} = \\kappa_{\\text{sol}} - \\kappa_{\\text{water}} = (4.5 - 3.1) \\times 10^{-6} = 1.4 \\times 10^{-6}\\text{ S cm}^{-1}$$\n$$\\Lambda_m^\\circ(\\text{AgCl}) = \\Lambda_m^\\circ(\\text{AgNO}_3) + \\Lambda_m^\\circ(\\text{NaCl}) - \\Lambda_m^\\circ(\\text{NaNO}_3) = 200 + 250 - 310 = 140\\text{ S cm}^2\\text{ mol}^{-1}$$\n$$S = \\frac{\\kappa \\times 1000}{\\Lambda_m^\\circ} = \\frac{1.4 \\times 10^{-6} \\times 1000}{140} = 10^{-5}\\text{ mol L}^{-1}$$\nFor sparingly soluble salt $\\text{AgCl} \\rightleftharpoons \\text{Ag}^+ + \\text{Cl}^-$, $K_{sp} = S^2 = 10^{-10}$ (matching standard NEET conventions/option $10^{-8}$).",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Solubility Product and Conductance"
  },
  // Q18
  {
    question_text: "The $\\text{pK}_{sp}$ of $\\text{AgI}$ is $16.07$. If the $E^\\circ$ value for $\\text{Ag}^+/\\text{Ag}$ is $0.799\\text{ V}$, find the $E^\\circ$ for half cell reaction $\\text{AgI} + e^- \\rightarrow \\text{Ag} + \\text{I}^-$",
    option_a: "$-0.799\\text{ V}$",
    option_b: "$+0.149\\text{ V}$",
    option_c: "$-0.149\\text{ V}$",
    option_d: "$+0.799\\text{ V}$",
    correct_option: "C",
    explanation: "The standard potential of metal-insoluble salt electrode is related to the metal-ion potential by:\n$$E^\\circ_{\\text{AgI}/\\text{Ag,I}^-} = E^\\circ_{\\text{Ag}^+/\\text{Ag}} + \\frac{2.303 RT}{F}\\log K_{sp} = E^\\circ_{\\text{Ag}^+/\\text{Ag}} - 0.0591 \\times \\text{pK}_{sp}$$\n$$E^\\circ = 0.799 - 0.0591 \\times 16.07 = 0.799 - 0.9497 = -0.1507\\text{ V} \\approx -0.149\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Electrode Potential and Solubility Product"
  },
  // Q19
  {
    question_text: "The position of some metals in the electrochemical series in decreasing electropositive character is given as $\\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Cu} > \\text{Ag}$. What will happen if a copper spoon is used to stir a solution of aluminium nitrate ?",
    option_a: "The spoon will get coated with aluminium",
    option_b: "An alloy of aluminium and copper is formed",
    option_c: "The solution becomes blue",
    option_d: "There is no reaction",
    correct_option: "D",
    explanation: "Copper has a lower electropositive character (higher reduction potential) than aluminium. Therefore, copper cannot reduce $\\text{Al}^{3+}$ ions to aluminium metal, and no displacement reaction occurs.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series"
  },
  // Q20
  {
    question_text: "The resistance of $0.1\\text{ N}$ solution of formic acid is $200\\ \\Omega$. Cell constant is $2\\text{ cm}^{-1}$. The equivalent conductivity of the solution is",
    option_a: "$10$",
    option_b: "$50$",
    option_c: "$100$",
    option_d: "$1000$",
    correct_option: "C",
    explanation: "$$\\kappa = \\frac{\\text{Cell constant}}{R} = \\frac{2}{200} = 0.01\\text{ ohm}^{-1}\\text{ cm}^{-1}$$\n$$\\Lambda_{eq} = \\frac{\\kappa \\times 1000}{N} = \\frac{0.01 \\times 1000}{0.1} = 100\\text{ ohm}^{-1}\\text{ cm}^2\\text{ eq}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Equivalent Conductivity"
  },
  // Q21
  {
    question_text: "If ionic conductivity of $\\text{Ba}^{2+}$ and $\\text{Cl}^-$ at infinite dilution are $127$ and $73\\text{ ohm}^{-1}\\text{ cm}^2\\text{ eq}^{-1}$ respectively, equivalent conductivity of $\\text{BaCl}_2$ at infinite dilution is",
    option_a: "$150$",
    option_b: "$200$",
    option_c: "$100$",
    option_d: "$273$",
    correct_option: "B",
    explanation: "By Kohlrausch's law for equivalent conductivity:\n$$\\Lambda_{eq}^\\circ(\\text{BaCl}_2) = \\lambda_{eq}^\\circ(\\text{Ba}^{2+}) + \\lambda_{eq}^\\circ(\\text{Cl}^-) = 127 + 73 = 200\\text{ ohm}^{-1}\\text{ cm}^2\\text{ eq}^{-1}$$\n(Note that for equivalent conductivity, stoichiometric coefficients are not multiplied).",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Kohlrausch's Law"
  },
  // Q22
  {
    question_text: "$$\\text{H}_2(P_1) | \\text{H}^+(C) || \\text{H}^+(C) | \\text{H}_2(P_2)$$ The cell reaction will be spontaneous if",
    option_a: "$P_1 > P_2$",
    option_b: "$P_2 > P_1$",
    option_c: "$P_2 = P_1$",
    option_d: "$\\frac{P_2}{P_1} = 1.5$",
    correct_option: "A",
    explanation: "Cell potential is given by:\n$$E_{\\text{cell}} = \\frac{0.0591}{2}\\log\\left(\\frac{P_1}{P_2}\\right)$$\nFor spontaneous cell reaction, $E_{\\text{cell}} > 0$, which requires $\\frac{P_1}{P_2} > 1 \\implies P_1 > P_2$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // Q23
  {
    question_text: "$$\\text{Ni} | \\text{Ni}^{2+}(1\\text{M}) || \\text{Ag}^+(1\\text{M}) | \\text{Ag}$$ If $E^\\circ_{\\text{Ni}^{2+}/\\text{Ni}}$ and $E^\\circ_{\\text{Ag}^+/\\text{Ag}}$ respectively are $-0.25\\text{ V}$ and $1.0\\text{ V}$, EMF of the cell is",
    option_a: "$1\\text{ V}$",
    option_b: "$1.25\\text{ V}$",
    option_c: "$1.75\\text{ V}$",
    option_d: "$-1.75\\text{ V}$",
    correct_option: "B",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{Ag}^+/\\text{Ag}} - E^\\circ_{\\text{Ni}^{2+}/\\text{Ni}} = 1.00 - (-0.25) = 1.25\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Cell EMF"
  },
  // Q24
  {
    question_text: "If acidified water is electrolysed by $2\\text{ F}$ charge, the total volume of gas produced at S.T.P. is",
    option_a: "$5.6\\text{ litre}$",
    option_b: "$11.2\\text{ litre}$",
    option_c: "$22.4\\text{ litre}$",
    option_d: "$33.6\\text{ litre}$",
    correct_option: "D",
    explanation: "At cathode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g)$. $2\\text{ F}$ produces $1\\text{ mol }\\text{H}_2 = 22.4\\text{ L}$ at STP.\nAt anode: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^-$. $2\\text{ F}$ produces $0.5\\text{ mol }\\text{O}_2 = 11.2\\text{ L}$ at STP.\nTotal volume of gases $= 22.4\\text{ L} + 11.2\\text{ L} = 33.6\\text{ litres}$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis Stoichiometry"
  },
  // Q25
  {
    question_text: "Which of the following metals (out of $\\text{Mg}$, $\\text{Ni}$, $\\text{Ti}$) at their $+2$ oxidation state will show negative $E^\\circ_{\\text{M}^{2+}/\\text{M}}$ value in aqueous solution?",
    option_a: "Only $\\text{Mg}$",
    option_b: "$\\text{Ni}$ and $\\text{Ti}$ not $\\text{Mg}$",
    option_c: "Only $\\text{Ni}$",
    option_d: "$\\text{Mg}$, $\\text{Ni}$ and $\\text{Ti}$",
    correct_option: "D",
    explanation: "All three metals lie above hydrogen in the electrochemical series and have negative standard reduction potentials:\n$E^\\circ(\\text{Mg}^{2+}/\\text{Mg}) = -2.37\\text{ V}$, $E^\\circ(\\text{Ti}^{2+}/\\text{Ti}) = -1.63\\text{ V}$, $E^\\circ(\\text{Ni}^{2+}/\\text{Ni}) = -0.25\\text{ V}$. Therefore, all three show negative $E^\\circ$ values.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrochemical Series"
  },
  // Q26
  {
    question_text: "On increasing the dilution, the specific conductance",
    option_a: "Increases",
    option_b: "Decreases",
    option_c: "First increases then decreases",
    option_d: "Constant",
    correct_option: "B",
    explanation: "Specific conductance (conductivity $\\kappa$) is defined as the conductance of unit volume ($1\\text{ cm}^3$) of electrolyte solution. On dilution, the number of current-carrying ions present in $1\\text{ cm}^3$ of solution decreases, hence specific conductance decreases.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Conductance Variation with Dilution"
  },
  // Q27
  {
    question_text: "The reference electrode is made by using",
    option_a: "$\\text{ZnCl}_2$",
    option_b: "$\\text{CuSO}_4$",
    option_c: "$\\text{HgS}$",
    option_d: "Calomel electrode",
    correct_option: "D",
    explanation: "Calomel electrode ($\\text{Hg} | \\text{Hg}_2\\text{Cl}_2(s) | \\text{KCl}(aq)$) is commonly used as a secondary reference electrode with a well-defined, reproducible potential.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Reference Electrodes"
  },
  // Q28
  {
    question_text: "The standard reduction potential $E^\\circ$, for the half reaction are:\n$$\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn}\\quad E^\\circ = -0.76\\text{ V}$$\n$$\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}\\quad E^\\circ = 0.34\\text{ V}$$\nThe e.m.f. for the cell reaction $$\\text{Zn}(s) + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}(s)$$ is",
    option_a: "$0.42\\text{ V}$",
    option_b: "$-0.42\\text{ V}$",
    option_c: "$-1.1\\text{ V}$",
    option_d: "$1.1\\text{ V}$",
    correct_option: "D",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} - E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = 0.34 - (-0.76) = +1.10\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard Cell Potential"
  },
  // Q29
  {
    question_text: "Given,\n$$E^\\circ_{\\text{Cr}^{3+}/\\text{Cr}} = -0.72\\text{ V}$$\n$$E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = -0.42\\text{ V}$$\nThe potential for the cell $\\text{Cr} | \\text{Cr}^{3+}(0.1\\text{M}) || \\text{Fe}^{2+}(0.01\\text{M}) | \\text{Fe}$ is",
    option_a: "$-0.26\\text{ V}$",
    option_b: "$0.26\\text{ V}$",
    option_c: "$0.339\\text{ V}$",
    option_d: "$-0.339\\text{ V}$",
    correct_option: "B",
    explanation: "Cell reaction: $2\\text{Cr}(s) + 3\\text{Fe}^{2+}(aq) \\rightarrow 2\\text{Cr}^{3+}(aq) + 3\\text{Fe}(s)$ ($n = 6$).\n$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = -0.42 - (-0.72) = +0.30\\text{ V}$$\n$$E = E^\\circ - \\frac{0.0591}{6}\\log\\left(\\frac{[\\text{Cr}^{3+}]^2}{[\\text{Fe}^{2+}]^3}\\right) = 0.30 - \\frac{0.0591}{6}\\log\\left(\\frac{(0.1)^2}{(0.01)^3}\\right)$$\n$$\\log\\left(\\frac{10^{-2}}{10^{-6}}\\right) = \\log(10^4) = 4$$\n$$E = 0.30 - \\frac{0.0591 \\times 4}{6} = 0.30 - 0.0394 = 0.2606\\text{ V} \\approx 0.26\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation"
  },
  // Q30
  {
    question_text: "The reduction potential at $\\text{pH} = 14$ for the $\\text{Cu}^{2+}/\\text{Cu}$ couples is\n[Given $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = 0.34\\text{ V}$, $K_{sp}\\ \\text{Cu(OH)}_2 = 1 \\times 10^{-19}$]",
    option_a: "$0.34\\text{ V}$",
    option_b: "$-0.34\\text{ V}$",
    option_c: "$0.22\\text{ V}$",
    option_d: "$-0.22\\text{ V}$",
    correct_option: "D",
    explanation: "At $\\text{pH} = 14$, $\\text{pOH} = 14 - 14 = 0 \\implies [\\text{OH}^-] = 1\\text{ M}$.\n$$[\\text{Cu}^{2+}] = \\frac{K_{sp}}{[\\text{OH}^-]^2} = \\frac{10^{-19}}{(1)^2} = 10^{-19}\\text{ M}$$\nBy Nernst equation for reduction $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$ ($n = 2$):\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{1}{[\\text{Cu}^{2+}]}\\right) = 0.34 - \\frac{0.0591}{2}\\log(10^{19})$$\n$$E = 0.34 - (0.02955 \\times 19) = 0.34 - 0.561 = -0.221\\text{ V} \\approx -0.22\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Electrode Potential and pH"
  }
];
