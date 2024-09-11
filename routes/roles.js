var express = require('express');
var router = express.Router();
const db = require('../models');
var RoleService = require('../services/RoleService');
var roleService = new RoleService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');



router.get('/',async function (req, res, next) {
  try {
    let roles = await roleService.fetchAllRoles();
    res.render('roles', {roles: roles})
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "Error", error: "Error getting roles" })
  }
});

module.exports = router;