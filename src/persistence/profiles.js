const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = {
  async getUserRidesMonth(email,month){
    try {

      const {rows} = db.query(sql`
        SELECT rides.id as ride_id, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image 
        , destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, rides.id as ride_id, 
        distance, destination_gps FROM users , rides WHERE rides.user_id = users.id AND email= ${email} 
        AND EXTRACT(MONTH FROM rides.completed_at) = ${month};`)
      return rows;

    } catch(error){
      throw error;
    }
  },

   async getUserRidesLife(email){
    try {

      const {rows} = await db.query(sql`
        SELECT rides.id as ride_id, users.email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image 
        , destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, rides.id as ride_id, 
        distance, destination_gps FROM users , rides WHERE rides.user_id = users.id AND users.email= ${email}`)
      console.log(rows);
        return rows;

    } catch(error){
      throw error;
    }
  }, 

  async getUserRide(email, rideId){
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

  async createUserRide(user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps ){
     try {
      const {rows} =  db.query(sql`
      INSERT INTO rides (id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps)
        VALUES (${uuidv4()}, ${user_id}, ${started_at} , ${completed_at}, ${destination} , ${elevation} , ${calories_spent}, ${redeemed} , ${coins}, ${carbon}, ${route}, ${distance}, ${destination_gps})
        RETURNING id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps;
      `);

      return rows;
    } catch (error) {

      throw error;
    }
  },

  async updateUserRide(ride_id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps ){
     try {
      const {rows} =  db.query(sql`
      UPDATE rides 
      SET
      started_at = ${started_at},
        user_id = ${user_id},  
        completed_at = ${completed_at}, 
        destination =   ${destination}, 
        elevation =  ${elevation}, 
        calories_spent = ${calories_spent}, 
        redeemed =  ${redeemed}, 
        coins=  ${coins}, 
        carbon =  ${carbon}, 
        route = ${route}, 
        distance = ${distance}, 
        destination_gps =  ${destination_gps})
      WHERE 
       ride_id = ${ride_id}
        RETURNING id, user_id, started_at, completed_at, destination, elevation, calories_spent, redeemed, coins, carbon, route, distance, destination_gps;
      `);

      return rows;
    } catch (error) {

      throw error;
    }
  },


};
