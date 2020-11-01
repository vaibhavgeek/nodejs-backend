const express = require('express');
const rewardsController = require('../../controllers/rewards.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rewardValidation = require('../../validations/reward.validation');

const router = express.Router();

//creates reward
router.route('/:user/rewards/create').post(auth('manageRides'), validate(rideValidation.createRide), rideController.createRide);

module.exports = router;