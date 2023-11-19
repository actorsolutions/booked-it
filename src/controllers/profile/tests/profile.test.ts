import { updateUser } from "@/controllers/profile";
import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_DATA } from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

let finalStatusCode: any, finalBody: any;
describe("Profile controller tests", () => {
  it("should update a profile ", async () => {
    const user = {
      id: 0,
      email: "test@test.com",
      sid: "0000000",
    };

    const session = generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "GET",
      headers: { cookie: `appSession=${session}` },
      body: user,
      query: { id: 0 },
    };
    const fakeResp = {
      json: (json: any) => json,
      send: (send: any) => send,
      status: (code: any) => {
        finalStatusCode = code;
        return {
          send: (body: any) => {
            finalBody = body;
          },
        };
      },
      getHeader: (header: any) => header,
      setHeader: (header: any) => header,
      cookie: `appSession=${session}`,
    };
    const mockDb = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(user);
        });
      },
    };
    await updateUser(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    expect(finalBody).toEqual(user);
    expect(finalStatusCode).toEqual(200);
  });
});
