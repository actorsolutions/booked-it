import AuditionController from "@/pages/api/auditions/[id]";
import {
  IntegrationTestParams,
  setup,
  testClient,
  SESSION_DATA,
  tearDown,
} from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

const TEST_AUDITION = {
  date: 0,
  id: 0,
  notes: "Here is a note",
  project: "Test Project",
  type: "television",
  userId: 0,
  company: "Test Company",
  createdAt: "2023-04-28T21:50:11.638Z",
  archived: false,
};

describe("Audition [id] integration tests", () => {
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
        type: "television",
        userId: 0,
        company: "Test Company",
        createdAt: "2023-04-28T21:50:11.638Z",
        archived: false,
        statuses: {
          create: [{ date: 0, id: 2, statusId: 0 }],
        },
      },
    });
  });
  afterEach(async () => {
    await tearDown(test);
  });
  it("should get a particular audition", async () => {
    const request = await testClient(AuditionController, {
      id: TEST_AUDITION.id,
    });
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const expectedAudition = {
      callBackDate: null,
      casting: null,
      company: "Test Company",
      createdAt: "2023-04-28T21:50:11.638Z",
      date: 0,
      id: 0,
      notes: "Here is a note",
      project: "Test Project",
      type: "television",
      userId: 0,
      archived: false,
      statuses: [
        {
          auditionId: 0,
          date: 0,
          id: 2,
          statusId: 0,
          type: "submitted",
        },
      ],
    };

    const res = await request
      .get(`/${TEST_AUDITION.id}`)
      .set("Cookie", [`appSession=${session}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expectedAudition);
  });
  it("should throw an error if user does not own audition", async () => {
    const request = await testClient(AuditionController, {
      id: TEST_AUDITION.id,
    });
    const session = await generateSessionCookie(
      {
        user: {
          id: "3",
        },
      },
      {
        secret: process.env.AUTH0_SECRET as string,
      }
    );

    const res = await request
      .get(`/${TEST_AUDITION.id}`)
      .set("Cookie", [`appSession=${session}`]);

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "Unauthorized",
    });
  });
  it("should update an audition", async () => {
    const request = await testClient(AuditionController);
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const updateAuditionData = {
      company: "Test Company",
      createdAt: "2023-04-28T21:50:11.638Z",
      date: 0,
      id: 0,
      notes: "THIS IS A DIFFERENT NOTE",
      project: "UPDATED PROJECT",
      type: "television",
      userId: 0,
      archived: false,
      statuses: [
        {
          date: 0,
          id: 2,
          statusId: 0,
          type: "submitted",
        },
      ],
    };
    const expected = {
      archived: false,
      callBackDate: null,
      casting: [],
      company: "Test Company",
      createdAt: "2023-04-28T21:50:11.638Z",
      date: 0,
      id: 0,
      notes: "THIS IS A DIFFERENT NOTE",
      project: "UPDATED PROJECT",
      statuses: [
        {
          auditionId: 0,
          date: 0,
          id: 2,
          statusId: 0,
          type: "submitted",
        },
      ],
      type: "television",
      userId: 0,
    };

    const res = await request
      .put(`/${TEST_AUDITION.id}`)
      .set("Content-type", "text/plain")
      .set("Accept", "application/json")
      .set("Cookie", [`appSession=${session}`])
      .send(JSON.stringify(updateAuditionData));

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expected);
  });
  it("should throw an error for unauthorized put request", async () => {
    const updateAuditionData = {
      company: "Test Company",
      createdAt: "2023-04-28T21:50:11.638Z",
      date: 0,
      id: 0,
      notes: "THIS IS A DIFFERENT NOTE",
      project: "UPDATED PROJECT",
      type: "television",
      userId: 0,
      archived: false,
      statuses: [
        {
          id: 2,
          statusId: 0,
          date: 0,
          type: "submitted",
        },
        {
          id: 1,
          statusId: 4,
          date: 0,
          type: "booked",
        },
      ],
    };

    const request = await testClient(AuditionController, {
      id: TEST_AUDITION.id,
    });
    const session = await generateSessionCookie(
      {
        user: {
          id: "3",
        },
      },
      {
        secret: process.env.AUTH0_SECRET as string,
      }
    );

    const res = await request
      .put(`/${TEST_AUDITION.id}`)
      .set("Content-type", "text/plain")
      .set("Accept", "application/json")
      .set("Cookie", [`appSession=${session}`])
      .send(JSON.stringify(updateAuditionData));

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      message: "Unauthorized",
    });
  });
  it("should delete an audition", async () => {
    const request = await testClient(AuditionController, {
      id: TEST_AUDITION.id,
    });
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const res = await request
      .delete(`/${TEST_AUDITION.id}`)
      .set("Cookie", [`appSession=${session}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: "Deleted!" });
  });
  it("should throw an error for invalid delete request", async () => {
    const request = await testClient(AuditionController, { id: 9 });
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const BAD_AUDITION = {
      date: 0,
      id: 9,
      notes: "Bad note",
      project: "Test Project is bad",
      type: "Television",
      userId: 0,
      company: "BAD Company",
      createdAt: "2023-04-28T21:50:11.638Z",
      archived: false,
    };

    const res = await request
      .delete(`/${BAD_AUDITION.id}`)
      .set("Cookie", [`appSession=${session}`]);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({
      message: "Failed to delete",
    });
  });
  it("should throw an error for unauthorized post request", async () => {
    const request = await testClient(AuditionController, {
      id: TEST_AUDITION.id,
    });
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const res = await request
      .post(`/${TEST_AUDITION.id}`)
      .set("Cookie", [`appSession=${session}`]);

    expect(res.statusCode).toEqual(405);
    expect(res.text).toEqual("Method is not allowed");
  });
});
