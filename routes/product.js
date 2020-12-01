const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers")

router.post("/add", productController.add);

module.exports = router;