import { PrismaClient } from "@prisma/client";

interface Status {
  type: string;
  id: number;
}
/**
 * Get All auditions and statuses. Loop through the auditions to get the id, match audition's status with status entry
 * and then add entry to statusChange
 */
const statusToStatusChange = async () => {
  const prisma = new PrismaClient();
  const auditions = await prisma.audition.findMany();
  const statuses = await prisma.status.findMany();
  auditions.forEach((audition) => {
    const auditionId = audition.id;
    const auditionStatus = audition.status;
    const status = statuses.find((s: Status) => s.type === auditionStatus);
    if (status) {
      const statusChangeData = {
        auditionId,
        statusId: status.id,
        date: new Date(audition.date).getTime() / 1000,
      };
      prisma.statusChange.create({ data: statusChangeData }).then(() => {
        console.log(statusChangeData + " Added");
      });
    }
  });
  await prisma.$disconnect();
};
console.log("Starting Status -> Status Change Migration");
statusToStatusChange().then(() => console.log("Completed"));
