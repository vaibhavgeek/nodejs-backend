const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS rides (
    id uuid PRIMARY KEY,
    user_id uuid REFERENCES users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    comleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    destination text, 
    elevation text, 
    calories_spent text, 
    redeemed boolean, 
    coins integer,
    carbon integer,
    route json,
    distance integer,
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
