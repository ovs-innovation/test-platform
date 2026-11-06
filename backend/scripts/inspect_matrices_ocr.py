import json
import re

with open("backend/scripts/matrices_all_pages_ocr.json", "r", encoding="utf-8-sig") as f:
    pages = json.load(f)

print(f"Total pages in OCR: {len(pages)}")

# Let's inspect where questions start on each page
q_pattern = re.compile(r'^\s*(\d{1,3})\.\s*')

page_to_qs = {}
for p in pages:
    p_num = p['page']
    lines = [line['Text'] for line in p.get('lines', [])]
    detected_qs = []
    for l in lines:
        m = q_pattern.match(l)
        if m:
            q_val = int(m.group(1))
            if 1 <= q_val <= 178:
                detected_qs.append((q_val, l[:60]))
    if detected_qs:
        page_to_qs[p_num] = detected_qs

print(f"Pages with question headers detected: {len(page_to_qs)}")
for p_num in sorted(page_to_qs.keys())[:20]:
    print(f"Page {p_num}: {page_to_qs[p_num]}")

# Check which question numbers from 1 to 178 were detected
all_found = set()
for qs in page_to_qs.values():
    for q_val, _ in qs:
        all_found.add(q_val)

missing = sorted(set(range(1, 179)) - all_found)
print(f"Detected {len(all_found)} / 178 questions.")
print(f"Missing question headers from regex: {missing}")

