import { StatusChange } from "../StatusChanges";
import { PrismaClient, Prisma } from "@prisma/client";

describe("It tests the statusChange Model", () => {
  it("returns an array of statusChanges with auditionId", async () => {
    const expectedResponse = [
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
    const mockPrisma = {
      findMany: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const statusChanges = await StatusChange.findByAuditionId(
      0,
      mockPrisma as unknown as PrismaClient["statusChange"]
    );
    expect(statusChanges).toEqual(expectedResponse);
  });
  it("returns one statusChange", async () => {
    const expectedResponse = {
      id: 0,
      auditionId: 0,
      statusId: 0,
      createdAt: new Date(),
    };

    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const statusChange = await StatusChange.findById(
      0,
      mockPrisma as unknown as PrismaClient["statusChange"]
    );
    expect(statusChange).toEqual(expectedResponse);
  });
  it("returns a created statusChange", async () => {
    const createData = {
      auditionId: 0,
      statusId: 0,
      date: new Date(),
    };
    const expectedResponse = {
      ...createData,
      id: 0,
      createdAt: new Date(),
      date: new Date(),
    };
    const mockPrisma = {
      create: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };
    const createdStatusChange = await StatusChange.create(
      createData as unknown as Prisma.StatusChangeCreateInput,
      mockPrisma as unknown as PrismaClient["statusChange"]
    );
    expect(createdStatusChange).toEqual(expectedResponse);
  });
  it("tries to delete a statusChange and returns it if there is more than one statusChange in the array", async () => {
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

    const mockPrisma = {
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
    const createdStatusChange = await StatusChange.delete(
      0,
      mockPrisma as unknown as PrismaClient
    );
    expect(createdStatusChange).toEqual(expectedResponse);
  });
  it("returns an error because one statusChange in array", async () => {
    const arrayOfStatusChanges = [
      {
        id: 0,
        auditionId: 0,
        statusId: 0,
        createdAt: new Date(),
        date: new Date(),
      },
    ];
    const expectedResponse = {
      message: "Can not delete last Status Change!",
    };
    type mockDeleteArgs = {
      where: {
        id?: number;
      };
    };
    const mockPrisma = {
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
        delete: async (props: mockDeleteArgs) => {
          console.log(props);
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
    const createdStatusChange = await StatusChange.delete(
      0,
      mockPrisma as unknown as PrismaClient
    );
    expect(createdStatusChange).toEqual(expectedResponse);
  });
  it("updates or creates an array of statusChanges", async () => {
    const arrayOfStatusChanges = [
      {
        id: 0,
        auditionId: 0,
        statusId: 0,
        date: 0,
      },
      {
        id: 1,
        auditionId: 0,
        statusId: 0,
        createdAt: new Date(),
        date: 0,
      },
    ];

    const mockPrisma = {
      // eslint-disable-next-line no-unused-vars
      $transaction: async () => {
        return new Promise((resolve) => {
          resolve(arrayOfStatusChanges);
        });
      },
      statusChange: {
        upsert: async () => {
          return new Promise((resolve) => {
            resolve(arrayOfStatusChanges);
          });
        },
      },
    };
    const createdStatusChange = await StatusChange.upsertMany(
      arrayOfStatusChanges,
      mockPrisma as unknown as PrismaClient
    );
    expect(createdStatusChange).toEqual(arrayOfStatusChanges);
  });
});
