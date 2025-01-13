import { City } from './types/map.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Unauthorized = 'UNAUTHORIZED',
  Authorized = 'AUTHORIZED',
  Unknown = 'UNKNOWN',
}

export const DEFAULT_MARKER = 'img/pin.svg';

export const CURRENT_MARKER = 'img/pin-active.svg';

export const TILE_LAYER_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

export const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export enum APIRoute {
  Offers = '/offers',
  NearbyPostfix = 'nearby',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
}

export const Cities: City[] = [
  {
    name: 'Paris',
    lat: 48.8566,
    lng: 2.3522,
    zoom: 12,
  },
  {
    name: 'Cologne',
    lat: 50.9375,
    lng: 6.9603,
    zoom: 12,
  },
  {
    name: 'Brussels',
    lat: 50.8503,
    lng: 4.3517,
    zoom: 12,
  },
  {
    name: 'Amsterdam',
    lat: 52.3676,
    lng: 4.9041,
    zoom: 12,
  },
  {
    name: 'Hamburg',
    lat: 53.5511,
    lng: 9.9937,
    zoom: 12,
  },
  {
    name: 'Dusseldorf',
    lat: 51.2277,
    lng: 6.7735,
    zoom: 12,
  },
];
