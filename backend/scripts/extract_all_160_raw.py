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
    14: "It the mean deviation about the median",
    17: "11 Ifthe mean of 4, 7, 2, 8, 6 and a is 7",
    18: "The median of 100 observations grouped",
    20: "All the students of a class performed poorly",
    21: "The mean of a data set consisting of 20 observations is 40",
    22: "Mean of 5 observations is 7",
    27: "21 Let X and M.D. be the mean",
    34: "34' The mean age of 25 teachers",
    36: "If E (Xi — 5) — 9 and",
    47: "41 The mean and the variance of five observations",
    51: "The mean and the median of the following ten numbers",
    57: "51 The mean and the standard deviation (s.d.) of 10",
    65: "If the variance of the following frequency distribution: Class: 10 — 20",
    67: "67' If the mean and the standard deviation of the data 3, 5, 7, a, b",
    79: "Consider the following frequency distribution: Class: 0 — 6",
    87: "81 An online exam is attempted by 50 candidates",
    89: "The mean and variance of 7 observations are 8 and 16",
    112: "112' If the mean and variance of the frequency distribution",
    137: "137- Marks obtains by all the students of class 12",
    146: "146' If the mean deviation about the median of the numbers k, 2k"
}

# Build continuous stream of text across pages 1 to 127
# We keep track of character offsets
stream = ""
for p in pages:
    if p['page'] == 128:
        continue
    stream += f"\n---PAGE_{p['page']}---\n" + p['text']

q_starts = []
curr_pos = 0

for q in range(1, 161):
    pos = -1
    if q in SPECIAL_STARTS:
        pos = stream.find(SPECIAL_STARTS[q], curr_pos)
    else:
        # Search for `\n<q>. ` or ` <q>. `
        # Use regex search starting at curr_pos
        m = re.search(rf'(?:---PAGE_\d+---\n|\n|\s){q}[\.\•\-\']\s+', stream[curr_pos:])
        if m:
            pos = curr_pos + m.start()
    if pos == -1:
        print(f"ERROR: Could not locate Q{q} from pos {curr_pos}")
    else:
        q_starts.append((q, pos))
        curr_pos = pos + 10 # advance slightly

print(f"Total q_starts: {len(q_starts)}/160")

# Now slice each question
raw_questions = []
for i in range(len(q_starts)):
    q_num, start_idx = q_starts[i]
    if i < len(q_starts) - 1:
        end_idx = q_starts[i+1][1]
        chunk = stream[start_idx:end_idx]
    else:
        chunk = stream[start_idx:]
    raw_questions.append({
        'q_num': q_num,
        'raw': chunk,
        'expected_ans': ans_key[str(q_num)]
    })

print(f"Total raw questions extracted: {len(raw_questions)}")
print("\n--- SAMPLE Q1 ---")
print(raw_questions[0]['raw'][:300])
print("\n--- SAMPLE Q160 ---")
print(raw_questions[159]['raw'][:300])
