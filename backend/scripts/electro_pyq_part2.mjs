export const electroPart2 = [
  {
    question_number: 26,
    question_text: "Following limiting molar conductivities are given as:\n$\\Lambda_m^\\circ(\\text{H}_2\\text{SO}_4) = x\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(\\text{K}_2\\text{SO}_4) = y\\text{ S cm}^2\\text{ mol}^{-1}$\n$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOK}) = z\\text{ S cm}^2\\text{ mol}^{-1}$\n\n$\\Lambda_m^\\circ$ (in $\\text{S cm}^2\\text{ mol}^{-1}$) for $\\text{CH}_3\\text{COOH}$ will be:",
    options: [
      "\\frac{(x - y)}{2} + z",
      "x - y + 2z",
      "x + y + z",
      "x - y + z"
    ],
    correct_option: "A",
    solution_text: "By Kohlrausch's law of independent migration of ions:\n$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = \\lambda^\\circ_{\\text{CH}_3\\text{COO}^-} + \\lambda^\\circ_{\\text{H}^+}$\n$= \\Lambda_m^\\circ(\\text{CH}_3\\text{COOK}) + \\frac{1}{2}\\Lambda_m^\\circ(\\text{H}_2\\text{SO}_4) - \\frac{1}{2}\\Lambda_m^\\circ(\\text{K}_2\\text{SO}_4) = z + \\frac{x - y}{2} = \\frac{(x - y)}{2} + z$."
  },
  {
    question_number: 27,
    question_text: "The standard electrode potential ($E^\\circ$) values of $\\text{Al}^{3+}/\\text{Al}$, $\\text{Ag}^+/\\text{Ag}$, $\\text{K}^+/\\text{K}$ and $\\text{Cr}^{3+}/\\text{Cr}$ are $-1.66\\text{ V}$, $0.80\\text{ V}$, $-2.93\\text{ V}$ and $-0.74\\text{ V}$, respectively. The correct decreasing order of reducing power of the metal is:",
    options: [
      "Al > K > Ag > Cr",
      "Ag > Cr > Al > K",
      "K > Al > Cr > Ag",
      "K > Al > Ag > Cr"
    ],
    correct_option: "C",
    solution_text: "A lower (more negative) standard reduction potential means greater ease of oxidation and therefore stronger reducing power.\nGiven $E^\\circ_{\\text{red}}$ values:\n$\\text{K}^+/\\text{K} (-2.93\\text{ V}) < \\text{Al}^{3+}/\\text{Al} (-1.66\\text{ V}) < \\text{Cr}^{3+}/\\text{Cr} (-0.74\\text{ V}) < \\text{Ag}^+/\\text{Ag} (+0.80\\text{ V})$.\nTherefore, decreasing order of reducing power is: $\\text{K} > \\text{Al} > \\text{Cr} > \\text{Ag}$."
  },
  {
    question_number: 28,
    question_text: "For a cell involving one electron $E^\\circ_{\\text{cell}} = 0.59\\text{ V}$ at $298\\text{ K}$, the equilibrium constant for the cell reaction is:\n[Given that $\\frac{2.303 RT}{F} = 0.059\\text{ V}$ at $T = 298\\text{ K}$]",
    options: [
      "1.0 \\times 10^{30}",
      "1.0 \\times 10^{10}",
      "1.0 \\times 10^2",
      "1.0 \\times 10^5"
    ],
    correct_option: "B",
    solution_text: "$E^\\circ_{\\text{cell}} = \\frac{0.059}{n}\\log K_{\\text{eq}}$.\nGiven $n = 1$ and $E^\\circ_{\\text{cell}} = 0.59\\text{ V}$:\n$0.59 = \\frac{0.059}{1}\\log K_{\\text{eq}} \\implies \\log K_{\\text{eq}} = 10 \\implies K_{\\text{eq}} = 1.0 \\times 10^{10}$."
  },
  {
    question_number: 29,
    question_text: "For the cell reaction:\n$2\\text{Fe}^{3+}(\\text{aq}) + 2\\text{I}^-(\\text{aq}) \\rightarrow 2\\text{Fe}^{2+}(\\text{aq}) + \\text{I}_2(\\text{aq})$\n$E^\\circ_{\\text{cell}} = 0.24\\text{ V}$ at $298\\text{ K}$. The standard Gibbs energy ($\\Delta_r G^\\circ$) of the cell reaction is:\n[Given that Faraday constant $F = 96500\\text{ C mol}^{-1}$]",
    options: [
      "46.32 kJ mol^{-1}",
      "23.16 kJ mol^{-1}",
      "-46.32 kJ mol^{-1}",
      "-23.16 kJ mol^{-1}"
    ],
    correct_option: "C",
    solution_text: "Number of electrons involved in the balanced equation is $n = 2$.\n$\\Delta_r G^\\circ = -nFE^\\circ_{\\text{cell}} = -2 \\times 96500\\text{ C mol}^{-1} \\times 0.24\\text{ V} = -46320\\text{ J mol}^{-1} = -46.32\\text{ kJ mol}^{-1}$."
  },
  {
    question_number: 30,
    question_text: "Consider the change in oxidation state of bromine corresponding to different emf values as shown in the given diagram:\n$$\\text{BrO}_4^- \\xrightarrow{1.82\\text{ V}} \\text{BrO}_3^- \\xrightarrow{1.5\\text{ V}} \\text{HBrO} \\xrightarrow{1.595\\text{ V}} \\text{Br}_2 \\xrightarrow{1.0652\\text{ V}} \\text{Br}^-$$\n\nThen the species undergoing disproportionation is:",
    options: [
      "BrO_4^-",
      "BrO_3^-",
      "Br_2",
      "HBrO"
    ],
    correct_option: "D",
    solution_text: "For a species to undergo spontaneous disproportionation, the standard reduction potential for its reduction (potential to the right) must be greater than the standard reduction potential for its oxidation couple (potential to the left).\nFor $\\text{HBrO}$:\nRight: $E^\\circ(\\text{HBrO}/\\text{Br}_2) = 1.595\\text{ V}$\nLeft: $E^\\circ(\\text{BrO}_3^-/\\text{HBrO}) = 1.5\\text{ V}$\nSince $E^\\circ_{\\text{right}} (1.595\\text{ V}) > E^\\circ_{\\text{left}} (1.5\\text{ V})$, $E^\\circ_{\\text{cell}} = 1.595 - 1.5 = +0.095\\text{ V} > 0$.\nHence $\\text{HBrO}$ undergoes disproportionation."
  },
  {
    question_number: 31,
    question_text: "In the electrochemical cell:\n$\\text{Zn} \\mid \\text{ZnSO}_4(0.01\\text{ M}) \\parallel \\text{CuSO}_4(1.0\\text{ M}) \\mid \\text{Cu}$,\nthe emf of this Daniell cell is $E_1$. When the concentration of $\\text{ZnSO}_4$ is changed to $1.0\\text{ M}$ and that of $\\text{CuSO}_4$ changed to $0.01\\text{ M}$, the emf changes to $E_2$. From the following, which one is the relationship between $E_1$ and $E_2$? (Given, $RT/F = 0.059$)",
    options: [
      "E_1 < E_2",
      "E_1 > E_2",
      "E_2 = 0",
      "E_1 = E_2"
    ],
    correct_option: "B",
    solution_text: "Cell reaction: $\\text{Zn} + \\text{Cu}^{2+} \\rightarrow \\text{Zn}^{2+} + \\text{Cu}$.\n$E = E^\\circ - \\frac{0.059}{2}\\log\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$.\nFor cell 1: $\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = \\frac{0.01}{1.0} = 10^{-2} \\implies E_1 = E^\\circ - 0.0295(-2) = E^\\circ + 0.059\\text{ V}$.\nFor cell 2: $\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]} = \\frac{1.0}{0.01} = 10^2 \\implies E_2 = E^\\circ - 0.0295(2) = E^\\circ - 0.059\\text{ V}$.\nTherefore, $E_1 > E_2$."
  },
  {
    question_number: 32,
    question_text: "The molar conductivity of a $0.5\\text{ mol/dm}^3$ solution of $\\text{AgNO}_3$ with electrolytic conductivity of $5.76 \\times 10^{-3}\\text{ S cm}^{-1}$ at $298\\text{ K}$ is:",
    options: [
      "2.88 S cm^2/mol",
      "11.52 S cm^2/mol",
      "0.086 S cm^2/mol",
      "28.8 S cm^2/mol"
    ],
    correct_option: "B",
    solution_text: "Concentration $c = 0.5\\text{ mol/dm}^3 = 0.5\\text{ M} = 0.5\\text{ mol L}^{-1}$.\n$\\Lambda_m = \\frac{\\kappa \\times 1000}{M} = \\frac{5.76 \\times 10^{-3} \\times 1000}{0.5} = \\frac{5.76}{0.5} = 11.52\\text{ S cm}^2\\text{ mol}^{-1}$."
  },
  {
    question_number: 33,
    question_text: "During the electrolysis of molten sodium chloride, the time required to produce $0.10\\text{ mol}$ of chlorine gas using a current of $3\\text{ amperes}$ is:",
    options: [
      "55 minutes",
      "110 minutes",
      "220 minutes",
      "330 minutes"
    ],
    correct_option: "B",
    solution_text: "Reaction: $2\\text{Cl}^- \\rightarrow \\text{Cl}_2 + 2e^-$.\nProduction of $1\\text{ mol}$ of $\\text{Cl}_2$ requires $2\\text{ F} = 2 \\times 96500\\text{ C}$.\nCharge required for $0.10\\text{ mol}$ of $\\text{Cl}_2 = 0.10 \\times 2 \\times 96500 = 19300\\text{ C}$.\nTime $t = \\frac{Q}{I} = \\frac{19300}{3} = 6433.33\\text{ s} = \\frac{6433.33}{60}\\text{ min} \\approx 107.2\\text{ min} \\approx 110\\text{ minutes}$."
  },
  {
    question_number: 34,
    question_text: "If the $E^\\circ_{\\text{cell}}$ for a given reaction has a negative value, which of the following gives the correct relationships for the values of $\\Delta G^\\circ$ and $K_{\\text{eq}}$?",
    options: [
      "\\Delta G^\\circ > 0; K_{\\text{eq}} < 1",
      "\\Delta G^\\circ > 0; K_{\\text{eq}} > 1",
      "\\Delta G^\\circ < 0; K_{\\text{eq}} > 1",
      "\\Delta G^\\circ < 0; K_{\\text{eq}} < 1"
    ],
    correct_option: "A",
    solution_text: "Since $\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}}$, when $E^\\circ_{\\text{cell}} < 0$, $\\Delta G^\\circ > 0$.\nAlso, $\\Delta G^\\circ = -RT\\ln K_{\\text{eq}}$. For $\\Delta G^\\circ > 0$, $\\ln K_{\\text{eq}} < 0$, so $K_{\\text{eq}} < 1$."
  },
  {
    question_number: 35,
    question_text: "The number of electrons delivered at the cathode during electrolysis by a current of $1\\text{ ampere}$ in $60\\text{ seconds}$ is (charge on electron $= 1.60 \\times 10^{-19}\\text{ C}$):",
    options: [
      "6 \\times 10^{23}",
      "6 \\times 10^{20}",
      "3.75 \\times 10^{20}",
      "7.48 \\times 10^{23}"
    ],
    correct_option: "C",
    solution_text: "Total charge $Q = I \\times t = 1\\text{ A} \\times 60\\text{ s} = 60\\text{ C}$.\nNumber of electrons $n = \\frac{Q}{e} = \\frac{60}{1.60 \\times 10^{-19}} = 37.5 \\times 10^{19} = 3.75 \\times 10^{20}$."
  },
  {
    question_number: 36,
    question_text: "Zinc can be coated on iron to produce galvanized iron but the reverse is not possible. It is because:",
    options: [
      "zinc is lighter than iron",
      "zinc has lower melting point than iron",
      "zinc has lower negative electrode potential than iron",
      "zinc has higher negative electrode potential than iron"
    ],
    correct_option: "D",
    solution_text: "Standard reduction potential of zinc ($E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.76\\text{ V}$) is more negative (higher negative electrode potential) than that of iron ($E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = -0.44\\text{ V}$). Therefore, zinc is more reactive and gets oxidized preferentially, acting as a sacrificial anode."
  },
  {
    question_number: 37,
    question_text: "The pressure of $\\text{H}_2$ required to make the potential of $\\text{H}_2$-electrode zero in pure water at $298\\text{ K}$ is:",
    options: [
      "10^{-10} atm",
      "10^{-4} atm",
      "10^{-14} atm",
      "10^{-12} atm"
    ],
    correct_option: "C",
    solution_text: "For hydrogen electrode: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2$.\nIn pure water at $298\\text{ K}$, $[\\text{H}^+] = 10^{-7}\\text{ M}$.\n$E = E^\\circ - \\frac{0.059}{2}\\log\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2} = 0 - \\frac{0.059}{2}\\log\\left(\\frac{p_{\\text{H}_2}}{(10^{-7})^2}\\right)$.\nFor $E = 0$, $\\log\\left(\\frac{p_{\\text{H}_2}}{10^{-14}}\\right) = 0 \\implies \\frac{p_{\\text{H}_2}}{10^{-14}} = 1 \\implies p_{\\text{H}_2} = 10^{-14}\\text{ atm}$."
  },
  {
    question_number: 38,
    question_text: "Aqueous solution of which of the following compounds is the best conductor of electric current?",
    options: [
      "Hydrochloric acid, HCl",
      "Ammonia, NH_3",
      "Fructose, C_6H_{12}O_6",
      "Acetic acid, C_2H_4O_2"
    ],
    correct_option: "A",
    solution_text: "Hydrochloric acid ($\\text{HCl}$) is a strong electrolyte that dissociates completely into $\\text{H}^+$ and $\\text{Cl}^-$ ions in aqueous solution, providing the highest concentration of mobile ions and thus the greatest electrical conductivity."
  },
  {
    question_number: 39,
    question_text: "A device that converts energy of combustion of fuels like hydrogen and methane, directly into electrical energy is known as:",
    options: [
      "dynamo",
      "Ni-Cd cell",
      "fuel cell",
      "electrolytic cell"
    ],
    correct_option: "C",
    solution_text: "Galvanic cells that are designed to convert the energy of combustion of fuels like hydrogen, methane, methanol, etc., directly into electrical energy are called fuel cells."
  },
  {
    question_number: 40,
    question_text: "When $0.1\\text{ mol }\\text{MnO}_4^{2-}$ is oxidised the quantity of electricity required to completely oxidise $\\text{MnO}_4^{2-}$ to $\\text{MnO}_4^-$ is:",
    options: [
      "96500 C",
      "2 \\times 96500 C",
      "9650 C",
      "96.50 C"
    ],
    correct_option: "C",
    solution_text: "Reaction: $\\text{MnO}_4^{2-} \\rightarrow \\text{MnO}_4^- + e^-$.\n$1\\text{ mol}$ of $\\text{MnO}_4^{2-}$ requires $1\\text{ F} = 96500\\text{ C}$.\nTherefore, $0.1\\text{ mol}$ requires $0.1 \\times 96500 = 9650\\text{ C}$."
  },
  {
    question_number: 41,
    question_text: "The weight of silver (at. wt. $= 108$) displaced by a quantity of electricity which displaces $5600\\text{ mL}$ of $\\text{O}_2$ at STP will be:",
    options: [
      "5.4 g",
      "10.8 g",
      "54.0 g",
      "108.0 g"
    ],
    correct_option: "D",
    solution_text: "At STP, $1\\text{ mol}$ of $\\text{O}_2 = 22400\\text{ mL}$, which requires $4\\text{ F}$ (since $2\\text{O}^{2-} \\rightarrow \\text{O}_2 + 4e^-$).\nNumber of equivalents of $\\text{O}_2 = \\frac{5600\\text{ mL}}{5600\\text{ mL/eq}} = 1\\text{ equivalent}$ ($1\\text{ F}$ of electricity).\n$1\\text{ equivalent}$ ($1\\text{ F}$) of electricity will deposit $1\\text{ equivalent}$ of silver:\nWeight of $\\text{Ag} = 1 \\times \\text{Equivalent weight} = 108.0\\text{ g}$."
  },
  {
    question_number: 42,
    question_text: "Consider the half-cell reduction reactions:\n$\\text{Mn}^{2+} + 2e^- \\rightarrow \\text{Mn}, E^\\circ = -1.18\\text{ V}$\n$\\text{Mn}^{2+} \\rightarrow \\text{Mn}^{3+} + e^-, E^\\circ = -1.51\\text{ V}$\n\nThe $E^\\circ$ for the reaction $3\\text{Mn}^{2+} \\rightarrow \\text{Mn} + 2\\text{Mn}^{3+}$, and possibility of the forward reaction are respectively:",
    options: [
      "-4.18 V and yes",
      "+0.33 V and yes",
      "+2.69 V and no",
      "-2.69 V and no"
    ],
    correct_option: "D",
    solution_text: "1) $\\text{Mn}^{2+} + 2e^- \\rightarrow \\text{Mn}, \\Delta G_1^\\circ = -2F(-1.18) = +2.36F$\n2) $2\\text{Mn}^{2+} \\rightarrow 2\\text{Mn}^{3+} + 2e^-, \\Delta G_2^\\circ = -2F(-1.51) = +3.02F$\nAdding both gives $3\\text{Mn}^{2+} \\rightarrow \\text{Mn} + 2\\text{Mn}^{3+}$:\n$\\Delta G^\\circ = \\Delta G_1^\\circ + \\Delta G_2^\\circ = 2.36F + 3.02F = +5.38F$.\n$E^\\circ = -\\frac{\\Delta G^\\circ}{nF} = -\\frac{5.38F}{2F} = -2.69\\text{ V}$.\nSince $E^\\circ < 0$ ($\\Delta G^\\circ > 0$), the forward reaction is non-spontaneous (no)."
  },
  {
    question_number: 43,
    question_text: "How many gram of cobalt metal will be deposited when a solution of cobalt (II) chloride is electrolyzed with a current of $10\\text{ amperes}$ for $109\\text{ minutes}$ (1 Faraday $= 96,500\\text{ C}$; Atomic mass of $\\text{Co} = 59\\text{ u}$):",
    options: [
      "4.0",
      "20.0",
      "40.0",
      "0.66"
    ],
    correct_option: "B",
    solution_text: "$w = \\frac{M \\cdot I \\cdot t}{n \\cdot F} = \\frac{59 \\times 10 \\times (109 \\times 60)}{2 \\times 96500} = \\frac{59 \\times 65400}{193000} = \\frac{3858600}{193000} \\approx 19.99\\text{ g} \\approx 20.0\\text{ g}$."
  },
  {
    question_number: 44,
    question_text: "At $25^\\circ\\text{C}$ molar conductance of $0.1\\text{ molar}$ aqueous solution of ammonium hydroxide is $9.54\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mol}^{-1}$ and at infinite dilution its molar conductance is $238\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mol}^{-1}$. The degree of ionisation of ammonium hydroxide at the same concentration and temperature is:",
    options: [
      "4.008%",
      "40.800%",
      "2.080%",
      "20.800%"
    ],
    correct_option: "A",
    solution_text: "Degree of ionisation $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ} = \\frac{9.54}{238} \\approx 0.04008 = 4.008\\%$."
  },
  {
    question_number: 45,
    question_text: "A button cell used in watches functions as following:\n$\\text{Zn}(s) + \\text{Ag}_2\\text{O}(s) + \\text{H}_2\\text{O}(l) \\rightleftharpoons 2\\text{Ag}(s) + \\text{Zn}^{2+}(\\text{aq}) + 2\\text{OH}^-(\\text{aq})$\n\nIf half cell potentials are:\n$\\text{Zn}^{2+}(\\text{aq}) + 2e^- \\rightarrow \\text{Zn}(s); E^\\circ = -0.76\\text{ V}$\n$\\text{Ag}_2\\text{O}(s) + \\text{H}_2\\text{O}(l) + 2e^- \\rightarrow 2\\text{Ag}(s) + 2\\text{OH}^-(\\text{aq}); E^\\circ = 0.34\\text{ V}$\n\nThe cell potential will be:",
    options: [
      "0.84 V",
      "1.34 V",
      "1.10 V",
      "0.42 V"
    ],
    correct_option: "C",
    solution_text: "$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34\\text{ V} - (-0.76\\text{ V}) = 0.34 + 0.76 = 1.10\\text{ V}$."
  },
  {
    question_number: 46,
    question_text: "A hydrogen gas electrode is made by dipping platinum wire in a solution of $\\text{HCl}$ of $\\text{pH} = 10$ and by passing hydrogen gas around the platinum wire at one atm pressure. The oxidation potential of electrode would be:",
    options: [
      "0.118 V",
      "1.18 V",
      "0.059 V",
      "0.59 V"
    ],
    correct_option: "D",
    solution_text: "Oxidation half-reaction: $\\frac{1}{2}\\text{H}_2(g, 1\\text{ atm}) \\rightarrow \\text{H}^+(\\text{aq}) + e^-$.\n$E_{\\text{ox}} = E^\\circ_{\\text{ox}} - 0.0591 \\log[\\text{H}^+] = 0.0591(-\\log[\\text{H}^+]) = 0.0591 \\times \\text{pH} = 0.0591 \\times 10 = 0.591\\text{ V} \\approx 0.59\\text{ V}$."
  },
  {
    question_number: 47,
    question_text: "Standard reduction potentials of the half reactions are given below:\n$\\text{F}_2(g) + 2e^- \\rightarrow 2\\text{F}^-(\\text{aq}); E^\\circ = +2.85\\text{ V}$\n$\\text{Cl}_2(g) + 2e^- \\rightarrow 2\\text{Cl}^-(\\text{aq}); E^\\circ = +1.36\\text{ V}$\n$\\text{Br}_2(l) + 2e^- \\rightarrow 2\\text{Br}^-(\\text{aq}); E^\\circ = +1.06\\text{ V}$\n$\\text{I}_2(s) + 2e^- \\rightarrow 2\\text{I}^-(\\text{aq}); E^\\circ = +0.53\\text{ V}$\n\nThe strongest oxidising and reducing agents respectively are:",
    options: [
      "F_2 and I^-",
      "Br_2 and Cl^-",
      "Cl_2 and Br^-",
      "Cl_2 and I_2"
    ],
    correct_option: "A",
    solution_text: "The species with the highest standard reduction potential is the strongest oxidising agent ($\\text{F}_2$, $E^\\circ = +2.85\\text{ V}$).\nThe species with the lowest standard reduction potential has the most readily oxidised reduced form, which is the strongest reducing agent ($\\text{I}^-$, from $\\text{I}_2/\\text{I}^-$ with $E^\\circ = +0.53\\text{ V}$)."
  },
  {
    question_number: 48,
    question_text: "Molar conductivities ($\\Lambda_m^\\circ$) at infinite dilution of $\\text{NaCl}$, $\\text{HCl}$ and $\\text{CH}_3\\text{COONa}$ are $126.4$, $425.9$ and $91.0\\text{ S cm}^2\\text{ mol}^{-1}$ respectively. ($\\Lambda_m^\\circ$) for $\\text{CH}_3\\text{COOH}$ will be:",
    options: [
      "425.5 S cm^2 mol^{-1}",
      "180.5 S cm^2 mol^{-1}",
      "290.8 S cm^2 mol^{-1}",
      "390.5 S cm^2 mol^{-1}"
    ],
    correct_option: "D",
    solution_text: "$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = \\Lambda_m^\\circ(\\text{CH}_3\\text{COONa}) + \\Lambda_m^\\circ(\\text{HCl}) - \\Lambda_m^\\circ(\\text{NaCl})$\n$= 91.0 + 425.9 - 126.4 = 516.9 - 126.4 = 390.5\\text{ S cm}^2\\text{ mol}^{-1}$."
  },
  {
    question_number: 49,
    question_text: "The Gibb's energy for the decomposition of $\\text{Al}_2\\text{O}_3$ at $500^\\circ\\text{C}$ is as follows:\n$\\frac{2}{3}\\text{Al}_2\\text{O}_3 \\rightarrow \\frac{4}{3}\\text{Al} + \\text{O}_2$\n$\\Delta_r G = +960\\text{ kJ mol}^{-1}$\n\nThe potential difference needed for the electrolytic reduction of aluminium oxide ($\\text{Al}_2\\text{O}_3$) at $500^\\circ\\text{C}$ is at least:",
    options: [
      "4.5 V",
      "3.0 V",
      "2.5 V",
      "5.0 V"
    ],
    correct_option: "C",
    solution_text: "In the decomposition of $\\frac{2}{3}\\text{Al}_2\\text{O}_3$ to $\\text{O}_2$, $2\\text{O}^{2-} \\rightarrow \\text{O}_2 + 4e^-$, so $n = 4$ electrons.\n$\\Delta G^\\circ = -nFE_{\\text{cell}} \\implies 960 \\times 10^3\\text{ J} = -4 \\times 96500 \\times E_{\\text{cell}}$\n$E_{\\text{cell}} = -\\frac{960000}{386000} \\approx -2.487\\text{ V}$.\nThus, a potential difference of at least $2.5\\text{ V}$ is needed."
  },
  {
    question_number: 50,
    question_text: "Limiting molar conductivity of $\\text{NH}_4\\text{OH}$ [i.e. $\\Lambda_m^\\circ(\\text{NH}_4\\text{OH})$] is equal to:",
    options: [
      "\\Lambda_m^\\circ(\\text{NH}_4\\text{OH}) + \\Lambda_m^\\circ(\\text{NaCl}) - \\Lambda_m^\\circ(\\text{NaOH})",
      "\\Lambda_m^\\circ(\\text{NaOH}) + \\Lambda_m^\\circ(\\text{NaCl}) - \\Lambda_m^\\circ(\\text{NH}_4\\text{Cl})",
      "\\Lambda_m^\\circ(\\text{NH}_4\\text{OH}) + \\Lambda_m^\\circ(\\text{NH}_4\\text{Cl}) - \\Lambda_m^\\circ(\\text{HCl})",
      "\\Lambda_m^\\circ(\\text{NH}_4\\text{Cl}) + \\Lambda_m^\\circ(\\text{NaOH}) - \\Lambda_m^\\circ(\\text{NaCl})"
    ],
    correct_option: "D",
    solution_text: "According to Kohlrausch's law:\n$\\Lambda_m^\\circ(\\text{NH}_4\\text{OH}) = \\lambda^\\circ_{\\text{NH}_4^+} + \\lambda^\\circ_{\\text{OH}^-}$ \n$= (\\lambda^\\circ_{\\text{NH}_4^+} + \\lambda^\\circ_{\\text{Cl}^-}) + (\\lambda^\\circ_{\\text{Na}^+} + \\lambda^\\circ_{\\text{OH}^-}) - (\\lambda^\\circ_{\\text{Na}^+} + \\lambda^\\circ_{\\text{Cl}^-})$\n$= \\Lambda_m^\\circ(\\text{NH}_4\\text{Cl}) + \\Lambda_m^\\circ(\\text{NaOH}) - \\Lambda_m^\\circ(\\text{NaCl})$."
  }
];

