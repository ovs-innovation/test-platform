import json
import re

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_statistics.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

SPECIAL_STARTS = {
    2: "The median of a set of 9 distinct observations",
    7: "If in a frequently distribution",
    8: "Suppose a population A has 100 observations",
    11: "Statement-I : The variance of first n even",
    12: "If the mean deviation of number 1,",
    14: "It the mean deviation about the median",
    17: "11 Ifthe mean of 4, 7, 2, 8, 6 and a is 7",
    18: "The median of 100 observations grouped",
    20: "All the students of a class performed poorly",
    21: "The mean of a data set consisting of 20 observations is 40",
    22: "Mean of 5 observations is 7",
    27: "21 Let X and M.D. be the mean",
    34: "34' The mean age of 25 teachers",
    36: "If E (Xi — 5) — 9 and",
    41: "41."
}

stream = ""
for p in pages:
    if p['page'] == 128:
        continue
    stream += f"\n---PAGE_{p['page']}---\n" + p['text']

q_starts = []
curr_pos = 0

for q in range(1, 42):
    pos = -1
    if q in SPECIAL_STARTS:
        pos = stream.find(SPECIAL_STARTS[q], curr_pos)
    else:
        m = re.search(rf'(?:---PAGE_\d+---\n|\n|\s){q}[\.\•\-\']\s+', stream[curr_pos:])
        if m:
            pos = curr_pos + m.start()
    q_starts.append((q, pos))
    curr_pos = pos + 10

raw_chunks = {}
for i in range(len(q_starts) - 1):
    q_num, start_idx = q_starts[i]
    end_idx = q_starts[i+1][1]
    raw_chunks[q_num] = stream[start_idx:end_idx]

print(f"Collected {len(raw_chunks)} chunks for Part 1.")

