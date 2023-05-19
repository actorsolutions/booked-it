import {PrismaClient} from "@prisma/client";
import {generatePrisma} from "../../src/utils/prisma";

export const cypressSanitize = async (
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