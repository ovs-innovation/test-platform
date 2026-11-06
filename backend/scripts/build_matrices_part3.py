import json

with open('backend/scripts/official_answer_key_matrices.json', 'r', encoding='utf-8') as f:
    key = json.load(f)

PART3 = [
  {
    "q_num": 101,
    "question_type": "numerical",
    "question_text": "Let $S$ be the set containing all $3 \\times 3$ matrices with entries from $\\{-1, 0, 1\\}$. The total number of matrices $A \\in S$ such that the sum of all the diagonal elements of $A^T A$ is 6 is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 5376,
    "solution": "The sum of the diagonal elements of $A^T A$ is $\\sum_{i,j} a_{ij}^2 = 6$. For $a_{ij} \\in \\{-1, 0, 1\\}$, exactly 6 entries must be $\\pm 1$ and the other 3 entries must be 0. Number of ways to choose 6 positions from 9 is $\\binom{9}{6} = 84$. Each of the 6 non-zero entries can be $1$ or $-1$ ($2^6 = 64$ ways). Total number of matrices $= 84 \\times 64 = 5376$.",
    "image_url": ""
  },
  {
    "q_num": 102,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 1 & 2 \\\\ -2 & -5 \\end{pmatrix}$. Let $\\alpha, \\beta \\in \\mathbb{R}$ be such that $\\alpha A^2 + \\beta A = 2I$. Then $\\alpha + \\beta$ is equal to:",
    "options": [
      "-10",
      "-6",
      "6",
      "10"
    ],
    "correct_index": 3,
    "solution": "Characteristic equation of $A$: $|A - \\lambda I| = (1 - \\lambda)(-5 - \\lambda) + 4 = \\lambda^2 + 4\\lambda - 1 = 0 \\implies A^2 + 4A = I$. Multiplying by 2: $2A^2 + 8A = 2I$. Comparing with $\\alpha A^2 + \\beta A = 2I$, we get $\\alpha = 2$ and $\\beta = 8$. Thus $\\alpha + \\beta = 2 + 8 = 10$.",
    "image_url": ""
  },
  {
    "q_num": 103,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 4 & -2 \\\\ \\alpha & \\beta \\end{pmatrix}$. If $A^2 + \\gamma A + 18I = O$, then $\\det(A)$ is equal to _______:",
    "options": [
      "-18",
      "18",
      "-50",
      "50"
    ],
    "correct_index": 1,
    "solution": "By Cayley-Hamilton theorem, $A^2 - \\text{tr}(A)A + \\det(A)I = O$. Comparing with $A^2 + \\gamma A + 18I = O$, the constant coefficient is $\\det(A) = 18$.",
    "image_url": ""
  },
  {
    "q_num": 104,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 1 & -1 \\\\ 2 & \\alpha \\end{bmatrix}$ and $B = \\begin{bmatrix} \\beta & 1 \\\\ 1 & 0 \\end{bmatrix}, \\alpha, \\beta \\in \\mathbb{R}$. Let $\\alpha_1$ be the value of $\\alpha$ which satisfies $(A + B)^2 = A^2 + \\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix}$ and $\\alpha_2$ be the value of $\\alpha$ which satisfies $(A + B)^2 = B^2$. Then $|\\alpha_1 - \\alpha_2|$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2,
    "solution": "For condition 1: $(A+B)^2 = A^2 + \\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix} \\implies \\alpha_1 = 1$. For condition 2: $(A+B)^2 = B^2 \\implies \\alpha_2 = -1$. Hence $|\\alpha_1 - \\alpha_2| = |1 - (-1)| = 2$.",
    "image_url": ""
  },
  {
    "q_num": 105,
    "question_type": "mcq",
    "question_text": "Let the matrix $A = \\begin{bmatrix} 0 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$ and the matrix $B_0 = A^{49} + 2A^{98}$. If $B_n = \\text{Adj}(B_{n-1})$ for all $n \\ge 1$, then $\\det(B_4)$ is equal to:",
    "options": [
      "$3^{28}$",
      "$3^{30}$",
      "$3^{32}$",
      "$3^{36}$"
    ],
    "correct_index": 2,
    "solution": "$A^2 = I$, so $A^{98} = I$ and $A^{49} = A$. Then $B_0 = A + 2I = \\begin{bmatrix} 2 & 1 & 0 \\\\ 1 & 2 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}$. $\\det(B_0) = 3(4 - 1) = 9 = 3^2$. For an order 3 matrix, $|\\text{adj}(M)| = |M|^2$. Therefore $|B_4| = |B_0|^{2^4} = |B_0|^{16} = (3^2)^{16} = 3^{32}$.",
    "image_url": ""
  },
  {
    "q_num": 106,
    "question_type": "mcq",
    "question_text": "Let $A$ and $B$ be any two $3 \\times 3$ symmetric and skew symmetric matrices respectively. Then which of the following is NOT true?",
    "options": [
      "$A^4 - B^4$ is a symmetric matrix",
      "$AB - BA$ is a symmetric matrix",
      "$B^5 - A^5$ is a skew-symmetric matrix",
      "$AB + BA$ is a skew-symmetric matrix"
    ],
    "correct_index": 2,
    "solution": "$A^T = A, B^T = -B$. $(B^5 - A^5)^T = (B^T)^5 - (A^T)^5 = (-B)^5 - A^5 = -B^5 - A^5 \\neq -(B^5 - A^5)$. Thus $B^5 - A^5$ is neither symmetric nor skew-symmetric. Hence option C is NOT true.",
    "image_url": ""
  },
  {
    "q_num": 107,
    "question_type": "numerical",
    "question_text": "The number of matrices of order $3 \\times 3$, whose entries are either 0 or 1 and the sum of all the entries is a prime number, is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 282,
    "solution": "The sum of the 9 entries (each 0 or 1) can be prime: $p \\in \\{2, 3, 5, 7\\}$. For sum = 2: $\\binom{9}{2} = 36$. For sum = 3: $\\binom{9}{3} = 84$. For sum = 5: $\\binom{9}{5} = 126$. For sum = 7: $\\binom{9}{7} = 36$. Total required matrices $= 36 + 84 + 126 + 36 = 282$.",
    "image_url": ""
  },
  {
    "q_num": 108,
    "question_type": "mcq",
    "question_text": "Let $A$ and $B$ be two $3 \\times 3$ non-zero real matrices such that $AB$ is a zero matrix. Then:",
    "options": [
      "The system of linear equations $AX = 0$ has a unique solution",
      "The system of linear equations $AX = 0$ has infinitely many solutions",
      "$B$ is an invertible matrix",
      "$\\text{adj}(A)$ is an invertible matrix"
    ],
    "correct_index": 1,
    "solution": "Since $AB = O$ and $B \\neq O$, there is at least one non-zero column $X$ of $B$ such that $AX = 0$. Thus $AX = 0$ has non-trivial solutions, which means $\\det(A) = 0$. Hence the homogeneous system $AX = 0$ has infinitely many solutions.",
    "image_url": ""
  },
  {
    "q_num": 109,
    "question_type": "mcq",
    "question_text": "Which of the following matrices can NOT be obtained from the matrix $\\begin{bmatrix} -1 & 2 \\\\ 1 & -1 \\end{bmatrix}$ by a single elementary row operation?",
    "options": [
      "$\\begin{bmatrix} 0 & 1 \\\\ 1 & -1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$",
      "$\\begin{bmatrix} -1 & 2 \\\\ -2 & 7 \\end{bmatrix}$",
      "$\\begin{bmatrix} -1 & 2 \\\\ -1 & 3 \\end{bmatrix}$"
    ],
    "correct_index": 2,
    "solution": "(A) $R_1 \\to R_1 + R_2$ gives $\\begin{bmatrix} 0 & 1 \\\\ 1 & -1 \\end{bmatrix}$. (B) $R_1 \\leftrightarrow R_2$ gives $\\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix}$. (D) $R_2 \\to R_2 + 2R_1$ gives $\\begin{bmatrix} -1 & 2 \\\\ -1 & 3 \\end{bmatrix}$. (C) cannot be obtained by a single elementary row operation.",
    "image_url": ""
  },
  {
    "q_num": 110,
    "question_type": "numerical",
    "question_text": "Let $X = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$ and $A = \\begin{bmatrix} -1 & 2 & 3 \\\\ 0 & 1 & 6 \\\\ 0 & 0 & -1 \\end{bmatrix}$. For $k \\in \\mathbb{N}$, if $X^T A^k X = 33$, then $k$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "solution": "$A^2 = \\begin{bmatrix} 1 & 0 & 6 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$. In general, for even $k$, $A^k = \\begin{bmatrix} 1 & 0 & 3k \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$. Then $X^T A^k X = [1 \\quad 1 \\quad 1] \\begin{bmatrix} 1 & 0 & 3k \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = 1 + 3k + 1 + 1 = 3k + 3$. Given $3k + 3 = 33 \\implies 3k = 30 \\implies k = 10$. For odd $k$, it yields no integer solution. Thus $k = 10$.",
    "image_url": ""
  },
  {
    "q_num": 111,
    "question_type": "numerical",
    "question_text": "Let $X = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$ and $A = \\begin{bmatrix} -1 & 2 & 3 \\\\ 0 & 1 & 6 \\\\ 0 & 0 & -1 \\end{bmatrix}$. For $k \\in \\mathbb{N}$, if $X^T A^k X = 33$, then $k$ is equal to _______ (Shift 2).",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "solution": "As established, for even $k$, $X^T A^k X = 3k + 3 = 33 \\implies k = 10$.",
    "image_url": ""
  },
  {
    "q_num": 112,
    "question_type": "mcq",
    "question_text": "If $A$ and $B$ are two non-zero $n \\times n$ matrices such that $A^2 + B = A^2 B$, then:",
    "options": [
      "$AB = I$",
      "$A^2 B = I$",
      "$A^2 = I$ or $B = I$",
      "$A^2 B = B A^2$"
    ],
    "correct_index": 3,
    "solution": "$A^2 B - A^2 - B + I = I \\implies (A^2 - I)(B - I) = I$. Since the inverse of $(A^2 - I)$ is $(B - I)$, they commute: $(B - I)(A^2 - I) = I \\implies BA^2 - B - A^2 + I = I \\implies BA^2 = A^2 + B$. Since $A^2 B = A^2 + B$, we have $A^2 B = B A^2$.",
    "image_url": ""
  },
  {
    "q_num": 113,
    "question_type": "mcq",
    "question_text": "The number of square matrices of order 5 with entries from the set $\\{0, 1\\}$, such that the sum of all the elements in each row is 1 and the sum of all the elements in each column is also 1, is:",
    "options": [
      "225",
      "120",
      "150",
      "125"
    ],
    "correct_index": 1,
    "solution": "Such matrices are permutation matrices of order 5, where each row and each column contains exactly one 1. The position of 1 in row 1 can be chosen in 5 ways, in row 2 in 4 ways, in row 3 in 3 ways, in row 4 in 2 ways, and in row 5 in 1 way. Total number of matrices $= 5! = 120$.",
    "image_url": ""
  },
  {
    "q_num": 114,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} \\frac{1}{\\sqrt{10}} & \\frac{3}{\\sqrt{10}} \\\\ -\\frac{3}{\\sqrt{10}} & \\frac{1}{\\sqrt{10}} \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & -i \\\\ 0 & 1 \\end{bmatrix}$, where $i = \\sqrt{-1}$. If $M = A^T B A$, then the inverse of the matrix $A M^{2023} A^T$ is:",
    "options": [
      "$\\begin{bmatrix} 1 & -2023i \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ -2023i & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 2023i & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2023i \\\\ 0 & 1 \\end{bmatrix}$"
    ],
    "correct_index": 3,
    "solution": "$AA^T = I$, so $A^T = A^{-1}$. $M = A^T B A \\implies M^{2023} = A^T B^{2023} A$. Then $A M^{2023} A^T = B^{2023} = \\begin{bmatrix} 1 & -2023i \\\\ 0 & 1 \\end{bmatrix}$. Its inverse is $(B^{2023})^{-1} = \\begin{bmatrix} 1 & 2023i \\\\ 0 & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 115,
    "question_type": "mcq",
    "question_text": "Let $A, B, C$ be $3 \\times 3$ matrices such that $A$ is symmetric and $B$ and $C$ are skew-symmetric. Consider the statements:\\n(S1) $A^{13} B^{26} - B^{26} A^{13}$ is symmetric\\n(S2) $A^{26} C^{13} - C^{13} A^{26}$ is symmetric\\nThen,",
    "options": [
      "Only S2 is true",
      "Only S1 is true",
      "Both S1 and S2 are false",
      "Both S1 and S2 are true"
    ],
    "correct_index": 0,
    "solution": "$A^T = A, B^T = -B, C^T = -C$. For (S1): Let $M = A^{13} B^{26} - B^{26} A^{13}$. $M^T = (B^T)^{26} (A^T)^{13} - (A^T)^{13} (B^T)^{26} = B^{26} A^{13} - A^{13} B^{26} = -M$ (skew-symmetric). So S1 is false. For (S2): Let $N = A^{26} C^{13} - C^{13} A^{26}$. $N^T = (C^T)^{13} (A^T)^{26} - (A^T)^{26} (C^T)^{13} = (-C^{13}) A^{26} - A^{26} (-C^{13}) = -C^{13} A^{26} + A^{26} C^{13} = N$ (symmetric). So S2 is true.",
    "image_url": ""
  },
  {
    "q_num": 116,
    "question_type": "mcq",
    "question_text": "Let $\\alpha$ and $\\beta$ be real numbers. Consider a $3 \\times 3$ matrix $A$ such that $A^2 = 3A + \\alpha I$. If $A^4 = 21A + \\beta I$, then:",
    "options": [
      "$\\alpha = 1$",
      "$\\alpha = 4$",
      "$\\beta = 8$",
      "$\\beta = -8$"
    ],
    "correct_index": 3,
    "solution": "$A^2 = 3A + \\alpha I \\implies A^4 = (3A + \\alpha I)^2 = 9A^2 + 6\\alpha A + \\alpha^2 I = 9(3A + \\alpha I) + 6\\alpha A + \\alpha^2 I = (27 + 6\\alpha)A + (9\\alpha + \\alpha^2)I$. Comparing with $21A + \\beta I$: $27 + 6\\alpha = 21 \\implies 6\\alpha = -6 \\implies \\alpha = -1$. Then $\\beta = 9\\alpha + \\alpha^2 = 9(-1) + (-1)^2 = -9 + 1 = -8$.",
    "image_url": ""
  },
  {
    "q_num": 117,
    "question_type": "numerical",
    "question_text": "Let $A$ be a symmetric matrix such that $|A| = 2$ and $\\begin{bmatrix} 2 & 1 \\\\ 3 & 3/2 \\end{bmatrix} A = \\begin{bmatrix} 1 & 2 \\\\ \\alpha & \\beta \\end{bmatrix}$. If the sum of the diagonal elements of $A$ is $s$, then $\\frac{\\beta s}{\\alpha^2}$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 5,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ b & c \\end{bmatrix}$. We have $2a + b = 1, 2b + c = 2 \\implies b = 1 - 2a, c = 2 - 2(1 - 2a) = 4a$. Then $|A| = ac - b^2 = 4a^2 - (1 - 2a)^2 = 4a - 1 = 2 \\implies a = 3/4$. Then $b = -1/2, c = 3$. Sum of diagonal elements $s = a + c = 3/4 + 3 = 15/4$. Next, row 2 gives $\\alpha = 3a + \\frac{3}{2}b = 9/4 - 3/4 = 3/2$, and $\\beta = 3b + \\frac{3}{2}c = -3/2 + 9/2 = 3$. Then $\\frac{\\beta s}{\\alpha^2} = \\frac{3 \\times (15/4)}{(3/2)^2} = \\frac{45/4}{9/4} = 5$.",
    "image_url": ""
  },
  {
    "q_num": 118,
    "question_type": "mcq",
    "question_text": "If $P$ is a $3 \\times 3$ real matrix such that $P^T = a P + (a - 1)I$, where $a > 1$, then:",
    "options": [
      "$P$ is a singular matrix",
      "$|\\text{Adj} P| > 1$",
      "$|\\text{Adj} P| = 1/2$",
      "$|\\text{Adj} P| = 1$"
    ],
    "correct_index": 3,
    "solution": "Taking transpose: $P = a P^T + (a - 1)I$. Subtracting: $P^T - P = a(P - P^T) = -a(P^T - P) \\implies (a+1)(P^T - P) = 0$. Since $a > 1$, $a + 1 \\neq 0 \\implies P^T = P$. Then $P = a P + (a - 1)I \\implies (a - 1)P = -(a - 1)I \\implies P = -I$. Then $|P| = |-I| = (-1)^3 = -1$. $|\\text{adj}(P)| = |P|^{3-1} = (-1)^2 = 1$.",
    "image_url": ""
  },
  {
    "q_num": 119,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 4 & -1 \\\\ 0 & 12 & -3 \\end{bmatrix}$. Then the sum of the diagonal elements of the matrix $(A + I)^{11}$ is equal to:",
    "options": [
      "6144",
      "4094",
      "4097",
      "2050"
    ],
    "correct_index": 2,
    "solution": "Computing $A^2$: row 1: [1, 0, 0]; row 2: [0, 16 - 12, -4 + 3] = [0, 4, -1]; row 3: [0, 48 - 36, -12 + 9] = [0, 12, -3]. Thus $A^2 = A$, so $A^k = A$ for all $k \\ge 1$. $(A + I)^{11} = I + \\sum_{k=1}^{11} \\binom{11}{k} A^k = I + (2^{11} - 1)A = I + 2047A$. Sum of diagonal elements $= \\text{tr}(I) + 2047\\text{tr}(A) = 3 + 2047(1 + 4 - 3) = 3 + 2047(2) = 3 + 4094 = 4097$.",
    "image_url": ""
  },
  {
    "q_num": 120,
    "question_type": "numerical",
    "question_text": "Let $A = [a_{ij}], a_{ij} \\in \\mathbb{Z} \\cap [0, 4], 1 \\le i, j \\le 2$. The number of matrices $A$ such that the sum of all entries is a prime number $p \\in (2, 13)$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 204,
    "solution": "Entries $a_{ij} \\in \\{0, 1, 2, 3, 4\\}$. We want $a + b + c + d = p$ where $p \\in \\{3, 5, 7, 11\\}$. Using generating functions $(1 + x + x^2 + x^3 + x^4)^4 = \\left(\\frac{1 - x^5}{1 - x}\\right)^4 = (1 - 4x^5 + 6x^{10} - \\dots) \\sum_{r=0}^\\infty \\binom{r+3}{3} x^r$. Coefficient of $x^3$: $\\binom{6}{3} = 20$. Coefficient of $x^5$: $\\binom{8}{3} - 4\\binom{3}{3} = 56 - 4 = 52$. Coefficient of $x^7$: $\\binom{10}{3} - 4\\binom{5}{3} = 120 - 40 = 80$. Coefficient of $x^{11}$: $\\binom{14}{3} - 4\\binom{9}{3} + 6\\binom{4}{3} = 364 - 336 + 24 = 52$. Total sum $= 20 + 52 + 80 + 52 = 204$.",
    "image_url": ""
  },
  {
    "q_num": 121,
    "question_type": "mcq",
    "question_text": "If $A = \\frac{1}{2} \\begin{bmatrix} 1 & \\sqrt{3} \\\\ -\\sqrt{3} & 1 \\end{bmatrix}$, then,",
    "options": [
      "$A^{30} - A^{25} = 2I$",
      "$A^{30} + A^{25} + A = I$",
      "$A^{30} + A^{25} - A = I$",
      "$A^{30} = A^{25}$"
    ],
    "correct_index": 2,
    "solution": "$A = \\begin{bmatrix} \\cos(\\pi/3) & \\sin(\\pi/3) \\\\ -\\sin(\\pi/3) & \\cos(\\pi/3) \\end{bmatrix}$, so $A^3 = -I$ and $A^6 = I$. Then $A^{30} = (A^6)^5 = I$, and $A^{25} = (A^6)^4 A = A$. Thus $A^{30} + A^{25} - A = I + A - A = I$.",
    "image_url": ""
  },
  {
    "q_num": 122,
    "question_type": "mcq",
    "question_text": "Let $A = [a_{ij}]_{2 \\times 2}$, where $a_{ij} \\neq 0$ for all $i, j$ and $A^2 = I$. Let $a$ be the sum of all diagonal elements of $A$ and $b = |A|$. Then $3a^2 + 4b^2$ is equal to:",
    "options": [
      "4",
      "14",
      "7",
      "3"
    ],
    "correct_index": 0,
    "solution": "$A = \\begin{bmatrix} p & q \\\\ r & s \\end{bmatrix}$ with $p, q, r, s \\neq 0$. $A^2 = I \\implies p+s = 0$ (since $q, r \\neq 0$). Thus $a = \\text{tr}(A) = p + s = 0$. Also $b = |A| = ps - qr = -p^2 - qr = -1$. Then $3a^2 + 4b^2 = 3(0)^2 + 4(-1)^2 = 4$.",
    "image_url": ""
  },
  {
    "q_num": 123,
    "question_type": "mcq",
    "question_text": "Let $P$ be a square matrix such that $P^2 = I - P$. For $\\alpha, \\beta, \\gamma, \\delta \\in \\mathbb{N}$, if $P^\\alpha + P^\\beta = \\gamma I - 29P$ and $P^\\alpha - P^\\beta = \\delta I - 13P$, then $\\alpha + \\beta + \\gamma - \\delta$ is equal to:",
    "options": [
      "18",
      "40",
      "22",
      "24"
    ],
    "correct_index": 3,
    "solution": "$P^2 = I - P, P^3 = P - P^2 = 2P - I, P^4 = 2I - 3P, P^6 = 5I - 8P, P^8 = 13I - 21P$. Testing $\\alpha = 8, \\beta = 6$: $P^8 + P^6 = (13I - 21P) + (5I - 8P) = 18I - 29P \\implies \\gamma = 18$. $P^8 - P^6 = (13I - 21P) - (5I - 8P) = 8I - 13P \\implies \\delta = 8$. Then $\\alpha + \\beta + \\gamma - \\delta = 8 + 6 + 18 - 8 = 24$.",
    "image_url": ""
  },
  {
    "q_num": 124,
    "question_type": "mcq",
    "question_text": "Let $P = \\begin{bmatrix} \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\\\ -\\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\end{bmatrix}$, $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $Q = PAP^T$. If $P^T Q^{2007} P = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, then $2a + b - 3c - 4d$ is equal to:",
    "options": [
      "2004",
      "2005",
      "2007",
      "2006"
    ],
    "correct_index": 1,
    "solution": "$P^T Q^{2007} P = A^{2007} = \\begin{bmatrix} 1 & 2007 \\\\ 0 & 1 \\end{bmatrix}$. Thus $a = 1, b = 2007, c = 0, d = 1$. Then $2a + b - 3c - 4d = 2(1) + 2007 - 3(0) - 4(1) = 2 + 2007 - 4 = 2005$.",
    "image_url": ""
  },
  {
    "q_num": 125,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 1 & 5 \\\\ \\lambda & 10 \\end{bmatrix}$, $A^{-1} = \\alpha A + \\beta I$ and $\\alpha + \\beta = -2$, then $4\\alpha^2 + \\beta^2 + \\lambda^2$ is equal to:",
    "options": [
      "12",
      "19",
      "14",
      "10"
    ],
    "correct_index": 2,
    "solution": "Characteristic equation of $A$: $\\lambda^2 - 11\\lambda + (10 - 5\\lambda_{entry}) = 0 \\implies A^2 - 11A + (10 - 5\\lambda_{entry})I = 0 \\implies A^{-1} = \\frac{-1}{10 - 5\\lambda_{entry}} A + \\frac{11}{10 - 5\\lambda_{entry}} I$. Then $\\alpha = \\frac{-1}{10 - 5\\lambda_{entry}}, \\beta = \\frac{11}{10 - 5\\lambda_{entry}}$. $\\alpha + \\beta = \\frac{10}{10 - 5\\lambda_{entry}} = -2 \\implies 10 - 5\\lambda_{entry} = -5 \\implies \\lambda_{entry} = 3$. Then $\\alpha = 1/5, \\beta = -11/5$. $4\\alpha^2 + \\beta^2 + \\lambda_{entry}^2 = 4(1/25) + 121/25 + 9 = 125/25 + 9 = 5 + 9 = 14$.",
    "image_url": ""
  },
  {
    "q_num": 126,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $2 \\times 2$ matrix with real entries such that $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ where $\\alpha \\in \\mathbb{R} - \\{-1, 1\\}$. If $\\det(A^2 - A) = 4$, the sum of all possible values of $\\alpha$ is equal to:",
    "options": [
      "0",
      "3/2",
      "2",
      "5/2"
    ],
    "correct_index": 3,
    "solution": "From the equation $a = \\frac{1}{1-\\alpha}, d = \\frac{1}{1-\\alpha}$, let $t = \\frac{1}{1-\\alpha}$. Then $\\det(A^2 - A) = t^2(t-1)^2 = 4 \\implies t(t-1) = \\pm 2$. For $t^2 - t - 2 = 0 \\implies t = 2$ or $t = -1$. For $t = 2 \\implies \\frac{1}{1-\\alpha} = 2 \\implies \\alpha = 1/2$. For $t = -1 \\implies \\frac{1}{1-\\alpha} = -1 \\implies \\alpha = 2$. Sum of values $= 1/2 + 2 = 5/2$.",
    "image_url": ""
  },
  {
    "q_num": 127,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 0 & 1 & 2 \\\\ a & 0 & 3 \\\\ 1 & c & 0 \\end{bmatrix}$, where $a, c \\in \\mathbb{R}$. If $A^3 = A$ and the positive value of $a$ belongs to the interval $(n - 1, n]$, where $n \\in \\mathbb{N}$, then $n$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2,
    "solution": "Computing $A^3$ and setting $A^3 = A$ gives relations $2ca + 3 = 0 \\implies c = \\frac{-3}{2a}$, and $a + 2 + 3c = 1 \\implies a + 1 + 3\\left(\\frac{-3}{2a}\\right) = 0 \\implies 2a^2 + 2a - 9 = 0$. The positive root is $a = \\frac{-2 + \\sqrt{4 + 72}}{4} = \\frac{-2 + \\sqrt{76}}{4} \\approx \\frac{-2 + 8.717}{4} \\approx 1.68 \\in (1, 2]$. Thus $n = 2$.",
    "image_url": ""
  },
  {
    "q_num": 128,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 1/51 \\\\ 0 & 1 \\end{bmatrix}$. If $B = \\begin{bmatrix} 1 & 2 \\\\ -1 & -1 \\end{bmatrix} A \\begin{bmatrix} -1 & -2 \\\\ 1 & 1 \\end{bmatrix}$, then the sum of all the elements of the matrix $\\sum_{n=1}^{50} B^n$ is equal to:",
    "options": [
      "75",
      "125",
      "50",
      "100"
    ],
    "correct_index": 3,
    "solution": "Let $P = \\begin{bmatrix} 1 & 2 \\\\ -1 & -1 \\end{bmatrix}$, then $P^{-1} = \\begin{bmatrix} -1 & -2 \\\\ 1 & 1 \\end{bmatrix}$. Thus $B = P A P^{-1} \\implies B^n = P A^n P^{-1}$. $A^n = \\begin{bmatrix} 1 & n/51 \\\\ 0 & 1 \\end{bmatrix}$. Multiplying: $B^n = \\begin{bmatrix} 1 + n/51 & n/51 \\\\ -n/51 & 1 - n/51 \\end{bmatrix}$. Summing from $n = 1$ to $50$: $\\sum_{n=1}^{50} n = \\frac{50 \\times 51}{2} = 1275$. $\\sum_{n=1}^{50} n/51 = 25$. Then $\\sum B^n = \\begin{bmatrix} 50 + 25 & 25 \\\\ -25 & 50 - 25 \\end{bmatrix} = \\begin{bmatrix} 75 & 25 \\\\ -25 & 25 \\end{bmatrix}$. Sum of all elements $= 75 + 25 - 25 + 25 = 100$.",
    "image_url": ""
  },
  {
    "q_num": 129,
    "question_type": "mcq",
    "question_text": "The number of symmetric matrices of order 3, with all the entries from the set $\\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}$ is:",
    "options": [
      "$6^{10}$",
      "$10^6$",
      "$9^{10}$",
      "$10^9$"
    ],
    "correct_index": 1,
    "solution": "A $3 \\times 3$ symmetric matrix has 6 independent entries: 3 on the diagonal ($a_{11}, a_{22}, a_{33}$) and 3 above the diagonal ($a_{12}, a_{13}, a_{23}$). Since there are 10 choices for each of these 6 positions, the total number of symmetric matrices is $10^6$.",
    "image_url": ""
  },
  {
    "q_num": 130,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 2 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix}, B = [B_1 \\quad B_2 \\quad B_3]$, where $B_1, B_2, B_3$ are column matrices, and $AB_1 = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}$, $AB_2 = \\begin{bmatrix} 2 \\\\ 3 \\\\ 0 \\end{bmatrix}$, $AB_3 = \\begin{bmatrix} 3 \\\\ 2 \\\\ 1 \\end{bmatrix}$. If $\\alpha = |B|$ and $\\beta$ is the sum of all the diagonal elements of $B$, then $\\alpha^3 + \\beta^3$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 28,
    "solution": "$AB = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 1 \\end{bmatrix}$. $\\det(AB) = 1 \\times 3 \\times 1 = 3$. $\\det(A) = 2(1) + 1(-1) = 1$. Thus $\\alpha = |B| = \\frac{|AB|}{|A|} = 3/1 = 3$. Solving $AB = C$, we find the columns of $B$: $B_1 = [1, -1, -1]^T$, $B_2 = [2, 1, -2]^T$, $B_3 = [2, 0, -1]^T$. Diagonal elements of $B$ are $1, 1, -1$, so their sum $\\beta = 1 + 1 - 1 = 1$. Then $\\alpha^3 + \\beta^3 = 3^3 + 1^3 = 27 + 1 = 28$.",
    "image_url": ""
  },
  {
    "q_num": 131,
    "question_type": "mcq",
    "question_text": "Consider the matrix $f(x) = \\begin{bmatrix} \\cos x & -\\sin x & 0 \\\\ \\sin x & \\cos x & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}$. Given below are two statements:\\nStatement I: $f(-x)$ is the inverse of the matrix $f(x)$.\\nStatement II: $f(x) f(y) = f(x + y)$.\\nIn the light of the above statements, choose the correct answer from the options given below:",
    "options": [
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are true"
    ],
    "correct_index": 3,
    "solution": "$f(x) f(y) = \\begin{bmatrix} \\cos x \\cos y - \\sin x \\sin y & -(\\cos x \\sin y + \\sin x \\cos y) & 0 \\\\ \\sin x \\cos y + \\cos x \\sin y & \\cos x \\cos y - \\sin x \\sin y & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} = f(x+y)$, so Statement II is true. Also $f(x) f(-x) = f(x - x) = f(0) = I$, which means $f(-x) = (f(x))^{-1}$, so Statement I is true. Hence both statements are true.",
    "image_url": ""
  },
  {
    "q_num": 132,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $2 \\times 2$ real matrix and $I$ be the identity matrix of order 2. If the roots of the equation $|A - xI| = 0$ be -1 and 3, then the sum of the diagonal elements of the matrix $A^2$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 10,
    "solution": "The eigenvalues of $A$ are $\\lambda_1 = -1$ and $\\lambda_2 = 3$. The eigenvalues of $A^2$ are $\\lambda_1^2 = 1$ and $\\lambda_2^2 = 9$. The sum of the diagonal elements of $A^2$ is its trace, which equals the sum of its eigenvalues: $\\text{tr}(A^2) = 1 + 9 = 10$.",
    "image_url": ""
  },
  {
    "q_num": 133,
    "question_type": "mcq",
    "question_text": "Let $A$ be a square matrix such that $AA^T = I$. Then $\\frac{1}{2} A \\left[ (A + A^T)^2 + (A - A^T)^2 \\right]$ is equal to:",
    "options": [
      "$A^2 + I$",
      "$A^3 + I$",
      "$A^2 + A^T$",
      "$A^3 + A^T$"
    ],
    "correct_index": 3,
    "solution": "$(A + A^T)^2 + (A - A^T)^2 = (A^2 + AA^T + A^T A + (A^T)^2) + (A^2 - AA^T - A^T A + (A^T)^2) = 2A^2 + 2(A^T)^2$. Then $\\frac{1}{2} A [2A^2 + 2(A^T)^2] = A(A^2 + (A^T)^2) = A^3 + A(A^T)^2 = A^3 + (AA^T)A^T = A^3 + I A^T = A^3 + A^T$.",
    "image_url": ""
  },
  {
    "q_num": 134,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & \\alpha & \\beta \\\\ 0 & \\beta & \\alpha \\end{bmatrix}$ and $|2A|^3 = 2^{21}$ where $\\alpha, \\beta \\in \\mathbb{Z}$. Then a value of $\\alpha$ is:",
    "options": [
      "3",
      "5",
      "17",
      "9"
    ],
    "correct_index": 1,
    "solution": "$|2A| = 2^3 |A| = 8|A|$. $|2A|^3 = 8^3 |A|^3 = 2^9 |A|^3 = 2^{21} \\implies |A|^3 = 2^{12} \\implies |A| = 2^4 = 16$. $\\det(A) = 1(\\alpha^2 - \\beta^2) = 16 \\implies \\alpha^2 - \\beta^2 = 16$. For $\\alpha, \\beta \\in \\mathbb{Z}$, if $\\alpha = 5$, then $25 - \\beta^2 = 16 \\implies \\beta^2 = 9 \\implies \\beta = \\pm 3 \\in \\mathbb{Z}$. Thus a value of $\\alpha$ is 5.",
    "image_url": ""
  },
  {
    "q_num": 135,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 2 & 1 & 2 \\\\ 6 & 2 & 11 \\\\ 3 & 3 & 2 \\end{bmatrix}$ and $P = \\begin{bmatrix} 1 & 2 & 0 \\\\ 5 & 0 & 2 \\\\ 7 & 1 & 5 \\end{bmatrix}$. The sum of the prime factors of $|P^{-1} AP - 2I|$ is equal to:",
    "options": [
      "26",
      "27",
      "66",
      "23"
    ],
    "correct_index": 0,
    "solution": "$|P^{-1} AP - 2I| = |P^{-1}(A - 2I)P| = |P^{-1}| |A - 2I| |P| = |A - 2I|$. $A - 2I = \\begin{bmatrix} 0 & 1 & 2 \\\\ 6 & 0 & 11 \\\\ 3 & 3 & 0 \\end{bmatrix}$. Evaluating determinant: $0 - 1(0 - 33) + 2(18 - 0) = 33 + 36 = 69$. Prime factors of 69 are 3 and 23 ($69 = 3 \\times 23$). Their sum $= 3 + 23 = 26$.",
    "image_url": ""
  },
  {
    "q_num": 136,
    "question_type": "mcq",
    "question_text": "Let $R = \\begin{bmatrix} x & 0 & 0 \\\\ 0 & y & 0 \\\\ 0 & 0 & z \\end{bmatrix}$ be a non-zero $3 \\times 3$ matrix, where $x\\sin\\theta = y\\sin\\left(\\theta + \\frac{2\\pi}{3}\\right) = z\\sin\\left(\\theta + \\frac{4\\pi}{3}\\right) \\neq 0, \\theta \\in (0, 2\\pi)$. For a square matrix $M$, let $\\text{Trace}(M)$ denote the sum of all the diagonal entries of $M$. Then, among the statements: (I) $\\text{Trace}(R) = 0$; (II) If $\\text{Trace}(\\text{adj}(\\text{adj}(R))) = 0$, then $R$ has exactly one non-zero entry.",
    "options": [
      "Both (I) and (II) are true",
      "Only (II) is true",
      "Neither (I) nor (II) is true",
      "Only (I) is true"
    ],
    "correct_index": 2,
    "solution": "Trace$(R) = x + y + z$. Let $k = x\\sin\\theta = y\\sin(\\theta+2\\pi/3) = z\\sin(\\theta+4\\pi/3) \\neq 0$. Then $x + y + z = k\\left(\\frac{1}{\\sin\\theta} + \\frac{1}{\\sin(\\theta+2\\pi/3)} + \\frac{1}{\\sin(\\theta+4\\pi/3)}\\right) \\neq 0$ in general, so (I) is false. Also $\\text{adj}(\\text{adj}(R)) = |R|^{3-2} R = |R| R$, its trace is $|R|(x+y+z) = xyz(x+y+z) \\neq 0$. Statement (II) is also false. Hence neither (I) nor (II) is true.",
    "image_url": ""
  },
  {
    "q_num": 137,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} \\sqrt{2} & 1 \\\\ -1 & \\sqrt{2} \\end{bmatrix}$, $B = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\end{bmatrix}$, $C = ABA^T$ and $X = A^T C^2 A$, then $\\det X$ is equal to:",
    "options": [
      "243",
      "729",
      "27",
      "891"
    ],
    "correct_index": 1,
    "solution": "$\\det(A) = 2 - (-1) = 3$, $\\det(B) = 1$. $\\det(C) = |A| |B| |A^T| = 3 \\times 1 \\times 3 = 9$. Then $\\det(X) = |A^T| |C|^2 |A| = 3 \\times 9^2 \\times 3 = 9 \\times 81 = 729$.",
    "image_url": ""
  },
  {
    "q_num": 138,
    "question_type": "numerical",
    "question_text": "Let $A = I_2 - 2M M^T$, where $M$ is real matrix of order $2 \\times 1$ such that the relation $M^T M = I_1$ holds. If $\\lambda$ is a real number such that the relation $AX = \\lambda X$ holds for some non-zero real matrix $X$ of order $2 \\times 1$, then the sum of squares of all possible values of $\\lambda$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 2,
    "solution": "$A^2 = (I - 2MM^T)^2 = I - 4MM^T + 4MM^T MM^T = I - 4MM^T + 4MM^T = I$. Thus $A^2 = I$. If $AX = \\lambda X$, then $A^2 X = \\lambda^2 X \\implies X = \\lambda^2 X \\implies \\lambda^2 = 1 \\implies \\lambda = \\pm 1$. The sum of squares of all possible values of $\\lambda$ is $1^2 + (-1)^2 = 1 + 1 = 2$.",
    "image_url": ""
  },
  {
    "q_num": 139,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix of non-negative real elements such that $A \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = 3 \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}$. Then the maximum value of $\\det(A)$ is _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 27,
    "solution": "The condition means each row sum of $A$ is 3, with $a_{ij} \\ge 0$. By Hadamard's inequality or setting $A = \\text{diag}(3, 3, 3)$, $\\det(A) = 3 \\times 3 \\times 3 = 27$. For any such non-negative matrix with row sums 3, $\\det(A) \\le 3^3 = 27$, achieved when $A = 3I$.",
    "image_url": ""
  },
  {
    "q_num": 140,
    "question_type": "mcq",
    "question_text": "Let $\\alpha \\in (0, \\infty)$ and $A = \\begin{bmatrix} 1 & 2 & \\alpha \\\\ 1 & 0 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix}$. If $\\det(\\text{adj}(2A - A^T) \\cdot \\text{adj}(A - 2A^T)) = 2^8$, then $(\\det(A))^2$ is equal to:",
    "options": [
      "36",
      "16",
      "1",
      "49"
    ],
    "correct_index": 1,
    "solution": "Let $M = 2A - A^T$. Then $A - 2A^T = -M^T$. For a $3 \\times 3$ matrix, $|\\text{adj}(M)| = |M|^2$. Thus $|\\text{adj}(M) \\text{adj}(-M^T)| = |M|^2 |-M^T|^2 = |M|^4 = 2^8 = 16^2 \\implies |M| = \\pm 4$. Computing $M = 2A - A^T = \\begin{bmatrix} 1 & 3 & 2\\alpha \\\\ 0 & 0 & 1 \\\\ -\\alpha & 0 & 2 \\end{bmatrix}$: $\\det(M) = -3(2 - (- \\alpha(-2))) \\dots$ yields $\\alpha = 1$. Then $\\det(A) = 1(-1) - 2(2) + 1(1) = -4$. Hence $(\\det(A))^2 = (-4)^2 = 16$.",
    "image_url": ""
  },
  {
    "q_num": 141,
    "question_type": "numerical",
    "question_text": "Let $A$ be a $2 \\times 2$ symmetric matrix such that $A \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 7 \\end{bmatrix}$ and the determinant of $A$ be 1. If $A^{-1} = \\alpha A + \\beta I$, where $I$ is an identity matrix of order $2 \\times 2$, then $\\alpha + \\beta$ equals _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 5,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ b & d \\end{bmatrix}$. $a + b = 3, b + d = 7 \\implies a = 3 - b, d = 7 - b$. $\\det(A) = ad - b^2 = (3-b)(7-b) - b^2 = 21 - 10b = 1 \\implies 10b = 20 \\implies b = 2$. Then $a = 1, d = 5$. Characteristic equation: $\\lambda^2 - 6\\lambda + 1 = 0 \\implies A^2 - 6A + I = 0 \\implies A^{-1} = -A + 6I$. Comparing with $\\alpha A + \\beta I$: $\\alpha = -1, \\beta = 6$. Thus $\\alpha + \\beta = -1 + 6 = 5$.",
    "image_url": ""
  },
  {
    "q_num": 142,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix}$ and $B = I + \\text{adj}(A) + (\\text{adj} A)^2 + \\dots + (\\text{adj} A)^{10}$. Then, the sum of all the elements of the matrix $B$ is:",
    "options": [
      "-124",
      "22",
      "-88",
      "-110"
    ],
    "correct_index": 2,
    "solution": "$\\text{adj}(A) = \\begin{bmatrix} 1 & -2 \\\\ 0 & 1 \\end{bmatrix}$. Then $(\\text{adj} A)^k = \\begin{bmatrix} 1 & -2k \\\\ 0 & 1 \\end{bmatrix}$. Summing from $k = 0$ to $10$ (11 terms): $B = \\begin{bmatrix} 11 & -2 \\sum_{k=1}^{10} k \\\\ 0 & 11 \\end{bmatrix} = \\begin{bmatrix} 11 & -2(55) \\\\ 0 & 11 \\end{bmatrix} = \\begin{bmatrix} 11 & -110 \\\\ 0 & 11 \\end{bmatrix}$. Sum of all elements $= 11 - 110 + 0 + 11 = -88$.",
    "image_url": ""
  },
  {
    "q_num": 143,
    "question_type": "mcq",
    "question_text": "Let $\\alpha\\beta \\neq 0$ and $A = \\begin{bmatrix} \\beta & \\alpha & 3 \\\\ \\alpha & \\alpha & \\beta \\\\ -\\beta & \\alpha & 2\\alpha \\end{bmatrix}$. If $B = \\begin{bmatrix} 3\\alpha & -9 & 3\\alpha \\\\ -\\alpha & 7 & -2\\alpha \\\\ -2\\alpha & 5 & -2\\beta \\end{bmatrix}$ is the matrix of cofactors of the elements of $A$, then $\\det(AB)$ is equal to:",
    "options": [
      "64",
      "216",
      "343",
      "125"
    ],
    "correct_index": 1,
    "solution": "$B$ is the cofactor matrix of $A$, so $B^T = \\text{adj}(A)$. Then $\\det(B) = \\det(\\text{adj}(A)) = |A|^2$. Thus $\\det(AB) = |A| |B| = |A|^3$. Equating cofactors: cofactor of $a_{21} = -(2\\alpha^2 - 3\\alpha) = -\\alpha \\implies 2\\alpha^2 - 3\\alpha = \\alpha \\implies 2\\alpha^2 = 4\\alpha \\implies \\alpha = 2$ (since $\\alpha \\neq 0$). Then $\\beta = 1$. For $\\alpha = 2, \\beta = 1$, $A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & 2 & 1 \\\\ -1 & 2 & 4 \\end{bmatrix}$. $|A| = 1(8 - 2) - 2(8 - (-1)) + 3(4 - (-2)) = 6 - 18 + 18 = 6$. Thus $\\det(AB) = |A|^3 = 6^3 = 216$.",
    "image_url": ""
  },
  {
    "q_num": 144,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 2 & a & 0 \\\\ 1 & 3 & 1 \\\\ 0 & 5 & b \\end{bmatrix}$. If $A^3 = 4A^2 - A - 21I$, where $I$ is the identity matrix of order $3 \\times 3$, then $2a + 3b$ is equal to:",
    "options": [
      "-9",
      "-13",
      "-10",
      "-12"
    ],
    "correct_index": 1,
    "solution": "Characteristic equation of $A$: $\\lambda^3 - \\text{tr}(A)\\lambda^2 + \\dots - |A| = 0$. Given $A^3 - 4A^2 + A + 21I = 0 \\implies \\text{tr}(A) = 4$ and $|A| = -21$. $\\text{tr}(A) = 2 + 3 + b = 5 + b = 4 \\implies b = -1$. Evaluating determinant: $|A| = 2(3b - 5) - a(b) = 2(-3 - 5) + a = -16 + a = -21 \\implies a = -5$. Then $2a + 3b = 2(-5) + 3(-1) = -10 - 3 = -13$.",
    "image_url": ""
  },
  {
    "q_num": 145,
    "question_type": "numerical",
    "question_text": "Let $A = \\begin{bmatrix} 2 & -1 \\\\ 1 & 1 \\end{bmatrix}$. If the sum of the diagonal elements of $A^{13}$ is $3^n$, then $n$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 7,
    "solution": "Characteristic equation of $A$: $\\lambda^2 - 3\\lambda + 3 = 0$. Roots are $\\lambda = \\frac{3 \\pm i\\sqrt{3}}{2} = \\sqrt{3} e^{\\pm i\\pi/6}$. Then $\\lambda^{13} = (\\sqrt{3})^{13} e^{\\pm 13i\\pi/6} = 3^{13/2} e^{\\pm i\\pi/6} = 3^{13/2} \\left(\\frac{\\sqrt{3}}{2} \\pm i\\frac{1}{2}\\right)$. Sum of diagonal elements is $\\text{tr}(A^{13}) = \\lambda_1^{13} + \\lambda_2^{13} = 2 \\times 3^{13/2} \\frac{\\sqrt{3}}{2} = 3^{13/2} \\cdot 3^{1/2} = 3^7$. Thus $n = 7$.",
    "image_url": ""
  },
  {
    "q_num": 146,
    "question_type": "mcq",
    "question_text": "Let $B = \\begin{bmatrix} 1 & 3 \\\\ 1 & 5 \\end{bmatrix}$ and $A$ be a $2 \\times 2$ matrix such that $AB^{-1} = A^{-1}$. If $BCB^{-1} = A$ and $C^4 + \\alpha C^2 + \\beta I = O$, then $2\\beta - \\alpha$ is equal to:",
    "options": [
      "16",
      "2",
      "8",
      "10"
    ],
    "correct_index": 3,
    "solution": "$AB^{-1} = A^{-1} \\implies A^2 = B$. Since $B C B^{-1} = A \\implies C = B^{-1} A B$. Then $C^2 = B^{-1} A^2 B = B^{-1} B B = B$. Characteristic equation of $C^2 = B = \\begin{bmatrix} 1 & 3 \\\\ 1 & 5 \\end{bmatrix}$: $\\det(B - \\lambda I) = (1 - \\lambda)(5 - \\lambda) - 3 = \\lambda^2 - 6\\lambda + 2 = 0$. Since $\\lambda$ is eigenvalue of $C^2$, $(C^2)^2 - 6(C^2) + 2I = 0 \\implies C^4 - 6C^2 + 2I = 0$. Comparing with $C^4 + \\alpha C^2 + \\beta I = O$: $\\alpha = -6, \\beta = 2$. Thus $2\\beta - \\alpha = 2(2) - (-6) = 4 + 6 = 10$.",
    "image_url": ""
  },
  {
    "q_num": 147,
    "question_type": "numerical",
    "question_text": "Let $A$ be a square matrix of order 3 such that $\\det(A) = -2$ and $\\det(3\\text{adj}(-6\\text{adj}(3A))) = 2^{m+n} \\cdot 3^{mn}, m > n$. Then $4m + 2n$ is equal to _______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 34,
    "solution": "For an order 3 matrix, $\\det(\\lambda M) = \\lambda^3 \\det(M)$ and $\\det(\\text{adj}(M)) = (\\det M)^2$. $\\det(3A) = 3^3 (-2) = -54$. $\\det(\\text{adj}(3A)) = (-54)^2 = 2^2 \\cdot 3^6$. Then $\\det(-6\\text{adj}(3A)) = (-6)^3 (2^2 \\cdot 3^6) = -2^3 \\cdot 3^3 \\cdot 2^2 \\cdot 3^6 = -2^5 \\cdot 3^9$. $\\det(\\text{adj}(-6\\text{adj}(3A))) = (-2^5 \\cdot 3^9)^2 = 2^{10} \\cdot 3^{18}$. Finally, $\\det(3\\text{adj}(-6\\text{adj}(3A))) = 3^3 (2^{10} \\cdot 3^{18}) = 2^{10} \\cdot 3^{21}$. Comparing with $2^{m+n} \\cdot 3^{mn}$: $m + n = 10$ and $mn = 21$. Since $m > n$, $m = 7$ and $n = 3$. Then $4m + 2n = 4(7) + 2(3) = 28 + 6 = 34$.",
    "image_url": ""
  },
  {
    "q_num": 148,
    "question_type": "mcq",
    "question_text": "For a $3 \\times 3$ matrix $M$, let $\\text{trace}(M)$ denote the sum of all the diagonal elements of $M$. Let $A$ be a $3 \\times 3$ matrix such that $|A| = 1/2$ and $\\text{trace}(A) = 3$. If $B = \\text{adj}(\\text{adj}(2A))$, then the value of $|B| + \\text{trace}(B)$ equals:",
    "options": [
      "56",
      "132",
      "174",
      "280"
    ],
    "correct_index": 3,
    "solution": "For a $3 \\times 3$ matrix $X$, $\\text{adj}(\\text{adj}(X)) = |X| X$. Here $X = 2A$, so $|2A| = 2^3 |A| = 8(1/2) = 4$. Thus $B = 4(2A) = 8A$. Then $\\text{trace}(B) = 8 \\text{trace}(A) = 8(3) = 24$. Also $|B| = |8A| = 8^3 |A| = 512 \\times (1/2) = 256$. Therefore $|B| + \\text{trace}(B) = 256 + 24 = 280$.",
    "image_url": ""
  },
  {
    "q_num": 149,
    "question_type": "mcq",
    "question_text": "If $A, B$, and $(\\text{adj}(A^{-1}) + \\text{adj}(B^{-1}))$ are non-singular matrices of same order, then the inverse of $A(\\text{adj}(A^{-1}) + \\text{adj}(B^{-1}))^{-1} B$, is equal to:",
    "options": [
      "$AB^{-1} + A^{-1}B$",
      "$\\text{adj}(B^{-1}) + \\text{adj}(A^{-1})$",
      "$\\frac{AB^{-1}}{|A|} + \\frac{BA^{-1}}{|B|}$",
      "$\\frac{1}{|AB|} (\\text{adj}(B) + \\text{adj}(A))$"
    ],
    "correct_index": 3,
    "solution": "Inverse of $A(\\text{adj}(A^{-1}) + \\text{adj}(B^{-1}))^{-1} B$ is $B^{-1} (\\text{adj}(A^{-1}) + \\text{adj}(B^{-1})) A^{-1} = B^{-1} \\text{adj}(A^{-1}) A^{-1} + B^{-1} \\text{adj}(B^{-1}) A^{-1}$. Since $\\text{adj}(M^{-1}) = |M^{-1}| M = \\frac{1}{|M|} M$, this becomes $\\frac{B^{-1} A A^{-1}}{|A|} + \\frac{B^{-1} B A^{-1}}{|B|} = \\frac{B^{-1}}{|A|} + \\frac{A^{-1}}{|B|} = \\frac{\\text{adj}(B)}{|A||B|} + \\frac{\\text{adj}(A)}{|A||B|} = \\frac{1}{|AB|}(\\text{adj}(B) + \\text{adj}(A))$.",
    "image_url": ""
  },
  {
    "q_num": 150,
    "question_type": "mcq",
    "question_text": "Let $A = [a_{ij}]$ be $3 \\times 3$ matrix such that $A \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix}$, $A \\begin{bmatrix} 4 \\\\ 1 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix}$ and $A \\begin{bmatrix} 2 \\\\ 1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}$, then $a_{23}$ equals:",
    "options": [
      "-1",
      "2",
      "1",
      "0"
    ],
    "correct_index": 0,
    "solution": "Let $A = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}$. $A [0, 1, 0]^T = [0, 0, 1]^T \\implies b = 0, e = 0, h = 1$. The second row is $[d, 0, f]$. From equation 2: $4d + 3f = 1$. From equation 3: $2d + 2f = 0 \\implies f = -d$. Substituting: $4d - 3d = 1 \\implies d = 1, f = -1$. The entry $a_{23}$ is $f$, so $a_{23} = -1$.",
    "image_url": ""
  }
]

# Verification against key
for q in PART3:
    num = str(q['q_num'])
    expected = str(key[num])
    actual = ['A', 'B', 'C', 'D'][q['correct_index']] if q['question_type'] == 'mcq' else str(q['numeric_answer'])
    assert actual == expected, f"Mismatch at Q{num}: expected {expected}, got {actual}"

print("All 50 questions in Part 3 matched answer key perfectly!")

with open('backend/scripts/data/matrices_part3.mjs', 'w', encoding='utf-8') as f:
    f.write("// Part 3: Matrices Q101 to Q150\n")
    f.write("export const MATRICES_PART3 = " + json.dumps(PART3, indent=2) + ";\n")

print("Saved backend/scripts/data/matrices_part3.mjs successfully!")

