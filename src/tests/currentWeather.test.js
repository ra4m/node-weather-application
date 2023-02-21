const request = require("supertest");
const app = require("../app");

describe("Test for /weather-by-coordinates - GET method", () => {
  test("Should fetch weather for given coordinates", async () => {
    const response = await request(app)
      .get("/weather-by-coordinates")
      .send({
        lat: 40.71332,
        lon: -74.00347,
      })
      .expect(200);

    // Assert that the given coordinates correspond to New York
    const { name } = response.body;
    expect(name).toBe("New York");
  });

  test("Should not accept invalid coordinates", async () => {
    const response = await request(app)
      .get("/weather-by-coordinates")
      .send({
        lat: "abcd",
        lon: "vxyz",
      })
      .expect(400);
  });
});

describe("Test for /weather-by-zipcode - GET method", () => {
  test("Should fetch weather for given zipcode and country (US)", async () => {
    const response = await request(app)
      .get("/weather-by-zipcode")
      .query({ zipcode: 10005, country: "US" })
      .expect(200);

    // Assert that the given coordinates correspond to New York
    const { name } = response.body;
    expect(name).toBe("New York");
  });

  test("Should fetch weather for given zipcode and country (non-US)", async () => {
    const response = await request(app)
      .get("/weather-by-zipcode")
      .query({ zipcode: 75000, country: "FR" })
      .expect(200);

    // Assert that the given coordinates correspond to Paris
    const { name } = response.body;
    expect(name).toBe("Paris");
  });

  test("Should fetch weather for given zipcode only (US Only)", async () => {
    const response = await request(app)
      .get("/weather-by-zipcode")
      .query({ zipcode: 10005 })
      .expect(200);

    // Assert that the given coordinates correspond to New York
    const { name } = response.body;
    expect(name).toBe("New York");
  });

  test("Should not fetch weather for given zipcode only (non-US)", async () => {
    const response = await request(app)
      .get("/weather-by-zipcode")
      .query({ zipcode: 75000 })
      .expect(400);
  });

  test("Should not fetch weather if zipcode is missing", async () => {
    const response = await request(app).get("/weather-by-zipcode").expect(400);
  });

  test("Should not fetch weather if zipcode is an invalid US zipcode", async () => {
    const response = await request(app)
      .get("/weather-by-zipcode")
      .query({ zipcode: 88888 })
      .expect(400);
  });
});

describe("Test for /weather-by-name - GET method", () => {
  test("Should fetch weather for given location name - city, state, country (US)", async () => {
    const response = await request(app)
      .get("/weather-by-name")
      .send({
        city: "New York",
        state: "NY",
        country: "US",
      })
      .expect(200);

    // Assert that the given coordinates correspond to New York
    const { name } = response.body;
    expect(name).toBe("New York");
  });

  test("Should fetch weather for given location name - city, country (non-US)", async () => {
    const response = await request(app)
      .get("/weather-by-name")
      .send({
        city: "Sydney",
        country: "AU",
      })
      .expect(200);

    // Assert that the given coordinates correspond to Sydney
    const { name } = response.body;
    expect(name).toBe("Sydney");
  });

  test("Should not fetch weather for given location name is city is missing", async () => {
    const response = await request(app)
      .get("/weather-by-name")
      .send({
        country: "CA",
      })
      .expect(400);
  });
});
