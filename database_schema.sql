-- 1. USERS TABLE - Customer + Owner + Delivery Boy sab ke liye yahi ek table
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  
  -- Common Fields
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer','owner','delivery_boy','admin') DEFAULT 'customer',
  avatar VARCHAR(255) NULL,
  
  -- Verification
  is_phone_verified BOOLEAN DEFAULT 0,
  is_email_verified BOOLEAN DEFAULT 0,
  is_approved BOOLEAN DEFAULT 1, -- Owner/Delivery ke liye Admin approve karega, Customer ke liye 1
  
  -- Status
  is_active BOOLEAN DEFAULT 1,
  fcm_token TEXT NULL, -- Push Notification ke liye
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 1A. OTP VERIFICATIONS - Mobile OTP ke liye
CREATE TABLE otp_verifications (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  purpose ENUM('signup','login','forgot_password') DEFAULT 'signup',
  is_used BOOLEAN DEFAULT 0,
  expires_at DATETIME NOT NULL, -- 5 min baad expire
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX(phone, otp)
);

-- 1B. OWNER KYC DETAILS - Owner Signup ke baad ye fill hoga
CREATE TABLE owner_kyc_details (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  restaurant_name VARCHAR(150) NOT NULL,
  city VARCHAR(50) DEFAULT 'Indore',
  area VARCHAR(100),
  food_type ENUM('veg','non_veg','both') DEFAULT 'veg',
  fssai_no VARCHAR(50) NULL,
  fssai_image VARCHAR(255) NULL,
  aadhar_no VARCHAR(20) NULL,
  pan_no VARCHAR(20) NULL,
  bank_account_no VARCHAR(30) NULL,
  ifsc_code VARCHAR(15) NULL,
  kyc_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 1C. DELIVERY BOY KYC DETAILS - Delivery Boy Signup ke baad
CREATE TABLE delivery_boy_kyc_details (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  vehicle_type ENUM('bike','cycle','ev') DEFAULT 'bike',
  vehicle_no VARCHAR(20) NOT NULL,
  licence_no VARCHAR(50) NULL,
  aadhar_image VARCHAR(255) NULL,
  licence_image VARCHAR(255) NULL,
  photo VARCHAR(255) NULL,
  kyc_status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 2. RESTAURANTS
CREATE TABLE restaurants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
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
  is_pure_veg BOOLEAN DEFAULT 0,
  is_active BOOLEAN DEFAULT 0,
  commission_percent INT DEFAULT 15,
  min_order_amount INT DEFAULT 100,
  delivery_time VARCHAR(20) DEFAULT '30 min',
  fssai_no VARCHAR(50),
  avg_rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CATEGORIES
CREATE TABLE categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NULL, -- NULL = Global category
  parent_id BIGINT NULL,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100),
  image VARCHAR(255),
  type ENUM('cuisine','filter','meal_time') DEFAULT 'cuisine',
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT 1
);

-- 4. MENU_ITEMS
CREATE TABLE menu_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NOT NULL,
  category_id BIGINT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  offer_price DECIMAL(10,2) NULL,
  is_veg BOOLEAN DEFAULT 1,
  is_jain BOOLEAN DEFAULT 0,
  is_available BOOLEAN DEFAULT 1,
  is_today_special BOOLEAN DEFAULT 0,
  is_trending BOOLEAN DEFAULT 0,
  prep_time VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 5. ITEM_VARIANTS - Full/Half, Small/Large
