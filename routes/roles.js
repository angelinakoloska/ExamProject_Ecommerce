var express = require('express');
var router = express.Router();
const db = require('../models');
var RoleService = require('../services/RoleService');
var roleService = new RoleService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');



router.get('/', ensureAuth, ensureAdmin,async function (req, res, next) {
  try {
    let roles = await roleService.fetchAllRoles();
    res.status(200).json({ result: "Success", roles: roles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "Error", error: "Error getting roles" })
  }
});

module.exports = router;