const RideSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    user: {
      type: 'object',
    },
    destination: {
      type: 'string',
    },
    calories: {
      type: 'string',
    },
    redeemed: {
      type: 'Boolean',
    },
    route: {
      type: 'string',
    },
    distance: {
      type: 'string',
    },
    destinationGPS: {
      type: 'string',
    },
    purpose: {
      type: 'string',
    },
    polyline: {
      type: 'string',
    },
    speed: {
      type: 'string',
    },
    flagged: {
      type: 'Boolean',
    },
    flaggedReason: {
      type: 'string',
    },
    elapsedTime: {
      type: 'string',
    },
    startLatLang: {
      type: 'string',
    },
    endLatLang: {
      type: 'string',
    },
    deviceName: {
      type: 'string',
    },
    rideBrand: {
      type: 'string',
    },
    workoutType: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    strava: {
      type: 'object',
    },
  },
  example: {
    id: '5ebac534954b54139806c112',
    email: 'fake@example.com',
    name: 'fake name',
    role: 'user',
  },
};

module.exports = RideSchema;
