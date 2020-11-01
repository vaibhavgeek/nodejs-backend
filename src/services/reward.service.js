const Reward = require('../models/reward.model');
const Coupon = require('../models/coupon.model');

const httpStatus = require('http-status');
const shortid = require('shortid');

const { User } = require('../models');
const ApiError = require('../utils/ApiError');



/**
 * Create a Reward
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createReward = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
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
};
