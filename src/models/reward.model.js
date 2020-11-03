const { v4: uuidv4 } = require('uuid');

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rewardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    shopUrl: {
      type: String,
      trim: true,
    },
    imageLandscape: {
      type: String, 
    },
    imagePotrait: {
      type: String,
    },
    isHighlighted: {
      type: Boolean,
    },
    subtitle: {
      type: String,
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
    category:{
      type: String,
      enum: ['Products', 'Services', 'Products.Services']
    },
    rewardQuestions: {
      type: Array
    },
    tag: {
      type: String
    },
    rewardContent: {
      type: Array
    },
    dateExpired: {
      type: Number,
    },
    datePosted: {
      type: Number,
    },
    ratings: {
      type: Number
    }
  },
  {
    timestamps: true,
  });
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
