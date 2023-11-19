import { Prisma, PrismaClient, User } from "@prisma/client";
import type { User as PrismaUser } from "@prisma/client";
import { encryptUserData } from "@/models/utils/UserUtils";

/**
 * Business logic for manipulating & transacting UserData
 */
export class Users {
  id: number;
  email: string;
  sid: string;
  firstName?: string;
  lastName?: string;
  representation?:
    | string
    | number
    | boolean
    | Prisma.JsonObject
    | Prisma.JsonArray
    | null;
  CN_UN?: string;
  CN_PW?: string;
  AA_UN?: string;
  AA_PW?: string;

  // eslint-disable-next-line no-unused-vars
  constructor(data: PrismaUser) {
    const {
      id,
      email,
      sid,
      firstName,
      lastName,
      representation,
      CN_UN,
      CN_PW,
      AA_PW,
      AA_UN,
    } = data;
    this.id = id;
    this.email = email;
    this.sid = sid;
    this.firstName = firstName || undefined;
    this.lastName = lastName || undefined;
    this.representation = representation || undefined;
    this.CN_UN = CN_UN || undefined;
    this.CN_PW = CN_PW || undefined;
    this.AA_PW = AA_PW || undefined;
    this.AA_UN = AA_UN || undefined;
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

  /**
   * Update A User
   */
  static async update(
    id: number,
    data: Prisma.UserUncheckedUpdateInput,
    db: PrismaClient["user"]
  ) {
    const encryptedUser = encryptUserData(data);
    return db.update({ where: { id }, data: encryptedUser });
  }
}
