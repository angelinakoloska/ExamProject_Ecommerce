const express = require('express');
const router = express.Router();
const db = require('../models');
const CartService = require('../services/CartService');
const cartService = new CartService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');


// Get the active cart for the logged-in user
router.get('/',ensureAuth, async (req, res) => {
  try {
    const cart = await cartService.fetchCartByUserId(req.user.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/item', ensureAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity, price } = req.body;
    if (!productId || !quantity || !price) {
      return res.status(400).json({ error: 'Product ID, quantity, and price are required' });
    }

    let cart = await cartService.getCartByUserId(req.user.id);
    if (!cart) {
      cart = await cartService.generateCart(req.user.id);
    }

    await cartService.insertItemToCart(cart.id, productId, quantity, price);
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});


router.post('/checkout', ensureAuth, async (req, res) => {
  try {
    const order = await cartService.checkoutCart(req.user.id);
    res.status(200).json({ message: 'Checkout successful', order });
  } catch (error) {
    console.error('Error checking out cart:', error);
    res.status(500).json({ error: 'Failed to checkout cart' });
  }
});

module.exports = router;