import { User } from './user.ts';

export type AuthData = {
  login: string;
  password: string;
};

export type LoginResponse = User & {
  token: string;
};
