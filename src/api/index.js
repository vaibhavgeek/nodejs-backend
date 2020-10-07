const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const profile = require('./profile');
const info = require('./info');
//const event = require('./event');
//const club  = require('./club');
//const reward = require('./reward');
//const shop = require('./shop');


router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/profile', profile);
router.use('/api/info',info);
// router.use('/api/events', event);
// router.use('/api/clubs', club);
// router.use('/api/rewards' , reward);
// router.use('/api/shops', shop);

module.exports = router;
