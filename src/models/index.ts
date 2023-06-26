import { Prisma } from "@prisma/client";
import { Audition } from "@/models/Auditions";

export type AuditionsWithStatusChange = Prisma.PromiseReturnType<
  typeof Audition.findByUserId
>;
export type AuditionWithStatusChange = Prisma.PromiseReturnType<
  typeof Audition.findById
>;

/**
 * Formats Prisma Auditions into Auditions useable by App.
 * @param auditions - Auditions from DB with statuses
 */
export const formatAuditions = (auditions: AuditionsWithStatusChange) => {
  return auditions.map((audition) => {
    const formattedAudition = {
      ...audition,
    };
    const formattedStatuses = formattedAudition.statuses.map((statusChange) => {
      const formattedStatus = {
        ...statusChange,
        type: statusChange.Status.type,
      };
      // @ts-ignore
      delete formattedStatus.Status;
      return formattedStatus;
    });
    formattedAudition.statuses = formattedStatuses;
    return formattedAudition;
  });
};
