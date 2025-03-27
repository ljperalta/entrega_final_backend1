const express = require('express')
const router = express.Router()
const Product = require('../models/product');
const products = require('../managers/products');

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Página actual y límite de resultados por página
        //! Mostrar el paso a paso de como Implementar el paginate con mongoose-paginate-v2
        //! Ir al Model student.js para ver el plugin mongoosePaginate
        const options = {
          page: parseInt(page),
          limit: parseInt(limit),
          sort: { grade: -1 },
        };
    
        const result = await Product.paginate({}, options);
        console.log(result)
        res.render("view_products", {
          products: result.docs,
          currentPage: result.page,
          totalPages: result.totalPages,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          prevPage: result.prevPage,
          nextPage: result.nextPage,
        });
      } catch (err) {
        res.status(500).send(err.message);
      }
})

module.exports = router