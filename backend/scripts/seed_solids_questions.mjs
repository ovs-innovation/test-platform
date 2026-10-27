import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsPath = path.resolve(__dirname, 'solids_diagrams.json');
let diagrams = {};
if (fs.existsSync(diagramsPath)) {
  diagrams = JSON.parse(fs.readFileSync(diagramsPath, 'utf8'));
}

const getImageUrl = (qNum) => diagrams[`q${qNum}`] || '';

export const QUESTIONS = [
  // ── Page 1: Q1 to Q20 ───────────────────────────────────────────────────────────
  {
    q_num: 1,
    question_text: "The stress-strain graph for a metallic wire is shown at four different temperatures $T_1, T_2, T_3\\text{ and } T_4$ then",
    options: [
      "$T_1 > T_2 > T_3 > T_4$",
      "$T_1 < T_2 < T_3 < T_4$",
      "$T_1 > T_4 > T_2 > T_3$",
      "$T_1 < T_4 < T_2 < T_3$"
    ],
    correct_index: 1,
    topic: "Stress-Strain Relationship and Temperature",
    difficulty: "easy",
    image_url: getImageUrl(1),
    solution: "The slope of the stress-strain graph gives Young's modulus ($Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\tan\\theta$). With increasing temperature, thermal vibrations weaken interatomic bonds, causing Young's modulus to decrease. From the graph, slope decreases as $T_1 > T_2 > T_3 > T_4$, which means $Y_1 > Y_2 > Y_3 > Y_4$. Therefore, temperature must increase in the reverse order: $T_1 < T_2 < T_3 < T_4$."
  },
  {
    q_num: 2,
    question_text: "The Bulk modulus for gases depends on the atomicity of gas in",
    options: [
      "Isothermal process",
      "Isochoric process",
      "Adiabatic process",
      "Both (1) and (3)"
    ],
    correct_index: 2,
    topic: "Bulk Modulus of Gases",
    difficulty: "easy",
    image_url: getImageUrl(2),
    solution: "For an ideal gas, the isothermal bulk modulus is $B_{\\text{iso}} = P$, which is independent of atomicity. In an adiabatic process, $B_{\\text{adi}} = \\gamma P$, where $\\gamma = C_p/C_v$ is the adiabatic index that directly depends on the atomicity of the gas (e.g. $5/3$ for monoatomic, $7/5$ for diatomic). Hence, Bulk modulus depends on atomicity in an adiabatic process."
  },
  {
    q_num: 3,
    question_text: "Two wires of equal cross-sectional area and length $L$ and $2L$ are suspended as shown in figure. Their Young's moduli are $Y_1$ and $Y_2$ respectively. The equivalent Young's moduli will be",
    options: [
      "$\\frac{3Y_1 Y_2}{2Y_1 + Y_2}$",
      "$\\frac{3Y_1 Y_2}{Y_1 + 2Y_2}$",
      "$\\frac{Y_1 + Y_2}{2}$",
      "$\\frac{3Y_1 Y_2}{Y_1 + Y_2}$"
    ],
    correct_index: 0,
    topic: "Combination of Wires in Series",
    difficulty: "medium",
    image_url: getImageUrl(3),
    solution: "Since the wires are connected in series under tension $F$, total elongation is:\n$$\\Delta l = \\Delta l_1 + \\Delta l_2 = \\frac{F L}{A Y_1} + \\frac{F (2L)}{A Y_2}$$\nFor the equivalent wire of total length $L_{\\text{eq}} = L + 2L = 3L$ and same area $A$:\n$$\\Delta l = \\frac{F (3L)}{A Y_{\\text{eq}}}$$\nEquating:\n$$\\frac{3L}{Y_{\\text{eq}}} = \\frac{L}{Y_1} + \\frac{2L}{Y_2} = L\\left(\\frac{Y_2 + 2Y_1}{Y_1 Y_2}\\right) \\implies Y_{\\text{eq}} = \\frac{3Y_1 Y_2}{2Y_1 + Y_2}$$"
  },
  {
    q_num: 4,
    question_text: "A 5 m Al wire ($Y = 7 \\times 10^{10}\\text{ N/m}^2$) of diameter 3 mm supports a 40 kg mass. In order to have the same elongation in a Cu wire ($Y = 12 \\times 10^{10}\\text{ N/m}^2$) of the same length under the same weight, the diameter should be (in mm)",
    options: [
      "1.75",
      "2.0",
      "2.3",
      "5.0"
    ],
    correct_index: 2,
    topic: "Elongation under Tension",
    difficulty: "medium",
    image_url: getImageUrl(4),
    solution: "Elongation is given by $\\Delta l = \\frac{4 F L}{\\pi d^2 Y}$. For identical $F, L$, and $\\Delta l$, we must have $d^2 Y = \\text{constant}$:\n$$d_{\\text{Cu}}^2 Y_{\\text{Cu}} = d_{\\text{Al}}^2 Y_{\\text{Al}} \\implies d_{\\text{Cu}} = d_{\\text{Al}} \\sqrt{\\frac{Y_{\\text{Al}}}{Y_{\\text{Cu}}}}$$\n$$d_{\\text{Cu}} = 3 \\times \\sqrt{\\frac{7 \\times 10^{10}}{12 \\times 10^{10}}} = 3 \\times \\sqrt{\\frac{7}{12}} \\approx 3 \\times 0.7638 \\approx 2.3\\text{ mm}$$"
  },
  {
    q_num: 5,
    question_text: "If work done in stretching a wire by 1 mm is 2 J, the work necessary for stretching another wire of same material but with double radius of cross-section and half the length by 1 mm is",
    options: [
      "16 J",
      "8 J",
      "4 J",
      "$\\frac{1}{4}\\text{ J}$"
    ],
    correct_index: 0,
    topic: "Work Done in Stretching a Wire",
    difficulty: "easy",
    image_url: getImageUrl(5),
    solution: "Work done in stretching a wire is $W = \\frac{1}{2}\\frac{Y A}{L}(\\Delta l)^2 = \\frac{1}{2}\\frac{Y \\pi r^2}{L}(\\Delta l)^2 \\propto \\frac{r^2}{L}$ (for same $Y$ and $\\Delta l$).\nFor the second wire: $r' = 2r$ and $L' = L/2$:\n$$\\frac{(r')^2}{L'} = \\frac{(2r)^2}{L/2} = 8 \\left(\\frac{r^2}{L}\\right)$$\n$$W' = 8 W = 8 \\times 2\\text{ J} = 16\\text{ J}$$"
  },
  {
    q_num: 6,
    question_text: "If a wire having initial diameter of 2 mm produced the longitudinal strain of $0.1\\%$ on stretching, then the final diameter of wire is (Poisson's ratio $\\sigma = 0.5$)",
    options: [
      "2.002 mm",
      "1.999 mm",
      "1.998 mm",
      "2.001 mm"
    ],
    correct_index: 1,
    topic: "Poisson's Ratio and Lateral Strain",
    difficulty: "easy",
    image_url: getImageUrl(6),
    solution: "Poisson's ratio is defined as $\\sigma = -\\frac{\\Delta d / d}{\\Delta l / l}$.\n$$\\frac{\\Delta d}{d} = -\\sigma\\left(\\frac{\\Delta l}{l}\\right) = -0.5 \\times 0.1\\% = -0.05\\% = -0.0005$$\n$$\\Delta d = -0.0005 \\times 2\\text{ mm} = -0.001\\text{ mm}$$\nFinal diameter $d' = d + \\Delta d = 2 - 0.001 = 1.999\\text{ mm}$."
  },
  {
    q_num: 7,
    question_text: "Two rods of different materials having Young's modulus $Y_1$ and $Y_2$ and coefficient of thermal expansion $\\alpha_1$ and $\\alpha_2$ are fixed between two rigid supports. The rods are heated to the same temperature. If there is no bending of the rods, the thermal stress developed in these rods are equal provided",
    options: [
      "$\\frac{Y_1}{Y_2} = \\sqrt{\\frac{\\alpha_2}{\\alpha_1}}$",
      "$\\frac{Y_1}{Y_2} = \\frac{\\alpha_1}{\\alpha_2}$",
      "$\\frac{Y_1}{Y_2} = \\sqrt{\\frac{\\alpha_1}{\\alpha_2}}$",
      "$\\frac{Y_1}{Y_2} = \\frac{\\alpha_2}{\\alpha_1}$"
    ],
    correct_index: 3,
    topic: "Thermal Stress in Fixed Rods",
    difficulty: "easy",
    image_url: getImageUrl(7),
    solution: "Thermal stress developed in a rigidly clamped rod when heated by $\\Delta T$ is $\\text{Stress} = Y \\alpha \\Delta T$.\nSince both thermal stresses are equal for the same $\\Delta T$:\n$$Y_1 \\alpha_1 \\Delta T = Y_2 \\alpha_2 \\Delta T \\implies Y_1 \\alpha_1 = Y_2 \\alpha_2 \\implies \\frac{Y_1}{Y_2} = \\frac{\\alpha_2}{\\alpha_1}$$"
  },
  {
    q_num: 8,
    question_text: "A wire suspended vertically from one of its ends is stretched by attaching a weight of 200 N to the lower end. The weight stretches the wire by 1 mm. Then the elastic energy stored in the wire is",
    options: [
      "0.2 J",
      "10 J",
      "20 J",
      "0.1 J"
    ],
    correct_index: 3,
    topic: "Elastic Energy Stored in a Wire",
    difficulty: "easy",
    image_url: getImageUrl(8),
    solution: "Elastic potential energy stored in a stretched wire is:\n$$U = \\frac{1}{2} F \\Delta l = \\frac{1}{2} \\times 200\\text{ N} \\times 10^{-3}\\text{ m} = 0.1\\text{ J}$$"
  },
  {
    q_num: 9,
    question_text: "Two rods of different materials having coefficients of thermal expansion $\\alpha_1$ and $\\alpha_2$ and Young's moduli $Y_1$ and $Y_2$ respectively are fixed between two rigid massive walls. The rods are heated such that they undergo the same increase in temperature. There is no bending of the rods and junction does not shift, if $\\alpha_1$ and $\\alpha_2$ are in the ratio $2 : 3$, the thermal stress developed in the two rods are equal provided $Y_1 : Y_2$ is equal to",
    options: [
      "2 : 3",
      "1 : 1",
      "3 : 2",
      "4 : 9"
    ],
    correct_index: 2,
    topic: "Thermal Stress Ratio",
    difficulty: "easy",
    image_url: getImageUrl(9),
    solution: "For equal thermal stresses:\n$$Y_1 \\alpha_1 = Y_2 \\alpha_2 \\implies \\frac{Y_1}{Y_2} = \\frac{\\alpha_2}{\\alpha_1}$$\nGiven $\\frac{\\alpha_1}{\\alpha_2} = \\frac{2}{3} \\implies \\frac{\\alpha_2}{\\alpha_1} = \\frac{3}{2}$.\nTherefore, $\\frac{Y_1}{Y_2} = 3 : 2$."
  },
  {
    q_num: 10,
    question_text: "Two wires A and B have the same length and area of cross-section. Young's modulus of A is two times the Young's modulus of B. Then the ratio of force constant of A to that of B is",
    options: [
      "1",
      "2",
      "1/2",
      "$\\sqrt{2}$"
    ],
    correct_index: 1,
    topic: "Force Constant of a Wire",
    difficulty: "easy",
    image_url: getImageUrl(10),
    solution: "The force constant (effective spring constant) of a wire of length $L$ and area $A$ is $k = \\frac{Y A}{L}$.\nFor identical length and cross-sectional area, $k \\propto Y$.\n$$\\frac{k_A}{k_B} = \\frac{Y_A}{Y_B} = 2$$"
  },
  {
    q_num: 11,
    question_text: "A given quantity of an ideal gas is at pressure $P$ and absolute temperature $T$. The isothermal bulk modulus of gas is",
    options: [
      "$\\frac{2P}{3}$",
      "$P$",
      "$\\frac{3P}{2}$",
      "$2P$"
    ],
    correct_index: 1,
    topic: "Isothermal Bulk Modulus",
    difficulty: "easy",
    image_url: getImageUrl(11),
    solution: "For an isothermal process, $P V = \\text{constant}$. Differentiating gives:\n$$P dV + V dP = 0 \\implies -V \\frac{dP}{dV} = P$$\nBy definition, Bulk modulus is $B_{\\text{iso}} = -V \\frac{dP}{dV} = P$."
  },
  {
    q_num: 12,
    question_text: "A wire is suspended by one end. At the other end a weight of 20 N is hung. If the increase in length of wire is 1 mm, the increase in the elastic potential energy of the wire will be",
    options: [
      "0.01 J",
      "0.02 J",
      "0.04 J",
      "1.00 J"
    ],
    correct_index: 0,
    topic: "Elastic Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(12),
    solution: "Elastic potential energy is:\n$$U = \\frac{1}{2} F \\Delta l = \\frac{1}{2} \\times 20\\text{ N} \\times (10^{-3}\\text{ m}) = 0.01\\text{ J}$$"
  },
  {
    q_num: 13,
    question_text: "A steel ring of radius $r$ and cross-sectional area $A$ is fitted on to a wooden disc of radius $R$ ($R > r$). If Young's modulus of steel is $Y$, then stress in the steel ring is",
    options: [
      "$\\frac{R Y}{r}$",
      "$\\left(\\frac{R-r}{r}\\right)Y$",
      "$\\left(\\frac{r}{R-r}\\right)Y$",
      "$\\left(\\frac{r}{R}\\right)Y$"
    ],
    correct_index: 1,
    topic: "Thermal/Mechanical Stress in Ring",
    difficulty: "medium",
    image_url: getImageUrl(13),
    solution: "Initial circumference $= 2\\pi r$, final circumference $= 2\\pi R$.\n$$\\text{Longitudinal strain} = \\frac{\\Delta L}{L} = \\frac{2\\pi(R - r)}{2\\pi r} = \\frac{R - r}{r}$$\n$$\\text{Stress} = Y \\times \\text{Strain} = \\left(\\frac{R - r}{r}\\right)Y$$"
  },
  {
    q_num: 14,
    question_text: "A force $F$ is applied along a rod of transverse sectional area $A$. The tangential stress to a section $PQ$ inclined at an angle $\\theta$ to transverse section will be maximum for angle $\\theta$ (in degree) is",
    options: [
      "Zero",
      "30",
      "45",
      "90"
    ],
    correct_index: 2,
    topic: "Tangential Stress on Oblique Plane",
    difficulty: "medium",
    image_url: getImageUrl(14),
    solution: "The area of the inclined section is $A' = \\frac{A}{\\cos\\theta}$ and the tangential component of force along this plane is $F_t = F \\sin\\theta$.\n$$\\text{Tangential stress } \\tau = \\frac{F_t}{A'} = \\frac{F \\sin\\theta}{A / \\cos\\theta} = \\frac{F}{A}\\sin\\theta\\cos\\theta = \\frac{F}{2A}\\sin(2\\theta)$$\nThis reaches maximum when $\\sin(2\\theta) = 1 \\implies 2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$."
  },
  {
    q_num: 15,
    question_text: "A sphere is taken to the bottom of sea 3 km deep, then the fractional change in radius of sphere is (Bulk modulus of the sphere is $9.8 \\times 10^8\\text{ N/m}^2$, density of water $= 1000\\text{ kg/m}^3, g = 9.8\\text{ m/s}^2$)",
    options: [
      "0.1",
      "-0.01",
      "-0.03",
      "3"
    ],
    correct_index: 1,
    topic: "Bulk Modulus and Fractional Change in Radius",
    difficulty: "medium",
    image_url: getImageUrl(15),
    solution: "Pressure increase at depth $h = 3000\\text{ m}$ is:\n$$\\Delta P = \\rho g h = 1000 \\times 9.8 \\times 3000 = 2.94 \\times 10^7\\text{ N/m}^2$$\n$$\\text{Volumetric strain } \\frac{\\Delta V}{V} = -\\frac{\\Delta P}{B} = -\\frac{2.94 \\times 10^7}{9.8 \\times 10^8} = -0.03$$\nSince $V \\propto R^3$, $\\frac{\\Delta V}{V} = 3\\frac{\\Delta R}{R}$:\n$$\\frac{\\Delta R}{R} = \\frac{1}{3}\\left(\\frac{\\Delta V}{V}\\right) = \\frac{-0.03}{3} = -0.01$$"
  },
  {
    q_num: 16,
    question_text: "The Bulk modulus for an incompressible liquid is",
    options: [
      "Zero",
      "Unity",
      "Infinite",
      "Between 0 and 1"
    ],
    correct_index: 2,
    topic: "Bulk Modulus of Incompressible Fluids",
    difficulty: "easy",
    image_url: getImageUrl(16),
    solution: "An incompressible liquid undergoes zero change in volume regardless of applied pressure ($\\Delta V = 0$).\n$$B = -V \\frac{\\Delta P}{\\Delta V} = \\frac{\\text{finite}}{0} = \\infty$$"
  },
  {
    q_num: 17,
    question_text: "A cable that can support a load of 800 N is cut into two equal parts. The maximum load that can be supported by either part is",
    options: [
      "100 N",
      "400 N",
      "800 N",
      "1600 N"
    ],
    correct_index: 2,
    topic: "Breaking Force of Wire",
    difficulty: "easy",
    image_url: getImageUrl(17),
    solution: "The maximum load (breaking load) is $F_{\\text{max}} = \\text{Breaking stress} \\times A$. Cutting the cable in half reduces its length but leaves its cross-sectional area and material properties completely unchanged. Therefore, each part can still support the same maximum load of 800 N."
  },
  {
    q_num: 18,
    question_text: "If in a wire of Young's modulus $Y$, longitudinal strain $x$ is produced then the potential energy stored in its unit volume will be",
    options: [
      "$0.5 Y x^2$",
      "$0.5 Y^2 x$",
      "$2 Y x^2$",
      "$Y x^2$"
    ],
    correct_index: 0,
    topic: "Energy Density in Strained Wire",
    difficulty: "easy",
    image_url: getImageUrl(18),
    solution: "Potential energy stored per unit volume (energy density) is:\n$$u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} (Y x) x = 0.5 Y x^2$$"
  },
  {
    q_num: 19,
    question_text: "Which of the following statement is wrong regarding Poisson's ratio?",
    options: [
      "It is the ratio of lateral strain to longitudinal strain",
      "Its value is independent of nature of the material",
      "It is unitless and dimensionless quantity",
      "The practical value of Poisson's ratio lies between 0 and 1"
    ],
    correct_index: 1,
    topic: "Poisson's Ratio Characteristics",
    difficulty: "easy",
    image_url: getImageUrl(19),
    solution: "Poisson's ratio is an intrinsic characteristic property of a material (e.g. $\\approx 0.5$ for rubber, $0.28$ for steel, $\\approx 0$ for cork). It depends strongly on the nature of the material. Therefore, statement (2) is false."
  },
  {
    q_num: 20,
    question_text: "When a rod is heated but prevented from expanding, the stress developed is independent of",
    options: [
      "Material of the rod",
      "Rise in temperature",
      "Length of the rod",
      "None of these"
    ],
    correct_index: 2,
    topic: "Thermal Stress Independence",
    difficulty: "easy",
    image_url: getImageUrl(20),
    solution: "Thermal stress developed in a rigidly held rod is given by $\\text{Stress} = Y \\alpha \\Delta T$. It depends on Young's modulus $Y$, linear coefficient $\\alpha$, and temperature change $\\Delta T$. It is completely independent of the rod's length $L$ and area $A$."
  },

  // ── Page 2: Q21 to Q40 ───────────────────────────────────────────────────────────
  {
    q_num: 21,
    question_text: "A wire of Young's modulus $2 \\times 10^{11}\\text{ N/m}^2$ has length 1 m and area $1\\text{ mm}^2$, the work required to increase its length slowly by 2 mm is",
    options: [
      "0.4 J",
      "40 J",
      "4 J",
      "400 J"
    ],
    correct_index: 0,
    topic: "Work Required to Stretch Wire",
    difficulty: "easy",
    image_url: getImageUrl(21),
    solution: "$$W = \\frac{1}{2}\\frac{Y A}{L}(\\Delta l)^2 = \\frac{1}{2} \\frac{(2 \\times 10^{11}) \\times (10^{-6})}{1} (2 \\times 10^{-3})^2 = 10^5 \\times 4 \\times 10^{-6} = 0.4\\text{ J}$$"
  },
  {
    q_num: 22,
    question_text: "A uniform metal rod of $2\\text{ mm}^2$ cross-section is heated from $0^\\circ\\text{C}$ to $20^\\circ\\text{C}$. The coefficient of linear expansion of rod is $12 \\times 10^{-6}/^\\circ\\text{C}$. Its Young's modulus of elasticity is $10^{11}\\text{ N/m}^2$. The energy stored per unit volume of rod if the rod is free to expand is",
    options: [
      "Zero",
      "$1500\\text{ J/m}^3$",
      "$5760\\text{ J/m}^3$",
      "$1440\\text{ J/m}^3$"
    ],
    correct_index: 0,
    topic: "Elastic Energy of Free Thermal Expansion",
    difficulty: "easy",
    image_url: getImageUrl(22),
    solution: "When a rod is completely free to expand, no internal restoring force or stress develops within the material ($\\text{Stress} = 0$). Since strain energy density is $u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain}$, the stored elastic energy is strictly Zero."
  },
  {
    q_num: 23,
    question_text: "Strain produced in a string due to stress $s$ is $x$. Energy density in the string is",
    options: [
      "$\\frac{sx}{2}$",
      "$\\frac{s}{2x}$",
      "$\\frac{s^2}{2x}$",
      "$\\frac{sx^2}{2}$"
    ],
    correct_index: 0,
    topic: "Energy Density Formula",
    difficulty: "easy",
    image_url: getImageUrl(23),
    solution: "$$\\text{Energy density} = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} s x = \\frac{sx}{2}$$"
  },
  {
    q_num: 24,
    question_text: "When a 20 kg load is applied to a uniform string, then in equilibrium elongation of the string is 5 mm from its natural length. When it is loaded with 40 kg then its equilibrium elongation from its natural length will be",
    options: [
      "5 mm",
      "10 mm",
      "15 mm",
      "20 mm"
    ],
    correct_index: 1,
    topic: "Hooke's Law Proportionality",
    difficulty: "easy",
    image_url: getImageUrl(24),
    solution: "By Hooke's law, elongation is directly proportional to applied load: $\\Delta l \\propto m$.\n$$\\frac{\\Delta l_2}{\\Delta l_1} = \\frac{m_2}{m_1} = \\frac{40}{20} = 2 \\implies \\Delta l_2 = 2 \\times 5\\text{ mm} = 10\\text{ mm}$$"
  },
  {
    q_num: 25,
    question_text: "Breaking stress of a wire of radius $r$ is $S_0$. If radius becomes double then breaking stress of same wire becomes",
    options: [
      "$S_0$",
      "$2S_0$",
      "$4S_0$",
      "$\\frac{S_0}{2}$"
    ],
    correct_index: 0,
    topic: "Breaking Stress Independence",
    difficulty: "easy",
    image_url: getImageUrl(25),
    solution: "Breaking stress is an intrinsic characteristic of the material and is independent of dimensions such as length or radius of cross-section. Hence, breaking stress remains $S_0$."
  },
  {
    q_num: 26,
    question_text: "A uniform wire of mass $M$, length $L$, area of cross-section $A$ and Young's modulus $Y$ is suspended from the ceiling. Elongation of the wire due to its own weight is",
    options: [
      "$\\frac{MgL}{2AY}$",
      "$\\frac{MgL^2}{2AY}$",
      "$\\frac{MgL}{2Y}$",
      "$\\frac{MgL^3}{2AY}$"
    ],
    correct_index: 0,
    topic: "Elongation Due to Self-Weight",
    difficulty: "easy",
    image_url: getImageUrl(26),
    solution: "The tension at distance $x$ from the free end is $T(x) = \\frac{M}{L} g x$.\n$$\\Delta L = \\int_0^L \\frac{T(x)}{AY} dx = \\frac{Mg}{LAY} \\int_0^L x dx = \\frac{Mg L^2}{2LAY} = \\frac{MgL}{2AY}$$"
  },
  {
    q_num: 27,
    question_text: "Which among the following cannot be the likely value of Poisson's ratio?",
    options: [
      "0.1",
      "0.3",
      "0.49",
      "0.56"
    ],
    correct_index: 3,
    topic: "Permissible Range of Poisson's Ratio",
    difficulty: "easy",
    image_url: getImageUrl(27),
    solution: "The theoretical limits of Poisson's ratio are $-1 \\le \\sigma \\le 0.5$, and for ordinary practical materials $0 \\le \\sigma \\le 0.5$. A value of 0.56 exceeds the maximum allowable limit of 0.5 and is physically impossible."
  },
  {
    q_num: 28,
    question_text: "Two metallic cylinders A and B of radii $(2r)$ and $(3r)$ are joined as shown in figure. If top end is fixed and lower end is twisted by an angle $\\theta$, then angle of twist for cylinder A is",
    options: [
      "$\\frac{15}{16}\\theta$",
      "$\\frac{16}{17}\\theta$",
      "$\\frac{81}{97}\\theta$",
      "$\\frac{16}{27}\\theta$"
    ],
    correct_index: 2,
    topic: "Torsion in Composite Cylinders",
    difficulty: "hard",
    image_url: getImageUrl(28),
    solution: "For a cylinder of radius $R$ and length $l$, torsional rigidity is $C = \\frac{\\pi \\eta R^4}{2l} \\propto R^4$.\nSince cylinders A and B are in series, the same torque $\\tau$ is transmitted:\n$$\\tau = C_A \\theta_A = C_B \\theta_B \\implies \\frac{\\theta_B}{\\theta_A} = \\frac{C_A}{C_B} = \\frac{(2r)^4}{(3r)^4} = \\frac{16}{81}$$\nTotal twist $\\theta = \\theta_A + \\theta_B = \\theta_A + \\frac{16}{81}\\theta_A = \\frac{97}{81}\\theta_A \\implies \\theta_A = \\frac{81}{97}\\theta$."
  },
  {
    q_num: 29,
    question_text: "Calculate the thermal stress developed in a rod kept on a smooth surface as shown in figure if the temperature of rod is increased by $\\Delta T$. [$Y \\to \\text{Young's modulus}$, $\\alpha \\to \\text{Coefficient of thermal expansion}$, $A \\to \\text{Cross-section area}$]",
    options: [
      "$Y\\alpha\\Delta T$",
      "$\\alpha^2\\Delta T$",
      "Zero",
      "$YA\\alpha\\Delta T$"
    ],
    correct_index: 2,
    topic: "Thermal Stress on Unconstrained Body",
    difficulty: "easy",
    image_url: getImageUrl(29),
    solution: "Since the rod is placed on a smooth horizontal surface with no fixed supports or constraints at its ends, it is free to expand without any external reaction force. Therefore, thermal stress developed is Zero."
  },
  {
    q_num: 30,
    question_text: "A 4 cm cube has its upper face displaced by 0.1 mm by a tangential force of 8 kN. Calculate the shear modulus of the cube",
    options: [
      "$2 \\times 10^{10}\\text{ dyne/cm}^2$",
      "Zero",
      "$4 \\times 10^{10}\\text{ dyne/cm}^2$",
      "$6 \\times 10^{10}\\text{ dyne/cm}^2$"
    ],
    correct_index: 0,
    topic: "Shear Modulus Calculation",
    difficulty: "medium",
    image_url: getImageUrl(30),
    solution: "Area of face $A = (4\\text{ cm})^2 = 16\\text{ cm}^2 = 1.6 \\times 10^{-3}\\text{ m}^2$.\nTangential force $F = 8\\text{ kN} = 8000\\text{ N}$.\n$$\\text{Shear stress } \\tau = \\frac{8000}{1.6 \\times 10^{-3}} = 5 \\times 10^6\\text{ N/m}^2$$\n$$\\text{Shear strain } \\theta = \\frac{\\Delta x}{L} = \\frac{0.1\\text{ mm}}{40\\text{ mm}} = 2.5 \\times 10^{-3}$$\n$$\\text{Shear modulus } \\eta = \\frac{\\tau}{\\theta} = \\frac{5 \\times 10^6}{2.5 \\times 10^{-3}} = 2 \\times 10^9\\text{ N/m}^2 = 2 \\times 10^{10}\\text{ dyne/cm}^2$$"
  },
  {
    q_num: 31,
    question_text: "For a given material the Young's modulus is 2.4 times the modulus of rigidity. Its Poisson's ratio is",
    options: [
      "0.2",
      "0.4",
      "1.2",
      "2.4"
    ],
    correct_index: 0,
    topic: "Relation Between Elastic Moduli",
    difficulty: "easy",
    image_url: getImageUrl(31),
    solution: "Using the relation $Y = 2\\eta(1 + \\sigma)$:\n$$2.4\\eta = 2\\eta(1 + \\sigma) \\implies 1.2 = 1 + \\sigma \\implies \\sigma = 0.2$$"
  },
  {
    q_num: 32,
    question_text: "Volume of a sphere is decreased by $0.02\\%$, when it is subjected to a change in pressure of $4 \\times 10^5\\text{ Pa}$. Bulk modulus of the material of sphere is",
    options: [
      "$4 \\times 10^9\\text{ N m}^{-2}$",
      "$2 \\times 10^9\\text{ N m}^{-2}$",
      "$2 \\times 10^7\\text{ N m}^{-2}$",
      "$4 \\times 10^7\\text{ N m}^{-2}$"
    ],
    correct_index: 1,
    topic: "Bulk Modulus of Solid Sphere",
    difficulty: "easy",
    image_url: getImageUrl(32),
    solution: "Volumetric strain is $\\frac{|\\Delta V|}{V} = 0.02\\% = 2 \\times 10^{-4}$.\n$$B = \\frac{\\Delta P}{|\\Delta V / V|} = \\frac{4 \\times 10^5}{2 \\times 10^{-4}} = 2 \\times 10^9\\text{ N/m}^2$$"
  },
  {
    q_num: 33,
    question_text: "A solid metal cube is kept on a table surface such that its face in contact with table is rigidly fixed. A tangential stress $4 \\times 10^6\\text{ N m}^{-2}$ is applied to the top face of the cube. If modulus of rigidity of the metal of cube is $4 \\times 10^{10}\\text{ N m}^{-2}$, then shearing strain produced in the cube is",
    options: [
      "$10^{-4}\\text{ radian}$",
      "$10^2\\text{ radian}$",
      "$10^{-3}\\text{ radian}$",
      "$10^{-2}\\text{ radian}$"
    ],
    correct_index: 0,
    topic: "Shearing Strain",
    difficulty: "easy",
    image_url: getImageUrl(33),
    solution: "$$\\text{Shearing strain } \\theta = \\frac{\\text{Shear Stress}}{\\text{Modulus of Rigidity}} = \\frac{4 \\times 10^6}{4 \\times 10^{10}} = 10^{-4}\\text{ radian}$$"
  },
  {
    q_num: 34,
    question_text: "In the load-extension graph for a wire, the elastic proportional limit lies upto the point",
    options: [
      "B",
      "A",
      "O",
      "C"
    ],
    correct_index: 1,
    topic: "Load-Extension Curve Points",
    difficulty: "easy",
    image_url: getImageUrl(34),
    solution: "On the load-extension diagram:\n- Point A represents the limit of proportionality (where Hooke's law is obeyed strictly).\n- Point B is the elastic limit (yield point).\n- Point C is the ultimate tensile strength.\n- Point D is the breaking point."
  },
  {
    q_num: 35,
    question_text: "The stress and strain curve for two wires is as shown in figure given below. If $Y_1$ and $Y_2$ are Young's modulus of the material of wires, then ratio $\\left(\\frac{Y_1}{Y_2}\\right)$ will be",
    options: [
      "1",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\sqrt{3}$",
      "$\\frac{2}{\\sqrt{3}}$"
    ],
    correct_index: 2,
    topic: "Slope of Stress-Strain Curve",
    difficulty: "easy",
    image_url: getImageUrl(35),
    solution: "Young's modulus equals the slope of the stress-strain curve with respect to the strain axis: $Y = \\tan\\theta$.\nWire (1) makes $60^\\circ$ with strain axis $\\implies Y_1 = \\tan 60^\\circ = \\sqrt{3}$.\nWire (2) makes $45^\\circ$ with strain axis $\\implies Y_2 = \\tan 45^\\circ = 1$.\n$$\\frac{Y_1}{Y_2} = \\frac{\\sqrt{3}}{1} = \\sqrt{3}$$"
  },
  {
    q_num: 36,
    question_text: "The upper end of a wire of radius 4 mm and length 100 cm is clamped and its lower end is twisted through an angle of $30^\\circ$. The angle of shear is",
    options: [
      "$1.2^\\circ$",
      "$0.012^\\circ$",
      "$0.12^\\circ$",
      "$12^\\circ$"
    ],
    correct_index: 2,
    topic: "Angle of Twist and Angle of Shear",
    difficulty: "medium",
    image_url: getImageUrl(36),
    solution: "The relation between shear angle $\\phi$ and twist angle $\\theta$ is $L \\phi = r \\theta$:\n$$\\phi = \\frac{r}{L} \\theta = \\frac{0.4\\text{ cm}}{100\\text{ cm}} \\times 30^\\circ = 0.004 \\times 30^\\circ = 0.12^\\circ$$"
  },
  {
    q_num: 37,
    question_text: "Two rods of same material but of radius $r$ and $2r$ fixed between two supports and the temperature is raised by $7^\\circ\\text{C}$. The ratio of thermal stress developed in them is",
    options: [
      "1 : 2",
      "1 : 1",
      "1 : 4",
      "4 : 1"
    ],
    correct_index: 1,
    topic: "Thermal Stress in Rods of Different Radii",
    difficulty: "easy",
    image_url: getImageUrl(37),
    solution: "Thermal stress is $\\text{Stress} = Y \\alpha \\Delta T$, which is completely independent of the cross-sectional radius or length of the rod. Since material and temperature rise are identical, the ratio of thermal stresses is $1 : 1$."
  },
  {
    q_num: 38,
    question_text: "If $\\rho$ is the density of the material of a wire and $\\sigma$ breaking stress, the maximum length of the wire that can hang freely without breaking is",
    options: [
      "$\\frac{2\\sigma}{\\rho g}$",
      "$\\frac{\\sigma}{\\rho g}$",
      "$\\frac{\\rho g}{2\\sigma}$",
      "$\\frac{\\sigma}{2\\rho g}$"
    ],
    correct_index: 1,
    topic: "Maximum Self-Supporting Length",
    difficulty: "easy",
    image_url: getImageUrl(38),
    solution: "Maximum tensile stress occurs at the top support: $\\text{Stress} = \\frac{W}{A} = \\frac{(\\rho A L) g}{A} = \\rho L g$.\nFor the wire not to break:\n$$\\rho L g \\le \\sigma \\implies L_{\\text{max}} = \\frac{\\sigma}{\\rho g}$$"
  },
  {
    q_num: 39,
    question_text: "To what depth below the surface of sea should a rubber ball be taken so as to decrease its volume by $0.1\\%$? (Average density of sea water $1000\\text{ kg/m}^3$, bulk modulus of rubber $= 9 \\times 10^8\\text{ N/m}^2$, $g = 10\\text{ m/s}^2$)",
    options: [
      "9 m",
      "18 m",
      "180 m",
      "90 m"
    ],
    correct_index: 3,
    topic: "Bulk Modulus and Sea Depth",
    difficulty: "medium",
    image_url: getImageUrl(39),
    solution: "Fractional decrease in volume $\\frac{|\\Delta V|}{V} = 0.1\\% = 10^{-3}$.\n$$\\Delta P = B \\left(\\frac{|\\Delta V|}{V}\\right) = (9 \\times 10^8) \\times 10^{-3} = 9 \\times 10^5\\text{ N/m}^2$$\nSince $\\Delta P = \\rho g h$:\n$$h = \\frac{\\Delta P}{\\rho g} = \\frac{9 \\times 10^5}{1000 \\times 10} = 90\\text{ m}$$"
  },
  {
    q_num: 40,
    question_text: "If $U$ represent potential energy and $r$ represent interatomic separation between the atoms, then which of the following graph best represent variation in $U$ with $r$? (Here $r_0$ represents equilibrium distance)",
    options: [
      "Graph with potential energy always positive",
      "Graph with inverted potential well",
      "Graph showing sharp repulsive rise for $r < r_0$ and potential minimum at $r_0$",
      "Graph symmetric about the origin"
    ],
    correct_index: 2,
    topic: "Interatomic Potential Energy Curve",
    difficulty: "medium",
    image_url: getImageUrl(40),
    solution: "The interatomic potential energy curve shows that for $r > r_0$, attractive forces dominate and potential energy is negative. At equilibrium separation $r = r_0$, potential energy reaches its minimum ($-U_0$) where force $F = -dU/dr = 0$. For $r < r_0$, powerful repulsive forces take over, causing $U$ to rise sharply into positive values. Graph (3) correctly displays this characteristic curve."
  },

  // ── Page 3: Q41 to Q62 ───────────────────────────────────────────────────────────
  {
    q_num: 41,
    question_text: "Calculate the tangential stress on surface $BB'$ when force $F$ acts on a solid cylinder fixed on one end whose cross-sectional area is as shown in the figure",
    options: [
      "$\\frac{F}{A}$",
      "$\\frac{F}{2A}\\sin(2\\theta)$",
      "$\\frac{2F}{A}\\sin(2\\theta)$",
      "$\\frac{F}{A}\\sin\\theta$"
    ],
    correct_index: 1,
    topic: "Shear Stress on Oblique Section",
    difficulty: "medium",
    image_url: getImageUrl(41),
    solution: "Area of the inclined cross section $BB'$ is $A' = \\frac{A}{\\cos\\theta}$. The component of force acting parallel to the surface is $F_t = F \\sin\\theta$.\n$$\\text{Tangential stress} = \\frac{F_t}{A'} = \\frac{F \\sin\\theta}{A / \\cos\\theta} = \\frac{F}{A}\\sin\\theta\\cos\\theta = \\frac{F}{2A}\\sin(2\\theta)$$"
  },
  {
    q_num: 42,
    question_text: "A wire of length $L$ and density $\\rho$ and Young's modulus $Y$ is hanging from a rigid support. Find the elongation in the length of wire at which wire will break",
    options: [
      "$\\frac{L^2 \\rho g}{Y}$",
      "$\\frac{L^2 \\rho g}{2Y}$",
      "$\\frac{2L^2 \\rho g}{Y}$",
      "$\\frac{L^2 \\rho g}{4Y}$"
    ],
    correct_index: 1,
    topic: "Self-Weight Elongation",
    difficulty: "easy",
    image_url: getImageUrl(42),
    solution: "The total elongation of a uniform wire hanging under its own weight is:\n$$\\Delta L = \\frac{M g L}{2 A Y} = \\frac{(\\rho A L) g L}{2 A Y} = \\frac{L^2 \\rho g}{2Y}$$"
  },
  {
    q_num: 43,
    question_text: "A uniform elastic rod of cross-sectional area $A$, natural length $L$ and Young's modulus $Y$ is placed on a smooth horizontal surface. Now two horizontal forces (of magnitude $F$ and $3F$) directed along the length of rod and in opposite direction act at two of its ends as shown. After the rod has acquired steady state, the extension of the rod will be",
    options: [
      "$\\frac{2FL}{YA}$",
      "$\\frac{4FL}{YA}$",
      "$\\frac{FL}{YA}$",
      "$\\frac{3FL}{2YA}$"
    ],
    correct_index: 0,
    topic: "Extension in Accelerated Rod",
    difficulty: "hard",
    image_url: getImageUrl(43),
    solution: "Acceleration of rod is $a = \\frac{3F - F}{M} = \\frac{2F}{M}$.\nTension at distance $x$ from the end with force $F$ is $T(x) = F + \\left(\\frac{M}{L}x\\right)a = F + \\frac{2Fx}{L}$.\n$$\\Delta L = \\int_0^L \\frac{T(x)}{AY} dx = \\frac{1}{AY}\\int_0^L \\left(F + \\frac{2Fx}{L}\\right)dx = \\frac{1}{AY}\\left[FL + \\frac{2F}{L}\\frac{L^2}{2}\\right] = \\frac{2FL}{YA}$$"
  },
  {
    q_num: 44,
    question_text: "Modulus of rigidity (shear modulus) is not defined for",
    options: [
      "Solid only",
      "Liquid only",
      "Gas only",
      "Liquid and gas both"
    ],
    correct_index: 3,
    topic: "Modulus of Rigidity in Fluids",
    difficulty: "easy",
    image_url: getImageUrl(44),
    solution: "Modulus of rigidity represents resistance to change in shape without change in volume. Fluids (both liquids and gases) cannot withstand static shear stress and flow continuously under tangential forces; they have no definite shape. Hence, modulus of rigidity is not defined for both liquids and gases."
  },
  {
    q_num: 45,
    question_text: "The two wires shown in figure are made of the same material which has a breaking stress of $8 \\times 10^8\\text{ N/m}^2$. The area of cross-section of the upper wire is $0.006\\text{ cm}^2$ and that of the lower wire is $0.003\\text{ cm}^2$. The mass $m_1 = 20\\text{ kg}, m_2 = 10\\text{ kg}$ and the hanger is light. The maximum load that can be put on the hanger without breaking any wire is ($g = 10\\text{ m/s}^2$)",
    options: [
      "14 kg",
      "1.4 kg",
      "1.2 kg",
      "12 kg"
    ],
    correct_index: 0,
    topic: "Breaking Strength in Multi-Wire System",
    difficulty: "hard",
    image_url: getImageUrl(45),
    solution: "Upper wire breaking tension $T_{1,\\text{max}} = (8 \\times 10^8) \\times (0.006 \\times 10^{-4}) = 480\\text{ N}$.\nLower wire breaking tension $T_{2,\\text{max}} = (8 \\times 10^8) \\times (0.003 \\times 10^{-4}) = 240\\text{ N}$.\nLet $M$ be the load on the hanger:\nFor lower wire: $T_2 = (m_2 + M)g = (10 + M) \\times 10 \\le 240 \\implies 10 + M \\le 24 \\implies M \\le 14\\text{ kg}$.\nFor upper wire: $T_1 = (m_1 + m_2 + M)g = (20 + 10 + 14) \\times 10 = 440\\text{ N} \\le 480\\text{ N}$.\nThus, maximum load is 14 kg."
  },
  {
    q_num: 46,
    question_text: "A material has Poisson's ratio of 0.5. If a uniform rod of same material suffers a longitudinal strain of $2 \\times 10^{-3}$, then the % change in volume of the rod is",
    options: [
      "2%",
      "20%",
      "0.2%",
      "0%"
    ],
    correct_index: 3,
    topic: "Volumetric Strain with Poisson's Ratio 0.5",
    difficulty: "easy",
    image_url: getImageUrl(46),
    solution: "Volumetric strain is given by $\\frac{\\Delta V}{V} = \\frac{\\Delta L}{L}(1 - 2\\sigma)$.\nFor $\\sigma = 0.5$:\n$$\\frac{\\Delta V}{V} = \\frac{\\Delta L}{L}(1 - 2(0.5)) = \\frac{\\Delta L}{L}(0) = 0$$\nTherefore, percentage change in volume is $0\\%$."
  },
  {
    q_num: 47,
    question_text: "Choose the correct statement from the given stress-strain curves for materials (A) and (B):",
    options: [
      "Material in (A) is ideal to make thin wire",
      "Material in (B) is ideal to make thin wire",
      "Both materials in (A) and (B) are ideal to make thin wire",
      "Both materials in (A) and (B) are not good to make thin wire"
    ],
    correct_index: 1,
    topic: "Ductile vs Brittle Materials",
    difficulty: "easy",
    image_url: getImageUrl(47),
    solution: "Material (A) fractures immediately after the elastic limit with virtually no plastic region, meaning it is brittle. Material (B) has a broad plastic deformation region between elastic limit and breaking point, which is characteristic of ductile materials. Ductile materials can be easily drawn into thin wires. Thus, material in (B) is ideal to make thin wire."
  },
  {
    q_num: 48,
    question_text: "A solid ball is fully immersed in a liquid contained in a cylinder. The radius of cylinder is $R$. A piston (weightless) is placed on the liquid surface. If a pressure is applied on the liquid by a weight $W$ placed on the piston, then the fractional change in radius of ball is $x$. Then the bulk modulus for the material of ball is (given that $x \\ll 1$)",
    options: [
      "$\\frac{W}{\\pi R^2 x}$",
      "$\\frac{W}{3\\pi R^2 x}$",
      "$\\frac{W x}{\\pi R^2}$",
      "$\\frac{3W}{\\pi R^2 x}$"
    ],
    correct_index: 1,
    topic: "Bulk Modulus in Fluid Cylinder",
    difficulty: "medium",
    image_url: getImageUrl(48),
    solution: "Excess pressure applied by the weight is $\\Delta P = \\frac{W}{A} = \\frac{W}{\\pi R^2}$.\nFractional change in radius is $\\frac{\\Delta r}{r} = x$.\nSince volume of sphere is $V \\propto r^3$, volumetric strain is $\\frac{\\Delta V}{V} = 3\\frac{\\Delta r}{r} = 3x$.\n$$B = \\frac{\\Delta P}{\\Delta V / V} = \\frac{W / (\\pi R^2)}{3x} = \\frac{W}{3\\pi R^2 x}$$"
  },
  {
    q_num: 49,
    question_text: "If Poisson's ratio equal to 0.4 for the material of a cylindrical wire, then find the percentage change in volume of the same wire in which longitudinal strain is $2 \\times 10^{-3}$ on applying tensile stress",
    options: [
      "0.04%",
      "0.06%",
      "0.02%",
      "4%"
    ],
    correct_index: 0,
    topic: "Percentage Change in Volume",
    difficulty: "medium",
    image_url: getImageUrl(49),
    solution: "$$\\frac{\\Delta V}{V} = \\frac{\\Delta L}{L}(1 - 2\\sigma) = (2 \\times 10^{-3}) \\times (1 - 2 \\times 0.4) = (2 \\times 10^{-3}) \\times 0.2 = 4 \\times 10^{-4}$$\n$$\\%\\text{ change} = 4 \\times 10^{-4} \\times 100\\% = 0.04\\%$$"
  },
  {
    q_num: 50,
    question_text: "A steel wire is fixed at its one end on the roof. At other end of wire 1 kg mass is hung so that the energy stored in the wire becomes $E$. The energy stored in the same wire if we hang 2 kg mass instead of 1 kg is",
    options: [
      "$2E$",
      "$4E$",
      "$8E$",
      "$E$"
    ],
    correct_index: 1,
    topic: "Energy Stored Dependence on Load",
    difficulty: "easy",
    image_url: getImageUrl(50),
    solution: "The elastic potential energy stored in a wire under load $F = mg$ is:\n$$U = \\frac{F^2 L}{2 A Y} \\propto F^2 \\propto m^2$$\nDoubling the mass ($m' = 2m$) quadruples the stored energy: $U' = (2)^2 E = 4E$."
  },
  {
    q_num: 51,
    question_text: "If $x$ is the elongation or compression in a rod, Hooke's law is valid when restoring force ($F$) is proportional to",
    options: [
      "$\\frac{1}{x}$",
      "$\\frac{1}{x^2}$",
      "$x$",
      "$x^2$"
    ],
    correct_index: 2,
    topic: "Hooke's Law Statement",
    difficulty: "easy",
    image_url: getImageUrl(51),
    solution: "Hooke's law states that within the proportional limit, the restoring force is directly proportional to displacement (elongation or compression): $F \\propto x$."
  },
  {
    q_num: 52,
    question_text: "What is the value of Poisson's ratio for an incompressible material?",
    options: [
      "Zero",
      "0.2",
      "0.5",
      "Infinite"
    ],
    correct_index: 2,
    topic: "Poisson's Ratio for Incompressible Materials",
    difficulty: "easy",
    image_url: getImageUrl(52),
    solution: "For an incompressible material, volume change is zero ($\\Delta V = 0$).\n$$\\frac{\\Delta V}{V} = \\frac{\\Delta L}{L}(1 - 2\\sigma) = 0 \\implies 1 - 2\\sigma = 0 \\implies \\sigma = 0.5$$"
  },
  {
    q_num: 53,
    question_text: "A uniform wire of cross-sectional area $A$ is stretched by certain force, so that its length is elongated by $x$. What should be the cross-sectional area of the wire, so that elongation becomes $\\frac{x}{2}$ on applying same force?",
    options: [
      "$A$",
      "$2A$",
      "$4A$",
      "$8A$"
    ],
    correct_index: 1,
    topic: "Area and Elongation",
    difficulty: "easy",
    image_url: getImageUrl(53),
    solution: "Elongation is $\\Delta l = \\frac{F L}{A Y} \\propto \\frac{1}{A}$.\nTo halve the elongation ($\\Delta l' = x/2$), the cross-sectional area must be doubled: $A' = 2A$."
  },
  {
    q_num: 54,
    question_text: "If $E$ is the energy stored per unit volume in a wire having $Y$ Young's modulus of material, then stress applied is",
    options: [
      "$\\sqrt{2EY}$",
      "$2\\sqrt{EY}$",
      "$\\frac{1}{2}\\sqrt{EY}$",
      "$\\frac{2}{\\sqrt{EY}}$"
    ],
    correct_index: 0,
    topic: "Stress in Terms of Energy Density",
    difficulty: "easy",
    image_url: getImageUrl(54),
    solution: "Energy density is $E = \\frac{\\text{Stress}^2}{2Y} \\implies \\text{Stress}^2 = 2EY \\implies \\text{Stress} = \\sqrt{2EY}$."
  },
  {
    q_num: 55,
    question_text: "Two wires of same material have length in the ratio $1 : 2$. If they are stretched by applying equal forces, the increase in length is same. The ratio of their respective radii is",
    options: [
      "$1 : 1$",
      "$1 : 2$",
      "$1 : \\sqrt{2}$",
      "$2 : 1$"
    ],
    correct_index: 2,
    topic: "Ratio of Radii for Equal Elongation",
    difficulty: "easy",
    image_url: getImageUrl(55),
    solution: "Elongation $\\Delta l = \\frac{F L}{\\pi r^2 Y} \\implies r^2 \\propto L$ (for same $F, \\Delta l, Y$).\n$$\\frac{r_1^2}{r_2^2} = \\frac{L_1}{L_2} = \\frac{1}{2} \\implies \\frac{r_1}{r_2} = \\frac{1}{\\sqrt{2}} = 1 : \\sqrt{2}$$"
  },
  {
    q_num: 56,
    question_text: "The breaking stress of a wire depends on",
    options: [
      "Length of the wire",
      "Applied force",
      "Material of the wire",
      "Area of cross-section of the wire"
    ],
    correct_index: 2,
    topic: "Breaking Stress Dependence",
    difficulty: "easy",
    image_url: getImageUrl(56),
    solution: "Breaking stress is an intensive property characteristic of the material itself and is independent of dimensions like length or area of cross-section."
  },
  {
    q_num: 57,
    question_text: "A steel wire of cross-sectional area $3 \\times 10^{-6}\\text{ m}^2$ withstand a maximum strain of $10^{-3}$. If Young's modulus of steel is $2 \\times 10^{11}\\text{ N m}^{-2}$ then maximum mass which the wire can hold is [Take $g = 10\\text{ m s}^{-2}$]",
    options: [
      "40 kg",
      "100 kg",
      "60 kg",
      "80 kg"
    ],
    correct_index: 2,
    topic: "Maximum Load Calculation",
    difficulty: "easy",
    image_url: getImageUrl(57),
    solution: "$$\\text{Maximum stress} = Y \\times \\text{Strain}_{\\text{max}} = 2 \\times 10^{11} \\times 10^{-3} = 2 \\times 10^8\\text{ N/m}^2$$\n$$F_{\\text{max}} = \\text{Stress} \\times A = 2 \\times 10^8 \\times 3 \\times 10^{-6} = 600\\text{ N}$$\n$$m = \\frac{F_{\\text{max}}}{g} = \\frac{600}{10} = 60\\text{ kg}$$"
  },
  {
    q_num: 58,
    question_text: "A wire can bear maximum force $F$. A wire of same material but triple radius can bear maximum force of",
    options: [
      "$F$",
      "$3F$",
      "$9F$",
      "$27F$"
    ],
    correct_index: 2,
    topic: "Breaking Force and Radius",
    difficulty: "easy",
    image_url: getImageUrl(58),
    solution: "Breaking force is $F_{\\text{max}} = \\sigma_{\\text{breaking}} \\times \\pi r^2 \\propto r^2$.\nWhen radius is tripled ($r' = 3r$), $F' = 3^2 F = 9F$."
  },
  {
    q_num: 59,
    question_text: "A force applied on a brass wire of uniform cross section area creates change in its length and cross section area. If lateral strain produced in wire is $3 \\times 10^{-4}$, then energy stored in per unit volume of wire will be [$Y_{\\text{brass}} = 9 \\times 10^{10}\\text{ N/m}^2$, $\\sigma_{\\text{brass}} = 0.3$]",
    options: [
      "$275\\text{ kJ/m}^3$",
      "$315\\text{ kJ/m}^3$",
      "$450\\text{ kJ/m}^3$",
      "$175\\text{ kJ/m}^3$"
    ],
    correct_index: 2,
    topic: "Energy Density with Poisson's Ratio",
    difficulty: "medium",
    image_url: getImageUrl(59),
    solution: "Longitudinal strain is $\\epsilon_l = \\frac{\\text{Lateral strain}}{\\sigma} = \\frac{3 \\times 10^{-4}}{0.3} = 10^{-3}$.\n$$u = \\frac{1}{2} Y \\epsilon_l^2 = \\frac{1}{2} \\times (9 \\times 10^{11}) \\times (10^{-3})^2 = 450\\text{ kJ/m}^3$$"
  },
  {
    q_num: 60,
    question_text: "A uniform wire of length 3 m and mass 10 kg is suspended vertically from one end and loaded at other end by a block of mass 10 kg. The radius of cross section of wire is 0.1 m. The stress in the middle of wire is ($g = 10\\text{ m/s}^2$)",
    options: [
      "$1.4 \\times 10^4\\text{ N/m}^2$",
      "$4.8 \\times 10^3\\text{ N/m}^2$",
      "$96 \\times 10^2\\text{ N/m}^2$",
      "$3.5 \\times 10^4\\text{ N/m}^2$"
    ],
    correct_index: 1,
    topic: "Stress at Midpoint of Heavy Wire",
    difficulty: "medium",
    image_url: getImageUrl(60),
    solution: "Total mass supported below the midpoint is the block (10 kg) plus half the wire (5 kg) $= 15\\text{ kg}$.\n$$F = 15 \\times 10 = 150\\text{ N}$$\n$$A = \\pi r^2 = \\pi (0.1)^2 = 0.01\\pi \\approx 0.0314\\text{ m}^2$$\n$$\\text{Stress} = \\frac{150}{0.01\\pi} \\approx 4.77 \\times 10^3\\text{ N/m}^2 \\approx 4.8 \\times 10^3\\text{ N/m}^2$$"
  },
  {
    q_num: 61,
    question_text: "The density of material of a wire is $6\\text{ g/cc}$. If to break the wire a stress of $10^7\\text{ N/m}^2$ is required, then the length of the wire which will break by its own weight will be [Take $g = 10\\text{ m/s}^2$]",
    options: [
      "121 m",
      "165 m",
      "133 m",
      "167 m"
    ],
    correct_index: 3,
    topic: "Critical Length of Hanging Wire",
    difficulty: "easy",
    image_url: getImageUrl(61),
    solution: "Density $\\rho = 6\\text{ g/cm}^3 = 6000\\text{ kg/m}^3$.\nAt the top support, stress is $\\sigma = \\rho L g$:\n$$L = \\frac{\\sigma}{\\rho g} = \\frac{10^7}{6000 \\times 10} = \\frac{1000}{6} \\approx 166.7\\text{ m} \\approx 167\\text{ m}$$"
  },
  {
    q_num: 62,
    question_text: "If two wires of same material and of same length have ratio of their radii $1 : 2$, then under the effect of same stretching force their respective elongation will be in ratio",
    options: [
      "1 : 1",
      "1 : 2",
      "4 : 1",
      "3 : 4"
    ],
    correct_index: 2,
    topic: "Elongation Ratio",
    difficulty: "easy",
    image_url: getImageUrl(62),
    solution: "Elongation $\\Delta l = \\frac{F L}{\\pi r^2 Y} \\propto \\frac{1}{r^2}$.\n$$\\frac{\\Delta l_1}{\\Delta l_2} = \\left(\\frac{r_2}{r_1}\\right)^2 = \\left(\\frac{2}{1}\\right)^2 = 4 : 1$$"
  },

  // ── Page 4: Q63 to Q84 ───────────────────────────────────────────────────────────
  {
    q_num: 63,
    question_text: "The metal rod ($Y = 2 \\times 10^{12}\\text{ dyne/sq. cm}$) of coefficient of linear expansion $1.6 \\times 10^{-5}\\text{ per }^\\circ\\text{C}$ has its temperature raised by $20^\\circ\\text{C}$. The linear compressive stress to prevent the expansion of the rod is",
    options: [
      "$2.4 \\times 10^8\\text{ dyne/sq. cm}$",
      "$3.2 \\times 10^8\\text{ dyne/sq. cm}$",
      "$6.4 \\times 10^8\\text{ dyne/sq. cm}$",
      "$1.6 \\times 10^8\\text{ dyne/sq. cm}$"
    ],
    correct_index: 2,
    topic: "Thermal Stress Calculation",
    difficulty: "easy",
    image_url: getImageUrl(63),
    solution: "$$\\text{Stress} = Y \\alpha \\Delta T = (2 \\times 10^{12}) \\times (1.6 \\times 10^{-5}) \\times 20 = 6.4 \\times 10^8\\text{ dyne/cm}^2$$"
  },
  {
    q_num: 64,
    question_text: "One end of a uniform wire of length $L$ and of weight $W_0$ is attached rigidly to a point in the roof and a weight $W_1$ is suspended from its lower end. If $S$ is the area of cross-section of the wire, the stress in the wire at a height $L/4$ from its lower end is",
    options: [
      "$W_1/S$",
      "$\\left[W_1 + \\frac{W_0}{4}\\right]\\frac{1}{S}$",
      "$\\left[W_1 + \\frac{3W_0}{4}\\right]\\frac{1}{S}$",
      "$(W_1 + W_0)/S$"
    ],
    correct_index: 1,
    topic: "Stress Distribution in Hanging Wire",
    difficulty: "easy",
    image_url: getImageUrl(64),
    solution: "At height $L/4$ from the lower end, the total weight supported is the load $W_1$ plus the weight of the lower $L/4$ section of the wire ($\\frac{W_0}{4}$):\n$$\\text{Total Force} = W_1 + \\frac{W_0}{4} \\implies \\text{Stress} = \\left[W_1 + \\frac{W_0}{4}\\right]\\frac{1}{S}$$"
  },
  {
    q_num: 65,
    question_text: "An elongation of $0.1\\%$ in a wire of cross-sectional area $10^{-6}\\text{ m}^2$ causes a tension of 100 N. The Young's modulus is",
    options: [
      "$10^{12}\\text{ N/m}^2$",
      "$10^{11}\\text{ N/m}^2$",
      "$10^{10}\\text{ N/m}^2$",
      "$10^9\\text{ N/m}^2$"
    ],
    correct_index: 1,
    topic: "Young's Modulus Calculation",
    difficulty: "easy",
    image_url: getImageUrl(65),
    solution: "$$\\text{Strain} = 0.1\\% = 10^{-3}, \\quad \\text{Stress} = \\frac{100\\text{ N}}{10^{-6}\\text{ m}^2} = 10^8\\text{ N/m}^2$$\n$$Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{10^8}{10^{-3}} = 10^{11}\\text{ N/m}^2$$"
  },
  {
    q_num: 66,
    question_text: "The elongation ($x$) of a steel wire varies with the elongating force ($F$) according to the graph (within proportional limit):",
    options: [
      "Hyperbolic curve",
      "Parabolic curve curving upwards",
      "Exponential curve",
      "Straight line passing through origin"
    ],
    correct_index: 3,
    topic: "Elongation vs Force Graph",
    difficulty: "easy",
    image_url: getImageUrl(66),
    solution: "Within the proportional limit, Hooke's law applies: $x = \\frac{L}{AY} F \\implies x \\propto F$. Therefore, the graph of elongation $x$ versus force $F$ is a straight line passing through the origin (Graph 4)."
  },
  {
    q_num: 67,
    question_text: "A metal rod has a length of 100 cm and cross-section area of $1\\text{ cm}^2$. By raising its temperature from $0^\\circ\\text{C}$ to $100^\\circ\\text{C}$ so that it is not permitted to expand or bend, the tension developed in the rod is ($Y = 10^{12}\\text{ dyne/cm}^2$ and $\\alpha = 10^{-5}/^\\circ\\text{C}$)",
    options: [
      "$10^8\\text{ dyne}$",
      "$10^7\\text{ dyne}$",
      "$10^9\\text{ dyne}$",
      "$10^{10}\\text{ dyne}$"
    ],
    correct_index: 2,
    topic: "Thermal Force in Clamped Rod",
    difficulty: "easy",
    image_url: getImageUrl(67),
    solution: "$$F = Y \\alpha \\Delta T A = (10^{12}) \\times (10^{-5}) \\times 100 \\times 1 = 10^9\\text{ dyne}$$"
  },
  {
    q_num: 68,
    question_text: "A material has Poisson's ratio 0.5 and Young's modulus $2 \\times 10^{11}\\text{ Pa}$. If a uniform rod of it suffers a lateral strain of $4 \\times 10^{-4}$, then percentage change in its density will be",
    options: [
      "2%",
      "8%",
      "0%",
      "4%"
    ],
    correct_index: 2,
    topic: "Density Invariance for Incompressible Solids",
    difficulty: "easy",
    image_url: getImageUrl(68),
    solution: "For $\\sigma = 0.5$, volumetric strain is $\\frac{\\Delta V}{V} = \\frac{\\Delta L}{L}(1 - 2\\sigma) = 0$. Since volume does not change and mass is conserved, density remains constant, so the percentage change in density is $0\\%$."
  },
  {
    q_num: 69,
    question_text: "The Poisson's ratio of a material is 0.5, then $\\left(\\frac{Y}{B}\\right)$ is ($Y$ is Young's modulus, $B$ is Bulk modulus)",
    options: [
      "5",
      "3",
      "Zero",
      "Infinite"
    ],
    correct_index: 2,
    topic: "Ratio of Young's Modulus to Bulk Modulus",
    difficulty: "easy",
    image_url: getImageUrl(69),
    solution: "From $Y = 3B(1 - 2\\sigma)$:\n$$Y = 3B(1 - 2(0.5)) = 3B(0) = 0 \\implies \\frac{Y}{B} = 0$$"
  },
  {
    q_num: 70,
    question_text: "Young's modulus for perfectly rigid body is",
    options: [
      "1",
      "0.5",
      "Zero",
      "Infinity"
    ],
    correct_index: 3,
    topic: "Elastic Modulus of Rigid Body",
    difficulty: "easy",
    image_url: getImageUrl(70),
    solution: "A perfectly rigid body experiences no deformation under any finite stress ($\\text{Strain} = 0$). Hence, $Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{\\text{Stress}}{0} = \\infty$."
  },
  {
    q_num: 71,
    question_text: "Which of the following has maximum elasticity?",
    options: [
      "Rubber",
      "Steel",
      "Wood",
      "Mud"
    ],
    correct_index: 1,
    topic: "Comparison of Elasticity",
    difficulty: "easy",
    image_url: getImageUrl(71),
    solution: "Elasticity is measured by modulus of elasticity. Steel requires a far greater stress than rubber, wood, or mud to produce a given strain ($Y_{\\text{steel}} \\approx 2 \\times 10^{11}\\text{ N/m}^2$). Therefore, steel is the most elastic material."
  },
  {
    q_num: 72,
    question_text: "A rod of uniform cross-sectional area $10\\text{ mm}^2$, weighing 5 kg and length 2 m is suspended vertically from a fixed support. What is the elongation produced in the rod? (Young's modulus for rod $= 2 \\times 10^{11}\\text{ N/m}^2$, $g = 10\\text{ m/s}^2$)",
    options: [
      "$50 \\times 10^{-6}\\text{ m}$",
      "$10^{-6}\\text{ m}$",
      "$15 \\times 10^{-6}\\text{ m}$",
      "$25 \\times 10^{-6}\\text{ m}$"
    ],
    correct_index: 3,
    topic: "Self-Weight Elongation Calculation",
    difficulty: "easy",
    image_url: getImageUrl(72),
    solution: "$$\\Delta L = \\frac{M g L}{2 A Y} = \\frac{5 \\times 10 \\times 2}{2 \\times (10 \\times 10^{-6}) \\times (2 \\times 10^{11})} = \\frac{100}{4 \\times 10^6} = 25 \\times 10^{-6}\\text{ m}$$"
  },
  {
    q_num: 73,
    question_text: "Unit of tensile strain is",
    options: [
      "metre",
      "newton-metre",
      "$(\\text{metre})^2$",
      "Unitless"
    ],
    correct_index: 3,
    topic: "Dimensions of Strain",
    difficulty: "easy",
    image_url: getImageUrl(73),
    solution: "Tensile strain is the ratio of change in length to original length ($\\Delta L / L$). Being a ratio of two lengths, it is dimensionless and unitless."
  },
  {
    q_num: 74,
    question_text: "Compressibility of a substance is equal to reciprocal of",
    options: [
      "Bulk modulus",
      "Young's modulus",
      "Rigidity modulus",
      "Poisson's ratio"
    ],
    correct_index: 0,
    topic: "Definition of Compressibility",
    difficulty: "easy",
    image_url: getImageUrl(74),
    solution: "Compressibility $K$ is defined as the fractional decrease in volume per unit increase in pressure, which is the reciprocal of Bulk modulus: $K = \\frac{1}{B}$."
  },
  {
    q_num: 75,
    question_text: "The Young's modulus of a wire of length $L$ and radius $r$ is $Y$. If length is reduced to $\\frac{L}{2}$ and radius to $\\frac{r}{2}$, then Young's modulus will be",
    options: [
      "$\\frac{Y}{2}$",
      "$Y$",
      "$2Y$",
      "$4Y$"
    ],
    correct_index: 1,
    topic: "Invariance of Modulus of Elasticity",
    difficulty: "easy",
    image_url: getImageUrl(75),
    solution: "Young's modulus is a material constant independent of the geometric dimensions of the specimen. Thus, it remains $Y$."
  },
  {
    q_num: 76,
    question_text: "Compressed rubber ball has",
    options: [
      "Decreased potential energy",
      "Increased potential energy",
      "Decreased kinetic energy",
      "Increased kinetic energy"
    ],
    correct_index: 1,
    topic: "Potential Energy in Deformed Body",
    difficulty: "easy",
    image_url: getImageUrl(76),
    solution: "When a rubber ball is compressed, work is performed against internal restoring elastic forces. This work is stored in the deformed body as elastic potential energy, so its potential energy increases."
  },
  {
    q_num: 77,
    question_text: "Hooke's Law is obeyed within",
    options: [
      "Elastic limit",
      "Proportionality limit",
      "Breaking point",
      "Freezing point"
    ],
    correct_index: 1,
    topic: "Range of Hooke's Law",
    difficulty: "easy",
    image_url: getImageUrl(77),
    solution: "Stress is strictly directly proportional to strain only within the limit of proportionality (proportionality limit). Beyond this up to the elastic limit, the material remains elastic but the stress-strain relation is non-linear."
  },
  {
    q_num: 78,
    question_text: "Elongation in wire of length $L$ and Young's modulus of $Y$, when blocks of weight $W$ each are hung in position as shown in the pulley figure is",
    options: [
      "$\\frac{WL}{AY}$",
      "$\\frac{2WL}{AY}$",
      "$\\frac{WL}{2AY}$",
      "$\\frac{1}{4}\\left(\\frac{WL}{AY}\\right)$"
    ],
    correct_index: 0,
    topic: "Elongation in Pulley System",
    difficulty: "easy",
    image_url: getImageUrl(78),
    solution: "In equilibrium, tension in the wire across the smooth pulley is uniform and equal to $T = W$. For a wire of total length $L$ and cross-sectional area $A$ under tension $W$, elongation is:\n$$\\Delta L = \\frac{T L}{A Y} = \\frac{W L}{A Y}$$"
  },
  {
    q_num: 79,
    question_text: "A uniform bar of mass 2 kg cross-sectional area $A = 0.2\\text{ m}^2$ and $l = 1\\text{ m}$ is suspended so that it hangs vertically. The stress at middle point of bar is ($g = 10\\text{ m/s}^2$)",
    options: [
      "$50\\text{ N/m}^2$",
      "$25\\text{ N/m}^2$",
      "$100\\text{ N/m}^2$",
      "$12.5\\text{ N/m}^2$"
    ],
    correct_index: 0,
    topic: "Midpoint Stress of Hanging Bar",
    difficulty: "easy",
    image_url: getImageUrl(79),
    solution: "Weight supported below the midpoint is $m' = m/2 = 1\\text{ kg}$.\n$$F = m' g = 1 \\times 10 = 10\\text{ N}$$\n$$\\text{Stress} = \\frac{F}{A} = \\frac{10\\text{ N}}{0.2\\text{ m}^2} = 50\\text{ N/m}^2$$"
  },
  {
    q_num: 80,
    question_text: "Aluminium and iron rods of same length and diameter are combined together as shown in figure. Force $F$ is applied at one of the ends. The combined length is increased by 2 cm. The rods will have",
    options: [
      "Same stress and strain",
      "Different stress and strain",
      "Same stress and different strain",
      "Same strain and different stress"
    ],
    correct_index: 2,
    topic: "Series Composite Rods",
    difficulty: "medium",
    image_url: getImageUrl(80),
    solution: "Since both rods are in series and have equal diameter, the tensile force $F$ and cross-sectional area $A$ are identical, so stress $\\frac{F}{A}$ is the same. However, Young's moduli of aluminium and iron are different ($Y_{\\text{Fe}} \\ne Y_{\\text{Al}}$). Because $\\text{Strain} = \\frac{\\text{Stress}}{Y}$, their strains will be different. Thus, they have same stress and different strain."
  },
  {
    q_num: 81,
    question_text: "A uniform rod suspended from ceiling is elongated by its own weight. Which one of the following graphs represents the variation of elongation with length $L$?",
    options: [
      "Linear graph with negative slope",
      "Linear graph with positive slope",
      "Inverted parabola",
      "Parabolic curve curving upwards ($y \\propto x^2$)"
    ],
    correct_index: 3,
    topic: "Elongation vs Length Graph",
    difficulty: "easy",
    image_url: getImageUrl(81),
    solution: "Elongation due to self-weight is $\\Delta L = \\frac{\\rho g L^2}{2Y} \\propto L^2$. The graph of elongation versus length $L$ is a parabola passing through the origin and opening upwards (Graph 4)."
  },
  {
    q_num: 82,
    question_text: "Two wires $X$ and $Y$ of same length are made of same material. The figure represents the load $F$ versus extension $\\Delta x$ graph for the two wires. Hence",
    options: [
      "Modulus of elasticity of $Y$ is greater than that of $X$",
      "Stiffness of $Y$ is more than that of $X$",
      "The cross-sectional area of $Y$ is less than that of $X$",
      "All of these"
    ],
    correct_index: 1,
    topic: "Force vs Extension Graph",
    difficulty: "medium",
    image_url: getImageUrl(82),
    solution: "The slope of the $F$ vs $\\Delta x$ curve gives the stiffness (force constant) $k = \\frac{F}{\\Delta x} = \\frac{Y A}{L}$. Wire $Y$ has a steeper slope than wire $X$, meaning $k_Y > k_X$ (stiffness of $Y$ is greater than that of $X$). Because both wires have the same material ($Y_X = Y_Y$) and length, $k \\propto A$, which also implies $A_Y > A_X$."
  },
  {
    q_num: 83,
    question_text: "When a helical spring is stretched then the kind of strain produced in it is",
    options: [
      "Longitudinal",
      "Shear",
      "Volumetric",
      "Both (1) and (2)"
    ],
    correct_index: 1,
    topic: "Strain in Helical Spring",
    difficulty: "easy",
    image_url: getImageUrl(83),
    solution: "When a helical spring is stretched or compressed, the wire twists along its axis, subjecting the material to torsion. Torsion induces shearing strain (change in shape) rather than longitudinal stretching of the wire itself."
  },
  {
    q_num: 84,
    question_text: "If $Y, K, G$ are Young's modulus, bulk modulus and shear modulus of elasticity respectively and $\\sigma$ is Poisson's ratio then which of the following relations is correct?",
    options: [
      "$\\frac{9}{Y} = \\frac{1}{K} + \\frac{3}{G}$",
      "$Y = 3K(1 - 2\\sigma)$",
      "$Y = 2G(1 + \\sigma)$",
      "All of these"
    ],
    correct_index: 3,
    topic: "Interrelations Between Elastic Constants",
    difficulty: "easy",
    image_url: getImageUrl(84),
    solution: "All three relations are fundamental standard equations connecting the elastic moduli:\n1. $Y = 3K(1 - 2\\sigma)$\n2. $Y = 2G(1 + \\sigma)$\n3. Eliminating $\\sigma$ between them yields $\\frac{9}{Y} = \\frac{1}{K} + \\frac{3}{G}$.\nHence, 'All of these' is correct."
  },

  // ── Page 5: Q85 and Section B (AR 1 to AR 15) ──────────────────────────────────
  {
    q_num: 85,
    question_text: "The length of a string is $\\alpha$ when mass of 40 kg is suspended from it and $\\beta$ when 50 kg mass is suspended. Its length when 100 kg mass is suspended is",
    options: [
      "$6\\beta - 5\\alpha$",
      "$5\\beta - 6\\alpha$",
      "$5\\beta - \\alpha$",
      "$\\beta - 6\\alpha$"
    ],
    correct_index: 0,
    topic: "Natural Length and Spring Constant",
    difficulty: "medium",
    image_url: getImageUrl(85),
    solution: "Let $L_0$ be natural length and $k$ be stiffness:\n$$\\alpha = L_0 + \\frac{40g}{k}, \\quad \\beta = L_0 + \\frac{50g}{k}$$\nSubtracting: $\\beta - \\alpha = \\frac{10g}{k} \\implies \\frac{g}{k} = \\frac{\\beta - \\alpha}{10}$.\n$$L_0 = \\alpha - 40\\left(\\frac{\\beta - \\alpha}{10}\\right) = 5\\alpha - 4\\beta$$\nWhen 100 kg is suspended:\n$$L = L_0 + \\frac{100g}{k} = (5\\alpha - 4\\beta) + 10(\\beta - \\alpha) = 6\\beta - 5\\alpha$$"
  },
  {
    q_num: "AR_1",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Steel is more elastic than rubber.\n**Reason (R):** Deformation in steel is less than rubber for equal forces.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Comparison of Elasticity: Steel vs Rubber",
    difficulty: "easy",
    image_url: getImageUrl("AR_1"),
    solution: "For wires of equal length and area under the same stretching force, steel elongates much less than rubber ($\\Delta l_{\\text{steel}} \\ll \\Delta l_{\\text{rubber}}$). Because Young's modulus is $Y = \\frac{F L}{A \\Delta l}$, Young's modulus of steel is much larger than that of rubber. Therefore steel is more elastic, and Reason correctly explains Assertion."
  },
  {
    q_num: "AR_2",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Hooke's law is applicable up to the elastic limit.\n**Reason (R):** Up to the elastic limit stress is directly proportional to strain.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Proportional Limit vs Elastic Limit",
    difficulty: "easy",
    image_url: getImageUrl("AR_2"),
    solution: "Hooke's law (stress $\\propto$ strain) is strictly valid only up to the limit of proportionality. Between the proportional limit and the elastic limit, the material is elastic but stress is no longer proportional to strain. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_3",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Air is more elastic than iron.\n**Reason (R):** Elasticity is directly proportional to Bulk modulus and Bulk modulus of air is more than that of steel.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Bulk Modulus Comparison: Air vs Solids",
    difficulty: "easy",
    image_url: getImageUrl("AR_3"),
    solution: "Bulk modulus of iron/steel ($\\sim 10^{11}\\text{ Pa}$) is nearly a million times greater than that of air ($\\sim 10^5\\text{ Pa}$). Therefore iron is far more elastic than air. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_4",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Solid bodies are not perfectly rigid.\n**Reason (R):** Solid bodies can be stretched, compressed or even bent.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Rigid Bodies in Nature",
    difficulty: "easy",
    image_url: getImageUrl("AR_4"),
    solution: "In reality, no body is perfectly rigid because every solid undergoes some deformation (stretching, compression, or bending) when subjected to deforming forces. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_5",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The property of the body by virtue of which it does not tends to regain its original size and shape when applied force is removed is known as plasticity.\n**Reason (R):** The permanent deformations are due to increase in interatomic spaces in case of tensile force.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Plasticity and Atomic Mechanism",
    difficulty: "medium",
    image_url: getImageUrl("AR_5"),
    solution: "Plasticity is the inability of a body to recover its original dimensions after removal of deforming forces (Assertion is true). Permanent plastic deformation occurs due to the slippage of atomic planes and movement of dislocations, where atoms settle into new equilibrium positions; it is not simply an increase in interatomic spacing (which returns to equilibrium $r_0$ once stress is removed). Hence Reason is false. Assertion is true, Reason is false."
  },
  {
    q_num: "AR_6",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Stress is equal to force per unit area.\n**Reason (R):** SI unit of stress is pascal (Pa).",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    topic: "Stress Definition and Units",
    difficulty: "easy",
    image_url: getImageUrl("AR_6"),
    solution: "Stress is defined as internal restoring force per unit area, and its SI unit is $\\text{N/m}^2$, also called pascal (Pa). Both statements are true, but having pascal as its unit does not explain the physical definition of stress."
  },
  {
    q_num: "AR_7",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Hooke's laws holds true for all values of deformations.\n**Reason (R):** Stress $\\propto$ Strain always.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Validity of Hooke's Law",
    difficulty: "easy",
    image_url: getImageUrl("AR_7"),
    solution: "Hooke's law is valid only for small deformations within the proportionality limit. Beyond this limit, stress is not proportional to strain. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_8",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Shear modulus ($G$) or Modulus of rigidity is generally less than Young's modulus ($Y$).\n**Reason (R):** For most materials $G \\approx \\frac{Y}{3}$.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Shear Modulus vs Young's Modulus",
    difficulty: "easy",
    image_url: getImageUrl("AR_8"),
    solution: "From $Y = 2G(1 + \\sigma)$, since Poisson's ratio for most materials is $\\approx 0.3 - 0.5$, we find $Y \\approx 2.6G$ to $3G \\implies G \\approx \\frac{Y}{3}$. Thus, shear modulus is about one-third of Young's modulus, making it generally smaller. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_9",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Solids are least compressible as compare to liquids and gases.\n**Reason (R):** The incompressibility in solids is primarily due to the tight coupling between the neighbouring atoms.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Compressibility of States of Matter",
    difficulty: "easy",
    image_url: getImageUrl("AR_9"),
    solution: "In solids, constituent atoms are closely packed and held tightly by strong interatomic electrostatic bonds. Attempting to compress them encounters powerful repulsive forces, resulting in very high bulk modulus and low compressibility. Both Assertion and Reason are true, and Reason correctly explains Assertion."
  },
  {
    q_num: "AR_10",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The ratio of lateral strain to longitudinal strain is called Poisson's ratio.\n**Reason (R):** The expression of Poisson's ratio holds true for all the values of deformation forces.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Poisson's Ratio Validity",
    difficulty: "medium",
    image_url: getImageUrl("AR_10"),
    solution: "By definition, Poisson's ratio is the ratio of lateral strain to longitudinal strain within the elastic limit (Assertion is true). However, this constant ratio holds only for small deformations within the elastic limit, not for all values of deforming forces. Thus Reason is false. Assertion is true, Reason is false."
  },
  {
    q_num: "AR_11",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** From the relation $Y = \\frac{Fl}{Ae}$, where $F = \\text{Stands for force}$, $l = \\text{length of the wire}$, $A = \\text{Area of the cross section of the wire}$, $e = \\text{Elongation of the wire}$ and $Y = \\text{Young's modulus of the wire}$, we can tell that when the length of the wire is halved, Young's modulus becomes halved.\n**Reason (R):** Modulus of elasticity is proportional to length of wire.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Young's Modulus Dimension Independence",
    difficulty: "easy",
    image_url: getImageUrl("AR_11"),
    solution: "Young's modulus is a material property that depends only on the nature of the material, not on the length or cross-sectional area of the wire. When the length is halved, elongation for the same force also halves, keeping $Y$ unchanged. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_12",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** A wire behaves like a spring, whose spring constant is inversely proportional to its original length.\n**Reason (R):** From, $F = -\\left(\\frac{AY}{l}\\right)x$, where $\\left(\\frac{AY}{l}\\right)$ is analogous to spring constant.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Spring Analogy of Stretched Wire",
    difficulty: "easy",
    image_url: getImageUrl("AR_12"),
    solution: "From Hooke's law $F = \\frac{YA}{l}x$, comparing with spring formula $F = kx$ gives effective spring constant $k = \\frac{YA}{l}$, which is inversely proportional to original length $l$. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_13",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Stress to strain ratio is always constant for a substance.\n**Reason (R):** $\\text{Modulus of elasticity} = \\frac{(\\text{Stress})^2}{\\text{Strain}}$.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Definition and Constancy of Modulus",
    difficulty: "easy",
    image_url: getImageUrl("AR_13"),
    solution: "Stress to strain ratio is constant only within the limit of proportionality, not always. Furthermore, modulus of elasticity is $\\frac{\\text{Stress}}{\\text{Strain}}$, not $\\frac{(\\text{Stress})^2}{\\text{Strain}}$. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_14",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** A class of solids called elastomers undergo great amount of strain for small values of stress provided to them.\n**Reason (R):** Elastomers obey Hooke's law.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Elastomers and Hooke's Law",
    difficulty: "easy",
    image_url: getImageUrl("AR_14"),
    solution: "Elastomers (like rubber) can be stretched to several times their original length under small stresses (Assertion is true). However, their stress-strain relationship is non-linear and they do not obey Hooke's law even for small strains (Reason is false). Assertion is true, Reason is false."
  },
  {
    q_num: "AR_15",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Young's modulus and shear modulus are applicable to solids, fluids and gases.\n**Reason (R):** $\\text{Modulus of elasticity} = \\frac{\\text{Stress}}{\\text{Strain}}$.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Applicability of Moduli to States of Matter",
    difficulty: "easy",
    image_url: getImageUrl("AR_15"),
    solution: "Fluids (liquids and gases) have no definite shape and cannot support static tensile or shear stresses; hence Young's modulus and shear modulus are defined only for solids. Thus Assertion is false. Both statements marked under option (4)."
  }
];

async function seed() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Mechanical Properties of Solids';

    // 1. Get Subject ID (Physics)
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;

    // 2. Get or Create Chapter ID (Mechanical Properties of Solids)
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
      // Check duplicate
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`[${q.q_num}] Skipped existing question (ID: ${existing.rows[0].id})`);
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

seed();
