var express = require('express');
var router = express.Router();
var db = require('../models');
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var UserService = require("../services/UserService")
var userService = new UserService(db);
var RoleService = require('../services/RoleService');
var roleService = new RoleService(db);
var StatusService = require('../services/StatusService');
var statusService = new StatusService(db);
var CategoryService = require('../services/CategoryService');
var categoryService = new CategoryService(db);
var BrandService = require('../services/BrandService');
var brandService = new BrandService(db);
var ProductService = require('../services/ProductService');
var productService = new ProductService(db);


router.post('/login', jsonParser, async function(req, res, next) {
  const { userCredential, password } = req.body;

  if (!userCredential || !password) {
    return res.status(400).json({ status: 'error', data: { msg: 'Username/Email and password required' } });
  }

  try {
    const user = userCredential.includes('@')
      ? await userService.fetchUserByEmail(userCredential)
      : await userService.fetchUserByUsername(userCredential);

    if (!user) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(user.encryptedPassword, 'hex'), hashedPassword)) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    if (!process.env.TOKEN_SECRET) {
      console.error('Token secret not set');
      return res.status(500).json({ status: 'error', data: { msg: 'Token secret not set' } });
    }

    
    const role = await user.getRole();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: role.name },
      process.env.TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ status: 'success', message: 'You are logged in', token });
  } catch (err) {
    console.error('Error generating token:', err);
    res.status(500).json({ status: 'error', data: { msg: 'Error generating token' } });
  }
})

router.get('/', async function(req, res, next) {
    // #swagger.tags = ['Admin']
  // in order to get it to work i think that I should have copied over the code from the /login endpoint
  const { userCredential, password } = req.body;

  if (!userCredential || !password) {
    return res.status(400).json({ status: 'error', data: { msg: 'Username/Email and password required' } });
  }

  try {
    const user = userCredential.includes('@')
      ? await userService.fetchUserByEmail(userCredential)
      : await userService.fetchUserByUsername(userCredential);

    if (!user) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, 'sha256');
    if (!crypto.timingSafeEqual(Buffer.from(user.encryptedPassword, 'hex'), hashedPassword)) {
      return res.status(401).json({ status: 'error', data: { msg: 'Incorrect username/email or password' } });
    }

    if (!process.env.TOKEN_SECRET) {
      console.error('Token secret not set');
      return res.status(500).json({ status: 'error', data: { msg: 'Token secret not set' } });
    }

    
    const role = await user.getRole();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: role.name },
      process.env.TOKEN_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({ status: 'success', message: 'You are logged in', token });
  } catch (err) {
    console.error('Error generating token:', err);
    res.status(500).json({ status: 'error', data: { msg: 'Error generating token' } });
  }
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
    });

    res.render('users', { users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;