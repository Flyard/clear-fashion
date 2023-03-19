const mongoose = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    brand: String,
    name: String,
    price: Number,
    date: Date
}, {
    collection: 'products'
});

const Products = mongoose.model("products", ProductSchema);

module.exports = Products;