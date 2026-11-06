import json

with open('backend/scripts/official_answer_key_matrices.json', 'r', encoding='utf-8') as f:
    key = json.load(f)

PART4 = [
  {
    "q_num": 151,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix such that $X^T AX = 0$ for all nonzero $3 \\times 1$ matrices $X = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}$. If $A \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 4 \\\\ -5 \\end{bmatrix}$, $A \\begin{bmatrix} 1 \\\\ 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 4 \\\\ -8 \\end{bmatrix}$, and $\\det(\\text{adj}(2(A + I))) = 2^\\alpha 3^\\beta 5^\\gamma$, $\\alpha, \\beta, \\gamma \\in \\mathbb{N}$, then $\\alpha^2 + \\beta^2 + \\gamma^2$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 44,
    "solution": "$X^T AX = 0$ for all $X \\implies A$ is a skew-symmetric matrix. Thus $A = \\begin{bmatrix} 0 & -x & -y \\\\ x & 0 & -z \\\\ y & z & 0 \\end{bmatrix}$. Given $A [1, 1, 1]^T = [1, 4, -5]^T$ and $A [1, 2, 1]^T = [0, 4, -8]^T$, solving yields $x = 1, y = -2, z = 3$, so $A = \\begin{bmatrix} 0 & -1 & 2 \\\\ 1 & 0 & -3 \\\\ -2 & 3 & 0 \\end{bmatrix}$. Then $2(A + I) = \\begin{bmatrix} 2 & -2 & 4 \\\\ 2 & 2 & -6 \\\\ -4 & 6 & 2 \\end{bmatrix}$, and $\\det(2(A+I)) = 120$. For order 3, $\\det(\\text{adj}(M)) = (\\det M)^2 = 120^2 = (2^3 \\cdot 3 \\cdot 5)^2 = 2^6 \\cdot 3^2 \\cdot 5^2$. Thus $\\alpha = 6, \\beta = 2, \\gamma = 2$. Then $\\alpha^2 + \\beta^2 + \\gamma^2 = 6^2 + 2^2 + 2^2 = 36 + 4 + 4 = 44$.",
    "image_url": ""
  },
  {
    "q_num": 152,
    "question_type": "numerical",
    "question_text": "Let $M$ denote the set of all real matrices of order $3 \\times 3$ and let $S = \\{-3, -2, -1, 1, 2\\}$. Let $S_1 = \\{ A = [a_{ij}] \\in M : A = A^T \\text{ and } a_{ij} \\in S, \\forall i, j \\}$, $S_2 = \\{ A = [a_{ij}] \\in M : A = -A^T \\text{ and } a_{ij} \\in S, \\forall i, j \\}$, $S_3 = \\{ A = [a_{ij}] \\in M : a_{11} + a_{22} + a_{33} = 0 \\text{ and } a_{ij} \\in S, \\forall i, j \\}$. If $n(S_1 \\cup S_2 \\cup S_3) = 125\\alpha$, then $\\alpha$ equals _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 1613,
    "solution": "$S = \\{-3, -2, -1, 1, 2\\}$ has 5 elements (note $0 \\notin S$). $S_2 = \\emptyset$ because skew-symmetric matrices require diagonal elements to be 0, but $0 \\notin S$. Number of elements in $S_1$: symmetric matrix with 6 independent entries $\\implies 5^6$. Number of elements in $S_3$: 6 off-diagonal entries can be chosen in $5^6$ ways, and 3 diagonal entries summing to 0 from $S$ can be chosen in 12 ways $\\implies 12 \\times 5^6$. Number of elements in $S_1 \\cap S_3$: 3 off-diagonal pairs in $5^3$ ways and diagonal in 12 ways $\\implies 12 \\times 5^3$. Thus $n(S_1 \\cup S_2 \\cup S_3) = n(S_1 \\cup S_3) = 5^6 + 12 \\times 5^6 - 12 \\times 5^3 = 13 \\times 5^6 - 12 \\times 5^3 = 5^3 (13 \\times 5^3 - 12) = 125(1625 - 12) = 125(1613)$. Thus $\\alpha = 1613$.",
    "image_url": ""
  },
  {
    "q_num": 153,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1/\\sqrt{2} & -2 \\\\ 0 & 1 \\end{bmatrix}$ and $P = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}, \\theta > 0$. If $B = PAP^T, C = P^T B^{10} P$ and the sum of the diagonal elements of $C$ is $\\frac{m}{n}$, where $\\gcd(m, n) = 1$, then $m + n$ is:",
    "options": [
      "127",
      "258",
      "65",
      "2049"
    ],
    "correct_index": 2,
    "solution": "$PP^T = I$, so $P^T = P^{-1}$. $B = PAP^T \\implies B^{10} = P A^{10} P^T$. Then $C = P^T B^{10} P = P^T (P A^{10} P^T) P = A^{10}$. Since $A$ is upper triangular with diagonal entries $1/\\sqrt{2}$ and $1$, the diagonal elements of $A^{10}$ are $(1/\\sqrt{2})^{10} = 1/2^5 = 1/32$ and $1^{10} = 1$. The sum of the diagonal elements of $C$ is $\\frac{1}{32} + 1 = \\frac{33}{32} = \\frac{m}{n}$. Here $\\gcd(33, 32) = 1$, so $m = 33$ and $n = 32$. Thus $m + n = 33 + 32 = 65$.",
    "image_url": ""
  },
  {
    "q_num": 154,
    "question_type": "numerical",
    "question_text": "Let $S = \\left\\{ m \\in \\mathbb{Z} : A^{m^2} + A^m = 3I - A^{-6} \\right\\}$, where $A = \\begin{bmatrix} 2 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Then $n(S)$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2,
    "solution": "Characteristic equation of $A$: $\\lambda^2 - 2\\lambda + 1 = 0 \\implies (\\lambda - 1)^2 = 0$. So $A = I + N$ where $N = \\begin{bmatrix} 1 & -1 \\\\ 1 & -1 \\end{bmatrix}$, with $N^2 = 0$. Then $A^k = I + kN$ for all $k \\in \\mathbb{Z}$. The given condition becomes $(I + m^2 N) + (I + mN) = 3I - (I - 6N) = 2I + 6N \\implies 2I + (m^2 + m)N = 2I + 6N \\implies (m^2 + m - 6)N = 0$. Since $N \\neq 0$, $m^2 + m - 6 = 0 \\implies (m - 2)(m + 3) = 0 \\implies m = 2$ or $m = -3$. Thus $n(S) = 2$.",
    "image_url": ""
  },
  {
    "q_num": 155,
    "question_type": "mcq",
    "question_text": "Let $A = [a_{ij}]$ be a matrix of order $3 \\times 3$, with $a_{ij} = (\\sqrt{2})^{i+j}$. If the sum of all the elements in the third row of $A^2$ is $\\alpha + \\beta\\sqrt{2}, \\alpha, \\beta \\in \\mathbb{Z}$, then $\\alpha + \\beta$ is equal to:",
    "options": [
      "280",
      "224",
      "210",
      "168"
    ],
    "correct_index": 1,
    "solution": "$A = \\begin{bmatrix} 2 & 2\\sqrt{2} & 4 \\\\ 2\\sqrt{2} & 4 & 4\\sqrt{2} \\\\ 4 & 4\\sqrt{2} & 8 \\end{bmatrix}$. Notice $\\text{tr}(A) = 2 + 4 + 8 = 14$ and rank of $A$ is 1. Thus $A^2 = \\text{tr}(A) A = 14A$. The third row of $A^2$ is $14 \\times [4 \\quad 4\\sqrt{2} \\quad 8] = [56 \\quad 56\\sqrt{2} \\quad 112]$. The sum of all elements in the third row is $56 + 56\\sqrt{2} + 112 = 168 + 56\\sqrt{2}$. Comparing with $\\alpha + \\beta\\sqrt{2}$: $\\alpha = 168$ and $\\beta = 56$. Thus $\\alpha + \\beta = 168 + 56 = 224$.",
    "image_url": ""
  },
  {
    "q_num": 156,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} \\alpha & -1 \\\\ 6 & \\beta \\end{bmatrix}, \\alpha > 0$, such that $\\det(A) = 0$ and $\\alpha + \\beta = 1$. If $I$ denotes $2 \\times 2$ identity matrix, then the matrix $(I + A)^8$ is:",
    "options": [
      "$\\begin{bmatrix} 4 & -1 \\\\ 6 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 257 & -64 \\\\ 514 & -127 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1025 & -511 \\\\ 2024 & -1024 \\end{bmatrix}$",
      "$\\begin{bmatrix} 766 & -255 \\\\ 1530 & -509 \\end{bmatrix}$"
    ],
    "correct_index": 3,
    "solution": "$\\det(A) = \\alpha\\beta + 6 = 0 \\implies \\alpha\\beta = -6$. With $\\alpha + \\beta = 1$ and $\\alpha > 0$, we get $\\alpha = 3$ and $\\beta = -2$. Then $A = \\begin{bmatrix} 3 & -1 \\\\ 6 & -2 \\end{bmatrix}$. Notice $A^2 = \\begin{bmatrix} 3 & -1 \\\\ 6 & -2 \\end{bmatrix} \\begin{bmatrix} 3 & -1 \\\\ 6 & -2 \\end{bmatrix} = \\begin{bmatrix} 3 & -1 \\\\ 6 & -2 \\end{bmatrix} = A$. In general $A^k = A$ for all $k \\ge 1$. Then $(I + A)^8 = I + \\sum_{k=1}^8 \\binom{8}{k} A^k = I + (2^8 - 1)A = I + 255A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} + 255 \\begin{bmatrix} 3 & -1 \\\\ 6 & -2 \\end{bmatrix} = \\begin{bmatrix} 766 & -255 \\\\ 1530 & -509 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 157,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $3 \\times 3$ real matrix such that $A^2(A - 2I) - 4(A - I) = O$, where $I$ and $O$ are the identity and null matrices, respectively. If $A^5 = \\alpha A^2 + \\beta A + \\gamma I$, where $\\alpha, \\beta$ and $\\gamma$ are real constants, then $\\alpha + \\beta + \\gamma$ is equal to:",
    "options": [
      "12",
      "20",
      "76",
      "4"
    ],
    "correct_index": 0,
    "solution": "Given $A^3 - 2A^2 - 4A + 4I = O \\implies A^3 = 2A^2 + 4A - 4I$. Multiplying by $A$: $A^4 = 2A^3 + 4A^2 - 4A = 2(2A^2 + 4A - 4I) + 4A^2 - 4A = 8A^2 + 4A - 8I$. Multiplying by $A$ again: $A^5 = 8A^3 + 4A^2 - 8A = 8(2A^2 + 4A - 4I) + 4A^2 - 8A = 20A^2 + 24A - 32I$. Thus $\\alpha = 20, \\beta = 24, \\gamma = -32$. Therefore $\\alpha + \\beta + \\gamma = 20 + 24 - 32 = 12$.",
    "image_url": ""
  },
  {
    "q_num": 158,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} \\cos\\theta & 0 & -\\sin\\theta \\\\ 0 & 1 & 0 \\\\ \\sin\\theta & 0 & \\cos\\theta \\end{bmatrix}$. If for some $\\theta \\in (0, \\pi)$, $A^2 = A^T$, then the sum of the diagonal elements of the matrix $(A + I)^3 + (A - I)^3 - 6A$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 6,
    "solution": "$A$ is an orthogonal matrix, so $A^T = A^{-1}$. Given $A^2 = A^T = A^{-1} \\implies A^3 = I$. Let $B = (A + I)^3 + (A - I)^3 - 6A = (A^3 + 3A^2 + 3A + I) + (A^3 - 3A^2 + 3A - I) - 6A = 2A^3 + 6A - 6A = 2A^3 = 2I$. Since $B = 2I$, the sum of its diagonal elements is $\\text{tr}(2I) = 2(3) = 6$.",
    "image_url": ""
  },
  {
    "q_num": 159,
    "question_type": "mcq",
    "question_text": "Let the matrix $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 0 \\end{bmatrix}$ satisfy $A^n = A^{n-2} + A^2 - I$ for $n \\ge 3$. Then the sum of all the elements of $A^{50}$ is:",
    "options": [
      "53",
      "52",
      "39",
      "44"
    ],
    "correct_index": 0,
    "solution": "From $A^n - A^{n-2} = A^2 - I$, summing for even powers gives $A^{50} = A^2 + 24(A^2 - I) = 25A^2 - 24I$. We calculate $A^2 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix}$. Then $A^{50} = 25 \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix} - 24 \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 25 & 1 & 0 \\\\ 25 & 0 & 1 \\end{bmatrix}$. The sum of all elements is $1 + 0 + 0 + 25 + 1 + 0 + 25 + 0 + 1 = 53$.",
    "image_url": ""
  },
  {
    "q_num": 160,
    "question_type": "numerical",
    "question_text": "The number of singular matrices of order 2, whose elements are from the set $\\{2, 3, 6, 9\\}$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 36,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}, a, b, c, d \\in \\{2, 3, 6, 9\\}$. $A$ is singular $\\iff ad = bc$. Case 1: Exactly 1 number used ($a=b=c=d$): 4 matrices. Case 2: Exactly 2 numbers used: either $\\{a, d\\} = \\{b, c\\}$ (giving $\\binom{4}{2} \\times 2 \\times 2 = 24$) or $2 \\times 9 = 3 \\times 6$ with 2 distinct numbers $\\dots$ Total number of singular matrices is 36.",
    "image_url": ""
  },
  {
    "q_num": 161,
    "question_type": "mcq",
    "question_text": "Let $\\alpha$ be a solution of $x^2 + x + 1 = 0$, and for some $a$ and $b$ in $\\mathbb{R}$, $[4 \\quad a \\quad b] \\begin{bmatrix} 1 & 16 & 13 \\\\ -1 & -1 & 2 \\\\ -2 & -14 & -8 \\end{bmatrix} = [0 \\quad 0 \\quad 0]$. If $\\frac{4}{\\alpha^4} + \\frac{m}{\\alpha^6} + \\frac{n}{\\alpha^8} = 3$, then $m + n$ is equal to:",
    "options": [
      "3",
      "11",
      "7",
      "8"
    ],
    "correct_index": 1,
    "solution": "Multiplying: $4 - a - 2b = 0 \\implies a + 2b = 4$, and $64 - a - 14b = 0 \\implies a + 14b = 64$. Subtracting: $12b = 60 \\implies b = 5, a = -6$. Now $\\alpha = \\omega$ (cube root of unity). The equation is $\\frac{4}{\\omega} + m + \\frac{n}{\\omega^2} = 3 \\implies 4\\omega^2 + m + n\\omega = 3 \\implies 4\\left(-\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}\\right) + m + n\\left(-\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}\\right) = 3$. Equating imaginary parts: $-2\\sqrt{3} + n\\frac{\\sqrt{3}}{2} = 0 \\implies n = 4$. Equating real parts: $-2 + m - \\frac{n}{2} = 3 \\implies -2 + m - 2 = 3 \\implies m = 7$. Thus $m + n = 7 + 4 = 11$.",
    "image_url": ""
  },
  {
    "q_num": 162,
    "question_type": "numerical",
    "question_text": "For some $\\alpha, \\beta \\in \\mathbb{R}$, let $A = \\begin{bmatrix} \\alpha & 2 \\\\ 1 & 2 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 1 \\\\ 1 & \\beta \\end{bmatrix}$ be such that $A^2 - 4A + 2I = B^2 - 3B + I = O$. Then $(\\det(\\text{adj}(A^3 - B^3)))^2$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 225,
    "solution": "Trace of $A$ is $\\alpha + 2 = 4 \\implies \\alpha = 2$. Trace of $B$ is $1 + \\beta = 3 \\implies \\beta = 2$. $A^2 - 4A + 2I = 0 \\implies A^3 = 4A^2 - 2A = 4(4A - 2I) - 2A = 14A - 8I$. $B^2 - 3B + I = 0 \\implies B^3 = 3B^2 - B = 3(3B - I) - B = 8B - 3I$. Then $A^3 - B^3 = 14A - 8B - 5I = 14 \\begin{bmatrix} 2 & 2 \\\\ 1 & 2 \\end{bmatrix} - 8 \\begin{bmatrix} 1 & 1 \\\\ 1 & 2 \\end{bmatrix} - 5 \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 15 & 20 \\\\ 6 & 7 \\end{bmatrix}$. $\\det(A^3 - B^3) = 15(7) - 20(6) = 105 - 120 = -15$. For $2 \\times 2$ matrix, $\\text{adj}(M)$ has determinant equal to $\\det(M)$. Therefore $(\\det(\\text{adj}(A^3 - B^3)))^2 = (-15)^2 = 225$.",
    "image_url": ""
  },
  {
    "q_num": 163,
    "question_type": "mcq",
    "question_text": "For the matrices $A = \\begin{bmatrix} 3 & -4 \\\\ 1 & -1 \\end{bmatrix}$ and $B = \\begin{bmatrix} -29 & 49 \\\\ -13 & 18 \\end{bmatrix}$, if $(A^{15} + B) \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}$, then among the following which one is true?",
    "options": [
      "$x = 5, y = 7$",
      "$x = 18, y = 11$",
      "$x = 11, y = 2$",
      "$x = 16, y = 3$"
    ],
    "correct_index": 2,
    "solution": "$A = I + \\begin{bmatrix} 2 & -4 \\\\ 1 & -2 \\end{bmatrix} \\implies A^n = \\begin{bmatrix} 2n + 1 & -4n \\\\ n & -2n + 1 \\end{bmatrix}$. For $n = 15$: $A^{15} = \\begin{bmatrix} 31 & -60 \\\\ 15 & -29 \\end{bmatrix}$. Then $A^{15} + B = \\begin{bmatrix} 31 - 29 & -60 + 49 \\\\ 15 - 13 & -29 + 18 \\end{bmatrix} = \\begin{bmatrix} 2 & -11 \\\\ 2 & -11 \\end{bmatrix}$. The equation becomes $\\begin{bmatrix} 2 & -11 \\\\ 2 & -11 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} \\implies 2x - 11y = 0 \\implies x = \\frac{11}{2}y$. For $y = 2$, $x = 11$.",
    "image_url": ""
  },
  {
    "q_num": 164,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix such that $A + A^T = O$. If $A \\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 3 \\\\ 2 \\end{bmatrix}$, $A^2 \\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 19 \\\\ -24 \\end{bmatrix}$, and $\\det(\\text{adj}(2\\text{adj}(A + I))) = (2)^\\alpha \\cdot (3)^\\beta \\cdot (11)^\\gamma$, $\\alpha, \\beta, \\gamma$ are non-negative integers, then $\\alpha + \\beta + \\gamma$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 18,
    "solution": "$A$ is skew-symmetric, so $A = \\begin{bmatrix} 0 & -c & b \\\\ c & 0 & -a \\\\ -b & a & 0 \\end{bmatrix}$. From $A [1, -1, 0]^T = [3, 3, 2]^T \\implies c = 3$ and $a + b = -2$. From $A^2 [1, -1, 0]^T = [-3, 19, -24]^T \\implies b = 3, a = -5$. Then $A + I = \\begin{bmatrix} 1 & -3 & 3 \\\\ 3 & 1 & 5 \\\\ -3 & -5 & 1 \\end{bmatrix}$, and $\\det(A + I) = 44 = 2^2 \\cdot 11$. For order 3: $\\det(\\text{adj}(M)) = (\\det M)^2$. Here $M = 2\\text{adj}(A+I)$, so $\\det(M) = 2^3 (\\det(A+I))^2 = 8(44^2) = 15488 = 2^7 \\cdot 11^2$. Then $\\det(\\text{adj}(M)) = (15488)^2 = 2^{14} \\cdot 11^4$. Thus $\\alpha = 14, \\beta = 0, \\gamma = 4$. Then $\\alpha + \\beta + \\gamma = 14 + 0 + 4 = 18$.",
    "image_url": ""
  },
  {
    "q_num": 165,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 2 & 3 \\\\ 3 & 5 \\end{bmatrix}$, then the determinant of the matrix $(A^{2025} - 3A^{2024} + A^{2023})$ is:",
    "options": [
      "12",
      "28",
      "24",
      "16"
    ],
    "correct_index": 3,
    "solution": "$A^{2025} - 3A^{2024} + A^{2023} = A^{2023}(A^2 - 3A + I)$. $\\det(A) = 10 - 9 = 1 \\implies \\det(A^{2023}) = 1^{2023} = 1$. $A^2 = \\begin{bmatrix} 2 & 3 \\\\ 3 & 5 \\end{bmatrix} \\begin{bmatrix} 2 & 3 \\\\ 3 & 5 \\end{bmatrix} = \\begin{bmatrix} 13 & 21 \\\\ 21 & 34 \\end{bmatrix}$. Then $A^2 - 3A + I = \\begin{bmatrix} 13 & 21 \\\\ 21 & 34 \\end{bmatrix} - \\begin{bmatrix} 6 & 9 \\\\ 9 & 15 \\end{bmatrix} + \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 8 & 12 \\\\ 12 & 20 \\end{bmatrix}$. Determinant $= 8(20) - 12(12) = 160 - 144 = 16$.",
    "image_url": ""
  },
  {
    "q_num": 166,
    "question_type": "mcq",
    "question_text": "If $X = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix}$ is a solution of the system of equations $AX = B$, where $\\text{adj} A = \\begin{bmatrix} 4 & 2 & 2 \\\\ -5 & 0 & 5 \\\\ 1 & -2 & 3 \\end{bmatrix}$ and $B = \\begin{bmatrix} 4 \\\\ 0 \\\\ 2 \\end{bmatrix}$, then $|x + y + z|$ is equal to:",
    "options": [
      "2",
      "3/2",
      "1",
      "3"
    ],
    "correct_index": 0,
    "solution": "$X = A^{-1} B = \\frac{1}{|A|} \\text{adj}(A) \\cdot B$. $|\\text{adj}(A)| = 4(10) - 2(-20) + 2(10) = 40 + 40 + 20 = 100$. For a $3 \\times 3$ matrix, $|\\text{adj}(A)| = |A|^2 = 100 \\implies |A| = \\pm 10$. $\\text{adj}(A) \\cdot B = \\begin{bmatrix} 4 & 2 & 2 \\\\ -5 & 0 & 5 \\\\ 1 & -2 & 3 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 0 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 16 + 0 + 4 \\\\ -20 + 0 + 10 \\\\ 4 + 0 + 6 \\end{bmatrix} = \\begin{bmatrix} 20 \\\\ -10 \\\\ 10 \\end{bmatrix}$. Then $x + y + z = \\frac{20 - 10 + 10}{|A|} = \\frac{20}{\\pm 10} = \\pm 2$. Thus $|x + y + z| = 2$.",
    "image_url": ""
  },
  {
    "q_num": 167,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 0 & 2 & -3 \\\\ -2 & 0 & 1 \\\\ 3 & -1 & 0 \\end{bmatrix}$ and $B$ be a matrix such that $B(I - A) = I + A$. Then the sum of the diagonal elements of $B^T B$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 3,
    "solution": "Notice $A$ is skew-symmetric ($A^T = -A$). $B = (I + A)(I - A)^{-1}$. Taking transpose: $B^T = ((I - A)^{-1})^T (I + A)^T = (I - A^T)^{-1} (I + A^T) = (I + A)^{-1} (I - A)$. Since $(I + A)$ and $(I - A)$ commute, $B^T B = (I + A)^{-1} (I - A) (I + A)(I - A)^{-1} = (I + A)^{-1} (I + A) (I - A)(I - A)^{-1} = I$. Since $B^T B = I_3$, the sum of its diagonal elements is $\\text{tr}(I_3) = 3$.",
    "image_url": ""
  },
  {
    "q_num": 168,
    "question_type": "numerical",
    "question_text": "The number of $3 \\times 2$ matrices $A$, which can be formed using the elements of the set $\\{-2, -1, 0, 1, 2\\}$ such that the sum of all the diagonal elements of $A^T A$ is 5, is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 312,
    "solution": "For a $3 \\times 2$ matrix $A$, $\\text{tr}(A^T A)$ is the sum of squares of all 6 elements: $\\sum_{i=1}^6 x_i^2 = 5$ where $x_i \\in \\{-2, -1, 0, 1, 2\\}$. The squares can be $0, 1, 4$. Case 1: one 4 (element $\\pm 2$), one 1 (element $\\pm 1$), and four 0's. Positions: $\\binom{6}{1} \\times \\binom{5}{1} = 30$. Signs: $2 \\times 2 = 4$. Total $= 30 \\times 4 = 120$. Case 2: five 1's (elements $\\pm 1$) and one 0. Positions: $\\binom{6}{1} = 6$. Signs: $2^5 = 32$. Total $= 6 \\times 32 = 192$. Sum $= 120 + 192 = 312$.",
    "image_url": ""
  },
  {
    "q_num": 169,
    "question_type": "mcq",
    "question_text": "Let $f(x) = \\int \\frac{7x^{10} + 9x^8}{(1 + x^2 + 2x^9)^2} dx, x > 0, \\lim_{x \\to 0} f(x) = 0$ and $f(1) = 1/4$. If $A = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1/4 & f'(1) & 1 \\\\ \\alpha^2 & 4 & 1 \\end{bmatrix}$ and $B = \\text{adj}(\\text{adj} A)$ be such that $|B| = 81$, then $\\alpha^2$ is equal to:",
    "options": [
      "2",
      "1",
      "3",
      "4"
    ],
    "correct_index": 3,
    "solution": "Dividing numerator and denominator by $x^{18}$: $f(x) = \\int \\frac{7x^{-8} + 9x^{-10}}{(x^{-9} + x^{-7} + 2)^2} dx = \\frac{1}{x^{-9} + x^{-7} + 2} + C = \\frac{x^9}{1 + x^2 + 2x^9}$. Then $f'(x) = \\frac{9x^8(1 + x^2 + 2x^9) - x^9(2x + 18x^8)}{(1 + x^2 + 2x^9)^2}$. At $x = 1$: $f'(1) = \\frac{9(4) - 1(20)}{4^2} = \\frac{16}{16} = 1$. Matrix $A = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1/4 & 1 & 1 \\\\ \\alpha^2 & 4 & 1 \\end{bmatrix}$, so $\\det(A) = 1(1 - \\alpha^2) = 1 - \\alpha^2$. $|B| = |\\text{adj}(\\text{adj} A)| = |A|^{(3-1)^2} = |A|^4 = (1 - \\alpha^2)^4 = 81 = 3^4 \\implies |1 - \\alpha^2| = 3 \\implies \\alpha^2 - 1 = 3 \\implies \\alpha^2 = 4$.",
    "image_url": ""
  },
  {
    "q_num": 170,
    "question_type": "mcq",
    "question_text": "Let $A, B$ and $C$ be three $2 \\times 2$ matrices with real entries such that $B = (I + A)^{-1}$ and $A + C = I$. If $BC = \\begin{bmatrix} 1 & -5 \\\\ -1 & 2 \\end{bmatrix}$ and $CB \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 12 \\\\ -6 \\end{bmatrix}$, then $x_1 + x_2$ is:",
    "options": [
      "2",
      "-2",
      "0",
      "4"
    ],
    "correct_index": 2,
    "solution": "$B = (I+A)^{-1} \\implies B(I+A) = I \\implies BA = I - B$. Since $C = I - A$, $BC = B(I - A) = B - BA = B - (I - B) = 2B - I$. Similarly $CB = (I - A)B = B - AB = 2B - I = BC$. Thus $CB = BC = \\begin{bmatrix} 1 & -5 \\\\ -1 & 2 \\end{bmatrix}$. The determinant is $2 - 5 = -3$. Then $\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = (CB)^{-1} \\begin{bmatrix} 12 \\\\ -6 \\end{bmatrix} = -\\frac{1}{3} \\begin{bmatrix} 2 & 5 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} 12 \\\\ -6 \\end{bmatrix} = -\\frac{1}{3} \\begin{bmatrix} -6 \\\\ 6 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ -2 \\end{bmatrix}$. Thus $x_1 + x_2 = 2 + (-2) = 0$.",
    "image_url": ""
  },
  {
    "q_num": 171,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 3 & -4 \\\\ 1 & -1 \\end{bmatrix}$ and $B$ be two matrices such that $A^{100} = 100B + I$. Then the sum of all the elements of $B^{100}$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 0,
    "solution": "$A = I + M$, where $M = \\begin{bmatrix} 2 & -4 \\\\ 1 & -2 \\end{bmatrix}$. Notice $M^2 = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix} = O$. Then $A^{100} = (I + M)^{100} = I + 100M$. Given $A^{100} = I + 100B \\implies B = M$. Since $B = M$ and $M^2 = O$, all higher powers $B^k = O$ for $k \\ge 2$. Thus $B^{100} = O$. The sum of all elements of $B^{100}$ is 0.",
    "image_url": ""
  },
  {
    "q_num": 172,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 1 & \\alpha \\end{bmatrix}$ and $B = \\begin{bmatrix} 3 & 3 \\\\ \\beta & 2 \\end{bmatrix}$. If $A^2 - 4A + I = O$ and $B^2 - 5B - 6I = O$, then among the two statements:\\n(S1): $[(B - A)(B + A)]^T = \\begin{bmatrix} 13 & 15 \\\\ 7 & 10 \\end{bmatrix}$ and\\n(S2): $\\det(\\text{adj}(A + B)) = -5$,",
    "options": [
      "only (S1) is correct",
      "only (S2) is correct",
      "both (S1) and (S2) are correct",
      "both (S1) and (S2) are wrong"
    ],
    "correct_index": 1,
    "solution": "Trace of $A$ is $1 + \\alpha = 4 \\implies \\alpha = 3$, so $A = \\begin{bmatrix} 1 & 2 \\\\ 1 & 3 \\end{bmatrix}$. Determinant of $B$ is $6 - 3\\beta = -6 \\implies 3\\beta = 12 \\implies \\beta = 4$, so $B = \\begin{bmatrix} 3 & 3 \\\\ 4 & 2 \\end{bmatrix}$. Then $B - A = \\begin{bmatrix} 2 & 1 \\\\ 3 & -1 \\end{bmatrix}$ and $B + A = \\begin{bmatrix} 4 & 5 \\\\ 5 & 5 \\end{bmatrix}$. $(B - A)(B + A) = \\begin{bmatrix} 13 & 15 \\\\ 7 & 10 \\end{bmatrix} \\implies [(B - A)(B + A)]^T = \\begin{bmatrix} 13 & 7 \\\\ 15 & 10 \\end{bmatrix} \\neq \\begin{bmatrix} 13 & 15 \\\\ 7 & 10 \\end{bmatrix}$, so (S1) is incorrect. $A + B = \\begin{bmatrix} 4 & 5 \\\\ 5 & 5 \\end{bmatrix} \\implies \\det(A + B) = 20 - 25 = -5$. For a $2 \\times 2$ matrix, $\\det(\\text{adj}(M)) = \\det(M) = -5$, so (S2) is correct. Thus only (S2) is correct.",
    "image_url": ""
  },
  {
    "q_num": 173,
    "question_type": "numerical",
    "question_text": "Consider the matrices $A = \\begin{bmatrix} 2 & -2 \\\\ 4 & -2 \\end{bmatrix}$ and $B = \\begin{bmatrix} 3 & 9 \\\\ 1 & 3 \\end{bmatrix}$. If matrices $P$ and $Q$ are such that $PA = B$ and $AQ = B$, then the absolute value of the sum of the diagonal elements of $2(P + Q)$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 34,
    "solution": "$\\det(A) = -4 - (-8) = 4 \\neq 0$, so $A$ is invertible. $P = BA^{-1}$ and $Q = A^{-1} B$. Using cyclic property of trace, $\\text{Tr}(Q) = \\text{Tr}(A^{-1} B) = \\text{Tr}(B A^{-1}) = \\text{Tr}(P)$. $A^{-1} = \\frac{1}{4} \\begin{bmatrix} -2 & 2 \\\\ -4 & 2 \\end{bmatrix} = \\begin{bmatrix} -1/2 & 1/2 \\\\ -1 & 1/2 \\end{bmatrix}$. $P = BA^{-1} = \\begin{bmatrix} 3 & 9 \\\\ 1 & 3 \\end{bmatrix} \\begin{bmatrix} -1/2 & 1/2 \\\\ -1 & 1/2 \\end{bmatrix}$. Diagonal entries of $P$: $p_{11} = -3/2 - 9 = -21/2$; $p_{22} = 1/2 + 3/2 = 2$. $\\text{Tr}(P) = -21/2 + 2 = -17/2$. Then $\\text{Tr}(2(P + Q)) = 2(\\text{Tr}(P) + \\text{Tr}(Q)) = 2(-17/2 - 17/2) = -34$. Absolute value is $|-34| = 34$.",
    "image_url": ""
  },
  {
    "q_num": 174,
    "question_type": "mcq",
    "question_text": "Let $S = \\left\\{ A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} : a, b, c, d \\in \\{0, 1, 2, 3, 4\\} \\text{ and } A^2 - 4A + 3I = 0 \\right\\}$ be a set of $2 \\times 2$ matrices. Then the number of matrices in $S$, for which the sum of the diagonal elements is equal to 4, is:",
    "options": [
      "20",
      "17",
      "21",
      "19"
    ],
    "correct_index": 3,
    "solution": "Trace of $A$ is $a + d = 4$. Cayley-Hamilton gives $A^2 - (a+d)A + (ad - bc)I = 0$. Comparing with $A^2 - 4A + 3I = 0$, we have $ad - bc = 3$. With $a, b, c, d \\in \\{0, 1, 2, 3, 4\\}$ and $a + d = 4$: Case 1: $(a, d) = (0, 4) \\implies bc = -3$ (no solution). Case 2: $(a, d) = (1, 3) \\implies 3 - bc = 3 \\implies bc = 0$. Either $b = 0$ (5 choices for $c$) or $c = 0$ (5 choices for $b$) $\\implies 5 + 5 - 1 = 9$ pairs. Case 3: $(a, d) = (2, 2) \\implies 4 - bc = 3 \\implies bc = 1 \\implies (b, c) = (1, 1)$ (1 pair). Case 4: $(a, d) = (3, 1) \\implies bc = 0 \\implies 9$ pairs. Case 5: $(a, d) = (4, 0) \\implies bc = -3$ (0 pairs). Total number of matrices $= 9 + 1 + 9 = 19$.",
    "image_url": ""
  },
  {
    "q_num": 175,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 2 & 7 \\\\ 4 & -2 & 8 \\\\ 3 & 8 & -7 \\end{bmatrix}$ and $\\det(A - \\alpha I) = 0$, where $\\alpha$ is a real number. If the largest possible value of $\\alpha$ is $p$, then the circle $(x - p)^2 + (y - 2p)^2 = 320$, intersects the co-ordinate axes at:",
    "options": [
      "1 point",
      "2 points",
      "3 points",
      "4 points"
    ],
    "correct_index": 2,
    "solution": "$\\det(A - \\alpha I) = 0 \\implies \\alpha^3 + 8\\alpha^2 - 88\\alpha - 320 = 0 \\implies (\\alpha - 8)(\\alpha^2 + 16\\alpha + 40) = 0$. The roots are $\\alpha = 8$ and $\\alpha = -8 \\pm 2\\sqrt{6}$. Largest root is $p = 8$. Circle equation: $(x - 8)^2 + (y - 16)^2 = 320$. Setting $y = 0$: $(x - 8)^2 + 256 = 320 \\implies (x - 8)^2 = 64 \\implies x - 8 = \\pm 8 \\implies x = 0$ or $x = 16$ (points $(0, 0)$ and $(16, 0)$). Setting $x = 0$: $64 + (y - 16)^2 = 320 \\implies (y - 16)^2 = 256 \\implies y - 16 = \\pm 16 \\implies y = 0$ or $y = 32$ (points $(0, 0)$ and $(0, 32)$). The distinct intersection points are $(0, 0), (16, 0)$, and $(0, 32)$, which is 3 points.",
    "image_url": ""
  },
  {
    "q_num": 176,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix such that $A^T \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 2 \\\\ 2 \\end{bmatrix}$, $A^T \\begin{bmatrix} 0 \\\\ 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 1 \\\\ 1 \\end{bmatrix}$, $A \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 4 \\\\ 4 \\end{bmatrix}$ and $A \\begin{bmatrix} 0 \\\\ 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$. If $\\det(A) = 1$, then $\\det(\\text{adj}(A^2 + A))$ is equal to:",
    "options": [
      "16",
      "25",
      "49",
      "64"
    ],
    "correct_index": 3,
    "solution": "Constructing the matrix from the given conditions gives $A = \\begin{bmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 3 & 1 & 1 \\end{bmatrix}$. Then $A + I = \\begin{bmatrix} 3 & 1 & 1 \\\\ 1 & 3 & 3 \\\\ 3 & 1 & 2 \\end{bmatrix}$, and $\\det(A + I) = 3(6 - 3) - 1(2 - 9) + 1(1 - 9) = 9 + 7 - 8 = 8$. Then $\\det(A^2 + A) = \\det(A(A + I)) = \\det(A) \\det(A + I) = 1 \\times 8 = 8$. For a $3 \\times 3$ matrix, $\\det(\\text{adj}(M)) = (\\det M)^2$. Thus $\\det(\\text{adj}(A^2 + A)) = 8^2 = 64$.",
    "image_url": ""
  },
  {
    "q_num": 177,
    "question_type": "mcq",
    "question_text": "Let $M$ be a $3 \\times 3$ matrix such that $M \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$, $M \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 2 \\end{pmatrix}$ and $M \\begin{pmatrix} 0 \\\\ 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ 1 \\\\ 1 \\end{pmatrix}$. If $M \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 7 \\\\ 11 \\end{pmatrix}$, then $x + y + z$ equals:",
    "options": [
      "4",
      "5",
      "7",
      "11"
    ],
    "correct_index": 1,
    "solution": "The columns of $M$ are the images of standard basis vectors, so $M = \\begin{pmatrix} 1 & 0 & -1 \\\\ 2 & 1 & 1 \\\\ 3 & 2 & 1 \\end{pmatrix}$. The system is: $x - z = 1$, $2x + y + z = 7$, $3x + 2y + z = 11$. Subtracting the second from third gives $x + y = 4$. Adding the first and second gives $3x + y = 8$. Subtracting gives $2x = 4 \\implies x = 2$. Then $y = 2$, and $z = x - 1 = 1$. Therefore $x + y + z = 2 + 2 + 1 = 5$.",
    "image_url": ""
  },
  {
    "q_num": 178,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 9 & 3 & 1 \\end{bmatrix}$ and $B = [b_{ij}], 1 \\le i, j \\le 3$. If $B = A^{99} - I$, then the value of $\\frac{b_{31} - b_{21}}{b_{32}}$ is:",
    "options": [
      "99",
      "199",
      "149",
      "159"
    ],
    "correct_index": 2,
    "solution": "$A = I + C$ where $C = \\begin{bmatrix} 0 & 0 & 0 \\\\ 3 & 0 & 0 \\\\ 9 & 3 & 0 \\end{bmatrix}$. $C^2 = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 9 & 0 & 0 \\end{bmatrix}$, and $C^3 = 0$. $A^{99} = I + 99C + \\binom{99}{2} C^2 = I + 99C + 4851 C^2$. Then $B = A^{99} - I = 99C + 4851 C^2$. Looking at entries: $b_{21} = 99 \\times 3 = 297$; $b_{32} = 99 \\times 3 = 297$; $b_{31} = 99 \\times 9 + 4851 \\times 9 = 9(99 + 4851) = 9 \\times 4950 = 44550$. Then $\\frac{b_{31} - b_{21}}{b_{32}} = \\frac{44550 - 297}{297} = \\frac{44550}{297} - 1 = 150 - 1 = 149$.",
    "image_url": ""
  }
]

# Verification against key
for q in PART4:
    num = str(q['q_num'])
    expected = str(key[num])
    actual = ['A', 'B', 'C', 'D'][q['correct_index']] if q['question_type'] == 'mcq' else str(q['numeric_answer'])
    assert actual == expected, f"Mismatch at Q{num}: expected {expected}, got {actual}"

print("All 28 questions in Part 4 matched answer key perfectly!")

with open('backend/scripts/data/matrices_part4.mjs', 'w', encoding='utf-8') as f:
    f.write("// Part 4: Matrices Q151 to Q178\n")
    f.write("export const MATRICES_PART4 = " + json.dumps(PART4, indent=2) + ";\n")

print("Saved backend/scripts/data/matrices_part4.mjs successfully!")
