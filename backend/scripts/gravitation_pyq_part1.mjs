import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'Two planets $P_1$ and $P_2$ with equal mass have radii $R_1$ and $R_2$, respectively, where $R_2 = \\frac{R_1}{2}$. The escape speeds of $P_1$ and $P_2$ are $v_1$ and $v_2$, respectively. Then $\\frac{v_2}{v_1}$ is:',
    options: ['$2$', '$\\frac{1}{\\sqrt{2}}$', '$1$', '$\\sqrt{2}$'],
    correct_option: 3, // D
    solution: `The escape velocity from the surface of a spherical planet of mass $M$ and radius $R$ is given by:
$$v_e = \\sqrt{\\frac{2GM}{R}}$$

Since both planets have equal mass ($M_1 = M_2 = M$):
$$v_e \\propto \\frac{1}{\\sqrt{R}}$$

Therefore, the ratio of escape speeds is:
$$\\frac{v_2}{v_1} = \\sqrt{\\frac{R_1}{R_2}}$$

Given $R_2 = \\frac{R_1}{2}$:
$$\\frac{v_2}{v_1} = \\sqrt{\\frac{R_1}{R_1 / 2}} = \\sqrt{2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: 'In a solar system, the time-period of revolution of a planet tracing a circular orbit of radius $R$ is proportional to:',
    options: ['$R^3$', '$R^{1/2}$', '$R^{3/2}$', '$R^2$'],
    correct_option: 2, // C
    solution: `According to Kepler's Third Law of planetary motion (law of periods), the square of the time period of revolution $T$ of a planet around the Sun is directly proportional to the cube of the radius $R$ of its circular orbit:
$$T^2 \\propto R^3$$

