import {City} from '../../types/map.ts';

export type LocationProps = {
  location: City;
  handleClick: () => void;
}

export function Location({location, handleClick}: LocationProps) {
  return (
    <li className="locations__item">
      <a className="locations__item-link tabs__item" onClick={() => handleClick()}>
        <span>{location.title}</span>
      </a>
    </li>
  );
}

export type LocationsProps = {
  locations: City[];
  handleClick: (city: City) => void;
}

export function Locations({ locations, handleClick }: LocationsProps) {
  return (
    <ul className="locations__list tabs__list">
      {locations.map((city) => <Location key={city.title} location={city} handleClick={() => handleClick(city)}/>)}
    </ul>
  );
}
