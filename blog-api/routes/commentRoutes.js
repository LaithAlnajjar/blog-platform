const express = require("express");
const commentRouter = express.Router();

commentRouter.get("/", (req, res) => {
  res.send("THIS IS THE GET COMMENT PAGE");
});

module.exports = commentRouter;
