export const setsRelationsBatch2 = [
  {
    question_number: 26,
    question_text: "If $R = \\{(x, y) : x, y \\in \\mathbb{Z}, x^2 + 3y^2 \\le 8\\}$ is a relation on the set of integers $\\mathbb{Z}$, then the domain of $R^{-1}$ is",
    options: [
      "$\\{-2, -1, 1, 2\\}$",
      "$\\{0, 1\\}$",
      "$\\{-2, -1, 0, 1, 2\\}$",
      "$\\{-1, 0, 1\\}$"
    ],
    correct_index: 3,
    solution: "Domain of $R^{-1}$ is the range of $R$, which is the set of possible $y \\in \\mathbb{Z}$. Since $x^2 + 3y^2 \\le 8$, we have $3y^2 \\le 8 \\implies y^2 \\le 2 \\implies y \\in \\{-1, 0, 1\\}$. For each of these $y$, there exist valid integers $x$ such that $x^2 + 3y^2 \\le 8$. Hence, the domain of $R^{-1}$ is $\\{-1, 0, 1\\}$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 27,
    question_text: "Let $R_1$ and $R_2$ be two relations defined as follows: $R_1 = \\{(a, b) \\in \\mathbb{R}^2 : a^2 + b^2 \\in \\mathbb{Q}\\}$ and $R_2 = \\{(a, b) \\in \\mathbb{R}^2 : a^2 + b^2 \\notin \\mathbb{Q}\\}$, where $\\mathbb{Q}$ is the set of all rational numbers, then",
    options: [
      "$R_1$ is transitive but $R_2$ is not transitive.",
      "$R_2$ is transitive but $R_1$ is not transitive.",
      "Neither $R_1$ nor $R_2$ is transitive.",
      "$R_1$ and $R_2$ are both transitive."
    ],
    correct_index: 2,
    solution: "For $R_1$: Let $a = 1 + \\sqrt{2}$, $b = \\sqrt{2}$, $c = 1 - \\sqrt{2}$. Then $a^2 + b^2 = (3 + 2\\sqrt{2}) + 2 = 5 + 2\\sqrt{2} \\notin \\mathbb{Q}$. Alternatively, let $a = 1 + \\sqrt{2}$, $b = \\sqrt{1 - \\sqrt{2}}$ etc. To test transitivity of $R_1$: let $a = 1 + \\sqrt{2}$, $b = (1 - \\sqrt{2})^{1/2}$, then $a^2 + b^2$ can be rational while $a^2 + c^2$ is not. Similarly, for $R_2$, sums of squares being irrational does not preserve transitivity. Hence, neither $R_1$ nor $R_2$ is transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 28,
    question_text: "A survey shows that 63% of the people in a city read newspaper A whereas 76% read newspaper B. If $x\\%$ of the people read both the newspapers, then a possible value of $x$ can be:",
    options: [
      "29",
      "37",
      "65",
      "55"
    ],
    correct_index: 3,
    solution: "Let total population percentage be 100%. $n(A) = 63$, $n(B) = 76$, $n(A \\cap B) = x$. We know $n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\le 100 \\implies 63 + 76 - x \\le 100 \\implies x \\ge 39$. Also $x \\le \\min(n(A), n(B)) = 63$. Thus $39 \\le x \\le 63$. Among the given options, only 55 lies in $[39, 63]$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 29,
    question_text: "Let $\\bigcup_{i=1}^{50} X_i = \\bigcup_{i=1}^{n} Y_i = T$, where each $X_i$ contains 10 elements and each $Y_i$ contains 5 elements. If each element of the set $T$ is an element of exactly 20 of sets $X_i$'s and exactly 6 of sets $Y_i$'s, then $n$ is equal to",
    options: [
      "45",
      "50",
      "15",
      "30"
    ],
    correct_index: 3,
    solution: "Sum of elements of all $X_i = 50 \\times 10 = 500$. Since each element of $T$ belongs to exactly 20 sets $X_i$, $20 \\cdot |T| = 500 \\implies |T| = 25$. Similarly, sum of elements of all $Y_i = 5n$. Since each element of $T$ belongs to exactly 6 sets $Y_i$, $6 \\cdot |T| = 5n \\implies 6 \\times 25 = 5n \\implies 5n = 150 \\implies n = 30$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 30,
    question_text: "A survey shows that 73% of the persons working in an office like coffee, whereas 65% like tea. If $x$ denotes the percentage of them, who like both coffee and tea, then $x$ cannot be:",
    options: [
      "63",
      "36",
      "54",
      "38"
    ],
    correct_index: 1,
    solution: "$n(C) = 73$, $n(T) = 65$, $n(C \\cap T) = x$. $n(C \\cup T) = n(C) + n(T) - n(C \\cap T) \\le 100 \\implies 73 + 65 - x \\le 100 \\implies x \\ge 38$. Also $x \\le \\min(73, 65) = 65$. So $38 \\le x \\le 65$. Hence, $x$ cannot be 36.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 31,
    question_text: "A set $A$ has $m$ elements and set $B$ has $n$ elements. If the total number of subsets of $A$ is 112 more than the total number of subsets of $B$, then the value of $m \\cdot n$ is",
    options: [],
    correct_index: null,
    numeric_answer: 28,
    question_type: "integer",
    solution: "$2^m - 2^n = 112 = 16 \\times 7 = 2^4(2^3 - 1) \\implies 2^n(2^{m-n} - 1) = 2^4(2^3 - 1)$. Comparing both sides: $n = 4$ and $m - n = 3 \\implies m = 7$. Thus, $m \\cdot n = 7 \\times 4 = 28$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 32,
    question_text: "Let $A = \\{n \\in \\mathbb{N} : n \\text{ is a 3-digit number}\\}$, $B = \\{9k + 2 : k \\in \\mathbb{N}\\}$ and $C = \\{9k + l : k \\in \\mathbb{N}\\}$ for some $l$ ($0 < l < 9$). If the sum of all the elements of the set $A \\cap (B \\cup C)$ is $274 \\times 400$, then $l$ is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 5,
    question_type: "integer",
    solution: "3-digit numbers are from 100 to 999. $B$ contains numbers of the form $9k + 2$: $101, 110, \\dots, 992$ (100 terms). The sum of elements of $A \\cap B$ is $S(B) = \\frac{100}{2}(101 + 992) = 50 \\times 1093 = 54650$. The given total sum is $274 \\times 400 = 109600$. If $l \\neq 2$, $B \\cap C = \\phi$, so $S(B \\cup C) = S(B) + S(C) = 109600 \\implies S(C) = 109600 - 54650 = 54950$. The sum of elements of $C$ in the 3-digit range with 100 terms: $S(C) = \\frac{100}{2}(a_1 + a_{100}) = 50(9k_1 + l + 9k_{100} + l) = 54950$. Solving gives $l = 5$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 33,
    question_text: "Let $R = \\{(P, Q) \\mid P \\text{ and } Q \\text{ are at the same distance from the origin}\\}$ be a relation, then the equivalence class of $(1, -1)$ is the set",
    options: [
      "$S = \\{(x, y) \\mid x^2 + y^2 = 1\\}$",
      "$S = \\{(x, y) \\mid x^2 + y^2 = 2\\}$",
      "$S = \\{(x, y) \\mid x^2 + y^2 = \\sqrt{2}\\}$",
      "$S = \\{(x, y) \\mid x^2 + y^2 = 4\\}$"
    ],
    correct_index: 1,
    solution: "The distance of $(1, -1)$ from the origin is $\\sqrt{1^2 + (-1)^2} = \\sqrt{2}$. The equivalence class of $(1, -1)$ is the set of all points $(x, y)$ whose distance from the origin is $\\sqrt{2}$, which satisfies $\\sqrt{x^2 + y^2} = \\sqrt{2} \\implies x^2 + y^2 = 2$.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 34,
    question_text: "Let $A = \\{2, 3, 4, 5, \\dots, 30\\}$ and $\\sim$ be an equivalence relation on $A \\times A$, defined by $(a, b) \\sim (c, d)$ if and only if $ad = bc$. Then the number of ordered pairs which satisfy this equivalence relation with ordered pair $(4, 3)$ is equal to",
    options: [
      "5",
      "6",
      "8",
      "7"
    ],
    correct_index: 3,
    solution: "$(c, d) \\sim (4, 3) \\iff 3c = 4d \\iff \\frac{c}{d} = \\frac{4}{3}$. Since $c, d \\in \\{2, 3, \\dots, 30\\}$, the valid pairs $(c, d)$ are $(4, 3), (8, 6), (12, 9), (16, 12), (20, 15), (24, 18), (28, 21)$. There are 7 such ordered pairs.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 35,
    question_text: "In a school, there are three types of games to be played. Some of the students play two types of games, but none play all the three games. Which Venn diagrams can justify the above statement?",
    options: [
      "P and Q",
      "P and R",
      "Q and R",
      "None of these"
    ],
    correct_index: 3,
    solution: "In diagrams P, Q, and R, the shaded regions include the central intersection of all three circles, which corresponds to students playing all three games. But the problem states that none play all three games. Hence, none of the Venn diagrams justify the statement.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 36,
    question_text: "Define a relation $R$ over a class of $n \\times n$ real matrices $A$ and $B$ as '$ARB$ iff there exists a non-singular matrix $P$ such that $PAP^{-1} = B$'. Then which of the following is true?",
    options: [
      "$R$ is symmetric, transitive but not reflexive",
      "$R$ is reflexive, symmetric but not transitive",
      "$R$ is an equivalence relation",
      "$R$ is reflexive, transitive but not symmetric"
    ],
    correct_index: 2,
    solution: "Reflexivity: Taking $P = I$, $IAI^{-1} = A$, so $ARA$. Symmetry: $PAP^{-1} = B \\implies A = P^{-1} B P = P^{-1} B (P^{-1})^{-1}$, taking $Q = P^{-1}$, we get $BRA$. Transitivity: $PAP^{-1} = B$ and $QBQ^{-1} = C \\implies Q(PAP^{-1})Q^{-1} = C \\implies (QP)A(QP)^{-1} = C$, so $ARC$. Since $R$ is reflexive, symmetric, and transitive, it is an equivalence relation.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 37,
    question_text: "Let $\\mathbb{N}$ be the set of natural numbers and a relation $R$ on $\\mathbb{N}$ be defined by $R = \\{(x, y) \\in \\mathbb{N} \\times \\mathbb{N} : x^3 - 3x^2y - xy^2 + 3y^3 = 0\\}$. Then the relation $R$ is",
    options: [
      "symmetric but neither reflexive nor transitive",
      "reflexive but neither symmetric nor transitive",
      "reflexive and symmetric, but not transitive",
      "an equivalence relation"
    ],
    correct_index: 1,
    solution: "Factoring: $x^2(x - 3y) - y^2(x - 3y) = (x^2 - y^2)(x - 3y) = (x - y)(x + y)(x - 3y) = 0$. For $x \\in \\mathbb{N}$, $(x - x)(x + x)(x - 3x) = 0$, so $(x, x) \\in R$, making $R$ reflexive. For symmetry: $(3, 1) \\in R$ because $3 - 3(1) = 0$, but for $(1, 3)$: $(1 - 3)(1 + 3)(1 - 9) = (-2)(4)(-8) = 64 \\neq 0$, so $(1, 3) \\notin R$. Hence $R$ is not symmetric. It is also not transitive. Therefore, $R$ is reflexive but neither symmetric nor transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 38,
    question_text: "Let $A = \\{n \\in \\mathbb{N} : n^2 \\le n + 10000\\}$, $B = \\{3k + 1 : k \\in \\mathbb{N}\\}$ and $C = \\{2k : k \\in \\mathbb{N}\\}$, then the sum of all the elements of the set $A \\cap (B - C)$ is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 832,
    question_type: "integer",
    solution: "$n^2 - n \\le 10000 \\implies n(n - 1) \\le 10000 \\implies n \\le 100$, so $A = \\{1, 2, \\dots, 100\\}$. $B = \\{4, 7, 10, 13, 16, 19, \\dots\\}$ and $C$ is the set of even natural numbers. $B - C$ consists of the odd elements of $B$: $\\{7, 13, 19, \\dots, 97\\}$. This is an AP with first term $a = 7$, common difference $d = 6$, and last term $l = 97$. $97 = 7 + (n - 1)6 \\implies n = 16$. The sum is $S = \\frac{16}{2}(7 + 97) = 8 \\times 104 = 832$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 39,
    question_text: "Out of all the patients in a hospital 89% are found to be suffering from heart ailment and 98% are suffering from lungs infection. If $K\\%$ of them are suffering from both ailments, then $K$ can not belong to the set:",
    options: [
      "$\\{79, 81, 83, 85\\}$",
      "$\\{84, 87, 90, 93\\}$",
      "$\\{80, 83, 86, 89\\}$",
      "$\\{84, 86, 88, 90\\}$"
    ],
    correct_index: 0,
    solution: "$n(H) = 89$, $n(L) = 98$, $n(H \\cap L) = K$. $n(H \\cup L) = n(H) + n(L) - n(H \\cap L) \\le 100 \\implies 89 + 98 - K \\le 100 \\implies K \\ge 87$. Also $K \\le \\min(n(H), n(L)) = 89$. Hence $87 \\le K \\le 89$. The set $\\{79, 81, 83, 85\\}$ has no intersection with $[87, 89]$, so $K$ cannot belong to it.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 40,
    question_text: "If $A = \\{x \\in \\mathbb{R} : |x - 2| > 1\\}$, $B = \\{x \\in \\mathbb{R} : \\sqrt{x^2 - 3} > 1\\}$, $C = \\{x \\in \\mathbb{R} : |x - 4| \\ge 2\\}$ and $\\mathbb{Z}$ is the set of all integers, then the number of subsets of the set $(A \\cap B \\cap C)^c \\cap \\mathbb{Z}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 256,
    question_type: "integer",
    solution: "$A = (-\\infty, 1) \\cup (3, \\infty)$. For $B$: $x^2 - 3 > 1 \\implies x^2 > 4 \\implies x \\in (-\\infty, -2) \\cup (2, \\infty)$. For $C$: $|x - 4| \\ge 2 \\implies x \\in (-\\infty, 2] \\cup [6, \\infty)$. $A \\cap B \\cap C = (-\\infty, -2) \\cup [6, \\infty)$. Therefore, $(A \\cap B \\cap C)^c = [-2, 6)$. The integers in this interval are $\\{-2, -1, 0, 1, 2, 3, 4, 5\\}$, which has 8 elements. Number of subsets $= 2^8 = 256$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 41,
    question_text: "Let $\\mathbb{Z}$ be the set of all integers, $A = \\{(x, y) \\in \\mathbb{Z} \\times \\mathbb{Z} : (x - 2)^2 + y^2 \\le 4\\}$, $B = \\{(x, y) \\in \\mathbb{Z} \\times \\mathbb{Z} : x^2 + y^2 \\le 4\\}$ and $C = \\{(x, y) \\in \\mathbb{Z} \\times \\mathbb{Z} : (x - 2)^2 + (y - 2)^2 \\le 4\\}$. If the total number of relations from $A \\cap B$ to $A \\cap C$ is $2^p$, then the value of $p$ is:",
    options: [
      "25",
      "9",
      "16",
      "49"
    ],
    correct_index: 0,
    solution: "The points in $A \\cap B$ satisfy $(x - 2)^2 + y^2 \\le 4$ and $x^2 + y^2 \\le 4$. Testing integers $x, y$: $(0, 0), (1, 0), (2, 0), (1, 1), (1, -1)$ satisfy both inequalities, giving $n(A \\cap B) = 5$. By symmetry, $n(A \\cap C) = 5$. The total number of relations from $A \\cap B$ to $A \\cap C$ is $2^{n(A \\cap B) \\times n(A \\cap C)} = 2^{5 \\times 5} = 2^{25}$. Hence $p = 25$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 42,
    question_text: "Which of the following is not correct for relation $R$ on the set of real numbers?",
    options: [
      "$(x, y) \\in R \\Leftrightarrow |x| - |y| \\le 1$ is reflexive but not symmetric.",
      "$(x, y) \\in R \\Leftrightarrow |x - y| \\le 1$ is reflexive and symmetric.",
      "$(x, y) \\in R \\Leftrightarrow 0 < |x - y| \\le 1$ is symmetric and transitive.",
      "$(x, y) \\in R \\Leftrightarrow 0 < |x| - |y| \\le 1$ is not transitive but symmetric."
    ],
    correct_index: 3,
    solution: "For $(x, y) \\in R \\Leftrightarrow 0 < |x| - |y| \\le 1$, if $0 < |x| - |y| \\le 1$, then $|y| - |x| < 0$, so $(y, x) \\notin R$. Hence the relation is NOT symmetric, which makes the statement 'is symmetric' false (not correct).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 43,
    question_text: "The sum of all the elements of the set $\\{a \\in \\{1, 2, \\dots, 100\\} : \\text{HCF}(a, 24) = 1\\}$ is",
    options: [],
    correct_index: null,
    numeric_answer: 1633,
    question_type: "integer",
    solution: "Total sum of first 100 natural numbers $= \\frac{100 \\times 101}{2} = 5050$. $\\text{HCF}(a, 24) = 1 \\implies a$ is not divisible by 2 and not divisible by 3. Sum of multiples of 2 up to 100: $2(1 + 2 + \\dots + 50) = 2550$. Sum of multiples of 3 up to 100: $3(1 + 2 + \\dots + 33) = 1683$. Sum of multiples of 6 up to 100: $6(1 + 2 + \\dots + 16) = 816$. By PIE, sum of multiples of 2 or 3 $= 2550 + 1683 - 816 = 3417$. Hence, required sum $= 5050 - 3417 = 1633$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 44,
    question_text: "Let $A = \\{x \\in \\mathbb{R} : |x + 1| < 2\\}$ and $B = \\{x \\in \\mathbb{R} : |x - 1| \\ge 2\\}$. Then which one of the following statements is NOT true?",
    options: [
      "$A - B = (-1, 1)$",
      "$B - A = \\mathbb{R} - (-3, 1)$",
      "$A \\cap B = (-3, -1]$",
      "$A \\cup B = \\mathbb{R} - [1, 3)$"
    ],
    correct_index: 1,
    solution: "$A = (-3, 1)$ and $B = (-\\infty, -1] \\cup [3, \\infty)$. Then $B - A = (-\\infty, -3] \\cup [3, \\infty) = \\mathbb{R} - (-3, 3) \\neq \\mathbb{R} - (-3, 1)$. Hence statement B is NOT true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 45,
    question_text: "Let $A = \\{n \\in \\mathbb{N} : \\text{HCF}(n, 45) = 1\\}$ and let $B = \\{2k : k \\in \\{1, 2, \\dots, 100\\}\\}$. Then the sum of all the elements of $A \\cap B$ is",
    options: [],
    correct_index: null,
    numeric_answer: 5264,
    question_type: "integer",
    solution: "$B = \\{2, 4, 6, \\dots, 200\\}$ (even numbers up to 200). $45 = 3^2 \\times 5$, so $A \\cap B$ consists of even numbers from 2 to 200 that are neither divisible by 3 nor by 5. Total sum of $B = 2(1 + \\dots + 100) = 10100$. Multiples of 6 (even multiples of 3): $6(1 + \\dots + 33) = 3366$. Multiples of 10 (even multiples of 5): $10(1 + \\dots + 20) = 2100$. Multiples of 30 (even multiples of 15): $30(1 + \\dots + 6) = 630$. Sum of elements in $A \\cap B = 10100 - 3366 - 2100 + 630 = 5264$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 46,
    question_text: "Let $A = \\{1, a_1, a_2, \\dots, a_{18}, 77\\}$ be a set of integers with $1 < a_1 < a_2 < \\dots < a_{18} < 77$. Let the set $A + A = \\{x + y : x, y \\in A\\}$ contain exactly 39 elements. Then, the value of $a_1 + a_2 + \\dots + a_{18}$ is equal to",
    options: [],
    correct_index: null,
    numeric_answer: 702,
    question_type: "integer",
    solution: "Set $A$ has $m = 20$ elements. The minimum number of elements in the sumset $A + A$ of any 20-element set of integers is $2m - 1 = 2(20) - 1 = 39$. This minimum occurs if and only if the elements of $A$ are in Arithmetic Progression. Here $x_1 = 1$ and $x_{20} = 77 \\implies 1 + 19d = 77 \\implies 19d = 76 \\implies d = 4$. Then $a_1 = 5, a_{18} = 73$. The sum $a_1 + a_2 + \\dots + a_{18} = \\frac{18}{2}(5 + 73) = 9 \\times 78 = 702$.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 47,
    question_text: "Let $R_1$ and $R_2$ be relations on the set $\\{1, 2, \\dots, 50\\}$ such that $R_1 = \\{(p, p^n) : p \\text{ is a prime and } n \\ge 0 \\text{ is an integer}\\}$ and $R_2 = \\{(p, p^n) : p \\text{ is a prime and } n = 0 \\text{ or } 1\\}$. Then, the number of elements in $R_1 - R_2$ is",
    options: [],
    correct_index: null,
    numeric_answer: 8,
    question_type: "integer",
    solution: "$R_1 - R_2 = \\{(p, p^n) : p \\text{ is prime}, n \\ge 2 \\text{ and } p^n \\le 50\\}$. For $p = 2$: $2^2 = 4, 2^3 = 8, 2^4 = 16, 2^5 = 32$ (4 elements). For $p = 3$: $3^2 = 9, 3^3 = 27$ (2 elements). For $p = 5$: $5^2 = 25$ (1 element). For $p = 7$: $7^2 = 49$ (1 element). Total number of elements $= 4 + 2 + 1 + 1 = 8$.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 48,
    question_text: "Let $R_1 = \\{(a, b) \\in \\mathbb{N} \\times \\mathbb{N} : |a - b| \\le 13\\}$ and $R_2 = \\{(a, b) \\in \\mathbb{N} \\times \\mathbb{N} : |a - b| \\neq 13\\}$. Then on $\\mathbb{N}$:",
    options: [
      "Both $R_1$ and $R_2$ are equivalence relations",
      "Neither $R_1$ nor $R_2$ is an equivalence relation",
      "$R_1$ is an equivalence relation but $R_2$ is not",
      "$R_2$ is an equivalence relation but $R_1$ is not"
    ],
    correct_index: 1,
    solution: "For $R_1$: $|16 - 4| = 12 \\le 13$ and $|4 - 1| = 3 \\le 13$, but $|16 - 1| = 15 > 13$, so $R_1$ is not transitive. For $R_2$: $|16 - 4| = 12 \\neq 13$ and $|4 - 3| = 1 \\neq 13$, but $|16 - 3| = 13$, so $R_2$ is not transitive. Hence, neither $R_1$ nor $R_2$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 49,
    question_text: "Let a set $A = A_1 \\cup A_2 \\cup \\dots \\cup A_k$, where $A_i \\cap A_j = \\phi$ for $i \\neq j, 1 \\le i, j \\le k$. Define the relation $R$ from $A$ to $A$ by $R = \\{(x, y) : y \\in A_i \\text{ if and only if } x \\in A_i, 1 \\le i \\le k\\}$. Then, $R$ is:",
    options: [
      "reflexive, symmetric but not transitive",
      "reflexive, transitive but not symmetric",
      "reflexive but not symmetric and transitive",
      "an equivalence relation"
    ],
    correct_index: 3,
    solution: "The sets $A_i$ partition $A$. The relation $R$ relates $x$ and $y$ iff they belong to the same partition block $A_i$. Any relation induced by a partition is reflexive, symmetric, and transitive. Therefore, $R$ is an equivalence relation.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 50,
    question_text: "Let $A = \\{1, 2, 3, 4, 5, 6, 7\\}$. Define $B = \\{T \\subseteq A : \\text{either } 1 \\notin T \\text{ or } 2 \\in T\\}$ and $C = \\{T \\subseteq A : \\text{the sum of all the elements of } T \\text{ is a prime number}\\}$. Then the number of elements in the set $B \\cup C$ is",
    options: [],
    correct_index: null,
    numeric_answer: 107,
    question_type: "integer",
    solution: "By De Morgan's law, $(B \\cup C)^c = B^c \\cap C^c$. $B^c$ is the collection of subsets $T \\subseteq A$ such that $1 \\in T$ and $2 \\notin T$. $C^c$ is the collection of subsets whose sum of elements is not prime. Elements available to choose are from $\\{3, 4, 5, 6, 7\\}$ to be added to $\\{1\\}$. The number of such subsets where $1 + \\text{sum}$ is not prime is found to be 21. Total subsets of $A$ is $2^7 = 128$. Hence $n(B \\cup C) = 128 - 21 = 107$.",
    marks: 4,
    difficulty: "hard"
  }
];

