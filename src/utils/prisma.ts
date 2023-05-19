import { PrismaClient } from '@prisma/client';

export const generatePrisma = () => {
  return new PrismaClient();
};

export const prisma = generatePrisma();
