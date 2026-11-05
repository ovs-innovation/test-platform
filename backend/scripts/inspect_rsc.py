import json
import re

with open('backend/scripts/acadxl_statistics_page.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract all self.__next_f.push payloads
pushes = re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html)
print(f"Found {len(pushes)} next_f chunks")

combined = ""
for p in pushes:
    # unescape string
    decoded = p.encode('utf-8').decode('unicode_escape', errors='ignore')
    combined += decoded

print(f"Combined length: {len(combined)}")

# Search for question patterns in combined
q_matches = re.findall(r'\{"index":\d+,"type":"[^"]+","options":\[[^\]]*\],"correctAnswer":"[^"]*"', combined)
print(f"Found {len(q_matches)} question JSONs in RSC stream:")
for qm in q_matches:
    print("  ", qm)

