import json
import random

# Real world data arrays
users = [
    {"name": "Amit Sharma", "email": "amit@example.com", "phone": "9876543210"},
    {"name": "Rahul Verma", "email": "rahul@example.com", "phone": "9876543211"},
    {"name": "Priya Singh", "email": "priya@example.com", "phone": "9876543212"},
    {"name": "Neha Gupta", "email": "neha@example.com", "phone": "9876543213"},
    {"name": "Vikram Singh", "email": "vikram@example.com", "phone": "9876543214"},
    {"name": "Anjali Patel", "email": "anjali@example.com", "phone": "9876543215"},
    {"name": "Rohit Kumar", "email": "rohit@example.com", "phone": "9876543216"},
    {"name": "Sneha Reddy", "email": "sneha@example.com", "phone": "9876543217"},
    {"name": "Suresh Raina", "email": "suresh@example.com", "phone": "9876543218"},
    {"name": "Kavita Joshi", "email": "kavita@example.com", "phone": "9876543219"}
]

restaurants = [
    {"name": "The Spice Route", "slug": "the-spice-route", "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", "address": "M G Road, Indore"},
    {"name": "Pizza Paradise", "slug": "pizza-paradise", "image": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", "address": "Bhawarkua, Indore"},
    {"name": "Burger Lounge", "slug": "burger-lounge", "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80", "address": "Vijay Nagar, Indore"},
    {"name": "Desi Dhaba", "slug": "desi-dhaba", "image": "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=80", "address": "Palasia, Indore"},
    {"name": "Chinese Wok", "slug": "chinese-wok", "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80", "address": "Sapna Sangeeta, Indore"},
    {"name": "South Indian Express", "slug": "south-indian-express", "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80", "address": "Rajwada, Indore"},
    {"name": "Sweet Cravings", "slug": "sweet-cravings", "image": "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80", "address": "Geeta Bhawan, Indore"},
    {"name": "Cafe Mocha", "slug": "cafe-mocha", "image": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80", "address": "Saket, Indore"},
    {"name": "Vegan Bites", "slug": "vegan-bites", "image": "https://images.unsplash.com/photo-1490818387583-1b5ba459676c?auto=format&fit=crop&w=800&q=80", "address": "Navlakha, Indore"},
    {"name": "Bakers Street", "slug": "bakers-street", "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80", "address": "Annapurna, Indore"}
]

categories = [
    {"name": "North Indian", "slug": "north-indian", "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pizza", "slug": "pizza", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"},
    {"name": "Burgers", "slug": "burgers", "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chinese", "slug": "chinese", "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"},
    {"name": "South Indian", "slug": "south-indian", "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80"},
    {"name": "Desserts", "slug": "desserts", "image": "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80"},
    {"name": "Beverages", "slug": "beverages", "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"},
    {"name": "Healthy", "slug": "healthy", "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80"},
    {"name": "Street Food", "slug": "street-food", "image": "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80"},
    {"name": "Biryani", "slug": "biryani", "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"}
]

menu_items = [
    {"name": "Paneer Butter Masala", "desc": "Rich and creamy cottage cheese curry", "price": 249, "img": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"},
    {"name": "Margherita Pizza", "desc": "Classic delight with 100% real mozzarella cheese", "price": 199, "img": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chicken Tikka Burger", "desc": "Spicy chicken tikka in a soft bun", "price": 149, "img": "https://images.unsplash.com/photo-1615719413546-198b25453f85?auto=format&fit=crop&w=800&q=80"},
    {"name": "Hakka Noodles", "desc": "Wok-tossed noodles with crunchy vegetables", "price": 129, "img": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"},
    {"name": "Masala Dosa", "desc": "Crispy crepe stuffed with spiced potatoes", "price": 99, "img": "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80"},
    {"name": "Chocolate Brownie", "desc": "Warm gooey brownie with chocolate syrup", "price": 119, "img": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"},
    {"name": "Cold Coffee", "desc": "Chilled coffee blended with vanilla ice cream", "price": 89, "img": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"},
    {"name": "Quinoa Salad", "desc": "Healthy bowl of quinoa, fresh veggies & vinaigrette", "price": 179, "img": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"},
    {"name": "Pani Puri", "desc": "Crispy puris filled with spicy tangy water", "price": 49, "img": "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"},
    {"name": "Hyderabadi Biryani", "desc": "Aromatic basmati rice cooked with spices and meat", "price": 299, "img": "https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&w=800&q=80"}
]

with open("seed.sql", "w") as f:
    f.write("-- Supabase / PostgreSQL Compatible Schema & Data\\n\\n")

    tables_list = [
        "users", "restaurants", "categories", "menu_items", "item_variants", 
        "item_addons", "user_addresses", "restaurant_tables", "table_bookings", 
        "coupons", "carts", "orders", "order_items", "payments", 
        "delivery_boys", "reviews", "subscription_plans", "subscriptions", 
        "party_orders", "banners", "settings"
    ]
    for t in reversed(tables_list):
        f.write(f"DROP TABLE IF EXISTS {t} CASCADE;\\n")
    f.write("\\n")

    # [Omitted the CREATE TABLE strings here for brevity, I will copy them exactly from previous script]
    f.write("""
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password VARCHAR(255),
  role TEXT CHECK(role IN ('admin','owner','customer','delivery_boy')) DEFAULT 'customer',
  avatar VARCHAR(255),
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  loyalty_points INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE restaurants (
  id BIGSERIAL PRIMARY KEY,
  owner_id BIGINT REFERENCES users(id),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE,
  logo VARCHAR(255),
  banner VARCHAR(255),
  description TEXT,
  address TEXT,
  city VARCHAR(50) DEFAULT 'Indore',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  open_time TIME,
  close_time TIME,
  is_pure_veg BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  commission_percent INT DEFAULT 15,
  min_order_amount INT DEFAULT 100,
  delivery_time VARCHAR(20) DEFAULT '30 min',
  fssai_no VARCHAR(50),
  avg_rating DECIMAL(2,1) DEFAULT 4.5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NULL,
  parent_id BIGINT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100),
  image VARCHAR(255),
  type TEXT CHECK(type IN ('cuisine','filter','meal_time')) DEFAULT 'cuisine',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  category_id BIGINT NOT NULL REFERENCES categories(id),
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  offer_price DECIMAL(10,2) NULL,
  is_veg BOOLEAN DEFAULT true,
  is_jain BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  is_today_special BOOLEAN DEFAULT true,
  is_trending BOOLEAN DEFAULT true,
  prep_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_variants ( id BIGSERIAL PRIMARY KEY, menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE, name VARCHAR(50) NOT NULL, price DECIMAL(10,2) NOT NULL );
CREATE TABLE item_addons ( id BIGSERIAL PRIMARY KEY, menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE, name VARCHAR(100) NOT NULL, price DECIMAL(10,2) DEFAULT 0, is_veg BOOLEAN DEFAULT true );
CREATE TABLE user_addresses ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id), label TEXT CHECK(label IN ('Home','Office','Other')) DEFAULT 'Home', full_address TEXT NOT NULL, landmark VARCHAR(100), city VARCHAR(50), pincode VARCHAR(10), latitude DECIMAL(10,8), longitude DECIMAL(11,8), is_default BOOLEAN DEFAULT false );
CREATE TABLE restaurant_tables ( id BIGSERIAL PRIMARY KEY, restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), table_no VARCHAR(20) NOT NULL, capacity INT NOT NULL, location VARCHAR(50), is_available BOOLEAN DEFAULT true );
CREATE TABLE table_bookings ( id BIGSERIAL PRIMARY KEY, restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), table_id BIGINT NOT NULL REFERENCES restaurant_tables(id), user_id BIGINT NOT NULL REFERENCES users(id), booking_date DATE NOT NULL, slot_time TIME NOT NULL, guests INT NOT NULL, status TEXT CHECK(status IN ('pending','confirmed','cancelled','completed')) DEFAULT 'pending', special_note TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE coupons ( id BIGSERIAL PRIMARY KEY, restaurant_id BIGINT NULL, code VARCHAR(20) UNIQUE NOT NULL, discount_type TEXT CHECK(discount_type IN ('percent','flat')) DEFAULT 'percent', discount_value DECIMAL(10,2) NOT NULL, min_cart_value DECIMAL(10,2) DEFAULT 0, max_discount DECIMAL(10,2) NULL, usage_limit INT DEFAULT 100, used_count INT DEFAULT 0, expiry_date DATE, is_active BOOLEAN DEFAULT true );
CREATE TABLE carts ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id), restaurant_id BIGINT NOT NULL, menu_item_id BIGINT NOT NULL, variant_id BIGINT NULL, quantity INT DEFAULT 1, addons_json TEXT, special_note VARCHAR(255) );
CREATE TABLE orders ( id BIGSERIAL PRIMARY KEY, order_no VARCHAR(20) UNIQUE NOT NULL, user_id BIGINT NOT NULL REFERENCES users(id), restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), delivery_boy_id BIGINT NULL, address_id BIGINT NULL, table_booking_id BIGINT NULL, order_type TEXT CHECK(order_type IN ('delivery','takeaway','dinein','subscription','party')) DEFAULT 'delivery', subtotal DECIMAL(10,2) NOT NULL, delivery_charge DECIMAL(10,2) DEFAULT 0, tax DECIMAL(10,2) DEFAULT 0, coupon_id BIGINT NULL, discount_amount DECIMAL(10,2) DEFAULT 0, grand_total DECIMAL(10,2) NOT NULL, payment_method TEXT CHECK(payment_method IN ('cod','upi','card','wallet')) DEFAULT 'cod', payment_status TEXT CHECK(payment_status IN ('pending','paid','failed')) DEFAULT 'pending', order_status TEXT CHECK(order_status IN ('placed','accepted','preparing','ready','out_for_delivery','delivered','cancelled')) DEFAULT 'placed', delivery_otp VARCHAR(10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE order_items ( id BIGSERIAL PRIMARY KEY, order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, menu_item_id BIGINT NOT NULL, variant_name VARCHAR(50), quantity INT NOT NULL, price DECIMAL(10,2) NOT NULL, addons_detail TEXT, total_price DECIMAL(10,2) NOT NULL );
CREATE TABLE payments ( id BIGSERIAL PRIMARY KEY, order_id BIGINT NOT NULL REFERENCES orders(id), transaction_id VARCHAR(100), gateway VARCHAR(50) DEFAULT 'razorpay', amount DECIMAL(10,2) NOT NULL, status TEXT CHECK(status IN ('pending','success','failed')) DEFAULT 'pending', response_json TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE delivery_boys ( id BIGSERIAL PRIMARY KEY, user_id BIGINT UNIQUE NOT NULL REFERENCES users(id), vehicle_no VARCHAR(20), licence_no VARCHAR(50), is_online BOOLEAN DEFAULT false, current_lat DECIMAL(10,8), current_lng DECIMAL(11,8), total_orders INT DEFAULT 0, rating DECIMAL(2,1) DEFAULT 5.0, total_earning DECIMAL(10,2) DEFAULT 0 );
CREATE TABLE reviews ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id), restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), order_id BIGINT NOT NULL REFERENCES orders(id), menu_item_id BIGINT NULL, rating INT CHECK (rating >=1 AND rating <=5), comment TEXT, images VARCHAR(255), owner_reply TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE subscription_plans ( id BIGSERIAL PRIMARY KEY, restaurant_id BIGINT NOT NULL REFERENCES restaurants(id), name VARCHAR(100) NOT NULL, type TEXT CHECK(type IN ('veg','non_veg','jain')) DEFAULT 'veg', meals_per_day INT DEFAULT 2, price_monthly DECIMAL(10,2) NOT NULL, description TEXT );
CREATE TABLE subscriptions ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id), plan_id BIGINT NOT NULL REFERENCES subscription_plans(id), restaurant_id BIGINT NOT NULL, address_id BIGINT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, status TEXT CHECK(status IN ('active','paused','cancelled','expired')) DEFAULT 'active' );
CREATE TABLE party_orders ( id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL, restaurant_id BIGINT NOT NULL, event_date DATE NOT NULL, guests INT NOT NULL, budget DECIMAL(10,2), menu_requirement TEXT, status TEXT CHECK(status IN ('enquiry','confirmed','cancelled')) DEFAULT 'enquiry', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
CREATE TABLE banners ( id BIGSERIAL PRIMARY KEY, title VARCHAR(100), image VARCHAR(255) NOT NULL, link VARCHAR(255), position TEXT CHECK(position IN ('home_slider','offer_zone')) DEFAULT 'home_slider', is_active BOOLEAN DEFAULT true );
CREATE TABLE settings ( id INT PRIMARY KEY, key_name VARCHAR(100) UNIQUE, key_value TEXT, updated_at TIMESTAMP );
""")

    f.write("\\n-- USERS\\n")
    f.write("INSERT INTO users (name, email, phone, role, avatar) VALUES\\n")
    for i, u in enumerate(users):
        role = "owner" if i < 2 else "delivery_boy" if i < 4 else "customer"
        end = ";" if i == len(users)-1 else ","
        img = f"https://ui-avatars.com/api/?name={u['name'].replace(' ', '+')}&background=random"
        f.write(f"('{u['name']}', '{u['email']}', '{u['phone']}', '{role}', '{img}'){end}\\n")

    f.write("\\n-- RESTAURANTS\\n")
    f.write("INSERT INTO restaurants (owner_id, name, slug, logo, banner, address, open_time, close_time, is_active) VALUES\\n")
    for i, r in enumerate(restaurants):
        end = ";" if i == len(restaurants)-1 else ","
        f.write(f"(1, '{r['name']}', '{r['slug']}', '{r['image']}', '{r['image']}', '{r['address']}', '10:00:00', '23:00:00', true){end}\\n")

    f.write("\\n-- CATEGORIES\\n")
    f.write("INSERT INTO categories (name, slug, image, type) VALUES\\n")
    for i, c in enumerate(categories):
        end = ";" if i == len(categories)-1 else ","
        f.write(f"('{c['name']}', '{c['slug']}', '{c['image']}', 'cuisine'){end}\\n")

    f.write("\\n-- MENU ITEMS\\n")
    f.write("INSERT INTO menu_items (restaurant_id, category_id, name, description, image, price) VALUES\\n")
    for i, m in enumerate(menu_items):
        end = ";" if i == len(menu_items)-1 else ","
        f.write(f"({(i%10)+1}, {(i%10)+1}, '{m['name']}', '{m['desc']}', '{m['img']}', {m['price']}){end}\\n")

    # Addons and variants just generic
    f.write("\\n-- ITEM VARIANTS\\nINSERT INTO item_variants (menu_item_id, name, price) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, 'Large', {menu_items[i-1]['price'] + 50}){end}\\n")
        
    f.write("\\n-- ITEM ADDONS\\nINSERT INTO item_addons (menu_item_id, name, price) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, 'Extra Cheese', 30){end}\\n")

    # Generic remaining tables
    f.write("\\n-- USER ADDRESSES\\nINSERT INTO user_addresses (user_id, label, full_address, city) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, 'Home', 'Block {i}, Society {i}', 'Indore'){end}\\n")

    f.write("\\n-- RESTAURANT TABLES\\nINSERT INTO restaurant_tables (restaurant_id, table_no, capacity) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, 'T-{i}', 4){end}\\n")
        
    f.write("\\n-- TABLE BOOKINGS\\nINSERT INTO table_bookings (restaurant_id, table_id, user_id, booking_date, slot_time, guests) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, {i}, '2026-10-01', '19:00:00', 4){end}\\n")

    f.write("\\n-- COUPONS\\nINSERT INTO coupons (code, discount_value) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"('WELCOME{i}0', {i*5}){end}\\n")
        
    f.write("\\n-- CARTS\\nINSERT INTO carts (user_id, restaurant_id, menu_item_id, quantity) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, {i}, 1){end}\\n")
        
    f.write("\\n-- ORDERS\\nINSERT INTO orders (order_no, user_id, restaurant_id, subtotal, grand_total) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"('ORD2026{i:03d}', {i}, {i}, 300, 315){end}\\n")

    f.write("\\n-- ORDER ITEMS\\nINSERT INTO order_items (order_id, menu_item_id, quantity, price, total_price) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, 2, 150, 300){end}\\n")

    f.write("\\n-- PAYMENTS\\nINSERT INTO payments (order_id, transaction_id, amount, status) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, 'TXN99{i:03d}', 315, 'success'){end}\\n")

    f.write("\\n-- DELIVERY BOYS\\nINSERT INTO delivery_boys (user_id, vehicle_no, is_online) VALUES\\n")
    for i in range(3, 5): 
        end = ";" if i == 4 else ","
        f.write(f"({i}, 'MP09-XY-{i}000', true){end}\\n")
    
    f.write("\\n-- REVIEWS\\nINSERT INTO reviews (user_id, restaurant_id, order_id, rating, comment) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, {i}, 5, 'Awesome taste!'){end}\\n")
        
    f.write("\\n-- SUBSCRIPTION PLANS\\nINSERT INTO subscription_plans (restaurant_id, name, price_monthly) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, 'Monthly Veg', 2500){end}\\n")
        
    f.write("\\n-- SUBSCRIPTIONS\\nINSERT INTO subscriptions (user_id, plan_id, restaurant_id, address_id, start_date, end_date) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, {i}, {i}, '2026-10-01', '2026-10-31'){end}\\n")
        
    f.write("\\n-- PARTY ORDERS\\nINSERT INTO party_orders (user_id, restaurant_id, event_date, guests) VALUES\\n")
    for i in range(1, 11): end = ";" if i == 10 else ","; f.write(f"({i}, {i}, '2026-11-01', 50){end}\\n")
        
    banners = [
        {"title": "Diwali Dhamaka", "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Weekend Offer", "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"},
        {"title": "Free Delivery", "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"}
    ]
    f.write("\\n-- BANNERS\\nINSERT INTO banners (title, image, link) VALUES\\n")
    for i, b in enumerate(banners):
        end = ";" if i == len(banners)-1 else ","
        f.write(f"('{b['title']}', '{b['image']}', '/'){end}\\n")

    f.write("\\n-- SETTINGS\\nINSERT INTO settings (id, key_name, key_value) VALUES\\n")
    settings = [
        (1, 'site_name', 'MyRestaurant'),
        (2, 'admin_email', 'admin@example.com'),
        (3, 'currency', 'INR'),
        (4, 'tax_percent', '5')
    ]
    for i, s in enumerate(settings):
        end = ";" if i == len(settings)-1 else ","
        f.write(f"({s[0]}, '{s[1]}', '{s[2]}'){end}\\n")

print("Generated diverse seed.sql successfully!")
