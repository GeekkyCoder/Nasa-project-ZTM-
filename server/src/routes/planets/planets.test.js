const request = require("supertest");
const app = require("../../app");

describe("Test GET /planets", () => {
  test("it should respond with 200 status", async () => {
    const response = await request(app).get("/planets");
    expect(response.statusCode).toBe(200);
  });
});