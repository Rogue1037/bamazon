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
                            choiceArray.push(results[i].product_name + " " + results[i].price + " " + results[i].department_name + " " + results[i].stock_quantity);
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

                var chosenItem = [];
                for (var i = 0; i < results.length; i++) {
                    if (results[i].stock_quanity === answer.choice) {
                        chosenItem = results[i];
                        console.log(chosenItem);
                    }
                }

                if (chosenItem > parseInt(answer.stock_quanity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quanity: - 1
                            },
                            {
                                id: results[i].item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("purchased!");
                            start();
                        }
                    );
                }
                else {
                    console.log("sold out. Please look at our other items.");
                
                }
                start();
                
            });
    });
}