CREATE TABLE item_variants (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id BIGINT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- 6. ITEM_ADDONS - Extra Cheese etc
CREATE TABLE item_addons (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  menu_item_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_veg BOOLEAN DEFAULT 1,
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE
);

-- 7. USER_ADDRESSES
CREATE TABLE user_addresses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  label ENUM('Home','Office','Other') DEFAULT 'Home',
  full_address TEXT NOT NULL,
  landmark VARCHAR(100),
  city VARCHAR(50),
  pincode VARCHAR(10),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_default BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 8. RESTAURANT_TABLES - Dine-in Tables
CREATE TABLE restaurant_tables (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NOT NULL,
  table_no VARCHAR(20) NOT NULL,
  capacity INT NOT NULL,
  location VARCHAR(50), -- AC, Garden, Rooftop
  is_available BOOLEAN DEFAULT 1,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- 9. TABLE_BOOKINGS
CREATE TABLE table_bookings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NOT NULL,
  table_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  booking_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  guests INT NOT NULL,
  status ENUM('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  special_note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (table_id) REFERENCES restaurant_tables(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 10. COUPONS
CREATE TABLE coupons (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NULL, -- NULL = sabke liye
  code VARCHAR(20) UNIQUE NOT NULL,
  discount_type ENUM('percent','flat') DEFAULT 'percent',
  discount_value DECIMAL(10,2) NOT NULL,
  min_cart_value DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2) NULL,
  usage_limit INT DEFAULT 100,
  used_count INT DEFAULT 0,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT 1
);

-- 11. CARTS
CREATE TABLE carts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  menu_item_id BIGINT NOT NULL,
  variant_id BIGINT NULL,
  quantity INT DEFAULT 1,
  addons_json TEXT, -- JSON me addons store
  special_note VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 12. ORDERS - Main Order Table
CREATE TABLE orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_no VARCHAR(20) UNIQUE NOT NULL,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  delivery_boy_id BIGINT NULL,
  address_id BIGINT NULL,
  table_booking_id BIGINT NULL,
  order_type ENUM('delivery','takeaway','dinein','subscription','party') DEFAULT 'delivery',
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_charge DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  coupon_id BIGINT NULL,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  grand_total DECIMAL(10,2) NOT NULL,
  payment_method ENUM('cod','upi','card','wallet') DEFAULT 'cod',
  payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
  order_status ENUM('placed','accepted','preparing','ready','out_for_delivery','delivered','cancelled') DEFAULT 'placed',
  delivery_otp VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- 13. ORDER_ITEMS
CREATE TABLE order_items (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  menu_item_id BIGINT NOT NULL,
  variant_name VARCHAR(50),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  addons_detail TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- 14. PAYMENTS
CREATE TABLE payments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT NOT NULL,
  transaction_id VARCHAR(100),
  gateway VARCHAR(50) DEFAULT 'razorpay',
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending','success','failed') DEFAULT 'pending',
  response_json TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 15. DELIVERY_BOYS
CREATE TABLE delivery_boys (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNIQUE NOT NULL,
  vehicle_no VARCHAR(20),
  licence_no VARCHAR(50),
  is_online BOOLEAN DEFAULT 0,
  current_lat DECIMAL(10,8),
  current_lng DECIMAL(11,8),
  total_orders INT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 5.0,
  total_earning DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 16. REVIEWS
CREATE TABLE reviews (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  order_id BIGINT NOT NULL,
  menu_item_id BIGINT NULL,
  rating INT CHECK (rating >=1 AND rating <=5),
  comment TEXT,
  images VARCHAR(255),
  owner_reply TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- 17. SUBSCRIPTION_PLANS - Tiffin
CREATE TABLE subscription_plans (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id BIGINT NOT NULL,
  name VARCHAR(100) NOT NULL, -- Monthly Veg Tiffin
  type ENUM('veg','non_veg','jain') DEFAULT 'veg',
  meals_per_day INT DEFAULT 2,
  price_monthly DECIMAL(10,2) NOT NULL,
  description TEXT,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- 18. SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  plan_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  address_id BIGINT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('active','paused','cancelled','expired') DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
);

-- 19. PARTY_ORDERS
CREATE TABLE party_orders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  restaurant_id BIGINT NOT NULL,
  event_date DATE NOT NULL,
  guests INT NOT NULL,
  budget DECIMAL(10,2),
  menu_requirement TEXT,
  status ENUM('enquiry','confirmed','cancelled') DEFAULT 'enquiry',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 20. BANNERS - Home Page ke liye
CREATE TABLE banners (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  image VARCHAR(255) NOT NULL,
  link VARCHAR(255),
  position ENUM('home_slider','offer_zone') DEFAULT 'home_slider',
  is_active BOOLEAN DEFAULT 1
);

-- 21. SETTINGS
CREATE TABLE settings (
  id INT PRIMARY KEY,
  key_name VARCHAR(100) UNIQUE, -- ex: site_name, razorpay_key
  key_value TEXT,
  updated_at TIMESTAMP
);
