import { AuditionsController } from "../auditions/";
import {
  IntegrationTestParams,
  setup,
  testClient,
} from "../../../utils/testSetup";

describe("Audition Router integration tests", () => {
  beforeEach(async () => {
    let test: IntegrationTestParams;
    test = await setup(["audition"]);
    const { prisma } = test;
  });
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
    const res = await request.get("/").expect(200);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
  it("Should create a audition", async () => {
    const request = await testClient(AuditionsController);
    const now = new Date().toISOString();
    const data = {
      id: 0,
      casting: null,
      company: "Test Company",
      date: 0,
      notes: "Here is a note",
      project: "Test Project",
      type: "Television",
      userId: 0,
    };
    const expected = {
      createdAudition: {
        callBackDate: null,
        casting: [],
        company: "Test Company",
        date: 0,
        id: 0,
        notes: "Here is a note",
        project: "Test Project",
        type: "Television",
        userId: 0,
      },
    };

    const res = await request.post("/").send(data);
    const body = res.body;
    delete body.createdAudition.createdAt;
    expect(res.body).toEqual(expected);
  });
});
