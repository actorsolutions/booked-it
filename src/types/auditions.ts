import { NextApiResponse } from "next";
import { audition_statuses, audition_types, Prisma } from "@prisma/client";
import { StatusChangeData } from "@/types/statuschange";
import { StatusChangePrismaData } from "@/types/statuschange";

export { audition_types, audition_statuses } from "@prisma/client";
export interface AuditionsResponse extends NextApiResponse {
  auditions: AuditionData[];
}

export interface AuditionData {
  id: number;
  userId: number;
  createdAt: number;
  date: number;
  project: string;
  company: string;
  casting?: Casting[];
  callBackDate?: number;
  notes: string;
  type: audition_types;
  status: audition_statuses;
  archived: boolean;
  statuses?: StatusChangeData[];
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
}

export interface FormattedAudition extends AuditionData {
  statuses: StatusChangeData[];
}
export interface Casting {
  name?: string;
  role?: string;
  company?: string;
}

export interface AuditionPrismaData extends CreateAuditionPrismaData {
  id: number;
  statuses: StatusChangePrismaData[];
}

export interface CreateAuditionPrismaData {
  id?: number;
  userId: number;
  date: number;
  project: string;
  company: string;
  callbackDate?: number;
  casting?: Prisma.JsonArray;
  notes?: string;
  type: string;
  createdAt?: string;
  status: string;
  archived: boolean;
  statuses: StatusChangePrismaData[];
}
