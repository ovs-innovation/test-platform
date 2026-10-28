export const MOVING_CHARGES_BATCH5_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a moving coil galvanometer, identify the incorrect option:",
    options: [
      "(1) We obtain a non-linear scale since $I \\propto \\tan\\theta$",
      "(2) Increasing the number of turns increases the voltage sensitivity proportionately",
      "(3) The magnetic torque on the coil is proportional to $\\cos\\theta$ where $\\theta$ is the deflection in the coil",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `In a moving coil galvanometer:
1. Because of the radial magnetic field, the deflecting torque is constant with respect to angle: $\\tau_d = N I A B$ (independent of $\\cos\\theta$). Statement (3) is incorrect.
2. The restoring torque of the suspension spring is $\\tau_r = C\\theta$.
Equating torques:
$$N I A B = C\\theta \\implies I = \\left(\\frac{C}{N A B}\\right)\\theta \\propto \\theta$$
The scale is strictly linear, not non-linear ($I \\not\\propto \\tan\\theta$). Statement (1) is incorrect.
3. Voltage sensitivity is:
$$V_s = \\frac{I_s}{R} = \\frac{N A B}{C R}$$
Since the resistance $R$ of the coil is directly proportional to the total length of wire (and hence number of turns $N$), increasing $N$ increases $R$ in the same proportion. Thus, $V_s$ remains roughly constant and does NOT increase proportionately. Statement (2) is incorrect.

Since statements (1), (2), and (3) are all incorrect, the correct choice is **All of these**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic field in a toroid of 600 turns, current of $0.75\\text{ A}$ and central line radius $= 0.50\\text{ m}$ is:",
    options: [
      "(1) $13.5 \\times 10^{-7}\\text{ T}$",
      "(2) $7.8 \\times 10^{-5}\\text{ T}$",
      "(3) $1.8 \\times 10^{-4}\\text{ T}$",
      "(4) $25 \\times 10^{-5}\\text{ T}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field inside a toroid of $N$ turns, mean radius $r$, and current $I$ is:
$$B = \\frac{\\mu_0 N I}{2\\pi r}$$

Given:
- $N = 600\\text{ turns}$
- $I = 0.75\\text{ A}$
- $r = 0.50\\text{ m}$
- $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$

Substituting the values:
$$B = \\frac{(4\\pi \\times 10^{-7}) \\times 600 \\times 0.75}{2\\pi \\times 0.50}$$
$$B = 2 \\times 10^{-7} \\times \\frac{450}{0.50} = 2 \\times 10^{-7} \\times 900 = 1.8 \\times 10^{-4}\\text{ T}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An infinitely long wire carrying current $i$ is along $y$-axis such that its one end is at point $A(0, b)$ while the wire extends upto $+\\infty$. The magnitude of magnetic field strength at point $(a, 0)$ is:",
    options: [
      "(1) $\\frac{\\mu_0 i}{4\\pi a}\\left(1 + \\frac{b}{\\sqrt{a^2 + b^2}}\\right)$",
      "(2) $\\frac{\\mu_0 i}{4\\pi a}\\left(1 - \\frac{b}{\\sqrt{a^2 + b^2}}\\right)$",
      "(3) $\\frac{\\mu_0 i}{4\\pi a}\\left(\\frac{b}{\\sqrt{a^2 + b^2}}\\right)$",
      "(4) None of these"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `The wire lies along the $y$-axis from $y = b$ to $y \\to +\\infty$.
The observation point is $P(a, 0)$ on the $x$-axis.
- The perpendicular distance from $P$ to the line of the wire ($y$-axis) is $d = a$.
- The normal from $P$ meets the wire's line at the origin $(0, 0)$.
- Both endpoints of the wire lie on the same side of the normal (positive $y$-axis):
  1. The far end as $y \\to +\\infty$ subtends an angle $\\theta_2 = 90^\\circ$ with the normal ($\sin 90^\\circ = 1$).
  2. The near end $A(0, b)$ subtends an angle $\\theta_1$ where $\\sin\\theta_1 = \\frac{b}{\\sqrt{a^2 + b^2}}$.

Since both ends are on the same side of the normal, the magnetic field is:
$$B = \\frac{\\mu_0 i}{4\\pi d}(\\sin\\theta_2 - \\sin\\theta_1) = \\frac{\\mu_0 i}{4\\pi a}\\left(1 - \\frac{b}{\\sqrt{a^2 + b^2}}\\right)$$`,
    image_url: '/uploads/moving_charges/moving_charges_q64_semi_infinite_wire.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a charged particle of specific charge $\\frac{q}{m} = \\alpha$ is entering in a uniform magnetic field of strength $B$ which is extended upto a distance $4d$ as shown in figure at a speed $v = (2\\alpha d)(B)$, then which of the following is correct?",
    options: [
      "(1) Angle subtended by path of the charged particle at the centre of circular path is $\\pi/6$ till it exits out of the field.",
      "(2) The charge will move on a circular path and will come out from magnetic field at a distance $4d$ from the point of insertion",
      "(3) The time for which particle will be in the magnetic field is $\\frac{2\\pi}{\\alpha B}$",
      "(4) The charged particle will subtend an angle of $90^\\circ$ at the centre of circular path till it exits out of the field"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `Given:
- Specific charge: $\\frac{q}{m} = \\alpha$
- Speed: $v = 2\\alpha d B$
- Width of magnetic field: $W = 4d$

The radius of the circular path inside the magnetic field is:
$$R = \\frac{m v}{q B} = \\frac{v}{\\left(\\frac{q}{m}\\right)B} = \\frac{2\\alpha d B}{\\alpha B} = 2d$$

Since $R = 2d < 4d$ (width of field):
- The particle does not penetrate all the way through the slab of thickness $4d$.
- Instead, it completes a **semicircular path** of radius $R = 2d$ and turns around, emerging back from the same entry boundary.
- The distance between the entry point and the exit point along the boundary is the diameter of the circular path:
$$\\text{Distance} = 2R = 2(2d) = 4d$$

Hence, **the charge will move on a circular path and will come out from magnetic field at a distance $4d$ from the point of insertion**.`,
    image_url: '/uploads/moving_charges/moving_charges_q65_magnetic_slab_4d.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton of energy $1\\text{ MeV}$ describes a circular path in plane at right angles to a uniform magnetic field of $6.28 \\times 10^{-4}\\text{ T}$. The mass of the proton is $1.7 \\times 10^{-27}\\text{ kg}$. The cyclotron frequency of the proton is very nearly equal to:",
    options: [
      "(1) $10^7\\text{ Hz}$",
      "(2) $10^5\\text{ Hz}$",
      "(3) $10^6\\text{ Hz}$",
      "(4) $10^4\\text{ Hz}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `The cyclotron frequency is independent of the speed or energy of the particle:
$$f = \\frac{q B}{2\\pi m}$$

Given:
- Charge of proton $q = 1.6 \\times 10^{-19}\\text{ C}$
- Magnetic field $B = 6.28 \\times 10^{-4}\\text{ T} \\approx 2\\pi \\times 10^{-4}\\text{ T}$
- Mass of proton $m = 1.7 \\times 10^{-27}\\text{ kg} \\approx 1.6 \\times 10^{-27}\\text{ kg}$

Substituting the values:
$$f = \\frac{(1.6 \\times 10^{-19}) \\times (2\\pi \\times 10^{-4})}{2\\pi \\times (1.6 \\times 10^{-27})} = \\frac{10^{-23}}{10^{-27}} = 10^4\\text{ Hz}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Find the ratio of magnetic dipole moment to angular momentum of an electron in a hydrogen like atom in ground state:",
    options: [
      "(1) $\\frac{e}{m}$",
      "(2) $\\frac{e}{2m}$",
      "(3) $\\frac{e}{3m}$",
      "(4) $\\frac{2e}{m}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `For an electron of charge $e$ and mass $m$ revolving in a circular orbit of radius $r$ with speed $v$:
1. Magnetic dipole moment:
$$M = I A = \\left(\\frac{e}{T}\\right)(\\pi r^2) = \\left(\\frac{e v}{2\\pi r}\\right)(\\pi r^2) = \\frac{e v r}{2}$$

2. Angular momentum:
$$L = m v r$$

3. Ratio of magnetic dipole moment to angular momentum (Gyromagnetic ratio):
$$\\frac{M}{L} = \\frac{\\frac{e v r}{2}}{m v r} = \\frac{e}{2m}$$

This ratio is a universal constant for an orbital electron, independent of the principal quantum number.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current enters a uniform conducting loop of radius $r$ at $X$ and leaves at $Y$. Calculate the magnetic field at $O$ due to the portion $XAY$ of the loop:",
    options: [
      "(1) Zero",
      "(2) $\\frac{\\mu_0 i\\theta(2\\pi - \\theta)}{8\\pi^2 r}$",
      "(3) $\\frac{\\mu_0 i(2\\pi - \\theta)}{4\\pi^2 r}$",
      "(4) $\\frac{\\mu_0 i}{2\\pi r}\\theta$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `Let total current entering the loop be $i$.
- Arc $XBY$ subtends an angle $\\theta$ at centre $O$.
- Arc $XAY$ subtends an angle $(2\\pi - \\theta)$ at centre $O$.

Since the loop is made of uniform wire, resistance is proportional to length (and subtended angle):
$$R_{XBY} \\propto \\theta, \\quad R_{XAY} \\propto (2\\pi - \\theta)$$

Since the two portions are in parallel, the current divides inversely as resistance:
Current in arc $XAY$:
$$i_1 = i \\left(\\frac{R_{XBY}}{R_{XAY} + R_{XBY}}\\right) = i \\left(\\frac{\\theta}{(2\\pi - \\theta) + \\theta}\\right) = i \\left(\\frac{\\theta}{2\\pi}\\right)$$

The magnetic field at centre $O$ due to arc $XAY$ subtending angle $(2\\pi - \\theta)$ is:
$$B_{XAY} = \\frac{\\mu_0 i_1}{4\\pi r} (2\\pi - \\theta)$$

Substituting $i_1 = \\frac{i\\theta}{2\\pi}$:
$$B_{XAY} = \\frac{\\mu_0 \\left(\\frac{i\\theta}{2\\pi}\\right)}{4\\pi r} (2\\pi - \\theta) = \\frac{\\mu_0 i \\theta (2\\pi - \\theta)}{8\\pi^2 r}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q68_circular_loop_xy.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Inside a homogeneous straight wire of circular cross-section there is a cylindrical cavity whose axis is parallel to the conductor axis and displaced relative to it by a distance $\\vec{L}$. A direct current of density $\\vec{j}$ flows in the wire. Calculate the magnetic field inside the cavity:",
    options: [
      "(1) $\\mu_0 [\\vec{j} \\times \\vec{L}]$",
      "(2) $\\frac{\\mu_0}{2}[\\vec{j} \\times \\vec{L}]$",
      "(3) Zero",
      "(4) $\\frac{\\mu_0}{4}[\\vec{j} \\times \\vec{L}]$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Using the principle of superposition:
A wire with a cylindrical cavity carrying current density $\\vec{j}$ is equivalent to:
1. A complete solid cylinder carrying current density $+\\vec{j}$.
2. A cylinder having the size and location of the cavity carrying current density $-\\vec{j}$.

Inside a solid cylinder of current density $\\vec{j}$ at position $\\vec{r}$ from its axis, the magnetic field is:
$$\\vec{B} = \\frac{\\mu_0}{2}(\\vec{j} \\times \\vec{r})$$

Let $\\vec{r}_1$ be the position vector of a point inside the cavity from the conductor axis, and $\\vec{r}_2$ from the cavity axis:
$$\\vec{r}_1 - \\vec{r}_2 = \\vec{L}$$

The net magnetic field inside the cavity is:
$$\\vec{B} = \\vec{B}_1 + \\vec{B}_2 = \\frac{\\mu_0}{2}(\\vec{j} \\times \\vec{r}_1) + \\frac{\\mu_0}{2}((-\\vec{j}) \\times \\vec{r}_2)$$
$$\\vec{B} = \\frac{\\mu_0}{2}[\\vec{j} \\times (\\vec{r}_1 - \\vec{r}_2)] = \\frac{\\mu_0}{2}[\\vec{j} \\times \\vec{L}]$$

Notice that this field is completely uniform throughout the entire cavity!`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of charge $q$, mass $m$ moving with velocity $v_0(\\hat{i} - \\hat{j})$ enters a region of uniform magnetic field $B_0 \\hat{j}$ from the origin. The displacement of the particle after time $\\frac{2\\pi m}{q B_0}$ is:",
    options: [
      "(1) $\\frac{m v_0}{q B}[\\hat{i} + 2\\hat{k}]$",
      "(2) $-2\\pi \\frac{m v_0}{q B}\\hat{j}$",
      "(3) $\\frac{m v_0}{q B}[\\hat{i} - 2\\hat{k}]$",
      "(4) $\\frac{2\\pi m v_0}{q B}\\hat{j}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Given:
- Initial velocity: $\\vec{v} = v_0 \\hat{i} - v_0 \\hat{j}$
- Magnetic field: $\\vec{B} = B_0 \\hat{j}$

1. **Parallel component:**
$v_\\parallel = -v_0 \\hat{j}$ is parallel to $\\vec{B}$, so there is no magnetic force along the $y$-axis:
$$y(t) = -v_0 t$$

2. **Perpendicular component:**
$v_\\perp = v_0 \\hat{i}$ is perpendicular to $\\vec{B}$. It causes uniform circular motion in the $x$-$z$ plane with cyclotron period:
$$T = \\frac{2\\pi m}{q B_0}$$

Given time $t = \\frac{2\\pi m}{q B_0} = T$, which is exactly one complete circular orbit in the $x$-$z$ plane.
- Displacement in the $x$-$z$ plane after one full period is zero:
$$\\Delta x = 0, \\quad \\Delta z = 0$$

- Therefore, the total displacement vector is along the $y$-axis:
$$\\vec{s} = y(T)\\hat{j} = -v_0 \\left(\\frac{2\\pi m}{q B_0}\\right)\\hat{j} = -2\\pi \\frac{m v_0}{q B_0}\\hat{j}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying circular loop of radius $R$ is placed in a uniform magnetic field $B_0\\text{ tesla}$ in $x$-$y$ plane as shown in figure. The loop carries a current $i = 1\\text{ A}$ in the direction shown. The torque acting on the loop is:",
    options: [
      "(1) $\\frac{\\pi R^2 B_0}{\\sqrt{2}}(\\hat{i} + \\hat{j})$",
      "(2) $\\frac{\\pi R^2 B_0}{2}(\\hat{i} - \\hat{j})$",
      "(3) $\\frac{\\pi R^2 B_0}{\\sqrt{2}}(-\\hat{i} + \\hat{j})$",
      "(4) $\\frac{\\pi R^2 B_0}{4}(\\hat{i} + \\hat{j})$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Magnetic Dipole Moment $\\vec{M}$ of the loop:**
The loop lies in the $x$-$y$ plane with current $i = 1\\text{ A}$ circulating counter-clockwise.
By the right-hand rule, the area vector points along $+\\hat{k}$:
$$\\vec{M} = i A \\hat{k} = (1) (\\pi R^2) \\hat{k} = \\pi R^2 \\hat{k}$$

2. **Magnetic Field Vector $\\vec{B}$:**
The magnetic field lies in the $x$-$y$ plane inclined at $45^\\circ$ to the $x$-axis:
$$\\vec{B} = B_0 \\cos 45^\\circ \\hat{i} + B_0 \\sin 45^\\circ \\hat{j} = \\frac{B_0}{\\sqrt{2}}(\\hat{i} + \\hat{j})$$

3. **Torque on the loop:**
$$\\vec{\\tau} = \\vec{M} \\times \\vec{B} = (\\pi R^2 \\hat{k}) \\times \\left[\\frac{B_0}{\\sqrt{2}}(\\hat{i} + \\hat{j})\\right]$$
$$= \\frac{\\pi R^2 B_0}{\\sqrt{2}} (\\hat{k} \\times \\hat{i} + \\hat{k} \\times \\hat{j}) = \\frac{\\pi R^2 B_0}{\\sqrt{2}} (\\hat{j} - \\hat{i}) = \\frac{\\pi R^2 B_0}{\\sqrt{2}}(-\\hat{i} + \\hat{j})$$`,
    image_url: '/uploads/moving_charges/moving_charges_q71_circular_loop_xy_torque.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In the given figure, the current $2I$ is coming and passing through two semicircular loops. The magnetic induction at the centre 'O' is:",
    options: [
      "(1) $\\frac{\\mu_0 I}{2\\pi(r_2 - r_1)}$",
      "(2) $\\frac{\\mu_0 2I}{2\\pi r_1} + \\frac{\\mu_0 I}{4}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$",
      "(3) $\\frac{\\mu_0 2I}{2\\pi r_1} - \\frac{\\mu_0 I}{4}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$",
      "(4) $\\frac{\\mu_0 I}{4}\\left(\\frac{1}{r_2} - \\frac{1}{r_1}\\right)$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `Let us calculate the contribution of each part to the magnetic field at the centre $O$:

1. **Two semi-infinite straight conductors:**
- Right wire: goes upwards to $\\infty$ carrying current $2I$ at perpendicular distance $r_1$. By right-hand rule, field points OUT OF PAGE ($\\odot$).
- Left wire: goes downwards to $\\infty$ carrying current $2I$ at perpendicular distance $r_1$. By right-hand rule, field points OUT OF PAGE ($\\odot$).
Each semi-infinite wire produces $\\frac{\\mu_0 (2I)}{4\\pi r_1}$.
Total field due to both straight wires:
$$B_{\\text{wires}} = 2 \\times \\frac{\\mu_0 (2I)}{4\\pi r_1} = \\frac{\\mu_0 (2I)}{2\\pi r_1} \\quad (\\odot)$$

2. **Two semicircular arcs:**
- Inner semicircle (radius $r_1$): carrying current $I$ counter-clockwise, producing field OUT OF PAGE ($\\odot$):
$$B_1 = \\frac{\\mu_0 I}{4 r_1} \\quad (\\odot)$$
- Outer semicircle (radius $r_2$): carrying current $I$ clockwise, producing field INTO PAGE ($\\otimes$):
$$B_2 = \\frac{\\mu_0 I}{4 r_2} \\quad (\\otimes)$$
Net field of the semicircles:
$$B_{\\text{semi}} = \\frac{\\mu_0 I}{4}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right) \\quad (\\odot)$$

3. **Net magnetic induction at $O$:**
Since both contributions are directed OUT OF PAGE ($\\odot$):
$$B_{\\text{net}} = \\frac{\\mu_0 2I}{2\\pi r_1} + \\frac{\\mu_0 I}{4}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$$`,
    image_url: '/uploads/moving_charges/moving_charges_q72_two_semicircles_wires.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton is moving in a circular path in uniform magnetic field with a speed $v$. The magnitude of change in its velocity when radius constructed by proton makes an angle $60^\\circ$ at centre is:",
    options: [
      "(1) $v$",
      "(2) $v\\sqrt{3}$",
      "(3) $\\frac{v}{\\sqrt{2}}$",
      "(4) $\\frac{\\sqrt{3}}{2}v$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `In uniform circular motion, speed $v$ remains constant while the direction of the velocity vector rotates by an angle $\\theta$ equal to the angle subtended by the arc at the centre.
Here, $\\theta = 60^\\circ$.

The magnitude of the change in velocity is:
$$|\\Delta \\vec{v}| = \\sqrt{v_1^2 + v_2^2 - 2 v_1 v_2 \\cos\\theta} = \\sqrt{v^2 + v^2 - 2 v^2 \\cos\\theta} = 2 v \\sin\\left(\\frac{\\theta}{2}\\right)$$

Given $\\theta = 60^\\circ$:
$$|\\Delta \\vec{v}| = 2 v \\sin\\left(\\frac{60^\\circ}{2}\\right) = 2 v \\sin 30^\\circ = 2 v \\left(\\frac{1}{2}\\right) = v$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Voltage sensitivity of a moving coil galvanometer is $V_s$ and current sensitivity is $I_s$. Resistance of galvanometer is '$G$'. The relation between $V_s$ and $I_s$ is:",
    options: [
      "(1) $V_s = \\frac{I_s}{G}$",
      "(2) $V_s = I_s G$",
      "(3) $\\frac{G}{V_s I_s} = V_s$",
      "(4) $\\frac{G}{V_s} = I_s$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Current Sensitivity ($I_s$):**
Deflection per unit current:
$$I_s = \\frac{\\theta}{I} = \\frac{N A B}{C}$$

2. **Voltage Sensitivity ($V_s$):**
Deflection per unit voltage:
$$V_s = \\frac{\\theta}{V} = \\frac{\\theta}{I G} = \\frac{1}{G} \\left(\\frac{\\theta}{I}\\right) = \\frac{I_s}{G}$$

Therefore:
$$V_s = \\frac{I_s}{G}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two straight parallel thin wires carrying current $i$ with each into the plane of paper are kept at distance apart as shown in the figure. If magnitude of magnetic field due to current in wire $A$ at $P$ is $B$, the magnitude of magnetic field at $P$ by $A'$ is:",
    options: [
      "(1) $\\sqrt{5}\\frac{B}{2}$",
      "(2) $\\frac{B}{2}$",
      "(3) $\\sqrt{2}B$",
      "(4) $\\frac{5B}{\\sqrt{2}}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `From the geometry in the figure:
- Wire $A$ is at a distance $r_A = x$ from point $P$.
- Wire $A'$ is separated vertically from $A$ by distance $\\sqrt{3}x$.
- Triangle $A'AP$ is a right-angled triangle at $A$ ($AP \\perp A'A$).
- The distance from wire $A'$ to point $P$ is:
$$r_{A'} = \\sqrt{(A'A)^2 + (AP)^2} = \\sqrt{(\\sqrt{3}x)^2 + x^2} = \\sqrt{3x^2 + x^2} = \\sqrt{4x^2} = 2x$$

The magnetic field due to a long straight wire is inversely proportional to distance:
$$B = \\frac{\\mu_0 i}{2\\pi r}$$

Since $r_{A'} = 2 r_A$:
$$B_{A'} = \\frac{\\mu_0 i}{2\\pi (2x)} = \\frac{1}{2} \\left(\\frac{\\mu_0 i}{2\\pi x}\\right) = \\frac{B}{2}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q75_two_parallel_wires.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following statements is wrong?",
    options: [
      "(1) Voltmeter should have high resistance",
      "(2) Ammeter should have low resistance",
      "(3) Ammeter is placed parallel across resistance in a circuit",
      "(4) Voltmeter is placed in parallel across resistance in a circuit"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. An **ammeter** measures the electric current flowing through a circuit branch. To measure current without altering the circuit resistance, it must have **very low resistance** and must always be connected in **series** with the component.
Connecting an ammeter in parallel would cause a short circuit and draw a dangerously high current that can damage the instrument.
Therefore, statement (3) "Ammeter is placed parallel across resistance in a circuit" is **wrong**.

2. A **voltmeter** measures the potential difference across two points. It is connected in **parallel** and must have **very high resistance** so that it draws negligible current from the main circuit. Statements (1), (2), and (4) are all correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic field at the centre of circular coil is $B_0$. Then the distance from centre on its axis where $B_x = \\frac{B_0}{8}$ is ($R = \\text{radius of coil}$):",
    options: [
      "(1) $\\frac{R}{3}$",
      "(2) $\\sqrt{3}R$",
      "(3) $\\frac{R}{\\sqrt{3}}$",
      "(4) $\\frac{R}{2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `The magnetic field at the centre of a circular coil of radius $R$ is:
$$B_0 = \\frac{\\mu_0 I}{2R}$$

The magnetic field at an axial point at distance $x$ from the centre is:
$$B_x = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} = B_0 \\frac{R^3}{(R^2 + x^2)^{3/2}}$$

Given:
$$B_x = \\frac{B_0}{8}$$
$$\\frac{R^3}{(R^2 + x^2)^{3/2}} = \\frac{1}{8}$$

Taking the reciprocal:
$$\\left(\\frac{R^2 + x^2}{R^2}\\right)^{3/2} = 8$$
$$\\left(1 + \\frac{x^2}{R^2}\\right)^{3/2} = 2^3$$

Raising both sides to the power $2/3$:
$$1 + \\frac{x^2}{R^2} = 2^2 = 4$$
$$\\frac{x^2}{R^2} = 3 \\implies x^2 = 3R^2 \\implies x = \\sqrt{3}R$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
