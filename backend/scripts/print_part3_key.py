import json

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

print("Answers for Q131 to Q195:")
for i in range(131, 196):
    print(f"Q{i}: {key[str(i)]}", end=", " if (i - 130) % 10 != 0 else "\n")
print()

