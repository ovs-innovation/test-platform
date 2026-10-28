import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const KINETIC_PART1 = [
  {
    q_num: 1,
    question_text: "According to kinetic theory of gases, at 0 K",
    options: [
      "Internal energy of an ideal gas is zero",
      "Pressure of an ideal gas is zero",
      "Volume of an ideal gas is zero",
      "All of these"
    ],
    correct_index: 3,
    topic: "Postulates of Kinetic Theory",
    difficulty: "easy",
    image_url: "",
    solution: "According to the kinetic theory of gases:\n1. At absolute zero ($T = 0\\text{ K}$), all random molecular translational motion ceases, so internal kinetic energy of an ideal gas becomes zero ($U = n C_v T = 0$).\n2. Pressure exerted by gas molecules due to collisions with container walls drops to zero ($P = \\frac{1}{3}\\rho v_{\\text{rms}}^2 = 0$).\n3. Extrapolating the ideal gas law ($PV = nRT$) or Charles's law to $0\\text{ K}$, the theoretical volume of point-like ideal gas particles reduces to zero.\nTherefore, all of the given statements are correct."
  },
  {
    q_num: 2,
    question_text: "A vessel contains 2 moles of $\\text{N}_2$ gas at temperature $T$. An identical vessel contains 2 moles of Helium gas at temperature $3T$. The ratio of their pressure is (Take gases to be ideal)",
    options: ["1 : 3", "1 : 1", "1 : 27", "27 : 1"],
    correct_index: 0,
    topic: "Ideal Gas Equation",
    difficulty: "easy",
    image_url: "",
    solution: "Both vessels are identical, so they have the same volume ($V_1 = V_2 = V$).\nUsing the ideal gas equation $P = \\frac{nRT}{V}$:\n- For nitrogen gas: $n_1 = 2$, $T_1 = T \\implies P_1 = \\frac{2RT}{V}$\n- For helium gas: $n_2 = 2$, $T_2 = 3T \\implies P_2 = \\frac{2R(3T)}{V} = \\frac{6RT}{V}$\n\nTaking the ratio:\n$$\\frac{P_1}{P_2} = \\frac{2RT/V}{6RT/V} = \\frac{2}{6} = \\frac{1}{3} = 1 : 3$$"
  },
  {
    q_num: 3,
    question_text: "If the pressure remains constant then the temperature at which rms speed of gas molecules is half of its value at $27^\\circ\\text{C}$ is",
    options: ["$-152^\\circ\\text{C}$", "$-198^\\circ\\text{C}$", "$-200^\\circ\\text{C}$", "$-130^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "RMS Speed of Gas Molecules",
    difficulty: "medium",
    image_url: "",
    solution: "The root mean square speed of gas molecules is given by:\n$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\propto \\sqrt{T}$$\nGiven:\n- Initial temperature $T_1 = 27^\\circ\\text{C} = 27 + 273 = 300\\text{ K}$\n- Final speed $v_2 = \\frac{1}{2} v_1$\n\nTherefore:\n$$\\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}} \\implies \\frac{1}{2} = \\sqrt{\\frac{T_2}{300}}$$\nSquaring both sides:\n$$\\frac{1}{4} = \\frac{T_2}{300} \\implies T_2 = \\frac{300}{4} = 75\\text{ K}$$\nConverting to Celsius:\n$$t_2 = 75 - 273 = -198^\\circ\\text{C}$$"
  },
  {
    q_num: 4,
    question_text: "A rigid container containing an ideal gas with a small hole is gradually heated and the amount of the gas (in moles) is plotted with temperature (in kelvin). The correct graph is",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 0,
    topic: "Ideal Gas Laws & Graphs",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q4.png",
    solution: "Since the rigid container has a small hole and is open to the atmosphere:\n1. The pressure of the gas inside remains constant and equal to atmospheric pressure ($P = \\text{constant}$).\n2. The volume of the rigid container is constant ($V = \\text{constant}$).\n\nFrom the ideal gas equation:\n$$PV = nRT \\implies n = \\left(\\frac{PV}{R}\\right)\\frac{1}{T} \\implies n \\propto \\frac{1}{T}$$\nThis represents a rectangular hyperbola where $n \\cdot T = \\text{constant}$. As temperature $T$ increases, the number of moles $n$ remaining in the vessel decreases hyperbolically.\nHence, Graph (1) correctly shows this variation."
  },
  {
    q_num: 5,
    question_text: "A vessel of volume $V$ contains an ideal gas at absolute temperature $T$ and pressure $P$. The gas is allowed to leak till its pressure falls to $P'$. Assuming that the temperature remains constant during leakage, the number of moles of the gas that has leaked is",
    options: [
      "$\\frac{V}{RT}(P + P')$",
      "$\\frac{V}{2RT}(P + P')$",
      "$\\frac{V}{RT}(P - P')$",
      "$\\frac{V}{2RT}(P - P')$"
    ],
    correct_index: 2,
    topic: "Ideal Gas Equation",
    difficulty: "easy",
    image_url: "",
    solution: "Using the ideal gas equation $n = \\frac{PV}{RT}$:\n- Initial number of moles in the vessel: $n_1 = \\frac{PV}{RT}$\n- Final number of moles remaining in the vessel: $n_2 = \\frac{P'V}{RT}$\n\nThe number of moles of gas that has leaked out is:\n$$\\Delta n = n_1 - n_2 = \\frac{PV}{RT} - \\frac{P'V}{RT} = \\frac{V}{RT}(P - P')$$"
  },
  {
    q_num: 6,
    question_text: "Boyle's law and Charles' law are given respectively by (Symbols have usual meanings)",
    options: [
      "$P \\propto V$ and $\\frac{V}{T} = \\text{constant}$",
      "$PV = \\text{constant}$ and $\\frac{V}{T} = \\text{constant}$",
      "$V \\propto T$ and $P \\propto \\frac{1}{V}$",
      "$V \\propto \\frac{1}{P}$ and $VT = \\text{constant}$"
    ],
    correct_index: 1,
    topic: "Gas Laws",
    difficulty: "easy",
    image_url: "",
    solution: "1. **Boyle's Law:** At constant temperature, the product of pressure and volume of a fixed mass of gas is constant: $PV = \\text{constant}$ (or $P \\propto 1/V$).\n2. **Charles' Law:** At constant pressure, the volume of a fixed mass of gas is directly proportional to its absolute temperature: $\\frac{V}{T} = \\text{constant}$ (or $V \\propto T$).\nTherefore, option (2) correctly represents Boyle's and Charles' laws respectively."
  },
  {
    q_num: 7,
    question_text: "If the temperature of an ideal gas is changed from $20^\\circ\\text{C}$ to $40^\\circ\\text{C}$ while the volume is unchanged, then the pressure of the gas is",
    options: [
      "Doubled",
      "Increased to less than double",
      "Increased to more than double",
      "Decreased"
    ],
    correct_index: 1,
    topic: "Gay-Lussac's Law",
    difficulty: "easy",
    image_url: "",
    solution: "At constant volume, pressure is directly proportional to absolute temperature in Kelvin (Gay-Lussac's Law):\n$$P \\propto T$$\nGiven:\n- Initial absolute temperature: $T_1 = 20^\\circ\\text{C} = 20 + 273 = 293\\text{ K}$\n- Final absolute temperature: $T_2 = 40^\\circ\\text{C} = 40 + 273 = 313\\text{ K}$\n\nThe ratio of pressures is:\n$$\\frac{P_2}{P_1} = \\frac{T_2}{T_1} = \\frac{313}{293} \\approx 1.068$$\nFor the pressure to be doubled, the ratio would have to be 2. Here $P_2 = 1.068 P_1$, which means the pressure has increased, but to less than double."
  },
  {
    q_num: 8,
    question_text: "Volume-temperature graph at atmospheric pressure for a monatomic gas ($V$ in $\\text{m}^3$ and $T$ in $^\\circ\\text{C}$) is",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 0,
    topic: "Charles's Law & Graphs",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q8.png",
    solution: "According to Charles's law, volume of a gas at temperature $t$ in Celsius is given by:\n$$V = V_0 \\left(1 + \\frac{t}{273.15}\\right) = V_0 + \\left(\\frac{V_0}{273.15}\\right) t$$\nwhere $V_0$ is the volume at $0^\\circ\\text{C}$.\n- When plotted against temperature $T$ in $^\\circ\\text{C}$, the graph is a straight line $y = mx + c$ with a positive slope $m = \\frac{V_0}{273.15}$ and a positive non-zero intercept $c = V_0$ on the volume axis at $t = 0^\\circ\\text{C}$.\n- (If temperature were in Kelvin, the straight line would pass through the origin $(0,0)$).\nTherefore, Graph (1) correctly shows a positive volume intercept at $0^\\circ\\text{C}$ and linear increase with Celsius temperature."
  },
  {
    q_num: 9,
    question_text: "At constant pressure, the ratio of increase in volume of an ideal gas per degree rise in kelvin temperature to its original volume is ($T = \\text{Absolute temperature of gas}$)",
    options: ["$T^2$", "$\\frac{1}{T}$", "$\\frac{1}{T^2}$", "$T$"],
    correct_index: 1,
    topic: "Coefficient of Volume Expansion",
    difficulty: "medium",
    image_url: "",
    solution: "From the ideal gas equation at constant pressure:\n$$V = \\left(\\frac{nR}{P}\\right) T$$\nDifferentiating with respect to temperature $T$:\n$$\\frac{dV}{dT} = \\frac{nR}{P} = \\frac{V}{T}$$\nThe ratio of increase in volume per degree rise ($\\frac{dV}{dT}$) to original volume ($V$) is defined as the volume expansion coefficient $\\gamma_v$:\n$$\\gamma_v = \\frac{1}{V} \\frac{dV}{dT} = \\frac{1}{V}\\left(\\frac{V}{T}\\right) = \\frac{1}{T}$$"
  },
  {
    q_num: 10,
    question_text: "A vessel contains 1 mole of $\\text{O}_2$ gas at a temperature $T$. The pressure of the gas is $P$. An identical vessel containing 2 mole of $\\text{He}$ gas at a temperature $2T$ has a pressure of",
    options: ["$2P$", "$P$", "$4P$", "$8P$"],
    correct_index: 2,
    topic: "Ideal Gas Equation",
    difficulty: "easy",
    image_url: "",
    solution: "Since both vessels are identical, their volumes are the same ($V_1 = V_2 = V$).\n- For $\\text{O}_2$ gas: $n_1 = 1$, $T_1 = T \\implies P = \\frac{1 \\cdot RT}{V} = \\frac{RT}{V}$\n- For $\\text{He}$ gas: $n_2 = 2$, $T_2 = 2T \\implies P' = \\frac{2 \\cdot R (2T)}{V} = \\frac{4RT}{V} = 4\\left(\\frac{RT}{V}\\right) = 4P$"
  },
  {
    q_num: 11,
    question_text: "Two containers of equal volume contain the same gas at pressures $P_1, P_2$ and absolute temperatures $T_1, T_2$ respectively. On joining the vessels, the gases reach a common pressure $P$ and common temperature $T$. Find the ratio of $P$ and $T$.",
    options: [
      "$\\frac{P_1}{T_1} + \\frac{P_2}{T_2}$",
      "$\\frac{P_1 T_1 + P_2 T_2}{T_1 T_2}$",
      "$\\frac{P_1 T_2 + P_2 T_1}{(T_1 + T_2)}$",
      "$\\frac{P_1}{2T_1} + \\frac{P_2}{2T_2}$"
    ],
    correct_index: 3,
    topic: "Mixing of Gases & Conservation of Moles",
    difficulty: "medium",
    image_url: "",
    solution: "Let the volume of each container be $V$.\n- Initial moles in vessel 1: $n_1 = \\frac{P_1 V}{R T_1}$\n- Initial moles in vessel 2: $n_2 = \\frac{P_2 V}{R T_2}$\nTotal number of moles in the combined system:\n$$n_{\\text{total}} = n_1 + n_2 = \\frac{V}{R}\\left(\\frac{P_1}{T_1} + \\frac{P_2}{T_2}\\right)$$\nWhen connected, the total volume becomes $V_{\\text{total}} = V + V = 2V$.\nAt common pressure $P$ and common temperature $T$:\n$$n_{\\text{total}} = \\frac{P (2V)}{R T}$$\nEquating the total moles:\n$$\\frac{2PV}{RT} = \\frac{V}{R}\\left(\\frac{P_1}{T_1} + \\frac{P_2}{T_2}\\right) \\implies \\frac{P}{T} = \\frac{1}{2}\\left(\\frac{P_1}{T_1} + \\frac{P_2}{T_2}\\right) = \\frac{P_1}{2T_1} + \\frac{P_2}{2T_2}$$"
  },
  {
    q_num: 12,
    question_text: "Two bulbs $A$ and $B$ of same volume contain an ideal gas at temperature $T$ and pressure $p$. When the temperature of the bulb $B$ is doubled and that of $A$ remains unchanged, the pressure of the gas will be (Neglect the volume of the tube connecting the two bulbs)",
    options: ["$2p$", "$\\frac{4}{3}p$", "$1.5p$", "$1.2p$"],
    correct_index: 1,
    topic: "Connected Bulbs System",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q12.png",
    solution: "Initially, both bulbs of volume $V$ are at temperature $T$ and pressure $p$.\nTotal moles of gas:\n$$n = n_A + n_B = \\frac{pV}{RT} + \\frac{pV}{RT} = \\frac{2pV}{RT}$$\n\nFinally, the temperature of bulb $B$ becomes $2T$, while bulb $A$ remains at $T$. Since the bulbs are connected, they attain a common final pressure $p'$.\n- Moles in bulb $A$: $n_A' = \\frac{p' V}{RT}$\n- Moles in bulb $B$: $n_B' = \\frac{p' V}{R(2T)} = \\frac{p' V}{2RT}$\n\nBy conservation of total moles:\n$$n_A' + n_B' = n \\implies \\frac{p' V}{RT} + \\frac{p' V}{2RT} = \\frac{2pV}{RT}$$\nDividing by $\\frac{V}{RT}$:\n$$p'\\left(1 + \\frac{1}{2}\\right) = 2p \\implies \\frac{3}{2}p' = 2p \\implies p' = \\frac{4}{3}p$$"
  },
  {
    q_num: 13,
    question_text: "Two gases $A$ and $B$ having the same temperature $T$, same pressure $P$ and same volume $V$ are mixed. If the mixture is at the same temperature and occupies a volume $V$, the pressure of the mixture is",
    options: ["$2P$", "$P$", "$\\frac{P}{2}$", "$4P$"],
    correct_index: 0,
    topic: "Dalton's Law of Partial Pressures",
    difficulty: "easy",
    image_url: "",
    solution: "Using the ideal gas equation:\n- Moles of gas $A$: $n_A = \\frac{PV}{RT}$\n- Moles of gas $B$: $n_B = \\frac{PV}{RT}$\nTotal moles in the mixture: $n = n_A + n_B = \\frac{2PV}{RT}$.\n\nWhen the mixture occupies volume $V$ at temperature $T$, the pressure of the mixture is:\n$$P_{\\text{mix}} = \\frac{nRT}{V} = \\frac{\\left(\\frac{2PV}{RT}\\right)RT}{V} = 2P$$\n(Alternatively, according to Dalton's Law of Partial Pressures, each gas exerts its original partial pressure $P$ in volume $V$, so total pressure is $P + P = 2P$)."
  },
  {
    q_num: 14,
    question_text: "Two non reacting gases $A$ and $B$ having the same temperature $T$, same pressure $P$ and same volume $V$ are mixed. If the mixture is at the same temperature $T$ and occupies a volume $V$, the pressure of the mixture is,",
    options: ["$2P$", "$P$", "$P/2$", "$4P$"],
    correct_index: 0,
    topic: "Dalton's Law of Partial Pressures",
    difficulty: "easy",
    image_url: "",
    solution: "By Dalton's Law of Partial Pressures, the total pressure of a mixture of non-reacting ideal gases is the sum of the partial pressures that each gas would exert if it occupied the total volume alone at the mixture temperature:\n$$P_{\\text{mix}} = P_A + P_B = P + P = 2P$$"
  },
  {
    q_num: 15,
    question_text: "Gas at a pressure $P_0$ is contained in a vessel. If the masses of the molecules are halved and their speeds doubled, the resulting pressure $P$ will be equal to,",
    options: ["$4P_0$", "$2P_0$", "$P_0$", "$\\frac{P_0}{2}$"],
    correct_index: 1,
    topic: "Kinetic Pressure Formula",
    difficulty: "easy",
    image_url: "",
    solution: "From the kinetic theory of gases, pressure is given by:\n$$P = \\frac{1}{3} \\frac{N m}{V} v_{\\text{rms}}^2$$\nwhere $m$ is the mass of each molecule and $v_{\\text{rms}}$ is the root mean square speed.\nWhen the mass is halved ($m' = m/2$) and the speed is doubled ($v' = 2v$):\n$$P' = \\frac{1}{3} \\frac{N (m/2)}{V} (2v)^2 = \\frac{1}{3} \\frac{Nm}{V} v^2 \\times \\left(\\frac{1}{2} \\times 4\\right) = 2 P_0$$\nThus, the resulting pressure will be $2P_0$."
  },
  {
    q_num: 16,
    question_text: "Gas equation $PV = nRT$ is valid for",
    options: [
      "Real gases",
      "Ideal gases",
      "Real gases at low pressure and high temperature",
      "Both (2) & (3)"
    ],
    correct_index: 3,
    topic: "Ideal vs Real Gas Behavior",
    difficulty: "easy",
    image_url: "",
    solution: "1. The equation of state $PV = nRT$ is strictly valid for ideal gases (where intermolecular forces and the finite volume of particles are assumed zero).\n2. Real gases approach ideal gas behavior under conditions of low pressure (where molecular volume is negligible compared to container volume) and high temperature (where thermal kinetic energy dominates over intermolecular forces).\nTherefore, $PV = nRT$ is valid for both ideal gases and real gases at low pressure and high temperature."
  },
  {
    q_num: 17,
    question_text: "For the process $A \\rightarrow B$ of an ideal gas of fixed mass, the density of gas",
    options: [
      "Increases",
      "Decreases",
      "Remains constant",
      "First increases then decreases"
    ],
    correct_index: 2,
    topic: "Gas Density & Process Graphs",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q17.png",
    solution: "The ideal gas equation in terms of density $\\rho = \\frac{m}{V}$ is:\n$$PV = \\frac{m}{M}RT \\implies P = \\frac{\\rho R T}{M} \\implies \\frac{P}{T} = \\rho \\left(\\frac{R}{M}\\right)$$\nIn the given $P-T$ diagram, process $A \\rightarrow B$ is a straight line passing through the origin, which means:\n$$\\frac{P}{T} = \\text{constant}$$\nSince $R$ and $M$ are constants for a fixed gas, the density $\\rho$ must also remain constant throughout the process."
  },
  {
    q_num: 18,
    question_text: "At a given temperature, the pressure of an ideal gas of density $\\rho$ is proportional to",
    options: ["$\\frac{1}{\\rho^2}$", "$\\frac{1}{\\rho}$", "$\\rho^2$", "$\\rho$"],
    correct_index: 3,
    topic: "Pressure and Density Relation",
    difficulty: "easy",
    image_url: "",
    solution: "The pressure of an ideal gas is related to its density $\\rho$ and absolute temperature $T$ by:\n$$P = \\frac{\\rho R T}{M}$$\nAt a given constant temperature ($T = \\text{constant}$), $P$ is directly proportional to density: $P \\propto \\rho$."
  },
  {
    q_num: 19,
    question_text: "The pressure and density of an ideal diatomic gas change adiabatically from $(p_1, d_1)$ to $(p_2, d_2)$. If $\\frac{d_2}{d_1} = 32$, then $\\frac{p_2}{p_1}$ is",
    options: ["$\\frac{1}{128}$", "128", "32", "256"],
    correct_index: 1,
    topic: "Adiabatic Process & Density",
    difficulty: "medium",
    image_url: "",
    solution: "For a reversible adiabatic process of an ideal gas:\n$$P V^\\gamma = \\text{constant}$$\nSince density $d = \\frac{m}{V} \\implies V \\propto \\frac{1}{d}$:\n$$P \\left(\\frac{1}{d}\\right)^\\gamma = \\text{constant} \\implies \\frac{P}{d^\\gamma} = \\text{constant} \\implies P \\propto d^\\gamma$$\nFor an ideal diatomic gas, $\\gamma = \\frac{7}{5} = 1.4$.\nTherefore:\n$$\\frac{p_2}{p_1} = \\left(\\frac{d_2}{d_1}\\right)^\\gamma = (32)^{7/5} = (2^5)^{7/5} = 2^7 = 128$$"
  },
  {
    q_num: 20,
    question_text: "Figure shows graphs of pressure $P$ versus density $\\rho$ for an ideal gas at two temperatures $T_1$ and $T_2$. Then",
    options: ["$T_1 > T_2$", "$T_1 = T_2$", "$T_1 < T_2$", "$T_1 \\le T_2$"],
    correct_index: 0,
    topic: "Pressure vs Density Graph",
    difficulty: "easy",
    image_url: "/uploads/kinetic_theory/kinetic_q20.png",
    solution: "From the relation $P = \\left(\\frac{RT}{M}\\right)\\rho$, the slope of the $P$ versus $\\rho$ graph is:\n$$\\text{Slope} = \\frac{P}{\\rho} = \\frac{RT}{M} \\propto T$$\nFrom the given figure, the line corresponding to temperature $T_1$ has a greater slope than that for $T_2$:\n$$\\text{Slope}(T_1) > \\text{Slope}(T_2) \\implies T_1 > T_2$$"
  },
  {
    q_num: 21,
    question_text: "The relation among $P, V, T$ for an ideal gas is $PV = aT$, where $a$ is a constant. The value of $a$ depends on",
    options: [
      "$P, V$ and $T$",
      "Mass of a gas molecule",
      "Average K.E. of gas",
      "Number of molecules in volume $V$"
    ],
    correct_index: 3,
    topic: "Ideal Gas Equation & Constants",
    difficulty: "easy",
    image_url: "",
    solution: "The ideal gas equation in terms of the total number of molecules $N$ is:\n$$PV = N k_B T$$\nComparing this with $PV = aT$, we get:\n$$a = N k_B$$\nwhere $k_B$ is the Boltzmann constant (a universal physical constant) and $N$ is the number of molecules of gas present in volume $V$. Thus, the value of $a$ depends on the number of molecules in volume $V$."
  },
  {
    q_num: 22,
    question_text: "An ideal gas follows a law according to that its pressure varies with volume as $P = \\frac{\\alpha}{1 + (V/\\beta)^2}$, where $\\alpha$ and $\\beta$ are constants. The temperature of the gas at volume $V = \\beta$ is equal to (No. of moles = 1)",
    options: [
      "$\\frac{\\alpha^2 \\beta^2}{2R}$",
      "$\\frac{\\alpha \\beta^2}{2R}$",
      "$\\frac{\\alpha \\beta}{2R}$",
      "$\\frac{\\alpha^2 \\beta}{R^2}$"
    ],
    correct_index: 2,
    topic: "Non-standard Equation of State",
    difficulty: "medium",
    image_url: "",
    solution: "Given the variation of pressure with volume:\n$$P = \\frac{\\alpha}{1 + (V/\\beta)^2}$$\nAt volume $V = \\beta$:\n$$P = \\frac{\\alpha}{1 + (\\beta/\\beta)^2} = \\frac{\\alpha}{1 + 1} = \\frac{\\alpha}{2}$$\nUsing the ideal gas equation $PV = nRT$ with $n = 1$:\n$$T = \\frac{PV}{R} = \\frac{(\\alpha/2) \\cdot \\beta}{R} = \\frac{\\alpha \\beta}{2R}$$"
  },
  {
    q_num: 23,
    question_text: "The ratio of the mean energy possessed by hydrogen and helium gases at identical high temperatures is (neglect any chances of dissociation of hydrogen gas)",
    options: ["5 : 3", "7 : 5", "7 : 3", "5 : 7"],
    correct_index: 2,
    topic: "Degrees of Freedom at High Temperature",
    difficulty: "medium",
    image_url: "",
    solution: "By the law of equipartition of energy, the mean energy per molecule of a gas is given by $E = \\frac{f}{2}k_B T$, where $f$ is the degrees of freedom.\n1. For diatomic hydrogen gas ($\\text{H}_2$) at high temperatures, vibrational modes are active in addition to translational and rotational modes:\n$$f_{\\text{H}_2} = 3\\text{ (trans)} + 2\\text{ (rot)} + 2\\text{ (vib)} = 7 \\implies E_{\\text{H}_2} = \\frac{7}{2}k_B T$$\n2. For monatomic helium gas ($\\text{He}$), an atom has only translational degrees of freedom at any temperature:\n$$f_{\\text{He}} = 3\\text{ (trans)} \\implies E_{\\text{He}} = \\frac{3}{2}k_B T$$\nTaking the ratio:\n$$\\frac{E_{\\text{H}_2}}{E_{\\text{He}}} = \\frac{\\frac{7}{2}k_B T}{\\frac{3}{2}k_B T} = \\frac{7}{3} = 7 : 3$$"
  },
  {
    q_num: 24,
    question_text: "The ratio of average of translational kinetic energy to average rotational kinetic energy for a $\\text{O}_2$ molecule at 300 K is",
    options: ["1 : 1", "3 : 2", "3 : 5", "1 : 2"],
    correct_index: 1,
    topic: "Equipartition of Energy",
    difficulty: "easy",
    image_url: "",
    solution: "Oxygen ($\\text{O}_2$) is a diatomic molecule.\nBy the equipartition theorem, energy is equally distributed as $\\frac{1}{2}k_B T$ per degree of freedom:\n- Number of translational degrees of freedom: $f_{\\text{trans}} = 3 \\implies E_{\\text{trans}} = \\frac{3}{2}k_B T$\n- Number of rotational degrees of freedom: $f_{\\text{rot}} = 2 \\implies E_{\\text{rot}} = \\frac{2}{2}k_B T = k_B T$\n\nThe ratio is:\n$$\\frac{E_{\\text{trans}}}{E_{\\text{rot}}} = \\frac{\\frac{3}{2}k_B T}{k_B T} = \\frac{3}{2} = 3 : 2$$"
  },
  {
    q_num: 25,
    question_text: "At $27^\\circ\\text{C}$ temperature, the kinetic energy of an ideal gas is $E$. If the temperature is increased to $327^\\circ\\text{C}$, then kinetic energy would be",
    options: ["$2E$", "$\\frac{E}{2}$", "$\\sqrt{2}E$", "$\\frac{1}{\\sqrt{2}}E$"],
    correct_index: 0,
    topic: "Kinetic Energy and Temperature",
    difficulty: "easy",
    image_url: "",
    solution: "The total kinetic energy of an ideal gas is directly proportional to its absolute temperature in Kelvin:\n$$E \\propto T$$\nGiven:\n- Initial temperature: $T_1 = 27^\\circ\\text{C} = 27 + 273 = 300\\text{ K}$\n- Final temperature: $T_2 = 327^\\circ\\text{C} = 327 + 273 = 600\\text{ K}$\n\nTherefore:\n$$\\frac{E_2}{E_1} = \\frac{T_2}{T_1} = \\frac{600}{300} = 2 \\implies E_2 = 2E$$"
  },
  {
    q_num: 26,
    question_text: "If pressure of a gas is doubled, then the average kinetic energy per unit volume of the gas will be",
    options: [
      "Half of its initial value",
      "Double of its initial value",
      "One fourth of its initial value",
      "Four times of its initial value"
    ],
    correct_index: 1,
    topic: "Kinetic Energy per Unit Volume",
    difficulty: "easy",
    image_url: "",
    solution: "From kinetic theory, pressure $P$ and translational kinetic energy per unit volume $E_v$ are related by:\n$$P = \\frac{2}{3} E_v \\implies E_v = \\frac{3}{2} P$$\nSince $E_v \\propto P$, doubling the pressure of the gas causes the average kinetic energy per unit volume to double."
  },
  {
    q_num: 27,
    question_text: "If temperature of an ideal gas is increased at constant volume, then select correct statement.",
    options: [
      "The average kinetic energy of gas molecules will increase",
      "The average speed of gas molecules will increase",
      "The collision frequency will increase",
      "All of these"
    ],
    correct_index: 3,
    topic: "Kinetic Theory Consequences",
    difficulty: "easy",
    image_url: "",
    solution: "When the temperature of an ideal gas is increased at constant volume:\n1. Average translational kinetic energy per molecule is $\\frac{3}{2}k_B T \\propto T$, which increases.\n2. Average speed is $\\bar{v} = \\sqrt{\\frac{8RT}{\\pi M}} \\propto \\sqrt{T}$, which increases.\n3. Mean free path $\\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}$ remains constant because volume and number of molecules are fixed ($n = N/V = \\text{const}$). Hence, collision frequency $f_{\\text{coll}} = \\frac{\\bar{v}}{\\lambda} \\propto \\bar{v} \\propto \\sqrt{T}$, which increases.\nTherefore, all of the given statements are correct."
  },
  {
    q_num: 28,
    question_text: "The density of a gas is $9 \\times 10^{-2}\\text{ kg/m}^3$ and the root mean square velocity of the gas molecules is $500\\text{ m/s}$. The pressure exerted by the gas on the walls of the vessel is",
    options: [
      "$9112.5\\text{ N/m}^2$",
      "$18225\\text{ N/m}^2$",
      "$4556\\text{ N/m}^2$",
      "$7500\\text{ N/m}^2$"
    ],
    correct_index: 3,
    topic: "Gas Pressure Formula",
    difficulty: "easy",
    image_url: "",
    solution: "From the kinetic theory of gases, the pressure exerted by a gas is:\n$$P = \\frac{1}{3}\\rho v_{\\text{rms}}^2$$\nGiven:\n- Density $\\rho = 9 \\times 10^{-2}\\text{ kg/m}^3$\n- RMS velocity $v_{\\text{rms}} = 500\\text{ m/s}$\n\nSubstituting the values:\n$$P = \\frac{1}{3} \\times (9 \\times 10^{-2}) \\times (500)^2 = 3 \\times 10^{-2} \\times 250000 = 7500\\text{ N/m}^2$$"
  },
  {
    q_num: 29,
    question_text: "Which of the following graphs shows the variation of mean kinetic energy $E$ of an ideal gas molecules with temperature $t^\\circ\\text{C}$?",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 0,
    topic: "Mean Kinetic Energy vs Celsius Temperature",
    difficulty: "medium",
    image_url: "/uploads/kinetic_theory/kinetic_q29.png",
    solution: "The mean kinetic energy of an ideal gas molecule is directly proportional to absolute temperature $T$ in Kelvin:\n$$E = \\frac{3}{2} k_B T$$\nSince $T = t + 273.15$ (where $t$ is in $^\\circ\\text{C}$):\n$$E = \\frac{3}{2} k_B (t + 273.15) = \\left(\\frac{3}{2} k_B\\right) t + \\left(\\frac{3}{2} k_B \\times 273.15\\right)$$\nThis represents a linear equation $y = mx + c$ with a positive slope and a positive non-zero intercept on the $E$-axis at $t = 0^\\circ\\text{C}$.\nHence, Graph (1) correctly portrays this straight line."
  },
  {
    q_num: 30,
    question_text: "Ratio of mean translational kinetic energy of $\\text{He}$ and $\\text{O}_2$ gas molecules at a temperature will be",
    options: ["3 : 5", "1 : 2", "1 : 1", "4 : 5"],
    correct_index: 2,
    topic: "Translational Kinetic Energy",
    difficulty: "easy",
    image_url: "",
    solution: "The mean translational kinetic energy of any gas molecule, regardless of its mass, structure, or atomicity, depends exclusively on the absolute temperature:\n$$E_{\\text{trans}} = \\frac{3}{2} k_B T$$\nSince both helium and oxygen gases are at the same temperature, their mean translational kinetic energy per molecule is identical:\n$$\\frac{E_{\\text{trans}}(\\text{He})}{E_{\\text{trans}}(\\text{O}_2)} = \\frac{\\frac{3}{2}k_B T}{\\frac{3}{2}k_B T} = 1 : 1$$"
  },
  {
    q_num: 31,
    question_text: "Which of the following quantities is zero on an average for the molecules of an ideal gas in thermal equilibrium?",
    options: ["Kinetic energy", "Momentum", "Density", "Speed"],
    correct_index: 1,
    topic: "Equilibrium Averages",
    difficulty: "easy",
    image_url: "",
    solution: "In thermal equilibrium, the motion of gas molecules is completely chaotic and isotropic, meaning molecules are equally likely to move in any direction with a given velocity $\\vec{v}$ as in the opposite direction $-\\vec{v}$.\nBecause momentum is a vector quantity ($\\vec{p} = m \\vec{v}$), the vector sum and average linear momentum over all molecules vanishes:\n$$\\langle \\vec{p} \\rangle = m \\langle \\vec{v} \\rangle = 0$$\nIn contrast, kinetic energy ($\\frac{1}{2}mv^2$), speed ($|\\vec{v}|$), and density are positive scalar quantities whose averages are always non-zero."
  },
  {
    q_num: 32,
    question_text: "When $Q$ amount of heat is given to a gas at constant pressure, it performs $\\frac{Q}{3}$ amount of work. The average number of degrees of freedom per molecule of the gas is",
    options: ["1", "4", "5", "6"],
    correct_index: 1,
    topic: "First Law & Degrees of Freedom",
    difficulty: "medium",
    image_url: "",
    solution: "At constant pressure:\n- Heat supplied: $Q = n C_p \\Delta T$\n- Work done: $W = P \\Delta V = n R \\Delta T$\n\nGiven that $W = \\frac{Q}{3}$:\n$$\\frac{W}{Q} = \\frac{n R \\Delta T}{n C_p \\Delta T} = \\frac{R}{C_p} = \\frac{1}{3} \\implies C_p = 3R$$\nSince $C_p = C_v + R$:\n$$C_v = 3R - R = 2R$$\nAlso, $C_v = \\frac{f}{2}R$ where $f$ is the degrees of freedom:\n$$\\frac{f}{2}R = 2R \\implies f = 4$$\nTherefore, the average number of degrees of freedom per molecule is 4."
  },
  {
    q_num: 33,
    question_text: "A vessel contains a non linear triatomic gas. If 50% of gas dissociate into individual atom, then new value of degree of freedom by ignoring the vibrational mode and any further dissociation",
    options: ["2.15", "3.75", "5.25", "6.35"],
    correct_index: 1,
    topic: "Mixture of Dissociated Gases",
    difficulty: "hard",
    image_url: "",
    solution: "Let the initial amount of non-linear triatomic gas (e.g. $A_3$) be $n_0 = 1\\text{ mol}$.\n- A non-linear triatomic molecule has $f_1 = 6$ degrees of freedom (3 translational + 3 rotational).\nWhen 50% of the gas dissociates into individual atoms ($A_3 \\rightarrow 3A$):\n1. Undissociated triatomic gas remaining: $n_1 = 0.5\\text{ mol}$ with $f_1 = 6$.\n2. Monoatomic atoms produced: $n_2 = 0.5 \\times 3 = 1.5\\text{ mol}$ with $f_2 = 3$ (translational only).\n\nTotal number of moles in the vessel:\n$$n_{\\text{total}} = n_1 + n_2 = 0.5 + 1.5 = 2.0\\text{ mol}$$\n\nThe effective average degree of freedom of the mixture is:\n$$f_{\\text{avg}} = \\frac{n_1 f_1 + n_2 f_2}{n_1 + n_2} = \\frac{(0.5 \\times 6) + (1.5 \\times 3)}{0.5 + 1.5} = \\frac{3.0 + 4.5}{2.0} = \\frac{7.5}{2.0} = 3.75$$"
  },
  {
    q_num: 34,
    question_text: "A gas mixture contains 2 moles of oxygen and 4 moles of argon at temperature $T$. Neglecting all vibrational modes, the total energy of the mixture is",
    options: ["$4RT$", "$15RT$", "$9RT$", "$11RT$"],
    correct_index: 3,
    topic: "Internal Energy of Gas Mixture",
    difficulty: "easy",
    image_url: "",
    solution: "1. For oxygen ($\\text{O}_2$, diatomic gas), $f_1 = 5$:\n$$U_1 = n_1 \\left(\\frac{5}{2}RT\\right) = 2 \\times \\frac{5}{2}RT = 5RT$$\n2. For argon ($\\text{Ar}$, monoatomic gas), $f_2 = 3$:\n$$U_2 = n_2 \\left(\\frac{3}{2}RT\\right) = 4 \\times \\frac{3}{2}RT = 6RT$$\n\nThe total internal energy of the mixture is:\n$$U_{\\text{total}} = U_1 + U_2 = 5RT + 6RT = 11RT$$"
  },
  {
    q_num: 35,
    question_text: "Translational kinetic energy of oxygen molecules at room temperature is 60 J. Their rotational kinetic energy is",
    options: ["40 J", "60 J", "50 J", "20 J"],
    correct_index: 0,
    topic: "Rotational vs Translational KE",
    difficulty: "easy",
    image_url: "",
    solution: "For oxygen ($\\text{O}_2$, diatomic gas):\n- Translational degrees of freedom = 3, so translational KE is:\n$$E_{\\text{trans}} = 3 \\times \\left(\\frac{1}{2}N k_B T\\right) = 60\\text{ J} \\implies \\frac{1}{2}N k_B T = 20\\text{ J}$$\n- Rotational degrees of freedom = 2, so rotational KE is:\n$$E_{\\text{rot}} = 2 \\times \\left(\\frac{1}{2}N k_B T\\right) = 2 \\times 20\\text{ J} = 40\\text{ J}$$\nThus, the rotational kinetic energy is 40 J."
  }
];
