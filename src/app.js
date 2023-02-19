const express = require("express");

const app = express();

// Parse incoming JSON into JavaScript objects
app.use(express.json());

module.exports = app;
