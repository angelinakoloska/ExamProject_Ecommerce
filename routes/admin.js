var express = require('express');
var router = express.Router();
var db = require('../models');
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');


router.get('/', async function(req, res, next) {
    // #swagger.tags = ['Admin']
  // in order to get it to work i think that I should have copied over the code from the /login endpoint
  res.render('adminDashboard');
});

router.get('/products', async (req, res) => {
  // #swagger.tags = ['Admin']
  try {
    const products = await db.Product.findAll({
      where: {
        isdeleted: false
      }
    });
    const brands = await db.Brand.findAll();
    const categories = await db.Category.findAll();

    res.render('products', { products, brands, categories });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/brands', async (req, res) => {
  try {
    const brands = await db.Brand.findAll({
      where: {
      
      }
    });

    res.render('brands', { brands });
  } catch (error) {
    console.error('Error retrieving brands:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      where: {
      
      }
    });

    res.render('categories', { categories });
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/roles',ensureAdmin, ensureAuth, async (req, res) => {
  try {
    const roles = await db.Role.findAll({
      where: {
      
      }
    });

    res.render('roles',ensureAdmin, ensureAuth, { roles });
  } catch (error) {
    console.error('Error retrieving roles:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users',ensureAdmin, ensureAuth, async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
      
      }
      // should have imported the roles table here to
    });

    res.render('users', { users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;