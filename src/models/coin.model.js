const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const coinSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    ride: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Ride',
    },
    type: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: 'You have recieved',
    },
    redeemed: {
      type: Boolean, 
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
coinSchema.plugin(toJSON);
coinSchema.plugin(paginate);


coinSchema.pre('save', async function (next) {
  const coin = this;
  if (coin.id == null) {
    coin.id = uuidv4();
  }
  next();
});

/**
 * @typedef User
 */
const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
