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
  fs.readFileSync(path.resolve(__dirname, 'thermal_diagrams_batch2.json'), 'utf-8')
);

const batch2Questions = [
  // --- PAGE 1: Q100 - Q114 ---
  {
    question_text: "A body floats in a liquid completely immersed. The coefficient of linear expansion of body is $\\alpha$ and coefficient of volume expansion of liquid is $\\gamma$. If on heating the system some part of body comes outside the liquid, then the value of $\\gamma$ may be",
    options: ["$2\\alpha$", "$3\\alpha$", "$4\\alpha$", "All of these"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "For the body to float with some part emerging outside the liquid upon heating, the submerged fraction $f = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{liquid}}}$ must decrease. As temperature rises by $\\Delta T$: $\\rho_{\\text{body}} = \\frac{\\rho_0}{1 + 3\\alpha \\Delta T}$ and $\\rho_{\\text{liquid}} = \\frac{\\rho_{L0}}{1 + \\gamma \\Delta T}$. Thus $f = f_0 \\frac{1 + \\gamma \\Delta T}{1 + 3\\alpha \\Delta T} \\approx f_0 [1 + (\\gamma - 3\\alpha)\\Delta T]$. For $f < f_0$, we need $\\gamma - 3\\alpha < 0 \\implies \\gamma < 3\\alpha$. Among the options, $2\\alpha < 3\\alpha$, so $\\gamma$ may be $2\\alpha$."
  },
  {
    question_text: "Thermal conductivity of a material depend on",
    options: ["Temperature", "Amount of substance", "State of material", "Area of cross-section"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Thermal conductivity $K$ is an intensive intrinsic property of a substance. It depends on the nature/chemical composition of the material and its temperature. It does not depend on the dimensions (length or cross-sectional area) or the amount (mass) of the substance."
  },
  {
    question_text: "Net rate of loss of heat of a body is given by $\\frac{dQ}{dt} = \\sigma A(T^4 - T_0^4)$. This relation is valid for",
    options: ["All bodies and all temperature range", "Only for small difference between T and T_0", "Only in cooling of solids", "Only for the surface of black body"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Stefan-Boltzmann law, the net rate of heat loss for a general body is $\\frac{dQ}{dt} = e \\sigma A(T^4 - T_0^4)$. The given relation omits emissivity ($e = 1$), which is true strictly for a perfectly black body."
  },
  {
    question_text: "Temperature of a body is raised by $360^\\circ\\text{C}$. Rise in temperature of the body in absolute scale is",
    options: ["50 K", "200 K", "550 K", "360 K"],
    correct_index: 3,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "A change in temperature $\\Delta T$ has the exact same numerical magnitude on the Celsius and Kelvin (absolute) scales because one degree Celsius equals one Kelvin: $\\Delta T\\text{ (K)} = \\Delta T\\text{ (}^\\circ\\text{C}) = 360\\text{ K}$."
  },
  {
    question_text: "The equivalent thermal conductivity of the combination is",
    options: ["$2k$", "$\\frac{5}{2}k$", "$3k$", "$\\frac{4}{3}k$"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "For heat flow along the composite slab, the top layer consists of two slabs in series with equal thickness $x$ and thermal conductivities $k$ and $2k$. Its equivalent conductivity is $K_{\\text{eq}} = \\frac{2 k_1 k_2}{k_1 + k_2} = \\frac{2(k)(2k)}{k + 2k} = \\frac{4}{3}k$.",
    image_url: diagrams.q104
  },
  {
    question_text: "A solid is floating in a liquid. On decreasing the temperature, solid sinks into the liquid. If $\\gamma_L$ and $\\alpha_s$ are volume expansion coefficient of liquid and linear expansion coefficient of solid, then",
    options: ["$\\gamma_L > 3\\alpha_s$", "$\\gamma_L < 3\\alpha_s$", "$\\gamma_L = 3\\alpha_s$", "$\\gamma_L = 2\\alpha_s$"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "When temperature decreases by $\\Delta T$, densities increase according to $\\rho(T - \\Delta T) \\approx \\rho_0(1 + \\gamma \\Delta T)$. For the solid to sink, its density must increase more than the liquid's density: $\\gamma_{\\text{solid}} > \\gamma_{\\text{liquid}} \\implies 3\\alpha_s > \\gamma_L \\implies \\gamma_L < 3\\alpha_s$."
  },
  {
    question_text: "In the given heat and temperature graph of a substance, choose the correct statement.",
    options: [
      "Latent heat of fusion is more than latent heat of vapourisation",
      "Latent heat of vapourisation is more than latent heat of fusion",
      "Specific heat in solid state is more than the specific heat in liquid state",
      "Specific heat in liquid state is more than the specific heat in solid state"
    ],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "In the graph, heat added to raise temperature of solid by $\\theta$ is $H$, so $m c_s \\theta = H \\implies c_s = \\frac{H}{m\\theta}$. Heat added to raise temperature of liquid by $\\theta$ (from $\\theta$ to $2\\theta$) is $2.5H - 2H = 0.5H$, so $m c_l \\theta = 0.5H \\implies c_l = \\frac{0.5H}{m\\theta} = \\frac{c_s}{2}$. Since $c_s > c_l$, the specific heat in the solid state is greater than in the liquid state.",
    image_url: diagrams.q106
  },
  {
    question_text: "Which of the following is true in modern thermometry?",
    options: ["Triple point of water is fixed", "Boiling point of water is fixed", "Melting point of ice is fixed", "Dew point is fixed"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "In modern thermometry, the single standard fixed point chosen is the triple point of water, assigned arbitrarily as exactly 273.16 K, because it represents a unique thermodynamic equilibrium independent of external pressure."
  },
  {
    question_text: "If e denotes emissivity of a black body and a denotes absorbing power of a black body at the same temperature, then",
    options: ["$\\frac{e}{a} < 1$", "$\\frac{e}{a} > 1$", "$\\frac{e}{a} = 1$", "$\\frac{e}{a} = 2$"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "For a perfectly black body, emissivity $e = 1$ and absorptive power $a = 1$. Therefore, their ratio is $\\frac{e}{a} = \\frac{1}{1} = 1$."
  },
  {
    question_text: "The wavelength corresponding to maximum emitted energy is $4000\\text{ \\AA}$ at 4000 K. If temperature is decreased by 1000 K, then emitted wavelength becomes",
    options: ["$3000\\text{ \\AA}$", "$5333\\text{ \\AA}$", "$6000\\text{ \\AA}$", "$5000\\text{ \\AA}$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law, $\\lambda_m T = \\text{constant}$. Initial temperature $T_1 = 4000\\text{ K}$, new temperature $T_2 = 4000 - 1000 = 3000\\text{ K}$. Thus $\\lambda_2 = \\lambda_1 \\frac{T_1}{T_2} = 4000\\text{ \\AA} \\times \\frac{4000}{3000} = \\frac{16000}{3}\\text{ \\AA} \\approx 5333\\text{ \\AA}$."
  },
  {
    question_text: "The ends of given conductor are at fixed temperatures $\\theta_1$ and $\\theta_2$, the graph of rate of heat flow at steady state through sections along the length is best represented by",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "In steady state, no heat is accumulated or depleted anywhere inside the conductor. Hence, by energy conservation, the rate of heat flow $H = \\frac{dQ}{dt}$ is constant across every section along the length $x$, which corresponds to a horizontal straight line parallel to the $x$-axis as shown in graph (4).",
    image_url: diagrams.q110
  },
  {
    question_text: "Thermal conductivities of two identical rods are $k$ and $2k$ respectively. If they are joined in parallel, then the ratio of heat flowing through them per second will be",
    options: ["1 : 2", "2 : 1", "1 : 1", "4 : 1"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "For identical rods in parallel with the same length $L$, area $A$, and temperature difference $\\Delta T$, the rate of heat flow is $H = \\frac{KA\\Delta T}{L} \\propto K$. Therefore $\\frac{H_1}{H_2} = \\frac{k}{2k} = \\frac{1}{2} = 1 : 2$."
  },
  {
    question_text: "The ratio of emissive power to the absorptive power is a",
    options: [
      "Fixed dimensional constant",
      "Fixed nondimensional constant",
      "Constant and depend on the temperature of the body",
      "Constant and depend on the temperature of surrounding"
    ],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "According to Kirchhoff's law of thermal radiation, $\\frac{e_\\lambda}{a_\\lambda} = E_\\lambda\\text{(blackbody)}$, which is a universal function of wavelength and the absolute temperature of the body, independent of the surrounding temperature."
  },
  {
    question_text: "Area below graphs 1 and 2 showing variation of spectral emissive power versus wavelength as in the figure are A and 81A respectively. If temperature of 1 is 1000 K, then temperature of 2 is",
    options: ["1000 K", "2000 K", "3000 K", "9000 K"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "The area under the $E_\\lambda$ versus $\\lambda$ curve gives the total emissive power $E = \\sigma T^4$. Thus $\\frac{A_2}{A_1} = \\left(\\frac{T_2}{T_1}\\right)^4 \\implies 81 = \\left(\\frac{T_2}{1000}\\right)^4 \\implies \\frac{T_2}{1000} = 3 \\implies T_2 = 3000\\text{ K}$.",
    image_url: diagrams.q113
  },
  {
    question_text: "A metallic scale is accurate at $18^\\circ\\text{C}$. It is used to measure length of a paper sheet at $28^\\circ\\text{C}$. The measured length is",
    options: ["More than the actual length", "Less than the actual length", "Equal to actual length", "May be less or more than actual length"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "At $28^\\circ\\text{C} > 18^\\circ\\text{C}$, the metallic scale expands so that each graduation division becomes larger than standard. Because the measuring unit is longer, fewer divisions cover the sheet, causing the scale to read less than the true length."
  },

  // --- PAGE 2: Q115 - Q129 ---
  {
    question_text: "The resistance of platinum resistance thermometer is found to be 13.658 ohm at triple point of water. When dipped in a bath, its resistance is found to be 25.000 ohm. The temperature of bath is",
    options: ["300 K", "500 K", "200 K", "100 K"],
    correct_index: 1,
    topic: "Thermometry",
    difficulty: "medium",
    marks: 4,
    solution: "For a platinum resistance thermometer calibrated at the triple point of water ($T_{\\text{tr}} = 273.16\\text{ K}$): $T = \\frac{R}{R_{\\text{tr}}} \\times 273.16\\text{ K} = \\frac{25.000}{13.658} \\times 273.16 \\approx 1.8304 \\times 273.16 \\approx 500\\text{ K}$."
  },
  {
    question_text: "Three rods A, B and C of same material have same cross sectional area but have length in the ratio 1 : 2 : 2 respectively. The left and right ends are at $30^\\circ\\text{C}$ and $80^\\circ\\text{C}$. The temperature of junction of the rods will be",
    options: ["$20^\\circ\\text{C}$", "$55^\\circ\\text{C}$", "$45^\\circ\\text{C}$", "$10^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Rods B and C have length 2 (thermal resistance $2R$ each) with ends at $80^\\circ\\text{C}$. Rod A has length 1 (resistance $R$) with end at $30^\\circ\\text{C}$. Applying Kirchhoff's junction law for heat current at junction temperature $\\theta$: $2 \\times \\frac{80 - \\theta}{2R} = \\frac{\\theta - 30}{R} \\implies 80 - \\theta = \\theta - 30 \\implies 2\\theta = 110 \\implies \\theta = 55^\\circ\\text{C}$.",
    image_url: diagrams.q116
  },
  {
    question_text: "A pond of area $50\\text{ m}^2$ freezes to a thickness of 20 cm in 1 hr. Another pond of area $200\\text{ m}^2$ will freeze to same thickness in",
    options: ["4 hr", "3 hr", "2 hr", "1 hr"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "The time required for an ice sheet to grow to thickness $x$ is given by $t = \\frac{\\rho L}{2K \\Delta T} x^2$. This time is completely independent of the surface area of the pond because both heat conducted and mass of ice formed are directly proportional to area. Hence, it takes the same time: 1 hr."
  },
  {
    question_text: "The 100 parts of kelvin scale is equal to 'X' parts of Fahrenheit scale, where 'X' is",
    options: ["100", "90", "180", "75"],
    correct_index: 2,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "Between the ice point and steam point, the Kelvin scale has 100 intervals ($373.15 - 273.15 = 100$), whereas the Fahrenheit scale has 180 intervals ($212 - 32 = 180$). Hence 100 parts of Kelvin scale equal 180 parts of Fahrenheit scale."
  },
  {
    question_text: "Which of the following is incorrect?",
    options: [
      "A gas has infinite number of specific heats",
      "A thermometer should have small heat capacity",
      "Bulb of thermometer is made of conducting material",
      "Coefficient of cubical expansion of the liquid should be equal to that of bulb material of the thermometer"
    ],
    correct_index: 3,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "If the coefficient of cubical expansion of the liquid equals that of the bulb material ($\\gamma_L = \\gamma_{\\text{bulb}}$), the apparent volume expansion is zero ($\\gamma_{\\text{app}} = \\gamma_L - \\gamma_{\\text{bulb}} = 0$), so the liquid level would never rise or fall with temperature, making measurement impossible."
  },
  {
    question_text: "The amount of steam at $100^\\circ\\text{C}$ required to raise the temperature of 56.5 g of water from $15^\\circ\\text{C}$ to $75^\\circ\\text{C}$ is",
    options: ["6 g", "10 g", "15 g", "20 g"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat gained by water: $Q_{\\text{gain}} = 56.5 \\times 1 \\times (75 - 15) = 56.5 \\times 60 = 3390\\text{ cal}$. Heat released by $m$ grams of steam condensing at $100^\\circ\\text{C}$ and cooling to $75^\\circ\\text{C}$: $Q_{\\text{lost}} = m(540) + m(1)(100 - 75) = 565m\\text{ cal}$. Equating: $565m = 3390 \\implies m = \\frac{3390}{565} = 6\\text{ g}$."
  },
  {
    question_text: "In a room where temperature is $30^\\circ\\text{C}$, a body cools from $61^\\circ\\text{C}$ to $59^\\circ\\text{C}$ in 4 minutes. Time taken by the body to cool from $51^\\circ\\text{C}$ to $49^\\circ\\text{C}$ will be",
    options: ["3 minutes", "4 minutes", "6 minutes", "9 minutes"],
    correct_index: 2,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's cooling law: $\\frac{61 - 59}{4} = K\\left(\\frac{61 + 59}{2} - 30\\right) \\implies \\frac{2}{4} = 30K \\implies K = \\frac{1}{60}\\text{ min}^{-1}$. For cooling from $51^\\circ\\text{C}$ to $49^\\circ\\text{C}$: $\\frac{51 - 49}{t} = \\frac{1}{60}\\left(\\frac{51 + 49}{2} - 30\\right) \\implies \\frac{2}{t} = \\frac{20}{60} = \\frac{1}{3} \\implies t = 6\\text{ minutes}$."
  },
  {
    question_text: "When temperature increases, the pendulum clock",
    options: ["Gains time", "Loses time", "May lose or gain", "Its time period is independent of temperature"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "The time period of a pendulum is $T = 2\\pi \\sqrt{\\frac{L}{g}}$. When temperature increases, the length $L$ expands due to thermal expansion, increasing the time period $T$. Since each swing takes longer, the clock ticks slower and loses time."
  },
  {
    question_text: "The radiation intensity emitted by a perfectly black body does not depend on",
    options: ["Its temperature", "Its surface area", "Temperature of surrounding", "Both (2) & (3)"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Radiated intensity (power per unit area) emitted by a blackbody is $I = \\sigma T^4$. It depends solely on the body's own absolute temperature $T$ and is completely independent of its total surface area and the surrounding temperature."
  },
  {
    question_text: "The rate of fall of temperature of two identical solid spheres of different material are equal initially at a certain temperature then, [Take emissivity to be equal]",
    options: [
      "Their heat capacities must be equal",
      "Their specific heat capacities are proportional to their mass",
      "Their specific heat are equal",
      "Both (1) & (2)"
    ],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Rate of cooling is $-\\frac{dT}{dt} = \\frac{e A \\sigma(T^4 - T_0^4)}{m s} = \\frac{e A \\sigma(T^4 - T_0^4)}{C}$. Because the spheres have identical geometry ($A$), emissivity ($e$), and initial temperature, the rate of temperature drop is equal if and only if their total heat capacities $C = m s$ are equal."
  },
  {
    question_text: "In case of Wein's displacement law, when temperature of perfectly black body is doubled",
    options: [
      "Wavelength corresponding to maximum intensity is halved",
      "Area under the graph spectral radiation intensity and $\\lambda$ becomes 16 times",
      "Wavelength corresponding to maximum intensity is also doubled",
      "Both (1) & (2)"
    ],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "According to Wien's displacement law, $\\lambda_m T = \\text{const}$, so doubling $T$ halves $\\lambda_m$. By Stefan's law, the area under the curve is total emissive power $E = \\sigma T^4 \\propto T^4 = 2^4 = 16$ times. Hence both (1) and (2) are correct."
  },
  {
    question_text: "Eleven identical conducting rods are joined as shown in the figure. Points A and F are maintained at temperatures $100^\\circ\\text{C}$ and $0^\\circ\\text{C}$ respectively. The temperature at B and D respectively are",
    options: ["$80^\\circ\\text{C}, 40^\\circ\\text{C}$", "$70^\\circ\\text{C}, 60^\\circ\\text{C}$", "$70^\\circ\\text{C}, 50^\\circ\\text{C}$", "$90^\\circ\\text{C}, 30^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "Let resistance of each rod be $r$. Segment AB has resistance $r$. The bridge diamond BC has two parallel paths of $2r$ each, equivalent to $r$. Segment CD has resistance $r$. Bridge diamond DE has equivalent resistance $r$. Segment EF has resistance $r$. Total resistance from A to F is $5r$. The uniform temperature drop across each of the 5 segments is $\\frac{100 - 0}{5} = 20^\\circ\\text{C}$. Thus $T_B = 100 - 20 = 80^\\circ\\text{C}$, $T_C = 60^\\circ\\text{C}$, and $T_D = 60 - 20 = 40^\\circ\\text{C}$.",
    image_url: diagrams.q126
  },
  {
    question_text: "Figure shows the graphs of spectral emissive power of a black body at two different temperatures $T_1$ and $T_2$. The ratio of area under the graphs $\\left(\\frac{A_1}{A_2}\\right)$ is",
    options: ["$\\frac{9}{16}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$", "$\\frac{81}{16}$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Wien's displacement law: $T_1 \\lambda_0 = T_2 \\left(\\frac{3\\lambda_0}{2}\\right) \\implies \\frac{T_1}{T_2} = \\frac{3}{2}$. The area under the spectral emissive power curve gives total radiant power $E \\propto T^4$. Thus $\\frac{A_1}{A_2} = \\left(\\frac{T_1}{T_2}\\right)^4 = \\left(\\frac{3}{2}\\right)^4 = \\frac{81}{16}$.",
    image_url: diagrams.q127
  },
  {
    question_text: "A perfectly black body emits radiation at temperature $T_1\\text{ K}$. If it is to radiate 81 times its present thermal power, its temperature $T_2$ should be",
    options: ["$T_2 = 81 T_1$", "$T_2 = 27 T_1$", "$T_2 = 9 T_1$", "$T_2 = 3 T_1$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Stefan-Boltzmann law: $P = \\sigma A T^4$. For $P_2 = 81 P_1$: $\\left(\\frac{T_2}{T_1}\\right)^4 = 81 \\implies \\frac{T_2}{T_1} = (81)^{1/4} = 3 \\implies T_2 = 3 T_1$."
  },
  {
    question_text: "A bimetallic strip is shown in the figure. On cooling, its shape will become ($\\alpha_{\\text{brass}} > \\alpha_{\\text{steel}}$)",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Brass is on the left and steel is on the right. Since $\\alpha_{\\text{brass}} > \\alpha_{\\text{steel}}$, brass contracts more upon cooling than steel. The strip must bend into an arc with brass on the inner (concave) side, which corresponds to bending towards the left as shown in option (3).",
    image_url: diagrams.q129
  },

  // --- PAGE 3: Q130 - Q146 ---
  {
    question_text: "Temperature of surface of sun is given by ($r = \\text{distance between sun and earth}, R = \\text{Radius of sun}, S = \\text{solar constant}, \\sigma = \\text{Stefan's constant}$)",
    options: [
      "$\\left[\\left(\\frac{r}{R}\\right)^2 \\frac{S}{\\sigma}\\right]^{1/4}$",
      "$\\left[\\left(\\frac{R}{r}\\right)^2 \\frac{S}{\\sigma}\\right]^{1/4}$",
      "$\\left[\\left(\\frac{r}{R}\\right)^2 \\frac{\\sigma}{S}\\right]^{1/4}$",
      "$\\left[\\sqrt{\\frac{R}{r}}\\frac{S}{\\sigma}\\right]^{1/4}$"
    ],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Total power radiated by the sun is $P = \\sigma(4\\pi R^2)T^4$. The solar constant at earth distance $r$ is $S = \\frac{P}{4\\pi r^2} = \\frac{\\sigma(4\\pi R^2)T^4}{4\\pi r^2} = \\sigma \\left(\\frac{R}{r}\\right)^2 T^4$. Solving for $T$: $T^4 = \\left(\\frac{r}{R}\\right)^2 \\frac{S}{\\sigma} \\implies T = \\left[\\left(\\frac{r}{R}\\right)^2 \\frac{S}{\\sigma}\\right]^{1/4}$."
  },
  {
    question_text: "The length of two rods joined longitudinally is in the ratio 2 : 3 and their coefficient of linear expansion are $\\alpha$ and $3\\alpha$ respectively. If their thickness is same, then the effective coefficient of linear expansion is",
    options: ["$1.1\\alpha$", "$2.2\\alpha$", "$3.3\\alpha$", "$4.4\\alpha$"],
    correct_index: 1,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "Lengths are $\\ell_1 = 2\\ell$ and $\\ell_2 = 3\\ell$. Total length $\\ell_{\\text{total}} = 5\\ell$. Total expansion: $\\Delta \\ell = \\ell_1 \\alpha_1 \\Delta T + \\ell_2 \\alpha_2 \\Delta T = (2\\ell)(\\alpha)\\Delta T + (3\\ell)(3\\alpha)\\Delta T = 11\\ell \\alpha \\Delta T$. The effective coefficient is $\\alpha_{\\text{eff}} = \\frac{\\Delta \\ell}{\\ell_{\\text{total}} \\Delta T} = \\frac{11\\ell\\alpha}{5\\ell} = \\frac{11}{5}\\alpha = 2.2\\alpha$."
  },
  {
    question_text: "An object cools from $80^\\circ\\text{C}$ to $70^\\circ\\text{C}$ in 2 min. The time taken by the same object to cool from $50^\\circ\\text{C}$ to $40^\\circ\\text{C}$ [Take temperature of surrounding to be $30^\\circ\\text{C}$] will be",
    options: ["2 min", "3 min", "5 min", "6 min"],
    correct_index: 3,
    topic: "Newton's Law of Cooling",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's cooling law: $\\frac{80 - 70}{2} = K\\left(\\frac{80 + 70}{2} - 30\\right) \\implies 5 = 45K \\implies K = \\frac{1}{9}\\text{ min}^{-1}$. For cooling from $50^\\circ\\text{C}$ to $40^\\circ\\text{C}$: $\\frac{50 - 40}{t} = \\frac{1}{9}\\left(\\frac{50 + 40}{2} - 30\\right) \\implies \\frac{10}{t} = \\frac{15}{9} = \\frac{5}{3} \\implies t = \\frac{30}{5} = 6\\text{ min}$."
  },
  {
    question_text: "The triple point of water",
    options: [
      "Has been arbitrarily assigned as fixed value by thermometry",
      "Is a point where water, ice and steam can exist in equilibrium",
      "Is a fixed point",
      "All of these"
    ],
    correct_index: 3,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "The triple point of water is a unique state where ice, liquid water, and water vapor coexist in equilibrium at 273.16 K ($0.01^\\circ\\text{C}$) and 4.58 mm Hg. It is an absolute reproducible fixed point arbitrarily assigned as the reference in modern thermometry. Hence all options are correct."
  },
  {
    question_text: "A heated metallic sphere is allowed to cool at room temperature. The graph which correctly represents its cooling is",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "According to Newton's law of cooling, temperature decays exponentially with time: $T(t) = T_{\\text{room}} + (T_0 - T_{\\text{room}})e^{-kt}$. The curve is concave upward and asymptotically approaches room temperature, correctly shown in graph (1).",
    image_url: diagrams.q134
  },
  {
    question_text: "The dimension of thermal resistance is",
    options: ["$[\\text{MT}^{-3}\\text{K}^{-4}]$", "$[\\text{M}^{-1}\\text{L}^{-2}\\text{T}^3\\text{K}]$", "$[\\text{ML}^2\\text{T}^{-3}]$", "$[\\text{LK}]$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Thermal resistance is $R = \\frac{\\Delta T}{H} = \\frac{[\\text{Temperature}]}{[\\text{Heat Current}]} = \\frac{[\\text{K}]}{[\\text{ML}^2\\text{T}^{-3}]} = [\\text{M}^{-1}\\text{L}^{-2}\\text{T}^3\\text{K}]$."
  },
  {
    question_text: "The thermal coefficient of volume expansion of an ideal gas at constant pressure is",
    options: ["$\\frac{3}{T}$", "$\\frac{-1}{T}$", "$\\frac{1}{T}$", "$\\frac{-3}{T}$"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "From the ideal gas equation $PV = nRT$, at constant pressure $P \\frac{dV}{dT} = nR = \\frac{PV}{T} \\implies \\frac{dV}{dT} = \\frac{V}{T}$. Coefficient of volume expansion is $\\gamma = \\frac{1}{V}\\frac{dV}{dT} = \\frac{1}{T}$."
  },
  {
    question_text: "A faulty thermometer reads freezing point and boiling point of water as $10^\\circ\\text{C}$ and $90^\\circ\\text{C}$ respectively, the correct value of temperature as it reads $50^\\circ\\text{C}$ is",
    options: ["$20^\\circ\\text{C}$", "$30^\\circ\\text{C}$", "$40^\\circ\\text{C}$", "$50^\\circ\\text{C}$"],
    correct_index: 3,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "Using linear scaling: $\\frac{C - 0}{100 - 0} = \\frac{\\theta - \\text{FP}}{\\text{BP} - \\text{FP}} = \\frac{50 - 10}{90 - 10} = \\frac{40}{80} = 0.5 \\implies C = 0.5 \\times 100 = 50^\\circ\\text{C}$."
  },
  {
    question_text: "A cube and a sphere of same material, same total surface area, at same temperature are placed in same evacuated space one by one. The ratio of their initial rate of cooling is",
    options: ["$1 : \\sqrt{\\frac{\\pi}{2}}$", "$1 : \\sqrt{\\frac{\\pi}{6}}$", "$1 : \\sqrt{\\frac{\\pi}{12}}$", "$1 : \\sqrt{\\frac{\\pi}{16}}$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "hard",
    marks: 4,
    solution: "Rate of cooling is $-\\frac{dT}{dt} = \\frac{e A \\sigma (T^4 - T_0^4)}{\\rho V s} \\propto \\frac{1}{V}$. For cube: $A = 6a^2 \\implies V_{\\text{cube}} = (A/6)^{3/2}$. For sphere: $A = 4\\pi r^2 \\implies V_{\\text{sphere}} = \\frac{4}{3}\\pi (A/4\\pi)^{3/2} = \\frac{A^{3/2}}{6\\sqrt{\\pi}}$. Thus $\\frac{R_{\\text{cube}}}{R_{\\text{sphere}}} = \\frac{V_{\\text{sphere}}}{V_{\\text{cube}}} = \\frac{6\\sqrt{6}}{6\\sqrt{\\pi}} = \\sqrt{\\frac{6}{\\pi}} = 1 : \\sqrt{\\frac{\\pi}{6}}$."
  },
  {
    question_text: "An iron tyre is to be fitted onto a wooden wheel 1 metre in diameter. The diameter of the tyre is 6 mm smaller than that of the wheel. The tyre should be heated so that its temperature increases by a minimum of (coefficient of volume expansion of iron is $3.6 \\times 10^{-5}/^\\circ\\text{C}$)",
    options: ["$167^\\circ\\text{C}$", "$334^\\circ\\text{C}$", "$500^\\circ\\text{C}$", "$1000^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "Linear expansion coefficient $\\alpha = \\frac{\\gamma}{3} = \\frac{3.6 \\times 10^{-5}}{3} = 1.2 \\times 10^{-5}/^\\circ\\text{C}$. Increase in diameter required is $\\Delta d = 6\\text{ mm} = 6 \\times 10^{-3}\\text{ m}$. Initial diameter $d \\approx 1\\text{ m}$. Thus $\\Delta d = d \\alpha \\Delta T \\implies 6 \\times 10^{-3} = 1 \\times (1.2 \\times 10^{-5}) \\times \\Delta T \\implies \\Delta T = \\frac{600}{1.2} = 500^\\circ\\text{C}$."
  },
  {
    question_text: "Steam is passed into 54 g of water at $30^\\circ\\text{C}$ till the temperature of the mixture becomes $90^\\circ\\text{C}$. If the latent heat of steam is $540\\text{ cal/g}$, the mass of the mixture will be nearly",
    options: ["80 g", "60 g", "50 g", "24 g"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat gained by water: $Q_{\\text{gain}} = 54 \\times 1 \\times (90 - 30) = 3240\\text{ cal}$. Heat lost by $m$ g steam condensing and cooling to $90^\\circ\\text{C}$: $Q_{\\text{lost}} = m(540) + m(1)(100 - 90) = 550m\\text{ cal}$. Equating: $550m = 3240 \\implies m = 5.89\\text{ g} \\approx 6\\text{ g}$. Total mixture mass = $54 + 6 = 60\\text{ g}$."
  },
  {
    question_text: "Ice starts freezing in a lake with water at $0^\\circ\\text{C}$ when the atmospheric temperature is $-10^\\circ\\text{C}$. If the time taken for 1 cm of ice to be formed is 12 minutes, the time taken for the thickness of the ice to change from 1 cm to 2 cm will be",
    options: ["12 minutes", "Less than 12 minutes", "More than 12 minutes but less than 24 minutes", "More than 24 minutes"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "Growth time of pond ice satisfies $t = k(x_2^2 - x_1^2)$. For 0 to 1 cm: $t_1 = k(1^2 - 0) = k = 12\\text{ min}$. For 1 cm to 2 cm: $t_2 = k(2^2 - 1^2) = 3k = 3 \\times 12 = 36\\text{ minutes}$. Since $36 > 24\\text{ minutes}$, the answer is more than 24 minutes."
  },
  {
    question_text: "The spectral energy distribution of the sun at temperature 6050 K has a maximum at $4753\\text{ \\AA}$. The temperature of a star for which this maximum is at $9506\\text{ \\AA}$ is",
    options: ["6050 K", "3025 K", "12100 K", "24200 K"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law, $T_1 \\lambda_1 = T_2 \\lambda_2 \\implies 6050 \\times 4753 = T_2 \\times 9506$. Since $9506 = 2 \\times 4753$, $T_2 = \\frac{6050}{2} = 3025\\text{ K}$."
  },
  {
    question_text: "5 g of ice at $0^\\circ\\text{C}$ is dropped in a beaker containing 20 g of water at $40^\\circ\\text{C}$. The final temperature of the mixture will be (Assume that beaker has negligible heat capacity)",
    options: ["$0^\\circ\\text{C}$", "$18^\\circ\\text{C}$", "$16^\\circ\\text{C}$", "$38^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat required to melt all 5 g ice: $5 \\times 80 = 400\\text{ cal}$. Heat lost by water in cooling to $0^\\circ\\text{C}$: $20 \\times 1 \\times 40 = 800\\text{ cal}$. Remaining heat: $800 - 400 = 400\\text{ cal}$. This surplus heat raises the temperature of total $25\\text{ g}$ water: $T = \\frac{400}{25 \\times 1} = 16^\\circ\\text{C}$."
  },
  {
    question_text: "If at temperature $T_1 = 1000\\text{ K}$, the wavelength corresponding to maximum emissive power of black body is $3 \\times 10^{-6}\\text{ m}$, then at what temperature the wavelength corresponding to maximum emissive power will be $2 \\times 10^{-6}\\text{ m}$?",
    options: ["2000 K", "1500 K", "1250 K", "3000 K"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law: $T_2 \\lambda_2 = T_1 \\lambda_1 \\implies T_2(2 \\times 10^{-6}) = (1000)(3 \\times 10^{-6}) \\implies T_2 = 1500\\text{ K}$."
  },
  {
    question_text: "Given arrangement consists of inner solid cylinder of radius R and thermal conductivity $K_1$ and outer hollow cylinder of inner radius R, outer radius 2R and thermal conductivity $K_2$. Equivalent thermal conductivity of arrangement between A and B is",
    options: ["$K_1 + K_2$", "$\\frac{K_1 + 3K_2}{4}$", "$\\frac{K_1 K_2}{K_1 + K_2}$", "$\\frac{3K_1 + K_2}{4}$"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "medium",
    marks: 4,
    solution: "The two cylinders conduct in parallel between $T_1$ and $T_2$. Area of inner cylinder: $A_1 = \\pi R^2$. Area of outer hollow cylinder: $A_2 = \\pi (2R)^2 - \\pi R^2 = 3\\pi R^2$. Total area $A = 4\\pi R^2$. Equivalent conductivity satisfies $K_{\\text{eq}} A = K_1 A_1 + K_2 A_2 \\implies K_{\\text{eq}}(4\\pi R^2) = K_1(\\pi R^2) + K_2(3\\pi R^2) \\implies K_{\\text{eq}} = \\frac{K_1 + 3K_2}{4}$.",
    image_url: diagrams.q145
  },
  {
    question_text: "Two identical rods of a metal are welded as shown in figure (1). A certain amount of heat flows through them in 16 minutes. If the rods are welded as shown in figure (2), then the same amount of heat will flow in",
    options: ["1 minute", "4 minutes", "16 minutes", "2 minutes"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "In Figure (1), the two identical rods are in series: $R_1 = 2R$, and time taken is $t_1 = 16\\text{ min}$. In Figure (2), the rods are in parallel: $R_2 = R/2$. For the same heat flow $Q = \\frac{\\Delta T}{R_{\\text{eq}}} t$: $\\frac{t_2}{t_1} = \\frac{R_2}{R_1} = \\frac{R/2}{2R} = \\frac{1}{4} \\implies t_2 = \\frac{16}{4} = 4\\text{ minutes}$.",
    image_url: diagrams.q146
  },

  // --- PAGE 4: Q197 - Q216 ---
  {
    question_text: "Expansion during heating",
    options: [
      "Occurs only in solids",
      "Increases the weight of material",
      "Decreases the density of a material",
      "Occurs at the same rate for all liquids or solids"
    ],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Upon heating, mass and weight remain unchanged while volume increases due to thermal expansion. Consequently, the density $\\rho = \\frac{m}{V}$ decreases."
  },
  {
    question_text: "If the length of a cylinder on heating increases by 2%, the area of its base will increase by",
    options: ["0.5%", "2%", "1%", "4%"],
    correct_index: 3,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Fractional change in length is $\\frac{\\Delta L}{L} = \\alpha \\Delta T = 2\\%$. Base area is $A = \\pi r^2$, so fractional change in area is $\\frac{\\Delta A}{A} = 2\\alpha \\Delta T = 2(2\\%) = 4\\%$."
  },
  {
    question_text: "Ratio among thermal linear expansion coefficient ($\\alpha$), thermal areal expansion coefficient ($\\beta$) and thermal volume expansion coefficient ($\\gamma$) for isotropic substance is",
    options: ["1 : 2 : 3", "3 : 2 : 1", "4 : 3 : 2", "1 : 4 : 9"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "For an isotropic solid, areal expansion coefficient $\\beta = 2\\alpha$ and volume expansion coefficient $\\gamma = 3\\alpha$. Therefore, $\\alpha : \\beta : \\gamma = 1 : 2 : 3$."
  },
  {
    question_text: "100 g ice at $0^\\circ\\text{C}$ is mixed with 100 g water at $80^\\circ\\text{C}$. The final temperature of the mixture is",
    options: ["$40^\\circ\\text{C}$", "$25^\\circ\\text{C}$", "$0^\\circ\\text{C}$", "$47.14^\\circ\\text{C}$"],
    correct_index: 2,
    topic: "Calorimetry",
    difficulty: "easy",
    marks: 4,
    solution: "Heat released by cooling 100 g water from $80^\\circ\\text{C}$ to $0^\\circ\\text{C}$ is $Q = 100 \\times 1 \\times 80 = 8000\\text{ cal}$. Heat required to melt all 100 g ice at $0^\\circ\\text{C}$ is $100 \\times 80 = 8000\\text{ cal}$. Since heat released exactly equals heat required to melt the ice, the entire mixture turns to water at $0^\\circ\\text{C}$."
  },
  {
    question_text: "At what temperature, volume of fixed mass of an ideal gas at $0^\\circ\\text{C}$ becomes triple?",
    options: ["$546^\\circ\\text{C}$", "$182^\\circ\\text{C}$", "$819^\\circ\\text{C}$", "$646^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "By Charles's law, $V \\propto T$. Initial absolute temperature $T_1 = 273\\text{ K}$. For $V_2 = 3V_1$: $T_2 = 3T_1 = 3 \\times 273 = 819\\text{ K}$. In Celsius: $t_2 = 819 - 273 = 546^\\circ\\text{C}$."
  },
  {
    question_text: "Two rods of same length and cross-sectional area are joined in series. Thermal conductivity of the rods are in the ratio 1 : 2. The ends are maintained at temperatures $T_1$ and $T_2$ as shown in the figure. The sides are thermally insulated. If $T_1 > T_2$, then which of the following graphs represent variation of temperature gradient $\\left(\\frac{dT}{dx}\\right)$ with x in steady state?",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 3,
    topic: "Heat Conduction",
    difficulty: "hard",
    marks: 4,
    solution: "In steady state, heat current $H = -K A \\frac{dT}{dx}$ is constant along the rod. Since $T_1 > T_2$, temperature decreases with $x$, making $\\frac{dT}{dx} = -\\frac{H}{KA}$ negative. In the first rod ($0 < x < \\ell$), $K_1 = K \\implies \\frac{dT}{dx} = -\\frac{H}{KA}$. In the second rod ($\\ell < x < 2\\ell$), $K_2 = 2K \\implies \\frac{dT}{dx} = -\\frac{H}{2KA} = \\frac{1}{2}\\left(-\\frac{H}{KA}\\right)$. Thus $\\frac{dT}{dx}$ is negative throughout, with double the negative magnitude in the first rod compared to the second, as represented in graph (4).",
    image_url: diagrams.q202
  },
  {
    question_text: "In order for heat to flow from one part of a solid to another part, what is required?",
    options: ["Uniform density", "Density gradient", "Temperature gradient", "Uniform temperature"],
    correct_index: 2,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "According to Fourier's law of heat conduction $H = -K A \\frac{dT}{dx}$, the flow of heat between two points in a medium fundamentally requires a non-zero temperature gradient."
  },
  {
    question_text: "Two identical plates of different metals are joined to form a single plate whose thickness is double the thickness of each plate. If the coefficient of conductivity of each plate is 2 units and 3 units respectively, then the conductivity of composite plate (in same units) will be",
    options: ["5", "2.4", "1.5", "1.2"],
    correct_index: 1,
    topic: "Heat Conduction",
    difficulty: "easy",
    marks: 4,
    solution: "For two plates of equal thickness joined in series, the equivalent thermal conductivity is $K_{\\text{eq}} = \\frac{2 K_1 K_2}{K_1 + K_2} = \\frac{2 \\times 2 \\times 3}{2 + 3} = \\frac{12}{5} = 2.4\\text{ units}$."
  },
  {
    question_text: "If a black body is heated at very high temperature, it appears to be",
    options: ["Blue", "White", "Red", "Black"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "By Wien's displacement law $\\lambda_m T = b$, as temperature reaches extremely high values, the peak of spectral emission shifts towards shorter wavelengths into the blue and ultraviolet regions, making the body appear glowing blue (as observed with extremely hot O-type stars)."
  },
  {
    question_text: "An object is at a temperature of 400 K. At what temperature would it radiate energy twice as fast, while surrounding temperature is assumed to be negligible?",
    options: ["$200^\\circ\\text{C}$", "200 K", "$800^\\circ\\text{C}$", "800 K"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law, radiated energy is $E \\propto T^4$. For $E' = 2E$: $T' = 400 \\times (2)^{1/4} = 400 \\times 1.1892 = 475.7\\text{ K}$. In Celsius: $475.7 - 273.15 \\approx 202.5^\\circ\\text{C} \\approx 200^\\circ\\text{C}$."
  },
  {
    question_text: "The tungsten filament of an electric lamp has a surface area A and a power rating P. If the emissivity of the filament is $\\epsilon$ and $\\sigma$ is Stefan's constant, then the steady temperature of the filament will be",
    options: [
      "$T = \\left(\\frac{P}{A\\epsilon\\sigma}\\right)^4$",
      "$T = \\left(\\frac{P}{A\\epsilon\\sigma}\\right)$",
      "$T = \\left(\\frac{A\\epsilon\\sigma}{P}\\right)^{1/4}$",
      "$T = \\left(\\frac{P}{A\\epsilon\\sigma}\\right)^{1/4}$"
    ],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "At steady state, the electrical power input equals radiated power: $P = \\epsilon \\sigma A T^4 \\implies T^4 = \\frac{P}{A\\epsilon\\sigma} \\implies T = \\left(\\frac{P}{A\\epsilon\\sigma}\\right)^{1/4}$."
  },
  {
    question_text: "If the temperature of hot body is increased by 50%, then the increase in the quantity of emitted heat radiation will be approximately",
    options: ["125%", "200%", "300%", "400%"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "New temperature $T' = 1.5 T$. By Stefan-Boltzmann law $E \\propto T^4$: $E' = (1.5)^4 E = 5.0625 E$. Percentage increase: $\\frac{E' - E}{E} \\times 100\\% = (5.0625 - 1) \\times 100\\% = 406.25\\% \\approx 400\\%$."
  },
  {
    question_text: "A hot metallic solid sphere of radius r radiates heat. Its rate of cooling is",
    options: ["Independent of r", "Proportional to r", "Proportional to $r^2$", "Proportional to $1/r$"],
    correct_index: 3,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "The rate of cooling is $-\\frac{dT}{dt} = \\frac{e A \\sigma(T^4 - T_0^4)}{m s} = \\frac{e (4\\pi r^2) \\sigma(T^4 - T_0^4)}{(\\frac{4}{3}\\pi r^3 \\rho) s} \\propto \\frac{r^2}{r^3} = \\frac{1}{r}$."
  },
  {
    question_text: "The spectral energy distribution of the sun is maximum at $4753\\text{ \\AA}$. If the temperature of a star is 2755.4 K, then its spectral distribution is maximum at $\\lambda$ equal to (Temperature of sun is 6000 K)",
    options: ["$10850\\text{ \\AA}$", "$10350\\text{ \\AA}$", "$20700\\text{ \\AA}$", "$5175\\text{ \\AA}$"],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Wien's displacement law: $\\lambda_m T = \\text{const} \\implies \\lambda_{\\text{star}} = 4753\\text{ \\AA} \\times \\frac{6000}{2755.4} \\approx 10350\\text{ \\AA}$."
  },
  {
    question_text: "Assuming the sun to be a spherical black body of radius R at a temperature T K, the total radiant power incident on earth at a distance r from the sun is ($r_0$: radius of the earth)",
    options: [
      "$\\frac{\\pi r_0^2 R^2 \\sigma T^4}{r^2}$",
      "$\\frac{r_0^2 R^2 \\sigma T^4}{4\\pi r^2}$",
      "$\\frac{R^2 \\sigma T^4}{r^2}$",
      "$\\frac{4\\pi r_0^2 R^2 \\sigma T^4}{r^2}$"
    ],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "Solar radiated power is $P = \\sigma (4\\pi R^2) T^4$. The intensity of radiation reaching earth distance $r$ is $I = \\frac{P}{4\\pi r^2} = \\frac{\\sigma R^2 T^4}{r^2}$. The earth intercepts this power across its disc of cross-sectional area $\\pi r_0^2$. Thus total power incident is $P_{\\text{incident}} = I \\times (\\pi r_0^2) = \\frac{\\pi r_0^2 R^2 \\sigma T^4}{r^2}$."
  },
  {
    question_text: "A metal rod is placed on smooth horizontal surface at temperature $25^\\circ\\text{C}$. Now temperature of surroundings is increased upto $100^\\circ\\text{C}$, then during heating of rod,",
    options: [
      "Mechanical strain developed in rod is non-zero",
      "Mechanical stress developed in rod is non-zero",
      "Length of rod will increase",
      "All of these"
    ],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "easy",
    marks: 4,
    solution: "Because the rod rests on a smooth surface without any mechanical constraints or external forces opposing its expansion, it undergoes free thermal expansion: its length increases, but zero thermal or mechanical stress is developed."
  },
  {
    question_text: "The radiation emitted by a star (S') is 10000 times that of Sun (S). If surface temperatures of the sun and stars are 6000 K and 2000 K respectively, the ratio of the radii of the star (S') and Sun (S) is",
    options: ["300 : 1", "600 : 1", "900 : 1", "1200 : 1"],
    correct_index: 2,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law $P = \\sigma(4\\pi R^2)T^4$: $\\frac{P'}{P} = \\left(\\frac{R'}{R}\\right)^2 \\left(\\frac{T'}{T}\\right)^4 \\implies 10000 = \\left(\\frac{R'}{R}\\right)^2 \\left(\\frac{2000}{6000}\\right)^4 = \\left(\\frac{R'}{R}\\right)^2 \\frac{1}{81} \\implies \\left(\\frac{R'}{R}\\right)^2 = 810000 \\implies \\frac{R'}{R} = 900 = 900 : 1$."
  },
  {
    question_text: "A 42 kg block of ice moving on rough horizontal surface stops due to friction, after some time. If initial velocity of block is 4 m/s, the mass of ice that has melted due to heat generated by friction is (Latent heat of ice = $3.36 \\times 10^5\\text{ J/kg}$)",
    options: ["$1.5 \\times 10^{-3}\\text{ kg}$", "$10^{-3}\\text{ kg}$", "$2 \\times 10^{-3}\\text{ kg}$", "$2.5 \\times 10^{-3}\\text{ kg}$"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Kinetic energy lost by the block: $E_k = \\frac{1}{2} M v^2 = \\frac{1}{2} \\times 42 \\times (4)^2 = 336\\text{ J}$. This energy converts into heat to melt ice: $Q = m L_f \\implies 336 = m \\times (3.36 \\times 10^5) \\implies m = 10^{-3}\\text{ kg}$."
  },
  {
    question_text: "A uniform cylindrical rod of mass M and length L is rotating with an angular speed $\\omega$. The axis of rotation is perpendicular to axis of symmetry of rod and passing through one end of the rod. If the room temperature is increased by $\\theta$ and coefficient of linear expansion of the rod is $\\alpha$, the magnitude of the change in angular speed is",
    options: ["$\\frac{3}{2}\\omega \\alpha \\theta$", "$\\frac{1}{2}\\omega \\alpha \\theta$", "$\\omega \\alpha \\theta$", "$2\\omega \\alpha \\theta$"],
    correct_index: 3,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "The moment of inertia about one end is $I = \\frac{1}{3} M L^2$. By conservation of angular momentum $I \\omega = \\text{constant}$, differentiating gives $\\frac{\\Delta \\omega}{\\omega} = -\\frac{\\Delta I}{I} = -2\\frac{\\Delta L}{L} = -2\\alpha \\theta$. The magnitude of change in angular speed is $|\\Delta \\omega| = 2\\omega \\alpha \\theta$."
  },
  {
    question_text: "Steam at $100^\\circ\\text{C}$ is passed into 54 g of water at $30^\\circ\\text{C}$ till the temperature of mixture becomes $90^\\circ\\text{C}$. The latent heat is $540\\text{ cal/g}$. The mass of the mixture will be nearly",
    options: ["70 g", "60 g", "80 g", "24 g"],
    correct_index: 1,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Heat gained by water: $54 \\times 1 \\times (90 - 30) = 3240\\text{ cal}$. Heat released by $m$ grams of steam condensing and cooling to $90^\\circ\\text{C}$: $540m + 10m = 550m\\text{ cal}$. Equating: $550m = 3240 \\implies m \\approx 6\\text{ g}$. Total mixture mass = $54 + 6 = 60\\text{ g}$."
  },

  // --- PAGE 5: Q217 - Q225 ---
  {
    question_text: "Change in entropy when 5 g of pure ice melts to form water at $0^\\circ\\text{C}$ is ($L_{\\text{ice}} = 80\\text{ cal/g}$)",
    options: ["1.46 cal/K", "$\\infty$", "7.8 cal/K", "1.46 J/K"],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "medium",
    marks: 4,
    solution: "Reversible isothermal melting at $T = 0^\\circ\\text{C} = 273.15\\text{ K}$. Total heat absorbed is $Q = m L_f = 5 \\times 80 = 400\\text{ cal}$. Change in entropy is $\\Delta S = \\frac{Q}{T} = \\frac{400}{273.15} \\approx 1.46\\text{ cal/K}$."
  },
  {
    question_text: "A metallic scale is to be calibrated so that millimetre intervals are accurate within $5 \\times 10^{-4}\\text{ mm}$ at a given temperature. Maximum temperature variation allowed during calibration is approximately ($\\alpha_{\\text{metal}} = 10 \\times 10^{-6}\\text{ }^\\circ\\text{C}^{-1}$)",
    options: ["$5^\\circ\\text{C}$", "$10^\\circ\\text{C}$", "$0.5^\\circ\\text{C}$", "$50^\\circ\\text{C}$"],
    correct_index: 3,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "For $L = 1\\text{ mm}$ interval: allowable change is $\\Delta L = 5 \\times 10^{-4}\\text{ mm}$. Using $\\Delta L = L \\alpha \\Delta T$: $5 \\times 10^{-4} = 1 \\times (10 \\times 10^{-6}) \\times \\Delta T \\implies \\Delta T = \\frac{5 \\times 10^{-4}}{10^{-5}} = 50^\\circ\\text{C}$."
  },
  {
    question_text: "Temperature difference between body and surroundings fall from $10^\\circ\\text{C}$ to $5^\\circ\\text{C}$ in 10 minutes. Temperature difference between body and surroundings will fall from $5^\\circ\\text{C}$ to $2.5^\\circ\\text{C}$ in (Use Newton's law of cooling)",
    options: ["5 minutes", "20 minutes", "10 minutes", "Infinite"],
    correct_index: 2,
    topic: "Newton's Law of Cooling",
    difficulty: "easy",
    marks: 4,
    solution: "By Newton's cooling law, temperature difference decays exponentially: $\\theta(t) = \\theta_0 e^{-kt}$. The time required for the temperature difference to halve (from $10^\\circ\\text{C}$ to $5^\\circ\\text{C}$) is one half-life (10 minutes). The next halving from $5^\\circ\\text{C}$ to $2.5^\\circ\\text{C}$ is another identical half-life, so it takes exactly 10 minutes."
  },
  {
    question_text: "If a thermometer reads freezing point of water as $20^\\circ\\text{C}$ and boiling point as $150^\\circ\\text{C}$, then how much will the thermometer read when the actual temperature is $60^\\circ\\text{C}$?",
    options: ["$98^\\circ\\text{C}$", "$110^\\circ\\text{C}$", "$40^\\circ\\text{C}$", "$60^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Thermometry",
    difficulty: "easy",
    marks: 4,
    solution: "By linear scale interpolation: $\\frac{\\theta - 20}{150 - 20} = \\frac{60 - 0}{100 - 0} \\implies \\frac{\\theta - 20}{130} = 0.6 \\implies \\theta - 20 = 78 \\implies \\theta = 98^\\circ\\text{C}$."
  },
  {
    question_text: "Two solid spheres having area $A_1$ and $A_2$ at temperature $T_1$ and $T_2$ respectively are placed in vacuum. For emitting same power, [Both have same surface finish]",
    options: [
      "$\\frac{A_1}{A_2} = \\frac{T_1^4}{T_2^4}$",
      "$\\frac{A_1}{A_2} = \\left(\\frac{T_2}{T_1}\\right)^4$",
      "$\\frac{A_1}{A_2} = \\left(\\frac{T_1}{T_2}\\right)^2$",
      "$\\frac{A_1}{A_2} = \\left(\\frac{T_2}{T_1}\\right)^2$"
    ],
    correct_index: 1,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "Emitted radiant power is $P = e A \\sigma T^4$. For equal emitted power with same surface finish ($e_1 = e_2$): $A_1 T_1^4 = A_2 T_2^4 \\implies \\frac{A_1}{A_2} = \\left(\\frac{T_2}{T_1}\\right)^4$."
  },
  {
    question_text: "Let $\\lambda$ represent the ratio of mass of ice at $0^\\circ\\text{C}$ and mass of steam at $100^\\circ\\text{C}$. The temperature of the mixture when these are mixed together (for $3 < \\lambda < 8$) is",
    options: [
      "$80\\left(\\frac{8 - \\lambda}{\\lambda + 1}\\right)$",
      "$80\\left(\\frac{8 + \\lambda}{\\lambda - 1}\\right)$",
      "$80\\left(\\frac{\\lambda - 1}{\\lambda + 8}\\right)$",
      "$80\\left(\\frac{\\lambda + 8}{\\lambda + 1}\\right)$"
    ],
    correct_index: 0,
    topic: "Calorimetry",
    difficulty: "hard",
    marks: 4,
    solution: "Let steam mass be $m$ and ice mass be $\\lambda m$. In reaching equilibrium temperature $T$, heat gained by ice: $Q_{\\text{ice}} = (\\lambda m)(80) + (\\lambda m)(1)(T) = \\lambda m(80 + T)$. Heat lost by steam: $Q_{\\text{steam}} = m(540) + m(1)(100 - T) = m(640 - T)$. Equating: $\\lambda(80 + T) = 640 - T \\implies 80\\lambda + \\lambda T = 640 - T \\implies T(\\lambda + 1) = 640 - 80\\lambda = 80(8 - \\lambda) \\implies T = 80\\left(\\frac{8 - \\lambda}{\\lambda + 1}\\right)$."
  },
  {
    question_text: "The spectral emissive power $e_\\lambda$ versus wavelength $\\lambda$ curve for the radiations coming out of a black body is as shown in the figure. If $e_{\\lambda 1}$ represents maximum spectral emissive power at $\\lambda_1$ for temperature $T_1$ then on increasing the temperature, $\\lambda_1$",
    options: ["Decreases", "Increases", "Remains same", "Becomes twice"],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "easy",
    marks: 4,
    solution: "According to Wien's displacement law, $\\lambda_m T = b$. As the temperature increases, the peak wavelength $\\lambda_1$ shifts toward shorter wavelengths, hence $\\lambda_1$ decreases.",
    image_url: diagrams.q223
  },
  {
    question_text: "Two rods of same material are recast into different shape as shown in the figure. If temperature of both rods are increased then",
    options: [
      "x will increase but y will decrease",
      "x will decrease but y will increase",
      "Both x and y will increase",
      "Both x and y will decrease"
    ],
    correct_index: 2,
    topic: "Thermal Expansion",
    difficulty: "medium",
    marks: 4,
    solution: "Thermal expansion is isotropic and acts like a photographic enlargement: every linear dimension of an object, including all apertures, holes, and gaps, expands proportionally. Therefore, upon heating, both gaps $x$ and $y$ will increase.",
    image_url: diagrams.q224
  },
  {
    question_text: "The graph shown in the figure represents variation of temperature (T) of two bodies A and B having same surface area, with time (t) due to emission of radiation. Correct relation between absorptivity (a) and reflectivity (r) of the two bodies is",
    options: [
      "$a_B > a_A\\text{ and }r_B < r_A$",
      "$a_B < a_A\\text{ and }r_B < r_A$",
      "$a_B < a_A\\text{ and }r_B > r_A$",
      "$a_B > a_A\\text{ and }r_B > r_A$"
    ],
    correct_index: 0,
    topic: "Thermal Radiation",
    difficulty: "medium",
    marks: 4,
    solution: "From the cooling curve, body B cools more rapidly than body A: $|dT/dt|_B > |dT/dt|_A$, indicating higher emissivity $e_B > e_A$. By Kirchhoff's law, good emitters are good absorbers, so absorptivity $a_B > a_A$. For opaque bodies, $a + r = 1$, which implies reflectivity $r_B < r_A$. Thus $a_B > a_A$ and $r_B < r_A$.",
    image_url: diagrams.q225
  }
];

async function seedBatch2() {
  console.log(`=== Seeding ${batch2Questions.length} Batch 2 Thermal Properties Questions into Neon DB ===`);

  const chapRes = await pool.query(
    "SELECT id FROM chapters WHERE subject_id = 11 AND LOWER(TRIM(name)) = LOWER(TRIM($1))",
    ['Thermal Properties of Matter']
  );

  if (chapRes.rows.length === 0) {
    throw new Error("Chapter 'Thermal Properties of Matter' not found in Neon DB!");
  }
  const chapterId = chapRes.rows[0].id;
  console.log(`Using chapter 'Thermal Properties of Matter' (ID: ${chapterId}) in Neon DB.`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < batch2Questions.length; i++) {
    const q = batch2Questions[i];

    const dupRes = await pool.query(`
      SELECT id FROM question_bank
      WHERE category = 'Physics' AND chapter_id = $1 AND LOWER(TRIM(question_text)) = LOWER(TRIM($2))
    `, [chapterId, q.question_text]);

    if (dupRes.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${batch2Questions.length}] Skipped duplicate: "${q.question_text.slice(0, 35)}..."`);
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
    console.log(`[${i + 1}/${batch2Questions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Batch 2 Seeding Completed in Neon DB: Inserted ${inserted}, Skipped ${skipped}. Total: ${batch2Questions.length}`);
  await pool.end();
}

seedBatch2().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
