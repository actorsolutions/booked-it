import { PrismaClient } from "@prisma/client";
import type { Status as PrismaStatus } from "@prisma/client";

export class Status {
  id: number;
  type: string;

  constructor(data: PrismaStatus) {
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
    return db.findUnique({ where: { type } });
  }
  static async findById(id: number, db: PrismaClient["status"]) {
    return db.findUnique({ where: { id } });
  }
}
