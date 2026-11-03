export const reasoningBatch2 = [
  {
    question_number: 26,
    question_text: "The statement (p → q) → [(~p → q) → q] is",
    options: [
      "A tautology",
      "Equivalent to ~p → q",
      "Equivalent to p → ~q",
      "A fallacy"
    ],
    correct_index: 0,
    solution: "(~p → q) → q ≡ ~(p ∨ q) ∨ q ≡ (~p ∧ ~q) ∨ q ≡ (~p ∨ q) ∧ (~q ∨ q) ≡ (~p ∨ q) ≡ p → q. Thus (p → q) → (p → q) ≡ T. Hence it is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 27,
    question_text: "The proposition (~p) ∨ (p ∧ ~q) is equivalent to",
    options: [
      "p → ~q",
      "p ∧ ~q",
      "~p",
      "none"
    ],
    correct_index: 0,
    solution: "(~p) ∨ (p ∧ ~q) = (~p ∨ p) ∧ (~p ∨ ~q) = T ∧ (~p ∨ ~q) = ~p ∨ ~q ≡ p → ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 28,
    question_text: "The contrapositive of the statement 'If two numbers are not equal, then their squares are not equal', is",
    options: [
      "If the squares of two numbers are equal, then the numbers are not equal",
      "If the squares of two numbers are not equal, then the numbers are equal",
      "If the squares of two numbers are not equal, then the numbers are not equal",
      "If the squares of two numbers are equal, then the numbers are equal"
    ],
    correct_index: 3,
    solution: "Statement is ~p → ~q. Contrapositive is ~(~q) → ~(~p) ≡ q → p: 'If the squares of two numbers are equal, then the numbers are equal'.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 29,
    question_text: "The Boolean expression ~(p ∨ q) ∨ (~p ∧ q) is equivalent to",
    options: [
      "q",
      "~p",
      "p",
      "~q"
    ],
    correct_index: 1,
    solution: "~(p ∨ q) ∨ (~p ∧ q) = (~p ∧ ~q) ∨ (~p ∧ q) = ~p ∧ (~q ∨ q) = ~p ∧ T = ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 30,
    question_text: "If (p ∧ ~q) ∧ (p ∧ r) → ~p ∨ q is false, then the truth values of p, q and r are respectively",
    options: [
      "T, F, F",
      "F, T, T",
      "T, F, T",
      "F, F, F"
    ],
    correct_index: 2,
    solution: "A conditional X → Y is false if and only if X is true and Y is false. Here Y = ~p ∨ q is false ⇒ ~p is F (so p is T) and q is F. X = (p ∧ ~q) ∧ (p ∧ r) is true ⇒ p is T, ~q is T, r is T. Thus the truth values of p, q, r are T, F, T.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 31,
    question_text: "If (p ∧ ~q) ∧ (p ∧ r) → ~p ∨ q is false, then the truth values of p, q and r are respectively",
    options: [
      "T, T, F",
      "T, F, T",
      "F, F, F",
      "T, T, T"
    ],
    correct_index: 1,
    solution: "As the truth table for (p ∧ ~q) ∧ (p ∧ r) → ~p ∨ q shows it is false, the only possible truth values of (p, q, r) are (T, F, T).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 32,
    question_text: "If p ⇒ (~p ∨ q) is false, then the truth values of p and q are, respectively",
    options: [
      "F, F",
      "T, F",
      "F, T",
      "T, T"
    ],
    correct_index: 1,
    solution: "p ⇒ (~p ∨ q) is false only when p is true and (~p ∨ q) is false. Since p is true, ~p is false, which requires q to be false. Hence p is True and q is False.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 33,
    question_text: "If the Boolean expression (p ⊕ q) ∧ (~p ⊙ q) is equivalent to p ∧ q, where ⊕, ⊙ ∈ {∧, ∨}, then the ordered pair (⊕, ⊙) is",
    options: [
      "(∨, ∧)",
      "(∧, ∧)",
      "(∨, ∨)",
      "(∧, ∨)"
    ],
    correct_index: 3,
    solution: "Testing (⊕, ⊙) = (∧, ∨): (p ∧ q) ∧ (~p ∨ q) = [(p ∧ q) ∧ ~p] ∨ [(p ∧ q) ∧ q] = F ∨ (p ∧ q) = p ∧ q. Hence (⊕, ⊙) is (∧, ∨).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 34,
    question_text: "The logical statement [~(p ∨ q) ∨ (~p ∧ q)] ∧ (q ∧ ~r) is equivalent to",
    options: [
      "(~p ∧ ~q) ∧ r",
      "(~p ∧ ~r) ∧ q",
      "(~p ∧ ~q) ∨ r",
      "~p ∨ ~q"
    ],
    correct_index: 1,
    solution: "[~(p ∨ q) ∨ (~p ∧ q)] ∧ (q ∧ ~r) = [(~p ∧ ~q) ∨ (~p ∧ q)] ∧ (q ∧ ~r) = [~p ∧ (~q ∨ q)] ∧ (q ∧ ~r) = ~p ∧ (q ∧ ~r) = (~p ∧ ~r) ∧ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 35,
    question_text: "Consider the statement: \"P(n) : n² - n + 41 is prime\". Then which one of the following is true?",
    options: [
      "P(3) is false but P(5) is true",
      "Both P(3) and P(5) are false",
      "Both P(3) and P(5) are true",
      "P(5) is false but P(3) is true"
    ],
    correct_index: 2,
    solution: "P(3) = 3² - 3 + 41 = 9 - 3 + 41 = 47, which is prime. P(5) = 5² - 5 + 41 = 25 - 5 + 41 = 61, which is prime. Hence both P(3) and P(5) are true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 36,
    question_text: "Consider the following three statements:\nP : 5 is a prime number\nQ : 7 is a factor of 192\nR : LCM of 5 and 7 is 35\nThen the truth value of which one of the following statements is true?",
    options: [
      "P ∨ (~Q ∧ R)",
      "(~P ∧ Q) ∨ (~R)",
      "(~P) ∨ (Q ∧ R)",
      "(P ∧ ~Q) ∧ (~R)"
    ],
    correct_index: 0,
    solution: "P is True (5 is prime). Q is False (192 is not divisible by 7). R is True (LCM of 5 and 7 is 35). Thus P ∨ (~Q ∧ R) = T ∨ (T ∧ T) = T ∨ T = True.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 37,
    question_text: "If q is false and (p ∧ q) ↔ r is true, then which one of the following statements is a tautology?",
    options: [
      "(p ∨ r) → (p ∧ r)",
      "(p ∧ r) → (p ∨ r)",
      "p ∨ r",
      "p ∧ r"
    ],
    correct_index: 1,
    solution: "q is false ⇒ p ∧ q is false. Since (p ∧ q) ↔ r is true, r is false. Option (B): (p ∧ r) → (p ∨ r). Since r is false, p ∧ r is false. A conditional with false antecedent (F → X) is always True. Hence it is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 38,
    question_text: "Contrapositive of the statement \"If two numbers are not equal, then their squares are not equal\" is :",
    options: [
      "If the squares of two numbers are not equal, then the numbers are equal.",
      "If the squares of two numbers are equal, then the numbers are not equal.",
      "If the squares of two numbers are equal, then the numbers are equal.",
      "If the squares of two numbers are not equal, then the numbers are not equal."
    ],
    correct_index: 2,
    solution: "The contrapositive of \"If A then B\" is \"If ~B then ~A\". Hence the contrapositive is: \"If squares of two numbers are equal, then the two numbers are equal\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 39,
    question_text: "The Boolean expression ((p ∧ q) ∨ (p ∨ ~q)) ∧ (~p ∧ ~q) is equivalent to",
    options: [
      "p ∧ (~q)",
      "(~p) ∧ (~q)",
      "p ∨ (~q)",
      "~p ∨ q"
    ],
    correct_index: 1,
    solution: "((p ∧ q) ∨ (p ∨ ~q)) ∧ (~p ∧ ~q) = (p ∨ ~q) ∧ (~p ∧ ~q) = (~p ∧ ~q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 40,
    question_text: "The expression ~(~p → q) is logically equivalent to",
    options: [
      "p ∧ q",
      "~p ∧ ~q",
      "~p ∧ q",
      "p ∧ ~q"
    ],
    correct_index: 1,
    solution: "~(~p → q) ≡ ~(~(~p) ∨ q) ≡ ~(p ∨ q) ≡ ~p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 41,
    question_text: "The contrapositive of the statement \"If you are born in India, then you are a citizen of India\", is",
    options: [
      "If you are not born in India, then you are not a citizen of India.",
      "If you are a citizen of India, then you are born in India.",
      "If you are born in India, then you are not a citizen of India.",
      "If you are not a citizen of India, then you are not born in India."
    ],
    correct_index: 3,
    solution: "Contrapositive of p → q is ~q → ~p: \"If you are not a citizen of India, then you are not born in India\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 42,
    question_text: "Which one of the following statements is not a tautology?",
    options: [
      "(p ∨ q) → (p ∨ ~q)",
      "(p ∧ q) → (p ∨ q)",
      "p → (p ∨ q)",
      "(p ∧ q) → p"
    ],
    correct_index: 0,
    solution: "p → q is false iff p is true and q is false. When p is false and q is true, (p ∨ q) is true but (p ∨ ~q) is false, making (p ∨ q) → (p ∨ ~q) false. Hence it is not a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 43,
    question_text: "For any two statements p and q, the negation of the expression p ∨ (~p ∧ q) is",
    options: [
      "~p ∨ ~q",
      "p ∧ ~q",
      "~p ∧ ~q",
      "p ∨ ~q"
    ],
    correct_index: 2,
    solution: "p ∨ (~p ∧ q) = (p ∨ ~p) ∧ (p ∨ q) = T ∧ (p ∨ q) = p ∨ q. Negation of p ∨ q is ~(p ∨ q) ≡ ~p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 44,
    question_text: "If p → (q ∨ r) is False, then the truth values of p, q, r are respectively, (where T is True and F is False)",
    options: [
      "T, F, F",
      "F, T, T",
      "F, F, F",
      "T, T, F"
    ],
    correct_index: 0,
    solution: "p → (q ∨ r) is False only when p is True and (q ∨ r) is False. (q ∨ r) is False only when both q and r are False. Hence p : True, q : False, r : False.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 45,
    question_text: "Which one of the following Boolean expressions is a tautology?",
    options: [
      "(p ∨ q) ∧ (p ∨ ~q)",
      "(p ∧ q) ∨ (p ∧ ~q)",
      "(p ∨ q) ∧ (~p ∨ ~q)",
      "(p ∨ q) ∨ (p ∨ ~q)"
    ],
    correct_index: 3,
    solution: "(p ∨ q) ∨ (p ∨ ~q) = p ∨ (q ∨ ~q) = p ∨ T = T (a tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 46,
    question_text: "The negation of the Boolean expression ~s ∨ (~r ∧ s) is equivalent to",
    options: [
      "s ∨ r",
      "s ∧ r",
      "~s ∨ r",
      "~s ∧ ~r"
    ],
    correct_index: 1,
    solution: "~(~s ∨ (~r ∧ s)) = s ∧ ~(~r ∧ s) = s ∧ (r ∨ ~s) = (s ∧ r) ∨ (s ∧ ~s) = (s ∧ r) ∨ F = s ∧ r.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 47,
    question_text: "If the truth value of the statement p → (~q ∨ r) is false (F), then the truth values of the statements p, q, r are respectively",
    options: [
      "T, F, F",
      "T, F, T",
      "T, T, F",
      "F, T, T"
    ],
    correct_index: 2,
    solution: "p → (~q ∨ r) is false only when p is true and (~q ∨ r) is false. For (~q ∨ r) to be false, ~q must be false (so q is true) and r must be false. Thus p : True, q : True, r : False.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 48,
    question_text: "The Boolean expression ~(p ⇒ (~q)) is equivalent to",
    options: [
      "(~p) ⇒ q",
      "q ⇒ ~p",
      "p ∨ q",
      "p ∧ q"
    ],
    correct_index: 3,
    solution: "p ⇒ (~q) ≡ ~p ∨ ~q. Its negation is ~(~p ∨ ~q) ≡ p ∧ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 49,
    question_text: "For two statements p and q, the logical statement (p → q) ∧ (q → ~p) is equivalent to",
    options: [
      "p",
      "q",
      "~p",
      "~q"
    ],
    correct_index: 2,
    solution: "(p → q) ∧ (q → ~p) ≡ (~p ∨ q) ∧ (~q ∨ ~p) ≡ ~p ∨ (q ∧ ~q) ≡ ~p ∨ F ≡ ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 50,
    question_text: "Let A, B, C and D be four non-empty sets. The contrapositive statement of \"If A ⊆ B and B ⊆ D, then A ⊆ C\" is",
    options: [
      "If A ⊈ C, then A ⊆ B and B ⊆ D",
      "If A ⊆ C, then B ⊆ A and D ⊆ B",
      "If A ⊈ C, then A ⊈ B and B ⊆ D",
      "If A ⊈ C, then A ⊈ B or B ⊈ D"
    ],
    correct_index: 3,
    solution: "Let P = (A ⊆ B ∧ B ⊆ D) and Q = (A ⊆ C). The statement is P → Q. Its contrapositive is ~Q → ~P ≡ (A ⊈ C) → (A ⊈ B ∨ B ⊈ D): \"If A ⊈ C, then A ⊈ B or B ⊈ D\".",
    marks: 4,
    difficulty: "medium"
  }
];

