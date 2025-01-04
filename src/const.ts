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
