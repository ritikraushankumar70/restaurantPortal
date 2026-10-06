import urllib.request
import urllib.parse
import json
import os

titles = {
    "gulab_jamun.jpg": "File:Gulab_jamun_(Dessert).jpg",
    "rasgulla.jpg": "File:Rasgulla_-_A_Traditional_Indian_Sweet.jpg",
    "gajar_ka_halwa.jpg": "File:Gajar_Ka_Halwa.jpg",
    "kheer.jpg": "File:Kheer_aka_Rice_Pudding.jpg",
    "jalebi.jpg": "File:Jalebi_-_Indian_sweet.jpg",
    "chocolate_cake.jpg": "File:Pound_layer_cake.jpg",
    "vanilla_ice_cream.jpg": "File:Ice_cream_with_vanilla_beans.jpg",
    "kulfi.jpg": "File:Kulfi_on_stick.jpg"
}

for filename, title in titles.items():
    api_url = f"https://commons.wikimedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=imageinfo&iiprop=url&iiurlwidth=400&format=json"
    req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            for page_id in pages:
                if 'imageinfo' in pages[page_id]:
                    thumb_url = pages[page_id]['imageinfo'][0]['thumburl']
                    print(f"Downloading {filename} from {thumb_url}...")
                    img_req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(img_req) as img_resp, open(os.path.join("public/images", filename), 'wb') as f:
                        f.write(img_resp.read())
                    print(f"Success: {filename}")
                else:
                    print(f"No imageinfo for {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
