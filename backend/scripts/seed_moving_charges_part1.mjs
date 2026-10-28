export const MOVING_CHARGES_BATCH1_QUESTIONS = [
  // Page 68 & 69: Q1 to Q10
  {
    q_num: 1,
    question_type: "single_choice",
    question_text: "The magnetic field at point $P$ is",
    options: [
      "$\\frac{\\mu_0 i}{4\\sqrt{2}\\pi a} \\odot$",
      "$\\frac{\\mu_0 i}{4\\sqrt{2}\\pi a} \\otimes$",
      "$\\frac{\\mu_0 i}{8\\sqrt{2}\\pi a} \\odot$",
      "$\\frac{\\mu_0 i}{8\\sqrt{2}\\pi a} \\otimes$"
    ],
    correct_index: 1,
    topic: "Biot-Savart Law for Finite Straight Wire Segments",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q1_l_shaped_loop.png",
    solution: "1. Let us choose a coordinate system with point $P$ at the origin $(0,0)$.\n2. The closed conducting loop carrying current $i$ consists of six straight segments:\n- Segment 1 (right vertical, from $(0, -2a)$ to $(0, -a)$): Point $P(0,0)$ lies along the extension of this wire, so $\\vec{B}_1 = 0$.\n- Segment 2 (inner horizontal, from $(0, -a)$ to $(-a, -a)$, current pointing left $-x$): The perpendicular distance from $P$ to the wire is $d = a$. Angles subtended at $P$ are $\\theta_1 = 0^\\circ$ and $\\theta_2 = 45^\\circ$ (since $\\tan 45^\\circ = a/a = 1$). By the right-hand rule, its magnetic field at $P$ is directed out of the page:\n$$\\vec{B}_2 = \\frac{\\mu_0 i}{4\\pi a}(\\sin 45^\\circ - \\sin 0^\\circ) \\odot = \\frac{\\mu_0 i}{4\\sqrt{2}\\pi a} \\odot$$\n- Segment 3 (inner vertical, from $(-a, -a)$ to $(-a, 0)$, current pointing up $+y$): The perpendicular distance from $P$ is $d = a$. Angles are $\\theta_1 = 45^\\circ$ and $\\theta_2 = 0^\\circ$. By the right-hand rule, its magnetic field at $P$ is directed into the page:\n$$\\vec{B}_3 = \\frac{\\mu_0 i}{4\\pi a}(\\sin 45^\\circ - \\sin 0^\\circ) \\otimes = \\frac{\\mu_0 i}{4\\sqrt{2}\\pi a} \\otimes$$\nNotice that $\\vec{B}_2$ and $\\vec{B}_3$ cancel each other out completely: $\\vec{B}_2 + \\vec{B}_3 = 0$.\n- Segment 4 (top horizontal, from $(-a, 0)$ to $(-2a, 0)$): Point $P(0,0)$ lies along the line of this wire, so $\\vec{B}_4 = 0$.\n- Segment 5 (left vertical, from $(-2a, 0)$ to $(-2a, -2a)$, current pointing down $-y$): Perpendicular distance is $d = 2a$. Angles are $\\theta_1 = 0^\\circ$ and $\\theta_2 = 45^\\circ$ (since $\\tan 45^\\circ = 2a/2a = 1$). By the right-hand rule, magnetic field at $P$ is into the page:\n$$\\vec{B}_5 = \\frac{\\mu_0 i}{4\\pi (2a)}(\\sin 45^\\circ) \\otimes = \\frac{\\mu_0 i}{8\\sqrt{2}\\pi a} \\otimes$$\n- Segment 6 (bottom horizontal, from $(-2a, -2a)$ to $(0, -2a)$, current pointing right $+x$): Perpendicular distance is $d = 2a$. Angles are $\\theta_1 = 45^\\circ$ and $\\theta_2 = 0^\\circ$. By the right-hand rule, magnetic field at $P$ is into the page:\n$$\\vec{B}_6 = \\frac{\\mu_0 i}{4\\pi (2a)}(\\sin 45^\\circ) \\otimes = \\frac{\\mu_0 i}{8\\sqrt{2}\\pi a} \\otimes$$\n3. The total net magnetic field at point $P$ is:\n$$\\vec{B}_{\\text{net}} = \\vec{B}_5 + \\vec{B}_6 = 2 \\times \\left(\\frac{\\mu_0 i}{8\\sqrt{2}\\pi a}\\right) \\otimes = \\frac{\\mu_0 i}{4\\sqrt{2}\\pi a} \\otimes$$\n4. Hence, option (2) is correct."
  },
  {
    q_num: 2,
    question_type: "single_choice",
    question_text: "A current carrying wire carries a current of $2\\text{ A}$ along the $z$-axis which is out of the page while another wire carrying current of $4\\text{ A}$ in the same direction lies parallel to the first as shown in the figure. Then around which loop linking both wires $\\oint \\vec{B}\\cdot d\\vec{l}$ will be zero?",
    options: ["Loop (1)", "Loop (2)", "Loop (3)", "None of these"],
    correct_index: 0,
    topic: "Ampere's Circuital Law and Winding Numbers",
    difficulty: "hard",
    image_url: "/uploads/moving_charges/moving_charges_q2_ampere_loops.png",
    solution: "1. According to Ampère's Circuital Law:\n$$\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}$$\n2. For currents directed out of the page ($\\odot$), by the right-hand grip rule, a counter-clockwise traversal encircles positive current ($+I$), while a clockwise traversal encircles negative current ($-I$).\n3. In general, if a closed directed path winds $n_1$ times around the $2\\text{ A}$ wire and $n_2$ times around the $4\\text{ A}$ wire:\n$$I_{\\text{enclosed}} = n_1 (2\\text{ A}) + n_2 (4\\text{ A})$$\n4. For $\\oint \\vec{B}\\cdot d\\vec{l} = 0$, we require:\n$$I_{\\text{enclosed}} = 0 \\implies 2n_1 + 4n_2 = 0 \\implies n_1 = -2n_2$$\n5. In loop (1):\n- The loop encircles the $4\\text{ A}$ wire once in the counter-clockwise direction, giving $n_2 = +1$.\n- After crossing over in a figure-8 knot, it encircles the $2\\text{ A}$ wire twice in the clockwise direction, giving $n_1 = -2$.\n- The net enclosed current is:\n$$I_{\\text{enclosed}} = (-2)(2\\text{ A}) + (+1)(4\\text{ A}) = -4\\text{ A} + 4\\text{ A} = 0$$\n6. Therefore, $\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 (0) = 0$ for loop (1).\n7. Hence, option (1) is correct."
  },
  {
    q_num: 3,
    question_type: "single_choice",
    question_text: "Positive like charge of linear charge density $\\lambda_1$ is passed on the outer circumference of an annular disc, having outer radius $2R$. Negative like charge of linear charge density $\\lambda_2$ is passed on the inner circumference of the disc, having inner radius $R$. The disc is rotating with constant angular velocity $\\omega$ about an axis passing through the centre of mass and perpendicular to its plane. If the net magnetic field at the centre of the disc is $0$, then the ratio $\\lambda_1/\\lambda_2$ is",
    options: ["$1 : 2$", "$2 : 1$", "$4 : 1$", "$1 : 1$"],
    correct_index: 3,
    topic: "Magnetic Field at Centre of Rotating Charged Rings",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q3_annular_disc.png",
    solution: "1. Outer circumference:\n- Radius: $r_1 = 2R$\n- Total charge on outer rim: $q_1 = \\lambda_1 (2\\pi r_1) = 4\\pi R \\lambda_1$\n- Time period of rotation: $T = \\frac{2\\pi}{\\omega}$\n- Equivalent circular current: $i_1 = \\frac{q_1}{T} = \\frac{4\\pi R \\lambda_1}{2\\pi / \\omega} = 2 R \\lambda_1 \\omega$\n- Magnetic field at the centre due to outer current:\n$$B_1 = \\frac{\\mu_0 i_1}{2 r_1} = \\frac{\\mu_0 (2 R \\lambda_1 \\omega)}{2(2R)} = \\frac{\\mu_0 \\lambda_1 \\omega}{2}$$\n2. Inner circumference:\n- Radius: $r_2 = R$\n- Total charge on inner rim: $q_2 = \\lambda_2 (2\\pi r_2) = 2\\pi R \\lambda_2$\n- Equivalent circular current: $i_2 = \\frac{q_2}{T} = \\frac{2\\pi R \\lambda_2}{2\\pi / \\omega} = R \\lambda_2 \\omega$\n- Magnetic field at the centre due to inner current:\n$$B_2 = \\frac{\\mu_0 i_2}{2 r_2} = \\frac{\\mu_0 (R \\lambda_2 \\omega)}{2R} = \\frac{\\mu_0 \\lambda_2 \\omega}{2}$$\n3. Since outer charge is positive and inner charge is negative, the currents rotate in the same sense but have opposite charges, producing opposite magnetic fields along the axis.\n4. Given that the net magnetic field at the centre is zero:\n$$B_1 - B_2 = 0 \\implies \\frac{\\mu_0 \\lambda_1 \\omega}{2} = \\frac{\\mu_0 \\lambda_2 \\omega}{2} \\implies \\lambda_1 = \\lambda_2$$\n$$\\frac{\\lambda_1}{\\lambda_2} = 1 : 1$$\n5. Hence, option (4) is correct."
  },
  {
    q_num: 4,
    question_type: "single_choice",
    question_text: "A square loop made of 4 identical conducting rods each of mass $m$ and length $l$ carry current $i$. The loop is placed in a vertical position on a frictionless horizontal plane. A uniform horizontal magnetic field $B_0$ is in the plane of the loop, then find the torque due to magnetic field on the loop at this instant.",
    options: ["Zero", "$i l^2 B_0$", "$\\frac{i l^2 B_0}{2}$", "$2 i l^2 B_0$"],
    correct_index: 1,
    topic: "Torque on a Planar Current Loop in Uniform Magnetic Field",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q4_square_loop_torque.png",
    solution: "1. The area of the square loop is $A = l^2$.\n2. The magnetic dipole moment of the current loop is:\n$$\\vec{M} = i \\vec{A}$$\nwhere the area vector $\\vec{A}$ is oriented perpendicular to the plane of the loop.\n3. The magnetic field $\\vec{B}_0$ lies in the plane of the loop.\n4. Therefore, the angle $\\theta$ between the magnetic dipole moment $\\vec{M}$ and the magnetic field $\\vec{B}_0$ is strictly $90^\\circ$:\n$$\\theta = 90^\\circ$$\n5. The torque exerted by the magnetic field on the loop is given by:\n$$\\vec{\\tau} = \\vec{M} \\times \\vec{B}_0$$\n$$\\tau = M B_0 \\sin 90^\\circ = (i l^2) B_0 (1) = i l^2 B_0$$\n6. Hence, the torque due to magnetic field on the loop is $i l^2 B_0$ (Option 2)."
  },
  {
    q_num: 5,
    question_type: "single_choice",
    question_text: "A loop carrying current $i$ lies in $x$-$y$ plane as shown in the figure. The loop is made of 4 semicircular portions. The magnetic moment of the current loop is",
    options: [
      "$a^2 i \\hat{k}$",
      "$(2\\pi + 1)a^2 i \\hat{k}$",
      "$\\left(1 + \\frac{\\pi}{2}\\right) i a^2 \\hat{k}$",
      "$-\\left(1 + \\frac{\\pi}{2}\\right) i a^2 \\hat{k}$"
    ],
    correct_index: 2,
    topic: "Magnetic Moment of Symmetrical Composite Planar Current Loop",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q5_four_semicircles.png",
    solution: "1. The closed planar loop is formed by a central square of side $a$ with a semicircular arc of diameter $a$ attached to each of its 4 edges.\n2. Enclosed area of the loop:\n- Area of central square: $A_{\\text{square}} = a^2$\n- Each semicircular arc has diameter $a$, so radius $r = \\frac{a}{2}$.\n- Area of one semicircle: $A_{\\text{semi}} = \\frac{1}{2} \\pi r^2 = \\frac{1}{2} \\pi \\left(\\frac{a}{2}\\right)^2 = \\frac{\\pi a^2}{8}$\n- Total area of all 4 semicircles:\n$$A_{4\\text{ semi}} = 4 \\times \\left(\\frac{\\pi a^2}{8}\\right) = \\frac{\\pi a^2}{2}$$\n- Total enclosed area of the loop:\n$$A_{\\text{total}} = A_{\\text{square}} + A_{4\\text{ semi}} = a^2 + \\frac{\\pi a^2}{2} = a^2 \\left(1 + \\frac{\\pi}{2}\\right)$$\n3. Direction of magnetic moment:\n- Looking at the current arrows along the perimeter, the circulation in the $x$-$y$ plane is counter-clockwise (anticlockwise).\n- By the right-hand rule, counter-clockwise circulation in the $x$-$y$ plane produces an area vector along the $+z$ direction ($+\\hat{k}$).\n4. Therefore, the magnetic moment vector is:\n$$\\vec{M} = i A_{\\text{total}} \\hat{k} = \\left(1 + \\frac{\\pi}{2}\\right) i a^2 \\hat{k}$$\n5. Hence, option (3) is correct."
  },
  {
    q_num: 6,
    question_type: "single_choice",
    question_text: "A homogeneous non-conducting disc of radius $R$ carries uniform surface charge density $\\sigma$. The disc is rotating about an axis through its centre of mass and perpendicular to the plane with constant angular velocity $\\omega$. The magnetic dipole moment is",
    options: [
      "$\\frac{\\pi \\sigma R^4 \\omega}{4}$",
      "$\\frac{\\pi \\sigma R^4 \\omega}{2}$",
      "$\\frac{\\sigma R^2 \\omega}{2}$",
      "$\\frac{\\pi \\sigma R^2 \\omega}{4}$"
    ],
    correct_index: 0,
    topic: "Magnetic Dipole Moment of Uniformly Charged Rotating Disc",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q6_rotating_disc.png",
    solution: "1. Method 1 (Direct integration over elemental concentric rings):\n- Consider a thin concentric ring of radius $r$ and radial width $dr$.\n- Charge on the ring: $dq = \\sigma (2\\pi r \\, dr) = 2\\pi \\sigma r \\, dr$\n- Time period of rotation: $T = \\frac{2\\pi}{\\omega}$\n- Effective electric current of the rotating ring:\n$$dI = \\frac{dq}{T} = \\frac{2\\pi \\sigma r \\, dr}{2\\pi / \\omega} = \\sigma \\omega r \\, dr$$\n- Magnetic dipole moment of this circular current loop of area $\\pi r^2$:\n$$dM = dI \\times (\\pi r^2) = (\\sigma \\omega r \\, dr)(\\pi r^2) = \\pi \\sigma \\omega r^3 \\, dr$$\n- Integrating from $r = 0$ to $r = R$:\n$$M = \\int_0^R \\pi \\sigma \\omega r^3 \\, dr = \\pi \\sigma \\omega \\left[\\frac{r^4}{4}\\right]_0^R = \\frac{\\pi \\sigma R^4 \\omega}{4}$$\n2. Method 2 (Using Gyromagnetic Ratio):\n- For any uniformly charged and uniformly dense rotating body, $\\frac{M}{L} = \\frac{q}{2m}$.\n- Here, moment of inertia of disc is $I_{\\text{disc}} = \\frac{1}{2} m R^2$, so angular momentum is $L = \\frac{1}{2} m R^2 \\omega$.\n- Total charge is $q = \\sigma \\pi R^2$.\n- Therefore:\n$$M = \\frac{q}{2m} L = \\frac{\\sigma \\pi R^2}{2m} \\left(\\frac{1}{2} m R^2 \\omega\\right) = \\frac{\\pi \\sigma R^4 \\omega}{4}$$\n3. Hence, option (1) is correct."
  },
  {
    q_num: 7,
    question_type: "single_choice",
    question_text: "Keeping all the parameters constant, the number of turns in the coil of a moving coil galvanometer is doubled for the sake of increment in its sensitivity. Choose the correct alternative.",
    options: [
      "Current sensitivity and voltage sensitivity both are doubled",
      "Voltage sensitivity is doubled but current sensitivity remains unchanged",
      "Current sensitivity is doubled but voltage sensitivity remains unchanged",
      "Current sensitivity is doubled but voltage sensitivity is halved"
    ],
    correct_index: 2,
    topic: "Galvanometer Sensitivity: Current vs Voltage Sensitivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. Current Sensitivity ($I_s$) is defined as deflection per unit current:\n$$I_s = \\frac{\\theta}{I} = \\frac{N A B}{C}$$\nwhere $N$ is number of turns, $A$ is area of coil, $B$ is magnetic field, and $C$ is restoring couple per unit twist.\n- When $N$ is doubled ($N' = 2N$) with other parameters constant:\n$$I'_s = \\frac{(2N) A B}{C} = 2 I_s \\quad (\\text{Current sensitivity is doubled})$$\n2. Voltage Sensitivity ($V_s$) is defined as deflection per unit voltage:\n$$V_s = \\frac{\\theta}{V} = \\frac{I_s}{R}$$\nwhere $R$ is the electrical resistance of the galvanometer coil.\n- Since the coil wire length is directly proportional to the number of turns ($l \\propto N$), doubling the turns doubles the wire length and therefore doubles its resistance: $R' = 2R$.\n- The new voltage sensitivity is:\n$$V'_s = \\frac{I'_s}{R'} = \\frac{2 I_s}{2 R} = \\frac{I_s}{R} = V_s \\quad (\\text{Voltage sensitivity remains unchanged})$$\n3. Hence, current sensitivity is doubled but voltage sensitivity remains unchanged (Option 3)."
  },
  {
    q_num: 8,
    question_type: "single_choice",
    question_text: "Two charged particles having the same mass $m$ and charges $q$ and $-q$ separated by a distance $d$ enter a uniform magnetic field $B$ directed perpendicular to the paper inward with speeds $v_1$ and $v_2$ as shown. The particles will not collide if (neglect electrostatic force between charges)",
    options: [
      "$d \\ge \\frac{2m}{Bq}(v_1 - v_2)$",
      "$d \\le \\frac{2m}{qB}(v_1 - v_2)$",
      "$d \\le \\frac{2m}{Bq}(v_1 + v_2)$",
      "$d \\ge \\frac{2m}{Bq}(v_1 + v_2)$"
    ],
    correct_index: 3,
    topic: "Motion of Charged Particles in Perpendicular Uniform Magnetic Field",
    difficulty: "medium",
    image_url: "/uploads/moving_charges/moving_charges_q8_opposing_charges_collision.png",
    solution: "1. The magnetic field $\\vec{B}$ is directed into the page ($-\\hat{k}$).\n2. For the top particle with charge $-q$ entering with velocity $\\vec{v}_1 = v_1 \\hat{i}$:\n$$\\vec{F}_1 = (-q)(\\vec{v}_1 \\times \\vec{B}) = (-q)(v_1 \\hat{i} \\times (-B\\hat{k})) = (-q)(v_1 B \\hat{j}) = -q v_1 B \\hat{j}$$\n- The magnetic force acts downwards, bending the negative particle into a semicircular arc of radius $r_1 = \\frac{m v_1}{q B}$ curving downward toward the lower path.\n- The maximum downward excursion of this particle from its entry level is $2 r_1$.\n3. For the bottom particle with charge $+q$ entering with velocity $\\vec{v}_2 = v_2 \\hat{i}$:\n$$\\vec{F}_2 = (+q)(\\vec{v}_2 \\times \\vec{B}) = (+q)(v_2 \\hat{i} \\times (-B\\hat{k})) = +q v_2 B \\hat{j}$$\n- The magnetic force acts upwards, bending the positive particle into a semicircular arc of radius $r_2 = \\frac{m v_2}{q B}$ curving upward toward the upper path.\n- The maximum upward excursion of this particle from its entry level is $2 r_2$.\n4. For the two particles NOT to collide along their trajectories, the initial separation $d$ between their entry lines must be greater than or equal to the sum of their vertical diameter displacements:\n$$d \\ge 2 r_1 + 2 r_2$$\n$$d \\ge 2\\left(\\frac{m v_1}{q B}\\right) + 2\\left(\\frac{m v_2}{q B}\\right) = \\frac{2m}{B q}(v_1 + v_2)$$\n5. Hence, option (4) is correct."
  },
  {
    q_num: 9,
    question_type: "single_choice",
    question_text: "A charged particle moves in a gravity-free space without change in velocity. If $\\vec{E}$ and $\\vec{B}$ represents the electric and magnetic field respectively, this region may have",
    options: [
      "$\\vec{E} = 0, \\vec{B} = 0$",
      "$\\vec{E} \\ne 0, \\vec{B} \\ne 0$",
      "$\\vec{E}$ and $\\vec{B}$ are inclined at $45^\\circ$ with each other",
      "Both (1) and (2)"
    ],
    correct_index: 3,
    topic: "Lorentz Force Equilibrium Conditions",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a charged particle to move with constant velocity (zero acceleration), the net Lorentz force acting on it must be zero:\n$$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) = 0$$\n2. Case 1: When both fields are absent:\n$$\\vec{E} = 0, \\quad \\vec{B} = 0 \\implies \\vec{F} = 0$$\nThus, condition (1) is completely valid.\n3. Case 2: When both fields are present and mutually perpendicular to each other as well as to velocity (velocity selector setup):\n$$\\vec{E} = -(\\vec{v} \\times \\vec{B})$$\n- The electric force $q\\vec{E}$ is balanced exactly by the magnetic force $q(\\vec{v} \\times \\vec{B})$ when $E = v B$ and $\\vec{E} \\perp \\vec{B} \\perp \\vec{v}$.\n- In this configuration, the net force is zero even though $\\vec{E} \\ne 0$ and $\\vec{B} \\ne 0$.\n4. Therefore, the region may have either $\\vec{E}=0, \\vec{B}=0$ or $\\vec{E}\\ne 0, \\vec{B}\\ne 0$. Hence, 'Both (1) and (2)' is the correct option (Option 4)."
  },
  {
    q_num: 10,
    question_type: "single_choice",
    question_text: "A wire of length $L_0$ and mass $m$ is suspended by a pair of springs in a magnetic field of induction $B_0$. The magnitude and direction of the current required to remove the tension in the supporting springs is",
    options: [
      "$\\frac{2mg}{L_0 B_0}$ from $P$ to $Q$",
      "$\\frac{mg}{L_0 B_0}$ from $P$ to $Q$",
      "$\\frac{2mg}{L_0 B_0}$ from $Q$ to $P$",
      "$\\frac{mg}{L_0 B_0}$ from $Q$ to $P$"
    ],
    correct_index: 1,
    topic: "Magnetic Force on Current-Carrying Conductor Balancing Gravity",
    difficulty: "easy",
    image_url: "/uploads/moving_charges/moving_charges_q10_suspended_wire.png",
    solution: "1. The wire has mass $m$ and length $L_0$, so the downward gravitational force acting on it is $F_g = mg$.\n2. The wire is supported by two springs. For the tension in the supporting springs to become zero, the upward magnetic force $\\vec{F}_m$ on the current-carrying wire must completely balance the downward gravity:\n$$F_m = F_g \\implies I L_0 B_0 = mg$$\n$$I = \\frac{mg}{L_0 B_0}$$\n3. Direction of current:\n- The magnetic field $\\vec{B}_0$ is directed into the plane of the paper ($-\\hat{k}$).\n- The magnetic force is $\\vec{F}_m = I (\\vec{L} \\times \\vec{B}_0)$.\n- For $\\vec{F}_m$ to be directed vertically upward ($+\\hat{j}$):\n$$\\hat{L} \\times (-\\hat{k}) = +\\hat{j}$$\n- Since $\\hat{i} \\times (-\\hat{k}) = -(\\hat{i} \\times \\hat{k}) = -(-\\hat{j}) = +\\hat{j}$, the current must flow along the $+\\hat{i}$ direction (horizontal from left to right, which is from $P$ to $Q$).\n4. Thus, the current required is $\\frac{mg}{L_0 B_0}$ from $P$ to $Q$ (Option 2)."
  }
];
