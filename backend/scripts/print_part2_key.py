import json

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

print("Answers for Q66 to Q130:")
for i in range(66, 131):
    print(f"Q{i}: {key[str(i)]}", end=", " if (i - 65) % 10 != 0 else "\n")
print()

