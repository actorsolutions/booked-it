// TODO: [BI-102] Better solution other than ignoring line 27
import { AuditionsWithStatusChange, AuditionWithStatusChange } from "@/models";

/**
 * Formats Prisma Auditions into Auditions useable by App.
 * @param auditions - Auditions from DB with statuses
 */
export const formatAuditions = (auditions: AuditionsWithStatusChange) => {
  return auditions.map((audition) => {
    return formatAudition(audition);
  });
};

/**
 * Formats a single audition to be front-end friendly
 * @param audition
 */
export const formatAudition = (audition: AuditionWithStatusChange) => {
  const formattedAudition = {
    ...audition,
  };
  formattedAudition.statuses = formattedAudition.statuses?.map(
    (statusChange) => {
      const formattedStatus = {
        ...statusChange,
        type: statusChange.Status.type,
      };
      // @ts-ignore
      delete formattedStatus.Status;
      return formattedStatus;
    }
  );

  return formattedAudition;
};
