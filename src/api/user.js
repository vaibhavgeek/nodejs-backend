const {Router} = require('express');
const User = require('../persistence/users');
const Session = require('../persistence/sessions');
const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.post('/create', async (request, response) => {
  try {
    const {email, name , brand ,password, mobile, city, location, dob, height, weight, bike, purpose, gender, image} = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({message: 'email and password must be provided'});
    }

    const user = await User.createUserOrFind(email, name , brand , password, mobile, city, location, dob, height, weight, bike, purpose, gender, image);
    const sessionId = await Session.create(user.id);
    request.session.id = sessionId;
    return response.status(200).json(user);

  } catch (error) {
    console.error(
      `createUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});

router.get('/findbyemail/:email', async (request, response) => {
  try {
    const {email} = request.params;
    if (!email) {
      return response
        .status(400)
        .json({message: 'email must be provided'});
    }

    const user = await User.find(email);
    return response.status(200).json(user);

  } catch (error) {
    console.error(error);
    response.status(500).json();
  }
});

router.post('/update',  async (request, response) => {
  try {
    const {email, name, mobile, city, location, dob, height, weight, bike, purpose, gender, brand, image} = request.body;
    const user = await User.updateUser(email, name, mobile, city, location, dob, height, weight, bike, purpose, gender, brand, image);
    return response.status(200).json(user);
    
  } catch (error) {
    console.error(
      `updateUser({ email: ${request.body.email} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  }
});



module.exports = router;
