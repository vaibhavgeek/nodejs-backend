const httpStatus = require('http-status');
const rideService = require('../services/ride.service');
const catchAsync = require('../utils/catchAsync');

const createRide = catchAsync(async (req, res) => {
  const ride = await rideService.createRide({ ...req.body, ...req.params });
  res.status(httpStatus.CREATED).send(ride);
});

const createManyRides = catchAsync(async (req, res) => {
  // insert user id in ride in ridearray
  req.body.forEach(function(ride) 
  { 
    ride.user = req.params.user;
  });
  const rides = await rideService.createRides(req.body);
  res.status(httpStatus.CREATED).send(rides);
});

const getRides = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rideService.queryUsers(filter, options);
  res.send(result);
});

const updateRide = catchAsync(async (req, res) => {
  const ride = await rideService.updateRideById(req.params.ride, req.body);
  res.send(ride);
});

const deleteRide = catchAsync(async (req, res) => {
  const ride = await rideService.deleteRideById(req.params.ride);
  res.status(httpStatus.OK).send(ride);
});

const redeemCoin = catchAsync(async (req,res) => {
  console.log("params: ",req.params);
  console.log("body: ", req.body);
  console.log("query", req.query);
  const coin = await rideService.redeemCoin(req.params.user, req.params.ride);
  res.status(httpStatus.OK).send(coin);
});

const getSummaryByMonth = catchAsync(async (req,res) => {
  const rides = await rideService.getSummaryByMonth(req.params.user, req.params.month);
  res.send(rides);
});

const getSummaryLifetime = catchAsync(async (req,res) => {
  const rides = await rideService.getSummaryLifetime(req.params.user);
  res.status(httpStatus.OK).send(rides);
});

module.exports = {
  createRide,
  createManyRides,
  updateRide,
  deleteRide,
  redeemCoin,
  getRides,
  getSummaryByMonth,
  getSummaryLifetime,
  redeemCoin
};
