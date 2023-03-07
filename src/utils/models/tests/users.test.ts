import { Users } from "../../../utils/models/Users";
import { PrismaClient } from "@prisma/client";

describe("It Tests the Users Model", () => {
  it("returns an already added user", async () => {
    const prisma = new PrismaClient();
    const fakeData = { email: "zdenardi@gmail.com", sid: "9009038" };
    const users = new Users(prisma.user);
    const user = await users.signUpOrSignIn(fakeData);
    expect(user.id).toEqual(8);
  });
});
