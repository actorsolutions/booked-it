import { deleteStatus } from "@/controllers/statuses";
import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_DATA } from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

let finalStatusCode: any, finalBody: any;

describe("Status Controller Tests", () => {
  it("Should delete a status and return a 200 and Deleted!", async () => {
    const arrayOfStatusChanges = [
      {
        id: 0,
        auditionId: 0,
        statusId: 0,
        createdAt: new Date(),
        date: new Date(),
      },
      {
        id: 1,
        auditionId: 0,
        statusId: 1,
        createdAt: new Date(),
        date: new Date(),
      },
      {
        id: 2,
        auditionId: 0,
        statusId: 3,
        createdAt: new Date(),
        date: new Date(),
      },
    ];

    const expectedResponse = {
      id: 2,
      auditionId: 0,
      statusId: 3,
      createdAt: new Date(),
    };

    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "DELETE",
      headers: { cookie: `appSession=${session}` },
      body: 1,
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
      // eslint-disable-next-line no-unused-vars
      $transaction: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
      statusChange: {
        findUnique: async () => {
          return new Promise((resolve) => {
            resolve(expectedResponse);
          });
        },
        delete: async () => {
          return new Promise((resolve) => {
            resolve(expectedResponse);
          });
        },
        findMany: async () => {
          return new Promise((resolve) => {
            resolve(arrayOfStatusChanges);
          });
        },
      },
    };
    await deleteStatus(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    expect(finalBody).toEqual({ message: "Deleted!" });
    expect(finalStatusCode).toEqual(200);
  });
});
