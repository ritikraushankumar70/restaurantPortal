import re

with open('src/app/home/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    # Fast Food
    'https://images.unsplash.com/photo-1513104890d38-7c7f58b9d400': '/images/margherita_pizza.jpg',
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af': '/images/aloo_gobi.jpg', 
    'https://images.unsplash.com/photo-1626700051175-6818013e1d4f': '/images/chicken_lollipop.jpg',
    'https://images.unsplash.com/photo-1601050690597-df0568f70950': '/images/samosa.jpg',
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84': '/images/pav_bhaji.jpg',
    
    # Beverages
    'https://images.unsplash.com/photo-1546173159-315724a31696': '/images/lassi.jpg', 
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735': '/images/coffee.jpg',
    'https://images.unsplash.com/photo-1556679343-c7306c1976bc': '/images/lemon_iced_tea.jpg',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd': '/images/coffee.jpg',

    # Jain
    'https://images.unsplash.com/photo-1599487405270-86430a634350': '/images/paneer_tikka.jpg',
    
    # Upwas
    'https://images.unsplash.com/photo-1599021456807-25db0f974333': '/images/aloo_gobi.jpg',
    
    # Thalis/Lunches
    'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a': '/images/thali.jpg',
    'https://images.unsplash.com/photo-1544025162-d76694265947': '/images/thali.jpg',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1': '/images/thali.jpg',
    
    # Biryani
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8': '/images/hyderabadi_chicken_biryani.jpg',
    
    # Late Night
    'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841': '/images/maggi.jpg',
    'https://images.unsplash.com/photo-1594212848116-b83349b11e2f': '/images/burger.jpg',
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8': '/images/pasta.jpg',
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c': '/images/sushi.jpg',
    
    # Tiffin
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c': '/images/thali.jpg',
    
    # Combos
    'https://images.unsplash.com/photo-1586190848861-99aa4a171e90': '/images/burger.jpg',
    'https://images.unsplash.com/photo-1585032226651-759b368d7246': '/images/sushi.jpg', 
    
    # Other decorative
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836': '/images/thali.jpg',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591': '/images/burger.jpg',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b': '/images/coffee.jpg',
    'https://images.unsplash.com/photo-1547592180-85f173990554': '/images/thali.jpg',
    'https://images.unsplash.com/photo-1599566150163-29194dcaad36': '/images/coffee.jpg',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330': '/images/coffee.jpg',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d': '/images/coffee.jpg',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d': '/images/coffee.jpg',
}

for raw_url, new_img in replacements.items():
    pattern = re.escape(raw_url) + r'[^\s\"\'\?]*(\?[^\s\"\'\?]+)?'
    content = re.sub(pattern, new_img, content)

with open('src/app/home/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done replacing URLs.')
