import json
import re

with open('backend/scripts/binomial_theorem_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

key['141'] = '6006'
key['171'] = 'B'

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'w', encoding='utf-8') as f:
    json.dump(key, f, indent=2)

print("Updated Q141=6006 and Q171=B in official_answer_key_binomial_theorem.json")

