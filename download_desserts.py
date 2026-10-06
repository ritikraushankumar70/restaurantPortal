import urllib.request
import os

images = {
    "gulab_jamun.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Gulab_jamun_%28Dessert%29.jpg/800px-Gulab_jamun_%28Dessert%29.jpg",
    "rasgulla.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Rasgulla_-_A_Traditional_Indian_Sweet.jpg/800px-Rasgulla_-_A_Traditional_Indian_Sweet.jpg",
    "gajar_ka_halwa.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Gajar_Ka_Halwa.jpg/800px-Gajar_Ka_Halwa.jpg",
    "kheer.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kheer_aka_Rice_Pudding.jpg/800px-Kheer_aka_Rice_Pudding.jpg",
    "jalebi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Jalebi_-_Indian_sweet.jpg/800px-Jalebi_-_Indian_sweet.jpg",
    "chocolate_cake.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Pound_layer_cake.jpg/800px-Pound_layer_cake.jpg",
    "vanilla_ice_cream.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Ice_cream_with_vanilla_beans.jpg/800px-Ice_cream_with_vanilla_beans.jpg",
    "kulfi.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Kulfi_on_stick.jpg/800px-Kulfi_on_stick.jpg"
}

os.makedirs("public/images", exist_ok=True)

for filename, url in images.items():
    filepath = os.path.join("public/images", filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Success: {filename}")
    except Exception as e:
        print(f"Failed {filename}: {e}")
        # Try without thumb
        try:
            original_url = url.replace("/thumb", "").split("/800px-")[0]
            print(f"Trying original: {original_url}")
            req = urllib.request.Request(original_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
            print(f"Success: {filename}")
        except Exception as e2:
            print(f"Failed original {filename}: {e2}")

