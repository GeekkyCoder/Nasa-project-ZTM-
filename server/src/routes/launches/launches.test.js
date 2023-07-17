const request = require("supertest");
const app = require("../../app");
const {mongoConnect, mongoDisconnect} = require("../../services/mongo")

describe("LAUNCHES API", () => {
  // before all the test cases connect to database first
  beforeAll (async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  describe("Test GET /launches", () => {
    test("it should respond with 200 status", async () => {
      const response = await request(app).get("/launches").expect('Content-Type',/json/).expect(200)
    });
  });

  
describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
    launchDate: "25 october, 2030",
  };

  const launchDataWithoutDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
  };

  const launchDataWithInvalidDate = {
    mission: "USS Enterprise",
    rocket: "NCC 1701-D",
    target: "Kepler-62 f",
    launchDate: "hello",
  }

  // success
  test("it should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
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
          .post("/launches")
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
    .post("/launches")
    .send(launchDataWithInvalidDate)
    .expect('Content-Type', /json/)
    .expect(400)

    expect(response.body).toStrictEqual({
        error:"invalid date format"
    })
  })
});
})


