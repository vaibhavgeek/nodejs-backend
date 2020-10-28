const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rewardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    totalCount: {
      type: Number, 
    },
    availableCount: {
      type: Number,
    },
    coins: {
      type: Number,
    },
    icon: {
      type: String,
    },
    type:{
      type: String,
      enum: ['Products', 'Services']
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rewardSchema.plugin(toJSON);
rewardSchema.plugin(paginate);


rewardSchema.pre('save', async function (next) {
  const coin = this;
  
  next();
});

/**
 * @typedef Reward
 */
const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
