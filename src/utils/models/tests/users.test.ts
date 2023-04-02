import { Users } from "@/utils/models/Users";
import { PrismaClient } from "@prisma/client";

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
    const users = new Users(mockPrisma as unknown as PrismaClient["user"]);
    const user = await users.findByEmail("test@email.com");
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
    const users = new Users(mockPrisma as unknown as PrismaClient["user"]);
    const user = await users.findById(0);
    expect(user).toEqual(expectedResponse);
  });
  it("returns a  user, doesn't signup", async () => {
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
    const users = new Users(mockPrisma as unknown as PrismaClient["user"]);
    const user = await users.signUpOrSignIn({
      email: "test@email.com",
      sid: "FakeSid",
    });
    expect(user).toEqual(expectedResponse);
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
    const users = new Users(mockPrisma as unknown as PrismaClient["user"]);
    const user = await users.signUpOrSignIn({
      email: "test2@email.com",
      sid: "FakeSid",
    });
    expect(user).toEqual(expectedResponse);
  });
});
