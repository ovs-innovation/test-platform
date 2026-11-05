import json
import re

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_statistics.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

# Find positions of all 160 questions
# We know headers can look like:
# "^(\d{1,3})[\.\•\-\']\s+" or within text after solution
q_patterns = {}
for q in range(1, 161):
    # Regex to find Q<q>
    q_patterns[q] = re.compile(rf'(?:^|\n|\s){q}[\.\•\-\']\s+', re.MULTILINE)

q_found = {}
for p in pages:
    if p['page'] == 128:
        continue
    text = p['text']
    for q in range(1, 161):
        for m in q_patterns[q].finditer(text):
            if q not in q_found:
                q_found[q] = []
            q_found[q].append((p['page'], m.start(), m.end()))

missing = [q for q in range(1, 161) if q not in q_found]
print(f"Direct regex found: {len(q_found)}/160")
print(f"Missing from simple regex: {missing}")
