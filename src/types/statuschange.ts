import { Status } from "./status";
export interface CreateStatusChangePrismaData {
  id?: number;
  statusId: number;
  date: Date;
  createdAt?: Date;
  auditionId: number;
}
export interface StatusChangePrismaData extends CreateStatusChangePrismaData {
  id: number;
  Status: Status;
}

export interface StatusChangeData extends StatusChangePrismaData {
  type: string;
}
