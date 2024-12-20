import {Offer, Offers} from '../../types/offer.ts';
import {Link} from 'react-router-dom';

export type NearPlaceProps = {
  offer: Offer;
}

export function NearPlace({ offer }: NearPlaceProps) {
  const offerLink = `/offer/${offer.id}`;

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">Room</p>
      </div>
    </article>
  );
}

export type NearPlacesProps = {
  currentOffer: Offer;
  offers: Offers;
};

export function NearPlaces({ currentOffer, offers }: NearPlacesProps) {
  const places = offers.filter((offer) => offer.id !== currentOffer.id)
    .map((offer) => <NearPlace key={offer.id} offer={offer}/>);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {places}
      </div>
    </section>
  );
}
