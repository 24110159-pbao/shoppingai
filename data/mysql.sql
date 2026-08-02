DROP DATABASE IF EXISTS SHOPPINGAI;
CREATE DATABASE SHOPPINGAI;
USE SHOPPINGAI;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    full_name VARCHAR(100) NOT NULL,

    email VARCHAR(100) UNIQUE,

    role ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CATEGORIES
-- =====================================================

CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE
);

-- =====================================================
-- PRODUCTS
-- =====================================================

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    category_id BIGINT NOT NULL,

    name VARCHAR(150) NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    quantity INT NOT NULL DEFAULT 0,

    image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);

-- =====================================================
-- ORDERS
-- =====================================================

CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id VARCHAR(36) NOT NULL,

    address VARCHAR(255) NOT NULL,

    total_price DECIMAL(12,2) NOT NULL,

    status ENUM(
        'PENDING',
        'SHIPPING',
        'COMPLETED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- =====================================================
-- ORDER ITEMS
-- =====================================================

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INT NOT NULL,

    unit_price DECIMAL(20,2) NOT NULL,

    subtotal DECIMAL(10,2)
        GENERATED ALWAYS AS (quantity * unit_price)
        STORED,

    CONSTRAINT fk_order_item_order
        FOREIGN KEY(order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_order_item_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
);

-- =====================================================
-- AI RECOMMENDATIONS
-- =====================================================

CREATE TABLE recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id VARCHAR(36) NOT NULL,

    product_id BIGINT,

    type VARCHAR(50) NOT NULL,

    message TEXT NOT NULL,

    confidence DECIMAL(5,2),

    status ENUM(
        'NEW',
        'DONE'
    ) DEFAULT 'NEW',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_recommendation_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_recommendation_product
        FOREIGN KEY(product_id)
        REFERENCES products(id)
        ON DELETE SET NULL
);

-- =====================================================
-- INDEX
-- =====================================================

CREATE INDEX idx_product_category
ON products(category_id);

CREATE INDEX idx_order_user
ON orders(user_id);

CREATE INDEX idx_order_created
ON orders(created_at);

CREATE INDEX idx_order_item_order
ON order_items(order_id);

CREATE INDEX idx_order_item_product
ON order_items(product_id);

-- =====================================================
-- SAMPLE DATA
-- =====================================================

INSERT INTO categories(name)
VALUES
('Laptop'),
('Smartphone'),
('Tablet'),
('Phụ kiện'),
('Tai nghe');

INSERT INTO users
(id, username, password, full_name, email, role)
VALUES
(
'cf6787fa-329e-46f9-95ec-1283181c7b44',
'admin',
'$2a$10$8Sa.kBZPSKVKyn1uiRWo6eoJSxqHwYl4BKowlfnSssPjh9XSCEwky',
'pbao',
'admin@gmail.com',
'ADMIN'
),
(
'f4aeb519-f268-4e74-be52-ab937721ec96',
'user',
'$2a$10$FNd27.yYrRsMgu59TZTHE.QP8qHcBr/HSb6.mw6faFETQGQxaDoge',
'Nguyễn Văn A',
'a@gmail.com',
'USER'
),
(
'f63671e2-d9f9-4502-80d8-dcb49273e8b3',
'test',
'$10$YQF35CLiYoAMnX1NuL3HYeaIAXosf1ohWT5Yk659TL1FbuPoppXnC',
'Nguyễn Văn B',
'b@gmail.com',
'USER'
);

INSERT INTO products
(category_id, name, price, quantity, image)
VALUES
(2, 'iPhone 16 Pro', 28990000, 30, 'https://bhstore.vn/uploads/iphone-16-promax-bhstore_3_1731641286.png'),

(5, 'AirPods Pro', 5990000, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPZWsKrge8b9QNJfiG8Ov9DEgK98xeIgXBcWiqlrbeQ&s=10'),

(1, 'MacBook Pro', 45990000, 15, 'https://ttcenter.com.vn/uploads/product/966w54g1-1931-macbook-pro-16-inch-m1-max-32gb-1tb-10cpu-24gpu.webp'),

(4, 'Apple Watch', 9990000, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduiq4Pigyn4LPNIh7l_L13oAhsy7lQY02brTHhBhO6A&s=10'),

(2, 'Samsung Galaxy S25 Ultra', 31990000, 18, 'https://images.samsung.com/is/image/samsung/p6pim/vn/2501/gallery/vn-galaxy-s25-ultra-s938-sm-s938bztqxxv-thumb-544682393'),

(1, 'Dell XPS 15', 39990000, 12, 'https://i.dell.com/is/image/DellContent/content/dam/images/products/laptops-and-2-in-1s/xps/15-9530/media-gallery/laptop-xps-15-9530-black-gallery-1.psd'),

(3, 'iPad Air M3', 18990000, 25, 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-air-storage-select-202405-spacegray'),

(5, 'Sony WH-1000XM5', 8990000, 35, 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh1000xm5_black_main'),

(4, 'Logitech MX Master 3S', 2690000, 40, 'https://resource.logitech.com/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-top-view-graphite.png');

INSERT INTO orders
(user_id, address, total_price, status)
VALUES
('f4aeb519-f268-4e74-be52-ab937721ec96',
'12 Nguyễn Huệ, Quận 1, TP.HCM',
28990000,
'COMPLETED'),

('f63671e2-d9f9-4502-80d8-dcb49273e8b3',
'50 Lê Lợi, Hải Châu, Đà Nẵng',
5990000,
'PENDING'),

('f4aeb519-f268-4e74-be52-ab937721ec96',
'25 Trần Phú, Nha Trang',
9990000,
'SHIPPING'),

('f63671e2-d9f9-4502-80d8-dcb49273e8b3',
'100 Võ Văn Kiệt, TP.HCM',
31990000,
'COMPLETED'),

('f4aeb519-f268-4e74-be52-ab937721ec96',
'88 Nguyễn Trãi, Hà Nội',
18990000,
'PENDING'),

('f63671e2-d9f9-4502-80d8-dcb49273e8b3',
'15 Lý Thường Kiệt, Huế',
39990000,
'SHIPPING'),

('f4aeb519-f268-4e74-be52-ab937721ec96',
'200 Phạm Văn Đồng, TP.HCM',
2690000,
'COMPLETED');

INSERT INTO order_items
(order_id, product_id, quantity, unit_price)
VALUES
(1,1,1,28990000),

(2,2,1,5990000),

(3,4,1,9990000),

(4,5,1,31990000),

(5,7,1,18990000),

(6,6,1,39990000),

(7,9,1,2690000);

INSERT INTO recommendations
(user_id, product_id, type, message, confidence)
VALUES
(
'f4aeb519-f268-4e74-be52-ab937721ec96',
2,
'CROSS_SELL',
'Khách hàng mua iPhone thường mua thêm AirPods Pro.',
95.50
),
(
'f63671e2-d9f9-4502-80d8-dcb49273e8b3',
4,
'UP_SELL',
'Apple Watch là sản phẩm phù hợp với các thiết bị Apple của bạn.',
91.20
);