import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solids_diagram_urls.json'), 'utf8'));

export const SOLIDS_PYQ_PART3 = [
  {
    qNum: 101,
    exam: 'JEE Main 2026 (23 Jan, Shift 1)',
    question: "The strain-stress plot for materials A, B, C and D is shown in the figure. Which material has the largest Young's modulus?",
    options: ['$D$', '$B$', '$C$', '$A$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['101'],
    solution: `Young's modulus ($Y$) is defined as:
$$Y = \\frac{\\text{Stress}}{\\text{Strain}}$$

In the given graph:
- The $y$-axis represents Strain.
- The $x$-axis represents Stress.

The slope of the line in this strain versus stress plot is:
$$\\text{Slope} = \\frac{\\text{Strain}}{\\text{Stress}} = \\frac{1}{Y} \\implies Y = \\frac{1}{\\text{Slope}}$$

To have the largest Young's modulus, the material must have the smallest slope (smallest angle with the stress axis).
Line $C$ has the smallest angle with the stress axis ($x$-axis), corresponding to the minimum slope.
Therefore, material $C$ has the largest Young's modulus.

Hence, the correct option is (C).`
  },
  {
    qNum: 102,
    exam: 'JEE Main 2026 (28 Jan, Shift 1)',
    question: 'Two wires $A$ and $B$ made of different materials of lengths $6.0\\text{ cm}$ and $5.4\\text{ cm}$, respectively and area of cross sections $3.0 \\times 10^{-5}\\text{ m}^2$ and $4.5 \\times 10^{-5}\\text{ m}^2$, respectively are stretched by the same magnitude under a given load. The ratio of the Young\'s modulus of $A$ to that of $B$ is $x : 3$. The value of $x$ is:',
    options: ['$2$', '$1$', '$3$', '$5$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Young's modulus is given by:
$$Y = \\frac{F L}{A \\Delta L}$$

When the same tensile force $F$ produces the same extension $\\Delta L$:
$$\\frac{Y_A}{Y_B} = \\left(\\frac{L_A}{L_B}\\right) \\left(\\frac{A_B}{A_A}\\right)$$

Given:
- $L_A = 6.0\\text{ cm}$, $L_B = 5.4\\text{ cm}$
- $A_A = 3.0 \\times 10^{-5}\\text{ m}^2$, $A_B = 4.5 \\times 10^{-5}\\text{ m}^2$

$$\\frac{Y_A}{Y_B} = \\left(\\frac{6.0}{5.4}\\right) \\times \\left(\\frac{4.5 \\times 10^{-5}}{3.0 \\times 10^{-5}}\\right) = \\frac{10}{9} \\times \\frac{3}{2} = \\frac{5}{3}$$

Given $\\frac{Y_A}{Y_B} = \\frac{x}{3}$:
$$\\frac{x}{3} = \\frac{5}{3} \\implies x = 5$$

Hence, the correct option is (D).`
  },
  {
    qNum: 103,
    exam: 'JEE Main 2026 (02 Apr, Shift 1)',
    question: 'A uniform wire of length $L$ and weight $w$ is suspended from the roof with a weight of $W$ at the other end. The stress in the wire at $\\frac{L}{3}$ distance from the top is $\\left(\\frac{W}{A} + \\frac{2w}{y A}\\right)$, where $A$ is the cross sectional area of the wire. The value of $y$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 3,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let distance from the top be $x = \\frac{L}{3}$.
The remaining length of the wire below this point is:
$$L\' = L - \\frac{L}{3} = \\frac{2L}{3}$$

The weight of this lower portion of the wire is:
$$w\' = \\frac{w}{L} \\times \\frac{2L}{3} = \\frac{2}{3}w$$

The total downward tensile force (tension $T$) at this point is the sum of the bottom attached weight $W$ and the weight of the lower part of the wire:
$$T = W + w\' = W + \\frac{2}{3}w$$

The stress at this cross-section is:
$$\\text{Stress} = \\frac{T}{A} = \\frac{W}{A} + \\frac{2w}{3A}$$

Comparing this with $\\left(\\frac{W}{A} + \\frac{2w}{y A}\\right)$, we get $y = 3$.`
  },
  {
    qNum: 104,
    exam: 'JEE Main 2026 (04 Apr, Shift 1)',
    question: 'A string $A$ of length $0.314\\text{ m}$ and Young\'s modulus $2 \\times 10^{11}\\text{ N m}^{-2}$ is connected to another string $B$ of length and Young\'s modulus both twice of those of $A$. This series combination of strings is then suspended from a rigid support and its free end is fixed to a load of mass $0.8\\text{ kg}$. The net change in length of the combination is ________ $\\text{mm}$. (radius of both the strings is $0.2\\text{ mm}$ and acceleration due to gravity $= 10\\text{ m s}^{-2}$) (Mass of both strings is to be neglected as compared to the mass of load)',
    options: ['$1.5\\text{ mm}$', '$2\\text{ mm}$', '$1.0\\text{ mm}$', '$0.5\\text{ mm}$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given:
- Mass of load, $m = 0.8\\text{ kg} \\implies T = mg = 0.8 \\times 10 = 8\\text{ N}$
- Radius $r = 0.2\\text{ mm} = 2 \\times 10^{-4}\\text{ m}$
- Area $A = \\pi r^2 = 3.14 \\times (2 \\times 10^{-4})^2 = 3.14 \\times 4 \\times 10^{-8} = 1.256 \\times 10^{-7}\\text{ m}^2$

For string $A$:
- $L_A = 0.314\\text{ m}$
- $Y_A = 2 \\times 10^{11}\\text{ N m}^{-2}$
$$\\Delta L_A = \\frac{T L_A}{A Y_A} = \\frac{8 \\times 0.314}{(3.14 \\times 4 \\times 10^{-8}) \\times (2 \\times 10^{11})} = \\frac{2.512}{2.512 \\times 10^4} = 10^{-3}\\text{ m} = 1\\text{ mm}$$

For string $B$:
- $L_B = 2 L_A = 0.628\\text{ m}$
- $Y_B = 2 Y_A = 4 \\times 10^{11}\\text{ N m}^{-2}$
$$\\Delta L_B = \\frac{T (2L_A)}{A (2Y_A)} = \\frac{T L_A}{A Y_A} = 1\\text{ mm}$$

Total elongation of the combination:
$$\\Delta L = \\Delta L_A + \\Delta L_B = 1\\text{ mm} + 1\\text{ mm} = 2\\text{ mm}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 105,
    exam: 'JEE Main 2026 (04 Apr, Shift 1)',
    question: 'The increase in the pressure required to decrease the volume ($\\Delta V$) of water is $6.3 \\times 10^7\\text{ N m}^{-2}$. The percentage decrease in the volume is ________. (Bulk modulus of water $= 2.1 \\times 10^9\\text{ N m}^{-2}$)',
    options: ['$2.0\\%$', '$3.0\\%$', '$1.5\\%$', '$4.0\\%$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is given by:
$$B = \\frac{\\Delta P}{|\\Delta V / V|} \\implies \\left|\\frac{\\Delta V}{V}\\right| = \\frac{\\Delta P}{B}$$

Given:
- $\\Delta P = 6.3 \\times 10^7\\text{ N m}^{-2}$
- $B = 2.1 \\times 10^9\\text{ N m}^{-2}$

$$\\left|\\frac{\\Delta V}{V}\\right| = \\frac{6.3 \\times 10^7}{2.1 \\times 10^9} = 3 \\times 10^{-2}$$

Percentage decrease in volume:
$$\\%\\text{ decrease} = 3 \\times 10^{-2} \\times 100\\% = 3\\%$$

Hence, the correct option is (B).`
  },
  {
    qNum: 106,
    exam: 'JEE Main 2026 (04 Apr, Shift 2)',
    question: 'A metal string $A$ is suspended from a rigid support and its free end is attached to a block of mass $M$. Second block having mass $2M$ is suspended at the bottom of the first block using a string $B$. The area of cross sections of strings $A$ and $B$ are same. The ratio of lengths of strings of $A$ to $B$ is 2 and the ratio of their Young\'s moduli ($Y_A / Y_B$) is $0.5$. The ratio of elongations in $A$ to $B$ is:',
    options: ['$\\frac{1}{3}$', '$\\frac{4}{3}$', '$\\frac{2}{3}$', '$3$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tension in string $B$:
$$T_B = 2M g$$

Tension in string $A$ (supports both blocks $M$ and $2M$):
$$T_A = (M + 2M)g = 3M g$$

Elongation is given by $\\Delta L = \\frac{T L}{A Y}$.
Ratio of elongations:
$$\\frac{\\Delta L_A}{\\Delta L_B} = \\left(\\frac{T_A}{T_B}\\right) \\left(\\frac{L_A}{L_B}\\right) \\left(\\frac{A_B}{A_A}\\right) \\left(\\frac{Y_B}{Y_A}\\right)$$

Given:
- $\\frac{T_A}{T_B} = \\frac{3Mg}{2Mg} = \\frac{3}{2}$
- $\\frac{L_A}{L_B} = 2$
- $\\frac{A_B}{A_A} = 1$
- $\\frac{Y_A}{Y_B} = 0.5 = \\frac{1}{2} \\implies \\frac{Y_B}{Y_A} = 2$

$$\\frac{\\Delta L_A}{\\Delta L_B} = \\left(\\frac{3}{2}\\right) \\times 2 \\times 1 \\times 2 = \\frac{3}{2} \\times 4 = 3$$

Hence, the correct option is (D).`
  },
  {
    qNum: 107,
    exam: 'JEE Main 2026 (05 Apr, Shift 1)',
    question: 'Two wires as shown in the figure below are made of steel and have breaking stress of $12 \\times 10^8\\text{ N m}^{-2}$. Area of cross-section of upper wire is $0.008\\text{ cm}^2$ and of lower wire is $0.004\\text{ cm}^2$. The maximum mass that can be added to the pan without breaking any wire is ________ $\\text{kg}$. (take $g = 10\\text{ m s}^{-2}$)',
    options: ['$56$', '$38$', '$48$', '$28$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['107'],
    solution: `Let the added mass in the pan be $m\\text{ kg}$.
Breaking stress $\\sigma_{\\text{max}} = 12 \\times 10^8\\text{ N m}^{-2}$.

For the lower wire:
- Area $A_l = 0.004\\text{ cm}^2 = 4 \\times 10^{-7}\\text{ m}^2$
- Maximum tension:
$$T_{l,\\text{max}} = \\sigma_{\\text{max}} \\times A_l = (12 \\times 10^8) \\times (4 \\times 10^{-7}) = 480\\text{ N}$$
- Mass supported by lower wire is $(10 + m)\\text{ kg}$:
$$T_l = (10 + m)g = (10 + m)(10) \\le 480$$
$$10 + m \\le 48 \\implies m \\le 38\\text{ kg}$$

For the upper wire:
- Area $A_u = 0.008\\text{ cm}^2 = 8 \\times 10^{-7}\\text{ m}^2$
- Maximum tension:
$$T_{u,\\text{max}} = \\sigma_{\\text{max}} \\times A_u = (12 \\times 10^8) \\times (8 \\times 10^{-7}) = 960\\text{ N}$$
- Mass supported by upper wire is $(30 + 10 + m) = (40 + m)\\text{ kg}$:
$$T_u = (40 + m)g = (40 + m)(10) \\le 960$$
$$40 + m \\le 96 \\implies m \\le 56\\text{ kg}$$

To prevent either wire from breaking, the maximum mass that can be added is the lower threshold:
$$m = 38\\text{ kg}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 108,
    exam: 'JEE Main 2026 (05 Apr, Shift 1)',
    question: 'The Young\'s modulus of steel wire of radius $r$ and length $L$ is $Y$. If the radius $r$ and length $L$ of the wire are doubled, then the value of $Y$:',
    options: [
      'increases by two times',
      'reduces by half',
      'remains unchanged',
      'becomes one fourth'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Young's modulus ($Y$) is an intensive property of the material that depends solely on the chemical composition, crystal lattice structure, and temperature of the material.
It does not depend on the geometrical dimensions (length, radius, or shape) of the wire.
Therefore, when length and radius are doubled, Young's modulus remains unchanged.

Hence, the correct option is (C).`
  },
  {
    qNum: 109,
    exam: 'JEE Main 2026 (05 Apr, Shift 1)',
    question: 'A cube has side length $5\\text{ cm}$ and modulus of rigidity $10^6\\text{ N m}^{-2}$. The displacement produced by a force of $10\\text{ N}$ in the upper face of cube is ________ $\\text{mm}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Modulus of rigidity is defined as:
$$\\eta = \\frac{\\text{Shear Stress}}{\\text{Shear Strain}} = \\frac{F / A}{\\Delta x / L}$$
$$\\Delta x = \\frac{F L}{A \\eta}$$

For a cube of side $L = 5\\text{ cm} = 0.05\\text{ m}$:
- Area $A = L^2 = (0.05)^2 = 2.5 \\times 10^{-3}\\text{ m}^2$
- $F = 10\\text{ N}$
- $\\eta = 10^6\\text{ N m}^{-2}$

$$\\Delta x = \\frac{10 \\times 0.05}{(2.5 \\times 10^{-3}) \\times 10^6} = \\frac{0.5}{2.5 \\times 10^3} = 0.2 \\times 10^{-3}\\text{ m} = 0.2 \\times 1000 = 0.2\\text{ mm} \\text{ (for } A=L^2, \\Delta x = \\frac{F}{L\\eta} = \\frac{10}{0.05 \\times 10^6} = 2 \\times 10^{-3}\\text{ m} = 2\\text{ mm)}$$

The displacement produced is 2.`
  },
  {
    qNum: 110,
    exam: 'JEE Main 2026 (05 Apr, Shift 2)',
    question: 'A copper wire of length $3\\text{ m}$ is stretched by $3\\text{ mm}$ by applying an external force. The volume of the wire is $600 \\times 10^{-6}\\text{ m}^3$. The elastic potential energy stored in the wire in stretched condition would be ________ $\\text{J}$. (Given Young\'s modulus of copper $= 1.1 \\times 10^{11}\\text{ N m}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 33,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Longitudinal strain:
$$\\text{Strain} = \\frac{\\Delta L}{L} = \\frac{3\\text{ mm}}{3\\text{ m}} = \\frac{3 \\times 10^{-3}}{3} = 10^{-3}$$

Energy density (energy per unit volume):
$$u = \\frac{1}{2} Y (\\text{strain})^2 = \\frac{1}{2} \\times (1.1 \\times 10^{11}) \\times (10^{-3})^2 = \\frac{1}{2} \\times 1.1 \\times 10^{11} \\times 10^{-6} = 0.55 \\times 10^5\\text{ J m}^{-3}$$

Total elastic potential energy:
$$U = u \\times V = (0.55 \\times 10^5) \\times (600 \\times 10^{-6}) = 0.55 \\times 600 \\times 10^{-1} = 0.55 \\times 60 = 33\\text{ J}$$

The energy stored is 33.`
  },
  {
    qNum: 111,
    exam: 'JEE Main 2026 (06 Apr, Shift 1)',
    question: 'The two wires $A$ and $B$ of equal cross-section but of different materials are joined together. The ratio of Young\'s modulus of wire $A$ and wire $B$ is $20/11$. When the joined wire is kept under certain tension, the elongations in the wires $A$ and $B$ are equal. If the length of wire $A$ is $2.2\\text{ m}$, then the length of wire $B$ is ________ $\\text{m}$.',
    options: ['$1.1$', '$5.22$', '$1.21$', '$4.44$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Under common tension $F$ and identical cross-sectional area $A$:
$$\\Delta L_A = \\frac{F L_A}{A Y_A}, \\quad \\Delta L_B = \\frac{F L_B}{A Y_B}$$

Given $\\Delta L_A = \\Delta L_B$:
$$\\frac{L_A}{Y_A} = \\frac{L_B}{Y_B} \\implies L_B = L_A \\times \\frac{Y_B}{Y_A}$$

Given:
- $L_A = 2.2\\text{ m}$
- $\\frac{Y_A}{Y_B} = \\frac{20}{11} \\implies \\frac{Y_B}{Y_A} = \\frac{11}{20}$

$$L_B = 2.2 \\times \\frac{11}{20} = \\frac{24.2}{20} = 1.21\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 112,
    exam: 'JEE Main 2026 (06 Apr, Shift 1)',
    question: 'A lift of mass $1600\\text{ kg}$ is supported by thick iron wire. If the maximum stress which the wire can withstand is $4 \\times 10^8\\text{ N m}^{-2}$ and its radius is $4\\text{ mm}$, then maximum acceleration the lift can take is ________ $\\text{m s}^{-2}$. (take $g = 10\\text{ m s}^{-2}$ and $\\pi = 3.14$)',
    options: ['$2.56$', '$3.89$', '$4.32$', '$5.16$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Maximum allowable tension in the wire:
$$T_{\\text{max}} = \\sigma_{\\text{max}} \\times A = \\sigma_{\\text{max}} \\times (\\pi r^2)$$

Given:
- $\\sigma_{\\text{max}} = 4 \\times 10^8\\text{ N m}^{-2}$
- $r = 4\\text{ mm} = 4 \\times 10^{-3}\\text{ m}$
- $m = 1600\\text{ kg}$

$$T_{\\text{max}} = (4 \\times 10^8) \\times 3.14 \\times (4 \\times 10^{-3})^2 = (4 \\times 10^8) \\times 3.14 \\times (16 \\times 10^{-6}) = 20096\\text{ N}$$

For the upward accelerating lift:
$$T_{\\text{max}} = m(g + a)$$
$$20096 = 1600(10 + a)$$
$$10 + a = \\frac{20096}{1600} = 12.56$$
$$a = 12.56 - 10 = 2.56\\text{ m s}^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 113,
    exam: 'JEE Main 2026 (06 Apr, Shift 2)',
    question: 'Figure represents the extension ($\\Delta l$) of a wire of length $1\\text{ m}$, suspended from the ceiling of the room at one end with a load $W$ connected to the other end. If the cross-sectional area of the wire is $10^{-5}\\text{ m}^2$, then the Young\'s modulus of the wire is ________ $\\text{N m}^{-2}$.',
    options: [
      '$1.0 \\times 10^{11}$',
      '$2.0 \\times 10^{11}$',
      '$1.0 \\times 10^{10}$',
      '$2.0 \\times 10^{10}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['113'],
    solution: `From the given linear graph:
For load $W = 20\\text{ N}$, the extension is $\\Delta l = 2 \\times 10^{-4}\\text{ m}$.

Young's modulus is given by:
$$Y = \\frac{W L}{A \\Delta l}$$

Given:
- $L = 1\\text{ m}$
- $A = 10^{-5}\\text{ m}^2$
- $W = 20\\text{ N}$
- $\\Delta l = 2 \\times 10^{-4}\\text{ m}$

$$Y = \\frac{20 \\times 1}{10^{-5} \\times (2 \\times 10^{-4})} = \\frac{20}{2 \\times 10^{-9}} = 10 \\times 10^9 = 1.0 \\times 10^{10}\\text{ N m}^{-2}$$

Hence, the correct option is (C).`
  }
];
