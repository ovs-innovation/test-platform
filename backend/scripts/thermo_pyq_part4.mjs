// NEET Heat and Thermodynamics PYQ Part 4: Q106 to Q140
import fs from 'fs';

const jsonPath = fs.existsSync('backend/scripts/thermo_diagram_urls.json')
  ? 'backend/scripts/thermo_diagram_urls.json'
  : 'scripts/thermo_diagram_urls.json';
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const THERMO_PYQ_PART4 = [
  {
    qNum: 106,
    exam: 'AIPMT 2000',
    question: "Gravitational force is required for",
    options: [
      "stirring of liquid",
      "convection",
      "conduction",
      "radiation."
    ],
    correctIndex: 1,
    solution: "1. Natural convection occurs due to differences in fluid density caused by temperature gradients. Under gravity, the warmer, less dense fluid experiences an upward buoyant force, while cooler, denser fluid sinks.\n\n2. In the absence of gravity (zero gravity), buoyant forces cannot develop, and natural convection cannot take place.\n\n3. Conduction and radiation do not require a gravitational field.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 107,
    exam: 'AIPMT 2000',
    question: "To find out degree of freedom, the expression is",
    options: [
      "$f = \\frac{2}{\\gamma - 1}$",
      "$f = \\frac{\\gamma + 1}{2}$",
      "$f = \\frac{2}{\\gamma + 1}$",
      "$f = \\frac{1}{\\gamma + 1}$"
    ],
    correctIndex: 0,
    solution: "1. The ratio of specific heats $\\gamma$ for a gas with $f$ degrees of freedom is:\n$$\\gamma = 1 + \\frac{2}{f}$$\n\n2. Subtracting 1 from both sides:\n$$\\gamma - 1 = \\frac{2}{f}$$\n\n3. Solving for $f$:\n$$f = \\frac{2}{\\gamma - 1}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 108,
    exam: 'AIPMT 2000',
    question: "The gases carbon-monoxide (CO) and nitrogen at the same temperature have kinetic energies $E_1$ and $E_2$ respectively. Then",
    options: [
      "$E_1 = E_2$",
      "$E_1 > E_2$",
      "$E_1 < E_2$",
      "$E_1$ and $E_2$ cannot be compared"
    ],
    correctIndex: 0,
    solution: "1. Both carbon monoxide ($\\text{CO}$) and nitrogen ($\\text{N}_2$) are diatomic gases.\n\n2. According to kinetic theory of gases, the average kinetic energy of gas molecules depends solely on the absolute temperature $T$ and the degrees of freedom ($f = 5$ for rigid diatomic molecules):\n$$E = \\frac{5}{2}k_B T$$\n\n3. Since both gases are at the same temperature, their average kinetic energies are identical:\n$$E_1 = E_2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 109,
    exam: 'AIPMT 1999',
    question: "If 1 g of steam is mixed with 1 g of ice, then the resultant temperature of the mixture is",
    options: [
      "$270^\\circ\\text{C}$",
      "$230^\\circ\\text{C}$",
      "$100^\\circ\\text{C}$",
      "$50^\\circ\\text{C}$"
    ],
    correctIndex: 2,
    solution: "1. Heat required to melt $1\\text{ g}$ of ice at $0^\\circ\\text{C}$ and raise its temperature to water at $100^\\circ\\text{C}$:\n$$Q_{\\text{req}} = m L_f + m c \\Delta T = (1 \\times 80) + (1 \\times 1 \\times 100) = 80 + 100 = 180\\text{ cal}$$\n\n2. Heat released when $1\\text{ g}$ of steam at $100^\\circ\\text{C}$ completely condenses into water at $100^\\circ\\text{C}$:\n$$Q_{\\text{rel}} = m L_v = 1 \\times 540 = 540\\text{ cal}$$\n\n3. Since $Q_{\\text{rel}} > Q_{\\text{req}}$, only a fraction of steam condenses:\n$$m_{\\text{condensed}} = \\frac{180}{540} = \\frac{1}{3}\\text{ g}$$\n\n4. Thus, the system reaches a dynamic phase equilibrium of water and uncondensed steam at $100^\\circ\\text{C}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 110,
    exam: 'AIPMT 1999',
    question: "The coefficients of linear expansions of brass and steel are $\\alpha_1$ and $\\alpha_2$ respectively. When we take a brass rod of length $l_1$ and a steel rod of length $l_2$ at $0^\\circ\\text{C}$, then the difference in their lengths ($l_2 - l_1$) will remain the same at all temperatures if",
    options: [
      "$\\alpha_1 l_1 = \\alpha_2 l_2$",
      "$\\alpha_1 l_2 = \\alpha_2 l_1$",
      "$\\alpha_1^2 l_2 = \\alpha_2^2 l_1$",
      "$\\alpha_1 l_2^2 = \\alpha_2 l_1^2$"
    ],
    correctIndex: 0,
    solution: "1. The difference in lengths $(l_2 - l_1)$ remains constant at all temperatures if:\n$$\\Delta l_2 - \\Delta l_1 = 0 \\implies \\Delta l_1 = \\Delta l_2$$\n\n2. Expressing changes in length in terms of linear expansion:\n$$l_1 \\alpha_1 \\Delta T = l_2 \\alpha_2 \\Delta T$$\n$$\\alpha_1 l_1 = \\alpha_2 l_2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 111,
    exam: 'AIPMT 1999',
    question: "An ideal gas at $27^\\circ\\text{C}$ is compressed adiabatically to $\\frac{8}{27}$ of its original volume. The rise in temperature is ($\\gamma = \\frac{5}{3}$)",
    options: [
      "$475^\\circ\\text{C}$",
      "$402^\\circ\\text{C}$",
      "$275^\\circ\\text{C}$",
      "$375^\\circ\\text{C}$"
    ],
    correctIndex: 3,
    solution: "1. In an adiabatic compression:\n$$T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1}$$\n\n2. Given: $T_1 = 27 + 273 = 300\\text{ K}$, $\\frac{V_2}{V_1} = \\frac{8}{27}$, and $\\gamma = 5/3$:\n$$\\gamma - 1 = \\frac{5}{3} - 1 = \\frac{2}{3}$$\n$$T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{\\gamma - 1} = 300 \\times \\left(\\frac{27}{8}\\right)^{2/3}$$\n\n3. Since $\\frac{27}{8} = \\left(\\frac{3}{2}\\right)^3$:\n$$T_2 = 300 \\times \\left[\\left(\\frac{3}{2}\\right)^3\\right]^{2/3} = 300 \\times \\left(\\frac{3}{2}\\right)^2 = 300 \\times \\frac{9}{4} = 675\\text{ K}$$\n\n4. Final temperature in Celsius is $675 - 273 = 402^\\circ\\text{C}$.\nThe rise in temperature is:\n$$\\Delta T = T_2 - T_1 = 675\\text{ K} - 300\\text{ K} = 375\\text{ K} = 375^\\circ\\text{C}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 112,
    exam: 'AIPMT 1999',
    question: "The degrees of freedom of a molecule of a triatomic gas are",
    options: [
      "2",
      "4",
      "6",
      "8"
    ],
    correctIndex: 2,
    solution: "1. A non-linear triatomic molecule (such as $\\text{H}_2\\text{O}$ or $\\text{O}_3$) has:\n- 3 translational degrees of freedom (along $x, y, z$ axes)\n- 3 rotational degrees of freedom (about 3 mutually perpendicular axes)\n\n2. Total degrees of freedom:\n$$f = 3 + 3 = 6$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 113,
    exam: 'AIPMT 1998',
    question: "If the ratio of specific heat of a gas at constant pressure to that at constant volume is $\\gamma$, the change in internal energy of a mass of gas, when the volume changes from $V$ to $2V$ at constant pressure $P$ is",
    options: [
      "$\\frac{R}{(\\gamma - 1)}$",
      "$PV$",
      "$\\frac{PV}{(\\gamma - 1)}$",
      "$\\frac{\\gamma PV}{(\\gamma - 1)}$"
    ],
    correctIndex: 2,
    solution: "1. The change in internal energy of an ideal gas is always given by:\n$$\\Delta U = n C_v \\Delta T$$\n\n2. The molar heat capacity at constant volume in terms of $\\gamma$ is:\n$$C_v = \\frac{R}{\\gamma - 1}$$\n\n3. Therefore:\n$$\\Delta U = n \\left(\\frac{R}{\\gamma - 1}\\right) \\Delta T = \\frac{nR\\Delta T}{\\gamma - 1}$$\n\n4. For an isobaric process, $nR\\Delta T = P\\Delta V = P(2V - V) = PV$:\n$$\\Delta U = \\frac{PV}{\\gamma - 1}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 114,
    exam: 'AIPMT 1998',
    question: "We consider a thermodynamic system. If $\\Delta U$ represents the increase in its internal energy and $W$ the work done by the system, which of the following statements is true?",
    options: [
      "$\\Delta U = -W$ in an adiabatic process",
      "$\\Delta U = W$ in an isothermal process",
      "$\\Delta U = -W$ in an isothermal process",
      "$\\Delta U = W$ in an adiabatic process"
    ],
    correctIndex: 0,
    solution: "1. From the First Law of Thermodynamics:\n$$Q = \\Delta U + W$$\n\n2. In an adiabatic process, no heat enters or leaves the system ($Q = 0$):\n$$0 = \\Delta U + W \\implies \\Delta U = -W$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 115,
    exam: 'AIPMT 1998',
    question: "The radiant energy from the sun, incident normally at the surface of earth is $20\\text{ kcal/m}^2\\text{ min}$. What would have been the radiant energy, incident normally on the earth, if the sun had a temperature, twice of the present one?",
    options: [
      "$160\\text{ kcal/m}^2\\text{ min}$",
      "$40\\text{ kcal/m}^2\\text{ min}$",
      "$320\\text{ kcal/m}^2\\text{ min}$",
      "$80\\text{ kcal/m}^2\\text{ min}$"
    ],
    correctIndex: 2,
    solution: "1. According to Stefan-Boltzmann law, the radiant energy emitted by a black body is directly proportional to the fourth power of its absolute temperature:\n$$E \\propto T^4$$\n\n2. If the temperature of the sun is doubled ($T' = 2T$):\n$$E' = (2)^4 E = 16 E$$\n\n3. Substituting $E = 20\\text{ kcal/m}^2\\text{ min}$:\n$$E' = 16 \\times 20 = 320\\text{ kcal/m}^2\\text{ min}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 116,
    exam: 'AIPMT 1997',
    question: "A black body is at a temperature of 500 K. It emits energy at a rate which is proportional to",
    options: [
      "$(500)^3$",
      "$(500)^4$",
      "$500$",
      "$(500)^2$"
    ],
    correctIndex: 1,
    solution: "1. According to Stefan-Boltzmann law, the rate of emission of energy per unit surface area of a black body is:\n$$E = \\sigma T^4$$\n\n2. For $T = 500\\text{ K}$, the rate of energy emission is proportional to:\n$$E \\propto (500)^4$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 117,
    exam: 'AIPMT 1997',
    question: "A sample of gas expands from volume $V_1$ to $V_2$. The amount of work done by the gas is greatest, when the expansion is",
    options: [
      "adiabatic",
      "equal in all cases",
      "isothermal",
      "isobaric"
    ],
    correctIndex: 3,
    solution: "1. Work done by an expanding gas from volume $V_1$ to $V_2$ is equal to the area under the process curve in the $P-V$ diagram:\n$$W = \\int_{V_1}^{V_2} P\\,dV$$\n\n2. For expansion between identical volume limits from an initial pressure $P_1$:\n- Isobaric: pressure remains constant at the highest level ($P = P_1$).\n- Isothermal: pressure decreases along a hyperbola ($P \\propto 1/V$).\n- Adiabatic: pressure drops most steeply ($P \\propto 1/V^\\gamma$).\n\n3. Therefore, the area under the curve is maximum for the isobaric expansion.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 118,
    exam: 'AIPMT 1996',
    question: "An ideal gas, undergoing adiabatic change, has which of the following pressure temperature relationship?",
    options: [
      "$P^\\gamma T^{1-\\gamma} = \\text{constant}$",
      "$P^{1-\\gamma} T^\\gamma = \\text{constant}$",
      "$P^{\\gamma-1} T^\\gamma = \\text{constant}$",
      "$P^\\gamma T^{\\gamma-1} = \\text{constant}$"
    ],
    correctIndex: 1,
    solution: "1. For an adiabatic process:\n$$PV^\\gamma = \\text{constant}$$\n\n2. From the ideal gas equation, $V = \\frac{nRT}{P}$:\n$$P \\left(\\frac{T}{P}\\right)^\\gamma = \\text{constant} \\implies P^{1-\\gamma} T^\\gamma = \\text{constant}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 119,
    exam: 'AIPMT 1996',
    question: "A diatomic gas initially at $18^\\circ\\text{C}$ is compressed adiabatically to one eighth of its original volume. The temperature after compression will be",
    options: [
      "$395.4^\\circ\\text{C}$",
      "$144^\\circ\\text{C}$",
      "$18^\\circ\\text{C}$",
      "$887.4^\\circ\\text{C}$"
    ],
    correctIndex: 0,
    solution: "1. For a diatomic gas, the adiabatic index is $\\gamma = 1.4 = 7/5$.\n\n2. In an adiabatic process:\n$$T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1} \\implies T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{\\gamma - 1}$$\n\n3. Initial temperature: $T_1 = 18 + 273 = 291\\text{ K}$. Given $V_1 / V_2 = 8$:\n$$\\gamma - 1 = 1.4 - 1 = 0.4$$\n$$T_2 = 291 \\times (8)^{0.4} = 291 \\times (2^3)^{0.4} = 291 \\times 2^{1.2} \\approx 291 \\times 2.2974 = 668.5\\text{ K}$$\n\n4. In Celsius:\n$$T_2 = 668.5 - 273 \\approx 395.4^\\circ\\text{C}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 120,
    exam: 'AIPMT 1996',
    question: "At 0 K which of the following properties of a gas will be zero?",
    options: [
      "vibrational energy",
      "density",
      "kinetic energy",
      "potential energy"
    ],
    correctIndex: 2,
    solution: "1. According to the kinetic molecular theory of gases, the absolute temperature of a gas is directly proportional to the average kinetic energy of its molecules:\n$$E_k = \\frac{3}{2} k_B T$$\n\n2. At absolute zero ($T = 0\\text{ K}$), the average translational kinetic energy of the molecules becomes zero.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 121,
    exam: 'AIPMT 1995',
    question: "Heat is flowing through two cylindrical rods of the same material. The diameters of the rods are in the ratio $1 : 2$ and the lengths in the ratio $2 : 1$. If the temperature difference between the ends is same, then ratio of the rate of flow of heat through them will be",
    options: [
      "$2 : 1$",
      "$8 : 1$",
      "$1 : 1$",
      "$1 : 8$"
    ],
    correctIndex: 3,
    solution: "1. Rate of heat flow through a cylindrical rod is:\n$$H = \\frac{K A \\Delta T}{L} = \\frac{K (\\pi d^2 / 4) \\Delta T}{L} \\propto \\frac{d^2}{L}$$\n\n2. Ratio of rates of heat conduction:\n$$\\frac{H_1}{H_2} = \\left(\\frac{d_1}{d_2}\\right)^2 \\left(\\frac{L_2}{L_1}\\right)$$\n\n3. Given $\\frac{d_1}{d_2} = \\frac{1}{2}$ and $\\frac{L_1}{L_2} = \\frac{2}{1} \\implies \\frac{L_2}{L_1} = \\frac{1}{2}$:\n$$\\frac{H_1}{H_2} = \\left(\\frac{1}{2}\\right)^2 \\left(\\frac{1}{2}\\right) = \\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 122,
    exam: 'AIPMT 1994',
    question: "In an adiabatic change, the pressure and temperature of a monatomic gas are related as $P \\propto T^C$, where $C$ equals",
    options: [
      "$\\frac{3}{5}$",
      "$\\frac{5}{3}$",
      "$\\frac{2}{5}$",
      "$\\frac{5}{2}$"
    ],
    correctIndex: 3,
    solution: "1. For an adiabatic process in an ideal gas:\n$$P^{1-\\gamma} T^\\gamma = \\text{constant} \\implies P \\propto T^{\\frac{\\gamma}{\\gamma - 1}}$$\n\n2. For a monatomic ideal gas, $\\gamma = 5/3$:\n$$C = \\frac{\\gamma}{\\gamma - 1} = \\frac{5/3}{\\frac{5}{3} - 1} = \\frac{5/3}{2/3} = \\frac{5}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 123,
    exam: 'AIPMT 1993',
    question: "If the temperature of the sun is doubled, the rate of energy received on earth will be increased by a factor of",
    options: [
      "2",
      "4",
      "8",
      "16"
    ],
    correctIndex: 3,
    solution: "1. According to Stefan-Boltzmann law, the total rate of energy radiated by the sun is proportional to $T^4$:\n$$E \\propto T^4$$\n\n2. If the temperature is doubled ($T' = 2T$):\n$$\\frac{E'}{E} = \\left(\\frac{T'}{T}\\right)^4 = 2^4 = 16$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 124,
    exam: 'AIPMT 1993',
    question: "Which of the following is not thermodynamical function?",
    options: [
      "Enthalpy",
      "Work done",
      "Gibbs energy",
      "Internal energy"
    ],
    correctIndex: 1,
    solution: "1. Thermodynamic state functions depend only on the thermodynamic state of the system, not on the path taken. Examples include enthalpy ($H$), Gibbs free energy ($G$), internal energy ($U$), entropy ($S$), pressure ($P$), volume ($V$), and temperature ($T$).\n\n2. Work done ($W$) and heat ($Q$) are path-dependent process quantities (path functions), not state thermodynamic functions.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 125,
    exam: 'AIPMT 1993',
    question: "110 joule of heat is added to a gaseous system whose internal energy is 40 J, then the amount of external work done is",
    options: [
      "$150\\text{ J}$",
      "$70\\text{ J}$",
      "$110\\text{ J}$",
      "$40\\text{ J}$"
    ],
    correctIndex: 1,
    solution: "1. By the First Law of Thermodynamics:\n$$Q = \\Delta U + W$$\n\n2. Here heat added $Q = 110\\text{ J}$ and the increase in internal energy $\\Delta U = 40\\text{ J}$:\n$$W = Q - \\Delta U = 110\\text{ J} - 40\\text{ J} = 70\\text{ J}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 126,
    exam: 'AIPMT 1993',
    question: "An ideal gas $A$ and a real gas $B$ have their volumes increased from $V$ to $2V$ under isothermal conditions. The increase in internal energy",
    options: [
      "will be same in both $A$ and $B$",
      "will be zero in both the gases",
      "of $B$ will be more than that of $A$",
      "of $A$ will be more than that of $B$"
    ],
    correctIndex: 2,
    solution: "1. For an ideal gas $A$, internal energy depends only on temperature:\n$$U = U(T)$$\nSince the process is isothermal ($\\Delta T = 0$), $\\Delta U_A = 0$.\n\n2. For a real gas $B$, intermolecular attractive forces exist (van der Waals forces). As volume increases from $V$ to $2V$, the average distance between molecules increases, and work must be done against these attractive forces, increasing the potential energy of the gas:\n$$\\Delta U_B > 0$$\n\n3. Therefore, $\\Delta U_B > \\Delta U_A$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 127,
    exam: 'AIPMT 1993',
    question: "The number of translational degrees of freedom for a diatomic gas is",
    options: [
      "2",
      "3",
      "5",
      "6"
    ],
    correctIndex: 1,
    solution: "1. Any particle or molecule moving freely in three-dimensional space has 3 translational degrees of freedom corresponding to independent translational motion along the $x, y,$ and $z$ axes.\n\n2. A diatomic gas has 5 total degrees of freedom (3 translational + 2 rotational) at room temperature.\n\n3. Specifically, the number of translational degrees of freedom is 3.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 128,
    exam: 'AIPMT 1992',
    question: "Mercury thermometer can be used to measure temperature upto",
    options: [
      "$260^\\circ\\text{C}$",
      "$100^\\circ\\text{C}$",
      "$360^\\circ\\text{C}$",
      "$500^\\circ\\text{C}$"
    ],
    correctIndex: 2,
    solution: "1. The boiling point of mercury at normal atmospheric pressure is $357^\\circ\\text{C}$.\n\n2. Consequently, a standard mercury-in-glass thermometer is typically calibrated and used to measure temperatures up to approximately $360^\\circ\\text{C}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 129,
    exam: 'AIPMT 1992',
    question: "A thermodynamic system is taken from state $A$ to $B$ along $ACB$ and is brought back to $A$ along $BDA$ as shown in the $PV$ diagram. The net work done during the complete cycle is given by the area\n\n![NEET Complete Cycle PV Area](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315363/edvedum/questions/heat_thermodynamics/thermo_q129_diagram.png)",
    options: [
      "$P_1 ACBP_2 P_1$",
      "$ACBB'A'A$",
      "$ACBDA$",
      "$ADBB'A'A$"
    ],
    correctIndex: 2,
    solution: "1. The work done during the forward path $ACB$ equals the area under curve $ACB$ down to the volume axis, which is area $ACBB'A'A$.\n\n2. The work done during the return path $BDA$ equals the negative of the area under curve $BDA$ down to the volume axis, which is area $ADBB'A'A$.\n\n3. The net work done in the cyclic process is the difference between these two areas, which represents the closed area enclosed by the loop:\n$$W_{\\text{net}} = \\text{Area } ACBDA$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 130,
    exam: 'AIPMT 1992',
    question: "If for a gas, $\\frac{R}{C_V} = 0.67$, this gas is made up of molecules which are",
    options: [
      "diatomic",
      "mixture of diatomic and polyatomic molecules",
      "monoatomic",
      "polyatomic"
    ],
    correctIndex: 2,
    solution: "1. Given:\n$$\\frac{R}{C_V} = 0.67 \\approx \\frac{2}{3}$$\n\n2. Solving for $C_V$:\n$$C_V = \\frac{3}{2}R$$\n\n3. A molar specific heat capacity at constant volume of $C_V = \\frac{3}{2}R$ corresponds to a gas with $f = 3$ degrees of freedom, which characterizes a monoatomic gas.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 131,
    exam: 'AIPMT 1991',
    question: "For hydrogen gas $C_P - C_V = a$ and for oxygen gas $C_P - C_V = b$, so the relation between a and b is given by",
    options: [
      "$a = 16b$",
      "$16b = a$",
      "$a = 4b$",
      "$a = b$"
    ],
    correctIndex: 3,
    solution: "1. When $C_P$ and $C_V$ represent the molar heat capacities of an ideal gas, Mayer's relation gives:\n$$C_P - C_V = R$$\n\n2. Since $R$ is the universal gas constant, its value is identical for all ideal gases:\n$$a = R \\quad \\text{and} \\quad b = R \\implies a = b$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 132,
    exam: 'AIPMT 1991',
    question: "Three containers of the same volume contain three different gases. The masses of the molecules are $m_1, m_2$ and $m_3$ and the number of molecules in their respective containers are $N_1, N_2$ and $N_3$. The gas pressure in the containers are $P_1, P_2$ and $P_3$ respectively. All the gases are now mixed and put in one of these containers. The pressure $P$ of the mixture will be",
    options: [
      "$P < (P_1 + P_2 + P_3)$",
      "$P = \\frac{P_1 + P_2 + P_3}{3}$",
      "$P = P_1 + P_2 + P_3$",
      "$P > (P_1 + P_2 + P_3)$"
    ],
    correctIndex: 2,
    solution: "1. According to Dalton's Law of Partial Pressures, when multiple non-reacting ideal gases are combined in a vessel of volume $V$ at temperature $T$, the total pressure is the sum of the partial pressures that each gas would exert if it occupied the entire container alone:\n$$P = P_1 + P_2 + P_3$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 133,
    exam: 'AIPMT 1991',
    question: "A thermodynamic process is shown in the figure. The pressure and volumes corresponding to some points in the figure are $P_A = 3 \\times 10^4\\text{ Pa}; V_A = 2 \\times 10^{-3}\\text{ m}^3; P_B = 8 \\times 10^4\\text{ Pa}; V_D = 5 \\times 10^{-3}\\text{ m}^3$. In the process $AB$, 600 J of heat is added to the system and in process $BC$, 200 J of heat is added to the system. The change in internal energy of the system in process $AC$ would be\n\n![NEET Thermodynamic Process Rectangular](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315365/edvedum/questions/heat_thermodynamics/thermo_q133_diagram.png)",
    options: [
      "$560\\text{ J}$",
      "$800\\text{ J}$",
      "$600\\text{ J}$",
      "$640\\text{ J}$"
    ],
    correctIndex: 0,
    solution: "1. Internal energy is a state function:\n$$\\Delta U_{AC} = \\Delta U_{AB} + \\Delta U_{BC}$$\n\n2. For process $AB$ (constant volume, $V = 2 \\times 10^{-3}\\text{ m}^3$):\n$$W_{AB} = 0 \\implies \\Delta U_{AB} = Q_{AB} = 600\\text{ J}$$\n\n3. For process $BC$ (constant pressure, $P = 8 \\times 10^4\\text{ Pa}$):\n$$W_{BC} = P_B (V_C - V_B) = 8 \\times 10^4 \\times (5 - 2) \\times 10^{-3} = 8 \\times 10^4 \\times 3 \\times 10^{-3} = 240\\text{ J}$$\n$$\\Delta U_{BC} = Q_{BC} - W_{BC} = 200\\text{ J} - 240\\text{ J} = -40\\text{ J}$$\n\n4. Therefore:\n$$\\Delta U_{AC} = 600\\text{ J} + (-40\\text{ J}) = 560\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 134,
    exam: 'AIPMT 1991',
    question: "Relation between pressure ($P$) and energy ($E$) of a gas is",
    options: [
      "$P = \\frac{2}{3}E$",
      "$P = \\frac{1}{3}E$",
      "$P = E$",
      "$P = 3E$"
    ],
    correctIndex: 0,
    solution: "1. The pressure exerted by an ideal gas is:\n$$P = \\frac{1}{3}\\rho v_{\\text{rms}}^2 = \\frac{1}{3}\\frac{M}{V}v_{\\text{rms}}^2$$\n\n2. The translational kinetic energy per unit volume (energy density) is:\n$$E = \\frac{1}{2}\\rho v_{\\text{rms}}^2$$\n\n3. Taking the ratio:\n$$\\frac{P}{E} = \\frac{\\frac{1}{3}\\rho v_{\\text{rms}}^2}{\\frac{1}{2}\\rho v_{\\text{rms}}^2} = \\frac{2}{3} \\implies P = \\frac{2}{3}E$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 135,
    exam: 'AIPMT 1990',
    question: "A Centigrade and a Fahrenheit thermometer are dipped in boiling water. The water temperature is lowered until the Fahrenheit thermometer registers $140^\\circ\\text{F}$. What is the fall in temperature as registered by the centigrade thermometer?",
    options: [
      "$80^\\circ\\text{C}$",
      "$60^\\circ\\text{C}$",
      "$40^\\circ\\text{C}$",
      "$30^\\circ\\text{C}$"
    ],
    correctIndex: 2,
    solution: "1. Boiling water is initially at $100^\\circ\\text{C}$ ($212^\\circ\\text{F}$).\n\n2. Converting the final temperature $140^\\circ\\text{F}$ to Celsius:\n$$C = \\frac{5}{9}(F - 32) = \\frac{5}{9}(140 - 32) = \\frac{5}{9} \\times 108 = 60^\\circ\\text{C}$$\n\n3. Fall in temperature on the centigrade scale:\n$$\\Delta C = 100^\\circ\\text{C} - 60^\\circ\\text{C} = 40^\\circ\\text{C}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 136,
    exam: 'AIPMT 1990',
    question: "Thermal capacity of 40 g of aluminium ($s = 0.2\\text{ cal/g K}$) is",
    options: [
      "$168\\text{ J/K}$",
      "$672\\text{ J/K}$",
      "$840\\text{ J/K}$",
      "$33.6\\text{ J/K}$"
    ],
    correctIndex: 3,
    solution: "1. Thermal capacity of a substance is given by:\n$$C = m s$$\n\n2. Given: $m = 40\\text{ g}$, $s = 0.2\\text{ cal/g K}$:\n$$C = 40 \\times 0.2 = 8\\text{ cal/K}$$\n\n3. Converting to SI units using $1\\text{ cal} = 4.2\\text{ J}$:\n$$C = 8 \\times 4.2\\text{ J/K} = 33.6\\text{ J/K}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 137,
    exam: 'AIPMT 1990',
    question: "One mole of an ideal gas requires 207 J heat to rise the temperature by 10 K when heated at constant pressure. If the same gas is heated at constant volume to raise the temperature by the same 10 K, the heat required is (Given the gas constant $R = 8.3\\text{ J/mole K}$)",
    options: [
      "$198.7\\text{ J}$",
      "$29\\text{ J}$",
      "$215.3\\text{ J}$",
      "$124\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. At constant pressure:\n$$Q_p = n C_p \\Delta T \\implies 207 = 1 \\times C_p \\times 10 \\implies C_p = 20.7\\text{ J mol}^{-1}\\text{ K}^{-1}$$\n\n2. By Mayer's relation $C_p - C_v = R$:\n$$C_v = C_p - R = 20.7 - 8.3 = 12.4\\text{ J mol}^{-1}\\text{ K}^{-1}$$\n\n3. At constant volume, the heat required is:\n$$Q_v = n C_v \\Delta T = 1 \\times 12.4 \\times 10 = 124\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 138,
    exam: 'AIPMT 1990',
    question: "According to kinetic theory of gases, at absolute zero of temperature",
    options: [
      "water freezes",
      "liquid helium freezes",
      "molecular motion stops",
      "liquid hydrogen freezes"
    ],
    correctIndex: 2,
    solution: "1. According to the kinetic theory of gases, the absolute temperature $T$ of a gas is a measure of the average translational kinetic energy of its molecules:\n$$E_k = \\frac{3}{2} k_B T$$\n\n2. At absolute zero ($T = 0\\text{ K}$), $E_k = 0$, meaning that all molecular translational motion ceases completely.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 139,
    exam: 'AIPMT 1990',
    question: "For a certain gas the ratio of specific heats is given to be $\\gamma = 1.5$. For this gas",
    options: [
      "$C_V = 3R/J$",
      "$C_P = 3R/J$",
      "$C_P = 5R/J$",
      "$C_V = 5R/J$"
    ],
    correctIndex: 1,
    solution: "1. Given the ratio of specific heats $\\gamma = \\frac{C_P}{C_V} = 1.5 = \\frac{3}{2}$:\n$$C_P = 1.5 C_V$$\n\n2. Mayer's relation in heat units (mechanical equivalent of heat $J$):\n$$C_P - C_V = \\frac{R}{J}$$\n$$1.5 C_V - C_V = \\frac{R}{J} \\implies 0.5 C_V = \\frac{R}{J} \\implies C_V = \\frac{2R}{J}$$\n\n3. Molar heat capacity at constant pressure:\n$$C_P = 1.5 C_V = 1.5 \\times \\frac{2R}{J} = \\frac{3R}{J}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 140,
    exam: 'AIPMT 1989',
    question: "A polyatomic gas with $n$ degrees of freedom has a mean energy per molecule given by",
    options: [
      "$\\frac{nkT}{N}$",
      "$\\frac{nkT}{2N}$",
      "$\\frac{nkT}{2}$",
      "$\\frac{3kT}{2}$"
    ],
    correctIndex: 2,
    solution: "1. According to the Law of Equipartition of Energy, each degree of freedom of a gas molecule in thermal equilibrium at absolute temperature $T$ contributes an average energy of:\n$$\\bar{E}_1 = \\frac{1}{2} k_B T$$\n\n2. For a gas molecule possessing $n$ degrees of freedom, the total mean energy per molecule is:\n$$\\bar{E} = n \\times \\left(\\frac{1}{2} k_B T\\right) = \\frac{n k_B T}{2}$$\n\nHence, the correct option is (C)."
  }
];

