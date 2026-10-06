import urllib.request
import re
import json
import os

keywords = ["gulab_jamun", "rasgulla", "kheer", "jalebi", "ice_cream", "chocolate_cake", "masala_chai", "coffee", "lassi", "mango_shake", "lemon_tea"]

for kw in keywords:
    url = f"https://unsplash.com/s/photos/{kw.replace('_', '-')}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find images
        match = re.search(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html)
        if match:
            img_url = match.group(0) + "?auto=format&fit=crop&w=400&q=80"
            print(f"Found {kw}: {img_url}")
            
            img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(img_req).read()
            
            path = f"public/images/{kw}.jpg"
            with open(path, "wb") as f:
                f.write(img_data)
            print(f"Saved {path}")
    except Exception as e:
        print(f"Error {kw}: {e}")
