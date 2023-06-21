import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Make sure every DB has the same id -> status key pair
 */
const STATUS_TYPES = [
  { type: "submitted", id: 0 },
  { type: "scheduled", id: 1 },
  { type: "auditioned", id: 2 },
  { type: "callback", id: 3 },
  { type: "booked", id: 4 },
];

/**
 * For each Status Type, create a Status in the DB
 */
function sendStatuses() {
  Promise.all(
    STATUS_TYPES.map((t) =>
      prisma.status.create({ data: { id: t.id, type: t.type } })
    )
  )
    .then(() => console.info("[SEED] Successfully create Statues Types!"))
    .catch((e) => console.error("[SEED] Failed to create Status Types", e));
}

sendStatuses();
