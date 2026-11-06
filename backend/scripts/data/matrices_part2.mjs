// Part 2: Matrices Q51 to Q100
export const MATRICES_PART2 = [
  {
    "q_num": 51,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{pmatrix} 2 & 2 \\\\ 9 & 4 \\end{pmatrix}$ and $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$, then $10A^{-1}$ is equal to:",
    "options": [
      "$A - 4I$",
      "$6I - A$",
      "$A - 6I$",
      "$4I - A$"
    ],
    "correct_index": 2,
    "solution": "Characteristic equation of $A$ is $|A - xI| = 0 \\implies (2-x)(4-x) - 18 = 0 \\implies x^2 - 6x - 10 = 0$. By Cayley-Hamilton theorem: $A^2 - 6A - 10I = 0 \\implies 10I = A^2 - 6A$. Multiplying by $A^{-1}$: $10A^{-1} = A - 6I$.",
    "image_url": ""
  },
  {
    "q_num": 52,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $2 \\times 2$ real matrix with entries from $\\{0, 1\\}$ and $|A| \\neq 0$. Consider the following two statements:\\n(P) If $A \\neq I_2$, then $|A| = -1$\\n(Q) If $|A| = 1$, then $\\text{tr}(A) = 2$\\nWhere $I_2$ denotes $2 \\times 2$ identity matrix and $\\text{tr}(A)$ denotes the sum of the diagonal entries of $A$. Then:",
    "options": [
      "(P) is false and (Q) is true",
      "Both (P) and (Q) are false",
      "(P) is true and (Q) is false",
      "Both (P) and (Q) are true"
    ],
    "correct_index": 3,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $a, b, c, d \\in \\{0, 1\\}$. Since $|A| = ad - bc \\neq 0$, $|A|$ can be $1$ or $-1$. If $|A| = 1$, we must have $ad = 1, bc = 0 \\implies a = 1, d = 1 \\implies \\text{tr}(A) = a + d = 2$ and $A = I_2$ (or with one off-diagonal 1). If $A \\neq I_2$ and $|A| = 1$, $bc = 0 \\implies (b, c) = (0, 0)$ which gives $A = I_2$, so if $A \\neq I_2$ then $|A| = -1$. Hence both (P) and (Q) are true.",
    "image_url": ""
  },
  {
    "q_num": 53,
    "question_type": "mcq",
    "question_text": "Let $a, b, c \\in \\mathbb{R}$ be all non-zero and satisfies $a^3 + b^3 + c^3 = 2$. If the matrix $A = \\begin{bmatrix} a & b & c \\\\ b & c & a \\\\ c & a & b \\end{bmatrix}$ satisfies $A^T A = I$, then a value of $abc$ can be:",
    "options": [
      "$1/3$",
      "$1/3$",
      "3",
      "$2/3$"
    ],
    "correct_index": 1,
    "solution": "$A^T A = I \\implies a^2 + b^2 + c^2 = 1$ and $ab + bc + ca = 0$. Then $(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) = 1 \\implies a + b + c = \\pm 1$. We know $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) = (\\pm 1)(1 - 0) = \\pm 1$. Given $a^3 + b^3 + c^3 = 2$, so $2 - 3abc = \\pm 1 \\implies 3abc = 2 \\mp 1 \\implies 3abc = 1$ or $3 \\implies abc = 1/3$ or $1$. Hence a value of $abc$ is $1/3$.",
    "image_url": ""
  },
  {
    "q_num": 54,
    "question_type": "mcq",
    "question_text": "Let $A = \\{ X = (x, y, z)^T : PX = 0 \\text{ and } x^2 + y^2 + z^2 = 1 \\}$ where $P = \\begin{bmatrix} 1 & 2 & 1 \\\\ -2 & 3 & -4 \\\\ 1 & 9 & -1 \\end{bmatrix}$. Then the set $A$:",
    "options": [
      "Is a singleton.",
      "Is an empty set.",
      "Contains more than two elements",
      "Contains exactly two elements"
    ],
    "correct_index": 3,
    "solution": "$\\det(P) = 1(-3 + 36) - 2(2 + 4) + 1(-18 - 3) = 33 - 12 - 21 = 0$. Solving $PX = 0$: $x + 2y + z = 0$ and $-2x + 3y - 4z = 0$. Let $z = k$, then $x = -11k/7, y = 2k/7$. Substituting into $x^2 + y^2 + z^2 = 1 \\implies (121/49 + 4/49 + 1)k^2 = 1 \\implies 174k^2/49 = 1 \\implies k = \\pm 7/\\sqrt{174}$. This yields exactly two unit vectors $X$. Hence set $A$ contains exactly two elements.",
    "image_url": ""
  },
  {
    "q_num": 55,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} x & 1 \\\\ 1 & 0 \\end{bmatrix}, x \\in \\mathbb{R}$ and $A^4 = [a_{ij}]$. If $a_{11} = 109$, then $a_{22}$ is equal to ______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 10,
    "solution": "$A^2 = \\begin{bmatrix} x^2 + 1 & x \\\\ x & 1 \\end{bmatrix}$, $A^4 = (A^2)^2 = \\begin{bmatrix} x^4 + 3x^2 + 1 & x^3 + 2x \\\\ x^3 + 2x & x^2 + 1 \\end{bmatrix}$. Given $a_{11} = x^4 + 3x^2 + 1 = 109 \\implies x^4 + 3x^2 - 108 = 0 \\implies (x^2 + 12)(x^2 - 9) = 0 \\implies x^2 = 9$. Then $a_{22} = x^2 + 1 = 9 + 1 = 10$.",
    "image_url": ""
  },
  {
    "q_num": 56,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} \\cos\\theta & i\\sin\\theta \\\\ i\\sin\\theta & \\cos\\theta \\end{bmatrix}, (\\theta = \\frac{\\pi}{24})$ and $A^5 = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, where $i = \\sqrt{-1}$, then which one of the following is not true?",
    "options": [
      "$0 \\le a^2 + b^2 \\le 1$",
      "$a^2 - d^2 = 0$",
      "$a^2 - c^2 = 1$",
      "$a^2 - b^2 = \\frac{1}{2}$"
    ],
    "correct_index": 3,
    "solution": "$A^n = \\begin{bmatrix} \\cos(n\\theta) & i\\sin(n\\theta) \\\\ i\\sin(n\\theta) & \\cos(n\\theta) \\end{bmatrix}$. For $n = 5$, $a = \\cos(5\\theta), b = i\\sin(5\\theta), c = i\\sin(5\\theta), d = \\cos(5\\theta)$. Here $a = d, b = c$. Then $a^2 - b^2 = \\cos^2(5\\theta) - (i\\sin(5\\theta))^2 = \\cos^2(5\\theta) + \\sin^2(5\\theta) = 1 \\neq 1/2$. Thus option D is not true.",
    "image_url": ""
  },
  {
    "q_num": 57,
    "question_type": "mcq",
    "question_text": "Let $\\theta = \\frac{\\pi}{5}$ and $A = \\begin{bmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{bmatrix}$. If $B = A + A^4$, then $\\det(B)$:",
    "options": [
      "is one",
      "lies in $(2, 3)$",
      "is zero",
      "lies in $(1, 2)$"
    ],
    "correct_index": 3,
    "solution": "$A^4 = \\begin{bmatrix} \\cos 4\\theta & \\sin 4\\theta \\\\ -\\sin 4\\theta & \\cos 4\\theta \\end{bmatrix}$. $B = A + A^4 = \\begin{bmatrix} \\cos\\theta + \\cos 4\\theta & \\sin\\theta + \\sin 4\\theta \\\\ -(\\sin\\theta + \\sin 4\\theta) & \\cos\\theta + \\cos 4\\theta \\end{bmatrix}$. $\\det(B) = (\\cos\\theta + \\cos 4\\theta)^2 + (\\sin\\theta + \\sin 4\\theta)^2 = 2 + 2\\cos(4\\theta - \\theta) = 2 + 2\\cos 3\\theta$. For $\\theta = \\pi/5$, $3\\theta = 3\\pi/5$, and $\\cos(3\\pi/5) = -\\cos(2\\pi/5) = -\\frac{\\sqrt{5}-1}{4}$. Thus $\\det(B) = 2 - \\frac{\\sqrt{5}-1}{2} = \\frac{5 - \\sqrt{5}}{2} \\approx \\frac{5 - 2.236}{2} = 1.382 \\in (1, 2)$.",
    "image_url": ""
  },
  {
    "q_num": 58,
    "question_type": "numerical",
    "question_text": "Let $M$ be any $3 \\times 3$ matrix with entries from the set $\\{0, 1, 2\\}$. The maximum number of such matrices, for which the sum of diagonal elements of $M^T M$ is seven, is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 540,
    "solution": "The sum of diagonal elements of $M^T M$ is $\\sum_{i=1}^3 \\sum_{j=1}^3 a_{ij}^2 = 7$, where each $a_{ij} \\in \\{0, 1, 2\\}$. The squares can be $0^2 = 0, 1^2 = 1, 2^2 = 4$. Case 1: One 2 (square 4) and three 1's (squares 1) and five 0's: number of ways = $\\frac{9!}{1! 3! 5!} = \\frac{362880}{6 \\times 120} = 504$. Case 2: Seven 1's and two 0's: number of ways = $\\frac{9!}{7! 2!} = 36$. Total number of matrices = $504 + 36 = 540$.",
    "image_url": ""
  },
  {
    "q_num": 59,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} x & y & z \\\\ y & z & x \\\\ z & x & y \\end{bmatrix}$, where $x, y$ and $z$ are real numbers such that $x + y + z > 0$ and $xyz = 2$. If $A^2 = I_3$, then the value of $x^3 + y^3 + z^3$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 7,
    "solution": "$A$ is symmetric, so $A^2 = AA^T = I_3$, which means $A$ is orthogonal. Thus $x^2 + y^2 + z^2 = 1$ and $xy + yz + zx = 0$. Then $(x + y + z)^2 = x^2 + y^2 + z^2 + 2(xy + yz + zx) = 1 + 0 = 1$. Since $x + y + z > 0$, $x + y + z = 1$. Then $x^3 + y^3 + z^3 - 3xyz = (x + y + z)(x^2 + y^2 + z^2 - xy - yz - zx) = 1 \\cdot (1 - 0) = 1 \\implies x^3 + y^3 + z^3 = 3xyz + 1 = 3(2) + 1 = 7$.",
    "image_url": ""
  },
  {
    "q_num": 60,
    "question_type": "numerical",
    "question_text": "If $A = \\begin{bmatrix} 0 & -\\tan(\\theta/2) \\\\ \\tan(\\theta/2) & 0 \\end{bmatrix}$ and $(I_2 + A)(I_2 - A)^{-1} = \\begin{bmatrix} a & -b \\\\ b & a \\end{bmatrix}$, then $13(a^2 + b^2)$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 13,
    "solution": "Let $t = \\tan(\\theta/2)$. $I + A = \\begin{bmatrix} 1 & -t \\\\ t & 1 \\end{bmatrix}$ and $(I - A)^{-1} = \\frac{1}{1 + t^2} \\begin{bmatrix} 1 & -t \\\\ t & 1 \\end{bmatrix}$. Then $(I + A)(I - A)^{-1} = \\frac{1}{1 + t^2} \\begin{bmatrix} 1 - t^2 & -2t \\\\ 2t & 1 - t^2 \\end{bmatrix} = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$. Comparing gives $a = \\cos\\theta$ and $b = \\sin\\theta$. Thus $a^2 + b^2 = \\cos^2\\theta + \\sin^2\\theta = 1$. Therefore $13(a^2 + b^2) = 13(1) = 13$.",
    "image_url": ""
  },
  {
    "q_num": 61,
    "question_type": "mcq",
    "question_text": "If for the matrix, $A = \\begin{bmatrix} 1 & -\\alpha \\\\ \\alpha & \\beta \\end{bmatrix}$, $AA^T = I_2$, then the value of $\\alpha^4 + \\beta^4$ is:",
    "options": [
      "3",
      "1",
      "2",
      "4"
    ],
    "correct_index": 1,
    "solution": "$AA^T = \\begin{bmatrix} 1 & -\\alpha \\\\ \\alpha & \\beta \\end{bmatrix} \\begin{bmatrix} 1 & \\alpha \\\\ -\\alpha & \\beta \\end{bmatrix} = \\begin{bmatrix} 1 + \\alpha^2 & \\alpha - \\alpha\\beta \\\\ \\alpha - \\alpha\\beta & \\alpha^2 + \\beta^2 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}$. $1 + \\alpha^2 = 1 \\implies \\alpha^2 = 0 \\implies \\alpha = 0$. Then $\\alpha^2 + \\beta^2 = 1 \\implies \\beta^2 = 1$. Thus $\\alpha^4 + \\beta^4 = 0 + 1 = 1$.",
    "image_url": ""
  },
  {
    "q_num": 62,
    "question_type": "mcq",
    "question_text": "Let $A$ be a symmetric matrix of order 2 with integer entries. If the sum of the diagonal elements of $A^2$ is 1, then the possible number of such matrices is:",
    "options": [
      "12",
      "4",
      "1",
      "6"
    ],
    "correct_index": 1,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ b & c \\end{bmatrix}, a, b, c \\in \\mathbb{Z}$. The diagonal entries of $A^2$ are $a^2 + b^2$ and $b^2 + c^2$. Their sum is $a^2 + 2b^2 + c^2 = 1$. Since $a, b, c$ are integers, $2b^2 \\le 1 \\implies b = 0$. Then $a^2 + c^2 = 1$, which gives four solutions: $(a, c) = (1, 0), (-1, 0), (0, 1), (0, -1)$. Hence total matrices = 4.",
    "image_url": ""
  },
  {
    "q_num": 63,
    "question_type": "numerical",
    "question_text": "If the matrix $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 3 & 0 & -1 \\end{bmatrix}$ satisfies the equation $A^{20} + \\alpha A^{19} + \\beta A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 4 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ for some real numbers $\\alpha$ and $\\beta$, then $\\beta - \\alpha$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 4,
    "solution": "$A^n = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2^n & 0 \\\\ 3 \\frac{1 - (-1)^n}{2} & 0 & (-1)^n \\end{bmatrix}$. For $n = 20$: $A^{20} = \\text{diag}(1, 2^{20}, 1)$. For $n = 19$: $A^{19} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 2^{19} & 0 \\\\ 3 & 0 & -1 \\end{bmatrix}$. Looking at $(2, 2)$ entry: $2^{20} + \\alpha 2^{19} + 2\\beta = 4$. Looking at $(3, 3)$ entry: $1 - \\alpha - \\beta = 1 \\implies \\alpha + \\beta = 0 \\implies \\beta = -\\alpha$. Then $2^{20} + \\alpha 2^{19} - 2\\alpha = 4 \\implies \\alpha(2^{19} - 2) = 4 - 2^{20} = -2(2^{19} - 2) \\implies \\alpha = -2$, so $\\beta = 2$. Thus $\\beta - \\alpha = 2 - (-2) = 4$.",
    "image_url": ""
  },
  {
    "q_num": 64,
    "question_type": "numerical",
    "question_text": "The total number of $3 \\times 3$ matrices $A$ having enteries from the set $\\{0, 1, 2, 3\\}$ such that the sum of all the diagonal entries of $AA^T$ is 9, is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 766,
    "solution": "The sum of diagonal entries of $AA^T$ is $\\sum_{i=1}^9 x_i^2 = 9$, where each $x_i \\in \\{0, 1, 2, 3\\}$. Possible combinations of squares summing to 9: Case 1: nine 1's $\\implies \\frac{9!}{9!} = 1$. Case 2: one 3 and eight 0's $\\implies \\frac{9!}{1! 8!} = 9$. Case 3: two 2's, one 1, six 0's $\\implies \\frac{9!}{2! 1! 6!} = 252$. Case 4: one 2, five 1's, three 0's $\\implies \\frac{9!}{1! 5! 3!} = 504$. Sum of all cases $= 1 + 9 + 252 + 504 = 766$.",
    "image_url": ""
  },
  {
    "q_num": 65,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} i & -i \\\\ -i & i \\end{bmatrix}, i = \\sqrt{-1}$. Then, the system of linear equations $A^8 \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 64 \\end{bmatrix}$ has:",
    "options": [
      "A unique solution",
      "Infinitely many solutions",
      "No solution",
      "Exactly two solutions"
    ],
    "correct_index": 2,
    "solution": "$A^2 = \\begin{bmatrix} -2 & 2 \\\\ 2 & -2 \\end{bmatrix} = 2i A$, $A^4 = (A^2)^2 = \\begin{bmatrix} 8 & -8 \\\\ -8 & 8 \\end{bmatrix}$, $A^8 = (A^4)^2 = 128 \\begin{bmatrix} 1 & -1 \\\\ -1 & 1 \\end{bmatrix}$. The equation becomes $128 \\begin{bmatrix} x - y \\\\ -x + y \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 64 \\end{bmatrix} \\implies x - y = 1/16$ and $-x + y = 1/2 \\implies x - y = -1/2$, which is inconsistent. Thus, the system has no solution.",
    "image_url": ""
  },
  {
    "q_num": 66,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} a_1 \\\\ a_2 \\end{bmatrix}$ and $B = \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix}$ be two $2 \\times 1$ matrices with real entries such that $A = XB$, where $X = \\frac{1}{\\sqrt{3}} \\begin{bmatrix} 1 & -1 \\\\ 1 & k \\end{bmatrix}$, and $k \\in \\mathbb{R}$. If $a_1^2 + a_2^2 = \\frac{2}{3}(b_1^2 + b_2^2)$ and $(k^2 + 1)b_2^2 \\neq -2b_1 b_2$, then the value of $k$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 1,
    "solution": "$A^T A = B^T X^T X B$. $X^T X = \\frac{1}{3} \\begin{bmatrix} 2 & k-1 \\\\ k-1 & k^2+1 \\end{bmatrix}$. $a_1^2 + a_2^2 = \\frac{1}{3} [2b_1^2 + 2(k-1)b_1 b_2 + (k^2+1)b_2^2]$. Given $a_1^2 + a_2^2 = \\frac{2}{3}(b_1^2 + b_2^2)$, comparing coefficients gives $k - 1 = 0 \\implies k = 1$, and $\\frac{k^2+1}{3} = \\frac{2}{3} \\implies k^2 = 1$, which holds for $k = 1$.",
    "image_url": ""
  },
  {
    "q_num": 67,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 0 & \\sin\\alpha \\\\ \\sin\\alpha & 0 \\end{bmatrix}$ and $\\det(A^2 - \\frac{1}{2}I) = 0$, then a possible value of $\\alpha$ is:",
    "options": [
      "$\\pi/2$",
      "$\\pi/3$",
      "$\\pi/4$",
      "$\\pi/6$"
    ],
    "correct_index": 2,
    "solution": "$A^2 = \\begin{bmatrix} \\sin^2\\alpha & 0 \\\\ 0 & \\sin^2\\alpha \\end{bmatrix} = \\sin^2\\alpha I$. Then $A^2 - \\frac{1}{2}I = (\\sin^2\\alpha - 1/2)I$, so $\\det(A^2 - \\frac{1}{2}I) = (\\sin^2\\alpha - 1/2)^2 = 0 \\implies \\sin^2\\alpha = 1/2 \\implies \\sin\\alpha = 1/\\sqrt{2} \\implies \\alpha = \\pi/4$.",
    "image_url": ""
  },
  {
    "q_num": 68,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ and $B = \\begin{bmatrix} \\alpha \\\\ \\beta \\end{bmatrix} \\neq \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}$ such that $AB = B$ and $a + d = 2021$, then the value of $ad - bc$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 2020,
    "solution": "$AB = B \\implies (A - I)B = 0$. Since $B \\neq 0$, $\\det(A - I) = 0$. $\\det(A - I) = (a - 1)(d - 1) - bc = ad - (a + d) + 1 - bc = (ad - bc) - (a + d) + 1 = 0 \\implies ad - bc = a + d - 1 = 2021 - 1 = 2020$.",
    "image_url": ""
  },
  {
    "q_num": 69,
    "question_type": "mcq",
    "question_text": "Let $A + 2B = \\begin{bmatrix} 1 & 2 & 0 \\\\ 6 & -3 & 3 \\\\ -5 & 3 & 1 \\end{bmatrix}$ and $2A - B = \\begin{bmatrix} 2 & -1 & 5 \\\\ 2 & -1 & 6 \\\\ 0 & 1 & 2 \\end{bmatrix}$. If $\\text{Tr}(A)$ denotes the sum of all diagonal elements of the matrix $A$, then $\\text{Tr}(A) - \\text{Tr}(B)$ has value equal to:",
    "options": [
      "1",
      "2",
      "0",
      "3"
    ],
    "correct_index": 1,
    "solution": "Taking trace on both equations: $\\text{Tr}(A) + 2\\text{Tr}(B) = 1 + (-3) + 1 = -1$, and $2\\text{Tr}(A) - \\text{Tr}(B) = 2 + (-1) + 2 = 3$. Multiplying the second equation by 2 and adding: $5\\text{Tr}(A) = 5 \\implies \\text{Tr}(A) = 1$. Then $\\text{Tr}(B) = -1$. Hence $\\text{Tr}(A) - \\text{Tr}(B) = 1 - (-1) = 2$.",
    "image_url": ""
  },
  {
    "q_num": 70,
    "question_type": "numerical",
    "question_text": "Let $I$ be an identity matrix of order $2 \\times 2$ and $P = \\begin{bmatrix} 2 & -1 \\\\ 5 & -3 \\end{bmatrix}$. Then the value of $n \\in \\mathbb{N}$ for which $P^n = 5I - 8P$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 6,
    "solution": "Characteristic equation of $P$: $|P - \\lambda I| = \\lambda^2 + \\lambda - 1 = 0$ is checked: $\\text{tr}(P) = -1, \\det(P) = -6 - (-5) = -1$, so $P^2 + P - I = 0 \\implies P^2 = I - P$. Computing powers: $P^3 = P - P^2 = 2P - I$; $P^4 = 2(I - P) - P = 2I - 3P$; $P^5 = 2P - 3(I - P) = 5P - 3I$; $P^6 = 5(I - P) - 3P = 5I - 8P$. Thus $n = 6$.",
    "image_url": ""
  },
  {
    "q_num": 71,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 1 & -1 & 0 \\\\ 0 & 1 & -1 \\\\ 0 & 0 & 1 \\end{bmatrix}$ and $B = 7A^{20} - 20A^7 + 2I$, where $I$ is an identity matrix of order $3 \\times 3$. If $B = [b_{ij}]$, then $b_{13}$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 910,
    "solution": "$A = I + C$ where $C = \\begin{bmatrix} 0 & -1 & 0 \\\\ 0 & 0 & -1 \\\\ 0 & 0 & 0 \\end{bmatrix}$. $C^2 = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$, and $C^3 = 0$. $A^n = I + nC + \\frac{n(n-1)}{2} C^2$. The (1, 3) entry of $A^n$ is $\\frac{n(n-1)}{2}$. For $B = 7A^{20} - 20A^7 + 2I$, $b_{13} = 7 \\cdot \\frac{20 \\times 19}{2} - 20 \\cdot \\frac{7 \\times 6}{2} = 7(190) - 20(21) = 1330 - 420 = 910$.",
    "image_url": ""
  },
  {
    "q_num": 72,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 2 & 3 \\\\ a & 0 \\end{bmatrix}, a \\in \\mathbb{R}$ be written as $P + Q$ where $P$ is a symmetric matrix and $Q$ is skew symmetric matrix. If $\\det(Q) = 9$, then the modulus of the sum of all possible values of determinant of $P$ is equal to:",
    "options": [
      "36",
      "24",
      "45",
      "18"
    ],
    "correct_index": 0,
    "solution": "$P = \\frac{A + A^T}{2} = \\begin{bmatrix} 2 & \\frac{3+a}{2} \\\\ \\frac{3+a}{2} & 0 \\end{bmatrix}$ and $Q = \\frac{A - A^T}{2} = \\begin{bmatrix} 0 & \\frac{3-a}{2} \\\\ \\frac{a-3}{2} & 0 \\end{bmatrix}$. $\\det(Q) = \\left(\\frac{a-3}{2}\\right)^2 = 9 \\implies a - 3 = \\pm 6 \\implies a = 9$ or $a = -3$. $\\det(P) = -\\left(\\frac{3+a}{2}\\right)^2$. For $a = 9$, $\\det(P) = -\\left(\\frac{12}{2}\\right)^2 = -36$. For $a = -3$, $\\det(P) = 0$. Modulus of sum $= |-36 + 0| = 36$.",
    "image_url": ""
  },
  {
    "q_num": 73,
    "question_type": "mcq",
    "question_text": "Let $A = [a_{ij}]$ be a real matrix of order $3 \\times 3$, such that $a_{i1} + a_{i2} + a_{i3} = 1$, for $i = 1, 2, 3$. Then, the sum of all the entries of the matrix $A^3$ is equal to:",
    "options": [
      "2",
      "1",
      "3",
      "9"
    ],
    "correct_index": 2,
    "solution": "Let $X = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$. Given $AX = X \\implies A^3 X = X$. This means each row sum of $A^3$ is also 1. For a $3 \\times 3$ matrix, the sum of all entries is the sum of its three row sums $= 1 + 1 + 1 = 3$.",
    "image_url": ""
  },
  {
    "q_num": 74,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$. Then the number of $3 \\times 3$ matrices $B$ with entries from the set $\\{1, 2, 3, 4, 5\\}$ and satisfying $AB = BA$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 3125,
    "solution": "Let $B = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}$. $AB = \\begin{bmatrix} d & e & f \\\\ a & b & c \\\\ g & h & i \\end{bmatrix}$ and $BA = \\begin{bmatrix} b & a & c \\\\ e & d & f \\\\ h & g & i \\end{bmatrix}$. Equating gives $d = b$, $e = a$, $f = c$, $h = g$. Thus $B = \\begin{bmatrix} a & b & c \\\\ b & a & c \\\\ g & g & i \\end{bmatrix}$. There are 5 independent entries: $a, b, c, g, i$. Each can be chosen from $\\{1, 2, 3, 4, 5\\}$ in 5 ways. Total number of matrices $= 5^5 = 3125$.",
    "image_url": ""
  },
  {
    "q_num": 75,
    "question_type": "numerical",
    "question_text": "Let $M = \\left\\{ A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} : a, b, c, d \\in \\{\\pm 3, \\pm 2, \\pm 1, 0\\} \\right\\}$. Define $f: M \\to \\mathbb{Z}$, as $f(A) = \\det(A)$, for all $A \\in M$ where $\\mathbb{Z}$ is set of all integers. Then the number of $A \\in M$ such that $f(A) = 15$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 16,
    "solution": "$\\det(A) = ad - bc = 15$. Since $a, b, c, d \\in \\{-3, -2, -1, 0, 1, 2, 3\\}$, maximum product is 9. Thus $ad$ and $-bc$ must both be positive: $ad \\in \\{6, 9\\}$. Case 1: $ad = 9, bc = -6 \\implies (a, d) \\in \\{(3, 3), (-3, -3)\\}$ (2 ways), $(b, c) \\in \\{(3, -2), (-3, 2), (-2, 3), (2, -3)\\}$ (4 ways) $\\implies 2 \\times 4 = 8$ matrices. Case 2: $ad = 6, bc = -9 \\implies (a, d) \\in \\{(2, 3), (3, 2), (-2, -3), (-3, -2)\\}$ (4 ways), $(b, c) \\in \\{(3, -3), (-3, 3)\\}$ (2 ways) $\\implies 4 \\times 2 = 8$ matrices. Total $= 8 + 8 = 16$.",
    "image_url": ""
  },
  {
    "q_num": 76,
    "question_type": "numerical",
    "question_text": "Let $S = \\left\\{ n \\in \\mathbb{N} : \\begin{pmatrix} 0 & i \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\forall a, b, c, d \\in \\mathbb{R} \\right\\}$, where $i = \\sqrt{-1}$. Then the number of 2-digit numbers in the set $S$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 11,
    "solution": "Let $A = \\begin{pmatrix} 0 & i \\\\ 1 & 0 \\end{pmatrix}$. $A^2 = \\begin{pmatrix} i & 0 \\\\ 0 & i \\end{pmatrix} = i I \\implies A^4 = -I \\implies A^8 = I$. $A^n X = X \\forall X \\implies A^n = I \\implies n$ must be a multiple of 8. The 2-digit multiples of 8 are $16, 24, 32, \\dots, 96$. Number of terms $= \\frac{96 - 16}{8} + 1 = 10 + 1 = 11$.",
    "image_url": ""
  },
  {
    "q_num": 77,
    "question_type": "mcq",
    "question_text": "If $P = \\begin{bmatrix} 1 & 0 \\\\ 1/2 & 1 \\end{bmatrix}$, then $P^{50}$ is:",
    "options": [
      "$\\begin{bmatrix} 1 & 0 \\\\ 25 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 50 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 25 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 50 & 1 \\end{bmatrix}$"
    ],
    "correct_index": 0,
    "solution": "$P^n = \\begin{bmatrix} 1 & 0 \\\\ n/2 & 1 \\end{bmatrix}$. For $n = 50$, $P^{50} = \\begin{bmatrix} 1 & 0 \\\\ 50/2 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 25 & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 78,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ -1 & 4 \\end{bmatrix}$. If $A^{-1} = \\alpha I + \\beta A, \\alpha, \\beta \\in \\mathbb{R}, I$ is a $2 \\times 2$ identity matrix, then $4(\\alpha - \\beta)$ is equal to:",
    "options": [
      "5",
      "8/3",
      "2",
      "4"
    ],
    "correct_index": 3,
    "solution": "$\\det(A) = 4 - (-2) = 6$. Characteristic equation: $|A - \\lambda I| = \\lambda^2 - 5\\lambda + 6 = 0 \\implies A^2 - 5A + 6I = 0$. Multiplying by $A^{-1}$: $A - 5I + 6A^{-1} = 0 \\implies 6A^{-1} = 5I - A \\implies A^{-1} = \\frac{5}{6}I - \\frac{1}{6}A$. Thus $\\alpha = 5/6, \\beta = -1/6$. Then $4(\\alpha - \\beta) = 4(5/6 - (-1/6)) = 4(6/6) = 4$.",
    "image_url": ""
  },
  {
    "q_num": 79,
    "question_type": "numerical",
    "question_text": "If $A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}$ and $M = A + A^2 + A^3 + \\dots + A^{20}$, then the sum of all the elements of the matrix $M$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 2020,
    "solution": "$A^r = \\begin{bmatrix} 1 & r & \\frac{r(r+1)}{2} \\\\ 0 & 1 & r \\\\ 0 & 0 & 1 \\end{bmatrix}$. Sum of all elements in $A^r$ is $3 + 2r + \\frac{r(r+1)}{2} = 3 + \\frac{5}{2}r + \\frac{1}{2}r^2$. Summing from $r = 1$ to $20$: $\\sum_{r=1}^{20} 3 = 60$; $\\frac{5}{2} \\sum_{r=1}^{20} r = \\frac{5}{2} \\times \\frac{20 \\times 21}{2} = 525$; $\\frac{1}{2} \\sum_{r=1}^{20} r^2 = \\frac{1}{2} \\times \\frac{20 \\times 21 \\times 41}{6} = 1435$. Total sum $= 60 + 525 + 1435 = 2020$.",
    "image_url": ""
  },
  {
    "q_num": 80,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} \\frac{1}{\\sqrt{5}} & \\frac{2}{\\sqrt{5}} \\\\ -\\frac{2}{\\sqrt{5}} & \\frac{1}{\\sqrt{5}} \\end{bmatrix}, B = \\begin{bmatrix} 1 & 0 \\\\ i & 1 \\end{bmatrix}, i = \\sqrt{-1}$, and $Q = A^T B A$, then the inverse of the matrix $A Q^{2021} A^T$ is equal to:",
    "options": [
      "$\\begin{bmatrix} 1 & -2021 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ -2021i & 1 \\end{bmatrix}$",
      "$\\frac{1}{\\sqrt{5}} \\begin{bmatrix} 1 & -2021 \\\\ 2021 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 2021i & 1 \\end{bmatrix}$"
    ],
    "correct_index": 1,
    "solution": "$A A^T = I$, so $A^T = A^{-1}$. $Q = A^T B A \\implies Q^{2021} = A^T B^{2021} A$. Then $P = A Q^{2021} A^T = A (A^T B^{2021} A) A^T = B^{2021}$. $B^n = \\begin{bmatrix} 1 & 0 \\\\ ni & 1 \\end{bmatrix}$, so $B^{2021} = \\begin{bmatrix} 1 & 0 \\\\ 2021i & 1 \\end{bmatrix}$. The inverse is $(B^{2021})^{-1} = \\begin{bmatrix} 1 & 0 \\\\ -2021i & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 81,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 0 \\end{bmatrix}$. Then $A^{2025} - A^{2020}$ is equal to:",
    "options": [
      "$A^6 - A$",
      "$A^6$",
      "$A^5$",
      "$A^5 - A$"
    ],
    "correct_index": 0,
    "solution": "Computing powers of $A$: $A^2 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 1 \\\\ 1 & 0 & 0 \\end{bmatrix}$, $A^3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 1 \\\\ 1 & 0 & 0 \\end{bmatrix}, \\dots, A^n = \\begin{bmatrix} 1 & 0 & 0 \\\\ n-1 & 1 & 1 \\\\ 1 & 0 & 0 \\end{bmatrix}$. Then $A^{2025} - A^{2020} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 2024 - 2019 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 5 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Similarly, $A^6 - A = \\begin{bmatrix} 0 & 0 & 0 \\\\ 5 - 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 5 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$. Hence $A^{2025} - A^{2020} = A^6 - A$.",
    "image_url": ""
  },
  {
    "q_num": 82,
    "question_type": "mcq",
    "question_text": "If the matrix $A = \\begin{bmatrix} 0 & 2 \\\\ K & -1 \\end{bmatrix}$ satisfies $A(A^3 + 3I) = 2I$, then the value of $K$ is:",
    "options": [
      "$1/2$",
      "1",
      "-1",
      "$1/2$"
    ],
    "correct_index": 0,
    "solution": "$A^4 + 3A = 2I$. Characteristic equation of $A$: $\\lambda(\\lambda + 1) - 2K = 0 \\implies \\lambda^2 + \\lambda - 2K = 0 \\implies A^2 = 2KI - A$. Then $A^4 = (2KI - A)^2 = 4K^2 I - 4KA + A^2 = 4K^2 I - 4KA + 2KI - A = (4K^2 + 2K)I - (4K + 1)A$. Substituting into $A^4 + 3A = 2I$: $(4K^2 + 2K)I + (2 - 4K)A = 2I$. For $A$ not a scalar matrix, $2 - 4K = 0 \\implies K = 1/2$. Also $4(1/4) + 2(1/2) = 1 + 1 = 2$, which satisfies the equation.",
    "image_url": ""
  },
  {
    "q_num": 83,
    "question_type": "numerical",
    "question_text": "The number of elements in the set $\\{ A = \\begin{bmatrix} a & b \\\\ 0 & d \\end{bmatrix} : a, b, d \\in \\{-1, 0, 1\\} \\text{ and } (I - A)^3 = I - A^3 \\}$, where $I$ is $2 \\times 2$ identity matrix, is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 8,
    "solution": "$(I - A)^3 = I - 3A + 3A^2 - A^3 = I - A^3 \\implies 3A^2 - 3A = 0 \\implies A^2 = A$. For upper triangular $A$, $a^2 = a \\implies a \\in \\{0, 1\\}$, $d^2 = d \\implies d \\in \\{0, 1\\}$, and $b(a+d) = b$. Case 1: $b = 0 \\implies (a, d) \\in \\{(0, 0), (0, 1), (1, 0), (1, 1)\\}$ (4 matrices). Case 2: $b \\neq 0 \\implies a + d = 1 \\implies (a, d) \\in \\{(1, 0), (0, 1)\\}$ with $b \\in \\{-1, 1\\}$ (4 matrices). Total matrices $= 4 + 4 = 8$.",
    "image_url": ""
  },
  {
    "q_num": 84,
    "question_type": "numerical",
    "question_text": "Let $S = \\left\\{ \\begin{pmatrix} -1 & a \\\\ 0 & b \\end{pmatrix} : a, b \\in \\{1, 2, 3, \\dots, 100\\} \\right\\}$ and let $T_n = \\{ A \\in S : A^{n(n+1)} = I \\}$. Then the number of elements in $\\bigcap_{n=1}^{100} T_n$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 100,
    "solution": "Let $A = \\begin{pmatrix} -1 & a \\\\ 0 & b \\end{pmatrix}$. $A^2 = \\begin{pmatrix} 1 & a(b-1) \\\\ 0 & b^2 \\end{pmatrix}$. For $A^2 = I$, we must have $b = 1$, which gives $b^2 = 1$ and $a(b-1) = 0$. Since $n(n+1)$ is always an even number, if $b = 1$, $A^2 = I \\implies A^{2k} = I$ for all $k$. For $b = 1$, $a$ can be any integer in $\\{1, 2, \\dots, 100\\}$. Thus there are 100 such matrices.",
    "image_url": ""
  },
  {
    "q_num": 85,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix having entries from the set $\\{-1, 0, 1\\}$. The number of all such matrices $A$ having sum of all the entries equal to 5, is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 414,
    "solution": "Let the 9 entries have $x$ ones, $y$ minus ones, and $z$ zeros, with $x + y + z = 9$ and $x - y = 5$. Case 1: $y = 0 \\implies x = 5, z = 4$: $\\frac{9!}{5! 4!} = 126$. Case 2: $y = 1 \\implies x = 6, z = 2$: $\\frac{9!}{6! 1! 2!} = 252$. Case 3: $y = 2 \\implies x = 7, z = 0$: $\\frac{9!}{7! 2!} = 36$. Total number of matrices $= 126 + 252 + 36 = 414$.",
    "image_url": ""
  },
  {
    "q_num": 86,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 0 & -2 \\\\ 2 & 0 \\end{bmatrix}$. If $M$ and $N$ are two matrices given by $M = \\sum_{k=1}^{10} A^{2k}$ and $N = \\sum_{k=1}^{10} A^{2k-1}$, then $MN^2$ is:",
    "options": [
      "a non-identity symmetric matrix",
      "a skew-symmetric matrix",
      "neither symmetric nor skew-symmetric matrix",
      "an identity matrix"
    ],
    "correct_index": 0,
    "solution": "$A^2 = -4I$, which is symmetric (scalar multiple of $I$). Thus $M = \\sum A^{2k}$ is a scalar multiple of $I$ (hence symmetric). $A$ is skew-symmetric, so each odd power $A^{2k-1}$ is skew-symmetric $\\implies N$ is skew-symmetric ($N^T = -N$). Then $N^2 = N \\cdot N \\implies (N^2)^T = (-N)(-N) = N^2$, so $N^2$ is symmetric. Since $M$ is a scalar matrix $cI$, $MN^2 = cN^2$ is symmetric and non-identity.",
    "image_url": ""
  },
  {
    "q_num": 87,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{pmatrix} 2 & -2 \\\\ 1 & -1 \\end{pmatrix}$ and $B = \\begin{pmatrix} -1 & 2 \\\\ -1 & 2 \\end{pmatrix}$. Then the number of elements in the set $\\{ (n, m) : n, m \\in \\{1, 2, \\dots, 10\\} \\text{ and } n A^n + m B^m = I \\}$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 1,
    "solution": "$A^2 = A$ and $B^2 = B$. Thus $A^n = A$ and $B^m = B$ for all $n, m \\ge 1$. The equation becomes $n A + m B = I$. Looking at $(1, 1)$ element: $2n - m = 1$; looking at $(2, 2)$ element: $-n + 2m = 1$. Adding: $n + m = 2 \\implies n = 1, m = 1$. This satisfies all 4 matrix entries: $1 \\cdot A + 1 \\cdot B = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I$. Only 1 pair $(1, 1)$ exists.",
    "image_url": ""
  },
  {
    "q_num": 88,
    "question_type": "numerical",
    "question_text": "Let $X = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$, $Y = \\alpha I + \\beta X + \\gamma X^2$ and $Z = \\alpha^2 I - \\alpha\\beta X + (\\beta^2 - \\alpha\\gamma) X^2, \\alpha, \\beta, \\gamma \\in \\mathbb{R}$. If $Y^{-1} = \\begin{bmatrix} 1/5 & -2/5 & 1/5 \\\\ 0 & 1/5 & -2/5 \\\\ 0 & 0 & 1/5 \\end{bmatrix}$, then $(\\alpha - \\beta + \\gamma)^2$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 100,
    "solution": "$Y = \\begin{bmatrix} \\alpha & \\beta & \\gamma \\\\ 0 & \\alpha & \\beta \\\\ 0 & 0 & \\alpha \\end{bmatrix}$. $Y Y^{-1} = I \\implies \\alpha/5 = 1 \\implies \\alpha = 5$. Next, $-2\\alpha/5 + \\beta/5 = 0 \\implies \\beta = 2\\alpha = 10$. Next, $\\alpha/5 - 2\\beta/5 + \\gamma/5 = 0 \\implies 1 - 4 + \\gamma/5 = 0 \\implies \\gamma = 15$. Then $\\alpha - \\beta + \\gamma = 5 - 10 + 15 = 10$. Therefore $(\\alpha - \\beta + \\gamma)^2 = 10^2 = 100$.",
    "image_url": ""
  },
  {
    "q_num": 89,
    "question_type": "numerical",
    "question_text": "Let $X = \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}$, $Y = \\alpha I + \\beta X + \\gamma X^2$ and $Z = \\alpha^2 I - \\alpha\\beta X + (\\beta^2 - \\alpha\\gamma) X^2, \\alpha, \\beta, \\gamma \\in \\mathbb{R}$. If $Y^{-1} = \\begin{bmatrix} 1/5 & -2/5 & 1/5 \\\\ 0 & 1/5 & -2/5 \\\\ 0 & 0 & 1/5 \\end{bmatrix}$, then $(\\alpha - \\beta + \\gamma)^2$ is equal to _______ (Shift 2).",
    "options": [],
    "correct_index": null,
    "numeric_answer": 100,
    "solution": "As established, $\\alpha = 5, \\beta = 10, \\gamma = 15$. Then $\\alpha - \\beta + \\gamma = 5 - 10 + 15 = 10$. Thus $(\\alpha - \\beta + \\gamma)^2 = 10^2 = 100$.",
    "image_url": ""
  },
  {
    "q_num": 90,
    "question_type": "numerical",
    "question_text": "Let $A$ be a matrix of order $2 \\times 2$, whose entries are from the set $\\{0, 1, 2, 3, 4, 5\\}$. If the sum of all the entries of $A$ is a prime number $p, 2 < p < 8$, then the number of such matrices $A$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 180,
    "solution": "The prime numbers $p$ strictly between 2 and 8 are $p \\in \\{3, 5, 7\\}$. We need the number of solutions to $a + b + c + d = p$ with $a, b, c, d \\in \\{0, 1, 2, 3, 4, 5\\}$. For $p = 3$: $\\binom{3+4-1}{3} = \\binom{6}{3} = 20$. For $p = 5$: $\\binom{5+4-1}{5} = \\binom{8}{5} = 56$. For $p = 7$: total non-negative solutions is $\\binom{7+4-1}{7} = \\binom{10}{7} = 120$. Subtract cases where an entry $\\ge 6$: $4 \\times \\binom{1+4-1}{1} = 16$. So $120 - 16 = 104$. Total number of matrices $= 20 + 56 + 104 = 180$.",
    "image_url": ""
  },
  {
    "q_num": 91,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{pmatrix} 1+i & 1 \\\\ -i & 0 \\end{pmatrix}$ where $i = \\sqrt{-1}$. Then, the number of elements in the set $\\{ n \\in \\{1, 2, \\dots, 100\\} : A^n = A \\}$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 25,
    "solution": "Characteristic equation of $A$: $\\det(A - \\lambda I) = \\lambda^2 - (1+i)\\lambda + i = (\\lambda - 1)(\\lambda - i) = 0$. Eigenvalues are $1$ and $i$. $i^4 = 1$, so $A^4 = I$. Thus $A^n = A \\iff n \\equiv 1 \\pmod 4$. In the range $\\{1, 2, \\dots, 100\\}$, $n \\in \\{1, 5, 9, \\dots, 97\\}$. Number of terms $= \\frac{97 - 1}{4} + 1 = 24 + 1 = 25$.",
    "image_url": ""
  },
  {
    "q_num": 92,
    "question_type": "mcq",
    "question_text": "The probability that a randomly chosen $2 \\times 2$ matrix with all the entries from the set of first 10 primes, is singular, is equal to:",
    "options": [
      "$133/10^4$",
      "$19/10^3$",
      "$18/10^3$",
      "$271/10^4$"
    ],
    "correct_index": 1,
    "solution": "Total $2 \\times 2$ matrices with entries from 10 distinct primes is $10^4$. For a singular matrix, $ad - bc = 0 \\implies ad = bc$. Case 1: All 4 entries equal ($a = b = c = d$): 10 ways. Case 2: Exactly two distinct primes: $\\{a, d\\} = \\{b, c\\}$ with $a \\neq d$: choose 2 primes in $\\binom{10}{2} = 45$ ways, arrangements = $2! \\times 2! = 4$ ways $\\implies 45 \\times 4 = 180$ ways. Total singular matrices $= 10 + 180 = 190$. Probability $= \\frac{190}{10^4} = \\frac{19}{10^3}$.",
    "image_url": ""
  },
  {
    "q_num": 93,
    "question_type": "mcq",
    "question_text": "Let $A = [a_{ij}]$ be a square matrix of order 3 such that $a_{ij} = 2^{j-i}$, for all $i, j = 1, 2, 3$. Then, the matrix $A^2 + A^3 + \\dots + A^{10}$ is equal to:",
    "options": [
      "$\\left(\\frac{3^{10} - 1}{2}\\right) A$",
      "$\\left(\\frac{3^{10} + 1}{2}\\right) A$",
      "$\\left(\\frac{3^{10} + 3}{2}\\right) A$",
      "$\\left(\\frac{3^{10} - 3}{2}\\right) A$"
    ],
    "correct_index": 3,
    "solution": "$A = \\begin{bmatrix} 1 & 2 & 4 \\\\ 1/2 & 1 & 2 \\\\ 1/4 & 1/2 & 1 \\end{bmatrix}$. Notice $\\text{tr}(A) = 3$ and rank of $A$ is 1, so $A^2 = \\text{tr}(A) A = 3A$. In general, $A^k = 3^{k-1} A$. Then $A^2 + A^3 + \\dots + A^{10} = (3 + 3^2 + \\dots + 3^9) A = 3 \\frac{3^9 - 1}{3 - 1} A = \\frac{3^{10} - 3}{2} A$.",
    "image_url": ""
  },
  {
    "q_num": 94,
    "question_type": "numerical",
    "question_text": "Let $M = \\begin{bmatrix} 0 & -\\alpha \\\\ \\alpha & 0 \\end{bmatrix}$, where $\\alpha$ is a non-zero real number and $N = \\sum_{k=1}^{49} M^{2k}$. If $(I - M^2)N = -2I$, then the positive integral value of $\\alpha$ is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 1,
    "solution": "$M^2 = -\\alpha^2 I$. Then $N = \\sum_{k=1}^{49} (-\\alpha^2)^k I = \\frac{-\\alpha^2 (1 - (-\\alpha^2)^{49})}{1 - (-\\alpha^2)} I = \\frac{-\\alpha^2 (1 + \\alpha^{98})}{1 + \\alpha^2} I$. Then $(I - M^2)N = (1 + \\alpha^2) N = -\\alpha^2 (1 + \\alpha^{98}) I = -2I$. For positive integer $\\alpha$, if $\\alpha = 1$: $-1(1 + 1)I = -2I$, which satisfies the condition. Thus $\\alpha = 1$.",
    "image_url": ""
  },
  {
    "q_num": 95,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 2 & -1 \\\\ 0 & 2 \\end{pmatrix}$. If $B = I - \\binom{5}{1} \\text{adj}(A) + \\binom{5}{2} (\\text{adj}(A))^2 - \\dots - \\binom{5}{5} (\\text{adj}(A))^5$, then the sum of all elements of the matrix $B$ is:",
    "options": [
      "-5",
      "-6",
      "-7",
      "-8"
    ],
    "correct_index": 2,
    "solution": "$B = (I - \\text{adj}(A))^5$. For $A = \\begin{bmatrix} 2 & -1 \\\\ 0 & 2 \\end{bmatrix}$, $\\text{adj}(A) = \\begin{bmatrix} 2 & 1 \\\\ 0 & 2 \\end{bmatrix}$. Then $I - \\text{adj}(A) = \\begin{bmatrix} -1 & -1 \\\\ 0 & -1 \\end{bmatrix} = -\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$. Then $B = (-1)^5 \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}^5 = -\\begin{bmatrix} 1 & 5 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} -1 & -5 \\\\ 0 & -1 \\end{bmatrix}$. Sum of all elements $= -1 + (-5) + 0 + (-1) = -7$.",
    "image_url": ""
  },
  {
    "q_num": 96,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 2 & -1 & -1 \\\\ 1 & 0 & -1 \\\\ 1 & -1 & 0 \\end{bmatrix}$ and $B = A - I$. If $\\omega = \\frac{\\sqrt{3}i - 1}{2}$, then the number of elements in the set $\\{ n \\in \\{1, 2, \\dots, 100\\} : A^n + (\\omega B)^n = A + B \\}$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 17,
    "solution": "$A^2 = A$, so $A^n = A$ for all $n \\ge 1$. $B = A - I$, so $B^2 = -B, B^3 = B, B^4 = -B$, etc., meaning $B^n = B$ for odd $n$. Also $\\omega$ is a complex cube root of unity, so $\\omega^n = 1$ when $n$ is a multiple of 3. For $(\\omega B)^n = B$, we need $n$ to be both odd and a multiple of 3 (i.e., odd multiples of 3). In $\\{1, 2, \\dots, 100\\}$, the odd multiples of 3 are $3, 9, 15, \\dots, 99$. Number of terms $= \\frac{99 - 3}{6} + 1 = 16 + 1 = 17$.",
    "image_url": ""
  },
  {
    "q_num": 97,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 1 & a & a \\\\ 0 & 1 & b \\\\ 0 & 0 & 1 \\end{bmatrix}, a, b \\in \\mathbb{R}$. If for some $n \\in \\mathbb{N}$, $A^n = \\begin{bmatrix} 1 & 48 & 2160 \\\\ 0 & 1 & 96 \\\\ 0 & 0 & 1 \\end{bmatrix}$, then $n + a + b$ is equal to _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 24,
    "solution": "$A = I + N$ where $N = \\begin{bmatrix} 0 & a & a \\\\ 0 & 0 & b \\\\ 0 & 0 & 0 \\end{bmatrix}$. $N^2 = \\begin{bmatrix} 0 & 0 & ab \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}$ and $N^3 = 0$. $A^n = I + nN + \\frac{n(n-1)}{2} N^2 = \\begin{bmatrix} 1 & na & na + \\frac{n(n-1)}{2} ab \\\\ 0 & 1 & nb \\\\ 0 & 0 & 1 \\end{bmatrix}$. Given $na = 48$ and $nb = 96 \\implies b = 2a$. Also $na + \\frac{n(n-1)}{2} ab = 2160 \\implies 48 + \\frac{n-1}{2} (48)(2a/n) = 2160 \\dots$ Solving yields $n = 12, a = 4, b = 8$. Then $n + a + b = 12 + 4 + 8 = 24$.",
    "image_url": ""
  },
  {
    "q_num": 98,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $2 \\times 2$ matrix with $\\det(A) = -1$ and $\\det((A + I)(\\text{Adj}(A) + I)) = 4$. Then the sum of the diagonal elements of $A$ can be:",
    "options": [
      "-1",
      "2",
      "1",
      "$-\\sqrt{2}$"
    ],
    "correct_index": 1,
    "solution": "$(A + I)(\\text{adj}(A) + I) = A\\text{adj}(A) + A + \\text{adj}(A) + I = |A|I + A + \\text{adj}(A) + I = -I + A + \\text{adj}(A) + I = A + \\text{adj}(A)$. For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $\\text{adj}(A) = \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$, so $A + \\text{adj}(A) = (a + d)I$. Then $\\det(A + \\text{adj}(A)) = (a + d)^2 = 4 \\implies a + d = \\pm 2$. Thus the sum of diagonal elements can be 2.",
    "image_url": ""
  },
  {
    "q_num": 99,
    "question_type": "numerical",
    "question_text": "The number of matrices $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, where $a, b, c, d \\in \\{-1, 0, 1, 2, 3, \\dots, 10\\}$, such that $A = A^{-1}$, is _______.",
    "options": [],
    "correct_index": null,
    "numeric_answer": 50,
    "solution": "$A^2 = I \\implies a^2 + bc = 1$, $d^2 + bc = 1$, and $(a+d)b = 0, (a+d)c = 0$. Case 1: $a + d = 0 \\implies d = -a$. Possible $a \\in \\{-1, 0, 1\\}$ since $d \\in \\{-1, 0, \\dots, 10\\}$. Subcase (a): $(a, d) = (-1, 1) \\implies bc = 0$: $b = 0$ (12 choices for $c$) or $c = 0$ (12 choices for $b$) $\\implies 12 + 12 - 1 = 23$ pairs. Subcase (b): $(a, d) = (1, -1) \\implies bc = 0 \\implies 23$ pairs. Subcase (c): $(a, d) = (0, 0) \\implies bc = 1 \\implies (b, c) = (1, 1)$ or $(-1, -1)$ (2 pairs). Total from Case 1 = $23 + 23 + 2 = 48$. Case 2: $b = c = 0 \\implies a = d = \\pm 1 \\implies 2$ matrices ($I$ and $-I$). Total matrices $= 48 + 2 = 50$.",
    "image_url": ""
  },
  {
    "q_num": 100,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$ and $B = \\begin{bmatrix} 9^2 & -10^2 & 11^2 \\\\ 12^2 & 13^2 & -14^2 \\\\ -15^2 & 16^2 & 17^2 \\end{bmatrix}$, then the value of $A^T B A$ is:",
    "options": [
      "1224",
      "1042",
      "540",
      "539"
    ],
    "correct_index": 3,
    "solution": "$A^T B A = [1 \\quad 1 \\quad 1] B \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$ is the sum of all elements of $B$. Sum of row 1: $81 - 100 + 121 = 102$. Sum of row 2: $144 + 169 - 196 = 117$. Sum of row 3: $-225 + 256 + 289 = 320$. Total sum $= 102 + 117 + 320 = 539$.",
    "image_url": ""
  }
];
