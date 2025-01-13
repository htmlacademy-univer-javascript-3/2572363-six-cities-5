import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state.ts';
import { DetailedOffer, Offers } from '../types/offer.ts';
import { APIRoute, AuthorizationStatus } from '../const.ts';
import { clearUserData, setOffers, requireAuthorization, setUserData, setFavoritesCount } from './action.ts';
import { AuthData, LoginResponse } from '../types/authorization.ts';
import { dropToken, dropUser, getToken, getUser, saveToken, saveUser } from '../services/localStorage.ts';
import { Comment, Comments } from '../types/comment.ts';
import { User } from '../types/user.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offers>(APIRoute.Offers);
      const favoritesCount = data.filter((offer) => offer.isFavorite).length;
      dispatch(setOffers(data));
      dispatch(setFavoritesCount(favoritesCount));
    } catch (e) {
      dispatch(setOffers([]));
      dispatch(setFavoritesCount(0));
    }
  },
);

export const fetchOffer = createAsyncThunk<DetailedOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<DetailedOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  }
);

export const fetchComments = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (id, {extra: api}) => {
    try{
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      return data;
    } catch (e) {
      return [];
    }
  }
);

export const fetchFavorites = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'data/fetchFavorites',
    async (_arg, {extra: api}) => {
      try {
        const {data} = await api.get<Offers>(APIRoute.Favorites);
        return data;
      } catch (e) {
        return [];
      }
    }
  );

export const changeFavoriteState = createAsyncThunk<void, {offerId: string; isFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteState',
  async ({offerId, isFavorite}, {dispatch, getState, extra: api}) => {
    try {
      await api.post<DetailedOffer>(`${APIRoute.Favorites}/${offerId}/${Number(isFavorite)}`);
      if (isFavorite) {
        dispatch(setFavoritesCount(getState().favoritesCount + 1));
      } else {
        dispatch(setFavoritesCount(getState().favoritesCount - 1));
      }
    } catch (e) { /* empty */ }
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    try {
      const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/${APIRoute.NearbyPostfix}`);
      return data;
    } catch (e) {
      return [];
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<User>(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Authorized));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.Unauthorized));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<LoginResponse>(APIRoute.Login, {email, password});
    const user = { name: data.name, email: data.email, isPro: data.isPro, avatarUrl: data.avatarUrl };
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Authorized));
    dispatch(setUserData(user));
    saveUser(user);
  },
);

export const restoreSessionData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/restoreSessionData',
  (_, { dispatch }) => {
    const token = getToken();
    const userString = getUser();
    if (userString && token) {
      const user = JSON.parse(userString) as User;
      dispatch(requireAuthorization(AuthorizationStatus.Authorized));
      dispatch(setUserData(user));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropUser();
    dispatch(requireAuthorization(AuthorizationStatus.Unauthorized));
    dispatch(clearUserData());
  },
);

export const sendComment = createAsyncThunk<void, [Comment, string], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/sendComment',
  async ([request, offerId], {extra: api}) => {
    await api.post(`${APIRoute.Comments}/${offerId}`, request);
  }
);
