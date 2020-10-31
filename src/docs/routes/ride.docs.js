const { Unauthorized, Forbidden, NotFound } = require('../responses/responses.docs');
const UserSchema = require('../schemas/user.docs');

const ridesRoute = {
  '/rides/{email}': {
    get: {
      summary: 'Get a user',
      description: 'Fetch a user via email.',
      tags: ['Rides'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User id',
        },
      ],
      responses: {
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: UserSchema,
            },
          },
        },
        401: Unauthorized,
        403: Forbidden,
        404: NotFound,
      },
    },
  },
};

module.exports = ridesRoute;
