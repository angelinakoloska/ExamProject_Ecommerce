const express = require('express');
const router = express.Router();
const db = require('../models');
const OrderService = require('../services/OrderService');
const orderService = new OrderService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');


router.get('/', ensureAuth, async (req, res) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user.id);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});


router.get('/all', ensureAuth, ensureAdmin, async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Failed to get orders' });
  }
});


router.put('/:id', ensureAuth, ensureAdmin, async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;