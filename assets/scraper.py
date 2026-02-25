import urllib.request
import re
import os
from urllib.parse import urljoin

urls_to_visit = [
    "https://www.silenceondanse.ca/",
    "https://www.silenceondanse.ca/services",
    "https://www.silenceondanse.ca/notrehistoire",
    "https://www.silenceondanse.ca/photos",
    "https://www.silenceondanse.ca/contact"
]

img_urls = set()
pattern = re.compile(r'(?:src|background-image:.*url)\s*=?\s*[\(\"\']?(https?://[^\"\'>\s\)]+?\.(?:jpg|jpeg|png|gif|webp|svg)[^\"\'>\s\)]*)[\)\"\']?', re.IGNORECASE)

os.makedirs("images", exist_ok=True)
os.makedirs("video", exist_ok=True)

for page in urls_to_visit:
    try:
        req = urllib.request.Request(page, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8', errors='ignore')
            found = pattern.findall(html)
            for url in found:
                img_urls.add(url)
    except Exception as e:
        print(f"Failed to fetch {page}: {e}")

print(f"Found {len(img_urls)} unique image URLs.")
count = 0
for url in img_urls:
    try:
        clean_url = url.split("?")[0]
        filename = clean_url.split('/')[-1]
        filepath = os.path.join("images", filename)
        if not os.path.exists(filepath):
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                with open(filepath, 'wb') as f:
                    f.write(response.read())
            count += 1
    except Exception as e:
        pass
print(f"Successfully downloaded {count} new images.")
