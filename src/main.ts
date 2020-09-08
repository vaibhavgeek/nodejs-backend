import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    msg: "Hello!",
  });
});

app.listen(port, () => {
  console.log(`App running onport: ${port}`);
});
