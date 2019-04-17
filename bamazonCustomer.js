var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazonDB"
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Whole numbers only please.';
    }
}

connection.connect(function (err) {
    if (err) throw err;
    displayInventory();
});

function start() {
    console.log("Welcome to BamaZON!!");
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "choice",
                type: "input",
                message: "What Item ID would you like to buy?",
                validate: validateInput,
                filter: Number

            },
            {
                name: "product",
                type: "input",
                message: "How many would you like?",
                validate: validateInput,
                filter: Number

            }
        ])
            .then(function (input) {

                var item = input.choice;
               
                var quantity = input.product;
              



                var queryInventory = 'SELECT * FROM products WHERE ?';

                connection.query(queryInventory, { item_id: item }, function (err, data) {
                    if (err) throw err;
                    if (data.length === 0) {
                        console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                        start();
                    } else {
                        var productData = data[0];
                        

                        if (quantity <= productData.stock_quantity) {
                            console.log('Awesome, we will ship it out right away!');


                            var updateQueryInventory = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE product_name = ' + item;
                            


                            connection.query(updateQueryInventory, function (err, data) {


                                if (err) throw err;


                                console.log('Your total is $' + productData.price * quantity);
                                console.log('Thank you for shopping with us!');
                                console.log("\n---------------------------------------------------------------------\n");


                                connection.end();
                            });
                        } else {
                            console.log('Sorry, there is not enough product in stock.');
                            console.log("\n---------------------------------------------------------------------\n");
                            start();
                        }

                    }
                });
            });
    });

}
function displayInventory() {

    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }
        start();
    });
}













