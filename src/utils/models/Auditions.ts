import { PrismaClient } from "@prisma/client";

export class Auditions {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prismaAudition: PrismaClient["audition"]) {}

  // Find user by Id
  async findById(id: number) {
    return this.prismaAudition.findUnique({ where: { id } });
  }

  // Find by Email
  async findByUserId(userId: number) {
    return this.prismaAudition.findMany({ where: { userId } });
  }
}
