import json
import re

with open('backend/scripts/binomial_theorem_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    key = json.load(f)

# Let's write an algorithm to segment questions across pages 1 to 168
# For each page, collect all lines
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

print(f"Total lines across 168 pages: {len(all_lines)}")

# Let's find question anchors:
# An anchor is a line like "1.", "2.", "26.", etc., or lines starting with a number and dot
anchors = []
for i, line in enumerate(all_lines):
    t = line['text']
    m = re.match(r'^(\d{1,3})[\.\s]+', t)
    if m:
        num = int(m.group(1))
        if 1 <= num <= 260:
            anchors.append({'q_num': num, 'line_idx': i, 'page': line['page'], 'text': t})

print(f"Total candidate anchors found: {len(anchors)}")

# Filter anchors to maintain strictly increasing sequence from 1 to 260
filtered_anchors = []
curr = 1
for a in anchors:
    if a['q_num'] == curr:
        filtered_anchors.append(a)
        curr += 1
    elif a['q_num'] > curr:
        # Check if we skipped any
        pass

print(f"Sequential anchors found: {len(filtered_anchors)} up to {curr - 1}")

