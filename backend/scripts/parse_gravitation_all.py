import json
import re
import os

with open('backend/scripts/gravitation_ocr_cache.json', 'r', encoding='utf-8') as f:
    cache = json.load(f)

with open('backend/scripts/gravitation_official_keys.json', 'r', encoding='utf-8') as f:
    official_keys = json.load(f)

with open('backend/scripts/gravitation_diagram_urls.json', 'r', encoding='utf-8') as f:
    diagram_urls = json.load(f)

print(f"Loaded {len(cache)} pages, {len(official_keys)} keys, {len(diagram_urls)} diagram URLs.")
