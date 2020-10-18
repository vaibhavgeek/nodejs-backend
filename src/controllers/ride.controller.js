const httpStatus = require('http-status');
const rideService = require('../services/ride.service');
const catchAsync = require('../utils/catchAsync');

const createRide = catchAsync(async (req, res) => {
  // console.log("params: ",req.params);
  // console.log("body: ", req.body);
  // console.log("query", req.query);
  const ride = rideService.createRide({ ...req.body, ...req.params });
  res.status(httpStatus.CREATED).send(ride);
});

const createManyRides = catchAsync(async (req, res) => {
  const rides = rideService.createRides(req.body);
  res.status(httpStatus.CREATED).send(rides);
});

module.exports = {
  createRide,
  createManyRides,
};
