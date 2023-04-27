import { createServer, RequestListener, Server } from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/server/api-utils/node";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

export const testClient = (handler: NextApiHandler) => {
  const listener: RequestListener = (req, res) => {
    return apiResolver(
      req,
      res,
      undefined,
      handler,
      {
        previewModeEncryptionKey: "",
        previewModeId: "",
        previewModeSigningKey: "",
      },
      false
    );
  };

  return request(createServer(listener));
};
/**
 * Removes data from specified DB tables
 */
const sanitizeDB = async (
  modelNames: string[],
  prisma_cli?: PrismaClient | undefined
) => {
  const prisma = prisma_cli || generatePrisma();
  const toDelete = [];

  // collects all of the table transactions into an array
  for (const modelName of modelNames) {
    // @ts-ignore
    toDelete.push(prisma[modelName].deleteMany());
  }
  // creates atomic transaction for tables to remove data from
  await prisma.$transaction(toDelete);
  await prisma.$disconnect();
};

/**
 *
 * @param clearTables
 */
export const setup = async (
  clearTables: string[] = []
): Promise<IntegrationTestParams> => {
  const prisma = generatePrisma();
  await sanitizeDB(clearTables, prisma);
  return { prisma };
};
export type IntegrationTestParams = {
  prisma: PrismaClient;
};

export const generatePrisma = () => {
  return new PrismaClient();
};
