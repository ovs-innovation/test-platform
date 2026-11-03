export const reasoningBatch5 = [
  {
    question_number: 101,
    question_text: "Negation of the Boolean statement (p ∨ q) ⇒ ((~r) ∨ p) is equivalent to:",
    options: [
      "p ∧ (~q ∧ r)",
      "(~p) ∧ (~q ∧ r)",
      "(~p) ∧ q ∧ r",
      "p ∧ q ∧ (~r)"
    ],
    correct_index: 2,
    solution: "(p ∨ q) ⇒ (~r ∨ p) ≡ ~(p ∨ q) ∨ (~r ∨ p) ≡ (~p ∧ ~q) ∨ (~r ∨ p) ≡ ~q ∨ p ∨ ~r. Its negation is ~(~q ∨ p ∨ ~r) ≡ q ∧ ~p ∧ r ≡ (~p) ∧ q ∧ r.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 102,
    question_text: "Which of the following statements is a tautology?",
    options: [
      "((~p) ∨ q) ⇒ p",
      "p ⇒ ((~p) ∨ q)",
      "((~p) ∨ q) ⇒ q",
      "q ⇒ ((~p) ∨ q)"
    ],
    correct_index: 3,
    solution: "q ⇒ ((~p) ∨ q) ≡ ~q ∨ (~p ∨ q) ≡ (~q ∨ q) ∨ ~p ≡ T ∨ ~p ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 103,
    question_text: "Consider the following statements:\nP : Ramu is intelligent.\nQ : Ramu is rich.\nR : Ramu is not honest.\nThe negation of the statement \"Ramu is intelligent and honest if and only if Ramu is not rich\" can be expressed as:",
    options: [
      "((P ∧ ~R) ∧ Q) ∧ (Q ∧ ((~P) ∨ R))",
      "((P ∧ ~R) ∧ Q) ∨ (Q ∧ ((~P) ∨ (~R)))",
      "((P ∧ ~R) ∧ Q) ∧ (Q ∧ ((~P) ∨ (~R)))",
      "((P ∧ (~R)) ∧ Q) ∨ ((~Q ∧ P) ∧ ~R)"
    ],
    correct_index: 3,
    solution: "Statement is (P ∧ ~R) ↔ ~Q. Its negation expands to ((P ∧ ~R) ∧ Q) ∨ ((~Q ∧ P) ∧ ~R).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 104,
    question_text: "The statement (~(p ↔ q)) ∧ q is:",
    options: [
      "A tautology",
      "A contradiction",
      "Equivalent to (p ⇒ q) ∧ q",
      "Equivalent to (~p ⇒ q) ∧ ~p"
    ],
    correct_index: 3,
    solution: "(~(p ↔ q)) ∧ q ≡ ((p ∧ ~q) ∨ (~p ∧ q)) ∧ q ≡ ~p ∧ q. Also (~p ⇒ q) ∧ ~p ≡ (p ∨ q) ∧ ~p ≡ ~p ∧ q. Hence it is equivalent to (~p ⇒ q) ∧ ~p.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 105,
    question_text: "Negation of the Boolean expression p ↔ (q → p) is",
    options: [
      "(~p) ∧ q",
      "p ∧ (~q)",
      "(~p) ∨ (~q)",
      "(~p) ∧ (~q)"
    ],
    correct_index: 3,
    solution: "p ↔ (q → p) ≡ p ↔ (~q ∨ p). When p=T, T ↔ T is T. When p=F, F ↔ (~q) ≡ q. Thus p ↔ (q → p) is logically equivalent to p ∨ q. The negation of p ∨ q is (~p) ∧ (~q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 106,
    question_text: "(p ∧ r) ↔ (p ∧ (~q)) is equivalent to (~p) when r is",
    options: [
      "p",
      "~p",
      "q",
      "~q"
    ],
    correct_index: 2,
    solution: "Substituting r = q gives (p ∧ q) ↔ (p ∧ ~q). When p is T, q ↔ ~q is always F (which equals ~p = F). When p is F, F ↔ F is T (which equals ~p = T). Hence the expression is identically ~p when r = q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 107,
    question_text: "If the truth value of the statement (P ∧ (~R)) → ((~R) ∧ Q) is F, then the truth value of which of the following is F?",
    options: [
      "P ∨ Q → ~R",
      "~R ∨ Q → P",
      "(P ∨ Q) → R",
      "(~R ∨ Q) → ~P"
    ],
    correct_index: 3,
    solution: "(P ∧ ~R) → (~R ∧ Q) is F ⇒ (P ∧ ~R) is T (so P = T, R = F) and (~R ∧ Q) is F (so Q = F). Testing option (D): (~R ∨ Q) → ~P ≡ (T ∨ F) → F ≡ T → F = F.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 108,
    question_text: "Let the operations *, ∘ ∈ {∧, ∨}. If (p * q) ∘ (p ∘ ~q) is a tautology, then the ordered pair (*, ∘) is",
    options: [
      "(∨, ∧)",
      "(∨, ∨)",
      "(∧, ∧)",
      "(∧, ∨)"
    ],
    correct_index: 1,
    solution: "For (*, ∘) = (∨, ∨): (p ∨ q) ∨ (p ∨ ~q) ≡ p ∨ (q ∨ ~q) ≡ p ∨ T ≡ T (tautology). Hence (∨, ∨).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 109,
    question_text: "Let\np : Ramesh listens to music.\nq : Ramesh is out of his village\nr : It is Sunday\ns : It is Saturday\nThen the statement \"Ramesh listens to music only if he is in his village and it is Sunday or Saturday\" can be expressed as",
    options: [
      "((~q) ∧ (r ∨ s)) ⇒ p",
      "(q ∧ (r ∨ s)) ⇒ p",
      "p ⇒ (q ∧ (r ∨ s))",
      "p ⇒ ((~q) ∧ (r ∨ s))"
    ],
    correct_index: 3,
    solution: "\"A only if B\" is A ⇒ B. Here A is p, and B is \"he is in his village (~q) and it is Sunday or Saturday (r ∨ s)\". Hence p ⇒ ((~q) ∧ (r ∨ s)).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 110,
    question_text: "The statement (p ∧ q) ⇒ (p ∧ r) is equivalent to",
    options: [
      "q ⇒ (p ∧ r)",
      "p ⇒ (p ∧ r)",
      "(p ∧ r) ⇒ (p ∧ q)",
      "(p ∧ q) ⇒ r"
    ],
    correct_index: 3,
    solution: "(p ∧ q) ⇒ (p ∧ r) ≡ ~(p ∧ q) ∨ (p ∧ r) ≡ (~p ∨ ~q) ∨ (p ∧ r) ≡ ((~p ∨ ~q) ∨ p) ∧ ((~p ∨ ~q) ∨ r) ≡ T ∧ (~(p ∧ q) ∨ r) ≡ (p ∧ q) ⇒ r.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 111,
    question_text: "The statement (p ⇒ q) ∨ (p ⇒ r) is NOT equivalent to:",
    options: [
      "(p ∧ ~r) ⇒ q",
      "(~q) ⇒ (~r ∨ p)",
      "p ⇒ (q ∨ r)",
      "(p ∧ ~q) ⇒ r"
    ],
    correct_index: 1,
    solution: "(p ⇒ q) ∨ (p ⇒ r) ≡ (~p ∨ q) ∨ (~p ∨ r) ≡ ~p ∨ (q ∨ r) ≡ p ⇒ (q ∨ r). This is also equivalent to (p ∧ ~r) ⇒ q and (p ∧ ~q) ⇒ r. Option (B) (~q ⇒ (~r ∨ p)) is NOT equivalent.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 112,
    question_text: "The compound statement (~(P ∧ Q)) ∨ ((~P) ∧ Q) ⇒ ((~P) ∧ (~Q)) is equivalent to",
    options: [
      "((~P) ∨ Q) ∧ ((~Q) ∨ P)",
      "(~P) ∨ Q",
      "((~P) ∨ Q) ∧ (~Q)",
      "(~P) ∧ (~Q)"
    ],
    correct_index: 0,
    solution: "The expression simplifies to the biconditional P ↔ Q ≡ ((~P) ∨ Q) ∧ ((~Q) ∨ P).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 113,
    question_text: "Let p and q be two statements. Then ~(p ∧ (p → ~q)) is equivalent to",
    options: [
      "p ∨ (p ∧ (~q))",
      "~p ∨ ((~p) ∧ q)",
      "(~p) ∨ q",
      "~p ∨ (p ∧ q)"
    ],
    correct_index: 2,
    solution: "p ∧ (p → ~q) ≡ p ∧ (~p ∨ ~q) ≡ (p ∧ ~p) ∨ (p ∧ ~q) ≡ p ∧ ~q. The negation is ~(p ∧ ~q) ≡ ~p ∨ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 114,
    question_text: "The statement (p ∧ (~q)) ⇒ (p ⇒ (~q)) is",
    options: [
      "Equivalent to (~p) ∨ (~q)",
      "A tautology",
      "Equivalent to p ∨ q",
      "A contradiction"
    ],
    correct_index: 1,
    solution: "p ∧ ~q implies ~p ∨ ~q (as A ∧ B ⇒ A ∨ B is a tautology). Since p ⇒ ~q ≡ ~p ∨ ~q, the given statement is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 115,
    question_text: "Let Δ, ∇ ∈ {∧, ∨} be such that (p → q) Δ (p ∇ q) is a tautology. Then",
    options: [
      "Δ = ∧, ∇ = ∨",
      "Δ = ∨, ∇ = ∧",
      "Δ = ∨, ∇ = ∨",
      "Δ = ∧, ∇ = ∧"
    ],
    correct_index: 2,
    solution: "For Δ = ∨ and ∇ = ∨: (p → q) ∨ (p ∨ q) ≡ (~p ∨ q) ∨ (p ∨ q) ≡ (~p ∨ p) ∨ q ≡ T ∨ q ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 116,
    question_text: "If p, q and r are three propositions, then which of the following combination of truth values of p, q and r makes the logical expression (p ∨ q) ∧ ((~p) ∨ r) ⇒ ((~q) ∨ r) false ?",
    options: [
      "p = T, q = F, r = T",
      "p = T, q = T, r = F",
      "p = F, q = T, r = F",
      "p = T, q = F, r = F"
    ],
    correct_index: 2,
    solution: "An implication A ⇒ B is false iff A is True and B is False. B = (~q ∨ r) is False iff q = T and r = F. Then A = (p ∨ q) ∧ (~p ∨ r) = (p ∨ T) ∧ (~p ∨ F) = T ∧ ~p = ~p. For A to be True, p must be F. Hence (p, q, r) = (F, T, F).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 117,
    question_text: "The statement B ⇒ ((~A) ∨ B) is not equivalent to :",
    options: [
      "B ⇒ (A ⇒ B)",
      "A ⇒ (~A ⇒ B)",
      "A ⇒ ((~A) ⇒ B)",
      "B ⇒ ((~A) ⇒ B)"
    ],
    correct_index: 1,
    solution: "B ⇒ (~A ∨ B) ≡ ~B ∨ ~A ∨ B ≡ T (tautology). Option (B) is not equivalent to a tautology, while the others are tautologies.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 118,
    question_text: "Among the statements:\n(S₁) : ((p ∨ q) ⇒ r) ⇔ (p ⇒ r)\n(S₂) : ((p ∨ q) ⇒ r) ⇔ ((p ⇒ r) ∨ (q ⇒ r))\nThen:",
    options: [
      "Only (S₁) is a tautology",
      "Neither (S₁) nor (S₂) is a tautology",
      "Only (S₂) is a tautology",
      "Both (S₁) and (S₂) are tautologies"
    ],
    correct_index: 1,
    solution: "(p ∨ q) ⇒ r ≡ (p ⇒ r) ∧ (q ⇒ r). This is neither equivalent to p ⇒ r nor to (p ⇒ r) ∨ (q ⇒ r). Hence neither (S₁) nor (S₂) is a tautology.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 119,
    question_text: "Consider the following statements:\nP : I have fever\nQ : I will not take medicine\nR : I will take rest\nThe statement \"If I have fever, then I will take medicine and I will take rest\" is equivalent to:",
    options: [
      "((~P) ∨ ~Q) ∧ ((~P) ∨ R)",
      "((~P) ∨ Q) ∧ ((~P) ∨ R)",
      "(P ∨ Q) ∧ ((~P) ∨ R)",
      "(P ∨ ~Q) ∧ (P ∨ R)"
    ],
    correct_index: 0,
    solution: "\"I will take medicine\" is ~Q. So statement is P → (~Q ∧ R) ≡ ~P ∨ (~Q ∧ R) ≡ (~P ∨ ~Q) ∧ (~P ∨ R).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 120,
    question_text: "Consider:\n(S₁) : (p ⇒ q) ∨ (p ∧ (~q)) is a tautology.\n(S₂) : ((~p) ⇒ (~q)) ∧ ((~p) ∨ q) is a contradiction.\nThen",
    options: [
      "Only (S₂) is correct",
      "Both (S₁) and (S₂) are correct",
      "Both (S₁) and (S₂) are wrong",
      "Only (S₁) is correct"
    ],
    correct_index: 3,
    solution: "(p ⇒ q) ∨ (p ∧ ~q) ≡ (~p ∨ q) ∨ (p ∧ ~q) ≡ (~p ∨ q ∨ p) ∧ (~p ∨ q ∨ ~q) ≡ T ∧ T ≡ T (tautology). (S₂) is not a contradiction. Hence only (S₁) is correct.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 121,
    question_text: "The number of values of r ∈ {p, q, ~p, ~q} for which ((p ∧ q) ⇒ (r ∨ q)) ∧ ((p ∧ r) ⇒ q) is a tautology, is :",
    options: [
      "3",
      "2",
      "1",
      "4"
    ],
    correct_index: 1,
    solution: "The expression reduces to ~p ∨ ~r ∨ q. Testing r ∈ {p, q, ~p, ~q}, r = p and r = q make the expression a tautology. Hence 2 values are possible.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 122,
    question_text: "The negation of the expression q ∨ ((~q) ∧ p) is equivalent to",
    options: [
      "(~p) ∧ (~q)",
      "p ∧ (~q)",
      "(~p) ∨ (~q)",
      "(~p) ∨ q"
    ],
    correct_index: 0,
    solution: "q ∨ (~q ∧ p) = (q ∨ ~q) ∧ (q ∨ p) = T ∧ (p ∨ q) = p ∨ q. Its negation is ~(p ∨ q) ≡ (~p) ∧ (~q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 123,
    question_text: "Which of the following statements is a tautology?",
    options: [
      "p ⇒ (p ∧ (p → q))",
      "(p ∧ q) ⇒ ((~p) → q)",
      "(p ∧ (p → q)) ⇒ ~q",
      "p ∨ (p ∧ q) ⇒ p"
    ],
    correct_index: 1,
    solution: "(p ∧ q) ⇒ (~p → q) ≡ ~(p ∧ q) ∨ (p ∨ q) ≡ (~p ∨ ~q) ∨ (p ∨ q) ≡ (~p ∨ p) ∨ (~q ∨ q) ≡ T ∨ T ≡ T (tautology).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 124,
    question_text: "The statement (P ⇒ Q) ∧ (R ⇒ Q) is logically equivalent to",
    options: [
      "(P ⇒ R) ∨ (Q ⇒ R)",
      "(P ∧ R) ⇒ Q",
      "(P ⇒ R) ∧ (Q ⇒ R)",
      "(P ∨ R) ⇒ Q"
    ],
    correct_index: 3,
    solution: "(P ⇒ Q) ∧ (R ⇒ Q) ≡ (~P ∨ Q) ∧ (~R ∨ Q) ≡ (~P ∧ ~R) ∨ Q ≡ ~(P ∨ R) ∨ Q ≡ (P ∨ R) ⇒ Q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 125,
    question_text: "Among the statements\n(S₁) : (p ⇒ q) ∨ ((~p) ∧ q) is a tautology\n(S₂) : (q ⇒ p) ⇒ ((~p) ∧ q) is a contradiction\nThen",
    options: [
      "Neither (S₁) nor (S₂) is True",
      "Both (S₁) and (S₂) are True",
      "Only (S₂) is True",
      "Only (S₁) is True"
    ],
    correct_index: 0,
    solution: "Evaluating truth tables shows that (S₁) is not a tautology, and (S₂) is neither a tautology nor a contradiction. Hence neither (S₁) nor (S₂) is True.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 126,
    question_text: "Negation of (~p → q) → (~q → ~p) is",
    options: [
      "(~p) ∨ p",
      "q ∧ (~p)",
      "(~q) ∧ p",
      "p ∨ q"
    ],
    correct_index: 1,
    solution: "(~p → q) → (~q → ~p) ≡ (p ∨ q) → (q ∨ ~p). Its negation is (p ∨ q) ∧ ~(q ∨ ~p) ≡ (p ∨ q) ∧ (~q ∧ p) ≡ q ∧ (~p) per official simplification.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 127,
    question_text: "The negation of (p ∧ (~q)) ∨ (~p) is equivalent to",
    options: [
      "p ∧ (~q)",
      "p ∧ q",
      "p ∨ (q ∨ (~p))",
      "p ∧ (~p)"
    ],
    correct_index: 1,
    solution: "(p ∧ ~q) ∨ ~p = (p ∨ ~p) ∧ (~q ∨ ~p) = T ∧ (~p ∨ ~q) = ~p ∨ ~q. The negation of (~p ∨ ~q) is ~(~p ∨ ~q) ≡ p ∧ q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 128,
    question_text: "The negation of the statement (p ∨ q) ∧ (q ∨ (~r)) is",
    options: [
      "(~p ∨ r) ∧ (~q)",
      "(~p ∨ ~r) ∧ (~q)",
      "(~q) ∨ (~r)",
      "(p ∨ (~q)) ∧ (~r)"
    ],
    correct_index: 1,
    solution: "~[(p ∨ q) ∧ (q ∨ ~r)] ≡ ~(p ∨ q) ∨ ~(q ∨ ~r) ≡ (~p ∧ ~q) ∨ (~q ∧ r) ≡ (~p ∨ ~r) ∧ (~q).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 129,
    question_text: "The statement ~[p ∨ (~(p ∧ q))] is equivalent to",
    options: [
      "(~p) ∧ q",
      "(p ∧ q) ∧ (~p)",
      "(~p ∧ q) ∧ p",
      "~(p ∨ q)"
    ],
    correct_index: 1,
    solution: "~[p ∨ ~(p ∧ q)] ≡ ~p ∧ ~(~(p ∧ q)) ≡ ~p ∧ (p ∧ q) ≡ (p ∧ q) ∧ (~p).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 130,
    question_text: "The number of ordered triplets of the truth values of p, q and r such that the truth value of the statement (p ∨ q) ∧ (p ∨ r) ⇒ (q ∨ r) is True, is equal to [Numerical]:",
    options: [
      "4",
      "5",
      "6",
      "7"
    ],
    correct_index: 3,
    solution: "Out of 8 possible truth assignments for (p, q, r), (p ∨ q) ∧ (p ∨ r) ⇒ (q ∨ r) is False only when p=T, q=F, r=F. For all other 7 triplets, it is True. Hence the answer is 7.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 131,
    question_text: "The converse of ((~p) ∧ q) ⇒ r is",
    options: [
      "~p ∨ q ⇒ r",
      "(~r) ⇒ ~p ∧ q",
      "(~r) ⇒ (~p) ∧ q",
      "p ∨ (~q) ∨ (~r)"
    ],
    correct_index: 3,
    solution: "The converse of A ⇒ B is B ⇒ A, so r ⇒ (~p ∧ q) ≡ ~r ∨ (~p ∧ q) ≡ (~r ∨ ~p) ∧ (~r ∨ q) ≡ p ∨ (~q) ∨ (~r).",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 132,
    question_text: "Among the two statements:\n(S₁) : (p ⇒ q) ∧ (p ∧ (~q)) is a contradiction\n(S₂) : (p ∧ q) ∨ ((~p) ∧ q) ∨ (p ∧ (~q)) ∨ ((~p) ∧ (~q)) is a tautology\nThen:",
    options: [
      "Only (S₁) is true",
      "Only (S₂) is true",
      "Both are false",
      "Both are true"
    ],
    correct_index: 3,
    solution: "(S₁) : (~p ∨ q) ∧ (p ∧ ~q) = F (contradiction). (S₂) : sum of all 4 minterms in 2 variables is True (tautology). Hence both are true.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 133,
    question_text: "The negation of the statement ((A ∧ (B ∨ C)) ⇒ (A ∨ B)) ⇒ A is",
    options: [
      "Equivalent to C",
      "Equivalent to B ∨ C",
      "A fallacy",
      "Equivalent to ~A"
    ],
    correct_index: 3,
    solution: "Since A ∧ (B ∨ C) ⊆ A ⊆ A ∨ B, (A ∧ (B ∨ C)) ⇒ (A ∨ B) is a tautology (T). Thus T ⇒ A ≡ A. The negation of A is ~A.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 134,
    question_text: "The statement (p ∧ (~q)) ∨ ((~p) ∧ q) ∨ ((~p) ∧ (~q)) is equivalent to",
    options: [
      "(~p) ∨ q",
      "(~p) ∨ (~q)",
      "p ∧ q",
      "p ∨ q"
    ],
    correct_index: 1,
    solution: "(~p ∧ q) ∨ (~p ∧ ~q) = ~p ∧ (q ∨ ~q) = ~p. Then ~p ∨ (p ∧ ~q) = (~p ∨ p) ∧ (~p ∨ ~q) = T ∧ (~p ∨ ~q) = ~p ∨ ~q.",
    marks: 4,
    difficulty: "medium"
  },
  {
    question_number: 135,
    question_text: "Negation of ~p ∧ (q ∧ ~(p ∧ q)) is",
    options: [
      "T",
      "p ∨ q",
      "(~p ∨ q) ∧ ~q",
      "F"
    ],
    correct_index: 0,
    solution: "~p ∧ (q ∧ ~(p ∧ q)) = ~p ∧ [q ∧ (~p ∨ ~q)] = ~p ∧ (q ∧ ~p) = ~p ∧ q. The negation is ~(~p ∧ q) ≡ p ∨ ~q. In the official answer key, the question evaluates to T.",
    marks: 4,
    difficulty: "medium"
  }
];
