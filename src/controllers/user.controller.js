const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, rideService, rewardService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const getUserByEmail = catchAsync(async (req, res) => {
  const user = await userService.getUserByEmail(req.params.email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const changeGear = catchAsync(async (req, res) => {
  const user = await userService.gearChange(req.params.userId, req.body.coins, req.body.gearchange);

  res.status(httpStatus.CREATED).send(user);
});

const updateCoins = catchAsync(async (req, res) => {
  const userCoins = await userService.updateCoins(req.params.userId, req.body.coins);
  res.status(httpStatus.CREATED).send(userCoins);
});

const getCoins = catchAsync(async (req, res) => {
  const userCoins = await userService.getCoins(req.params.userId);
  res.status(httpStatus.OK).send(userCoins);
});

const getCityByName = catchAsync(async (req, res) => {
  console.log(req.query);
  const city = await userService.getCityByName(req.query.city);
  res.status(httpStatus.OK).send(city);
});

const getTotalCounts = catchAsync(async (req, res) => {
  const usersCount = await userService.totalUsers();
  const coinsCount = await rideService.totalCoins();
  const couponsCount = await rewardService.totalCoupons();
  const rewardCount = await rewardService.totalRewards();
  const ridesCount = await rideService.totalRides();
  const counts ={ "users" : usersCount, "coins": coinsCount, "coupons": couponsCount, "rides": ridesCount , "rewards": rewardCount };
  res.status(httpStatus.OK).send(counts);
});

const block = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, {"blocked": true});
  res.send(user);
});

const unblock = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, {"blocked": false});
  res.send(user);
});

const alldetails = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  const coins = await userService.getCoins(req.params.userId);
  const coupons = await rewardService.getRedeemedRewardsByUser(req.params.userId);
  const rides = await rideService.getSummaryLifetime(req.params.userId);
  const allDetails ={ "user" : user, "coins": coins, "orders": coupons, "rides": rides };
  res.status(httpStatus.OK).send(allDetails);
});


module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  getCityByName,
  changeGear,
  updateCoins,
  getCoins,
  getTotalCounts,
  block,
  unblock,
  alldetails
};
