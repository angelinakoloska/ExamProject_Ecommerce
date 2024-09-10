const express = require('express');
const router = express.Router();
const db = require('../models');
const ProductService = require('../services/ProductService');
const productService = new ProductService(db);
const BrandService = require('../services/BrandService');
const brandService = new BrandService(db);
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService(db);
// var { ensureAdmin,ensureAuth } = require('../middleware/middleware');
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json();

router.get('/', async function(req, res) {
    try {
        const products = await productService.fetchAllProducts(); // Fetch products
        const brands = await brandService.fetchAllBrands(); // Fetch brands
        const categories = await categoryService.fetchAllCategories(); // Fetch categories

        // Check that data is being retrieved correctly
        console.log('Products:', products);
        console.log('Brands:', brands);
        console.log('Categories:', categories);

        // Pass all the necessary data to the EJS template
        res.render('products', { products, brands, categories });
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).json({ error: 'Error fetching data', err });
    }
});


module.exports = router;