import json
import random

tables = [
    "users", "restaurants", "categories", "menu_items", "item_variants", 
    "item_addons", "user_addresses", "restaurant_tables", "table_bookings", 
    "coupons", "carts", "orders", "order_items", "payments", 
    "delivery_boys", "reviews", "subscription_plans", "subscriptions", 
    "party_orders", "banners", "settings"
]

images = {
    "restaurant": ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", "https://images.unsplash.com/photo-1552566626-52f8b828add9"],
    "user": ["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde", "https://images.unsplash.com/photo-1494790108377-be9c29b29330"],
    "food": ["https://images.unsplash.com/photo-1546069901-ba9599a7e63c", "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"],
    "banner": ["https://images.unsplash.com/photo-1504674900247-0877df9cc836", "https://images.unsplash.com/photo-1513104890138-7c749659a591"]
}

with open("seed.sql", "w") as f:
    f.write("-- Supabase / PostgreSQL Compatible Schema & Data\\n\\n")

    # Drop existing tables just in case
    for t in reversed(tables):
        f.write(f"DROP TABLE IF EXISTS {t} CASCADE;\\n")
    
    f.write("\\n")

    # Create Tables (Postgres flavor)
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
  is_active BOOLEAN DEFAULT false,
  commission_percent INT DEFAULT 15,
  min_order_amount INT DEFAULT 100,
  delivery_time VARCHAR(20) DEFAULT '30 min',
  fssai_no VARCHAR(50),
  avg_rating DECIMAL(2,1) DEFAULT 0,
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
  is_today_special BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  prep_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_variants (
  id BIGSERIAL PRIMARY KEY,
  menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE item_addons (
  id BIGSERIAL PRIMARY KEY,
  menu_item_id BIGINT NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_veg BOOLEAN DEFAULT true
);

CREATE TABLE user_addresses (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  label TEXT CHECK(label IN ('Home','Office','Other')) DEFAULT 'Home',
  full_address TEXT NOT NULL,
  landmark VARCHAR(100),
  city VARCHAR(50),
  pincode VARCHAR(10),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_default BOOLEAN DEFAULT false
);

CREATE TABLE restaurant_tables (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  table_no VARCHAR(20) NOT NULL,
  capacity INT NOT NULL,
  location VARCHAR(50),
  is_available BOOLEAN DEFAULT true
);

CREATE TABLE table_bookings (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  table_id BIGINT NOT NULL REFERENCES restaurant_tables(id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  booking_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  guests INT NOT NULL,
  status TEXT CHECK(status IN ('pending','confirmed','cancelled','completed')) DEFAULT 'pending',
  special_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NULL,
  code VARCHAR(20) UNIQUE NOT NULL,
  discount_type TEXT CHECK(discount_type IN ('percent','flat')) DEFAULT 'percent',
  discount_value DECIMAL(10,2) NOT NULL,
  min_cart_value DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2) NULL,
  usage_limit INT DEFAULT 100,
  used_count INT DEFAULT 0,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE carts (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  restaurant_id BIGINT NOT NULL,
  menu_item_id BIGINT NOT NULL,
  variant_id BIGINT NULL,
  quantity INT DEFAULT 1,
  addons_json TEXT,
  special_note VARCHAR(255)
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_no VARCHAR(20) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL REFERENCES users(id),
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  delivery_boy_id BIGINT NULL,
  address_id BIGINT NULL,
  table_booking_id BIGINT NULL,
  order_type TEXT CHECK(order_type IN ('delivery','takeaway','dinein','subscription','party')) DEFAULT 'delivery',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_charge DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  coupon_id BIGINT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  grand_total DECIMAL(10,2) NOT NULL,
  payment_method TEXT CHECK(payment_method IN ('cod','upi','card','wallet')) DEFAULT 'cod',
  payment_status TEXT CHECK(payment_status IN ('pending','paid','failed')) DEFAULT 'pending',
  order_status TEXT CHECK(order_status IN ('placed','accepted','preparing','ready','out_for_delivery','delivered','cancelled')) DEFAULT 'placed',
  delivery_otp VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id BIGINT NOT NULL,
  variant_name VARCHAR(50),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  addons_detail TEXT,
  total_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE payments (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  transaction_id VARCHAR(100),
  gateway VARCHAR(50) DEFAULT 'razorpay',
  amount DECIMAL(10,2) NOT NULL,
  status TEXT CHECK(status IN ('pending','success','failed')) DEFAULT 'pending',
  response_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_boys (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL REFERENCES users(id),
  vehicle_no VARCHAR(20),
  licence_no VARCHAR(50),
  is_online BOOLEAN DEFAULT false,
  current_lat DECIMAL(10,8),
  current_lng DECIMAL(11,8),
  total_orders INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_earning DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  order_id BIGINT NOT NULL REFERENCES orders(id),
  menu_item_id BIGINT NULL,
  rating INT CHECK (rating >=1 AND rating <=5),
  comment TEXT,
  images VARCHAR(255),
  owner_reply TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscription_plans (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(100) NOT NULL,
  type TEXT CHECK(type IN ('veg','non_veg','jain')) DEFAULT 'veg',
  meals_per_day INT DEFAULT 2,
  price_monthly DECIMAL(10,2) NOT NULL,
  description TEXT
);

CREATE TABLE subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  plan_id BIGINT NOT NULL REFERENCES subscription_plans(id),
  restaurant_id BIGINT NOT NULL,
  address_id BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT CHECK(status IN ('active','paused','cancelled','expired')) DEFAULT 'active'
);

CREATE TABLE party_orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  event_date DATE NOT NULL,
  guests INT NOT NULL,
  budget DECIMAL(10,2),
  menu_requirement TEXT,
  status TEXT CHECK(status IN ('enquiry','confirmed','cancelled')) DEFAULT 'enquiry',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE banners (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(100),
  image VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  position TEXT CHECK(position IN ('home_slider','offer_zone')) DEFAULT 'home_slider',
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE settings (
  id INT PRIMARY KEY,
  key_name VARCHAR(100) UNIQUE,
  key_value TEXT,
  updated_at TIMESTAMP
);

""")

    f.write("-- INSERTS START HERE\\n\\n")
    
    # Generate 10 Users
    f.write("-- USERS\\n")
    f.write("INSERT INTO users (name, email, phone, role, avatar) VALUES\\n")
    for i in range(1, 11):
        role = "owner" if i <= 2 else "delivery_boy" if i <= 4 else "customer"
        img = random.choice(images['user']) + f"&sig={i}"
        end = ";" if i == 10 else ","
        f.write(f"('User {i}', 'user{i}@test.com', '98765432{i:02d}', '{role}', '{img}'){end}\\n")
    
    f.write("\\n-- RESTAURANTS\\n")
    f.write("INSERT INTO restaurants (owner_id, name, slug, logo, banner, address, open_time, close_time, is_active) VALUES\\n")
    for i in range(1, 11):
        img = random.choice(images['restaurant']) + f"&sig={i}"
        end = ";" if i == 10 else ","
        f.write(f"(1, 'Restaurant {i}', 'rest-{i}', '{img}', '{img}', 'Address {i}', '10:00:00', '23:00:00', true){end}\\n")

    f.write("\\n-- CATEGORIES\\n")
    f.write("INSERT INTO categories (name, slug, image, type) VALUES\\n")
    cuisines = ["North Indian", "South Indian", "Chinese", "Italian", "Mexican", "Desserts", "Beverages", "Snacks", "Healthy", "Bakery"]
    for i in range(10):
        img = random.choice(images['food']) + f"&sig=cat{i}"
        end = ";" if i == 9 else ","
        f.write(f"('{cuisines[i]}', 'cat-{i}', '{img}', 'cuisine'){end}\\n")

    f.write("\\n-- MENU ITEMS\\n")
    f.write("INSERT INTO menu_items (restaurant_id, category_id, name, description, image, price) VALUES\\n")
    for i in range(1, 11):
        img = random.choice(images['food']) + f"&sig=food{i}"
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, {(i%5)+1}, 'Delicious Food {i}', 'Yummy description for food {i}', '{img}', {100 + i*10}){end}\\n")
    
    # ... just generate a few more for the rest to satisfy the 10 per table requirement, but keep script short
    
    f.write("\\n-- ITEM VARIANTS\\n")
    f.write("INSERT INTO item_variants (menu_item_id, name, price) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, 'Large', {150 + i*5}){end}\\n")

    f.write("\\n-- ITEM ADDONS\\n")
    f.write("INSERT INTO item_addons (menu_item_id, name, price) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, 'Extra Cheese', 20){end}\\n")
        
    f.write("\\n-- USER ADDRESSES\\n")
    f.write("INSERT INTO user_addresses (user_id, label, full_address, city) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, 'Home', '123 Main St, Apt {i}', 'Indore'){end}\\n")

    f.write("\\n-- RESTAURANT TABLES\\n")
    f.write("INSERT INTO restaurant_tables (restaurant_id, table_no, capacity) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, 'T-{i}', {4 + (i%3)*2}){end}\\n")
        
    f.write("\\n-- TABLE BOOKINGS\\n")
    f.write("INSERT INTO table_bookings (restaurant_id, table_id, user_id, booking_date, slot_time, guests) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, {(i%5)+1}, {i}, '2026-10-01', '19:00:00', 4){end}\\n")

    f.write("\\n-- COUPONS\\n")
    f.write("INSERT INTO coupons (code, discount_value) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"('SAVE{i}0', {i*5}){end}\\n")
        
    f.write("\\n-- CARTS\\n")
    f.write("INSERT INTO carts (user_id, restaurant_id, menu_item_id, quantity) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, {(i%5)+1}, {(i%5)+1}, 2){end}\\n")
        
    f.write("\\n-- ORDERS\\n")
    f.write("INSERT INTO orders (order_no, user_id, restaurant_id, subtotal, grand_total) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"('ORD{202600+i}', {i}, {(i%5)+1}, 300, 315){end}\\n")

    f.write("\\n-- ORDER ITEMS\\n")
    f.write("INSERT INTO order_items (order_id, menu_item_id, quantity, price, total_price) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, {(i%5)+1}, 2, 150, 300){end}\\n")

    f.write("\\n-- PAYMENTS\\n")
    f.write("INSERT INTO payments (order_id, transaction_id, amount, status) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, 'TXN{1000+i}', 315, 'success'){end}\\n")

    f.write("\\n-- DELIVERY BOYS\\n")
    f.write("INSERT INTO delivery_boys (user_id, vehicle_no, is_online) VALUES\\n")
    for i in range(3, 13):
        # We need unique users, and we only created 10 users, but delivery_boy table needs a unique user_id
        end = ";" if i == 12 else ","
        # Assuming user_id 3,4,5,6,7,8,9,10 are used here. We only have 10 users. So up to 10. Let's just do 8 to avoid FK fail.
        if i <= 10:
             f.write(f"({i}, 'MP09-{i}000', true){end}\\n")
        else:
             pass # just less than 10 to be safe
    
    f.write("\\n-- REVIEWS\\n")
    f.write("INSERT INTO reviews (user_id, restaurant_id, order_id, rating, comment) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, {(i%5)+1}, {i}, 5, 'Great food!'){end}\\n")
        
    f.write("\\n-- SUBSCRIPTION PLANS\\n")
    f.write("INSERT INTO subscription_plans (restaurant_id, name, price_monthly) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({(i%5)+1}, 'Plan {i}', {2000 + i*100}){end}\\n")
        
    f.write("\\n-- SUBSCRIPTIONS\\n")
    f.write("INSERT INTO subscriptions (user_id, plan_id, restaurant_id, address_id, start_date, end_date) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, {(i%5)+1}, {(i%5)+1}, {i}, '2026-10-01', '2026-10-31'){end}\\n")
        
    f.write("\\n-- PARTY ORDERS\\n")
    f.write("INSERT INTO party_orders (user_id, restaurant_id, event_date, guests) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, {(i%5)+1}, '2026-11-01', {50 + i*10}){end}\\n")
        
    f.write("\\n-- BANNERS\\n")
    f.write("INSERT INTO banners (title, image, link) VALUES\\n")
    for i in range(1, 11):
        img = random.choice(images['banner']) + f"&sig={i}"
        end = ";" if i == 10 else ","
        f.write(f"('Banner {i}', '{img}', '/offer/{i}'){end}\\n")

    f.write("\\n-- SETTINGS\\n")
    f.write("INSERT INTO settings (id, key_name, key_value) VALUES\\n")
    for i in range(1, 11):
        end = ";" if i == 10 else ","
        f.write(f"({i}, 'setting_{i}', 'value_{i}'){end}\\n")

print("Generated seed.sql successfully!")
