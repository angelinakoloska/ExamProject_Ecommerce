const express = require('express');
const router = express.Router();
const db = require('../models');
const UserService = require('../services/UserService');
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');

const userService = new UserService(db);

router.post('/', ensureAdmin,ensureAuth, async (req, res) => {
  try {
    const user = await userService.generateUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

router.get('/:id',ensureAdmin,ensureAuth, async (req, res) => {
  try {
    const user = await userService.fetchUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

router.get('/', ensureAdmin,ensureAuth, async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});


router.put('/:id', ensureAuth, async (req, res) => {
  try {
    const user = await userService.modifyUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});


router.delete('/:id', ensureAdmin,ensureAuth, async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;