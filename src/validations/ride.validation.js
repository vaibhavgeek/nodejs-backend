const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const deleteRide = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
    ride: Joi.string().custom(objectId),
  }),
};
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
    startLat: Joi.string(),
    startLang: Joi.string(),
    endLat: Joi.string(),
    endLang: Joi.string(),
    deviceName: Joi.string(),
    brand: Joi.string(),
    workoutType: Joi.string(),
    description: Joi.string(),
    strava: Joi.object(),
    coins: Joi.number(),
    startedAt: Joi.string(),
    completedAt: Joi.string(),
  }),
};

const updateRide = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
    ride: Joi.string().custom(objectId),
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
    startLat: Joi.string(),
    startLang: Joi.string(),
    endLat: Joi.string(),
    endLang: Joi.string(),
    deviceName: Joi.string(),
    brand: Joi.string(),
    workoutType: Joi.string(),
    description: Joi.string(),
    strava: Joi.object(),
    coins: Joi.number(),
    startedAt: Joi.string(),
    completedAt: Joi.string(),
  }),
};

const createRides = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
  }),
  body: Joi.array().items(
    Joi.object().keys({
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
      startLat: Joi.string(),
      startLang: Joi.string(),
      endLat: Joi.string(),
      endLang: Joi.string(),
      deviceName: Joi.string(),
      brand: Joi.string(),
      workoutType: Joi.string(),
      description: Joi.string(),
      strava: Joi.object(),
      coins: Joi.number(),
      startedAt: Joi.string(),
      completedAt: Joi.string(),
    })
  ),
};
const getSummaryByMonth = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
    month: Joi.number(),
  }),
};

const getSummaryByLifetime = {
  params: Joi.object().keys({
    user: Joi.string().custom(objectId),
  }),
};
module.exports = {
  createRide,
  createRides,
  updateRide,
  deleteRide,
  getSummaryByMonth,
  getSummaryByLifetime,
};
