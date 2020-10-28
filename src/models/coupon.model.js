const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const couponSchema = mongoose.Schema(
  {
    rewardId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    code: {
      type: String,
      trim: true,
    },
    orderNumer: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    redeemed:{
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);


couponSchema.pre('save', async function (next) {
  const coupon = this;
  
  next();
});

/**
 * @typedef Coupon
 */
const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
