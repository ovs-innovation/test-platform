import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const GRAVITATION_PYQ_PART3 = [
  {
    qNum: 61,
    exam: 'AIPMT 2005',
    question: 'For a satellite moving in an orbit around the earth, the ratio of kinetic energy to potential energy is:',
    options: ['$1/2$', '$1/\\sqrt{2}$', '$2$', '$\\sqrt{2}$'],
    correct_option: 0, // A
    solution: `For a satellite of mass $m$ orbiting Earth of mass $M$ in a circular orbit of radius $r$:
Kinetic energy:
$$K = \\frac{GMm}{2r}$$

Gravitational potential energy:
$$U = -\\frac{GMm}{r}$$

The magnitude ratio of kinetic energy to potential energy is:
$$\\left|\\frac{K}{U}\\right| = \\frac{\\frac{GMm}{2r}}{\\frac{GMm}{r}} = \\frac{1}{2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 62,
    exam: 'AIPMT 2004',
    question: 'The density of a newly discovered planet is twice that of earth. The acceleration due to gravity at the surface of the planet is equal to that at the surface of the earth. If the radius of the earth is $R$, the radius of the planet would be:',
    options: ['$2R$', '$4R$', '$\\frac{1}{4}R$', '$\\frac{1}{2}R$'],
    correct_option: 3, // D
    solution: `The acceleration due to gravity on the surface of a planet is given in terms of mean density $\\rho$ and radius $R$ by:
$$g = \\frac{GM}{R^2} = \\frac{G}{R^2}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right) = \\frac{4}{3}\\pi G \\rho R$$
$$g \\propto \\rho R$$

Given that $g_p = g_e$:
$$\\rho_p R_p = \\rho_e R_e$$

Given $\\rho_p = 2\\rho_e$ and $R_e = R$:
$$2\\rho_e R_p = \\rho_e R \\implies R_p = \\frac{1}{2}R$$

Hence, the correct option is (D).`
  },
  {
    qNum: 63,
    exam: 'AIPMT 2003',
    question: 'Two spheres of masses $m$ and $M$ are situated in air and the gravitational force between them is $F$. The space around the masses is now filled with a liquid of specific gravity 3. The gravitational force will now be:',
    options: ['$3F$', '$F$', '$F/3$', '$F/9$'],
    correct_option: 1, // B
    solution: `According to Newton\'s universal law of gravitation, the gravitational attraction between two point masses $M$ and $m$ separated by distance $r$ is:
$$F = \\frac{GMm}{r^2}$$
Gravitational force is independent of the intervening medium between the two masses.
Therefore, filling the space around the masses with a liquid of specific gravity 3 does not alter the gravitational force, which remains $F$.

Hence, the correct option is (B).`
  },
  {
    qNum: 64,
    exam: 'AIPMT 2003',
    question: 'The acceleration due to gravity on the planet A is 9 times the acceleration due to gravity on planet B. A man jumps to a height of $2\\text{ m}$ on the surface of A. What is the height of jump by the same person on the planet B?',
    options: ['$(2/9)\\text{ m}$', '$18\\text{ m}$', '$6\\text{ m}$', '$(2/3)\\text{ m}$'],
    correct_option: 1, // B
    solution: `The maximum height reached in a vertical jump with initial takeoff velocity $u$ is:
$$h = \\frac{u^2}{2g} \\implies h \\propto \\frac{1}{g}$$
assuming the same takeoff speed $u$ (same jumping effort).

Therefore:
$$\\frac{h_B}{h_A} = \\frac{g_A}{g_B}$$

Given $g_A = 9g_B$ and $h_A = 2\\text{ m}$:
$$h_B = 9 \\times h_A = 9 \\times 2\\text{ m} = 18\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 65,
    exam: 'AIPMT 2002',
    question: 'A body of mass $m$ is placed on earth\'s surface which is taken from earth surface to a height of $h = 3R$, then change in gravitational potential energy is:',
    options: ['$\\frac{mgR}{4}$', '$\\frac{2}{3}mgR$', '$\\frac{3}{4}mgR$', '$\\frac{mgR}{2}$'],
    correct_option: 2, // C
    solution: `The change in gravitational potential energy when an object of mass $m$ is raised from Earth\'s surface to height $h$ is:
$$\\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$

Given $h = 3R$:
$$\\Delta U = \\frac{mg(3R)}{1 + \\frac{3R}{R}} = \\frac{3mgR}{1 + 3} = \\frac{3}{4}mgR$$

Hence, the correct option is (C).`
  },
  {
    qNum: 66,
    exam: 'AIPMT 2001',
    question: 'With what velocity should a particle be projected so that its height becomes equal to radius of earth?',
    options: [
      '$\\left(\\frac{GM}{R}\\right)^{1/2}$',
      '$\\left(\\frac{8GM}{R}\\right)^{1/2}$',
      '$\\left(\\frac{2GM}{R}\\right)^{1/2}$',
      '$\\left(\\frac{4GM}{R}\\right)^{1/2}$'
    ],
    correct_option: 0, // A
    solution: `Let the particle be projected with velocity $v$ from the Earth\'s surface ($r_1 = R$).
At maximum height $h = R$, the final velocity is zero ($v_f = 0$), and distance from the centre of Earth is $r_2 = R + R = 2R$.

By conservation of mechanical energy:
$$E_i = E_f$$
$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{2R}$$
$$\\frac{1}{2}m v^2 = \\frac{GMm}{R} - \\frac{GMm}{2R} = \\frac{GMm}{2R}$$
$$v^2 = \\frac{GM}{R} \\implies v = \\left(\\frac{GM}{R}\\right)^{1/2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 67,
    exam: 'AIPMT 2000',
    question: 'For a planet having mass equal to mass of the earth but radius is one fourth of radius of the earth. Then escape velocity for this planet will be:',
    options: ['$11.2\\text{ km/sec}$', '$22.4\\text{ km/sec}$', '$5.6\\text{ km/sec}$', '$44.8\\text{ km/sec.}$'],
    correct_option: 1, // B
    solution: `Escape velocity from a planet is given by:
$$v_e = \\sqrt{\\frac{2GM}{R}}$$

For Earth:
$$v_{e,\\text{earth}} = \\sqrt{\\frac{2GM_e}{R_e}} = 11.2\\text{ km/s}$$

For the planet with $M_p = M_e$ and $R_p = \\frac{R_e}{4}$:
$$v_{e,\\text{planet}} = \\sqrt{\\frac{2GM_e}{R_e/4}} = \\sqrt{4} \\times \\sqrt{\\frac{2GM_e}{R_e}} = 2 \\times 11.2\\text{ km/s} = 22.4\\text{ km/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 68,
    exam: 'AIPMT 2000',
    question: 'A body of weight $72\\text{ N}$ moves from the surface of earth at a height half of the radius of earth, then gravitational force exerted on it will be:',
    options: ['$36\\text{ N}$', '$32\\text{ N}$', '$144\\text{ N}$', '$50\\text{ N}$'],
    correct_option: 1, // B
    solution: `The gravitational force on a body at height $h$ is:
$$W_h = W \\left(\\frac{R}{R+h}\\right)^2$$

Given $W = 72\\text{ N}$ and $h = \\frac{R}{2}$:
$$R + h = R + \\frac{R}{2} = \\frac{3R}{2}$$
$$W_h = 72 \\times \\left(\\frac{R}{3R/2}\\right)^2 = 72 \\times \\left(\\frac{2}{3}\\right)^2 = 72 \\times \\frac{4}{9} = 8 \\times 4 = 32\\text{ N}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 69,
    exam: 'AIPMT 1999',
    question: 'The escape velocity of a sphere of mass $m$ is given by ($G = \\text{universal gravitational constant}$, $M_e = \\text{mass of earth}$ and $R_e = \\text{radius of earth}$):',
    options: [
      '$\\sqrt{\\frac{GM_e}{R_e}}$',
      '$\\sqrt{\\frac{2GM_e}{R_e}}$',
      '$\\sqrt{\\frac{2Gm}{R_e}}$',
      '$\\frac{GM_e}{R_e^2}$'
    ],
    correct_option: 1, // B
    solution: `Escape velocity from the surface of Earth is obtained from energy conservation:
$$\\frac{1}{2}m v_e^2 - \\frac{GM_e m}{R_e} = 0$$
$$v_e = \\sqrt{\\frac{2GM_e}{R_e}}$$

Notice that $v_e$ depends on the mass and radius of the Earth, and does not depend on the mass $m$ of the escaping sphere.

Hence, the correct option is (B).`
  },
  {
    qNum: 70,
    exam: 'AIPMT 1997',
    question: 'The escape velocity of a body on the surface of the earth is $11.2\\text{ km/s}$. If the earth\'s mass increases to twice its present value and radius of the earth becomes half, the escape velocity becomes:',
    options: ['$22.4\\text{ km/s}$', '$44.8\\text{ km/s}$', '$5.6\\text{ km/s}$', '$11.2\\text{ km/s}$'],
    correct_option: 0, // A
    solution: `Escape velocity is:
$$v_e = \\sqrt{\\frac{2GM}{R}}$$

Given new mass $M\' = 2M$ and new radius $R\' = R/2$:
$$v_e\' = \\sqrt{\\frac{2G(2M)}{R/2}} = \\sqrt{\\frac{4 \\times 2GM}{R}} = 2\\sqrt{\\frac{2GM}{R}} = 2 v_e$$
$$v_e\' = 2 \\times 11.2\\text{ km/s} = 22.4\\text{ km/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 71,
    exam: 'AIPMT 1997',
    question: 'The period of revolution of planet $A$ around the sun is 8 times that of $B$. The distance of $A$ from the sun is how many times greater than that of $B$ from the sun?',
    options: ['$4$', '$5$', '$2$', '$3$'],
    correct_option: 0, // A
    solution: `According to Kepler\'s Third Law:
$$T^2 \\propto r^3 \\implies \\left(\\frac{r_A}{r_B}\\right)^3 = \\left(\\frac{T_A}{T_B}\\right)^2$$

Given $T_A = 8 T_B$:
$$\\left(\\frac{r_A}{r_B}\\right)^3 = (8)^2 = 64$$
$$\\frac{r_A}{r_B} = (64)^{1/3} = 4$$

Thus, the distance of $A$ from the Sun is 4 times that of $B$.

Hence, the correct option is (A).`
  },
  {
    qNum: 72,
    exam: 'AIPMT 1996',
    question: 'What will be the formula of mass of the earth in terms of $g$, $R$ and $G$?',
    options: ['$G\\frac{R}{g}$', '$g\\frac{R^2}{G}$', '$g^2\\frac{R}{G}$', '$G\\frac{g}{R}$'],
    correct_option: 1, // B
    solution: `The acceleration due to gravity on the surface of the Earth is:
$$g = \\frac{GM}{R^2}$$

Rearranging the formula to solve for the mass of the Earth $M$:
$$M = \\frac{gR^2}{G} = g\\frac{R^2}{G}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 73,
    exam: 'AIPMT 1996',
    question: 'A ball is dropped from a spacecraft revolving around the earth at a height of 120 km. What will happen to the ball?',
    options: [
      'it will fall down to the earth gradually',
      'it will go very far in the space',
      'it will continue to move with the same speed along the original orbit of spacecraft',
      'it will move with the same speed, tangentially to the spacecraft'
    ],
    correct_option: 2, // C
    solution: `When a ball is gently dropped from a spacecraft in orbit, it initially has the exact same orbital velocity and orbital radius as the spacecraft.
The gravitational pull of the Earth provides exactly the required centripetal acceleration:
$$g_{\\text{orbit}} = \\frac{v^2}{r}$$
Therefore, the ball will continue to move in the same circular orbit with the same orbital speed alongside the spacecraft.

Hence, statement (C) is correct.`
  },
  {
    qNum: 74,
    exam: 'AIPMT 1995',
    question: 'The acceleration due to gravity $g$ and mean density of the earth $\\rho$ are related by which of the following relations? (where $G$ is the gravitational constant and $R$ is the radius of the earth.)',
    options: [
      '$\\rho = \\frac{3g}{4\\pi GR}$',
      '$\\rho = \\frac{3g}{4\\pi GR^3}$',
      '$\\rho = \\frac{4\\pi gR^2}{3G}$',
      '$\\rho = \\frac{4\\pi gR^3}{3G}$'
    ],
    correct_option: 0, // A
    solution: `The acceleration due to gravity is:
$$g = \\frac{GM}{R^2}$$

Assuming Earth is a uniform sphere of radius $R$ and mean density $\\rho$, its mass is:
$$M = \\frac{4}{3}\\pi R^3 \\rho$$

Substituting $M$ into the formula for $g$:
$$g = \\frac{G}{R^2} \\left(\\frac{4}{3}\\pi R^3 \\rho\\right) = \\frac{4}{3}\\pi G \\rho R$$

Solving for density $\\rho$:
$$\\rho = \\frac{3g}{4\\pi GR}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 75,
    exam: 'AIPMT 1995',
    question: 'Two particles of equal mass go around a circle of radius $R$ under the action of their mutual gravitational attraction. The speed $v$ of each particle is:',
    options: [
      '$\\frac{1}{2}\\sqrt{\\frac{Gm}{R}}$',
      '$\\sqrt{\\frac{4Gm}{R}}$',
      '$\\frac{1}{2R}\\sqrt{\\frac{1}{Gm}}$',
      '$\\sqrt{\\frac{Gm}{R}}$'
    ],
    correct_option: 0, // A
    solution: `Two particles, each of mass $m$, revolve around their common centre of mass in a circle of radius $R$.
The particles are diametrically opposite, so the distance between them is $2R$.

The mutual gravitational attraction between them is:
$$F = \\frac{G m \\cdot m}{(2R)^2} = \\frac{G m^2}{4R^2}$$

This gravitational force provides the necessary centripetal force for each particle of mass $m$ revolving in radius $R$:
$$\\frac{m v^2}{R} = \\frac{G m^2}{4R^2}$$
$$v^2 = \\frac{Gm}{4R}$$
$$v = \\frac{1}{2}\\sqrt{\\frac{Gm}{R}}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 76,
    exam: 'AIPMT 1995',
    question: 'The earth (mass $= 6 \\times 10^{24}\\text{ kg}$) revolves around the sun with an angular velocity of $2 \\times 10^{-7}\\text{ rad/s}$ in a circular orbit of radius $1.5 \\times 10^8\\text{ km}$. The force exerted by the sun on the earth, in newton, is:',
    options: ['$36 \\times 10^{21}$', '$27 \\times 10^{39}$', 'zero', '$18 \\times 10^{25}$'],
    correct_option: 0, // A
    solution: `Given:
Mass of Earth $m = 6 \\times 10^{24}\\text{ kg}$
Angular velocity $\\omega = 2 \\times 10^{-7}\\text{ rad/s}$
Orbital radius $r = 1.5 \\times 10^8\\text{ km} = 1.5 \\times 10^{11}\\text{ m}$

The centripetal force exerted by the Sun on the Earth is:
$$F = m \\omega^2 r$$
$$F = (6 \\times 10^{24}) \\times (2 \\times 10^{-7})^2 \\times (1.5 \\times 10^{11})$$
$$F = 6 \\times 10^{24} \\times 4 \\times 10^{-14} \\times 1.5 \\times 10^{11}$$
$$F = (6 \\times 4 \\times 1.5) \\times 10^{24 - 14 + 11} = 36 \\times 10^{21}\\text{ N}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 77,
    exam: 'AIPMT 1994',
    question: 'The radius of earth is about 6400 km and that of mars is 3200 km. The mass of the earth is about 10 times mass of mars. An object weighs 200 N on the surface of earth. Its weight on the surface of mars will be:',
    options: ['$20\\text{ N}$', '$8\\text{ N}$', '$80\\text{ N}$', '$40\\text{ N}$'],
    correct_option: 2, // C
    solution: `The acceleration due to gravity on the surface of a planet is:
$$g = \\frac{GM}{R^2}$$

The ratio of acceleration due to gravity on Mars to that on Earth is:
$$\\frac{g_m}{g_e} = \\left(\\frac{M_m}{M_e}\\right) \\left(\\frac{R_e}{R_m}\\right)^2$$

Given $M_e = 10 M_m \\implies \\frac{M_m}{M_e} = \\frac{1}{10}$, and $R_e = 6400\\text{ km}, R_m = 3200\\text{ km} \\implies \\frac{R_e}{R_m} = 2$:
$$\\frac{g_m}{g_e} = \\frac{1}{10} \\times (2)^2 = \\frac{4}{10} = 0.4$$

The weight of the object on Mars is:
$$W_m = m g_m = W_e \\left(\\frac{g_m}{g_e}\\right) = 200\\text{ N} \\times 0.4 = 80\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 78,
    exam: 'AIPMT 1994',
    question: 'The distance of two planets from the sun are $10^{13}\\text{ m}$ and $10^{12}\\text{ m}$ respectively. The ratio of time periods of the planets is:',
    options: ['$\\sqrt{10}$', '$10\\sqrt{10}$', '$10$', '$\\frac{1}{\\sqrt{10}}$'],
    correct_option: 1, // B
    solution: `According to Kepler\'s Third Law of planetary motion:
$$T^2 \\propto r^3 \\implies \\frac{T_1}{T_2} = \\left(\\frac{r_1}{r_2}\\right)^{3/2}$$

Given $r_1 = 10^{13}\\text{ m}$ and $r_2 = 10^{12}\\text{ m}$:
$$\\frac{r_1}{r_2} = \\frac{10^{13}}{10^{12}} = 10$$
$$\\frac{T_1}{T_2} = (10)^{3/2} = 10\\sqrt{10}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 79,
    exam: 'AIPMT 1994',
    question: 'If the gravitational force between two objects were proportional to $1/R$ (and not as $1/R^2$), where $R$ is the distance between them, then a particle in a circular path (under such a force) would have its orbital speed $v$, proportional to:',
    options: ['$R$', '$R^0$ (independent of $R$)', '$1/R^2$', '$1/R$'],
    correct_option: 1, // B
    solution: `If the gravitational force is given by $F \\propto \\frac{1}{R}$, then:
$$F = \\frac{k}{R}$$
where $k$ is a constant of proportionality.

This force provides the necessary centripetal force for a circular orbit of radius $R$:
$$\\frac{m v^2}{R} = \\frac{k}{R}$$
$$m v^2 = k$$
$$v = \\sqrt{\\frac{k}{m}}$$

Since $k$ and $m$ are constants, the orbital speed $v$ is constant and completely independent of $R$:
$$v \\propto R^0$$

Hence, the correct option is (B).`
  },
  {
    qNum: 80,
    exam: 'AIPMT 1993',
    question: 'The escape velocity from earth is $11.2\\text{ km/s}$. If a body is to be projected in a direction making an angle $45^\\circ$ to the vertical, then the escape velocity is:',
    options: ['$11.2 \\times 2\\text{ km/s}$', '$11.2\\text{ km/s}$', '$11.2/\\sqrt{2}\\text{ km/s}$', '$11.2\\sqrt{2}\\text{ km/s}$'],
    correct_option: 1, // B
    solution: `Escape velocity is obtained from energy conservation considerations:
$$\\frac{1}{2}m v_e^2 - \\frac{GMm}{R} = 0 \\implies v_e = \\sqrt{\\frac{2GM}{R}}$$
Energy is a scalar quantity, so the minimum speed required to escape the Earth\'s gravitational field depends only on the gravitational potential at the point of projection and is independent of the angle of projection.

Therefore, projecting at an angle of $45^\\circ$ to the vertical requires the same escape velocity:
$$v_e = 11.2\\text{ km/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 81,
    exam: 'AIPMT 1993',
    question: 'A satellite $A$ of mass $m$ is at a distance of $r$ from the surface of the earth. Another satellite $B$ of mass $2m$ is at a distance of $2r$ from the earth\'s centre. Their time periods are in the ratio of:',
    options: ['$1 : 2$', '$1 : 16$', '$1 : 32$', '$1 : 2\\sqrt{2}$'],
    correct_option: 3, // D
    solution: `By Kepler\'s Third Law of planetary motion, the square of the time period is directly proportional to the cube of the orbital radius:
$$T^2 \\propto r_{\\text{orbit}}^3 \\implies \\frac{T_A}{T_B} = \\left(\\frac{r_A}{r_B}\\right)^{3/2}$$

For satellite $A$, the orbital radius is $r_A = r$, and for satellite $B$, $r_B = 2r$:
$$\\frac{T_A}{T_B} = \\left(\\frac{r}{2r}\\right)^{3/2} = \\left(\\frac{1}{2}\\right)^{3/2} = \\frac{1}{2\\sqrt{2}} = 1 : 2\\sqrt{2}$$

Note that the time period of revolution depends solely on the orbital radius and is independent of the mass of the satellite.

Hence, the correct option is (D).`
  },
  {
    qNum: 82,
    exam: 'AIPMT 1992',
    question: 'The mean radius of earth is $R$, its angular speed on its own axis is $\\omega$ and the acceleration due to gravity at earth\'s surface is $g$. What will be the radius of the orbit of a geostationary satellite?',
    options: [
      '$(R^2 g / \\omega^2)^{1/3}$',
      '$(R g / \\omega^2)^{1/3}$',
      '$(R^2 \\omega^2 / g)^{1/3}$',
      '$(R^2 g / \\omega)^{1/3}$'
    ],
    correct_option: 0, // A
    solution: `A geostationary satellite has an angular velocity equal to that of the Earth rotating on its axis, $\\omega$.
The gravitational attraction provides the required centripetal force:
$$\\frac{GMm}{r^2} = m \\omega^2 r$$
$$r^3 = \\frac{GM}{\\omega^2}$$

At the surface of the Earth, acceleration due to gravity is:
$$g = \\frac{GM}{R^2} \\implies GM = g R^2$$

Substituting $GM = g R^2$:
$$r^3 = \\frac{g R^2}{\\omega^2}$$
$$r = \\left(\\frac{R^2 g}{\\omega^2}\\right)^{1/3}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 83,
    exam: 'AIPMT 1991',
    question: 'The satellite of mass $m$ is orbiting around the earth in a circular orbit with a velocity $v$. What will be its total energy?',
    options: ['$(3/4)mv^2$', '$(1/2)mv^2$', '$mv^2$', '$-\\frac{1}{2}mv^2$'],
    correct_option: 3, // D
    solution: `For a satellite of mass $m$ moving in a circular orbit of radius $r$ with speed $v$:
$$\\frac{mv^2}{r} = \\frac{GMm}{r^2} \\implies \\frac{GMm}{r} = mv^2$$

The kinetic energy of the satellite is:
$$K = \\frac{1}{2}mv^2$$

The gravitational potential energy is:
$$U = -\\frac{GMm}{r} = -mv^2$$

The total mechanical energy $E$ is:
$$E = K + U = \\frac{1}{2}mv^2 - mv^2 = -\\frac{1}{2}mv^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 84,
    exam: 'AIPMT 1990',
    question: 'A planet is moving in an elliptical orbit around the sun. If $T, V, E$ and $L$ stand respectively for its kinetic energy, gravitational potential energy, total energy and magnitude of angular momentum about the centre of force, which of the following is correct?',
    options: [
      '$T$ is conserved',
      '$V$ is always positive',
      '$E$ is always negative',
      '$L$ is conserved but direction of vector $L$ changes continuously'
    ],
    correct_option: 2, // C
    solution: `1. For a closed, bound planetary orbit (ellipse) under attractive inverse-square gravitational force, the total mechanical energy is negative:
$$E = -\\frac{GMm}{2a} < 0$$
Thus, $E$ is always negative and constant.

2. Kinetic energy $T$ and potential energy $V$ both vary with distance from the Sun as the planet travels between perihelion and aphelion.
3. The torque on the planet about the Sun is $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$, so the angular momentum vector $\\vec{L}$ is strictly conserved in both magnitude and direction.

Hence, statement (C) is correct.`
  },
  {
    qNum: 85,
    exam: 'AIPMT 1989',
    question: 'If the gravitational force between two objects were proportional to $1/R$ (and not as $1/R^2$), where $R$ is the distance between them, then a particle in a circular path (under such a force) would have its orbital speed $v$, proportional to:',
    options: ['$R$', '$R^0$ (independent of $R$)', '$1/R^2$', '$1/R$'],
    correct_option: 1, // B
    solution: `If the gravitational force obeys $F = \\frac{k}{R}$, then for circular motion of radius $R$:
$$\\frac{m v^2}{R} = \\frac{k}{R}$$
$$v^2 = \\frac{k}{m} = \\text{constant}$$
$$v \\propto R^0$$

The orbital speed is independent of the orbital radius $R$.

Hence, the correct option is (B).`
  },
  {
    qNum: 86,
    exam: 'AIPMT 1989',
    question: 'For a satellite escape velocity is $11\\text{ km/s}$. If the satellite is launched at an angle of $60^\\circ$ with the vertical, then escape velocity will be:',
    options: ['$11\\text{ km/s}$', '$11\\sqrt{3}\\text{ km/s}$', '$\\frac{11}{\\sqrt{3}}\\text{ km/s}$', '$33\\text{ km/s}$'],
    correct_option: 0, // A
    solution: `Escape velocity is determined purely by energy conservation:
$$v_e = \\sqrt{\\frac{2GM}{R}}$$
Because energy is a scalar quantity, the minimum speed required to escape the gravitational field is completely independent of the angle of launch.

Therefore, whether launched vertically or at $60^\\circ$ to the vertical, the escape velocity remains:
$$v_e = 11\\text{ km/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 87,
    exam: 'AIPMT 1988',
    question: 'The distance of two planets from the sun are $10^{13}\\text{ m}$ and $10^{12}\\text{ m}$ respectively. The ratio of time periods of the planets is:',
    options: ['$\\sqrt{10}$', '$10\\sqrt{10}$', '$10$', '$\\frac{1}{\\sqrt{10}}$'],
    correct_option: 1, // B
    solution: `By Kepler\'s Third Law:
$$T^2 \\propto r^3 \\implies \\frac{T_1}{T_2} = \\left(\\frac{r_1}{r_2}\\right)^{3/2}$$

Given $r_1 = 10^{13}\\text{ m}$ and $r_2 = 10^{12}\\text{ m}$:
$$\\frac{T_1}{T_2} = \\left(\\frac{10^{13}}{10^{12}}\\right)^{3/2} = (10)^{3/2} = 10\\sqrt{10}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 88,
    exam: 'AIPMT 1988',
    question: 'The largest and the shortest distance of the earth from the sun are $r_1$ and $r_2$. Its distance from the sun when it is at perpendicular to the major-axis of the orbit drawn from the sun is:',
    options: ['$\\frac{r_1 + r_2}{4}$', '$\\frac{r_1 + r_2}{r_1 - r_2}$', '$\\frac{2r_1 r_2}{r_1 + r_2}$', '$\\frac{r_1 + r_2}{3}$'],
    correct_option: 2, // C
    solution: `In an elliptical orbit with the Sun at one focus:
The maximum distance (aphelion) is:
$$r_1 = a(1 + e)$$
The minimum distance (perihelion) is:
$$r_2 = a(1 - e)$$

The distance of the planet from the Sun when the line from the Sun is perpendicular to the major axis is the semi-latus rectum $l$:
$$l = \\frac{b^2}{a} = \\frac{a^2(1 - e^2)}{a} = a(1 - e^2)$$

Now, note that:
$$r_1 + r_2 = a(1 + e) + a(1 - e) = 2a \\implies a = \\frac{r_1 + r_2}{2}$$
$$r_1 r_2 = a(1 + e) \\cdot a(1 - e) = a^2(1 - e^2) = a \\cdot l$$

Therefore:
$$l = \\frac{r_1 r_2}{a} = \\frac{r_1 r_2}{\\frac{r_1 + r_2}{2}} = \\frac{2r_1 r_2}{r_1 + r_2}$$

Hence, the correct option is (C).`
  }
];

