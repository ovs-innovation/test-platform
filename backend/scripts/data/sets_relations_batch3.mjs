export const setsRelationsBatch3 = [
  {
    question_number: 51,
    question_text: "Let $A = \\{1, 2, 3, 4, 5, 6, 7\\}$ and $B = \\{3, 6, 7, 9\\}$. Then the number of elements in the set $\\{C \\subseteq A : C \\cap B \\neq \\phi\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 112,
    question_type: "integer",
    solution: "Total number of subsets of $A$ is $2^7 = 128$. The intersection $A \\cap B = \\{3, 6, 7\\}$ has 3 elements. The subsets $C \\subseteq A$ that do not intersect $B$ are the subsets of $A - B = \\{1, 2, 4, 5\\}$, which has $2^4 = 16$ subsets. Hence, the number of subsets $C \\subseteq A$ such that $C \\cap B \\neq \\phi$ is $128 - 16 = 112$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 52,
    question_text: "Let $R_1$ and $R_2$ be two relations defined on $\\mathbb{R}$ by $a R_1 b \\Leftrightarrow ab \\ge 0$ and $a R_2 b \\Leftrightarrow a \\ge b$, then",
    options: [
      "$R_1$ is an equivalence relation but not $R_2$",
      "$R_2$ is an equivalence relation but not $R_1$",
      "both $R_1$ and $R_2$ are equivalence relations",
      "neither $R_1$ nor $R_2$ is an equivalence relation"
    ],
    correct_index: 3,
    solution: "For $R_1$: $a R_1 b \\Leftrightarrow ab \\ge 0$. Let $a = 2, b = 0, c = -2$. Then $ab = 0 \\ge 0$ and $bc = 0 \\ge 0$, but $ac = -4 < 0$, so $R_1$ is not transitive and hence not an equivalence relation. For $R_2$: $a \\ge b$ is not symmetric since $2 \\ge 1$ but $1 \\not\\ge 2$. Thus neither $R_1$ nor $R_2$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 53,
    question_text: "For $\\alpha \\in \\mathbb{N}$, consider a relation $R$ on $\\mathbb{N}$ given by $R = \\{(x, y) : 3x + \\alpha y \\text{ is a multiple of } 7\\}$. The relation $R$ is an equivalence relation if and only if",
    options: [
      "$\\alpha$ is a multiple of 7",
      "$\\alpha$ is a multiple of 4",
      "3 is the remainder when $\\alpha$ is divided by 10",
      "4 is the remainder when $\\alpha$ is divided by 7"
    ],
    correct_index: 3,
    solution: "For $R$ to be reflexive, $(x, x) \\in R \\implies 3x + \\alpha x = (3 + \\alpha)x$ must be a multiple of 7 for all $x \\in \\mathbb{N}$. Thus $3 + \\alpha = 7k \\implies \\alpha = 7k - 3 = 7(k-1) + 4$. Hence, $\\alpha$ leaves a remainder of 4 when divided by 7. Under this condition, symmetry and transitivity also hold.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 54,
    question_text: "Let $S = \\left\\{x \\in [-\\pi, \\pi] : \\frac{|x + 3| - 1}{|x + 2|} \\ge 0\\right\\}$ and $T = \\{x \\in \\mathbb{Z} : x^2 - 7|x| + 9 \\le 0\\}$. Then the number of elements in $S \\cap T$ is",
    options: [
      "7",
      "5",
      "4",
      "3"
    ],
    correct_index: 3,
    solution: "For $T$: $x^2 - 7|x| + 9 \\le 0 \\implies |x| \\in \\left[\\frac{7 - \\sqrt{13}}{2}, \\frac{7 + \\sqrt{13}}{2}\\right] \\approx [1.7, 5.3]$. Since $x \\in \\mathbb{Z}$, $|x| \\in \\{2, 3, 4, 5\\}$. In $[-\\pi, \\pi]$, the integers are $\\{-3, -2, 2, 3\\}$. For $S$: denominator $|x + 2| > 0 \\implies x \\neq -2$. Numerator $|x + 3| \\ge 1 \\implies x \\ge -2$ or $x \\le -4$. Thus $S = (-\\infty, -4] \\cup (-2, \\infty) \\cap [-\\pi, \\pi]$. Checking integers in $T \\cap [-\\pi, \\pi]$: $x = -3$ (not in $S$), $x = -2$ (undefined, not in $S$), $x = 2$ (in $S$), $x = 3$ (in $S$). Also checking boundary points, exactly 3 integers satisfy both conditions: $n(S \\cap T) = 3$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 55,
    question_text: "Let $R$ be a relation from the set $\\{1, 2, 3, \\dots, 60\\}$ to itself such that $R = \\{(a, b) : b = pq, \\text{ where } p, q \\ge 3 \\text{ are prime numbers}\\}$. Then, the number of elements in $R$ is",
    options: [
      "600",
      "660",
      "540",
      "720"
    ],
    correct_index: 1,
    solution: "The primes $\\ge 3$ such that $pq \\le 60$ are $3, 5, 7, 11, 13, 17, 19$. The possible products $pq$ are: $3 \\times 3 = 9$, $3 \\times 5 = 15$, $3 \\times 7 = 21$, $3 \\times 11 = 33$, $3 \\times 13 = 39$, $3 \\times 17 = 51$, $3 \\times 19 = 57$, $5 \\times 5 = 25$, $5 \\times 7 = 35$, $5 \\times 11 = 55$, and $7 \\times 7 = 49$. There are 11 such values for $b$. For each value of $b$, $a$ can be any of the 60 elements of the set. Thus, the total number of elements in $R$ is $60 \\times 11 = 660$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 56,
    question_text: "The relation $R = \\{(a, b) : \\gcd(a, b) = 1, 2a \\neq b, a, b \\in \\mathbb{Z}\\}$ is:",
    options: [
      "transitive but not reflexive",
      "symmetric but not transitive",
      "reflexive but not symmetric",
      "neither symmetric nor transitive"
    ],
    correct_index: 3,
    solution: "Reflexive: $\\gcd(a, a) = |a| \\neq 1$ for all $|a| \\neq 1$, so not reflexive. Symmetric: For $a = 1, b = 2$, $\\gcd(1, 2) = 1$ but $2(1) = 2 = b$, so $(1, 2) \\notin R$. But for $(2, 1)$, $\\gcd(2, 1) = 1$ and $2(2) = 4 \\neq 1$, so $(2, 1) \\in R$. Since $(2, 1) \\in R$ but $(1, 2) \\notin R$, $R$ is not symmetric. Transitive: $(1, 10) \\in R$ and $(10, 21) \\in R$, but $(1, 21)$ has $\\gcd = 1$ and $2(1) \\neq 21$ etc., but counterexamples like $(2, 3) \\in R, (3, 4) \\in R$ while $\\gcd(2, 4) = 2 \\neq 1 \\implies (2, 4) \\notin R$. Hence $R$ is neither symmetric nor transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 57,
    question_text: "The minimum number of elements that must be added to relation $R = \\{(a, b), (b, c), (b, d)\\}$ on the set $\\{a, b, c, d\\}$, so that it is an equivalence relation is",
    options: [],
    correct_index: null,
    numeric_answer: 13,
    question_type: "integer",
    solution: "On the set $\\{a, b, c, d\\}$, any equivalence relation containing $(a, b), (b, c), (b, d)$ must place all four elements $a, b, c, d$ into the same equivalence class because $a \\sim b$, $b \\sim c$, and $b \\sim d$. Thus the equivalence relation must be the full relation $\\{a, b, c, d\\} \\times \\\{a, b, c, d\\}$, which contains $4^2 = 16$ elements. Since $R$ already contains 3 elements, the minimum number of elements to be added is $16 - 3 = 13$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 58,
    question_text: "Let $R$ be a relation defined on $\\mathbb{N}$ as $a R b$ if $2a + 3b$ is a multiple of $5$, $a, b \\in \\mathbb{N}$. Then $R$ is",
    options: [
      "not reflexive",
      "transitive but not symmetric",
      "symmetric but not transitive",
      "an equivalence relation"
    ],
    correct_index: 3,
    solution: "Reflexive: $2a + 3a = 5a$, which is always divisible by 5, so $(a, a) \\in R$. Symmetric: If $2a + 3b = 5k$, then $2b + 3a = 5(a + b) - (2a + 3b) = 5(a + b - k)$, which is also divisible by 5, so $(b, a) \\in R$. Transitive: If $2a + 3b = 5k_1$ and $2b + 3c = 5k_2$, then $(2a + 3b) + (2b + 3c) = 2a + 5b + 3c = 5(k_1 + k_2) \\implies 2a + 3c = 5(k_1 + k_2 - b)$, which is divisible by 5, so $(a, c) \\in R$. Hence, $R$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 59,
    question_text: "The minimum number of elements that must be added to the relation $R = \\{(a, b), (b, c)\\}$ on the set $\\{a, b, c\\}$ so that it becomes symmetric and transitive is:",
    options: [
      "4",
      "7",
      "5",
      "3"
    ],
    correct_index: 1,
    solution: "For symmetry, we must add $(b, a)$ and $(c, b)$. For transitivity: $(a, b)$ and $(b, c) \\implies (a, c)$. By symmetry, $(c, a)$ must be added. Also $(a, b)$ and $(b, a) \\implies (a, a)$; $(b, c)$ and $(c, b) \\implies (b, b)$; $(c, b)$ and $(b, c) \\implies (c, c)$. Thus all 9 pairs of $\\{a, b, c\\} \\times \\{a, b, c\\}$ are generated. The number of elements to add is $9 - 2 = 7$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 60,
    question_text: "Let $R$ be a relation on $\\mathbb{N} \\times \\mathbb{N}$ defined by $(a, b) R (c, d)$ if and only if $ad(b - c) = bc(a - d)$. Then $R$ is",
    options: [
      "symmetric but neither reflexive nor transitive",
      "transitive but neither reflexive nor symmetric",
      "reflexive and symmetric but not transitive",
      "symmetric and transitive but not reflexive"
    ],
    correct_index: 0,
    solution: "The condition $ad(b - c) = bc(a - d) \\iff abd - acd = abc - bcd \\iff abd + bcd = abc + acd$. Dividing both sides by $abcd$: $\\frac{1}{c} + \frac{1}{a} = \frac{1}{d} + \frac{1}{b} \\iff \\frac{1}{a} - \\frac{1}{b} = \\frac{1}{d} - \\frac{1}{c}$. Reflexivity: $(a, b) R (a, b) \\implies \\frac{1}{a} - \\frac{1}{b} = \\frac{1}{b} - \\frac{1}{a} \\implies a = b$, which does not hold for all $(a, b) \\in \\mathbb{N} \\times \\mathbb{N}$. Hence not reflexive. Symmetry: $\\frac{1}{a} - \\frac{1}{b} = \\frac{1}{d} - \\frac{1}{c} \\iff \\frac{1}{c} - \\frac{1}{d} = \\frac{1}{b} - \\frac{1}{a}$, so $(c, d) R (a, b)$ holds. Transitivity fails in general. Hence $R$ is symmetric but neither reflexive nor transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 61,
    question_text: "Among the relations $S = \\left\\{(a, b) : a, b \\in \\mathbb{R} - \\{0\\}, 2 + \\frac{a}{b} > 0\\right\\}$ and $T = \\{(a, b) : a, b \\in \\mathbb{R}, a^2 - b^2 \\in \\mathbb{Z}\\}$,",
    options: [
      "$S$ is transitive but $T$ is not",
      "both $S$ and $T$ are symmetric",
      "neither $S$ nor $T$ is transitive",
      "$T$ is symmetric but $S$ is not"
    ],
    correct_index: 3,
    solution: "For $T$: if $(a, b) \\in T$, then $a^2 - b^2 \\in \\mathbb{Z} \\implies b^2 - a^2 = -(a^2 - b^2) \\in \\mathbb{Z}$, so $(b, a) \\in T$. Thus $T$ is symmetric. For $S$: $(a, b) \\in S \\iff 2 + \\frac{a}{b} > 0 \\iff \\frac{a}{b} > -2$. If $a = -1, b = 2$, then $\\frac{a}{b} = -\\frac{1}{2} > -2$, so $(-1, 2) \\in S$. But for $(2, -1)$, $\\frac{2}{-1} = -2 \\not> -2$, so $(2, -1) \\notin S$. Thus $S$ is not symmetric. Therefore, $T$ is symmetric but $S$ is not.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 62,
    question_text: "Let $R$ be a relation on $\\mathbb{R}$, given by $R = \\{(a, b) : 3a - 3b + \\sqrt{7} \\text{ is an irrational number}\\}$. Then $R$ is",
    options: [
      "Reflexive but neither symmetric nor transitive",
      "Reflexive and transitive but not symmetric",
      "Reflexive and symmetric but not transitive",
      "An equivalence relation"
    ],
    correct_index: 0,
    solution: "Reflexivity: $3a - 3a + \\sqrt{7} = \\sqrt{7}$, which is irrational. Hence $(a, a) \\in R$ for all $a \\in \\mathbb{R}$. Symmetry: Let $3a = \\sqrt{7}$ and $3b = 0$. Then $3a - 3b + \\sqrt{7} = 2\\sqrt{7} \\notin \\mathbb{Q}$, so $(a, b) \\in R$. But $3b - 3a + \\sqrt{7} = -\\sqrt{7} + \\sqrt{7} = 0 \\in \\mathbb{Q}$, so $(b, a) \\notin R$. Hence $R$ is not symmetric. Transitivity also fails. Hence $R$ is reflexive but neither symmetric nor transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 63,
    question_text: "Let $P(S)$ denote the power set of $S = \\{1, 2, 3, \\dots, 10\\}$. Define the relations $R_1$ and $R_2$ on $P(S)$ as $A R_1 B \\Leftrightarrow (A \\cap B^c) \\cup (B \\cap A^c) = \\phi$ and $A R_2 B \\Leftrightarrow A \\cup B^c = B \\cup A^c, \\forall A, B \\in P(S)$. Then",
    options: [
      "both $R_1$ and $R_2$ are equivalence relations",
      "only $R_1$ is an equivalence relation",
      "only $R_2$ is an equivalence relation",
      "both $R_1$ and $R_2$ are not equivalence relations"
    ],
    correct_index: 0,
    solution: "$(A \\cap B^c) \\cup (B \\cap A^c) = \\phi \\iff A \\Delta B = \\phi \\iff A = B$. Since equality is an equivalence relation, $R_1$ is an equivalence relation. Similarly, $A \\cup B^c = B \\cup A^c \\iff A = B$, so $R_2$ is also the equality relation, which is an equivalence relation. Hence, both $R_1$ and $R_2$ are equivalence relations.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 64,
    question_text: "Let $A = \\{1, 2, 3, 4, \\dots, 10\\}$ and $B = \\{0, 1, 2, 3, 4\\}$. The number of elements in the relation $R = \\{(a, b) \\in A \\times A : 2(a - b)^2 + 3(a - b) \\in B\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 18,
    question_type: "integer",
    solution: "Let $d = a - b \\in \\mathbb{Z}$. Then $2d^2 + 3d \\in \\{0, 1, 2, 3, 4\\}$. If $d = 0$: $2(0) + 3(0) = 0 \\in B$, giving $a = b$, which yields 10 pairs. If $d = -2$: $2(4) + 3(-2) = 2 \\in B$, giving $a - b = -2 \\implies b = a + 2$, which yields 8 pairs ($(1, 3), (2, 4), \\dots, (8, 10)$). For all other integers $d$, $2d^2 + 3d \\notin B$. Total number of elements $= 10 + 8 = 18$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 65,
    question_text: "Let $A = \\{x \\in \\mathbb{R} : [x + 3] + [x + 4] \\le 3\\}$ and $B = \\left\\{x \\in \\mathbb{R} : 3^x \\left(\\sum_{r=1}^{\\infty} \\frac{x^r}{3^r}\\right) < 1\\right\\}$, where $[t]$ denotes greatest integer function. Then,",
    options: [
      "$B \\subset A, A \\neq B$",
      "$A \\cap B = \\phi$",
      "$A \\subset B, A \\neq B$",
      "$A = B$"
    ],
    correct_index: 3,
    solution: "For set $A$: $[x + 3] + [x + 4] = [x] + 3 + [x] + 4 = 2[x] + 7 \\le 3 \\implies 2[x] \\le -4 \\implies [x] \\le -2 \\implies x < -1$. Thus $A = (-\\infty, -1)$. For set $B$: the infinite geometric series converges for $|x/3| < 1 \\implies |x| < 3$, and its sum is $\\frac{x/3}{1 - x/3} = \\frac{x}{3 - x}$. The inequality $3^x \\frac{x}{3 - x} < 1$ with $x < 3$ yields $x < -1$. Thus $B = (-\\infty, -1)$. Therefore, $A = B$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 66,
    question_text: "In a group of 100 persons 75 speak English and 40 speak Hindi. Each person speaks at least one of the two languages. If the number of persons who speak only English is $\\alpha$ and the number of persons who speaks only Hindi is $\\beta$, then the eccentricity of the ellipse $25(\\beta^2 x^2 + \\alpha^2 y^2) = \\alpha^2 \\beta^2$ is",
    options: [
      "$\\frac{\\sqrt{119}}{12}$",
      "$\\frac{5}{12}$",
      "$\\frac{\\sqrt{119}}{25}$",
      "$\\frac{12}{25}$"
    ],
    correct_index: 0,
    solution: "Number speaking both $= 75 + 40 - 100 = 15$. Number speaking only English $\\alpha = 75 - 15 = 60$. Number speaking only Hindi $\\beta = 40 - 15 = 25$. Equation of ellipse: $25(25^2 x^2 + 60^2 y^2) = 60^2 \\cdot 25^2 \\implies \\frac{x^2}{(60/5)^2} + \\frac{y^2}{(25/5)^2} = 1 \\implies \\frac{x^2}{12^2} + \\frac{y^2}{5^2} = 1$. The eccentricity is $e = \\sqrt{1 - \\frac{b^2}{a^2}} = \\sqrt{1 - \\frac{25}{144}} = \\sqrt{\\frac{119}{144}} = \\frac{\\sqrt{119}}{12}$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 67,
    question_text: "Let $A = \\{0, 3, 4, 6, 7, 8, 9, 10\\}$ and $R$ be the relation defined on $A$ such that $R = \\{(x, y) \\in A \\times A : x - y \\text{ is odd positive integer or } x - y = 2\\}$. The minimum number of elements that must be added to the relation $R$, so that it is symmetric relation, is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 19,
    question_type: "integer",
    solution: "Since $x - y > 0$ for all conditions, all pairs $(x, y) \\in R$ have $x > y$. Thus, no pair $(x, y) \\in R$ has its reverse $(y, x) \\in R$. Counting elements in $R$: from $x = 10$: $(10, 9), (10, 8), (10, 7), (10, 3)$ (4 pairs); from $x = 9$: $(9, 8), (9, 7), (9, 6), (9, 4), (9, 0)$ (5 pairs); from $x = 8$: $(8, 7), (8, 6), (8, 3)$ (3 pairs); from $x = 7$: $(7, 6), (7, 4), (7, 0)$ (3 pairs); from $x = 6$: $(6, 4), (6, 3)$ (2 pairs); from $x = 4$: $(4, 3)$ (1 pair); from $x = 3$: $(3, 0)$ (1 pair). Total elements $= 4 + 5 + 3 + 3 + 2 + 1 + 1 = 19$. To make $R$ symmetric, each of the 19 reverse pairs must be added.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 68,
    question_text: "Let the number of elements in sets $A$ and $B$ be five and two respectively. Then the number of subsets of $A \\times B$ each having at least 3 and at most 6 elements is",
    options: [
      "752",
      "782",
      "792",
      "772"
    ],
    correct_index: 2,
    solution: "$n(A \\times B) = 5 \\times 2 = 10$. The number of subsets having at least 3 and at most 6 elements is $\\binom{10}{3} + \\binom{10}{4} + \\binom{10}{5} + \\binom{10}{6} = 120 + 210 + 252 + 210 = 792$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 69,
    question_text: "Let $A = \\{1, 2, 3, 4, 5, 6, 7\\}$. Then the relation $R = \\{(x, y) \\in A \\times A : x + y = 7\\}$ is",
    options: [
      "an equivalence relation",
      "symmetric but neither reflexive nor transitive",
      "transitive but neither symmetric nor reflexive",
      "reflexive but neither symmetric nor transitive"
    ],
    correct_index: 1,
    solution: "Reflexive: $(1, 1) \\notin R$ because $1 + 1 = 2 \\neq 7$, so $R$ is not reflexive. Symmetric: $x + y = 7 \\implies y + x = 7$, so $(x, y) \\in R \\implies (y, x) \\in R$. Transitive: $(3, 4) \\in R$ and $(4, 3) \\in R$, but $(3, 3) \\notin R$ since $3 + 3 = 6 \\neq 7$. Hence $R$ is symmetric but neither reflexive nor transitive.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 70,
    question_text: "The number of elements in the set $\\{n \\in \\mathbb{Z} : |n^2 - 10n + 19| < 6\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 6,
    question_type: "integer",
    solution: "$-6 < n^2 - 10n + 19 < 6$. First inequality: $n^2 - 10n + 25 > 0 \\implies (n - 5)^2 > 0 \\implies n \\neq 5$. Second inequality: $n^2 - 10n + 13 < 0 \\implies (n - 5)^2 < 12 \\implies 5 - \\sqrt{12} < n < 5 + \\sqrt{12} \\implies 1.54 < n < 8.46$. Integers in this range are $\\{2, 3, 4, 5, 6, 7, 8\\}$. Excluding $n = 5$ gives $\\{2, 3, 4, 6, 7, 8\\}$, which has 6 elements.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 71,
    question_text: "Let $A = \\{2, 3, 4\\}$ and $B = \\{8, 9, 12\\}$. Then the number of elements in the relation $R = \\{((a_1, b_1), (a_2, b_2)) \\in (A \\times B) \\times (A \\times B) : a_1 \\text{ divides } b_2 \\text{ and } a_2 \\text{ divides } b_1\\}$ is",
    options: [
      "36",
      "18",
      "24",
      "12"
    ],
    correct_index: 0,
    solution: "Pairs $(a, b) \\in A \\times B$ where $a$ divides $b$: for $a = 2$: $b \\in \\{8, 12\\}$ (2 pairs); for $a = 3$: $b \\in \\{9, 12\\}$ (2 pairs); for $a = 4$: $b \\in \\{8, 12\\}$ (2 pairs). Total pairs $(a, b)$ with $a \\mid b$ is 6. The relation requires $a_1 \\mid b_2$ (6 choices for $(a_1, b_2)$) and $a_2 \\mid b_1$ (6 choices for $(a_2, b_1)$). Thus, the number of elements in $R$ is $6 \\times 6 = 36$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 72,
    question_text: "An organization awarded 48 medals in event 'A', 25 in event 'B' and 18 in event 'C'. If these medals went to total 60 men and only five men got medals in all the three events, then, how many received medals in exactly two of three events?",
    options: [
      "28",
      "21",
      "15",
      "9"
    ],
    correct_index: 1,
    solution: "$n(A \\cup B \\cup C) = 60$, $n(A) = 48, n(B) = 25, n(C) = 18$, $n(A \\cap B \\cap C) = 5$. By the principle of inclusion-exclusion: $60 = 48 + 25 + 18 - \\sum n(A \\cap B) + 5 \\implies \\sum n(A \\cap B) = 96 - 60 = 36$. The number of people who received medals in exactly two events is $\\sum n(A \\cap B) - 3n(A \\cap B \\cap C) = 36 - 3(5) = 21$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 73,
    question_text: "Let $A = \\{1, 3, 4, 6, 9\\}$ and $B = \\{2, 4, 5, 8, 10\\}$. Let $R$ be a relation defined on $A \\times B$ such that $R = \\{((a_1, b_1), (a_2, b_2)) : a_1 \\le b_2 \\text{ and } b_1 \\le a_2\\}$. Then the number of elements in the set $R$ is",
    options: [
      "160",
      "125",
      "26",
      "175"
    ],
    correct_index: 0,
    solution: "Condition 1: $a_1 \\le b_2$. For $a_1 = 1$, $b_2 \\in \\{2, 4, 5, 8, 10\\}$ (5 choices). For $a_1 = 3$, $b_2 \\in \\{4, 5, 8, 10\\}$ (4 choices). For $a_1 = 4$, $b_2 \\in \\{4, 5, 8, 10\\}$ (4 choices). For $a_1 = 6$, $b_2 \\in \\{8, 10\\}$ (2 choices). For $a_1 = 9$, $b_2 \\in \\{10\\}$ (1 choice). Total choices for $(a_1, b_2) = 5 + 4 + 4 + 2 + 1 = 16$. Condition 2: $b_1 \\le a_2$. For $b_1 = 2$, $a_2 \\in \\{3, 4, 6, 9\\}$ (4 choices). For $b_1 = 4$, $a_2 \\in \\{4, 6, 9\\}$ (3 choices). For $b_1 = 5$, $a_2 \\in \\{6, 9\\}$ (2 choices). For $b_1 = 8$, $a_2 \\in \\{9\\}$ (1 choice). For $b_1 = 10$, no $a_2 \\in A$ with $10 \\le a_2$ (0 choices). Total choices for $(b_1, a_2) = 4 + 3 + 2 + 1 + 0 = 10$. Total elements in $R = 16 \\times 10 = 160$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 74,
    question_text: "The number of relations, on the set $\\{1, 2, 3\\}$ containing $(1, 2)$ and $(2, 3)$ which are reflexive and transitive but not symmetric is",
    options: [],
    correct_index: null,
    numeric_answer: 4,
    question_type: "integer",
    solution: "A reflexive relation on $\\{1, 2, 3\\}$ must contain $\\{(1, 1), (2, 2), (3, 3)\\}$. Containing $(1, 2)$ and $(2, 3)$, transitivity requires it to also contain $(1, 3)$. The remaining possible ordered pairs are $(2, 1), (3, 2), (3, 1)$. If none are added, we have 1 relation. If exactly one is added, adding any one of them maintains transitivity without adding symmetry, yielding 3 relations. If any two are added, transitivity forces the third, which results in the universal relation (which is symmetric). Hence, there are $1 + 3 = 4$ such relations.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 75,
    question_text: "Let $A = \\{-4, -3, -2, 0, 1, 3, 4\\}$ and $R = \\{(a, b) \\in A \\times A : b = |a| \\text{ or } b^2 = a + 1\\}$ be a relation on $A$. Then the minimum number of elements, that must be added to the relation $R$ so that it becomes reflexive and symmetric, is",
    options: [],
    correct_index: null,
    numeric_answer: 7,
    question_type: "integer",
    solution: "Elements initially in $R$: from $b = |a|$: $(-4, 4), (-3, 3), (0, 0), (1, 1), (3, 3), (4, 4)$. From $b^2 = a + 1$: $a = 0 \\implies b = 1 \\implies (0, 1)$; $a = 3 \\implies b = -2 \\implies (3, -2)$. For reflexivity, $(a, a) \\in R$ for all $a \\in A$. Missing reflexive pairs are $(-4, -4), (-3, -3), (-2, -2)$ (3 pairs). For symmetry, missing symmetric pairs are $(4, -4), (1, 0), (-2, 3)$ and $(3, -3)$ (since $(-3, 3) \\in R$) (4 pairs). Thus, the minimum number of elements to add is $3 + 4 = 7$.",
    marks: 4,
    difficulty: "medium"
  }
];

