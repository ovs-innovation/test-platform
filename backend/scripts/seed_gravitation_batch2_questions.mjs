import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsPath = path.resolve(__dirname, 'gravitation_batch2_diagrams.json');
let diagrams = {};
if (fs.existsSync(diagramsPath)) {
  diagrams = JSON.parse(fs.readFileSync(diagramsPath, 'utf8'));
}

const getImageUrl = (qNum) => diagrams[`q${qNum}`] || '';

export const QUESTIONS = [
  // ── Page 2 (Q108 to Q124) ─────────────────────────────────────────────────────
  {
    q_num: 108,
    question_text: "In the case of stable equilibrium in gravitational field",
    options: [
      "Force on the body is zero and potential energy is always negative",
      "Force on the body is non-zero and potential energy is always zero",
      "Force on the body is zero and potential energy is always positive",
      "Force on the body is non-zero and potential energy is always positive"
    ],
    correct_index: 0,
    topic: "Equilibrium in Gravitational Field",
    difficulty: "easy",
    image_url: getImageUrl(108),
    solution: "At any equilibrium position, the net gravitational force on the body must be zero ($F = -\\frac{dU}{dr} = 0$). With gravitational potential energy defined to be zero at infinity ($U_\\infty = 0$), the potential energy of any bound or stable configuration in a purely attractive gravitational field is strictly negative ($U < 0$)."
  },
  {
    q_num: 109,
    question_text: "The value of acceleration due to gravity at a point at a height of 800 km from the surface of earth (radius of earth is 6400 km and value of acceleration due to gravity on the earth surface is $981\\text{ cm/s}^2$) is",
    options: [
      "775 cm/s^2",
      "872 cm/s^2",
      "981 cm/s^2",
      "Zero"
    ],
    correct_index: 0,
    topic: "Variation of g with Altitude",
    difficulty: "medium",
    image_url: getImageUrl(109),
    solution: "Acceleration due to gravity at height $h$ is given by:\n$$g' = g\\left(\\frac{R}{R+h}\\right)^2 = 981 \\times \\left(\\frac{6400}{6400 + 800}\\right)^2 = 981 \\times \\left(\\frac{6400}{7200}\\right)^2 = 981 \\times \\left(\\frac{8}{9}\\right)^2 = 981 \\times \\frac{64}{81} \\approx 775.1\\text{ cm/s}^2 \\approx 775\\text{ cm/s}^2$$"
  },
  {
    q_num: 110,
    question_text: "When a planet revolve around the sun in an elliptical path, then number of points at which velocity equal in magnitude and opposite in direction",
    options: [
      "2",
      "3",
      "4",
      "Infinite"
    ],
    correct_index: 0,
    topic: "Velocity Vector in Elliptical Orbit",
    difficulty: "medium",
    image_url: getImageUrl(110),
    solution: "The speed of a planet in an elliptical orbit depends solely on its distance $r$ from the Sun ($v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)$). For two points to have equal speed, their distances from the Sun must be equal. Furthermore, for their velocities to be exactly opposite in direction, their tangent vectors must be antiparallel. This occurs uniquely at the two extremities of the minor axis, where both points are at distance $r = a$ from the Sun and their velocity vectors are parallel to the major axis in opposite directions. Hence, there are exactly 2 such points."
  },
  {
    q_num: 111,
    question_text: "If the magnitude of gravitational potential energy of a system is varies according to the relation $U \\propto -\\frac{1}{r}$, then time period of revolution is proportional to",
    options: [
      "r^{3/2}",
      "r^2",
      "r",
      "r^0"
    ],
    correct_index: 0,
    topic: "Time Period and Central Force Relation",
    difficulty: "easy",
    image_url: getImageUrl(111),
    solution: "Given $U \\propto -\\frac{1}{r}$, the force is $F = -\\frac{dU}{dr} \\propto \\frac{1}{r^2}$. For circular motion:\n$$\\frac{m v^2}{r} \\propto \\frac{1}{r^2} \\implies v \\propto r^{-1/2}$$\nThe time period of revolution is:\n$$T = \\frac{2\\pi r}{v} \\propto \\frac{r}{r^{-1/2}} = r^{3/2}$$"
  },
  {
    q_num: 112,
    question_text: "Binding energy of a planet and star is increased then",
    options: [
      "Potential energy increased",
      "Potential energy decreased",
      "Kinetic energy decreased",
      "Kinetic and potential energy both remain constant"
    ],
    correct_index: 1,
    topic: "Binding Energy and Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(112),
    solution: "Binding energy is $E_b = -E = \\frac{GMm}{2r}$. Potential energy is $U = -\\frac{GMm}{r} = -2E_b$. If the binding energy increases ($E_b$ increases), the potential energy $U = -2E_b$ becomes more negative, which means the potential energy decreases."
  },
  {
    q_num: 113,
    question_text: "Two masses $m_1$ and $m_2$ are inside the spherical shell of mass $m_3$. Then which of the following is not true?",
    options: [
      "Force between m_1 and m_2 is non-zero",
      "Force between m_1 and m_3 is zero",
      "Force between m_2 and m_3 is zero",
      "At the centre O gravitational field is zero"
    ],
    correct_index: 3,
    topic: "Newton's Shell Theorem Applications",
    difficulty: "medium",
    image_url: getImageUrl(113),
    solution: "By Newton's shell theorem, a uniform spherical shell exerts zero gravitational force on any particle located anywhere in its interior. Hence, the force exerted by $m_3$ on $m_1$ is zero, and on $m_2$ is zero. The mutual gravitational force between $m_1$ and $m_2$ is non-zero ($\\frac{G m_1 m_2}{r^2} \\ne 0$). However, because $m_1$ and $m_2$ are placed inside the shell at asymmetric distances from the centre $O$, they each produce a gravitational field at $O$ that does not cancel out. Thus, the total field at $O$ is non-zero, making statement (4) not true."
  },
  {
    q_num: 114,
    question_text: "Two planets are at the distances $2r$ and $3r$ from the sun then the ratio of their time periods",
    options: [
      "\\left(\\frac{2}{3}\\right)^{2/3}",
      "\\left(\\frac{2}{3}\\right)^{3/2}",
      "\\left(\\frac{2}{3}\\right)^{1/2}",
      "1"
    ],
    correct_index: 1,
    topic: "Kepler's Third Law Ratio",
    difficulty: "easy",
    image_url: getImageUrl(114),
    solution: "According to Kepler's third law of planetary motion, $T^2 \\propto r^3$. Therefore:\n$$\\frac{T_1}{T_2} = \\left(\\frac{r_1}{r_2}\\right)^{3/2} = \\left(\\frac{2r}{3r}\\right)^{3/2} = \\left(\\frac{2}{3}\\right)^{3/2}$$"
  },
  {
    q_num: 115,
    question_text: "If the orbital radius of the earth around the sun becomes one fourth of the present value, then the duration of the year will be",
    options: [
      "22.8 days",
      "32.5 days",
      "45.63 days",
      "91.25 days"
    ],
    correct_index: 2,
    topic: "Year Duration Under Radius Reduction",
    difficulty: "easy",
    image_url: getImageUrl(115),
    solution: "By Kepler's third law: $T \\propto r^{3/2}$. If the orbital radius becomes $\\frac{1}{4}$ of its initial value:\n$$T' = T \\left(\\frac{1}{4}\\right)^{3/2} = 365 \\times \\frac{1}{8} = 45.625\\text{ days} \\approx 45.63\\text{ days}$$"
  },
  {
    q_num: 116,
    question_text: "A satellite of mass $m$ at rest on the surface of earth is to be launched into the parking orbit. The energy required for this process is [$R$ - radius of earth, $g$ - acceleration due to gravity on earth's surface]",
    options: [
      "\\frac{3gmR}{4}",
      "\\frac{7gmR}{9}",
      "\\frac{13gmR}{14}",
      "\\frac{5gmR}{6}"
    ],
    correct_index: 2,
    topic: "Launching Satellite into Parking Orbit",
    difficulty: "hard",
    image_url: getImageUrl(116),
    solution: "A parking orbit (geostationary orbit) has radius $r \\approx 7R$. Initial mechanical energy of satellite at rest on the surface: $E_i = -\\frac{GMm}{R} = -mgR$. Total energy in parking orbit of radius $7R$: $E_f = -\\frac{GMm}{2(7R)} = -\\frac{mgR}{14}$. Energy required is:\n$$\\Delta E = E_f - E_i = -\\frac{mgR}{14} - (-mgR) = \\frac{13}{14}mgR = \\frac{13gmR}{14}$$"
  },
  {
    q_num: 117,
    question_text: "A solid sphere of mass $M$ and radius $R$ has to be disintegrated into infinite point masses at infinite separation. The work done for this process will be (G - universal gravitational constant)",
    options: [
      "\\frac{GM}{R}",
      "\\frac{GM}{R^2}",
      "\\frac{2GM^2}{3R}",
      "\\frac{3GM^2}{5R}"
    ],
    correct_index: 3,
    topic: "Self Gravitational Energy of Solid Sphere",
    difficulty: "medium",
    image_url: getImageUrl(117),
    solution: "The self-gravitational potential energy of a uniform solid sphere of mass $M$ and radius $R$ is $U = -\\frac{3GM^2}{5R}$. The work done to completely disperse all its constituent particles to infinity is $W = -U = \\frac{3GM^2}{5R}$."
  },
  {
    q_num: 118,
    question_text: "An object of mass 2 kg is dropped from height 10 m on the surface of earth. The acceleration produced in the motion of earth by the object will be",
    options: [
      "9.8 m/s^2",
      "Less than 9.8 m/s^2",
      "Greater than 9.8 m/s^2",
      "Zero"
    ],
    correct_index: 1,
    topic: "Acceleration Produced in Earth by Falling Body",
    difficulty: "easy",
    image_url: getImageUrl(118),
    solution: "The gravitational force exerted on the object by Earth is $F = mg = 2 \\times 9.8 = 19.6\\text{ N}$. By Newton's third law, the object exerts an equal and opposite force of $19.6\\text{ N}$ on the Earth. The acceleration produced in the Earth is $a_e = \\frac{F}{M_e} = \\frac{19.6}{6 \\times 10^{24}} \\approx 3.3 \\times 10^{-24}\\text{ m/s}^2$. This value is finite, but immensely less than $9.8\\text{ m/s}^2$."
  },
  {
    q_num: 119,
    question_text: "According to Kepler's 3rd law $T^2 = K r^3$, where $K$ is proportionality constant which depends on",
    options: [
      "Mass of sun",
      "Mass of planet",
      "Radius of sun",
      "Both (1) & (2)"
    ],
    correct_index: 0,
    topic: "Kepler's Third Law Proportionality Constant",
    difficulty: "easy",
    image_url: getImageUrl(119),
    solution: "For a planet orbiting the Sun in a circular orbit: $\\frac{m v^2}{r} = \\frac{G M_s m}{r^2} \\implies v^2 = \\frac{G M_s}{r}$. Using $T = \\frac{2\\pi r}{v}$, we get $T^2 = \\left(\\frac{4\\pi^2}{G M_s}\\right)r^3$. Comparing with $T^2 = K r^3$, the constant $K = \\frac{4\\pi^2}{G M_s}$ depends strictly on the mass of the Sun."
  },
  {
    q_num: 120,
    question_text: "A point mass of 2 kg experiences a gravitational force of 14.2 N in gravitational field of a planet. The field intensity at that point is",
    options: [
      "7.1 N/kg",
      "28.4 N/kg",
      "8.6 N/m",
      "21.2 N/kg"
    ],
    correct_index: 0,
    topic: "Gravitational Field Intensity Definition",
    difficulty: "easy",
    image_url: getImageUrl(120),
    solution: "Gravitational field intensity is defined as the force experienced per unit test mass:\n$$I = \\frac{F}{m} = \\frac{14.2\\text{ N}}{2\\text{ kg}} = 7.1\\text{ N/kg}$$"
  },
  {
    q_num: 121,
    question_text: "A man of mass 100 kg in a satellite revolves around earth at height R from the surface of earth. The true weight of man will be [R - radius of earth, take $g = 10\\text{ m/s}^2$ on the surface of earth]",
    options: [
      "Zero",
      "250 N",
      "490 N",
      "980 N"
    ],
    correct_index: 1,
    topic: "True Weight in Satellite Orbit",
    difficulty: "medium",
    image_url: getImageUrl(121),
    solution: "True weight is the actual gravitational attraction exerted by the Earth on the body: $W_{\\text{true}} = m g'$. At height $h = R$, the acceleration due to gravity is:\n$$g' = g\\left(\\frac{R}{R+R}\\right)^2 = \\frac{g}{4} = \\frac{10}{4} = 2.5\\text{ m/s}^2$$\n$$W_{\\text{true}} = 100 \\times 2.5 = 250\\text{ N}$$\n(Note: The apparent weight in the satellite frame is zero, but the true weight is $250\\text{ N}$)."
  },
  {
    q_num: 122,
    question_text: "The maximum value of gravitational potential energy can be",
    options: [
      "Zero",
      "-1",
      "+1",
      "Infinity"
    ],
    correct_index: 0,
    topic: "Maximum Value of Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(122),
    solution: "The gravitational potential energy of two masses separated by distance $r$ is $U = -\\frac{GMm}{r}$. At infinite separation ($r \\to \\infty$), $U = 0$. For all finite separations, $U < 0$. Therefore, the maximum possible value of gravitational potential energy is zero."
  },
  {
    q_num: 123,
    question_text: "If $g_e$ and $g_p$ are magnitude of acceleration due to gravity at equator and poles respectively, then gravity at a place where latitude is 45° will be",
    options: [
      "g_e + g_p",
      "g_p - g_e",
      "\\frac{g_e + g_p}{2}",
      "\\frac{g_p - g_e}{2}"
    ],
    correct_index: 2,
    topic: "Gravity at 45 Degree Latitude",
    difficulty: "medium",
    image_url: getImageUrl(123),
    solution: "Variation of gravity with latitude $\\lambda$ is $g(\\lambda) = g_p - R\\omega^2 \\cos^2\\lambda$.\nAt the equator ($\\lambda = 0^\\circ$): $g_e = g_p - R\\omega^2 \\implies R\\omega^2 = g_p - g_e$.\nAt latitude $45^\\circ$:\n$$g_{45^\\circ} = g_p - R\\omega^2 \\cos^2 45^\\circ = g_p - \\frac{1}{2}(g_p - g_e) = \\frac{g_p + g_e}{2}$$"
  },
  {
    q_num: 124,
    question_text: "At what angular speed of earth, the object on equator of earth will escape to infinity from its surface? [$R \\to \\text{radius of earth}$]",
    options: [
      "\\sqrt{\\frac{g}{R}}",
      "\\sqrt{\\frac{2g}{R}}",
      "\\sqrt{\\frac{gR}{R}}",
      "\\sqrt{\\frac{2g}{R^2}}"
    ],
    correct_index: 1,
    topic: "Rotational Escape Speed Condition",
    difficulty: "medium",
    image_url: getImageUrl(124),
    solution: "The rotational speed of an object on the equator is $v = R\\omega$. For the object to escape from the Earth's surface into infinity, this speed must equal the escape velocity $v_e = \\sqrt{2gR}$:\n$$R\\omega = \\sqrt{2gR} \\implies \\omega = \\frac{\\sqrt{2gR}}{R} = \\sqrt{\\frac{2g}{R}}$$"
  },

  // ── Page 3 (Q131 to Q146) ─────────────────────────────────────────────────────
  {
    q_num: 131,
    question_text: "If the radius of the earth's orbit around the sun is $R$ and the time period of revolution of earth around the sun is $T$, the mass of the sun is",
    options: [
      "\\frac{4\\pi^2 R^3}{GT^2}",
      "\\frac{GT^2}{4\\pi^2 R^3}",
      "\\sqrt{\\frac{GT^3}{4\\pi^2 R^2}}",
      "\\frac{4\\pi^2 R^3}{GT}"
    ],
    correct_index: 0,
    topic: "Mass of Central Body from Orbital Period",
    difficulty: "easy",
    image_url: getImageUrl(131),
    solution: "The centripetal force is provided by the gravitational attraction of the Sun:\n$$\\frac{M_e v^2}{R} = \\frac{G M_s M_e}{R^2} \\implies v^2 = \\frac{G M_s}{R}$$\nSince $v = \\frac{2\\pi R}{T}$:\n$$\\frac{4\\pi^2 R^2}{T^2} = \\frac{G M_s}{R} \\implies M_s = \\frac{4\\pi^2 R^3}{G T^2}$$"
  },
  {
    q_num: 132,
    question_text: "Two point masses $M$ and $4M$ are kept at a separation of 12 meter. At what distance from the smaller mass, the gravitational potential has a minimum magnitude?",
    options: [
      "3 m",
      "4 m",
      "2.4 m",
      "6 m"
    ],
    correct_index: 1,
    topic: "Extremum of Gravitational Potential Magnitude",
    difficulty: "medium",
    image_url: getImageUrl(132),
    solution: "The magnitude of potential at distance $x$ from $M$ is $|V| = \\frac{GM}{x} + \\frac{4GM}{12-x}$. Setting $\\frac{d|V|}{dx} = 0$:\n$$-\\frac{GM}{x^2} + \\frac{4GM}{(12-x)^2} = 0 \\implies \\frac{1}{x} = \\frac{2}{12-x} \\implies 12 - x = 2x \\implies 3x = 12 \\implies x = 4\\text{ m}$$"
  },
  {
    q_num: 133,
    question_text: "Two solid spheres each of radius $R$ and mass $m$ are initially at rest with respect to a stationary reference frame S. The initial separation between the spheres is very large. If the two move due to mutual gravitational pull, with what speed w.r.t. the frame S will they strike each other?",
    options: [
      "\\sqrt{\\frac{Gm}{2R}}",
      "\\sqrt{\\frac{Gm}{R}}",
      "\\sqrt{\\frac{2Gm}{R}}",
      "2\\sqrt{\\frac{Gm}{R}}"
    ],
    correct_index: 0,
    topic: "Mutual Gravitational Collision Speed",
    difficulty: "medium",
    image_url: getImageUrl(133),
    solution: "At collision, the separation between the centres of the two spheres is $2R$. Initial energy: $E_i = 0$. By conservation of energy:\n$$K_1 + K_2 + U_f = 0 \\implies 2 \\times \\left(\\frac{1}{2}m v^2\\right) - \\frac{G m^2}{2R} = 0 \\implies m v^2 = \\frac{G m^2}{2R} \\implies v = \\sqrt{\\frac{Gm}{2R}}$$"
  },
  {
    q_num: 134,
    question_text: "The escape speed from earth surface is $11.2\\text{ km/s}$. If radius of earth is doubled and the density remaining the same, the escape speed from earth surface will become/remain",
    options: [
      "5.6 km/s",
      "11.2 km/s",
      "22.4 km/s",
      "33.6 km/s"
    ],
    correct_index: 2,
    topic: "Escape Velocity Under Radius Doubling",
    difficulty: "easy",
    image_url: getImageUrl(134),
    solution: "Escape velocity is $v_e = R\\sqrt{\\frac{8}{3}\\pi G \\rho} \\propto R$ for constant density. When radius is doubled ($R' = 2R$), the escape speed doubles:\n$$v_e' = 2 v_e = 2 \\times 11.2\\text{ km/s} = 22.4\\text{ km/s}$$"
  },
  {
    q_num: 135,
    question_text: "The mass of moon is about 1.5% of the mass of the Earth. If the gravitational pull that the Earth exerts on the moon is $F$, then the pull exerted by moon on the Earth",
    options: [
      "> F",
      "= F",
      "< F",
      "Information is insufficient to predict"
    ],
    correct_index: 1,
    topic: "Action-Reaction in Gravitation",
    difficulty: "easy",
    image_url: getImageUrl(135),
    solution: "By Newton's third law of motion, the gravitational force exerted by body A on body B is equal in magnitude and opposite in direction to the force exerted by body B on body A. Hence, the pull exerted by the Moon on the Earth is exactly equal to $F$."
  },
  {
    q_num: 136,
    question_text: "A small ball of mass $m$ is dropped from a geostationary spacecraft revolving around the earth. The total energy of the ball after it is dropped from the spacecraft will be [$M \\to \\text{mass of earth}$; $R \\to \\text{radius of earth}$ and height of the satellite from earth surface is $6R$]",
    options: [
      "Zero",
      "-\\frac{GMm}{14R}",
      "-\\frac{GMm}{6R}",
      "-\\frac{GMm}{10R}"
    ],
    correct_index: 1,
    topic: "Total Energy of Released Particle in Orbit",
    difficulty: "medium",
    image_url: getImageUrl(136),
    solution: "The orbital radius from the Earth's centre is $r = R + 6R = 7R$. When gently dropped, the ball retains the orbital velocity $v = \\sqrt{\\frac{GM}{7R}}$ of the spacecraft. The total mechanical energy in a circular orbit of radius $r$ is:\n$$E = -\\frac{GMm}{2r} = -\\frac{GMm}{2(7R)} = -\\frac{GMm}{14R}$$"
  },
  {
    q_num: 137,
    question_text: "When a body of mass $m$ is lifted from surface of the earth to a height equal to radius $R$ of the earth, the change in gravitational potential energy of the body is ($g$ : acceleration due to gravity at the surface of the earth)",
    options: [
      "\\frac{1}{2}mgR",
      "mgR",
      "3mgR",
      "2mgR"
    ],
    correct_index: 0,
    topic: "Change in Potential Energy at Height R",
    difficulty: "easy",
    image_url: getImageUrl(137),
    solution: "The change in gravitational potential energy is given by $\\Delta U = \\frac{mgh}{1 + h/R}$. For $h = R$:\n$$\\Delta U = \\frac{mgR}{1 + 1} = \\frac{1}{2}mgR$$"
  },
  {
    q_num: 138,
    question_text: "Mechanical energy of a body of mass $m$ thrown from surface of the earth (mass $M$, radius $R$) at escape velocity is",
    options: [
      "-\\frac{GMm}{2R}",
      "-\\frac{GMm}{R}",
      "Less than zero",
      "Zero"
    ],
    correct_index: 3,
    topic: "Total Mechanical Energy at Escape Speed",
    difficulty: "easy",
    image_url: getImageUrl(138),
    solution: "At escape velocity $v_e = \\sqrt{\\frac{2GM}{R}}$, the kinetic energy is $K = \\frac{1}{2}m v_e^2 = \\frac{GMm}{R}$. The potential energy at the surface is $U = -\\frac{GMm}{R}$. Total mechanical energy is:\n$$E = K + U = \\frac{GMm}{R} - \\frac{GMm}{R} = 0$$"
  },
  {
    q_num: 139,
    question_text: "Suppose the earth of radius $R$ starts rotating about its polar axis at such an angular velocity that a person on equator feels weightless. In this situation the duration of one day is equal to",
    options: [
      "\\frac{1}{2\\pi}\\sqrt{Rg}",
      "\\frac{1}{2\\pi}\\sqrt{\\frac{R}{g}}",
      "2\\pi\\sqrt{Rg}",
      "2\\pi\\sqrt{\\frac{R}{g}}"
    ],
    correct_index: 3,
    topic: "Day Length for Weightlessness at Equator",
    difficulty: "easy",
    image_url: getImageUrl(139),
    solution: "For weightlessness at the equator: $g - R\\omega^2 = 0 \\implies \\omega = \\sqrt{\\frac{g}{R}}$. The duration of one day is the rotational time period:\n$$T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{R}{g}}$$"
  },
  {
    q_num: 140,
    question_text: "At a point inside a uniform spherical shell",
    options: [
      "Gravitational potential is constant",
      "Gravitational field is non-zero",
      "Gravitational potential is zero",
      "All of these"
    ],
    correct_index: 0,
    topic: "Field and Potential Inside Spherical Shell",
    difficulty: "easy",
    image_url: getImageUrl(140),
    solution: "Inside a uniform spherical shell, the gravitational field is zero everywhere ($\\vec{E} = 0$). Since $\\vec{E} = -\\nabla V = 0$, the gravitational potential $V$ is uniform and constant throughout the interior, equal to its surface value $V = -\\frac{GM}{R}$."
  },
  {
    q_num: 141,
    question_text: "At what angle with the horizontal should a body be projected upwards from earth surface to escape from gravitational pull?",
    options: [
      "45°",
      "Less than 45°",
      "More than 45°",
      "Any angle"
    ],
    correct_index: 3,
    topic: "Direction Independence of Escape Velocity",
    difficulty: "easy",
    image_url: getImageUrl(141),
    solution: "Escape velocity depends only on the gravitational potential at the point of projection ($v_e = \\sqrt{2|V|}$) and is independent of the projection angle. A body projected at escape velocity will escape when launched at any angle (except directly downwards into the Earth)."
  },
  {
    q_num: 142,
    question_text: "Which of the following graphs correctly represents the variation of acceleration due to gravity $g$ with distance $r$ from centre of the earth? (where $R$ is the radius of earth)",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 1,
    topic: "Graph of g vs Distance from Earth Center",
    difficulty: "medium",
    image_url: getImageUrl(142),
    solution: "Inside the Earth ($r \\le R$), $g(r) = \\frac{GM}{R^3}r \\propto r$, representing a straight line through the origin. Outside the Earth ($r \\ge R$), $g(r) = \\frac{GM}{r^2} \\propto \\frac{1}{r^2}$, representing an inverse-square curve decaying towards zero. Graph (2) correctly depicts this variation."
  },
  {
    q_num: 143,
    question_text: "Work done by a person on a mass of 3 kg in bringing it from infinity to a point A is -9 joule. If the mass was initially at rest and its final velocity at point A is 6 m/s, then gravitational potential at point A is (assume gravitational potential at infinity is zero)",
    options: [
      "21 J/kg",
      "-21 J/kg",
      "54 J/kg",
      "-54 J/kg"
    ],
    correct_index: 1,
    topic: "Work Energy Theorem and Potential Definition",
    difficulty: "hard",
    image_url: getImageUrl(143),
    solution: "By the work-energy theorem: $W_{\\text{ext}} + W_{\\text{grav}} = \\Delta K$. Since $W_{\\text{grav}} = -\\Delta U = -m(V_A - 0) = -m V_A$:\n$$-9 + (-3 V_A) = \\frac{1}{2}(3)(6)^2 - 0 = 54\\text{ J}$$\n$$-3 V_A = 54 + 9 = 63 \\implies V_A = -21\\text{ J/kg}$$"
  },
  {
    q_num: 144,
    question_text: "If a body is dropped from an artificial satellite revolving around the earth at an altitude of 120 km, the body will",
    options: [
      "Fall down to earth gradually",
      "Go far away in space",
      "Continue to move with same speed along the original orbit of satellite",
      "Continue to move tangentially in a straight line to the satellite orbit with same speed"
    ],
    correct_index: 2,
    topic: "Motion of Object Released from Satellite",
    difficulty: "easy",
    image_url: getImageUrl(144),
    solution: "When released from an orbiting satellite, the body has the same initial orbital velocity and altitude as the satellite. Gravity provides exactly the required centripetal acceleration, so the body continues to orbit the Earth alongside the satellite in the original orbit."
  },
  {
    q_num: 145,
    question_text: "If the speed of an artificial satellite revolving around the earth in circular orbit be $\\frac{2}{3}$ of escape velocity from the surface of the earth then its altitude above the surface of earth is",
    options: [
      "\\frac{4}{5}R",
      "\\frac{2}{5}R",
      "\\frac{1}{8}R",
      "\\frac{3}{5}R"
    ],
    correct_index: 2,
    topic: "Altitude for Given Orbital Speed",
    difficulty: "medium",
    image_url: getImageUrl(145),
    solution: "Orbital speed at height $h$ is $v_0 = \\sqrt{\\frac{GM}{R+h}}$. Given $v_0 = \\frac{2}{3}v_e = \\frac{2}{3}\\sqrt{\\frac{2GM}{R}}$:\n$$\\frac{GM}{R+h} = \\frac{4}{9}\\left(\\frac{2GM}{R}\\right) = \\frac{8GM}{9R} \\implies R+h = \\frac{9R}{8} \\implies h = \\frac{9R}{8} - R = \\frac{1}{8}R$$"
  },
  {
    q_num: 146,
    question_text: "The distance of geostationary satellite from the centre of earth ($R = 6400\\text{ km}$) is nearest to",
    options: [
      "18R",
      "10R",
      "7R",
      "5R"
    ],
    correct_index: 2,
    topic: "Geostationary Orbital Radius",
    difficulty: "easy",
    image_url: getImageUrl(146),
    solution: "The radius of a geostationary orbit from the centre of the Earth is approximately $42,400\\text{ km}$. Expressed in terms of Earth's radius $R = 6400\\text{ km}$:\n$$r = \\frac{42400}{6400}R \\approx 6.6R \\approx 7R$$"
  },

  // ── Page 4 (Q154 to Q169) ─────────────────────────────────────────────────────
  {
    q_num: 154,
    question_text: "The change in gravitational potential energy when a body of mass $m$ is raised to a height $nR$ from the earth's surface is ($R$ - radius of earth)",
    options: [
      "mgR \\frac{n}{n+1}",
      "mgR \\frac{n}{n-1}",
      "nmgR",
      "mgR \\frac{n^2}{n^2+1}"
    ],
    correct_index: 0,
    topic: "Change in Potential Energy Formula",
    difficulty: "easy",
    image_url: getImageUrl(154),
    solution: "Change in gravitational potential energy is:\n$$\\Delta U = \\frac{mgh}{1 + h/R} = \\frac{mg(nR)}{1 + n} = mgR\\frac{n}{n+1}$$"
  },
  {
    q_num: 155,
    question_text: "If the gravitational potential on the surface of a uniform solid sphere is $P$, then the potential at its center is",
    options: [
      "\\frac{2}{3}P",
      "\\frac{1}{3}P",
      "\\frac{3}{2}P",
      "\\frac{1}{2}P"
    ],
    correct_index: 2,
    topic: "Potential at Center of Solid Sphere",
    difficulty: "easy",
    image_url: getImageUrl(155),
    solution: "For a uniform solid sphere, the gravitational potential at its centre is $V_c = \\frac{3}{2}V_s$. Since potential at the surface is $P$, the potential at the centre is $\\frac{3}{2}P$."
  },
  {
    q_num: 156,
    question_text: "If speed of a satellite of earth is raised by 41.4%, then the satellite",
    options: [
      "Escapes the earth's field",
      "Moves in elliptical orbit about earth",
      "Moves in circular orbit about earth",
      "Will fall into earth"
    ],
    correct_index: 0,
    topic: "Condition for Escape via Speed Increase",
    difficulty: "easy",
    image_url: getImageUrl(156),
    solution: "The orbital speed is $v_0$. Raising the speed by $41.4\\%$ gives $v = (1 + 0.414)v_0 = 1.414 v_0 = \\sqrt{2}v_0$. Since the escape speed from orbit is $v_e = \\sqrt{2}v_0$, the satellite attains escape velocity and escapes the Earth's gravitational field along a parabolic path."
  },
  {
    q_num: 157,
    question_text: "If we start moving away from the centre of the earth, then gravitational potential",
    options: [
      "Decreases continuously",
      "Increases continuously",
      "First increases then decreases",
      "First decreases then increases"
    ],
    correct_index: 1,
    topic: "Gravitational Potential Trend Away from Center",
    difficulty: "medium",
    image_url: getImageUrl(157),
    solution: "At the centre of the Earth, gravitational potential is minimum (most negative): $V_c = -\\frac{3GM}{2R}$. Moving outward towards the surface, $V$ increases to $-\\frac{GM}{R}$, and beyond the surface it increases as $-\\frac{GM}{r}$, approaching $0$ at infinity. Thus, the gravitational potential increases continuously."
  },
  {
    q_num: 158,
    question_text: "Time period of the polar satellite around the earth is about",
    options: [
      "24 h",
      "12 h",
      "6 h",
      "100 minute"
    ],
    correct_index: 3,
    topic: "Time Period of Polar Satellite",
    difficulty: "easy",
    image_url: getImageUrl(158),
    solution: "Polar satellites orbit at relatively low altitudes (typically 500 km to 800 km) in sun-synchronous polar orbits. Their orbital time period is approximately 100 minutes (around 84 to 100 minutes)."
  },
  {
    q_num: 159,
    question_text: "If $R$ is the radius of orbit of a planet and $T$ is time period of the planet, then which of the following graphs correctly shows the motion of a planet revolving around the sun?",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 1,
    topic: "Graph of Kepler's Third Law T^2 vs R",
    difficulty: "medium",
    image_url: getImageUrl(159),
    solution: "According to Kepler's third law, $T^2 \\propto R^3$. When $T^2$ is plotted on the vertical axis against $R$ on the horizontal axis, the curve is of the form $y = k x^3$, which passes through the origin and bends upwards (concave upwards). Graph (2) correctly depicts this variation."
  },
  {
    q_num: 160,
    question_text: "A satellite is launched to orbit around the earth at a height $h$ ($\\ll R = \\text{radius of earth}$). Time period of revolution of satellite around the earth is nearly",
    options: [
      "24 h",
      "6 h",
      "2.6 h",
      "1.4 h"
    ],
    correct_index: 3,
    topic: "Time Period of Near-Earth Satellite",
    difficulty: "easy",
    image_url: getImageUrl(160),
    solution: "For a satellite orbiting close to the Earth's surface ($h \\ll R$):\n$$T = 2\\pi\\sqrt{\\frac{R}{g}} = 2\\pi\\sqrt{\\frac{6.4 \\times 10^6}{9.8}} \\approx 5078\\text{ s} \\approx 84.6\\text{ minutes} \\approx 1.4\\text{ hours}$$"
  },
  {
    q_num: 161,
    question_text: "A body of mass $m$ is taken to an altitude equal to the radius of earth ($R$). If acceleration due to gravity at the surface of earth is $g$, then gain in potential energy of the body is",
    options: [
      "mgR",
      "\\frac{mgR}{2}",
      "\\frac{mgR}{4}",
      "\\frac{mgR}{3}"
    ],
    correct_index: 1,
    topic: "Gain in Potential Energy at Height R",
    difficulty: "easy",
    image_url: getImageUrl(161),
    solution: "The gain in potential energy is $\\Delta U = \\frac{mgh}{1 + h/R}$. With $h = R$:\n$$\\Delta U = \\frac{mgR}{1 + 1} = \\frac{mgR}{2}$$"
  },
  {
    q_num: 162,
    question_text: "Time period of revolution of a satellite very close to earth surface is $T$. If an imaginary straight bottomless tunnel is dug through earth and a body is dropped into it, then its time period of oscillation will be",
    options: [
      "2T",
      "3T",
      "4T",
      "T"
    ],
    correct_index: 3,
    topic: "Comparison of Satellite Period and Tunnel Oscillation",
    difficulty: "medium",
    image_url: getImageUrl(162),
    solution: "The orbital period of a satellite grazing the Earth's surface is $T = 2\\pi\\sqrt{\\frac{R}{g}}$. A particle executing simple harmonic motion in a diametrical tunnel through uniform Earth also has time period $T = 2\\pi\\sqrt{\\frac{R}{g}}$. Hence, the time period of oscillation is identical, $T$."
  },
  {
    q_num: 163,
    question_text: "What should be the length of a day on earth, if a man standing on the equator experience weightlessness?",
    options: [
      "48 hours",
      "84.6 minute",
      "Infinite",
      "42.3 minute"
    ],
    correct_index: 1,
    topic: "Length of Day for Weightlessness at Equator",
    difficulty: "easy",
    image_url: getImageUrl(163),
    solution: "For apparent weightlessness at the equator, $g - R\\omega^2 = 0 \\implies \\omega = \\sqrt{\\frac{g}{R}}$. The rotational period (duration of one day) would be:\n$$T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{R}{g}} = 2\\pi\\sqrt{\\frac{6.4 \\times 10^6}{9.8}} \\approx 5078\\text{ s} \\approx 84.6\\text{ minutes}$$"
  },
  {
    q_num: 164,
    question_text: "The scientific principle involved in orbital motion of a satellite is",
    options: [
      "Laws of thermodynamics",
      "Newton's laws of motion",
      "Kepler's laws of planetary motion",
      "Bernoulli's principle of fluid dynamics"
    ],
    correct_index: 2,
    topic: "Principles Governing Orbital Motion",
    difficulty: "easy",
    image_url: getImageUrl(164),
    solution: "The orbital motion of an artificial satellite around the Earth obeys Kepler's laws of planetary motion, which describe the kinematics of bodies revolving in central inverse-square gravitational fields."
  },
  {
    q_num: 165,
    question_text: "A vertical stick of mass 1 kg and length 4 m is pivoted at top end and is displaced through an angle 60° from its initial vertical position. The increase in its gravitational potential energy is",
    options: [
      "5 J",
      "20 J",
      "15 J",
      "10 J"
    ],
    correct_index: 3,
    topic: "Increase in Potential Energy of Pivoted Stick",
    difficulty: "medium",
    image_url: getImageUrl(165),
    solution: "The centre of mass of the uniform stick is at distance $d = \\frac{L}{2} = 2\\text{ m}$ from the pivot. When displaced by $\\theta = 60^\\circ$, the vertical rise of its centre of mass is:\n$$h_{\\text{cm}} = \\frac{L}{2}(1 - \\cos 60^\\circ) = 2(1 - 0.5) = 1\\text{ m}$$\nThe increase in gravitational potential energy is:\n$$\\Delta U = m g h_{\\text{cm}} = 1 \\times 10 \\times 1 = 10\\text{ J}$$"
  },
  {
    q_num: 166,
    question_text: "Figure shows two concentric shells of masses $m_1$ and $m_2$. At which point a particle of mass $m$ shall experience zero gravitational force because of them?",
    options: [
      "A",
      "C",
      "D",
      "B"
    ],
    correct_index: 2,
    topic: "Zero Field Inside Concentric Spherical Shells",
    difficulty: "easy",
    image_url: getImageUrl(166),
    solution: "According to Newton's shell theorem, a uniform spherical shell exerts zero gravitational force on any particle located anywhere in its interior. Point D lies inside both the inner shell $m_1$ and the outer shell $m_2$. Thus, the gravitational field due to both shells at point D is zero, and a particle at D experiences zero gravitational force."
  },
  {
    q_num: 167,
    question_text: "The gravitational field in a region is given by $\\vec{g} = 4\\hat{i} + 4\\hat{j}$. Work done by this field is zero, when a particle is moved along the line",
    options: [
      "3x + 4y = 2",
      "3x + 3y = 5",
      "x + 3y = 2",
      "3y + x = 1"
    ],
    correct_index: 1,
    topic: "Zero Work Along Equipotential Line",
    difficulty: "medium",
    image_url: getImageUrl(167),
    solution: "Work done by the field is $W = \\int \\vec{g} \\cdot d\\vec{r} = 4\\Delta x + 4\\Delta y$. For zero work, $\\vec{g} \\cdot d\\vec{r} = 0 \\implies 4dx + 4dy = 0 \\implies \\frac{dy}{dx} = -1$. The line $3x + 3y = 5 \\implies y = -x + \\frac{5}{3}$ has slope $m = -1$, which is perpendicular to $\\vec{g}$ everywhere. Hence, moving along this line does zero work."
  },
  {
    q_num: 168,
    question_text: "A straight hole is drilled from surface of the earth to its centre. If a particle at rest is dropped from surface of the earth then speed of the particle when it reaches the centre of the earth is ($M$ = mass of earth, $R$ = radius)",
    options: [
      "\\sqrt{\\frac{2GM}{R}}",
      "2\\sqrt{\\frac{GM}{R}}",
      "\\sqrt{\\frac{GM}{R}}",
      "\\sqrt{\\frac{GM}{2R}}"
    ],
    correct_index: 2,
    topic: "Speed Reaching Earth Center from Surface",
    difficulty: "medium",
    image_url: getImageUrl(168),
    solution: "Gravitational potentials: $V_s = -\\frac{GM}{R}$ and $V_c = -\\frac{3GM}{2R}$. By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 = m(V_s - V_c) = m\\left(-\\frac{GM}{R} + \\frac{3GM}{2R}\\right) = \\frac{GMm}{2R} \\implies v = \\sqrt{\\frac{GM}{R}}$$"
  },
  {
    q_num: 169,
    question_text: "A tunnel has been dug through a diameter of a solid sphere of uniform mass density. Which graph best represents the variation of gravitational field intensity $E$ with position $r$ as one moves from A to B?",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 0,
    topic: "Field Variation Across Diameter Tunnel",
    difficulty: "hard",
    image_url: getImageUrl(169),
    solution: "Inside a solid sphere, the gravitational field intensity is directly proportional to the distance from the centre: $E(r) = \\frac{GM}{R^3}r$. At the surface points A and B, $E = \\frac{GM}{R^2}$ (maximum). As one moves from A towards the centre, $E$ decreases linearly to zero at the centre, and then increases linearly back to maximum at B. Graph (1) correctly shows this symmetric V-shaped linear profile."
  },

  // ── Page 5 (Q170 to Q183) ─────────────────────────────────────────────────────
  {
    q_num: 170,
    question_text: "An artificial satellite is moving in a circular orbit around earth has a kinetic energy $E$. Its potential energy is",
    options: [
      "-2E",
      "-\\frac{E}{2}",
      "-E",
      "2E"
    ],
    correct_index: 0,
    topic: "Kinetic and Potential Energy Relation in Orbit",
    difficulty: "easy",
    image_url: getImageUrl(170),
    solution: "For any circular gravitational orbit, kinetic energy is $K = \\frac{GMm}{2r} = E$, and gravitational potential energy is $U = -\\frac{GMm}{r} = -2K = -2E$."
  },
  {
    q_num: 171,
    question_text: "Figure shows a planet in elliptical orbit around the sun (S). Ratio of momentum of planet at point A to that at point B is",
    options: [
      "\\frac{r_1}{r_2}",
      "\\frac{r_1^2}{r_2^2}",
      "\\frac{r_2}{r_1}",
      "\\frac{r_2^2}{r_1^2}"
    ],
    correct_index: 2,
    topic: "Momentum Ratio at Perihelion and Aphelion",
    difficulty: "easy",
    image_url: getImageUrl(171),
    solution: "By conservation of angular momentum about the Sun: $L = p_A r_1 = p_B r_2$. Therefore, the ratio of momentum at point A to that at point B is:\n$$\\frac{p_A}{p_B} = \\frac{r_2}{r_1}$$"
  },
  {
    q_num: 172,
    question_text: "If orbital speed of a satellite orbiting near surface of the earth in circular orbit is changed from $V_0$ to $1.1 V_0$ then it will",
    options: [
      "Revolve in a circular orbit of larger radius",
      "Follow a parabolic path",
      "Revolve in an elliptical orbit",
      "Follow hyperbolic path"
    ],
    correct_index: 2,
    topic: "Trajectory Following Speed Change in Orbit",
    difficulty: "medium",
    image_url: getImageUrl(172),
    solution: "Escape velocity from the surface is $V_e = \\sqrt{2}V_0 \\approx 1.414 V_0$. Since $V_0 < 1.1 V_0 < \\sqrt{2}V_0$, the speed is greater than circular velocity but less than escape velocity. Consequently, the satellite will enter an elliptical orbit with the point of projection acting as perigee."
  },
  {
    q_num: 173,
    question_text: "A particle has been thrown up with double the escape speed $V_e$ from the surface of the earth. Its speed when it reaches the interstellar space far away from the earth's gravity, is",
    options: [
      "\\frac{V_e}{2}",
      "V_e",
      "\\sqrt{3}V_e",
      "Zero"
    ],
    correct_index: 2,
    topic: "Interstellar Speed with 2Ve Projection",
    difficulty: "easy",
    image_url: getImageUrl(173),
    solution: "By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 - \\frac{1}{2}m V_e^2 = \\frac{1}{2}m v_\\infty^2 \\implies v_\\infty = \\sqrt{v^2 - V_e^2} = \\sqrt{(2V_e)^2 - V_e^2} = \\sqrt{3}V_e$$"
  },
  {
    q_num: 174,
    question_text: "The gravitational potential energy of an isolated system of three particles each of mass $m$ at the three corners of an equilateral triangle of side $l$ is",
    options: [
      "-\\frac{Gm^2}{l}",
      "-\\frac{3Gm^2}{l}",
      "-\\frac{2Gm^2}{l}",
      "-\\frac{Gm^2}{2l}"
    ],
    correct_index: 1,
    topic: "Potential Energy of Three Particles on Triangle",
    difficulty: "easy",
    image_url: getImageUrl(174),
    solution: "For 3 particles placed at the corners of an equilateral triangle of side $l$, there are 3 distinct pairs, each with separation $l$. The total potential energy is:\n$$U = 3\\left(-\\frac{Gm^2}{l}\\right) = -\\frac{3Gm^2}{l}$$"
  },
  {
    q_num: 175,
    question_text: "The value of $g$ at a certain height $h$ above the free surface of earth is $\\frac{x}{4}$, where $x$ is value of $g$ at the surface of earth. The height $h$ is",
    options: [
      "R",
      "2R",
      "3R",
      "4R"
    ],
    correct_index: 0,
    topic: "Height for Gravity to Become One Fourth",
    difficulty: "easy",
    image_url: getImageUrl(175),
    solution: "Using $g' = g\\left(\\frac{R}{R+h}\\right)^2 = \\frac{g}{4}$:\n$$\\frac{R}{R+h} = \\frac{1}{2} \\implies R+h = 2R \\implies h = R$$"
  },
  {
    q_num: 176,
    question_text: "Two satellites each of mass $m$ are revolving around earth of mass $M$. The ratio of maximum and minimum force on earth due to two satellites is",
    options: [
      "\\frac{5}{3}",
      "\\frac{3}{5}",
      "\\frac{4}{5}",
      "\\frac{2}{5}"
    ],
    correct_index: 0,
    topic: "Maximum and Minimum Force on Earth from Satellites",
    difficulty: "medium",
    image_url: getImageUrl(176),
    solution: "Force on Earth due to satellite 1 at radius $R$: $F_1 = \\frac{GMm}{R^2} = F_0$. Force due to satellite 2 at radius $2R$: $F_2 = \\frac{GMm}{(2R)^2} = \\frac{F_0}{4}$. Maximum force occurs when both satellites are aligned on the same side: $F_{\\text{max}} = F_1 + F_2 = F_0 + \\frac{F_0}{4} = \\frac{5}{4}F_0$. Minimum force occurs when they are on diametrically opposite sides: $F_{\\text{min}} = F_1 - F_2 = F_0 - \\frac{F_0}{4} = \\frac{3}{4}F_0$. The ratio is:\n$$\\frac{F_{\\text{max}}}{F_{\\text{min}}} = \\frac{\\frac{5}{4}F_0}{\\frac{3}{4}F_0} = \\frac{5}{3}$$"
  },
  {
    q_num: 177,
    question_text: "The slope of a graph plotted between squaring time period of revolution ($T^2$) and cube of semi major axis ($a^3$) for a planet around the sun of mass $M$ will be (G: Universal gravitational constant)",
    options: [
      "Zero",
      "4\\pi GM",
      "\\frac{GM}{4\\pi^2}",
      "\\frac{4\\pi^2}{GM}"
    ],
    correct_index: 3,
    topic: "Slope of T^2 vs a^3 Kepler Graph",
    difficulty: "easy",
    image_url: getImageUrl(177),
    solution: "From Kepler's third law, $T^2 = \\left(\\frac{4\\pi^2}{GM}\\right) a^3$. Comparing with the equation of a straight line $y = mx$, the slope is $\\frac{4\\pi^2}{GM}$."
  },
  {
    q_num: 178,
    question_text: "Which of the following statements is correct about gravitational force?",
    options: [
      "It depends upon the product of two masses",
      "It depends upon the medium between the masses",
      "It depends upon the separation between the two masses",
      "Both (1) & (3)"
    ],
    correct_index: 3,
    topic: "Properties of Gravitational Force",
    difficulty: "easy",
    image_url: getImageUrl(178),
    solution: "According to Newton's law of universal gravitation, $F = \\frac{G m_1 m_2}{r^2}$. The force is directly proportional to the product of the two masses and inversely proportional to the square of their separation. It is independent of the nature of the intervening medium. Thus, statements (1) and (3) are correct."
  },
  {
    q_num: 179,
    question_text: "A body is projected at an angle of 60° upwards from the surface of the earth. The escape speed in this case would be (symbols have their usual meaning)",
    options: [
      "\\frac{\\sqrt{3}}{2}\\sqrt{\\frac{2GM}{R}}",
      "\\frac{1}{2}\\sqrt{\\frac{2GM}{R}}",
      "\\sqrt{\\frac{2GM}{R}}",
      "\\sqrt{\\frac{3GM}{2R}}"
    ],
    correct_index: 2,
    topic: "Escape Velocity Angle Independence",
    difficulty: "easy",
    image_url: getImageUrl(179),
    solution: "Escape velocity is a scalar quantity derived from energy conservation ($K + U = 0$) and depends only on the mass and radius of the planet. It is completely independent of the angle of projection. Hence, it remains $\\sqrt{\\frac{2GM}{R}}$."
  },
  {
    q_num: 180,
    question_text: "Kepler's second law states that, areal velocity of a planet is constant. It is a consequence of conservation of",
    options: [
      "Linear momentum",
      "Angular momentum",
      "Energy",
      "Mass"
    ],
    correct_index: 1,
    topic: "Areal Velocity and Angular Momentum Conservation",
    difficulty: "easy",
    image_url: getImageUrl(180),
    solution: "The areal velocity is related to angular momentum by $\\frac{dA}{dt} = \\frac{L}{2m}$. Since the gravitational force is central, the net torque about the Sun is zero ($\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$). Consequently, angular momentum $\\vec{L}$ is conserved, which implies areal velocity is constant."
  },
  {
    q_num: 181,
    question_text: "If the earth suddenly stops rotating, then the value of acceleration due to gravity $g$ at equator and pole respectively",
    options: [
      "Decreases, decreases",
      "Increases, remains constant",
      "Decreases, remains constant",
      "Remains constant, decreases"
    ],
    correct_index: 1,
    topic: "Effect of Ceasing Rotation on Gravity",
    difficulty: "easy",
    image_url: getImageUrl(181),
    solution: "At the equator ($\\lambda = 0^\\circ$), $g_e = g_0 - R\\omega^2$. If the Earth stops rotating ($\\omega = 0$), $g_e$ increases to $g_0$. At the poles ($\\lambda = 90^\\circ$), $g_p = g_0$ regardless of rotation. Hence, gravity increases at the equator and remains constant at the poles."
  },
  {
    q_num: 182,
    question_text: "If a body is projected with a speed equal to half of escape speed from the surface of the earth, then the maximum height attained by it is ($R = \\text{radius of the earth}$)",
    options: [
      "\\frac{R}{3}",
      "\\frac{R}{2}",
      "\\frac{R}{6}",
      "\\frac{2R}{3}"
    ],
    correct_index: 0,
    topic: "Maximum Height with Half Escape Speed",
    difficulty: "medium",
    image_url: getImageUrl(182),
    solution: "Given $v = \\frac{1}{2}v_e$, so $v^2 = \\frac{1}{4}v_e^2 = \\frac{1}{4}\\left(\\frac{2GM}{R}\\right) = \\frac{GM}{2R}$. By conservation of energy at maximum height $h$ (where speed is 0):\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = -\\frac{GMm}{R+h}$$\n$$\\frac{GM}{4R} - \\frac{GM}{R} = -\\frac{GM}{R+h} \\implies -\\frac{3}{4R} = -\\frac{1}{R+h} \\implies R+h = \\frac{4R}{3} \\implies h = \\frac{R}{3}$$"
  },
  {
    q_num: 183,
    question_text: "Which of the following cannot be used to measure time in a spaceship orbiting around the earth?",
    options: [
      "Atomic watch",
      "A watch using electric oscillation",
      "A watch using elastic vibrations",
      "Pendulum clock"
    ],
    correct_index: 3,
    topic: "Time Measurement in Orbiting Spaceship",
    difficulty: "easy",
    image_url: getImageUrl(183),
    solution: "An orbiting spaceship is in a state of continuous free fall, resulting in effective weightlessness ($g_{\\text{eff}} = 0$). The restoring torque of a simple pendulum depends on gravity ($T = 2\\pi\\sqrt{\\frac{l}{g_{\\text{eff}}}}$). In weightlessness, $T \\to \\infty$, so the pendulum cannot oscillate and cannot measure time. Spring clocks, atomic watches, and quartz watches do not rely on gravity and work normally."
  }
];

async function seed() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    console.log('Connected to Neon Database.');

    const chapterName = 'Gravitation';

    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE '%physics%' LIMIT 1");
    const subjectId = subjRes.rows[0]?.id || 11;

    let chapRes = await client.query("SELECT id FROM chapters WHERE name ILIKE $1 LIMIT 1", [chapterName]);
    let chapterId = chapRes.rows[0]?.id || 24;

    console.log(`Using chapter "${chapterName}" (ID: ${chapterId})`);
    console.log(`\nStarting insertion of ${QUESTIONS.length} Gravitation Batch 2 questions...`);

    let inserted = 0;
    let skipped = 0;

    for (const q of QUESTIONS) {
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE chapter = $1 AND question_text = $2",
        [chapterName, q.question_text]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`[${q.q_num}] Skipped existing question (ID: ${existing.rows[0].id})`);
        continue;
      }

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15
        ) RETURNING id
      `;

      const values = [
        'Physics',
        'single_choice',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${inserted}/${QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed Batch 2: Inserted ${inserted}, Skipped ${skipped}.`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
}

seed();
