const express = require('express');
const rideController = require('../../controllers/ride.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const rideValidation = require('../../validations/ride.validation');

const router = express.Router();

//creates single ride
router.route('/:user/rides/create').post(auth('manageRides'), validate(rideValidation.createRide), rideController.createRide);
//creates multiple rides
router
  .route('/:user/rides/create-many')
  .post(auth('manageRides'), validate(rideValidation.createRides), rideController.createManyRides);
//update and delete a ride
  router
  .route('/:user/rides/:ride')
  .patch(auth('manageRides'), validate(rideValidation.updateRide), rideController.updateRide)
  .delete(auth('manageRides'), validate(rideValidation.deleteRide), rideController.deleteRide);
// get lifetime rides summary 
router.route('/:user/rides/summary/lifetime').get(auth('manageRides'), validate(rideValidation.getSummaryLifetime), rideController.getSummaryLifetime); 
//get ride summary by month
router.route('/:user/rides/summary/:month').get(auth('manageRides'), validate(rideValidation.getSummaryByMonth), rideController.getSummaryByMonth); 
// redeem coins 
router.route('/:user/rides/:ride/redeemcoin').post(auth('manageRides') , validate(rideValidation.redeemCoin), rideController.redeemCoin);

module.exports = router;