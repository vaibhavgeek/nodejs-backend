const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rideSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    destination: {
      type: String,
      trim: true,
    },
    calories: {
      type: String,
      trim: true,
    },
    redeemed: {
      type: Boolean,
      trim: true,
      default: false,
    },
    carbon: {
      type: String,
      trim: true,
    },
    route: {
      type: String,
      trim: true,
    },
    distance: {
      type: String,
      trim: true,
    },
    destination_gps: {
      type: String,
      trim: true,
    },
    purpose: {
      type: String,
      trim: true,
    },
    polyline: {
      type: String,
      trim: true,
    },
    speed: {
      type: String,
      trim: true,
    },
    flagged: {
      type: Boolean,
      trim: true,
    },
    flagged_reason: {
      type: String,
      trim: true,
    },
    elapsed_time: {
      type: String,
      trim: true,
    },
    start_latlang: {
      type: String,
    },
    end_latlang: {
      type: String,
    },
    device_name: {
      type: String,
    },
    brand: {
      type: String,
    },
    workout_type: {
      type: String,
    },
    description: {
      type: String,
    },
    strava: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rideSchema.plugin(toJSON);
rideSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// rideSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

rideSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef User
 */
const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
