import json

with open("backend/scripts/probability_all_pages_ocr.json", "r", encoding="utf-8-sig") as f:
    pages = json.load(f)

print(f"Loaded {len(pages)} pages.")
print("=== PAGE 1 ===")
print(pages[0]["text"])

print("\n=== PAGE 127 ===")
print(pages[-1]["text"])

print("\n=== PAGE 126 ===")
print(pages[-2]["text"][:600])
