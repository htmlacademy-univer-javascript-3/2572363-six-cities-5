import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const.ts';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>6 cities. Page not found</title>
      </Helmet>
      <h1>Not Found. 404</h1>
      <Link className="not-found__main" to={AppRoute.Main}>
        На главную
      </Link>
    </>
  );
}
