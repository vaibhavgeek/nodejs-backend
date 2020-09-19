const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();
  await client.query(`
 	ALTER TABLE users
	ADD COLUMN gender text,
	ADD COLUMN image text;
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  next();
};
