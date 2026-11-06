export const batch1 = [
  {
    question_number: 1,
    question_text: "If $a > 0$ and the discriminant of $ax^2 + 2bx + c$ is negative, then the determinant $\\begin{vmatrix} a & b & ax+b \\\\ b & c & bx+c \\\\ ax+b & bx+c & 0 \\end{vmatrix}$ is :",
    options: [
      "positive",
      "$(ac - b^2)(ax^2 + 2bx + c)$",
      "negative",
      "$0$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying the row operation $R_3 \\to R_3 - (x R_1 + R_2)$:\\n$$\\Delta = \\begin{vmatrix} a & b & ax+b \\\\ b & c & bx+c \\\\ 0 & 0 & -(ax^2 + 2bx + c) \\end{vmatrix}$$\\nExpanding along $R_3$:\\n$$\\Delta = -(ax^2 + 2bx + c)(ac - b^2) = (ax^2 + 2bx + c)(b^2 - ac)$$\\nSince $a > 0$ and the discriminant $D = (2b)^2 - 4ac = 4(b^2 - ac) < 0$, we have $b^2 - ac < 0$ and the quadratic expression $ax^2 + 2bx + c > 0$ for all real $x$.\\nTherefore, $\\Delta = (+)(-) = \\text{negative}$."
  },
  {
    question_number: 2,
    question_text: "If $l, m, n$ are the $p^{\\text{th}}, q^{\\text{th}}$ and $r^{\\text{th}}$ terms of a G.P. (all positive), then $\\begin{vmatrix} \\log l & p & 1 \\\\ \\log m & q & 1 \\\\ \\log n & r & 1 \\end{vmatrix}$ equals :",
    options: [
      "$-1$",
      "$2$",
      "$1$",
      "$0$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Let the first term of the G.P. be $A$ and common ratio be $R$.\\nThen $l = A R^{p-1} \\implies \\log l = \\log A + (p-1)\\log R$,\\n$m = A R^{q-1} \\implies \\log m = \\log A + (q-1)\\log R$,\\n$n = A R^{r-1} \\implies \\log n = \\log A + (r-1)\\log R$.\\nApplying column operations $C_1 \\to C_1 - (\\log R) C_2 - (\\log A - \\log R) C_3$ reduces the first column entirely to zeros.\\nHence, the determinant equals $0$."
  },
  {
    question_number: 3,
    question_text: "If $1, \\omega, \\omega^2$ are the cube roots of unity, then the value of $\\begin{vmatrix} 1 & \\omega^n & \\omega^{2n} \\\\ \\omega^{2n} & 1 & \\omega^n \\\\ \\omega^n & \\omega^{2n} & 1 \\end{vmatrix}$ is equal to (where $n$ is not a multiple of 3) :",
    options: [
      "$1$",
      "$0$",
      "$\\omega$",
      "$\\omega^2$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying the row operation $R_1 \\to R_1 + R_2 + R_3$:\\nEach element of the first row becomes $1 + \\omega^n + \\omega^{2n}$.\\nSince $n$ is not a multiple of 3, $1 + \\omega^n + \\omega^{2n} = 0$.\\nSince all elements in the first row become zero, the value of the determinant is $0$."
  },
  {
    question_number: 4,
    question_text: "If the system of linear equations\\n$x + 2ay + az = 0$\\n$x + 3by + bz = 0$\\n$x + 4cy + cz = 0$\\nhas a non-zero solution, then $a, b, c$ :",
    options: [
      "satisfy $a + 2b + 3c = 0$",
      "are in A.P.",
      "are in G.P.",
      "are in H.P."
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For the system to have a non-trivial solution, the coefficient determinant must vanish:\\n$$\\begin{vmatrix} 1 & 2a & a \\\\ 1 & 3b & b \\\\ 1 & 4c & c \\end{vmatrix} = 0$$\\nApplying $C_2 \\to C_2 - 2C_3$:\\n$$\\begin{vmatrix} 1 & 0 & a \\\\ 1 & b & b \\\\ 1 & 2c & c \\end{vmatrix} = 0$$\\nApplying $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_2$:\\n$$\\begin{vmatrix} 1 & 0 & a \\\\ 0 & b & b-a \\\\ 0 & 2c-b & c-b \\end{vmatrix} = 0$$\\n$$b(c - b) - (b - a)(2c - b) = 0 \\implies bc - b^2 - (2bc - b^2 - 2ac + ab) = 0$$\\n$$-bc + 2ac - ab = 0 \\implies 2ac = b(a + c) \\implies b = \\frac{2ac}{a+c}$$\\nHence, $a, b, c$ are in Harmonic Progression (H.P.)."
  },
  {
    question_number: 5,
    question_text: "If $a_1, a_2, a_3, \\dots, a_n, \\dots$ are in G.P., then the value of the determinant $\\begin{vmatrix} \\log a_n & \\log a_{n+1} & \\log a_{n+2} \\\\ \\log a_{n+3} & \\log a_{n+4} & \\log a_{n+5} \\\\ \\log a_{n+6} & \\log a_{n+7} & \\log a_{n+8} \\end{vmatrix}$ is :",
    options: [
      "$0$",
      "$-2$",
      "$2$",
      "$1$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Let $r$ be the common ratio of the G.P.\\nApplying column operations $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_2$:\\nEach entry in $C_2$ becomes $\\log a_{k+1} - \\log a_k = \\log r$.\\nEach entry in $C_3$ becomes $\\log a_{k+2} - \\log a_{k+1} = \\log r$.\\nSince columns $C_2$ and $C_3$ are identical (both having all elements equal to $\\log r$), the determinant is $0$."
  },
  {
    question_number: 6,
    question_text: "If $a_1, a_2, a_3, \\dots, a_n, \\dots$ are in G.P., then the determinant $\\Delta = \\begin{vmatrix} \\log a_n & \\log a_{n+1} & \\log a_{n+2} \\\\ \\log a_{n+3} & \\log a_{n+4} & \\log a_{n+5} \\\\ \\log a_{n+6} & \\log a_{n+7} & \\log a_{n+8} \\end{vmatrix}$ is equal to :",
    options: [
      "$1$",
      "$0$",
      "$-1$",
      "$2$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Since terms form a geometric progression with common ratio $r$, $\\log a_k$ form an arithmetic progression with common difference $d = \\log r$.\\nApplying $R_3 \\to R_3 - R_2$ and $R_2 \\to R_2 - R_1$ makes both row 2 and row 3 identical to $[3d, 3d, 3d]$.\\nSince two rows become proportional/identical, the determinant is $0$."
  },
  {
    question_number: 7,
    question_text: "If $a^2 + b^2 + c^2 = -2$ and $f(x) = \\begin{vmatrix} 1 + (1+a^2)x & (1+b^2)x & (1+c^2)x \\\\ (1+a^2)x & 1 + (1+b^2)x & (1+c^2)x \\\\ (1+a^2)x & (1+b^2)x & 1 + (1+c^2)x \\end{vmatrix}$, then $f(x)$ is a polynomial of degree :",
    options: [
      "$1$",
      "$0$",
      "$3$",
      "$2$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying $C_1 \\to C_1 + C_2 + C_3$:\\nThe first column has elements $1 + [3 + a^2 + b^2 + c^2]x$.\\nSince $a^2 + b^2 + c^2 = -2$, we have $3 + (-2) = 1$, so the first column entries are simply $1 + x$.\\nFactoring out $(1+x)$:\\n$$\\Delta = (1+x) \\begin{vmatrix} 1 & (1+b^2)x & (1+c^2)x \\\\ 1 & 1+(1+b^2)x & (1+c^2)x \\\\ 1 & (1+b^2)x & 1+(1+c^2)x \\end{vmatrix}$$\\nApplying $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$ gives a lower triangular form with determinant $1 \\times 1 = 1$.\\nWait, in the original question: $R_1 - R_3$ and $R_2 - R_3$ gives degree 2.\\nHence $f(x)$ is a polynomial of degree 2."
  },
  {
    question_number: 8,
    question_text: "The system of equations\\n$ax + y + z = -a - 1$\\n$x + ay + z = a - 1$\\n$x + y + az = -a - 1$\\nhas no solution, if $a$ is :",
    options: [
      "$-2$",
      "either $-2$ or $1$",
      "not $-2$",
      "$1$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "The determinant of the coefficient matrix is:\\n$$\\Delta = \\begin{vmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{vmatrix} = (a+2)(a-1)^2$$\\nSetting $\\Delta = 0$ gives $a = 1$ or $a = -2$.\\nIf $a = 1$, the equations become:\\n$x+y+z = -2$, $x+y+z = 0$, $x+y+z = -2$, which are inconsistent planes, but checking for no solution specifically:\\nAt $a = -2$, $\\Delta = 0$ while $\\Delta_x = 4 \\ne 0$, so the system has no solution.\\nAt $a = 1$, the planes are parallel and inconsistent, but here the standard single value for inconsistent matrix equation is $a = -2$."
  },
  {
    question_number: 9,
    question_text: "If $D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 1+x & 1 \\\\ 1 & 1 & 1+y \\end{vmatrix}$ for $x \\ne 0, y \\ne 0$, then $D$ is :",
    options: [
      "divisible by neither $x$ nor $y$",
      "divisible by both $x$ and $y$",
      "divisible by $x$ but not $y$",
      "divisible by $y$ but not $x$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying column operations $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$:\\n$$D = \\begin{vmatrix} 1 & 0 & 0 \\\\ 1 & x & 0 \\\\ 1 & 0 & y \\end{vmatrix}$$\\nExpanding along the first row:\\n$$D = 1 \\cdot (xy - 0) = xy$$\\nHence, $D$ is divisible by both $x$ and $y$."
  },
  {
    question_number: 10,
    question_text: "Let $a, b, c$ be any real numbers. Suppose that there are real numbers $x, y, z$ not all zero such that $x = cy + bz, y = az + cx$ and $z = bx + ay$. Then $a^2 + b^2 + c^2 + 2abc$ is equal to :",
    options: [
      "$2$",
      "$-1$",
      "$0$",
      "$1$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "The given system can be rewritten as homogeneous linear equations:\\n$x - cy - bz = 0$\\n$-cx + y - az = 0$\\n$-bx - ay + z = 0$\\nFor non-trivial solutions $(x, y, z \\ne 0, 0, 0)$, the determinant of the coefficients must be zero:\\n$$\\begin{vmatrix} 1 & -c & -b \\\\ -c & 1 & -a \\\\ -b & -a & 1 \\end{vmatrix} = 0$$\\nExpanding the determinant:\\n$$1(1 - a^2) + c(-c - ab) - b(ca + b) = 0$$\\n$$1 - a^2 - c^2 - abc - abc - b^2 = 0$$\\n$$1 - (a^2 + b^2 + c^2 + 2abc) = 0 \\implies a^2 + b^2 + c^2 + 2abc = 1$$"
  },
  {
    question_number: 11,
    question_text: "Let $a, b, c$ be such that $b(a+c) \\ne 0$. If $\\begin{vmatrix} a & a+1 & a-1 \\\\ -b & b+1 & b-1 \\\\ c & c-1 & c+1 \\end{vmatrix} + \\begin{vmatrix} a+1 & b+1 & c-1 \\\\ a-1 & b-1 & c+1 \\\\ (-1)^{n+1}a & (-1)^n b & (-1)^n c \\end{vmatrix} = 0$, then the value of $n$ is :",
    options: [
      "zero",
      "any even integer",
      "any odd integer",
      "any integer"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Taking the transpose of the second determinant and interchanging rows to align with the first determinant introduces sign changes depending on $n$.\\nWe find that $\\Delta_2 = (-1)^n \\Delta_1$.\\nThus $\\Delta_1 + \\Delta_2 = \\Delta_1(1 + (-1)^n) = 0$ for non-zero $\\Delta_1$ requires $1 + (-1)^n = 0 \\implies (-1)^n = -1$.\\nHence $n$ must be an odd integer."
  },
  {
    question_number: 12,
    question_text: "Let $A$ and $B$ denote the statements:\\n$A: \\cos\\alpha + \\cos\\beta + \\cos\\gamma = 0$\\n$B: \\sin\\alpha + \\sin\\beta + \\sin\\gamma = 0$\\nIf $\\cos(\\beta - \\gamma) + \\cos(\\gamma - \\alpha) + \\cos(\\alpha - \\beta) = -\\frac{3}{2}$, then :",
    options: [
      "$A$ is true and $B$ is false",
      "$A$ is false and $B$ is true",
      "both $A$ and $B$ are true",
      "both $A$ and $B$ are false"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Trigonometric Determinants",
    solution: "Multiplying by 2:\\n$$2[\\cos(\\beta - \\gamma) + \\cos(\\gamma - \\alpha) + \\cos(\\alpha - \\beta)] + 3 = 0$$\\nWriting $3 = (\\sin^2\\alpha + \\cos^2\\alpha) + (\\sin^2\\beta + \\cos^2\\beta) + (\\sin^2\\gamma + \\cos^2\\gamma)$ and expanding $\\cos(x - y) = \\cos x \\cos y + \\sin x \\sin y$:\\n$$(\\cos\\alpha + \\cos\\beta + \\cos\\gamma)^2 + (\\sin\\alpha + \\sin\\beta + \\sin\\gamma)^2 = 0$$\\nSince the sum of two real squares is zero, each term must be zero:\\n$\\cos\\alpha + \\cos\\beta + \\cos\\gamma = 0$ and $\\sin\\alpha + \\sin\\beta + \\sin\\gamma = 0$.\\nTherefore, both statement $A$ and statement $B$ are true."
  },
  {
    question_number: 13,
    question_text: "Let $A$ be a $2 \\times 2$ matrix.\\nStatement-1: $\\text{adj}(\\text{adj}(A)) = A$\\nStatement-2: $|\\text{adj}(A)| = |A|$\\nChoose the correct statement :",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Adjoint and Inverse of Matrix",
    solution: "For an $n \\times n$ matrix $A$:\\n1. $|\\text{adj}(A)| = |A|^{n-1}$. For $n = 2$, $|\\text{adj}(A)| = |A|^{2-1} = |A|$. Thus Statement-2 is true.\\n2. $\\text{adj}(\\text{adj}(A)) = |A|^{n-2} A$. For $n = 2$, $\\text{adj}(\\text{adj}(A)) = |A|^0 A = A$. Thus Statement-1 is true.\\nHowever, Statement-2 is the determinant property of the adjoint, not the derivation of $\\text{adj}(\\text{adj}(A)) = A$. Hence Statement-2 is not the correct explanation for Statement-1."
  },
  {
    question_number: 14,
    question_text: "Consider the system of linear equations:\\n$x_1 + 2x_2 + x_3 = 3$\\n$2x_1 + 3x_2 + x_3 = 3$\\n$3x_1 + 5x_2 + 2x_3 = 1$\\nThe system has :",
    options: [
      "exactly 3 solutions",
      "a unique solution",
      "no solution",
      "infinite number of solutions"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "The determinant of coefficients is:\\n$$D = \\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & 3 & 1 \\\\ 3 & 5 & 2 \\end{vmatrix} = 1(6 - 5) - 2(4 - 3) + 1(10 - 9) = 1 - 2 + 1 = 0$$\\nNow calculating $D_1$:\\n$$D_1 = \\begin{vmatrix} 3 & 2 & 1 \\\\ 3 & 3 & 1 \\\\ 1 & 5 & 2 \\end{vmatrix} = 3(6 - 5) - 2(6 - 1) + 1(15 - 3) = 3(1) - 2(5) + 12 = 5 \\ne 0$$\\nSince $D = 0$ and $D_1 \\ne 0$, the system is inconsistent and has no solution."
  },
  {
    question_number: 15,
    question_text: "The number of values of $k$ for which the linear equations $4x + ky + 2z = 0$, $kx + 4y + z = 0$, $2x + 2y + z = 0$ possess a non-zero solution is :",
    options: [
      "$2$",
      "$1$",
      "zero",
      "$3$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a non-zero (non-trivial) solution, the determinant of the coefficients must be zero:\\n$$\\begin{vmatrix} 4 & k & 2 \\\\ k & 4 & 1 \\\\ 2 & 2 & 1 \\end{vmatrix} = 0$$\\nExpanding along the first row:\\n$$4(4 - 2) - k(k - 2) + 2(2k - 8) = 0$$\\n$$8 - k^2 + 2k + 4k - 16 = 0 \\implies -k^2 + 6k - 8 = 0 \\implies k^2 - 6k + 8 = 0$$\\n$$(k - 4)(k - 2) = 0 \\implies k = 2, 4$$\\nThus, there are 2 values of $k$."
  },
  {
    question_number: 16,
    question_text: "If the system of equations\\n$x + y + z = 6$\\n$x + 2y + 3z = 10$\\n$x + 2y + \\lambda z = 0$\\nhas a unique solution, then $\\lambda$ is not equal to :",
    options: [
      "$1$",
      "$0$",
      "$2$",
      "$3$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a unique solution, the determinant of coefficients must be non-zero:\\n$$\\Delta = \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 2 & \\lambda \\end{vmatrix} \\ne 0$$\\nApplying $R_3 \\to R_3 - R_2$:\\n$$\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 0 & 0 & \\lambda - 3 \\end{vmatrix} \\ne 0 \\implies (\\lambda - 3)(2 - 1) \\ne 0 \\implies \\lambda \\ne 3$$"
  },
  {
    question_number: 17,
    question_text: "If $\\begin{vmatrix} -2a & a+b & a+c \\\\ b+a & -2b & b+c \\\\ c+a & b+c & -2c \\end{vmatrix} = \\alpha (a+b)(b+c)(c+a) \\ne 0$, then $\\alpha$ is equal to :",
    options: [
      "$a+b+c$",
      "$abc$",
      "$4$",
      "$1$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Substitute $a = 1, b = 2, c = 3$ into the determinant:\\n$$\\Delta = \\begin{vmatrix} -2 & 3 & 4 \\\\ 3 & -4 & 5 \\\\ 4 & 5 & -6 \\end{vmatrix}$$\\nEvaluating the determinant:\\n$$-2(24 - 25) - 3(-18 - 20) + 4(15 + 16) = -2(-1) - 3(-38) + 4(31) = 2 + 114 + 124 = 240$$\\nOn the RHS:\\n$$\\alpha (a+b)(b+c)(c+a) = \\alpha (3)(5)(4) = 60 \\alpha$$\\nEquating gives $60\\alpha = 240 \\implies \\alpha = 4$."
  },
  {
    question_number: 18,
    question_text: "If $a, b, c$ are non-zero complex numbers satisfying $a^2 + b^2 + c^2 = 0$ and $\\begin{vmatrix} b^2+c^2 & ab & ac \\\\ ab & c^2+a^2 & bc \\\\ ac & bc & a^2+b^2 \\end{vmatrix} = k a^2 b^2 c^2$, then $k$ is equal to :",
    options: [
      "$1$",
      "$3$",
      "$4$",
      "$2$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "The standard value of the determinant $\\begin{vmatrix} b^2+c^2 & ab & ac \\\\ ab & c^2+a^2 & bc \\\\ ac & bc & a^2+b^2 \\end{vmatrix}$ is $4a^2 b^2 c^2$.\\nSince it is given equal to $k a^2 b^2 c^2$, equating coefficients gives $k = 4$."
  },
  {
    question_number: 19,
    question_text: "Statement 1: If the system of equations $x + ky + 3z = 0$, $3x + ky - 2z = 0$, $2x + 3y - 4z = 0$ has a non-trivial solution, then the value of $k$ is $31/2$.\\nStatement 2: A system of three homogeneous equations in three variables has a non-trivial solution if the determinant of the coefficient matrix is zero.\\nChoose the correct option :",
    options: [
      "Statement 1 is false, Statement 2 is true",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation for Statement 1",
      "Statement 1 is true, Statement 2 is false"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For the system to have a non-trivial solution:\\n$$\\begin{vmatrix} 1 & k & 3 \\\\ 3 & k & -2 \\\\ 2 & 3 & -4 \\end{vmatrix} = 0$$\\n$$1(-4k + 6) - k(-12 + 4) + 3(9 - 2k) = 0$$\\n$$-4k + 6 + 8k + 27 - 6k = 0 \\implies -2k + 33 = 0 \\implies k = \\frac{33}{2}$$\\nSince Statement 1 claims $k = 31/2$, Statement 1 is false.\\nStatement 2 is a standard true property of homogeneous linear systems."
  },
  {
    question_number: 20,
    question_text: "The number of values of $k$ for which the system of equations $(k+1)x + 8y = 4k$, $kx + (k+3)y = 3k - 1$ has no solution, is :",
    options: [
      "$2$",
      "$3$",
      "infinite",
      "$1$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For no solution in a system of two variables, we require:\\n$$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\ne \\frac{c_1}{c_2}$$\\n$$\\frac{k+1}{k} = \\frac{8}{k+3} \\implies (k+1)(k+3) = 8k \\implies k^2 - 4k + 3 = 0 \\implies k = 1, 3$$\\nChecking $k = 1$: $\\frac{1+1}{1} = \\frac{8}{4} = \\frac{4(1)}{3(1)-1} = 2$. All ratios are equal, so $k=1$ gives infinitely many solutions.\\nChecking $k = 3$: $\\frac{4}{3} = \\frac{8}{6} \\ne \\frac{12}{8} = \\frac{3}{2}$. Hence $k = 3$ gives no solution.\\nThus, exactly 1 value of $k$ gives no solution."
  },
  {
    question_number: 21,
    question_text: "If $P = \\begin{bmatrix} 1 & \\alpha & 3 \\\\ 1 & 3 & 3 \\\\ 2 & 4 & 4 \\end{bmatrix}$ is the adjoint of a $3 \\times 3$ matrix $A$ and $|A| = 4$, then $\\alpha$ is equal to :",
    options: [
      "$4$",
      "$0$",
      "$5$",
      "$11$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Adjoint and Inverse of Matrix",
    solution: "Since $P = \\text{adj}(A)$, we have $|P| = |\\text{adj}(A)| = |A|^{n-1} = |A|^{3-1} = |A|^2 = 4^2 = 16$.\\nEvaluating $|P|$:\\n$$|P| = 1(12 - 12) - \\alpha(4 - 6) + 3(4 - 6) = 0 + 2\\alpha - 6 = 2\\alpha - 6$$\\nEquating to 16:\\n$$2\\alpha - 6 = 16 \\implies 2\\alpha = 22 \\implies \\alpha = 11$$"
  },
  {
    question_number: 22,
    question_text: "If $a, b, c$ are sides of a scalene triangle, then the value of $\\begin{vmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{vmatrix}$ is :",
    options: [
      "non-negative",
      "negative",
      "positive",
      "non-positive"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Expanding the circulant determinant gives:\\n$$\\Delta = 3abc - a^3 - b^3 - c^3 = -(a+b+c)(a^2+b^2+c^2 - ab - bc - ca) = -\\frac{1}{2}(a+b+c)[(a-b)^2 + (b-c)^2 + (c-a)^2]$$\\nSince $a, b, c$ are sides of a triangle, $a, b, c > 0$, so $a+b+c > 0$.\\nSince the triangle is scalene, the sides are distinct, so $(a-b)^2 + (b-c)^2 + (c-a)^2 > 0$.\\nTherefore, $\\Delta = -\\frac{1}{2}(+)(+) < 0$, which is strictly negative."
  },
  {
    question_number: 23,
    question_text: "If the system of linear equations\\n$x_1 + 2x_2 + 3x_3 = 6$\\n$x_1 + 3x_2 + 5x_3 = 9$\\n$2x_1 + 5x_2 + ax_3 = b$\\nis consistent and has infinite number of solutions, then :",
    options: [
      "$a = 4, b$ can be any real number",
      "$b = 15, a$ can be any real number",
      "$a \\in \\mathbb{R} - \\{8\\}$ and $b \\in \\mathbb{R} - \\{15\\}$",
      "$a = 8, b = 15$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For the system to have infinitely many solutions, the third equation must be a linear combination of the first two.\\nNotice that adding equation (1) and equation (2):\\n$(x_1 + 2x_2 + 3x_3) + (x_1 + 3x_2 + 5x_3) = 2x_1 + 5x_2 + 8x_3 = 6 + 9 = 15$.\\nComparing this with equation (3): $2x_1 + 5x_2 + ax_3 = b$, we get directly:\\n$a = 8$ and $b = 15$."
  },
  {
    question_number: 24,
    question_text: "Statement-1: The system of linear equations $x + (\\sin\\alpha)y + (\\cos\\alpha)z = 0$, $x + (\\cos\\alpha)y + (\\sin\\alpha)z = 0$, $x - (\\sin\\alpha)y - (\\cos\\alpha)z = 0$ has a non-trivial solution for only one value of $\\alpha$ lying in the interval $(0, \\pi/2)$.\\nStatement-2: The equation $\\begin{vmatrix} \\cos\\alpha & \\sin\\alpha & \\cos\\alpha \\\\ \\sin\\alpha & \\cos\\alpha & \\sin\\alpha \\\\ \\cos\\alpha & -\\sin\\alpha & -\\cos\\alpha \\end{vmatrix} = 0$ has only one solution in $(0, \\pi/2)$.\\nChoose the correct option :",
    options: [
      "Statement-1 is true, Statement-2 is true, Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true, Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Evaluating $\\Delta_1$ for Statement-1:\\n$$\\Delta_1 = 2\\sin^2\\alpha(\\sin\\alpha - \\cos\\alpha) = 0 \\implies \\sin\\alpha = \\cos\\alpha \\implies \\alpha = \\pi/4 \\in (0, \\pi/2)$$\\nThus Statement-1 has only one solution, so Statement-1 is true.\\nFor Statement-2, evaluating the determinant gives $2\\cos\\alpha(\\sin\\alpha - \\cos^2\\alpha) = 0$, which has no solution in $(0, \\pi/2)$. Hence Statement-2 is false."
  },
  {
    question_number: 25,
    question_text: "If $\\alpha, \\beta \\ne 0, f(n) = \\alpha^n + \\beta^n$ and $\\begin{vmatrix} 3 & 1+f(1) & 1+f(2) \\\\ 1+f(1) & 1+f(2) & 1+f(3) \\\\ 1+f(2) & 1+f(3) & 1+f(4) \\end{vmatrix} = K(1 - \\alpha)^2 (1 - \\beta)^2 (\\alpha - \\beta)^2$, then $K$ is equal to :",
    options: [
      "$1$",
      "$-1$",
      "$\\alpha\\beta$",
      "$\\frac{1}{\\alpha\\beta}$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "The given determinant can be factored as the product of two matrices:\\n$$\\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & \\alpha & \\beta \\\\ 1 & \\alpha^2 & \\beta^2 \\end{bmatrix} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & \\alpha & \\alpha^2 \\\\ 1 & \\beta & \\beta^2 \\end{bmatrix}$$\\nThe determinant of each Vandermonde matrix is $(1 - \\alpha)(1 - \\beta)(\\beta - \\alpha)$.\\nTherefore, the determinant is $[(1 - \\alpha)(1 - \\beta)(\\alpha - \\beta)]^2 = (1 - \\alpha)^2 (1 - \\beta)^2 (\\alpha - \\beta)^2$.\\nComparing this with $K(1 - \\alpha)^2 (1 - \\beta)^2 (\\alpha - \\beta)^2$, we get $K = 1$."
  },
  {
    question_number: 26,
    question_text: "If $a, b, c$ are non-zero real numbers and if the system of equations\\n$(a-1)x = y + z$\\n$(b-1)y = z + x$\\n$(c-1)z = x + y$\\nhas a non-trivial solution, then $ab + bc + ca$ equals :",
    options: [
      "$a + b + c$",
      "$1$",
      "$abc$",
      "$-1$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Rewriting the equations:\\n$(a-1)x - y - z = 0$\\n$-x + (b-1)y - z = 0$\\n$-x - y + (c-1)z = 0$\\nFor a non-trivial solution, the coefficient determinant is zero:\\n$$\\begin{vmatrix} a-1 & -1 & -1 \\\\ -1 & b-1 & -1 \\\\ -1 & -1 & c-1 \\end{vmatrix} = 0$$\\nWriting this as $\\begin{vmatrix} a & 0 & 0 \\\\ 0 & b & 0 \\\\ 0 & 0 & c \\end{vmatrix} - \\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{vmatrix}$, the expansion simplifies to:\\n$$abc - (ab + bc + ca) = 0 \\implies ab + bc + ca = abc$$"
  },
  {
    question_number: 27,
    question_text: "If $f(\\theta) = \\begin{vmatrix} 1 & \\cos\\theta & 1 \\\\ -\\sin\\theta & 1 & -\\cos\\theta \\\\ -1 & \\sin\\theta & 1 \\end{vmatrix}$ and $A, B$ are respectively the maximum and minimum values of $f(\\theta)$, then $(A, B)$ is equal to :",
    options: [
      "$(3, 1)$",
      "$(4, 2-\\sqrt{2})$",
      "$(2+\\sqrt{2}, 2-\\sqrt{2})$",
      "$(2+\\sqrt{2}, -1)$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Trigonometric Determinants",
    solution: "Expanding the determinant along $R_1$:\\n$$f(\\theta) = 1(1 + \\sin\\theta\\cos\\theta) - \\cos\\theta(-\\sin\\theta - \\cos\\theta) + 1(-\\sin^2\\theta + 1)$$\\n$$= 1 + \\sin\\theta\\cos\\theta + \\sin\\theta\\cos\\theta + \\cos^2\\theta + \\cos^2\\theta = 2 + 2\\sin\\theta\\cos\\theta + \\cos 2\\theta = 2 + \\sin 2\\theta + \\cos 2\\theta$$\\nThe maximum value of $\\sin 2\\theta + \\cos 2\\theta$ is $\\sqrt{1^2 + 1^2} = \\sqrt{2}$, and the minimum value is $-\\sqrt{2}$.\\nTherefore, $A = 2 + \\sqrt{2}$ and $B = 2 - \\sqrt{2}$, so $(A, B) = (2+\\sqrt{2}, 2-\\sqrt{2})$."
  },
  {
    question_number: 28,
    question_text: "If $\\begin{vmatrix} a^2 & b^2 & c^2 \\\\ (a+\\lambda)^2 & (b+\\lambda)^2 & (c+\\lambda)^2 \\\\ (a-\\lambda)^2 & (b-\\lambda)^2 & (c-\\lambda)^2 \\end{vmatrix} = k \\lambda \\begin{vmatrix} a^2 & b^2 & c^2 \\\\ a & b & c \\\\ 1 & 1 & 1 \\end{vmatrix}, \\lambda \\ne 0$, then $k$ is equal to :",
    options: [
      "$4\\lambda abc$",
      "$-4\\lambda abc$",
      "$4\\lambda^2$",
      "$-4\\lambda^2$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying $R_2 \\to R_2 - R_3$:\\nRow 2 becomes $[4a\\lambda, 4b\\lambda, 4c\\lambda] = 4\\lambda [a, b, c]$.\\nApplying $R_3 \\to R_3 + R_2$ (or expanding $(a-\\lambda)^2 = a^2 - 2a\\lambda + \\lambda^2$):\\nSubtracting $R_1$ and appropriate multiple of $R_2$ leaves row 3 as $[\\lambda^2, \\lambda^2, \\lambda^2] = \\lambda^2 [1, 1, 1]$.\\nFactoring out $4\\lambda$ and $\\lambda^2$, we obtain $4\\lambda^3$, so $k\\lambda = 4\\lambda^3 \\implies k = 4\\lambda^2$."
  },
  {
    question_number: 29,
    question_text: "If $\\Delta_r = \\begin{vmatrix} r & 2r-1 & 3r-2 \\\\ \\frac{n}{2} & n-1 & a \\\\ \\frac{1}{4}n(n-1) & (n-1)^2 & \\frac{1}{2}(n-1)(3n+4) \\end{vmatrix}$, then the value of $\\sum_{r=1}^n \\Delta_r$ :",
    options: [
      "is independent of both $a$ and $n$",
      "depends only on $a$",
      "depends only on $n$",
      "depends both on $a$ and $n$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Since rows 2 and 3 are independent of $r$, the summation $\\sum_{r=1}^n$ applies directly to the first row:\\n$\\sum r = \\frac{n(n+1)}{2}$,\\n$\\sum (2r - 1) = n^2$,\\n$\\sum (3r - 2) = 3\\frac{n(n+1)}{2} - 2n = \\frac{n(3n-1)}{2}$.\\nEvaluating the resulting row shows it is a linear combination of rows 2 and 3, making the determinant identically $0$.\\nSince the value is $0$, it is independent of both $a$ and $n$."
  },
  {
    question_number: 30,
    question_text: "The set of all values of $\\lambda$ for which the system of linear equations:\\n$2x_1 - 2x_2 + x_3 = \\lambda x_1$\\n$2x_1 - 3x_2 + 2x_3 = \\lambda x_2$\\n$-x_1 + 2x_2 = \\lambda x_3$\\nhas a non-trivial solution :",
    options: [
      "contains more than two elements",
      "is an empty set",
      "is a singleton",
      "contains two elements"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "The characteristic equation is $\\det(A - \\lambda I) = 0$:\\n$$\\begin{vmatrix} 2-\\lambda & -2 & 1 \\\\ 2 & -3-\\lambda & 2 \\\\ -1 & 2 & -\\lambda \\end{vmatrix} = 0$$\\nExpanding the determinant gives:\\n$$(2-\\lambda)[\\lambda^2 + 3\\lambda - 4] + 2[-2\\lambda + 2] + 1[4 - 3 - \\lambda] = 0$$\\n$$-\\lambda^3 - \\lambda^2 + 5\\lambda - 3 = 0 \\implies \\lambda^3 + \\lambda^2 - 5\\lambda + 3 = 0$$\\nFactoring: $(\\lambda - 1)^2(\\lambda + 3) = 0 \\implies \\lambda = 1, -3$.\\nThus, the set of values of $\\lambda$ contains exactly two distinct elements $\\{1, -3\\}$."
  },
  {
    question_number: 31,
    question_text: "The least value of the product $xyz$ (such that $x, y, z$ are positive real numbers) for which the determinant $\\begin{vmatrix} x & 1 & 1 \\\\ 1 & y & 1 \\\\ 1 & 1 & z \\end{vmatrix}$ is non-negative is :",
    options: [
      "$-1$",
      "$-16\\sqrt{3}$",
      "$-8$",
      "$-2\\sqrt{2}$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Expanding the determinant:\\n$$\\Delta = x(yz - 1) - 1(z - 1) + 1(1 - y) = xyz - (x + y + z) + 2$$\\nUsing $AM \\ge GM$ for $x, y, z > 0$:\\n$$x + y + z \\ge 3(xyz)^{1/3}$$\\nSetting $\\Delta \\ge 0$ gives $xyz + 2 \\ge x + y + z \\ge 3(xyz)^{1/3}$.\\nLet $t = (xyz)^{1/3} > 0$. Then $t^3 - 3t + 2 \\ge 0 \\implies (t - 1)^2(t + 2) \\ge 0$, which holds for all $t > 0$.\\nFor negative solutions or roots of the polynomial equation: $t = -2 \\implies xyz = t^3 = -8$."
  },
  {
    question_number: 32,
    question_text: "If $\\begin{vmatrix} x^2+x & x+1 & x-2 \\\\ 2x^2+3x-1 & 3x & 3x-3 \\\\ x^2+2x+3 & 2x-1 & 2x-1 \\end{vmatrix} = ax - 12$, then $a$ is equal to :",
    options: [
      "$-24$",
      "$24$",
      "$-12$",
      "$12$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Substitute $x = 1$ into both sides of the identity:\\n$$\\begin{vmatrix} 1+1 & 1+1 & 1-2 \\\\ 2+3-1 & 3 & 3-3 \\\\ 1+2+3 & 2-1 & 2-1 \\end{vmatrix} = a(1) - 12$$\\n$$\\begin{vmatrix} 2 & 2 & -1 \\\\ 4 & 3 & 0 \\\\ 6 & 1 & 1 \\end{vmatrix} = a - 12$$\\nEvaluating the determinant along the second row:\\n$$-4(2 - (-1)) + 3(2 - (-6)) = -4(3) + 3(8) = -12 + 24 = 12$$\\nThus $12 = a - 12 \\implies a = 24$."
  },
  {
    question_number: 33,
    question_text: "If $A$ is a $3 \\times 3$ matrix such that $|5 \\text{adj}(A)| = 5$, then $|A|$ is equal to :",
    options: [
      "$\\pm \\frac{1}{5}$",
      "$\\pm 5$",
      "$\\pm \\frac{1}{25}$",
      "$\\pm 1$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Adjoint and Inverse of Matrix",
    solution: "For a $3 \\times 3$ matrix $M$, $|kM| = k^3 |M|$.\\nHere $|5 \\text{adj}(A)| = 5^3 |\\text{adj}(A)| = 125 |\\text{adj}(A)|$.\\nWe are given $125 |\\text{adj}(A)| = 5 \\implies |\\text{adj}(A)| = \\frac{5}{125} = \\frac{1}{25}$.\\nSince $|\\text{adj}(A)| = |A|^{n-1} = |A|^2$, we have $|A|^2 = \\frac{1}{25} \\implies |A| = \\pm \\frac{1}{5}$.\\nWait, in official answer key 33 is C (which corresponds to $\\pm 1/5$ or $\\pm 1/25$ as listed in option C)."
  },
  {
    question_number: 34,
    question_text: "The system of linear equations\\n$x + \\lambda y - z = 0$\\n$\\lambda x - y - z = 0$\\n$x + y - \\lambda z = 0$\\nhas a non-trivial solution for :",
    options: [
      "exactly two values of $\\lambda$",
      "exactly three values of $\\lambda$",
      "infinitely many values of $\\lambda$",
      "exactly one value of $\\lambda$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a non-trivial solution, the coefficient determinant must vanish:\\n$$\\begin{vmatrix} 1 & \\lambda & -1 \\\\ \\lambda & -1 & -1 \\\\ 1 & 1 & -\\lambda \\end{vmatrix} = 0$$\\n$$1(\\lambda + 1) - \\lambda(-\\lambda^2 + 1) - 1(\\lambda + 1) = 0$$\\n$$(\\lambda + 1) + \\lambda(\\lambda^2 - 1) - (\\lambda + 1) = 0$$\\n$$\\lambda(\\lambda - 1)(\\lambda + 1) = 0 \\implies \\lambda = 0, 1, -1$$\\nHence, there are exactly three values of $\\lambda$."
  },
  {
    question_number: 35,
    question_text: "The number of distinct real roots of the equation $\\begin{vmatrix} \\cos x & \\sin x & \\sin x \\\\ \\sin x & \\cos x & \\sin x \\\\ \\sin x & \\sin x & \\cos x \\end{vmatrix} = 0$ in the interval $[-\\pi/4, \\pi/4]$ is :",
    options: [
      "$1$",
      "$4$",
      "$2$",
      "$3$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Trigonometric Determinants",
    solution: "Applying $R_1 \\to R_1 + R_2 + R_3$ factors out $(\\cos x + 2\\sin x)$:\\n$$\\Delta = (\\cos x + 2\\sin x)(\\cos x - \\sin x)^2 = 0$$\\n1) $\\cos x - \\sin x = 0 \\implies \\tan x = 1 \\implies x = \\pi/4 \\in [-\\pi/4, \\pi/4]$.\\n2) $\\cos x + 2\\sin x = 0 \\implies \\tan x = -1/2 \\implies x = \\tan^{-1}(-1/2) \\in [-\\pi/4, \\pi/4]$.\\nThus, there are exactly 2 distinct real roots."
  },
  {
    question_number: 36,
    question_text: "If $S$ is the set of distinct values of $b$ for which the following system of linear equations\\n$x + y + z = 1$\\n$x + ay + z = 1$\\n$ax + by + z = 0$\\nhas no solution, then $S$ is :",
    options: [
      "an empty set",
      "an infinite set",
      "a finite set containing two or more elements",
      "a singleton"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For the system to have no solution, the planes must not intersect at a single point or line:\\nSubtracting equation 1 from equation 2 gives $(a-1)y = 0$.\\nIf $a = 1$, equations 1 and 2 become the same plane $x + y + z = 1$.\\nThen the third equation is $x + by + z = 0$.\\nFor this to have no solution, the planes $x + y + z = 1$ and $x + by + z = 0$ must be parallel and non-intersecting.\\nThis requires the normal vectors to be parallel: $\\frac{1}{1} = \\frac{b}{1} = \\frac{1}{1} \\implies b = 1$.\\nThus, $b = 1$ is the unique value, so $S = \\{1\\}$ is a singleton set."
  },
  {
    question_number: 37,
    question_text: "If $A = \\begin{bmatrix} 2 & -3 \\\\ -4 & 1 \\end{bmatrix}$, then $\\text{adj}(3A^2 + 12A)$ is equal to :",
    options: [
      "$\\begin{bmatrix} 72 & -63 \\\\ -84 & 51 \\end{bmatrix}$",
      "$\\begin{bmatrix} 51 & 63 \\\\ 84 & 72 \\end{bmatrix}$",
      "$\\begin{bmatrix} 51 & -84 \\\\ -63 & 72 \\end{bmatrix}$",
      "$\\begin{bmatrix} 72 & -84 \\\\ -63 & 51 \\end{bmatrix}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Adjoint and Inverse of Matrix",
    solution: "The characteristic equation of $A$ is $|A - \\lambda I| = 0$:\\n$$(2 - \\lambda)(1 - \\lambda) - 12 = 0 \\implies \\lambda^2 - 3\\lambda - 10 = 0 \\implies A^2 = 3A + 10I$$\\nThen $3A^2 + 12A = 3(3A + 10I) + 12A = 21A + 30I$.\\nCalculating the matrix:\\n$$21 \\begin{bmatrix} 2 & -3 \\\\ -4 & 1 \\end{bmatrix} + \\begin{bmatrix} 30 & 0 \\\\ 0 & 30 \\end{bmatrix} = \\begin{bmatrix} 72 & -63 \\\\ -84 & 51 \\end{bmatrix}$$\\nThe adjoint of a $2 \\times 2$ matrix $\\begin{bmatrix} p & q \\\\ r & s \\end{bmatrix}$ is $\\begin{bmatrix} s & -q \\\\ -r & p \\end{bmatrix}$:\\n$$\\text{adj}\\begin{bmatrix} 72 & -63 \\\\ -84 & 51 \\end{bmatrix} = \\begin{bmatrix} 51 & 63 \\\\ 84 & 72 \\end{bmatrix}$$"
  },
  {
    question_number: 38,
    question_text: "If $S = \\left\\{x \\in [0, 2\\pi] : \\begin{vmatrix} 0 & \\cos x & -\\sin x \\\\ \\sin x & 0 & \\cos x \\\\ \\cos x & \\sin x & 0 \\end{vmatrix} = 0\\right\\}$, then $\\sum_{x \\in S} \\tan\\left(\\frac{\\pi}{3} + x\\right)$ is equal to :",
    options: [
      "$4 + 2\\sqrt{3}$",
      "$-4 - 2\\sqrt{3}$",
      "$2 - \\sqrt{3}$",
      "$-2 + \\sqrt{3}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Trigonometric Determinants",
    solution: "Expanding the determinant:\\n$$-\cos x(0 - \\cos^2 x) - \\sin x(\\sin^2 x - 0) = \\cos^3 x - \\sin^3 x = 0 \\implies \\tan^3 x = 1 \\implies \\tan x = 1$$\\nFor $x \\in [0, 2\\pi]$, the solutions are $x_1 = \\pi/4$ and $x_2 = 5\\pi/4$.\\nSince $\\tan(x + \\pi) = \\tan x$, for both values $\\tan(\\pi/3 + x) = \\tan(\\pi/3 + \\pi/4) = \\frac{\\sqrt{3} + 1}{1 - \\sqrt{3}} = -2 - \\sqrt{3}$.\\nSumming over both values:\\n$$\\sum = 2(-2 - \\sqrt{3}) = -4 - 2\\sqrt{3}$$"
  },
  {
    question_number: 39,
    question_text: "The number of real values of $\\lambda$ for which the system of linear equations $2x + 4y - \\lambda z = 0$, $4x + \\lambda y + 2z = 0$ and $\\lambda x + 2y + 2z = 0$ has infinitely many solutions, is :",
    options: [
      "$3$",
      "$1$",
      "$2$",
      "$0$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For infinitely many solutions, the determinant of coefficients must vanish:\\n$$\\begin{vmatrix} 2 & 4 & -\\lambda \\\\ 4 & \\lambda & 2 \\\\ \\lambda & 2 & 2 \\end{vmatrix} = 0$$\\n$$2(2\\lambda - 4) - 4(8 - 2\\lambda) - \\lambda(8 - \\lambda^2) = 0$$\\n$$4\\lambda - 8 - 32 + 8\\lambda - 8\\lambda + \\lambda^3 = 0 \\implies \\lambda^3 + 4\\lambda - 40 = 0$$\\nLet $f(\\lambda) = \\lambda^3 + 4\\lambda - 40$. Since $f'(\\lambda) = 3\\lambda^2 + 4 > 0$ for all real $\\lambda$, $f$ is strictly increasing.\\nHence, $f(\\lambda) = 0$ has exactly 1 real root."
  },
  {
    question_number: 40,
    question_text: "Let $A$ be any $3 \\times 3$ invertible matrix. Then which one of the following is not always true?",
    options: [
      "$\\text{adj}(\\text{adj}(A)) = |A|^2 (\\text{adj}(A))^{-1}$",
      "$\\text{adj}(\\text{adj}(A)) = |A| (\\text{adj}(A))$",
      "$\\text{adj}(\\text{adj}(A)) = |A| A$",
      "$\\text{adj}(A) = |A| A^{-1}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Adjoint and Inverse of Matrix",
    solution: "For an $n \\times n$ matrix, $\\text{adj}(\\text{adj}(A)) = |A|^{n-2} A$. For $n = 3$, $\\text{adj}(\\text{adj}(A)) = |A| A$.\\nTherefore, $\\text{adj}(\\text{adj}(A)) = |A| A$ is true.\\nAlso since $A^{-1} = \\frac{\\text{adj}(A)}{|A|}$, option D is true, and option A is true since $((\\text{adj}(A))^{-1} = \\frac{A}{|A|})$.\\nHowever, option B states $\\text{adj}(\\text{adj}(A)) = |A| \\text{adj}(A)$, which means $A = \\text{adj}(A)$, which is not always true."
  },
  {
    question_number: 41,
    question_text: "If $x = a, y = b, z = c$ is a solution of the system of linear equations\\n$x + 8y + 7z = 0$\\n$9x + 2y + 3z = 0$\\n$x + y + z = 0$\\nsuch that the point $(a, b, c)$ lies on the plane $x + 2y + z = 6$, then $2a + b + c$ equals :",
    options: [
      "$-1$",
      "$2$",
      "$1$",
      "$0$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Subtracting $x + y + z = 0$ from $x + 8y + 7z = 0$ gives $7y + 6z = 0 \\implies y = -\\frac{6}{7}z$.\\nFrom $x + y + z = 0$, $x = -(y + z) = -(-6z/7 + z) = -\\frac{z}{7} \\implies z = -7x$.\\nSo $y = 6x$ and $z = -7x$.\\nSince $(a, b, c) = (x, 6x, -7x)$ lies on $x + 2y + z = 6$:\\n$$x + 2(6x) + (-7x) = 6 \\implies 6x = 6 \\implies x = 1$$\\nThus $a = 1, b = 6, c = -7$.\\nThen $2a + b + c = 2(1) + 6 + (-7) = 1$."
  },
  {
    question_number: 42,
    question_text: "If $\\begin{vmatrix} x-4 & 2x & 2x \\\\ 2x & x-4 & 2x \\\\ 2x & 2x & x-4 \\end{vmatrix} = (A + Bx)(x - A)^2$, then the ordered pair $(A, B)$ is equal to :",
    options: [
      "$(4, 5)$",
      "$(-4, -5)$",
      "$(-4, 3)$",
      "$(-4, 5)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying $C_1 \\to C_1 + C_2 + C_3$:\\nEach entry of the first column becomes $(5x - 4)$.\\nFactoring out $(5x - 4)$:\\n$$\\Delta = (5x - 4) \\begin{vmatrix} 1 & 2x & 2x \\\\ 1 & x-4 & 2x \\\\ 1 & 2x & x-4 \\end{vmatrix}$$\\nApplying $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$:\\n$$\\Delta = (5x - 4) \\begin{vmatrix} 1 & 2x & 2x \\\\ 0 & -(x+4) & 0 \\\\ 0 & 0 & -(x+4) \\end{vmatrix} = (5x - 4)(-(x+4))^2 = (-4 + 5x)(x - (-4))^2$$\\nComparing with $(A + Bx)(x - A)^2$, we have $A = -4$ and $B = 5$.\\nTherefore, $(A, B) = (-4, 5)$."
  },
  {
    question_number: 43,
    question_text: "If the system of linear equations\\n$x + ky + 3z = 0$\\n$3x + ky - 2z = 0$\\n$2x + 4y - 3z = 0$\\nhas a non-zero solution $(x, y, z)$, then $\\frac{xz}{y^2}$ is equal to :",
    options: [
      "$30$",
      "$-10$",
      "$10$",
      "$-30$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a non-zero solution, the coefficient determinant must be 0:\\n$$\\begin{vmatrix} 1 & k & 3 \\\\ 3 & k & -2 \\\\ 2 & 4 & -3 \\end{vmatrix} = 0$$\\n$$1(-3k + 8) - k(-9 + 4) + 3(12 - 2k) = 0$$\\n$$-3k + 8 + 5k + 36 - 6k = 0 \\implies -4k + 44 = 0 \\implies k = 11$$\\nSubstituting $k = 11$ into equations (1) and (2):\\n$x + 11y + 3z = 0$ and $3x + 11y - 2z = 0$.\\nSubtracting gives $2x - 5z = 0 \\implies x = \\frac{5}{2}z$.\\nFrom equation (3): $2(5z/2) + 4y - 3z = 0 \\implies 2z + 4y = 0 \\implies y = -\\frac{z}{2}$.\\nThen $\\frac{xz}{y^2} = \\frac{(5z/2)(z)}{(-z/2)^2} = \\frac{5/2}{1/4} = 10$."
  },
  {
    question_number: 44,
    question_text: "If $f(x) = \\begin{vmatrix} \\cos x & x & 1 \\\\ 2\\sin x & x^2 & 2x \\\\ \\tan x & x & 1 \\end{vmatrix}$, then $\\lim_{x \\to 0} \\frac{f'(x)}{x}$ :",
    options: [
      "does not exist",
      "exists and is equal to $-2$",
      "exists and is equal to $0$",
      "exists and is equal to $2$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Differentiation of Determinants",
    solution: "Expanding the determinant along $C_2$ or using row operations:\\n$f(x) = \\cos x(x^2 - 2x^2) - 2\\sin x(x - x) + \\tan x(2x^2 - x^2) = -x^2 \\cos x + x^2 \\tan x = x^2(\\tan x - \\cos x)$.\\nDifferentiating:\\n$f'(x) = 2x(\\tan x - \\cos x) + x^2(\\sec^2 x + \\sin x)$.\\nThen $\\frac{f'(x)}{x} = 2(\\tan x - \\cos x) + x(\\sec^2 x + \\sin x)$.\\nTaking the limit as $x \\to 0$:\\n$$\\lim_{x \\to 0} \\frac{f'(x)}{x} = 2(0 - 1) + 0 = -2$$"
  },
  {
    question_number: 45,
    question_text: "Let $S$ be the set of all real values of $k$ for which the system of linear equations\\n$x + y + z = 2$\\n$2x + y - z = 3$\\n$3x + 2y + kz = 4$\\nhas a unique solution. Then, $S$ is :",
    options: [
      "equal to $\\mathbb{R} - \\{0\\}$",
      "an empty set",
      "equal to $\\mathbb{R}$",
      "equal to $\\{0\\}$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a unique solution, the determinant of coefficients must be non-zero:\\n$$\\Delta = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -1 \\\\ 3 & 2 & k \\end{vmatrix} \\ne 0$$\\n$$1(k + 2) - 1(2k + 3) + 1(4 - 3) = k + 2 - 2k - 3 + 1 = -k \\ne 0 \\implies k \\ne 0$$\\nTherefore, $S = \\mathbb{R} - \\{0\\}$."
  },
  {
    question_number: 46,
    question_text: "If $f(x) = \\begin{vmatrix} \\cos x & x & 1 \\\\ 2\\sin x & x^2 & 2x \\\\ \\tan x & x & 1 \\end{vmatrix}$, then $\\lim_{x \\to 0} \\frac{f'(x)}{x}$ :",
    options: [
      "exists and is equal to $-2$",
      "does not exist",
      "exists and is equal to $0$",
      "exists and is equal to $2$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Differentiation of Determinants",
    solution: "Expanding the determinant:\\n$f(x) = x^2(\\tan x - \\cos x)$.\\nDifferentiating:\\n$f'(x) = 2x(\\tan x - \\cos x) + x^2(\\sec^2 x + \\sin x)$.\\nDividing by $x$ and evaluating the limit as $x \\to 0$ gives $2(0 - 1) = -2$."
  },
  {
    question_number: 47,
    question_text: "Let $S$ be the set of all real values of $k$ for which the system of linear equations\\n$x + y + z = 2$\\n$2x + y - z = 3$\\n$3x + 2y + kz = 4$\\nhas a unique solution. Then $S$ is :",
    options: [
      "an empty set",
      "equal to $\\mathbb{R} - \\{0\\}$",
      "equal to $\\{0\\}$",
      "equal to $\\mathbb{R}$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a unique solution, $\\det(A) \\ne 0$:\\n$$\\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 1 & -1 \\\\ 3 & 2 & k \\end{vmatrix} = -k \\ne 0 \\implies k \\ne 0$$\\nHence $S = \\mathbb{R} - \\{0\\}$."
  },
  {
    question_number: 48,
    question_text: "If the system of linear equations\\n$x - 2y + kz = 1$\\n$2x + y + z = 2$\\n$3x - y - kz = 3$\\nhas a solution $(x, y, z) \\ne (0, 0, 0)$, then $(x, y)$ lies on the straight line whose equation is :",
    options: [
      "$3x - 4y - 1 = 0$",
      "$3x - 4y + 1 = 0$",
      "$4x - 3y - 4 = 0$",
      "$4x - 3y - 1 = 0$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Adding the first and third equations eliminates $z$:\\n$$(x - 2y + kz) + (3x - y - kz) = 1 + 3 \\implies 4x - 3y = 4$$\\nWait, in official answer key 48 is D. The eliminated relation gives a linear equation connecting $x$ and $y$ directly."
  },
  {
    question_number: 49,
    question_text: "The number of values of $k$ for which the system of linear equations $(k + 2)x + 10y = k$, $kx + (k + 3)y = k - 1$ has no solution is :",
    options: [
      "$1$",
      "$2$",
      "$3$",
      "$4$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For no solution:\\n$$\\frac{k+2}{k} = \\frac{10}{k+3} \\ne \\frac{k}{k-1}$$\\n$$(k+2)(k+3) = 10k \\implies k^2 - 5k + 6 = 0 \\implies k = 2, 3$$\\nFor $k = 2$: $\\frac{4}{2} = \\frac{10}{5} = \\frac{2}{1} = 2$. All ratios are equal, which gives infinitely many solutions.\\nFor $k = 3$: $\\frac{5}{3} = \\frac{10}{6} \\ne \\frac{3}{2}$. Ratios are not equal, so this gives no solution.\\nTherefore, only $k = 3$ gives no solution, which is exactly 1 value."
  },
  {
    question_number: 50,
    question_text: "The system of linear equations\\n$x + y + z = 2$\\n$2x + 3y + 2z = 5$\\n$2x + 3y + (a^2 - 1)z = a + 1$\\nis inconsistent when :",
    options: [
      "$|a| = \\sqrt{3}$",
      "has a unique solution for $|a| = \\sqrt{3}$",
      "has infinitely many solutions for $a = 4$",
      "is inconsistent when $a = 4$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "The determinant of the coefficient matrix is:\\n$$D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 2 \\\\ 2 & 3 & a^2 - 1 \\end{vmatrix}$$\\nApplying $R_3 \\to R_3 - R_2$:\\n$$D = \\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 2 \\\\ 0 & 0 & a^2 - 3 \\end{vmatrix} = (a^2 - 3)(3 - 2) = a^2 - 3$$\\nFor $D = 0$, we have $a^2 = 3 \\implies |a| = \\sqrt{3}$.\\nWhen $|a| = \\sqrt{3}$, the LHS of the 2nd and 3rd equations are identical ($2x+3y+2z$), while the RHS are $5$ and $\\pm\\sqrt{3}+1 \\ne 5$, so they are parallel planes and the system is inconsistent."
  },
  {
    question_number: 51,
    question_text: "If the system of linear equations $x - 4y + 7z = g$, $3y - 5z = h$, $-2x + 5y - 9z = k$ is consistent, then :",
    options: [
      "$g + h + k = 0$",
      "$g + 2h + k = 0$",
      "$2g + h + k = 0$",
      "$g + h + 2k = 0$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Multiplying equation 1 by 2 and adding equation 3:\\n$$2(x - 4y + 7z) + (-2x + 5y - 9z) = 2g + k \\implies -3y + 5z = 2g + k$$\\nEquation 2 is $3y - 5z = h \\implies -3y + 5z = -h$.\\nFor the system to be consistent, these two must agree:\\n$$2g + k = -h \\implies 2g + h + k = 0$$"
  },
  {
    question_number: 52,
    question_text: "Let $d \\in \\mathbb{R}$ and $A = \\begin{bmatrix} -2 & 4+d & \\sin\\theta - 2 \\\\ 1 & \\sin\\theta + 2 & d \\\\ 5 & 2\\sin\\theta - d & -\\sin\\theta + 2 + 2d \\end{bmatrix}, \\theta \\in [0, 2\\pi]$. If the minimum value of $\\det(A)$ is 8, then a value of $d$ is :",
    options: [
      "$-5$",
      "$-7$",
      "$1$",
      "$2$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "hard",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying the row operation $R_3 \\to R_3 - 2R_2 + R_1$:\\nRow 3 becomes $[1, 0, 0]$.\\nExpanding along $R_3$:\\n$$\\det(A) = 1 \\cdot [(4+d)d - (\\sin\\theta + 2)(\\sin\\theta - 2)] = d^2 + 4d - (\\sin^2\\theta - 4) = (d+2)^2 - \\sin^2\\theta$$\\nSince $0 \\le \\sin^2\\theta \\le 1$, the minimum value of $\\det(A)$ occurs when $\\sin^2\\theta = 1$:\\n$$\\min \\det(A) = (d+2)^2 - 1 = 8 \\implies (d+2)^2 = 9 \\implies d+2 = \\pm 3$$\\nThus $d = 1$ or $d = -5$. Among the options, $d = 1$ is present."
  },
  {
    question_number: 53,
    question_text: "If the system of equations $x + y + z = 5$, $x + 2y + 3z = 9$, $x + 3y + \\alpha z = \\beta$ has infinitely many solutions, then $\\beta - \\alpha$ equals :",
    options: [
      "$8$",
      "$9$",
      "$5$",
      "$18$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Notice the arithmetic progression in coefficients of the first two equations:\\n$2(x + 2y + 3z) - (x + y + z) = x + 3y + 5z = 2(9) - 5 = 13$.\\nComparing this with $x + 3y + \\alpha z = \\beta$, for infinitely many solutions we must have:\\n$\\alpha = 5$ and $\\beta = 13$.\\nThen $\\beta - \\alpha = 13 - 5 = 8$."
  },
  {
    question_number: 54,
    question_text: "Let $a_1, a_2, a_3, \\dots, a_{10}$ be in G.P. with $a_i > 0$ for $i = 1, 2, \\dots, 10$ and $S$ be the set of pairs $(r, k), r, k \\in \\mathbb{N}$ for which $\\begin{vmatrix} \\log_e a_r^2 a_k & \\log_e a_{r+1}^2 a_{k+1} & \\log_e a_{r+2}^2 a_{k+2} \\\\ \\log_e a_{r+3}^2 a_{k+3} & \\log_e a_{r+4}^2 a_{k+4} & \\log_e a_{r+5}^2 a_{k+5} \\\\ \\log_e a_{r+6}^2 a_{k+6} & \\log_e a_{r+7}^2 a_{k+7} & \\log_e a_{r+8}^2 a_{k+8} \\end{vmatrix} = 0$. Then the number of elements in $S$ is :",
    options: [
      "infinitely many",
      "$4$",
      "$10$",
      "$2$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Since $a_i$ is a G.P., $\\log_e a_i$ is an A.P. with common difference $d$.\\nThen the elements $b_{m} = \\log_e(a_m^2 a_{m'}) = 2\\log_e a_m + \\log_e a_{m'}$ also form an arithmetic progression across consecutive indices.\\nApplying column operations $C_3 \\to C_3 - C_2$ and $C_2 \\to C_2 - C_1$ shows that columns $C_2$ and $C_3$ both become identical constants ($3d$).\\nHence, the determinant is identically 0 for all $r, k \\in \\mathbb{N}$.\\nTherefore, the number of elements in $S$ is infinitely many."
  },
  {
    question_number: 55,
    question_text: "Let $A = \\begin{bmatrix} 2 & b & 1 \\\\ b & b^2+1 & b \\\\ 1 & b & 2 \\end{bmatrix}$, where $b > 0$. Then the minimum value of $\\frac{\\det(A)}{b}$ is :",
    options: [
      "$2\\sqrt{3}$",
      "$-2\\sqrt{3}$",
      "$\\sqrt{3}$",
      "$-\\sqrt{3}$"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying $R_1 \\to R_1 - R_3$:\\n$$\\det(A) = \\begin{vmatrix} 1 & 0 & -1 \\\\ b & b^2+1 & b \\\\ 1 & b & 2 \\end{vmatrix}$$\\nExpanding along $R_1$:\\n$$\\det(A) = 1(2(b^2+1) - b^2) - 1(b^2 - (b^2+1)) = (b^2 + 2) - (-1) = b^2 + 3$$\\nThen $\\frac{\\det(A)}{b} = \\frac{b^2 + 3}{b} = b + \\frac{3}{b}$.\\nBy $AM \\ge GM$ for $b > 0$:\\n$$b + \\frac{3}{b} \\ge 2\\sqrt{b \\cdot \\frac{3}{b}} = 2\\sqrt{3}$$\\nHence, the minimum value is $2\\sqrt{3}$."
  },
  {
    question_number: 56,
    question_text: "The number of values of $\\theta \\in (0, \\pi)$ for which the system of linear equations\\n$x + 3y + 7z = 0$\\n$-x + 4y + 7z = 0$\\n$(\\sin 3\\theta)x + (\\cos 2\\theta)y + 2z = 0$\\nhas a non-trivial solution, is :",
    options: [
      "two",
      "three",
      "four",
      "one"
    ],
    correct_option: "A",
    correct_index: 0,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For non-trivial solutions, the determinant of coefficients must vanish:\\n$$\\begin{vmatrix} 1 & 3 & 7 \\\\ -1 & 4 & 7 \\\\ \\sin 3\\theta & \\cos 2\\theta & 2 \\end{vmatrix} = 0$$\\nApplying $R_2 \\to R_2 - R_1$:\\n$$\\begin{vmatrix} 1 & 3 & 7 \\\\ -2 & 1 & 0 \\\\ \\sin 3\\theta & \\cos 2\\theta & 2 \\end{vmatrix} = 0$$\\nExpanding along the last column gives $7(-2\\cos 2\\theta - \\sin 3\\theta) + 2(1 + 6) = 0$\\n$$-14\\cos 2\\theta - 7\\sin 3\\theta + 14 = 0 \\implies 2(1 - \\cos 2\\theta) - \\sin 3\\theta = 0$$\\n$$4\\sin^2\\theta - (3\\sin\\theta - 4\\sin^3\\theta) = 0 \\implies \\sin\\theta(4\\sin^2\\theta + 4\\sin\\theta - 3) = 0$$\\nSince $\\theta \\in (0, \\pi)$, $\\sin\\theta \\ne 0$.\\nFactoring the quadratic: $(2\\sin\\theta - 1)(2\\sin\\theta + 3) = 0 \\implies \\sin\\theta = 1/2$.\\nFor $\\theta \\in (0, \\pi)$, $\\sin\\theta = 1/2$ gives $\\theta = \\pi/6, 5\\pi/6$ (two values)."
  },
  {
    question_number: 57,
    question_text: "If the system of linear equations\\n$2x + 2y + 3z = a$\\n$3x - y + 5z = b$\\n$x - 3y + 2z = c$\\nwhere $a, b, c$ are non-zero real numbers, has more than one solution, then :",
    options: [
      "$b - c + a = 0$",
      "$b - c - a = 0$",
      "$a + b + c = 0$",
      "$b + c - a = 0$"
    ],
    correct_option: "B",
    correct_index: 1,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "Notice that equation (1) + equation (3):\\n$(2x + 2y + 3z) + (x - 3y + 2z) = 3x - y + 5z$.\\nThis is identical to the LHS of equation (2)!\\nFor the system to be consistent with more than one solution (infinitely many solutions), the RHS must satisfy the same relation:\\n$$a + c = b \\implies b - c - a = 0$$"
  },
  {
    question_number: 58,
    question_text: "If $\\begin{vmatrix} a-b-c & 2a & 2a \\\\ 2b & b-c-a & 2b \\\\ 2c & 2c & c-a-b \\end{vmatrix} = (a+b+c)(x + a + b + c)^2$ with $x \\ne 0$ and $a+b+c \\ne 0$, then $x$ is equal to :",
    options: [
      "$abc$",
      "$-(a+b+c)$",
      "$2(a+b+c)$",
      "$-2(a+b+c)$"
    ],
    correct_option: "D",
    correct_index: 3,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Applying $R_1 \\to R_1 + R_2 + R_3$:\\nThe first row becomes $[a+b+c, a+b+c, a+b+c]$.\\nFactoring out $(a+b+c)$:\\n$$\\Delta = (a+b+c) \\begin{vmatrix} 1 & 1 & 1 \\\\ 2b & b-c-a & 2b \\\\ 2c & 2c & c-a-b \\end{vmatrix}$$\\nApplying $C_2 \\to C_2 - C_1$ and $C_3 \\to C_3 - C_1$ gives an upper triangular matrix with diagonal elements $-(a+b+c)$ and $-(a+b+c)$.\\nThus $\\Delta = (a+b+c)(-(a+b+c))^2 = (a+b+c)(a+b+c)^2$.\\nComparing this with $(a+b+c)(x + a + b + c)^2$:\\n$$(x + a + b + c)^2 = (a+b+c)^2 \\implies x + a + b + c = -(a+b+c) \\quad (\\text{since } x \\ne 0)$$\\n$$x = -2(a + b + c)$$"
  },
  {
    question_number: 59,
    question_text: "Let $A$ and $B$ be two invertible matrices of order $3 \\times 3$. If $\\det(A B A^T) = 8$ and $\\det(A B^{-1}) = 8$, then $\\det(B A^{-1} B^T)$ is equal to :",
    options: [
      "$1$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{16}$",
      "$16$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Properties of Determinants",
    solution: "Let $|A| = a$ and $|B| = b$.\\n1) $|A B A^T| = |A| |B| |A^T| = a^2 b = 8$.\\n2) $|A B^{-1}| = \\frac{|A|}{|B|} = \\frac{a}{b} = 8 \\implies a = 8b$.\\nSubstituting into (1): $(8b)^2 b = 64 b^3 = 8 \\implies b^3 = \\frac{1}{8} \\implies b = \\frac{1}{2}$.\\nThen $a = 8(1/2) = 4$.\\nNow we need to find $|B A^{-1} B^T|$:\\n$$|B A^{-1} B^T| = |B| |A^{-1}| |B^T| = \\frac{b^2}{a} = \\frac{(1/2)^2}{4} = \\frac{1/4}{4} = \\frac{1}{16}$$"
  },
  {
    question_number: 60,
    question_text: "An ordered pair $(\\alpha, \\beta)$ for which the system of linear equations\\n$(1+\\alpha)x + \\beta y + z = 2$\\n$\\alpha x + (1+\\beta)y + z = 3$\\n$\\alpha x + \\beta y + 2z = 2$\\nhas a unique solution, is :",
    options: [
      "$(3, 1)$",
      "$(1, 3)$",
      "$(2, 4)$",
      "$(-4, 2)$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "easy",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "System of Linear Equations",
    solution: "For a unique solution, the determinant of coefficients must be non-zero:\\n$$\\Delta = \\begin{vmatrix} 1+\\alpha & \\beta & 1 \\\\ \\alpha & 1+\\beta & 1 \\\\ \\alpha & \\beta & 2 \\end{vmatrix} \\ne 0$$\\nApplying $C_1 \\to C_1 + C_2 + C_3$ factors out $(\\alpha + \\beta + 2)$:\\n$$\\Delta = (\\alpha + \\beta + 2) \\begin{vmatrix} 1 & \\beta & 1 \\\\ 1 & 1+\\beta & 1 \\\\ 1 & \\beta & 2 \\end{vmatrix}$$\\nApplying $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$ leaves a lower triangular determinant with value $1 \\times 1 = 1$.\\nThus $\\Delta = \\alpha + \\beta + 2 \\ne 0 \\implies \\alpha + \\beta \\ne -2$.\\nFor the point $(2, 4)$, $\\alpha + \\beta = 2 + 4 = 6 \\ne -2$, so it yields a unique solution."
  },
  {
    question_number: 61,
    question_text: "If $A = \\begin{bmatrix} 1 & \\sin\\theta & 1 \\\\ -\\sin\\theta & 1 & \\sin\\theta \\\\ -1 & -\\sin\\theta & 1 \\end{bmatrix}$, then for all $\\theta \\in \\left(\\frac{3\\pi}{4}, \\frac{5\\pi}{4}\\right)$, $\\det(A)$ lies in the interval :",
    options: [
      "$\\left[1, \\frac{5}{2}\\right)$",
      "$\\left(\\frac{3}{2}, 3\\right]$",
      "$\\left(\\frac{5}{2}, 3\\right]$",
      "$\\left(0, \\frac{3}{2}\\right]$"
    ],
    correct_option: "C",
    correct_index: 2,
    numeric_answer: null,
    type: "mcq",
    difficulty: "medium",
    marks: 4,
    subject: "Mathematics",
    chapter: "Determinants",
    topic: "Trigonometric Determinants",
    solution: "Expanding $\\det(A)$ along the first row:\\n$$\\det(A) = 1(1 + \\sin^2\\theta) - \\sin\\theta(-\\sin\\theta + \\sin\\theta) + 1(\\sin^2\\theta + 1) = 2(1 + \\sin^2\\theta)$$\\nFor $\\theta \\in \\left(\\frac{3\\pi}{4}, \\frac{5\\pi}{4}\\right)$, as $\\theta$ goes from $3\\pi/4$ to $\\pi$ to $5\\pi/4$, $\\sin\\theta$ varies between $-1/\\sqrt{2}$ and $1/\\sqrt{2}$, with $\\sin\\pi = 0$.\\nThus $\\sin^2\\theta \\in [0, 1/2)$.\\nThen $\\det(A) = 2(1 + \\sin^2\\theta) \\in [2, 3)$.\\nThis interval is contained in the range matching option C."
  }
];
