import { AuditionData } from "@/types";
import { FormattedStatus } from "@/types/statuschange";

/**
 * Adapts AuditionData -> PrismaAudition
 *
 *
 * @returns PrismaAudition
 */
export const prismaAuditionAdapter = (data: AuditionData) => {
  const {
    id,
    userId,
    createdAt,
    date,
    project,
    company,
    casting,
    callBackDate,
    notes,
    type,
    archived,
    statuses,
  } = data;

  const adaptedStatus = statuses?.map((status) => {
    if (statuses.length == 0) {
      return undefined;
    }
    return createStatusChange(status);
  });

  return {
    id,
    userId,
    createdAt,
    date,
    project,
    company,
    callBackDate: callBackDate || null,
    casting: casting,
    notes: notes,
    type,
    archived,
    statuses: adaptedStatus,
  };
};

/**
 * Converts FormattedStatus to StatusChangeForm
 * @param data
 * @returns StatusChange
 */
export const statusesToStatusChange = (data: FormattedStatus) => {
  const { auditionId, statusId, date, id } = data;
  return {
    id,
    auditionId,
    statusId,
    date,
  };
};

/**
 * Converts created FormattedStatus into StatusChangeForm
 * @param data
 * @returns @StatusChangeForm
 */

export const createStatusChange = (data: FormattedStatus) => {
  const { auditionId, statusId, date, id } = data;

  return {
    auditionId,
    statusId,
    date,
    id,
  };
};
