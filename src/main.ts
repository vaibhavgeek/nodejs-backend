import express from "express";

var db =  require("./dl/database");
const app = express();
const port = 3000;



app.get("/", (req, res) => {
  var query = "select * from";	
  res.json({
    msg: "Hello!",
  });
});

app.listen(port, () => {
  console.log(`App running onport: ${port}`);
});
