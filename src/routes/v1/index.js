const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const rideRoute = require('./ride.route');

const router = express.Router();

router.use('/api/auth', authRoute);
router.use('/api/users', userRoute);
router.use('/api/docs', docsRoute);
router.use('/api/profile', rideRoute);

module.exports = router;
