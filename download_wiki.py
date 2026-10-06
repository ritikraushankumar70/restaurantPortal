import urllib.request
import urllib.parse
import json
import time

items = [
    "Gulab_jamun", "Rasgulla", "Gajar_ka_halwa", "Kheer", "Jalebi", 
    "Rasmalai", "Vanilla_ice_cream", "Chocolate_cake", "Kulfi", "Chocolate_brownie",
    "Masala_chai", "Coffee", "Lassi", "Mango_shake", "Lemon_tea", "Cold_coffee"
]

for item in items:
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles={item}&pithumbsize=400&format=json"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(res)
        pages = data['query']['pages']
        for page_id in pages:
            if 'thumbnail' in pages[page_id]:
                img_url = pages[page_id]['thumbnail']['source']
                print(f"Found {item}: {img_url}")
                img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                img_data = urllib.request.urlopen(img_req).read()
                path = f"public/images/{item.lower()}.jpg"
                with open(path, "wb") as f:
                    f.write(img_data)
                print(f"Saved {path}")
                break
    except Exception as e:
        print(f"Error for {item}: {e}")
    time.sleep(1) # Prevent 429
