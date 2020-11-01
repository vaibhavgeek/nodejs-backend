const Ride = require('../models/ride.model');
const Coin = require('../models/coin.model');

const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const { response } = require('express');

/**
 * Get Ride by id
 * @param {ObjectId} id
 * @returns {Promise<Ride>}
 */
const getRideById = async (id) => {
  return Ride.findById(id);
};


/**
 *
 * @param {Object} rideBody
 * @returns {Promise<Ride>}
 */
const createRide = async (rideBody) => {
  //console.log("ride body: ", rideBody);
  const ride = await Ride.create(rideBody);
  //console.log("ride created", ride);
  return ride;
};

/**
 *
 * @param {Object} rideArray
 * @returns {Promise<Rides>}
 */
const createRides = async (rideArray) => {
 const rides = await Ride.insertMany(rideArray);
 //console.log("ride created", rides);
 return rides;
};


/**
 * Query for rides
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRides = async (filter, options) => {
  const rides = await Ride.paginate(filter, options);
  return rides;
};
/**
 * Update user by id
 * @param {ObjectId} rideId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateRideById = async (rideId, updateBody) => {
  const ride = await getRideById(rideId);
  if (!ride) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
  }
  
  Object.assign(ride, updateBody);
  await ride.save();
  return ride;
};
/**
 * Delete Ride by id
 * @param {ObjectId} rideId
 * @returns {Promise<Ride>}
 */
const deleteRideById = async (rideId) => {
  const ride = await getRideById(rideId);
  if (!ride) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Ride not found');
  }
  await ride.remove();
  return ride;
};

/**
 * Get Ride Summary by month
 * @param {ObjectId} userId
 * @param {String} month
 * @returns {Promise<Rides>}
*/

const getSummaryByMonth = async(userId, month) => {
  // const rides = await Ride.aggregate([
  //   {"$project": {"month": {"$month" : "$createdAt"}}},
  //   { "$match": { "user": userId , "month": month }},
  //   { "$group": {
  //       "$eq":[{"$month": "$createdAt"}, month ],
  //       }
  //   }
  
  // ]);
  const rides = await Ride.find({ user: userId,
    "$expr": {
      "$eq":[{"$month": "$createdAt"}, month ]
    }
  });
  return rides;
};
/**
 * Get Lifetime Rides of user
 * @param {ObjectId} userId
 * @returns {Promise<Rides>}
 */

const getSummaryLifetime = async(userId) => {
    const rides = await Ride.find({user: userId});
    console.log(rides);
    return rides;
};
/**
 * Redeem Coins of Rides
 * @param {ObjectId} userId
 * @param {ObjectId} rideId
 * @returns {Promise<Rides>}
 */
const redeemCoin = async(userId, rideId) => {
   const ride = await updateRideById(rideId, {"redeemed": true});
   const coin = await Coin.create({"user": userId, "ride": rideId, "type": "ride", "redeemed": true, "coins": ride.coins});
  return coin;
  };

module.exports = {
  createRide,
  updateRideById,
  deleteRideById,
  queryRides,
  createRides,
  getSummaryByMonth,
  getSummaryLifetime,
  redeemCoin
};
