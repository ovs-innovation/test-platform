import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const KINETIC_PART2 = [
  {
    q_num: 36,
    question_text: "If $f_T, f_R$ and $f_V$ are translational, rotational and vibrational degrees of freedom of an atom in a solid, then choose the correct option",
    options: [
      "$f_T = 3, f_R = 0, f_V = 0$",
      "$f_T = 0, f_R = 0, f_V = 6$",
      "$f_T = 3, f_R = 0, f_V = 1$",
      "$f_T = 3, f_R = 0, f_V = 3$"
    ],
    correct_index: 1,
    topic: "Degrees of Freedom in Solids",
    difficulty: "medium",
    image_url: "",
    solution: "In a solid lattice:\n1. Atoms are tightly bound at equilibrium lattice sites, so they cannot translate ($f_T = 0$) or rotate ($f_R = 0$).\n2. Each atom can oscillate independently along three mutually perpendicular spatial axes ($x, y, z$).\n3. Each one-dimensional simple harmonic vibration possesses 2 degrees of freedom (one quadratic term for kinetic energy $\\frac{1}{2}mv^2$ and one for potential energy $\\frac{1}{2}kx^2$).\nThus, the total vibrational degrees of freedom are $f_V = 3 \\times 2 = 6$.\nTherefore: $f_T = 0, f_R = 0, f_V = 6$."
  },
  {
    q_num: 37,
    question_text: "The number of degree of freedom for a diatomic gas, taking into account vibrational mode is",
    options: ["2", "5", "7", "6"],
    correct_index: 2,
    topic: "Degrees of Freedom of Diatomic Gas",
    difficulty: "easy",
    image_url: "",
    solution: "For a diatomic gas molecule:\n- Translational degrees of freedom = 3\n- Rotational degrees of freedom = 2 (about two axes perpendicular to the internuclear axis)\n- Vibrational degrees of freedom = 2 (1 for vibrational kinetic energy + 1 for vibrational potential energy)\n\nTaking the vibrational mode into account:\n$$f = 3 + 2 + 2 = 7$$"
  },
  {
    q_num: 38,
    question_text: "A gas is at temperature $137^\\circ\\text{C}$. It is cooled down upto temperature $t^\\circ\\text{C}$ so that average kinetic energy (Translational) of molecule is half then $t$ is",
    options: ["$68^\\circ\\text{C}$", "$167^\\circ\\text{C}$", "$205^\\circ\\text{C}$", "$-68^\\circ\\text{C}$"],
    correct_index: 3,
    topic: "Translational Kinetic Energy & Temperature",
    difficulty: "medium",
    image_url: "",
    solution: "The average translational kinetic energy of a molecule is directly proportional to its absolute temperature in Kelvin:\n$$E \\propto T$$\nGiven:\n- Initial temperature: $T_1 = 137^\\circ\\text{C} = 137 + 273 = 410\\text{ K}$\n- Final kinetic energy: $E_2 = \\frac{1}{2}E_1$\n\nTherefore:\n$$T_2 = \\frac{1}{2}T_1 = \\frac{410}{2} = 205\\text{ K}$$\nConverting back to Celsius:\n$$t = 205 - 273 = -68^\\circ\\text{C}$$"
  },
  {
    q_num: 39,
    question_text: "Degree of freedom of an ideal gas is 4. Ratio of molar heat capacities $\\frac{C_p}{C_v}$ is equal to",
    options: ["1.5", "1.4", "1.67", "1.33"],
    correct_index: 0,
    topic: "Specific Heat Ratio & Degrees of Freedom",
    difficulty: "easy",
    image_url: "",
    solution: "The ratio of molar heat capacities is given by:\n$$\\gamma = \\frac{C_p}{C_v} = 1 + \\frac{2}{f}$$\nGiven $f = 4$:\n$$\\gamma = 1 + \\frac{2}{4} = 1 + 0.5 = 1.5$$"
  },
  {
    q_num: 40,
    question_text: "If 2 moles of diatomic gas and 1 mole of monoatomic gas are mixed, then the ratio of molar specific heats $C_p$ and $C_v$ for the mixture is",
    options: ["$\\frac{7}{3}$", "$\\frac{5}{4}$", "$\\frac{19}{13}$", "$\\frac{15}{19}$"],
    correct_index: 2,
    topic: "Specific Heat Ratio of Mixture",
    difficulty: "medium",
    image_url: "",
    solution: "1. For diatomic gas: $n_1 = 2$, $C_{v1} = \\frac{5}{2}R$, $C_{p1} = \\frac{7}{2}R$.\n2. For monoatomic gas: $n_2 = 1$, $C_{v2} = \\frac{3}{2}R$, $C_{p2} = \\frac{5}{2}R$.\n\nFor the mixture:\n$$C_{v,\\text{mix}} = \\frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2} = \\frac{2 \\times \\frac{5}{2}R + 1 \\times \\frac{3}{2}R}{2 + 1} = \\frac{5R + 1.5R}{3} = \\frac{6.5R}{3} = \\frac{13R}{6}$$\n$$C_{p,\\text{mix}} = C_{v,\\text{mix}} + R = \\frac{13R}{6} + R = \\frac{19R}{6}$$\n$$\\gamma_{\\text{mix}} = \\frac{C_{p,\\text{mix}}}{C_{v,\\text{mix}}} = \\frac{19R/6}{13R/6} = \\frac{19}{13}$$"
  },
  {
    q_num: 41,
    question_text: "A box of negligible mass containing one mole of an ideal monoatomic gas of molar mass $M$, moves with constant speed $V$ on a smooth horizontal surface. If the box suddenly stops, then change in the temperature of the gas will be ($R \\rightarrow \\text{Molar gas constant}$)",
    options: ["$\\frac{M V^2}{5R}$", "$\\frac{M V^2}{3R}$", "$\\frac{M V^2}{2R}$", "$\\frac{M V^2}{R}$"],
    correct_index: 1,
    topic: "Bulk Kinetic Energy to Internal Energy",
    difficulty: "medium",
    image_url: "",
    solution: "When the moving box suddenly stops, its macroscopic bulk kinetic energy is completely converted into internal thermal kinetic energy of the gas:\n$$\\Delta K = \\frac{1}{2} m_{\\text{gas}} V^2 = \\frac{1}{2} (n M) V^2 = \\frac{1}{2} M V^2 \\quad (\\text{since } n = 1)$$\nThe rise in internal energy of a monoatomic gas ($C_v = \\frac{3}{2}R$) is:\n$$\\Delta U = n C_v \\Delta T = 1 \\cdot \\left(\\frac{3}{2}R\\right) \\Delta T = \\frac{3}{2} R \\Delta T$$\nEquating $\\Delta K = \\Delta U$:\n$$\\frac{1}{2} M V^2 = \\frac{3}{2} R \\Delta T \\implies \\Delta T = \\frac{M V^2}{3R}$$"
  },
  {
    q_num: 42,
    question_text: "A box of negligible mass containing 4 moles of ideal gas of molar mass $M$ and adiabatic exponent $\\gamma$ moves with constant speed $v$ on a smooth horizontal surface. If the box suddenly stops then change in temperature of gas will be",
    options: [
      "$\\frac{(\\gamma - 1) M v^2}{8R}$",
      "$\\frac{M v^2}{2R}$",
      "$\\frac{M v^2}{2(\\gamma - 1)R}$",
      "$\\frac{(\\gamma - 1) M v^2}{2R}$"
    ],
    correct_index: 3,
    topic: "Bulk Kinetic Energy to Thermal Energy",
    difficulty: "medium",
    image_url: "",
    solution: "1. Total mass of the gas is $m_{\\text{total}} = n M = 4M$.\n2. The lost macroscopic kinetic energy is:\n$$\\Delta K = \\frac{1}{2} m_{\\text{total}} v^2 = \\frac{1}{2} (4M) v^2 = 2 M v^2$$\n3. The molar heat capacity at constant volume is $C_v = \\frac{R}{\\gamma - 1}$.\nThe increase in internal energy of $n = 4$ moles of gas is:\n$$\\Delta U = n C_v \\Delta T = 4 \\left(\\frac{R}{\\gamma - 1}\\right) \\Delta T$$\n4. By conservation of energy $\\Delta K = \\Delta U$:\n$$2 M v^2 = \\frac{4 R}{\\gamma - 1} \\Delta T \\implies \\Delta T = \\frac{2 M v^2 (\\gamma - 1)}{4 R} = \\frac{(\\gamma - 1) M v^2}{2R}$$"
  },
  {
    q_num: 43,
    question_text: "A graph between pressure $P$ and $\\frac{1}{V}$ where $V$ is volume for a gas at constant temperature is",
    options: ["Parabola", "Rectangular hyperbola", "Hyperbola", "Straight line"],
    correct_index: 3,
    topic: "Boyle's Law & Indicator Diagrams",
    difficulty: "easy",
    image_url: "",
    solution: "According to Boyle's law, at constant temperature:\n$$P V = \\text{constant} = k \\implies P = k \\left(\\frac{1}{V}\\right)$$\nLetting $y = P$ and $x = \\frac{1}{V}$, the equation is of the form:\n$$y = k x$$\nThis represents a straight line passing through the origin."
  },
  {
    q_num: 44,
    question_text: "The kinetic energy of one mole of an ideal gas is $\\frac{5}{2}RT$ at absolute temperature $T$. The molar heat capacity at constant volume for gas is",
    options: ["$3.2R$", "$0.5R$", "$1.5R$", "$2.5R$"],
    correct_index: 3,
    topic: "Molar Heat Capacity & Internal Energy",
    difficulty: "easy",
    image_url: "",
    solution: "The internal kinetic energy of one mole ($n = 1$) of the ideal gas is:\n$$U = \\frac{5}{2}RT$$\nThe molar heat capacity at constant volume is defined as:\n$$C_v = \\frac{dU}{dT} = \\frac{d}{dT}\\left(\\frac{5}{2}RT\\right) = \\frac{5}{2}R = 2.5R$$"
  },
  {
    q_num: 45,
    question_text: "Which of the following is true for molar heat capacity of an ideal gas?",
    options: [
      "It cannot be negative",
      "It has only two values ($C_p$ and $C_v$)",
      "It can have any value",
      "It cannot be zero"
    ],
    correct_index: 2,
    topic: "Molar Heat Capacity of Ideal Gas",
    difficulty: "easy",
    image_url: "",
    solution: "The molar heat capacity of an ideal gas is defined as $C = \\frac{\\Delta Q}{n \\Delta T}$, which depends entirely on the nature of the process:\n- In an adiabatic process ($\\Delta Q = 0$), $C = 0$.\n- In an isothermal process ($\\Delta T = 0$), $C = \\infty$.\n- In polytropic expansion processes where work done exceeds heat supplied ($W > \\Delta Q$), $\\Delta T < 0$ while $\\Delta Q > 0$, making $C$ negative.\nThus, the molar heat capacity of an ideal gas can take any value from $-\\infty$ to $+\\infty$."
  },
  {
    q_num: 46,
    question_text: "The molar specific heat at constant pressure for a monatomic ideal gas is ($R$: Universal Gas Constant)",
    options: ["$\\frac{3}{2}R$", "$\\frac{5}{2}R$", "$\\frac{7}{2}R$", "$4R$"],
    correct_index: 1,
    topic: "Molar Heat Capacity of Monatomic Gas",
    difficulty: "easy",
    image_url: "",
    solution: "For a monatomic ideal gas, the degrees of freedom are $f = 3$.\n$$C_v = \\frac{f}{2}R = \\frac{3}{2}R$$\nBy Mayer's relation:\n$$C_p = C_v + R = \\frac{3}{2}R + R = \\frac{5}{2}R$$"
  },
  {
    q_num: 47,
    question_text: "Which of the following relations for an ideal gas is wrong? (Symbols have their usual meaning)",
    options: [
      "$C_v = \\frac{R}{\\gamma - 1}$",
      "$C_p = \\frac{\\gamma R}{\\gamma - 1}$",
      "$\\frac{C_p}{C_v} = \\gamma$",
      "$C_p - C_v = 2R$"
    ],
    correct_index: 3,
    topic: "Thermodynamic Relations of Specific Heats",
    difficulty: "easy",
    image_url: "",
    solution: "According to Mayer's relation, the difference between molar heat capacities of an ideal gas is:\n$$C_p - C_v = R$$\nTherefore, the relation $C_p - C_v = 2R$ is incorrect."
  },
  {
    q_num: 48,
    question_text: "For a gas, if the ratio of molar heat capacities at constant pressure $P$ and constant volume $V$ is $\\gamma$, then the value of degree of freedom is",
    options: [
      "$\\frac{\\gamma + 1}{\\gamma - 1}$",
      "$\\frac{\\gamma - 1}{\\gamma + 1}$",
      "$\\frac{1}{2}(\\gamma - 1)$",
      "$\\frac{2}{\\gamma - 1}$"
    ],
    correct_index: 3,
    topic: "Degrees of Freedom Formula",
    difficulty: "easy",
    image_url: "",
    solution: "The ratio of molar heat capacities $\\gamma$ is related to the degrees of freedom $f$ by:\n$$\\gamma = 1 + \\frac{2}{f} \\implies \\gamma - 1 = \\frac{2}{f} \\implies f = \\frac{2}{\\gamma - 1}$$"
  },
  {
    q_num: 49,
    question_text: "When $n$ moles of a polyatomic gas is mixed with five moles of monoatomic gas at low temperature, the mixture behaves as a diatomic gas, the value of $n$ is",
    options: ["5", "8", "10", "12"],
    correct_index: 2,
    topic: "Mixture of Gases",
    difficulty: "medium",
    image_url: "",
    solution: "At low temperature, vibrational modes are dormant.\n- For polyatomic gas (non-linear): $f_1 = 6 \\implies C_{v1} = 3R$\n- For monoatomic gas: $n_2 = 5$, $f_2 = 3 \\implies C_{v2} = \\frac{3}{2}R$\n- For diatomic-like mixture: $C_{v,\\text{mix}} = \\frac{5}{2}R$\n\nUsing the formula for $C_{v,\\text{mix}}$:\n$$C_{v,\\text{mix}} = \\frac{n C_{v1} + n_2 C_{v2}}{n + n_2} \\implies \\frac{5}{2}R = \\frac{n(3R) + 5(1.5R)}{n + 5}$$\n$$\\frac{5}{2}(n + 5) = 3n + 7.5 \\implies 2.5n + 12.5 = 3n + 7.5 \\implies 0.5n = 5.0 \\implies n = 10$$"
  },
  {
    q_num: 50,
    question_text: "Molar heat capacity at constant volume of $\\text{He}$ gas is ideally ($R$: Universal gas constant)",
    options: ["$\\frac{5}{2}R$", "$\\frac{7}{2}R$", "$\\frac{3}{2}R$", "$\\frac{9}{2}R$"],
    correct_index: 2,
    topic: "Specific Heat of Helium",
    difficulty: "easy",
    image_url: "",
    solution: "Helium ($\\text{He}$) is a monatomic gas with $f = 3$ translational degrees of freedom.\n$$C_v = \\frac{f}{2}R = \\frac{3}{2}R$$"
  },
  {
    q_num: 51,
    question_text: "Ratio of molar heat capacity at constant volume to its specific heat capacity at constant volume for hydrogen is equal to",
    options: ["$1\\text{ g}$", "$\\frac{7}{5}\\text{ g}$", "$2\\text{ g}$", "$\\frac{1}{2}\\text{ g}$"],
    correct_index: 2,
    topic: "Molar vs Specific Heat Capacity",
    difficulty: "easy",
    image_url: "",
    solution: "Molar heat capacity $C_v$ (heat per mole per degree) and specific heat capacity $c_v$ (heat per gram per degree) are related by:\n$$C_v = M \\cdot c_v \\implies \\frac{C_v}{c_v} = M$$\nwhere $M$ is the molar mass of the gas.\nFor hydrogen gas ($\\text{H}_2$), $M = 2\\text{ g/mol} = 2\\text{ g}$.\nTherefore, the ratio is $2\\text{ g}$."
  },
  {
    q_num: 52,
    question_text: "The ratio of average translatory kinetic energy to average rotational K.E. of a diatomic gas molecule is",
    options: ["1 : 3", "3 : 2", "2 : 3", "3 : 1"],
    correct_index: 1,
    topic: "Equipartition of Energy in Diatomic Gas",
    difficulty: "easy",
    image_url: "",
    solution: "By the equipartition theorem:\n- Translatory degrees of freedom = 3 $\\implies E_{\\text{trans}} = 3 \\times \\frac{1}{2}k_B T = \\frac{3}{2}k_B T$\n- Rotational degrees of freedom = 2 $\\implies E_{\\text{rot}} = 2 \\times \\frac{1}{2}k_B T = k_B T$\n\nThe ratio is:\n$$\\frac{E_{\\text{trans}}}{E_{\\text{rot}}} = \\frac{\\frac{3}{2}k_B T}{k_B T} = \\frac{3}{2} = 3 : 2$$"
  },
  {
    q_num: 53,
    question_text: "A diatomic gas of molecular mass $30\\text{ g/mol}$ is filled in a rigid container at temperature $20^\\circ\\text{C}$. Container is fixed with a moving trolley whose velocity is $60\\text{ m/s}$. If trolley suddenly stops, then the rise in temperature of the gas is ($R$: Universal gas constant)",
    options: [
      "$\\frac{112}{5R}^\\circ\\text{C}$",
      "$\\frac{108}{5R}^\\circ\\text{C}$",
      "$\\frac{96}{5R}^\\circ\\text{C}$",
      "$\\frac{78}{5R}^\\circ\\text{C}$"
    ],
    correct_index: 1,
    topic: "Conservation of Energy",
    difficulty: "medium",
    image_url: "",
    solution: "Loss of bulk mechanical kinetic energy of $n$ moles of diatomic gas:\n$$\\Delta K = \\frac{1}{2} m_{\\text{gas}} v^2 = \\frac{1}{2} (n M) v^2$$\nThis energy is converted into internal thermal energy:\n$$\\Delta U = n C_v \\Delta T = n \\left(\\frac{5}{2}R\\right) \\Delta T$$\nEquating $\\Delta K = \\Delta U$:\n$$\\frac{1}{2} n M v^2 = \\frac{5}{2} n R \\Delta T \\implies \\Delta T = \\frac{M v^2}{5R}$$\nGiven:\n- $M = 30\\text{ g/mol} = 30 \\times 10^{-3}\\text{ kg/mol}$\n- $v = 60\\text{ m/s} \\implies v^2 = 3600\\text{ m}^2/\\text{s}^2$\n$$\\Delta T = \\frac{(30 \\times 10^{-3}) \\times 3600}{5R} = \\frac{108}{5R}^\\circ\\text{C}$$"
  },
  {
    q_num: 54,
    question_text: "For nitrogen $C_p - C_v = a$ and for oxygen, $C_p - C_v = b$. The relation between $a$ and $b$ is",
    options: ["$a = b$", "$a = 7b$", "$a = \\frac{7}{b}$", "$a = \\frac{b}{2}$"],
    correct_index: 0,
    topic: "Mayer's Relation",
    difficulty: "easy",
    image_url: "",
    solution: "According to Mayer's relation, for one mole of ANY ideal gas, the difference between molar specific heat capacities is universally equal to the gas constant $R$:\n$$C_p - C_v = R$$\n- For nitrogen: $a = R$\n- For oxygen: $b = R$\nTherefore, $a = b$."
  },
  {
    q_num: 55,
    question_text: "For a gas $R/C_v = 0.67$. This gas consists of molecules which are",
    options: ["Diatomic", "Monatomic", "Triatomic", "All of these"],
    correct_index: 1,
    topic: "Atomicity and Specific Heat",
    difficulty: "easy",
    image_url: "",
    solution: "Molar heat capacity at constant volume is given by $C_v = \\frac{f}{2}R$, where $f$ is the degree of freedom:\n$$\\frac{R}{C_v} = \\frac{2}{f}$$\nGiven $\\frac{R}{C_v} = 0.67 \\approx \\frac{2}{3}$:\n$$\\frac{2}{f} = \\frac{2}{3} \\implies f = 3$$\nA gas whose molecules have 3 degrees of freedom is a monatomic gas."
  },
  {
    q_num: 56,
    question_text: "The number of rotational degree of freedom for a diatomic gas molecules is",
    options: ["5", "3", "7", "2"],
    correct_index: 3,
    topic: "Rotational Degrees of Freedom",
    difficulty: "easy",
    image_url: "",
    solution: "A diatomic molecule has a linear dumbbell structure along its internuclear bond axis. The moment of inertia about the bond axis itself is negligible, meaning rotation about this axis carries negligible kinetic energy.\nRotation about the two mutually perpendicular transverse axes contributes two rotational degrees of freedom:\n$$f_{\\text{rot}} = 2$$"
  },
  {
    q_num: 57,
    question_text: "The mean free path of molecules of a gas (radius $r$) is inversely proportional to",
    options: ["$r^3$", "$r$", "$r^2$", "$\\sqrt{r}$"],
    correct_index: 2,
    topic: "Mean Free Path",
    difficulty: "easy",
    image_url: "",
    solution: "The mean free path $\\lambda$ of gas molecules having molecular diameter $d = 2r$ and number density $n$ is given by:\n$$\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2} = \\frac{1}{\\sqrt{2}\\pi n (2r)^2} = \\frac{1}{4\\sqrt{2}\\pi n r^2}$$\nTherefore, the mean free path is inversely proportional to $r^2$ (the square of the molecular radius)."
  },
  {
    q_num: 58,
    question_text: "If $\\text{O}_2$ is kept at pressure 3 atm and 9 atm respectively at the same temperature 300K in two identical boxes, then the ratio of mean free path of $\\text{O}_2$ in the two boxes will be",
    options: ["1 : 1", "$1 : \\sqrt{3}$", "3 : 1", "$\\sqrt{3} : 1$"],
    correct_index: 2,
    topic: "Mean Free Path & Pressure",
    difficulty: "medium",
    image_url: "",
    solution: "Using the ideal gas relation $P = n k_B T$, the mean free path can be expressed in terms of pressure and temperature as:\n$$\\lambda = \\frac{k_B T}{\\sqrt{2}\\pi d^2 P}$$\nAt a constant temperature $T = 300\\text{ K}$, the mean free path is inversely proportional to pressure: $\\lambda \\propto \\frac{1}{P}$.\nTherefore:\n$$\\frac{\\lambda_1}{\\lambda_2} = \\frac{P_2}{P_1} = \\frac{9\\text{ atm}}{3\\text{ atm}} = \\frac{3}{1} = 3 : 1$$"
  },
  {
    q_num: 59,
    question_text: "When a gas in an open container is heated, the mean free path",
    options: [
      "Increases",
      "Decreases",
      "Remains the same",
      "Any of the above depending on the molar mass"
    ],
    correct_index: 0,
    topic: "Mean Free Path in Open Vessel",
    difficulty: "medium",
    image_url: "",
    solution: "In an open container, the gas is in equilibrium with the atmosphere, so pressure remains constant ($P = \\text{constant}$).\nThe mean free path is given by:\n$$\\lambda = \\frac{k_B T}{\\sqrt{2}\\pi d^2 P}$$\nAt constant pressure, $\\lambda \\propto T$. As the gas is heated, temperature $T$ increases and gas molecules escape, reducing number density $n = \\frac{P}{k_B T}$.\nBecause $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$, decreasing number density causes the mean free path to increase."
  },
  {
    q_num: 60,
    question_text: "A closed container having an ideal gas is heated gradually to increase the temperature by 20%. The mean free path will become/remain",
    options: ["20% more", "Same", "20% less", "33% less"],
    correct_index: 1,
    topic: "Mean Free Path in Closed Vessel",
    difficulty: "easy",
    image_url: "",
    solution: "In a closed container, both the volume $V$ and the total number of gas molecules $N$ are constant.\nTherefore, the number density $n = \\frac{N}{V}$ remains strictly unchanged.\nSince the mean free path is given by:\n$$\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$$\nand both $n$ and molecular diameter $d$ are unchanged, the mean free path remains the same."
  },
  {
    q_num: 61,
    question_text: "Mean free path of $\\text{N}_2$ gas molecules in a rigid container is $\\lambda$. If the temperature of the gas is doubled, then the new mean free path of $\\text{N}_2$ gas is",
    options: ["$\\frac{\\lambda}{2}$", "$3\\lambda$", "$\\frac{\\lambda}{4}$", "$\\lambda$"],
    correct_index: 3,
    topic: "Mean Free Path in Rigid Container",
    difficulty: "easy",
    image_url: "",
    solution: "In a rigid, closed container, the volume is constant and no gas escapes, so number density $n = N/V$ is constant.\nBecause $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$ depends solely on number density and molecular diameter, doubling the temperature has no effect on the mean free path.\nThus, the new mean free path remains $\\lambda$."
  },
  {
    q_num: 62,
    question_text: "Two ideal gases have same number of molecules per unit volume and radii of their molecules are $r$ and $3r$ respectively. The ratio of their mean free path in an identical container will be",
    options: ["3 : 1", "9 : 1", "1 : 1", "1 : 4"],
    correct_index: 1,
    topic: "Mean Free Path & Molecular Size",
    difficulty: "easy",
    image_url: "",
    solution: "The mean free path is inversely proportional to the square of the molecular radius:\n$$\\lambda \\propto \\frac{1}{r^2}$$\nGiven $r_1 = r$ and $r_2 = 3r$:\n$$\\frac{\\lambda_1}{\\lambda_2} = \\left(\\frac{r_2}{r_1}\\right)^2 = \\left(\\frac{3r}{r}\\right)^2 = \\frac{9}{1} = 9 : 1$$"
  },
  {
    q_num: 63,
    question_text: "The plot of Maxwell's distribution of speed of a gas at different temperatures. Find the correct relation between the temperatures",
    options: [
      "$T_A > T_B > T_C$",
      "$T_A = T_B = T_C$",
      "$T_A < T_B < T_C$",
      "None of these"
    ],
    correct_index: 2,
    topic: "Maxwell-Boltzmann Speed Distribution",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q63.png",
    solution: "From Maxwell's distribution of speeds:\n1. The peak of the curve corresponds to the most probable speed $v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}} \\propto \\sqrt{T}$.\n2. In the given figure, the peak speeds satisfy:\n$$v_{\\text{mp},A} < v_{\\text{mp},B} < v_{\\text{mp},C}$$\nSince $v_{\\text{mp}} \\propto \\sqrt{T}$, this implies:\n$$T_A < T_B < T_C$$\nFurthermore, as temperature increases, the distribution flattens and shifts to higher speeds to preserve the total area under the curve."
  },
  {
    q_num: 64,
    question_text: "If the mean free path of a molecule of an ideal gas having diameter $10^{-8}\\text{ cm}$ is $10^{-4}\\text{ m}$, the number density of gas is",
    options: [
      "$22 \\times 10^{16}\\text{ / cm}^3$",
      "$16 \\times 10^{22}\\text{ / cm}^3$",
      "$6 \\times 10^{18}\\text{ / cm}^3$",
      "$12 \\times 10^{12}\\text{ / cm}^3$"
    ],
    correct_index: 0,
    topic: "Mean Free Path & Number Density",
    difficulty: "medium",
    image_url: "",
    solution: "Given:\n- Diameter $d = 10^{-8}\\text{ cm} = 10^{-10}\\text{ m}$\n- Mean free path $\\lambda = 10^{-4}\\text{ m}$\n\nUsing the formula $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$:\n$$n = \\frac{1}{\\sqrt{2}\\pi d^2 \\lambda} = \\frac{1}{1.414 \\times 3.1416 \\times (10^{-10})^2 \\times 10^{-4}} = \\frac{1}{4.44 \\times 10^{-24}} \\approx 2.25 \\times 10^{23}\\text{ m}^{-3}$$\nConverting to $\\text{cm}^{-3}$ ($1\\text{ m}^3 = 10^6\\text{ cm}^3$):\n$$n = 2.25 \\times 10^{23} \\times 10^{-6}\\text{ cm}^{-3} = 2.25 \\times 10^{17}\\text{ cm}^{-3} = 22.5 \\times 10^{16}\\text{ / cm}^3 \\approx 22 \\times 10^{16}\\text{ / cm}^3$$"
  },
  {
    q_num: 65,
    question_text: "28 g of nitrogen gas and $x\\text{ g}$ of $\\text{H}_2$ gas occupy the same volume at the same temperature and pressure. Then the value of $x$ is",
    options: ["$4\\text{ g}$", "$14\\text{ g}$", "$2\\text{ g}$", "$1\\text{ g}$"],
    correct_index: 2,
    topic: "Avogadro's Hypothesis",
    difficulty: "easy",
    image_url: "",
    solution: "By Avogadro's law, equal volumes of all gases under identical conditions of temperature and pressure contain equal numbers of moles:\n$$n_{\\text{N}_2} = n_{\\text{H}_2}$$\nNumber of moles of nitrogen (molar mass $28\\text{ g/mol}$):\n$$n_{\\text{N}_2} = \\frac{28\\text{ g}}{28\\text{ g/mol}} = 1\\text{ mol}$$\nTherefore, number of moles of hydrogen (molar mass $2\\text{ g/mol}$) must be 1 mol:\n$$n_{\\text{H}_2} = \\frac{x}{2\\text{ g/mol}} = 1 \\implies x = 2\\text{ g}$$"
  },
  {
    q_num: 66,
    question_text: "Suppose a container is evacuated to leave just one molecule of a gas in it. Let $v_a$ and $v_{\\text{rms}}$ represent the average speed and the rms speed of the gas",
    options: [
      "$v_a > v_{\\text{rms}}$",
      "$v_a < v_{\\text{rms}}$",
      "$v_a = v_{\\text{rms}}$",
      "$v_{\\text{rms}}$ is undefined"
    ],
    correct_index: 2,
    topic: "Molecular Speeds for Single Particle",
    difficulty: "easy",
    image_url: "",
    solution: "For a single molecule moving with speed $v$:\n- Average speed: $v_a = \\frac{v}{1} = v$\n- Root mean square speed: $v_{\\text{rms}} = \\sqrt{\\frac{v^2}{1}} = v$\nTherefore, $v_a = v_{\\text{rms}}$."
  },
  {
    q_num: 67,
    question_text: "If speed of 3 molecules are 0.5, 1 and 2 m/s respectively, then square of ratio of their root mean square speed and the average speed is",
    options: ["$\\frac{6}{7}$", "$\\frac{10}{11}$", "$\\frac{9}{7}$", "$\\frac{10}{9}$"],
    correct_index: 2,
    topic: "RMS and Average Speed Calculation",
    difficulty: "medium",
    image_url: "",
    solution: "Given speeds: $v_1 = 0.5\\text{ m/s}$, $v_2 = 1\\text{ m/s}$, $v_3 = 2\\text{ m/s}$.\n1. Average speed:\n$$v_{\\text{avg}} = \\frac{0.5 + 1 + 2}{3} = \\frac{3.5}{3} = \\frac{7}{6}\\text{ m/s} \\implies (v_{\\text{avg}})^2 = \\frac{49}{36}$$\n2. Mean square speed:\n$$v_{\\text{rms}}^2 = \\frac{(0.5)^2 + 1^2 + 2^2}{3} = \\frac{0.25 + 1 + 4}{3} = \\frac{5.25}{3} = 1.75 = \\frac{7}{4}$$\n3. Ratio squared:\n$$\\left(\\frac{v_{\\text{rms}}}{v_{\\text{avg}}}\\right)^2 = \\frac{v_{\\text{rms}}^2}{v_{\\text{avg}}^2} = \\frac{7/4}{49/36} = \\frac{7}{4} \\times \\frac{36}{49} = \\frac{9}{7}$$"
  },
  {
    q_num: 68,
    question_text: "If the pressure of an ideal gas is increased to four times isothermally, its rms speed will become $n$ times, where $n$ is",
    options: ["4", "2", "$\\frac{1}{2}$", "1"],
    correct_index: 3,
    topic: "RMS Speed in Isothermal Process",
    difficulty: "easy",
    image_url: "",
    solution: "The root mean square speed of an ideal gas is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$$\nIn an isothermal process, the temperature $T$ remains constant. Since $v_{\\text{rms}}$ depends solely on temperature and molar mass, changing the pressure at constant temperature has no effect on the rms speed.\nTherefore, $v_{\\text{rms}}' = v_{\\text{rms}}$, which means $n = 1$."
  },
  {
    q_num: 69,
    question_text: "As temperature increases for a given sample of gas, the most probable speed",
    options: [
      "Increases",
      "Decreases",
      "Remains same",
      "Depends on atomicity of the gas"
    ],
    correct_index: 0,
    topic: "Most Probable Speed & Temperature",
    difficulty: "easy",
    image_url: "",
    solution: "The most probable speed is given by:\n$$v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}} \\propto \\sqrt{T}$$\nAs the temperature of the gas increases, its most probable speed increases proportionally to $\\sqrt{T}$."
  },
  {
    q_num: 70,
    question_text: "Two isotherms are drawn at temperatures $T_1$ and $T_2$ as shown. The ratio of mean speed at $T_1$ and $T_2$ is",
    options: ["1 : 4", "1 : 2", "2 : 1", "4 : 1"],
    correct_index: 2,
    topic: "Isotherms & Mean Speed",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q70.png",
    solution: "From the given indicator diagram, along a constant pressure line (isobaric line):\n- At temperature $T_2$, the volume is $V_0$.\n- At temperature $T_1$, the volume is $4V_0$.\n\nBy Charles's Law at constant pressure ($V \\propto T$):\n$$\\frac{T_1}{T_2} = \\frac{V_1}{V_2} = \\frac{4V_0}{V_0} = 4$$\nThe mean speed is $\\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\propto \\sqrt{T}$.\nTherefore:\n$$\\frac{\\bar{v}_1}{\\bar{v}_2} = \\sqrt{\\frac{T_1}{T_2}} = \\sqrt{4} = 2 = 2 : 1$$"
  }
];
