import {PrismaClient, User} from "@prisma/client";

interface createData {
  id?: number,
  email: string,
  sid: string
}

interface UserData extends createData {
  id: number;
}

export class Users {
  id: number;
  email: string;
  sid: string;

  // eslint-disable-next-line no-unused-vars
  constructor(data: UserData) {
    const {
      id,
      email,
      sid
    } = data;
    this.id = id;
    this.email = email;
    this.sid = sid;
  }

  // Find user by Id
  static async findById(id: number, db: PrismaClient["user"]) {
    return await db.findUnique({ where: { id } });
  }
  // Find by Email
  static async findByEmail(email: string, db: PrismaClient["user"]) {
    return await db.findUnique({ where: { email: email } });
  }

  /**
   * Signs up / Returns user based on email.
   * @param data
   */
  static async signUpOrSignIn(data: UserData, db: PrismaClient["user"]): Promise<User> {
    const alreadyAdded = await Users.findByEmail(data.email, db);
    if (!alreadyAdded) {
      return db.create({ data });
    } else {
      return alreadyAdded;
    }
  }
}
