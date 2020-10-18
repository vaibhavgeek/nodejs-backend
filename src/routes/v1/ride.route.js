const express = require('express');
const rideController = require('../../controllers/ride.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rideValidation = require('../../validations/ride.validation');

const router = express.Router();

router.route('/:userId/rides/create').post(auth('addRides'), validate(rideValidation.createRide), rideController.createRide);
router
  .route('/:userId/rides/create-many')
  .post(auth('addRides'), validate(rideValidation.createRides), rideController.createManyRides);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Ride management and retrieval
 */
