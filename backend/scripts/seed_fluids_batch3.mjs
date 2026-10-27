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

const q223DiagramUrl = 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793035000/edvedum_fluids/fluids_q223.png';

const arOptions = [
  "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "Assertion is true statement but Reason is false",
  "Both Assertion and Reason are false statements"
];

const batch3Questions = [
  // SECTION - A: Objective Type Questions (Q211 - Q223)
  {
    question_text: "When two substances of specific gravities $\\rho_1$ and $\\rho_2$ are mixed in equal volume, the specific gravity of mixture becomes 4. When they are mixed in equal masses, the specific gravity of the mixture is 3. The values of $\\rho_1$ and $\\rho_2$ are",
    options: ["$\\rho_1 = 6$ and $\\rho_2 = 2$", "$\\rho_1 = 3$ and $\\rho_2 = 5$", "$\\rho_1 = 12$ and $\\rho_2 = 4$", "$\\rho_1 = 4$ and $\\rho_2 = 4$"],
    correct_index: 0,
    topic: "Density of Mixtures",
    difficulty: "medium",
    marks: 4,
    solution: "Equal volumes: $\\frac{\\rho_1 + \\rho_2}{2} = 4 \\implies \\rho_1 + \\rho_2 = 8$.\\nEqual masses: $\\frac{2\\rho_1 \\rho_2}{\\rho_1 + \\rho_2} = 3 \\implies \\frac{2\\rho_1 \\rho_2}{8} = 3 \\implies \\rho_1 \\rho_2 = 12$.\\nSolving $x^2 - 8x + 12 = 0 \\implies (x - 6)(x - 2) = 0$, giving $\\rho_1 = 6$ and $\\rho_2 = 2$."
  },
  {
    question_text: "A uniform cube of mass $M$ floats in a liquid with three fourth of its volume immersed in the liquid of density $\\rho$. The length of the side of the cube is equal to",
    options: ["$\\frac{4M}{3\\rho}$", "$\\left(\\frac{4M}{3\\rho}\\right)^{1/3}$", "$\\left(\\frac{4M}{3\\rho}\\right)^{2/3}$", "$\\left(\\frac{3M}{4\\rho}\\right)^{1/3}$"],
    correct_index: 1,
    topic: "Hydrostatics & Flotation",
    difficulty: "medium",
    marks: 4,
    solution: "Let the side of the cube be $a$. Total volume $V = a^3$. The submerged volume is $V_{\\text{in}} = \\frac{3}{4} a^3$. In equilibrium, weight equals buoyant force: $Mg = V_{\\text{in}} \\rho g = \\frac{3}{4} a^3 \\rho g \\implies a^3 = \\frac{4M}{3\\rho} \\implies a = \\left(\\frac{4M}{3\\rho}\\right)^{1/3}$."
  },
  {
    question_text: "A human heart pumps 60 millilitre of blood per heart beat at a pressure of 100 mm of Hg. If the heart beats at 72 per minute then average pumping power of the heart is",
    options: ["2 W", "4.5 W", "0.98 W", "6.3 W"],
    correct_index: 2,
    topic: "Hydrodynamics & Work/Power",
    difficulty: "hard",
    marks: 4,
    solution: "Volume rate of flow is $\\frac{dV}{dt} = \\frac{72 \\times (60 \\times 10^{-6}\\text{ m}^3)}{60\\text{ s}} = 7.2 \\times 10^{-5}\\text{ m}^3/\\text{s}$.\\nPressure $P = h \\rho_{\\text{Hg}} g = 0.1\\text{ m} \\times 13600\\text{ kg/m}^3 \\times 9.8\\text{ m/s}^2 = 13328\\text{ N/m}^2$.\\nPower $= P \\times \\frac{dV}{dt} = 13328 \\times 7.2 \\times 10^{-5} \\approx 0.9596\\text{ W} \\approx 0.98\\text{ W}$."
  },
  {
    question_text: "A piece of gold of density $19.3\\text{ g/cm}^3$ weighs 38.2 gram in air and 36.2 gram in water. The volume of cavity in the gold is",
    options: ["$0.02\\text{ cm}^3$", "$0.2\\text{ cm}^3$", "$2\\text{ cm}^3$", "$20\\text{ cm}^3$"],
    correct_index: 0,
    topic: "Archimedes' Principle & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Loss of weight in water $= 38.2 - 36.2 = 2.0\\text{ g}$. Total external volume of the piece is $V = \\frac{2.0\\text{ g}}{1.0\\text{ g/cm}^3} = 2.0\\text{ cm}^3$. Volume of the gold material alone is $V_m = \\frac{38.2\\text{ g}}{19.3\\text{ g/cm}^3} \\approx 1.979\\text{ cm}^3$. Therefore, cavity volume $V_c = V - V_m = 2.0 - 1.979 = 0.021\\text{ cm}^3 \\approx 0.02\\text{ cm}^3$."
  },
  {
    question_text: "A stone of relative density $k$ is released from rest on the surface of a lake. The acceleration by which stone sinks in water is (neglecting the viscous force)",
    options: ["$g(1 + k)$", "$g\\left(1 - \\frac{1}{k}\\right)$", "$g\\left(1 + \\frac{1}{k}\\right)$", "$g(1 - k)$"],
    correct_index: 1,
    topic: "Buoyancy & Dynamics",
    difficulty: "medium",
    marks: 4,
    solution: "The downward gravitational force is $W = mg = V \\rho_s g$. Upthrust is $U = V \\rho_w g$. Net downward force is $F_{\\text{net}} = W - U = V (\\rho_s - \\rho_w) g$. Acceleration is $a = \\frac{F_{\\text{net}}}{m} = \\frac{V(\\rho_s - \\rho_w)g}{V \\rho_s} = g\\left(1 - \\frac{\\rho_w}{\\rho_s}\\right) = g\\left(1 - \\frac{1}{k}\\right)$."
  },
  {
    question_text: "A body floats in water with its one-third volume above the surface. The same body floats in a liquid with one-third volume immersed. The density of the liquid (in kg/m$^3$) is",
    options: ["9000", "2000", "3000", "1500"],
    correct_index: 1,
    topic: "Hydrostatics & Flotation",
    difficulty: "medium",
    marks: 4,
    solution: "In water, submerged fraction is $1 - 1/3 = 2/3$, so $\\rho_b = \\frac{2}{3} \\rho_w = \\frac{2000}{3}\\text{ kg/m}^3$. In the liquid, submerged fraction is $1/3$, so $\\frac{1}{3} V \\rho_L g = V \\rho_b g \\implies \\rho_L = 3\\rho_b = 3 \\left(\\frac{2000}{3}\\right) = 2000\\text{ kg/m}^3$."
  },
  {
    question_text: "The work done in blowing a soap bubble of radius 100 mm with surface tension $0.03\\text{ N m}^{-1}$ is",
    options: ["$7.5 \\times 10^{-2}\\text{ J}$", "$7.5 \\times 10^{-3}\\text{ J}$", "$7.5\\text{ J}$", "$75\\text{ J}$"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "A soap bubble has two free surfaces. Radius $R = 100\\text{ mm} = 0.1\\text{ m}$. Increase in surface area $\\Delta A = 2 \\times (4\\pi R^2) = 8\\pi R^2 = 8\\pi (0.1)^2 = 0.08\\pi\\text{ m}^2$. Work done $W = T \\Delta A = 0.03 \\times 0.08\\pi \\approx 0.00754\\text{ J} = 7.5 \\times 10^{-3}\\text{ J}$."
  },
  {
    question_text: "A steel ball of mass $M$ falls in a viscous liquid with terminal velocity $v$. Now a steel ball of mass $8M$ will fall in the same liquid with terminal velocity",
    options: ["$4v$", "$3v$", "$2v$", "$v$"],
    correct_index: 0,
    topic: "Stokes' Law & Terminal Velocity",
    difficulty: "easy",
    marks: 4,
    solution: "Since mass $M = \\frac{4}{3}\\pi R^3 \\rho \\propto R^3$, an 8-fold mass corresponds to a radius $R' = (8)^{1/3} R = 2R$. Terminal velocity is proportional to $R^2$ ($v_T \\propto R^2$). Thus $v' = (2)^2 v = 4v$."
  },
  {
    question_text: "A water tank is kept on a table of height $H$. If a small orifice is pierced at the side of the tank near its base, it is found that the water stream strikes the ground at a horizontal distance $X$ from the tank. The depth of water in the tank is",
    options: ["$\\frac{X^2}{H}$", "$\\frac{X^2}{2H}$", "$\\frac{X^2}{4H}$", "$\\frac{2X^2}{H}$"],
    correct_index: 2,
    topic: "Torricelli's Law of Efflux",
    difficulty: "medium",
    marks: 4,
    solution: "Efflux velocity is $v = \\sqrt{2gh}$ where $h$ is depth of water. Time taken by the stream to fall height $H$ is $t = \\sqrt{\\frac{2H}{g}}$. The horizontal range is $X = vt = \\sqrt{2gh} \\sqrt{\\frac{2H}{g}} = 2\\sqrt{hH} \\implies X^2 = 4hH \\implies h = \\frac{X^2}{4H}$."
  },
  {
    question_text: "A water jet comes with velocity 10 m/s from the pipe cross-sectional area $2\\text{ cm}^2$. The jet hits a perpendicular plate and water drops dead after hitting. The force experienced by the plate is (water density = $1000\\text{ kg/m}^3$)",
    options: ["20 N", "40 N", "60 N", "2 N"],
    correct_index: 0,
    topic: "Hydrodynamics & Momentum",
    difficulty: "medium",
    marks: 4,
    solution: "Force exerted by the jet is the rate of change of momentum: $F = \\frac{dp}{dt} = v \\frac{dm}{dt} = \\rho A v^2 = 1000 \\times (2 \\times 10^{-4}\\text{ m}^2) \\times (10)^2 = 20\\text{ N}$."
  },
  {
    question_text: "The volume flow rate of a liquid flowing out of an orifice at the bottom of a tank does not depend on",
    options: ["Density of the liquid", "Height of liquid above orifice", "Acceleration due to gravity", "Radius of the orifice"],
    correct_index: 0,
    topic: "Torricelli's Law of Efflux",
    difficulty: "easy",
    marks: 4,
    solution: "Volume flow rate is $Q = A v = (\\pi r^2)\\sqrt{2gh}$. It depends on the orifice radius $r$, liquid depth $h$, and gravitational acceleration $g$, but is independent of the density of the liquid."
  },
  {
    question_text: "Pressure on a swimmer at depth $H$ below free surface of water is 3 atm. Then $H$ is [Take $g = 10\\text{ m/s}^2$]",
    options: ["10 m", "30 m", "20 m", "50 m"],
    correct_index: 2,
    topic: "Hydrostatic Pressure",
    difficulty: "easy",
    marks: 4,
    solution: "Total pressure $P = P_0 + \\rho g H = 3\\text{ atm} \\implies \\rho g H = 2\\text{ atm} = 2 \\times 10^5\\text{ Pa} \\implies H = \\frac{2 \\times 10^5}{1000 \\times 10} = 20\\text{ m}$."
  },
  {
    question_text: "Two soap bubbles are connected by a tube as shown in figure. Then which of the following statement is true?",
    options: ["Volume of A will increase", "Volume of A will remain constant", "Volume of B will increase", "Volume of B will decrease"],
    correct_index: 2,
    image_url: q223DiagramUrl,
    topic: "Surface Tension & Excess Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "Excess pressure inside a soap bubble is $\\Delta P = \\frac{4T}{r}$. Since bubble A is smaller than bubble B ($r_A < r_B$), the pressure inside A is greater than in B ($P_A > P_B$). When valve S is opened, air flows from smaller bubble A to bigger bubble B, causing A to shrink and the volume of B to increase."
  },

  // SECTION - B: Assertion - Reason Type Questions (1 - 24)
  {
    question_text: "Assertion (A): Sudden fall of pressure at a place indicates storm.\\nReason (R): Air of low pressure zone rushes away to high pressure zone.",
    options: arOptions,
    correct_index: 2,
    topic: "Atmospheric Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "A sudden drop in atmospheric pressure indicates an approaching storm because surrounding air from high pressure zones will rush in rapidly. The Reason states that air rushes away from low to high pressure, which is false (air flows from high to low pressure). Thus Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): If a simple barometer is brought to the surface of moon, the length of mercury column will become zero.\\nReason (R): There is no atmosphere on the moon.",
    options: arOptions,
    correct_index: 0,
    topic: "Atmospheric Pressure & Barometer",
    difficulty: "easy",
    marks: 4,
    solution: "The height of mercury in a barometer is supported by atmospheric pressure ($P_0 = \\rho g h$). Because the moon has no atmosphere, $P_0 = 0$, so the mercury level in the tube falls to zero. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): When an ice cube floats in kerosene, then the liquid level in the vessel will fall when ice melts.\\nReason (R): Density of ice is smaller than that of water.",
    options: arOptions,
    correct_index: 1,
    topic: "Archimedes' Principle & Flotation",
    difficulty: "hard",
    marks: 4,
    solution: "Volume of kerosene displaced by floating ice is $V_{\\text{dis}} = \\frac{m}{\\rho_{\\text{kerosene}}}$. When ice melts, it becomes water of volume $V_{\\text{water}} = \\frac{m}{\\rho_{\\text{water}}}$. Since $\\rho_{\\text{water}} > \\rho_{\\text{kerosene}}$, the volume of melted water is less than the displaced volume of kerosene, so the level falls. Both Assertion and Reason are true, but the reason level falls is because water is denser than kerosene, not water denser than ice."
  },
  {
    question_text: "Assertion (A): When a piece of ice floating in water melts completely the levels remains same.\\nReason (R): Ice has density lesser than water.",
    options: arOptions,
    correct_index: 1,
    topic: "Archimedes' Principle & Flotation",
    difficulty: "medium",
    marks: 4,
    solution: "A piece of ice floats in water by displacing a mass of water equal to its own mass ($m = V_{\\text{dis}} \\rho_w$). When melted, the resulting water has mass $m$ and occupies exact volume $V = m/\\rho_w = V_{\\text{dis}}$. Hence liquid level remains identical. Both statements are true, but Reason is not the complete explanation for why the levels remain unchanged."
  },
  {
    question_text: "Assertion (A): The velocity of a liquid flowing in a broader pipe increases, when it enters a narrow pipe.\\nReason (R): According to equation of continuity, the product of area and velocity is constant.",
    options: arOptions,
    correct_index: 0,
    topic: "Equation of Continuity",
    difficulty: "easy",
    marks: 4,
    solution: "By the continuity equation $A v = \\text{constant}$, when cross-sectional area $A$ decreases, flow velocity $v$ must increase. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Bernoulli's theorem holds for non-viscous and incompressible fluids.\\nReason (R): For the streamline flow of an ideal liquid, the total energy per unit mass remains constant.",
    options: arOptions,
    correct_index: 0,
    topic: "Bernoulli's Theorem",
    difficulty: "easy",
    marks: 4,
    solution: "Bernoulli's theorem is the law of conservation of mechanical energy for steady, streamline flow of an ideal (incompressible and non-viscous) fluid. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Blood pressure in human being is greater at the feet than at the brain.\\nReason (R): Pressure depends on height.",
    options: arOptions,
    correct_index: 0,
    topic: "Hydrostatic Pressure",
    difficulty: "easy",
    marks: 4,
    solution: "Hydrostatic pressure in a fluid column increases with vertical depth: $P = P_0 + \\rho g h$. The feet are at a greater vertical depth below the heart than the brain, resulting in higher hydrostatic blood pressure at the feet. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Machine parts are jammed in winter.\\nReason (R): The viscosity of lubricant used in machine parts decreases at low temperature.",
    options: arOptions,
    correct_index: 2,
    topic: "Viscosity",
    difficulty: "medium",
    marks: 4,
    solution: "In winter (low temperatures), the viscosity of liquid lubricants increases significantly, increasing frictional drag and jamming machine parts. The Reason incorrectly claims viscosity decreases at low temperature. Thus Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): The shape of small liquid drop is spherical.\\nReason (R): The pressure inside the drop is greater than that outside.",
    options: arOptions,
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Small liquid drops assume a spherical shape because surface tension minimizes surface area for a given volume, and a sphere has the minimum surface-area-to-volume ratio. While it is true that internal pressure exceeds external pressure, that is a consequence of surface tension rather than the cause of spherical shape. Both are true, but Reason is not the correct explanation."
  },
  {
    question_text: "Assertion (A): When liquid is flowing through a horizontal tube of variable cross section, the pressure at the narrow part is less than the pressure at wider part.\\nReason (R): Pressure is inversely proportional to area of cross section.",
    options: arOptions,
    correct_index: 2,
    topic: "Bernoulli's Theorem & Continuity",
    difficulty: "hard",
    marks: 4,
    solution: "By continuity $v \\propto 1/A$, so velocity is higher in the narrow section. By Bernoulli's theorem ($P + \\frac{1}{2}\\rho v^2 = \\text{const}$), higher velocity corresponds to lower pressure. However, pressure is NOT inversely proportional to area ($P$ does not scale as $1/A$). Therefore, Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): When temperature of a liquid increases, its viscosity decreases.\\nReason (R): Increase of temperature of liquid decreases the surface tension.",
    options: arOptions,
    correct_index: 1,
    topic: "Viscosity & Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Both statements are true: with increasing temperature, liquid viscosity decreases and surface tension decreases. However, the decrease in surface tension does not explain the decrease in viscosity (viscosity decreases because thermal agitation weakens cohesive bonds). Reason is not the correct explanation."
  },
  {
    question_text: "Assertion (A): If a barometer accelerates upwards the level of mercury in the tube of barometer will decrease.\\nReason (R): The effective value of g will increase, so upthrust will increase.",
    options: arOptions,
    correct_index: 2,
    topic: "Barometer & Accelerated Frames",
    difficulty: "hard",
    marks: 4,
    solution: "When accelerating upward with acceleration $a$, effective gravity becomes $g_{\\text{eff}} = g + a$. Atmospheric pressure balances the column: $P_0 = \\rho (g + a) h \\implies h = \\frac{P_0}{\\rho(g+a)}$, so height $h$ decreases. The Assertion is true. However, the Reason attributing this to buoyant upthrust is false. Hence Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Viscosity of gases increase with the rise in temperature.\\nReason (R): On increasing temperature, there is diffusion of gases from one moving layer to the other due to their random motion.",
    options: arOptions,
    correct_index: 0,
    topic: "Viscosity of Gases",
    difficulty: "medium",
    marks: 4,
    solution: "In gases, viscosity arises from the transport of momentum across layers due to random molecular thermal motion and diffusion. As temperature rises, average molecular speed increases ($\\bar{v} \\propto \\sqrt{T}$), accelerating momentum transfer and increasing gas viscosity. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): When air blows over the roof of a house, the force on the roof is upward.\\nReason (R): Pressure below the roof is more than above the roof.",
    options: arOptions,
    correct_index: 0,
    topic: "Bernoulli's Principle & Dynamic Lift",
    difficulty: "easy",
    marks: 4,
    solution: "By Bernoulli's principle, high velocity wind blowing over the roof reduces air pressure above the roof ($P_{\\text{above}} < P_{\\text{below}}$). The higher atmospheric pressure inside the house creates a net upward force on the roof. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): When kerosene is sprinkled on water, water surface may not support the weight of insects and insects may sink into water sprinkled.\\nReason (R): On sprinkling kerosene on water, surface tension of water decreases.",
    options: arOptions,
    correct_index: 0,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Sprinkling kerosene on water sharply reduces its surface tension. Consequently, the stretched membrane effect can no longer provide the necessary upward force to support the insects' weight, causing them to sink. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): When eight identical drops of water each of radius $r$ coalesce to form a big drop, the energy released is $16\\pi r^2 T$, where $T$ = Surface tension.\\nReason (R): The surface energy of a drop of surface tension $T$ is directly proportional to the surface area.",
    options: arOptions,
    correct_index: 0,
    topic: "Surface Energy",
    difficulty: "medium",
    marks: 4,
    solution: "For 8 drops coalescing into one, radius of big drop is $R = (8)^{1/3} r = 2r$. Initial surface area $A_i = 8 \\times 4\\pi r^2 = 32\\pi r^2$. Final surface area $A_f = 4\\pi R^2 = 4\\pi (2r)^2 = 16\\pi r^2$. Energy released $= T(A_i - A_f) = 16\\pi r^2 T$. Since surface energy is directly proportional to surface area ($U = T \\times A$), both are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Pressure exerted by atmosphere at sea level is 1 atm ($1.013 \\times 10^5\\text{ Pa}$).\\nReason (R): [ML$^{-1}$T$^{-2}$] is the dimensional formula for pressure.",
    options: arOptions,
    correct_index: 1,
    topic: "Atmospheric Pressure & Dimensions",
    difficulty: "easy",
    marks: 4,
    solution: "Both statements are individually correct facts, but the dimensional formula of pressure is not the explanation for the numerical magnitude of standard atmospheric pressure at sea level. Hence both are true but Reason is not the correct explanation."
  },
  {
    question_text: "Assertion (A): Stress is defined as deforming force per unit area.\\nReason (R): SI unit of stress is Pascal (Pa).",
    options: arOptions,
    correct_index: 1,
    topic: "Elasticity & Stress",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are true statements, but the unit of stress does not explain its fundamental definition. Reason is not the correct explanation."
  },
  {
    question_text: "Assertion (A): When a body attains terminal velocity while falling freely in a fluid, is weighed by some means, the reading shows a zero quantity.\\nReason (R): Once a body attains terminal velocity, viscous force and buoyant force acting on it will be equal to force acting on it due to gravity.",
    options: arOptions,
    correct_index: 0,
    topic: "Terminal Velocity",
    difficulty: "hard",
    marks: 4,
    solution: "At terminal velocity, the upward viscous drag and buoyant force completely balance the downward gravitational force ($F_v + U = mg$). The net force and acceleration are zero, resulting in apparent weightlessness with respect to the fluid medium. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Stokes law explains that the frictional force acting on a almost spherical body moving in a fluid is dependent on its velocity and acts in opposite direction to the direction on motion of the body.\\nReason (R): $F(\\text{viscous force}) = -6\\pi\\eta r v$, where $r$ is the radius of the body, $\\eta$ is the coefficient of viscosity, and $v$ indicates the velocity of the body at that instant.",
    options: arOptions,
    correct_index: 0,
    topic: "Stokes' Law",
    difficulty: "easy",
    marks: 4,
    solution: "Stokes' law mathematically states $\\vec{F} = -6\\pi\\eta r \\vec{v}$, showing that the viscous retarding force on a spherical particle is directly proportional to its velocity and opposes motion. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Surface energy of the liquid is reduced if the molecules of the liquid and solid surface repel each other.\\nReason (R): Surface energy of the liquid molecules is dependent on how the liquid molecules are interacting with the solid with which they are in contact with.",
    options: arOptions,
    correct_index: 2,
    topic: "Surface Energy & Interfacial Tension",
    difficulty: "hard",
    marks: 4,
    solution: "If solid and liquid molecules repel each other, work must be done against repulsion to bring liquid molecules into contact, increasing the interfacial surface energy (not reducing it). Thus Assertion is false. Reason is true. By standard marking, when Assertion is false, option is (3) or (4)."
  },
  {
    question_text: "Assertion (A): Surface energy of the liquid is reduced if the molecules of the liquid and solid surface attract each other.\\nReason (R): Surface energy of the liquid molecules is dependent on how the liquid molecules are interacting with the solid with which they are in contact with.",
    options: arOptions,
    correct_index: 0,
    topic: "Surface Energy & Interfacial Tension",
    difficulty: "medium",
    marks: 4,
    solution: "When liquid and solid molecules attract each other (strong adhesive forces), the potential energy of the molecules at the interface decreases, thereby reducing interfacial surface energy. Both Assertion and Reason are true and Reason is the correct explanation."
  },
  {
    question_text: "Assertion (A): Angle of contact ($\\theta$) can determine whether a liquid sticks to the surface or not.\\nReason (R): If $\\theta$ is acute, liquid doesn't wet the surface, but if $\\theta$ is obtuse liquid wets the surface.",
    options: arOptions,
    correct_index: 2,
    topic: "Angle of Contact & Meniscus",
    difficulty: "medium",
    marks: 4,
    solution: "Assertion is true: contact angle determines wetting behavior. However, the Reason is completely inverted: an acute angle ($\\theta < 90^\\circ$) means the liquid wets the surface, whereas an obtuse angle ($\\theta > 90^\\circ$) means the liquid does not wet the surface. Thus Assertion is true but Reason is false."
  },
  {
    question_text: "Assertion (A): Rain drops are almost spherical in shape because of surface tension.\\nReason (R): Surface tension tries to acquire minimum surface area for a given volume.",
    options: arOptions,
    correct_index: 0,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Surface tension causes liquids to minimize their exposed surface area. For a given volume, a sphere possesses the minimum possible surface area. Therefore, raindrops adopt a spherical shape. Both Assertion and Reason are true and Reason is the correct explanation."
  }
];

