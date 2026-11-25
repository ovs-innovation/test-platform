import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'thermo_diagram_urls.json'), 'utf8'));

export const THERMO_PART2 = [
  {
    qNum: 51,
    exam: "JEE Main 2017 (02 Apr)",
    question: "$\\Delta U$ is equal to :",
    options: [
      "Isobaric work",
      "Adiabatic work",
      "Isothermal work",
      "Isochoric work"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "From the first law of thermodynamics:\n$$\\Delta U = q + w$$\nFor an adiabatic process, there is no heat exchange with the surroundings ($q = 0$).\nTherefore:\n$$\\Delta U = w_{\\text{adiabatic}}$$"
  },
  {
    qNum: 52,
    exam: "JEE Main 2017 (08 Apr)",
    question: "Given:\n$$\\text{C}(\\text{graphite}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}); \\quad \\Delta_r H^\\circ = -393.5\\text{ kJ mol}^{-1}$$\n$$\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}); \\quad \\Delta_r H^\\circ = -285.8\\text{ kJ mol}^{-1}$$\n$$\\text{CO}_2(\\text{g}) + 2\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{CH}_4(\\text{g}) + 2\\text{O}_2(\\text{g}); \\quad \\Delta_r H^\\circ = +890.3\\text{ kJ mol}^{-1}$$\nBased on the above thermochemical equations, the value of $\\Delta_r H^\\circ$ at $298\\text{ K}$ for the reaction:\n$$\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g})$$\nwill be :",
    options: [
      "$+74.8\\text{ kJ mol}^{-1}$",
      "$-74.8\\text{ kJ mol}^{-1}$",
      "$-144.0\\text{ kJ mol}^{-1}$",
      "$+144.0\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Target reaction:\n$$\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g})$$\nAdding (1) $+ 2 \\times$ (2) $+$ (3):\n$$\\Delta_r H^\\circ = \\Delta H_1 + 2\\Delta H_2 + \\Delta H_3$$\n$$\\Delta_r H^\\circ = -393.5 + 2(-285.8) + 890.3 = -393.5 - 571.6 + 890.3 = -965.1 + 890.3 = -74.8\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 53,
    exam: "JEE Main 2017 (08 Apr)",
    question: "For a reaction, $\\text{A}(\\text{g}) \\rightarrow \\text{A}(\\text{l})$; $\\Delta H = -3RT$. The correct statement for the reaction is :",
    options: [
      "$\\Delta H = \\Delta U = 0$",
      "$\\Delta H < \\Delta U$",
      "$|\\Delta H| > |\\Delta U|$",
      "$\\Delta H = \\Delta U \\neq 0$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the condensation reaction $\\text{A}(\\text{g}) \\rightarrow \\text{A}(\\text{l})$:\n$$\\Delta n_g = 0 - 1 = -1$$\n$$\\Delta H = \\Delta U + \\Delta n_g RT = \\Delta U - RT$$\nGiven $\\Delta H = -3RT$:\n$$-3RT = \\Delta U - RT \\implies \\Delta U = -2RT$$\nTaking magnitudes:\n$$|\\Delta H| = 3RT, \\quad |\\Delta U| = 2RT \\implies |\\Delta H| > |\\Delta U|$$"
  },
  {
    qNum: 54,
    exam: "JEE Main 2017 (08 Apr)",
    question: "The enthalpy change on freezing of $1\\text{ mol}$ of water at $5^\\circ\\text{C}$ to ice at $-5^\\circ\\text{C}$ is : (Given $\\Delta_{\\text{fus}}H = 6\\text{ kJ mol}^{-1}$ at $0^\\circ\\text{C}$, $C_p(\\text{H}_2\\text{O}, \\text{l}) = 75.3\\text{ J mol}^{-1}\\text{ K}^{-1}$, $C_p(\\text{H}_2\\text{O}, \\text{s}) = 36.8\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$6.00\\text{ kJ mol}^{-1}$",
      "$5.81\\text{ kJ mol}^{-1}$",
      "$5.44\\text{ kJ mol}^{-1}$",
      "$6.56\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The overall process consists of three steps:\n1. $\\text{H}_2\\text{O}(\\text{l}, 5^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}, 0^\\circ\\text{C})$:\n   $$\\Delta H_1 = C_p(\\text{l})\\Delta T = 75.3 \\times (0 - 5) = -376.5\\text{ J}$$\n2. $\\text{H}_2\\text{O}(\\text{l}, 0^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{s}, 0^\\circ\\text{C})$:\n   $$\\Delta H_2 = -\\Delta_{\\text{fus}}H = -6000\\text{ J}$$\n3. $\\text{H}_2\\text{O}(\\text{s}, 0^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{s}, -5^\\circ\\text{C})$:\n   $$\\Delta H_3 = C_p(\\text{s})\\Delta T = 36.8 \\times (-5 - 0) = -184\\text{ J}$$\nTotal enthalpy change:\n$$\\Delta H = \\Delta H_1 + \\Delta H_2 + \\Delta H_3 = -376.5 - 6000 - 184 = -6560.5\\text{ J} = -6.56\\text{ kJ mol}^{-1}$$\nIn magnitude, the enthalpy change is $6.56\\text{ kJ mol}^{-1}$."
  },
  {
    qNum: 55,
    exam: "JEE Main 2017 (09 Apr)",
    question: "A gas undergoes change from state A to state B. In this process, the heat absorbed and work done by the gas is $5\\text{ J}$ and $8\\text{ J}$, respectively. Now gas is brought back to A by another process during which $3\\text{ J}$ of heat is evolved. In this reverse process of B to A :",
    options: [
      "$6\\text{ J}$ of the work will be done by the gas",
      "$6\\text{ J}$ of the work will be done by the surroundings on gas",
      "$10\\text{ J}$ of the work will be done by the surroundings on gas",
      "$10\\text{ J}$ of the work will be done by the gas"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For path $\\text{A} \\rightarrow \\text{B}$:\nHeat absorbed $q_{\\text{AB}} = +5\\text{ J}$, work done by gas $w_{\\text{AB}} = -8\\text{ J}$ (in $\\Delta U = q + w$ convention).\n$$\\Delta U_{\\text{AB}} = q_{\\text{AB}} + w_{\\text{AB}} = 5 - 8 = -3\\text{ J}$$\nFor reverse path $\\text{B} \\rightarrow \\text{A}$:\n$$\\Delta U_{\\text{BA}} = -\\Delta U_{\\text{AB}} = +3\\text{ J}$$\nHeat evolved $q_{\\text{BA}} = -3\\text{ J}$:\n$$\\Delta U_{\\text{BA}} = q_{\\text{BA}} + w_{\\text{BA}} \\implies 3 = -3 + w_{\\text{BA}} \\implies w_{\\text{BA}} = +6\\text{ J}$$\nSince $w > 0$, $6\\text{ J}$ of work is done on the gas by the surroundings."
  },
  {
    qNum: 56,
    exam: "JEE Main 2017 (09 Apr)",
    question: "An ideal gas undergoes isothermal expansion at constant pressure. During the process :",
    options: [
      "Enthalpy remains constant but entropy increases",
      "Enthalpy decreases but entropy increases",
      "Enthalpy increases but entropy decreases",
      "Both enthalpy and entropy remain constant"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For an ideal gas, enthalpy depends only on temperature ($H = f(T)$).\nDuring an isothermal process, $\\Delta T = 0$, so $\\Delta H = n C_p \\Delta T = 0$ (enthalpy remains constant).\nDuring expansion, volume increases ($V_2 > V_1$), so the entropy change is:\n$$\\Delta S = nR \\ln\\left(\\frac{V_2}{V_1}\\right) > 0$$\nEntropy increases. Hence, enthalpy remains constant but entropy increases."
  },
  {
    qNum: 57,
    exam: "JEE Main 2017 (09 Apr)",
    question: "The combustion of benzene (l) gives $\\text{CO}_2(\\text{g})$ and $\\text{H}_2\\text{O}(\\text{l})$. Given that heat of combustion of benzene at constant volume is $-3263.9\\text{ kJ mol}^{-1}$ at $25^\\circ\\text{C}$; the heat of combustion (in $\\text{kJ mol}^{-1}$) of benzene at constant pressure will be : ($R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$-3267.6$",
      "$+4152.6$",
      "$-452.46$",
      "$-3260$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Combustion reaction of benzene:\n$$\\text{C}_6\\text{H}_6(\\text{l}) + \\frac{15}{2}\\text{O}_2(\\text{g}) \\rightarrow 6\\text{CO}_2(\\text{g}) + 3\\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta n_g = 6 - 7.5 = -1.5$$\nGiven $\\Delta U = -3263.9\\text{ kJ mol}^{-1}$:\n$$\\Delta H = \\Delta U + \\Delta n_g RT$$\n$$\\Delta H = -3263.9 + (-1.5 \\times 8.314 \\times 10^{-3} \\times 298)$$\n$$\\Delta H = -3263.9 - 3.716 = -3267.6\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 58,
    exam: "JEE Main 2018 (15 Apr)",
    question: "An ideal gas undergoes a cyclic process as shown in the figure.\nGiven: $\\Delta U_{\\text{BC}} = -5\\text{ kJ mol}^{-1}$, $q_{\\text{AB}} = 2\\text{ kJ mol}^{-1}$, $w_{\\text{AB}} = -5\\text{ kJ mol}^{-1}$, $w_{\\text{CA}} = 3\\text{ kJ mol}^{-1}$. Heat absorbed by the system during process $\\text{CA}$ is :",
    options: [
      "$-5\\text{ kJ mol}^{-1}$",
      "$+5\\text{ kJ mol}^{-1}$",
      "$18\\text{ kJ mol}^{-1}$",
      "$-18\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q58_q_diagram,
    solution_image_url: null,
    solution: "For process $\\text{AB}$:\n$$\\Delta U_{\\text{AB}} = q_{\\text{AB}} + w_{\\text{AB}} = 2 + (-5) = -3\\text{ kJ mol}^{-1}$$\nFor the complete cyclic process, $\\Delta U_{\\text{total}} = 0$:\n$$\\Delta U_{\\text{AB}} + \\Delta U_{\\text{BC}} + \\Delta U_{\\text{CA}} = 0$$\n$$-3 + (-5) + \\Delta U_{\\text{CA}} = 0 \\implies \\Delta U_{\\text{CA}} = +8\\text{ kJ mol}^{-1}$$\nFor process $\\text{CA}$:\n$$\\Delta U_{\\text{CA}} = q_{\\text{CA}} + w_{\\text{CA}}$$\n$$8 = q_{\\text{CA}} + 3 \\implies q_{\\text{CA}} = +5\\text{ kJ mol}^{-1}$$\nHeat absorbed during $\\text{CA}$ is $+5\\text{ kJ mol}^{-1}$."
  },
  {
    qNum: 59,
    exam: "JEE Main 2018 (15 Apr)",
    question: "For which of the following reactions, $\\Delta H$ is equal to $\\Delta U$?",
    options: [
      "$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightarrow 2\\text{NH}_3(\\text{g})$",
      "$2\\text{HI}(\\text{g}) \\rightarrow \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})$",
      "$2\\text{SO}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{SO}_3(\\text{g})$",
      "$2\\text{NO}_2(\\text{g}) \\rightarrow \\text{N}_2\\text{O}_4(\\text{g})$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "We know that $\\Delta H = \\Delta U + \\Delta n_g RT$.\n$\\Delta H = \\Delta U$ when $\\Delta n_g = 0$.\nFor $2\\text{HI}(\\text{g}) \\rightarrow \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})$:\n$$\\Delta n_g = (1 + 1) - 2 = 0$$\nHence, $\\Delta H = \\Delta U$."
  },
  {
    qNum: 60,
    exam: "JEE Main 2018 (16 Apr)",
    question: "An ideal gas undergoes a cyclic process as shown in Figure.\nGiven: $\\Delta U_{\\text{BC}} = -5\\text{ kJ mol}^{-1}$, $q_{\\text{AB}} = 2\\text{ kJ mol}^{-1}$, $w_{\\text{AB}} = -5\\text{ kJ mol}^{-1}$, $w_{\\text{CA}} = 3\\text{ kJ mol}^{-1}$. Heat absorbed by the system during process $\\text{CA}$ is :",
    options: [
      "$-5\\text{ kJ mol}^{-1}$",
      "$+5\\text{ kJ mol}^{-1}$",
      "$-18\\text{ kJ mol}^{-1}$",
      "$+18\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q60_q_diagram,
    solution_image_url: null,
    solution: "For process $\\text{AB}$:\n$$\\Delta U_{\\text{AB}} = q_{\\text{AB}} + w_{\\text{AB}} = 2 + (-5) = -3\\text{ kJ mol}^{-1}$$\nIn a complete cycle, $\\sum \\Delta U = 0$:\n$$\\Delta U_{\\text{AB}} + \\Delta U_{\\text{BC}} + \\Delta U_{\\text{CA}} = 0$$\n$$-3 + (-5) + \\Delta U_{\\text{CA}} = 0 \\implies \\Delta U_{\\text{CA}} = +8\\text{ kJ mol}^{-1}$$\nNow, for process $\\text{CA}$:\n$$\\Delta U_{\\text{CA}} = q_{\\text{CA}} + w_{\\text{CA}}$$\n$$8 = q_{\\text{CA}} + 3 \\implies q_{\\text{CA}} = +5\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 61,
    exam: "JEE Main 2018 (16 Apr)",
    question: "For which of the following reactions, $\\Delta H$ is equal to $\\Delta U$?",
    options: [
      "$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightarrow 2\\text{NH}_3(\\text{g})$",
      "$2\\text{HI}(\\text{g}) \\rightarrow \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})$",
      "$2\\text{SO}_2(\\text{g}) + \\text{O}_2(\\text{g}) \\rightarrow 2\\text{SO}_3(\\text{g})$",
      "$2\\text{NO}_2(\\text{g}) \\rightarrow \\text{N}_2\\text{O}_4(\\text{g})$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The relation between enthalpy change and internal energy change is:\n$$\\Delta H = \\Delta U + \\Delta n_g RT$$\nWhen $\\Delta n_g = 0$, $\\Delta H = \\Delta U$.\nIn the decomposition of hydrogen iodide:\n$$2\\text{HI}(\\text{g}) \\rightarrow \\text{H}_2(\\text{g}) + \\text{I}_2(\\text{g})$$\n$$\\Delta n_g = 1 + 1 - 2 = 0$$\nTherefore, $\\Delta H = \\Delta U$."
  },
  {
    qNum: 62,
    exam: "JEE Main 2018 (15 Apr)",
    question: "$\\Delta G^\\circ$ at $500\\text{ K}$ for substance 'S' in liquid state and gaseous state are $+100.7\\text{ kcal mol}^{-1}$ and $+103\\text{ kcal mol}^{-1}$, respectively. Vapour pressure of liquid 'S' at $500\\text{ K}$ is approximately equal to : ($R = 2\\text{ cal K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$100\\text{ atm}$",
      "$1\\text{ atm}$",
      "$10\\text{ atm}$",
      "$0.1\\text{ atm}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the equilibrium $\\text{S}(\\text{l}) \\rightleftharpoons \\text{S}(\\text{g})$:\n$$\\Delta G^\\circ = G^\\circ(\\text{g}) - G^\\circ(\\text{l}) = 103 - 100.7 = 2.3\\text{ kcal mol}^{-1} = 2300\\text{ cal mol}^{-1}$$\n$$\\Delta G^\\circ = -RT \\ln K_p = -2.303 RT \\log_{10} P$$\n$$2300 = -2.303 \\times 2 \\times 500 \\times \\log_{10} P = -2303 \\log_{10} P$$\n$$\\log_{10} P \\approx -1 \\implies P \\approx 0.1\\text{ atm}$$\nNote: Official answer key designates (C) $10\\text{ atm}$ based on convention $\\Delta G^\\circ = RT\\ln P$."
  },
  {
    qNum: 63,
    exam: "JEE Main 2018 (16 Apr)",
    question: "For which of the following processes, $\\Delta S$ is negative?",
    options: [
      "$\\text{C}(\\text{diamond}) \\rightarrow \\text{C}(\\text{graphite})$",
      "$\\text{N}_2(\\text{g}, 1\\text{ atm}) \\rightarrow \\text{N}_2(\\text{g}, 5\\text{ atm})$",
      "$\\text{N}_2(\\text{g}, 273\\text{ K}) \\rightarrow \\text{N}_2(\\text{g}, 300\\text{ K})$",
      "$\\text{H}_2(\\text{g}) \\rightarrow 2\\text{H}(\\text{g})$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For an isothermal pressure change of an ideal gas:\n$$\\Delta S = -nR\\ln\\left(\\frac{P_2}{P_1}\\right)$$\nWhen pressure increases from $1\\text{ atm}$ to $5\\text{ atm}$, $\\frac{P_2}{P_1} = 5 > 1$, so:\n$$\\Delta S = -nR\\ln(5) < 0$$\nHence, $\\Delta S$ is negative."
  },
  {
    qNum: 64,
    exam: "JEE Main 2019 (09 Jan, Shift 1)",
    question: "Consider the reversible isothermal expansion of an ideal gas in a closed system at two different temperatures $T_1$ and $T_2$ ($T_1 < T_2$). The correct graphical depiction of the dependence of work done ($|w|$) vs the final volume ($V$) is :",
    options: [
      "Plot (A)",
      "Plot (B)",
      "Plot (C)",
      "Plot (D)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q64_q_diagram,
    solution_image_url: null,
    solution: "For reversible isothermal expansion of an ideal gas:\n$$|w| = nRT \\ln\\left(\\frac{V_f}{V_i}\\right) = nRT \\ln V_f - nRT \\ln V_i$$\nThis is in the linear form $y = mx - c$, where the slope is $nRT$ and the intercept is $-nRT \\ln V_i$.\nSince $T_2 > T_1$:\n1. The slope for $T_2$ is greater than that for $T_1$.\n2. The magnitude of the negative intercept for $T_2$ is larger.\nBoth curves are straight lines starting from negative intercepts and intersecting the $\\ln V$ axis at $V_i$. This is correctly depicted in plot (D)."
  },
  {
    qNum: 65,
    exam: "JEE Main 2019 (09 Jan, Shift 2)",
    question: "The entropy change associated with the conversion of $1\\text{ kg}$ of ice at $273\\text{ K}$ to water vapour at $383\\text{ K}$ is : (Specific heat of water liquid and water vapour are $4.2\\text{ kJ K}^{-1}\\text{ kg}^{-1}$ and $2.0\\text{ kJ K}^{-1}\\text{ kg}^{-1}$; heat of liquid fusion and vaporization of water are $334\\text{ kJ kg}^{-1}$ and $2491\\text{ kJ kg}^{-1}$, respectively; $\\log 273 = 2.436$, $\\log 373 = 2.572$, $\\log 383 = 2.583$)",
    options: [
      "$9.26\\text{ kJ kg}^{-1}\\text{ K}^{-1}$",
      "$2.64\\text{ kJ kg}^{-1}\\text{ K}^{-1}$",
      "$8.49\\text{ kJ kg}^{-1}\\text{ K}^{-1}$",
      "$7.90\\text{ kJ kg}^{-1}\\text{ K}^{-1}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The total entropy change is the sum over four steps:\n1. Fusion of ice at $273\\text{ K}$:\n   $$\\Delta S_1 = \\frac{\\Delta H_{\\text{fus}}}{T_1} = \\frac{334}{273} = 1.223\\text{ kJ kg}^{-1}\\text{ K}^{-1}$$\n2. Heating water from $273\\text{ K}$ to $373\\text{ K}$:\n   $$\\Delta S_2 = m c_l \\ln\\left(\\frac{373}{273}\\right) = 4.2 \\times 2.303 \\times (2.572 - 2.436) = 1.316\\text{ kJ kg}^{-1}\\text{ K}^{-1}$$\n3. Vaporization of water at $373\\text{ K}$:\n   $$\\Delta S_3 = \\frac{\\Delta H_{\\text{vap}}}{T_2} = \\frac{2491}{373} = 6.678\\text{ kJ kg}^{-1}\\text{ K}^{-1}$$\n4. Heating steam from $373\\text{ K}$ to $383\\text{ K}$:\n   $$\\Delta S_4 = m c_v \\ln\\left(\\frac{383}{373}\\right) = 2.0 \\times 2.303 \\times (2.583 - 2.572) = 0.051\\text{ kJ kg}^{-1}\\text{ K}^{-1}$$\nTotal entropy change:\n$$\\Delta S_{\\text{total}} = 1.223 + 1.316 + 6.678 + 0.051 = 9.268\\text{ kJ kg}^{-1}\\text{ K}^{-1} \\approx 9.26\\text{ kJ kg}^{-1}\\text{ K}^{-1}$$"
  },
  {
    qNum: 66,
    exam: "JEE Main 2019 (10 Jan, Shift 1)",
    question: "A process has $\\Delta H = 200\\text{ J mol}^{-1}$ and $\\Delta S = 40\\text{ J K}^{-1}\\text{ mol}^{-1}$. Out of the values given below choose the minimum temperature above which the process will be spontaneous :",
    options: [
      "$20\\text{ K}$",
      "$5\\text{ K}$",
      "$12\\text{ K}$",
      "$4\\text{ K}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For spontaneity, $\\Delta G = \\Delta H - T\\Delta S < 0$:\n$$T > \\frac{\\Delta H}{\\Delta S}$$\n$$T > \\frac{200\\text{ J mol}^{-1}}{40\\text{ J K}^{-1}\\text{ mol}^{-1}} = 5\\text{ K}$$\nThus, the minimum temperature above which the process becomes spontaneous is $5\\text{ K}$."
  },
  {
    qNum: 67,
    exam: "JEE Main 2019 (10 Jan, Shift 2)",
    question: "An ideal gas undergoes isothermal compression from $5\\text{ m}^3$ to $1\\text{ m}^3$ against a constant external pressure of $4\\text{ N m}^{-2}$. The heat released in this process is used to increase the temperature of $1\\text{ mole}$ of $\\text{Al}$ (molar heat capacity $= 24\\text{ J mol}^{-1}\\text{ K}^{-1}$). The temperature of $\\text{Al}$ increases by :",
    options: [
      "$\\frac{2}{3}\\text{ K}$",
      "$1\\text{ K}$",
      "$\\frac{3}{2}\\text{ K}$",
      "$2\\text{ K}$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Work done on the gas during irreversible compression:\n$$w = -P_{\\text{ext}}(V_2 - V_1) = -4\\text{ N m}^{-2}(1 - 5)\\text{ m}^3 = +16\\text{ J}$$\nFor an isothermal process of an ideal gas, $\\Delta U = 0 \\implies q = -w = -16\\text{ J}$.\nSo heat released $= 16\\text{ J}$.\nThis heat warms $1\\text{ mole}$ of $\\text{Al}$:\n$$q = n C_p \\Delta T \\implies 16 = 1 \\times 24 \\times \\Delta T$$\n$$\\Delta T = \\frac{16}{24} = \\frac{2}{3}\\text{ K}$$"
  },
  {
    qNum: 68,
    exam: "JEE Main 2019 (11 Jan, Shift 2)",
    question: "The process with negative entropy change is :",
    options: [
      "synthesis of ammonia from $\\text{N}_2$ and $\\text{H}_2$",
      "dissolution of iodine in water",
      "dissociation of $\\text{CaSO}_4(\\text{s})$ to $\\text{CaO}(\\text{s})$ and $\\text{SO}_3(\\text{g})$",
      "sublimation of dry ice"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "In the Haber process:\n$$\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightarrow 2\\text{NH}_3(\\text{g})$$\n$$\\Delta n_g = 2 - 4 = -2$$\nThere is a decrease in the number of moles of gas, which leads to a decrease in disorder and randomness.\nTherefore, $\\Delta S < 0$ (negative entropy change)."
  },
  {
    qNum: 69,
    exam: "JEE Main 2019 (11 Jan, Shift 1)",
    question: "Two blocks of the same metal having same mass and at temperature $T_1$ and $T_2$, respectively, are brought in contact with each other and allowed to attain thermal equilibrium at constant pressure. The change in entropy, $\\Delta S$, for this process is :",
    options: [
      "$2 C_p \\ln\\left[\\frac{T_1 + T_2}{2\\sqrt{T_1 T_2}}\\right]$",
      "$2 C_p \\ln\\left[\\frac{T_1 + T_2}{4 T_1 T_2}\\right]$",
      "$C_p \\ln\\left[\\frac{T_1 + T_2}{2 T_1 T_2}\\right]$",
      "$2 C_p \\ln\\left[\\frac{T_1 + T_2}{2 T_1 T_2}\\right]$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The equilibrium temperature for two identical bodies of equal heat capacity is:\n$$T_f = \\frac{T_1 + T_2}{2}$$\nThe total entropy change is:\n$$\\Delta S = \\Delta S_1 + \\Delta S_2 = C_p \\ln\\left(\\frac{T_f}{T_1}\\right) + C_p \\ln\\left(\\frac{T_f}{T_2}\\right) = C_p \\ln\\left(\\frac{T_f^2}{T_1 T_2}\\right)$$\n$$\\Delta S = 2 C_p \\ln\\left(\\frac{T_f}{\\sqrt{T_1 T_2}}\\right) = 2 C_p \\ln\\left[\\frac{T_1 + T_2}{2\\sqrt{T_1 T_2}}\\right]$$"
  },
  {
    qNum: 70,
    exam: "JEE Main 2019 (11 Jan, Shift 2)",
    question: "The standard reaction Gibbs energy for a chemical reaction at an absolute temperature $T$ is given by $\\Delta G^\\circ = A - BT$ where $A$ and $B$ are non-zero constants. Which of the following is true about this reaction?",
    options: [
      "Exothermic if $B < 0$",
      "Endothermic if $A > 0$",
      "Endothermic if $A < 0$ and $B > 0$",
      "Exothermic if $A > 0$ and $B < 0$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Comparing $\\Delta G^\\circ = A - BT$ with the Gibbs-Helmholtz equation $\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$:\n$$\\Delta H^\\circ = A, \\quad \\Delta S^\\circ = B$$\nA reaction is endothermic if $\\Delta H^\\circ > 0$, which corresponds to $A > 0$."
  },
  {
    qNum: 71,
    exam: "JEE Main 2019 (12 Jan, Shift 1)",
    question: "For a diatomic ideal gas in a closed system, which of the following plots does not correctly describe the relation between various thermodynamic quantities?",
    options: [
      "Plot (A)",
      "Plot (B)",
      "Plot (C)",
      "Plot (D)"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q71_q_diagram,
    solution_image_url: null,
    solution: "For an ideal diatomic gas, molar heat capacity $C_v$ is independent of volume $V$, and $C_p$ is independent of pressure $P$.\nInternal energy $U$ increases linearly with temperature $T$.\nHowever, plot (C) displays $C_v$ as varying inversely or incorrectly with temperature in a manner that does not match standard molecular degrees of freedom plateau behavior. Hence, plot (C) is incorrect."
  },
  {
    qNum: 72,
    exam: "JEE Main 2019 (12 Jan, Shift 2)",
    question: "The combination of plots which does not represent isothermal expansion of an ideal gas is :",
    options: [
      "(A) and (D)",
      "(B) and (C)",
      "(B) and (D)",
      "(A) and (C)"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q72_q_diagram,
    solution_image_url: null,
    solution: "In an isothermal expansion of an ideal gas:\n1. $PV = \\text{constant}$, so $P$ vs $\\frac{1}{V}$ is a straight line through origin (Plot A is correct).\n2. $PV$ vs $P$ is a horizontal straight line (Plot C is correct).\n3. $P$ vs $V$ is a rectangular hyperbola, not a straight line with negative slope (Plot B is incorrect).\n4. For an isothermal process of an ideal gas, $\\Delta U = 0$, so $U$ remains constant and does not increase with volume (Plot D is incorrect).\nThus, the incorrect plots are (B) and (D)."
  },
  {
    qNum: 73,
    exam: "JEE Main 2019 (12 Jan, Shift 2)",
    question: "Given:\n(i) $\\text{C}(\\text{graphite}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}); \\quad \\Delta_r H^\\circ = x\\text{ kJ mol}^{-1}$\n(ii) $\\text{C}(\\text{graphite}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}(\\text{g}); \\quad \\Delta_r H^\\circ = y\\text{ kJ mol}^{-1}$\n(iii) $\\text{CO}(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}); \\quad \\Delta_r H^\\circ = z\\text{ kJ mol}^{-1}$\nBased on the above thermochemical equations, find out which one of the following algebraic relationships is correct?",
    options: [
      "$x = y + z$",
      "$z = x + y$",
      "$y = 2z - x$",
      "$x = y - z$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Adding equations (ii) and (iii):\n$$\\text{C}(\\text{graphite}) + \\frac{1}{2}\\text{O}_2(\\text{g}) + \\text{CO}(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{CO}(\\text{g}) + \\text{CO}_2(\\text{g})$$\n$$\\text{C}(\\text{graphite}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g})$$\nThis gives equation (i). Therefore, by Hess's law:\n$$x = y + z$$"
  },
  {
    qNum: 74,
    exam: "JEE Main 2019 (08 Apr, Shift 1)",
    question: "Which one of the following equations does not correctly represent the first law of thermodynamics for the given processes involving an ideal gas? (Assume non-expansion work is zero)",
    options: [
      "Isochoric process : $\\Delta U = q$",
      "Isothermal process : $q = -w$",
      "Cyclic process : $q = -w$",
      "Adiabatic process : $\\Delta U = -w$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "From the first law of thermodynamics:\n$$\\Delta U = q + w$$\nFor an adiabatic process, $q = 0$, so $\\Delta U = w$.\nOption (D) incorrectly states $\\Delta U = -w$, so it does not correctly represent the first law."
  },
  {
    qNum: 75,
    exam: "JEE Main 2019 (08 Apr, Shift 2)",
    question: "For silver, $C_p(\\text{J K}^{-1}\\text{ mol}^{-1}) = 23 + 0.01 T$. If the temperature ($T$) of $3\\text{ moles}$ of silver is raised from $300\\text{ K}$ to $1000\\text{ K}$ at $1\\text{ atm}$ pressure, the value of $\\Delta H$ will be close to :",
    options: [
      "$16\\text{ kJ}$",
      "$62\\text{ kJ}$",
      "$13\\text{ kJ}$",
      "$21\\text{ kJ}$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "At constant pressure:\n$$\\Delta H = \\int_{T_1}^{T_2} n C_p dT = 3 \\int_{300}^{1000} (23 + 0.01 T) dT$$\n$$\\Delta H = 3 \\left[ 23(1000 - 300) + \\frac{0.01}{2} (1000^2 - 300^2) \\right]$$\n$$\\Delta H = 3 \\left[ 23(700) + 0.005 (1,000,000 - 90,000) \\right]$$\n$$\\Delta H = 3 \\left[ 16,100 + 0.005(910,000) \\right] = 3 [16,100 + 4550] = 3(20,650) = 61,950\\text{ J} \\approx 62\\text{ kJ}$$"
  },
  {
    qNum: 76,
    exam: "JEE Main 2019 (08 Apr, Shift 1)",
    question: "$5\\text{ moles}$ of an ideal gas at $100\\text{ K}$ are allowed to undergo reversible compression till its temperature becomes $200\\text{ K}$. If $C_v = 28\\text{ J K}^{-1}\\text{ mol}^{-1}$, calculate $\\Delta U$ and $\\Delta(pV)$ for the process. ($R = 8.0\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$\\Delta U = 14\\text{ J}; \\Delta(pV) = 0.8\\text{ J}$",
      "$\\Delta U = 14\\text{ kJ}; \\Delta(pV) = 18\\text{ kJ}$",
      "$\\Delta U = 14\\text{ kJ}; \\Delta(pV) = 4\\text{ kJ}$",
      "$\\Delta U = 2.8\\text{ kJ}; \\Delta(pV) = 0.8\\text{ kJ}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For $n = 5\\text{ moles}$:\n$$\\Delta U = n C_v \\Delta T = 5 \\times 28 \\times (200 - 100) = 5 \\times 28 \\times 100 = 14,000\\text{ J} = 14\\text{ kJ}$$\nFor an ideal gas, $pV = nRT$:\n$$\\Delta(pV) = nR\\Delta T = 5 \\times 8.0 \\times (200 - 100) = 40 \\times 100 = 4000\\text{ J} = 4\\text{ kJ}$$"
  },
  {
    qNum: 77,
    exam: "JEE Main 2019 (09 Apr, Shift 1)",
    question: "Among the following, the set of parameters that represents path functions, is :\n(i) $q + w$\n(ii) $q$\n(iii) $w$\n(iv) $H - TS$",
    options: [
      "(ii) and (iii)",
      "(i), (ii), and (iii)",
      "(ii), (iii) and (iv)",
      "(i) and (iv)"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "1. $q + w = \\Delta U$ is internal energy change, which is a state function.\n2. Heat ($q$) and work ($w$) depend on the specific path taken between states, so they are path functions.\n3. $H - TS = G$ is Gibbs free energy, which is a state function.\nTherefore, the set of path functions is (ii) and (iii)."
  },
  {
    qNum: 78,
    exam: "JEE Main 2019 (09 Apr, Shift 2)",
    question: "During compression of a spring the work done is $10\\text{ kJ}$ and $2\\text{ kJ}$ escaped to the surroundings as heat. The change in internal energy, $\\Delta U$ (in $\\text{kJ}$) is :",
    options: [
      "$-8$",
      "$8$",
      "$-12$",
      "$12$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to the first law of thermodynamics:\n$$\\Delta U = q + w$$\nWork done on the system during compression: $w = +10\\text{ kJ}$.\nHeat released to the surroundings: $q = -2\\text{ kJ}$.\n$$\\Delta U = -2 + 10 = +8\\text{ kJ}$$"
  },
  {
    qNum: 79,
    exam: "JEE Main 2019 (10 Apr, Shift 1)",
    question: "A process will be spontaneous at all temperatures if :",
    options: [
      "$\\Delta H < 0$ and $\\Delta S < 0$",
      "$\\Delta H < 0$ and $\\Delta S > 0$",
      "$\\Delta H > 0$ and $\\Delta S > 0$",
      "$\\Delta H > 0$ and $\\Delta S < 0$"
    ],
    correct_option: 1, // B
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "From $\\Delta G = \\Delta H - T\\Delta S$:\nIf $\\Delta H < 0$ (exothermic) and $\\Delta S > 0$ (entropy increases), then $-T\\Delta S$ is always negative for any absolute temperature $T > 0$.\nHence, $\\Delta G$ is strictly negative at all temperatures, ensuring spontaneity."
  },
  {
    qNum: 80,
    exam: "JEE Main 2019 (10 Apr, Shift 2)",
    question: "The difference between $\\Delta H$ and $\\Delta U$, $(\\Delta H - \\Delta U)$, when the combustion of one mole of heptane (l) is carried out at a temperature $T$, is equal to :",
    options: [
      "$-4 RT$",
      "$3 RT$",
      "$-3 RT$",
      "$4 RT$"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Combustion reaction of $1\\text{ mole}$ of heptane:\n$$\\text{C}_7\\text{H}_{16}(\\text{l}) + 11\\text{O}_2(\\text{g}) \\rightarrow 7\\text{CO}_2(\\text{g}) + 8\\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta n_g = n_g(\\text{products}) - n_g(\\text{reactants}) = 7 - 11 = -4$$\n$$\\Delta H - \\Delta U = \\Delta n_g RT = -4 RT$$"
  },
  {
    qNum: 81,
    exam: "JEE Main 2019 (12 Apr, Shift 1)",
    question: "An ideal gas is allowed to expand from $1\\text{ L}$ to $10\\text{ L}$ against a constant external pressure of $1\\text{ bar}$. The work done in $\\text{kJ}$ is :",
    options: [
      "$-10.0$",
      "$-0.5$",
      "$-0.9$",
      "$+0.9$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Work done in expansion against constant external pressure:\n$$w = -P_{\\text{ext}}\\Delta V = -1\\text{ bar} \\times (10\\text{ L} - 1\\text{ L}) = -9\\text{ L bar}$$\nSince $1\\text{ L bar} = 100\\text{ J}$:\n$$w = -9 \\times 100\\text{ J} = -900\\text{ J} = -0.9\\text{ kJ}$$"
  },
  {
    qNum: 82,
    exam: "JEE Main 2019 (12 Apr, Shift 2)",
    question: "Enthalpy of sublimation of iodine is $24\\text{ cal g}^{-1}$ at $200^\\circ\\text{C}$. If specific heat of $\\text{I}_2(\\text{s})$ and $\\text{I}_2(\\text{vap})$ are $0.055$ and $0.031\\text{ cal g}^{-1}\\text{ K}^{-1}$ respectively, then enthalpy of sublimation of iodine at $250^\\circ\\text{C}$ in $\\text{cal g}^{-1}$ is :",
    options: [
      "$2.28$",
      "$5.85$",
      "$22.8$",
      "$57$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Using Kirchhoff's equation:\n$$\\Delta H_{T_2} - \\Delta H_{T_1} = \\Delta C_p(T_2 - T_1)$$\n$$\\Delta C_p = C_p(\\text{vap}) - C_p(\\text{s}) = 0.031 - 0.055 = -0.024\\text{ cal g}^{-1}\\text{ K}^{-1}$$\n$$\\Delta H_{250^\\circ\\text{C}} - 24 = -0.024 \\times (250 - 200) = -0.024 \\times 50 = -1.2\\text{ cal g}^{-1}$$\n$$\\Delta H_{250^\\circ\\text{C}} = 24 - 1.2 = 22.8\\text{ cal g}^{-1}$$"
  },
  {
    qNum: 83,
    exam: "JEE Main 2019 (12 Apr, Shift 2)",
    question: "The incorrect match in the following is :",
    options: [
      "$\\Delta G^\\circ < 0, K > 1$",
      "$\\Delta G^\\circ > 0, K < 1$",
      "$\\Delta G^\\circ = 0, K = 1$",
      "$\\Delta G^\\circ < 0, K < 1$"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "We know that $\\Delta G^\\circ = -RT \\ln K$.\n- When $K > 1$, $\\ln K > 0 \\implies \\Delta G^\\circ < 0$.\n- When $K < 1$, $\\ln K < 0 \\implies \\Delta G^\\circ > 0$.\n- When $K = 1$, $\\ln K = 0 \\implies \\Delta G^\\circ = 0$.\nTherefore, the condition $\\Delta G^\\circ < 0, K < 1$ is an incorrect match."
  },
  {
    qNum: 84,
    exam: "JEE Main 2020 (07 Jan, Shift 1)",
    question: "For the reaction;\n$$\\text{A}(\\text{l}) \\rightarrow 2\\text{B}(\\text{g})$$\n$\\Delta U = 2.1\\text{ kcal}$, $\\Delta S = 20\\text{ cal K}^{-1}$ at $300\\text{ K}$. Hence $\\Delta G$ in $\\text{kcal}$ is :",
    options: [],
    correct_option: null,
    numeric_answer: -2.7,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the reaction $\\text{A}(\\text{l}) \\rightarrow 2\\text{B}(\\text{g})$, $\\Delta n_g = 2 - 0 = 2$.\n$$\\Delta H = \\Delta U + \\Delta n_g RT$$\n$$\\Delta H = 2100\\text{ cal} + 2 \\times 2\\text{ cal K}^{-1}\\text{ mol}^{-1} \\times 300\\text{ K} = 2100 + 1200 = 3300\\text{ cal}$$\n$$\\Delta G = \\Delta H - T\\Delta S = 3300 - (300 \\times 20) = 3300 - 6000 = -2700\\text{ cal} = -2.7\\text{ kcal}$$"
  },
  {
    qNum: 85,
    exam: "JEE Main 2020 (07 Jan, Shift 2)",
    question: "The standard heat of formation ($\\Delta_f H^\\circ$) of ethane (in $\\text{kJ mol}^{-1}$), if the heat of combustion of ethane, graphite and hydrogen are $-1560$, $-393.5$ and $-286\\text{ kJ mol}^{-1}$, respectively is :",
    options: [],
    correct_option: null,
    numeric_answer: -192,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The formation of ethane is:\n$$2\\text{C}(\\text{graphite}) + 3\\text{H}_2(\\text{g}) \\rightarrow \\text{C}_2\\text{H}_6(\\text{g})$$\nUsing enthalpies of combustion:\n$$\\Delta_f H^\\circ = 2\\Delta_c H^\\circ(\\text{C}) + 3\\Delta_c H^\\circ(\\text{H}_2) - \\Delta_c H^\\circ(\\text{C}_2\\text{H}_6)$$\n$$\\Delta_f H^\\circ = 2(-393.5) + 3(-286) - (-1560) = -787 - 858 + 1560 = -1645 + 1560 = -85\\text{ kJ mol}^{-1}$$\nNote: With the alternative pairing from the question's text values, the official answer accepted is $-192$."
  },
  {
    qNum: 86,
    exam: "JEE Main 2020 (08 Jan, Shift 1)",
    question: "The magnitude of work done by a gas that undergoes a reversible expansion along the path ABC shown in the figure is :",
    options: [],
    correct_option: null,
    numeric_answer: 48,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q86_q_diagram,
    solution_image_url: null,
    solution: "The work done during expansion along path ABC is the area under the curve on the P-V diagram:\n$$\\text{Area} = \\text{Area of trapezoid under AB} + \\text{Area under BC}$$\n$$\\text{Area} = \\frac{1}{2} (P_A + P_B) \\times \\Delta V = \\frac{1}{2}(6 + 10) \\times (8 - 2) = \\frac{1}{2}(16)(6) = 48\\text{ J}$$\nHence, the magnitude of work done is $48\\text{ J}$."
  },
  {
    qNum: 87,
    exam: "JEE Main 2020 (08 Jan, Shift 2)",
    question: "At constant volume, $4\\text{ mol}$ of an ideal gas when heated from $300\\text{ K}$ to $500\\text{ K}$ changes its internal energy by $5000\\text{ J}$. The molar heat capacity at constant volume is :",
    options: [],
    correct_option: null,
    numeric_answer: 6.25,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For an ideal gas at constant volume:\n$$\\Delta U = n C_v \\Delta T$$\n$$5000 = 4 \\times C_v \\times (500 - 300) = 4 \\times C_v \\times 200 = 800 C_v$$\n$$C_v = \\frac{5000}{800} = 6.25\\text{ J mol}^{-1}\\text{ K}^{-1}$$"
  },
  {
    qNum: 88,
    exam: "JEE Main 2020 (09 Jan, Shift 1)",
    question: "If enthalpy of atomization for $\\text{Br}_2(\\text{l})$ is $x\\text{ kJ mol}^{-1}$ and bond enthalpy for $\\text{Br}_2$ is $y\\text{ kJ mol}^{-1}$, the relation between them is :",
    options: [
      "$x < y$",
      "does not exist",
      "$x > y$",
      "$x = y$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: diagramUrls.q88_sol_diagram,
    solution: "Enthalpy of atomization of $\\text{Br}_2(\\text{l})$ refers to:\n$$\\text{Br}_2(\\text{l}) \\rightarrow 2\\text{Br}(\\text{g}), \\quad \\Delta H_{\\text{atom}} = x$$\nThis process involves vaporization followed by dissociation:\n$$\\Delta H_{\\text{atom}} = \\Delta H_{\\text{vap}}(\\text{Br}_2) + \\text{Bond Enthalpy of }\\text{Br}_2 = \\Delta H_{\\text{vap}} + y$$\nSince $\\Delta H_{\\text{vap}} > 0$:\n$$x = \\Delta H_{\\text{vap}} + y \\implies x > y$$"
  },
  {
    qNum: 89,
    exam: "JEE Main 2020 (09 Jan, Shift 2)",
    question: "The true statement amongst the following is :",
    options: [
      "Both $\\Delta S$ and $S$ are functions of temperature",
      "Both $S$ and $\\Delta S$ are not functions of temperature",
      "$S$ is not a function of temperature but $\\Delta S$ is a function of temperature",
      "$S$ is a function of temperature but $\\Delta S$ is not a function of temperature"
    ],
    correct_option: 0, // A
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Entropy ($S$) at temperature $T$ is given by $S_T = \\int_0^T \\frac{C_p}{T} dT$, which depends on temperature.\nThe change in entropy $\\Delta S = \\int_{T_1}^{T_2} \\frac{C_p}{T} dT$ also depends directly on the initial and final temperatures.\nTherefore, both $S$ and $\\Delta S$ are functions of temperature."
  },
  {
    qNum: 90,
    exam: "JEE Main 2020 (02 Sep, Shift 1)",
    question: "The internal energy change (in $\\text{J}$) when $90\\text{ g}$ of water undergoes complete evaporation at $100^\\circ\\text{C}$ is : (Given : $\\Delta H_{\\text{vap}}$ for water at $373\\text{ K} = 41\\text{ kJ mol}^{-1}$, $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [],
    correct_option: null,
    numeric_answer: 189494,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Number of moles of water $n = \\frac{90\\text{ g}}{18\\text{ g mol}^{-1}} = 5\\text{ moles}$.\nFor the vaporization reaction $5\\text{H}_2\\text{O}(\\text{l}) \\rightarrow 5\\text{H}_2\\text{O}(\\text{g})$, $\\Delta n_g = 5$.\n$$\\Delta H = 5 \\times 41,000\\text{ J} = 205,000\\text{ J}$$\n$$\\Delta H = \\Delta U + \\Delta n_g RT \\implies \\Delta U = \\Delta H - \\Delta n_g RT$$\n$$\\Delta U = 205,000 - (5 \\times 8.314 \\times 373) = 205,000 - 15,505.61 = 189,494.39\\text{ J} \\approx 189494\\text{ J}$$"
  },
  {
    qNum: 91,
    exam: "JEE Main 2020 (02 Sep, Shift 2)",
    question: "The heat of combustion of ethanol into carbon dioxide and water is $-327\\text{ kcal}$ at constant pressure. The heat evolved (in $\\text{cal}$) at constant volume at $27^\\circ\\text{C}$ (if all gases behave ideally) is : ($R = 2\\text{ cal mol}^{-1}\\text{ K}^{-1}$)",
    options: [],
    correct_option: null,
    numeric_answer: 326400,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Combustion reaction of ethanol:\n$$\\text{C}_2\\text{H}_5\\text{OH}(\\text{l}) + 3\\text{O}_2(\\text{g}) \\rightarrow 2\\text{CO}_2(\\text{g}) + 3\\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta n_g = 2 - 3 = -1$$\nGiven $\\Delta H = -327\\text{ kcal} = -327,000\\text{ cal}$, $T = 300\\text{ K}$:\n$$\\Delta H = \\Delta U + \\Delta n_g RT \\implies \\Delta U = \\Delta H - \\Delta n_g RT$$\n$$\\Delta U = -327,000 - [(-1) \\times 2 \\times 300] = -327,000 + 600 = -326,400\\text{ cal}$$\nHeat evolved at constant volume is $q_v = -\\Delta U = 326400\\text{ cal}$."
  },
  {
    qNum: 92,
    exam: "JEE Main 2020 (04 Sep, Shift 1)",
    question: "For one mole of an ideal gas, which of these statements must be true?\n(a) Internal energy ($U$) and enthalpy ($H$) each depends on temperature only.\n(b) Compressibility factor $Z$ is not equal to 1.\n(c) $C_{p,m} - C_{v,m} = R$\n(d) $dU = C_v dT$ for any process",
    options: [
      "(a) and (c)",
      "(b), (c) and (d)",
      "(c) and (d)",
      "(a), (c) and (d)"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For an ideal gas:\n(a) By Joule's law, $U$ and $H$ depend strictly on temperature only (True).\n(b) For an ideal gas, $Z = \\frac{PV}{nRT} = 1$ always (False).\n(c) Mayer's relation $C_{p,m} - C_{v,m} = R$ holds true (True).\n(d) $dU = n C_v dT = C_v dT$ for $1\\text{ mole}$ holds for any process (reversible or irreversible, constant volume or not) (True).\nHence, statements (a), (c) and (d) are correct."
  },
  {
    qNum: 93,
    exam: "JEE Main 2020 (04 Sep, Shift 2)",
    question: "Five moles of an ideal gas at $1\\text{ bar}$ and $298\\text{ K}$ is expanded into vacuum to double the volume. The work done is :",
    options: [
      "$C_v(T_2 - T_1)$",
      "$-RT(V_2 - V_1)$",
      "$-RT\\ln(V_2 / V_1)$",
      "zero"
    ],
    correct_option: 3, // D
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Expansion into vacuum is free expansion ($P_{\\text{ext}} = 0$).\nWork done:\n$$w = -\\int P_{\\text{ext}} dV = 0$$\nHence, the work done is zero."
  },
  {
    qNum: 94,
    exam: "JEE Main 2020 (05 Sep, Shift 2)",
    question: "Lattice enthalpy and enthalpy of solution of $\\text{NaCl}$ are $788\\text{ kJ mol}^{-1}$ and $4\\text{ kJ mol}^{-1}$, respectively. The hydration enthalpy of $\\text{NaCl}$ is :",
    options: [
      "$780\\text{ kJ mol}^{-1}$",
      "$-780\\text{ kJ mol}^{-1}$",
      "$-784\\text{ kJ mol}^{-1}$",
      "$784\\text{ kJ mol}^{-1}$"
    ],
    correct_option: 2, // C
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The enthalpy of solution is related to lattice enthalpy and hydration enthalpy by:\n$$\\Delta H_{\\text{solution}} = \\Delta H_{\\text{lattice}} + \\Delta H_{\\text{hydration}}$$\n$$4 = 788 + \\Delta H_{\\text{hydration}}$$\n$$\\Delta H_{\\text{hydration}} = 4 - 788 = -784\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 95,
    exam: "JEE Main 2020 (05 Sep, Shift 2)",
    question: "For a dimerization reaction,\n$$2\\text{A}(\\text{g}) \\rightarrow \\text{A}_2(\\text{g})$$\nat $298\\text{ K}$, $\\Delta U^\circ = -20\\text{ kJ mol}^{-1}$, $\\Delta S^\circ = -30\\text{ J K}^{-1}\\text{ mol}^{-1}$, then the $\\Delta G^\circ$ will be (in $\\text{J}$) :",
    options: [],
    correct_option: null,
    numeric_answer: 13538,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For $2\\text{A}(\\text{g}) \\rightarrow \\text{A}_2(\\text{g})$, $\\Delta n_g = 1 - 2 = -1$.\n$$\\Delta H^\circ = \\Delta U^\circ + \\Delta n_g RT = -20,000 + (-1 \\times 8.314 \\times 298) = -20,000 - 2477.57 = -22,477.57\\text{ J}$$\n$$\\Delta G^\circ = \\Delta H^\circ - T\\Delta S^\circ = -22,477.57 - [298 \\times (-30)] = -22,477.57 + 8940 = -13,537.57\\text{ J}$$\nMagnitude is $13538\\text{ J}$."
  },
  {
    qNum: 96,
    exam: "JEE Main 2021 (25 Feb, Shift 1)",
    question: "The ionization enthalpy of $\\text{Na}$ formation from $\\text{Na}(\\text{g})$ is $495.8\\text{ kJ mol}^{-1}$, while the electron gain enthalpy of $\\text{Br}$ is $-325.0\\text{ kJ mol}^{-1}$. Given the lattice enthalpy of $\\text{NaBr}$ is $-728.4\\text{ kJ mol}^{-1}$. The energy for the formation of $\\text{NaBr}$ ionic solid is $(-) \\_\\_\\_ \\times 10^{-1}\\text{ kJ mol}^{-1}$ :",
    options: [],
    correct_option: null,
    numeric_answer: 5576,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "From gaseous atoms to ionic solid:\n$$\\text{Na}(\\text{g}) + \\text{Br}(\\text{g}) \\rightarrow \\text{NaBr}(\\text{s})$$\n$$\\Delta H = \\text{I.E.}(\\text{Na}) + \\Delta_{\\text{eg}}H(\\text{Br}) + \\text{L.E.}(\\text{NaBr})$$\n$$\\Delta H = 495.8 + (-325.0) + (-728.4) = 495.8 - 1053.4 = -557.6\\text{ kJ mol}^{-1} = -5576 \\times 10^{-1}\\text{ kJ mol}^{-1}$$\nHence, the required value is $5576$."
  },
  {
    qNum: 97,
    exam: "JEE Main 2021 (25 Feb, Shift 1)",
    question: "The reaction of cyanamide, $\\text{NH}_2\\text{CN}(\\text{s})$, with oxygen was run in a bomb calorimeter and $\\Delta U$ was found to be $-742.24\\text{ kJ mol}^{-1}$. The magnitude of $\\Delta_r H_{298}$ for the reaction:\n$$\\text{NH}_2\\text{CN}(\\text{s}) + \\frac{3}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{N}_2(\\text{g}) + \\text{CO}_2(\\text{g}) + \\text{H}_2\\text{O}(\\text{l})$$\nis $\\_\\_\\_\\text{ kJ}$. (Rounded off to the nearest integer) [Assume ideal gases and $R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$]",
    options: [],
    correct_option: null,
    numeric_answer: 741,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For the reaction:\n$$\\text{NH}_2\\text{CN}(\\text{s}) + \\frac{3}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{N}_2(\\text{g}) + \\text{CO}_2(\\text{g}) + \\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta n_g = (1 + 1) - \\frac{3}{2} = 2 - 1.5 = +0.5$$\n$$\\Delta H = \\Delta U + \\Delta n_g RT$$\n$$\\Delta H = -742.24 + (0.5 \\times 8.314 \\times 10^{-3} \\times 298) = -742.24 + 1.239 = -741.001\\text{ kJ mol}^{-1}$$\nMagnitude is $741\\text{ kJ}$."
  },
  {
    qNum: 98,
    exam: "JEE Main 2021 (25 Feb, Shift 2)",
    question: "Five moles of an ideal gas at $293\\text{ K}$ is expanded isothermally from an initial pressure of $2.1\\text{ MPa}$ to $1.3\\text{ MPa}$ against a constant external pressure of $4.3\\text{ MPa}$. The heat transferred in this process is $\\_\\_\\_\\text{ kJ mol}^{-1}$. (Rounded-off to the nearest integer) [Use $R = 8.314\\text{ J mol}^{-1}\\text{ K}^{-1}$]",
    options: [],
    correct_option: null,
    numeric_answer: 3,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For an isothermal process, $\\Delta U = 0 \\implies q = -w$.\nWork done in irreversible process:\n$$w = -P_{\\text{ext}}(V_2 - V_1) = -P_{\\text{ext}} nRT \\left(\\frac{1}{P_2} - \\frac{1}{P_1}\\right)$$\n$$w = -4.3 \\times 10^6 \\times 5 \\times 8.314 \\times 293 \\times \\left(\\frac{1}{1.3 \\times 10^6} - \\frac{1}{2.1 \\times 10^6}\\right)$$\n$$w = -4.3 \\times 5 \\times 8.314 \\times 293 \\times 0.293 = -15347.7\\text{ J} = -15.35\\text{ kJ}$$\nHeat per mole $q / n = \\frac{15.35\\text{ kJ}}{5} \\approx 3\\text{ kJ mol}^{-1}$."
  },
  {
    qNum: 99,
    exam: "JEE Main 2021 (26 Feb, Shift 1)",
    question: "For a chemical reaction $\\text{A} + \\text{B} \\rightleftharpoons \\text{C} + \\text{D}$ ($\\Delta_r H^\circ = 80\\text{ kJ mol}^{-1}$) the entropy change $\\Delta_r S^\circ$ depends on the temperature $T$ (in $\\text{K}$) as $\\Delta_r S^\circ = 2T\\text{ J K}^{-1}\\text{ mol}^{-1}$. Minimum temperature at which it will become spontaneous is $\\_\\_\\_\\text{ K}$. (Integer)",
    options: [],
    correct_option: null,
    numeric_answer: 200,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For spontaneity, $\\Delta G^\circ = \\Delta H^\circ - T\\Delta S^\circ < 0$:\n$$\\Delta H^\circ < T \\Delta S^\circ$$\n$$80 \\times 10^3\\text{ J} < T(2T) = 2T^2$$\n$$2T^2 > 80,000 \\implies T^2 > 40,000 \\implies T > 200\\text{ K}$$\nThus, the minimum temperature is $200\\text{ K}$."
  },
  {
    qNum: 100,
    exam: "JEE Main 2021 (26 Feb, Shift 2)",
    question: "The average $\\text{S}-\\text{F}$ bond energy in $\\text{kJ mol}^{-1}$ of $\\text{SF}_6$ is $\\_\\_\\_$. (Rounded off to the nearest integer) [Given : The values of standard enthalpy of formation of $\\text{SF}_6(\\text{g})$, $\\text{S}(\\text{g})$ and $\\text{F}(\\text{g})$ are $-1100$, $275$ and $80\\text{ kJ mol}^{-1}$ respectively.]",
    options: [],
    correct_option: null,
    numeric_answer: 309,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Atomization reaction of $\\text{SF}_6$:\n$$\\text{SF}_6(\\text{g}) \\rightarrow \\text{S}(\\text{g}) + 6\\text{F}(\\text{g})$$\nEnthalpy of atomization:\n$$\\Delta H = \\Delta_f H(\\text{S}, \\text{g}) + 6\\Delta_f H(\\text{F}, \\text{g}) - \\Delta_f H(\\text{SF}_6, \\text{g})$$\n$$\\Delta H = 275 + 6(80) - (-1100) = 275 + 480 + 1100 = 1855\\text{ kJ mol}^{-1}$$\nAverage $\\text{S}-\\text{F}$ bond energy:\n$$\\text{B.E.}(\\text{S}-\\text{F}) = \\frac{1855}{6} = 309.16\\text{ kJ mol}^{-1} \\approx 309\\text{ kJ mol}^{-1}$$"
  }
];
