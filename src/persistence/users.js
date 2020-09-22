const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');
const shortid = require('shortid');
const gravatarUrl = require('gravatar-url');

module.exports = {
  async createUserOrFind(email, password, mobile, city, location, dob, height, weight, bike, purpose, gender, image) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const referral = shortid.generate();
      
      if(!image)
         image = gravatarUrl(email, {size: 200});

      const {rows} = await db.query(sql`
      INSERT INTO users (id, email, password, mobile, city, location, dob, height, weight, bike, purpose, referral, gender, image)
        VALUES (${uuidv4()}, ${email}, ${hashedPassword} , ${mobile}, ${city} , ${location} , ${dob}, ${height} , ${weight}, ${bike}, ${purpose}, ${referral}, ${gender}, ${image})
        RETURNING id, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,image;
      `);

      const [user] = rows;
      return {"user": user, "new": true};
    } catch (error) {
      if (error.constraint === 'users_email_key') {
         const {rows} = await db.query(sql`
         SELECT * FROM users WHERE email=${email} LIMIT 1;
          `);
          return {"user": rows[0], "new": false};
      }
      else
      {
          throw error;
      } 
    }
  },
  async updateUser(email, mobile, city, location, dob, height, weight, bike, purpose, gender, image) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const {rows} = await db.query(sql`
      UPDATE users SET mobile = ${mobile}, city = ${city}, location = ${location}, dob = ${dob}, height = ${height}, weight = ${weight}, bike = ${bike}, purpose = ${purpose},  referral= ${referral}, gender = ${gender}, image = ${image}
        WHERE email = ${email};
      `);

      const [user] = rows;
      return {"user": user};
    } catch (error) {
      if (error.constraint === 'users_email_key') {        
          return null;
      }
   
        throw error;  
    }
  }, 

  async find(email) {
    const {rows} = await db.query(sql`
    SELECT * FROM users WHERE email=${email} LIMIT 1;
    `);
    return rows[0];
  }


};
