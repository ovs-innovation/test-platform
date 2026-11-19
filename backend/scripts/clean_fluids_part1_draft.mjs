import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKey = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_official_key.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'fluids_diagram_urls.json'), 'utf8'));

// Part 1: Q1 to Q50
export const FLUIDS_PART1 = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "A cylinder of height $20\\text{ m}$ is completely filled with water. The velocity of efflux of water (in $\\text{ms}^{-1}$) through a small hole on the side wall of the cylinder near its bottom is:",
    options: ["$10$", "$20$", "$25.5$", "$5$"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `According to Torricelli's law, the velocity of efflux through a hole at depth $h$ below the free surface of a liquid is:
$$v = \\sqrt{2gh}$$
Given $h = 20\\text{ m}$ and taking $g = 10\\text{ ms}^{-2}$:
$$v = \\sqrt{2 \\times 10 \\times 20} = \\sqrt{400} = 20\\text{ ms}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "If two soap bubbles of different radii are connected by a tube:",
    options: [
      "air flows from the bigger bubble to the smaller bubble till the sizes are equalized",
      "air flows from bigger bubble to the smaller bubble till the sizes are interchanged",
      "air flows from the smaller bubble to the bigger bubble",
      "there is no flow of air"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `The excess pressure inside a spherical soap bubble of radius $R$ is given by:
$$\\Delta P = \\frac{4T}{R}$$
The smaller the radius of the bubble, the higher the pressure inside it ($P_{\\text{inside}} = P_0 + \\frac{4T}{R}$).
Therefore, the smaller bubble has a higher internal pressure than the larger bubble. When they are connected by a tube, air flows from the region of higher pressure to lower pressure, i.e., from the smaller bubble to the bigger bubble, making the smaller bubble even smaller and the bigger bubble bigger.

Hence, the correct option is (C).`
  },
  {
    qNum: 3,
    exam: "JEE Main 2002",
    question: "Spherical balls of radius $R$ are falling in a viscous fluid of viscosity $\\eta$ with a velocity $v$. The retarding viscous force acting on the spherical ball is:",
    options: [
      "directly proportional to $R$ but inversely proportional to $v$",
      "directly proportional to both radius $R$ and velocity $v$",
      "inversely proportional to both radius $R$ and velocity $v$",
      "inversely proportional to $R$ but directly proportional to velocity $v$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `According to Stokes' Law, the viscous retarding force acting on a sphere of radius $R$ moving with velocity $v$ through a fluid of viscosity $\\eta$ is given by:
$$F = 6\\pi \\eta R v$$
Thus, the viscous force is directly proportional to both the radius $R$ and the velocity $v$.

Hence, the correct option is (B).`
  },
  {
    qNum: 4,
    exam: "JEE Main 2002",
    question: "A $20\\text{ cm}$ long capillary tube is dipped in water. The water rises up to $8\\text{ cm}$. If the entire arrangement is put in a freely falling elevator, the length of water column in the capillary tube will be:",
    options: ["$8\\text{ cm}$", "$10\\text{ cm}$", "$4\\text{ cm}$", "$20\\text{ cm}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: `The height of liquid column in a capillary tube is given by:
$$h = \\frac{2T\\cos\\theta}{\\rho g_{\\text{eff}} r}$$
In a freely falling elevator, the effective acceleration due to gravity is zero ($g_{\\text{eff}} = g - g = 0$).
Consequently, the theoretical height $h \\to \\infty$, so the liquid rises to the maximum available length of the capillary tube and adjusts its radius of curvature at the top so that it does not overflow.
Since the tube is $20\\text{ cm}$ long, the water column will fill the entire length of $20\\text{ cm}$.

Hence, the correct option is (D).`
  },
  {
    qNum: 5,
    exam: "JEE Main 2003",
    question: "If the terminal speed of a sphere of gold (density $= 19.5\\text{ g/cm}^3$) is $0.2\\text{ m/s}$ in a viscous liquid (density $= 1.5\\text{ g/cm}^3$), find the terminal speed of a sphere of silver (density $= 10.5\\text{ g/cm}^3$) of the same size in the same liquid.",
    options: ["$0.2\\text{ m/s}$", "$0.4\\text{ m/s}$", "$0.133\\text{ m/s}$", "$0.1\\text{ m/s}$"],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `The terminal velocity of a spherical body in a viscous fluid is given by:
$$v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}$$
Since both spheres have the same radius and are falling in the same liquid:
$$v_t \\propto (\\rho - \\sigma)$$
For the gold sphere:
$$v_{\\text{gold}} \\propto (19.5 - 1.5) = 18.0$$
For the silver sphere:
$$v_{\\text{silver}} \\propto (10.5 - 1.5) = 9.0$$
Taking the ratio:
$$\\frac{v_{\\text{silver}}}{v_{\\text{gold}}} = \\frac{9.0}{18.0} = 0.5$$
$$v_{\\text{silver}} = 0.5 \\times 0.2 = 0.1\\text{ m/s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: "JEE Main 2003",
    question: "A jar is filled with two non-mixing liquids 1 and 2 having densities $\\rho_1$ and $\\rho_2$ respectively. A solid ball, made of a material of density $\\rho_3$, is dropped in the jar. It comes to equilibrium in the position shown in the figure. Which of the following is true for $\\rho_1, \\rho_2$ and $\\rho_3$?",
    options: [
      "$\\rho_3 < \\rho_1 < \\rho_2$",
      "$\\rho_1 < \\rho_3 < \\rho_2$",
      "$\\rho_1 > \\rho_3 > \\rho_2$",
      "$\\rho_1 < \\rho_2 < \\rho_3$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q6_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075476/edvedum/fluids_pyq/q6_diagram.png",
    solution: `From the equilibrium position shown in the figure:
1. Liquid 1 floats above liquid 2, which implies:
$$\\rho_1 < \\rho_2$$
2. The solid ball sinks completely through liquid 1, so:
$$\\rho_3 > \\rho_1$$
3. The solid ball floats at the interface without completely sinking into liquid 2, so:
$$\\rho_3 < \\rho_2$$
Combining these inequalities gives:
$$\\rho_1 < \\rho_3 < \\rho_2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 7,
    exam: "JEE Main 2004",
    question: "A capillary tube (A) is dipped in water. Another identical tube (B) is dipped in a soap-water solution. Which of the following shows the relative nature of the liquid columns in the two tubes?",
    options: ["Figure (A)", "Figure (B)", "Figure (C)", "Figure (D)"],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q7_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075478/edvedum/fluids_pyq/q7_diagram.png",
    solution: `The capillary rise is given by:
$$h = \\frac{2T\\cos\\theta}{\\rho g r}$$
1. Pure water has a higher surface tension $T_{\\text{water}} \\approx 0.072\\text{ N/m}$, whereas soap solution has a significantly lower surface tension ($T_{\\text{soap}} \\approx 0.030\\text{ N/m}$).
2. Therefore, the height of the liquid column in tube A (pure water) must be greater than that in tube B (soap solution), i.e., $h_A > h_B$.
3. Both liquids wet glass and have acute contact angles, forming concave menisci.

Thus, Figure (C) correctly depicts $h_A > h_B$.
Hence, the correct option is (C).`
  },
  {
    qNum: 8,
    exam: "JEE Main 2004",
    question: "A spherical solid ball of volume $V$ is made of a material of density $\\rho_1$. It is falling through a liquid of density $\\rho_2$ ($\\rho_2 < \\rho_1$). Assume that the liquid applies a viscous force on the ball that is proportional to the square of its speed $v$, i.e., $F_{\\text{viscous}} = -k v^2$ ($k > 0$). The terminal speed of the ball is:",
    options: [
      "$\\sqrt{\\frac{V g(\\rho_1 - \\rho_2)}{k}}$",
      "$\\frac{V g(\\rho_1 - \\rho_2)}{k}$",
      "$\\sqrt{\\frac{V g\\rho_1}{k}}$",
      "$\\frac{V g\\rho_1}{k}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `At terminal velocity $v_t$, the net downward gravitational force minus the buoyant force is balanced by the upward viscous retarding force:
$$F_{\\text{net}} = W - F_b - F_{\\text{viscous}} = 0$$
$$V\\rho_1 g - V\\rho_2 g = k v_t^2$$
$$V(\\rho_1 - \\rho_2)g = k v_t^2$$
Solving for $v_t$:
$$v_t = \\sqrt{\\frac{V g(\\rho_1 - \\rho_2)}{k}}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 9,
    exam: "JEE Main 2004",
    question: "A ball is made of a material of density $\\rho$ where $\\rho_{\\text{oil}} < \\rho < \\rho_{\\text{water}}$ with $\\rho_{\\text{oil}}$ and $\\rho_{\\text{water}}$ representing the densities of oil and water respectively. The oil and water are immiscible. If the above system is in equilibrium, which of the following diagrams best represents the position of the ball?",
    options: ["Diagram (A)", "Diagram (B)", "Diagram (C)", "Diagram (D)"],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: diagramUrls['q9_diagram.png'] || "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795075480/edvedum/fluids_pyq/q9_diagram.png",
    solution: `Since $\\rho_{\\text{oil}} < \\rho_{\\text{water}}$, oil forms the upper layer and water forms the bottom layer.
For the ball:
- $\\rho > \\rho_{\\text{oil}}$, so the ball sinks through the oil layer.
- $\\rho < \\rho_{\\text{water}}$, so the ball floats on water.
Therefore, the ball must float at the oil-water interface, partly submerged in water and partly in oil.

Diagram (B) correctly depicts the ball in equilibrium at the boundary between oil and water.
Hence, the correct option is (B).`
  },
  {
    qNum: 10,
    exam: "JEE Main 2004",
    question: "Water is flowing continuously from a tap having an internal diameter $8 \\times 10^{-3}\\text{ m}$. The water velocity as it leaves the tap is $0.4\\text{ ms}^{-1}$. The diameter of the water stream at a distance $2 \\times 10^{-1}\\text{ m}$ below the tap is:",
    options: [
      "$7.5 \\times 10^{-3}\\text{ m}$",
      "$9.6 \\times 10^{-3}\\text{ m}$",
      "$3.6 \\times 10^{-3}\\text{ m}$",
      "$5.0 \\times 10^{-3}\\text{ m}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: `Let the initial velocity be $v_1 = 0.4\\text{ m/s}$ and diameter $d_1 = 8 \\times 10^{-3}\\text{ m}$.
At a distance $h = 2 \\times 10^{-1}\\text{ m} = 0.2\\text{ m}$ below the tap, the velocity $v_2$ is obtained from kinematics:
$$v_2^2 = v_1^2 + 2gh = (0.4)^2 + 2 \\times 9.8 \\times 0.2 = 0.16 + 3.92 = 4.08\\text{ m}^2/\\text{s}^2$$
$$v_2 \\approx 2.02\\text{ m/s}$$
From the equation of continuity for an incompressible fluid:
$$A_1 v_1 = A_2 v_2 \\implies d_1^2 v_1 = d_2^2 v_2$$
$$d_2 = d_1 \\sqrt{\\frac{v_1}{v_2}} = 8 \\times 10^{-3} \\times \\sqrt{\\frac{0.4}{2.02}} \\approx 8 \\times 10^{-3} \\times \\sqrt{0.198} \\approx 8 \\times 10^{-3} \\times 0.445 \\approx 3.6 \\times 10^{-3}\\text{ m}$$

Hence, the correct option is (C).`
  }
];
