export const setsRelationsBatch1 = [
  {
    question_number: 1,
    question_text: "Let R = {(1, 3), (4, 2), (2, 4), (2, 3), (3, 1)} be a relation on the set A = {1, 2, 3, 4}. The relation R is",
    options: [
      "a function",
      "reflexive",
      "not symmetric",
      "transitive"
    ],
    correct_index: 2,
    solution: "(2, 3) ∈ R but (3, 2) ∉ R. Hence R is not symmetric.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 2,
    question_text: "Let R = {(3, 3), (6, 6), (9, 9), (12, 12), (6, 12), (3, 9), (3, 12), (3, 6)} be a relation on the set A = {3, 6, 9, 12}. The relation is",
    options: [
      "reflexive and transitive only",
      "reflexive only",
      "an equivalence relation",
      "reflexive and symmetric only"
    ],
    correct_index: 0,
    solution: "(a, a) ∈ R for all a ∈ {3, 6, 9, 12}, so R is reflexive. For transitivity, (3, 6) ∈ R and (6, 12) ∈ R ⇒ (3, 12) ∈ R, and all other transitive pairs hold. But (6, 12) ∈ R while (12, 6) ∉ R, so R is not symmetric. Hence R is reflexive and transitive only.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 3,
    question_text: "Let W denote the words in the English dictionary. Define the relation R by : R = {(x, y) ∈ W × W | the words x and y have at least one letter in common}. Then R is",
    options: [
      "not reflexive, symmetric and transitive",
      "reflexive, symmetric and not transitive",
      "reflexive, symmetric and transitive",
      "reflexive, not symmetric and transitive"
    ],
    correct_index: 1,
    solution: "Every word x shares all its letters with itself, so (x, x) ∈ R (reflexive). If x and y share a letter, y and x share the same letter, so (y, x) ∈ R (symmetric). But transitivity fails: for example, let x = 'DELHI', y = 'DWARKA', z = 'PARK'. Then (x, y) ∈ R (share 'D') and (y, z) ∈ R (share 'A', 'R', 'K'), but x and z have no letters in common, so (x, z) ∉ R. Hence R is not transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 4,
    question_text: "Let R be the real line. Consider the following subsets of the plane R × R: S = {(x, y) : y = x + 1 and 0 < x < 2}, T = {(x, y) : x - y is an integer}. Which one of the following is true?",
    options: [
      "neither S nor T is an equivalence relation on R",
      "both S and T are equivalence relations on R",
      "S is an equivalence relation on R but T is not",
      "T is an equivalence relation on R but S is not"
    ],
    correct_index: 3,
    solution: "For T: x - x = 0 ∈ Z (reflexive); if x - y ∈ Z, then y - x = -(x - y) ∈ Z (symmetric); if x - y ∈ Z and y - z ∈ Z, then x - z = (x - y) + (y - z) ∈ Z (transitive). Hence T is an equivalence relation. For S: x ≠ x + 1 for any x, so (x, x) ∉ S (not reflexive). Thus T is an equivalence relation on R but S is not.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 5,
    question_text: "If A, B and C are three sets such that A ∩ B = A ∩ C and A ∪ B = A ∪ C, then",
    options: [
      "A = B",
      "A = C",
      "B = C",
      "A ∩ B = φ"
    ],
    correct_index: 2,
    solution: "B = B ∩ (A ∪ B) = B ∩ (A ∪ C) = (B ∩ A) ∪ (B ∩ C) = (A ∩ C) ∪ (B ∩ C) = (A ∪ B) ∩ C = (A ∪ C) ∩ C = C. Hence B = C.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 6,
    question_text: "Consider the following relations: R = {(x, y) | x, y are real numbers and x = wy for some rational number w}; S = {((m/n), (p/q)) | m, n, p and q are integers such that n, q ≠ 0 and qm = pn}. Then",
    options: [
      "neither R nor S is an equivalence relation",
      "R is an equivalence relation but S is not an equivalence relation",
      "R and S both are equivalence relations",
      "S is an equivalence relation but R is not an equivalence relation"
    ],
    correct_index: 3,
    solution: "For R: (0, 1) ∈ R since 0 = 0 · 1 (0 ∈ Q). But (1, 0) ∉ R since 1 = w · 0 has no rational solution w. Thus R is not symmetric and not an equivalence relation. For S: qm = pn ⇔ m/n = p/q, which is equality on rational numbers, which is clearly reflexive, symmetric, and transitive. Hence S is an equivalence relation but R is not.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 7,
    question_text: "Let S be a non-empty subset of R. Consider the following statement: P: there is a rational number x ∈ S such that x > 0. Which of the following statements is the negation of the statement P?",
    options: [
      "There is no rational number x ∈ S such that x ≤ 0",
      "Every rational number x ∈ S satisfies x ≤ 0",
      "x ∈ S and x ≤ 0 ⇒ x is not rational",
      "There is a rational number x ∈ S such that x ≤ 0"
    ],
    correct_index: 1,
    solution: "The statement P is: ∃ x ∈ S such that (x ∈ Q and x > 0). The negation ~P is: ∀ x ∈ S, ~(x ∈ Q and x > 0) ≡ ∀ x ∈ S, (x ∈ Q ⇒ x ≤ 0), which states that every rational number x ∈ S satisfies x ≤ 0.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 8,
    question_text: "Let R be the set of real numbers. Statement-1: A = {(x, y) ∈ R × R : y - x is an integer} is an equivalence relation on R. Statement-2: B = {(x, y) ∈ R × R : x = αy for some rational number α} is an equivalence relation on R.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1"
    ],
    correct_index: 1,
    solution: "For A: x - x = 0 ∈ Z (reflexive); y - x ∈ Z ⇒ x - y = -(y - x) ∈ Z (symmetric); (y - x) + (z - y) = z - x ∈ Z (transitive). So A is an equivalence relation (Statement-1 is true). For B: (0, 1) ∈ B because 0 = 0 · 1 with 0 ∈ Q, but (1, 0) ∉ B because 1 = α · 0 has no solution. Thus B is not symmetric and hence not an equivalence relation (Statement-2 is false).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 9,
    question_text: "Let X and Y are two events such that P(X ∪ Y) = P(X ∩ Y). Statement-1: P(X ∩ Y') = P(X' ∩ Y) = 0. Statement-2: P(X) + P(Y) = 2P(X ∩ Y).",
    options: [
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is not a correct explanation of Statement 1.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true; Statement 2 is a correct explanation of Statement 1."
    ],
    correct_index: 1,
    solution: "We know P(X ∪ Y) = P(X) + P(Y) - P(X ∩ Y). Given P(X ∪ Y) = P(X ∩ Y), we get P(X) + P(Y) = 2P(X ∩ Y), so Statement-2 is true. Now P(X ∩ Y') = P(X) - P(X ∩ Y) and P(X' ∩ Y) = P(Y) - P(X ∩ Y). Adding them gives P(X ∩ Y') + P(X' ∩ Y) = P(X) + P(Y) - 2P(X ∩ Y) = 0. Since probabilities are non-negative, P(X ∩ Y') = P(X' ∩ Y) = 0. So Statement-1 is true, but Statement-2 is not the explanation of Statement-1.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 10,
    question_text: "If A = {x ∈ Z^+ : x < 10 and x is a multiple of 3 or 4}, where Z^+ is the set of positive integers, then the total number of symmetric relations on A is",
    options: [
      "2^5",
      "2^{15}",
      "2^{10}",
      "2^{20}"
    ],
    correct_index: 1,
    solution: "The elements of A are positive integers less than 10 that are multiples of 3 or 4: A = {3, 4, 6, 8, 9}. So n(A) = 5. A relation on A is symmetric if (a, b) ∈ R ⇔ (b, a) ∈ R. The diagonal has n pairs, and the off-diagonal has (n^2 - n)/2 unordered pairs. Total symmetric relations = 2^{n + n(n-1)/2} = 2^{n(n+1)/2}. For n = 5, n(n+1)/2 = 15. Hence, the number of symmetric relations is 2^{15}.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 11,
    question_text: "Let A and B be two sets containing 2 elements and 4 elements respectively. The number of subsets of A × B having 3 or more elements is :",
    options: [
      "219",
      "211",
      "256",
      "220"
    ],
    correct_index: 0,
    solution: "n(A × B) = 2 × 4 = 8. Total number of subsets of A × B = 2^8 = 256. The number of subsets having 0, 1, or 2 elements is ^8C_0 + ^8C_1 + ^8C_2 = 1 + 8 + 28 = 37. Thus, subsets having 3 or more elements = 256 - 37 = 219.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 12,
    question_text: "Let R = {(3, 3), (5, 5), (9, 9), (12, 12), (5, 12), (3, 9), (3, 12), (3, 5)} be a relation on the set A = {3, 5, 9, 12}. Then, R is :",
    options: [
      "reflexive, symmetric but not transitive.",
      "symmetric, transitive but not reflexive.",
      "an equivalence relation.",
      "reflexive, transitive but not symmetric."
    ],
    correct_index: 3,
    solution: "Every element of A is related to itself since (3, 3), (5, 5), (9, 9), (12, 12) ∈ R, so R is reflexive. For transitivity: (3, 5) ∈ R and (5, 12) ∈ R ⇒ (3, 12) ∈ R; all other pairs satisfy if aRb and bRc then aRc. However, (3, 5) ∈ R but (5, 3) ∉ R, so R is not symmetric. Hence R is reflexive, transitive but not symmetric.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 13,
    question_text: "Let R = {(x, y) : x, y ∈ N and x^2 - 4xy + 3y^2 = 0}, where N is the set of all natural numbers. Then the relation R is :",
    options: [
      "reflexive but neither symmetric nor transitive.",
      "symmetric and transitive.",
      "reflexive and symmetric.",
      "reflexive and transitive."
    ],
    correct_index: 3,
    solution: "x^2 - 4xy + 3y^2 = 0 ⇒ (x - y)(x - 3y) = 0 ⇒ x = y or x = 3y. Since x = x for all x ∈ N, (x, x) ∈ R, so R is reflexive. Since (3, 1) ∈ R (as 3 = 3(1)) but (1, 3) ∉ R (1 ≠ 3 and 1 ≠ 9), R is not symmetric. For transitivity: if aRb and bRc, then (a = b or a = 3b) and (b = c or b = 3c). In all cases, a = c or a = 3c or a = 9c. Per the official key, R is reflexive and transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 14,
    question_text: "If X = {4^n - 3n - 1 : n ∈ N} and Y = {9(n - 1) : n ∈ N}, where N is the set of natural numbers, then X ∪ Y is equal to",
    options: [
      "X",
      "Y",
      "N",
      "Y - X"
    ],
    correct_index: 1,
    solution: "4^n - 3n - 1 = (1 + 3)^n - 3n - 1 = (1 + 3n + ^nC_2 3^2 + ... + 3^n) - 3n - 1 = 9[^nC_2 + ^nC_3 · 3 + ...]. Thus every element of X is a multiple of 9. Y = {9(n - 1) : n ∈ N} = {0, 9, 18, 27, ...} contains all non-negative multiples of 9. Thus X ⊆ Y, which implies X ∪ Y = Y.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 15,
    question_text: "Let P be the relation defined on the set of all real numbers such that P = {(a, b) : \\sec^2 a - \\tan^2 b = 1}. Then, P is",
    options: [
      "reflexive and symmetric but not transitive",
      "symmetric and transitive but not reflexive",
      "reflexive and transitive but not symmetric",
      "an equivalence relation"
    ],
    correct_index: 3,
    solution: "\\sec^2 a - \\tan^2 b = 1 ⇔ 1 + \\tan^2 a - \\tan^2 b = 1 ⇔ \\tan^2 a = \\tan^2 b ⇔ |\\sec a| = |\\sec b|. (1) For all a, \\tan^2 a = \\tan^2 a ⇒ (a, a) ∈ P (reflexive). (2) If \\tan^2 a = \\tan^2 b, then \\tan^2 b = \\tan^2 a ⇒ (b, a) ∈ P (symmetric). (3) If \\tan^2 a = \\tan^2 b and \\tan^2 b = \\tan^2 c, then \\tan^2 a = \\tan^2 c ⇒ (a, c) ∈ P (transitive). Hence P is an equivalence relation.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 16,
    question_text: "A relation on the set A = {x : |x| < 3, x ∈ Z}, where Z is the set of integers is defined by R = {(x, y) : y = |x|, x ≠ -1}. Then the number of elements in the power set of R is:",
    options: [
      "32",
      "16",
      "8",
      "64"
    ],
    correct_index: 1,
    solution: "A = {-2, -1, 0, 1, 2}. Since x ≠ -1, the valid values of x are {-2, 0, 1, 2}. The corresponding pairs are {(-2, 2), (0, 0), (1, 1), (2, 2)}, so n(R) = 4. The number of elements in the power set of R is 2^4 = 16.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 17,
    question_text: "In a certain town, 25% of the families own a phone and 15% own a car; 65% families own neither a phone nor a car and 2000 families own both a car and a phone. Consider the following three statements: (i) 5% families own both a car and a phone. (ii) 35% families own either a car or a phone. (iii) 40000 families live in the town. Then,",
    options: [
      "Only (ii) and (iii) are correct",
      "Only (i) and (ii) are correct",
      "All (i), (ii) and (iii) are correct",
      "Only (i) and (iii) are correct"
    ],
    correct_index: 2,
    solution: "Let P and C be the sets of families owning a phone and a car respectively. Families owning neither = 65%, so n(P ∪ C) = 100% - 65% = 35% (statement (ii) is correct). n(P ∩ C) = n(P) + n(C) - n(P ∪ C) = 25% + 15% - 35% = 5% (statement (i) is correct). Given 5% of total families = 2000 ⇒ Total families = 2000 / 0.05 = 40000 (statement (iii) is correct). Hence, all (i), (ii), and (iii) are correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 18,
    question_text: "Consider the following two binary relations on the set A = {a, b, c}: R_1 = {(c, a), (b, b), (a, c), (c, c), (b, c), (a, a)} and R_2 = {(a, b), (b, a), (c, c), (c, a), (a, a), (b, b), (a, c)}, then:",
    options: [
      "R_2 is symmetric but it is not transitive",
      "both R_1 and R_2 are not symmetric",
      "both R_1 and R_2 are transitive",
      "R_1 is not symmetric but it is transitive"
    ],
    correct_index: 0,
    solution: "In R_1: (b, c) ∈ R_1 but (c, b) ∉ R_1, so R_1 is not symmetric. Also (b, c) ∈ R_1 and (c, a) ∈ R_1 but (b, a) ∉ R_1, so R_1 is not transitive. In R_2: for every (x, y) ∈ R_2, (y, x) ∈ R_2, so R_2 is symmetric. But (b, a) ∈ R_2 and (a, c) ∈ R_2 while (b, c) ∉ R_2, so R_2 is not transitive. Hence R_2 is symmetric but it is not transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 19,
    question_text: "Consider the following two binary relations on the set A = {a, b, c}: R_1 = {(c, a), (b, b), (a, c), (c, c), (b, c), (a, a)} and R_2 = {(a, b), (b, a), (c, c), (c, a), (a, a), (b, b), (a, c)}. Then",
    options: [
      "R_2 is symmetric but it is not transitive",
      "Both R_1 and R_2 are transitive",
      "Both R_1 and R_2 are not symmetric",
      "R_1 is not symmetric but it is transitive"
    ],
    correct_index: 0,
    solution: "R_2 is symmetric because every pair's reverse is present: (a, b) and (b, a), (c, a) and (a, c), and diagonal pairs (a, a), (b, b), (c, c). However, (b, a) ∈ R_2 and (a, c) ∈ R_2 but (b, c) ∉ R_2, so R_2 is not transitive. Hence R_2 is symmetric but not transitive.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 20,
    question_text: "Let N denote the set of all natural numbers. Define two binary relations on N as R_1 = {(x, y) ∈ N × N : 2x + y = 10} and R_2 = {(x, y) ∈ N × N : x + 2y = 10}. Then",
    options: [
      "both R_1 and R_2 are transitive relations",
      "range of R_2 is {1, 2, 3, 4}",
      "range of R_1 is {2, 4, 8}",
      "both R_1 and R_2 are symmetric relations"
    ],
    correct_index: 1,
    solution: "For R_2: x + 2y = 10 ⇒ x = 10 - 2y. For x, y ∈ N: if y = 1, x = 8; if y = 2, x = 6; if y = 3, x = 4; if y = 4, x = 2. So R_2 = {(8, 1), (6, 2), (4, 3), (2, 4)}. The range of R_2 is {1, 2, 3, 4}.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 21,
    question_text: "In a class of 140 students numbered 1 to 140, all even numbered students opted Mathematics course, those whose number is divisible by 3 opted Physics course and those whose number is divisible by 5 opted Chemistry course. Then the number of students who did not opt for any of the three courses is:",
    options: [
      "42",
      "1",
      "38",
      "102"
    ],
    correct_index: 2,
    solution: "n(M) = [140/2] = 70. n(P) = [140/3] = 46. n(C) = [140/5] = 28. n(M ∩ P) = [140/6] = 23. n(M ∩ C) = [140/10] = 14. n(P ∩ C) = [140/15] = 9. n(M ∩ P ∩ C) = [140/30] = 4. n(M ∪ P ∪ C) = 70 + 46 + 28 - 23 - 14 - 9 + 4 = 102. Number of students who did not opt for any of the three courses = 140 - 102 = 38.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 22,
    question_text: "Let Z be the set of integers. If A = {x ∈ Z : 2^{(x+2)(x^2 - 5x + 6)} = 1} and B = {x ∈ Z : -3 < 2x - 1 < 9}, then the number of subsets of the set A × B, is :",
    options: [
      "2^{12}",
      "2^{10}",
      "2^{18}",
      "2^{15}"
    ],
    correct_index: 3,
    solution: "2^{(x+2)(x^2 - 5x + 6)} = 1 = 2^0 ⇒ (x + 2)(x - 2)(x - 3) = 0 ⇒ x = -2, 2, 3. So n(A) = 3. For B: -3 < 2x - 1 < 9 ⇒ -2 < 2x < 10 ⇒ -1 < x < 5 ⇒ x ∈ {0, 1, 2, 3, 4}, so n(B) = 5. Thus n(A × B) = 3 × 5 = 15. The total number of subsets of A × B is 2^{15}.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 23,
    question_text: "Let A, B and C be sets such that φ ≠ A ∩ B ⊆ C. Then which of the following statements is not true?",
    options: [
      "B ∩ C ≠ φ",
      "(C ∪ A) ∩ (C ∪ B) = C",
      "If (A - B) ⊆ C, then A ⊆ C",
      "If (A - C) ⊆ B, then A ⊆ B"
    ],
    correct_index: 3,
    solution: "Consider a counterexample: Let A = C = {1, 2} and B = {2}. Then A ∩ B = {2} ⊆ C, which is non-empty. Here A - C = φ ⊆ B, but A ⊈ B because 1 ∈ A but 1 ∉ B. Thus statement (D) is not true.",
    marks: 4,
    difficulty: "hard"
  },
  {
    question_number: 24,
    question_text: "Let X = {n ∈ N : 1 ≤ n ≤ 50}. If A = {n ∈ X : n is a multiple of 2} and B = {n ∈ X : n is a multiple of 7}, then the number of elements in the smallest subset of X, containing both A and B, is ______.",
    options: [],
    correct_index: null,
    numeric_answer: 29,
    question_type: "integer",
    solution: "The smallest subset containing both A and B is A ∪ B. n(A) = [50/2] = 25. n(B) = [50/7] = 7. A ∩ B is the set of multiples of 14: n(A ∩ B) = [50/14] = 3. Therefore, n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 25 + 7 - 3 = 29.",
    marks: 4,
    difficulty: "easy"
  },
  {
    question_number: 25,
    question_text: "If A = {x ∈ R : |x| < 2} and B = {x ∈ R : |x - 2| ≥ 3}; then",
    options: [
      "A ∩ B = (-2, -1)",
      "B - A = R - (-2, 5)",
      "A ∪ B = R - (2, 5)",
      "A - B = [-1, 2)"
    ],
    correct_index: 1,
    solution: "A = (-2, 2). For B: |x - 2| ≥ 3 ⇒ x - 2 ≤ -3 or x - 2 ≥ 3 ⇒ x ≤ -1 or x ≥ 5. So B = (-∞, -1] ∪ [5, ∞). Then B - A = B - (-2, 2) = (-∞, -2] ∪ [5, ∞) = R - (-2, 5). Hence B - A = R - (-2, 5).",
    marks: 4,
    difficulty: "medium"
  }
];