async function seedBatch3() {
  console.log(`Connecting to Neon DB to seed ${batch3Questions.length} batch 3 questions...`);
  
  const chapRes = await pool.query(`
    SELECT id, name FROM chapters 
    WHERE subject_id = 11 AND name ILIKE '%Mechanical Properties of Fluids%'
    LIMIT 1
  `);
  
  if (chapRes.rows.length === 0) {
    throw new Error("Chapter 'Mechanical Properties of Fluids' not found in Neon DB!");
  }
  const chapterId = chapRes.rows[0].id;
  console.log(`Using chapter ID: ${chapterId} (${chapRes.rows[0].name})`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < batch3Questions.length; i++) {
    const q = batch3Questions[i];
    
    // Check duplicate in DB
    const dupRes = await pool.query(`
      SELECT id FROM question_bank
      WHERE category = 'Physics' AND chapter_id = $1 AND LOWER(TRIM(question_text)) = LOWER(TRIM($2))
    `, [chapterId, q.question_text]);

    if (dupRes.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${batch3Questions.length}] Skipped duplicate: "${q.question_text.slice(0, 35)}..."`);
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
      'Mechanical Properties of Fluids',
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
    console.log(`[${i + 1}/${batch3Questions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Neon DB Batch 3 Seeding Completed: Inserted ${inserted}, Skipped ${skipped}. Total: ${batch3Questions.length}`);
  await pool.end();
}

seedBatch3().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
