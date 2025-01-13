import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus, Cities } from '../../const.ts';
import { checkAuthAction, loginAction } from '../../store/api-actions.ts';
import Logo from '../../components/logo/logo.tsx';
import { toast, ToastContainer } from 'react-toastify';
import { FormEvent, useEffect, useState } from 'react';
import { setCity } from '../../store/action.ts';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const randomCity = Cities[Math.floor(Math.random() * Cities.length)];

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  useEffect(() => {
    if (authStatus === AuthorizationStatus.Authorized) {
      navigate(AppRoute.Main);
    }
  }, [authStatus, navigate]);

  function isPasswordValid(pass: string) {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(pass);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid(currentPassword)){
      toast.error('Password must contain at least one letter and one number.');
      return;
    }

    dispatch(loginAction({ login: currentEmail, password: currentPassword }));
  };

  const handleRandomCityClick = () => {
    dispatch(setCity(randomCity));
    navigate(AppRoute.Main);
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={currentEmail}
                  onChange={(e) => setCurrentEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={() => handleRandomCityClick()}>
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}
