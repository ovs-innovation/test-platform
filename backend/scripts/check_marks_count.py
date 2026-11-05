import json
import re

with open('backend/scripts/binomial_theorem_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

marks_count = 0
for p in pages:
    if p['page'] == 169:
        continue
    for l in p['lines']:
        t = l['Text']
        if re.search(r'marks?|marking', t, re.I):
            marks_count += 1

print(f"Total lines containing 'mark': {marks_count}")

