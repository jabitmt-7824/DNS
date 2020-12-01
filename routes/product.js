const express = require("express");
const router = express.Router();
const passport = require("passport");

const productController = require("../controllers/productControllers")

router.post("/add", passport.authenticate("jwt", {session:false}), productController.add);
router.post("/update/:id", passport.authenticate("jwt", {session:false}), productController.update);

module.exports = router;