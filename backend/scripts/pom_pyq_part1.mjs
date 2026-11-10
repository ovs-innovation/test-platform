import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pom_diagram_urls.json'), 'utf8'));

export const POM_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'Water flows in a streamline motion through a horizontal pipe of circular cross-section as shown in the figure. The pressure difference of water between $P$ and $Q$ is $15\\text{ N m}^{-2}$. The area of cross-section at $P$ and $Q$ are $40\\text{ cm}^2$ and $20\\text{ cm}^2$, respectively. The rate of flow of water through the pipe, in $\\text{cm}^3\\text{ s}^{-1}$, is:\n[Take density of water $= 1000\\text{ kg m}^{-3}$]',
    options: ['400', '100', '200', '300'],
    correct_option: 0, // A
    image_url: urls['pom_q1_diagram'],
    solution: `1. From equation of continuity:
$$A_P v_P = A_Q v_Q$$
$$40 v_P = 20 v_Q \\implies v_Q = 2 v_P$$

2. Applying Bernoulli's equation for a horizontal pipe:
$$P_P + \\frac{1}{2}\\rho v_P^2 = P_Q + \\frac{1}{2}\\rho v_Q^2$$
$$P_P - P_Q = \\frac{1}{2}\\rho (v_Q^2 - v_P^2) = \\frac{1}{2}\\rho ((2v_P)^2 - v_P^2) = \\frac{3}{2}\\rho v_P^2$$

3. Substituting the given values:
$$15 = \\frac{3}{2} \\times 1000 \\times v_P^2 = 1500 v_P^2$$
$$v_P^2 = \\frac{15}{1500} = 10^{-2} \\implies v_P = 0.1\\text{ m/s} = 10\\text{ cm/s}$$

4. Flow rate:
$$Q = A_P v_P = 40\\text{ cm}^2 \\times 10\\text{ cm/s} = 400\\text{ cm}^3\\text{ s}^{-1}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: 'In the measurement of viscosity of liquids using terminal velocity experiment, spherical balls of same radius but having different densities are used. The variation of the terminal velocity ($v$) with the ratio of density of spherical ball ($\\sigma$) to density of the liquid ($\\rho$), is best represented by:',
    options: [
      urls['pom_q2_opt_a'],
      urls['pom_q2_opt_b'],
      urls['pom_q2_opt_c'],
      urls['pom_q2_opt_d']
    ],
    correct_option: 1, // B
    solution: `1. The terminal velocity of a spherical body falling through a viscous fluid is given by Stokes' law:
$$v = \\frac{2}{9}\\frac{r^2 g}{\\eta}(\\sigma - \\rho)$$
where:
- $\\sigma$ is the density of the spherical ball,
- $\\rho$ is the density of the liquid,
- $r$ is the radius, and $\\eta$ is the coefficient of viscosity.

2. Rewriting in terms of the ratio $\\frac{\\sigma}{\\rho}$:
$$v = \\frac{2}{9}\\frac{r^2 g \\rho}{\\eta}\\left(\\frac{\\sigma}{\\rho} - 1\\right)$$

3. Graph analysis:
- When $\\frac{\\sigma}{\\rho} = 1$, terminal velocity $v = 0$.
- For $\\frac{\\sigma}{\\rho} > 1$, the ball sinks downwards with positive terminal velocity $v$, which increases linearly with slope $\\frac{2 r^2 g \\rho}{9 \\eta}$.
- Therefore, the graph of $v$ vs $\\frac{\\sigma}{\\rho}$ is a straight line having an intercept on the horizontal axis at $\\frac{\\sigma}{\\rho} = 1$.

Hence, graph (B) correctly represents this linear variation.`
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: `Match List I with List II:

