const express = require("express");
const validator = require("validator");
const path = require("path");

const getCurrentWeather = require("../services/getCurrentWeather");
const logger = require("../utils/logger");

const filename = path.basename(__filename);
const router = new express.Router();

// Get weather by coordinates
router.get("/weather-by-coordinates", async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      throw new Error("Invalid body");
    }

    if (typeof lat === "string" && !validator.isNumeric(lat)) {
      throw new Error("Invalid lattitude");
    }

    if (typeof lon === "string" && !validator.isNumeric(lon)) {
      throw new Error("Invalid longitude");
    }

    try {
      const result = await getCurrentWeather(lat, lon);

      logger.info(`${filename}: ${JSON.stringify(result)}`);
      res.status(200).send(result);
    } catch (e) {
      logger.info(`${filename}: ${e.stack}`);
      res.status(500).send();
    }
  } catch (e) {
    logger.info(`${filename}: ${e.stack}`);
    res.status(400).send(e.message);
  }
});

module.exports = router;
