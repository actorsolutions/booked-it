import { NextApiRequest, NextApiResponse } from "next";
import { RouteHandler } from "../index";

describe("RouteHandler __tests__", () => {
  it("Should send an error when trying to send a undefined method", async () => {
    const fakeReq = {
      method: "POST",
      body: {
        data: {
          message: "Nope",
        },
      },
    };
    const fakeRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    const fakeController = {
      GET: async () => {
        return { message: "Yep" };
      },
    };

    await RouteHandler(
      fakeReq as never as NextApiRequest,
      fakeRes as never as NextApiResponse,
      fakeController
    );
    expect(fakeRes.status).toBeCalledWith(405);
    expect(fakeRes.send).toBeCalledWith("Method is not allowed");
  });
  it("Should send expected data with correct method", async () => {
    const fakeReq = {
      method: "GET",
    };
    const fakeRes = {
      send: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    const expectedMessage = { message: "Passed!" };
    const expectedCode = 200;
    const fakeController = {
      GET: async (req: any, res: any) => {
        return res.status(expectedCode).send(expectedMessage);
      },
    };

    await RouteHandler(
      fakeReq as never as NextApiRequest,
      fakeRes as never as NextApiResponse,
      fakeController
    );
    expect(fakeRes.status).toBeCalledWith(expectedCode);
    expect(fakeRes.send).toBeCalledWith(expectedMessage);
  });
});
