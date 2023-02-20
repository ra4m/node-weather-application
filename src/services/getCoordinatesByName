const axios = require("axios");

const getCoordinatesByName = async (city, state, country) => {
  const url = `${process.env.GEOCODING_NAME_BASE_URL}?appid=${
    process.env.API_KEY
  }&limit=1&q=${city}${state ? "," + state : ""}${
    country ? "," + country : ""
  }`;

  const result = await axios({
    method: "get",
    url,
  });

  return result.data[0];
};

module.exports = getCoordinatesByName;
