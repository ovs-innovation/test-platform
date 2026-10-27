import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const QUESTIONS = [
  {
    "q_num": 1,
    "question_text": "P-T diagram is shown below, then choose the corresponding V-T diagram",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q1_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q1_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q1_opt3.png"
      },
      {
        "key": "D",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q1_opt4.png"
      }
    ],
    "correct_index": 3,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q1.png",
    "solution": "In the given P-T diagram, process $B \\rightarrow C$ is a straight line through the origin ($P \\propto T$), which implies constant volume ($V = \\text{constant}$, horizontal line in V-T). For process $A \\rightarrow B$, temperature $T_B$ is constant while pressure increases from $B$ to $A$ ($P_A > P_B$), so volume must decrease from $B$ to $A$ ($V_A < V_B$); thus moving from $A$ to $B$ represents an increase in volume ($A \\rightarrow B$ points upward). For process $C \\rightarrow D$, at constant temperature $T_C$, pressure decreases downwards from $C$ to $D$, so volume increases ($V_D > V_C$), meaning $C \\rightarrow D$ points upward. Diagram (4) correctly depicts this sequence."
  },
  {
    "q_num": 2,
    "question_text": "Figure shows the variation in internal energy $U$ of 3 moles of hydrogen gas with volume. The work done by gas from state A to B is",
    "options": [
      "$\\frac{7U_0}{5}\\ln(2)$",
      "$\\frac{3U_0}{5}\\ln(2)$",
      "$\\frac{4U_0}{5}\\ln(2)$",
      "$U_0 V_0$"
    ],
    "correct_index": 2,
    "topic": "First Law of Thermodynamics",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q2.png",
    "solution": "Along path $A \\rightarrow B$, the internal energy is constant at $U = 2U_0$, which means temperature $T$ is constant (isothermal process). For diatomic hydrogen gas ($\\text{H}_2$), $U = \\frac{5}{2}nRT \\implies nRT = \\frac{2}{5}U = \\frac{2}{5}(2U_0) = \\frac{4}{5}U_0$. The work done in an isothermal expansion from $V_0$ to $2V_0$ is $W_{AB} = nRT \\ln\\left(\\frac{V_B}{V_A}\\right) = \\left(\\frac{4}{5}U_0\\right) \\ln\\left(\\frac{2V_0}{V_0}\\right) = \\frac{4U_0}{5}\\ln(2)$."
  },
  {
    "q_num": 3,
    "question_text": "A certain amount of an ideal diatomic gas needs 100 J of heat energy to raise its temperature by $40^\\circ\\text{C}$ at constant volume. The heat needed for the same temperature rise at constant pressure will be",
    "options": [
      "100 J",
      "140 J",
      "70 J",
      "120 J"
    ],
    "correct_index": 1,
    "topic": "Molar Specific Heat Capacities",
    "difficulty": "easy",
    "image_url": "",
    "solution": "At constant volume, $Q_V = n C_v \\Delta T = 100\\text{ J}$. At constant pressure, $Q_P = n C_p \\Delta T = \\gamma Q_V$. For an ideal diatomic gas, $\\gamma = \\frac{C_p}{C_v} = \\frac{7/2 R}{5/2 R} = \\frac{7}{5} = 1.4$. Therefore, $Q_P = 1.4 \\times 100\\text{ J} = 140\\text{ J}$."
  },
  {
    "q_num": 4,
    "question_text": "In an isobaric process of a monoatomic gas 100 J of heat is added to $n$ moles of the gas to increase temperature from $T_1$ to $T_2$. The amount of work done by the gas in the process is",
    "options": [
      "20 J",
      "30 J",
      "60 J",
      "40 J"
    ],
    "correct_index": 3,
    "topic": "Isobaric Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an isobaric process of a monoatomic gas: $Q = n C_p \\Delta T = n\\left(\\frac{5}{2}R\\right)\\Delta T = 100\\text{ J}$. The work done is $W = P\\Delta V = nR\\Delta T = \\frac{2}{5}Q = \\frac{2}{5} \\times 100\\text{ J} = 40\\text{ J}$."
  },
  {
    "q_num": 5,
    "question_text": "Variation of pressure ($P$) with volume ($V$) for an ideal monoatomic gas is shown in figure. The molar specific heat of the gas in the process will be",
    "options": [
      "$\\frac{3R}{2}$",
      "$2R$",
      "$\\frac{5R}{2}$",
      "$3R$"
    ],
    "correct_index": 1,
    "topic": "Polytropic Processes",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q5.png",
    "solution": "The graph is a straight line through the origin, so $P \\propto V \\implies P V^{-1} = \\text{constant}$. This is a polytropic process $PV^x = \\text{constant}$ with polytropic index $x = -1$. The molar heat capacity is $C = C_v + \\frac{R}{1 - x}$. For a monoatomic gas, $C_v = \\frac{3}{2}R$. Hence, $C = \\frac{3}{2}R + \\frac{R}{1 - (-1)} = \\frac{3}{2}R + \\frac{R}{2} = 2R$."
  },
  {
    "q_num": 6,
    "question_text": "N moles of a monoatomic gas is carried through a rectangular cycle ABCDA as shown in the diagram. The thermodynamic efficiency of the cycle is approximately",
    "options": [
      "15%",
      "50%",
      "20%",
      "25%"
    ],
    "correct_index": 0,
    "topic": "Cyclic Processes & Efficiency",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q6.png",
    "solution": "The work done in the cycle equals the rectangular area: $W = (2P_0 - P_0)(2V_0 - V_0) = P_0 V_0$. Heat is absorbed during processes $A \\rightarrow B$ and $B \\rightarrow C$: $Q_{AB} = n C_v \\Delta T = \\frac{3}{2}(2P_0 V_0 - P_0 V_0) = 1.5 P_0 V_0$. $Q_{BC} = n C_p \\Delta T = \\frac{5}{2}(4P_0 V_0 - 2P_0 V_0) = 5 P_0 V_0$. Total heat input is $Q_{\\text{in}} = 1.5 P_0 V_0 + 5 P_0 V_0 = 6.5 P_0 V_0$. The thermodynamic efficiency is $\\eta = \\frac{W}{Q_{\\text{in}}} = \\frac{P_0 V_0}{6.5 P_0 V_0} = \\frac{1}{6.5} \\approx 15.38\\% \\approx 15\\%$."
  },
  {
    "q_num": 7,
    "question_text": "On a pressure volume diagram a process is given by straight line as shown in figure. During the process (Given: $T_B < T_A$)",
    "options": [
      "Temperature decreases",
      "Temperature increases continuously",
      "Temperature first increases then decreases",
      "Both (2) and (3) are possible"
    ],
    "correct_index": 2,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "hard",
    "image_url": "/uploads/thermodynamics/thermo_q7.png",
    "solution": "The straight line passes through $A(V_0, 3P_0)$ and $B(2V_0, P_0)$. The equation of the line is $P = -\\frac{2P_0}{V_0}V + 5P_0$. The temperature is $T = \\frac{PV}{nR} = \\frac{1}{nR}\\left(5P_0 V - \\frac{2P_0}{V_0}V^2\\right)$. Setting $\\frac{dT}{dV} = 0$ gives $V = \\frac{5}{4}V_0 = 1.25V_0$, which lies inside the interval $[V_0, 2V_0]$. The maximum product is $PV_{\\max} = 3.125 P_0 V_0 > 3 P_0 V_0$. Hence, temperature first increases to a maximum and then decreases."
  },
  {
    "q_num": 8,
    "question_text": "A gas is filled in an open container at $27^\\circ\\text{C}$. On increasing the temperature to $127^\\circ\\text{C}$, what fraction of the initial amount of gas is present in the container.",
    "options": [
      "$\\frac{3}{4}$",
      "$\\frac{1}{4}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{3}$"
    ],
    "correct_index": 0,
    "topic": "Ideal Gas Equation",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an open container, pressure and volume remain constant. From $PV = nRT$, we have $n_1 T_1 = n_2 T_2$. With $T_1 = 27 + 273 = 300\\text{ K}$ and $T_2 = 127 + 273 = 400\\text{ K}$, the remaining fraction is $\\frac{n_2}{n_1} = \\frac{T_1}{T_2} = \\frac{300}{400} = \\frac{3}{4}$."
  },
  {
    "q_num": 9,
    "question_text": "The following P-V graph shows five different thermodynamics process of an ideal gas. The processes numbered '1' and '3' are one of them adiabatic and the other isothermal. Temperature of the gas increases in",
    "options": [
      "1",
      "4",
      "Both (1) and (2)",
      "1, 2 and 4"
    ],
    "correct_index": 1,
    "topic": "Isothermal and Adiabatic Processes",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q9.png",
    "solution": "During expansion, the magnitude of the slope of an adiabatic curve ($-\\gamma P/V$) is greater than that of an isothermal curve ($-P/V$). Thus, curve 1 is adiabatic and curve 3 is isothermal ($T = \\text{constant}$). Curve 4 lies entirely above the isothermal curve 3, meaning that at any volume, $PV > (PV)_{\\text{isothermal}}$, so $T > T_{\\text{initial}}$. Hence, temperature increases during process 4."
  },
  {
    "q_num": 10,
    "question_text": "For a cyclic process, which statement will be correct?",
    "options": [
      "$\\Delta U = 0$",
      "Initial temperature = Final temperature",
      "$\\Delta Q = \\Delta W$",
      "All of these"
    ],
    "correct_index": 3,
    "topic": "Cyclic Processes",
    "difficulty": "easy",
    "image_url": "",
    "solution": "In any complete thermodynamic cycle, the initial and final states are identical. Therefore, initial temperature equals final temperature, the net change in internal energy is $\\Delta U = 0$, and by the First Law of Thermodynamics, $\\Delta Q = \\Delta U + \\Delta W = \\Delta W$. All statements are correct."
  },
  {
    "q_num": 11,
    "question_text": "An ideal diatomic gas is heated at constant pressure and absorbs 140 J of heat. The increase in internal energy will be",
    "options": [
      "40 J",
      "100 J",
      "80 J",
      "200 J"
    ],
    "correct_index": 1,
    "topic": "First Law of Thermodynamics",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an ideal diatomic gas at constant pressure, $\\Delta U = n C_v \\Delta T = \\frac{C_v}{C_p}Q = \\frac{1}{\\gamma}Q = \\frac{5}{7} \\times 140\\text{ J} = 100\\text{ J}$."
  },
  {
    "q_num": 12,
    "question_text": "A diatomic gas at pressure $P_0$ is suddenly compressed to $\\frac{1}{32}$ its initial volume. The final pressure will be",
    "options": [
      "$32P_0$",
      "$64P_0$",
      "$128P_0$",
      "$256P_0$"
    ],
    "correct_index": 2,
    "topic": "Adiabatic Process",
    "difficulty": "medium",
    "image_url": "",
    "solution": "Sudden compression is an adiabatic process ($PV^\\gamma = \\text{constant}$). For a diatomic gas, $\\gamma = 7/5 = 1.4$. Therefore, $P_2 = P_0 \\left(\\frac{V_1}{V_2}\\right)^\\gamma = P_0 (32)^{7/5} = P_0 (2^5)^{7/5} = P_0 (2^7) = 128P_0$."
  },
  {
    "q_num": 13,
    "question_text": "A Carnot engine is working between temperature $627^\\circ\\text{C}$ and $127^\\circ\\text{C}$. It takes 540 J heat from the source. Amount of heat converted into work is",
    "options": [
      "440 J",
      "420 J",
      "380 J",
      "300 J"
    ],
    "correct_index": 3,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Source temperature $T_1 = 627 + 273 = 900\\text{ K}$, sink temperature $T_2 = 127 + 273 = 400\\text{ K}$. Efficiency $\\eta = 1 - \\frac{T_2}{T_1} = 1 - \\frac{400}{900} = \\frac{5}{9}$. Work done $W = \\eta Q_1 = \\frac{5}{9} \\times 540\\text{ J} = 300\\text{ J}$."
  },
  {
    "q_num": 14,
    "question_text": "When a system is taken from state $i$ to state $f$ along the path $iaf$, it is found that heat given to the system $\\Delta Q = 50\\text{ cal}$ and work done $W = 20\\text{ cal}$. Along the path $ibf$, heat given $\\Delta Q = 36\\text{ cal}$. Work done $W$ along the path $ibf$ is",
    "options": [
      "14 cal",
      "6 cal",
      "16 cal",
      "66 cal"
    ],
    "correct_index": 1,
    "topic": "First Law of Thermodynamics",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q14.png",
    "solution": "Along path $iaf$, $\\Delta U = U_f - U_i = Q_{iaf} - W_{iaf} = 50 - 20 = 30\\text{ cal}$. Since internal energy is a state function, along path $ibf$, $\\Delta U = 30\\text{ cal}$. Therefore, $W_{ibf} = Q_{ibf} - \\Delta U = 36 - 30 = 6\\text{ cal}$."
  },
  {
    "q_num": 15,
    "question_text": "An infinitesimally small slow compression between a cylinder and a piston, where there is friction between the piston and the cylinder is a",
    "options": [
      "Quasi-static process as well as reversible",
      "Reversible but not quasi-static",
      "Quasi-static but not reversible",
      "Insufficient data"
    ],
    "correct_index": 2,
    "topic": "Thermodynamic Systems & Processes",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Because the compression proceeds infinitely slowly, the system remains in continuous quasi-equilibrium states at all times (quasi-static). However, because friction is a dissipative non-conservative force generating heat, the process is irreversible. Thus, it is quasi-static but not reversible."
  },
  {
    "q_num": 16,
    "question_text": "A diatomic gas contained in a vessel is subjected to a thermodynamic process such that its pressure changes with volume as shown. Change of internal energy during the process is",
    "options": [
      "$4.5 \\times 10^5\\text{ J}$",
      "$3.2 \\times 10^5\\text{ J}$",
      "$7.6 \\times 10^5\\text{ J}$",
      "$5.7 \\times 10^5\\text{ J}$"
    ],
    "correct_index": 0,
    "topic": "Internal Energy",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q16.png",
    "solution": "For an ideal diatomic gas, $C_v = \\frac{5}{2}R$. The change in internal energy is $\\Delta U = n C_v \\Delta T = \\frac{5}{2}(P_2 V_2 - P_1 V_1)$. Initial state: $P_1 = 2 \\times 10^5\\text{ N/m}^2, V_1 = 0.1\\text{ m}^3 \\implies P_1 V_1 = 2 \\times 10^4\\text{ J}$. Final state: $P_2 = 4 \\times 10^5\\text{ N/m}^2, V_2 = 0.5\\text{ m}^3 \\implies P_2 V_2 = 20 \\times 10^4\\text{ J}$. Thus, $\\Delta U = \\frac{5}{2}(20 \\times 10^4 - 2 \\times 10^4) = \\frac{5}{2} \\times 18 \\times 10^4 = 4.5 \\times 10^5\\text{ J}$."
  },
  {
    "q_num": 17,
    "question_text": "A monoatomic gas undergoes a change of state by the process shown in the V-T graph. Find the molar specific heat capacity of the gas for the process. (R $\\rightarrow$ Molar gas constant)",
    "options": [
      "1.5R",
      "2.5R",
      "3.5R",
      "0.5R"
    ],
    "correct_index": 1,
    "topic": "Molar Specific Heat Capacities",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q17.png",
    "solution": "In the V-T graph, the line passes through the origin, which means $V \\propto T$. By Charles's Law, this represents an isobaric process ($P = \\text{constant}$). For a monoatomic gas at constant pressure, the molar specific heat capacity is $C = C_p = \\frac{5}{2}R = 2.5R$."
  },
  {
    "q_num": 18,
    "question_text": "A certain ideal gas with adiabatic exponent $\\gamma = 1.5$ is isothermally compressed to half its initial volume. Find the further fractional change in pressure (isochorically) such that when the gas is adiabatically expanded, it reaches its initial conditions",
    "options": [
      "0.41",
      "0.73",
      "0.51",
      "0.49"
    ],
    "correct_index": 0,
    "topic": "Isothermal and Adiabatic Processes",
    "difficulty": "hard",
    "image_url": "",
    "solution": "Let initial state be $(P_0, V_0)$. After isothermal compression to $V_1 = V_0/2$, $P_1 = 2P_0$. Let the pressure be changed isochorically to $P_2$. When adiabatically expanded from $(P_2, V_0/2)$ to $(P_0, V_0)$: $P_2 (V_0/2)^\\gamma = P_0 V_0^\\gamma \\implies P_2 = P_0 (2)^{1.5} = 2\\sqrt{2} P_0 \\approx 2.828 P_0$. The fractional change in pressure is $\\frac{\\Delta P}{P_1} = \\frac{P_2 - P_1}{P_1} = \\frac{2.828 P_0 - 2 P_0}{2 P_0} = \\frac{0.828}{2} = 0.414 \\approx 0.41$."
  },
  {
    "q_num": 19,
    "question_text": "Find the fraction of the work done by a gas and the heat supplied for an isobaric process, if $\\gamma$ is the adiabatic component",
    "options": [
      "$\\frac{1}{\\gamma}$",
      "$\\frac{1+\\gamma}{\\gamma}$",
      "$\\frac{\\gamma-1}{\\gamma}$",
      "None of these"
    ],
    "correct_index": 2,
    "topic": "Isobaric Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an isobaric process, work done is $W = nR\\Delta T$ and heat supplied is $Q = n C_p \\Delta T$. The ratio is $\\frac{W}{Q} = \\frac{R}{C_p} = \\frac{C_p - C_v}{C_p} = 1 - \\frac{1}{\\gamma} = \\frac{\\gamma - 1}{\\gamma}$."
  },
  {
    "q_num": 20,
    "question_text": "The relation between internal energy, pressure and volume ($U$, $P$ and $V$) for a certain gas is $U = a + bPV$, where $a$ and $b$ are positive constants. Then equation of process is (assume no heat exchange to take place)",
    "options": [
      "$PV^a = \\text{constant}$",
      "$PV^{\\frac{b+1}{b}} = \\text{constant}$",
      "$PV^b = \\text{constant}$",
      "$PV^{b/a} = \\text{constant}$"
    ],
    "correct_index": 1,
    "topic": "Adiabatic Process",
    "difficulty": "hard",
    "image_url": "",
    "solution": "For an adiabatic process ($dQ = 0$), First Law gives $dU + P dV = 0$. Given $U = a + bPV \\implies dU = b(P dV + V dP)$. Substituting gives $b(P dV + V dP) + P dV = 0 \\implies (b+1)P dV + bV dP = 0$. Dividing by $bPV$: $\\frac{dP}{P} + \\frac{b+1}{b}\\frac{dV}{V} = 0$. Integrating yields $P V^{\\frac{b+1}{b}} = \\text{constant}$."
  },
  {
    "q_num": 21,
    "question_text": "On moving from $A$ to $B$, the work done by the gas",
    "options": [
      "Continuously increases",
      "Continuously decreases",
      "Increases then decreases",
      "Decreases then increases"
    ],
    "correct_index": 0,
    "topic": "Work Done in Thermodynamic Processes",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q21.png",
    "solution": "The graph has volume $V$ on the vertical axis and pressure $P$ on the horizontal axis. Moving from $A$ to $B$, volume $V$ increases monotonically throughout the path ($dV > 0$). Since pressure $P > 0$ always, incremental work $dW = P dV > 0$ at every point. Thus, the cumulative work done by the gas continuously increases."
  },
  {
    "q_num": 22,
    "question_text": "The variation of $PV$ with $V$ of fixed mass of an ideal gas at constant temperature is graphically represented by",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q22_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q22_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q22_opt3.png"
      },
      {
        "key": "D",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q22_opt4.png"
      }
    ],
    "correct_index": 2,
    "topic": "Isothermal Process & Boyle's Law",
    "difficulty": "easy",
    "image_url": "",
    "solution": "According to Boyle's law, for a fixed mass of an ideal gas at constant temperature, $PV = nRT = \\text{constant}$. Thus, the product $PV$ does not depend on volume $V$, and its graph versus $V$ is a horizontal straight line parallel to the $V$-axis (Option 3)."
  },
  {
    "q_num": 23,
    "question_text": "For a certain process, the pressure of a diatomic gas varies according to relation $P = a V^2$, where $a$ is constant. Pressure = P and Volume = V. The molar heat capacity of gas for this process will be",
    "options": [
      "$\\frac{13}{6}R$",
      "$\\frac{8}{3}R$",
      "$2R$",
      "$\\frac{17}{6}R$"
    ],
    "correct_index": 3,
    "topic": "Polytropic Processes",
    "difficulty": "medium",
    "image_url": "",
    "solution": "Writing the relation as $P V^{-2} = a = \\text{constant}$, we have a polytropic process $PV^x = \\text{constant}$ with index $x = -2$. The molar heat capacity is $C = C_v + \\frac{R}{1 - x}$. For a diatomic gas, $C_v = \\frac{5}{2}R$. Hence, $C = \\frac{5}{2}R + \\frac{R}{1 - (-2)} = \\frac{5}{2}R + \\frac{R}{3} = \\frac{17}{6}R$."
  },
  {
    "q_num": 24,
    "question_text": "Heat is supplied at constant pressure to diatomic gas. The part of heat which goes to increase its internal energy will be",
    "options": [
      "$\\frac{5}{7}$",
      "$\\frac{3}{5}$",
      "$\\frac{2}{5}$",
      "$\\frac{2}{3}$"
    ],
    "correct_index": 0,
    "topic": "First Law of Thermodynamics",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For a diatomic gas at constant pressure, $\\Delta U = n C_v \\Delta T$ and $Q = n C_p \\Delta T$. The fraction that increases internal energy is $\\frac{\\Delta U}{Q} = \\frac{C_v}{C_p} = \\frac{1}{\\gamma} = \\frac{5}{7}$."
  },
  {
    "q_num": 25,
    "question_text": "The efficiency of a Carnot's engine at a particular source and sink temperature is $\\frac{1}{2}$. When the sink temperature is reduced by $100^\\circ\\text{C}$, the engine efficiency becomes $\\frac{2}{3}$. Then the temperature of source is",
    "options": [
      "600 K",
      "300 K",
      "400 K",
      "500 K"
    ],
    "correct_index": 0,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "medium",
    "image_url": "",
    "solution": "Initially $\\eta_1 = 1 - \\frac{T_2}{T_1} = \\frac{1}{2} \\implies \\frac{T_2}{T_1} = \\frac{1}{2}$. When the sink temperature is reduced by 100 K: $\\eta_2 = 1 - \\frac{T_2 - 100}{T_1} = \\frac{2}{3} \\implies \\frac{T_2 - 100}{T_1} = \\frac{1}{3} \\implies \\frac{T_2}{T_1} - \\frac{100}{T_1} = \\frac{1}{3} \\implies \\frac{1}{2} - \\frac{100}{T_1} = \\frac{1}{3} \\implies \\frac{100}{T_1} = \\frac{1}{6} \\implies T_1 = 600\\text{ K}$."
  },
  {
    "q_num": 26,
    "question_text": "During the free expansion of gas, the entropy of gas will",
    "options": [
      "Increase",
      "Decrease",
      "First increase then decrease",
      "Remain same"
    ],
    "correct_index": 0,
    "topic": "Second Law of Thermodynamics & Entropy",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Free expansion of an ideal gas into a vacuum is an irreversible adiabatic process with $\\Delta Q = 0, W = 0 \\implies \\Delta U = 0, \\Delta T = 0$. Because volume increases without external resistance, molecular disorder increases, and entropy change $\\Delta S = nR\\ln(V_2/V_1) > 0$. Hence, entropy of the gas increases."
  },
  {
    "q_num": 27,
    "question_text": "Pressure versus temperature graph of an ideal gas of equal number of moles of different volumes are plotted as shown in figure. Choose the correct alternative",
    "options": [
      "$V_1 = V_2, V_3 = V_4\\text{ and }V_2 > V_3$",
      "$V_1 = V_2, V_3 = V_4\\text{ and }V_2 < V_3$",
      "$V_1 = V_2 = V_3 = V_4$",
      "$V_4 > V_3 > V_2 > V_1$"
    ],
    "correct_index": 0,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q27.png",
    "solution": "In a P-T graph, $P = \\left(\\frac{nR}{V}\\right)T$, so the slope is inversely proportional to volume: $\\text{slope} \\propto 1/V$. Points 3 and 4 lie on the same line, so $V_3 = V_4$. Points 1 and 2 lie on the same line, so $V_1 = V_2$. Since line (3,4) has a greater slope than line (1,2), $\\frac{nR}{V_3} > \\frac{nR}{V_1} \\implies V_3 < V_1 \\implies V_2 > V_3$."
  },
  {
    "q_num": 28,
    "question_text": "20 g of a gas occupies a 100 cc volume at $10^5\\text{ dyne/cm}^2$. If during an isothermal process, the pressure is changed to $10^4\\text{ dyne/cm}^2$, the volume of the gas in cc will be",
    "options": [
      "10",
      "50",
      "200",
      "1000"
    ],
    "correct_index": 3,
    "topic": "Isothermal Process & Boyle's Law",
    "difficulty": "easy",
    "image_url": "",
    "solution": "In an isothermal process, $P_1 V_1 = P_2 V_2 \\implies (10^5)(100) = (10^4) V_2 \\implies V_2 = 1000\\text{ cc}$."
  },
  {
    "q_num": 29,
    "question_text": "P-V plots for two gases during adiabatic process are shown. Plots 1 and 2 correspond respectively to",
    "options": [
      "He and O₂",
      "O₂ and He",
      "He and Ar",
      "O₂ and N₂"
    ],
    "correct_index": 1,
    "topic": "Adiabatic Process",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q29.png",
    "solution": "For an adiabatic process, the slope of the P-V curve is $-\\gamma \\frac{P}{V}$. The steeper curve has a greater value of $\\gamma$. For monoatomic helium ($\\text{He}$), $\\gamma = 5/3 \\approx 1.67$. For diatomic oxygen ($\\text{O}_2$), $\\gamma = 7/5 = 1.4$. Plot 2 has a steeper slope, so it corresponds to $\\text{He}$, while Plot 1 has a gentler slope, corresponding to $\\text{O}_2$."
  },
  {
    "q_num": 30,
    "question_text": "The pressure P of an ideal diatomic gas varies with its absolute temperature T, as shown in figure. The molar heat capacity of gas during this process is (R $\\rightarrow$ Universal gas constant)",
    "options": [
      "1.7R",
      "3.25R",
      "2.5R",
      "4.2R"
    ],
    "correct_index": 2,
    "topic": "Molar Specific Heat Capacities",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q30.png",
    "solution": "The graph is a straight line through the origin, so $P \\propto T \\implies \\frac{P}{T} = \\text{constant}$. Using $PV = nRT$, constant $\\frac{P}{T}$ implies constant volume ($V = \\text{constant}$, isochoric process). For an ideal diatomic gas, the molar heat capacity at constant volume is $C = C_v = \\frac{5}{2}R = 2.5R$."
  },
  {
    "q_num": 31,
    "question_text": "A vessel contains 5 mole of O₂. The system is given heat at constant pressure. As a result the gas expands and does 120 J work. Heat given to the gas is",
    "options": [
      "310 J",
      "300 J",
      "420 J",
      "560 J"
    ],
    "correct_index": 2,
    "topic": "Isobaric Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an ideal diatomic gas ($\\text{O}_2$) at constant pressure, work done is $W = nR\\Delta T = 120\\text{ J}$. Heat supplied is $Q = n C_p \\Delta T = \\frac{7}{2}nR\\Delta T = \\frac{7}{2}W = \\frac{7}{2} \\times 120\\text{ J} = 420\\text{ J}$."
  },
  {
    "q_num": 32,
    "question_text": "An ideal gas expands isothermally from volume $V_1$ to $V_2$ and then compressed to original volume $V_1$ adiabatically. Initial pressure is $P_1$ and final pressure is $P_2$. If the net work done by the gas is W, then",
    "options": [
      "$P_2 > P_1; W > 0$",
      "$P_2 < P_1; W < 0$",
      "$P_2 > P_1; W < 0$",
      "$P_2 = P_1; W = 0$"
    ],
    "correct_index": 2,
    "topic": "Isothermal and Adiabatic Processes",
    "difficulty": "hard",
    "image_url": "",
    "solution": "On a P-V diagram, adiabatic curves are steeper than isothermal curves ($|-\\gamma P/V| > |-P/V|$). During adiabatic compression from $V_2$ back to $V_1$, the path lies entirely above the isothermal expansion path. Therefore, the final pressure $P_2 > P_1$. Moreover, the negative work of compression exceeds the positive work of expansion, resulting in net work done by the gas being negative ($W < 0$)."
  },
  {
    "q_num": 33,
    "question_text": "In a thermodynamic process, helium gas obeys the law $\\frac{T}{P^{2/5}} = \\text{Constant}$. The heat given to the gas when temperature of 4 moles of gas is raised from T to 2T is",
    "options": [
      "8RT",
      "4RT",
      "16RT",
      "Zero"
    ],
    "correct_index": 3,
    "topic": "Adiabatic Process",
    "difficulty": "hard",
    "image_url": "",
    "solution": "Given $\\frac{T}{P^{2/5}} = \\text{constant} \\implies T^5 P^{-2} = \\text{constant}$. Using $P \\propto T/V$, we have $T^5(T/V)^{-2} = T^3 V^2 = \\text{constant} \\implies T V^{2/3} = \\text{constant}$. For monoatomic helium gas, $\\gamma = 5/3$, so $\\gamma - 1 = 2/3$. The equation $T V^{\\gamma - 1} = \\text{constant}$ is the standard adiabatic relation. In an adiabatic process, heat exchanged is zero."
  },
  {
    "q_num": 34,
    "question_text": "One mole of an ideal gas contained in a cylinder undergoes a thermodynamic process during which pressure relates to volume as $P = \\frac{A}{1 + (B/V)^2}$ ($A, B$ are constants). As the volume of the gas is changed from $V = B$ to $V = 2B$, its change of temperature can be expressed as",
    "options": [
      "$\\frac{6AB}{5R}$",
      "$\\frac{AB}{2}$",
      "$\\frac{3AB}{5R}$",
      "$\\frac{11AB}{10R}$"
    ],
    "correct_index": 3,
    "topic": "Thermodynamic Processes & Ideal Gas",
    "difficulty": "medium",
    "image_url": "",
    "solution": "For $n = 1$, $T = \\frac{PV}{R}$. At $V_1 = B$: $P_1 = \\frac{A}{1 + 1} = \\frac{A}{2} \\implies T_1 = \\frac{(A/2)B}{R} = \\frac{AB}{2R}$. At $V_2 = 2B$: $P_2 = \\frac{A}{1 + 1/4} = \\frac{4A}{5} \\implies T_2 = \\frac{(4A/5)(2B)}{R} = \\frac{8AB}{5R}$. The change in temperature is $\\Delta T = T_2 - T_1 = \\frac{8AB}{5R} - \\frac{AB}{2R} = \\frac{11AB}{10R}$."
  },
  {
    "q_num": 35,
    "question_text": "According to second law of thermodynamics:\n(i) All heat can be converted into work.\n(ii) The efficiency of a heat engine is always lesser than unity.\n(iii) It is not possible to transfer heat from lower to higher temperature just by thermal contact.\n(iv) Entropy of the universe may decrease.\nWhich statements are correct?",
    "options": [
      "(ii, iv)",
      "(i, iii)",
      "(ii, iii)",
      "(iii, iv)"
    ],
    "correct_index": 2,
    "topic": "Second Law of Thermodynamics",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Statement (i) is false by Kelvin-Planck statement; a heat engine cannot convert all absorbed heat into work in a cycle. Statement (ii) is correct; $\\eta < 1$ always. Statement (iii) is correct by Clausius statement; spontaneous heat transfer from colder to hotter body is impossible without external work. Statement (iv) is false; entropy of the universe can never decrease. Hence, (ii) and (iii) are correct."
  },
  {
    "q_num": 36,
    "question_text": "In the indicator diagram shown for an ideal gas, the heat exchange between the gas and surrounding is zero for process OA. The heat exchange will be negative for the process",
    "options": [
      "B",
      "C",
      "D",
      "Both C and D"
    ],
    "correct_index": 0,
    "topic": "Indicator Diagrams & Heat Transfer",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q36.png",
    "solution": "Process $OA$ is adiabatic ($dQ = 0$). Curve $OB$ lies below the adiabatic curve $OA$. During expansion to the same volume, the pressure and temperature along $OB$ are lower than along $OA$, meaning internal energy change is more negative and work done is less, leading to $dQ = dU + dW < 0$. Hence, heat exchange is negative for process $B$."
  },
  {
    "q_num": 37,
    "question_text": "V-T graph for a given mass of an ideal gas is shown in figure. The corresponding P-V graph is",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q37_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q37_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q37_opt3.png"
      },
      {
        "key": "D",
        "text": "(4) None of these"
      }
    ],
    "correct_index": 1,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "hard",
    "image_url": "/uploads/thermodynamics/thermo_q37.png",
    "solution": "Along line $CD$, the path points to the origin in V-T, meaning $V \\propto T \\implies P$ is constant (isobaric). In $D \\rightarrow A$, temperature is constant ($T_1$) and volume increases, so pressure decreases along an isotherm. In $A \\rightarrow B$, volume is constant while temperature increases, so pressure increases isochorically. In $B \\rightarrow C$, temperature is constant ($T_2$) and volume decreases, so pressure increases along an isotherm. This corresponds to Graph (2)."
  },
  {
    "q_num": 38,
    "question_text": "Work done by the gas in the cyclic process shown below, is",
    "options": [
      "$-6P_0 V_0$",
      "$6P_0 V_0$",
      "$2P_0 V_0$",
      "$-2P_0 V_0$"
    ],
    "correct_index": 1,
    "topic": "Cyclic Processes",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q38.png",
    "solution": "The work done in a cyclic process on a P-V diagram equals the area enclosed by the cycle. The loop is traced in a clockwise direction, so work done is positive. $W = \\text{Area} = (3P_0 - P_0) \\times (5V_0 - 2V_0) = 2P_0 \\times 3V_0 = +6P_0 V_0$."
  },
  {
    "q_num": 39,
    "question_text": "Heat is supplied to a diatomic gas at constant pressure. The ratio of $\\Delta Q : \\Delta U : W$ is",
    "options": [
      "5:3:2",
      "5:2:3",
      "7:5:2",
      "7:2:5"
    ],
    "correct_index": 2,
    "topic": "Isobaric Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an ideal diatomic gas at constant pressure: $\\Delta Q = n C_p \\Delta T = \\frac{7}{2}nR\\Delta T$, $\\Delta U = n C_v \\Delta T = \\frac{5}{2}nR\\Delta T$, and $W = P\\Delta V = nR\\Delta T = \\frac{2}{2}nR\\Delta T$. The ratio is $\\Delta Q : \\Delta U : W = 7 : 5 : 2$."
  },
  {
    "q_num": 40,
    "question_text": "In an adiabatic process, $1\\text{ m}^3$ of an ideal monoatomic gas expands to $8\\text{ m}^3$. The ratio of final to initial temperature is",
    "options": [
      "4",
      "$\\frac{1}{4}$",
      "8",
      "$\\frac{1}{8}$"
    ],
    "correct_index": 1,
    "topic": "Adiabatic Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an adiabatic process, $T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1}$. For a monoatomic gas, $\\gamma = 5/3$, so $\\gamma - 1 = 2/3$. Thus, $\\frac{T_2}{T_1} = \\left(\\frac{V_1}{V_2}\\right)^{2/3} = \\left(\\frac{1}{8}\\right)^{2/3} = \\left(\\frac{1}{2^3}\\right)^{2/3} = \\frac{1}{4}$."
  },
  {
    "q_num": 41,
    "question_text": "An ideal monoatomic gas undergoes a cyclic process shown by following P-V diagram. The dotted curves are isotherms. The efficiency of a heat engine based on this process is",
    "options": [
      "$\\frac{1}{5}$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{13}$",
      "$\\frac{3}{4}$"
    ],
    "correct_index": 2,
    "topic": "Cyclic Processes & Efficiency",
    "difficulty": "hard",
    "image_url": "/uploads/thermodynamics/thermo_q41.png",
    "solution": "Heat is absorbed during $D \\rightarrow A$ (isochoric heating from 1000 K to 2000 K) and $A \\rightarrow B$ (isobaric heating from 2000 K to 4000 K). $Q_{DA} = n C_v (2000 - 1000) = 1500 nR$. $Q_{AB} = n C_p (4000 - 2000) = 5000 nR$. Total $Q_{\\text{in}} = 6500 nR$. Heat is rejected during $B \\rightarrow C$ (isochoric cooling: $3000 nR$) and $C \\rightarrow D$ (isobaric cooling: $2500 nR$). Net work done is $W = Q_{\\text{in}} - Q_{\\text{out}} = 6500 nR - 5500 nR = 1000 nR$. Efficiency $\\eta = \\frac{W}{Q_{\\text{in}}} = \\frac{1000}{6500} = \\frac{2}{13}$."
  },
  {
    "q_num": 42,
    "question_text": "For an reversible adiabatic expansion of an ideal gas the fractional change in its pressure is equal to (symbols have their usual significance)",
    "options": [
      "$-\\frac{1}{\\gamma}\\frac{dV}{V}$",
      "$\\frac{1}{\\gamma}\\frac{dV}{V^{\\gamma-1}}$",
      "$\\gamma\\frac{dV}{V^{\\gamma-1}}$",
      "$-\\gamma\\frac{dV}{V}$"
    ],
    "correct_index": 3,
    "topic": "Adiabatic Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "In a reversible adiabatic process, $PV^\\gamma = \\text{constant}$. Differentiating both sides: $d(PV^\\gamma) = 0 \\implies V^\\gamma dP + \\gamma P V^{\\gamma - 1} dV = 0$. Dividing through by $PV^\\gamma$ gives $\\frac{dP}{P} + \\gamma \\frac{dV}{V} = 0 \\implies \\frac{dP}{P} = -\\gamma \\frac{dV}{V}$."
  },
  {
    "q_num": 43,
    "question_text": "For a certain experimental process, it is found that $W = x \\Delta Q$ where $\\Delta Q =$ heat energy supplied to the gas, $W =$ work done by gas, $x =$ constant. If the gas is known to be CO₂, the molar specific heat capacity of the gas in the process is (neglect vibrational modes)",
    "options": [
      "$\\frac{5R}{2(1-x)}$",
      "$\\frac{3R}{2(1-x)}$",
      "$\\frac{3R}{(1-x)}$",
      "$\\frac{7R}{2(1-x)}$"
    ],
    "correct_index": 0,
    "topic": "First Law & Specific Heat",
    "difficulty": "hard",
    "image_url": "",
    "solution": "By First Law, $dQ = dU + dW = dU + x dQ \\implies (1 - x) dQ = dU \\implies dQ = \\frac{dU}{1 - x}$. Since $dU = n C_v dT$ and $dQ = n C dT$, we get $C = \\frac{C_v}{1 - x}$. $\\text{CO}_2$ is a linear triatomic molecule with degrees of freedom $f = 5$ (neglecting vibrational modes), so $C_v = \\frac{5}{2}R$. Hence, $C = \\frac{5R}{2(1 - x)}$."
  },
  {
    "q_num": 44,
    "question_text": "On a volume temperature diagram a process 1-2 is an upward sloping straight line as shown in figure. During the process, the pressure",
    "options": [
      "Remains constant",
      "Continuously increases",
      "Continuously decreases",
      "Data insufficient"
    ],
    "correct_index": 1,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q44.png",
    "solution": "The straight line in the V-T graph has a positive slope $m$ and a positive intercept $V_0$ on the volume axis: $V = mT + V_0$ with $V_0 > 0$. From the ideal gas law, $P = \\frac{nRT}{V} = \\frac{nRT}{mT + V_0} = \\frac{nR}{m + V_0/T}$. As temperature $T$ increases, $\\frac{V_0}{T}$ decreases, so the denominator decreases, causing pressure $P$ to continuously increase."
  },
  {
    "q_num": 45,
    "question_text": "A cyclic process is shown in a V-T diagram. The corresponding P-V diagram is",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q45_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q45_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q45_opt3.png"
      },
      {
        "key": "D",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q45_opt4.png"
      }
    ],
    "correct_index": 0,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q45.png",
    "solution": "$A \\rightarrow B$ is a straight line through the origin in V-T, meaning $V \\propto T \\implies P = \\text{constant}$ (isobaric expansion, horizontal line to the right in P-V). $B \\rightarrow C$ is horizontal in V-T, meaning $V = \\text{constant}$ and $T$ decreases $implies P$ decreases vertically downwards in P-V. $C \\rightarrow A$ is vertical in V-T, meaning $T = \\text{constant}$ (isothermal compression, hyperbola moving up and left in P-V). This precisely matches Graph (1)."
  },
  {
    "q_num": 46,
    "question_text": "A sample of diatomic gas is supplied heat energy Q at constant pressure. What is the amount of energy used to increase the internal energy?",
    "options": [
      "$\\frac{2}{3}Q$",
      "$\\frac{1}{5}Q$",
      "$\\frac{5}{7}Q$",
      "$\\frac{2}{7}Q$"
    ],
    "correct_index": 2,
    "topic": "First Law of Thermodynamics",
    "difficulty": "easy",
    "image_url": "",
    "solution": "At constant pressure, $\\Delta U = n C_v \\Delta T = \\frac{C_v}{C_p}Q = \\frac{1}{\\gamma}Q$. For a diatomic gas, $\\gamma = 7/5$, so $\\Delta U = \\frac{5}{7}Q$."
  },
  {
    "q_num": 47,
    "question_text": "The P-V graphs of adiabatic processes of three different gas samples (monoatomic, diatomic, polyatomic) are shown in the figure. Which of the processes represent the process for monoatomic gas?",
    "options": [
      "1",
      "2",
      "3",
      "Data insufficient"
    ],
    "correct_index": 0,
    "topic": "Adiabatic Process",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q47.png",
    "solution": "In adiabatic expansion from a given state, the slope magnitude is $\\gamma \\frac{P}{V}$. Since $\\gamma_{\\text{mono}} (1.67) > \\gamma_{\\text{dia}} (1.40) > \\gamma_{\\text{poly}} (1.33)$, the curve with the steepest descent corresponds to the monoatomic gas. Curve 1 is the steepest and represents the monoatomic gas."
  },
  {
    "q_num": 48,
    "question_text": "A Carnot engine is working between temperature T1 (source) and T2 (sink). The efficiency is 40%. If T2 = 300 K, then by how much amount T1 must be increased so as to increase the efficiency to 50%?",
    "options": [
      "200 K",
      "300 K",
      "250 K",
      "100 K"
    ],
    "correct_index": 3,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Initially, $\\eta_1 = 1 - \\frac{T_2}{T_1} = 0.40 \\implies \\frac{300}{T_1} = 0.60 \\implies T_1 = 500\\text{ K}$. To achieve $\\eta_2 = 0.50$, $1 - \\frac{300}{T_1'} = 0.50 \\implies T_1' = 600\\text{ K}$. The required increase in source temperature is $\\Delta T_1 = 600 - 500 = 100\\text{ K}$."
  },
  {
    "q_num": 49,
    "question_text": "A container contains $n$ moles of O₂ gas at temperature T. Now $\\alpha$ fraction of the gas dissociates adiabatically without any change in the internal energy. The final temperature is",
    "options": [
      "$\\frac{5T}{\\alpha+5}$",
      "$\\frac{T}{\\alpha+5}$",
      "$\\frac{(\\alpha+5)T}{\\alpha}$",
      "$\\frac{\\alpha T}{5}$"
    ],
    "correct_index": 0,
    "topic": "Degree of Freedom & Internal Energy",
    "difficulty": "hard",
    "image_url": "",
    "solution": "Initial internal energy of $n$ moles of diatomic $\\text{O}_2$ is $U_i = n\\left(\\frac{5}{2}R\\right)T$. When fraction $\\alpha$ dissociates, there are $n(1 - \\alpha)$ moles of diatomic $\\text{O}_2$ and $2n\\alpha$ moles of monoatomic $\\text{O}$. Final internal energy is $U_f = n(1 - \\alpha)\\left(\\frac{5}{2}R\\right)T' + 2n\\alpha\\left(\\frac{3}{2}R\\right)T' = \\left(\\frac{5 + \\alpha}{2}\\right)nRT'$. Since internal energy is unchanged ($U_f = U_i$), $\\left(\\frac{5 + \\alpha}{2}\\right)T' = \\frac{5}{2}T \\implies T' = \\frac{5T}{\\alpha + 5}$."
  },
  {
    "q_num": 50,
    "question_text": "If in the process-1 from a to b, heat supplied $(Q_1) = 60\\text{ cal}$ and work done by gas $(W_1) = 20\\text{ cal}$, find heat for the process-2 while work for this process is 30 cal.",
    "options": [
      "70 cal",
      "50 cal",
      "10 cal",
      "60 cal"
    ],
    "correct_index": 0,
    "topic": "First Law of Thermodynamics",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q50.png",
    "solution": "For process 1 from $a$ to $b$, $\\Delta U = Q_1 - W_1 = 60 - 20 = 40\\text{ cal}$. Since internal energy is a state function, for any other process from $a$ to $b$, $\\Delta U = 40\\text{ cal}$. For process 2, $Q_2 = \\Delta U + W_2 = 40 + 30 = 70\\text{ cal}$."
  },
  {
    "q_num": 51,
    "question_text": "Thermodynamic system of ideal gas is taken from initial state A to final state C through B as shown in the indicator diagram. Select the correct statement",
    "options": [
      "The process is isochoric",
      "Work done by the gas in process is negative",
      "Work done by the gas in the process is zero",
      "Both (1) and (3)"
    ],
    "correct_index": 1,
    "topic": "Indicator Diagrams & Work Done",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q51.png",
    "solution": "Path $ABC$ is a semicircle from $A(V_0, P_i)$ to $C(V_0, P_f)$ with $V$ first decreasing to a minimum at $B$ (compression) and then increasing back to $V_0$ at $C$ (expansion). Because compression occurs at higher pressures along the upper half while expansion occurs at lower pressures along the lower half, the negative work during compression exceeds the positive work during expansion. Hence, the net work done by the gas is negative."
  },
  {
    "q_num": 52,
    "question_text": "In a cyclic process ABCDA, heat added to gas sample in different processes are given below:\n$Q_{AB} = 400\\text{ J}$, $Q_{BC} = 300\\text{ J}$, $Q_{CD} = -200\\text{ J}$, $Q_{DA} = -100\\text{ J}$.\nEfficiency of process is",
    "options": [
      "$\\frac{1}{2}$",
      "$\\frac{3}{7}$",
      "$\\frac{4}{7}$",
      "$\\frac{2}{7}$"
    ],
    "correct_index": 2,
    "topic": "Cyclic Processes & Efficiency",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Total heat absorbed by the system is $Q_{\\text{in}} = Q_{AB} + Q_{BC} = 400 + 300 = 700\\text{ J}$. Total work done in the cycle is $W = \\sum Q = 400 + 300 - 200 - 100 = 400\\text{ J}$. Efficiency $\\eta = \\frac{W}{Q_{\\text{in}}} = \\frac{400}{700} = \\frac{4}{7}$."
  },
  {
    "q_num": 53,
    "question_text": "10 moles of oxygen gas in a closed container is supplied with a certain amount of heat energy $\\Delta Q$ such that 2 moles dissociate into atomic oxygen at same temperature T. Find the heat energy supplied to the gas. (R is universal gas constant)",
    "options": [
      "6RT",
      "4RT",
      "2RT",
      "RT"
    ],
    "correct_index": 3,
    "topic": "Internal Energy & Dissociation",
    "difficulty": "medium",
    "image_url": "",
    "solution": "For a closed container, volume is constant ($W = 0$), so $\\Delta Q = \\Delta U$. Initial internal energy of 10 moles of diatomic $\\text{O}_2$ is $U_i = 10 \\times \\left(\\frac{5}{2}RT\\right) = 25RT$. After dissociation of 2 moles, 8 moles of $\\text{O}_2$ and 4 moles of atomic $\\text{O}$ are present at temperature $T$. Final internal energy is $U_f = 8 \\times \\left(\\frac{5}{2}RT\\right) + 4 \\times \\left(\\frac{3}{2}RT\\right) = 20RT + 6RT = 26RT$. Thus, $\\Delta Q = \\Delta U = 26RT - 25RT = RT$."
  },
  {
    "q_num": 54,
    "question_text": "Two different masses m and 3m of a perfect gas are heated separately in a vessel of constant volume. The pressure (P) versus absolute temperature (T) graph for these two cases are shown as A and B. The ratio of slopes of the curves B to A, is",
    "options": [
      "3 : 1",
      "1 : 3",
      "9 : 1",
      "1 : 9"
    ],
    "correct_index": 0,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q54.png",
    "solution": "From $PV = nRT = \\left(\\frac{m}{M}\\right)RT$, the pressure is $P = \\left(\\frac{mR}{MV}\\right)T$. For constant volume $V$ and molar mass $M$, the slope of the P-T graph is directly proportional to mass $m$. Therefore, $\\frac{\\text{slope}(B)}{\\text{slope}(A)} = \\frac{3m}{m} = 3:1$."
  },
  {
    "q_num": 55,
    "question_text": "The maximum possible efficiency of an engine that absorbs heat at $327^\\circ\\text{C}$ and exhausts heat at $127^\\circ\\text{C}$ is",
    "options": [
      "$\\frac{1}{3}$",
      "$\\frac{1}{2}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{4}$"
    ],
    "correct_index": 0,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Maximum possible efficiency is given by the Carnot efficiency: $\\eta_{\\max} = 1 - \\frac{T_C}{T_H}$. Here $T_H = 327 + 273 = 600\\text{ K}$ and $T_C = 127 + 273 = 400\\text{ K}$. Hence, $\\eta_{\\max} = 1 - \\frac{400}{600} = 1 - \\frac{2}{3} = \\frac{1}{3}$."
  },
  {
    "q_num": 56,
    "question_text": "If the volume of 1 mole of an ideal gas is doubled. Work done will be maximum, when expansion is",
    "options": [
      "Isobaric",
      "Isothermal",
      "Adiabatic",
      "Isochoric"
    ],
    "correct_index": 0,
    "topic": "Work Done in Thermodynamic Processes",
    "difficulty": "easy",
    "image_url": "",
    "solution": "On a P-V diagram, the work done during expansion from $V$ to $2V$ equals the area under the curve. For isobaric expansion, pressure remains at initial peak value $P_0$ (horizontal line), which encloses the maximum possible area compared to isothermal (decreasing $P$) and adiabatic (rapidly decreasing $P$) processes."
  },
  {
    "q_num": 57,
    "question_text": "During the heating process of an ideal gas from state-1 to state-2, volume of the gas",
    "options": [
      "Increases",
      "Decreases",
      "Remains constant",
      "May increase or decrease"
    ],
    "correct_index": 0,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q57.png",
    "solution": "The straight line on the P-T diagram has a positive intercept $P_0$ on the pressure axis: $P = mT + P_0$ with $P_0 > 0$. Using the ideal gas equation, $V = \\frac{nRT}{P} = \\frac{nRT}{mT + P_0} = \\frac{nR}{m + P_0/T}$. As the gas is heated from state 1 to state 2 ($T$ increases), $\\frac{P_0}{T}$ decreases, which makes the denominator smaller, and therefore the volume $V$ increases."
  },
  {
    "q_num": 58,
    "question_text": "Work done by the gas in the cyclic process $(a \\rightarrow b \\rightarrow c \\rightarrow a)$ is",
    "options": [
      "20 J",
      "-20 J",
      "10 J",
      "40 J"
    ],
    "correct_index": 2,
    "topic": "Cyclic Processes",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q58.png",
    "solution": "The work done equals the area of the right-angled triangle $abca$. The cycle is traced clockwise, so work is positive. Base $= (4 - 2)\\text{ L} = 2 \\times 10^{-3}\\text{ m}^3$. Height $= (0.3 - 0.2) \\times 10^5\\text{ N/m}^2 = 10^4\\text{ N/m}^2$. $W = \\frac{1}{2} \\times \\text{Base} \\times \\text{Height} = \\frac{1}{2} \\times (2 \\times 10^{-3}) \\times 10^4 = +10\\text{ J}$."
  },
  {
    "q_num": 59,
    "question_text": "In adiabatic expansion the product of pressure and volume",
    "options": [
      "Increases",
      "Decreases",
      "Remains constant",
      "May increase or decrease"
    ],
    "correct_index": 1,
    "topic": "Adiabatic Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "For an ideal gas, $PV = nRT$. In an adiabatic expansion ($dQ = 0, dW > 0$), by First Law $dU = -dW < 0$, which causes the temperature $T$ of the gas to fall. Since temperature decreases, the product of pressure and volume $PV = nRT$ decreases."
  },
  {
    "q_num": 60,
    "question_text": "A Carnot engine works between two temperatures $27^\\circ\\text{C}$ and $327^\\circ\\text{C}$. Then its efficiency will be",
    "options": [
      "60%",
      "30%",
      "20%",
      "50%"
    ],
    "correct_index": 3,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "easy",
    "image_url": "",
    "solution": "$T_C = 27 + 273 = 300\\text{ K}$, $T_H = 327 + 273 = 600\\text{ K}$. Efficiency is $\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 1 - 0.5 = 50\\%$."
  },
  {
    "q_num": 61,
    "question_text": "Which of the following graph correctly represent the variation $K = \\frac{(-dV/dP)}{V}$ with P for an ideal gas at constant temperature?",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q61_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q61_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q61_opt3.png"
      },
      {
        "key": "D",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q61_opt4.png"
      }
    ],
    "correct_index": 0,
    "topic": "Isothermal Compressibility",
    "difficulty": "medium",
    "image_url": "",
    "solution": "For an isothermal process of an ideal gas, $PV = \\text{constant} \\implies P dV + V dP = 0 \\implies -\\frac{dV}{dP} = \\frac{V}{P}$. Therefore, the isothermal compressibility is $K = \\frac{1}{V}\\left(-\\frac{dV}{dP}\\right) = \\frac{1}{V}\\left(\\frac{V}{P}\\right) = \\frac{1}{P}$. The graph of $K$ versus $P$ is a rectangular hyperbola (Graph 1)."
  },
  {
    "q_num": 62,
    "question_text": "Choose the correct option",
    "options": [
      "All quick expansions are adiabatic but all adiabatic process need not be necessarily quick",
      "Quasistatic process is an idealised process in which all changes take place infinitely slowly",
      "Reversible process must be quasistatic",
      "All of the above"
    ],
    "correct_index": 3,
    "topic": "Thermodynamic Systems & Concepts",
    "difficulty": "easy",
    "image_url": "",
    "solution": "(1) Sudden/quick processes prevent heat exchange and are adiabatic, but adiabatic processes can also occur quasistatically with ideal insulating walls. (2) A quasistatic process proceeds infinitely slowly through successive equilibrium states. (3) Any reversible process must pass through equilibrium states and thus must be quasistatic. Hence, all of the above statements are correct."
  },
  {
    "q_num": 63,
    "question_text": "A diatomic ideal gas initially at temperature T1 is enclosed in a cylinder fitted with a frictionless piston. The gas is allowed to expand adiabatically to a temperature T2. If the lengths of gas column in cylinder are L1 and L2 respectively, then $\\frac{T_1}{T_2}$ is",
    "options": [
      "$\\left(\\frac{L_2}{L_1}\\right)^{2/5}$",
      "$\\left(\\frac{L_2}{L_1}\\right)^{5/2}$",
      "$\\left(\\frac{L_1}{L_2}\\right)^{2/3}$",
      "$\\left(\\frac{L_2}{L_1}\\right)^{3/2}$"
    ],
    "correct_index": 0,
    "topic": "Adiabatic Process",
    "difficulty": "medium",
    "image_url": "",
    "solution": "The volume is $V = A \\cdot L \\propto L$. In an adiabatic process, $T_1 V_1^{\\gamma - 1} = T_2 V_2^{\\gamma - 1} \\implies \\frac{T_1}{T_2} = \\left(\\frac{V_2}{V_1}\\right)^{\\gamma - 1} = \\left(\\frac{L_2}{L_1}\\right)^{\\gamma - 1}$. For a diatomic gas, $\\gamma = 7/5$, so $\\gamma - 1 = 2/5$. Thus, $\\frac{T_1}{T_2} = \\left(\\frac{L_2}{L_1}\\right)^{2/5}$."
  },
  {
    "q_num": 64,
    "question_text": "The pressure in a diatomic gas, increase from P0 to 3P0, when its volume increases from V0 to 2V0. The increase in internal energy is",
    "options": [
      "$6P_0 V_0$",
      "$8.5P_0 V_0$",
      "$12.5P_0 V_0$",
      "$14.5P_0 V_0$"
    ],
    "correct_index": 2,
    "topic": "Internal Energy",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q64.png",
    "solution": "For an ideal diatomic gas, $C_v = \\frac{5}{2}R$. Increase in internal energy is $\\Delta U = n C_v \\Delta T = \\frac{5}{2}(P_2 V_2 - P_1 V_1) = \\frac{5}{2}[(3P_0)(2V_0) - P_0 V_0] = \\frac{5}{2}(6P_0 V_0 - P_0 V_0) = \\frac{5}{2}(5P_0 V_0) = 12.5 P_0 V_0$."
  },
  {
    "q_num": 65,
    "question_text": "First law of thermodynamics introduces the",
    "options": [
      "Concept of temperature",
      "Concept of conservation of energy",
      "Concept of working of heat engine",
      "Concept of entropy"
    ],
    "correct_index": 1,
    "topic": "First Law of Thermodynamics",
    "difficulty": "easy",
    "image_url": "",
    "solution": "The First Law of Thermodynamics is the formulation of the principle of conservation of energy for thermodynamic systems ($dQ = dU + dW$). The concept of temperature is introduced by the Zeroth Law, and entropy is introduced by the Second Law."
  },
  {
    "q_num": 66,
    "question_text": "For free expansion of an ideal gas",
    "options": [
      "$W = 0$",
      "$\\Delta U = 0$",
      "$\\Delta Q = 0$",
      "All of these"
    ],
    "correct_index": 3,
    "topic": "Free Expansion",
    "difficulty": "easy",
    "image_url": "",
    "solution": "In free expansion into an evacuated insulated space, no external work is performed against surrounding pressure ($W = 0$), no heat is exchanged ($\\Delta Q = 0$), and by the First Law $\\Delta U = \\Delta Q - W = 0$. Hence, all of these are true."
  },
  {
    "q_num": 67,
    "question_text": "What is the ratio of temperatures T1 and T2?",
    "options": [
      "$\\sqrt{3} : 1$",
      "3 : 1",
      "9 : 1",
      "27 : 1"
    ],
    "correct_index": 1,
    "topic": "Isothermal Process & Ideal Gas",
    "difficulty": "easy",
    "image_url": "/uploads/thermodynamics/thermo_q67.png",
    "solution": "The horizontal dashed line represents an isobaric line (same pressure $P$). Along this line, curve $T_2$ corresponds to volume $V_0$ ($PV_0 = nRT_2$) and curve $T_1$ corresponds to volume $3V_0$ ($P(3V_0) = nRT_1$). Dividing gives $\\frac{T_1}{T_2} = \\frac{3V_0}{V_0} = 3 : 1$."
  },
  {
    "q_num": 68,
    "question_text": "The efficiency of a heat engine is less than 100% because of",
    "options": [
      "The presence of friction",
      "The leakage of heat energy",
      "Unavailability of the sink at zero kelvin",
      "All of these"
    ],
    "correct_index": 3,
    "topic": "Second Law & Heat Engines",
    "difficulty": "easy",
    "image_url": "",
    "solution": "Theoretical 100% efficiency requires a sink temperature of absolute zero ($T_2 = 0\\text{ K}$), which is physically impossible to reach. Moreover, real engines experience friction between moving parts and heat loss/leakage to the surroundings. Therefore, all of these factors prevent 100% efficiency."
  },
  {
    "q_num": 69,
    "question_text": "How does the temperature change when the state of an ideal gas is changed according to the process shown in figure?",
    "options": [
      "Temperature increases continuously",
      "Temperature decreases continuously",
      "Temperature first increases and then decreases",
      "Temperature first decreases and then increases"
    ],
    "correct_index": 2,
    "topic": "Thermodynamic Processes & Graphs",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q69.png",
    "solution": "Temperature is proportional to the product of pressure and volume ($T \\propto PV$). Along the upper circular path from $a$ to $b$, both $P$ and $V$ initially increase, causing $PV$ and therefore temperature to increase to a maximum near the top of the curve. As the path continues towards $b$, pressure drops significantly, causing $PV$ and temperature to decrease. Thus, temperature first increases and then decreases."
  },
  {
    "q_num": 70,
    "question_text": "A practical heat engine operates between temperatures $27^\\circ\\text{C}$ and $627^\\circ\\text{C}$. The efficiency of the engine may be",
    "options": [
      "75%",
      "70%",
      "68%",
      "50%"
    ],
    "correct_index": 3,
    "topic": "Carnot Engine & Efficiency",
    "difficulty": "medium",
    "image_url": "",
    "solution": "Source temperature $T_1 = 627 + 273 = 900\\text{ K}$, sink temperature $T_2 = 27 + 273 = 300\\text{ K}$. The maximum theoretical (Carnot) efficiency is $\\eta_{\\text{Carnot}} = 1 - \\frac{300}{900} = 1 - \\frac{1}{3} = \\frac{2}{3} \\approx 66.7\\%$. Any practical real engine has irreversible losses and must have an efficiency strictly less than the Carnot limit ($\\eta < 66.7\\%$). Among the given options, only 50% is possible."
  },
  {
    "q_num": 71,
    "question_text": "An ideal monoatomic gas undergoes a process from state a to state b as shown. If the heat supplied to the gas is $20 p_0 V_0$, then the shaded area is equal to",
    "options": [
      "$12p_0 V_0$",
      "$8p_0 V_0$",
      "$4p_0 V_0$",
      "$p_0 V_0$"
    ],
    "correct_index": 1,
    "topic": "First Law of Thermodynamics",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q71.png",
    "solution": "The shaded area represents the work done by the gas: $W = \\Delta Q - \\Delta U$. For an ideal monoatomic gas, $\\Delta U = n C_v \\Delta T = \\frac{3}{2}(P_b V_b - P_a V_a) = \\frac{3}{2}[(3p_0)(3V_0) - p_0 V_0] = \\frac{3}{2}(8p_0 V_0) = 12p_0 V_0$. Given $\\Delta Q = 20p_0 V_0$, the work done is $W = 20p_0 V_0 - 12p_0 V_0 = 8p_0 V_0$."
  },
  {
    "q_num": 72,
    "question_text": "Let P, V and T denote respectively the pressure, volume and temperature of an ideal gas. The correct graph for adiabatic process is",
    "options": [
      {
        "key": "A",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q72_opt1.png"
      },
      {
        "key": "B",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q72_opt2.png"
      },
      {
        "key": "C",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q72_opt3.png"
      },
      {
        "key": "D",
        "text": "",
        "image_url": "/uploads/thermodynamics/thermo_q72_opt4.png"
      }
    ],
    "correct_index": 0,
    "topic": "Adiabatic Process & Graphs",
    "difficulty": "hard",
    "image_url": "",
    "solution": "In an adiabatic process, $PV^\\gamma = \\text{constant} \\implies \\frac{dP}{dV} = -\\gamma \\frac{P}{V} \\implies \\frac{dV}{dP} = -\\frac{V}{\\gamma P}$. Thus, $-T \\frac{dV}{dP} = \\frac{T V}{\\gamma P}$. From ideal gas equation $\\frac{T}{P} = \\frac{V}{nR}$, we obtain $-T \\frac{dV}{dP} = \\left(\\frac{1}{\\gamma nR}\\right) V^2$. Therefore, the graph of $\\left(-T \\frac{dV}{dP}\\right)$ versus $V^2$ is a straight line passing through the origin with positive slope (Graph 1)."
  },
  {
    "q_num": 73,
    "question_text": "The pressure and volume of an ideal monoatomic gas are related as $P V^{1/2} = \\text{Constant}$ for a process $A \\rightarrow B$. The change in internal energy in the process $A \\rightarrow B$ is",
    "options": [
      "$12P_0 V_0$",
      "$8P_0 V_0$",
      "$4P_0 V_0$",
      "$2P_0 V_0$"
    ],
    "correct_index": 0,
    "topic": "Internal Energy & Polytropic Process",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q73.png",
    "solution": "At state $A$, $P_A = 2P_0$ and $V_A = 4V_0$, so the constant is $P_A V_A^{1/2} = (2P_0)(4V_0)^{1/2} = 4P_0 V_0^{1/2}$. At state $B$, $P_B = P_0$, so $P_B V_B^{1/2} = 4P_0 V_0^{1/2} \\implies V_B^{1/2} = 4V_0^{1/2} \\implies V_B = 16V_0$. For an ideal monoatomic gas, $\\Delta U = \\frac{3}{2}(P_B V_B - P_A V_A) = \\frac{3}{2}[(P_0)(16V_0) - (2P_0)(4V_0)] = \\frac{3}{2}[16P_0 V_0 - 8P_0 V_0] = \\frac{3}{2}(8P_0 V_0) = 12P_0 V_0$."
  },
  {
    "q_num": 74,
    "question_text": "One mole of an ideal monoatomic gas undergoes a thermodynamic cycle as shown in the figure. If $U_a$ and $U_c$ are internal energies at a and c respectively. Then $U_a - U_c$ is [$T_0$ = temperature at a]",
    "options": [
      "$21R_0 T_0$",
      "$10.5R_0 T_0$",
      "$-10.5R_0 T_0$",
      "$-21R_0 T_0$"
    ],
    "correct_index": 2,
    "topic": "Internal Energy",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q74.png",
    "solution": "For 1 mole of monoatomic gas, $U = \\frac{3}{2}RT$. At state $a(V_0, P_0)$, $T_a = \\frac{P_0 V_0}{R} = T_0 \\implies U_a = \\frac{3}{2}RT_0$. At state $c(2V_0, 4P_0)$, $T_c = \\frac{(4P_0)(2V_0)}{R} = 8T_0 \\implies U_c = \\frac{3}{2}R(8T_0) = 12RT_0$. Therefore, $U_a - U_c = \\frac{3}{2}RT_0 - 12RT_0 = -10.5RT_0$."
  },
  {
    "q_num": 75,
    "question_text": "3 moles of a monoatomic gas does 150 J work when it expands isobarically. Then change in its internal energy will be",
    "options": [
      "100 J",
      "225 J",
      "400 J",
      "450 J"
    ],
    "correct_index": 1,
    "topic": "Isobaric Process",
    "difficulty": "easy",
    "image_url": "",
    "solution": "In an isobaric expansion of a monoatomic gas: $W = nR\\Delta T = 150\\text{ J}$. Change in internal energy is $\\Delta U = n C_v \\Delta T = n\\left(\\frac{3}{2}R\\right)\\Delta T = \\frac{3}{2}(nR\\Delta T) = \\frac{3}{2} \\times 150\\text{ J} = 225\\text{ J}$."
  },
  {
    "q_num": 76,
    "question_text": "A diatomic gas is at temperature $1727^\\circ\\text{C}$. If it expands such that its final volume becomes 32 times its initial value without exchange of heat then its final temperature will become",
    "options": [
      "$100^\\circ\\text{C}$",
      "$227^\\circ\\text{C}$",
      "$373^\\circ\\text{C}$",
      "$527^\\circ\\text{C}$"
    ],
    "correct_index": 1,
    "topic": "Adiabatic Process",
    "difficulty": "medium",
    "image_url": "",
    "solution": "Initial temperature $T_1 = 1727 + 273 = 2000\\text{ K}$. Since there is no exchange of heat, the process is adiabatic ($T V^{\\gamma - 1} = \\text{constant}$). For a diatomic gas, $\\gamma = 7/5$, so $\\gamma - 1 = 2/5$. Thus, $\\frac{T_2}{T_1} = \\left(\\frac{V_1}{V_2}\\right)^{2/5} = \\left(\\frac{1}{32}\\right)^{2/5} = \\left(\\frac{1}{2^5}\\right)^{2/5} = \\frac{1}{4}$. Final temperature $T_2 = \\frac{2000\\text{ K}}{4} = 500\\text{ K}$. In Celsius: $t_2 = 500 - 273 = 227^\\circ\\text{C}$."
  },
  {
    "q_num": 77,
    "question_text": "The figure shows two paths for change of thermodynamic state from A to B. If $C_1$ and $C_2$ are molar heat capacities for path AQB and APB respectively, then",
    "options": [
      "$C_1 > C_2$",
      "$C_2 > C_1$",
      "$C_1 = C_2$",
      "$C_2 = 2C_1$"
    ],
    "correct_index": 0,
    "topic": "Molar Specific Heat Capacities",
    "difficulty": "medium",
    "image_url": "/uploads/thermodynamics/thermo_q77.png",
    "solution": "Both paths connect the same initial state $A$ to the same final state $B$, so temperature change $\\Delta T$ and internal energy change $\\Delta U$ are identical for both. Work done is the area under the path on the P-V diagram. Since path $AQB$ lies above path $APB$, $W_1 > W_2$. By the First Law, $Q = \\Delta U + W$, so $Q_1 > Q_2$. The molar heat capacity is $C = \\frac{Q}{n\\Delta T}$, and since $Q_1 > Q_2$, it follows that $C_1 > C_2$."
  }
];

async function seed() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Thermodynamics';

    // 1. Get Subject ID (Physics)
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;

    // 2. Get or Create Chapter ID
    let chapRes = await client.query(
      "SELECT id FROM chapters WHERE name ILIKE $1 AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter '${chapterName}' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapterName}' with ID: ${chapterId}`);
    }

    let inserted = 0;
    let skipped = 0;

    for (const q of QUESTIONS) {
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
      console.log(`[${inserted}/${QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed chapter '${chapterName}': Inserted ${inserted}, Skipped ${skipped}. Total: ${QUESTIONS.length}`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed();
}
