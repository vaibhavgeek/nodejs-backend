const {Pool} = require('pg');

module.exports = new Pool({
  max: 10,
  connectionString: "postgres://hqojbean:w5Y2Dy6Lzl3i1gCilbU9_1DE8-3LeXvc@arjuna.db.elephantsql.com:5432/hqojbean"
});
