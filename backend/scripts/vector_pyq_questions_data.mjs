// NEET Physics Vector PYQ Dataset (4 questions)
export const VECTOR_PYQ_QUESTIONS = [
  {
    qNum: 1,
    exam: 'NEET 2022 Phase 2',
    question: "If $\\vec{F} = 2\\hat{i} + \\hat{j} - \\hat{k}$ and $\\vec{r} = 3\\hat{i} + 2\\hat{j} - 2\\hat{k}$, then the scalar and vector products of $\\vec{F}$ and $\\vec{r}$ have the magnitudes respectively as",
    options: [
      "$10, 2$",
      "$5, \\sqrt{3}$",
      "$4, \\sqrt{5}$",
      "$10, \\sqrt{2}$"
    ],
    correctIndex: 3,
    solution: "1. The scalar (dot) product of $\\vec{F}$ and $\\vec{r}$ is:\n$$\\vec{F} \\cdot \\vec{r} = (2\\hat{i} + \\hat{j} - \\hat{k}) \\cdot (3\\hat{i} + 2\\hat{j} - 2\\hat{k})$$\n$$\\vec{F} \\cdot \\vec{r} = (2)(3) + (1)(2) + (-1)(-2) = 6 + 2 + 2 = 10$$\nThe magnitude of the scalar product is $10$.\n\n2. The vector (cross) product of $\\vec{F}$ and $\\vec{r}$ is:\n$$\\vec{F} \\times \\vec{r} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 1 & -1 \\\\ 3 & 2 & -2 \\end{vmatrix}$$\n$$\\vec{F} \\times \\vec{r} = \\hat{i}[(-2) - (-2)] - \\hat{j}[(-4) - (-3)] + \\hat{k}[(4) - (3)]$$\n$$\\vec{F} \\times \\vec{r} = \\hat{i}(0) - \\hat{j}(-1) + \\hat{k}(1) = \\hat{j} + \\hat{k}$$\n\n3. The magnitude of the vector product is:\n$$|\\vec{F} \\times \\vec{r}| = \\sqrt{0^2 + 1^2 + 1^2} = \\sqrt{2}$$\n\n4. Thus, the magnitudes of the scalar and vector products are $10$ and $\\sqrt{2}$, respectively.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 2,
    exam: 'AIPMT 2005',
    question: "If the angle between the vectors $\\vec{A}$ and $\\vec{B}$ is $\\theta$, the value of the product $(\\vec{B} \\times \\vec{A}) \\cdot \\vec{A}$ is equal to",
    options: [
      "$BA^2 \\sin\\theta$",
      "$BA^2 \\cos\\theta$",
      "$BA^2 \\sin\\theta \\cos\\theta$",
      "zero."
    ],
    correctIndex: 3,
    solution: "1. The cross product $\\vec{B} \\times \\vec{A}$ produces a vector that is perpendicular to the plane containing both vectors $\\vec{A}$ and $\\vec{B}$:\n$$(\\vec{B} \\times \\vec{A}) \\perp \\vec{A} \\quad \\text{and} \\quad (\\vec{B} \\times \\vec{A}) \\perp \\vec{B}$$\n\n2. The dot product of two mutually perpendicular vectors is always zero, since the angle between them is $90^\\circ$ ($\\cos 90^\\circ = 0$):\n$$(\\vec{B} \\times \\vec{A}) \\cdot \\vec{A} = |\\vec{B} \\times \\vec{A}| |\\vec{A}| \\cos 90^\\circ = 0$$\n\nHence, the value of the product is zero.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 3,
    exam: 'AIPMT 1999',
    question: "If a unit vector is represented by $0.5\\hat{i} + 0.8\\hat{j} + c\\hat{k}$, the value of $c$ is",
    options: [
      "$1$",
      "$\\sqrt{0.11}$",
      "$\\sqrt{0.01}$",
      "$0.39$"
    ],
    correctIndex: 1,
    solution: "1. For any unit vector $\\hat{u} = x\\hat{i} + y\\hat{j} + z\\hat{k}$, its magnitude is equal to $1$:\n$$|\\hat{u}| = \\sqrt{x^2 + y^2 + z^2} = 1 \\implies x^2 + y^2 + z^2 = 1$$\n\n2. Substituting the given components ($x = 0.5$, $y = 0.8$, $z = c$):\n$$(0.5)^2 + (0.8)^2 + c^2 = 1$$\n$$0.25 + 0.64 + c^2 = 1$$\n$$0.89 + c^2 = 1$$\n$$c^2 = 1 - 0.89 = 0.11$$\n$$c = \\sqrt{0.11}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 4,
    exam: 'AIPMT 1999',
    question: "What is the linear velocity if angular velocity vector $\\vec{\\omega} = 3\\hat{i} - 4\\hat{j} + \\hat{k}$ and position vector $\\vec{r} = 5\\hat{i} - 6\\hat{j} + 6\\hat{k}$?",
    options: [
      "$6\\hat{i} + 2\\hat{j} - 3\\hat{k}$",
      "$-18\\hat{i} - 13\\hat{j} + 2\\hat{k}$",
      "$18\\hat{i} + 13\\hat{j} - 2\\hat{k}$",
      "$6\\hat{i} - 2\\hat{j} + 8\\hat{k}$"
    ],
    correctIndex: 1,
    solution: "1. The relation between linear velocity $\\vec{v}$, angular velocity $\\vec{\\omega}$, and position vector $\\vec{r}$ is given by the cross product:\n$$\\vec{v} = \\vec{\\omega} \\times \\vec{r}$$\n\n2. Computing the cross product:\n$$\\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 3 & -4 & 1 \\\\ 5 & -6 & 6 \\end{vmatrix}$$\n$$\\vec{v} = \\hat{i}[(-4)(6) - (1)(-6)] - \\hat{j}[(3)(6) - (1)(5)] + \\hat{k}[(3)(-6) - (-4)(5)]$$\n$$\\vec{v} = \\hat{i}[-24 + 6] - \\hat{j}[18 - 5] + \\hat{k}[-18 + 20]$$\n$$\\vec{v} = -18\\hat{i} - 13\\hat{j} + 2\\hat{k}$$\n\nHence, the correct option is (B)."
  }
];

export default VECTOR_PYQ_QUESTIONS;
