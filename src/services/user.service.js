/* eslint-disable no-console */
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const Coin = require('../models/coin.model');
const City = require('../models/cities.model');
/**
 * Create a user
 * @param {Object} City
 * @returns {Promise<City>}
 */
// eslint-disable-next-line no-unused-vars
const getCityByName = async (city) => {
  const citinames = await City.find({"name": new RegExp('.*' + city + '.*', 'i')}, {"name":1});
  return citinames;
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
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
const queryUsers = async (filter, options) => {
  const searchfilter = {};
  for(var filt in filter)
  {
    const regex = new RegExp('.*' + filter[filt] + '.*', 'i');
    searchfilter[filt] = regex;
  }
  const users = await User.paginate(searchfilter, options);
  return users;
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
const queryUsersExact = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const gearChange = async (userId, coins, body) => {
  // const coin = await Coin.create({ user: userId, type: 'gearUpgrade', coins });
  const user = await getUserById(userId);
  Object.assign(user, body);
  await user.save();
  return user;
};

const getCoins = async (userId) => {
  const coin = await Coin.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$coins',
        },
      },
    },
  ]);
  //console.log(coin);
  return coin;
};

const getCoinsList = async (userId) => {
  const coins = await Coin.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    }]);
  //console.log(coin);
  return coins;
};

// eslint-disable-next-line no-unused-vars
const updateCoins = async (userId, coins) => {
  // const coin = await Coin.create({ user: userId, type: 'redeemReward', coins });
  const totalCoins = await Coin.aggregate([
    {
      $match: { user: mongoose.Types.ObjectId(userId) },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: '$coins',
        },
      },
    },
  ]);
  return totalCoins;
};
const totalUsers = async () => {
    const totalUsers = await User.count();
    return totalUsers;
};



module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getCityByName,
  gearChange,
  getCoins,
  updateCoins,
  totalUsers,
  getCoinsList,
  queryUsersExact
};
