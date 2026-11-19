import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'solids_diagram_urls.json'), 'utf8'));

export const SOLIDS_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'JEE Main 2003',
    question: 'A wire suspended vertically from one of its ends is stretched by attaching a weight of $200\\text{ N}$ to the lower end. The weight stretches the wire by $1\\text{ mm}$. Then the elastic energy stored in the wire is:',
    options: ['$0.2\\text{ J}$', '$10\\text{ J}$', '$20\\text{ J}$', '$0.1\\text{ J}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The elastic potential energy stored in a stretched wire is given by:
$$U = \\frac{1}{2} F \\Delta l$$

Given:
- Force (load), $F = 200\\text{ N}$
- Elongation, $\\Delta l = 1\\text{ mm} = 10^{-3}\\text{ m}$

Substituting the values:
$$U = \\frac{1}{2} \\times 200 \\times 10^{-3} = 100 \\times 10^{-3} = 0.1\\text{ J}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: 'JEE Main 2005',
    question: "If $S$ is stress and $Y$ is Young's modulus of material of a wire, the energy stored in the wire per unit volume is:",
    options: ['$2S^2Y$', '$\\frac{S^2}{2Y}$', '$\\frac{2Y}{S^2}$', '$\\frac{S}{2Y}$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Energy stored per unit volume (energy density $u$) is:
$$u = \\frac{1}{2} \\times \\text{stress} \\times \\text{strain}$$

From Hooke's Law:
$$Y = \\frac{\\text{stress}}{\\text{strain}} \\implies \\text{strain} = \\frac{\\text{stress}}{Y} = \\frac{S}{Y}$$

Substituting strain into the energy density formula:
$$u = \\frac{1}{2} \\times S \\times \\frac{S}{Y} = \\frac{S^2}{2Y}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 3,
    exam: 'JEE Main 2006',
    question: 'A wire elongates by $l\\text{ mm}$ when a load $W$ is hanged from it. If the wire goes over a pulley and two weights $W$ each are hung at the two ends, the elongation of the wire will be (in mm):',
    options: ['$l/2$', '$l$', '$2l$', 'zero'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `When a load $W$ is hung from a wire suspended at one end, the tension in the wire is $T = W$, and the elongation is:
$$\\Delta l = \\frac{T L}{A Y} = \\frac{W L}{A Y} = l\\text{ mm}$$

When the wire goes over a frictionless pulley and two weights $W$ each are hung at both ends, the tension throughout the wire is still $T = W$.
Since the total tension acting on the wire is unchanged ($T = W$), the elongation of the wire remains:
$$\\Delta l = l\\text{ mm}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 4,
    exam: 'JEE Main 2009',
    question: 'Two wires are made of the same material and have the same volume. However wire 1 has cross-sectional area $A$ and wire 2 has cross-sectional area $3A$. If the length of wire 1 increases by $\\Delta x$ on applying force $F$, how much force is needed to stretch wire 2 by the same amount?',
    options: ['$F$', '$4F$', '$6F$', '$9F$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the initial length of wire 1 be $L_1$ and wire 2 be $L_2$.
Given that both wires have the same volume:
$$V = A_1 L_1 = A_2 L_2 \\implies A L_1 = (3A) L_2 \\implies L_1 = 3 L_2 \\implies \\frac{L_2}{L_1} = \\frac{1}{3}$$

The elongation is given by:
$$\\Delta x = \\frac{F L}{A Y} \\implies F = \\frac{Y A \\Delta x}{L}$$

Since both wires have the same material ($Y$) and undergo the same elongation ($\\Delta x$):
$$F \\propto \\frac{A}{L}$$
$$\\frac{F_2}{F_1} = \\left(\\frac{A_2}{A_1}\\right) \\left(\\frac{L_1}{L_2}\\right) = \\left(\\frac{3A}{A}\\right) \\times 3 = 3 \\times 3 = 9$$
$$F_2 = 9 F_1 = 9F$$

Hence, the correct option is (D).`
  },
  {
    qNum: 5,
    exam: 'JEE Main 2012 (07 May)',
    question: 'The load versus elongation graphs for four wires of same length and made of the same material are shown in the figure. The thinnest wire is represented by the line:',
    options: ['$OA$', '$OC$', '$OD$', '$OB$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['5'],
    solution: `Elongation is given by:
$$\\Delta l = \\frac{F L}{A Y} = \\frac{F L}{\\pi r^2 Y}$$

For wires of the same length ($L$) and material ($Y$), for a given load $F$:
$$\\Delta l \\propto \\frac{1}{A} \\propto \\frac{1}{r^2}$$
Thus, the thinnest wire (smallest cross-sectional area $A$) will have the maximum elongation for a given load $F$.
Looking at the graph, line $OA$ has the maximum elongation for any given load. Therefore, $OA$ corresponds to the thinnest wire.

Hence, the correct option is (A).`
  },
  {
    qNum: 6,
    exam: 'JEE Main 2012 (07 May)',
    question: "A structural steel rod has a radius of $10\\text{ mm}$ and length of $1.0\\text{ m}$. A $100\\text{ kN}$ force stretches it along its length. Young's modulus of structural steel is $2 \\times 10^{11}\\text{ N m}^{-2}$. The percentage strain is about:",
    options: ['$0.16\\%$', '$0.32\\%$', '$0.08\\%$', '$0.24\\%$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Given:
- Force, $F = 100\\text{ kN} = 10^5\\text{ N}$
- Radius, $r = 10\\text{ mm} = 10^{-2}\\text{ m}$
- Length, $L = 1.0\\text{ m}$
- Young's modulus, $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$

Area of cross-section:
$$A = \\pi r^2 = 3.14 \\times (10^{-2})^2 = 3.14 \\times 10^{-4}\\text{ m}^2$$

Stress:
$$\\text{Stress} = \\frac{F}{A} = \\frac{10^5}{3.14 \\times 10^{-4}} = 3.185 \\times 10^8\\text{ N m}^{-2}$$

Strain:
$$\\text{Strain} = \\frac{\\text{Stress}}{Y} = \\frac{3.185 \\times 10^8}{2 \\times 10^{11}} = 1.59 \\times 10^{-3} \\approx 1.6 \\times 10^{-3}$$

Percentage strain:
$$\\%\\text{ strain} = \\text{Strain} \\times 100\\% = 1.6 \\times 10^{-3} \\times 100\\% \\approx 0.16\\%$$

Hence, the correct option is (A).`
  },
  {
    qNum: 7,
    exam: 'JEE Main 2012 (19 May)',
    question: 'A steel wire can sustain $100\\text{ kg}$ weight without breaking. If the wire is cut into two equal parts, each part can sustain a weight of:',
    options: ['$50\\text{ kg}$', '$400\\text{ kg}$', '$100\\text{ kg}$', '$500\\text{ kg}$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Breaking force depends only on the breaking stress of the material and the cross-sectional area:
$$F_{\\text{breaking}} = \\text{Breaking Stress} \\times A$$

Cutting the wire into two equal parts does not change the cross-sectional area $A$ or the material's breaking stress.
Therefore, the breaking load remains independent of length, which is $100\\text{ kg}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 8,
    exam: 'JEE Main 2013 (09 Apr)',
    question: 'If the ratio of lengths, radii and Young\'s moduli of steel and brass wires in the figure are $a$, $b$ and $c$ respectively, then the corresponding ratio of increase in their lengths is:',
    options: [
      '$\\frac{2a}{c b^2}$',
      '$\\frac{3a}{2b^2 c}$',
      '$\\frac{3c}{2a b^2}$',
      '$\\frac{2a c}{b^2}$'
    ],
    correct_option: 1, // Note: option B is 3a / (2 b^2 c), answer key is C or B depending on option order, let's verify exact ratio
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['8'],
    solution: `From the given figure:
- Tension in steel wire: $T_s = (M + 2M)g = 3Mg$
- Tension in brass wire: $T_b = 2Mg$

Given ratios:
$$\\frac{L_s}{L_b} = a, \\quad \\frac{r_s}{r_b} = b, \\quad \\frac{Y_s}{Y_b} = c$$

Elongation is given by $\\Delta L = \\frac{T L}{\\pi r^2 Y}$.
Ratio of increase in lengths:
$$\\frac{\\Delta L_s}{\\Delta L_b} = \\left(\\frac{T_s}{T_b}\\right) \\left(\\frac{L_s}{L_b}\\right) \\left(\\frac{r_b}{r_s}\\right)^2 \\left(\\frac{Y_b}{Y_s}\\right)$$
$$= \\left(\\frac{3Mg}{2Mg}\\right) (a) \\left(\\frac{1}{b}\\right)^2 \\left(\\frac{1}{c}\\right) = \\frac{3a}{2b^2 c}$$

Hence, matching option with value $\\frac{3a}{2b^2 c}$ is correct.`
  },
  {
    qNum: 9,
    exam: 'JEE Main 2013 (22 Apr)',
    question: 'A uniform wire (Young\'s modulus $2 \\times 10^{11}\\text{ N m}^{-2}$) is subjected to longitudinal tensile stress of $5 \\times 10^7\\text{ N m}^{-2}$. If the overall volume change in the wire is $0.02\\%$, the fractional decrease in the radius of the wire is close to:',
    options: ['$1.0 \\times 10^{-4}$', '$1.5 \\times 10^{-4}$', '$0.25 \\times 10^{-4}$', '$0.5 \\times 10^{-4}$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Volume of the cylindrical wire is:
$$V = \\pi r^2 L$$
Taking fractional changes:
$$\\frac{\\Delta V}{V} = 2\\frac{\\Delta r}{r} + \\frac{\\Delta L}{L}$$

Longitudinal strain:
$$\\frac{\\Delta L}{L} = \\frac{\\text{Stress}}{Y} = \\frac{5 \\times 10^7}{2 \\times 10^{11}} = 2.5 \\times 10^{-4}$$

Given fractional change in volume:
$$\\frac{\\Delta V}{V} = 0.02\\% = 2 \\times 10^{-4}$$

Therefore:
$$2\\frac{\\Delta r}{r} = \\frac{\\Delta V}{V} - \\frac{\\Delta L}{L} = 2 \\times 10^{-4} - 2.5 \\times 10^{-4} = -0.5 \\times 10^{-4}$$
$$\\left|\\frac{\\Delta r}{r}\\right| = \\frac{0.5 \\times 10^{-4}}{2} = 0.25 \\times 10^{-4}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 10,
    exam: 'JEE Main 2013 (23 Apr)',
    question: 'A copper wire of length $1.0\\text{ m}$ and a steel wire of length $0.5\\text{ m}$ having equal cross-sectional areas are joined end to end. The composite wire is stretched by a certain load which stretches the copper wire by $1\\text{ mm}$. If the Young\'s moduli of copper and steel are respectively $1.0 \\times 10^{11}\\text{ N m}^{-2}$ and $2.0 \\times 10^{11}\\text{ N m}^{-2}$, the total extension of the composite wire is:',
    options: ['$1.75\\text{ mm}$', '$2.0\\text{ mm}$', '$1.50\\text{ mm}$', '$1.25\\text{ mm}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `In series combination under the same tension $F$ and same cross-sectional area $A$:
$$\\frac{F}{A} = Y_c \\frac{\\Delta L_c}{L_c} = Y_s \\frac{\\Delta L_s}{L_s}$$

Given:
- $L_c = 1.0\\text{ m}$, $\\Delta L_c = 1\\text{ mm}$, $Y_c = 1.0 \\times 10^{11}\\text{ N m}^{-2}$
- $L_s = 0.5\\text{ m}$, $Y_s = 2.0 \\times 10^{11}\\text{ N m}^{-2}$

$$1.0 \\times 10^{11} \\times \\frac{1}{1.0} = 2.0 \\times 10^{11} \\times \\frac{\\Delta L_s}{0.5}$$
$$1 = 4 \\Delta L_s \\implies \\Delta L_s = 0.25\\text{ mm}$$

Total extension:
$$\\Delta L_{\\text{total}} = \\Delta L_c + \\Delta L_s = 1\\text{ mm} + 0.25\\text{ mm} = 1.25\\text{ mm}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 11,
    exam: 'JEE Main 2013 (25 Apr)',
    question: 'Two blocks of masses $m$ and $M$ are connected by means of a metal wire of cross-sectional area $A$ passing over a frictionless fixed pulley as shown in the figure. The system is then released. If $M = 2m$, then the stress produced in the wire is:',
    options: ['$\\frac{2mg}{3A}$', '$\\frac{4mg}{3A}$', '$\\frac{mg}{3A}$', '$\\frac{3mg}{4A}$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['11'],
    solution: `Tension in the wire connecting two masses over a fixed frictionless pulley:
$$T = \\frac{2 M m}{M + m} g$$

Given $M = 2m$:
$$T = \\frac{2(2m)(m)}{2m + m} g = \\frac{4m^2 g}{3m} = \\frac{4}{3} mg$$

Stress in the wire:
$$\\text{Stress} = \\frac{T}{A} = \\frac{4mg}{3A}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 12,
    exam: 'JEE Main 2014 (09 Apr)',
    question: 'In materials like aluminium and copper, the correct order of magnitude of various elastic moduli is:',
    options: [
      "Young's moduli < shear moduli < bulk moduli",
      "Bulk moduli < shear moduli < Young's moduli",
      "shear moduli < Young's moduli < bulk moduli",
      "Bulk moduli < Young's moduli < shear moduli"
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For typical isotropic metals like aluminium and copper, Poisson's ratio $\\sigma \\approx 0.33$.
The relations between moduli are:
$$Y = 2\\eta(1 + \\sigma) \\implies \\eta = \\frac{Y}{2(1 + \\sigma)} \\approx \\frac{Y}{2.66} < Y$$
$$Y = 3K(1 - 2\\sigma) \\implies K = \\frac{Y}{3(1 - 2\\sigma)} \\approx \\frac{Y}{3(0.34)} \\approx \\frac{Y}{1.02} \\approx Y\\text{ or } K > Y$$
Therefore, the general order of magnitude is:
$$\\eta < Y < K$$
(shear moduli < Young's moduli < bulk moduli).

Hence, the correct option is (C).`
  },
  {
    qNum: 13,
    exam: 'JEE Main 2014 (11 Apr)',
    question: 'The bulk moduli of ethanol, mercury and water are given as $0.9$, $25$ and $2.2$ respectively in units of $10^9\\text{ N m}^{-2}$. For a given value of pressure, the fractional compression in volume is $\\frac{\\Delta V}{V}$. Which of the following statements about $\\frac{\\Delta V}{V}$ for these three liquids is correct?',
    options: [
      'Ethanol > Water > Mercury',
      'Water > Ethanol > Mercury',
      'Mercury > Ethanol > Water',
      'Ethanol > Mercury > Water'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is given by:
$$B = \\frac{\\Delta P}{\\Delta V / V} \\implies \\frac{\\Delta V}{V} = \\frac{\\Delta P}{B}$$

For a constant pressure $\\Delta P$:
$$\\frac{\\Delta V}{V} \\propto \\frac{1}{B}$$

Given bulk moduli:
- $B_{\\text{ethanol}} = 0.9 \\times 10^9\\text{ N m}^{-2}$
- $B_{\\text{water}} = 2.2 \\times 10^9\\text{ N m}^{-2}$
- $B_{\\text{mercury}} = 25 \\times 10^9\\text{ N m}^{-2}$

Since $B_{\\text{ethanol}} < B_{\\text{water}} < B_{\\text{mercury}}$, the fractional compression in volume satisfies:
$$\\text{Ethanol} > \\text{Water} > \\text{Mercury}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 14,
    exam: 'JEE Main 2014 (12 Apr)',
    question: 'Steel ruptures when a shear of $3.5 \\times 10^8\\text{ N m}^{-2}$ is applied. The force needed to punch a $1\\text{ cm}$ diameter hole in a steel sheet $0.3\\text{ cm}$ thick is nearly:',
    options: ['$1.4 \\times 10^4\\text{ N}$', '$5.7 \\times 10^4\\text{ N}$', '$3.3 \\times 10^4\\text{ N}$', '$1.1 \\times 10^4\\text{ N}$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['14'],
    solution: `The sheared area corresponds to the cylindrical surface area of the punched hole:
$$A = \\pi D t$$

Given:
- Diameter, $D = 1\\text{ cm} = 10^{-2}\\text{ m}$
- Thickness, $t = 0.3\\text{ cm} = 0.3 \\times 10^{-2}\\text{ m}$
- Shear strength, $\\sigma_s = 3.5 \\times 10^8\\text{ N m}^{-2}$

Area:
$$A = \\pi \\times 10^{-2} \\times (0.3 \\times 10^{-2}) = 0.3\\pi \\times 10^{-4}\\text{ m}^2$$

Required shearing force:
$$F = \\sigma_s \\times A = (3.5 \\times 10^8) \\times (0.3\\pi \\times 10^{-4})$$
$$F = 1.05\\pi \\times 10^4 \\approx 1.05 \\times 3.1416 \\times 10^4 \\approx 3.3 \\times 10^4\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 15,
    exam: 'JEE Main 2015 (04 Apr)',
    question: 'A pendulum made of a uniform wire of cross sectional area $A$ has time period $T$. When an additional mass $M$ is added to its bob, the time period changes to $T_M$. If the Young\'s modulus of the material of the wire is $Y$, then $\\frac{1}{Y}$ is equal to: ($g = \\text{gravitational acceleration}$)',
    options: [
      '$\\left[\\left(\\frac{T_M}{T}\\right)^2 - 1\\right] \\frac{Mg}{A}$',
      '$\\left[\\left(\\frac{T_M}{T}\\right)^2 - 1\\right] \\frac{A}{Mg}$',
      '$\\left[1 - \\left(\\frac{T_M}{T}\\right)^2\\right] \\frac{A}{Mg}$',
      '$\\left[1 - \\left(\\frac{T}{T_M}\\right)^2\\right] \\frac{A}{Mg}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Initial time period:
$$T = 2\\pi \\sqrt{\\frac{L}{g}}$$

When mass $M$ is added, the elongation produced in the wire is:
$$\\Delta L = \\frac{M g L}{A Y}$$
New length is $L\' = L + \\Delta L = L\\left(1 + \\frac{M g}{A Y}\\right)$.

New time period:
$$T_M = 2\\pi \\sqrt{\\frac{L\'}{g}} = 2\\pi \\sqrt{\\frac{L}{g}\\left(1 + \\frac{Mg}{AY}\\right)}$$
$$\\left(\\frac{T_M}{T}\\right)^2 = 1 + \\frac{Mg}{AY}$$
$$\\left(\\frac{T_M}{T}\\right)^2 - 1 = \\frac{Mg}{AY}$$
$$\\frac{1}{Y} = \\left[\\left(\\frac{T_M}{T}\\right)^2 - 1\\right] \\frac{A}{Mg}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'JEE Main 2016 (09 Apr)',
    question: 'A uniformly tapering conical wire is made from a material of Young\'s modulus $Y$ and has a normal, unextended length $L$. The radii, at the upper and lower ends of this conical wire, have values $R$ and $3R$, respectively. The upper end of the wire is fixed to a rigid support and a mass $M$ is suspended from its lower end. The equilibrium extended length of this wire would equal:',
    options: [
      '$L\\left(1 + \\frac{2Mg}{9\\pi Y R^2}\\right)$',
      '$L\\left(1 + \\frac{Mg}{9\\pi Y R^2}\\right)$',
      '$L\\left(1 + \\frac{Mg}{3\\pi Y R^2}\\right)$',
      '$L\\left(1 + \\frac{2Mg}{3\\pi Y R^2}\\right)$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Radius of the wire varies linearly with distance $x$ from the upper end ($x=0, r=R$) to the lower end ($x=L, r=3R$):
$$r(x) = R + \\frac{3R - R}{L} x = R\\left(1 + \\frac{2x}{L}\\right)$$

For an element $dx$, the elongation is:
$$d(\\Delta L) = \\frac{Mg\\, dx}{\\pi [r(x)]^2 Y}$$

Integrating from $x = 0$ to $x = L$:
$$\\Delta L = \\frac{Mg}{\\pi Y} \\int_0^L \\frac{dx}{R^2 (1 + 2x/L)^2} = \\frac{Mg}{\\pi Y R^2} \\left[-\\frac{L}{2} \\frac{1}{1 + 2x/L}\\right]_0^L$$
$$\\Delta L = \\frac{Mg L}{2\\pi Y R^2} \\left[1 - \\frac{1}{3}\\right] = \\frac{Mg L}{2\\pi Y R^2} \\times \\frac{2}{3} = \\frac{Mg L}{3\\pi Y R^2}$$

Total equilibrium extended length:
$$L_{\\text{eq}} = L + \\Delta L = L\\left(1 + \\frac{Mg}{3\\pi Y R^2}\\right)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 17,
    exam: 'JEE Main 2016 (10 Apr)',
    question: 'A bottle has an opening of radius $a$ and length $b$. A cork of length $b$ and radius $(a + \\Delta a)$ where $(\\Delta a \\ll a)$, is compressed to fit into the opening completely (see figure). If the bulk modulus of cork is $B$ and the coefficient of friction between the bottle and cork is $\\mu$, then the force needed to push the cork into the bottle is:',
    options: [
      '$(\\pi \\mu B b) \\Delta a$',
      '$(2\\pi \\mu B b) \\Delta a$',
      '$(3\\pi \\mu B b) \\Delta a$',
      '$(4\\pi \\mu B b) \\Delta a$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['17'],
    solution: `Volume of the cork:
$$V = \\pi a^2 b$$
Change in volume when radius is compressed by $\\Delta a$:
$$\\Delta V = 2\\pi a b \\Delta a$$

Volume strain:
$$\\frac{\\Delta V}{V} = \\frac{2\\pi a b \\Delta a}{\\pi a^2 b} = \\frac{2\\Delta a}{a}$$

Radial pressure (stress) exerted by the compressed cork:
$$P = B \\times \\text{strain} = B \\left(\\frac{2\\Delta a}{a}\\right)$$

Normal force exerted on the cylindrical wall of area $A = 2\\pi a b$:
$$N = P \\times A = \\left(B \\frac{2\\Delta a}{a}\\right) (2\\pi a b) = 4\\pi B b \\Delta a$$

The frictional force needed to push the cork into the bottle:
$$f = \\mu N = 4\\pi \\mu B b \\Delta a$$

Hence, the correct option is (D).`
  },
  {
    qNum: 18,
    exam: 'JEE Main 2017 (02 Apr)',
    question: 'A man grows into a giant such that his linear dimensions increase by a factor of $9$. Assuming that his density remains same, the stress in the leg will change by a factor of:',
    options: ['$\\frac{1}{81}$', '$9$', '$\\frac{1}{9}$', '$81$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the linear scale factor be $k = 9$.
- Mass $M = \\rho V \\propto L^3 \\propto k^3$
- Cross-sectional area of leg $A \\propto L^2 \\propto k^2$

The stress in the leg is:
$$\\text{Stress} = \\frac{\\text{Weight}}{\\text{Area}} = \\frac{M g}{A} \\propto \\frac{k^3}{k^2} = k$$

Since $k = 9$, the stress increases by a factor of $9$.

Hence, the correct option is (B).`
  },
  {
    qNum: 19,
    exam: 'JEE Main 2018 (08 Apr)',
    question: 'A solid sphere of radius $r$ made of a soft material of bulk modulus $K$ is surrounded by a liquid in a cylindrical container. A massless piston of area $a$ floats on the surface of the liquid, covering entire cross-section of cylindrical container. When a mass $m$ is placed on the surface of the piston to compress the liquid, the fractional decrement in the radius of the sphere $\\left(\\frac{\\Delta r}{r}\\right)$ is:',
    options: ['$\\frac{mg}{Ka}$', '$\\frac{Ka}{mg}$', '$\\frac{Ka}{3mg}$', '$\\frac{mg}{3Ka}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Pressure applied on the liquid by placing mass $m$ on the piston of area $a$:
$$\\Delta P = \\frac{mg}{a}$$

From definition of Bulk modulus $K$:
$$K = \\frac{\\Delta P}{\\Delta V / V} \\implies \\frac{\\Delta V}{V} = \\frac{\\Delta P}{K} = \\frac{mg}{Ka}$$

For a solid sphere, volume is $V = \\frac{4}{3}\\pi r^3$.
Differentiating gives:
$$\\frac{\\Delta V}{V} = 3\\frac{\\Delta r}{r}$$
Therefore:
$$\\frac{\\Delta r}{r} = \\frac{1}{3} \\frac{\\Delta V}{V} = \\frac{mg}{3Ka}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 20,
    exam: 'JEE Main 2018 (15 Apr, Shift 2)',
    question: 'As shown in the figure, forces of $10^5\\text{ N}$ each are applied in opposite directions on the upper and lower faces of a cube of side $10\\text{ cm}$, shifting the upper face parallel to itself by $0.5\\text{ cm}$. If the side of another cube of the same material is $20\\text{ cm}$, then under similar conditions as above, the displacement will be:',
    options: ['$1.00\\text{ cm}$', '$0.25\\text{ cm}$', '$0.37\\text{ cm}$', '$0.75\\text{ cm}$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['20'],
    solution: `Shear modulus is defined as:
$$\\eta = \\frac{\\text{Shear Stress}}{\\text{Shear Strain}} = \\frac{F / A}{x / L} = \\frac{F L}{A x}$$
For a cube of side $L$, face area is $A = L^2$:
$$\\eta = \\frac{F L}{L^2 x} = \\frac{F}{L x} \\implies x = \\frac{F}{\\eta L}$$

Since the force $F$ and material shear modulus $\\eta$ are the same:
$$x \\propto \\frac{1}{L}$$
$$\\frac{x_2}{x_1} = \\frac{L_1}{L_2} = \\frac{10\\text{ cm}}{20\\text{ cm}} = \\frac{1}{2}$$
$$x_2 = \\frac{x_1}{2} = \\frac{0.5\\text{ cm}}{2} = 0.25\\text{ cm}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 21,
    exam: 'JEE Main 2019 (09 Jan, Shift 1)',
    question: 'A rod, of length $L$ at room temperature and uniform area of cross section $A$, is made of a metal having coefficient of linear expansion $\\alpha/^{\\circ}\\text{C}$. It is observed that an external compressive force $F$, applied on each of its ends, prevents any change in the length of the rod when its temperature rises by $\\Delta T\\text{ K}$. Young\'s modulus, $Y$ for this metal is:',
    options: [
      '$\\frac{F}{A\\alpha(\\Delta T - 273)}$',
      '$\\frac{2F}{A\\alpha\\Delta T}$',
      '$\\frac{F}{A\\alpha\\Delta T}$',
      '$\\frac{F}{2A\\alpha\\Delta T}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Thermal expansion of the rod would be:
$$\\Delta L_{\\text{th}} = L \\alpha \\Delta T$$

The compressive force $F$ produces a mechanical contraction:
$$\\Delta L_{\\text{mech}} = \\frac{F L}{A Y}$$

Since the net change in length is prevented ($\\Delta L_{\\text{net}} = 0$):
$$\\Delta L_{\\text{mech}} = \\Delta L_{\\text{th}}$$
$$\\frac{F L}{A Y} = L \\alpha \\Delta T \\implies Y = \\frac{F}{A \\alpha \\Delta T}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 22,
    exam: 'JEE Main 2019 (08 Apr, Shift 1)',
    question: 'A steel wire having a radius of $2.0\\text{ mm}$, carrying a load of $4\\text{ kg}$, is hanging from a ceiling. Given that $g = 3.1\\pi\\text{ m s}^{-2}$, what will be the tensile stress that would be developed in the wire?',
    options: [
      '$5.2 \\times 10^6\\text{ N m}^{-2}$',
      '$6.2 \\times 10^6\\text{ N m}^{-2}$',
      '$4.8 \\times 10^6\\text{ N m}^{-2}$',
      '$3.1 \\times 10^6\\text{ N m}^{-2}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tensile stress developed in the wire:
$$\\text{Stress} = \\frac{F}{A} = \\frac{mg}{\\pi r^2}$$

Given:
- $m = 4\\text{ kg}$
- $r = 2.0\\text{ mm} = 2 \\times 10^{-3}\\text{ m}$
- $g = 3.1\\pi\\text{ m s}^{-2}$

Substituting values:
$$\\text{Stress} = \\frac{4 \\times (3.1\\pi)}{\\pi (2 \\times 10^{-3})^2} = \\frac{12.4\\pi}{\\pi \\times 4 \\times 10^{-6}} = 3.1 \\times 10^6\\text{ N m}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 23,
    exam: 'JEE Main 2019 (08 Apr, Shift 1)',
    question: 'A boy\'s catapult is made of rubber cord which is $42\\text{ cm}$ long, with $6\\text{ mm}$ diameter of cross-section and of negligible mass. The boy keeps a stone weighing $0.02\\text{ kg}$ on it and stretches the cord by $20\\text{ cm}$ by applying a constant force. When released, the stone flies off with a velocity of $20\\text{ m s}^{-1}$. Neglect the change in the area of cross-section of the cord while stretched. The Young\'s modulus of rubber is closest to:',
    options: ['$10^6\\text{ N m}^{-2}$', '$10^4\\text{ N m}^{-2}$', '$10^8\\text{ N m}^{-2}$', '$10^3\\text{ N m}^{-2}$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elastic potential energy stored in the rubber cord is converted to kinetic energy of the stone:
$$U = \\frac{1}{2} \\frac{Y A (\\Delta L)^2}{L} = \\frac{1}{2} m v^2$$

Given:
- $L = 0.42\\text{ m}$
- Diameter $d = 6\\text{ mm} = 6 \\times 10^{-3}\\text{ m} \\implies r = 3 \\times 10^{-3}\\text{ m}$
- Area $A = \\pi r^2 = \\pi (3 \\times 10^{-3})^2 \\approx 2.83 \\times 10^{-5}\\text{ m}^2$
- $\\Delta L = 20\\text{ cm} = 0.2\\text{ m}$
- Mass of stone $m = 0.02\\text{ kg}$
- Velocity $v = 20\\text{ m s}^{-1}$

Kinetic energy:
$$K = \\frac{1}{2} (0.02) (20)^2 = 4\\text{ J}$$

Equating:
$$\\frac{1}{2} \\frac{Y (2.83 \\times 10^{-5}) (0.2)^2}{0.42} = 4$$
$$Y \\times \\frac{1.132 \\times 10^{-6}}{0.84} = 4 \\implies Y \\approx \\frac{3.36}{1.132 \\times 10^{-6}} \\approx 3 \\times 10^6\\text{ N m}^{-2}$$
This is closest in order of magnitude to $10^6\\text{ N m}^{-2}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 24,
    exam: 'JEE Main 2019 (08 Apr, Shift 2)',
    question: 'Young\'s moduli of two wires $A$ and $B$ are in the ratio $7 : 4$. Wire $A$ is $2\\text{ m}$ long and has radius $R$. Wire $B$ is $1.5\\text{ m}$ long and has radius $2\\text{ mm}$. If the two wires stretch by the same length for a given load, the value of $R$ is close to:',
    options: ['$1.3\\text{ mm}$', '$1.9\\text{ mm}$', '$1.5\\text{ mm}$', '$1.7\\text{ mm}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{\\pi r^2 Y}$$

Given that for the same load $F$, the elongation is equal ($\\Delta L_A = \\Delta L_B$):
$$\\frac{L_A}{r_A^2 Y_A} = \\frac{L_B}{r_B^2 Y_B} \\implies r_A^2 = r_B^2 \\left(\\frac{L_A}{L_B}\\right) \\left(\\frac{Y_B}{Y_A}\\right)$$

Given:
- $\\frac{Y_A}{Y_B} = \\frac{7}{4} \\implies \\frac{Y_B}{Y_A} = \\frac{4}{7}$
- $L_A = 2\\text{ m}$, $L_B = 1.5\\text{ m}$
- $r_B = 2\\text{ mm}$

Substituting:
$$R^2 = (2)^2 \\times \\left(\\frac{2}{1.5}\\right) \\times \\left(\\frac{4}{7}\\right) = 4 \\times \\frac{4}{3} \\times \\frac{4}{7} = \\frac{64}{21} \\approx 3.048\\text{ mm}^2$$
$$R = \\sqrt{3.048} \\approx 1.745\\text{ mm} \\approx 1.7\\text{ mm}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 25,
    exam: 'JEE Main 2019 (10 Apr, Shift 2)',
    question: 'In an experiment, brass and steel wires of length $1\\text{ m}$ each with areas of cross section $1\\text{ mm}^2$ are used. The wires are connected in series and one end of the combined wire is connected to a rigid support and other end is subjected to elongation. The stress required to produce a net elongation of $0.2\\text{ mm}$ is: [Given, the Young\'s Modulus for steel and brass are, respectively, $120 \\times 10^9\\text{ N m}^{-2}$ and $60 \\times 10^9\\text{ N m}^{-2}$]',
    options: [
      '$8.0 \\times 10^7\\text{ N m}^{-2}$',
      '$1.2 \\times 10^6\\text{ N m}^{-2}$',
      '$0.2 \\times 10^6\\text{ N m}^{-2}$',
      '$1.8 \\times 10^6\\text{ N m}^{-2}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Since the wires are connected in series and have identical cross-sectional areas ($A$), the stress ($\\sigma$) is identical in both wires:
$$\\sigma = \\frac{F}{A}$$

Elongation in steel: $\\Delta L_s = \\frac{\\sigma L}{Y_s}$
Elongation in brass: $\\Delta L_b = \\frac{\\sigma L}{Y_b}$

Total elongation:
$$\\Delta L = \\Delta L_s + \\Delta L_b = \\sigma L \\left(\\frac{1}{Y_s} + \\frac{1}{Y_b}\\right)$$

Given $\\Delta L = 0.2\\text{ mm} = 0.2 \\times 10^{-3}\\text{ m}$ and $L = 1\\text{ m}$:
$$0.2 \\times 10^{-3} = \\sigma (1) \\left(\\frac{1}{120 \\times 10^9} + \\frac{1}{60 \\times 10^9}\\right) = \\sigma \\left(\\frac{3}{120 \\times 10^9}\\right) = \\sigma \\left(\\frac{1}{40 \\times 10^9}\\right)$$
$$\\sigma = 0.2 \\times 10^{-3} \\times 40 \\times 10^9 = 8 \\times 10^6\\text{ Pa} = 8.0 \\times 10^7\\text{ N m}^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 26,
    exam: 'JEE Main 2019 (10 Apr, Shift 2)',
    question: 'The elastic limit of brass is $379\\text{ MPa}$. The minimum diameter of a brass rod if it is to support a $400\\text{ N}$ load without exceeding its elastic limit will be:',
    options: ['$1.00\\text{ mm}$', '$1.36\\text{ mm}$', '$1.16\\text{ mm}$', '$0.90\\text{ mm}$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Tensile stress must not exceed the elastic limit $\\sigma_{\\text{max}} = 379\\text{ MPa} = 379 \\times 10^6\\text{ N m}^{-2}$:
$$\\text{Stress} = \\frac{F}{A} = \\frac{4F}{\\pi d^2} \\le \\sigma_{\\text{max}}$$
$$d^2 \\ge \\frac{4F}{\\pi \\sigma_{\\text{max}}} = \\frac{4 \\times 400}{\\pi \\times 379 \\times 10^6} = \\frac{1600}{1.1906 \\times 10^9} \\approx 1.3438 \\times 10^{-6}\\text{ m}^2$$
$$d \\ge \\sqrt{1.3438 \\times 10^{-6}} \\approx 1.159 \\times 10^{-3}\\text{ m} \\approx 1.16\\text{ mm}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'JEE Main 2020 (09 Jan, Shift 1)',
    question: 'A body of mass $m = 10\\text{ kg}$ is attached to one end of a wire of length $0.3\\text{ m}$. What is the maximum angular speed (in $\\text{rad s}^{-1}$) with which it can be rotated about its other end in a space station without breaking the wire? [Breaking stress of wire $\\sigma = 4.8 \\times 10^7\\text{ N m}^{-2}$ and area of cross-section of the wire $= 10^{-2}\\text{ cm}^2$]',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 4,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['27'],
    solution: `The tension in the rotating wire provides the necessary centripetal force:
$$T = m \\omega^2 L$$

Maximum allowable tension before breaking:
$$T_{\\text{max}} = \\sigma_{\\text{max}} \\times A$$

Given:
- $\\sigma = 4.8 \\times 10^7\\text{ N m}^{-2}$
- $A = 10^{-2}\\text{ cm}^2 = 10^{-6}\\text{ m}^2$
- $m = 10\\text{ kg}$
- $L = 0.3\\text{ m}$

$$T_{\\text{max}} = (4.8 \\times 10^7) \\times 10^{-6} = 48\\text{ N}$$

Equating to centripetal force:
$$m \\omega^2 L = 48 \\implies (10) \\omega^2 (0.3) = 48$$
$$3 \\omega^2 = 48 \\implies \\omega^2 = 16 \\implies \\omega = 4\\text{ rad s}^{-1}$$

The maximum angular speed is 4.`
  },
  {
    qNum: 28,
    exam: 'JEE Main 2020 (09 Jan, Shift 2)',
    question: 'Two steel wires having same length are suspended from a ceiling under the same load. If the ratio of their energy stored per unit volume is $1 : 4$, the ratio of their diameters is:',
    options: ['$\\sqrt{2} : 1$', '$1 : 2$', '$2 : 1$', '$1 : \\sqrt{2}$'],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Energy stored per unit volume is:
$$u = \\frac{1}{2} \\frac{\\text{Stress}^2}{Y}$$

Since stress $\\sigma = \\frac{F}{A} = \\frac{F}{\\frac{\\pi}{4} d^2} \\propto \\frac{1}{d^2}$, we have:
$$u \\propto \\sigma^2 \\propto \\frac{1}{d^4}$$

Given $\\frac{u_1}{u_2} = \\frac{1}{4}$:
$$\\frac{u_1}{u_2} = \\left(\\frac{d_2}{d_1}\\right)^4 = \\frac{1}{4} \\implies \\frac{d_1}{d_2} = 4^{1/4} = (2^2)^{1/4} = 2^{1/2} = \\sqrt{2}$$

Therefore:
$$\\frac{d_1}{d_2} = \\frac{\\sqrt{2}}{1} \\implies d_1 : d_2 = \\sqrt{2} : 1$$

Hence, the correct option is (A).`
  },
  {
    qNum: 29,
    exam: 'JEE Main 2020 (04 Sep, Shift 2)',
    question: 'A cube of metal is subjected to a hydrostatic pressure $4\\text{ GPa}$. The percentage change in the length of the side of the cube is close to: (Given bulk modulus of metal, $B = 8 \\times 10^{10}\\text{ Pa}$)',
    options: ['$5$', '$6$', '$0.9$', '$1.67$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is given by:
$$B = -\\frac{\\Delta P}{\\Delta V / V} \\implies \\left|\\frac{\\Delta V}{V}\\right| = \\frac{\\Delta P}{B}$$

For a cube of side $L$, volume is $V = L^3$:
$$\\frac{\\Delta V}{V} = 3 \\frac{\\Delta L}{L} \\implies \\frac{\\Delta L}{L} = \\frac{1}{3} \\frac{\\Delta P}{B}$$

Given:
- $\\Delta P = 4\\text{ GPa} = 4 \\times 10^9\\text{ Pa}$
- $B = 8 \\times 10^{10}\\text{ Pa}$

$$\\frac{\\Delta L}{L} = \\frac{1}{3} \\times \\frac{4 \\times 10^9}{8 \\times 10^{10}} = \\frac{1}{3} \\times \\frac{1}{20} = \\frac{1}{60}$$

Percentage change in the length:
$$\\%\\text{ change} = \\frac{\\Delta L}{L} \\times 100\\% = \\frac{100}{60}\\% = \\frac{5}{3}\\% \\approx 1.67\\%$$

Hence, the correct option is (D).`
  },
  {
    qNum: 30,
    exam: 'JEE Main 2021 (24 Feb, Shift 1)',
    question: '$Y$, $K$ and $\\eta$ are the values of Young\'s modulus, bulk modulus and modulus of rigidity of any material respectively. Choose the correct relation for these parameters:',
    options: [
      '$Y = \\frac{9K\\eta}{3K - \\eta}$',
      '$\\eta = \\frac{3YK}{9K + Y}$',
      '$K = \\frac{\\eta Y}{9\\eta - 3Y}$',
      '$Y = \\frac{9K\\eta}{2\\eta + 3K}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The standard relation connecting Young's modulus ($Y$), Bulk modulus ($K$), and shear modulus ($\\eta$) is:
$$\\frac{9}{Y} = \\frac{1}{K} + \\frac{3}{\\eta}$$

Rearranging to express $K$:
$$\\frac{1}{K} = \\frac{9}{Y} - \\frac{3}{\\eta} = \\frac{9\\eta - 3Y}{Y\\eta}$$
$$K = \\frac{Y\\eta}{9\\eta - 3Y}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 31,
    exam: 'JEE Main 2021 (24 Feb, Shift 2)',
    question: 'A uniform metallic wire is elongated by $0.04\\text{ m}$ when subjected to a linear force $F$. The elongation, if its length and diameter is doubled and subjected to the same force will be ________ $\\text{cm}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 2,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{\\pi (d/2)^2 Y} = \\frac{4FL}{\\pi d^2 Y} \\propto \\frac{L}{d^2}$$

When both length and diameter are doubled:
$$\\Delta L\' = \\Delta L \\times \\left(\\frac{2L}{L}\\right) \\times \\left(\\frac{d}{2d}\\right)^2 = \\Delta L \\times 2 \\times \\frac{1}{4} = \\frac{\\Delta L}{2}$$

Given initial elongation $\\Delta L = 0.04\\text{ m}$:
$$\\Delta L\' = \\frac{0.04\\text{ m}}{2} = 0.02\\text{ m} = 2\\text{ cm}$$

The answer is 2.`
  },
  {
    qNum: 32,
    exam: 'JEE Main 2021 (26 Feb, Shift 1)',
    question: 'The normal density of a material is $\\rho$ and its bulk modulus of elasticity is $K$. The magnitude of increase in density of material, when a pressure $P$ is applied uniformly on all sides, will be:',
    options: ['$\\frac{PK}{\\rho}$', '$\\frac{\\rho P}{K}$', '$\\frac{\\rho K}{P}$', '$\\frac{K}{\\rho P}$'],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Density is defined as:
$$\\rho = \\frac{M}{V}$$
Taking logarithms and differentiating:
$$\\ln\\rho = \\ln M - \\ln V \\implies \\frac{d\\rho}{\\rho} = -\\frac{dV}{V}$$

From definition of bulk modulus:
$$K = -\\frac{P}{dV/V} \\implies -\\frac{dV}{V} = \\frac{P}{K}$$

Substituting:
$$\\frac{d\\rho}{\\rho} = \\frac{P}{K} \\implies d\\rho = \\frac{\\rho P}{K}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 33,
    exam: 'JEE Main 2021 (26 Feb, Shift 2)',
    question: 'The length of metallic wire is $l_1$ when tension in it is $T_1$. It is $l_2$ when the tension is $T_2$. The original length of the wire will be:',
    options: [
      '$\\frac{T_1 l_1 + T_2 l_2}{T_1 + T_2}$',
      '$\\frac{l_1 + l_2}{2}$',
      '$\\frac{T_2 l_1 - T_1 l_2}{T_2 - T_1}$',
      '$\\frac{T_1 l_1 - T_2 l_2}{T_2 - T_1}$'
    ],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the original natural length of the wire be $l_0$.
According to Hooke's Law:
$$T_1 = k (l_1 - l_0)$$
$$T_2 = k (l_2 - l_0)$$

Dividing the two equations:
$$\\frac{T_1}{T_2} = \\frac{l_1 - l_0}{l_2 - l_0}$$
$$T_1 (l_2 - l_0) = T_2 (l_1 - l_0)$$
$$T_1 l_2 - T_1 l_0 = T_2 l_1 - T_2 l_0$$
$$(T_2 - T_1) l_0 = T_2 l_1 - T_1 l_2$$
$$l_0 = \\frac{T_2 l_1 - T_1 l_2}{T_2 - T_1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 34,
    exam: 'JEE Main 2021 (17 Mar, Shift 2)',
    question: 'An object is located at $2\\text{ km}$ beneath the surface of the water. If the fractional compression $\\frac{\\Delta V}{V}$ is $1.36\\%$, the ratio of hydraulic stress to the corresponding hydraulic strain will be ________ [Given: density of water is $1000\\text{ kg m}^{-3}$ and $g = 9.8\\text{ m s}^{-2}$]:',
    options: [
      '$1.96 \\times 10^9\\text{ N m}^{-2}$',
      '$1.44 \\times 10^7\\text{ N m}^{-2}$',
      '$2.26 \\times 10^9\\text{ N m}^{-2}$',
      '$1.44 \\times 10^9\\text{ N m}^{-2}$'
    ],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `The ratio of hydraulic stress to hydraulic strain is the bulk modulus:
$$B = \\frac{\\text{Hydraulic Stress}}{\\text{Hydraulic Strain}} = \\frac{P}{\\Delta V / V}$$

Hydraulic stress (gauge pressure) at depth $h = 2\\text{ km} = 2000\\text{ m}$:
$$P = h \\rho g = 2000 \\times 1000 \\times 9.8 = 1.96 \\times 10^7\\text{ N m}^{-2}$$

Hydraulic strain:
$$\\frac{\\Delta V}{V} = 1.36\\% = 1.36 \\times 10^{-2}$$

Bulk modulus:
$$B = \\frac{1.96 \\times 10^7}{1.36 \\times 10^{-2}} \\approx 1.441 \\times 10^9\\text{ N m}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 35,
    exam: 'JEE Main 2021 (18 Mar, Shift 1)',
    question: 'Two separate wires $A$ and $B$ are stretched by $2\\text{ mm}$ and $4\\text{ mm}$ respectively, when they are subjected to a force of $2\\text{ N}$. Assume that both the wires are made up of same material and the radius of wire $B$ is 4 times that of the radius of wire $A$. The length of the wires $A$ and $B$ are in the ratio of $a : b$. Then $\\frac{a}{b}$ can be expressed as $\\frac{1}{z}$, where $z$ is ________.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 32,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{\\pi r^2 Y} \\implies L = \\frac{\\pi Y}{F} (r^2 \\Delta L)$$

For wire $A$:
$$L_A = \\frac{\\pi Y}{F} (r_A^2 \\times 2)$$

For wire $B$, with $r_B = 4 r_A$ and $\\Delta L_B = 4\\text{ mm}$:
$$L_B = \\frac{\\pi Y}{F} ((4r_A)^2 \\times 4) = \\frac{\\pi Y}{F} (16 r_A^2 \\times 4) = \\frac{\\pi Y}{F} (64 r_A^2)$$

Ratio of lengths $\\frac{a}{b} = \\frac{L_A}{L_B}$:
$$\\frac{a}{b} = \\frac{2 r_A^2}{64 r_A^2} = \\frac{2}{64} = \\frac{1}{32}$$

Comparing with $\\frac{1}{z}$, we find $z = 32$.`
  },
  {
    qNum: 36,
    exam: 'JEE Main 2021 (20 Jul, Shift 1)',
    question: 'The value of tension in a long thin metal wire has been changed from $T_1$ to $T_2$. The lengths of the metal wire at two different values of tension $T_1$ and $T_2$ are $l_1$ and $l_2$, respectively. The actual length of the metal wire is:',
    options: [
      '$\\frac{T_1 l_2 - T_2 l_1}{T_1 - T_2}$',
      '$\\frac{T_1 l_1 - T_2 l_2}{T_1 - T_2}$',
      '$\\frac{l_1 + l_2}{2}$',
      '$\\sqrt{T_1 T_2 l_1 l_2}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Let the actual length of the wire be $l_0$.
By Hooke's Law:
$$l_1 = l_0 + \\frac{T_1 l_0}{A Y} \\implies l_1 - l_0 = \\frac{T_1 l_0}{A Y}$$
$$l_2 = l_0 + \\frac{T_2 l_0}{A Y} \\implies l_2 - l_0 = \\frac{T_2 l_0}{A Y}$$

Dividing the two relations:
$$\\frac{l_1 - l_0}{l_2 - l_0} = \\frac{T_1}{T_2}$$
$$T_2 l_1 - T_2 l_0 = T_1 l_2 - T_1 l_0$$
$$(T_1 - T_2) l_0 = T_1 l_2 - T_2 l_1$$
$$l_0 = \\frac{T_1 l_2 - T_2 l_1}{T_1 - T_2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 37,
    exam: 'JEE Main 2021 (20 Jul, Shift 2)',
    question: 'The length of a metal wire is $l_1$ when the tension in it is $T_1$ and is $l_2$ when the tension is $T_2$. The natural length of the wire is:',
    options: [
      '$\\frac{l_1 T_1 - l_2 T_2}{T_1 - T_2}$',
      '$\\frac{l_1 T_2 - l_2 T_1}{T_2 - T_1}$',
      '$\\frac{l_1 T_2 + l_2 T_1}{T_1 + T_2}$',
      '$\\frac{l_1 + l_2}{2}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `From Hooke's Law, extension is proportional to tension:
$$\\frac{l_1 - l_0}{l_2 - l_0} = \\frac{T_1}{T_2}$$
$$T_2 l_1 - T_2 l_0 = T_1 l_2 - T_1 l_0$$
$$(T_2 - T_1) l_0 = l_1 T_2 - l_2 T_1$$
$$l_0 = \\frac{l_1 T_2 - l_2 T_1}{T_2 - T_1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 38,
    exam: 'JEE Main 2021 (22 Jul, Shift 1)',
    question: 'The area of cross-section of a railway track is $0.01\\text{ m}^2$. The temperature variation is $10^{\\circ}\\text{C}$. Coefficient of linear expansion of material of track is $10^{-5}/^{\\circ}\\text{C}$. The energy stored per meter in the track is ________ $\\text{J m}^{-1}$. (Young\'s modulus of material of track is $10^{11}\\text{ N m}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 5,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Thermal strain prevented in the rail track:
$$\\text{Strain} = \\alpha \\Delta T = 10^{-5} \\times 10 = 10^{-4}$$

Energy stored per unit volume:
$$u = \\frac{1}{2} Y (\\text{strain})^2 = \\frac{1}{2} \\times 10^{11} \\times (10^{-4})^2 = \\frac{1}{2} \\times 10^{11} \\times 10^{-8} = 500\\text{ J m}^{-3}$$

Energy stored per unit length:
$$\\frac{U}{L} = u \\times A = 500 \\times 0.01 = 5\\text{ J m}^{-1}$$

The answer is 5.`
  },
  {
    qNum: 39,
    exam: 'JEE Main 2021 (25 Jul, Shift 1)',
    question: 'Two wires of same length and radius are joined end to end and loaded. The Young\'s moduli of the materials of the two wires are $Y_1$ and $Y_2$. The combination behaves as a single wire, then its Young\'s modulus is:',
    options: [
      '$Y = \\frac{2Y_1 Y_2}{3(Y_1 + Y_2)}$',
      '$Y = \\frac{2Y_1 Y_2}{Y_1 + Y_2}$',
      '$Y = \\frac{Y_1 Y_2}{2(Y_1 + Y_2)}$',
      '$Y = \\frac{Y_1 Y_2}{Y_1 + Y_2}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `For series combination of two identical-length wires ($L_1 = L_2 = L$) and same cross-section ($A$):
The total length of the combination is $2L$.
Under tensile load $F$:
$$\\Delta L_{\\text{total}} = \\Delta L_1 + \\Delta L_2$$
$$\\frac{F (2L)}{A Y} = \\frac{F L}{A Y_1} + \\frac{F L}{A Y_2}$$
$$\\frac{2}{Y} = \\frac{1}{Y_1} + \\frac{1}{Y_2} = \\frac{Y_1 + Y_2}{Y_1 Y_2}$$
$$Y = \\frac{2 Y_1 Y_2}{Y_1 + Y_2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 40,
    exam: 'JEE Main 2021 (27 Jul, Shift 1)',
    question: 'A stone of mass $20\\text{ g}$ is projected from a rubber catapult of length $0.1\\text{ m}$ and area of cross section $10^{-6}\\text{ m}^2$ stretched by an amount $0.04\\text{ m}$. The velocity of the projected stone is ________ $\\text{m s}^{-1}$. (Young\'s modulus of rubber $= 0.5 \\times 10^9\\text{ N m}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 20,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `By conservation of mechanical energy:
$$\\text{Elastic Potential Energy} = \\text{Kinetic Energy}$$
$$\\frac{1}{2} \\frac{Y A (\\Delta L)^2}{L} = \\frac{1}{2} m v^2$$

Given:
- $Y = 0.5 \\times 10^9\\text{ N m}^{-2}$
- $A = 10^{-6}\\text{ m}^2$
- $\\Delta L = 0.04\\text{ m}$
- $L = 0.1\\text{ m}$
- $m = 20\\text{ g} = 0.02\\text{ kg}$

$$\\frac{(0.5 \\times 10^9) (10^{-6}) (0.04)^2}{0.1} = 0.02 v^2$$
$$\\frac{500 \\times 1.6 \\times 10^{-3}}{0.1} = 0.02 v^2$$
$$\\frac{0.8}{0.1} = 8 = 0.02 v^2$$
$$v^2 = \\frac{8}{0.02} = 400 \\implies v = 20\\text{ m s}^{-1}$$

The velocity is 20.`
  },
  {
    qNum: 41,
    exam: 'JEE Main 2021 (26 Aug, Shift 2)',
    question: 'Two blocks of masses $3\\text{ kg}$ and $5\\text{ kg}$ are connected by a metal wire going over a smooth pulley. The breaking stress of the metal is $\\frac{24}{\\pi} \\times 10^2\\text{ N m}^{-2}$. What is the minimum radius of the wire? (take $g = 10\\text{ m s}^{-2}$)',
    options: ['$1250\\text{ cm}$', '$1.25\\text{ cm}$', '$125\\text{ cm}$', '$12.5\\text{ cm}$'],
    correct_option: 3,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['41'],
    solution: `Tension in the string connecting the two blocks over a smooth pulley:
$$T = \\frac{2 m_1 m_2}{m_1 + m_2} g = \\frac{2 \\times 3 \\times 5}{3 + 5} \\times 10 = \\frac{300}{8} = 37.5\\text{ N}$$

Given breaking stress $\\sigma = \\frac{24}{\\pi} \\times 10^2\\text{ N m}^{-2}$:
$$\\text{Stress} = \\frac{T}{\\pi r^2} \\le \\sigma$$
$$\\frac{37.5}{\\pi r^2} = \\frac{24}{\\pi} \\times 10^2$$
$$r^2 = \\frac{37.5}{2400} = \\frac{1}{64}\\text{ m}^2$$
$$r = \\frac{1}{8}\\text{ m} = 0.125\\text{ m} = 12.5\\text{ cm}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 42,
    exam: 'JEE Main 2021 (27 Aug, Shift 2)',
    question: 'Wires $W_1$ and $W_2$ are made of same material having the breaking stress of $1.25 \\times 10^9\\text{ N m}^{-2}$. $W_1$ and $W_2$ have cross-sectional area of $8 \\times 10^{-7}\\text{ m}^2$ and $4 \\times 10^{-7}\\text{ m}^2$, respectively. Masses of $20\\text{ kg}$ and $10\\text{ kg}$ hang from them as shown in the figure. The maximum mass that can be placed in the pan without breaking the wires is ________ $\\text{kg}$. (Use $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 40,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['42'],
    solution: `Maximum allowable tension in wire 1:
$$T_{1,\\text{max}} = \\sigma \\times A_1 = (1.25 \\times 10^9) \\times (8 \\times 10^{-7}) = 1000\\text{ N}$$

Maximum allowable tension in wire 2:
$$T_{2,\\text{max}} = \\sigma \\times A_2 = (1.25 \\times 10^9) \\times (4 \\times 10^{-7}) = 500\\text{ N}$$

Let $M$ be the mass placed in the pan.
Tension in wire 2 supports the pan and $10\\text{ kg}$ mass:
$$T_2 = (10 + M)g \\le 500\\text{ N} \\implies (10 + M)(10) \\le 500 \\implies 10 + M \\le 50 \\implies M \\le 40\\text{ kg}$$

Tension in wire 1 supports all masses:
$$T_1 = (20 + 10 + M)g = (30 + M)(10) \\le 1000\\text{ N} \\implies 30 + M \\le 100 \\implies M \\le 70\\text{ kg}$$

To prevent both wires from breaking, the maximum mass that can be added is the smaller limit:
$$M_{\\text{max}} = 40\\text{ kg}$$

The answer is 40.`
  },
  {
    qNum: 43,
    exam: 'JEE Main 2021 (31 Aug, Shift 1)',
    question: 'A uniform heavy rod of weight $10\\text{ kg m s}^{-2}$, cross-sectional area $100\\text{ cm}^2$ and length $20\\text{ cm}$ is hanging from a fixed support. Young\'s modulus of the material of the rod is $2 \\times 10^{11}\\text{ N m}^{-2}$. Neglecting the lateral contraction, find the elongation of rod due to its own weight:',
    options: [
      '$5 \\times 10^{-10}\\text{ m}$',
      '$4 \\times 10^{-11}\\text{ m}$',
      '$5 \\times 10^{-8}\\text{ m}$',
      '$5 \\times 10^{-9}\\text{ m}$'
    ],
    correct_option: 0,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation of a uniform rod due to its own weight is:
$$\\Delta L = \\frac{W L}{2 A Y}$$

Given:
- Weight $W = 10\\text{ N}$
- Length $L = 20\\text{ cm} = 0.2\\text{ m}$
- Area $A = 100\\text{ cm}^2 = 100 \\times 10^{-4}\\text{ m}^2 = 10^{-2}\\text{ m}^2$
- $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$

Substituting values:
$$\\Delta L = \\frac{10 \\times 0.2}{2 \\times 10^{-2} \\times (2 \\times 10^{11})} = \\frac{2}{4 \\times 10^9} = 0.5 \\times 10^{-9}\\text{ m} = 5 \\times 10^{-10}\\text{ m}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 44,
    exam: 'JEE Main 2021 (31 Aug, Shift 1)',
    question: 'When a rubber ball is taken to a depth of ________ $\\text{m}$ in deep sea, its volume decreases by $0.5\\%$. (The bulk modulus of rubber $= 9.8 \\times 10^8\\text{ N m}^{-2}$, Density of sea water $= 10^3\\text{ kg m}^{-3}$, $g = 9.8\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 500,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `From definition of Bulk modulus:
$$B = \\frac{\\Delta P}{\\Delta V / V} = \\frac{\\rho g h}{\\Delta V / V}$$

Given:
- $B = 9.8 \\times 10^8\\text{ N m}^{-2}$
- $\\frac{\\Delta V}{V} = 0.5\\% = \\frac{0.5}{100} = 5 \\times 10^{-3}$
- $\\rho = 10^3\\text{ kg m}^{-3}$
- $g = 9.8\\text{ m s}^{-2}$

$$h = \\frac{B (\\Delta V / V)}{\\rho g} = \\frac{(9.8 \\times 10^8) \\times (5 \\times 10^{-3})}{10^3 \\times 9.8} = \\frac{9.8 \\times 5 \\times 10^5}{9.8 \\times 10^3} = 500\\text{ m}$$

The depth is 500.`
  },
  {
    qNum: 45,
    exam: 'JEE Main 2021 (31 Aug, Shift 2)',
    question: 'Four identical hollow cylindrical columns of mild steel support a big structure of mass $50 \\times 10^3\\text{ kg}$. The inner and outer radii of each column are $50\\text{ cm}$ and $100\\text{ cm}$ respectively. Assuming uniform local distribution, calculate the compression strain of each column. [use $Y = 2.0 \\times 10^{11}\\text{ Pa}$, $g = 9.8\\text{ m s}^{-2}$]',
    options: [
      '$1.87 \\times 10^{-7}$',
      '$2.60 \\times 10^{-7}$',
      '$3.60 \\times 10^{-8}$',
      '$7.07 \\times 10^{-4}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Total compressive force on all 4 columns:
$$F_{\\text{total}} = M g = 50 \\times 10^3 \\times 9.8 = 4.9 \\times 10^5\\text{ N}$$

Force on each column:
$$F = \\frac{F_{\\text{total}}}{4} = \\frac{4.9 \\times 10^5}{4} = 1.225 \\times 10^5\\text{ N}$$

Cross-sectional area of one hollow column:
$$A = \\pi (r_2^2 - r_1^2) = \\pi (1.0^2 - 0.5^2) = \\pi (1 - 0.25) = 0.75\\pi\\text{ m}^2 \\approx 2.356\\text{ m}^2$$

Compressive strain:
$$\\text{Strain} = \\frac{F}{A Y} = \\frac{1.225 \\times 10^5}{0.75\\pi \\times 2.0 \\times 10^{11}} = \\frac{1.225 \\times 10^5}{1.5\\pi \\times 10^{11}} \\approx 2.60 \\times 10^{-7}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 46,
    exam: 'JEE Main 2022 (24 Jun, Shift 1)',
    question: 'The bulk modulus of a liquid is $3 \\times 10^{10}\\text{ N m}^{-2}$. The pressure required to reduce the volume of liquid by $2\\%$ is:',
    options: [
      '$3 \\times 10^8\\text{ N m}^{-2}$',
      '$6 \\times 10^8\\text{ N m}^{-2}$',
      '$9 \\times 10^8\\text{ N m}^{-2}$',
      '$1.5 \\times 10^8\\text{ N m}^{-2}$'
    ],
    correct_option: 1,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Bulk modulus is:
$$B = \\frac{\\Delta P}{\\Delta V / V} \\implies \\Delta P = B \\left(\\frac{\\Delta V}{V}\\right)$$

Given:
- $B = 3 \\times 10^{10}\\text{ N m}^{-2}$
- $\\frac{\\Delta V}{V} = 2\\% = 0.02$

$$\\Delta P = (3 \\times 10^{10}) \\times 0.02 = 6 \\times 10^8\\text{ N m}^{-2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 47,
    exam: 'JEE Main 2022 (26 Jun, Shift 1)',
    question: 'The elastic behaviour of material for linear stress and linear strain is shown in the figure. The energy density for a linear strain of $5 \\times 10^{-4}$ is ________ $\\text{kJ m}^{-3}$. Assume that material is elastic upto the linear strain of $5 \\times 10^{-4}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 25,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: diagramUrls['47'],
    solution: `From the given linear graph:
At strain $= 10^{-4}$, stress $= 20\\text{ MPa}$.
At strain $= 5 \\times 10^{-4}$, the corresponding stress is:
$$\\text{Stress} = 5 \\times 20\\text{ MPa} = 100\\text{ MPa} = 100 \\times 10^6\\text{ N m}^{-2}$$

Energy density:
$$u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} \\times (100 \\times 10^6) \\times (5 \\times 10^{-4})$$
$$u = 2.5 \\times 10^4\\text{ J m}^{-3} = 25\\text{ kJ m}^{-3}$$

The answer is 25.`
  },
  {
    qNum: 48,
    exam: 'JEE Main 2022 (29 Jun, Shift 1)',
    question: 'A wire of length $L$ is hanging from a fixed support. The length changes to $L_1$ and $L_2$ when masses $1\\text{ kg}$ and $2\\text{ kg}$ are suspended respectively from its free end. Then the value of $L$ is equal to:',
    options: ['$\\sqrt{L_1 L_2}$', '$\\frac{L_1 + L_2}{2}$', '$2L_1 - L_2$', '$3L_1 - 2L_2$'],
    correct_option: 2,
    question_type: 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `By Hooke's Law:
$$L_1 - L = \\frac{(1) g L}{A Y} = k$$
$$L_2 - L = \\frac{(2) g L}{A Y} = 2k$$

Multiplying the first equation by 2:
$$2(L_1 - L) = 2k = L_2 - L$$
$$2L_1 - 2L = L_2 - L$$
$$L = 2L_1 - L_2$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'JEE Main 2022 (25 Jul, Shift 1)',
    question: 'A wire of length $L$ and radius $r$ is clamped rigidly at one end. When the other end of the wire is pulled by a force $F$, its length increases by $5\\text{ cm}$. Another wire of the same material of length $4L$ and radius $4r$ is pulled by a force $4F$ under same conditions. The increase in length of this wire is ________ $\\text{cm}$.',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 5,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation is given by:
$$\\Delta L = \\frac{F L}{\\pi r^2 Y}$$

For the first wire:
$$\\Delta L_1 = \\frac{F L}{\\pi r^2 Y} = 5\\text{ cm}$$

For the second wire:
$$\\Delta L_2 = \\frac{(4F)(4L)}{\\pi (4r)^2 Y} = \\frac{16 F L}{16 \\pi r^2 Y} = \\frac{F L}{\\pi r^2 Y} = 5\\text{ cm}$$

The increase in length is 5.`
  },
  {
    qNum: 50,
    exam: 'JEE Main 2022 (26 Jul, Shift 2)',
    question: 'A uniform heavy rod of mass $20\\text{ kg}$, cross-sectional area $0.4\\text{ m}^2$ and length $20\\text{ m}$ is hanging from a fixed support. Neglecting the lateral contraction, the elongation in the rod due to its own weight is $x \\times 10^{-9}\\text{ m}$. The value of $x$ is ________. (Given: Young\'s modulus $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$ and $g = 10\\text{ m s}^{-2}$)',
    options: [],
    correct_option: null,
    question_type: 'numerical',
    numeric_answer: 25,
    numerical_tolerance: 0.01,
    marks: 4,
    difficulty: 'medium',
    image_url: null,
    solution: `Elongation of a rod due to its own weight:
$$\\Delta L = \\frac{M g L}{2 A Y}$$

Given:
- $M = 20\\text{ kg}$
- $g = 10\\text{ m s}^{-2}$
- $L = 20\\text{ m}$
- $A = 0.4\\text{ m}^2$
- $Y = 2 \\times 10^{11}\\text{ N m}^{-2}$

$$\\Delta L = \\frac{20 \\times 10 \\times 20}{2 \\times 0.4 \\times (2 \\times 10^{11})} = \\frac{4000}{1.6 \\times 10^{11}} = 2500 \\times 10^{-11} = 25 \\times 10^{-9}\\text{ m}$$

Comparing with $x \\times 10^{-9}\\text{ m}$, we get $x = 25$.`
  }
];
