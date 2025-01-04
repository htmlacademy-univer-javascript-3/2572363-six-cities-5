import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import NotFound from '../not-found/not-found.tsx';
import { NearPlaces } from '../../components/near-places/near-places.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {changeFavoriteState, fetchComments, fetchNearbyOffers, fetchOffer} from '../../store/api-actions.ts';
import { useEffect, useState } from 'react';
import { DetailedOffer, Offers } from '../../types/offer.ts';
import { Comments } from '../../types/comment.ts';
import { capitalizeFirstLetter, formatDate, splitTextIntoParagraphs, toStarsWidth } from '../../services/utils.tsx';
import Map from '../../components/map/map.tsx';
import { setDataLoadingStatus } from '../../store/action.ts';
import PrivateElement from '../../hocs/private-element/private-element.tsx';

export default function OfferPage() {
  const [currentOffer, setCurrentOffer] = useState<DetailedOffer | undefined>(undefined);
  const [currentComments, setCurrentComments] = useState<Comments>([]);
  const [nearbyOffers, setNearbyOffers] = useState<Offers>([]);
  const [needFetchComments, setNeedFetchComments] = useState<boolean>(false);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [isChangedFavorite, setIsChangedFavorite] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isDataLoading = useAppSelector((state) => state.isDataLoading);
  const city = useAppSelector((state) => state.city);
  const { id: offerId } = useParams();

  useEffect(() => {
    if (offerId) {
      dispatch(setDataLoadingStatus(true));
      Promise.all([
        dispatch(fetchOffer(offerId)).unwrap(),
        dispatch(fetchComments(offerId)).unwrap(),
        dispatch(fetchNearbyOffers(offerId)).unwrap(),
      ]).then(([offer, comments, offers]) => {
        setCurrentOffer(offer);
        setCurrentComments(comments);
        setNearbyOffers(offers.slice(0, 3));
        dispatch(setDataLoadingStatus(false));
      }).catch(() => {
        dispatch(setDataLoadingStatus(false));
      });
    }
  }, [dispatch, offerId]);

  useEffect(() => {
    if (needFetchComments && offerId) {
      dispatch(setDataLoadingStatus(true));
      dispatch(fetchComments(offerId))
        .unwrap()
        .then((comments) => {
          setCurrentComments(comments);
          dispatch(setDataLoadingStatus(false));
        });
      setNeedFetchComments(false);
    }
  }, [needFetchComments, dispatch, offerId]);

  useEffect(() => {
    if (isChangedFavorite){
      dispatch(changeFavoriteState({offerId: currentOffer!.id, isFavorite: currentOffer!.isFavorite}));
      setIsChangedFavorite(false);
    }
  }, [isChangedFavorite, dispatch, currentOffer]);

  if (isDataLoading) {
    return <div>Loading...</div>;
  }

  if (!currentOffer) {
    return <NotFound />;
  }

  const premiumMark = currentOffer.isPremium ? (
    <div className="offer__mark">
      <span>Premium</span>
    </div>
  ) : null;

  const offerInside = (
    <ul className="offer__inside-list">
      {currentOffer.goods.map((amenity) => (
        <li key={amenity} className="offer__inside-item">
          {amenity}
        </li>
      ))}
    </ul>
  );

  const offerDescription = (
    <div className="offer__description">
      {splitTextIntoParagraphs(currentOffer.description, 'offer__text')}
    </div>
  );

  const reviews = (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentComments.length}</span></h2>
      <ul className="reviews__list">
        {currentComments
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, showAllComments ? currentComments.length : 10).map((comment) => (
            <li key={comment.id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">
                  {comment.user.name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: toStarsWidth(comment.rating) }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                {splitTextIntoParagraphs(comment.comment, 'reviews__text')}
                <time className="reviews__time" dateTime={formatDate(comment.date).dateTime}>{formatDate(comment.date).formattedDate}</time>
              </div>
            </li>
          ))}
      </ul>
      {currentComments.length > 10 && !showAllComments && (
        <button className="button" onClick={() => setShowAllComments(true)}>Show all</button>
      )}
    </>
  );

  const offerGallery = (
    <div className="offer__gallery">
      {currentOffer.images.map((imageUrl) => (
        <div key={imageUrl} className="offer__image-wrapper">
          <img className="offer__image" src={imageUrl} alt="Photo studio" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {offerGallery}
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {premiumMark}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <PrivateElement>
                  <button className={`button offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                    type="button"
                    onClick={() => {
                      setCurrentOffer({...currentOffer, isFavorite: !currentOffer.isFavorite});
                      setIsChangedFavorite(true);
                    }}
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </PrivateElement>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: toStarsWidth(currentOffer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(currentOffer.type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {offerInside}
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro ? (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  ) : null}
                </div>
                {offerDescription}
              </div>
              <section className="offer__reviews reviews">
                {reviews}
                <PrivateElement>
                  <CommentForm offerId={offerId!} onSendComment={() => setNeedFetchComments(true)} />
                </PrivateElement>
              </section>
            </div>
          </div>
          <Map city={city} selectedOffer={currentOffer} offers={nearbyOffers.concat(currentOffer)} classname='offer__map' />
        </section>
        <div className="container">
          <NearPlaces offers={nearbyOffers} />
        </div>
      </main>
    </div>
  );
}
