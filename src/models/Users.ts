import { PrismaClient, User } from "@prisma/client";
import type { User as PrismaUser } from "@prisma/client";

/**
 * Business logic for manipulating & transacting UserData
 */
export class Users {
  id: number;
  email: string;
  sid: string;

  // eslint-disable-next-line no-unused-vars
  constructor(data: PrismaUser) {
    const { id, email, sid } = data;
    this.id = id;
    this.email = email;
    this.sid = sid;
  }

  /**
   * Method for finding a particular User record by its id
   * @param id - id of sought after user record
   * @param db - instance of database being used
   */
  static async findById(id: number, db: PrismaClient["user"]) {
    return db.findUnique({ where: { id } });
  }

  /**
   * Method for finding a particular User record by its email
   * @param email - email of sought after user record
   * @param db - instance of database being used
   */
  static async findByEmail(email: string, db: PrismaClient["user"]) {
    return db.findUnique({ where: { email: email } });
  }

  /**
   * Signs up / Returns user based on email.
   * @param data - user data for query
   * @param db - instance of database being used
   */
  static async signUpOrSignIn(
    data: { email: string; sid: string },
    db: PrismaClient["user"]
  ): Promise<User> {
    const alreadyAdded = await Users.findByEmail(data.email, db);
    if (!alreadyAdded) {
      return db.create({ data });
    } else {
      return alreadyAdded;
    }
  }
}
