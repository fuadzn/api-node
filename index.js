const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

//parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "api-node-product",
});

//connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected!");
});

//show all products
app.get("/api/products", (req, res) => {
  let sql = "SELECT * FROM products";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//show single product
app.get('/api/products/:id',(req, res) => {
  let sql = "SELECT * FROM products WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//add new product
app.post('/api/products',(req, res) => {
  let data = {name: req.body.name, price: req.body.price};
  let sql = "INSERT INTO products SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE products SET name='"+req.body.name+"', price='"+req.body.price+"' WHERE id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

//delete product
app.delete("/api/products/:id", (req, res) => {
  let sql = "DELETE FROM products WHERE id=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
  });
});

//server listening
app.listen(3000, () => {
  console.log("Server started on 3000...");
});
