import { Audition } from "../Auditions";
import { AuditionType, PrismaClient } from "@prisma/client";

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
      type: "Film",
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const audition = await Audition.findById(
      0,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(audition).toEqual(expectedResponse);
  });
  it("creates an audition", async () => {
    const auditionData = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: undefined,
      type: "Television" as AuditionType,
    };
    const expectedResponse = {
      id: 0,
      userId: 0,
      date: 0,
      project: "FakeCompany",
      company: "FakeProject",
      callbackDate: 0,
      casting: [{ name: "FakeCasting", company: "Casting" }],
      notes: "No notes Added",
      type: "Television" as AuditionType,
    };
    const mockPrisma = {
      upsert: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const audition = await Audition.save(
      auditionData,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(audition).toEqual(expectedResponse);
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
        type: "Film" as AuditionType,
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
        type: "Theater" as AuditionType,
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
      1,
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
      type: "Film" as AuditionType,
    };

    const mockPrisma = {
      delete: async () => {
        return new Promise((resolve) => {
          resolve(audition);
        });
      },
    };
    const deletedAudition = await Audition.delete(
      1,
      mockPrisma as unknown as PrismaClient["audition"]
    );
    expect(deletedAudition).toEqual(audition);
  });
});
