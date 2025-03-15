const express = require("express");
const app = express();
require("dotenv").config();
console.log(process.env.PORT);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
