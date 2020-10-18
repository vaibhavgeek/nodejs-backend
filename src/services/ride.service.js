const Ride = require('../models/ride.model');
/**
 *
 * @param {Object} rideBody
 * @returns {Promise<Ride>}
 */
const createRide = async (rideBody) => {
  // console.log("ride body: ", rideBody);
  const ride = await Ride.create(rideBody);
  return ride;
};

// const createRides = async (rideBody) => {
//   // console.log("ride body: ", rideBody);
//   return await Promise.all(rideBody).then((singleride) => {
//     Ride.create(singleride);
//   });
// };

module.exports = {
  createRide,
};
