export const MOVING_CHARGES_BATCH4_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a beam of charged particles moving with speed $3 \\times 10^5\\text{ m/s}$ enters normally into a region of uniform magnetic field $90\\text{ mT}$ and specific charge of each particle is $10^7\\text{ C/kg}$, then the radius of the circular path described by it will be:",
    options: [
      "(1) $0.33\\text{ m}$",
      "(2) $0.57\\text{ m}$",
      "(3) $0.82\\text{ m}$",
      "(4) $1.25\\text{ m}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The radius of the circular path described by a charged particle moving perpendicularly into a uniform magnetic field is:
$$r = \\frac{m v}{q B} = \\frac{v}{\\left(\\frac{q}{m}\\right) B}$$

Given:
- Speed $v = 3 \\times 10^5\\text{ m/s}$
- Magnetic field $B = 90\\text{ mT} = 90 \\times 10^{-3}\\text{ T} = 9 \\times 10^{-2}\\text{ T}$
- Specific charge $\\frac{q}{m} = 10^7\\text{ C/kg}$

Substituting the values:
$$r = \\frac{3 \\times 10^5}{(10^7) \\times (9 \\times 10^{-2})} = \\frac{3 \\times 10^5}{9 \\times 10^5} = \\frac{1}{3}\\text{ m} \\approx 0.33\\text{ m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Figure shows a uniform magnetic field $B$ normally into the paper. If the charge $+q$ is incident on the boundary $MN$ at an angle $60^\\circ$ as shown, then the deviation produced in the path of the charge on emergence is (Region of magnetic field is finite upto the left boundary $MN$ only):",
    options: [
      "(1) $60^\\circ$",
      "(2) $240^\\circ$",
      "(3) $180^\\circ$",
      "(4) $300^\\circ$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `Let boundary $MN$ be vertical. The magnetic field $\\vec{B}$ is directed into the paper to the right of $MN$.
- The particle $+q$ enters from the left at an angle of $60^\\circ$ with $MN$.
- By Lorentz force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$, the force deflects the positive charge in a clockwise circular trajectory.
- The chord connecting the entry point and exit point lies along the boundary $MN$.
- The angle between the initial velocity vector $\\vec{v}$ and the boundary $MN$ at entry is $60^\\circ$.
- Since the radius is perpendicular to the velocity, the angle made by the radius with the boundary is $90^\\circ - 60^\\circ = 30^\\circ$.
- The angle subtended by the arc inside the magnetic field at the centre of curvature is:
$$\\phi = 360^\\circ - 2(60^\\circ) = 240^\\circ$$

The angle of deviation $\\delta$ of the velocity vector is equal to the angle subtended by the circular path at the centre:
$$\\delta = 240^\\circ$$`,
    image_url: '/uploads/moving_charges/moving_charges_q39_charge_deflection_boundary.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The graph that depicts the variation of magnetic field due to a circular loop of current placed with its centre at origin in $x$-$y$ plane is:",
    options: [
      "(1) Graph (1)",
      "(2) Graph (2)",
      "(3) Graph (3)",
      "(4) Graph (4)"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `The magnetic field along the axis ($z$-axis) of a circular loop of radius $R$ carrying current $I$ placed in the $x$-$y$ plane is:
$$B_z(z) = \\frac{\\mu_0 I R^2}{2(R^2 + z^2)^{3/2}}$$

Key characteristics of this function:
1. Symmetrical about $z = 0$, since $B_z(-z) = B_z(z)$.
2. Maximum at the centre ($z = 0$): $B_{\\max} = \\frac{\\mu_0 I}{2R}$.
3. As $z \\to \\pm\\infty$, $B_z \\to 0$.
4. It has points of inflection where $\\frac{d^2 B_z}{dz^2} = 0$, located at $z = \\pm \\frac{R}{2}$.

This gives a smooth, bell-shaped curve, which corresponds exactly to **Graph (3)**.`,
    image_url: '/uploads/moving_charges/moving_charges_q40_circular_loop_bz_graph.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A semicircular wire of radius $r$, carrying current $I$, is placed in a magnetic field of magnitude $B$. The force acting on it:",
    options: [
      "(1) can never be zero",
      "(2) can have maximum magnitude $2IB r$",
      "(3) can have the maximum magnitude $BI\\pi r$",
      "(4) can have the maximum magnitude $BIr$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `The net magnetic force on any current-carrying conductor of arbitrary shape in a uniform magnetic field $\\vec{B}$ is given by:
$$\\vec{F} = I (\\vec{L}_{\\text{eff}} \\times \\vec{B})$$

where $\\vec{L}_{\\text{eff}}$ is the straight displacement vector connecting the two end points of the wire.

For a semicircular wire of radius $r$:
- The straight-line distance between its two ends is the diameter:
$$L_{\\text{eff}} = 2r$$
- The maximum force occurs when the magnetic field $\\vec{B}$ is perpendicular to $\\vec{L}_{\\text{eff}}$:
$$F_{\\max} = I (2r) B \\sin 90^\\circ = 2 I B r$$
- If $\\vec{B}$ is parallel to the line joining the endpoints, $\\vec{F} = 0$, so it can be zero.

Hence, the force **can have maximum magnitude $2IB r$**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A rectangular loop of sides $20\\text{ cm}$ and $10\\text{ cm}$ carries a current of $5.0\\text{ A}$. A uniform magnetic field of magnitude $2\\text{ T}$ exists parallel to the longer side of the loop. The torque acting on the loop is:",
    options: [
      "(1) $0.2\\text{ N m}$",
      "(2) $0.3\\text{ N m}$",
      "(3) $2\\text{ N m}$",
      "(4) $3\\text{ N m}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Given:
- Dimensions: length $l = 20\\text{ cm} = 0.2\\text{ m}$, breadth $b = 10\\text{ cm} = 0.1\\text{ m}$
- Area: $A = 0.2 \\times 0.1 = 0.02\\text{ m}^2$
- Current: $I = 5.0\\text{ A}$
- Magnetic dipole moment:
$$M = I A = 5.0 \\times 0.02 = 0.1\\text{ A}\\cdot\\text{m}^2$$

The magnetic field $\\vec{B}$ is parallel to the longer side of the loop, so it lies entirely in the plane of the loop.
- The area vector $\\vec{A}$ is normal to the plane of the loop.
- Therefore, the angle between $\\vec{M}$ and $\\vec{B}$ is $\\theta = 90^\\circ$.

The torque is:
$$\\tau = M B \\sin 90^\\circ = (0.1\\text{ A}\\cdot\\text{m}^2) \\times (2\\text{ T}) \\times 1 = 0.2\\text{ N m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If two straight current carrying wires are kept perpendicular to each other such that they are almost touching, then the wires:",
    options: [
      "(1) Attract each other",
      "(2) Repel each other",
      "(3) Remain stationary",
      "(4) Become parallel to each other"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Consider two perpendicular wires 1 and 2 intersecting at right angles:
- Magnetic field produced by wire 1 on wire 2 is perpendicular to wire 2.
- By the right-hand rule, the force on one half of wire 2 is in one direction, while on the opposite half it is in the opposite direction.
- This creates a **couple (torque)** on the wires without any net translation force.
- The torque acts in such a direction as to align the two currents so that they flow parallel to each other in the same direction, which minimizes the magnetic potential energy.

Hence, the wires tend to **become parallel to each other**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a toroid, the number of turns per unit length is 1000 and current through it is $\\frac{1}{4\\pi}\\text{ ampere}$. The magnetic field produced inside (in $\\text{Wb/m}^2$) is:",
    options: [
      "(1) $10^{-2}$",
      "(2) $10^{-3}$",
      "(3) $10^{-4}$",
      "(4) $10^{-7}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field inside the core of a toroid is:
$$B = \\mu_0 n I$$

Given:
- $n = 1000\\text{ turns/m}$
- $I = \\frac{1}{4\\pi}\\text{ A}$
- $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$

Substituting the values:
$$B = (4\\pi \\times 10^{-7}) \\times 1000 \\times \\frac{1}{4\\pi} = 10^{-4}\\text{ Wb/m}^2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A rod has a total charge $Q$ uniformly distributed along its length $L$. If the rod rotates with angular velocity $\\omega$ about its end, compute its magnetic moment:",
    options: [
      "(1) $\\frac{Q \\omega L^2}{6}$",
      "(2) $\\frac{Q \\omega L^2}{3}$",
      "(3) $\\frac{Q \\omega L^2}{4}$",
      "(4) $\\frac{Q \\omega L^2}{2}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Let the linear charge density of the rod be $\\lambda = \\frac{Q}{L}$.
Consider an infinitesimal element $dx$ of the rod at distance $x$ from the axis of rotation:
- Charge on element: $dq = \\lambda\\,dx = \\frac{Q}{L} dx$
- Time period of rotation: $T = \\frac{2\\pi}{\\omega}$
- Equivalent current:
$$di = \\frac{dq}{T} = \\frac{dq \\cdot \\omega}{2\\pi} = \\frac{Q \\omega}{2\\pi L} dx$$
- Area enclosed by the circular path of radius $x$: $A = \\pi x^2$
- Magnetic dipole moment of this element:
$$dM = di \\cdot A = \\left(\\frac{Q \\omega}{2\\pi L} dx\\right)(\\pi x^2) = \\frac{Q \\omega}{2L} x^2 dx$$

Integrating from $x = 0$ to $x = L$:
$$M = \\int_0^L \\frac{Q \\omega}{2L} x^2 dx = \\frac{Q \\omega}{2L} \\left[\\frac{x^3}{3}\\right]_0^L = \\frac{Q \\omega L^2}{6}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The scale of a galvanometer is divided into 150 equal divisions. The galvanometer has the current sensitivity of 10 divisions per mA and voltage sensitivity of 2 divisions per mV. Find the resistance of the galvanometer:",
    options: [
      "(1) $5\\ \\Omega$",
      "(2) $50\\ \\Omega$",
      "(3) $5000\\ \\Omega$",
      "(4) $500\\ \\Omega$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The relationship between current sensitivity $I_s$, voltage sensitivity $V_s$, and galvanometer resistance $G$ is:
$$I_s = \\frac{\\theta}{I}, \\quad V_s = \\frac{\\theta}{V} = \\frac{\\theta}{I G} = \\frac{I_s}{G}$$
$$\\implies G = \\frac{I_s}{V_s}$$

Given:
- $I_s = 10\\text{ div/mA} = \\frac{10}{10^{-3}}\\text{ div/A} = 10^4\\text{ div/A}$
- $V_s = 2\\text{ div/mV} = \\frac{2}{10^{-3}}\\text{ div/V} = 2 \\times 10^3\\text{ div/V}$

Therefore:
$$G = \\frac{10^4}{2 \\times 10^3} = 5\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The value of magnetic field at the end of a very long solenoid carrying a current $i$ will be ($n$ is the number of turns per unit length):",
    options: [
      "(1) $\\mu_0 n i$",
      "(2) $\\frac{\\mu_0 n i}{2}$",
      "(3) $\\frac{\\mu_0 n i}{4}$",
      "(4) Zero"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `For a finite solenoid of length $L$, the magnetic field along the axis is:
$$B = \\frac{\\mu_0 n i}{2}(\\cos\\theta_1 - \\cos\\theta_2)$$

1. Deep inside a very long solenoid:
$$\\theta_1 \\to 0^\\circ, \\quad \\theta_2 \\to 180^\\circ \\implies B_{\\text{centre}} = \\frac{\\mu_0 n i}{2}(1 - (-1)) = \\mu_0 n i$$

2. At the end of a very long solenoid:
$$\\theta_1 \\to 90^\\circ, \\quad \\theta_2 \\to 180^\\circ \\implies B_{\\text{end}} = \\frac{\\mu_0 n i}{2}(0 - (-1)) = \\frac{\\mu_0 n i}{2}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A long cylindrical conductor of radius $R$ carries a current $i$ as shown in figure. The current density $j$ is a function of distance from the axis ($r$) according to $j = br$ where $b$ is a constant. Find an expression of the magnetic field $B$ at a distance $r_2 > R$ measured from the axis:",
    options: [
      "(1) $\\frac{\\mu_0 b r_2^2}{3}$",
      "(2) $\\frac{\\mu_0 b R^3}{3 r_2}$",
      "(3) $\\frac{\\mu_0 b R^2}{3}$",
      "(4) $\\mu_0 b r_2^2$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `To find the magnetic field at an external point $r_2 > R$, we apply Ampère's Circuital Law using a circular Amperian loop of radius $r_2$:
$$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{total}}$$
$$B(2\\pi r_2) = \\mu_0 I_{\\text{total}}$$

The total current $I_{\\text{total}}$ in the conductor of radius $R$ is found by integrating over coaxial rings of radius $r$ and thickness $dr$:
$$I_{\\text{total}} = \\int_0^R j (2\\pi r\\,dr) = \\int_0^R (br)(2\\pi r\\,dr) = 2\\pi b \\int_0^R r^2 dr$$
$$I_{\\text{total}} = 2\\pi b \\left[\\frac{r^3}{3}\\right]_0^R = \\frac{2\\pi b R^3}{3}$$

Substituting this into Ampère's Law:
$$B (2\\pi r_2) = \\mu_0 \\left(\\frac{2\\pi b R^3}{3}\\right)$$
$$B = \\frac{\\mu_0 b R^3}{3 r_2}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q48_cylindrical_conductor_current_density.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A beam of protons with a velocity of $4 \\times 10^5\\text{ m/s}$ enters a uniform magnetic field of $0.3\\text{ T}$. The velocity makes an angle of $60^\\circ$ with the magnetic field. The pitch of the helical path taken by the proton beam is:",
    options: [
      "(1) $44\\text{ cm}$",
      "(2) $4.4\\text{ cm}$",
      "(3) $88\\text{ cm}$",
      "(4) $8.8\\text{ cm}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Given:
- Speed $v = 4 \\times 10^5\\text{ m/s}$
- Angle with magnetic field $\\theta = 60^\\circ$
- Magnetic field $B = 0.3\\text{ T}$
- Mass of proton $m = 1.67 \\times 10^{-27}\\text{ kg}$
- Charge of proton $q = 1.6 \\times 10^{-19}\\text{ C}$

The velocity component parallel to the field is:
$$v_\\parallel = v \\cos 60^\\circ = (4 \\times 10^5\\text{ m/s}) \\times 0.5 = 2 \\times 10^5\\text{ m/s}$$

The time period of revolution is:
$$T = \\frac{2\\pi m}{q B} = \\frac{2\\pi \\times 1.67 \\times 10^{-27}}{1.6 \\times 10^{-19} \\times 0.3} \\approx 2.186 \\times 10^{-7}\\text{ s}$$

The pitch of the helix is the linear distance advanced in one period:
$$p = v_\\parallel \\times T = (2 \\times 10^5\\text{ m/s}) \\times (2.186 \\times 10^{-7}\\text{ s}) \\approx 0.0437\\text{ m} \\approx 4.4\\text{ cm}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A negatively charged particle (mass $\\to m$, charge $\\to -q$) is thrown with speed $v$ along $x$-axis in a region of uniform magnetic field $B$ directed along positive $z$-axis. If thickness of the region is $d < \\left[\\frac{mv}{qB}\\right]$, find angular deviation in path of the particle as it comes out of the magnetic field:",
    options: [
      "(1) $\\theta = \\sin^{-1}\\left(\\frac{d q B}{m v}\\right)$",
      "(2) $\\theta = \\sin^{-1}\\left(\\frac{d q B}{2 m v}\\right)$",
      "(3) $\\theta = \\sin^{-1}\\left(\\frac{d q B}{m v^2}\\right)$",
      "(4) $\\theta = \\tan^{-1}\\left(\\frac{d q B}{m v}\\right)$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Inside the magnetic field, the particle executes circular motion of radius:
$$R = \\frac{m v}{q B}$$

From the geometry of the circular trajectory across a slab of width $d$:
The angular deviation $\\theta$ between the initial velocity vector and the final velocity vector satisfies:
$$\\sin\\theta = \\frac{d}{R}$$

Substituting $R = \\frac{mv}{qB}$:
$$\\sin\\theta = \\frac{d}{\\frac{mv}{qB}} = \\frac{d q B}{m v}$$
$$\\implies \\theta = \\sin^{-1}\\left(\\frac{d q B}{m v}\\right)$$`,
    image_url: '/uploads/moving_charges/moving_charges_q50_charge_slab_deviation.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic field in a region is given by $\\vec{B} = B_0 \\hat{i} + 2 B_0 \\hat{j}$. Find torque on the loop shown in figure. [Each wire segment is of length $L$]",
    options: [
      "(1) $\\frac{1}{2} I L^2 B_0 \\hat{k}$",
      "(2) $-I L^2 B_0 \\hat{k}$",
      "(3) $2 I L^2 B_0 \\hat{k}$",
      "(4) $-2 I L^2 B_0 \\hat{k}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `The closed wire loop consists of two equal square faces bent at $90^\\circ$:
1. Face 1 in the $y$-$z$ plane:
Area vector points along $-\\hat{i}$:
$$\\vec{A}_1 = -L^2 \\hat{i}$$
2. Face 2 in the $x$-$z$ plane:
Area vector points along $-\\hat{j}$:
$$\\vec{A}_2 = -L^2 \\hat{j}$$

The net magnetic dipole moment of the folded loop is:
$$\\vec{M} = I (\\vec{A}_1 + \\vec{A}_2) = -I L^2 (\\hat{i} + \\hat{j})$$

Given magnetic field:
$$\\vec{B} = B_0 \\hat{i} + 2 B_0 \\hat{j}$$

The magnetic torque on the loop is:
$$\\vec{\\tau} = \\vec{M} \\times \\vec{B} = -I L^2 (\\hat{i} + \\hat{j}) \\times (B_0 \\hat{i} + 2 B_0 \\hat{j})$$
$$= -I L^2 [ (\\hat{i} \\times 2 B_0 \\hat{j}) + (\\hat{j} \\times B_0 \\hat{i}) ]$$
$$= -I L^2 [ 2 B_0 \\hat{k} - B_0 \\hat{k} ] = -I L^2 B_0 \\hat{k}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q51_bent_loop_torque.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A flexible wire loop carrying a current $I$ is placed in a uniform magnetic field $\\vec{B}$ at an instant as shown in figure. Which of the following is correct at equilibrium?",
    options: [
      "(1) Shape of loop remains unchanged and its plane becomes parallel to $\\vec{B}$",
      "(2) Shape of loop remains unchanged and its plane becomes normal to $\\vec{B}$",
      "(3) Shape of the loop becomes circular and its plane becomes parallel to magnetic field $\\vec{B}$",
      "(4) Shape of the loop becomes circular and its plane becomes normal to magnetic field $\\vec{B}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Shape of the loop:**
The magnetic forces acting on each infinitesimal element of the flexible loop are directed radially outwards ($d\\vec{F} = I(d\\vec{l} \\times \\vec{B})$). For a given fixed perimeter, the geometric shape that encloses the maximum area is a circle. Therefore, the tension and outward magnetic forces deform the flexible loop into a **circle**.

2. **Orientation of the loop:**
The potential energy of a current loop in a magnetic field is:
$$U = -\\vec{M} \\cdot \\vec{B} = -M B \\cos\\theta$$
Equilibrium corresponds to minimum potential energy ($U = -M B$), which occurs when $\\theta = 0^\\circ$, i.e., when the magnetic moment $\\vec{M}$ is parallel to $\\vec{B}$.
Since the magnetic dipole moment $\\vec{M}$ is normal to the plane of the loop, the **plane of the loop becomes normal to the magnetic field $\\vec{B}$**.

Therefore, the shape of the loop becomes circular and its plane becomes normal to $\\vec{B}$.`,
    image_url: '/uploads/moving_charges/moving_charges_q52_flexible_wire_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of mass $m$ and charge $q$ having kinetic energy $K$ enters a stationary magnetic field. After $3\\text{ s}$, its kinetic energy is:",
    options: [
      "(1) $9K$",
      "(2) $K$",
      "(3) $3K$",
      "(4) $\\frac{K}{3}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic force on a moving charged particle is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B})$$

Since the magnetic force $\\vec{F}$ is always perpendicular to the velocity vector $\\vec{v}$:
$$\\vec{F} \\cdot \\vec{v} = 0$$

The rate of work done (power) by the magnetic field on the particle is:
$$P = \\frac{dW}{dt} = \\vec{F} \\cdot \\vec{v} = 0$$

Since the work done by the magnetic force is always zero, by the Work-Energy Theorem, the kinetic energy of the particle remains constant throughout its motion:
$$K(t) = K$$

Hence, after $3\\text{ s}$, its kinetic energy remains **$K$**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
