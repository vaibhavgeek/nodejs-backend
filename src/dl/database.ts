var pg = require('pg');
var conString = "postgres://hqojbean:w5Y2Dy6Lzl3i1gCilbU9_1DE8-3LeXvc@arjuna.db.elephantsql.com:5432/hqojbean";
var client = new pg.Client(conString);


module.exports = {
  run_query: function (query_params) {
  	client.connect();
  	return client.query(query_params)
    // whatever
  },
  bar: function () {
    // whatever
  }
};
