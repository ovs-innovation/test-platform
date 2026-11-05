import json
import re

with open('backend/scripts/official_answer_key_statistics.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

for q in range(41, 81):
    ans = ans_key[str(q)]
    is_mcq = ans in ['A', 'B', 'C', 'D']
    t = 'MCQ' if is_mcq else 'NUM'
    print(f"Q{q:03d}: [{t}] Ans = {ans}")

