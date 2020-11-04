const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createReward = {
  body: Joi.object().keys({
    title: Joi.string().custom(objectId),
    shopUrl: Joi.string(),
    imageLandscape: Joi.string(),
    imagePotrait: Joi.boolean(),
    isHighlighted: Joi.string(),
    subtitle: Joi.string(),
    totalCount: Joi.string(),
    availableCount: Joi.string(),
    coins: Joi.number(),
    icon: Joi.string(),
    category: Joi.string(),
    rewardQuestions: Joi.array(),
    rewardContent: Joi.array(),
    tag: Joi.string(),
    dateExpired: Joi.string(),
    ratings: Joi.number(),
    coupons: Joi.any(),
  }),
};

module.exports = {
  createReward,
};
