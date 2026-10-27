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
  fs.readFileSync(path.resolve(__dirname, 'fluids_diagrams_batch2.json'), 'utf-8')
);

const batch2Questions = [
  // Page 1: Q105 - Q122
  {
    question_text: "A mercury drop does not spread on a glass plate because the angle of contact between glass and mercury is",
    options: ["Acute", "Obtuse", "Zero", "90°"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Mercury does not wet glass because cohesive forces between mercury molecules exceed adhesive forces between mercury and glass. Consequently, the meniscus is convex and the angle of contact is obtuse ($\\theta > 90^\\circ$)."
  },
  {
    question_text: "Velocity of water in a river is",
    options: ["Same everywhere", "More in the middle and less near its banks", "Less in middle and more at banks", "Increases from one bank to other"],
    correct_index: 1,
    topic: "Viscosity",
    difficulty: "easy",
    marks: 4,
    solution: "Due to viscous drag from the river banks and bottom bed, water moves slowest near the banks and fastest near the central free surface."
  },
  {
    question_text: "A body of density $800\\text{ kg/m}^3$ is floating on water surface. If the system is accelerated upward, then the fraction of volume immersed will",
    options: ["Increase", "Decrease", "Remain the same", "Become zero"],
    correct_index: 2,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Fraction of volume immersed is given by $f = \\frac{V_{\\text{in}}}{V} = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{liquid}}}$. Since effective gravity $g_{\\text{eff}} = g + a$ cancels out from both the buoyant force and weight, the fraction immersed remains unchanged."
  },
  {
    question_text: "A steel ball is dropped on water surface from zero height. The variation of the viscous force with time on the ball can be represented as",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 1,
    image_url: diagrams.q108,
    topic: "Viscosity & Terminal Velocity",
    difficulty: "medium",
    marks: 4,
    solution: "Viscous force is $F_v = 6\\pi \\eta r v$. As the ball accelerates downward, its velocity increases according to $v = v_T(1 - e^{-t/\\tau})$, asymptotically approaching terminal velocity $v_T$. Hence, viscous force also increases asymptotically towards a maximum constant value, represented by graph (2)."
  },
  {
    question_text: "The 15% volume of a cubical block is outside water. The relative density of the block is",
    options: ["0.15", "0.30", "0.60", "0.85"],
    correct_index: 3,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "easy",
    marks: 4,
    solution: "If 15% of the block is outside water, then $(100 - 15)\\% = 85\\%$ is submerged. By flotation, $\\text{Relative Density} = \\frac{V_{\\text{in}}}{V} = 0.85$."
  },
  {
    question_text: "A body with air cavity loses one third of weight when immersed in water. If relative density of the material of body is 6, then the ratio of the volume of cavity to the volume of the body is",
    options: ["1/2", "2/3", "3/4", "4/5"],
    correct_index: 0,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "hard",
    marks: 4,
    solution: "Let $V$ be total external volume and $V_c$ be cavity volume. Material volume is $V_m = V - V_c$. Weight in air is $W = (V - V_c)(6\\rho_w)g$. Upthrust in water is $U = V \\rho_w g = \\frac{1}{3}W = 2(V - V_c)\\rho_w g \\implies V = 2V - 2V_c \\implies V = 2V_c \\implies \\frac{V_c}{V} = \\frac{1}{2}$."
  },
  {
    question_text: "An incompressible liquid is flowing through horizontal pipe having branches of area $A$, $0.4A$ and $0.5A$ as shown in figure. Then value of $v$ is",
    options: ["3.2 m/s", "6.4 m/s", "1.6 m/s", "0.8 m/s"],
    correct_index: 1,
    image_url: diagrams.q111,
    topic: "Equation of Continuity",
    difficulty: "medium",
    marks: 4,
    solution: "By the equation of continuity: $A_1 v_1 = A_2 v_2 + A_3 v_3 \\implies A(4) = (0.4A)(2) + (0.5A)(v) \\implies 4 = 0.8 + 0.5v \\implies 0.5v = 3.2 \\implies v = 6.4\\text{ m/s}$."
  },
  {
    question_text: "A rain drop started falling in static air. Which of the following represents its acceleration $a$ versus time $t$ graph?",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 0,
    image_url: diagrams.q112,
    topic: "Viscosity & Terminal Velocity",
    difficulty: "medium",
    marks: 4,
    solution: "The equation of motion is $ma = mg' - 6\\pi\\eta r v$. As velocity increases, viscous drag increases and net acceleration decays exponentially towards zero ($a \\to 0$ as $t \\to \\infty$), corresponding to graph (1)."
  },
  {
    question_text: "Two spherical soap bubbles of radii 3 cm and 4 cm came in contact externally. Radius of curvature of the common surface is",
    options: ["12 cm", "7 cm", "5 cm", "12/7 cm"],
    correct_index: 0,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Radius of curvature of the common interface between two bubbles is $R = \\frac{r_1 r_2}{r_2 - r_1} = \\frac{3 \\times 4}{4 - 3} = 12\\text{ cm}$."
  },
  {
    question_text: "Which of the following graphs correctly shows the variation in kinetic energy (KE) of a metal sphere falling freely in a lake? Assume sufficient depth of the lake to impart terminal velocity to the sphere ($d$ : depth)",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 1,
    image_url: diagrams.q114,
    topic: "Viscosity & Terminal Velocity",
    difficulty: "medium",
    marks: 4,
    solution: "As the sphere falls through the viscous liquid, its speed increases asymptotically towards terminal speed $v_T$. Hence kinetic energy $\\text{KE} = \\frac{1}{2}mv^2$ increases and levels off to a constant value $\\frac{1}{2}mv_T^2$, matching graph (2)."
  },
  {
    question_text: "A sphere of mass 40 g in air has a cavity of volume $35\\text{ cm}^3$. It just floats in water. The specific gravity of material of the sphere is",
    options: ["2", "4", "6", "8"],
    correct_index: 3,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Total volume $V = V_m + 35$. Since it just floats, weight equals upthrust: $40\\text{ g} = V \\times 1\\text{ g/cm}^3 \\implies V = 40\\text{ cm}^3$. Material volume $V_m = 40 - 35 = 5\\text{ cm}^3$. Specific gravity $= \\frac{40}{5} = 8$."
  },
  {
    question_text: "The amount of work done to form a soap bubble of radius $R$ is [$S$ = surface tension of soap bubble]",
    options: ["$8\\pi R^2 S$", "$\\frac{3}{2}\\pi R^2 S$", "$24\\pi R^2 S$", "$4\\pi R^2 S$"],
    correct_index: 0,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "A soap bubble has two free surfaces (inner and outer). Total increase in surface area is $\\Delta A = 2 \\times (4\\pi R^2) = 8\\pi R^2$. Therefore, work done $W = S \\Delta A = 8\\pi R^2 S$."
  },
  {
    question_text: "A liquid is filled in a container as shown in the figure. The force exerted by the liquid on the base of the container must be",
    options: ["Equal to weight of the liquid", "More than the weight of the liquid", "Less than the weight of the liquid", "More or less than the weight of the liquid"],
    correct_index: 1,
    image_url: diagrams.q117,
    topic: "Hydrostatic Paradox",
    difficulty: "medium",
    marks: 4,
    solution: "Pressure at base depends on depth $h$: $P = \\rho g h$. Force on base is $F = P \\times A_{\\text{base}} = \\rho g h A_{\\text{base}}$. For a flask with a narrow neck, $A_{\\text{base}} h > \\text{Volume of liquid}$, so the force on the base is more than the actual weight of liquid."
  },
  {
    question_text: "When two water droplets coalesce to form a large droplet",
    options: ["Energy is absorbed", "Energy is released", "No change in energy takes place", "Energy may be absorbed or released"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "When droplets coalesce, total surface area decreases ($\\Delta A < 0$). Surface potential energy decreases and is released as heat energy."
  },
  {
    question_text: "A U tube is partially filled with water. Oil which is immiscible with water is poured into one side, until the water rises by 25 cm on the other side. If the oil level is 12.5 cm higher than the water level, then the relative density of oil is",
    options: ["0.3", "0.5", "0.8", "1.2"],
    correct_index: 2,
    topic: "Hydrostatics & Manometer",
    difficulty: "hard",
    marks: 4,
    solution: "Difference in water levels in the two arms is $h_w = 25 + 25 = 50\\text{ cm}$. Height of oil column is $h_o = 50 + 12.5 = 62.5\\text{ cm}$. Equating pressures at datum: $h_o \\rho_o g = h_w \\rho_w g \\implies \\frac{\\rho_o}{\\rho_w} = \\frac{50}{62.5} = 0.8$."
  },
  {
    question_text: "An aeroplane of total wing area of $120\\text{ m}^2$ is in a level flight at some height. If pressure difference in upper and lower surface is 2.5 kPa, then the mass of the aeroplane is [Take $g = 10\\text{ m/s}^2$]",
    options: ["$2 \\times 10^4\\text{ kg}$", "$3 \\times 10^4\\text{ kg}$", "$5 \\times 10^4\\text{ kg}$", "$6 \\times 10^4\\text{ kg}$"],
    correct_index: 1,
    topic: "Aerodynamic Lift & Bernoulli's Principle",
    difficulty: "medium",
    marks: 4,
    solution: "Dynamic lift equals the weight of the plane: $\\Delta P \\times A = mg \\implies m = \\frac{2500 \\times 120}{10} = 30000\\text{ kg} = 3 \\times 10^4\\text{ kg}$."
  },
  {
    question_text: "An air bubble of radius $r$ in water is at certain depth below the water surface. If $P$ is the pressure inside the bubble, then the depth below the water surface is [$P_0$ = Atmospheric pressure, $\\rho$ = Density of water, $T$ = surface tension of water]",
    options: ["$\\frac{P - P_0}{\\rho g} - \\frac{2T}{r \\rho g}$", "$\\frac{P + P_0}{\\rho g} + \\frac{2T}{r \\rho g}$", "$\\frac{P - P_0}{\\rho g} + \\frac{2T}{r \\rho g}$", "$\\frac{P - P_0}{\\rho g} - \\frac{T}{2r \\rho g}$"],
    correct_index: 0,
    topic: "Surface Tension & Hydrostatic Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "Pressure inside an air bubble in water at depth $h$ is $P = P_0 + \\rho g h + \\frac{2T}{r} \\implies \\rho g h = P - P_0 - \\frac{2T}{r} \\implies h = \\frac{P - P_0}{\\rho g} - \\frac{2T}{r \\rho g}$."
  },
  {
    question_text: "A block weighs 5 N in air, 4.6 N in a liquid of specific gravity 0.5. Its weight in water will be",
    options: ["3.5 N", "4.2 N", "2.5 N", "3.0 N"],
    correct_index: 1,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Upthrust in liquid: $U_L = 5 - 4.6 = 0.4\\text{ N} = V \\rho_L g = V (0.5 \\rho_w) g$. Hence upthrust in water $U_w = V \\rho_w g = \\frac{0.4}{0.5} = 0.8\\text{ N}$. Weight in water = $5 - 0.8 = 4.2\\text{ N}$."
  },

  // Page 2: Q127 - Q149
  {
    question_text: "The surface tension of a liquid is $5\\text{ N/m}$. If a film is held on a ring of area $0.02\\text{ m}^2$, then its total surface energy is about",
    options: ["$3 \\times 10^{-2}\\text{ J}$", "$2 \\times 10^{-1}\\text{ J}$", "$3 \\times 10^{-3}\\text{ J}$", "$10^{-1}\\text{ J}$"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "A liquid film on a ring has two free surfaces. Total surface energy $U = 2 \\times T \\times A = 2 \\times 5 \\times 0.02 = 0.2\\text{ J} = 2 \\times 10^{-1}\\text{ J}$."
  },
  {
    question_text: "When flat disc is thrown from a height in such a manner that it is rotating in horizontal plane. The range of disc is maximum due to",
    options: ["Air drag", "Initial rotational kinetic energy", "Less in weight due to rotation", "Upward force due to air"],
    correct_index: 3,
    topic: "Bernoulli's Principle & Magnus Effect",
    difficulty: "medium",
    marks: 4,
    solution: "A rotating spinning disc generates aerodynamic lift due to Bernoulli's principle / dynamic lift, delaying its descent and maximizing horizontal range."
  },
  {
    question_text: "A liquid filled in a container has plane meniscus. If $\\theta$ is angle of contact, then",
    options: ["$\\theta = 0^\\circ$", "$\\theta = 90^\\circ$", "$\\theta < 90^\\circ$", "$\\theta = 180^\\circ$"],
    correct_index: 1,
    topic: "Surface Tension & Meniscus",
    difficulty: "easy",
    marks: 4,
    solution: "A plane liquid meniscus occurs when adhesive force equals cohesive force divided by $\\sqrt{2}$, making the resultant force vertically downward, so the angle of contact is $\\theta = 90^\\circ$."
  },
  {
    question_text: "It is not possible to drink water on the surface of moon with a straw because",
    options: ["Gravity is less on the surface of moon than earth", "Moon has no atmosphere", "Surface tension of water decreases on moon's surface", "Both (1) & (2)"],
    correct_index: 1,
    topic: "Atmospheric Pressure",
    difficulty: "easy",
    marks: 4,
    solution: "Drinking with a straw relies on atmospheric pressure pushing the liquid up when air is sucked out. Since the moon has no atmosphere, water cannot rise in the straw."
  },
  {
    question_text: "A solid is suspended from an independent support in a liquid placed on a weighing machine, due to which the weight of liquid",
    options: ["Increases", "Decreases", "Remains unchanged", "May increase or decrease"],
    correct_index: 0,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "By Newton's third law, the liquid exerts an upward buoyant force on the solid, and the solid exerts an equal and opposite downward reaction force on the liquid, increasing the reading of the weighing machine."
  },
  {
    question_text: "The relative velocity of two adjacent layers of a liquid is 6 cm/s and perpendicular distance between layers is 0.1 mm. The velocity gradient for liquid (in per second) is",
    options: ["6", "0.6", "0.06", "600"],
    correct_index: 3,
    topic: "Viscosity",
    difficulty: "easy",
    marks: 4,
    solution: "Velocity gradient $= \\frac{\\Delta v}{\\Delta x} = \\frac{6\\text{ cm/s}}{0.1\\text{ mm}} = \\frac{0.06\\text{ m/s}}{10^{-4}\\text{ m}} = 600\\text{ s}^{-1}$."
  },
  {
    question_text: "An air filled spherical balloon of radius 10 cm is at a depth of 100 m below the water surface in an ocean. The normal stress on the surface of balloon is (Neglect surface tension). [Take $g = 10\\text{ m/s}^2$ and $1\\text{ atm} = 10^5\\text{ Pa}$]",
    options: ["$10 \\times 10^5\\text{ N/m}^2$", "$5 \\times 10^5\\text{ N/m}^2$", "$11 \\times 10^5\\text{ N/m}^2$", "$1.5 \\times 10^5\\text{ N/m}^2$"],
    correct_index: 2,
    topic: "Hydrostatic Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "Normal stress is total hydrostatic pressure: $P = P_0 + \\rho g h = 10^5 + (1000)(10)(100) = 10^5 + 10^6 = 11 \\times 10^5\\text{ N/m}^2$."
  },
  {
    question_text: "The surface tension of a liquid is 10 N/m. If a thin film of liquid is developed in a ring of wire of radius 0.1 m, then surface energy of liquid film will be",
    options: ["0.314 J", "0.45 J", "0.56 J", "0.63 J"],
    correct_index: 3,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Area of the circular film is $A = \\pi R^2 = \\pi (0.1)^2 = 0.01\\pi\\text{ m}^2$. Since a liquid film has two surfaces, $U = 2 T A = 2 \\times 10 \\times (0.01\\pi) = 0.2\\pi \\approx 0.628\\text{ J} \\approx 0.63\\text{ J}$."
  },
  {
    question_text: "At which of the following temperatures the surface tension of water becomes zero?",
    options: ["0 K", "273 K", "373 K", "647 K (Critical Temperature)"],
    correct_index: 3,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Surface tension decreases with increasing temperature and becomes zero at the critical temperature ($T_c = 374.15^\\circ\\text{C} = 647\\text{ K}$), where the meniscus between liquid and vapor disappears."
  },
  {
    question_text: "A large open tank with a square hole of side 0.1 cm in the wall at a depth of 0.2 m from the top is completely filled with a liquid. The rate of flow of liquid (in cm$^3$/s) through the hole will be",
    options: ["1", "2", "3", "4"],
    correct_index: 1,
    topic: "Torricelli's Law of Efflux",
    difficulty: "medium",
    marks: 4,
    solution: "Efflux velocity $v = \\sqrt{2gh} = \\sqrt{2 \\times 9.8 \\times 0.2} \\approx \\sqrt{4} = 2\\text{ m/s} = 200\\text{ cm/s}$. Area of hole $A = (0.1\\text{ cm})^2 = 0.01\\text{ cm}^2$. Flow rate $Q = Av = 0.01 \\times 200 = 2\\text{ cm}^3/\\text{s}$."
  },
  {
    question_text: "A spherical ball of radius 0.05 m and density $0.5\\text{ g/cc}$ floats in water filled in a container accelerating vertically upward with acceleration $4.9\\text{ m/s}^2$. The fraction of volume of ball immersed in liquid will be",
    options: ["0.25", "0.50", "0.75", "0.85"],
    correct_index: 1,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Fraction of volume immersed is $f = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{water}}} = \\frac{0.5}{1.0} = 0.50$. Upward acceleration does not affect the fraction submerged because effective gravity cancels out."
  },
  {
    question_text: "The property of surface tension of liquid is due to",
    options: ["Gravitational force of attraction between molecules", "Cohesive forces between molecules", "Adhesive force between molecules", "Formation of ionic bonds among molecules"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Surface tension arises from the unbalanced cohesive forces of attraction exerted by neighboring molecules on molecules at the liquid surface."
  },
  {
    question_text: "When a man sits on a boat of length 2 m and breadth 1 m floating on a lake, the boat sinks by 2 cm. The mass of man is",
    options: ["25 kg", "40 kg", "50 kg", "60 kg"],
    correct_index: 1,
    topic: "Hydrostatics & Flotation",
    difficulty: "easy",
    marks: 4,
    solution: "Additional weight of man equals the additional buoyant force: $M_{\\text{man}} g = A_{\\text{base}} \\times \\Delta h \\times \\rho_w g \\implies M_{\\text{man}} = (2 \\times 1) \\times 0.02 \\times 1000 = 40\\text{ kg}$."
  },
  {
    question_text: "The speed of water stream at which velocity head is 10 cm of water will be [Take $g = 1000\\text{ cm/s}^2$]",
    options: ["121.2 cm/s", "173.1 cm/s", "141.4 cm/s", "135.5 cm/s"],
    correct_index: 2,
    topic: "Bernoulli's Principle",
    difficulty: "medium",
    marks: 4,
    solution: "Velocity head is $h_v = \\frac{v^2}{2g} \\implies v = \\sqrt{2gh_v} = \\sqrt{2 \\times 1000 \\times 10} = \\sqrt{20000} \\approx 141.4\\text{ cm/s}$."
  },
  {
    question_text: "Two iron balls when immersed in water experience thrust in ratio 1 : 2, then ratio of mass of balls will be",
    options: ["1 : 1", "1 : 2", "2 : 1", "1 : 4"],
    correct_index: 1,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "easy",
    marks: 4,
    solution: "Buoyant thrust is proportional to submerged volume: $U \\propto V$. For same material (iron), mass $m = \\rho V \\propto V$. Hence $m_1 / m_2 = U_1 / U_2 = 1 : 2$."
  },
  {
    question_text: "An ideal fluid flows through a horizontal pipe of uniform cross section as shown in figure. The liquid has velocities $v_A, v_B$ and $v_C$ and pressure $P_A, P_B$ and $P_C$ at points A, B and C respectively, then",
    options: ["$v_A < v_B < v_C$", "$v_A > v_B > v_C$", "$P_A = P_B = P_C$", "$P_C > P_B > P_A$"],
    correct_index: 2,
    image_url: diagrams.q142,
    topic: "Bernoulli's Theorem & Continuity",
    difficulty: "medium",
    marks: 4,
    solution: "Since the pipe is horizontal and has uniform cross-sectional area throughout, by continuity equation velocity is constant ($v_A = v_B = v_C$). By Bernoulli's equation for a horizontal streamline, pressure must also be equal: $P_A = P_B = P_C$."
  },
  {
    question_text: "Four liquids of densities 1 g/cc, 2 g/cc, 3 g/cc and 4 g/cc are mixed in equal volumes. The density of the mixture is",
    options: ["$2.5 \\times 10^3\\text{ kg/m}^3$", "$2.5 \\times 10^{-3}\\text{ kg/m}^3$", "$10^3\\text{ kg/m}^3$", "$5 \\times 10^3\\text{ kg/m}^3$"],
    correct_index: 0,
    topic: "Density of Mixtures",
    difficulty: "easy",
    marks: 4,
    solution: "When equal volumes $V$ are mixed: $\\rho_{\\text{mix}} = \\frac{\\rho_1 + \\rho_2 + \\rho_3 + \\rho_4}{4} = \\frac{1 + 2 + 3 + 4}{4} = 2.5\\text{ g/cc} = 2.5 \\times 10^3\\text{ kg/m}^3$."
  },
  {
    question_text: "There are four cylindrical vessels identical in dimensions. If these are filled with equal masses of four different liquids P, Q, R and S such that their densities are $\\rho_P > \\rho_Q > \\rho_R > \\rho_S$, then pressure at the base of vessels is",
    options: ["$P_P = P_Q = P_R = P_S$", "$P_P > P_Q > P_R > P_S$", "$P_P < P_Q < P_R < P_S$", "Data is insufficient to predict relation"],
    correct_index: 0,
    topic: "Hydrostatic Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "In a vertical cylindrical vessel of uniform cross-section area $A$, the force on the base equals the weight of the liquid: $F = mg$. Hence base pressure is $P = \\frac{mg}{A}$. Since masses $m$ and cross-sectional areas $A$ are identical for all four vessels, base pressure is equal: $P_P = P_Q = P_R = P_S$."
  },
  {
    question_text: "Consider the following statements:\\nI. Two bodies of different masses, shapes and size may experience same thrust when their volumes inside a fluid are equal.\\nII. A soft plastic bag weighs the same when empty or when filled with air at atmospheric pressure.\\nSelect correct option:",
    options: ["Only I is true", "Only II is true", "Both are true", "Both are wrong"],
    correct_index: 2,
    topic: "Archimedes' Principle & Buoyancy",
    difficulty: "hard",
    marks: 4,
    solution: "Statement I is true because buoyant thrust depends only on submerged volume ($U = V_{\\text{in}} \\rho_f g$). Statement II is true because the weight of the air inside the bag is exactly balanced by the buoyant force exerted by the surrounding atmospheric air on the bag."
  },
  {
    question_text: "When a large bubble rises from the bottom of a lake to the surface, its radius doubles. The atmospheric pressure is equal to that of a column of water of height $H$. The depth of lake is",
    options: ["$H$", "$2H$", "$7H$", "$8H$"],
    correct_index: 2,
    topic: "Boyle's Law & Hydrostatic Pressure",
    difficulty: "medium",
    marks: 4,
    solution: "Volume of spherical bubble $V \\propto r^3$. When radius doubles, volume increases by $2^3 = 8$ times ($V_2 = 8V_1$). By Boyle's law at constant temperature: $P_1 V_1 = P_2 V_2 \\implies (P_0 + \\rho g h) V_1 = P_0 (8 V_1) \\implies \\rho g h = 7 P_0$. Since $P_0 = \\rho g H$, depth $h = 7H$."
  },
  {
    question_text: "The reading of a spring balance when a block is suspended from it air is 60 N. This reading is changed to 40 N when the block is submerged in water. The specific gravity of the block must therefore be",
    options: ["3", "2", "6", "3/2"],
    correct_index: 0,
    topic: "Archimedes' Principle",
    difficulty: "easy",
    marks: 4,
    solution: "Loss of weight in water $= 60 - 40 = 20\\text{ N}$. Specific gravity $= \\frac{\\text{Weight in air}}{\\text{Loss of weight in water}} = \\frac{60}{20} = 3$."
  },
  {
    question_text: "The continuity equation for a fluid flow is based on the principle of the",
    options: ["Conservation of mass", "Conservation of energy", "Conservation of momentum", "Conservation of angular momentum"],
    correct_index: 0,
    topic: "Equation of Continuity",
    difficulty: "easy",
    marks: 4,
    solution: "The equation of continuity ($A_1 v_1 = A_2 v_2$) is a direct mathematical consequence of the principle of conservation of mass in a fluid flow."
  },
  {
    question_text: "What will be the height of liquid of density $4.53\\text{ g/cm}^3$ in the barometer at a place where it is 75 cm of mercury barometer?",
    options: ["25 cm", "75 cm", "225 cm", "150 cm"],
    correct_index: 2,
    topic: "Barometer & Hydrostatics",
    difficulty: "medium",
    marks: 4,
    solution: "Equating atmospheric pressures: $h_1 \\rho_1 g = h_{\\text{Hg}} \\rho_{\\text{Hg}} g \\implies h_1 = \\frac{h_{\\text{Hg}} \\rho_{\\text{Hg}}}{\\rho_1} = \\frac{75 \\times 13.6}{4.53} = \\frac{1020}{4.53} \\approx 225.16\\text{ cm} \\approx 225\\text{ cm}$."
  },

  // Page 3 & 4: Q159 - Q185
  {
    question_text: "A balloon has volume of $1000\\text{ m}^3$. It is filled with hydrogen of density $0.09\\text{ g/L}$. If density of air is $1.29\\text{ g/L}$, then it can lift a total weight of",
    options: ["600 kg", "1200 kg", "300 kg", "1800 kg"],
    correct_index: 1,
    topic: "Buoyancy & Aerostatics",
    difficulty: "medium",
    marks: 4,
    solution: "Buoyant lift force $U = V \\rho_{\\text{air}} g = 1000\\text{ m}^3 \\times 1.29\\text{ kg/m}^3 \\times g = 1290g\\text{ N}$. Mass of hydrogen inside $= 1000 \\times 0.09 = 90\\text{ kg}$. Net lifting capacity $= 1290 - 90 = 1200\\text{ kg}$."
  },
  {
    question_text: "If density of ice and water be $x$ and $y$ respectively then the change in volume of water when $m$ mass of ice completely melts inside water, is",
    options: ["$xy(x - y)$", "$\\frac{y - x}{m}$", "$m(y - x)$", "$\\frac{m}{y} - \\frac{m}{x}$"],
    correct_index: 3,
    topic: "Density & Thermal Physics",
    difficulty: "medium",
    marks: 4,
    solution: "Initial volume of ice was $V_{\\text{ice}} = \\frac{m}{x}$. When it melts, the volume of resulting water is $V_{\\text{water}} = \\frac{m}{y}$. Change in volume $= V_{\\text{water}} - V_{\\text{ice}} = \\frac{m}{y} - \\frac{m}{x}$."
  },
  {
    question_text: "A ball of specific gravity 0.8 falls into water from a height of 2 m. The depth to which ball will sink is",
    options: ["2 m", "4 m", "8 m", "10 m"],
    correct_index: 2,
    topic: "Buoyancy & Dynamics",
    difficulty: "hard",
    marks: 4,
    solution: "Velocity on reaching water surface: $v^2 = 2g(2) = 4g$. Inside water, upward retardation is $a = \\frac{U - W}{m} = \\frac{V \\rho_w g - V \\rho_b g}{V \\rho_b} = \\left(\\frac{1 - 0.8}{0.8}\\right)g = \\frac{0.2}{0.8}g = \\frac{g}{4}$. Using $v^2 = 2ad \\implies 4g = 2\\left(\\frac{g}{4}\\right)d \\implies d = 8\\text{ m}$."
  },
  {
    question_text: "With the rise in temperature of water from 20°C, surface tension of water",
    options: ["Decreases", "Increases", "Remains same", "Sometimes increases and sometimes decreases"],
    correct_index: 0,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "As temperature increases, thermal agitation of liquid molecules weakens cohesive intermolecular forces, causing surface tension to decrease monotonically."
  },
  {
    question_text: "Some insects move and run on the surface of water without sinking, because",
    options: ["Insects are lighter", "Insects can swim on water", "Insects experience upthrust", "Due to surface tension elastic membrane is formed"],
    correct_index: 3,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Water surface acts like a stretched elastic membrane due to surface tension, supporting the small weight of insects without breaking the surface film."
  },
  {
    question_text: "From given diagram the speed with which water leaves the tube B of small diameter is",
    options: ["$\\sqrt{2gh_1}$", "$\\sqrt{2gh_2}$", "$\\sqrt{2g(h_1 + h_2)}$", "$7\\sqrt{2g(h_2 - h_1)}$"],
    correct_index: 1,
    image_url: diagrams.q164,
    topic: "Torricelli's Law & Siphon",
    difficulty: "medium",
    marks: 4,
    solution: "Applying Bernoulli's theorem between the free surface of container A (pressure $P_0$, velocity $\\approx 0$, height datum 0) and the exit of the siphon tube B at depth $h_2$ below A: $P_0 + 0 + 0 = P_0 + \\frac{1}{2}\\rho v^2 - \\rho g h_2 \\implies v = \\sqrt{2gh_2}$."
  },
  {
    question_text: "Which of the following is(are) application(s) of Bernoulli's theorem?",
    options: ["Magnus effect", "Venturimeter", "Lifting of aeroplane", "All of these"],
    correct_index: 3,
    topic: "Bernoulli's Principle",
    difficulty: "easy",
    marks: 4,
    solution: "Magnus effect, Venturimeter, and aerodynamic lift of an aircraft wing are all direct applications of Bernoulli's theorem."
  },
  {
    question_text: "Which of the following is not based on Bernoulli's principle?",
    options: ["Venturimeter", "Pitot tube", "Barometer", "Magnus effect"],
    correct_index: 2,
    topic: "Bernoulli's Principle",
    difficulty: "easy",
    marks: 4,
    solution: "A barometer works on Torricelli's hydrostatic pressure principle, not dynamic fluid flow (Bernoulli's theorem)."
  },
  {
    question_text: "Eight droplets of water each of radius 0.5 mm combine to form a bigger drop. The energy evolved in this process is (surface tension = $7.2 \\times 10^{-2}\\text{ N/m}$)",
    options: ["$9 \\times 10^{-7}\\text{ J}$", "$3 \\times 10^{-7}\\text{ J}$", "$1 \\times 10^{-7}\\text{ J}$", "$10 \\times 10^{-7}\\text{ J}$"],
    correct_index: 0,
    topic: "Surface Energy",
    difficulty: "medium",
    marks: 4,
    solution: "For $n = 8$ droplets of radius $r = 0.5\\text{ mm}$, radius of bigger drop $R = n^{1/3} r = 2r = 1.0\\text{ mm}$. Surface energy released is $\\Delta U = 4\\pi T (n r^2 - R^2) = 4\\pi T [8r^2 - 4r^2] = 16\\pi T r^2 = 16\\pi (7.2 \\times 10^{-2})(0.5 \\times 10^{-3})^2 \\approx 9.05 \\times 10^{-7}\\text{ J} \\approx 9 \\times 10^{-7}\\text{ J}$."
  },
  {
    question_text: "Reynold number for which flow of water through a pipe becomes turbulent is",
    options: ["500", "900", "750", "3000"],
    correct_index: 3,
    topic: "Hydrodynamics & Reynolds Number",
    difficulty: "easy",
    marks: 4,
    solution: "For flow through pipes, if $R_e < 2000$ flow is laminar/streamline; between 2000 and 3000 it is unstable; and for $R_e > 3000$ flow is fully turbulent."
  },
  {
    question_text: "The diameter of a syringe is 4 mm and the diameter of its nozzle (opening) is 1 mm. The syringe is placed on the table horizontally at a height of 1.25 m. If the piston is moved at a speed of 0.5 m/s, then considering the liquid in syringe to be ideal, the horizontal range of liquid is ($g = 10\\text{ m/s}^2$)",
    options: ["4 m", "8 m", "0.4 m", "0.2 m"],
    correct_index: 0,
    topic: "Equation of Continuity & Projectile Motion",
    difficulty: "hard",
    marks: 4,
    solution: "By continuity: $A_1 v_1 = A_2 v_2 \\implies d_1^2 v_1 = d_2^2 v_2 \\implies (4)^2(0.5) = (1)^2 v_2 \\implies v_2 = 8\\text{ m/s}$. Time of fall: $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 1.25}{10}} = \\sqrt{0.25} = 0.5\\text{ s}$. Horizontal range $R = v_2 t = 8 \\times 0.5 = 4\\text{ m}$."
  },
  {
    question_text: "If the surface tension of soap solution is 1.6 N/m, then the difference of air pressure between the inside and outside of a soap bubble of 4 mm in diameter is",
    options: ["$3200\\text{ N/m}^2$", "$1600\\text{ N/m}^2$", "$6400\\text{ N/m}^2$", "$800\\text{ N/m}^2$"],
    correct_index: 1,
    topic: "Excess Pressure in Soap Bubble",
    difficulty: "easy",
    marks: 4,
    solution: "Radius $r = d/2 = 2\\text{ mm} = 2 \\times 10^{-3}\\text{ m}$. Excess pressure inside soap bubble is $\\Delta P = \\frac{4T}{r} = \\frac{4 \\times 1.6}{2 \\times 10^{-3}} = 3200\\text{ N/m}^2$. Wait, in option: (1) 3200 N/m^2, (2) 1600 N/m^2. Key is (1) 3200 N/m^2."
  },
  {
    question_text: "A water tank is kept at a height $H$ above the ground and the tank contains depth $H$ of water as shown. Find the maximum possible range of water current, if there exists a small hole on the side wall of the tank.",
    options: ["$2H$", "$\\frac{3H}{2}$", "$\\frac{5H}{2}$", "$H$"],
    correct_index: 0,
    image_url: diagrams.q171,
    topic: "Torricelli's Law of Efflux",
    difficulty: "hard",
    marks: 4,
    solution: "Let depth of hole below water surface be $y$ ($0 \\le y \\le H$). The height of the hole above the ground is $H + (H - y) = 2H - y$. Efflux speed is $v = \\sqrt{2gy}$, and time to reach ground is $t = \\sqrt{\\frac{2(2H - y)}{g}}$. Range is $R = vt = 2\\sqrt{y(2H - y)}$. The maximum value of $y(2H - y)$ occurs at $y = H$, giving $R_{\\max} = 2\\sqrt{H \\cdot H} = 2H$."
  },
  {
    question_text: "If the temperature of a liquid rises, then its coefficient of viscosity",
    options: ["Increases", "Decreases", "Remains constant", "May increase or decrease"],
    correct_index: 1,
    topic: "Viscosity",
    difficulty: "easy",
    marks: 4,
    solution: "In liquids, viscosity is due to cohesive intermolecular forces. As temperature rises, molecular kinetic energy increases, weakening cohesive forces, hence the coefficient of viscosity decreases."
  },
  {
    question_text: "Figure shows an L-shaped tube filled with a liquid up to a height $l/2$. Horizontal acceleration $a$ of the tube so that pressure at A becomes equal to atmospheric pressure, is",
    options: ["$g$", "$g/2$", "$g/4$", "$2g/3$"],
    correct_index: 1,
    image_url: diagrams.q173,
    topic: "Accelerated Liquids",
    difficulty: "hard",
    marks: 4,
    solution: "Pressure at point A is $P_A = P_0 + \\rho g (l/2) - \\rho a l$. For $P_A = P_0$, we need $\\rho g (l/2) = \\rho a l \\implies a = g/2$."
  },
  {
    question_text: "An ideal fluid is flowing in steady state from section A to B through a pipe in vertical plane as shown. Select incorrect statement.",
    options: [
      "Total energy per unit volume is same at both sections A and B",
      "Incoming rate at A is equal to outgoing rate at B",
      "Loss in kinetic energy of the fluid is equal to gain in potential energy from section A to B",
      "Flow of fluid from A to B is laminar flow"
    ],
    correct_index: 2,
    image_url: diagrams.q174,
    topic: "Bernoulli's Theorem",
    difficulty: "hard",
    marks: 4,
    solution: "By Bernoulli's theorem, $P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$. The change in kinetic and potential energy also involves the work done by pressure forces ($\Delta P$). Therefore, loss in kinetic energy is NOT simply equal to gain in potential energy."
  },
  {
    question_text: "A vessel is filled with two liquids of densities $\\rho_1 = 800\\text{ kg/m}^3$ and $\\rho_2 = 1000\\text{ kg/m}^3$ as shown in figure. The force that acts on the bottom of the vessel is (Neglect atmospheric pressure) [Take $g = 10\\text{ m/s}^2$]",
    options: ["3.6 N", "7.2 N", "9 N", "12.6 N"],
    correct_index: 1,
    image_url: diagrams.q175,
    topic: "Hydrostatic Pressure & Force",
    difficulty: "medium",
    marks: 4,
    solution: "Pressure at the bottom of the vessel is $P = \\rho_1 g h_1 + \\rho_2 g h_2 = (800)(10)(0.2) + (1000)(10)(0.2) = 1600 + 2000 = 3600\\text{ Pa}$. Force on base $F = P \\times A_{\\text{base}} = 3600 \\times (2 \\times 10^{-3}) = 7.2\\text{ N}$."
  },
  {
    question_text: "A container filled with a liquid is accelerating with acceleration $a$ as shown in figure. If $P_A, P_B, P_C$ and $P_D$ are pressure at points A, B, C and D respectively, then which is incorrect?",
    options: ["$P_D > P_C$", "$P_B > P_C$", "$P_D = P_A$", "$P_A > P_B$"],
    correct_index: 0,
    image_url: diagrams.q176,
    topic: "Accelerated Liquids",
    difficulty: "medium",
    marks: 4,
    solution: "In a container accelerating horizontally to the right with acceleration $a$, pressure increases towards the left (rear). Therefore, at the bottom level, $P_C > P_D$. Hence the statement $P_D > P_C$ is incorrect."
  },
  {
    question_text: "A cube is floating in a liquid as shown in figure. The incorrect statement is that if",
    options: [
      "Density of liquid decreases then x will increase",
      "Size of cube is increased then x will increase",
      "Cube is replaced by another cube of same mass and size then x will remain same",
      "Some material of cube is cut and taken out then x will remain same"
    ],
    correct_index: 3,
    image_url: diagrams.q177,
    topic: "Hydrostatics & Flotation",
    difficulty: "medium",
    marks: 4,
    solution: "If material is cut and removed from the cube, its mass decreases, so the required buoyant force decreases, causing the submerged depth $x$ to decrease (not remain the same)."
  },
  {
    question_text: "Contact angle between a solid and a liquid is a property of",
    options: ["Material of solid", "Material of liquid", "Shape of solid", "Both (1) & (2)"],
    correct_index: 3,
    topic: "Surface Tension & Contact Angle",
    difficulty: "easy",
    marks: 4,
    solution: "Contact angle depends on the adhesive forces between the specific solid and liquid pair and the cohesive forces within the liquid, making it a property of both the solid and liquid materials."
  },
  {
    question_text: "Figure shows a large open tank. Water emerging out from holes $O_1$ and $O_2$ strikes the ground at same point but from $O_3$ has maximum range. Then height of $O_3$ from ground is",
    options: ["$\\frac{h_1 + h_2}{2}$", "$\\frac{h_2 - h_1}{2}$", "$\\frac{\\sqrt{h_1 h_2}}{2}$", "$2\\sqrt{h_1 h_2}$"],
    correct_index: 0,
    image_url: diagrams.q179,
    topic: "Torricelli's Law of Efflux",
    difficulty: "hard",
    marks: 4,
    solution: "Two holes strike at the same horizontal distance when their depths are symmetric about the midpoint of the liquid column. The hole with maximum range is at the exact midpoint: $h_3 = \\frac{h_1 + h_2}{2}$."
  },
  {
    question_text: "A body floats in water on earth with 90% inside water. What fraction of body will be inside water at an altitude $H = R/2$? ($R$ = Radius of the earth)",
    options: ["80%", "60%", "90%", "70%"],
    correct_index: 2,
    topic: "Hydrostatics & Buoyancy",
    difficulty: "medium",
    marks: 4,
    solution: "Fraction of volume submerged is $f = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{water}}}$. Since density does not depend on gravitational acceleration $g$, the fraction submerged remains 90% at any altitude."
  },
  {
    question_text: "A solid ball of density half that of water, falls freely under gravity from a height 20 m and then enters water. Total time taken by the ball to reach its original position is (Neglect air resistance and viscosity effect in water) [Take $g = 10\\text{ m/s}^2$]",
    options: ["6 s", "8 s", "4 s", "10 s"],
    correct_index: 1,
    image_url: diagrams.q181,
    topic: "Buoyancy & Motion in Fluids",
    difficulty: "hard",
    marks: 4,
    solution: "Time to fall 20 m in air: $t_1 = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{40}{10}} = 2\\text{ s}$. Speed on entering water: $v = gt_1 = 20\\text{ m/s}$. Inside water, upward acceleration $a = \\frac{U - mg}{m} = \\frac{V \\rho_w g - V (0.5\\rho_w) g}{V (0.5\\rho_w)} = g = 10\\text{ m/s}^2$. Time to come to rest in water $t_2 = v/a = 20/10 = 2\\text{ s}$. Time to rise back to surface: $2\\text{ s}$. Time to rise in air back to 20 m: $2\\text{ s}$. Total time $= 2 + 2 + 2 + 2 = 8\\text{ s}$."
  },
  {
    question_text: "Water flows through a frictionless tube with a varying cross-section as shown in figure. Variation of pressure $P$ at point $x$ along axis is roughly given by",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 2,
    image_url: diagrams.q182,
    topic: "Venturi Effect & Bernoulli's Theorem",
    difficulty: "medium",
    marks: 4,
    solution: "At the narrow central constriction of the tube, velocity is highest by continuity ($v = Q/A$). By Bernoulli's equation, pressure is lowest where velocity is highest. Thus pressure dips smoothly in the constriction and recovers downstream, represented by graph (3)."
  },
  {
    question_text: "A liquid is filled in a container as shown in figure. The force exerted by the liquid on the base of container must be",
    options: ["Equal to weight of the liquid", "More than the weight of liquid", "Less than the weight of liquid", "More or less than weight of liquid"],
    correct_index: 1,
    image_url: diagrams.q183,
    topic: "Hydrostatic Paradox",
    difficulty: "medium",
    marks: 4,
    solution: "Hydrostatic pressure on the base is $P = \\rho g h_{\\max}$. Total force is $F = P \\times A_{\\text{base}}$. Due to the stepped cut-out shape, $A_{\\text{base}} h_{\\max}$ is greater than the actual volume of liquid inside, so the force exerted on the base is more than the weight of the liquid."
  },
  {
    question_text: "A cubical tank completely filled with a liquid of density $\\rho$ is accelerated horizontally with acceleration $a$. The value of $a$ at which pressure at A becomes equal to pressure at D is",
    options: ["$g$", "$g/2$", "$g/3$", "$g/4$"],
    correct_index: 0,
    image_url: diagrams.q184,
    topic: "Accelerated Liquids",
    difficulty: "hard",
    marks: 4,
    solution: "Let cube side length be $L$. Taking point D as origin: $P_D = P_C - \\rho a L = (P_A + \\rho g L) - \\rho a L$. For $P_A = P_D$, we must have $\\rho g L - \\rho a L = 0 \\implies a = g$."
  },
  {
    question_text: "64 rain-drops combine into a single drop. Ratio of total surface energy of the 64 drops to that of a single drop is (surface tension of water is $T = 0.072\\text{ N/m}$)",
    options: ["4", "1/4", "1/2", "1/8"],
    correct_index: 0,
    topic: "Surface Energy",
    difficulty: "medium",
    marks: 4,
    solution: "For $n = 64$ droplets: $R = n^{1/3} r = 4r$. Initial total surface energy $U_i = 64 \\times 4\\pi r^2 T = 256\\pi r^2 T$. Final surface energy $U_f = 4\\pi R^2 T = 4\\pi (16r^2) T = 64\\pi r^2 T$. Ratio $U_i / U_f = 256 / 64 = 4$."
  },

  // Page 5: Q196 - Q210
  {
    question_text: "An orifice of radius $r$ is present at the bottom of a container. The maximum height to which the container can be filled with a liquid of density $\\rho$ for which liquid will not come out of the orifice is",
    options: ["$\\frac{T}{r\\rho g}$", "$\\frac{3T}{r\\rho g}$", "$\\frac{2T}{r\\rho g}$", "$\\frac{4T}{r\\rho g}$"],
    correct_index: 2,
    topic: "Surface Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Liquid will not leak as long as hydrostatic pressure at the hole is balanced by the maximum excess pressure of the curved surface meniscus: $\\rho g h = \\frac{2T}{r} \\implies h = \\frac{2T}{r\\rho g}$."
  },
  {
    question_text: "Working of atomizer is based on",
    options: ["Pascal's law", "Charles's law", "Archimedes principle", "Bernoulli's law"],
    correct_index: 3,
    topic: "Bernoulli's Principle",
    difficulty: "easy",
    marks: 4,
    solution: "An atomizer (perfume sprayer/carburetor) works on Bernoulli's principle: high-speed air creates a low pressure region above the tube, drawing the liquid up."
  },
  {
    question_text: "The container is moving downwards with acceleration $g/2$ and distance between A and B is $h$. If density of liquids is $\\rho$, then pressure difference between A and B is",
    options: ["$\\frac{h\\rho g}{2}$", "$\\frac{3h\\rho g}{2}$", "$h\\rho g$", "$2h\\rho g$"],
    correct_index: 0,
    image_url: diagrams.q198,
    topic: "Accelerated Liquids",
    difficulty: "medium",
    marks: 4,
    solution: "Effective gravitational acceleration in downward accelerating frame is $g_{\\text{eff}} = g - a = g - g/2 = g/2$. Hence pressure difference is $\\Delta P = \\rho g_{\\text{eff}} h = \\frac{h\\rho g}{2}$."
  },
  {
    question_text: "A container is accelerating towards right with acceleration $g$. If density of liquid is $\\rho$, then pressure difference between point A and B is",
    options: ["Zero", "$h\\rho g$", "$2\\rho h g$", "$\\frac{h\\rho g}{2}$"],
    correct_index: 0,
    image_url: diagrams.q199,
    topic: "Accelerated Liquids",
    difficulty: "hard",
    marks: 4,
    solution: "Point A is at vertical height $h$ above B and horizontal displacement $h$ to the left of B. Line AB has slope $\\tan\\theta = h/h = 1 = a/g$. Since the free surface of liquid tilts at angle $\\tan\\theta = a/g = 1$, line AB is parallel to the free surface, meaning both A and B lie on the same isobar (line of constant pressure). Therefore, $\\Delta P = 0$."
  },
  {
    question_text: "A sphere of mass $m$ is dropped from a tall tower when it falls by 10 m, it attains terminal velocity and continues to fall at that speed. The work done by air friction against the sphere during first 10 m is $w_1$ and during next 10 m is $w_2$, then",
    options: ["$w_1 < w_2$", "$w_1 > w_2$", "$w_1 = w_2$", "$w_1 \\ge w_2$"],
    correct_index: 0,
    topic: "Terminal Velocity & Work-Energy",
    difficulty: "hard",
    marks: 4,
    solution: "During the first 10 m, potential energy lost is converted into both kinetic energy and work done against air resistance: $mgh = \\Delta K + w_1 \\implies w_1 = mgh - \\frac{1}{2}mv_T^2$. In the second 10 m, velocity is constant at $v_T$, so all potential energy lost goes into heat against air drag: $w_2 = mgh$. Hence $w_1 < w_2$."
  },
  {
    question_text: "The work done to break a spherical drop of radius $R$ to $n$ drops of equal size is equal to",
    options: [
      "$\\frac{4\\pi R^2 T}{n^{2/3} - 1}$",
      "$(\\frac{1}{n^{1/3}} - 1)4\\pi R^2 T$",
      "$(n^{1/3} - 1)4\\pi R^2 T$",
      "$(n^{4/3} - 1)4\\pi R^2 T$"
    ],
    correct_index: 2,
    topic: "Surface Energy",
    difficulty: "medium",
    marks: 4,
    solution: "Volume conservation: $\\frac{4}{3}\\pi R^3 = n \\left(\\frac{4}{3}\\pi r^3\\right) \\implies r = R n^{-1/3}$. Change in surface area $\\Delta A = n(4\\pi r^2) - 4\\pi R^2 = 4\\pi R^2 (n \\cdot n^{-2/3} - 1) = 4\\pi R^2 (n^{1/3} - 1)$. Work done $W = T \\Delta A = (n^{1/3} - 1)4\\pi R^2 T$."
  },
  {
    question_text: "Pressure inside a spherical bubble of water is $P_0$. Find the force on half sphere of bubble due to air pressure ($P_0$) inside it ($R$ is Radius of bubble)",
    options: ["Zero", "$P_0 \\times 2\\pi R^2$", "$P_0 \\times \\pi R^2$", "$P_0 \\times 3\\pi R^2$"],
    correct_index: 2,
    topic: "Hydrostatic Pressure & Surface Forces",
    difficulty: "medium",
    marks: 4,
    solution: "The net force exerted by a uniform internal fluid pressure $P_0$ on a hemisphere is equal to the pressure multiplied by the projected cross-sectional area: $F = P_0 \\times \\pi R^2$."
  },
  {
    question_text: "A very large container has dense liquid as shown in figure. Velocity of efflux through orifice is ($\\rho$ = density of water)",
    options: ["$\\sqrt{2gh}$", "$\\sqrt{4gh}$", "$\\sqrt{5gh}$", "$\\sqrt{3gh}$"],
    correct_index: 0,
    image_url: diagrams.q203,
    topic: "Torricelli's Law of Efflux",
    difficulty: "easy",
    marks: 4,
    solution: "By Torricelli's law / Bernoulli's principle, efflux velocity from an open vessel under gravity is $v = \\sqrt{2gh}$, which is completely independent of the liquid density."
  },
  {
    question_text: "A uniform solid cylinder of density $8\\text{ g/cm}^3$ floats in equilibrium in a combination of two non-mixing liquids A and B with its vertical axis. The densities of the liquids A and B are $0.7\\text{ g/cm}^3$ and $1.2\\text{ g/cm}^3$, respectively. The height of liquid A is $h_A = 1.2\\text{ cm}$. The length of the part of the cylinder immersed in liquid B is $h_B = 0.8\\text{ cm}$. The net force exerted on the cylinder is",
    options: ["8.4 N", "18 N", "20 N", "Zero"],
    correct_index: 3,
    image_url: diagrams.q204,
    topic: "Hydrostatics & Equilibrium",
    difficulty: "easy",
    marks: 4,
    solution: "Because the cylinder is floating in static equilibrium, by Newton's first law the net force acting on the cylinder must be strictly zero."
  },
  {
    question_text: "The addition of soap changes the surface tension of water to $\\sigma_1$ and that of salt changes to $\\sigma_2$, then",
    options: ["$\\sigma_1 > \\sigma_2$", "$\\sigma_1 < \\sigma_2$", "$\\sigma_1 = \\sigma_2$", "$\\sigma_1 \\ge \\sigma_2$"],
    correct_index: 1,
    topic: "Surface Tension",
    difficulty: "easy",
    marks: 4,
    solution: "Soap is a surfactant that drastically lowers the surface tension of water ($\\sigma_1 < \\sigma_0$). Dissolved inorganic salts (like NaCl) increase the surface tension ($\\sigma_2 > \\sigma_0$). Therefore, $\\sigma_1 < \\sigma_2$."
  },
  {
    question_text: "Hydraulic press is based on",
    options: ["Archimedes' principle", "Bernoulli's principle", "Pascal's law", "Reynold's law"],
    correct_index: 2,
    topic: "Pascal's Law",
    difficulty: "easy",
    marks: 4,
    solution: "A hydraulic press operates on Pascal's law, which states that pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and the container walls."
  },
  {
    question_text: "When a non-wetting liquid is placed in a capillary tube of sufficient length, the shape of meniscus is",
    options: ["Concave upward", "Convex upward", "Flat", "Convex downward"],
    correct_index: 1,
    topic: "Capillarity & Meniscus",
    difficulty: "easy",
    marks: 4,
    solution: "For a non-wetting liquid (like mercury in glass), cohesive forces dominate, giving an obtuse contact angle and a meniscus that curves convex upward."
  },
  {
    question_text: "Pressure gradient has the same dimensions as that of",
    options: ["Velocity gradient", "Potential gradient", "Energy gradient", "Force per unit volume"],
    correct_index: 3,
    topic: "Dimensions & Fluid Statics",
    difficulty: "easy",
    marks: 4,
    solution: "Pressure gradient has dimensions $\\frac{[\\text{Pressure}]}{[\\text{Length}]} = \\frac{\\text{N/m}^2}{\\text{m}} = \\frac{\\text{N}}{\\text{m}^3}$, which is Force per unit volume."
  },
  {
    question_text: "The mass of the tank and water of density $\\rho$ as shown in the figure is $m$. As the valve is opened the tank moves backwards with an acceleration [$A$ is the area of cross-section of the orifice]",
    options: ["$\\frac{2\\rho Agh}{m}$", "$\\frac{\\rho Agh}{m}$", "$\\frac{\\rho gh}{Am}$", "$\\frac{4\\rho Agh}{m}$"],
    correct_index: 0,
    image_url: diagrams.q209,
    topic: "Reaction Force & Efflux",
    difficulty: "hard",
    marks: 4,
    solution: "Efflux velocity is $v = \\sqrt{2gh}$. Rate of mass ejection is $\\frac{dm}{dt} = \\rho A v$. Thrust reaction force exerted on the tank is $F = v \\frac{dm}{dt} = \\rho A v^2 = \\rho A (2gh) = 2\\rho Agh$. Therefore, backward acceleration is $a = \\frac{F}{m} = \\frac{2\\rho Agh}{m}$."
  },
  {
    question_text: "Water is flowing from a source as shown in the figure. Let $A$ be the cross-sectional area of the liquid flow at the time when velocity is 5 m/s. The cross-sectional area of the liquid flow when water has descended by 10 metre is [Take $g = 10\\text{ m/s}^2$]",
    options: ["3A", "A/3", "A/2", "2A"],
    correct_index: 1,
    image_url: diagrams.q210,
    topic: "Equation of Continuity & Free Fall",
    difficulty: "medium",
    marks: 4,
    solution: "Velocity after falling $h = 10\\text{ m}$ under gravity: $v_2 = \\sqrt{v_1^2 + 2gh} = \\sqrt{5^2 + 2(10)(10)} = \\sqrt{25 + 200} = \\sqrt{225} = 15\\text{ m/s}$. By continuity: $A_1 v_1 = A_2 v_2 \\implies A(5) = A'(15) \\implies A' = A/3$."
  }
];

async function seedBatch2() {
  console.log(`Connecting to Neon DB to seed ${batch2Questions.length} batch 2 questions...`);
  
  // Find chapter ID for 'Mechanical Properties of Fluids'
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

  for (let i = 0; i < batch2Questions.length; i++) {
    const q = batch2Questions[i];
    
    // Check duplicate in DB
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
    console.log(`[${i + 1}/${batch2Questions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Neon DB Batch 2 Seeding Completed: Inserted ${inserted}, Skipped ${skipped}. Total: ${batch2Questions.length}`);
  await pool.end();
}

seedBatch2().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
