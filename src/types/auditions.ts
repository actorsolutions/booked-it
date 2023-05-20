import { NextApiResponse } from "next";
import { audition_statuses, audition_types } from "@prisma/client";
export { audition_types, audition_statuses } from "@prisma/client";
export interface AuditionsResponse extends NextApiResponse {
  auditions: Audition[];
}

export interface Audition {
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
}

export interface Casting {
  name?: string;
  role?: string;
  company?: string;
}
