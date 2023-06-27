import { Status } from "@prisma/client";
export interface FormattedStatus {
  type: string;
  auditionId: number;
  statusId: number;
  date: number;
  id: number;
}

export interface StatusChangeData {
  id: number;
  auditionId: number;
  statusId: number;
  date: number;
  createdAt: Date;
  Status: Status;
}
