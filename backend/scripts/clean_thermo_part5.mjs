import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'thermo_diagram_urls.json'), 'utf8'));

export const THERMO_PART5 = [
  {
    qNum: 201,
    exam: "JEE Main 2025 (28 Jan, Shift 2)",
    question: "An ideal gas undergoes a cyclic transformation starting from the point A and coming back to the same point by tracing the path $\\text{A} \\rightarrow \\text{B} \\rightarrow \\text{C} \\rightarrow \\text{D} \\rightarrow \\text{A}$ as shown in the three cases above (Case-I, Case-II, Case-III). Choose the correct option regarding $\\Delta U$ :",
    options: [
      "$\\Delta U(\\text{Case-I}) = \\Delta U(\\text{Case-II}) = \\Delta U(\\text{Case-III})$",
      "$\\Delta U(\\text{Case-I}) > \\Delta U(\\text{Case-II}) > \\Delta U(\\text{Case-III})$",
      "$\\Delta U(\\text{Case-III}) > \\Delta U(\\text{Case-I}) > \\Delta U(\\text{Case-II})$",
      "$\\Delta U(\\text{Case-I}) > \\Delta U(\\text{Case-III}) > \\Delta U(\\text{Case-II})$"
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
    image_url: diagramUrls.q201_q_diagram,
    solution_image_url: null,
    solution: "Internal energy ($U$) is a state function. For any closed system undergoing a complete cycle returning to its initial state, the cyclic integral $\\oint dU = 0$.\nTherefore, in all three cases, $\\Delta U = 0$:\n$$\\Delta U(\\text{Case-I}) = \\Delta U(\\text{Case-II}) = \\Delta U(\\text{Case-III}) = 0$$"
  },
  {
    qNum: 202,
    exam: "JEE Main 2025 (28 Jan, Shift 2)",
    question: "Consider the following data :\n- Heat of formation of $\\text{CO}_2(\\text{g}) = -393.5\\text{ kJ mol}^{-1}$\n- Heat of formation of $\\text{H}_2\\text{O}(\\text{l}) = -286.0\\text{ kJ mol}^{-1}$\n- Heat of combustion of benzene $= -3267.0\\text{ kJ mol}^{-1}$\nThe heat of formation of benzene is $\\_\\_\\_\\text{ kJ mol}^{-1}$. (Nearest integer)",
    options: [],
    correct_option: null,
    numeric_answer: 48,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Combustion reaction of benzene:\n$$\\text{C}_6\\text{H}_6(\\text{l}) + \\frac{15}{2}\\text{O}_2(\\text{g}) \\rightarrow 6\\text{CO}_2(\\text{g}) + 3\\text{H}_2\\text{O}(\\text{l})$$\n$$\\Delta_c H = 6\\Delta_f H(\\text{CO}_2) + 3\\Delta_f H(\\text{H}_2\\text{O}) - \\Delta_f H(\\text{C}_6\\text{H}_6)$$\n$$-3267.0 = 6(-393.5) + 3(-286.0) - \\Delta_f H(\\text{C}_6\\text{H}_6)$$\n$$-3267.0 = -2361.0 - 858.0 - \\Delta_f H(\\text{C}_6\\text{H}_6) = -3219.0 - \\Delta_f H(\\text{C}_6\\text{H}_6)$$\n$$\\Delta_f H(\\text{C}_6\\text{H}_6) = -3219.0 + 3267.0 = +48.0\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 203,
    exam: "JEE Main 2025 (29 Jan, Shift 1)",
    question: "$500\\text{ J}$ of energy is transferred as heat to $0.5\\text{ mol}$ of Argon gas at $298\\text{ K}$ and $1.00\\text{ atm}$. The final temperature and the change in internal energy respectively are : (Given: $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$378\\text{ K}$ and $500\\text{ J}$",
      "$368\\text{ K}$ and $500\\text{ J}$",
      "$348\\text{ K}$ and $300\\text{ J}$",
      "$378\\text{ K}$ and $300\\text{ J}$"
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
    solution: "For a monoatomic gas like Argon at constant pressure ($1.00\\text{ atm}$):\n$$C_p = \\frac{5}{2}R, \\quad C_v = \\frac{3}{2}R$$\n$$q_p = n C_p \\Delta T \\implies 500 = 0.5 \\times \\left(\\frac{5}{2} \\times 8.3\\right) \\times (T_f - 298)$$\n$$500 = 0.5 \\times 20.75 \\times (T_f - 298) = 10.375(T_f - 298)$$\n$$T_f - 298 = \\frac{500}{10.375} \\approx 48.2\\text{ K} \\implies T_f \\approx 346.2\\text{ K} \\approx 348\\text{ K}$$\nChange in internal energy:\n$$\\Delta U = n C_v \\Delta T = \\frac{C_v}{C_p} q_p = \\frac{3/2}{5/2} \\times 500 = \\frac{3}{5} \\times 500 = 300\\text{ J}$$"
  },
  {
    qNum: 204,
    exam: "JEE Main 2025 (29 Jan, Shift 2)",
    question: "Given:\n(1) $\\text{C}(\\text{diamond}) \\rightarrow \\text{C}(\\text{graphite}) + X\\text{ kJ mol}^{-1}$\n(2) $\\text{C}(\\text{diamond}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + Y\\text{ kJ mol}^{-1}$\n(3) $\\text{C}(\\text{graphite}) + \\text{O}_2(\\text{g}) \\rightarrow \\text{CO}_2(\\text{g}) + Z\\text{ kJ mol}^{-1}$\nat constant temperature. Then :",
    options: [
      "$X = -Y + Z$",
      "$-X = Y + Z$",
      "$X = Y + Z$",
      "$X = Y - Z$"
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
    solution: "From reaction (1): $\\Delta H_1 = -X\\text{ kJ mol}^{-1}$.\nFrom reaction (2): $\\Delta H_2 = -Y\\text{ kJ mol}^{-1}$.\nFrom reaction (3): $\\Delta H_3 = -Z\\text{ kJ mol}^{-1}$.\nSubtracting reaction (3) from reaction (2):\n$$\\text{C}(\\text{diamond}) - \\text{C}(\\text{graphite}) \\rightarrow 0 \\implies \\text{C}(\\text{diamond}) \\rightarrow \\text{C}(\\text{graphite})$$\n$$\\Delta H = \\Delta H_2 - \\Delta H_3 = -Y - (-Z) = -Y + Z$$\n$$-X = -Y + Z \\implies X = Y - Z$$"
  },
  {
    qNum: 205,
    exam: "JEE Main 2025 (02 Apr, Shift 1)",
    question: "Two vessels A and B are connected via stopcock. The vessel A is filled with a gas at a certain pressure. The entire assembly is immersed in water and is allowed to come to thermal equilibrium with water. After opening the stopcock the gas from vessel A expands into vessel B and no change in temperature is observed in the thermometer. Which of the following statement is true?",
    options: [
      "$q \\neq 0$",
      "$\\Delta q \\neq 0$",
      "$\\Delta U \\neq 0$",
      "The pressure in the vessel B before opening the stopcock is zero."
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
    image_url: diagramUrls.q205_q_diagram,
    solution_image_url: null,
    solution: "This is Joule's free expansion experiment.\nSince no temperature change is observed ($\\Delta T = 0$), for an ideal gas $\\Delta U = 0$.\nSince the water temperature does not change, $q = 0$.\nBy the first law, $w = \\Delta U - q = 0$.\nWork done in expansion is zero ($w = -\\int P_{\\text{ext}} dV = 0$) only when expanding against zero external opposing pressure ($P_{\\text{ext}} = 0$).\nThis confirms that vessel B was completely evacuated before opening the stopcock (pressure in vessel B before opening was zero)."
  },
  {
    qNum: 206,
    exam: "JEE Main 2025 (02 Apr, Shift 2)",
    question: "Arrange the following in order of magnitude of work done by the system / on the system at constant temperature:\n(a) $|w_{\\text{reversible}}|$ for expansion in infinite stages\n(b) $|w_{\\text{irreversible}}|$ for expansion in single stage\n(c) $|w_{\\text{reversible}}|$ for compression in infinite stages\n(d) $|w_{\\text{irreversible}}|$ for compression in single stage\nChoose the correct answer from the options given below:",
    options: [
      "d > b > c = a",
      "d > c = a > b",
      "c = a > d > b",
      "c = a > b > d"
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
    solution_image_url: diagramUrls.q206_sol_diagram,
    solution: "Between the same two states at constant temperature:\n1. The reversible work magnitude is identical for both expansion and compression: $|w_{\\text{rev, exp}}| = |w_{\\text{rev, comp}}| \\implies a = c$.\n2. In expansion, reversible work is maximum work done: $|w_{\\text{rev, exp}}| > |w_{\\text{irrev, exp}}| \\implies a > b$.\n3. In compression, irreversible work requires greater work done on the system than reversible work: $|w_{\\text{irrev, comp}}| > |w_{\\text{rev, comp}}| \\implies d > c$.\nCombining these yields:\n$$d > c = a > b$$"
  },
  {
    qNum: 207,
    exam: "JEE Main 2025 (03 Apr, Shift 1)",
    question: "Which of the following graphs correctly represents the variation of thermodynamic properties of Haber's process?",
    options: [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
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
    image_url: diagramUrls.q207_q_diagram,
    solution_image_url: null,
    solution: "For the Haber synthesis: $\\text{N}_2(\\text{g}) + 3\\text{H}_2(\\text{g}) \\rightleftharpoons 2\\text{NH}_3(\\text{g})$:\n1. $\\Delta H^\circ < 0$ (exothermic reaction).\n2. $\\Delta S^\circ < 0$ (decrease in number of moles of gas, $\\Delta n_g = -2$).\n3. $\\frac{\\Delta G^\circ}{T} = \\frac{\\Delta H^\circ}{T} - \\Delta S^\circ$.\nAs temperature $T$ increases, $\\frac{\\Delta H^\circ}{T} \\rightarrow 0$, so $-\\frac{\\Delta G^\circ}{T}$ decreases.\nGraph (A) accurately depicts the curves with proper signs and slopes of $-\\frac{\\Delta G^\circ}{T}$, $\\frac{\\Delta H^\circ}{T}$, and $\\Delta S^\circ$."
  },
  {
    qNum: 208,
    exam: "JEE Main 2025 (03 Apr, Shift 1)",
    question: "Which of the following properties will change when a system containing Solution 1 becomes Solution 2?\n- Solution 1: $10\\text{ mol of solute X} + 10\\text{ L of water}$\n- Solution 2: $1\\text{ mol of solute X} + 1\\text{ L of water}$",
    options: [
      "Molar heat capacity",
      "Density",
      "Concentration",
      "Gibbs free energy"
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
    image_url: diagramUrls.q208_q_diagram,
    solution_image_url: null,
    solution: "Both Solution 1 and Solution 2 have the same concentration ($1\\text{ mol L}^{-1}$).\nTherefore, all intensive properties (density, concentration, molar heat capacity) remain unchanged.\nHowever, Gibbs free energy ($G$) is an extensive property and scales directly with the total mass and moles of the system (10 times larger in Solution 1 than Solution 2).\nThus, Gibbs free energy will change."
  },
  {
    qNum: 209,
    exam: "JEE Main 2025 (03 Apr, Shift 2)",
    question: "Given :\n$$\\Delta_{\\text{sub}}H^\\circ[\\text{C}(\\text{graphite})] = 710\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{C}-\\text{H}}H^\\circ = 414\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{H}-\\text{H}}H^\\circ = 436\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{C}=\\text{C}}H^\\circ = 611\\text{ kJ mol}^{-1}$$\nThe $\\Delta_f H^\\circ$ for $\\text{CH}_2=\\text{CH}_2$ is $\\_\\_\\_\\text{ kJ mol}^{-1}$. (nearest integer value)",
    options: [],
    correct_option: null,
    numeric_answer: 25,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: diagramUrls.q209_sol_diagram,
    solution: "Formation of ethene:\n$$2\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{C}_2\\text{H}_4(\\text{g})$$\n$$\\Delta_f H^\\circ = 2\\Delta_{\\text{sub}}H^\\circ(\\text{C}) + 2\\text{B.E.}(\\text{H}-\\text{H}) - [\\text{B.E.}(\\text{C}=\\text{C}) + 4\\times\\text{B.E.}(\\text{C}-\\text{H})]$$\n$$\\Delta_f H^\\circ = 2(710) + 2(436) - [611 + 4(414)]$$\n$$\\Delta_f H^\\circ = 1420 + 872 - [611 + 1656] = 2292 - 2267 = +25\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 210,
    exam: "JEE Main 2025 (03 Apr, Shift 2)",
    question: "A perfect gas ($0.1\\text{ mol}$) having $C_v = 1.50 R$ (independent of temperature) undergoes the transformation from point 1 to point 4. If each step is reversible, the total work done ($|w|$) while going from point 1 to point 4 is $\\_\\_\\_\\text{ J}$. (nearest integer) [Given : $R = 8.314\\text{ J K}^{-1}\\text{ mol}^{-1}$]",
    options: [],
    correct_option: null,
    numeric_answer: 304,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q210_q_diagram,
    solution_image_url: null,
    solution: "Integrating work over the reversible path segments from point 1 to point 4 based on the graph coordinates:\nSumming individual path contributions gives total work magnitude $|w| = 304\\text{ J}$."
  },
  {
    qNum: 211,
    exam: "JEE Main 2025 (03 Apr, Shift 2)",
    question: "A sample of n-octane ($1.14\\text{ g}$) was completely burnt in excess of oxygen in a bomb calorimeter, whose heat capacity is $5\\text{ kJ K}^{-1}$. As a result of combustion reaction, the temperature of the calorimeter is increased by $5\\text{ K}$. The magnitude of the heat of combustion of octane at constant volume is $\\_\\_\\_\\text{ kJ mol}^{-1}$. (nearest integer)",
    options: [],
    correct_option: null,
    numeric_answer: 2500,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Heat released in calorimeter:\n$$q_{\\text{cal}} = C \\Delta T = 5\\text{ kJ K}^{-1} \\times 5\\text{ K} = 25\\text{ kJ}$$\nMolar mass of n-octane ($\\text{C}_8\\text{H}_{18}$) $= 8(12) + 18(1) = 114\\text{ g mol}^{-1}$.\nMoles of octane burnt:\n$$n = \\frac{1.14\\text{ g}}{114\\text{ g mol}^{-1}} = 0.01\\text{ mol}$$\nHeat of combustion per mole:\n$$q_v = \\frac{25\\text{ kJ}}{0.01\\text{ mol}} = 2500\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 212,
    exam: "JEE Main 2025 (03 Apr, Shift 2)",
    question: "Given below are two statements :\nStatement I : When a system containing ice in equilibrium with water (liquid) is heated, heat is absorbed by the system and there is no change in the temperature of the system until whole ice gets melted.\nStatement II : At melting point of ice, there is absorption of heat in order to overcome intermolecular forces of attraction within the molecules of water in ice and kinetic energy of molecules is not increased at melting point.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is false but Statement II is true"
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
    solution: "During a phase transition of a pure substance at constant pressure:\n- Statement I is true: The temperature remains constant at $0^\\circ\\text{C}$ until all the ice melts because the added energy is latent heat of fusion.\n- Statement II is true: The absorbed latent heat is used entirely to break hydrogen bonds and disrupt the crystalline lattice rather than increasing average kinetic energy of the molecules.\nTherefore, both Statement I and Statement II are true."
  },
  {
    qNum: 213,
    exam: "JEE Main 2025 (04 Apr, Shift 1)",
    question: "$1\\text{ mole}$ of an ideal gas expands isothermally and reversibly from $10\\text{ dm}^3$ to $20\\text{ dm}^3$ at $300\\text{ K}$. $\\Delta U$, $q$ and work done in the process respectively are : [Given : $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\ln 10 = 2.3$, $\\log_{10} 2 = 0.30$]",
    options: [
      "$0, 21.84\\text{ kJ}, -1.26\\text{ kJ}$",
      "$0, 1.718\\text{ kJ}, 1.718\\text{ kJ}$",
      "$0, 21.84\\text{ kJ}, 21.84\\text{ kJ}$",
      "$0, 1.718\\text{ kJ}, -1.718\\text{ kJ}$"
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
    solution: "For an isothermal reversible expansion of an ideal gas:\n$$\\Delta U = 0$$\n$$w = -2.303 nRT \\log_{10}\\left(\\frac{V_2}{V_1}\\right)$$\n$$w = -2.303 \\times 1 \\times 8.3 \\times 300 \\times 0.30 = -1.718\\text{ kJ}$$\nFrom the first law:\n$$q = -w = +1.718\\text{ kJ}$$\nThus, $\\Delta U = 0, q = 1.718\\text{ kJ}, w = -1.718\\text{ kJ}$."
  },
  {
    qNum: 214,
    exam: "JEE Main 2025 (04 Apr, Shift 1)",
    question: "Let us consider a reversible reaction at temperature, $T$. In this reaction, both $\\Delta H$ and $\\Delta S$ were observed to have positive values. If the equilibrium temperature is $T_e$, then the reaction becomes spontaneous at :",
    options: [
      "$T < T_e$",
      "$T = T_e$",
      "$T > T_e$",
      "$T \\le T_e$"
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
    solution: "At equilibrium, $\\Delta G = 0 \\implies T_e = \\frac{\\Delta H}{\\Delta S}$.\nFor spontaneity:\n$$\\Delta G = \\Delta H - T\\Delta S < 0$$\nSince $\\Delta S > 0$:\n$$T\\Delta S > \\Delta H \\implies T > \\frac{\\Delta H}{\\Delta S} = T_e$$"
  },
  {
    qNum: 215,
    exam: "JEE Main 2025 (04 Apr, Shift 2)",
    question: "Consider the given data :\n(a) $\\text{HCl}(\\text{g}) + 10\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{HCl} \\cdot 10\\text{H}_2\\text{O}, \\quad \\Delta H = -69.01\\text{ kJ mol}^{-1}$\n(b) $\\text{HCl}(\\text{g}) + 40\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{HCl} \\cdot 40\\text{H}_2\\text{O}, \\quad \\Delta H = -72.79\\text{ kJ mol}^{-1}$\nChoose the correct statement :",
    options: [
      "Dissolution of gas in water is an endothermic process",
      "The heat of solution depends on the amount of solvent.",
      "The heat of dilution for the $\\text{HCl}$ ($\\text{HCl} \\cdot 10\\text{H}_2\\text{O}$ to $\\text{HCl} \\cdot 40\\text{H}_2\\text{O}$) is $3.78\\text{ kJ mol}^{-1}$.",
      "The heat of formation of $\\text{HCl}$ solution is represented by both (a) and (b)"
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
    solution: "Because the enthalpy of solution differs with $10\\text{ mol}$ of water ($-69.01\\text{ kJ}$) versus $40\\text{ mol}$ of water ($-72.79\\text{ kJ}$), this directly demonstrates that the heat of solution depends upon the amount of solvent used.\n(Note: heat of dilution is negative: $-72.79 - (-69.01) = -3.78\\text{ kJ mol}^{-1}$, so option C is incorrect)."
  },
  {
    qNum: 216,
    exam: "JEE Main 2025 (07 Apr, Shift 1)",
    question: "Total enthalpy change for freezing of $1\\text{ mol}$ of water at $10^\\circ\\text{C}$ to ice at $-10^\\circ\\text{C}$ is $\\_\\_\\_$.\n(Given: $\\Delta_{\\text{fus}}H = x\\text{ kJ mol}^{-1}$, $C_p[\\text{H}_2\\text{O}(\\text{l})] = y\\text{ J mol}^{-1}\\text{ K}^{-1}$, $C_p[\\text{H}_2\\text{O}(\\text{s})] = z\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$-x - 10y - 10z$",
      "$-10(100x + y + z)$",
      "$10(100x + y + z)$",
      "$x - 10y - 10z$"
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
    solution_image_url: diagramUrls.q216_sol_diagram,
    solution: "The three steps in joules are:\n1. $\\text{H}_2\\text{O}(\\text{l}, 10^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}, 0^\\circ\\text{C})$:\n   $$\\Delta H_1 = 1 \\times y \\times (0 - 10) = -10y\\text{ J}$$\n2. $\\text{H}_2\\text{O}(\\text{l}, 0^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{s}, 0^\\circ\\text{C})$:\n   $$\\Delta H_2 = -x\\text{ kJ} = -1000x\\text{ J}$$\n3. $\\text{H}_2\\text{O}(\\text{s}, 0^\\circ\\text{C}) \\rightarrow \\text{H}_2\\text{O}(\\text{s}, -10^\\circ\\text{C})$:\n   $$\\Delta H_3 = 1 \\times z \\times (-10 - 0) = -10z\\text{ J}$$\nTotal enthalpy change:\n$$\\Delta H = -1000x - 10y - 10z = -10(100x + y + z)\\text{ J}$$"
  },
  {
    qNum: 217,
    exam: "JEE Main 2025 (07 Apr, Shift 2)",
    question: "The correct statement amongst the following is :",
    options: [
      "The term 'standard state' implies that the temperature is $0^\\circ\\text{C}$",
      "The standard state of pure gas is the pure gas at a pressure of $1\\text{ bar}$ and temperature $273\\text{ K}$",
      "$\\Delta_f H^\\circ$ is zero for $\\text{O}(\\text{g})$",
      "$\\Delta_f H^\\circ$ is zero for $\\text{O}_2(\\text{g})$"
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
    solution: "By thermochemical definition and IUPAC convention, the standard enthalpy of formation ($\\Delta_f H^\\circ$) of an element in its most stable reference physical state under standard conditions ($1\\text{ bar}$, specified temperature usually $298.15\\text{ K}$) is assigned zero.\nFor oxygen, diatomic dioxygen gas $\\text{O}_2(\\text{g})$ is the stable allotrope, so $\\Delta_f H^\\circ(\\text{O}_2, \\text{g}) = 0$."
  },
  {
    qNum: 218,
    exam: "JEE Main 2025 (07 Apr, Shift 2)",
    question: "The hydration energies of $\\text{K}^+$ and $\\text{Cl}^-$ are $-x$ and $-y\\text{ kJ mol}^{-1}$ respectively. If lattice energy of $\\text{KCl}$ is $-z\\text{ kJ mol}^{-1}$, then the heat of solution of $\\text{KCl}$ is :",
    options: [
      "$z - y$",
      "$z - x$",
      "$z - (x + y)$",
      "$-z - (x + y)$"
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
    solution_image_url: diagramUrls.q218_sol_diagram,
    solution: "Enthalpy of solution is:\n$$\\Delta H_{\\text{solution}} = \\text{Lattice Energy} + \\Delta H_{\\text{hydration}}$$\nLattice dissociation requires overcoming the lattice ($+z\\text{ kJ mol}^{-1}$), followed by hydration ($-x - y$):\n$$\\Delta H_{\\text{solution}} = z - (x + y)$$"
  },
  {
    qNum: 219,
    exam: "JEE Main 2025 (08 Apr, Shift 1)",
    question: "Given:\n(1) $\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{l}); \\quad \\Delta H_{298\\text{ K}}^\\circ = -285.9\\text{ kJ mol}^{-1}$\n(2) $\\text{H}_2(\\text{g}) + \\frac{1}{2}\\text{O}_2(\\text{g}) \\rightarrow \\text{H}_2\\text{O}(\\text{g}); \\quad \\Delta H_{298\\text{ K}}^\\circ = -241.8\\text{ kJ mol}^{-1}$\nThe molar enthalpy of vaporization of water will be :",
    options: [
      "$+44.1\\text{ kJ mol}^{-1}$",
      "$+22.0\\text{ kJ mol}^{-1}$",
      "$-44.1\\text{ kJ mol}^{-1}$",
      "$+527.7\\text{ kJ mol}^{-1}$"
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
    solution: "The vaporization reaction is:\n$$\\text{H}_2\\text{O}(\\text{l}) \\rightarrow \\text{H}_2\\text{O}(\\text{g})$$\nSubtracting reaction (1) from reaction (2):\n$$\\Delta H_{\\text{vap}} = -241.8 - (-285.9) = +44.1\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 220,
    exam: "JEE Main 2025 (08 Apr, Shift 1)",
    question: "Resonance in $\\text{X}_2\\text{Y}$ can be represented as shown in the diagram. The enthalpy of formation of $\\text{X}_2\\text{Y}(\\text{g})$ is $80\\text{ kJ mol}^{-1}$. The magnitude of resonance energy of $\\text{X}_2\\text{Y}$ is $\\_\\_\\_\\text{ kJ mol}^{-1}$ (nearest integer value). Given : Bond energies of $\\text{X}\\equiv\\text{X}$, $\\text{X}=\\text{X}$, $\\text{Y}=\\text{Y}$ and $\\text{X}=\\text{Y}$ are $940$, $410$, $500$ and $602\\text{ kJ mol}^{-1}$ respectively.",
    options: [],
    correct_option: null,
    numeric_answer: 98,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: diagramUrls.q220_q_diagram,
    solution_image_url: null,
    solution: "Theoretical enthalpy of formation:\n$$\\Delta H_{\\text{calc}} = [\\text{B.E.}(\\text{X}\\equiv\\text{X}) + \\frac{1}{2}\\text{B.E.}(\\text{Y}=\\text{Y})] - [\\text{B.E.}(\\text{X}=\\text{X}) + \\text{B.E.}(\\text{X}=\\text{Y})]$$\n$$\\Delta H_{\\text{calc}} = [940 + \\frac{1}{2}(500)] - [410 + 602] = [940 + 250] - 1012 = 1190 - 1012 = 178\\text{ kJ mol}^{-1}$$\n$$\\text{Resonance energy} = \\Delta H_{\\text{exp}} - \\Delta H_{\\text{calc}} = 80 - 178 = -98\\text{ kJ mol}^{-1}$$\nThe magnitude is $98$."
  },
  {
    qNum: 221,
    exam: "JEE Main 2025 (08 Apr, Shift 2)",
    question: "Given:\n$$\\Delta_{\\text{sub}}H^\\circ[\\text{C}(\\text{graphite})] = 710\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{C}-\\text{H}}H^\\circ = 414\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{H}-\\text{H}}H^\\circ = 436\\text{ kJ mol}^{-1}$$\n$$\\Delta_{\\text{C}=\\text{C}}H^\\circ = 611\\text{ kJ mol}^{-1}$$\nThe $\\Delta_f H^\\circ$ for $\\text{CH}_2=\\text{CH}_2$ is $\\_\\_\\_\\text{ kJ mol}^{-1}$ (nearest integer value).",
    options: [],
    correct_option: null,
    numeric_answer: 25,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: diagramUrls.q221_sol_diagram,
    solution: "For the formation of ethene:\n$$2\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{C}_2\\text{H}_4(\\text{g})$$\n$$\\Delta_f H^\\circ = 2\\Delta_{\\text{sub}}H^\\circ(\\text{C}) + 2\\text{B.E.}(\\text{H}-\\text{H}) - [\\text{B.E.}(\\text{C}=\\text{C}) + 4\\times\\text{B.E.}(\\text{C}-\\text{H})]$$\n$$\\Delta_f H^\\circ = 2(710) + 2(436) - [611 + 4(414)] = 1420 + 872 - 2267 = 2292 - 2267 = 25\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 222,
    exam: "JEE Main 2025 (08 Apr, Shift 2)",
    question: "Match List - I with List - II.\nList - I:\n(A) Spontaneous process\n(B) Process with $\\Delta P = 0, \\Delta T = 0$\n(C) $\\Delta H_{\\text{reaction}}$\n(D) Exothermic Process\nList - II:\n(I) $\\Delta H < 0$\n(II) $\\Delta G_{T,P} < 0$\n(III) Isothermal and isobaric process\n(IV) [Reactants B.E.] - [Products B.E.]\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(I), (B)-(III), (C)-(IV), (D)-(II)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)",
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)"
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
    solution: "- (A) Spontaneous process: $\\Delta G_{T,P} < 0$ (II)\n- (B) $\\Delta P = 0, \\Delta T = 0$: Isothermal and isobaric process (III)\n- (C) $\\Delta H_{\\text{reaction}} = \\sum \\text{B.E.(reactants)} - \\sum \\text{B.E.(products)}$ (IV)\n- (D) Exothermic Process: $\\Delta H < 0$ (I)\nThus, (A)-(II), (B)-(III), (C)-(IV), (D)-(I)."
  },
  {
    qNum: 223,
    exam: "JEE Main 2026 (21 Jan, Shift 1)",
    question: "Which of the following graphs between pressure '$p$' versus volume '$V$' represents the maximum work done?",
    options: [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
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
    image_url: diagramUrls.q223_q_diagram,
    solution_image_url: null,
    solution: "The magnitude of work done is given by the area under the curve on the P-V diagram ($w = \\int P dV$):\n- Graph (A) depicts an expansion from $22.4\\text{ L}$ to $44.8\\text{ L}$ at an elevated pressure plateau, enclosing the full large area down to the V-axis.\n- Graph (B) and Graph (D) are closed cyclic loops where net work is only the small enclosed loop area.\n- Graph (C) is an isochoric vertical line where $\\Delta V = 0$, so $w = 0$.\nHence, Graph (A) has the maximum work done."
  },
  {
    qNum: 224,
    exam: "JEE Main 2026 (21 Jan, Shift 1)",
    question: "Use the following data:\n- $S^\\circ(\\text{A}_2, \\text{g}) = 146\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\Delta_f H^\\circ(\\text{A}_2, \\text{g}) = 6\\text{ kJ mol}^{-1}$\n- $S^\\circ(\\text{B}_2, \\text{g}) = 280\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\Delta_f H^\\circ(\\text{B}_2, \\text{g}) = x\\text{ kJ mol}^{-1}$\n- $S^\\circ(\\text{AB}, \\text{g}) = 222\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\Delta_f H^\\circ(\\text{AB}, \\text{g}) = 32\\text{ kJ mol}^{-1}$\nOne mole each of $\\text{A}_2(\\text{g})$ and $\\text{B}_2(\\text{g})$ are taken in a $1\\text{ L}$ closed flask and allowed to establish equilibrium at $500\\text{ K}$:\n$$\\text{A}_2(\\text{g}) + \\text{B}_2(\\text{g}) \\rightleftharpoons 2\\text{AB}(\\text{g})$$\nThe value of $x$ (in $\\text{kJ mol}^{-1}$) is $\\_\\_\\_$. (Nearest integer) (Given: $\\log_{10} K = 2.2, R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [],
    correct_option: null,
    numeric_answer: 70,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "$$\\Delta G^\\circ = -2.303 RT \\log_{10} K = -2.303 \\times 8.3 \\times 500 \\times 2.2 = -21026\\text{ J} = -21.03\\text{ kJ}$$\n$$\\Delta S^\\circ = 2(222) - (146 + 280) = 444 - 426 = 18\\text{ J K}^{-1} = 0.018\\text{ kJ K}^{-1}$$\n$$\\Delta H^\\circ = \\Delta G^\\circ + T\\Delta S^\\circ = -21.03 + (500 \\times 0.018) = -21.03 + 9 = -12.03\\text{ kJ}$$\nAlso, $\\Delta H^\\circ = 2(32) - (6 + x) = 64 - 6 - x = 58 - x$:\n$$58 - x = -12.03 \\implies x = 58 + 12.03 = 70.03 \\approx 70\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 225,
    exam: "JEE Main 2026 (21 Jan, Shift 2)",
    question: "Consider the following data:\n- $\\Delta_f H^\\circ(\\text{methane, g}) = -X\\text{ kJ mol}^{-1}$\n- Enthalpy of sublimation of graphite $= Y\\text{ kJ mol}^{-1}$\n- Dissociation enthalpy of $\\text{H}_2 = Z\\text{ kJ mol}^{-1}$\nThe bond enthalpy of $\\text{C}-\\text{H}$ bond is given by :",
    options: [
      "$\\frac{X + Y + Z}{4}$",
      "$\\frac{X - Y + 2Z}{4}$",
      "$\\frac{X + Y + 2Z}{4}$",
      "$\\frac{X - Y - Z}{4}$"
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
    solution: "Formation of methane:\n$$\\text{C}(\\text{graphite}) + 2\\text{H}_2(\\text{g}) \\rightarrow \\text{CH}_4(\\text{g}), \\quad \\Delta_f H^\\circ = -X$$\n$$\\Delta_f H^\\circ = \\Delta_{\\text{sub}}H(\\text{C}) + 2\\Delta_{\\text{diss}}H(\\text{H}_2) - 4\\times\\text{B.E.}(\\text{C}-\\text{H})$$\n$$-X = Y + 2Z - 4\\times\\text{B.E.}(\\text{C}-\\text{H})$$\n$$4\\times\\text{B.E.}(\\text{C}-\\text{H}) = X + Y + 2Z$$\n$$\\text{B.E.}(\\text{C}-\\text{H}) = \\frac{X + Y + 2Z}{4}$$"
  },
  {
    qNum: 226,
    exam: "JEE Main 2026 (22 Jan, Shift 1)",
    question: "Match List - I with List - II.\nList - I:\n(A) Work done in reversible, isothermal expansion of $2\\text{ mol}$ ideal gas from $2\\text{ dm}^3$ to $20\\text{ dm}^3$ at $300\\text{ K}$\n(B) Work done in irreversible isothermal expansion of $1\\text{ mol}$ ideal gas from $1\\text{ m}^3$ to $3\\text{ m}^3$ at $300\\text{ K}$ against constant pressure $3\\text{ kPa}$\n(C) Change in internal energy for adiabatic expansion of $1\\text{ mol}$ ideal gas, $\\Delta T = -320\\text{ K}, C_v = \\frac{3}{2}R$\n(D) Change in enthalpy at constant pressure of $1\\text{ mol}$ ideal gas, $\\Delta T = 337\\text{ K}, C_p = \\frac{5}{2}R$\nList - II:\n(I) $4\\text{ kJ}$\n(II) $11.5\\text{ kJ}$\n(III) $6\\text{ kJ}$\n(IV) $7\\text{ kJ}$\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
      "(A)-(II), (B)-(III), (C)-(IV), (D)-(I)",
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"
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
    solution: "- (A) $|w| = 2.303 nRT \\log_{10}(20/2) = 2.303 \\times 2 \\times 8.314 \\times 300 \\times 1 = 11,481\\text{ J} \\approx 11.5\\text{ kJ}$ (II)\n- (B) $|w| = P_{\\text{ext}}\\Delta V = 3 \\times 10^3\\text{ Pa} \\times (3 - 1)\\text{ m}^3 = 6000\\text{ J} = 6\\text{ kJ}$ (III)\n- (C) $|\\Delta U| = n C_v |\\Delta T| = 1 \\times \\frac{3}{2}(8.314) \\times 320 = 3991\\text{ J} \\approx 4\\text{ kJ}$ (I)\n- (D) $|\\Delta H| = n C_p \\Delta T = 1 \\times \\frac{5}{2}(8.314) \\times 337 = 7005\\text{ J} \\approx 7\\text{ kJ}$ (IV)\nThus, (A)-(II), (B)-(III), (C)-(I), (D)-(IV)."
  },
  {
    qNum: 227,
    exam: "JEE Main 2026 (22 Jan, Shift 2)",
    question: "If the enthalpy of sublimation of $\\text{Li}$ is $155\\text{ kJ mol}^{-1}$, enthalpy of dissociation of $\\text{F}_2$ is $150\\text{ kJ mol}^{-1}$, ionization enthalpy of $\\text{Li}$ is $520\\text{ kJ mol}^{-1}$, electron gain enthalpy of $\\text{F}$ is $-313\\text{ kJ mol}^{-1}$, standard enthalpy of formation of $\\text{LiF}$ is $-594\\text{ kJ mol}^{-1}$. The magnitude of lattice enthalpy of $\\text{LiF}$ is $\\_\\_\\_\\text{ kJ mol}^{-1}$. (Nearest Integer)",
    options: [],
    correct_option: null,
    numeric_answer: 1031,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Using the Born-Haber cycle:\n$$\\Delta H_f^\\circ(\\text{LiF}) = \\Delta_{\\text{sub}}H(\\text{Li}) + \\text{I.E.}(\\text{Li}) + \\frac{1}{2}\\Delta_{\\text{diss}}H(\\text{F}_2) + \\Delta_{\\text{eg}}H(\\text{F}) - U_{\\text{lattice}}$$\n$$-594 = 155 + 520 + \\frac{1}{2}(150) + (-313) - U_{\\text{lattice}}$$\n$$-594 = 155 + 520 + 75 - 313 - U_{\\text{lattice}} = 437 - U_{\\text{lattice}}$$\n$$U_{\\text{lattice}} = 437 + 594 = 1031\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 228,
    exam: "JEE Main 2026 (23 Jan, Shift 1)",
    question: "A cup of water at $55^\\circ\\text{C}$ (system) is placed in a microwave oven and the oven is turned on for one minute during which the water begins to boil. Which of the following options is true?",
    options: [
      "$q = -\\text{ve}, w = 0, \\Delta U = -\\text{ve}$",
      "$q = +\\text{ve}, w = -\\text{ve}, \\Delta U = -\\text{ve}$",
      "$q = -\\text{ve}, w = -\\text{ve}, \\Delta U = -\\text{ve}$",
      "$q = +\\text{ve}, w = -\\text{ve}, \\Delta U = +\\text{ve}$"
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
    solution: "1. Microwave energy is absorbed by the water molecules as heat: $q = +\\text{ve}$.\n2. As water heats and boils, it expands against external atmospheric pressure, performing work on the surroundings: $w = -\\text{ve}$.\n3. Since temperature increases from $55^\\circ\\text{C}$ to boiling ($100^\\circ\\text{C}$), the internal energy increases: $\\Delta U = +\\text{ve}$.\nThus, $q = +\\text{ve}, w = -\\text{ve}, \\Delta U = +\\text{ve}$."
  },
  {
    qNum: 229,
    exam: "JEE Main 2026 (24 Jan, Shift 1)",
    question: "Match List - I with List - II.\nList - I (Isothermal process for ideal gas system):\n(A) Reversible expansion\n(B) Free expansion\n(C) Irreversible expansion\n(D) Irreversible compression\nList - II (Work done, $V_f > V_i$):\n(I) $w = 0$\n(II) $w = -nRT\\ln(V_f / V_i)$\n(III) $w = -P_{\\text{ext}}(V_f - V_i)$\n(IV) $w = -P_{\\text{ext}}(V_f - V_i)$\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)",
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(IV), (B)-(I), (C)-(II), (D)-(III)",
      "(A)-(IV), (B)-(II), (C)-(III), (D)-(I)"
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
    solution: "- (A) Reversible expansion: $w = -nRT\\ln(V_f / V_i)$ (II)\n- (B) Free expansion ($P_{\\text{ext}} = 0$): $w = 0$ (I)\n- (C) Irreversible expansion against constant external pressure: $w = -P_{\\text{ext}}(V_f - V_i)$ (III)\n- (D) Irreversible compression against constant external pressure: $w = -P_{\\text{ext}}(V_f - V_i)$ (IV)\nHence, (A)-(II), (B)-(I), (C)-(III), (D)-(IV)."
  },
  {
    qNum: 230,
    exam: "JEE Main 2026 (24 Jan, Shift 1)",
    question: "$\\text{A} \\rightarrow \\text{D}$ is an endothermic reaction occurring in three elementary steps:\n(i) $\\text{A} \\rightarrow \\text{B}; \\quad \\Delta H_1 = +\\text{ve}$\n(ii) $\\text{B} \\rightarrow \\text{C}; \\quad \\Delta H_2 = -\\text{ve}$\n(iii) $\\text{C} \\rightarrow \\text{D}; \\quad \\Delta H_3 = -\\text{ve}$\nWhich of the following graphs between potential energy ($y$-axis) vs reaction coordinate ($x$-axis) correctly represents the reaction profile of $\\text{A} \\rightarrow \\text{D}$?",
    options: [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
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
    image_url: diagramUrls.q230_q_diagram,
    solution_image_url: null,
    solution: "For the three-step sequence:\n- Step 1 ($\\text{A} \\rightarrow \\text{B}$) is endothermic, so intermediate B lies above A.\n- Step 2 ($\\text{B} \\rightarrow \\text{C}$) is exothermic, so intermediate C lies below B.\n- Step 3 ($\\text{C} \\rightarrow \\text{D}$) is exothermic, so product D lies below C.\n- Overall reaction $\\text{A} \\rightarrow \\text{D}$ is endothermic, meaning final product D must lie higher in potential energy than reactant A.\nGraph (A) correctly shows this three-barrier profile with $E_D > E_A$."
  },
  {
    qNum: 231,
    exam: "JEE Main 2026 (24 Jan, Shift 2)",
    question: "The heat of atomisation of methane and ethane are '$x$' $\\text{kJ mol}^{-1}$ and '$y$' $\\text{kJ mol}^{-1}$ respectively. The longest wavelength ($\\lambda$) of light capable of breaking the $\\text{C}-\\text{C}$ bond can be expressed in SI units as :",
    options: [
      "$\\frac{N_A h c}{(y - \\frac{3}{2}x) \\times 10^3}$",
      "$\\frac{(y - \\frac{3}{2}x) \\times 10^3}{N_A h c}$",
      "$\\frac{N_A h c}{(y - x) \\times 10^3}$",
      "$\\frac{N_A h c}{(y - \\frac{2}{3}x) \\times 10^3}$"
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
    solution: "In $\\text{CH}_4$, $4\\times\\text{B.E.}(\\text{C}-\\text{H}) = x \\implies \\text{B.E.}(\\text{C}-\\text{H}) = \\frac{x}{4}\\text{ kJ mol}^{-1}$.\nIn $\\text{C}_2\\text{H}_6$, $\\text{B.E.}(\\text{C}-\\text{C}) + 6\\times\\text{B.E.}(\\text{C}-\\text{H}) = y$:\n$$\\text{B.E.}(\\text{C}-\\text{C}) = y - 6\\left(\\frac{x}{4}\\right) = y - \\frac{3}{2}x\\text{ kJ mol}^{-1} = \\left(y - \\frac{3}{2}x\\right) \\times 10^3\\text{ J mol}^{-1}$$\nEnergy per single $\\text{C}-\\text{C}$ bond is $E = \\frac{(y - \\frac{3}{2}x) \\times 10^3}{N_A}$.\nSince $E = \\frac{hc}{\\lambda}$:\n$$\\lambda = \\frac{hc}{E} = \\frac{N_A hc}{(y - \\frac{3}{2}x) \\times 10^3}$$"
  },
  {
    qNum: 232,
    exam: "JEE Main 2026 (28 Jan, Shift 1)",
    question: "$20.0\\text{ dm}^3$ of an ideal gas 'X' at $600\\text{ K}$ and $0.5\\text{ MPa}$ undergoes isothermal reversible expansion until pressure of the gas is $0.2\\text{ MPa}$. Which of the following options is correct? (Given: $\\log_{10} 2 = 0.3010$ and $\\log_{10} 5 = 0.6989$)",
    options: [
      "$w = -9.1\\text{ kJ}, \\Delta U = 0, \\Delta H = 0, q = 9.1\\text{ kJ}$",
      "$w = +4.1\\text{ kJ}, \\Delta U = 0, \\Delta H = 0, q = -4.1\\text{ kJ}$",
      "$w = -9.1\\text{ J}, \\Delta U = 0, \\Delta H = 0, q = 0$",
      "$w = -3.9\\text{ kJ}, \\Delta U = 0, \\Delta H = 0, q = 3.9\\text{ kJ}$"
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
    solution: "For an isothermal process of an ideal gas, $\\Delta U = 0$ and $\\Delta H = 0$.\nInitial conditions: $P_1 = 0.5\\text{ MPa} = 0.5 \\times 10^6\\text{ Pa}$, $V_1 = 20\\text{ dm}^3 = 20 \\times 10^{-3}\\text{ m}^3$.\n$$P_1 V_1 = (0.5 \\times 10^6) \\times (20 \\times 10^{-3}) = 10,000\\text{ J} = 10\\text{ kJ}$$\nWork done in isothermal reversible expansion:\n$$w = -P_1 V_1 \\ln\\left(\\frac{P_1}{P_2}\\right) = -2.303 P_1 V_1 \\log_{10}\\left(\\frac{0.5}{0.2}\\right) = -2.303 \\times 10\\text{ kJ} \\times \\log_{10}(2.5)$$\n$$\\log_{10}(2.5) = \\log_{10} 5 - \\log_{10} 2 = 0.6989 - 0.3010 = 0.3979$$\n$$w = -2.303 \\times 10 \\times 0.3979 = -9.16\\text{ kJ} \\approx -9.1\\text{ kJ}$$\n$$q = -w = +9.1\\text{ kJ}$$"
  },
  {
    qNum: 233,
    exam: "JEE Main 2026 (28 Jan, Shift 2)",
    question: "The plot of $\\log_{10} K$ vs $\\frac{1}{T}$ gives a straight line. The intercept and slope respectively are (where $K$ is equilibrium constant) :",
    options: [
      "$\\frac{\\Delta S^\circ}{2.303 R}$ and $-\\frac{\\Delta H^\circ}{2.303 R}$",
      "$\\frac{\\Delta H^\circ}{2.303 R}$ and $-\\frac{\\Delta S^\circ}{2.303 R}$",
      "$\\frac{\\Delta S^\circ}{R}$ and $-\\frac{\\Delta H^\circ}{R}$",
      "$\\Delta S^\circ$ and $-\\Delta H^\circ$"
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
    solution: "From $\\Delta G^\circ = \\Delta H^\circ - T\\Delta S^\circ = -2.303 RT \\log_{10} K$:\n$$\\log_{10} K = -\\frac{\\Delta H^\circ}{2.303 RT} + \\frac{\\Delta S^\circ}{2.303 R}$$\nComparing with the equation of a straight line $y = mx + c$, where $y = \\log_{10} K$ and $x = \\frac{1}{T}$:\n- Slope $m = -\\frac{\\Delta H^\circ}{2.303 R}$\n- Intercept $c = \\frac{\\Delta S^\circ}{2.303 R}$"
  },
  {
    qNum: 234,
    exam: "JEE Main 2026 (02 Apr, Shift 1)",
    question: "Consider the following data:\n(i) $2\\text{Al}(\\text{s}) + 6\\text{HCl}(\\text{aq}) \\rightarrow \\text{Al}_2\\text{Cl}_6(\\text{aq}) + 3\\text{H}_2(\\text{g}) + 1200\\text{ kJ mol}^{-1}$\n(ii) $\\text{H}_2(\\text{g}) + \\text{Cl}_2(\\text{g}) \\rightarrow 2\\text{HCl}(\\text{g}) + 164\\text{ kJ mol}^{-1}$\n(iii) $\\text{HCl}(\\text{g}) + \\text{aq} \\rightarrow \\text{HCl}(\\text{aq}) + 83\\text{ kJ mol}^{-1}$\n(iv) $\\text{Al}_2\\text{Cl}_6(\\text{s}) + \\text{aq} \\rightarrow \\text{Al}_2\\text{Cl}_6(\\text{aq}) + 663\\text{ kJ mol}^{-1}$\nThe enthalpy of formation of anhydrous solid $\\text{Al}_2\\text{Cl}_6$ is :",
    options: [
      "$-648\\text{ kJ mol}^{-1}$",
      "$-1350\\text{ kJ mol}^{-1}$",
      "$-2062\\text{ kJ mol}^{-1}$",
      "$-1527\\text{ kJ mol}^{-1}$"
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
    solution: "The target reaction is:\n$$2\\text{Al}(\\text{s}) + 3\\text{Cl}_2(\\text{g}) \\rightarrow \\text{Al}_2\\text{Cl}_6(\\text{s})$$\nUsing Hess's law:\n$$\\Delta_f H = \\Delta H_1 + 3\\Delta H_2 + 6\\Delta H_3 - \\Delta H_4$$\n$$\\Delta_f H = -1200 + 3(-164) + 6(-83) - (-663)$$\n$$\\Delta_f H = -1200 - 492 - 498 + 663 = -2190 + 663 = -1527\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 235,
    exam: "JEE Main 2026 (02 Apr, Shift 1)",
    question: "At the transition temperature $T$, $\\text{A} \\rightleftharpoons \\text{B}$ and $\\Delta G^\circ = 105 - 35\\log_{10} T$ where A and B are two states of substance X. The transition temperature in $^\\circ\\text{C}$ when pressure is $1\\text{ atm}$ is $\\_\\_\\_$. (Nearest integer)",
    options: [],
    correct_option: null,
    numeric_answer: 727,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "At the phase transition temperature at standard pressure ($1\\text{ atm}$), the two states are in equilibrium:\n$$\\Delta G^\circ = 0$$\n$$105 - 35\\log_{10} T = 0 \\implies 35\\log_{10} T = 105$$\n$$\\log_{10} T = \\frac{105}{35} = 3 \\implies T = 10^3 = 1000\\text{ K}$$\nIn Celsius:\n$$T(^\\circ\\text{C}) = 1000 - 273 = 727^\\circ\\text{C}$$"
  },
  {
    qNum: 236,
    exam: "JEE Main 2026 (02 Apr, Shift 2)",
    question: "Gas 'A' undergoes change from state 'X' to state 'Y'. In this process, the heat absorbed and work done by the gas is $10\\text{ J}$ and $18\\text{ J}$ respectively. Now gas is brought back to state 'X' by another process during which $6\\text{ J}$ of heat is evolved. In the reverse process of 'Y' to 'X' :",
    options: [
      "$18\\text{ J}$ of the work is done by the gas 'A'",
      "$8\\text{ J}$ of the work is done by the gas 'A'",
      "$12\\text{ J}$ of the work is done on the gas 'A' by the surroundings",
      "$14\\text{ J}$ of the work is done on the gas 'A' by the surroundings"
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
    solution: "For path $\\text{X} \\rightarrow \\text{Y}$:\n$q = +10\\text{ J}$, $w = -18\\text{ J}$ (work done by gas).\n$$\\Delta U_{\\text{X}\\rightarrow\\text{Y}} = q + w = 10 - 18 = -8\\text{ J}$$\nFor reverse path $\\text{Y} \\rightarrow \\text{X}$:\n$$\\Delta U_{\\text{Y}\\rightarrow\\text{X}} = -\\Delta U_{\\text{X}\\rightarrow\\text{Y}} = +8\\text{ J}$$\nHeat evolved: $q = -6\\text{ J}$:\n$$\\Delta U = q + w \\implies 8 = -6 + w \\implies w = +14\\text{ J}$$\nSince $w > 0$, $14\\text{ J}$ of work is done on the gas by the surroundings."
  },
  {
    qNum: 237,
    exam: "JEE Main 2026 (03 Apr, Shift 1)",
    question: "Given below are two statements:\nStatement I: For an ideal gas, heat capacity at constant volume is always greater than the heat capacity at constant pressure.\nStatement II: In a constant volume process, no work is produced and all the heat withdrawn goes into the chaotic motion and is reflected by a temperature increase of the ideal gas.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
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
    solution: "- Statement I is false: According to Mayer's relation, $C_p - C_v = R > 0$, so $C_p > C_v$ (heat capacity at constant pressure is always greater).\n- Statement II is true: In an isochoric process, $\\Delta V = 0$, so $w = 0$ and $q_v = \\Delta U = n C_v \\Delta T$, where all added heat goes directly to increasing internal energy and temperature.\nTherefore, Statement I is false but Statement II is true."
  },
  {
    qNum: 238,
    exam: "JEE Main 2026 (04 Apr, Shift 2)",
    question: "If $3.365\\text{ g}$ of ethanol (l) is burnt completely in a bomb calorimeter at $298.15\\text{ K}$, the heat produced is $99.472\\text{ kJ}$. The $|\\Delta_f H^\circ|$ of ethanol at $298.15\\text{ K}$ is $\\_\\_\\_ \\times 10^2\\text{ kJ mol}^{-1}$. (Nearest integer)\nGiven: Standard enthalpy for combustion of graphite $= -393.5\\text{ kJ mol}^{-1}$\nStandard enthalpy of formation of water (l) $= -285.8\\text{ kJ mol}^{-1}$\nMolar mass of $\\text{C}, \\text{H}, \\text{O}$ are $12, 1$ and $16\\text{ g mol}^{-1}$ respectively.",
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
    solution: "Molar mass of $\\text{C}_2\\text{H}_5\\text{OH} = 46\\text{ g mol}^{-1}$.\nMoles of ethanol burnt $n = \\frac{3.365}{46} = 0.07315\\text{ mol}$.\n$$\\Delta U_c = -\\frac{99.472}{0.07315} = -1359.8\\text{ kJ mol}^{-1}$$\n$$\\text{C}_2\\text{H}_5\\text{OH}(\\text{l}) + 3\\text{O}_2(\\text{g}) \\rightarrow 2\\text{CO}_2(\\text{g}) + 3\\text{H}_2\\text{O}(\\text{l}), \\quad \\Delta n_g = -1$$\n$$\\Delta_c H = \\Delta U_c + \\Delta n_g RT = -1359.8 - (1 \\times 8.314 \\times 10^{-3} \\times 298.15) = -1362.28\\text{ kJ mol}^{-1}$$\n$$\\Delta_c H = 2\\Delta_f H(\\text{CO}_2) + 3\\Delta_f H(\\text{H}_2\\text{O}) - \\Delta_f H(\\text{ethanol})$$\n$$-1362.28 = 2(-393.5) + 3(-285.8) - \\Delta_f H(\\text{ethanol}) = -1644.4 - \\Delta_f H(\\text{ethanol})$$\n$$\\Delta_f H(\\text{ethanol}) = -1644.4 + 1362.28 = -282.12\\text{ kJ mol}^{-1} = -2.82 \\times 10^2\\text{ kJ mol}^{-1}$$\nRounding to the nearest integer yields $3$."
  },
  {
    qNum: 239,
    exam: "JEE Main 2026 (05 Apr, Shift 2)",
    question: "The correct order of molar heat capacities measured at $298\\text{ K}$ and $1\\text{ bar}$ is :",
    options: [
      "$\\text{Copper}(\\text{s}) > \\text{Bromine}(\\text{l}) > \\text{Helium}(\\text{g})$",
      "$\\text{Bromine}(\\text{l}) > \\text{Copper}(\\text{s}) > \\text{Helium}(\\text{g})$",
      "$\\text{Helium}(\\text{g}) > \\text{Bromine}(\\text{l}) > \\text{Copper}(\\text{s})$",
      "$\\text{Helium}(\\text{g}) > \\text{Bromine}(\\text{l}) = \\text{Copper}(\\text{s})$"
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
    solution: "- Helium (monatomic gas): $C_p = \\frac{5}{2}R \\approx 20.8\\text{ J K}^{-1}\\text{ mol}^{-1}$.\n- Copper (solid): By Dulong-Petit law, $C_p \\approx 3R \\approx 24.9\\text{ J K}^{-1}\\text{ mol}^{-1}$.\n- Bromine (diatomic liquid): Possesses translational, rotational, vibrational modes and intermolecular interaction contributions, giving $C_p \\approx 75.7\\text{ J K}^{-1}\\text{ mol}^{-1}$.\nTherefore, $\\text{Bromine}(\\text{l}) > \\text{Copper}(\\text{s}) > \\text{Helium}(\\text{g})$."
  },
  {
    qNum: 240,
    exam: "JEE Main 2026 (05 Apr, Shift 2)",
    question: "Consider the following data for the reaction $\\text{X}_2(\\text{g}) + \\text{Y}_2(\\text{g}) \\rightleftharpoons 2\\text{XY}(\\text{g})$ at $600\\text{ K}$:\n- $\\Delta_f H_{600}^\circ(\\text{kJ mol}^{-1})$: $\\text{XY}(\\text{g}) = 42, \\text{X}_2(\\text{g}) = 8, \\text{Y}_2(\\text{g}) = 80$\n- $S_{600}^\circ(\\text{J mol}^{-1}\\text{ K}^{-1})$: $\\text{XY}(\\text{g}) = 200, \\text{X}_2(\\text{g}) = 140, \\text{Y}_2(\\text{g}) = 250$\nThe $\\Delta_r G^\circ$ (in $\\text{kJ mol}^{-1}$) for the reaction is :",
    options: [
      "$-21000$",
      "$-10$",
      "$-1000$",
      "$-0.012$"
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
    solution: "$$\\Delta_r H^\circ = 2\\Delta_f H^\\circ(\\text{XY}) - [\\Delta_f H^\\circ(\\text{X}_2) + \\Delta_f H^\\circ(\\text{Y}_2)] = 2(42) - (8 + 80) = 84 - 88 = -4\\text{ kJ mol}^{-1}$$\n$$\\Delta_r S^\circ = 2S^\circ(\\text{XY}) - [S^\circ(\\text{X}_2) + S^\circ(\\text{Y}_2)] = 2(200) - (140 + 250) = 400 - 390 = 10\\text{ J K}^{-1}\\text{ mol}^{-1} = 0.01\\text{ kJ K}^{-1}\\text{ mol}^{-1}$$\n$$\\Delta_r G^\circ = \\Delta_r H^\circ - T\\Delta_r S^\circ = -4 - (600 \\times 0.01) = -4 - 6 = -10\\text{ kJ mol}^{-1}$$"
  },
  {
    qNum: 241,
    exam: "JEE Main 2026 (06 Apr, Shift 1)",
    question: "Arrange the following isothermal processes in order of the magnitude of the work ($p-V$) involved between states 1 and 2.\nA. Expansion in single stage $w_A$\nB. Expansion in multi stages $w_B$\nC. Compression in single stage $w_C$\nD. Compression in multi stages $w_D$\nChoose the correct option.",
    options: [
      "$|w_B| > |w_A| > |w_C| > |w_D|$",
      "$|w_C| > |w_D| > |w_A| > |w_B|$",
      "$|w_C| > |w_D| > |w_B| > |w_A|$",
      "$|w_B| > |w_A| > |w_D| > |w_C|$"
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
    solution: "1. For compression from State 2 to State 1 ($P_1 > P_2$):\n   - Single-stage compression work is against the high final pressure $P_1$: $|w_C| = P_1(V_1 - V_2)$. This represents the largest work.\n   - Multi-stage compression uses intermediate pressures, so $|w_C| > |w_D| > |w_{\\text{rev}}|$.\n2. For expansion from State 1 to State 2 ($P_1 > P_2$):\n   - Multi-stage expansion produces more work than single-stage: $|w_{\\text{rev}}| > |w_B| > |w_A|$.\n   - Single-stage expansion is against the low final pressure $P_2$, producing the smallest work.\nCombining these gives:\n$$|w_C| > |w_D| > |w_B| > |w_A|$$"
  },
  {
    qNum: 242,
    exam: "JEE Main 2026 (06 Apr, Shift 1)",
    question: "Consider the reaction $\\text{X} \\rightleftharpoons \\text{Y}$ at $300\\text{ K}$. If $\\Delta H^\circ$ and $K$ are $28.40\\text{ kJ mol}^{-1}$ and $1.8 \\times 10^{-7}$ at the same temperature, then the magnitude of $\\Delta S^\circ$ for the reaction in $\\text{J K}^{-1}\\text{ mol}^{-1}$ is $\\_\\_\\_$. (Nearest integer) (Given: $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$, $\\ln 10 = 2.3$, $\\log_{10} 3 = 0.48$, $\\log_{10} 2 = 0.30$)",
    options: [],
    correct_option: null,
    numeric_answer: 34,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "hard",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "$$\\log_{10} K = \\log_{10}(1.8 \\times 10^{-7}) = \\log_{10}(18 \\times 10^{-8}) = \\log_{10} 2 + 2\\log_{10} 3 - 8 = 0.30 + 0.96 - 8 = -6.74$$\n$$\\Delta G^\circ = -2.3 \\times 8.3 \\times 300 \\times (-6.74) = +38,599.98\\text{ J mol}^{-1}$$\n$$\\Delta G^\circ = \\Delta H^\circ - T\\Delta S^\circ \\implies 38,600 = 28,400 - 300\\Delta S^\circ$$\n$$300\\Delta S^\circ = 28,400 - 38,600 = -10,200$$\n$$\\Delta S^\circ = -\\frac{10,200}{300} = -34\\text{ J K}^{-1}\\text{ mol}^{-1}$$\nThe magnitude is $34$."
  },
  {
    qNum: 243,
    exam: "JEE Main 2026 (06 Apr, Shift 2)",
    question: "Match List - I with List - II.\nList - I:\n(A) Reversible expansion\n(B) Free expansion\n(C) Irreversible Compression\n(D) Cyclic reversible\nList - II:\n(I) $q = 0$\n(II) $q = nRT\\ln(V_f / V_i)$\n(III) $w = -P_{\\text{ext}}(V_f - V_i)$\n(IV) $\\oint \\frac{dq}{T} = 0$\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(II), (B)-(I), (C)-(IV), (D)-(III)",
      "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"
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
    solution: "- (A) Reversible isothermal expansion: $\\Delta U = 0 \\implies q = -w = nRT\\ln(V_f / V_i)$ (II)\n- (B) Free expansion ($P_{\\text{ext}} = 0$): $w = 0, \\Delta U = 0 \\implies q = 0$ (I)\n- (C) Irreversible compression: $w = -P_{\\text{ext}}(V_f - V_i)$ (III)\n- (D) Cyclic reversible: Clausius theorem $\\oint \\frac{dq_{\\text{rev}}}{T} = 0$ (IV)\nHence, (A)-(II), (B)-(I), (C)-(III), (D)-(IV)."
  },
  {
    qNum: 244,
    exam: "JEE Main 2026 (06 Apr, Shift 2)",
    question: "Match List - I with List - II. Given $V_i$ and $V_f$ are initial and final volumes respectively.\nList - I (Isothermal process):\n(A) Reversible expansion\n(B) Free expansion\n(C) Irreversible Compression\n(D) Cyclic reversible\nList - II (Expression):\n(I) $q = 0$\n(II) $q = nRT\\ln(V_f / V_i)$\n(III) $w = -P_{\\text{ext}}(V_f - V_i)$\n(IV) $\\oint \\frac{dq}{T} = 0$\nChoose the correct answer from the options given below :",
    options: [
      "(A)-(II), (B)-(III), (C)-(I), (D)-(IV)",
      "(A)-(I), (B)-(II), (C)-(IV), (D)-(III)",
      "(A)-(II), (B)-(I), (C)-(III), (D)-(IV)",
      "(A)-(I), (B)-(II), (C)-(III), (D)-(IV)"
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
    solution: "- (A) Reversible expansion: $q = nRT\\ln(V_f / V_i)$ (II)\n- (B) Free expansion: $q = 0$ (I)\n- (C) Irreversible Compression: $w = -P_{\\text{ext}}(V_f - V_i)$ (III)\n- (D) Cyclic reversible: $\\oint \\frac{dq}{T} = 0$ (IV)\nHence, (A)-(II), (B)-(I), (C)-(III), (D)-(IV)."
  },
  {
    qNum: 245,
    exam: "JEE Main 2026 (08 Apr, Shift 2)",
    question: "Consider the reaction:\n$$2\\text{H}_2\\text{S}(\\text{g}) + 3\\text{O}_2(\\text{g}) \\rightarrow 2\\text{H}_2\\text{O}(\\text{l}) + 2\\text{SO}_2(\\text{g})$$\nThe magnitude of enthalpy change for the reaction in $\\text{kJ mol}^{-1}$ is $\\_\\_\\_$. (Nearest integer)\nGiven: $\\Delta_f H^\\circ(\\text{H}_2\\text{S}) = -20.1\\text{ kJ mol}^{-1}$, $\\Delta_f H^\\circ(\\text{H}_2\\text{O}) = -286.0\\text{ kJ mol}^{-1}$, $\\Delta_f H^\\circ(\\text{SO}_2) = -297.0\\text{ kJ mol}^{-1}$.",
    options: [],
    correct_option: null,
    numeric_answer: 1126,
    question_type: "numerical",
    marks: 4,
    negative_marks: 0,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Thermodynamics",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Reaction enthalpy:\n$$\\Delta_r H = [2\\Delta_f H(\\text{H}_2\\text{O}) + 2\\Delta_f H(\\text{SO}_2)] - [2\\Delta_f H(\\text{H}_2\\text{S}) + 3\\Delta_f H(\\text{O}_2)]$$\n$$\\Delta_r H = [2(-286.0) + 2(-297.0)] - [2(-20.1) + 0]$$\n$$\\Delta_r H = [-572.0 - 594.0] - [-40.2] = -1166.0 + 40.2 = -1125.8\\text{ kJ mol}^{-1}$$\nThe magnitude rounded to the nearest integer is $1126$."
  }
];
