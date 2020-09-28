const {Router, request, response} = require('express');
const Profile = require('../persistence/profiles');
const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.get('/:user_id/rides/:month', async (request, response) => {
    try {
      const {user_id , month} = request.params;
      const rides = await Profile.getUserRidesMonth(email, month);
      return response.status(200).json(rides);

    } catch (error) {
      console.error(
        `getUserRidesMonth({ email: ${request.params.user_id} }) >> Error: ${error.stack}`
      );
      response.status(500).json();
    } 
});


router.get('/:user_id/rides/lifetime', async (request, response) => {
  try {
    const {user_id} = request.params;
    const rides = await Profile.getUserRidesLife(user_id);
    return response.status(200).json(rides);

  } catch (error) {
    console.error(
      `getUserRidesLifetime({ email: ${request.params.user_id} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  } 

});


router.post('/:user_id/rides/:ride_id', async (request, response) => {
  try {
    const {user_id, ride_id} = request.params;
    if (!ride_id) {
      return response
        .status(400)
        .json({message: 'ride_id must be provided for updating a  ride'});
    }

    const rides = await Profile.updateUserRide(ride_id);
    return response.status(200).json(rides);

  } catch (error) {
    console.error(
       `UpdateRide({ params: ${request.params} }) >> Error: ${error.stack}`
    );
    response.status(500).json();
  } 

});

router.post('/:user_id/rides/create' , async (request, response) => {
   // console.log(request.body);
    try {
        const {user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps} = request.body;
        if (!user_id) {
          return response
            .status(400)
            .json({message: 'user_id must be provided for new ride'});
        }
    
        const profile = await Profile.createUserRide(user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps);
        return response.status(200).json();
    
      } catch (error) {
        console.error(
          `createUserRide({ user_id: ${request.body.user_id} }) >> Error: ${error.stack}`
        );
        response.status(500).json();
      } 
    response.json(200);
});


router.post('/:user_id/rides/create-many' , async (request , response) => {
    try {
        request.body.forEach(async function(ride) {
            const {user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps} = ride;
            if (!user_id) {
                return response
                  .status(400)
                  .json({message: 'user_id must be provided for new ride'});
              }
            const createride = await Profile.createUserRide(user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps);
            return response.status(200).json();
            });
    } catch(error){
        console.error(
            `createUserRides({ user_id: ${request.body} }) >> Error: ${error.stack}`
          );
          return response.status(500).json();
    }
    return response.status(200).json();
});



module.exports = router;
