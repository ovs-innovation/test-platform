import json
import re

with open('backend/scripts/binomial_theorem_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

# Find all ANSWER lines
all_lines = []
for p in pages:
    if p['page'] == 169:
        continue
    p_num = p['page']
    for idx, l in enumerate(p['lines']):
        all_lines.append({
            'page': p_num,
            'line_idx': idx,
            'text': l['Text'].strip()
        })

ans_lines = []
for i, line in enumerate(all_lines):
    t = line['text']
    # Check for ANSWER pattern
    m = re.search(r'\bANSW[A-Z\s\-\*\:\;\,\.\+\=]+([A-D]|\d+)', t, re.IGNORECASE)
    if m and not 'answer and' in t.lower() and not 'wrong answer' in t.lower():
        ans_lines.append({
            'global_idx': i,
            'page': line['page'],
            'text': t,
            'ans': m.group(1).upper()
        })

print(f"Total ANSWER lines found: {len(ans_lines)}")
for idx, a in enumerate(ans_lines[:30]):
    print(f"[{idx+1}] Page {a['page']}: '{a['text']}' -> {a['ans']}")

