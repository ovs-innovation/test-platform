import json
import re

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_statistics.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

# Concatenate all text across pages 1 to 127 with page boundary markers
full_text = ""
page_offsets = []
for p in pages:
    if p['page'] == 128:
        continue
    page_offsets.append((p['page'], len(full_text)))
    full_text += f"\n---PAGE_{p['page']}---\n" + p['text']

# Known specific overrides for the headers
KNOWN_HEADERS = {
    17: "11 Ifthe mean of 4, 7, 2, 8, 6 and a is 7",
    18: "The median of 100 observations grouped in classes of equal width is 25",
    27: "21 Let X and M.D. be the mean and the mean deviation",
    47: "41 The mean and the variance of five observations are 4 and 5.20",
    57: "51 The mean and the standard deviation (s.d.) of 10 observations",
    65: "If the variance of the following frequency distribution: Class: 10 — 20",
    79: "Consider the following frequency distribution: Class: 0 — 6",
    87: "81 An online exam is attempted by 50 candidates",
    89: "The mean and variance of 7 observations are 8 and 16"
}

# Find start of each question in full_text
q_spans = []
cur_pos = 0
for q in range(1, 161):
    pos = -1
    if q in KNOWN_HEADERS:
        pos = full_text.find(KNOWN_HEADERS[q], cur_pos)
    else:
        m = re.search(rf'(?:---PAGE_\d+---\n|\n|\s){q}[\.\•\-\']\s+', full_text[cur_pos:])
        if m:
            pos = cur_pos + m.start()
    if pos != -1:
        cur_pos = pos
    q_spans.append((q, pos))

# Check any missing
missing = [q for q, pos in q_spans if pos == -1]
print(f"Total located in full_text: {len(q_spans) - len(missing)}/160")
if missing:
    print(f"Missing: {missing}")
else:
    print("ALL 160 QUESTIONS LOCATED IN STREAM!")

is_sorted = all(q_spans[i][1] < q_spans[i+1][1] for i in range(len(q_spans)-1))
print('Strictly increasing order:', is_sorted)
if not is_sorted:
    for i in range(len(q_spans)-1):
        if q_spans[i][1] >= q_spans[i+1][1]:
            print(f'Order inversion at Q{q_spans[i][0]} (pos {q_spans[i][1]}) >= Q{q_spans[i+1][0]} (pos {q_spans[i+1][1]})')
