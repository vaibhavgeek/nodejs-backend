const sql = require('sql-template-strings');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const db = require('./db');
const shortid = require('shortid');
const gravatarUrl = require('gravatar-url');
const request = require('request-promise')
const AWS = require('aws-sdk')


const s3 = new AWS.S3({
  accessKeyId: "AKIAYBCS6IU6Q4OEC67F",
  secretAccessKey: "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",
  Bucket: "profilepic-cc"
});


module.exports = {
  async createUserOrFind(email, password, mobile, city, location, dob, height, weight, bike, purpose, gender, image) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const referral = shortid.generate();
      
      if(image === null)
         image = gravatarUrl(email, {size: 200});
      
      if(image.includes("fbsbx.com"))
      {
          const options = {
          uri: image,
          encoding: null
        };
        const body = await request(options)
        const uploadResult = await s3.upload({
              Bucket: 'profilepic-cc',
              Key   : shortid.generate() + ".jpeg",
              Body  : body,   
        }).promise();
        console.log(uploadResult.Location);
        image = uploadResult.Location;
        console.log("image", image);
      }
      
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
  async updateUser(email, name , mobile, city, location, dob, height, weight, bike, purpose, gender, brand, image) {
    try {
      if(image === null)
         image = gravatarUrl(email, {size: 200});
      if(image.includes("fbsbx.com"))
      {
             const options = {
             uri: image,
             encoding: null
           };
           const body = await request(options)
           const uploadResult = await s3.upload({
                 Bucket: 'profilepic-cc',
                 Key   : shortid.generate() + ".jpeg",
                 Body  : body,   
           }).promise();
           image = uploadResult.Location;
      }
      const {rows} = await db.query(sql`
      UPDATE users 
      SET 
        name = ${name},
        mobile =  ${mobile} ,
        city =   ${city} , 
        location =  ${location} , 
        dob =   ${dob} , 
        height =   ${height} , 
        weight =  ${weight} , 
        bike =  ${bike}, 
        purpose =   ${purpose} ,  
        gender =   ${gender} , 
        image =   ${image} ,
        brand = ${brand}
      WHERE email = ${email}
      RETURNING id, name, email, mobile, city, location, dob, height, weight, bike, purpose,referral,gender,brand,image;
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
  },

  async findById(id) {
    const {rows} = await db.query(sql`
    SELECT * FROM users WHERE id=${id} LIMIT 1;
    `);
    return rows[0];
  }



};
