import { User } from '../types/user.ts';

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
const USER_KEY_NAME = 'user';

export type LocalStorage = string;

export const getToken = (): LocalStorage => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

export const saveToken = (token: LocalStorage): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getUser = (): LocalStorage => localStorage.getItem(USER_KEY_NAME) ?? '';

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY_NAME, JSON.stringify(user));
};

export const dropUser = (): void => {
  localStorage.removeItem(USER_KEY_NAME);
};
