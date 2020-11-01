const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createRide = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    coin: Joi.string().custom(objectId),
    destination: Joi.string(),
    calories: Joi.string(),
    redeemed: Joi.boolean(),
    carbon: Joi.string(),
    route: Joi.string(),
    distance: Joi.string(),
    destinationGPS: Joi.string(),
    purpose: Joi.string(),
    polyline: Joi.string(),
    speed: Joi.string(),
    flagged: Joi.boolean(),
    flaggedReason: Joi.string(),
    elapsedTime: Joi.string(),
    startLatLang: Joi.string(),
    endLatLang: Joi.string(),
    deviceName: Joi.string(),
    brand: Joi.string(),
    workoutType: Joi.string(),
    description: Joi.string(),
    strava: Joi.object(),
  }),
};

module.exports = {
  createReward,
};
