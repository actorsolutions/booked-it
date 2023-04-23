import request from "supertest";
import Auditions, { AuditionsController } from "../auditions/";
import { testClient } from "../../../utils/testSetup";

describe("Audition Router integration tests", () => {
  it("Audition Test", async () => {
    const request = await testClient(AuditionsController);
    const expected = {
      id: 0,
      userId: 0,
      date: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "Television",
    };
    const res = await request.get("/").send({ userId: 1 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
});
