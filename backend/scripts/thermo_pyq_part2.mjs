// NEET Heat and Thermodynamics PYQ Part 2: Q36 to Q70
import fs from 'fs';

const jsonPath = fs.existsSync('backend/scripts/thermo_diagram_urls.json')
  ? 'backend/scripts/thermo_diagram_urls.json'
  : 'scripts/thermo_diagram_urls.json';
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const THERMO_PYQ_PART2 = [
  {
    qNum: 36,
    exam: 'NEET 2019 (Odisha)',
    question: "The value of $\\gamma \\left(= \\frac{C_p}{C_v}\\right)$, for hydrogen, helium and another ideal diatomic gas X (whose molecules are not rigid but have an additional vibrational mode), are respectively equal to,",
    options: [
      "$\\frac{7}{5}, \\frac{5}{3}, \\frac{7}{5}$",
      "$\\frac{7}{5}, \\frac{5}{3}, \\frac{9}{7}$",
      "$\\frac{5}{3}, \\frac{7}{5}, \\frac{9}{7}$",
      "$\\frac{5}{3}, \\frac{7}{5}, \\frac{7}{5}$"
    ],
    correctIndex: 1,
    solution: "1. For an ideal gas with $f$ degrees of freedom, the ratio of specific heats is:\n$$\\gamma = 1 + \\frac{2}{f}$$\n\n2. For Hydrogen ($\\text{H}_2$), a rigid diatomic gas at room temperature:\n$$f = 5 \\implies \\gamma = 1 + \\frac{2}{5} = \\frac{7}{5}$$\n\n3. For Helium ($\\text{He}$), a monatomic gas:\n$$f = 3 \\implies \\gamma = 1 + \\frac{2}{3} = \\frac{5}{3}$$\n\n4. For diatomic gas X with an additional vibrational mode:\nA vibrational mode contributes 2 degrees of freedom (1 kinetic + 1 potential):\n$$f = 3 + 2 + 2 = 7 \\implies \\gamma = 1 + \\frac{2}{7} = \\frac{9}{7}$$\n\nTherefore, the values are $\\frac{7}{5}, \\frac{5}{3}, \\frac{9}{7}$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 37,
    exam: 'NEET 2019 (Odisha)',
    question: "$1\\text{ g}$ of water, of volume $1\\text{ cm}^3$ at $100^\\circ\\text{C}$, is converted into steam at same temperature under normal atmospheric pressure ($\\simeq 1 \\times 10^5\\text{ Pa}$). The volume of steam formed equals $1671\\text{ cm}^3$. If the specific latent heat of vaporisation of water is $2256\\text{ J/g}$, the change in internal energy is,",
    options: [
      "$2256\\text{ J}$",
      "$2423\\text{ J}$",
      "$2089\\text{ J}$",
      "$167\\text{ J}$"
    ],
    correctIndex: 2,
    solution: "1. Heat added to convert water into steam:\n$$Q = m L_v = 1\\text{ g} \\times 2256\\text{ J/g} = 2256\\text{ J}$$\n\n2. The change in volume during vaporization:\n$$\\Delta V = V_{\\text{steam}} - V_{\\text{water}} = 1671\\text{ cm}^3 - 1\\text{ cm}^3 = 1670\\text{ cm}^3 = 1670 \\times 10^{-6}\\text{ m}^3$$\n\n3. Work done against atmospheric pressure:\n$$W = P\\Delta V = 1 \\times 10^5\\text{ Pa} \\times 1.670 \\times 10^{-3}\\text{ m}^3 = 167\\text{ J}$$\n\n4. From the first law of thermodynamics ($\\Delta U = Q - W$):\n$$\\Delta U = 2256\\text{ J} - 167\\text{ J} = 2089\\text{ J}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 38,
    exam: 'NEET 2019',
    question: "In which of the following processes, heat is neither absorbed nor released by a system?",
    options: [
      "adiabatic",
      "isobaric",
      "isochoric",
      "isothermal"
    ],
    correctIndex: 0,
    solution: "1. An adiabatic process is one in which the system is thermally insulated from its surroundings, so no heat exchange occurs with the surroundings:\n$$\\Delta Q = 0$$\n\n2. For the other processes:\n- Isobaric: occurs at constant pressure (heat is exchanged).\n- Isochoric: occurs at constant volume (heat is exchanged).\n- Isothermal: occurs at constant temperature (heat is exchanged, $Q = W$).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 39,
    exam: 'NEET 2019',
    question: "Increase in temperature of a gas filled in a container would lead to :",
    options: [
      "increase in its kinetic energy",
      "decrease in intermolecular distance",
      "decrease in its pressure",
      "increase in its mass"
    ],
    correctIndex: 0,
    solution: "1. According to the kinetic theory of gases, the average kinetic energy of gas molecules is directly proportional to absolute temperature:\n$$E_k = \\frac{3}{2}k_B T$$\n\n2. When the temperature of the gas increases, the average kinetic energy of the gas molecules increases.\n\n3. Since the container has fixed volume, intermolecular distance and mass remain constant, while pressure increases ($P \\propto T$).\n\nHence, the correct option is (A)."
  },
  {
    qNum: 40,
    exam: 'NEET 2019',
    question: "A copper rod of $88\\text{ cm}$ and an aluminium rod of unknown length have their increase in length independent of increase in temperature. The length of aluminium rod is : ($\\alpha_{\\text{Cu}} = 1.7 \\times 10^{-5}\\text{ K}^{-1}$ and $\\alpha_{\\text{Al}} = 2.2 \\times 10^{-5}\\text{ K}^{-1}$)",
    options: [
      "$119.9\\text{ cm}$",
      "$88\\text{ cm}$",
      "$68\\text{ cm}$",
      "$6.8\\text{ cm}$"
    ],
    correctIndex: 2,
    solution: "1. For the difference in lengths $(\\Delta l_{\\text{Cu}} - \\Delta l_{\\text{Al}})$ to be independent of temperature change $\\Delta T$:\n$$\\Delta l_{\\text{Cu}} = \\Delta l_{\\text{Al}}$$\n$$l_{\\text{Cu}} \\alpha_{\\text{Cu}} \\Delta T = l_{\\text{Al}} \\alpha_{\\text{Al}} \\Delta T$$\n$$l_{\\text{Cu}} \\alpha_{\\text{Cu}} = l_{\\text{Al}} \\alpha_{\\text{Al}}$$\n\n2. Given: $l_{\\text{Cu}} = 88\\text{ cm}$, $\\alpha_{\\text{Cu}} = 1.7 \\times 10^{-5}\\text{ K}^{-1}$, $\\alpha_{\\text{Al}} = 2.2 \\times 10^{-5}\\text{ K}^{-1}$:\n$$l_{\\text{Al}} = \\frac{l_{\\text{Cu}} \\alpha_{\\text{Cu}}}{\\alpha_{\\text{Al}}} = \\frac{88 \\times 1.7 \\times 10^{-5}}{2.2 \\times 10^{-5}} = \\frac{88}{2.2} \\times 1.7 = 40 \\times 1.7 = 68\\text{ cm}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 41,
    exam: 'NEET 2019',
    question: "The unit of thermal conductivity is :",
    options: [
      "$\\text{J m}^{-1}\\text{ K}^{-1}$",
      "$\\text{W m K}^{-1}$",
      "$\\text{J m K}^{-1}$",
      "$\\text{W m}^{-1}\\text{ K}^{-1}$"
    ],
    correctIndex: 3,
    solution: "1. Rate of heat conduction through a material is given by Fourier's law:\n$$\\frac{dQ}{dt} = K A \\frac{\\Delta T}{\\Delta x}$$\n\n2. Solving for thermal conductivity $K$:\n$$K = \\frac{\\frac{dQ}{dt} \\cdot \\Delta x}{A \\cdot \\Delta T}$$\n\n3. Substituting SI units:\n$$[K] = \\frac{\\text{W} \\cdot \\text{m}}{\\text{m}^2 \\cdot \\text{K}} = \\text{W m}^{-1}\\text{ K}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 42,
    exam: 'NEET 2018',
    question: "The power radiated by a black body is $P$ and it radiates maximum energy at wavelength, $\\lambda_0$. If the temperature of the black body is now changed so that it radiates maximum energy at wavelength $\\frac{3}{4}\\lambda_0$, the power radiated by it becomes $nP$. The value of $n$ is",
    options: [
      "$\\frac{3}{4}$",
      "$\\frac{4}{3}$",
      "$\\frac{256}{81}$",
      "$\\frac{81}{256}$"
    ],
    correctIndex: 2,
    solution: "1. By Wien's displacement law:\n$$\\lambda_m T = \\text{constant} \\implies T \\propto \\frac{1}{\\lambda_m}$$\n$$\\frac{T'}{T} = \\frac{\\lambda_0}{\\frac{3}{4}\\lambda_0} = \\frac{4}{3}$$\n\n2. By Stefan-Boltzmann law, radiated power is proportional to $T^4$:\n$$P \\propto T^4$$\n$$\\frac{P'}{P} = \\left(\\frac{T'}{T}\\right)^4 = \\left(\\frac{4}{3}\\right)^4 = \\frac{256}{81}$$\n\n3. Since $P' = nP$, we have:\n$$n = \\frac{256}{81}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 43,
    exam: 'NEET 2018',
    question: "A sample of $0.1\\text{ g}$ of water at $100^\\circ\\text{C}$ and normal pressure ($1.013 \\times 10^5\\text{ N m}^{-2}$) requires $54\\text{ cal}$ of heat energy to convert to steam at $100^\\circ\\text{C}$. If the volume of the steam produced is $167.1\\text{ cc}$, the change in internal energy of the sample, is",
    options: [
      "$104.3\\text{ J}$",
      "$208.7\\text{ J}$",
      "$42.2\\text{ J}$",
      "$84.5\\text{ J}$"
    ],
    correctIndex: 1,
    solution: "1. Heat energy supplied to the water:\n$$Q = 54\\text{ cal} = 54 \\times 4.184\\text{ J} \\approx 226\\text{ J}$$\n\n2. Change in volume during vaporization:\n$$\\Delta V = V_{\\text{steam}} - V_{\\text{water}} = 167.1\\text{ cc} - 0.1\\text{ cc} = 167.0\\text{ cm}^3 = 167.0 \\times 10^{-6}\\text{ m}^3$$\n\n3. Work done against atmospheric pressure:\n$$W = P\\Delta V = 1.013 \\times 10^5\\text{ N m}^{-2} \\times 167.0 \\times 10^{-6}\\text{ m}^3 = 16.92\\text{ J}$$\n\n4. By the First Law of Thermodynamics:\n$$\\Delta U = Q - W = 226\\text{ J} - 16.92\\text{ J} \\approx 208.7\\text{ J}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 44,
    exam: 'NEET 2018',
    question: "The volume ($V$) of a monatomic gas varies with its temperature ($T$), as shown in the graph. The ratio of work done by the gas, to the heat absorbed by it, when it undergoes a change from state A to state B, is\n\n![NEET Heat and Thermodynamics Graph](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315375/edvedum/questions/heat_thermodynamics/thermo_q44_diagram.png)",
    options: [
      "$\\frac{2}{5}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{3}$",
      "$\\frac{2}{7}$"
    ],
    correctIndex: 0,
    solution: "1. The graph shows a straight line passing through the origin in the $V-T$ plane:\n$$V \\propto T \\implies \\frac{V}{T} = \\text{constant}$$\nThis corresponds to an isobaric process ($P = \\text{constant}$).\n\n2. Work done by the gas in an isobaric process:\n$$W = P\\Delta V = nR\\Delta T$$\n\n3. Heat absorbed at constant pressure:\n$$Q = nC_P\\Delta T$$\n\n4. For a monatomic ideal gas, $C_P = \\frac{5}{2}R$:\n$$\\frac{W}{Q} = \\frac{nR\\Delta T}{n C_P \\Delta T} = \\frac{R}{\\frac{5}{2}R} = \\frac{2}{5}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 45,
    exam: 'NEET 2018',
    question: "At what temperature will the rms speed of oxygen molecules become just sufficient for escaping from the Earth's atmosphere? (Given : Mass of oxygen molecule $(m) = 2.76 \\times 10^{-26}\\text{ kg}$, Boltzmann's constant $k_B = 1.38 \\times 10^{-23}\\text{ J K}^{-1}$, escape speed from Earth $= 11.2\\text{ km s}^{-1}$)",
    options: [
      "$2.508 \\times 10^4\\text{ K}$",
      "$8.360 \\times 10^4\\text{ K}$",
      "$5.016 \\times 10^4\\text{ K}$",
      "$1.254 \\times 10^4\\text{ K}$"
    ],
    correctIndex: 1,
    solution: "1. The root-mean-square speed of gas molecules is:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3k_B T}{m}}$$\n\n2. Equating $v_{\\text{rms}}$ to the escape speed $v_e = 11.2\\text{ km/s} = 11.2 \\times 10^3\\text{ m/s}$:\n$$\\frac{3k_B T}{m} = v_e^2 \\implies T = \\frac{m v_e^2}{3k_B}$$\n\n3. Substituting the given values:\n$$T = \\frac{(2.76 \\times 10^{-26}) \\times (11.2 \\times 10^3)^2}{3 \\times (1.38 \\times 10^{-23})}$$\n$$T = \\frac{2.76 \\times 10^{-26} \\times 1.2544 \\times 10^8}{4.14 \\times 10^{-23}} = \\frac{3.462 \\times 10^{-18}}{4.14 \\times 10^{-23}} \\approx 8.360 \\times 10^4\\text{ K}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 46,
    exam: 'NEET 2017',
    question: "Two rods A and B of different materials are welded together as shown in figure. Their thermal conductivities are $K_1$ and $K_2$. The thermal conductivity of the composite will be\n\n![NEET Heat and Thermodynamics Composite Rod](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315376/edvedum/questions/heat_thermodynamics/thermo_q46_diagram.png)",
    options: [
      "$\\frac{3(K_1 + K_2)}{2}$",
      "$K_1 + K_2$",
      "$2(K_1 + K_2)$",
      "$\\frac{K_1 + K_2}{2}$"
    ],
    correctIndex: 3,
    solution: "1. The two rods are connected in parallel between temperatures $T_1$ and $T_2$ because their ends are at the same temperatures.\n\n2. For parallel combination of two slabs of identical length $d$ and identical cross-sectional area $A$:\n$$H_{\\text{total}} = H_1 + H_2$$\n$$\\frac{K_{\\text{eq}} (2A)(T_1 - T_2)}{d} = \\frac{K_1 A(T_1 - T_2)}{d} + \\frac{K_2 A(T_1 - T_2)}{d}$$\n\n3. Simplifying:\n$$2K_{\\text{eq}} = K_1 + K_2 \\implies K_{\\text{eq}} = \\frac{K_1 + K_2}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 47,
    exam: 'NEET 2017',
    question: "A spherical black body with a radius of $12\\text{ cm}$ radiates $450\\text{ watt}$ power at $500\\text{ K}$. If the radius were halved and the temperature doubled, the power radiated in watt would be",
    options: [
      "$450$",
      "$1000$",
      "$1800$",
      "$225$"
    ],
    correctIndex: 2,
    solution: "1. Radiated power from a spherical black body of radius $R$ at temperature $T$ is given by Stefan-Boltzmann law:\n$$P = \\sigma A T^4 = \\sigma (4\\pi R^2) T^4 \\propto R^2 T^4$$\n\n2. If the radius is halved ($R' = R/2$) and temperature is doubled ($T' = 2T$):\n$$P' \\propto (R')^2 (T')^4 = \\left(\\frac{R}{2}\\right)^2 (2T)^4 = \\frac{R^2}{4} \\times 16 T^4 = 4 R^2 T^4 = 4P$$\n\n3. Substituting $P = 450\\text{ W}$:\n$$P' = 4 \\times 450\\text{ W} = 1800\\text{ W}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 48,
    exam: 'NEET 2017',
    question: "Thermodynamic processes are indicated in the following diagram.\n\n![NEET Thermodynamic Processes Diagram](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315376/edvedum/questions/heat_thermodynamics/thermo_q48_diagram.png)\n\nMatch the following:\n| Column-1 | Column-2 |\n| :--- | :--- |\n| P. Process I | A. Adiabatic |\n| Q. Process II | B. Isobaric |\n| R. Process III | C. Isochoric |\n| S. Process IV | D. Isothermal |",
    options: [
      "$\\text{P} \\to \\text{C}, \\text{Q} \\to \\text{A}, \\text{R} \\to \\text{D}, \\text{S} \\to \\text{B}$",
      "$\\text{P} \\to \\text{C}, \\text{Q} \\to \\text{D}, \\text{R} \\to \\text{B}, \\text{S} \\to \\text{A}$",
      "$\\text{P} \\to \\text{D}, \\text{Q} \\to \\text{B}, \\text{R} \\to \\text{A}, \\text{S} \\to \\text{C}$",
      "$\\text{P} \\to \\text{A}, \\text{Q} \\to \\text{C}, \\text{R} \\to \\text{D}, \\text{S} \\to \\text{B}$"
    ],
    correctIndex: 0,
    solution: "1. Identifying each process from the $P-V$ diagram:\n- Process I: Vertical line where volume remains constant $\\implies$ Isochoric (C).\n- Process IV: Horizontal line where pressure remains constant $\\implies$ Isobaric (B).\n- Between Process II and Process III: Both curves slope downwards. An adiabatic curve is steeper than an isothermal curve (slope of adiabatic $= \\gamma \\times$ slope of isothermal). Thus, the steeper curve II is Adiabatic (A), and the less steep curve III which stays on the $500\\text{ K}$ isotherm is Isothermal (D).\n\n2. Therefore:\n$$\\text{P} \\to \\text{C}, \\text{Q} \\to \\text{A}, \\text{R} \\to \\text{D}, \\text{S} \\to \\text{B}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 49,
    exam: 'NEET 2017',
    question: "A gas mixture consists of $2\\text{ moles}$ of $\\text{O}_2$ and $4\\text{ moles}$ of $\\text{Ar}$ at temperature $T$. Neglecting all vibrational modes, the total internal energy of the system is",
    options: [
      "$15\\text{ }RT$",
      "$9\\text{ }RT$",
      "$11\\text{ }RT$",
      "$4\\text{ }RT$"
    ],
    correctIndex: 2,
    solution: "1. Oxygen ($\\text{O}_2$) is a diatomic gas ($f = 5$):\n$$U_1 = n_1 C_{V1} T = 2 \\times \\left(\\frac{5}{2}RT\\right) = 5RT$$\n\n2. Argon ($\\text{Ar}$) is a monatomic gas ($f = 3$):\n$$U_2 = n_2 C_{V2} T = 4 \\times \\left(\\frac{3}{2}RT\\right) = 6RT$$\n\n3. Total internal energy of the mixture:\n$$U = U_1 + U_2 = 5RT + 6RT = 11RT$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 50,
    exam: 'NEET 2016 Phase 2',
    question: "Two identical bodies are made of a material for which the heat capacity increases with temperature. One of these is at $100^\\circ\\text{C}$, while the other one is at $0^\\circ\\text{C}$. If the two bodies are brought into contact, then, assuming no heat loss, the final common temperature is",
    options: [
      "$50^\\circ\\text{C}$",
      "more than $50^\\circ\\text{C}$",
      "less than $50^\\circ\\text{C}$ but greater than $0^\\circ\\text{C}$",
      "$0^\\circ\\text{C}$"
    ],
    correctIndex: 1,
    solution: "1. Let $T_f$ be the final equilibrium temperature. Heat lost by the hot body must equal heat gained by the cold body:\n$$\\int_{T_f}^{100} C(T)\\,dT = \\int_0^{T_f} C(T)\\,dT$$\n\n2. Since heat capacity $C(T)$ increases with temperature, $C(T)$ is greater at higher temperatures (between $T_f$ and $100^\\circ\\text{C}$) than at lower temperatures (between $0^\\circ\\text{C}$ and $T_f$).\n\n3. For the integrals to be equal, the temperature drop $(100 - T_f)$ must be smaller than the temperature rise $(T_f - 0)$:\n$$100 - T_f < T_f - 0 \\implies 2T_f > 100 \\implies T_f > 50^\\circ\\text{C}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 51,
    exam: 'NEET 2016 Phase 2',
    question: "A body cools from a temperature $3T$ to $2T$ in $10\\text{ minutes}$. The room temperature is $T$. Assume that Newton's law of cooling is applicable. The temperature of the body at the end of next $10\\text{ minutes}$ will be",
    options: [
      "$\\frac{7}{4}T$",
      "$\\frac{3}{2}T$",
      "$\\frac{4}{3}T$",
      "$T$"
    ],
    correctIndex: 1,
    solution: "1. According to Newton's law of cooling:\n$$\\frac{dT}{dt} = -k(T - T_0) \\implies \\ln\\left(\\frac{T - T_0}{T_i - T_0}\\right) = -kt$$\n$$\\frac{T(t) - T_0}{T_i - T_0} = e^{-kt}$$\n\n2. For the first $10\\text{ minutes}$ ($t = 10\\text{ min}$):\nInitial temp $= 3T$, final temp $= 2T$, surrounding temp $T_0 = T$:\n$$\\frac{2T - T}{3T - T} = e^{-10k} \\implies \\frac{T}{2T} = \\frac{1}{2} = e^{-10k}$$\n\n3. For the next $10\\text{ minutes}$ (total time $t = 20\\text{ min}$):\n$$\\frac{T' - T}{3T - T} = e^{-20k} = \\left(e^{-10k}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$$\n$$\\frac{T' - T}{2T} = \\frac{1}{4} \\implies T' - T = \\frac{T}{2} \\implies T' = T + \\frac{T}{2} = \\frac{3}{2}T$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 52,
    exam: 'NEET 2016 Phase 2',
    question: "One mole of an ideal monatomic gas undergoes a process described by the equation $PV^3 = \\text{constant}$. The heat capacity of the gas during this process is",
    options: [
      "$\\frac{3}{2}R$",
      "$\\frac{5}{2}R$",
      "$2R$",
      "$R$"
    ],
    correctIndex: 3,
    solution: "1. For a polytropic process $PV^x = \\text{constant}$, the molar heat capacity is:\n$$C = C_V + \\frac{R}{1 - x}$$\n\n2. Here $x = 3$. For a monatomic gas, $C_V = \\frac{3}{2}R$:\n$$C = \\frac{3}{2}R + \\frac{R}{1 - 3} = \\frac{3}{2}R - \\frac{R}{2} = R$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 53,
    exam: 'NEET 2016 Phase 2',
    question: "A given sample of an ideal gas occupies a volume $V$ at a pressure $P$ and absolute temperature $T$. The mass of each molecule of the gas is $m$. Which of the following gives the density of the gas ?",
    options: [
      "$P/(kT)$",
      "$Pm/(kT)$",
      "$P/(kTV)$",
      "$mkT$"
    ],
    correctIndex: 1,
    solution: "1. The ideal gas law in terms of number density $n$ and Boltzmann constant $k$ is:\n$$P = n k T = \\frac{N}{V} k T$$\n\n2. Total mass of the gas is $M_{\\text{total}} = N m$. Density $\\rho$ is:\n$$\\rho = \\frac{M_{\\text{total}}}{V} = \\frac{N m}{V} = n m$$\n\n3. Since $n = \\frac{P}{k T}$:\n$$\\rho = \\frac{P m}{k T}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 54,
    exam: 'NEET 2016 Phase 1',
    question: "Coefficient of linear expansion of brass and steel rods are $\\alpha_1$ and $\\alpha_2$. Lengths of brass and steel rods are $l_1$ and $l_2$ respectively. If $(l_1 - l_2)$ is maintained same at all temperatures, which one of the following relations holds good?",
    options: [
      "$\\alpha_1 l_2 = \\alpha_2^2 l_1$",
      "$\\alpha_1 l_1 = \\alpha_2 l_2$",
      "$\\alpha_1 l_2 = \\alpha_2 l_1$",
      "$\\alpha_1 l_2^2 = \\alpha_2 l_1^2$"
    ],
    correctIndex: 1,
    solution: "1. The difference in lengths $(l_1 - l_2)$ is constant at all temperatures:\n$$\\Delta(l_1 - l_2) = 0 \\implies \\Delta l_1 - \\Delta l_2 = 0$$\n$$\\Delta l_1 = \\Delta l_2$$\n\n2. Substituting thermal expansion expressions:\n$$l_1 \\alpha_1 \\Delta T = l_2 \\alpha_2 \\Delta T$$\n$$\\alpha_1 l_1 = \\alpha_2 l_2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 55,
    exam: 'NEET 2016 Phase 1',
    question: "A piece of ice falls from a height $h$ so that it melts completely. Only one-quarter of the heat produced is absorbed by the ice and all energy of ice gets converted into heat during its fall. The value of $h$ [Latent heat of ice is $3.4 \\times 10^5\\text{ J/kg}$ and $g = 10\\text{ N/kg}$]",
    options: [
      "$136\\text{ km}$",
      "$68\\text{ km}$",
      "$34\\text{ km}$",
      "$544\\text{ km}$"
    ],
    correctIndex: 0,
    solution: "1. Gravitational potential energy converted into heat during the fall:\n$$E = mgh$$\n\n2. Heat absorbed by the ice is one-quarter of the total heat produced:\n$$Q = \\frac{1}{4} E = \\frac{1}{4} mgh$$\n\n3. This heat completely melts the ice mass $m$:\n$$Q = m L_f \\implies \\frac{1}{4} mgh = m L_f$$\n$$h = \\frac{4 L_f}{g}$$\n\n4. Substituting $L_f = 3.4 \\times 10^5\\text{ J/kg}$ and $g = 10\\text{ m/s}^2$:\n$$h = \\frac{4 \\times 3.4 \\times 10^5}{10} = 1.36 \\times 10^5\\text{ m} = 136\\text{ km}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 56,
    exam: 'NEET 2016 Phase 1',
    question: "A black body is at a temperature of $5760\\text{ K}$. The energy of radiation emitted by the body at wavelength $250\\text{ nm}$ is $U_1$, at wavelength $500\\text{ nm}$ is $U_2$ and that at $1000\\text{ nm}$ is $U_3$. Wien's constant, $b = 2.88 \\times 10^6\\text{ nm K}$. Which of the following is correct ?",
    options: [
      "$U_1 > U_2$",
      "$U_2 > U_1$",
      "$U_1 = 0$",
      "$U_3 = 0$"
    ],
    correctIndex: 1,
    solution: "1. According to Wien's displacement law, the wavelength corresponding to maximum spectral emissive power is:\n$$\\lambda_m = \\frac{b}{T} = \\frac{2.88 \\times 10^6\\text{ nm K}}{5760\\text{ K}} = 500\\text{ nm}$$\n\n2. Therefore, spectral energy density is peak at $\\lambda = 500\\text{ nm}$ ($U_2$).\n\n3. For any other wavelength $\\lambda \\neq \\lambda_m$, the spectral energy density is less than the peak value:\n$$U_2 > U_1 \\quad \\text{and} \\quad U_2 > U_3$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 57,
    exam: 'NEET 2016 Phase 1',
    question: "A gas is compressed isothermally to half its initial volume. The same gas is compressed separately through an adiabatic process until its volume is again reduced to half. Then",
    options: [
      "Compressing the gas isothermally or adiabatically will require the same amount of work.",
      "Which of the case (whether compression through isothermal or through adiabatic process) requires more work will depend upon the atomicity of the gas.",
      "Compressing the gas isothermally will require more work to be done.",
      "Compressing the gas through adiabatic process will require more work to be done."
    ],
    correctIndex: 3,
    solution: "1. In compression from initial volume $V_i$ to final volume $V_f = V_i / 2$, work done on the gas equals the area under the $P-V$ curve from $V_f$ to $V_i$.\n\n2. Since the slope of an adiabatic curve is steeper than that of an isothermal curve ($|dP/dV|_{\\text{adia}} = \\gamma |dP/dV|_{\\text{iso}}$ with $\\gamma > 1$):\n$$P_{\\text{adia}}(V) > P_{\\text{iso}}(V) \\quad \\text{for all } V < V_i$$\n\n3. Consequently, the area under the adiabatic curve during compression is greater than that under the isothermal curve:\n$$W_{\\text{ext, adia}} > W_{\\text{ext, iso}}$$\n\nHence, compressing through an adiabatic process requires more work to be done.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 58,
    exam: 'NEET 2016 Phase 1',
    question: "The molecules of a given mass of a gas have r.m.s. velocity of $200\\text{ m s}^{-1}$ at $27^\\circ\\text{C}$ and $1.0 \\times 10^5\\text{ N m}^{-2}$ pressure. When the temperature and pressure of the gas are respectively, $127^\\circ\\text{C}$ and $0.05 \\times 10^5\\text{ N m}^{-2}$, the r.m.s. velocity of its molecules in $\\text{m s}^{-1}$ is",
    options: [
      "$\\frac{100\\sqrt{2}}{3}$",
      "$\\frac{100}{3}$",
      "$100\\sqrt{2}$",
      "$\\frac{400}{\\sqrt{3}}$"
    ],
    correctIndex: 3,
    solution: "1. The root-mean-square velocity of gas molecules depends only on absolute temperature and molar mass:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\implies v_{\\text{rms}} \\propto \\sqrt{T}$$\n(Independent of pressure as long as temperature is fixed).\n\n2. Given:\n- $T_1 = 27^\\circ\\text{C} = 300\\text{ K}$, $v_1 = 200\\text{ m/s}$\n- $T_2 = 127^\\circ\\text{C} = 400\\text{ K}$\n\n3. Taking the ratio:\n$$\\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}} = \\sqrt{\\frac{400}{300}} = \\frac{2}{\\sqrt{3}}$$\n$$v_2 = 200 \\times \\frac{2}{\\sqrt{3}} = \\frac{400}{\\sqrt{3}}\\text{ m s}^{-1}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 59,
    exam: 'AIPMT 2015',
    question: "The value of coefficient of volume expansion of glycerin is $5 \\times 10^{-4}\\text{ K}^{-1}$. The fractional change in the density of glycerin for a rise of $40^\\circ\\text{C}$ in its temperature, is",
    options: [
      "$0.025$",
      "$0.010$",
      "$0.015$",
      "$0.020$"
    ],
    correctIndex: 3,
    solution: "1. Density as a function of temperature is given by:\n$$\\rho(T) = \\frac{\\rho_0}{1 + \\gamma \\Delta T} \\approx \\rho_0(1 - \\gamma \\Delta T)$$\n\n2. Fractional change in density:\n$$\\frac{|\\Delta\\rho|}{\\rho_0} = \\gamma \\Delta T$$\n\n3. Substituting $\\gamma = 5 \\times 10^{-4}\\text{ K}^{-1}$ and $\\Delta T = 40^\\circ\\text{C} = 40\\text{ K}$:\n$$\\frac{\\Delta\\rho}{\\rho_0} = (5 \\times 10^{-4}) \\times 40 = 200 \\times 10^{-4} = 0.020$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 60,
    exam: 'AIPMT 2015',
    question: "An ideal gas is compressed to half its initial volume by means of several processes. Which of the process results in the maximum work done on the gas ?",
    options: [
      "Isochoric",
      "Isothermal",
      "Adiabatic",
      "Isobaric"
    ],
    correctIndex: 2,
    solution: "1. Work done on the gas during compression from $V$ to $V/2$ is given by the area under the $P-V$ diagram:\n$$W = -\\int_V^{V/2} P\\,dV = \\int_{V/2}^V P\\,dV$$\n\n2. In an isochoric process, volume does not change, so no compression can occur ($W = 0$).\n\n3. For isobaric, isothermal, and adiabatic compressions starting from the same initial state $(P_i, V_i)$:\n- Isobaric curve is horizontal ($P = P_i$).\n- Isothermal curve rises as $P \\propto 1/V$.\n- Adiabatic curve rises most steeply as $P \\propto 1/V^\\gamma$ where $\\gamma > 1$.\n\n4. Therefore, at every intermediate volume, $P_{\\text{adia}} > P_{\\text{iso}} > P_{\\text{isobar}}$. Consequently, the area under the curve is maximum for the adiabatic process.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 61,
    exam: 'AIPMT 2015',
    question: "Two vessels separately contain two ideal gases A and B at the same temperature, the pressure of A being twice that of B. Under such conditions, the density of A is found to be $1.5$ times the density of B. The ratio of molecular weight of A and B is",
    options: [
      "$2$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{3}$",
      "$\\frac{3}{4}$"
    ],
    correctIndex: 3,
    solution: "1. From the ideal gas equation $PV = nRT = \\frac{m}{M}RT$:\n$$P = \\frac{\\rho RT}{M} \\implies M = \\frac{\\rho RT}{P}$$\n\n2. At the same temperature $T$:\n$$\\frac{M_A}{M_B} = \\left(\\frac{\\rho_A}{\\rho_B}\\right) \\left(\\frac{P_B}{P_A}\\right)$$\n\n3. Given: $P_A = 2P_B \\implies \\frac{P_B}{P_A} = \\frac{1}{2}$, and $\\rho_A = 1.5\\rho_B \\implies \\frac{\\rho_A}{\\rho_B} = \\frac{3}{2}$:\n$$\\frac{M_A}{M_B} = \\frac{3}{2} \\times \\frac{1}{2} = \\frac{3}{4}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 62,
    exam: 'AIPMT 2015',
    question: "4.0 g of a gas occupies 22.4 litres at NTP. The specific heat capacity of the gas at constant volume is $5.0\\text{ J K}^{-1}\\text{ mol}^{-1}$. If the speed of sound in this gas at NTP is $952\\text{ m s}^{-1}$, then the heat capacity at constant pressure is (Take gas constant $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$)",
    options: [
      "$7.0\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$8.5\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$8.0\\text{ J K}^{-1}\\text{ mol}^{-1}$",
      "$7.5\\text{ J K}^{-1}\\text{ mol}^{-1}$"
    ],
    correctIndex: 2,
    solution: "1. At NTP, $1\\text{ mole}$ of an ideal gas occupies $22.4\\text{ litres}$. Since $4.0\\text{ g}$ occupies $22.4\\text{ L}$, the molar mass of the gas is:\n$$M = 4.0\\text{ g/mol} = 4.0 \\times 10^{-3}\\text{ kg/mol}$$\n\n2. Speed of sound in an ideal gas is given by Laplace's formula:\n$$v = \\sqrt{\\frac{\\gamma RT}{M}} \\implies \\gamma = \\frac{v^2 M}{RT}$$\n\n3. Substituting $v = 952\\text{ m/s}$, $T = 273\\text{ K}$, $R = 8.3\\text{ J K}^{-1}\\text{ mol}^{-1}$, $M = 4 \\times 10^{-3}\\text{ kg/mol}$:\n$$\\gamma = \\frac{(952)^2 \\times 4 \\times 10^{-3}}{8.3 \\times 273} = \\frac{906304 \\times 4 \\times 10^{-3}}{2265.9} = \\frac{3625.2}{2265.9} \\approx 1.6$$\n\n4. Given $C_V = 5.0\\text{ J K}^{-1}\\text{ mol}^{-1}$:\n$$C_P = \\gamma C_V = 1.6 \\times 5.0 = 8.0\\text{ J K}^{-1}\\text{ mol}^{-1}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 63,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "On observing light from three different stars P, Q and R, it was found that intensity of violet colour is maximum in the spectrum of P, the intensity of green colour is maximum in the spectrum of R and the intensity of red colour is maximum in the spectrum of Q. If $T_P$, $T_Q$ and $T_R$ are the respective absolute temperatures of P, Q and R, then it can be concluded from the above observations that",
    options: [
      "$T_P < T_R < T_Q$",
      "$T_P < T_Q < T_R$",
      "$T_P > T_Q > T_R$",
      "$T_P > T_R > T_Q$"
    ],
    correctIndex: 3,
    solution: "1. According to Wien's displacement law:\n$$\\lambda_m T = b \\implies T \\propto \\frac{1}{\\lambda_m}$$\n\n2. The wavelengths of the visible spectrum follow the order:\n$$\\lambda_{\\text{violet}} < \\lambda_{\\text{green}} < \\lambda_{\\text{red}}$$\n$$\\lambda_P < \\lambda_R < \\lambda_Q$$\n\n3. Since temperature is inversely proportional to peak wavelength:\n$$T_P > T_R > T_Q$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 64,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "The ratio of the specific heats $\\frac{C_p}{C_v} = \\gamma$ in terms of degrees of freedom ($n$) is given by",
    options: [
      "$\\left(1 + \\frac{2}{n}\\right)$",
      "$\\left(1 + \\frac{n}{2}\\right)$",
      "$\\left(1 + \\frac{1}{n}\\right)$",
      "$\\left(1 + \\frac{n}{3}\\right)$"
    ],
    correctIndex: 0,
    solution: "1. For a gas with $n$ degrees of freedom:\n- Molar heat capacity at constant volume: $C_v = \\frac{n}{2}R$\n- Molar heat capacity at constant pressure: $C_p = C_v + R = \\left(\\frac{n}{2} + 1\\right)R$\n\n2. The ratio of specific heats is:\n$$\\gamma = \\frac{C_p}{C_v} = \\frac{\\left(\\frac{n}{2} + 1\\right)R}{\\frac{n}{2}R} = 1 + \\frac{2}{n}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 65,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "One mole of an ideal diatomic gas undergoes a transition from A to B along a path AB as shown in the figure. The change in internal energy of the gas during the transition is\n\n![NEET Diatomic Gas PV Transition](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315378/edvedum/questions/heat_thermodynamics/thermo_q65_diagram.png)",
    options: [
      "$20\\text{ J}$",
      "$-12\\text{ kJ}$",
      "$20\\text{ kJ}$",
      "$-20\\text{ kJ}$"
    ],
    correctIndex: 3,
    solution: "1. For an ideal diatomic gas, the molar heat capacity at constant volume is:\n$$C_V = \\frac{5}{2}R$$\n\n2. Change in internal energy depends only on initial and final states:\n$$\\Delta U = n C_V \\Delta T = n \\left(\\frac{5}{2}R\\right)(T_B - T_A) = \\frac{5}{2}(nRT_B - nRT_A) = \\frac{5}{2}(P_B V_B - P_A V_A)$$\n\n3. From the graph:\n- State A: $P_A = 5\\text{ kPa} = 5 \\times 10^3\\text{ Pa}$, $V_A = 4\\text{ m}^3$\n- State B: $P_B = 2\\text{ kPa} = 2 \\times 10^3\\text{ Pa}$, $V_B = 6\\text{ m}^3$\n\n4. Substituting values:\n$$P_A V_A = 5 \\times 10^3 \\times 4 = 20 \\times 10^3\\text{ J} = 20\\text{ kJ}$$\n$$P_B V_B = 2 \\times 10^3 \\times 6 = 12 \\times 10^3\\text{ J} = 12\\text{ kJ}$$\n$$\\Delta U = \\frac{5}{2}(12 - 20)\\text{ kJ} = \\frac{5}{2}(-8)\\text{ kJ} = -20\\text{ kJ}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 66,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "Figure below shows two paths that may be taken by a gas to go from a state A to a state C. In process AB, 400 J of heat is added to the system and in process BC, 100 J of heat is added to the system. The heat absorbed by the system in the process AC will be\n\n![NEET Thermodynamic Paths AC Diagram](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315379/edvedum/questions/heat_thermodynamics/thermo_q66_diagram.png)",
    options: [
      "$460\\text{ J}$",
      "$300\\text{ J}$",
      "$380\\text{ J}$",
      "$500\\text{ J}$"
    ],
    correctIndex: 0,
    solution: "1. For path $AB$ (isochoric process, $V = 2 \\times 10^{-3}\\text{ m}^3$):\n$$W_{AB} = 0 \\implies \\Delta U_{AB} = Q_{AB} = 400\\text{ J}$$\n\n2. For path $BC$ (isobaric process, $P = 6 \\times 10^4\\text{ Pa}$):\n$$W_{BC} = P\\Delta V = (6 \\times 10^4\\text{ Pa})(4 - 2) \\times 10^{-3}\\text{ m}^3 = 120\\text{ J}$$\n$$\\Delta U_{BC} = Q_{BC} - W_{BC} = 100\\text{ J} - 120\\text{ J} = -20\\text{ J}$$\n\n3. Internal energy is a state function, so for path $AC$:\n$$\\Delta U_{AC} = \\Delta U_{AB} + \\Delta U_{BC} = 400\\text{ J} + (-20\\text{ J}) = 380\\text{ J}$$\n\n4. Work done along direct path $AC$ (area of trapezium under line $AC$):\n$$W_{AC} = \\frac{1}{2}(P_A + P_C)(V_C - V_A) = \\frac{1}{2}(2 \\times 10^4 + 6 \\times 10^4)(4 - 2) \\times 10^{-3} = \\frac{1}{2}(8 \\times 10^4)(2 \\times 10^{-3}) = 80\\text{ J}$$\n\n5. By the First Law of Thermodynamics for path $AC$:\n$$Q_{AC} = \\Delta U_{AC} + W_{AC} = 380\\text{ J} + 80\\text{ J} = 460\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 67,
    exam: 'AIPMT 2014',
    question: "A monatomic gas at a pressure P, having a volume V expands isothermally to a volume 2V and then adiabatically to a volume 16V. The final pressure of the gas is (Take $\\gamma = 5/3$)",
    options: [
      "$64P$",
      "$32P$",
      "$P/64$",
      "$16P$"
    ],
    correctIndex: 2,
    solution: "1. Step 1: Isothermal expansion from $(P, V)$ to volume $2V$:\n$$P_1 V_1 = P_2 V_2 \\implies P \\times V = P' \\times (2V) \\implies P' = \\frac{P}{2}$$\n\n2. Step 2: Adiabatic expansion from $(P', 2V)$ to volume $16V$:\n$$P' (2V)^\\gamma = P_f (16V)^\\gamma$$\n$$P_f = P' \\left(\\frac{2V}{16V}\\right)^\\gamma = \\frac{P}{2} \\left(\\frac{1}{8}\\right)^{5/3}$$\n\n3. Since $\\left(\\frac{1}{8}\\right)^{1/3} = \\frac{1}{2}$, we have:\n$$\\left(\\frac{1}{8}\\right)^{5/3} = \\left(\\frac{1}{2}\\right)^5 = \\frac{1}{32}$$\n$$P_f = \\frac{P}{2} \\times \\frac{1}{32} = \\frac{P}{64}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 68,
    exam: 'AIPMT 2014',
    question: "A thermodynamic system undergoes cyclic process ABCDA as shown in figure. The work done by the system in the cycle is\n\n![NEET Thermodynamic Cyclic Process ABCDA](https://res.cloudinary.com/fyxpnmdh/image/upload/v1794315380/edvedum/questions/heat_thermodynamics/thermo_q68_diagram.png)",
    options: [
      "$P_0 V_0$",
      "$2P_0 V_0$",
      "$\\frac{P_0 V_0}{2}$",
      "zero"
    ],
    correctIndex: 3,
    solution: "1. The cyclic process consists of two triangular loops meeting at the intersection point $(2P_0, 1.5V_0)$:\n- Upper loop: traversed anticlockwise or clockwise?\nLooking at the arrows:\nUpper loop $C \\to$ intersection $\\to B \\to C$: traversed in counter-clockwise direction, so work done is negative:\n$$W_1 = -\\frac{1}{2} \\times \\text{base} \\times \\text{height} = -\\frac{1}{2}(2V_0 - V_0)(3P_0 - 2P_0) = -\\frac{1}{2}P_0 V_0$$\n- Lower loop: intersection $\\to D \\to A \\to$ intersection: traversed in clockwise direction, so work done is positive:\n$$W_2 = +\\frac{1}{2} \\times \\text{base} \\times \\text{height} = +\\frac{1}{2}(2V_0 - V_0)(2P_0 - P_0) = +\\frac{1}{2}P_0 V_0$$\n\n2. Net work done in the entire cycle:\n$$W_{\\text{net}} = W_1 + W_2 = -\\frac{1}{2}P_0 V_0 + \\frac{1}{2}P_0 V_0 = 0$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 69,
    exam: 'AIPMT 2014',
    question: "The mean free path of molecules of a gas, (radius r) is inversely proportional to",
    options: [
      "$r^3$",
      "$r^2$",
      "$r$",
      "$\\sqrt{r}$"
    ],
    correctIndex: 1,
    solution: "1. The mean free path $\\lambda$ of molecules of an ideal gas is given by:\n$$\\lambda = \\frac{1}{\\sqrt{2} \\pi n d^2}$$\nwhere $n$ is number density and $d = 2r$ is the molecular diameter.\n\n2. In terms of radius $r$:\n$$\\lambda = \\frac{1}{\\sqrt{2}\\pi n (2r)^2} = \\frac{1}{4\\sqrt{2}\\pi n r^2} \\propto \\frac{1}{r^2}$$\n\nHence, the mean free path is inversely proportional to $r^2$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 70,
    exam: 'NEET 2013 (Karnataka)',
    question: "Two metal rods 1 and 2 of same lengths have same temperature difference between their ends. Their thermal conductivities are $K_1$ and $K_2$ and cross sectional areas $A_1$ and $A_2$, respectively. If the rate of heat conduction in 1 is four times that in 2, then",
    options: [
      "$K_1 A_1 = 4K_2 A_2$",
      "$K_1 A_1 = 2K_2 A_2$",
      "$4K_1 A_1 = K_2 A_2$",
      "$K_1 A_1 = K_2 A_2$"
    ],
    correctIndex: 0,
    solution: "1. Rate of heat conduction through a rod of length $L$, area $A$, and thermal conductivity $K$ with temperature difference $\\Delta T$ is:\n$$H = \\frac{dQ}{dt} = \\frac{K A \\Delta T}{L}$$\n\n2. Given: $L_1 = L_2 = L$, $\\Delta T_1 = \\Delta T_2 = \\Delta T$, and $H_1 = 4H_2$:\n$$\\frac{K_1 A_1 \\Delta T}{L} = 4 \\left(\\frac{K_2 A_2 \\Delta T}{L}\\right)$$\n\n3. Cancelling the common factors $\\frac{\\Delta T}{L}$:\n$$K_1 A_1 = 4K_2 A_2$$\n\nHence, the correct option is (A)."
  }
];
