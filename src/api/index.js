const express = require('express');

const {Router} = express;
const router = new Router();

const user = require('./user');
const session = require('./session');
const demo = require('./demo');

router.use('/api/users', user);
router.use('/api/sessions', session);
router.use('/api/demo', demo);


module.exports = router;
