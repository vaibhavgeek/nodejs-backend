const sql = require('sql-template-strings');
const db = require('./db');

module.exports = {
 
  async getCity(city){
    try {
     cityq = city + '%'
      const {rows} = await db.query(sql`
        SELECT * from cities where lower(city) like lower(${cityq}) limit 10;`);
      return rows;

    } catch(error){
      throw error;
    }
  }
};
