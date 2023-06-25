import { FormattedStatus } from "@/types/statuschange";
import { Prisma } from "@prisma/client";
import { Audition } from "@/models/Auditions";
import { FormattedAudition } from "@/types/auditions";

const statusChangeWithStatus = Prisma.validator<Prisma.StatusChangeArgs>()({
  include: { Status: true },
});

export type AuditionsWithStatusChange = Prisma.PromiseReturnType<
  typeof Audition.findByUserId
>;

export type StatusChangeWithStatus = Prisma.StatusChangeGetPayload<
  typeof statusChangeWithStatus
>;
/**
 * Formats Prisma Auditions into Auditions useable by App.
 * @param auditions
 */
export const formatAuditions = (
  auditions: AuditionsWithStatusChange[]
): FormattedAudition => {
  const formattedStatuses: FormattedStatus[] = [];
  auditions.forEach((audition) => {
    // @ts-ignore
    audition.statuses?.forEach((statusChange: StatusChangeWithStatus) => {
      const formattedStatus = {
        ...statusChange,
        type: statusChange.Status.type,
      };
      // @ts-ignore
      delete formattedStatus.Status;
      formattedStatuses.push(formattedStatus as unknown as FormattedStatus);
    });
  });
  const formattedAuditions = [...auditions] as unknown as FormattedAudition;
  formattedAuditions.statuses = formattedStatuses;
  return formattedAuditions;
};
