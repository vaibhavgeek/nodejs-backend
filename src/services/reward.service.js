const Reward = require('../models/reward.model');
const Coupon = require('../models/coupon.model');

const httpStatus = require('http-status');
const shortid = require('shortid');

const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const moment = require("moment");


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
  // console.log(`body: ${JSON.stringify(body)}`)
  // body.forEach(function(reward) 
  // { 
  //   reward.rewardId = rewardId;
  // });
  // body.rewardId = rewardId;
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
  const reward = await getUserById(rewardId);
  if (!reward) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reward not found');
  }
  Object.assign(reward, updateBody);
  await reward.save();
  return reward;
};

const getRedeemedRewardsByUser = async (userId) => {
  const coupons = await Coupon.find({user: userId});
  return coupons;
  };

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteRewardById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const redeemRewardById = async(rewardId, rideId) => {
    const tranxid = shortid.generate();
    const reward = await getRewardById(rideId, {"$inc": {"availableCount": -1}});
    const coupon = await Coupon.findOneAndUpdate({ "rewardId": rewardId }, {"redeemed": true, "orderNumer": tranxid, "userId": userId});
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
    createCoupons
};
