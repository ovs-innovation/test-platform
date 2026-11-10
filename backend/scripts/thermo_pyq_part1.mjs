// NEET Heat and Thermodynamics PYQ Part 1: Q1 to Q35
import fs from 'fs';

const jsonPath = fs.existsSync('backend/scripts/thermo_diagram_urls.json')
  ? 'backend/scripts/thermo_diagram_urls.json'
  : 'scripts/thermo_diagram_urls.json';
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const THERMO_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: "The temperature of a metallic sphere of radius $R$ is increased by a small amount $\\Delta T$. If the linear coefficient of thermal expansion of the metal is $\\alpha$, the approximate increase in the volume of the sphere is:",
    options: [
      "$6\\pi R^3 \\alpha \\Delta T$",
      "$2\\pi R^3 \\alpha \\Delta T$",
      "$3\\pi R^3 \\alpha \\Delta T$",
      "$4\\pi R^3 \\alpha \\Delta T$"
    ],
    correctIndex: 3,
    solution: "1. The volume of a sphere of radius $R$ is given by:\n$$V = \\frac{4}{3}\\pi R^3$$\n\n2. The coefficient of volume expansion $\\gamma$ is related to the coefficient of linear expansion $\\alpha$ by:\n$$\\gamma = 3\\alpha$$\n\n3. The change in volume for a small temperature increase $\\Delta T$ is:\n$$\\Delta V = \\gamma V \\Delta T = (3\\alpha)\\left(\\frac{4}{3}\\pi R^3\\right)\\Delta T = 4\\pi R^3 \\alpha \\Delta T$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: "In an adiabatic expansion, the temperature of one mole of an ideal monatomic gas ($\\gamma = 5/3$) decreases from $60\\text{ K}$ to $50\\text{ K}$. The work done by the gas in the process is: (Take the universal gas constant as $R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$166\\text{ J}$",
      "$41.5\\text{ J}$",
      "$83\\text{ J}$",
      "$124.5\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. Work done in an adiabatic process is given by:\n$$W = \\frac{nR(T_1 - T_2)}{\\gamma - 1}$$\n\n2. Given: $n = 1\\text{ mol}$, $T_1 = 60\\text{ K}$, $T_2 = 50\\text{ K}$, $\\gamma = 5/3$, and $R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$:\n$$\\gamma - 1 = \\frac{5}{3} - 1 = \\frac{2}{3}$$\n\n3. Substituting the values:\n$$W = \\frac{1 \\times 8.3 \\times (60 - 50)}{2/3} = \\frac{83}{2/3} = \\frac{83 \\times 3}{2} = 124.5\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 3,
    exam: 'RE-NEET 2026',
    question: "An ideal gas is made of polyatomic molecules. Each of the molecules has three translational, three rotational and $f$ number of vibrational modes. If the ratio of heat capacities $C_P/C_V$ of the gas is $8/7$, then the value of $f$ is:",
    options: [
      "$1$",
      "$4$",
      "$3$",
      "$2$"
    ],
    correctIndex: 1,
    solution: "1. Each translational degree of freedom contributes $\\frac{1}{2}RT$ to molar internal energy.\nEach rotational degree of freedom contributes $\\frac{1}{2}RT$.\nEach vibrational mode contributes $RT$ (due to kinetic and potential energy components):\n$$U = 3\\left(\\frac{1}{2}RT\\right) + 3\\left(\\frac{1}{2}RT\\right) + f(RT) = (3 + f)RT$$\n\n2. Therefore:\n$$C_V = \\frac{dU}{dT} = (3 + f)R$$\n$$C_P = C_V + R = (4 + f)R$$\n\n3. The ratio of specific heats is:\n$$\\gamma = \\frac{C_P}{C_V} = \\frac{4 + f}{3 + f} = \\frac{8}{7}$$\n$$7(4 + f) = 8(3 + f) \\implies 28 + 7f = 24 + 8f \\implies f = 4$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 4,
    exam: 'RE-NEET 2026',
    question: "The mean free path of molecules in an ideal gas $A$ is half that of another ideal gas $B$. The diameter of the spherical molecules of gas $A$ is twice the diameter of the molecules of $B$. If number densities of the gases $A$ and $B$ are $n_A$ and $n_B$, respectively, the correct option is:",
    options: [
      "$n_A = \\frac{1}{2}n_B$",
      "$n_A = n_B$",
      "$n_A = 2n_B$",
      "$n_A = \\frac{1}{4}n_B$"
    ],
    correctIndex: 0,
    solution: "1. The mean free path $\\lambda$ of molecules is given by:\n$$\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2} \\implies n = \\frac{1}{\\sqrt{2}\\pi \\lambda d^2}$$\n\n2. Given $\\lambda_A = \\frac{1}{2}\\lambda_B$ and $d_A = 2d_B$:\n$$\\frac{n_A}{n_B} = \\left(\\frac{\\lambda_B}{\\lambda_A}\\right)\\left(\\frac{d_B}{d_A}\\right)^2 = (2)\\left(\\frac{1}{2}\\right)^2 = 2 \\times \\frac{1}{4} = \\frac{1}{2}$$\n$$n_A = \\frac{1}{2}n_B$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 5,
    exam: 'RE-NEET 2026',
    question: `One mole of an ideal monatomic gas undergoes a cyclic process as shown in the figure. The total heat supplied to the gas is:\n\n![Diagram](${diagrams.thermo_q5_diagram})`,
    options: [
      "$800\\text{ J}$",
      "$400\\text{ J}$",
      "$500\\text{ J}$",
      "$600\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. For a complete cyclic process, the net change in internal energy is zero ($\\Delta U = 0$).\n\n2. By the First Law of Thermodynamics:\n$$Q_{\\text{net}} = W_{\\text{net}} = \\text{Area enclosed by the } P-V \\text{ loop}$$\n\n3. From the diagram, the cycle $a \\to b \\to c \\to d$ is a rectangle with:\n$$\\Delta P = 300 - 100 = 200\\text{ N/m}^2$$\n$$\\Delta V = 5 - 2 = 3\\text{ m}^3$$\n\n4. Therefore:\n$$Q_{\\text{net}} = 200 \\times 3 = 600\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 6,
    exam: 'NEET 2026',
    question: "A flask contains argon and chlorine in the ratio of $2 : 1$ by mass. The temperature of the mixture is $27^\\circ\\text{C}$. The ratio of root mean square speed of the molecules of the two gases $\\left(\\frac{v_{\\text{rms}}^{\\text{Ar}}}{v_{\\text{rms}}^{\\text{Cl}}}\\right)$ is: (Atomic mass of argon $= 40.0\\text{ u}$ and molecular mass of chlorine $= 70.0\\text{ u}$)",
    options: [
      "$\\frac{\\sqrt{7}}{2}$",
      "$\\frac{7}{4}$",
      "$\\frac{7}{2}$",
      "$\\frac{2}{\\sqrt{7}}$"
    ],
    correctIndex: 0,
    solution: "1. The root mean square speed of gas molecules at absolute temperature $T$ is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$$\n\n2. Since both gases are in the same flask at the same temperature $T = 27^\\circ\\text{C} = 300\\text{ K}$:\n$$\\frac{v_{\\text{rms}}^{\\text{Ar}}}{v_{\\text{rms}}^{\\text{Cl}}} = \\sqrt{\\frac{M_{\\text{Cl}}}{M_{\\text{Ar}}}} = \\sqrt{\\frac{70.0}{40.0}} = \\sqrt{\\frac{7}{4}} = \\frac{\\sqrt{7}}{2}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 7,
    exam: 'NEET 2026',
    question: "An electric heater supplies heat to a system at a rate of $100\\text{ W}$. If the system performs work at a rate of $75\\text{ J/s}$, then the rate at which internal energy increases will be:",
    options: [
      "$75\\text{ W}$",
      "$100\\text{ W}$",
      "$125\\text{ W}$",
      "$25\\text{ W}$"
    ],
    correctIndex: 3,
    solution: "1. According to the First Law of Thermodynamics:\n$$\\frac{dQ}{dt} = \\frac{dU}{dt} + \\frac{dW}{dt}$$\n\n2. Given: rate of heat supplied $\\frac{dQ}{dt} = 100\\text{ W}$, rate of work done $\\frac{dW}{dt} = 75\\text{ J/s} = 75\\text{ W}$:\n$$\\frac{dU}{dt} = \\frac{dQ}{dt} - \\frac{dW}{dt} = 100 - 75 = 25\\text{ W}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 8,
    exam: 'NEET 2025',
    question: `Three identical heat conducting rods are connected in series as shown in the figure. The rods on the sides have thermal conductivity $2K$ while that in the middle has thermal conductivity $K$. The left end of the combination is maintained at temperature $3T$ and the right end at $T$. The rods are thermally insulated from outside. In steady state, temperature at the left junction is $T_1$ and that at the right junction is $T_2$. The ratio $T_1/T_2$ is:\n\n![Diagram](${diagrams.thermo_q8_diagram})`,
    options: [
      "$\\frac{5}{3}$",
      "$\\frac{5}{4}$",
      "$\\frac{3}{2}$",
      "$\\frac{4}{3}$"
    ],
    correctIndex: 0,
    solution: "1. The thermal resistance of each rod of length $L$ and area $A$ is $R_{\\text{th}} = \\frac{L}{k A}$:\n$$R_1 = \\frac{L}{2KA} = \\frac{R}{2}, \\quad R_2 = \\frac{L}{KA} = R, \\quad R_3 = \\frac{L}{2KA} = \\frac{R}{2}$$\n\n2. Total thermal resistance in series:\n$$R_{\\text{total}} = \\frac{R}{2} + R + \\frac{R}{2} = 2R$$\n\n3. The rate of heat flow in steady state:\n$$H = \\frac{3T - T}{2R} = \\frac{2T}{2R} = \\frac{T}{R}$$\n\n4. For the first junction:\n$$3T - T_1 = H R_1 = \\left(\\frac{T}{R}\\right)\\left(\\frac{R}{2}\\right) = \\frac{T}{2} \\implies T_1 = 3T - \\frac{T}{2} = \\frac{5T}{2}$$\n\n5. For the second junction:\n$$T_2 - T = H R_3 = \\left(\\frac{T}{R}\\right)\\left(\\frac{R}{2}\\right) = \\frac{T}{2} \\implies T_2 = T + \\frac{T}{2} = \\frac{3T}{2}$$\n\n6. The ratio is:\n$$\\frac{T_1}{T_2} = \\frac{5T/2}{3T/2} = \\frac{5}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 9,
    exam: 'NEET 2025',
    question: "A container has two chambers of volumes $V_1 = 2\\text{ litres}$ and $V_2 = 3\\text{ litres}$ separated by a partition made of a thermal insulator. The chambers contain $n_1 = 5$ and $n_2 = 4$ moles of ideal gas at pressures $p_1 = 1\\text{ atm}$ and $p_2 = 2\\text{ atm}$, respectively. When the partition is removed, the mixture attains an equilibrium pressure of:",
    options: [
      "$1.4\\text{ atm}$",
      "$1.8\\text{ atm}$",
      "$1.3\\text{ atm}$",
      "$1.6\\text{ atm}$"
    ],
    correctIndex: 3,
    solution: "1. Since the container is insulated and rigid, no heat enters or leaves the system and no work is done on the surroundings:\n$$U_{\\text{final}} = U_1 + U_2$$\n\n2. For an ideal gas, internal energy is given by $U = \\frac{PV}{\\gamma - 1}$:\n$$\\frac{P(V_1 + V_2)}{\\gamma - 1} = \\frac{p_1 V_1}{\\gamma - 1} + \\frac{p_2 V_2}{\\gamma - 1}$$\n$$P(V_1 + V_2) = p_1 V_1 + p_2 V_2$$\n\n3. Substituting the given values:\n$$P(2 + 3) = (1 \\times 2) + (2 \\times 3)$$\n$$5P = 2 + 6 = 8 \\implies P = \\frac{8}{5} = 1.6\\text{ atm}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 10,
    exam: 'NEET 2025',
    question: "An oxygen cylinder of volume $30\\text{ litre}$ has $18.20\\text{ moles}$ of oxygen. After some oxygen is withdrawn from the cylinder, its gauge pressure drops to $11\\text{ atmospheric pressures}$ at temperature $27^\\circ\\text{C}$. The mass of the oxygen withdrawn from the cylinder is nearly equal to: [Given, $R = \\frac{100}{12}\\text{ J mol}^{-1}\\text{ K}^{-1}$, and molecular mass of $\\text{O}_2 = 32$, $1\\text{ atm pressure} = 1.01 \\times 10^5\\text{ N/m}^2$]",
    options: [
      "$0.116\\text{ kg}$",
      "$0.156\\text{ kg}$",
      "$0.125\\text{ kg}$",
      "$0.144\\text{ kg}$"
    ],
    correctIndex: 0,
    solution: "1. Absolute pressure in the cylinder after withdrawal:\n$$P = P_{\\text{gauge}} + P_{\\text{atm}} = 11 + 1 = 12\\text{ atm} = 12 \\times 1.01 \\times 10^5\\text{ N/m}^2$$\n\n2. Final number of moles of oxygen remaining:\n$$n_f = \\frac{PV}{RT} = \\frac{(12 \\times 1.01 \\times 10^5) \\times (30 \\times 10^{-3})}{\\left(\\frac{100}{12}\\right) \\times 300} = \\frac{36360}{2500} \\approx 14.544\\text{ moles}$$\n\n3. Number of moles withdrawn:\n$$\\Delta n = n_i - n_f = 18.20 - 14.544 = 3.656\\text{ moles}$$\n\n4. Mass of oxygen withdrawn:\n$$\\Delta m = \\Delta n \\times M = 3.656 \\times 32\\text{ g} = 116.99\\text{ g} \\approx 0.116\\text{ kg}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 11,
    exam: 'NEET 2025',
    question: "Two gases $A$ and $B$ are filled at the same pressure in separate cylinders with movable pistons of radius $r_A$ and $r_B$, respectively. On supplying an equal amount of heat to both the systems reversibly under constant pressure, the pistons of gas $A$ and $B$ are displaced by $16\\text{ cm}$ and $9\\text{ cm}$, respectively. If the change in their internal energy is the same, then the ratio $\\frac{r_A}{r_B}$ is equal to:",
    options: [
      "$\\frac{2}{\\sqrt{3}}$",
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{4}{3}$",
      "$\\frac{3}{4}$"
    ],
    correctIndex: 3,
    solution: "1. From First Law of Thermodynamics: $\\Delta Q = \\Delta U + W$.\nSince $\\Delta Q_A = \\Delta Q_B$ and $\\Delta U_A = \\Delta U_B$, the work done by both gases must be equal:\n$$W_A = W_B$$\n\n2. Work done at constant pressure $P$:\n$$W = P \\Delta V = P(\\pi r^2 \\Delta x)$$\n\n3. Equating $W_A$ and $W_B$ at the same pressure:\n$$P(\\pi r_A^2 \\Delta x_A) = P(\\pi r_B^2 \\Delta x_B)$$\n$$r_A^2 \\times 16 = r_B^2 \\times 9$$\n$$\\frac{r_A^2}{r_B^2} = \\frac{9}{16} \\implies \\frac{r_A}{r_B} = \\frac{3}{4}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 12,
    exam: 'NEET 2024 (Re-Examination)',
    question: "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: Houses made of concrete roofs overlaid with foam keep the room hotter during summer.\nReason R: The layer of foam insulation prohibits heat transfer, as it contains air pockets.\nIn the light of the above statements, choose the correct answer from the options given below.",
    options: [
      "A is true but R is false.",
      "A is false but R is true.",
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is NOT the correct explanation of A."
    ],
    correctIndex: 1,
    solution: "1. Foam contains trapped air pockets, making it an excellent thermal insulator that drastically reduces heat transfer into the house. Therefore, concrete roofs overlaid with foam keep rooms cooler during summer, not hotter. Hence, Assertion A is false.\n\n2. The layer of foam insulation prevents heat transfer because stagnant air trapped inside its pores has very low thermal conductivity. Hence, Reason R is true.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 13,
    exam: 'NEET 2024 (Re-Examination)',
    question: "The equilibrium state of a thermodynamic system is described by:\nA. Pressure\nB. Total heat\nC. Temperature\nD. Volume\nE. Work done\nChoose the most appropriate answer from the options given below.",
    options: [
      "A, B and E only",
      "B, C and D only",
      "A, B and C only",
      "A, C and D only"
    ],
    correctIndex: 3,
    solution: "1. The thermodynamic equilibrium state of a system is uniquely described by macroscopic state variables (state functions), which include Pressure ($P$), Temperature ($T$), and Volume ($V$).\n\n2. Heat ($Q$) and Work ($W$) are path functions, not state variables, and describe the process of energy transfer rather than the state itself.\n\nTherefore, only A, C, and D describe the equilibrium state.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 14,
    exam: 'NEET 2024 (Re-Examination)',
    question: "According to the law of equipartition of energy, the number of vibrational modes of a polyatomic gas of constant $\\gamma$ is ($C_P$ and $C_V$ are the specific heat capacities of the gas at constant pressure and constant volume, respectively):",
    options: [
      "$\\frac{4 + 3\\gamma}{\\gamma - 1}$",
      "$\\frac{3 + 4\\gamma}{\\gamma - 1}$",
      "$\\frac{4 - 3\\gamma}{\\gamma - 1}$",
      "$\\frac{3 - 4\\gamma}{\\gamma - 1}$"
    ],
    correctIndex: 2,
    solution: "1. A non-linear polyatomic molecule has 3 translational and 3 rotational degrees of freedom, each contributing $\\frac{1}{2}R$ to $C_V$. Each vibrational mode contributes $R$ (kinetic + potential):\n$$C_V = 3\\left(\\frac{R}{2}\\right) + 3\\left(\\frac{R}{2}\\right) + f R = (3 + f)R$$\n\n2. Molar heat capacity at constant pressure:\n$$C_P = C_V + R = (4 + f)R$$\n\n3. The ratio of specific heats is:\n$$\\gamma = \\frac{C_P}{C_V} = \\frac{4 + f}{3 + f}$$\n$$\\gamma(3 + f) = 4 + f$$\n$$3\\gamma + f\\gamma = 4 + f \\implies f(\\gamma - 1) = 4 - 3\\gamma$$\n$$f = \\frac{4 - 3\\gamma}{\\gamma - 1}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 15,
    exam: 'NEET 2024',
    question: `A thermodynamic system is taken through the cycle $abcda$. The work done by the gas along the path $bc$ is:\n\n![Diagram](${diagrams.thermo_q15_diagram})`,
    options: [
      "Zero",
      "$30\\text{ J}$",
      "$-90\\text{ J}$",
      "$-60\\text{ J}$"
    ],
    correctIndex: 0,
    solution: "1. Along the path $bc$, the volume of the system remains constant at $V = 400\\text{ cm}^3$ (isochoric process).\n\n2. Work done in a thermodynamic process is:\n$$W = \\int P dV$$\n\n3. Since $dV = 0$ along $bc$, the work done by the gas along path $bc$ is zero.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 16,
    exam: 'NEET 2024',
    question: `The following graph represents the $T-V$ curves of an ideal gas (where $T$ is the temperature and $V$ the volume) at three pressures $P_1$, $P_2$ and $P_3$ compared with those of Charles's law represented as dotted lines.\n\n![Diagram](${diagrams.thermo_q16_diagram})\n\nThen the correct relation is :`,
    options: [
      "$P_3 > P_2 > P_1$",
      "$P_1 > P_3 > P_2$",
      "$P_2 > P_1 > P_3$",
      "$P_1 > P_2 > P_3$"
    ],
    correctIndex: 3,
    solution: "1. For an ideal gas obeying $PV = nRT$:\n$$T = \\left(\\frac{P}{nR}\\right)V$$\n\n2. In a $T$ vs $V$ graph, the slope is given by:\n$$\\text{Slope} = \\frac{T}{V} = \\frac{P}{nR}$$\n\n3. Since slope is directly proportional to pressure $P$ and from the graph the slopes follow:\n$$\\text{Slope}_1 > \\text{Slope}_2 > \\text{Slope}_3$$\n\n4. Therefore:\n$$P_1 > P_2 > P_3$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 17,
    exam: 'NEET 2023 Manipur',
    question: `For the given cycle, the work done during isobaric process is:\n\n![Diagram](${diagrams.thermo_q17_diagram})`,
    options: [
      "$200\\text{ J}$",
      "Zero",
      "$400\\text{ J}$",
      "$600\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. An isobaric process is one where pressure remains constant. In the given cycle $A \\to B \\to C \\to A$, the process $A \\to B$ occurs at constant pressure:\n$$P = 3 \\times 10^2\\text{ N/m}^2$$\n\n2. The volume changes from $V_A = 1\\text{ m}^3$ to $V_B = 3\\text{ m}^3$:\n$$\\Delta V = 3 - 1 = 2\\text{ m}^3$$\n\n3. The work done during the isobaric process $A \\to B$ is:\n$$W = P \\Delta V = (3 \\times 10^2\\text{ N/m}^2) \\times (2\\text{ m}^3) = 600\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 18,
    exam: 'NEET 2023 Manipur',
    question: "A container of volume $200\\text{ cm}^3$ contains $0.2\\text{ mole}$ of hydrogen gas and $0.3\\text{ mole}$ of argon gas. The pressure of the system at temperature $200\\text{ K}$ ($R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$) will be :-",
    options: [
      "$6.15 \\times 10^5\\text{ Pa}$",
      "$6.15 \\times 10^4\\text{ Pa}$",
      "$4.15 \\times 10^5\\text{ Pa}$",
      "$4.15 \\times 10^6\\text{ Pa}$"
    ],
    correctIndex: 3,
    solution: "1. Total number of moles in the container:\n$$n = n_{\\text{H}_2} + n_{\\text{Ar}} = 0.2 + 0.3 = 0.5\\text{ mol}$$\n\n2. Given: $V = 200\\text{ cm}^3 = 200 \\times 10^{-6}\\text{ m}^3 = 2 \\times 10^{-4}\\text{ m}^3$ and $T = 200\\text{ K}$:\n$$P = \\frac{nRT}{V} = \\frac{0.5 \\times 8.3 \\times 200}{2 \\times 10^{-4}} = \\frac{830}{2 \\times 10^{-4}} = 4.15 \\times 10^6\\text{ Pa}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 19,
    exam: 'NEET 2023',
    question: "The temperature of a gas is $-50^\\circ\\text{C}$. To what temperature the gas should be heated so that the rms speed is increased by $3$ times?",
    options: [
      "$3295^\\circ\\text{C}$",
      "$3097\\text{ K}$",
      "$223\\text{ K}$",
      "$669^\\circ\\text{C}$"
    ],
    correctIndex: 0,
    solution: "1. Initial absolute temperature:\n$$T_1 = -50 + 273 = 223\\text{ K}$$\n\n2. The rms speed is increased by 3 times, meaning:\n$$v_2 = v_1 + 3v_1 = 4v_1$$\n\n3. Since $v_{\\text{rms}} \\propto \\sqrt{T}$:\n$$\\frac{T_2}{T_1} = \\left(\\frac{v_2}{v_1}\\right)^2 = (4)^2 = 16$$\n$$T_2 = 16 \\times 223\\text{ K} = 3568\\text{ K}$$\n\n4. Converting to Celsius:\n$$t_2 = 3568 - 273 = 3295^\\circ\\text{C}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 20,
    exam: 'NEET 2022 Phase 2',
    question: "An ideal gas follows a process described by the equation $PV^2 = C$ from the initial $(P_1, V_1, T_1)$ to final $(P_2, V_2, T_2)$ thermodynamic states, where $C$ is a constant. Then:",
    options: [
      "If $P_1 > P_2$ then $V_1 > V_2$",
      "If $P_1 > P_2$ then $T_1 < T_2$",
      "If $V_2 > V_1$ then $T_2 > T_1$",
      "If $V_2 > V_1$ then $T_2 < T_1$"
    ],
    correctIndex: 3,
    solution: "1. Given polytropic process $PV^2 = C$.\nUsing ideal gas law $P = \\frac{nRT}{V}$:\n$$\\left(\\frac{nRT}{V}\\right)V^2 = C \\implies TV = \\text{constant}$$\n\n2. Therefore:\n$$T_1 V_1 = T_2 V_2 \\implies \\frac{T_2}{T_1} = \\frac{V_1}{V_2}$$\n\n3. If $V_2 > V_1$, then $\\frac{V_1}{V_2} < 1$, which implies $T_2 < T_1$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 21,
    exam: 'NEET 2022 Phase 2',
    question: "Two rods one made of copper and other made of steel of same length and same cross sectional area are joined together. The thermal conductivity of copper and steel are $385\\text{ J s}^{-1}\\text{ K}^{-1}\\text{ m}^{-1}$ and $50\\text{ J s}^{-1}\\text{ K}^{-1}\\text{ m}^{-1}$ respectively. The free ends of copper and steel are held at $100^\\circ\\text{C}$ and $0^\\circ\\text{C}$ respectively. The temperature at the junction is, nearly :",
    options: [
      "$88.5^\\circ\\text{C}$",
      "$12^\\circ\\text{C}$",
      "$50^\\circ\\text{C}$",
      "$73^\\circ\\text{C}$"
    ],
    correctIndex: 0,
    solution: "1. In steady state, rate of heat flow through the copper rod equals that through the steel rod:\n$$H = \\frac{K_1 A (100 - T)}{L} = \\frac{K_2 A (T - 0)}{L}$$\n\n2. Cancelling $A/L$:\n$$K_1(100 - T) = K_2 T$$\n$$385(100 - T) = 50 T$$\n$$38500 - 385 T = 50 T$$\n$$435 T = 38500 \\implies T = \\frac{38500}{435} \\approx 88.5^\\circ\\text{C}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 22,
    exam: 'NEET 2022 Phase 2',
    question: "Three vessels of equal capacity have gases at the same temperature and pressure. The first vessel contains helium (monoatomic), the second contains fluorine (diatomic) and the third contains sulfur hexafluoride (polyatomic). The correct statement, among the following is :",
    options: [
      "The root mean square speed of sulfur hexafluoride is the largest",
      "All vessels contain unequal number of respective molecules",
      "The root mean square speed of molecules is same in all three cases",
      "The root mean square speed of helium is the largest"
    ],
    correctIndex: 3,
    solution: "1. The root mean square speed is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$$\n\n2. At a given temperature $T$, $v_{\\text{rms}} \\propto \\frac{1}{\\sqrt{M}}$.\n\n3. Molar masses:\n- Helium ($\\text{He}$): $4\\text{ g/mol}$\n- Fluorine ($\\text{F}_2$): $38\\text{ g/mol}$\n- Sulfur hexafluoride ($\\text{SF}_6$): $146\\text{ g/mol}$\n\n4. Since helium has the lowest molar mass, its root mean square speed is the largest.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 23,
    exam: 'NEET 2022 Phase 1',
    question: `An ideal gas undergoes four different processes from the same initial state as shown in the figure below. Those processes are adiabatic, isothermal, isobaric and isochoric. The curve which represents the adiabatic process among 1, 2, 3 and 4 is:\n\n![Diagram](${diagrams.thermo_q23_diagram})`,
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correctIndex: 1,
    solution: "1. Identifying each curve:\n- Curve 1 is vertical ($V = \\text{constant}$): Isochoric process.\n- Curve 4 is horizontal ($P = \\text{constant}$): Isobaric process.\n\n2. For expansion curves 2 and 3:\n- Slope of adiabatic curve is $\\gamma$ times steeper than isothermal curve:\n$$\\left(\\frac{dP}{dV}\\right)_{\\text{adiabatic}} = -\\gamma \\frac{P}{V} < -\\frac{P}{V} = \\left(\\frac{dP}{dV}\\right)_{\\text{isothermal}}$$\n\n3. Curve 2 has a steeper downward slope than curve 3, so curve 2 represents the adiabatic process and curve 3 represents the isothermal process.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 24,
    exam: 'NEET 2022 Phase 1',
    question: "The volume occupied by the molecules contained in $4.5\\text{ kg}$ water at STP, if the intermolecular forces vanish away is:",
    options: [
      "$5.6 \\times 10^6\\text{ m}^3$",
      "$5.6 \\times 10^3\\text{ m}^3$",
      "$5.6 \\times 10^{-3}\\text{ m}^3$",
      "$5.6\\text{ m}^3$"
    ],
    correctIndex: 3,
    solution: "1. When intermolecular forces vanish, water behaves as an ideal gas.\n\n2. Number of moles of water in $4.5\\text{ kg} = 4500\\text{ g}$:\n$$n = \\frac{\\text{Mass}}{\\text{Molar mass}} = \\frac{4500\\text{ g}}{18\\text{ g/mol}} = 250\\text{ mol}$$\n\n3. At STP, 1 mole of an ideal gas occupies $22.4\\text{ L} = 22.4 \\times 10^{-3}\\text{ m}^3$:\n$$V = 250 \\times 22.4 \\times 10^{-3}\\text{ m}^3 = 5.6\\text{ m}^3$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 25,
    exam: 'NEET 2021',
    question: "Match Column - I and Column - II and choose the correct match from the given choices.\n\n| Column - I | Column - II |\n| :--- | :--- |\n| (A) Root mean square speed of gas molecules | (P) $\\frac{1}{3} n m v^2$ |\n| (B) Pressure exerted by ideal gas | (Q) $\\sqrt{\\frac{3RT}{M}}$ |\n| (C) Average kinetic energy of a molecule | (R) $\\frac{5}{2} R T$ |\n| (D) Total internal energy of 1 mole of a diatomic gas | (S) $\\frac{3}{2} k_B T$ |",
    options: [
      "(A) - (R), (B) - (Q), (C) - (P), (D) - (S)",
      "(A) - (R), (B) - (P), (C) - (S), (D) - (Q)",
      "(A) - (Q), (B) - (R), (C) - (S), (D) - (P)",
      "(A) - (Q), (B) - (P), (C) - (S), (D) - (R)"
    ],
    correctIndex: 3,
    solution: "1. (A) Root mean square speed of gas molecules: $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\to (\\text{Q})$\n2. (B) Pressure exerted by ideal gas: $P = \\frac{1}{3} n m v^2 \\to (\\text{P})$\n3. (C) Average kinetic energy of a molecule: $E = \\frac{3}{2} k_B T \\to (\\text{S})$\n4. (D) Total internal energy of 1 mole of diatomic gas: $U = \\frac{f}{2}RT = \\frac{5}{2}RT \\to (\\text{R})$\n\nThus, the matching is: (A) - (Q), (B) - (P), (C) - (S), (D) - (R).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 26,
    exam: 'NEET 2020 Phase 2',
    question: "The mean free path $l$ for a gas molecule depends upon diameter, $d$ of the molecule as:",
    options: [
      "$l \\propto \\frac{1}{d}$",
      "$l \\propto \\frac{1}{d^2}$",
      "$l \\propto d$",
      "$l \\propto d^2$"
    ],
    correctIndex: 1,
    solution: "1. The mean free path $l$ of a gas molecule is given by:\n$$l = \\frac{1}{\\sqrt{2}\\pi n d^2}$$\nwhere $n$ is the number density and $d$ is the molecular diameter.\n\n2. Therefore, the mean free path is inversely proportional to the square of molecular diameter:\n$$l \\propto \\frac{1}{d^2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 27,
    exam: 'NEET 2020 Phase 2',
    question: "An ideal gas equation can be written as $P = \\frac{\\rho R T}{M_0}$ where $\\rho$ and $M_0$ are respectively,",
    options: [
      "number density, mass of the gas",
      "mass density, mass of the gas",
      "number density, molar mass",
      "mass density, molar mass"
    ],
    correctIndex: 3,
    solution: "1. From ideal gas equation:\n$$PV = nRT = \\left(\\frac{m}{M_0}\\right)RT$$\nwhere $m$ is mass of gas and $M_0$ is molar mass.\n\n2. Rearranging:\n$$P = \\left(\\frac{m}{V}\\right)\\frac{RT}{M_0} = \\frac{\\rho RT}{M_0}$$\nwhere $\\rho = \\frac{m}{V}$ is the mass density of the gas.\n\nTherefore, $\\rho$ and $M_0$ represent mass density and molar mass, respectively.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 28,
    exam: 'NEET 2020 Phase 2',
    question: `The $P-V$ diagram for an ideal gas in a piston cylinder assembly undergoing a thermodynamic process is shown in the figure. The process is:\n\n![Diagram](${diagrams.thermo_q28_diagram})`,
    options: [
      "isothermal",
      "adiabatic",
      "isochoric",
      "isobaric"
    ],
    correctIndex: 3,
    solution: "1. In the given $P-V$ diagram, the process curve from Initial state to Final state is a horizontal line parallel to the volume axis.\n\n2. A horizontal line in a $P-V$ diagram indicates that pressure remains constant while volume changes.\n\n3. A constant pressure process is called an isobaric process.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 29,
    exam: 'NEET 2020 Phase 2',
    question: "Three stars $A, B, C$ have surface temperatures $T_A, T_B, T_C$ respectively. Star $A$ appears bluish, star $B$ appears reddish and star $C$ yellowish. Hence,",
    options: [
      "$T_A > T_C > T_B$",
      "$T_A > T_B > T_C$",
      "$T_B > T_C > T_A$",
      "$T_C > T_B > T_A$"
    ],
    correctIndex: 0,
    solution: "1. According to Wien's Displacement Law:\n$$\\lambda_{\\max} T = b \\implies T \\propto \\frac{1}{\\lambda_{\\max}}$$\n\n2. The wavelengths of visible spectrum follow:\n$$\\lambda_{\\text{blue}} < \\lambda_{\\text{yellow}} < \\lambda_{\\text{red}}$$\n\n3. Since temperature is inversely proportional to peak wavelength:\n$$T_A > T_C > T_B$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 30,
    exam: 'NEET 2020 Phase 1',
    question: "The average thermal energy for a mono-atomic gas is : ($k_B$ is Boltzmann constant and $T$ absolute temperature)",
    options: [
      "$\\frac{3}{2} k_B T$",
      "$\\frac{5}{2} k_B T$",
      "$\\frac{7}{2} k_B T$",
      "$\\frac{1}{2} k_B T$"
    ],
    correctIndex: 0,
    solution: "1. A monatomic gas molecule has only 3 translational degrees of freedom ($f = 3$) and no rotational or vibrational modes.\n\n2. By the Law of Equipartition of Energy, each degree of freedom contributes $\\frac{1}{2} k_B T$ to the average kinetic energy of a molecule.\n\n3. Total average thermal energy per molecule is:\n$$E = 3 \\times \\left(\\frac{1}{2} k_B T\\right) = \\frac{3}{2} k_B T$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 31,
    exam: 'NEET 2020 Phase 1',
    question: "The mean free path for a gas, with molecular diameter $d$ and number density $n$ can be expressed as :",
    options: [
      "$\\frac{1}{\\sqrt{2} n \\pi d^2}$",
      "$\\frac{1}{\\sqrt{2} n^2 \\pi d^2}$",
      "$\\frac{1}{\\sqrt{2} n^2 \\pi^2 d^2}$",
      "$\\frac{1}{\\sqrt{2} n \\pi d}$"
    ],
    correctIndex: 0,
    solution: "1. The mean free path $\\lambda$ represents the average distance a molecule travels between two successive collisions.\n\n2. Taking into account the relative velocity of gas molecules, the mean free path is given by:\n$$\\lambda = \\frac{1}{\\sqrt{2} n \\pi d^2}$$\nwhere $n$ is number density and $d$ is diameter of each molecule.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 32,
    exam: 'NEET 2020 Phase 1',
    question: "A cylinder contains hydrogen gas at pressure $249\\text{ kPa}$ and temperature $27^\\circ\\text{C}$. Its density is : ($R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$)",
    options: [
      "$0.2\\text{ kg/m}^3$",
      "$0.1\\text{ kg/m}^3$",
      "$0.02\\text{ kg/m}^3$",
      "$0.5\\text{ kg/m}^3$"
    ],
    correctIndex: 0,
    solution: "1. From ideal gas equation, density $\\rho$ is given by:\n$$\\rho = \\frac{P M}{R T}$$\n\n2. Given: $P = 249\\text{ kPa} = 249 \\times 10^3\\text{ N/m}^2$, $T = 27 + 273 = 300\\text{ K}$, molar mass of $\\text{H}_2$ is $M = 2 \\times 10^{-3}\\text{ kg/mol}$, and $R = 8.3\\text{ J mol}^{-1}\\text{ K}^{-1}$:\n$$\\rho = \\frac{249 \\times 10^3 \\times 2 \\times 10^{-3}}{8.3 \\times 300} = \\frac{498}{2490} = 0.2\\text{ kg/m}^3$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 33,
    exam: 'NEET 2020 Phase 1',
    question: "The quantities of heat required to raise the temperature of two solid copper spheres of radii $r_1$ and $r_2$ ($r_1 = 1.5r_2$) through $1\\text{ K}$ are in the ratio :",
    options: [
      "$\\frac{9}{4}$",
      "$\\frac{3}{2}$",
      "$\\frac{5}{3}$",
      "$\\frac{27}{8}$"
    ],
    correctIndex: 3,
    solution: "1. Heat required to raise temperature by $\\Delta T = 1\\text{ K}$ is:\n$$Q = m c \\Delta T = \\left(\\frac{4}{3}\\pi r^3 \\rho\\right) c \\Delta T \\propto r^3$$\n\n2. Ratio of heat required for the two spheres:\n$$\\frac{Q_1}{Q_2} = \\left(\\frac{r_1}{r_2}\\right)^3 = (1.5)^3 = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 34,
    exam: 'NEET 2020 Phase 1',
    question: "Two cylinders $A$ and $B$ of equal capacity are connected to each other via a stop cock. $A$ contains an ideal gas at standard temperature and pressure. $B$ is completely evacuated. The entire systems is thermally insulated. The stop cock is suddenly opened. The Process is :",
    options: [
      "adiabatic",
      "isochoric",
      "isobaric",
      "isothermal"
    ],
    correctIndex: 0,
    solution: "1. The entire system is thermally insulated from surroundings, so no heat is exchanged with surroundings ($\\Delta Q = 0$).\n\n2. When the stopcock is suddenly opened into the evacuated cylinder, free expansion occurs rapidly without external work against surroundings ($W = 0$).\n\n3. Since $\\Delta Q = 0$, the process is adiabatic.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 35,
    exam: 'NEET 2019 (Odisha)',
    question: "A deep rectangular pond of surface area $A$, containing water (density = $\\rho$, specific heat capacity = $s$), is located in a region where the outside air temperature is at a steady value of $-26^\\circ\\text{C}$. The thickness of the frozen ice layer in this pond, at a certain instant is $x$. Taking the thermal conductivity of ice as $K$, and its specific latent heat of fusion as $L$, the rate of increase of the thickness of ice layer, at this instant, would be given by:",
    options: [
      "$26K/\\rho x(L + 4s)$",
      "$26K/\\rho x(L - 4s)$",
      "$26K/(\\rho x^2 L)$",
      "$26K/(\\rho x L)$"
    ],
    correctIndex: 3,
    solution: "1. The bottom of the ice layer in contact with water is at $0^\\circ\\text{C}$ while the top surface is at $-26^\\circ\\text{C}$. Temperature difference across ice layer is $\\Delta T = 0 - (-26) = 26^\\circ\\text{C}$.\n\n2. Rate of heat conduction through ice layer of thickness $x$ and area $A$:\n$$\\frac{dQ}{dt} = \\frac{K A \\Delta T}{x} = \\frac{26 K A}{x}$$\n\n3. This heat loss results in freezing of an additional mass $dm = \\rho A dx$ of water into ice:\n$$dQ = L dm = L(\\rho A dx) \\implies \\frac{dQ}{dt} = \\rho A L \\frac{dx}{dt}$$\n\n4. Equating both expressions:\n$$\\frac{26 K A}{x} = \\rho A L \\frac{dx}{dt} \\implies \\frac{dx}{dt} = \\frac{26 K}{\\rho x L}$$\n\nHence, the correct option is (D)."
  }
];