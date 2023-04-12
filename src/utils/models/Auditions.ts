import { PrismaClient, AuditionType, User } from "@prisma/client";

interface AuditionFields {
  id: Audition["id"];
  userId: User["id"];
  date: number;
  project: string;
  company?: string;
  callbackDate?: number;
  casting: object;
  notes?: string;
  type: AuditionType;
}
// eslint-disable-next-line no-unused-vars
const auditionTypes: AuditionType = "Television";

export class Audition {
  id: number;
  userId: number;
  date: number;
  project: string;
  company?: string;
  callbackDate?: number;
  casting?: object;
  notes?: string;
  type;

  // eslint-disable-next-line no-unused-vars
  constructor(data: AuditionFields) {
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
    } = data;
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.project = project;
    this.company = company || "No Company Added";
    this.callbackDate = callbackDate || undefined;
    this.casting = casting;
    this.notes = notes || "No notes Added";
    this.type = type;
  }

  // Find Audition by Id
  static async findById(id: number, db: PrismaClient["audition"]) {
    return await db.findUnique({ where: { id } });
  }

  // Find Auditions by User id
  static async findByUserId(userId: number, db: PrismaClient["audition"]) {
    return await db.findMany({ where: { userId } });
  }

  // Create / UpDate Audition
  static async save(data: AuditionFields, db: PrismaClient["audition"]) {
    return db.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
  static async delete(id: number, db: PrismaClient["audition"]) {
    return db.delete({
      where: {
        id,
      },
    });
  }
}
