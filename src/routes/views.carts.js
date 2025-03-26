const express = require('express')
const router = express.Router()
const { getCartsByIdVista } = require('../controllers/carts');

router.get('/', async (req, res) => {
    console.log(req.params)
    try {
        const carts = await getCartsByIdVista(); 
        
        res.render("view_carts", {layout: "carts", carts });
    } catch (error) {
        res.status(500).send("Error al cargar los productos");
    }
})

module.exports = router