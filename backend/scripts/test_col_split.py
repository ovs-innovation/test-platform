import json

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

p1 = pages[0]
mid_x = 765

# Group words into left column (x < 765) and right column (x >= 765)
words = []
for line in p1['lines']:
    w_field = line.get('Words', [])
    if isinstance(w_field, list):
        words.extend(w_field)
    elif isinstance(w_field, dict):
        words.append(w_field)

col1 = [w for w in words if w['X'] < mid_x]
col2 = [w for w in words if w['X'] >= mid_x]

col1_sorted = sorted(col1, key=lambda w: (w['Y'], w['X']))
col2_sorted = sorted(col2, key=lambda w: (w['Y'], w['X']))

# Reconstruct lines in col1
def words_to_lines(word_list):
    lines = []
    for w in word_list:
        matched = False
        for l in lines:
            if abs(l['y'] - w['Y']) < 14:
                l['words'].append(w)
                matched = True
                break
        if not matched:
            lines.append({'y': w['Y'], 'words': [w]})
    lines.sort(key=lambda l: l['y'])
    res = []
    for l in lines:
        l['words'].sort(key=lambda w: w['X'])
        res.append(" ".join(w['Text'] for w in l['words']))
    return res

print("=== COL 1 (LEFT) ===")
for l in words_to_lines(col1)[:20]:
    print(l)

print("\n=== COL 2 (RIGHT) ===")
for l in words_to_lines(col2)[:20]:
    print(l)
