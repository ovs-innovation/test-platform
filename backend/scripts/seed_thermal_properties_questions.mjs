import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: NEON_DB });

const diagrams = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'thermal_diagrams.json'), 'utf-8')
);

const thermalQuestions = [
  // --- PAGE 1: Q1 - Q8 ---
  {
    question_text: "Which of the curves represent the relation between celsius and Fahrenheit temperature?",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "The relation between Celsius ($C$) and Fahrenheit ($F$) temperatures is given by $C = \\frac{5}{9}(F - 32)$, or $C = \\frac{5}{9}F - \\frac{160}{9}$. This represents a straight line with positive slope $m = \\frac{5}{9}$, positive $F$-intercept at $F = 32^\\circ\\text{F}$ when $C = 0^\\circ\\text{C}$, and negative $C$-intercept at $C = -17.8^\\circ\\text{C}$ when $F = 0^\\circ\\text{F}$. Curve (1) accurately represents this relation.",
    image_url: diagrams.q1
  },
  {
    question_text: "Two identical rectangular strips, one of copper and the other of steel, are riveted together to form a bimetallic strip ($\\alpha_{\\text{copper}} > \\alpha_{\\text{steel}}$). On heating, the strip will",
    options: ["Remain straight", "Bend with copper on convex side", "Bend with steel on convex side", "Get twisted"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Since copper expands more than steel on heating ($\\alpha_{\\text{copper}} > \\alpha_{\\text{steel}}$), the copper layer expands to a longer length. To accommodate this unequal expansion while riveted together, the bimetallic strip bends into an arc with copper on the outer (convex) side and steel on the inner (concave) side."
  },
  {
    question_text: "5 gm of ice at $0^\\circ\\text{C}$ is mixed with 1 gm steam at $100^\\circ\\text{C}$. The final temperature and composition of the mixture is",
    options: ["Water at $40^\\circ\\text{C}$", "Water at $60^\\circ\\text{C}$", "2 g water at $100^\\circ\\text{C}$ and rest as steam", "2 g water at $0^\\circ\\text{C}$ and rest ice"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat required to melt 5 g of ice at $0^\\circ\\text{C}$ into water at $0^\\circ\\text{C}$: $Q_1 = 5 \\times 80 = 400\\text{ cal}$. Heat released if 1 g steam condenses to water at $100^\\circ\\text{C}$: $Q_2 = 1 \\times 540 = 540\\text{ cal}$. Since $540 > 400\\text{ cal}$, all ice melts and steam condenses completely. Let the final equilibrium temperature be $T$. Heat gained = Heat lost $\\implies 400 + 5 \\times 1 \\times (T - 0) = 540 + 1 \\times 1 \\times (100 - T) \\implies 400 + 5T = 640 - T \\implies 6T = 240 \\implies T = 40^\\circ\\text{C}$. The final state is entirely water at $40^\\circ\\text{C}$."
  },
  {
    question_text: "Four rods of same material and having the same cross-section and length have been joined as shown. The temperature of the junction of four rods will be",
    options: ["$20^\\circ\\text{C}$", "$30^\\circ\\text{C}$", "$45^\\circ\\text{C}$", "$60^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Since all four rods have identical material, length $L$, and area $A$, each has equal thermal resistance $R$. By Kirchhoff's junction rule for heat currents at junction temperature $\\theta$: $\\sum \\frac{T_i - \\theta}{R} = 0 \\implies (0 - \\theta) + (30 - \\theta) + (90 - \\theta) + (60 - \\theta) = 0 \\implies 4\\theta = 180 \\implies \\theta = 45^\\circ\\text{C}$.",
    image_url: diagrams.q4
  },
  {
    question_text: "A spherical black body with a radius of 12 cm radiates 450 W thermal radiation at 500 K. If the radius were halved and temperature doubled, the power radiated would be",
    options: ["450 W", "225 W", "1000 W", "1800 W"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law, radiated power is $P = \\sigma A T^4 = \\sigma (4\\pi R^2) T^4 \\propto R^2 T^4$. When $R' = R/2$ and $T' = 2T$: $P' = P \\left(\\frac{R'}{R}\\right)^2 \\left(\\frac{T'}{T}\\right)^4 = 450 \\times \\left(\\frac{1}{2}\\right)^2 \\times (2)^4 = 450 \\times \\frac{1}{4} \\times 16 = 450 \\times 4 = 1800\\text{ W}$."
  },
  {
    question_text: "The temperature of a body falls from $80^\\circ\\text{C}$ to $70^\\circ\\text{C}$ in 10 minute. Find time in which temperature will fall from $70^\\circ\\text{C}$ to $60^\\circ\\text{C}$, if temperature of surroundings is $15^\\circ\\text{C}$. (Assume Newton's average rate of cooling to be valid)",
    options: ["15 min", "10 min", "16 min", "12 min"],
    correct_index: 3,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average cooling law: $\\frac{T_1 - T_2}{t} = K\\left(\\frac{T_1 + T_2}{2} - T_0\\right)$. For the first interval: $\\frac{80 - 70}{10} = K\\left(\\frac{80 + 70}{2} - 15\\right) \\implies 1 = K(75 - 15) = 60K \\implies K = \\frac{1}{60}\\text{ min}^{-1}$. For the second interval: $\\frac{70 - 60}{t} = \\frac{1}{60}\\left(\\frac{70 + 60}{2} - 15\\right) \\implies \\frac{10}{t} = \\frac{1}{60}(65 - 15) = \\frac{50}{60} = \\frac{5}{6} \\implies t = \\frac{60}{5} = 12\\text{ min}$."
  },
  {
    question_text: "Light from an electric lamp A has spectral emissive power as shown in figure. For another lamp B which takes the same input power as lamp A but operates at a higher temperature, the graph is best represented by",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Wien's displacement law $\\lambda_m T = b$, a higher operating temperature ($T_B > T_A$) shifts the peak emission wavelength $\\lambda_m$ to a shorter wavelength (leftwards). Moreover, maximum spectral emissive power increases as $(e_\\lambda)_{\\max} \\propto T^5$. Therefore, graph (2) with a taller peak shifted towards shorter $\\lambda$ correctly represents lamp B.",
    image_url: diagrams.q7
  },
  {
    question_text: "Assume that specific heat capacity of a material increases with increase in temperature. If equal amount of the substance is mixed in isolation at two different temperatures $T_1\\text{ K}$ and $T_2\\text{ K}$ ($T_1 > T_2$) then the equilibrium temperature will be",
    options: ["Greater than $\\left(\\frac{T_1 + T_2}{2}\\right)$", "Lesser than $\\left(\\frac{T_1 + T_2}{2}\\right)$", "$\\frac{T_1 + T_2}{2}$", "Unpredictable due to insufficient data"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Since specific heat capacity increases with temperature, the substance at temperature $T_1$ has a higher average specific heat capacity than the substance at $T_2$ ($s_1 > s_2$). For heat conservation in an isolated system: $m s_1 (T_1 - T) = m s_2 (T - T_2)$. Because $s_1 > s_2$, the temperature change of the hotter body must be less than that of the cooler body: $T_1 - T < T - T_2 \\implies 2T > T_1 + T_2 \\implies T > \\frac{T_1 + T_2}{2}$."
  },

  // --- PAGE 2: Q9 - Q30 ---
  {
    question_text: "A uniform cylinder of length $\\ell$ and radius $r$ is connected between ice at $0^\\circ\\text{C}$ and steam at $100^\\circ\\text{C}$. This leads to melting of ice at the rate of $\\alpha\\text{ kg/sec}$. Now the cylinder is melted and recast into 3 identical cylinders of radius $(\\sqrt{2})r$ each and they are now connected in series across the same ice and steam chambers. The new rate of melting of ice in kg/sec is",
    options: ["$2\\alpha$", "$\\alpha$", "$4\\alpha$", "$8\\alpha$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "hard",
    marks: 4,
    solution: "Initial cylinder volume $V = \\pi r^2 \\ell$ and initial thermal resistance $R_0 = \\frac{\\ell}{K\\pi r^2}$. Conservation of volume for the 3 new cylinders: $3 \\times \\pi (\\sqrt{2}r)^2 \\ell' = \\pi r^2 \\ell \\implies 6\\pi r^2 \\ell' = \\pi r^2 \\ell \\implies \\ell' = \\ell / 6$. Resistance of each new cylinder: $R' = \\frac{\\ell'}{K\\pi (\\sqrt{2}r)^2} = \\frac{\\ell/6}{2K\\pi r^2} = \\frac{R_0}{12}$. Connected in series, total resistance is $R_{\\text{eq}} = 3R' = \\frac{R_0}{4}$. Rate of melting $\\alpha' \\propto \\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_0/4} = 4\\alpha$."
  },
  {
    question_text: "The coefficient of volume expansion of material of a metre scale is $18 \\times 10^{-5}\\text{ K}^{-1}$. The fractional change in its length when temperature is changed by $20^\\circ\\text{C}$ is",
    options: ["$36 \\times 10^{-4}$", "$18 \\times 10^{-4}$", "$12 \\times 10^{-4}$", "$6 \\times 10^{-4}$"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Linear expansion coefficient $\\alpha = \\frac{\\gamma}{3} = \\frac{18 \\times 10^{-5}}{3} = 6 \\times 10^{-5}\\text{ K}^{-1}$. The fractional change in length is $\\frac{\\Delta \\ell}{\\ell} = \\alpha \\Delta T = (6 \\times 10^{-5}\\text{ K}^{-1})(20\\text{ K}) = 120 \\times 10^{-5} = 12 \\times 10^{-4}$."
  },
  {
    question_text: "Consider a compound slab consisting of two different material having equal area of cross-section and thermal conductivities K and 4K. The equivalent thermal conductivity of the slab is",
    options: ["K", "1.5K", "2K", "2.5K"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "From the figure, the two slabs of thicknesses $x$ and $2x$ are connected in series. Total thermal resistance: $R_{\\text{total}} = R_1 + R_2 = \\frac{x}{KA} + \\frac{2x}{4KA} = \\frac{x}{KA} + \\frac{x}{2KA} = \\frac{3x}{2KA}$. Equivalent conductivity: $R_{\\text{total}} = \\frac{3x}{K_{\\text{eq}}A} \\implies \\frac{3x}{K_{\\text{eq}}A} = \\frac{3x}{2KA} \\implies K_{\\text{eq}} = 2K$.",
    image_url: diagrams.q11
  },
  {
    question_text: "A liquid in a beaker has temperature $\\theta_0$ at $t=0$ and $\\theta_s$ is the temperature of surroundings. If $\\theta$ is the instantaneous temperature of the body, according to Newton's law of cooling, the correct graph between temperature of body and time is",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "By Newton's law of cooling, $\\frac{d\\theta}{dt} = -k(\\theta - \\theta_s) \\implies \\theta(t) = \\theta_s + (\\theta_0 - \\theta_s)e^{-kt}$. This shows that the temperature decays exponentially with time, asymptotically approaching the surroundings temperature $\\theta_s$, which is correctly shown in graph (1).",
    image_url: diagrams.q12
  },
  {
    question_text: "A black body has maximum wavelength $\\lambda_m$ at temperature 1000 K. Its corresponding wavelength at temperature 4000 K will be",
    options: ["$2\\lambda_m$", "$\\lambda_m$", "$\\frac{\\lambda_m}{2}$", "$\\frac{\\lambda_m}{4}$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law, $\\lambda_m T = \\text{constant}$. Thus, $\\lambda_m' T' = \\lambda_m T \\implies \\lambda_m' = \\lambda_m \\left(\\frac{1000}{4000}\\right) = \\frac{\\lambda_m}{4}$."
  },
  {
    question_text: "Suppose on a temperature scale X, water boils at $-60^\\circ\\text{X}$ and freezes at $-200^\\circ\\text{X}$. The temperature of $50^\\circ\\text{C}$ on the X-scale is",
    options: ["$-120^\\circ\\text{X}$", "$-130^\\circ\\text{X}$", "$-140^\\circ\\text{X}$", "$-135^\\circ\\text{X}$"],
    correct_index: 1,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "Using scale linear interpolation: $\\frac{X - \\text{FP}}{\\text{BP} - \\text{FP}} = \\frac{C - 0}{100 - 0} \\implies \\frac{X - (-200)}{-60 - (-200)} = \\frac{50}{100} \\implies \\frac{X + 200}{140} = 0.5 \\implies X + 200 = 70 \\implies X = -130^\\circ\\text{X}$."
  },
  {
    question_text: "The volume of a metal sphere increases by 0.24% when its temperature is increased by $40^\\circ\\text{C}$. The coefficient of linear expansion of the metal measured in SI unit is",
    options: ["$2 \\times 10^{-5}$", "$6 \\times 10^{-5}$", "$8 \\times 10^{-5}$", "$1.2 \\times 10^{-5}$"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Fractional volume expansion $\\frac{\\Delta V}{V} = \\gamma \\Delta T = \\frac{0.24}{100} = 2.4 \\times 10^{-3}$. Thus $\\gamma = \\frac{2.4 \\times 10^{-3}}{40} = 6 \\times 10^{-5}\\text{ K}^{-1}$. The coefficient of linear expansion is $\\alpha = \\frac{\\gamma}{3} = \\frac{6 \\times 10^{-5}}{3} = 2 \\times 10^{-5}\\text{ K}^{-1}$."
  },
  {
    question_text: "200 g of a solid ball at $20^\\circ\\text{C}$ is dropped in an equal amount of water at $80^\\circ\\text{C}$. The resulting temperature is $60^\\circ\\text{C}$. This means that specific heat of solid is",
    options: ["One fourth of water", "One half of water", "Twice of water", "Four times of water"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "By principle of calorimetry: Heat gained by solid = Heat lost by water $\\implies m_s c_s (60 - 20) = m_w c_w (80 - 60)$. Since $m_s = m_w = 200\\text{ g}$: $40 c_s = 20 c_w \\implies c_s = \\frac{20}{40} c_w = \\frac{1}{2} c_w$ (one half of water)."
  },
  {
    question_text: "A cylinder of radius R of a material of thermal conductivity $K_1$ is surrounded by a cylindrical sheet of inner radius R and outer radius 3R, made of a material of thermal conductivity $K_2$. The effective thermal conductivity of the system assuming heat current to flow along the length of cylinder is",
    options: ["$K_1 + K_2$", "$\\frac{K_1 + 3K_2}{4}$", "$\\frac{K_1 + 8K_2}{9}$", "$\\frac{8K_1 + K_2}{9}$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "The two conductors are in parallel. Inner cylinder area: $A_1 = \\pi R^2$. Outer cylindrical sheet area: $A_2 = \\pi (3R)^2 - \\pi R^2 = 8\\pi R^2$. Total cross-sectional area: $A = A_1 + A_2 = 9\\pi R^2$. For parallel conduction: $K_{\\text{eff}} A = K_1 A_1 + K_2 A_2 \\implies K_{\\text{eff}}(9\\pi R^2) = K_1(\\pi R^2) + K_2(8\\pi R^2) \\implies K_{\\text{eff}} = \\frac{K_1 + 8K_2}{9}$."
  },
  {
    question_text: "The time taken by ice on the surface of a pond to grow from zero initial thickness to a thickness of 2.5 cm is 25 hrs. The time taken to grow from 1.5 cm to 2 cm is",
    options: ["9 hrs", "6 hrs", "5 hrs", "7 hrs"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "The time taken for ice layer to grow from thickness $x_1$ to $x_2$ is proportional to $(x_2^2 - x_1^2)$: $t = k(x_2^2 - x_1^2)$. For growth from 0 to 2.5 cm: $25 = k(2.5^2 - 0) = 6.25k \\implies k = 4\\text{ hrs/cm}^2$. For growth from 1.5 cm to 2 cm: $t = 4(2^2 - 1.5^2) = 4(4 - 2.25) = 4(1.75) = 7\\text{ hrs}$."
  },
  {
    question_text: "A body cools in 5 min from $80^\\circ\\text{C}$ to $60^\\circ\\text{C}$. Its temperature after the next 5 mins is (Given temperature of surroundings is $10^\\circ\\text{C}$)",
    options: ["$45.7^\\circ\\text{C}$", "$50.4^\\circ\\text{C}$", "$42.8^\\circ\\text{C}$", "$40^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average cooling law: $\\frac{80 - 60}{5} = K\\left(\\frac{80 + 60}{2} - 10\\right) \\implies 4 = K(60) \\implies K = \\frac{1}{15}\\text{ min}^{-1}$. In the next 5 min to temperature $T$: $\\frac{60 - T}{5} = \\frac{1}{15}\\left(\\frac{60 + T}{2} - 10\\right) \\implies 3(60 - T) = 20 + 0.5T \\implies 180 - 3T = 20 + 0.5T \\implies 3.5T = 160 \\implies T = \\frac{160}{3.5} = \\frac{320}{7} \\approx 45.7^\\circ\\text{C}$."
  },
  {
    question_text: "Two bodies A and B of same mass, area and surface finish, with specific heat capacities $S_A$ and $S_B$ ($S_A > S_B$) are allowed to cool beginning from same initial temperature in same surroundings. Temperature ($\\theta$) varies with time (t) as",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "The rate of cooling is $-\\frac{d\\theta}{dt} = \\frac{eA\\sigma(\\theta^4 - \\theta_0^4)}{mS} \\propto \\frac{1}{S}$. Since $S_A > S_B$, body B has a higher rate of cooling than body A and therefore cools faster. The temperature-time curve for body B falls below that for body A, as shown in graph (1).",
    image_url: diagrams.q20
  },
  {
    question_text: "The power emitted per unit area of a black body is $R\\text{ W/m}^2$. The wavelength at which the power radiated by black body will be maximum is (Stefan's constant is a and Wien's constant is b)",
    options: ["$\\left(\\frac{ba}{R}\\right)^{1/4}$", "$\\left(\\frac{b}{aR}\\right)^{1/4}$", "$\\left(\\frac{bR^4}{a}\\right)^{1/4}$", "$b\\left(\\frac{a}{R}\\right)^{1/4}$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law: $R = a T^4 \\implies T = \\left(\\frac{R}{a}\\right)^{1/4}$. By Wien's displacement law: $\\lambda_m T = b \\implies \\lambda_m = \\frac{b}{T} = \\frac{b}{(R/a)^{1/4}} = b\\left(\\frac{a}{R}\\right)^{1/4}$."
  },
  {
    question_text: "Two liquids $L_1$ and $L_2$ are at $20^\\circ\\text{C}$ and $40^\\circ\\text{C}$ respectively. When equal masses of them are mixed together, the temperature of mixture becomes $35^\\circ\\text{C}$. The ratio of specific heat capacities of $L_1$ and $L_2$ is",
    options: ["1 : 1", "3 : 1", "1 : 3", "2 : 3"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat gained by liquid $L_1$ = Heat lost by liquid $L_2 \\implies m s_1 (35 - 20) = m s_2 (40 - 35) \\implies 15 s_1 = 5 s_2 \\implies \\frac{s_1}{s_2} = \\frac{5}{15} = \\frac{1}{3} = 1 : 3$."
  },
  {
    question_text: "If the time taken by ice to increase the thickness from 0 to $x$ is $t$, then the time taken to increase the thickness from $x$ to $2x$ is",
    options: ["$2t$", "$4t$", "$3t$", "$6t$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Time taken for ice formation on a pond is proportional to $(x_2^2 - x_1^2)$. For thickness 0 to $x$: $t = k(x^2 - 0) = kx^2$. For thickness $x$ to $2x$: $t' = k((2x)^2 - x^2) = k(4x^2 - x^2) = 3kx^2 = 3t$."
  },
  {
    question_text: "Two metallic rods of equal length and cross-section but thermal conductivity $k_1$ and $k_2$ are welded as shown. The equivalent thermal conductivity of this resulting rod will be",
    options: ["$\\frac{k_1 k_2}{k_1 + k_2}$", "$k_1 + k_2$", "$\\frac{2k_1 k_2}{k_1 + k_2}$", "$\\frac{k_1 + k_2}{2}$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "The two rods are connected in series end-to-end. Total resistance: $R = R_1 + R_2 \\implies \\frac{2L}{K_{\\text{eq}}A} = \\frac{L}{k_1 A} + \\frac{L}{k_2 A} \\implies \\frac{2}{K_{\\text{eq}}} = \\frac{k_1 + k_2}{k_1 k_2} \\implies K_{\\text{eq}} = \\frac{2k_1 k_2}{k_1 + k_2}$.",
    image_url: diagrams.q24
  },
  {
    question_text: "If the temperature of sun is decreased by $x\\%$, then the value of solar constant will change by",
    options: ["$4x\\%$", "$-4x\\%$", "$2x\\%$", "$-2x\\%$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "The solar constant is proportional to the total power radiated by the sun: $S \\propto T^4$. Differentiating: $\\frac{\\Delta S}{S} = 4 \\frac{\\Delta T}{T}$. Since temperature is decreased by $x\\%$, $\\frac{\\Delta T}{T} = -x\\% \\implies \\frac{\\Delta S}{S} = -4x\\%$."
  },
  {
    question_text: "A black body which is at a high temperature $T\\text{ K}$ emits thermal radiation at a rate of $E\\text{ W/m}^2$. If the temperature falls to $\\frac{T}{4}\\text{ K}$, then thermal radiation emitted in $\\text{W/m}^2$ will be",
    options: ["$E$", "$\\frac{E}{4}$", "$\\frac{E}{64}$", "$\\frac{E}{256}$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Stefan-Boltzmann law: $E = \\sigma T^4$. When temperature becomes $T' = T/4$: $E' = \\sigma (T/4)^4 = \\frac{\\sigma T^4}{256} = \\frac{E}{256}$."
  },
  {
    question_text: "The coefficient of volume expansion of glycerine is $49 \\times 10^{-5}\\text{ K}^{-1}$. The fractional change in density on $30^\\circ\\text{C}$ rise in temperature is",
    options: ["$-1.47 \\times 10^{-2}$", "$-1.47 \\times 10^{-3}$", "$-1.47 \\times 10^{-1}$", "$-1.47 \\times 10^{-4}$"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Density variation with temperature is $\\rho = \\frac{\\rho_0}{1 + \\gamma \\Delta T} \\approx \\rho_0(1 - \\gamma \\Delta T)$. The fractional change in density is $\\frac{\\Delta \\rho}{\\rho} = -\\gamma \\Delta T = -(49 \\times 10^{-5}\\text{ K}^{-1})(30\\text{ K}) = -1470 \\times 10^{-5} = -1.47 \\times 10^{-2}$."
  },
  {
    question_text: "The temperature of iron piece is increased from $30^\\circ\\text{C}$ to $90^\\circ\\text{C}$. Calculate the change in temperature expressed on Fahrenheit scale",
    options: ["$60^\\circ\\text{F}$", "$78^\\circ\\text{F}$", "$108^\\circ\\text{F}$", "$98^\\circ\\text{F}$"],
    correct_index: 2,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "The relation between change in temperature on Fahrenheit scale and Celsius scale is $\\Delta F = \\frac{9}{5}\\Delta C$. Here $\\Delta C = 90 - 30 = 60^\\circ\\text{C}$. Thus $\\Delta F = \\frac{9}{5} \\times 60 = 108^\\circ\\text{F}$."
  },
  {
    question_text: "Three rods made of same material and having the same cross section have been joined as shown in figure. Each rod has same length. The left and right ends are kept at $0^\\circ\\text{C}$ and $90^\\circ\\text{C}$ respectively. The temperature of the junction of three rods is",
    options: ["$45^\\circ\\text{C}$", "$60^\\circ\\text{C}$", "$30^\\circ\\text{C}$", "$20^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Each rod has equal thermal resistance $R$. Heat current from the two $90^\\circ\\text{C}$ ends flows into the junction and leaves through the $0^\\circ\\text{C}$ end: $2 \\times \\frac{90 - \\theta}{R} = \\frac{\\theta - 0}{R} \\implies 180 - 2\\theta = \\theta \\implies 3\\theta = 180 \\implies \\theta = 60^\\circ\\text{C}$.",
    image_url: diagrams.q29
  },
  {
    question_text: "Two rods of length $\\ell_1$ and $\\ell_2$ are made of material having coefficient of linear expansion $\\alpha_1$ and $\\alpha_2$ respectively. If the difference in length of two rods does not depend upon temperature variation, then $\\left(\\frac{\\ell_1}{\\ell_2}\\right)^2$ is equal to",
    options: ["$\\frac{\\alpha_2}{\\alpha_1}$", "$\\frac{\\alpha_2^2}{\\alpha_1}$", "$\\alpha_1^2 \\alpha_2^2$", "$\\left(\\frac{\\alpha_2}{\\alpha_1}\\right)^2$"],
    correct_index: 3,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "For the difference in length $\\ell_1 - \\ell_2$ to be independent of temperature, the expansion in both rods must be equal: $\\Delta \\ell_1 = \\Delta \\ell_2 \\implies \\ell_1 \\alpha_1 \\Delta T = \\ell_2 \\alpha_2 \\Delta T \\implies \\frac{\\ell_1}{\\ell_2} = \\frac{\\alpha_2}{\\alpha_1}$. Squaring both sides: $\\left(\\frac{\\ell_1}{\\ell_2}\\right)^2 = \\left(\\frac{\\alpha_2}{\\alpha_1}\\right)^2$."
  },

  // --- PAGE 3: Q31 - Q48 ---
  {
    question_text: "In an experiment of specific heat of a metal, a 0.20 kg block of metal at $150^\\circ\\text{C}$ is dropped in a copper calorimeter (of water equivalent 0.025 kg) containing 150 cc of water at $27^\\circ\\text{C}$. The final temperature is $40^\\circ\\text{C}$. The value of specific heat of metal is",
    options: ["$0.01\\text{ cal/gm}^\\circ\\text{C}$", "$0.1\\text{ cal/gm}^\\circ\\text{C}$", "$0.2\\text{ cal/gm}^\\circ\\text{C}$", "$0.4\\text{ cal/gm}^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Mass of metal block $m = 200\\text{ g}$, temperature drop $\\Delta T_m = 150 - 40 = 110^\\circ\\text{C}$. Total effective water mass: $m_{\\text{water}} + W_{\\text{cal}} = 150 + 25 = 175\\text{ g}$. Temperature rise $\\Delta T_w = 40 - 27 = 13^\\circ\\text{C}$. Heat lost = Heat gained $\\implies 200 \\times s \\times 110 = 175 \\times 1 \\times 13 \\implies 22000 s = 2275 \\implies s \\approx 0.103\\text{ cal/gm}^\\circ\\text{C} \\approx 0.1\\text{ cal/gm}^\\circ\\text{C}$."
  },
  {
    question_text: "A black body at $1500^\\circ\\text{C}$ emits radiations with maximum intensity at a wavelength of $5000\\text{ \\AA}$. If the temperature of body is increased by $1000^\\circ\\text{C}$, the maximum intensity will be observed nearly at",
    options: ["$4700\\text{ \\AA}$", "$5000\\text{ \\AA}$", "$6000\\text{ \\AA}$", "$3000\\text{ \\AA}$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Initial absolute temperature $T_1 = 1500 + 273 = 1773\\text{ K} \\approx 1770\\text{ K}$. New temperature $T_2 = 2500 + 273 = 2773\\text{ K} \\approx 2770\\text{ K}$. By Wien's displacement law: $\\lambda_2 = \\lambda_1 \\frac{T_1}{T_2} \\approx 5000 \\times \\frac{1773}{2773} \\approx 3196\\text{ \\AA} \\approx 3000\\text{ \\AA}$."
  },
  {
    question_text: "Two bodies A and B of equal masses, area and emissivity cooling down from same temperature are represented by graph. If T is the instantaneous temperature and $T_0$ be temperature of surroundings, then relationship between their specific heats is",
    options: ["$S_A = S_B$", "$S_A > S_B$", "$S_A < S_B$", "$S_A \\ge S_B$"],
    correct_index: 2,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's cooling law, $\\ln(T - T_0) = \\ln(T_i - T_0) - K t$, where slope magnitude is $K = \\frac{4eA\\sigma T_0^3}{m S} \\propto \\frac{1}{S}$. From the graph, line A has a greater negative slope magnitude than line B ($K_A > K_B$), which implies $\\frac{1}{S_A} > \\frac{1}{S_B} \\implies S_A < S_B$.",
    image_url: diagrams.q33
  },
  {
    question_text: "The rate of cooling of solid sphere of radius $r$ and density $\\rho$ will depend upon its radius as",
    options: ["$r^2$", "$r^{-1}$", "$r^0$", "$r^1$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Rate of cooling is $-\\frac{dT}{dt} = \\frac{e A \\sigma (T^4 - T_0^4)}{m s}$. Since $A = 4\\pi r^2$ and $m = \\frac{4}{3}\\pi r^3 \\rho$, the rate of cooling satisfies $-\\frac{dT}{dt} \\propto \\frac{A}{m} \\propto \\frac{r^2}{r^3} = \\frac{1}{r} = r^{-1}$."
  },
  {
    question_text: "The pressures of the gas filled in the bulb of a constant volume gas thermometer are 48 cm and 68 cm of mercury column at $0^\\circ\\text{C}$ and $100^\\circ\\text{C}$ respectively. When the bulb is immersed in a liquid placed in a vessel, its pressure is 50 cm of Hg column. The temperature of the liquid is",
    options: ["$10^\\circ\\text{C}$", "$15^\\circ\\text{C}$", "$20^\\circ\\text{C}$", "$25^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "For a constant volume gas thermometer: $T = \\frac{P_t - P_0}{P_{100} - P_0} \\times 100^\\circ\\text{C} = \\frac{50 - 48}{68 - 48} \\times 100 = \\frac{2}{20} \\times 100 = 10^\\circ\\text{C}$."
  },
  {
    question_text: "We are heating a liquid of coefficient of cubical expansion $\\gamma$ in a container having co-efficient of linear expansion $\\frac{\\gamma}{2}$. If the container has rectangular cross-section, then the level of liquid in container will",
    options: ["Rise", "Fall", "Remain stationary", "Difficult to say"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "The cubical expansion coefficient of the container is $\\gamma_{\\text{container}} = 3\\alpha = 3\\left(\\frac{\\gamma}{2}\\right) = 1.5\\gamma$. Apparent expansion coefficient of liquid is $\\gamma_{\\text{app}} = \\gamma - \\gamma_{\\text{container}} = \\gamma - 1.5\\gamma = -0.5\\gamma < 0$. Since the container expands more than the liquid, the liquid level falls."
  },
  {
    question_text: "Absolute coefficient of volume expansion of a liquid is 10 times the coefficient of volume expansion of the vessel. Ratio of absolute and apparent expansion of the liquid is",
    options: ["10 : 9", "1 : 9", "10 : 3", "3 : 10"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Given $\\gamma_{\\text{real}} = 10 \\gamma_{\\text{vessel}}$. The apparent coefficient of volume expansion is $\\gamma_{\\text{app}} = \\gamma_{\\text{real}} - \\gamma_{\\text{vessel}} = 10\\gamma_{\\text{vessel}} - \\gamma_{\\text{vessel}} = 9\\gamma_{\\text{vessel}}$. Thus the ratio of absolute to apparent expansion is $\\frac{\\gamma_{\\text{real}}}{\\gamma_{\\text{app}}} = \\frac{10}{9} = 10 : 9$."
  },
  {
    question_text: "5 g of water at $30^\\circ\\text{C}$ and 5 g of ice at $-20^\\circ\\text{C}$ are mixed together in a calorimeter. The final temperature of the mixture, assuming water equivalent of calorimeter to be negligible is (Specific heats of ice and water are $0.5\\text{ cal/g}^\\circ\\text{C}$ and $1\\text{ cal/g}^\\circ\\text{C}$, Latent heat of fusion of ice = $80\\text{ cal/g}$)",
    options: ["$-30^\\circ\\text{C}$", "$5^\\circ\\text{C}$", "$0^\\circ\\text{C}$", "$-20^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat required to raise 5 g ice from $-20^\\circ\\text{C}$ to $0^\\circ\\text{C}$: $Q_1 = 5 \\times 0.5 \\times 20 = 50\\text{ cal}$. Heat released by cooling 5 g water from $30^\\circ\\text{C}$ to $0^\\circ\\text{C}$: $Q_2 = 5 \\times 1 \\times 30 = 150\\text{ cal}$. Remaining heat: $150 - 50 = 100\\text{ cal}$. To melt all 5 g ice requires $5 \\times 80 = 400\\text{ cal}$. Since $100 < 400\\text{ cal}$, only $100/80 = 1.25\\text{ g}$ of ice melts. Both ice and water coexist at equilibrium at $0^\\circ\\text{C}$."
  },
  {
    question_text: "The temperature of the junction shown in figure for three rods, identical in dimensions is",
    options: ["$33.33^\\circ\\text{C}$", "$36.67^\\circ\\text{C}$", "$40^\\circ\\text{C}$", "$30^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Since lengths and areas are identical, heat current from each branch to junction $\\theta$ is proportional to $K_i(T_i - \\theta)$: $K(60 - \\theta) + 3K(40 - \\theta) + 2K(20 - \\theta) = 0 \\implies 60 - \\theta + 120 - 3\\theta + 40 - 2\\theta = 0 \\implies 6\\theta = 220 \\implies \\theta = \\frac{220}{6} = 36.67^\\circ\\text{C}$.",
    image_url: diagrams.q39
  },
  {
    question_text: "Two metallic spheres have radii $\\mu$ and $3\\mu$ and they emit thermal radiation with maximum intensities at wavelengths $\\lambda$ and $2\\lambda$ respectively. The ratio of the radiant powers emitted by them is",
    options: ["16 : 9", "9 : 16", "3 : 4", "4 : 3"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Wien's law: $T \\propto \\frac{1}{\\lambda_m} \\implies \\frac{T_1}{T_2} = \\frac{2\\lambda}{\\lambda} = 2$. Total power emitted: $P = \\sigma (4\\pi r^2) T^4 \\propto r^2 T^4$. Thus $\\frac{P_1}{P_2} = \\left(\\frac{r_1}{r_2}\\right)^2 \\left(\\frac{T_1}{T_2}\\right)^4 = \\left(\\frac{\\mu}{3\\mu}\\right)^2 (2)^4 = \\frac{1}{9} \\times 16 = \\frac{16}{9} = 16 : 9$."
  },
  {
    question_text: "The graph, shown in the temperature (T) - time (t) diagram represents variation of temperature of two bodies X and Y having same surface area and same heat capacity with time t, due to the emission of radiation. The correct relation between the emissivity (e) and absorptive power (a) of the two bodies is",
    options: ["$e_x > e_y\\text{ and }a_x < a_y$", "$e_x < e_y\\text{ and }a_x > a_y$", "$e_x < e_y\\text{ and }a_x < a_y$", "$e_x > e_y\\text{ and }a_x > a_y$"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "From the cooling curve, body Y cools faster than body X: $|dT/dt|_y > |dT/dt|_x$. Since rate of cooling $\\propto e$, it follows that $e_x < e_y$. According to Kirchhoff's law of radiation, good emitters are good absorbers ($e \\propto a$), so $a_x < a_y$ as well. Thus $e_x < e_y$ and $a_x < a_y$.",
    image_url: diagrams.q41
  },
  {
    question_text: "A black body has wavelength $\\lambda_m$ corresponding to maximum intensity at 2000 K. Its wavelength corresponding to maximum intensity at 3000 K will be",
    options: ["$\\frac{3}{2}\\lambda_m$", "$\\frac{2}{3}\\lambda_m$", "$\\frac{16}{81}\\lambda_m$", "$\\frac{81}{16}\\lambda_m$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law, $\\lambda_m T = \\lambda_m' T' \\implies \\lambda_m(2000) = \\lambda_m'(3000) \\implies \\lambda_m' = \\frac{2}{3}\\lambda_m$."
  },
  {
    question_text: "The steam point and the ice point of a mercury thermometer are marked as $80^\\circ$ and $20^\\circ$ in a certain scale. The temperature in centigrade when this thermometer reads $32^\\circ$ is",
    options: ["$32^\\circ\\text{C}$", "$20^\\circ\\text{C}$", "$40^\\circ\\text{C}$", "None of these"],
    correct_index: 1,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "Using standard linear scaling: $\\frac{C - 0}{100 - 0} = \\frac{\\theta - \\text{FP}}{\\text{BP} - \\text{FP}} = \\frac{32 - 20}{80 - 20} = \\frac{12}{60} = \\frac{1}{5} \\implies C = \\frac{100}{5} = 20^\\circ\\text{C}$."
  },
  {
    question_text: "A cylindrical metal rod of length $L_0$ and thickness d, is shaped into a ring with a small gap x as shown. On heating the system",
    options: ["x decreases, r and d increases", "x and r increases, d decreases", "x, r and d all increases", "Data insufficient"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Thermal expansion acts like a photographic enlargement: every linear dimension of the object expands in the same proportion. Hence the gap $x$, inner and outer radius $r$, and the thickness $d$ all increase upon heating.",
    image_url: diagrams.q44
  },
  {
    question_text: "1 kg of ice at $0^\\circ\\text{C}$, 1 kg water at $100^\\circ\\text{C}$ and 1 kg steam at $100^\\circ\\text{C}$ are mixed in an insulated closed container. After equilibrium is established, the amount of ice, water and steam are $m_i, m_w$ and $m_s$ kg respectively. Which of the following options is correct? (Given: $L_i = 80\\text{ cal/gm}$, $L_v = 540\\text{ cal/gm}$)",
    options: [
      "$m_i = \\frac{1}{3}\\text{ kg}; m_w = 1\\text{ kg}; m_s = \\frac{5}{3}\\text{ kg}$",
      "$m_i = 0.5\\text{ kg}; m_w = 2\\text{ kg}; m_s = 0.5\\text{ kg}$",
      "$m_i = 0\\text{ kg}; m_w = \\frac{7}{3}\\text{ kg}; m_s = \\frac{2}{3}\\text{ kg}$",
      "$m_i = \\frac{7}{3}\\text{ kg}; m_w = 0\\text{ kg}; m_s = \\frac{2}{3}\\text{ kg}$"
    ],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "hard",
    marks: 4,
    solution: "Heat required to convert 1 kg ice at $0^\\circ\\text{C}$ to water at $100^\\circ\\text{C}$: $Q = 1000 \\times 80 + 1000 \\times 1 \\times 100 = 80000 + 100000 = 180000\\text{ cal}$. Heat available from condensation of 1 kg steam: $1000 \\times 540 = 540000\\text{ cal}$. Since $540000 > 180000\\text{ cal}$, all the ice melts and reaches $100^\\circ\\text{C}$, with the final temperature remaining at $100^\\circ\\text{C}$. Steam condensed: $m_{\\text{cond}} = \\frac{180000}{540} = \\frac{1000}{3}\\text{ g} = \\frac{1}{3}\\text{ kg}$. Remaining steam: $m_s = 1 - \\frac{1}{3} = \\frac{2}{3}\\text{ kg}$. Total water: $m_w = 1\\text{ (melted ice)} + 1\\text{ (initial water)} + \\frac{1}{3}\\text{ (condensed steam)} = \\frac{7}{3}\\text{ kg}$. Ice remaining: $m_i = 0\\text{ kg}$."
  },
  {
    question_text: "Figure shows a composite rod containing two parts. The thermal conductivities and the geometric dimensions are marked. If the ends are maintained at temperatures $T_1$ and $T_2$ respectively, the temperature of the interface is",
    options: ["$\\frac{T_1 + T_2}{2}$", "$\\frac{8T_1 + T_2}{9}$", "$\\frac{4T_1 + T_2}{5}$", "$\\frac{T_1 + 16T_2}{17}$"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Thermal resistances of the two parts: $R_1 = \\frac{2L}{(K/4)A} = \\frac{8L}{KA}$ and $R_2 = \\frac{L}{(2K)A} = \\frac{L}{2KA} = \\frac{0.5L}{KA}$. The ratio of resistances is $\\frac{R_1}{R_2} = \\frac{8}{0.5} = 16$. Heat current is continuous across interface: $\\frac{T_1 - T}{R_1} = \\frac{T - T_2}{R_2} \\implies T_1 - T = 16(T - T_2) \\implies 17T = T_1 + 16T_2 \\implies T = \\frac{T_1 + 16T_2}{17}$.",
    image_url: diagrams.q46
  },
  {
    question_text: "A black body at a temperature of $227^\\circ\\text{C}$ radiates heat at a rate of $20\\text{ cal/m}^2\\text{s}$. When its temperature is raised to $727^\\circ\\text{C}$, the heat radiated by it in $\\text{cal/m}^2\\text{s}$ will be closest to",
    options: ["40", "160", "320", "640"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Absolute temperatures are $T_1 = 227 + 273 = 500\\text{ K}$ and $T_2 = 727 + 273 = 1000\\text{ K}$. By Stefan's law: $\\frac{E_2}{E_1} = \\left(\\frac{T_2}{T_1}\\right)^4 = \\left(\\frac{1000}{500}\\right)^4 = 2^4 = 16$. Thus $E_2 = 16 \\times 20 = 320\\text{ cal/m}^2\\text{s}$."
  },
  {
    question_text: "A body is cooling under Newton's law of cooling from initial temperature $T_i$. If T is the instantaneous temperature and $T_0$ is the temperature of surroundings, then variation of $\\ln(T - T_0)$ with time t can be represented as",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "By Newton's law of cooling: $\\frac{dT}{dt} = -k(T - T_0) \\implies \\ln(T - T_0) = \\ln(T_i - T_0) - kt$. This is the equation of a straight line $y = c - mx$ with negative slope $-k$ and positive intercept $\\ln(T_i - T_0)$, represented by graph (1).",
    image_url: diagrams.q48
  },

  // --- PAGE 4: Q49 - Q63 ---
  {
    question_text: "The temperature of a body falls from $40^\\circ\\text{C}$ to $36^\\circ\\text{C}$ in 5 minutes when placed in a surroundings of constant temperature $16^\\circ\\text{C}$. The approximate time taken for the temperature of the body to become $32^\\circ\\text{C}$ from $36^\\circ\\text{C}$ is",
    options: ["3 min", "6 min", "9 min", "12 min"],
    correct_index: 1,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average law of cooling: $\\frac{40 - 36}{5} = K\\left(\\frac{40 + 36}{2} - 16\\right) \\implies \\frac{4}{5} = 22K \\implies K = \\frac{2}{55}\\text{ min}^{-1}$. For cooling from $36^\\circ\\text{C}$ to $32^\\circ\\text{C}$: $\\frac{36 - 32}{t} = \\frac{2}{55}\\left(\\frac{36 + 32}{2} - 16\\right) = \\frac{2}{55}(18) = \\frac{36}{55} \\implies t = \\frac{4 \\times 55}{36} = \\frac{55}{9} \\approx 6.1\\text{ min} \\approx 6\\text{ min}$."
  },
  {
    question_text: "The spectral emissive power of an object at temperature $T_0$ is plotted against wavelength $\\lambda$ as shown. The area enclosed within the graph is A. Now the temperature is increased such that the maximum spectral emissive power is at $(\\lambda_0 / 3)$, then at this new temperature the area enclosed within the graph becomes",
    options: ["A", "3A", "81A", "27A"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Wien's displacement law, $\\lambda_m T = \\text{const}$. If $\\lambda_m' = \\lambda_0 / 3$, the new temperature is $T' = 3T_0$. The total area enclosed under the $E_\\lambda$ vs $\\lambda$ curve represents total radiant power $E = \\sigma T^4$. Thus $A' = A \\left(\\frac{T'}{T_0}\\right)^4 = A (3)^4 = 81A$.",
    image_url: diagrams.q50
  },
  {
    question_text: "In a faulty thermometer, the freezing point of water is marked as $-20^\\circ\\text{X}$ and boiling point of water is marked as $160^\\circ\\text{X}$. The temperature corresponding to $40^\\circ\\text{C}$ on the scale is",
    options: ["$52^\\circ\\text{X}$", "$60^\\circ\\text{X}$", "$40^\\circ\\text{X}$", "$76^\\circ\\text{X}$"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "Using the formula: $\\frac{X - \\text{FP}}{\\text{BP} - \\text{FP}} = \\frac{C}{100} \\implies \\frac{X - (-20)}{160 - (-20)} = \\frac{40}{100} \\implies \\frac{X + 20}{180} = 0.4 \\implies X + 20 = 72 \\implies X = 52^\\circ\\text{X}$."
  },
  {
    question_text: "50 g of ice at $0^\\circ\\text{C}$ is mixed with 5 g steam at $100^\\circ\\text{C}$. Find the final temperature and composition of the mixture.",
    options: [
      "40 g water and 15 g ice at $0^\\circ\\text{C}$",
      "45 g water and 10 g ice at $0^\\circ\\text{C}$",
      "15 g water and 40 g ice at $0^\\circ\\text{C}$",
      "10 g water and 45 g ice at $0^\\circ\\text{C}$"
    ],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat released if 5 g steam condenses and cools to $0^\\circ\\text{C}$: $Q_{\\text{released}} = 5 \\times 540 + 5 \\times 1 \\times 100 = 2700 + 500 = 3200\\text{ cal}$. Heat needed to melt all 50 g ice: $50 \\times 80 = 4000\\text{ cal}$. Since $3200 < 4000\\text{ cal}$, all steam condenses and cools to $0^\\circ\\text{C}$, but only part of ice melts. Mass of ice melted: $m_{\\text{melted}} = \\frac{3200}{80} = 40\\text{ g}$. Ice remaining: $50 - 40 = 10\\text{ g}$. Total water: $40\\text{ g (melted)} + 5\\text{ g (condensed steam)} = 45\\text{ g}$ at $0^\\circ\\text{C}$."
  },
  {
    question_text: "Three rods identical in dimensions, but with different thermal conductivities, as marked, are connected as shown in figure. Find the temperature of the junction.",
    options: ["$40^\\circ\\text{C}$", "$43.33^\\circ\\text{C}$", "$46.67^\\circ\\text{C}$", "$50^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "The branches have conductivities $K$ at $100^\\circ\\text{C}$, $2K$ at $60^\\circ\\text{C}$, and $3K$ at $20^\\circ\\text{C}$. Kirchhoff's law of heat current at junction $\\theta$: $K(100 - \\theta) + 2K(60 - \\theta) + 3K(20 - \\theta) = 0 \\implies 100 - \\theta + 120 - 2\\theta + 60 - 3\\theta = 0 \\implies 6\\theta = 280 \\implies \\theta = \\frac{280}{6} = 46.67^\\circ\\text{C}$.",
    image_url: diagrams.q53
  },
  {
    question_text: "A body cools from $80^\\circ\\text{C}$ to $70^\\circ\\text{C}$ in 5 mins. What will be its temperature in the next 5 mins? (Temperature of surroundings is $10^\\circ\\text{C}$)",
    options: ["$60^\\circ\\text{C}$", "$63.32^\\circ\\text{C}$", "$61.43^\\circ\\text{C}$", "$65^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average law of cooling: $\\frac{80 - 70}{5} = K\\left(\\frac{80 + 70}{2} - 10\\right) \\implies 2 = K(65) \\implies K = \\frac{2}{65}\\text{ min}^{-1}$. In the next 5 min to temperature $T$: $\\frac{70 - T}{5} = \\frac{2}{65}\\left(\\frac{70 + T}{2} - 10\\right) \\implies 70 - T = \\frac{2}{13}\\left(25 + \\frac{T}{2}\\right) = \\frac{50 + T}{13} \\implies 910 - 13T = 50 + T \\implies 14T = 860 \\implies T = \\frac{430}{7} \\approx 61.43^\\circ\\text{C}$."
  },
  {
    question_text: "The spectral emissive power against wavelength graph of a black-body emitting radiations is shown in the figure, at two different temperatures $T_1 = 27^\\circ\\text{C}$ and $T_2 = 327^\\circ\\text{C}$. If the total power emitted at temperature $T_1$ is P, then the area of the shaded portion is",
    options: ["15P", "8P", "16P", "7P"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Absolute temperatures: $T_1 = 27 + 273 = 300\\text{ K}$ and $T_2 = 327 + 273 = 600\\text{ K}$. Total emitted power is proportional to $T^4$: $P_2 = P_1 \\left(\\frac{T_2}{T_1}\\right)^4 = P \\left(\\frac{600}{300}\\right)^4 = 16P$. The area of the shaded portion is the area between the two curves: $P_2 - P_1 = 16P - P = 15P$.",
    image_url: diagrams.q55
  },
  {
    question_text: "A composite slab consists of two different materials having equal cross-sectional area but lengths in the ratio 2:1 and thermal conductivity K and 3K respectively as shown in figure. The equivalent thermal conductivity of slab is:",
    options: ["$\\frac{9K}{7}$", "$\\frac{3K}{2}$", "$\\frac{3K}{4}$", "$\\frac{3K}{8}$"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Lengths are $L_1 = 2L$ and $L_2 = L$. Resistances in series: $R = R_1 + R_2 = \\frac{2L}{KA} + \\frac{L}{3KA} = \\frac{7L}{3KA}$. Total length is $2L + L = 3L$. Thus $\\frac{3L}{K_{\\text{eq}}A} = \\frac{7L}{3KA} \\implies K_{\\text{eq}} = \\frac{9K}{7}$.",
    image_url: diagrams.q56
  },
  {
    question_text: "Figure shows a composite wall made of two walls A and B each of equal area and thickness. Ratio of thermal conductivity of A and B is 3 : 2. Temperature of the common face is",
    options: ["$30^\\circ\\text{C}$", "$32^\\circ\\text{C}$", "$35^\\circ\\text{C}$", "$37.5^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Let conductivities be $3K$ and $2K$, and common face temperature be $\\theta$. Steady state heat current through both layers is equal: $\\frac{3KA(40 - \\theta)}{d} = \\frac{2KA(\\theta - 20)}{d} \\implies 3(40 - \\theta) = 2(\\theta - 20) \\implies 120 - 3\\theta = 2\\theta - 40 \\implies 5\\theta = 160 \\implies \\theta = 32^\\circ\\text{C}$.",
    image_url: diagrams.q57
  },
  {
    question_text: "The amount of heat required to convert 5 gm of ice at $-10^\\circ\\text{C}$ to water at $20^\\circ\\text{C}$ is ($S_{\\text{ice}} = 0.5\\text{ cal/g}^\\circ\\text{C}$, $L_{\\text{fusion}} = 80\\text{ cal/g}$)",
    options: ["500 cal", "525 J", "525 cal", "425 cal"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Total heat $Q = Q_1 + Q_2 + Q_3$: (1) Heating ice from $-10^\\circ\\text{C}$ to $0^\\circ\\text{C}$: $5 \\times 0.5 \\times 10 = 25\\text{ cal}$. (2) Melting ice at $0^\\circ\\text{C}$: $5 \\times 80 = 400\\text{ cal}$. (3) Heating water from $0^\\circ\\text{C}$ to $20^\\circ\\text{C}$: $5 \\times 1 \\times 20 = 100\\text{ cal}$. Total heat = $25 + 400 + 100 = 525\\text{ cal}$."
  },
  {
    question_text: "A cylindrical measuring jar contains mercury as shown. The coefficient of volume expansion of mercury is $\\gamma$ and that of the jar material (glass) is $\\gamma'$. When the temperature of the system is changed, the reading remains unchanged. Correct relation is:",
    options: ["$\\gamma' = \\gamma$", "$\\gamma' < \\gamma$", "$\\gamma' > \\gamma$", "Any of the above depending on the value of the reading"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "Let the reading correspond to liquid height $y$ and volume $V = A y$. On temperature change $\\Delta T$, volume of mercury becomes $V' = V(1 + \\gamma \\Delta T)$. Cross-sectional area of jar expands by $A' = A(1 + 2\\alpha' \\Delta T) = A(1 + \\frac{2}{3}\\gamma' \\Delta T)$. Height of mercury becomes $y' = \\frac{V'}{A'} \\approx y[1 + (\\gamma - \\frac{2}{3}\\gamma')\\Delta T]$. The graduation mark $y$ itself expands as $y_0(1 + \\alpha' \\Delta T) = y_0(1 + \\frac{1}{3}\\gamma' \\Delta T)$. For the reading to stay identical: $\\gamma - \\frac{2}{3}\\gamma' = \\frac{1}{3}\\gamma' \\implies \\gamma' = \\gamma$.",
    image_url: diagrams.q59
  },
  {
    question_text: "Two metal spheres having equal heat capacity and equal radius are heated to same temperature and are kept in identical surroundings. If their emissivities are in the ratio 2 : 1, then their instantaneous rate of cooling is in ratio",
    options: ["1 : 1", "1 : 2", "2 : 1", "4 : 1"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Rate of cooling is $-\\frac{dT}{dt} = \\frac{e A \\sigma (T^4 - T_0^4)}{C}$. Since heat capacity $C$, surface area $A$, and temperature difference are identical: $\\frac{(-dT/dt)_1}{(-dT/dt)_2} = \\frac{e_1}{e_2} = \\frac{2}{1} = 2 : 1$."
  },
  {
    question_text: "If temperature of a black body increases from $-73^\\circ\\text{C}$ to $327^\\circ\\text{C}$, then ratio of emissive power at these two temperatures is",
    options: ["27 : 1", "81 : 1", "1 : 27", "1 : 81"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Absolute temperatures: $T_1 = -73 + 273 = 200\\text{ K}$ and $T_2 = 327 + 273 = 600\\text{ K}$. By Stefan's law: $\\frac{E_1}{E_2} = \\left(\\frac{T_1}{T_2}\\right)^4 = \\left(\\frac{200}{600}\\right)^4 = \\left(\\frac{1}{3}\\right)^4 = \\frac{1}{81} = 1 : 81$."
  },
  {
    question_text: "The spectrum of a black body at $7^\\circ\\text{C}$ is as shown in the figure. The area under the curve is A. The corresponding area at $-133^\\circ\\text{C}$ will be",
    options: ["$\\frac{A}{2}$", "$\\frac{A}{4}$", "$\\frac{A}{16}$", "$2A$"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Absolute temperatures: $T_1 = 7 + 273 = 280\\text{ K}$ and $T_2 = -133 + 273 = 140\\text{ K} = T_1/2$. The area under the spectral intensity curve equals total radiant energy $\\propto T^4$. Thus $A_2 = A_1 \\left(\\frac{T_2}{T_1}\\right)^4 = A \\left(\\frac{1}{2}\\right)^4 = \\frac{A}{16}$.",
    image_url: diagrams.q62
  },
  {
    question_text: "A thermal conductor of uniform cross-sectional area A has its thermal conductivity decreasing from end A towards end B, with end A maintained at higher temperature ($T_1$) and end B at lower temperature ($T_2$). If steady state has been achieved, identify the correct option:",
    options: [
      "$\\text{Temperature of mid-point} > \\frac{T_1 + T_2}{2}$",
      "$\\text{Temperature of mid-point} < \\frac{T_1 + T_2}{2}$",
      "Heat current (amount of heat energy flowing per second) is more in the left half",
      "Both (2) and (3)"
    ],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "hard",
    marks: 4,
    solution: "In steady state, heat current $H = -KA\\frac{dT}{dx}$ is constant along the conductor. Since $K$ decreases from A towards B, the magnitude of temperature gradient $|dT/dx| = \\frac{H}{KA}$ must increase towards B. Hence temperature drops slowly in the first half (higher $K$) and drops rapidly in the second half (lower $K$), causing the mid-point temperature to be greater than the arithmetic mean: $T_{\\text{mid}} > \\frac{T_1 + T_2}{2}$.",
    image_url: diagrams.q63
  },

  // --- PAGE 5: Q70 - Q91 ---
  {
    question_text: "If $\\theta$ be the temperature difference between a body and its surroundings cooling according to Newton's law, then choose the correct graph (here t is time).",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 3,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "According to Newton's law of cooling: $\\frac{d\\theta}{dt} = -k\\theta \\implies \\theta = \\theta_0 e^{-kt} \\implies \\ln \\theta = \\ln \\theta_0 - kt$. A plot of $\\ln \\theta$ against time $t$ gives a straight line with negative slope $-k$ and intercept $\\ln \\theta_0$, as correctly shown in option (4).",
    image_url: diagrams.q70
  },
  {
    question_text: "A body of mass m grams has specific heat capacity half of specific heat capacity of water. Then water equivalent of body in grams is",
    options: ["$m$", "$\\frac{m}{2}$", "$2m$", "$\\frac{m}{4}$"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Water equivalent of a body of mass $m$ and specific heat $s$ is $W = m \\times \\frac{s}{s_w}$. Given $s = \\frac{s_w}{2}$, we get $W = m \\times \\frac{1}{2} = \\frac{m}{2}\\text{ grams}$."
  },
  {
    question_text: "Liquid oxygen at 60 K is heated to 300 K at constant pressure of 1 atm. The rate of heating is constant. Which of the following graphs represents the variation of temperature with time?",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Oxygen has boiling point of $\\approx 90\\text{ K}$ at 1 atm. From 60 K to 90 K, liquid oxygen heats up with temperature rising linearly. At 90 K, boiling occurs where temperature remains constant (horizontal plateau) during latent heat absorption. Above 90 K up to 300 K, gaseous oxygen temperature rises linearly again. Graph (3) accurately depicts this behavior.",
    image_url: diagrams.q72
  },
  {
    question_text: "Recently, the phenomenon of superconductivity has been observed at 73 K. This temperature is nearly equal to",
    options: ["$-288^\\circ\\text{F}$", "$-146^\\circ\\text{F}$", "$-328^\\circ\\text{F}$", "$-178^\\circ\\text{F}$"],
    correct_index: 2,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "$C = 73 - 273.15 = -200.15^\\circ\\text{C}$. Converting to Fahrenheit: $F = \\frac{9}{5}(-200.15) + 32 = -360.27 + 32 = -328.27^\\circ\\text{F} \\approx -328^\\circ\\text{F}$."
  },
  {
    question_text: "When the pressure on surface of water is increased, its boiling point will",
    options: ["Decrease", "Increase", "Remain same", "Increase or decrease"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Boiling occurs when the vapor pressure of water equals the external atmospheric pressure. Increasing the external pressure requires a higher temperature for the vapor pressure to equal external pressure, thereby raising the boiling point."
  },
  {
    question_text: "50 g ice at $0^\\circ\\text{C}$ is dropped in a calorimeter of negligible heat capacity containing 50 g water at $100^\\circ\\text{C}$, then final temperature ($T_m$) of the mixture is (neglect the heat loss)",
    options: ["$10^\\circ\\text{C}$", "Below $0^\\circ$", "$20^\\circ\\text{C}$", "Above $20^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat required to melt all ice: $50 \\times 80 = 4000\\text{ cal}$. Heat lost by cooling water to $0^\\circ\\text{C}$: $50 \\times 1 \\times 100 = 5000\\text{ cal}$. Excess heat: $5000 - 4000 = 1000\\text{ cal}$. This excess heat raises the temperature of total $100\\text{ g}$ water: $\\Delta T = \\frac{1000}{100 \\times 1} = 10^\\circ\\text{C}$. Thus final equilibrium temperature is $10^\\circ\\text{C}$."
  },
  {
    question_text: "Pressure of a gas at absolute zero temperature will be (where $P_0$ is 1 atm)",
    options: ["Zero", "$P_0$", "$P_0 \\times 273$", "$P_0 \\times 76$"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "At absolute zero temperature ($0\\text{ K}$), the translational kinetic energy of gas molecules becomes zero, molecular collisions cease, and according to ideal gas equation $P = \\frac{nRT}{V}$, pressure becomes zero."
  },
  {
    question_text: "Three rods of same dimensions have thermal conductivities 3K, 2K and K. They are arranged as shown in figure given below. Temperature of junction is",
    options: ["$60^\\circ\\text{C}$", "$70^\\circ\\text{C}$", "$50^\\circ\\text{C}$", "$35^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Heat current from $100^\\circ\\text{C}$ rod equals heat current flowing out into $50^\\circ\\text{C}$ and $20^\\circ\\text{C}$ rods: $3K(100 - \\theta) = 2K(\\theta - 50) + K(\\theta - 20) \\implies 300 - 3\\theta = 2\\theta - 100 + \\theta - 20 \\implies 300 - 3\\theta = 3\\theta - 120 \\implies 6\\theta = 420 \\implies \\theta = 70^\\circ\\text{C}$.",
    image_url: diagrams.q77
  },
  {
    question_text: "Thermal radiation are",
    options: ["Electromagnetic waves", "Mechanical transverse waves", "Mechanical longitudinal waves", "All of these"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Thermal radiations are electromagnetic waves (mainly in the infrared region) that propagate at the speed of light and do not require any material medium."
  },
  {
    question_text: "40 g water at $60^\\circ\\text{C}$ is mixed with 30 g ice at $0^\\circ\\text{C}$. The final temperature of the mixture is (latent heat of fusion of ice is $80\\text{ cal/g}$ and specific heat of water is $1\\text{ cal/g}^\\circ\\text{C}$)",
    options: ["$0^\\circ\\text{C}$", "$60^\\circ\\text{C}$", "$30^\\circ\\text{C}$", "$50^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat lost by cooling 40 g water from $60^\\circ\\text{C}$ to $0^\\circ\\text{C}$: $Q_{\\text{lost}} = 40 \\times 1 \\times 60 = 2400\\text{ cal}$. Heat required to melt all 30 g ice at $0^\\circ\\text{C}$: $Q_{\\text{needed}} = 30 \\times 80 = 2400\\text{ cal}$. Since heat released exactly equals heat required to melt the ice, the entire mixture ends up as water at $0^\\circ\\text{C}$."
  },
  {
    question_text: "What is the ratio of the temperature $T_1$ and $T_2$ in following graph?",
    options: ["3 : 2", "2 : 1", "4 : 3", "1 : 1"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law: $\\lambda_{m1} T_1 = \\lambda_{m2} T_2$. From the graph, $\\lambda_{m1} = \\lambda_q$ and $\\lambda_{m2} = 1.5\\lambda_q$. Therefore $\\lambda_q T_1 = (1.5\\lambda_q) T_2 \\implies \\frac{T_1}{T_2} = 1.5 = \\frac{3}{2} = 3 : 2$.",
    image_url: diagrams.q80
  },
  {
    question_text: "A room has double layered wall. The thickness of each layer is the same and the ratio of the thermal conductivity of inner layer and outer layer is 1 : 2. If room temperature is $24^\\circ\\text{C}$ and the outside temperature is $0^\\circ\\text{C}$, then temperature at the junction of the two layers is",
    options: ["$8^\\circ\\text{C}$", "$12^\\circ\\text{C}$", "$16^\\circ\\text{C}$", "$18^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Let conductivities be $K_1 = K$ and $K_2 = 2K$. Heat current across junction $\\theta$: $\\frac{KA(24 - \\theta)}{d} = \\frac{2KA(\\theta - 0)}{d} \\implies 24 - \\theta = 2\\theta \\implies 3\\theta = 24 \\implies \\theta = 8^\\circ\\text{C}$."
  },
  {
    question_text: "The temperature of a body falls from $75^\\circ\\text{C}$ to $65^\\circ\\text{C}$ in ten minutes. If the surrounding temperature is $25^\\circ\\text{C}$, the temperature of the body after the next ten minutes will be",
    options: ["$61.5^\\circ\\text{C}$", "$57^\\circ\\text{C}$", "$55^\\circ\\text{C}$", "$51.5^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average law of cooling: $\\frac{75 - 65}{10} = K\\left(\\frac{75 + 65}{2} - 25\\right) \\implies 1 = K(45) \\implies K = \\frac{1}{45}\\text{ min}^{-1}$. For the next 10 minutes to temperature $T$: $\\frac{65 - T}{10} = \\frac{1}{45}\\left(\\frac{65 + T}{2} - 25\\right) \\implies 65 - T = \\frac{2}{9}\\left(\\frac{15 + T}{2}\\right) = \\frac{15 + T}{9} \\implies 9(65 - T) = 15 + T \\implies 585 - 9T = 15 + T \\implies 10T = 570 \\implies T = 57^\\circ\\text{C}$."
  },
  {
    question_text: "Two rods P and Q connected parallel between two heat reservoirs are having equal length, and cross-sections $A_P$ and $A_Q$ respectively. If $k_P$ and $k_Q$ are their thermal conductivities, then the condition for their equal rate of conduction of heat will be",
    options: ["$k_P A_P = k_Q A_Q$", "$\\frac{\\sqrt{k_P}}{A_P} = \\frac{\\sqrt{k_Q}}{A_Q}$", "$k_P A_Q = k_Q A_P$", "$k_P^2 A_P = k_Q^2 A_Q$"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Rate of heat conduction is $H = \\frac{K A \\Delta T}{L}$. Since both rods have equal length $L$ and equal temperature difference $\\Delta T$: $H_P = H_Q \\iff \\frac{k_P A_P \\Delta T}{L} = \\frac{k_Q A_Q \\Delta T}{L} \\iff k_P A_P = k_Q A_Q$."
  },
  {
    question_text: "Three identical rods are joined together as shown in the figure. The temperature of the junction O is",
    options: ["$50^\\circ\\text{C}$", "$70^\\circ\\text{C}$", "$100^\\circ\\text{C}$", "$125^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Thermal resistances of all three rods are equal ($R$). By heat conservation at junction O: $\\frac{130 - T_O}{R} = \\frac{T_O - 0}{R} + \\frac{T_O - 20}{R} \\implies 130 - T_O = 2T_O - 20 \\implies 3T_O = 150 \\implies T_O = 50^\\circ\\text{C}$.",
    image_url: diagrams.q84
  },
  {
    question_text: "The temperature of surface of sun is nearly 6000 K and the amount of total energy emitted by sun per second is $4 \\times 10^{26}\\text{ J}$. If the temperature of surface of sun were 18000 K, then the amount of thermal radiation emitted by same will be",
    options: [
      "$3.24 \\times 10^{28}\\text{ W}$",
      "$2.52 \\times 10^{26}\\text{ W}$",
      "$8 \\times 10^{26}\\text{ W}$",
      "$16 \\times 10^{26}\\text{ W}$"
    ],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law, radiated power is $P \\propto T^4$. Thus $\\frac{P'}{P} = \\left(\\frac{18000}{6000}\\right)^4 = (3)^4 = 81$. Therefore $P' = 81 \\times (4 \\times 10^{26}\\text{ W}) = 324 \\times 10^{26}\\text{ W} = 3.24 \\times 10^{28}\\text{ W}$."
  },
  {
    question_text: "A body cools from $80^\\circ\\text{C}$ to $60^\\circ\\text{C}$ in 5 minutes. The time taken by it to cool from $60^\\circ\\text{C}$ to $50^\\circ\\text{C}$ will be (temperature of surrounding is $40^\\circ\\text{C}$)",
    options: ["5 minute", "6 minute", "8 minute", "10 minute"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's average law of cooling: $\\frac{80 - 60}{5} = K\\left(\\frac{80 + 60}{2} - 40\\right) \\implies 4 = 30K \\implies K = \\frac{2}{15}\\text{ min}^{-1}$. For cooling from $60^\\circ\\text{C}$ to $50^\\circ\\text{C}$: $\\frac{60 - 50}{t} = \\frac{2}{15}\\left(\\frac{60 + 50}{2} - 40\\right) = \\frac{2}{15}(15) = 2 \\implies t = \\frac{10}{2} = 5\\text{ minutes}$."
  },
  {
    question_text: "Four rods of same material with different radii r and length $\\ell$ are used to connect to heat reservoirs at different temperatures. In which of the following cases, heat conduction is fastest?",
    options: [
      "$r = \\frac{1}{3}\\text{ cm}, \\ell = \\frac{1}{9}\\text{ cm}$",
      "$r = 3\\text{ cm}, \\ell = 9\\text{ cm}$",
      "$r = 4\\text{ cm}, \\ell = 8\\text{ cm}$",
      "$r = 1\\text{ cm}, \\ell = 0.1\\text{ cm}$"
    ],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Rate of heat conduction is $H = \\frac{KA\\Delta T}{\\ell} \\propto \\frac{r^2}{\\ell}$. Evaluating $\\frac{r^2}{\\ell}$: (1) $(1/3)^2 / (1/9) = 1$, (2) $3^2 / 9 = 1$, (3) $4^2 / 8 = 2$, (4) $1^2 / 0.1 = 10$. Case (4) has by far the highest value (10), hence heat conduction is fastest."
  },
  {
    question_text: "Water is heated from $0^\\circ\\text{C}$ to $6^\\circ\\text{C}$. Its density",
    options: ["Decreases", "First decreases and then increases", "First increases and then decreases", "Remains constant"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Due to the anomalous expansion of water, heating water from $0^\\circ\\text{C}$ to $4^\\circ\\text{C}$ causes volume to contract and density to increase (reaching maximum density at $4^\\circ\\text{C}$). From $4^\\circ\\text{C}$ to $6^\\circ\\text{C}$, water expands normally and density decreases. Hence density first increases and then decreases."
  },
  {
    question_text: "A thermostat cannot work properly, if the metal strips constituting it have",
    options: ["Same length", "Same mass", "Same temperature", "Same coefficient of thermal expansion"],
    correct_index: 3,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "A bimetallic thermostat functions by bending upon temperature change due to unequal thermal expansion between the two constituent strips. If both strips possess the same coefficient of thermal expansion, no differential expansion or bending occurs, rendering the thermostat inoperable."
  },
  {
    question_text: "An anisotropic material has coefficient of linear expansion $\\alpha_1, \\alpha_2$ and $\\alpha_1$ along x, y and z-axis. The coefficient of cubical expansion is",
    options: [
      "$\\frac{\\alpha_1 + \\alpha_2}{2}$",
      "$\\frac{\\alpha_1\\alpha_2 + \\alpha_1^2}{\\alpha_2}$",
      "$2\\alpha_1 + \\alpha_2$",
      "$2\\alpha_2 + \\alpha_1$"
    ],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "For an anisotropic solid with linear expansion coefficients $\\alpha_x, \\alpha_y, \\alpha_z$ along three perpendicular axes, the volume (cubical) expansion coefficient is $\\gamma = \\alpha_x + \\alpha_y + \\alpha_z = \\alpha_1 + \\alpha_2 + \\alpha_1 = 2\\alpha_1 + \\alpha_2$."
  },
  {
    question_text: "200 g of water at $50^\\circ\\text{C}$ is poured on a block of ice at $0^\\circ\\text{C}$. The amount of ice that melts is",
    options: ["50 g", "75 g", "125 g", "250 g"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat released by cooling 200 g water from $50^\\circ\\text{C}$ to $0^\\circ\\text{C}$: $Q = m_w c_w \\Delta T = 200 \\times 1 \\times 50 = 10000\\text{ cal}$. Heat needed to melt 1 g ice at $0^\\circ\\text{C}$ is $L_f = 80\\text{ cal/g}$. Amount of ice melted: $m = \\frac{Q}{L_f} = \\frac{10000}{80} = 125\\text{ g}$."
  }
];

async function seedThermal() {
  console.log(`=== Seeding ${thermalQuestions.length} Thermal Properties of Matter Questions into Neon DB ===`);

  // Ensure chapter exists in Neon DB
  const chapRes = await pool.query(
    "SELECT id FROM chapters WHERE subject_id = 11 AND LOWER(TRIM(name)) = LOWER(TRIM($1))",
    ['Thermal Properties of Matter']
  );

  let chapterId;
  if (chapRes.rows.length === 0) {
    const insertChap = await pool.query(
      "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
      ['Thermal Properties of Matter', 11]
    );
    chapterId = insertChap.rows[0].id;
    console.log(`Created new chapter 'Thermal Properties of Matter' in Neon DB with ID: ${chapterId}`);
  } else {
    chapterId = chapRes.rows[0].id;
    console.log(`Using existing chapter 'Thermal Properties of Matter' in Neon DB with ID: ${chapterId}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < thermalQuestions.length; i++) {
    const q = thermalQuestions[i];

    const dupRes = await pool.query(`
      SELECT id FROM question_bank
      WHERE category = 'Physics' AND chapter_id = $1 AND LOWER(TRIM(question_text)) = LOWER(TRIM($2))
    `, [chapterId, q.question_text]);

    if (dupRes.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${thermalQuestions.length}] Skipped duplicate: "${q.question_text.slice(0, 35)}..."`);
      continue;
    }

    const insertRes = await pool.query(`
      INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, topic,
        question_type, question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14
      ) RETURNING id
    `, [
      'Physics',
      11,
      chapterId,
      'Thermal Properties of Matter',
      q.topic,
      'single_choice',
      q.question_text,
      JSON.stringify(q.options),
      q.correct_index,
      JSON.stringify([q.correct_index]),
      q.marks,
      q.difficulty,
      q.solution,
      q.image_url || null
    ]);

    inserted++;
    console.log(`[${i + 1}/${thermalQuestions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Thermal Properties Seeding Completed in Neon DB: Inserted ${inserted}, Skipped ${skipped}. Total: ${thermalQuestions.length}`);
  await pool.end();
}

seedThermal().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
