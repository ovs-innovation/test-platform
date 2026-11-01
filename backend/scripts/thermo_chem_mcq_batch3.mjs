export const THERMO_MCQ_BATCH3 = [
  {
    question_number: 73,
    question_text: "Which of the following have negative entropy change?\n(1) C(s) + O2(g) -> CO2(g)\n(2) CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)\n(3) 2C(s) + O2(g) -> 2CO(g)\n(4) Expansion of gas in vacuum",
    options: [
      "C(s) + O2(g) -> CO2(g)",
      "CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)",
      "2C(s) + O2(g) -> 2CO(g)",
      "Expansion of gas in vacuum"
    ],
    correct_index: 1,
    solution: "In reaction (2), 3 moles of gas react to form 1 mole of gas and liquid water (Δn_g = 1 - 3 = -2 < 0). A decrease in gaseous moles results in a negative entropy change (ΔS < 0).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 74,
    question_text: "Given thermodynamic data:\nOxide | ΔH°_f (kJ/mol) | ΔG°_f (kJ/mol)\nZnO   | -348.3        | -318.4\nCu2O  | -168.8        | -146.0\nHgO   | -90.8         | -58.5\nPbO   | -187.9        | -217.8\nWhich of the following oxide can be converted to metal easily?",
    options: [
      "ZnO",
      "HgO",
      "PbO",
      "Cu2O"
    ],
    correct_index: 1,
    solution: "An oxide is easiest to reduce or decompose into metal if its standard free energy of formation (ΔG°_f) is least negative (least stable). HgO has ΔG°_f = -58.5 kJ/mol, which decomposes to Hg and O2 on simple heating.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 75,
    question_text: "2 mole of an ideal gas is expanded isothermally and reversibly to 10 times of its original volume at 300 K. Work done in this process is",
    options: [
      "600R",
      "600 * 2.303R",
      "300 * 2.303R",
      "300R"
    ],
    correct_index: 1,
    solution: "w = -2.303 nRT log10(V2 / V1) = -2.303 * 2 * R * 300 * log10(10) = -600 * 2.303 R (magnitude = 600 * 2.303R).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 76,
    question_text: "In an ideal thermodynamic system, initial internal energy was 20 J. If 50 J heat is supplied and 30 J work is done by it, the final internal energy will be",
    options: [
      "30 J",
      "20 J",
      "10 J",
      "40 J"
    ],
    correct_index: 3,
    solution: "q = +50 J. Work done by system: w = -30 J. ΔU = q + w = 50 - 30 = +20 J. Final internal energy U_f = U_i + ΔU = 20 + 20 = 40 J.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 77,
    question_text: "C-H bond enthalpy is 350 kJ/mole. C≡C bond enthalpy by using following given data will be:\n2C(s) + H2(g) -> C2H2(g), ΔH = 225 kJ mol^-1\n2C(s) -> 2C(g), ΔH = 1410 kJ\nH2(g) -> 2H(g), ΔH = 330 kJ mol^-1",
    options: [
      "815 kJ/mol",
      "837 kJ/mol",
      "1165 kJ/mol",
      "1200 kJ/mol"
    ],
    correct_index: 0,
    solution: "ΔH_f = [ΔH_sub(2C) + B.E.(H2)] - [B.E.(C≡C) + 2 B.E.(C-H)]. 225 = [1410 + 330] - [B.E.(C≡C) + 2(350)] = 1740 - B.E.(C≡C) - 700 = 1040 - B.E.(C≡C) => B.E.(C≡C) = 1040 - 225 = 815 kJ/mol.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 78,
    question_text: "If 1 mole of an ideal gas is expanded isothermally and reversibly to ten times of its original volume, change in entropy of the system will be",
    options: [
      "2R J K^-1 mol^-1",
      "4.606R J K^-1 mol^-1",
      "R J K^-1 mol^-1",
      "2.303R J K^-1 mol^-1"
    ],
    correct_index: 3,
    solution: "ΔS = n R ln(V2 / V1) = 2.303 * 1 * R * log10(10) = 2.303 R J K^-1 mol^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 79,
    question_text: "Which of the following is not zero in a cyclic process?",
    options: [
      "ΔE + Δ(PV)",
      "ΔG + TΔS",
      "-∮ P dV",
      "n C_v,m ΔT"
    ],
    correct_index: 2,
    solution: "In a cyclic process, state functions return to their initial state so ΔE = 0, Δ(PV) = 0, ΔG = 0, ΔT = 0. But work done W = -∮ P dV is the enclosed area of the cycle on the indicator diagram, which is not zero.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 80,
    question_text: "Which of the following variables is path dependent?",
    options: [
      "Internal energy",
      "Enthalpy",
      "Heat",
      "Gibbs free energy"
    ],
    correct_index: 2,
    solution: "Heat (q) and work (w) are path functions whose values depend on the specific path taken between states. Internal energy, enthalpy, and Gibbs free energy are state functions.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 81,
    question_text: "A system undergoes expansion against the external pressure 0.5 bar by absorbing heat 400 J. The change in internal energy 300 J. The change in volume in (litre) is",
    options: [
      "4",
      "5",
      "2",
      "3"
    ],
    correct_index: 2,
    solution: "ΔU = q + w => 300 = 400 + w => w = -100 J. w = -P_ext ΔV => -100 J = -(0.5 * 10^5 N/m^2) * ΔV => ΔV = 100 / 50000 m^3 = 2 * 10^-3 m^3 = 2 L.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 82,
    question_text: "CO2 was expanded in evacuated space. The change in temperature is 10°C in an isolated container. The work done during this process is",
    options: [
      "0",
      "150R",
      "300R",
      "250R"
    ],
    correct_index: 0,
    solution: "In an evacuated space, external pressure P_ext = 0. Therefore, expansion work done W = -P_ext ΔV = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 83,
    question_text: "The change in internal energy is zero for which of the following process?\n(I) Vaporisation of water\n(II) Combustion of CH4 at constant temperature\n(III) Expansion of gas against vacuum in isothermal process\n(IV) Isothermal expansion of a gas",
    options: [
      "(I), (II), (III) and (IV)",
      "(II), (III) and (IV) only",
      "(III) and (IV) only",
      "(I) and (II) only"
    ],
    correct_index: 2,
    solution: "For an ideal gas, internal energy is a function of temperature only (U = f(T)). In isothermal expansion (IV) and isothermal expansion against vacuum (III), ΔT = 0 so ΔU = 0. Vaporisation (I) involves latent heat of vaporization, and combustion (II) involves bond reorganizations (chemical energy change), so ΔU != 0 for I and II.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 84,
    question_text: "Heat of neutralization of HCl by NaOH is -13.7 kcal/mol. If heat of neutralization of CH3COOH with NaOH is -3.7 kcal/mol, ionization enthalpy of CH3COOH is",
    options: [
      "10 kcal",
      "-10 kcal",
      "-17.4 kcal",
      "17.4 kcal"
    ],
    correct_index: 0,
    solution: "ΔH_neut(CH3COOH) = ΔH_ion(CH3COOH) + ΔH_neut(HCl). -3.7 = ΔH_ion + (-13.7) => ΔH_ion = -3.7 + 13.7 = +10 kcal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 85,
    question_text: "50 ml of decinormal acid is neutralised by 50 ml of decinormal base heat released is q1. While q2 heat is released when 150 ml decinormal acid is neutralised by 150 ml decinormal base. What is the relation between q1 and q2?",
    options: [
      "q1 = 3q2",
      "q2 = 3q1",
      "q1 = q2",
      "q2 = 20q1"
    ],
    correct_index: 1,
    solution: "Milliequivalents reacting in first case = 50 * 0.1 = 5 meq. In second case = 150 * 0.1 = 15 meq = 3 * 5 meq. Heat released is directly proportional to milliequivalents neutralised: q2 = 3 q1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 86,
    question_text: "The standard enthalpy of formation of CO2(g), H2O(l) and glucose(s) at 25°C are -400 kJ/mol, -300 kJ/mol and -1300 kJ/mol. The standard enthalpy of combustion per gm of glucose is",
    options: [
      "-2900 kJ",
      "16.11 kJ",
      "2900 kJ",
      "-16.11 kJ"
    ],
    correct_index: 3,
    solution: "Combustion: C6H12O6(s) + 6O2(g) -> 6CO2(g) + 6H2O(l). ΔH_c = [6(-400) + 6(-300)] - [-1300] = -4200 + 1300 = -2900 kJ/mol. Molar mass of glucose = 180 g/mol. Enthalpy of combustion per gram = -2900 / 180 = -16.11 kJ/g.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 87,
    question_text: "The heat capacity of 2.0 moles of He gas at constant temperature is (in cal/(mol K))",
    options: [
      "3",
      "Zero",
      "6",
      "∞"
    ],
    correct_index: 3,
    solution: "At constant temperature, dT = 0. Heat capacity C = dq / dT = dq / 0 = ∞.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 88,
    question_text: "When 2.0 moles of an ideal gas expands from 5.0 L to 15.0 L reversibly and isothermally at 27°C in vacuum. Work done by the system is",
    options: [
      "-34.15 J",
      "0",
      "102.5 J",
      "-3.46 kJ"
    ],
    correct_index: 1,
    solution: "Expansion in vacuum (free expansion) has P_ext = 0, so work done W = -P_ext ΔV = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 89,
    question_text: "9.2 g of toluene C7H8(l) is completely burnt in air. The difference in heat change at constant pressure and constant volume at 27°C is nearly",
    options: [
      "-2.5 kJ",
      "+2.5 kJ",
      "Zero",
      "-0.50 kJ"
    ],
    correct_index: 3,
    solution: "Moles of C7H8 = 9.2 / 92 = 0.1 mol. Reaction: C7H8(l) + 9 O2(g) -> 7 CO2(g) + 4 H2O(l). For 1 mole, Δn_g = 7 - 9 = -2. For 0.1 mole, Δn_g = -0.2. q_p - q_v = ΔH - ΔE = Δn_g RT = -0.2 * 8.314 * 300 = -498.8 J ~= -0.50 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 90,
    question_text: "For the reaction, P(solid) <=> Q(gas). The temperature dependence of equilibrium constant is given by log10 K_p = 8.0 - 1000/T. The value of ΔS° at a particular temperature is",
    options: [
      "4.0R",
      "18.42R",
      "32.67R",
      "9.3R"
    ],
    correct_index: 1,
    solution: "From van 't Hoff equation: log10 K = -ΔH° / (2.303 RT) + ΔS° / (2.303 R). Constant term = ΔS° / (2.303 R) = 8.0 => ΔS° = 8.0 * 2.303 R = 18.424 R.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 91,
    question_text: "Heat of neutralisation of NaOH with equivalent amount of acid is maximum in case of",
    options: [
      "HI",
      "HCl",
      "HBr",
      "HF"
    ],
    correct_index: 3,
    solution: "HF gives the maximum heat of neutralisation with NaOH (-68.6 kJ/mol compared to -57.1 kJ/mol for strong acids) due to the extraordinarily high hydration enthalpy of the fluoride ion (F-).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 92,
    question_text: "Enthalpy of formation of water is:\nIf bond energy of H-H = 433 kJ/mol\nO=O = 492 kJ/mol\nO-H = 464 kJ/mol",
    options: [
      "-498 kJ/mol",
      "498 kJ/mol",
      "-249 kJ/mol",
      "249 kJ/mol"
    ],
    correct_index: 2,
    solution: "H2(g) + 1/2 O2(g) -> H2O(g). ΔH_f = [B.E.(H-H) + 1/2 B.E.(O=O)] - 2 B.E.(O-H) = [433 + 0.5(492)] - 2(464) = [433 + 246] - 928 = 679 - 928 = -249 kJ/mol.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 93,
    question_text: "Which is incorrect?\n(1) Isothermal process at constant pressure, ΔU = 0\n(2) Isothermal irreversible expansion of ideal gas in vacuum, W = 0\n(3) Adiabatic process at constant pressure, ΔH = 0\n(4) At equilibrium, E°_cell = 0",
    options: [
      "Isothermal process at constant pressure, ΔU = 0",
      "Isothermal irreversible expansion of ideal gas in vacuum, W = 0",
      "Adiabatic process at constant pressure, ΔH = 0",
      "At equilibrium, E°_cell = 0"
    ],
    correct_index: 3,
    solution: "At dynamic chemical equilibrium, cell potential E_cell = 0, but standard cell potential E°_cell = (RT/nF) ln K_eq, which is generally non-zero. Hence (4) is incorrect.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 94,
    question_text: "The heat of atomisation of PH3(g) is 228 kcal mol^-1 and that of P2H4(g) is 355 kcal mol^-1. The energy of the P-P bond (in kcal) is",
    options: [
      "36",
      "150",
      "101",
      "51"
    ],
    correct_index: 3,
    solution: "In PH3: 3 * B.E.(P-H) = 228 => B.E.(P-H) = 76 kcal/mol. In P2H4 (H2P-PH2): B.E.(P-P) + 4 B.E.(P-H) = 355 => B.E.(P-P) + 4(76) = 355 => B.E.(P-P) = 355 - 304 = 51 kcal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 95,
    question_text: "Calculate the Gibbs energy change when 1 mole of NaCl is dissolved in water at 298 K. Given,\na. Lattice energy of NaCl = 778 kJ mol^-1\nb. Hydration energy of NaCl = -774.3 kJ mol^-1\nc. Entropy change at 298 K = 43 J mol^-1 K^-1",
    options: [
      "-3.7 kJ",
      "-9.1 kJ",
      "-43 kJ",
      "-13.14 kJ"
    ],
    correct_index: 1,
    solution: "ΔH_sol = Lattice energy + Hydration energy = 778 + (-774.3) = +3.7 kJ/mol. TΔS = 298 * 43 J/mol = 12.814 kJ. ΔG = ΔH - TΔS = 3.7 - 12.814 = -9.114 kJ ~= -9.1 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 96,
    question_text: "The heat of neutralisation of HCl with NH4OH and NaOH with CH3COOH are respectively -51.4 and -50.6 kJ eq^-1. The heat of neutralisation of acetic acid with NH4OH will be",
    options: [
      "-50.6 kJ eq^-1",
      "-57.4 kJ eq^-1",
      "-44.9 kJ eq^-1",
      "-70.2 kJ eq^-1"
    ],
    correct_index: 2,
    solution: "ΔH_neut(CH3COOH + NH4OH) = ΔH_neut(HCl + NH4OH) + ΔH_neut(CH3COOH + NaOH) - ΔH_neut(HCl + NaOH) = -51.4 + (-50.6) - (-57.1) = -102.0 + 57.1 = -44.9 kJ eq^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 97,
    question_text: "The internal energy change when a system goes from state A to B is 60 kJ/mole. If the system goes from A to B by a reversible path and returns to state A by an irreversible path, what would be the net change in internal energy?",
    options: [
      "60 kJ",
      "Greater than 60 kJ",
      "Less than 60 kJ",
      "Zero"
    ],
    correct_index: 3,
    solution: "Internal energy (U) is a state function. In any closed cyclic process returning to initial state A, the net change in internal energy ΔU = 0 regardless of whether the path is reversible or irreversible.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 98,
    question_text: "x ml of 1 M HCl and x ml of 1 M NaOH are mixed then temperature increases by y°C. If 2x ml of same acid and base is mixed then temperature increases by",
    options: [
      "y°C",
      "2y°C",
      "0.5y°C",
      "3y°C"
    ],
    correct_index: 0,
    solution: "When the volume of both reactants is doubled, the heat evolved doubles (2q). However, the total mass/volume of the solution also doubles (2m). ΔT = (2q) / ((2m) * s) = q / (m * s) = y°C. Hence the temperature increase remains unchanged at y°C.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 99,
    question_text: "The specific heat at constant volume for a gas is 0.075 cal/g and at constant pressure is 0.125 cal/g. Find the atomicity of gas",
    options: [
      "One",
      "Two",
      "Three",
      "Four"
    ],
    correct_index: 0,
    solution: "γ = c_p / c_v = 0.125 / 0.075 = 5/3 = 1.67. A gas with specific heat ratio γ = 1.67 is monoatomic, so its atomicity is 1 (One).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 100,
    question_text: "If enthalpy of solution of anhydrous and hydrated copper sulphate is -x and y kJ/mol respectively, then enthalpy of hydration of anhydrous copper sulphate into hydrated copper sulphate is",
    options: [
      "(x + y) kJ mol^-1",
      "(x - y) kJ mol^-1",
      "((x + y) / 2) kJ mol^-1",
      "-(x + y) kJ mol^-1"
    ],
    correct_index: 3,
    solution: "Hydration: CuSO4(s) + 5H2O(l) -> CuSO4.5H2O(s). ΔH_hydration = ΔH_sol(anhydrous) - ΔH_sol(hydrated) = (-x) - (y) = -(x + y) kJ mol^-1.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 101,
    question_text: "Which among the following is an extensive property?",
    options: [
      "Standard electrode potential",
      "pH",
      "Free energy",
      "Molarity"
    ],
    correct_index: 2,
    solution: "Gibbs free energy (G) depends directly on the amount/mass of substance in the system, making it an extensive property. Standard electrode potential, pH, and molarity are intensive properties.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 102,
    question_text: "The equilibrium constant for a reaction is 1 * 10^2 at 300 K. The standard free energy change for this reaction is (approx.)",
    options: [
      "+11.5 kJ",
      "-11.5 kJ",
      "+26.6 kJ",
      "-26.6 kJ"
    ],
    correct_index: 1,
    solution: "ΔG° = -2.303 RT log10(K) = -2.303 * 8.314 * 300 * log10(10^2) = -2.303 * 8.314 * 300 * 2 = -11488 J = -11.5 kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 103,
    question_text: "The reaction will non-spontaneous, if",
    options: [
      "ΔH = +ve and ΔS = +ve",
      "ΔH = -ve and ΔS = -ve",
      "ΔH = -ve and ΔS = +ve",
      "ΔH = +ve and ΔS = -ve"
    ],
    correct_index: 3,
    solution: "From ΔG = ΔH - TΔS, when ΔH > 0 (endothermic) and ΔS < 0 (decrease in entropy), the term -TΔS is positive at all temperatures, so ΔG is always positive (non-spontaneous at all temperatures).",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 104,
    question_text: "The work done in an open vessel at 300 K, when 112 g iron reacts with dil. HCl to form FeCl2 is",
    options: [
      "1200 cal",
      "600 cal",
      "300 cal",
      "200 cal"
    ],
    correct_index: 0,
    solution: "Reaction: Fe(s) + 2HCl(aq) -> FeCl2(aq) + H2(g). Moles of Fe = 112 / 56 = 2 mol. Moles of H2 evolved = 2 mol. In open vessel at constant pressure, work done against atmosphere = P ΔV = n R T = 2 * 2 cal/(mol K) * 300 K = 1200 cal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 105,
    question_text: "Enthalpy and entropy of reaction A -> B are -20 kJ/mole and -400 J/(mole K) respectively, then at what temperature the process will be spontaneous?",
    options: [
      "60 K",
      "100 K",
      "25 K",
      "All of these"
    ],
    correct_index: 2,
    solution: "For spontaneity, ΔG = ΔH - TΔS < 0 => -20000 - T(-400) < 0 => 400 T < 20000 => T < 50 K. Among given options, only 25 K is less than 50 K.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 106,
    question_text: "Which is correct?",
    options: [
      "For coupled reaction ΔG = positive always",
      "For irreversible isothermal process, ΔS_total > 0",
      "At equilibrium, ΔG° = 0",
      "For cyclic process, ΔU != 0"
    ],
    correct_index: 1,
    solution: "According to the Second Law of Thermodynamics, every spontaneous (irreversible) process results in a net increase in the total entropy of the universe: ΔS_total = ΔS_sys + ΔS_surr > 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 107,
    question_text: "Calculate enthalpy of the reaction: CH≡CH + 2H2 -> CH3-CH3. Given bond energy of C≡C, C-H, H-H, C-C are 194, 99, 104, 83 kcal respectively",
    options: [
      "181 kcal",
      "77 kcal",
      "-181 kcal",
      "-77 kcal"
    ],
    correct_index: 3,
    solution: "Reactant bonds broken: 1 C≡C (194) + 2 C-H (2*99=198) + 2 H-H (2*104=208) = 600 kcal. Product bonds formed: 1 C-C (83) + 6 C-H (6*99=594) = 677 kcal. ΔH = 600 - 677 = -77 kcal.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 108,
    question_text: "For which of the following reaction heat change at constant pressure is not equal to heat change at constant volume?",
    options: [
      "Dissociation of HI(g) into H2(g) and I2(g)",
      "Combustion of graphite",
      "Formation of ammonia",
      "All of these"
    ],
    correct_index: 2,
    solution: "q_p - q_v = Δn_g RT. Heat changes differ only when Δn_g != 0. In formation of ammonia: N2(g) + 3H2(g) -> 2NH3(g), Δn_g = 2 - 4 = -2 != 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 109,
    question_text: "The enthalpy of formation of H2O(vap) is -a kJ/mol and enthalpy of vaporisation of liquid water is b kJ/mol. The enthalpy of formation of H2O(l) is",
    options: [
      "-(a + b) kJ",
      "(a + b) kJ",
      "(a - b) kJ",
      "(b - a) kJ"
    ],
    correct_index: 0,
    solution: "H2(g) + 1/2 O2(g) -> H2O(g), ΔH = -a. H2O(l) -> H2O(g), ΔH = b. Formation of liquid water: H2(g) + 1/2 O2(g) -> H2O(l) = [H2 + 1/2 O2 -> H2O(g)] - [H2O(l) -> H2O(g)] = -a - b = -(a + b) kJ.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 110,
    question_text: "Which among the following is/are an intensive properties?\n(1) Normality\n(2) pH\n(3) Temperature\n(4) All of these",
    options: [
      "Normality",
      "pH",
      "Temperature",
      "All of these"
    ],
    correct_index: 3,
    solution: "Intensive properties do not depend on the mass or total size of the sample. Concentration terms (normality), pH, and temperature are all intensive properties.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  },
  {
    question_number: 111,
    question_text: "The correct statement is:",
    options: [
      "Total entropy at equilibrium state is maximum",
      "Total change in entropy at equilibrium is not zero",
      "Work done in isothermal free expansion process is non-zero",
      "ΔG° must be zero at equilibrium"
    ],
    correct_index: 0,
    solution: "At thermodynamic equilibrium, the total entropy of the system and its surroundings (universe) reaches its maximum possible value, and dS_total = 0.",
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Thermodynamics',
    marks: 4,
    question_type: 'single_choice',
    image_url: null
  }
];

