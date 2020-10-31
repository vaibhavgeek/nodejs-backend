const CoinSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
    },
    ride: {
      type: 'object',
    },
    type: {
      type: 'string',
      enum: ['gearUpgrade', 'rideCompleted'],
    },
    message: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    redeemed: {
      type: 'Boolean',
    },
  },
};

module.exports = CoinSchema;
