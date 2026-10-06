import urllib.request
import urllib.parse
import json
import os

queries = {
    "gulab_jamun.jpg": "Gulab jamun",
    "rasgulla.jpg": "Rasgulla",
    "gajar_ka_halwa.jpg": "Gajar ka halwa",
    "kheer.jpg": "Kheer",
    "jalebi.jpg": "Jalebi",
    "vanilla_ice_cream.jpg": "Vanilla ice cream",
    "kulfi.jpg": "Kulfi"
}

os.makedirs("public/images", exist_ok=True)

for filename, query in queries.items():
    print(f"Searching for {query}...")
    search_url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json"
    req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data.get('query', {}).get('pages', {})
            if pages:
                page = list(pages.values())[0]
                if 'imageinfo' in page:
                    thumb_url = page['imageinfo'][0]['thumburl']
                    print(f"Downloading {filename} from {thumb_url}...")
                    img_req = urllib.request.Request(thumb_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(img_req) as img_resp, open(os.path.join("public/images", filename), 'wb') as f:
                        f.write(img_resp.read())
                    print(f"Success: {filename}")
                else:
                    print(f"No imageinfo for {filename}")
            else:
                print(f"No results for {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
