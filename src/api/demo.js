const {Router} = require('express');
const bcrypt = require('bcrypt');

const Demo = require('../persistence/demo');

const router = new Router();


router.get('/', async(request, response) => {
  const demoResponse = await Demo.demo();
  response.json(demoResponse);
});


module.exports = router;
