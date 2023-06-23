import { Audition } from "../Auditions";
import { PrismaClient, Prisma } from "@prisma/client";
import type { Audition as PrismaAudition } from "@prisma/client";
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
  it("Creates and saves an audition", async () => {
    const auditionData = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: undefined,
      type: "television",
      status: "scheduled",
      archived: false,
    };
    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callBackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "No notes Added",
      type: "television",
      status: "scheduled",
      archived: false,
    };
    const mockPrisma = {
      upsert: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const audition = new Audition(auditionData as unknown as PrismaAudition);
    expect(
      await audition.save(mockPrisma as unknown as PrismaClient["audition"])
    ).toEqual(expectedResponse);
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
        status: "scheduled",
        archived: false,
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
});
