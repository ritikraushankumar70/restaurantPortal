import re
import os

with open('src/app/home/page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def get_best_image(name):
    name_lower = name.lower()
    if 'thali' in name_lower: return '/images/thali.jpg'
    if 'biryani' in name_lower: return '/images/hyderabadi_chicken_biryani.jpg' if 'chicken' in name_lower else '/images/veg_dum_biryani.jpg'
    if 'burger' in name_lower: return '/images/burger.jpg'
    if 'pizza' in name_lower: return '/images/farmhouse_pizza.jpg'
    if 'fries' in name_lower or 'wedge' in name_lower or 'nuggets' in name_lower: return '/images/fries.jpg'
    if 'paneer' in name_lower: return '/images/kadai_paneer.jpg'
    if 'chicken' in name_lower: return '/images/butter_chicken.jpg'
    if 'aloo' in name_lower: return '/images/aloo_gobi.jpg'
    if 'rice' in name_lower: return '/images/chicken_fried_rice.jpg'
    if 'dosa' in name_lower: return '/images/masala_dosa.jpg'
    if 'drink' in name_lower or 'soda' in name_lower or 'shake' in name_lower or 'tea' in name_lower or 'coffee' in name_lower: return '/images/coffee.jpg'
    return '/images/thali.jpg' # fallback

for i, line in enumerate(lines):
    if 'unsplash.com' in line:
        name_match = re.search(r'name:\s*"([^"]+)"', line)
        best_img = '/images/thali.jpg'
        if name_match:
            best_img = get_best_image(name_match.group(1))
        lines[i] = re.sub(r'"https://images\.unsplash\.com/[^"]+"', f'"{best_img}"', line)

with open('src/app/home/page.tsx', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print('Replaced all remaining unsplash URLs')
