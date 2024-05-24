import { Report } from "../Report";
import { PrismaClient } from "@prisma/client";

describe("Report Model Tests", () => {
  it("Should return report data", async () => {
    const userId = 0;
    const auditions = [
      {
        id: 0,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callbackDate: undefined,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film",
        archived: true,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/01/01"),
            callBackDate: new Date(),
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
          {
            id: 1,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/02/01"),
            callBackDate: undefined,
            Status: {
              id: 0,
              type: "auditioned",
            },
          },
        ],
      },

      {
        id: 0,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callbackDate: undefined,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
        archived: true,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/01/01"),
            callBackDate: new Date(),
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
          {
            id: 1,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/02/01"),
            callBackDate: undefined,
            Status: {
              id: 0,
              type: "auditioned",
            },
          },
        ],
      },
      {
        id: 0,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callbackDate: undefined,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
        archived: true,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/01/01"),
            callBackDate: new Date(),
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
          {
            id: 1,
            statusId: 0,
            auditionId: 0,
            date: new Date("01/02/01"),
            callBackDate: undefined,
            Status: {
              id: 0,
              type: "auditioned",
            },
          },
        ],
      },
    ];
    const reportData = {
      total: auditions.length,
      topCasting: "Test testerson",
      topType: "theater",
      totalByAuditionType: {
        totalSubmitted: 0,
        totalAuditioned: 3,
        totalCallback: 0,
        totalBooked: 0,
      },
    };
    const mockPrisma = {
      findMany: async () => {
        return new Promise((resolve) => {
          resolve(auditions);
        });
      },
    };

    const report = await Report.getReportsByUserId(
      userId,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(report).toEqual(reportData);
  });
});