$$\\begin{array}{|l|l|l|l|}
\\hline
& \\textbf{List I} & & \\textbf{List II} \\\\
\\hline
\\text{A.} & \\text{Young's Modulus} & \\text{I.} & \\frac{\\Delta d}{\\Delta L}\\left(\\frac{L}{d}\\right) \\\\[6pt]
\\text{B.} & \\text{Compressibility} & \\text{II.} & \\frac{FL}{A(\\Delta L)} \\\\[6pt]
\\text{C.} & \\text{Bulk Modulus} & \\text{III.} & -\\frac{1}{\\Delta P}\\left(\\frac{\\Delta V}{V}\\right) \\\\[6pt]
\\text{D.} & \\text{Poisson's Ratio} & \\text{IV.} & -P\\left(\\frac{V}{\\Delta V}\\right) \\\\[6pt]
\\hline
\\end{array}$$

Choose the correct answer from the options given below:`,
    options: [
      'A-IV, B-I, C-II, D-III',
      'A-III, B-II, C-I, D-IV',
      'A-I, B-IV, C-III, D-II',
      'A-II, B-III, C-IV, D-I'
    ],
    correct_option: 3, // D
    solution: `1. Young's Modulus:
$$Y = \\frac{\\text{Tensile stress}}{\\text{Longitudinal strain}} = \\frac{F/A}{\\Delta L / L} = \\frac{FL}{A(\\Delta L)} \\implies \\text{A-II}$$

2. Bulk Modulus:
$$B = -\\frac{\\Delta P}{\\Delta V / V} = -P\\left(\\frac{V}{\\Delta V}\\right) \\implies \\text{C-IV}$$

3. Compressibility:
$$k = \\frac{1}{B} = -\\frac{1}{\\Delta P}\\left(\\frac{\\Delta V}{V}\\right) \\implies \\text{B-III}$$

4. Poisson's Ratio:
$$\\sigma = \\frac{\\text{Lateral strain}}{\\text{Longitudinal strain}} = \\frac{\\Delta d / d}{\\Delta L / L} = \\frac{\\Delta d}{\\Delta L}\\left(\\frac{L}{d}\\right) \\implies \\text{D-I}$$

Matching: A-II, B-III, C-IV, D-I.
Hence, the correct option is (D).`
  },
  {
    qNum: 4,
    exam: 'NEET 2026',
    question: 'A submarine is designed to withstand an absolute pressure of $100\\text{ atm}$. How deep can it go below the water surface?\n(Consider the density of water $= 1000\\text{ kg m}^{-3}$, $1\\text{ atm} = 1 \\times 10^5\\text{ Pa}$ and gravitational acceleration $g = 10\\text{ m/s}^2$)',
    options: ['990 m', '9900 m', '99 m', '9000 m'],
    correct_option: 0, // A
    solution: `1. Absolute pressure at depth $h$:
$$P = P_0 + \\rho g h$$
where $P_0 = 1\\text{ atm} = 10^5\\text{ Pa}$ is atmospheric pressure.

2. Given maximum absolute pressure $P = 100\\text{ atm}$:
$$\\rho g h = P - P_0 = 100\\text{ atm} - 1\\text{ atm} = 99\\text{ atm}$$
$$\\rho g h = 99 \\times 10^5\\text{ Pa}$$

3. Solving for depth $h$:
$$h = \\frac{99 \\times 10^5}{\\rho g} = \\frac{99 \\times 10^5}{1000 \\times 10} = \\frac{99 \\times 10^5}{10^4} = 990\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 5,
    exam: 'NEET 2025',
    question: 'Consider a water tank shown in the figure. It has one wall at $x = L$ and can be taken to be very wide in the $z$ direction. When filled with a liquid of surface tension $S$ and density $\\rho$, the liquid surface makes angle $\\theta_0$ ($\\theta_0 \\ll 1$) with the $x$-axis at $x = L$. If $y(x)$ is the height of the surface then the equation for $y(x)$ is: (take $\\theta(x) = \\sin\\theta(x) = \\tan\\theta(x) = \\frac{dy}{dx}$, $g$ is the acceleration due to gravity)',
    options: [
      '\\frac{d^2y}{dx^2} = \\sqrt{\\frac{\\rho g}{S}}',
      '\\frac{dy}{dx} = \\sqrt{\\frac{\\rho g}{S}} x',
      '\\frac{d^2y}{dx^2} = \\frac{\\rho g}{S} x',
      '\\frac{d^2y}{dx^2} = \\frac{\\rho g}{S} y'
    ],
    correct_option: 3, // D
    image_url: urls['pom_q5_diagram'],
    solution: `1. For a curved liquid surface, the pressure difference across the interface at height $y$ is given by Laplace's pressure:
$$\\Delta P = \\frac{S}{R}$$
where $\\frac{1}{R}$ is the curvature of the liquid surface.

2. For small slopes ($\\theta \\ll 1$), the curvature is:
$$\\frac{1}{R} \\approx \\frac{d^2y}{dx^2}$$

3. The hydrostatic pressure excess at height $y$ relative to the flat liquid surface at infinity is:
$$\\Delta P = \\rho g y$$

4. Equating the two expressions for excess pressure:
$$S \\frac{d^2y}{dx^2} = \\rho g y \\implies \\frac{d^2y}{dx^2} = \\frac{\\rho g}{S} y$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'An ideal fluid is flowing in a non-uniform cross-sectional tube $XY$ (as shown in the figure) from end $X$ to end $Y$. If $K_1$ and $K_2$ are the kinetic energy per unit volume of the fluid at $X$ and $Y$ respectively, then the correct option is :',
    options: ['$K_1 = K_2$', '$2K_1 = K_2$', '$K_1 > K_2$', '$K_1 < K_2$'],
    correct_option: 2, // C
    image_url: urls['pom_q6_diagram'],
    solution: `1. From the figure, the cross-sectional area of the tube at end $X$ is smaller than that at end $Y$:
$$A_X < A_Y$$

2. From equation of continuity for incompressible flow:
$$A_X v_X = A_Y v_Y \\implies v_X = \\frac{A_Y}{A_X} v_Y > v_Y$$

3. Kinetic energy per unit volume is:
$$K = \\frac{1}{2}\\rho v^2$$
Since $v_X > v_Y$, it follows that:
$$K_1 > K_2$$

Hence, the correct option is (C).`
  },
  {
    qNum: 7,
    exam: 'NEET 2024',
    question: 'The maximum elongation of a steel wire of $1\\text{ m}$ length if the elastic limit of steel and its Young\'s modulus, respectively, are $8 \\times 10^8\\text{ N m}^{-2}$ and $2 \\times 10^{11}\\text{ N m}^{-2}$, is:',
    options: ['4 mm', '0.4 mm', '40 mm', '8 mm'],
    correct_option: 0, // A
    solution: `1. Young's modulus is given by:
$$Y = \\frac{\\text{Stress}}{\\text{Strain}} = \\frac{\\text{Stress}}{\\Delta L / L}$$

2. Rearranging for maximum elongation $\\Delta L$:
$$\\Delta L = \\frac{\\text{Stress}_{\\max} \\times L}{Y}$$

3. Substituting the given values:
$$\\Delta L = \\frac{(8 \\times 10^8\\text{ N m}^{-2}) \\times 1\\text{ m}}{2 \\times 10^{11}\\text{ N m}^{-2}} = 4 \\times 10^{-3}\\text{ m} = 4\\text{ mm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 8,
    exam: 'NEET 2024',
    question: 'A thin flat circular disc of radius $4.5\\text{ cm}$ is placed gently over the surface of water. If surface tension of water is $0.07\\text{ N m}^{-1}$, then the excess force required to take it away from the surface is',
    options: ['19.8 mN', '198 N', '1.98 mN', '99 N'],
    correct_option: 0, // A
    solution: `1. A circular disc touching a liquid surface experiences surface tension force along its perimeter:
$$F = T \\times \\text{perimeter} = T \\times (2\\pi r)$$

2. Given:
- $r = 4.5\\text{ cm} = 0.045\\text{ m}$
- $T = 0.07\\text{ N m}^{-1}$

3. Calculating force:
$$F = 0.07 \\times 2 \\times 3.1416 \\times 0.045 = 0.01979\\text{ N} \\approx 19.8\\text{ mN}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 9,
    exam: 'NEET 2024',
    question: 'A metallic bar of Young\'s modulus, $0.5 \\times 10^{11}\\text{ N m}^{-2}$ and coefficient of linear thermal expansion $10^{-5}\\;^{\\circ}\\text{C}^{-1}$, length $1\\text{ m}$ and area of cross-section $10^{-3}\\text{ m}^2$ is heated from $0^{\\circ}\\text{C}$ to $100^{\\circ}\\text{C}$ without expansion or bending. The compressive force developed in it is :',
    options: [
      '$5 \\times 10^3\\text{ N}$',
      '$50 \\times 10^3\\text{ N}$',
      '$100 \\times 10^3\\text{ N}$',
      '$2 \\times 10^3\\text{ N}$'
    ],
    correct_option: 1, // B
    solution: `1. Thermal strain when expansion is completely prevented:
$$\\text{Thermal strain} = \\frac{\\Delta L}{L} = \\alpha \\Delta T$$

2. Thermal stress:
$$\\text{Stress} = Y \\times \\text{Strain} = Y \\alpha \\Delta T$$

3. Compressive force developed:
$$F = \\text{Stress} \\times A = Y A \\alpha \\Delta T$$

4. Substituting the given values:
$$F = (0.5 \\times 10^{11}) \\times (10^{-3}) \\times (10^{-5}) \\times (100 - 0)$$
$$F = 0.5 \\times 10^{11 - 3 - 5} \\times 10^2 = 0.5 \\times 10^3 \\times 10^2 = 50 \\times 10^3\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 10,
    exam: 'NEET 2023 Manipur',
    question: 'The amount of elastic potential energy per unit volume (in SI unit) of a steel wire of length $100\\text{ cm}$ to stretch it by $1\\text{ mm}$ is (if Young\'s modulus of the wire $= 2.0 \\times 10^{11}\\text{ N m}^{-2}$) :',
    options: ['$10^{11}$', '$10^{17}$', '$10^7$', '$10^5$'],
    correct_option: 3, // D
    solution: `1. Elastic energy density (potential energy per unit volume) is:
$$u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y (\\text{Strain})^2$$

2. Given:
- Length $L = 100\\text{ cm} = 1\\text{ m}$
- Elongation $\\Delta L = 1\\text{ mm} = 10^{-3}\\text{ m}$
- $\\text{Strain} = \\frac{\\Delta L}{L} = \\frac{10^{-3}}{1} = 10^{-3}$
- $Y = 2.0 \\times 10^{11}\\text{ N m}^{-2}$

3. Calculating $u$:
$$u = \\frac{1}{2} \\times (2.0 \\times 10^{11}) \\times (10^{-3})^2 = 10^{11} \\times 10^{-6} = 10^5\\text{ J/m}^3$$

Hence, the correct option is (D).`
  },
  {
    qNum: 11,
    exam: 'NEET 2023 Manipur',
    question: 'Which of the following statements is not true?',
    options: [
      'Coefficient of viscosity is a scalar quantity',
      'Surface tension is a scalar quantity',
      'Pressure is a vector quantity',
      'Relative density is a scalar quantity'
    ],
    correct_option: 2, // C
    solution: `1. Pressure is defined as the magnitude of normal compressive force per unit area:
$$P = \\frac{F_{\\perp}}{A}$$
Pressure acts perpendicular to any surface immersed in a fluid regardless of orientation and does not have a specific direction in space. Therefore, pressure is a scalar (tensor of rank 0) quantity.

2. Since statement (C) claims that pressure is a vector quantity, it is incorrect (not true).

Hence, the correct option is (C).`
  },
  {
    qNum: 12,
    exam: 'NEET 2023 Manipur',
    question: 'The viscous drag acting on a metal sphere of diameter $1\\text{ mm}$, falling through a fluid of viscosity $0.8\\text{ Pa s}$ with a velocity of $2\\text{ m s}^{-1}$ is equal to :',
    options: [
      '$15 \\times 10^{-3}\\text{ N}$',
      '$30 \\times 10^{-3}\\text{ N}$',
      '$1.5 \\times 10^{-3}\\text{ N}$',
      '$20 \\times 10^{-3}\\text{ N}$'
    ],
    correct_option: 0, // A
    solution: `1. Stokes' law for viscous drag force on a sphere:
$$F = 6\\pi \\eta r v$$

2. Given:
- Diameter $d = 1\\text{ mm} \\implies r = 0.5\\text{ mm} = 0.5 \\times 10^{-3}\\text{ m}$
- Viscosity $\\eta = 0.8\\text{ Pa s}$
- Velocity $v = 2\\text{ m s}^{-1}$

3. Calculating $F$:
$$F = 6 \\times 3.1416 \\times 0.8 \\times (0.5 \\times 10^{-3}) \\times 2$$
$$F = 6 \\times 3.1416 \\times 0.8 \\times 10^{-3} \\approx 15.08 \\times 10^{-3}\\text{ N} \\approx 15 \\times 10^{-3}\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 13,
    exam: 'NEET 2023',
    question: 'The amount of energy required to form a soap bubble of radius $2\\text{ cm}$ from a soap solution is nearly: (surface tension of soap solution $= 0.03\\text{ N m}^{-1}$)',
    options: [
      '$5.06 \\times 10^{-4}\\text{ J}$',
      '$3.01 \\times 10^{-4}\\text{ J}$',
      '$50.1 \\times 10^{-4}\\text{ J}$',
      '$30.16 \\times 10^{-4}\\text{ J}$'
    ],
    correct_option: 1, // B
    solution: `1. A soap bubble has two free liquid surfaces (inner and outer).
The total increase in surface area is:
$$\\Delta A = 2 \\times (4\\pi r^2) = 8\\pi r^2$$

2. Energy required:
$$W = T \\times \\Delta A = 8\\pi T r^2$$

3. Given:
- $r = 2\\text{ cm} = 0.02\\text{ m}$
- $T = 0.03\\text{ N m}^{-1}$

4. Calculation:
$$W = 8 \\times 3.1416 \\times 0.03 \\times (0.02)^2$$
$$W = 0.754 \\times 4 \\times 10^{-4} \\approx 3.01 \\times 10^{-4}\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 14,
    exam: 'NEET 2023',
    question: 'The venturi-meter works on :',
    options: [
      'Bernoulli\'s principle',
      'The principle of parallel axes',
      'The principle of perpendicular axes',
      'Huygen\'s principle'
    ],
    correct_option: 0, // A
    solution: `1. A venturi-meter is a device used for measuring the rate of flow of an incompressible fluid through a pipe.
2. It consists of a constriction (throat) where the velocity of fluid increases and consequently the pressure decreases according to Bernoulli's equation:
$$P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$$
3. By measuring the pressure difference between the wide part and throat using a manometer, the flow rate is determined.

Hence, the correct option is (A).`
  },
  {
    qNum: 15,
    exam: 'NEET 2023',
    question: 'Let a wire be suspended from the ceiling (rigid support) and stretched by a weight $W$ attached at its free end. The longitudinal stress at any point of cross-sectional area $A$ of the wire is :',
    options: ['$W/A$', '$W/2A$', 'Zero', '$2W/A$'],
    correct_option: 0, // A
    solution: `1. Longitudinal stress is defined as the internal restoring force developed per unit cross-sectional area of the wire.
2. At equilibrium, the restoring force at any cross-section equals the applied tensile load $W$.
$$\\text{Stress} = \\frac{\\text{Restoring Force}}{\\text{Area}} = \\frac{W}{A}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 16,
    exam: 'NEET 2022 Phase 2',
    question: 'Two copper vessels A and B have the same base area but of different shapes. A takes twice the volume of water as that B requires to fill upto a particular common height. Then the correct statement among the following is :',
    options: [
      'Vessel B weighs twice that of A.',
      'Pressure on the base area of vessels A and B is same.',
      'Pressure on the base area of vessels A and B is not same.',
      'Both vessels A and B weigh the same.'
    ],
    correct_option: 1, // B
    solution: `1. According to hydrostatic paradox, the hydrostatic pressure exerted by a liquid column at depth $h$ is given by:
$$P = \\rho g h$$
2. Pressure depends only on the depth $h$, the density $\\rho$, and acceleration due to gravity $g$; it is completely independent of the shape of the vessel or the total volume of liquid contained.
3. Since both vessels are filled to the identical height $h$ with water and have identical base area:
$$P_A = P_B = \\rho g h$$
The pressure at the base area of both vessels is exactly the same.

Hence, the correct option is (B).`
  },
  {
    qNum: 17,
    exam: 'NEET 2022 Phase 2',
    question: 'The terminal velocity of a copper ball of radius $5\\text{ mm}$ falling through a tank of oil at room temperature is $10\\text{ cm s}^{-1}$. If the viscosity of oil at room temperature is $0.9\\text{ kg m}^{-1}\\text{ s}^{-1}$, the viscous drag force is :',
    options: [
      '$4.23 \\times 10^{-6}\\text{ N}$',
      '$8.48 \\times 10^{-3}\\text{ N}$',
      '$8.48 \\times 10^{-5}\\text{ N}$',
      '$4.23 \\times 10^{-3}\\text{ N}$'
    ],
    correct_option: 1, // B
    solution: `1. By Stokes' law, the viscous drag force is:
$$F = 6\\pi \\eta r v$$

2. Given:
- Radius $r = 5\\text{ mm} = 5 \\times 10^{-3}\\text{ m}$
- Viscosity $\\eta = 0.9\\text{ kg m}^{-1}\\text{ s}^{-1}$
- Terminal velocity $v = 10\\text{ cm s}^{-1} = 0.1\\text{ m s}^{-1}$

3. Calculating $F$:
$$F = 6 \\times \\pi \\times 0.9 \\times (5 \\times 10^{-3}) \\times 0.1$$
$$F = 2.7 \\pi \\times 10^{-3} = 2.7 \\times 3.1416 \\times 10^{-3} \\approx 8.48 \\times 10^{-3}\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 18,
    exam: 'NEET 2022 Phase 1',
    question: 'A spherical ball is dropped in a long column of a highly viscous liquid. The curve in the graph shown, which represents the speed of the ball ($v$) as a function of time ($t$) is',
    options: ['A', 'B', 'C', 'D'],
    correct_option: 1, // B
    image_url: urls['pom_q18_diagram'],
    solution: `1. When a spherical ball is dropped in a viscous medium, it accelerates downwards under gravity and buoyant force while opposing viscous drag force $F_v = 6\\pi\\eta r v$ increases linearly with velocity.
2. The equation of motion is:
$$m \\frac{dv}{dt} = m' g - 6\\pi \\eta r v$$
3. Integrating with initial condition $v(0) = 0$ yields:
$$v(t) = v_T \\left(1 - e^{-t/\\tau}\\right)$$
where $v_T$ is the terminal velocity.
4. Curve B correctly illustrates:
- Starting from zero velocity at $t = 0$,
- Acceleration $\\frac{dv}{dt}$ decreasing continuously as viscous force builds up,
- Speed approaching the constant terminal velocity asymptotically.

Hence, curve B is the correct representation, option (B).`
  },
  {
    qNum: 19,
    exam: 'NEET 2022 Phase 1',
    question: 'If a soap bubble expands, the pressure inside the bubble',
    options: [
      'Decreases',
      'Increases',
      'Remains the same',
      'Is equal to the atmospheric pressure'
    ],
    correct_option: 0, // A
    solution: `1. The pressure inside a spherical soap bubble of radius $R$ is given by:
$$P_{\\text{in}} = P_0 + \\frac{4T}{R}$$
where $P_0$ is the atmospheric pressure and $T$ is the surface tension of the soap solution.

2. When the bubble expands, its radius $R$ increases.
3. Consequently, the excess pressure $\\frac{4T}{R}$ decreases, causing the total internal pressure $P_{\\text{in}}$ to decrease.

Hence, the correct option is (A).`
  },
  {
    qNum: 20,
    exam: 'NEET 2022 Phase 1',
    question: `Given below are two statements : One is labelled as Assertion (A) and the other is labelled as Reason (R).

Assertion (A) : The stretching of a spring is determined by the shear modulus of the material of the spring.
Reason (R) : A coil spring of copper has more tensile strength than a steel spring of same dimensions.

In the light of the above statements, choose the most appropriate answer from the options given below:`,
    options: [
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true and (R) is not the correct explanation of (A)',
      '(A) is true but (R) is false',
      '(A) is false but (R) is true'
    ],
    correct_option: 2, // C
    solution: `1. Assertion (A): When a helical coil spring is stretched, the wire is subjected to twisting (torsion), producing shear strain along the wire cross-section. Thus, the elongation depends on the shear modulus (modulus of rigidity) of the material. Assertion (A) is true.

2. Reason (R): Steel has a significantly higher ultimate tensile strength and Young's modulus than copper. A steel spring can withstand much higher tensile force before plastic deformation or rupture. Thus, Reason (R) is false.

Hence, (A) is true but (R) is false, option (C).`
  },
  {
    qNum: 21,
    exam: 'NEET 2021',
    question: 'A cup of coffee cools from $90^{\\circ}\\text{C}$ to $80^{\\circ}\\text{C}$ in $t$ minutes, when the room temperature is $20^{\\circ}\\text{C}$. The time taken by a similar cup of coffee to cool from $80^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$ at a room temperature same at $20^{\\circ}\\text{C}$ is :',
    options: ['\\frac{5}{13}t', '\\frac{13}{10}t', '\\frac{13}{5}t', '\\frac{10}{13}t'],
    correct_option: 2, // C
    solution: `1. From Newton's law of cooling:
$$\\frac{T_1 - T_2}{t} = K\\left(\\frac{T_1 + T_2}{2} - T_0\\right)$$

2. Case 1: Cooling from $90^{\\circ}\\text{C}$ to $80^{\\circ}\\text{C}$ in time $t$:
$$\\frac{90 - 80}{t} = K\\left(\\frac{90 + 80}{2} - 20\\right)$$
$$\\frac{10}{t} = K(85 - 20) = 65K \\implies K = \\frac{10}{65t} = \\frac{2}{13t}$$

3. Case 2: Cooling from $80^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$ in time $t'$:
$$\\frac{80 - 60}{t'} = K\\left(\\frac{80 + 60}{2} - 20\\right)$$
$$\\frac{20}{t'} = K(70 - 20) = 50K$$

4. Substituting $K = \\frac{2}{13t}$:
$$\\frac{20}{t'} = 50 \\times \\frac{2}{13t} = \\frac{100}{13t}$$
$$t' = \\frac{20 \\times 13t}{100} = \\frac{13}{5}t$$

Hence, the correct option is (C).`
  },
  {
    qNum: 22,
    exam: 'NEET 2021',
    question: 'The velocity of a small ball of mass $M$ and density $d$, when dropped in a container filled with glycerin becomes constant after some time. If the density of glycerin is $\\frac{d}{2}$, then the viscous force acting on the ball will be :',
    options: ['$2Mg$', '\\frac{Mg}{2}', '$Mg$', '\\frac{3}{2}Mg'],
    correct_option: 1, // B
    solution: `1. When the ball reaches constant terminal velocity, its acceleration is zero, so the net vertical force is zero:
$$F_{\\text{net}} = 0 \\implies F_v + F_b = M g$$
$$F_v = M g - F_b$$
where $F_v$ is the viscous drag force and $F_b$ is the buoyant force.

2. Volume of the ball is $V = \\frac{M}{d}$.
Buoyant force:
$$F_b = V \\rho_{\\text{glycerin}} g = \\left(\\frac{M}{d}\\right) \\left(\\frac{d}{2}\\right) g = \\frac{Mg}{2}$$

3. Viscous force:
$$F_v = M g - \\frac{Mg}{2} = \\frac{Mg}{2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 23,
    exam: 'NEET 2020 Phase 2',
    question: 'A barometer is constructed using a liquid (density $= 760\\text{ kg/m}^3$). What would be the height of the liquid column, when a mercury barometer reads $76\\text{ cm}$?\n(density of mercury $= 13600\\text{ kg/m}^3$)',
    options: ['0.76 m', '1.36 m', '13.6 m', '136 m'],
    correct_option: 2, // C
    solution: `1. Pressure measured by both barometers must be equal to atmospheric pressure:
$$P = \\rho_{\\text{Hg}} g h_{\\text{Hg}} = \\rho_{\\text{liquid}} g h_{\\text{liquid}}$$

2. Given:
- $h_{\\text{Hg}} = 76\\text{ cm} = 0.76\\text{ m}$
- $\\rho_{\\text{Hg}} = 13600\\text{ kg/m}^3$
- $\\rho_{\\text{liquid}} = 760\\text{ kg/m}^3$

3. Solving for $h_{\\text{liquid}}$:
$$h_{\\text{liquid}} = \\frac{\\rho_{\\text{Hg}} h_{\\text{Hg}}}{\\rho_{\\text{liquid}}} = \\frac{13600 \\times 0.76}{760} = \\frac{13600}{1000} = 13.6\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 24,
    exam: 'NEET 2020 Phase 2',
    question: 'A liquid does not wet the solid surface if angle of contact is',
    options: ['zero', 'equal to 45^\\circ', 'equal to 60^\\circ', 'greater than 90^\\circ'],
    correct_option: 3, // D
    solution: `1. The angle of contact $\\theta$ determines whether a liquid wets a solid:
- If cohesive forces between liquid molecules are stronger than adhesive forces between liquid and solid, the meniscus is convex and the angle of contact is obtuse ($\\theta > 90^{\\circ}$).
- In this case, the liquid does not wet the solid surface (e.g., mercury on glass).
- If $\\theta < 90^{\\circ}$ (acute), the liquid wets the solid surface.

Hence, the angle of contact must be greater than $90^{\\circ}$, option (D).`
  },
  {
    qNum: 25,
    exam: 'NEET 2020 Phase 1',
    question: 'A capillary tube of radius $r$ is immersed in water and water rises in it to a height $h$. The mass of the water in the capillary is $5\\text{ g}$. Another capillary tube of radius $2r$ is immersed in water. The mass of water that will rise in this tube is :',
    options: ['5.0 g', '10.0 g', '20.0 g', '2.5 g'],
    correct_option: 1, // B
    solution: `1. The upward force due to surface tension supporting the liquid column of mass $m$ is:
$$F = (2\\pi r T \\cos\\theta) = m g$$
$$m = \\frac{2\\pi r T \\cos\\theta}{g} \\implies m \\propto r$$

2. Since mass $m$ is directly proportional to radius $r$:
$$\\frac{m_2}{m_1} = \\frac{r_2}{r_1} = \\frac{2r}{r} = 2$$
$$m_2 = 2 \\times m_1 = 2 \\times 5\\text{ g} = 10.0\\text{ g}$$

Hence, the correct option is (B).`
  }
];

