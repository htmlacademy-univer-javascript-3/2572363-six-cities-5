import { PlaceCardsList } from '../../components/place-card/place-card.tsx';
import { Helmet } from 'react-helmet-async';
import { Offer, Offers } from '../../types/offer.ts';
import { useEffect, useState } from 'react';
import { Locations } from '../../components/location/location.tsx';
import Map from '../../components/map/map.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/action.ts';
import { sortOffers } from '../../api/offers.api.ts';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import { SortOption } from '../../components/sort-options/sort-option.ts';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import { fetchOffers } from '../../store/api-actions.ts';
import { Cities } from '../../const.ts';

export default function Main() {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const [currentOffers, setCurrentOffers] = useState<Offers>([]);
  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);
  const [activeSortOption, setActiveSortOption] = useState<SortOption>(SortOption.Popular);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
    const sortedOffers = sortOffers(filteredOffers, activeSortOption);
    setCurrentOffers(sortedOffers);
  }, [city, offers, activeSortOption]);

  const handleSort = (sortOption: SortOption) => {
    setActiveSortOption(sortOption);
  };

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <section>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <div className="page page--gray page--main">
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <Locations locations={Cities} onClick={(selectedCity) => dispatch(setCity(selectedCity))} />
            </section>
          </div>
          <div className="cities">
            {currentOffers.length > 0 ? (
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{currentOffers.length} places to stay in {city.name}</b>
                  <SortOptions onSort={handleSort} activeSortOption={activeSortOption} />
                  <PlaceCardsList
                    offers={currentOffers}
                    onOfferHovered={(selectedOffer) => setActiveOffer(selectedOffer)}
                  />
                </section>
                <div className="cities__right-section">
                  <Map city={city} selectedOffer={activeOffer} offers={currentOffers} classname='cities__map' />
                </div>
              </div>
            ) : (
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in
                      Dusseldorf
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            )}

          </div>
        </main>
      </div>
    </section>
  );
}
