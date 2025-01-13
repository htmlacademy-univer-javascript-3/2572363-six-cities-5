import { City } from '../../types/map.ts';
import { useAppSelector } from '../../hooks';

export type LocationProps = {
  location: City;
  onClick: () => void;
}

export function Location({ location, onClick }: LocationProps) {
  const selectedCity = useAppSelector((state) => state.city);
  const isCurrentSelected = selectedCity.name === location.name;
  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${isCurrentSelected ? 'tabs__item--active' : ''}`} onClick={() => onClick()}>
        <span>{location.name}</span>
      </a>
    </li>
  );
}

export type LocationsProps = {
  locations: City[];
  onClick: (city: City) => void;
}

export function Locations({ locations, onClick }: LocationsProps) {
  return (
    <ul className="locations__list tabs__list">
      {locations.map((city) => <Location key={city.name} location={city} onClick={() => onClick(city)}/>)}
    </ul>
  );
}
