import request from "supertest";
import app from "./app";

describe("API", () => {
  it("Should return 200 on the test route", async () => {
    const res = await request(app).get("/test");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
