const express = require('express');
const routerC = express.Router();

const { getCarts, getCartsById, addCarts, addProductToCart, deleteAllProdbyId, deleteProdbyId } = require('../controllers/carts');

routerC.get('/', getCarts);
routerC.get('/:id', getCartsById);
routerC.post('/', addCarts);
routerC.post('/:cid/product/:pid', addProductToCart);
routerC.delete('/:id', deleteAllProdbyId);
routerC.delete('/:id/products/:pid', deleteProdbyId);

module.exports = routerC;