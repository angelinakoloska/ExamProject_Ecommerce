const express = require('express');
const router = express.Router();
const db = require('../models');
const MembershipService = require('../services/MembershipService');
const membershipService = new MembershipService(db);
var { ensureAdmin,ensureAuth } = require('../middleware/middleware');

router.get('/', ensureAuth, async function(req, res, next) {
    try {
        const memberships = await membershipService.fetchAllMemberships();
        res.status(200).json(memberships)
    } catch(err) {
        res.status(500).json({error: 'Error fetching membershups'});
    }
});

module.exports = router;