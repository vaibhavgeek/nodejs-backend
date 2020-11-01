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
    destinationGPS: {
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
    flaggedReason: {
      type: String,
      trim: true,
    },
    elapsedTime: {
      type: String,
      trim: true,
    },
    startLat: {
      type: String,
    },
    endLang: {
      type: String
    },
    endLat: {
      type: String,
    },
    endLang: {
      type: String,
    },
    deviceName: {
      type: String,
    },
    rideBrand: {
      type: String,
    },
    workoutType: {
      type: String,
    },
    description: {
      type: String,
    },
    strava: {
      type: Object,
    },
    coins: {
      type: Number
    },
    startedAt: {
      type: Date,
      set: d => new Date(d * 1000)
    },
    completedAt: {
      type: Date,
      set: d => new Date(d * 1000)
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rideSchema.plugin(toJSON);
rideSchema.plugin(paginate);


rideSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Ride
 */
const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
