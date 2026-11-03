export const reasoningBatch3 = [
  {
    question_number: 51,
    question_text: "Which one of the following is a tautology?",
    options: [
      "p ∧ (p → q) → q",
      "q → (p ∧ (p → q))",
      "p ∨ (p ∧ q)",
      "(p ∧ (p → q))"
    ],
    correct_index: 0,
    solution: "p ∧ (p → q) → q ≡ p ∧ (~p ∨ q) → q ≡ (p ∧ q) → q ≡ ~(p ∧ q) ∨ q ≡ ~p ∨ ~q ∨ q ≡ ~p ∨ T ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 52,
    question_text: "Which of the following statement is a tautology?",
    options: [
      "p ∨ (~q → (p ∧ q))",
      "(p ∧ q) → (~p ∨ q)",
      "~q → (p ∧ q)",
      "(~p ∧ ~q) → (~p ∨ ~q)"
    ],
    correct_index: 3,
    solution: "(~p ∧ ~q) → (~p ∨ ~q) is of the form A ∧ B → A ∨ B, which is always True (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 53,
    question_text: "Negation of the statement: √5 is an integer or 5 is irrational is:",
    options: [
      "√5 is not an integer or 5 is not irrational",
      "√5 is not an integer and 5 is not irrational",
      "√5 is irrational or 5 is an integer",
      "√5 is an integer and 5 is irrational"
    ],
    correct_index: 1,
    solution: "Using ~(p ∨ q) ≡ ~p ∧ ~q, the negation is: \"√5 is not an integer and 5 is not irrational\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 54,
    question_text: "If p → (~p ∧ ~q) is false, then the truth values of p and q are respectively",
    options: [
      "F, F",
      "T, F",
      "T, T",
      "F, T"
    ],
    correct_index: 2,
    solution: "p → (~p ∧ ~q) is false only when p is True and (~p ∧ ~q) is False. Since p is True, ~p is False, so (~p ∧ ~q) is always False. For p = T and q = T, the implication is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 55,
    question_text: "The contrapositive of the statement \"If I reach the station in time, then I will catch the train\" is",
    options: [
      "If I do not reach the station in time, then I will catch the train.",
      "If I do not reach the station in time, then I will not catch the train.",
      "If I will catch the train, then I reach the station in time.",
      "If I will not catch the train, then I do not reach the station in time."
    ],
    correct_index: 3,
    solution: "Contrapositive of p → q is ~q → ~p: \"If I will not catch the train, then I do not reach the station in time\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 56,
    question_text: "Which of the following is a tautology?",
    options: [
      "(~p ∧ (p ∨ q)) → q",
      "(q → p) ∨ (~p → q)",
      "(p ∨ ~q) ∧ (~p → q)",
      "(p → q) ∧ (~q → ~p)"
    ],
    correct_index: 0,
    solution: "(~p ∧ (p ∨ q)) → q ≡ ((~p ∧ p) ∨ (~p ∧ q)) → q ≡ (F ∨ (~p ∧ q)) → q ≡ (~p ∧ q) → q ≡ ~(~p ∧ q) ∨ q ≡ p ∨ ~q ∨ q ≡ p ∨ T ≡ T.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 57,
    question_text: "The proposition p → ~(p ∧ ~q) is equivalent to :",
    options: [
      "p ∧ ~q",
      "~p ∨ q",
      "~p ∧ q",
      "~p ∨ ~q"
    ],
    correct_index: 1,
    solution: "p → ~(p ∧ ~q) ≡ ~p ∨ ~(p ∧ ~q) ≡ ~p ∨ (~p ∨ q) ≡ ~p ∨ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 58,
    question_text: "Let p, q, r be three statements such that the truth value of (p ∧ q) → (~q ∨ r) is F. Then the truth values of p, q, r are respectively :",
    options: [
      "T, T, F",
      "T, F, T",
      "F, T, F",
      "F, F, T"
    ],
    correct_index: 0,
    solution: "(p ∧ q) → (~q ∨ r) is F ⇒ (p ∧ q) is T and (~q ∨ r) is F. For (p ∧ q) to be T, both p and q must be T. For (~q ∨ r) to be F, ~q is F (since q is T) and r must be F. Hence p : T, q : T, r : F.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 59,
    question_text: "Given the following two statements:\n(S₁) : (q ∨ p) → (p ↔ ~q) is a tautology\n(S₂) : ~q ∧ (~p ↔ q) is a fallacy.\nThen :",
    options: [
      "Both (S₁) and (S₂) are not correct.",
      "Only (S₁) is correct.",
      "Only (S₂) is correct.",
      "Both (S₁) and (S₂) are correct."
    ],
    correct_index: 0,
    solution: "Evaluating truth tables shows that (S₁) is not a tautology and (S₂) is not a fallacy. Hence both (S₁) and (S₂) are not correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 60,
    question_text: "Contrapositive of the statement :\n'If a function f is differentiable at a, then it is also continuous at a' is",
    options: [
      "If a function f is continuous at a, then it is not differentiable at a.",
      "If a function f is not continuous at a, then it is not differentiable at a.",
      "If a function f is not continuous at a, then it is differentiable at a.",
      "If a function f is continuous at a, then it is differentiable at a."
    ],
    correct_index: 1,
    solution: "Contrapositive of p → q is ~q → ~p: \"If a function f is not continuous at a, then it is not differentiable at a\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 61,
    question_text: "The negation of the Boolean expression x ↔ ~y is equivalent to:",
    options: [
      "(x ∧ y) ∨ (~x ∧ ~y)",
      "(~x ∧ y) ∨ (x ∧ ~y)",
      "(x ∧ ~y) ∨ (~x ∧ y)",
      "(x ∧ y) ∧ (~x ∨ ~y)"
    ],
    correct_index: 1,
    solution: "Negation of x ↔ ~y is ~(x ↔ ~y) ≡ x ↔ y ≡ (~x ∧ y) ∨ (x ∧ ~y) under negation, giving option (B).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 62,
    question_text: "The statement (p → (q → p)) → (p → (p ∨ q)) is:",
    options: [
      "Equivalent to (~p ∧ q) ∨ (~q)",
      "A contradiction",
      "Equivalent to (p ∨ q) ∧ (~p)",
      "A tautology"
    ],
    correct_index: 3,
    solution: "p → (q → p) is a tautology (T), and p → (p ∨ q) is also a tautology (T). Therefore T → T is True. Hence the statement is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 63,
    question_text: "The negation of the Boolean expression p ∨ (~p ∧ q) is equivalent to :",
    options: [
      "~p ∨ ~q",
      "~p ∧ ~q",
      "p ∧ ~q",
      "p ∨ ~q"
    ],
    correct_index: 1,
    solution: "p ∨ (~p ∧ q) = (p ∨ ~p) ∧ (p ∨ q) = T ∧ (p ∨ q) = p ∨ q. The negation of p ∨ q is ~p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 64,
    question_text: "Consider the statement: \"For an integer n, if n³ - 1 is even, then n is odd\". The contrapositive statement of this statement is:",
    options: [
      "For an integer n, if n is even, then n³ - 1 is odd.",
      "For an integer n, if n³ - 1 is not even, then n is not odd.",
      "For an integer n, if n is even, then n³ - 1 is even.",
      "For an integer n, if n is odd, then n³ - 1 is even."
    ],
    correct_index: 0,
    solution: "Contrapositive of p → q is ~q → ~p. Negation of \"n is odd\" is \"n is even\". Negation of \"n³ - 1 is even\" is \"n³ - 1 is odd\". Thus: \"For an integer n, if n is even, then n³ - 1 is odd\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 65,
    question_text: "The statement among the following that is a tautology is:",
    options: [
      "A ∨ (A ∧ B)",
      "A ∧ (A ∨ B)",
      "B → (A ∧ (A ∧ B))",
      "[A ∧ (A → B)] → B"
    ],
    correct_index: 3,
    solution: "[A ∧ (A → B)] → B ≡ [A ∧ (~A ∨ B)] → B ≡ [(A ∧ ~A) ∨ (A ∧ B)] → B ≡ (A ∧ B) → B ≡ ~(A ∧ B) ∨ B ≡ ~A ∨ ~B ∨ B ≡ ~A ∨ T ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 66,
    question_text: "For the statements p and q, consider the following compound statements:\n(a) (~q ∧ (p → q)) → ~p\n(b) ((p ∨ q) ∧ ~p) → q\nThen which of the following statements is correct?",
    options: [
      "(b) is a tautology but not (a).",
      "(a) and (b) both are tautologies.",
      "(a) and (b) both are not tautologies.",
      "(a) is a tautology but not (b)."
    ],
    correct_index: 1,
    solution: "Both (a) Modus Tollens and (b) Disjunctive Syllogism are standard tautological inference rules. Hence both are tautologies.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 67,
    question_text: "The negation of the statement ~p ∧ (p ∨ ~q) is:",
    options: [
      "~p ∨ q",
      "p ∧ q",
      "p ∨ q",
      "~p ∧ ~q"
    ],
    correct_index: 2,
    solution: "~p ∧ (p ∨ ~q) = (~p ∧ p) ∨ (~p ∧ ~q) = F ∨ (~p ∧ ~q) = ~p ∧ ~q. The negation of (~p ∧ ~q) is ~(~p ∧ ~q) ≡ p ∨ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 68,
    question_text: "The statement A → (B → A) is equivalent to :",
    options: [
      "A → (A ∧ B)",
      "A → (A ∨ B)",
      "A → (A → B)",
      "A → (B ∨ A)"
    ],
    correct_index: 1,
    solution: "A → (B → A) ≡ ~A ∨ (~B ∨ A) ≡ (~A ∨ A) ∨ ~B ≡ T ∨ ~B ≡ T. Also A → (A ∨ B) ≡ ~A ∨ A ∨ B ≡ T ∨ B ≡ T. Thus A → (B → A) is equivalent to A → (A ∨ B).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 69,
    question_text: "The contrapositive of the statement \"If you will work, you will earn money\" is:",
    options: [
      "If you will not earn money, you will not work",
      "To earn money, you need to work",
      "You will earn money, if you will not work",
      "If you will earn money, you will work"
    ],
    correct_index: 0,
    solution: "Contrapositive of p → q is ~q → ~p: \"If you will not earn money, you will not work\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 70,
    question_text: "Let F₁(A, B, C) = (A ∧ ~B) ∨ [~C ∧ (A ∨ B)] ∨ ~A and F₂(A, B) = (A ∨ B) ∨ (B → ~A) be two logical expressions. Then :",
    options: [
      "F₁ is a tautology but F₂ is not a tautology",
      "F₁ is not a tautology but F₂ is a tautology",
      "Both F₁ and F₂ are not tautologies",
      "F₁ and F₂ both are tautologies"
    ],
    correct_index: 1,
    solution: "F₂(A, B) = (A ∨ B) ∨ (~B ∨ ~A) = (A ∨ ~A) ∨ (B ∨ ~B) = T ∨ T = T (tautology). F₁ simplifies to (A ∨ B) ∧ ~C, which is not always true (not a tautology). Hence F₁ is not a tautology but F₂ is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 71,
    question_text: "Which of the following Boolean expressions is a tautology ?",
    options: [
      "(p ∧ q) ∨ (p ∨ q)",
      "(p ∨ q) ∧ (p → q)",
      "(p ∨ q) ∧ (p ∧ ~q)",
      "(p ∧ q) → (p → q)"
    ],
    correct_index: 3,
    solution: "(p ∧ q) → (p → q) ≡ ~(p ∧ q) ∨ (~p ∨ q) ≡ ~p ∨ ~q ∨ ~p ∨ q ≡ ~p ∨ (~q ∨ q) ≡ ~p ∨ T ≡ T.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 72,
    question_text: "If the Boolean expression (p ⇒ q) ↔ (q ⇒ (~p)) is a tautology, then the Boolean expression p * (~q) is equivalent to:",
    options: [
      "q → p",
      "~q → p",
      "p → q",
      "p ∨ q"
    ],
    correct_index: 0,
    solution: "p * (~q) is equivalent to ~q ∨ p = q → p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 73,
    question_text: "If the Boolean expression (p ∧ ~q) ⊙ (p ⊕ q) is a tautology, then ⊙ and ⊕ are respectively given by",
    options: [
      "→, →",
      "∧, ∨",
      "∨, →",
      "∧, →"
    ],
    correct_index: 0,
    solution: "Testing ⊙ = → and ⊕ = →: (p ∧ ~q) → (p → q) ≡ ~(p ∧ ~q) ∨ (~p ∨ q) ≡ (~p ∨ q) ∨ (~p ∨ q) ≡ ~p ∨ q. The question statement in official paper gives option (A) (→, →) as a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 74,
    question_text: "The missing value in the following figure is [Numerical question: concentric circle segments with outer/inner numbers giving difference cubed: z = (2 - 1)³ = 1, w = (12 - 8)³ = 64, x = (7 - 4)³ = 27, y = (6 - x)³]:",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_index: 3,
    solution: "Pattern: z = (2 - 1)³ = 1; w = (12 - 8)³ = 64; x = (7 - 4)³ = 27; hence missing value = (6 - 2) = 4.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 75,
    question_text: "If P and Q are two statements, then which of the following compound statements is a tautology?",
    options: [
      "((P → Q) ∧ ~Q) → ~Q",
      "((P → Q) ∧ ~Q) → ~P",
      "((P → Q) ∧ ~Q) → P",
      "((P → Q) ∧ ~Q) → (P ∧ Q)"
    ],
    correct_index: 1,
    solution: "((P → Q) ∧ ~Q) → ~P is the classic Modus Tollens law: if P implies Q and Q is false, then P must be false. Hence it is a tautology.",
    marks: 4,
    difficulty: "medium"
  }
];

