const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const fs = require('fs');
const Coin = require('../models/coin.model');
const mongoose = require("mongoose");


/**
 * Create a user
 * @param {Object} City
 * @returns {Promise<City>}
 */
const getCityByName = async (city) => {

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
  const coin = await Coin.create({"user":userId, "type": "gearUpgrade", "coins": coins });
  const user = await getUserById(userId);
  Object.assign(user, body);
  await user.save();
  return user;
};

const getCoins = async (userId) => {
  //const coin = await Coin.find({user: userId});
  const coin = await Coin.aggregate([
    {
      $match: {user: mongoose.Types.ObjectId(userId)}
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$coins"
        }
      }
    }
  ]);
  console.log(coin);
  return coin;
};

const updateCoins = async (userId, coins) => {
  const coin = await Coin.create({"user":userId, "type": "redeemReward", "coins": coins }); 
  const totalcoins = await Coin.aggregate([
    {
      $match: {user: mongoose.Types.ObjectId(userId)}
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$coins"
        }
      }
    }
  ]);
  return totalcoins;
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
  updateCoins
};
