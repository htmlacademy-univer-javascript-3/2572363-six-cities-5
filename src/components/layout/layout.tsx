import { Outlet } from 'react-router-dom';
import Header from '../header/header.tsx';
import { useAppSelector } from '../../hooks';
import { ToastContainer } from 'react-toastify';

export type LayoutProps = {
  favoritesCount: number;
}

const Layout = ({ favoritesCount }: LayoutProps) => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Header favoritesCount={favoritesCount} user={user} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default Layout;
