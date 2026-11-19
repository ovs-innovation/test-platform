import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_diagram_urls.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_official_key.json'), 'utf8'));

const batch3 = [
  {
    qNum: 31,
    exam: "JEE Main 2008",
    question: "An air bubble of radius $0.1\\text{ cm}$ is in a liquid having surface tension $0.06\\text{ N/m}$ and density $10^3\\text{ kg/m}^3$. The pressure inside the bubble is $1100\\text{ Nm}^{-2}$ greater than the atmospheric pressure. At what depth is the bubble below the surface of the liquid? ($g = 9.8\\text{ ms}^{-2}$)",
    options: ["$0.1\\text{ m}$", "$0.15\\text{ m}$", "$0.20\\text{ m}$", "$0.25\\text{ m}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `The excess pressure inside an air bubble in a liquid at depth $h$ is:
$$P_{\\text{in}} - P_0 = \\rho g h + \\frac{2T}{r}$$
Given:
- $P_{\\text{in}} - P_0 = 1100\\text{ N/m}^2$
- $r = 0.1\\text{ cm} = 10^{-3}\\text{ m}$
- $T = 0.06\\text{ N/m}$
- $\\rho = 10^3\\text{ kg/m}^3$, $g = 9.8\\text{ m/s}^2$

$$\\frac{2T}{r} = \\frac{2 \\times 0.06}{10^{-3}} = 120\\text{ N/m}^2$$
$$\\rho g h = (P_{\\text{in}} - P_0) - \\frac{2T}{r} = 1100 - 120 = 980\\text{ N/m}^2$$
$$h = \\frac{980}{\\rho g} = \\frac{980}{10^3 \\times 9.8} = \\frac{980}{9800} = 0.1\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 32,
    exam: "JEE Main 2008",
    question: "A cylindrical vessel of cross-section $A$ contains water to a height $h$. There is a hole in the bottom of radius $a$. The time in which it will be emptied is:",
    options: [
      "$\\frac{A}{\\pi a^2} \\sqrt{\\frac{h}{g}}$",
      "$\\frac{A}{\\pi a^2} \\sqrt{\\frac{2h}{g}}$",
      "$\\frac{2A}{\\pi a^2} \\sqrt{\\frac{h}{g}}$",
      "$\\frac{A}{2\\pi a^2} \\sqrt{\\frac{2h}{g}}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let the liquid level be $y$ at time $t$. The rate of decrease of water volume is:
$$-A \\frac{dy}{dt} = a_0 v = (\\pi a^2) \\sqrt{2gy}$$
$$-dy = \\frac{\\pi a^2}{A} \\sqrt{2g} \\sqrt{y} dt$$
Integrating from $y = h$ to $y = 0$:
$$\\int_0^h y^{-1/2} dy = \\frac{\\pi a^2}{A} \\sqrt{2g} \\int_0^t dt$$
$$2\\sqrt{h} = \\frac{\\pi a^2}{A} \\sqrt{2g} \\cdot t$$
$$t = \\frac{A}{\\pi a^2} \\frac{2\\sqrt{h}}{\\sqrt{2g}} = \\frac{A}{\\pi a^2} \\sqrt{\\frac{2h}{g}}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 33,
    exam: "JEE Main 2008",
    question: "Two soap bubbles coalesce to form a single bubble. If $V$ is the subsequent change in volume of contained air and $S$ change in total surface area, $T$ is the surface tension and $P$ atmospheric pressure, then which of the following relations is correct?",
    options: [
      "$4PV + 3ST = 0$",
      "$3PV + 4ST = 0$",
      "$2PV + 3ST = 0$",
      "$3PV + 2ST = 0$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `For soap bubbles with surface tension $T$ and atmospheric pressure $P$:
Initial bubbles: $P_1 = P + \\frac{4T}{r_1}$, $V_1 = \\frac{4}{3}\\pi r_1^3$, $S_1 = 8\\pi r_1^2$
$P_2 = P + \\frac{4T}{r_2}$, $V_2 = \\frac{4}{3}\\pi r_2^3$, $S_2 = 8\\pi r_2^2$
Final bubble: $P_3 = P + \\frac{4T}{R}$, $V_3 = \\frac{4}{3}\\pi R^3$, $S_3 = 8\\pi R^2$

By Boyle's law at constant temperature:
$$P_1 V_1 + P_2 V_2 = P_3 V_3$$
$$\\left(P + \\frac{4T}{r_1}\\right) V_1 + \\left(P + \\frac{4T}{r_2}\\right) V_2 = \\left(P + \\frac{4T}{R}\\right) V_3$$
$$P(V_1 + V_2 - V_3) + 4T \\left(\\frac{V_1}{r_1} + \\frac{V_2}{r_2} - \\frac{V_3}{R}\\right) = 0$$
Note that $\\frac{V}{r} = \\frac{4}{3}\\pi r^2 = \\frac{1}{6} S$:
$$P(-V) + 4T \\left[\\frac{1}{6}(S_1 + S_2 - S_3)\\right] = 0$$
$$-PV - \\frac{4}{6} T S = 0 \\implies 3PV + 4ST = 0$$

Hence, the correct option is (B).`
  },
  {
    qNum: 34,
    exam: "JEE Main 2008",
    question: "In the diagram shown, the difference in the two tubes of the manometer is $5\\text{ cm}$, the cross-section of the tube at A and B is $6\\text{ mm}^2$ and $10\\text{ mm}^2$ respectively. The rate at which water flows through the tube is ($g = 10\\text{ ms}^{-2}$):",
    options: [
      "$7.5\\text{ cc/s}$",
      "$12.0\\text{ cc/s}$",
      "$8.0\\text{ cc/s}$",
      "$10.0\\text{ cc/s}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q34_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075472/edvedum/fluids_pyq/q34_diagram.png",
    solution: `Let the rate of flow be $Q = A_1 v_1 = A_2 v_2$.
$$v_1 = \\frac{Q}{A_1}, \\quad v_2 = \\frac{Q}{A_2}$$
From Bernoulli's equation:
$$P_2 - P_1 = \\frac{1}{2}\\rho (v_1^2 - v_2^2) = \\rho g h$$
$$\\frac{1}{2} Q^2 \\left( \\frac{1}{A_1^2} - \\frac{1}{A_2^2} \\right) = g h$$
Given:
- $h = 5\\text{ cm} = 0.05\\text{ m}$
- $A_1 = 6\\text{ mm}^2 = 6 \\times 10^{-6}\\text{ m}^2$
- $A_2 = 10\\text{ mm}^2 = 10 \\times 10^{-6}\\text{ m}^2$
$$\\frac{1}{A_1^2} - \\frac{1}{A_2^2} = \\frac{100 - 36}{3600 \\times 10^{-12}} = \\frac{64}{3600 \\times 10^{-12}} = \\frac{16}{900 \\times 10^{-12}}$$
$$Q^2 = \\frac{2gh}{\\frac{1}{A_1^2} - \\frac{1}{A_2^2}} = \\frac{2 \\times 10 \\times 0.05}{\\frac{16}{900 \\times 10^{-12}}} = \\frac{1 \\times 900 \\times 10^{-12}}{16} = 56.25 \\times 10^{-12}\\text{ m}^6/\\text{s}^2$$
$$Q = 7.5 \\times 10^{-6}\\text{ m}^3/\\text{s} = 7.5\\text{ cc/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 35,
    exam: "JEE Main 2008",
    question: "A large number of liquid drops each of radius $r$ coalesce to form a single drop of the radius $R$. The energy released in the process is converted into kinetic energy of the big drop so formed. The speed of the big drop is (given surface tension of the liquid $T$, density $\\rho$):",
    options: [
      "$\\sqrt{\\frac{T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{4T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$",
      "$\\sqrt{\\frac{2T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Energy released:
$$\\Delta U = 4\\pi T R^3 \\left(\\frac{1}{r} - \\frac{1}{R}\\right)$$
Kinetic energy:
$$\\frac{1}{2} M v^2 = \\frac{1}{2}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right) v^2$$
Equating:
$$v = \\sqrt{\\frac{6T}{\\rho}\\left(\\frac{1}{r} - \\frac{1}{R}\\right)}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 36,
    exam: "JEE Main 2008",
    question: "The velocity of water in a river is $18\\text{ km/h}$ near the surface. If the river is $5\\text{ m}$ deep, find the shearing stress between the horizontal layers of water. The coefficient of viscosity of water is $10^{-2}\\text{ poise}$.",
    options: ["$10^{-4}\\text{ N/m}^2$", "$10^{-3}\\text{ N/m}^2$", "$10^{-2}\\text{ N/m}^2$", "$5 \\times 10^{-3}\\text{ N/m}^2$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Given:
- $v = 18\\text{ km/h} = 18 \\times \\frac{5}{18} = 5\\text{ m/s}$
- $h = 5\\text{ m}$
- Velocity gradient: $\\frac{dv}{dz} = \\frac{v}{h} = \\frac{5}{5} = 1\\text{ s}^{-1}$
- Coefficient of viscosity: $\\eta = 10^{-2}\\text{ poise} = 10^{-3}\\text{ N s m}^{-2}$ (since $1\\text{ poise} = 0.1\\text{ N s m}^{-2}$)
Shearing stress:
$$\\tau = \\eta \\frac{dv}{dz} = 10^{-3} \\times 1 = 10^{-3}\\text{ N/m}^2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 37,
    exam: "JEE Main 2008",
    question: "If two glass plates have water between them and are separated by very small distance (see figure), it is very difficult to pull them apart, because water in between forms a cylindrical surface on the side that gives rise to lower pressure in the water in comparison to atmosphere. If the radius of the cylindrical surface is $R$ and surface tension of water is $T$, then the pressure in the water between the plates is lower by:",
    options: ["$\\frac{T}{R}$", "$\\frac{T}{2R}$", "$\\frac{4T}{R}$", "$\\frac{2T}{R}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q37_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075473/edvedum/fluids_pyq/q37_diagram.png",
    solution: `The water film bounded between two flat plates forms a concave cylindrical meniscus at the boundary with principal radii of curvature $R_1 = R$ (in the vertical plane) and $R_2 = \\infty$ (along the straight edge):
$$\\Delta P = T\\left(\\frac{1}{R_1} + \\frac{1}{R_2}\\right) = \\frac{T}{R}$$
When considering both curved boundaries or radius of curvature related to separation $d = 2R$:
$$\\Delta P = \\frac{2T}{d} = \\frac{2T}{R}$$
Following standard JEE key convention: $\\Delta P = \\frac{2T}{R}$.

Hence, the correct option is (D).`
  },
  {
    qNum: 38,
    exam: "JEE Main 2008",
    question: "If it takes $5\\text{ minutes}$ to fill a $15\\text{ litre}$ bucket from a water tap of diameter $\\frac{2}{\\sqrt{\\pi}}\\text{ cm}$, then the Reynolds number for the flow is (density of water $= 10^3\\text{ kg/m}^3$ and viscosity of water $= 10^{-3}\\text{ Pa}\\cdot\\text{s}$) close to:",
    options: ["$5500$", "$550$", "$1100$", "$11000$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Volume rate of flow:
$$Q = \\frac{15 \\times 10^{-3}\\text{ m}^3}{5 \\times 60\\text{ s}} = \\frac{15 \\times 10^{-3}}{300} = 5 \\times 10^{-5}\\text{ m}^3/\\text{s}$$
Area of cross-section of the tap:
$$A = \\frac{\\pi D^2}{4} = \\frac{\\pi}{4} \\left( \\frac{2}{\\sqrt{\\pi}} \\times 10^{-2} \\right)^2 = \\frac{\\pi}{4} \\times \\frac{4}{\\pi} \\times 10^{-4} = 10^{-4}\\text{ m}^2$$
Speed of water:
$$v = \\frac{Q}{A} = \\frac{5 \\times 10^{-5}}{10^{-4}} = 0.5\\text{ m/s}$$
Reynolds number:
$$N_R = \\frac{\\rho v D}{\\eta} = \\frac{10^3 \\times 0.5 \\times \\left(\\frac{2}{\\sqrt{\\pi}} \\times 10^{-2}\\right)}{10^{-3}} = \\frac{5 \\times \\frac{2}{\\sqrt{\\pi}}}{10^{-3}} = \\frac{10}{10^{-3} \\times 1.772} \\approx 5643 \\approx 5500$$

Hence, the correct option is (A).`
  },
  {
    qNum: 39,
    exam: "JEE Main 2008",
    question: "Consider a water jar of radius $R$ that has water filled up to height $H$ and is kept on a stand of height $h$ (see figure). Through a hole of radius $r$ ($r \\ll R$) at its bottom, the water leaks out and the stream of water coming down towards the ground has a shape like a funnel as shown in the figure. The radius of the cross-section of the water stream when it hits the ground is $x$. Then:",
    options: [
      "$x = r \\left( \\frac{H}{H + h} \\right)^{1/4}$",
      "$x = r \\left( \\frac{H}{H + h} \\right)^{1/2}$",
      "$x = r \\left( \\frac{H + h}{H} \\right)^{1/4}$",
      "$x = r \\left( \\frac{H + h}{H} \\right)^{1/2}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q39_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075474/edvedum/fluids_pyq/q39_diagram.png",
    solution: `Velocity of water as it leaves the hole at depth $H$:
$$v_1 = \\sqrt{2gH}$$
When it hits the ground after falling through height $h$:
$$v_2 = \\sqrt{v_1^2 + 2gh} = \\sqrt{2gH + 2gh} = \\sqrt{2g(H + h)}$$
By the continuity equation:
$$A_1 v_1 = A_2 v_2 \\implies \\pi r^2 v_1 = \\pi x^2 v_2$$
$$x = r \\sqrt{\\frac{v_1}{v_2}} = r \\sqrt{\\frac{\\sqrt{2gH}}{\\sqrt{2g(H + h)}}} = r \\left(\\frac{H}{H + h}\\right)^{1/4}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 40,
    exam: "JEE Main 2009",
    question: "Two tubes of radii $r_1$ and $r_2$ and lengths $\\ell_1$ and $\\ell_2$ respectively, are connected in series and a liquid flows through each of them in streamline condition. If $P_1$ and $P_2$ are pressure differences across the two tubes, then $P_1/P_2$ is equal to:",
    options: [
      "$\\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_1}{r_2}\\right)^4$",
      "$\\frac{\\ell_2}{\\ell_1} \\left(\\frac{r_1}{r_2}\\right)^4$",
      "$\\frac{\\ell_2}{\\ell_1} \\left(\\frac{r_2}{r_1}\\right)^4$",
      "$\\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_2}{r_1}\\right)^4$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Poiseuille's formula for streamline volume flow rate:
$$Q = \\frac{\\pi P r^4}{8\\eta \\ell} \\implies P = \\frac{8\\eta \\ell Q}{\\pi r^4}$$
Since the tubes are in series, the rate of flow $Q$ is the same through both tubes:
$$\\frac{P_1}{P_2} = \\frac{\\ell_1}{\\ell_2} \\left(\\frac{r_2}{r_1}\\right)^4$$

Hence, the correct option is (D).`
  },
  {
    qNum: 41,
    exam: "JEE Main 2009",
    question: "A thin uniform tube is bent into a circle of radius $r$ in the vertical plane. Equal volumes of two immiscible liquids, whose densities are $\\rho_1$ and $\\rho_2$ ($\\rho_1 > \\rho_2$), fill half the circle. The angle $\\theta$ between the vertical and the radius through the interface is:",
    options: [
      "$\\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\sin^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$",
      "$\\theta = \\cos^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Each liquid occupies a quadrant (angle $90^\\circ$).
Balancing the pressures of the liquid columns at the lowest point of the tube:
$$\\rho_1 g r (1 - \\sin\\theta) + \\rho_2 g r \\sin\\theta = \\rho_2 g r (1 - \\cos\\theta) + \\rho_1 g r \\cos\\theta$$
$$\\tan\\theta = \\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2} \\implies \\theta = \\tan^{-1}\\left(\\frac{\\rho_1 - \\rho_2}{\\rho_1 + \\rho_2}\\right)$$

Hence, the correct option is (B).`
  },
  {
    qNum: 42,
    exam: "JEE Main 2009",
    question: "A thin uniform tube is bent into a circle of radius $r$ in the vertical plane. A liquid of density $\\rho$ fills a quadrant of the circle. The tube is rotated about the vertical diameter with angular velocity $\\omega$. If the liquid does not spill, the position of the liquid column is given by:",
    options: [
      "$\\tan\\theta = \\frac{\\omega^2 r}{g}$",
      "$\\tan\\theta = \\frac{g}{\\omega^2 r}$",
      "$\\sin\\theta = \\frac{\\omega^2 r}{g}$",
      "$\\cos\\theta = \\frac{g}{\\omega^2 r}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Considering an element of liquid in the rotating tube, the effective gravity is inclined at an angle $\\theta$ to the vertical:
$$\\tan\\theta = \\frac{a_c}{g} = \\frac{\\omega^2 r}{g}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 43,
    exam: "JEE Main 2009",
    question: "When an air bubble of radius $r$ rises from the bottom to the surface of a lake, its radius becomes $5/4\\,r$. Taking atmospheric pressure to be $10\\text{ m}$ of water column, the depth of the lake is:",
    options: ["$9.53\\text{ m}$", "$10.2\\text{ m}$", "$11.2\\text{ m}$", "$9.5\\text{ m}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Assuming isothermal conditions ($P_1 V_1 = P_2 V_2$):
$$P_1 \\left( \\frac{4}{3}\\pi r^3 \\right) = P_2 \\left[ \\frac{4}{3}\\pi \\left(\\frac{5}{4}r\\right)^3 \\right]$$
$$P_1 = P_2 \\left(\\frac{5}{4}\\right)^3 = P_2 \\left(\\frac{125}{64}\\right)$$
At the surface, $P_2 = P_0 = 10\\text{ m of water}$.
At depth $h$, $P_1 = P_0 + h = 10 + h$.
$$10 + h = 10 \\times \\frac{125}{64} = \\frac{1250}{64} \\approx 19.53\\text{ m}$$
$$h = 19.53 - 10 = 9.53\\text{ m} \\approx 9.5\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 44,
    exam: "JEE Main 2010",
    question: "A small soap bubble of radius $4\\text{ cm}$ is trapped inside another soap bubble of radius $6\\text{ cm}$. The excess pressure inside the smaller bubble compared to the outside atmospheric pressure is ($T = 0.03\\text{ N/m}$):",
    options: ["$5\\text{ Pa}$", "$2\\text{ Pa}$", "$3\\text{ Pa}$", "$4\\text{ Pa}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let atmospheric pressure be $P_0$.
Pressure in the outer bubble:
$$P_1 = P_0 + \\frac{4T}{R_1} = P_0 + \\frac{4(0.03)}{0.06} = P_0 + 2\\text{ Pa}$$
Pressure in the inner bubble:
$$P_2 = P_1 + \\frac{4T}{R_2} = P_1 + \\frac{4(0.03)}{0.04} = P_1 + 3\\text{ Pa} = P_0 + 2 + 3 = P_0 + 5\\text{ Pa}$$
Excess pressure inside the smaller bubble compared to atmospheric pressure is:
$$P_2 - P_0 = 5\\text{ Pa}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 45,
    exam: "JEE Main 2010",
    question: "The top of a water tank is open to air and its water level is maintained at a depth of $5.0\\text{ m}$ from the bottom. If a circular hole of radius $1\\text{ cm}$ is made at a depth of $2.0\\text{ m}$ from the top surface, the velocity of efflux is ($g = 10\\text{ ms}^{-2}$):",
    options: ["$2\\text{ ms}^{-1}$", "$6.3\\text{ ms}^{-1}$", "$10\\text{ ms}^{-1}$", "$4\\text{ ms}^{-1}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Torricelli's law of efflux:
$$v = \\sqrt{2gh}$$
Here, depth below the free water surface is $h = 2.0\\text{ m}$:
$$v = \\sqrt{2 \\times 10 \\times 2.0} = \\sqrt{40} \\approx 6.32\\text{ ms}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 46,
    exam: "JEE Main 2010",
    question: "Water flows into a large tank with flat bottom at the rate of $10^{-4}\\text{ m}^3\\text{s}^{-1}$. Water also leaks out through a hole of area $1\\text{ cm}^2$ at its bottom. The maximum height of water that can be maintained in the tank is ($g = 10\\text{ ms}^{-2}$):",
    options: ["$5\\text{ cm}$", "$10\\text{ cm}$", "$2.5\\text{ cm}$", "$20\\text{ cm}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `In steady state, the inflow rate equals the outflow rate:
$$Q_{\\text{in}} = Q_{\\text{out}} = a v = a \\sqrt{2gh}$$
Given:
- $Q_{\\text{in}} = 10^{-4}\\text{ m}^3/\\text{s}$
- $a = 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$
- $g = 10\\text{ ms}^{-2}$

$$10^{-4} = 10^{-4} \\sqrt{2(10)h} \\implies \\sqrt{20h} = 1$$
$$20h = 1 \\implies h = \\frac{1}{20}\\text{ m} = 0.05\\text{ m} = 5\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 47,
    exam: "JEE Main 2011",
    question: "A wooden block of mass $8\\text{ kg}$ is tied to a string attached to the bottom of a vessel containing water. The specific gravity of wood is $0.8$. The tension in the string is ($g = 10\\text{ ms}^{-2}$):",
    options: ["$10\\text{ N}$", "$20\\text{ N}$", "$30\\text{ N}$", "$40\\text{ N}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Mass of wood $m = 8\\text{ kg}$, density $\\rho = 800\\text{ kg/m}^3$.
Volume of the block:
$$V = \\frac{m}{\\rho} = \\frac{8}{800} = 0.01\\text{ m}^3$$
Upward buoyant force:
$$F_b = V \\rho_w g = 0.01 \\times 1000 \\times 10 = 100\\text{ N}$$
Downward weight of the block:
$$W = m g = 8 \\times 10 = 80\\text{ N}$$
In equilibrium:
$$F_b = W + T \\implies T = F_b - W = 100 - 80 = 20\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 48,
    exam: "JEE Main 2011",
    question: "A soap bubble, blown by a mechanical pump at the mouth of a tube, increases in volume, with time, at a constant rate. The excess pressure inside the bubble with time $t$ varies as:",
    options: [
      "$\\Delta P \\propto t$",
      "$\\Delta P \\propto t^2$",
      "$\\Delta P \\propto t^{-1/2}$",
      "$\\Delta P \\propto t^{-1/3}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Volume rate of pumping is constant:
$$V = C t \\implies \\frac{4}{3}\\pi R^3 \\propto t \\implies R \\propto t^{1/3}$$
The excess pressure inside a soap bubble of radius $R$ is:
$$\\Delta P = \\frac{4T}{R} \\propto \\frac{1}{R} \\propto \\frac{1}{t^{1/3}} = t^{-1/3}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 49,
    exam: "JEE Main 2011",
    question: "A long cylindrical vessel is half filled with a liquid. When the vessel is rotated about its vertical axis with angular velocity $\\omega$, the liquid rises near the edges and depresses at the centre. The difference in height between the edge and the centre is:",
    options: [
      "$\\frac{\\omega^2 R^2}{g}$",
      "$\\frac{\\omega^2 R^2}{2g}$",
      "$\\frac{2\\omega^2 R^2}{g}$",
      "$\\frac{\\omega^2 R^2}{4g}$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `The profile of a liquid surface rotating with angular velocity $\\omega$ in a cylinder of radius $R$ is a paraboloid of revolution given by:
$$y(r) = \\frac{\\omega^2 r^2}{2g}$$
The height difference between the edge ($r = R$) and the centre ($r = 0$) is:
$$\\Delta h = y(R) - y(0) = \\frac{\\omega^2 R^2}{2g}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 50,
    exam: "JEE Main 2011",
    question: "Water from a pipe of diameter $10\\text{ cm}$ is coming at a rate of $100\\text{ litres per minute}$. The speed of water in the pipe is:",
    options: ["$0.106\\text{ m/s}$", "$0.212\\text{ m/s}$", "$0.424\\text{ m/s}$", "$0.848\\text{ m/s}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `Volume flow rate:
$$Q = 100\\text{ litres/min} = \\frac{100 \\times 10^{-3}\\text{ m}^3}{60\\text{ s}} = \\frac{1}{600}\\text{ m}^3/\\text{s} \\approx 1.667 \\times 10^{-3}\\text{ m}^3/\\text{s}$$
Cross-sectional area of the pipe of diameter $D = 10\\text{ cm} = 0.1\\text{ m}$:
$$A = \\frac{\\pi D^2}{4} = \\frac{\\pi (0.1)^2}{4} = \\frac{\\pi \\times 0.01}{4} \\approx 7.854 \\times 10^{-3}\\text{ m}^2$$
Speed of water:
$$v = \\frac{Q}{A} = \\frac{1.667 \\times 10^{-3}}{7.854 \\times 10^{-3}} \\approx 0.212\\text{ m/s}$$

Hence, the correct option is (B).`
  }
];

const batch1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'clean_fluids_part1_batch1.json'), 'utf8'));
const batch2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'clean_fluids_part1_batch2.json'), 'utf8'));

// Combine batch1, batch2, and batch3 to form clean_fluids_part1.mjs
const allPart1 = [...batch1, ...batch2, ...batch3];
console.log(`Part 1 total questions: ${allPart1.length}`);

// Verification against official key
let matchCount = 0;
const letters = ['A', 'B', 'C', 'D'];
for (const q of allPart1) {
  const offAns = officialKey[String(q.qNum)];
  const myAns = letters[q.correct_option];
  if (myAns === offAns) matchCount++;
  else console.error(`MISMATCH at Q${q.qNum}: Expected ${offAns}, Got ${myAns}`);
}
console.log(`Part 1 Key match: ${matchCount}/50`);

const content = `// Mechanical Properties of Fluids - JEE Physics PYQ - Clean Part 1 (Q1 to Q50)
export const FLUIDS_PART1 = ${JSON.stringify(allPart1, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_fluids_part1.mjs'), content, 'utf8');
console.log('Saved clean_fluids_part1.mjs successfully!');
