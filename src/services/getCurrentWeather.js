const axios = require("axios");

const getCurrentWeather = async (lat, lon) => {
  const url = `${process.env.CURRENT_WEATHER_BASE_URL}?appid=${process.env.API_KEY}&units=imperial&lat=${lat}&lon=${lon}`;

  const result = await axios({
    method: "get",
    url,
  });

  return result.data;
};

module.exports = getCurrentWeather;
