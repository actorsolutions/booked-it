import AuditionsController from "@/pages/api/auditions";
import {
  IntegrationTestParams,
  setup,
  testClient,
  SESSION_DATA,
  tearDown,
} from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { audition_types, audition_statuses } from "@prisma/client";
describe("Auditions Router integration tests", () => {
  let test: IntegrationTestParams;

  beforeEach(async () => {
    test = await setup(["audition", "user"]);
    const { prisma } = test;
    await prisma.user.create({
      data: {
        id: 0,
        sid: "0000000",
        email: "test@test.com",
      },
    });
    await prisma.audition.create({
      data: {
        date: 0,
        id: 0,
        notes: "Here is a note",
        project: "Test Project",
        type: "television" as audition_types,
        userId: 0,
        company: "Test Company",
        createdAt: "2023-04-28T21:50:11.638Z",
        status: "booked" as audition_statuses,
        archived: false,
      },
    });
  });
  afterEach(async () => {
    await tearDown(test);
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
          type: "television",
          userId: 0,
          createdAt: "2023-04-28T21:50:11.638Z",
          status: "booked",
          archived: false,
          statuses: [],
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
  it("Should create an audition", async () => {
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const request = await testClient(AuditionsController);
    const body = {
      callBackDate: null,
      casting: null,
      company: "Test Company",
      date: 0,
      id: 1,
      notes: "Here is a note",
      project: "Created Project",
      type: "television",
      status: "booked",
      archived: false,
      statuses: [],
    };
    const expected = {
      callBackDate: null,
      casting: [],
      company: "Test Company",
      date: 0,
      id: 1,
      notes: "Here is a note",
      project: "Created Project",
      type: "television",
      userId: 0,
      status: "booked",
      archived: false,
      statuses: [],
    };
    const res = await request
      .post("/")
      .set("Content-type", "text/plain")
      .set("Accept", "application/json")
      .set("Cookie", [`appSession=${session}`])
      .send(JSON.stringify(body));

    const createdAudition = res.body;

    delete createdAudition.createdAt;
    expect(createdAudition).toEqual(expected);
  });
});
