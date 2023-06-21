import { prisma } from "@/utils/prisma";

/**
 * Get All auditions and statuses. Loop through the auditions to get the id, match audition's status with status entry
 * and then add entry to statusChange
 */
const statusToStatusChange = async () => {
  const auditions = await prisma.audition.findMany();
  const statuses = await prisma.status.findMany();
  auditions.forEach((audition) => {
    const auditionId = audition.id;
    const auditionStatus = audition.status;
    const status = statuses.find((s) => s.type === auditionStatus);
    if (status) {
      const statusChangeData = {
        auditionId,
        statusId: status.id,
      };
      console.log(statusChangeData);
    }
  });
};
statusToStatusChange().then(() => console.log("Completed"));
