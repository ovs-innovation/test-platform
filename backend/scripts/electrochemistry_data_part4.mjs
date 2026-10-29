// electrochemistry_data_part4.mjs - Questions 95 to 107, 173 to 182, and Section B AR 1 to 16 (39 questions)

export const ELECTROCHEMISTRY_PART4 = [
  // Q95
  {
    question_text: "The resistance of solution A is $100\\ \\Omega$ and resistance of solution B is $200\\ \\Omega$ in same conductivity cell. Equal volume of solution A and B are mixed and taken in same cell. The resistance of mixture is",
    option_a: "$133.33\\ \\Omega$",
    option_b: "$166.66\\ \\Omega$",
    option_c: "$150\\ \\Omega$",
    option_d: "$175\\ \\Omega$",
    correct_option: "A",
    explanation: "Let the cell constant be $G^*$.\nConductivity of solution A: $\\kappa_A = \\frac{G^*}{R_A} = \\frac{G^*}{100}$\nConductivity of solution B: $\\kappa_B = \\frac{G^*}{R_B} = \\frac{G^*}{200}$\nWhen equal volumes are mixed, conductivity of mixture is:\n$$\\kappa_{\\text{mix}} = \\frac{\\kappa_A + \\kappa_B}{2} = \\frac{G^*}{2}\\left(\\frac{1}{100} + \\frac{1}{200}\\right) = \\frac{3G^*}{400}$$\n$$R_{\\text{mix}} = \\frac{G^*}{\\kappa_{\\text{mix}}} = \\frac{400}{3} = 133.33\\ \\Omega$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Conductance of Mixtures"
  },
  // Q96
  {
    question_text: "The specific conductance of saturated solution of $\\text{AgCl}$ is $1.24 \\times 10^{-6}\\ \\Omega^{-1}\\text{ cm}^{-1}$. Molar conductance at infinite dilution of $\\text{AgCl}$ is $138\\ \\Omega^{-1}\\text{ cm}^2\\text{ mol}^{-1}$. The solubility of $\\text{AgCl}$ in $\\text{mole/L}$ is",
    option_a: "$0.9 \\times 10^{-5}\\text{ M}$",
    option_b: "$1.04 \\times 10^{-5}\\text{ M}$",
    option_c: "$1.5 \\times 10^{-5}\\text{ M}$",
    option_d: "$2 \\times 10^{-5}\\text{ M}$",
    correct_option: "A",
    explanation: "$$S = \\frac{\\kappa \\times 1000}{\\Lambda_m^\\circ} = \\frac{1.24 \\times 10^{-6} \\times 1000}{138} = \\frac{1.24 \\times 10^{-3}}{138} = 8.985 \\times 10^{-6}\\text{ mol L}^{-1} \\approx 0.9 \\times 10^{-5}\\text{ M}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Solubility of Sparingly Soluble Salts"
  },
  // Q97
  {
    question_text: "Emf of a cell $\\text{Ni} | \\text{Ni}^{2+}(1\\text{M}) || \\text{Au}^{3+}(1\\text{M}) | \\text{Au}$ is $\\dots$ if $E^\\circ$ for $\\text{Ni}^{2+}/\\text{Ni}$ is $-0.25\\text{ V}$, $E^\\circ$ for $\\text{Au}^{3+}/\\text{Au}$ is $1.50\\text{ V}$",
    option_a: "$+1.25\\text{ V}$",
    option_b: "$-1.75\\text{ V}$",
    option_c: "$+1.75\\text{ V}$",
    option_d: "$-1.25\\text{ V}$",
    correct_option: "C",
    explanation: "$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = E^\\circ_{\\text{Au}^{3+}/\\text{Au}} - E^\\circ_{\\text{Ni}^{2+}/\\text{Ni}} = 1.50 - (-0.25) = +1.75\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard Cell EMF"
  },
  // Q98
  {
    question_text: "In order to get greater value of emf of a cell",
    option_a: "Concentration of anode solution should be lower than cathode solution",
    option_b: "Concentration of anode solution should be higher than cathode solution",
    option_c: "Concentration of anode and cathode solution should be $2\\text{ M}$ and $1\\text{ M}$ respectively",
    option_d: "None of these",
    correct_option: "A",
    explanation: "According to the Nernst equation: $E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{RT}{nF}\\ln\\left(\\frac{[\\text{Anode}]}{[\\text{Cathode}]}\\right)$. To increase $E_{\\text{cell}}$, the reaction quotient $Q = \\frac{[\\text{Anode}]}{[\\text{Cathode}]}$ must be minimized, meaning anode concentration should be lower than cathode concentration.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Nernst Equation Factors"
  },
  // Q99
  {
    question_text: "If $E_1^\\circ$ is standard electrode potential for $\\text{Fe}/\\text{Fe}^{2+}$ and $E_2^\\circ$ is for $\\text{Fe}^{2+}/\\text{Fe}^{3+}$ and $E_3^\\circ$ for $\\text{Fe}/\\text{Fe}^{3+}$ then which of the following relation is correct?",
    option_a: "$E_3^\\circ = \\frac{2E_1^\\circ + E_2^\\circ}{3}$",
    option_b: "$E_3^\\circ = E_1^\\circ + E_2^\\circ$",
    option_c: "$E_3^\\circ = E_1^\\circ - E_2^\\circ$",
    option_d: "$E_3^\\circ = 2E_1^\\circ + 3E_2^\\circ$",
    correct_option: "A",
    explanation: "Using Gibbs free energy conservation:\n$$\\Delta G_3^\\circ = \\Delta G_1^\\circ + \\Delta G_2^\\circ$$\n$$-3FE_3^\\circ = -2FE_1^\\circ - 1FE_2^\\circ \\implies 3E_3^\\circ = 2E_1^\\circ + E_2^\\circ \\implies E_3^\\circ = \\frac{2E_1^\\circ + E_2^\\circ}{3}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrode Potentials and Free Energy"
  },
  // Q100
  {
    question_text: "A cell is constructed as follows:\n$$\\text{Pt} | \\text{H}_2(1\\text{ atm}) | \\text{HA}_1 || \\text{HA}_2 | \\text{H}_2(1\\text{ atm})$$\nIf the pH of two acid solution $\\text{HA}_1$ and $\\text{HA}_2$ are $5$ and $3$ respectively. The e.m.f. of the cell is",
    option_a: "$0.059\\text{ V}$",
    option_b: "$0.0295\\text{ V}$",
    option_c: "$0.118\\text{ V}$",
    option_d: "$-0.118\\text{ V}$",
    correct_option: "C",
    explanation: "At anode: $[\\text{H}^+]_1 = 10^{-5}\\text{ M}$ ($\\text{pH}_1 = 5$).\nAt cathode: $[\\text{H}^+]_2 = 10^{-3}\\text{ M}$ ($\\text{pH}_2 = 3$).\n$$E_{\\text{cell}} = 0.0591 \\times (\\text{pH}_1 - \\text{pH}_2) = 0.0591 \\times (5 - 3) = 0.0591 \\times 2 = 0.1182\\text{ V} \\approx 0.118\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells and pH"
  },
  // Q101
  {
    question_text: "In the electrolysis of copper chloride solution using copper electrodes, the mass of cathode increases by $3.175\\text{ g}$. At the anode,",
    option_a: "$560\\text{ ml of }\\text{O}_2\\text{ at STP will be liberated}$",
    option_b: "$112\\text{ ml of }\\text{Cl}_2\\text{ will liberate}$",
    option_c: "$3.2\\text{ mol of copper metal will dissolve}$",
    option_d: "$0.05\\text{ mole of Cu will dissolve}$",
    correct_option: "D",
    explanation: "When copper electrodes are used in the electrolysis of copper salt, active dissolution of copper occurs at the anode: $\\text{Cu}(s) \\rightarrow \\text{Cu}^{2+} + 2e^-$.\nThe mass of copper dissolved at the anode equals the mass deposited at the cathode ($3.175\\text{ g}$):\n$$\\text{Moles of Cu dissolved} = \\frac{3.175\\text{ g}}{63.5\\text{ g mol}^{-1}} = 0.05\\text{ mol}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis with Active Electrodes"
  },
  // Q102
  {
    question_text: "A cell contains two hydrogen electrodes. Anode is in contact with a solution of $10^{-4}\\text{ M }\\text{H}^+$ ions. EMF of cell is $0.118\\text{ V}$ at $25^\\circ\\text{C}$. pH of cathode is",
    option_a: "$1$",
    option_b: "$2$",
    option_c: "$3$",
    option_d: "$-1$",
    correct_option: "B",
    explanation: "For a hydrogen concentration cell:\n$$E_{\\text{cell}} = 0.0591(\\text{pH}_{\\text{anode}} - \\text{pH}_{\\text{cathode}})$$\nSince $[\\text{H}^+]_{\\text{anode}} = 10^{-4}\\text{ M}$, $\\text{pH}_{\\text{anode}} = 4$.\n$$0.118 = 0.0591(4 - \\text{pH}_{\\text{cathode}}) \\implies 2 = 4 - \\text{pH}_{\\text{cathode}} \\implies \\text{pH}_{\\text{cathode}} = 2$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Hydrogen Concentration Cells"
  },
  // Q103
  {
    question_text: "When electric current is passed through a cell having an electrolyte, the positive ions move towards the cathode and negative ions towards anode. If the cathode is pulled out of this solution",
    option_a: "The positive ion and negative ions both move towards the anode",
    option_b: "The positive ions will start moving towards anode, the negative ions will stop moving",
    option_c: "The negative ions will continue to move towards the anode; the positive ion will stop moving",
    option_d: "The positive ions and negative ions will start moving randomly",
    correct_option: "D",
    explanation: "Pulling the cathode out breaks the electrical circuit, extinguishing the electric field between electrodes. In the absence of an applied potential gradient, both cations and anions lose their directional drift and engage exclusively in random thermal motion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Mechanism of Electrolytic Conduction"
  },
  // Q104
  {
    question_text: "Four colourless salt solutions are placed in separate test tubes and a strip of copper is kept in each, which solution finally turns blue?",
    option_a: "$\\text{Pb(NO}_3)_2$",
    option_b: "$\\text{Zn(NO}_3)_2$",
    option_c: "$\\text{AgNO}_3$",
    option_d: "$\\text{Cd(NO}_3)_2$",
    correct_option: "C",
    explanation: "Copper has a lower reduction potential ($+0.34\\text{ V}$) than silver ($+0.80\\text{ V}$), so $\\text{Cu}$ spontaneously reduces $\\text{Ag}^+$ to $\\text{Ag}$:\n$$\\text{Cu}(s) + 2\\text{Ag}^+(aq) \\rightarrow \\text{Cu}^{2+}(aq) + 2\\text{Ag}(s)$$\nThe hydrated $\\text{Cu}^{2+}$ ions impart a characteristic blue color to the solution. Copper cannot displace lead, zinc, or cadmium because their standard reduction potentials are negative.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical Series"
  },
  // Q105
  {
    question_text: "What will be $E_{\\text{quinhydrone}}$ at $\\text{pH} = 2$ ?\nGiven $E^\\circ_{\\text{quinhydrone}} = 1.30\\text{ V}$ for:\n$$\\text{Q} + 2\\text{H}^+ + 2e^- \\rightleftharpoons \\text{QH}_2$$",
    option_a: "$1.36\\text{ V}$",
    option_b: "$1.30\\text{ V}$",
    option_c: "$1.42\\text{ V}$",
    option_d: "$1.20\\text{ V}$",
    correct_option: "D",
    explanation: "The reduction half-reaction is $\\text{Q} + 2\\text{H}^+ + 2e^- \\rightleftharpoons \\text{QH}_2$.\nBy Nernst equation:\n$$E = E^\\circ - \\frac{0.0591}{2}\\log\\left(\\frac{1}{[\\text{H}^+]^2}\\right) = E^\\circ - 0.0591\\text{pH}$$\n$$E = 1.30 - (0.0591 \\times 2) = 1.30 - 0.1182 \\approx 1.182\\text{ V} \\approx 1.20\\text{ V}$$",
    diagram_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793205364/edvedum_electrochemistry/q105_quinhydrone_scheme.png",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Quinhydrone Electrode"
  },
  // Q106
  {
    question_text: "When an aqueous solution of lithium chloride is electrolysed using graphite electrodes",
    option_a: "pH of the resulting solution increases",
    option_b: "pH of the resulting solution decreases",
    option_c: "As the current flows, pH of the solution around the cathode increases",
    option_d: "pH of solution increases till it becomes 7",
    correct_option: "C",
    explanation: "Because lithium has a very negative reduction potential ($-3.05\\text{ V}$), water is reduced preferentially at the cathode:\n$$2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2(g) + 2\\text{OH}^-(aq)$$\nThe local concentration of hydroxide ions increases around the cathode, causing the local pH to rise significantly.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Electrolysis Products and pH"
  },
  // Q107
  {
    question_text: "Certain quantity of electricity is passed through voltmeters connected in series and containing $\\text{XSO}_4(aq)$ and $\\text{Y}_2\\text{SO}_4(aq)$ respectively. The atomic masses of X and Y are in the ratio $1:2$, the ratio of the masses of Y liberated to that of X is",
    option_a: "$1 : 1$",
    option_b: "$1 : 2$",
    option_c: "$2 : 1$",
    option_d: "$4 : 1$",
    correct_option: "D",
    explanation: "In $\\text{XSO}_4$, oxidation state of X is $+2 \\implies E_X = \\frac{M_X}{2}$.\nIn $\\text{Y}_2\\text{SO}_4$, oxidation state of Y is $+1 \\implies E_Y = \\frac{M_Y}{1}$.\nGiven $\\frac{M_X}{M_Y} = \\frac{1}{2} \\implies M_Y = 2M_X$.\n$$E_Y = 2M_X$$\nBy Faraday's second law:\n$$\\frac{W_Y}{W_X} = \\frac{E_Y}{E_X} = \\frac{2M_X}{M_X/2} = \\frac{4}{1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Second Law"
  },
  // Q173
  {
    question_text: "The value of $E_{2\\text{H}^+/\\text{H}_2}$ is",
    option_a: "Is zero",
    option_b: "Depends on concentration",
    option_c: "Is +ve always",
    option_d: "Is -ve always",
    correct_option: "B",
    explanation: "By Nernst equation, the potential of the hydrogen electrode is $E = -\\frac{0.0591}{2}\\log\\left(\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2}\\right)$. It is defined as zero only under standard conditions ($[\\text{H}^+] = 1\\text{ M}$, $p_{\\text{H}_2} = 1\\text{ bar}$); under any other conditions, its value depends directly on the concentration of $\\text{H}^+$ and pressure of $\\text{H}_2$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard Hydrogen Electrode"
  },
  // Q174
  {
    question_text: "An electrochemical cell can behave like an electrolytic cell when",
    option_a: "$E_{\\text{ext}} > E_{\\text{cell}}$",
    option_b: "$E_{\\text{ext}} < E_{\\text{cell}}$",
    option_c: "$E_{\\text{ext}} = 0$",
    option_d: "$E_{\\text{ext}} = E_{\\text{cell}}$",
    correct_option: "A",
    explanation: "When an external opposing electromotive force ($E_{\\text{ext}}$) greater than the galvanic cell potential ($E_{\\text{cell}}$) is applied, the direction of electron flow reverses, forcing non-spontaneous chemical reactions to proceed, thereby functioning as an electrolytic cell.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrochemical vs Electrolytic Cells"
  },
  // Q175
  {
    question_text: "Consider the following EMF diagram for $\\text{Fe}$:\n$$\\text{FeO}_4^{2-} \\xrightarrow{2.20\\text{ V}} \\text{Fe}^{3+} \\xrightarrow{0.77\\text{ V}} \\text{Fe}^{2+}$$\nThe value for $E^\\circ_{\\text{FeO}_4^{2-}/\\text{Fe}^{2+}}$ will be",
    option_a: "$7.37\\text{ V}$",
    option_b: "$3.685\\text{ V}$",
    option_c: "$2.455\\text{ V}$",
    option_d: "$1.843\\text{ V}$",
    correct_option: "D",
    explanation: "In $\\text{FeO}_4^{2-}$, iron has oxidation state $+6$.\nStep 1: $\\text{Fe}^{+6} + 3e^- \\rightarrow \\text{Fe}^{3+}$, $n_1 = 3, E_1^\\circ = 2.20\\text{ V}$\nStep 2: $\\text{Fe}^{3+} + 1e^- \\rightarrow \\text{Fe}^{2+}$, $n_2 = 1, E_2^\\circ = 0.77\\text{ V}$\nOverall: $\\text{Fe}^{+6} + 4e^- \\rightarrow \\text{Fe}^{2+}$, $n = 4$\n$$n E^\\circ = n_1 E_1^\\circ + n_2 E_2^\\circ = 3(2.20) + 1(0.77) = 6.60 + 0.77 = 7.37\\text{ V}$$\n$$E^\\circ = \\frac{7.37}{4} = 1.8425\\text{ V} \\approx 1.843\\text{ V}$$",
    diagram_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793205365/edvedum_electrochemistry/q175_iron_latimer_diagram.png",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Latimer Diagrams"
  },
  // Q176
  {
    question_text: "The amount of electricity required to obtain $10\\text{ mole of Al}$ from molten $\\text{AlCl}_3$ is",
    option_a: "$10\\text{ F}$",
    option_b: "$60\\text{ F}$",
    option_c: "$20\\text{ F}$",
    option_d: "$30\\text{ F}$",
    correct_option: "D",
    explanation: "Reduction of aluminium: $\\text{Al}^{3+} + 3e^- \\rightarrow \\text{Al}$.\n$1\\text{ mole of Al}$ requires $3\\text{ Faradays}$ of electricity.\n$$\\text{Electricity for }10\\text{ moles of Al} = 10 \\times 3\\text{ F} = 30\\text{ F}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Faraday's Laws"
  },
  // Q177
  {
    question_text: "Oxide that can be reduce by hydrogen",
    option_a: "$\\text{Na}_2\\text{O}$",
    option_b: "$\\text{MgO}$",
    option_c: "$\\text{Al}_2\\text{O}_3$",
    option_d: "$\\text{CuO}$",
    correct_option: "D",
    explanation: "Metals positioned below hydrogen in the electrochemical series (like $\\text{Cu}$) have lower affinity for oxygen compared to hydrogen. Thus, black copper(II) oxide is easily reduced by dihydrogen to reddish copper metal:\n$$\\text{CuO} + \\text{H}_2 \\rightarrow \\text{Cu} + \\text{H}_2\\text{O}$$",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Ellingham and Electrochemical Principles"
  },
  // Q178
  {
    question_text: "The rusting of iron takes place by these two half reactions:\n$$2\\text{H}^+ + 2e^- + \\frac{1}{2}\\text{O}_2 \\rightarrow \\text{H}_2\\text{O}(l);\\quad E^\\circ = 1.23\\text{ V}$$\n$$\\text{Fe} \\rightarrow \\text{Fe}^{2+} + 2e^-;\\quad E^\\circ = -0.44\\text{ V}$$\nThe $\\Delta G^\\circ$ for the net process is",
    option_a: "$-322\\text{ kJ/mol}$",
    option_b: "$-161\\text{ kJ/mol}$",
    option_c: "$-152\\text{ kJ/mol}$",
    option_d: "$-76\\text{ kJ/mol}$",
    correct_option: "A",
    explanation: "Net reaction: $\\text{Fe} + 2\\text{H}^+ + \\frac{1}{2}\\text{O}_2 \\rightarrow \\text{Fe}^{2+} + \\text{H}_2\\text{O}$ ($n = 2$).\n$$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 1.23 - (-0.44) = 1.67\\text{ V}$$\n$$\\Delta G^\\circ = -nFE^\\circ = -2 \\times 96500 \\times 1.67 = -322,310\\text{ J mol}^{-1} \\approx -322\\text{ kJ mol}^{-1}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Corrosion Thermodynamics"
  },
  // Q179
  {
    question_text: "The products of electrolysis of $\\text{AgNO}_3(aq)$ using Ag electrodes are:\n$$\\text{Cathode} \\quad / \\quad \\text{Anode}$$",
    option_a: "$\\text{Ag}^+ \\quad / \\quad \\text{Ag}$",
    option_b: "$\\text{Ag} \\quad / \\quad \\text{O}_2$",
    option_c: "$\\text{Ag} \\quad / \\quad \\text{Ag}^+$",
    option_d: "$\\text{Ag}^+ \\quad / \\quad \\text{Ag}^+$",
    correct_option: "C",
    explanation: "When active silver electrodes are used:\n- At cathode: $\\text{Ag}^+ + e^- \\rightarrow \\text{Ag}(s)$ (metallic silver is deposited).\n- At anode: $\\text{Ag}(s) \\rightarrow \\text{Ag}^+ + e^-$ (silver anode dissolves into solution as $\\text{Ag}^+$ ions).",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolysis with Attackable Electrodes"
  },
  // Q180
  {
    question_text: "Cathodic and anodic product when dilute aqueous solution of $\\text{Na}_2\\text{SO}_4$ is electrolysed using inert electrode are respectively",
    option_a: "$\\text{H}_2, \\text{O}_2$",
    option_b: "$\\text{Na}, \\text{O}_2$",
    option_c: "$\\text{O}_2, \\text{H}_2\\text{O}$",
    option_d: "$\\text{Na}, \\text{SO}_2$",
    correct_option: "A",
    explanation: "In dilute $\\text{Na}_2\\text{SO}_4$ aqueous solution with inert electrodes:\n- Cathode: Reduction of water occurs preferentially over $\\text{Na}^+$: $2\\text{H}_2\\text{O} + 2e^- \\rightarrow \\text{H}_2(g) + 2\\text{OH}^-$.\n- Anode: Oxidation of water occurs preferentially over $\\text{SO}_4^{2-}$: $2\\text{H}_2\\text{O} \\rightarrow \\text{O}_2(g) + 4\\text{H}^+ + 4e^-$.\nProducts: $\\text{H}_2$ at cathode and $\\text{O}_2$ at anode.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolysis Products"
  },
  // Q181
  {
    question_text: "The reduction potential of hydrogen electrode at $5\\text{ atm}$ and $\\text{pH} = 2$ is",
    option_a: "$-0.14\\text{ volt}$",
    option_b: "$-0.041\\text{ volt}$",
    option_c: "$-0.39\\text{ volt}$",
    option_d: "$+0.08\\text{ volt}$",
    correct_option: "A",
    explanation: "For the hydrogen electrode reduction: $2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2(g)$:\n$$E = 0 - \\frac{0.0591}{2}\\log\\left(\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2}\\right)$$\nAt $\\text{pH} = 2$, $[\\text{H}^+] = 10^{-2}\\text{ M} \\implies [\\text{H}^+]^2 = 10^{-4}$.\n$$\\frac{p_{\\text{H}_2}}{[\\text{H}^+]^2} = \\frac{5}{10^{-4}} = 5 \\times 10^4$$\n$$\\log(5 \\times 10^4) = 4 + 0.6990 = 4.6990$$\n$$E = -0.02955 \\times 4.6990 = -0.1388\\text{ V} \\approx -0.14\\text{ V}$$",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Hydrogen Electrode Potential"
  },
  // Q182
  {
    question_text: "If $E^\\circ_{\\text{reduction}}$ of $\\text{I}_2 < \\text{Br}_2 < \\text{Cl}_2$, then $\\text{Br}_2(l)$ can",
    option_a: "Oxidise $\\text{I}^-$ to $\\text{I}_2$ and $\\text{Cl}^-$ to $\\text{Cl}_2$",
    option_b: "Oxidise only $\\text{Cl}^-$ to $\\text{Cl}_2$",
    option_c: "Oxidise only $\\text{I}^-$ to $\\text{I}_2$",
    option_d: "Cannot oxidise $\\text{I}^-$ and $\\text{Cl}^-$",
    correct_option: "C",
    explanation: "A halogen with a higher reduction potential can oxidise halide ions of halogens with lower reduction potentials. Since $E^\\circ(\\text{Br}_2/\\text{Br}^-) > E^\\circ(\\text{I}_2/\\text{I}^-)$ but $E^\\circ(\\text{Br}_2/\\text{Br}^-) < E^\\circ(\\text{Cl}_2/\\text{Cl}^-)$, bromine can oxidise only $\\text{I}^-$ to $\\text{I}_2$, but cannot oxidise $\\text{Cl}^-$.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Halogen Redox Displacements"
  },

  // ==========================================
  // SECTION B: Assertion - Reason Type Questions
  // ==========================================
  // AR 1
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** Corrosion of metals is essentially electrochemical phenomenon.\n**Reason (R):** Corrosion of iron metal can be prevented by galvanization.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "Corrosion is an electrochemical phenomenon because non-uniform surfaces develop micro-galvanic cells with anodic and cathodic regions where redox reactions take place. Galvanization (coating iron with zinc) is a protective method based on sacrificial protection. Both statements are true, but galvanization does not explain why corrosion is an electrochemical process.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Corrosion"
  },
  // AR 2
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** $E^\\circ_{\\text{cell}}$ is zero for concentration cell.\n**Reason (R):** $\\Delta G$ is zero for working concentration cell.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "C",
    explanation: "In a concentration cell, both electrodes are composed of identical materials, so $E^\\circ_{\\text{cathode}} = E^\\circ_{\\text{anode}}$, which means $E^\\circ_{\\text{cell}} = 0$ (Assertion is true). For an operating cell that produces electrical work, the cell potential $E > 0$, so $\\Delta G = -nFE < 0$; it is not zero ($\Delta G = 0$ only at dead equilibrium). Thus, Reason is false.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Concentration Cells"
  },
  // AR 3
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** In galvanic cell anode is negative electrode.\n**Reason (R):** Anode is the source of electron.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "In a galvanic cell, oxidation takes place at the anode, releasing electrons that accumulate on the electrode surface before traveling through the external circuit. Thus, the anode acts as the source of electrons and acquires a negative polarity.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Galvanic Cells"
  },
  // AR 4
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** In electrolysis, the amount of charge required to deposit $1\\text{ mole}$ of $\\text{Ag}$ and $\\text{Zn}$ are different.\n**Reason (R):** Atomic weights of $\\text{Ag}$ and $\\text{Zn}$ are different.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "Depositing $1\\text{ mole of Ag}$ requires $1\\text{ F}$ (since $\\text{Ag}^+ + e^- \\rightarrow \\text{Ag}$), whereas depositing $1\\text{ mole of Zn}$ requires $2\\text{ F}$ (since $\\text{Zn}^{2+} + 2e^- \\rightarrow \\text{Zn}$). The difference in required charge is due to the difference in valency ($n\\text{-factor}$), not atomic weights. Both statements are true, but Reason is not the correct explanation.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws"
  },
  // AR 5
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** A correct electrochemical cell can be formed only if redox reaction is spontaneous in forward direction.\n**Reason (R):** A reaction is spontaneous in forward direction if $E_{\\text{cell}}$ is positive.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "A galvanic electrochemical cell produces electric energy spontaneously. Thermodynamics requires $\\Delta G = -nFE_{\\text{cell}} < 0$, which is satisfied only when $E_{\\text{cell}} > 0$. Both statements are true and Reason correctly explains the Assertion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Cell Feasibility"
  },
  // AR 6
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** For the reaction, $E^\\circ = E_1^\\circ + E_2^\\circ$ is not valid.\n**Reason (R):** For the reaction $\\Delta G^\\circ = \\Delta G_1^\\circ + \\Delta G_2^\\circ$ is valid.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "Standard electrode potential is an intensive property and cannot be directly summed when combining half-reactions involving different numbers of electrons. Free energy change is an extensive thermodynamic property and is strictly additive: $\\Delta G^\\circ = \\Delta G_1^\\circ + \\Delta G_2^\\circ$. Therefore, Reason is the correct explanation of Assertion.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Thermodynamics of Electrode Potentials"
  },
  // AR 7
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** Electrolysis of aqueous $\\text{FeSO}_4$ gives $\\text{Fe}$ at cathode in preference to $\\text{H}_2$.\n**Reason (R):** $E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} < E^\\circ_{\\text{H}^+/\\text{H}_2}$.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "Although $E^\\circ(\\text{Fe}^{2+}/\\text{Fe}) = -0.44\\text{ V} < E^\\circ(\\text{H}^+/\\text{H}_2) = 0.00\\text{ V}$, in concentrated aqueous solutions of $\\text{FeSO}_4$ iron is deposited at the cathode due to the high overvoltage of hydrogen on iron. Both statements are true, but Reason alone does not explain preferential discharge of Fe (in fact lower $E^\\circ$ would favor $\\text{H}_2$).",
    exam_type: "NEET",
    difficulty: "Hard",
    topic: "Overvoltage and Preferential Discharge"
  },
  // AR 8
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** Specific conductivity decreases on dilution.\n**Reason (R):** Number of ions per unit volume decreases on dilution.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "Specific conductivity ($\\kappa$) is the conductance of $1\\text{ cm}^3$ of electrolytic solution. When a solution is diluted, the number of current-carrying ions per unit volume decreases, leading to a decrease in specific conductivity. Reason is the correct explanation of Assertion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Variation of Conductivity with Dilution"
  },
  // AR 9
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** Application of external potential more than cell potential starts reaction in opposite direction.\n**Reason (R):** The cell now functions as an electrolytic cell.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "When $E_{\\text{ext}} > E_{\\text{cell}}$, electrons flow in the reverse direction, converting the cell into an electrolytic cell where external electrical work drives non-spontaneous chemical reactions. Both are true and Reason explains Assertion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Electrolytic vs Electrochemical Cells"
  },
  // AR 10
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** $\\text{Cu}^{2+}$ ions get reduced more easily than $\\text{H}^+$ ions.\n**Reason (R):** $\\text{Cu}^{2+}$ has positive value of standard reduction potential than $\\text{H}^+$ ions.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "$E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0.34\\text{ V}$ is greater than $E^\\circ(\\text{H}^+/\\text{H}_2) = 0.00\\text{ V}$. A more positive reduction potential indicates greater tendency to accept electrons and undergo reduction. Hence, Reason correctly explains Assertion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Standard Reduction Potentials"
  },
  // AR 11
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** With the decrease in standard reduction potential decreases the oxidising power of the species.\n**Reason (R):** Reducing agents has higher reduction potential.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "C",
    explanation: "Lower standard reduction potential means lower tendency to undergo reduction, hence lower oxidising power (Assertion is true). Reducing agents tend to lose electrons (undergo oxidation) and therefore have lower (more negative) reduction potentials, not higher (Reason is false).",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Oxidising and Reducing Power"
  },
  // AR 12
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** EMF does not depend upon the thickness of the electrode.\n**Reason (R):** EMF of cell is an intensive property.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "The electromotive force (EMF) of an electrochemical cell is an intensive thermodynamic property; it depends only on the nature of reactants, their activities/concentrations, and temperature, and is independent of the size, surface area, or thickness of the electrodes.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Properties of Cell EMF"
  },
  // AR 13
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** Conductivity ($\\text{S m}^{-1}$) of $0.01\\text{ M }\\text{KCl}$ will be more than $0.01\\text{ M }\\text{NaCl}$.\n**Reason (R):** Conductivity depends on the nature of the material, temperature and pressure at which measurements are made.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "Conductivity of $0.01\\text{ M }\\text{KCl}$ is higher than $0.01\\text{ M }\\text{NaCl}$ specifically because $\\text{K}^+$ is less hydrated than $\\text{Na}^+$ and has a smaller hydrated ionic radius, giving it higher mobility. While Reason is a true general statement about conductivity, it does not explain why potassium ions specifically conduct better than sodium ions.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Ionic Mobility and Conductivity"
  },
  // AR 14
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** All electrolytes of a particular type have the same value for 'A' in Debye-Huckel Onsager Equation.\n**Reason (R):** $\\text{NaCl}, \\text{CaCl}_2, \\text{MgSO}_4$ are known as 1-1, 2-1, 2-2 type electrolytes respectively.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "According to the Debye-Huckel-Onsager equation ($\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$), the constant $A$ depends only on the charges of ions (the electrolyte type, e.g. 1-1, 2-1), solvent dielectric constant, and temperature. Both statements are true, but Reason merely classifies examples without explaining why constant $A$ depends on the ion valence type.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Debye-Huckel-Onsager Equation"
  },
  // AR 15
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** If $4\\text{ Faraday}$ of electricity is passed through acidified water then $67.2\\text{ L}$ volume of gas is obtained at STP.\n**Reason (R):** On electrolysis of acidified water, $\\text{O}_2$ is obtained at anode.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "B",
    explanation: "$4\\text{ Faradays}$ liberate $2\\text{ moles of }\\text{H}_2(g) = 44.8\\text{ L}$ at cathode and $1\\text{ mole of }\\text{O}_2(g) = 22.4\\text{ L}$ at anode, yielding a total volume of $44.8 + 22.4 = 67.2\\text{ L}$ at STP (Assertion is true). It is also true that $\\text{O}_2$ is liberated at the anode, but this statement alone does not explain the combined quantitative volume calculation.",
    exam_type: "NEET",
    difficulty: "Medium",
    topic: "Faraday's Laws and Gas Volumes"
  },
  // AR 16
  {
    question_text: "In the following question, a statement of assertion (A) is followed by a statement of reason (R):\n**Assertion (A):** The cell potential of mercury cell remains constant during its life.\n**Reason (R):** As the overall reaction does not involve any ion in solution whose concentration can change during its lifetime.",
    option_a: "If both Assertion & Reason are true and reason is the correct explanation of assertion",
    option_b: "If both Assertion & Reason are true but reason is not the correct explanation of assertion",
    option_c: "If Assertion is true statement but Reason is false",
    option_d: "If both Assertion and Reason are false statements",
    correct_option: "A",
    explanation: "In a mercury cell, the overall chemical reaction is:\n$$\\text{Zn(Hg)} + \\text{HgO}(s) \\rightarrow \\text{ZnO}(s) + \\text{Hg}(l)$$\nSince the overall cell reaction does not involve any dissolved ionic species in solution whose concentration changes over time, the cell potential remains virtually constant at $1.35\\text{ V}$ throughout its operating life. Reason correctly explains Assertion.",
    exam_type: "NEET",
    difficulty: "Easy",
    topic: "Mercury Cell"
  }
];
