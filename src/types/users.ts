export interface CreateUserData {
  id?: number;
  email: string;
  sid: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  AA_UN?: string;
  AA_PW?: string;
  CN_UN?: string;
  CN_PW?: string;
  representation?: Representation[];
}

export interface User extends CreateUserData {
  id: number;
}

export interface Representation {
  name?: string;
  role?: string;
  company?: string;
}
