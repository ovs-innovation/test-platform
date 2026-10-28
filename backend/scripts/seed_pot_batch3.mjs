export const POTENTIAL_BATCH3_QUESTIONS = [
  // Page 42: Q182 to Q186
  {
    q_num: 182,
    question_text: "A parallel plate capacitor is charged and disconnected from battery. If separation between the plates is now increased, then the wrong statement is",
    options: [
      "Capacitance decreases",
      "Charge on the capacitor increases",
      "Potential difference across the plates increases",
      "Potential energy stored in the capacitor increases"
    ],
    correct_index: 1,
    topic: "Isolated Capacitor Plate Separation",
    difficulty: "easy",
    image_url: "",
    solution: "1. When a charged parallel plate capacitor is disconnected from the battery, the charge $Q$ on its plates is conserved and remains constant ($Q = \\text{constant}$).\n2. The capacitance is given by $C = \\frac{\\varepsilon_0 A}{d}$. When the plate separation $d$ is increased, the capacitance $C$ decreases (Statement 1 is true).\n3. Because $Q$ is constant, the statement 'Charge on the capacitor increases' is FALSE (wrong statement).\n4. The potential difference across the plates is $V = \\frac{Q}{C}$. Since $C$ decreases and $Q$ is constant, $V$ increases (Statement 3 is true).\n5. The electrostatic energy stored is $U = \\frac{Q^2}{2C}$. Since $C$ decreases and $Q$ is constant, $U$ increases (Statement 4 is true).\n6. Therefore, the wrong statement to choose is (2)."
  },
  {
    q_num: 183,
    question_text: "The equivalent capacitance between $A$ and $B$ is",
    options: ["$3.75\\;\\mu\\text{F}$", "$2\\;\\mu\\text{F}$", "$21\\;\\mu\\text{F}$", "$16\\;\\mu\\text{F}$"],
    correct_index: 1,
    topic: "Balanced Wheatstone Bridge on Triangular Circuit",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch3_q183_bridge_triangle.png",
    solution: "1. Tracing the circuit nodes between terminals $A$ and $B$:\n- Terminal $A$ connects to the top vertex $T$ through a $1\\;\\mu\\text{F}$ capacitor ($C_{AT} = 1\\;\\mu\\text{F}$).\n- Terminal $A$ connects to the bottom-right vertex $R$ through a $2\\;\\mu\\text{F}$ capacitor ($C_{AR} = 2\\;\\mu\\text{F}$).\n- Between vertex $T$ and vertex $R$, there is a bridging capacitor of $5\\;\\mu\\text{F}$ ($C_{TR} = 5\\;\\mu\\text{F}$).\n- From vertex $T$ to terminal $B$, there are two capacitors $3\\;\\mu\\text{F}$ and $6\\;\\mu\\text{F}$ in series:\n$$C_{TB} = \\frac{3 \\times 6}{3 + 6} = \\frac{18}{9} = 2\\;\\mu\\text{F}$$\n- From vertex $R$ to terminal $B$, there is a capacitor of $4\\;\\mu\\text{F}$ ($C_{RB} = 4\\;\\mu\\text{F}$).\n2. Testing the Wheatstone bridge balance condition between terminals $A$ and $B$:\n$$\\frac{C_{AT}}{C_{TB}} = \\frac{1\\;\\mu\\text{F}}{2\\;\\mu\\text{F}} = \\frac{1}{2}$$\n$$\\frac{C_{AR}}{C_{RB}} = \\frac{2\\;\\mu\\text{F}}{4\\;\\mu\\text{F}} = \\frac{1}{2}$$\n3. Since $\\frac{C_{AT}}{C_{TB}} = \\frac{C_{AR}}{C_{RB}}$, the bridge is balanced! Nodes $T$ and $R$ are at the same potential ($V_T = V_R$).\n4. No charge flows through the central $5\\;\\mu\\text{F}$ capacitor, so it can be removed from the circuit.\n5. The remaining network consists of two parallel branches:\n- Upper branch: $C_{AT} = 1\\;\\mu\\text{F}$ in series with $C_{TB} = 2\\;\\mu\\text{F}$:\n$$C_{\\text{upper}} = \\frac{1 \\times 2}{1 + 2} = \\frac{2}{3}\\;\\mu\\text{F}$$\n- Lower branch: $C_{AR} = 2\\;\\mu\\text{F}$ in series with $C_{RB} = 4\\;\\mu\\text{F}$:\n$$C_{\\text{lower}} = \\frac{2 \\times 4}{2 + 4} = \\frac{8}{6} = \\frac{4}{3}\\;\\mu\\text{F}$$\n6. Combining the parallel branches:\n$$C_{AB} = C_{\\text{upper}} + C_{\\text{lower}} = \\frac{2}{3} + \\frac{4}{3} = \\frac{6}{3} = 2\\;\\mu\\text{F}$$"
  },
  {
    q_num: 184,
    question_text: "An electric field $\\vec{E} = 10x\\hat{i}\\text{ V/m}$ exists in a space. Take potential at $(10\\text{ m}, 20\\text{ m})$ to be zero, then the potential at the origin is",
    options: ["$200\\text{ V}$", "$300\\text{ V}$", "$500\\text{ V}$", "$400\\text{ V}$"],
    correct_index: 2,
    topic: "Potential from Non-Uniform Electric Field",
    difficulty: "easy",
    image_url: "",
    solution: "1. The relation between electric potential and electric field is:\n$$V(\\vec{r}_2) - V(\\vec{r}_1) = -\\int_{\\vec{r}_1}^{\\vec{r}_2} \\vec{E} \\cdot d\\vec{r}$$\n2. Since $\\vec{E} = 10x\\hat{i}\\text{ V/m}$ has only an $x$-component, the integral depends only on $x$:\n$$V(10, 20) - V(0, 0) = -\\int_0^{10} 10x\\,dx$$\n3. Evaluating the integral:\n$$V(10, 20) - V(0, 0) = -\\left[5x^2\\right]_0^{10} = -5(10^2) = -500\\text{ V}$$\n4. Given $V(10, 20) = 0\\text{ V}$:\n$$0 - V(0, 0) = -500\\text{ V} \\implies V(0, 0) = 500\\text{ V}$$\n5. Thus, the potential at the origin is $500\\text{ V}$."
  },
  {
    q_num: 185,
    question_text: "A parallel plate capacitor is charged to potential $V$. A dielectric slab of thickness $3\\text{ mm}$ is inserted between the plates and it becomes necessary to increase the distance between them by $2.4\\text{ mm}$ to maintain the same potential difference. The dielectric constant of the slab is",
    options: ["$3$", "$4$", "$5$", "$6$"],
    correct_index: 2,
    topic: "Dielectric Slab Insertion and Plate Displacement",
    difficulty: "medium",
    image_url: "",
    solution: "1. To maintain the same potential difference with the same charge, the capacitance must remain unchanged ($C' = C$).\n2. When a dielectric slab of thickness $t$ and constant $K$ is introduced and the plate separation is changed from $d$ to $d'$, the new capacitance is:\n$$C' = \\frac{\\varepsilon_0 A}{d' - t + \\frac{t}{K}}$$\n3. For $C' = C = \\frac{\\varepsilon_0 A}{d}$, the effective separation must remain $d$:\n$$d' - t + \\frac{t}{K} = d \\implies (d' - d) = t\\left(1 - \\frac{1}{K}\\right)$$\n4. Here, the displacement of the plate is $\\Delta d = d' - d = 2.4\\text{ mm}$, and the slab thickness is $t = 3\\text{ mm}$:\n$$2.4 = 3\\left(1 - \\frac{1}{K}\\right)$$\n$$1 - \\frac{1}{K} = \\frac{2.4}{3} = 0.8$$\n$$\\frac{1}{K} = 1 - 0.8 = 0.2 = \\frac{1}{5} \\implies K = 5$$"
  },
  {
    q_num: 186,
    question_text: "The self potential energy of a uniformly charged non-conducting solid sphere carrying charge $q$ and radius $R$ is [$k = \\frac{1}{4\\pi\\varepsilon_0}$]",
    options: [
      "Zero",
      "$\\frac{3kq^2}{5R}$",
      "$\\frac{kq^2}{2R}$",
      "$\\frac{kq^2}{3R}$"
    ],
    correct_index: 1,
    topic: "Electrostatic Self-Energy of Uniform Solid Sphere",
    difficulty: "medium",
    image_url: "",
    solution: "1. The electrostatic self-energy of a uniformly charged solid sphere of radius $R$ and total charge $q$ is the total work done in assembling the sphere by bringing charge elements from infinity.\n2. Consider a sphere of radius $r$ ($r < R$) already assembled with charge $q_r = q\\left(\\frac{r}{R}\\right)^3$.\n3. The work done in bringing a shell of charge $dq_r = \\frac{3q r^2}{R^3}\\,dr$ to the surface is:\n$$dU = \\frac{k q_r dq_r}{r} = \\frac{k \\left[q\\frac{r^3}{R^3}\\right] \\left[\\frac{3q r^2}{R^3}dr\\right]}{r} = \\frac{3k q^2}{R^6} r^4\\,dr$$\n4. Integrating from $r = 0$ to $r = R$:\n$$U = \\frac{3k q^2}{R^6} \\int_0^R r^4\\,dr = \\frac{3k q^2}{R^6} \\left[\\frac{R^5}{5}\\right] = \\frac{3kq^2}{5R}$$\n5. Hence, the self potential energy is $\\frac{3kq^2}{5R}$."
  },

  // Page 42: Q187 to Q191
  {
    q_num: 187,
    question_text: "The equivalent capacitance between point $P$ and $Q$ in the circuit shown is",
    options: ["$C$", "$2C$", "$C/2$", "$4C$"],
    correct_index: 0,
    topic: "Symmetrical Capacitor Network with Outer Loop",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch3_q187_symmetrical_loop.png",
    solution: "1. In the circuit, the outer rectangle forms a single equipotential conducting loop (let this common node be $O$).\n2. Terminal $P$ lies on the upper branch between two capacitors $C$ and $C$. The other plate of each capacitor connects to the outer loop $O$. Thus, between node $P$ and common node $O$, there are two capacitors $C$ in parallel:\n$$C_{PO} = C + C = 2C$$\n3. Terminal $Q$ lies on the middle branch between two capacitors $C$ and $C$. The other plate of each capacitor also connects to the same outer loop $O$. Thus, between node $Q$ and common node $O$, there are two capacitors $C$ in parallel:\n$$C_{QO} = C + C = 2C$$\n4. The equivalent capacitance between terminals $P$ and $Q$ is therefore the series combination of $C_{PO}$ and $C_{QO}$:\n$$C_{PQ} = \\frac{C_{PO} \\cdot C_{QO}}{C_{PO} + C_{QO}} = \\frac{2C \\times 2C}{2C + 2C} = \\frac{4C^2}{4C} = C$$"
  },
  {
    q_num: 188,
    question_text: "If the potential difference between the plates of a capacitor is increased by $20\\%$, then energy stored in the capacitor increases by exactly",
    options: ["$20\\%$", "$22\\%$", "$40\\%$", "$44\\%$"],
    correct_index: 3,
    topic: "Percentage Change in Stored Electrostatic Energy",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrostatic energy stored in a capacitor of capacitance $C$ at potential difference $V$ is:\n$$U = \\frac{1}{2} C V^2$$\n2. When the potential difference is increased by $20\\%$, the new potential difference becomes:\n$$V' = V + 0.20V = 1.20V$$\n3. The new energy stored in the capacitor is:\n$$U' = \\frac{1}{2} C (V')^2 = \\frac{1}{2} C (1.20 V)^2 = 1.44 \\left(\\frac{1}{2} C V^2\\right) = 1.44 U$$\n4. The fractional increase in energy is:\n$$\\frac{\\Delta U}{U} = \\frac{U' - U}{U} = 1.44 - 1 = 0.44$$\n5. In percentage:\n$$\\%\\text{ increase} = 0.44 \\times 100\\% = 44\\%$$"
  },
  {
    q_num: 189,
    question_text: "Electrostatic potential on the surface of a metal charged sphere of radius $R$ is $V$. Its potential at a distance $\\frac{R}{3}$ from centre is",
    options: ["$\\frac{V}{3}$", "$3V$", "$V$", "Zero"],
    correct_index: 2,
    topic: "Potential Inside a Conducting Sphere",
    difficulty: "easy",
    image_url: "",
    solution: "1. A metallic sphere is an electrical conductor in electrostatic equilibrium.\n2. Inside a conducting sphere, the electric field is strictly zero everywhere ($\\vec{E} = 0$).\n3. Since $\\vec{E} = -\\frac{dV}{dr} = 0$, the potential does not change with radial distance inside the sphere ($V = \\text{constant}$).\n4. Therefore, the electric potential at every interior point, including $r = \\frac{R}{3}$, is equal to the surface potential $V$."
  },
  {
    q_num: 190,
    question_text: "An $\\alpha$-particle and a proton are accelerated from rest through same potential difference. The ratio of their final kinetic energies are",
    options: ["$1 : 3$", "$2 : 3$", "$1 : 4$", "$2 : 1$"],
    correct_index: 3,
    topic: "Kinetic Energy Acquired in Potential Difference",
    difficulty: "easy",
    image_url: "",
    solution: "1. By the work-energy theorem, the kinetic energy acquired by a charge $q$ accelerated from rest through a potential difference $V$ is:\n$$K = q V$$\n2. For an $\\alpha$-particle ($^4_2\\text{He}^{2+}$), the charge is $q_\\alpha = +2e$.\n3. For a proton ($^1_1\\text{H}^+$), the charge is $q_p = +e$.\n4. Since both are accelerated across the identical potential difference $V$:\n$$K_\\alpha = q_\\alpha V = 2e V$$\n$$K_p = q_p V = e V$$\n5. Taking the ratio:\n$$\\frac{K_\\alpha}{K_p} = \\frac{2eV}{eV} = \\frac{2}{1} = 2 : 1$$"
  },
  {
    q_num: 191,
    question_text: "The work done in moving an electron of charge $e$ and mass $m$ from $A$ to $B$ along the circular path shown by arrow (in figure) in vertical plane in the field of charge $Q$ is",
    options: [
      "$2mgr$",
      "$\\frac{2Qe}{r}$",
      "$2mgr + \\frac{2Qe}{r}$",
      "Zero"
    ],
    correct_index: 0,
    topic: "Work Done in Electrostatic and Gravitational Fields",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch3_q191_vertical_semicircle.png",
    solution: "1. The total work done on the electron consists of work done against electrostatic forces plus work done against gravity:\n$$W = W_{\\text{elec}} + W_{\\text{grav}}$$\n2. Electrostatic contribution:\n- The central charge $+Q$ creates an electrostatic field with potential $V(r) = \\frac{kQ}{r}$.\n- Both the initial point $A$ and final point $B$ lie on the circumference of a circle of radius $r$ centered at $+Q$ ($r_A = r_B = r$).\n- Points $A$ and $B$ are on the same equipotential surface, so $V_A = V_B$.\n- Work done against the conservative electrostatic force is:\n$$W_{\\text{elec}} = q (V_B - V_A) = 0$$\n3. Gravitational contribution:\n- The trajectory is in a vertical plane. Point $A$ is at the bottom and point $B$ is at the top of a vertical diameter of length $2r$.\n- The increase in vertical height is $h = 2r$.\n- The work done against gravity to lift the mass $m$ from $A$ to $B$ is:\n$$W_{\\text{grav}} = m g h = m g (2r) = 2mgr$$\n4. Therefore, total work done is $W = 2mgr + 0 = 2mgr$."
  },

  // Page 43: Q195 to Q199
  {
    q_num: 195,
    question_text: "A capacitor of capacity $10\\;\\mu\\text{F}$ is charged by a battery of emf $10\\text{ V}$. Energy stored in capacitor is",
    options: ["$0.5\\text{ mJ}$", "$0.5\\text{ J}$", "$0.5\\;\\mu\\text{J}$", "$0.5\\text{ kJ}$"],
    correct_index: 0,
    topic: "Energy Stored in Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. The energy stored in a capacitor of capacitance $C$ charged to potential $V$ is:\n$$U = \\frac{1}{2} C V^2$$\n2. Given $C = 10\\;\\mu\\text{F} = 10 \\times 10^{-6}\\text{ F} = 10^{-5}\\text{ F}$ and $V = 10\\text{ V}$:\n$$U = \\frac{1}{2} (10^{-5}\\text{ F}) (10\\text{ V})^2 = \\frac{1}{2} \\times 10^{-5} \\times 100 = 5 \\times 10^{-4}\\text{ J} = 0.5 \\times 10^{-3}\\text{ J} = 0.5\\text{ mJ}$$\n3. Hence, the energy stored is $0.5\\text{ mJ}$."
  },
  {
    q_num: 196,
    question_text: "Force between plates of an isolated, charged parallel plate capacitor separated by distance $r$ is $F$. If the separation between the plates is doubled, then force between the plates will become",
    options: ["$F$", "$\\frac{F}{2}$", "$\\frac{F}{4}$", "$4F$"],
    correct_index: 0,
    topic: "Attractive Force between Capacitor Plates",
    difficulty: "easy",
    image_url: "",
    solution: "1. For an isolated charged capacitor, the charge $Q$ on the plates is fixed and independent of separation.\n2. The electric field due to one plate of surface charge density $\\sigma = \\frac{Q}{A}$ is:\n$$E_1 = \\frac{\\sigma}{2\\varepsilon_0} = \\frac{Q}{2\\varepsilon_0 A}$$\n3. The attractive electrostatic force exerted on the charge $Q$ of the other plate is:\n$$F = Q E_1 = \\frac{Q^2}{2\\varepsilon_0 A}$$\n4. Notice that the expression for force $F$ contains only charge $Q$, plate area $A$, and permittivity $\\varepsilon_0$. It is completely independent of the distance of separation $r$.\n5. Therefore, doubling the separation distance between the plates leaves the attractive force unchanged ($F' = F$)."
  },
  {
    q_num: 197,
    question_text: "Which of the following statements is correct regarding electrostatics of conductors?",
    options: [
      "The interior of a conductor with no cavity can have no excess charge in the static situation",
      "Electrostatic potential is constant throughout the volume of the conductor",
      "Electrostatic potential has same value inside as that on its surface",
      "All of these"
    ],
    correct_index: 3,
    topic: "Electrostatic Properties of Conductors",
    difficulty: "easy",
    image_url: "",
    solution: "1. Statement (1): Inside a solid conductor in static equilibrium, $\\vec{E} = 0$. By Gauss's Law, the enclosed charge in any interior volume is zero, so any excess charge resides entirely on the outer surface.\n2. Statement (2): Since $\\vec{E} = -\\vec{\\nabla} V = 0$ everywhere inside the conductor, the electrostatic potential is uniform and constant throughout its entire volume.\n3. Statement (3): Because the potential is constant throughout the volume, the interior potential has the exact same value as that on the surface.\n4. Therefore, all of these statements are correct."
  },
  {
    q_num: 198,
    question_text: "Two identical geometry capacitors one with dielectric and other with air between the plates are shown in the figure. They are charged by a battery of emf $V$. The work done by battery in charging both the capacitors fully is",
    options: ["$5CV^2$", "$\\frac{1}{2}(5C)V^2$", "$\\frac{5}{4}CV^2$", "$3CV^2$"],
    correct_index: 0,
    topic: "Work Done by Battery in Charging Capacitors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch3_q198_two_capacitors_dielectric.png",
    solution: "1. Lower capacitor has air between plates, so its capacitance is $C_1 = C$.\n2. Upper capacitor has dielectric $K = 4$ completely filling it, so its capacitance is $C_2 = K C = 4C$.\n3. Since both capacitors are connected in parallel across the battery of emf $V$, the total equivalent capacitance is:\n$$C_{\\text{eq}} = C_1 + C_2 = C + 4C = 5C$$\n4. The total charge drawn from the battery to charge both capacitors is:\n$$Q_{\\text{total}} = C_{\\text{eq}} V = (5C) V = 5CV$$\n5. The work done by the battery in supplying this charge at constant potential $V$ is:\n$$W_{\\text{battery}} = Q_{\\text{total}} V = (5CV) V = 5CV^2$$"
  },
  {
    q_num: 199,
    question_text: "A potential difference will not appear between two thin concentric shells of radius $R_1$ and $R_2$ ($R_1 > R_2$) by which of the following process?",
    options: [
      "When a charge is given to inner shell",
      "When a charge is given to outer shell",
      "When equal charge is given to both the shells",
      "All of these"
    ],
    correct_index: 1,
    topic: "Potential Difference between Concentric Shells",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let inner shell (radius $R_2$) carry charge $q_2$ and outer shell (radius $R_1$, $R_1 > R_2$) carry charge $q_1$.\n2. The potential of the inner shell is:\n$$V_{\\text{inner}} = \\frac{k q_2}{R_2} + \\frac{k q_1}{R_1}$$\n3. The potential of the outer shell is:\n$$V_{\\text{outer}} = \\frac{k q_2}{R_1} + \\frac{k q_1}{R_1}$$\n4. The potential difference between the inner and outer shell is:\n$$V_{\\text{inner}} - V_{\\text{outer}} = k q_2 \\left(\\frac{1}{R_2} - \\frac{1}{R_1}\\right)$$\n5. Notice that this potential difference depends solely on the charge $q_2$ on the inner shell, and is completely independent of the charge $q_1$ on the outer shell!\n6. Therefore, if charge is given only to the outer shell ($q_2 = 0$), $V_{\\text{inner}} - V_{\\text{outer}} = 0$, meaning no potential difference will appear between the two shells."
  },

  // Page 44: Q200 to Q201 & Section B AR Questions
  {
    q_num: 200,
    question_text: "Find equivalent capacitance between $A$ and $B$ in the given circuit:",
    options: ["$\\frac{C}{3}$", "$\\frac{10}{11}C$", "$3C$", "$2C$"],
    correct_index: 1,
    topic: "Series-Parallel Ladder Network Reduction",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch3_q200_ladder_network.png",
    solution: "1. Analyzing the network between terminals $A$ and $B$:\n- The left section of the network consists of parallel and series combinations of capacitors $C$. Reducing this sub-network yields an equivalent capacitance of:\n$$C_{\\text{left}} = \\frac{5}{3}C$$\n- The right section contains capacitors in parallel, contributing $C_{\\text{right}} = 2C$.\n2. The total equivalent capacitance across terminals $A$ and $B$ is the series combination of these stages:\n$$\\frac{1}{C_{\\text{eq}}} = \\frac{1}{C_{\\text{left}}} + \\frac{1}{C_{\\text{right}}} = \\frac{3}{5C} + \\frac{1}{2C} = \\frac{6 + 5}{10C} = \\frac{11}{10C}$$\n$$C_{\\text{eq}} = \\frac{10}{11}C$$\n3. Hence, the equivalent capacitance is $\\frac{10}{11}C$."
  },
  {
    q_num: 201,
    question_text: "Uniform electric field of magnitude $100\\text{ V/m}$ in space is directed along the line $y = 3 + x$. Find the potential difference between point $A(3, 1)$ and $B(1, 3)$",
    options: ["$100\\text{ V}$", "$200\\sqrt{2}\\text{ V}$", "$200\\text{ V}$", "Zero"],
    correct_index: 3,
    topic: "Potential Difference along Equipotential Line",
    difficulty: "medium",
    image_url: "",
    solution: "1. The line along which the electric field is directed is $y = x + 3$, which has slope $m_E = 1$.\n2. The unit vector in the direction of the electric field is:\n$$\\hat{E} = \\frac{\\hat{i} + \\hat{j}}{\\sqrt{2}} \\implies \\vec{E} = \\frac{100}{\\sqrt{2}}(\\hat{i} + \\hat{j})\\text{ V/m}$$\n3. The displacement vector from point $A(3, 1)$ to point $B(1, 3)$ is:\n$$\\vec{r}_{AB} = \\vec{r}_B - \\vec{r}_A = (1 - 3)\\hat{i} + (3 - 1)\\hat{j} = -2\\hat{i} + 2\\hat{j}$$\n4. Computing the line integral / dot product:\n$$\\vec{E} \\cdot \\vec{r}_{AB} = \\frac{100}{\\sqrt{2}} [(-2) + 2] = \\frac{100}{\\sqrt{2}} (0) = 0$$\n5. Since the displacement vector $\\vec{r}_{AB}$ is perpendicular to the electric field $\\vec{E}$, points $A$ and $B$ lie on the same equipotential surface.\n6. Therefore, the potential difference between $A$ and $B$ is Zero."
  },
  {
    q_num: 202,
    question_text: "Assertion (A): A charged capacitor is disconnected from a battery. Now if its plates are separated farther, the electric field between plates will remain the same.\\nReason (R): The electric field between the plates is $\\frac{\\sigma}{\\varepsilon_0}$ and charge density remains same on separation.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Assertion-Reason: Electric Field in Disconnected Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. When a charged capacitor is disconnected from the battery, the charge $Q$ on the plates is conserved and remains constant.\n2. Since the plate area $A$ is unchanged, the surface charge density $\\sigma = \\frac{Q}{A}$ remains constant on separation.\n3. The electric field between large parallel plates is given by $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{\\varepsilon_0 A}$, which is uniform and independent of the separation distance $d$.\n4. Thus, separating the plates farther does not change the electric field between them (Assertion is true).\n5. Reason correctly provides the formula $E = \\frac{\\sigma}{\\varepsilon_0}$ and the fact that $\\sigma$ remains constant, which is the exact explanation for why $E$ remains unchanged (Reason is true and is the correct explanation of Assertion)."
  },
  {
    q_num: 203,
    question_text: "Assertion (A): A capacitor can be given only a limited quantity of charge.\\nReason (R): The capacity of a capacitor depends upon area of overlapping of plates.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "If Assertion is true statement but Reason is false",
      "If both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Assertion-Reason: Limits of Capacitor Charge Storage",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion: As more charge is added to a capacitor, its potential $V$ and the electric field $E$ in its surrounding medium increase proportionally ($E \\propto Q$). When the electric field exceeds the dielectric strength of the surrounding medium (e.g. $3 \\times 10^6\\text{ V/m}$ for air), dielectric breakdown occurs and charge begins to leak into the surroundings. Hence, a capacitor can only hold a limited quantity of charge (Assertion is TRUE).\n2. Reason: The capacitance of a parallel plate capacitor is $C = \\frac{\\varepsilon_0 A}{d}$, meaning the capacity does depend upon the overlapping area $A$ of the plates (Reason is TRUE as an independent fact).\n3. However, the reason why charge is limited is dielectric breakdown of the surrounding medium, not simply the fact that capacity depends on overlapping area. Thus, Reason is NOT the correct explanation of Assertion."
  }
];
