import { PrismaClient, Prisma } from "@prisma/client";

interface AuditionData {
  id: number;
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

  // Find Audition by Id
  static async findById(id: number, db: PrismaClient["audition"]) {
    return await db.findUnique({ where: { id } });
  }

  // Find Auditions by User id
  static async findByUserId(userId: number, db: PrismaClient["audition"]) {
    return await db.findMany({ where: { userId: userId } });
  }

  static async create(data: AuditionData, db: PrismaClient["audition"]) {
    return db.create({ data: { ...data } });
  }
  // Create / UpDate Audition
  async save(db: PrismaClient["audition"]) {
    return db.upsert({
      where: { id: this.id },
      update: this,
      create: this,
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