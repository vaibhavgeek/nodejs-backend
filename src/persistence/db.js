const {Pool} = require('pg');

module.exports = new Pool({
  max: 10,
  connectionString: "postgres://postgres:postgres@postgres.cs8sawmnwblg.ap-south-1.rds.amazonaws.com:5432/postgres"
});
