const { DuplicateEmail, NotFound, Unauthorized } = require('../responses/responses.docs');
const ErrorSchema = require('../schemas/error.docs');
const { AuthTokenSchema, TokenSchema } = require('../schemas/token.docs');
const UserSchema = require('../schemas/user.docs');

const authRegister = {
  post: {
    summary: 'Register as user',
    tags: ['Authentication'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'must be unique',
              },
              password: {
                type: 'string',
                format: 'password',
                minLength: 8,
                description: 'At least one number and one letter',
              },
            },
            example: {
              name: 'fake name',
              email: 'fake@example.com',
              password: 'password1',
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: UserSchema,
                tokens: AuthTokenSchema,
              },
            },
          },
        },
      },
      400: DuplicateEmail,
    },
  },
};

const authLogin = {
  post: {
    summary: 'Login',
    tags: ['Authentication'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
              password: {
                type: 'string',
                format: 'password',
              },
            },
            example: {
              email: 'fake@example.com',
              password: 'password1',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: UserSchema,
                tokens: TokenSchema,
              },
            },
          },
        },
      },
      401: {
        description: 'Invalid email or password',
        content: {
          'application/json': {
            schema: ErrorSchema,
            example: {
              code: 401,
              message: 'Invalid email or password',
            },
          },
        },
      },
    },
  },
};

const authLogout = {
  post: {
    summary: 'Logout',
    tags: ['Authentication'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['refreshToken'],
            properties: {
              refreshToken: {
                type: 'string',
              },
            },
            example: {
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg',
            },
          },
        },
      },
    },
    responses: {
      204: {
        description: 'No content',
      },
      404: NotFound,
    },
  },
};

const authRefreshTokens = {
  post: {
    summary: 'Refresh auth tokens',
    tags: ['Authentication'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['refreshToken'],
            properties: {
              refreshToken: {
                type: 'string',
              },
            },
            example: {
              refreshToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: AuthTokenSchema,
          },
        },
      },
      401: Unauthorized,
    },
  },
};

const authForgotPassword = {
  post: {
    summary: 'Forgot password',
    description: 'An email will be sent to reset password.',
    tags: ['Authentication'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
              },
            },
            example: {
              email: 'fake@example.com',
            },
          },
        },
      },
    },
    responses: {
      204: {
        description: 'No content',
      },
      404: NotFound,
    },
  },
};

const authResetPassword = {
  post: {
    summary: 'Reset password',
    tags: ['Authentication'],
    parameters: [
      {
        in: 'query',
        name: 'token',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'The reset password token',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['password'],
            properties: {
              password: {
                type: 'string',
                format: 'password',
                minLength: 8,
                description: 'At least one number and one letter',
              },
            },
            example: {
              password: 'password1',
            },
          },
        },
      },
    },
    responses: {
      204: {
        description: 'No content',
      },
      401: {
        description: 'Password reset failed',
        content: {
          'application/json': {
            schema: ErrorSchema,
            example: {
              code: 401,
              message: 'Password reset failed',
            },
          },
        },
      },
    },
  },
};

const authRoutes = {
  '/auth/register': authRegister,
  '/auth/login': authLogin,
  '/auth/logout': authLogout,
  '/auth/refresh-tokens': authRefreshTokens,
  '/auth/forgot-password': authForgotPassword,
  '/auth/reset-password': authResetPassword,
};

module.exports = authRoutes;
