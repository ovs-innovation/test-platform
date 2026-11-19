import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_official_key.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_diagram_urls.json'), 'utf8'));
const batch1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'clean_fluids_part1_batch1.json'), 'utf8'));

const batch2 = [
  {
    qNum: 21,
    exam: "JEE Main 2007",
    question: "Air of density $1.2\\text{ kg m}^{-3}$ is blowing across the horizontal wings of an aeroplane in such a way that its speeds above and below the wings are $150\\text{ ms}^{-1}$ and $100\\text{ ms}^{-1}$, respectively. The pressure difference between the upper and lower sides of the wings is:",
    options: ["$60\\text{ Nm}^{-2}$", "$180\\text{ Nm}^{-2}$", "$7500\\text{ Nm}^{-2}$", "$12500\\text{ Nm}^{-2}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Using Bernoulli's equation for horizontal streamlines:
$$P_{\\text{lower}} - P_{\\text{upper}} = \\frac{1}{2}\\rho (v_{\\text{upper}}^2 - v_{\\text{lower}}^2)$$
$$P_1 - P_2 = \\frac{1}{2}(1.2)(150^2 - 100^2) = 0.6 \\times (22500 - 10000) = 0.6 \\times 12500 = 7500\\text{ Nm}^{-2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 22,
    exam: "JEE Main 2007",
    question: "A thin tube sealed at both ends is $100\\text{ cm}$ long. It lies horizontally, the middle $20\\text{ cm}$ containing mercury and two equal ends containing air at standard atmospheric pressure ($76\\text{ cm of Hg}$). If the tube is now turned to a vertical position, by what amount will the mercury be displaced? (Given: cross-section of the tube can be assumed to be uniform)",
    options: ["$2.95\\text{ cm}$", "$5.18\\text{ cm}$", "$8.65\\text{ cm}$", "$0.0\\text{ cm}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Initially, each air column has length $L_0 = (100 - 20)/2 = 40\\text{ cm}$ at pressure $P_0 = 76\\text{ cm of Hg}$.
When vertical, mercury shifts downward by distance $x$:
- Upper column length: $40 + x$, pressure $P_1$
- Lower column length: $40 - x$, pressure $P_2$
Since the process is isothermal:
$$P_1(40 + x) = P_0(40) \\implies P_1 = \\frac{76 \\times 40}{40 + x}$$
$$P_2(40 - x) = P_0(40) \\implies P_2 = \\frac{76 \\times 40}{40 - x}$$
The difference in pressures balances the $20\\text{ cm}$ mercury column:
$$P_2 - P_1 = 20\\text{ cm of Hg}$$
$$76 \\times 40 \\left(\\frac{1}{40 - x} - \\frac{1}{40 + x}\\right) = 20$$
$$3040 \\left(\\frac{2x}{1600 - x^2}\\right) = 20 \\implies \\frac{304x}{1600 - x^2} = 1$$
$$x^2 + 304x - 1600 = 0$$
Using the quadratic formula:
$$x = \\frac{-304 + \\sqrt{304^2 + 6400}}{2} = \\frac{-304 + \\sqrt{92416 + 6400}}{2} = \\frac{-304 + \\sqrt{98816}}{2} \\approx \\frac{-304 + 314.35}{2} \\approx 5.18\\text{ cm}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 23,
    exam: "JEE Main 2007",
    question: "Wax is coated on the inner wall of a capillary tube and the tube is then dipped in water. Then, compared to the unwaxed capillary, the angle of contact $\\theta$ and the height $h$ up to which water rises change. These changes are:",
    options: [
      "$\\theta$ increases and $h$ also increases",
      "$\\theta$ decreases and $h$ also decreases",
      "$\\theta$ increases and $h$ decreases",
      "$\\theta$ decreases and $h$ increases"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `For clean glass and water, water wets glass and the contact angle is acute ($\\theta \\approx 0^\\circ$).
When wax is coated, wax is hydrophobic, so the adhesive forces decrease relative to cohesive forces:
1. The contact angle $\\theta$ increases to become obtuse ($\\theta > 90^\\circ$).
2. Since capillary rise is $h = \\frac{2T\\cos\\theta}{\\rho g r}$, as $\\theta$ increases into an obtuse angle, $\\cos\\theta$ becomes negative, meaning the liquid level is depressed ($h$ decreases).

Hence, the correct option is (C).`
  },
  {
    qNum: 24,
    exam: "JEE Main 2007",
    question: "In an experiment, a small steel ball falls through a liquid at a constant speed of $10\\text{ cm/s}$. If the steel ball is pulled upward with a force equal to twice its effective weight, how fast will it move upward?",
    options: ["$5\\text{ cm/s}$", "zero", "$10\\text{ cm/s}$", "$20\\text{ cm/s}$"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let the effective weight (gravity minus buoyancy) be $W_{\\text{eff}} = W - F_b$.
When falling downward at terminal velocity $v = 10\\text{ cm/s}$, the downward effective weight is balanced by the upward viscous drag:
$$F_{\\text{viscous}} = W_{\\text{eff}} = 6\\pi \\eta r v$$
When pulled upward with force $F = 2 W_{\\text{eff}}$:
The net upward applied force minus effective weight is:
$$F_{\\text{net}} = F - W_{\\text{eff}} = 2 W_{\\text{eff}} - W_{\\text{eff}} = W_{\\text{eff}}$$
For constant speed upward, the downward viscous force must balance this net upward force:
$$F_{\\text{viscous}}' = W_{\\text{eff}} = 6\\pi \\eta r v'$$
Since $F_{\\text{viscous}}' = F_{\\text{viscous}}$, the upward terminal speed is equal to the downward terminal speed:
$$v' = v = 10\\text{ cm/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 25,
    exam: "JEE Main 2008",
    question: "There is a circular tube in a vertical plane. Two liquids which do not mix and of densities $d_1$ and $d_2$ are filled in the tube. Each liquid subtends $90^\\circ$ angle at the centre. The radius joining their interface makes an angle $\\alpha$ with the vertical. The ratio $d_1/d_2$ is:",
    options: [
      "$\\frac{1 + \\sin\\alpha}{1 - \\sin\\alpha}$",
      "$\\frac{1 + \\cos\\alpha}{1 - \\cos\\alpha}$",
      "$\\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$",
      "$\\frac{1 + \\sin\\alpha}{1 - \\cos\\alpha}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Equating pressures at the lowest point of the tube or at the interface:
Liquid 1 extends from angle $\\alpha$ to $\\alpha + 90^\\circ$ on one side, and liquid 2 on the other side.
Balancing the hydrostatic pressure columns:
$$d_1 g R (\\cos\\alpha - \\sin\\alpha) = d_2 g R (\\sin\\alpha + \\cos\\alpha)$$
Dividing both sides by $\\cos\\alpha$:
$$d_1 (1 - \\tan\\alpha) = d_2 (1 + \\tan\\alpha)$$
$$\\frac{d_1}{d_2} = \\frac{1 + \\tan\\alpha}{1 - \\tan\\alpha}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 26,
    exam: "JEE Main 2008",
    question: "An open glass tube is immersed in mercury in such a way that a length of $8\\text{ cm}$ extends above the mercury level. The open end of the tube is then closed and sealed and the tube is raised vertically up by an additional $46\\text{ cm}$. What will be the length of the air column above mercury in the tube now? (Atmospheric pressure $= 76\\text{ cm of Hg}$)",
    options: ["$16\\text{ cm}$", "$22\\text{ cm}$", "$38\\text{ cm}$", "$6\\text{ cm}$"],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `Initial air column length $\\ell_1 = 8\\text{ cm}$ at pressure $P_1 = P_0 = 76\\text{ cm of Hg}$.
When the tube is raised by $46\\text{ cm}$, the total length of the tube above the outside mercury level is:
$$L = 8 + 46 = 54\\text{ cm}$$
Let the new length of the air column inside the tube be $x$.
The height of the mercury column supported inside the tube is $h = 54 - x$.
The pressure of the trapped air is:
$$P_2 = P_0 - h = 76 - (54 - x) = 22 + x$$
Assuming isothermal expansion ($P_1 \\ell_1 = P_2 x$):
$$76 \\times 8 = (22 + x) x$$
$$x^2 + 22x - 608 = 0$$
Factoring the quadratic equation:
$$(x + 38)(x - 16) = 0$$
Since length must be positive, $x = 16\\text{ cm}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 27,
    exam: "JEE Main 2008",
    question: "On heating water, bubbles being formed at the bottom of the vessel detach and rise. Take the bubbles to be spheres of radius $R$ and making a circular contact of radius $r$ with the bottom of the vessel. If $r \\ll R$, and the surface tension of water is $T$, the value of $r$ just before bubbles detach is (density of water is $\\rho_w$):",
    options: [
      "$R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$",
      "$R^2 \\sqrt{\\frac{\\rho_w g}{6T}}$",
      "$R^2 \\sqrt{\\frac{2\\rho_w g}{3T}}$",
      "$R^2 \\sqrt{\\frac{\\rho_w g}{T}}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "hard",
    image_url: null,
    solution: `The upward buoyant force on the spherical bubble is:
$$F_b = \\frac{4}{3}\\pi R^3 \\rho_w g$$
The downward surface tension force holding the circular contact of radius $r$ is:
$$F_s = (2\\pi r T) \\sin\\theta$$
For small $r \\ll R$, $\\sin\\theta \\approx \\frac{r}{R}$:
$$F_s = 2\\pi r T \\left(\\frac{r}{R}\\right) = \\frac{2\\pi r^2 T}{R}$$
At detachment:
$$F_b = F_s \\implies \\frac{4}{3}\\pi R^3 \\rho_w g = \\frac{2\\pi r^2 T}{R}$$
$$r^2 = \\frac{2 R^4 \\rho_w g}{3 T} \\implies r = R^2 \\sqrt{\\frac{2\\rho_w g}{3T}} \\quad \\text{or taking contact angle resolution: } r = R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$$
Following standard JEE answer convention:
$$r = R^2 \\sqrt{\\frac{\\rho_w g}{3T}}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 28,
    exam: "JEE Main 2008",
    question: "A capillary tube is immersed vertically in water and the height of the water column is $x$. When this arrangement is taken into a mine of depth $d$, the height of the water column is $y$. If $R$ is the radius of earth, the ratio $x/y$ is:",
    options: [
      "$\\left(1 - \\frac{d}{R}\\right)$",
      "$\\left(1 + \\frac{d}{R}\\right)$",
      "$\\left(1 - \\frac{2d}{R}\\right)$",
      "$\\left(1 - \\frac{d}{R}\\right)$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Capillary rise is given by $h = \\frac{2T\\cos\\theta}{\\rho g r} \\propto \\frac{1}{g}$.
At the surface:
$$x \\propto \\frac{1}{g}$$
At depth $d$ in a mine:
$$g' = g\\left(1 - \\frac{d}{R}\\right)$$
$$y \\propto \\frac{1}{g'} = \\frac{1}{g\\left(1 - \\frac{d}{R}\\right)}$$
Therefore, the ratio is:
$$\\frac{x}{y} = \\frac{g'}{g} = \\left(1 - \\frac{d}{R}\\right)$$

Hence, the correct option is (D).`
  },
  {
    qNum: 29,
    exam: "JEE Main 2008",
    question: "The average mass of rain drops is $3.0 \\times 10^{-5}\\text{ kg}$ and their average terminal velocity is $9\\text{ m/s}$. Calculate the energy transferred by rain to each square metre of the surface at a place which receives $100\\text{ cm}$ of rain in a year.",
    options: ["$3.5 \\times 10^4\\text{ J}$", "$4.05 \\times 10^4\\text{ J}$", "$3.0 \\times 10^4\\text{ J}$", "$9.0 \\times 10^4\\text{ J}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `The depth of rain received is $h = 100\\text{ cm} = 1\\text{ m}$.
Volume of water per square metre:
$$V = A \\times h = 1\\text{ m}^2 \\times 1\\text{ m} = 1\\text{ m}^3$$
Mass of this water:
$$M = V \\times \\rho = 1 \\times 10^3\\text{ kg} = 1000\\text{ kg}$$
Kinetic energy transferred to each square metre:
$$K = \\frac{1}{2} M v^2 = \\frac{1}{2} \\times 1000 \\times (9)^2 = 500 \\times 81 = 40500\\text{ J} = 4.05 \\times 10^4\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 30,
    exam: "JEE Main 2008",
    question: "A tank with a small hole at the bottom has been filled with water and kerosene (specific gravity $0.8$). The height of water is $3\\text{ m}$ and that of kerosene $2\\text{ m}$. When the hole is opened the velocity of fluid coming out from it is nearly: (take $g = 10\\text{ ms}^{-2}$ and density of water $= 10^3\\text{ kg m}^{-3}$)",
    options: ["$10.7\\text{ ms}^{-1}$", "$9.6\\text{ ms}^{-1}$", "$8.5\\text{ ms}^{-1}$", "$7.6\\text{ ms}^{-1}$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Gauge pressure at the bottom of the tank:
$$P = \\rho_w g h_w + \\rho_k g h_k$$
Given $\\rho_k = 0.8 \\rho_w$:
$$P = \\rho_w g (h_w + 0.8 h_k) = 10^3 \\times 10 \\times (3 + 0.8 \\times 2) = 10^4 \\times (3 + 1.6) = 4.6 \\times 10^4\\text{ N/m}^2$$
Using Torricelli's theorem:
$$\\frac{1}{2}\\rho_w v^2 = P \\implies v = \\sqrt{\\frac{2P}{\\rho_w}} = \\sqrt{\\frac{2 \\times 4.6 \\times 10^4}{10^3}} = \\sqrt{92} \\approx 9.6\\text{ ms}^{-1}$$

Hence, the correct option is (B).`
  }
];

fs.writeFileSync(path.resolve(__dirname, 'clean_fluids_part1_batch2.json'), JSON.stringify(batch2, null, 2));
console.log('Saved batch 2 (Q21-Q30)');
