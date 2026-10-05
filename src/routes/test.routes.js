const express = require("express");

const testRouter = express.Router();

testRouter.get("/api/health", (req, res) => {
  res.send("API is working");
});

module.exports = testRouter;