const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS events (
    id uuid PRIMARY KEY,
    event_starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_completes_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name text, 
    location text, 
    cost text, 
    category text, 
    riderange text,
    venue text,
    venue_gps json,
    description json,
    image text,
    organiser_contact json,
    register_link text
  );
  `);

  await client.query(`
  CREATE INDEX events_id on events (id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE events;
  `);

  await client.release(true);
  next();
};
