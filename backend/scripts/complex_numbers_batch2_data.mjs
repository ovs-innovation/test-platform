export const COMPLEX_NUMBERS_BATCH2 = [
  {
    original_number: 28,
    question_text: "Let $a = \\text{Im}\\left(\\frac{1 + z^2}{2iz}\\right)$, where $z$ is any non-zero complex number. The set $A = \\{a : |z| = 1 \\text{ and } z \\ne \\pm 1\\}$ is equal to:",
    options: [
      "$(-1, 1)$",
      "$[-1, 1]$",
      "$[0, 1)$",
      "$(-1, 0]$"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy \\implies z^2 = x^2 - y^2 + 2ixy$.\n$\\frac{1 + z^2}{2iz} = \\frac{1 + x^2 - y^2 + 2ixy}{2i(x + iy)} = \\frac{(x^2 - y^2 + 1) + 2ixy}{-2y + 2ix} \\times \\frac{-2y - 2ix}{-2y - 2ix}$\n$= \\frac{y(x^2 + y^2 - 1) + x(x^2 + y^2 + 1)i}{2(x^2 + y^2)}$.\n$\\implies a = \\text{Im}\\left(\\frac{1 + z^2}{2iz}\\right) = \\frac{x(x^2 + y^2 + 1)}{2(x^2 + y^2)}$.\nGiven $|z| = 1 \\implies x^2 + y^2 = 1$.\n$\\therefore a = \\frac{x(1 + 1)}{2(1)} = x$.\nAlso $z \\ne \\pm 1 \\implies x + iy \\ne \\pm 1 \\implies x \\ne \\pm 1$.\nSince $x^2 + y^2 = 1$ and $x \\ne \\pm 1$, we have $-1 < x < 1$.\n$\\therefore A = (-1, 1)$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  },
  {
    original_number: 29,
    question_text: "Let $z$ satisfy $|z| = 1$ and $z = 1 - \\bar{z}$.\nStatement 1: $z$ is a real number.\nStatement 2: Principal argument of $z$ is $\\frac{\\pi}{3}$.",
    options: [
      "Statement 1 is true; Statement 2 is true; Statement 2 is a correct explanation for Statement 1.",
      "Statement 1 is false; Statement 2 is true.",
      "Statement 1 is true; Statement 2 is false.",
      "Statement 1 is true; Statement 2 is true; Statement 2 is not a correct explanation for Statement 1."
    ],
    correct_index: 1,
    solution: "Given $z = 1 - \\bar{z} \\implies z + \\bar{z} = 1$.\nLet $z = x + iy$. Then $2x = 1 \\implies x = \\frac{1}{2}$.\nSince $|z| = 1 \\implies x^2 + y^2 = 1 \\implies \\left(\\frac{1}{2}\\right)^2 + y^2 = 1 \\implies y^2 = \\frac{3}{4} \\implies y = \\pm \\frac{\\sqrt{3}}{2}$.\nThus $z = \\frac{1}{2} \\pm i\\frac{\\sqrt{3}}{2}$, which has a non-zero imaginary part, so $z$ is not a real number.\n$\\therefore$ Statement 1 is false.\nFor $z = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$, the principal argument is $\\text{arg}(z) = \\tan^{-1}\\left(\\frac{\\sqrt{3}/2}{1/2}\\right) = \\frac{\\pi}{3}$.\n$\\therefore$ Statement 2 is true.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2013"
  },
  {
    original_number: 30,
    question_text: "If $z$ is a complex number such that $|z| \\ge 2$, then the minimum value of $\\left|z + \\frac{1}{2}\\right|$:",
    options: [
      "is strictly greater than $\\frac{5}{2}$",
      "is strictly greater than $\\frac{3}{2}$ but less than $\\frac{5}{2}$",
      "is equal to $\\frac{5}{2}$",
      "lies in the interval $(1, 2)$"
    ],
    correct_index: 3,
    solution: "By the reverse triangle inequality:\n$\\left|z + \\frac{1}{2}\\right| \\ge \\left||z| - \\left|\\frac{1}{2}\\right|\\right| = |z| - \\frac{1}{2}$.\nSince $|z| \\ge 2$, the minimum value occurs when $|z| = 2$ and $z$ lies on the negative real axis opposite to $1/2$:\n$\\left|z + \\frac{1}{2}\\right|_{\\min} = 2 - \\frac{1}{2} = \\frac{3}{2} = 1.5$.\nSince $1 < 1.5 < 2$, the minimum value lies in the interval $(1, 2)$.",
    topic: "Modulus & Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2014",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517205/edvedum_mathematics/complex_numbers/complex_q30.png"
  },
  {
    original_number: 31,
    question_text: "Let $w$ ($\\text{Im}(w) \\ne 0$) be a complex number. Then, the set of all complex numbers $z$ satisfying the equation $w - \\bar{w}z = k(1 - z)$, for some real number $k$, is:",
    options: [
      "$\\{z : z \\ne 1\\}$",
      "$\\{z : |z| = 1, z \\ne 1\\}$",
      "$\\{z : z = \\bar{z}\\}$",
      "$\\{z : |z| = 1\\}$"
    ],
    correct_index: 1,
    solution: "Given $w - \\bar{w}z = k(1 - z)$ where $k \\in \\mathbb{R}$ and $\\text{Im}(w) \\ne 0$.\nLet $w = a + ib$ ($b \\ne 0$) and $z = x + iy$.\n$(a + ib) - (a - ib)(x + iy) = k - k(x + iy)$\n$(a + ib) - (ax - by + i(ay + bx)) = k - kx - iky$.\nEquating real and imaginary parts:\n$a - ax + by = k(1 - x) \\implies (k - a)(x - 1) = by \\quad \\dots(1)$\n$b - ay - bx = -ky \\implies (k - a)y = b(x + 1) \\quad \\dots(2)$\nDividing (1) by (2):\n$\\frac{x - 1}{y} = \\frac{y}{x + 1} \\implies x^2 - 1 = y^2 \\implies x^2 + y^2 = 1 \\implies |z| = 1$.\nIf $z = 1$, then $w - \\bar{w} = k(0) = 0 \\implies w = \\bar{w} \\implies \\text{Im}(w) = 0$, which contradicts the given condition $\\text{Im}(w) \\ne 0$.\nHence $z \\ne 1$.\n$\\therefore$ The set is $\\{z : |z| = 1, z \\ne 1\\}$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2014"
  },
  {
    original_number: 32,
    question_text: "If $z_1, z_2$ and $z_3, z_4$ are 2 pairs of complex conjugate numbers, then $\\text{arg}\\left(\\frac{z_1}{z_4}\\right) + \\text{arg}\\left(\\frac{z_2}{z_3}\\right)$ equals:",
    options: [
      "$0$",
      "$\\frac{\\pi}{2}$",
      "$\\frac{3\\pi}{2}$",
      "$\\pi$"
    ],
    correct_index: 0,
    solution: "Using the properties of argument:\n$\\text{arg}\\left(\\frac{z_1}{z_4}\\right) + \\text{arg}\\left(\\frac{z_2}{z_3}\\right) = \\text{arg}(z_1) - \\text{arg}(z_4) + \\text{arg}(z_2) - \\text{arg}(z_3)$\n$= [\\text{arg}(z_1) + \\text{arg}(z_2)] - [\\text{arg}(z_3) + \\text{arg}(z_4)]$.\nGiven $z_2 = \\bar{z}_1$ and $z_4 = \\bar{z}_3$.\nSince $\\text{arg}(\\bar{z}) = -\\text{arg}(z)$:\n$\\text{arg}(z_1) + \\text{arg}(z_2) = \\text{arg}(z_1) - \\text{arg}(z_1) = 0$, and\n$\\text{arg}(z_3) + \\text{arg}(z_4) = \\text{arg}(z_3) - \\text{arg}(z_3) = 0$.\n$\\therefore [\\text{arg}(z_1) + \\text{arg}(z_2)] - [\\text{arg}(z_3) + \\text{arg}(z_4)] = 0 - 0 = 0$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2014"
  },
  {
    original_number: 33,
    question_text: "Let $z \\ne -i$ be any complex number such that $\\frac{z - i}{z + i}$ is a purely imaginary number. Then $z + \\frac{1}{z}$ is:",
    options: [
      "$0$",
      "any non-zero real number other than $1$",
      "any non-zero real number",
      "a purely imaginary number"
    ],
    correct_index: 1,
    solution: "Let $w = \\frac{z - i}{z + i}$. Since $w$ is purely imaginary, $w + \\bar{w} = 0$:\n$\\frac{z - i}{z + i} + \\frac{\\bar{z} + i}{\\bar{z} - i} = 0$\n$\\implies (z - i)(\\bar{z} - i) + (z + i)(\\bar{z} + i) = 0$\n$\\implies (z\\bar{z} - iz - i\\bar{z} - 1) + (z\\bar{z} + iz + i\\bar{z} - 1) = 0$\n$\\implies 2|z|^2 - 2 = 0 \\implies |z| = 1$.\nSince $|z| = 1$, $\\frac{1}{z} = \\bar{z}$.\nThen $z + \\frac{1}{z} = z + \\bar{z} = 2\\text{Re}(z) \\in \\mathbb{R}$.\nSince $z \\ne -i$ and $w$ is purely imaginary ($w \\ne 0 \\implies z \\ne i$), $x = \\text{Re}(z) \\ne 0$, so $2x$ is a non-zero real number other than $1$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2014"
  },
  {
    original_number: 34,
    question_text: "For all complex numbers $z$ of the form $1 + i\\alpha, \\alpha \\in \\mathbb{R}$, if $z^2 = x + iy$, then:",
    options: [
      "$y^2 - 4x + 4 = 0$",
      "$y^2 + 4x - 4 = 0$",
      "$y^2 - 4x + 2 = 0$",
      "$y^2 + 4x + 2 = 0$"
    ],
    correct_index: 1,
    solution: "Given $z = 1 + i\\alpha$, so $z^2 = (1 + i\\alpha)^2 = 1 - \\alpha^2 + 2i\\alpha$.\nGiven $z^2 = x + iy$, equating real and imaginary parts:\n$x = 1 - \\alpha^2 \\implies \\alpha^2 = 1 - x$\n$y = 2\\alpha \\implies y^2 = 4\\alpha^2$.\nSubstituting $\\alpha^2 = 1 - x$ into $y^2 = 4\\alpha^2$:\n$y^2 = 4(1 - x) = 4 - 4x \\implies y^2 + 4x - 4 = 0$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2014"
  },
  {
    original_number: 35,
    question_text: "A complex number $z$ is said to be unimodular if $|z| = 1$. Let $z_1$ and $z_2$ are complex numbers such that $\\frac{z_1 - 2z_2}{2 - z_1\\bar{z}_2}$ is unimodular and $z_2$ is not unimodular, then the point $z_1$ lies on a:",
    options: [
      "circle of radius $\\sqrt{2}$",
      "straight line parallel to $x$-axis",
      "straight line parallel to $y$-axis",
      "circle of radius $2$"
    ],
    correct_index: 3,
    solution: "Given $\\left|\\frac{z_1 - 2z_2}{2 - z_1\\bar{z}_2}\\right| = 1 \\implies |z_1 - 2z_2|^2 = |2 - z_1\\bar{z}_2|^2$.\nUsing $|z|^2 = z\\bar{z}$:\n$(z_1 - 2z_2)(\\bar{z}_1 - 2\\bar{z}_2) = (2 - z_1\\bar{z}_2)(2 - \\bar{z}_1 z_2)$\n$|z_1|^2 - 2z_1\\bar{z}_2 - 2\\bar{z}_1 z_2 + 4|z_2|^2 = 4 - 2\\bar{z}_1 z_2 - 2z_1\\bar{z}_2 + |z_1|^2|z_2|^2$\n$|z_1|^2 + 4|z_2|^2 = 4 + |z_1|^2|z_2|^2$\n$|z_1|^2 - 4 - |z_1|^2|z_2|^2 + 4|z_2|^2 = 0$\n$(|z_1|^2 - 4)(1 - |z_2|^2) = 0$.\nSince $z_2$ is not unimodular, $|z_2| \\ne 1 \\implies 1 - |z_2|^2 \\ne 0$.\n$\\therefore |z_1|^2 - 4 = 0 \\implies |z_1|^2 = 4 \\implies |z_1| = 2$.\nThis represents a circle of radius $2$ centered at the origin.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2015"
  },
  {
    original_number: 36,
    question_text: "If $2 + 3i$ is one of the roots of the equation $2x^3 - 9x^2 + kx - 13 = 0, k \\in \\mathbb{R}$, then the real root of this equation (where $i^2 = -1$):",
    options: [
      "Exists and is equal to $\\frac{1}{2}$",
      "Does not exist",
      "Exists and is equal to $1$",
      "Exists and is equal to $-\\frac{1}{2}$"
    ],
    correct_index: 0,
    solution: "Since all coefficients of $2x^3 - 9x^2 + kx - 13 = 0$ are real ($k \\in \\mathbb{R}$), complex roots occur in conjugate pairs.\nSince $2 + 3i$ is a root, $2 - 3i$ is also a root.\nLet the third root (which must be real) be $\\alpha$.\nBy Vieta's formulas, the sum of the roots is:\n$(2 + 3i) + (2 - 3i) + \\alpha = -\\frac{-9}{2} = \\frac{9}{2}$\n$4 + \\alpha = \\frac{9}{2} \\implies \\alpha = \\frac{9}{2} - 4 = \\frac{1}{2}$.\nChecking the product of roots:\n$(2 + 3i)(2 - 3i)\\alpha = (4 + 9)\\left(\\frac{1}{2}\\right) = \\frac{13}{2} = -\\frac{-13}{2}$, which matches the constant term.\n$\\therefore$ The real root exists and is equal to $\\frac{1}{2}$.",
    topic: "Roots of Polynomial Equations",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2015"
  },
  {
    original_number: 37,
    question_text: "The largest value of $r$, for which the region represented by the set $\\{w \\in \\mathbb{C} : |w - 4 - i| \\le r\\}$ is contained in the region represented by the set $\\{z \\in \\mathbb{C} : |z - 1| \\le |z + i|\\}$, is equal to:",
    options: [
      "$2\\sqrt{2}$",
      "$\\frac{3}{2}\\sqrt{2}$",
      "$\\sqrt{17}$",
      "$\\frac{5}{2}\\sqrt{2}$"
    ],
    correct_index: 3,
    solution: "Let $z = x + iy$. The condition $|z - 1| \\le |z + i|$ gives:\n$(x - 1)^2 + y^2 \\le x^2 + (y + 1)^2 \\implies x^2 - 2x + 1 + y^2 \\le x^2 + y^2 + 2y + 1$\n$\\implies -2x \\le 2y \\implies x + y \\ge 0$.\nThis represents the half-plane on and above the straight line $x + y = 0$.\nThe set $\\{w : |w - (4 + i)| \\le r\\}$ is a circular disc with centre $C(4, 1)$ and radius $r$.\nFor this circular disc to lie entirely within the region $x + y \\ge 0$, the maximum radius $r$ is the perpendicular distance from the centre $(4, 1)$ to the boundary line $x + y = 0$:\n$r_{\\max} = \\frac{|4 + 1|}{\\sqrt{1^2 + 1^2}} = \\frac{5}{\\sqrt{2}} = \\frac{5}{2}\\sqrt{2}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2015"
  },
  {
    original_number: 38,
    question_text: "If $z$ is a non-real complex number, then the minimum value of $\\frac{\\text{Im}(z^5)}{(\\text{Im}(z))^5}$ is (where $\\text{Im}(z) = \\text{Imaginary part of } z$):",
    options: [
      "$-2$",
      "$-4$",
      "$-5$",
      "$-1$"
    ],
    correct_index: 1,
    solution: "Let $z = r(\\cos\\theta + i\\sin\\theta)$ where $\\sin\\theta \\ne 0$ since $z$ is non-real.\nThen $\\text{Im}(z) = r\\sin\\theta$ and $z^5 = r^5(\\cos 5\\theta + i\\sin 5\\theta) \\implies \\text{Im}(z^5) = r^5\\sin 5\\theta$.\nSo $\\frac{\\text{Im}(z^5)}{(\\text{Im}(z))^5} = \\frac{\\sin 5\\theta}{\\sin^5\\theta}$.\nUsing the identity $\\sin 5\\theta = 16\\sin^5\\theta - 20\\sin^3\\theta + 5\\sin\\theta$:\n$\\frac{\\sin 5\\theta}{\\sin^5\\theta} = 16 - 20\\csc^2\\theta + 5\\csc^4\\theta$.\nLet $t = \\csc^2\\theta \\ge 1$. The expression becomes $f(t) = 5t^2 - 20t + 16$.\nTo find the minimum for $t \\ge 1$:\n$f'(t) = 10t - 20 = 0 \\implies t = 2$.\nSince $t = 2 \\ge 1$, the minimum value is $f(2) = 5(2)^2 - 20(2) + 16 = 20 - 40 + 16 = -4$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2015"
  },
  {
    original_number: 39,
    question_text: "A value of $\\theta$ for which $\\frac{2 + 3i\\sin\\theta}{1 - 2i\\sin\\theta}$ is purely imaginary, is:",
    options: [
      "$\\sin^{-1}\\left(\\frac{\\sqrt{3}}{4}\\right)$",
      "$\\sin^{-1}\\left(\\frac{1}{\\sqrt{3}}\\right)$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 1,
    solution: "Multiply numerator and denominator by the conjugate of the denominator:\n$\\frac{2 + 3i\\sin\\theta}{1 - 2i\\sin\\theta} \\times \\frac{1 + 2i\\sin\\theta}{1 + 2i\\sin\\theta} = \\frac{(2 - 6\\sin^2\\theta) + i(4\\sin\\theta + 3\\sin\\theta)}{1 + 4\\sin^2\\theta}$.\nFor the complex number to be purely imaginary, its real part must be zero:\n$2 - 6\\sin^2\\theta = 0 \\implies 6\\sin^2\\theta = 2 \\implies \\sin^2\\theta = \\frac{1}{3} \\implies \\sin\\theta = \\frac{1}{\\sqrt{3}}$.\n$\\therefore \\theta = \\sin^{-1}\\left(\\frac{1}{\\sqrt{3}}\\right)$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2016"
  },
  {
    original_number: 40,
    question_text: "The point represented by $2 + i$ in the Argand plane moves 1 unit eastwards, then 2 units northwards and finally from there $2\\sqrt{2}$ units in the south-west wards direction. Then its new position in the Argand plane is at the point represented by:",
    options: [
      "$1 + i$",
      "$2 + 2i$",
      "$-2 - 2i$",
      "$-1 - i$"
    ],
    correct_index: 0,
    solution: "Initial point $P$ is $2 + i$, coordinates $(2, 1)$.\n- 1 unit eastwards (along $+x$ axis): coordinates become $(2 + 1, 1) = (3, 1)$, represented by $3 + i$.\n- 2 units northwards (along $+y$ axis): coordinates become $(3, 1 + 2) = (3, 3)$, represented by $3 + 3i$.\n- Displacement in south-west direction of magnitude $2\\sqrt{2}$:\n  The south-west direction vector is along $\\theta = -\\frac{3\\pi}{4}$:\n  $\\vec{d} = 2\\sqrt{2}\\left(\\cos\\left(-\\frac{3\\pi}{4}\\right) + i\\sin\\left(-\\frac{3\\pi}{4}\\right)\\right) = 2\\sqrt{2}\\left(-\\frac{1}{\\sqrt{2}} - \\frac{i}{\\sqrt{2}}\\right) = -2 - 2i$.\nFinal position $= (3 + 3i) + (-2 - 2i) = (3 - 2) + i(3 - 2) = 1 + i$.",
    topic: "Geometry & Argand Plane",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2016",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517206/edvedum_mathematics/complex_numbers/complex_q40.png"
  },
  {
    original_number: 41,
    question_text: "Let $z = 1 + ai$, be a complex number, $a > 0$, such that $z^3$ is a real number. Then, the sum $1 + z + z^2 + \\dots + z^{11}$ is equal to:",
    options: [
      "$1365\\sqrt{3}i$",
      "$-1365\\sqrt{3}i$",
      "$-1250\\sqrt{3}i$",
      "$1250\\sqrt{3}i$"
    ],
    correct_index: 1,
    solution: "Given $z = 1 + ai$ ($a > 0$).\n$z^3 = (1 + ai)^3 = 1 + 3ai - 3a^2 - ia^3 = (1 - 3a^2) + i(3a - a^3)$.\nSince $z^3$ is real, $\\text{Im}(z^3) = 0 \\implies a(3 - a^2) = 0$.\nSince $a > 0$, $a = \\sqrt{3}$, so $z = 1 + i\\sqrt{3} = 2e^{i\\pi/3}$.\nThe sum is a geometric progression:\n$S = 1 + z + z^2 + \\dots + z^{11} = \\frac{z^{12} - 1}{z - 1} = \\frac{(2e^{i\\pi/3})^{12} - 1}{(1 + i\\sqrt{3}) - 1} = \\frac{2^{12}e^{i4\\pi} - 1}{i\\sqrt{3}} = \\frac{4096 - 1}{i\\sqrt{3}} = \\frac{4095}{i\\sqrt{3}} = -1365\\sqrt{3}i$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2016"
  },
  {
    original_number: 42,
    question_text: "Let $\\omega$ be a complex number such that $2\\omega + 1 = z$ where $z = \\sqrt{-3}$. If\n$$\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & -\\omega^2 - 1 & \\omega^2 \\\\ 1 & \\omega^2 & \\omega^7 \\end{vmatrix} = 3k,$$\nThen $k$ can be equal to:",
    options: [
      "$-z$",
      "$\\frac{1}{z}$",
      "$-1$",
      "$1$"
    ],
    correct_index: 0,
    solution: "Given $2\\omega + 1 = \\sqrt{-3} = i\\sqrt{3} \\implies \\omega = \\frac{-1 + i\\sqrt{3}}{2}$.\nThis is the non-real cube root of unity, so $\\omega^3 = 1$ and $1 + \\omega + \\omega^2 = 0$.\nThen $-\\omega^2 - 1 = \\omega$ and $\\omega^7 = \\omega$.\nThe determinant is:\n$D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & \\omega & \\omega^2 \\\\ 1 & \\omega^2 & \\omega \\end{vmatrix}$.\nPerforming $R_1 \\to R_1 + R_2 + R_3$:\n$D = \\begin{vmatrix} 3 & 1 + \\omega + \\omega^2 & 1 + \\omega^2 + \\omega \\\\ 1 & \\omega & \\omega^2 \\\\ 1 & \\omega^2 & \\omega \\end{vmatrix} = \\begin{vmatrix} 3 & 0 & 0 \\\\ 1 & \\omega & \\omega^2 \\\\ 1 & \\omega^2 & \\omega \\end{vmatrix} = 3(\\omega^2 - \\omega^4) = 3(\\omega^2 - \\omega)$.\nGiven $D = 3k \\implies k = \\omega^2 - \\omega$.\nNow $\\omega^2 - \\omega = \\left(\\frac{-1 - i\\sqrt{3}}{2}\\right) - \\left(\\frac{-1 + i\\sqrt{3}}{2}\\right) = -i\\sqrt{3} = -\\sqrt{-3} = -z$.\n$\\therefore k = -z$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2017"
  },
  {
    original_number: 43,
    question_text: "Let $z \\in \\mathbb{C}$, the set of complex numbers. Then the equation, $2|z + 3i| - |z - i| = 0$ represents:",
    options: [
      "A circle with radius $\\frac{8}{3}$",
      "An ellipse with length of minor axis $\\frac{16}{9}$",
      "An ellipse with length of major axis $\\frac{16}{3}$",
      "A circle with diameter $\\frac{10}{3}$"
    ],
    correct_index: 0,
    solution: "Given $2|z + 3i| = |z - i|$. Let $z = x + iy$.\n$2|x + i(y + 3)| = |x + i(y - 1)|$\nSquaring both sides:\n$4[x^2 + (y + 3)^2] = x^2 + (y - 1)^2$\n$4x^2 + 4(y^2 + 6y + 9) = x^2 + y^2 - 2y + 1$\n$3x^2 + 3y^2 + 26y + 35 = 0$\n$x^2 + y^2 + \\frac{26}{3}y + \\frac{35}{3} = 0$.\nThis represents a circle with center $\\left(0, -\\frac{13}{3}\\right)$ and radius:\n$r = \\sqrt{0^2 + \\left(\\frac{13}{3}\\right)^2 - \\frac{35}{3}} = \\sqrt{\\frac{169}{9} - \\frac{105}{9}} = \\sqrt{\\frac{64}{9}} = \\frac{8}{3}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2017"
  },
  {
    original_number: 44,
    question_text: "The equation $\\text{Im}\\left(\\frac{iz - 2}{z - i}\\right) + 1 = 0, z \\in \\mathbb{C}, z \\ne i$ represents a part of a circle having radius equal to:",
    options: [
      "$1$",
      "$2$",
      "$\\frac{3}{4}$",
      "$\\frac{1}{2}$"
    ],
    correct_index: 2,
    solution: "Let $z = x + iy$.\n$\\frac{iz - 2}{z - i} = \\frac{i(x + iy) - 2}{(x + iy) - i} = \\frac{-(y + 2) + ix}{x + i(y - 1)} = \\frac{[-(y + 2) + ix][x - i(y - 1)]}{x^2 + (y - 1)^2}$.\nThe imaginary part is:\n$\\text{Im}\\left(\\frac{iz - 2}{z - i}\\right) = \\frac{(y + 2)(y - 1) + x^2}{x^2 + (y - 1)^2} = \\frac{x^2 + y^2 + y - 2}{x^2 + (y - 1)^2}$.\nGiven $\\text{Im}\\left(\\frac{iz - 2}{z - i}\\right) + 1 = 0$:\n$\\frac{x^2 + y^2 + y - 2}{x^2 + (y - 1)^2} + 1 = 0 \\implies x^2 + y^2 + y - 2 + x^2 + (y - 1)^2 = 0$\n$2x^2 + 2y^2 - y - 1 = 0 \\implies x^2 + y^2 - \\frac{1}{2}y - \\frac{1}{2} = 0$.\nThe radius is $r = \\sqrt{0^2 + \\left(-\\frac{1}{4}\\right)^2 - \\left(-\\frac{1}{2}\\right)} = \\sqrt{\\frac{1}{16} + \\frac{1}{2}} = \\sqrt{\\frac{9}{16}} = \\frac{3}{4}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2017"
  },
  {
    original_number: 45,
    question_text: "If $\\alpha, \\beta \\in \\mathbb{C}$ are the distinct roots of the equation $x^2 - x + 1 = 0$, then $\\alpha^{101} + \\beta^{107}$ is equal to:",
    options: [
      "$2$",
      "$-1$",
      "$0$",
      "$1$"
    ],
    correct_index: 3,
    solution: "The roots of $x^2 - x + 1 = 0$ are $\\alpha = -\\omega$ and $\\beta = -\\omega^2$, where $\\omega$ is the cube root of unity ($\\omega^3 = 1, 1 + \\omega + \\omega^2 = 0$).\n$\\alpha^{101} = (-\\omega)^{101} = -\\omega^{101} = -(\\omega^3)^{33}\\omega^2 = -\\omega^2$.\n$\\beta^{107} = (-\\omega^2)^{107} = -\\omega^{214} = -(\\omega^3)^{71}\\omega = -\\omega$.\nThen $\\alpha^{101} + \\beta^{107} = -\\omega^2 - \\omega = -(\\omega^2 + \\omega) = -(-1) = 1$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2017"
  },
  {
    original_number: 46,
    question_text: "The set of all $\\alpha \\in \\mathbb{R}$, for which $w = \\frac{1 + (1 - 8\\alpha)z}{1 - z}$ is a purely imaginary number, for all $z \\in \\mathbb{C}$ satisfying $|z| = 1$ and $\\text{Re}(z) \\ne 1$, is:",
    options: [
      "$\\{0\\}$",
      "$\\left\\{0, \\frac{1}{4}, -\\frac{1}{4}\\right\\}$",
      "equal to $\\mathbb{R}$",
      "an empty set"
    ],
    correct_index: 0,
    solution: "Since $w$ is purely imaginary, $w + \\bar{w} = 0$.\nLet $k = 1 - 8\\alpha \\in \\mathbb{R}$. Then $w = \\frac{1 + kz}{1 - z}$.\n$\\frac{1 + kz}{1 - z} + \\frac{1 + k\\bar{z}}{1 - \\bar{z}} = 0$\n$\\implies (1 + kz)(1 - \\bar{z}) + (1 + k\\bar{z})(1 - z) = 0$\n$\\implies 1 - \\bar{z} + kz - k|z|^2 + 1 - z + k\\bar{z} - k|z|^2 = 0$.\nSince $|z| = 1$, $|z|^2 = 1$:\n$2 - 2k - (z + \\bar{z}) + k(z + \\bar{z}) = 0$\n$2(1 - k) + (k - 1)(z + \\bar{z}) = 0$\n$(1 - k)[2 - (z + \\bar{z})] = 0$.\nSince $\\text{Re}(z) \\ne 1$, $z + \\bar{z} = 2\\text{Re}(z) \\ne 2$, so $2 - (z + \\bar{z}) \\ne 0$.\nFor this relation to hold for all such $z$, we must have $1 - k = 0 \\implies k = 1$.\nSince $k = 1 - 8\\alpha \\implies 1 - 8\\alpha = 1 \\implies \\alpha = 0$.\n$\\therefore$ The set of all $\\alpha$ is $\\{0\\}$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2018"
  },
  {
    original_number: 48,
    question_text: "If $|z - 3 + 2i| \\le 4$, then the difference between the greatest value and the least value of $|z|$ is:",
    options: [
      "$\\sqrt{13}$",
      "$2\\sqrt{13}$",
      "$8$",
      "$4 + \\sqrt{13}$"
    ],
    correct_index: 1,
    solution: "$|z - (3 - 2i)| \\le 4$ represents a circular disc with centre $C(3, -2)$ and radius $R = 4$.\nThe distance of the origin $O(0, 0)$ from the centre is $OC = \\sqrt{3^2 + (-2)^2} = \\sqrt{13}$.\nOn the circle, the maximum distance of $z$ from origin is along the diameter through origin:\n$|z|_{\\max} = R + OC = 4 + \\sqrt{13}$.\nThe minimum distance on the boundary is:\n$|z|_{\\min} = R - OC = 4 - \\sqrt{13}$.\nThe difference between the greatest and least value is:\n$|z|_{\\max} - |z|_{\\min} = (4 + \\sqrt{13}) - (4 - \\sqrt{13}) = 2\\sqrt{13}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2018",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517208/edvedum_mathematics/complex_numbers/complex_q48.png"
  },
  {
    original_number: 49,
    question_text: "The least positive integer $n$ for which $\\left(\\frac{1 + i\\sqrt{3}}{1 - i\\sqrt{3}}\\right)^n = 1$ is:",
    options: [
      "$2$",
      "$5$",
      "$6$",
      "$3$"
    ],
    correct_index: 3,
    solution: "Let $z = \\frac{1 + i\\sqrt{3}}{1 - i\\sqrt{3}}$.\nMultiply numerator and denominator by $1 + i\\sqrt{3}$:\n$z = \\frac{(1 + i\\sqrt{3})^2}{1 - (i\\sqrt{3})^2} = \\frac{1 + 2i\\sqrt{3} - 3}{1 + 3} = \\frac{-2 + 2i\\sqrt{3}}{4} = -\\frac{1}{2} + i\\frac{\\sqrt{3}}{2} = \\omega$.\nHere $\\omega$ is the cube root of unity.\nThen $\\left(\\frac{1 + i\\sqrt{3}}{1 - i\\sqrt{3}}\\right)^n = \\omega^n = 1$.\nSince $\\omega^3 = 1$, the least positive integer is $n = 3$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2018"
  },
  {
    original_number: 50,
    question_text: "Let $A = \\left\\{\\theta \\in \\left(-\\frac{\\pi}{2}, \\pi\\right) : \\frac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta} \\text{ is purely imaginary}\\right\\}$. Then the sum of the elements in $A$ is:",
    options: [
      "$\\frac{5\\pi}{6}$",
      "$\\pi$",
      "$\\frac{2\\pi}{3}$",
      "$\\frac{3\\pi}{4}$"
    ],
    correct_index: 2,
    solution: "Multiply numerator and denominator by $1 + 2i\\sin\\theta$:\n$\\frac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta} = \\frac{(3 + 2i\\sin\\theta)(1 + 2i\\sin\\theta)}{1 + 4\\sin^2\\theta} = \\frac{(3 - 4\\sin^2\\theta) + 8i\\sin\\theta}{1 + 4\\sin^2\\theta}$.\nFor purely imaginary number, the real part must be zero:\n$3 - 4\\sin^2\\theta = 0 \\implies \\sin^2\\theta = \\frac{3}{4} \\implies \\sin\\theta = \\pm \\frac{\\sqrt{3}}{2}$.\nGiven $\\theta \\in \\left(-\\frac{\\pi}{2}, \\pi\\right)$:\n- If $\\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3}, \\frac{2\\pi}{3}$.\n- If $\\sin\\theta = -\\frac{\\sqrt{3}}{2} \\implies \\theta = -\\frac{\\pi}{3}$.\nThus $A = \\left\\{-\\frac{\\pi}{3}, \\frac{\\pi}{3}, \\frac{2\\pi}{3}\\right\\}$.\nSum of elements $= -\\frac{\\pi}{3} + \\frac{\\pi}{3} + \\frac{2\\pi}{3} = \\frac{2\\pi}{3}$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 51,
    question_text: "Let $z_0$ be a root of quadratic equation, $x^2 + x + 1 = 0$. If $z = 3 + 6iz_0^{81} - 3iz_0^{93}$, then $\\text{arg}(z)$ is equal to:",
    options: [
      "$0$",
      "$\\frac{\\pi}{4}$",
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{3}$"
    ],
    correct_index: 1,
    solution: "The roots of $x^2 + x + 1 = 0$ are $\\omega$ and $\\omega^2$, where $\\omega^3 = 1$.\nThus $z_0^{81} = (z_0^3)^{27} = 1^{27} = 1$, and $z_0^{93} = (z_0^3)^{31} = 1^{31} = 1$.\nSubstituting these into the expression for $z$:\n$z = 3 + 6i(1) - 3i(1) = 3 + 3i$.\n$\\text{arg}(z) = \\tan^{-1}\\left(\\frac{3}{3}\\right) = \\tan^{-1}(1) = \\frac{\\pi}{4}$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019"
  },
  {
    original_number: 52,
    question_text: "Let $z_1$ and $z_2$ be any two non-zero complex numbers such that $3|z_1| = 4|z_2|$. If $z = \\frac{3z_1}{2z_2} + \\frac{2z_2}{3z_1}$, then maximum value of $|z|$ is:",
    options: [
      "$\\frac{7}{2}$",
      "$\\frac{9}{2}$",
      "$\\frac{5}{2}$",
      "$\\frac{1}{2}\\sqrt{\\frac{17}{2}}$"
    ],
    correct_index: 2,
    solution: "Let $u = \\frac{3z_1}{2z_2}$.\n$|u| = \\frac{3|z_1|}{2|z_2|} = \\frac{4|z_2|}{2|z_2|} = 2$.\nThen $z = u + \\frac{1}{u}$.\nBy the triangle inequality:\n$|z| = \\left|u + \\frac{1}{u}\\right| \\le |u| + \\frac{1}{|u|} = 2 + \\frac{1}{2} = \\frac{5}{2}$.\nThus, the maximum value of $|z|$ is $\\frac{5}{2}$.",
    topic: "Modulus & Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 53,
    question_text: "Let $z = \\left(\\frac{\\sqrt{3}}{2} + \\frac{i}{2}\\right)^5 + \\left(\\frac{\\sqrt{3}}{2} - \\frac{i}{2}\\right)^5$. If $R(z)$ and $I(z)$ respectively denote the real and imaginary parts of $z$, then:",
    options: [
      "$I(z) = 0$",
      "$R(z) < 0 \\text{ and } I(z) > 0$",
      "$R(z) > 0 \\text{ and } I(z) > 0$",
      "$R(z) = -3$"
    ],
    correct_index: 0,
    solution: "Let $u = \\frac{\\sqrt{3}}{2} + \\frac{i}{2} = e^{i\\pi/6}$.\nThen $\\bar{u} = \\frac{\\sqrt{3}}{2} - \\frac{i}{2} = e^{-i\\pi/6}$.\n$z = u^5 + \\bar{u}^5 = e^{i5\\pi/6} + e^{-i5\\pi/6} = 2\\cos\\left(\\frac{5\\pi}{6}\\right) = 2\\left(-\\frac{\\sqrt{3}}{2}\\right) = -\\sqrt{3}$.\nSince $z = -\\sqrt{3} + 0i$, $R(z) = -\\sqrt{3} < 0$ and $I(z) = 0$.\n$\\therefore I(z) = 0$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019"
  },
  {
    original_number: 54,
    question_text: "Let $\\left(-2 - \\frac{1}{3}i\\right)^3 = \\frac{x + iy}{27} (i = \\sqrt{-1})$, where $x$ and $y$ are real numbers then $y - x$ equals:",
    options: [
      "$91$",
      "$-85$",
      "$85$",
      "$-91$"
    ],
    correct_index: 0,
    solution: "$\\left(-2 - \\frac{i}{3}\\right)^3 = -\\left(2 + \\frac{i}{3}\\right)^3 = -\\frac{(6 + i)^3}{27}$.\nExpanding $(6 + i)^3$:\n$(6 + i)^3 = 6^3 + 3(6)^2(i) + 3(6)(i^2) + i^3 = 216 + 108i - 18 - i = 198 + 107i$.\nThen $-\\frac{(6 + i)^3}{27} = \\frac{-198 - 107i}{27}$.\nComparing with $\\frac{x + iy}{27}$, we get $x = -198$ and $y = -107$.\n$\\therefore y - x = -107 - (-198) = 91$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 55,
    question_text: "Let $z$ be a complex number such that $|z| + z = 3 + i$ (where $i = \\sqrt{-1}$). Then $|z|$ is equal to:",
    options: [
      "$\\frac{\\sqrt{34}}{3}$",
      "$\\frac{5}{3}$",
      "$\\frac{\\sqrt{41}}{4}$",
      "$\\frac{5}{4}$"
    ],
    correct_index: 1,
    solution: "Let $z = x + iy$. Then $|z| = \\sqrt{x^2 + y^2}$.\nGiven $\\sqrt{x^2 + y^2} + x + iy = 3 + i$.\nEquating imaginary parts: $y = 1$.\nEquating real parts: $\\sqrt{x^2 + 1} + x = 3 \\implies \\sqrt{x^2 + 1} = 3 - x$.\nSquaring both sides:\n$x^2 + 1 = 9 - 6x + x^2 \\implies 6x = 8 \\implies x = \\frac{4}{3}$.\nThen $|z| = \\sqrt{x^2 + y^2} = \\sqrt{\\left(\\frac{4}{3}\\right)^2 + 1^2} = \\sqrt{\\frac{16}{9} + 1} = \\sqrt{\\frac{25}{9}} = \\frac{5}{3}$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019"
  },
  {
    original_number: 56,
    question_text: "If $\\frac{z - \\alpha}{z + \\alpha} (\\alpha \\in \\mathbb{R})$ is a purely imaginary number and $|z| = 2$, then a value of $\\alpha$ is:",
    options: [
      "$1$",
      "$\\frac{1}{2}$",
      "$\\sqrt{2}$",
      "$2$"
    ],
    correct_index: 3,
    solution: "Let $w = \\frac{z - \\alpha}{z + \\alpha}$. Since $w$ is purely imaginary, $w + \\bar{w} = 0$:\n$\\frac{z - \\alpha}{z + \\alpha} + \\frac{\\bar{z} - \\alpha}{\\bar{z} + \\alpha} = 0$\n$\\implies (z - \\alpha)(\\bar{z} + \\alpha) + (\\bar{z} - \\alpha)(z + \\alpha) = 0$\n$\\implies (|z|^2 + \\alpha z - \\alpha\\bar{z} - \\alpha^2) + (|z|^2 - \\alpha z + \\alpha\\bar{z} - \\alpha^2) = 0$\n$\\implies 2|z|^2 - 2\\alpha^2 = 0 \\implies |z|^2 = \\alpha^2 \\implies |\\alpha| = |z|$.\nGiven $|z| = 2$, $|\\alpha| = 2 \\implies \\alpha = \\pm 2$.\nHence, a value of $\\alpha$ is $2$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 57,
    question_text: "Let $z_1$ and $z_2$ be two complex numbers satisfying $|z_1| = 9$ and $|z_2 - 3 - 4i| = 4$. Then the minimum value of $|z_1 - z_2|$ is:",
    options: [
      "$2$",
      "$\\sqrt{2}$",
      "$0$",
      "$1$"
    ],
    correct_index: 2,
    solution: "$|z_1| = 9$ is a circle $C_1$ with centre $O(0, 0)$ and radius $R_1 = 9$.\n$|z_2 - (3 + 4i)| = 4$ is a circle $C_2$ with centre $C(3, 4)$ and radius $R_2 = 4$.\nThe distance between the centres is $OC = \\sqrt{3^2 + 4^2} = 5$.\nNotice that $OC + R_2 = 5 + 4 = 9 = R_1$.\nThis means circle $C_2$ touches circle $C_1$ internally at a point.\nSince the two circles intersect (touch), there exists a common point where $z_1 = z_2$.\n$\\therefore$ The minimum value of $|z_1 - z_2|$ is $0$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517209/edvedum_mathematics/complex_numbers/complex_q57.png"
  },
  {
    original_number: 58,
    question_text: "If $\\alpha$ and $\\beta$ be the roots of the equation $x^2 - 2x + 2 = 0$, then the least value of $n$ for which $\\left(\\frac{\\alpha}{\\beta}\\right)^n = 1$ is:",
    options: [
      "$5$",
      "$4$",
      "$2$",
      "$3$"
    ],
    correct_index: 1,
    solution: "Roots of $x^2 - 2x + 2 = 0$ are:\n$x = \\frac{2 \\pm \\sqrt{4 - 8}}{2} = 1 \\pm i$.\nLet $\\alpha = 1 + i = \\sqrt{2}e^{i\\pi/4}$ and $\\beta = 1 - i = \\sqrt{2}e^{-i\\pi/4}$.\nThen $\\frac{\\alpha}{\\beta} = \\frac{e^{i\\pi/4}}{e^{-i\\pi/4}} = e^{i\\pi/2} = i$.\nNow $\\left(\\frac{\\alpha}{\\beta}\\right)^n = i^n = 1$.\nThe least positive integer $n$ is $4$.",
    topic: "Roots of Polynomial Equations",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019"
  },
  {
    original_number: 59,
    question_text: "If $z = \\frac{\\sqrt{3}}{2} + \\frac{i}{2} (i = \\sqrt{-1})$, then $\\left(1 + iz + z^5 + iz^8\\right)^9$ is equal to:",
    options: [
      "$-1$",
      "$1$",
      "$0$",
      "$(-1 + 2i)^9$"
    ],
    correct_index: 0,
    solution: "Given $z = \\frac{\\sqrt{3}}{2} + \\frac{i}{2} = e^{i\\pi/6}$.\n$iz = i e^{i\\pi/6} = -\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$.\n$z^5 = e^{i5\\pi/6} = -\\frac{\\sqrt{3}}{2} + \\frac{i}{2}$.\n$iz^8 = i e^{i4\\pi/3} = i\\left(-\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}\\right) = \\frac{\\sqrt{3}}{2} - \\frac{i}{2}$.\nAdding all four terms:\n$1 + iz + z^5 + iz^8 = 1 + \\left(-\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right) + \\left(-\\frac{\\sqrt{3}}{2} + \\frac{i}{2}\\right) + \\left(\\frac{\\sqrt{3}}{2} - \\frac{i}{2}\\right)$\n$= \\frac{1}{2} + i\\frac{\\sqrt{3}}{2} = e^{i\\pi/3}$.\nNow raise to power 9:\n$\\left(1 + iz + z^5 + iz^8\\right)^9 = \\left(e^{i\\pi/3}\\right)^9 = e^{i3\\pi} = \\cos 3\\pi + i\\sin 3\\pi = -1$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 60,
    question_text: "All the points in the set $S = \\left\\{\\frac{\\alpha + i}{\\alpha - i}, \\alpha \\in \\mathbb{R}\\right\\}, i = \\sqrt{-1}$ lie on a:",
    options: [
      "straight line whose slope is $-1$",
      "circle whose radius is $\\sqrt{2}$",
      "circle whose radius is $1$",
      "straight line whose slope is $1$"
    ],
    correct_index: 2,
    solution: "Let $z = \\frac{\\alpha + i}{\\alpha - i}$ where $\\alpha \\in \\mathbb{R}$.\nTaking modulus on both sides:\n$|z| = \\left|\\frac{\\alpha + i}{\\alpha - i}\\right| = \\frac{|\\alpha + i|}{|\\alpha - i|} = \\frac{\\sqrt{\\alpha^2 + 1}}{\\sqrt{\\alpha^2 + (-1)^2}} = \\frac{\\sqrt{\\alpha^2 + 1}}{\\sqrt{\\alpha^2 + 1}} = 1$.\nSince $|z| = 1$ for all $\\alpha \\in \\mathbb{R}$, all points lie on a circle centered at the origin with radius $1$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019"
  },
  {
    original_number: 61,
    question_text: "Let $z \\in \\mathbb{C}$ be such that $|z| < 1$. If $\\omega = \\frac{5 + 3z}{5(1 - z)}$, then:",
    options: [
      "$5\\text{Re}(\\omega) > 1$",
      "$5\\text{Im}(\\omega) < 1$",
      "$5\\text{Re}(\\omega) > 4$",
      "$4\\text{Im}(\\omega) > 5$"
    ],
    correct_index: 0,
    solution: "Express $z$ in terms of $\\omega$:\n$5\\omega(1 - z) = 5 + 3z \\implies 5\\omega - 5\\omega z = 5 + 3z$\n$\\implies z(3 + 5\\omega) = 5(\\omega - 1) \\implies z = \\frac{5(\\omega - 1)}{5\\omega + 3}$.\nGiven $|z| < 1$:\n$\\left|\\frac{5(\\omega - 1)}{5\\omega + 3}\\right| < 1 \\implies 25|\\omega - 1|^2 < |5\\omega + 3|^2$.\nLet $\\omega = u + iv$:\n$25[(u - 1)^2 + v^2] < (5u + 3)^2 + 25v^2$\n$25(u^2 - 2u + 1) < 25u^2 + 30u + 9$\n$-50u + 25 < 30u + 9 \\implies 80u > 16 \\implies u > \\frac{1}{5}$.\nSince $u = \\text{Re}(\\omega)$, we have $\\text{Re}(\\omega) > \\frac{1}{5} \\implies 5\\text{Re}(\\omega) > 1$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517210/edvedum_mathematics/complex_numbers/complex_q61.png"
  },
  {
    original_number: 62,
    question_text: "If $a > 0$ and $z = \\frac{(1 + i)^2}{a - i}$, has magnitude $\\sqrt{\\frac{2}{5}}$, then $\\bar{z}$ is equal to:",
    options: [
      "$-\\frac{1}{5} - \\frac{3}{5}i$",
      "$-\\frac{3}{5} - \\frac{1}{5}i$",
      "$\\frac{1}{5} - \\frac{3}{5}i$",
      "$-\\frac{1}{5} + \\frac{3}{5}i$"
    ],
    correct_index: 0,
    solution: "Numerator: $(1 + i)^2 = 1 + 2i - 1 = 2i$, so $|(1 + i)^2| = |2i| = 2$.\n$|z| = \\frac{|2i|}{|a - i|} = \\frac{2}{\\sqrt{a^2 + 1}}$.\nGiven $|z| = \\sqrt{\\frac{2}{5}} \\implies \\frac{4}{a^2 + 1} = \\frac{2}{5} \\implies a^2 + 1 = 10 \\implies a^2 = 9$.\nSince $a > 0$, $a = 3$.\nThen $z = \\frac{2i}{3 - i} = \\frac{2i(3 + i)}{3^2 - i^2} = \\frac{6i - 2}{10} = -\\frac{1}{5} + \\frac{3}{5}i$.\nTaking the complex conjugate:\n$\\bar{z} = -\\frac{1}{5} - \\frac{3}{5}i$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 64,
    question_text: "The equation $|z - i| = |z - 1|, i = \\sqrt{-1}$, represents:",
    options: [
      "a circle of radius $\\frac{1}{2}$",
      "a circle of radius $1$",
      "the line through the origin with slope 1",
      "the line through the origin with slope $-1$"
    ],
    correct_index: 2,
    solution: "$|z - i| = |z - 1|$ represents the locus of points equidistant from $A(0, 1)$ and $B(1, 0)$, which is the perpendicular bisector of segment $AB$.\nMidpoint of $AB$ is $\\left(\\frac{1}{2}, \\frac{1}{2}\\right)$.\nSlope of $AB$ is $\\frac{0 - 1}{1 - 0} = -1$.\nSlope of perpendicular bisector is $m = -\\frac{1}{-1} = 1$.\nEquation of perpendicular bisector: $y - \\frac{1}{2} = 1\\left(x - \\frac{1}{2}\\right) \\implies y = x$.\nThis is the line passing through the origin with slope 1.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2019",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517211/edvedum_mathematics/complex_numbers/complex_q64.png"
  },
  {
    original_number: 65,
    question_text: "Let $z \\in \\mathbb{C}$ with $\\text{Im}(z) = 10$ and it satisfies $\\frac{2z - n}{2z + n} = 2i - 1$ for some natural number $n$. Then:",
    options: [
      "$n = 20 \\text{ and } \\text{Re}(z) = 10$",
      "$n = 40 \\text{ and } \\text{Re}(z) = 10$",
      "$n = 20 \\text{ and } \\text{Re}(z) = -10$",
      "$n = 40 \\text{ and } \\text{Re}(z) = -10$"
    ],
    correct_index: 3,
    solution: "Let $z = x + 10i$ where $x = \\text{Re}(z)$ and $n \\in \\mathbb{N}$.\nGiven $\\frac{2z - n}{2z + n} = -1 + 2i$:\n$2z - n = (-1 + 2i)(2z + n) = -2z - n + 4iz + 2in$\n$4z - 4iz = 2in \\implies 4z(1 - i) = 2in \\implies 2z(1 - i) = in$\n$z = \\frac{in}{2(1 - i)} = \\frac{in(1 + i)}{2(1 - i^2)} = \\frac{in - n}{4} = -\\frac{n}{4} + i\\frac{n}{4}$.\nEquating imaginary parts: $\\frac{n}{4} = 10 \\implies n = 40$.\nEquating real parts: $x = \\text{Re}(z) = -\\frac{n}{4} = -10$.\n$\\therefore n = 40$ and $\\text{Re}(z) = -10$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 66,
    question_text: "If $\\text{Re}\\left(\\frac{z - 1}{2z + i}\\right) = 1$, where $z = x + iy$, then the point $(x, y)$ lies on a:",
    options: [
      "circle whose centre is at $\\left(-\\frac{1}{2}, -\\frac{3}{2}\\right)$",
      "straight line whose slope is $-\\frac{2}{3}$",
      "straight line whose slope is $\\frac{3}{2}$",
      "circle whose diameter is $\\frac{\\sqrt{5}}{2}$"
    ],
    correct_index: 3,
    solution: "Substitute $z = x + iy$:\n$\\frac{z - 1}{2z + i} = \\frac{(x - 1) + iy}{2x + i(2y + 1)} = \\frac{[(x - 1) + iy][2x - i(2y + 1)]}{4x^2 + (2y + 1)^2}$.\nTaking real part:\n$\\text{Re}\\left(\\frac{z - 1}{2z + i}\\right) = \\frac{2x(x - 1) + y(2y + 1)}{4x^2 + (2y + 1)^2} = 1$\n$2x^2 - 2x + 2y^2 + y = 4x^2 + 4y^2 + 4y + 1$\n$2x^2 + 2y^2 + 2x + 3y + 1 = 0 \\implies x^2 + y^2 + x + \\frac{3}{2}y + \\frac{1}{2} = 0$.\nRadius $r = \\sqrt{\\left(\\frac{1}{2}\\right)^2 + \\left(\\frac{3}{4}\\right)^2 - \\frac{1}{2}} = \\sqrt{\\frac{1}{4} + \\frac{9}{16} - \\frac{1}{2}} = \\sqrt{\\frac{5}{16}} = \\frac{\\sqrt{5}}{4}$.\nDiameter $= 2r = 2\\left(\\frac{\\sqrt{5}}{4}\\right) = \\frac{\\sqrt{5}}{2}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 67,
    question_text: "If $\\frac{3 + i\\sin\\theta}{4 - i\\cos\\theta}, \\theta \\in [0, 2\\pi]$, is a real number, then an argument of $\\sin\\theta + i\\cos\\theta$ is:",
    options: [
      "$\\pi - \\tan^{-1}\\left(\\frac{4}{3}\\right)$",
      "$\\pi - \\tan^{-1}\\left(\\frac{3}{4}\\right)$",
      "$-\\tan^{-1}\\left(\\frac{3}{4}\\right)$",
      "$\\tan^{-1}\\left(\\frac{4}{3}\\right)$"
    ],
    correct_index: 0,
    solution: "Multiply numerator and denominator by $4 + i\\cos\\theta$:\n$\\frac{3 + i\\sin\\theta}{4 - i\\cos\\theta} = \\frac{(3 + i\\sin\\theta)(4 + i\\cos\\theta)}{16 + \\cos^2\\theta} = \\frac{(12 - \\sin\\theta\\cos\\theta) + i(4\\sin\\theta + 3\\cos\\theta)}{16 + \\cos^2\\theta}$.\nSince this number is real, imaginary part $= 0$:\n$4\\sin\\theta + 3\\cos\\theta = 0 \\implies \\tan\\theta = -\\frac{3}{4}$.\nFor $\\theta$ in 4th quadrant: $\\sin\\theta = -\\frac{3}{5}, \\cos\\theta = \\frac{4}{5}$.\nThen $Z = \\sin\\theta + i\\cos\\theta = -\\frac{3}{5} + i\\frac{4}{5}$.\nSince $\\text{Re}(Z) < 0$ and $\\text{Im}(Z) > 0$, $Z$ lies in the 2nd quadrant.\n$\\text{arg}(Z) = \\pi - \\tan^{-1}\\left(\\left|\\frac{4/5}{-3/5}\\right|\\right) = \\pi - \\tan^{-1}\\left(\\frac{4}{3}\\right)$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2019"
  },
  {
    original_number: 68,
    question_text: "If the equation $x^2 + bx + 45 = 0, b \\in \\mathbb{R}$ has conjugate complex roots and they satisfy $|z + 1| = 2\\sqrt{10}$, then:",
    options: [
      "$b^2 - b = 30$",
      "$b^2 + b = 72$",
      "$b^2 - b = 42$",
      "$b^2 + b = 12$"
    ],
    correct_index: 0,
    solution: "Let $z = \\alpha + i\\beta$ and $\\bar{z} = \\alpha - i\\beta$ be the conjugate roots of $x^2 + bx + 45 = 0$.\nSum of roots: $2\\alpha = -b \\implies \\alpha = -\\frac{b}{2}$.\nProduct of roots: $\\alpha^2 + \\beta^2 = 45$.\nGiven $|z + 1| = 2\\sqrt{10} \\implies |(\\alpha + 1) + i\\beta|^2 = 40$:\n$(\\alpha + 1)^2 + \\beta^2 = 40$\n$\\alpha^2 + 2\\alpha + 1 + \\beta^2 = 40$.\nSubstituting $\\alpha^2 + \\beta^2 = 45$:\n$45 + 2\\alpha + 1 = 40 \\implies 2\\alpha = 40 - 46 = -6 \\implies \\alpha = -3$.\nSince $2\\alpha = -b \\implies -b = -6 \\implies b = 6$.\nNow $b^2 - b = 6^2 - 6 = 36 - 6 = 30$.",
    topic: "Roots of Polynomial Equations",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 69,
    question_text: "Let $\\alpha = \\frac{-1 + i\\sqrt{3}}{2}$. If $a = (1 + \\alpha)\\sum_{k=0}^{100} \\alpha^{2k}$ and $b = \\sum_{k=0}^{100} \\alpha^{3k}$, then $a$ and $b$, are the roots of the quadratic equation:",
    options: [
      "$x^2 + 101x + 100 = 0$",
      "$x^2 - 102x + 101 = 0$",
      "$x^2 - 101x + 100 = 0$",
      "$x^2 + 102x + 101 = 0$"
    ],
    correct_index: 1,
    solution: "Here $\\alpha = \\omega$ (cube root of unity, $\\omega^3 = 1, 1 + \\omega + \\omega^2 = 0$).\n$a = (1 + \\omega)\\sum_{k=0}^{100} \\omega^{2k} = (-\\omega^2) \\frac{1 - (\\omega^2)^{101}}{1 - \\omega^2} = (-\\omega^2) \\frac{1 - \\omega^{202}}{1 - \\omega^2}$.\nSince $\\omega^{202} = \\omega$:\n$a = (-\\omega^2) \\frac{1 - \\omega}{(1 - \\omega)(1 + \\omega)} = \\frac{-\\omega^2}{1 + \\omega} = \\frac{-\\omega^2}{-\\omega^2} = 1$.\nFor $b$:\n$b = \\sum_{k=0}^{100} \\alpha^{3k} = \\sum_{k=0}^{100} (\\omega^3)^k = \\sum_{k=0}^{100} 1^k = 101$.\nThus $a = 1$ and $b = 101$.\nThe quadratic equation with roots $a$ and $b$ is:\n$x^2 - (a + b)x + ab = 0 \\implies x^2 - (1 + 101)x + (1 \\times 101) = 0 \\implies x^2 - 102x + 101 = 0$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 70,
    question_text: "Let $z$ be a complex number such that $\\left|\\frac{z - i}{z + 2i}\\right| = 1$ and $|z| = \\frac{5}{2}$. Then, the value of $|z + 3i|$ is:",
    options: [
      "$\\sqrt{10}$",
      "$\\frac{7}{2}$",
      "$\\frac{15}{4}$",
      "$2\\sqrt{3}$"
    ],
    correct_index: 1,
    solution: "$\\left|\\frac{z - i}{z + 2i}\\right| = 1 \\implies |z - i| = |z + 2i|$.\nLet $z = x + iy$:\n$x^2 + (y - 1)^2 = x^2 + (y + 2)^2 \\implies -2y + 1 = 4y + 4 \\implies 6y = -3 \\implies y = -\\frac{1}{2}$.\nGiven $|z| = \\frac{5}{2} \\implies x^2 + y^2 = \\frac{25}{4}$.\n$x^2 + \\left(-\\frac{1}{2}\\right)^2 = \\frac{25}{4} \\implies x^2 = \\frac{25}{4} - \\frac{1}{4} = 6$.\nNow, $|z + 3i|^2 = x^2 + (y + 3)^2 = 6 + \\left(-\\frac{1}{2} + 3\\right)^2 = 6 + \\left(\\frac{5}{2}\\right)^2 = 6 + \\frac{25}{4} = \\frac{49}{4}$.\n$\\therefore |z + 3i| = \\sqrt{\\frac{49}{4}} = \\frac{7}{2}$.",
    topic: "Modulus and Argument",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 71,
    question_text: "If $z$ is a complex number satisfying $|\\text{Re}(z)| + |\\text{Im}(z)| = 4$, then $|z|$ cannot be:",
    options: [
      "$\\sqrt{\\frac{17}{2}}$",
      "$\\sqrt{10}$",
      "$\\sqrt{7}$",
      "$\\sqrt{8}$"
    ],
    correct_index: 2,
    solution: "Let $z = x + iy$. Then $|x| + |y| = 4$.\nThis represents a square with vertices at $(4, 0), (0, 4), (-4, 0), (0, -4)$.\nThe distance $|z| = \\sqrt{x^2 + y^2}$ from the origin to any point on this square satisfies:\n- Minimum distance: perpendicular distance from $(0, 0)$ to line $x + y = 4$:\n  $|z|_{\\min} = \\frac{|4|}{\\sqrt{1^2 + 1^2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2} = \\sqrt{8}$.\n- Maximum distance: distance to any vertex:\n  $|z|_{\\max} = 4 = \\sqrt{16}$.\nTherefore $\\sqrt{8} \\le |z| \\le 4$.\nChecking options: $\\sqrt{7} < \\sqrt{8}$, so $|z|$ cannot be $\\sqrt{7}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020",
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793517213/edvedum_mathematics/complex_numbers/complex_q71.png"
  },
  {
    original_number: 72,
    question_text: "The value of $\\left(\\frac{1 + \\sin\\frac{2\\pi}{9} + i\\cos\\frac{2\\pi}{9}}{1 + \\sin\\frac{2\\pi}{9} - i\\cos\\frac{2\\pi}{9}}\\right)^3$ is:",
    options: [
      "$\\frac{1}{2}(1 - i\\sqrt{3})$",
      "$\\frac{1}{2}(\\sqrt{3} - i)$",
      "$-\\frac{1}{2}(\\sqrt{3} - i)$",
      "$-\\frac{1}{2}(1 - i\\sqrt{3})$"
    ],
    correct_index: 2,
    solution: "Let $\\theta = \\frac{2\\pi}{9}$ and $\\alpha = \\frac{\\pi}{2} - \\theta = \\frac{5\\pi}{18}$.\nThen $\\sin\\frac{2\\pi}{9} = \\cos\\alpha$ and $\\cos\\frac{2\\pi}{9} = \\sin\\alpha$.\n$\\frac{1 + \\cos\\alpha + i\\sin\\alpha}{1 + \\cos\\alpha - i\\sin\\alpha} = \\frac{2\\cos^2\\frac{\\alpha}{2} + 2i\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}}{2\\cos^2\\frac{\\alpha}{2} - 2i\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}} = \\frac{\\cos\\frac{\\alpha}{2} + i\\sin\\frac{\\alpha}{2}}{\\cos\\frac{\\alpha}{2} - i\\sin\\frac{\\alpha}{2}} = e^{i\\alpha}$.\nNow cubing this:\n$(e^{i\\alpha})^3 = e^{i3\\alpha} = e^{i(3 \\times 5\\pi/18)} = e^{i5\\pi/6} = \\cos\\frac{5\\pi}{6} + i\\sin\\frac{5\\pi}{6} = -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}i = -\\frac{1}{2}(\\sqrt{3} - i)$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 73,
    question_text: "The imaginary part of $(3 + 2\\sqrt{-54})^{1/2} - (3 - 2\\sqrt{-54})^{1/2}$, can be:",
    options: [
      "$-\\sqrt{6}$",
      "$-2\\sqrt{6}$",
      "$6$",
      "$\\sqrt{6}$"
    ],
    correct_index: 1,
    solution: "$2\\sqrt{-54} = 2i\\sqrt{54} = 6i\\sqrt{6}$.\nLet $(3 + 6i\\sqrt{6})^{1/2} = x + iy$.\n$x^2 - y^2 = 3$ and $2xy = 6\\sqrt{6} \\implies xy = 3\\sqrt{6}$.\nAlso $x^2 + y^2 = \\sqrt{3^2 + 216} = 15$.\nAdding: $2x^2 = 18 \\implies x = \\pm 3$.\nSubtracting: $2y^2 = 12 \\implies y = \\pm \\sqrt{6}$.\nThus $(3 + 2\\sqrt{-54})^{1/2} = \\pm(3 + i\\sqrt{6})$.\nSimilarly $(3 - 2\\sqrt{-54})^{1/2} = \\pm(3 - i\\sqrt{6})$.\nTaking matching signs:\n$-(3 + i\\sqrt{6}) - [-(3 - i\\sqrt{6})] = -3 - i\\sqrt{6} + 3 - i\\sqrt{6} = -2i\\sqrt{6}$.\n$\\therefore$ The imaginary part can be $-2\\sqrt{6}$.",
    topic: "Square Root of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 74,
    question_text: "If $\\left(\\frac{1 + i}{1 - i}\\right)^{m/2} = \\left(\\frac{1 + i}{i - 1}\\right)^{n/3} = 1, (m, n \\in \\mathbb{N})$, then the greatest common divisor of the least values of $m$ and $n$ is:",
    options: [
      "$4$",
      "$2$",
      "$1$",
      "$8$"
    ],
    correct_index: 0,
    solution: "$\\frac{1 + i}{1 - i} = \\frac{(1 + i)^2}{2} = i$.\n$i^{m/2} = 1 \\implies \\frac{m}{2} = 4k \\implies m = 8k$.\nLeast natural value of $m$ is $8$.\n$\\frac{1 + i}{i - 1} = -\\frac{1 + i}{1 - i} = -i$.\n$(-i)^{n/3} = 1 \\implies \\frac{n}{3} = 4l \\implies n = 12l$.\nLeast natural value of $n$ is $12$.\n$\\therefore \\gcd(8, 12) = 4$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 75,
    question_text: "If $z_1, z_2$ are complex numbers such that $\\text{Re}(z_1) = |z_1 - 1|$ and $\\text{Re}(z_2) = |z_2 - 1|$ and $\\text{arg}(z_1 - z_2) = \\frac{\\pi}{6}$, then $\\text{Im}(z_1 + z_2)$ is equal to:",
    options: [
      "$2\\sqrt{3}$",
      "$\\frac{\\sqrt{3}}{2}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{2}{\\sqrt{3}}$"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy$. $\\text{Re}(z) = |z - 1| \\implies x = \\sqrt{(x - 1)^2 + y^2}$.\n$x^2 = x^2 - 2x + 1 + y^2 \\implies y^2 = 2x - 1$.\nBoth points $z_1(x_1, y_1)$ and $z_2(x_2, y_2)$ lie on the parabola $y^2 = 2x - 1$:\n$y_1^2 = 2x_1 - 1$ and $y_2^2 = 2x_2 - 1$.\nSubtracting:\n$y_1^2 - y_2^2 = 2(x_1 - x_2) \\implies (y_1 - y_2)(y_1 + y_2) = 2(x_1 - x_2) \\implies \\frac{y_1 - y_2}{x_1 - x_2} = \\frac{2}{y_1 + y_2}$.\nGiven $\\text{arg}(z_1 - z_2) = \\frac{\\pi}{6}$, the slope is $\\tan\\left(\\frac{\\pi}{6}\\right) = \\frac{1}{\\sqrt{3}}$:\n$\\frac{2}{y_1 + y_2} = \\frac{1}{\\sqrt{3}} \\implies y_1 + y_2 = 2\\sqrt{3}$.\nSince $\\text{Im}(z_1 + z_2) = y_1 + y_2 = 2\\sqrt{3}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 76,
    question_text: "Let $u = \\frac{2z + i}{z - ki}, z = x + iy$ and $k > 0$. If the curve represented by $\\text{Re}(u) + \\text{Im}(u) = 1$ intersects the $y$-axis at points $P$ and $Q$ where $PQ = 5$ then the value of $k$ is:",
    options: [
      "$\\frac{3}{2}$",
      "$\\frac{1}{2}$",
      "$4$",
      "$2$"
    ],
    correct_index: 3,
    solution: "$u = \\frac{2x + i(2y + 1)}{x + i(y - k)} = \\frac{[2x + i(2y + 1)][x - i(y - k)]}{x^2 + (y - k)^2}$.\n$\\text{Re}(u) = \\frac{2x^2 + (2y + 1)(y - k)}{x^2 + (y - k)^2}$, $\\text{Im}(u) = \\frac{x(2k + 1)}{x^2 + (y - k)^2}$.\n$\\text{Re}(u) + \\text{Im}(u) = 1 \\implies 2x^2 + 2y^2 + (1 - 2k)y - k + x(2k + 1) = x^2 + y^2 - 2ky + k^2$\n$x^2 + y^2 + (2k + 1)x + y - (k^2 + k) = 0$.\nOn the $y$-axis, $x = 0$:\n$y^2 + y - (k^2 + k) = 0$.\nThe distance between $P$ and $Q$ is $|y_1 - y_2| = \\sqrt{(y_1 + y_2)^2 - 4y_1 y_2} = \\sqrt{(-1)^2 - 4(-(k^2 + k))} = \\sqrt{4k^2 + 4k + 1} = 2k + 1$.\nGiven $PQ = 5 \\implies 2k + 1 = 5 \\implies 2k = 4 \\implies k = 2$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2020"
  },
  {
    original_number: 77,
    question_text: "If $a$ and $b$ are real numbers such that $(2 + \\alpha)^4 = a + b\\alpha$, where $\\alpha = \\frac{-1 + i\\sqrt{3}}{2}$, then $a + b$ is equal to:",
    options: [
      "$9$",
      "$24$",
      "$33$",
      "$57$"
    ],
    correct_index: 0,
    solution: "Here $\\alpha = \\omega$, the cube root of unity ($\\omega^3 = 1, 1 + \\omega + \\omega^2 = 0$).\n$(2 + \\omega)^2 = 4 + 4\\omega + \\omega^2 = 4 + 4\\omega + (-\\omega - 1) = 3 + 3\\omega = 3(1 + \\omega) = -3\\omega^2$.\nThen $(2 + \\omega)^4 = [3(1 + \\omega)]^2 = (-3\\omega^2)^2 = 9\\omega^4 = 9\\omega = 0 + 9\\alpha$.\nComparing with $a + b\\alpha$, we get $a = 0$ and $b = 9$.\n$\\therefore a + b = 0 + 9 = 9$.",
    topic: "Cube Roots of Unity",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 78,
    question_text: "If the four complex numbers $z, \\bar{z}, \\bar{z} - 2\\text{Re}(\\bar{z})$ and $z - 2\\text{Re}(z)$ represent the vertices of a square of side 4 units in the Argand plane, then $|z|$ is equal to:",
    options: [
      "$4\\sqrt{2}$",
      "$4$",
      "$2\\sqrt{2}$",
      "$2$"
    ],
    correct_index: 2,
    solution: "Let $z = x + iy$. The four vertices are:\n$z = x + iy \\implies (x, y)$\n$\\bar{z} = x - iy \\implies (x, -y)$\n$\\bar{z} - 2\\text{Re}(\\bar{z}) = (x - iy) - 2x = -x - iy \\implies (-x, -y)$\n$z - 2\\text{Re}(z) = (x + iy) - 2x = -x + iy \\implies (-x, y)$.\nThese form a rectangle centered at origin with side lengths:\nHorizontal side $= |x - (-x)| = 2|x| = 4 \\implies |x| = 2$.\nVertical side $= |y - (-y)| = 2|y| = 4 \\implies |y| = 2$.\n$\\therefore |z| = \\sqrt{x^2 + y^2} = \\sqrt{2^2 + 2^2} = \\sqrt{8} = 2\\sqrt{2}$.",
    topic: "Geometry & Argand Plane",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 79,
    question_text: "The value of $\\left(\\frac{-1 + i\\sqrt{3}}{1 - i}\\right)^{30}$ is:",
    options: [
      "$6^5$",
      "$2^{15}i$",
      "$-2^{15}$",
      "$-2^{15}i$"
    ],
    correct_index: 3,
    solution: "$-1 + i\\sqrt{3} = 2e^{i2\\pi/3}$.\n$1 - i = \\sqrt{2}e^{-i\\pi/4}$.\n$\\frac{-1 + i\\sqrt{3}}{1 - i} = \\sqrt{2} e^{i(2\\pi/3 + \\pi/4)} = \\sqrt{2} e^{i11\\pi/12}$.\nRaising to power 30:\n$\\left(\\sqrt{2} e^{i11\\pi/12}\\right)^{30} = 2^{15} e^{i\\frac{330\\pi}{12}} = 2^{15} e^{i\\frac{55\\pi}{2}} = 2^{15} e^{i(26\\pi + 3\\pi/2)} = 2^{15}(-i) = -2^{15}i$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2020"
  },
  {
    original_number: 80,
    question_text: "The region represented by $z = x + iy \\in \\mathbb{C} : |z| - \\text{Re}(z) \\le 1$ is also given by the inequality:",
    options: [
      "$y^2 \\ge 2(x + 1)$",
      "$y^2 \\le 2\\left(x + \\frac{1}{2}\\right)$",
      "$y^2 \\le \\left(x + \\frac{1}{2}\\right)$",
      "$y^2 \\ge x + 1$"
    ],
    correct_index: 1,
    solution: "Given $|z| - \\text{Re}(z) \\le 1 \\implies \\sqrt{x^2 + y^2} - x \\le 1 \\implies \\sqrt{x^2 + y^2} \\le x + 1$.\nFor LHS $\\ge 0$, we have $x + 1 \\ge 0$. Squaring both sides:\n$x^2 + y^2 \\le (x + 1)^2 = x^2 + 2x + 1$\n$y^2 \\le 2x + 1 = 2\\left(x + \\frac{1}{2}\\right)$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2020"
  },
  {
    original_number: 81,
    question_text: "Let $z = x + iy$ be a non-zero complex number such that $z^2 = i|z|^2$, where $i = \\sqrt{-1}$, then $z$ lies on the:",
    options: [
      "line, $y = -x$",
      "imaginary axis",
      "line, $y = x$",
      "real axis"
    ],
    correct_index: 2,
    solution: "Let $z = r e^{i\\theta}$ ($r > 0$).\n$z^2 = r^2 e^{i2\\theta}$, and $i|z|^2 = r^2 e^{i\\pi/2}$.\n$r^2 e^{i2\\theta} = r^2 e^{i\\pi/2} \\implies e^{i2\\theta} = e^{i\\pi/2}$.\n$2\\theta = \\frac{\\pi}{2} + 2k\\pi \\implies \\theta = \\frac{\\pi}{4} + k\\pi$.\nFor $k = 0$, $\\theta = \\frac{\\pi}{4} \\implies y = x$ ($x > 0, y > 0$).\nFor $k = 1$, $\\theta = \\frac{5\\pi}{4} \\implies y = x$ ($x < 0, y < 0$).\nThus, $z$ lies on the line $y = x$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2020"
  },
  {
    original_number: 82,
    question_text: "If the least and the largest real values of $\\alpha$, for which the equation $z + \\alpha|z - 1| + 2i = 0$ ($z \\in \\mathbb{C}$ and $i = \\sqrt{-1}$) has a solution, are $p$ and $q$ respectively; then $4(p^2 + q^2)$ is equal to:",
    options: [
      "$10$",
      "$5$",
      "$20$",
      "$4$"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy$. Then $x + iy + \\alpha\\sqrt{(x - 1)^2 + y^2} + 2i = 0$.\nEquating imaginary parts: $y + 2 = 0 \\implies y = -2$.\nEquating real parts: $x + \\alpha\\sqrt{(x - 1)^2 + 4} = 0 \\implies \\alpha = -\\frac{x}{\\sqrt{x^2 - 2x + 5}}$.\n$\\alpha^2 = \\frac{x^2}{x^2 - 2x + 5}$.\nTo find the maximum of $\\alpha^2$, let $f(x) = \\frac{x^2}{x^2 - 2x + 5}$.\n$f'(x) = \\frac{2x(x^2 - 2x + 5) - x^2(2x - 2)}{(x^2 - 2x + 5)^2} = \\frac{-2x^2 + 10x}{(x^2 - 2x + 5)^2} = 0 \\implies x = 5$ (since $x = 0$ gives minimum $0$).\nFor $x = 5$, $f(5) = \\frac{25}{25 - 10 + 5} = \\frac{25}{20} = \\frac{5}{4}$.\nThus $0 \\le \\alpha^2 \\le \\frac{5}{4} \\implies -\\frac{\\sqrt{5}}{2} \\le \\alpha \\le \\frac{\\sqrt{5}}{2}$.\nSo $p = -\\frac{\\sqrt{5}}{2}$ and $q = \\frac{\\sqrt{5}}{2}$.\n$4(p^2 + q^2) = 4\\left(\\frac{5}{4} + \\frac{5}{4}\\right) = 4\\left(\\frac{10}{4}\\right) = 10$.",
    topic: "Algebra of Complex Numbers",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2021"
  },
  {
    original_number: 83,
    question_text: "Let $i = \\sqrt{-1}$. If $\\frac{(-1 + i\\sqrt{3})^{21}}{(1 - i)^{24}} + \\frac{(1 + i\\sqrt{3})^{21}}{(1 + i)^{24}} = k$, and $n = [|k|]$ be the greatest integral part of $|k|$. Then $\\sum_{j=0}^{n+5} (j + 5)^2 - \\sum_{j=0}^{n+5} (j + 5)$ is equal to:",
    options: [
      "$310$",
      "$280$",
      "$325$",
      "$300$"
    ],
    correct_index: 0,
    solution: "Numerator 1: $-1 + i\\sqrt{3} = 2e^{i2\\pi/3} \\implies (-1 + i\\sqrt{3})^{21} = 2^{21}e^{i14\\pi} = 2^{21}$.\nDenominator 1: $1 - i = \\sqrt{2}e^{-i\\pi/4} \\implies (1 - i)^{24} = 2^{12}e^{-i6\\pi} = 2^{12}$.\nFirst term $= \\frac{2^{21}}{2^{12}} = 2^9 = 512$.\nNumerator 2: $1 + i\\sqrt{3} = 2e^{i\\pi/3} \\implies (1 + i\\sqrt{3})^{21} = 2^{21}e^{i7\\pi} = -2^{21}$.\nDenominator 2: $1 + i = \\sqrt{2}e^{i\\pi/4} \\implies (1 + i)^{24} = 2^{12}e^{i6\\pi} = 2^{12}$.\nSecond term $= \\frac{-2^{21}}{2^{12}} = -512$.\nThus $k = 512 + (-512) = 0 \\implies n = [|k|] = 0$.\nNow the sum becomes:\n$\\sum_{j=0}^5 [(j + 5)^2 - (j + 5)] = \\sum_{j=0}^5 (j^2 + 9j + 20) = \\sum_{j=0}^5 j^2 + 9\\sum_{j=0}^5 j + 20 \\times 6$\n$= \\frac{5 \\times 6 \\times 11}{6} + 9\\left(\\frac{5 \\times 6}{2}\\right) + 120 = 55 + 135 + 120 = 310$.",
    topic: "De Moivre's Theorem & Series",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2021"
  },
  {
    original_number: 84,
    question_text: "Let the lines $(2 - i)z = (2 + i)\\bar{z}$ and $(2 + i)z + (i - 2)\\bar{z} - 4i = 0$, (here $i^2 = -1$) be normal to a circle $C$. If the line $iz + \\bar{z} + 1 + i = 0$ is tangent to this circle $C$, then its radius is:",
    options: [
      "$\\frac{3}{\\sqrt{2}}$",
      "$3\\sqrt{2}$",
      "$\\frac{3}{2\\sqrt{2}}$",
      "$\\frac{1}{2\\sqrt{2}}$"
    ],
    correct_index: 2,
    solution: "Let $z = x + iy$.\nLine 1: $(2 - i)(x + iy) = (2 + i)(x - iy) \\implies 2x - ix + 2iy + y = 2x + ix - 2iy + y \\implies 2ix - 4iy = 0 \\implies x - 2y = 0 \\dots(1)$.\nLine 2: $(2 + i)(x + iy) + (i - 2)(x - iy) - 4i = 0 \\implies (2ix + 4iy) - 4i = 0 \\implies x + 2y = 2 \\dots(2)$.\nNormals intersect at the centre of circle $C$:\nAdding (1) and (2): $2x = 2 \\implies x = 1 \\implies y = 1/2$. Centre is $\\left(1, \\frac{1}{2}\\right)$.\nTangent line: $i(x + iy) + (x - iy) + 1 + i = 0 \\implies (x - y + 1)(1 + i) = 0 \\implies x - y + 1 = 0$.\nRadius is the perpendicular distance from $\\left(1, \\frac{1}{2}\\right)$ to $x - y + 1 = 0$:\n$r = \\frac{|1 - 1/2 + 1|}{\\sqrt{1^2 + (-1)^2}} = \\frac{3/2}{\\sqrt{2}} = \\frac{3}{2\\sqrt{2}}$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2021"
  },
  {
    original_number: 85,
    question_text: "If $\\alpha, \\beta \\in \\mathbb{R}$ are such that $1 - 2i$ (here $i^2 = -1$) is a root of $z^2 + \\alpha z + \\beta = 0$, then $(\\alpha - \\beta)$ is equal to:",
    options: [
      "$-7$",
      "$7$",
      "$-3$",
      "$3$"
    ],
    correct_index: 0,
    solution: "Since $\\alpha, \\beta \\in \\mathbb{R}$, complex roots occur in conjugate pairs.\nTherefore, the other root is $1 + 2i$.\nSum of roots: $(1 - 2i) + (1 + 2i) = 2 = -\\alpha \\implies \\alpha = -2$.\nProduct of roots: $(1 - 2i)(1 + 2i) = 1 - 4i^2 = 5 = \\beta \\implies \\beta = 5$.\n$\\therefore \\alpha - \\beta = -2 - 5 = -7$.",
    topic: "Roots of Polynomial Equations",
    marks: 4,
    difficulty: "easy",
    year: "JEE Main 2021"
  },
  {
    original_number: 86,
    question_text: "Let $z$ be those complex numbers which satisfy $|z + 5| \\le 4$ and $z(1 + i) + \\bar{z}(1 - i) \\ge -10, i = \\sqrt{-1}$. If the maximum value of $|z + 1|^2$ is $\\alpha + \\beta\\sqrt{2}$, then the value of $(\\alpha + \\beta)$ is:",
    options: [
      "$48$",
      "$36$",
      "$42$",
      "$40$"
    ],
    correct_index: 0,
    solution: "Let $z = x + iy$.\n$|z + 5| \\le 4 \\implies (x + 5)^2 + y^2 \\le 16$, a circle of radius 4 centred at $C(-5, 0)$.\n$z(1 + i) + \\bar{z}(1 - i) \\ge -10 \\implies 2(x - y) \\ge -10 \\implies x - y + 5 \\ge 0$.\nThis line passes through the centre $(-5, 0)$ with slope 1.\nParametrically for the circle: $x = -5 + 4\\cos\\theta, y = 4\\sin\\theta$.\n$x - y + 5 \\ge 0 \\implies 4\\cos\\theta - 4\\sin\\theta \\ge 0 \\implies \\cos\\theta \\ge \\sin\\theta \\implies \\theta \\in \\left[-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right]$.\n$|z + 1|^2 = (x + 1)^2 + y^2 = (4\\cos\\theta - 4)^2 + 16\\sin^2\\theta = 16(2 - 2\\cos\\theta) = 32 - 32\\cos\\theta$.\nTo maximize, minimize $\\cos\\theta$ on $\\left[-\\frac{3\\pi}{4}, \\frac{\\pi}{4}\\right]$, which occurs at $\\theta = -\\frac{3\\pi}{4}$ where $\\cos\\theta = -\\frac{1}{\\sqrt{2}}$:\n$|z + 1|^2_{\\max} = 32 - 32\\left(-\\frac{1}{\\sqrt{2}}\\right) = 32 + 16\\sqrt{2}$.\nHere $\\alpha = 32$ and $\\beta = 16 \\implies \\alpha + \\beta = 32 + 16 = 48$.",
    topic: "Geometry & Locus of Complex Numbers",
    marks: 4,
    difficulty: "hard",
    year: "JEE Main 2021"
  },
  {
    original_number: 87,
    question_text: "Let a complex number $z, |z| \\ne 1$, satisfy $\\log_{\\frac{1}{\\sqrt{2}}}\\left(\\frac{|z| + 11}{(|z| - 1)^2}\\right) \\le 2$. Then, the largest value of $|z|$ is equal to:",
    options: [
      "$8$",
      "$7$",
      "$6$",
      "$5$"
    ],
    correct_index: 1,
    solution: "Let $x = |z| \\ge 0$ ($x \\ne 1$).\nSince the base of the logarithm is $\\frac{1}{\\sqrt{2}} < 1$, removing the logarithm reverses the inequality:\n$\\frac{x + 11}{(x - 1)^2} \\ge \\left(\\frac{1}{\\sqrt{2}}\\right)^2 = \\frac{1}{2}$.\n$2(x + 11) \\ge (x - 1)^2 \\implies 2x + 22 \\ge x^2 - 2x + 1$\n$x^2 - 4x - 21 \\le 0 \\implies (x - 7)(x + 3) \\le 0 \\implies -3 \\le x \\le 7$.\nSince $x = |z| \\ge 0$ and $x \\ne 1$, the valid range is $x \\in [0, 7] \\setminus \\{1\\}$.\n$\\therefore$ The largest value of $|z|$ is $7$.",
    topic: "Modulus & Inequalities",
    marks: 4,
    difficulty: "medium",
    year: "JEE Main 2021"
  }
];
