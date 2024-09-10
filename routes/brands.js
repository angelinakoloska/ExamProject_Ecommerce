const express = require('express');
const router = express.Router();
const db = require('../models');
const BrandService = require('../services/BrandService');
const brandService = new BrandService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');

router.get('/', async function(req, res, next) {
    try {
        const brands = await brandService.fetchAllBrands();
        res.render('brands', {brands: brands});
    } catch(err) {
        res.status(500).json({error: 'Error fetching brands'});
    }
});

module.exports = router;