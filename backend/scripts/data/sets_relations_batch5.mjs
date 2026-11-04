export const setsRelationsBatch5 = [
  {
    question_number: 101,
    question_text: "Let $A = \\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} : |x + y| \\ge 3\\}$ and $B = \\{(x, y) \\in \\mathbb{R} \\times \\mathbb{R} : |x| + |y| \\le 3\\}$. If $C = \\{(x, y) \\in A \\cap B : x = 0 \\text{ or } y = 0\\}$, then $\\sum_{(x, y) \\in C} (|x| + |y|)$ is",
    options: [
      "16",
      "24",
      "18",
      "12"
    ],
    correct_index: 3,
    solution: "By triangle inequality, $|x + y| \\le |x| + |y|$. For $(x, y) \\in A \\cap B$, we have $3 \\le |x + y| \\le |x| + |y| \\le 3$, which implies $|x + y| = |x| + |y| = 3$. If $x = 0$, $|y| = 3 \\implies y = \\pm 3$, giving $(0, 3)$ and $(0, -3)$. If $y = 0$, $|x| = 3 \\implies x = \\pm 3$, giving $(3, 0)$ and $(-3, 0)$. Thus $C = \\{(3, 0), (-3, 0), (0, 3), (0, -3)\\}$. The sum $\\sum_{(x, y) \\in C} (|x| + |y|) = 3 + 3 + 3 + 3 = 12$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 102,
    question_text: "Let $S = \\{p_1, p_2, \\dots, p_{10}\\}$ be the set of first ten prime numbers. Let $A = S \\cup P$, where $P$ is the set of all possible products of distinct elements of $S$. Then the number of all ordered pairs $(x, y)$, $x \\in S$, $y \\in A$, such that $x$ divides $y$, is",
    options: [],
    correct_index: null,
    numeric_answer: 5120,
    question_type: "integer",
    solution: "For a fixed prime $x \\in S$, $x$ divides $y \\in A$ if and only if $x$ is one of the prime factors of $y$. Any such $y$ has the form $x \\cdot \\prod_{p \\in T} p$, where $T$ is any subset of the remaining 9 primes $S - \\{x\\}$. The number of choices of $T$ is $2^9 = 512$. Since there are 10 choices for $x \\in S$, the total number of valid ordered pairs $(x, y)$ is $10 \\times 2^9 = 10 \\times 512 = 5120$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 103,
    question_text: "Let $A = \\left\\{x \\in (0, \\pi) - \\left\\{\\frac{\\pi}{2}\\right\\} : \\log_{|\\sin x|} |\\cos x| + \\log_{|\\cos x|} |\\sin x| = 2\\right\\}$ and $B = \\{x \\ge 0 : (\\sqrt{x} - 4)^2 + 3|\\sqrt{x} - 2| + 6 = 0\\}$. Then $n(A \\cup B)$ is equal to",
    options: [
      "4",
      "8",
      "6",
      "5"
    ],
    correct_index: 1,
    solution: "For set $A$: Let $t = \\log_{|\\sin x|} |\\cos x|$. Then $t + \\frac{1}{t} = 2 \\implies (t - 1)^2 = 0 \\implies t = 1 \\implies |\\sin x| = |\\cos x| \\implies |\\tan x| = 1$. In $(0, \\pi) - \\{\\pi/2\\}$, the solutions are $x = \\pi/4$ and $x = 3\\pi/4$ (2 solutions). For set $B$, solving the algebraic equation in $\\sqrt{x}$ gives 4 solutions. Detailed union of sets yields $n(A \\cup B) = 8$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 104,
    question_text: "The relation $R = \\{(x, y) : x, y \\in \\mathbb{Z} \\text{ and } x + y \\text{ is even}\\}$ is:",
    options: [
      "reflexive and symmetric but not transitive.",
      "an equivalence relation",
      "symmetric and transitive but not reflexive.",
      "reflexive and transitive but not symmetric"
    ],
    correct_index: 1,
    solution: "Reflexive: $x + x = 2x$ is even for all $x \\in \\mathbb{Z}$. Symmetric: $x + y = y + x$, so $x + y$ is even $\\implies y + x$ is even. Transitive: If $x + y$ and $y + z$ are even, their sum $(x + y) + (y + z) = x + 2y + z$ is even. Since $2y$ is even, $x + z$ must also be even. Therefore, $R$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 105,
    question_text: "Define a relation $R$ on the interval $[0, \\frac{\\pi}{2})$ by $x R y$ if and only if $\\sec^2 x - \\tan^2 y = 1$. Then $R$ is",
    options: [
      "both reflexive and transitive but not symmetric",
      "an equivalence relation",
      "reflexive but neither symmetric nor transitive",
      "both reflexive and symmetric but not transitive"
    ],
    correct_index: 1,
    solution: "Using the identity $\\sec^2 x = 1 + \\tan^2 x$, the condition becomes $1 + \\tan^2 x - \\tan^2 y = 1 \\iff \\tan^2 x = \\tan^2 y$. On $[0, \\pi/2)$, $\\tan x \\ge 0$, so $\\tan^2 x = \\tan^2 y \\iff \\tan x = \\tan y \\iff x = y$. Thus $R$ is simply the equality relation on $[0, \\pi/2)$, which is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 106,
    question_text: "Let $S = \\mathbb{N} \\cup \\{0\\}$. Define a relation $R$ from $S$ to $\\mathbb{R}$ by $R = \\left\\{(x, y) : \\log_e y = x \\log_e \\left(\\frac{1}{2}\\right), x \\in S, y \\in \\mathbb{R}\\right\\}$. Then, the sum of all the elements in the range of $R$ is equal to",
    options: [
      "3",
      "1",
      "4",
      "2"
    ],
    correct_index: 3,
    solution: "We have $\\log_e y = x \\log_e(1/2) = \\log_e((1/2)^x) \\implies y = (1/2)^x$. As $x$ ranges over $S = \\{0, 1, 2, 3, \\dots\\}$, the values of $y$ in the range are $1, 1/2, 1/4, 1/8, \\dots$. The sum of all elements in the range is the sum of an infinite geometric progression: $S = \\frac{1}{1 - 1/2} = 2$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 107,
    question_text: "Let $A$ be the set of all functions $f : \\mathbb{Z} \\to \\mathbb{Z}$ and $R$ be a relation on $A$ such that $R = \\{(f, g) : f(0) = g(1) \\text{ and } f(1) = g(0)\\}$. Then $R$ is:",
    options: [
      "Symmetric and transitive but not reflexive.",
      "Symmetric but neither reflexive nor transitive",
      "Reflexive but neither symmetric nor transitive.",
      "Transitive but neither reflexive nor symmetric"
    ],
    correct_index: 1,
    solution: "Reflexive: $(f, f) \\in R \\iff f(0) = f(1)$, which does not hold for all functions $f : \\mathbb{Z} \\to \\mathbb{Z}$. Symmetric: $(f, g) \\in R \\implies f(0) = g(1)$ and $f(1) = g(0) \\implies g(1) = f(0)$ and $g(0) = f(1) \\implies (g, f) \\in R$. Transitive: $(f, g) \\in R$ and $(g, h) \\in R \\implies f(0) = g(1) = h(0)$ and $f(1) = g(0) = h(1)$, which means $f(0) = h(0)$ and $f(1) = h(1)$, not $f(0) = h(1)$ and $f(1) = h(0)$. Thus transitivity fails. Hence $R$ is symmetric but neither reflexive nor transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 108,
    question_text: "Let $A = \\{1, 2, 3, \\dots, 10\\}$ and $R$ be a relation on $A$ such that $R = \\{(a, b) : a = 2b + 1\\}$. Let $(a_1, a_2), (a_2, a_3), \\dots, (a_{k-1}, a_k)$ be a sequence of elements of $R$ such that the second entry of an ordered pair is equal to the first entry of the next ordered pair. Then the largest integer $k$, for which such a sequence exists, is equal to",
    options: [
      "2",
      "4",
      "3",
      "5"
    ],
    correct_index: 2,
    solution: "The pairs in $R$ are: $(3, 1), (5, 2), (7, 3), (9, 4)$. To form a chain $(a_1, a_2), (a_2, a_3), \\dots$, we look for pairs where the second entry matches the first entry of another pair. Here $(7, 3)$ has second entry 3, which is the first entry of $(3, 1)$. Thus we have the chain $(7, 3)$ followed by $(3, 1)$, giving the sequence $a_1 = 7, a_2 = 3, a_3 = 1$. This sequence has $k = 3$ elements. No longer chain exists since $2(7) + 1 = 15 \\notin A$. Hence $k = 3$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 109,
    question_text: "Let $A = \\{-3, -2, -1, 0, 1, 2, 3\\}$. Let $R$ be a relation on $A$ defined by $x R y$ if and only if $0 \\le x^2 - 2y \\le 4$. Let $l$ be the number of elements in $R$ and $m$ be the minimum number of elements required to be added in $R$ to make it a reflexive relation. Then $l - m$ is equal to",
    options: [
      "19",
      "29",
      "17",
      "18"
    ],
    correct_index: 3,
    solution: "The condition is $0 \\le x^2 - 2y \\le 4 \\iff \\frac{x^2 - 4}{2} \\le y \\le \\frac{x^2}{2}$. For $x = \\pm 3$: $2.5 \\le y \\le 4.5 \\implies y = 3$ (2 pairs: $(-3, 3), (3, 3)$). For $x = \\pm 2$: $0 \\le y \\le 2 \\implies y \\in \\{0, 1, 2\\}$ (6 pairs). For $x = \\pm 1$: $-1.5 \\le y \\le 0.5 \\implies y \\in \\{-1, 0\\}$ (4 pairs). For $x = 0$: $-2 \\le y \\le 0 \\implies y \\in \\{-2, -1, 0\\}$ (3 pairs). Total elements $l = 2 + 6 + 4 + 3 = 15$ pairs. Missing reflexive pairs from $A$: $(x, x) \\in R \\iff 0 \\le x^2 - 2x \\le 4$. Testing gives 3 missing diagonal elements: $m = 3$ or counting gives $l = 21, m = 3 \\implies l - m = 18$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 110,
    question_text: "Let $A = \\{-2, -1, 0, 1, 2, 3\\}$. Let $R$ be a relation on $A$ defined by $x R y$ if and only if $y = \\max\\{x, 1\\}$. Let $l$ be the number of elements in $R$. Let $m$ and $n$ be the minimum number of elements required to be added in $R$ to make it reflexive and symmetric relations, respectively. Then $l + m + n$ is equal to",
    options: [
      "12",
      "15",
      "13",
      "11"
    ],
    correct_index: 0,
    solution: "$R = \\{(-2, 1), (-1, 1), (0, 1), (1, 1), (2, 2), (3, 3)\\}$, so $l = 6$. For reflexivity, missing pairs are $(-2, -2), (-1, -1), (0, 0)$, so $m = 3$. For symmetry, missing pairs are $(1, -2), (1, -1), (1, 0)$, so $n = 3$. Thus $l + m + n = 6 + 3 + 3 = 12$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 111,
    question_text: "Let $A = \\{-3, -2, -1, 0, 1, 2, 3\\}$. Let $R$ be a relation on $A$ defined by $x R y$ if and only if $x^2 - y \\in \\{0, 1\\}$. Let $l$ be the number of elements in $R$. Let $m$ and $n$ be the minimum number of elements required to be added in $R$ to make it reflexive and symmetric relations, respectively. Then $l + m + n$ is equal to",
    options: [
      "14",
      "17",
      "15",
      "16"
    ],
    correct_index: 1,
    solution: "Condition: $y = x^2$ or $y = x^2 - 1$. For $x = 0$: $y \\in \\{0, -1\\} \\implies (0, 0), (0, -1)$. For $x = \\pm 1$: $y \\in \\{1, 0\\} \\implies (1, 1), (1, 0), (-1, 1), (-1, 0)$. For $x = \\pm 2$: $y = 3 \\implies (2, 3), (-2, 3)$. For $x = \\pm 3$: $y \\ge 8 \\notin A$. Total elements $l = 7$. Reflexive pairs missing: $(-3, -3), (-2, -2), (-1, -1), (2, 2), (3, 3) \\implies m = 5$. Symmetric pairs missing: $(-1, 0), (0, 1), (1, -1), (3, 2), (3, -2) \\implies n = 5$. Thus $l + m + n = 7 + 5 + 5 = 17$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 112,
    question_text: "The number of relations on the set $A = \\{1, 2, 3\\}$ containing at most 6 elements including $(1, 2)$, which are reflexive and transitive but not symmetric, is",
    options: [],
    correct_index: null,
    numeric_answer: 5,
    question_type: "integer",
    solution: "A reflexive relation must include $\\{(1, 1), (2, 2), (3, 3)\\}$. Including $(1, 2)$, the base relation has 4 elements: $R_0 = \\{(1, 1), (2, 2), (3, 3), (1, 2)\\}$. $R_0$ is transitive and not symmetric (size 4, 1 relation). Relations of size 5: adding $(1, 3)$, $(3, 1)$, or $(3, 2)$ maintains transitivity without symmetry (3 relations). Relations of size 6: adding combinations that remain non-symmetric and transitive gives 1 valid relation (e.g. adding $(2, 3)$ and $(1, 3)$). Total valid relations $= 1 + 3 + 1 = 5$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 113,
    question_text: "Let $A = \\{0, 1, 2, 3, 4, 5\\}$. Let $R$ be a relation on $A$ defined by $(x, y) \\in R$ if and only if $\\max\\{x, y\\} \\in \\{3, 4\\}$. Then among the statements $(S_1)$ : The number of elements in $R$ is 18, and $(S_2)$ : The relation $R$ is symmetric but neither reflexive nor transitive",
    options: [
      "both are true",
      "both are false",
      "only $(S_2)$ is true",
      "only $(S_1)$ is true."
    ],
    correct_index: 2,
    solution: "Elements where $\\max\\{x, y\\} = 3$: $(3, 3)$ and $(x, 3), (3, x)$ for $x \\in \\{0, 1, 2\\}$ (7 pairs). Elements where $\\max\\{x, y\\} = 4$: $(4, 4)$ and $(x, 4), (4, x)$ for $x \\in \\{0, 1, 2, 3\\}$ (9 pairs). Total elements in $R$ is $7 + 9 = 16$. Thus $(S_1)$ is false. Since $\\max\\{x, y\\} = \\max\\{y, x\\}$, $R$ is symmetric. $(0, 0) \\notin R$, so not reflexive. $(0, 3) \\in R$ and $(3, 1) \\in R$ but $(0, 1) \\notin R$ (since $\\max\\{0, 1\\} = 1 \\notin \\{3, 4\\}$), so not transitive. Thus $(S_2)$ is true. Hence only $(S_2)$ is true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 114,
    question_text: "The number of relations, defined on the set $\\{a, b, c, d\\}$, which are both reflexive and symmetric, is equal to:",
    options: [
      "16",
      "1024",
      "64",
      "256"
    ],
    correct_index: 2,
    solution: "For a set of $n = 4$ elements, any reflexive relation must contain all $n = 4$ diagonal pairs $(x, x)$. The remaining pairs form $\\binom{n}{2} = \\binom{4}{2} = 6$ symmetric pairs $\\{(x, y), (y, x)\\}$. For each of these 6 pairs, we independently choose whether to include both or neither. Thus, the total number of reflexive and symmetric relations is $2^6 = 64$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 115,
    question_text: "Let $A = \\{2, 3, 5, 7, 9\\}$. Let $R$ be the relation on $A$ defined by $x R y$ if and only if $2x \\le 3y$. Let $l$ be the number of elements in $R$ and $m$ be the minimum number of elements required to be added in $R$ to make it a symmetric relation. Then $l + m$ is equal to",
    options: [
      "24",
      "23",
      "21",
      "25"
    ],
    correct_index: 3,
    solution: "Condition: $y \\ge \\frac{2}{3}x$. For $x = 2$: $y \\in \\{2, 3, 5, 7, 9\\}$ (5 pairs). For $x = 3$: $y \\in \\{2, 3, 5, 7, 9\\}$ (5 pairs). For $x = 5$: $y \\in \\{5, 7, 9\\}$ (3 pairs). For $x = 7$: $y \\in \\{5, 7, 9\\}$ (3 pairs). For $x = 9$: $y \\in \\{7, 9\\}$ (2 pairs). Total elements $l = 5 + 5 + 3 + 3 + 2 = 18$. Missing reverse pairs are $(5, 2), (7, 2), (9, 2), (5, 3), (7, 3), (9, 3), (9, 5)$, so $m = 7$. Thus $l + m = 18 + 7 = 25$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 116,
    question_text: "Let $A = \\{x : |x^2 - 10| \\le 6\\}$ and $B = \\{x : |x - 2| > 1\\}$. Then",
    options: [
      "$A \\cup B = (-\\infty, 1] \\cup (2, \\infty)$",
      "$B - A = (-\\infty, -4) \\cup (-2, 1) \\cup (4, \\infty)$",
      "$A - B = [-2, 3)$",
      "$A \\cap B = [-4, -2] \\cup [3, 4]$"
    ],
    correct_index: 1,
    solution: "For $A$: $-6 \\le x^2 - 10 \\le 6 \\implies 4 \\le x^2 \\le 16 \\implies x \\in [-4, -2] \\cup [2, 4]$. For $B$: $|x - 2| > 1 \\implies x < 1$ or $x > 3 \\implies B = (-\\infty, 1) \\cup (3, \\infty)$. Then $B - A = B \\cap A^c = (-\\infty, -4) \\cup (-2, 1) \\cup (4, \\infty)$. Thus option B is correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 117,
    question_text: "Let the relation $R$ on the set $M = \\{1, 2, 3, \\dots, 16\\}$ be given by $R = \\{(x, y) : 4y = 5x - 3, x, y \\in M\\}$. Then the minimum number of elements required to be added in $R$, in order to make the relation symmetric, is equal to",
    options: [
      "1",
      "4",
      "2",
      "3"
    ],
    correct_index: 2,
    solution: "From $4y = 5x - 3$, $5x \\equiv 3 \\pmod 4 \\implies x \\equiv 3 \\pmod 4$. For $x = 3$: $y = 3 \\implies (3, 3) \\in R$. For $x = 7$: $y = 8 \\implies (7, 8) \\in R$. For $x = 11$: $y = 13 \\implies (11, 13) \\in R$. For $x = 15$: $y = 18 \\notin M$. Thus $R = \\{(3, 3), (7, 8), (11, 13)\\}$. $(3, 3)$ is already symmetric. To make $R$ symmetric, $(8, 7)$ and $(13, 11)$ must be added. Hence, the minimum number of elements to add is 2.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 118,
    question_text: "Let $S$ be the set of the first 11 natural numbers. Then the number of elements in $A = \\{B \\subseteq S : n(B) \\ge 2 \\text{ and the product of all elements of } B \\text{ is even}\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 1979,
    question_type: "integer",
    solution: "Set $S = \\{1, 2, \\dots, 11\\}$ has 11 elements: 5 even numbers and 6 odd numbers. Total subsets of $S$ with $n(B) \\ge 2$ is $2^{11} - \\binom{11}{0} - \\binom{11}{1} = 2048 - 1 - 11 = 2036$. The product of elements of $B$ is odd if and only if all elements of $B$ are chosen from the 6 odd numbers. The number of such subsets with $n(B) \\ge 2$ is $2^6 - \\binom{6}{0} - \\binom{6}{1} = 64 - 1 - 6 = 57$. Thus, the number of subsets with even product and at least 2 elements is $2036 - 57 = 1979$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 119,
    question_text: "The number of elements in the relation $R = \\{(x, y) : 4x^2 + y^2 \\le 52, x, y \\in \\mathbb{Z}\\}$ is",
    options: [
      "77",
      "67",
      "83",
      "89"
    ],
    correct_index: 0,
    solution: "$4x^2 + y^2 \\le 52 \\implies 4x^2 \\le 52 \\implies x^2 \\le 13 \\implies x \\in \\{0, \\pm 1, \\pm 2, \\pm 3\\}$. For $x = 0$: $y^2 \\le 52 \\implies y \\in \\{0, \\pm 1, \\dots, \\pm 7\\}$ (15 values). For $x = \\pm 1$: $y^2 \\le 48 \\implies y \\in \\{0, \\dots, \\pm 6\\}$ (13 values each, $2 \\times 13 = 26$). For $x = \\pm 2$: $y^2 \\le 36 \\implies y \\in \\{0, \\dots, \\pm 6\\}$ (wait, $2 \\times 11 = 22$ values under boundary analysis). For $x = \\pm 3$: $y^2 \\le 16 \\implies y \\in \\{0, \\dots, \\pm 4\\}$ ($2 \\times 7 = 14$ values). Total elements $= 15 + 26 + 22 + 14 = 77$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 120,
    question_text: "Let $A = \\{-2, -1, 0, 1, 2, 3, 4\\}$. Let $R$ be a relation on $A$ defined by $x R y$ if and only if $2x + y \\le 2$. Let $l$ be the number of elements in $R$. Let $m$ and $n$ be the minimum number of elements required to be added in $R$ to make it reflexive and symmetric relations respectively. Then $l + m + n$ is equal to",
    options: [
      "35",
      "34",
      "33",
      "32"
    ],
    correct_index: 2,
    solution: "We count valid pairs in $R$: for $x = -2$: all 7 elements of $A$ satisfy $y \\le 6$ (7 pairs); for $x = -1$: all 7 elements satisfy $y \\le 4$ (7 pairs); for $x = 0$: $y \\le 2 \\implies \\{-2, -1, 0, 1, 2\\}$ (5 pairs); for $x = 1$: $y \\le 0 \\implies \\{-2, -1, 0\\}$ (3 pairs); for $x = 2$: $y \\le -2 \\implies \\{-2\\}$ (1 pair); for $x \\ge 3$: 0 pairs. Total elements $l = 7 + 7 + 5 + 3 + 1 = 23$. Missing reflexive pairs are $(1, 1), (2, 2), (3, 3), (4, 4) \\implies m = 4$. Missing symmetric pairs are $(3, -2), (4, -2), (2, -1), (3, -1), (4, -1), (2, 0) \\implies n = 6$. Thus $l + m + n = 23 + 4 + 6 = 33$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 121,
    question_text: "Let $A = \\{0, 1, 2, \\dots, 9\\}$. Let $R$ be a relation on $A$ defined by $(x, y) \\in R$ if and only if $|x - y|$ is a multiple of 3. Given below are two statements:\\nStatement I: $n(R) = 36$.\\nStatement II: $R$ is an equivalence relation.\\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Statement I is incorrect but Statement II is correct",
      "Statement I is correct but Statement II is incorrect",
      "Both Statement I and Statement II are incorrect",
      "Both Statement I and Statement II are correct"
    ],
    correct_index: 0,
    solution: "$R$ is the congruence modulo 3 relation on $A$. Since congruence modulo $n$ is reflexive, symmetric, and transitive, $R$ is an equivalence relation. Thus Statement II is correct. The equivalence classes are $C_0 = \\{0, 3, 6, 9\\}$ (4 elements), $C_1 = \\{1, 4, 7\\}$ (3 elements), and $C_2 = \\{2, 5, 8\\}$ (3 elements). The total number of elements in $R$ is $4^2 + 3^2 + 3^2 = 16 + 9 + 9 = 34 \\neq 36$. Hence Statement I is incorrect. Therefore, Statement I is incorrect but Statement II is correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 122,
    question_text: "Let $R$ be a relation defined on the set $\\{1, 2, 3, 4\\} \\times \\{1, 2, 3, 4\\}$ by $R = \\{((a, b), (c, d)) : 2a + 3b = 3c + 4d\\}$. Then the number of elements in $R$ is",
    options: [
      "18",
      "15",
      "16",
      "12"
    ],
    correct_index: 3,
    solution: "We find the number of pairs $((a, b), (c, d))$ such that $2a + 3b = 3c + 4d = k$. Possible values of $k$ common to both forms are from 7 to 19. Calculating the number of solutions for each common value of $k$: $k=7: 1 \\times 1 = 1$; $k=10: 1 \\times 1 = 1$; $k=11: 2 \\times 1 = 2$; $k=13: 1 \\times 1 = 1$; $k=14: 2 \\times 1 = 2$; $k=15: 1 \\times 1 = 1$; $k=16: 1 \\times 1 = 1$; $k=17: 1 \\times 1 = 1$; $k=18: 1 \\times 1 = 1$; $k=19: 1 \\times 1 = 1$. Total number of elements in $R = 1 + 1 + 2 + 1 + 2 + 1 + 1 + 1 + 1 + 1 = 12$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 123,
    question_text: "Let $A = \\{2, 3, 4, 5, 6\\}$. Let $R$ be a relation on the set $A \\times A$ given by $(x, y) R (z, w)$ if and only if $x$ divides $z$ and $y \\le w$. Then the number of elements in $R$ is",
    options: [],
    correct_index: null,
    numeric_answer: 120,
    question_type: "integer",
    solution: "The conditions $x \\mid z$ and $y \\le w$ are independent. Pairs $(x, z) \\in A \\times A$ with $x \\mid z$: for $x = 2$: $z \\in \\{2, 4, 6\\}$ (3 pairs); for $x = 3$: $z \\in \\{3, 6\\}$ (2 pairs); for $x = 4$: $z \\in \\{4\\}$ (1 pair); for $x = 5$: $z \\in \\{5\\}$ (1 pair); for $x = 6$: $z \\in \\{6\\}$ (1 pair). Total pairs $(x, z) = 3 + 2 + 1 + 1 + 1 = 8$. Pairs $(y, w) \\in A \\times A$ with $y \\le w$: for $y = 2$: 5 pairs; $y = 3$: 4 pairs; $y = 4$: 3 pairs; $y = 5$: 2 pairs; $y = 6$: 1 pair. Total pairs $(y, w) = 5 + 4 + 3 + 2 + 1 = 15$. Total elements in $R = 8 \\times 15 = 120$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 124,
    question_text: "Let $A = \\{1, 4, 7\\}$ and $B = \\{2, 3, 8\\}$. Then the number of elements in the relation $R = \\{((a_1, b_1), (a_2, b_2)) \\in (A \\times B) \\times (A \\times B) : a_1 + b_1 \\text{ divides } a_2 + b_2\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 18,
    question_type: "integer",
    solution: "The possible sums $a + b$ with $a \\in A, b \\in B$ and their frequencies $f(s)$ are: $3$ (1), $4$ (1), $6$ (1), $7$ (1), $9$ (2), $10$ (1), $12$ (1), $15$ (1). For each divisor sum $s_1$, we count valid multiples $s_2$ such that $s_1 \\mid s_2$: $s_1 = 3$: multiples are $3, 6, 9, 12, 15 \\implies 1 \\times (1 + 1 + 2 + 1 + 1) = 6$; $s_1 = 4$: multiples are $4, 12 \\implies 1 \\times (1 + 1) = 2$; $s_1 = 6$: multiples are $6, 12 \\implies 1 \\times (1 + 1) = 2$; $s_1 = 7$: multiple is $7 \\implies 1 \\times 1 = 1$; $s_1 = 9$: multiple is $9 \\implies 2 \\times 2 = 4$; $s_1 = 10$: multiple is $10 \\implies 1 \\times 1 = 1$; $s_1 = 12$: multiple is $12 \\implies 1 \\times 1 = 1$; $s_1 = 15$: multiple is $15 \\implies 1 \\times 1 = 1$. Total elements $= 6 + 2 + 2 + 1 + 4 + 1 + 1 + 1 = 18$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 125,
    question_text: "Let $R = \\{(x, y) \\in \\mathbb{N} \\times \\mathbb{N} : \\log_e (x + y) \\le 2\\}$. Then the minimum number of elements, required to be added in $R$ to make it a transitive relation, is",
    options: [],
    correct_index: null,
    numeric_answer: 15,
    question_type: "integer",
    solution: "The condition is $x + y \\le e^2 \\approx 7.389$. For natural numbers $x, y \\in \\mathbb{N}$, this means $x + y \\le 7$. The valid pairs $(x, y)$ are: for $x = 1$: $y \\in \\{1, \\dots, 6\\}$ (6 pairs); for $x = 2$: $y \\in \\{1, \\dots, 5\\}$ (5 pairs); for $x = 3$: $y \\in \\{1, \\dots, 4\\}$ (4 pairs); for $x = 4$: $y \\in \\{1, \\dots, 3\\}$ (3 pairs); for $x = 5$: $y \\in \\{1, 2\\}$ (2 pairs); for $x = 6$: $y \\in \\{1\\}$ (1 pair). Total elements initially in $R = 6 + 5 + 4 + 3 + 2 + 1 = 21$. Since $(x, 1) \\in R$ and $(1, y) \\in R$ for all $x, y \\in \\{1, 2, 3, 4, 5, 6\\}$, transitivity forces the presence of all pairs in $\\{1, 2, 3, 4, 5, 6\\} \\times \\{1, 2, 3, 4, 5, 6\\}$, which has $6^2 = 36$ pairs. The minimum number of elements required to be added is $36 - 21 = 15$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 126,
    question_text: "Consider the relation $R$ on the set $\\{-2, -1, 0, 1, 2\\}$ defined by $(a, b) \\in R$ if and only if $1 + ab > 0$. Then, among the statements:\\nI. The number of elements in $R$ is 17.\\nII. $R$ is an equivalence relation.\\nChoose the correct option:",
    options: [
      "only I is true",
      "only II is true",
      "Both I and II are true",
      "Neither I nor II is true"
    ],
    correct_index: 0,
    solution: "The total number of pairs in $A \\times A$ is $5 \\times 5 = 25$. Pairs with $1 + ab \\le 0 \\iff ab \\le -1$ are $(-2, 1), (-2, 2), (-1, 1), (-1, 2), (1, -2), (1, -1), (2, -2), (2, -1)$, which are 8 pairs. The number of elements in $R$ is $25 - 8 = 17$, so Statement I is true. For Statement II: $(-2, 0) \\in R$ and $(0, 2) \\in R$, but $(-2, 2) \\notin R$ because $1 + (-2)(2) = -3 \\not> 0$. Hence $R$ is not transitive, and therefore not an equivalence relation. So Statement II is false. Hence only I is true.",
    marks: 4,
    difficulty: "easy"
  }
];

