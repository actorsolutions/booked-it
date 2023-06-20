import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STATUS_TYPES = [
  "submitted",
  "scheduled",
  "auditioned",
  "callback",
  "booked",
];

/**
 * For each Status Type, create a Status in the DB
 */
function sendStatuses() {
  Promise.all(
    STATUS_TYPES.map((t) => prisma.status.create({ data: { type: t } }))
  )
    .then(() => console.info("[SEED] Successfully create Statues Types!"))
    .catch((e) => console.error("[SEED] Failed to create Status Types", e));
}

sendStatuses();
