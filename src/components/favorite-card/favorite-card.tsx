import { Offer } from '../../types/offer.ts';
import { useAppDispatch } from '../../hooks';
import { useEffect, useState } from 'react';
import { changeFavoriteState } from '../../store/api-actions.ts';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, toStarsWidth } from '../../services/utils.tsx';
import PrivateButton from '../../hocs/private-button/private-button.tsx';

export type FavoriteCardProps = {
  offer: Offer;
};

export function FavoriteCard({ offer }: FavoriteCardProps) {
  const dispatch = useAppDispatch();
  const [isFavorite, setIsFavorite] = useState<boolean>(offer.isFavorite);
  const [isChangedFavorite, setIsChangedFavorite] = useState<boolean>(false);
  const offerLink = `/offer/${offer.id}`;

  useEffect(() => {
    if (isChangedFavorite) {
      dispatch(changeFavoriteState({ offerId: offer.id, isFavorite: isFavorite }));
      setIsChangedFavorite(false);
    }
  }, [isChangedFavorite, dispatch, isFavorite, offer.id]);

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <PrivateButton onClick={() => {
            setIsFavorite(!isFavorite);
            setIsChangedFavorite(true);
          }}
          >
            <button
              className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
              type="button"
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{isFavorite ? 'Remove from bookmarks' : 'To bookmarks'}</span>
            </button>
          </PrivateButton>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: toStarsWidth(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(offer.type)}</p>
      </div>
    </article>
  );
}
