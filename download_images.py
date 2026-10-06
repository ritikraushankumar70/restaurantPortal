import urllib.request
import json
import os

images = {
    "kolkata_chicken_biryani": "Thalassery_biryani",
    "egg_biryani": "Ambur_biryani",
    "prawn_biryani": "Nasi_kebuli",
    "fish_biryani": "Kabuli_pulao"
}

os.makedirs("public/images", exist_ok=True)
headers = {'User-Agent': 'RestaurantPortalBot/1.0 (bot@restaurant.local)'}

for name, title in images.items():
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=800"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            pages = data['query']['pages']
            page = list(pages.values())[0]
            if 'thumbnail' in page:
                img_url = page['thumbnail']['source']
                print(f"Downloading {name} from {img_url}")
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req) as img_resp:
                    with open(f"public/images/{name}.jpg", 'wb') as f:
                        f.write(img_resp.read())
            else:
                print(f"No image found for {title}")
    except Exception as e:
        print(f"Error for {title}: {e}")
