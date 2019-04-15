DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,

    product_name VARCHAR(30) NOT NULL,

    department_name VARCHAR(30),

    price INT NOT NULL,

    stock_quantity INT NOT NULL,

    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("madden 19", "electronics", 60, 33);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bananas", "food", 2, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("master luke", "toys", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk", "food", 3, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pokemon cards", "toys", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("l3", "electronics", 800, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("donutz", "food", 3, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("snickers", "food", 1, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("storage bins", "home", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("love seat", "home", 30, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("rogue one", "electronics", 8, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("moonshine", "food", 10, 33);

SELECT * FROM products;