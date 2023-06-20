import { PrismaClient } from "@prisma/client";

interface StatusData {
  id: number;
  type: string;
}

export class Status {
  id: number;
  type: string;

  constructor(data: StatusData) {
    const { id, type } = data;
    this.id = id;
    this.type = type;
  }

  /**
   * Search for Status Type by Type
   * @param type
   * @param db
   */
  static async findByStatusType(type: string, db: PrismaClient["status"]) {
    return await db.findUnique({ where: { type } });
  }
  static async findById(id: number, db: PrismaClient["status"]) {
    return await db.findUnique({ where: { id } });
  }
}
