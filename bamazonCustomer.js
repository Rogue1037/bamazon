var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    console.log("Welcome to BamaZON!!");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push("Item ID: " + results[i].item_id + " " + "Product Name: " + results[i].product_name + " " + "$" + results[i].price + " " + "Dept: " + results[i].department_name + " " + "Inventory: " + results[i].stock_quantity);
                        }

                        return choiceArray;

                    },
                    message: "What product would you like to buy?"
                },
                {
                    name: "product",
                    type: "number",
                    message: "How many would you like?"
                }
            ])
            .then(function (answer) {

                var item = answer.product_name;
                console.log(item);

                var quantity = answer.stock_quantity;


                var queryInventory = 'SELECT * FROM products WHERE ?';

                connection.query(queryInventory, { product_name: item }, function (err, data) {
                    if (err) throw err;
                    if (data.length === 0) {
                        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                        start();
                    } else {
                        var productData = data[0];


                        if (quantity <= productData.stock_quantity) {
                            console.log('Congratulations, the product you requested is in stock! Placing order!');


                            var updateQueryInventory = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE product_name = ' + item;

                            connection.query(updateQueryInventory, function (err, data) {
                                if (err) throw err;

                                console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                                console.log('Thank you for shopping with us!');
                                console.log("\n---------------------------------------------------------------------\n");


                                connection.end();
                            });
                        } else {
                            console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                            console.log('Please modify your order.');
                            console.log("\n---------------------------------------------------------------------\n");
                            start();
                        }

                    }
                });
            });
    });

}










