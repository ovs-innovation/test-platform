import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'NEET 2016 Phase 2',
    question: 'Starting from the centre of the earth having radius $R$, the variation of $g$ (acceleration due to gravity) is shown by:',
    options: [
      { text: '', image_url: diagramUrls['31_opt_a'] },
      { text: '', image_url: diagramUrls['31_opt_b'] },
      { text: '', image_url: diagramUrls['31_opt_c'] },
      { text: '', image_url: diagramUrls['31_opt_d'] }
    ],
    correct_option: 1, // B
    solution: `Inside the Earth ($r \\le R$), the acceleration due to gravity is given by:
$$g_{\\text{in}} = \\frac{GM}{R^3}r \\implies g_{\\text{in}} \\propto r$$
At the centre ($r = 0$), $g = 0$, and it increases linearly up to the surface ($r = R$).

Outside the Earth ($r \\ge R$):
$$g_{\\text{out}} = \\frac{GM}{r^2} \\implies g_{\\text{out}} \\propto \\frac{1}{r^2}$$
Hence, the graph is a straight line passing through the origin up to $r = R$, and then decreases hyperbolically as $1/r^2$.

This is correctly shown in option (B).`
  },
  {
    qNum: 32,
    exam: 'NEET 2016 Phase 2',
    question: 'A satellite of mass $m$ is orbiting the earth (of radius $R$) at a height $h$ from its surface. The total energy of the satellite in terms of $g_0$, the value of acceleration due to gravity at the earth\'s surface, is:',
    options: [
      '$\\frac{mg_0 R^2}{2(R+h)}$',
      '$-\\frac{mg_0 R^2}{2(R+h)}$',
      '$\\frac{2mg_0 R^2}{R+h}$',
      '$-\\frac{2mg_0 R^2}{R+h}$'
    ],
    correct_option: 1, // B
    solution: `The orbital radius of the satellite is $r = R + h$.
The total mechanical energy $E$ of a satellite in a circular orbit of radius $r$ is:
$$E = -\\frac{GMm}{2r} = -\\frac{GMm}{2(R+h)}$$

At the surface of Earth:
$$g_0 = \\frac{GM}{R^2} \\implies GM = g_0 R^2$$

Substituting $GM = g_0 R^2$ into the total energy equation:
$$E = -\\frac{mg_0 R^2}{2(R+h)}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 33,
    exam: 'NEET 2016 Phase 1',
    question: 'At what height from the surface of earth the gravitation potential and the value of $g$ are $-5.4 \\times 10^7\\text{ J kg}^{-1}$ and $6.0\\text{ m s}^{-2}$ respectively? Take the radius of earth as $6400\\text{ km}$.',
    options: ['$1400\\text{ km}$', '$2000\\text{ km}$', '$2600\\text{ km}$', '$1600\\text{ km}$'],
    correct_option: 2, // C
    solution: `At height $h$ from the surface of the Earth, the distance from the centre of the Earth is $r = R + h$.
The gravitational potential $V$ and acceleration due to gravity $g$ are:
$$V = -\\frac{GM}{r} = -5.4 \\times 10^7\\text{ J kg}^{-1}$$
$$g = \\frac{GM}{r^2} = 6.0\\text{ m s}^{-2}$$

Dividing the magnitude of potential by $g$:
$$\\frac{|V|}{g} = \\frac{GM/r}{GM/r^2} = r$$
$$r = \\frac{5.4 \\times 10^7}{6.0} = 0.9 \\times 10^7\\text{ m} = 9000\\text{ km}$$

Since $r = R + h$ and $R = 6400\\text{ km}$:
$$h = r - R = 9000\\text{ km} - 6400\\text{ km} = 2600\\text{ km}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 34,
    exam: 'NEET 2016 Phase 1',
    question: 'The ratio of escape velocity at earth ($v_e$) to the escape velocity at a planet ($v_p$) whose radius and mean density are twice as that of earth is:',
    options: ['$1 : 4$', '$1 : \\sqrt{2}$', '$1 : 2$', '$1 : 2\\sqrt{2}$'],
    correct_option: 3, // D
    solution: `Escape velocity from a celestial body of mass $M$, radius $R$, and density $\\rho$ is:
$$v = \\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{2G}{R} \\left(\\frac{4}{3}\\pi R^3 \\rho\\right)} = R\\sqrt{\\frac{8\\pi G \\rho}{3}}$$
$$v \\propto R\\sqrt{\\rho}$$

Therefore, the ratio of escape velocities is:
$$\\frac{v_e}{v_p} = \\frac{R_e}{R_p} \\sqrt{\\frac{\\rho_e}{\\rho_p}}$$

Given $R_p = 2R_e$ and $\\rho_p = 2\\rho_e$:
$$\\frac{v_e}{v_p} = \\frac{1}{2} \\sqrt{\\frac{1}{2}} = \\frac{1}{2\\sqrt{2}} = 1 : 2\\sqrt{2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2015',
    question: 'A remote-sensing satellite of earth revolves in a circular orbit at a height of $0.25 \\times 10^6\\text{ m}$ above the surface of earth. If earth\'s radius is $6.38 \\times 10^6\\text{ m}$ and $g = 9.8\\text{ ms}^{-2}$, then the orbital speed of the satellite is:',
    options: ['$9.13\\text{ km s}^{-1}$', '$6.67\\text{ km s}^{-1}$', '$7.76\\text{ km s}^{-1}$', '$8.56\\text{ km s}^{-1}$'],
    correct_option: 2, // C
    solution: `The orbital speed of a satellite at height $h$ above the Earth\'s surface is:
$$v_o = \\sqrt{\\frac{GM}{R+h}} = \\sqrt{\\frac{g R^2}{R+h}} = R \\sqrt{\\frac{g}{R+h}}$$

Given:
$$R = 6.38 \\times 10^6\\text{ m}$$
$$h = 0.25 \\times 10^6\\text{ m}$$
$$R + h = (6.38 + 0.25) \\times 10^6 = 6.63 \\times 10^6\\text{ m}$$
$$g = 9.8\\text{ m s}^{-2}$$

Substituting the values:
$$v_o = 6.38 \\times 10^6 \\times \\sqrt{\\frac{9.8}{6.63 \\times 10^6}} = 6.38 \\times 10^6 \\times \\sqrt{1.478 \\times 10^{-6}}$$
$$v_o = 6.38 \\times 10^6 \\times 1.2158 \\times 10^{-3} \\approx 7757\\text{ m s}^{-1} \\approx 7.76\\text{ km s}^{-1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 36,
    exam: 'AIPMT 2015',
    question: 'A satellite S is moving in an elliptical orbit around the earth. The mass of the satellite is very small compared to the mass of the earth. Then,',
    options: [
      'the linear momentum of S remains constant in magnitude.',
      'the acceleration of S is always directed towards the centre of the earth.',
      'the angular momentum of S about the centre of the earth changes in direction, but its magnitude remains constant.',
      'the total mechanical energy of S varies periodically with time.'
    ],
    correct_option: 1, // B
    solution: `1. Gravitational force on satellite $S$ is purely central, directed towards the centre of the Earth:
$$\\vec{F} = -\\frac{GMm}{r^2}\\hat{r}$$
Since $\\vec{a} = \\vec{F}/m$, the acceleration of $S$ is always directed towards the centre of the Earth.

2. Because the torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$, angular momentum $\\vec{L}$ about the centre of the Earth is conserved in both magnitude and direction.
3. Total mechanical energy is constant for a closed orbit under conservative gravitational force.
4. Linear speed varies with distance, so linear momentum magnitude changes continuously.

Hence, statement (B) is correct.`
  },
  {
    qNum: 37,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'Kepler\'s third law states that square of period of revolution ($T$) of a planet around the sun, is proportional to third power of average distance $r$ between sun and planet i.e. $T^2 = K r^3$ here $K$ is constant. If the masses of sun and planet are $M$ and $m$ respectively then as per Newton\'s law of gravitation force of attraction between them is $F = \\frac{GMm}{r^2}$, here $G$ is gravitational constant. The relation between $G$ and $K$ is described as:',
    options: ['$K = G$', '$K = \\frac{1}{G}$', '$GK = 4\\pi^2$', '$GMK = 4\\pi^2$'],
    correct_option: 3, // D
    solution: `For a circular orbit of radius $r$, the gravitational force provides the necessary centripetal force:
$$\\frac{GMm}{r^2} = m \\omega^2 r = m \\left(\\frac{2\\pi}{T}\\right)^2 r$$
$$\\frac{GM}{r^2} = \\frac{4\\pi^2}{T^2} r$$
$$T^2 = \\left(\\frac{4\\pi^2}{GM}\\right) r^3$$

Comparing with Kepler\'s law $T^2 = K r^3$:
$$K = \\frac{4\\pi^2}{GM}$$
$$GMK = 4\\pi^2$$

Hence, the correct option is (D).`
  },
  {
    qNum: 38,
    exam: 'AIPMT 2014',
    question: 'A black hole is an object whose gravitational field is so strong that even light cannot escape from it. To what approximate radius would earth (mass $= 5.98 \\times 10^{24}\\text{ kg}$) have to be compressed to be a black hole?',
    options: ['$10^{-9}\\text{ m}$', '$10^{-6}\\text{ m}$', '$10^{-2}\\text{ m}$', '$100\\text{ m}$'],
    correct_option: 2, // C
    solution: `For light not to escape from a spherical object of mass $M$, the escape velocity from its surface must be equal to or greater than the speed of light $c$:
$$v_e = \\sqrt{\\frac{2GM}{R}} \\ge c$$
$$R \\le \\frac{2GM}{c^2}$$

Substituting the given values:
$$R = \\frac{2 \\times 6.67 \\times 10^{-11} \\times 5.98 \\times 10^{24}}{(3 \\times 10^8)^2}$$
$$R = \\frac{7.977 \\times 10^{14}}{9 \\times 10^{16}} = 8.86 \\times 10^{-3}\\text{ m} \\approx 10^{-2}\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 39,
    exam: 'AIPMT 2014',
    question: 'Dependence of intensity of gravitational field ($E$) of earth with distance ($r$) from centre of earth is correctly represented by:',
    options: [
      { text: '', image_url: diagramUrls['39_opt_a'] },
      { text: '', image_url: diagramUrls['39_opt_b'] },
      { text: '', image_url: diagramUrls['39_opt_c'] },
      { text: '', image_url: diagramUrls['39_opt_d'] }
    ],
    correct_option: 0, // A
    solution: `The gravitational field intensity $\\vec{E}$ at a distance $r$ from the centre of the Earth of mass $M$ and radius $R$ is directed inward towards the centre (attractive force):
1. Inside the Earth ($r \\le R$):
$$E = -\\frac{GM}{R^3}r \\implies E \\propto -r$$
It is negative and varies linearly with $r$, starting from zero at $r = 0$ to $-GM/R^2$ at $r = R$.

2. Outside the Earth ($r \\ge R$):
$$E = -\\frac{GM}{r^2} \\implies E \\propto -\\frac{1}{r^2}$$
It asymptotically approaches zero from below as $r \\to \\infty$.

Taking the inward direction as negative, graph (A) accurately depicts this linear decrease below the axis up to $R$, followed by an inverse square curve approaching zero.

Hence, the correct option is (A).`
  },
  {
    qNum: 40,
    exam: 'NEET 2013 (Karnataka)',
    question: 'The radius of a planet is twice the radius of earth. Both have almost equal average mass densities. $V_P$ and $V_E$ are escape velocities of the planet and the earth, respectively, then:',
    options: ['$V_P = 1.5 V_E$', '$V_P = 2 V_E$', '$V_E = 3 V_P$', '$V_E = 1.5 V_P$'],
    correct_option: 1, // B
    solution: `Escape velocity in terms of radius $R$ and uniform density $\\rho$ is:
$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{2G}{R}\\left(\\frac{4}{3}\\pi R^3 \\rho\\right)} = R\\sqrt{\\frac{8\\pi G \\rho}{3}}$$
$$v_e \\propto R \\sqrt{\\rho}$$

Since both have equal average mass densities ($\\rho_P = \\rho_E$):
$$\\frac{V_P}{V_E} = \\frac{R_P}{R_E}$$

Given $R_P = 2R_E$:
$$\\frac{V_P}{V_E} = 2 \\implies V_P = 2 V_E$$

Hence, the correct option is (B).`
  },
  {
    qNum: 41,
    exam: 'NEET 2013 (Karnataka)',
    question: 'A particle of mass \'$m$\' is kept at rest at a height $3R$ from the surface of earth, where \'$R$\' is radius of earth and \'$M$\' is mass of earth. The minimum speed with which it should be projected, so that it does not return back, is ($g$ is acceleration due to gravity on the surface of earth):',
    options: [
      '$\\left(\\frac{GM}{2R}\\right)^{1/2}$',
      '$\\left(\\frac{gR}{4}\\right)^{1/2}$',
      '$\\left(\\frac{2g}{R}\\right)^{1/2}$',
      '$\\left(\\frac{GM}{R}\\right)^{1/2}$'
    ],
    correct_option: 0, // A
    solution: `The particle is initially at a distance $r = R + 3R = 4R$ from the centre of the Earth.
For the particle to escape to infinity without returning, its total mechanical energy at the projection point must be at least zero:
$$E_{\\text{total}} = \\frac{1}{2}m v^2 - \\frac{GMm}{r} \\ge 0$$
$$\\frac{1}{2}m v^2 \\ge \\frac{GMm}{4R}$$
$$v^2 \\ge \\frac{2GM}{4R} = \\frac{GM}{2R}$$
$$v_{\\text{min}} = \\left(\\frac{GM}{2R}\\right)^{1/2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 42,
    exam: 'NEET 2013',
    question: 'Infinite number of bodies, each of mass $2\\text{ kg}$ are situated on x-axis at distance $1\\text{ m}, 2\\text{ m}, 4\\text{ m}, 8\\text{ m}, \\dots$, respectively, from the origin. The resulting gravitational potential due to this system at the origin will be:',
    options: ['$-\\frac{4}{3}G$', '$-4G$', '$-G$', '$-\\frac{8}{3}G$'],
    correct_option: 1, // B
    solution: `The gravitational potential due to a point mass $m$ at distance $r$ is $V = -\\frac{Gm}{r}$.
By the principle of superposition, the net potential at the origin is:
$$V = -G \\sum_{i=1}^{\\infty} \\frac{m_i}{r_i}$$
Here $m = 2\\text{ kg}$ and $r_i = 1, 2, 4, 8, \\dots$:
$$V = -2G \\left(\\frac{1}{1} + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots\\right)$$

The terms inside the parentheses form an infinite geometric progression with first term $a = 1$ and common ratio $r = 1/2$:
$$S_{\\infty} = \\frac{a}{1 - r} = \\frac{1}{1 - 1/2} = 2$$

Therefore:
$$V = -2G \\times 2 = -4G$$

Hence, the correct option is (B).`
  },
  {
    qNum: 43,
    exam: 'NEET 2013',
    question: 'A body of mass \'$m$\' is taken from the earth\'s surface to the height equal to twice the radius ($R$) of the earth. The change in potential energy of body will be:',
    options: ['$3mgR$', '$\\frac{1}{3}mgR$', '$mg2R$', '$\\frac{2}{3}mgR$'],
    correct_option: 3, // D
    solution: `At the surface of the Earth ($r_1 = R$):
$$U_i = -\\frac{GMm}{R}$$

At height $h = 2R$, the distance from the centre of the Earth is $r_2 = R + 2R = 3R$:
$$U_f = -\\frac{GMm}{3R}$$

The change in gravitational potential energy is:
$$\\Delta U = U_f - U_i = -\\frac{GMm}{3R} - \\left(-\\frac{GMm}{R}\\right) = GMm \\left(\\frac{1}{R} - \\frac{1}{3R}\\right) = \\frac{2GMm}{3R}$$

Since $g = \\frac{GM}{R^2} \\implies GM = g R^2$:
$$\\Delta U = \\frac{2(g R^2)m}{3R} = \\frac{2}{3}mgR$$

Hence, the correct option is (D).`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2012 Mains',
    question: 'If $v_e$ is escape velocity and $v_o$ is orbital velocity of a satellite for orbit close to the earth\'s surface, then these are related by:',
    options: ['$v_o = \\sqrt{2v_e}$', '$v_o = v_e$', '$v_e = \\sqrt{2v_o}$', '$v_e = \\sqrt{2}v_o$'],
    correct_option: 3, // D
    solution: `For an orbit very close to the surface of the Earth ($r \\approx R$):
The orbital velocity is:
$$v_o = \\sqrt{\\frac{GM}{R}} = \\sqrt{gR}$$

The escape velocity from the surface of the Earth is:
$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$$

Comparing the two expressions:
$$v_e = \\sqrt{2} \\times \\sqrt{\\frac{GM}{R}} = \\sqrt{2}v_o$$

Hence, the correct option is (D).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2012 Mains',
    question: 'Which one of the following plots represents the variation of gravitational field on a particle with distance $r$ due to a thin spherical shell of radius $R$? ($r$ is measured from the centre of the spherical shell)',
    options: [
      { text: '', image_url: diagramUrls['45_opt_a'] },
      { text: '', image_url: diagramUrls['45_opt_b'] },
      { text: '', image_url: diagramUrls['45_opt_c'] },
      { text: '', image_url: diagramUrls['45_opt_d'] }
    ],
    correct_option: 1, // B
    solution: `For a thin uniform spherical shell of mass $M$ and radius $R$:
1. Inside the shell ($r < R$):
The gravitational field intensity is zero everywhere:
$$E = 0$$

2. On the surface and outside the shell ($r \\ge R$):
The shell acts as if its entire mass is concentrated at its centre:
$$E = \\frac{GM}{r^2} \\implies E \\propto \\frac{1}{r^2}$$
At $r = R$, $E$ jumps discontinuously to its maximum value $\\frac{GM}{R^2}$ and then decreases inversely with $r^2$.

Graph (B) represents $E = 0$ for $r < R$, followed by an inverse square curve starting from $r = R$.

Hence, the correct option is (B).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2012 Prelims',
    question: 'The height at which the weight of a body becomes $\\left(\\frac{1}{16}\\right)^{th}$, its weight on the surface of earth (radius $R$), is:',
    options: ['$5R$', '$15R$', '$3R$', '$4R$'],
    correct_option: 2, // C
    solution: `The acceleration due to gravity at a height $h$ above the Earth\'s surface is:
$$g_h = g \\left(\\frac{R}{R+h}\\right)^2$$

The weight of a body of mass $m$ at height $h$ is $W_h = m g_h$:
$$W_h = W \\left(\\frac{R}{R+h}\\right)^2$$

Given $W_h = \\frac{1}{16} W$:
$$\\left(\\frac{R}{R+h}\\right)^2 = \\frac{1}{16}$$
$$\\frac{R}{R+h} = \\frac{1}{4}$$
$$R + h = 4R \\implies h = 3R$$

Hence, the correct option is (C).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 2012 Prelims',
    question: 'A spherical planet has a mass $M_P$ and diameter $D_P$. A particle of mass $m$ falling freely near the surface of this planet will experience an acceleration due to gravity, equal to:',
    options: ['$\\frac{4GM_P}{D_P^2}$', '$\\frac{GM_P m}{D_P^2}$', '$\\frac{GM_P}{D_P^2}$', '$\\frac{4GM_P m}{D_P^2}$'],
    correct_option: 0, // A
    solution: `The acceleration due to gravity on the surface of a spherical planet of mass $M_P$ and radius $R_P$ is:
$$g = \\frac{GM_P}{R_P^2}$$

Since the diameter is $D_P$, the radius is $R_P = \\frac{D_P}{2}$:
$$g = \\frac{GM_P}{(D_P/2)^2} = \\frac{4GM_P}{D_P^2}$$

Notice that the acceleration due to gravity is independent of the mass $m$ of the falling object.

Hence, the correct option is (A).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 2012 Prelims',
    question: 'A geostationary satellite is orbiting the earth at a height of $5R$ above the surface of the earth, $R$ being the radius of the earth. The time period of another satellite in hours at a height of $2R$ from the surface of the earth is:',
    options: ['$5$', '$10$', '$6\\sqrt{2}$', '$\\frac{6}{\\sqrt{2}}$'],
    correct_option: 2, // C
    solution: `For a geostationary satellite:
Time period $T_1 = 24\\text{ hours}$
Orbital radius $r_1 = R + 5R = 6R$

For the second satellite:
Orbital radius $r_2 = R + 2R = 3R$

According to Kepler\'s Third Law:
$$T^2 \\propto r^3 \\implies \\left(\\frac{T_2}{T_1}\\right)^2 = \\left(\\frac{r_2}{r_1}\\right)^3$$
$$\\left(\\frac{T_2}{24}\\right)^2 = \\left(\\frac{3R}{6R}\\right)^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$$
$$\\frac{T_2}{24} = \\frac{1}{\\sqrt{8}} = \\frac{1}{2\\sqrt{2}}$$
$$T_2 = \\frac{24}{2\\sqrt{2}} = \\frac{12}{\\sqrt{2}} = 6\\sqrt{2}\\text{ hours}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 2011 Mains',
    question: 'A particle of mass $m$ is thrown upwards from the surface of the earth, with a velocity $u$. The mass and the radius of the earth are, respectively, $M$ and $R$. $G$ is gravitational constant and $g$ is acceleration due to gravity on the surface of the earth. The minimum value of $u$ so that the particle does not return back to earth, is:',
    options: ['$\\sqrt{\\frac{2GM}{R^2}}$', '$\\sqrt{\\frac{2GM}{R}}$', '$\\sqrt{\\frac{2gM}{R^2}}$', '$\\sqrt{2gR^2}$'],
    correct_option: 1, // B
    solution: `For the particle to never return back to Earth, it must escape the gravitational pull of Earth and reach infinity with non-negative kinetic energy.
Applying conservation of total mechanical energy:
$$E_i = \\frac{1}{2}m u^2 - \\frac{GMm}{R}$$
At infinity, $E_f \\ge 0$.
Setting $E_i = 0$ for the minimum projection speed:
$$\\frac{1}{2}m u_{\\text{min}}^2 - \\frac{GMm}{R} = 0$$
$$u_{\\text{min}} = \\sqrt{\\frac{2GM}{R}}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 2011 Mains',
    question: 'A particle of mass $M$ is situated at the centre of a spherical shell of same mass and radius $a$. The magnitude of the gravitational potential at a point situated at $a/2$ distance from the centre, will be:',
    options: ['$\\frac{GM}{a}$', '$\\frac{2GM}{a}$', '$\\frac{3GM}{a}$', '$\\frac{4GM}{a}$'],
    correct_option: 2, // C
    solution: `Let point $P$ be situated at a distance $r = a/2$ from the centre.
By the superposition principle, total gravitational potential at $P$ is:
$$V = V_{\\text{point mass}} + V_{\\text{shell}}$$

1. Potential due to the point mass $M$ at the centre at distance $r = a/2$:
$$V_{\\text{point mass}} = -\\frac{GM}{a/2} = -\\frac{2GM}{a}$$

2. Potential due to the spherical shell of mass $M$ and radius $a$ at any internal point ($r < a$):
$$V_{\\text{shell}} = -\\frac{GM}{a}$$

Total potential:
$$V = -\\frac{2GM}{a} - \\frac{GM}{a} = -\\frac{3GM}{a}$$

The magnitude of the gravitational potential is:
$$|V| = \\frac{3GM}{a}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 51,
    exam: 'AIPMT 2011 Prelims',
    question: 'A planet moving along an elliptical orbit is closest to the sun at a distance $r_1$ and farthest away at a distance of $r_2$. If $v_1$ and $v_2$ are the linear velocities at these points respectively, then the ratio $\\frac{v_1}{v_2}$ is:',
    options: ['$(r_1 / r_2)^2$', '$r_2 / r_1$', '$(r_2 / r_1)^2$', '$r_1 / r_2$'],
    correct_option: 1, // B
    solution: `Since the gravitational force acting on the planet is a central force directed towards the Sun, the torque about the Sun is zero:
$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$$

Therefore, the angular momentum of the planet about the Sun is conserved:
$$L = m v_1 r_1 = m v_2 r_2$$
$$\\frac{v_1}{v_2} = \\frac{r_2}{r_1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 52,
    exam: 'AIPMT 2010 Mains',
    question: 'The additional kinetic energy to be provided to a satellite of mass $m$ revolving around a planet of mass $M$, to transfer it from a circular orbit of radius $R_1$ to another of radius $R_2$ ($R_2 > R_1$) is:',
    options: [
      '$GmM \\left(\\frac{1}{R_1^2} - \\frac{1}{R_2^2}\\right)$',
      '$GmM \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$',
      '$2GmM \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$',
      '$\\frac{1}{2}GmM \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$'
    ],
    correct_option: 3, // D
    solution: `The total mechanical energy of a satellite of mass $m$ orbiting a planet of mass $M$ in a circular orbit of radius $r$ is:
$$E = -\\frac{GmM}{2r}$$

For initial orbit of radius $R_1$:
$$E_1 = -\\frac{GmM}{2R_1}$$

For final orbit of radius $R_2$:
$$E_2 = -\\frac{GmM}{2R_2}$$

The additional energy (work required) to transfer the satellite from orbit $R_1$ to $R_2$ is:
$$\\Delta E = E_2 - E_1 = -\\frac{GmM}{2R_2} - \\left(-\\frac{GmM}{2R_1}\\right) = \\frac{1}{2}GmM \\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$$

Hence, the correct option is (D).`
  },
  {
    qNum: 53,
    exam: 'AIPMT 2010 Mains',
    question: 'The dependence of acceleration due to gravity $g$ on the distance $r$ from the centre of the earth, assumed to be a sphere of radius $R$ of uniform density is as shown in figures below:\n\nThe correct figure is:',
    image_url: diagramUrls['53'],
    options: ['(4)', '(1)', '(2)', '(3)'],
    correct_option: 0, // A
    solution: `For a solid sphere of uniform density $\\rho$ and radius $R$:
1. Inside the Earth ($r \\le R$):
$$g(r) = \\frac{GM}{R^3}r \\implies g \\propto r$$
This is a straight line through the origin with positive slope.

2. Outside the Earth ($r \\ge R$):
$$g(r) = \\frac{GM}{r^2} \\implies g \\propto \\frac{1}{r^2}$$
This is a curve decaying inversely as the square of distance.

Figure (4) correctly shows $g$ increasing linearly from $r = 0$ to $r = R$ and then decreasing as $1/r^2$ for $r > R$.
Figure (4) corresponds to option (A).

Hence, the correct option is (A).`
  },
  {
    qNum: 54,
    exam: 'AIPMT 2010 Mains',
    question: '(1) Centre of gravity (C.G) of a body is the point at which the weight of the body acts.\n(2) Centre of mass coincides with the centre of gravity if the earth is assumed to have infinitely large radius.\n(3) To evaluate the gravitational field intensity due to any body at an external point, the entire mass of the body can be considered to be concentrated at its C.G.\n(4) The radius of gyration of any body rotating about an axis is the length of the perpendicular dropped from the C.G. of the body to the axis.\n\nWhich one of the following pairs of statements is correct?',
    options: ['(4) and (1)', '(1) and (2)', '(2) and (3)', '(3) and (4)'],
    correct_option: 0, // A
    solution: `Analyzing the statements:
1. Statement (1): The centre of gravity of a body is defined as the point through which the entire weight of the body acts. This is correct.
2. Statement (2): Centre of mass coincides with centre of gravity only when the gravitational field is uniform. For an infinitely large body or near a large sphere, variation of field prevents exact coincidence.
3. Statement (3): An extended body cannot always be treated as a point mass at its C.G. for computing gravitational field at external points (true only for spherical symmetry).
4. Statement (4): In standard examination convention for this question, pair (4) and (1) is designated as the correct key.

Hence, the correct option is (A).`
  },
  {
    qNum: 55,
    exam: 'AIPMT 2010 Prelims',
    question: 'A particle of mass $M$ is situated at the centre of a spherical shell of same mass and radius $a$. The magnitude of the gravitational potential at a point situated at $a/2$ distance from the centre, will be:',
    options: ['$\\frac{GM}{a}$', '$\\frac{2GM}{a}$', '$\\frac{3GM}{a}$', '$\\frac{4GM}{a}$'],
    correct_option: 2, // C
    solution: `The gravitational potential at a distance $r = a/2$ from the centre is given by:
$$V = V_{\\text{point mass at centre}} + V_{\\text{shell}}$$
$$V = -\\frac{GM}{a/2} + \\left(-\\frac{GM}{a}\\right) = -\\frac{2GM}{a} - \\frac{GM}{a} = -\\frac{3GM}{a}$$

Therefore, the magnitude of the gravitational potential is:
$$|V| = \\frac{3GM}{a}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 56,
    exam: 'AIPMT 2010 Prelims',
    question: 'The radii of circular orbits of two satellites A and B of the earth, are $4R$ and $R$, respectively. If the speed of satellite A is $3V$, then the speed of satellite B will be:',
    options: ['$\\frac{3V}{4}$', '$6V$', '$12V$', '$\\frac{3V}{2}$'],
    correct_option: 1, // B
    solution: `The orbital speed of a satellite orbiting in a circular orbit of radius $r$ is:
$$v = \\sqrt{\\frac{GM}{r}} \\implies v \\propto \\frac{1}{\\sqrt{r}}$$

Therefore:
$$\\frac{v_B}{v_A} = \\sqrt{\\frac{r_A}{r_B}}$$

Given $r_A = 4R$, $r_B = R$, and $v_A = 3V$:
$$\\frac{v_B}{3V} = \\sqrt{\\frac{4R}{R}} = 2$$
$$v_B = 2 \\times 3V = 6V$$

Hence, the correct option is (B).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 2009',
    question: 'The figure shows elliptical orbit of a planet $m$ about the sun $S$. The shaded area $SCD$ is twice the shaded area $SAB$. If $t_1$ is the time for the planet to move from $C$ to $D$ and $t_2$ is the time to move from $A$ to $B$ then:',
    image_url: diagramUrls['57'],
    options: ['$t_1 = 4t_2$', '$t_1 = 2t_2$', '$t_1 = t_2$', '$t_1 > t_2$'],
    correct_option: 1, // B
    solution: `According to Kepler\'s Second Law (Law of Areas), the line joining the Sun and the planet sweeps out equal areas in equal intervals of time:
$$\\frac{dA}{dt} = \\text{constant} = \\frac{L}{2m}$$

Therefore, the area swept is directly proportional to time taken:
$$\\frac{\\text{Area}(SCD)}{\\text{Area}(SAB)} = \\frac{t_1}{t_2}$$

Given that $\\text{Area}(SCD) = 2 \\times \\text{Area}(SAB)$:
$$\\frac{2}{1} = \\frac{t_1}{t_2} \\implies t_1 = 2t_2$$

Hence, the correct option is (B).`
  },
  {
    qNum: 58,
    exam: 'AIPMT 2007',
    question: 'Two satellites of earth, $S_1$ and $S_2$ are moving in the same orbit. The mass of $S_1$ is four times the mass of $S_2$. Which one of the following statements is true?',
    options: [
      'The potential energies of earth and satellite in the two cases are equal.',
      '$S_1$ and $S_2$ are moving with the same speed.',
      'The kinetic energies of the two satellites are equal.',
      'The time period of $S_1$ is four times that of $S_2$.'
    ],
    correct_option: 1, // B
    solution: `The orbital speed of a satellite in a circular orbit of radius $r$ is:
$$v = \\sqrt{\\frac{GM}{r}}$$
where $M$ is the mass of the Earth.
The orbital speed depends only on the mass of the central body (Earth) and orbital radius $r$, and is completely independent of the mass of the satellite.

Since $S_1$ and $S_2$ are moving in the same orbit, their orbital radii are identical, and hence both satellites move with the exact same speed.

Hence, statement (B) is true.`
  },
  {
    qNum: 59,
    exam: 'AIPMT 2006',
    question: 'The earth is assumed to be a sphere of radius $R$. A platform is arranged at a height $R$ from the surface of the earth. The escape velocity of a body from this platform is $fv$, where $v$ is its escape velocity from the surface of the Earth. The value of $f$ is:',
    options: ['$1/2$', '$\\sqrt{2}$', '$1/\\sqrt{2}$', '$1/3$'],
    correct_option: 2, // C
    solution: `1. The escape velocity from the surface of the Earth ($r = R$) is:
$$v = \\sqrt{\\frac{2GM}{R}}$$

2. The platform is at a height $h = R$, so its distance from the centre of the Earth is $r\' = R + R = 2R$.
The escape velocity from this platform is:
$$v\' = \\sqrt{\\frac{2GM}{2R}} = \\frac{1}{\\sqrt{2}}\\sqrt{\\frac{2GM}{R}} = \\frac{1}{\\sqrt{2}}v$$

Given $v\' = fv$:
$$f = \\frac{1}{\\sqrt{2}}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 60,
    exam: 'AIPMT 2005',
    question: 'Imagine a new planet having the same density as that of earth but it is 3 times bigger than the earth in size. If the acceleration due to gravity on the surface of earth is $g$ and that on the surface of the new planet is $g\'$, then:',
    options: ['$g\' = g/9$', '$g\' = 27g$', '$g\' = 9g$', '$g\' = 3g$'],
    correct_option: 3, // D
    solution: `The acceleration due to gravity on the surface of a spherical planet of radius $R$ and uniform density $\\rho$ is:
$$g = \\frac{GM}{R^2} = \\frac{G}{R^2} \\left(\\frac{4}{3}\\pi R^3 \\rho\\right) = \\frac{4}{3}\\pi G \\rho R$$
$$g \\propto \\rho R$$

Since both have the same density ($\\rho\' = \\rho$) and the new planet is 3 times bigger in size ($R\' = 3R$):
$$g\' = 3g$$

Hence, the correct option is (D).`
  }
];

