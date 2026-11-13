export const electroPart3 = [
  {
    question_number: 51,
    question_text: "A solution contains $\\text{Fe}^{2+}$, $\\text{Fe}^{3+}$ and $\\text{I}^-$ ions. This solution was treated with iodine at $35^\\circ\\text{C}$. $E^\\circ$ for $\\text{Fe}^{3+}/\\text{Fe}^{2+}$ is $+0.77\\text{ V}$ and $E^\\circ$ for $\\text{I}_2/2\\text{I}^- = 0.536\\text{ V}$. The favourable redox reaction is:",
    options: [
      "I_2 will be reduced to I^-",
      "there will be no redox reaction",
      "I^- will be oxidised to I_2",
      "Fe^{2+} will be oxidised to Fe^{3+}"
    ],
    correct_option: "C",
    solution_text: "Since $E^\\circ(\\text{Fe}^{3+}/\\text{Fe}^{2+}) = +0.77\\text{ V}$ is greater than $E^\\circ(\\text{I}_2/2\\text{I}^-) = +0.536\\text{ V}$, $\\text{Fe}^{3+}$ has a greater tendency to get reduced than $\\text{I}_2$.\nThus, $\\text{Fe}^{3+}$ oxidises $\\text{I}^-$ to $\\text{I}_2$:\n$2\\text{Fe}^{3+} + 2\\text{I}^- \\rightarrow 2\\text{Fe}^{2+} + \\text{I}_2$\n$E^\\circ_{\\text{cell}} = 0.77 - 0.536 = +0.234\\text{ V} > 0$, so $\\text{I}^-$ will be oxidised to $\\text{I}_2$."
  },
  {
    question_number: 52,
    question_text: "Standard electrode potential of three metals X, Y and Z are $-1.2\\text{ V}$, $+0.5\\text{ V}$ and $-3.0\\text{ V}$ respectively. The reducing power of these metals will be:",
    options: [
      "Y > Z > X",
      "Y > X > Z",
      "Z > X > Y",
      "X > Y > Z"
    ],
    correct_option: "C",
    solution_text: "The lower (more negative) the standard reduction potential, the greater the ease of oxidation and the stronger the reducing power.\nGiven $E^\\circ_{\\text{red}}$ values:\n$Z (-3.0\\text{ V}) < X (-1.2\\text{ V}) < Y (+0.5\\text{ V})$.\nTherefore, reducing power order: $Z > X > Y$."
  },
  {
    question_number: 53,
    question_text: "The electrode potentials for $\\text{Cu}^{2+}(\\text{aq}) + e^- \\rightarrow \\text{Cu}^+(\\text{aq})$ and $\\text{Cu}^+(\\text{aq}) + e^- \\rightarrow \\text{Cu}(s)$ are $+0.15\\text{ V}$ and $+0.50\\text{ V}$ respectively. The value of $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}}$ will be:",
    options: [
      "0.500 V",
      "0.325 V",
      "0.650 V",
      "0.150 V"
    ],
    correct_option: "B",
    solution_text: "1) $\\text{Cu}^{2+} + e^- \\rightarrow \\text{Cu}^+, \\Delta G_1^\\circ = -1 \\times F \\times 0.15 = -0.15 F$\n2) $\\text{Cu}^+ + e^- \\rightarrow \\text{Cu}, \\Delta G_2^\\circ = -1 \\times F \\times 0.50 = -0.50 F$\nAdding both gives $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$:\n$\\Delta G^\\circ = \\Delta G_1^\\circ + \\Delta G_2^\\circ = -0.15 F - 0.50 F = -0.65 F$.\nSince $\\Delta G^\\circ = -2 F E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}}$:\n$E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = \\frac{-0.65 F}{-2 F} = +0.325\\text{ V}$."
  },
  {
    question_number: 54,
    question_text: "Standard electrode potential for $\\text{Sn}^{4+}/\\text{Sn}^{2+}$ couple is $+0.15\\text{ V}$ and that for the $\\text{Cr}^{3+}/\\text{Cr}$ couple is $-0.74\\text{ V}$. These two couples in their standard state are connected to make a cell. The cell potential will be:",
    options: [
      "+1.19 V",
      "+0.89 V",
      "+0.18 V",
      "+1.83 V"
    ],
    correct_option: "B",
    solution_text: "Cathode (higher reduction potential): $\\text{Sn}^{4+}/\\text{Sn}^{2+}, E^\\circ_{\\text{cathode}} = +0.15\\text{ V}$.\nAnode (lower reduction potential): $\\text{Cr}^{3+}/\\text{Cr}, E^\\circ_{\\text{anode}} = -0.74\\text{ V}$.\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +0.15\\text{ V} - (-0.74\\text{ V}) = +0.89\\text{ V}$."
  },
  {
    question_number: 55,
    question_text: "Which of the following expressions correctly represents the equivalent conductance at infinite dilution of $\\text{Al}_2(\\text{SO}_4)_3$. Given that $\\lambda^\\circ_{\\text{Al}^{3+}}$ and $\\lambda^\\circ_{\\text{SO}_4^{2-}}$ are the equivalent conductances at infinite dilution of the respective ions?",
    options: [
      "2\\lambda^\\circ_{\\text{Al}^{3+}} + 3\\lambda^\\circ_{\\text{SO}_4^{2-}}",
      "\\lambda^\\circ_{\\text{Al}^{3+}} + \\lambda^\\circ_{\\text{SO}_4^{2-}}",
      "(\\lambda^\\circ_{\\text{Al}^{3+}} + \\lambda^\\circ_{\\text{SO}_4^{2-}}) \\times 6",
      "\\frac{1}{3}\\lambda^\\circ_{\\text{Al}^{3+}} + \\frac{1}{2}\\lambda^\\circ_{\\text{SO}_4^{2-}}"
    ],
    correct_option: "B",
    solution_text: "According to Kohlrausch's law, the equivalent conductance of an electrolyte at infinite dilution is simply the sum of equivalent conductances of its constituent ions (without multiplying by their valencies or stoichiometric coefficients, because equivalent conductances are already defined per equivalent):\n$\\Lambda_{\\text{eq}}^\\circ = \\lambda^\\circ_{\\text{Al}^{3+}} + \\lambda^\\circ_{\\text{SO}_4^{2-}}$."
  },
  {
    question_number: 56,
    question_text: "Consider the following relations for emf of an electrochemical cell:\n(i) $\\text{EMF of cell} = (\\text{Oxidation potential of anode}) - (\\text{Reduction potential of cathode})$\n(ii) $\\text{EMF of cell} = (\\text{Oxidation potential of anode}) + (\\text{Reduction potential of cathode})$\n(iii) $\\text{EMF of cell} = (\\text{Reduction potential of anode}) + (\\text{Reduction potential of cathode})$\n(iv) $\\text{EMF of cell} = (\\text{Oxidation potential of anode}) - (\\text{Oxidation potential of cathode})$\n\nWhich of the above relations are correct?",
    options: [
      "(iii) and (i)",
      "(i) and (ii)",
      "(iii) and (iv)",
      "(ii) and (iv)"
    ],
    correct_option: "D",
    solution_text: "$\\text{EMF} = E^\\circ_{\\text{ox}}(\\text{anode}) + E^\\circ_{\\text{red}}(\\text{cathode})$ (Statement ii).\nSince $E^\\circ_{\\text{red}}(\\text{cathode}) = -E^\\circ_{\\text{ox}}(\\text{cathode})$, $\\text{EMF} = E^\\circ_{\\text{ox}}(\\text{anode}) - E^\\circ_{\\text{ox}}(\\text{cathode})$ (Statement iv).\nHence relations (ii) and (iv) are correct."
  },
  {
    question_number: 57,
    question_text: "For the reduction of silver ions with copper metal, the standard cell potential was found to be $+0.46\\text{ V}$ at $25^\\circ\\text{C}$. The value of standard Gibb's energy, $\\Delta G^\\circ$ will be:\n($F = 96500\\text{ C mol}^{-1}$)",
    options: [
      "-89.0 kJ",
      "-89.0 J",
      "-44.5 kJ",
      "-98.0 kJ"
    ],
    correct_option: "A",
    solution_text: "Reaction: $\\text{Cu}(s) + 2\\text{Ag}^+(\\text{aq}) \\rightarrow \\text{Cu}^{2+}(\\text{aq}) + 2\\text{Ag}(s)$.\nHere $n = 2$.\n$\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}} = -2 \\times 96500\\text{ C mol}^{-1} \\times 0.46\\text{ V} = -88780\\text{ J} \\approx -89.0\\text{ kJ}$."
  },
  {
    question_number: 58,
    question_text: "An increase in equivalent conductance of a strong electrolyte with dilution is mainly due to:",
    options: [
      "increase in ionic mobility of ions",
      "100% ionisation of electrolyte at normal dilution",
      "increase in both i.e., number of ions and ionic mobility of ions",
      "increase in number of ions."
    ],
    correct_option: "A",
    solution_text: "A strong electrolyte is already almost 100% ionised at all practical concentrations. Dilution increases the distance between ions, which weakens inter-ionic attractions and thereby increases ionic mobility, leading to higher equivalent conductance."
  },
  {
    question_number: 59,
    question_text: "Given:\n(i) $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}, E^\\circ = 0.337\\text{ V}$\n(ii) $\\text{Cu}^{2+} + e^- \\rightarrow \\text{Cu}^+, E^\\circ = 0.153\\text{ V}$\n\nElectrode potential, $E^\\circ$ for the reaction,\n$\\text{Cu}^+ + e^- \\rightarrow \\text{Cu}$, will be:",
    options: [
      "0.90 V",
      "0.30 V",
      "0.38 V",
      "0.52 V"
    ],
    correct_option: "D",
    solution_text: "$\\Delta G_1^\\circ = -2F(0.337) = -0.674F$.\n$\\Delta G_2^\\circ = -1F(0.153) = -0.153F$.\nSubtracting equation (ii) from (i) gives $\\text{Cu}^+ + e^- \\rightarrow \\text{Cu}$:\n$\\Delta G_3^\\circ = \\Delta G_1^\\circ - \\Delta G_2^\\circ = -0.674F - (-0.153F) = -0.521F$.\n$E_3^\\circ = -\\frac{\\Delta G_3^\\circ}{1F} = +0.521\\text{ V} \\approx 0.52\\text{ V}$."
  },
  {
    question_number: 60,
    question_text: "$\\text{Al}_2\\text{O}_3$ is reduced by electrolysis at low potentials and high currents. If $4.0 \\times 10^4\\text{ amperes}$ of current is passed through molten $\\text{Al}_2\\text{O}_3$ for $6\\text{ hours}$, what mass of aluminium is produced? (Assume $100\\%$ current efficiency, at. mass of $\\text{Al} = 27\\text{ g mol}^{-1}$):",
    options: [
      "8.1 \\times 10^4 g",
      "2.4 \\times 10^5 g",
      "1.3 \\times 10^4 g",
      "9.0 \\times 10^3 g"
    ],
    correct_option: "A",
    solution_text: "Reaction: $\\text{Al}^{3+} + 3e^- \\rightarrow \\text{Al}$, so $n = 3$.\nTotal charge $Q = I \\times t = (4.0 \\times 10^4) \\times (6 \\times 3600) = 8.64 \\times 10^8\\text{ C}$.\nMass of $\\text{Al} = \\frac{M \\cdot Q}{n \\cdot F} = \\frac{27 \\times 8.64 \\times 10^8}{3 \\times 96500} = \\frac{9 \\times 8.64 \\times 10^8}{96500} \\approx 8.058 \\times 10^4\\text{ g} \\approx 8.1 \\times 10^4\\text{ g}$."
  },
  {
    question_number: 61,
    question_text: "The equivalent conductance of $\\text{M}/32$ solution of a weak monobasic acid is $8.0\\text{ mho cm}^2$ and at infinite dilution is $400\\text{ mho cm}^2$. The dissociation constant of this acid is:",
    options: [
      "1.25 \\times 10^{-6}",
      "6.25 \\times 10^{-4}",
      "1.25 \\times 10^{-4}",
      "1.25 \\times 10^{-5}"
    ],
    correct_option: "D",
    solution_text: "Degree of dissociation $\\alpha = \\frac{\\Lambda_c}{\\Lambda_0} = \\frac{8.0}{400} = 0.02$.\nConcentration $c = \\frac{1}{32}\\text{ M}$.\n$K_a = \\frac{c\\alpha^2}{1 - \\alpha} \\approx c\\alpha^2 = \\frac{1}{32} \\times (0.02)^2 = \\frac{4 \\times 10^{-4}}{32} = 0.125 \\times 10^{-4} = 1.25 \\times 10^{-5}$."
  },
  {
    question_number: 62,
    question_text: "On the basis of the following $E^\\circ$ values, the strongest oxidizing agent is:\n$[\\text{Fe(CN)}_6]^{4-} \\rightarrow [\\text{Fe(CN)}_6]^{3-} + e^-; E^\\circ = -0.35\\text{ V}$\n$\\text{Fe}^{2+} \\rightarrow \\text{Fe}^{3+} + e^-; E^\\circ = -0.77\\text{ V}$",
    options: [
      "Fe^{3+}",
      "[Fe(CN)_6]^{3-}",
      "[Fe(CN)_6]^{4-}",
      "Fe^{2+}"
    ],
    correct_option: "A",
    solution_text: "Given oxidation potentials:\n$E^\\circ_{\\text{ox}}([\\text{Fe(CN)}_6]^{4-}/[\\text{Fe(CN)}_6]^{3-}) = -0.35\\text{ V} \\implies E^\\circ_{\\text{red}}([\\text{Fe(CN)}_6]^{3-}/[\\text{Fe(CN)}_6]^{4-}) = +0.35\\text{ V}$.\n$E^\\circ_{\\text{ox}}(\\text{Fe}^{2+}/\\text{Fe}^{3+}) = -0.77\\text{ V} \\implies E^\\circ_{\\text{red}}(\\text{Fe}^{3+}/\\text{Fe}^{2+}) = +0.77\\text{ V}$.\nThe species with the higher standard reduction potential has the greatest tendency to accept electrons and is the strongest oxidizing agent: $\\text{Fe}^{3+}$ ($+0.77\\text{ V}$). Thus $\\text{Fe}^{3+}$ is the strongest oxidizing agent."
  },
  {
    question_number: 63,
    question_text: "Kohlrausch's law states that at:",
    options: [
      "Infinite dilution, each ion makes definite contribution to conductance of an electrolyte whatever be the nature of the other ion of the electrolyte",
      "Infinite dilution, each ion makes definite contribution to equivalent conductance of an electrolyte, whatever be the nature of the other ion of the electrolyte",
      "Finite dilution, each ion makes definite contribution to equivalent conductance of an electrolyte, whatever be the nature of the other ion of the electrolyte",
      "Infinite dilution each ion makes definite contribution to equivalent conductance of an electrolyte depending on the nature of the other ion of the electrolyte."
    ],
    correct_option: "B",
    solution_text: "Kohlrausch's law of independent migration of ions states that at infinite dilution, when dissociation is complete, each ion makes a definite and independent contribution towards the equivalent conductance of the electrolyte, irrespective of the nature of the other ion with which it is associated."
  },
  {
    question_number: 64,
    question_text: "Standard free energies of formation (in $\\text{kJ/mol}$) at $298\\text{ K}$ are $-237.2$, $-394.4$ and $-8.2$ for $\\text{H}_2\\text{O}(l)$, $\\text{CO}_2(g)$ and pentane ($g$) respectively. The value of $E^\\circ_{\\text{cell}}$ for the pentane-oxygen fuel cell is:",
    options: [
      "1.0968 V",
      "0.0968 V",
      "1.968 V",
      "2.0968 V"
    ],
    correct_option: "A",
    solution_text: "Combustion reaction: $\\text{C}_5\\text{H}_{12}(g) + 8\\text{O}_2(g) \\rightarrow 5\\text{CO}_2(g) + 6\\text{H}_2\\text{O}(l)$.\n$\\Delta G^\\circ = [5\\Delta G_f^\\circ(\\text{CO}_2) + 6\\Delta G_f^\\circ(\\text{H}_2\\text{O})] - \\Delta G_f^\\circ(\\text{C}_5\\text{H}_{12})$\n$= [5(-394.4) + 6(-237.2)] - (-8.2) = [-1972 - 1423.2] + 8.2 = -3395.2 + 8.2 = -3387.0\\text{ kJ/mol}$.\nEach $\\text{O}_2$ gains $4e^-$, so for $8\\text{O}_2$, $n = 8 \\times 4 = 32$.\n$E^\\circ_{\\text{cell}} = -\\frac{\\Delta G^\\circ}{nF} = \\frac{3387.0 \\times 10^3}{32 \\times 96500} = \\frac{3387000}{3088000} \\approx 1.0968\\text{ V}$."
  },
  {
    question_number: 65,
    question_text: "The equilibrium constant of the reaction:\n$\\text{Cu}(s) + 2\\text{Ag}^+(\\text{aq}) \\rightarrow \\text{Cu}^{2+}(\\text{aq}) + 2\\text{Ag}(s)$;\n$E^\\circ = 0.46\\text{ V}$ at $298\\text{ K}$ is:",
    options: [
      "2.0 \\times 10^{10}",
      "4.0 \\times 10^{10}",
      "4.0 \\times 10^{15}",
      "2.4 \\times 10^{10}"
    ],
    correct_option: "C",
    solution_text: "$E^\\circ = \\frac{0.0591}{n} \\log K_c$, with $n = 2$.\n$0.46 = \\frac{0.0591}{2} \\log K_c \\implies \\log K_c = \\frac{0.46 \\times 2}{0.0591} = \\frac{0.92}{0.0591} \\approx 15.567$.\n$K_c = 10^{15.567} \\approx 3.7 \\times 10^{15} \\approx 4.0 \\times 10^{15}$."
  },
  {
    question_number: 66,
    question_text: "The efficiency of a fuel cell is given by:",
    options: [
      "\\Delta G/\\Delta S",
      "\\Delta G/\\Delta H",
      "\\Delta S/\\Delta G",
      "\\Delta H/\\Delta G"
    ],
    correct_option: "B",
    solution_text: "Thermodynamic efficiency of a fuel cell is defined as the ratio of maximum useful electrical work (Gibbs free energy change $\\Delta G$) to total heat of combustion (enthalpy change $\\Delta H$):\n$\\eta = \\frac{\\Delta G}{\\Delta H}$."
  },
  {
    question_number: 67,
    question_text: "A hypothetical electrochemical cell is shown below:\n$$A \\mid A^+(x\\text{ M}) \\parallel B^+(y\\text{ M}) \\mid B$$\nThe emf measured is $+0.20\\text{ V}$. The cell reaction is:",
    options: [
      "A + B^+ -> A^+ + B",
      "A^+ + B -> A + B^+",
      "A^+ + e^- -> A; B^+ + e^- -> B",
      "the cell reaction cannot be predicted."
    ],
    correct_option: "A",
    solution_text: "By convention, the anode (oxidation) is written on the left and the cathode (reduction) on the right.\nAnode oxidation: $A \\rightarrow A^+ + e^-$.\nCathode reduction: $B^+ + e^- \\rightarrow B$.\nOverall spontaneous cell reaction: $A + B^+ \\rightarrow A^+ + B$."
  },
  {
    question_number: 68,
    question_text: "$E^\\circ_{\\text{Fe}^{2+}/\\text{Fe}} = -0.441\\text{ V}$ and $E^\\circ_{\\text{Fe}^{3+}/\\text{Fe}^{2+}} = 0.771\\text{ V}$, the standard EMF of the reaction $\\text{Fe} + 2\\text{Fe}^{3+} \\rightarrow 3\\text{Fe}^{2+}$ will be:",
    options: [
      "0.111 V",
      "0.330 V",
      "1.653 V",
      "1.212 V"
    ],
    correct_option: "D",
    solution_text: "Anode (oxidation of Fe): $\\text{Fe} \\rightarrow \\text{Fe}^{2+} + 2e^-, E^\\circ_{\\text{ox}} = +0.441\\text{ V}$.\nCathode (reduction of $\\text{Fe}^{3+}$): $2\\text{Fe}^{3+} + 2e^- \\rightarrow 2\\text{Fe}^{2+}, E^\\circ_{\\text{red}} = +0.771\\text{ V}$.\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{ox}} + E^\\circ_{\\text{red}} = 0.441 + 0.771 = +1.212\\text{ V}$."
  },
  {
    question_number: 69,
    question_text: "$4.5\\text{ g}$ of aluminium (at. mass $27\\text{ amu}$) is deposited at cathode from $\\text{Al}^{3+}$ solution by a certain quantity of electric charge. The volume of hydrogen produced at STP from $\\text{H}^+$ ions in solution by the same quantity of electric charge will be:",
    options: [
      "44.8 L",
      "22.4 L",
      "11.2 L",
      "5.6 L"
    ],
    correct_option: "D",
    solution_text: "Equivalents of $\\text{Al} = \\frac{\\text{mass}}{\\text{eq. wt}} = \\frac{4.5}{27/3} = \\frac{4.5}{9} = 0.5\\text{ equivalents}$.\nAccording to Faraday's second law of electrolysis, the same quantity of electricity will liberate $0.5\\text{ equivalents}$ of hydrogen gas.\n$1\\text{ equivalent}$ of $\\text{H}_2$ at STP $= 11.2\\text{ L}$.\nVolume of $\\text{H}_2$ liberated $= 0.5 \\times 11.2 = 5.6\\text{ L}$."
  },
  {
    question_number: 70,
    question_text: "The mass of carbon anode consumed (giving only carbon dioxide) in the production of $270\\text{ kg}$ of aluminium metal from bauxite by the Hall process is (Atomic mass: $\\text{Al} = 27$):",
    options: [
      "270 kg",
      "540 kg",
      "90 kg",
      "180 kg"
    ],
    correct_option: "C",
    solution_text: "Overall reaction in Hall-Heroult cell: $2\\text{Al}_2\\text{O}_3 + 3\\text{C} \\rightarrow 4\\text{Al} + 3\\text{CO}_2$.\n$4\\text{ moles of Al}$ ($4 \\times 27 = 108\\text{ g}$) require $3\\text{ moles of C}$ ($3 \\times 12 = 36\\text{ g}$).\nMass of carbon consumed for $270\\text{ kg}$ of $\\text{Al} = \\frac{36}{108} \\times 270\\text{ kg} = \\frac{1}{3} \\times 270\\text{ kg} = 90\\text{ kg}$."
  },
  {
    question_number: 71,
    question_text: "The standard e.m.f. of a galvanic cell involving cell reaction with $n = 2$ is found to be $0.295\\text{ V}$ at $25^\\circ\\text{C}$. The equilibrium constant of the reaction would be:",
    options: [
      "2.0 \\times 10^{11}",
      "4.0 \\times 10^{12}",
      "1.0 \\times 10^2",
      "1.0 \\times 10^{10}"
    ],
    correct_option: "D",
    solution_text: "$E^\\circ_{\\text{cell}} = \\frac{0.0591}{n} \\log K_c \\implies 0.295 = \\frac{0.0591}{2} \\log K_c \\approx 0.0295 \\log K_c$.\n$\\log K_c = \\frac{0.295}{0.02955} = 10 \\implies K_c = 1.0 \\times 10^{10}$."
  },
  {
    question_number: 72,
    question_text: "The e.m.f. of a Daniell cell at $298\\text{ K}$ is $E_1$.\n$$\\text{Zn} \\mid \\text{ZnSO}_4(0.01\\text{ M}) \\parallel \\text{CuSO}_4(1.0\\text{ M}) \\mid \\text{Cu}$$\nWhen the concentration of $\\text{ZnSO}_4$ is $1.0\\text{ M}$ and that of $\\text{CuSO}_4$ is $0.01\\text{ M}$, the e.m.f. changed to $E_2$. What is the relationship between $E_1$ and $E_2$?",
    options: [
      "E_1 > E_2",
      "E_1 < E_2",
      "E_1 = E_2",
      "E_2 = 0 \\neq E_1"
    ],
    correct_option: "A",
    solution_text: "$E_{\\text{cell}} = E^\\circ - \\frac{0.0591}{2}\\log\\frac{[\\text{Zn}^{2+}]}{[\\text{Cu}^{2+}]}$.\n$E_1 = E^\\circ - 0.02955 \\log(0.01/1.0) = E^\\circ - 0.02955(-2) = E^\\circ + 0.0591\\text{ V}$.\n$E_2 = E^\\circ - 0.02955 \\log(1.0/0.01) = E^\\circ - 0.02955(2) = E^\\circ - 0.0591\\text{ V}$.\nClearly, $E_1 > E_2$."
  },
  {
    question_number: 73,
    question_text: "On the basis of the information available from the reaction:\n$\\frac{4}{3}\\text{Al} + \\text{O}_2 \\rightarrow \\frac{2}{3}\\text{Al}_2\\text{O}_3, \\Delta G = -827\\text{ kJ mol}^{-1}\\text{ of }\\text{O}_2$,\nthe minimum e.m.f. required to carry out an electrolysis of $\\text{Al}_2\\text{O}_3$ is:\n($F = 96500\\text{ C mol}^{-1}$)",
    options: [
      "2.14 V",
      "4.28 V",
      "6.42 V",
      "8.56 V"
    ],
    correct_option: "A",
    solution_text: "For $1\\text{ mole of }\\text{O}_2$, $n = 4$ electrons.\n$\\Delta G = -nFE \\implies -827 \\times 10^3\\text{ J} = -4 \\times 96500 \\times E$.\n$E = \\frac{827000}{386000} \\approx 2.1425\\text{ V} \\approx 2.14\\text{ V}$."
  },
  {
    question_number: 74,
    question_text: "Which reaction is not feasible?",
    options: [
      "2KI + Br_2 -> 2KBr + I_2",
      "2KBr + I_2 -> 2KI + Br_2",
      "2KBr + Cl_2 -> 2KCl + Br_2",
      "2H_2O + 2F_2 -> 4HF + O_2"
    ],
    correct_option: "B",
    solution_text: "The standard reduction potential order is $\\text{F}_2 (+2.87\\text{ V}) > \\text{Cl}_2 (+1.36\\text{ V}) > \\text{Br}_2 (+1.09\\text{ V}) > \\text{I}_2 (+0.54\\text{ V})$.\nA halogen with higher reduction potential can displace a halogen with lower reduction potential from its salt solution. Since $\\text{I}_2$ has a lower reduction potential than $\\text{Br}_2$, $\\text{I}_2$ cannot oxidize $\\text{Br}^-$ to $\\text{Br}_2$. Thus, $2\\text{KBr} + \\text{I}_2 \\rightarrow 2\\text{KI} + \\text{Br}_2$ is not feasible."
  },
  {
    question_number: 75,
    question_text: "In electrolysis of $\\text{NaCl}$ when $\\text{Pt}$ electrode is taken then $\\text{H}_2$ is liberated at cathode while with $\\text{Hg}$ cathode it forms sodium amalgam:",
    options: [
      "Hg is more inert than Pt",
      "More voltage is required to reduce H^+ at Hg than at Pt",
      "Na is dissolved in Hg while it does not dissolve in Pt",
      "Conc. of H^+ ions is larger when Pt electrode is taken."
    ],
    correct_option: "B",
    solution_text: "On a mercury cathode, hydrogen has a very high overvoltage (overpotential), which makes the discharge of $\\text{H}^+$ energetically unfavorable. Consequently, reduction of $\\text{Na}^+$ to sodium occurs in preference to $\\text{H}^+$, and sodium dissolves in mercury to form sodium amalgam."
  }
];

