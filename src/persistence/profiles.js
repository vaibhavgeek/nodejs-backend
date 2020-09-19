const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = {
  getUserRidesMonth(email,month){
    try {

      const {rows} = db.query(sql`
        SELECT id, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image 
        , destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, rides.id as ride_id, 
        distance, destination_gps FROM users , rides WHERE rides.user_id = user.id AND email= ${email} 
        AND EXTRACT(MONTH FROM rides.comleted_at) = ${month};`)
      return rows;

    } catch(error){
      throw error;
    }
  },

   getUserRidesLife(email){
    try {

      const {rows} = db.query(sql`
        SELECT id, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image 
        , destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, rides.id as ride_id, 
        distance, destination_gps FROM users , rides WHERE rides.user_id = user.id AND email= ${email} ;`)
      return rows;

    } catch(error){
      throw error;
    }
  }, 

  getUserRide(email, rideId){
    try {

      const {rows} = db.query(sql`
        SELECT id, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image 
        , destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, rides.id as rideId, 
        distance, destination_gps FROM users , rides WHERE rides.user_id = user.id AND email= ${email} 
        AND rides.id = ${rideId};`)
      return rows;

    } catch(error){
      throw error;
    }
  },

  createUserRide(user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps ){
     try {
      const {rows} = await db.query(sql`
      INSERT INTO rides (id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps)
        VALUES (${uuidv4()}, ${user_id}, ${started_at} , ${completed_at}, ${destination} , ${elevation} , ${calories_spent}, ${redeemed} , ${coins}, ${carbon}, ${route}, ${distance}, ${destination_gps})
        RETURNING id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps;
      `);

      return rows;
    } catch (error) {

      throw error;
    }
  },

  updateUserRide(user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps ){
     try {
      const {rows} = await db.query(sql`
      INSERT INTO rides (id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps)
        VALUES (${uuidv4()}, ${user_id}, ${started_at} , ${completed_at}, ${destination} , ${elevation} , ${calories_spent}, ${redeemed} , ${coins}, ${carbon}, ${route}, ${distance}, ${destination_gps})
        RETURNING id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps;
      `);

      return rows;
    } catch (error) {

      throw error;
    }
  },


};
