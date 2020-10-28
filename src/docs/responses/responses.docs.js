const ErrorSchema = require('../schemas/error.docs');

const responses = {
  DuplicateEmail: {
    description: 'Email already taken',
    content: {
      'application/json': {
        schema: ErrorSchema,
        example: {
          code: 400,
          message: 'Email already taken',
        },
      },
    },
  },
  Unauthorized: {
    description: 'Unauthorized',
    content: {
      'application/json': {
        schema: ErrorSchema,
        example: {
          code: 401,
          message: 'Please authenticate',
        },
      },
    },
  },
  Forbidden: {
    description: 'Forbidden',
    content: {
      'application/json': {
        schema: ErrorSchema,
        example: {
          code: 403,
          message: 'Forbidden',
        },
      },
    },
  },
  NotFound: {
    description: 'Not found',
    content: {
      'application/json': {
        schema: ErrorSchema,
        example: {
          code: 404,
          message: 'Not found',
        },
      },
    },
  },
  bearerAuth: {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
};

module.exports = responses;
