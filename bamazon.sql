DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (

    item_id INT NOT NULL AUTO_INCREMENT,

    product_name VARCHAR(30) NOT NULL,

    department_name VARCHAR(30),

    price INT NOT NULL,

    stock_quantity INT NOT NULL
);

