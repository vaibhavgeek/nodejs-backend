const authRoutes = require('./routes/auth.docs');
const ridesRoute = require('./routes/ride.docs');
const userRoute = require('./routes/user.docs');
const CoinSchema = require('./schemas/coin.docs');
const ErrorSchema = require('./schemas/error.docs');
const RideSchema = require('./schemas/ride.docs');
const { TokenSchema } = require('./schemas/token.docs');
const UserSchema = require('./schemas/user.docs');

const docs = {
  openapi: '3.0.2',
  info: {
    title: 'Cycling Cities',
    description: 'Cycling Cities Open API Specification',
    contact: {
      email: 'hello@reneree.com',
    },
    version: '0.0.1',
    externalDocs: {
      description: 'Find out more about Swagger',
      url: 'http://swagger.io',
    },
    servers: [
      {
        url: '/v1/api',
      },
    ],
  },
  tags: [
    {
      name: 'Authentication',
      description: 'User Authentication',
    },
    {
      name: 'Rides',
      description: 'Rides Management & Retrieval',
    },
    {
      name: 'Users',
      description: 'User Management & Retrieval',
    },
  ],
  paths: { ...authRoutes, ...ridesRoute, ...userRoute },
  components: {
    schemas: {
      User: UserSchema,
      Ride: RideSchema,
      Token: TokenSchema,
      Coin: CoinSchema,
      Error: ErrorSchema,
    },
  },
};

module.exports = docs;
