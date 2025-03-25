const express = require("express");
const router = express.Router();
const products      = require("./products");
const vistaProducts = require("./views.router");
const carts = require("./carts");

router.use("/api/products/", products);
router.use("/products/", vistaProducts);
router.use("/api/carts/", carts);

module.exports = router;