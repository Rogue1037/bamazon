# bamazon



This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents two interfaces: **customer** and **manager**.

### MySQL Database Setup

In order to run this application, you should have the MySQL database already set up on your machine. If you don't, visit the [MySQL installation page](https://dev.mysql.com/doc/refman/5.6/en/installing.html) to install the version you need for your operating system. Once you have MySQL isntalled, you will be able to create the *Bamazon* database and the *products* table with the SQL code found in [bamazon.sql](bamazon.sql). Run this code inside your MySQL client like mysqlworkbeanch to populate the database, then you will be ready to proceed with running the Bamazon customer and manager interfaces.

### Customer Interface

The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, but I am getting a throw that will not update the quantity. If the desired quantity is not available, the user is prompted to start over.



To run the customer interface please follow the steps below:
	npm install
	node bamazonCustomer.js



### Bamazon Demo

You can download and watch the demo of the Bamazon customer interface at the link below. .

[Bamazon Demo]

https://drive.google.com/file/d/1vL-oKPL_gdW2INxdAvY_jWB5qY86f5Y8/view?usp=sharing


