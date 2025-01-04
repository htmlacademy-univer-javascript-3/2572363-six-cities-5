import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const.ts';
import Main from '../../pages/main/main.tsx';
import Login from '../../pages/login/login.tsx';
import OfferPage from '../../pages/offer-page/offer-page.tsx';
import NotFound from '../../pages/not-found/not-found.tsx';
import Favorites from '../../pages/favorites/favorites.tsx';
import PrivateRoute from '../../hocs/private-route/private-route.tsx';
import Layout from '../layout/layout.tsx';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Main />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.Offer} element={<OfferPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={AppRoute.Login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
