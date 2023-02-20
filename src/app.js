const express = require("express");

const currentWeatherRouter = require("./routes/currentWeather");

const app = express();

// Parse incoming JSON into JavaScript objects
app.use(express.json());

// Register the routes
app.use(currentWeatherRouter);

module.exports = app;
