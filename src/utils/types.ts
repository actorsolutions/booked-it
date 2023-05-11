import { NextApiResponse } from "next";

export interface auditionResponse extends NextApiResponse {
  auditions: Audition[];
}

export interface Audition {
  id: number;
  userId: number;
  createdAt: number;
  date: number;
  project: string;
  company: string;
  casting: object;
  callBackDate: number;
  notes: string;
  type:
    | "television"
    | "film"
    | "student"
    | "theater"
    | "industrial"
    | "commercial"
    | "newMedia";
  status: "submitted" | "scheduled" | "auditioned" | "callback" | "booked";
  archived: boolean;
}
