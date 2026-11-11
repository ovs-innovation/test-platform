export const electroPart1 = [
  {
    question_number: 1,
    question_text: "The standard electrode potential ($E^\\circ$) for the half-cell reaction $\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+}$ at $298\\text{ K}$ is:\n(Given: $E^\\circ(\\text{Fe}^{3+}/\\text{Fe}) = -0.04\\text{ V}$ and $E^\\circ(\\text{Fe}^{2+}/\\text{Fe}) = -0.44\\text{ V}$ at $298\\text{ K}$)",
    options: [
      "+0.92 V",
      "+0.40 V",
      "+0.76 V",
      "-0.48 V"
    ],
    correct_option: "C",
    solution_text: "For $\\text{Fe}^{3+} + 3e^- \\rightarrow \\text{Fe}$, $\\Delta G_1^\\circ = -3 F (-0.04\\text{ V}) = +0.12 F$.\nFor $\\text{Fe}^{2+} + 2e^- \\rightarrow \\text{Fe}$, $\\Delta G_2^\\circ = -2 F (-0.44\\text{ V}) = +0.88 F$.\nFor $\\text{Fe}^{3+} + e^- \\rightarrow \\text{Fe}^{2+}$, subtracting the second reaction from the first gives:\n$\\Delta G_3^\\circ = \\Delta G_1^\\circ - \\Delta G_2^\\circ = 0.12 F - 0.88 F = -0.76 F$.\nSince $\\Delta G_3^\\circ = -1 F E_3^\\circ$, we have:\n$E_3^\\circ = +0.76\\text{ V}$."
  },
  {
    question_number: 2,
    question_text: "For a salt $\\text{XY}$, which is a strong electrolyte, the plot of $\\Lambda_m$ versus $\\sqrt{c}$ has a slope of $-90.0\\text{ S cm}^2\\text{ mol}^{-3/2}\\text{ L}^{1/2}$ at $298\\text{ K}$. At $0.01\\text{ M}$ concentration of $\\text{XY}$, the value of $\\Lambda_m$ is $145.0\\text{ S cm}^2\\text{ mol}^{-1}$. The limiting molar conductivity of $\\text{Y}^-$ ion ($\\lambda^\\circ_{\\text{Y}^-}$ in $\\text{S cm}^2\\text{ mol}^{-1}$) at $298\\text{ K}$ will be:\n(Given: $\\lambda^\\circ_{\\text{X}^+} = 74.0\\text{ S cm}^2\\text{ mol}^{-1}$)",
    options: [
      "76.0",
      "80.0",
      "100.0",
      "90.0"
    ],
    correct_option: "B",
    solution_text: "According to Kohlrausch's equation: $\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$.\nHere, slope $=-A = -90.0$, so $A = 90.0$.\nAt $c = 0.01\\text{ M}$, $\\sqrt{c} = 0.1$.\n$145.0 = \\Lambda_m^\\circ - 90.0(0.1) = \\Lambda_m^\\circ - 9.0$.\n$\\Lambda_m^\\circ = 145.0 + 9.0 = 154.0\\text{ S cm}^2\\text{ mol}^{-1}$.\nAlso, $\\Lambda_m^\\circ(\\text{XY}) = \\lambda^\\circ_{\\text{X}^+} + \\lambda^\\circ_{\\text{Y}^-}$.\n$154.0 = 74.0 + \\lambda^\\circ_{\\text{Y}^-} \\implies \\lambda^\\circ_{\\text{Y}^-} = 154.0 - 74.0 = 80.0\\text{ S cm}^2\\text{ mol}^{-1}$."
  },
  {
    question_number: 3,
    question_text: "A solution of copper sulphate is electrolysed for $10\\text{ minutes}$ with a current of $1.5\\text{ amperes}$. The mass of copper deposited at cathode is:\n(Given: Molar mass of $\\text{Cu} = 63\\text{ g mol}^{-1}$; $1\\text{ F} = 96487\\text{ C mol}^{-1}$)",
    options: [
      "1.7018 g",
      "0.2938 g",
      "2.4036 g",
      "0.5876 g"
    ],
    correct_option: "B",
    solution_text: "Charge passed $Q = I \\times t = 1.5 \\times (10 \\times 60) = 900\\text{ C}$.\nReaction at cathode: $\\text{Cu}^{2+} + 2e^- \\rightarrow \\text{Cu}$.\n$2\\text{ F}$ ($2 \\times 96487\\text{ C}$) deposits $63\\text{ g}$ of $\\text{Cu}$.\nMass of copper deposited $w = \\frac{M \\cdot I \\cdot t}{n \\cdot F} = \\frac{63 \\times 900}{2 \\times 96487} \\approx 0.2938\\text{ g}$."
  },
  {
    question_number: 4,
    question_text: "Calculate emf of the half cell given below:\n$\\text{Pt}(s) \\mid \\text{H}_2(g, 2\\text{ atm}) \\mid \\text{HCl}(\\text{aq}, 0.02\\text{ M})$\n$E^\\circ_{\\text{H}_2/\\text{H}^+} = 0\\text{ V}$\n(Given: $\\frac{2.303 RT}{F} = 0.059$, $\\log 2 = 0.3010$)",
    options: [
      "-0.109 V",
      "0.035 V",
      "-0.035 V",
      "0.109 V"
    ],
    correct_option: "D",
    solution_text: "Half cell oxidation reaction: $\\frac{1}{2}\\text{H}_2(g) \\rightarrow \\text{H}^+(\\text{aq}) + e^-$.\n$E_{\\text{ox}} = E^\\circ_{\\text{ox}} - \\frac{0.059}{1} \\log\\frac{[\\text{H}^+]}{(p_{\\text{H}_2})^{1/2}}$\n$= 0 - 0.059 \\log\\left(\\frac{0.02}{\\sqrt{2}}\\right) = -0.059 \\log\\left(\\frac{2 \\times 10^{-2}}{1.414}\\right) = -0.059 \\log(\\sqrt{2} \\times 10^{-2})$\n$= -0.059 [\\frac{1}{2}(0.3010) - 2] = -0.059 [0.1505 - 2] = -0.059 (-1.8495) \\approx +0.109\\text{ V}$."
  },
  {
    question_number: 5,
    question_text: "If the molar conductivity ($\\Lambda_m$) of a $0.050\\text{ mol L}^{-1}$ solution of a monobasic weak acid is $90\\text{ S cm}^2\\text{ mol}^{-1}$, its extent (degree) of dissociation will be:\n[Assume $\\lambda^\\circ_+ = 349.6\\text{ S cm}^2\\text{ mol}^{-1}$ and $\\lambda^\\circ_- = 50.4\\text{ S cm}^2\\text{ mol}^{-1}$]",
    options: [
      "0.225",
      "0.215",
      "0.115",
      "0.125"
    ],
    correct_option: "A",
    solution_text: "$\\Lambda_m^\\circ = \\lambda^\\circ_+ + \\lambda^\\circ_- = 349.6 + 50.4 = 400.0\\text{ S cm}^2\\text{ mol}^{-1}$.\nDegree of dissociation $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ} = \\frac{90}{400} = 0.225$."
  },
  {
    question_number: 6,
    question_text: "From the following select the one which is not an example of corrosion.",
    options: [
      "Rusting of iron object",
      "Production of hydrogen by electrolysis of water",
      "Tarnishing of silver",
      "Development of green coating on copper and bronze ornaments"
    ],
    correct_option: "B",
    solution_text: "Production of hydrogen by electrolysis of water is an electrolytic process for decomposition of water into hydrogen and oxygen, not an example of oxidative degradation of metals (corrosion)."
  },
  {
    question_number: 7,
    question_text: "The standard cell potential of the following cell $\\text{Zn} \\mid \\text{Zn}^{2+}(\\text{aq}) \\parallel \\text{Fe}^{2+}(\\text{aq}) \\mid \\text{Fe}$ is $0.32\\text{ V}$. Calculate the standard Gibbs energy change for the reaction:\n$\\text{Zn}(s) + \\text{Fe}^{2+}(\\text{aq}) \\rightarrow \\text{Zn}^{2+}(\\text{aq}) + \\text{Fe}(s)$\n(Given: $1\\text{ F} = 96487\\text{ C}$)",
    options: [
      "-61.75 kJ mol^{-1}",
      "+5.006 kJ mol^{-1}",
      "-5.006 kJ mol^{-1}",
      "+61.75 kJ mol^{-1}"
    ],
    correct_option: "A",
    solution_text: "Here $n = 2$ electrons transferred.\n$\\Delta G^\\circ = -nFE^\\circ_{\\text{cell}} = -2 \\times 96487 \\times 0.32\\text{ J mol}^{-1} = -61751.68\\text{ J mol}^{-1} \\approx -61.75\\text{ kJ mol}^{-1}$."
  },
  {
    question_number: 8,
    question_text: "Match List I with List II.\n\nList I (Conversion):\nA. $1\\text{ mole of }\\text{H}_2\\text{O to }\\text{O}_2$\nB. $1\\text{ mol of }\\text{MnO}_4^-\\text{ to }\\text{Mn}^{2+}$\nC. $1.5\\text{ mol of }\\text{Ca from molten }\\text{CaCl}_2$\nD. $1\\text{ mol of }\\text{FeO to }\\text{Fe}_2\\text{O}_3$\n\nList II (Number of Faraday required):\nI. $3\\text{ F}$\nII. $2\\text{ F}$\nIII. $1\\text{ F}$\nIV. $5\\text{ F}$\n\nChoose the correct answer from the options given below:",
    options: [
      "A-II, B-IV, C-I, D-III",
      "A-III, B-IV, C-I, D-II",
      "A-II, B-III, C-I, D-IV",
      "A-III, B-IV, C-II, D-I"
    ],
    correct_option: "A",
    solution_text: "A. $\\text{H}_2\\text{O} \\rightarrow \\frac{1}{2}\\text{O}_2 + 2\\text{H}^+ + 2e^- \\implies 2\\text{ F}$ (A-II)\nB. $\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O} \\implies 5\\text{ F}$ (B-IV)\nC. $\\text{Ca}^{2+} + 2e^- \\rightarrow \\text{Ca}$. For $1.5\\text{ mol}$, $1.5 \\times 2 = 3\\text{ F}$ (C-I)\nD. $\\text{FeO} \\rightarrow \\frac{1}{2}\\text{Fe}_2\\text{O}_3$ involves oxidation of $\\text{Fe}^{2+}$ to $\\text{Fe}^{3+}$ ($1e^-) \\implies 1\\text{ F}$ (D-III).\nTherefore, the correct match is A-II, B-IV, C-I, D-III."
  },
  {
    question_number: 9,
    question_text: "Mass in grams of copper deposited by passing $9.6487\\text{ A}$ current through a voltameter containing copper sulphate solution for $100\\text{ seconds}$ is:\n(Given: Molar mass of $\\text{Cu} = 63\\text{ g mol}^{-1}, 1\\text{ F} = 96487\\text{ C}$)",
    options: [
      "3.15 g",
      "0.315 g",
      "31.5 g",
      "0.0315 g"
    ],
    correct_option: "B",
    solution_text: "$w = \\frac{M \\cdot I \\cdot t}{n \\cdot F} = \\frac{63 \\times 9.6487 \\times 100}{2 \\times 96487} = \\frac{63 \\times 964.87}{2 \\times 96487} = \\frac{63 \\times 0.01}{2} = 0.315\\text{ g}$."
  },
  {
    question_number: 10,
    question_text: "The $E^\\circ$ values for:\n$\\text{Al}^+/\\text{Al} = +0.55\\text{ V}$ and $\\text{Tl}^+/\\text{Tl} = -0.34\\text{ V}$\n$\\text{Al}^{3+}/\\text{Al} = -1.66\\text{ V}$ and $\\text{Tl}^{3+}/\\text{Tl} = +1.26\\text{ V}$\n\nIdentify the incorrect statement:",
    options: [
      "Al is more electropositive than Tl",
      "Tl^{3+} is a better reducing agent than Tl^{1+}",
      "Al^+ is unstable in solution",
      "Tl can be easily oxidised to Tl^+ than Tl^{3+}"
    ],
    correct_option: "B",
    solution_text: "$\\text{Tl}^{3+}$ has a large positive standard reduction potential ($+1.26\\text{ V}$), which means it readily gains electrons and acts as a strong oxidising agent, not a reducing agent. Thus statement (B) is incorrect."
  },
  {
    question_number: 11,
    question_text: "Molar conductance of an electrolyte increases with dilution according to the equation:\n$\\Lambda_m = \\Lambda_m^\\circ - A\\sqrt{c}$\n\nWhich of the following statements are true?\n(A) This equation applies to both strong and weak electrolytes.\n(B) Value of the constant $A$ depends upon the nature of the solvent.\n(C) Value of constant $A$ is same for both $\\text{BaCl}_2$ and $\\text{MgSO}_4$.\n(D) Value of constant $A$ is same for both $\\text{BaCl}_2$ and $\\text{Mg(OH)}_2$.\n\nChoose the most appropriate answer from the options given below:",
    options: [
      "(A) and (B) only",
      "(A), (B) and (C) only",
      "(B) and (C) only",
      "(B) and (D) only"
    ],
    correct_option: "D",
    solution_text: "The Debye-Huckel-Onsager equation applies strictly to strong electrolytes (so A is false).\nConstant $A$ depends on the nature of the solvent and temperature (so B is true).\nThe constant $A$ depends on the electrolyte type (valence of ions). Both $\\text{BaCl}_2$ and $\\text{Mg(OH)}_2$ are 2:1 electrolytes, so they have the same value of $A$ (so D is true, while C is false as $\\text{MgSO}_4$ is 2:2). Thus, (B) and (D) only are true."
  },
  {
    question_number: 12,
    question_text: "The correct value of cell potential in volt for the reaction that occurs when the following two half cells are connected, is:\n$\\text{Fe}^{2+}(\\text{aq}) + 2e^- \\rightarrow \\text{Fe}(s), E^\\circ = -0.44\\text{ V}$\n$\\text{Cr}_2\\text{O}_7^{2-}(\\text{aq}) + 14\\text{H}^+ + 6e^- \\rightarrow 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}, E^\\circ = +1.33\\text{ V}$",
    options: [
      "+1.77 V",
      "+2.65 V",
      "+0.01 V",
      "+0.89 V"
    ],
    correct_option: "A",
    solution_text: "To have a spontaneous forward reaction, the half-cell with the higher reduction potential acts as cathode (reduction of dichromate, $+1.33\\text{ V}$) and the other acts as anode (oxidation of $\\text{Fe}$, $-0.44\\text{ V}$).\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +1.33 - (-0.44) = +1.77\\text{ V}$."
  },
  {
    question_number: 13,
    question_text: "The conductivity of centimolar solution of $\\text{KCl}$ at $25^\\circ\\text{C}$ is $0.0210\\text{ ohm}^{-1}\\text{ cm}^{-1}$ and the resistance of the cell containing the solution at $25^\\circ\\text{C}$ is $60\\text{ ohm}$. The value of cell constant is:",
    options: [
      "3.28 cm^{-1}",
      "1.26 cm^{-1}",
      "3.34 cm^{-1}",
      "1.34 cm^{-1}"
    ],
    correct_option: "B",
    solution_text: "Conductivity $\\kappa = \\frac{1}{R} \\times G^* \\implies G^* = \\kappa \\times R = 0.0210\\text{ ohm}^{-1}\\text{ cm}^{-1} \\times 60\\text{ ohm} = 1.26\\text{ cm}^{-1}$."
  },
  {
    question_number: 14,
    question_text: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R:\nAssertion A: In equation $\\Delta_r G = -nFE_{\\text{cell}}$, value of $\\Delta_r G$ depends on $n$.\nReason R: $E_{\\text{cell}}$ is an intensive property and $\\Delta_r G$ is an extensive property.\n\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both A and R are true but R is NOT the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are true and R is the correct explanation of A."
    ],
    correct_option: "D",
    solution_text: "$\\Delta_r G$ is an extensive thermodynamic property and depends directly on the stoichiometric coefficient $n$ of electrons transferred. $E_{\\text{cell}}$ is an intensive property and does not depend on the size or stoichiometric scaling of the system. Thus, both A and R are true and R correctly explains A."
  },
  {
    question_number: 15,
    question_text: "Two half cell reactions are given below:\n$\\text{Co}^{3+} + e^- \\rightarrow \\text{Co}^{2+}, E^\\circ_{\\text{Co}^{2+}/\\text{Co}^{3+}} = -1.81\\text{ V}$\n$2\\text{Al}^{3+} + 6e^- \\rightarrow 2\\text{Al}(s), E^\\circ_{\\text{Al}/\\text{Al}^{3+}} = +1.66\\text{ V}$\n\nThe standard EMF of a cell with feasible redox reaction will be:",
    options: [
      "-3.47 V",
      "+7.09 V",
      "+0.15 V",
      "+3.47 V"
    ],
    correct_option: "D",
    solution_text: "Given oxidation potentials:\n$E^\\circ_{\\text{ox}}(\\text{Co}^{2+}/\\text{Co}^{3+}) = -1.81\\text{ V} \\implies E^\\circ_{\\text{red}}(\\text{Co}^{3+}/\\text{Co}^{2+}) = +1.81\\text{ V}$.\n$E^\\circ_{\\text{ox}}(\\text{Al}/\\text{Al}^{3+}) = +1.66\\text{ V} \\implies E^\\circ_{\\text{red}}(\\text{Al}^{3+}/\\text{Al}) = -1.66\\text{ V}$.\nFor a feasible cell, cathode has higher reduction potential ($\\text{Co}^{3+}$ reduction) and anode is $\\text{Al}$ oxidation:\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 1.81 - (-1.66) = +3.47\\text{ V}$."
  },
  {
    question_number: 16,
    question_text: "Standard electrode potential for the cell with cell reaction\n$\\text{Zn}(s) + \\text{Cu}^{2+}(\\text{aq}) \\rightarrow \\text{Zn}^{2+}(\\text{aq}) + \\text{Cu}(s)$\nis $1.1\\text{ V}$. Calculate the standard Gibbs energy change for the cell reaction. (Given $F = 96487\\text{ C mol}^{-1}$)",
    options: [
      "-200.27 J mol^{-1}",
      "-200.27 kJ mol^{-1}",
      "-212.27 kJ mol^{-1}",
      "-212.27 J mol^{-1}"
    ],
    correct_option: "C",
    solution_text: "Here $n = 2$.\n$\\Delta G^\\circ = -nFE^\\circ = -2 \\times 96487 \\times 1.1\\text{ J mol}^{-1} = -212271.4\\text{ J mol}^{-1} = -212.27\\text{ kJ mol}^{-1}$."
  },
  {
    question_number: 17,
    question_text: "At $298\\text{ K}$, the standard electrode potentials of $\\text{Cu}^{2+}/\\text{Cu}$, $\\text{Zn}^{2+}/\\text{Zn}$, $\\text{Fe}^{2+}/\\text{Fe}$ and $\\text{Ag}^+/\\text{Ag}$ are $0.34\\text{ V}$, $-0.76\\text{ V}$, $-0.44\\text{ V}$ and $0.80\\text{ V}$, respectively.\nOn the basis of standard electrode potential, predict which of the following reaction cannot occur?",
    options: [
      "CuSO_4(aq) + Zn(s) -> ZnSO_4(aq) + Cu(s)",
      "CuSO_4(aq) + Fe(s) -> FeSO_4(aq) + Cu(s)",
      "FeSO_4(aq) + Zn(s) -> ZnSO_4(aq) + Fe(s)",
      "2CuSO_4(aq) + 2Ag(s) -> 2Cu(s) + Ag_2SO_4(aq)"
    ],
    correct_option: "D",
    solution_text: "The reduction potential of $\\text{Ag}^+/\\text{Ag}$ is $+0.80\\text{ V}$, which is higher than that of $\\text{Cu}^{2+}/\\text{Cu}$ ($+0.34\\text{ V}$). Therefore, copper can displace silver from its salt solution, but silver cannot displace copper from $\\text{CuSO}_4$ solution ($E^\\circ_{\\text{cell}} = 0.34 - 0.80 = -0.46\\text{ V} < 0$)."
  },
  {
    question_number: 18,
    question_text: "Given below are half cell reactions:\n$\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\rightarrow \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}, E^\\circ_{\\text{Mn}^{2+}/\\text{MnO}_4^-} = -1.510\\text{ V}$\n$\\frac{1}{2}\\text{O}_2 + 2\\text{H}^+ + 2e^- \\rightarrow \\text{H}_2\\text{O}, E^\\circ_{\\text{O}_2/\\text{H}_2\\text{O}} = +1.223\\text{ V}$\n\nWill the permanganate ion, $\\text{MnO}_4^-$ liberate $\\text{O}_2$ from water in the presence of an acid?",
    options: [
      "Yes, because E^\\circ_{\\text{cell}} = +0.287 V",
      "No, because E^\\circ_{\\text{cell}} = -0.287 V",
      "Yes, because E^\\circ_{\\text{cell}} = +2.733 V",
      "No, because E^\\circ_{\\text{cell}} = -2.733 V"
    ],
    correct_option: "A",
    solution_text: "Given $E^\\circ_{\\text{ox}}(\\text{Mn}^{2+}/\\text{MnO}_4^-) = -1.510\\text{ V} \\implies E^\\circ_{\\text{red}}(\\text{MnO}_4^-/\\text{Mn}^{2+}) = +1.510\\text{ V}$.\nFor liberating $\\text{O}_2$ from water, water is oxidized at anode:\n$\\text{H}_2\\text{O} \\rightarrow \\frac{1}{2}\\text{O}_2 + 2\\text{H}^+ + 2e^-$, with $E^\\circ_{\\text{red}} = +1.223\\text{ V}$.\n$\\text{MnO}_4^-$ is reduced at cathode.\n$E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 1.510\\text{ V} - 1.223\\text{ V} = +0.287\\text{ V}$.\nSince $E^\\circ_{\\text{cell}} > 0$, the reaction is spontaneous and $\\text{MnO}_4^-$ liberates $\\text{O}_2$ from water."
  },
  {
    question_number: 19,
    question_text: "Find the emf of the cell in which the following reaction takes place at $298\\text{ K}$:\n$\\text{Ni}(s) + 2\\text{Ag}^+(0.001\\text{ M}) \\rightarrow \\text{Ni}^{2+}(0.001\\text{ M}) + 2\\text{Ag}(s)$\n(Given that $E^\\circ_{\\text{cell}} = 10.5\\text{ V}, \\frac{2.303 RT}{F} = 0.059\\text{ at } 298\\text{ K}$)",
    options: [
      "10.4115 V",
      "10.385 V",
      "0.9615 V",
      "10.05 V"
    ],
    correct_option: "A",
    solution_text: "Using Nernst equation ($n = 2$):\n$E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.059}{2} \\log\\frac{[\\text{Ni}^{2+}]}{[\\text{Ag}^+]^2}$\n$= 10.5 - \\frac{0.059}{2} \\log\\left(\\frac{10^{-3}}{(10^{-3})^2}\\right) = 10.5 - 0.0295 \\log(10^3)$\n$= 10.5 - 0.0295 \\times 3 = 10.5 - 0.0885 = 10.4115\\text{ V}$."
  },
  {
    question_number: 20,
    question_text: "The molar conductance of $\\text{NaCl}$, $\\text{HCl}$ and $\\text{CH}_3\\text{COONa}$ at infinite dilution are $126.45$, $426.16$ and $91.0\\text{ S cm}^2\\text{ mol}^{-1}$ respectively. The molar conductance of $\\text{CH}_3\\text{COOH}$ at infinite dilution is. Choose the right option for your answer.",
    options: [
      "540.48 S cm^2 mol^{-1}",
      "201.28 S cm^2 mol^{-1}",
      "390.71 S cm^2 mol^{-1}",
      "698.28 S cm^2 mol^{-1}"
    ],
    correct_option: "C",
    solution_text: "By Kohlrausch's law:\n$\\Lambda_m^\\circ(\\text{CH}_3\\text{COOH}) = \\Lambda_m^\\circ(\\text{CH}_3\\text{COONa}) + \\Lambda_m^\\circ(\\text{HCl}) - \\Lambda_m^\\circ(\\text{NaCl})$\n$= 91.0 + 426.16 - 126.45 = 517.16 - 126.45 = 390.71\\text{ S cm}^2\\text{ mol}^{-1}$."
  },
  {
    question_number: 21,
    question_text: "The molar conductivity of $0.007\\text{ M}$ acetic acid is $20\\text{ S cm}^2\\text{ mol}^{-1}$. What is the dissociation constant of acetic acid? Choose the correct option.\n[$\\lambda^\\circ_{\\text{H}^+} = 350\\text{ S cm}^2\\text{ mol}^{-1}$, $\\lambda^\\circ_{\\text{CH}_3\\text{COO}^-} = 50\\text{ S cm}^2\\text{ mol}^{-1}$]",
    options: [
      "2.50 \\times 10^{-5} mol L^{-1}",
      "1.75 \\times 10^{-4} mol L^{-1}",
      "2.50 \\times 10^{-4} mol L^{-1}",
      "1.75 \\times 10^{-5} mol L^{-1}"
    ],
    correct_option: "D",
    solution_text: "$\\Lambda_m^\\circ = 350 + 50 = 400\\text{ S cm}^2\\text{ mol}^{-1}$.\n$\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ} = \\frac{20}{400} = 0.05$.\n$K_a = \\frac{c\\alpha^2}{1 - \\alpha} \\approx c\\alpha^2 = 0.007 \\times (0.05)^2 = 7 \\times 10^{-3} \\times 25 \\times 10^{-4} = 175 \\times 10^{-7} = 1.75 \\times 10^{-5}\\text{ mol L}^{-1}$."
  },
  {
    question_number: 22,
    question_text: "In a typical fuel cell, the reactants (R) and product (P) are:",
    options: [
      "R = H_2(g), N_2(g); P = NH_3(aq)",
      "R = H_2(g), O_2(g); P = H_2O_2(l)",
      "R = H_2(g), O_2(g); P = H_2O(l)",
      "R = H_2(g), O_2(g), Cl_2(g); P = HClO_4(aq)"
    ],
    correct_option: "C",
    solution_text: "In a typical hydrogen-oxygen fuel cell, hydrogen gas and oxygen gas are bubbled through porous carbon electrodes as reactants, producing water ($H_2O$) as the only product."
  },
  {
    question_number: 23,
    question_text: "Identify the reaction from following having top position in EMF series (Std. red. potential) according to their electrode potential at $298\\text{ K}$:",
    options: [
      "K^+ + 1e^- -> K(s)",
      "Mg^{2+} + 2e^- -> Mg(s)",
      "Fe^{2+} + 2e^- -> Fe(s)",
      "Au^{3+} + 3e^- -> Au(s)"
    ],
    correct_option: "D",
    solution_text: "In the electrochemical series based on standard reduction potential ($E^\\circ_{\\text{red}}$):\n$\\text{Au}^{3+} + 3e^- \\rightarrow \\text{Au}(s)$ has $E^\\circ \\approx +1.40\\text{ V}$, which is the highest positive standard reduction potential among the given options."
  },
  {
    question_number: 24,
    question_text: "On electrolysis of dil. sulphuric acid using Platinum (Pt) electrode, the product obtained at anode will be:",
    options: [
      "Oxygen gas",
      "H_2S gas",
      "SO_2 gas",
      "Hydrogen gas"
    ],
    correct_option: "A",
    solution_text: "During electrolysis of dilute $\\text{H}_2\\text{SO}_4$, oxidation of water occurs at anode in preference to sulphate ions due to lower discharge potential:\n$2\\text{H}_2\\text{O}(l) \\rightarrow \\text{O}_2(g) + 4\\text{H}^+(\\text{aq}) + 4e^-$.\nThus oxygen gas is liberated at the anode."
  },
  {
    question_number: 25,
    question_text: "The number of Faradays (F) required to produce $20\\text{ g}$ of calcium from molten $\\text{CaCl}_2$ (Atomic mass of $\\text{Ca} = 40\\text{ g mol}^{-1}$) is:",
    options: [
      "2",
      "3",
      "4",
      "1"
    ],
    correct_option: "D",
    solution_text: "Reaction: $\\text{Ca}^{2+} + 2e^- \\rightarrow \\text{Ca}$.\n$1\\text{ mole}$ ($40\\text{ g}$) of $\\text{Ca}$ requires $2\\text{ F}$ of charge.\nTherefore, $20\\text{ g}$ of $\\text{Ca}$ ($0.5\\text{ mole}$) requires $0.5 \\times 2 = 1\\text{ F}$."
  }
];
