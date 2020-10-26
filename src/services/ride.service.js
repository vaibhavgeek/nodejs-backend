const Ride = require('../models/ride.model');
const Coin = require('../models/coin.model');

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
   console.log("ride body: ", rideBody);
  const ride = await Ride.create(rideBody);
  console.log("ride created", ride);
  return ride;
};

/**
 *
 * @param {Object} rideArray
 * @returns {Promise<Rides>}
 */
const createRides = async (rideArray) => {
 const rides = await Ride.insertMany(rideArray);
 console.log("ride created", rides);
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

const redeemCoin = async(rideBody) => {
    
};

// const createRides = async (rideBody) => {
//   // console.log("ride body: ", rideBody);
//   return await Promise.all(rideBody).then((singleride) => {
//     Ride.create(singleride);
//   });
// };

module.exports = {
  createRide,
  updateRideById,
  deleteRideById,
  queryRides,
  createRides
};
