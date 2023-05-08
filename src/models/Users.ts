import {PrismaClient, User} from "@prisma/client";

/**
 * Defines the Database representation of a User, starting with
 * a form of the object for User creation where id is optional
 */
interface createData {
  id?: number,
  email: string,
  sid: string
}

/**
 * Extends the interface for User creation to the more general
 * form of the UserData object where id is required
 */
interface UserData extends createData {
  id: number;
}

/**
 * Business logic for manipulating & transacting UserData
 */
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

  /**
   * Method for finding a particular User record by its id
   * @param id - id of sought after user record
   * @param db - instance of database being used
   */
  static async findById(id: number, db: PrismaClient["user"]) {
    return await db.findUnique({ where: { id } });
  }

  /**
   * Method for finding a particular User record by its email
   * @param email - email of sought after user record
   * @param db - instance of database being used
   */
  static async findByEmail(email: string, db: PrismaClient["user"]) {
    return await db.findUnique({ where: { email: email } });
  }

  /**
   * Signs up / Returns user based on email.
   * @param data - user data for query
   * @param db - instance of database being used
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
