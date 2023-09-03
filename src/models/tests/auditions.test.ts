import { Audition } from "../Auditions";
import { PrismaClient, Prisma, audition_types } from "@prisma/client";

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
      type: "film" as audition_types,
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
  it("Updates an audition", async () => {
    const today = new Date();
    const updateData = {
      id: 0,
      createdAt: new Date(),
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television" as audition_types,
      archived: false,
      statuses: [
        {
          id: 0,
          statusId: 0,
          createdAt: new Date(),
          date: 0,
          type: "submitted",
        },
        {
          id: 0,
          statusId: 4,
          createdAt: new Date(),
          date: 0,
          type: "booked",
        },
      ],
    };
    const returnData = {
      id: 0,
      createdAt: today,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television" as audition_types,
      archived: false,
      statuses: [
        {
          id: 0,
          auditionId: 0,
          statusId: 0,
          createdAt: today,
          date: 0,
          Status: {
            type: "submitted",
            id: 0,
          },
        },
        {
          id: 1,
          auditionId: 0,
          statusId: 4,
          createdAt: today,
          date: 0,
          Status: {
            type: "booked",
            id: 4,
          },
        },
      ],
    };

    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      createdAt: today,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television",
      archived: false,
      statuses: [
        {
          id: 0,
          auditionId: 0,
          statusId: 0,
          createdAt: today,
          date: 0,
          type: "submitted",
        },
        {
          type: "booked",
          date: 0,
          createdAt: today,
          auditionId: 0,
          statusId: 4,
          id: 1,
        },
      ],
    };
    const mockPrisma = {
      update: async () => {
        return new Promise((resolve) => {
          resolve(returnData);
        });
      },
    };

    const updateAudition = Audition.update(
      updateData.id,
      updateData as unknown as Prisma.AuditionUncheckedUpdateInput,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(await updateAudition).toEqual(expectedResponse);
  });
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
    expect(userAuditions).toEqual(auditions);
  });
  it("Finds all Formatted Auditions by UserId", async () => {
    const auditions = [
      {
        id: 0,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film",
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
      },
      {
        id: 1,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
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
      },
    ];
    const expected = [
      {
        id: 0,
        userId: 1,
        date: 0,
        project: "Test",
        company: "Test Company",
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "film",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
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
        callBackDate: null,
        casting: [{ name: "Test testerson", company: "Tester Casting" }],
        notes: "Notes!",
        type: "theater",
        archived: false,
        statuses: [
          {
            id: 0,
            statusId: 0,
            auditionId: 0,
            date: 0,
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
    const userAuditions = await Audition.getFormattedAuditionsByUserId(
      auditions[0].userId,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(userAuditions).toEqual(expected);
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
      archived: false,
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
      archived: false,
    };
    const mockPrisma = {
      create: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const newAudition = await Audition.create(
      auditionData as Prisma.AuditionUncheckedCreateInput,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(newAudition).toEqual(expectedResponse);
  });
  it("Creates an audition with statuses and returns it", async () => {
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
      archived: false,
      statuses: [
        {
          id: 0,
          statusId: 0,
          auditionId: 0,
          date: 0,
          type: "scheduled",
        },
      ],
    };
    const auditionData = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "No notes Added",
      type: "television",
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
    const mockPrisma = {
      create: async () => {
        return new Promise((resolve) => {
          resolve(auditionData);
        });
      },
    };

    const newAudition = await Audition.create(
      auditionData as Prisma.AuditionUncheckedCreateInput,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(newAudition).toEqual(expectedResponse);
  });
  it("Updates an audition with statuses", async () => {
    const today = new Date();
    const updateAuditionData = {
      id: 0,
      createdAt: new Date(),
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television" as audition_types,
      archived: false,
    };
    const updateStatusData = [
      {
        auditionId: 0,
        id: 0,
        statusId: 0,
        createdAt: new Date(),
        date: 0,
        type: "submitted",
      },
      {
        auditionId: 0,
        id: 0,
        statusId: 4,
        createdAt: new Date(),
        date: 0,
        type: "booked",
      },
    ];
    const returnData = {
      id: 0,
      createdAt: today,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television" as audition_types,
      archived: false,
      statuses: [
        {
          id: 0,
          auditionId: 0,
          statusId: 0,
          createdAt: today,
          date: 0,
          Status: {
            type: "submitted",
            id: 0,
          },
        },
        {
          id: 1,
          auditionId: 0,
          statusId: 4,
          createdAt: today,
          date: 0,
          Status: {
            type: "booked",
            id: 4,
          },
        },
      ],
    };

    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      createdAt: today,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "Notes",
      type: "television",
      archived: false,
      statuses: [
        {
          id: 0,
          auditionId: 0,
          statusId: 0,
          createdAt: today,
          date: 0,
          type: "submitted",
        },
        {
          type: "booked",
          date: 0,
          createdAt: today,
          auditionId: 0,
          statusId: 4,
          id: 1,
        },
      ],
    };
    const mockPrisma = {
      $transaction: async () => {
        return new Promise((resolve) => {
          resolve([updateStatusData, returnData]);
        });
      },
      statusChange: {
        createMany: async () => {
          return new Promise((resolve) => {
            resolve(updateStatusData);
          });
        },
      },
      audition: {
        update: async () => {
          return new Promise((resolve) => {
            resolve(returnData);
          });
        },
      },
    };

    const updateAudition = Audition.updateWithStatus(
      updateAuditionData.id,
      updateAuditionData,
      mockPrisma as unknown as PrismaClient
    );
    expect(await updateAudition).toEqual(expectedResponse);
  });
  it("Creates multiple auditions with statuses and returns the count", async () => {
    const auditionsArray = [
      {
        statuses: {
          create: {
            date: 0,
            Status: {
              connect: {
                id: 1,
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
      {
        statuses: {
          create: {
            date: 0,
            Status: {
              connect: {
                id: 1,
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
    ];
    const expected = { count: 2 };
    const mockPrisma = {
      createMany: async () => {
        return new Promise((resolve) => {
          resolve(expected);
        });
      },
    };

    const updateAudition = Audition.createMany(
      auditionsArray,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(await updateAudition).toEqual(expected);
  });
  it("Fails to create audition with matching AA_ID", async () => {
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
      archived: false,
      AA_ID: 0,
    };
    const errorMsg = "Unable to create audition!";
    const mockPrisma = {
      create: async () => {
        return new Promise(() => {
          throw Error(errorMsg);
        });
      },
    };

    try {
      await Audition.create(
        auditionData as Prisma.AuditionUncheckedCreateInput,
        mockPrisma as unknown as PrismaClient["audition"]
      );
    } catch (err: any) {
      expect(err.message).toEqual("Unable to create audition!");
    }
  });
  it("Fails to create audition with matching CN_ID", async () => {
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
      archived: false,
      CN_ID: "id-0",
    };
    const errorMsg = "Unable to create audition!";
    const mockPrisma = {
      create: async () => {
        return new Promise(() => {
          throw Error(errorMsg);
        });
      },
    };

    try {
      await Audition.create(
        auditionData as Prisma.AuditionUncheckedCreateInput,
        mockPrisma as unknown as PrismaClient["audition"]
      );
    } catch (err: any) {
      expect(err.message).toEqual("Unable to create audition!");
    }
  });
});