Taking the square root on both sides:
$$T \\propto R^{3/2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: 'The amount of work done to raise a mass \'$m$\' from the surface of the Earth to a height equal to the radius of the Earth \'$R$\' will be:',
    options: ['$2mgR$', '$mg\\frac{R}{4}$', '$mgR$', '$mg\\frac{R}{2}$'],
    correct_option: 3, // D
    solution: `The work done $W$ in raising a mass $m$ to a height $h$ from the surface of Earth is equal to the change in gravitational potential energy:
$$W = \\Delta U = U_f - U_i$$

Where:
$$U_i = -\\frac{GMm}{R}$$
$$U_f = -\\frac{GMm}{R + h}$$

Therefore:
$$W = -\\frac{GMm}{R + h} - \\left(-\\frac{GMm}{R}\\right) = GMm\\left(\\frac{1}{R} - \\frac{1}{R + h}\\right) = \\frac{GMm h}{R(R + h)}$$

Given that height $h = R$:
$$W = \\frac{GMm R}{R(R + R)} = \\frac{GMm}{2R}$$

Since $g = \\frac{GM}{R^2} \\implies GM = gR^2$:
$$W = \\frac{m(gR^2)}{2R} = \\frac{1}{2}mgR = mg\\frac{R}{2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 4,
    exam: 'NEET 2025',
    question: 'The radius of Martian orbit around the Sun is about 4 times the radius of the orbit of Mercury. The Martian year is 687 Earth days. Then which of the following is the length of 1 year on Mercury?',
    options: ['$172\\text{ earth days}$', '$124\\text{ earth days}$', '$88\\text{ earth days}$', '$225\\text{ earth days}$'],
    correct_option: 2, // C
    solution: `According to Kepler's Third Law:
$$T^2 \\propto R^3 \\implies \\frac{T_{Mercury}}{T_{Mars}} = \\left(\\frac{R_{Mercury}}{R_{Mars}}\\right)^{3/2}$$

Given that $R_{Mars} = 4 R_{Mercury}$ and $T_{Mars} = 687\\text{ Earth days}$:
$$\\frac{T_{Mercury}}{687} = \\left(\\frac{1}{4}\\right)^{3/2} = \\frac{1}{(4^{1/2})^3} = \\frac{1}{2^3} = \\frac{1}{8}$$

$$T_{Mercury} = \\frac{687}{8} = 85.875\\text{ Earth days} \\approx 88\\text{ earth days}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 5,
    exam: 'NEET 2025',
    question: 'A body weighs 48 N on the surface of the earth. The gravitational force experienced by the body due to the earth at a height equal to one-third the radius of the earth from its surface is:',
    options: ['$32\\text{ N}$', '$36\\text{ N}$', '$16\\text{ N}$', '$27\\text{ N}$'],
    correct_option: 3, // D
    solution: `The acceleration due to gravity at a height $h$ above the Earth's surface is:
$$g' = g\\left(\\frac{R}{R + h}\\right)^2$$

Given $h = \\frac{R}{3}$:
$$g' = g\\left(\\frac{R}{R + R/3}\\right)^2 = g\\left(\\frac{R}{4R/3}\\right)^2 = g\\left(\\frac{3}{4}\\right)^2 = \\frac{9}{16}g$$

The weight (gravitational force) of the body at height $h$ is:
$$W' = m g' = \\frac{9}{16} mg = \\frac{9}{16} W$$

Given weight on the surface $W = 48\\text{ N}$:
$$W' = \\frac{9}{16} \\times 48 = 9 \\times 3 = 27\\text{ N}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'The escape velocity for earth is $v$. A planet having 9 times mass that of earth and radius, 16 times that of earth, has the escape velocity of:',
    options: ['$\\frac{v}{3}$', '$\\frac{2v}{3}$', '$\\frac{3v}{4}$', '$\\frac{9v}{4}$'],
    correct_option: 2, // C
    solution: `The escape velocity from the surface of Earth is:
$$v = \\sqrt{\\frac{2GM_e}{R_e}}$$

For the planet with mass $M_p = 9 M_e$ and radius $R_p = 16 R_e$:
$$v_p = \\sqrt{\\frac{2G M_p}{R_p}} = \\sqrt{\\frac{2G(9M_e)}{16R_e}} = \\sqrt{\\frac{9}{16}} \\sqrt{\\frac{2GM_e}{R_e}} = \\frac{3}{4}v$$

Hence, the correct option is (C).`
  },
  {
    qNum: 7,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'An object of mass $100\\text{ kg}$ falls from point $A$ to $B$ as shown in figure. The change in its weight, corrected to the nearest integer is ($R_e$ is the radius of the earth):',
    image_url: diagramUrls['7'],
    options: ['$49\\text{ N}$', '$89\\text{ N}$', '$5\\text{ N}$', '$10\\text{ N}$'],
    correct_option: 0, // A
    solution: `From the diagram:
Point $A$ is at an altitude of $h_A = 2R_e$ from the Earth's surface:
$$r_A = R_e + 2R_e = 3R_e$$

Point $B$ is located at a distance of $R_e / 2$ below point $A$, so its altitude from the surface is:
$$h_B = 2R_e - \\frac{R_e}{2} = \\frac{3}{2}R_e = 1.5R_e$$
$$r_B = R_e + 1.5R_e = 2.5R_e = \\frac{5}{2}R_e$$

The acceleration due to gravity at distances $r_A$ and $r_B$ from the centre of the Earth:
$$g_A = \\frac{GM_e}{r_A^2} = \\frac{GM_e}{(3R_e)^2} = \\frac{g}{9}$$
$$g_B = \\frac{GM_e}{r_B^2} = \\frac{GM_e}{\\left(\\frac{5}{2}R_e\\right)^2} = \\frac{4}{25}g$$

Change in weight:
$$\\Delta W = m(g_B - g_A) = m g\\left(\\frac{4}{25} - \\frac{1}{9}\\right) = 100 \\times 10 \\times \\left(\\frac{36 - 25}{225}\\right)$$
$$\\Delta W = 1000 \\times \\frac{11}{225} = \\frac{11000}{225} \\approx 48.89\\text{ N} \\approx 49\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 8,
    exam: 'NEET 2024',
    question: 'The mass of a planet is $\\frac{1}{10}\\text{th}$ that of the earth and its diameter is half that of the earth. The acceleration due to gravity on that planet is:',
    options: ['$19.6\\text{ m s}^{-2}$', '$9.8\\text{ m s}^{-2}$', '$4.9\\text{ m s}^{-2}$', '$3.92\\text{ m s}^{-2}$'],
    correct_option: 3, // D
    solution: `The acceleration due to gravity on the surface of a planet is:
$$g = \\frac{GM}{R^2}$$

Given:
$$M_p = \\frac{M_e}{10},\\quad D_p = \\frac{D_e}{2} \\implies R_p = \\frac{R_e}{2}$$

Therefore:
$$g_p = g_e \\times \\left(\\frac{M_p}{M_e}\\right) \\times \\left(\\frac{R_e}{R_p}\\right)^2$$
$$g_p = 9.8 \\times \\left(\\frac{1}{10}\\right) \\times (2)^2 = 9.8 \\times \\frac{4}{10} = 3.92\\text{ m s}^{-2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 9,
    exam: 'NEET 2024',
    question: 'The minimum energy required to launch a satellite of mass $m$ from the surface of earth of mass $M$ and radius $R$ in a circular orbit at an altitude of $2R$ from the surface of the earth is:',
    options: ['$\\frac{5GmM}{6R}$', '$\\frac{2GmM}{3R}$', '$\\frac{GmM}{2R}$', '$\\frac{GmM}{3R}$'],
    correct_option: 0, // A
    solution: `Initial mechanical energy of the satellite at rest on the Earth's surface:
$$E_i = -\\frac{GmM}{R}$$

The satellite is launched into a circular orbit at altitude $h = 2R$, so orbital radius is:
$$r = R + 2R = 3R$$

Total mechanical energy of the satellite in the circular orbit:
$$E_f = -\\frac{GmM}{2r} = -\\frac{GmM}{2(3R)} = -\\frac{GmM}{6R}$$

The minimum energy required to launch the satellite:
$$\\Delta E = E_f - E_i = -\\frac{GmM}{6R} - \\left(-\\frac{GmM}{R}\\right) = \\frac{GmM}{R}\\left(1 - \\frac{1}{6}\\right) = \\frac{5GmM}{6R}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 10,
    exam: 'NEET 2023 Manipur',
    question: 'The escape velocity of a body on the earth surface is $11.2\\text{ km/s}$. If the same body is projected upward with velocity $22.4\\text{ km/s}$, the velocity of this body at infinite distance from the centre of the earth will be:',
    options: ['$11.2\\sqrt{2}\\text{ km/s}$', 'Zero', '$11.2\\text{ km/s}$', '$11.2\\sqrt{3}\\text{ km/s}$'],
    correct_option: 3, // D
    solution: `By the law of conservation of mechanical energy:
$$E_i = E_f$$
$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = \\frac{1}{2}m v_\\infty^2 + 0$$

Since the escape velocity from Earth is $v_e = \\sqrt{\\frac{2GM}{R}} \\implies \\frac{GM}{R} = \\frac{1}{2}v_e^2$:
$$\\frac{1}{2}m v^2 - \\frac{1}{2}m v_e^2 = \\frac{1}{2}m v_\\infty^2$$
$$v_\\infty^2 = v^2 - v_e^2$$

Given $v = 22.4\\text{ km/s} = 2 v_e$:
$$v_\\infty^2 = (2v_e)^2 - v_e^2 = 4v_e^2 - v_e^2 = 3v_e^2$$
$$v_\\infty = \\sqrt{3} v_e = 11.2\\sqrt{3}\\text{ km/s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 11,
    exam: 'NEET 2023 Manipur',
    question: 'If $R$ is the radius of the earth and $g$ is the acceleration due to gravity on the earth surface. Then the mean density of the earth will be :',
    options: ['$\\frac{\\pi R G}{12 g}$', '$\\frac{3\\pi R}{4gG}$', '$\\frac{3g}{4\\pi R G}$', '$\\frac{4\\pi G}{3gR}$'],
    correct_option: 2, // C
    solution: `The acceleration due to gravity on the Earth's surface is given by:
$$g = \\frac{GM}{R^2}$$

Assuming Earth to be a sphere of uniform mean density $\\rho$:
$$M = \\frac{4}{3}\\pi R^3 \\rho$$

Substituting $M$ into the formula for $g$:
$$g = \\frac{G \\left(\\frac{4}{3}\\pi R^3 \\rho\\right)}{R^2} = \\frac{4}{3}\\pi R G \\rho$$

Solving for density $\\rho$:
$$\\rho = \\frac{3g}{4\\pi R G}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 12,
    exam: 'NEET 2023',
    question: 'Two bodies of mass $m$ and $9m$ are placed at a distance $R$. The gravitational potential on the line joining the bodies where the gravitational field equals zero, will be ($G = \\text{gravitational constant}$) :',
    options: ['$-\\frac{12Gm}{R}$', '$-\\frac{16Gm}{R}$', '$-\\frac{20Gm}{R}$', '$-\\frac{8Gm}{R}$'],
    correct_option: 1, // B
    solution: `Let the neutral point where the net gravitational field is zero be at distance $x$ from mass $m$ (and $R - x$ from mass $9m$):
$$\\frac{Gm}{x^2} = \\frac{G(9m)}{(R - x)^2}$$
$$\\frac{1}{x} = \\frac{3}{R - x} \\implies R - x = 3x \\implies 4x = R \\implies x = \\frac{R}{4}$$

Distance from mass $9m$ is:
$$R - x = R - \\frac{R}{4} = \\frac{3R}{4}$$

The gravitational potential at this neutral point is:
$$V = -\\frac{Gm}{x} - \\frac{G(9m)}{R - x}$$
$$V = -\\frac{Gm}{R/4} - \\frac{9Gm}{3R/4} = -\\frac{4Gm}{R} - \\frac{12Gm}{R} = -\\frac{16Gm}{R}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 13,
    exam: 'NEET 2023',
    question: 'A satellite is orbiting just above the surface of the earth with period $T$. If $d$ is the density of the earth and $G$ is the universal constant of gravitation, the quantity $\\frac{3\\pi}{G d}$ represents :',
    options: ['$T^2$', '$T^3$', '$\\sqrt{T}$', '$T$'],
    correct_option: 0, // A
    solution: `The orbital velocity of a satellite orbiting just above the Earth's surface ($r \\approx R$) is:
$$v_o = \\sqrt{\\frac{GM}{R}}$$

The time period of revolution is:
$$T = \\frac{2\\pi R}{v_o} = \\frac{2\\pi R}{\\sqrt{\\frac{GM}{R}}} = 2\\pi \\sqrt{\\frac{R^3}{GM}}$$

Substituting mass of the Earth in terms of density $d$ ($M = \\frac{4}{3}\\pi R^3 d$):
$$T = 2\\pi \\sqrt{\\frac{R^3}{G \\left(\\frac{4}{3}\\pi R^3 d\\right)}} = 2\\pi \\sqrt{\\frac{3}{4\\pi G d}} = \\sqrt{\\frac{4\\pi^2 \\times 3}{4\\pi G d}} = \\sqrt{\\frac{3\\pi}{G d}}$$

Squaring both sides:
$$T^2 = \\frac{3\\pi}{G d}$$

Hence, the quantity $\\frac{3\\pi}{G d}$ represents $T^2$.

Hence, the correct option is (A).`
  },
  {
    qNum: 14,
    exam: 'NEET 2022 Phase 2',
    question: 'A gravitational field is present in a region and a mass is shifted from A to B through different paths as shown. If $W_1$, $W_2$ and $W_3$ represent the work done by the gravitational force along the respective paths, then :',
    image_url: diagramUrls['14'],
    options: ['$W_1 < W_2 < W_3$', '$W_1 = W_2 = W_3$', '$W_1 > W_2 > W_3$', '$W_1 > W_3 > W_2$'],
    correct_option: 1, // B
    solution: `The gravitational force is a conservative force.
For any conservative force field, the work done in moving a mass from an initial position $A$ to a final position $B$ depends solely on the positions of the endpoints and is completely independent of the path taken:
$$W = -\\Delta U = U_A - U_B$$

Since paths 1, 2, and 3 connect the same initial point $A$ and final point $B$:
$$W_1 = W_2 = W_3$$

Hence, the correct option is (B).`
  },
  {
    qNum: 15,
    exam: 'NEET 2022 Phase 2',
    question: 'In a gravitational field, the gravitational potential is given by, $V = -\\frac{K}{x}\\text{ (J/Kg)}$. The gravitational field intensity at point $(2, 0, 3)\\text{ m}$ is:',
    options: ['$+\\frac{K}{4}$', '$+\\frac{K}{2}$', '$-\\frac{K}{2}$', '$-\\frac{K}{4}$'],
    correct_option: 3, // D
    solution: `The relationship between gravitational field intensity $E$ and gravitational potential $V$ along the $x$-axis is:
$$E_x = -\\frac{\\partial V}{\\partial x}$$

Given $V(x) = -\\frac{K}{x}$:
$$E_x = -\\frac{d}{dx}\\left(-\\frac{K}{x}\\right) = -\\left(\\frac{K}{x^2}\\right) = -\\frac{K}{x^2}$$

At point $(2, 0, 3)\\text{ m}$, $x = 2$:
$$E_x = -\\frac{K}{2^2} = -\\frac{K}{4}$$

Since $V$ does not depend on $y$ and $z$, $E_y = 0$ and $E_z = 0$.
Thus, the gravitational field intensity is $-\\frac{K}{4}$.

Hence, the correct option is (D).`
  },
  {
    qNum: 16,
    exam: 'NEET 2022 Phase 1',
    question: 'A body of mass 60 g experiences a gravitational force of 3.0 N, when placed at a particular point. The magnitude of the gravitational field intensity at that point is:',
    options: ['$0.05\\text{ N/kg}$', '$50\\text{ N/kg}$', '$20\\text{ N/kg}$', '$180\\text{ N/kg}$'],
    correct_option: 1, // B
    solution: `Given:
Mass of body, $m = 60\\text{ g} = 60 \\times 10^{-3}\\text{ kg} = 0.06\\text{ kg}$
Gravitational force, $F = 3.0\\text{ N}$

The gravitational field intensity $I$ at that point is defined as the gravitational force experienced per unit mass:
$$I = \\frac{F}{m} = \\frac{3.0\\text{ N}}{0.06\\text{ kg}} = \\frac{300}{6} = 50\\text{ N/kg}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 17,
    exam: 'NEET 2022 Phase 1',
    question: 'Match List - I with List - II:\n\nList - I:\n(a) Gravitational constant ($G$)\n(b) Gravitational potential energy\n(c) Gravitational potential\n(d) Gravitational intensity\n\nList - II:\n(i) $[L^2T^{-2}]$\n(ii) $[M^{-1}L^3T^{-2}]$\n(iii) $[LT^{-2}]$\n(iv) $[ML^2T^{-2}]$\n\nChoose the correct answer from the options given below:',
    options: [
      '(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)',
      '(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)',
      '(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)',
      '(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)'
    ],
    correct_option: 1, // B
    solution: `Dimensional analysis of each quantity:
(a) **Gravitational constant ($G$)**:
From $F = \\frac{G m_1 m_2}{r^2} \\implies G = \\frac{F r^2}{m^2}$:
$$[G] = \\frac{[MLT^{-2}][L^2]}{[M^2]} = [M^{-1}L^3T^{-2}] \\longrightarrow \\text{(ii)}$$

(b) **Gravitational potential energy**:
Energy has dimensions of work done:
$$[U] = [ML^2T^{-2}] \\longrightarrow \\text{(iv)}$$

(c) **Gravitational potential**:
Potential is potential energy per unit mass:
$$[V] = \\frac{[ML^2T^{-2}]}{[M]} = [L^2T^{-2}] \\longrightarrow \\text{(i)}$$

(d) **Gravitational intensity**:
Intensity is force per unit mass (acceleration):
$$[I] = \\frac{[MLT^{-2}]}{[M]} = [LT^{-2}] \\longrightarrow \\text{(iii)}$$

Matching: (a)-(ii), (b)-(iv), (c)-(i), (d)-(iii).

Hence, the correct option is (B).`
  },
  {
    qNum: 18,
    exam: 'NEET 2021',
    question: 'The escape velocity from the Earth\'s surface is $v$. The escape velocity from the surface of another planet having a radius, four times that of Earth and same mass density is :',
    options: ['$4v$', '$v$', '$2v$', '$3v$'],
    correct_option: 0, // A
    solution: `Escape velocity in terms of mean density $\\rho$ and radius $R$:
$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{2G\\left(\\frac{4}{3}\\pi R^3 \\rho\\right)}{R}} = R\\sqrt{\\frac{8\\pi G \\rho}{3}}$$

Therefore, for planets of the same density $\\rho$:
$$v_e \\propto R$$

Given $R_p = 4 R_e$:
$$v_p = 4 v_e = 4v$$

Hence, the correct option is (A).`
  },
  {
    qNum: 19,
    exam: 'NEET 2021',
    question: 'A particle of mass \'m\' is projected with a velocity $v = k v_e$ ($k < 1$) from the surface of the earth. ($v_e$ = escape velocity). The maximum height above the surface reached by the particle is :',
    options: ['$\\frac{R k^2}{1 - k^2}$', '$R\\left(\\frac{k}{1 - k^2}\\right)^2$', '$R\\left(\\frac{k}{1 + k^2}\\right)^2$', '$\\frac{R^2 k}{1 + k}$'],
    correct_option: 0, // A
    solution: `By conservation of mechanical energy:
$$E_i = E_f$$
$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{R + h}$$

Rearranging:
$$\\frac{1}{2}m v^2 = GMm\\left(\\frac{1}{R} - \\frac{1}{R + h}\\right) = \\frac{GMm h}{R(R + h)}$$

Since $v_e = \\sqrt{\\frac{2GM}{R}} \\implies GM = \\frac{1}{2}R v_e^2$:
$$\\frac{1}{2}m (k v_e)^2 = \\frac{m\\left(\\frac{1}{2}R v_e^2\\right) h}{R(R + h)}$$
$$k^2 = \\frac{h}{R + h}$$
$$k^2(R + h) = h \\implies k^2 R + k^2 h = h$$
$$h(1 - k^2) = R k^2 \\implies h = \\frac{R k^2}{1 - k^2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 20,
    exam: 'NEET 2020 Phase 2',
    question: 'What is the depth at which the value of acceleration due to gravity becomes $1/n$ times the value that at the surface of earth? (radius of earth $= R$)',
    options: ['$R/n$', '$R/n^2$', '$R(n - 1)/n$', '$R n/(n - 1)$'],
    correct_option: 2, // C
    solution: `The acceleration due to gravity at a depth $d$ below the Earth's surface is given by:
$$g' = g\\left(1 - \\frac{d}{R}\\right)$$

Given that $g' = \\frac{g}{n}$:
$$\\frac{g}{n} = g\\left(1 - \\frac{d}{R}\\right)$$
$$\\frac{1}{n} = 1 - \\frac{d}{R}$$
$$\\frac{d}{R} = 1 - \\frac{1}{n} = \\frac{n - 1}{n}$$
$$d = \\frac{R(n - 1)}{n}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 21,
    exam: 'NEET 2020 Phase 1',
    question: 'A body weighs 72 N on the surface of the earth. What is the gravitational force on it, at a height equal to half the radius of the earth?',
    options: ['$32\\text{ N}$', '$30\\text{ N}$', '$24\\text{ N}$', '$48\\text{ N}$'],
    correct_option: 0, // A
    solution: `The acceleration due to gravity at height $h$ above the Earth's surface is:
$$g' = g\\left(\\frac{R}{R + h}\\right)^2$$

Given $h = \\frac{R}{2}$:
$$g' = g\\left(\\frac{R}{R + R/2}\\right)^2 = g\\left(\\frac{R}{3R/2}\\right)^2 = g\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}g$$

Therefore, the weight at height $h$ is:
$$W' = mg' = \\frac{4}{9} mg = \\frac{4}{9} W$$

Given $W = 72\\text{ N}$:
$$W' = \\frac{4}{9} \\times 72 = 4 \\times 8 = 32\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 22,
    exam: 'NEET 2019 (Odisha)',
    question: 'Assuming that the gravitational potential energy of an object at infinity is zero, the change in potential energy (final - initial) of an object of mass $m$, when taken to a height $h$ from the surface of earth (of radius $R$), is given by,',
    options: [
      '$\\frac{GMm}{R + h}$',
      '$-\\frac{GMm}{R + h}$',
      '$\\frac{GMmh}{R(R + h)}$',
      '$mgh$'
    ],
    correct_option: 2, // C
    solution: `Gravitational potential energy of mass $m$ at distance $r$ from the centre of the Earth is:
$$U(r) = -\\frac{GMm}{r}$$

- Initial potential energy at the surface ($r_i = R$):
$$U_i = -\\frac{GMm}{R}$$

- Final potential energy at height $h$ ($r_f = R + h$):
$$U_f = -\\frac{GMm}{R + h}$$

The change in potential energy is:
$$\\Delta U = U_f - U_i = -\\frac{GMm}{R + h} - \\left(-\\frac{GMm}{R}\\right)$$
$$\\Delta U = GMm\\left(\\frac{1}{R} - \\frac{1}{R + h}\\right) = GMm\\left(\\frac{(R + h) - R}{R(R + h)}\\right) = \\frac{GMmh}{R(R + h)}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 23,
    exam: 'NEET 2019 (Odisha)',
    question: 'A mass falls from a height \'$h$\' and its time of fall \'$t$\' is recorded in terms of time period $T$ of a simple pendulum. On the surface of earth it is found that $t = 2T$. The entire set up is taken on the surface of another planet whose mass is half of that of earth and radius the same. Same experiment is repeated and corresponding times noted as $t\'$ and $T\'$. Then we can say:',
    options: ['$t\' = 2T\'$', '$t\' = \\sqrt{2}T\'$', '$t\' > 2T\'$', '$t\' < 2T\'$'],
    correct_option: 0, // A
    solution: `Time of free fall from height $h$:
$$t = \\sqrt{\\frac{2h}{g}}$$

Time period of a simple pendulum of length $l$:
$$T = 2\\pi \\sqrt{\\frac{l}{g}}$$

The ratio of the time of fall to the time period of the pendulum is:
$$\\frac{t}{T} = \\frac{\\sqrt{\\frac{2h}{g}}}{2\\pi\\sqrt{\\frac{l}{g}}} = \\frac{\\sqrt{2h}}{2\\pi\\sqrt{l}}$$

Notice that $g$ cancels out completely, making the ratio $\\frac{t}{T}$ completely independent of acceleration due to gravity $g$.
Therefore, on the new planet:
$$\\frac{t'}{T'} = \\frac{t}{T} = 2 \\implies t' = 2T'$$

Hence, the correct option is (A).`
  },
  {
    qNum: 24,
    exam: 'NEET 2019 (Odisha)',
    question: 'The time period of a geostationary satellite is 24 h, at a height $6R_E$ ($R_E$ is radius of earth) from surface of earth. The time period of another satellite whose height is $2.5 R_E$ from surface will be,',
    options: ['$\\frac{12}{2.5}\\text{ h}$', '$6\\sqrt{2}\\text{ h}$', '$12\\sqrt{2}\\text{ h}$', '$\\frac{24}{2.5}\\text{ h}$'],
    correct_option: 1, // B
    solution: `Orbital radius of the geostationary satellite:
$$r_1 = R_E + h_1 = R_E + 6R_E = 7R_E$$
Time period $T_1 = 24\\text{ h}$.

Orbital radius of the second satellite:
$$r_2 = R_E + h_2 = R_E + 2.5R_E = 3.5R_E = \\frac{r_1}{2}$$

According to Kepler's Third Law:
$$\\frac{T_2}{T_1} = \\left(\\frac{r_2}{r_1}\\right)^{3/2} = \\left(\\frac{1}{2}\\right)^{3/2} = \\frac{1}{2\\sqrt{2}}$$

$$T_2 = \\frac{T_1}{2\\sqrt{2}} = \\frac{24}{2\\sqrt{2}} = \\frac{12}{\\sqrt{2}} = 6\\sqrt{2}\\text{ h}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 25,
    exam: 'NEET 2019',
    question: 'The work done to raise a mass m from the surface of the earth to a height h, which is equal to the radius of the earth, is :',
    options: ['$mgR$', '$2mgR$', '$\\frac{1}{2}mgR$', '$\\frac{3}{2}mgR$'],
    correct_option: 2, // C
    solution: `The work done to raise a mass $m$ to a height $h$ from the Earth's surface is given by:
$$W = \\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$

Given $h = R$:
$$W = \\frac{mgR}{1 + \\frac{R}{R}} = \\frac{mgR}{1 + 1} = \\frac{1}{2}mgR$$

Hence, the correct option is (C).`
  },
  {
    qNum: 26,
    exam: 'NEET 2019',
    question: 'A body weighs 200 N on the surface of earth. How much will it weigh half way down to the centre of the earth?',
    options: ['$200\\text{ N}$', '$250\\text{ N}$', '$100\\text{ N}$', '$150\\text{ N}$'],
    correct_option: 2, // C
    solution: `The acceleration due to gravity at a depth $d$ below the Earth's surface is:
$$g' = g\\left(1 - \\frac{d}{R}\\right)$$

Halfway down to the centre of the Earth, the depth is $d = \\frac{R}{2}$:
$$g' = g\\left(1 - \\frac{R/2}{R}\\right) = g\\left(1 - \\frac{1}{2}\\right) = \\frac{g}{2}$$

Therefore, the weight of the body becomes:
$$W' = mg' = \\frac{mg}{2} = \\frac{W}{2} = \\frac{200\\text{ N}}{2} = 100\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'NEET 2018',
    question: 'The kinetic energies of a planet in an elliptical orbit about the Sun, at positions A, B and C are $K_A$, $K_B$ and $K_C$, respectively. AC is the major axis and SB is perpendicular to AC at the position of the Sun S as shown in the figure. Then:',
    image_url: diagramUrls['27'],
    options: ['$K_A < K_B < K_C$', '$K_A > K_B > K_C$', '$K_B < K_A < K_C$', '$K_B > K_A > K_C$'],
    correct_option: 1, // B
    solution: `From Kepler's laws and the conservation of angular momentum about the Sun:
$$L = m v r = \\text{constant} \\implies v = \\frac{L}{m r} \\propto \\frac{1}{r}$$

Kinetic energy is:
$$K = \\frac{1}{2}m v^2 \\propto \\frac{1}{r^2}$$

From the figure:
- $A$ is the perihelion (closest distance to the Sun $S$): $r_A$ is minimum.
- $C$ is the aphelion (farthest distance from the Sun $S$): $r_C$ is maximum.
- $B$ is at an intermediate distance:
$$r_A < r_B < r_C$$

Therefore, the speeds and kinetic energies follow:
$$v_A > v_B > v_C \\implies K_A > K_B > K_C$$

Hence, the correct option is (B).`
  },
  {
    qNum: 28,
    exam: 'NEET 2018',
    question: 'If the mass of the Sun were ten times smaller and the universal gravitational constant were ten times larger in magnitude, which of the following is not correct?',
    options: [
      'Raindrops will fall faster.',
      'Walking on the ground would become more difficult.',
      'Time period of a simple pendulum on the Earth would decrease.',
      'g on the Earth will not change.'
    ],
    correct_option: 3, // D
    solution: `The acceleration due to gravity on the Earth is:
$$g = \\frac{G M_E}{R_E^2}$$

If the universal gravitational constant $G$ increases by a factor of 10, then $g$ on Earth will also become 10 times larger ($g' = 10g$).
Consequently:
- Terminal velocity of raindrops $v_t \\propto g$, so raindrops will fall faster (True).
- Weight of a person $W = mg$ becomes 10 times larger, so walking becomes much more difficult (True).
- Time period of simple pendulum $T = 2\\pi\\sqrt{l/g}$ decreases (True).
- Statement (D) claims "$g$ on the Earth will not change", which is incorrect.

Hence, the incorrect statement is (D).`
  },
  {
    qNum: 29,
    exam: 'NEET 2017',
    question: 'The acceleration due to gravity at a height 1 km above the earth is the same as at a depth d below the surface of earth. Then:',
    options: ['$d = 1\\text{ km}$', '$d = \\frac{3}{2}\\text{ km}$', '$d = 2\\text{ km}$', '$d = \\frac{1}{2}\\text{ km}$'],
    correct_option: 2, // C
    solution: `For small heights $h \\ll R$ above the Earth's surface:
$$g_h \\approx g\\left(1 - \\frac{2h}{R}\\right)$$

At depth $d$ below the Earth's surface:
$$g_d = g\\left(1 - \\frac{d}{R}\\right)$$

Given $g_h = g_d$:
$$g\\left(1 - \\frac{2h}{R}\\right) = g\\left(1 - \\frac{d}{R}\\right)$$
$$1 - \\frac{2h}{R} = 1 - \\frac{d}{R} \\implies d = 2h$$

Given $h = 1\\text{ km}$:
$$d = 2 \\times 1\\text{ km} = 2\\text{ km}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 30,
    exam: 'NEET 2017',
    question: 'Two astronauts are floating in gravitational free space after having lost contact with their spaceship. The two will:',
    options: [
      'move towards each other.',
      'move away from each other.',
      'will become stationary.',
      'keep floating at the same distance between them.'
    ],
    correct_option: 0, // A
    solution: `In gravitational free space (no external gravitational forces), the only force acting between the two astronauts is their mutual gravitational attraction:
$$F = \\frac{G m_1 m_2}{r^2}$$

Since gravitational force is always attractive in nature, each astronaut experiences a net force directed toward the other.
By Newton's second law, this force produces an acceleration toward each other, causing them to move towards each other.

Hence, the correct option is (A).`
  }
];

