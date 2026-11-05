import json
import sys

with open('backend/scripts/binomial_theorem_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

with open('backend/scripts/official_answer_key_binomial_theorem.json', 'r', encoding='utf-8-sig') as f:
    ans_key = json.load(f)

start_p = int(sys.argv[1]) if len(sys.argv) > 1 else 1
end_p = int(sys.argv[2]) if len(sys.argv) > 2 else 5

for p in range(start_p, end_p + 1):
    pg = next((x for x in pages if x['page'] == p), None)
    if pg:
        print(f"\n==================== PAGE {p} ====================")
        for idx, line in enumerate(pg['lines']):
            print(f"[{idx}] {line['Text']}")

