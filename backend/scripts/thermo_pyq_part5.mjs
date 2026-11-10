// NEET Heat and Thermodynamics PYQ Part 5: Q141 to Q163
import fs from 'fs';

const jsonPath = fs.existsSync('backend/scripts/thermo_diagram_urls.json')
  ? 'backend/scripts/thermo_diagram_urls.json'
  : 'scripts/thermo_diagram_urls.json';
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const THERMO_PYQ_PART5 = [
  {
    qNum: 141,
    exam: 'AIPMT 1989',
    question: "At constant volume temperature is increased then",
    options: [
      "collision on walls will be less",
      "number of collisions per unit time will increase",
      "collisions will be in straight lines",
      "collisions will not change"
    ],
    correctIndex: 1,
    solution: "1. According to the kinetic molecular theory of gases, the root-mean-square speed of gas molecules is directly proportional to the square root of absolute temperature:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3k_B T}{m}} \\propto \\sqrt{T}$$\n\n2. When temperature is increased at constant volume, molecular speed increases, causing gas molecules to strike the container walls more frequently per unit time.\n\n3. Therefore, the number of collisions per unit time will increase (which also leads to an increase in pressure).\n\nHence, the correct option is (B)."
  },
  {
    qNum: 142,
    exam: 'AIPMT 1988',
    question: "10 gm of ice cubes at $0^\\circ\\text{C}$ are released in a tumbler (water equivalent 55 g) at $40^\\circ\\text{C}$. Assuming that negligible heat is taken from the surroundings, the temperature of water in the tumbler becomes nearly ($L = 80\\text{ cal/g}$)",
    options: [
      "$31^\\circ\\text{C}$",
      "$22^\\circ\\text{C}$",
      "$19^\\circ\\text{C}$",
      "$15^\\circ\\text{C}$"
    ],
    correctIndex: 1,
    solution: "1. Let $\\theta^\\circ\\text{C}$ be the final equilibrium temperature of the mixture.\n\n2. Heat gained by $10\\text{ g}$ of ice to melt at $0^\\circ\\text{C}$ and then warm up to $\\theta^\\circ\\text{C}$:\n$$Q_{\\text{gain}} = m_{\\text{ice}} L_f + m_{\\text{ice}} c_w (\\theta - 0) = (10 \\times 80) + (10 \\times 1 \\times \\theta) = 800 + 10\\theta$$\n\n3. Heat lost by the tumbler of water equivalent $W = 55\\text{ g}$ cooling from $40^\\circ\\text{C}$ to $\\theta^\\circ\\text{C}$:\n$$Q_{\\text{lost}} = W c_w (40 - \\theta) = 55 \\times 1 \\times (40 - \\theta) = 2200 - 55\\theta$$\n\n4. By the principle of calorimetry ($Q_{\\text{gain}} = Q_{\\text{lost}}$):\n$$800 + 10\\theta = 2200 - 55\\theta$$\n$$65\\theta = 1400 \\implies \\theta = \\frac{1400}{65} \\approx 21.54^\\circ\\text{C} \\approx 22^\\circ\\text{C}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 143,
    exam: 'AIPMT 1988',
    question: "Two containers A and B are partly filled with water and closed. The volume of A is twice that of B and it contains half the amount of water in B. If both are at the same temperature, the water vapour in the containers will have pressure in the ratio of",
    options: [
      "$1 : 2$",
      "$1 : 1$",
      "$2 : 1$",
      "$4 : 1$"
    ],
    correctIndex: 1,
    solution: "1. In closed containers partly filled with liquid water, dynamic equilibrium is established between evaporation and condensation.\n\n2. The saturated vapour pressure (SVP) of water depends solely on the temperature of the system and is independent of the container volume or the quantity of liquid water present.\n\n3. Since both containers are maintained at the same temperature, their saturated water vapour pressures are identical, giving a pressure ratio of $1 : 1$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 144,
    exam: 'AIPMT 1988',
    question: "First law of thermodynamics is consequence of conservation of",
    options: [
      "work",
      "energy",
      "heat",
      "all of these"
    ],
    correctIndex: 1,
    solution: "1. The First Law of Thermodynamics is mathematically stated as:\n$$\\Delta Q = \\Delta U + \\Delta W$$\n\n2. It asserts that the heat supplied to a system is used partly to increase its internal energy and partly to perform work against external forces.\n\n3. It is a direct consequence of the universal law of conservation of energy.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 145,
    exam: 'NEET 2023',
    question: "A Carnot engine has an efficiency of 50% when its source is at a temperature $327^\\circ\\text{C}$. The temperature of the sink is :-",
    options: [
      "$15^\\circ\\text{C}$",
      "$100^\\circ\\text{C}$",
      "$200^\\circ\\text{C}$",
      "$27^\\circ\\text{C}$"
    ],
    correctIndex: 3,
    solution: "1. The efficiency of a Carnot engine is given by:\n$$\\eta = 1 - \\frac{T_2}{T_1}$$\nwhere $T_1$ is source temperature and $T_2$ is sink temperature in Kelvin.\n\n2. Given: $\\eta = 50\\% = 0.5$, and $T_1 = 327 + 273 = 600\\text{ K}$:\n$$0.5 = 1 - \\frac{T_2}{600} \\implies \\frac{T_2}{600} = 0.5$$\n$$T_2 = 600 \\times 0.5 = 300\\text{ K}$$\n\n3. Converting to Celsius:\n$$T_2 = 300 - 273 = 27^\\circ\\text{C}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 146,
    exam: 'NEET 2020 Phase 2',
    question: "The efficiency of a Carnot engine depends upon",
    options: [
      "the temperature of the source only",
      "the temperature of the sink only",
      "the temperatures of the source and sink",
      "the volume of the cylinder of the engine"
    ],
    correctIndex: 2,
    solution: "1. The efficiency of an ideal Carnot engine is:\n$$\\eta = 1 - \\frac{T_2}{T_1}$$\nwhere $T_1$ is the absolute temperature of the source and $T_2$ is the absolute temperature of the sink.\n\n2. The efficiency depends solely on the temperatures of the source and the sink, and is independent of the working substance or mechanical dimensions of the cylinder.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 147,
    exam: 'NEET 2018',
    question: "The efficiency of an ideal heat engine working between the freezing point and boiling point of water, is",
    options: [
      "26.8%",
      "20%",
      "6.25%",
      "12.5%"
    ],
    correctIndex: 0,
    solution: "1. Freezing point of water (sink temperature): $T_2 = 0^\\circ\\text{C} = 273\\text{ K}$.\nBoiling point of water (source temperature): $T_1 = 100^\\circ\\text{C} = 373\\text{ K}$.\n\n2. Efficiency of an ideal heat engine:\n$$\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{273}{373} = \\frac{373 - 273}{373} = \\frac{100}{373}$$\n$$\\eta = 0.2681 = 26.8\\%$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 148,
    exam: 'NEET 2017',
    question: "A carnot engine having an efficiency of $\\frac{1}{10}$ as heat engine, is used as a refrigerator. If the work done on the system is 10 J, the amount of energy absorbed from the reservoir at lower temperature is",
    options: [
      "90 J",
      "99 J",
      "100 J",
      "1 J"
    ],
    correctIndex: 0,
    solution: "1. The coefficient of performance $\\beta$ of a refrigerator is related to Carnot efficiency $\\eta$ by:\n$$\\beta = \\frac{1 - \\eta}{\\eta}$$\n\n2. Given $\\eta = \\frac{1}{10}$:\n$$\\beta = \\frac{1 - 1/10}{1/10} = \\frac{9/10}{1/10} = 9$$\n\n3. Also $\\beta = \\frac{Q_2}{W}$, where $Q_2$ is the heat absorbed from the cold reservoir and $W$ is the work input:\n$$Q_2 = \\beta W = 9 \\times 10\\text{ J} = 90\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 149,
    exam: 'NEET 2016 Phase 2',
    question: "The temperature inside a refrigerator is $t_2^\\circ\\text{C}$ and the room temperature is $t_1^\\circ\\text{C}$. The amount of heat delivered to the room for each joule of electrical energy consumed ideally will be",
    options: [
      "$\\frac{t_1}{t_1 - t_2}$",
      "$\\frac{t_1 + 273}{t_1 - t_2}$",
      "$\\frac{t_2 + 273}{t_1 - t_2}$",
      "$\\frac{t_1 + t_2}{t_1 + 273}$"
    ],
    correctIndex: 1,
    solution: "1. In Kelvin, the temperatures are:\n- Source (room): $T_1 = t_1 + 273\\text{ K}$\n- Sink (refrigerator): $T_2 = t_2 + 273\\text{ K}$\n- Temperature difference: $T_1 - T_2 = t_1 - t_2$\n\n2. For an ideal Carnot refrigerator, the heat rejected to the room per unit work consumed is:\n$$\\frac{Q_1}{W} = \\frac{T_1}{T_1 - T_2} = \\frac{t_1 + 273}{t_1 - t_2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 150,
    exam: 'NEET 2016 Phase 1',
    question: "A refrigerator works between $4^\\circ\\text{C}$ and $30^\\circ\\text{C}$. It is required to remove 600 calories of heat every second in order to keep the temperature of the refrigerated space constant. The power required is (Take $1\\text{ cal} = 4.2\\text{ Joules}$)",
    options: [
      "$236.5\\text{ W}$",
      "$2365\\text{ W}$",
      "$2.365\\text{ W}$",
      "$23.65\\text{ W}$"
    ],
    correctIndex: 0,
    solution: "1. Temperatures in Kelvin:\n- Sink: $T_2 = 4 + 273 = 277\\text{ K}$\n- Source: $T_1 = 30 + 273 = 303\\text{ K}$\n\n2. Coefficient of performance:\n$$\\beta = \\frac{T_2}{T_1 - T_2} = \\frac{277}{303 - 277} = \\frac{277}{26} \\approx 10.654$$\n\n3. Rate of heat removal:\n$$\\frac{dQ_2}{dt} = 600\\text{ cal/s} = 600 \\times 4.2\\text{ J/s} = 2520\\text{ W}$$\n\n4. Power required:\n$$P = \\frac{dW}{dt} = \\frac{dQ_2/dt}{\\beta} = \\frac{2520}{10.654} \\approx 236.5\\text{ W}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 151,
    exam: 'AIPMT 2015',
    question: "The coefficient of performance of a refrigerator is 5. If the temperature inside freezer is $-20^\\circ\\text{C}$, the temperature of the surroundings to which it rejects heat is",
    options: [
      "$11^\\circ\\text{C}$",
      "$21^\\circ\\text{C}$",
      "$31^\\circ\\text{C}$",
      "$41^\\circ\\text{C}$"
    ],
    correctIndex: 2,
    solution: "1. The coefficient of performance of a refrigerator is:\n$$\\beta = \\frac{T_2}{T_1 - T_2}$$\n\n2. Given: $\\beta = 5$, and freezer temperature $T_2 = -20 + 273 = 253\\text{ K}$:\n$$5 = \\frac{253}{T_1 - 253}$$\n$$T_1 - 253 = \\frac{253}{5} = 50.6$$\n$$T_1 = 253 + 50.6 = 303.6\\text{ K}$$\n\n3. In Celsius:\n$$T_1 = 303.6 - 273 = 30.6^\\circ\\text{C} \\approx 31^\\circ\\text{C}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 152,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "A Carnot engine, having an efficiency of $\\eta = \\frac{1}{10}$ as heat engine, is used as a refrigerator. If the work done on the system is 10 J, the amount of energy absorbed from the reservoir at lower temperature is",
    options: [
      "90 J",
      "1 J",
      "100 J",
      "99 J"
    ],
    correctIndex: 0,
    solution: "1. Coefficient of performance of the refrigerator:\n$$\\beta = \\frac{1 - \\eta}{\\eta} = \\frac{1 - 1/10}{1/10} = 9$$\n\n2. Heat absorbed from the lower temperature reservoir:\n$$Q_2 = \\beta W = 9 \\times 10\\text{ J} = 90\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 153,
    exam: 'NEET 2013 (Karnataka)',
    question: "Two Carnot engines A and B are operated in series. The engine A receives heat from the source at temperature $T_1$ and rejects the heat to the sink at temperature T. The second engine B receives the heat at temperature T and rejects to its sink at temperature $T_2$. For what values of T the efficiencies of the two engines are equal",
    options: [
      "$\\frac{T_1 - T_2}{2}$",
      "$T_1 T_2$",
      "$\\sqrt{T_1 T_2}$",
      "$\\frac{T_1 + T_2}{2}$"
    ],
    correctIndex: 2,
    solution: "1. Efficiency of Carnot engine A:\n$$\\eta_A = 1 - \\frac{T}{T_1}$$\n\n2. Efficiency of Carnot engine B:\n$$\\eta_B = 1 - \\frac{T_2}{T}$$\n\n3. Setting the two efficiencies equal ($\\eta_A = \\eta_B$):\n$$1 - \\frac{T}{T_1} = 1 - \\frac{T_2}{T}$$\n$$\\frac{T}{T_1} = \\frac{T_2}{T} \\implies T^2 = T_1 T_2 \\implies T = \\sqrt{T_1 T_2}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 154,
    exam: 'AIPMT 2007',
    question: "An engine has an efficiency of 1/6. When the temperature of sink is reduced by $62^\\circ\\text{C}$, its efficiency is doubled. Temperatures of the source is",
    options: [
      "$37^\\circ\\text{C}$",
      "$62^\\circ\\text{C}$",
      "$99^\\circ\\text{C}$",
      "$124^\\circ\\text{C}$."
    ],
    correctIndex: 2,
    solution: "1. Initial efficiency:\n$$\\eta_1 = 1 - \\frac{T_2}{T_1} = \\frac{1}{6} \\implies \\frac{T_2}{T_1} = \\frac{5}{6}$$\n\n2. When sink temperature is reduced by $62\\text{ K}$, efficiency doubles:\n$$\\eta_2 = 1 - \\frac{T_2 - 62}{T_1} = 2 \\times \\frac{1}{6} = \\frac{1}{3}$$\n$$\\frac{T_2 - 62}{T_1} = 1 - \\frac{1}{3} = \\frac{2}{3}$$\n$$\\frac{T_2}{T_1} - \\frac{62}{T_1} = \\frac{2}{3}$$\n\n3. Substituting $\\frac{T_2}{T_1} = \\frac{5}{6}$:\n$$\\frac{5}{6} - \\frac{62}{T_1} = \\frac{4}{6} \\implies \\frac{62}{T_1} = \\frac{1}{6}$$\n$$T_1 = 6 \\times 62 = 372\\text{ K}$$\n\n4. Converting to Celsius:\n$$T_1 = 372 - 273 = 99^\\circ\\text{C}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 155,
    exam: 'AIPMT 2006',
    question: "A Carnot engine whose sink is at 300 K has an efficiency of 40%. By how much should the temperature of source be increased so as to increase its efficiency by 50% of original efficiency ?",
    options: [
      "380 K",
      "275 K",
      "325 K",
      "250 K"
    ],
    correctIndex: 3,
    solution: "1. Initial condition:\n$$\\eta_1 = 1 - \\frac{T_2}{T_1} = 0.40$$\n$$1 - \\frac{300}{T_1} = 0.40 \\implies \\frac{300}{T_1} = 0.60 \\implies T_1 = \\frac{300}{0.60} = 500\\text{ K}$$\n\n2. New efficiency increased by $50\\%$ of original efficiency:\n$$\\eta_2 = \\eta_1 + (0.50 \\times \\eta_1) = 0.40 + 0.20 = 0.60$$\n\n3. Finding new source temperature $T_1'$:\n$$1 - \\frac{300}{T_1'} = 0.60 \\implies \\frac{300}{T_1'} = 0.40 \\implies T_1' = \\frac{300}{0.40} = 750\\text{ K}$$\n\n4. Increase in source temperature:\n$$\\Delta T_1 = T_1' - T_1 = 750\\text{ K} - 500\\text{ K} = 250\\text{ K}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 156,
    exam: 'AIPMT 2005',
    question: "An ideal gas heat engine operates in Carnot cycle between $227^\\circ\\text{C}$ and $127^\\circ\\text{C}$. It absorbs $6 \\times 10^4\\text{ cal}$ of heat at higher temperature. Amount of heat converted to work is",
    options: [
      "$4.8 \\times 10^4\\text{ cal}$",
      "$6 \\times 10^4\\text{ cal}$",
      "$2.4 \\times 10^4\\text{ cal}$",
      "$1.2 \\times 10^4\\text{ cal}$."
    ],
    correctIndex: 3,
    solution: "1. Temperatures in Kelvin:\n- Source: $T_1 = 227 + 273 = 500\\text{ K}$\n- Sink: $T_2 = 127 + 273 = 400\\text{ K}$\n\n2. Carnot efficiency:\n$$\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{400}{500} = \\frac{100}{500} = \\frac{1}{5}$$\n\n3. Work output ($W = \\eta Q_1$):\n$$W = \\frac{1}{5} \\times (6 \\times 10^4\\text{ cal}) = 1.2 \\times 10^4\\text{ cal}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 157,
    exam: 'AIPMT 2003',
    question: "An ideal gas heat engine operates in a Carnot cycle between $227^\\circ\\text{C}$ and $127^\\circ\\text{C}$. It absorbs 6 kcal at the higher temperature. The amount of heat (in kcal) converted into work is equal to",
    options: [
      "4.8",
      "3.5",
      "1.6",
      "1.2"
    ],
    correctIndex: 3,
    solution: "1. Absolute temperatures:\n- Source: $T_1 = 227 + 273 = 500\\text{ K}$\n- Sink: $T_2 = 127 + 273 = 400\\text{ K}$\n\n2. Efficiency:\n$$\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{400}{500} = 0.2$$\n\n3. Work done:\n$$W = \\eta Q_1 = 0.2 \\times 6\\text{ kcal} = 1.2\\text{ kcal}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 158,
    exam: 'AIPMT 2002',
    question: "The efficiency of Carnot engine is 50% and temperature of sink is 500 K. If temperature of source is kept constant and its efficiency raised to 60%, then the required temperature of sink will be",
    options: [
      "100 K",
      "600 K",
      "400 K",
      "500 K"
    ],
    correctIndex: 2,
    solution: "1. Initially:\n$$\\eta_1 = 1 - \\frac{T_2}{T_1} \\implies 0.50 = 1 - \\frac{500}{T_1}$$\n$$\\frac{500}{T_1} = 0.50 \\implies T_1 = 1000\\text{ K}$$\n\n2. When efficiency is raised to $60\\%$ with $T_1 = 1000\\text{ K}$ constant:\n$$\\eta_2 = 1 - \\frac{T_2'}{1000} = 0.60$$\n$$\\frac{T_2'}{1000} = 0.40 \\implies T_2' = 400\\text{ K}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 159,
    exam: 'AIPMT 2001',
    question: "A scientist says that the efficiency of his heat engine which work at source temperature $127^\\circ\\text{C}$ and sink temperature $27^\\circ\\text{C}$ is 26%, then",
    options: [
      "it is impossible",
      "it is possible but less probable",
      "it is quite probable",
      "data are incomplete."
    ],
    correctIndex: 0,
    solution: "1. The maximum possible efficiency between two thermal reservoirs is that of a reversible Carnot engine:\n$$T_1 = 127 + 273 = 400\\text{ K}, \\quad T_2 = 27 + 273 = 300\\text{ K}$$\n$$\\eta_{\\text{Carnot}} = 1 - \\frac{T_2}{T_1} = 1 - \\frac{300}{400} = 0.25 = 25\\%$$\n\n2. According to Carnot's theorem and the Second Law of Thermodynamics, no real heat engine can have an efficiency greater than a Carnot engine operating between the same temperature limits.\n\n3. Since the claimed efficiency of $26\\%$ exceeds $25\\%$, it is physically impossible.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 160,
    exam: 'AIPMT 2000',
    question: "The (W/Q) of a Carnot engine is 1/6, now the temperature of sink is reduced by $62^\\circ\\text{C}$, then this ratio becomes twice, therefore the initial temperature of the sink and source are respectively",
    options: [
      "$33^\\circ\\text{C}, 67^\\circ\\text{C}$",
      "$37^\\circ\\text{C}, 99^\\circ\\text{C}$",
      "$67^\\circ\\text{C}, 33^\\circ\\text{C}$",
      "$97\\text{ K}, 37\\text{ K}$"
    ],
    correctIndex: 1,
    solution: "1. Initial efficiency:\n$$\\eta_1 = 1 - \\frac{T_2}{T_1} = \\frac{1}{6} \\implies \\frac{T_2}{T_1} = \\frac{5}{6}$$\n\n2. When sink temperature decreases by $62\\text{ K}$:\n$$\\eta_2 = 1 - \\frac{T_2 - 62}{T_1} = 2 \\times \\frac{1}{6} = \\frac{1}{3}$$\n$$\\frac{T_2 - 62}{T_1} = \\frac{2}{3} \\implies \\frac{T_2}{T_1} - \\frac{62}{T_1} = \\frac{2}{3}$$\n$$\\frac{5}{6} - \\frac{62}{T_1} = \\frac{2}{3} \\implies \\frac{62}{T_1} = \\frac{1}{6} \\implies T_1 = 372\\text{ K}$$\n\n3. Source temperature: $T_1 = 372 - 273 = 99^\\circ\\text{C}$.\nSink temperature: $T_2 = \\frac{5}{6} T_1 = \\frac{5}{6} \\times 372 = 310\\text{ K} = 37^\\circ\\text{C}$.\n\n4. Therefore, sink and source temperatures are $37^\\circ\\text{C}$ and $99^\\circ\\text{C}$ respectively.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 161,
    exam: 'AIPMT 1997',
    question: "The efficiency of a Carnot engine operating with reservoir temperature of $100^\\circ\\text{C}$ and $-23^\\circ\\text{C}$ will be",
    options: [
      "$\\frac{373 + 250}{373}$",
      "$\\frac{373 - 250}{373}$",
      "$\\frac{100 + 23}{100}$",
      "$\\frac{100 - 23}{100}$"
    ],
    correctIndex: 1,
    solution: "1. Converting temperatures to Kelvin:\n- Source: $T_1 = 100 + 273 = 373\\text{ K}$\n- Sink: $T_2 = -23 + 273 = 250\\text{ K}$\n\n2. The efficiency of the Carnot engine is:\n$$\\eta = \\frac{T_1 - T_2}{T_1} = \\frac{373 - 250}{373}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 162,
    exam: 'AIPMT 1996',
    question: "The value of critical temperature in terms of van der Waals' constant a and b is given by",
    options: [
      "$T_c = \\frac{8a}{27Rb}$",
      "$T_c = \\frac{27a}{8Rb}$",
      "$T_c = \\frac{a}{2Rb}$",
      "$T_c = \\frac{a}{27Rb}$"
    ],
    correctIndex: 0,
    solution: "1. For a real gas obeying van der Waals equation of state:\n$$\\left(P + \\frac{a}{V_m^2}\\right)(V_m - b) = RT$$\n\n2. The critical constants are obtained from the inflection point $\\left(\\frac{\\partial P}{\\partial V}\\right)_{T_c} = 0$ and $\\left(\\frac{\\partial^2 P}{\\partial V^2}\\right)_{T_c} = 0$:\n$$V_c = 3b, \\quad P_c = \\frac{a}{27b^2}, \\quad T_c = \\frac{8a}{27Rb}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 163,
    exam: 'AIPMT 1995',
    question: "An ideal Carnot engine, whose efficiency is 40%, receives heat at 500 K. If its efficiency is 50%, then the intake temperature for the same exhaust temperature is",
    options: [
      "800 K",
      "900 K",
      "600 K",
      "700 K"
    ],
    correctIndex: 2,
    solution: "1. Initially:\n$$\\eta_1 = 1 - \\frac{T_2}{T_1} \\implies 0.40 = 1 - \\frac{T_2}{500}$$\n$$\\frac{T_2}{500} = 0.60 \\implies T_2 = 500 \\times 0.60 = 300\\text{ K}$$\n\n2. For the new efficiency $\\eta_2 = 50\\% = 0.50$ with the same exhaust temperature ($T_2 = 300\\text{ K}$):\n$$0.50 = 1 - \\frac{300}{T_1'}\$$\n$$\\frac{300}{T_1'} = 0.50 \\implies T_1' = \\frac{300}{0.50} = 600\\text{ K}$$\n\nHence, the correct option is (C)."
  }
];

