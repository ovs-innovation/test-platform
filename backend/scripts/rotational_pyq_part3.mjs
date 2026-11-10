// NEET Rotational Motion PYQ Part 3: Q61 to Q85
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.resolve(__dirname, 'rotational_diagram_urls.json');
const diagrams = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : {};

export const ROTATIONAL_PYQ_PART3 = [
  {
    qNum: 61,
    exam: 'AIPMT 2009',
    question: "A thin circular ring of mass $M$ and radius $R$ is rotating in a horizontal plane about an axis vertical to its plane with a constant angular velocity $\\omega$. If two objects each of mass $m$ be attached gently to the opposite ends of a diameter of the ring, the ring will then rotate with an angular velocity:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{\\omega M}{M + 2m}$",
      "$\\frac{\\omega(M - 2m)}{M + 2m}$",
      "$\\frac{\\omega M}{M + m}$",
      "$\\frac{\\omega(M + 2m)}{M}$"
    ],
    correctIndex: 0,
    solution: "1. Since no external torque acts about the axis of rotation, angular momentum is conserved:\n$$I_1 \\omega_1 = I_2 \\omega_2$$\n2. Initial moment of inertia of the ring:\n$$I_1 = M R^2$$\n3. Final moment of inertia when two particles of mass $m$ each are placed at distance $R$:\n$$I_2 = M R^2 + 2m R^2 = (M + 2m) R^2$$\n4. Solving for $\\omega_2$:\n$$\\omega_2 = \\frac{I_1}{I_2} \\omega = \\frac{M R^2}{(M + 2m) R^2} \\omega = \\frac{\\omega M}{M + 2m}$$\nHence, option (A) is correct."
  },
  {
    qNum: 62,
    exam: 'AIPMT 2009',
    question: "If $\\vec{F}$ is the force acting on a particle having position vector $\\vec{r}$ and $\\vec{\\tau}$ be the torque of this force about the origin, then:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\vec{r} \\cdot \\vec{\\tau} > 0$ and $\\vec{F} \\cdot \\vec{\\tau} < 0$",
      "$\\vec{r} \\cdot \\vec{\\tau} = 0$ and $\\vec{F} \\cdot \\vec{\\tau} = 0$",
      "$\\vec{r} \\cdot \\vec{\\tau} = 0$ and $\\vec{F} \\cdot \\vec{\\tau} \\neq 0$",
      "$\\vec{r} \\cdot \\vec{\\tau} \\neq 0$ and $\\vec{F} \\cdot \\vec{\\tau} = 0$"
    ],
    correctIndex: 1,
    solution: "1. The torque about the origin is defined as the cross product of position vector $\\vec{r}$ and force $\\vec{F}$:\n$$\\vec{\\tau} = \\vec{r} \\times \\vec{F}$$\n2. By the properties of cross products, the vector $\\vec{\\tau}$ is perpendicular to both $\\vec{r}$ and $\\vec{F}$.\n3. The dot product of two perpendicular vectors is zero:\n$$\\vec{r} \\cdot \\vec{\\tau} = 0 \\quad \\text{and} \\quad \\vec{F} \\cdot \\vec{\\tau} = 0$$\nHence, option (B) is correct."
  },
  {
    qNum: 63,
    exam: 'AIPMT 2009',
    question: "Four identical thin rods each of mass $M$ and length $l$, form a square frame. Moment of inertia of this frame about an axis through the centre of the square and perpendicular to its plane is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2}{3} M l^2$",
      "$\\frac{13}{3} M l^2$",
      "$\\frac{1}{3} M l^2$",
      "$\\frac{4}{3} M l^2$"
    ],
    correctIndex: 3,
    solution: "1. For a single rod of mass $M$ and length $l$, the moment of inertia about its center of mass perpendicular to the length is:\n$$I_{\\text{cm}} = \\frac{M l^2}{12}$$\n2. The perpendicular distance from the center of the square to the center of each rod is $d = \\frac{l}{2}$.\n3. By parallel axis theorem, the moment of inertia of one rod about the center of the square is:\n$$I_1 = I_{\\text{cm}} + M d^2 = \\frac{M l^2}{12} + M\\left(\\frac{l}{2}\\right)^2 = \\frac{M l^2}{12} + \\frac{M l^2}{4} = \\frac{M l^2}{3}$$\n4. For all four identical rods forming the frame:\n$$I = 4 I_1 = 4 \\times \\frac{M l^2}{3} = \\frac{4}{3} M l^2$$\nHence, option (D) is correct."
  },
  {
    qNum: 64,
    exam: 'AIPMT 2008',
    question: "A thin rod of length $L$ and mass $M$ is bent at its midpoint into two halves so that the angle between them is $90^\\circ$. The moment of inertia of the bent rod about an axis passing through the bending point and perpendicular to the plane defined by the two halves of the rod is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{M L^2}{6}$",
      "$\\frac{\\sqrt{2} M L^2}{24}$",
      "$\\frac{M L^2}{24}$",
      "$\\frac{M L^2}{12}$"
    ],
    correctIndex: 3,
    solution: "1. When bent at the midpoint, the rod consists of two halves, each of mass $m' = \\frac{M}{2}$ and length $l' = \\frac{L}{2}$.\n2. The moment of inertia of a thin rod about an axis passing through one of its ends and perpendicular to its length is:\n$$I_{\\text{end}} = \\frac{1}{3} m' (l')^2$$\n3. For each half:\n$$I_1 = \\frac{1}{3} \\left(\\frac{M}{2}\\right) \\left(\\frac{L}{2}\\right)^2 = \\frac{1}{3} \\times \\frac{M}{2} \\times \\frac{L^2}{4} = \\frac{M L^2}{24}$$\n4. By additivity of moments of inertia about the same axis:\n$$I = I_1 + I_2 = \\frac{M L^2}{24} + \\frac{M L^2}{24} = \\frac{M L^2}{12}$$\nHence, option (D) is correct."
  },
  {
    qNum: 65,
    exam: 'AIPMT 2008',
    question: "The ratio of the radii of gyration of a circular disc to that of a circular ring, each of same mass and radius, around their respective axes is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{2} : 1$",
      "$\\sqrt{2} : \\sqrt{3}$",
      "$\\sqrt{3} : \\sqrt{2}$",
      "$1 : \\sqrt{2}$"
    ],
    correctIndex: 3,
    solution: "1. The moment of inertia of a circular disc about its central symmetry axis is:\n$$I_{\\text{disc}} = \\frac{1}{2} M R^2 = M k_{\\text{disc}}^2 \\implies k_{\\text{disc}} = \\frac{R}{\\sqrt{2}}$$\n2. The moment of inertia of a circular ring about its central symmetry axis is:\n$$I_{\\text{ring}} = M R^2 = M k_{\\text{ring}}^2 \\implies k_{\\text{ring}} = R$$\n3. The ratio of radii of gyration is:\n$$\\frac{k_{\\text{disc}}}{k_{\\text{ring}}} = \\frac{R / \\sqrt{2}}{R} = \\frac{1}{\\sqrt{2}} = 1 : \\sqrt{2}$$\nHence, option (D) is correct."
  },
  {
    qNum: 66,
    exam: 'AIPMT 2007',
    question: "A particle of mass $m$ moves in the $XY$ plane with a velocity $v$ along the straight line $AB$. If the angular momentum of the particle with respect to origin $O$ is $L_A$ when it is at $A$ and $L_B$ when it is at $B$, then:",
    imageUrl: diagrams.rot_q66_diagram || null,
    image_url: diagrams.rot_q66_diagram || null,
    options: [
      "$L_A = L_B$",
      "the relationship between $L_A$ and $L_B$ depends upon the slope of the line $AB$",
      "$L_A < L_B$",
      "$L_A > L_B$"
    ],
    correctIndex: 0,
    solution: "1. The angular momentum of a particle about the origin $O$ is given by:\n$$L = m v r_\\perp$$\nwhere $r_\\perp$ is the perpendicular distance from the origin $O$ to the line of motion $AB$.\n2. As the particle moves along the straight line $AB$ with constant velocity $v$, the perpendicular distance $r_\\perp$ from the origin to the line remains constant.\n3. Therefore, $L_A = m v r_\\perp$ and $L_B = m v r_\\perp$, meaning $L_A = L_B$.\nHence, option (A) is correct."
  },
  {
    qNum: 67,
    exam: 'AIPMT 2007',
    question: "A uniform rod $AB$ of length $l$ and mass $m$ is free to rotate about point $A$. The rod is released from rest in the horizontal position. Given that the moment of inertia of the rod about $A$ is $\\frac{m l^2}{3}$, the initial angular acceleration of the rod will be:",
    imageUrl: diagrams.rot_q67_diagram || null,
    image_url: diagrams.rot_q67_diagram || null,
    options: [
      "$\\frac{2g}{3l}$",
      "$m g \\frac{l}{2}$",
      "$\\frac{3g}{2l}$",
      "$\\frac{2l}{3g}$"
    ],
    correctIndex: 2,
    solution: "1. The torque about the hinge point $A$ is due to gravity acting at the center of mass (distance $\\frac{l}{2}$ from $A$):\n$$\\tau = m g \\times \\frac{l}{2}$$\n2. The relationship between torque, moment of inertia, and angular acceleration is:\n$$\\tau = I \\alpha$$\n3. Substituting $I = \\frac{m l^2}{3}$:\n$$m g \\frac{l}{2} = \\left(\\frac{m l^2}{3}\\right) \\alpha \\implies \\alpha = \\frac{m g l / 2}{m l^2 / 3} = \\frac{3g}{2l}$$\nHence, option (C) is correct."
  },
  {
    qNum: 68,
    exam: 'AIPMT 2007',
    question: "A wheel has angular acceleration of $3.0\\text{ rad/sec}^2$ and an initial angular speed of $2.00\\text{ rad/sec}$. In a time of $2\\text{ sec}$ it has rotated through an angle (in radian) of:",
    imageUrl: null,
    image_url: null,
    options: [
      "$10$",
      "$12$",
      "$4$",
      "$6$"
    ],
    correctIndex: 0,
    solution: "1. Using the rotational kinematic equation:\n$$\\theta = \\omega_0 t + \\frac{1}{2} \\alpha t^2$$\n2. Given $\\omega_0 = 2.00\\text{ rad/s}$, $\\alpha = 3.0\\text{ rad/s}^2$, and $t = 2\\text{ s}$:\n$$\\theta = (2.00)(2) + \\frac{1}{2}(3.0)(2)^2 = 4 + 6 = 10\\text{ radian}$$\nHence, option (A) is correct."
  },
  {
    qNum: 69,
    exam: 'AIPMT 2006',
    question: "A uniform rod $AB$ of length $l$ and mass $m$ is free to rotate about point $A$. The rod is released from rest in the horizontal position. Given that the moment of inertia of the rod about $A$ is $\\frac{m l^2}{3}$, the initial angular acceleration of the rod will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2g}{3l}$",
      "$m g \\frac{l}{2}$",
      "$\\frac{3g}{2l}$",
      "$\\frac{2l}{3g}$"
    ],
    correctIndex: 2,
    solution: "1. Gravitational force acts at the center of gravity of the rod, at distance $\\frac{l}{2}$ from $A$:\n$$\\tau = m g \\frac{l}{2}$$\n2. Using $\\tau = I \\alpha$:\n$$\\alpha = \\frac{\\tau}{I} = \\frac{m g \\frac{l}{2}}{\\frac{m l^2}{3}} = \\frac{3g}{2l}$$\nHence, option (C) is correct."
  },
  {
    qNum: 70,
    exam: 'AIPMT 2006',
    question: "The moment of inertia of a uniform circular disc of radius $R$ and mass $M$ about an axis touching the disc at its diameter and normal to the disc is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{1}{2} M R^2$",
      "$M R^2$",
      "$2 M R^2$",
      "$\\frac{3}{2} M R^2$"
    ],
    correctIndex: 3,
    solution: "1. The axis is tangential to the edge of the disc and perpendicular (normal) to its plane.\n2. The moment of inertia of the disc about an axis passing through its center of mass perpendicular to the plane is:\n$$I_{\\text{cm}} = \\frac{1}{2} M R^2$$\n3. By the parallel axis theorem, with distance $d = R$:\n$$I = I_{\\text{cm}} + M R^2 = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2$$\nHence, option (D) is correct."
  },
  {
    qNum: 71,
    exam: 'AIPMT 2006',
    question: "A tube of length $L$ is filled completely with an incompressible liquid of mass $M$ and closed at both the ends. The tube is then rotated in a horizontal plane about one of its ends with a uniform angular velocity $\\omega$. The force exerted by the liquid at the other end is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$M \\omega^2 L$",
      "$\\frac{1}{2} M \\omega^2 L$",
      "$\\frac{1}{4} M \\omega^2 L$",
      "$\\frac{1}{2} M \\omega^2 L^2$"
    ],
    correctIndex: 1,
    solution: "1. Consider an infinitesimal liquid element of length $dx$ at distance $x$ from the rotation axis. Its mass is $dm = \\frac{M}{L} dx$.\n2. The centrifugal force on this element is:\n$$dF = (dm) \\omega^2 x = \\left(\\frac{M}{L} dx\\right) \\omega^2 x$$\n3. The total force exerted by the liquid is found by integrating from $x = 0$ to $x = L$:\n$$F = \\int_0^L \\frac{M \\omega^2}{L} x dx = \\frac{M \\omega^2}{L} \\left[\\frac{x^2}{2}\\right]_0^L = \\frac{1}{2} M \\omega^2 L$$\nHence, option (B) is correct."
  },
  {
    qNum: 72,
    exam: 'AIPMT 2005',
    question: "The moment of inertia of a uniform circular disc of radius $R$ and mass $M$ about an axis passing from the edge of the disc and normal to the disc is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$M R^2$",
      "$\\frac{1}{2} M R^2$",
      "$\\frac{3}{2} M R^2$",
      "$\\frac{7}{2} M R^2$"
    ],
    correctIndex: 2,
    solution: "1. The axis passes through the rim (edge) of the disc and is perpendicular to its plane.\n2. By the parallel axis theorem:\n$$I = I_{\\text{cm}} + M d^2$$\n3. Here $I_{\\text{cm}} = \\frac{1}{2} M R^2$ and $d = R$:\n$$I = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2$$\nHence, option (C) is correct."
  },
  {
    qNum: 73,
    exam: 'AIPMT 2005',
    question: "A drum of radius $R$ and mass $M$, rolls down without slipping along an inclined plane of angle $\\theta$. The frictional force:",
    imageUrl: null,
    image_url: null,
    options: [
      "dissipates energy as heat",
      "decreases the rotational motion",
      "decreases the rotational and translation motion",
      "converts translational energy to rotational energy."
    ],
    correctIndex: 3,
    solution: "1. In pure rolling without slipping, the point of contact between the drum and the inclined plane is instantaneously at rest.\n2. Therefore, static friction does zero work, and no mechanical energy is dissipated as heat.\n3. The static friction provides a torque about the center of mass that creates angular acceleration, thereby converting translational kinetic energy into rotational kinetic energy.\nHence, option (D) is correct."
  },
  {
    qNum: 74,
    exam: 'AIPMT 2005',
    question: "Two bodies have their moments of inertia $I$ and $2I$ respectively about their axis of rotation. If their kinetic energies of rotation are equal, their angular velocity will be in the ratio:",
    imageUrl: null,
    image_url: null,
    options: [
      "$2 : 1$",
      "$1 : 2$",
      "$\\sqrt{2} : 1$",
      "$1 : \\sqrt{2}$"
    ],
    correctIndex: 2,
    solution: "1. The rotational kinetic energy is given by:\n$$K = \\frac{1}{2} I \\omega^2$$\n2. Since the kinetic energies of both bodies are equal:\n$$\\frac{1}{2} I_1 \\omega_1^2 = \\frac{1}{2} I_2 \\omega_2^2$$\n3. Given $I_1 = I$ and $I_2 = 2I$:\n$$I \\omega_1^2 = 2I \\omega_2^2 \\implies \\frac{\\omega_1^2}{\\omega_2^2} = 2 \\implies \\frac{\\omega_1}{\\omega_2} = \\frac{\\sqrt{2}}{1} = \\sqrt{2} : 1$$\nHence, option (C) is correct."
  },
  {
    qNum: 75,
    exam: 'AIPMT 2004',
    question: "Three particles, each of mass $m\\text{ gram}$, are situated at the vertices of an equilateral triangle $ABC$ of side $l\\text{ cm}$ (as shown in the figure). The moment of inertia of the system about a line $AX$ perpendicular to $AB$ and in the plane of $ABC$, in $\\text{gram-cm}^2$ units will be:",
    imageUrl: diagrams.rot_q75_diagram || null,
    image_url: diagrams.rot_q75_diagram || null,
    options: [
      "$\\frac{3}{4} m l^2$",
      "$2 m l^2$",
      "$\\frac{5}{4} m l^2$",
      "$\\frac{3}{2} m l^2$"
    ],
    correctIndex: 2,
    solution: "1. Line $AX$ is perpendicular to side $AB$ at vertex $A$ in the plane of triangle $ABC$.\n2. Perpendicular distances of the three masses from axis $AX$:\n- Particle at $A$: distance $r_A = 0$\n- Particle at $B$: distance $r_B = l$\n- Particle at $C$: side $AC = l$ at angle $60^\\circ$ to $AB$. Since $AX \\perp AB$, the angle of $AC$ with $AX$ is $30^\\circ$, so the perpendicular distance from $C$ to $AX$ is:\n$$r_C = l \\cos 60^\\circ = \\frac{l}{2}$$\n3. Total moment of inertia:\n$$I = m r_A^2 + m r_B^2 + m r_C^2 = m(0)^2 + m(l)^2 + m\\left(\\frac{l}{2}\\right)^2 = m l^2 + \\frac{m l^2}{4} = \\frac{5}{4} m l^2$$\nHence, option (C) is correct."
  },
  {
    qNum: 76,
    exam: 'AIPMT 2004',
    question: "A wheel having moment of inertia $2\\text{ kg m}^2$ about its vertical axis, rotates at the rate of $60\\text{ rpm}$ about this axis. The torque which can stop the wheel's rotation in one minute would be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{2\\pi}{15}\\text{ N m}$",
      "$\\frac{\\pi}{12}\\text{ N m}$",
      "$\\frac{\\pi}{15}\\text{ N m}$",
      "$\\frac{\\pi}{18}\\text{ N m}$"
    ],
    correctIndex: 2,
    solution: "1. Initial angular velocity:\n$$\\omega_0 = 60\\text{ rpm} = 60 \\times \\frac{2\\pi}{60} = 2\\pi\\text{ rad/s}$$\n2. Final angular velocity $\\omega = 0$ in time $t = 1\\text{ min} = 60\\text{ s}$.\n3. Retardation $\\alpha$ is:\n$$\\alpha = \\frac{\\omega_0 - \\omega}{t} = \\frac{2\\pi - 0}{60} = \\frac{\\pi}{30}\\text{ rad/s}^2$$\n4. Stopping torque required:\n$$\\tau = I \\alpha = 2 \\times \\frac{\\pi}{30} = \\frac{\\pi}{15}\\text{ N m}$$\nHence, option (C) is correct."
  },
  {
    qNum: 77,
    exam: 'AIPMT 2004',
    question: "A round disc of moment of inertia $I_2$ about its axis perpendicular to its plane and passing through its centre is placed over another disc of moment of inertia $I_1$ rotating with an angular velocity $\\omega$ about the same axis. The final angular velocity of the combination of discs is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{I_2 \\omega}{I_1 + I_2}$",
      "$\\omega$",
      "$\\frac{I_1 \\omega}{I_1 + I_2}$",
      "$\\frac{(I_1 - I_2)\\omega}{I_1 + I_2}$"
    ],
    correctIndex: 2,
    solution: "1. Since no external torque acts about the axis of rotation, the total angular momentum is conserved:\n$$L_{\\text{initial}} = L_{\\text{final}}$$\n2. Initially, only the first disc is rotating:\n$$L_{\\text{initial}} = I_1 \\omega$$\n3. Finally, both discs rotate together with common angular velocity $\\omega'$:\n$$L_{\\text{final}} = (I_1 + I_2) \\omega'$$\n4. Equating the two expressions:\n$$I_1 \\omega = (I_1 + I_2) \\omega' \\implies \\omega' = \\frac{I_1 \\omega}{I_1 + I_2}$$\nHence, option (C) is correct."
  },
  {
    qNum: 78,
    exam: 'AIPMT 2004',
    question: "The ratio of the radii of gyration of a circular disc about a tangential axis in the plane of the disc and of a circular ring of the same radius about a tangential axis in the plane of the ring is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$2 : 3$",
      "$2 : 1$",
      "$\\sqrt{5} : \\sqrt{6}$",
      "$1 : \\sqrt{2}$"
    ],
    correctIndex: 2,
    solution: "1. For a circular disc about a diameter: $I_{\\text{dia}} = \\frac{1}{4} M R^2$.\nBy parallel axis theorem, about a tangential axis in the plane of the disc:\n$$I_{\\text{disc}} = \\frac{1}{4} M R^2 + M R^2 = \\frac{5}{4} M R^2 = M k_{\\text{disc}}^2 \\implies k_{\\text{disc}} = \\sqrt{\\frac{5}{4}} R$$\n2. For a circular ring about a diameter: $I_{\\text{dia}} = \\frac{1}{2} M R^2$.\nAbout a tangential axis in the plane of the ring:\n$$I_{\\text{ring}} = \\frac{1}{2} M R^2 + M R^2 = \\frac{3}{2} M R^2 = M k_{\\text{ring}}^2 \\implies k_{\\text{ring}} = \\sqrt{\\frac{3}{2}} R$$\n3. The ratio of radii of gyration is:\n$$\\frac{k_{\\text{disc}}}{k_{\\text{ring}}} = \\frac{\\sqrt{5/4}}{\\sqrt{3/2}} = \\sqrt{\\frac{5}{4} \\times \\frac{2}{3}} = \\sqrt{\\frac{5}{6}} = \\sqrt{5} : \\sqrt{6}$$\nHence, option (C) is correct."
  },
  {
    qNum: 79,
    exam: 'AIPMT 2004',
    question: "A stone is tied to a string of length $l$ and is whirled in a vertical circle with the other end of the string as the centre. At a certain instant of time, the stone is at its lowest position and has a speed $u$. The magnitude of the change in velocity as it reaches a position where the string is horizontal ($g$ being acceleration due to gravity) is:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{2(u^2 - gl)}$",
      "$\\sqrt{u^2 - gl}$",
      "$u - \\sqrt{u^2 - 2gl}$",
      "$\\sqrt{2gl}$"
    ],
    correctIndex: 0,
    solution: "1. At the lowest position, taking the horizontal direction as $\\hat{i}$:\n$$\\vec{v}_1 = u \\hat{i}$$\n2. At the horizontal position, the vertical height gained is $l$. By conservation of mechanical energy:\n$$\\frac{1}{2} m u^2 = \\frac{1}{2} m v_2^2 + m g l \\implies v_2 = \\sqrt{u^2 - 2gl}$$\nHere the velocity vector is directed vertically upwards along $\\hat{j}$:\n$$\\vec{v}_2 = \\sqrt{u^2 - 2gl} \\hat{j}$$\n3. The change in velocity vector is:\n$$\\Delta \\vec{v} = \\vec{v}_2 - \\vec{v}_1 = -u \\hat{i} + \\sqrt{u^2 - 2gl} \\hat{j}$$\n4. The magnitude of change in velocity is:\n$$|\\Delta \\vec{v}| = \\sqrt{(-u)^2 + (\\sqrt{u^2 - 2gl})^2} = \\sqrt{u^2 + u^2 - 2gl} = \\sqrt{2(u^2 - gl)}$$\nHence, option (A) is correct."
  },
  {
    qNum: 80,
    exam: 'AIPMT 2003',
    question: "A ball rolls without slipping. The radius of gyration of the ball about an axis passing through its centre of mass is $K$. If radius of the ball be $R$, then the fraction of total energy associated with its rotational energy will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{K^2 + R^2}{R^2}$",
      "$\\frac{K^2}{R^2}$",
      "$\\frac{K^2}{K^2 + R^2}$",
      "$\\frac{R^2}{K^2 + R^2}$"
    ],
    correctIndex: 2,
    solution: "1. Rotational kinetic energy of rolling ball:\n$$E_{\\text{rot}} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2} (M K^2) \\left(\\frac{v}{R}\\right)^2 = \\frac{1}{2} M v^2 \\left(\\frac{K^2}{R^2}\\right)$$\n2. Translational kinetic energy:\n$$E_{\\text{trans}} = \\frac{1}{2} M v^2$$\n3. Total kinetic energy:\n$$E_{\\text{total}} = E_{\\text{trans}} + E_{\\text{rot}} = \\frac{1}{2} M v^2 \\left(1 + \\frac{K^2}{R^2}\\right) = \\frac{1}{2} M v^2 \\left(\\frac{R^2 + K^2}{R^2}\\right)$$\n4. Fraction of total energy associated with rotational energy:\n$$\\frac{E_{\\text{rot}}}{E_{\\text{total}}} = \\frac{\\frac{K^2}{R^2}}{1 + \\frac{K^2}{R^2}} = \\frac{K^2}{K^2 + R^2}$$\nHence, option (C) is correct."
  },
  {
    qNum: 81,
    exam: 'AIPMT 2003',
    question: "A solid cylinder of mass $M$ and radius $R$ rolls without slipping down an inclined plane of length $L$ and height $h$. What is the speed of its centre of mass when the cylinder reaches its bottom?",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\sqrt{2gh}$",
      "$\\sqrt{\\frac{3gh}{4}}$",
      "$\\sqrt{\\frac{4gh}{3}}$",
      "$\\sqrt{4gh}$"
    ],
    correctIndex: 2,
    solution: "1. For a solid cylinder, moment of inertia about central axis is $I = \\frac{1}{2} M R^2$.\n2. By conservation of mechanical energy:\n$$M g h = \\frac{1}{2} M v^2 + \\frac{1}{2} I \\omega^2$$\n3. Since rolling is without slipping, $\\omega = \\frac{v}{R}$:\n$$M g h = \\frac{1}{2} M v^2 + \\frac{1}{2} \\left(\\frac{1}{2} M R^2\\right) \\left(\\frac{v}{R}\\right)^2 = \\frac{1}{2} M v^2 + \\frac{1}{4} M v^2 = \\frac{3}{4} M v^2$$\n4. Solving for $v$:\n$$v^2 = \\frac{4gh}{3} \\implies v = \\sqrt{\\frac{4gh}{3}}$$\nHence, option (C) is correct."
  },
  {
    qNum: 82,
    exam: 'AIPMT 2003',
    question: "A thin circular ring of mass $M$ and radius $r$ is rotating about its axis with a constant angular velocity $\\omega$. Four objects each of mass $m$, are kept gently to the opposite ends of two perpendicular diameters of the ring. The angular velocity of the ring will be:",
    imageUrl: null,
    image_url: null,
    options: [
      "$\\frac{(M - 4m)\\omega}{M + 4m}$",
      "$\\frac{M \\omega}{M + 4m}$",
      "$\\frac{(M + 4m)\\omega}{M}$",
      "$\\frac{M \\omega}{M + 2m}$"
    ],
    correctIndex: 1,
    solution: "1. No external torque acts about the axis of rotation, so angular momentum is conserved:\n$$I_1 \\omega_1 = I_2 \\omega_2$$\n2. Initial moment of inertia of the ring:\n$$I_1 = M r^2$$\n3. When four objects of mass $m$ each are placed on the rim at distance $r$ from the axis:\n$$I_2 = M r^2 + 4(m r^2) = (M + 4m) r^2$$\n4. Solving for final angular velocity $\\omega_2$:\n$$\\omega_2 = \\frac{I_1}{I_2} \\omega = \\frac{M r^2}{(M + 4m) r^2} \\omega = \\frac{M \\omega}{M + 4m}$$\nHence, option (B) is correct."
  },
  {
    qNum: 83,
    exam: 'AIPMT 2002',
    question: "A point $P$ consider at contact point of a wheel on ground which rolls on ground without slipping then value of displacement of point $P$ when wheel completes half of rotation (if radius of wheel is $1\\text{ m}$):",
    imageUrl: null,
    image_url: null,
    options: [
      "$2\\text{ m}$",
      "$\\sqrt{\\pi^2 + 4}\\text{ m}$",
      "$\\pi\\text{ m}$",
      "$\\sqrt{\\pi^2 + 2}\\text{ m}$"
    ],
    correctIndex: 1,
    solution: "1. When the wheel completes half a rotation without slipping, the horizontal distance moved by the center of the wheel is:\n$$x = \\pi R = \\pi (1) = \\pi\\text{ m}$$\n2. The point $P$, initially at the lowest point (contact point), moves to the top of the wheel. Thus, the vertical displacement is:\n$$y = 2R = 2(1) = 2\\text{ m}$$\n3. The magnitude of total displacement of point $P$ is:\n$$s = \\sqrt{x^2 + y^2} = \\sqrt{\\pi^2 + 2^2} = \\sqrt{\\pi^2 + 4}\\text{ m}$$\nHence, option (B) is correct."
  },
  {
    qNum: 84,
    exam: 'AIPMT 2002',
    question: "A solid sphere of radius $R$ is placed on smooth horizontal surface. A horizontal force $F$ is applied at height $h$ from the lowest point. For the maximum acceleration of centre of mass, which is correct?",
    imageUrl: null,
    image_url: null,
    options: [
      "$h = R$",
      "$h = 2R$",
      "$h = 0$",
      "no relation between $h$ and $R$"
    ],
    correctIndex: 3,
    solution: "1. The surface is smooth, so the friction force between the sphere and the surface is zero.\n2. The acceleration of the center of mass of a body depends solely on the net external force acting on it:\n$$a_{\\text{cm}} = \\frac{F_{\\text{ext}}}{M} = \\frac{F}{M}$$\n3. Since $F$ is the only horizontal force acting, $a_{\\text{cm}} = \\frac{F}{M}$ is independent of the point of application $h$.\n4. Therefore, there is no relation between $h$ and $R$ for the acceleration of the center of mass.\nHence, option (D) is correct."
  },
  {
    qNum: 85,
    exam: 'AIPMT 2002',
    question: "A disc is rotating with angular speed $\\omega$. If a child sits on it, what is conserved?",
    imageUrl: null,
    image_url: null,
    options: [
      "linear momentum",
      "angular momentum",
      "kinetic energy",
      "potential energy"
    ],
    correctIndex: 1,
    solution: "1. When a child sits on the rotating disc, no external torque acts on the system (disc + child) about the axis of rotation.\n2. According to Newton's rotational law, $\\tau_{\\text{ext}} = \\frac{dL}{dt}$.\n3. Since $\\tau_{\\text{ext}} = 0$, the total angular momentum of the system is conserved.\nHence, option (B) is correct."
  }
];

