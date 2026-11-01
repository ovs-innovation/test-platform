export const QUADRATIC_QUESTIONS = [
  {
    question_number: 1,
    question_text: "If $p$ and $q$ are the roots of the equation $x^2 + px + q = 0$, then:",
    options: [
      "$p = 1, q = -2$",
      "$p = 0, q = 1$",
      "$p = -2, q = 0$",
      "$p = -2, q = 1$"
    ],
    correct_index: 0,
    solution: "Given $p$ and $q$ are roots of $x^2 + px + q = 0$.\n\nSum of roots: $p + q = -p \\implies 2p + q = 0$\nProduct of roots: $pq = q \\implies q(p - 1) = 0$\n\nIf $q = 0$, then $p = 0$.\nIf $p = 1$, then $2(1) + q = 0 \\implies q = -2$.\n\nComparing with the options, we have $p = 1, q = -2$.",
    topic: "Roots and Coefficients",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 2,
    question_text: "Product of real roots of the equation $t^2 x^2 + |x| + 9 = 0$:",
    options: [
      "is always positive",
      "is always negative",
      "does not exist",
      "none of these"
    ],
    correct_index: 2,
    solution: "Given equation is $t^2 x^2 + |x| + 9 = 0$.\n\nFor all real $x$ and $t$, $t^2 x^2 \\ge 0$, $|x| \\ge 0$, and $9 > 0$.\n\nTherefore, $\\text{LHS} = t^2 x^2 + |x| + 9 \\ge 9 > 0$.\n\nThe equation has no real roots, so the product of real roots does not exist.",
    topic: "Nature of Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 3,
    question_text: "If $\\alpha \\ne \\beta$ but $\\alpha^2 = 5\\alpha - 3$ and $\\beta^2 = 5\\beta - 3$, then the equation having $\\alpha/\\beta$ and $\\beta/\\alpha$ as its roots is:",
    options: [
      "$3x^2 - 19x + 3 = 0$",
      "$3x^2 + 19x - 3 = 0$",
      "$3x^2 - 19x - 3 = 0$",
      "$x^2 - 5x + 3 = 0$"
    ],
    correct_index: 0,
    solution: "Since $\\alpha^2 - 5\\alpha + 3 = 0$ and $\\beta^2 - 5\\beta + 3 = 0$ with $\\alpha \\ne \\beta$, $\\alpha$ and $\\beta$ are the roots of $x^2 - 5x + 3 = 0$.\n\nThus, $\\alpha + \\beta = 5$ and $\\alpha\\beta = 3$.\n\nSum of new roots: $S = \\frac{\\alpha}{\\beta} + \\frac{\\beta}{\\alpha} = \\frac{\\alpha^2 + \\beta^2}{\\alpha\\beta} = \\frac{(\\alpha+\\beta)^2 - 2\\alpha\\beta}{\\alpha\\beta} = \\frac{25 - 6}{3} = \\frac{19}{3}$\n\nProduct of new roots: $P = \\frac{\\alpha}{\\beta} \\cdot \\frac{\\beta}{\\alpha} = 1$\n\nRequired equation is $x^2 - Sx + P = 0 \\implies x^2 - \\frac{19}{3}x + 1 = 0 \\implies 3x^2 - 19x + 3 = 0$.",
    topic: "Transformation of Quadratic Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 4,
    question_text: "Difference between the corresponding roots of $x^2 + ax + b = 0$ and $x^2 + bx + a = 0$ is the same and $a \\ne b$, then:",
    options: [
      "$a + b + 4 = 0$",
      "$a + b - 4 = 0$",
      "$a - b - 4 = 0$",
      "$a - b + 4 = 0$"
    ],
    correct_index: 0,
    solution: "The difference between the roots of $A x^2 + B x + C = 0$ is given by $|\\alpha - \\beta| = \\frac{\\sqrt{D}}{|A|}$.\n\nFor $x^2 + ax + b = 0$: $D_1 = a^2 - 4b$\nFor $x^2 + bx + a = 0$: $D_2 = b^2 - 4a$\n\nGiven $|\\alpha_1 - \\beta_1| = |\\alpha_2 - \\beta_2| \\implies \\sqrt{a^2 - 4b} = \\sqrt{b^2 - 4a}$\n$\\implies a^2 - 4b = b^2 - 4a \\implies a^2 - b^2 + 4(a - b) = 0$\n$\\implies (a - b)(a + b + 4) = 0$\n\nSince $a \\ne b$, we obtain $a + b + 4 = 0$.",
    topic: "Roots and Coefficients",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 5,
    question_text: "If $2a + 3b + 6c = 0$ ($a, b, c \\in \\mathbb{R}$), then the quadratic equation $ax^2 + bx + c = 0$ has:",
    options: [
      "at least one root in $[0, 1]$",
      "at least one root in $[2, 3]$",
      "at least one root in $[4, 5]$",
      "none of these"
    ],
    correct_index: 0,
    solution: "Consider the function $f(x) = \\frac{a x^3}{3} + \\frac{b x^2}{2} + cx$.\n\nClearly, $f(0) = 0$, and\n$f(1) = \\frac{a}{3} + \\frac{b}{2} + c = \\frac{2a + 3b + 6c}{6} = 0$.\n\nSince $f(x)$ is continuous on $[0, 1]$ and differentiable on $(0, 1)$ with $f(0) = f(1) = 0$, by Rolle's Theorem there exists at least one $c' \\in (0, 1)$ such that $f'(c') = 0$.\n\nSince $f'(x) = ax^2 + bx + c$, the quadratic equation $ax^2 + bx + c = 0$ has at least one root in $(0, 1) \\subset [0, 1]$.",
    topic: "Location of Roots and Rolle's Theorem",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2002",
    question_type: "single_choice"
  },
  {
    question_number: 6,
    question_text: "The number of real solutions of the equation $x^2 - 3|x| + 2 = 0$ is:",
    options: [
      "$3$",
      "$2$",
      "$4$",
      "$1$"
    ],
    correct_index: 2,
    solution: "Given equation is $x^2 - 3|x| + 2 = 0$.\nSince $x^2 = |x|^2$:\n$|x|^2 - 3|x| + 2 = 0$\n$\\implies (|x| - 1)(|x| - 2) = 0$\n$\\implies |x| = 1 \\text{ or } |x| = 2$\n\nHence, $x = \\pm 1, \\pm 2$.\nThe equation has 4 distinct real solutions.",
    topic: "Modulus Equations in Quadratics",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 7,
    question_text: "The value of 'a' for which one root of the quadratic equation $(a^2 - 5a + 3)x^2 + (3a - 1)x + 2 = 0$ is twice as large as the other is:",
    options: [
      "$-1/3$",
      "$2/3$",
      "$-2/3$",
      "$1/3$"
    ],
    correct_index: 1,
    solution: "Let the roots be $\\alpha$ and $2\\alpha$.\n\nSum of roots: $\\alpha + 2\\alpha = 3\\alpha = -\\frac{3a - 1}{a^2 - 5a + 3} \\implies \\alpha = -\\frac{3a - 1}{3(a^2 - 5a + 3)}$\n\nProduct of roots: $\\alpha(2\\alpha) = 2\\alpha^2 = \\frac{2}{a^2 - 5a + 3} \\implies \\alpha^2 = \\frac{1}{a^2 - 5a + 3}$\n\nSubstituting $\\alpha$ into the second relation:\n$\\frac{(3a - 1)^2}{9(a^2 - 5a + 3)^2} = \\frac{1}{a^2 - 5a + 3}$\n$\\implies (3a - 1)^2 = 9(a^2 - 5a + 3)$\n$\\implies 9a^2 - 6a + 1 = 9a^2 - 45a + 27$\n$\\implies 39a = 26 \\implies a = \\frac{26}{39} = \\frac{2}{3}$.",
    topic: "Roots and Coefficients",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 8,
    question_text: "If the sum of the roots of the quadratic equation $ax^2 + bx + c = 0$ is equal to the sum of the squares of their reciprocals, then $a/c, b/a$ and $c/b$ are in:",
    options: [
      "Arithmetico-Geometric Progression",
      "Arithmetic Progression",
      "Geometric Progression",
      "Harmonic Progression"
    ],
    correct_index: 3,
    solution: "Let the roots be $\\alpha$ and $\\beta$. Then $\\alpha + \\beta = -\\frac{b}{a}$ and $\\alpha\\beta = \\frac{c}{a}$.\n\nGiven $\\alpha + \\beta = \\frac{1}{\\alpha^2} + \\frac{1}{\\beta^2} = \\frac{\\alpha^2 + \\beta^2}{(\\alpha\\beta)^2} = \\frac{(\\alpha+\\beta)^2 - 2\\alpha\\beta}{(\\alpha\\beta)^2}$\n\n$-\\frac{b}{a} = \\frac{b^2/a^2 - 2c/a}{c^2/a^2} = \\frac{b^2 - 2ac}{c^2}$\n$\\implies -bc^2 = ab^2 - 2a^2 c \\implies 2a^2 c = ab^2 + bc^2$\n\nDividing throughout by $abc$:\n$\\frac{2a}{b} = \\frac{b}{c} + \\frac{c}{a}$\n\nThis shows that $\\frac{c}{a}, \\frac{a}{b}, \\frac{b}{c}$ are in A.P.\nTherefore, their reciprocals $\\frac{a}{c}, \\frac{b}{a}, \\frac{c}{b}$ are in Harmonic Progression (H.P.).",
    topic: "Roots and Progressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2003",
    question_type: "single_choice"
  },
  {
    question_number: 9,
    question_text: "If one root of the equation $x^2 + px + 12 = 0$ is 4, while the equation $x^2 + px + q = 0$ has equal roots, then the value of 'q' is:",
    options: [
      "$49/4$",
      "$4$",
      "$3$",
      "$12$"
    ],
    correct_index: 0,
    solution: "Since 4 is a root of $x^2 + px + 12 = 0$:\n$4^2 + 4p + 12 = 0 \\implies 28 + 4p = 0 \\implies p = -7$\n\nThe second equation is $x^2 - 7x + q = 0$.\nFor it to have equal roots, discriminant $D = 0$:\n$(-7)^2 - 4(1)(q) = 0 \\implies 49 - 4q = 0 \\implies q = \\frac{49}{4}$.",
    topic: "Condition for Equal Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 10,
    question_text: "If $(1 - p)$ is a root of quadratic equation $x^2 + px + (1 - p) = 0$, then its roots are:",
    options: [
      "$0, 1$",
      "$-1, 2$",
      "$0, -1$",
      "$-1, 1$"
    ],
    correct_index: 2,
    solution: "Since $(1 - p)$ is a root of $x^2 + px + (1 - p) = 0$:\n$(1 - p)^2 + p(1 - p) + (1 - p) = 0$\n$\\implies (1 - p)[(1 - p) + p + 1] = 0$\n$\\implies 2(1 - p) = 0 \\implies p = 1$\n\nSubstituting $p = 1$ back into the quadratic equation:\n$x^2 + x = 0 \\implies x(x + 1) = 0 \\implies x = 0, -1$.\n\nHence, the roots are $0, -1$.",
    topic: "Roots and Coefficients",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 11,
    question_text: "Let two numbers have arithmetic mean 9 and geometric mean 4. Then these numbers are the roots of the quadratic equation:",
    options: [
      "$x^2 + 18x + 16 = 0$",
      "$x^2 - 18x - 16 = 0$",
      "$x^2 + 18x - 16 = 0$",
      "$x^2 - 18x + 16 = 0$"
    ],
    correct_index: 3,
    solution: "Let the two numbers be $a$ and $b$.\n\nGiven $\\text{A.M.} = \\frac{a+b}{2} = 9 \\implies a + b = 18$\n$\\text{G.M.} = \\sqrt{ab} = 4 \\implies ab = 16$\n\nThe quadratic equation whose roots are $a$ and $b$ is:\n$x^2 - (a+b)x + ab = 0 \\implies x^2 - 18x + 16 = 0$.",
    topic: "Forming Quadratic Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2004",
    question_type: "single_choice"
  },
  {
    question_number: 12,
    question_text: "If roots of the equation $x^2 - bx + c = 0$ be two consecutive integers, then $b^2 - 4c$ equals:",
    options: [
      "$-2$",
      "$3$",
      "$2$",
      "$1$"
    ],
    correct_index: 3,
    solution: "Let the roots be $\\alpha$ and $\\alpha + 1$.\n\nThe difference between the roots is $|(\\alpha + 1) - \\alpha| = 1$.\n\nWe know that $|\\alpha - \\beta| = \\frac{\\sqrt{b^2 - 4c}}{1} = 1$.\n\nSquaring both sides:\n$b^2 - 4c = 1$.",
    topic: "Roots Difference and Discriminant",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 13,
    question_text: "The value of $a$ for which the sum of the squares of the roots of the equation $x^2 - (a - 2)x - a - 1 = 0$ assumes the least value is:",
    options: [
      "$1$",
      "$0$",
      "$3$",
      "$2$"
    ],
    correct_index: 0,
    solution: "Let the roots be $\\alpha$ and $\\beta$.\n$\\alpha + \\beta = a - 2$, $\\alpha\\beta = -(a + 1)$\n\nSum of squares of roots:\n$S = \\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta$\n$= (a - 2)^2 + 2(a + 1)$\n$= a^2 - 4a + 4 + 2a + 2$\n$= a^2 - 2a + 6 = (a - 1)^2 + 5$\n\n$S$ assumes its least value when $a - 1 = 0 \\implies a = 1$.",
    topic: "Maxima and Minima in Quadratic Expressions",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 14,
    question_text: "If both the roots of the quadratic equation $x^2 - 2kx + k^2 + k - 5 = 0$ are less than 5, then $k$ lies in the interval:",
    options: [
      "$(5, 6)$",
      "$(6, \\infty)$",
      "$(-\\infty, 4)$",
      "$[4, 5]$"
    ],
    correct_index: 2,
    solution: "For both roots of $f(x) = x^2 - 2kx + k^2 + k - 5 = 0$ to be less than 5:\n\n1. Discriminant $D \\ge 0$:\n$4k^2 - 4(k^2 + k - 5) \\ge 0 \\implies -4k + 20 \\ge 0 \\implies k \\le 5$\n\n2. Abscissa of vertex $< 5$:\n$-\\frac{-2k}{2} < 5 \\implies k < 5$\n\n3. $f(5) > 0$:\n$25 - 10k + k^2 + k - 5 > 0 \\implies k^2 - 9k + 20 > 0 \\implies (k - 4)(k - 5) > 0$\n$\\implies k < 4$ or $k > 5$\n\nTaking the intersection of all conditions:\n$k < 4$, i.e., $k \\in (-\\infty, 4)$.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 15,
    question_text: "A lizard, at an initial distance of 21 cm behind an insect, moves from rest with an acceleration of $2\\text{ cm/s}^2$ and pursues the insect which is crawling uniformly along a straight line at a speed of $20\\text{ cm/s}$. Then the lizard will catch the insect after:",
    options: [
      "$20\\text{ s}$",
      "$1\\text{ s}$",
      "$21\\text{ s}$",
      "$24\\text{ s}$"
    ],
    correct_index: 2,
    solution: "Let the lizard catch the insect after time $t$ seconds.\n\nDistance traveled by lizard: $s_L = ut + \\frac{1}{2}at^2 = 0 + \\frac{1}{2}(2)t^2 = t^2$\nDistance traveled by insect: $s_I = 20t$\n\nSince the lizard started 21 cm behind:\n$s_L = s_I + 21 \\implies t^2 = 20t + 21$\n$\\implies t^2 - 20t - 21 = 0 \\implies (t - 21)(t + 1) = 0$\n\nSince time $t > 0$, $t = 21\\text{ s}$.",
    topic: "Applications of Quadratic Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2005",
    question_type: "single_choice"
  },
  {
    question_number: 16,
    question_text: "If the roots of the quadratic equation $x^2 + px + q = 0$ are $\\tan 30^\\circ$ and $\\tan 15^\\circ$, respectively, then the value of $2 + q - p$ is:",
    options: [
      "$2$",
      "$3$",
      "$0$",
      "$1$"
    ],
    correct_index: 1,
    solution: "Sum of roots: $\\tan 30^\\circ + \\tan 15^\\circ = -p$\nProduct of roots: $\\tan 30^\\circ \\tan 15^\\circ = q$\n\nUsing $\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B}$:\n$\\tan(45^\\circ) = \\frac{\\tan 30^\\circ + \\tan 15^\\circ}{1 - \\tan 30^\\circ \\tan 15^\\circ} = 1$\n$\\implies \\frac{-p}{1 - q} = 1 \\implies -p = 1 - q \\implies q - p = 1$\n\nTherefore, $2 + q - p = 2 + 1 = 3$.",
    topic: "Roots and Trigonometry",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2006",
    question_type: "single_choice"
  },
  {
    question_number: 17,
    question_text: "All the values of $m$ for which both roots of the equation $x^2 - 2mx + m^2 - 1 = 0$ are greater than $-2$ but less than $4$, lie in the interval:",
    options: [
      "$-2 < m < 0$",
      "$m > 3$",
      "$-1 < m < 3$",
      "$1 < m < 4$"
    ],
    correct_index: 2,
    solution: "The equation can be written as:\n$(x - m)^2 - 1 = 0 \\implies (x - m)^2 = 1 \\implies x - m = \\pm 1 \\implies x = m - 1, m + 1$\n\nBoth roots lie strictly between $-2$ and $4$:\n$-2 < m - 1$ and $m + 1 < 4$\n$\\implies m > -1$ and $m < 3$\n\nHence, $-1 < m < 3$.",
    topic: "Location of Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE 2006",
    question_type: "single_choice"
  },
  {
    question_number: 18,
    question_text: "If the difference between the roots of the equation $x^2 + ax + 1 = 0$ is less than $\\sqrt{5}$, then the set of possible values of $a$ is:",
    options: [
      "$(-3, 3)$",
      "$(-3, \\infty)$",
      "$(3, \\infty)$",
      "$(-\\infty, -3)$"
    ],
    correct_index: 0,
    solution: "Let the roots be $\\alpha$ and $\\beta$.\n$|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 4\\alpha\\beta} = \\sqrt{a^2 - 4}$\n\nGiven $|\\alpha - \\beta| < \\sqrt{5}$:\n$\\sqrt{a^2 - 4} < \\sqrt{5} \\implies a^2 - 4 < 5 \\implies a^2 < 9 \\implies -3 < a < 3$\n\nThus, the set of possible values of $a$ is $(-3, 3)$.",
    topic: "Roots Difference and Inequalities",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2007",
    question_type: "single_choice"
  },
  {
    question_number: 19,
    question_text: "The quadratic equations $x^2 - 6x + a = 0$ and $x^2 - cx + 6 = 0$ have one root in common. The other roots of the first and second equations are integers in the ratio $4 : 3$. Then the common root is:",
    options: [
      "$1$",
      "$4$",
      "$3$",
      "$2$"
    ],
    correct_index: 3,
    solution: "Let the common root be $\\alpha$. The other roots are $4k$ and $3k$ where $k$ is an integer.\n\nFrom $x^2 - 6x + a = 0$:\n$\\alpha + 4k = 6 \\implies \\alpha = 6 - 4k$\n\nFrom $x^2 - cx + 6 = 0$:\n$\\alpha \\cdot 3k = 6 \\implies \\alpha k = 2$\n\nSubstituting $\\alpha = 6 - 4k$:\n$(6 - 4k)k = 2 \\implies 6k - 4k^2 = 2 \\implies 2k^2 - 3k + 1 = 0$\n$\\implies (2k - 1)(k - 1) = 0$\n\nSince $4k$ and $3k$ are integers, $k = 1$.\nTherefore, the common root is $\\alpha = 6 - 4(1) = 2$.",
    topic: "Common Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2008",
    question_type: "single_choice"
  },
  {
    question_number: 20,
    question_text: "If the roots of the equation $bx^2 + cx + a = 0$ be imaginary, then for all real values of $x$, the expression $3b^2 x^2 + 6bcx + 2c^2$ is:",
    options: [
      "greater than $4ab$",
      "less than $4ab$",
      "greater than $-4ab$",
      "less than $-4ab$"
    ],
    correct_index: 2,
    solution: "Since roots of $bx^2 + cx + a = 0$ are imaginary:\n$D = c^2 - 4ab < 0 \\implies c^2 < 4ab \\implies -c^2 > -4ab$\n\nNow, rewrite the given expression:\n$E(x) = 3b^2 x^2 + 6bcx + 2c^2 = 3(b^2 x^2 + 2bcx) + 2c^2 = 3(bx + c)^2 - 3c^2 + 2c^2 = 3(bx + c)^2 - c^2$\n\nSince $3(bx + c)^2 \\ge 0$ for all real $x$:\n$E(x) \\ge -c^2$\n\nSince $-c^2 > -4ab$, we have $E(x) > -4ab$.\nHence, the expression is always greater than $-4ab$.",
    topic: "Sign of Quadratic Expression",
    difficulty: "hard",
    marks: 4,
    year: "JEE 2009",
    question_type: "single_choice"
  },
  {
    question_number: 21,
    question_text: "If $\\alpha$ and $\\beta$ are the roots of the equation $x^2 - x + 1 = 0$, then $\\alpha^{2009} + \\beta^{2009} =$",
    options: [
      "$-1$",
      "$1$",
      "$20$",
      "$-2$"
    ],
    correct_index: 1,
    solution: "Roots of $x^2 - x + 1 = 0$ are $-\\omega$ and $-\\omega^2$, where $\\omega$ is a complex cube root of unity ($1 + \\omega + \\omega^2 = 0, \\omega^3 = 1$).\n\n$\\alpha^{2009} + \\beta^{2009} = (-\\omega)^{2009} + (-\\omega^2)^{2009} = -(\\omega^{2009} + \\omega^{4018})$\n\nSince $2009 = 3(669) + 2$, $\\omega^{2009} = \\omega^2$.\nSince $4018 = 3(1339) + 1$, $\\omega^{4018} = \\omega$.\n\n$-(\\omega^2 + \\omega) = -(-1) = 1$.",
    topic: "Roots and Complex Cube Roots of Unity",
    difficulty: "medium",
    marks: 4,
    year: "JEE 2010",
    question_type: "single_choice"
  },
  {
    question_number: 22,
    question_text: "The value of $k$ for which the equation $(k - 2)x^2 + 8x + k + 4 = 0$ has both roots real, distinct and negative is:",
    options: [
      "$6$",
      "$3$",
      "$4$",
      "$1$"
    ],
    correct_index: 1,
    solution: "1. Real and distinct roots: $D > 0$\n$64 - 4(k - 2)(k + 4) > 0 \\implies 16 - (k^2 + 2k - 8) > 0 \\implies k^2 + 2k - 24 < 0$\n$\\implies (k + 6)(k - 4) < 0 \\implies -6 < k < 4$\n\n2. Sum of roots $< 0$:\n$-\\frac{8}{k - 2} < 0 \\implies k - 2 > 0 \\implies k > 2$\n\n3. Product of roots $> 0$:\n$\\frac{k + 4}{k - 2} > 0 \\implies k < -4$ or $k > 2$\n\nIntersection of all three conditions:\n$2 < k < 4$\n\nFrom the given options, $k = 3$.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 23,
    question_text: "If the sum of the square of the roots of the equation $x^2 - (\\sin\\alpha - 2)x - (1 + \\sin\\alpha) = 0$ is least, then $\\alpha$ is equal to:",
    options: [
      "$\\pi/6$",
      "$\\pi/2$",
      "$\\pi/3$",
      "$\\pi/4$"
    ],
    correct_index: 1,
    solution: "Let the roots be $x_1$ and $x_2$.\n$x_1 + x_2 = \\sin\\alpha - 2$, $x_1 x_2 = -(1 + \\sin\\alpha)$\n\nSum of squares of roots:\n$S = x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$\n$= (\\sin\\alpha - 2)^2 + 2(1 + \\sin\\alpha)$\n$= \\sin^2\\alpha - 4\\sin\\alpha + 4 + 2 + 2\\sin\\alpha$\n$= \\sin^2\\alpha - 2\\sin\\alpha + 6$\n$= (\\sin\\alpha - 1)^2 + 5$\n\n$S$ is minimum when $\\sin\\alpha = 1 \\implies \\alpha = \\frac{\\pi}{2}$.",
    topic: "Minima of Roots Functions",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 24,
    question_text: "If $a, b, c, d$ and $p$ are distinct real numbers such that $(a^2 + b^2 + c^2)p^2 - 2p(ab + bc + cd) + (b^2 + c^2 + d^2) \\le 0$, then:",
    options: [
      "$a, b, c, d$ are in A.P.",
      "$ab = cd$",
      "$ac = bd$",
      "$a, b, c, d$ are in G.P."
    ],
    correct_index: 3,
    solution: "Regrouping the given inequality:\n$(a^2 p^2 - 2abp + b^2) + (b^2 p^2 - 2bcp + c^2) + (c^2 p^2 - 2cdp + d^2) \\le 0$\n$\\implies (ap - b)^2 + (bp - c)^2 + (cp - d)^2 \\le 0$\n\nSince the sum of squares of real numbers cannot be negative, each term must be zero:\n$ap - b = 0 \\implies p = \\frac{b}{a}$\n$bp - c = 0 \\implies p = \\frac{c}{b}$\n$cp - d = 0 \\implies p = \\frac{d}{c}$\n\nTherefore, $\\frac{b}{a} = \\frac{c}{b} = \\frac{d}{c} = p$, which means $a, b, c, d$ are in G.P.",
    topic: "Quadratic Forms and Progressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 25,
    question_text: "Let $p, q, r \\in \\mathbb{R}$ and $r > p > 0$. If the quadratic equation $px^2 + qx + r = 0$ has two complex roots $\\alpha$ and $\\beta$, then $|\\alpha| + |\\beta|$ is:",
    options: [
      "equal to 1",
      "less than 2 but not equal to 1",
      "greater than 2",
      "equal to 2"
    ],
    correct_index: 2,
    solution: "Since the coefficients are real and the roots are non-real complex numbers, the roots are conjugate pairs: $\\beta = \\bar{\\alpha}$.\n\nTherefore, $|\\alpha| = |\\beta|$.\n$|\\alpha|^2 = \\alpha\\bar{\\alpha} = \\alpha\\beta = \\frac{r}{p}$\n$\\implies |\\alpha| = \\sqrt{\\frac{r}{p}}$\n\nGiven $r > p > 0$, we have $\\frac{r}{p} > 1 \\implies |\\alpha| > 1$.\n\nHence, $|\\alpha| + |\\beta| = 2|\\alpha| > 2$.",
    topic: "Complex Roots of Real Quadratics",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 26,
    question_text: "Consider a quadratic equation $ax^2 + bx + c = 0$, where $2a + 3b + 6c = 0$ and let $g(x) = a(x^3/3) + b(x^2/2) + cx$.\nStatement 1: The quadratic equation has at least one root in the interval $(0, 1)$.\nStatement 2: Rolle's theorem is applicable to function $g(x)$ on the interval $[0, 1]$.",
    options: [
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1."
    ],
    correct_index: 3,
    solution: "Given $g(x) = \\frac{ax^3}{3} + \\frac{bx^2}{2} + cx$.\n1. $g(0) = 0$\n2. $g(1) = \\frac{a}{3} + \\frac{b}{2} + c = \\frac{2a+3b+6c}{6} = 0$\n\n$g(x)$ is continuous on $[0, 1]$ and differentiable on $(0, 1)$.\nBy Rolle's theorem, there exists $c' \\in (0, 1)$ such that $g'(c') = 0$.\nSince $g'(x) = ax^2 + bx + c$, the quadratic equation has at least one root in $(0, 1)$.\n\nBoth statements are true, and Statement 2 is the correct explanation for Statement 1.",
    topic: "Rolle's Theorem and Quadratics",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 27,
    question_text: "If $a, b, c \\in \\mathbb{R}$ and 1 is a root of equation $ax^2 + bx + c = 0$, then the curve $y = 4ax^2 + 3bx + 2c$ ($a \\ne 0$) intersects the x-axis at:",
    options: [
      "two distinct points with rational coordinates",
      "no point",
      "exactly two distinct points",
      "exactly one point"
    ],
    correct_index: 2,
    solution: "Since 1 is a root of $ax^2 + bx + c = 0$, we have $a + b + c = 0 \\implies c = -(a + b)$.\n\nFor the quadratic $y = 4ax^2 + 3bx + 2c$, the discriminant is:\n$D = (3b)^2 - 4(4a)(2c) = 9b^2 - 32ac = 9b^2 - 32a[-(a+b)]$\n$= 9b^2 + 32ab + 32a^2 = 9\\left(b + \\frac{16a}{9}\\right)^2 + 32a^2 - \\frac{256a^2}{9}$\n$= 9\\left(b + \\frac{16a}{9}\\right)^2 + \\frac{32a^2}{9} > 0$ for all $a \\ne 0$.\n\nSince $D > 0$, the curve intersects the x-axis at exactly two distinct points.",
    topic: "Discriminant and Graphs of Quadratics",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2012",
    question_type: "single_choice"
  },
  {
    question_number: 28,
    question_text: "If the equations $x^2 + 2x + 3 = 0$ and $ax^2 + bx + c = 0$ ($a, b, c \\in \\mathbb{R}$) have a common root, then $a : b : c$ is:",
    options: [
      "$1 : 3 : 2$",
      "$3 : 1 : 2$",
      "$1 : 2 : 3$",
      "$3 : 2 : 1$"
    ],
    correct_index: 2,
    solution: "For the equation $x^2 + 2x + 3 = 0$, the discriminant is:\n$D = 2^2 - 4(1)(3) = 4 - 12 = -8 < 0$.\n\nThus, its roots are non-real complex conjugate roots. Since $a, b, c \\in \\mathbb{R}$, if one complex root is common, both roots must be common.\n\nTherefore, the two equations are proportional:\n$\\frac{a}{1} = \\frac{b}{2} = \\frac{c}{3} \\implies a : b : c = 1 : 2 : 3$.",
    topic: "Common Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 29,
    question_text: "The values of 'a' for which one root of the equation $x^2 - (a + 1)x + a^2 + a - 8 = 0$ exceeds 2 and the other is lesser than 2, are given by:",
    options: [
      "$3 < a < 10$",
      "$a \\ge 10$",
      "$-2 < a < 3$",
      "$a \\le -2$"
    ],
    correct_index: 2,
    solution: "For 2 to lie between the roots of $f(x) = x^2 - (a+1)x + a^2 + a - 8 = 0$, the condition is $af(2) < 0$.\nSince the leading coefficient is $1 > 0$, we have $f(2) < 0$:\n\n$f(2) = 2^2 - (a + 1)(2) + a^2 + a - 8 < 0$\n$\\implies 4 - 2a - 2 + a^2 + a - 8 < 0$\n$\\implies a^2 - a - 6 < 0$\n$\\implies (a - 3)(a + 2) < 0$\n$\\implies -2 < a < 3$.",
    topic: "Location of Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 30,
    question_text: "If $\\alpha$ and $\\beta$ are roots of the equation $x^2 + px + (3p/4) = 0$ such that $|\\alpha - \\beta| = \\sqrt{10}$, then $p$ belongs to the set:",
    options: [
      "$\\{2, -5\\}$",
      "$\\{-3, 2\\}$",
      "$\\{-2, 5\\}$",
      "$\\{3, -5\\}$"
    ],
    correct_index: 2,
    solution: "$\\alpha + \\beta = -p$ and $\\alpha\\beta = \\frac{3p}{4}$\n\n$|\\alpha - \\beta|^2 = (\\alpha+\\beta)^2 - 4\\alpha\\beta = 10$\n$\\implies p^2 - 4\\left(\\frac{3p}{4}\\right) = 10$\n$\\implies p^2 - 3p - 10 = 0$\n$\\implies (p - 5)(p + 2) = 0 \\implies p = 5, -2$\n\nHence, $p \\in \\{-2, 5\\}$.",
    topic: "Roots and Coefficients",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 31,
    question_text: "If $p$ and $q$ are non-zero real numbers and $\\alpha^3 + \\beta^3 = -p$, $\\alpha\\beta = q$, then a quadratic equation whose roots are $\\alpha^2/\\beta$ and $\\beta^2/\\alpha$ is:",
    options: [
      "$px^2 - qx + p^2 = 0$",
      "$qx^2 + px + q^2 = 0$",
      "$px^2 + qx + p^2 = 0$",
      "$qx^2 - px + q^2 = 0$"
    ],
    correct_index: 1,
    solution: "Sum of new roots:\n$S = \\frac{\\alpha^2}{\\beta} + \\frac{\\beta^2}{\\alpha} = \\frac{\\alpha^3 + \\beta^3}{\\alpha\\beta} = \\frac{-p}{q}$\n\nProduct of new roots:\n$P = \\left(\\frac{\\alpha^2}{\\beta}\\right)\\left(\\frac{\\beta^2}{\\alpha}\\right) = \\alpha\\beta = q$\n\nThe quadratic equation is:\n$x^2 - Sx + P = 0 \\implies x^2 - \\left(-\\frac{p}{q}\\right)x + q = 0$\n$\\implies x^2 + \\frac{p}{q}x + q = 0 \\implies qx^2 + px + q^2 = 0$.",
    topic: "Forming Quadratic Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2013",
    question_type: "single_choice"
  },
  {
    question_number: 32,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of equation $px^2 + qx + r = 0, p \\ne 0$. If $p, q, r$ are in A.P. and $(1/\\alpha) + (1/\\beta) = 4$, then the value of $|\\alpha - \\beta|$ is:",
    options: [
      "$\\sqrt{34} / 9$",
      "$2\\sqrt{13} / 9$",
      "$\\sqrt{61} / 9$",
      "$2\\sqrt{17} / 9$"
    ],
    correct_index: 1,
    solution: "Since $p, q, r$ are in A.P., $2q = p + r$.\n\n$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha+\\beta}{\\alpha\\beta} = \\frac{-q/p}{r/p} = -\\frac{q}{r} = 4 \\implies q = -4r$\n\nSubstituting into $2q = p + r$:\n$2(-4r) = p + r \\implies -8r = p + r \\implies p = -9r$\n\nNow, $\\alpha + \\beta = -\\frac{q}{p} = -\\frac{-4r}{-9r} = -\\frac{4}{9}$\n$\\alpha\\beta = \\frac{r}{p} = \\frac{r}{-9r} = -\\frac{1}{9}$\n\n$|\\alpha - \\beta| = \\sqrt{(\\alpha+\\beta)^2 - 4\\alpha\\beta} = \\sqrt{\\frac{16}{81} - 4\\left(-\\frac{1}{9}\\right)} = \\sqrt{\\frac{16 + 36}{81}} = \\frac{\\sqrt{52}}{9} = \\frac{2\\sqrt{13}}{9}$.",
    topic: "Roots and Arithmetic Progressions",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 33,
    question_text: "If $a \\in \\mathbb{R}$ and the equation $-3(x - [x])^2 + 2(x - [x]) + a^2 = 0$ (where $[x]$ denotes the greatest integer $\\le x$) has no integral solution, then all possible values of $a$ lie in the interval:",
    options: [
      "$(-2, -1)$",
      "$(-\\infty, -2) \\cup (2, \\infty)$",
      "$(-1, 0) \\cup (0, 1)$",
      "$(1, 2)$"
    ],
    correct_index: 2,
    solution: "Let $\\{x\\} = x - [x] \\in [0, 1)$. The equation becomes:\n$3\\{x\\}^2 - 2\\{x\\} - a^2 = 0$\n\nIf $x$ is an integer, $\\{x\\} = 0$, giving $a^2 = 0 \\implies a = 0$.\nSince there is no integral solution, $a \\ne 0$ and $\\{x\\} \\in (0, 1)$.\n\nSolving for $\\{x\\}$:\n$\\{x\\} = \\frac{2 \\pm \\sqrt{4 + 12a^2}}{6} = \\frac{1 \\pm \\sqrt{1 + 3a^2}}{3}$\n\nSince $\\{x\\} > 0$, we take the positive root:\n$0 < \\frac{1 + \\sqrt{1 + 3a^2}}{3} < 1 \\implies \\sqrt{1 + 3a^2} < 2$\n$\\implies 1 + 3a^2 < 4 \\implies 3a^2 < 3 \\implies a^2 < 1$\n\nSince $a \\ne 0$, $a \\in (-1, 0) \\cup (0, 1)$.",
    topic: "Greatest Integer and Quadratic Equations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 34,
    question_text: "If $1/\\sqrt{\\alpha}, 1/\\sqrt{\\beta}$ are the roots of the equation $ax^2 + bx + 1 = 0$ ($a \\ne 0, a, b \\in \\mathbb{R}$), then the equation $x(x + b^3) + (a^3 - 3abx) = 0$ has roots:",
    options: [
      "$\\sqrt{\\alpha\\beta}$ and $\\alpha\\beta$",
      "$\\alpha^{-3/2}$ and $\\beta^{-3/2}$",
      "$\\alpha\\beta^{1/2}$ and $\\alpha^{1/2}\\beta$",
      "$\\alpha^{3/2}$ and $\\beta^{3/2}$"
    ],
    correct_index: 3,
    solution: "Given $ax^2 + bx + 1 = 0$ has roots $\\frac{1}{\\sqrt{\\alpha}}$ and $\\frac{1}{\\sqrt{\\beta}}$:\n$\\frac{1}{\\sqrt{\\alpha}} + \\frac{1}{\\sqrt{\\beta}} = -\\frac{b}{a}$ and $\\frac{1}{\\sqrt{\\alpha\\beta}} = \\frac{1}{a} \\implies a = \\sqrt{\\alpha\\beta}$\n\n$-b = a\\left(\\frac{\\sqrt{\\alpha} + \\sqrt{\\beta}}{\\sqrt{\\alpha\\beta}}\\right) = \\sqrt{\\alpha} + \\sqrt{\\beta}$\n\nThe second equation is $x^2 + (b^3 - 3ab)x + a^3 = 0$.\n$b^3 - 3ab = -(\\sqrt{\\alpha} + \\sqrt{\\beta})^3 + 3\\sqrt{\\alpha\\beta}(\\sqrt{\\alpha} + \\sqrt{\\beta}) = -(\\alpha^{3/2} + \\beta^{3/2})$\n$a^3 = (\\sqrt{\\alpha\\beta})^3 = \\alpha^{3/2}\\beta^{3/2}$\n\nHence, the roots of the equation are $\\alpha^{3/2}$ and $\\beta^{3/2}$.",
    topic: "Roots and Identity Transformations",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 35,
    question_text: "If equations $ax^2 + bx + c = 0$ ($a, b, c \\in \\mathbb{R}, a \\ne 0$) and $2x^2 + 3x + 4 = 0$ have a common root, then $a : b : c$ equals:",
    options: [
      "$2 : 3 : 4$",
      "$4 : 3 : 2$",
      "$1 : 2 : 3$",
      "$3 : 2 : 1$"
    ],
    correct_index: 0,
    solution: "For $2x^2 + 3x + 4 = 0$, $D = 3^2 - 4(2)(4) = 9 - 32 = -23 < 0$.\n\nSince the roots are non-real complex conjugates and $a, b, c \\in \\mathbb{R}$, both roots must be common to both equations.\n\nTherefore, $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{4} \\implies a : b : c = 2 : 3 : 4$.",
    topic: "Common Roots",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 36,
    question_text: "If $\\alpha$ and $\\beta$ are roots of the equation $x^2 - 4\\sqrt{2}kx + 2e^{4\\ln k} - 1 = 0$ for some $k$, and $\\alpha^2 + \\beta^2 = 66$, then $\\alpha^3 + \\beta^3$ is equal to:",
    options: [
      "$248\\sqrt{2}$",
      "$280\\sqrt{2}$",
      "$-32\\sqrt{2}$",
      "$-280\\sqrt{2}$"
    ],
    correct_index: 1,
    solution: "Note that $2e^{4\\ln k} - 1 = 2k^4 - 1$.\n$\\alpha + \\beta = 4\\sqrt{2}k$, $\\alpha\\beta = 2k^4 - 1$\n\n$\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta = 32k^2 - 2(2k^4 - 1) = 66$\n$\\implies 32k^2 - 4k^4 + 2 = 66 \\implies 4k^4 - 32k^2 + 64 = 0$\n$\\implies k^4 - 8k^2 + 16 = 0 \\implies (k^2 - 4)^2 = 0 \\implies k^2 = 4 \\implies k = 2$ (since $k > 0$).\n\nThus, $\\alpha + \\beta = 8\\sqrt{2}$ and $\\alpha\\beta = 2(16) - 1 = 31$.\n$\\alpha^3 + \\beta^3 = (\\alpha+\\beta)(\\alpha^2 + \\beta^2 - \\alpha\\beta) = 8\\sqrt{2}(66 - 31) = 8\\sqrt{2}(35) = 280\\sqrt{2}$.",
    topic: "Logarithms and Quadratic Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 37,
    question_text: "The sum of the roots of the equation $x^2 + |2x - 3| - 4 = 0$ is:",
    options: [
      "$2$",
      "$-2$",
      "$\\sqrt{2}$",
      "$-\\sqrt{2}$"
    ],
    correct_index: 2,
    solution: "Case 1: $x \\ge \\frac{3}{2}$\n$x^2 + 2x - 3 - 4 = 0 \\implies x^2 + 2x - 7 = 0$\n$x = \\frac{-2 \\pm \\sqrt{4 + 28}}{2} = -1 \\pm 2\\sqrt{2}$\nSince $x \\ge 1.5$, $x = -1 + 2\\sqrt{2} \\approx 1.828$ is valid.\n\nCase 2: $x < \\frac{3}{2}$\n$x^2 - (2x - 3) - 4 = 0 \\implies x^2 - 2x - 1 = 0$\n$x = \\frac{2 \\pm \\sqrt{4 + 4}}{2} = 1 \\pm \\sqrt{2}$\nSince $x < 1.5$, $x = 1 - \\sqrt{2} \\approx -0.414$ is valid.\n\nSum of valid roots $= (-1 + 2\\sqrt{2}) + (1 - \\sqrt{2}) = \\sqrt{2}$.",
    topic: "Modulus Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 38,
    question_text: "The equation $\\sqrt{3x^2 + x + 5} = x - 3$, where $x$ is real, has:",
    options: [
      "no solution",
      "exactly four solutions",
      "exactly one solution",
      "exactly two solutions"
    ],
    correct_index: 0,
    solution: "Since the square root is non-negative, $x - 3 \\ge 0 \\implies x \\ge 3$.\n\nSquaring both sides:\n$3x^2 + x + 5 = (x - 3)^2 = x^2 - 6x + 9$\n$\\implies 2x^2 + 7x - 4 = 0$\n$\\implies (2x - 1)(x + 4) = 0 \\implies x = \\frac{1}{2}, -4$\n\nNeither of these values satisfies $x \\ge 3$.\nHence, the equation has no solution.",
    topic: "Irrational Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2014",
    question_type: "single_choice"
  },
  {
    question_number: 39,
    question_text: "Let $\\alpha$ and $\\beta$ be the roots of equation $x^2 - 6x - 2 = 0$. If $a_n = \\alpha^n - \\beta^n, \\forall n \\ge 1$, then the value of $(a_{10} - 2a_8) / (2a_9)$ is equal to:",
    options: [
      "$-3$",
      "$6$",
      "$-6$",
      "$3$"
    ],
    correct_index: 3,
    solution: "Since $\\alpha, \\beta$ satisfy $x^2 - 6x - 2 = 0$:\n$\\alpha^2 - 6\\alpha - 2 = 0 \\implies \\alpha^{10} - 6\\alpha^9 - 2\\alpha^8 = 0$\n$\\beta^2 - 6\\beta - 2 = 0 \\implies \\beta^{10} - 6\\beta^9 - 2\\beta^8 = 0$\n\nSubtracting the two equations:\n$(\\alpha^{10} - \\beta^{10}) - 6(\\alpha^9 - \\beta^9) - 2(\\alpha^8 - \\beta^8) = 0$\n$\\implies a_{10} - 6a_9 - 2a_8 = 0 \\implies a_{10} - 2a_8 = 6a_9$\n\nTherefore, $\\frac{a_{10} - 2a_8}{2a_9} = \\frac{6a_9}{2a_9} = 3$.",
    topic: "Newton's Theorem on Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 40,
    question_text: "If the two roots of the equation $(a - 1)(x^4 + x^2 + 1) + (a + 1)(x^2 + x + 1)^2 = 0$ are real and distinct, then the set of all values of $a$ is equal to:",
    options: [
      "$(0, 1/2)$",
      "$(-1/2, 0) \\cup (0, 1/2)$",
      "$(-\\infty, -2) \\cup (2, \\infty)$",
      "$(-1/2, 0)$"
    ],
    correct_index: 1,
    solution: "Notice that $x^4 + x^2 + 1 = (x^2 + x + 1)(x^2 - x + 1)$.\nDividing the equation by $(x^2 + x + 1)^2 \\ne 0$:\n$(a - 1)\\frac{x^2 - x + 1}{x^2 + x + 1} + (a + 1) = 0$\n\nLet $y = \\frac{x^2 - x + 1}{x^2 + x + 1}$. For real $x$, $y \\in [1/3, 3]$.\n$y(a - 1) + a + 1 = 0 \\implies y = \\frac{1 + a}{1 - a}$\n\nFor real and distinct roots, $y \\in (1/3, 3) \\setminus \\{1\\}$:\n$\\frac{1}{3} < \\frac{1+a}{1-a} < 3 \\implies a \\in (-1/2, 1/2) \\setminus \\{0\\}$\n\nHence, $a \\in (-1/2, 0) \\cup (0, 1/2)$.",
    topic: "Range and Reduction to Quadratic",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2015",
    question_type: "single_choice"
  },
  {
    question_number: 41,
    question_text: "The sum of all real values of $x$ satisfying the equation $(x^2 - 5x + 5)^{x^2 + 4x - 60} = 1$ is:",
    options: [
      "$6$",
      "$5$",
      "$3$",
      "$-4$"
    ],
    correct_index: 2,
    solution: "Case 1: Exponent $= 0$ and base $\\ne 0$\n$x^2 + 4x - 60 = 0 \\implies (x + 10)(x - 6) = 0 \\implies x = -10, 6$.\nBoth make the base non-zero.\n\nCase 2: Base $= 1$\n$x^2 - 5x + 5 = 1 \\implies x^2 - 5x + 4 = 0 \\implies (x - 1)(x - 4) = 0 \\implies x = 1, 4$.\n\nCase 3: Base $= -1$ and exponent is even\n$x^2 - 5x + 5 = -1 \\implies x^2 - 5x + 6 = 0 \\implies x = 2, 3$.\nAt $x = 2$, exponent $= 2^2 + 4(2) - 60 = -48$ (even) $\\implies$ valid.\nAt $x = 3$, exponent $= 3^2 + 4(3) - 60 = -39$ (odd) $\\implies$ rejected.\n\nSum of all solutions $= (-10) + 6 + 1 + 4 + 2 = 3$.",
    topic: "Exponential Quadratic Equations",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 42,
    question_text: "If the equations $x^2 + bx - 1 = 0$ and $x^2 + x + b = 0$ have a common root different from $-1$, then $|b|$ is equal to:",
    options: [
      "$2$",
      "$3$",
      "$\\sqrt{3}$",
      "$\\sqrt{2}$"
    ],
    correct_index: 2,
    solution: "Let $\\alpha$ be the common root:\n$\\alpha^2 + b\\alpha - 1 = 0$ and $\\alpha^2 + \\alpha + b = 0$\n\nSubtracting the two equations:\n$(b - 1)\\alpha - (1 + b) = 0 \\implies \\alpha = \\frac{b + 1}{b - 1}$\n\nSubstituting $\\alpha$ into $\\alpha^2 + \\alpha + b = 0$:\n$\\left(\\frac{b+1}{b-1}\\right)^2 + \\frac{b+1}{b-1} + b = 0$\n$\\implies (b + 1)^2 + (b^2 - 1) + b(b - 1)^2 = 0$\n$\\implies b^2 + 2b + 1 + b^2 - 1 + b(b^2 - 2b + 1) = 0$\n$\\implies 2b^2 + 2b + b^3 - 2b^2 + b = 0 \\implies b^3 + 3b = 0$\n$\\implies b(b^2 + 3) = 0$\n\nSince $b \\ne 0$, $b^2 = 3 \\implies |b| = \\sqrt{3}$.",
    topic: "Common Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 43,
    question_text: "If $x$ is a solution of the equation $\\sqrt{2x + 1} - \\sqrt{2x - 1} = 1$ ($x \\ge 1/2$), then $\\sqrt{4x^2 - 1}$ is equal to:",
    options: [
      "$3/4$",
      "$1/2$",
      "$2\\sqrt{2}$",
      "$2$"
    ],
    correct_index: 0,
    solution: "Given $\\sqrt{2x + 1} - \\sqrt{2x - 1} = 1$.\n\nUsing $(a - b)(a + b) = a^2 - b^2$:\n$\\sqrt{2x + 1} + \\sqrt{2x - 1} = \\frac{(2x + 1) - (2x - 1)}{\\sqrt{2x + 1} - \\sqrt{2x - 1}} = \\frac{2}{1} = 2$\n\nAdding both equations:\n$2\\sqrt{2x + 1} = 3 \\implies \\sqrt{2x + 1} = \\frac{3}{2}$\n\nSubtracting the equations:\n$2\\sqrt{2x - 1} = 1 \\implies \\sqrt{2x - 1} = \\frac{1}{2}$\n\nTherefore, $\\sqrt{4x^2 - 1} = \\sqrt{2x + 1}\\sqrt{2x - 1} = \\frac{3}{2} \\times \\frac{1}{2} = \\frac{3}{4}$.",
    topic: "Surd Equations and Quadratics",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2016",
    question_type: "single_choice"
  },
  {
    question_number: 44,
    question_text: "If, for a positive integer $n$, the quadratic equation $x(x + 1) + (x + 1)(x + 2) + \\dots + (x + n - 1)(x + n) = 10n$ has two consecutive integral solutions, then $n$ is equal to:",
    options: [
      "$12$",
      "$9$",
      "$10$",
      "$11$"
    ],
    correct_index: 3,
    solution: "The equation is $\\sum_{k=1}^n (x + k - 1)(x + k) = 10n$:\n$\\sum_{k=1}^n (x^2 + (2k - 1)x + k(k - 1)) = 10n$\n$\\implies nx^2 + n^2 x + \\frac{(n-1)n(n+1)}{3} = 10n$\n\nDividing by $n$:\n$x^2 + nx + \\frac{n^2 - 1}{3} - 10 = 0$\n\nSince the roots are consecutive integers, $|\\alpha - \\beta| = 1 \\implies D = 1$:\n$n^2 - 4\\left(\\frac{n^2 - 1}{3} - 10\\right) = 1$\n$\\implies 3n^2 - 4n^2 + 4 + 120 = 3$\n$\\implies -n^2 + 124 = 3 \\implies n^2 = 121 \\implies n = 11$.",
    topic: "Series and Quadratic Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 45,
    question_text: "Let $p(x)$ be a quadratic polynomial such that $p(0) = 1$. If $p(x)$ leaves remainder 4 when divided by $x - 1$ and leaves remainder 6 when divided by $x + 1$, then:",
    options: [
      "$p(-2) = 19$",
      "$p(2) = 19$",
      "$p(-2) = 11$",
      "$p(2) = 11$"
    ],
    correct_index: 0,
    solution: "Let $p(x) = ax^2 + bx + c$.\n$p(0) = 1 \\implies c = 1$\n$p(1) = a + b + 1 = 4 \\implies a + b = 3$\n$p(-1) = a - b + 1 = 6 \\implies a - b = 5$\n\nSolving gives $2a = 8 \\implies a = 4, b = -1$.\nSo $p(x) = 4x^2 - x + 1$.\n\nChecking values:\n$p(2) = 4(4) - 2 + 1 = 15$\n$p(-2) = 4(4) - (-2) + 1 = 16 + 2 + 1 = 19$.",
    topic: "Polynomial Remainder Theorem",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 46,
    question_text: "The sum of all the real values of $x$ satisfying the equation $2^{(x - 1)(x^2 + 5x - 50)} = 1$ is:",
    options: [
      "$16$",
      "$-5$",
      "$-4$",
      "$14$"
    ],
    correct_index: 2,
    solution: "Given $2^{(x - 1)(x^2 + 5x - 50)} = 1 = 2^0$:\n$\\implies (x - 1)(x^2 + 5x - 50) = 0$\n$\\implies (x - 1)(x + 10)(x - 5) = 0$\n$\\implies x = 1, -10, 5$\n\nSum of all real values $= 1 + (-10) + 5 = -4$.",
    topic: "Exponential Equations",
    difficulty: "easy",
    marks: 4,
    year: "JEE Main 2017",
    question_type: "single_choice"
  },
  {
    question_number: 47,
    question_text: "If $\\tan A$ and $\\tan B$ are the roots of the quadratic equation $3x^2 - 10x - 25 = 0$, then the value of $3\\sin^2(A + B) - 10\\sin(A + B)\\cos(A + B) - 25\\cos^2(A + B)$ is:",
    options: [
      "$-25$",
      "$10$",
      "$-10$",
      "$25$"
    ],
    correct_index: 0,
    solution: "$\\tan A + \\tan B = \\frac{10}{3}$ and $\\tan A \\tan B = -\\frac{25}{3}$\n\n$\\tan(A + B) = \\frac{\\tan A + \\tan B}{1 - \\tan A \\tan B} = \\frac{10/3}{1 + 25/3} = \\frac{10}{28} = \\frac{5}{14}$\n\nDivide the expression by $\\cos^2(A + B) + \\sin^2(A + B) = 1$:\n$E = \\frac{3\\tan^2(A+B) - 10\\tan(A+B) - 25}{1 + \\tan^2(A+B)}$\n\nSubstituting $\\tan(A+B) = \\frac{5}{14}$:\nNumerator $= 3\\left(\\frac{25}{196}\\right) - 10\\left(\\frac{5}{14}\\right) - 25 = \\frac{75 - 700 - 4900}{196} = -\\frac{5525}{196}$\nDenominator $= 1 + \\frac{25}{196} = \\frac{221}{196}$\n\n$E = -\\frac{5525}{221} = -25$.",
    topic: "Roots and Trigonometry",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 48,
    question_text: "If $\\lambda \\in \\mathbb{R}$ is such that the sum of the cubes of the roots of the equation $x^2 + (2 - \\lambda)x + (10 - \\lambda) = 0$ is minimum, then the magnitude of the difference of the roots of this equation is:",
    options: [
      "$4\\sqrt{2}$",
      "$20$",
      "$2\\sqrt{5}$",
      "$2\\sqrt{7}$"
    ],
    correct_index: 2,
    solution: "Let the roots be $\\alpha$ and $\\beta$.\n$\\alpha + \\beta = \\lambda - 2$, $\\alpha\\beta = 10 - \\lambda$\n\nSum of cubes:\n$S(\\lambda) = \\alpha^3 + \\beta^3 = (\\alpha+\\beta)^3 - 3\\alpha\\beta(\\alpha+\\beta)$\n$= (\\lambda - 2)^3 - 3(10 - \\lambda)(\\lambda - 2) = (\\lambda - 2)[\\lambda^2 - 4\\lambda + 4 - 30 + 3\\lambda]$\n$= (\\lambda - 2)(\\lambda^2 - \\lambda - 26) = \\lambda^3 - 3\\lambda^2 - 24\\lambda + 52$\n\n$S'(\\lambda) = 3\\lambda^2 - 6\\lambda - 24 = 3(\\lambda - 4)(\\lambda + 2) = 0$\nFor minimum, $\\lambda = 4$.\n\nAt $\\lambda = 4$, the equation is $x^2 - 2x + 6 = 0$.\n$|\\alpha - \\beta| = \\sqrt{|D|} = \\sqrt{|4 - 24|} = \\sqrt{20} = 2\\sqrt{5}$.",
    topic: "Roots Optimization",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2018",
    question_type: "single_choice"
  },
  {
    question_number: 49,
    question_text: "If $\\lambda \\in \\mathbb{R}$ is such that the sum of the cubes of the roots of the equation $x^2 + (2 - \\lambda)x + (10 - \\lambda) = 0$ is minimum, then the magnitude of the difference of the roots of this equation is:",
    options: [
      "$20$",
      "$2\\sqrt{5}$",
      "$2\\sqrt{7}$",
      "$4\\sqrt{2}$"
    ],
    correct_index: 1,
    solution: "Let the roots be $\\alpha$ and $\\beta$.\n$\\alpha + \\beta = \\lambda - 2$, $\\alpha\\beta = 10 - \\lambda$\n\nSum of cubes:\n$S(\\lambda) = \\alpha^3 + \\beta^3 = (\\lambda - 2)^3 - 3(10 - \\lambda)(\\lambda - 2) = \\lambda^3 - 3\\lambda^2 - 24\\lambda + 52$\n\n$S'(\\lambda) = 3(\\lambda - 4)(\\lambda + 2) = 0 \\implies \\lambda = 4$ for minimum.\n\nAt $\\lambda = 4$, $|\\alpha - \\beta| = \\sqrt{|(-2)^2 - 4(1)(6)|} = \\sqrt{20} = 2\\sqrt{5}$.",
    topic: "Roots Optimization",
    difficulty: "hard",
    marks: 4,
    year: "JEE Main 2018 (Shift 1)",
    question_type: "single_choice"
  },
  {
    question_number: 50,
    question_text: "If $f(x)$ is a quadratic expression such that $f(1) + f(2) = 0$ and $-1$ is a root of $f(x) = 0$, then the other root of $f(x) = 0$ is:",
    options: [
      "$-5/8$",
      "$-8/5$",
      "$5/8$",
      "$8/5$"
    ],
    correct_index: 3,
    solution: "Since $-1$ is a root of $f(x) = 0$, let $f(x) = a(x + 1)(x - \\alpha)$, where $\\alpha$ is the other root and $a \\ne 0$.\n\n$f(1) = a(1 + 1)(1 - \\alpha) = 2a(1 - \\alpha)$\n$f(2) = a(2 + 1)(2 - \\alpha) = 3a(2 - \\alpha)$\n\nGiven $f(1) + f(2) = 0$:\n$2a(1 - \\alpha) + 3a(2 - \\alpha) = 0$\n$\\implies a[2 - 2\\alpha + 6 - 3\\alpha] = 0$\n$\\implies 8 - 5\\alpha = 0 \\implies \\alpha = \\frac{8}{5}$.\n\nThus, the other root is $8/5$.",
    topic: "Quadratic Expressions and Roots",
    difficulty: "medium",
    marks: 4,
    year: "JEE Main 2018 (Shift 2)",
    question_type: "single_choice"
  }
];
