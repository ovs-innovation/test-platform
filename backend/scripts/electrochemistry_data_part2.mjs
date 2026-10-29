// electrochemistry_data_part2.mjs - Questions 31 to 64

export const ELECTROCHEMISTRY_PART2 = [
  // Q31
  {
    question_text: "Select from the following that is not correct regarding electrolytic preparation of $\\text{H}_2\\text{O}_2$",
    option_a: "Lead is used as cathode",
    option_b: "$50\\%\\ \\text{H}_2\\text{SO}_4$ is used",
    option_c: "Hydrogen is liberated at Anode",
    option_d: "Sulphuric acid undergoes oxidation",
    correct_option: "C",
    explanation: "In the electrolytic manufacture of $\\text{H}_2\\text{O}_2$ from $50\\%\\ \\text{H}_2\\text{SO}_4$:\nAt cathode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g)$ (reduction occurs at cathode, liberating hydrogen gas).\nAt anode: $2\\text{HSO}_4^- \\rightarrow \\text{H}_2\\text{S}_2\\text{O}_8 + 2e^-$ (oxidation).\nTherefore, hydrogen is liberated at the cathode, not at the anode.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis Applications"
  },
  // Q32
  {
    question_text: "A $0.05\\text{ M}$ solution of a salt occupying a volume between two platinum electrodes separated by a distance of $1.72\\text{ cm}$ and having an area of $4.5\\text{ cm}^2$ has a resistance of $250\\ \\Omega$. Calculate equivalent conductance of solution.",
    option_a: "$25.85\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_b: "$30.58\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_c: "$65.97\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    option_d: "$30.56\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$",
    correct_option: "B",
    explanation: "Given: $l = 1.72\\text{ cm}$, $A = 4.5\\text{ cm}^2$, $R = 250\\ \\Omega$.\n$$\\kappa = \\frac{l}{A \\times R} = \\frac{1.72}{4.5 \\times 250} = 1.5289 \\times 10^{-3}\\text{ S cm}^{-1}$$\nFor a uni-univalent salt, $N = M = 0.05\\text{ N}$:\n$$\\Lambda_{eq} = \\frac{\\kappa \\times 1000}{N} = \\frac{1.5289 \\times 10^{-3} \\times 1000}{0.05} = 30.578 \\approx 30.58\\ \\Omega^{-1}\\text{ cm}^2\\text{ eq}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Equivalent Conductivity"
  },
  // Q33
  {
    question_text: "Calculate '$\\alpha$' (degree of dissociation) of $\\text{CH}_3\\text{COOH}$ if $\\Lambda_m^\\circ$ for $\\text{HCl}$, $\\text{NaCl}$, $\\text{CH}_3\\text{COONa}$ are $425$, $125$, $91\\text{ S cm}^2\\text{ mol}^{-1}$ and $\\Lambda_m = 14.4\\text{ S cm}^2\\text{ mol}^{-1}$ at $0.016\\text{ M}$ concentration",
    option_a: "$0.037$",
    option_b: "$0.018$",
    option_c: "$0.37$",
    option_d: "$0.18$",
    correct_option: "A",
    explanation: "By Kohlrausch's law:\n$$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = \\Lambda_m^\\circ(\\text{HCl}) + \\Lambda_m^\\circ(\\text{CH}_3\\text{COONa}) - \\Lambda_m^\\circ(\\text{NaCl})$$\n$$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = 425 + 91 - 125 = 391\\text{ S cm}^2\\text{ mol}^{-1}$$\n$$\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ} = \\frac{14.4}{391} \\approx 0.0368 \\approx 0.037$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Degree of Dissociation"
  },
  // Q34
  {
    question_text: "$$\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$$\n$\\log[\\text{Cu}^{2+}]$ vs $E$ graph is of the type as shown in figure where $OA = 0.34\\text{ V}$, then electrode potential of the half-cell of $\\text{Cu}/\\text{Cu}^{2+}(0.1\\text{M})$ will be",
    option_a: "$0.34 - \\frac{0.0591}{2}\\text{ V}$",
    option_b: "$0.34 + 0.0591\\text{ V}$",
    option_c: "$0.34\\text{ V}$",
    option_d: "None",
    correct_option: "A",
    explanation: "By Nernst equation for reduction:\n$$E = E^\\circ + \\frac{0.0591}{2}\\log[\\text{Cu}^{2+}]$$\nWhen $\\log[\\text{Cu}^{2+}] = 0$, the y-intercept is $OA = E^\\circ = 0.34\\text{ V}$.\nAt $[\\text{Cu}^{2+}] = 0.1\\text{ M} = 10^{-1}\\text{ M}$, $\\log[\\text{Cu}^{2+}] = -1$:\n$$E = 0.34 + \\frac{0.0591}{2}(-1) = 0.34 - \\frac{0.0591}{2}\\text{ V}$$",
    diagram_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793205363/edvedum_electrochemistry/q34_nernst_cu_graph.png",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation Graphs"
  },
  // Q35
  {
    question_text: "Select the one that represent a concentration cell",
    option_a: "$\\text{Pt}, \\text{H}_2 | \\text{HCl} || \\text{HCl} | \\text{Pt}, \\text{H}_2$",
    option_b: "$\\text{Pt}, \\text{H}_2 | \\text{HCl} || \\text{Cl}_2, \\text{Pt}$",
    option_c: "$\\text{Zn} | \\text{Zn}^{2+} || \\text{Cu}^{2+} | \\text{Cu}$",
    option_d: "$\\text{Fe} | \\text{Fe}^{2+} || \\text{Cu}^{2+} | \\text{Cu}$",
    correct_option: "A",
    explanation: "A concentration cell is an electrochemical cell in which both half-cells have identical electrodes and electrolytes, differing only in the concentration (or partial pressure) of the active species. Hence $\\text{Pt}, \\text{H}_2 | \\text{HCl} || \\text{HCl} | \\text{Pt}, \\text{H}_2$ is an electrolyte concentration cell.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Concentration Cells"
  },
  // Q36
  {
    question_text: "Calculate the mass of benzene that would be required to produce a current of one ampere for three hours from following data:\n$$\\text{C}_6\\text{H}_6 + \\frac{15}{2}\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 3\\text{H}_2\\text{O}$$",
    option_a: "$0.386\\text{ g}$",
    option_b: "$0.222\\text{ g}$",
    option_c: "$0.291\\text{ g}$",
    option_d: "$0.333\\text{ g}$",
    correct_option: "C",
    explanation: "In $\\text{C}_6\\text{H}_6$, carbon has average oxidation state $-1$. In $\\text{CO}_2$, carbon is $+4$.\nElectrons exchanged per mole of benzene $= 6 \\times [4 - (-1)] = 30\\text{ mol } e^-$.\nTotal charge passed:\n$$Q = I \\times t = 1\\text{ A} \\times (3 \\times 3600\\text{ s}) = 10800\\text{ C}$$\n$$\\text{Moles of electrons} = \\frac{10800}{96500} = 0.1119\\text{ mol}$$\n$$\\text{Moles of }\\text{C}_6\\text{H}_6 = \\frac{0.1119}{30} = 3.73 \\times 10^{-3}\\text{ mol}$$\n$$\\text{Mass of benzene} = 3.73 \\times 10^{-3} \\times 78\\text{ g mol}^{-1} = 0.291\\text{ g}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Fuel Cells Stoichiometry"
  },
  // Q37
  {
    question_text: "Calculate the amperes of current required to liberate $5.6\\text{ L}$ of $\\text{Cl}_2$ at STP in three hours during the electrolysis of brine",
    option_a: "$9.5\\text{ A}$",
    option_b: "$5.8\\text{ A}$",
    option_c: "$1.5\\text{ A}$",
    option_d: "$4.5\\text{ A}$",
    correct_option: "D",
    explanation: "Moles of $\\text{Cl}_2$ gas at STP $= \\frac{5.6\\text{ L}}{22.4\\text{ L mol}^{-1}} = 0.25\\text{ mol}$.\nReaction: $2\\text{Cl}^- \\rightarrow \\text{Cl}_2 + 2e^-$, so $n = 2$ Faradays per mole of $\\text{Cl}_2$.\n$$Q = 0.25 \\times 2 \\times 96500 = 48,250\\text{ C}$$\nTime $t = 3 \\times 3600 = 10,800\\text{ s}$:\n$$I = \\frac{Q}{t} = \\frac{48250}{10800} \\approx 4.47\\text{ A} \\approx 4.5\\text{ A}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws"
  },
  // Q38
  {
    question_text: "$$\\text{Fe}^{2+} + 2e^- \\rightarrow \\text{Fe};\\ E^\\circ = -0.44\\text{ V}$$\n$$\\text{Fe}^{3+} + 3e^- \\rightarrow \\text{Fe};\\ E^\\circ = -0.036\\text{ V}$$\nConsidering the above data, the standard electrode potential ($E^\\circ$) for $\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+}$ is",
    option_a: "$-0.476\\text{ V}$",
    option_b: "$-0.404\\text{ V}$",
    option_c: "$0.404\\text{ V}$",
    option_d: "$+0.771\\text{ V}$",
    correct_option: "D",
    explanation: "Using Gibbs free energy relations:\n$$\\Delta G^\\circ_1 = -2F(-0.44) = +0.88F$$\n$$\\Delta G^\\circ_2 = -3F(-0.036) = +0.108F$$\nReaction: $\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+}$ is obtained by subtracting (1) from (2):\n$$\\Delta G^\\circ_3 = \\Delta G^\\circ_2 - \\Delta G^\\circ_1 = 0.108F - 0.88F = -0.772F$$\n$$-1FE^\\circ_3 = -0.772F \\implies E^\\circ_3 = +0.772\\text{ V} \\approx +0.771\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Standard Reduction Potentials and Free Energy"
  },
  // Q39
  {
    question_text: "The standard reduction potentials of three metals A, B and C are $0.5\\text{ V}$, $-3.0\\text{ V}$ and $-1.2\\text{ V}$ respectively. The reducing power of these metals are",
    option_a: "$B > C > A$",
    option_b: "$A > B > C$",
    option_c: "$C > B > A$",
    option_d: "$A > C > B$",
    correct_option: "A",
    explanation: "Reducing power is directly proportional to oxidation tendency, which means inversely proportional to standard reduction potential ($E^\\circ_{\\text{red}}$).\nMore negative $E^\\circ$ indicates stronger reducing agent:\n$$E^\\circ_B (-3.0\\text{ V}) < E^\\circ_C (-1.2\\text{ V}) < E^\\circ_A (+0.5\\text{ V})$$\nHence, reducing power order: $B > C > A$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series"
  },
  // Q40
  {
    question_text: "Select the cell that is not rechargeable",
    option_a: "Hydrogen-oxygen fuel cell",
    option_b: "Lead storage battery",
    option_c: "Leclanche cell",
    option_d: "Solid-state lithium battery",
    correct_option: "C",
    explanation: "Leclanche cell (dry cell) is a primary cell in which the chemical reactions cannot be reversed by passing electrical current, hence it is non-rechargeable.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Primary and Secondary Batteries"
  },
  // Q41
  {
    question_text: "A solution of sodium sulphate in water is electrolysed using inert electrodes. The products at the cathode and anode are respectively",
    option_a: "$\\text{H}_2, \\text{O}_2$",
    option_b: "$\\text{O}_2, \\text{H}_2$",
    option_c: "$\\text{O}_2, \\text{Na}$",
    option_d: "$\\text{O}_2, \\text{SO}_2$",
    correct_option: "A",
    explanation: "In aqueous $\\text{Na}_2\\text{SO}_4$:\nAt cathode: $\\text{H}^+$ is reduced in preference to $\\text{Na}^+$ due to higher reduction potential: $2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2 + 2\\text{OH}^-$.\nAt anode: water is oxidized in preference to sulphate ion: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2 + 4\\text{H}^+ + 4e^-$.\nProducts: $\\text{H}_2$ at cathode and $\\text{O}_2$ at anode.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Products of Electrolysis"
  },
  // Q42
  {
    question_text: "For oxidation reaction $A \\rightarrow A^{n+} + ne^-$, Nernst equation is $E = E^\\circ_{\\text{oxi}} - \\frac{0.059}{n}\\log[A^{n+}]$, curve is :",
    option_a: "Straight line with positive slope",
    option_b: "Hyperbola",
    option_c: "Parabola",
    option_d: "Straight line with negative slope passing through intercept $E^\\circ_{\\text{oxi}}$",
    correct_option: "D",
    explanation: "The Nernst equation for oxidation is $E = E^\\circ_{\\text{oxi}} - \\frac{0.059}{n}\\log[A^{n+}]$. Comparing with linear form $y = c - mx$, the plot of $E$ versus $\\log[A^{n+}]$ is a straight line with a negative slope ($-\\frac{0.059}{n}$) and vertical intercept $E^\\circ_{\\text{oxi}}$.",
    diagram_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793205364/edvedum_electrochemistry/q42_oxidation_nernst_graphs.png",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation Graphs"
  },
  // Q43
  {
    question_text: "Calculate the emf of the following cell at $25^\\circ\\text{C}$:\n$$\\text{Ag}(s) | \\text{AgNO}_3(0.02\\text{ M}) || \\text{AgNO}_3(0.10\\text{ M}) | \\text{Ag}(s)$$",
    option_a: "$-0.028\\text{ V}$",
    option_b: "$-0.414\\text{ V}$",
    option_c: "$0.414\\text{ V}$",
    option_d: "$0.0414\\text{ V}$",
    correct_option: "D",
    explanation: "For an electrolyte concentration cell ($n = 1$):\n$$E_{\\text{cell}} = \\frac{0.0591}{1}\\log\\left(\\frac{C_2}{C_1}\\right) = 0.0591\\log\\left(\\frac{0.10}{0.02}\\right) = 0.0591\\log(5)$$\n$$E_{\\text{cell}} = 0.0591 \\times 0.6990 = 0.0413\\text{ V} \\approx 0.0414\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // Q44
  {
    question_text: "The standard reduction potential of $\\text{Pb}$ and $\\text{Zn}$ electrodes are $-0.126$ and $-0.763\\text{ V}$ respectively. The emf of the cell $\\text{Zn} | \\text{Zn}^{2+}(0.1\\text{ M}) || \\text{Pb}^{2+}(1\\text{ M}) | \\text{Pb}$ is",
    option_a: "$0.637\\text{ V}$",
    option_b: "$< 0.637\\text{ V}$",
    option_c: "$> 0.637\\text{ V}$",
    option_d: "$0.889\\text{ V}$",
    correct_option: "C",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{Pb}^{2+}/\\text{Pb}} - E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.126 - (-0.763) = +0.637\\text{ V}$$\nBy Nernst equation:\n$$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{2}\\log\\left(\\frac{[\\text{Zn}^{2+}]}{[\\text{Pb}^{2+}]}\\right) = 0.637 - \\frac{0.0591}{2}\\log\\left(\\frac{0.1}{1}\\right)$$\n$$E_{\\text{cell}} = 0.637 - \\frac{0.0591}{2}(-1) = 0.637 + 0.02955 = 0.6665\\text{ V} > 0.637\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation"
  },
  // Q45
  {
    question_text: "Select incorrect statement",
    option_a: "On increasing dilution specific conductance increases",
    option_b: "On increasing dilution equivalent conductance increases",
    option_c: "A standard hydrogen electrode has electrode potential",
    option_d: "Unit of molar conductance is $\\text{ohm}^{-1}\\text{ cm}^2\\text{ mol}^{-1}$",
    correct_option: "A",
    explanation: "Specific conductance decreases with increase in dilution because the number of current-carrying ions per unit volume of solution decreases. Hence statement (A) is incorrect.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolytic Conductance"
  },
  // Q46
  {
    question_text: "Calculate $E^\\circ_{\\text{MnO}_4^{2-}/\\text{MnO}_2}$ given that $E^\\circ_{\\text{MnO}_4^-/\\text{Mn}^{2+}} = 1.51\\text{ V}$, $E^\\circ_{\\text{MnO}_2/\\text{Mn}^{2+}} = 1.23\\text{ V}$, $E^\\circ_{\\text{MnO}_4^-/\\text{MnO}_4^{2-}} = 0.56\\text{ V}$. Correct option is",
    option_a: "$2.74\\text{ V}$",
    option_b: "$1.28\\text{ V}$",
    option_c: "$2.26\\text{ V}$",
    option_d: "$1.69\\text{ V}$",
    correct_option: "C",
    explanation: "Stepwise reduction of $\\text{MnO}_4^-$:\n1. $\\text{MnO}_4^- + e^- \\rightarrow \\text{MnO}_4^{2-}$, $\\Delta G^\\circ_1 = -1F(0.56) = -0.56F$\n2. $\\text{MnO}_4^{2-} + 2e^- + 4\\text{H}^+ \\rightarrow \\text{MnO}_2 + 2\\text{H}_2\\text{O}$, $\\Delta G^\\circ_2 = -2F E^\\circ$\n3. $\\text{MnO}_2 + 2e^- + 4\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 2\\text{H}_2\\text{O}$, $\\Delta G^\\circ_3 = -2F(1.23) = -2.46F$\nOverall: $\\text{MnO}_4^- + 5e^- + 8\\text{H}^+ \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$, $\\Delta G^\\circ_{\\text{net}} = -5F(1.51) = -7.55F$\n$$\\Delta G^\\circ_1 + \\Delta G^\\circ_2 + \\Delta G^\\circ_3 = \\Delta G^\\circ_{\\text{net}}$$\n$$-0.56F - 2FE^\\circ - 2.46F = -7.55F$$\n$$-2FE^\\circ = -7.55F + 3.02F = -4.53F \\implies E^\\circ = \\frac{4.53}{2} = 2.265\\text{ V} \\approx 2.26\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Latimer Diagrams and Free Energy"
  },
  // Q47
  {
    question_text: "$$\\text{I}_2 + 2e^- \\rightarrow 2\\text{I}^-;\\ E^\\circ = 0.54\\text{ V}$$\n$$\\text{Cl}_2 + 2e^- \\rightarrow 2\\text{Cl}^-;\\ E^\\circ = 1.36\\text{ V}$$\n$$\\text{Mn}^{3+} + e^- \\rightarrow \\text{Mn}^{2+};\\ E^\\circ = 1.5\\text{ V}$$\n$$\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+};\\ E^\\circ = 0.77\\text{ V}$$\n$$\\text{O}_2 + 4\\text{H}^+ + 4e^- \\rightarrow 2\\text{H}_2\\text{O};\\ E^\\circ = 1.23\\text{ V}$$\nWhile $\\text{Fe}^{3+}$ is stable, $\\text{Mn}^{3+}$ is not stable in solution because",
    option_a: "$\\text{O}_2$ oxidises $\\text{Mn}^{2+}$ to $\\text{Mn}^{3+}$",
    option_b: "$\\text{O}_2$ oxidises both $\\text{Mn}^{2+}$ to $\\text{Mn}^{3+}$ and $\\text{Fe}^{2+}$ to $\\text{Fe}^{3+}$",
    option_c: "$\\text{Fe}^{3+}$ oxidises $\\text{H}_2\\text{O}$ to $\\text{O}_2$",
    option_d: "$\\text{Mn}^{3+}$ oxidises $\\text{H}_2\\text{O}$ to $\\text{O}_2$",
    correct_option: "D",
    explanation: "$E^\\circ(\\text{Mn}^{3+}/\\text{Mn}^{2+}) = +1.50\\text{ V}$ is greater than $E^\\circ(\\text{O}_2/\\text{H}_2\\text{O}) = +1.23\\text{ V}$. Therefore, $\\text{Mn}^{3+}$ spontaneously oxidises water to oxygen gas and gets reduced to $\\text{Mn}^{2+}$. In contrast, $E^\\circ(\\text{Fe}^{3+}/\\text{Fe}^{2+}) = 0.77\\text{ V} < 1.23\\text{ V}$, so $\\text{Fe}^{3+}$ cannot oxidise water and is stable in aqueous solution.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Thermodynamic Stability of Oxidation States"
  },
  // Q48
  {
    question_text: "Consider the following cell reaction:\n$$2\\text{Fe}(s) + \\text{O}_2(g) + 4\\text{H}^+(aq) \\rightarrow 2\\text{Fe}^{2+}(aq) + 2\\text{H}_2\\text{O}(l)$$\n$[\\text{Fe}^{2+}] = 10^{-3}\\text{ M}, P(\\text{O}_2) = 0.1\\text{ atm}$ and $E^\\circ = 1.67\\text{ V}$. If $\\text{pH} = 3$, the cell potential at $25^\\circ\\text{C}$ is",
    option_a: "$1.47\\text{ V}$",
    option_b: "$1.77\\text{ V}$",
    option_c: "$1.87\\text{ V}$",
    option_d: "$1.57\\text{ V}$",
    correct_option: "D",
    explanation: "Reaction involves $n = 4$ electrons.\nAt $\\text{pH} = 3$, $[\\text{H}^+] = 10^{-3}\\text{ M}$.\n$$Q = \\frac{[\\text{Fe}^{2+}]^2}{P(\\text{O}_2)[\\text{H}^+]^4} = \\frac{(10^{-3})^2}{(0.1)(10^{-3})^4} = \\frac{10^{-6}}{10^{-1} \\times 10^{-12}} = 10^7$$\n$$E_{\\text{cell}} = 1.67 - \\frac{0.0591}{4}\\log(10^7) = 1.67 - \\frac{0.0591 \\times 7}{4} = 1.67 - 0.1034 = 1.5666\\text{ V} \\approx 1.57\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Nernst Equation and Corrosion"
  },
  // Q49
  {
    question_text: "$$\\text{Cl}_2 (P = 0.9\\text{ atm}) | \\text{NaCl solution} | \\text{Cl}_2 (P = 0.1\\text{ atm})$$ Calculate the potential of the cell",
    option_a: "$0.0282\\text{ V}$",
    option_b: "$-0.0282\\text{ V}$",
    option_c: "$0.056\\text{ V}$",
    option_d: "$-0.056\\text{ V}$",
    correct_option: "B",
    explanation: "At Anode: $2\\text{Cl}^- \\rightarrow \\text{Cl}_2(0.9\\text{ atm}) + 2e^-$\nAt Cathode: $\\text{Cl}_2(0.1\\text{ atm}) + 2e^- \\rightarrow 2\\text{Cl}^-$\nNet cell reaction: $\\text{Cl}_2(0.1\\text{ atm}) \\rightarrow \\text{Cl}_2(0.9\\text{ atm})$ ($n = 2$).\n$$E_{\\text{cell}} = 0 - \\frac{0.0591}{2}\\log\\left(\\frac{0.9}{0.1}\\right) = -0.02955\\log(9) = -0.02955 \\times 0.9542 = -0.0282\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Gas Concentration Cells"
  },
  // Q50
  {
    question_text: "Electrolysis of which of the following solutions will produce a solution of $\\text{pH} < 7$ ?",
    option_a: "$\\text{NaCl}$",
    option_b: "$\\text{NaOH}$",
    option_c: "$\\text{KCl}$",
    option_d: "$\\text{AgNO}_3$",
    correct_option: "D",
    explanation: "During electrolysis of aqueous $\\text{AgNO}_3$ with inert electrodes:\nCathode: $\\text{Ag}^+ + e^- \\rightarrow \\text{Ag}(s)$\nAnode: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^-$\n$\\text{H}^+$ ions remain in solution alongside $\\text{NO}_3^-$ to form dilute $\\text{HNO}_3$, making the solution acidic ($\\text{pH} < 7$).",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis Products and pH"
  },
  // Q51
  {
    question_text: "The cost of electric required to deposit $1\\text{ g}$ of magnesium is Rs. $5.00$. How much would it cost to deposit $10\\text{ g}$ of aluminium ? ($\\text{Al} = 27, \\text{Mg} = 24$)",
    option_a: "Rs. $10.00$",
    option_b: "Rs. $27.00$",
    option_c: "Rs. $44.44$",
    option_d: "Rs. $66.67$",
    correct_option: "D",
    explanation: "Equivalent weight of $\\text{Mg} = \\frac{24}{2} = 12\\text{ g/eq}$.\nEquivalents of $\\text{Mg} = \\frac{1}{12}$.\nCost per equivalent of electricity $= \\frac{5}{1/12} = 60\\text{ Rs/eq}$.\nEquivalent weight of $\\text{Al} = \\frac{27}{3} = 9\\text{ g/eq}$.\nEquivalents of $\\text{Al} = \\frac{10}{9}$.\nTotal cost $= \\frac{10}{9} \\times 60 = \\frac{600}{9} = 66.67\\text{ Rs}$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Second Law"
  },
  // Q52
  {
    question_text: "Select incorrect statement",
    option_a: "The electrolyte in hydrogen - oxygen fuel cell is conc. $\\text{NaOH}$",
    option_b: "Electrode in $\\text{H}_2\\text{-O}_2$ fuel cell is made up of pure carbon",
    option_c: "$\\text{H}_2\\text{-O}_2$ fuel cells are used in space craft to supply electric power",
    option_d: "Hydrocarbons can also be used as fuels in fuel cell",
    correct_option: "B",
    explanation: "In the Bacon $\\text{H}_2\\text{-O}_2$ fuel cell, the electrodes are made of porous carbon impregnated with suitable catalysts (such as finely divided platinum, palladium, or nickel) to catalyze the electrode reactions, not of un-catalyzed pure carbon.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Fuel Cells"
  },
  // Q53
  {
    question_text: "Calculate the EMF of a Daniel cell when the concentration of $\\text{ZnSO}_4$ and $\\text{CuSO}_4$ are $0.001\\text{M}$ and $0.1\\text{M}$ respectively. The standard potential of the cell is $1.1\\text{V}$",
    option_a: "$1.1\\text{ V}$",
    option_b: "$1.159\\text{ V}$",
    option_c: "$-1.459\\text{ V}$",
    option_d: "$1.041\\text{ V}$",
    correct_option: "B",
    explanation: "By Nernst equation for Daniell cell:\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}\\right)$$\n$$E = 1.10 - \\frac{0.0591}{2}\\log\\left(\\frac{10^{-3}}{0.1}\\right) = 1.10 - \\frac{0.0591}{2}\\log(10^{-2})$$\n$$E = 1.10 - \\frac{0.0591}{2}(-2) = 1.10 + 0.0591 = 1.1591\\text{ V} \\approx 1.159\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Daniell Cell EMF"
  },
  // Q54
  {
    question_text: "$$\\text{Pt} | \\text{Cl}_2(2\\text{ atm}) | \\text{HCl} | \\text{Cl}_2(10\\text{ atm}) | \\text{Pt}$$ E.M.F. of the cell at $25^\\circ\\text{C}$ approximately is",
    option_a: "$0.021\\text{ V}$",
    option_b: "$0.012\\text{ V}$",
    option_c: "$-0.021\\text{ V}$",
    option_d: "$-0.012\\text{ V}$",
    correct_option: "A",
    explanation: "At Anode: $2\\text{Cl}^- \\rightarrow \\text{Cl}_2(2\\text{ atm}) + 2e^-$\nAt Cathode: \\text{Cl}_2(10\\text{ atm}) + 2e^- \\rightarrow 2\\text{Cl}^-$\nNet: $\\text{Cl}_2(10\\text{ atm}) \\rightarrow \\text{Cl}_2(2\\text{ atm})$ ($n = 2$).\n$$E = -\\frac{0.0591}{2}\\log\\left(\\frac{2}{10}\\right) = +\\frac{0.0591}{2}\\log(5) = 0.02955 \\times 0.6990 \\approx +0.0207\\text{ V} \\approx 0.021\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // Q55
  {
    question_text: "The $\\text{pK}_{sp}$ of $\\text{AgI}$ is $16$. If the $E^\\circ$ value for $\\text{Ag}^+/\\text{Ag}$ is $0.8\\text{ V}$, find the $E^\\circ$ for the half cell reaction:\n$$\\text{AgI}(s) + e^- \\rightarrow \\text{Ag}(s) + \\text{I}^-(aq)$$",
    option_a: "$+0.16\\text{ V}$",
    option_b: "$-0.16\\text{ V}$",
    option_c: "$-0.47\\text{ V}$",
    option_d: "$-0.3\\text{ V}$",
    correct_option: "B",
    explanation: "$$E^\\circ_{\\text{AgI}/\\text{Ag,I}^-} = E^\\circ_{\\text{Ag}^+/\\text{Ag}} - 0.0591\\times \\text{pK}_{sp}$$\nTaking $0.06\\text{ V}$ for factor:\n$$E^\\circ = 0.80 - (0.06 \\times 16) = 0.80 - 0.96 = -0.16\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrode Potential and Solubility Product"
  },
  // Q56
  {
    question_text: "Resistance of a decimolar solution of $\\text{KCl}$ (aq) between two electrodes of $0.02\\text{ metre}$ apart and $0.0004\\text{ m}^2$ in area was found to be $50\\text{ ohm}$. Specific Conductance ($\\kappa$) is",
    option_a: "$0.1\\text{ S m}^{-1}$",
    option_b: "$1\\text{ S m}^{-1}$",
    option_c: "$10\\text{ S m}^{-1}$",
    option_d: "$4 \\times 10^{-4}\\text{ S m}^{-1}$",
    correct_option: "B",
    explanation: "$$\\kappa = \\frac{1}{R} \\times \\frac{l}{A} = \\frac{1}{50\\ \\Omega} \\times \\frac{0.02\\text{ m}}{0.0004\\text{ m}^2} = \\frac{0.02}{0.02} = 1\\text{ S m}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Conductivity Calculation"
  },
  // Q57
  {
    question_text: "The limiting equivalent conductivity of $\\text{NaCl}$, $\\text{KCl}$ and $\\text{KBr}$ are $126.5$, $150.0$ and $151.5\\text{ S cm}^2\\text{ eq}^{-1}$ respectively. The equivalent conductance of $\\text{Br}^-$ is $78.0\\text{ S cm}^2\\text{ eq}^{-1}$. The limiting equivalent ionic conductance for $\\text{Na}^+$ ions would be",
    option_a: "$128$",
    option_b: "$125$",
    option_c: "$49$",
    option_d: "$50$",
    correct_option: "D",
    explanation: "$$\\lambda^\\circ(\\text{K}^+) = \\Lambda^\\circ(\\text{KBr}) - \\lambda^\\circ(\\text{Br}^-) = 151.5 - 78.0 = 73.5\\text{ S cm}^2\\text{ eq}^{-1}$$\n$$\\lambda^\\circ(\\text{Cl}^-) = \\Lambda^\\circ(\\text{KCl}) - \\lambda^\\circ(\\text{K}^+) = 150.0 - 73.5 = 76.5\\text{ S cm}^2\\text{ eq}^{-1}$$\n$$\\lambda^\\circ(\\text{Na}^+) = \\Lambda^\\circ(\\text{NaCl}) - \\lambda^\\circ(\\text{Cl}^-) = 126.5 - 76.5 = 50.0\\text{ S cm}^2\\text{ eq}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Kohlrausch's Law"
  },
  // Q58
  {
    question_text: "Equivalent conductivity of $\\text{Fe}_2(\\text{SO}_4)_3$ is related to its molar conductivity by the expression",
    option_a: "$\\lambda_{eq} = \\lambda_m$",
    option_b: "$\\lambda_{eq} = \\frac{\\lambda_m}{3}$",
    option_c: "$\\lambda_{eq} = 3\\lambda_m$",
    option_d: "$\\lambda_{eq} = \\frac{\\lambda_m}{6}$",
    correct_option: "D",
    explanation: "For an electrolyte $A_x B_y$, $n\\text{-factor} = x \\times |z_+| = y \\times |z_-|$.\nFor $\\text{Fe}_2(\\text{SO}_4)_3$, total positive charge $= 2 \\times 3 = 6$.\n$$\\lambda_m = n \\times \\lambda_{eq} = 6\\lambda_{eq} \\implies \\lambda_{eq} = \\frac{\\lambda_m}{6}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Relation between Molar and Equivalent Conductance"
  },
  // Q59
  {
    question_text: "$E^\\circ$ for $\\text{Cl}_2(g) + 2e^- \\rightarrow 2\\text{Cl}^-(aq)$ is $1.36\\text{ V}$; $E^\\circ$ for $\\text{Cl}^-(aq) \\rightarrow \\frac{1}{2}\\text{Cl}_2(g) + e^-$ is",
    option_a: "$1.36\\text{ V}$",
    option_b: "$-1.36\\text{ V}$",
    option_c: "$-0.68\\text{ V}$",
    option_d: "$0.68\\text{ V}$",
    correct_option: "B",
    explanation: "Electrode potential is an intensive property and does not scale with stoichiometric coefficients. When the reaction direction is reversed, the standard electrode potential changes its sign: $E^\\circ_{\\text{oxi}} = -E^\\circ_{\\text{red}} = -1.36\\text{ V}$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard Electrode Potential"
  },
  // Q60
  {
    question_text: "For a Galvanic cell the cell reaction:\n$$\\text{Mg}(s) + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Cu}(s) + \\text{Mg}^{2+}(aq)$$\n$E^\\circ_{\\text{Mg}^{2+}/\\text{Mg}} = -2.37\\text{ V}$, $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = +0.34\\text{ V}$. Then $E^\\circ_{\\text{cell}}$ is",
    option_a: "$2.03\\text{ V}$",
    option_b: "$-2.71\\text{ V}$",
    option_c: "$2.71\\text{ V}$",
    option_d: "$-2.03\\text{ V}$",
    correct_option: "C",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} - E^\\circ_{\\text{Mg}^{2+}/\\text{Mg}} = 0.34 - (-2.37) = +2.71\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Galvanic Cell EMF"
  },
  // Q61
  {
    question_text: "For the reduction of $\\text{NO}_3^-$ ion in an aqueous solution, $E^\\circ$ is $+0.96\\text{ V}$. Values of $E^\\circ$ for some metal ions are given below:\n$$\\text{V}^{2+}(aq) + 2e^- \\rightarrow \\text{V}\\quad E^\\circ = -1.19\\text{ V}$$\n$$\\text{Fe}^{3+}(aq) + 3e^- \\rightarrow \\text{Fe}\\quad E^\\circ = -0.04\\text{ V}$$\n$$\\text{Au}^{3+}(aq) + 3e^- \\rightarrow \\text{Au}\\quad E^\\circ = +1.40\\text{ V}$$\n$$\\text{Ag}^+(aq) + e^- \\rightarrow \\text{Ag}\\quad E^\\circ = +0.80\\text{ V}$$\nThe pair(s) of metals that can't be oxidised by $\\text{NO}_3^-$ in aqueous solution is",
    option_a: "$\\text{V}$ and $\\text{Ag}$",
    option_b: "$\\text{Ag}$ and $\\text{Fe}$",
    option_c: "$\\text{Au}$ only",
    option_d: "$\\text{Fe}$ and $\\text{V}$",
    correct_option: "C",
    explanation: "For oxidation of metal $M$ by nitrate ion to be spontaneous, $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{reduction}}(\\text{NO}_3^-) - E^\\circ_{\\text{reduction}}(M) > 0 \\implies E^\\circ_{\\text{reduction}}(M) < +0.96\\text{ V}$. Since $\\text{Au}^{3+}/\\text{Au}$ has $E^\\circ = +1.40\\text{ V} > +0.96\\text{ V}$, gold cannot be oxidised by $\\text{NO}_3^-$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Spontaneity and Redox Reactions"
  },
  // Q62
  {
    question_text: "The standard potential at $25^\\circ\\text{C}$ for the following half reaction is given:\n$$\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn}\\quad E^\\circ = -0.762\\text{ V}$$\n$$\\text{Mg}^{2+} + 2e^- \\rightarrow \\text{Mg}\\quad E^\\circ = -2.37\\text{ V}$$\nWhen $\\text{Zn}$ is added to solution of $\\text{MgCl}_2$",
    option_a: "$\\text{ZnCl}_2$ is formed",
    option_b: "$\\text{Mg}$ is precipitated",
    option_c: "$\\text{Zn}$ dissolved in solution",
    option_d: "No reaction takes place",
    correct_option: "D",
    explanation: "Zinc has a higher reduction potential ($-0.762\\text{ V}$) than magnesium ($-2.37\\text{ V}$), meaning zinc is a weaker reducing agent than magnesium. Therefore, zinc cannot displace $\\text{Mg}^{2+}$ from $\\text{MgCl}_2$ solution and no reaction takes place.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series"
  },
  // Q63
  {
    question_text: "The standard electrode potential for the following reaction is $-0.57\\text{ V}$. What is potential at $\\text{pH} = 12.0$ ?\n$$\\text{TeO}_3^{2-}(aq) + 3\\text{H}_2\\text{O} + 4e^- \\rightarrow \\text{Te}(s) + 6\\text{OH}^-(aq)$$",
    option_a: "$-0.17\\text{ V}$",
    option_b: "$+0.21\\text{ V}$",
    option_c: "$-0.39\\text{ V}$",
    option_d: "$+1.05\\text{ V}$",
    correct_option: "C",
    explanation: "At $\\text{pH} = 12$, $\\text{pOH} = 14 - 12 = 2 \\implies [\\text{OH}^-] = 10^{-2}\\text{ M}$.\nBy Nernst equation ($n = 4$):\n$$E = E^\\circ - \\frac{0.0591}{4}\\log[\\text{OH}^-]^6 = -0.57 - \\frac{0.0591 \\times 6}{4}\\log(10^{-2})$$\n$$E = -0.57 - 0.08865 \\times (-2) = -0.57 + 0.1773 = -0.3927\\text{ V} \\approx -0.39\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Nernst Equation and pH"
  },
  // Q64
  {
    question_text: "$$\\text{Co} | \\text{Co}^{2+}(C_1) || \\text{Co}^{2+}(C_2) | \\text{Co}$$ For this cell, $\\Delta G$ will be negative if",
    option_a: "$C_2 > C_1$",
    option_b: "$C_1 > C_2$",
    option_c: "$C_1 = C_2$",
    option_d: "Unpredictable",
    correct_option: "A",
    explanation: "For the concentration cell, cell EMF is:\n$$E_{\\text{cell}} = \\frac{0.0591}{2}\\log\\left(\\frac{C_2}{C_1}\\right)$$\nSince $\\Delta G = -nFE_{\\text{cell}}$, $\\Delta G$ is negative when $E_{\\text{cell}} > 0$. This requires $\\frac{C_2}{C_1} > 1 \\implies C_2 > C_1$.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  }
];
