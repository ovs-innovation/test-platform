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
    47: "41 The mean and the variance of five observations",
    51: "The mean and the median of the following ten numbers",
    57: "51 The mean and the standard deviation (s.d.) of 10",
    65: "If the variance of the following frequency distribution: Class: 10 — 20",
    67: "67' If the mean and the standard deviation of the data 3, 5, 7, a, b",
    71: "Let X 1, X2, , X 18 be eighteen observations",
    79: "Consider the following frequency distribution: Class: 0 — 6",
    87: "81 An online exam is attempted by 50 candidates",
    89: "The mean and variance of 7 observations are 8 and 16",
    90: "If the mean deviation about the mean of the numbers 1, 2, 3",
    91: "The mean of the numbers a, b, 8, 5, IO is 6",
    112: "112' If the mean and variance of the frequency distribution",
    137: "137- Marks obtains by all the students of class 12",
    142: "Let the Mean and Variance of five observations be 5 and 10",
    144: "The mean and standard deviation of 100 observations are 40 and 5.1",
    146: "146' If the mean deviation about the median of the numbers k, 2k",
    147: "Let the mean and variance of 8 numbers",
    148: "If the mean and the variance of the data Class 4-8"
}

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
        m = re.search(rf'(?:---PAGE_\d+---\n|\n|\s){q}[\.\•\-\']\s+', stream[curr_pos:])
        if m:
            pos = curr_pos + m.start()
    q_starts.append((q, pos))
    curr_pos = pos + 10

raw_chunks = {}
for i in range(len(q_starts)):
    q_num, start_idx = q_starts[i]
    end_idx = q_starts[i+1][1] if i < len(q_starts) - 1 else len(stream)
    raw_chunks[q_num] = stream[start_idx:end_idx]

print("Successfully chunked all 160 questions.")

# Check length of each chunk
short_chunks = []
for q in range(1, 161):
    c = raw_chunks[q].strip()
    if len(c) < 100:
        short_chunks.append((q, len(c), c))

print(f"Chunks shorter than 100 chars: {len(short_chunks)}")
for sc in short_chunks:
    print(f"Q{sc[0]} (len {sc[1]}): {sc[2]}")

lengths = [(q, len(raw_chunks[q])) for q in range(1, 161)]
lengths.sort(key=lambda x: x[1])
print('5 shortest chunks:', lengths[:5])
for q, l in lengths[:3]:
    print(f'\n--- Q{q} (len {l}) ---')
    print(raw_chunks[q][:300])
