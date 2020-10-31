const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const docs = require('../../docs/swagger');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

const useNewAPI = true;

router.use('/', swaggerUi.serve);
router.get(
  '/',
  useNewAPI
    ? swaggerUi.setup(docs)
    : swaggerUi.setup(specs, {
        explorer: true,
      })
);

module.exports = router;