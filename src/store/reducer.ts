import { createReducer } from '@reduxjs/toolkit';
import {
  clearUserData,
  setOffers,
  requireAuthorization,
  setCity,
  setDataLoadingStatus, setUserData, setFavoritesCount
} from './action.ts';
import { Offers } from '../types/offer.ts';
import { City } from '../types/map.ts';
import { AuthorizationStatus, Cities } from '../const.ts';
import { User } from '../types/user.ts';

type InitialState = {
  city: City;
  offers: Offers;
  authorizationStatus: AuthorizationStatus;
  isDataLoading: boolean;
  user: User | undefined;
  favoritesCount: number;
}

const initialState: InitialState = {
  city: Cities[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoading: true,
  user: undefined,
  favoritesCount: 0,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });
  builder.addCase(setDataLoadingStatus,(state, action) => {
    state.isDataLoading = action.payload;
  });
  builder.addCase(clearUserData, (state) => {
    state.user = undefined;
  });
  builder.addCase(setUserData, (state, action) => {
    state.user = action.payload;
  });
  builder.addCase(setFavoritesCount, (state, action) => {
    state.favoritesCount = action.payload;
  });
});
