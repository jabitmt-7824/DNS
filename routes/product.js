const express = require("express");
const router = express.Router();
const passport = require("passport");

const productController = require("../controllers/productControllers")

router.post("/add", passport.authenticate("jwt", {session:false}), productController.add);
router.post("/update/:id", passport.authenticate("jwt", {session:false}), productController.update);
router.delete("/delete/:id", passport.authenticate("jwt", {session:false}), productController.delete);
router.get("/view-latest", passport.authenticate("jwt", {session:false}), productController.viewLatest);
router.get("/search", passport.authenticate("jwt", {session:false}), productController.search);

module.exports = router;