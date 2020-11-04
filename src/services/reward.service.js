/* eslint-disable no-console */
const httpStatus = require('http-status');
const shortid = require('shortid');
const moment = require('moment');
const Reward = require('../models/reward.model');
const Coupon = require('../models/coupon.model');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

/**
 * Create a Reward
 * @param {Object} body
 * @returns {Promise<Reward>}
 */
const createReward = async (body) => {
  const reward = await Reward.create(body);
  return reward;
};

const createCoupons = async (body, rewardId) => {
  const obj = JSON.parse(JSON.stringify(body));
  obj.rewardId = rewardId;
  obj.expiryDate = moment(obj.expiryDate).valueOf();
  console.log(`OBJ: ${JSON.stringify(obj)}`);
  const reward = await Coupon.create(obj);
  Object.assign(reward, obj);
  await reward.save();
  return reward;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRewards = async (filter, options) => {
  const rewards = await Reward.paginate(filter, options);
  return rewards;
};

/**
 * Get Reward by id
 * @param {ObjectId} id
 * @returns {Promise<Reward>}
 */
const getRewardById = async (id) => {
  return Reward.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateRewardById = async (rewardId, updateBody) => {
  const reward = await userService.getUserById(rewardId);
  if (!reward) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reward not found');
  }
  Object.assign(reward, updateBody);
  await reward.save();
  return reward;
};

const getRedeemedRewardsByUser = async (userId) => {
  const coupons = await Coupon.find({ user: userId });
  return coupons;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteRewardById = async (userId) => {
  const user = await userService.getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const redeemRewardById = async (rewardId, userId) => {
  const tranxid = shortid.generate();
  console.log(tranxid);
  const reward = await getRewardById(rewardId, { $inc: { availableCount: -1 } });
  console.log(reward);
  const coupon = await Coupon.findOne({ rewardId });
  if (!coupon) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Coupon found for this reward');
  } else {
    Object.assign(coupon, { redeemed: true, orderNumber: tranxid, userId });
    coupon.save();
  }
  return coupon;
};

module.exports = {
  createReward,
  queryRewards,
  getRewardById,
  updateRewardById,
  getRedeemedRewardsByUser,
  deleteRewardById,
  redeemRewardById,
  createCoupons,
};
