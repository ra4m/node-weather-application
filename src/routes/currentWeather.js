const express = require("express");
const validator = require("validator");
const path = require("path");

const getCurrentWeather = require("../services/getCurrentWeather");
const getCoordinatesByZipcode = require("../services/getCoordinatesByZipcode");
const logger = require("../utils/logger");
const { count } = require("console");

const filename = path.basename(__filename);
const router = new express.Router();

// Get weather by coordinates
router.get("/weather-by-coordinates", async (req, res) => {
  const { lat, lon } = req.body;

  // Validation logic to ensure lat and lon values are set properly within the request body
  if (!lat || !lon) {
    res.status(400).send("Invalid body");
    return;
  }
  if (typeof lat === "string" && !validator.isNumeric(lat)) {
    res.status(400).send("Invalid lattitude");
    return;
  }
  if (typeof lon === "string" && !validator.isNumeric(lon)) {
    res.status(400).send("Invalid longitude");
    return;
  }

  try {
    const result = await getCurrentWeather(lat, lon);

    logger.info(
      `${filename}: /weather-by-coordinates: ${JSON.stringify(result)}`
    );

    res.status(200).send(result);
    return;
  } catch (e) {
    logger.error(`${filename}: /weather-by-coordinates: ${e.stack}`);
    res.status(500).send();
    return;
  }
});

// Get weather by coordinates
router.get("/weather-by-zipcode", async (req, res) => {
  const { zipcode, country } = req.query;

  // Validation logic to ensure zipcode is valid - if country is blank assume it belongs to US
  if (!zipcode) {
    res.status(400).send("Zipcode is required");
    return;
  }
  if (!validator.isPostalCode(zipcode, country ? country : "US")) {
    res.status(400).send("Invalid zipcode or country");
    return;
  }

  // Retrieve coordinates using the input zipcode
  let lat, lon;
  try {
    const coordinatesResult = await getCoordinatesByZipcode(zipcode, country);
    lat = coordinatesResult.lat;
    lon = coordinatesResult.lon;
    logger.info(
      `${filename}: /weather-by-zipcode: Lattitude & Longitude retrieved: ${lat}, ${lon}`
    );
  } catch (e) {
    logger.error(`${filename}: /weather-by-zipcode: ${e.stack}`);
    res.status(400).send("Invalid zipcode or country");
    return;
  }

  try {
    // Fetch the current weather after geocoding zipcode into coordinates
    const weatherResult = await getCurrentWeather(lat, lon);
    logger.info(
      `${filename}: /weather-by-zipcode: ${JSON.stringify(weatherResult)}`
    );

    res.status(200).send(weatherResult);
    return;
  } catch (e) {
    logger.error(`${filename}: /weather-by-zipcode: ${e.stack}`);
    res.status(500).send();
    return;
  }
});

module.exports = router;
