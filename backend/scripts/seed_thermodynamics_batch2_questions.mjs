import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const BATCH2_QUESTIONS = [
  // Page 1: Q78 to Q90
  {
    q_num: 78,
    question_text: "An ideal gas undergoes a cyclic process as shown in the graph between pressure ($P$) and temperature ($T$). The part of the graph which represents absorption of heat from surrounding are",
    options: ["$AB, CD$", "$DA, BC$", "$DA, AB$", "$BC, AB$"],
    correct_index: 3,
    topic: "Thermodynamic Cycles & Heat Exchange",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q78.png",
    solution: "1. In process $A \\rightarrow B$: The line passes through the origin in the $P-T$ diagram, which means $P \\propto T \\implies V = \\text{constant}$ (isochoric process). Here, $T$ increases from $T_1$ to $T_2$, so $\\Delta U = n C_v \\Delta T > 0$. Since $W = 0$, by the First Law of Thermodynamics, $Q_{AB} = \\Delta U > 0$, so heat is absorbed.\n2. In process $B \\rightarrow C$: The process is at constant temperature $T_2$ (isothermal process). Pressure decreases from $P_2$ to $P_1$, which means the volume increases (expansion, $W > 0$). Since $\\Delta U = 0$ for an isothermal process, $Q_{BC} = W > 0$, so heat is absorbed from the surroundings.\n3. In process $C \\rightarrow D$: Isochoric cooling ($T$ decreases), so heat is released ($Q_{CD} < 0$).\n4. In process $D \\rightarrow A$: Isothermal compression at $T_1$ ($P$ increases, $V$ decreases), so heat is released ($Q_{DA} < 0$).\nTherefore, heat is absorbed from the surroundings in processes $BC$ and $AB$."
  },
  {
    q_num: 79,
    question_text: "Volume versus temperature graph for two moles of monoatomic gas is as shown. The ratio of work done by the gas to heat absorbed by it in the process $A$ to $B$ is",
    options: ["$\\frac{1}{2}$", "$\\frac{2}{5}$", "$\\frac{3}{7}$", "$\\frac{3}{5}$"],
    correct_index: 1,
    topic: "Isobaric Process",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q79.png",
    solution: "In the given $V-T$ graph, the straight line passes through the origin, which means $V \\propto T$, indicating an isobaric process ($P = \\text{constant}$).\nFor an isobaric process, the work done by the gas is:\n$$W = P \\Delta V = n R \\Delta T$$\nThe heat absorbed by the gas is:\n$$Q = n C_p \\Delta T$$\nFor a monoatomic gas, $C_p = \\frac{5}{2}R$. Therefore, the ratio of work done to heat absorbed is:\n$$\\frac{W}{Q} = \\frac{n R \\Delta T}{n C_p \\Delta T} = \\frac{R}{C_p} = \\frac{R}{\\frac{5}{2}R} = \\frac{2}{5}$$"
  },
  {
    q_num: 80,
    question_text: "In case of free expansion, when a sample of gas expands suddenly, The change in internal energy of the gas is",
    options: ["Positive", "Negative", "Zero", "May be positive or negative"],
    correct_index: 2,
    topic: "Free Expansion",
    difficulty: "easy",
    image_url: "",
    solution: "In free expansion of an ideal gas, the gas expands into a vacuum against zero external pressure ($P_{ext} = 0$), so the work done is zero ($W = 0$). Furthermore, since the process is sudden and isolated from surroundings, no heat exchange occurs ($Q = 0$). By the First Law of Thermodynamics, $\\Delta U = Q - W = 0 - 0 = 0$. Thus, the change in internal energy is zero."
  },
  {
    q_num: 81,
    question_text: "The adiabatic exponent $\\gamma$ for a mixture of 20 g of Neon and 28 g Nitrogen gas is",
    options: ["1.2", "1.5", "1.7", "1.9"],
    correct_index: 1,
    topic: "Mixture of Gases",
    difficulty: "medium",
    image_url: "",
    solution: "1. Number of moles of Neon (monoatomic, molar mass $M_1 = 20\\text{ g/mol}$):\n$$n_1 = \\frac{20}{20} = 1\\text{ mol}, \\quad C_{v1} = \\frac{3}{2}R$$\n2. Number of moles of Nitrogen $\\text{N}_2$ (diatomic, molar mass $M_2 = 28\\text{ g/mol}$):\n$$n_2 = \\frac{28}{28} = 1\\text{ mol}, \\quad C_{v2} = \\frac{5}{2}R$$\n3. For the mixture:\n$$C_{v,\\text{mix}} = \\frac{n_1 C_{v1} + n_2 C_{v2}}{n_1 + n_2} = \\frac{1 \\times \\frac{3}{2}R + 1 \\times \\frac{5}{2}R}{1 + 1} = \\frac{4R}{2} = 2R$$\n$$C_{p,\\text{mix}} = C_{v,\\text{mix}} + R = 2R + R = 3R$$\n4. The adiabatic exponent of the mixture is:\n$$\\gamma_{\\text{mix}} = \\frac{C_{p,\\text{mix}}}{C_{v,\\text{mix}}} = \\frac{3R}{2R} = 1.5$$"
  },
  {
    q_num: 82,
    question_text: "Ideal gas is taken through cycle $P \\rightarrow Q \\rightarrow R \\rightarrow P$ as shown in the figure. If net heat supplied to the gas in the cycle is 15 J, the work done by the gas in the process $R \\rightarrow P$ is",
    options: ["5 J", "$-15\\text{ J}$", "$-20\\text{ J}$", "$-12\\text{ J}$"],
    correct_index: 1,
    topic: "Thermodynamic Cycles & Work",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q82.png",
    solution: "For a complete cyclic process, $\\Delta U = 0$, so by the First Law of Thermodynamics, $W_{\\text{net}} = Q_{\\text{net}} = 15\\text{ J}$.\nFrom the graph ($V$ on vertical axis, $P$ on horizontal axis):\n1. In process $P \\rightarrow Q$: Pressure is constant at $P = 15\\text{ N/m}^2$, while volume changes from $1\\text{ m}^3$ to $3\\text{ m}^3$. Therefore:\n$$W_{PQ} = P(V_Q - V_P) = 15 \\times (3 - 1) = 30\\text{ J}$$\n2. In process $Q \\rightarrow R$: Volume is constant at $V = 3\\text{ m}^3$ (isochoric process), so:\n$$W_{QR} = 0$$\n3. The total work for the cycle is the sum of the works in each stage:\n$$W_{\\text{net}} = W_{PQ} + W_{QR} + W_{RP}$$\n$$15 = 30 + 0 + W_{RP} \\implies W_{RP} = 15 - 30 = -15\\text{ J}$$"
  },
  {
    q_num: 83,
    question_text: "In the $P-V$ graph shown for an ideal diatomic gas, change in the internal energy is",
    options: ["$\\frac{3}{2}P_0(V_2 - V_1)$", "$\\frac{5}{2}P_0(V_2 - V_1)$", "$\\frac{3}{2}P_0(V_1 - V_2)$", "$\\frac{7}{2}P_0(V_1 - V_2)$"],
    correct_index: 1,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q83.png",
    solution: "The graph represents an isobaric expansion at constant pressure $P = P_0$ from volume $V_1$ to $V_2$.\nFor an ideal diatomic gas, the molar heat capacity at constant volume is $C_v = \\frac{5}{2}R$.\nThe change in internal energy is given by:\n$$\\Delta U = n C_v \\Delta T = n\\left(\\frac{5}{2}R\\right)\\Delta T = \\frac{5}{2}nR\\Delta T$$\nFrom the ideal gas equation at constant pressure, $nR\\Delta T = P_0 \\Delta V = P_0(V_2 - V_1)$.\nTherefore:\n$$\\Delta U = \\frac{5}{2}P_0(V_2 - V_1)$$"
  },
  {
    q_num: 84,
    question_text: "The figure shows $P-V$ diagram of a thermodynamic cycle. Which of the following curve is correct?",
    options: [
      { key: "A", text: "", image_url: "/uploads/thermodynamics/thermo_q84_opt1.png" },
      { key: "B", text: "", image_url: "/uploads/thermodynamics/thermo_q84_opt2.png" },
      { key: "C", text: "", image_url: "/uploads/thermodynamics/thermo_q84_opt3.png" },
      { key: "D", text: "", image_url: "/uploads/thermodynamics/thermo_q84_opt4.png" }
    ],
    correct_index: 2,
    topic: "Cycle Conversions",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q84.png",
    solution: "In the $P-V$ diagram:\n- $A \\rightarrow B$ is an isochoric heating at constant volume $V_1$. In a $V-T$ diagram with $V$ on the vertical axis, constant volume corresponds to a horizontal line at $V = V_1$. Since $P$ increases, $T$ increases ($A$ to $B$ moves rightward).\n- $B \\rightarrow C$ is an isobaric expansion at higher pressure $P_2$. In $V-T$, isobaric processes are straight lines through the origin with slope $\\frac{V}{T} = \\frac{nR}{P_2}$.\n- $C \\rightarrow D$ is an isochoric cooling at constant volume $V_2$ (horizontal line at $V = V_2$). Since $P$ decreases, $T$ decreases ($C$ to $D$ moves leftward).\n- $D \\rightarrow A$ is an isobaric compression at lower pressure $P_1$. Since $P_1 < P_2$, the slope $\\frac{nR}{P_1}$ is steeper than that of $B \\rightarrow C$.\nGraph (3) accurately depicts these four states and trajectories with $A-B$ along the lower horizontal line and $D-C$ along the upper horizontal line."
  },
  {
    q_num: 85,
    question_text: "The figure shows a process on a gas in which pressure ($P$) and volume ($V$) of gas changes. If $C_1$ and $C_2$ are the molar heat capacities of gas during process $AB$ and $BC$ respectively, then",
    options: ["$C_1 = C_2$", "$C_1 > C_2$", "$C_1 < C_2$", "$C_1 \\le C_2$"],
    correct_index: 2,
    topic: "Molar Specific Heat Capacities",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q85.png",
    solution: "In the $P-V$ diagram:\n- Process $AB$ is a vertical line, which represents an isochoric process (constant volume, $\\Delta V = 0$). Thus, the molar heat capacity during $AB$ is $C_1 = C_v$.\n- Process $BC$ is a horizontal line, which represents an isobaric process (constant pressure, $\\Delta P = 0$). Thus, the molar heat capacity during $BC$ is $C_2 = C_p$.\nBy Mayer's relation, for any gas, $C_p = C_v + R > C_v$. Therefore, $C_1 < C_2$."
  },
  {
    q_num: 86,
    question_text: "During which of the following thermodynamic process elasticity of gas is minimum?",
    options: ["Adiabatic process", "Isothermal process", "Isobaric process", "Isochoric process"],
    correct_index: 2,
    topic: "Elasticity of Gases",
    difficulty: "easy",
    image_url: "",
    solution: "Volume elasticity (bulk modulus) of a gas is given by $E = -V \\frac{dP}{dV}$.\n- For an isobaric process, $P = \\text{constant} \\implies dP = 0$, so $E_{\\text{isobaric}} = 0$.\n- For an isothermal process, $E_{\\text{isothermal}} = P$.\n- For an adiabatic process, $E_{\\text{adiabatic}} = \\gamma P$.\n- For an isochoric process, $dV = 0 \\implies E_{\\text{isochoric}} = \\infty$.\nThus, the volume elasticity of a gas is minimum (zero) in an isobaric process."
  },
  {
    q_num: 87,
    question_text: "During isobaric process the thermal coefficient of volume expansion of an ideal gas at temperature $T$ (in K) is",
    options: ["Zero", "$T^{-1}$", "$2T^{-2}$", "Infinite"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "easy",
    image_url: "",
    solution: "The thermal coefficient of volume expansion is defined as:\n$$\\alpha = \\frac{1}{V}\\left(\\frac{dV}{dT}\\right)_P$$\nFor an ideal gas at constant pressure, from $PV = nRT$, differentiating with respect to $T$ at constant $P$ gives:\n$$P \\frac{dV}{dT} = nR \\implies \\frac{dV}{dT} = \\frac{nR}{P} = \\frac{V}{T}$$\nSubstituting this back:\n$$\\alpha = \\frac{1}{V}\\left(\\frac{V}{T}\\right) = \\frac{1}{T} = T^{-1}$$"
  },
  {
    q_num: 88,
    question_text: "Molar specific heat capacity of a gas is",
    options: ["Always equal to $C_v$", "Always greater than $C_v$", "Always equal to $C_p$", "May be greater or less than $C_v$"],
    correct_index: 3,
    topic: "Molar Specific Heat Capacities",
    difficulty: "easy",
    image_url: "",
    solution: "The molar specific heat capacity of a gas depends entirely on the nature of the thermodynamic process and is given by $C = \\frac{\\Delta Q}{n \\Delta T}$. In polytropic processes $PV^x = \\text{constant}$, $C = C_v + \\frac{R}{1 - x}$. Depending on the value of $x$, $C$ can take any value from $-\\infty$ to $+\\infty$. For example, in an adiabatic process $C = 0 < C_v$, and in an isothermal process $C = \\infty > C_v$. Therefore, the molar specific heat capacity may be greater or less than $C_v$."
  },
  {
    q_num: 89,
    question_text: "The work done for given process $AB$ is",
    options: ["$6P_0 V_0$", "$5P_0 V_0$", "$3P_0 V_0$", "$2P_0 V_0$"],
    correct_index: 0,
    topic: "Work Done from Graph",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q89.png",
    solution: "In the given diagram, Volume $V$ is on the vertical axis and Pressure $P$ is on the horizontal axis.\nThe work done by the gas is given by $W = \\int P dV$, which represents the area under the curve projected onto the volume ($V$) axis.\nThe process proceeds from state $A(P_0, V_0)$ to state $B(3P_0, 4V_0)$. The area projected on the $V$-axis is a trapezoid bounded between $V = V_0$ and $V = 4V_0$ with parallel sides corresponding to pressures $P_0$ and $3P_0$:\n$$W = \\text{Area} = \\frac{P_A + P_B}{2} \\times (V_B - V_A) = \\frac{P_0 + 3P_0}{2} \\times (4V_0 - V_0) = 2P_0 \\times 3V_0 = 6P_0 V_0$$"
  },
  {
    q_num: 90,
    question_text: "Internal energy remains same throughout the process along the path in",
    options: ["Adiabatic process", "Isothermal process", "Cyclic process", "Both (2) & (3)"],
    correct_index: 1,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "",
    solution: "For an ideal gas, internal energy is a function of temperature only: $U = f(T)$. In an isothermal process, the temperature remains constant at every point along the entire path ($T = \\text{constant}$), meaning the internal energy remains constant throughout the process. In a cyclic process, internal energy returns to its initial value only at the completion of the cycle, but varies continuously throughout the intermediate states."
  },

  // Page 2: Q91 to Q102
  {
    q_num: 91,
    question_text: "Work done during the given cycle is",
    options: ["$4P_0 V_0$", "$2P_0 V_0$", "$\\frac{1}{2}P_0 V_0$", "$P_0 V_0$"],
    correct_index: 3,
    topic: "Thermodynamic Cycles & Work",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q91.png",
    solution: "The work done during a cyclic process in a $P-V$ diagram is equal to the area enclosed by the cycle.\nFrom the given figure, the cycle is a right-angled triangle with vertices at $(V_0, P_0)$, $(V_0, 2P_0)$, and $(3V_0, P_0)$:\n$$\\text{Base} = 3V_0 - V_0 = 2V_0$$\n$$\\text{Height} = 2P_0 - P_0 = P_0$$\n$$\\text{Area} = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height} = \\frac{1}{2} \\times (2V_0) \\times (P_0) = P_0 V_0$$\nSince the cycle is traced in a clockwise sense in the $P-V$ plane, the net work done is positive: $W = +P_0 V_0$."
  },
  {
    q_num: 92,
    question_text: "Cyclic process of 2 mole of diatomic gas is shown in figure then which of the following statement is correct?",
    options: [
      "Process $BC$ is isothermal compression",
      "Work done in the process $CA$ is $4RT_0$",
      "Work done in the process $AB$ is zero",
      "All of these"
    ],
    correct_index: 2,
    topic: "Thermodynamic Cycles",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q92.png",
    solution: "1. In process $AB$: The straight line passes through the origin in the $P-T$ diagram, which represents $P \\propto T \\implies V = \\text{constant}$ (isochoric process). Therefore, the work done in process $AB$ is zero ($W_{AB} = 0$). Statement (3) is correct.\n2. In process $BC$: The temperature is constant at $T = 2T_0$, while pressure decreases from $2P_0$ to $P_0$. Since pressure decreases at constant temperature, the volume increases ($V \\propto 1/P$), so this is an isothermal expansion, not compression. Hence, statement (1) is incorrect.\n3. In process $CA$: Pressure is constant at $P_0$ (isobaric), with temperature decreasing from $2T_0$ to $T_0$. The work done is $W_{CA} = nR\\Delta T = 2 \\times R \\times (T_0 - 2T_0) = -2RT_0$, not $4RT_0$. Hence, statement (2) is incorrect.\nThus, only statement (3) is correct."
  },
  {
    q_num: 93,
    question_text: "Without external heat, work done is possible in",
    options: ["Adiabatic process", "Isochoric process", "Isothermal process", "Isobaric process"],
    correct_index: 0,
    topic: "Adiabatic Process",
    difficulty: "easy",
    image_url: "",
    solution: "In an adiabatic process, there is no heat exchange between the system and its surroundings ($Q = 0$). According to the First Law of Thermodynamics, $\\Delta Q = \\Delta U + W \\implies W = -\\Delta U$. Thus, work is performed at the expense of the internal energy of the gas without requiring any external heat input."
  },
  {
    q_num: 94,
    question_text: "An ideal heat engine absorbs the certain amount of heat. If heat rejected by the system is $\\frac{1}{3}\\text{rd}$ of the total heat absorbed, then efficiency of heat engine is approximately",
    options: ["33%", "66%", "50%", "60%"],
    correct_index: 1,
    topic: "Heat Engines & Carnot Cycle",
    difficulty: "easy",
    image_url: "",
    solution: "The efficiency of a heat engine is given by:\n$$\\eta = 1 - \\frac{Q_2}{Q_1}$$\nwhere $Q_1$ is the heat absorbed and $Q_2$ is the heat rejected.\nGiven $Q_2 = \\frac{1}{3}Q_1$:\n$$\\eta = 1 - \\frac{1}{3} = \\frac{2}{3} \\approx 0.667 = 66.7\\% \\approx 66\\%$$"
  },
  {
    q_num: 95,
    question_text: "The thermodynamic state of an ideal gas is varied through different processes as shown in the figure. The change in internal energy of the process $A$, $B$ and $C$ respectively will be",
    options: ["$+, -, +$", "$0, +, -$", "$+, 0, -$", "$-, +, 0$"],
    correct_index: 2,
    topic: "First Law of Thermodynamics",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q95.png",
    solution: "For an expansion from an initial state $(P_i, V_i)$ to a larger volume:\n1. Process $A$ (Isobaric): Pressure is constant while volume increases. From $PV = nRT$, temperature increases ($\\Delta T > 0$), so the change in internal energy is positive ($\\Delta U_A > 0$, sign is $+$).\n2. Process $B$ (Isothermal): Temperature is constant ($\\Delta T = 0$), so the change in internal energy is zero ($\\Delta U_B = 0$, sign is $0$).\n3. Process $C$ (Adiabatic): No heat is exchanged ($Q = 0$). In an expansion, work is done by the gas ($W > 0$), so $\\Delta U_C = -W < 0$, meaning internal energy decreases (sign is $-$).\nTherefore, the signs are $+, 0, -$."
  },
  {
    q_num: 96,
    question_text: "An ideal gas is enclosed in an insulated cylinder. The piston is frictionless and attached with ideal spring. When the gas is heated then",
    options: [
      "The work is done against the spring only",
      "The work is done against the atmospheric pressure only",
      "The internal energy of gas increases",
      "Work is equal to heat supplied"
    ],
    correct_index: 2,
    topic: "First Law of Thermodynamics",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q96.png",
    solution: "When the gas is heated by the electrical coil, it expands. As the piston moves outwards, work is done against both the external atmospheric pressure and the compressing spring. Since the pressure on the gas increases with expansion (as $P = P_{\\text{atm}} + \\frac{kx}{A}$), the temperature of the gas rises, leading to an increase in internal energy ($\\Delta U > 0$). Therefore, the internal energy of the gas increases."
  },
  {
    q_num: 97,
    question_text: "An ideal gas undergoes a cyclic process $abc$ as shown below on volume ($V$) versus temperature ($T$) diagram. Which of the following graphs represents the same cyclic process on pressure ($p$) versus volume ($v$) diagram?",
    options: [
      { key: "A", text: "", image_url: "/uploads/thermodynamics/thermo_q97_opt1.png" },
      { key: "B", text: "", image_url: "/uploads/thermodynamics/thermo_q97_opt2.png" },
      { key: "C", text: "", image_url: "/uploads/thermodynamics/thermo_q97_opt3.png" },
      { key: "D", text: "", image_url: "/uploads/thermodynamics/thermo_q97_opt4.png" }
    ],
    correct_index: 0,
    topic: "Cycle Conversions",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q97.png",
    solution: "Analyzing each step in the $V-T$ diagram:\n1. Process $a \\rightarrow b$: Volume is constant at $V_a = V_b$ while temperature increases from $T_a$ to $T_b$. In a $P-V$ diagram, this is an isochoric process represented by a vertical line pointing upwards (pressure increases).\n2. Process $b \\rightarrow c$: The line passes through the origin ($V \\propto T$), which means pressure is constant ($P = \\text{constant}$, isobaric process). As temperature and volume decrease, in the $P-V$ diagram this is a horizontal line pointing to the left.\n3. Process $c \\rightarrow a$: Temperature is constant ($T_c = T_a$, isothermal process). Volume increases from $V_c$ to $V_a$, which in a $P-V$ diagram is represented by a downward hyperbolic curve from $c$ to $a$.\nGraph (1) corresponds precisely to these steps with the proper cyclic sense."
  },
  {
    q_num: 98,
    question_text: "The change in internal energy of an ideal gas does not depend on",
    options: [
      "Number of moles",
      "Change in temperature",
      "Specific heat at constant pressure $C_p$ of the gas",
      "Specific heat at constant volume $C_v$ of the gas"
    ],
    correct_index: 2,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "",
    solution: "For any thermodynamic process of an ideal gas, the change in internal energy is given by:\n$$\\Delta U = n C_v \\Delta T$$\nThus, $\\Delta U$ depends on the number of moles ($n$), the molar heat capacity at constant volume ($C_v$), and the temperature change ($\\Delta T$). It does not depend on the specific heat at constant pressure ($C_p$)."
  },
  {
    q_num: 99,
    question_text: "The temperature of sink and source of an ideal engine is $500^\\circ\\text{C}$ and $1000^\\circ\\text{C}$ respectively. In which of the following cases the increase in efficiency will be maximum?",
    options: [
      "Temperature of the sink is lowered by $100^\\circ\\text{C}$",
      "Temperature of source is increased by $100^\\circ\\text{C}$",
      "Temperature of sink is lowered by $50^\\circ\\text{C}$",
      "Temperature of source is increased by $50^\\circ\\text{C}$"
    ],
    correct_index: 0,
    topic: "Carnot Engine",
    difficulty: "medium",
    image_url: "",
    solution: "Initial source temperature $T_1 = 1000 + 273 = 1273\\text{ K}$, and sink temperature $T_2 = 500 + 273 = 773\\text{ K}$.\nEfficiency is $\\eta = 1 - \\frac{T_2}{T_1}$.\n- Case 1: Lowering $T_2$ by $\\Delta T = 100\\text{ K}$:\n$$\\Delta \\eta = \\frac{\\Delta T}{T_1} = \\frac{100}{1273} \\approx 0.0785$$\n- Case 2: Raising $T_1$ by $\\Delta T = 100\\text{ K}$:\n$$\\Delta \\eta' = \\frac{T_2}{T_1} - \\frac{T_2}{T_1 + \\Delta T} = \\frac{T_2 \\Delta T}{T_1(T_1 + \\Delta T)} = \\frac{773 \\times 100}{1273 \\times 1373} \\approx 0.0442$$\nSince $\\frac{1}{T_1} > \\frac{T_2}{T_1(T_1 + \\Delta T)}$, lowering the sink temperature by $100^\\circ\\text{C}$ produces a significantly larger increase in efficiency."
  },
  {
    q_num: 100,
    question_text: "25 calorie of heat is required to raise the temperature of 1 mole of an ideal gas from $40^\\circ\\text{C}$ to $45^\\circ\\text{C}$. The gas may be",
    options: ["$\\text{O}_2$", "$\\text{He}$", "$\\text{H}_2\\text{O}$", "$\\text{NO}_2$"],
    correct_index: 0,
    topic: "Molar Specific Heat Capacities",
    difficulty: "medium",
    image_url: "",
    solution: "Molar heat capacity of the gas is:\n$$C = \\frac{Q}{n \\Delta T} = \\frac{25\\text{ cal}}{1\\text{ mol} \\times (45 - 40)^\\circ\\text{C}} = \\frac{25}{5} = 5\\text{ cal/(mol K)}$$\nConverting to terms of gas constant $R$ (where $R \\approx 2\\text{ cal/(mol K)}$):\n$$C = 5 \\approx \\frac{5}{2}R$$\nSince $C_v = \\frac{5}{2}R$ is the constant-volume molar heat capacity of an ideal diatomic gas, the gas must be diatomic (such as $\\text{O}_2$)."
  },
  {
    q_num: 101,
    question_text: "A gas undergoes the change in its thermodynamic state from $A$ to $B$ via two different paths as shown in given pressure ($P$) versus volume ($V$) graph, then",
    options: [
      "The temperature of gas decreases in path '1' from $A$ to $B$",
      "The heat absorbed by gas in '1' is greater than that in '2'",
      "The heat absorbed by gas in '2' is greater than that in '1'",
      "Change in internal energy in path '1' is greater than that in path '2'"
    ],
    correct_index: 1,
    topic: "First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q101.png",
    solution: "Since states $A$ and $B$ are identical for both paths, and internal energy is a state function:\n$$\\Delta U_1 = \\Delta U_2$$\nThe work done is given by the area under the curve in the $P-V$ diagram. Since path '1' lies above path '2', the area under path '1' is strictly greater than that under path '2':\n$$W_1 > W_2$$\nApplying the First Law of Thermodynamics, $Q = \\Delta U + W$:\n$$Q_1 = \\Delta U_1 + W_1 > \\Delta U_2 + W_2 = Q_2$$\nTherefore, the heat absorbed by the gas in path '1' is greater than that in path '2'."
  },
  {
    q_num: 102,
    question_text: "$PV$ diagram of an ideal gas is shown in the figure. Work done by the gas in the process $1 \\rightarrow 2 \\rightarrow 3 \\rightarrow 4$ will be",
    options: ["$\\frac{9P_0 V_0}{2}$", "$\\frac{15}{2}P_0 V_0$", "$\\frac{13P_0 V_0}{2}$", "$\\frac{3P_0 V_0}{2}$"],
    correct_index: 0,
    topic: "Work Done from Graph",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q102.png",
    solution: "1. In process $1 \\rightarrow 2$: Straight line from $(2V_0, 2P_0)$ to $(V_0, P_0)$. Since volume decreases, the work done is negative and equal to the area of the trapezoid:\n$$W_{1 \\rightarrow 2} = -\\frac{2P_0 + P_0}{2}(2V_0 - V_0) = -\\frac{3}{2}P_0 V_0$$\n2. In process $2 \\rightarrow 3$: Vertical line at constant volume $V_0$ (isochoric), so:\n$$W_{2 \\rightarrow 3} = 0$$\n3. In process $3 \\rightarrow 4$: Horizontal line at constant pressure $3P_0$ from $V_0$ to $3V_0$. The work done is:\n$$W_{3 \\rightarrow 4} = 3P_0(3V_0 - V_0) = 3P_0(2V_0) = 6P_0 V_0$$\n4. The total work done is:\n$$W_{\\text{total}} = W_{1 \\rightarrow 2} + W_{2 \\rightarrow 3} + W_{3 \\rightarrow 4} = -\\frac{3}{2}P_0 V_0 + 0 + 6P_0 V_0 = \\frac{9}{2}P_0 V_0$$"
  },

  // Page 3: Q103 to Q117
  {
    q_num: 103,
    question_text: "In a thermodynamic process of an ideal gas, if $\\Delta W = 0$ and $\\Delta Q$ is negative then its",
    options: ["Volume will increase", "Pressure will remain constant", "Volume will decrease", "Temperature will decrease"],
    correct_index: 3,
    topic: "First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "",
    solution: "By the First Law of Thermodynamics, $\\Delta Q = \\Delta U + \\Delta W$. Given $\\Delta W = 0$, we have $\\Delta U = \\Delta Q < 0$. For an ideal gas, $\\Delta U = n C_v \\Delta T$. Since $\\Delta U < 0$, $\\Delta T < 0$, which means the temperature of the gas will decrease."
  },
  {
    q_num: 104,
    question_text: "In the first stage of a two stage Carnot engine, energy $Q_1$ is absorbed at temperature $T_1$ and energy $Q_2$ is expelled as heat at intermediate temperature $T_2$. The second stage absorbs the energy $Q_2$ and expels energy $Q_3$ at a still lower temperature $T_3$. If the work output of both the stages is same then $T_2$ is equal to",
    options: ["$\\frac{T_1 + T_3}{2}$", "$\\frac{T_1 - T_3}{2}$", "$\\sqrt{T_1 T_3}$", "$\\frac{\\sqrt{T_1 T_3}}{2}$"],
    correct_index: 0,
    topic: "Carnot Engine",
    difficulty: "medium",
    image_url: "",
    solution: "For a Carnot engine, the work done in each stage is proportional to the temperature difference:\n$$W_1 = Q_1 \\left(1 - \\frac{T_2}{T_1}\\right) \\propto (T_1 - T_2)$$\n$$W_2 = Q_2 \\left(1 - \\frac{T_3}{T_2}\\right) \\propto (T_2 - T_3)$$\nGiven that the work output of both stages is equal ($W_1 = W_2$):\n$$T_1 - T_2 = T_2 - T_3 \\implies 2T_2 = T_1 + T_3 \\implies T_2 = \\frac{T_1 + T_3}{2}$$"
  },
  {
    q_num: 105,
    question_text: "When the sink temperature is kept at 400 K, the efficiency of a Carnot engine is 50%. While keeping the source temperature constant, by how much will the sink temperature be reduced to increase the efficiency to 60%?",
    options: ["$80^\\circ\\text{C}$", "$320^\\circ\\text{C}$", "320 K", "240 K"],
    correct_index: 0,
    topic: "Carnot Engine",
    difficulty: "medium",
    image_url: "",
    solution: "Initial efficiency $\\eta_1 = 1 - \\frac{T_2}{T_1} = 0.50$ with $T_2 = 400\\text{ K}$:\n$$0.50 = 1 - \\frac{400}{T_1} \\implies \\frac{400}{T_1} = 0.50 \\implies T_1 = 800\\text{ K}$$\nTo increase the efficiency to $\\eta_2 = 60\\% = 0.60$ while keeping $T_1 = 800\\text{ K}$ constant:\n$$0.60 = 1 - \\frac{T_2'}{800} \\implies \\frac{T_2'}{800} = 0.40 \\implies T_2' = 320\\text{ K}$$\nThe required reduction in sink temperature is:\n$$\\Delta T_2 = T_2 - T_2' = 400 - 320 = 80\\text{ K} = 80^\\circ\\text{C}$$"
  },
  {
    q_num: 106,
    question_text: "The rise in temperature when an ideal monoatomic gas at $27^\\circ\\text{C}$ is compressed adiabatically to $\\left(\\frac{8}{27}\\right)$ of its original volume is",
    options: ["$450^\\circ\\text{C}$", "$375^\\circ\\text{C}$", "$225^\\circ\\text{C}$", "$402^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Adiabatic Process",
    difficulty: "medium",
    image_url: "",
    solution: "For an adiabatic process of an ideal gas, $T V^{\\gamma - 1} = \\text{constant}$.\nFor a monoatomic gas, $\\gamma = \\frac{5}{3}$, so $\\gamma - 1 = \\frac{2}{3}$.\nGiven $T_1 = 27 + 273 = 300\\text{ K}$ and $V_2 = \\frac{8}{27}V_1$:\n$$T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{\\gamma - 1} = 300 \\left(\\frac{27}{8}\\right)^{2/3} = 300 \\left[\\left(\\frac{3}{2}\\right)^3\\right]^{2/3} = 300 \\left(\\frac{3}{2}\\right)^2 = 300 \\times \\frac{9}{4} = 675\\text{ K}$$\nThe rise in temperature is:\n$$\\Delta T = T_2 - T_1 = 675 - 300 = 375\\text{ K} = 375^\\circ\\text{C}$$"
  },
  {
    q_num: 107,
    question_text: "An ideal gas expands isothermally along $AB$ and does 500 J of work and then expands adiabatically along $BC$ and does 200 J of work. When the gas returns to $A$ along $CA$, it rejects 200 J of heat to its surroundings. Work done on the gas along the path $CA$ is",
    options: ["600 J", "800 J", "400 J", "500 J"],
    correct_index: 2,
    topic: "Thermodynamic Cycles & Work",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q107.png",
    solution: "In the cyclic process $A \\rightarrow B \\rightarrow C \\rightarrow A$:\n- $A \\rightarrow B$ is isothermal: $\\Delta U_{AB} = 0 \\implies Q_{AB} = W_{AB} = 500\\text{ J}$.\n- $B \\rightarrow C$ is adiabatic: $Q_{BC} = 0$, with $W_{BC} = 200\\text{ J}$.\n- $C \\rightarrow A$: Heat rejected is $200\\text{ J}$, so $Q_{CA} = -200\\text{ J}$.\nThe net heat supplied in the cycle is:\n$$Q_{\\text{net}} = Q_{AB} + Q_{BC} + Q_{CA} = 500 + 0 - 200 = 300\\text{ J}$$\nFor a cyclic process, $\\Delta U_{\\text{cycle}} = 0$, so $W_{\\text{net}} = Q_{\\text{net}} = 300\\text{ J}$.\nAlso:\n$$W_{\\text{net}} = W_{AB} + W_{BC} + W_{CA} \\implies 300 = 500 + 200 + W_{CA} \\implies W_{CA} = 300 - 700 = -400\\text{ J}$$\nThe work done **on the gas** along path $CA$ is $-W_{CA} = +400\\text{ J}$."
  },
  {
    q_num: 108,
    question_text: "From the following $V-T$ diagram, we can conclude",
    options: ["$P_1 = P_2$", "$P_1 > P_2$", "$P_1 < P_2$", "$P_1 \\ge P_2$"],
    correct_index: 1,
    topic: "Thermodynamic Processes & Graphs",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q108.png",
    solution: "From the ideal gas equation $PV = nRT \\implies \\frac{V}{T} = \\frac{nR}{P}$.\nThe slope of a ray drawn from the origin to any point on the $V-T$ graph is inversely proportional to pressure: $\\text{Slope} \\propto \\frac{1}{P}$.\nIn the given diagram, the straight line connecting state 1 (at temperature $T_1$) and state 2 (at temperature $T_2$) has a positive $T$-axis intercept. Therefore, the ratio $\\frac{V}{T}$ at state 2 is greater than that at state 1:\n$$\\left(\\frac{V}{T}\\right)_2 > \\left(\\frac{V}{T}\\right)_1 \\implies \\frac{nR}{P_2} > \\frac{nR}{P_1} \\implies P_1 > P_2$$"
  },
  {
    q_num: 109,
    question_text: "The pressure $P$ of an ideal monatomic gas varies with volume $V$ as $P = kV^2$, where $k$ is a constant. The molar heat capacity for the process is",
    options: ["$\\frac{7R}{4}$", "$\\frac{11R}{6}$", "$\\frac{13R}{6}$", "$\\frac{15R}{4}$"],
    correct_index: 1,
    topic: "Polytropic Processes",
    difficulty: "medium",
    image_url: "",
    solution: "The given process is $P = kV^2 \\implies P V^{-2} = \\text{constant}$.\nComparing with the standard polytropic equation $P V^x = \\text{constant}$, we have $x = -2$.\nThe molar heat capacity for a polytropic process is:\n$$C = C_v + \\frac{R}{1 - x}$$\nFor a monoatomic gas, $C_v = \\frac{3}{2}R$. Substituting $x = -2$:\n$$C = \\frac{3}{2}R + \\frac{R}{1 - (-2)} = \\frac{3}{2}R + \\frac{R}{3} = \\frac{9R + 2R}{6} = \\frac{11R}{6}$$"
  },
  {
    q_num: 110,
    question_text: "Two moles of an ideal diatomic gas is expanded isobarically so that its temperature rises by 50 K. The work done by the gas is (where $R$ is universal gas constant)",
    options: ["$250R$", "$150R$", "$100R$", "$50R$"],
    correct_index: 2,
    topic: "Isobaric Process",
    difficulty: "easy",
    image_url: "",
    solution: "For an isobaric expansion of an ideal gas, the work done is given by:\n$$W = P \\Delta V = n R \\Delta T$$\nGiven $n = 2\\text{ moles}$ and $\\Delta T = 50\\text{ K}$:\n$$W = 2 \\times R \\times 50 = 100R$$"
  },
  {
    q_num: 111,
    question_text: "Two isotherms of an ideal gas are drawn at temperatures $T_1$ and $T_2$ as shown below. If $Oa = ab$ then the ratio of rms speed of gas molecules at temperature $T_1$ and $T_2$ is",
    options: ["$1 : \\sqrt{2}$", "$1 : 2$", "$1 : 4$", "$1 : 1$"],
    correct_index: 1,
    topic: "Kinetic Theory & Isotherms",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q111.png",
    solution: "Along the line $Oab$ inclined at $45^\\circ$ to the axes in the $P-V$ diagram, $P = V = r$.\nAt point $a$, the coordinates are $(r, r)$, so the temperature on isotherm $T_1$ satisfies:\n$$T_1 \\propto P_a V_a = r^2$$\nSince $Oa = ab$, the distance to point $b$ is $Ob = 2(Oa) = 2r$. Thus, the coordinates of point $b$ are $(2r, 2r)$, so the temperature on isotherm $T_2$ satisfies:\n$$T_2 \\propto P_b V_b = (2r)(2r) = 4r^2$$\nTherefore:\n$$\\frac{T_1}{T_2} = \\frac{r^2}{4r^2} = \\frac{1}{4}$$\nThe root-mean-square speed of gas molecules is $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\propto \\sqrt{T}$. Hence:\n$$\\frac{v_1}{v_2} = \\sqrt{\\frac{T_1}{T_2}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2} = 1 : 2$$"
  },
  {
    q_num: 112,
    question_text: "An ideal gas undergoes adiabatic process according to the law $T V^{1/2} = \\text{constant}$. If the gas is at pressure $P$ and temperature $T$ at a certain instant, the value of the adiabatic modulus of elasticity is",
    options: ["$P$", "$\\frac{1}{2}P$", "$\\frac{3}{2}P$", "$\\frac{5}{3}P$"],
    correct_index: 2,
    topic: "Elasticity of Gases",
    difficulty: "medium",
    image_url: "",
    solution: "For an ideal gas, $PV = nRT \\implies T \\propto PV$. Substituting into the relation $T V^{1/2} = \\text{constant}$:\n$$(PV) V^{1/2} = \\text{constant} \\implies P V^{3/2} = \\text{constant}$$\nComparing with the adiabatic relation $P V^\\gamma = \\text{constant}$, we have $\\gamma = \\frac{3}{2}$.\nThe adiabatic modulus of elasticity is given by:\n$$E_s = -V \\frac{dP}{dV} = \\gamma P = \\frac{3}{2}P$$"
  },
  {
    q_num: 113,
    question_text: "If the internal energy of an ideal gas in state $A$ and state $B$ are 40 J and 60 J, what is the heat energy supplied to the gas during the process $A$ to $B$?",
    options: ["40 J", "60 J", "80 J", "100 J"],
    correct_index: 1,
    topic: "First Law of Thermodynamics",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q113.png",
    solution: "1. Change in internal energy:\n$$\\Delta U = U_B - U_A = 60 - 40 = 20\\text{ J}$$\n2. Work done by the gas is the area under the process line in the $P-V$ graph:\n$$W = \\frac{P_A + P_B}{2} \\times (V_B - V_A)$$\nGiven $P_A = 10\\text{ kPa} = 10 \\times 10^3\\text{ Pa}$, $P_B = 30\\text{ kPa} = 30 \\times 10^3\\text{ Pa}$, and $\\Delta V = (3 - 1)\\text{ litre} = 2 \\times 10^{-3}\\text{ m}^3$:\n$$W = \\frac{10 + 30}{2} \\times 10^3 \\times 2 \\times 10^{-3} = 20 \\times 2 = 40\\text{ J}$$\n3. By the First Law of Thermodynamics:\n$$Q = \\Delta U + W = 20\\text{ J} + 40\\text{ J} = 60\\text{ J}$$"
  },
  {
    q_num: 114,
    question_text: "The isochoric bulk modulus of helium gas at NTP is",
    options: ["Zero", "$1.01 \\times 10^5\\text{ Pa}$", "$1.67 \\times 10^5\\text{ Pa}$", "Infinite"],
    correct_index: 3,
    topic: "Elasticity of Gases",
    difficulty: "easy",
    image_url: "",
    solution: "Bulk modulus is defined as $K = -V \\frac{dP}{dV} = -\\frac{dP}{dV/V}$.\nFor an isochoric process, volume is constant ($V = \\text{constant}$), meaning the change in volume is zero ($dV = 0$).\nTherefore, the bulk modulus becomes:\n$$K_{\\text{isochoric}} = -V \\frac{dP}{0} = \\infty\\text{ (Infinite)}$$"
  },
  {
    q_num: 115,
    question_text: "Which of the following ratio is correct for isobaric process?",
    options: ["$Q : \\Delta U = 1 : 1$", "$Q : \\Delta W = \\gamma : 2 - \\gamma - 1$", "$Q : \\Delta U = \\gamma : 1$", "$Q : \\Delta W = 1 : \\gamma$"],
    correct_index: 2,
    topic: "Isobaric Process",
    difficulty: "easy",
    image_url: "",
    solution: "For an isobaric process of an ideal gas:\n- Heat supplied: $Q = n C_p \\Delta T$\n- Change in internal energy: $\\Delta U = n C_v \\Delta T$\nTaking the ratio:\n$$\\frac{Q}{\\Delta U} = \\frac{n C_p \\Delta T}{n C_v \\Delta T} = \\frac{C_p}{C_v} = \\gamma$$\nThus, $Q : \\Delta U = \\gamma : 1$."
  },
  {
    q_num: 116,
    question_text: "The isothermal, adiabatic and isochoric Bulk modulus of an ideal gas at atmospheric pressure are $K_T$, $K_A$ and $K_S$ respectively. Select the correct relationship between them",
    options: ["$K_A < K_T < K_S$", "$K_T < K_S < K_A$", "$K_T < K_A < K_S$", "$K_A = K_T > K_S$"],
    correct_index: 2,
    topic: "Elasticity of Gases",
    difficulty: "easy",
    image_url: "",
    solution: "For an ideal gas at pressure $P$:\n- Isothermal bulk modulus: $K_T = P$\n- Adiabatic bulk modulus: $K_A = \\gamma P$ (where $\\gamma > 1$)\n- Isochoric bulk modulus: $K_S = \\infty$\nSince $1 < \\gamma < \\infty$, we have:\n$$P < \\gamma P < \\infty \\implies K_T < K_A < K_S$$"
  },
  {
    q_num: 117,
    question_text: "Which of the following graphs shows the variation of pressure $P$ with volume $V$ for an ideal gas at constant temperature?",
    options: [
      { key: "A", text: "", image_url: "/uploads/thermodynamics/thermo_q117_opt1.png" },
      { key: "B", text: "", image_url: "/uploads/thermodynamics/thermo_q117_opt2.png" },
      { key: "C", text: "", image_url: "/uploads/thermodynamics/thermo_q117_opt3.png" },
      { key: "D", text: "", image_url: "/uploads/thermodynamics/thermo_q117_opt4.png" }
    ],
    correct_index: 2,
    topic: "Isothermal Process",
    difficulty: "easy",
    image_url: "",
    solution: "At constant temperature (isothermal conditions), an ideal gas obeys Boyle's law:\n$$PV = \\text{constant} \\implies P \\propto \\frac{1}{V}$$\nIn a $P-V$ diagram, this inverse relationship produces a rectangular hyperbola that asymptotically approaches both axes, as shown in graph (3)."
  },

  // Page 4: Q118 to Q131
  {
    q_num: 118,
    question_text: "During an adiabatic process, the pressure of an ideal gas is found to be proportional to the fourth power of its absolute temperature. The ratio of its specific heats i.e., $C_p/C_v$ is",
    options: ["$\\frac{3}{2}$", "$\\frac{4}{3}$", "$\\frac{5}{3}$", "$\\frac{7}{3}$"],
    correct_index: 1,
    topic: "Adiabatic Process",
    difficulty: "medium",
    image_url: "",
    solution: "In an adiabatic process, the relation between pressure and temperature is:\n$$P^{1 - \\gamma} T^\\gamma = \\text{constant} \\implies P \\propto T^{\\frac{\\gamma}{\\gamma - 1}}$$\nGiven that $P \\propto T^4$, we equate the exponents:\n$$\\frac{\\gamma}{\\gamma - 1} = 4 \\implies \\gamma = 4(\\gamma - 1) \\implies \\gamma = 4\\gamma - 4 \\implies 3\\gamma = 4 \\implies \\gamma = \\frac{4}{3}$$\nThus, $\\frac{C_p}{C_v} = \\frac{4}{3}$."
  },
  {
    q_num: 119,
    question_text: "An ideal gas having ratio of specific heats $\\gamma = 3/2$ has initial volume of 400 cc. It is suddenly compressed to 25 cc. If the initial pressure was $P$, then the final pressure will be",
    options: ["$8P$", "$16P$", "$32P$", "$64P$"],
    correct_index: 3,
    topic: "Adiabatic Process",
    difficulty: "medium",
    image_url: "",
    solution: "Sudden compression is an adiabatic process, which obeys $P_1 V_1^\\gamma = P_2 V_2^\\gamma$.\nGiven $V_1 = 400\\text{ cc}$, $V_2 = 25\\text{ cc}$, $P_1 = P$, and $\\gamma = \\frac{3}{2}$:\n$$P_2 = P_1 \\left(\\frac{V_1}{V_2}\\right)^\\gamma = P \\left(\\frac{400}{25}\\right)^{3/2} = P (16)^{3/2} = P (4^2)^{3/2} = P (4)^3 = 64P$$"
  },
  {
    q_num: 120,
    question_text: "A gas performs minimum work, when it expands",
    options: ["Isochorically", "Isobarically", "Adiabatically", "Isothermally"],
    correct_index: 2,
    topic: "Work Done in Processes",
    difficulty: "easy",
    image_url: "",
    solution: "When a gas expands from the same initial state to the same final volume, the pressure drops most rapidly during an adiabatic expansion due to its steeper slope ($-\\gamma \\frac{P}{V}$). Consequently, the area under the curve in a $P-V$ diagram is least for adiabatic expansion:\n$$W_{\\text{isobaric}} > W_{\\text{isothermal}} > W_{\\text{adiabatic}}$$\n(Note: In an isochoric process the volume does not change, so it does not represent an expansion). Thus, among expanding processes, work done is minimum in an adiabatic process."
  },
  {
    q_num: 121,
    question_text: "An ideal gas goes from $A$ to $B$ via two processes I and II as shown. If $\\Delta U_1$ and $\\Delta U_2$ are the changes in internal energies in the process I and II respectively, then ($P$ : pressure, $V$ : Volume)",
    options: ["$\\Delta U_1 > \\Delta U_2$", "$\\Delta U_1 < \\Delta U_2$", "$\\Delta U_1 = \\Delta U_2$", "$\\Delta U_1 \\le \\Delta U_2$"],
    correct_index: 2,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q121.png",
    solution: "Internal energy $U$ is a state function and its change $\\Delta U = U_B - U_A$ depends only on the initial state $A$ and final state $B$, independent of the path taken between them. Since both processes I and II have the same initial and final states, $\\Delta U_1 = \\Delta U_2$."
  },
  {
    q_num: 122,
    question_text: "An ideal monatomic gas $\\left(\\gamma = \\frac{5}{3}\\right)$ absorbed 50 cal in an isochoric process. Increase in internal energy of the gas is",
    options: ["20 cal", "Zero", "50 cal", "30 cal"],
    correct_index: 2,
    topic: "First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "",
    solution: "In an isochoric process, volume is constant ($dV = 0$), so the work done by the gas is zero ($W = 0$).\nBy the First Law of Thermodynamics:\n$$Q = \\Delta U + W \\implies \\Delta U = Q - 0 = 50\\text{ cal}$$\nThus, the increase in internal energy of the gas is 50 cal."
  },
  {
    q_num: 123,
    question_text: "If $Q$, $W$ and $\\Delta U$ are heat supplied to an ideal gas, work done by the gas and increase in internal energy of the gas, then first law of thermodynamics states that",
    options: ["$Q = \\Delta U - W$", "$W = \\Delta U + Q$", "$Q = \\Delta U + W$", "All of these"],
    correct_index: 2,
    topic: "First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "",
    solution: "The First Law of Thermodynamics expresses the conservation of energy: the total heat energy supplied to a system ($Q$) is equal to the increase in its internal energy ($\\Delta U$) plus the external work done by the system ($W$):\n$$Q = \\Delta U + W$$"
  },
  {
    q_num: 124,
    question_text: "Pressure temperature ($P-T$) graph for two processes $A$ and $B$ on a system is shown in figure. If $W_1$ and $W_2$ are work done by the gas in process $A$ and $B$ respectively, then",
    options: ["$W_1 = W_2$", "$W_1 < W_2$", "$W_1 > W_2$", "$W_1 = -W_2$"],
    correct_index: 2,
    topic: "Work Done from Graph",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q124.png",
    solution: "In the $P-T$ diagram, both processes $A$ and $B$ are horizontal lines, meaning both are isobaric processes ($P = \\text{constant}$).\nNotice that the endpoints of both processes lie on the same two straight lines passing through the origin. Since lines through the origin in $P-T$ represent isochoric paths ($V_1 = \\text{constant}$ and $V_2 = \\text{constant}$), both processes undergo the same volume change: $\\Delta V = V_2 - V_1$.\nWork done in an isobaric process is $W = P \\Delta V = P(V_2 - V_1)$.\nFrom the graph, process $A$ occurs at a higher pressure than process $B$ ($P_A > P_B$).\nTherefore:\n$$W_1 = P_A \\Delta V > P_B \\Delta V = W_2 \\implies W_1 > W_2$$"
  },
  {
    q_num: 125,
    question_text: "Variation of molar heat capacity at constant volume $C_v$ with temperature $T$ for a monatomic gas is",
    options: [
      { key: "A", text: "", image_url: "/uploads/thermodynamics/thermo_q125_opt1.png" },
      { key: "B", text: "", image_url: "/uploads/thermodynamics/thermo_q125_opt2.png" },
      { key: "C", text: "", image_url: "/uploads/thermodynamics/thermo_q125_opt3.png" },
      { key: "D", text: "", image_url: "/uploads/thermodynamics/thermo_q125_opt4.png" }
    ],
    correct_index: 2,
    topic: "Molar Specific Heat Capacities",
    difficulty: "easy",
    image_url: "",
    solution: "For an ideal monoatomic gas, there are only translational degrees of freedom ($f = 3$). The molar heat capacity at constant volume is:\n$$C_v = \\frac{3}{2}R$$\nThis value is constant and completely independent of temperature $T$. Hence, the graph of $C_v$ versus $T$ is a horizontal straight line parallel to the temperature axis, as shown in graph (3)."
  },
  {
    q_num: 126,
    question_text: "Pressure-temperature ($P-T$) curve of a cyclic process is shown. Work done by the gas in the given process for $n$ moles of the gas is (symbols have their usual meanings)",
    options: [
      "$nR(T_A + T_C - T_B - T_D)$",
      "$nR(P_1 - P_2)$",
      "$nR(T_A + T_C)\\ln\\left(\\frac{T_D}{T_B}\\right)$",
      "$nR(T_B + T_A - T_C - T_D)$"
    ],
    correct_index: 0,
    topic: "Thermodynamic Cycles & Work",
    difficulty: "hard",
    image_url: "/uploads/thermodynamics/thermo_q126.png",
    solution: "In the cyclic process $A \\rightarrow B \\rightarrow C \\rightarrow D \\rightarrow A$:\n1. Process $A \\rightarrow B$: Straight line through the origin in $P-T \\implies P \\propto T \\implies V = \\text{constant}$ (isochoric). Therefore, $W_{AB} = 0$.\n2. Process $B \\rightarrow C$: Horizontal line at constant pressure $P_2$ (isobaric). The work done is:\n$$W_{BC} = nR(T_C - T_B)$$\n3. Process $C \\rightarrow D$: Straight line through the origin in $P-T \\implies V = \\text{constant}$ (isochoric). Therefore, $W_{CD} = 0$.\n4. Process $D \\rightarrow A$: Horizontal line at constant pressure $P_1$ (isobaric). The work done is:\n$$W_{DA} = nR(T_A - T_D)$$\n5. Summing the work done over the entire cycle:\n$$W_{\\text{net}} = W_{AB} + W_{BC} + W_{CD} + W_{DA} = 0 + nR(T_C - T_B) + 0 + nR(T_A - T_D) = nR(T_A + T_C - T_B - T_D)$$"
  },
  {
    q_num: 127,
    question_text: "A system is taken from state $A$ to state $B$ along two different paths 1 and 2. If the heat absorbed and work done by the system along these two paths are $Q_1$, $Q_2$ and $W_1$, $W_2$ respectively, then",
    options: ["$Q_1 = Q_2$", "$W_1 = W_2$", "$Q_1 - W_1 = Q_2 - W_2$", "$Q_1 + W_1 = Q_2 + W_2$"],
    correct_index: 2,
    topic: "First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "",
    solution: "By the First Law of Thermodynamics, $\\Delta U = Q - W$. Since states $A$ and $B$ are fixed endpoints, the change in internal energy is path-independent:\n$$\\Delta U_1 = \\Delta U_2 \\implies Q_1 - W_1 = Q_2 - W_2$$"
  },
  {
    q_num: 128,
    question_text: "A gas undergoes a process in which its pressure $P$ and volume $V$ are related as $V P^n = \\text{constant}$. The bulk modulus for the gas in this process is",
    options: ["$\\frac{P}{n}$", "$\\frac{P^n}{n}$", "$nP$", "$P^n$"],
    correct_index: 0,
    topic: "Elasticity of Gases",
    difficulty: "medium",
    image_url: "",
    solution: "Given $V P^n = C \\implies P^n V = C$.\nTaking the natural logarithm on both sides:\n$$n \\ln P + \\ln V = \\ln C$$\nDifferentiating implicitly:\n$$n \\frac{dP}{P} + \\frac{dV}{V} = 0 \\implies n \\frac{dP}{P} = -\\frac{dV}{V} \\implies -V \\frac{dP}{dV} = \\frac{P}{n}$$\nSince bulk modulus is defined as $B = -V \\frac{dP}{dV}$, we have:\n$$B = \\frac{P}{n}$$"
  },
  {
    q_num: 129,
    question_text: "Pressure $P$ versus volume $V$ diagram for a monatomic gas is a straight line passing through origin. Molar heat capacity of the gas in the process is",
    options: ["$3R$", "$\\frac{5R}{2}$", "$2R$", "$\\frac{7R}{2}$"],
    correct_index: 2,
    topic: "Polytropic Processes",
    difficulty: "medium",
    image_url: "",
    solution: "A straight line passing through the origin in a $P-V$ diagram has the equation $P \\propto V \\implies P V^{-1} = \\text{constant}$.\nComparing with the polytropic form $P V^x = \\text{constant}$, we have $x = -1$.\nFor a monoatomic gas ($C_v = \\frac{3}{2}R$), the molar heat capacity is:\n$$C = C_v + \\frac{R}{1 - x} = \\frac{3}{2}R + \\frac{R}{1 - (-1)} = \\frac{3}{2}R + \\frac{R}{2} = 2R$$"
  },
  {
    q_num: 130,
    question_text: "An ideal monatomic gas is taken through a thermodynamic process from $A$ to $B$ as shown. Heat supplied to the gas in the process is",
    options: ["$3P_0 V_0$", "$5P_0 V_0$", "$\\frac{5P_0 V_0}{2}$", "$\\frac{3P_0 V_0}{2}$"],
    correct_index: 3,
    topic: "First Law of Thermodynamics",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q130.png",
    solution: "1. Initial state $A$: $(V_0, 2P_0)$, so $P_A V_A = 2P_0 V_0$.\n   Final state $B$: $(2V_0, P_0)$, so $P_B V_B = 2P_0 V_0$.\n2. The change in internal energy for a monoatomic gas is:\n$$\\Delta U = \\frac{3}{2}(P_B V_B - P_A V_A) = \\frac{3}{2}(2P_0 V_0 - 2P_0 V_0) = 0$$\n3. The work done by the gas is the area under the straight line $AB$:\n$$W = \\frac{P_A + P_B}{2} \\times (V_B - V_A) = \\frac{2P_0 + P_0}{2} \\times (2V_0 - V_0) = \\frac{3}{2}P_0 V_0$$\n4. By the First Law of Thermodynamics:\n$$Q = \\Delta U + W = 0 + \\frac{3}{2}P_0 V_0 = \\frac{3}{2}P_0 V_0$$"
  },
  {
    q_num: 131,
    question_text: "Internal energy of an ideal gas changes with change in its",
    options: ["Pressure only", "Volume only", "Temperature only", "Temperature and pressure"],
    correct_index: 2,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "",
    solution: "According to Joule's law, the internal energy of an ideal gas is strictly a function of its absolute temperature alone: $U = f(T)$. It does not depend on pressure or volume independently."
  },

  // Page 5: Q141 to Q155
  {
    q_num: 141,
    question_text: "If $C_P$ and $C_V$ are two specific heats of an ideal gas at constant pressure and constant volume respectively, then the specific heat for isothermal expansion is",
    options: ["Zero", "Infinite", "$C_P - C_V$", "$C_P$"],
    correct_index: 1,
    topic: "Isothermal Process",
    difficulty: "easy",
    image_url: "",
    solution: "Specific heat capacity is defined as $C = \\frac{\\Delta Q}{n \\Delta T}$. In an isothermal expansion, temperature remains constant, so $\\Delta T = 0$. Therefore, $C = \\frac{\\Delta Q}{n \\times 0} = \\infty\\text{ (Infinite)}$."
  },
  {
    q_num: 142,
    question_text: "Heat is supplied to a diatomic gas in an isochoric process. The ratio of $\\Delta Q : \\Delta U$ is (Symbols have usual meanings)",
    options: ["$5 : 3$", "$5 : 2$", "$1 : 1$", "$5 : 7$"],
    correct_index: 2,
    topic: "Isochoric Process",
    difficulty: "easy",
    image_url: "",
    solution: "In an isochoric process, volume is constant ($dV = 0$), so the work done by the gas is zero ($W = 0$). By the First Law of Thermodynamics, $\\Delta Q = \\Delta U + W = \\Delta U + 0 = \\Delta U$. Thus, the ratio $\\Delta Q : \\Delta U = 1 : 1$."
  },
  {
    q_num: 143,
    question_text: "In the cyclic process shown in the pressure-volume ($P-V$) diagram the change in internal energy is",
    options: [
      "$\\pi \\left(\\frac{P_2 - P_1}{2}\\right)^2$",
      "$\\pi \\left(\\frac{V_2 - V_1}{2}\\right)^2$",
      "$\\frac{\\pi}{4}(P_2 - P_1)(V_2 - V_1)$",
      "Zero"
    ],
    correct_index: 3,
    topic: "Thermodynamic Cycles",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q143.png",
    solution: "Internal energy $U$ is a state function. In any complete cyclic process, the system returns to its initial state, meaning the initial and final states are identical. Therefore, the net change in internal energy over a complete cycle is always zero ($\\Delta U = 0$)."
  },
  {
    q_num: 144,
    question_text: "An ideal diatomic gas is supplied the heat $Q$ very slowly keeping pressure constant. The work done by the gas is",
    options: ["$\\frac{3}{2}Q$", "$\\frac{2}{7}Q$", "$\\frac{3}{5}Q$", "$\\frac{3}{7}Q$"],
    correct_index: 1,
    topic: "Isobaric Process",
    difficulty: "easy",
    image_url: "",
    solution: "For an ideal diatomic gas at constant pressure, the molar heat capacity is $C_p = \\frac{7}{2}R$.\nThe heat supplied is $Q = n C_p \\Delta T = \\frac{7}{2} n R \\Delta T$.\nThe work done by the gas is $W = P \\Delta V = n R \\Delta T$.\nTaking the ratio:\n$$\\frac{W}{Q} = \\frac{nR\\Delta T}{\\frac{7}{2}nR\\Delta T} = \\frac{2}{7} \\implies W = \\frac{2}{7}Q$$"
  },
  {
    q_num: 145,
    question_text: "In the following indicator diagram, the net amount of work done by the gas will be ($P$ : Pressure, $V$ : Volume)",
    options: ["Positive", "Infinity", "Zero", "Negative"],
    correct_index: 0,
    topic: "Work Done from Graph",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q145.png",
    solution: "In the indicator diagram (figure-8 cycle):\n- Loop 1 is traced counter-clockwise, which represents negative work ($W_1 < 0$).\n- Loop 2 is traced clockwise, which represents positive work ($W_2 > 0$).\nSince the area of loop 2 is visibly larger than the area of loop 1 ($|W_2| > |W_1|$), the net work done by the gas is $W_{\\text{net}} = W_2 + W_1 > 0$ (Positive)."
  },
  {
    q_num: 146,
    question_text: "When an ideal gas is compressed isothermally, its pressure increases because",
    options: [
      "Average translatory K.E. of gas molecules increases",
      "Average rotational K.E. of gas molecules increases",
      "Potential energy of gas increases",
      "Number of collisions per unit area with walls of container increases"
    ],
    correct_index: 3,
    topic: "Kinetic Theory of Gases",
    difficulty: "easy",
    image_url: "",
    solution: "In an isothermal compression, temperature $T$ remains constant, so the average kinetic energy of the molecules does not change. However, as the volume decreases, the number density of molecules ($N/V$) increases, leading to a higher rate of molecular collisions per unit area against the container walls, which results in increased pressure."
  },
  {
    q_num: 147,
    question_text: "Four processes, viz., isothermal, adiabatic, isobaric and isochoric expansion have been shown on a pressure-volume ($P-V$) diagram. The isothermal process is",
    options: ["$a$", "$b$", "$c$", "$d$"],
    correct_index: 1,
    topic: "Thermodynamic Processes & Graphs",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q147.png",
    solution: "From a common initial state:\n- Curve $a$: Horizontal line, slope $= 0$ (Isobaric process)\n- Curve $d$: Vertical line, slope $= -\\infty$ (Isochoric process)\n- Curve $b$: Moderate negative slope $= -\\frac{P}{V}$ (Isothermal process)\n- Curve $c$: Steeper negative slope $= -\\gamma \\frac{P}{V}$ (Adiabatic process, since $\\gamma > 1$)\nTherefore, curve $b$ represents the isothermal process."
  },
  {
    q_num: 148,
    question_text: "Work done by an ideal diatomic gas in its sudden expansion is 20 J. Change in internal energy of the gas is",
    options: ["20 J", "0 J", "$-20\\text{ J}$", "$-15\\text{ J}$"],
    correct_index: 2,
    topic: "Adiabatic Process",
    difficulty: "easy",
    image_url: "",
    solution: "A sudden expansion is an adiabatic process ($Q = 0$). By the First Law of Thermodynamics:\n$$Q = \\Delta U + W \\implies 0 = \\Delta U + 20 \\implies \\Delta U = -20\\text{ J}$$"
  },
  {
    q_num: 149,
    question_text: "Pressure-Volume ($P-V$) indicator diagram of an ideal gas undergoing a cyclic process is as shown in figure. Net heat absorbed in one cycle is",
    options: ["Zero", "10 J", "20 J", "40 J"],
    correct_index: 1,
    topic: "Thermodynamic Cycles & Heat",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q149.png",
    solution: "For a complete cyclic process, $\\Delta U = 0$, so by the First Law of Thermodynamics, $Q_{\\text{net}} = W_{\\text{net}}$.\nThe net work done is the area enclosed by the rectangular cycle in the $P-V$ plane:\n$$\\Delta P = 200\\text{ kPa} - 100\\text{ kPa} = 100\\text{ kPa} = 10^5\\text{ Pa}$$\n$$\\Delta V = 200\\text{ cc} - 100\\text{ cc} = 100\\text{ cc} = 100 \\times 10^{-6}\\text{ m}^3 = 10^{-4}\\text{ m}^3$$\n$$W_{\\text{net}} = \\Delta P \\times \\Delta V = 10^5\\text{ Pa} \\times 10^{-4}\\text{ m}^3 = 10\\text{ J}$$\nSince the cycle is clockwise, $W_{\\text{net}} = +10\\text{ J}$, so the net heat absorbed is $Q_{\\text{net}} = 10\\text{ J}$."
  },
  {
    q_num: 150,
    question_text: "Which of the following is not a state function of thermodynamic process?",
    options: ["Temperature", "Pressure", "Volume", "Work"],
    correct_index: 3,
    topic: "Thermodynamic Variables",
    difficulty: "easy",
    image_url: "",
    solution: "A state function depends only on the current state of the thermodynamic system and not on how that state was reached (e.g., Temperature, Pressure, Volume, Internal Energy, Entropy). Work ($W$) and Heat ($Q$) depend on the specific path taken between states and are therefore path functions, not state functions."
  },
  {
    q_num: 151,
    question_text: "An ideal gas undergoes two processes at constant volume $V_1$ and $V_2$ as shown in pressure-temperature ($P-T$) diagram, then",
    options: ["$V_1 = V_2$", "$V_1 > V_2$", "$V_1 < V_2$", "$V_1 \\ge V_2$"],
    correct_index: 2,
    topic: "Isochoric Process",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q151.png",
    solution: "From the ideal gas equation $PV = nRT$, we have $P = \\left(\\frac{nR}{V}\\right)T$.\nIn a $P-T$ diagram, the slope of an isochoric line passing through the origin is:\n$$\\text{Slope} = \\frac{P}{T} = \\frac{nR}{V} \\propto \\frac{1}{V}$$\nFrom the figure, line $V_1$ has a steeper slope than line $V_2$:\n$$\\text{Slope}_1 > \\text{Slope}_2 \\implies \\frac{nR}{V_1} > \\frac{nR}{V_2} \\implies V_1 < V_2$$"
  },
  {
    q_num: 152,
    question_text: "If the $P-V$ diagram of a cyclic process $ABCA$ is as shown in figure, then the correct statement is",
    options: [
      "$\\Delta Q_{AB} = \\text{Negative}$",
      "$\\Delta U_{BC} = \\text{Positive}$",
      "$\\Delta W_{CAB} = \\text{Negative}$",
      "All of these"
    ],
    correct_index: 3,
    topic: "Thermodynamic Cycles",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q152.png",
    solution: "1. In process $A \\rightarrow B$: Both pressure and volume decrease along a line through origin ($P \\propto V$). The temperature decreases, so $\\Delta U_{AB} < 0$, and volume decreases, so $W_{AB} < 0$. Hence $\\Delta Q_{AB} = \\Delta U_{AB} + W_{AB} < 0$ (Negative). Statement (1) is correct.\n2. In process $B \\rightarrow C$: Horizontal line to the right (isobaric expansion at constant $P$). Since volume increases at constant pressure, temperature increases, so $\\Delta U_{BC} > 0$ (Positive). Statement (2) is correct.\n3. In process $C \\rightarrow A$: Vertical line upwards (isochoric heating, $W_{CA} = 0$). Since the entire cycle $ABCA$ is traversed counter-clockwise, the net work done is negative. Thus, all the individual statements are correct, making 'All of these' the correct choice."
  },
  {
    q_num: 153,
    question_text: "The internal energy of ideal gas increases in",
    options: ["Adiabatic expansion", "Adiabatic compression", "Isothermal expansion", "Isothermal compression"],
    correct_index: 1,
    topic: "Adiabatic Process",
    difficulty: "easy",
    image_url: "",
    solution: "In an adiabatic process, $Q = 0$. By the First Law of Thermodynamics:\n$$\\Delta U = -W$$\nIn an adiabatic compression, work is done on the gas, so $W < 0$. Consequently, $\\Delta U = -(-|W|) = +|W| > 0$, meaning the internal energy of the gas increases."
  },
  {
    q_num: 154,
    question_text: "5 moles of $\\text{N}_2$ gas is heated from $30^\\circ\\text{C}$ to $60^\\circ\\text{C}$ at constant pressure. Change in internal energy of the gas is",
    options: ["Zero", "$375R$", "$750R$", "$225R$"],
    correct_index: 1,
    topic: "Internal Energy",
    difficulty: "easy",
    image_url: "",
    solution: "For any process of an ideal gas, the change in internal energy is given by:\n$$\\Delta U = n C_v \\Delta T$$\nFor nitrogen $\\text{N}_2$ (diatomic gas), $C_v = \\frac{5}{2}R$.\nGiven $n = 5\\text{ moles}$ and $\\Delta T = 60 - 30 = 30\\text{ K}$:\n$$\\Delta U = 5 \\times \\left(\\frac{5}{2}R\\right) \\times 30 = 5 \\times 2.5R \\times 30 = 375R$$"
  },
  {
    q_num: 155,
    question_text: "The temperature of 5 moles of a gas at constant volume is changed from $100^\\circ\\text{C}$ to $120^\\circ\\text{C}$. The change in internal energy is 80 J. The total heat capacity of gas at constant volume will be (in joule/kelvin)",
    options: ["4", "8", "0.8", "0.4"],
    correct_index: 0,
    topic: "Heat Capacity",
    difficulty: "easy",
    image_url: "",
    solution: "Total heat capacity of the gas at constant volume is defined as:\n$$C_V = \\frac{\\Delta Q}{\\Delta T}$$\nIn an isochoric process, $W = 0$, so by the First Law of Thermodynamics:\n$$\\Delta Q = \\Delta U = 80\\text{ J}$$\nThe temperature change is $\\Delta T = 120 - 100 = 20\\text{ K}$.\nTherefore, the total heat capacity is:\n$$C_V = \\frac{80\\text{ J}}{20\\text{ K}} = 4\\text{ J/K}$$"
  }
];

export async function seed() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
  });

  const client = await pool.connect();
  try {
    const chapterName = 'Thermodynamics';
    const subjectName = 'Physics';

    // Subject ID 11 for Physics
    let subjectId = 11;
    let chapterId = 107;

    const chapRes = await client.query(
      "SELECT id FROM chapters WHERE name = $1 AND subject_id = $2",
      [chapterName, subjectId]
    );

    if (chapRes.rows.length > 0) {
      chapterId = chapRes.rows[0].id;
    } else {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
    }

    console.log(`Using subjectId: ${subjectId}, chapterId: ${chapterId} for '${chapterName}'`);

    let inserted = 0;
    let skipped = 0;

    for (const q of BATCH2_QUESTIONS) {
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15
        ) RETURNING id
      `;

      const values = [
        'Physics',
        'single_choice',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${inserted}/${BATCH2_QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed chapter '${chapterName}': Inserted ${inserted}, Skipped ${skipped}. Total: ${BATCH2_QUESTIONS.length}`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed();
}
