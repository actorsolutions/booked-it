import { Prisma } from "@prisma/client";
import { Audition } from "@/models/Auditions";

export type AuditionsWithStatusChange = Prisma.PromiseReturnType<
  typeof Audition.findByUserId
>;
export type AuditionWithStatusChange = Prisma.PromiseReturnType<
  typeof Audition.findById
>;
