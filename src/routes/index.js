const express = require("express");
const router = express.Router();
const products = require("./products");
const carts = require("./carts");
const vistaProducts = require("./views.router");
const vistaCarts = require("./views.carts");

router.use("/api/products/", products);
router.use("/api/carts/", carts);
router.use("/products/", vistaProducts);
router.use("/carts/", vistaCarts);

module.exports = router;