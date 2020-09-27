const {Router} = require('express');
const Profile = require('../persistence/profiles');
const sessionMiddleware = require('../middleware/session-middleware');

const router = new Router();

router.get('/:user_id/:month', sessionMiddleware, async (request, response) => {
    response.json({"id": request.params});
});


router.get('/:user_id/lifetime',sessionMiddleware, async (request, response) => {
    response.json({"id": request.params.id});
});


router.get('/:user_id/rides', sessionMiddleware, async (request, response) => {
    response.json({"id": request.params.id});
});

router.get('/:user_id/rides/:id', sessionMiddleware, async (request, response) => {
    response.json({"id": request.params.id});
});

router.get('/:user_id/rides/:id/redeem',sessionMiddleware, async (request, response) => {
    response.json({"id": request.params.id});
});

router.post('/:user_id/rides/create' , sessionMiddleware , async (request, response) => {
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


router.post('/:user_id/rides/create-many' , sessionMiddleware , async (request , response) => {
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
