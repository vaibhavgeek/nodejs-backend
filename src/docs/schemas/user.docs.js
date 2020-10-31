const UserSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    dob: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
    name: {
      type: 'string',
    },
    mobile: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    height: {
      type: 'string',
    },
    weight: {
      type: 'string',
    },
    bike: {
      type: 'string',
    },
    purpose: {
      type: 'string',
    },
    referral: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    brand: {
      type: 'string',
    },
    department: {
      type: 'string',
    },
    deviceInfo: {
      type: 'string',
    },
    gear: {
      type: 'object',
      properties: {
        gear: {
          type: 'string',
        },
        frontGear: {
          type: 'string',
        },
        rearGear: {
          type: 'string',
        },
        remainingTrips: {
          type: 'string',
        },
        remainingDistance: {
          type: 'string',
        },
      },
    },
    role: {
      type: 'string',
      enum: ['user', 'admin'],
    },
  },
  example: {
    id: '5ebac534954b54139806c112',
    email: 'fake@example.com',
    name: 'fake name',
    role: 'user',
  },
};

module.exports = UserSchema;
