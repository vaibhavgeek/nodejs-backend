const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS cities (
    city text UNIQUE,
    state text, 
    country text
  );
  `);

  await client.query(`
  CREATE INDEX cities_name on cities (city);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE cities;
  `);

  await client.release(true);
  next();
};
