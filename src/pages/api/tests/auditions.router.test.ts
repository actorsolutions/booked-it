import { AuditionsController } from "../auditions/";
import { testClient } from "../../../utils/testSetup";

describe("Audition Router integration tests", () => {
  it("Audition Test", async () => {
    const request = await testClient(AuditionsController);
    const expected = {
      auditions: [
        {
          callBackDate: null,
          casting: null,
          company: "Test Company",
          createdAt: "2023-04-17T04:34:26.005Z",
          date: 0,
          id: 0,
          notes: "Here is a note",
          project: "Test Project",
          type: "Television",
          userId: 0,
        },
      ],
    };
    const res = await request.get("/").send({ userId: 0 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
});
