import { PrismaClient, User } from "@prisma/client";

type Signup = {
  email: string;
  sid: string;
};

export class Users {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prismaUser: PrismaClient["user"]) {}

  /**
   * Signs up / Returns user based on email.
   * @param data
   */
  async signUpOrSignIn(data: Signup): Promise<User> {
    const alreadyAdded = await this.findByEmail(data.email);
    if (!alreadyAdded) {
      return this.prismaUser.create({ data });
    } else {
      return alreadyAdded;
    }
  }

  // Find user by Id
  async findById(id: number) {
    return this.prismaUser.findUnique({ where: { id } });
  }

  // Find by Email
  async findByEmail(email: string) {
    return this.prismaUser.findUnique({ where: { email } });
  }
}
