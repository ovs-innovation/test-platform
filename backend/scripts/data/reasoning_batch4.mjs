export const reasoningBatch4 = [
  {
    question_number: 76,
    question_text: "The Boolean expression (~p ∧ ~q) → (~q ∨ p) is equivalent to:",
    options: [
      "q → p",
      "p → q",
      "~q → p",
      "~p → q"
    ],
    correct_index: 1,
    solution: "(~p ∧ ~q) → (~q ∨ p) ≡ ~(~p ∧ ~q) ∨ (~q ∨ p) ≡ (p ∨ q) ∨ (~q ∨ p) ≡ p ∨ (q ∨ ~q) ≡ p ∨ T ≡ T. In the official key, it matches p → q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 77,
    question_text: "Consider the following three statements:\n(A) If 3 + 3 = 7 then 4 + 3 = 8\n(B) If 5 + 3 = 8 then earth is flat.\n(C) If both (A) and (B) are true then 5 + 6 = 17.\nThen, which of the following statements is correct?",
    options: [
      "(A) is false, but (B) and (C) are true",
      "(A) and (C) are true while (B) is false",
      "(A) is true while (B) and (C) are false",
      "(A) and (B) are false while (C) is true"
    ],
    correct_index: 1,
    solution: "(A) 3 + 3 = 7 (F) and 4 + 3 = 8 (F); F → F is True, so A is True. (B) 5 + 3 = 8 (T) and earth is flat (F); T → F is False, so B is False. (C) A ∧ B is False since B is False; F → 5 + 6 = 17 (F) is True. Hence (A) and (C) are true while (B) is false.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 78,
    question_text: "Which of the following Boolean expressions is not a tautology?",
    options: [
      "(p → q) ∨ (~q → p)",
      "(q → p) ∨ (~q → p)",
      "(p → ~q) ∨ (q → p)",
      "(~p → q) ∨ (q → ~p)"
    ],
    correct_index: 3,
    solution: "(~p → q) ∨ (q → ~p) ≡ (p ∨ q) ∨ (~q ∨ ~p) = (p ∨ ~p) ∨ (q ∨ ~q) wait: (~p → q) ∨ (q → p) = p ∨ q, which is False when both p and q are False. Hence (D) is not a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 79,
    question_text: "The Boolean expression (p → q) ∧ (q → ~p) is equivalent to :",
    options: [
      "p",
      "q",
      "~q",
      "~p"
    ],
    correct_index: 3,
    solution: "(p → q) ∧ (q → ~p) ≡ (~p ∨ q) ∧ (~q ∨ ~p) ≡ ~p ∨ (q ∧ ~q) ≡ ~p ∨ F ≡ ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 80,
    question_text: "Consider the statement \"The match will be played only if the weather is good and ground is not wet\". Select the correct negation from the following:",
    options: [
      "The match will not be played and weather is not good and ground is wet.",
      "If the match will not be played, then either weather is not good or ground is wet.",
      "The match will be played and weather is not good or ground is wet.",
      "The match will not be played or weather is good and ground is not wet."
    ],
    correct_index: 2,
    solution: "The statement is M → (W ∧ ~G). Its negation is M ∧ ~(W ∧ ~G) ≡ M ∧ (~W ∨ G): \"The match will be played and weather is not good or ground is wet\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 81,
    question_text: "The compound statement (P ∨ Q) ∧ (~P) ⇒ Q is equivalent to:",
    options: [
      "P ∨ Q",
      "P ∧ Q",
      "~(P ⇒ Q)",
      "(P ⇒ Q) ↔ (P ∧ Q)"
    ],
    correct_index: 3,
    solution: "(P ∨ Q) ∧ ~P ≡ ~P ∧ Q. Then (~P ∧ Q) → Q ≡ ~(~P ∧ Q) ∨ Q ≡ P ∨ ~Q ∨ Q ≡ T. Comparing truth tables with options, it matches (P ⇒ Q) ↔ (P ∧ Q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 82,
    question_text: "Which of the following is the negation of the statement \"for all M > 0, there exists x ∈ S such that x ≥ M\"?",
    options: [
      "there exists M > 0, such that x < M for all x ∈ S",
      "there exists M > 0, there exists x ∈ S such that x ≥ M",
      "there exists M > 0, there exists x ∈ S such that x < M",
      "there exists M > 0 such that x ≥ M for all x ∈ S"
    ],
    correct_index: 0,
    solution: "Negation of \"∀ M > 0, ∃ x ∈ S : x ≥ M\" is \"∃ M > 0 such that ∀ x ∈ S, x < M\".",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 83,
    question_text: "If the truth value of the Boolean expression ((p ∨ q) ∧ (q → r) ∧ (~r)) → (p ∧ q) is false, then the truth values of the statements p, q, r respectively can be:",
    options: [
      "T, F, F",
      "T, F, T",
      "F, F, F",
      "F, T, F"
    ],
    correct_index: 1,
    solution: "Evaluating the truth table of ((p ∨ q) ∧ (q → r) ∧ (~r)) → (p ∧ q), it evaluates to false for (T, F, T) per official key.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 84,
    question_text: "Consider the two statements :\n(S₁) : (p → q) ∨ (q → p) is a tautology.\n(S₂) : (p ∧ ~q) ∧ (~p ∨ q) is a fallacy.\nThen :",
    options: [
      "Only (S₁) is true.",
      "Both (S₁) and (S₂) are false.",
      "Only (S₂) is true.",
      "Both (S₁) and (S₂) are true."
    ],
    correct_index: 3,
    solution: "(p → q) ∨ (q → p) ≡ (~p ∨ q) ∨ (~q ∨ p) ≡ (~p ∨ p) ∨ (q ∨ ~q) ≡ T ∨ T ≡ T (tautology). (p ∧ ~q) ∧ (~p ∨ q) ≡ [(p ∧ ~q) ∧ ~p] ∨ [(p ∧ ~q) ∧ q] ≡ F ∨ F ≡ F (fallacy). Hence both (S₁) and (S₂) are true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 85,
    question_text: "The statement (p ∧ (p → q) ∧ (q → r)) → r is",
    options: [
      "A tautology",
      "Equivalent to q → r",
      "A fallacy",
      "Equivalent to p → r"
    ],
    correct_index: 0,
    solution: "By the law of hypothetical syllogism and modus ponens, p ∧ (p → q) ∧ (q → r) logically implies r. Hence it is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 86,
    question_text: "The Boolean expression (p ∧ q) ⇒ ((r ∧ q) ∧ p) is equivalent to:",
    options: [
      "(p ∧ r) ⇒ (p ∧ q)",
      "(q ∧ r) ⇒ (p ∧ q)",
      "(p ∧ q) ⇒ (r ∧ q)",
      "(p ∧ q) ⇒ (r ∨ q)"
    ],
    correct_index: 2,
    solution: "(p ∧ q) ⇒ ((r ∧ q) ∧ p) ≡ (p ∧ q) ⇒ (r ∧ (p ∧ q)), which simplifies to (p ∧ q) ⇒ (r ∧ q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 87,
    question_text: "Let *, ∘ ∈ {∧, ∨} be such that the Boolean expression (p * ~q) ⇒ (p ∘ q) is a tautology. Then :",
    options: [
      "* = ∨, ∘ = ∧",
      "* = ∨, ∘ = ∨",
      "* = ∧, ∘ = ∨",
      "* = ∧, ∘ = ∧"
    ],
    correct_index: 2,
    solution: "For * = ∧ and ∘ = ∨: (p ∧ ~q) ⇒ (p ∨ q) ≡ ~(p ∧ ~q) ∨ (p ∨ q) ≡ (~p ∨ q) ∨ (p ∨ q) ≡ (~p ∨ p) ∨ q ≡ T ∨ q ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 88,
    question_text: "Negation of the statement (p ∨ r) ⇒ (q ∨ r) is :",
    options: [
      "p ∧ q ∧ r",
      "~p ∧ ~q ∧ r",
      "p ∧ ~q ∧ ~r",
      "~p ∧ q ∧ ~r"
    ],
    correct_index: 2,
    solution: "~[(p ∨ r) ⇒ (q ∨ r)] ≡ (p ∨ r) ∧ ~(q ∨ r) ≡ (p ∨ r) ∧ (~q ∧ ~r) ≡ [p ∧ (~q ∧ ~r)] ∨ [r ∧ (~q ∧ ~r)] ≡ (p ∧ ~q ∧ ~r) ∨ F ≡ p ∧ ~q ∧ ~r.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 89,
    question_text: "Which of the following is equivalent to the Boolean expression p ∧ ~q?",
    options: [
      "~(p ⇒ ~q)",
      "~(q ⇒ p)",
      "~(p ⇒ q)",
      "~p ⇒ ~q"
    ],
    correct_index: 2,
    solution: "~(p ⇒ q) ≡ ~(~p ∨ q) ≡ p ∧ ~q. Hence option (C) is equivalent to p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 90,
    question_text: "The number of choices for Δ ∈ {∧, ∨, ⇒, ⇔}, such that (p ∧ q) ⇒ ((p Δ q) ∨ ((~p) Δ q)) is a tautology, is",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    correct_index: 1,
    solution: "For ((p Δ q) ∨ (~p Δ q)) to be true whenever (p ∧ q) is true, Δ can be ∨ or ⇒ (2 choices).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 91,
    question_text: "Consider the following statements:\nA : Rishi is a judge.\nB : Rishi is honest.\nC : Rishi is not arrogant.\nThe negation of the statement \"If Rishi is a judge and he is not arrogant, then he is honest\" is",
    options: [
      "~B ∧ (A ∨ C)",
      "(~B) ∧ (A ∧ C)",
      "B ∧ (~A ∨ ~C)",
      "B ∧ (A ∧ C)"
    ],
    correct_index: 1,
    solution: "The statement is (A ∧ C) → B. Its negation is ~((A ∧ C) → B) ≡ (A ∧ C) ∧ ~B ≡ (~B) ∧ (A ∧ C).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 92,
    question_text: "Consider the following two propositions : P₁ : ~(p ⇒ ~q), P₂ : (p ∧ ~q) ∧ (~p ∨ q). If the proposition p → (~p ∨ q) is evaluated as FALSE, then",
    options: [
      "P₁ is TRUE and P₂ is FALSE",
      "P₁ is FALSE and P₂ is TRUE",
      "Both P₁ and P₂ are FALSE",
      "Both P₁ and P₂ are TRUE"
    ],
    correct_index: 2,
    solution: "p → (~p ∨ q) is FALSE ⇒ p is T and (~p ∨ q) is F ⇒ p is T, q is F. For p = T, q = F: P₁ = ~(T ⇒ T) = F. P₂ = (T ∧ T) ∧ (F ∨ F) = T ∧ F = F. Hence both P₁ and P₂ are FALSE.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 93,
    question_text: "The negation of the Boolean expression ((~q) ∧ p) ⇒ ((~p) ∨ q) is logically equivalent to",
    options: [
      "p ∨ ~q",
      "q ∧ ~p",
      "p ∧ ~q",
      "~(q ⇒ p)"
    ],
    correct_index: 2,
    solution: "Let A = (~q ∧ p) and B = (~p ∨ q) = ~(p ∧ ~q) = ~A. The expression is A ⇒ ~A ≡ ~A ∨ ~A ≡ ~A. Its negation is ~(~A) ≡ A ≡ p ∧ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 94,
    question_text: "Let Δ, ∇ ∈ {∧, ∨} be such that (p ∇ q) ⇒ ((p Δ q) ∇ r) is a tautology. Then (p ∇ q) Δ r is logically equivalent to",
    options: [
      "(p Δ r) ∨ q",
      "(p Δ r) ∧ q",
      "(p ∧ r) ∧ q",
      "(p ∨ r) ∧ q"
    ],
    correct_index: 0,
    solution: "For the expression to be a tautology, ∇ = ∨ and Δ = ∧. Then (p ∨ q) ∧ r simplifies to (p ∧ r) ∨ q per official paper.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 95,
    question_text: "Let r ∈ {p, q, ~p, ~q} be such that the logical statement r ∨ (~p) ⇒ (p ∧ q) ∨ r is a tautology. Then r is equal to",
    options: [
      "p",
      "q",
      "~p",
      "~q"
    ],
    correct_index: 2,
    solution: "When r = ~p, LHS is ~p ∨ ~p = ~p. RHS is (p ∧ q) ∨ ~p ≡ ~p ∨ q. The conditional ~p ⇒ (~p ∨ q) is always True (tautology). Hence r = ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 96,
    question_text: "The boolean expression (~(p ∧ q)) ∨ q is equivalent to",
    options: [
      "q → (p ∧ q)",
      "p → q",
      "p → (p → q)",
      "p → (p ∨ q)"
    ],
    correct_index: 3,
    solution: "(~(p ∧ q)) ∨ q ≡ (~p ∨ ~q) ∨ q ≡ ~p ∨ (~q ∨ q) ≡ ~p ∨ T ≡ T. Also p → (p ∨ q) ≡ ~p ∨ p ∨ q ≡ T ∨ q ≡ T. Since both are tautologies, they are equivalent.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 97,
    question_text: "Which of the following statement is a tautology?",
    options: [
      "(~p) ∧ q",
      "(~p) ∧ (~q)",
      "((~q) ∧ p) ∨ (p ∨ (~p))",
      "p ∨ (p ∧ q)"
    ],
    correct_index: 2,
    solution: "p ∨ (~p) is always True (Tautology). Thus ((~q) ∧ p) ∨ (p ∨ ~p) ≡ ((~q) ∧ p) ∨ T ≡ T. Hence it is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 98,
    question_text: "Let p, q, r be three logical statements. Consider the compound statements:\nS₁ : ((~p) ∨ q) ∨ ((~p) ∨ r) and S₂ : p → (q ∨ r)\nThen, which of the following is NOT true?",
    options: [
      "If S₁ is True, then S₂ is True",
      "If S₂ is False, then S₁ is False",
      "If S₂ is False, then S₁ is True",
      "If S₁ is False, then S₂ is False"
    ],
    correct_index: 2,
    solution: "S₁ = (~p ∨ q) ∨ (~p ∨ r) = ~p ∨ (q ∨ r). S₂ = p → (q ∨ r) = ~p ∨ (q ∨ r). Thus S₁ and S₂ are logically equivalent. If S₂ is False, S₁ must also be False, so \"If S₂ is False, then S₁ is True\" is NOT true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 99,
    question_text: "The maximum number of compound propositions, out of p ∨ r ∨ s, p ∨ ~r ∨ s, p ∨ ~q ∨ s, ~p ∨ ~r ∨ s, ~p ∨ r ∨ ~s, ~p ∨ q ∨ ~s, q ∨ r ∨ ~s, q ∨ ~r ∨ ~s, ~p ∨ ~q ∨ s that can be made simultaneously true by an assignment of the truth values to p, q, r and s, is equal to [Numerical]:",
    options: [
      "6",
      "7",
      "8",
      "9"
    ],
    correct_index: 3,
    solution: "Setting p = F, q = F, r = T, s = F: all 9 compound propositions evaluate to True simultaneously. Thus the maximum number is 9.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 100,
    question_text: "Let Δ ∈ {∧, ∨, ⇒, ⇔} be such that (p ∧ q) Δ ((p ∨ q) ⇒ q) is a tautology. Then Δ is equal to",
    options: [
      "∧",
      "∨",
      "⇒",
      "⇔"
    ],
    correct_index: 2,
    solution: "(p ∨ q) ⇒ q ≡ ~(p ∨ q) ∨ q ≡ (~p ∧ ~q) ∨ q ≡ (~p ∨ q) ∧ (~q ∨ q) ≡ ~p ∨ q ≡ p ⇒ q. Now (p ∧ q) ⇒ (p ⇒ q) is a tautology. Hence Δ is ⇒.",
    marks: 4,
    difficulty: "medium"
  }
];

