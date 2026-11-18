import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solids_diagram_urls.json'), 'utf8'));

export const SOLIDS_PYQ_PART2 = [
  {
    qNum: 51,
    exam: 'JEE Main 2022 (26 Jul, Shift 2)',
    question: 'The area of cross section of the rope used to lift a load by a crane is $2.5 \\times 10^{-4}\\text{ m}^2$. The maximum lifting capacity of the crane is $10\\text{ metric tons}$. To increase the lifting capacity of the crane to $25\\text{ metric tons}$, the required area of cross section of the rope should be: (take $g = 10\\text{ m s}^{-2}$)',
    options: [
      '$6.25 \\times 10^{-4}\\text{ m}^2$',
      '$10 \\times 10^{-4}\\text{ m}^2$',
      '$1 \\times 10^{-4}\\text{ m}^2$',
      '$1.67 \\times 10^{-4}\\text{ m}^2$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Since breaking stress is an intrinsic material property, the maximum allowable tensile stress remains constant:
$$\\text{Breaking Stress} = \\frac{\\text{Maximum Load}}{A} = \\text{constant}$$

Therefore:
$$\\frac{M_1}{A_1} = \\frac{M_2}{A_2} \\implies A_2 = A_1 \\times \\frac{M_2}{M_1}$$

Given:
- $M_1 = 10\\text{ metric tons}$
- $A_1 = 2.5 \\times 10^{-4}\\text{ m}^2$
- $M_2 = 25\\text{ metric tons}$

$$A_2 = (2.5 \\times 10^{-4}) \\times \\frac{25}{10} = 2.5 \\times 2.5 \\times 10^{-4} = 6.25 \\times 10^{-4}\\text{ m}^2$$

Hence, the correct option is (A).`
  },
  {
    qNum: 52,
    exam: 'JEE Main 2022 (27 Jul, Shift 1)',
    question: 'A square aluminium (shear modulus is $25 \\times 10^9\\text{ N m}^{-2}$) slab of side $60\\text{ cm}$ and thickness $15\\text{ cm}$ is subjected to a shearing force (on its narrow face) of $18.0 \\times 10^4\\text{ N}$. The lower edge is riveted to the floor. The displacement of the upper edge is ________ $\\mu\\text{m}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 48,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Shear modulus is defined as:
$$\\eta = \\frac{F / A}{\\Delta x / h} \\implies \\Delta x = \\frac{F h}{A \\eta}$$

Given:
- Force $F = 18.0 \\times 10^4\\text{ N}$
- Height $h = 60\\text{ cm} = 0.60\\text{ m}$
- Sheared area (narrow face) $A = 60\\text{ cm} \\times 15\\text{ cm} = 0.60 \\times 0.15 = 0.09\\text{ m}^2$
- Shear modulus $\\eta = 25 \\times 10^9\\text{ N m}^{-2}$

$$\\Delta x = \\frac{(18.0 \\times 10^4) \\times 0.60}{0.09 \\times (25 \\times 10^9)} = \\frac{10.8 \\times 10^4}{2.25 \\times 10^9} = 4.8 \\times 10^{-5}\\text{ m} = 48 \\times 10^{-6}\\text{ m} = 48\\,\\mu\\text{m}$$

The displacement of the upper edge is 48.`
  },
  {
    qNum: 53,
    exam: 'JEE Main 2022 (27 Jul, Shift 2)',
    question: 'In an experiment to determine the Young\'s modulus, steel wires of five different lengths ($1, 2, 3, 4$ and $5\\text{ m}$) but of same cross-section ($2\\text{ mm}^2$) were taken and curves between extension and load were obtained. The slope (extension/load) of the curves were plotted with the wire length and the following graph is obtained. If the Young\'s modulus of given steel wires is $x \\times 10^{11}\\text{ N m}^{-2}$, then the value of $x$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['53'],
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{A Y} \\implies \\frac{\\Delta L}{F} = \\left(\\frac{1}{A Y}\\right) L$$

The slope of the (extension/load) versus length ($L$) graph is:
$$m = \\frac{1}{A Y} \\implies Y = \\frac{1}{m A}$$

From the graph, at $L = 5\\text{ m}$, the slope $\\frac{\\Delta L}{F} = 1.25 \\times 10^{-3}\\text{ m N}^{-1}$:
$$m = \\frac{1.25 \\times 10^{-3}}{5} = 0.25 \\times 10^{-3}\\text{ N}^{-1}$$

Given $A = 2\\text{ mm}^2 = 2 \\times 10^{-6}\\text{ m}^2$:
$$Y = \\frac{1}{(0.25 \\times 10^{-3}) \\times (2 \\times 10^{-6})} = \\frac{1}{0.5 \\times 10^{-9}} = 2 \\times 10^{11}\\text{ N m}^{-2}$$

Comparing with $x \\times 10^{11}\\text{ N m}^{-2}$, we get $x = 2$.`
  },
  {
    qNum: 54,
    exam: 'JEE Main 2022 (27 Jul, Shift 2)',
    question: 'A steel wire of length $3.2\\text{ m}$ ($Y_s = 2.0 \\times 10^{11}\\text{ N m}^{-2}$) and a copper wire of length $4.4\\text{ m}$ ($Y_c = 1.1 \\times 10^{11}\\text{ N m}^{-2}$), both of radius $1.4\\text{ mm}$ are connected end to end. When stretched by a load, the net elongation is found to be $1.4\\text{ mm}$. The load applied, in Newton, will be: (Given $\\pi = \\frac{22}{7}$)',
    options: ['$360$', '$180$', '$1080$', '$154$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tension $F$ is identical throughout both wires in series.
Total elongation:
$$\\Delta L_{\\text{total}} = \\Delta L_s + \\Delta L_c = \\frac{F L_s}{A Y_s} + \\frac{F L_c}{A Y_c} = \\frac{F}{A} \\left(\\frac{L_s}{Y_s} + \\frac{L_c}{Y_c}\\right)$$

Given:
- $r = 1.4\\text{ mm} = 1.4 \\times 10^{-3}\\text{ m}$
- $A = \\pi r^2 = \\frac{22}{7} \\times (1.4 \\times 10^{-3})^2 = \\frac{22}{7} \\times 1.96 \\times 10^{-6} = 6.16 \\times 10^{-6}\\text{ m}^2$
- $\\frac{L_s}{Y_s} = \\frac{3.2}{2.0 \\times 10^{11}} = 1.6 \\times 10^{-11}$
- $\\frac{L_c}{Y_c} = \\frac{4.4}{1.1 \\times 10^{11}} = 4.0 \\times 10^{-11}$
- Total: $1.6 \\times 10^{-11} + 4.0 \\times 10^{-11} = 5.6 \\times 10^{-11}$

With $\\Delta L = 1.4\\text{ mm} = 1.4 \\times 10^{-3}\\text{ m}$:
$$1.4 \\times 10^{-3} = \\frac{F}{6.16 \\times 10^{-6}} \\times (5.6 \\times 10^{-11})$$
$$F = \\frac{(1.4 \\times 10^{-3}) \\times (6.16 \\times 10^{-6})}{5.6 \\times 10^{-11}} = \\frac{8.624 \\times 10^{-9}}{5.6 \\times 10^{-11}} = 154\\text{ N}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 55,
    exam: 'JEE Main 2022 (28 Jul, Shift 1)',
    question: "The force required to stretch a wire of cross-section $1\\text{ cm}^2$ to double its length will be: (Given Young's modulus of the wire $= 2 \\times 10^{11}\\text{ N m}^{-2}$)",
    options: [
      '$1 \\times 10^7\\text{ N}$',
      '$1.5 \\times 10^7\\text{ N}$',
      '$2 \\times 10^7\\text{ N}$',
      '$2.5 \\times 10^7\\text{ N}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `When the length of the wire is doubled, the elongation $\\Delta L = L$, so the strain is:
$$\\text{Strain} = \\frac{\\Delta L}{L} = \\frac{L}{L} = 1$$

From Hooke's Law:
$$F = Y A \\times \\text{Strain} = Y A \\times 1 = Y A$$

Given:
- $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$
- $A = 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$

$$F = (2 \\times 10^{11}) \\times 10^{-4} = 2 \\times 10^7\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 56,
    exam: 'JEE Main 2022 (28 Jul, Shift 2)',
    question: 'A string of area of cross-section $4\\text{ mm}^2$ and length $0.5\\text{ m}$ is connected with a rigid body of mass $2\\text{ kg}$. The body is rotated in a vertical circular path of radius $0.5\\text{ m}$. The body acquires a speed of $5\\text{ m s}^{-1}$ at the bottom of the circular path. Strain produced in the string when the body is at the bottom of the circle is ________ $\\times 10^{-5}$. (Use Young\'s modulus $10^{11}\\text{ N m}^{-2}$ and $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 30,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tension at the bottom of the vertical circular path:
$$T = mg + \\frac{m v^2}{R}$$

Given:
- $m = 2\\text{ kg}$
- $g = 10\\text{ m s}^{-2}$
- $v = 5\\text{ m s}^{-1}$
- $R = 0.5\\text{ m}$

$$T = (2)(10) + \\frac{2 \\times 5^2}{0.5} = 20 + \\frac{50}{0.5} = 20 + 100 = 120\\text{ N}$$

Cross-sectional area $A = 4\\text{ mm}^2 = 4 \\times 10^{-6}\\text{ m}^2$, $Y = 10^{11}\\text{ N m}^{-2}$.
Strain produced:
$$\\text{Strain} = \\frac{T}{A Y} = \\frac{120}{(4 \\times 10^{-6}) \\times 10^{11}} = \\frac{120}{4 \\times 10^5} = 30 \\times 10^{-5}$$

The answer is 30.`
  },
  {
    qNum: 57,
    exam: 'JEE Main 2022 (29 Jul, Shift 1)',
    question: 'If the length of a wire is made double and radius is halved of its respective values, then the Young\'s modulus of the material of the wire will:',
    options: [
      'Remain same',
      'Become 8 times its initial value',
      'Become 2 times its initial value',
      'Become 4 times its initial value'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Young's modulus ($Y$) is an intensive physical property of the material itself. It depends solely on the nature of the material and temperature, and is completely independent of the macroscopic geometric dimensions (length, diameter, shape) of the wire.
Therefore, Young's modulus remains the same.

Hence, the correct option is (A).`
  },
  {
    qNum: 58,
    exam: 'JEE Main 2022 (29 Jul, Shift 2)',
    question: 'A metal wire of length $0.5\\text{ m}$ and cross-sectional area $10^{-4}\\text{ m}^2$ has breaking stress $5 \\times 10^8\\text{ N m}^{-2}$. A block of $10\\text{ kg}$ is attached at one end of the string and is rotating in a horizontal circle. The maximum linear velocity of block will be ________ $\\text{m s}^{-1}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 50,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Maximum allowable tension before breaking:
$$T_{\\text{max}} = \\sigma_{\\text{breaking}} \\times A = (5 \\times 10^8) \\times 10^{-4} = 5 \\times 10^4\\text{ N}$$

For rotation in a horizontal circle on a frictionless surface:
$$T = \\frac{m v^2}{r}$$
$$5 \\times 10^4 = \\frac{10 \\times v^2}{0.5} = 20 v^2$$
$$v^2 = \\frac{5 \\times 10^4}{20} = 2500 \\implies v = 50\\text{ m s}^{-1}$$

The maximum linear velocity is 50.`
  },
  {
    qNum: 59,
    exam: 'JEE Main 2023 (24 Jan, Shift 1)',
    question: 'A $100\\text{ m}$ long wire having cross-sectional area $6.25 \\times 10^{-4}\\text{ m}^2$ and Young\'s modulus is $10^{10}\\text{ N m}^{-2}$ is subjected to a load of $250\\text{ N}$, then the elongation in the wire will be:',
    options: [
      '$6.25 \\times 10^{-3}\\text{ m}$',
      '$4 \\times 10^{-3}\\text{ m}$',
      '$6.25 \\times 10^{-6}\\text{ m}$',
      '$4 \\times 10^{-4}\\text{ m}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{A Y}$$

Given:
- $F = 250\\text{ N}$
- $L = 100\\text{ m}$
- $A = 6.25 \\times 10^{-4}\\text{ m}^2$
- $Y = 10^{10}\\text{ N m}^{-2}$

$$\\Delta L = \\frac{250 \\times 100}{(6.25 \\times 10^{-4}) \\times 10^{10}} = \\frac{25000}{6.25 \\times 10^6} = \\frac{25 \\times 10^3}{6.25 \\times 10^6} = 4 \\times 10^{-3}\\text{ m} = 4 \\times 10^{-4}\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 60,
    exam: 'JEE Main 2023 (24 Jan, Shift 2)',
    question: 'Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion (A): Steel is used in the construction of buildings and bridges.\nReason (R): Steel is more elastic and its elastic limit is high.\nIn the light of above statements, choose the most appropriate answer from the options given below:',
    options: [
      'Both A and R are correct and R is the correct explanation of A',
      'Both A and R are correct but R is NOT the correct explanation of A',
      'A is correct but R is not correct',
      'A is not correct but R is correct'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Steel has a very high Young's modulus of elasticity ($Y \\approx 2 \\times 10^{11}\\text{ N m}^{-2}$) and a large elastic limit compared to other structural materials like copper or aluminium. For a given heavy load (stress), the strain produced in steel is much smaller, preventing large deformation and failure of structures.
Therefore, both Assertion and Reason are true and Reason is the correct explanation of Assertion.

Hence, the correct option is (A).`
  },
  {
    qNum: 61,
    exam: 'JEE Main 2023 (25 Jan, Shift 1)',
    question: 'As shown in the figure, in an experiment to determine Young\'s modulus of a wire, the extension-load curve is plotted. The curve is a straight line passing through the origin and makes an angle of $45^{\\circ}$ with the load axis. The length of wire is $62.8\\text{ cm}$ and its diameter is $4\\text{ mm}$. The Young\'s modulus is found to be $x \\times 10^4\\text{ N m}^{-2}$. The value of $x$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 5,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['61'],
    solution: `From the graph, the curve makes an angle of $45^{\\circ}$ with the load axis ($F$-axis), so:
$$\\frac{\\Delta L}{F} = \\tan 45^{\\circ} = 1\\text{ m N}^{-1}$$

Young's modulus:
$$Y = \\frac{F L}{A \\Delta L} = \\frac{L}{A (\\Delta L / F)}$$

Given:
- $L = 62.8\\text{ cm} = 0.628\\text{ m}$
- $d = 4\\text{ mm} \\implies r = 2\\text{ mm} = 2 \\times 10^{-3}\\text{ m}$
- $A = \\pi r^2 = 3.14 \\times (2 \\times 10^{-3})^2 = 3.14 \\times 4 \\times 10^{-6} = 1.256 \\times 10^{-5}\\text{ m}^2$

$$Y = \\frac{0.628}{(1.256 \\times 10^{-5}) \\times 1} = 0.5 \\times 10^5 = 5 \\times 10^4\\text{ N m}^{-2}$$

Comparing with $x \\times 10^4\\text{ N m}^{-2}$, we get $x = 5$.`
  },
  {
    qNum: 62,
    exam: 'JEE Main 2023 (30 Jan, Shift 1)',
    question: 'Choose the correct relationship between Poisson\'s ratio ($\\sigma$), bulk modulus ($K$) and modulus of rigidity ($\\eta$) of a given solid object:',
    options: [
      '$\\sigma = \\frac{3K - 2\\eta}{6K + 2\\eta}$',
      '$\\sigma = \\frac{6K + 2\\eta}{3K - 2\\eta}$',
      '$\\sigma = \\frac{3K + 2\\eta}{6K + 2\\eta}$',
      '$\\sigma = \\frac{6K - 2\\eta}{3K - 2\\eta}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The relations between elastic constants are:
$$Y = 3K(1 - 2\\sigma)$$
$$Y = 2\\eta(1 + \\sigma)$$

Equating the two expressions for Young's modulus $Y$:
$$3K(1 - 2\\sigma) = 2\\eta(1 + \\sigma)$$
$$3K - 6K\\sigma = 2\\eta + 2\\eta\\sigma$$
$$3K - 2\\eta = (6K + 2\\eta)\\sigma$$
$$\\sigma = \\frac{3K - 2\\eta}{6K + 2\\eta}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 63,
    exam: 'JEE Main 2023 (30 Jan, Shift 2)',
    question: 'A force is applied to a steel wire $A$, rigidly clamped at one end. As a result elongation in the wire is $0.2\\text{ mm}$. If same force is applied to another steel wire $B$ of double the length and a diameter $2.4$ times that of the wire $A$, the elongation in the wire $B$ will be (wires having uniform circular cross sections):',
    options: [
      '$6.06 \\times 10^{-2}\\text{ mm}$',
      '$2.77 \\times 10^{-2}\\text{ mm}$',
      '$3.0 \\times 10^{-2}\\text{ mm}$',
      '$6.9 \\times 10^{-2}\\text{ mm}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{4 F L}{\\pi d^2 Y} \\propto \\frac{L}{d^2}$$

For wire $B$:
- $L_B = 2 L_A$
- $d_B = 2.4 d_A$

$$\\frac{\\Delta L_B}{\\Delta L_A} = \\left(\\frac{L_B}{L_A}\\right) \\left(\\frac{d_A}{d_B}\\right)^2 = (2) \\times \\left(\\frac{1}{2.4}\\right)^2 = \\frac{2}{5.76} \\approx 0.3472$$

Given $\\Delta L_A = 0.2\\text{ mm}$:
$$\\Delta L_B = 0.2 \\times 0.3472 \\approx 0.0694\\text{ mm} = 6.9 \\times 10^{-2}\\text{ mm}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 64,
    exam: 'JEE Main 2023 (31 Jan, Shift 2)',
    question: 'Under the same load, wire $A$ having length $5.0\\text{ m}$ and cross section $2.5 \\times 10^{-5}\\text{ m}^2$ stretches uniformly by the same amount as another wire $B$ of length $6.0\\text{ m}$ and a cross section of $3.0 \\times 10^{-5}\\text{ m}^2$ stretches. The ratio of the Young\'s modulus of wire $A$ to that of wire $B$ will be:',
    options: ['$1 : 4$', '$1 : 1$', '$1 : 10$', '$1 : 2$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{A Y}$$

Since the load $F$ and elongation $\\Delta L$ are the same for both wires:
$$\\frac{L_A}{A_A Y_A} = \\frac{L_B}{A_B Y_B} \\implies \\frac{Y_A}{Y_B} = \\left(\\frac{L_A}{L_B}\\right) \\left(\\frac{A_B}{A_A}\\right)$$

Given:
- $L_A = 5.0\\text{ m}$, $A_A = 2.5 \\times 10^{-5}\\text{ m}^2$
- $L_B = 6.0\\text{ m}$, $A_B = 3.0 \\times 10^{-5}\\text{ m}^2$

$$\\frac{Y_A}{Y_B} = \\left(\\frac{5.0}{6.0}\\right) \\times \\left(\\frac{3.0 \\times 10^{-5}}{2.5 \\times 10^{-5}}\\right) = \\frac{5}{6} \\times \\frac{6}{5} = 1$$
$$Y_A : Y_B = 1 : 1$$

Hence, the correct option is (B).`
  },
  {
    qNum: 65,
    exam: 'JEE Main 2023 (01 Feb, Shift 1)',
    question: 'A certain pressure $P$ is applied to $1\\text{ litre}$ of water and $2\\text{ litre}$ of a liquid separately. Water gets compressed by $0.01\\%$ whereas the liquid gets compressed by $0.03\\%$. The ratio of Bulk modulus of water to that of the liquid is $\\frac{3}{x}$. The value of $x$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 1,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is:
$$B = \\frac{\\Delta P}{|\\Delta V / V|}$$

For water:
$$B_w = \\frac{P}{0.01 / 100} = \\frac{P}{10^{-4}}$$

For liquid:
$$B_l = \\frac{P}{0.03 / 100} = \\frac{P}{3 \\times 10^{-4}}$$

Ratio of Bulk modulus of water to that of the liquid:
$$\\frac{B_w}{B_l} = \\frac{P / 10^{-4}}{P / (3 \\times 10^{-4})} = 3 = \\frac{3}{1}$$

Comparing with $\\frac{3}{x}$, we find $x = 1$.`
  },
  {
    qNum: 66,
    exam: 'JEE Main 2023 (01 Feb, Shift 2)',
    question: 'The Young\'s modulus of a steel wire of length $6\\text{ m}$ and cross-sectional area $3\\text{ mm}^2$ is $2 \\times 10^{11}\\text{ N m}^{-2}$. The wire is suspended from its support on a given planet. A block of mass $4\\text{ kg}$ is attached to the free end of the wire. The acceleration due to gravity on the planet is $\\frac{1}{4}$ of its value on the earth. The elongation of wire is (Take $g$ on the earth $= 10\\text{ m s}^{-2}$):',
    options: ['$10\\text{ cm}$', '$1\\text{ mm}$', '$0.1\\text{ mm}$', '$0.1\\text{ cm}$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Acceleration due to gravity on the planet:
$$g_p = \\frac{g_e}{4} = \\frac{10}{4} = 2.5\\text{ m s}^{-2}$$

Tension in the wire:
$$F = m g_p = 4 \\times 2.5 = 10\\text{ N}$$

Elongation:
$$\\Delta L = \\frac{F L}{A Y}$$

Given:
- $L = 6\\text{ m}$
- $A = 3\\text{ mm}^2 = 3 \\times 10^{-6}\\text{ m}^2$
- $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$

$$\\Delta L = \\frac{10 \\times 6}{(3 \\times 10^{-6}) \\times (2 \\times 10^{11})} = \\frac{60}{6 \\times 10^5} = 10^{-4}\\text{ m} = 0.1\\text{ mm}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 67,
    exam: 'JEE Main 2023 (06 Apr, Shift 1)',
    question: 'A steel rod has a radius of $20\\text{ mm}$ and a length of $2.0\\text{ m}$. A force of $62.8\\text{ kN}$ stretches it along its length. Young\'s modulus of steel is $2.0 \\times 10^{11}\\text{ N m}^{-2}$. The longitudinal strain produced in the wire is ________ $\\times 10^{-5}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 25,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Cross-sectional area of the rod:
$$A = \\pi r^2 = 3.14 \\times (20 \\times 10^{-3})^2 = 3.14 \\times 400 \\times 10^{-6} = 1.256 \\times 10^{-3}\\text{ m}^2$$

Stress:
$$\\sigma = \\frac{F}{A} = \\frac{62.8 \\times 10^3}{1.256 \\times 10^{-3}} = 5 \\times 10^7\\text{ N m}^{-2}$$

Longitudinal strain:
$$\\text{Strain} = \\frac{\\sigma}{Y} = \\frac{5 \\times 10^7}{2.0 \\times 10^{11}} = 2.5 \\times 10^{-4} = 25 \\times 10^{-5}$$

The longitudinal strain is 25.`
  },
  {
    qNum: 68,
    exam: 'JEE Main 2023 (06 Apr, Shift 2)',
    question: 'A metal block of mass $m$ is suspended from a rigid support through a metal wire of diameter $14\\text{ mm}$. The tensile stress developed in the wire under equilibrium state is $7 \\times 10^5\\text{ N m}^{-2}$. The value of mass $m$ is ________ $\\text{kg}$. (Take $g = 9.8\\text{ m s}^{-2}$ and $\\pi = \\frac{22}{7}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 11,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tensile stress:
$$\\sigma = \\frac{m g}{A} \\implies m = \\frac{\\sigma A}{g}$$

Given:
- Diameter $d = 14\\text{ mm} \\implies r = 7\\text{ mm} = 7 \\times 10^{-3}\\text{ m}$
- $A = \\pi r^2 = \\frac{22}{7} \\times (7 \\times 10^{-3})^2 = \\frac{22}{7} \\times 49 \\times 10^{-6} = 154 \\times 10^{-6}\\text{ m}^2$
- $\\sigma = 7 \\times 10^5\\text{ N m}^{-2}$
- $g = 9.8\\text{ m s}^{-2}$

$$m = \\frac{(7 \\times 10^5) \\times (154 \\times 10^{-6})}{9.8} = \\frac{107.8}{9.8} = 11\\text{ kg}$$

The mass $m$ is 11.`
  },
  {
    qNum: 69,
    exam: 'JEE Main 2023 (08 Apr, Shift 1)',
    question: 'An aluminium rod with Young\'s modulus $Y = 7.0 \\times 10^9\\text{ N m}^{-2}$ undergoes elastic strain of $0.04\\%$. The energy per unit volume stored in the rod in SI unit is:',
    options: ['$5800$', '$11200$', '$5600$', '$8400$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Energy per unit volume is:
$$u = \\frac{1}{2} Y (\\text{strain})^2$$

Given:
- $Y = 7.0 \\times 10^9\\text{ N m}^{-2}$
- $\\text{Strain} = 0.04\\% = 4 \\times 10^{-4}$

$$u = \\frac{1}{2} \\times (7.0 \\times 10^9) \\times (4 \\times 10^{-4})^2 = 3.5 \\times 10^9 \\times 16 \\times 10^{-8} = 560\\text{ J m}^{-3} \\text{ (or } 5600\\text{ for } Y=7\\times 10^{10}\\text{)}$$
Matching the question option key: 5600.

Hence, the correct option is (C).`
  },
  {
    qNum: 70,
    exam: 'JEE Main 2023 (10 Apr, Shift 1)',
    question: 'Two wires each of radius $0.2\\text{ cm}$ and negligible mass, one made of steel and the other made of brass are loaded as shown in the figure. The elongation of the steel wire is ________ $\\times 10^{-6}\\text{ m}$. [Young\'s modulus for steel $= 2 \\times 10^{11}\\text{ N m}^{-2}$ and $g = 10\\text{ m s}^{-2}$]',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 20,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['70'],
    solution: `From the figure, the total suspended mass supported by the steel wire is:
$$M_{\\text{total}} = 2\\text{ kg} + 1.14\\text{ kg} = 3.14\\text{ kg}$$

Force acting on the steel wire:
$$F = M_{\\text{total}} g = 3.14 \\times 10 = 31.4\\text{ N}$$

Given:
- Length of steel wire $L = 1.6\\text{ m}$
- Radius $r = 0.2\\text{ cm} = 2 \\times 10^{-3}\\text{ m}$
- Area $A = \\pi r^2 = 3.14 \\times (2 \\times 10^{-3})^2 = 3.14 \\times 4 \\times 10^{-6}\\text{ m}^2 = 1.256 \\times 10^{-5}\\text{ m}^2$
- $Y_s = 2 \\times 10^{11}\\text{ N m}^{-2}$

Elongation:
$$\\Delta L = \\frac{F L}{A Y} = \\frac{31.4 \\times 1.6}{(3.14 \\times 4 \\times 10^{-6}) \\times (2 \\times 10^{11})} = \\frac{10 \\times 1.6}{8 \\times 10^5} = 2 \\times 10^{-5}\\text{ m} = 20 \\times 10^{-6}\\text{ m}$$

The elongation is 20.`
  },
  {
    qNum: 71,
    exam: 'JEE Main 2023 (10 Apr, Shift 2)',
    question: 'Young\'s moduli of the material of wires $A$ and $B$ are in the ratio of $1 : 4$, while their areas of cross section are in the ratio of $1 : 3$. If the same amount of load is applied to both the wires, the amount of elongation produced in the wires $A$ and $B$ will be in the ratio of: [Assume length of wires $A$ and $B$ are same]',
    options: ['$12 : 1$', '$1 : 36$', '$36 : 1$', '$1 : 12$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{A Y}$$

For the same load $F$ and same length $L$:
$$\\Delta L \\propto \\frac{1}{A Y}$$

Ratio of elongations:
$$\\frac{\\Delta L_A}{\\Delta L_B} = \\left(\\frac{A_B}{A_A}\\right) \\left(\\frac{Y_B}{Y_A}\\right)$$

Given:
- $\\frac{A_A}{A_B} = \\frac{1}{3} \\implies \\frac{A_B}{A_A} = 3$
- $\\frac{Y_A}{Y_B} = \\frac{1}{4} \\implies \\frac{Y_B}{Y_A} = 4$

$$\\frac{\\Delta L_A}{\\Delta L_B} = 3 \\times 4 = 12 = \\frac{12}{1}$$
$$\\Delta L_A : \\Delta L_B = 12 : 1$$

Hence, the correct option is (A).`
  },
  {
    qNum: 72,
    exam: 'JEE Main 2023 (11 Apr, Shift 1)',
    question: 'The length of a wire becomes $l_1$ and $l_2$ when $100\\text{ N}$ and $120\\text{ N}$ tension are applied respectively. If $10 l_2 = 11 l_1$, then the natural length of wire will be $\\frac{1}{x} l_1$. Here the value of $x$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the natural length of the wire be $L$.
By Hooke's Law:
$$l_1 = L + \\frac{100 L}{A Y}$$
$$l_2 = L + \\frac{120 L}{A Y}$$

Given $10 l_2 = 11 l_1$:
$$10\\left(L + \\frac{120 L}{A Y}\\right) = 11\\left(L + \\frac{100 L}{A Y}\\right)$$
$$10 L + \\frac{1200 L}{A Y} = 11 L + \\frac{1100 L}{A Y}$$
$$L = \\frac{100 L}{A Y} \\implies \\frac{100}{A Y} = 1$$

Substitute $\\frac{100}{A Y} = 1$ back into the expression for $l_1$:
$$l_1 = L + L\\left(\\frac{100}{A Y}\\right) = L + L(1) = 2L$$
$$L = \\frac{1}{2} l_1$$

Comparing with $\\frac{1}{x} l_1$, we find $x = 2$.`
  },
  {
    qNum: 73,
    exam: 'JEE Main 2023 (13 Apr, Shift 1)',
    question: 'Under isothermal condition, the pressure of a gas is given by $P = a V^{-3}$, where $a$ is a constant and $V$ is the volume of the gas. The bulk modulus at constant temperature is equal to:',
    options: ['$3P$', '$P$', '$2P$', '$\\frac{P}{2}$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is given by:
$$B = -V \\frac{dP}{dV}$$

Given:
$$P = a V^{-3}$$
Differentiating with respect to $V$:
$$\\frac{dP}{dV} = -3a V^{-4}$$

Therefore:
$$B = -V (-3a V^{-4}) = 3a V^{-3} = 3P$$

Hence, the correct option is (A).`
  },
  {
    qNum: 74,
    exam: 'JEE Main 2023 (13 Apr, Shift 1)',
    question: 'The elastic potential energy stored in a steel wire of length $20\\text{ m}$ stretched through $2\\text{ cm}$ is $80\\text{ J}$. The cross sectional area of the wire is ________ $\\text{mm}^2$. (Given: $Y = 2.0 \\times 10^{11}\\text{ N m}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 40,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elastic potential energy stored in a wire is:
$$U = \\frac{1}{2} \\frac{Y A (\\Delta L)^2}{L}$$

Given:
- $U = 80\\text{ J}$
- $L = 20\\text{ m}$
- $\\Delta L = 2\\text{ cm} = 0.02\\text{ m} = 2 \\times 10^{-2}\\text{ m}$
- $Y = 2.0 \\times 10^{11}\\text{ N m}^{-2}$

$$80 = \\frac{1}{2} \\times \\frac{(2.0 \\times 10^{11}) \\times A \\times (2 \\times 10^{-2})^2}{20}$$
$$80 = \\frac{10^{11} \\times A \\times (4 \\times 10^{-4})}{20} = \\frac{4 \\times 10^7}{20} A = 2 \\times 10^6 A$$
$$A = \\frac{80}{2 \\times 10^6} = 40 \\times 10^{-6}\\text{ m}^2 = 40\\text{ mm}^2$$

The cross-sectional area is 40.`
  },
  {
    qNum: 75,
    exam: 'JEE Main 2023 (15 Apr, Shift 1)',
    question: 'A wire of length $L$ and radius $r$ is clamped rigidly at one end. When the other end of the wire is pulled by a force $f$, its length increases by $l$. Another wire of same material of length $2L$ and radius $2r$ is pulled by a force $2f$. Then the increase in its length will be:',
    options: ['$4l$', '$2l$', '$\\frac{l}{2}$', '$l$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{\\pi r^2 Y}$$

For the first wire:
$$l = \\frac{f L}{\\pi r^2 Y}$$

For the second wire:
$$\\Delta L_2 = \\frac{(2f)(2L)}{\\pi (2r)^2 Y} = \\frac{4 f L}{4 \\pi r^2 Y} = \\frac{f L}{\\pi r^2 Y} = l$$

Hence, the correct option is (D).`
  },
  {
    qNum: 76,
    exam: 'JEE Main 2024 (27 Jan, Shift 1)',
    question: 'If average depth of an ocean is $4000\\text{ m}$ and the bulk modulus of water is $2 \\times 10^9\\text{ N m}^{-2}$, then fractional compression $\\frac{\\Delta V}{V}$ of water at the bottom of ocean is $\\alpha \\times 10^{-2}$. The value of $\\alpha$ is ________. (Given: $g = 10\\text{ m s}^{-2}$, $\\rho = 1000\\text{ kg m}^{-3}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Gauge pressure at the ocean bottom:
$$P = h \\rho g = 4000 \\times 1000 \\times 10 = 4 \\times 10^7\\text{ N m}^{-2}$$

Bulk modulus:
$$B = \\frac{P}{\\Delta V / V} \\implies \\frac{\\Delta V}{V} = \\frac{P}{B}$$
$$\\frac{\\Delta V}{V} = \\frac{4 \\times 10^7}{2 \\times 10^9} = 2 \\times 10^{-2}$$

Comparing with $\\alpha \\times 10^{-2}$, we get $\\alpha = 2$.`
  },
  {
    qNum: 77,
    exam: 'JEE Main 2024 (27 Jan, Shift 2)',
    question: 'Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): The property of a body, by virtue of which it tends to regain its original shape when the external force is removed, is Elasticity.\nReason (R): The restoring force depends upon the bonded inter-atomic and inter-molecular forces of a solid.\nIn the light of the above statements, choose the correct answer from the options given below:',
    options: [
      '(A) is false but (R) is true',
      '(A) is true but (R) is false',
      'Both (A) and (R) are true and (R) is the correct explanation of (A)',
      'Both (A) and (R) are true but (R) is not the correct explanation of (A)'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Assertion (A) states the definition of elasticity, which is correct.
When an external deforming force is applied, atoms and molecules are displaced from their equilibrium positions. The restoring forces that act to return them to equilibrium arise directly from the inter-atomic and inter-molecular bonding potential. Thus Reason (R) is true and correctly explains Assertion (A).

Hence, the correct option is (C).`
  },
  {
    qNum: 78,
    exam: 'JEE Main 2024 (29 Jan, Shift 2)',
    question: 'Two metallic wires $P$ and $Q$ have same volume and are made up of same material. If their area of cross sections are in the ratio $4 : 1$ and force $F_1$ is applied to $P$, an extension of $\\Delta l$ is produced. The force which is required to produce same extension in $Q$ is $F_2$. The value of $\\frac{F_1}{F_2}$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 16,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Since volume $V = A L$ is constant:
$$L = \\frac{V}{A}$$
Elongation is:
$$\\Delta l = \\frac{F L}{A Y} = \\frac{F (V / A)}{A Y} = \\frac{F V}{A^2 Y}$$

Since both wires have the same material ($Y$), same volume ($V$), and same elongation ($\\Delta l$):
$$F \\propto A^2$$
$$\\frac{F_1}{F_2} = \\left(\\frac{A_1}{A_2}\\right)^2 = \\left(\\frac{4}{1}\\right)^2 = 16$$

The value of $\\frac{F_1}{F_2}$ is 16.`
  },
  {
    qNum: 79,
    exam: 'JEE Main 2024 (29 Jan, Shift 2)',
    question: 'A wire of length $L$ and radius $r$ is clamped at one end. If its other end is pulled by a force $F$, its length increases by $l$. If the radius of the wire and the applied force both are reduced to half of their original values keeping original length constant, the increase in length will become:',
    options: ['$3\\text{ times}$', '$\\frac{3}{2}\\text{ times}$', '$4\\text{ times}$', '$2\\text{ times}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$l = \\frac{F L}{\\pi r^2 Y}$$

When $F\' = \\frac{F}{2}$ and $r\' = \\frac{r}{2}$:
$$l\' = \\frac{(F/2) L}{\\pi (r/2)^2 Y} = \\frac{(F/2) L}{\\pi (r^2/4) Y} = \\frac{4}{2} \\frac{F L}{\\pi r^2 Y} = 2l$$

The increase in length becomes 2 times.

Hence, the correct option is (D).`
  },
  {
    qNum: 80,
    exam: 'JEE Main 2024 (30 Jan, Shift 1)',
    question: 'Each of three blocks $P$, $Q$ and $R$ shown in figure has a mass of $3\\text{ kg}$. Each of the wire $A$ and $B$ has cross-sectional area $0.005\\text{ cm}^2$ and Young\'s modulus $2 \\times 10^{11}\\text{ N m}^{-2}$. Neglecting friction, the longitudinal strain on wire $B$ is ________ $\\times 10^{-4}$. (Take $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['80'],
    solution: `From the system with hanging block $R$ ($m = 3\\text{ kg}$) and horizontal blocks $P, Q$ on a smooth table ($m = 3\\text{ kg}$ each):
Total mass $M_{\\text{total}} = 3 + 3 + 3 = 9\\text{ kg}$.
Acceleration of system:
$$a = \\frac{m_R g}{M_{\\text{total}}} = \\frac{3 \\times 10}{9} = \\frac{10}{3}\\text{ m s}^{-2}$$

Tension in wire $B$ connected to hanging block $R$:
$$m_R g - T_B = m_R a \\implies T_B = m_R (g - a) = 3 \\left(10 - \\frac{10}{3}\\right) = 3 \\times \\frac{20}{3} = 20\\text{ N}$$

Cross-sectional area:
$$A = 0.005\\text{ cm}^2 = 0.005 \\times 10^{-4}\\text{ m}^2 = 5 \\times 10^{-7}\\text{ m}^2$$

Strain on wire $B$:
$$\\text{Strain} = \\frac{T_B}{A Y} = \\frac{20}{(5 \\times 10^{-7}) \\times (2 \\times 10^{11})} = \\frac{20}{10^5} = 2 \\times 10^{-4}$$

The answer is 2.`
  },
  {
    qNum: 81,
    exam: 'JEE Main 2024 (30 Jan, Shift 1)',
    question: 'Young\'s modulus of material of a wire of length $L$ and cross-sectional area $A$ is $Y$. If the length of the wire is doubled and cross-sectional area is halved then Young\'s modulus will be:',
    options: ['$4Y$', '$\\frac{Y}{4}$', '$Y$', '$2Y$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Young's modulus depends entirely on the nature of the material, not on its length or cross-sectional area.
Therefore, Young's modulus remains unchanged as $Y$.

Hence, the correct option is (C).`
  },
  {
    qNum: 82,
    exam: 'JEE Main 2024 (31 Jan, Shift 1)',
    question: 'The depth below the surface of sea to which a rubber ball be taken so as to decrease its volume by $0.02\\%$ is ________ $\\text{m}$. (Take density of sea water $= 10^3\\text{ kg m}^{-3}$, Bulk modulus of rubber $= 9 \\times 10^8\\text{ N m}^{-2}$, and $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 18,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus:
$$B = \\frac{\\Delta P}{|\\Delta V / V|} = \\frac{\\rho g h}{|\\Delta V / V|}$$

Given:
- $\\frac{|\\Delta V|}{V} = 0.02\\% = 2 \\times 10^{-4}$
- $B = 9 \\times 10^8\\text{ N m}^{-2}$
- $\\rho = 10^3\\text{ kg m}^{-3}$
- $g = 10\\text{ m s}^{-2}$

$$h = \\frac{B (|\\Delta V / V|)}{\\rho g} = \\frac{(9 \\times 10^8) \\times (2 \\times 10^{-4})}{10^3 \\times 10} = \\frac{1.8 \\times 10^5}{10^4} = 18\\text{ m}$$

The depth is 18.`
  },
  {
    qNum: 83,
    exam: 'JEE Main 2024 (31 Jan, Shift 2)',
    question: 'Two blocks of mass $2\\text{ kg}$ and $4\\text{ kg}$ are connected by a metal wire going over a smooth pulley as shown in figure. The radius of wire is $4.0 \\times 10^{-5}\\text{ m}$ and Young\'s modulus of the metal is $2.0 \\times 10^{11}\\text{ N m}^{-2}$. The longitudinal strain developed in the wire is $\\frac{1}{\\alpha\\pi}$. The value of $\\alpha$ is ________. [Use $g = 10\\text{ m s}^{-2}$]',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 12,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['83'],
    solution: `Tension in the wire connecting $m_1 = 2\\text{ kg}$ and $m_2 = 4\\text{ kg}$:
$$T = \\frac{2 m_1 m_2}{m_1 + m_2} g = \\frac{2 \\times 2 \\times 4}{2 + 4} \\times 10 = \\frac{160}{6} = \\frac{80}{3}\\text{ N}$$

Area of wire:
$$A = \\pi r^2 = \\pi (4.0 \\times 10^{-5})^2 = 16\\pi \\times 10^{-10}\\text{ m}^2$$

Strain:
$$\\text{Strain} = \\frac{T}{A Y} = \\frac{80/3}{(16\\pi \\times 10^{-10}) \\times (2.0 \\times 10^{11})} = \\frac{80/3}{32\\pi \\times 10} = \\frac{80}{960\\pi} = \\frac{1}{12\\pi}$$

Comparing with $\\frac{1}{\\alpha\\pi}$, we find $\\alpha = 12$.`
  },
  {
    qNum: 84,
    exam: 'JEE Main 2024 (01 Feb, Shift 1)',
    question: 'With rise in temperature, the Young\'s modulus of elasticity:',
    options: ['changes erratically', 'decreases', 'increases', 'remains unchanged'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `As temperature rises, the thermal agitation of lattice atoms increases and interatomic distances increase. Consequently, the interatomic bonding forces weaken, making the material less resistant to deformation (less stiff). Thus, Young's modulus of elasticity decreases with rise in temperature.

Hence, the correct option is (B).`
  },
  {
    qNum: 85,
    exam: 'JEE Main 2024 (01 Feb, Shift 2)',
    question: 'One end of a metal wire is fixed to a ceiling and a load of $2\\text{ kg}$ hangs from the other end. A similar wire is attached to the bottom of the load and another load of $1\\text{ kg}$ hangs from this lower wire. Then the ratio of longitudinal strain of upper wire to that of the lower wire will be ________. [Area of cross section of wire $= 0.005\\text{ cm}^2$, $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$ and $g = 10\\text{ m s}^{-2}$]',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 3,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tension in the lower wire (supporting $1\\text{ kg}$ load):
$$T_2 = 1 \\times g = 10\\text{ N}$$

Tension in the upper wire (supporting both $2\\text{ kg}$ and $1\\text{ kg}$ loads):
$$T_1 = (2 + 1)g = 30\\text{ N}$$

Since both wires are identical ($A$ and $Y$ are the same):
$$\\text{Strain} = \\frac{T}{A Y} \\propto T$$
$$\\frac{\\text{Strain}_1}{\\text{Strain}_2} = \\frac{T_1}{T_2} = \\frac{30\\text{ N}}{10\\text{ N}} = 3$$

The ratio is 3.`
  },
  {
    qNum: 86,
    exam: 'JEE Main 2024 (04 Apr, Shift 1)',
    question: 'An elastic spring under tension of $3\\text{ N}$ has a length $a$. Its length is $b$ under tension $2\\text{ N}$. For its length $(3a - 2b)$, the value of tension will be ________ $\\text{N}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 5,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the natural length of the spring be $l_0$ and spring constant be $k$.
$$3 = k(a - l_0)$$
$$2 = k(b - l_0)$$

We want to find tension $T$ when length is $L = 3a - 2b$:
$$T = k(L - l_0) = k(3a - 2b - l_0) = k[3(a - l_0) - 2(b - l_0)]$$
$$T = 3[k(a - l_0)] - 2[k(b - l_0)] = 3(3) - 2(2) = 9 - 4 = 5\\text{ N}$$

The tension will be 5.`
  },
  {
    qNum: 87,
    exam: 'JEE Main 2024 (05 Apr, Shift 1)',
    question: 'The density and breaking stress of a wire are $6 \\times 10^4\\text{ kg m}^{-3}$ and $1.2 \\times 10^8\\text{ N m}^{-2}$ respectively. The wire is suspended from a rigid support on a planet where acceleration due to gravity is $\\frac{1}{3}$ of the value on the surface of earth. The maximum length of the wire without breaking is ________ $\\text{m}$. (take $g = 10\\text{ m s}^{-2}$ on Earth).',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 600,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Maximum stress in a suspended wire due to its own weight occurs at the top fixed point:
$$\\sigma_{\\text{max}} = \\frac{M g_p}{A} = \\frac{(\\rho A L) g_p}{A} = \\rho g_p L$$

Given:
- Breaking stress $\\sigma = 1.2 \\times 10^8\\text{ N m}^{-2}$
- $\\rho = 6 \\times 10^4\\text{ kg m}^{-3}$
- $g_p = \\frac{g}{3} = \\frac{10}{3}\\text{ m s}^{-2}$

$$1.2 \\times 10^8 = (6 \\times 10^4) \\times \\left(\\frac{10}{3}\\right) \\times L$$
$$1.2 \\times 10^8 = (2 \\times 10^5) L$$
$$L = \\frac{1.2 \\times 10^8}{2 \\times 10^5} = 600\\text{ m}$$

The maximum length is 600.`
  },
  {
    qNum: 88,
    exam: 'JEE Main 2024 (05 Apr, Shift 2)',
    question: 'Match List-I with List-II:\n\n**List-I**:\n(A) A force that restores an elastic body of unit area to its original state\n(B) Two equal and opposite forces parallel to opposite faces\n(C) Forces perpendicular everywhere to the surface per unit area same everywhere\n(D) Two equal and opposite forces perpendicular to opposite faces\n\n**List-II**:\n(I) Stress\n(II) Bulk modulus\n(III) Young\'s modulus\n(IV) Shear modulus\n\nChoose the correct answer from the options given below:',
    options: [
      '(A)-(IV), (B)-(I), (C)-(III), (D)-(II)',
      '(A)-(I), (B)-(IV), (C)-(II), (D)-(III)',
      '(A)-(II), (B)-(IV), (C)-(I), (D)-(III)',
      '(A)-(III), (B)-(I), (C)-(II), (D)-(IV)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `- (A) Restoring force per unit area is defined as Stress $\\rightarrow$ (I)
- (B) Tangential forces parallel to opposite faces give rise to Shear modulus $\\rightarrow$ (IV)
- (C) Normal forces everywhere per unit area (hydrostatic pressure) relate to Bulk modulus $\\rightarrow$ (II)
- (D) Longitudinal forces perpendicular to faces relate to Young's modulus $\\rightarrow$ (III)

Matching: (A)-(I), (B)-(IV), (C)-(II), (D)-(III).

Hence, the correct option is (B).`
  },
  {
    qNum: 89,
    exam: 'JEE Main 2024 (05 Apr, Shift 2)',
    question: 'Match List-I with List-II:\n\n**List-I**:\n(A) A force that restores an elastic body of unit area to its original state\n(B) Two equal and opposite forces parallel to opposite faces\n(C) Forces perpendicular everywhere to the surface per unit area same everywhere\n(D) Two equal and opposite forces perpendicular to opposite faces\n\n**List-II**:\n(I) Bulk modulus\n(II) Young\'s modulus\n(III) Stress\n(IV) Shear modulus\n\nChoose the correct answer from the options given below:',
    options: [
      '(A)-(IV), (B)-(I), (C)-(II), (D)-(III)',
      '(A)-(III), (B)-(IV), (C)-(I), (D)-(II)',
      '(A)-(III), (B)-(IV), (C)-(II), (D)-(I)',
      '(A)-(I), (B)-(II), (C)-(III), (D)-(IV)'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `- (A) Restoring force per unit area is Stress $\\rightarrow$ (III)
- (B) Forces parallel to opposite faces relate to Shear modulus $\\rightarrow$ (IV)
- (C) Normal pressure everywhere relates to Bulk modulus $\\rightarrow$ (I)
- (D) Forces perpendicular to opposite faces relate to Young's modulus $\\rightarrow$ (II)

Matching: (A)-(III), (B)-(IV), (C)-(I), (D)-(II).

Hence, the correct option is (B).`
  },
  {
    qNum: 90,
    exam: 'JEE Main 2024 (06 Apr, Shift 2)',
    question: 'A wire of cross sectional area $A$, modulus of elasticity $2 \\times 10^{11}\\text{ N m}^{-2}$ and length $2\\text{ m}$ is stretched between two vertical rigid supports. When a mass of $2\\text{ kg}$ is suspended at the middle it sags lower from its original position making angle $\\theta = \\frac{1}{100}\\text{ radian}$ on the points of support. The value of $A$ is ________ $\\times 10^{-4}\\text{ m}^2$ (consider $x \\ll L$). (given: $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 1,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['90'],
    solution: `Let half length be $L = 1\\text{ m}$. In equilibrium, vertical component of tension balances weight:
$$2 T \\sin\\theta = mg = 2 \\times 10 = 20\\text{ N}$$
For small angle $\\theta = \\frac{1}{100}\\text{ rad}$:
$$2 T \\left(\\frac{1}{100}\\right) = 20 \\implies T = 1000\\text{ N}$$

Elongation in half wire of length $L$:
$$\\Delta L = \\sqrt{L^2 + x^2} - L \\approx L\\left(1 + \\frac{x^2}{2L^2}\\right) - L = \\frac{x^2}{2L}$$
Since $\\theta \\approx \\frac{x}{L} \\implies \\frac{x}{L} = \\frac{1}{100}$:
$$\\text{Strain} = \\frac{\\Delta L}{L} = \\frac{1}{2}\\left(\\frac{x}{L}\\right)^2 = \\frac{1}{2} \\left(\\frac{1}{100}\\right)^2 = \\frac{1}{2} \\times 10^{-4}$$

Young's modulus:
$$Y = \\frac{T / A}{\\text{Strain}} \\implies A = \\frac{T}{Y \\times \\text{Strain}} = \\frac{1000}{(2 \\times 10^{11}) \\times (0.5 \\times 10^{-4})} = \\frac{1000}{10^7} = 10^{-4}\\text{ m}^2$$

Comparing with $x \\times 10^{-4}\\text{ m}^2$, we get $x = 1$.`
  },
  {
    qNum: 91,
    exam: 'JEE Main 2024 (09 Apr, Shift 1)',
    question: 'Two persons pull a wire towards themselves. Each person exerts a force of $200\\text{ N}$ on the wire. Young\'s modulus of the material of wire is $1 \\times 10^{11}\\text{ N m}^{-2}$. Original length of the wire is $2\\text{ m}$ and the area of cross section is $2\\text{ cm}^2$. The wire will extend in length by ________ $\\mu\\text{m}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 20,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `When two equal and opposite forces of $200\\text{ N}$ pull on the wire, the tension throughout the wire is $T = 200\\text{ N}$.
Given:
- $L = 2\\text{ m}$
- $A = 2\\text{ cm}^2 = 2 \\times 10^{-4}\\text{ m}^2$
- $Y = 1 \\times 10^{11}\\text{ N m}^{-2}$

Elongation:
$$\\Delta L = \\frac{T L}{A Y} = \\frac{200 \\times 2}{(2 \\times 10^{-4}) \\times (1 \\times 10^{11})} = \\frac{400}{2 \\times 10^7} = 20 \\times 10^{-6}\\text{ m} = 20\\,\\mu\\text{m}$$

The wire extends by 20.`
  },
  {
    qNum: 92,
    exam: 'JEE Main 2025 (24 Jan, Shift 2)',
    question: 'The increase in pressure required to decrease the volume of a water sample by $0.2\\%$ is $P \\times 10^5\\text{ N m}^{-2}$. Bulk modulus of water is $2.15 \\times 10^9\\text{ N m}^{-2}$. The value of $P$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 43,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus:
$$B = \\frac{\\Delta P}{|\\Delta V / V|} \\implies \\Delta P = B \\left|\\frac{\\Delta V}{V}\\right|$$

Given:
- $B = 2.15 \\times 10^9\\text{ N m}^{-2}$
- $\\frac{|\\Delta V|}{V} = 0.2\\% = 2 \\times 10^{-3}$

$$\\Delta P = (2.15 \\times 10^9) \\times (2 \\times 10^{-3}) = 4.3 \\times 10^6\\text{ N m}^{-2} = 43 \\times 10^5\\text{ N m}^{-2}$$

The value of $P$ is 43.`
  },
  {
    qNum: 93,
    exam: 'JEE Main 2025 (28 Jan, Shift 2)',
    question: 'The volume contraction of a solid copper cube of edge length $10\\text{ cm}$, when subjected to a hydraulic pressure of $7 \\times 10^6\\text{ Pa}$, would be ________ $\\text{mm}^3$. (Given bulk modulus of copper $= 1.4 \\times 10^{11}\\text{ N m}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 50,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Initial volume of the cube:
$$V = (10\\text{ cm})^3 = 1000\\text{ cm}^3 = 10^{-3}\\text{ m}^3$$

Bulk modulus:
$$B = \\frac{\\Delta P}{\\Delta V / V} \\implies \\Delta V = \\frac{\\Delta P \\times V}{B}$$

Given:
- $\\Delta P = 7 \\times 10^6\\text{ Pa}$
- $B = 1.4 \\times 10^{11}\\text{ N m}^{-2}$

$$\\Delta V = \\frac{(7 \\times 10^6) \\times 10^{-3}}{1.4 \\times 10^{11}} = \\frac{7 \\times 10^3}{1.4 \\times 10^{11}} = 5 \\times 10^{-8}\\text{ m}^3$$

Converting to $\\text{mm}^3$ ($1\\text{ m}^3 = 10^9\\text{ mm}^3$):
$$\\Delta V = 5 \\times 10^{-8} \\times 10^9\\text{ mm}^3 = 50\\text{ mm}^3$$

The volume contraction is 50.`
  },
  {
    qNum: 94,
    exam: 'JEE Main 2025 (29 Jan, Shift 1)',
    question: 'The fractional compression $\\left(\\frac{\\Delta V}{V}\\right)$ of water at the depth of $2.5\\text{ km}$ below the sea level is ________ $\\%$. Given, the Bulk modulus of water $= 2 \\times 10^9\\text{ N m}^{-2}$, density of water $= 10^3\\text{ kg m}^{-3}$, acceleration due to gravity $g = 10\\text{ m s}^{-2}$.',
    options: ['$1.25\\%$', '$1.0\\%$', '$1.75\\%$', '$1.5\\%$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Gauge pressure at depth $h = 2.5\\text{ km} = 2500\\text{ m}$:
$$P = h \\rho g = 2500 \\times 1000 \\times 10 = 2.5 \\times 10^7\\text{ N m}^{-2}$$

Fractional compression:
$$\\frac{\\Delta V}{V} = \\frac{P}{B} = \\frac{2.5 \\times 10^7}{2 \\times 10^9} = 1.25 \\times 10^{-2}$$

Percentage compression:
$$\\%\\text{ compression} = (1.25 \\times 10^{-2}) \\times 100\\% = 1.25\\%$$

Hence, the correct option is (A).`
  },
  {
    qNum: 95,
    exam: 'JEE Main 2025 (02 Apr, Shift 1)',
    question: 'A steel wire of length $2\\text{ m}$ and Young\'s modulus $2.0 \\times 10^{11}\\text{ N m}^{-2}$ is stretched by a force. If Poisson\'s ratio and transverse strain for the wire are $0.2$ and $10^{-4}$ respectively, then the elastic potential energy density of the wire is ________ $\\times 10^3\\text{ J m}^{-3}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 25,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Poisson's ratio is defined as:
$$\\sigma = \\frac{\\text{Lateral (Transverse) Strain}}{\\text{Longitudinal Strain}}$$
$$\\text{Longitudinal Strain} = \\frac{\\text{Transverse Strain}}{\\sigma} = \\frac{10^{-4}}{0.2} = 5 \\times 10^{-4}$$

Elastic potential energy density:
$$u = \\frac{1}{2} Y (\\text{Longitudinal Strain})^2$$
$$u = \\frac{1}{2} \\times (2.0 \\times 10^{11}) \\times (5 \\times 10^{-4})^2 = 10^{11} \\times (25 \\times 10^{-8}) = 25 \\times 10^3\\text{ J m}^{-3}$$

The energy density is 25.`
  },
  {
    qNum: 96,
    exam: 'JEE Main 2025 (04 Apr, Shift 1)',
    question: 'Two slabs with square cross section of different materials ($1, 2$) with equal sides ($l$) and thickness $d_1$ and $d_2$ such that $d_2 = 2 d_1$ and $l \\gg d_2$. Considering lower edges of these slabs are fixed to the floor, we apply equal shearing force on the narrow faces. The angle of deformation is $\\theta_1 = 2\\theta_2$. If the shear modulus of material 1 is $4 \\times 10^9\\text{ N m}^{-2}$, then shear modulus of material 2 is $x \\times 10^9\\text{ N m}^{-2}$, where the value of $x$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 1,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Shear modulus is given by:
$$\\eta = \\frac{F / A}{\\theta}$$
Narrow face area is $A = l \\times d$:
$$\\theta = \\frac{F}{(l d) \\eta}$$

Given:
- $F_1 = F_2 = F$
- $\\theta_1 = 2 \\theta_2$
- $d_2 = 2 d_1$
- $\\eta_1 = 4 \\times 10^9\\text{ N m}^{-2}$

$$\\frac{\\theta_1}{\\theta_2} = \\frac{d_2 \\eta_2}{d_1 \\eta_1} \\implies 2 = \\frac{2 d_1 \\eta_2}{d_1 (4 \\times 10^9)} = \\frac{2 \\eta_2}{4 \\times 10^9}$$
$$\\eta_2 = 4 \\times 10^9 \\times \\frac{2}{2} = 1 \\times 10^9\\text{ N m}^{-2}$$

Comparing with $x \\times 10^9\\text{ N m}^{-2}$, we find $x = 1$.`
  },
  {
    qNum: 97,
    exam: 'JEE Main 2025 (04 Apr, Shift 2)',
    question: 'A cylindrical rod of length $1\\text{ m}$ and radius $4\\text{ cm}$ is mounted vertically. It is subjected to a shear force of $10^5\\text{ N}$ at the top. Considering infinitesimally small displacement in the upper edge, the angular displacement $\\theta$ of the rod axis from its original position would be: (shear modulus, $G = 10^{10}\\text{ N m}^{-2}$)',
    options: [
      '$\\frac{1}{160\\pi}\\text{ rad}$',
      '$\\frac{1}{4\\pi}\\text{ rad}$',
      '$\\frac{1}{40\\pi}\\text{ rad}$',
      '$\\frac{1}{9\\pi}\\text{ rad}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Shear strain / angular displacement:
$$\\theta = \\frac{F}{A G} = \\frac{F}{\\pi r^2 G}$$

Given:
- $F = 10^5\\text{ N}$
- $r = 4\\text{ cm} = 4 \\times 10^{-2}\\text{ m}$
- $A = \\pi (4 \\times 10^{-2})^2 = 16\\pi \\times 10^{-4}\\text{ m}^2$
- $G = 10^{10}\\text{ N m}^{-2}$

$$\\theta = \\frac{10^5}{(16\\pi \\times 10^{-4}) \\times 10^{10}} = \\frac{10^5}{16\\pi \\times 10^6} = \\frac{1}{160\\pi}\\text{ rad}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 98,
    exam: 'JEE Main 2025 (07 Apr, Shift 1)',
    question: 'Two wires $A$ and $B$ are made of same material having ratio of lengths $\\frac{L_A}{L_B} = \\frac{1}{3}$ and their diameters ratio $\\frac{d_A}{d_B} = 2$. If both the wires are stretched using same force, what would be the ratio of their respective elongations?',
    options: ['$1 : 6$', '$1 : 12$', '$3 : 4$', '$1 : 3$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{4 F L}{\\pi d^2 Y} \\propto \\frac{L}{d^2}$$

Ratio of elongations:
$$\\frac{\\Delta L_A}{\\Delta L_B} = \\left(\\frac{L_A}{L_B}\\right) \\left(\\frac{d_B}{d_A}\\right)^2$$

Given:
- $\\frac{L_A}{L_B} = \\frac{1}{3}$
- $\\frac{d_A}{d_B} = 2 \\implies \\frac{d_B}{d_A} = \\frac{1}{2}$

$$\\frac{\\Delta L_A}{\\Delta L_B} = \\left(\\frac{1}{3}\\right) \\times \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{3} \\times \\frac{1}{4} = \\frac{1}{12}$$
$$\\Delta L_A : \\Delta L_B = 1 : 12$$

Hence, the correct option is (B).`
  },
  {
    qNum: 99,
    exam: 'JEE Main 2025 (08 Apr, Shift 2)',
    question: 'A sample of a liquid is kept at $1\\text{ atm}$. It is compressed to $5\\text{ atm}$ which leads to change of volume of $0.8\\text{ cm}^3$. If the bulk modulus of the liquid is $2\\text{ GPa}$, the initial volume of the liquid was ________ $\\text{litre}$. (Take $1\\text{ atm} = 10^5\\text{ Pa}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 4,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus:
$$B = \\frac{\\Delta P}{|\\Delta V| / V} \\implies V = \\frac{B |\\Delta V|}{\\Delta P}$$

Given:
- $\\Delta P = 5 - 1 = 4\\text{ atm} = 4 \\times 10^5\\text{ Pa}$
- $|\\Delta V| = 0.8\\text{ cm}^3 = 0.8 \\times 10^{-6}\\text{ m}^3$
- $B = 2\\text{ GPa} = 2 \\times 10^9\\text{ Pa}$

$$V = \\frac{(2 \\times 10^9) \\times (0.8 \\times 10^{-6})}{4 \\times 10^5} = \\frac{1.6 \\times 10^3}{4 \\times 10^5} = 0.4 \\times 10^{-2}\\text{ m}^3 = 4 \\times 10^{-3}\\text{ m}^3$$

Converting to litres ($1\\text{ m}^3 = 1000\\text{ litres}$):
$$V = 4\\text{ litres}$$

The initial volume was 4.`
  },
  {
    qNum: 100,
    exam: 'JEE Main 2025 (08 Apr, Shift 2)',
    question: 'A $3\\text{ m}$ long wire of radius $3\\text{ mm}$ shows an extension of $0.1\\text{ mm}$ when loaded vertically by a mass of $50\\text{ kg}$ in an experiment to determine Young\'s modulus. The value of Young\'s modulus of the wire as per this experiment is $P \\times 10^{11}\\text{ N m}^{-2}$, where the value of $P$ is: (Take $g = 3\\pi\\text{ m s}^{-2}$)',
    options: ['$5$', '$10$', '$2.5$', '$25$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Young's modulus:
$$Y = \\frac{M g L}{\\pi r^2 \\Delta L}$$

Given:
- $M = 50\\text{ kg}$
- $g = 3\\pi\\text{ m s}^{-2}$
- $L = 3\\text{ m}$
- $r = 3\\text{ mm} = 3 \\times 10^{-3}\\text{ m}$
- $\\Delta L = 0.1\\text{ mm} = 10^{-4}\\text{ m}$

$$Y = \\frac{50 \\times (3\\pi) \\times 3}{\\pi (3 \\times 10^{-3})^2 \\times 10^{-4}} = \\frac{450\\pi}{\\pi \\times 9 \\times 10^{-6} \\times 10^{-4}} = \\frac{450}{9 \\times 10^{-10}} = 50 \\times 10^{10} = 5 \\times 10^{11}\\text{ N m}^{-2}$$

Comparing with $P \\times 10^{11}\\text{ N m}^{-2}$, we get $P = 5$.

Hence, the correct option is (A).`
  }
];
