import { Audition } from "../Auditions";
import { PrismaClient } from "@prisma/client";

describe("It Tests the Auditions Model", () => {
  it("returns an audition with id", async () => {
    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "This is a note",
      type: "film",
      status: "scheduled",
      archived: false,
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const audition = await Audition.findById(
      expectedResponse.id,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(audition).toEqual(expectedResponse);
  });
  // it("Creates and saves an audition", async () => {
  //   const auditionData = {
  //     id: 0,
  //     userId: 0,
  //     date: 0,
  //     project: "FakeCompany",
  //     company: "FakeProject",
  //     callbackDate: 0,
  //     casting: [{ name: "FakeCasting", company: "Casting" }],
  //     notes: undefined,
  //     type: "television",
  //     status: "scheduled",
  //     archived: false,
  //   };
  //   const expectedResponse = {
  //     id: 0,
  //     userId: 0,
  //     date: 0,
  //     project: "FakeCompany",
  //     company: "FakeProject",
  //     callbackDate: 0,
  //     casting: [{ name: "FakeCasting", company: "Casting" }],
  //     notes: "No notes Added",
  //     type: "television",
  //     status: "scheduled",
  //     archived: false,
  //   };
  //   const mockPrisma = {
  //     upsert: async () => {
  //       return new Promise((resolve) => {
  //         resolve(expectedResponse);
  //       });
  //     },
  //   };
  //
  //   const audition = new Audition(auditionData);
  //   expect(
  //     await audition.save(mockPrisma as unknown as PrismaClient["audition"])
  //   ).toEqual(expectedResponse);
  // });
  it("Finds all auditions with UserId", async () => {
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
        status: "scheduled",
        archived: false,
        statuses: [
          {
            date: "2023-06-21T10:03:21.011Z",
            id: 2,
            statusId: 0,
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
        ],
      },
      {
        id: 1,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callbackDate: undefined,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
        status: "scheduled",
        archived: false,
        statuses: [
          {
            date: "2023-06-21T10:03:21.011Z",
            id: 2,
            statusId: 0,
            Status: {
              id: 0,
              type: "scheduled",
            },
          },
        ],
      },
    ];
    const formattedAuditions = [
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
        status: "scheduled",
        archived: false,
        statuses: [
          {
            date: "2023-06-21T10:03:21.011Z",
            id: 2,
            statusId: 0,
            type: "scheduled",
          },
        ],
      },
      {
        id: 1,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callbackDate: undefined,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
        status: "scheduled",
        archived: false,
        statuses: [
          {
            date: "2023-06-21T10:03:21.011Z",
            id: 2,
            statusId: 0,
            type: "scheduled",
          },
        ],
      },
    ];

    const mockPrisma = {
      findMany: async () => {
        return new Promise((resolve) => {
          resolve(auditions);
        });
      },
    };
    const userAuditions = await Audition.findByUserId(
      auditions[0].userId,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(userAuditions).toEqual(formattedAuditions);
  });
  it("Deletes Audition by Id and returns Audition", async () => {
    const audition = {
      id: 0,
      userId: 1,
      date: 0,
      project: "Test",
      company: "Test Company",
      callbackDate: undefined,
      casting: [{ name: "Test testerson", company: "Tester Casting" }],
      notes: "Notes!",
      type: "film",
      status: "scheduled",
      archived: false,
    };

    const mockPrisma = {
      deleteMany: async () => {
        return new Promise((resolve) => {
          resolve(audition);
        });
      },
    };
    const deletedAudition = await Audition.delete(
      audition.id,
      audition.userId,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(deletedAudition).toEqual(audition);
  });
  it("Creates an audition and returns it", async () => {
    const today = new Date();
    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "No notes Added",
      type: "television",
      status: "scheduled",
      archived: false,
      statuses: [
        {
          type: "scheduled",
          date: today,
          statusId: 0,
        },
      ],
    };
    const auditionData = {
      id: 1,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: undefined,
      type: "television",
      status: "scheduled",
      archived: false,
      statuses: [
        {
          date: today,
          id: 2,
          statusId: 0,
          auditionId: 1,
          Status: {
            id: 0,
            type: "scheduled",
          },
        },
      ],
    };
    const mockPrisma = {
      create: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const newAudition = await Audition.create(
      auditionData,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(newAudition).toEqual(expectedResponse);
  });
});
