import Logo from '../logo/logo.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { Link } from 'react-router-dom';
import { User } from '../../types/user.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions.ts';


export type HeaderProps = {
  user: User | undefined;
  favoritesCount: number;
}
export default function Header({ user, favoritesCount }: HeaderProps) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Authorized && user ? (
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user.name}</span>
                    <span className="header__favorite-count">{favoritesCount}
                    </span>
                  </Link>
                </li>
              ) : null}

              <li className="header__nav-item">
                {authorizationStatus === AuthorizationStatus.Authorized ?
                  <div className="header__nav-link">
                    <a
                      className="header__signout"
                      onClick={handleLogoutClick}
                    >Sign out
                    </a>
                  </div> :
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__login">Log in</span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
