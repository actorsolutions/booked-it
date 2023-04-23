import AuditionsController from "../auditions/index";
import { PrismaClient } from "@prisma/client";
import { Audition } from "@/utils/models/Auditions";
import { NextApiRequest, NextApiResponse } from "next";

describe("Audition Controller Tests", () => {
  const prisma = new PrismaClient();
  beforeEach(async () => {
    //sanitize db
    await prisma.user.create({
      data: {
        id: 0,
        sid: "Fake",
        email: "test@test.com",
      },
    });
  });
  afterEach(async () => {
    await prisma.user.delete({ where: { email: "test@test.com" } });
    await prisma.audition.deleteMany({});
  });
  it("Should add one audition", async () => {
    const data = {
      id: 0,
      userId: 0,
      date: 0,
      project: "Test Project",
      company: "Test Company",
      casting: undefined,
      notes: "Here is a note",
      type: "Television",
    };
    await prisma.audition.create({ data });

    const fakeReq = {
      method: "GET",
      query: { userId: "0" },
    };
    const fakeResp = {
      status: (status: any) => status,
    };
    const auditions = await AuditionsController(
      fakeReq as never as NextApiRequest,
      fakeResp as NextApiResponse
    );
    expect(auditions).toEqual(data);
  });
});
