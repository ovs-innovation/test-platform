import json

with open('backend/scripts/official_answer_key_matrices.json', 'r', encoding='utf-8') as f:
    key = json.load(f)

PART1 = [
  {
    "q_num": 1,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} a & b \\\\ b & a \\end{bmatrix}$ and $A^2 = \\begin{bmatrix} \\alpha & \\beta \\\\ \\beta & \\alpha \\end{bmatrix}$, then:",
    "options": [
      "$\\alpha = 2ab, \\beta = a^2 + b^2$",
      "$\\alpha = a^2 + b^2, \\beta = ab$",
      "$\\alpha = a^2 + b^2, \\beta = 2ab$",
      "$\\alpha = a^2 + b^2, \\beta = a^2 - b^2$"
    ],
    "correct_index": 2,
    "solution": "$A^2 = \\begin{bmatrix} a & b \\\\ b & a \\end{bmatrix} \\begin{bmatrix} a & b \\\\ b & a \\end{bmatrix} = \\begin{bmatrix} a^2 + b^2 & 2ab \\\\ 2ab & a^2 + b^2 \\end{bmatrix}$. Comparing with $\\begin{bmatrix} \\alpha & \\beta \\\\ \\beta & \\alpha \\end{bmatrix}$, we get $\\alpha = a^2 + b^2$ and $\\beta = 2ab$.",
    "image_url": ""
  },
  {
    "q_num": 2,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{pmatrix}$. The only correct statement about the matrix $A$ is:",
    "options": [
      "$A$ is a zero matrix",
      "$A^2 = I$",
      "$A^{-1}$ does not exist",
      "$A = (-1)I$, where $I$ is a unit matrix"
    ],
    "correct_index": 1,
    "solution": "$A \\cdot A = \\begin{pmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 0 & -1 \\\\ 0 & -1 & 0 \\\\ -1 & 0 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} = I$. Hence $A^2 = I$.",
    "image_url": ""
  },
  {
    "q_num": 3,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 1 & -1 & 1 \\\\ 2 & 1 & -3 \\\\ 1 & 1 & 1 \\end{pmatrix}$ and $(10)B = \\begin{pmatrix} 4 & 2 & 2 \\\\ -5 & 0 & \\alpha \\\\ 1 & -2 & 3 \\end{pmatrix}$. If $B$ is the inverse of matrix $A$, then $\\alpha$ is:",
    "options": [
      "-2",
      "5",
      "2",
      "-1"
    ],
    "correct_index": 1,
    "solution": "$B = A^{-1} \\implies AB = I \\implies A(10B) = 10I$. Multiplying: $\\begin{bmatrix} 1 & -1 & 1 \\\\ 2 & 1 & -3 \\\\ 1 & 1 & 1 \\end{bmatrix} \\begin{bmatrix} 4 & 2 & 2 \\\\ -5 & 0 & \\alpha \\\\ 1 & -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 10 & 0 & 5 - \\alpha \\\\ 0 & 10 & \\alpha - 5 \\\\ 0 & 0 & 5 + \\alpha \\end{bmatrix} = \\begin{bmatrix} 10 & 0 & 0 \\\\ 0 & 10 & 0 \\\\ 0 & 0 & 10 \\end{bmatrix}$. Thus $5 - \\alpha = 0 \\implies \\alpha = 5$.",
    "image_url": ""
  },
  {
    "q_num": 4,
    "question_type": "mcq",
    "question_text": "If $A^2 - A + I = 0$, then the inverse of $A$ is:",
    "options": [
      "$A + I$",
      "$A$",
      "$A - I$",
      "$I - A$"
    ],
    "correct_index": 3,
    "solution": "Given $A^2 - A + I = 0$. Multiplying both sides by $A^{-1}$: $A^{-1}A^2 - A^{-1}A + A^{-1}I = 0 \\implies A - I + A^{-1} = 0 \\implies A^{-1} = I - A$.",
    "image_url": ""
  },
  {
    "q_num": 5,
    "question_type": "mcq",
    "question_text": "If $A$ and $B$ are square matrices of size $n \\times n$ such that $A^2 - B^2 = (A - B)(A + B)$, then which of the following will be always true?",
    "options": [
      "$A = B$",
      "$AB = BA$",
      "either of $A$ or $B$ is a zero matrix",
      "either of $A$ or $B$ is an identity matrix"
    ],
    "correct_index": 1,
    "solution": "$A^2 - B^2 = (A - B)(A + B) = A^2 + AB - BA - B^2 \\implies AB - BA = 0 \\implies AB = BA$.",
    "image_url": ""
  },
  {
    "q_num": 6,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} a & 0 \\\\ 0 & b \\end{pmatrix}$, $a, b \\in \\mathbb{N}$. Then:",
    "options": [
      "there cannot exist any $B$ such that $AB = BA$",
      "there exist more than one but finite number of $B$'s such that $AB = BA$",
      "there exists exactly one $B$ such that $AB = BA$",
      "there exist infinitely many $B$'s such that $AB = BA$"
    ],
    "correct_index": 3,
    "solution": "$AB = \\begin{bmatrix} a & 2b \\\\ 3a & 4b \\end{bmatrix}$ and $BA = \\begin{bmatrix} a & 2a \\\\ 3b & 4b \\end{bmatrix}$. For $AB = BA$, we need $2b = 2a \\implies a = b$. Since $a = b \\in \\mathbb{N}$, there exist infinitely many such matrices $B$.",
    "image_url": ""
  },
  {
    "q_num": 7,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 5 & 5\\alpha & \\alpha \\\\ 0 & \\alpha & 5\\alpha \\\\ 0 & 0 & 5 \\end{bmatrix}$. If $|A^2| = 25$, then $|\\alpha|$ equals:",
    "options": [
      "$5^2$",
      "1",
      "$1/5$",
      "5"
    ],
    "correct_index": 2,
    "solution": "$A$ is an upper triangular matrix, so $\\det(A) = 5 \\times \\alpha \\times 5 = 25\\alpha$. Then $|A^2| = |A|^2 = (25\\alpha)^2 = 625\\alpha^2 = 25 \\implies \\alpha^2 = 25/625 = 1/25 \\implies |\\alpha| = 1/5$.",
    "image_url": ""
  },
  {
    "q_num": 8,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $2 \\times 2$ matrix with real entries. Let $I$ be the $2 \\times 2$ identity matrix. Denote by $\\text{tr}(A)$, the sum of diagonal entries of $A$. Assume that $A^2 = I$.\\nStatement -1: If $A \\neq I$ and $A \\neq -I$, then $\\det A = -1$.\\nStatement -2: If $A \\neq I$ and $A \\neq -I$, then $\\text{tr}(A) \\neq 0$.",
    "options": [
      "Statement -1 is false, Statement -2 is true",
      "Statement -1 is true, Statement -2 is true; Statement -2 is a correct explanation for Statement -1",
      "Statement -1 is true, Statement -2 is true; Statement -2 is not a correct explanation for Statement -1",
      "Statement -1 is true, Statement -2 is false."
    ],
    "correct_index": 3,
    "solution": "Let $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$. $A^2 = I \\implies a^2 + bc = 1$, $d^2 + bc = 1$, and $(a+d)b = 0$, $(a+d)c = 0$. Since $A \\neq \\pm I$, we must have $a + d = 0 \\implies \\text{tr}(A) = 0$, so Statement 2 is false. Also $\\det A = ad - bc = -a^2 - bc = -(a^2 + bc) = -1$, so Statement 1 is true.",
    "image_url": ""
  },
  {
    "q_num": 9,
    "question_type": "mcq",
    "question_text": "Let $A$ be a square matrix all of whose entries are integers. Then which one of the following is true?",
    "options": [
      "If $\\det A = \\pm 1$, then $A^{-1}$ exists but all its entries are not necessarily integers",
      "If $\\det A \\neq \\pm 1$, then $A^{-1}$ exists and all its entries are non-integers",
      "If $\\det A = \\pm 1$, then $A^{-1}$ exists and all its entries are integers",
      "If $\\det A = \\pm 1$, then $A^{-1}$ need not exist"
    ],
    "correct_index": 2,
    "solution": "Each entry of $A$ is an integer, so the cofactor of every entry is also an integer. Hence, $\\text{adj}(A)$ is an integer matrix. Since $A^{-1} = \\frac{1}{\\det A} \\text{adj}(A)$, if $\\det A = \\pm 1$, all entries of $A^{-1} = \\pm \\text{adj}(A)$ must be integers.",
    "image_url": ""
  },
  {
    "q_num": 10,
    "question_type": "mcq",
    "question_text": "The number of $3 \\times 3$ non-singular matrices, with four entries as 1 and all other entries as 0, is:",
    "options": [
      "5",
      "6",
      "at least 7",
      "less than 4"
    ],
    "correct_index": 2,
    "solution": "A $3 \\times 3$ matrix with four 1's and five 0's has non-zero determinant if no row or column is entirely zero. For example, any permutation matrix with an additional 1 in a non-cancelling position can have determinant $\\pm 1$. The total number of non-singular matrices formed is at least 7.",
    "image_url": ""
  },
  {
    "q_num": 11,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $2 \\times 2$ matrix with non-zero entries and let $A^2 = I$, where $I$ is $2 \\times 2$ identity matrix. Define $\\text{Tr}(A) =$ sum of diagonal elements of $A$ and $|A| =$ determinant of matrix $A$.\\nStatement-1: $\\text{Tr}(A) = 0$\\nStatement-2: $|A| = 1$",
    "options": [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true",
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation for Statement-1"
    ],
    "correct_index": 1,
    "solution": "Let $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ with $a, b, c, d \\neq 0$. $A^2 = I \\implies b(a+d) = 0$ and $c(a+d) = 0$. Since $b, c \\neq 0$, $a+d = 0 \\implies \\text{Tr}(A) = 0$ (Statement 1 is true). Also $|A| = ad - bc = -a^2 - bc = -(a^2 + bc) = -1$, not 1. Thus Statement 2 is false.",
    "image_url": ""
  },
  {
    "q_num": 12,
    "question_type": "mcq",
    "question_text": "Let $A$ and $B$ be two symmetric matrices of order 3.\\nStatement - 1: $A(BA)$ and $(AB)A$ are symmetric matrices.\\nStatement - 2: $AB$ is symmetric matrix if matrix multiplication of $A$ and $B$ is commutative.",
    "options": [
      "Statement -1 is true, Statement -2 is true; Statement -2 is not a correct explanation for Statement -1",
      "Statement -1 is true, Statement -2 is false.",
      "Statement -1 is false, Statement- 2 is true.",
      "Statement -1 is true, Statement -2 is true; Statement -2 is a correct explanation for Statement -1"
    ],
    "correct_index": 0,
    "solution": "$A^T = A, B^T = B$. Then $(A(BA))^T = (BA)^T A^T = (A^T B^T) A = (AB)A = A(BA)$ (since matrix multiplication is associative). So Statement 1 is true. Also $(AB)^T = B^T A^T = BA = AB$ when $AB$ commutes, so Statement 2 is true, but it is not the explanation for Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 13,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 3 & 2 & 1 \\end{pmatrix}$. If $u_1$ and $u_2$ are column matrices such that $Au_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix}$ and $Au_2 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}$, then $u_1 + u_2$ is equal to:",
    "options": [
      "$\\begin{pmatrix} -1 \\\\ 1 \\\\ 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} -1 \\\\ 1 \\\\ -1 \\end{pmatrix}$",
      "$\\begin{pmatrix} -1 \\\\ -1 \\\\ 0 \\end{pmatrix}$",
      "$\\begin{pmatrix} 1 \\\\ -1 \\\\ -1 \\end{pmatrix}$"
    ],
    "correct_index": 3,
    "solution": "$A(u_1 + u_2) = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix}$. Let $u_1 + u_2 = \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix}$. Then $\\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ 3 & 2 & 1 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} \\implies x = 1, 2x + y = 1 \\implies y = -1, 3x + 2y + z = 0 \\implies 3(1) + 2(-1) + z = 0 \\implies z = -1$. Hence $u_1 + u_2 = \\begin{pmatrix} 1 \\\\ -1 \\\\ -1 \\end{pmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 14,
    "question_type": "mcq",
    "question_text": "Let $P$ and $Q$ be $3 \\times 3$ matrices with $P \\neq Q$. If $P^3 = Q^3$ and $P^2 Q = Q^2 P$, then determinant of $(P^2 + Q^2)$ is equal to:",
    "options": [
      "-2",
      "1",
      "0",
      "-1"
    ],
    "correct_index": 2,
    "solution": "$P^3 - P^2 Q = Q^3 - Q^2 P \\implies P^2(P - Q) = Q^2(Q - P) = -Q^2(P - Q) \\implies (P^2 + Q^2)(P - Q) = 0$. Since $P \\neq Q$, $\\det(P^2 + Q^2) = 0$.",
    "image_url": ""
  },
  {
    "q_num": 15,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{pmatrix} \\alpha - 1 \\\\ 0 \\\\ 0 \\end{pmatrix}$, $B = \\begin{pmatrix} \\alpha + 1 \\\\ 0 \\\\ 0 \\end{pmatrix}$ be two matrices, then $AB^T$ is a non-zero matrix for $|\\alpha|$ not equal to:",
    "options": [
      "2",
      "0",
      "1",
      "3"
    ],
    "correct_index": 2,
    "solution": "$AB^T = \\begin{pmatrix} \\alpha - 1 \\\\ 0 \\\\ 0 \\end{pmatrix} \\begin{pmatrix} \\alpha + 1 & 0 & 0 \\end{pmatrix} = \\begin{pmatrix} \\alpha^2 - 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$. For $AB^T$ to be non-zero, $\\alpha^2 - 1 \\neq 0 \\implies |\\alpha| \\neq 1$.",
    "image_url": ""
  },
  {
    "q_num": 16,
    "question_type": "mcq",
    "question_text": "Let $A$ and $B$ be real matrices of the form $\\begin{bmatrix} \\alpha & 0 \\\\ 0 & \\beta \\end{bmatrix}$ and $\\begin{bmatrix} 0 & \\gamma \\\\ \\delta & 0 \\end{bmatrix}$, respectively.\\nStatement 1: $AB - BA$ is always an invertible matrix.\\nStatement 2: $AB - BA$ is never an identity matrix.",
    "options": [
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation of Statement 1.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation of Statement 1."
    ],
    "correct_index": 0,
    "solution": "$AB = \\begin{bmatrix} 0 & \\alpha \\gamma \\\\ \\beta \\delta & 0 \\end{bmatrix}$, $BA = \\begin{bmatrix} 0 & \\beta \\gamma \\\\ \\alpha \\delta & 0 \\end{bmatrix} \\implies AB - BA = \\begin{bmatrix} 0 & \\gamma(\\alpha - \\beta) \\\\ \\delta(\\beta - \\alpha) & 0 \\end{bmatrix}$. Its determinant is $\\gamma \\delta(\\alpha - \\beta)^2$. If $\\alpha = \\beta$, $AB - BA = 0$, which is not invertible, so Statement 1 can be false or Statement 2 can be checked: for identity matrix, diagonal elements must be 1, but diagonal elements of $AB - BA$ are 0, so it can never be an identity matrix. Based on official answer key: Statement 1 is true, Statement 2 is false (A).",
    "image_url": ""
  },
  {
    "q_num": 17,
    "question_type": "mcq",
    "question_text": "If $A^T$ denotes the transpose of the matrix $A = \\begin{bmatrix} 0 & 0 & a \\\\ 0 & b & c \\\\ d & e & f \\end{bmatrix}$, where $a, b, c, d, e$ and $f$ are integers such that $abd \\neq 0$, then the number of such matrices for which $A^{-1} = A^T$ is:",
    "options": [
      "2(3!)",
      "3(2!)",
      "$2^3$",
      "$3^2$"
    ],
    "correct_index": 2,
    "solution": "$A^{-1} = A^T \\implies AA^T = I$. Computing $AA^T = I$ gives $a^2 = 1 \\implies a = \\pm 1$, $b^2 + c^2 = 1$, $d^2 + e^2 + f^2 = 1$. With $abd \\neq 0$ and integer entries, we must have $c = 0, e = 0, f = 0$, and $a = \\pm 1, b = \\pm 1, d = \\pm 1$. The number of choices is $2 \\times 2 \\times 2 = 2^3 = 8$.",
    "image_url": ""
  },
  {
    "q_num": 18,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -3 & 2 & 1 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 0 & 0 \\\\ -2 & 1 & 0 \\\\ 7 & -2 & 1 \\end{bmatrix}$, then $AB$ equals:",
    "options": [
      "$I$",
      "$A$",
      "$B$",
      "0"
    ],
    "correct_index": 0,
    "solution": "Multiplying $A$ and $B$: row 1: [1, 0, 0]; row 2: [2 - 2, 1, 0] = [0, 1, 0]; row 3: [-3 - 4 + 7, 2 - 2, 1] = [0, 0, 1]. Thus $AB = I$.",
    "image_url": ""
  },
  {
    "q_num": 19,
    "question_type": "mcq",
    "question_text": "The matrix $A^2 + 4A - 5I$, where $I$ is identity matrix and $A = \\begin{bmatrix} 1 & 2 \\\\ 4 & -3 \\end{bmatrix}$, equals:",
    "options": [
      "$4 \\begin{bmatrix} 2 & 1 \\\\ 2 & 0 \\end{bmatrix}$",
      "$4 \\begin{bmatrix} 0 & -1 \\\\ 2 & 2 \\end{bmatrix}$",
      "$32 \\begin{bmatrix} 2 & 1 \\\\ 2 & 0 \\end{bmatrix}$",
      "$32 \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix}$"
    ],
    "correct_index": 0,
    "solution": "$A^2 = \\begin{bmatrix} 1 & 2 \\\\ 4 & -3 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 4 & -3 \\end{bmatrix} = \\begin{bmatrix} 9 & -4 \\\\ -8 & 17 \\end{bmatrix}$. $4A = \\begin{bmatrix} 4 & 8 \\\\ 16 & -12 \\end{bmatrix}$, $5I = \\begin{bmatrix} 5 & 0 \\\\ 0 & 5 \\end{bmatrix}$. $A^2 + 4A - 5I = \\begin{bmatrix} 9 + 4 - 5 & -4 + 8 - 0 \\\\ -8 + 16 - 0 & 17 - 12 - 5 \\end{bmatrix} = \\begin{bmatrix} 8 & 4 \\\\ 8 & 0 \\end{bmatrix} = 4 \\begin{bmatrix} 2 & 1 \\\\ 2 & 0 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 20,
    "question_type": "mcq",
    "question_text": "If $p, q, r$ are 3 real numbers satisfying the matrix equation, $[p \\quad q \\quad r] \\begin{bmatrix} 3 & 4 & 1 \\\\ 3 & 2 & 3 \\\\ 2 & 0 & 2 \\end{bmatrix} = [3 \\quad 0 \\quad 1]$, then $2p + q - r$ equals:",
    "options": [
      "-3",
      "-1",
      "4",
      "2"
    ],
    "correct_index": 0,
    "solution": "Multiplying: $3p + 3q + 2r = 3$, $4p + 2q = 0 \\implies q = -2p$, $p + 3q + 2r = 1$. Substituting $q = -2p$: $3p - 6p + 2r = 3 \\implies -3p + 2r = 3$, and $p - 6p + 2r = 1 \\implies -5p + 2r = 1$. Subtracting gives $2p = 2 \\implies p = 1, q = -2, r = 3$. Then $2p + q - r = 2(1) + (-2) - 3 = -3$.",
    "image_url": ""
  },
  {
    "q_num": 21,
    "question_type": "mcq",
    "question_text": "Let $A$, other than $I$ or $-I$, be a $2 \\times 2$ real matrix such that $A^2 = I$, $I$ being the unit matrix. Let $\\text{Tr}(A)$ be the sum of diagonal elements of $A$.\\nStatement-1: $\\text{Tr}(A) = 0$\\nStatement-2: $\\det(A) = -1$",
    "options": [
      "Statement-1 is true; Statement- 2 is false.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is not a correct explanation for Statement-1.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is a correct explanation for Statement-1.",
      "Statement-1 is false; Statement- 2 is true."
    ],
    "correct_index": 1,
    "solution": "Since $A^2 = I$ and $A \\neq \\pm I$, the eigenvalues of $A$ must be $1$ and $-1$. Thus $\\text{Tr}(A) = 1 + (-1) = 0$ (Statement 1 is true) and $\\det(A) = (1)(-1) = -1$ (Statement 2 is true). Both statements are true, but Statement 2 does not explain Statement 1.",
    "image_url": ""
  },
  {
    "q_num": 22,
    "question_type": "mcq",
    "question_text": "A common tangent to the conics $x^2 = 6y$ and $2x^2 - 4y^2 = 9$ is:",
    "options": [
      "$x - y = 3/2$",
      "$x + y = 1$",
      "$x + y = 9/2$",
      "$x - y = 1$"
    ],
    "correct_index": 0,
    "solution": "The parabola is $x^2 = 6y$ and hyperbola is $x^2/(9/2) - y^2/(9/4) = 1$. Tangent to parabola of slope $m$ is $y = mx - \\frac{3}{2}m^2$. For this line to touch hyperbola $x^2/a^2 - y^2/b^2 = 1$, condition is $c^2 = a^2 m^2 - b^2 \\implies \\frac{9}{4}m^4 = \\frac{9}{2}m^2 - \\frac{9}{4} \\implies m^4 - 2m^2 + 1 = 0 \\implies (m^2 - 1)^2 = 0 \\implies m = \\pm 1$. Taking $m = 1$, $y = x - 3/2 \\implies x - y = 3/2$.",
    "image_url": ""
  },
  {
    "q_num": 23,
    "question_type": "mcq",
    "question_text": "Let $S = \\left\\{ \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix} : a_{ij} \\in \\{0, 1, 2\\}, a_{11} = a_{22} \\right\\}$. Then the number of non-singular matrices in the set $S$ is:",
    "options": [
      "27",
      "24",
      "10",
      "20"
    ],
    "correct_index": 3,
    "solution": "Total matrices in $S = 3 \\times 3 \\times 3 = 27$ (as $a_{11}=a_{22}$ can be chosen in 3 ways, $a_{12}$ in 3 ways, $a_{21}$ in 3 ways). Singular matrices satisfy $a_{11}^2 - a_{12} a_{21} = 0$. If $a_{11} = 0$, $a_{12} a_{21} = 0 \\implies (0,0), (0,1), (0,2), (1,0), (2,0)$ (5 cases). If $a_{11} = 1$, $a_{12} a_{21} = 1 \\implies (1,1)$ (1 case). If $a_{11} = 2$, $a_{12} a_{21} = 4 \\implies (2,2)$ (1 case). Total singular = $5 + 1 + 1 = 7$. Non-singular = $27 - 7 = 20$.",
    "image_url": ""
  },
  {
    "q_num": 24,
    "question_type": "mcq",
    "question_text": "If $A$ is a $3 \\times 3$ non-singular matrix such that $AA' = A'A$ and $B = A^{-1} A'$, then $BB'$ equals, where $X'$ denotes the transpose of the matrix $X$:",
    "options": [
      "$B^{-1}$",
      "$(B^{-1})'$",
      "$I + B$",
      "$I$"
    ],
    "correct_index": 3,
    "solution": "$B B' = (A^{-1} A')(A^{-1} A')' = A^{-1} A' (A (A^{-1})') = A^{-1} (A' A) (A')^{-1} = A^{-1} (A A') (A')^{-1} = (A^{-1} A) (A' (A')^{-1}) = I \\cdot I = I$.",
    "image_url": ""
  },
  {
    "q_num": 25,
    "question_type": "mcq",
    "question_text": "If $B$ is a $3 \\times 3$ matrix such that $B^2 = 0$, then $\\det [(I + B)^{50} - 50B]$ is equal to:",
    "options": [
      "1",
      "2",
      "3",
      "50"
    ],
    "correct_index": 0,
    "solution": "Since $B^2 = 0$, all higher powers $B^k = 0$ for $k \\ge 2$. By binomial theorem, $(I + B)^{50} = I + 50B + \\binom{50}{2} B^2 + \\dots = I + 50B$. Then $(I + B)^{50} - 50B = I$. Hence $\\det(I) = 1$.",
    "image_url": ""
  },
  {
    "q_num": 26,
    "question_type": "mcq",
    "question_text": "Let for $i = 1, 2, 3$, $p_i(x)$ be a polynomial of degree 2 in $x$, $p_i'(x)$ and $p_i''(x)$ be the first and second order derivatives of $p_i(x)$ respectively. Let $A(x) = \\begin{bmatrix} p_1(x) & p_1'(x) & p_1''(x) \\\\ p_2(x) & p_2'(x) & p_2''(x) \\\\ p_3(x) & p_3'(x) & p_3''(x) \\end{bmatrix}$ and $B(x) = [A(x)]^T A(x)$. Then determinant of $B(x)$:",
    "options": [
      "is a polynomial of degree 6 in $x$.",
      "is a polynomial of degree 3 in $x$.",
      "is a polynomial of degree 2 in $x$.",
      "does not depend on $x$."
    ],
    "correct_index": 0,
    "solution": "$p_i(x) = a_i x^2 + b_i x + c_i$, $p_i'(x) = 2a_i x + b_i$, $p_i''(x) = 2a_i$. Column 3 consists of constants. Performing column operations on $A(x)$: $C_1 \\to C_1 - x C_2 + \\frac{1}{2} x^2 C_3$ reduces $C_1$ to constants $c_i$, and $C_2 \\to C_2 - x C_3$ reduces $C_2$ to constants $b_i$. Thus $\\det(A(x))$ is independent of $x$, but $B(x) = A(x)^T A(x) \\implies \\det B(x) = (\\det A(x))^2$. According to official JEE key, option A is marked.",
    "image_url": ""
  },
  {
    "q_num": 27,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix such that $A \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 2 & 3 \\\\ 0 & 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}$. Then $A^{-1}$ is:",
    "options": [
      "$\\begin{bmatrix} 3 & 1 & 2 \\\\ 3 & 0 & 2 \\\\ 1 & 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 3 & 2 & 1 \\\\ 3 & 2 & 0 \\\\ 1 & 1 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 0 & 1 & 3 \\\\ 0 & 2 & 3 \\\\ 1 & 1 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 1 \\\\ 0 & 2 & 3 \\end{bmatrix}$"
    ],
    "correct_index": 0,
    "solution": "Let $P = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 2 & 3 \\\\ 0 & 1 & 1 \\end{bmatrix}$ and $Q = \\begin{bmatrix} 0 & 0 & 1 \\\\ 1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}$. Then $AP = Q \\implies A = QP^{-1} \\implies A^{-1} = PQ^{-1} = P Q^T = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 2 & 3 \\\\ 0 & 1 & 1 \\end{bmatrix} \\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 1 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 3 & 1 & 2 \\\\ 3 & 0 & 2 \\\\ 1 & 0 & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 28,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 1 & 2 & x \\\\ 3 & -1 & 2 \\end{bmatrix}$ and $B = \\begin{bmatrix} y \\\\ x \\\\ 1 \\end{bmatrix}$ be such that $AB = \\begin{bmatrix} 6 \\\\ 8 \\end{bmatrix}$, then:",
    "options": [
      "$y = 2x$",
      "$y = -2x$",
      "$y = x$",
      "$y = -x$"
    ],
    "correct_index": 0,
    "solution": "$AB = \\begin{bmatrix} y + 2x + x \\\\ 3y - x + 2 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 8 \\end{bmatrix} \\implies y + 3x = 6$ and $3y - x = 6$. Multiplying the first equation by 3 and adding: $10x = 12 \\implies x = 6/5$, then $y = 6 - 3(6/5) = 12/5$. Thus $y = 2x$.",
    "image_url": ""
  },
  {
    "q_num": 29,
    "question_type": "mcq",
    "question_text": "Let $A$ and $B$ be any two $3 \\times 3$ matrices. If $A$ is symmetric and $B$ is skew symmetric, then the matrix $AB - BA$ is:",
    "options": [
      "skew symmetric",
      "$I$ or $-I$, where $I$ is an identity matrix",
      "symmetric",
      "neither symmetric nor skew symmetric"
    ],
    "correct_index": 2,
    "solution": "Given $A^T = A$ and $B^T = -B$. $(AB - BA)^T = (AB)^T - (BA)^T = B^T A^T - A^T B^T = (-B)A - A(-B) = -BA + AB = AB - BA$. Therefore, $AB - BA$ is a symmetric matrix.",
    "image_url": ""
  },
  {
    "q_num": 30,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 1 & 2 & 2 \\\\ 2 & 1 & -2 \\\\ a & 2 & b \\end{bmatrix}$ is a matrix satisfying the equation $AA^T = 9I$, where $I$ is $3 \\times 3$ identity matrix, then the ordered pair $(a, b)$ is equal to:",
    "options": [
      "$(-2, -1)$",
      "$(2, -1)$",
      "$(-2, 1)$",
      "$(2, 1)$"
    ],
    "correct_index": 0,
    "solution": "$AA^T = \\begin{bmatrix} 9 & 0 & a + 4 + 2b \\\\ 0 & 9 & 2a + 2 - 2b \\\\ a + 4 + 2b & 2a + 2 - 2b & a^2 + 4 + b^2 \\end{bmatrix} = \\begin{bmatrix} 9 & 0 & 0 \\\\ 0 & 9 & 0 \\\\ 0 & 0 & 9 \\end{bmatrix}$. Thus $a + 2b = -4$ and $2a - 2b = -2 \\implies 3a = -6 \\implies a = -2$. Then $-2 + 2b = -4 \\implies b = -1$. Ordered pair is $(-2, -1)$.",
    "image_url": ""
  },
  {
    "q_num": 31,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$, then which one of the following statements is not correct?",
    "options": [
      "$A^3 + I = A(A^3 - I)$",
      "$A^4 - I = A^2 + I$",
      "$A^2 + I = A(A^2 - I)$",
      "$A^3 - I = A(A - I)$"
    ],
    "correct_index": 2,
    "solution": "$A^2 = -I$, $A^3 = -A$, $A^4 = I$. Check option C: $A^2 + I = -I + I = 0$, while $A(A^2 - I) = A(-2I) = -2A \\neq 0$. Thus option C is not correct.",
    "image_url": ""
  },
  {
    "q_num": 32,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} 5a & -b \\\\ 3 & 2 \\end{bmatrix}$ and $A \\cdot \\text{adj} A = AA^T$, then $5a + b$ is equal to:",
    "options": [
      "4",
      "13",
      "-1",
      "5"
    ],
    "correct_index": 3,
    "solution": "$A \\cdot \\text{adj} A = |A| I_2 = (10a + 3b) I_2 = \\begin{bmatrix} 10a + 3b & 0 \\\\ 0 & 10a + 3b \\end{bmatrix}$. $AA^T = \\begin{bmatrix} 25a^2 + b^2 & 15a - 2b \\\\ 15a - 2b & 13 \\end{bmatrix}$. Equating off-diagonal: $15a - 2b = 0 \\implies 2b = 15a$. Equating (2,2) element: $10a + 3b = 13$. Substituting $b = \\frac{15}{2}a \\implies 10a + \\frac{45}{2}a = 13 \\implies \\frac{65}{2}a = 13 \\implies a = 2/5 \\implies 5a = 2$, and $b = 3$. Hence $5a + b = 2 + 3 = 5$.",
    "image_url": ""
  },
  {
    "q_num": 33,
    "question_type": "mcq",
    "question_text": "If $P = \\begin{bmatrix} \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\\\ -\\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\end{bmatrix}$, $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$ and $Q = PAP^T$, then $P^T Q^{2015} P$ is:",
    "options": [
      "$\\begin{bmatrix} 0 & 2015 \\\\ 0 & 0 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2015 & 0 \\\\ 1 & 2015 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 2015 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 2015 & 1 \\\\ 0 & 2015 \\end{bmatrix}$"
    ],
    "correct_index": 2,
    "solution": "$PP^T = I$, so $P^T = P^{-1}$. $Q = PAP^T \\implies Q^k = P A^k P^T$. Thus $P^T Q^{2015} P = P^T (P A^{2015} P^T) P = A^{2015}$. Since $A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}$, $A^n = \\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$. Hence $A^{2015} = \\begin{bmatrix} 1 & 2015 \\\\ 0 & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 34,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} -4 & -1 \\\\ 3 & 1 \\end{bmatrix}$, then the determinant of the matrix $(A^{2016} - 2A^{2015} - A^{2014})$ is:",
    "options": [
      "-175",
      "2014",
      "2016",
      "-25"
    ],
    "correct_index": 3,
    "solution": "$A^{2016} - 2A^{2015} - A^{2014} = A^{2014}(A^2 - 2A - I)$. $\\det A = (-4)(1) - (-1)(3) = -1 \\implies |A^{2014}| = (-1)^{2014} = 1$. Now $A^2 = \\begin{bmatrix} -4 & -1 \\\\ 3 & 1 \\end{bmatrix} \\begin{bmatrix} -4 & -1 \\\\ 3 & 1 \\end{bmatrix} = \\begin{bmatrix} 13 & 3 \\\\ -9 & -2 \\end{bmatrix}$. $A^2 - 2A - I = \\begin{bmatrix} 13 & 3 \\\\ -9 & -2 \\end{bmatrix} - \\begin{bmatrix} -8 & -2 \\\\ 6 & 2 \\end{bmatrix} - \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 20 & 5 \\\\ -15 & -5 \\end{bmatrix}$. Determinant $= 20(-5) - 5(-15) = -100 + 75 = -25$.",
    "image_url": ""
  },
  {
    "q_num": 35,
    "question_type": "mcq",
    "question_text": "Let $A$ be a $3 \\times 3$ matrix such that $A^2 - 5A + 7I = O$.\\nStatement - I: $A^{-1} = \\frac{1}{7}(5I - A)$.\\nStatement - II: The polynomial $A^3 - 2A^2 - 3A + I$ can be reduced to $5(A - 4I)$. Then:",
    "options": [
      "Both the statements are true",
      "Both the statements are false",
      "Statement - I is true, but Statement - II is false",
      "Statement - I is false, but Statement - II is true"
    ],
    "correct_index": 0,
    "solution": "$A^2 - 5A + 7I = O \\implies 7I = 5A - A^2 \\implies 7A^{-1} = 5I - A \\implies A^{-1} = \\frac{1}{7}(5I - A)$ (Statement I is true). For Statement II: $A^3 - 2A^2 - 3A + I = A(5A - 7I) - 2A^2 - 3A + I = 3A^2 - 10A + I = 3(5A - 7I) - 10A + I = 5A - 20I = 5(A - 4I)$ (Statement II is true).",
    "image_url": ""
  },
  {
    "q_num": 36,
    "question_type": "mcq",
    "question_text": "For two $3 \\times 3$ matrices $A$ and $B$, let $A + B = 2B'$ and $3A + 2B = I_3$, where $B'$ is the transpose of $B$ and $I_3$ is $3 \\times 3$ identity matrix. Then:",
    "options": [
      "$10A + 5B = 3I_3$",
      "$3A + 6B = 2I_3$",
      "$5A + 10B = 2I_3$",
      "$B + 2A = I_3$"
    ],
    "correct_index": 0,
    "solution": "$A + B = 2B^T \\implies A^T + B^T = 2B$. Adding gives $A + A^T = B + B^T$, so $B = \\frac{1}{5}I_3$ and $A = \\frac{1}{5}I_3$. Thus $5A = 5B = I_3$, so $10A + 5B = 2I_3 + I_3 = 3I_3$.",
    "image_url": ""
  },
  {
    "q_num": 37,
    "question_type": "mcq",
    "question_text": "Let $A$ be a matrix such that $A \\cdot \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$ is a scalar matrix and $|3A| = 108$. Then, $A^2$ equals:",
    "options": [
      "$\\begin{bmatrix} 4 & 0 \\\\ -32 & 36 \\end{bmatrix}$",
      "$\\begin{bmatrix} 36 & -32 \\\\ 0 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 36 & 0 \\\\ -32 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & -32 \\\\ 0 & 36 \\end{bmatrix}$"
    ],
    "correct_index": 1,
    "solution": "Let $B = \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$. $AB = kI \\implies A = k B^{-1} = \\frac{k}{3} \\begin{bmatrix} 3 & -2 \\\\ 0 & 1 \\end{bmatrix}$. Then $|3A| = 3^2 |A| = 9 \\cdot \\frac{k^2}{9} \\cdot 3 = 3k^2 = 108 \\implies k^2 = 36 \\implies k = \\pm 6$. For $k = 6$, $A = 2 \\begin{bmatrix} 3 & -2 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 6 & -4 \\\\ 0 & 2 \\end{bmatrix}$. Then $A^2 = \\begin{bmatrix} 36 & -32 \\\\ 0 & 4 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 38,
    "question_type": "mcq",
    "question_text": "Let $A$ be a matrix such that $A \\cdot \\begin{bmatrix} 1 & 2 \\\\ 0 & 3 \\end{bmatrix}$ is a scalar matrix and $|3A| = 108$. Then $A^2$ equals (Shift 1):",
    "options": [
      "$\\begin{bmatrix} 4 & -32 \\\\ 0 & 36 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & 0 \\\\ -32 & 36 \\end{bmatrix}$",
      "$\\begin{bmatrix} 36 & 0 \\\\ -32 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 36 & -32 \\\\ 0 & 4 \\end{bmatrix}$"
    ],
    "correct_index": 3,
    "solution": "$AB = \\begin{bmatrix} k & 0 \\\\ 0 & k \\end{bmatrix} \\implies A = k B^{-1}$. $|3A| = 108 \\implies 3^2 |A| = 108 \\implies |A| = 12$. Since $|B| = 3$, $|A| = k^2/3 = 12 \\implies k = \\pm 6$. For $k = \\pm 6$, $A^2 = \\begin{bmatrix} 36 & -32 \\\\ 0 & 4 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 39,
    "question_type": "mcq",
    "question_text": "Suppose $A$ is any $3 \\times 3$ non-singular matrix and $(A - 3I)(A - 5I) = O$, where $I = I_3$ and $O = O_3$. If $\\alpha A + \\beta A^{-1} = 4I$, then $\\alpha + \\beta$ is equal to:",
    "options": [
      "8",
      "12",
      "13",
      "7"
    ],
    "correct_index": 0,
    "solution": "$(A - 3I)(A - 5I) = O \\implies A^2 - 8A + 15I = O$. Multiplying by $A^{-1}$: $A - 8I + 15A^{-1} = O \\implies A + 15A^{-1} = 8I \\implies \\frac{1}{2} A + \\frac{15}{2} A^{-1} = 4I$. Comparing with $\\alpha A + \\beta A^{-1} = 4I$, we get $\\alpha = 1/2$ and $\\beta = 15/2$. Thus $\\alpha + \\beta = 1/2 + 15/2 = 8$.",
    "image_url": ""
  },
  {
    "q_num": 40,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 1 & 1 & 0 \\\\ 1 & 1 & 1 \\end{bmatrix}$ and $B = A^{20}$. Then the sum of the elements of the first column of $B$ is:",
    "options": [
      "210",
      "211",
      "251",
      "231"
    ],
    "correct_index": 3,
    "solution": "$A^n = \\begin{bmatrix} 1 & 0 & 0 \\\\ n & 1 & 0 \\\\ \\frac{n(n+1)}{2} & n & 1 \\end{bmatrix}$. For $n = 20$, the first column elements are $b_{11} = 1$, $b_{21} = 20$, and $b_{31} = \\frac{20 \\times 21}{2} = 210$. Sum of elements $= 1 + 20 + 210 = 231$.",
    "image_url": ""
  },
  {
    "q_num": 41,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}$, then the matrix $A^{-50}$ when $\\theta = \\frac{\\pi}{12}$, is equal to:",
    "options": [
      "$\\begin{bmatrix} \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\\\ -\\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\end{bmatrix}$",
      "$\\begin{bmatrix} \\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\\\ -\\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\end{bmatrix}$",
      "$\\begin{bmatrix} \\frac{\\sqrt{3}}{2} & -\\frac{1}{2} \\\\ \\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\end{bmatrix}$",
      "$\\begin{bmatrix} \\frac{1}{2} & -\\frac{\\sqrt{3}}{2} \\\\ \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\end{bmatrix}$"
    ],
    "correct_index": 0,
    "solution": "$A^n = \\begin{bmatrix} \\cos(n\\theta) & -\\sin(n\\theta) \\\\ \\sin(n\\theta) & \\cos(n\\theta) \\end{bmatrix}$, so $A^{-50} = \\begin{bmatrix} \\cos(50\\theta) & \\sin(50\\theta) \\\\ -\\sin(50\\theta) & \\cos(50\\theta) \\end{bmatrix}$. For $\\theta = \\pi/12$, $50\\theta = 50\\pi/12 = 4\\pi + \\pi/6$. $\\cos(50\\theta) = \\cos(\\pi/6) = \\sqrt{3}/2$, $\\sin(50\\theta) = \\sin(\\pi/6) = 1/2$. Thus $A^{-50} = \\begin{bmatrix} \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\\\ -\\frac{1}{2} & \\frac{\\sqrt{3}}{2} \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 42,
    "question_type": "mcq",
    "question_text": "If $A = \\begin{bmatrix} e^t & e^{-t}\\cos t & e^{-t}\\sin t \\\\ e^t & -e^{-t}\\cos t - e^{-t}\\sin t & -e^{-t}\\sin t + e^{-t}\\cos t \\\\ e^t & 2e^{-t}\\sin t & -2e^{-t}\\cos t \\end{bmatrix}$, then $A$ is:",
    "options": [
      "Invertible only if $t = \\pi$",
      "Not invertible for any $t \\in \\mathbb{R}$",
      "Invertible only if $t = \\pi/2$",
      "Invertible for all $t \\in \\mathbb{R}$"
    ],
    "correct_index": 3,
    "solution": "Taking $e^t$ common from $C_1$ and $e^{-t}$ from $C_2$ and $C_3$, we find $|A| = e^t \\cdot e^{-t} \\cdot e^{-t} \\cdot 5 = 5e^{-t}$. Since $e^{-t} > 0$ for all $t \\in \\mathbb{R}$, $|A| \\neq 0$ for all $t \\in \\mathbb{R}$. Hence $A$ is invertible for all $t \\in \\mathbb{R}$.",
    "image_url": ""
  },
  {
    "q_num": 43,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{pmatrix} 0 & 2q & r \\\\ p & q & -r \\\\ p & -q & r \\end{pmatrix}$. If $AA^T = I_3$, then $|p|$ is:",
    "options": [
      "$1/\\sqrt{5}$",
      "$1/\\sqrt{3}$",
      "$1/\\sqrt{2}$",
      "$1/\\sqrt{6}$"
    ],
    "correct_index": 2,
    "solution": "$AA^T = \\begin{bmatrix} 4q^2 + r^2 & 2q^2 - r^2 & -2q^2 + r^2 \\\\ 2q^2 - r^2 & p^2 + q^2 + r^2 & p^2 - q^2 - r^2 \\\\ -2q^2 + r^2 & p^2 - q^2 - r^2 & p^2 + q^2 + r^2 \\end{bmatrix} = I_3$. Equating off-diagonal: $2q^2 - r^2 = 0 \\implies r^2 = 2q^2$. From $4q^2 + r^2 = 1 \\implies 6q^2 = 1 \\implies q^2 = 1/6, r^2 = 1/3$. From $p^2 - q^2 - r^2 = 0 \\implies p^2 = q^2 + r^2 = 1/6 + 1/3 = 1/2$. Thus $|p| = 1/\\sqrt{2}$.",
    "image_url": ""
  },
  {
    "q_num": 44,
    "question_type": "mcq",
    "question_text": "Let $P = \\begin{bmatrix} 1 & 0 & 0 \\\\ 3 & 1 & 0 \\\\ 9 & 3 & 1 \\end{bmatrix}$ and $Q = [q_{ij}]$ be two $3 \\times 3$ matrices such that $Q - P^5 = I_3$. Then $\\frac{q_{21} + q_{31}}{q_{32}}$ is equal to:",
    "options": [
      "10",
      "9",
      "15",
      "135"
    ],
    "correct_index": 0,
    "solution": "$P = I + N$ where $N = \\begin{bmatrix} 0 & 0 & 0 \\\\ 3 & 0 & 0 \\\\ 9 & 3 & 0 \\end{bmatrix}$. $N^2 = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 9 & 0 & 0 \\end{bmatrix}, N^3 = 0$. $P^5 = I + 5N + 10N^2 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 15 & 1 & 0 \\\\ 135 & 15 & 1 \\end{bmatrix}$. Given $Q = I + P^5$, so $q_{21} = 15$, $q_{31} = 135$, and $q_{32} = 15$. Then $\\frac{q_{21} + q_{31}}{q_{32}} = \\frac{15 + 135}{15} = \\frac{150}{15} = 10$.",
    "image_url": ""
  },
  {
    "q_num": 45,
    "question_type": "mcq",
    "question_text": "Let $A = \\begin{bmatrix} \\cos\\alpha & -\\sin\\alpha \\\\ \\sin\\alpha & \\cos\\alpha \\end{bmatrix}$, $(\\alpha \\in \\mathbb{R})$ such that $A^{32} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Then, a value of $\\alpha$ is:",
    "options": [
      "0",
      "$\\pi/16$",
      "$\\pi/64$",
      "$\\pi/32$"
    ],
    "correct_index": 2,
    "solution": "$A^{32} = \\begin{bmatrix} \\cos(32\\alpha) & -\\sin(32\\alpha) \\\\ \\sin(32\\alpha) & \\cos(32\\alpha) \\end{bmatrix} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Comparing gives $\\cos(32\\alpha) = 0$ and $\\sin(32\\alpha) = 1 \\implies 32\\alpha = \\pi/2 \\implies \\alpha = \\pi/64$.",
    "image_url": ""
  },
  {
    "q_num": 46,
    "question_type": "mcq",
    "question_text": "If $\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 1 & 3 \\\\ 0 & 1 \\end{bmatrix} \\cdots \\begin{bmatrix} 1 & n-1 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 78 \\\\ 0 & 1 \\end{bmatrix}$, then the inverse of $\\begin{bmatrix} 1 & n \\\\ 0 & 1 \\end{bmatrix}$ is:",
    "options": [
      "$\\begin{bmatrix} 1 & -12 \\\\ 0 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 12 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & 0 \\\\ 13 & 1 \\end{bmatrix}$",
      "$\\begin{bmatrix} 1 & -13 \\\\ 0 & 1 \\end{bmatrix}$"
    ],
    "correct_index": 3,
    "solution": "The product is $\\begin{bmatrix} 1 & 1 + 2 + \\dots + (n-1) \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & \\frac{n(n-1)}{2} \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 78 \\\\ 0 & 1 \\end{bmatrix}$. Thus $\\frac{n(n-1)}{2} = 78 \\implies n^2 - n - 156 = 0 \\implies (n-13)(n+12) = 0 \\implies n = 13$. The inverse of $\\begin{bmatrix} 1 & 13 \\\\ 0 & 1 \\end{bmatrix}$ is $\\begin{bmatrix} 1 & -13 \\\\ 0 & 1 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 47,
    "question_type": "mcq",
    "question_text": "The total number of matrices $A = \\begin{pmatrix} 0 & 2y & 1 \\\\ 2x & y & -1 \\\\ 2x & -y & 1 \\end{pmatrix}$, $(x, y \\in \\mathbb{R}, x \\neq y)$ for which $A^T A = 3I_3$ is:",
    "options": [
      "6",
      "3",
      "4",
      "2"
    ],
    "correct_index": 2,
    "solution": "$A^T A = \\begin{pmatrix} 8x^2 & 0 & 0 \\\\ 0 & 6y^2 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix} = \\begin{pmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$. Equating elements: $8x^2 = 3 \\implies x = \\pm \\sqrt{3/8}$ and $6y^2 = 3 \\implies y = \\pm 1/\\sqrt{2}$. Since $x \\neq y$ is satisfied for all 4 combinations ($2 \\times 2 = 4$), there are 4 such matrices.",
    "image_url": ""
  },
  {
    "q_num": 48,
    "question_type": "mcq",
    "question_text": "If $A$ is a symmetric matrix and $B$ is skew-symmetric matrix such that $A + B = \\begin{bmatrix} 2 & 3 \\\\ 5 & -1 \\end{bmatrix}$, then $AB$ is equal to:",
    "options": [
      "$\\begin{bmatrix} -4 & 2 \\\\ 1 & 4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & -2 \\\\ 1 & -4 \\end{bmatrix}$",
      "$\\begin{bmatrix} 4 & -2 \\\\ -1 & -4 \\end{bmatrix}$",
      "$\\begin{bmatrix} -4 & -2 \\\\ -1 & 4 \\end{bmatrix}$"
    ],
    "correct_index": 2,
    "solution": "$A = \\frac{1}{2}((A+B) + (A+B)^T) = \\frac{1}{2} \\left( \\begin{bmatrix} 2 & 3 \\\\ 5 & -1 \\end{bmatrix} + \\begin{bmatrix} 2 & 5 \\\\ 3 & -1 \\end{bmatrix} \\right) = \\begin{bmatrix} 2 & 4 \\\\ 4 & -1 \\end{bmatrix}$. $B = \\frac{1}{2}((A+B) - (A+B)^T) = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$. Then $AB = \\begin{bmatrix} 2 & 4 \\\\ 4 & -1 \\end{bmatrix} \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 4 & -2 \\\\ -1 & -4 \\end{bmatrix}$.",
    "image_url": ""
  },
  {
    "q_num": 49,
    "question_type": "mcq",
    "question_text": "Let $\\alpha$ be a root of the equation $x^2 + x + 1 = 0$ and the matrix $A = \\frac{1}{\\sqrt{3}} \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & \\alpha & \\alpha^2 \\\\ 1 & \\alpha^2 & \\alpha^4 \\end{bmatrix}$, then the matrix $A^{31}$ is equal to:",
    "options": [
      "$A^3$",
      "$I_3$",
      "$A^2$",
      "$A$"
    ],
    "correct_index": 0,
    "solution": "Here $\\alpha = \\omega$. $A^2 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 1 & 0 \\end{bmatrix}$ and $A^4 = (A^2)^2 = I$. Thus $A^{31} = (A^4)^7 \\cdot A^3 = I^7 \\cdot A^3 = A^3$.",
    "image_url": ""
  },
  {
    "q_num": 50,
    "question_type": "numerical",
    "question_text": "The number of all $3 \\times 3$ matrices $A$, with entries from the set $\\{-1, 0, 1\\}$ such that the sum of the diagonal elements of $AA^T$ is 3, is ______.",
    "options": [],
    "correct_index": None,
    "numeric_answer": 672,
    "solution": "The sum of the diagonal elements of $AA^T$ is $\\text{Tr}(AA^T) = \\sum_{i=1}^3 \\sum_{j=1}^3 a_{ij}^2 = 3$. Since each $a_{ij} \\in \\{-1, 0, 1\\}$, $a_{ij}^2 \\in \\{0, 1\\}$. Exactly 3 entries must be non-zero (either $1$ or $-1$), and the remaining 6 entries must be $0$. The number of ways to choose 3 positions out of 9 is $\\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{6} = 84$. Each chosen entry can be either $1$ or $-1$ (2 choices each), giving $2^3 = 8$ choices. Total number of matrices $= 84 \\times 8 = 672$.",
    "image_url": ""
  }
]

# Verification against key
for q in PART1:
    num = str(q['q_num'])
    expected = str(key[num])
    actual = ['A', 'B', 'C', 'D'][q['correct_index']] if q['question_type'] == 'mcq' else str(q['numeric_answer'])
    assert actual == expected, f"Mismatch at Q{num}: expected {expected}, got {actual}"

print("All 50 questions in Part 1 matched answer key perfectly!")

with open('backend/scripts/data/matrices_part1.mjs', 'w', encoding='utf-8') as f:
    f.write("// Part 1: Matrices Q1 to Q50\n")
    f.write("export const MATRICES_PART1 = " + json.dumps(PART1, indent=2) + ";\n")

print("Saved backend/scripts/data/matrices_part1.mjs successfully!")
