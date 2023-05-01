import AuditionsController from "../api/auditions";
import {
  IntegrationTestParams,
  setup,
  testClient,
  SESSION_DATA,
} from "../../utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

describe("Audition Router integration tests", () => {
  beforeEach(async () => {
    let test: IntegrationTestParams;
    test = await setup(["audition"]);
    const { prisma } = test;
    await prisma.audition.create({
      data: {
        date: 0,
        id: 0,
        notes: "Here is a note",
        project: "Test Project",
        type: "Television",
        userId: 0,
        company: "Test Company",
        createdAt: "2023-04-28T21:50:11.638Z",
      },
    });
  });
  it("Find Auditions", async () => {
    const request = await testClient(AuditionsController);
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const expected = {
      auditions: [
        {
          callBackDate: null,
          casting: null,
          company: "Test Company",
          date: 0,
          id: 0,
          notes: "Here is a note",
          project: "Test Project",
          type: "Television",
          userId: 0,
          createdAt: "2023-04-28T21:50:11.638Z",
        },
      ],
    };

    const res = await request
      .get("/")
      .set("Cookie", [`appSession=${session}`])
      .expect(200);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
  it("Should create a audition", async () => {
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const request = await testClient(AuditionsController);
    const data = {
      callBackDate: null,
      casting: null,
      company: "Test Company",
      date: 0,
      id: 1,
      notes: "Here is a note",
      project: "Created Project",
      type: "Television",
    };
    const expected = {
      callBackDate: null,
      casting: [],
      company: "Test Company",
      date: 0,
      id: 1,
      notes: "Here is a note",
      project: "Created Project",
      type: "Television",
      userId: 0,
    };

    const res = await request
      .post("/")
      .set("Cookie", [`appSession=${session}`])
      .send(data);
    const createdAudition = res.body;

    delete createdAudition.createdAt;
    expect(createdAudition).toEqual(expected);
  });
});
