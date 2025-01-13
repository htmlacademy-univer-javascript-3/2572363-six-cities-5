import { Helmet } from 'react-helmet-async';
import { Offers } from '../../types/offer.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavorites} from '../../store/api-actions.ts';
import { FavoriteCardsList } from '../../components/favorite-cards-list/favorite-cards-liist.tsx';

export default function Favorites() {
  const dispatch = useAppDispatch();
  const [favoriteOffers, setFavoriteOffers] = useState<Offers>([]);
  const favoritesCount = useAppSelector((state) => state.favoritesCount);

  useEffect(() => {
    dispatch(fetchFavorites())
      .unwrap()
      .then((offers) => setFavoriteOffers(offers));
  }, [favoritesCount, dispatch]);

  const groupedOffers = favoriteOffers.reduce((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {} as Record<string, Offers>);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(groupedOffers).map(([city, cityOffers]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <FavoriteCardsList
                    offers={cityOffers}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
