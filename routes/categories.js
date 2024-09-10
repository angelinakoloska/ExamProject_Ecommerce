const express = require('express');
const router = express.Router();
const db = require('../models');
const CategoryService = require('../services/CategoryService');
const categoryService = new CategoryService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');

router.get('/', async function(req, res, next) {
    try {
        const categories = await categoryService.fetchAllCategories();
        res.render('categories', {categories: categories})
    } catch(error) {
        res.status(500).json({error: 'Error fetching categories'});
    }
});

module.exports = router;