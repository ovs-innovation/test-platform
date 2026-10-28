export const POTENTIAL_PART3 = [
  // Page 25: Q53 to Q55
  {
    q_num: 53,
    question_text: "A capacitor of capacitance $C$ is charged by a battery to a potential difference $V$. Now it is disconnected from this battery and connected to another battery of potential difference $2V$, so that positive plate of capacitor is connected to positive terminal of the battery and negative plate of the capacitor is connected to negative terminal of the battery. The heat produced in the circuit is",
    options: ["$CV^2$", "$\\frac{1}{2}CV^2$", "$\\frac{3}{2}CV^2$", "$2CV^2$"],
    correct_index: 1,
    topic: "Heat Dissipation in Capacitors",
    difficulty: "medium",
    image_url: "",
    solution: "1. Initial charge on the capacitor is $q_i = CV$ and initial energy is $U_i = \\frac{1}{2} C V^2$.\n2. When connected to the $2V$ battery with matching polarity, final potential difference across the capacitor is $2V$.\nFinal charge is $q_f = C(2V) = 2CV$.\nFinal stored energy is $U_f = \\frac{1}{2} C (2V)^2 = 2CV^2$.\n3. The change in stored energy is:\n$$\\Delta U = U_f - U_i = 2CV^2 - \\frac{1}{2}CV^2 = \\frac{3}{2}CV^2$$\n4. The charge supplied by the $2V$ battery is:\n$$\\Delta q = q_f - q_i = 2CV - CV = CV$$\n5. Work done by the $2V$ battery is:\n$$W_b = \\Delta q \\times (2V) = CV \\times 2V = 2CV^2$$\n6. By energy conservation, the heat produced is:\n$$H = W_b - \\Delta U = 2CV^2 - \\frac{3}{2}CV^2 = \\frac{1}{2}CV^2$$"
  },
  {
    q_num: 54,
    question_text: "A thin rod is bent into a semi-circular arc of radius $R$. The rod has a uniform linear charge density $\\lambda$. The potential at the centre of the arc, point $P$ is",
    options: [
      "$\\frac{\\lambda}{2\\pi\\varepsilon_0 R}$",
      "$\\frac{\\lambda}{4\\varepsilon_0}$",
      "$\\frac{\\lambda}{2\\varepsilon_0}$",
      "$\\frac{\\lambda}{\\varepsilon_0}$"
    ],
    correct_index: 1,
    topic: "Potential of Semicircular Arc",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q54.png",
    solution: "1. Every infinitesimal charge element $dq$ on the semicircular arc is located at the exact same distance $R$ from the center $P$.\n2. Total charge on the semicircular arc of length $L = \\pi R$ is:\n$$Q = \\lambda L = \\lambda (\\pi R)$$\n3. The electric potential at center $P$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\lambda \\pi R}{R} = \\frac{\\lambda}{4\\varepsilon_0}$$"
  },
  {
    q_num: 55,
    question_text: "Find equivalent capacitance between $A$ and $B$",
    options: ["$2\\,\\mu\\text{F}$", "$4\\,\\mu\\text{F}$", "$6\\,\\mu\\text{F}$", "$8\\,\\mu\\text{F}$"],
    correct_index: 1,
    topic: "Capacitor Networks",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q55.png",
    solution: "1. In the right-hand loop, three $6\\,\\mu\\text{F}$ capacitors are connected in series:\n$$C_{\\text{right, series}} = \\frac{6}{3} = 2\\,\\mu\\text{F}$$\n2. This combination is in parallel with the central vertical $2\\,\\mu\\text{F}$ capacitor:\n$$C_p = 2\\,\\mu\\text{F} + 2\\,\\mu\\text{F} = 4\\,\\mu\\text{F}$$\n3. Now looking at the top branch, the top $4\\,\\mu\\text{F}$ capacitor is in series with $C_p = 4\\,\\mu\\text{F}$:\n$$C_{\\text{top, eq}} = \\frac{4 \\times 4}{4 + 4} = 2\\,\\mu\\text{F}$$\n4. In the left loop, the two $4\\,\\mu\\text{F}$ capacitors are connected in series across nodes $A$ and $B$:\n$$C_{\\text{left, series}} = \\frac{4}{2} = 2\\,\\mu\\text{F}$$\n5. These two parallel branches connect across terminals $A$ and $B$:\n$$C_{AB} = C_{\\text{top, eq}} + C_{\\text{left, series}} = 2\\,\\mu\\text{F} + 2\\,\\mu\\text{F} = 4\\,\\mu\\text{F}$$"
  },

  // Page 26: Q56 to Q62
  {
    q_num: 56,
    question_text: "Two conducting spheres each given a charge $q$ are kept far apart as shown. The amount of charge that crosses the switch $s$, when it is closed, is",
    options: ["$\\frac{q}{3}$", "$\\frac{2q}{3}$", "$\\frac{3q}{4}$", "$\\text{Zero}$"],
    correct_index: 0,
    topic: "Charge Flow Between Connected Spheres",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q56.png",
    solution: "1. The capacitance of an isolated conducting sphere is proportional to its radius ($C = 4\\pi\\varepsilon_0 r$).\n- Left sphere: $C_1 = 4\\pi\\varepsilon_0 R$\n- Right sphere: $C_2 = 4\\pi\\varepsilon_0 (2R) = 2C_1$\n2. Initial total charge of the two spheres is $Q_{\\text{total}} = q + q = 2q$.\n3. When switch $s$ is closed, they reach a common potential, and total charge redistributes in proportion to their capacitances:\n$$q_1' = \\frac{C_1}{C_1 + C_2} Q_{\\text{total}} = \\frac{R}{R + 2R}(2q) = \\frac{1}{3}(2q) = \\frac{2q}{3}$$\n$$q_2' = \\frac{C_2}{C_1 + C_2} Q_{\\text{total}} = \\frac{2R}{R + 2R}(2q) = \\frac{4q}{3}$$\n4. The charge lost by the left sphere and transferred through the switch is:\n$$\\Delta q = q - q_1' = q - \\frac{2q}{3} = \\frac{q}{3}$$"
  },
  {
    q_num: 57,
    question_text: "Find the equivalent capacitance between point $a$ and $b$ in the following arrangement of plates. Each plate has the area $A$ and separation between the plates is $d$.",
    options: [
      "$\\frac{2A\\varepsilon_0}{3d}$",
      "$\\frac{3A\\varepsilon_0}{2d}$",
      "$\\frac{2A\\varepsilon_0}{d}$",
      "$\\frac{3A\\varepsilon_0}{d}$"
    ],
    correct_index: 1,
    topic: "Parallel Plate Combinations",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q57.png",
    solution: "1. Let $C_0 = \\frac{\\varepsilon_0 A}{d}$ be the capacitance between any two adjacent facing surfaces.\n2. In the given plate arrangement:\n- The outer U-shaped plate encloses inner plates $a$ and $b$.\n- A capacitor of capacitance $C_0$ is formed between plate $a$ and the top of the U-plate.\n- A capacitor of capacitance $C_0$ is formed between plate $b$ and the bottom of the U-plate.\n- Since the U-plate is floating and continuous, these two capacitors are connected in series between $a$ and $b$, giving equivalent capacitance $\\frac{C_0}{2}$.\n- A direct capacitor of capacitance $C_0$ is formed between facing inner surfaces of plate $a$ and plate $b$.\n3. This direct capacitor is in parallel with the series path:\n$$C_{ab} = C_0 + \\frac{C_0}{2} = \\frac{3}{2}C_0 = \\frac{3A\\varepsilon_0}{2d}$$"
  },
  {
    q_num: 58,
    question_text: "A positive charge is moving under the effect of a uniform electric field alone. It moves from potential zone $V_1$ to potential zone $V_2$ ($V_1 < V_2$). Its speed",
    options: ["Increases", "Decreases", "Remains constant", "Will become zero at $V_2$"],
    correct_index: 1,
    topic: "Motion of Charge in Electric Field",
    difficulty: "easy",
    image_url: "",
    solution: "1. The work done by the electric field on a positive charge $q > 0$ when moving from potential $V_1$ to $V_2$ is:\n$$W_e = -q \\Delta V = -q (V_2 - V_1)$$\n2. Since $V_2 > V_1$, we have $\\Delta V > 0$, so $W_e < 0$ (negative work).\n3. By the Work-Energy Theorem:\n$$\\Delta K = K_2 - K_1 = W_e < 0 \\implies K_2 < K_1$$\n4. Since kinetic energy decreases, the speed of the positive charge decreases."
  },
  {
    q_num: 59,
    question_text: "In given circuit, ratio of charge on $2\\,\\mu\\text{F}$ capacitor to the charge on $3\\,\\mu\\text{F}$ capacitor will be",
    options: ["$2 : 9$", "$3 : 2$", "$2 : 3$", "$2 : 5$"],
    correct_index: 0,
    topic: "Charge Distribution in Capacitor Circuits",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q59.png",
    solution: "1. The battery of emf $\\mathcal{E}$ is connected directly across the base capacitor ($3\\,\\mu\\text{F}$):\n$$q_3 = 3\\,\\mu\\text{F} \\times \\mathcal{E} = 3\\mathcal{E}$$\n2. The series branch containing $1\\,\\mu\\text{F}$ and $2\\,\\mu\\text{F}$ is also connected across the same emf $\\mathcal{E}$.\nEquivalent capacitance of this branch is:\n$$C_{\\text{series}} = \\frac{1 \\times 2}{1 + 2} = \\frac{2}{3}\\,\\mu\\text{F}$$\n3. Since capacitors in series carry identical charge, the charge on the $2\\,\\mu\\text{F}$ capacitor is:\n$$q_2 = C_{\\text{series}} \\times \\mathcal{E} = \\frac{2}{3}\\mathcal{E}$$\n4. The required ratio is:\n$$\\frac{q_2}{q_3} = \\frac{\\frac{2}{3}\\mathcal{E}}{3\\mathcal{E}} = \\frac{2}{9}$$"
  },
  {
    q_num: 60,
    question_text: "Capacity of an air filled parallel plate capacitor is $C$. If a metal plate of thickness $\\frac{d}{2}$ is inserted between plates as shown in figure, the new capacity of the capacitor is",
    options: ["$C$", "$2C$", "$\\frac{C}{2}$", "$\\frac{C}{4}$"],
    correct_index: 1,
    topic: "Conductor Slab in Capacitor",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q60.png",
    solution: "1. For a conducting (metal) slab, dielectric constant is $K = \\infty$.\n2. The capacitance with a slab of thickness $t$ inserted between plates of separation $d$ is:\n$$C' = \\frac{\\varepsilon_0 A}{d - t\\left(1 - \\frac{1}{K}\\right)}$$\n3. Substituting $t = \\frac{d}{2}$ and $K = \\infty$:\n$$C' = \\frac{\\varepsilon_0 A}{d - \\frac{d}{2}(1 - 0)} = \\frac{\\varepsilon_0 A}{d - \\frac{d}{2}} = \\frac{\\varepsilon_0 A}{\\frac{d}{2}} = 2\\left(\\frac{\\varepsilon_0 A}{d}\\right) = 2C$$"
  },
  {
    q_num: 61,
    question_text: "5 plates each of area $A$ and separation $d$ between consecutive plates are arranged as shown. Equivalent capacitance between points $A$ and $B$ will be",
    options: [
      "$\\frac{\\varepsilon_0 A}{3d}$",
      "$\\frac{3\\varepsilon_0 A}{d}$",
      "$\\frac{4\\varepsilon_0 A}{d}$",
      "$\\frac{\\varepsilon_0 A}{4d}$"
    ],
    correct_index: 2,
    topic: "Interleaved Multi-Plate Capacitors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q61.png",
    solution: "1. Consecutive pairs of adjacent plates form individual capacitors of capacitance $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n2. With 5 interleaved plates:\n- Terminal $A$ connects to alternate plates 1, 3, and 5.\n- Terminal $B$ connects to plates 2 and 4.\n3. The pairs (1-2), (2-3), (3-4), and (4-5) each form a separate capacitor connected directly across terminals $A$ and $B$.\n4. There are $n - 1 = 5 - 1 = 4$ capacitors connected in parallel:\n$$C_{AB} = 4 C_0 = \\frac{4\\varepsilon_0 A}{d}$$"
  },
  {
    q_num: 62,
    question_text: "In the circuit shown below, to have same potential of points $a$ and $b$, a dielectric of constant $K = 2$ should be completely filled in",
    options: [
      "$C_1$ and $C_2$",
      "$C_1$ and $C_4$",
      "$C_2$ and $C_4$",
      "$C_2$ and $C_3$"
    ],
    correct_index: 1,
    topic: "Bridge Balancing with Dielectrics",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q62.png",
    solution: "1. For points $a$ and $b$ to be at the same potential ($V_a = V_b$), the bridge must be balanced:\n$$\\frac{C_1'}{C_2'} = \\frac{C_3'}{C_4'}$$\n2. Initially, $C_1 = 1\\,\\mu\\text{F}, C_2 = 4\\,\\mu\\text{F}, C_3 = 4\\,\\mu\\text{F}, C_4 = 4\\,\\mu\\text{F}$.\n3. If a dielectric of constant $K = 2$ is inserted into $C_1$ and $C_4$:\n- $C_1' = K \\times C_1 = 2 \\times 1 = 2\\,\\mu\\text{F}$\n- $C_4' = K \\times C_4 = 2 \\times 4 = 8\\,\\mu\\text{F}$\n4. Checking the ratio:\n$$\\frac{C_1'}{C_2} = \\frac{2\\,\\mu\\text{F}}{4\\,\\mu\\text{F}} = \\frac{1}{2}, \\quad \\frac{C_3}{C_4'} = \\frac{4\\,\\mu\\text{F}}{8\\,\\mu\\text{F}} = \\frac{1}{2}$$\nSince $\\frac{C_1'}{C_2} = \\frac{C_3}{C_4'}$, the bridge is balanced and $V_a = V_b$."
  },

  // Page 27: Q63 to Q70
  {
    q_num: 63,
    question_text: "A capacitor of capacitance $400\\,\\mu\\text{F}$ is charged upto a potential of $100\\text{ volt}$ and another capacitor of capacitance $600\\,\\mu\\text{F}$ is charged upto a potential of $200\\text{ volt}$. The two capacitors are connected in such a way that the positive plates are connected at one point and the negative plates are connected at another point. The loss of energy will be",
    options: ["$24\\text{ J}$", "$12\\text{ J}$", "$1.2\\text{ J}$", "$\\text{Zero}$"],
    correct_index: 2,
    topic: "Energy Loss on Connecting Capacitors",
    difficulty: "easy",
    image_url: "",
    solution: "1. When like plates are connected in parallel, the loss of energy is given by:\n$$\\Delta U = \\frac{C_1 C_2}{2(C_1 + C_2)}(V_1 - V_2)^2$$\n2. Substituting the given values:\n- $C_1 = 400\\,\\mu\\text{F} = 400 \\times 10^{-6}\\text{ F}$\n- $C_2 = 600\\,\\mu\\text{F} = 600 \\times 10^{-6}\\text{ F}$\n- $V_1 = 100\\text{ V}, V_2 = 200\\text{ V} \\implies |V_1 - V_2| = 100\\text{ V}$\n3. Calculating:\n$$\\Delta U = \\frac{(400 \\times 10^{-6})(600 \\times 10^{-6})}{2(400 + 600) \\times 10^{-6}} \\times (100)^2$$\n$$\\Delta U = \\frac{240000 \\times 10^{-12}}{2000 \\times 10^{-6}} \\times 10^4 = (1.2 \\times 10^{-4}) \\times 10^4 = 1.2\\text{ J}$$"
  },
  {
    q_num: 64,
    question_text: "$n$ identical capacitors in series are connected to a battery and at steady state the total energy stored by the assembly is $W_1$. If they had been connected in parallel across same source, the total energy would have been $W_2$. Then $\\frac{W_1}{W_2}$ equals",
    options: ["$1 : n$", "$1 : n^2$", "$n : 1$", "$n^2 : 1$"],
    correct_index: 1,
    topic: "Energy Comparison Series vs Parallel",
    difficulty: "easy",
    image_url: "",
    solution: "1. For $n$ identical capacitors each of capacitance $C$ in series:\n$$C_s = \\frac{C}{n} \\implies W_1 = \\frac{1}{2} C_s V^2 = \\frac{1}{2} \\left(\\frac{C}{n}\\right) V^2$$\n2. When connected in parallel across the same voltage source $V$:\n$$C_p = nC \\implies W_2 = \\frac{1}{2} C_p V^2 = \\frac{1}{2} (nC) V^2$$\n3. The ratio of stored energies is:\n$$\\frac{W_1}{W_2} = \\frac{\\frac{1}{2} \\frac{C}{n} V^2}{\\frac{1}{2} nC V^2} = \\frac{1}{n^2} = 1 : n^2$$"
  },
  {
    q_num: 65,
    question_text: "Three identical charge ($Q$) are fixed at each corner of an equilateral triangle. What should be the minimum velocity given to charged particle ($-q$) placed at the centre of the triangle to escape from the electric field of identical charges? ($m = \\text{mass of charge particle at centre}$)",
    options: [
      "$\\left[\\frac{Qq\\sqrt{3}}{4\\pi\\varepsilon_0 lm}\\right]^{1/2}$",
      "$\\left[\\frac{Qq\\sqrt{3}}{2\\pi\\varepsilon_0 lm}\\right]^{1/2}$",
      "$\\left[\\frac{3Qq\\sqrt{3}}{2\\pi\\varepsilon_0 lm}\\right]^{1/2}$",
      "$\\left[\\frac{3Qq\\sqrt{3}}{4\\pi\\varepsilon_0 lm}\\right]^{1/2}$"
    ],
    correct_index: 2,
    topic: "Escape Velocity from Triangle Center",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q65.png",
    solution: "1. In an equilateral triangle of side $l$, the distance from each vertex to the centroid is:\n$$r = \\frac{l}{\\sqrt{3}}$$\n2. The electric potential at the centre due to the three charges $Q$ is:\n$$V_{\\text{centre}} = 3 \\times \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{l/\\sqrt{3}} = \\frac{3\\sqrt{3}Q}{4\\pi\\varepsilon_0 l}$$\n3. The potential energy of charge $-q$ at the centre is:\n$$U = -q V_{\\text{centre}} = -\\frac{3\\sqrt{3}Qq}{4\\pi\\varepsilon_0 l}$$\n4. For escape to infinity ($U_\\infty = 0$), the minimum kinetic energy must equal $|U|$:\n$$\\frac{1}{2}m v^2 = \\frac{3\\sqrt{3}Qq}{4\\pi\\varepsilon_0 l} \\implies v^2 = \\frac{6\\sqrt{3}Qq}{4\\pi\\varepsilon_0 lm} = \\frac{3\\sqrt{3}Qq}{2\\pi\\varepsilon_0 lm}$$\n$$v = \\left[\\frac{3Qq\\sqrt{3}}{2\\pi\\varepsilon_0 lm}\\right]^{1/2}$$"
  },
  {
    q_num: 66,
    question_text: "A capacitor of capacitance $C$ is charged by connecting it to a battery of emf $\\varepsilon$. The capacitor is now disconnected and reconnected to the same battery with the polarity reversed. The heat developed in the connecting wires is",
    options: ["$C\\varepsilon^2$", "$\\frac{1}{2}C\\varepsilon^2$", "$2C\\varepsilon^2$", "$\\frac{3}{2}C\\varepsilon^2$"],
    correct_index: 2,
    topic: "Heat Dissipation on Reversing Polarity",
    difficulty: "medium",
    image_url: "",
    solution: "1. Initial charge on the capacitor is $q_i = C\\varepsilon$ and initial energy is $U_i = \\frac{1}{2} C \\varepsilon^2$.\n2. When reconnected with polarity reversed, final charge is $q_f = -C\\varepsilon$ and final stored energy is $U_f = \\frac{1}{2} C (-\\varepsilon)^2 = \\frac{1}{2} C \\varepsilon^2$.\n3. The net charge that flows through the battery is:\n$$\\Delta q = q_f - q_i = -C\\varepsilon - C\\varepsilon = -2C\\varepsilon$$\n4. The work done by the battery is:\n$$W = |\\Delta q| \\varepsilon = (2C\\varepsilon)\\varepsilon = 2C\\varepsilon^2$$\n5. Since $\\Delta U = U_f - U_i = 0$, all the work supplied by the battery is dissipated as heat in the connecting wires:\n$$H = W - \\Delta U = 2C\\varepsilon^2 - 0 = 2C\\varepsilon^2$$"
  },
  {
    q_num: 67,
    question_text: "Large conducting parallel plates are arranged with some charges on them as shown. Find the charge flown through switch after closing the switch",
    options: [
      "$+4Q\\text{ towards earth}$",
      "$+2Q\\text{ towards earth}$",
      "$+4Q\\text{ towards plate}$",
      "$+2Q\\text{ towards plate}$"
    ],
    correct_index: 0,
    topic: "Earthing of Parallel Conducting Plates",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/pot_q67.png",
    solution: "1. Initially, the three parallel plates have charges $+3Q$, $-8Q$, and $+Q$ respectively. Total charge $= +3Q - 8Q + Q = -4Q$.\n2. Initial charge on the outer faces is $\\frac{\\sum Q}{2} = \\frac{-4Q}{2} = -2Q$.\n3. When the switch on the leftmost plate is closed, this plate is grounded ($V_1 = 0$).\n4. For a grounded outer plate, the electric field to its left must vanish, requiring its outer face charge to become zero.\n5. Through the potential balance condition, the final net charge on the first plate becomes $Q_1' = -Q$.\n6. The charge flown through the switch to earth is:\n$$\\Delta q = Q_1 - Q_1' = (+3Q) - (-Q) = +4Q\\text{ towards earth}$$"
  },
  {
    q_num: 68,
    question_text: "The ratio of field energy stored inside and outside a uniformly charged solid sphere of radius $R$ and volume charge density $\\rho$ is",
    options: ["$\\frac{11}{5}$", "$\\frac{5}{6}$", "$\\frac{1}{5}$", "$\\frac{6}{5}$"],
    correct_index: 2,
    topic: "Self-Energy of Uniformly Charged Sphere",
    difficulty: "hard",
    image_url: "",
    solution: "1. Let total charge of the sphere be $Q = \\frac{4}{3}\\pi R^3 \\rho$.\n2. Electric field inside ($r < R$):\n$$E_{\\text{in}}(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q r}{R^3}$$\nEnergy stored inside the sphere is:\n$$U_{\\text{in}} = \\int_0^R \\frac{1}{2}\\varepsilon_0 E_{\\text{in}}^2 (4\\pi r^2 dr) = \\frac{Q^2}{40\\pi\\varepsilon_0 R} = \\frac{1}{10}\\left(\\frac{Q^2}{4\\pi\\varepsilon_0 R}\\right)$$\n\n3. Electric field outside ($r > R$):\n$$E_{\\text{out}}(r) = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}$$\nEnergy stored outside the sphere is:\n$$U_{\\text{out}} = \\int_R^\\infty \\frac{1}{2}\\varepsilon_0 E_{\\text{out}}^2 (4\\pi r^2 dr) = \\frac{Q^2}{8\\pi\\varepsilon_0 R} = \\frac{1}{2}\\left(\\frac{Q^2}{4\\pi\\varepsilon_0 R}\\right)$$\n\n4. The ratio of internal to external energy is:\n$$\\frac{U_{\\text{in}}}{U_{\\text{out}}} = \\frac{\\frac{1}{10}}{\\frac{1}{2}} = \\frac{2}{10} = \\frac{1}{5}$$"
  },
  {
    q_num: 69,
    question_text: "A dipole of dipole moment $\\vec{P} = 2\\hat{i} - 3\\hat{j} + 4\\hat{k}$ is placed at point $A(2, -3, 1)$. The electric potential due to dipole at point $B(4, -1, 0)$ is equal to (All the parameters specified here are in SI units)",
    options: [
      "$2 \\times 10^9\\text{ volts}$",
      "$-2 \\times 10^9\\text{ volts}$",
      "$3 \\times 10^9\\text{ volts}$",
      "$-3 \\times 10^9\\text{ volts}$"
    ],
    correct_index: 1,
    topic: "Electric Potential of Arbitrary Dipole",
    difficulty: "medium",
    image_url: "",
    solution: "1. Position vector from dipole $A$ to point $B$:\n$$\\vec{r} = \\vec{r}_B - \\vec{r}_A = (4 - 2)\\hat{i} + (-1 - (-3))\\hat{j} + (0 - 1)\\hat{k} = 2\\hat{i} + 2\\hat{j} - \\hat{k}$$\n2. Magnitude of $\\vec{r}$:\n$$r = |\\vec{r}| = \\sqrt{2^2 + 2^2 + (-1)^2} = \\sqrt{4 + 4 + 1} = \\sqrt{9} = 3\\text{ m}$$\n3. Dot product $\\vec{P}\\cdot\\vec{r}$:\n$$\\vec{P}\\cdot\\vec{r} = (2)(2) + (-3)(2) + (4)(-1) = 4 - 6 - 4 = -6\\text{ C}\\cdot\\text{m}^2$$\n4. The electrostatic potential of a short dipole is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{\\vec{P}\\cdot\\vec{r}}{r^3} = (9 \\times 10^9) \\times \\frac{-6}{3^3} = (9 \\times 10^9) \\times \\frac{-6}{27} = -2 \\times 10^9\\text{ V}$$"
  },
  {
    q_num: 70,
    question_text: "Consider the situation shown in figure. The work done in taking a point charge from $P$ to $A$ is $W_A$, from $P$ to $B$ is $W_B$ and from $P$ to $C$ is $W_C$.",
    options: [
      "$W_A < W_B < W_C$",
      "$W_A > W_B > W_C$",
      "$W_A = W_B = W_C$",
      "None of these"
    ],
    correct_index: 2,
    topic: "Equipotential Path and Work Done",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q70.png",
    solution: "1. Points $A, B$, and $C$ all lie on a circular arc of radius $R$ centered at charge $O(-Q)$.\n2. Since the distance from $O$ to every point on this arc is constant ($r = R$):\n$$V_A = V_B = V_C = -\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R}$$\n3. Thus the semicircular arc is an equipotential surface.\n4. Work done in taking a charge $q_0$ from common initial point $P$ to any point $X$ is:\n$$W_X = q_0(V_X - V_P)$$\n5. Since $V_A = V_B = V_C$, the work done is identical in all three cases:\n$$W_A = W_B = W_C$$"
  },

  // Page 28: Q71 to Q77
  {
    q_num: 71,
    question_text: "Two concentric uniformly charged spherical shells of radius $10\\text{ cm}$ and $20\\text{ cm}$ having charges $10\\text{ C}$ and $20\\text{ C}$ on them are arranged as shown in figure. The magnitude of potential difference between the two shells is",
    options: [
      "$4.5 \\times 10^{11}\\text{ V}$",
      "$2.7 \\times 10^{11}\\text{ V}$",
      "$0$",
      "None of these"
    ],
    correct_index: 0,
    topic: "Potential Difference Between Concentric Shells",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q71.png",
    solution: "1. Let $r_1 = 10\\text{ cm} = 0.1\\text{ m}$ with charge $q_1 = 10\\text{ C}$, and $r_2 = 20\\text{ cm} = 0.2\\text{ m}$ with charge $q_2 = 20\\text{ C}$.\n2. The potential of the inner shell is $V_1 = \\frac{k q_1}{r_1} + \\frac{k q_2}{r_2}$.\n3. The potential of the outer shell is $V_2 = \\frac{k q_1}{r_2} + \\frac{k q_2}{r_2}$.\n4. The potential difference depends solely on the charge of the inner shell $q_1$:\n$$V_1 - V_2 = k q_1\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)$$\n5. Substituting values:\n$$V_1 - V_2 = (9 \\times 10^9) \\times 10 \\times \\left(\\frac{1}{0.1} - \\frac{1}{0.2}\\right) = (9 \\times 10^{10}) \\times (10 - 5) = 4.5 \\times 10^{11}\\text{ V}$$"
  },
  {
    q_num: 72,
    question_text: "Two metallic spheres of radii $a$ and $b$ are placed away from each other and are connected by a thin conducting wire. A charge $Q$ is given to one of the sphere. The charge on each sphere at electrostatic equilibrium is (where $q_1$ and $q_2$ represent charge on metallic spheres of radii $a$ and $b$ respectively)",
    options: [
      "$q_1 = \\frac{Qb}{(a+b)^2}, q_2 = \\frac{Qb}{(a+b)^2}$",
      "$q_1 = \\frac{Qa}{a+b}, q_2 = \\frac{Qb}{a+b}$",
      "$q_1 = \\frac{Qb}{a+b}, q_2 = \\frac{Qa}{a+b}$",
      "$q_1 = \\frac{Qa^2}{a^2+b^2}, q_2 = \\frac{Qb^2}{a^2+b^2}$"
    ],
    correct_index: 1,
    topic: "Charge Distribution on Connected Spheres",
    difficulty: "easy",
    image_url: "",
    solution: "1. When two distant conducting spheres are connected by a conducting wire, charge flows until both spheres reach the same electric potential:\n$$V_1 = V_2 \\implies \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1}{a} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_2}{b} \\implies \\frac{q_1}{a} = \\frac{q_2}{b}$$\n2. By conservation of total charge:\n$$q_1 + q_2 = Q$$\n3. Substituting $q_2 = \\frac{b}{a}q_1$:\n$$q_1\\left(1 + \\frac{b}{a}\\right) = Q \\implies q_1\\left(\\frac{a + b}{a}\\right) = Q \\implies q_1 = \\frac{Qa}{a+b}$$\n$$q_2 = \\frac{Qb}{a+b}$$"
  },
  {
    q_num: 73,
    question_text: "A $2\\,\\mu\\text{F}$ capacitor is charged as shown in figure. The percentage of its stored energy, dissipated after the switch $S$ is turned to position 2, is",
    options: ["$0\\%$", "$20\\%$", "$75\\%$", "$80\\%$"],
    correct_index: 3,
    topic: "Energy Dissipated on Capacitor Switching",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q73.png",
    solution: "1. Initially with switch at position 1, capacitor $C_1 = 2\\,\\mu\\text{F}$ is charged to voltage $V$. Initial stored energy is:\n$$U_i = \\frac{1}{2} C_1 V^2$$\n2. When switch is turned to position 2, $C_1 = 2\\,\\mu\\text{F}$ is disconnected from battery and connected in parallel with uncharged $C_2 = 8\\,\\mu\\text{F}$.\n3. The final energy stored in the parallel combination is:\n$$U_f = \\frac{1}{2}\\frac{C_1^2 V^2}{C_1 + C_2} = \\left(\\frac{C_1}{C_1 + C_2}\\right)\\left(\\frac{1}{2} C_1 V^2\\right) = \\left(\\frac{2}{2 + 8}\\right) U_i = \\frac{2}{10} U_i = 0.20 U_i$$\n4. The fraction of energy dissipated as heat in connecting wires is:\n$$\\text{Fraction dissipated} = \\frac{U_i - U_f}{U_i} = 1 - 0.20 = 0.80 = 80\\%$$"
  },
  {
    q_num: 74,
    question_text: "A point charge $q$ is placed at a point inside a hollow conducting sphere. Which of the following electric field lines pattern should be correct?",
    options: ["Pattern (1)", "Pattern (2)", "Pattern (3)", "Pattern (4)"],
    correct_index: 0,
    topic: "Field Lines in Conducting Shell Cavity",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q74.png",
    solution: "1. Inside the cavity, field lines start on positive point charge $q$ and terminate normally on the induced negative charges on the inner cavity wall.\n2. Inside the body of the conducting shell, electric field is strictly zero ($E = 0$), so no field lines exist within the metal.\n3. The positive induced charge on the spherical outer surface distributes itself uniformly regardless of the off-center position of the cavity charge.\n4. Therefore, the field lines outside the spherical shell must emerge radially outwards, pointing directly away from the geometric centre of the sphere.\nPattern (1) correctly satisfies all these boundary conditions."
  },
  {
    q_num: 75,
    question_text: "Two identical point charges are fixed at $x = -a$ and $x = +a$ on the $x$-axis. Another point charge $Q$ is placed at the origin. The change in the electrostatic potential energy of $Q$, when it is displaced by a small distance $x$ along the $x$-axis, is approximately proportional to",
    options: ["$x$", "$x^2$", "$x^3$", "$\\frac{1}{x}$"],
    correct_index: 1,
    topic: "Small Displacement Potential Energy",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let each fixed charge have magnitude $q$. At the origin ($x = 0$), the initial potential energy of $Q$ is:\n$$U(0) = \\frac{k q Q}{a} + \\frac{k q Q}{a} = \\frac{2k q Q}{a}$$\n2. When displaced by a small distance $x$ ($x \\ll a$) along the $x$-axis:\n$$U(x) = k q Q\\left(\\frac{1}{a + x} + \\frac{1}{a - x}\\right) = k q Q\\left(\\frac{2a}{a^2 - x^2}\\right) = \\frac{2k q Q}{a}\\left(1 - \\frac{x^2}{a^2}\\right)^{-1}$$\n3. Using binomial expansion $(1 - u)^{-1} \\approx 1 + u$:\n$$U(x) \\approx \\frac{2k q Q}{a}\\left(1 + \\frac{x^2}{a^2}\\right) = U(0) + \\frac{2k q Q}{a^3} x^2$$\n4. The change in potential energy is:\n$$\\Delta U = U(x) - U(0) \\approx \\left(\\frac{2k q Q}{a^3}\\right) x^2 \\propto x^2$$"
  },
  {
    q_num: 76,
    question_text: "Consider a non-spherical conductor shown in figure which is given a certain amount of positive charge. The charge distributes itself on the surface such that the charge densities are $\\sigma_1, \\sigma_2$ and $\\sigma_3$ in the region 1, 2 and 3 respectively. Then",
    options: [
      "$\\sigma_1 > \\sigma_2 > \\sigma_3$",
      "$\\sigma_2 > \\sigma_1 > \\sigma_3$",
      "$\\sigma_3 > \\sigma_1 > \\sigma_2$",
      "$\\sigma_2 > \\sigma_3 > \\sigma_1$"
    ],
    correct_index: 1,
    topic: "Charge Density and Surface Curvature",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q76.png",
    solution: "1. On a conductor at electrostatic equilibrium, the surface charge density $\\sigma$ is inversely proportional to the local radius of curvature $R$:\n$$\\sigma \\propto \\frac{1}{R}$$\n2. In the given figure:\n- Region 2 has the sharpest point (smallest radius of curvature $R_2$), so charge density $\\sigma_2$ is maximum.\n- Region 1 is moderately curved (intermediate radius of curvature $R_1$).\n- Region 3 is relatively flat (largest radius of curvature $R_3$).\n3. Since $R_2 < R_1 < R_3$, the charge densities satisfy:\n$$\\sigma_2 > \\sigma_1 > \\sigma_3$$"
  },
  {
    q_num: 77,
    question_text: "Charges are given to three large conducting plates as shown in figure. Now switch $S$ is closed. The value of electric field between the plates (2) and (3) is (each plate has surface of Area $A$)",
    options: [
      "$\\frac{30 \\times 10^{-6}}{A\\varepsilon_0}$",
      "$\\frac{25 \\times 10^{-6}}{A\\varepsilon_0}$",
      "$\\frac{20 \\times 10^{-6}}{A\\varepsilon_0}$",
      "$\\text{Zero}$"
    ],
    correct_index: 0,
    topic: "Electric Field Between Grounded Plates",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/pot_q77.png",
    solution: "1. Initial charges on the three plates are $Q_1 = 10\\,\\mu\\text{C}$, $Q_2 = 20\\,\\mu\\text{C}$, and $Q_3 = 30\\,\\mu\\text{C}$.\n2. When switch $S$ is closed, Plate (3) is connected to earth ($V_3 = 0$).\n3. Since Plate (3) is grounded, the outer face of the outermost grounded plate has zero charge, and electric field lines from the left terminate on the inner face of Plate (3).\n4. Plates (1) and (2) remain isolated with total combined charge $Q_1 + Q_2 = 10\\,\\mu\\text{C} + 20\\,\\mu\\text{C} = 30\\,\\mu\\text{C}$.\n5. The right face of plate (2) carries $+30\\,\\mu\\text{C}$ and induces an equal and opposite charge of $-30\\,\\mu\\text{C}$ on the facing left face of plate (3).\n6. The electric field in the region between plate (2) and plate (3) is given by:\n$$E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q_{\\text{facing}}}{A\\varepsilon_0} = \\frac{30 \\times 10^{-6}}{A\\varepsilon_0}$$"
  }
];
