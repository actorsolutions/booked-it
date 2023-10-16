export interface CreateUserData {
  id?: number;
  email: string;
  sid: string;
}

export interface User extends CreateUserData {
  id: number;
}

export interface Representation {
  firstName: string;
  lastName: string;
  role: string;
}
// TODO: Role to ENUM Talent/Manager
