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

    rating DECIMAL(2,1) DEFAULT 5.0,

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

    total_price DECIMAL(10,2) NOT NULL,

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

    unit_price DECIMAL(10,2) NOT NULL,

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
(category_id, name, price, quantity, image, rating)
VALUES
(2, 'iPhone 16 Pro', 28990000, 30, 'https://bhstore.vn/uploads/iphone-16-promax-bhstore_3_1731641286.png', 4.9),
(5, 'AirPods Pro', 5990000, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMPZWsKrge8b9QNJfiG8Ov9DEgK98xeIgXBcWiqlrbeQ&s=10', 4.8),
(1, 'MacBook Pro', 45990000, 15, 'https://ttcenter.com.vn/uploads/product/966w54g1-1931-macbook-pro-16-inch-m1-max-32gb-1tb-10cpu-24gpu.webp', 5.0),
(4, 'Apple Watch', 9990000, 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduiq4Pigyn4LPNIh7l_L13oAhsy7lQY02brTHhBhO6A&s=10', 4.7);

INSERT INTO orders
(user_id, total_price, status)
VALUES
('f4aeb519-f268-4e74-be52-ab937721ec96', 28990000, 'COMPLETED'),
('f63671e2-d9f9-4502-80d8-dcb49273e8b3', 5990000, 'PENDING');

INSERT INTO order_items
(order_id, product_id, quantity, unit_price)
VALUES
(1, 1, 1, 28990000),
(2, 2, 1, 5990000);

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