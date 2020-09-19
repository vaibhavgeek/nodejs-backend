const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS clubs (
    id uuid PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name text, 
    location text, 
    description json,
    image text,
    organiser_contact json,
    register_link text,
    members_count integer,
    distance integer,
    moderators json,
    social_media json
  );
  `);

  await client.query(`
  CREATE INDEX clubs_id on clubs (id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE clubs;
  `);

  await client.release(true);
  next();
};
