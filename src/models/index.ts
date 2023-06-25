import { FormattedStatus, StatusChangeData } from "@/types/statuschange";
import { AuditionData } from "@/types";
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
export const formatAuditions = (
  auditions: AuditionsWithStatusChange[]
): FormattedAudition => {
  const formattedStatuses: FormattedStatus[] = [];
  auditions.forEach((audition) => {
    audition.statuses?.forEach((statusChange: StatusChangeWithStatus) => {
      const formattedStatus = {
        ...statusChange,
        type: statusChange.Status.type,
      };
      // @ts-ignore
      delete formattedStatus.Status;
      formattedStatuses.push(formattedStatus);
    });
  });
  const formattedAuditions = [...auditions] as unknown as AuditionData;
  formattedAuditions.statuses = formattedStatuses;
  return formattedAuditions;
};
