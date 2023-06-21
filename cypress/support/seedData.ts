import { audition_types, audition_statuses } from "@prisma/client";
export const USER_DATA = {
  id: 0,
  sid: "1MRVj_nf2Gy4RSjaNjTIaUZWX3Djf0w-",
  email: "test.user@email.com",
};

export const AUDITION_DATA = {
  date: 1682924400,
  id: 0,
  notes: "Here is a note",
  project: "Test Project",
  type: "television" as audition_types,
  userId: 0,
  company: "Test Company",
  createdAt: "2023-04-28T21:50:11.638Z",
  status: "scheduled" as audition_statuses,
  archived: false,
  casting: [],
};
