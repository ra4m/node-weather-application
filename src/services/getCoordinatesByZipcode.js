const axios = require("axios");

const getCoordinatesByZipcode = async (zipcode, country) => {
  let url;

  if (zipcode && country) {
    url = `${process.env.GEOCODING_ZIPCODE_BASE_URL}?appid=${process.env.API_KEY}&zip=${zipcode},${country}`;
  } else {
    url = `${process.env.GEOCODING_ZIPCODE_BASE_URL}?appid=${process.env.API_KEY}&zip=${zipcode}`;
  }

  const result = await axios({
    method: "get",
    url,
  });

  return result.data;
};

module.exports = getCoordinatesByZipcode;
