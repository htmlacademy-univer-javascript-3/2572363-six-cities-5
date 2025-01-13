import { City } from './map.ts';
import { User } from './user.ts';

export type Coordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export enum OfferType {
  Apartment = 'Apartment',
  Room = 'Room',
  House = 'House',
  Hotel = 'Hotel',
}

export type Offer = {
  id: string;
  previewImage: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: OfferType;
  isFavorite: boolean;
  rating: number;
  city: City;
  location: Coordinates;
};

export type DetailedOffer = Offer & {
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: User;
}

export type Offers = Offer[];
