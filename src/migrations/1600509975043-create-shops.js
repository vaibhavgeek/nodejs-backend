const db = require('../persistence/db');

module.exports.up = async function (next) {
  const client = await db.connect();

  await client.query(`
  CREATE TABLE IF NOT EXISTS shops (
    id uuid PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name text, 
    user_id uuid, 
    description json,
    image text,
    social_media json,
    category text,
    location text,
    address text,
    timings text,
    charges json,
    location_gps json,
    reviews json,
    stars json,
    contact json
  );
  `);

  await client.query(`
  CREATE INDEX shops_id on articles (id);
  `);

  await client.release(true);
  next();
};

module.exports.down = async function (next) {
  const client = await db.connect();

  await client.query(`
  DROP TABLE articles;
  `);

  await client.release(true);
  next();
};
