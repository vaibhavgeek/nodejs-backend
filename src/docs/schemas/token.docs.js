const TokenSchema = {
  type: 'object',
  properties: {
    token: {
      type: 'string',
    },
    expires: {
      type: 'string',
      format: 'date-time',
    },
  },
  example: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg',
    expires: '2020-05-12T16:18:04.793Z',
  },
};

const AuthTokenSchema = {
  AuthTokens: {
    type: 'object',
    properties: {
      access: TokenSchema,
      refresh: TokenSchema,
    },
  },
};

module.exports = {
  TokenSchema,
  AuthTokenSchema,
};
