import {
  PrismaClient,
  Prisma,
  audition_types,
  audition_statuses,
} from "@prisma/client";
import type { StatusChange as PrismaStatusChange } from "@prisma/client";
import {
  formatAuditions,
  formatAudition,
} from "@/models/utils/formatAuditions";

const auditionWithStatuses = Prisma.validator<Prisma.AuditionArgs>()({
  include: { statuses: true },
});

type AuditionWithStatuses = Prisma.AuditionGetPayload<
  typeof auditionWithStatuses
>;

/**
 * Makes sure value is a part of object representing Prisma Enum
 * @param enumList
 * @param value
 */
const validateEnum = (enumList: {}, value: string) => {
  if (Object.values(enumList).includes(value)) {
    return value;
  } else {
    throw Error(`Invalid Type: ${value} in ${enumList}`);
  }
};

/**
 * Defines the Database representation of an Audition, starting with
 * a form of the object for Audition creation where id is optional
 */
export class Audition {
  id: number;
  userId: number;
  date: number;
  project: string;
  company?: string | undefined;
  callbackDate?: number;
  casting?:
    | string
    | number
    | boolean
    | Prisma.JsonObject
    | Prisma.JsonArray
    | null;
  notes?: string;
  type: audition_types;
  createdAt?: Date | null;
  status?: audition_statuses;
  archived: boolean;
  statuses: PrismaStatusChange[];

  constructor(data: AuditionWithStatuses) {
    const {
      id,
      userId,
      date,
      project,
      company,
      callBackDate,
      casting,
      notes,
      createdAt,
      archived,
      status,
      type,
      statuses,
    } = data;
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.project = project;
    this.company = company || undefined;
    this.callbackDate = callBackDate || undefined;
    this.casting = casting;
    this.notes = notes || undefined;
    this.createdAt = createdAt;
    this.archived = archived;
    this.statuses = statuses;

    this.status =
      (validateEnum(audition_statuses, status) as audition_statuses) ||
      undefined;
    this.type = validateEnum(audition_types, type) as audition_types;
  }

  /**
   * Method for finding a particular audition record by its id
   * @param id - id of sought after audition record
   * @param db - instance of database being used
   */
  static async findById(id: number, db: PrismaClient["audition"]) {
    return db.findUnique({
      where: { id },
      include: {
        statuses: {
          select: {
            date: true,
            id: true,
            statusId: true,
            Status: true,
            auditionId: true,
          },
        },
      },
    });
  }

  /**
   * Method for finding all auditions associated with a particular user
   * @param userId - id of user within sought after audition records
   * @param db - instance of database being used
   */
  static findByUserId = async (
    userId: number,
    db: PrismaClient["audition"]
  ) => {
    return db.findMany({
      where: { userId: userId },
      include: {
        statuses: {
          select: {
            date: true,
            id: true,
            statusId: true,
            Status: true,
            auditionId: true,
          },
        },
      },
    });
  };

  /**
   * Method used to get formatted Auditions
   * @param userId - ID of audition.userId
   * @param db - instance of database being used
   */
  static getFormattedAuditionsByUserId = async (
    userId: number,
    db: PrismaClient["audition"]
  ) => {
    const auditions = await Audition.findByUserId(userId, db);
    return formatAuditions(auditions);
  };

  /**
   * Method used to get formatted Auditions
   * @param userId - ID of audition.userId
   * @param db - instance of database being used
   */
  static getFormattedAuditionByUserId = async (
    userId: number,
    db: PrismaClient["audition"]
  ) => {
    const audition = await Audition.findById(userId, db);
    return formatAudition(audition);
  };

  /**
   * Method used to create a new audition
   * @param data - audition data for creation
   * @param db - instance of database being used
   */
  static async create(
    data: Prisma.AuditionUncheckedCreateInput,
    db: PrismaClient["audition"]
  ) {
    const createdAudition = await db.create({
      data,
      include: {
        statuses: {
          select: {
            date: true,
            id: true,
            statusId: true,
            Status: true,
            auditionId: true,
          },
        },
      },
    });
    return formatAudition(createdAudition);
  }

  /**
   * Method used to update an audition
   * @param id
   * @param data
   * @param db - instance of database being used
   */
  static async update(
    id: number,
    data: Prisma.AuditionUncheckedUpdateInput,
    db: PrismaClient["audition"]
  ) {
    const updateAudition = await db.update({
      where: { id },
      data,
      include: {
        statuses: {
          select: {
            date: true,
            id: true,
            statusId: true,
            Status: true,
            auditionId: true,
          },
        },
      },
    });
    return formatAudition(updateAudition);
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
    return db.deleteMany({
      where: {
        id,
        userId,
      },
    });
  }

  static async updateWithStatus(
    id: number,
    auditionData: Prisma.AuditionUncheckedUpdateInput,
    db: PrismaClient
  ) {
    // eslint-disable-next-line no-unused-vars
    const auditions = await db.audition.update({
      where: { id },
      data: auditionData,
      include: {
        statuses: {
          select: {
            date: true,
            id: true,
            statusId: true,
            Status: true,
            auditionId: true,
          },
        },
      },
    });

    return formatAudition(auditions);
  }
}
