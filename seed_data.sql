-- 1. Insert a few users (Owners)
INSERT INTO users (name, phone, email, password, role, is_phone_verified, is_approved) VALUES 
('Rahul Sharma', '9876543210', 'rahul@example.com', 'hashed_pass_123', 'owner', 1, 1),
('Priya Singh', '9876543211', 'priya@example.com', 'hashed_pass_123', 'owner', 1, 1),
('Amit Kumar', '9876543212', 'amit@example.com', 'hashed_pass_123', 'owner', 1, 1);

-- 2. Insert some Restaurants in Indore
INSERT INTO restaurants (owner_id, name, slug, logo, banner, description, address, city, latitude, longitude, is_pure_veg, is_active, avg_rating) VALUES
(1, 'Sharma Bhojnalaya', 'sharma-bhojnalaya', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80', 'Authentic North Indian Veg Food', 'Palasia, Indore', 'Indore', 22.7244, 75.8839, 1, 1, 4.5),
(2, 'Priya''s Kitchen', 'priyas-kitchen', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', 'Best Non-Veg & Biryani', 'Vijay Nagar, Indore', 'Indore', 22.7533, 75.8937, 0, 1, 4.2),
(3, 'Indore Chat House', 'indore-chat-house', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', 'Famous Street Food & Snacks', 'Sarafa Bazaar, Indore', 'Indore', 22.7177, 75.8545, 1, 1, 4.8);

-- 3. Insert some Categories
INSERT INTO categories (name, slug, image, type) VALUES 
('North Indian', 'north-indian', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80', 'cuisine'),
('Biryani', 'biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80', 'cuisine'),
('Street Food', 'street-food', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80', 'cuisine');

-- 4. Insert Menu Items
INSERT INTO menu_items (restaurant_id, category_id, name, description, image, price, is_veg) VALUES
(1, 1, 'Paneer Butter Masala', 'Rich and creamy paneer curry', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=400&q=80', 250.00, 1),
(1, 1, 'Dal Makhani', 'Slow cooked black lentils', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80', 180.00, 1),
(2, 2, 'Chicken Dum Biryani', 'Authentic Hyderabadi style', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80', 320.00, 0),
(3, 3, 'Khatta Meetha Poha', 'Indore special poha', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80', 40.00, 1);
