import json

with open('backend/scripts/statistics_all_pages_ocr.json', 'r', encoding='utf-8-sig') as f:
    pages = json.load(f)

# Print pages 1-4 line by line with line index
for p in pages[:4]:
    print(f"\n==================== PAGE {p['page']} ====================")
    for i, line in enumerate(p['lines']):
        print(f"L{i:02d}: {line['Text']}")

