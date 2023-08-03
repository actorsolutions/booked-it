import {
  getAuditions,
  addAudition,
  getAudition,
  updateAudition,
  deleteAudition,
  addAuditions,
} from "@/controllers";
import { NextApiRequest, NextApiResponse } from "next";
import { SESSION_DATA } from "@/utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

let finalStatusCode: any, finalBody: any;

describe("Auditions Controller Tests", () => {
  it("Should return an array of auditions", async () => {
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
        status: "Scheduled",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            callBackDate: new Date(),
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
        ],
      },
    ];
    const expected = [
      {
        id: 0,
        userId: 0,
        date: 0,
        project: "Test Project",
        company: "Test Company",
        casting: undefined,
        notes: "Here is a note",
        type: "Television",
        status: "Scheduled",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
            callBackDate: new Date(),
            type: "scheduled",
          },
        ],
      },
    ];
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
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
    await getAuditions(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    // @ts-ignore
    expect(finalBody).toEqual({ auditions: expected });
    expect(finalStatusCode).toEqual(200);
  });
  it("Should add one audition", async () => {
    const audition = {
      userId: 0,
      date: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "television",
      status: "scheduled",
      archived: false,
      statuses: [
        {
          type: "booked",
          statusId: 4,
          date: 0,
        },
      ],
    };
    const expected = {
      archived: false,
      company: "Test Company",
      date: 0,
      notes: "Here is a note",
      project: "Test Project",
      status: "scheduled",
      casting: undefined,
      statuses: [
        {
          auditionId: 0,
          date: 0,
          id: 1,
          statusId: 4,
          type: "booked",
        },
      ],
      type: "television",
      userId: 0,
    };

    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "POST",
      headers: { cookie: `appSession=${session}` },
      body: JSON.stringify(audition),
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
      create: async () => {
        return new Promise((resolve) => {
          resolve({
            ...audition,
            statuses: [
              {
                auditionId: 0,
                date: 0,
                id: 1,
                statusId: 4,
                Status: {
                  type: "booked",
                  id: 4,
                },
              },
            ],
          });
        });
      },
    };
    await addAudition(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    // @ts-ignore
    expect(finalBody).toEqual(expected);
    expect(finalStatusCode).toEqual(200);
  });
});

describe("Audition Controller Tests", () => {
  it("Should Find one audition", async () => {
    const audition = {
      userId: 0,
      date: 0,
      id: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "Television",
      archived: false,
      statuses: [
        {
          id: 0,
          statusId: 0,
          auditionId: 0,
          date: 0,
          Status: {
            id: 0,
            type: "scheduled",
          },
        },
      ],
    };
    const expected = {
      archived: false,
      company: "Test Company",
      date: 0,
      id: 0,
      notes: "Here is a note",
      project: "Test Project",
      statuses: [
        {
          auditionId: 0,
          date: 0,
          id: 0,
          statusId: 0,
          type: "scheduled",
        },
      ],
      type: "Television",
      userId: 0,
    };
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "GET",
      headers: { cookie: `appSession=${session}` },
      body: JSON.stringify(audition),
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
          resolve(audition);
        });
      },
    };
    await getAudition(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    expect(finalBody).toEqual(expected);
    expect(finalStatusCode).toEqual(200);
  });
  it("Should update and return one audition", async () => {
    const today = new Date();
    const audition = {
      userId: 0,
      date: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "television",
      archived: false,
      statuses: [
        {
          id: 0,
          createdAt: today,
          date: 0,
          auditionId: 0,
          Status: {
            type: "submitted",
            id: 0,
          },
        },
        {
          id: 1,
          createdAt: today,
          date: 0,
          auditionId: 0,
          Status: {
            type: "booked",
            id: 4,
          },
        },
      ],
    };
    const expected = {
      archived: false,
      company: "Test Company",
      date: 0,
      notes: "Here is a note",
      project: "Test Project",
      statuses: [
        {
          auditionId: 0,
          createdAt: today,
          date: 0,
          id: 0,
          type: "submitted",
        },
        {
          auditionId: 0,
          createdAt: today,
          date: 0,
          id: 1,
          type: "booked",
        },
      ],
      type: "television",
      userId: 0,
    };
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "PUT",
      headers: { cookie: `appSession=${session}` },
      body: JSON.stringify(audition),
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
      $transaction: async () => {
        return new Promise((resolve) => {
          resolve(expected.statuses);
        });
      },
      statusChange: {
        upsert: async () => {
          return new Promise((resolve) => {
            resolve(expected.statuses);
          });
        },
      },
      audition: {
        update: async () => {
          return new Promise((resolve) => {
            resolve(audition);
          });
        },
      },
    };
    await updateAudition(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    expect(finalBody).toEqual(expected);
    expect(finalStatusCode).toEqual(200);
  });
  it("Should delete and return confirmed and deleted audition", async () => {
    const audition = {
      userId: 0,
      date: 0,
      id: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "Television",
      archived: false,
    };

    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "DELETE",
      headers: { cookie: `appSession=${session}` },
      body: audition,
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
      deleteMany: async () => {
        return new Promise((resolve) => {
          resolve({ message: "", count: 1 });
        });
      },
    };
    await deleteAudition(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    expect(finalBody).toEqual({ message: "Deleted!" });
    expect(finalStatusCode).toEqual(200);
  });
});

describe("Bulk Audition Controller Tests", () => {
  it("Should return an array of auditions", async () => {
    const auditionsArray = [
      {
        statuses: [
          {
            type: "auditioned",
            date: 1676592000,
            statusId: 2,
          },
        ],
        casting: ["Doro/Sherwood Casting ."],
        project: "THE WEATHERMAN",
        date: 1676592000,
        notes:
          "URL: https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=25135869&result_id=372056, imported from Actors Access",
        archived: true,
        company: "UNKNOWN",
        type: "television",
      },
      {
        statuses: [
          {
            type: "auditioned",
            date: 1676592000,
            statusId: 2,
          },
        ],
        casting: ["Doro/Sherwood Casting ."],
        project: "THE WEATHERMAN",
        date: 1676592000,
        notes:
          "URL: https://actorsaccess.com/virtualaudition/?fromqs=1&qs_results_period=past&qs_filter_type=all&action=read&msg=25135869&result_id=372056, imported from Actors Access",
        archived: true,
        company: "UNKNOWN",
        type: "television",
      },
    ];
    const expected = {
      count: 3,
    };
    const session = await generateSessionCookie(SESSION_DATA, {
      secret: process.env.AUTH0_SECRET as string,
    });
    const fakeReq = {
      method: "POST",
      headers: { cookie: `appSession=${session}` },
      body: JSON.stringify({ data: auditionsArray }),
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
      createMany: async () => {
        return new Promise((resolve) => {
          resolve({ count: 3 });
        });
      },
    };
    await addAuditions(
      fakeReq as never as NextApiRequest,
      fakeResp as never as NextApiResponse,
      mockDb as never
    );
    // @ts-ignore
    expect(finalBody).toEqual(expected);
    expect(finalStatusCode).toEqual(200);
  });
});
