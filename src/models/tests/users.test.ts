import { Users } from "../Users";
import {PrismaClient } from "@prisma/client";

describe("It Tests the Users Model", () => {
  it("returns a user from email", async () => {
    const expectedResponse = {
      id: 0,
      sid: "FakeSid",
      email: "test@email.com",
      createdAt: 0,
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };

    const user = await Users.findByEmail(expectedResponse.email,
        mockPrisma as unknown as PrismaClient["user"]);
    expect(user).toEqual(expectedResponse);
  });
  it("returns a user from id", async () => {
    const expectedResponse = {
      id: 0,
      sid: "FakeSid",
      email: "test@email.com",
      createdAt: 0,
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };
    const user = await Users.findById(expectedResponse.id,
        mockPrisma as unknown as PrismaClient["user"]);
    expect(user).toEqual(expectedResponse);
  });
  it("returns a user, doesn't signup", async () => {
    const TEST_USER = {
      id: 0,
      sid: "FakeSid",
      email: "test@email.com",
      createdAt: 0,
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(TEST_USER);
        });
      },
    };
    const user = await Users.signUpOrSignIn(
        TEST_USER,
        mockPrisma as unknown as PrismaClient["user"]);
    expect(user).toEqual(TEST_USER);
  });
  it("creates a user", async () => {
    const expectedResponse = {
      id: 1,
      sid: "FakeSid2",
      email: "test2@email.com",
      createdAt: 0,
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(null);
        });
      },
      create: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };
    const user = await Users.signUpOrSignIn({
      id: 1,
      email: "test2@email.com",
      sid: "FakeSid",
    },
        mockPrisma as unknown as PrismaClient["user"]);
    expect(user).toEqual(expectedResponse);
  });
});
