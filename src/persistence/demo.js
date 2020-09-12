const sql = require('sql-template-strings');
const db = require('./db');

module.exports = {
  async demo() {
    const {rows} = await db.query(sql`
    SELECT * FROM demo;
    `);
    return {rows};
  }
};
