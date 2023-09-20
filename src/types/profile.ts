export interface CreateProfileData {
  firstName?: string;
  lastName?: string;
  photo?: string;
  AA_UN?: string;
  AA_PW?: string;
  CN_UN?: string;
  CN_PW?: string;
  representation?: Representation[];
  email: string;
}
export interface Representation {
  name?: string;
  role?: string;
  company?: string;
}
