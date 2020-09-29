const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS rides (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users (id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    destination text, 
    elevation text, 
    calories_spent text, 
    redeemed boolean, 
    coins text,
    carbon text,
    route json,
    distance text,
    destination_gps json
  );
  `);

  await client.query(`
  CREATE INDEX rides_id on rides (id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE rides;
  `);

  await client.release(true);
  next();
};
