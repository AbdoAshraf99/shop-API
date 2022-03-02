CREATE TABLE users (id SERIAL PRIMARY KEY,firstName VARCHAR(100),lastName VARCHAR(100),username VARCHAR(100), password VARCHAR);
CREATE TABLE orders (id SERIAL PRIMARY KEY,productQuantity INT,user_id BIGINT references users(id),status VARCHAR(50),created_date Date);
CREATE TABLE products(id SERIAL PRIMARY KEY,name VARCHAR,price INT,category VARCHAR);
CREATE TABLE order_products(id SERIAL PRIMARY KEY,quantity INT,order_id BIGINT references orders(id),product_id BIGINT references products(id));
