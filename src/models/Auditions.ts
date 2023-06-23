import {
  PrismaClient,
  Prisma,
  audition_types,
  audition_statuses,
} from "@prisma/client";
import type { Audition as PrismaAudition } from "@prisma/client";

import {
  CreateAuditionPrismaData,
  AuditionPrismaData,
  AuditionData,
} from "@/types/auditions";
import { StatusChangeData, StatusChangePrismaData } from "@/types/statuschange";

const auditionStatuses = {
  submitted: "submitted",
  scheduled: "scheduled",
  auditioned: "auditioned",
  callback: "callback",
  booked: "booked",
};

const auditionTypes = {
  television: "television",
  film: "film",
  student: "student",
  theater: "theater",
  industrial: "industrial",
  commercial: "commercial",
  newMedia: "newMedia",
  voiceOver: "voiceOver",
};

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
 * Formats the returned Audition into the format needed for the frontend
 */
const formatAuditions = (auditions: AuditionPrismaData[]) => {
  const formattedStatuses: StatusChangeData[] = [];
  auditions.forEach((audition) => {
    const formatted: StatusChangeData[] = [];
    audition.statuses?.forEach((statusChange) => {
      const formattedStatus = statusChange as StatusChangeData;
      formattedStatus.type = statusChange.Status?.type;
      // @ts-ignore
      delete formattedStatus.Status;
      formatted.push(formattedStatus);
    });
  });
  const formattedAuditions = auditions as unknown as AuditionData;
  formattedAuditions.statuses = formattedStatuses;
  return formattedAuditions;
};

/**
 * Business logic for manipulating & transacting AuditionData
 */
export class Audition {
  id: number;
  userId: number;
  date: number;
  project: string;
  company: string;
  callbackDate?: number;
  casting?: Prisma.JsonArray | undefined;
  notes?: string;
  type: audition_types;
  createdAt?: string;
  status: audition_statuses;
  archived: boolean;
  statuses: StatusChangePrismaData[];

  constructor(data: AuditionPrismaData) {
    const {
      id,
      userId,
      date,
      project,
      company,
      callbackDate,
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
    this.company = company;
    this.callbackDate = callbackDate || undefined;
    this.casting = casting;
    this.notes = notes || undefined;
    this.createdAt = createdAt;
    this.archived = archived;
    this.statuses = statuses;

    this.status = validateEnum(auditionStatuses, status) as audition_statuses;
    this.type = validateEnum(auditionTypes, type) as audition_types;
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
    const auditions = await db.findMany({
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

    return formatAuditions(auditions);
  }

  /**
   * Method used to create a new audition
   * @param createData - audition data for creation
   * @param db - instance of database being used
   */
  static async create(
    createData: CreateAuditionPrismaData,
    db: PrismaClient["audition"]
  ) {
    return db.create({
      data: {
        ...createData,
        status: validateEnum(
          auditionStatuses,
          createData.status
        ) as audition_statuses,
        type: validateEnum(auditionTypes, createData.type) as audition_types,
        statuses: {
          createMany: {
            data: createData.statuses,
          },
        },
      },
    });
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
