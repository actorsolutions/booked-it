import { Users } from "../Users";
import { PrismaClient } from "@prisma/client";
import { encryptEntry } from "@/models/utils/UserUtils";

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

    const user = await Users.findByEmail(
      expectedResponse.email,
      mockPrisma as unknown as PrismaClient["user"]
    );
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
    const user = await Users.findById(
      expectedResponse.id,
      mockPrisma as unknown as PrismaClient["user"]
    );
    expect(user).toEqual(expectedResponse);
  });
  it("returns a user, doesn't signup", async () => {
    const TEST_USER = {
      id: 0,
      sid: "FakeSid",
      email: "test@email.com",
      createdAt: 0,
      firstName: "Zac",
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
      mockPrisma as unknown as PrismaClient["user"]
    );
    expect(user).toEqual(TEST_USER);
  });
  it("updates a user ", async () => {
    const CN_UN = encryptEntry("wally@gmail.com");
    const CN_PW = encryptEntry("Bones");
    const AA_ID = encryptEntry("bark@gmail.com");
    const AA_PW = encryptEntry("Bark123");

    const fakeUser = {
      id: 1,
      sid: "FakeSid2",
      email: "test2@email.com",
      firstName: "Wally",
      lastName: "DeBell",
      CN_UN,
      CN_PW,
      AA_ID,
      AA_PW,
    };

    const mockPrisma = {
      update: async () => {
        return new Promise((resolve) => {
          resolve(fakeUser);
        });
      },
    };
    const user = await Users.update(
      1,
      fakeUser,
      mockPrisma as unknown as PrismaClient["user"]
    );
    expect(user).toEqual(fakeUser);
  });
});
