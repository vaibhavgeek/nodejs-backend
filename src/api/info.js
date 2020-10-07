const {Router, request, response} = require('express');
const Info = require('../persistence/info');

const router = new Router();

router.get('/cities' , async (request , response) => {
    try {
       const {city} = request.query;
       const cities = await Info.getCity(city);
      return response.status(200).json(cities);
            
    } catch(error){
        console.error(
            `cityFetchError({ city: ${request.query} }) >> Error: ${error.stack}`
          );
          return response.status(500).json();
    }
    return response.status(200).json();
});

module.exports = router;
