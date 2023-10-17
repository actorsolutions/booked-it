export interface UpdateUserData {
  id: number;
  email: string;
  sid: string;
  firstName?: string;
  lastName?: string;
  AA_UN?: string;
  AA_PW?: string;
}

export interface Representation {
  firstName: string;
  lastName: string;
  role: string;
}
// TODO: Role to ENUM Talent/Manager
