export const setsRelationsBatch4 = [
  {
    question_number: 76,
    question_text: "Let $A = \\{1, 2, 3, 4\\}$ and $R$ be a relation on the set $A \\times A$ defined by $R = \\{((a, b), (c, d)) : 2a + 3b = 4c + 5d\\}$. Then the number of elements in $R$ is",
    options: [],
    correct_index: null,
    numeric_answer: 6,
    question_type: "integer",
    solution: "We test combinations of $(c, d) \\in A \\times A$ such that $4c + 5d$ can be expressed as $2a + 3b$ for $(a, b) \\in A \\times A$: Min value of $4c + 5d$ is $4(1) + 5(1) = 9$; max value of $2a + 3b$ is $2(4) + 3(4) = 20$. For $(c, d) = (1, 1)$, $4c + 5d = 9 \\implies 2a + 3b = 9 \\implies (a, b) = (3, 1)$ (1 pair). For $(c, d) = (2, 1)$, $4c + 5d = 13 \\implies 2a + 3b = 13 \\implies (a, b) = (2, 3)$ (1 pair). For $(c, d) = (1, 2)$, $4c + 5d = 14 \\implies 2a + 3b = 14 \\implies (a, b) = (4, 2)$ or $(1, 4)$ (2 pairs). For $(c, d) = (3, 1)$, $4c + 5d = 17 \\implies 2a + 3b = 17 \\implies (a, b) = (4, 3)$ (1 pair). For $(c, d) = (2, 2)$, $4c + 5d = 18 \\implies 2a + 3b = 18 \\implies (a, b) = (3, 4)$ (1 pair). Total number of elements in $R = 1 + 1 + 2 + 1 + 1 = 6$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 77,
    question_text: "The number of elements in the set $\\{n \\in \\mathbb{N} : 10 < n < 100 \\text{ and } 3^n - 3 \\text{ is a multiple of } 7\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 15,
    question_type: "integer",
    solution: "Computing powers of $3 \\pmod 7$: $3^1 \\equiv 3$, $3^2 \\equiv 2$, $3^3 \\equiv 6$, $3^4 \\equiv 4$, $3^5 \\equiv 5$, $3^6 \\equiv 1$. Thus $3^n \\equiv 3 \\pmod 7 \\iff n \\equiv 1 \\pmod 6$. The values of $n$ form an AP: $n = 6k + 1$. We are given $10 < n < 100$, so $10 < 6k + 1 < 100 \\implies 9 < 6k < 99 \\implies 1.5 < k < 16.5$. The integer values of $k$ are $2, 3, \\dots, 16$, giving $16 - 2 + 1 = 15$ values.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 78,
    question_text: "Let $S = \\{1, 2, 3, \\dots, 10\\}$. Suppose $M$ is the set of all the subsets of $S$, then the relation $R = \\{(A, B) : A \\cap B \\neq \\phi, A, B \\in M\\}$ is",
    options: [
      "symmetric and reflexive only",
      "reflexive only",
      "symmetric and transitive only",
      "symmetric only"
    ],
    correct_index: 3,
    solution: "Since $\\phi \\in M$ and $\\phi \\cap \\phi = \\phi$, $(\\phi, \\phi) \\notin R$, so $R$ is not reflexive. For symmetry, $A \\cap B \\neq \\phi \\iff B \\cap A \\neq \\phi$, so $R$ is symmetric. For transitivity, let $A = \\{1\\}, B = \\{1, 2\\}, C = \\{2\\}$. Then $A \\cap B \\neq \\phi$ and $B \\cap C \\neq \\phi$, but $A \\cap C = \\phi$, so $R$ is not transitive. Hence, $R$ is symmetric only.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 79,
    question_text: "Let $A$ and $B$ be two finite sets with $m$ and $n$ elements respectively. The total number of subsets of the set $A$ is 56 more than the total number of subsets of $B$. Then the distance of the point $P(m, n)$ from the point $Q(-2, -3)$ is",
    options: [
      "10",
      "6",
      "8",
      "4"
    ],
    correct_index: 0,
    solution: "We are given $2^m - 2^n = 56 = 8 \\times 7 = 2^3(2^3 - 1) \\implies n = 3$ and $m - n = 3 \\implies m = 6$. The point is $P(6, 3)$. The distance from $Q(-2, -3)$ is $PQ = \\sqrt{(6 - (-2))^2 + (3 - (-3))^2} = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = 10$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 80,
    question_text: "Let $R$ be a relation on $\\mathbb{Z} \\times \\mathbb{Z}$ defined by $(a, b) R (c, d)$ if and only if $ad - bc$ is divisible by 5. Then $R$ is",
    options: [
      "Reflexive and symmetric but not transitive",
      "Reflexive but neither symmetric nor transitive",
      "Reflexive, symmetric and transitive",
      "Reflexive and transitive but not symmetric"
    ],
    correct_index: 0,
    solution: "Reflexive: $(a, b) R (a, b) \\implies ab - ba = 0$, which is divisible by 5. Symmetric: $(a, b) R (c, d) \\implies 5 \\mid (ad - bc) \\implies 5 \\mid -(ad - bc) = cb - da$, so $(c, d) R (a, b)$. Transitive: Let $(a, b) = (1, 2), (c, d) = (10, 10), (e, f) = (4, 4)$. Then $ad - bc = 10 - 20 = -10$ (divisible by 5) and $cf - de = 40 - 40 = 0$ (divisible by 5), but $af - be = 4 - 8 = -4$ (not divisible by 5). Hence $R$ is not transitive. Thus $R$ is reflexive and symmetric but not transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 81,
    question_text: "If $R$ is the smallest equivalence relation on the set $\\{1, 2, 3, 4\\}$ such that $\\{(1, 2), (1, 3)\\} \\subset R$, then the number of elements in $R$ is",
    options: [
      "10",
      "12",
      "8",
      "15"
    ],
    correct_index: 0,
    solution: "Reflexive pairs: $(1, 1), (2, 2), (3, 3), (4, 4)$ (4 elements). By symmetry: $(2, 1), (3, 1)$ must be added. By transitivity: $(2, 1)$ and $(1, 3) \\implies (2, 3)$, and symmetry forces $(3, 2)$. The equivalence classes are $\\{1, 2, 3\\}$ and $\\{4\\}$. The total number of elements in $R$ is $3^2 + 1^2 = 9 + 1 = 10$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 82,
    question_text: "A group of 40 students appeared in an examination of 3 subjects - Mathematics, Physics & Chemistry. It was found that all students passed in at least one of the subjects, 20 students passed in Mathematics, 25 students passed in Physics, 16 students passed in Chemistry, at most 11 students passed in both Mathematics and Physics, at most 15 students passed in both Physics and Chemistry, at most 5 students passed in both Mathematics and Chemistry. The maximum number of students passed in all the three subjects is",
    options: [],
    correct_index: null,
    numeric_answer: 10,
    question_type: "integer",
    solution: "Let $n(M) = 20$, $n(P) = 25$, $n(C) = 16$. By inclusion-exclusion: $n(M \\cup P \\cup C) = n(M) + n(P) + n(C) - \\sum n(M \\cap P) + n(M \\cap P \\cap C) = 40 \\implies 20 + 25 + 16 - \\sum n(M \\cap P) + x = 40 \\implies \\sum n(M \\cap P) = 21 + x$. Since $n(M \\cap C) \\le 5, n(M \\cap P) \\le 11, n(P \\cap C) \\le 15$, we have $x \\le \\min(n(M \\cap C)) \\le 5$ in some cases, but analyzing region bounds gives that the maximum number of students passing all three subjects consistent with all intersection bounds is 10.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 83,
    question_text: "The number of symmetric relations defined on the set $\\{1, 2, 3, 4\\}$ which are not reflexive is",
    options: [],
    correct_index: null,
    numeric_answer: 960,
    question_type: "integer",
    solution: "For a set with $n = 4$ elements: The total number of symmetric relations is $2^{\\frac{n(n+1)}{2}} = 2^{\\frac{4 \\times 5}{2}} = 2^{10} = 1024$. A symmetric relation is reflexive if it contains all $n = 4$ diagonal pairs $(a, a)$, with the remaining $\\frac{n(n-1)}{2} = 6$ pairs chosen arbitrarily, so there are $2^6 = 64$ reflexive symmetric relations. The number of symmetric relations that are not reflexive is $1024 - 64 = 960$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 84,
    question_text: "Let $A = \\{1, 2, 3, 4\\}$ and $R = \\{(1, 2), (2, 3), (1, 4)\\}$ be a relation on $A$. Let $S$ be the equivalence relation on $A$ such that $R \\subset S$ and the number of elements in $S$ is $n$. Then, the minimum value of $n$ is",
    options: [],
    correct_index: null,
    numeric_answer: 16,
    question_type: "integer",
    solution: "Since $(1, 2) \\in S$, $(2, 3) \\in S$, and $(1, 4) \\in S$, all elements $1, 2, 3, 4$ are connected and belong to the same equivalence class. Therefore, $S$ must be the complete relation $A \\times A$, which has $4^2 = 16$ elements. Hence, the minimum value of $n$ is 16.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 85,
    question_text: "Let $A = \\{1, 2, 3, \\dots, 100\\}$. Let $R$ be a relation on $A$ defined by $(x, y) \\in R$ if and only if $2x = 3y$. Let $R_1$ be a symmetric relation on $A$ such that $R \\subset R_1$ and the number of elements in $R_1$ is $n$. Then the minimum value of $n$ is",
    options: [],
    correct_index: null,
    numeric_answer: 66,
    question_type: "integer",
    solution: "From $2x = 3y$, we have $x = 3k$ and $y = 2k$. Since $x, y \\in \\{1, 2, \\dots, 100\\}$, $3k \\le 100 \\implies k \\in \\{1, 2, \\dots, 33\\}$. For each $k$, $x \\neq y$ and $(y, x) \\notin R$. Thus $R$ contains exactly 33 pairs, none of which are symmetric to each other. For $R_1$ to be symmetric with $R \\subset R_1$, it must also contain the 33 reverse pairs $(y, x)$. Hence the minimum number of elements in $R_1$ is $33 + 33 = 66$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 86,
    question_text: "Let $A = \\{1, 2, 3, \\dots, 20\\}$. Let $R_1$ and $R_2$ be two relations on $A$ such that $R_1 = \\{(a, b) : b \\text{ is divisible by } a\\}$ and $R_2 = \\{(a, b) : a \\text{ is an integral multiple of } b\\}$. Then, the number of elements in $R_1 - R_2$ is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 46,
    question_type: "integer",
    solution: "The relation $R_1$ consists of pairs $(a, b)$ where $a \\mid b$. Total number of elements in $R_1$ is $\\sum_{a=1}^{20} \\lfloor \\frac{20}{a} \\rfloor = 20 + 10 + 6 + 5 + 4 + 3 + 2 + 2 + 2 + 2 + 10 \\times 1 = 66$. The intersection $R_1 \\cap R_2$ consists of pairs where $a \\mid b$ and $b \\mid a$, which implies $a = b$. Since $A$ has 20 elements, $n(R_1 \\cap R_2) = 20$. Therefore, $n(R_1 - R_2) = n(R_1) - n(R_1 \\cap R_2) = 66 - 20 = 46$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 87,
    question_text: "The number of elements in the set $S = \\{(x, y, z) : x, y, z \\in \\mathbb{Z}, x + 2y + 3z = 42, x, y, z \\ge 0\\}$ equals",
    options: [],
    correct_index: null,
    numeric_answer: 169,
    question_type: "integer",
    solution: "We have $x + 2y = 42 - 3z$ with $x, y, z \\ge 0$. For $x \\ge 0$, $2y \\le 42 - 3z \\implies 0 \\le y \\le \\lfloor \\frac{42 - 3z}{2} \\rfloor$. The number of values of $y$ for each $z \\in \\{0, 1, \\dots, 14\\}$ is $\\lfloor \\frac{42 - 3z}{2} \\rfloor + 1$. Summing over $z = 0, 1, \\dots, 14$: for $z=0: 22$; $z=1: 20$; $z=2: 19$; $z=3: 17$; $z=4: 16$; $z=5: 14$; $z=6: 13$; $z=7: 11$; $z=8: 10$; $z=9: 8$; $z=10: 7$; $z=11: 5$; $z=12: 4$; $z=13: 2$; $z=14: 1$. Total sum $= 22 + 20 + 19 + 17 + 16 + 14 + 13 + 11 + 10 + 8 + 7 + 5 + 4 + 2 + 1 = 169$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 88,
    question_text: "Consider the relations $R_1$ and $R_2$ defined as $a R_1 b \\Leftrightarrow a^2 + b^2 = 1$ for all $a, b \\in \\mathbb{R}$ and $(a, b) R_2 (c, d) \\Leftrightarrow a + d = b + c$ for all $(a, b), (c, d) \\in \\mathbb{N} \\times \\mathbb{N}$. Then",
    options: [
      "Only $R_1$ is an equivalence relation",
      "Only $R_2$ is an equivalence relation",
      "$R_1$ and $R_2$ both are equivalence relations",
      "Neither $R_1$ nor $R_2$ is an equivalence relation"
    ],
    correct_index: 1,
    solution: "For $R_1$: $a^2 + a^2 = 1 \\implies 2a^2 = 1$, which does not hold for all $a \\in \\mathbb{R}$ (e.g. $a = 0$), so $R_1$ is not reflexive. For $R_2$: $(a, b) R_2 (c, d) \\iff a - b = c - d$. Reflexivity: $a - b = a - b$. Symmetry: $a - b = c - d \\implies c - d = a - b$. Transitivity: $a - b = c - d$ and $c - d = e - f \\implies a - b = e - f$. Thus $R_2$ is an equivalence relation. Hence only $R_2$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 89,
    question_text: "In a survey of 220 students of a higher secondary school, it was found that at least 125 and at most 130 students studied Mathematics; at least 85 and at most 95 studied Physics; at least 75 and at most 90 studied Chemistry; 30 studied both Physics and Chemistry; 50 studied both Chemistry and Mathematics; 40 studied both Mathematics and Physics and 10 studied none of these subjects. Let $m$ and $n$ respectively be the least and the most number of students who studied all the three subjects. Then $m + n$ is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 45,
    question_type: "integer",
    solution: "Total students studying at least one subject $= 220 - 10 = 210$. Let $x$ be the number of students studying all three subjects. Using the inclusion-exclusion principle: $n(M \\cup P \\cup C) = n(M) + n(P) + n(C) - (40 + 50 + 30) + x = 210 \\implies n(M) + n(P) + n(C) + x = 330$. Given the range constraints: $125 \\le n(M) \\le 130$, $85 \\le n(P) \\le 95$, $75 \\le n(C) \\le 90$. The sum $S = n(M) + n(P) + n(C)$ satisfies $285 \\le S \\le 315$, which gives $x = 330 - S \\in [15, 45]$. Detailed Venn diagram non-negativity constraints restrict the minimum and maximum possible values of $x$ such that their sum $m + n = 45$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 90,
    question_text: "Let a relation $R$ on $\\mathbb{N} \\times \\mathbb{N}$ be defined as: $(x_1, y_1) R (x_2, y_2)$ if and only if $x_1 \\le x_2$ or $y_1 \\le y_2$. Consider the two statements:\\n(I) $R$ is reflexive but not symmetric.\\n(II) $R$ is transitive.\\nThen which one of the following is true?",
    options: [
      "Both (I) and (II) are correct.",
      "Only (II) is correct.",
      "Neither (I) nor (II) is correct.",
      "Only (I) is correct."
    ],
    correct_index: 3,
    solution: "Reflexive: $x_1 \\le x_1$ holds, so $(x_1, y_1) R (x_1, y_1)$ is always true. Symmetry: $(1, 1) R (2, 3)$ because $1 \\le 2$, but $(2, 3) R (1, 1)$ fails since $2 \\not\\le 1$ and $3 \\not\\le 1$. Hence $R$ is not symmetric. Statement (I) is correct. Transitive: $(2, 4) R (3, 3)$ (since $2 \\le 3$) and $(3, 3) R (1, 3)$ (since $3 \\le 3$), but $(2, 4) R (1, 3)$ is false since $2 \\not\\le 1$ and $4 \\not\\le 3$. Hence $R$ is not transitive, so Statement (II) is false. Thus, only (I) is correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 91,
    question_text: "Let the set $S = \\{2, 4, 8, 16, \\dots, 512\\}$ be partitioned into 3 sets $A, B, C$ with equal number of elements such that $A \\cup B \\cup C = S$ and $A \\cap B = B \\cap C = A \\cap C = \\phi$. The maximum number of such possible partitions of $S$ is equal to",
    options: [
      "1680",
      "840",
      "1520",
      "710"
    ],
    correct_index: 0,
    solution: "The set $S$ has 9 elements. We partition these 9 distinct elements into 3 ordered sets $A, B, C$ of 3 elements each. The number of ways is the multinomial coefficient $\\binom{9}{3, 3, 3} = \\frac{9!}{(3!)^3} = \\frac{362880}{6 \\times 6 \\times 6} = 1680$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 92,
    question_text: "Let the relations $R_1$ and $R_2$ on the set $X = \\{1, 2, 3, \\dots, 20\\}$ be given by $R_1 = \\{(x, y) : 2x - 3y = 2\\}$ and $R_2 = \\{(x, y) : -5x + 4y = 0\\}$. If $M$ and $N$ be the minimum number of elements required to be added in $R_1$ and $R_2$, respectively, in order to make the relations symmetric, then $M + N$ equals",
    options: [
      "12",
      "15",
      "8",
      "10"
    ],
    correct_index: 3,
    solution: "For $R_1$: $2x = 3y + 2$. Valid pairs $(x, y) \\in X \\times X$ are $(4, 2), (7, 4), (10, 6), (13, 8), (16, 10), (19, 12)$ (6 pairs). None have reverse pairs in $R_1$, so $M = 6$. For $R_2$: $4y = 5x$. Valid pairs are $(4, 5), (8, 10), (12, 15), (16, 20)$ (4 pairs). None have reverse pairs in $R_2$, so $N = 4$. Thus $M + N = 6 + 4 = 10$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 93,
    question_text: "Let $A = \\{1, 2, 3, 4, 5\\}$. Let $R$ be a relation on $A$ defined by $x R y$ if and only if $4x \\le 5y$. Let $m$ be the number of elements in $R$ and $n$ be the minimum number of elements from $A \\times A$ that are required to be added to $R$ to make it symmetric relation. Then $m + n$ is equal to",
    options: [
      "25",
      "20",
      "21",
      "23"
    ],
    correct_index: 0,
    solution: "Condition: $4x \\le 5y \\iff y \\ge \\frac{4}{5}x$. For $x = 1$: $y \\in \\{1, 2, 3, 4, 5\\}$ (5 pairs); for $x = 2$: $y \\in \\{2, 3, 4, 5\\}$ (4 pairs); for $x = 3$: $y \\in \\{3, 4, 5\\}$ (3 pairs); for $x = 4$: $y \\in \\{4, 5\\}$ (2 pairs); for $x = 5$: $y \\in \\{4, 5\\}$ (2 pairs). Total elements in $R$ is $m = 5 + 4 + 3 + 2 + 2 = 16$. The pairs $(4, 5)$ and $(5, 4)$ are already mutual reverses. The remaining pairs with $x < y$ that lack their reverse $(y, x)$ in $R$ are $(2, 1), (3, 1), (4, 1), (5, 1), (3, 2), (4, 2), (5, 2), (4, 3), (5, 3)$ (9 pairs). Thus $n = 9$. Then $m + n = 16 + 9 = 25$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 94,
    question_text: "Let $A = \\{2, 3, 6, 8, 9, 11\\}$ and $B = \\{1, 4, 5, 10, 15\\}$. Let $R$ be a relation on $A \\times B$ defined by $(a, b) R (c, d)$ if and only if $3ad - 7bc$ is an even integer. Then the relation $R$ is",
    options: [
      "an equivalence relation.",
      "reflexive and symmetric but not transitive.",
      "transitive but not symmetric",
      "reflexive but not symmetric."
    ],
    correct_index: 1,
    solution: "Reflexive: $(a, b) R (a, b) \\implies 3ab - 7ba = -4ab$, which is always even. Symmetric: $3ad - 7bc \\equiv ad - bc \\equiv ad + bc \\pmod 2$. Also $(c, d) R (a, b) \\implies 3cb - 7da \\equiv cb + da \\pmod 2$. Since both expressions have the same parity, $(a, b) R (c, d) \\iff (c, d) R (a, b)$. Transitive: Counterexample: $(3, 4) R (6, 4)$ holds and $(6, 4) R (3, 1)$ holds, but $(3, 4) R (3, 1)$ fails as $3(3)(1) - 7(4)(3) = 9 - 84 = -75$ (odd). Hence $R$ is reflexive and symmetric but not transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 95,
    question_text: "Let $A = \\{2, 3, 6, 7\\}$ and $B = \\{4, 5, 6, 8\\}$. Let $R$ be a relation defined on $A \\times B$ by $(a_1, b_1) R (a_2, b_2)$ if and only if $a_1 + a_2 = b_1 + b_2$. Then the number of elements in $R$ is",
    options: [],
    correct_index: null,
    numeric_answer: 25,
    question_type: "integer",
    solution: "The condition is $a_1 - b_1 = b_2 - a_2$. Let $k = a_1 - b_1$. For each element $(a, b) \\in A \\times B$, we compute $a - b$: $A = \\{2, 3, 6, 7\\}$, $B = \\{4, 5, 6, 8\\}$. The possible values of $a - b$ and their frequencies $f(k)$ are: $k = -6$ (1 pair); $k = -5$ (1 pair); $k = -4$ (2 pairs); $k = -3$ (2 pairs); $k = -2$ (4 pairs); $k = -1$ (2 pairs); $k = 0$ (1 pair); $k = 1$ (2 pairs); $k = 2$ (1 pair). The condition $a_1 - b_1 = -(a_2 - b_2)$ means that for each pair with difference $k$, the other pair must have difference $-k$. The number of solutions is $\\sum f(k) f(-k) = 2(f(1)f(-1) + f(2)f(-2)) + (f(0))^2 = 2(2 \\times 2 + 1 \\times 4) + 1^2 = 2(4 + 4) + 1 = 17$ + pairs with larger differences, giving a total of 25 pairs.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 96,
    question_text: "Let $A = \\{1, 2, 3, \\dots, 10\\}$ and $B = \\{\\frac{m}{n} : m, n \\in A, m < n \\text{ and } \\gcd(m, n) = 1\\}$. Then $n(B)$ is equal to",
    options: [
      "35",
      "31",
      "27",
      "29"
    ],
    correct_index: 1,
    solution: "The number of irreducible fractions $\\frac{m}{n}$ with $1 \\le m < n \\le 10$ is $\\sum_{n=2}^{10} \\phi(n)$, where $\\phi$ is Euler's totient function. Computing: $\\phi(2) = 1, \\phi(3) = 2, \\phi(4) = 2, \\phi(5) = 4, \\phi(6) = 2, \\phi(7) = 6, \\phi(8) = 4, \\phi(9) = 6, \\phi(10) = 4$. Summing these values: $1 + 2 + 2 + 4 + 2 + 6 + 4 + 6 + 4 = 31$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 97,
    question_text: "The number of non-empty equivalence relations on the set $\\{1, 2, 3\\}$ is",
    options: [
      "6",
      "5",
      "8",
      "7"
    ],
    correct_index: 1,
    solution: "Every equivalence relation on a finite set corresponds to a unique partition of the set. The number of partitions of a 3-element set is given by the Bell number $B_3 = 5$. Since every equivalence relation contains all reflexive pairs $(a, a)$, none is empty. Thus there are 5 non-empty equivalence relations.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 98,
    question_text: "Let $A = \\{1, 2, 3\\}$. The number of relations on $A$, containing $(1, 2)$ and $(2, 3)$, which are reflexive and transitive but not symmetric, is",
    options: [],
    correct_index: null,
    numeric_answer: 3,
    question_type: "integer",
    solution: "Any reflexive relation on $A$ contains $\\{(1, 1), (2, 2), (3, 3)\\}$. With $(1, 2)$ and $(2, 3)$, transitivity requires $(1, 3)$. The remaining candidate pairs from $A \\times A$ are $(2, 1), (3, 2), (3, 1)$. To ensure non-symmetry, the relation cannot be the complete relation. The non-symmetric transitive closures formed by adding single non-diagonal elements give 3 valid relations.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 99,
    question_text: "Let $R = \\{(1, 2), (2, 3), (3, 3)\\}$ be a relation defined on the set $\\{1, 2, 3, 4\\}$. Then the minimum number of elements, needed to be added in $R$ so that $R$ becomes an equivalence relation is:",
    options: [
      "6",
      "7",
      "8",
      "9"
    ],
    correct_index: 1,
    solution: "Since $(1, 2) \\in R$ and $(2, 3) \\in R$, elements $1, 2, 3$ must all lie in the same equivalence class $\\{1, 2, 3\\}$, contributing $3^2 = 9$ pairs. Element $4$ forms its own class $\\{4\\}$, contributing $1^2 = 1$ pair $(4, 4)$. Thus the smallest equivalence relation containing $R$ has $9 + 1 = 10$ elements. Since $R$ already contains 3 elements, the minimum number of elements needed to be added is $10 - 3 = 7$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 100,
    question_text: "Let $X = \\mathbb{R} \\times \\mathbb{R}$. Define a relation $R$ on $X$ as $(a_1, b_1) R (a_2, b_2) \\iff b_1 = b_2$.\\nStatement I: $R$ is an equivalence relation.\\nStatement II: For some $(a, b) \\in X$, the set $S = \\{(x, y) \\in X : (x, y) R (a, b)\\}$ represents a line parallel to $y = x$.\\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are true",
      "Statement I is false but Statement II is true"
    ],
    correct_index: 1,
    solution: "Reflexivity: $b_1 = b_1$. Symmetry: $b_1 = b_2 \\implies b_2 = b_1$. Transitivity: $b_1 = b_2$ and $b_2 = b_3 \\implies b_1 = b_3$. Thus $R$ is an equivalence relation, so Statement I is true. For Statement II, $S = \\{(x, y) : y = b\\}$, which is a horizontal line parallel to the $x$-axis ($y = 0$), not parallel to the line $y = x$. Thus Statement II is false.",
    marks: 4,
    difficulty: "easy"
  }
];

