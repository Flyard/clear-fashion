const Product = require("./products.model");

async function findAllLimit(limit = 12, brand, price) {
    const options = {};
    if(brand){options.brand = brand}
    if(price){options.price = price}

    return Product.find(options).limit(limit);
}

async function findAll() {
    return Product.find();
}

async function findId(id){
    return Product.findById(id);
} 

module.exports = {
    findAll,
    findId,
    findAllLimit
}