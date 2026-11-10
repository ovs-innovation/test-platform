// NEET Rotational Motion PYQ Part 2: Q31 to Q60
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'rotational_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ROTATIONAL_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'NEET 2016 Phase 2',
    question: "Two rotating bodies $A$ and $B$ of masses $m$ and $2m$ with moments of inertia $I_A$ and $I_B$ ($I_B > I_A$) have equal kinetic energy of rotation. If $L_A$ and $L_B$ be their angular momenta respectively, then",
    options: [
      "$L_A = \\frac{L_B}{2}$",
      "$L_A = 2L_B$",
      "$L_B > L_A$",
      "$L_A > L_B$"
    ],
    correctIndex: 2,
    solution: "1. The rotational kinetic energy in terms of angular momentum is:\n$$K = \\frac{L^2}{2I} \\implies L = \\sqrt{2IK}$$\n\n2. Given that both bodies have equal rotational kinetic energy ($K_A = K_B$):\n$$\\frac{L_B}{L_A} = \\sqrt{\\frac{I_B}{I_A}}$$\n\n3. Since $I_B > I_A$, we have:\n$$\\sqrt{\\frac{I_B}{I_A}} > 1 \\implies L_B > L_A$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 32,
    exam: 'NEET 2016 Phase 2',
    question: "A solid sphere of mass $m$ and radius $R$ is rotating about its diameter. A solid cylinder of same mass and same radius is also rotating about its geometrical axis with an angular speed twice that of the sphere. The ratio of their kinetic energies of rotation ($E_{\\text{sphere}} / E_{\\text{cylinder}}$) will be",
    options: [
      "$2 : 3$",
      "$1 : 5$",
      "$1 : 4$",
      "$3 : 1$"
    ],
    correctIndex: 1,
    solution: "1. Moment of inertia of the solid sphere: $I_{\\text{sph}} = \\frac{2}{5} m R^2$.\nMoment of inertia of the solid cylinder: $I_{\\text{cyl}} = \\frac{1}{2} m R^2$.\n\n2. Let the angular speed of the sphere be $\\omega$, then $\\omega_{\\text{cyl}} = 2\\omega$.\n\n3. Rotational kinetic energies are:\n$$E_{\\text{sphere}} = \\frac{1}{2} I_{\\text{sph}} \\omega^2 = \\frac{1}{2} \\left(\\frac{2}{5} m R^2\\right) \\omega^2 = \\frac{1}{5} m R^2 \\omega^2$$\n$$E_{\\text{cylinder}} = \\frac{1}{2} I_{\\text{cyl}} (2\\omega)^2 = \\frac{1}{2} \\left(\\frac{1}{2} m R^2\\right) (4\\omega^2) = m R^2 \\omega^2$$\n\n4. Taking the ratio:\n$$\\frac{E_{\\text{sphere}}}{E_{\\text{cylinder}}} = \\frac{\\frac{1}{5} m R^2 \\omega^2}{m R^2 \\omega^2} = \\frac{1}{5} = 1 : 5$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 33,
    exam: 'NEET 2016 Phase 2',
    question: "A light rod of length $l$ has two masses $m_1$ and $m_2$ attached to its two ends. The moment of inertia of the system about an axis perpendicular to the rod and passing through the centre of mass is",
    options: [
      "$\\frac{m_1 m_2}{m_1 + m_2} l^2$",
      "$\\frac{m_1 + m_2}{m_1 m_2} l^2$",
      "$(m_1 + m_2)l^2$",
      "$\\sqrt{m_1 m_2} l^2$"
    ],
    correctIndex: 0,
    solution: "1. The distances of $m_1$ and $m_2$ from the centre of mass are:\n$$r_1 = \\frac{m_2}{m_1 + m_2} l, \\quad r_2 = \\frac{m_1}{m_1 + m_2} l$$\n\n2. Moment of inertia about the axis passing through the centre of mass:\n$$I = m_1 r_1^2 + m_2 r_2^2 = m_1 \\left(\\frac{m_2 l}{m_1 + m_2}\\right)^2 + m_2 \\left(\\frac{m_1 l}{m_1 + m_2}\\right)^2$$\n$$I = \\frac{m_1 m_2^2 + m_2 m_1^2}{(m_1 + m_2)^2} l^2 = \\frac{m_1 m_2 (m_1 + m_2)}{(m_1 + m_2)^2} l^2 = \\frac{m_1 m_2}{m_1 + m_2} l^2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 34,
    exam: 'NEET 2016 Phase 1',
    question: "A disc and a sphere of same radius but different masses roll off on two inclined planes of the same altitude and length. Which one of the two objects gets to the bottom of the plane first?",
    options: [
      "Both reach at the same time",
      "Depends on their masses",
      "Disc",
      "Sphere"
    ],
    correctIndex: 3,
    solution: "1. The acceleration of a body rolling down an inclined plane of inclination $\\theta$ is:\n$$a = \\frac{g \\sin\\theta}{1 + \\frac{K^2}{R^2}}$$\n\n2. For a solid sphere: $\\frac{K^2}{R^2} = \\frac{2}{5} = 0.4 \\implies a_{\\text{sphere}} = \\frac{g \\sin\\theta}{1.4} \\approx 0.71 g \\sin\\theta$.\nFor a circular disc: $\\frac{K^2}{R^2} = \\frac{1}{2} = 0.5 \\implies a_{\\text{disc}} = \\frac{g \\sin\\theta}{1.5} \\approx 0.67 g \\sin\\theta$.\n\n3. Since $a_{\\text{sphere}} > a_{\\text{disc}}$, the sphere accelerates faster and reaches the bottom first.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 35,
    exam: 'NEET 2016 Phase 1',
    question: "From a disc of radius $R$ and mass $M$, a circular hole of diameter $R$, whose rim passes through the centre is cut. What is the moment of inertia of the remaining part of the disc about a perpendicular axis, passing through the centre?",
    options: [
      "$11 MR^2 / 32$",
      "$9 MR^2 / 32$",
      "$15 MR^2 / 32$",
      "$13 MR^2 / 32$"
    ],
    correctIndex: 3,
    solution: "1. Mass is proportional to area. The cut disc has radius $r = R/2$, so its area is $\\frac{1}{4}$ of the original disc:\n$$m = \\frac{M}{4}$$\n\n2. The centre of the removed disc is at distance $d = R/2$ from the origin (centre of original disc). By the parallel axis theorem:\n$$I_{\\text{removed}} = \\frac{1}{2} m r^2 + m d^2 = \\frac{1}{2} \\left(\\frac{M}{4}\\right) \\left(\\frac{R}{2}\\right)^2 + \\left(\\frac{M}{4}\\right) \\left(\\frac{R}{2}\\right)^2$$\n$$I_{\\text{removed}} = \\frac{M R^2}{32} + \\frac{M R^2}{16} = \\frac{3 M R^2}{32}$$\n\n3. The original disc has moment of inertia $I_0 = \\frac{1}{2} M R^2 = \\frac{16 M R^2}{32}$.\n\n4. For the remaining part:\n$$I_{\\text{remaining}} = I_0 - I_{\\text{removed}} = \\frac{16 M R^2}{32} - \\frac{3 M R^2}{32} = \\frac{13 M R^2}{32}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 36,
    exam: 'NEET 2016 Phase 1',
    question: "A uniform circular disc of radius $50\\text{ cm}$ at rest is free to turn about an axis which is perpendicular to its plane and passes through its centre. It is subjected to a torque which produces a constant angular acceleration of $2.0\\text{ rad s}^{-2}$. Its net acceleration in $\\text{m s}^{-2}$ at the end of $2.0\\text{ s}$ is approximately",
    options: [
      "$6.0$",
      "$3.0$",
      "$8.0$",
      "$7.0$"
    ],
    correctIndex: 2,
    solution: "1. Angular speed at $t = 2.0\\text{ s}$:\n$$\\omega = \\alpha t = 2.0 \\times 2.0 = 4.0\\text{ rad/s}$$\n\n2. Tangential acceleration of a point on the rim ($R = 0.50\\text{ m}$):\n$$a_t = \\alpha R = 2.0 \\times 0.50 = 1.0\\text{ m/s}^2$$\n\n3. Centripetal (radial) acceleration:\n$$a_c = \\omega^2 R = (4.0)^2 \\times 0.50 = 16 \\times 0.50 = 8.0\\text{ m/s}^2$$\n\n4. Net acceleration:\n$$a_{\\text{net}} = \\sqrt{a_t^2 + a_c^2} = \\sqrt{1.0^2 + 8.0^2} = \\sqrt{65} \\approx 8.06\\text{ m/s}^2 \\approx 8.0\\text{ m/s}^2$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 37,
    exam: 'AIPMT 2015',
    question: "Point masses $m_1$ and $m_2$ are placed at the opposite ends of a rigid rod of length $L$, and negligible mass. The rod is to be set rotating about an axis perpendicular to it. The position of point $P$ on this rod through which the axis should pass so that the work required to set the rod rotating with angular velocity $\\omega_0$ is minimum, is given by",
    imageUrl: diagrams.rot_q37_diagram || null,
    image_url: diagrams.rot_q37_diagram || null,
    options: [
      "$x = \\frac{m_2}{m_1} L$",
      "$x = \\frac{m_2 L}{m_1 + m_2}$",
      "$x = \\frac{m_1 L}{m_1 + m_2}$",
      "$x = \\frac{m_1}{m_2} L$"
    ],
    correctIndex: 1,
    solution: "1. The work required to rotate the rod with angular velocity $\\omega_0$ is $W = \\frac{1}{2} I \\omega_0^2$.\n\n2. Since $\\omega_0$ is fixed, the work $W$ is minimum when the moment of inertia $I$ about point $P$ is minimum.\n\n3. By the parallel axis theorem, the moment of inertia of any system is always minimum about an axis passing through its centre of mass.\n\n4. Distance of the centre of mass from mass $m_1$ is:\n$$x = \\frac{m_2 L}{m_1 + m_2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 38,
    exam: 'AIPMT 2015',
    question: "An automobile moves on a road with a speed of $54\\text{ km h}^{-1}$. The radius of its wheels is $0.45\\text{ m}$ and the moment of inertia of the wheel about its axis of rotation is $3\\text{ kg m}^2$. If the vehicle is brought to rest in $15\\text{ s}$, the magnitude of average torque transmitted by its brakes to the wheel is",
    options: [
      "$10.86\\text{ kg m}^2\\text{ s}^{-2}$",
      "$2.86\\text{ kg m}^2\\text{ s}^{-2}$",
      "$6.66\\text{ kg m}^2\\text{ s}^{-2}$",
      "$8.58\\text{ kg m}^2\\text{ s}^{-2}$"
    ],
    correctIndex: 2,
    solution: "1. Initial linear speed: $v = 54 \\times \\frac{5}{18} = 15\\text{ m/s}$.\nInitial angular velocity of the wheel: $\\omega_0 = \\frac{v}{R} = \\frac{15}{0.45} = \\frac{100}{3}\\text{ rad/s}$.\n\n2. Angular retardation to stop in $t = 15\\text{ s}$:\n$$\\alpha = \\frac{\\omega_0}{t} = \\frac{100/3}{15} = \\frac{100}{45} = \\frac{20}{9}\\text{ rad/s}^2$$\n\n3. Magnitude of average braking torque:\n$$\\tau = I \\alpha = 3 \\times \\frac{20}{9} = \\frac{20}{3} \\approx 6.66\\text{ kg m}^2\\text{ s}^{-2}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 39,
    exam: 'AIPMT 2015',
    question: "A force $\\vec{F} = \\alpha\\hat{i} + 3\\hat{j} + 6\\hat{k}$ is acting at a point $\\vec{r} = 2\\hat{i} - 6\\hat{j} - 12\\hat{k}$. The value of $\\alpha$ for which angular momentum about origin is conserved is",
    options: [
      "$\\text{zero}$",
      "$1$",
      "$-1$",
      "$2$"
    ],
    correctIndex: 2,
    solution: "1. Angular momentum is conserved when the net torque about the origin is zero:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$$\n\n2. For the cross product of two non-zero vectors to vanish, they must be collinear (parallel or antiparallel), meaning their components must be proportional:\n$$\\frac{\\alpha}{2} = \\frac{3}{-6} = \\frac{6}{-12}$$\n$$\\frac{\\alpha}{2} = -\\frac{1}{2} \\implies \\alpha = -1$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 40,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "A rod of weight $W$ is supported by two parallel knife edges $A$ and $B$ and is in equilibrium in a horizontal position. The knives are at a distance $d$ from each other. The centre of mass of the rod is at distance $x$ from $A$. The normal reaction on $A$ is",
    options: [
      "$\\frac{W(d - x)}{x}$",
      "$\\frac{W(d - x)}{d}$",
      "$\\frac{Wx}{d}$",
      "$\\frac{Wd}{x}$"
    ],
    correctIndex: 1,
    solution: "1. Let $N_A$ and $N_B$ be the normal reactions at knife edges $A$ and $B$.\n\n2. Taking torque about knife edge $B$ for rotational equilibrium:\n$$\\sum \\tau_B = 0 \\implies N_A \\cdot d - W(d - x) = 0$$\n$$N_A \\cdot d = W(d - x) \\implies N_A = \\frac{W(d - x)}{d}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 41,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "A mass $m$ moves in a circle on a smooth horizontal plane with velocity $v_0$ at a radius $R_0$. The mass is attached to a string which passes through a smooth hole in the plane as shown. The tension in the string is increased gradually and finally $m$ moves in a circle of radius $\\frac{R_0}{2}$. The final value of the kinetic energy is",
    imageUrl: diagrams.rot_q41_diagram || null,
    image_url: diagrams.rot_q41_diagram || null,
    options: [
      "$2mv_0^2$",
      "$\\frac{1}{2}mv_0^2$",
      "$mv_0^2$",
      "$\\frac{1}{4}mv_0^2$"
    ],
    correctIndex: 0,
    solution: "1. The tension acts radially towards the central hole, exerting zero torque about the hole. Thus, angular momentum is conserved:\n$$L = m v_0 R_0 = m v_f R_f$$\n\n2. Given $R_f = \\frac{R_0}{2}$:\n$$m v_0 R_0 = m v_f \\left(\\frac{R_0}{2}\\right) \\implies v_f = 2v_0$$\n\n3. Final kinetic energy:\n$$K_f = \\frac{1}{2} m v_f^2 = \\frac{1}{2} m (2v_0)^2 = 2 m v_0^2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 42,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "Three identical spherical shells, each of mass $m$ and radius $r$ are placed as shown in figure. Consider an axis $XX'$ which is touching to two shells and passing through diameter of third shell. Moment of inertia of the system consisting of these three spherical shells about $XX'$ axis is",
    imageUrl: diagrams.rot_q42_diagram || null,
    image_url: diagrams.rot_q42_diagram || null,
    options: [
      "$\\frac{16}{5} mr^2$",
      "$4mr^2$",
      "$\\frac{11}{5} mr^2$",
      "$3mr^2$"
    ],
    correctIndex: 1,
    solution: "1. For the central shell through which $XX'$ passes along its diameter:\n$$I_1 = \\frac{2}{3} m r^2$$\n\n2. For each of the two outer shells, the axis $XX'$ is tangential to the shell. By the parallel axis theorem:\n$$I_2 = I_3 = \\frac{2}{3} m r^2 + m r^2 = \\frac{5}{3} m r^2$$\n\n3. Total moment of inertia of the three shells:\n$$I = I_1 + I_2 + I_3 = \\frac{2}{3} m r^2 + 2 \\left(\\frac{5}{3} m r^2\\right) = \\frac{12}{3} m r^2 = 4mr^2$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 43,
    exam: 'AIPMT 2014',
    question: "A solid cylinder of mass $50\\text{ kg}$ and radius $0.5\\text{ m}$ is free to rotate about the horizontal axis. A massless string is wound round the cylinder with one end attached to it and other hanging freely. Tension in the string required to produce an angular acceleration of $2\\text{ revolutions s}^{-2}$ is",
    options: [
      "$25\\text{ N}$",
      "$50\\text{ N}$",
      "$78.5\\text{ N}$",
      "$157\\text{ N}$"
    ],
    correctIndex: 3,
    solution: "1. Angular acceleration in radians:\n$$\\alpha = 2\\text{ rev/s}^2 = 2 \\times 2\\pi = 4\\pi\\text{ rad/s}^2$$\n\n2. Moment of inertia of the solid cylinder:\n$$I = \\frac{1}{2} M R^2 = \\frac{1}{2} (50)(0.5)^2 = 25 \\times 0.25 = 6.25\\text{ kg m}^2$$\n\n3. Torque $\\tau = T R = I \\alpha$:\n$$T (0.5) = 6.25 \\times 4\\pi = 25\\pi \\implies T = \\frac{25\\pi}{0.5} = 50\\pi \\approx 50 \\times 3.1416 = 157\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 44,
    exam: 'AIPMT 2014',
    question: "The ratio of the accelerations for a solid sphere (mass $m$ and radius $R$) rolling down an incline of angle $\\theta$ without slipping and slipping down the incline without rolling is",
    options: [
      "$5 : 7$",
      "$2 : 3$",
      "$2 : 5$",
      "$7 : 5$"
    ],
    correctIndex: 0,
    solution: "1. For rolling without slipping down an inclined plane:\n$$a_{\\text{roll}} = \\frac{g \\sin\\theta}{1 + \\frac{K^2}{R^2}} = \\frac{g \\sin\\theta}{1 + \\frac{2}{5}} = \\frac{5}{7} g \\sin\\theta$$\n\n2. For slipping down a frictionless incline without rolling:\n$$a_{\\text{slip}} = g \\sin\\theta$$\n\n3. Ratio of accelerations:\n$$\\frac{a_{\\text{roll}}}{a_{\\text{slip}}} = \\frac{\\frac{5}{7} g \\sin\\theta}{g \\sin\\theta} = \\frac{5}{7} = 5 : 7$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 45,
    exam: 'NEET 2013 (Karnataka)',
    question: "The ratio of radii of gyration of a circular ring and a circular disc, of the same mass and radius, about an axis passing through their centres and perpendicular to their planes are",
    options: [
      "$1 : \\sqrt{2}$",
      "$3 : 2$",
      "$2 : 1$",
      "$\\sqrt{2} : 1$"
    ],
    correctIndex: 3,
    solution: "1. For a circular ring about its perpendicular central axis:\n$$I_{\\text{ring}} = M R^2 = M K_{\\text{ring}}^2 \\implies K_{\\text{ring}} = R$$\n\n2. For a circular disc about its perpendicular central axis:\n$$I_{\\text{disc}} = \\frac{1}{2} M R^2 = M K_{\\text{disc}}^2 \\implies K_{\\text{disc}} = \\frac{R}{\\sqrt{2}}$$\n\n3. The ratio is:\n$$\\frac{K_{\\text{ring}}}{K_{\\text{disc}}} = \\frac{R}{R/\\sqrt{2}} = \\frac{\\sqrt{2}}{1} = \\sqrt{2} : 1$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 46,
    exam: 'NEET 2013 (Karnataka)',
    question: "Two discs are rotating about their axes, normal to the discs and passing through the centres of the discs. Disc $D_1$ has $2\\text{ kg}$ mass and $0.2\\text{ m}$ radius and initial angular velocity of $50\\text{ rad s}^{-1}$. Disc $D_2$ has $4\\text{ kg}$ mass, $0.1\\text{ m}$ radius and initial angular velocity of $200\\text{ rad s}^{-1}$. The two discs are brought in contact face to face, with their axes of rotation coincident. The final angular velocity (in $\\text{rad s}^{-1}$) of the system is",
    options: [
      "$60$",
      "$100$",
      "$120$",
      "$40$"
    ],
    correctIndex: 1,
    solution: "1. Moments of inertia of the two discs:\n$$I_1 = \\frac{1}{2} m_1 r_1^2 = \\frac{1}{2} (2)(0.2)^2 = 0.04\\text{ kg m}^2$$\n$$I_2 = \\frac{1}{2} m_2 r_2^2 = \\frac{1}{2} (4)(0.1)^2 = 0.02\\text{ kg m}^2$$\n\n2. By conservation of angular momentum:\n$$L_i = L_f \\implies I_1 \\omega_1 + I_2 \\omega_2 = (I_1 + I_2) \\omega$$\n$$\\omega = \\frac{0.04 \\times 50 + 0.02 \\times 200}{0.04 + 0.02} = \\frac{2 + 4}{0.06} = \\frac{6}{0.06} = 100\\text{ rad s}^{-1}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 47,
    exam: 'NEET 2013',
    question: "A rod $PQ$ of mass $M$ and length $L$ is hinged at end $P$. The rod is kept horizontal by a massless string tied to point $Q$ as shown in figure. When string is cut, the initial angular acceleration of the rod is",
    imageUrl: diagrams.rot_q47_diagram || null,
    image_url: diagrams.rot_q47_diagram || null,
    options: [
      "$\\frac{2g}{L}$",
      "$\\frac{2g}{3L}$",
      "$\\frac{3g}{2L}$",
      "$\\frac{g}{L}$"
    ],
    correctIndex: 2,
    solution: "1. When the string is cut, the weight $Mg$ acting at the center of mass ($L/2$ from $P$) produces a restoring torque about hinge $P$:\n$$\\tau = Mg \\left(\\frac{L}{2}\\right)$$\n\n2. The moment of inertia of the rod about one end $P$ is:\n$$I = \\frac{1}{3} M L^2$$\n\n3. The initial angular acceleration is:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{MgL / 2}{ML^2 / 3} = \\frac{3g}{2L}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 48,
    exam: 'NEET 2013',
    question: "A small object of uniform density rolls up a curved surface with an initial velocity $v$. It reaches upto a maximum height of $\\frac{3v^2}{4g}$ with respect to the initial position. The object is",
    options: [
      "hollow sphere",
      "disc",
      "ring",
      "solid sphere"
    ],
    correctIndex: 1,
    solution: "1. By conservation of mechanical energy:\n$$\\frac{1}{2} M v^2 \\left(1 + \\frac{K^2}{R^2}\\right) = Mgh$$\n\n2. Substituting $h = \\frac{3v^2}{4g}$:\n$$\\frac{1}{2} M v^2 \\left(1 + \\frac{K^2}{R^2}\\right) = Mg \\left(\\frac{3v^2}{4g}\\right) = \\frac{3}{4} M v^2$$\n$$1 + \\frac{K^2}{R^2} = \\frac{3}{2} \\implies \\frac{K^2}{R^2} = \\frac{1}{2}$$\n\n3. Since $\\frac{K^2}{R^2} = \\frac{1}{2}$, the object is a circular disc (or solid cylinder).\n\nHence, the correct option is (B)."
  },
  {
    qNum: 49,
    exam: 'AIPMT 2012 Mains',
    question: "A circular platform is mounted on a frictionless vertical axle. Its radius $R = 2\\text{ m}$ and its moment of inertia about the axle is $200\\text{ kg m}^2$. It is initially at rest. A $50\\text{ kg}$ man stands on the edge of the platform and begins to walk along the edge at the speed of $1\\text{ ms}^{-1}$ relative to the ground. Time taken by the man to complete one revolution is",
    options: [
      "$\\pi\\text{ s}$",
      "$\\frac{3\\pi}{2}\\text{ s}$",
      "$2\\pi\\text{ s}$",
      "$\\frac{\\pi}{2}\\text{ s}$"
    ],
    correctIndex: 2,
    solution: "1. By conservation of angular momentum about the axle (initially at rest, $L_i = 0$):\n$$L_f = m v R - I \\omega = 0 \\implies (50)(1)(2) = 200 \\omega \\implies \\omega = 0.5\\text{ rad/s}$$\n\n2. Angular speed of the man relative to the ground: $\\omega_{\\text{man}} = \\frac{v}{R} = \\frac{1}{2} = 0.5\\text{ rad/s}$.\n\n3. Relative angular speed between man and platform:\n$$\\omega_{\\text{rel}} = \\omega_{\\text{man}} - (-\\omega) = 0.5 + 0.5 = 1.0\\text{ rad/s}$$\n\n4. Time taken to complete one revolution relative to the platform:\n$$T = \\frac{2\\pi}{\\omega_{\\text{rel}}} = \\frac{2\\pi}{1.0} = 2\\pi\\text{ s}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 50,
    exam: 'AIPMT 2012 Mains',
    question: "The moment of inertia of a uniform circular disc is maximum about an axis perpendicular to the disc and passing through",
    imageUrl: diagrams.rot_q50_diagram || null,
    image_url: diagrams.rot_q50_diagram || null,
    options: [
      "$B$",
      "$C$",
      "$D$",
      "$A$"
    ],
    correctIndex: 0,
    solution: "1. By the parallel axis theorem, the moment of inertia about any axis perpendicular to the disc passing through a point $P$ is:\n$$I_P = I_{\\text{cm}} + M d^2$$\nwhere $d$ is the distance from the centre of mass ($A$) to point $P$.\n\n2. Since $I_{\\text{cm}}$ and $M$ are constant, $I_P$ is maximum where distance $d$ from the centre $A$ is maximum.\n\n3. In the figure, point $B$ lies on the circumference (farthest from centre $A$), whereas $C$ and $D$ lie inside the disc. Thus, $d$ is maximum at $B$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 51,
    exam: 'AIPMT 2012 Prelims',
    question: "A solid cylinder of mass $3\\text{ kg}$ is rolling on a horizontal surface with velocity $4\\text{ m s}^{-1}$. It collides with a horizontal spring of force constant $200\\text{ N m}^{-1}$. The maximum compression produced in the spring will be",
    options: [
      "$0.5\\text{ m}$",
      "$0.6\\text{ m}$",
      "$0.7\\text{ m}$",
      "$0.2\\text{ m}$"
    ],
    correctIndex: 1,
    solution: "1. Total kinetic energy of the rolling solid cylinder:\n$$E_k = \\frac{1}{2} M v^2 \\left(1 + \\frac{K^2}{R^2}\\right) = \\frac{1}{2} M v^2 \\left(1 + \\frac{1}{2}\\right) = \\frac{3}{4} M v^2$$\n$$E_k = \\frac{3}{4} (3) (4)^2 = \\frac{3}{4} \\times 48 = 36\\text{ J}$$\n\n2. At maximum compression $x$, all kinetic energy is converted into elastic potential energy of the spring:\n$$\\frac{1}{2} k x^2 = E_k \\implies \\frac{1}{2} (200) x^2 = 36$$\n$$100 x^2 = 36 \\implies x^2 = 0.36 \\implies x = 0.6\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 52,
    exam: 'AIPMT 2012 Prelims',
    question: "When a mass is rotating in a plane about a fixed point, its angular momentum is directed along",
    options: [
      "a line perpendicular to the plane of rotation",
      "the line making an angle of $45^\\circ$ to the plane of rotation",
      "the radius",
      "the tangent to the orbit"
    ],
    correctIndex: 0,
    solution: "1. Angular momentum is defined as $\\vec{L} = \\vec{r} \\times \\vec{p}$.\n\n2. By the properties of the vector cross product, $\\vec{L}$ is perpendicular to the plane containing both the position vector $\\vec{r}$ and the linear momentum $\\vec{p}$.\n\n3. Therefore, it is directed along a line perpendicular to the plane of rotation.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 53,
    exam: 'AIPMT 2012 Prelims',
    question: "ABC is an equilateral triangle with $O$ as its centre. $\\vec{F}_1, \\vec{F}_2$ and $\\vec{F}_3$ represent three forces acting along the sides $AB, BC$ and $AC$ respectively. If the total torque about $O$ is zero then magnitude of $\\vec{F}_3$ is",
    imageUrl: diagrams.rot_q53_diagram || null,
    image_url: diagrams.rot_q53_diagram || null,
    options: [
      "$F_1 + F_2$",
      "$F_1 - F_2$",
      "$\\frac{F_1 + F_2}{2}$",
      "$2(F_1 + F_2)$"
    ],
    correctIndex: 0,
    solution: "1. The perpendicular distance from the centroid $O$ of an equilateral triangle to each of its three sides is identical ($r$).\n\n2. Taking torque about $O$:\nForces $\\vec{F}_1$ (along $AB$) and $\\vec{F}_2$ (along $BC$) exert torque in the clockwise sense, while $\\vec{F}_3$ (along $AC$) exerts torque in the counter-clockwise sense.\n\n3. Setting the net torque to zero:\n$$\\tau_{\\text{net}} = F_1 r + F_2 r - F_3 r = 0 \\implies F_3 = F_1 + F_2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 54,
    exam: 'AIPMT 2011 Mains',
    question: "A small mass attached to a string rotates on a frictionless table top as shown. If the tension in the string is increased by pulling the string causing the radius of the circular motion to decrease by a factor of 2, the kinetic energy of the mass will",
    imageUrl: diagrams.rot_q54_diagram || null,
    image_url: diagrams.rot_q54_diagram || null,
    options: [
      "decrease by a factor of 2",
      "remain constant",
      "increase by a factor of 2",
      "increase by a factor of 4"
    ],
    correctIndex: 3,
    solution: "1. Since tension acts radially towards the center, the torque about the center is zero ($\\tau = 0$), so angular momentum $L$ is conserved:\n$$L = m v r = \\text{constant}$$\n\n2. Kinetic energy in terms of angular momentum:\n$$K = \\frac{L^2}{2 m r^2}$$\n\n3. When the radius decreases by a factor of 2 ($r' = r/2$):\n$$K' = \\frac{L^2}{2 m (r/2)^2} = 4 \\left(\\frac{L^2}{2mr^2}\\right) = 4K$$\n\nHence, the kinetic energy increases by a factor of 4.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 55,
    exam: 'AIPMT 2011 Prelims',
    question: "The instantaneous angular position of a point on a rotating wheel is given by the equation $\\theta(t) = 2t^3 - 6t^2$. The torque on the wheel becomes zero at",
    options: [
      "$t = 1\\text{ s}$",
      "$t = 0.5\\text{ s}$",
      "$t = 0.25\\text{ s}$",
      "$t = 2\\text{ s}$"
    ],
    correctIndex: 0,
    solution: "1. Angular acceleration $\\alpha$ is the second time derivative of angular position:\n$$\\omega = \\frac{d\\theta}{dt} = 6t^2 - 12t$$\n$$\\alpha = \\frac{d^2\\theta}{dt^2} = 12t - 12$$\n\n2. Torque $\\tau = I\\alpha$ becomes zero when $\\alpha = 0$:\n$$12t - 12 = 0 \\implies t = 1\\text{ s}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 56,
    exam: 'AIPMT 2011 Prelims',
    question: "The moment of inertia of a thin uniform rod of mass $M$ and length $L$ about an axis passing through its midpoint and perpendicular to its length is $I_0$. Its moment of inertia about an axis passing through one of its ends and perpendicular to its length is",
    options: [
      "$I_0 + ML^2/2$",
      "$I_0 + ML^2/4$",
      "$I_0 + 2ML^2$",
      "$I_0 + ML^2$"
    ],
    correctIndex: 1,
    solution: "1. The distance between the axis through the midpoint and the axis through one of its ends is $d = L/2$.\n\n2. By the parallel axis theorem:\n$$I_{\\text{end}} = I_{\\text{cm}} + M d^2 = I_0 + M \\left(\\frac{L}{2}\\right)^2 = I_0 + \\frac{ML^2}{4}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 57,
    exam: 'AIPMT 2010 Mains',
    question: "From a circular disc of radius $R$ and mass $9M$, a small disc of mass $M$ and radius $\\frac{R}{3}$ is removed concentrically. The moment of inertia of the remaining disc about an axis perpendicular to the plane of the disc and passing through its centre is",
    options: [
      "$\\frac{40}{9} MR^2$",
      "$MR^2$",
      "$4MR^2$",
      "$\\frac{4}{9} MR^2$"
    ],
    correctIndex: 0,
    solution: "1. Moment of inertia of the original complete disc:\n$$I_0 = \\frac{1}{2} (9M) R^2 = \\frac{9}{2} M R^2$$\n\n2. Moment of inertia of the removed concentric disc (mass $M$, radius $R/3$):\n$$I_{\\text{removed}} = \\frac{1}{2} M \\left(\\frac{R}{3}\\right)^2 = \\frac{1}{18} M R^2$$\n\n3. Moment of inertia of the remaining disc:\n$$I_{\\text{remaining}} = I_0 - I_{\\text{removed}} = \\frac{9}{2} M R^2 - \\frac{1}{18} M R^2 = \\frac{81 - 1}{18} M R^2 = \\frac{80}{18} M R^2 = \\frac{40}{9} M R^2$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 58,
    exam: 'AIPMT 2010 Mains',
    question: "A solid cylinder and a hollow cylinder, both of the same mass and same external diameter are released from the same height at the same time on an inclined plane. Both roll down without slipping. Which one will reach the bottom first?",
    options: [
      "Both together only when angle of inclination of plane is $45^\\circ$",
      "Both together",
      "Hollow cylinder",
      "Solid cylinder"
    ],
    correctIndex: 3,
    solution: "1. Acceleration of a body rolling without slipping down an incline is:\n$$a = \\frac{g \\sin\\theta}{1 + \\frac{K^2}{R^2}}$$\n\n2. For a solid cylinder: $\\frac{K^2}{R^2} = \\frac{1}{2} = 0.5 \\implies a_{\\text{solid}} = \\frac{g \\sin\\theta}{1.5}$.\nFor a hollow cylinder: $\\frac{K^2}{R^2} = 1.0 \\implies a_{\\text{hollow}} = \\frac{g \\sin\\theta}{2.0}$.\n\n3. Since $a_{\\text{solid}} > a_{\\text{hollow}}$, the solid cylinder has greater acceleration and reaches the bottom first.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 59,
    exam: 'AIPMT 2010 Mains',
    question: "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with constant angular velocity $\\omega$. Two objects each of mass $m$ are attached gently to the opposite ends of a diameter of the ring. The ring now rotates with angular velocity given by",
    options: [
      "$\\frac{(M + 2m)\\omega}{2m}$",
      "$\\frac{2M\\omega}{M + 2m}$",
      "$\\frac{(M + 2m)\\omega}{M}$",
      "$\\frac{M\\omega}{M + 2m}$"
    ],
    correctIndex: 3,
    solution: "1. Since no external torque acts on the system, angular momentum is conserved:\n$$L_i = L_f$$\n\n2. Initial moment of inertia: $I_1 = M r^2$.\nFinal moment of inertia with two masses $m$ at distance $r$ from axis:\n$$I_2 = M r^2 + 2m r^2 = (M + 2m)r^2$$\n\n3. Equating angular momenta:\n$$M r^2 \\omega = (M + 2m) r^2 \\omega' \\implies \\omega' = \\frac{M \\omega}{M + 2m}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 60,
    exam: 'AIPMT 2010 Prelims',
    question: "A circular disk of moment of inertia $I_t$ is rotating in a horizontal plane, about its symmetry axis, with a constant angular speed $\\omega_i$. Another disk of moment of inertia $I_b$ is dropped coaxially onto the rotating disk. Initially the second disk has zero angular speed. Eventually both the disks rotate with a constant angular speed $\\omega$. The energy lost by the initially rotating disc to friction is",
    options: [
      "$\\frac{1}{2} \\frac{I_b^2}{(I_t + I_b)} \\omega_i^2$",
      "$\\frac{1}{2} \\frac{I_t^2}{(I_t + I_b)} \\omega_i^2$",
      "$\\frac{I_b - I_t}{(I_t + I_b)} \\omega_i^2$",
      "$\\frac{1}{2} \\frac{I_b I_t}{(I_t + I_b)} \\omega_i^2$"
    ],
    correctIndex: 3,
    solution: "1. By conservation of angular momentum, the common angular velocity is:\n$$\\omega = \\frac{I_t \\omega_i}{I_t + I_b}$$\n\n2. The loss in kinetic energy during this completely inelastic rotational coupling is:\n$$\\Delta E = K_i - K_f = \\frac{1}{2} I_t \\omega_i^2 - \\frac{1}{2} (I_t + I_b) \\omega^2$$\n$$\\Delta E = \\frac{1}{2} I_t \\omega_i^2 - \\frac{1}{2} (I_t + I_b) \\left(\\frac{I_t \\omega_i}{I_t + I_b}\\right)^2 = \\frac{1}{2} I_t \\omega_i^2 \\left[1 - \\frac{I_t}{I_t + I_b}\\right] = \\frac{1}{2} \\frac{I_t I_b}{I_t + I_b} \\omega_i^2$$\n\nHence, the correct option is (D)."
  }
];

export default ROTATIONAL_PYQ_PART2;

