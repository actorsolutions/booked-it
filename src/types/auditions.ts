import { NextApiResponse } from "next";
import { audition_statuses, audition_types } from "@prisma/client";
import { FormattedStatus } from "@/types/statuschange";
export interface AuditionsResponse extends NextApiResponse {
  auditions: AuditionData[];
}

export interface AuditionData {
  id: number;
  userId: number;
  createdAt: Date;
  date: number;
  project: string;
  company: string;
  casting?: Casting[];
  callBackDate?: number;
  notes: string;
  type: audition_types;
  status: audition_statuses;
  archived: boolean;
  statuses: FormattedStatus[];
}

export interface CreateAuditionData {
  id?: number;
  date: number;
  project: string;
  company: string;
  notes: string;
  type: string;
  callBackDate?: number;
  status: string;
  archived: boolean;
  casting?: Casting[];
  statuses: FormattedStatus[];
}

export interface FormattedAudition extends Omit<AuditionData, "statuses"> {
  statuses: FormattedStatus[];
}
export interface Casting {
  name?: string;
  role?: string;
  company?: string;
}
