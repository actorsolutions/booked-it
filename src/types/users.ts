export interface CreateUserData {
  id?: number;
  email: string;
  sid: string;
}

export interface User extends CreateUserData {
  id: number;
}
