import BulkAuditionsController from "@/pages/api/auditions/createmany";
import {
  IntegrationTestParams,
  setup,
  testClient,
  SESSION_DATA,
  tearDown,
} from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { audition_types } from "@prisma/client";

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
  });
  afterEach(async () => {
    await tearDown(test);
  });
  it("Should create multiple auditions", async () => {
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const request = await testClient(BulkAuditionsController);
    const body = {
      data: [
        {
          statuses: {
            create: {
              date: 0,
              Status: {
                connect: {
                  id: 2,
                },
              },
            },
          },
          casting: ["Doro/Sherwood Casting ."],
          project: "THE WEATHERMAN",
          date: 1676592000,
          notes:
            "URL: https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=25135869&result_id=372056, imported from Actors Access",
          archived: true,
          company: "UNKNOWN",
          type: "television" as audition_types,
          id: 0,
          userId: 0,
        },
      ],
    };
    const expected = { count: 1 };
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
