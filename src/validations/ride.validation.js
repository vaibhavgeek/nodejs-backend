const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createRide = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    destination: Joi.string(),
    calories: Joi.string(),
    redeemed: Joi.boolean(),
    carbon: Joi.string(),
    route: Joi.string(),
    distance: Joi.string(),
    destination_gps: Joi.string(),
    purpose: Joi.string(),
    polyline: Joi.string(),
    speed: Joi.string(),
    flagged: Joi.boolean(),
    flagged_reason: Joi.string(),
    elapsed_time: Joi.string(),
    start_latlang: Joi.string(),
    end_latlang: Joi.string(),
    device_name: Joi.string(),
    brand: Joi.string(),
    workout_type: Joi.string(),
    description: Joi.string(),
    strava: Joi.object(),
  }),
};

const createRides = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
  body: Joi.array().items(
    Joi.object().keys({
      user: Joi.string().custom(objectId),
      destination: Joi.string(),
      calories: Joi.string(),
      redeemed: Joi.boolean(),
      carbon: Joi.string(),
      route: Joi.string(),
      distance: Joi.string(),
      destination_gps: Joi.string(),
      purpose: Joi.string(),
      polyline: Joi.string(),
      speed: Joi.string(),
      flagged: Joi.boolean(),
      flagged_reason: Joi.string(),
      elapsed_time: Joi.string(),
      start_latlang: Joi.string(),
      end_latlang: Joi.string(),
      device_name: Joi.string(),
      brand: Joi.string(),
      workout_type: Joi.string(),
      description: Joi.string(),
      strava: Joi.object(),
    })
  ),
};

module.exports = {
  createRide,
  createRides,
};
