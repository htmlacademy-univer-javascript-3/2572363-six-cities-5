import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer.ts';
import { AuthorizationStatus } from '../const.ts';
import { User } from '../types/user.ts';
import { City } from '../types/map.ts';

export const setCity = createAction<City>('data/setCity');

export const setOffers = createAction<Offers>('data/setOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');

export const clearUserData = createAction('user/clearData');

export const setUserData = createAction<User>('user/setData');

export const setFavoritesCount = createAction<number>('user/setFavoritesCount');
