const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, "inavlid price"]
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "invalid quantity"]
    },
    category: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;