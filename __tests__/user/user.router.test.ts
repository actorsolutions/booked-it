import UserController from "@/pages/api/user";
import {
  IntegrationTestParams,
  setup,
  testClient,
  SESSION_DATA,
  tearDown,
} from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
import { decryptEntry } from "@/models/utils/UserUtils";

describe("User Router Tests", () => {
  let test: IntegrationTestParams;
  const timeStamp = "2023-09-17T17:42:32.085Z";
  const userData = {
    id: 0,
    sid: "0000000",
    email: "test@test.com",
    createdAt: timeStamp,
  };
  beforeEach(async () => {
    test = await setup(["user"]);
    const { prisma } = test;
    await prisma.user.create({
      data: userData,
    });
  });
  afterEach(async () => {
    await tearDown(test);
  });
  it("Updates User", async () => {
    const request = await testClient(UserController);
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });

    const AA_UN = "actors@email.com";
    const AA_PW = "password1234";
    const updateData = {
      ...userData,
      firstName: "Wally",
      lastName: "DeBell",
      AA_UN,
      AA_PW,
    };
    const expected = {
      ...userData,
      firstName: "Wally",
      lastName: "DeBell",
      AA_UN,
      AA_PW,
      CN_PW: null,
      CN_UN: null,
      representation: null,
    };

    const res = await request
      .put("/")
      .set("Content-type", "text/plain")
      .set("Accept", "application/json")
      .set("Cookie", [`appSession=${session}`])
      .send(JSON.stringify(updateData))
      .expect(200);

    expect(res.statusCode).toEqual(200);
    expect(res.body.AA_UN).not.toEqual(AA_UN);
    const decryptedBody = {
      ...res.body,
      AA_UN: decryptEntry(res.body.AA_UN),
      AA_PW: decryptEntry(res.body.AA_PW),
    };
    expect(decryptedBody).toEqual(expected);
  });
});
