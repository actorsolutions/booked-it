import { PrismaClient, Audition } from "@prisma/client";

interface AuditionData {
  id: number;
  userId: number;
  date: number;
  project: string;
  company?: string;
  callbackData?: number;
  casting: object;
  notes?: string;
  type:
    | "Television"
    | "Film"
    | "Student"
    | "Theater"
    | "Industrial"
    | "Commercial"
    | "New Media";
}
// eslint-disable-next-line no-unused-vars
enum AuditionType {
  Television = "Television",
  Film = "Film",
  Student = "Student",
  Theater = "Theater",
  Industrial = "Industrial",
  Commercial = "Commercial",
  NewMedia = "New Media",
}

export class Auditions {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly prismaAudition: PrismaClient["audition"]) {}

  // Find Audition by Id
  async findById(id: number): Promise<Audition> {
    return this.prismaAudition.findUnique({ where: { id } });
  }

  // Find Auditions by User id
  async findByUserId(userId: number): Promise<Audition[]> {
    return this.prismaAudition.findMany({ where: { userId } });
  }

  // Create Audition
  async createAudition(auditionData: Partial<AuditionData>): Promise<Audition> {
    return this.prismaAudition.create({ data: auditionData });
  }

  // Update Audition
  async updateAudition(
    id: number,
    updateData: Partial<AuditionData>
  ): Promise<Audition> {
    return this.prismaAudition.update({ where: { id }, data: updateData });
  }
}
