const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("it should respond with 200 status", async () => {
    const response = await request(app).get("/v1/launches");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "mission 113",
    rocket: "spaceX",
    target: "kepler-1295",
    launchDate: "25 october, 2030",
  };

  const launchDataWithoutDate = {
    mission: "mission 113",
    rocket: "spaceX",
    target: "kepler-1295",
  };

  const launchDataWithInvalidDate = {
    mission: "mission 113",
    rocket: "spaceX",
    target: "kepler-1295",
    launchDate: "hello",
  }

  // success
  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/v1/launches")
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201)
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });


   // error cases for missing required properties
  test("it should catch missing required properties", async ()=> {
        const response = await request(app)
          .post("/v1/launches")
          .send(launchDataWithoutDate)
          .expect('Content-Type', /json/)
          .expect(400)

          expect(response.body).toStrictEqual({
            error:"missing launch fields"
          })
  })


//   error case for invalid date format 
  test("it should catch invalid date format", async ()=> {
    const response = await request(app)
    .post("/v1/launches")
    .send(launchDataWithInvalidDate)
    .expect('Content-Type', /json/)
    .expect(400)

    expect(response.body).toStrictEqual({
        error:"invalid date format"
    })
  })



});
