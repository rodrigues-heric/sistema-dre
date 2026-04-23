import request from "supertest";
import app from "./app";

const API_PREFIX: string = "/api/v1";

describe("API start", () => {
  it("Should return 404 for a not exiting route", async () => {
    const result = await request(app).get("/random-route");
    expect(result.status).toBe(404);
  });

  it("Should access dre-rentabilidade successfully", async () => {
    const result = await request(app).get(`${API_PREFIX}/dre-rentabilidade`);
    expect(result.status).not.toBe(500);
  });
});
