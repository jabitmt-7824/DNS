const Product = require("../models/product");
const User = require("../models/user");

module.exports.add = async function (req, res) {
    try {
         let product = User.find({name:req.body.name});
         if(product){
            return res.status(409).json({
                status: "failure",
                reason: "This product already exist"
            }); 
         }
         else if(req.body.price <= 0){
            return res.status(400).json({
                status: "failure",
                reason: "invalid price"
            });
         } else if(req.body.quantity <= 0) {
            return res.status(400).json({
                status: "failure",
                reason: "invalid quantity"
            });
         } else {
             Product.create(req.body);
             return res.status(200).json({
                status: "success"
            });
         }

    } catch (err) {
        return res.status(500).json({
            status: "failure",
            reason: `Internal server error ${error}`
        });
    }
}