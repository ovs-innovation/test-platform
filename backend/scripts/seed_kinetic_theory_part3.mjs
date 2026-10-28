import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const KINETIC_PART3 = [
  // Section A Continued: Q71 to Q89
  {
    q_num: 71,
    question_text: "An ideal gas kept in a closed container is heated. The collision frequency of the gas molecules will",
    options: [
      "Increase",
      "Decrease",
      "Remain the same",
      "Depend on the volume of the container"
    ],
    correct_index: 0,
    topic: "Collision Frequency in Closed Vessel",
    difficulty: "easy",
    image_url: "",
    solution: "In a closed container, the volume $V$ and the total number of gas molecules $N$ are constant, which means the number density $n = N/V$ is constant.\nThe mean free path is $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2} = \\text{constant}$.\nThe collision frequency is given by:\n$$f_{\\text{coll}} = \\frac{\\bar{v}}{\\lambda} = \\sqrt{2}\\pi n d^2 \\bar{v}$$\nSince the average speed $\\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\propto \\sqrt{T}$, heating the gas increases $\\bar{v}$. Consequently, the collision frequency of the gas molecules increases."
  },
  {
    q_num: 72,
    question_text: "At what temperature will the oxygen molecule have the same root mean square speed as hydrogen molecule have at 100 K?",
    options: ["400 K", "800 K", "1000 K", "1600 K"],
    correct_index: 3,
    topic: "RMS Speed Comparison",
    difficulty: "easy",
    image_url: "",
    solution: "The root mean square speed is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$$\nFor oxygen and hydrogen to have the same rms speed:\n$$\\frac{T_{\\text{O}_2}}{M_{\\text{O}_2}} = \\frac{T_{\\text{H}_2}}{M_{\\text{H}_2}}$$\nGiven $M_{\\text{O}_2} = 32\\text{ g/mol}$, $M_{\\text{H}_2} = 2\\text{ g/mol}$, and $T_{\\text{H}_2} = 100\\text{ K}$:\n$$\\frac{T_{\\text{O}_2}}{32} = \\frac{100}{2} = 50 \\implies T_{\\text{O}_2} = 50 \\times 32 = 1600\\text{ K}$$"
  },
  {
    q_num: 73,
    question_text: "If $v_{\\text{rms}}, \\bar{v}$ and $v_m$ represent rms speed, average speed and most probable speed of the molecules of a gas at a given temperature respectively, then",
    options: [
      "$v_m > \\bar{v} > v_{\\text{rms}}$",
      "$v_{\\text{rms}} > v_m > \\bar{v}$",
      "$v_{\\text{rms}} > \\bar{v} > v_m$",
      "$v_{\\text{rms}} = \\bar{v} = v_m$"
    ],
    correct_index: 2,
    topic: "Comparison of Molecular Speeds",
    difficulty: "easy",
    image_url: "",
    solution: "The three characteristic speeds at a given temperature $T$ are:\n1. Root mean square speed: $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\approx 1.732 \\sqrt{\\frac{RT}{M}}$\n2. Average speed: $\\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\approx 1.596 \\sqrt{\\frac{RT}{M}}$\n3. Most probable speed: $v_m = \\sqrt{\\frac{2RT}{M}} \\approx 1.414 \\sqrt{\\frac{RT}{M}}$\n\nComparing their numerical factors:\n$$1.732 > 1.596 > 1.414 \\implies v_{\\text{rms}} > \\bar{v} > v_m$$"
  },
  {
    q_num: 74,
    question_text: "Average velocity of oxygen molecules at $27^\\circ\\text{C}$ in a container at rest is",
    options: ["$980\\text{ m/s}$", "Zero", "$370\\text{ m/s}$", "$863\\text{ m/s}$"],
    correct_index: 1,
    topic: "Average Velocity vs Speed",
    difficulty: "easy",
    image_url: "",
    solution: "Velocity is a vector quantity ($\\vec{v}$). In a container at rest, gas molecules move randomly in all directions with equal probability. For every molecule moving with velocity $\\vec{v}$, there is on average another molecule moving with an equal and opposite velocity $-\\vec{v}$.\nTherefore, the vector average velocity of the molecules is identically zero:\n$$\\langle \\vec{v} \\rangle = \\vec{0}$$\n(Note: Average speed is scalar and non-zero, but average velocity is strictly zero)."
  },
  {
    q_num: 75,
    question_text: "At temperature $127^\\circ\\text{C}$ the rms speed of the molecules of certain gas is found to be $600\\text{ m/s}$. The gas is ($R = 8.4\\text{ J/k mol}$)",
    options: ["$\\text{He}$", "$\\text{H}_2$", "$\\text{Cl}_2$", "$\\text{N}_2$"],
    correct_index: 3,
    topic: "Gas Identification via RMS Speed",
    difficulty: "medium",
    image_url: "",
    solution: "Given:\n- Temperature $T = 127^\\circ\\text{C} = 127 + 273 = 400\\text{ K}$\n- RMS speed $v_{\\text{rms}} = 600\\text{ m/s}$\n- Gas constant $R = 8.4\\text{ J/(mol}\\cdot\\text{K)}$\n\nUsing the rms speed formula:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\implies M = \\frac{3RT}{v_{\\text{rms}}^2}$$\n$$M = \\frac{3 \\times 8.4 \\times 400}{(600)^2} = \\frac{10080}{360000} = 0.028\\text{ kg/mol} = 28\\text{ g/mol}$$\nA molar mass of $28\\text{ g/mol}$ corresponds to Nitrogen gas ($\\text{N}_2$)."
  },
  {
    q_num: 76,
    question_text: "The ratio of $V_{\\text{av}} : V_{\\text{mp}} : V_{\\text{rms}}$ is [symbols have their usual meaning]",
    options: [
      "$\\sqrt{\\frac{8}{\\pi}} : \\sqrt{2} : \\sqrt{3}$",
      "$\\sqrt{2} : \\sqrt{\\frac{8}{\\pi}} : \\sqrt{3}$",
      "$\\sqrt{3} : \\sqrt{\\frac{8}{\\pi}} : \\sqrt{2}$",
      "$\\sqrt{3} : \\sqrt{2} : \\sqrt{\\frac{8}{\\pi}}$"
    ],
    correct_index: 0,
    topic: "Ratio of Molecular Speeds",
    difficulty: "easy",
    image_url: "",
    solution: "The formulas for the three speeds are:\n- $V_{\\text{av}} = \\sqrt{\\frac{8RT}{\\pi M}} = \\sqrt{\\frac{8}{\\pi}} \\sqrt{\\frac{RT}{M}}$\n- $V_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}} = \\sqrt{2} \\sqrt{\\frac{RT}{M}}$\n- $V_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{3} \\sqrt{\\frac{RT}{M}}$\n\nCancelling the common factor $\\sqrt{\\frac{RT}{M}}$:\n$$V_{\\text{av}} : V_{\\text{mp}} : V_{\\text{rms}} = \\sqrt{\\frac{8}{\\pi}} : \\sqrt{2} : \\sqrt{3}$$"
  },
  {
    q_num: 77,
    question_text: "The root mean square velocity of the molecules in a sample of helium is $\\left(\\frac{5}{7}\\right)\\text{th}$ that of the molecules in a sample of hydrogen. If the temperature of the hydrogen sample is $0^\\circ\\text{C}$, that of helium samples is about",
    options: ["$0^\\circ\\text{C}$", "0 K", "$273^\\circ\\text{C}$", "$100^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Comparison of RMS Speeds",
    difficulty: "medium",
    image_url: "",
    solution: "Using the rms velocity formula $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$:\n$$\\frac{v_{\\text{He}}}{v_{\\text{H}_2}} = \\sqrt{\\frac{T_{\\text{He}}}{M_{\\text{He}}} \\cdot \\frac{M_{\\text{H}_2}}{T_{\\text{H}_2}}}$$\nGiven:\n- $M_{\\text{He}} = 4\\text{ g/mol}$\n- $M_{\\text{H}_2} = 2\\text{ g/mol}$\n- $T_{\\text{H}_2} = 0^\\circ\\text{C} = 273\\text{ K}$\n- $\\frac{v_{\\text{He}}}{v_{\\text{H}_2}} = \\frac{5}{7}$\n\n$$\\frac{5}{7} = \\sqrt{\\frac{T_{\\text{He}}}{4} \\times \\frac{2}{273}} = \\sqrt{\\frac{T_{\\text{He}}}{546}}$$\nSquaring both sides:\n$$\\frac{25}{49} = \\frac{T_{\\text{He}}}{546} \\implies T_{\\text{He}} = \\frac{25 \\times 546}{49} = \\frac{13650}{49} \\approx 278.6\\text{ K}$$\nIn Celsius:\n$$t = 278.6 - 273 = 5.6^\\circ\\text{C} \\approx 0^\\circ\\text{C}$$"
  },
  {
    q_num: 78,
    question_text: "The root mean square speed of oxygen molecules $(\\text{O}_2)$ at a certain absolute temperature is $v$. If the temperature is doubled and oxygen gas dissociates into oxygen, the rms speed would be",
    options: ["$v$", "$\\sqrt{2}v$", "$2v$", "$2\\sqrt{2}v$"],
    correct_index: 2,
    topic: "RMS Speed with Dissociation",
    difficulty: "medium",
    image_url: "",
    solution: "Initially: oxygen is in molecular form $\\text{O}_2$ with molar mass $M_1 = 32$ at absolute temperature $T_1 = T$:\n$$v_1 = \\sqrt{\\frac{3RT}{32}} = v$$\nFinally: temperature is doubled ($T_2 = 2T$) and oxygen molecules dissociate into atomic oxygen atoms with molar mass $M_2 = 16$:\n$$v_2 = \\sqrt{\\frac{3R(2T)}{16}} = \\sqrt{\\frac{6RT}{16}} = \\sqrt{4 \\times \\frac{3RT}{32}} = 2 \\sqrt{\\frac{3RT}{32}} = 2v$$"
  },
  {
    q_num: 79,
    question_text: "Five molecules have speed 4, 3, 5, 7 and 9 m/s. What is the rms speed of these molecules (in m/s)?",
    options: ["5", "5.2", "6", "36"],
    correct_index: 2,
    topic: "Calculation of RMS Speed",
    difficulty: "easy",
    image_url: "",
    solution: "The root mean square speed is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{\\sum v_i^2}{N}}$$\n$$\\sum v_i^2 = 4^2 + 3^2 + 5^2 + 7^2 + 9^2 = 16 + 9 + 25 + 49 + 81 = 180$$\n$$v_{\\text{rms}} = \\sqrt{\\frac{180}{5}} = \\sqrt{36} = 6\\text{ m/s}$$"
  },
  {
    q_num: 80,
    question_text: "The temperature of an ideal gas is increased from 120 K to 480 K. If at 120 K the root mean square velocity of the gas molecules is $v$, then at 480 K it becomes",
    options: ["$4v$", "$2v$", "$\\frac{v}{2}$", "$\\frac{v}{4}$"],
    correct_index: 1,
    topic: "RMS Speed Dependence on Temperature",
    difficulty: "easy",
    image_url: "",
    solution: "The rms velocity is directly proportional to the square root of the absolute temperature:\n$$v_{\\text{rms}} \\propto \\sqrt{T}$$\n$$\\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}} = \\sqrt{\\frac{480}{120}} = \\sqrt{4} = 2 \\implies v_2 = 2v$$"
  },
  {
    q_num: 81,
    question_text: "In thermal equilibrium, the average velocity of gas molecules is ($T$: Absolute temperature)",
    options: [
      "Proportional to $\\sqrt{T}$",
      "Proportional to $T^2$",
      "Proportional to $T^3$",
      "Zero"
    ],
    correct_index: 3,
    topic: "Average Velocity in Thermal Equilibrium",
    difficulty: "easy",
    image_url: "",
    solution: "In thermal equilibrium, molecular velocities are distributed symmetrically and isotropically in all directions in 3D space. For every molecule moving with velocity $\\vec{v}$, there is an equal likelihood of a molecule moving with velocity $-\\vec{v}$.\nTherefore, the vector average velocity is identically zero:\n$$\\langle \\vec{v} \\rangle = 0$$"
  },
  {
    q_num: 82,
    question_text: "At what temperature the rms velocity of $\\text{O}_2$ molecule will be equal to rms velocity of $\\text{N}_2$ molecule at $0^\\circ\\text{C}$?",
    options: ["$20^\\circ\\text{C}$", "$93^\\circ\\text{C}$", "$39^\\circ\\text{C}$", "$53^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Equal RMS Speeds of Different Gases",
    difficulty: "medium",
    image_url: "",
    solution: "Equating the rms speeds of $\\text{O}_2$ and $\\text{N}_2$:\n$$v_{\\text{rms}}(\\text{O}_2) = v_{\\text{rms}}(\\text{N}_2) \\implies \\frac{T_{\\text{O}_2}}{M_{\\text{O}_2}} = \\frac{T_{\\text{N}_2}}{M_{\\text{N}_2}}$$\nGiven $M_{\\text{O}_2} = 32\\text{ g/mol}$, $M_{\\text{N}_2} = 28\\text{ g/mol}$, and $T_{\\text{N}_2} = 0^\\circ\\text{C} = 273\\text{ K}$:\n$$T_{\\text{O}_2} = 273 \\times \\frac{32}{28} = 273 \\times \\frac{8}{7} = 39 \\times 8 = 312\\text{ K}$$\nConverting to Celsius:\n$$t = 312 - 273 = 39^\\circ\\text{C}$$"
  },
  {
    q_num: 83,
    question_text: "A container containing hydrogen gas at $27^\\circ\\text{C}$ is at rest. Average velocity of gas molecules is",
    options: ["$1934\\text{ m/s}$", "$967\\text{ m/s}$", "$483\\text{ m/s}$", "Zero"],
    correct_index: 3,
    topic: "Average Velocity in Rest Container",
    difficulty: "easy",
    image_url: "",
    solution: "Because the container is at rest, the center of mass of the gas does not translate. The random thermal motion of molecules is completely isotropic, so the vector average velocity of the molecules is zero."
  },
  {
    q_num: 84,
    question_text: "RMS speed of a monatomic gas is increased to two times of its initial value. If the process is done adiabatically, then the ratio of final volume to initial volume will be",
    options: ["1 : 4", "1 : 8", "$1 : 2^{3/2}$", "$1 : 4^{2/3}$"],
    correct_index: 1,
    topic: "Adiabatic Process & RMS Speed",
    difficulty: "medium",
    image_url: "",
    solution: "1. The rms speed is proportional to $\\sqrt{T}$:\n$$\\frac{v_2}{v_1} = 2 \\implies \\sqrt{\\frac{T_2}{T_1}} = 2 \\implies \\frac{T_2}{T_1} = 4$$\n2. For an adiabatic process of an ideal gas:\n$$T V^{\\gamma - 1} = \\text{constant} \\implies T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1}$$\nFor a monatomic gas, $\\gamma = \\frac{5}{3} \\implies \\gamma - 1 = \\frac{2}{3}$.\n$$\\left(\\frac{V_2}{V_1}\\right)^{2/3} = \\frac{T_1}{T_2} = \\frac{1}{4}$$\nTaking the power $3/2$ on both sides:\n$$\\frac{V_2}{V_1} = \\left(\\frac{1}{4}\\right)^{3/2} = \\left(\\frac{1}{2^2}\\right)^{3/2} = \\frac{1}{2^3} = \\frac{1}{8} = 1 : 8$$"
  },
  {
    q_num: 85,
    question_text: "The minimum heat energy required to cause complete dissociation of $n$ moles of $\\text{H}_2$ gas at constant temperature $T$ is",
    options: ["$nRT$", "$\\frac{5}{2}nRT$", "$\\frac{6}{2}nRT$", "$\\frac{nRT}{2}$"],
    correct_index: 3,
    topic: "Dissociation Energy & Internal Energy",
    difficulty: "hard",
    image_url: "",
    solution: "1. Initially: $n$ moles of diatomic $\\text{H}_2$ gas at temperature $T$ have degrees of freedom $f = 5$:\n$$U_1 = n \\left(\\frac{5}{2}RT\\right) = \\frac{5}{2}nRT$$\n2. Finally: Upon complete dissociation into atomic hydrogen ($\\text{H}_2 \\rightarrow 2\\text{H}$), $2n$ moles of monoatomic gas ($f = 3$) are formed at the same temperature $T$:\n$$U_2 = (2n) \\left(\\frac{3}{2}RT\\right) = 3nRT = \\frac{6}{2}nRT$$\n3. The minimum heat energy required to supply this difference in internal energy is:\n$$\\Delta U = U_2 - U_1 = \\frac{6}{2}nRT - \\frac{5}{2}nRT = \\frac{nRT}{2}$$"
  },
  {
    q_num: 86,
    question_text: "A closed cylindrical vessel contains 10 moles of an ideal diatomic gas at temperature of 300 K. On supplying heat, temperature remains same, but 5 moles get dissociated into atoms. The heat supplied is",
    options: ["$250R$", "$500R$", "$750R$", "$1000R$"],
    correct_index: 2,
    topic: "Heat of Dissociation at Constant Temperature",
    difficulty: "medium",
    image_url: "",
    solution: "In a closed rigid vessel, volume is constant ($W = 0$), so by the First Law of Thermodynamics, heat supplied is $Q = \\Delta U = U_f - U_i$.\n1. Initial state (10 moles of diatomic gas, $f = 5$, at $T = 300\\text{ K}$):\n$$U_i = 10 \\times \\left(\\frac{5}{2}R \\times 300\\right) = 7500R$$\n2. Final state: 5 moles remain diatomic ($f = 5$), and 5 moles dissociate into $5 \\times 2 = 10$ moles of monoatomic gas ($f = 3$):\n$$U_f = 5 \\times \\left(\\frac{5}{2}R \\times 300\\right) + 10 \\times \\left(\\frac{3}{2}R \\times 300\\right) = 3750R + 4500R = 8250R$$\n3. Heat supplied:\n$$Q = U_f - U_i = 8250R - 7500R = 750R$$"
  },
  {
    q_num: 87,
    question_text: "A vessel contains diatomic gas. If half of gas dissociated into individual atom, then find new value of degree of freedom by ignoring the vibrational mode and any further dissociation",
    options: ["$\\frac{9}{7}$", "$\\frac{11}{7}$", "$\\frac{11}{3}$", "$\\frac{13}{3}$"],
    correct_index: 2,
    topic: "Degrees of Freedom of Partially Dissociated Gas",
    difficulty: "medium",
    image_url: "",
    solution: "Let the initial amount of diatomic gas be $n_0 = 1\\text{ mol}$.\n- Undissociated diatomic gas: $n_1 = 0.5\\text{ mol}$, with $f_1 = 5$.\n- Dissociated atoms: $0.5\\text{ mol}$ of diatomic gas produces $0.5 \\times 2 = 1.0\\text{ mol}$ of monoatomic atoms, with $f_2 = 3$.\nTotal moles in the mixture:\n$$n_{\\text{total}} = n_1 + n_2 = 0.5 + 1.0 = 1.5\\text{ mol}$$\nThe average degree of freedom is:\n$$f_{\\text{avg}} = \\frac{n_1 f_1 + n_2 f_2}{n_1 + n_2} = \\frac{(0.5 \\times 5) + (1.0 \\times 3)}{0.5 + 1.0} = \\frac{2.5 + 3.0}{1.5} = \\frac{5.5}{1.5} = \\frac{11}{3}$$"
  },
  {
    q_num: 88,
    question_text: "A diatomic gas is enclosed in a chamber of volume $10\\text{ cc}$ at a pressure of 1 atm. The internal energy of the gas is approximately",
    options: ["1.5 J", "2.5 J", "3.5 J", "4.5 J"],
    correct_index: 1,
    topic: "Internal Energy from Pressure and Volume",
    difficulty: "easy",
    image_url: "",
    solution: "For an ideal diatomic gas, the internal energy is:\n$$U = \\frac{5}{2} n R T = \\frac{5}{2} P V$$\nGiven:\n- Pressure $P = 1\\text{ atm} = 1.013 \\times 10^5\\text{ N/m}^2$\n- Volume $V = 10\\text{ cc} = 10 \\times 10^{-6}\\text{ m}^3 = 10^{-5}\\text{ m}^3$\n\nSubstituting the values:\n$$U = \\frac{5}{2} \\times (1.013 \\times 10^5) \\times 10^{-5} \\approx 2.5 \\times 1.013 \\approx 2.5\\text{ J}$$"
  },
  {
    q_num: 89,
    question_text: "Nitrogen gas is filled in an isolated container. If $\\alpha$ fraction of moles dissociates without exchange of any energy, then the fractional change in its temperature is",
    options: [
      "$\\frac{-\\alpha}{5 + \\alpha}$",
      "$\\frac{\\alpha}{3 + \\alpha}$",
      "$\\frac{-3\\alpha}{2 + \\alpha}$",
      "$\\frac{5\\alpha}{2 + 3\\alpha}$"
    ],
    correct_index: 0,
    topic: "Dissociation in Isolated System",
    difficulty: "hard",
    image_url: "",
    solution: "Because the container is isolated and rigid, $Q = 0$ and $W = 0$, so by the First Law of Thermodynamics, $\\Delta U = 0$ (total internal energy is conserved: $U_i = U_f$).\n1. Initial state: $n_0$ moles of diatomic $\\text{N}_2$ ($f = 5$) at temperature $T_0$:\n$$U_i = n_0 \\left(\\frac{5}{2}R T_0\\right)$$\n2. Final state: fraction $\\alpha$ dissociates ($\\text{N}_2 \\rightarrow 2\\text{N}$):\n- Remaining diatomic moles: $n_0(1 - \\alpha)$ with $f = 5$\n- Formed monoatomic moles: $2\\alpha n_0$ with $f = 3$\nAt new temperature $T$:\n$$U_f = \\left[n_0(1 - \\alpha)\\frac{5}{2}R + (2\\alpha n_0)\\frac{3}{2}R\\right] T = n_0 R T \\left[\\frac{5 - 5\\alpha + 6\\alpha}{2}\\right] = n_0 R T \\left(\\frac{5 + \\alpha}{2}\\right)$$\n3. Equating $U_i = U_f$:\n$$\\frac{5}{2} n_0 R T_0 = \\frac{5 + \\alpha}{2} n_0 R T \\implies T = \\left(\\frac{5}{5 + \\alpha}\\right) T_0$$\n4. The fractional change in temperature is:\n$$\\frac{\\Delta T}{T_0} = \\frac{T - T_0}{T_0} = \\frac{5}{5 + \\alpha} - 1 = \\frac{5 - (5 + \\alpha)}{5 + \\alpha} = \\frac{-\\alpha}{5 + \\alpha}$$"
  },

  // Section B: Assertion - Reason Type Questions (AR 1 to AR 6)
  {
    q_num: 90,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** A gas consisting of neutral particles like neutrons behaves much better as an ideal gas as compared to helium gas at the same pressure and temperature.\n**Reason (R):** Internal potential energy of gas of neutrons is zero.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Ideal Gas Assumptions & Neutral Particles",
    difficulty: "medium",
    image_url: "",
    solution: "1. An ideal gas is defined as one whose constituent particles have negligible volume and zero intermolecular attractive/repulsive forces (so internal potential energy is zero).\n2. Neutrons carry zero electric charge and possess no electron shells, so they do not experience long-range electromagnetic van der Waals interactions. In contrast, helium atoms have electron clouds that produce weak van der Waals dispersion forces. Consequently, a neutron gas behaves much more closely to an ideal gas. Thus, **Assertion is TRUE**.\n3. The intermolecular potential energy of a gas of neutral neutrons is zero because electrostatic attractions/repulsions are absent. Thus, **Reason is TRUE** and is the exact correct explanation of the assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 91,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Air molecules are unaffected by gravity and don't settle on ground.\n**Reason (R):** Air molecules move with high speed and there is continuous collision of air molecules.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Barometric Distribution & Gravity",
    difficulty: "medium",
    image_url: "",
    solution: "1. Air molecules are massive particles subject to Earth's gravitational pull ($F = mg$). Gravity causes the atmosphere to be bound to Earth, resulting in higher atmospheric pressure and density at sea level which decays exponentially with altitude. Claiming air molecules are \"unaffected by gravity\" is scientifically incorrect. Thus, **Assertion is FALSE**.\n2. In competitive exam conventions, when the Assertion statement is false, Option (4) is marked.\n\nCorrect Option: **(4)**"
  },
  {
    q_num: 92,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** A gas cylinder placed in a moving train has increased internal energy as compared to its state of rest.\n**Reason (R):** Its temperature remains constant when the train stops.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Internal Energy vs Bulk Kinetic Energy",
    difficulty: "medium",
    image_url: "",
    solution: "1. Internal energy of a gas is the sum of microscopic kinetic and potential energies of molecules measured in the center-of-mass frame of the gas. The macroscopic kinetic energy of the train ($\\frac{1}{2} M_{\\text{bulk}} V^2$) is bulk motion energy, not internal energy. The temperature and microscopic random velocities of the molecules inside the cylinder are unaffected by the steady motion of the train. Thus, **Assertion is FALSE**.\n2. When the Assertion statement is false, Option (4) is marked.\n\nCorrect Option: **(4)**"
  },
  {
    q_num: 93,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The most probable speeds and root mean square and of the molecules in a gas are equal.\n**Reason (R):** Maxwell speed distribution curve is symmetrical.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Maxwell Speed Distribution",
    difficulty: "easy",
    image_url: "",
    solution: "1. In an ideal gas, $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$ and $v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}$. Since $\\sqrt{3} \\approx 1.732 \\ne \\sqrt{2} \\approx 1.414$, the most probable and rms speeds are not equal ($v_{\\text{rms}} > v_{\\text{mp}}$). Thus, **Assertion is FALSE**.\n2. The Maxwell-Boltzmann speed distribution curve is asymmetric (positively skewed with an extended tail toward higher speeds). It is not symmetrical. Thus, **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 94,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** $C_p/C_v$ ratio of monoatomic gas is lesser than that of diatomic gas.\n**Reason (R):** Diatomic gas has lesser degrees of freedom than Mono-atomic gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Heat Capacity Ratio of Gases",
    difficulty: "easy",
    image_url: "",
    solution: "1. The ratio of specific heats is given by $\\gamma = 1 + \\frac{2}{f}$:\n- For a monoatomic gas ($f = 3$), $\\gamma = 1 + \\frac{2}{3} = \\frac{5}{3} \\approx 1.67$.\n- For a diatomic gas ($f = 5$), $\\gamma = 1 + \\frac{2}{5} = \\frac{7}{5} = 1.40$.\nThus, $\\gamma$ of a monoatomic gas is GREATER than that of a diatomic gas. Hence, **Assertion is FALSE**.\n2. Diatomic gas has 5 degrees of freedom, which is MORE than a monoatomic gas (3 degrees of freedom). Hence, **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 95,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Degrees of freedom for mono-atomic gas is 3.\n**Reason (R):** $C_p/C_v = \\text{Constant}$ for an ideal gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Degrees of Freedom of Monatomic Gas",
    difficulty: "easy",
    image_url: "",
    solution: "1. A monoatomic gas molecule is considered a point mass possessing only 3 independent translational degrees of freedom along $x, y, z$ axes ($f = 3$). Thus, **Assertion is TRUE**.\n2. For any given ideal gas, the ratio of specific heats $\\gamma = C_p/C_v = 1 + \\frac{2}{f}$ is a constant. Thus, **Reason is TRUE**.\n3. However, the constancy of $\\gamma$ does not explain why a monoatomic gas has 3 degrees of freedom (which arises from the spatial dimensionality of point particles). Therefore, Reason is not the correct explanation of Assertion.\n\nCorrect Option: **(2)**"
  },

  // Section B Continued: AR 13 to AR 18
  {
    q_num: 96,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Average kinetic energy per molecule of any ideal monoatomic gas is $\\frac{3}{2}k_B T$.\n**Reason (R):** Average kinetic energy depends only on temperature and is independent of the nature of the gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Kinetic Interpretation of Temperature",
    difficulty: "easy",
    image_url: "",
    solution: "1. By the equipartition theorem, each translational degree of freedom contributes $\\frac{1}{2}k_B T$ to the average kinetic energy. For a monoatomic gas with $f = 3$, the average kinetic energy per molecule is $3 \\times \\frac{1}{2}k_B T = \\frac{3}{2}k_B T$. Thus, **Assertion is TRUE**.\n2. The average translational kinetic energy of ideal gas molecules depends solely on the absolute temperature $T$ and is completely independent of the molar mass, chemical composition, or nature of the gas. Thus, **Reason is TRUE** and is the correct explanation of Assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 97,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** $PV = \\text{constant}$ for ideal gas at constant temperature.\n**Reason (R):** RMS velocity of the molecules is inversely proportional to square root of molar mass of gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Boyle's Law & RMS Velocity",
    difficulty: "medium",
    image_url: "",
    solution: "1. By Boyle's Law, for a fixed mass of an ideal gas at constant temperature, $PV = nRT = \\text{constant}$. Thus, **Assertion is TRUE**.\n2. The root mean square velocity is given by $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\propto \\frac{1}{\\sqrt{M}}$, which is inversely proportional to the square root of molar mass. Thus, **Reason is TRUE**.\n3. However, Reason does not explain Boyle's law ($PV = \\text{constant}$ at constant temperature). Therefore, Reason is not the correct explanation of Assertion.\n\nCorrect Option: **(2)**"
  },
  {
    q_num: 98,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** For a gaseous mixture under isothermal conditions, the lighter molecule has the greater average speed.\n**Reason (R):** Temperature is a measure of the average kinetic energy of particles of a substance.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Molecular Speeds in Gas Mixture",
    difficulty: "medium",
    image_url: "",
    solution: "1. The average speed of a gas molecule is $\\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\propto \\frac{1}{\\sqrt{M}}$. In a mixture at the same temperature (isothermal), lighter molecules with lower molar mass $M$ have a greater average speed. Thus, **Assertion is TRUE**.\n2. Temperature is a direct macroscopic measure of the average translational kinetic energy of molecules ($\\frac{1}{2}m v^2 = \\frac{3}{2}k_B T$). Because all molecules in the mixture have the same average kinetic energy, the lighter molecules (smaller $m$) must have greater speeds to possess the same kinetic energy. Thus, **Reason is TRUE** and correctly explains Assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 99,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** If the temperature of gas filled in a closed container becomes twice, the mean free path of the gas becomes twice.\n**Reason (R):** Mean free path of gas is directly proportional to temperature at constant volume.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Mean Free Path in Closed Vessel",
    difficulty: "medium",
    image_url: "",
    solution: "1. The mean free path is given by $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$, where $n = \\frac{N}{V}$ is the number density. In a closed container of fixed volume, neither the volume $V$ nor the total number of molecules $N$ changes. Thus, the number density $n$ remains constant, and the mean free path remains unchanged regardless of temperature. Thus, **Assertion is FALSE**.\n2. At constant volume, number density is constant, so mean free path is independent of temperature, NOT directly proportional to it. Thus, **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 100,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** $\\frac{C_p}{C_v} = \\frac{5}{3}$ for monoatomic gas.\n**Reason (R):** Monoatomic gas has 3 degrees of freedom.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Specific Heat Ratio of Monatomic Gas",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a monoatomic gas, there are 3 translational degrees of freedom ($f = 3$). Thus, **Reason is TRUE**.\n2. The ratio of specific heats is given by:\n$$\\gamma = \\frac{C_p}{C_v} = 1 + \\frac{2}{f} = 1 + \\frac{2}{3} = \\frac{5}{3}$$\nThus, **Assertion is TRUE** and Reason is the correct explanation of Assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 101,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Diatomic gas shows two additional degrees of freedom at very high temperature.\n**Reason (R):** Increase in temperature decreases the number of molecules of gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Vibrational Degrees of Freedom",
    difficulty: "medium",
    image_url: "",
    solution: "1. At ordinary temperatures, a diatomic molecule has 5 degrees of freedom (3 translational + 2 rotational). At very high temperatures, the interatomic vibrational mode is excited, contributing 2 additional degrees of freedom (1 for vibrational kinetic energy and 1 for vibrational potential energy), making $f = 7$. Thus, **Assertion is TRUE**.\n2. An increase in temperature does not decrease the number of molecules of gas in a closed vessel. Thus, **Reason is FALSE**.\n\nCorrect Option: **(3)**"
  }
];
