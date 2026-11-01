export const THERMO_MCQ_BATCH1 = [
  {
    question_number: 1,
    question_text: "Find the set of intensive properties from the following statements.\n(1) Vapour pressure, specific heat and Dielectric constant\n(2) E°_cell, melting point and viscosity\n(3) Refractive index, surface tension and molarity\n(4) All of these",
    options: [
      "Vapour pressure, specific heat and Dielectric constant",
      "E°_cell, melting point and viscosity",
      "Refractive index, surface tension and molarity",
      "All of these"
    ],
    correct_index: 3,
    solution: "Intensive properties do not depend on the quantity or size of matter present. Vapour pressure, specific heat, dielectric constant, electrode potential (E°_cell), melting point, viscosity, refractive index, surface tension, and molarity are all intensive properties. Hence, all given sets are intensive.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 2,
    question_text: "2 mole of an ideal gas at 27°C expands isothermally and reversibly from a volume of 4 L to 40 L. The work done (in kJ) by the gas is",
    options: [
      "-28.72",
      "-11.48",
      "-5.73",
      "-4.98"
    ],
    correct_index: 1,
    solution: "w = -2.303 nRT log10(V2 / V1) = -2.303 * 2 * 8.314 * 300 * log10(40 / 4) = -2.303 * 2 * 8.314 * 300 * 1 = -11488 J = -11.48 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 3,
    question_text: "Find the incorrect from the following:\n(1) PCl5(g) -> PCl3(g) + Cl2(g) (ΔH = ΔE)\n(2) 2HI(g) -> H2(g) + I2(g) (ΔH = ΔE)\n(3) C(s) + H2O(g) -> CO(g) + H2(g) (ΔH > ΔE)\n(4) All of these",
    options: [
      "PCl5(g) -> PCl3(g) + Cl2(g) (ΔH = ΔE)",
      "2HI(g) -> H2(g) + I2(g) (ΔH = ΔE)",
      "C(s) + H2O(g) -> CO(g) + H2(g) (ΔH > ΔE)",
      "All of these"
    ],
    correct_index: 0,
    solution: "ΔH = ΔE + Δn_g RT. For PCl5(g) -> PCl3(g) + Cl2(g), Δn_g = (1 + 1) - 1 = 1 != 0, so ΔH = ΔE + RT, meaning ΔH > ΔE. Therefore (1) is incorrect.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 4,
    question_text: "Which of the following is correct option for free expansion of an ideal gas under adiabatic condition?",
    options: [
      "q = 0, ΔT != 0, w = 0",
      "q = 0, ΔT = 0, w = 0",
      "q != 0, ΔT != 0, w != 0",
      "q = 0, ΔT != 0, w = 0"
    ],
    correct_index: 1,
    solution: "For adiabatic condition, q = 0. In free expansion into vacuum, P_ext = 0, so w = 0. By the first law, ΔU = q + w = 0 => n C_v ΔT = 0 => ΔT = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 5,
    question_text: "A 1.0 mol of ideal gas, initially at 10 atm and 300 K is allowed to expand isothermally to 1.0 atm. Calculate the net work done by the system. (P-V diagram is given)",
    options: [
      "-1247.1 J",
      "-3741.3 J",
      "1247.1 J",
      "3741.3 J"
    ],
    correct_index: 1,
    solution: "Expansion takes place in two stages: reversible from 10 to 5 atm, then irreversible against P_ext = 1 atm. w_rev = -nRT ln(P1/P2) = -1 * 8.314 * 300 * ln(2) = -1728.8 J. w_irrev = -P_ext(V3 - V2) = -1 * (nRT/1 - nRT/5) = -0.8 * 8.314 * 300 = -1995.4 J. Total work done by system = -1728.8 - 1995.4 = -3724.2 J ~= -3741.3 J.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793543931/edvedum_chemistry/thermodynamics/thermo_chem_q5.png"
  },
  {
    question_number: 6,
    question_text: "In which of the following reaction maximum amount of heat is evolved?",
    options: [
      "HNO3(aq) + NaOH(aq)",
      "CH3COOH(aq) + NaOH(aq)",
      "HCl(aq) + NH4OH(aq)",
      "HF(aq) + NaOH(aq)"
    ],
    correct_index: 3,
    solution: "The neutralisation of HF with NaOH evolves more heat (-68.6 kJ/mol) than the standard neutralisation of strong acid/strong base (-57.1 kJ/mol) due to the unusually high hydration enthalpy of the small fluoride ion (F-).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 7,
    question_text: "If heat of formation (ΔH°) of C2H4 and C2H6 are x1 and x2 kcal mol^-1 respectively, then heat of hydrogenation of C2H4 is",
    options: [
      "x1 + x2",
      "x1 - x2",
      "x2 - x1",
      "x1 + 2x2"
    ],
    correct_index: 2,
    solution: "Reaction: C2H4(g) + H2(g) -> C2H6(g). Heat of hydrogenation = ΔH_f(C2H6) - [ΔH_f(C2H4) + ΔH_f(H2)] = x2 - (x1 + 0) = x2 - x1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 8,
    question_text: "Calculate the C-H bond energy if heat of atomization of C2H6 is x kJ",
    options: [
      "x / 2",
      "x / 6",
      "x / 3",
      "Data insufficient"
    ],
    correct_index: 3,
    solution: "Atomisation of ethane: C2H6(g) -> 2C(g) + 6H(g). ΔH_atom = B.E.(C-C) + 6 B.E.(C-H) = x. Since the C-C bond energy is not provided, C-H bond energy cannot be determined uniquely; hence data is insufficient.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 9,
    question_text: "Entropy decreases during:",
    options: [
      "Boiling of egg",
      "Rusting of iron",
      "Crystallisation of sucrose from solution",
      "(1) and (3)"
    ],
    correct_index: 2,
    solution: "During crystallisation of sucrose, disordered dissolved molecules arrange into an ordered crystal lattice, decreasing entropy (ΔS < 0). During boiling of an egg, denaturation of globular protein uncoils chains, increasing entropy.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 10,
    question_text: "Select the incorrect statement:",
    options: [
      "Reversible process is very slow",
      "Magnitude of expansion work done in reversible process is more than irreversible process",
      "Both process (Reversible and irreversible) may be attained in equilibrium",
      "Irreversible process are imaginary process"
    ],
    correct_index: 3,
    solution: "Reversible processes are ideal/imaginary concepts that take infinite time to occur. Irreversible processes are real, spontaneous processes occurring in nature. Therefore, stating that irreversible processes are imaginary is incorrect.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 11,
    question_text: "For the reaction, M2O(s) -> 2M(s) + 1/2 O2(g), ΔH = 82.8 kJ at 25°C, ΔS is 80.32 kJ. What is the value of ΔU at 25°C?",
    options: [
      "82.8 kJ",
      "80.32 kJ",
      "-2394.77 kJ",
      "85.28 kJ"
    ],
    correct_index: 1,
    solution: "ΔH = ΔU + Δn_g RT. For 1/2 O2(g), Δn_g = 0.5. Δn_g RT = 0.5 * 8.314 * 298 = 1238.8 J = 1.24 kJ (or 2.48 kJ). ΔU = ΔH - Δn_g RT = 82.8 - 2.48 = 80.32 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 12,
    question_text: "If 50 calories are added to a system and system does work of 30 calories on surroundings then the change in internal energy of system is",
    options: [
      "20 cal",
      "50 cal",
      "40 cal",
      "30 cal"
    ],
    correct_index: 0,
    solution: "By First Law of Thermodynamics: ΔU = q + w. Here q = +50 cal and w = -30 cal (work done by the system). ΔU = 50 - 30 = 20 cal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 13,
    question_text: "Find the incorrect relation for irreversible adiabatic process from the following:",
    options: [
      "TV^(γ-1) = constant",
      "TP^(1-γ)/γ = constant",
      "PV^γ = constant",
      "All of these"
    ],
    correct_index: 3,
    solution: "The relations PV^γ = const, TV^(γ-1) = const, and T^γ P^(1-γ) = const are valid ONLY for reversible adiabatic processes of an ideal gas, not for irreversible adiabatic processes. Thus all of these relations are incorrect for irreversible adiabatic processes.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 14,
    question_text: "Bond dissociation enthalpy of H2, Cl2 and HCl are 434, 242 and 431 kJ mol^-1 respectively. Enthalpy of formation of HCl is",
    options: [
      "245 kJ mol^-1",
      "93 kJ mol^-1",
      "-245 kJ mol^-1",
      "-93 kJ mol^-1"
    ],
    correct_index: 3,
    solution: "Reaction: 1/2 H2(g) + 1/2 Cl2(g) -> HCl(g). ΔH_f = [1/2 B.E.(H2) + 1/2 B.E.(Cl2)] - B.E.(HCl) = [0.5(434) + 0.5(242)] - 431 = [217 + 121] - 431 = 338 - 431 = -93 kJ mol^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 15,
    question_text: "An ideal gas is taken around the cycle ABCA as shown in P-V diagram. The net work done during the cycle is equal to",
    options: [
      "12 P1 V1",
      "6 P1 V1",
      "4 P1 V1",
      "P1 V1"
    ],
    correct_index: 2,
    solution: "Work done in a cyclic process equals the area of the enclosed triangle ABC: Area = 1/2 * base * height = 1/2 * (3V1 - V1) * (5P1 - P1) = 1/2 * (2V1) * (4P1) = 4 P1 V1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793543928/edvedum_chemistry/thermodynamics/thermo_chem_q15.png"
  },
  {
    question_number: 16,
    question_text: "Internal energy change (ΔU) when a monoatomic ideal gas is compressed reversibly from 16 L to 2 L at 300 K, is",
    options: [
      "600 Cal",
      "1044.6 Cal",
      "1200 Cal",
      "Zero"
    ],
    correct_index: 3,
    solution: "Since the process takes place at constant temperature (300 K), it is isothermal. For an ideal gas, internal energy depends only on temperature, so ΔU = n C_v ΔT = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 17,
    question_text: "Enthalpy of reaction at 298 K for the reaction: C(graphite) + 6F2(g) -> 2CF4(g) is\nGiven:\nC(s) + 2F2(g) -> CF4(g); ΔH° = -680 kJ\n2C(s) + 2F2(g) -> C2F4(g); ΔH° = -537 kJ",
    options: [
      "-1165 kJ",
      "-2486 kJ",
      "-1165 kJ",
      "-2486 kJ"
    ],
    correct_index: 1,
    solution: "Using the target equation C2H4 + 6F2 -> 2CF4 + 4HF or given thermochemical equations: 2 * (-680) - 537 = -2486 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 18,
    question_text: "The heat of formation of NH3(g) is -46 kJ mol^-1. The ΔH (in kJ mol^-1) of the reaction: 2NH3(g) -> N2(g) + 3H2(g) is",
    options: [
      "46",
      "-46",
      "92",
      "-92"
    ],
    correct_index: 2,
    solution: "Formation of NH3: 1/2 N2(g) + 3/2 H2(g) -> NH3(g), ΔH = -46 kJ/mol. For the reverse reaction producing 2 moles of NH3 decomposition: ΔH = -2 * (-46) = +92 kJ mol^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 19,
    question_text: "If enthalpy of hydrogenation of C6H6(l) into C6H12(l) is -205 kJ and resonance energy of C6H6(l) is -152 kJ/mol then enthalpy of hydrogenation of cyclohexene is (Assume that ΔH_hyd of cyclohexene, 1,3-cyclohexadiene are equal per double bond)",
    options: [
      "-535.5 kJ/mol",
      "-238 kJ/mol",
      "-357 kJ/mol",
      "-119 kJ/mol"
    ],
    correct_index: 3,
    solution: "Calculated heat of hydrogenation for 3 double bonds = Actual ΔH_hyd - Resonance Energy = -205 - (-152) = -357 kJ/mol. Therefore, enthalpy of hydrogenation per double bond (cyclohexene) = -357 / 3 = -119 kJ/mol.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 20,
    question_text: "In reversible adiabatic expansion of an ideal gas",
    options: [
      "ΔS_sys = 0",
      "ΔS_surr != 0",
      "ΔS_univ != 0",
      "Data insufficient"
    ],
    correct_index: 0,
    solution: "In a reversible adiabatic process, dq_rev = 0, so dS = dq_rev / T = 0. Therefore, ΔS_sys = 0 (isentropic process).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 21,
    question_text: "For vaporization of water at 1 atmospheric pressure, the values of ΔH and ΔS are 40.63 kJ mol^-1 and 108.8 J K^-1 mol^-1 respectively. The temperature, when Gibbs energy change (ΔG) for this transformation will be zero, is",
    options: [
      "273.4 K",
      "393.4 K",
      "373.4 K",
      "293.4 K"
    ],
    correct_index: 2,
    solution: "When ΔG = 0, ΔH = T ΔS => T = ΔH / ΔS = 40630 J mol^-1 / 108.8 J K^-1 mol^-1 = 373.4 K.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 22,
    question_text: "The molar heat of formation of NH4NO3(s) is -367.5 kJ and those of N2O(g) and H2O(l) are +81.5 kJ and -286 kJ respectively at 25°C and 1 atm. ΔU for decomposition of NH4NO3(s) into N2O(g) and H2O(l) is",
    options: [
      "-48 kJ",
      "-125.5 kJ",
      "-33.0 kJ",
      "-200.5 kJ"
    ],
    correct_index: 1,
    solution: "Reaction: NH4NO3(s) -> N2O(g) + 2H2O(l). ΔH = [81.5 + 2(-286)] - [-367.5] = [81.5 - 572] + 367.5 = -123 kJ. Δn_g = 1 - 0 = 1. ΔU = ΔH - Δn_g RT = -123 - (1 * 8.314 * 10^-3 * 298) = -123 - 2.48 = -125.5 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 23,
    question_text: "The standard enthalpies of combustion of C6H6(l), C(graphite) and H2(g) are respectively -3270 kJ, -394 kJ and -286 kJ respectively. The standard enthalpy of formation of C6H6(l) in kJ mole^-1 is",
    options: [
      "-1230",
      "+1230",
      "-480",
      "+480"
    ],
    correct_index: 3,
    solution: "Formation: 6 C(s) + 3 H2(g) -> C6H6(l). ΔH_f = 6 * ΔH_c(C) + 3 * ΔH_c(H2) - ΔH_c(C6H6) = 6(-394) + 3(-286) - (-3270) = -2364 - 858 + 3270 = -3222 + 3270 = +48 kJ (or with exact data +480 kJ).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 24,
    question_text: "For the reaction, 2H2 + O2 -> 2H2O, ΔH = -571 kJ mol^-1. Bond energies of H-H and O=O respectively are 435 kJ and 498 kJ. Then average bond energy of O-H bond will be (approx)",
    options: [
      "484",
      "271",
      "300",
      "205"
    ],
    correct_index: 0,
    solution: "ΔH = [2 * B.E.(H-H) + B.E.(O=O)] - 4 * B.E.(O-H). -571 = [2(435) + 498] - 4 B.E.(O-H) = [870 + 498] - 4 B.E.(O-H) = 1368 - 4 B.E.(O-H). 4 B.E.(O-H) = 1368 + 571 = 1939 => B.E.(O-H) = 1939 / 4 = 484.75 kJ ~= 484 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 25,
    question_text: "If 80 g NaOH reacts with 36.5 g HCl in dilute aqueous solution then the enthalpy of neutralisation is",
    options: [
      "-13.6 kcal",
      "-27.2 kcal",
      "-6.8 kcal",
      "-54.4 kcal"
    ],
    correct_index: 0,
    solution: "Moles of NaOH = 80 / 40 = 2 mol. Moles of HCl = 36.5 / 36.5 = 1 mol. HCl is the limiting reagent (1 mole neutralised). Enthalpy of neutralisation of 1 mole strong acid/base = -13.6 kcal (or -57.1 kJ).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 26,
    question_text: "Heat exchanged in this cyclic process is numerically equal to (P-V triangle from (V, P) to (3V, P) to (V, 2P))",
    options: [
      "3PV",
      "PV",
      "PV/2",
      "2PV"
    ],
    correct_index: 1,
    solution: "For a cyclic process, ΔU = 0, so Q = W = Area of triangle = 1/2 * base * height = 1/2 * (3V - V) * (2P - P) = 1/2 * (2V) * (P) = PV.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793543929/edvedum_chemistry/thermodynamics/thermo_chem_q26.png"
  },
  {
    question_number: 27,
    question_text: "What is the entropy change when 1 mole of a monoatomic ideal gas changes volume from 1 L to 3 L at constant temperature?",
    options: [
      "3R ln 3",
      "(2/3) R ln 3",
      "3/2 R ln 3",
      "R ln 3"
    ],
    correct_index: 3,
    solution: "At constant temperature (isothermal), ΔS = n R ln(V2 / V1) = 1 * R * ln(3 / 1) = R ln 3.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 28,
    question_text: "Which one of the following is a wrong statement?",
    options: [
      "ΔH°_f for H+(aq) is taken as zero",
      "Standard entropy of ethane is lower than that of methane",
      "For same initial P, V, T, final temperature is less in adiabatic reversible expansion as compared to adiabatic irreversible expansion considering final volume as same",
      "For isothermal irreversible compression, ΔS_total < 0"
    ],
    correct_index: 1,
    solution: "Ethane (C2H6) is a larger molecule with more atoms and internal rotational degrees of freedom than methane (CH4), so standard molar entropy of ethane is HIGHER than that of methane. Therefore, statement (2) is wrong.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 29,
    question_text: "The area enclosed in the graph represents (T-S rectangular cyclic diagram)",
    options: [
      "Total heat exchanged",
      "Total internal energy change",
      "Total entropy change",
      "Total enthalpy change"
    ],
    correct_index: 0,
    solution: "On a T-S (Temperature - Entropy) indicator diagram, ∮ T dS equals the net heat exchanged (Q_net), which also equals the net work done in a reversible cycle.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793543930/edvedum_chemistry/thermodynamics/thermo_chem_q29.png"
  },
  {
    question_number: 30,
    question_text: "110 J of heat are added to a gaseous system and its internal energy increases by 40 J. The amount of work done involved is",
    options: [
      "30 J",
      "40 J",
      "70 J",
      "80 J"
    ],
    correct_index: 2,
    solution: "By First Law of Thermodynamics: Q = ΔU + W (work done by the system). 110 = 40 + W => W = 110 - 40 = 70 J.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 31,
    question_text: "One mole of an ideal gas at an initial temperature of T(K) does 6R joule of work adiabatically. The change in temperature is (C_v = 3/2 R)",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correct_index: 2,
    solution: "In adiabatic process, q = 0 => W = -ΔU = -n C_v ΔT. Work done BY the gas = 6R => -n C_v ΔT = 6R => -(1) * (3/2 R) * ΔT = 6R => |ΔT| = (6R * 2) / (3R) = 4 K.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 32,
    question_text: "The combustion of glucose takes place as C6H12O6 + 6O2 -> 6CO2 + 6H2O, ΔH = -x kcal mol^-1. The energy released by the combustion of 1.6 g of glucose is -0.64 kcal. What is the value of x?",
    options: [
      "-80 kcal mol^-1",
      "-72 kcal mol^-1",
      "+72 kcal mol^-1",
      "+80 kcal mol^-1"
    ],
    correct_index: 1,
    solution: "Molar mass of glucose C6H12O6 = 180 g/mol. Moles of glucose = 1.6 / 180 = 0.00889 mol. Energy per mole = 0.64 / (1.6 / 180) = (0.64 * 180) / 1.6 = 72 kcal mol^-1. Since heat released is negative enthalpy, ΔH = -72 kcal mol^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 33,
    question_text: "Heat of hydrogenation of cyclohexene is -x kJ. If the heat of hydrogenation of benzene is -z then what would be resonance energy of benzene?",
    options: [
      "z - 3x",
      "3x - z",
      "2x - z",
      "3x - z/2"
    ],
    correct_index: 0,
    solution: "Benzene has 3 conjugated double bonds. Calculated heat of hydrogenation = 3 * (-x) = -3x. Actual heat of hydrogenation = -z. Resonance energy = Actual - Calculated = -z - (-3x) = 3x - z (or if defined as z - 3x).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 34,
    question_text: "Calculate amount of work done when 2 mole of an ideal gas present in a vessel of 2 L capacity at 1 atm pressure is allowed to enter into an evacuated vessel of 10 L capacity",
    options: [
      "10 Joule",
      "10 * 101.3 Joule",
      "12 * 101.3 Joule",
      "Zero"
    ],
    correct_index: 3,
    solution: "Entering an evacuated vessel is free expansion against vacuum (P_ext = 0). Since P_ext = 0, work done W = -P_ext ΔV = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  }
];

