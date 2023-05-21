import { createServer, RequestListener } from "http";
import { NextApiHandler } from "next";
import { apiResolver } from "next/dist/server/api-utils/node";
import request from "supertest";
import { PrismaClient } from "@prisma/client";
import { generatePrisma } from "@/utils/prisma";

interface User {
  name: string;
  sid: string;
  email: string;
  id: string;
}

interface AuthConfig {
  user: User;
  accessToken: string;
  accessTokenScope: string;
  idToken: string;
  token_type: string;
}

export const SESSION_DATA: AuthConfig = {
  user: {
    name: "Test User",
    sid: "0000000",
    email: "test@test.com",
    id: "0",
  },
  accessToken: "somanytokens",
  accessTokenScope: "openid profile email",
  idToken: "tokeeeens",
  token_type: "Bearer",
};
export const testClient = async (handler: NextApiHandler, query = {}) => {
  const listener: RequestListener = async (req, res) => {
    return apiResolver(
      req,
      res,
      query,
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
 * Sanitizes and sends prisma in a one comfy function
 * @param clearTables
 */
export const setup = async (
  clearTables: string[] = []
): Promise<IntegrationTestParams> => {
  const prisma = generatePrisma();
  await sanitizeDB(clearTables, prisma);
  return {prisma} ;
};
export type IntegrationTestParams = {
  prisma: PrismaClient;
};

export const tearDown = async(
    _test : IntegrationTestParams
)=>{
  await _test.prisma.$disconnect();
}

