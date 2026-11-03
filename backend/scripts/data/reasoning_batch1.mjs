export const reasoningBatch1 = [
  {
    question_number: 1,
    question_text: "The statement p → (q → p) is equivalent to",
    options: [
      "p → (p ∧ q)",
      "p → (p ∨ q)",
      "p → (p ↔ q)",
      "p → (p → q)"
    ],
    correct_index: 1,
    solution: "p → (q → p) ≡ ~p ∨ (q → p) ≡ ~p ∨ (~q ∨ p). Since p ∨ ~p is always true, ≡ ~p ∨ p ∨ ~q ≡ T ∨ ~q, which is logically equivalent to p → (p ∨ q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 2,
    question_text: "Let p be the statement \"x is an irrational number\", q be the statement \"y is a transcendental number\", and r be the statement \"x is a rational number iff y is a transcendental number\".\nStatement-1: r is equivalent to either q or p.\nStatement-2: r is equivalent to ~(p ↔ ~q).",
    options: [
      "Statement-1 is false, Statement-2 is true",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false"
    ],
    correct_index: 3,
    solution: "Given statement r = ~p ↔ q. Statement-1: r₁ = (p ∧ ~q) ∨ (~p ∧ q). Statement-2: r₂ = ~(p ↔ ~q) = (p ∧ q) ∨ (~q ∧ ~p). From the truth table of r, r₁ and r₂, r = r₁. Hence Statement-1 is true and Statement-2 is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 3,
    question_text: "Statement-1: ~(p ↔ ~q) is equivalent to p ↔ q.\nStatement-2: ~(p ↔ ~q) is a tautology.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false",
      "Statement-1 is false, Statement-2 is true"
    ],
    correct_index: 2,
    solution: "~(p ↔ ~q) ≡ p ↔ q. Thus Statement-1 is true. But p ↔ q can be false, so it is not a tautology, meaning Statement-2 is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 4,
    question_text: "Consider the following statements:\nP : Suman is brilliant\nQ : Suman is rich\nR : Suman is honest\nThe negation of the statement \"Suman is brilliant and dishonest if and only if Suman is rich\" can be expressed as",
    options: [
      "~(Q ↔ (P ∧ ~R))",
      "~Q ↔ ~P ∧ R",
      "(P ∧ ~R) ↔ Q",
      "~P ∧ (Q ↔ ~R)"
    ],
    correct_index: 0,
    solution: "The given statement is (P ∧ ~R) ↔ Q. The negation of this statement is ~{(P ∧ ~R) ↔ Q} ≡ ~{Q ↔ (P ∧ ~R)}.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 5,
    question_text: "The negation of the statement \"If I become a teacher, then I will open a school\" is",
    options: [
      "I will become a teacher and I will not open a school",
      "Either I will not become a teacher or I will not open a school",
      "Neither I will become a teacher nor I will open a school",
      "I will not become a teacher or I will open a school"
    ],
    correct_index: 0,
    solution: "The statement is of the form p → q. The negation ~(p → q) ≡ ~(~p ∨ q) ≡ p ∧ ~q. Hence, \"I will become a teacher and I will not open a school\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 6,
    question_text: "The Statement that is TRUE among the following is",
    options: [
      "The contrapositive of 3x + 2 = 8 ⇒ x = 2 is x ≠ 2 ⇒ 3x + 2 ≠ 8.",
      "The converse of tan x = 0 ⇒ x = 0 is x ≠ 0 ⇒ tan x = 0.",
      "p ⇒ q is equivalent to p ∨ ~q.",
      "p ∨ q and p ∧ q have the same truth table."
    ],
    correct_index: 0,
    solution: "The contrapositive of p ⇒ q is ~q ⇒ ~p. Here, p is 3x + 2 = 8 and q is x = 2. So the contrapositive is x ≠ 2 ⇒ 3x + 2 ≠ 8. Thus option (A) is true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 7,
    question_text: "The logically equivalent proposition of p ↔ q is",
    options: [
      "(p → q) ∧ (q → p)",
      "p ∧ q",
      "(p ∨ q) ∨ (p ∧ q)",
      "(p ∨ q) → (q ∨ p)"
    ],
    correct_index: 0,
    solution: "By definition of biconditional, p ↔ q is logically equivalent to (p → q) ∧ (q → p).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 8,
    question_text: "Let p and q be two Statements. Amongst the following, the Statement that is equivalent to p → q is",
    options: [
      "p ∧ ~q",
      "~p ∨ q",
      "p ∧ q",
      "p ∨ ~q"
    ],
    correct_index: 1,
    solution: "p → q is logically equivalent to ~p ∨ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 9,
    question_text: "Let p and q denote the following statements:\np : The sun is shining\nq : I shall play tennis in the afternoon\nThe negation of the statement \"If the sun is shining then I shall play tennis in the afternoon\" is",
    options: [
      "~q → ~p",
      "q → ~p",
      "p ∧ ~q",
      "q ∧ ~p"
    ],
    correct_index: 2,
    solution: "The given statement is p → q. The negation of p → q is ~(p → q) ≡ p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 10,
    question_text: "Consider :\nStatement - I: (p ∧ ~q) ∧ (~p ∧ q) is a fallacy.\nStatement - II: (p → q) ↔ (~q → ~p) is a tautology.",
    options: [
      "Statement - I is true; Statement - II is false.",
      "Statement - I is false; Statement - II is true.",
      "Statement - I is true; Statement - II is true; Statement - II is a correct explanation for Statement - I.",
      "Statement - I is true; Statement - II is true; Statement - II is not a correct explanation for Statement - I."
    ],
    correct_index: 3,
    solution: "(p ∧ ~q) ∧ (~p ∧ q) = (p ∧ ~p) ∧ (q ∧ ~q) = F ∧ F = F, so Statement - I is a fallacy (true). (p → q) ↔ (~q → ~p) is a tautology because any implication is logically equivalent to its contrapositive, so Statement - II is true. However, Statement - II is not the explanation for Statement - I. Hence (D).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 11,
    question_text: "Statement-1: The statement A → (B → A) is equivalent to A → (A ∨ B).\nStatement-2: The statement ~[(A ∧ B) → (~A ∨ B)] is a Tautology.",
    options: [
      "Statement-1 is false; Statement-2 is true.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is not correct explanation for Statement-1.",
      "Statement-1 is true; Statement-2 is false.",
      "Statement-1 is true; Statement-2 is true; Statement-2 is the correct explanation for Statement-1."
    ],
    correct_index: 2,
    solution: "A → (B → A) ≡ ~A ∨ (~B ∨ A) ≡ (~A ∨ A) ∨ ~B ≡ T ∨ ~B ≡ T. Also A → (A ∨ B) ≡ ~A ∨ A ∨ B ≡ T ∨ B ≡ T. Since both are always true, they are equivalent. Thus Statement-1 is true. (A ∧ B) → (~A ∨ B) ≡ ~(A ∧ B) ∨ (~A ∨ B) ≡ ~A ∨ ~B ∨ ~A ∨ B ≡ ~A ∨ (~B ∨ B) ≡ ~A ∨ T ≡ T. The negation of a tautology is a fallacy (contradiction), not a tautology. Thus Statement-2 is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 12,
    question_text: "The statement p → (q → p) is equivalent to :",
    options: [
      "p → (p ↔ q)",
      "p → (p ∨ q)",
      "p → (p → q)",
      "p → (p ∧ q)"
    ],
    correct_index: 1,
    solution: "The truth values of p → (q → p) and p → (p ∨ q) are identical (both are tautologies). Hence, p → (q → p) is equivalent to p → (p ∨ q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 13,
    question_text: "For integers m and n, both greater than 1, consider the following three statements :\nP: m divides n\nQ : m divides n²\nR: m is prime, then",
    options: [
      "P ∧ Q → R is false",
      "P ∧ R → Q",
      "Q → R",
      "Q → P"
    ],
    correct_index: 0,
    solution: "For m = 4, n = 8: 4 divides 8 and 4 divides 64, but 4 is not prime. Hence P ∧ Q → R is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 14,
    question_text: "Let p and q be any two logical statements and r : p → (~p ∨ q). If r has a truth value F, then the truth values of p and q are respectively:",
    options: [
      "F, F",
      "T, T",
      "T, F",
      "F, T"
    ],
    correct_index: 2,
    solution: "r : p → (~p ∨ q) has truth value F. In implication, p → X is F only when p is T and X is F. Thus p is T. Then ~p ∨ q must be F. Since p is T, ~p is F, so q must also be F. Hence p is T, q is F.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 15,
    question_text: "The statement ~(p ↔ q) is",
    options: [
      "A tautology",
      "A fallacy",
      "Equivalent to ~p ↔ q",
      "Equivalent to p ↔ q"
    ],
    correct_index: 2,
    solution: "The negation of biconditional ~(p ↔ q) is logically equivalent to ~p ↔ q (or p ↔ ~q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 16,
    question_text: "The contrapositive of the statement \"I go to school if it does not rain\" is",
    options: [
      "If it rains, I go to school.",
      "If it rains, I do not go to school.",
      "If I go to school, it rains.",
      "If I do not go to school, it rains."
    ],
    correct_index: 1,
    solution: "Let p = \"It does not rain\" and q = \"I go to school\". The statement is p → q. The official key gives (B) \"If it rains, I do not go to school\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 17,
    question_text: "The proposition ~(p ∨ ~q) ∨ ~(p ∨ q) is logically equivalent to:",
    options: [
      "p",
      "q",
      "~p",
      "~q"
    ],
    correct_index: 2,
    solution: "~(p ∨ ~q) ∨ ~(p ∨ q) = (~p ∧ q) ∨ (~p ∧ ~q) = ~p ∧ (q ∨ ~q) = ~p ∧ T = ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 18,
    question_text: "Let p, q, r denote arbitrary statements. Then the logically equivalent of the statement p → (q ∨ r) is:",
    options: [
      "(p ∨ q) → r",
      "(p → q) ∨ (p → r)",
      "(p → ~q) ∧ (p → r)",
      "(p → q) ∧ (p → r)"
    ],
    correct_index: 1,
    solution: "p → (q ∨ r) ≡ ~p ∨ (q ∨ r) ≡ (~p ∨ q) ∨ (~p ∨ r) ≡ (p → q) ∨ (p → r).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 19,
    question_text: "The contrapositive of the statement \"If I am not feeling well, then I will go to the doctor\" is",
    options: [
      "If I will go to the doctor, then I am not feeling well.",
      "If I am feeling well, then I will not go to the doctor.",
      "If I will not go to the doctor, then I am feeling well.",
      "If I will go to the doctor, then I am feeling well."
    ],
    correct_index: 2,
    solution: "Statement: ~p → q. Contrapositive: ~q → ~(~p) ≡ ~q → p: \"If I will not go to the doctor, then I am feeling well\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 20,
    question_text: "The negation of ~s ∨ (~r ∧ s) is equivalent to",
    options: [
      "s ∧ r",
      "s ∨ r",
      "s ∧ (r ∧ ~s)",
      "s ∨ (r ∨ ~s)"
    ],
    correct_index: 0,
    solution: "~(~s ∨ (~r ∧ s)) = s ∧ ~(~r ∧ s) = s ∧ (r ∨ ~s) = (s ∧ r) ∨ (s ∧ ~s) = (s ∧ r) ∨ F = s ∧ r.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 21,
    question_text: "The contrapositive of the statement \"If it is raining, then I will not come\", is",
    options: [
      "If I will come, then it is not raining.",
      "If I will come, then it is raining.",
      "If I will not come, then it is raining.",
      "If I will not come, then it is not raining."
    ],
    correct_index: 0,
    solution: "Contrapositive of p → ~q is ~(~q) → ~p ≡ q → ~p: \"If I will come, then it is not raining\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 22,
    question_text: "Consider the following statements:\nP: Suman is brilliant\nQ: Suman is rich\nR: Suman is honest\nThe negation of the statement, \"Suman is brilliant and dishonest if and only if Suman is rich\" can be equivalently expressed as",
    options: [
      "~Q ↔ (P ∨ ~R)",
      "Q ↔ (~P ∨ R)",
      "~Q ↔ (P ∧ ~R)",
      "Q ↔ (~P ∧ R)"
    ],
    correct_index: 2,
    solution: "The statement is (P ∧ ~R) ↔ Q. The negation is ~((P ∧ ~R) ↔ Q) ≡ ~Q ↔ (P ∧ ~R).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 23,
    question_text: "The Boolean Expression (p ∧ ~q) ∨ q ∨ (~p ∧ q) is equivalent to",
    options: [
      "p ∨ q",
      "p ∨ ~q",
      "p ∧ q",
      "~p ∧ q"
    ],
    correct_index: 0,
    solution: "(p ∧ ~q) ∨ q ∨ (~p ∧ q) = (p ∧ ~q) ∨ [q ∧ (1 ∨ ~p)] = (p ∧ ~q) ∨ q = (p ∨ q) ∧ (~q ∨ q) = (p ∨ q) ∧ T = p ∨ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 24,
    question_text: "Consider the following two statements:\nP : If 7 is an odd number, then 7 is divisible by 2.\nQ : If 7 is a prime number, then 7 is an odd number.\nIf V₁ is the truth value of the contrapositive of P and V₂ is the truth value of contrapositive of Q, then the ordered pair (V₁, V₂) equals",
    options: [
      "(F, T)",
      "(F, F)",
      "(T, F)",
      "(T, T)"
    ],
    correct_index: 0,
    solution: "In P: \"7 is an odd number\" (T) → \"7 is divisible by 2\" (F). T → F is False. Contrapositive has the same truth value, so V₁ = F. In Q: \"7 is a prime number\" (T) → \"7 is an odd number\" (T). T → T is True, so V₂ = T. Thus (V₁, V₂) = (F, T).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 25,
    question_text: "The contrapositive of the following statement, \"If the side of a square doubles, then its area increases four times\", is",
    options: [
      "If the area of a square increases four times, then its side is not doubled.",
      "If the area of a square increases four times, then its side is doubled.",
      "If the area of a square does not increase four times, then its side is not doubled.",
      "If the side of a square is not doubled, then its area does not increase four times."
    ],
    correct_index: 2,
    solution: "Contrapositive of p → q is ~q → ~p: \"If the area of a square does not increase four times, then its side is not doubled\".",
    marks: 4,
    difficulty: "medium"
  }
];

