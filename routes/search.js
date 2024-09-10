var express = require('express');
var router = express.Router();
const db = require('../models');
const ProductService = require('../services/ProductService');
const productService = new ProductService(db);
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService(db);
const BrandService = require('../services/BrandService');
const brandService = new BrandService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');


router.post('/', ensureAuth, ensureAdmin, async function(req, res) {
    // try {
    //     let products = productService.fetchAllProducts();
    //     let categories = categoryService.fetchAllCategories();
    //     let brands = brandService.fetchAllBrands();
    //     const {product, category, brand} = req.body
    //     let productQuery = 'SELECT * FROM Products WHERE isdeleted = false';
    //     let brandQuery = 'SELECT * FROM Brands';
    //     let categoryQuery = 'SELECT * FROM Products WHERE isdeleted = false';
    // }catch(err){

    // }

    // I had to use ChatGPT here, because I was unable to create the search by myself
        const { query, category, brand } = req.body;

    try {
        let searchQuery = `
        SELECT 
            p.*, c.name as category, b.name as brand
        FROM 
            Products AS p
        JOIN 
            Categories AS c ON p.CategoryId = c.id
        JOIN 
            Brands AS b ON p.brandId = b.id
        WHERE 
            p.isdeleted = false 
        `;

        if (query) {
        searchQuery += ` AND p.name LIKE '%${query}%'`;
        }

        if (category) {
        searchQuery += ` AND c.name = '${category}'`;
        }

        if (brand) {
        searchQuery += ` AND b.name = '${brand}'`;
        }

        const products = await db.sequelize.query(searchQuery, { type: db.sequelize.QueryTypes.SELECT });

        res.status(200).json({ status: 'success', data: { result: 'Products found', products, count: products.length } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Error searching products' });
    }
});

module.exports = router;