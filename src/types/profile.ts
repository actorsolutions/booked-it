import { UserProfile } from "@auth0/nextjs-auth0/client";

export interface Profile extends UserProfile {
  firstName?: string;
  lastName?: string;
  AA_UN?: string;
  AA_PW?: string;
  CN_UN?: string;
  CN_PW?: string;
  representation?: Representation[];
}
export interface Representation {
  name?: string;
  role?: string;
  company?: string;
}
