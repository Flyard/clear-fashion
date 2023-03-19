const express = require("express");
const mongoose = require("mongoose");
const products = require('./products/products.controller')
require('dotenv').config();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/products', products);



app.get('/', async (req, res) => {
    res.status(200).send('Hello World');
})


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Database");
    app.listen(port, () => {
      console.log(
        `API listening on port ${port}, visit http://localhost:${port}/`
      );
    });
  }


main();
