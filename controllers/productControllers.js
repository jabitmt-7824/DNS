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