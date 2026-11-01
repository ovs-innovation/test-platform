export const COMPLEX_NUMBERS_QUESTIONS = [
  {
    original_number: 1,
    question_text: "If $|z - 4| < |z - 2|$, its solution is given by:",
    options: [
      "$\\text{Re}(z) > 0$",
      "$\\text{Re}(z) < 0$",
      "$\\text{Re}(z) > 3$",
      "$\\text{Re}(z) < 2$"
    ],
    correct_index: 2,
    solution: "Given $|z - 4| < |z - 2|$.\nLet $z = x + iy$.\n$\\implies |(x - 4) + iy| < |(x - 2) + iy|$\n$\\implies (x - 4)^2 + y^2 < (x - 2)^2 + y^2$\n$\\implies x^2 - 8x + 16 < x^2 - 4x + 4$\n$\\implies 12 < 4x \\implies x > 3$\n$\\implies \\text{Re}(z) > 3$.",
    topic: "Modulus & Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2002"
  },
  {
    original_number: 2,
    question_text: "$z$ and $\\omega$ are two non-zero complex numbers such that $|z| = |\\omega|$ and $\\text{arg}(z) + \\text{arg}(\\omega) = \\pi$, then $z$ equals:",
    options: [
      "$\\bar{\\omega}$",
      "$-\\bar{\\omega}$",
      "$\\omega$",
      "$-\\omega$"
    ],
    correct_index: 1,
    solution: "Let $|z| = |\\omega| = r$.\nLet $\\text{arg}(z) = \\theta$ and $\\text{arg}(\\omega) = \\phi$.\nGiven $\\theta + \\phi = \\pi \\implies \\phi = \\pi - \\theta$.\nThen $z = r e^{i\\theta}$ and $\\omega = r e^{i\\phi} = r e^{i(\\pi - \\theta)}$.\nThe conjugate of $\\omega$ is:\n$\\bar{\\omega} = r e^{-i(\\pi - \\theta)} = r e^{-i\\pi} e^{i\\theta} = -r e^{i\\theta} = -z$.\n$\\therefore z = -\\bar{\\omega}$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2002"
  },
  {
    original_number: 3,
    question_text: "The locus of the centre of a circle which touches the circle $|z - z_1| = a$ and $|z - z_2| = b$ externally ($z, z_1$ and $z_2$ are complex numbers) will be:",
    options: [
      "an ellipse",
      "a hyperbola",
      "a circle",
      "none of these"
    ],
    correct_index: 1,
    solution: "Let the centre of the variable circle be $z$ and its radius be $r$.\nSince it touches $|z - z_1| = a$ externally:\n$|z - z_1| = r + a \\quad \\dots(1)$\nSince it touches $|z - z_2| = b$ externally:\n$|z - z_2| = r + b \\quad \\dots(2)$\nSubtracting (2) from (1):\n$|z - z_1| - |z - z_2| = a - b = \\text{constant}$.\nSince the difference of the distances of $z$ from two fixed points $z_1$ and $z_2$ is constant, the locus of $z$ represents a hyperbola.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2002"
  },
  {
    original_number: 4,
    question_text: "If $\\left(\\frac{1 + i}{1 - i}\\right)^x = 1$, then:",
    options: [
      "$x = 2n + 1$, where $n$ is any positive integer",
      "$x = 4n$, where $n$ is any positive integer",
      "$x = 2n$, where $n$ is any positive integer",
      "$x = 4n + 1$, where $n$ is any positive integer"
    ],
    correct_index: 1,
    solution: "Simplifying the base:\n$\\frac{1 + i}{1 - i} = \\frac{(1 + i)^2}{1 - i^2} = \\frac{1 + 2i - 1}{1 - (-1)} = \\frac{2i}{2} = i$.\nGiven $\\left(\\frac{1 + i}{1 - i}\\right)^x = 1 \\implies i^x = 1$.\nSince $i^4 = 1$, $i^x = 1$ is satisfied when $x$ is an integral multiple of $4$.\n$\\therefore x = 4n$, where $n$ is any positive integer.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "AIEEE 2003"
  },
  {
    original_number: 5,
    question_text: "If $z$ and $\\omega$ are two non-zero complex numbers such that $|z\\omega| = 1$ and $\\text{arg}(z) - \\text{arg}(\\omega) = \\frac{\\pi}{2}$, then $\\bar{z}\\omega$ is equal to:",
    options: [
      "$-i$",
      "$1$",
      "$-1$",
      "$i$"
    ],
    correct_index: 0,
    solution: "Let $z = r_1 e^{i\\theta_1}$ and $\\omega = r_2 e^{i\\theta_2}$.\nGiven $|z\\omega| = |z||\\omega| = r_1 r_2 = 1$, and $\\text{arg}(z) - \\text{arg}(\\omega) = \\theta_1 - \\theta_2 = \\frac{\\pi}{2}$.\nNow,\n$\\bar{z}\\omega = (r_1 e^{-i\\theta_1})(r_2 e^{i\\theta_2}) = r_1 r_2 e^{-i(\\theta_1 - \\theta_2)} = 1 \\cdot e^{-i\\pi/2} = -i$.\n$\\therefore \\bar{z}\\omega = -i$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2003"
  },
  {
    original_number: 6,
    question_text: "Let $z_1$ and $z_2$ be two roots of the equation $z^2 + az + b = 0$, $z$ being complex. Further, assume that the origin, $z_1$ and $z_2$ form an equilateral triangle. Then:",
    options: [
      "$a^2 = 4b$",
      "$a^2 = b$",
      "$a^2 = 2b$",
      "$a^2 = 3b$"
    ],
    correct_index: 3,
    solution: "For $z^2 + az + b = 0$, the roots are $z_1$ and $z_2$:\n$z_1 + z_2 = -a$ and $z_1 z_2 = b$.\nIf the origin $z_0 = 0$, $z_1$, and $z_2$ form an equilateral triangle, then:\n$z_0^2 + z_1^2 + z_2^2 = z_0 z_1 + z_1 z_2 + z_2 z_0$\n$\\implies z_1^2 + z_2^2 = z_1 z_2$\n$\\implies (z_1 + z_2)^2 - 2z_1 z_2 = z_1 z_2$\n$\\implies (z_1 + z_2)^2 = 3z_1 z_2$.\nSubstituting the sum and product of roots:\n$(-a)^2 = 3(b) \\implies a^2 = 3b$.",
    topic: "Equilateral Triangle in Argand Plane",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2003"
  },
  {
    original_number: 7,
    question_text: "If $z = x - iy$ and $z^{1/3} = p + iq$, then $\\frac{\\frac{x}{p} + \\frac{y}{q}}{p^2 + q^2}$ is equal to:",
    options: [
      "$1$",
      "$-2$",
      "$2$",
      "$-1$"
    ],
    correct_index: 1,
    solution: "Given $z^{1/3} = p + iq \\implies z = (p + iq)^3$.\nExpanding:\n$z = p^3 + 3p^2(iq) + 3p(iq)^2 + (iq)^3 = (p^3 - 3pq^2) + i(3p^2q - q^3)$.\nSince $z = x - iy$:\n$x = p^3 - 3pq^2 = p(p^2 - 3q^2) \\implies \\frac{x}{p} = p^2 - 3q^2$\n$-y = 3p^2q - q^3 \\implies y = q^3 - 3p^2q = q(q^2 - 3p^2) \\implies \\frac{y}{q} = q^2 - 3p^2$.\nAdding both:\n$\\frac{x}{p} + \\frac{y}{q} = (p^2 - 3q^2) + (q^2 - 3p^2) = -2p^2 - 2q^2 = -2(p^2 + q^2)$.\n$\\therefore \\frac{\\frac{x}{p} + \\frac{y}{q}}{p^2 + q^2} = \\frac{-2(p^2 + q^2)}{p^2 + q^2} = -2$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2004"
  },
  {
    original_number: 8,
    question_text: "Let $z, \\omega$ be complex numbers such that $\\bar{z} + i\\bar{\\omega} = 0$ and $\\text{arg}(z\\omega) = \\pi$. Then $\\text{arg}(z)$ equals:",
    options: [
      "$\\frac{\\pi}{4}$",
      "$\\frac{5\\pi}{4}$",
      "$\\frac{3\\pi}{4}$",
      "$\\frac{\\pi}{2}$"
    ],
    correct_index: 2,
    solution: "Given $\\bar{z} + i\\bar{\\omega} = 0 \\implies \\bar{z} = -i\\bar{\\omega}$.\nTaking complex conjugate of both sides:\n$z = i\\omega \\implies \\omega = \\frac{z}{i} = -iz$.\nNow,\n$\\text{arg}(z\\omega) = \\text{arg}(z(-iz)) = \\text{arg}(-iz^2) = \\pi$\n$\\implies \\text{arg}(-i) + \\text{arg}(z^2) = \\pi$\n$\\implies -\\frac{\\pi}{2} + 2\\text{arg}(z) = \\pi$\n$\\implies 2\\text{arg}(z) = \\pi + \\frac{\\pi}{2} = \\frac{3\\pi}{2}$\n$\\implies \\text{arg}(z) = \\frac{3\\pi}{4}$.",
    topic: "Argument Properties",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2004"
  },
  {
    original_number: 9,
    question_text: "If $|z^2 - 1| = |z|^2 + 1$, then $z$ lies on:",
    options: [
      "the real axis",
      "an ellipse",
      "a circle",
      "the imaginary axis"
    ],
    correct_index: 3,
    solution: "Given $|z^2 - 1| = |z|^2 + 1$.\nSquaring both sides:\n$|z^2 - 1|^2 = (|z|^2 + 1)^2$\n$(z^2 - 1)(\\bar{z}^2 - 1) = |z|^4 + 2|z|^2 + 1$\n$|z|^4 - (z^2 + \\bar{z}^2) + 1 = |z|^4 + 2|z|^2 + 1$\n$-(z^2 + \\bar{z}^2) = 2|z|^2$\n$z^2 + 2z\\bar{z} + \\bar{z}^2 = 0$\n$(z + \\bar{z})^2 = 0 \\implies z + \\bar{z} = 0$.\nLet $z = x + iy \\implies 2x = 0 \\implies x = 0 \\implies \\text{Re}(z) = 0$.\nTherefore, $z$ lies on the imaginary axis.",
    topic: "Locus & Modulus Properties",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2004"
  },
  {
    original_number: 10,
    question_text: "If $\\omega = \\frac{z}{z - \\frac{1}{3}i}$ and $|\\omega| = 1$, then $z$ lies on:",
    options: [
      "an ellipse",
      "a circle",
      "a straight line",
      "a parabola"
    ],
    correct_index: 2,
    solution: "Given $|\\omega| = 1 \\implies \\left|\\frac{z}{z - \\frac{1}{3}i}\\right| = 1$\n$\\implies |z| = \\left|z - \\frac{1}{3}i\\right|$.\nThis represents the perpendicular bisector of the line segment joining $(0, 0)$ and $\\left(0, \\frac{1}{3}\\right)$, which is the straight line $y = \\frac{1}{6}$.\n$\\therefore z$ lies on a straight line.",
    topic: "Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2005"
  },
  {
    original_number: 11,
    question_text: "If $z_1$ and $z_2$ are two non-zero complex numbers such that $|z_1 + z_2| = |z_1| + |z_2|$, then $\\text{arg}(z_1) - \\text{arg}(z_2)$ is equal to:",
    options: [
      "$\\frac{\\pi}{2}$",
      "$-\\pi$",
      "$0$",
      "$-\\frac{\\pi}{2}$"
    ],
    correct_index: 2,
    solution: "We know that $|z_1 + z_2| = |z_1| + |z_2|$ holds if and only if $z_1$ and $z_2$ are collinear with the origin and lie on the same ray emanating from the origin (same argument).\n$\\implies \\text{arg}(z_1) = \\text{arg}(z_2)$\n$\\therefore \\text{arg}(z_1) - \\text{arg}(z_2) = 0$.",
    topic: "Triangle Inequality",
    marks: 4,
    difficulty: "easy",
    year: "AIEEE 2005"
  },
  {
    original_number: 12,
    question_text: "If the cube roots of unity are $1, \\omega, \\omega^2$, then the roots of the equation $(x - 1)^3 + 8 = 0$ are:",
    options: [
      "$-1, -1 + 2\\omega, -1 - 2\\omega^2$",
      "$-1, -1, -1$",
      "$-1, 1 - 2\\omega, 1 - 2\\omega^2$",
      "$-1, 1 + 2\\omega, 1 + 2\\omega^2$"
    ],
    correct_index: 2,
    solution: "The given equation is $(x - 1)^3 + 8 = 0$.\n$\\implies (x - 1)^3 = -8 = (-2)^3$\n$\\implies \\left(\\frac{x - 1}{-2}\\right)^3 = 1$.\nSince the cube roots of unity are $1, \\omega, \\omega^2$:\n$\\frac{x - 1}{-2} = 1, \\omega, \\omega^2$\n1. $\\frac{x - 1}{-2} = 1 \\implies x - 1 = -2 \\implies x = -1$\n2. $\\frac{x - 1}{-2} = \\omega \\implies x - 1 = -2\\omega \\implies x = 1 - 2\\omega$\n3. $\\frac{x - 1}{-2} = \\omega^2 \\implies x - 1 = -2\\omega^2 \\implies x = 1 - 2\\omega^2$.\n$\\therefore$ The roots are $-1, 1 - 2\\omega, 1 - 2\\omega^2$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2005"
  },
  {
    original_number: 13,
    question_text: "If $z^2 + z + 1 = 0$, where $z$ is a complex number, then the value of $\\left(z + \\frac{1}{z}\\right)^2 + \\left(z^2 + \\frac{1}{z^2}\\right)^2 + \\left(z^3 + \\frac{1}{z^3}\\right)^2 + \\dots + \\left(z^6 + \\frac{1}{z^6}\\right)^2$ is:",
    options: [
      "$18$",
      "$54$",
      "$6$",
      "$12$"
    ],
    correct_index: 3,
    solution: "The roots of $z^2 + z + 1 = 0$ are $\\omega$ and $\\omega^2$.\nLet $z = \\omega$. Recall $\\omega^3 = 1$ and $1 + \\omega + \\omega^2 = 0$.\n- For $n = 1$: $z + \\frac{1}{z} = \\omega + \\omega^2 = -1 \\implies (-1)^2 = 1$\n- For $n = 2$: $z^2 + \\frac{1}{z^2} = \\omega^2 + \\omega = -1 \\implies (-1)^2 = 1$\n- For $n = 3$: $z^3 + \\frac{1}{z^3} = 1 + 1 = 2 \\implies 2^2 = 4$\n- For $n = 4$: $z^4 + \\frac{1}{z^4} = \\omega + \\omega^2 = -1 \\implies (-1)^2 = 1$\n- For $n = 5$: $z^5 + \\frac{1}{z^5} = \\omega^2 + \\omega = -1 \\implies (-1)^2 = 1$\n- For $n = 6$: $z^6 + \\frac{1}{z^6} = 1 + 1 = 2 \\implies 2^2 = 4$\n$\\text{Total Sum} = 1 + 1 + 4 + 1 + 1 + 4 = 12$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2006"
  },
  {
    original_number: 14,
    question_text: "If $|z + 4| \\le 3$, then the maximum value of $|z + 1|$ is:",
    options: [
      "$4$",
      "$10$",
      "$6$",
      "$0$"
    ],
    correct_index: 2,
    solution: "Using the triangle inequality:\n$|z + 1| = |(z + 4) - 3| \\le |z + 4| + |-3| \\le 3 + 3 = 6$.\nGeometrically: $|z + 4| \\le 3$ represents a circular disc with centre at $(-4, 0)$ and radius $3$.\nThe distance from any point $z$ on the disc to $(-1, 0)$ is $|z - (-1)| = |z + 1|$.\nThe farthest point on the disc from $(-1, 0)$ is $(-7, 0)$, so the maximum distance is $|-1 - (-7)| = 6$.",
    topic: "Modulus & Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2007"
  },
  {
    original_number: 15,
    question_text: "The conjugate of a complex number is $\\frac{1}{i - 1}$. Then the complex number is:",
    options: [
      "$\\frac{-1}{i - 1}$",
      "$\\frac{1}{i + 1}$",
      "$\\frac{-1}{i + 1}$",
      "$\\frac{1}{i - 1}$"
    ],
    correct_index: 2,
    solution: "Given conjugate $\\bar{z} = \\frac{1}{i - 1}$.\nTaking the conjugate of both sides:\n$z = \\overline{\\left(\\frac{1}{i - 1}\\right)} = \\frac{1}{\\bar{i} - 1} = \\frac{1}{-i - 1} = \\frac{-1}{i + 1}$.\n$\\therefore$ The complex number is $\\frac{-1}{i + 1}$.",
    topic: "Conjugate of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "AIEEE 2008"
  },
  {
    original_number: 16,
    question_text: "If $\\left|z - \\frac{4}{z}\\right| = 2$, then the maximum value of $|z|$ is equal to:",
    options: [
      "$\\sqrt{3} + 1$",
      "$\\sqrt{5} + 1$",
      "$2$",
      "$2 + \\sqrt{2}$"
    ],
    correct_index: 1,
    solution: "Using the triangle inequality:\n$|z| = \\left|\\left(z - \\frac{4}{z}\\right) + \\frac{4}{z}\\right| \\le \\left|z - \\frac{4}{z}\\right| + \\frac{4}{|z|} = 2 + \\frac{4}{|z|}$.\nMultiplying both sides by $|z| > 0$:\n$|z|^2 \\le 2|z| + 4 \\implies |z|^2 - 2|z| - 4 \\le 0$\n$\\implies (|z| - 1)^2 \\le 5$\n$\\implies |z| - 1 \\le \\sqrt{5}$\n$\\implies |z| \\le \\sqrt{5} + 1$.\n$\\therefore$ The maximum value of $|z|$ is $\\sqrt{5} + 1$.",
    topic: "Triangle Inequality & Modulus",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2009"
  },
  {
    original_number: 17,
    question_text: "The number of complex numbers $z$ such that $|z - 1| = |z + 1| = |z - i|$ equals:",
    options: [
      "$1$",
      "$2$",
      "$\\infty$",
      "$0$"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy$.\n1. $|z - 1| = |z + 1| \\implies$ distance from $(1, 0)$ equals distance from $(-1, 0)$, which gives the perpendicular bisector: $x = 0$ (imaginary axis).\n2. $|z + 1| = |z - i| \\implies (x + 1)^2 + y^2 = x^2 + (y - 1)^2 \\implies 2x + 1 = -2y + 1 \\implies x = -y$.\nSubstituting $x = 0$ into $x = -y$ gives $y = 0$, so $z = 0$.\nChecking $z = 0$:\n$|0 - 1| = 1$, $|0 + 1| = 1$, $|0 - i| = 1$, which all equal $1$.\nThus, $z = 0$ is the unique solution.\n$\\therefore$ The number of such complex numbers is $1$.",
    topic: "Locus & Geometric Representation",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2010"
  },
  {
    original_number: 18,
    question_text: "Let $\\alpha, \\beta$ be real and $z$ be a complex number. If $z^2 + \\alpha z + \\beta = 0$ has two distinct roots on the line $\\text{Re}(z) = 1$, then it is necessary that:",
    options: [
      "$\\beta \\in (-1, 0)$",
      "$|\\beta| = 1$",
      "$\\beta \\in (1, \\infty)$",
      "$\\beta \\in (0, 1)$"
    ],
    correct_index: 2,
    solution: "Since $\\alpha, \\beta \\in \\mathbb{R}$ and the quadratic equation has distinct roots on the line $\\text{Re}(z) = 1$, the roots must be non-real complex conjugates:\n$z_1 = 1 + ip$ and $z_2 = 1 - ip$, where $p \\in \\mathbb{R}$ and $p \\ne 0$.\nThe product of roots is:\n$\\beta = z_1 z_2 = (1 + ip)(1 - ip) = 1 + p^2$.\nSince $p \\ne 0 \\implies p^2 > 0$, we have:\n$\\beta = 1 + p^2 > 1 \\implies \\beta \\in (1, \\infty)$.",
    topic: "Roots of Polynomial Equations",
    marks: 4,
    difficulty: "medium",
    year: "AIEEE 2011"
  },
  {
    original_number: 19,
    question_text: "If $\\omega (\\ne 1)$ is a cube root of unity, and $(1 + \\omega)^7 = A + B\\omega$, then $(A, B)$ equals:",
    options: [
      "$(1, 1)$",
      "$(1, 0)$",
      "$(-1, 1)$",
      "$(0, 1)$"
    ],
    correct_index: 0,
    solution: "For a non-real cube root of unity $\\omega$, we have $1 + \\omega + \\omega^2 = 0 \\implies 1 + \\omega = -\\omega^2$.\nAlso, $\\omega^3 = 1$.\nNow,\n$(1 + \\omega)^7 = (-\\omega^2)^7 = -\\omega^{14} = -(\\omega^3)^4 \\cdot \\omega^2 = -\\omega^2$.\nSince $-\\omega^2 = 1 + \\omega$:\n$1 + \\omega = A + B\\omega$.\nEquating coefficients:\n$A = 1$ and $B = 1$.\n$\\therefore (A, B) = (1, 1)$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "easy",
    year: "AIEEE 2011"
  },
  {
    original_number: 20,
    question_text: "If $z \\ne 1$ and $\\frac{z^2}{z - 1}$ is real, then the point represented by the complex number $z$ lies:",
    options: [
      "either on the real axis or on a circle passing through the origin",
      "on a circle with centre at the origin",
      "either on the real axis or on a circle not passing through the origin",
      "on the imaginary axis"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy$.\n$z^2 = (x^2 - y^2) + 2ixy$\n$z - 1 = (x - 1) + iy$.\nThen $\\frac{z^2}{z - 1} = \\frac{[(x^2 - y^2) + 2ixy][(x - 1) - iy]}{(x - 1)^2 + y^2}$.\nSince $\\frac{z^2}{z - 1}$ is real, its imaginary part must be zero:\n$\\implies 2xy(x - 1) - y(x^2 - y^2) = 0$\n$\\implies y[2x(x - 1) - (x^2 - y^2)] = 0$\n$\\implies y[2x^2 - 2x - x^2 + y^2] = 0$\n$\\implies y[x^2 + y^2 - 2x] = 0$.\nThis yields:\n1. $y = 0 \\implies z$ lies on the real axis.\n2. $x^2 + y^2 - 2x = 0 \\implies (x - 1)^2 + y^2 = 1$, which is a circle with centre $(1, 0)$ passing through $(0, 0)$.\n$\\therefore z$ lies either on the real axis or on a circle passing through the origin.",
    topic: "Locus of Complex Numbers",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2012 (Online)"
  },
  {
    original_number: 21,
    question_text: "Let $z_1$ and $z_2$ be any two complex numbers.\nStatement 1: $|z_1 - z_2| \\ge ||z_1| - |z_2||$\nStatement 2: $|z_1 + z_2| \\le |z_1| + |z_2|$",
    options: [
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is false, Statement 2 is true."
    ],
    correct_index: 1,
    solution: "Statement 1: $|z_1 - z_2| \\ge ||z_1| - |z_2||$ is a standard fundamental triangle inequality (lower bound).\nStatement 2: $|z_1 + z_2| \\le |z_1| + |z_2|$ is also a standard fundamental triangle inequality (upper bound).\nBoth statements are true properties of complex numbers, but Statement 2 does not explain or prove Statement 1.\n$\\therefore$ Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
    topic: "Modulus Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2012"
  },
  {
    original_number: 22,
    question_text: "The area of the triangle whose vertices are complex numbers $z, iz, z + iz$ in the Argand diagram is:",
    options: [
      "$2|z|^2$",
      "$\\frac{1}{2}|z|^2$",
      "$4|z|^2$",
      "$|z|^2$"
    ],
    correct_index: 1,
    solution: "Let the vertices be $A(z), B(iz)$, and $C(z + iz)$.\nThe vectors representing the sides meeting at $C$ are:\n$\\vec{CA} = z - (z + iz) = -iz$\n$\\vec{CB} = iz - (z + iz) = -z$.\nNotice that $|\\vec{CA}| = |-iz| = |z|$ and $|\\vec{CB}| = |-z| = |z|$.\nSince multiplication by $i$ corresponds to a $90^\\circ$ rotation, $\\vec{CA} \\perp \\vec{CB}$.\nThus, $\\triangle ABC$ is a right-angled isosceles triangle with both legs of length $|z|$.\n$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} |z| |z| = \\frac{1}{2}|z|^2$.",
    topic: "Area of Triangle in Argand Diagram",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2012"
  },
  {
    original_number: 23,
    question_text: "Let $z$ and $\\omega$ be complex numbers such that $|z| = |\\omega|$, and $\\text{arg}(z)$ denotes the principal argument of $z$.\nStatement 1: If $\\text{arg}(z) + \\text{arg}(\\omega) = \\pi$, then $z = -\\bar{\\omega}$.\nStatement 2: $|z| = |\\omega|$ implies $\\text{arg}(z) - \\text{arg}(\\omega) = \\pi$.",
    options: [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is false, Statement 2 is true."
    ],
    correct_index: 0,
    solution: "Let $|z| = |\\omega| = r$.\nStatement 1: Let $\\text{arg}(z) = \\theta, \\text{arg}(\\omega) = \\phi$.\nGiven $\\theta + \\phi = \\pi \\implies \\phi = \\pi - \\theta$.\nThen $\\omega = r e^{i(\\pi - \\theta)} \\implies \\bar{\\omega} = r e^{-i(\\pi - \\theta)} = r e^{-i\\pi} e^{i\\theta} = -r e^{i\\theta} = -z$.\n$\\implies z = -\\bar{\\omega}$. Hence Statement 1 is true.\nStatement 2: Equal moduli does not imply the difference in arguments is $\\pi$. For example, $z = 1$ and $\\omega = 1$ have $|z| = |\\omega| = 1$, but $\\text{arg}(z) - \\text{arg}(\\omega) = 0 \\ne \\pi$. Hence Statement 2 is false.\n$\\therefore$ Statement 1 is true, Statement 2 is false.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  },
  {
    original_number: 24,
    question_text: "$|z_1 + z_2|^2 + |z_1 - z_2|^2$ is equal to:",
    options: [
      "$2(|z_1| + |z_2|)$",
      "$2(|z_1|^2 + |z_2|^2)$",
      "$|z_1||z_2|$",
      "$|z_1|^2 + |z_2|^2$"
    ],
    correct_index: 1,
    solution: "Using the property $|z|^2 = z\\bar{z}$:\n$|z_1 + z_2|^2 = (z_1 + z_2)(\\bar{z}_1 + \\bar{z}_2) = |z_1|^2 + |z_2|^2 + z_1\\bar{z}_2 + \\bar{z}_1 z_2$\n$|z_1 - z_2|^2 = (z_1 - z_2)(\\bar{z}_1 - \\bar{z}_2) = |z_1|^2 + |z_2|^2 - z_1\\bar{z}_2 - \\bar{z}_1 z_2$.\nAdding both expressions:\n$|z_1 + z_2|^2 + |z_1 - z_2|^2 = 2(|z_1|^2 + |z_2|^2)$.\n(This represents the parallelogram theorem in the complex plane).",
    topic: "Parallelogram Identity",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2013"
  },
  {
    original_number: 25,
    question_text: "If $z$ is a complex number of unit modulus and argument $\\theta$, then $\\text{arg}\\left(\\frac{1 + z}{1 + \\bar{z}}\\right)$ can be equal to (given $z \\ne -1$):",
    options: [
      "$\\theta$",
      "$\\pi - \\theta$",
      "$-\\theta$",
      "$\\frac{\\pi}{2} - \\theta$"
    ],
    correct_index: 0,
    solution: "Given $|z| = 1 \\implies z\\bar{z} = |z|^2 = 1 \\implies \\bar{z} = \\frac{1}{z}$.\nSubstituting $\\bar{z} = \\frac{1}{z}$:\n$\\frac{1 + z}{1 + \\bar{z}} = \\frac{1 + z}{1 + \\frac{1}{z}} = \\frac{1 + z}{\\frac{z + 1}{z}} = z$.\n$\\therefore \\text{arg}\\left(\\frac{1 + z}{1 + \\bar{z}}\\right) = \\text{arg}(z) = \\theta$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  },
  {
    original_number: 26,
    question_text: "If $z_1 \\ne 0$ and $z_2$ be two complex numbers such that $\\frac{z_1}{z_2}$ is a purely imaginary number, then $\\left|\\frac{2z_1 + 3z_2}{2z_1 - 3z_2}\\right|$ is equal to:",
    options: [
      "$2$",
      "$5$",
      "$3$",
      "$1$"
    ],
    correct_index: 3,
    solution: "Since $\\frac{z_1}{z_2}$ is purely imaginary, let $\\frac{z_1}{z_2} = ik$, where $k \\in \\mathbb{R}, k \\ne 0$.\nDividing numerator and denominator by $z_2$:\n$\\frac{2z_1 + 3z_2}{2z_1 - 3z_2} = \\frac{2\\left(\\frac{z_1}{z_2}\\right) + 3}{2\\left(\\frac{z_1}{z_2}\\right) - 3} = \\frac{3 + 2ik}{-3 + 2ik}$.\nTaking modulus:\n$\\left|\\frac{3 + 2ik}{-3 + 2ik}\\right| = \\frac{|3 + 2ik|}{|-3 + 2ik|} = \\frac{\\sqrt{3^2 + (2k)^2}}{\\sqrt{(-3)^2 + (2k)^2}} = \\frac{\\sqrt{9 + 4k^2}}{\\sqrt{9 + 4k^2}} = 1$.\n$\\therefore \\left|\\frac{2z_1 + 3z_2}{2z_1 - 3z_2}\\right| = 1$.",
    topic: "Modulus & Purely Imaginary Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  },
  {
    original_number: 27,
    question_text: "If a complex number $z$ satisfies the equation $z + \\sqrt{2}|z + 1| + i = 0$, then $|z|$ is equal to:",
    options: [
      "$2$",
      "$\\sqrt{3}$",
      "$\\sqrt{5}$",
      "$1$"
    ],
    correct_index: 2,
    solution: "Given $z + \\sqrt{2}|z + 1| + i = 0$.\nLet $z = x + iy$.\n$(x + iy) + \\sqrt{2}|(x + 1) + iy| + i = 0$.\nEquating imaginary parts:\n$y + 1 = 0 \\implies y = -1$.\nEquating real parts:\n$x + \\sqrt{2}\\sqrt{(x + 1)^2 + y^2} = 0$.\nSubstituting $y = -1$:\n$x + \\sqrt{2}\\sqrt{(x + 1)^2 + (-1)^2} = 0$\n$\\implies \\sqrt{2}\\sqrt{(x + 1)^2 + 1} = -x$.\nSince LHS $\\ge 0$, we must have $-x \\ge 0 \\implies x \\le 0$.\nSquaring both sides:\n$2[(x + 1)^2 + 1] = x^2$\n$2(x^2 + 2x + 2) = x^2$\n$2x^2 + 4x + 4 = x^2$\n$x^2 + 4x + 4 = 0$\n$(x + 2)^2 = 0 \\implies x = -2$.\nCheck $x = -2 \\le 0$: holds.\nTherefore, $z = -2 - i$.\n$|z| = \\sqrt{(-2)^2 + (-1)^2} = \\sqrt{4 + 1} = \\sqrt{5}$.",
    topic: "Equations Involving Modulus",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  }
];

