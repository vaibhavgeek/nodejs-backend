const ErrorSchema = {
  type: 'object',
  properties: {
    code: {
      type: 'number',
    },
    message: {
      type: 'string',
    },
  },
};

module.exports = ErrorSchema;
