import { Users } from "../../../utils/models/Users";
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
});
