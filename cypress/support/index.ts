import { PrismaClient } from "@prisma/client";
import { generatePrisma } from "../../src/utils/prisma";

/**
 * Replicates sanitizeDB functionality in the cypress portion of the product
 * to maintain webpack compiling fluidity
 * @param modelNames
 * @param prisma_cli
 */
export const cypressSanitize = async (
  modelNames: string[],
  prisma_cli?: PrismaClient | undefined
) => {
  const prisma = prisma_cli || generatePrisma();
  const toDelete = [];

  // collects all the table transactions into an array
  for (const modelName of modelNames) {
    // @ts-ignore
    toDelete.push(prisma[modelName].deleteMany());
  }
  // creates atomic transaction for tables to remove data from
  await prisma.$transaction(toDelete);
  await prisma.$disconnect();
};
