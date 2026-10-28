import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const BATCH3_QUESTIONS = [
  // Section A (Continued): Q156 to Q162
  {
    q_num: 156,
    question_text: "0.4 mole of an ideal monatomic gas is allowed to expand adiabatically so that its temperature changes from 800 K to 500 K. The work done during expansion is nearly equal to",
    options: ["129.6 J", "-129.6 J", "1496.5 J", "-1496.5 J"],
    correct_index: 2,
    topic: "Adiabatic Process",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q156.png",
    solution: "For an ideal monatomic gas, the molar heat capacity at constant volume is:\n$$C_v = \\frac{3}{2}R$$\nIn an adiabatic process, $Q = 0$, so by the First Law of Thermodynamics, the work done during expansion is given by:\n$$W = -\\Delta U = -n C_v (T_2 - T_1) = n C_v (T_1 - T_2)$$\nGiven:\n- Number of moles, $n = 0.4\\text{ mol}$\n- Initial temperature, $T_1 = 800\\text{ K}$\n- Final temperature, $T_2 = 500\\text{ K}$\n- Universal gas constant, $R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$\n\nSubstituting the values:\n$$W = 0.4 \\times \\left(\\frac{3}{2} \\times 8.314\\right) \\times (800 - 500)$$\n$$W = 0.6 \\times 8.314 \\times 300 = 180 \\times 8.314 = 1496.52\\text{ J} \\approx 1496.5\\text{ J}$$\nSince the gas expands, the work done by the gas is positive: $+1496.5\\text{ J}$."
  },
  {
    q_num: 157,
    question_text: "One mole of an ideal gas at temperature $T_1$ expands according to the law $\\frac{P}{V} = \\text{constant}$. Work done by the gas, when its final temperature becomes $T_2$ is",
    options: [
      "$R(T_2 - T_1)$",
      "$\\frac{R(T_2 - T_1)}{2}$",
      "$\\frac{R(T_2 - T_1)}{4}$",
      "$2R(T_2 - T_1)$"
    ],
    correct_index: 1,
    topic: "Polytropic Process",
    difficulty: "easy",
    image_url: "",
    solution: "The given process follows the law:\n$$\\frac{P}{V} = C \\implies P = C V \\implies P V^{-1} = C$$\nThis is a polytropic process $P V^x = C$ with polytropic index $x = -1$.\n\nThe work done by an ideal gas in a polytropic process is given by:\n$$W = \\frac{n R (T_2 - T_1)}{1 - x}$$\nFor $n = 1$ mole and $x = -1$:\n$$W = \\frac{1 \\cdot R (T_2 - T_1)}{1 - (-1)} = \\frac{R (T_2 - T_1)}{2}$$"
  },
  {
    q_num: 158,
    question_text: "The pressure $P$ of an ideal gas varies with volume $V$ as $P = KV^3$, where $K$ is a constant. The molar heat capacity for the process is $\\left(\\gamma = \\frac{C_p}{C_v}\\right)$",
    options: [
      "$\\frac{R}{4}\\left(\\frac{3+\\gamma}{\\gamma-1}\\right)$",
      "$\\frac{R}{4}\\left(\\frac{3-\\gamma}{\\gamma-1}\\right)$",
      "$\\frac{R}{4}\\left(\\frac{\\gamma-1}{\\gamma+3}\\right)$",
      "$\\frac{R}{4}\\left(\\frac{\\gamma+1}{\\gamma-3}\\right)$"
    ],
    correct_index: 0,
    topic: "Molar Heat Capacity & Polytropic Process",
    difficulty: "medium",
    image_url: "",
    solution: "The given equation is:\n$$P = K V^3 \\implies P V^{-3} = K$$\nComparing with the standard polytropic process equation $P V^x = \\text{constant}$, we have the polytropic index $x = -3$.\n\nThe molar heat capacity for any polytropic process $P V^x = \\text{constant}$ is:\n$$C = C_v + \\frac{R}{1 - x}$$\nWe know that $C_v = \\frac{R}{\\gamma - 1}$. Substituting $C_v$ and $x = -3$:\n$$C = \\frac{R}{\\gamma - 1} + \\frac{R}{1 - (-3)} = \\frac{R}{\\gamma - 1} + \\frac{R}{4}$$\nTaking the common denominator $4(\\gamma - 1)$:\n$$C = \\frac{4R + R(\\gamma - 1)}{4(\\gamma - 1)} = \\frac{R(4 + \\gamma - 1)}{4(\\gamma - 1)} = \\frac{R(3 + \\gamma)}{4(\\gamma - 1)} = \\frac{R}{4}\\left(\\frac{3 + \\gamma}{\\gamma - 1}\\right)$$"
  },
  {
    q_num: 159,
    question_text: "If the temperature of sink as well as source is increased by $20^\\circ\\text{C}$ each, then the efficiency of the heat engine will",
    options: ["Increase", "Decrease", "Remain same", "Become half"],
    correct_index: 1,
    topic: "Heat Engine & Carnot Efficiency",
    difficulty: "easy",
    image_url: "",
    solution: "The efficiency of a Carnot heat engine is given by:\n$$\\eta = 1 - \\frac{T_2}{T_1}$$\nwhere $T_1$ is the absolute temperature of the source and $T_2$ is the absolute temperature of the sink ($T_1 > T_2 > 0$).\n\nWhen both temperatures are increased by equal increments $\\Delta T = 20^\\circ\\text{C} = 20\\text{ K}$, the new efficiency is:\n$$\\eta' = 1 - \\frac{T_2 + \\Delta T}{T_1 + \\Delta T}$$\nSince $T_1 > T_2$, adding a positive constant $\\Delta T$ to both numerator and denominator increases the fraction:\n$$\\frac{T_2 + \\Delta T}{T_1 + \\Delta T} > \\frac{T_2}{T_1}$$\nSubtracting a larger fraction from 1 results in a smaller value:\n$$\\eta' = 1 - \\frac{T_2 + \\Delta T}{T_1 + \\Delta T} < 1 - \\frac{T_2}{T_1} = \\eta$$\nHence, the efficiency of the heat engine will decrease."
  },
  {
    q_num: 160,
    question_text: "P-V diagram of an ideal gas is shown in the figure. Net work done in the process ABCD is",
    options: ["$P_0 V_0$", "$-4P_0 V_0$", "$-3P_0 V_0$", "$3P_0 V_0$"],
    correct_index: 2,
    topic: "Work Done in Thermodynamic Process",
    difficulty: "easy",
    image_url: "/uploads/thermodynamics/thermo_q160.png",
    solution: "The net work done along path $A \\rightarrow B \\rightarrow C \\rightarrow D$ is the sum of the work done in each individual step:\n$$W_{\\text{net}} = W_{AB} + W_{BC} + W_{CD}$$\n\n1. In process $A \\rightarrow B$:\nConstant pressure process at $P = P_0$, expanding from $V_A = 2V_0$ to $V_B = 3V_0$:\n$$W_{AB} = P_0 (3V_0 - 2V_0) = P_0 V_0$$\n\n2. In process $B \\rightarrow C$:\nConstant volume process at $V = 3V_0$ ($dV = 0$):\n$$W_{BC} = 0$$\n\n3. In process $C \\rightarrow D$:\nConstant pressure process at $P = 2P_0$, compressing from $V_C = 3V_0$ to $V_D = V_0$:\n$$W_{CD} = 2P_0 (V_0 - 3V_0) = 2P_0 (-2V_0) = -4P_0 V_0$$\n\nTotal work done:\n$$W_{\\text{net}} = P_0 V_0 + 0 + (-4P_0 V_0) = -3P_0 V_0$$"
  },
  {
    q_num: 161,
    question_text: "Two moles of an ideal monatomic gas at temperature $T$ expands slowly according to the law $\\frac{P}{V} = \\text{constant}$. If the final temperature is $2T$ then heat supplied to the gas is",
    options: ["$4RT$", "$2RT$", "$3RT$", "$RT$"],
    correct_index: 0,
    topic: "First Law of Thermodynamics & Polytropic Process",
    difficulty: "medium",
    image_url: "",
    solution: "Given the polytropic process:\n$$\\frac{P}{V} = \\text{constant} \\implies P V^{-1} = \\text{constant}$$\nSo the polytropic index is $x = -1$.\n\nFor a monatomic gas:\n$$C_v = \\frac{3}{2}R$$\nThe molar heat capacity for a polytropic process $P V^x = C$ is:\n$$C = C_v + \\frac{R}{1 - x} = \\frac{3}{2}R + \\frac{R}{1 - (-1)} = \\frac{3}{2}R + \\frac{R}{2} = 2R$$\n\nThe heat supplied is given by:\n$$Q = n C \\Delta T$$\nHere:\n- Number of moles $n = 2$\n- Change in temperature $\\Delta T = 2T - T = T$\n\nSubstituting:\n$$Q = 2 \\times (2R) \\times T = 4RT$$"
  },
  {
    q_num: 162,
    question_text: "Two isotherms at temperatures $T_0$ and $2T_0$ are shown in the figure. A gas takes part in two processes $A \\rightarrow B$ and $A \\rightarrow C$. If $Q_1$ and $Q_2$ are heat supplied in two processes respectively, then ($AB$ is a vertical line)",
    options: ["$Q_1 > Q_2$", "$Q_1 < Q_2$", "$Q_1 = Q_2$", "$Q_1 = 2Q_2$"],
    correct_index: 1,
    topic: "Isothermal and Isochoric Processes",
    difficulty: "medium",
    image_url: "/uploads/thermodynamics/thermo_q162.png",
    solution: "Both processes $A \\rightarrow B$ and $A \\rightarrow C$ start at the initial state $A$ on isotherm $T_0$ and end on the isotherm $2T_0$ (at state $B$ and state $C$, respectively).\n\n1. Change in internal energy:\nSince internal energy depends solely on temperature:\n$$\\Delta U_{AB} = n C_v (2T_0 - T_0) = n C_v T_0$$\n$$\\Delta U_{AC} = n C_v (2T_0 - T_0) = n C_v T_0$$\nThus, $\\Delta U_{AB} = \\Delta U_{AC}$.\n\n2. Work done:\n- In process $A \\rightarrow B$, the line is vertical on the $P-V$ diagram, meaning volume is constant ($dV = 0$). Hence, $W_{AB} = 0$.\n- In process $A \\rightarrow C$, the gas expands from $V_A$ to $V_C$ ($V_C > V_A$), so the area under the curve is positive: $W_{AC} > 0$.\n\n3. Heat supplied (by the First Law of Thermodynamics $Q = \\Delta U + W$):\n$$Q_1 = \\Delta U_{AB} + W_{AB} = \\Delta U$$\n$$Q_2 = \\Delta U_{AC} + W_{AC} = \\Delta U + W_{AC}$$\nSince $W_{AC} > 0$, it follows that $Q_2 > Q_1$, or $Q_1 < Q_2$."
  },

  // Section B: Assertion - Reason Type Questions (AR 1 to AR 14)
  {
    q_num: 163,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** In an isothermal expansion of an ideal gas, there is no change in the internal energy of the gas.\n**Reason (R):** During isothermal expansion, the work done by the ideal gas is equal to the heat supplied to the ideal gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Isothermal Process & First Law",
    difficulty: "medium",
    image_url: "",
    solution: "1. For an ideal gas, the internal energy $U$ is exclusively a function of its absolute temperature: $U = n C_v T$. In an isothermal process, temperature remains constant ($\\Delta T = 0$), so the change in internal energy is strictly zero: $\\Delta U = n C_v \\Delta T = 0$. Thus, **Assertion is TRUE**.\n2. According to the First Law of Thermodynamics:\n$$\\Delta Q = \\Delta U + W$$\nSince $\\Delta U = 0$ in isothermal expansion:\n$$\\Delta Q = W$$\nThus, the work done by the gas equals the heat supplied. Hence, **Reason is TRUE**.\n3. However, the reason why internal energy does not change is that internal energy depends only on temperature for an ideal gas ($U = f(T)$), not because $W = \\Delta Q$. Rather, $W = \\Delta Q$ is a consequence of $\\Delta U = 0$. Therefore, Reason is not the correct explanation of Assertion.\n\nCorrect Option: **(2)**"
  },
  {
    q_num: 164,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** If final volume is equal to initial volume in a certain thermodynamic process, then the work done is zero.\n**Reason (R):** The ratio of final pressure to initial pressure is not equal to ratio of final temperature to initial temperature in an isochoric process.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Thermodynamic Processes & Isochoric Process",
    difficulty: "medium",
    image_url: "",
    solution: "1. If the final volume equals the initial volume ($V_f = V_i$), work done is not necessarily zero. For instance, in any closed cyclic process on a $P-V$ diagram, the system returns to its initial volume ($V_f = V_i$), yet the net work done equals the enclosed area of the loop on the $P-V$ indicator diagram, which is non-zero. Work is only guaranteed to be zero if the volume remains constant throughout the entire path (isochoric process, $dV = 0$ at all instants). Thus, **Assertion is FALSE**.\n2. In an isochoric process, volume is held constant ($V = \\text{constant}$). From the ideal gas equation $PV = nRT$:\n$$\\frac{P}{T} = \\text{constant} \\implies \\frac{P_f}{P_i} = \\frac{T_f}{T_i}$$\nTherefore, the ratio of final pressure to initial pressure is strictly equal to the ratio of final temperature to initial temperature. The Reason claims they are not equal, so **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 165,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Internal energy of a gas must increase when its temperature is raised.\n**Reason (R):** Whenever heat is supplied to the gas its internal energy always increases.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Internal Energy & First Law",
    difficulty: "easy",
    image_url: "",
    solution: "1. For an ideal gas, internal energy is given by $U = n C_v T$. Therefore, change in internal energy is $\\Delta U = n C_v \\Delta T$. When temperature is raised ($\\Delta T > 0$), $\\Delta U > 0$, so internal energy must increase. Thus, **Assertion is TRUE**.\n2. According to the First Law of Thermodynamics: $\\Delta Q = \\Delta U + W \\implies \\Delta U = \\Delta Q - W$. If heat is supplied ($\\Delta Q > 0$), but the gas expands and does work $W \\ge \\Delta Q$ (e.g., in an isothermal process where $W = \\Delta Q$ so $\\Delta U = 0$, or in an expansion with large positive work where $W > \\Delta Q$ so $\\Delta U < 0$), the internal energy does not increase. Hence, supplying heat does not always increase internal energy. Thus, **Reason is FALSE**.\n\nCorrect Option: **(3)**"
  },
  {
    q_num: 166,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Whole of the heat cannot be converted into work.\n**Reason (R):** Temperature of a body can be raised without supplying heat to it.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Second Law of Thermodynamics",
    difficulty: "medium",
    image_url: "",
    solution: "1. By the Kelvin-Planck statement of the Second Law of Thermodynamics, it is impossible for a system operating in a thermodynamic cycle to absorb heat from a single reservoir and convert all of it into equivalent mechanical work without rejecting some heat to a colder reservoir. Thus, the whole of heat cannot be converted into work in a continuous/cyclic process. Therefore, **Assertion is TRUE**.\n2. The temperature of a body can be raised without supplying heat ($Q = 0$) by doing work on it adiabatically (for example, by compressing a gas adiabatically or through viscous work / churning a fluid, where $\\Delta U = -W > 0 \\implies \\Delta T > 0$). Therefore, **Reason is TRUE**.\n3. However, Reason discusses adiabatic work causing temperature rise, which does not explain the Second Law of Thermodynamics or why heat cannot be completely converted into work in a cycle. Therefore, Reason is not the correct explanation of Assertion.\n\nCorrect Option: **(2)**"
  },
  {
    q_num: 167,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Carnot engine is most efficient among all heat engines working between same source and sink.\n**Reason (R):** Efficiency of heat engine is independent of nature of working substance.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Carnot Engine & Carnot's Theorem",
    difficulty: "medium",
    image_url: "",
    solution: "1. According to Carnot's theorem, no engine operating between two given temperatures can be more efficient than a reversible Carnot engine operating between the same two temperatures. Thus, **Assertion is TRUE**.\n2. The efficiency of a Carnot reversible cycle is given by $\\eta = 1 - \\frac{T_{\\text{sink}}}{T_{\\text{source}}}$, which depends strictly on the absolute temperatures of the reservoir and sink, and is completely independent of the nature of the working substance. This universality and reversibility guarantee that no engine can surpass it. Thus, **Reason is TRUE** and is the correct explanation of the assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 168,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Water in an earthen pot is colder than water in a similar glass pot.\n**Reason (R):** More evaporation in earthen pot causes cooling of water.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Evaporation & Cooling",
    difficulty: "easy",
    image_url: "",
    solution: "1. An earthen pot (matka) has minute pores in its clay walls that allow water to continuously seep to the outer surface, keeping it colder than water stored in a non-porous glass pot. Thus, **Assertion is TRUE**.\n2. The water seeping to the outer surface continuously evaporates into the air. Evaporation requires latent heat of vaporization, which is drawn directly from the water remaining inside the pot, causing its temperature to drop. Thus, continuous evaporation in the earthen pot causes significant cooling. Hence, **Reason is TRUE** and is the correct explanation of the assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 169,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** If an ideal gas expands in vacuum in an insulated chamber then $\\Delta Q$, $\\Delta U$ and $\\Delta W$ are all zero.\n**Reason (R):** Temperature of gas remains constant in free expansion.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Free Expansion of Ideal Gas",
    difficulty: "medium",
    image_url: "",
    solution: "1. In free expansion into a vacuum, there is no opposing external pressure ($P_{\\text{ext}} = 0$), so work done is zero: $\\Delta W = 0$. Since the chamber is thermally insulated from surroundings, no heat exchange occurs: $\\Delta Q = 0$. By the First Law of Thermodynamics, $\\Delta U = \\Delta Q - \\Delta W = 0 - 0 = 0$. Thus, $\\Delta Q$, $\\Delta U$, and $\\Delta W$ are all zero. **Assertion is TRUE**.\n2. For an ideal gas, internal energy depends only on temperature ($\\Delta U = n C_v \\Delta T$). Since $\\Delta U = 0$, it follows that $\\Delta T = 0$, meaning the temperature remains constant during free expansion of an ideal gas. Thus, **Reason is TRUE**.\n3. However, the constancy of temperature is a consequence of $\\Delta U = 0$, not the cause of $\\Delta Q$, $\\Delta U$, and $\\Delta W$ being zero (which arise directly from thermal insulation and $P_{\\text{ext}} = 0$). Therefore, Reason is not the correct explanation of Assertion.\n\nCorrect Option: **(2)**"
  },
  {
    q_num: 170,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** If $V$ versus $T$ graph in a process is rectangular hyperbola, then $P$ versus $T$ graph in the same process will be a parabola.\n**Reason (R):** When $V$ versus $T$ graph is a rectangular hyperbola then with increase in $T$ volume will increase and hence pressure will decrease.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Gas Laws & Graphical Analysis",
    difficulty: "medium",
    image_url: "",
    solution: "1. For a rectangular hyperbola on a $V-T$ graph:\n$$V \\cdot T = C \\quad (\\text{where } C \\text{ is a constant}) \\implies V = \\frac{C}{T}$$\nFrom the ideal gas equation $P V = nRT$:\n$$P \\left(\\frac{C}{T}\\right) = nRT \\implies P = \\left(\\frac{nR}{C}\\right) T^2$$\nSince $P \\propto T^2$, the $P-T$ graph is indeed a parabola passing through the origin. Thus, **Assertion is TRUE**.\n2. In the relation $V \\cdot T = C$, as temperature $T$ increases, volume $V$ must decrease ($V = C/T$), not increase! The Reason asserts that volume increases with increase in temperature, which is mathematically false. Thus, **Reason is FALSE**.\n\nCorrect Option: **(3)**"
  },
  {
    q_num: 171,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Specific heat of an ideal gas in an adiabatic process is infinite.\n**Reason (R):** In adiabatic process, huge amount of energy is required to do work.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Adiabatic Process & Specific Heat",
    difficulty: "easy",
    image_url: "",
    solution: "1. The molar heat capacity (specific heat) of a gas in any thermodynamic process is defined as:\n$$C = \\frac{\\Delta Q}{n \\Delta T}$$\nIn an adiabatic process, there is zero heat exchange between the system and surroundings: $\\Delta Q = 0$, while the temperature changes ($\\Delta T \\ne 0$). Therefore, the specific heat is:\n$$C = \\frac{0}{n \\Delta T} = 0$$\nIt is zero, not infinite! (Specific heat is infinite in an isothermal process where $\\Delta Q \\ne 0$ and $\\Delta T = 0$). Thus, **Assertion is FALSE**.\n2. In an adiabatic process, $\\Delta Q = 0$, and work done is executed entirely at the expense of internal energy ($W = -\\Delta U$). It does not require a \"huge amount of energy\" supplied to do work. Thus, **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 172,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Zeroth law of thermodynamics explains the concept of energy.\n**Reason (R):** Energy is independent of temperature.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Zeroth Law & First Law of Thermodynamics",
    difficulty: "easy",
    image_url: "",
    solution: "1. The Zeroth Law of Thermodynamics establishes the concept of temperature and thermal equilibrium (if two systems are each in thermal equilibrium with a third system, they are in thermal equilibrium with each other). The concept of internal energy and energy conservation is introduced and defined by the First Law of Thermodynamics. Thus, **Assertion is FALSE**.\n2. Thermal energy (internal energy) of a thermodynamic system directly depends on its absolute temperature ($U = n C_v T$ for an ideal gas). Energy is not independent of temperature. Thus, **Reason is FALSE**.\n\nSince both statements are false, Correct Option: **(4)**"
  },
  {
    q_num: 173,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** $C_p$ is greater than $C_v$ for an ideal gas.\n**Reason (R):** At constant pressure, some heat is spent in expansion of the gas.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Mayer's Relation & Specific Heats",
    difficulty: "easy",
    image_url: "",
    solution: "1. For an ideal gas, the molar heat capacity at constant pressure $C_p$ is greater than that at constant volume $C_v$, related by Mayer's relation $C_p - C_v = R > 0$. Thus, **Assertion is TRUE**.\n2. At constant volume ($V = \\text{constant}$), $W = 0$, so all supplied heat goes directly into increasing internal energy and elevating temperature: $Q_v = \\Delta U = n C_v \\Delta T$.\n3. At constant pressure ($P = \\text{constant}$), as the temperature increases by $\\Delta T$, the gas expands against external pressure, doing mechanical work: $W = P \\Delta V = n R \\Delta T$. Hence, the heat supplied must provide both internal energy rise and external work:\n$$Q_p = \\Delta U + W = n C_v \\Delta T + n R \\Delta T = n (C_v + R) \\Delta T = n C_p \\Delta T$$\nBecause additional heat is spent in expanding the gas against the surroundings, $C_p > C_v$. Thus, **Reason is TRUE** and is the correct explanation of the assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 174,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Second law of thermodynamics states that heat always flows from hot body to cold body by itself.\n**Reason (R):** First law of thermodynamics indicates the condition under which a body can use its heat (supplied) energy to produce work.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "First and Second Laws of Thermodynamics",
    difficulty: "medium",
    image_url: "",
    solution: "1. According to the Clausius statement of the Second Law of Thermodynamics, heat cannot spontaneously flow from a body at lower temperature to a body at higher temperature without external work. Hence, heat naturally flows from a hotter body to a colder body by itself. Thus, **Assertion is TRUE**.\n2. The First Law of Thermodynamics is simply the principle of conservation of energy ($\\Delta Q = \\Delta U + W$). It accounts for energy balance but does not indicate the feasibility, direction, or conditions under which heat energy can be converted into work. It is the Second Law of Thermodynamics that specifies the conditions, constraints, and directionality of heat conversion to work. Hence, **Reason is FALSE**.\n\nCorrect Option: **(3)**"
  },
  {
    q_num: 175,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Reversible adiabatic process is isentropic.\n**Reason (R):** Entropy change = $\\left(\\frac{\\Delta Q}{T}\\right)_{\\text{reversible}}$ and $\\Delta Q = 0$ in adiabatic process.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Entropy & Reversible Adiabatic Process",
    difficulty: "medium",
    image_url: "",
    solution: "1. A process in which the entropy remains constant throughout ($\\Delta S = 0$) is defined as an isentropic process. For any reversible adiabatic process, $\\Delta S = 0$, so it is an isentropic process. Thus, **Assertion is TRUE**.\n2. By Clausius' definition of entropy, the change in entropy for a reversible process is:\n$$\\Delta S = \\int \\left(\\frac{dQ}{T}\\right)_{\\text{rev}}$$\nIn an adiabatic process, there is zero heat transfer between the system and surroundings ($dQ = 0$). Therefore:\n$$\\Delta S = \\int \\frac{0}{T} = 0$$\nSince $\\Delta S = 0$, the entropy is constant ($S = \\text{constant}$). Thus, **Reason is TRUE** and is the exact correct explanation of the assertion.\n\nCorrect Option: **(1)**"
  },
  {
    q_num: 176,
    question_text: "Directions: In the following question, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** It is impossible to draw an adiabatic and an isothermal curve with same initial and final states.\n**Reason (R):** Magnitude of slope of an adiabatic curve is always greater than the magnitude of slope of an isothermal curve.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Slopes of Isothermal and Adiabatic Curves",
    difficulty: "medium",
    image_url: "",
    solution: "1. On a $P-V$ diagram, two curves with different functional forms can intersect at at most one point. The slope of an isothermal process is $\\left(\\frac{dP}{dV}\\right)_T = -\\frac{P}{V}$, while the slope of an adiabatic process is $\\left(\\frac{dP}{dV}\\right)_S = -\\gamma \\frac{P}{V}$ (with $\\gamma > 1$). Because an adiabatic curve is strictly $\\gamma$ times steeper than an isothermal curve at every point, an isothermal curve and an adiabatic curve can intersect at only a single point. They can never intersect at two different points (i.e. having both the same initial and same final states). Thus, **Assertion is TRUE**.\n2. The magnitude of the slope of an adiabatic curve is $|-\\gamma P/V| = \\gamma (P/V)$, whereas that of an isothermal curve is $|-P/V| = P/V$. Since $\\gamma > 1$, the slope magnitude of an adiabatic curve is always greater than that of an isothermal curve passing through any state. Thus, **Reason is TRUE** and explains why they cannot intersect twice to connect identical initial and final states.\n\nCorrect Option: **(1)**"
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

    for (const q of BATCH3_QUESTIONS) {
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`Skipping already existing question #${q.q_num}`);
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
      console.log(`[${inserted}/${BATCH3_QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed chapter '${chapterName}': Inserted ${inserted}, Skipped ${skipped}. Total in batch: ${BATCH3_QUESTIONS.length}`);
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
