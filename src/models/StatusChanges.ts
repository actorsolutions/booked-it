import { PrismaClient, Prisma } from "@prisma/client";
import { generatePrisma } from "@/utils/prisma";
import type { StatusChange as PrismaStatusChange } from "@prisma/client";

export class StatusChange {
  id: number;
  auditionId: number;
  statusId: number;
  createdAt: Date | null;

  constructor(data: PrismaStatusChange) {
    const { id, auditionId, statusId, createdAt } = data;
    this.id = id;
    this.auditionId = auditionId;
    this.statusId = statusId;
    this.createdAt = createdAt;
  }

  /**
   * Method for finding all statuses by auditionId
   */
  static async findByAuditionId(
    auditionId: number,
    db: PrismaClient["statusChange"]
  ): Promise<StatusChange[]> {
    return db.findMany({ where: { auditionId } });
  }

  /**
   * Method for finding one statusChange by id
   */
  static async findById(id: number, db: PrismaClient["statusChange"]) {
    return db.findUnique({ where: { id } });
  }

  /**
   * Creates a Status Change
   * @param createData
   * @param db
   */
  static async create(
    createData: Prisma.StatusChangeCreateInput,
    db: PrismaClient["statusChange"]
  ) {
    return db.create({
      data: createData,
    });
  }
  static async delete(id: number, prisma_cli?: PrismaClient | undefined) {
    const prisma = prisma_cli || generatePrisma();
    return await prisma.$transaction(async (tx) => {
      const statusToChange = await tx.statusChange.findUnique({
        where: { id },
      });
      const allAuditionStatuses = await tx.statusChange.findMany({
        where: { auditionId: statusToChange?.auditionId },
      });
      if (allAuditionStatuses.length === 1) {
        throw new Error("Can not delete last Status Change!");
      }
      await prisma.statusChange.delete({ where: { id } });
    });
  }
}
