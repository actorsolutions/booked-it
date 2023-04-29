import AuditionsController from "../auditions/index";

import { NextApiRequest, NextApiResponse } from "next";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";
let finalStatusCode: any, finalBody: any;
describe("Audition Controller Tests", () => {
  it("Should add one audition", async () => {
    const auditionsArray = [
      {
        id: 0,
        userId: 0,
        date: 0,
        project: "Test Project",
        company: "Test Company",
        casting: undefined,
        notes: "Here is a note",
        type: "Television",
      },
    ];
    const session = await generateSessionCookie(
      {
        user: {
          name: "Test User",
          sid: "0000000",
          email: "test@test.com",
          id: "0",
        },
      },
      {
        secret: process.env.AUTH0_SECRET as string,
      }
    );
    const fakeReq = {
      method: "GET",
      headers: { cookie: `appSession=${session}` },
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
      findMany: async () => {
        return new Promise((resolve) => {
          resolve(auditionsArray);
        });
      },
    };
    await AuditionsController(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    // @ts-ignore
    expect(finalBody).toEqual({ auditions: auditionsArray });
    expect(finalStatusCode).toEqual(200);
  });
});
