const Product = require("../models/product");

module.exports.add = async function (req, res) {
    try {
        await Product.create(req.body);
        return res.status(200).json({
            status: "success"
        });
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: `${err}`
        });
    }
}

module.exports.view = async function (req, res) {
    try {
        let products = await Product.find();
        return res.status(200).json({
            products: products || []
        });
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: `${err}`
        });
    }
}

module.exports.update = async function (req, res) {
    try {
        let product = await Product.findById(req.params.id);
        if (product) {
            if (req.body.price) {
                product.price = req.body.price;
            }
            if (req.body.quantity) {
                product.quantity = req.body.quantity;
            }
            if (req.body.category) {
                product.category = req.body.category;
            }
            await product.save();
            return res.status(200).json({
                status: "success"
            });
        } else {
            return res.status(409).json({
                status: "failure",
                reason: "This product not exist"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: `${err}`
        });
    }
}

module.exports.delete = async function (req, res) {
    try {
        let product = await Product.findById(req.params.id);
        console.log(product);
        if (product) {
            await Product.remove(product);
            return res.status(200).json({
                status: "success"
            });
        } else {
            return res.status(409).json({
                status: "failure",
                reason: "This product not exist"
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: "Internal server error"
        });
    }
}

module.exports.viewLatest = async function (req, res) {
    try {
        let products = await Product.find().select({name: 1, price: 1, quantity:1, category:1}).sort({createdAt: -1}).limit(4);
        return res.status(200).json({
             products: products || []
        });
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: "Internal server error"
        });
    } 
}

module.exports.search = async function (req, res) {
    try {
        if(req.body.nameSearch && req.body.categorySearch) {
            let products = await Product.find({ name: { $regex: req.body.nameSearch, $options: "i" }, category: req.body.categorySearch});
            return res.status(200).json({
                products: products || []
           });
        } else if(req.body.nameSearch){
            let products = await Product.find({ name: { $regex: req.body.nameSearch, $options: "i" }});
            return res.status(200).json({
                products: products || []
           });
        } else if(req.body.categorySearch) {
            let products = await Product.find({ category: req.body.categorySearch});
            return res.status(200).json({
                products: products || []
           });
        }
    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: "Internal server error"
        });
    } 
}