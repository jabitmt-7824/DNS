const express = require("express");
const router = express.Router();

// user routes
router.use("/user", require("./user"));
router.use("/product", require("./product"));

module.exports = router;