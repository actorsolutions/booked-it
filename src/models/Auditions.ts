import { PrismaClient, Prisma } from "@prisma/client";

/**
 * Defines the Database representation of an Audition, starting with
 * a form of the object for Audition creation where id is optional
 */
interface createData {
  id?: number;
  userId: number;
  date: number;
  project: string;
  company?: string;
  callbackDate?: number;
  casting?: Prisma.JsonArray;
  notes?: string;
  type: string;
  createdAt?: string;
}

/**
 * Extends the interface for Audition creation to the more general
 * form of the AuditionData object where id is required
 */
interface AuditionData extends createData {
  id: number;
}

/**
 * Business logic for manipulating & transacting AuditionData
 */
export class Audition {
  id: number;
  userId: number;
  date: number;
  project: string;
  company?: string | undefined;
  callbackDate?: number;
  casting?: string;
  notes?: string;
  type: string;
  createdAt?: string;

  // eslint-disable-next-line no-unused-vars
  constructor(data: AuditionData) {
    const {
      id,
      userId,
      date,
      project,
      company,
      callbackDate,
      casting,
      notes,
      type,
      createdAt,
    } = data;
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.project = project;
    this.company = company || undefined;
    this.callbackDate = callbackDate || undefined;
    this.casting = JSON.stringify(casting);
    this.notes = notes || undefined;
    this.type = type;
    this.createdAt = createdAt;
  }

  /**
   * Method for finding a particular audition record by its id
   * @param id - id of sought after audition record
   * @param db - instance of database being used
   */
  static async findById(id: number, db: PrismaClient["audition"]) {
    return await db.findUnique({ where: { id } });
  }

  /**
   * Method for finding all auditions associated with a particular user
   * @param userId - id of user within sought after audition records
   * @param db - instance of database being used
   */
  static async findByUserId(userId: number, db: PrismaClient["audition"]) {
    return await db.findMany({ where: { userId: userId } });
  }

  /**
   * Method used to create a new audition
   * @param data - audition data for creation
   * @param db - instance of database being used
   */
  static async create(data: createData, db: PrismaClient["audition"]) {
    return db.create({ data: { ...data } });
  }

  /**
   * Method used to either update or create (upsert) an audition in one step
   * @param db - instance of database being used
   */
  async save(db: PrismaClient["audition"]) {
    return db.upsert({
      where: { id: this.id },
      update: this,
      create: this,
    });
  }

  /**
   * Deletes audition after validating user, must use DeleteMany to
   * be able to filter by both id and userId
   * @param id - id of audition
   * @param userId - id of user associated with audition
   * @param db - instance of database used
   */
  static async delete(
    id: number,
    userId: number,
    db: PrismaClient["audition"]
  ) {
    return await db.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }
}
