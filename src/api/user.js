const {Router} = require('express');
const User = require('../persistence/users');
const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.post('/create', async (request, response) => {
  try {
    const {email, password, mobile, city, location, dob, height, weight, bike, purpose, image} = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({message: 'email and password must be provided'});
    }

    const user = await User.createUserOrFind(email, password, mobile, city, location, dob, height, weight, bike, purpose);
    return response.status(200).json(user);

  } catch (error) {
    console.error(
      `createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

router.post('/update', async (request, response) => {
  try {
    const {email, password, mobile, city, location, dob, height, weight, bike, purpose} = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({message: 'email and password must be provided'});
    }

    const user = await User.updateUser(email, password, mobile, city, location, dob, height, weight, bike, purpose);
    return response.status(200).json(user);
    
  } catch (error) {
    console.error(
      `createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});



module.exports = router;
