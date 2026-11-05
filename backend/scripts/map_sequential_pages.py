import json
import re

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_statistics.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

# Map every question to (start_page, end_page, raw_text)
# We can find each question by looking at page text in sequential order:
# For q in 1..160:
# find the page p (starting from current_page) where q starts.

q_page_map = {}
curr_page = 1

SPECIAL_STARTS = {
    2: "The median of a set of 9 distinct observations",
    14: "It the mean deviation about the median",
    17: "11 Ifthe mean of 4, 7, 2, 8, 6 and a is 7",
    18: "The median of 100 observations grouped",
    20: "All the students of a class performed poorly",
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

for q in range(1, 161):
    found = False
    for p_idx in range(curr_page - 1, min(len(pages) - 1, curr_page + 3)):
        p = pages[p_idx]
        text = p['text']
        
        # Check special start first
        if q in SPECIAL_STARTS:
            if SPECIAL_STARTS[q] in text:
                q_page_map[q] = p['page']
                curr_page = p['page']
                found = True
                break
        else:
            # Check standard pattern: e.g. "Q. " or "\nQ. "
            m = re.search(rf'(?:^|\n|\s){q}[\.\•\-\']\s+', text)
            if m:
                q_page_map[q] = p['page']
                curr_page = p['page']
                found = True
                break
    if not found:
        print(f"FAILED to find Q{q} near page {curr_page}!")

print(f"Successfully mapped: {len(q_page_map)}/160 questions to start pages!")
