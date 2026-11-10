// NEET Heat and Thermodynamics PYQ Part 3: Q71 to Q105
import fs from 'fs';

const jsonPath = fs.existsSync('backend/scripts/thermo_diagram_urls.json')
  ? 'backend/scripts/thermo_diagram_urls.json'
  : 'scripts/thermo_diagram_urls.json';
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const THERMO_PYQ_PART3 = [
  {
    qNum: 71,
    exam: 'NEET 2013 (Karnataka)',
    question: "A system is taken from state a to state c by two paths adc and abc as shown in the figure. The internal energy at a is $U_a = 10\\text{ J}$. Along the path adc the amount of heat absorbed $\\text{dQ}_1 = 50\\text{ J}$ and the work obtained $\\text{dW}_1 = 20\\text{ J}$ whereas along the path abc the heat absorbed $\\text{dQ}_2 = 36\\text{ J}$. The amount of work along the path abc is\n\n![NEET Thermodynamic Cycle adc and abc](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315381/edvedum/questions/heat_thermodynamics/thermo_q71_diagram.png)",
    options: [
      "$10\\text{ J}$",
      "$12\\text{ J}$",
      "$36\\text{ J}$",
      "$6\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. For path $adc$:\n$$\\Delta U_{ac} = dQ_1 - dW_1 = 50\\text{ J} - 20\\text{ J} = 30\\text{ J}$$\n\n2. Since internal energy is a state function, the change in internal energy $\\Delta U_{ac}$ along path $abc$ is identical:\n$$\\Delta U_{ac} = 30\\text{ J}$$\n\n3. Applying the First Law of Thermodynamics along path $abc$:\n$$dQ_2 = \\Delta U_{ac} + dW_2$$\n$$dW_2 = dQ_2 - \\Delta U_{ac} = 36\\text{ J} - 30\\text{ J} = 6\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 72,
    exam: 'NEET 2013 (Karnataka)',
    question: "Which of the following relations does not give the equation of an adiabatic process, where terms have their usual meaning?",
    options: [
      "$P^{1-\\gamma} T^\\gamma = \\text{constant}$",
      "$PV^\\gamma = \\text{constant}$",
      "$TV^{\\gamma-1} = \\text{constant}$",
      "$P^\\gamma T^{1-\\gamma} = \\text{constant}$"
    ],
    correctIndex: 3,
    solution: "1. For a reversible adiabatic process in an ideal gas:\n$$PV^\\gamma = \\text{constant}$$\n\n2. Using the ideal gas equation $V \\propto T/P$:\n$$P\\left(\\frac{T}{P}\\right)^\\gamma = \\text{constant} \\implies P^{1-\\gamma} T^\\gamma = \\text{constant}$$\n\n3. Using $P \\propto T/V$:\n$$\\left(\\frac{T}{V}\\right) V^\\gamma = \\text{constant} \\implies T V^{\\gamma-1} = \\text{constant}$$\n\n4. Thus, options (A), (B), and (C) are correct adiabatic relations, whereas $P^\\gamma T^{1-\\gamma} = \\text{constant}$ is incorrect.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 73,
    exam: 'NEET 2013 (Karnataka)',
    question: "In a vessel, the gas is at pressure P. If the mass of all the molecules is halved and their speed is doubled, then the resultant pressure will be",
    options: [
      "$2P$",
      "$P$",
      "$P/2$",
      "$4P$"
    ],
    correctIndex: 0,
    solution: "1. Pressure exerted by an ideal gas according to kinetic theory is given by:\n$$P = \\frac{1}{3} n m v_{\\text{rms}}^2$$\nwhere $n$ is number density, $m$ is mass of a molecule, and $v_{\\text{rms}}$ is root-mean-square speed.\n\n2. Given: $m' = \\frac{m}{2}$ and $v' = 2v$:\n$$P' = \\frac{1}{3} n m' (v')^2 = \\frac{1}{3} n \\left(\\frac{m}{2}\\right) (2v)^2 = \\frac{1}{3} n \\left(\\frac{m}{2}\\right) (4v^2) = 2 \\left(\\frac{1}{3} n m v^2\\right) = 2P$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 74,
    exam: 'NEET 2013',
    question: "A piece of iron is heated in a flame. It first becomes dull red then becomes reddish yellow and finally turns to white hot. The correct explanation for the above observation is possible by using",
    options: [
      "Kirchhoff's Law",
      "Newton's Law of cooling",
      "Stefan's Law",
      "Wien's displacement Law"
    ],
    correctIndex: 3,
    solution: "1. According to Wien's displacement law:\n$$\\lambda_m T = b \\implies \\lambda_m \\propto \\frac{1}{T}$$\n\n2. As the temperature of the body increases, the wavelength $\\lambda_m$ corresponding to maximum spectral intensity shifts towards shorter wavelengths:\n- At lower temperatures, emission peaks in the infrared and red region (dull red).\n- As temperature rises, it shifts towards yellow (reddish yellow).\n- At very high temperatures, it emits across the entire visible spectrum (white hot).\n\nHence, the correct option is (D)."
  },
  {
    qNum: 75,
    exam: 'NEET 2013',
    question: "The molar specific heats of an ideal gas at constant pressure and volume are denoted by $C_p$ and $C_v$, respectively. If $\\gamma = \\frac{C_p}{C_v}$ and $R$ is the universal gas constant, then $C_v$ is equal to",
    options: [
      "$\\frac{(\\gamma - 1)}{R}$",
      "$\\gamma R$",
      "$\\frac{1+\\gamma}{1-\\gamma}$",
      "$\\frac{R}{(\\gamma - 1)}$"
    ],
    correctIndex: 3,
    solution: "1. Mayer's relation states:\n$$C_p - C_v = R$$\n\n2. Dividing both sides by $C_v$:\n$$\\frac{C_p}{C_v} - 1 = \\frac{R}{C_v}$$\n$$\\gamma - 1 = \\frac{R}{C_v}$$\n\n3. Solving for $C_v$:\n$$C_v = \\frac{R}{\\gamma - 1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 76,
    exam: 'NEET 2013',
    question: "In the given $(V - T)$ diagram, what is the relation between pressure $P_1$ and $P_2$?\n\n![NEET VT Diagram Pressure Comparison](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315382/edvedum/questions/heat_thermodynamics/thermo_q76_diagram.png)",
    options: [
      "$P_2 < P_1$",
      "Cannot be predicted",
      "$P_2 = P_1$",
      "$P_2 > P_1$"
    ],
    correctIndex: 0,
    solution: "1. From the ideal gas law $PV = nRT$:\n$$V = \\left(\\frac{nR}{P}\\right) T$$\n\n2. In a $V-T$ graph, the slope of an isobaric line is:\n$$\\text{Slope} = \\frac{V}{T} = \\frac{nR}{P} \\implies P \\propto \\frac{1}{\\text{Slope}}$$\n\n3. From the diagram, the angle $\\theta_2$ of the line for $P_2$ is greater than the angle $\\theta_1$ of the line for $P_1$:\n$$\\text{Slope}_2 > \\text{Slope}_1 \\implies \\frac{1}{P_2} > \\frac{1}{P_1} \\implies P_2 < P_1$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 77,
    exam: 'NEET 2013',
    question: "A gas is taken through the cycle $A \\to B \\to C \\to A$, as shown. What is the net work done by the gas?\n\n![NEET Thermodynamic Cycle Triangle](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315383/edvedum/questions/heat_thermodynamics/thermo_q77_diagram.png)",
    options: [
      "Zero",
      "$-2000\\text{ J}$",
      "$2000\\text{ J}$",
      "$1000\\text{ J}$"
    ],
    correctIndex: 3,
    solution: "1. In a $P-V$ diagram, work done during a cyclic process is equal to the area enclosed by the cycle.\n\n2. Since the cycle $A \\to B \\to C \\to A$ is traversed clockwise, the net work done is positive:\n$$W = +\\text{Area of right-angled } \\triangle ABC = +\\frac{1}{2} \\times \\text{base} \\times \\text{height}$$\n\n3. From the graph:\n- Base along volume axis $= (7 - 2) \\times 10^{-3}\\text{ m}^3 = 5 \\times 10^{-3}\\text{ m}^3$\n- Height along pressure axis $= (6 - 2) \\times 10^5\\text{ Pa} = 4 \\times 10^5\\text{ Pa}$\n\n4. Calculating work:\n$$W = \\frac{1}{2} \\times (5 \\times 10^{-3}\\text{ m}^3) \\times (4 \\times 10^5\\text{ N/m}^2) = 1000\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 78,
    exam: 'NEET 2013',
    question: "During an adiabatic process, the pressure of a gas is found to be proportional to the cube of its temperature. The ratio of $\\frac{C_p}{C_v}$ for the gas is",
    options: [
      "$\\frac{5}{3}$",
      "$\\frac{3}{2}$",
      "$\\frac{4}{3}$",
      "$2$"
    ],
    correctIndex: 1,
    solution: "1. For an adiabatic process, the relation between $P$ and $T$ is:\n$$P^{1-\\gamma} T^\\gamma = \\text{constant} \\implies P \\propto T^{\\frac{\\gamma}{\\gamma - 1}}$$\n\n2. Given: $P \\propto T^3$:\n$$\\frac{\\gamma}{\\gamma - 1} = 3$$\n$$\\gamma = 3(\\gamma - 1) = 3\\gamma - 3$$\n$$2\\gamma = 3 \\implies \\gamma = \\frac{3}{2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 79,
    exam: 'NEET 2013',
    question: "The amount of heat energy required to raise the temperature of 1 g of Helium at NTP, from $T_1\\text{ K}$ to $T_2\\text{ K}$ is",
    options: [
      "$\\frac{3}{4}N_a k_B (T_2 - T_1)$",
      "$\\frac{3}{4}N_a k_B \\left(\\frac{T_2}{T_1}\\right)$",
      "$\\frac{3}{8}N_a k_B (T_2 - T_1)$",
      "$\\frac{3}{2}N_a k_B (T_2 - T_1)$"
    ],
    correctIndex: 2,
    solution: "1. Helium is a monatomic gas with molar heat capacity at constant volume:\n$$C_v = \\frac{3}{2}R$$\n\n2. Molar mass of Helium is $M = 4\\text{ g/mol}$. Number of moles in $1\\text{ g}$ of helium is:\n$$n = \\frac{m}{M} = \\frac{1}{4}\\text{ mol}$$\n\n3. The heat required to raise its temperature by $(T_2 - T_1)$ at constant volume is:\n$$Q = n C_v \\Delta T = \\left(\\frac{1}{4}\\right) \\left(\\frac{3}{2}R\\right) (T_2 - T_1) = \\frac{3}{8} R (T_2 - T_1)$$\n\n4. Since $R = N_a k_B$ (where $N_a$ is Avogadro's number and $k_B$ is Boltzmann's constant):\n$$Q = \\frac{3}{8} N_a k_B (T_2 - T_1)$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 80,
    exam: 'AIPMT 2012 Mains',
    question: "A slab of stone of area $0.36\\text{ m}^2$ and thickness $0.1\\text{ m}$ is exposed on the lower surface to steam at $100^\\circ\\text{C}$. A block of ice at $0^\\circ\\text{C}$ rests on the upper surface of the slab. In one hour $4.8\\text{ kg}$ of ice is melted. The thermal conductivity of slab is (Given latent heat of fusion of ice $= 3.36 \\times 10^5\\text{ J kg}^{-1}$)",
    options: [
      "$1.24\\text{ J/m/s/}^\\circ\\text{C}$",
      "$1.29\\text{ J/m/s/}^\\circ\\text{C}$",
      "$2.05\\text{ J/m/s/}^\\circ\\text{C}$",
      "$1.02\\text{ J/m/s/}^\\circ\\text{C}$"
    ],
    correctIndex: 0,
    solution: "1. Heat required to melt $4.8\\text{ kg}$ of ice:\n$$Q = m L_f = 4.8\\text{ kg} \\times 3.36 \\times 10^5\\text{ J/kg} = 1.6128 \\times 10^6\\text{ J}$$\n\n2. Rate of heat conduction through the slab:\n$$Q = \\frac{K A \\Delta T \\, t}{d}$$\nwhere $A = 0.36\\text{ m}^2$, $d = 0.1\\text{ m}$, $\\Delta T = 100^\\circ\\text{C} - 0^\\circ\\text{C} = 100^\\circ\\text{C}$, and $t = 1\\text{ hour} = 3600\\text{ s}$.\n\n3. Solving for $K$:\n$$K = \\frac{Q \\cdot d}{A \\cdot \\Delta T \\cdot t} = \\frac{1.6128 \\times 10^6 \\times 0.1}{0.36 \\times 100 \\times 3600} = \\frac{161280}{129600} \\approx 1.24\\text{ J m}^{-1}\\text{ s}^{-1}\\text{ }^\\circ\\text{C}^{-1}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 81,
    exam: 'AIPMT 2012 Mains',
    question: "An ideal gas goes from state A to state B via three different processes as indicated in the P-V diagram. If $Q_1, Q_2, Q_3$ indicate the heat absorbed by the gas along the three processes and $\\Delta U_1, \\Delta U_2, \\Delta U_3$ indicate the change in internal energy along the three processes respectively, then\n\n![NEET Three Paths PV Diagram](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315384/edvedum/questions/heat_thermodynamics/thermo_q81_diagram.png)",
    options: [
      "$Q_1 > Q_2 > Q_3$ and $\\Delta U_1 = \\Delta U_2 = \\Delta U_3$",
      "$Q_3 > Q_2 > Q_1$ and $\\Delta U_1 = \\Delta U_2 = \\Delta U_3$",
      "$Q_1 = Q_2 = Q_3$ and $\\Delta U_1 > \\Delta U_2 > \\Delta U_3$",
      "$Q_3 = Q_2 = Q_1$ and $\\Delta U_1 > \\Delta U_2 > \\Delta U_3$"
    ],
    correctIndex: 0,
    solution: "1. Internal energy is a state function that depends only on the initial and final states. Since all three processes begin at state A and end at state B:\n$$\\Delta U_1 = \\Delta U_2 = \\Delta U_3$$\n\n2. Work done equals the area under each curve in the $P-V$ diagram. From the graph:\n$$W_1 > W_2 > W_3$$\n\n3. By the First Law of Thermodynamics, $Q = \\Delta U + W$:\n$$Q_1 > Q_2 > Q_3$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 82,
    exam: 'AIPMT 2012 Prelims',
    question: "One mole of an ideal gas goes from an initial state A to final state B via two processes : It first undergoes isothermal expansion from volume V to 3V and then its volume is reduced from 3V to V at constant pressure. The correct P-V diagram representing the two process is",
    options: [
      "![Option A](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315384/edvedum/questions/heat_thermodynamics/thermo_q82_opt_a.png)",
      "![Option B](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315385/edvedum/questions/heat_thermodynamics/thermo_q82_opt_b.png)",
      "![Option C](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315386/edvedum/questions/heat_thermodynamics/thermo_q82_opt_c.png)",
      "![Option D](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315387/edvedum/questions/heat_thermodynamics/thermo_q82_opt_d.png)"
    ],
    correctIndex: 3,
    solution: "1. Step 1 (Isothermal expansion from $V$ to $3V$):\nIn an isothermal process, $PV = \\text{constant}$, which is represented by a downward rectangular hyperbola curving from $(P_A, V)$ to $(P_A/3, 3V)$.\n\n2. Step 2 (Isobaric compression from $3V$ to $V$):\nAt constant pressure, the process is represented by a horizontal straight line directed to the left from $3V$ to $V$ at pressure $P = P_A/3$.\n\n3. In Diagram (D), curve $A$ expands isothermally along a hyperbola to $3V$, and then proceeds along a horizontal line directly left to $B$ at volume $V$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 83,
    exam: 'AIPMT 2012 Prelims',
    question: "A thermodynamic system is taken through the cycle ABCD as shown in figure. Heat rejected by the gas during the cycle is\n\n![NEET Thermodynamic Cycle ABCD](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315388/edvedum/questions/heat_thermodynamics/thermo_q83_diagram.png)",
    options: [
      "$2PV$",
      "$4PV$",
      "$\\frac{1}{2}PV$",
      "$PV$"
    ],
    correctIndex: 0,
    solution: "1. Over a complete cyclic process, the net change in internal energy is zero ($\\Delta U = 0$):\n$$Q_{\\text{net}} = W_{\\text{net}}$$\n\n2. The cyclic path $A \\to B \\to C \\to D \\to A$ is traversed in the counter-clockwise direction, which means net work done by the gas is negative:\n$$W_{\\text{net}} = -\\text{Area of rectangle } ABCD = -(\\Delta P)(\\Delta V)$$\n$$\\Delta P = 2P - P = P, \\quad \\Delta V = 3V - V = 2V$$\n$$W_{\\text{net}} = -(P)(2V) = -2PV$$\n\n3. Therefore, $Q_{\\text{net}} = -2PV$, which means heat rejected by the gas during the cycle is $2PV$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 84,
    exam: 'AIPMT 2011 Mains',
    question: "A mass of diatomic gas ($\\gamma = 1.4$) at a pressure of 2 atmospheres is compressed adiabatically so that its temperature rises from $27^\\circ\\text{C}$ to $927^\\circ\\text{C}$. The pressure of the gas in the final state is",
    options: [
      "$8\\text{ atm}$",
      "$28\\text{ atm}$",
      "$68.7\\text{ atm}$",
      "$256\\text{ atm}$"
    ],
    correctIndex: 3,
    solution: "1. For an adiabatic process, the relationship between $P$ and $T$ is:\n$$P^{1-\\gamma} T^\\gamma = \\text{constant} \\implies P \\propto T^{\\frac{\\gamma}{\\gamma - 1}}$$\n\n2. Given: $\\gamma = 1.4 = 7/5$, so:\n$$\\frac{\\gamma}{\\gamma - 1} = \\frac{1.4}{0.4} = \\frac{7}{2} = 3.5$$\n\n3. Initial temperature: $T_1 = 27 + 273 = 300\\text{ K}$\nFinal temperature: $T_2 = 927 + 273 = 1200\\text{ K} = 4T_1$\n\n4. Ratio of final to initial pressure:\n$$\\frac{P_2}{P_1} = \\left(\\frac{T_2}{T_1}\\right)^{3.5} = (4)^{3.5} = (2^2)^{3.5} = 2^7 = 128$$\n$$P_2 = 128 \\times P_1 = 128 \\times 2\\text{ atm} = 256\\text{ atm}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 85,
    exam: 'AIPMT 2011 Prelims',
    question: "During an isothermal expansion, a confined ideal gas does $-150\\text{ J}$ of work against its surroundings. This implies that",
    options: [
      "$150\\text{ J}$ of heat has been removed from the gas",
      "$300\\text{ J}$ of heat has been added to the gas",
      "no heat is transferred because the process is isothermal",
      "$150\\text{ J}$ of heat has been added to the gas"
    ],
    correctIndex: 3,
    solution: "1. By the First Law of Thermodynamics, $\\Delta Q = \\Delta U + W$.\n\n2. In an isothermal process, temperature remains constant, so the change in internal energy is zero ($\\Delta U = 0$), giving:\n$$\\Delta Q = W$$\n\n3. When work is performed by a expanding gas against surroundings, heat is absorbed from the surroundings. Following the official AIPMT answer key, option (D) is recorded as the correct answer.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 86,
    exam: 'AIPMT 2011 Prelims',
    question: "When 1 kg of ice at $0^\\circ\\text{C}$ melts to water at $0^\\circ\\text{C}$, the resulting change in its entropy, taking latent heat of ice to be $80\\text{ cal/g}$, is",
    options: [
      "$273\\text{ cal/K}$",
      "$8 \\times 10^4\\text{ cal/K}$",
      "$80\\text{ cal/K}$",
      "$293\\text{ cal/K}$"
    ],
    correctIndex: 3,
    solution: "1. Heat required to melt $1\\text{ kg}$ of ice:\n$$Q = m L_f = 1000\\text{ g} \\times 80\\text{ cal/g} = 80000\\text{ cal}$$\n\n2. The melting occurs reversibly at constant temperature:\n$$T = 0^\\circ\\text{C} = 273\\text{ K}$$\n\n3. The change in entropy is:\n$$\\Delta S = \\frac{Q}{T} = \\frac{80000\\text{ cal}}{273\\text{ K}} \\approx 293\\text{ cal/K}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 87,
    exam: 'AIPMT 2010 Mains',
    question: "If $c_p$ and $c_v$ denote the specific heats (per unit mass) of an ideal gas of molecular weight M, then",
    options: [
      "$c_p - c_v = R/M^2$",
      "$c_p - c_v = R$",
      "$c_p - c_v = R/M$",
      "$c_p - c_v = MR$"
    ],
    correctIndex: 2,
    solution: "1. Molar specific heats are related to specific heats per unit mass (principal specific heats) by:\n$$C_p = M c_p \\quad \\text{and} \\quad C_v = M c_v$$\nwhere $M$ is the molar mass.\n\n2. From Mayer's relation for molar specific heats:\n$$C_p - C_v = R$$\n\n3. Substituting the principal specific heats:\n$$M c_p - M c_v = R$$\n$$c_p - c_v = \\frac{R}{M}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 88,
    exam: 'AIPMT 2010 Mains',
    question: "A monatomic gas at pressure $P_1$ and volume $V_1$ is compressed adiabatically to $\\frac{1}{8}^{\\text{th}}$ of its original volume. What is the final pressure of the gas?",
    options: [
      "$64P_1$",
      "$P_1$",
      "$16P_1$",
      "$32P_1$"
    ],
    correctIndex: 3,
    solution: "1. For an adiabatic process:\n$$P_1 V_1^\\gamma = P_2 V_2^\\gamma$$\n\n2. For a monatomic ideal gas, $\\gamma = 5/3$. Given $V_2 = \\frac{V_1}{8}$:\n$$P_2 = P_1 \\left(\\frac{V_1}{V_2}\\right)^\\gamma = P_1 (8)^{5/3}$$\n\n3. Evaluating $(8)^{5/3}$:\n$$(8)^{5/3} = (2^3)^{5/3} = 2^5 = 32$$\n$$P_2 = 32P_1$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 89,
    exam: 'AIPMT 2010 Prelims',
    question: "A cylindrical metallic rod in thermal contact with two reservoirs of heat at its two ends conducts an amount of heat Q in time t. The metallic rod is melted and the material is formed into a rod of half the radius of the original rod. What is the amount of heat conducted by the new rod, when placed in thermal contact with the two reservoirs in time t?",
    options: [
      "$\\frac{Q}{4}$",
      "$\\frac{Q}{16}$",
      "$2Q$",
      "$\\frac{Q}{2}$"
    ],
    correctIndex: 1,
    solution: "1. The volume of the metallic rod remains constant upon melting and reforming:\n$$V = \\pi r^2 L = \\pi (r')^2 L'$$\nWith $r' = r/2$:\n$$\\pi r^2 L = \\pi \\left(\\frac{r}{2}\\right)^2 L' = \\frac{\\pi r^2}{4} L' \\implies L' = 4L$$\n\n2. Cross-sectional area of the new rod:\n$$A' = \\pi (r')^2 = \\frac{\\pi r^2}{4} = \\frac{A}{4}$$\n\n3. The amount of heat conducted in time $t$ is:\n$$Q = \\frac{K A \\Delta T t}{L} \\propto \\frac{A}{L}$$\n\n4. Taking the ratio:\n$$\\frac{Q'}{Q} = \\frac{A'/L'}{A/L} = \\frac{(A/4)/(4L)}{A/L} = \\frac{1}{16} \\implies Q' = \\frac{Q}{16}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 90,
    exam: 'AIPMT 2010 Prelims',
    question: "If $\\Delta U$ and $\\Delta W$ represent the increase in internal energy and work done by the system respectively in a thermodynamical process, which of the following is true ?",
    options: [
      "$\\Delta U = -\\Delta W$, in an adiabatic process",
      "$\\Delta U = \\Delta W$, in an isothermal process",
      "$\\Delta U = \\Delta W$, in an adiabatic process",
      "$\\Delta U = -\\Delta W$, in an isothermal process"
    ],
    correctIndex: 0,
    solution: "1. The First Law of Thermodynamics states:\n$$\\Delta Q = \\Delta U + \\Delta W$$\n\n2. For an adiabatic process, there is no heat exchange with the surroundings:\n$$\\Delta Q = 0$$\n$$0 = \\Delta U + \\Delta W \\implies \\Delta U = -\\Delta W$$\n\n3. This means that work done by the system in an adiabatic process comes entirely at the expense of its internal energy.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 91,
    exam: 'AIPMT 2009',
    question: "The two ends of a rod of length L and a uniform cross-sectional area A are kept at two temperatures $T_1$ and $T_2$ ($T_1 > T_2$). The rate of heat transfer, $\\frac{dQ}{dt}$ through the rod in a steady state is given by :",
    options: [
      "$\\frac{dQ}{dt} = \\frac{k(T_1 - T_2)}{LA}$",
      "$\\frac{dQ}{dt} = kLA(T_1 - T_2)$",
      "$\\frac{dQ}{dt} = \\frac{kA(T_1 - T_2)}{L}$",
      "$\\frac{dQ}{dt} = \\frac{kL(T_1 - T_2)}{A}$"
    ],
    correctIndex: 2,
    solution: "1. In steady state thermal conduction, the rate of heat flow through a uniform rod of length $L$, cross-sectional area $A$, and thermal conductivity $k$ between temperatures $T_1$ and $T_2$ ($T_1 > T_2$) is governed by Fourier's Law of Heat Conduction:\n$$\\frac{dQ}{dt} = \\frac{kA(T_1 - T_2)}{L}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 92,
    exam: 'AIPMT 2009',
    question: "The internal energy change in a system that has absorbed 2 kcal of heat and done 500 J of work is",
    options: [
      "$6400\\text{ J}$",
      "$5400\\text{ J}$",
      "$7900\\text{ J}$",
      "$8900\\text{ J}$"
    ],
    correctIndex: 2,
    solution: "1. Heat absorbed by the system:\n$$Q = 2\\text{ kcal} = 2 \\times 1000 \\times 4.2\\text{ J} = 8400\\text{ J}$$\n\n2. Work done by the system:\n$$W = 500\\text{ J}$$\n\n3. By the First Law of Thermodynamics:\n$$\\Delta U = Q - W = 8400\\text{ J} - 500\\text{ J} = 7900\\text{ J}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 93,
    exam: 'AIPMT 2009',
    question: "In thermodynamic processes which of the following statements is not true ?",
    options: [
      "In an isochoric process pressure remains constant.",
      "In an isothermal process the temperature remains constant.",
      "In an adiabatic process $PV^\\gamma = \\text{constant}$.",
      "In an adiabatic process the system is insulated from the surroundings."
    ],
    correctIndex: 0,
    solution: "1. An isochoric process is defined as a thermodynamic process taking place at constant volume ($V = \\text{constant}$), not constant pressure.\n\n2. Constant pressure defines an isobaric process.\n\n3. Therefore, statement (A) is false and not true.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 94,
    exam: 'AIPMT 2008',
    question: "On a new scale of temperature (which is linear) and called the W scale, the freezing and boiling points of water are $39^\\circ\\text{W}$ and $239^\\circ\\text{W}$ respectively. What will be the temperature on the new scale, corresponding to a temperature of $39^\\circ\\text{C}$ on the Celsius scale ?",
    options: [
      "$200^\\circ\\text{W}$",
      "$139^\\circ\\text{W}$",
      "$78^\\circ\\text{W}$",
      "$117^\\circ\\text{W}$"
    ],
    correctIndex: 3,
    solution: "1. For any linear temperature scale, the reading relation with the lower fixed point (LFP) and upper fixed point (UFP) is:\n$$\\frac{T - \\text{LFP}}{\\text{UFP} - \\text{LFP}} = \\text{constant}$$\n\n2. Comparing the W scale with the Celsius scale:\n$$\\frac{W - 39}{239 - 39} = \\frac{C - 0}{100 - 0}$$\n$$\\frac{W - 39}{200} = \\frac{C}{100}$$\n\n3. For $C = 39^\\circ\\text{C}$:\n$$\\frac{W - 39}{200} = \\frac{39}{100} \\implies W - 39 = 2 \\times 39 = 78$$\n$$W = 78 + 39 = 117^\\circ\\text{W}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 95,
    exam: 'AIPMT 2008',
    question: "At $10^\\circ\\text{C}$ the value of the density of a fixed mass of an ideal gas divided by its pressure is x. At $110^\\circ\\text{C}$ this ratio is",
    options: [
      "$\\frac{10}{110} x$",
      "$\\frac{283}{383} x$",
      "$x$",
      "$\\frac{383}{283} x$"
    ],
    correctIndex: 1,
    solution: "1. From the ideal gas law $PV = nRT = \\frac{m}{M}RT$:\n$$P = \\frac{\\rho RT}{M} \\implies \\frac{\\rho}{P} = \\frac{M}{RT} \\propto \\frac{1}{T}$$\n\n2. Converting temperatures to Kelvin:\n- $T_1 = 10^\\circ\\text{C} = 10 + 273 = 283\\text{ K}$\n- $T_2 = 110^\\circ\\text{C} = 110 + 273 = 383\\text{ K}$\n\n3. Taking the ratio:\n$$\\frac{(\\rho/P)_2}{(\\rho/P)_1} = \\frac{T_1}{T_2} = \\frac{283}{383}$$\n$$(\\rho/P)_2 = \\frac{283}{383} x$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 96,
    exam: 'AIPMT 2008',
    question: "If Q, E and W denote respectively the heat added, change in internal energy and the work done in a closed cyclic process, then",
    options: [
      "$E = 0$",
      "$Q = 0$",
      "$W = 0$",
      "$Q = W = 0$"
    ],
    correctIndex: 0,
    solution: "1. Internal energy is a thermodynamic state function that depends solely on the state of the system.\n\n2. In a closed cyclic process, the initial state and final state are identical:\n$$\\Delta U = E = U_f - U_i = 0$$\n\n3. By the First Law of Thermodynamics, $Q = E + W = 0 + W = W$ (which is non-zero in general).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 97,
    exam: 'AIPMT 2006',
    question: "A black body at $1227^\\circ\\text{C}$ emits radiations with maximum intensity at a wavelength of $5000\\text{ \\AA}$. If the temperature of the body is increased by $1000^\\circ\\text{C}$, the maximum intensity will be observed at",
    options: [
      "$3000\\text{ \\AA}$",
      "$4000\\text{ \\AA}$",
      "$5000\\text{ \\AA}$",
      "$6000\\text{ \\AA}$"
    ],
    correctIndex: 0,
    solution: "1. Initial temperature in Kelvin:\n$$T_1 = 1227 + 273 = 1500\\text{ K}$$\n\n2. When temperature is increased by $1000^\\circ\\text{C}$:\n$$T_2 = 1500 + 1000 = 2500\\text{ K}$$\n\n3. According to Wien's displacement law:\n$$\\lambda_1 T_1 = \\lambda_2 T_2$$\n$$\\lambda_2 = \\lambda_1 \\left(\\frac{T_1}{T_2}\\right) = 5000\\text{ \\AA} \\times \\left(\\frac{1500}{2500}\\right) = 5000 \\times \\frac{3}{5} = 3000\\text{ \\AA}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 98,
    exam: 'AIPMT 2006',
    question: "The molar specific heat at constant pressure of an ideal gas is $(7/2) R$. The ratio of specific heat at constant pressure to that at constant volume is",
    options: [
      "$9/7$",
      "$7/5$",
      "$8/7$",
      "$5/7$"
    ],
    correctIndex: 1,
    solution: "1. Given molar heat capacity at constant pressure:\n$$C_p = \\frac{7}{2}R$$\n\n2. Using Mayer's relation $C_p - C_v = R$:\n$$C_v = C_p - R = \\frac{7}{2}R - R = \\frac{5}{2}R$$\n\n3. The ratio of specific heats is:\n$$\\gamma = \\frac{C_p}{C_v} = \\frac{\\frac{7}{2}R}{\\frac{5}{2}R} = \\frac{7}{5}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 99,
    exam: 'AIPMT 2005',
    question: "Which of the following rods, (given radius r and length $l$) each made of the same material and whose ends are maintained at the same temperature will conduct most heat ?",
    options: [
      "$r = r_0, l = l_0$",
      "$r = 2r_0, l = l_0$",
      "$r = r_0, l = 2l_0$",
      "$r = 2r_0, l = 2l_0$"
    ],
    correctIndex: 1,
    solution: "1. The rate of heat conduction is given by:\n$$H = \\frac{K A \\Delta T}{l} = \\frac{K (\\pi r^2) \\Delta T}{l} \\propto \\frac{r^2}{l}$$\n\n2. Evaluating the ratio $\\frac{r^2}{l}$ for each option:\n- (A) $\\frac{r_0^2}{l_0} = 1\\left(\\frac{r_0^2}{l_0}\\right)$\n- (B) $\\frac{(2r_0)^2}{l_0} = 4\\left(\\frac{r_0^2}{l_0}\\right)$\n- (C) $\\frac{r_0^2}{2l_0} = 0.5\\left(\\frac{r_0^2}{l_0}\\right)$\n- (D) $\\frac{(2r_0)^2}{2l_0} = 2\\left(\\frac{r_0^2}{l_0}\\right)$\n\n3. The value is maximum for case (B) ($4 r_0^2/l_0$).\n\nHence, the correct option is (B)."
  },
  {
    qNum: 100,
    exam: 'AIPMT 2005',
    question: "Which of the following processes is reversible?",
    options: [
      "Transfer of heat by conduction",
      "Transfer of heat by radiation",
      "Isothermal compression",
      "Electrical heating of a nichrome wire."
    ],
    correctIndex: 2,
    solution: "1. A quasi-static isothermal compression performed infinitely slowly and without friction is a reversible thermodynamic process.\n\n2. In contrast:\n- Heat transfer by conduction or radiation across a finite temperature difference involves spontaneous heat flow from hot to cold and is strictly irreversible.\n- Electrical heating of a wire ($I^2Rt$ Joule heating) is dissipative and completely irreversible.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 101,
    exam: 'AIPMT 2004',
    question: "The equation of state for 5 g of oxygen at a pressure P and temperature T, when occupying a volume V, will be (where R is the gas constant)",
    options: [
      "$PV = (5/32)RT$",
      "$PV = 5RT$",
      "$PV = (5/2)RT$",
      "$PV = (5/16)RT$"
    ],
    correctIndex: 0,
    solution: "1. The ideal gas equation of state is:\n$$PV = nRT = \\left(\\frac{m}{M}\\right)RT$$\n\n2. For molecular oxygen ($\\text{O}_2$), molar mass is $M = 32\\text{ g/mol}$:\n$$n = \\frac{5}{32}\\text{ mol}$$\n\n3. Therefore:\n$$PV = \\left(\\frac{5}{32}\\right)RT$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 102,
    exam: 'AIPMT 2004',
    question: "One mole of an ideal gas at an initial temperature of T K does 6R joule of work adiabatically. If the ratio of specific heats of this gas at constant pressure and at constant volume is 5/3, the final temperature of gas will be",
    options: [
      "$(T + 2.4)\\text{ K}$",
      "$(T - 2.4)\\text{ K}$",
      "$(T + 4)\\text{ K}$",
      "$(T - 4)\\text{ K}$"
    ],
    correctIndex: 3,
    solution: "1. Work done by an ideal gas in an adiabatic process is:\n$$W = \\frac{nR(T_i - T_f)}{\\gamma - 1}$$\n\n2. Given: $n = 1$, $W = 6R$, $T_i = T$, and $\\gamma = 5/3$:\n$$6R = \\frac{1 \\cdot R (T - T_f)}{\\frac{5}{3} - 1} = \\frac{R (T - T_f)}{2/3} = \\frac{3}{2}R(T - T_f)$$\n\n3. Solving for $T_f$:\n$$6 = \\frac{3}{2}(T - T_f) \\implies T - T_f = \\frac{12}{3} = 4$$\n$$T_f = (T - 4)\\text{ K}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 103,
    exam: 'AIPMT 2003',
    question: "Consider a compound slab consisting of two different materials having equal thicknesses and thermal conductivities K and 2K, respectively. The equivalent thermal conductivity of the slab is",
    options: [
      "$\\frac{2}{3}K$",
      "$\\sqrt{2}K$",
      "$3K$",
      "$\\frac{4}{3}K$"
    ],
    correctIndex: 3,
    solution: "1. The two slabs of equal thickness $d$ and area $A$ are connected in series across the direction of heat flow.\n\n2. Thermal resistance in series:\n$$R_{\\text{eq}} = R_1 + R_2$$\n$$\\frac{2d}{K_{\\text{eq}} A} = \\frac{d}{K A} + \\frac{d}{2K A}$$\n\n3. Dividing through by $\\frac{d}{A}$:\n$$\\frac{2}{K_{\\text{eq}}} = \\frac{1}{K} + \\frac{1}{2K} = \\frac{3}{2K}$$\n$$K_{\\text{eq}} = \\frac{4}{3}K$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 104,
    exam: 'AIPMT 2002',
    question: "Consider two rods of same length and different specific heats ($S_1, S_2$), conductivities ($K_1, K_2$) and area of cross-sections ($A_1, A_2$) and both having temperatures $T_1$ and $T_2$ at their ends. If rate of loss of heat due to conduction is equal, then",
    options: [
      "$K_1 A_1 = K_2 A_2$",
      "$\\frac{K_1 A_1}{S_1} = \\frac{K_2 A_2}{S_2}$",
      "$K_2 A_1 = K_1 A_2$",
      "$\\frac{K_2 A_1}{S_2} = \\frac{K_1 A_2}{S_1}$"
    ],
    correctIndex: 0,
    solution: "1. Rate of heat flow through a conductor of length $L$, area $A$, and conductivity $K$ under temperature difference $\\Delta T = T_1 - T_2$ is:\n$$\\frac{dQ}{dt} = \\frac{K A \\Delta T}{L}$$\n(Independent of specific heat $S$ in steady state conduction).\n\n2. Equating heat flow for both rods:\n$$\\frac{K_1 A_1 \\Delta T}{L} = \\frac{K_2 A_2 \\Delta T}{L}$$\n$$K_1 A_1 = K_2 A_2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 105,
    exam: 'AIPMT 2001',
    question: "A cylindrical rod having temperature $T_1$ and $T_2$ at its end. The rate of flow of heat $Q_1\\text{ cal/sec}$. If all the linear dimension are doubled keeping temperature constant, then rate of flow of heat $Q_2$ will be",
    options: [
      "$4Q_1$",
      "$2Q_1$",
      "$\\frac{Q_1}{4}$",
      "$\\frac{Q_1}{2}$"
    ],
    correctIndex: 1,
    solution: "1. Rate of heat conduction through a cylinder of radius $r$ and length $L$ is:\n$$Q = \\frac{K (\\pi r^2) \\Delta T}{L} \\propto \\frac{r^2}{L}$$\n\n2. When all linear dimensions are doubled: $r' = 2r$ and $L' = 2L$:\n$$Q_2 \\propto \\frac{(2r)^2}{2L} = \\frac{4r^2}{2L} = 2\\left(\\frac{r^2}{L}\\right) = 2Q_1$$\n\nHence, the correct option is (B)."
  }
];

